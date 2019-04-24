"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var array_get_adjacent_at_1 = require("@writetome51/array-get-adjacent-at");
var DataService = /** @class */ (function () {
    function DataService() {
        this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
    }
    DataService.prototype.getData = function (batchNumber, numItemsToGet) {
        return array_get_adjacent_at_1.getAdjacentAt(((batchNumber - 1) * numItemsToGet), numItemsToGet, this.data);
    };
    Object.defineProperty(DataService.prototype, "dataTotal", {
        get: function () {
            return this.data.length;
        },
        enumerable: true,
        configurable: true
    });
    return DataService;
}());
var dataService = new DataService();
var appPaginator = new index_1.AppPaginator(dataService);
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
