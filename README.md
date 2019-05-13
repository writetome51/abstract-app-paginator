# AbstractAppPaginator

An abstract TypeScript/Javascript pagination class intended for a real-world web application.  
It automatically batchinates (divides into batches) the full dataset in case it's huge.  



## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    dataSource,
    private __setup: (dataSource) => void
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

`npm install @writetome51/abstract-app-paginator`

## Loading
```ts
// if using TypeScript:
import { AbstractAppPaginator } from '@writetome51/abstract-app-paginator';
// if using ES5 JavaScript:
var AbstractAppPaginator = 
    require('@writetome51/abstract-app-paginator').AbstractAppPaginator;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
