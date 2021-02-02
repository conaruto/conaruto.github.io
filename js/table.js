var rowTable = {
    props: ['row', 'header'],
    methods: {
        is: function(htype) {
            return(this.header.type == htype);
        },
        get: function(attr) {
            return(this.header[attr](this.row));
        },
        action: function(r) {
            this.get('action')(r);
        }
    },
    template: 
        `<td v-if="is('icon')" v-bind:class="get('classes')">
           <img v-bind:class="get('classes')" v-bind:src="get('icon')" v-bind:title="get('title')"/>
        </td>
        <td v-else-if="is('button')" v-bind:class="get('classes')">
            <img v-bind:class="get('classes')" v-bind:src="get('icon')" v-on:click="action(row)" v-bind:title="get('title')"/>
        </td>
        <td v-else-if="is('text')" v-bind:class="get('classes')">{{get('text')}}</td>
        <td v-else-if="is('detail')" v-bind:class="get('classes')">
            <details v-bind:class="get('classes')">
                <summary v-bind:class="get('classes')">{{get('summary')}}</summary>
                <div v-bind:class="get('classes')"><span v-bind:class="get('classes')">Description complète:</span>{{get('full-text')}}</div>
            </details>
        </td>`
}


var itemTable = {
    props: ['items', 'headers', 'cartItems'],
    components: {
        'rowTable': rowTable
    },
    methods: {
        action: function(h,t) {
            h.action()(t);
        }
    },
    template: 
        `<table class="itemTable">
            <tr class="itemTable">
                <th v-for="header in headers" v-bind:class="header.classes()">
                    <span v-if="header.label">{{header.label}}</span>
                    <img v-else v-bind:class="header.classes()" v-bind:src="header.icon()" v-on:click="action(header,items)" v-bind:title="header.title()"/>
                </th>
            </tr>
            <tr class="itemTable" v-for="item in items">
                <rowTable v-for="header in headers" v-bind:row="item" v-bind:key="header.name" v-bind:header="header"></rowTable>
            </tr>
        </table>`
};

var itemsTable = {
    props: ['items'],
    data: function() {
        return({
            displayWays: {},
        });
    },
    computed: {
        profils: function() {
            return( this.items.filter( item => 
                ('otype' in item) && (item.otype == "profil")     
            ));
        },
        capacityHeaders: function() {
            return( coItemsConfig['headers']['capacities'] );
        },
    },
    methods: {
        ways: function(profil){
            w = this.items.filter( item => 
                ('otype' in item) && (item.otype == "way") &&
                ('profil' in item) && (item.profil == profil.name)        
            );
            //w.map(way => this.displayWays[way.name] = false);      
            return(w);
        },
        capacities: function(profil, way){
            c = this.items.filter( item => 
                ('otype' in item) && (item.otype == "capacity") &&
                ('profil' in item) && (item.profil == profil.name) &&
                ('way' in item) && (item.way == way.name)               
            );
            c.map(capacity => {
                capacity['way-icon'] = way.icon;
            });
            return(c);

        },
        displayChange: function(wayName){
            newDisplayWays = clone(this.displayWays);
            //console.log("Clicked ("+wayName+"): " + this.displayWays[wayName] + " => "+(! this.displayWays[wayName]));
            newDisplayWays[wayName] = (! newDisplayWays[wayName]);
            this.displayWays = newDisplayWays;
            //console.log("Clicked ("+wayName+"): " + this.displayWays[wayName]);
        },
        showWay: function(way) {
            return((this.displayWays[way] != undefined) && this.displayWays[way]);
        }
    },
    components: {
        'itemTable': itemTable
    },
    template: 
        `<div>
            <div class="profilTableContainer" v-for="profil in profils">
                <div class="profilTableName">{{profil.name}}</div>
                <div class="profilDescriptionTable">{{profil['full-description']}}</div>
                <div class="wayTableContainer" v-for="way in ways(profil)">
                    <div v-on:click="displayChange(way.name)">
                        <div class="wayNameTableContainer">
                            <div v-if="showWay(way.name)" class="expandCharTable" >&#x229F;</div>
                            <div v-else class="expandCharTable">&#x229E;</div> 
                            <div class="wayNameTable">{{way.name}}</div>
                        </div>
                        <div class="wayDescriptionTable">{{way['full-description']}}</div>
                    </div>
                    <itemTable v-if="showWay(way.name)" v-bind:items="capacities(profil,way)" v-bind:headers=capacityHeaders></itemTable>
                </div>
            </div>
        </div>`
};