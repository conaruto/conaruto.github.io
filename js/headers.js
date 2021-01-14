var menuBar = {
    data: function() {
        console.log("Session Menu: " +loadDataFromSession(headersDefaults, 'selectedMenu'));
        return({
            selectedMenu: loadDataFromSession(headersDefaults, 'selectedMenu'),
            menus: coHeadersConfig.menus,
        });
    },
    methods: {
        menuClick: function(m){
            saveDataToSession('selectedMenu', m.name);
        },
        isCurrent: function(m) {
            return(m.name == this.selectedMenu);
        }
    },
    template: 
        `<div class="menuBar notprintable">
            <div class="menuItem" v-for="menu in menus">
                <a v-if="isCurrent(menu)" class="menuItemSelected" v-bind:href="menu.link" v-on:click="menuClick(menu)">{{menu.label}}</a>
                <a v-else class="menuItem" v-bind:href="menu.link" v-on:click="menuClick(menu)">{{menu.label}}</a>
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
        'menu-bar': menuBar,
        'banner': banner,
    },
});