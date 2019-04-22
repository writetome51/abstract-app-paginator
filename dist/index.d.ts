import { BaseClass } from '@writetome51/base-class';


export declare class AppPaginator extends BaseClass {

	cacheItemLimit: number;
	itemsPerPage: number;
	currentPageNumber: number;
	readonly currentPage: any[];
	readonly totalPages: number;
	readonly totalItems: number;

	private __dataSource;
	private __batchinator;
	private __arrPaginator;


	constructor(
		__dataSource: {
			getData: (batchNumber: number, numberOfItemsToGet: number) => any[];
			getDataTotal: () => number;
		}
	);


	private __setCurrentPageInCurrentBatch;
	private __loadBatchAndPage;
	private __loadBatchContainingPage;

}
