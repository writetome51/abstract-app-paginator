"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var app_paginator_1 = require("@writetome51/app-paginator");
var DataService = /** @class */ (function () {
    function DataService() {
    }
    DataService.prototype.getData = function (batchNumber, numItemsToGet) {
        if (batchNumber === 1)
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        if (batchNumber === 2)
            return [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    };
    DataService.prototype.getTotalDataCount = function () {
        return 20;
    };
    return DataService;
}());
var paginator = new app_paginator_1.AppPaginator();
var pageDataCtlr = new index_1.PaginationDataController(paginator, new DataService());
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
pageDataCtlr.setCurrentPage(1);
console.log(paginator.currentPage);
