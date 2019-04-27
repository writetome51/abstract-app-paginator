import { BaseClass } from '@writetome51/base-class';
import { errorIfNotInteger } from 'error-if-not-integer';
import { errorIfNotIntegerZeroOrGreater } from 'error-if-not-integer-zero-or-greater';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';
import { hasValue, noValue } from '@writetome51/has-value-no-value';


/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in and tell the Paginator what page to show.
 *******************/


export class BatchCalculator extends BaseClass {

	// These first 2 properties must be set before doing anything else:
	// itemsPerPage
	// itemsPerBatch  (total number of items the Paginator can handle at once.)

	// currentBatchNumber  (read-only)
	// currentBatchNumberIsLast: boolean  (read-only)
	// totalBatches  (read-only)
	// totalPages  (read-only)
	// pagesPerBatch  (read-only)

	private __itemsPerBatch: number;
	private __itemsPerPage: number;
	private __currentBatchNumber: number;


	constructor(
		private __dataSource: {

			// dataTotal: number of items in entire dataset, not the batch.
			// This must stay accurate after user-actions that change the total, such as searches.

			dataTotal: number;
		}
	) {
		super();
	}


	// If this.itemsPerBatch / this.itemsPerPage does not divide evenly, BatchCalculator decrements
	// this.itemsPerBatch until they do.  So, sometimes after assigning a value to this.itemsPerPage,
	// this.itemsPerBatch will change slightly.

	set itemsPerPage(value) {
		this.__errorIfValueIsNotOneOrGreater(value, 'itemsPerPage');
		this.__itemsPerPage = value;

		if (hasValue(this.__itemsPerBatch)) {
			if (this.__itemsPerPage > this.__itemsPerBatch) throw new Error(
				`The property "itemsPerPage" cannot be greater than "itemsPerBatch"`
			);
			while ((this.__itemsPerBatch % this.__itemsPerPage) !== 0) --this.__itemsPerBatch;
		}
	}


	get itemsPerPage(): number {
		this.__errorIfPropertyHasNoValue('itemsPerPage');
		return this.__itemsPerPage;
	}


	set itemsPerBatch(value) {
		this.__errorIfValueIsNotOneOrGreater(value, 'itemsPerBatch');
		this.__itemsPerBatch = value;

		// Since itemsPerBatch is changing, there can no longer be a 'current batch number'.  This would
		// cause buggy behavior.  The user must call this.set_currentBatchNumber_basedOnPage() to
		// reset this.currentBatchNumber.

		this.__currentBatchNumber = undefined;

		if (hasValue(this.__itemsPerPage)) {
			if (this.__itemsPerBatch < this.__itemsPerPage) {
				throw new Error(
					`The property "itemsPerBatch" cannot be less than "itemsPerPage"`
				);
			}

			while ((this.__itemsPerBatch % this.__itemsPerPage) !== 0) --this.__itemsPerBatch;
		}
	}


	get itemsPerBatch(): number {
		this.__errorIfPropertyHasNoValue('itemsPerBatch');
		return this.__itemsPerBatch;
	}


	// set value of  this.currentBatchNumber  using  this.set_currentBatchNumber_basedOnPage(pageNumber)

	get currentBatchNumber(): number {
		return this.__currentBatchNumber;
	}


	get currentBatchNumberIsLast() {
		return (this.currentBatchNumber === this.totalBatches);
	}


	get totalBatches(): number {
		return getRoundedUp(this.totalPages / this.pagesPerBatch);
	}


	get totalPages(): number {
		return getRoundedUp(this.__dataSource.dataTotal / this.itemsPerPage);
	}


	get pagesPerBatch(): number {
		// Should not have to be rounded.  They will divide evenly.
		return (this.itemsPerBatch / this.itemsPerPage);
	}


	set_currentBatchNumber_basedOnPage(pageNumber): void {
		this.__currentBatchNumber = this.getBatchNumberContainingPage(pageNumber);
	}


	currentBatchContainsPage(pageNumber): boolean {
		if (noValue(this.currentBatchNumber)) return false;
		let batchNumber = this.getBatchNumberContainingPage(pageNumber);
		return (this.currentBatchNumber === batchNumber);
	}


	getBatchNumberContainingPage(pageNumber): number {

		if (not(inRange([1, this.totalPages], pageNumber))) {
			throw new Error('The requested page does not exist.');
		}
		return getRoundedUp(pageNumber / this.pagesPerBatch);
	}


	// Because the Paginator is not designed for handling batches (we assume), we have to translate
	// the passed pageNumber into a different number, returned by this function, which is the page
	// number the Paginator needs to show.

	getCurrentPageNumberForPaginator(pageNumber): number {
		let batchNumber = this.getBatchNumberContainingPage(pageNumber);
		if (this.currentBatchNumber !== batchNumber) {
			throw new Error(`The property "currentBatchNumber" is not set to the batch number 
			that contains the passed pageNumber. Call this.set_currentBatchNumber_basedOnPage(pageNumber)
			before calling this function.`);
		}
		return (pageNumber - ((this.currentBatchNumber - 1) * this.pagesPerBatch));
	}


	private __errorIfPropertyHasNoValue(property): void {
		if (noValue(this[`__${property}`])) {
			throw new Error(`The property "${property}" must be given a value first.`);
		}
	}


	private __errorIfValueIsNotOneOrGreater(value, property): void {
		errorIfNotInteger(value);
		if (value < 1) throw new Error(`The property "${property}" must be at least 1.`);
	}


}
