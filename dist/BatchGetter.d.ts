import { BaseClass } from '@writetome51/base-class';


export declare class BatchGetter extends BaseClass {
	private __dataSource;
	private __batchCalc;


	constructor(__dataSource: {
		getData: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
		dataTotal: number;
	});


	itemsPerBatch: number;


	getBatch(): any[];
}
