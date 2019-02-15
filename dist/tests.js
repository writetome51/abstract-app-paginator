"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var app_paginator_1 = require("@writetome51/app-paginator");
var TestPaginationDataController = /** @class */ (function (_super) {
    __extends(TestPaginationDataController, _super);
    function TestPaginationDataController(
    // begin injected dependencies...
    paginator, dataSource
    // end injected dependencies.
    ) {
        return _super.call(this, paginator, dataSource) || this;
    }
    return TestPaginationDataController;
}(index_1.PaginationDataController));
var DataService = /** @class */ (function () {
    function DataService() {
    }
    DataService.prototype.getData = function (batchNumber, numItemsToGet) {
        if (batchNumber === 1)
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        if (batchNumber === 2)
            return [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    };
    DataService.prototype.getDataTotal = function () {
        return 20;
    };
    return DataService;
}());
var paginator = new app_paginator_1.AppPaginator();
var pageDataCtlr = new TestPaginationDataController(paginator, new DataService());
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
