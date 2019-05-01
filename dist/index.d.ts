import { BaseClass } from '@writetome51/base-class';
import { BatchCalculator } from '@writetome51/batch-calculator';
import { BatchGetter } from './BatchGetter';
export declare class AppPaginator extends BaseClass {
    private __batchGetter;
    private __batchCalc;
    private __arrPaginator;
    private __currentPageNumber;
    constructor(__batchGetter: BatchGetter, __batchCalc: BatchCalculator);
    itemsPerPage: number;
    currentPageNumber: number;
    readonly currentPage: any[];
    readonly totalPages: number;
    reload(): void;
    private __loadBatchAndPage;
    private __setCurrentPageInCurrentBatch;
    private __loadBatchContainingPage;
}
