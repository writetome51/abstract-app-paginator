/***************************
 This class is intended for pagination in a real-world web app.  Though it is a class, most of its
 implementation does not exist as-is.  A subclass must be made, which provides a `dataSource` and
 `__setup` function to this class' constructor.  __setup() becomes a class method and must accept
 dataSource as a parameter, but as for what dataSource is and what __setup() does, that is up to
 the subclass.  The only requirement this class makes is __setup() must assign values to the
 properties `__pageInfo`, `__batchInfo`, and `__pageLoader`, so the code in this class will execute
 properly.

 It's possible to use this class for 'batchination', where, instead of only requesting one page of
 data at-a-time from the server, the client requests a bigger `batch`, the size of which is determined
 by the property `itemsPerBatch`.  Then the batch is paginated in the client.  If the user requests a
 page that would be found in a different batch, the client requests that batch from the server and
 paginates it.  And so on.
 ***************************/

export declare abstract class AbstractAppPaginator {

	itemsPerBatch: number;
	itemsPerPage: number;
	readonly currentPageNumber: number;
	readonly currentPage: any[];
	readonly totalPages: number;

	private __pageInfo: { itemsPerPage: number, totalPages: number };
	private __batchInfo: { itemsPerBatch: number };

	private __pageLoader: {

		loadPage: (pageNumber) => Promise<void>,

		// Must load `pageNumber` all over again, even if that page is already currently loaded.

		forceLoadPage: (pageNumber) => Promise<void>,

		// All items in the loaded page.

		loadedPage: any[]
	};

	private __setup;
	private __currentPageNumber;


	constructor(dataSource: any, __setup: (dataSource: any) => void);


	set_currentPageNumber(value: number): Promise<void>;


	reset(): Promise<void>;

}
