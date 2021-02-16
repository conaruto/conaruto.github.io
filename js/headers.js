var fakeIcon = {
    props: ["label", "title"],
    template: 
        `<div class="fakeIndentRightIcon"
              v-bind:alt="label" 
              v-bind:title="title"/>`
};

var resetIcon = {
    props: ["label", "title"],
    methods: {
        resetEvent: function() {
            eventBus.$emit('resetEvent',undefined);
        }
    },
    template: 
        `<img class="defaultIcon" src="images/ui/reset.png" 
              v-bind:alt="label" v-bind:title="title" 
              v-on:click="resetEvent"/>`
};

var trashIcon = {
    props: ["label", "title"],
    methods: {
        onDropEvent: function(evt) {
            eventBus.$emit('onDropEvent',evt);
        }
    },
    template: 
        `<div class="trashIcon">
            <div class="trashArea" 
                 v-on:drop="onDropEvent($event)" 
                 v-on:dragover.prevent
                 v-on:dragenter.prevent></div>
            <img class="defaultIcon" 
                 src="images/ui/trash.png" 
                 v-bind:alt="label" v-bind:title="title" />
        </div>`
};

var loadJsonIcon = {
    props: ["label", "title"],
    methods: {
        loadJsonEvent: function(evt) {
            files = evt.target.files || evt.dataTransfer.files;
            eventBus.$emit('loadJsonEvent', files);
        }
    },
    template: 
        `<div class="defaultIcon">
            <input id="loadJson" type="file" accept="application/json" 
                   v-on:change="loadJsonEvent($event)" />
            <label class="defaultIcon" for="loadJson">
                <img class="defaultIcon" 
                     src="images/ui/load-json.png" 
                     v-bind:alt="label" v-bind:title="title"/>
            </label>
        </div>`
};

var saveJsonIcon = {
    props: ["label", "title"],
    data: function() {
        return({ dataUri: undefined });
    },
    methods: {
        saveJson: function(data) {
            this.dataUri = data;
        },
        saveJsonEvent: function() {
            eventBus.$emit('saveJsonEvent',undefined);
        }
    },
    mounted: function() {
        eventBus.$on('jsonDataUriEvent', this.saveJson);
    },
    template: 
        `<a class="defaultIcon" v-bind:href="dataUri" 
            v-on:click="saveJsonEvent()" download="data.json">                    
             <img class="defaultIcon" src="images/ui/save-json.png" 
                  v-bind:alt="label" v-bind:title="title"/>
        </a>`
};
var saveSvgIcon = {
    props: ["label", "title"],
    data: function() {
        return({ dataUri: undefined });
    },
    methods: {
        saveSvg: function(data) {
            this.dataUri = data;
        },
        saveSvgEvent: function() {
            eventBus.$emit('saveSvgEvent',undefined);
        }
    },
    mounted: function() {
        eventBus.$on('svgDataUriEvent', this.saveSvg); 
    },
    template: 
        `<a class="defaultIcon" v-bind:href="dataUri" 
            v-on:click="saveSvgEvent()" download="image.svg">                    
             <img class="defaultIcon" src="images/ui/save-svg.png" 
                  v-bind:alt="label" v-bind:title="title"/>
        </a>`
};

var cartIcon = {
    props: ["label", "title"],
    data: function() {
        return({ count: 0});
    },
    methods: {
        displayCartEvent: function() {
            eventBus.$emit('displayCartEvent',undefined);
        },
        cartItemsCount: function(count) {
            this.count = count;
        }
    },
    mounted: function () {
        eventBus.$on('cartItemsCountEvent', this.cartItemsCount);
    },
    template: 
        `<div class="defaultIcon cartIcon" 
              v-bind:alt="label" 
              v-bind:title="title + ' ( ' + count + ' objet(s) dans le panier )'"
              v-on:click="displayCartEvent()">
            <span class="cartIcon">{{count}}</span>
        </div>`
};

var helpIcon = {
    props: ["label", "title"],
    methods: {
        displayHelpEvent: function() {
            console.log("Displaying help ...");
            eventBus.$emit('displayHelpEvent', undefined);
        },
    },
    template: 
        `<div class="defaultIcon">
            <img class="defaultIcon" 
                 src="images/ui/help.png" 
                 v-bind:alt="label" 
                 v-bind:title="title" 
                 v-on:click="displayHelpEvent"/>
        </div>`
};

