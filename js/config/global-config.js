var coConfig = {
    "wayUrl": 'data/naruto-ways.json',
    "thingUrl": 'data/naruto-things.json'
};

var mainDefaults = {
    'items' : [],
    'cartItems': [],
    'cartDisplay': false
};

var editorDefaults = {
    'items': [],
    'itemTypePicked': "profil",
    'itemNameSelected': null,
    'item': {},
    'options': [],
    'schemas': {},
    'save': false,
    'saveEnable': false,
    'saveData': {},
    'saveFileName': ""
};


var addToCart = function(items) {
    eventBus.$emit('addToCartEvent', items);
};
var removeFromCart = function(items) {
    eventBus.$emit('removeFromCartEvent', items);
};

var coItemsConfig = {
    "capacityConfig": {
        "cartItemsPerPageCount": 40,
    },
    "thingConfig": {
        "cartItemsPerPageCount": 32,
        "icon": {
            "prefix": "images/otypes/",
            "extension": ".png",
        }
    },
    "headers": {
        "capacities": [
            {
                "name": "action", 
                "type": "button", 
                "classes": function() {return(["defaultItemTable", "buttonItemTable"]);}, 
                "icon": function() {return("images/ui/addtocart.png")},
                "title": function() {return("Ajouter au panier");},
                "action": function() {return(addToCart);}
            }, {
                "name": "rank", 
                "type": "text", 
                "classes": function() {return(["defaultItemTable", "rankItemTable"]);},
                "label": "Rg",
                "text": function(r) {return(r.rank);}
            }, {
                "name": "name", 
                "type": "text", 
                "classes":function() {return(["defaultItemTable", "nameItemTable"]);}, 
                "label": "Nom de la voie",
                "text": function(r) {return(r.name);}
            }, {
                "name": "limited", 
                "type": "text", 
                "classes": function() {return(["defaultItemTable", "limitedItemTable"]);}, 
                "label": "(L)",
                "text": function(r) {if (r.limited) {return("L");} else {return("")}}
            }, {
                "name": "description", 
                "type": "detail", 
                "classes": function() {return(["defaultItemTable", "descriptionItemTable"]);},
                "label": "Description",
                "summary": function(r) {return(r['short-description']);},
                "full-text": function(r) {return(r['full-description']);}
            },
        ],
        "capacitiesCart": [
            {
                "name": "action", 
                "type": "button", 
                "classes": function() {return(["defaultItemTable", "buttonItemTable"]);}, 
                "label": "", 
                "icon": function() {return("images/ui/removefromcart.png")},
                "title": function() {return("Enlever du panier");},
                "action": function() {return(removeFromCart);}
            }, {
                "name": "way", 
                "type": "icon", 
                "classes": function() {return(["defaultItemTable", "wayIconItemTable"]);},
                "label": "Voie",
                "icon": function(r) {return(r['way-icon']);}, 
                "title": function(r) {return(r.way);},
            }, {
                "name": "rank", 
                "type": "text", 
                "classes": function() {return(["defaultItemTable", "rankItemTable"]);},
                "label": "Rg",
                "text": function(r) {return(r.rank);}
            }, {
                "name": "name", 
                "type": "text", 
                "classes":function() {return(["defaultItemTable", "nameItemCartTable"]);}, 
                "label": "Nom de la voie",
                "text": function(r) {return(r.name);}
            }
        ],
        "things": [
            {
                "name": "action-item-add", 
                "type": "button", 
                "classes": function() {return(["defaultItemTable", "buttonItemTable"]);}, 
                "icon": function() {return("images/ui/addtocart.png")},
                "title": function() {return("Ajouter au panier");},
                "action": function() {return(addToCart);}
            },{
                "name": "type", 
                "type": "icon", 
                "classes": function() {return(["defaultItemTable", "typeIconItemTable"]);},
                "label": "Type",
                "icon": function(r) {
                    if (r == undefined) {
                        r="no-thing";
                    }
                    return(coItemsConfig.thingConfig.icon.prefix+r.ttype+coItemsConfig.thingConfig.icon.extension);
                }, 
                "title": function(r) {return(r['type']);},
            }, {
                "name": "name", 
                "type": "text", 
                "classes":function() {return(["defaultItemTable", "nameItemTable"]);}, 
                "label": "Nom de l'objet",
                "text": function(r) {return(r.name);}
            }, {
                "name": "description", 
                "type": "detail", 
                "classes": function() {return(["defaultItemTable", "descriptionItemTable"]);},
                "label": "Description",
                "summary": function(r) {return(r['short-description']);},
                "full-text": function(r) {return(r['full-description']);}
            }, {
                "name": "cost", 
                "type": "text", 
                "classes": function() {return(["defaultItemTable", "costItemTable"]);},
                "label": "Prix",
                "text": function(r) {
                    return(r['cost']['value'] + " " + r['cost']['unit']);
                }
            },
        ],
        "thingsCart": [
            {
                "name": "action-cart-remove", 
                "type": "button", 
                "classes": function() {return(["defaultItemTable", "buttonItemTable"]);}, 
                "label": "", 
                "icon": function() {return("images/ui/removefromcart.png")},
                "title": function() {return("Enlever du panier");},
                "action": function() {return(removeFromCart);}
            },{
                "name": "count", 
                "type": "text", 
                "classes":function() {return(["defaultItemTable", "countItemCartTable"]);}, 
                "label": "Qté",
                "text": function(r) {return(r.count);}
            }, {
                "name": "action-cart-add", 
                "type": "button", 
                "classes": function() {return(["defaultItemTable", "buttonItemTable"]);}, 
                "icon": function() {return("images/ui/addtocart.png")},
                "title": function() {return("Ajouter au panier");},
                "action": function() {return(addToCart);}
            },{
                "name": "Icone", 
                "type": "icon", 
                "classes": function() {return(["defaultItemTable", "typeIconItemTable"]);},
                "label": "Icone",
                "icon": function(r) {
                    if (('icon' in r) && (r.icon != "")) {
                        return(r.icon);
                    } else {
                        return("data:image/png;base64,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")
                    }
                } , 
                "title": function(r) {return(r['type']);},
            }, {
                "name": "name", 
                "type": "text", 
                "classes":function() {return(["defaultItemTable", "nameItemCartTable"]);}, 
                "label": "Nom de l'objet",
                "text": function(r) {return(r.name);}
            }, {
                "name": "cost", 
                "type": "text", 
                "classes": function() {return(["defaultItemTable", "costItemTable"]);},
                "label": "Prix",
                "text": function(r) {
                    return((r['cost']['value'] * r.count) + " " + r['cost']['unit']);
                }
            },
        ]
    },
    "footers": {
        "thingsCart": [
            {
                "name": "hidden", 
                "classes":function() {return(["defaultItemTable", "ItemCartTableHidden"]);}, 
                "label": "", 
            },{
                "name": "hidden", 
                "classes":function() {return(["defaultItemTable", "ItemCartTableHidden"]);}, 
                "label": "", 
            },{
                "name": "hidden", 
                "classes":function() {return(["defaultItemTable", "ItemCartTableHidden"]);}, 
                "label": "", 
            },{
                "name": "hidden", 
                "classes":function() {return(["defaultItemTable", "ItemCartTableHidden"]);}, 
                "label": "", 
            },{
                "name": "name", 
                "classes":function() {return(["defaultItemTable", "totalItemCartTable"]);}, 
                "label": "Total",
            }, {
                "name": "cost", 
                "classes": function() {return(["defaultItemTable", "costItemTable"]);},
                "text": function(items) {
                    return(
                        items.filter(v => 'cost' in v).map( 
                            item => item['cost']['value'] *  item.count
                        ).reduce((a,v)=>a+v, 0) + " Ryô");
                }
            },
        ]
    },
};

