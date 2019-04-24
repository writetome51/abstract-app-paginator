import { AppPaginator } from './index';
import { getAdjacentAt } from '@writetome51/array-get-adjacent-at';


class DataService {

	data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
		18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

	getData(batchNumber, numItemsToGet) {
		return getAdjacentAt(((batchNumber - 1) * numItemsToGet), numItemsToGet, this.data);
	}

	get dataTotal(){
		return this.data.length;
	}
}

let dataService = new DataService();
let appPaginator = new AppPaginator(dataService);

appPaginator.cacheItemLimit = 8;
appPaginator.itemsPerPage = 5;

appPaginator.currentPageNumber = 1; // it contains first 6.
console.log(appPaginator.currentPage); //  shows first 5.

++appPaginator.currentPageNumber; // it contains second 6.
console.log(appPaginator.currentPage);

++appPaginator.currentPageNumber;
console.log(appPaginator.currentPage);

++appPaginator.currentPageNumber;
console.log(appPaginator.currentPage);

++appPaginator.currentPageNumber;
console.log(appPaginator.currentPage);

++appPaginator.currentPageNumber;
console.log(appPaginator.currentPage);



console.log(appPaginator.cacheItemLimit);

console.log(appPaginator.currentPageNumber);
