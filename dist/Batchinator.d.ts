import { BaseClass } from '@writetome51/base-class';
import { BatchCalculator } from '@writetome51/batch-calculator';
export declare class Batchinator extends BaseClass {
    private __dataSource;
    private __batchCalc;
    constructor(__dataSource: {
        getData: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
        dataTotal: number;
    }, __batchCalc: BatchCalculator);
    itemsPerBatch: number;
    getBatchContainingPage(pageNumber: any): void;
    getBatch(): any[];
}
