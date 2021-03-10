# AbstractBigDatasetPaginator

 An abstract TypeScript/Javascript class intended for pagination where all the data  
 to be paginated can't be loaded in memory at once.  Instead of only requesting one  
 page of data at-a-time from the data source, the paginator has the option of  
 requesting multiple pages of data to make requests more efficient.  You configure  
 this with the functions `setItemsPerPage()` and `setItemsPerLoad()`. (A load is  
 either the total number of items you want the app to have in memory at once, or  
 the total number of items your data source is willing to give you at once ––   
 whichever is less.)

A subclass must pass a `__setup()` function to this class' constructor (`__setup()`  
becomes a private method to give it access to this class' private properties). The only  
requirement for `__setup()` is the properties `__pageInfo`, `__loadInfo`, and  
`__loadedPage` must be assigned values inside it.


## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    __setup: (...args) => void,
    setupArgs? = []
)
```
</details>


## Private Properties you must know about
<details>
<summary>view properties</summary>

```ts
// These 3 properties must be assigned values inside 'this.__setup()' 
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

__loadedPage: {
    get: () => any[];
    set: (pageNumber) => Promise<void>;
    
    // 'reset' must reload page data from the source
    reset: (pageNumber) => Promise<void>;
    getNumber: () => number;
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

getTotalPages(): number

setCurrentPageNumber(num, option? = {reload: false}): Promise<void>
    // Set 'option.reload' to true if page data must be reloaded from the source

getCurrentPageNumber(): number

getCurrentPage(): any[]

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
