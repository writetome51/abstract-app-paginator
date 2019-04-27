import { BaseClass } from '@writetome51/base-class';
import { Batchinator } from './test_batchinator/index';
import { ArrayPaginator } from '@writetome51/array-paginator';
import { hasValue, noValue } from '@writetome51/has-value-no-value';


export class AppPaginator extends BaseClass {


	// __arrPaginator is only designed for paginating a dataset small enough to fit entirely
	// inside it without having to split it into batches.

	private __arrPaginator = new ArrayPaginator();

	// __batchinator is needed just in case this.cacheItemLimit is smaller than this.totalItems.
	// This means the entire dataset must be split into batches, where 1 batch is the size of
	// this.cacheItemLimit.  __batchinator tells __dataSource what data to fetch (i.e, if
	// cacheItemLimit is 50, and __batchinator wants batch 1, it tells __dataSource to fetch items 1
	// thru 50.  If it wants batch 2, it tells __dataSource to fetch items 51 thru 100).  It also
	// tells __arrPaginator what page to show.

	private __batchinator: Batchinator;


	constructor(
		private __dataSource: {

			// getData() is called whenever a new batch must be loaded.
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

		this.__batchinator = new Batchinator(this.__dataSource);
		this.itemsPerPage = 1;  // Batchinator requires this to be set before you load a batch.
		this.cacheItemLimit = 1;
	}


	set cacheItemLimit(value) {
		this.__batchinator.itemsPerBatch = value;  // batchinator validates value.
		// Every time cacheItemLimit changes, the batch must be reloaded.
		// For simplicity, we'll reload the first batch.
		this.__loadBatchAndPage(1);
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
		if (noValue(this.__batchinator.currentBatchNumber)) throw new Error(
			`You can't get the property "currentPageNumber" because this.__batchinator.currentBatchNumber 
			is undefined.`
		);
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
		return this.__dataSource.dataTotal;
	}


	private __loadBatchAndPage(pageNumber) {
		this.__loadBatchContainingPage(pageNumber);
		this.__setCurrentPageInCurrentBatch(pageNumber);
	}


	private __loadBatchContainingPage(pageNumber) {
		this.__batchinator.set_currentBatchNumber_basedOnPage(pageNumber);
		this.__loadBatch();
	}


	private __setCurrentPageInCurrentBatch(pageNumber) {
		this.__arrPaginator.currentPageNumber =
			this.__batchinator.getCurrentPageNumberForPaginator(pageNumber);
	}


	private __loadBatch() {

		this.__arrPaginator.data = this.__dataSource.getData(
			this.__batchinator.currentBatchNumber,
			this.cacheItemLimit,
			this.__batchinator.currentBatchNumberIsLast
		);

	}


}
