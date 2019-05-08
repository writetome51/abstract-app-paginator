import { PageLoader } from './PageLoader';


export class AppPaginator {


	private __currentPageNumber: number;


	constructor(
		// `__batchPaginator` contains a reference to the loaded batch.  The same instance must be
		// injected into `__pageLoader`.

		private __batchPaginator: { currentPage: any[] }, // Acts as the batch container.

		private __pageLoader: PageLoader
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


	// Intended to be called after the order of the entire dataset changes (like after sorting),
	// or after the total number of items changes.

	reload(): void {
		this.__pageLoader.reloadPage(1);
	}


}
