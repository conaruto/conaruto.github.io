isExpandedProperty = function(p) {
    isExpanded = (
        ( p != undefined ) && ('name' in p) && 
        (p.name in coUIconfig.properties.expanded)
    );
// console.log("isExpandedProperty("+JSON.stringify(p)+"):" + isExpanded);
    return(isExpanded);
};

isIconifiedProperty = function(p) {
    isIconified = (
        ( p != undefined ) && ('name' in p) &&
        p.name in coUIconfig.properties.iconified) && (
            coUIconfig.properties.iconified[p.name].includes("all") ||
            ( ( p.name in p ) &&
              coUIconfig.properties.iconified[p.name].includes(p[p.name])
        )
    );
    //console.log("isIconifiedProperty("+JSON.stringify(p)+"):" + isIconified);
    return(isIconified);
};

iconifiedProperties = function(ip) {
    if (Array.isArray(ip)) {
        return(ip.filter(p => isIconifiedProperty(p)));
    } else {
        return([]);
    }
};

expandProperty = function(p) {
    expandedProperties = [];
    if (isExpandedProperty(p) && ('name' in p)) {
        refArray = Object.keys(coUIconfig.properties.expanded[p.name]);
        //console.log("Expected order :"+JSON.stringify(refArray));
        for (const [ep, ev] of Object.entries(p).sort(function([a,], [b,]) {
            return(refArray.indexOf(a) - refArray.indexOf(b));
        })) {
            //console.log("Expanding property '"+ep+"'");
            if ((ep in coUIconfig.properties.expanded[p.name]) && 
                ('template' in coUIconfig.properties.expanded[p.name][ep])) {
                nep = clone(coUIconfig.properties.expanded[p.name][ep]['template']);
            
                //console.log("Expanding '"+ep+"' with '"+JSON.stringify(nep)+"'");
                if ('map' in coUIconfig.properties.expanded[p.name][ep]) {
                    for (const [ip, tp] of Object.entries(coUIconfig.properties.expanded[p.name][ep]['map'])) {
                        if ((ip in p) &&(typeof(tp) == "string" ) && (tp in nep)) {
                            //console.log("Mapping template '"+tp+"("+JSON.stringify(p[ip])+")' property with '"+p.name+"' property '"+tp+"'");
                            if (Array.isArray(nep[tp])) {
                                nep[tp].push(clone(p[ip]));
                            } else {
                                nep[tp] = clone(p[ip]);
                            }
                        } else {
// console.log("Map property is not a string : " + JSON.stringify(tp));
                            if ((ip in p) && (!!tp) && (tp.constructor === Object)) {
                                for (const [subip, subtp] of Object.entries(tp)) {
                                    if ((subip in p[ip]) && (typeof(subtp) == "string" ) && (subtp in nep)) {
// console.log("Map property '"+subtp+"' value : "+JSON.stringify(nep[subtp])+" with "+JSON.stringify(p[ip][subip]));
                                        if (Array.isArray(nep[subtp])) {
                                            nep[subtp].push(clone(p[ip][subip]));
                                        } else {
                                            nep[subtp] = clone(p[ip][subip]);
                                        }
                                    } else {
// console.log("Multi property 3rd level expand : Not implemented");
                                    }
                                }
                            } else {
// console.log("Unkwnown expand map type");
                            }
                        }
                    }
                } else {
// console.log("No internal property to expand for property '"+ep+"'");
                }
// console.log("Expanded property :"+JSON.stringify(nep));
                expandedProperties.push(nep);
            
            } else {
// console.log("Unable to Expand property '"+ep+"' : Not found");
            }
        }
    } else {
        expandedProperties.push(p);
    }
    return(expandedProperties);
};

isHighlightedProperty = function(p) {
    isHighlighted = (
        ( p != undefined ) && ('name' in p) &&
        p.name in coUIconfig.properties.highlighted) && (
            coUIconfig.properties.highlighted[p.name].includes("all") ||
            ( ( p.name in p ) &&
              coUIconfig.properties.highlighted[p.name].includes(p[p.name])
        )
    );
    //console.log("isHighlightedProperty("+JSON.stringify(p)+"):" + isHighlighted);
    return(isHighlighted);
};

highlightedProperties = function(hp) {
    if (Array.isArray(hp)) {
        //console.log("highlightedProperties : "+JSON.stringify(hp.filter(p => isHighlightedProperty(p))));
        return(hp.filter(p => isHighlightedProperty(p)));
    } else {
        return([]);
    }
};

