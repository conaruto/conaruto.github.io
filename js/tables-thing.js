var tables = new Vue({
    el: '#tables',
    data: {
        items: loadDataFromSession(mainDefaults, 'items'),
        cartItems: [],
        cartFooters: coItemsConfig.footers.thingsCart,
        cartHeaders: coItemsConfig.headers.thingsCart,
        cartDisplay: loadDataFromSession(mainDefaults, 'cartDisplay'),
        helpDisplay: loadDataFromSession(mainDefaults, 'helpDisplay'),
    },
    computed: {
        cartItemsCount: function() {
            return(this.cartItems.filter(v => 'count' in v).map(v => v.count).reduce((a,v)=>a+v, 0));
        },
        thingHeaders: function() {
            return( coItemsConfig['headers']['things'] );
        },
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
                }
            }
        },
        saveJson: function() {
            source = encodeURIComponent(itemsStringify(this.cartItems));
            download("data:application/json;utf8,"+source, "cart-objets.json");
        },
        saveText: function() {
            var text="";
            this.cartItems.forEach( (item) => {
                text += item.name+"\n";
                text += item['full-description']+"\n";
            });
            source = encodeURIComponent(text);
            download("data:application/txt;utf8,"+source, "cart-objets.txt");
        },
        addToCart: function(items) {
            var aItems = [];
            if (Array.isArray(items)) {
                aItems = items;
            } else {
                aItems = [items]
            }
            aItems.map( item => {
                if (!this.cartItems.contains(item)) {
                    //console.log("addToCart("+item.name+")");
                    var clonedItem = clone(item);
                    clonedItem.count = 0;
                    this.cartItems.push(clonedItem);
                } 
                //console.log("addAnotherToCart("+item.name+")");
                this.cartItems.map(i => { 
                    if (isEqual(i, item)) { i.count += 1; }
                });
            });
            saveDataToSession("cartItems",this.cartItems);   
        },
        removeFromCart: function(items) {
            var aItems = [];
            if (Array.isArray(items)) {
                aItems = items;
            } else {
                aItems = [items]
            }
            aItems.map( item => {
                if (this.cartItems.contains(item)) {
                    this.cartItems.map(i => { 
                        if (isEqual(i, item)) { i.count -= 1; }
                    });
                    if (this.cartItems.find(i => isEqual(i, item)).count < 1 ) {
                        this.cartItems = this.cartItems.filter(i => !isEqual(i, item));
                    }
                }
                this.items.find(i => isEqual(i, item)).count -= 1;
            });
            saveDataToSession("cartItems",this.cartItems);
            
        },
        displayCart: function() {
            console.log("Displaying cart ...");
            this.cartDisplay = ! this.cartDisplay;
        },
        reset: function(soft) {
            
            console.log("reset [soft="+soft+"]");
            // sessionStorage.clear();
            // console.log(sessionStorage)
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
        sortOrder = [ "Material", "Armor", "Weapon", "Shield", "Hat", "Glove", "Ring", "Boot", "Bracer", "Cloak", "Belt", "Amulet" ];
        fetch(coConfig.thingUrl)
        .then(response => response.json())
        .then(data => {
            this.items = data.sort((a,b) => {
                if (sortOrder.indexOf(a.ttype) == sortOrder.indexOf(b.ttype)) {
                    if (a.cost.value == b.cost.value) {
                        if (a.name < b.name) {
                            return( -1 );
                        }
                        if (a.name > b.name) {
                            return( 1 );
                        }
                        return(0);
                    } else {
                        return(b.cost.value - a.cost.value);
                    }
                } else {
                    return(sortOrder.indexOf(a.ttype) - sortOrder.indexOf(b.ttype));
                }
            });
            this.items.map(item => {
                item["count"] = 0;
            })
            //console.log("Initial load : "+JSON.stringify(this.items));
            saveDataToSession("items",this.items);
        });

        this.cartItems = loadDataFromSession(mainDefaults, 'cartItems');
        eventBus.$on('addToCartEvent', this.addToCart);
        eventBus.$on('removeFromCartEvent', this.removeFromCart);
        eventBus.$on('resetEvent', this.reset);
        eventBus.$on('loadJsonEvent', this.loadJson);
        eventBus.$on('saveJsonEvent', this.saveJson);
        eventBus.$on('saveTextEvent', this.saveText);
        eventBus.$on('displayCartEvent', this.displayCart);
    },
});