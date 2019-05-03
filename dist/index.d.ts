import { ArrayPaginator } from '@writetome51/array-paginator';
import { BaseClass } from '@writetome51/base-class';
import { BatchCalculator } from '@writetome51/batch-calculator';
import { BatchLoader } from '@writetome51/batch-loader';


export declare class AppPaginator extends BaseClass {

	itemsPerPage: number;
	currentPageNumber: number;
	readonly currentPage: any[];
	readonly totalPages: number;

	private __arrPaginator;
	private __batchCalc;
	private __batchLoader;
	private __currentPageNumber;


	constructor(
		__arrPaginator: ArrayPaginator,
		__batchCalc: BatchCalculator,
		__batchLoader: BatchLoader
	);


	reload(): void;


	private __loadBatchAndPage;
	private __setCurrentPageInCurrentBatch;

}
