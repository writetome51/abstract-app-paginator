"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var DataService = /** @class */ (function () {
    function DataService() {
    }
    DataService.prototype.getData = function (batchNumber, numItemsToGet) {
        if (batchNumber === 1)
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        if (batchNumber === 2)
            return [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        if (batchNumber === 3)
            return [21, 22, 23, 24, 25, 26, 27, 28];
    };
    DataService.prototype.getDataTotal = function () {
        return 28;
    };
    return DataService;
}());
var appPaginator = new index_1.AppPaginator(new DataService());
appPaginator.cacheItemLimit = 10;
appPaginator.itemsPerPage = 5;
appPaginator.currentPageNumber = 1;
console.log(appPaginator.currentPage);
appPaginator.currentPageNumber = 2;
console.log(appPaginator.currentPage);
appPaginator.currentPageNumber = 3;
console.log(appPaginator.currentPage);
appPaginator.currentPageNumber = 4;
console.log(appPaginator.currentPage);
appPaginator.currentPageNumber = 5;
console.log(appPaginator.currentPage);
appPaginator.currentPageNumber = 6;
console.log(appPaginator.currentPage);
console.log(appPaginator.cacheItemLimit);
console.log(appPaginator.currentPageNumber);
