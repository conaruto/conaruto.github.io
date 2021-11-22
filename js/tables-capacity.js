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
        fetch(coConfig.wayUrl)
        .then(response => response.json())
        .then(data => {
            this.items = data;
            //console.log("Initial load : "+JSON.stringify(this.items));
        });
        this.cartItems = loadDataFromSession(mainDefaults, 'cartItems'),
        eventBus.$on('addToCartEvent', this.addToCart);
        eventBus.$on('removeFromCartEvent', this.removeFromCart);
        eventBus.$on('resetEvent', this.reset);
        eventBus.$on('displayCartEvent', this.displayCart);
    },
});