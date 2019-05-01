import { BaseClass } from '@writetome51/base-class';
import { BatchCalculator } from '@writetome51/batch-calculator';
import { ArrayPaginator } from '@writetome51/array-paginator';
import { setArray } from '@writetome51/set-array';


export class BatchLoader extends BaseClass {


	constructor(

		// The same `__dataSource` object must be injected into this.__batchCalc .

		private __dataSource: {

			// `getData()` is called whenever a new batch is loaded.  The number of items it returns
			// matches `itemsPerBatch`.  If `isLastBatch` is true, it only returns the remaining items
			// in the dataset, and ignores itemsPerBatch.

			getData: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];

			// `dataTotal`: number of items in entire dataset, not the batch.
			// This must stay accurate after actions that change the total, such as searches.

			dataTotal: number;
		},

		// __batchCalc tells this.__dataSource what batch to fetch.

		private __batchCalc: BatchCalculator,

		// `__arrPaginator` is needed because it will contain a reference to the loaded batch.

		private __arrPaginator: ArrayPaginator
	) {
		super();
	}


	set itemsPerBatch(value) {
		this.__batchCalc.itemsPerBatch = value;  // __batchCalc validates value.
	}


	get itemsPerBatch(): number {
		return this.__batchCalc.itemsPerBatch;
	}


	loadBatchContainingPage(pageNumber) {
		let batch = this.__getBatchContainingPage(pageNumber);
		setArray(this.__arrPaginator.data, batch);
	}


	private __getBatchContainingPage(pageNumber): any[] {
		this.__batchCalc.set_currentBatchNumber_basedOnPage(pageNumber);
		return this.__getBatch();
	}


	private __getBatch(): any[] {
		return this.__dataSource.getData(

			this.__batchCalc.currentBatchNumber,
			this.itemsPerBatch,
			this.__batchCalc.currentBatchNumberIsLast
		);
	}


}
