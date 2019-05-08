import { ArrayPaginator } from '@writetome51/array-paginator';
import { BatchLoader } from '@writetome51/batch-loader';
import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';


export declare class PageLoader {

	private __arrPaginator;
	private __bch2pgTranslator;
	private __batchLoader;


	constructor(
		__arrPaginator: ArrayPaginator, // Acts as the batch container.
		__bch2pgTranslator: BatchToPageTranslator,
		__batchLoader: BatchLoader
	);


	loadPage(pageNumber: any): void;
}
