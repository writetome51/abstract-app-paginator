import { ArrayPaginator } from '@writetome51/array-paginator';
import { BaseClass } from '@writetome51/base-class';
import { BatchCalculator } from '@writetome51/batch-calculator';
import { BatchGetter } from './BatchGetter';
import { setArray } from '@writetome51/set-array';


export class AppPaginator extends BaseClass {


	// `__arrPaginator` is only designed for paginating a dataset small enough to fit entirely
	// inside it without having to split it into batches.

	private __arrPaginator = new ArrayPaginator();

	private __currentPageNumber: number;


	constructor(

		private __batchGetter: BatchGetter,

		// `__batchCalc` is needed just in case this.itemsPerBatch < this.__dataSource.dataTotal .
		// This means the entire dataset must be split into batches.  __batchCalc tells this.__dataSource
		// what data to fetch.  It also tells __arrPaginator what page to show.
		// The same __batchCalc instance must also be injected into this.__batchGetter .

		private __batchCalc: BatchCalculator
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
	// or after the dataTotal changes.

	reload(): void {
		// This causes __batchCalc.currentBatchNumber to become undefined.  This is good.
		this.__batchCalc.itemsPerBatch = this.__batchCalc.itemsPerBatch;
		// Resets __batchCalc.currentBatchNumber to 1 and re-retrieves batch 1.
		this.currentPageNumber = 1;
	}


	private __loadBatchAndPage(pageNumber) {
		this.__loadBatchContainingPage(pageNumber);
		this.__setCurrentPageInCurrentBatch(pageNumber);
	}


	private __setCurrentPageInCurrentBatch(pageNumber) {
		this.__arrPaginator.currentPageNumber =
			this.__batchCalc.getCurrentPageNumberForPaginator(pageNumber);
	}


	private __loadBatchContainingPage(pageNumber) {
		let batch = this.__batchGetter.getBatchContainingPage(pageNumber);
		setArray(this.__arrPaginator.data, batch);
	}


}
