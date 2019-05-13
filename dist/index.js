"use strict";
/***************************
 AbstractAppPaginator is intended for a real-world web application.  It automatically
 batchinates the full dataset in case it's huge.

 To use: create a subclass of this and call super() inside the constructor, passing
 in a `dataSource` and a `setup` function that becomes a private method of
 AbstractAppPaginator.  setup() must take dataSource as a parameter and assign values
 to the properties `__pageInfo`, `__batchInfo`, and `__pageLoader`.  setup()
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
    Object.defineProperty(AbstractAppPaginator.prototype, "itemsPerPage", {
        get: function () {
            return this.__pageInfo.itemsPerPage;
        },
        set: function (value) {
            this.__pageInfo.itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractAppPaginator.prototype, "currentPageNumber", {
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
    Object.defineProperty(AbstractAppPaginator.prototype, "currentPage", {
        get: function () {
            return this.__pageLoader.loadedPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractAppPaginator.prototype, "totalPages", {
        get: function () {
            return this.__pageInfo.totalPages;
        },
        enumerable: true,
        configurable: true
    });
    // Intended to be called after the order of the dataset changes (like after sorting),
    // or after the total number of items changes (like after a search).
    AbstractAppPaginator.prototype.reset = function () {
        this.__pageLoader.forceLoadPage(1);
        this.__currentPageNumber = 1;
    };
    return AbstractAppPaginator;
}());
exports.AbstractAppPaginator = AbstractAppPaginator;
