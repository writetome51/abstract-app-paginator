/***************************
 AbstractAppPaginator is intended for a real-world web application.  It automatically
 batchinates the full dataset in case it's huge.

 To use: create a subclass of this and call super() inside the constructor, passing
 in a `dataSource` and a `setup` function that becomes a private method of
 AbstractAppPaginator.  setup() must take dataSource as a parameter and assign values
 to the properties `__pageInfo`, `__batchInfo`, and `__pageLoader`.  setup()
 is what makes the class actually functional.
 ***************************/

export abstract class AbstractAppPaginator {

	private __currentPageNumber: number;

	private __pageInfo: { itemsPerPage: number, totalPages: number };
	private __batchInfo: { itemsPerBatch: number };

	private __pageLoader: {

		loadPage: (pageNumber) => void,

		// Must load `pageNumber` all over again, even if that page is already currently loaded.

		forceLoadPage: (pageNumber) => void,

		loadedPage: any[]
	};


	constructor(dataSource, private __setup: (dataSource) => void) {
		this.__setup(dataSource);
	}


	// Total number of items the app can have loaded in memory.  Set this to highest number that
	// does not negatively affect app performance.

	set itemsPerBatch(value) {
		this.__batchInfo.itemsPerBatch = value;
	}


	get itemsPerBatch(): number {
		return this.__batchInfo.itemsPerBatch;
	}


	set itemsPerPage(value) {
		this.__pageInfo.itemsPerPage = value;
	}


	get itemsPerPage(): number {
		return this.__pageInfo.itemsPerPage;
	}


	// Setting this.currentPageNumber automatically updates this.currentPage

	set currentPageNumber(value) {
		this.__pageLoader.loadPage(value);
		this.__currentPageNumber = value;
	}


	get currentPageNumber(): number {
		return this.__currentPageNumber;
	}


	get currentPage(): any[] {
		return this.__pageLoader.loadedPage;
	}


	get totalPages(): number {
		return this.__pageInfo.totalPages;
	}


	// Intended to be called after the order of the dataset changes (like after sorting),
	// or after the total number of items changes (like after a search).

	reset(): void {
		this.__pageLoader.forceLoadPage(1);
		this.__currentPageNumber = 1;
	}


}
