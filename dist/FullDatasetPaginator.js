"use strict";
/***************************
 This class is intended for paginating a big dataset.
 It supports batchination, in case the full dataset is too big to load entirely.
 ***************************/
Object.defineProperty(exports, "__esModule", { value: true });
var FullDatasetPaginator = /** @class */ (function () {
    function FullDatasetPaginator(
    // `__batchPaginator` must contain a reference to the loaded batch.
    __batchPaginator, 
    // `__pageLoader` loads the data into memory and makes the requested page the
    // current page.
    __pageLoader) {
        this.__batchPaginator = __batchPaginator;
        this.__pageLoader = __pageLoader;
    }
    Object.defineProperty(FullDatasetPaginator.prototype, "currentPageNumber", {
        get: function () {
            return this.__currentPageNumber;
        },
        // Setting this.currentPageNumber automatically updates this.currentPage
        set: function (value) {
            this.__pageLoader.loadPage(value);
            this.__currentPageNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullDatasetPaginator.prototype, "currentPage", {
        get: function () {
            return this.__batchPaginator.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    // Intended to be called after the order of the dataset changes (like after sorting),
    // or after the total number of items changes (like after a search).
    FullDatasetPaginator.prototype.reset = function () {
        this.__pageLoader.reloadPage(1);
        this.__currentPageNumber = 1;
    };
    return FullDatasetPaginator;
}());
exports.FullDatasetPaginator = FullDatasetPaginator;
