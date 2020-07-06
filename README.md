# AbstractBigDatasetPaginator

 An abstract TypeScript/Javascript class intended for pagination where   
 all the data to be paginated can't be loaded in memory at once.  Instead  
 of only requesting one page of data at-a-time from the data source, the  
 paginator has the option of requesting a bigger load, determined by the  
 property `itemsPerLoad`.  This makes the paginator's communication  
 with the data source more efficient.

 Though it is a class, most of its implementation does not exist as-is.  A  
 subclass must be made, which provides a `dataSource` and  
 `__setup()` function to this class' constructor.  `__setup()` becomes a  
 class method and must accept `dataSource` as a parameter, but as for  
 what `dataSource` is and what `__setup()` does, that is up to the  
 subclass.  The only requirement this class makes is `__setup()` must  
 assign values to the properties `__pageInfo`, `__loadInfo`, and  
 `__pageLoader` so the code in this class will execute properly.



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
<details>
<summary>view properties</summary>

```ts
itemsPerLoad: number
    // Total number of items the app can have loaded in memory.  Set this to 
    // highest number that does not negatively affect app performance.

itemsPerPage: number

currentPageNumber: number // read-only

currentPage: any[] // read-only
    // All items in the current page.

totalPages: number // read-only
```

## Private Properties you must know about
```ts
// These 3 properties must be assigned values inside `this.__setup()` 
// (see constructor).

__pageInfo: { itemsPerPage: number, totalPages: number }

__loadInfo: { itemsPerLoad: number }

__pageLoader: {

    loadPage: (pageNumber) => Promise<void>,

    forceLoadPage: (pageNumber) => Promise<void>,
        // Must load `pageNumber` all over again, even if that page is already 
        // currently loaded.

    loadedPage: any[]
        // All items in the loaded page.
}
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
async set_currentPageNumber(num): Promise<void>
    // updates this.currentPage

async resetToFirstPage() : Promise<void>
    // force-loads page 1.
    // Intended to be called after the order of the dataset changes (like 
    // after sorting), or after the total number of items changes (like after 
    // a search).
```
</details>


## Installation

`npm i  @writetome51/abstract-big-dataset-paginator`

## Loading
```ts
// if using TypeScript:
import { AbstractBigDatasetPaginator } from '@writetome51/abstract-big-dataset-paginator';
// if using ES5 JavaScript:
var AbstractBigDatasetPaginator = 
    require('@writetome51/abstract-big-dataset-paginator').AbstractBigDatasetPaginator;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
