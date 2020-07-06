"use strict";
/***************************
 An abstract TypeScript/Javascript class intended for pagination where
 all the data to be paginated can't be loaded in memory at once.  Instead
 of only requesting one page of data at-a-time from the data source, the
 paginator has the option of requesting a bigger load, determined by the
 function `setItemsPerLoad()`.

 A subclass must pass a `__setup()` function to this class' constructor
 (`__setup()` becomes a private method to give it access to this class'
 private properties).  Any further arguments to the constructor are
 passed to `__setup()`.  As for what `__setup()` does, the only
 requirement is the properties `__pageInfo`,`__loadInfo`, and
 `__currentPage` must be assigned values inside it so the code here will
 execute.
 ***************************/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractBigDatasetPaginator = /** @class */ (function () {
    function AbstractBigDatasetPaginator(__setup, setupArgs) {
        this.__setup = __setup;
        this.__setup.apply(this, setupArgs);
    }
    // Total number of items the app can have loaded in memory.  Set this to highest number that
    // does not negatively affect app performance.
    AbstractBigDatasetPaginator.prototype.setItemsPerLoad = function (num) {
        this.__loadInfo.setItemsPerLoad(num);
    };
    AbstractBigDatasetPaginator.prototype.getItemsPerLoad = function () {
        return this.__loadInfo.getItemsPerLoad();
    };
    AbstractBigDatasetPaginator.prototype.setItemsPerPage = function (num) {
        this.__pageInfo.setItemsPerPage(num);
    };
    AbstractBigDatasetPaginator.prototype.getItemsPerPage = function () {
        return this.__pageInfo.getItemsPerPage();
    };
    AbstractBigDatasetPaginator.prototype.setCurrentPageNumber = function (num) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.__currentPageNumber = num;
                        return [4 /*yield*/, this.__currentPage.set(num)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AbstractBigDatasetPaginator.prototype.getCurrentPageNumber = function () {
        return this.__currentPageNumber;
    };
    // Intended to be called after the order of the dataset changes (like after sorting),
    // or after the total number of items changes (like after a search).
    AbstractBigDatasetPaginator.prototype.resetToFirstPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.__currentPageNumber = 1;
                        return [4 /*yield*/, this.__currentPage.reset(1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AbstractBigDatasetPaginator.prototype.getCurrentPage = function () {
        return this.__currentPage.get();
    };
    AbstractBigDatasetPaginator.prototype.getTotalPages = function () {
        return this.__pageInfo.getTotalPages();
    };
    return AbstractBigDatasetPaginator;
}());
exports.AbstractBigDatasetPaginator = AbstractBigDatasetPaginator;
