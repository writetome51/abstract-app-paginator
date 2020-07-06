/***************************
 An abstract TypeScript/Javascript class intended for pagination where   
 all the data to be paginated can't be loaded in memory at once.  Instead  
 of only requesting one page of data at-a-time from the data source, the  
 paginator has the option of requesting a bigger load, determined by the  
 property `itemsPerLoad`.

 A subclass must pass a `__setup()` function to this class' constructor
 (`__setup()` becomes a private method to give it access to this class'
 private properties).  Any further arguments to the constructor are
 passed to `__setup()`.  As for what `__setup()` does, the only
 requirement is the properties `__pageInfo`,`__loadInfo`, and
 `__currentPage` must be assigned values inside it so the code here will
 execute.
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


	constructor(
		private __setup: (...args) => void,
		setupArgs: any[]
	) {
		this.__setup(...setupArgs);
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
