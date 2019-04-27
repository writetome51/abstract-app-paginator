import { AppPaginator } from './index';
import { getAdjacentAt } from '@writetome51/array-get-adjacent-at';
import { getTail } from '@writetome51/array-get-head-tail';


class DataService {

	data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
		18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];


	getData(batchNumber, numItemsToGet, isLastBatch = false) {

		if (isLastBatch) return getTail(this.dataTotal - ((batchNumber - 1) * numItemsToGet), this.data);

		return getAdjacentAt(((batchNumber - 1) * numItemsToGet), numItemsToGet, this.data);
	}


	get dataTotal() {
		return this.data.length;
	}
}


let dataService = new DataService();
let appPaginator = new AppPaginator(dataService);


appPaginator.currentPageNumber = 1;
console.log('begin');
console.log(appPaginator.currentPage);

appPaginator.cacheItemLimit = 4;
appPaginator.itemsPerPage = 4;

console.log(appPaginator.currentPage);

appPaginator.currentPageNumber = 1;
console.log(appPaginator.currentPage);

++appPaginator.currentPageNumber;
console.log(appPaginator.currentPage);

++appPaginator.currentPageNumber;
console.log(appPaginator.currentPage);


console.log(appPaginator.cacheItemLimit);

console.log(appPaginator.currentPageNumber);
