var main = new Vue({
    el: '#main',
    data: {
        help: {},
        items: loadDataFromSession(mainDefaults, 'items'),
        cartItems: loadDataFromSession(mainDefaults, 'cartItems'),
        cartHeaders: coItemsConfig.headers.capacitiesCart,
        cartDisplay: loadDataFromSession(mainDefaults, 'cartDisplay'),
        helpDisplay: loadDataFromSession(mainDefaults, 'helpDisplay'),
        cartItemsPerPageCount: 40,
        displayItems: loadDataFromSession(mainDefaults, 'cartItems'),
        selectedMenu: loadDataFromSession(headersDefaults, 'selectedMenu'),
    },
    computed: {
        cartItemsCount: function() {
            return(this.cartItems.length);
        },
        cartPageCount: function() {
            if (this.cartItemsCount > 0) {
                pageCount = Math.trunc((this.cartItemsCount / this.cartItemsPerPageCount)) + 1;
                return(pageCount);
            } else {
                return(1);
            }
        },
        displayNoItemInCartPlaceHolder: function() {
            dh = this.cartItemsCount <= 0;
            console.log(this.cartItemsCount+" items in cart ("+dh+")")
            return(dh);
        },
        cartPage: function() {
            cp = [];
            for (p = 0; p < this.cartPageCount; p++) {
                pi = [];
                for (i = 0; i < this.cartItemsPerPageCount; i++) {
                    id = this.getId(p,i);
                    if (this.displayItems[id] == undefined) {
                        this.displayItems[id] = {"id": id};
                    } else {
                        this.displayItems[id]['id'] = id;
                    }
                    pi.push(this.displayItems[id]);
                }
                cp.push(pi);
            }
            //console.log("Page Array : "+JSON.stringify(cp.map(i => i.map(j => j.id))));
            return(cp);
        },
    },
    components: {
        'items-table': itemsTable,
        'item-table': itemTable,
        'capacity' : capacity
    },
    methods: {
        getId: function(page,count) {
            return(((page)*this.cartItemsPerPageCount)+count);
        },
        getColumnHeaderValue(page, count) {
            ways = page.map(i => i.way).unique().filter(i=>i != null);
            r = "";
            if (count <= ways.length) {
                r = ways[count-1];
            }
            //console.log("getColumnHeaderValue("+JSON.stringify(ways)+","+count+") = "+r);
            return(r);
        },
        displayCart: function() {
            console.log("Displaying cart ...");
            this.cartDisplay = ! this.cartDisplay;
        },
        displayHelp: function() {
            console.log("Displaying help ...");
            this.helpDisplay = ! this.helpDisplay;
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
        startDrag: (evt, item) => {
            //console.log("Drag : "+item.id);
            evt.dataTransfer.dropEffect = 'move';
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('itemID', item.id);
        },
        onDrop (evt, item) {
            nitems = clone(this.displayItems);
            itemID = evt.dataTransfer.getData('itemID');
            //console.log("Drop "+itemID+" in "+item.id);
            if (item == undefined) {
                nitems = this.displayItems.filter(i => i.id != itemID);
            } else {
                nitems[item.id] = this.displayItems[itemID];
                nitems[itemID] = item;
                
            }
            this.displayItems = nitems;
        }
    },
    mounted: function () {
        this.selectedMenu = loadDataFromSession(headersDefaults, 'selectedMenu');
        fetch(coConfig.wayUrl)
        .then(response => response.json())
        .then(data => {
            this.items = data;
            //console.log("Initial load : "+JSON.stringify(this.items));
        });
        fetchMdData(coConfig.helpUrls[this.selectedMenu])
        .then(data => {
            this.help = marked(data);
            //console.log("Initial load : "+JSON.stringify(this.items));
        });

        this.$root.$on('addToCartEvent', (items) => {
            aItems = []
            if (Array.isArray(items)) {
                aItems = items;
            } else {
                aItems = [items]
            }
            aItems.map( item => {
                if (!this.cartItems.contains(item)) {
                    this.cartItems.push(item);
                    saveDataToSession("cartItems",this.cartItems);
                }
            });
        });
        this.$root.$on('removeFromCartEvent', (items) => {
            aItems = []
            if (Array.isArray(items)) {
                aItems = items;
            } else {
                aItems = [items]
            }
            aItems.map( item => {
                if (this.cartItems.contains(item)) {
                    this.cartItems = this.cartItems.filter(i => !isEqual(i, item));
                    saveDataToSession("cartItems",this.cartItems);
                }
            });
        });
    },
});