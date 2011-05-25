(function(window, document, undefined) {

    var localStorage = window['localStorage'],
        globalStorage = window['globalStorage'] ? window['globalStorage'][window['location']['host']] : undefined,
        sessionStorage = window['sessionStorage'],
        customStorage = window['customStorage'],
        basicStorage = (function() {

            var BasicStorage = function() { this.storage = {}; };

            BasicStorage.prototype = {

                key: function(index) {
                    
                    var self = this,
                        storage = self.storage,
                        iter = 0;

                    for(var key in storage) {

                        if(iter === index) break;
                        iter++;
                    }

                    return key;
                },
                getItem: function(key) { return this.storage[key]; },
                setItem: function(key, value) { this.storage[key] = value; },
                removeItem: function(key) { delete this.storage[key]; },
                clear: function() { this.storage = {}; },
                toString: function() { return '[object BasicStorage]'; }
            };

            return new BasicStorage();
        })(),
        typeCustom = 1,
        typeLocal = 2,
        typeGlobal = 4,
        typeSession = 8,
        typeBasic = 16,
        selectStorage = function(typeSet) {

            if(typeSet & typeCustom && customStorage)
                return customStorage;

            if(typeSet & typeLocal && localStorage)
                return localStorage;

            if(typeSet & typeGlobal && globalStorage)
                return globalStorage;

            if(typeSet & typeSession && sessionStorage)
                return sessionStorage;

            if(typeSet & typeBasic && basicStorage)
                return basicStorage;
        },
        store = (function() {

            var Store = function(typeSet) { this.storage = selectStorage(typeSet || 31); };

            Store.prototype = {

                key: function(index) { return this.storage.key(index); },
                getItem: function(key) { return this.storage.getItem(key); },
                setItem: function(key, value) { var self = this; self.storage.setItem(key, value); return self; },
                removeItem: function(key) { var self = this; self.storage.removeItem(key); return self; },
                clear: function() { 
                    var self = this,
                        storage = self.storage; 

                    if('clear' in storage && typeof storage.clear == 'function') {

                        storage.clear(); 
                    } else {

                        for(var key in storage) {

                            self.removeItem(key);
                        }
                    }

                    return self; 
                },
                length: function() { return this.storage.length; }
            };

            return function(typeSet) {

                return new Store(typeSet);
            };
        })();

    store['custom'] = typeCustom;
    store['global'] = typeGlobal;
    store['local'] = typeLocal;
    store['session'] = typeSession;
    store['basic'] = typeBasic;
    
    window['store'] = store;
})(window, document);
