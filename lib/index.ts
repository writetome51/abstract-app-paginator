/***************************
 An abstract TypeScript/Javascript class intended for pagination where   
 all the data to be paginated can't be loaded in memory at once.  Instead  
 of only requesting one page of data at-a-time from the data source, the
 paginator has the option of requesting multiple pages of data to make
 requests more efficient.  You configure this with the functions
 `setItemsPerPage()` and `setItemsPerLoad()`. (A load is either the total
 number of items you want the app to have in memory at once, or the total
 number of items your data source is willing to give you at once —— whichever
 is less.)

 A subclass must pass a `__setup()` function to this class' constructor
 (`__setup()` becomes a private method to give it access to this class'
 private properties).  As for what `__setup()` does, the only requirement is
 the properties `__pageInfo`,`__loadInfo`, and `__currentPage` must be
 assigned values inside it so the code here will execute.
 ***************************/

export abstract class AbstractBigDatasetPaginator {

	// These 3 properties must be assigned values inside `this.__setup()` (see constructor).

	private __pageInfo: {
		setItemsPerPage: (num) => void, getItemsPerPage: () => number, getTotalPages: () => number
	};
	private __loadInfo: { setItemsPerLoad: (num) => void, getItemsPerLoad: () => number };

	private __currentPage: {
		get: () => any[], set: (pageNumber) => Promise<void>, reset: (pageNumber) => Promise<void>,
		getNumber: () => number
	};


	constructor(
		private __setup: (...args) => void,
		setupArgs = []
	) {
		this.__setup(...setupArgs);
	}


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


	async setCurrentPageNumber(num, option = {reload:false}): Promise<void> {
                if (option.reload) await this.__currentPage.reset(num);
		else await this.__currentPage.set(num);
	}


	getCurrentPageNumber(): number {
		return this.__currentPage.getNumber();
	}


	getCurrentPage(): any[] {
		return this.__currentPage.get();
	}


	getTotalPages(): number {
		return this.__pageInfo.getTotalPages();
	}

}
