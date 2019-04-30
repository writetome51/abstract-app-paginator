import { BaseClass } from '@writetome51/base-class';


export declare class AppPaginator extends BaseClass {

	cacheItemLimit: number;
	itemsPerPage: number;
	currentPageNumber: number;

	readonly currentPage: any[];
	readonly totalPages: number;
	readonly totalItems: number;

	private __dataSource;
	private __arrPaginator;
	private __batchCalc;
	private __currentPageNumber;


	constructor(__dataSource: {
		getData: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
		dataTotal: number;
	});


	reload(): void;


	private __loadBatchAndPage;
	private __loadBatchContainingPage;
	private __setCurrentPageInCurrentBatch;
	private __loadBatch;
}
