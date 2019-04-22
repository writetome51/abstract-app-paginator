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
    function AppPaginator(
    // begin injected dependencies....
    __dataSource
    // ....end injected dependencies.
    ) {
        var _this = _super.call(this) || this;
        _this.__dataSource = __dataSource;
        // cacheItemLimit: integer (default is 500). It's total num items app can hold at once.
        // itemsPerPage: integer (default is 25)
        // currentPageNumber: integer
        // currentPage: any[]  (read-only) (all items in current page)
        // totalPages: integer  (read-only)
        // totalItems: integer  (read-only) (number of items in entire dataset)
        // The Batchinator is needed just in case cacheItemLimit is smaller than totalItems.
        // This means the app can't fetch the entire dataset at once, and it must be split into batches,
        // where 1 batch is the size of cacheItemLimit.  The Batchinator tells DataSource what data to
        // fetch (i.e, if cacheItemLimit is 50, and Batchinator wants batch 1, it tells DataSource to
        // fetch items 1 thru 50.  If it wants batch 2, it tells DataSource to fetch items 51 thru 100).
        // It also tells ArrayPaginator what page to show.
        _this.__batchinator = new batchinator_1.Batchinator();
        // The ArrayPaginator is only designed for paginating a dataset small enough to fit entirely
        // inside it without having to split it into batches.
        _this.__arrPaginator = new array_paginator_1.ArrayPaginator();
        _this.__batchinator.totalDataCount = _this.__dataSource.getDataTotal();
        _this.cacheItemLimit = 500;
        _this.itemsPerPage = 25;
        _this.__loadBatchAndPage(1);
        return _this;
    }
    Object.defineProperty(AppPaginator.prototype, "cacheItemLimit", {
        get: function () {
            return this.__batchinator.itemsPerBatch;
        },
        set: function (value) {
            this.__batchinator.itemsPerBatch = value; // batchinator validates value.
            if (value > this.__batchinator.totalDataCount) {
                this.__batchinator.itemsPerBatch = this.__batchinator.totalDataCount;
            }
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
            return this.__batchinator.totalDataCount;
        },
        enumerable: true,
        configurable: true
    });
    AppPaginator.prototype.__setCurrentPageInCurrentBatch = function (pageNumber) {
        this.__arrPaginator.currentPageNumber =
            this.__batchinator.getCurrentPageNumberForPaginator(pageNumber);
    };
    AppPaginator.prototype.__loadBatchAndPage = function (pageNumber) {
        this.__loadBatchContainingPage(pageNumber);
        this.__setCurrentPageInCurrentBatch(pageNumber);
    };
    AppPaginator.prototype.__loadBatchContainingPage = function (pageNumber) {
        this.__batchinator.set_currentBatchNumber_basedOnPage(pageNumber);
        this.__arrPaginator.data = this.__dataSource.getData(this.__batchinator.currentBatchNumber, this.__batchinator.itemsPerBatch);
    };
    return AppPaginator;
}(base_class_1.BaseClass));
exports.AppPaginator = AppPaginator;
