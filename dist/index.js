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
    // `__arrPaginator` is only designed for paginating a dataset small enough to fit entirely
    // inside it without having to split it into batches.  The same instance must be injected into
    // `__pageLoader`.
    __arrPaginator, // Acts as the batch container.
    __pageInfo, __batchInfo, __pageLoader) {
        var _this = _super.call(this) || this;
        _this.__arrPaginator = __arrPaginator;
        _this.__pageInfo = __pageInfo;
        _this.__batchInfo = __batchInfo;
        _this.__pageLoader = __pageLoader;
        // This default is necessary because the user can't do anything until this property is set.
        _this.itemsPerPage = 25;
        return _this;
    }
    Object.defineProperty(AppPaginator.prototype, "itemsPerPage", {
        get: function () {
            return this.__pageInfo.itemsPerPage;
        },
        set: function (value) {
            this.__pageInfo.itemsPerPage = value;
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
            this.__pageLoader.loadPage(value);
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
            return this.__pageInfo.totalPages;
        },
        enumerable: true,
        configurable: true
    });
    // Intended to be called after the order of the entire dataset changes (like after sorting),
    // or after the total number of items changes.
    AppPaginator.prototype.reload = function () {
        // This causes __batchInfo.currentBatchNumber to become undefined.  This is what we want.
        this.__batchInfo.currentBatchNumber = undefined;
        // Resets __batchInfo.currentBatchNumber to 1 and re-retrieves batch 1.
        this.currentPageNumber = 1;
    };
    return AppPaginator;
}(base_class_1.BaseClass));
exports.AppPaginator = AppPaginator;
