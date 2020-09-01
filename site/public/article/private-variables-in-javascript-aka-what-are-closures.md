<metadata-json>
{
    "id": "1grpZ7qEPsjKYTpRIhFFL3XZ3gc",
    "title": "Private variables in JavaScript aka What are Closures?",
    "date": "2019-02-16T09:08:00.463Z",
    "category": "technology",
    "status": "default",
    "tags": [ "node", "js", "programming" ] 
}
<metadata-json>


There is a common misconception within the Java community that having private variables in JS is impossible. This isn't true. It simply requires a little more work than writing private in front of the variable name.

## Scope in JavaScript
Unlike Java, in JavaScript variables aren't block scoped. We are used to writing code like this: 

```
// java //
public void doAThing(final boolean condition) {
   if (condition) {
      final String confirmation = "I did the thing!";
      System.out.println(confirmation);
   }


   final String confirmation = "This is a different scope!";
   System.out.println(confirmation);
}
```

Furthermore, anything defined in the parent scope will be available  in all its sub scopes like so: 

```
// java //
public void doAnotherThing(final boolean condition) {
   final String confirmationMessage = "I %s the thing!";

   if (condition) {
      System.out.println(String.format(confirmationMessage, "did"))
   } else { 
      System.out.println(String.format(confirmationMessage, "did not do"))
   }
}
```

In JavaScript variables are function scoped! This means that any variable we declare in a function shares its scope with the rest of the variables in the same function and all functions declared within this scope. 

```
// javascript //

function doAThing(condition) {
   if (condition) {
      var confirmation = "I did the thing!";
      console.log(confirmation)
   }


   confirmation = "This is the same scope and the same variable!";
   console.log(confirmation)
}

function doManyThings(n) {
   for (i = 0; i < n; i++) {
      console.log(i + " exists inside the loop");
   }

   console.log(i + " still exists outside the loop");

   var printI = function() {
      console.log(i);
   }

   printI(); // Prints the variable since the function inherits scope from its parent.
}
```

You can use this feature of JavaScript to control the scope of your variables in a way which limits the access to the variable from the "outside".

```
// javascript //


function constructACounterWithPrivateVariable() {
   var privateCounter = 0;

   function add () { 
      privateCounter++;
      return privateCounter;
   }
   
   return add;
}

console.log(privateCounter); //undefined. We don't have access to it from the outside

var incrementCounter = constructACounterWithPrivateVariable(); 
// incrementCounter now holds a function which has access to privateCounter variable


console.log(incrementCounter()); // 1
console.log(incrementCounter()); // 2
console.log(incrementCounter()); // 3


function objectWithGetterButNoSetter(value) {
   return {
      getValue: function () {return value;}
   };
}


var myObject = objectWithGetterButNoSetter("My immutable string");


console.log(myObject.getValue()); // My immutable string
```
