/***************************
 An abstract TypeScript/Javascript class intended for pagination where   
 all the data to be paginated can't be loaded in memory at once.  Instead  
 of only requesting one page of data at-a-time from the data source, the  
 paginator has the option of requesting a bigger load, determined by the  
 property `itemsPerLoad`.  This makes the paginator's communication  
 with the data source more efficient.

 Though it is a class, most of its implementation does not exist as-is.  A  
 subclass must be made, which provides a `dataSource` and  
 `__setup()` function to this class' constructor.  `__setup()` becomes a  
 class method and must accept `dataSource` as a parameter, but as for  
 what `dataSource` is and what `__setup()` does, that is up to the  
 subclass.  The only requirement this class makes is `__setup()` must  
 assign values to the properties `__pageInfo`, `__loadInfo`, and  
 `__pageLoader` so the code in this class will execute properly.
 ***************************/

export abstract class AbstractBigDatasetPaginator {

	private __currentPageNumber: number;


	// These 3 properties must be assigned values inside `this.__setup()` (see constructor).

	private __pageInfo: { itemsPerPage: number, totalPages: number };
	private __loadInfo: { itemsPerLoad: number };

	private __pageLoader: {

		loadPage: (pageNumber) => Promise<void>,

		// Must load `pageNumber` all over again, even if that page is already currently loaded.

		forceLoadPage: (pageNumber) => Promise<void>,

		// All items in the loaded page.

		loadedPage: any[]
	};


	constructor(dataSource, private __setup: (dataSource) => void) {
		this.__setup(dataSource);
	}


	// Total number of items the app can have loaded in memory.  Set this to highest number that
	// does not negatively affect app performance.

	set itemsPerLoad(value) {
		this.__loadInfo.itemsPerLoad = value;
	}


	get itemsPerLoad(): number {
		return this.__loadInfo.itemsPerLoad;
	}


	set itemsPerPage(value) {
		this.__pageInfo.itemsPerPage = value;
	}


	get itemsPerPage(): number {
		return this.__pageInfo.itemsPerPage;
	}


	get currentPageNumber(): number {
		return this.__currentPageNumber;
	}


	get currentPage(): any[] {
		return this.__pageLoader.loadedPage;
	}


	get totalPages(): number {
		return this.__pageInfo.totalPages;
	}


	// Updates this.currentPage

	async set_currentPageNumber(value): Promise<void> {
		this.__currentPageNumber = value;
		await this.__pageLoader.loadPage(value);
	}


	// Intended to be called after the order of the dataset changes (like after sorting),
	// or after the total number of items changes (like after a search).

	async resetToFirstPage(): Promise<void> {
		this.__currentPageNumber = 1;
		await this.__pageLoader.forceLoadPage(1);
	}


}
