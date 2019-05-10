import { ArrayPaginator } from '@writetome51/array-paginator';
import { PaginationPageInfo } from '@writetome51/pagination-page-info';
import { PaginationBatchInfo } from '@writetome51/pagination-batch-info';
import { BatchLoader } from '@writetome51/batch-loader';
import { PageLoader } from '@writetome51/page-loader';
import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
import { FullDatasetPaginator } from '../FullDatasetPaginator';


export function __loadAppPaginatorDependencies(instance, dataSource): void {

	let batchPaginator = new ArrayPaginator();
	instance.__pageInfo = new PaginationPageInfo(dataSource, batchPaginator);
	instance.__batchInfo = new PaginationBatchInfo(instance.__pageInfo);

	let bch2pgTranslator = new BatchToPageTranslator(instance.__pageInfo, instance.__batchInfo);

	let batchLoader = new BatchLoader(
		dataSource, batchPaginator, instance.__batchInfo, bch2pgTranslator
	);
	let pageLoader = new PageLoader(
		instance.__batchInfo, batchPaginator, bch2pgTranslator, batchLoader
	);
	instance.__fullDatasetPaginator = new FullDatasetPaginator(
		batchPaginator, pageLoader
	);

}
