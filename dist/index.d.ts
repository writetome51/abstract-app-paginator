import { BaseClass } from '@writetome51/base-class';
import { Batchinator } from '@writetome51/batchinator';


export declare class PaginationDataController extends BaseClass {

	itemsPerPage: number;
	itemsPerBatch: number;

	private __batchinator;
	private __paginator;
	private __dataService;


	constructor(
		__batchinator: Batchinator,
		__paginator: {
			data: any[];
			itemsPerPage: number;
			currentPageNumber: number;
		},
		__dataService: any
	);


	showPage(pageNumber: number): void;


	private __showPageInCurrentBatch;
	private __loadBatchAndPage;
	private __loadBatchContainingPage;
}
