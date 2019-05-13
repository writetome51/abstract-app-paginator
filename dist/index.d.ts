/***************************
 AbstractAppPaginator is intended for a real-world web application.
 It automatically batchinates the full dataset in case it's huge.
 In case you want to use multiple paginators in a single page (say you're displaying multiple
 tables and each has its own pagination controls), you can create multiple instances of
 AbstractAppPaginator, and each gets its own `dataSource`.
 ***************************/

export declare class AppPaginator {

	itemsPerBatch: number;
	itemsPerPage: number;
	currentPageNumber: number;
	readonly currentPage: any[];
	readonly totalPages: number;

	private __fullDatasetPaginator;
	private __pageInfo;
	private __batchInfo;


	constructor(
		dataSource: {
			getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
			dataTotal: number;
		}
	);


	reset(): void;

}
