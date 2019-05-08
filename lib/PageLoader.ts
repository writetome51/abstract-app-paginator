import { BaseClass } from '@writetome51/base-class';
import { BatchLoader } from '@writetome51/batch-loader';
import { ArrayPaginator } from '@writetome51/array-paginator';


export class PageLoader extends BaseClass {


	constructor(
		private __arrPaginator: ArrayPaginator, // Acts as the batch container.

		private __bch2pgTranslator: BatchToPageTranslator,
		// `__batchLoader` is needed just in case the entire dataset is too big to be handled by
		// this.__arrPaginator all at once.  It directly accesses the data source.

		private __batchLoader: BatchLoader,) {
		super();
	}


	private __loadBatchAndPage(pageNumber) {
		this.__batchLoader.loadBatchContainingPage(pageNumber);
		this.__set_currentPage_inCurrentBatch(pageNumber);
	}


	private __set_currentPage_inCurrentBatch(pageNumber) {
		this.__arrPaginator.currentPageNumber =
			this.__bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(pageNumber);
	}


}

