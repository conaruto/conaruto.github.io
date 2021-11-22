var valueToken = {
    props: ['valueToken'],
    methods: {
        is: function(t) {
            if (this.valueToken != undefined) {
                r = (this.valueToken.name == t);
                //console.log("#"+JSON.stringify(this.valueToken)+"#.is("+t+")="+r);
                return(r);
            }
        },
        icon: function(tp) {
            r = getUIConfigKey("values","icons", this.valueToken, tp);
            return(r);
        },
        classes: function(tp) {
            r = getUIConfigKey("values", "classes", this.valueToken, tp)
            return(r);
        },
        label: function(tp) {
            r = getUIConfigKey("values", "labels", this.valueToken, tp)
            return(r);
        },
    },
    template: 
        `<div v-if="is('quantity')" class="valueToken">
            <span v-bind:class="classes('adjustment')">{{label("adjustment")}}</span><span v-bind:class="classes('count')">{{label("count")}}</span>
        </div>
        <div v-else-if="is('attribute')" class="valueToken">
            <span v-bind:class="classes('adjustment')">{{label("adjustment")}}</span><span v-bind:class="classes('attribute')">{{label("attribute")}}</span>
        </div>
        <div v-else-if="is('modifier')" class="valueToken">
            <span v-bind:class="classes('adjustment')">{{label("adjustment")}}</span><span v-bind:class="classes('modifier')">{{label("modifier")}}</span>
        </div>
        <div v-else-if="is('dice')" class="valueToken">
            <span v-bind:class="classes('adjustment')">{{label("adjustment")}}</span><span v-bind:class="classes('count')">{{label("count")}}</span><span v-bind:class="classes('die')">{{label("die")}}</span>
        </div>
        <div v-else-if="is('other')" class="valueToken">
            <span v-bind:class="classes('adjustment')">{{label("adjustment")}}</span><span v-bind:class="classes('other')">{{label("other")}}</span>
        </div>
        <div v-else-if="is('dm')" class="valueToken">
            <img v-for="dm in valueToken.dm" v-bind:class="classes(dm)" v-bind:src="icon(dm)" v-bind:title="label(dm)"/>
        </div>
        <div v-else-if="is('element')" class="valueToken">
            <span v-bind:class="classes('adjustment')">{{label("adjustment")}}</span><span v-if="label('count') > 0" v-bind:class="classes('count')">{{label("count")}}</span><img v-bind:class="classes('element')" v-bind:src="icon('element')" v-bind:title="label('element')"/>
        </div>
        <div v-else-if="is('measure')" class="valueToken">
            <span v-bind:class="classes('adjustment')">{{label("adjustment")}}</span><span v-bind:class="classes()">{{label()}}</span>
        </div>
        <div v-else-if="is('free')" class="valueToken">
            <span v-bind:class="classes('adjustment')">{{label("adjustment")}}</span><span v-bind:class="classes('value')">{{label("value")}}</span>
        </div>`
};
var valueTokens = {
    props: ['valueTokens'],
    components: {
        'valueToken': valueToken
    },
    computed: {
        expandToken: function() {
            expandedTokens = [];
//console.log("Expanded '"+JSON.stringify(this.valueTokens)+"'");
            this.valueTokens.map( vt => {
                if (('name' in vt) && (vt.name in coUIConfig.values.expanded)) {
                coUIConfig.values.expanded[vt.name].map( t => {
                    if (t in vt) {
                        if (Array.isArray(vt[t])) {
                            vt[t].map( v => {
                                if ((!!v) && (v.constructor === Object)) {
//console.log("Expanded '"+t+"' array token : " + JSON.stringify(v));
                                    expandedTokens.push(v);
                                } else {
                                    var nt = {};
                                    nt[t] = v;
//console.log("Expanded '"+t+"' standalone Array token : " + JSON.stringify(nt));
                                    expandedTokens.push(nt);
                                }
                            });
                        } else {
                            nt = clone(vt[t]);
//console.log("Expanded '"+t+"' single token : " + JSON.stringify(nt));
                            expandedTokens.push( nt );
                        }
                    } else {
//console.log("Unable to find expanded property '"+t+"' in token properties");
                    }
                });
                } else {
                expandedTokens.push(vt);
                }   
            });
//console.log("Expanded tokens value : "+JSON.stringify(expandedTokens));
            return(expandedTokens);
        }
    },
    template: 
        `<div class=valueTokens>
            <valueToken v-for="vt, index in expandToken" v-bind:valueToken="vt" v-bind:key="index"></valueToken>
         </div>`
};