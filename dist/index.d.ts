/***************************
 An abstract TypeScript/Javascript class intended for pagination where all the data to be
 paginated can't be loaded in memory at once.  Instead of only requesting one page of data
 at-a-time from the data source, the paginator has the option of requesting multiple pages
 of data to make requests more efficient.  You configure this with the functions
 `setItemsPerPage()` and `setItemsPerLoad()`. (A load is either the total number of items
 you want the app to have in memory at once, or the total number of items your data source
 is willing to give you at once —— whichever is less.)

 A subclass must pass a `__setup()` function to this class' constructor (`__setup()`
 becomes a private method to give it access to this class' private properties).  The only
 requirement for `__setup()` is the properties `__pageInfo`, `__loadInfo`, and
 `__loadedPage` must be assigned values inside it.
 ***************************/

export declare abstract class AbstractBigDatasetPaginator {

	private __setup: (...args: any[]) => void;

	// These 3 properties must be assigned values inside `this.__setup()` (see constructor).

	private __pageInfo: {
		setItemsPerPage: (num: number) => void,  getItemsPerPage: () => number,
		getTotalPages: () => number
	};
	private __loadInfo: {
		setItemsPerLoad: (num: number) => void,  getItemsPerLoad: () => number
	};
	private __loadedPage: {
		get: () => any[],  set: (pageNumber: number) => Promise<void>,

		// `reset` must reload page data from the source
		reset: (pageNumber: number) => Promise<void>,
		getNumber: () => number
	};



	constructor(__setup: (...args: any[]) => void,  setupArgs?: any[]);


	setItemsPerLoad(num: number): void;


	getItemsPerLoad(): number;


	setItemsPerPage(num: number): void;


	getItemsPerPage(): number;


	getTotalPages(): number;


	setCurrentPageNumber(
		num: number,
		option?: { reload: boolean; }
	): Promise<void>;


	getCurrentPageNumber(): number;


	getCurrentPage(): any[];

}
