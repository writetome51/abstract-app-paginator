# AbstractBigDatasetPaginator

 An abstract TypeScript/Javascript class intended for pagination where   
 all the data to be paginated can't be loaded in memory at once.  Instead  
 of only requesting one page of data at-a-time from the data source, the  
 paginator has the option of requesting a bigger load, determined by the  
 function `setItemsPerLoad()`.

 A subclass must pass a `__setup()` function to this class' constructor  
 (`__setup()` becomes a private method to give it access to this class'  
 private properties).  Any further arguments to the constructor are  
 passed to `__setup()`.  As for what `__setup()` does, the only  
 requirement is the properties `__pageInfo`,`__loadInfo`, and  
 `__currentPage` must be assigned values inside it so the code here will  
 execute.


## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    __setup: (...args) => void,
    setupArgs: any[]
)
```
</details>


## Private Properties you must know about
<details>
<summary>view properties</summary>

```ts
// These 3 properties must be assigned values inside `this.__setup()` 
// (see constructor).

__pageInfo: {
    setItemsPerPage: (num) => void;
    getItemsPerPage: () => number;
    getTotalPages: () => number;
}

__loadInfo: {
    setItemsPerLoad: (num) => void;
    getItemsPerLoad: () => number;
}

__currentPage: {
    get: () => any[];
    set: (pageNumber) => Promise<void>;
    reset: (pageNumber) => Promise<void>;
}
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
setItemsPerLoad(num): void

getItemsPerLoad(): number

setItemsPerPage(num): void

getItemsPerPage(): number

setCurrentPageNumber(num): Promise<void>

getCurrentPageNumber(): number

resetToFirstPage(): Promise<void>
    // Intended to be called after the order of the dataset changes 
    // (like after sorting), or after the total number of items changes 
    // (like after a search).

getCurrentPage(): any[]

getTotalPages(): number
```
</details>


## Installation

`npm i  @writetome51/abstract-big-dataset-paginator`

## Loading
```js
import { AbstractBigDatasetPaginator } from '@writetome51/abstract-big-dataset-paginator';
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
