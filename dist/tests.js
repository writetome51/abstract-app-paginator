"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var array_get_adjacent_at_1 = require("@writetome51/array-get-adjacent-at");
var array_get_head_tail_1 = require("@writetome51/array-get-head-tail");
var DataService = /** @class */ (function () {
    function DataService() {
        this.data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
    }
    DataService.prototype.getData = function (batchNumber, numItemsToGet, isLastBatch) {
        if (isLastBatch === void 0) { isLastBatch = false; }
        if (isLastBatch)
            return array_get_head_tail_1.getTail(this.dataTotal - ((batchNumber - 1) * numItemsToGet), this.data);
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
appPaginator.cacheItemLimit = 30;
console.log('begin');
appPaginator.currentPageNumber = 1;
console.log(appPaginator.currentPage); // [ 1 ... 25 ]
++appPaginator.currentPageNumber;
console.log(appPaginator.currentPage); // [ 26, 27, 28 ]
appPaginator.itemsPerPage = 7;
appPaginator.cacheItemLimit = 10;
console.log(appPaginator.currentPageNumber); // 2
++appPaginator.currentPageNumber;
console.log(appPaginator.currentPage); // [ 15, 16, 17, 18, 19, 20, 21 ]
++appPaginator.currentPageNumber;
console.log(appPaginator.currentPage); // [ 22, 23, 24, 25, 26, 27, 28 ]
console.log(appPaginator.cacheItemLimit); // 7
console.log(appPaginator.currentPageNumber); // 4
appPaginator.reload();
console.log(appPaginator.currentPage); // [ 1 ... 7 ]
console.log(appPaginator.currentPageNumber); // 1
