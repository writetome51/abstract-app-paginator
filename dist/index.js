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
var batchinator_1 = require("@writetome51/batchinator");
var array_paginator_1 = require("@writetome51/array-paginator");
var AppPaginator = /** @class */ (function (_super) {
    __extends(AppPaginator, _super);
    function AppPaginator(__dataSource) {
        var _this = _super.call(this) || this;
        _this.__dataSource = __dataSource;
        // __arrPaginator is only designed for paginating a dataset small enough to fit entirely
        // inside it without having to split it into batches.
        _this.__arrPaginator = new array_paginator_1.ArrayPaginator();
        // __batchinator is needed just in case this.cacheItemLimit is smaller than this.totalItems.
        // This means the entire dataset must be split into batches, where 1 batch is the size of
        // this.cacheItemLimit.  __batchinator tells __dataSource what data to fetch (i.e, if
        // cacheItemLimit is 50, and __batchinator wants batch 1, it tells __dataSource to fetch items 1
        // thru 50.  If it wants batch 2, it tells __dataSource to fetch items 51 thru 100).  It also
        // tells __arrPaginator what page to show.
        _this.__batchinator = new batchinator_1.Batchinator();
        _this.__batchinator.totalDataCount = _this.__dataSource.dataTotal;
        _this.cacheItemLimit = 500;
        _this.itemsPerPage = 25;
        _this.__loadBatchAndPage(1);
        return _this;
    }
    Object.defineProperty(AppPaginator.prototype, "cacheItemLimit", {
        get: function () {
            // This line is necessary in case this.totalItems changes at any point.
            this.__keepItemsPerBatchNoGreaterThanTotalItems();
            return this.__batchinator.itemsPerBatch;
        },
        set: function (value) {
            this.__batchinator.itemsPerBatch = value; // batchinator validates value.
            this.__keepItemsPerBatchNoGreaterThanTotalItems();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPaginator.prototype, "itemsPerPage", {
        get: function () {
            return this.__batchinator.itemsPerPage;
        },
        set: function (value) {
            this.__batchinator.itemsPerPage = value;
            this.__arrPaginator.itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPaginator.prototype, "currentPageNumber", {
        get: function () {
            return (this.__arrPaginator.currentPageNumber +
                ((this.__batchinator.currentBatchNumber - 1) * this.__batchinator.pagesPerBatch));
        },
        set: function (value) {
            if (this.__batchinator.currentBatchContainsPage(value)) {
                this.__setCurrentPageInCurrentBatch(value);
            }
            else
                this.__loadBatchAndPage(value);
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
            return this.__batchinator.totalPages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPaginator.prototype, "totalItems", {
        get: function () {
            // This will keep batchinator.totalDataCount in sync with dataSource.dataTotal.
            this.__batchinator.totalDataCount = this.__dataSource.dataTotal;
            return this.__batchinator.totalDataCount;
        },
        enumerable: true,
        configurable: true
    });
    AppPaginator.prototype.__loadBatchAndPage = function (pageNumber) {
        this.__loadBatchContainingPage(pageNumber);
        this.__setCurrentPageInCurrentBatch(pageNumber);
    };
    AppPaginator.prototype.__loadBatchContainingPage = function (pageNumber) {
        this.__batchinator.set_currentBatchNumber_basedOnPage(pageNumber);
        this.__arrPaginator.data = this.__dataSource.getData(this.__batchinator.currentBatchNumber, this.cacheItemLimit);
    };
    AppPaginator.prototype.__setCurrentPageInCurrentBatch = function (pageNumber) {
        this.__arrPaginator.currentPageNumber =
            this.__batchinator.getCurrentPageNumberForPaginator(pageNumber);
    };
    AppPaginator.prototype.__keepItemsPerBatchNoGreaterThanTotalItems = function () {
        if (this.__batchinator.itemsPerBatch > this.totalItems) {
            this.__batchinator.itemsPerBatch = this.totalItems;
        }
    };
    return AppPaginator;
}(base_class_1.BaseClass));
exports.AppPaginator = AppPaginator;