var menuIcons = {
    data: function() {
        menu = getCurrentMenu();
        console.log("Location menu: " + menu.name);
        return({
            selectedMenu: menu.name,
            selectedCategory: menu.category,
            icons: coHeadersConfig.icons[menu.category][menu.name],    
            helpDisplay: false,
            help: ""
        });
    },
    methods: {
        displayHelp: function() {
            console.log("Displaying help ...");
            this.helpDisplay = ! this.helpDisplay;
        },
    },
    mounted: function () {
        helpFile = "help/" + this.selectedCategory + "-" + this.selectedMenu + ".md";
        fetchMdData(helpFile).then(data => {
            this.help = marked(data);
        });
        eventBus.$on('displayHelpEvent', this.displayHelp);
    },
    components: {
        "reset-icon": resetIcon,
        "fake-icon": fakeIcon,
        "load-json-icon": loadJsonIcon,
        "save-json-icon": saveJsonIcon,
        "save-svg-icon": saveSvgIcon,
        "help-icon": helpIcon,
        "cart-icon": cartIcon,
        "trash-icon": trashIcon,
    },
    template: 
        `<div class="iconBarBox">
            <div class="iconBar notprintable">
                <component v-for="icon in icons" 
                           v-bind:key="icon.name"
                           v-bind:is="icon.name+'-icon'" 
                           v-bind:label="icon.label"
                           v-bind:title="icon.title"/>
            </div>
            <div v-show="helpDisplay" class="help" v-html="help"></div>
        </div>`
};

var menuBar = {
    data: function() {
        menu = getCurrentMenu();
        console.log("Location menu: " +menu.name);
        return({
            selectedMenu: menu.name,
            selectedCategory: menu.category,
            menus: coHeadersConfig.menus,
            showMenus: false
        });
    },
    computed: {
        categories: function() {
            return(this.menus.map(m=>m.category).unique());
        }
    },
    methods: {
        isVisible: function(c, menu) {
            index = this.menus.filter(m=>m.category==c).map(m=>m.name).indexOf(menu.name);
            isCurrent = this.isCurrent(menu);
            r = (isCurrent)||((this.selectedCategory != c)&&(index==0));
            console.log("isVisible("+c+", "+menu.name+") = "+r+"("+isCurrent+","+index+")");
            return(r);
        },
        getMenus: function(c){
            return(this.menus.filter(m=>m.category == c));
        },
        isGroupedMenus: function(c) {
            return(this.getMenus(c).length > 1);
        },
        groupedMenuIcon: function(c) {
            if (this.isGroupedMenus(c)) {
                return("▼");
            } else {
                return("");
            }
        },
        isCurrent: function(m) {
            return((m.name == this.selectedMenu) && (m.category == this.selectedCategory));
        },
        toggleMenusOn: function(){
            this.showMenus = true;
        },
        toggleMenusOff: function(){
            this.showMenus = false;
        }
    },
    template: 
        `<div class="menuBar notprintable">
            <div v-for="c in categories" class="menuGroup">
                <div class="menuItem" v-for="(menu, index) in getMenus(c)">
                    <div v-if="isVisible(c, menu)" class="visibleMenu">
                        <a v-if="isCurrent(menu)" class="menuItemSelected">{{menu.label}}{{groupedMenuIcon(c)}}</a>
                        <a v-else class="menuItem" v-bind:href="menu.link">{{menu.label}}{{groupedMenuIcon(c)}}</a>
                    </div>
                </div>
                <div class="hiddenMenuGroup" v-if="isGroupedMenus(c)">
                    <div class="menuItem" v-for="(menu, index) in getMenus(c)">
                        <a v-if="isCurrent(menu)" class="menuItemSelected">{{menu.label}}</a>
                        <a v-else class="menuItem" v-bind:href="menu.link">{{menu.label}}</a>
                    </div>
                </div>
            </div>
        </div>`
};

var banner = {
    template: 
        `<div class="banner notprintable">
            <img class="banner" src="images/ui/banner.png"/>
            <a class="banner" 
                href="https://github.com/conaruto/conaruto.github.io#chroniques-oubli%C3%A9es-fantasy-version-naruto">
                 Mentions légales
             </a>
        </div>`
};

var headers = new Vue({
    el: '#headers',
    components: {
        'menu-icons': menuIcons,
        'menu-bar': menuBar,
        'banner': banner,
    },
});