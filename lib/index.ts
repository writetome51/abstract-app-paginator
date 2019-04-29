import { BaseClass } from '@writetome51/base-class';
import { BatchCalculator } from '@writetome51/batch-calculator';
import { ArrayPaginator } from '@writetome51/array-paginator';
import { hasValue, noValue } from '@writetome51/has-value-no-value';


export class AppPaginator extends BaseClass {


	// __arrPaginator is only designed for paginating a dataset small enough to fit entirely
	// inside it without having to split it into batches.

	private __arrPaginator = new ArrayPaginator();

	// __batchCalc is needed just in case this.cacheItemLimit is smaller than this.totalItems.
	// This means the entire dataset must be split into batches, where 1 batch is the size of
	// this.cacheItemLimit.  __batchCalc tells __dataSource what data to fetch.  It also tells
	// __arrPaginator what page to show.

	private __batchCalc: BatchCalculator;
	private __currentPageNumber: number;


	constructor(
		private __dataSource: {

			// getData() is called whenever a new batch is loaded.
			// The number of items it returns matches itemsPerBatch.
			// If isLastBatch is true, it only returns the remaining items in the dataset, and ignores
			// the itemsPerBatch parameter.

			getData: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];

			// dataTotal: number of items in entire dataset, not the batch.
			// This must stay accurate after user-actions that change the total, such as searches.

			dataTotal: number;
		}
	) {
		super();

		this.__batchCalc = new BatchCalculator(this.__dataSource);

		// This default is necessary because the user can't do anything until this property is set.
		this.itemsPerPage = 25;
	}


	set cacheItemLimit(value) {
		this.__batchCalc.itemsPerBatch = value;  // batchinator validates value.
	}


	get cacheItemLimit(): number {
		return this.__batchCalc.itemsPerBatch;
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
		return this.__batchCalc.totalPages;
	}


	get totalItems(): number {
		return this.__dataSource.dataTotal;
	}


	private __loadBatchAndPage(pageNumber) {
		this.__loadBatchContainingPage(pageNumber);
		this.__setCurrentPageInCurrentBatch(pageNumber);
	}


	private __loadBatchContainingPage(pageNumber) {
		this.__batchCalc.set_currentBatchNumber_basedOnPage(pageNumber);
		this.__loadBatch();
	}


	private __setCurrentPageInCurrentBatch(pageNumber) {
		this.__arrPaginator.currentPageNumber =
			this.__batchCalc.getCurrentPageNumberForPaginator(pageNumber);
	}


	private __loadBatch() {
		this.__arrPaginator.data = this.__dataSource.getData(

			this.__batchCalc.currentBatchNumber,
			this.cacheItemLimit,
			this.__batchCalc.currentBatchNumberIsLast
		);

	}


}
