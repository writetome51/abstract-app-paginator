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
// This is designed so it handles both a Batchinator and a Paginator.
// The Paginator is needed to simply show a page.
// The Batchinator is needed just in case the full data set is so big it requires batchination.
// This makes the controller more flexible.
// If the data set doesn't require batchination, set this.itemsPerBatch to the total number of items
// in the data set.
// The class will still work the same way.
var PaginationDataController = /** @class */ (function (_super) {
    __extends(PaginationDataController, _super);
    function PaginationDataController(
    // begin injected dependencies...
    __paginator, __dataService
    // end injected dependencies.
    ) {
        var _this = _super.call(this) || this;
        _this.__paginator = __paginator;
        _this.__dataService = __dataService;
        // itemsPerBatch: integer (default is 500).  The browser cache item limit.
        // itemsPerPage: integer (default is 25)
        _this.__batchinator = new batchinator_1.Batchinator();
        // @ts-ignore
        _this.__batchinator.totalDataCount = _this.__dataService.getDataTotal();
        _this.itemsPerBatch = 500;
        _this.itemsPerPage = 25;
        _this.__loadBatchAndPage(1);
        return _this;
    }
    Object.defineProperty(PaginationDataController.prototype, "itemsPerPage", {
        get: function () {
            return this.__batchinator.itemsPerPage;
        },
        set: function (value) {
            this.__batchinator.itemsPerPage = value;
            this.__paginator.itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationDataController.prototype, "itemsPerBatch", {
        get: function () {
            return this.__batchinator.itemsPerBatch;
        },
        set: function (value) {
            this.__batchinator.itemsPerBatch = value;
        },
        enumerable: true,
        configurable: true
    });
    PaginationDataController.prototype.setCurrentPage = function (pageNumber) {
        if (this.__batchinator.currentBatchContainsPage(pageNumber)) {
            this.__setCurrentPageInCurrentBatch(pageNumber);
        }
        else
            this.__loadBatchAndPage(pageNumber);
    };
    PaginationDataController.prototype.__setCurrentPageInCurrentBatch = function (pageNumber) {
        this.__paginator.currentPageNumber =
            this.__batchinator.getCurrentPageNumberForPaginator(pageNumber);
    };
    PaginationDataController.prototype.__loadBatchAndPage = function (pageNumber) {
        this.__loadBatchContainingPage(pageNumber);
        this.__setCurrentPageInCurrentBatch(pageNumber);
    };
    PaginationDataController.prototype.__loadBatchContainingPage = function (pageNumber) {
        this.__batchinator.set_currentBatchNumber_basedOnPage(pageNumber);
        this.__paginator.data = this.__dataService.getData(this.__batchinator.currentBatchNumber, this.__batchinator.itemsPerBatch);
    };
    return PaginationDataController;
}(base_class_1.BaseClass));
exports.PaginationDataController = PaginationDataController;
