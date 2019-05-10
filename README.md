# AppPaginator

A TypeScript/Javascript class intended for a real-world web application.  
It automatically batchinates (divides into batches) the full dataset in case it's huge.  



## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    dataSource: {

        getBatch: (
            // The number of items `getBatch()` returns must match `itemsPerBatch`.
            // If `isLastBatch` is true, it must only return the remaining items 
            // in the dataset and ignore itemsPerBatch.
                        
            batchNumber: number, itemsPerBatch: number, isLastBatch: boolean
            
        ) => any[];
        
        dataTotal: number;
            // The number of items in entire dataset, not the batch.
            // This must stay accurate after actions that change the total, such 
            // as searches.
    }
)
```
</details>


## Properties
```ts
itemsPerBatch: number
    // Total number of items the app can have loaded in memory.  Set this to 
    // highest number that does not negatively affect app performance.

itemsPerPage: number

currentPageNumber: number
    // Setting this automatically updates this.currentPage

currentPage: any[] // read-only
    // All items in the current page.

totalPages: number // read-only
```


## Methods
```ts
reset() : void
    // reloads the first batch and sets this.currentPageNumber to 1.
    // Intended to be called after the order of the dataset changes (like 
    // after sorting), or after the total number of items changes (like after 
    // a search).
```


## Installation

`npm install @writetome51/app-paginator`

## Loading
```ts
// if using TypeScript:
import { AppPaginator } from '@writetome51/app-paginator';
// if using ES5 JavaScript:
var AppPaginator = 
    require('@writetome51/app-paginator').AppPaginator;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
