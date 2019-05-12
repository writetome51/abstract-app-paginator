import { ArrayPaginator } from '@writetome51/array-paginator';
import { PaginationPageInfo } from '@writetome51/pagination-page-info';
import { PaginationBatchInfo } from '@writetome51/pagination-batch-info';
import { GetBatch } from '@writetome51/batch-loader';
import { PageLoader } from '@writetome51/page-loader';
import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
import { FullDatasetPaginator } from '../FullDatasetPaginator';
import { AppPaginator } from '../index';


export function __loadAppPaginatorDependencies(
	appPaginator: AppPaginator,
	dataSource: {

		// The number of items `getBatch()` returns must match `itemsPerBatch`.  If `isLastBatch` is
		// true, it must only return the remaining items in the dataset and ignore itemsPerBatch.

		getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];

		// `dataTotal`: number of items in entire dataset, not the batch.
		// This must stay accurate after actions that change the total, such as searches.

		dataTotal: number;
	}
): void {

	let batchPaginator: {
		currentPage: any[], currentPageNumber: number, itemsPerPage: number, data: any[]
	} = new ArrayPaginator();

	appPaginator.__pageInfo = new PaginationPageInfo(dataSource, batchPaginator);
	appPaginator.__batchInfo = new PaginationBatchInfo(appPaginator.__pageInfo);

	let bch2pgTranslator = new BatchToPageTranslator(appPaginator.__pageInfo, appPaginator.__batchInfo);

	let getBatch = new GetBatch(
		dataSource, appPaginator.__batchInfo, bch2pgTranslator
	);
	let pageLoader = new PageLoader(
		batchPaginator, bch2pgTranslator, getBatch
	);
	appPaginator.__fullDatasetPaginator = new FullDatasetPaginator(pageLoader);

}
