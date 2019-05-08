import { ArrayPaginator } from '@writetome51/array-paginator';
import { BatchLoader } from '@writetome51/batch-loader';
import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
import { not } from '@writetome51/not';


export class PageLoader {


	constructor(
		private __arrPaginator: ArrayPaginator, // Acts as the batch container.

		private __bch2pgTranslator: BatchToPageTranslator,

		// `__batchLoader` is needed just in case the entire dataset is too big to be handled by
		// this.__arrPaginator all at once.  It directly accesses the data source.

		private __batchLoader: BatchLoader
	) {
	}


	loadPage(pageNumber) {
		if (not(this.__bch2pgTranslator.currentBatchContainsPage(pageNumber))) {
			this.__batchLoader.loadBatchContainingPage(pageNumber);
		}

		this.__arrPaginator.currentPageNumber =
			this.__bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(pageNumber);
	}


}
