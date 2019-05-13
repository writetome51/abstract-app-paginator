"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_paginator_1 = require("@writetome51/array-paginator");
var pagination_page_info_1 = require("@writetome51/pagination-page-info");
var pagination_batch_info_1 = require("@writetome51/pagination-batch-info");
var batch_loader_1 = require("@writetome51/batch-loader");
var page_loader_1 = require("@writetome51/page-loader");
var batch_to_page_translator_1 = require("@writetome51/batch-to-page-translator");
var FullDatasetPaginator_1 = require("../FullDatasetPaginator");
function __setup(dataSource) {
    var batchPaginator = new array_paginator_1.ArrayPaginator();
    this._pageInfo = new pagination_page_info_1.PaginationPageInfo(dataSource, batchPaginator);
    this._batchInfo = new pagination_batch_info_1.PaginationBatchInfo(this._pageInfo);
    var bch2pgTranslator = new batch_to_page_translator_1.BatchToPageTranslator(this._pageInfo, this._batchInfo);
    var getBatch = new batch_loader_1.GetBatch(dataSource, this._batchInfo, bch2pgTranslator);
    var pageLoader = new page_loader_1.PageLoader(batchPaginator, bch2pgTranslator, getBatch);
    this._fullDatasetPaginator = new FullDatasetPaginator_1.FullDatasetPaginator(pageLoader);
}
exports.__setup = __setup;
