# PaginatorDataController

An abstract TypeScript/JavaScript class that connects a paginator with its data source and tells  
it what to show in the view.  
Both a paginator object and a dataSource object must be injected in the constructor.  
The actual page data will be in the paginator object.  That same object will have to be  
available in the view.


## Constructor
```
constructor(
    __paginator: {
        data: any[];
        itemsPerPage: number;
        currentPageNumber: number; // changing this number changes the page.
    },
    __dataSource: {
        getData: (batchNumber: number, numberOfItemsToGet: number) => any[];
        getDataTotal: () => number;
    }
)
```

## Properties
```
itemsPerBatch: integer
    // The browser cache item limit. Default is 500.
    // If the number assigned to this is greater than the total number
    // of items, it's automatically reset to the total number of items.

itemsPerPage: integer
    // Default is 25.

className : string (read-only)
    // Not important. Inherited from BaseClass (see Inheritance Chain below).
```

## Methods
```
setCurrentPage(pageNumber): void
    // To be called on triggering an event, like 'click' .  The class makes sure 
    // the correct batch is loaded and the paginator's .currentPageNumber is correct.
    // The actual page data will be in the paginator object.
    // That object will have to be available in the view.
```
The methods below are not important to know about in order to use this  
class.  They're inherited from [BaseClass](https://github.com/writetome51/typescript-base-class#baseclass) .
```
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

## Inheritance Chain

PaginatorDataController<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)


## Installation

You must have npm installed first. Then, in the command line:

    npm install @writetome51/paginator-data-controller

## Loading

    // if using TypeScript:
    import { PaginatorDataController } from '@writetome51/paginator-data-controller';
    // if using ES5 JavaScript:
    var PaginatorDataController = 
            require('@writetome51/paginator-data-controller').PaginatorDataController;


## License
[MIT](https://choosealicense.com/licenses/mit/)