isStandardProperty = function(p) {
    isStandard = ((!(isIconifiedProperty(p))) && (!(isHighlightedProperty(p))));
    //console.log("isStandardProperty("+JSON.stringify(p)+") :" + isStandard);
    return(isStandard);
};

standardProperties = function(sp) {
    r = [];
    if (Array.isArray(sp)) {
        r = sp.filter(p => isStandardProperty(p));
    }
    //console.log("standardProperties("+JSON.stringify(sp)+")="+JSON.stringify(r));
    return(r);
};

var propertyToken = {
    props: ['propertyToken', 'refname', 'ptype'],
    methods: {      
        is: function(t) {
            if (this.propertyToken != undefined) {
                return(this.propertyToken.name == t);
            }
        },
        icon: function(tp) {
            r = getUIConfigKey("properties","icons", this.propertyToken, tp, this.ptype);
            return(r);
        },
        hasIcon: function(tp) {
            return(this.icon(tp) != "images/common/no-icon.png");
        },
        classes: function(tp) {
            r = getUIConfigKey("properties","classes", this.propertyToken, tp, this.ptype);
            return(r);
        },
        label: function(tp) {
            r = getUIConfigKey("properties","labels", this.propertyToken, tp, this.ptype);
            return(r);
        },
    },
    components: {
        'valueTokens': valueTokens
    },
    template: 
        `<div v-if="is('attribute')" class="propertyTokenContainer" v-bind:ref="refname">
            <span v-bind:class="classes()">{{label()}}</span>
            <valueTokens v-bind:valueTokens="propertyToken.values"></valueTokens>   
        </div>
        <div v-else-if="is('measure')" class="propertyTokenContainer" v-bind:ref="refname">
            <img v-bind:class="classes()" v-bind:src="icon()"/>
            <valueTokens v-bind:valueTokens="propertyToken.values"></valueTokens>
            <span v-bind:class="classes('unit')">{{label("unit")}}</span>
        </div>
        <div v-else-if="is('property')" class="propertyTokenContainer" v-bind:ref="refname">
            <span v-bind:class="classes('property')">{{label('property')}}</span><span v-bind:class="classes('value')">{{label("value")}}</span>
        </div>
        <div v-else-if="is('character')" class="propertyTokenContainer" v-bind:ref="refname">
            <img v-if="hasIcon()" v-bind:class="classes()" v-bind:src="icon()" v-bind:title="label()"/>
            <valueTokens v-if="hasIcon()" v-bind:valueTokens="propertyToken.values"></valueTokens>
            <span v-else v-bind:class="classes('nickname')">{{label('nickname')}}</span>
        </div>
        <div v-else-if="is('defense')" class="propertyTokenContainer" v-bind:ref="refname">
            <img v-bind:class="classes()" v-bind:src="icon()" v-bind:title="label()"/><span v-bind:class="classes()">{{label()}}</span><valueTokens v-bind:valueTokens="propertyToken.values"></valueTokens><span v-bind:class="classes('detail')">{{label("detail")}}</span>
        </div>
        <div v-else-if="is('attack')" class="propertyTokenContainer" v-bind:ref="refname">
            <img v-bind:class="classes()" v-bind:src="icon()" v-bind:title="label()"/>
            <valueTokens v-bind:valueTokens="propertyToken.values"></valueTokens>
        </div>
        <div v-else-if="is('damage')" class="propertyTokenContainer" v-bind:ref="refname">
            <span v-bind:class="classes()">{{label()}}</span>
            <valueTokens v-bind:valueTokens="propertyToken.values"></valueTokens>
        </div>
        <div v-else-if="is('test')" class="propertyTokenContainer" v-bind:ref="refname">
            <span class="propertyToken rightPaddingPropertyToken">Test</span><span v-bind:class="classes()">{{label()}}</span>
            <valueTokens v-bind:valueTokens="propertyToken.values"></valueTokens>
            <span v-bind:class="classes('detail')">{{label("detail")}}</span>
        </div>
        <div v-else-if="is('action')" class="propertyTokenContainer" v-bind:ref="refname">
            <span v-bind:class="classes()">{{label()}}</span><span v-if="propertyToken.limited" v-bind:class="classes()">(L)</span><span v-bind:class="classes()">:</span>
            <valueTokens v-bind:valueTokens="propertyToken.values"></valueTokens>
            <span v-bind:class="classes('detail')">{{label("detail")}}</span>
        </div>
        <div v-else-if="is('state')" class="propertyTokenContainer" v-bind:ref="refname">
            <span class="propertyToken rightPaddingPropertyToken condensedPropertyToken boldPropertyToken">État:</span>
            <span v-bind:class="classes()">{{label()}}</span><span v-bind:class="classes('detail')">{{label("detail")}}</span>
        </div>`  
};

