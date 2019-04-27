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
var AppPaginator = /** @class */ (function (_super) {
    __extends(AppPaginator, _super);
    function AppPaginator(__dataSource) {
        var _this = _super.call(this) || this;
        _this.__dataSource = __dataSource;
        // __arrPaginator is only designed for paginating a dataset small enough to fit entirely
        // inside it without having to split it into batches.
        _this.__arrPaginator = new array_paginator_1.ArrayPaginator();
        _this.__batchCalc = new index_1.BatchCalculator(_this.__dataSource);
        // This default is necessary because the user can't do anything until this property is set.
        _this.itemsPerPage = 25;
        return _this;
    }
    Object.defineProperty(AppPaginator.prototype, "cacheItemLimit", {
        get: function () {
            return this.__batchCalc.itemsPerBatch;
        },
        set: function (value) {
            this.__batchCalc.itemsPerBatch = value; // batchinator validates value.
        },
        enumerable: true,
        configurable: true
    });
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
        this.__batchCalc.set_currentBatchNumber_basedOnPage(pageNumber);
        this.__loadBatch();
    };
    AppPaginator.prototype.__setCurrentPageInCurrentBatch = function (pageNumber) {
        this.__arrPaginator.currentPageNumber =
            this.__batchCalc.getCurrentPageNumberForPaginator(pageNumber);
    };
    AppPaginator.prototype.__loadBatch = function () {
        this.__arrPaginator.data = this.__dataSource.getData(this.__batchCalc.currentBatchNumber, this.cacheItemLimit, this.__batchCalc.currentBatchNumberIsLast);
    };
    return AppPaginator;
}(base_class_1.BaseClass));
exports.AppPaginator = AppPaginator;
