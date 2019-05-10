"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependencyLoader_1 = require("./privy/dependencyLoader");
/***************************

 ***************************/
var AppPaginator = /** @class */ (function () {
    function AppPaginator(dataSource) {
        dependencyLoader_1.__loadAppPaginatorDependencies(this, dataSource);
    }
    Object.defineProperty(AppPaginator.prototype, "itemsPerBatch", {
        get: function () {
            return this.__batchInfo.itemsPerBatch;
        },
        set: function (value) {
            this.__batchInfo.itemsPerBatch = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPaginator.prototype, "itemsPerPage", {
        get: function () {
            return this.__pageInfo.itemsPerPage;
        },
        set: function (value) {
            this.__pageInfo.itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPaginator.prototype, "currentPageNumber", {
        get: function () {
            return this.__fullDatasetPaginator.currentPageNumber;
        },
        set: function (value) {
            this.__fullDatasetPaginator.currentPageNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPaginator.prototype, "currentPage", {
        get: function () {
            return this.__fullDatasetPaginator.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPaginator.prototype, "totalPages", {
        get: function () {
            return this.__pageInfo.totalPages;
        },
        enumerable: true,
        configurable: true
    });
    return AppPaginator;
}());
exports.AppPaginator = AppPaginator;
