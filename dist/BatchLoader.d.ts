import { BaseClass } from '@writetome51/base-class';
import { BatchCalculator } from '@writetome51/batch-calculator';
import { ArrayPaginator } from '@writetome51/array-paginator';
export declare class BatchLoader extends BaseClass {
    private __dataSource;
    private __batchCalc;
    private __arrPaginator;
    constructor(__dataSource: {
        getData: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
        dataTotal: number;
    }, __batchCalc: BatchCalculator, __arrPaginator: ArrayPaginator);
    itemsPerBatch: number;
    loadBatchContainingPage(pageNumber: any): void;
    getBatchContainingPage(pageNumber: any): any[];
    private __getBatch;
}
