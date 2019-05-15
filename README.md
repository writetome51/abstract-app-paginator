# AbstractAppPaginator

 An abstract TypeScript/Javascript class intended for pagination in a  
 real-world web app.  Though it is a class, most of its implementation  
 does not exist as-is.  A subclass must be made, which provides a  
 `dataSource` and `__setup()` function to this class' constructor.  
 `__setup()` becomes a class method and must accept `dataSource`  
 as a parameter, but as for what `dataSource` is and what `__setup()`  
 does, that is up to the subclass.  The only requirement this class  
 makes is `__setup()` must assign values to the properties `__pageInfo`,  
 `__batchInfo`, and `__pageLoader`, so the code in this class will  
 execute properly.

 It's possible to use this class for 'batchination', where, instead of  
 only requesting one page of data at-a-time from the server, the client  
 requests a bigger 'batch', the size of which is determined by the  
 property `itemsPerBatch`.  Then the batch is paginated in the client.  If  
 the user requests a page that would be found in a different batch, the  
 client requests that batch from the server and paginates it.  And so on.


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
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
reset() : void
    // force-loads page 1.
    // Intended to be called after the order of the dataset changes (like 
    // after sorting), or after the total number of items changes (like after 
    // a search).
```
</details>


## Installation

`npm i  @writetome51/abstract-app-paginator`

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
