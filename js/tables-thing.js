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
        reset: function() {
            console.log("reset");
            sessionStorage.clear();
            //console.log(sessionStorage)
            this.items = mainDefaults.items;
            this.cartItems = mainDefaults.cartItems;
            this.cartDisplay = mainDefaults.cartDisplay
            document.location.reload();
        },
    },
    mounted: function () {
        menu = getCurrentMenu();
        fetch(coConfig.thingUrl)
        .then(response => response.json())
        .then(data => {
            this.items = data;
            this.items.map(item => {
                item["count"] = 0;
            })
            //console.log("Initial load : "+JSON.stringify(this.items));
        });
        this.cartItems = loadDataFromSession(mainDefaults, 'cartItems'),
        eventBus.$on('addToCartEvent', this.addToCart);
        eventBus.$on('removeFromCartEvent', this.removeFromCart);
        eventBus.$on('resetEvent', this.reset);
        eventBus.$on('displayCartEvent', this.displayCart);
    },
});