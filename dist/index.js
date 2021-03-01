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

export class AbstractBigDatasetPaginator {

	constructor(
		__setup,
		setupArgs = []
	) {
		this.__setup = __setup;
		this.__setup(...setupArgs);
	}


	setItemsPerLoad(num) {
		this.__loadInfo.setItemsPerLoad(num);
	}


	getItemsPerLoad() {
		return this.__loadInfo.getItemsPerLoad();
	}


	setItemsPerPage(num) {
		this.__pageInfo.setItemsPerPage(num);
	}


	getItemsPerPage() {
		return this.__pageInfo.getItemsPerPage();
	}


	async setCurrentPageNumber(num) {
		await this.__currentPage.set(num);
	}


	getCurrentPageNumber() {
		return this.__currentPage.getNumber();
	}


	// Intended to be called after the order of the dataset changes (like after sorting),
	// or after the total number of items changes (like after a search).

	async resetToFirstPage() {
		await this.__currentPage.reset(1);
	}


	getCurrentPage() {
		return this.__currentPage.get();
	}


	getTotalPages() {
		return this.__pageInfo.getTotalPages();
	}

}
