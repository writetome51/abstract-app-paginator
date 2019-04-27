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
var index_1 = require("./test_batchinator/index");
var array_paginator_1 = require("@writetome51/array-paginator");
var has_value_no_value_1 = require("@writetome51/has-value-no-value");
var AppPaginator = /** @class */ (function (_super) {
    __extends(AppPaginator, _super);
    function AppPaginator(__dataSource) {
        var _this = _super.call(this) || this;
        _this.__dataSource = __dataSource;
        // __arrPaginator is only designed for paginating a dataset small enough to fit entirely
        // inside it without having to split it into batches.
        _this.__arrPaginator = new array_paginator_1.ArrayPaginator();
        _this.__batchinator = new index_1.Batchinator(_this.__dataSource);
        _this.itemsPerPage = 1; // Batchinator requires this to be set before you load a batch.
        _this.cacheItemLimit = 1;
        return _this;
    }
    Object.defineProperty(AppPaginator.prototype, "cacheItemLimit", {
        get: function () {
            return this.__batchinator.itemsPerBatch;
        },
        set: function (value) {
            this.__batchinator.itemsPerBatch = value; // batchinator validates value.
            // Every time cacheItemLimit changes, the batch must be reloaded.
            // For simplicity, we'll reload the first batch.
            this.__loadBatchAndPage(1);
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
            if (has_value_no_value_1.noValue(this.__batchinator.currentBatchNumber))
                throw new Error("You can't get the property \"currentPageNumber\" because this.__batchinator.currentBatchNumber \n\t\t\tis undefined.");
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
            return this.__dataSource.dataTotal;
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
        this.__loadBatch();
    };
    AppPaginator.prototype.__setCurrentPageInCurrentBatch = function (pageNumber) {
        this.__arrPaginator.currentPageNumber =
            this.__batchinator.getCurrentPageNumberForPaginator(pageNumber);
    };
    AppPaginator.prototype.__loadBatch = function () {
        this.__arrPaginator.data = this.__dataSource.getData(this.__batchinator.currentBatchNumber, this.cacheItemLimit, this.__batchinator.currentBatchNumberIsLast);
    };
    return AppPaginator;
}(base_class_1.BaseClass));
exports.AppPaginator = AppPaginator;
