import { ArrayPaginator } from '@writetome51/array-paginator';
import { BaseClass } from '@writetome51/base-class';
import { BatchCalculator } from '@writetome51/batch-calculator';
import { BatchLoader } from '@writetome51/batch-loader';


export class AppPaginator extends BaseClass {


	private __currentPageNumber: number;

	constructor(

		// `__arrPaginator` is only designed for paginating a dataset small enough to fit entirely inside it 
		// without having to split it into batches.  The same instance must be injected into `__batchLoader`.

		private __arrPaginator: ArrayPaginator,

		// `__batchCalc` tells this.__arrPaginator what page to show.  The same instance must be injected 
		// into `__batchLoader` .

		private __batchCalc: BatchCalculator,

		// `__batchLoader` is needed just in case the entire dataset is too big to be handled by
		// this.__arrPaginator all at once.  It directly accesses the data source.

		private __batchLoader: BatchLoader,
	) {
		super();

		// This default is necessary because the user can't do anything until this property is set.
		this.itemsPerPage = 25;
	}


	set itemsPerPage(value) {
		this.__batchCalc.itemsPerPage = value;
		this.__arrPaginator.itemsPerPage = value;
	}


	get itemsPerPage(): number {
		return this.__batchCalc.itemsPerPage;
	}


	// Setting this.currentPageNumber automatically updates this.currentPage

	set currentPageNumber(value) {
		if (this.__batchCalc.currentBatchContainsPage(value)) {
			this.__setCurrentPageInCurrentBatch(value);
		}
		else this.__loadBatchAndPage(value);

		this.__currentPageNumber = value;
	}


	get currentPageNumber(): number {
		return this.__currentPageNumber;
	}


	get currentPage(): any[] {
		return this.__arrPaginator.currentPage;
	}


	get totalPages(): number {
		return this.__batchCalc.totalPages;
	}


	// Intended to be called after the order of the entire dataset changes (like after sorting),
	// or after the total number of items changes.

	reload(): void {
		// This causes __batchCalc.currentBatchNumber to become undefined.  This is what we want.
		this.__batchCalc.itemsPerBatch = this.__batchCalc.itemsPerBatch;
		// Resets __batchCalc.currentBatchNumber to 1 and re-retrieves batch 1.
		this.currentPageNumber = 1;
	}


	private __loadBatchAndPage(pageNumber) {
		this.__batchLoader.loadBatchContainingPage(pageNumber);
		this.__setCurrentPageInCurrentBatch(pageNumber);
	}


	private __setCurrentPageInCurrentBatch(pageNumber) {
		this.__arrPaginator.currentPageNumber =
			this.__batchCalc.getCurrentPageNumberForPaginator(pageNumber);
	}


}