var highlightedPropertyTokens = {
    props: ['properties'],
    computed: {
        highlightedPropertyTokens: function() {
            return(highlightedProperties(this.properties))
        },
        expandedHighlightedPropertyTokens: function() {
            ehpts = [];
            this.highlightedPropertyTokens.map(hpt => {
                expandProperty(hpt).map(ep => ehpts.push(ep));
            });
            return(ehpts);
        }
    },
    components: {
        'propertyToken': propertyToken
    },
    template:
        `<div v-if="highlightedPropertyTokens.length > 0" class="highlightedPropertyTokensContainer">
             <div class="highlightedPropertyTokens" v-for="hp in expandedHighlightedPropertyTokens">
                 <propertyToken v-bind:propertyToken="hp" v-bind:ptype="'highlighted'"></propertyToken>
             </div>
         </div>`
    
};

var standardPropertyTokens = {
    props: ['properties'],
    computed: {
        standardPropertyTokens: function() {
            return(standardProperties(this.properties))
        }
    },
    components: {
        'propertyToken': propertyToken
    },
    template:
        `<div v-if="standardPropertyTokens.length > 0" class="standardPropertyTokensContainer">
                <span class="standardPropertyTokens">Propriétés spéciales</span>
             <div class="standardPropertyTokens" v-for="sp in standardPropertyTokens">
                 <img v-if="sp.property != ''" class="standardPropertyTokens" src="images/common/standard-property.png"/>
                 <span v-else class="emptyProperty"></span>
                 <propertyToken v-bind:propertyToken="sp" v-bind:ptype="'standard'"></propertyToken>
             </div>
         </div>`
    
};
var iconifiedPropertyTokens = {
    props: ['properties', 'parentid'],
    computed: {
        iconifiedPropertyTokens: function() {
            return(iconifiedProperties(this.properties));
        },
        expandedIconifiedPropertyTokens: function() {
            eipts = [];
            this.iconifiedPropertyTokens.map(ipt => {
                expandProperty(ipt).map(ep => eipts.push(ep));
            });
            return(eipts);
        }
    },
    updated: function () {
        //console.log("Hacked :"+ document.querySelector("#iproperties"));
        this.$nextTick(function () {
          // Code that will run only after the
          // entire view has been re-rendered
          Object.keys(this.$refs).map(r => {
            ip = document.getElementById(r);
            p = document.getElementById(r+'-propertyToken');
            if (( ip != null ) && ( p != null )){
                wp = p.parentElement.parentElement.getBoundingClientRect().width;
                //console.log("parent :" +wp);
                w =p.getBoundingClientRect().width;
// console.log("["+r+"] Width : " + w);
                if (w < (wp / 6.0)+1) {
                    //console.log("["+r+"] Keep width (" + w +")");
                    ip.className = "iconifiedPropertyTokens smallIconifiedPropertyTokens";
                } else {
                    if (w < (wp / 3.0)+1) {
                        //console.log("["+r+"] New width (" + w +")");
                        ip.className = "iconifiedPropertyTokens bigIconifiedPropertyTokens";
                    } else {
                        //console.log("["+r+"] New width (" + w +")");
                        ip.className = "iconifiedPropertyTokens veryBigIconifiedPropertyTokens";
                    }
                }
            }
            });
        })
      },
    components: {
        'propertyToken': propertyToken
    },
    template:
        `<div id="iconifiedPropertyTokens" v-if="iconifiedPropertyTokens.length > 0" class="iconifiedPropertyTokensContainer">
             <div class="iconifiedPropertyTokens" v-for="(ip, index) in expandedIconifiedPropertyTokens" v-bind:id="parentid + 'iconifiedPropertyTokens' + index" v-bind:ref="parentid + 'iconifiedPropertyTokens' + index">
                 <propertyToken v-bind:ptype="'iconified'" v-bind:id="parentid + 'iconifiedPropertyTokens' + index +'-propertyToken'" v-bind:propertyToken="ip"></propertyToken>
             </div>
         </div>`  
};
