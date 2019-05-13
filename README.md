# AbstractAppPaginator

An abstract TypeScript/Javascript pagination class intended for pagination  
in a real-world web app. Though it is a class, most of its implementation does  
not exist as-is. A subclass must be made, which provides a `dataSource` and  
`setup` function to this class' constructor. `setup()` becomes a class method  
and must accept `dataSource` as a parameter, but as for what `dataSource` is  
and what `setup()` does, that is up to the subclass.  The only requirement this  
class makes is `setup()` must assign values to the properties `__pageInfo`,  
`__batchInfo`, and `__pageLoader`, so the code in this class will execute properly. 



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

## Private Properties you must know about
```ts
// These 3 properties must be assigned values inside `this.__setup()` 
// (see constructor).

__pageInfo: { itemsPerPage: number, totalPages: number }

__batchInfo: { itemsPerBatch: number }

__pageLoader: {

    loadPage: (pageNumber) => void,

    forceLoadPage: (pageNumber) => void,
        // Must load `pageNumber` all over again, even if that page is already 
        // currently loaded.

    loadedPage: any[]
        // All items in the loaded page.
}
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
