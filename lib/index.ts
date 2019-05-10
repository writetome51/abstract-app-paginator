import { __loadAppPaginatorDependencies } from './privy/dependencyLoader';
import { PaginationPageInfo } from '@writetome51/pagination-page-info';
import { PaginationBatchInfo } from '@writetome51/pagination-batch-info';
import { FullDatasetPaginator } from './FullDatasetPaginator';

/***************************

 ***************************/

export class AppPaginator {

	// Class must handle dependency injection for all the different objects used by it and its 
	// dependencies.  The intent is for this class to be self-sufficient, like a module.

	id: string;  // In case there's more than one instance.

	private __fullDatasetPaginator: FullDatasetPaginator;
	private __pageInfo: PaginationPageInfo;
	private __batchInfo: PaginationBatchInfo;


	constructor(
		dataSource: {

			// The number of items `getBatch()` returns matches `itemsPerBatch`.  If `isLastBatch` is true, 
			// it must only return the remaining items in the dataset, and ignore itemsPerBatch.

			getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];

			// `dataTotal`: number of items in entire dataset, not the batch.
			// This must stay accurate after actions that change the total, such as searches.

			dataTotal: number;
		}
	) {
		__loadAppPaginatorDependencies(this, dataSource);
	}


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


}
