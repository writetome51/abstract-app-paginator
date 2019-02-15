import { PaginatorDataController } from './index';
import { AppPaginator } from '@writetome51/app-paginator';


class TestPaginatorDataController extends PaginatorDataController {

	constructor(
		// begin injected dependencies...
		paginator: { data: any[], itemsPerPage: number, currentPageNumber: number },
		dataSource: {
			getData: (batchNumber: number, numberOfItemsToGet: number) => any[];
			getDataTotal: () => number;
		}
		// end injected dependencies.
	) {
		super(paginator, dataSource);
	}
}


class DataService {

	getData(batchNumber, numItemsToGet) {
		if (batchNumber === 1) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		if (batchNumber === 2) return [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
		if (batchNumber === 3) return [21, 22, 23, 24, 25, 26, 27, 28];
	}


	getDataTotal(): number {
		return 28;
	}
}


let paginator = new AppPaginator();
let pageDataCtlr = new TestPaginatorDataController(paginator, new DataService());
pageDataCtlr.itemsPerBatch = 10;
pageDataCtlr.itemsPerPage = 5;

pageDataCtlr.setCurrentPage(1);
console.log(paginator.currentPage);

pageDataCtlr.setCurrentPage(2);
console.log(paginator.currentPage);

pageDataCtlr.setCurrentPage(3);
console.log(paginator.currentPage);

pageDataCtlr.setCurrentPage(4);
console.log(paginator.currentPage);

pageDataCtlr.setCurrentPage(5);
console.log(paginator.currentPage);

pageDataCtlr.setCurrentPage(6);
console.log(paginator.currentPage);

