"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var not_1 = require("@writetome51/not");
var PageLoader = /** @class */ (function () {
    function PageLoader(__arrPaginator, // Acts as the batch container.
    __bch2pgTranslator, 
    // `__batchLoader` is needed just in case the entire dataset is too big to be handled by
    // this.__arrPaginator all at once.  It directly accesses the data source.
    __batchLoader) {
        this.__arrPaginator = __arrPaginator;
        this.__bch2pgTranslator = __bch2pgTranslator;
        this.__batchLoader = __batchLoader;
    }
    PageLoader.prototype.loadPage = function (pageNumber) {
        if (not_1.not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {
            this.__batchLoader.loadBatchContainingPage(pageNumber);
        }
        this.__arrPaginator.currentPageNumber =
            this.__bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(pageNumber);
    };
    return PageLoader;
}());
exports.PageLoader = PageLoader;
