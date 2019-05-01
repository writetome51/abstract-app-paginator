# AppPaginator

A TypeScript/Javascript class for pagination in a real-world web app.   
It supports paginating data that can only be fetched from its source in batches if  
the entire dataset is too big to be fetched all at once.  If the user requests a page  
that isn't in the currently fetched batch, AppPaginator automatically fetches the  
batch that contains that page and shows the requested page.


## Constructor
```ts
constructor(
    dataSource: {
        // object that supplies AppPaginator with data to paginate.

        getData: (
            // called whenever a batch is loaded.

            batchNumber,
                // Which 'chunk' of items to be returned (i.e, say itemsPerBatch is 50.
                // If batchNumber is 1, getData() returns items 1 thru 50.  If 
                // batchNumber is 2, getData() returns items 51 thru 100).
                
            itemsPerBatch,
                
            isLastBatch: boolean
                // If isLastBatch is true, it only returns the remaining items in the 
                // dataset, and ignores the itemsPerBatch parameter.

        ) => any[],

        dataTotal: integer
            // number of items in entire dataset, not the batch.  It must stay accurate 
            // after actions that change the total, such as searches.
    }
)
```

## Properties
<details>
<summary>view properties</summary>

```ts
itemsPerPage : integer // default is 25.

itemsPerBatch : integer // This must be set before setting this.currentPageNumber.
    // Total number of items app can hold at once. Set this to the largest
    // number that doesn't negatively affect app performance.

currentPageNumber : integer
    // Setting this automatically updates this.currentPage

currentPage : any[]  (read-only)
    // All items in the current page.

totalPages : integer  (read-only)

totalItems : integer  (read-only)
    // number of items in entire dataset.

className : string (read-only)
    // Not important. Inherited from BaseClass (see Inheritance Chain below).
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
reload() : void
    // Loads batch 1 and resets this.currentPageNumber to 1.
    // Intended to be called after the order of the entire dataset changes 
    // (like after sorting), or after the dataTotal changes.
```
The methods below are not important to know about in order to use this  
class.  They're inherited from [BaseClass](https://github.com/writetome51/typescript-base-class#baseclass) .
```ts
protected   _createGetterAndOrSetterForEach(
                  propertyNames: string[],
                  configuration: IGetterSetterConfiguration
            ) : void
     /*********************
     Use this method when you have a bunch of properties that need getter and/or 
     setter functions that all do the same thing. You pass in an array of string 
     names of those properties, and the method attaches the same getter and/or 
     setter function to each property.
     IGetterSetterConfiguration is this object:
     {
         get_setterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
         ) => Function,
             // get_setterFunction takes the property name as first argument and 
             // returns the setter function.  The setter function must take one 
             // parameter and return void.
     
         get_getterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
         ) => Function
             // get_getterFunction takes the property name as first argument and 
             // returns the getter function.  The getter function must return something.
     }
     *********************/ 
   
   
protected   _returnThis_after(voidExpression: any) : this
    // voidExpression is executed, then function returns this.
    // Even if voidExpression returns something, the returned data isn't used.

protected   _runMethod_and_returnThis(
    callingObject, 
    method: Function, 
    methodArgs: any[], 
    additionalAction?: Function // takes the result returned by method as an argument.
) : this
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
