import { BaseClass } from '@writetome51/base-class';
import { Batchinator } from '@writetome51/batchinator';


// This is designed so it handles both a Batchinator and a Paginator.
// The Paginator is needed to simply show a page.
// The Batchinator is needed just in case the full data set is so big it requires batchination.


export abstract class PaginatorDataController extends BaseClass {

	// itemsPerBatch: integer (default is 500).  The browser cache item limit.
	// itemsPerPage: integer (default is 25)

	private __batchinator = new Batchinator();


	constructor(
		// begin injected dependencies...
		private __paginator: { data: any[], itemsPerPage: number, currentPageNumber: number },
		private __dataSource: {
			getData: (batchNumber: number, numberOfItemsToGet: number) => any[];
			getDataTotal: () => number;
		}
		// end injected dependencies.
	) {
		super();

		// @ts-ignore
		this.__batchinator.totalDataCount = this.__dataSource.getDataTotal();
		this.itemsPerBatch = 500;
		this.itemsPerPage = 25;
		this.__loadBatchAndPage(1);
	}


	set itemsPerPage(value) {
		this.__batchinator.itemsPerPage = value;
		this.__paginator.itemsPerPage = value;
	}


	get itemsPerPage(): number {
		return this.__batchinator.itemsPerPage;
	}


	set itemsPerBatch(value) {
		if (this.__batchinator.totalDataCount < value) {
			this.__batchinator.itemsPerBatch = this.__batchinator.totalDataCount;
		}
		else this.__batchinator.itemsPerBatch = value;
	}


	get itemsPerBatch(): number {
		return this.__batchinator.itemsPerBatch;
	}


	setCurrentPage(pageNumber): void {
		if (this.__batchinator.currentBatchContainsPage(pageNumber)) {
			this.__setCurrentPageInCurrentBatch(pageNumber);
		}
		else this.__loadBatchAndPage(pageNumber);
	}


	private __setCurrentPageInCurrentBatch(pageNumber) {
		this.__paginator.currentPageNumber =
			this.__batchinator.getCurrentPageNumberForPaginator(pageNumber);
	}


	private __loadBatchAndPage(pageNumber) {
		this.__loadBatchContainingPage(pageNumber);
		this.__setCurrentPageInCurrentBatch(pageNumber);
	}


	private __loadBatchContainingPage(pageNumber) {
		this.__batchinator.set_currentBatchNumber_basedOnPage(pageNumber);

		this.__paginator.data = this.__dataSource.getData(
			this.__batchinator.currentBatchNumber,
			this.__batchinator.itemsPerBatch
		);
	}


}