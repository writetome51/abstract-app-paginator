"use strict";
/***************************
 This class is intended for pagination in a real-world web app.  Though it is a class, most of its
 implementation does not exist as-is.  A subclass must be made, which provides a `dataSource` and
 `__setup` function to this class' constructor.  __setup() becomes a class method and must accept
 dataSource as a parameter, but as for what dataSource is and what __setup() does, that is up to
 the subclass.  The only requirement this class makes is __setup() must assign values to the
 properties `__pageInfo`, `__batchInfo`, and `__pageLoader`, so the code in this class will execute
 properly.

 It's possible to use this class for 'batchination', where, instead of only requesting one page of
 data at-a-time from the server, the client requests a bigger `batch`, the size of which is determined
 by the property `itemsPerBatch`.  Then the batch is paginated in the client.  If the user requests a
 page that would be found in a different batch, the client requests that batch from the server and
 paginates it.  And so on.
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
