"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_class_1 = require("@writetome51/base-class");
var PageLoader = /** @class */ (function (_super) {
    __extends(PageLoader, _super);
    function PageLoader(__arrPaginator, // Acts as the batch container.
    __bch2pgTranslator, 
    // `__batchLoader` is needed just in case the entire dataset is too big to be handled by
    // this.__arrPaginator all at once.  It directly accesses the data source.
    __batchLoader) {
        var _this = _super.call(this) || this;
        _this.__arrPaginator = __arrPaginator;
        _this.__bch2pgTranslator = __bch2pgTranslator;
        _this.__batchLoader = __batchLoader;
        return _this;
    }
    PageLoader.prototype.__loadBatchAndPage = function (pageNumber) {
        this.__batchLoader.loadBatchContainingPage(pageNumber);
        this.__set_currentPage_inCurrentBatch(pageNumber);
    };
    PageLoader.prototype.__set_currentPage_inCurrentBatch = function (pageNumber) {
        this.__arrPaginator.currentPageNumber =
            this.__bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(pageNumber);
    };
    return PageLoader;
}(base_class_1.BaseClass));
exports.PageLoader = PageLoader;
