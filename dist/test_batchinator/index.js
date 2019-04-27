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
var error_if_not_integer_1 = require("error-if-not-integer");
var get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
var in_range_1 = require("@writetome51/in-range");
var not_1 = require("@writetome51/not");
var has_value_no_value_1 = require("@writetome51/has-value-no-value");
/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in and tell the Paginator what page to show.
 *******************/
var BatchCalculator = /** @class */ (function (_super) {
    __extends(BatchCalculator, _super);
    function BatchCalculator(__dataSource) {
        var _this = _super.call(this) || this;
        _this.__dataSource = __dataSource;
        return _this;
    }
    Object.defineProperty(BatchCalculator.prototype, "itemsPerPage", {
        get: function () {
            this.__errorIfPropertyHasNoValue('itemsPerPage');
            return this.__itemsPerPage;
        },
        // If this.itemsPerBatch / this.itemsPerPage does not divide evenly, BatchCalculator decrements
        // this.itemsPerBatch until they do.  So, sometimes after assigning a value to this.itemsPerPage,
        // this.itemsPerBatch will change slightly.
        set: function (value) {
            this.__errorIfValueIsNotOneOrGreater(value, 'itemsPerPage');
            this.__itemsPerPage = value;
            if (has_value_no_value_1.hasValue(this.__itemsPerBatch)) {
                if (this.__itemsPerPage > this.__itemsPerBatch)
                    throw new Error("The property \"itemsPerPage\" cannot be greater than \"itemsPerBatch\"");
                while ((this.__itemsPerBatch % this.__itemsPerPage) !== 0)
                    --this.__itemsPerBatch;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchCalculator.prototype, "itemsPerBatch", {
        get: function () {
            this.__errorIfPropertyHasNoValue('itemsPerBatch');
            return this.__itemsPerBatch;
        },
        set: function (value) {
            this.__errorIfValueIsNotOneOrGreater(value, 'itemsPerBatch');
            this.__itemsPerBatch = value;
            // Since itemsPerBatch is changing, there can no longer be a 'current batch number'.  This would
            // cause buggy behavior.  The user must call this.set_currentBatchNumber_basedOnPage() to
            // reset this.currentBatchNumber.
            this.__currentBatchNumber = undefined;
            if (has_value_no_value_1.hasValue(this.__itemsPerPage)) {
                if (this.__itemsPerBatch < this.__itemsPerPage) {
                    throw new Error("The property \"itemsPerBatch\" cannot be less than \"itemsPerPage\"");
                }
                while ((this.__itemsPerBatch % this.__itemsPerPage) !== 0)
                    --this.__itemsPerBatch;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchCalculator.prototype, "currentBatchNumber", {
        // set value of  this.currentBatchNumber  using  this.set_currentBatchNumber_basedOnPage(pageNumber)
        get: function () {
            return this.__currentBatchNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchCalculator.prototype, "currentBatchNumberIsLast", {
        get: function () {
            return (this.currentBatchNumber === this.totalBatches);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchCalculator.prototype, "totalBatches", {
        get: function () {
            return get_rounded_up_down_1.getRoundedUp(this.totalPages / this.pagesPerBatch);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchCalculator.prototype, "totalPages", {
        get: function () {
            return get_rounded_up_down_1.getRoundedUp(this.__dataSource.dataTotal / this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchCalculator.prototype, "pagesPerBatch", {
        get: function () {
            // Should not have to be rounded.  They will divide evenly.
            return (this.itemsPerBatch / this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    BatchCalculator.prototype.set_currentBatchNumber_basedOnPage = function (pageNumber) {
        this.__currentBatchNumber = this.getBatchNumberContainingPage(pageNumber);
    };
    BatchCalculator.prototype.currentBatchContainsPage = function (pageNumber) {
        if (has_value_no_value_1.noValue(this.currentBatchNumber))
            return false;
        var batchNumber = this.getBatchNumberContainingPage(pageNumber);
        return (this.currentBatchNumber === batchNumber);
    };
    BatchCalculator.prototype.getBatchNumberContainingPage = function (pageNumber) {
        if (not_1.not(in_range_1.inRange([1, this.totalPages], pageNumber))) {
            throw new Error('The requested page does not exist.');
        }
        return get_rounded_up_down_1.getRoundedUp(pageNumber / this.pagesPerBatch);
    };
    // Because the Paginator is not designed for handling batches (we assume), we have to translate
    // the passed pageNumber into a different number, returned by this function, which is the page
    // number the Paginator needs to show.
    BatchCalculator.prototype.getCurrentPageNumberForPaginator = function (pageNumber) {
        var batchNumber = this.getBatchNumberContainingPage(pageNumber);
        if (this.currentBatchNumber !== batchNumber) {
            throw new Error("The property \"currentBatchNumber\" is not set to the batch number \n\t\t\tthat contains the passed pageNumber. Call this.set_currentBatchNumber_basedOnPage(pageNumber)\n\t\t\tbefore calling this function.");
        }
        return (pageNumber - ((this.currentBatchNumber - 1) * this.pagesPerBatch));
    };
    BatchCalculator.prototype.__errorIfPropertyHasNoValue = function (property) {
        if (has_value_no_value_1.noValue(this["__" + property])) {
            throw new Error("The property \"" + property + "\" must be given a value first.");
        }
    };
    BatchCalculator.prototype.__errorIfValueIsNotOneOrGreater = function (value, property) {
        error_if_not_integer_1.errorIfNotInteger(value);
        if (value < 1)
            throw new Error("The property \"" + property + "\" must be at least 1.");
    };
    return BatchCalculator;
}(base_class_1.BaseClass));
exports.BatchCalculator = BatchCalculator;
