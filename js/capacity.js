var capacity = {
    props: ['item', 'items'],
    computed: {
        isCapacity: function() {
            return((this.item != undefined) && ("otype" in this.item) && (this.item.otype == "capacity"));
        },
        chakra: function() {
            if ((this.item.rank >= 3) && (this.item.rank <= 5)) {
                return(this.item.rank - 2);
            } else {
                return(0);
            }
        }
    },
    methods: {
        limited: function(r){
            if (r.limited) {
                return("(L)");
            } else {
                return("");
            }
        },
        vo: function(r) {
            if ((r.voname === undefined) || (r.voname === null) || (r.voname == "") || (r.voname == "Inconnu")) {
                return("");
            } else {
                return("( " + r.voname + " )");
            }
        },
        getWayIcon: function(r) {
            way = this.items.find(i => ((i.otype == 'way') && (i.name == r.way)));
            if (way != null) {
                return(way.icon);
            } else {
                return(coUIconfig.way.default)
            }
        },
        getMudraIcon: function(m){
            return(coUIconfig.mudra[m]);
        },
        toid(r) {
            return(this._uid + "_" + String(r.name).toSlug() + "_" );
        }
    },
    components: {
        'standardPropertyTokens': standardPropertyTokens,
        'highlightedPropertyTokens': highlightedPropertyTokens,
        'iconifiedPropertyTokens': iconifiedPropertyTokens,
    },
    template:
        `<div v-if="isCapacity" class="capacity">
            <div class="capacity-headers"> 
                <div class="capacity-header">
                    <div class="capacity-left-header">
                        <div class="capacity-checkbox"></div>
                        <div class="chakra">
                            <img class="chakra" v-for="m in chakra" src="images/common/chakra.png" title="Point de chakra"/>
                        </div>
                    </div>
                    <div class="capacity-name">{{ item.name }} {{ limited(item) }}</div>
                    <img class= "capacity-image" v-bind:src="getWayIcon(item)" v-bind:alt="item.way" v-bind:title="item.way"/>
                </div>
                <div class="capacity-voname">{{ vo(item) }}</div>
            </div>
            <div class="capacity-content">
                <iconifiedPropertyTokens v-bind:properties="item.properties" v-bind:parentid="toid(item)"></iconifiedPropertyTokens>
                <div class="capacity-short-description">{{ item['short-description'] }}</div>
                <highlightedPropertyTokens v-bind:properties="item.properties"></highlightedPropertyTokens>
                <standardPropertyTokens v-bind:properties="item.properties"></standardPropertyTokens>
            </div>
            <div class="capacity-footers">
                <div class="capacity-rank-box">{{ item.rank }}</div>
                <div class="capacity-mudras">
                    <img class="capacity-mudra" v-for="m in item.mudras" v-bind:src="getMudraIcon(m)" v-bind:title="m"/>
                </div>
            </div>
        </div>
        <div v-else class="capacity"></div>`
};