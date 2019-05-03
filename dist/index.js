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
var AppPaginator = /** @class */ (function (_super) {
    __extends(AppPaginator, _super);
    function AppPaginator(
    // `__arrPaginator` is only designed for paginating a dataset small enough to fit entirely inside it 
    // without having to split it into batches.  The same instance must be injected into `__batchLoader`.
    __arrPaginator, 
    // `__batchCalc` tells this.__arrPaginator what page to show.  The same instance must be injected 
    // into `__batchLoader` .
    __batchCalc, 
    // `__batchLoader` is needed just in case the entire dataset is too big to be handled by
    // this.__arrPaginator all at once.  It directly accesses the data source.
    __batchLoader) {
        var _this = _super.call(this) || this;
        _this.__arrPaginator = __arrPaginator;
        _this.__batchCalc = __batchCalc;
        _this.__batchLoader = __batchLoader;
        // This default is necessary because the user can't do anything until this property is set.
        _this.itemsPerPage = 25;
        return _this;
    }
    Object.defineProperty(AppPaginator.prototype, "itemsPerPage", {
        get: function () {
            return this.__batchCalc.itemsPerPage;
        },
        set: function (value) {
            this.__batchCalc.itemsPerPage = value;
            this.__arrPaginator.itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPaginator.prototype, "currentPageNumber", {
        get: function () {
            return this.__currentPageNumber;
        },
        // Setting this.currentPageNumber automatically updates this.currentPage
        set: function (value) {
            if (this.__batchCalc.currentBatchContainsPage(value)) {
                this.__setCurrentPageInCurrentBatch(value);
            }
            else
                this.__loadBatchAndPage(value);
            this.__currentPageNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPaginator.prototype, "currentPage", {
        get: function () {
            return this.__arrPaginator.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPaginator.prototype, "totalPages", {
        get: function () {
            return this.__batchCalc.totalPages;
        },
        enumerable: true,
        configurable: true
    });
    // Intended to be called after the order of the entire dataset changes (like after sorting),
    // or after the total number of items changes.
    AppPaginator.prototype.reload = function () {
        // This causes __batchCalc.currentBatchNumber to become undefined.  This is what we want.
        this.__batchCalc.itemsPerBatch = this.__batchCalc.itemsPerBatch;
        // Resets __batchCalc.currentBatchNumber to 1 and re-retrieves batch 1.
        this.currentPageNumber = 1;
    };
    AppPaginator.prototype.__loadBatchAndPage = function (pageNumber) {
        this.__batchLoader.loadBatchContainingPage(pageNumber);
        this.__setCurrentPageInCurrentBatch(pageNumber);
    };
    AppPaginator.prototype.__setCurrentPageInCurrentBatch = function (pageNumber) {
        this.__arrPaginator.currentPageNumber =
            this.__batchCalc.getCurrentPageNumberForPaginator(pageNumber);
    };
    return AppPaginator;
}(base_class_1.BaseClass));
exports.AppPaginator = AppPaginator;