var adjustment = function(v) { 
    switch(v) {
        case '=':
            return(["valueToken","hiddenValueToken"]);
        case '≥':
            return(["valueToken","rightAndLeftPaddingValueToken"]);
        case '>':
            return(["valueToken","rightAndLeftPaddingValueToken"]);
        case '<':
            return(["valueToken","rightAndLeftPaddingValueToken"]);
        case '≤':
            return(["valueToken","rightAndLeftPaddingValueToken"]);
        case 'x':
            return(["valueToken","rightAndLeftPaddingValueToken"]);
        case '/':
            return(["valueToken","rightAndLeftPaddingValueToken"]);
        case ',':
            return(["valueToken","rightPaddingValueToken"]);
        default:
            return(["valueToken"]); 
    }
};

var coUIConfig = {
    "way": {
        "default": "images/ways/no-way.png"
    },
    "thing": {
        "default": "images/otypes/no-thing.png"
    },
    "mudra":{
        "Buffle": "images/mudras/buffle.png",
        "Cheval": "images/mudras/cheval.png",
        "Chèvre": "images/mudras/chevre.png",
        "Chien": "images/mudras/chien.png",
        "Coq": "images/mudras/coq.png",
        "Dragon": "images/mudras/dragon.png",
        "Lièvre": "images/mudras/lievre.png",
        "Multiclonage": "images/mudras/multiclonage.png",
        "Rat": "images/mudras/rat.png",
        "Rupture": "images/mudras/rupture.png",
        "Sanglier": "images/mudras/sanglier.png",
        "Serpent": "images/mudras/serpent.png",
        "Singe": "images/mudras/singe.png",
        "Tigre": "images/mudras/tigre.png",
        "Sang": "images/mudras/sang.png"
    },
    "values": {
        "classes": {
            "quantity": {
                "adjustment": adjustment,
                //"count": function(v) { if (v == 0) {return(["valueToken","hiddenValueToken"]);} else {return(["valueToken"]);}}
            },
            "dice": {
                "adjustment": adjustment,
            },
            "attribute": {
                "adjustment": adjustment,
            },
            "modifier": {
                "adjustment": adjustment,
                "modifier": function(v) { return(["valueToken"]); }
            },
            "other": {
                "adjustment": adjustment,
                "other": function(v) { return(["valueToken"]); }
            },
            "element": {
                "adjustment": adjustment,
            },
            "measure": {
                "adjustment": adjustment,
                "*" : function(v) { return(["valueToken", "leftPaddingValueToken"]); }
            },
            "free": {
                "adjustment": adjustment,
            },
            "dm": {
                "Tranchant": function(v) {return(["valueToken","hiddenValueToken"]);},
                "Perforant": function(v) {return(["valueToken","hiddenValueToken"]);},
                "Contondant": function(v) {return(["valueToken","hiddenValueToken"]);},
            },
            "default": ["valueToken"]
        },
        "icons": {
            "element": {
                "element": function(v) {
                    switch(v) {
                        case 'Mana':
                            return("images/common/mana.png");
                        case 'Chakra' :
                            return("images/common/chakra.png");
                        default:
                            return("images/common/unknown.png"); 
                    }
                }
            },
            "dm": {
                "Mentaux": function(v) {return("images/common/mental.png");},
                "Feu": function(v) {return("images/common/feu.png");},
                "Froid": function(v) {return("images/common/froid.png");},
                "Acide": function(v) {return("images/common/acide.png");},
                "Foudre": function(v) {return("images/common/foudre.png");},
                "Poison": function(v) {return("images/common/poison.png");},
                "Chakra": function(v) {return("images/common/chakra.png");},
            },
            "default": "images/common/unknown.png"
        },
        "labels": {
            "other": {
                "other": function(v) { 
                    switch(v) {
                        case ",":
                        case ":":
                            return(v + "\xa0");
                            case "space":
                                return("\xa0");
                        case "melee":
                        case "range":
                        case "magical":
                        case "jutsu":    
                        case "jutsu-melee":
                        case "jutsu-range":    
                            return("images/common/attack-"+v+".png");
                        default:
                            return("[" + v + "]");
                    }
                }
            },
            "dice": {
                "die": function(v) { return("d" + v); }
            },
            "default": "NoLabel"
        },
        "expanded": {
            "damage": ["values", "dm"],
            "dm": ["dm"]
        }
    },
    "properties": {
        "max-icon-per-column": 6,
        "classes": {
            "attribute": {
                "*": function(v) {return(["propertyToken","fixedFontPropertyToken","rightPaddingPropertyToken","boldPropertyToken"]);}  
            },
            "measure": {
                "unit": function(v) {return(["propertyToken", "leftPaddingPropertyToken"]);},
            },
            "state": {
                "state": function(v,t) {return(["propertyToken", "condensedPropertyToken"]);},
                "detail": function(v) {return(["propertyToken", "leftPaddingPropertyToken"]);}
            },
            "property": {
                "property": function(v,t) {
                    if (v == "") {
                        return(["propertyToken", "hiddenPropertyToken"]);
                    } else {
                        switch (t) {
                            case "highlighted":
                                return(["propertyToken", "smallFontPropertyToken", "rightPaddingPropertyToken"]);
                            case "iconified":
                                return(["propertyToken", "smallcapsPropertyToken"]);
                            default:
                                return(["propertyToken", "rightPaddingPropertyToken", "boldPropertyToken"]);
                        }
                    }
                },
                "value": function(v,t) {
                    if (v == "") {
                        return(["propertyToken", "hiddenPropertyToken"]);
                    } else {
                        switch (t) {
                            case "highlighted":
                                return(["propertyToken", "rightJustifyPropertyToken", "emphasesPropertyToken"]);
                            case "standard":    
                                return(["propertyToken", "wrapPropertyToken"]);
                            default:
                                return(["propertyToken", "hiddenPropertyToken"]);
                        }
                    }
                },
            },
            "damage": {
                "DM": function(v) {return(["propertyToken", "leftAndRightPaddingPropertyToken", "condensedPropertyToken", "boldPropertyToken"]);},
            },
            "test":{
                "detail": function(v) {return(["propertyToken", "leftPaddingPropertyToken"]);},
                "*": function(v) {return(["propertyToken", "smallCapsValueToken"]);},
            },
            "action":{
                "detail": function(v) {return(["propertyToken", "leftPaddingPropertyToken"]);},
                "*": function(v) {return(["propertyToken", "rightPaddingPropertyToken", "boldPropertyToken"]);},
            },
            "defense": {
                "DEF": function(v, t) { if (t == "highlighted") {return(["propertyToken", "bigSizeImagePropertyToken", "rightPaddingPropertyToken"]);} else {return(["propertyToken", "rightPaddingPropertyToken"]);}},
                "detail": function(v,t) {
                    if (v == "") {
                        return(["propertyToken", "hiddenPropertyToken"]);
                    } else {
                        switch (t) {
                            case "highlighted":
                                return(["propertyToken", "rightJustifyPropertyToken", "emphasesPropertyToken"]);
                            case "standard":    
                                return(["propertyToken", "condensedPropertyToken"]);
                            default:
                                return(["propertyToken", "hiddenPropertyToken"]);
                        }
                    }
                }
            },
            "attack": {
                "*": function(v, t) { if (t == "highlighted") {return(["propertyToken", "bigSizeImagePropertyToken", "rightPaddingPropertyToken"]);} else {return(["propertyToken", "rightPaddingPropertyToken"]);}},
            },
            "default": ["propertyToken", "rightPaddingPropertyToken"]
        },
        "icons": {
            "measure": {
                "range": function(v,t) {return("images/common/range.png")},
                "area": function(v,t) {return("images/common/area.png")},
                "height": function(v,t) {return("images/common/height.png")},
                "duration": function(v,t) {return("images/common/duration.png")},
                "weight": function(v,t) {return("images/common/weight.png")},
                "capacity": function(v,t) {return("images/common/capacity.png")},
            },
            "character": {
                "init": function(v,t) {return("images/common/init.png")},
                "PV": function(v,t) {return("images/common/pv.png")},
                "Chakra": function(v,t) {return("images/common/chakra.png")},
                "DEF": function(v,t) {return("images/common/def.png")},
            },
            "defense": {
                "DEF": function(v,t) {return("images/common/def.png")},
            },
            "attack": {
                "Contact": function(v,t) {return("images/common/attack-melee.png")},
                "Distance": function(v,t) {return("images/common/attack-range.png")},
                "Magique": function(v,t) {return("images/common/attack-magical.png")},
                "Jutsu": function(v,t) {return("images/common/attack-jutsu.png")},
            },
            "critical": { 
                "critical": function(v,t) {return("images/common/critical.png")},
            },
            "default": "images/common/unknown.png"
        },
        "labels": {
            "damage": {
                "DM": function(v,t) {
                    switch(t) {
                        case "highlighted":
                            return(":");
                        default:
                            return(v+":");
                    }
                },
            },
            "critical": {
                "values": function(v,t) { 
                    if ((!(Array.isArray(v))) || ( v.length < 1 ) || ((v.length == 1)&& (v[0] == 20))) {
                        return(false);
                    } else {
                        return(v.toRangeSet()); 
                    }
                }
            },
            "property": {
                "property": function(v,t) {
                    switch(t) {
                        case "highlighted":
                            return("("+v+")");
                        default:
                            if (v != "") {
                                return(v+":");
                            } else {
                                return("");
                            }
                    }
                },
                "value": function(v,t) {
                    switch(t) {
                        case "highlighted":
                            return(v);
                        default:
                            return(v);
                    }
                }
            },
            "action": {
                "detail": function(v) {return(v);},
            },
            "defense": {
                "DEF": function(v, t) {if (t == "highlighted") {return(":");} else {return("")}},
            },
            "default": "NoLabel"
        },
        "highlighted": { 
            "defense": ["all"],
            "fight": ["attack","fight","damage","property"],
        },
        "iconified": { 
            "empty": ["all"],
            "measure": ["all"], 
            "attribute": ["all"], 
            "skill": ["discretion"],
            "creature": ["all"],
            "damage": ["all"],
            "character": ["all"],
            "fight": ["critical"]
        },
        "iconifiedException": {
           "fight": {
                "critical": ["[20]", "[]", "null"]
           }
        },
        "expanded": {
            "fight": {
                "attack": {
                    "template": {"name": "attack", "attack": null, "values": null},
                    "map": {
                        "attack": {
                            "attack": "attack",
                            "values": "values"
                        }
                    }
                },
                "fight" : {
                    "template": {"name": "property", "property": null, "value": ""},
                    "map": {"fight": "property"}
                },
                "damage": {
                    "template": {"name": "damage", "damage": "DM", "values": null},
                    "map": {
                        "damage": "values",
                    }
                },
                "detail" : {
                    "template": {"name": "property", "property": "", "value": null},
                    "map": {"detail": "value"}
                },
                "critical": {
                    "template": {"name": "critical", "critical": "critical","values": null},
                    "map": {
                        "critical": "values",
                    },
                }
            },
            "damage": {
                "damage": {
                    "template": {"name": "damage", "damage": "DM", "values": null},
                    "map": {
                        "damage": "values",
                    }
                },
            },
            "creature": {
                "creature" : {
                    "template": {"name": "property", "property": null, "value": ""},
                    "map": {"creature": "property"}
                },
                "init" : {
                    "template": {"name": "character", "character": "init","values": []},
                    "map": {"init": "values"}
                },
                "PV" : {
                    "template": {"name": "character", "character": "PV","values": null},
                    "map": {"PV": "values"}
                },
                "DEF" : {
                    "template": {"name": "defense", "defense": "DEF","values": []},
                    "map": {"DEF": "values"}
                },
                "FOR" : {
                    "template": {"name": "attribute", "attribute": "FOR","values": []},
                    "map": {"FOR": "values"}
                },
                "DEX" : {
                    "template": {"name": "attribute", "attribute": "DEX","values": []},
                    "map": {"DEX": "values"}
                },
                "CON" : {
                    "template": {"name": "attribute", "attribute": "CON","values": []},
                    "map": {"CON": "values"}
                },
                "INT" : {
                    "template": {"name": "attribute", "attribute": "INT","values": []},
                    "map": {"INT": "values"}
                },
                "SAG" : {
                    "template": {"name": "attribute", "attribute": "SAG","values": []},
                    "map": {"SAG": "values"}
                },
                "CHA" : {
                    "template": {"name": "attribute", "attribute": "CHA","values": []},
                    "map": {"CHA": "values"}
                },
                "attack": {
                    "template": {"name": "attack", "attack": null, "values": null},
                    "map": {
                        "attack": {
                            "attack": "attack",
                            "values": "values"
                        }
                    }
                },
                "damage": {
                    "template": {"name": "damage", "damage": "DM", "values": null},
                    "map": {
                        "damage": "values",
                    }
                }
            }
        }

    }
};