/***************************
 An abstract TypeScript/Javascript class intended for pagination where
 all the data to be paginated can't be loaded in memory at once.  Instead
 of only requesting one page of data at-a-time from the data source, the
 paginator has the option of requesting a bigger load, determined by the
 function `setItemsPerLoad()`.

 A subclass must pass a `__setup()` function to this class' constructor
 (`__setup()` becomes a private method to give it access to this class'
 private properties).  Any further arguments to the constructor are
 passed to `__setup()`.  As for what `__setup()` does, the only
 requirement is the properties `__pageInfo`,`__loadInfo`, and
 `__currentPage` must be assigned values inside it so the code here will
 execute.
 ***************************/

export declare abstract class AbstractBigDatasetPaginator {

	private __setup;
	private __currentPageNumber;

	private __pageInfo: {
		setItemsPerPage: (num: number) => void;
		getItemsPerPage: () => number;
		getTotalPages: () => number;
	};
	private __loadInfo: {
		setItemsPerLoad: (num: number) => void;
		getItemsPerLoad: () => number;
	};

	private __currentPage: {
		get: () => any[];
		set: (pageNumber: number) => Promise<void>;
		reset: (pageNumber: number) => Promise<void>;
	};


	constructor(__setup: (...args: any[]) => void, setupArgs: any[]);

	setItemsPerLoad(num: number): void;

	getItemsPerLoad(): number;

	setItemsPerPage(num: number): void;

	getItemsPerPage(): number;

	setCurrentPageNumber(num: number): Promise<void>;

	getCurrentPageNumber(): number;

	resetToFirstPage(): Promise<void>;

	getCurrentPage(): any[];

	getTotalPages(): number;

}
