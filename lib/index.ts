import { ArrayPaginator } from '@writetome51/array-paginator';
import { BaseClass } from '@writetome51/base-class';
import { PaginationPageInfo } from '@writetome51/pagination-page-info';
import { PaginationBatchInfo } from '@writetome51/pagination-batch-info';


export class AppPaginator extends BaseClass {


	private __currentPageNumber: number;


	constructor(
		// `__arrPaginator` is only designed for paginating a dataset small enough to fit entirely inside it
		// without having to split it into batches.  The same instance must be injected into `__batchLoader`.

		private __arrPaginator: ArrayPaginator, // Acts as the batch container.

		private __pageInfo: PaginationPageInfo,
		private __batchInfo: PaginationBatchInfo,
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
		if (this.__bch2pgTranslator.currentBatchContainsPage(value)) {
			this.__set_currentPage_inCurrentBatch(value);
		} else this.__loadBatchAndPage(value);

		this.__currentPageNumber = value;
	}


	get currentPageNumber(): number {
		return this.__currentPageNumber;
	}


	get currentPage(): any[] {
		return this.__arrPaginator.currentPage;
	}


	get totalPages(): number {
		return this.__pageInfo.totalPages;
	}


	// Intended to be called after the order of the entire dataset changes (like after sorting),
	// or after the total number of items changes.

	reload(): void {
		// This causes __batchInfo.currentBatchNumber to become undefined.  This is what we want.
		this.__batchInfo.itemsPerBatch += this.__pageInfo.itemsPerPage;
		this.__batchInfo.itemsPerBatch -= this.__pageInfo.itemsPerPage;

		// Resets __batchInfo.currentBatchNumber to 1 and re-retrieves batch 1.
		this.currentPageNumber = 1;
	}


}
