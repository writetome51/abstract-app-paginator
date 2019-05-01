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
var batch_calculator_1 = require("@writetome51/batch-calculator");
var DataBatchGetter = /** @class */ (function (_super) {
    __extends(DataBatchGetter, _super);
    function DataBatchGetter(__dataSource) {
        var _this = _super.call(this) || this;
        _this.__dataSource = __dataSource;
        _this.__batchCalc = new batch_calculator_1.BatchCalculator(_this.__dataSource);
        return _this;
    }
    Object.defineProperty(DataBatchGetter.prototype, "itemsPerBatch", {
        get: function () {
            return this.__batchCalc.itemsPerBatch;
        },
        set: function (value) {
            this.__batchCalc.itemsPerBatch = value; // __batchCalc validates value.
        },
        enumerable: true,
        configurable: true
    });
    DataBatchGetter.prototype.__loadBatch = function () {
        return this.__dataSource.getData(this.__batchCalc.currentBatchNumber, this.itemsPerBatch, this.__batchCalc.currentBatchNumberIsLast);
    };
    return DataBatchGetter;
}(base_class_1.BaseClass));
exports.DataBatchGetter = DataBatchGetter;
