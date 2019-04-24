import { BaseClass } from '@writetome51/base-class';
import { Batchinator } from '@writetome51/batchinator';
import { ArrayPaginator } from '@writetome51/array-paginator';


export class AppPaginator extends BaseClass {


	// __arrPaginator is only designed for paginating a dataset small enough to fit entirely
	// inside it without having to split it into batches.

	private __arrPaginator = new ArrayPaginator();

	// __batchinator is needed just in case this.cacheItemLimit is smaller than this.totalItems.
	// This means the entire dataset must be split into batches, where 1 batch is the size of
	// this.cacheItemLimit.  __batchinator tells __dataSource what data to fetch (i.e, if
	// cacheItemLimit is 50, and __batchinator wants batch 1, it tells __dataSource to fetch items 1
	// thru 50.  If it wants batch 2, it tells __dataSource to fetch items 51 thru 100).  It also
	// tells __arrPaginator what page to show.

	private __batchinator: Batchinator;


	constructor(
		private __dataSource: {

			// getData() is called whenever a new batch must be loaded.

			getData: (batchNumber: number, numberOfItemsToGet: number) => any[];

			// dataTotal: number of items in entire dataset, not the batch.
			// This must stay accurate after user-actions that change the total, such as searches.

			dataTotal: number;
		}
	) {
		super();

		this.__batchinator = new Batchinator(this.__dataSource);
		this.cacheItemLimit = 250;  // Batchinator requires this to be set before itemsPerPage.
		this.itemsPerPage = 25;  // Batchinator requires this to be set before you load a batch.
	}


	set cacheItemLimit(value) {
		this.__batchinator.itemsPerBatch = value;  // batchinator validates value.

		// temp:
		console.log(this.__arrPaginator.data);
	}


	get cacheItemLimit(): number {
		return this.__batchinator.itemsPerBatch;
	}


	set itemsPerPage(value) {
		this.__batchinator.itemsPerPage = value;
		this.__arrPaginator.itemsPerPage = value;
	}


	get itemsPerPage(): number {
		return this.__batchinator.itemsPerPage;
	}


	set currentPageNumber(value) {
		if (this.__batchinator.currentBatchContainsPage(value)) {
			this.__setCurrentPageInCurrentBatch(value);
		} else this.__loadBatchAndPage(value);
	}


	get currentPageNumber(): number {
		return (this.__arrPaginator.currentPageNumber +
			((this.__batchinator.currentBatchNumber - 1) * this.__batchinator.pagesPerBatch));
	}


	get currentPage(): any[] {
		return this.__arrPaginator.currentPage;
	}


	get totalPages(): number {
		return this.__batchinator.totalPages;
	}


	get totalItems(): number {
		// This will keep batchinator.totalDataCount in sync with dataSource.dataTotal.
		this.__batchinator.totalDataCount = this.__dataSource.dataTotal;
		return this.__batchinator.totalDataCount;
	}


	private __loadBatchAndPage(pageNumber) {
		this.__loadBatchContainingPage(pageNumber);
		this.__setCurrentPageInCurrentBatch(pageNumber);
	}


	private __loadBatchContainingPage(pageNumber) {
		this.__batchinator.set_currentBatchNumber_basedOnPage(pageNumber);

		this.__arrPaginator.data = this.__dataSource.getData(
			this.__batchinator.currentBatchNumber,
			this.cacheItemLimit
		);
	}


	private __setCurrentPageInCurrentBatch(pageNumber) {
		this.__arrPaginator.currentPageNumber =
			this.__batchinator.getCurrentPageNumberForPaginator(pageNumber);
	}


}
