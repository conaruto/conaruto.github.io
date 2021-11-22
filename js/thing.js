var thing = {
    props: ['item', 'items'],
    computed: {
        isThing: function() {
            return((this.item != undefined) && ("otype" in this.item) && (this.item.otype == "thing"));
        },
        oid: function() {
            //console.log("oid:"+oid(this.item));
            return(oid(this.item));
        },
        extraIconifiedProperties: function() {
            //console.log("ExtraIconifiedProperties : "+JSON.stringify((({icon,quantity}) => ({icon,quantity}))(this.item)));
            return((({icon,quantity}) => ({icon,quantity}))(this.item));
        },
        extraIconifiedPropertiesKey: function() {
            return(objHash(this.extraIconifiedProperties));
        }
    },
    methods: {
        getThingTypeIcon: function(r) {
            if (r.ttype == undefined) {
                return(coItemsConfig.thingConfig.icon.prefix+"no-thing"+coItemsConfig.thingConfig.icon.extension);   
            } else {
                return(coItemsConfig.thingConfig.icon.prefix+r.ttype+coItemsConfig.thingConfig.icon.extension);
            }
        },
        toid(r) {
            return(this._uid + "_" + String(r.name).toSlug() + "_" );
        },
    },
    components: {
        'standardPropertyTokens': standardPropertyTokens,
        'highlightedPropertyTokens': highlightedPropertyTokens,
        'iconifiedPropertyTokens': iconifiedPropertyTokens,
    },
    template:
        `<div v-if="isThing" class="thing" v-bind:id="oid">
            <div class="thing-headers"> 
                <div class="thing-left-header">
                    <div class="thing-name">{{ item.name }}</div>
                </div>
                <img class= "thing-type" v-bind:src="getThingTypeIcon(item)" v-bind:alt="item.type" v-bind:title="item.type"/>
            </div>
            <div class="thing-content">
                <iconifiedPropertyTokens v-bind:key="extraIconifiedPropertiesKey" v-bind:properties="item.properties" 
                                         v-bind:parentid="toid(item)" v-bind:extra="extraIconifiedProperties"></iconifiedPropertyTokens>
                <img class="thing-icon" v-bind:src="item.icon" />
                <div v-if="item.quantity > 0" class="thing-quantity">
                    <span class="thing-quantity">{{ item.quantity }}</span>
                </div>
                <div class="thing-short-description">{{ item['short-description'] }}</div>
                <highlightedPropertyTokens v-bind:properties="item.properties"></highlightedPropertyTokens>
                <standardPropertyTokens v-bind:properties="item.properties"></standardPropertyTokens>
                <div class="space"></div>
                <div v-if="item.use > 0" class="thing-use-container">
                    <span class="thing-use">Utilisations</span>
                    <div class="thing-use">
                        <div class="thing-use-checkbox" v-for="u in item.use"></div>
                    </div>
                </div>
            </div>
            <div class="thing-footers">
                <div v-if="item.hands == 1" class="thing-hands">
                    <img class="thing-hands" src="images/common/hands-1.png"/>
                </div>
                <div v-else-if="item.hands == 2" class="thing-hands">
                    <img class="thing-hands" src="images/common/hands-1.png"/>
                    <img class="thing-hands" src="images/common/hands-2.png"/>
                </div>
                <div v-else-if="item.hands == 3" class="thing-hands">
                    <img class="thing-hands" src="images/common/hands-1.png"/>
                    <label class="thing-hands">/</label>
                    <img class="thing-hands" src="images/common/hands-1.png"/>
                    <img class="thing-hands" src="images/common/hands-2.png"/>
                </div>
                <div v-else class="thing-hands">
                </div>
                <div v-if="item.weight.value > 0" class="thing-weight">
                    <label class="thing-weight">{{item.weight.value}}</label>
                    <img class="thing-weight" v-bind:src="'images/common/weight-'+item.weight.unit+'.png'"/>
                </div>
                <div v-else class="thing-weight"></div>
                <div class="thing-cost">
                    <label class="thing-cost">{{item.cost.value}}</label>
                    <img class="thing-cost" v-bind:src="'images/common/cost-'+item.cost.unit+'.png'"/>
                </div>
            </div>
        </div>
        <div v-else class="thing"></div>`
};