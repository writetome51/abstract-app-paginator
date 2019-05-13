"use strict";
/***************************
 AbstractAppPaginator is intended for a real-world web application.  It automatically
 batchinates the full dataset in case it's huge.

 To use: create a subclass of this and call super() inside the constructor, passing
 in a `dataSource` and a `setup` function that becomes a private method of
 AbstractAppPaginator.  setup() must take dataSource as a parameter and assign values
 to the properties `_pageInfo`, `_batchInfo`, and `_fullDatasetPaginator`.  setup()
 is what makes the class actually functional.
 ***************************/
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractAppPaginator = /** @class */ (function () {
    function AbstractAppPaginator(dataSource, __setup) {
        this.__setup = __setup;
        this.__setup(dataSource);
    }
    Object.defineProperty(AbstractAppPaginator.prototype, "itemsPerBatch", {
        get: function () {
            return this._batchInfo.itemsPerBatch;
        },
        // Total number of items the app can have loaded in memory.  Set this to highest number that
        // does not negatively affect app performance.
        set: function (value) {
            this._batchInfo.itemsPerBatch = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractAppPaginator.prototype, "itemsPerPage", {
        get: function () {
            return this._pageInfo.itemsPerPage;
        },
        set: function (value) {
            this._pageInfo.itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractAppPaginator.prototype, "currentPageNumber", {
        get: function () {
            return this._fullDatasetPaginator.currentPageNumber;
        },
        // Setting this.currentPageNumber automatically updates this.currentPage
        set: function (value) {
            this._fullDatasetPaginator.currentPageNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractAppPaginator.prototype, "currentPage", {
        get: function () {
            return this._fullDatasetPaginator.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractAppPaginator.prototype, "totalPages", {
        get: function () {
            return this._pageInfo.totalPages;
        },
        enumerable: true,
        configurable: true
    });
    // Intended to be called after the order of the dataset changes (like after sorting),
    // or after the total number of items changes (like after a search).
    AbstractAppPaginator.prototype.reset = function () {
        this._fullDatasetPaginator.reset();
    };
    return AbstractAppPaginator;
}());
exports.AbstractAppPaginator = AbstractAppPaginator;
