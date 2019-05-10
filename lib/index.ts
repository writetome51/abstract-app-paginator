import { __loadAppPaginatorDependencies } from './privy/dependencyLoader';
import { PaginationPageInfo } from '@writetome51/pagination-page-info';
import { PaginationBatchInfo } from '@writetome51/pagination-batch-info';
import { FullDatasetPaginator } from './FullDatasetPaginator';


/***************************
 AppPaginator is intended for a real-world web application.
 It automatically batchinates the full dataset in case it's huge.
 In case you want to use multiple paginators in a single page (say you're displaying multiple
 tables and each has its own pagination controls), you can create multiple instances of
 AppPaginator, and give each its own `dataSource` (see constructor).
 ***************************/

export class AppPaginator {


	private __fullDatasetPaginator: FullDatasetPaginator;
	private __pageInfo: PaginationPageInfo;
	private __batchInfo: PaginationBatchInfo;


	constructor(
		dataSource: {

			// The number of items `getBatch()` returns must match `itemsPerBatch`.  If `isLastBatch` is
			// true, it must only return the remaining items in the dataset and ignore itemsPerBatch.

			getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];

			// `dataTotal`: number of items in entire dataset, not the batch.
			// This must stay accurate after actions that change the total, such as searches.

			dataTotal: number;
		}
	) {
		__loadAppPaginatorDependencies(this, dataSource);
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
		this.__fullDatasetPaginator.currentPageNumber = value;
	}


	get currentPageNumber(): number {
		return this.__fullDatasetPaginator.currentPageNumber;
	}


	get currentPage(): any[] {
		return this.__fullDatasetPaginator.currentPage;
	}


	get totalPages(): number {
		return this.__pageInfo.totalPages;
	}


	// Intended to be called after the order of the dataset changes (like after sorting),
	// or after the total number of items changes (like after a search).

	reset(): void {
		this.__fullDatasetPaginator.reset();
	}


}
