/***************************
 This class is intended for paginating a big dataset.
 It supports batchination, in case the full dataset is too big to load entirely.
 ***************************/


export class FullDatasetPaginator {


	private __currentPageNumber: number;


	constructor(
		private __batchPaginator: { currentPage: any[] },

		private __pageLoader: {
			loadPage: (pageNumber) => void,
			reloadPage: (pageNumber) => void
		}
	) {
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
		return this.__batchPaginator.currentPage;
	}


	// Intended to be called after the order of the dataset changes (like after sorting),
	// or after the total number of items changes (like after a search).

	reset(): void {
		this.__pageLoader.reloadPage(1);
		this.__currentPageNumber = 1;
	}


}
