"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_paginator_1 = require("@writetome51/array-paginator");
var pagination_page_info_1 = require("@writetome51/pagination-page-info");
var pagination_batch_info_1 = require("@writetome51/pagination-batch-info");
var batch_loader_1 = require("@writetome51/batch-loader");
var page_loader_1 = require("@writetome51/page-loader");
var batch_to_page_translator_1 = require("@writetome51/batch-to-page-translator");
var FullDatasetPaginator_1 = require("../FullDatasetPaginator");
function __loadAppPaginatorDependencies(instance, dataSource) {
    var batchPaginator = new array_paginator_1.ArrayPaginator();
    instance.__pageInfo = new pagination_page_info_1.PaginationPageInfo(dataSource, batchPaginator);
    instance.__batchInfo = new pagination_batch_info_1.PaginationBatchInfo(instance.__pageInfo);
    var bch2pgTranslator = new batch_to_page_translator_1.BatchToPageTranslator(instance.__pageInfo, instance.__batchInfo);
    var batchLoader = new batch_loader_1.BatchLoader(dataSource, batchPaginator, instance.__batchInfo, bch2pgTranslator);
    var pageLoader = new page_loader_1.PageLoader(instance.__batchInfo, batchPaginator, bch2pgTranslator, batchLoader);
    instance.__fullDatasetPaginator = new FullDatasetPaginator_1.FullDatasetPaginator(batchPaginator, pageLoader);
}
exports.__loadAppPaginatorDependencies = __loadAppPaginatorDependencies;
