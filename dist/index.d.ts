/***************************
 
 ***************************/
export declare class AppPaginator {
    id: string;
    private __pageInfo;
    private __batchInfo;
    private __pageLoader;
    private __fullDatasetPaginator;
    constructor(dataSource: {
        getBatch: (batchNumber: number, itemsPerBatch: number, isLastBatch: boolean) => any[];
        dataTotal: number;
    });
    itemsPerBatch: number;
    itemsPerPage: number;
    currentPageNumber: number;
    readonly currentPage: any[];
    readonly totalPages: number;
}
