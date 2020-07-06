/***************************
 An abstract TypeScript/Javascript class intended for pagination where   
 all the data to be paginated can't be loaded in memory at once.  Instead  
 of only requesting one page of data at-a-time from the data source, the  
 paginator has the option of requesting a bigger load, determined by the  
 property `itemsPerLoad`.

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

	private __pageInfo: {
		setItemsPerPage: (num) => void, getItemsPerPage: () => number, getTotalPages: () => number
	};
	private __loadInfo: { setItemsPerLoad: (num) => void, getItemsPerLoad: () => number };

	private __currentPage: {
		get: () => any[], set: (pageNumber) => Promise<void>, reset: (pageNumber) => Promise<void>
	};


	constructor(dataSource, private __setup: (dataSource) => void) {
		this.__setup(dataSource);
	}


	// Total number of items the app can have loaded in memory.  Set this to highest number that
	// does not negatively affect app performance.

	setItemsPerLoad(num) {
		this.__loadInfo.setItemsPerLoad(num);
	}


	getItemsPerLoad(): number {
		return this.__loadInfo.getItemsPerLoad();
	}


	setItemsPerPage(num) {
		this.__pageInfo.setItemsPerPage(num);
	}


	getItemsPerPage(): number {
		return this.__pageInfo.getItemsPerPage();
	}


	async setCurrentPageNumber(num): Promise<void> {
		this.__currentPageNumber = num;
		await this.__currentPage.set(num);
	}


	// Intended to be called after the order of the dataset changes (like after sorting),
	// or after the total number of items changes (like after a search).

	async resetToFirstPage(): Promise<void> {
		this.__currentPageNumber = 1;
		await this.__currentPage.reset(1);
	}


	getCurrentPageNumber(): number {
		return this.__currentPageNumber;
	}


	getCurrentPage(): any[] {
		return this.__currentPage.get();
	}


	getTotalPages(): number {
		return this.__pageInfo.getTotalPages();
	}


}
