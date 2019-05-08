import { ArrayPaginator } from '@writetome51/array-paginator';
import { BaseClass } from '@writetome51/base-class';
import { PaginationPageInfo } from '@writetome51/pagination-page-info';
import { PageLoader } from './PageLoader';


export class AppPaginator extends BaseClass {


	private __currentPageNumber: number;


	constructor(
		// `__batchPaginator` is only designed for paginating a dataset small enough to fit entirely
		// inside it without having to split it into batches.  The same instance must be injected into
		// `__pageLoader`.

		private __batchPaginator: ArrayPaginator, // Acts as the batch container.

		private __pageInfo: PaginationPageInfo,
		private __pageLoader: PageLoader
	) {
		super();

		// This default is necessary because the user can't do anything until this property is set.
		this.itemsPerPage = 25;
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
		return this.__batchPaginator.currentPage;
	}


	get totalPages(): number {
		return this.__pageInfo.totalPages;
	}


	// Intended to be called after the order of the entire dataset changes (like after sorting),
	// or after the total number of items changes.

	reload(): void {
		this.__pageLoader.reloadPage(1);
	}


}
