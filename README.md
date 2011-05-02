# Corner Store #

All modern browsers (including Internet Explorer 8) implement some form of persistent storage. Most of these implementations follow the WhatWG specification for [Web Storage](http://dev.w3.org/html5/webstorage). Corner Store provides a simple abstraction for easily selecting the most appropriate storage available, and allows you to always use the same, standard interface for accessing that storage without having to guess about what is available.

Corner Store allows the user to provide a custom storage wrapper which, if available, will take precedence over other storage entities. As long as the custom storage container follows the WhatWG specification, it is guaranteed to work.

The storage entities considered are customizable, but by default is in this order of precedence: custom > global > local > session > basic.

## Documentation ##

### window.store ###

This global function takes an optional set of storage types to consider, and returns a Store instance that acts as a proxy for accessing the best storage available. Storage options are available as properties on the store function, and should be provided as a bit set:

    var storage = store(store.custom | store.local); // Custom storage will be used if available, otherwise local.

The following properties are defined on the window.store function for the sake of defining which storage entities should be considered: custom, global, local, session and basic.

Basic storage is always the fallback if no other valid storage mechanisms are detected. Basic storage is only persistent until the next page reload, so it is not effective for true browser storage.

### Store.setItem ###

This method takes a string key, and any valid value and stores it in the appropriate storage entity. It returns a reference to the Store instance.

    var storage = store();
    storage.setItem('foo', 'bar');

### Store.getItem ###

Takes a string key and retrieves the value, if any, stored against that key in the storage entity. It returns the retrieved value.

    var storage = store().setItem('foo', 'bar');
    storage.getItem('foo'); // Evaluates to 'bar'

### Store.removeItem ###

Takes a string key and removes the key from the storage entity if it exists. Returns a reference to the Store instance.

    var storage = store.setItem('foo', 'bar');
    console.log('foo: ' + storage.getItem('foo')); // Sends 'foo: bar' to the console
    storage.removeItem('foo');
    console.log('foo: ' + storage.getItem('foo')); // Sends 'foo: undefined' to the console

### Store.key ###

Takes an integer index value and returns the key in the storage entity at that index.

### Store.clear ###

Resets the storage entity, removing all keys and values. Returns a reference to the Store instance.

### Store.length ###

Returns the length of the current storage entity.

### Custom Storage ###

Corner Store checks for a global property 'customStorage' that implements the Web Storage specification, and uses it if available. This is useful if you wish to implement some specialty storage mechanism (e.g., storage in Internet Explorer < 8). That's it :)
