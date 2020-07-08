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
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractBigDatasetPaginator {
    constructor(__setup, setupArgs) {
        this.__setup = __setup;
        this.__setup(...setupArgs);
    }
    // Total number of items the app can have loaded in memory.  Set this to highest number that
    // does not negatively affect app performance.
    setItemsPerLoad(num) {
        this.__loadInfo.setItemsPerLoad(num);
    }
    getItemsPerLoad() {
        return this.__loadInfo.getItemsPerLoad();
    }
    setItemsPerPage(num) {
        this.__pageInfo.setItemsPerPage(num);
    }
    getItemsPerPage() {
        return this.__pageInfo.getItemsPerPage();
    }
    setCurrentPageNumber(num) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__currentPageNumber = num;
            yield this.__currentPage.set(num);
        });
    }
    getCurrentPageNumber() {
        return this.__currentPageNumber;
    }
    // Intended to be called after the order of the dataset changes (like after sorting),
    // or after the total number of items changes (like after a search).
    resetToFirstPage() {
        return __awaiter(this, void 0, void 0, function* () {
            this.__currentPageNumber = 1;
            yield this.__currentPage.reset(1);
        });
    }
    getCurrentPage() {
        return this.__currentPage.get();
    }
    getTotalPages() {
        return this.__pageInfo.getTotalPages();
    }
}
exports.AbstractBigDatasetPaginator = AbstractBigDatasetPaginator;
