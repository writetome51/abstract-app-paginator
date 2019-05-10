"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependencyLoader_1 = require("./privy/dependencyLoader");
/***************************
 AppPaginator is intended for a real-world web application.
 It automatically batchinates the full dataset in case it's huge.
 In case you want to use multiple paginators in a single page (say you're displaying multiple
 tables and each has its own pagination controls), you can create multiple instances of
 AppPaginator, and give each its own `dataSource` (see constructor).
 ***************************/
var AppPaginator = /** @class */ (function () {
    function AppPaginator(dataSource) {
        dependencyLoader_1.__loadAppPaginatorDependencies(this, dataSource);
    }
    Object.defineProperty(AppPaginator.prototype, "itemsPerBatch", {
        get: function () {
            return this.__batchInfo.itemsPerBatch;
        },
        // Total number of items the app can have loaded in memory.  Set this to highest number that
        // does not negatively affect app performance.
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
        // Setting this.currentPageNumber automatically updates this.currentPage
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
    // Intended to be called after the order of the dataset changes (like after sorting),
    // or after the total number of items changes (like after a search).
    AppPaginator.prototype.reset = function () {
        this.__fullDatasetPaginator.reset();
    };
    return AppPaginator;
}());
exports.AppPaginator = AppPaginator;
