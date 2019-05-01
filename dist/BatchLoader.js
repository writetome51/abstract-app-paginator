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
var set_array_1 = require("@writetome51/set-array");
var BatchLoader = /** @class */ (function (_super) {
    __extends(BatchLoader, _super);
    function BatchLoader(
    // The same `__dataSource` object must be injected into this.__batchCalc .
    __dataSource, 
    // `__batchCalc` is needed just in case this.itemsPerBatch < this.__dataSource.dataTotal .
    // This means the entire dataset must be split into batches.  __batchCalc tells this.__dataSource
    // what batch to fetch.
    __batchCalc, 
    // `__arrPaginator` is needed because it will contain a reference to the loaded batch.
    __arrPaginator) {
        var _this = _super.call(this) || this;
        _this.__dataSource = __dataSource;
        _this.__batchCalc = __batchCalc;
        _this.__arrPaginator = __arrPaginator;
        return _this;
    }
    Object.defineProperty(BatchLoader.prototype, "itemsPerBatch", {
        get: function () {
            return this.__batchCalc.itemsPerBatch;
        },
        set: function (value) {
            this.__batchCalc.itemsPerBatch = value; // __batchCalc validates value.
        },
        enumerable: true,
        configurable: true
    });
    BatchLoader.prototype.loadBatchContainingPage = function (pageNumber) {
        var batch = this.__getBatchContainingPage(pageNumber);
        set_array_1.setArray(this.__arrPaginator.data, batch);
    };
    BatchLoader.prototype.__getBatchContainingPage = function (pageNumber) {
        this.__batchCalc.set_currentBatchNumber_basedOnPage(pageNumber);
        return this.__getBatch();
    };
    BatchLoader.prototype.__getBatch = function () {
        return this.__dataSource.getData(this.__batchCalc.currentBatchNumber, this.itemsPerBatch, this.__batchCalc.currentBatchNumberIsLast);
    };
    return BatchLoader;
}(base_class_1.BaseClass));
exports.BatchLoader = BatchLoader;
