var cards = new Vue({
    el: '#cards',
    data: {
        items: loadDataFromSession(mainDefaults, 'items'),
        cartItems: [],
        cartItemsPerPageCount: coItemsConfig.cartItemsPerPageCount,
        displayItems: loadDataFromSession(mainDefaults, 'cartItems'),
        showContextMenu: -1,
        dataUri: undefined,
        imgs: {},
        loadedImg: false,
        contextmenuX: 0.0,
        contextmenuY: 0.0,
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
        'capacity' : capacity
    },
    methods: {
        oid: function(item) {
            //console.log("oid:"+oid(item));
            return(oid(item));
        },
        displayContextMenu: function(event, item) {
            //console.log("itemId="+item.id+" ("+JSON.stringify(item)+")");
            if ('otype' in item) {
                this.showContextMenu = item.id;
                p = document.getElementById(item.id);
                console.log(event.pageX, p.getBoundingClientRect().x);
                console.log(event.pageY, p.getBoundingClientRect().y);
                this.contextmenuX = event.clientX-p.getBoundingClientRect().x;
                this.contextmenuY = event.clientY-p.getBoundingClientRect().y;
            }
        },
        hideContextMenu: function() {
            this.showContextMenu = -1;
        },
        saveAsImage: function(item) {
            this.showContextMenu = -1;
            htmlToImage.toPng(
                document.getElementById(this.oid(item)),
                {'backgroundColor': 'white', 'pixelRatio': 4}
            ).then(function (dataUrl) {
                download(dataUrl, 'image.png');
            });
        },
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
        reset: function() {
            console.log("reset");
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
        menu = getCurrentMenu();
        fetch(coConfig.wayUrl)
        .then(response => response.json())
        .then(data => {
            this.items = data;
            //console.log("Initial load : "+JSON.stringify(this.items));
        });
        this.cartItems = loadDataFromSession(mainDefaults, 'cartItems'),
        eventBus.$on('resetEvent', this.reset);
        eventBus.$on('onDropEvent', this.onDrop);
    },
});