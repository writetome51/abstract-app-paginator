import { BatchLoader } from '@writetome51/batch-loader';
import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
import { not } from '@writetome51/not';


export class PageLoader {


	constructor(
		private __batchPaginator: {currentPageNumber: number}, // Acts as the batch container.

		private __bch2pgTranslator: BatchToPageTranslator,

		// `__batchLoader` is needed just in case the entire dataset is too big to be handled by
		// this.__batchPaginator all at once.  It directly accesses the data source.

		private __batchLoader: BatchLoader
	) {
	}


	loadPage(pageNumber): void {
		if (not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {
			this.__batchLoader.loadBatchContainingPage(pageNumber);
		}

		this.__batchPaginator.currentPageNumber =
			this.__bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(pageNumber);
	}


}
