# AppPaginator

A TypeScript/Javascript class intended for a fancy real-world web application.
It is easy to use and supports batchination, in case the full dataset is too big to load entirely.


## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
)
```
</details>


## Properties
```ts
ItemsPerBatch: integer
    // Total number of items the app can have loaded at once.

itemsPerPage: integer

currentPageNumber : integer
    // Setting this automatically updates this.currentPage

currentPage : any[] // read-only
    // All items in the current page.
```


## Methods
```ts
reset() : void
    // Loads batch 1 and sets this.currentPageNumber to 1.
    // Intended to be called after the order of the entire dataset changes (like after sorting),
    // or after the total number of items changes.
```


## Installation

`npm install @writetome51/full-dataset-paginator`

## Loading
```ts
// if using TypeScript:
import { FullDatasetPaginator } from '@writetome51/full-dataset-paginator';
// if using ES5 JavaScript:
var FullDatasetPaginator = 
    require('@writetome51/full-dataset-paginator').FullDatasetPaginator;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
