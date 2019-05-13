/***************************
 AbstractAppPaginator is intended for a real-world web application.  It automatically
 batchinates the full dataset in case it's huge.

 To use: create a subclass of this and call super() inside the constructor, passing
 in a `dataSource` and a `setup` function that becomes a private method of
 AbstractAppPaginator.  setup() must take dataSource as a parameter and assign values
 to the properties `_pageInfo`, `_batchInfo`, and `_fullDatasetPaginator`.  setup()
 is what makes the class actually functional.
 ***************************/

export abstract class AbstractAppPaginator {


	protected _pageInfo: { itemsPerPage: number, totalPages: number };
	protected _batchInfo: { itemsPerBatch: number };

	protected _fullDatasetPaginator: {
		// Setting `currentPageNumber` must automatically update `currentPage`

		currentPageNumber: number, currentPage: any[],

		// This must reload the data of page 1 and set `currentPageNumber` to 1.

		reset: () => void
	};


	constructor(dataSource, private __setup: (dataSource) => void) {
		this.__setup(dataSource);
	}


	// Total number of items the app can have loaded in memory.  Set this to highest number that
	// does not negatively affect app performance.

	set itemsPerBatch(value) {
		this._batchInfo.itemsPerBatch = value;
	}


	get itemsPerBatch(): number {
		return this._batchInfo.itemsPerBatch;
	}


	set itemsPerPage(value) {
		this._pageInfo.itemsPerPage = value;
	}


	get itemsPerPage(): number {
		return this._pageInfo.itemsPerPage;
	}


	// Setting this.currentPageNumber automatically updates this.currentPage

	set currentPageNumber(value) {
		this._fullDatasetPaginator.currentPageNumber = value;
	}


	get currentPageNumber(): number {
		return this._fullDatasetPaginator.currentPageNumber;
	}


	get currentPage(): any[] {
		return this._fullDatasetPaginator.currentPage;
	}


	get totalPages(): number {
		return this._pageInfo.totalPages;
	}


	// Intended to be called after the order of the dataset changes (like after sorting),
	// or after the total number of items changes (like after a search).

	reset(): void {
		this._fullDatasetPaginator.reset();
	}


}
