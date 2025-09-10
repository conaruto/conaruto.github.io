var tables = new Vue({
    el: '#tables',
    data: {
        items: loadDataFromSession(mainDefaults, 'items'),
        cartItems: [],
        cartHeaders: coItemsConfig.headers.capacitiesCart,
        cartDisplay: loadDataFromSession(mainDefaults, 'cartDisplay'),
        helpDisplay: loadDataFromSession(mainDefaults, 'helpDisplay'),
    },
    computed: {
        cartItemsCount: function() {
            return(this.cartItems.length);
        }
    },
    components: {
        'items-table': itemsTable,
        'item-table': itemTable,
    },
    watch: {
        cartItemsCount: function() {
            eventBus.$emit('cartItemsCountEvent', this.cartItemsCount);
        }
    },
    methods: {
        loadJson: function(files, event) {
            this.reset(true);
            this.loadAlerts = [];
            if (!files.length) {
                console.log('Error while uploading file ...');
            } else {
                var reader = new FileReader();
                reader.readAsText(files[0]);
                reader.onload = e => { 
                    this.items = [];
                    this.items.push(...JSON.parse(e.target.result));
                    this.items.map(item => {
                        item["count"] = 0;
                    })
                    saveDataToSession("items",this.items);
                }
            }
        },
        saveJson: function() {
            source = encodeURIComponent(itemsStringify(this.cartItems));
            download("data:application/json;utf8,"+source, "cart-capacites.json");
        },
        saveText: function() {
            var text="";
            this.cartItems.forEach( (item) => {
                title = item.name;
                if (item.limited) {
                    title = title + "\xa0(L)"
                }
                text += title+"\n";
                text += item['full-description']+"\n";
            });
            source = encodeURIComponent(text);
            download("data:application/txt;utf8,"+source, "cart-capacites.txt");
        },
        addToCart: function(items) {
            aItems = []
            if (Array.isArray(items)) {
                aItems = items;
            } else {
                aItems = [items]
            }
            aItems.map( item => {
                if (!this.cartItems.contains(item)) {
                    this.cartItems.push(item);
                }
            });
            saveDataToSession("cartItems",this.cartItems);
        },
        removeFromCart: function(items) {
            aItems = []
            if (Array.isArray(items)) {
                aItems = items;
            } else {
                aItems = [items]
            }
            aItems.map( item => {
                if (this.cartItems.contains(item)) {
                    this.cartItems = this.cartItems.filter(i => !isEqual(i, item));
                }
            });
            saveDataToSession("cartItems",this.cartItems);
        },
        displayCart: function() {
            console.log("Displaying cart ...");
            this.cartDisplay = ! this.cartDisplay;
        },
        reset: function(soft) {
            console.log("reset [soft="+soft+"]");
            //sessionStorage.clear();
            //console.log(sessionStorage)
            this.items = mainDefaults.items;
            this.cartItems = mainDefaults.cartItems;
            this.cartDisplay = mainDefaults.cartDisplay
            if (!(soft)) {
                document.location.reload();
            }
        },
    },
    mounted: function () {
        menu = getCurrentMenu();
        if (this.items.length < 1) {
            fetch(coConfig.wayUrl)
            .then(response => response.json())
            .then(data => {
                this.items = data;
                //console.log("Initial load : "+JSON.stringify(this.items));
                saveDataToSession("items",this.items);
            });
        }   
        this.cartItems = loadDataFromSession(mainDefaults, 'cartItems'),
        eventBus.$on('addToCartEvent', this.addToCart);
        eventBus.$on('removeFromCartEvent', this.removeFromCart);
        eventBus.$on('resetEvent', this.reset);
        eventBus.$on('loadJsonEvent', this.loadJson);
        eventBus.$on('saveJsonEvent', this.saveJson);
        eventBus.$on('saveTextEvent', this.saveText);
        eventBus.$on('displayCartEvent', this.displayCart);
    },
});