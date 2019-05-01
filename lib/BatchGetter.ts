import { BaseClass } from '@writetome51/base-class';
import { BatchCalculator } from '@writetome51/batch-calculator';


export class BatchGetter extends BaseClass {


	constructor(
		private __dataSource: {

			// `getData()` is called whenever a new batch is loaded.  The number of items it returns
			// matches `itemsPerBatch`.  If `isLastBatch` is true, it only returns the remaining items
			// in the dataset, and ignores itemsPerBatch.

			getData: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];

			// `dataTotal`: number of items in entire dataset, not the batch.
			// This must stay accurate after actions that change the total, such as searches.

			dataTotal: number;
		},

		private __batchCalc: BatchCalculator
	) {
		super();
	}


	set itemsPerBatch(value) {
		this.__batchCalc.itemsPerBatch = value;  // __batchCalc validates value.
	}


	get itemsPerBatch(): number {
		return this.__batchCalc.itemsPerBatch;
	}


	getBatch(): any[] {
		return this.__dataSource.getData(

			this.__batchCalc.currentBatchNumber,
			this.itemsPerBatch,
			this.__batchCalc.currentBatchNumberIsLast
		);
	}


}
