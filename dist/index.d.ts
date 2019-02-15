import { BaseClass } from '@writetome51/base-class';


export declare abstract class PaginatorDataController extends BaseClass {


	itemsPerPage: number;
	itemsPerBatch: number;
	private __paginator;
	private __dataSource;
	private __batchinator;


	constructor(
		__paginator: {
			data: any[];
			itemsPerPage: number;
			currentPageNumber: number;
		},
		__dataSource: {
			getData: (batchNumber: number, numberOfItemsToGet: number) => any[];
			getDataTotal: () => number;
		}
	);


	setCurrentPage(pageNumber: number): void;


	private __setCurrentPageInCurrentBatch;
	private __loadBatchAndPage;
	private __loadBatchContainingPage;
}
