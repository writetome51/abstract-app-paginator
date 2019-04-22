import { BaseClass } from '@writetome51/base-class';
import { Batchinator } from '@writetome51/batchinator';
import { ArrayPaginator } from '@writetome51/array-paginator';

// This is designed so it handles a DataSource, a Batchinator, and an ArrayPaginator.
// The ArrayPaginator is only designed for paginating a dataset small enough to fit entirely
// inside it without having to split it into batches.  The Batchinator is needed just in 
// case the entire dataset is so big it must be split into batches, where 1 batch is the total number 
// of items the ArrayPaginator can hold without negatively affecting the app performance.  
// The Batchinator tells DataSource what data, and how much of it, to fetch.  It tells 
// ArrayPaginator what page to show.


export class AppPaginator extends BaseClass {

	// cacheItemLimit: integer (default is 500).
	// itemsPerPage: integer (default is 25)
	// currentPageNumber: integer
	// currentPage: any[]  (read-only) (all items in current page)
	// totalPages: integer  (read-only)
	// totalItems: integer  (read-only) (number of items in entire dataset)

	private __batchinator = new Batchinator();
	private __arrPaginator = new ArrayPaginator();


	constructor(
		// begin injected dependencies....
		private __dataSource: {
			getData: (batchNumber: number, numberOfItemsToGet: number) => any[];
			getDataTotal: () => number; // returns total number of items in data set.
		}
		// ....end injected dependencies.
	) {
		super();

		this.__batchinator.totalDataCount = this.__dataSource.getDataTotal();
		this.cacheItemLimit = 500;
		this.itemsPerPage = 25;
		this.__loadBatchAndPage(1);
	}


	set cacheItemLimit(value) {
		this.__batchinator.itemsPerBatch = value;  // batchinator validates value.
		if (this.__batchinator.totalDataCount < value) {
			this.__batchinator.itemsPerBatch = this.__batchinator.totalDataCount;
		}
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
		}
		else this.__loadBatchAndPage(value);
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
		return this.__batchinator.totalDataCount;
	}


	private __setCurrentPageInCurrentBatch(pageNumber) {
		this.__arrPaginator.currentPageNumber =
			this.__batchinator.getCurrentPageNumberForPaginator(pageNumber);
	}


	private __loadBatchAndPage(pageNumber) {
		this.__loadBatchContainingPage(pageNumber);
		this.__setCurrentPageInCurrentBatch(pageNumber);
	}


	private __loadBatchContainingPage(pageNumber) {
		this.__batchinator.set_currentBatchNumber_basedOnPage(pageNumber);

		this.__arrPaginator.data = this.__dataSource.getData(
			this.__batchinator.currentBatchNumber,
			this.__batchinator.itemsPerBatch
		);
	}


}
