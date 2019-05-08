"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppPaginator = /** @class */ (function () {
    function AppPaginator(
    // `__batchPaginator` contains a reference to the loaded batch.  The same instance must be
    // injected into `__pageLoader`.
    __batchPaginator, // Acts as the batch container.
    __pageLoader) {
        this.__batchPaginator = __batchPaginator;
        this.__pageLoader = __pageLoader;
    }
    Object.defineProperty(AppPaginator.prototype, "currentPageNumber", {
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
    Object.defineProperty(AppPaginator.prototype, "currentPage", {
        get: function () {
            return this.__batchPaginator.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    // Intended to be called after the order of the entire dataset changes (like after sorting),
    // or after the total number of items changes.
    AppPaginator.prototype.reload = function () {
        this.__pageLoader.reloadPage(1);
    };
    return AppPaginator;
}());
exports.AppPaginator = AppPaginator;
