var coConfig = {
    "wayUrl": 'data/naruto-ways.json',
    "helpUrls": {
        "capacity": "help/help-capacity-table.md",
        "card": "help/help-capacity-card.md"    
    },
    "objectUrl": 'data/naruto-objects.json'
};

var headersDefaults = {
    'selectedMenu': "capacity",
};

var coHeadersConfig = {
    "menus": [{
        "name": "capacity",
        "label": "Capacités",
        "link": "index.html"
    }, {
        "name": "card",
        "label": "Cartes",
        "link": "cards.html"
    }, 
    //{
    //      "name": "editor",
    //      "label": "Éditeur",
    //      "link": "editor.html"
    // }
    ],
}

var coFootersConfig = {
    "powered-by": [{
        "name": "game-icons.net",
        "title": "Game-icons.net",
        "icon": "images/ui/game-icons.png",
        "url": "https://game-icons.net"
    }, {
        "name": "ogl",
        "title": "Open Game License",
        "icon": "images/ui/ogl.png",
        "url": "http://www.opengamingfoundation.org/ogl.html"
    }, {
        "name": "bbe",
        "title": "Black Book Edition",
        "icon": "images/ui/bbe.jpeg",
        "url": "https://www.black-book-editions.fr"
    }, {
        "name": "vuejs",
        "title": "Vue.js",
        "icon": "images/ui/vuejs.png",
        "url": "https://vuejs.org"
    }, {
        "name": "naruto",
        "title": "Naruto",
        "icon": "images/ui/naruto.png",
        "url": "https://www.kana.fr/univers/naruto"
    }],
}

var mainDefaults = {
    'items' : [],
    'cartItems': [],
    'cartDisplay': false
};

var addToCart = function(vroot,items) {
    vroot.$emit('addToCartEvent', items);
};
var removeFromCart = function(vroot, items) {
    vroot.$emit('removeFromCartEvent', items);
};

var coItemsConfig = {
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
          ]
    }
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

var coUIconfig = {
    "way": {
        "default": "images/ways/no-way.png"
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
                "other": function(v) { if (v == ",") {return(v + "\xa0");} else {return("[" + v + "]");}}
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
                                return(["propertyToken", "rightPaddingPropertyToken", "condensedPropertyToken", "boldPropertyToken"]);
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
                                return(["propertyToken", "condensedPropertyToken", "wrapPropertyToken"]);
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
                "range": function(v) {return("images/common/range.png")},
                "area": function(v) {return("images/common/area.png")},
                "duration": function(v) {return("images/common/duration.png")},
                "weight": function(v) {return("images/common/weight.png")},
            },
            "character": {
                "init": function(v) {return("images/common/init.png")},
                "PV": function(v) {return("images/common/pv.png")},
                "Chakra": function(v) {return("images/common/chakra.png")},
            },
            "defense": {
                "DEF": function(v) {return("images/common/def.png")},
            },
            "attack": {
                "Contact": function(v) {return("images/common/attack-melee.png")},
                "Distance": function(v) {return("images/common/attack-range.png")},
                "Magique": function(v) {return("images/common/attack-magical.png")},
                "Jutsu": function(v) {return("images/common/attack-jutsu.png")},
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
            "fight": ["all"],
        },
        "iconified": { 
            "empty": ["all"],
            "measure": ["all"], 
            "attribute": ["all"], 
            "skill": ["discretion"],
            "creature": ["all"],
            "damage": ["all"],
            "character": ["all"]
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
            },
            "damage": {
                "damage": {
                    "template": {"name": "damage", "damage": "DM", "values": null},
                    "map": {
                        "damage": "values",
                    }
                }
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