"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var not_1 = require("@writetome51/not");
/**********************
 This class loads a 'page' of data by first loading the batch (array) of data that will
 contain that page, then setting the batchPaginator's current page to that page.
 *********************/
var PageLoader = /** @class */ (function () {
    function PageLoader(__batchInfo, __batchPaginator, // Acts as the batch container.
    __bch2pgTranslator, 
    // `__batchLoader` is needed just in case the entire dataset is too big to be handled by
    // this.__batchPaginator all at once.  It directly accesses the data source.
    __batchLoader) {
        this.__batchInfo = __batchInfo;
        this.__batchPaginator = __batchPaginator;
        this.__bch2pgTranslator = __bch2pgTranslator;
        this.__batchLoader = __batchLoader;
    }
    PageLoader.prototype.loadPage = function (pageNumber) {
        if (not_1.not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {
            this.__batchLoader.loadBatchContainingPage(pageNumber);
        }
        this.__batchPaginator.currentPageNumber =
            this.__bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(pageNumber);
    };
    PageLoader.prototype.reloadPage = function (pageNumber) {
        // This forces this.loadPage() to reload the batch containing pageNumber.
        this.__batchInfo.currentBatchNumber = undefined;
        this.loadPage(pageNumber);
    };
    return PageLoader;
}());
exports.PageLoader = PageLoader;
