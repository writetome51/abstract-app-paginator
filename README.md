# AppPaginator

A TypeScript/Javascript class for pagination in a real-world web app.   
It supports paginating data that can only be fetched from its source in batches if  
the entire dataset is too big to be fetched all at once.  If the user requests a page  
that isn't in the currently fetched batch, AppPaginator automatically fetches the  
batch that contains that page and shows the requested page.  
A dataSource object must be injected in the constructor.  


## Constructor
```ts
constructor(
    // This supplies AppPaginator with data to paginate:
    __dataSource: {
        getData: (
            batchNumber,
                // This number is which 'chunk' of items to be returned (i.e, say 
                // numberOfItemsToGet is 50.  If batchNumber is 1, getData() returns 
                // items 1 thru 50.  If batchNumber is 2, getData() returns items 51 thru 100).

            numberOfItemsToGet
                // When getData() is called, this number will be the cacheItemLimit 
                // (see properties below).

        ) => any[],

        dataTotal: number
            // must be number of items in entire dataset, not the batch.
    }
)
```

## Properties
```ts
cacheItemLimit: integer (default is 500).
    // Total number of items app can hold at once. Set this to the largest
    // number that doesn't negatively affect app performance.
    // If you set it to a value larger than this.totalItems, it's automatically 
    // reset to this.totalItems .

itemsPerPage: integer (default is 25)

currentPageNumber: integer
    // Setting this automatically updates this.currentPage

currentPage: any[]  (read-only)
    // All items in the current page.

totalPages: integer  (read-only)

totalItems: integer  (read-only)
    // number of items in entire dataset.

className : string (read-only)
    // Not important. Inherited from BaseClass (see Inheritance Chain below).
```

## Methods
<details>
<summary>view methods</summary>

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
