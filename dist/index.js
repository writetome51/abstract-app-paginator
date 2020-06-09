"use strict";
/***************************
 This class is intended for pagination in a real-world web app.  Though it is a class, most of its
 implementation does not exist as-is.  A subclass must be made, which provides a `dataSource` and
 `__setup` function to this class' constructor.  __setup() becomes a class method and must accept
 dataSource as a parameter, but as for what dataSource is and what __setup() does, that is up to
 the subclass.  The only requirement this class makes is __setup() must assign values to the
 properties `__pageInfo`, `__batchInfo`, and `__pageLoader`, so the code in this class will execute
 properly.

 It's possible to use this class for 'batchination', where, instead of only requesting one page of
 data at-a-time from the server, the client requests a bigger `batch`, the size of which is determined
 by the property `itemsPerBatch`.  Then the batch is paginated in the client.  If the user requests a
 page that would be found in a different batch, the client requests that batch from the server and
 paginates it.  And so on.
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
var AbstractAppPaginator = /** @class */ (function () {
    function AbstractAppPaginator(dataSource, __setup) {
        this.__setup = __setup;
        this.__setup(dataSource);
    }
    Object.defineProperty(AbstractAppPaginator.prototype, "itemsPerBatch", {
        get: function () {
            return this.__batchInfo.itemsPerBatch;
        },
        // Total number of items the app can have loaded in memory.  Set this to highest number that
        // does not negatively affect app performance.
        set: function (value) {
            this.__batchInfo.itemsPerBatch = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractAppPaginator.prototype, "itemsPerPage", {
        get: function () {
            return this.__pageInfo.itemsPerPage;
        },
        set: function (value) {
            this.__pageInfo.itemsPerPage = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractAppPaginator.prototype, "currentPageNumber", {
        get: function () {
            return this.__currentPageNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractAppPaginator.prototype, "currentPage", {
        get: function () {
            return this.__pageLoader.loadedPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractAppPaginator.prototype, "totalPages", {
        get: function () {
            return this.__pageInfo.totalPages;
        },
        enumerable: true,
        configurable: true
    });
    // Updates this.currentPage
    AbstractAppPaginator.prototype.set_currentPageNumber = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.__currentPageNumber = value;
                        return [4 /*yield*/, this.__pageLoader.loadPage(value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Intended to be called after the order of the dataset changes (like after sorting),
    // or after the total number of items changes (like after a search).
    AbstractAppPaginator.prototype.resetToFirstPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.__currentPageNumber = 1;
                        return [4 /*yield*/, this.__pageLoader.forceLoadPage(1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AbstractAppPaginator;
}());
exports.AbstractAppPaginator = AbstractAppPaginator;
