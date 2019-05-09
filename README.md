# AppPaginator

A TypeScript/Javascript class for pagination in a real-world web app.   
It supports paginating data that can only be fetched from its source in batches if  
the entire dataset is too big to be fetched all at once.  If the user requests a page  
that isn't in the currently fetched batch, AppPaginator automatically fetches the  
batch that contains that page and shows the requested page.


## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    batchPaginator: { currentPage: any[] }, // Acts as the batch container.
        // batchPaginator contains a reference to the loaded batch.  The same instance must be
        // injected into `pageLoader`.
   
    pageLoader: PageLoader
)
```
</details>


## Properties
<details>
<summary>view properties</summary>

```ts
currentPageNumber : integer
    // Setting this automatically updates this.currentPage

currentPage : any[] // read-only
    // All items in the current page.
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
reload() : void
    // Loads batch 1 and resets this.currentPageNumber to 1.
    // Intended to be called after the order of the entire dataset changes (like after sorting),
    // or after the total number of items changes.
```

</details>


## Inheritance Chain

AppPaginator<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)


## Installation

`npm install @writetome51/app-paginator`

## Loading
```ts
// if using TypeScript:
import { AppPaginator } from '@writetome51/app-paginator';
// if using ES5 JavaScript:
var AppPaginator = require('@writetome51/app-paginator').AppPaginator;
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
