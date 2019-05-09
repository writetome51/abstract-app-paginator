/***************************
 This class is intended for paginating a big dataset.
 It supports batchination, in case the full dataset is too big to load entirely.
 ***************************/

export declare class FullDatasetPaginator {

	currentPageNumber: number;
	readonly currentPage: any[];

	private __batchPaginator;
	private __pageLoader;
	private __currentPageNumber;


	constructor(
		__batchPaginator: {
			currentPage: any[];
		},
		__pageLoader: {
			loadPage: (pageNumber: number) => void;
			reloadPage: (pageNumber: number) => void;
		}
	);


	reset(): void;

}
