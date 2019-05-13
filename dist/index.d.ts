/***************************
 AbstractAppPaginator is intended for a real-world web application.  It automatically
 batchinates the full dataset in case it's huge.

 To use: create a subclass of this and call super() inside the constructor, passing
 in a `dataSource` and a `setup` function that becomes a private method of
 AbstractAppPaginator.  setup() must take dataSource as a parameter and assign values
 to the properties `__pageInfo`, `__batchInfo`, and `__pageLoader`.  setup()
 is what makes the class actually functional.
 ***************************/

export declare abstract class AbstractAppPaginator {

	itemsPerBatch: number;
	itemsPerPage: number;
	currentPageNumber: number;
	readonly currentPage: any[];
	readonly totalPages: number;

	private __setup;
	private __currentPageNumber;
	private __pageInfo;
	private __batchInfo;
	private __pageLoader;


	constructor(
		dataSource: any,
		__setup: (dataSource: any) => void
	);


	reset(): void;
}
