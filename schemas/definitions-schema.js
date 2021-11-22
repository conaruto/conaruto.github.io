schemaDefinitions = {
    // Propriétés spéciales
    "attribute": {
        "title": "Caractéristique",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "attribute", "values"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["attribute"],
                "default": "attribute",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "attribute": {
                "$ref": "#/definitions/attributeToken",
                "options": propertyOptionsFill({
                    "grid_columns": 3
                }),
            },
            "values": {
                "$ref": "#/definitions/valuesToken",
                "options": propertyOptionsFill({
                    "grid_columns": 9
                })
            },
        }
    },
    "state": {
        "title": "État",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "state"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["state"],
                "default": "state",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "state": {
                "$ref": "#/definitions/stateToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4
                }),
            },
            "detail": {
                "title": "Détail",
                "type": "string",
                "options": propertyOptionsFill({
                    "grid_columns": 8,
                    "infoText": "Précision ou limitation du test",
                    "inputAttributes": {
                        "placeholder": "Elfes uniquement"
                    },
                })
            }
        }
    },
    "test": {
        "title": "Test",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "test", "values","detail"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["test"],
                "default": "test",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "test": {
                "title": "Test",
                "default": "FOR",
                "oneOf": [
                    {"$ref": "#/definitions/attributeToken"},
                ],
                "options": propertyOptionsFill({
                    "grid_columns": 3
                }),
            },
            "values": {
                "default":[{"name":"quantity","adjustment":"≥","count":10}],
                "$ref": "#/definitions/valuesToken",
                "options": propertyOptionsFill({
                    "grid_columns": 6
                })
            },
            "detail": {
                "title": "Détail",
                "type": "string",
                "options": propertyOptionsFill({
                    "grid_columns": 3,
                    "infoText": "Précision ou limitation du test",
                    "inputAttributes": {
                        "placeholder": "Elfes uniquement"
                    },
                })
            }
        }
    },
    "action": {
        "title": "Action",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "action", "limited", "values", "detail"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["action"],
                "default": "Action",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "action": {
                "title": "Action",
                "oneOf": [
                    {"$ref": "#/definitions/actionOtherToken"},
                    {"$ref": "#/definitions/actionFORToken"},
                    {"$ref": "#/definitions/actionDEXToken"},
                    {"$ref": "#/definitions/actionCONToken"},
                    {"$ref": "#/definitions/actionINTToken"},
                    {"$ref": "#/definitions/actionSAGToken"},
                    {"$ref": "#/definitions/actionCHAToken"},
                ],
                "options": propertyOptionsFill({
                    "grid_columns": 4
                }),
            },
            "limited": {
                "title": "(L)",
                "type": "boolean",
                "description": "Est-ce une action limitée ?",
                "default": false,
                "format": "checkbox",
                "options": {
                    "infoText": "Est-ce une action limitée ?",
                    "grid_columns": 2
                }   
            },     
            "detail": {
                "title": "Détail",
                "type": "string",
                "options": propertyOptionsFill({
                    "grid_columns": 6,
                    "grid_break": true,
                    "infoText": "Précision ou limitation de l'action",
                    "inputAttributes": {
                        "placeholder": "Ex: Voleur"
                    },
                })
            },
            "values": {
                "default":[{"name":"quantity","adjustment":"+","count":1}],
                "$ref": "#/definitions/valuesToken",
                "options": propertyOptionsFill({
                    "grid_columns": 12
                })
            },
        }
    },
    "measure": {
        "title": "Mesure",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name"],
        "options": propertyOptionsFill({
            "grid_columns": 6
        }),
        "properties": {
            "name": {
                "type": "string",
                "enum": ["measure"],
                "default": "measure",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
        },
        "oneOf": [
            {"$ref": "#/definitions/rangeToken"},
            {"$ref": "#/definitions/areaToken"},
            {"$ref": "#/definitions/durationToken"},
            {"$ref": "#/definitions/weighedToken"},
            {"$ref": "#/definitions/containerToken"}
        ]
    },
    "property": {
        "title": "Propriété libre",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "property", "value"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["property"],
                "default": "property",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true       
                }),

            },
            "property": {
                "title": "Propriété",
                "type": "string",
                "options": propertyOptionsFill({
                    "infoText": "Nom de la propriété",
                    "inputAttributes": {
                        "placeholder": "Ex: Utilisable"
                    },
                    "grid_columns": 4
                }),
            },
            "value": {
                "title": "Description",
                "type": "string",
                "options": propertyOptionsFill({
                    "infoText": "Description de l'effet de la propriété",
                    "inputAttributes": {
                        "placeholder": "Ex: Voleur"
                    },
                    "grid_columns": 8
                }),
            }
        }
    },
    "character": {
        "title": "Personnage",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "character", "values"], 
        "properties": {
            "name": {
                "type": "string",
                "enum": ["character"],
                "default": "character",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "character": {
                "title": "Attribut",
                "type": "string",
                "enum": ["init", "PV", "Chakra", "Mana", "DEF"],
                "default": "init",
                "options": propertyOptionsFill({
                    "infoText": "Attribut d'un personnage (initiative, PV, etc...)",
                    "grid_columns": 4,
                    "grid_break": true
                }),
            },
            "values": {
                "options": propertyOptionsFill({
                    "grid_columns": 8,
                }),
                "title": "Valeurs",
                "$ref": "#/definitions/valuesToken",
            },
        }
    },
    "defense": {
        "title": "Défense",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "defense", "values"], 
        "properties": {
            "name": {
                "type": "string",
                "enum": ["defense"],
                "default": "defense",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "defense": {
                "title": "Défense", 
                "type": "string",
                "enum": ["DEF", "RD"],
                "options": propertyOptionsFill({
                    "grid_columns": 3,
                }),
            },
            "detail": {
                "title": "Détail",
                "type": "string",
                "default": "",
                "options": propertyOptionsFill({
                    "infoText": "Précision ou limitation de la défense",
                    "inputAttributes": {
                        "placeholder": "(Optionnel)"
                    },
                    "grid_columns": 9,
                    "grid_break": true
                }),
            },
            "values": {
                "options": propertyOptionsFill({
                    "grid_columns": 12,
                }),
                "title": "Valeurs",
                "$ref": "#/definitions/valuesToken",
            },     
        },
    },
    "creature": {
        "title": "Créature",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "creature", "init", "PV", "DEF", "FOR", "DEX", "CON", "INT", "SAG", "CHA", "attack", "damage"], 
        "properties": {
            "name": {
                "type": "string",
                "enum": ["creature"],
                "default": "creature",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "creature": {
                "title": "Nom",
                "type": "string",
                "options": propertyOptionsFill({
                    "infoText": "Nom de la créature",
                    "grid_columns": 12,
                    "grid_break": true
                }),
            },
            "init": {
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                }),
                "title": "Init",
                "oneOf": [
                    { "$ref": "#/definitions/quantityObjectToken"},
                    { "$ref": "#/definitions/diceObjectToken"},
                    { "$ref": "#/definitions/attributeObjectToken"},
                    { "$ref": "#/definitions/modifierObjectToken"},
                    { "$ref": "#/definitions/otherObjectToken"}
                ]
            },
            "PV": {
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                }),
                "title": "PV",
                "$ref": "#/definitions/valuesToken",
            },
            "DEF": {
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "grid_break": true
                }),
                "title": "DEF",
                "oneOf": [
                    { "$ref": "#/definitions/quantityObjectToken"},
                    { "$ref": "#/definitions/diceObjectToken"},
                    { "$ref": "#/definitions/attributeObjectToken"},
                    { "$ref": "#/definitions/modifierObjectToken"},
                    { "$ref": "#/definitions/otherObjectToken"}
                ]
            },
            "FOR": {
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                }),
                "title": "FOR",
                "oneOf": [
                    { "$ref": "#/definitions/quantityObjectToken"},
                    { "$ref": "#/definitions/diceObjectToken"},
                    { "$ref": "#/definitions/attributeObjectToken"},
                    { "$ref": "#/definitions/modifierObjectToken"},
                    { "$ref": "#/definitions/otherObjectToken"}
                ]
            },
            "DEX": {
                "options": propertyOptionsFill({
                    "grid_columns": 4,       
                }),
                "title": "DEX",
                "oneOf": [
                    { "$ref": "#/definitions/quantityObjectToken"},
                    { "$ref": "#/definitions/diceObjectToken"},
                    { "$ref": "#/definitions/attributeObjectToken"},
                    { "$ref": "#/definitions/modifierObjectToken"},
                    { "$ref": "#/definitions/otherObjectToken"}
                ]
            },
            "CON": {
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "grid_break": true
                }),
                "title": "CON",
                "oneOf": [
                    { "$ref": "#/definitions/quantityObjectToken"},
                    { "$ref": "#/definitions/diceObjectToken"},
                    { "$ref": "#/definitions/attributeObjectToken"},
                    { "$ref": "#/definitions/modifierObjectToken"},
                    { "$ref": "#/definitions/otherObjectToken"}
                ]
            },
            "INT": {
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                }),
                "title": "INT",
                "oneOf": [
                    { "$ref": "#/definitions/quantityObjectToken"},
                    { "$ref": "#/definitions/diceObjectToken"},
                    { "$ref": "#/definitions/attributeObjectToken"},
                    { "$ref": "#/definitions/modifierObjectToken"},
                    { "$ref": "#/definitions/otherObjectToken"}
                ]
            },
            "SAG": {
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                }),
                "title": "SAG",
                "oneOf": [
                    { "$ref": "#/definitions/quantityObjectToken"},
                    { "$ref": "#/definitions/diceObjectToken"},
                    { "$ref": "#/definitions/attributeObjectToken"},
                    { "$ref": "#/definitions/modifierObjectToken"},
                    { "$ref": "#/definitions/otherObjectToken"}
                ]
            },
            "CHA": {
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "grid_break": true
                }),
                "title": "CHA",
                "oneOf": [
                    { "$ref": "#/definitions/quantityObjectToken"},
                    { "$ref": "#/definitions/diceObjectToken"},
                    { "$ref": "#/definitions/attributeObjectToken"},
                    { "$ref": "#/definitions/modifierObjectToken"},
                    { "$ref": "#/definitions/otherObjectToken"}
                ]
            },
            "attack": {
                "options": propertyOptionsFill({
                    "grid_columns": 12,
                    "grid_break": true
                }),
                "$ref": "#/definitions/attackToken"
            },
            "damage": {
                "options": propertyOptionsFill({
                    "grid_columns": 12
                }),
                "default": [{
                    "name":"damage",
                    "values":[{"name":"quantity","adjustment":"=","count":1}],
                    "dm": {"name": "dm", "dm": ["Tranchant"]}
                }],
                "title": "Dégâts",
                "type": "array",
                "format": "tabs",
                "items": {
                    "$ref": "#/definitions/damageToken"
                }
            }
        }
    },
    "fight": {
        "title": "Attaque",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "fight","attack", "damage", "detail"], 
        "properties": {
            "name": {
                "type": "string",
                "enum": ["fight"],
                "default": "fight",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "fight": {
                "title": "Nom",
                "type": "string",
                "default": "",
                "options": propertyOptionsFill({
                    "infoText": "Nom de l'attaque (optionnel)",
                    "inputAttributes": {
                        "placeholder": "(Optionnel)"
                    },
                    "grid_columns": 12,
                    "grid_break": true
                }),
            },
            "attack": {
                "options": propertyOptionsFill({
                    "grid_columns": 12,
                    "grid_break": true
                }),
                "$ref": "#/definitions/attackToken"
            },
            "damage": {
                "options": propertyOptionsFill({
                    "grid_columns": 10
                }),
                "default": [{
                    "name":"damage",
                    "values":[{"name":"quantity","adjustment":"=","count":1}],
                    "dm": {"name": "dm", "dm": ["Tranchant"]}
                }],
                "title": "Dégâts",
                "type": "array",
                "format": "tabs",
                "items": {
                    "$ref": "#/definitions/damageToken"
                }
            },
            "critical": {
                "options": propertyOptionsFill({
                    "grid_columns": 2,
                    "grid_break": true
                }),
                "$ref": "#/definitions/criticalToken"
            },
            "detail": {
                "title": "Détail",
                "type": "string",
                "default": "",
                "options": propertyOptionsFill({
                    "infoText": "Précision ou limitation de l'attaque",
                    "inputAttributes": {
                        "placeholder": "(Optionnel)"
                    },
                    "grid_columns": 12,
                    "grid_break": true
                }),
            },
        }
    },
    "damage": {
        "title": "Dégâts",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "damage"], 
        "properties": {
            "name": {
                "type": "string",
                "enum": ["damage"],
                "default": "damage",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "damage": {
                "options": propertyOptionsFill({
                    "grid_columns": 12
                }),
                "default": [
                    {"name":"damage",
                    "values":[{"name":"quantity","adjustment":"=","count":1}],
                    "dm":["Tranchant"]}
                ],
                "title": "Dégâts",
                "type": "array",
                "format": "tabs",
                "items": {
                    "$ref": "#/definitions/damageToken"
                }
            }
        }
    },
    // Tokens
    "valuesToken": {
        "options": propertyOptionsFill({}),
        "title": "Valeurs",
        "type": "array",
        //"description": "Valeurs",
        "format": "tabs-top",
        "default": {"name": "quantity", "adjustment": "=", "count": 1},
        "items": {
            "options": propertyOptionsFill({}),
            "headerTemplate": "{{i1}}",
            "title": "Valeur",
            "oneOf": [
                { "$ref": "#/definitions/quantityObjectToken"},
                { "$ref": "#/definitions/diceObjectToken"},
                { "$ref": "#/definitions/attributeObjectToken"},
                { "$ref": "#/definitions/modifierObjectToken"},
                { "$ref": "#/definitions/elementObjectToken"},
                { "$ref": "#/definitions/measureObjectToken"},
                { "$ref": "#/definitions/freeObjectToken"},
                { "$ref": "#/definitions/otherObjectToken"}
            ]
        }
    },
    "diceObjectToken": {
        "type": "object",
        "title": "Dés",
        "required": ["name", "adjustment", "count", "die"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["dice"],
                "default": "dice",
                "readonly": true,
                "options": {
                    "hidden": true
                },
            },
            "adjustment": {
                "$ref": "#/definitions/adjustmentToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 200
                }),
            },
            "count": {
                "$ref": "#/definitions/countToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 300
                }),
            },
            "die": {
                "$ref": "#/definitions/dieToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 400
                }),
            },
        }
    },
    "elementObjectToken": {
        "type": "object",
        "title": "Élément",
        "required": ["name", "adjustment", "count", "element"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["element"],
                "default": "element",
                "readonly": true,
                "options": {
                    "hidden": true
                },
            },
            "adjustment": {
                "$ref": "#/definitions/adjustmentToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 200
                }),
            },
            "count": {
                "$ref": "#/definitions/countToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 300
                }),
            },
            "element": {
                "$ref": "#/definitions/elementToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 200
                }),
            },
        }
    },
    "measureObjectToken": {
        "type": "object",
        "title": "Mesure",
        "required": ["name", "adjustment", "measure"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["measure"],
                "default": "measure",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "adjustment": {
                "$ref": "#/definitions/adjustmentToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 200
                }),
            },
            "measure": {
                "oneOf":[
                    {
                        "title": "Distance/Aire",
                        "$ref": "#/definitions/metricToken"
                    },
                    {
                        "title": "Durée",
                        "$ref": "#/definitions/timeToken"
                    },
                    {
                        "title": "Masse",
                        "$ref": "#/definitions/weightToken"

                    }
                ],
                "options": propertyOptionsFill({
                    "grid_columns": 8,
                    "propertyOrder": 300
                }),
            },
        }
    },
    "freeObjectToken": {
        "type": "object",
        "title": "Valeur libre",
        "required": ["name", "adjustment", "value"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["free"],
                "default": "free",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "adjustment": {
                "$ref": "#/definitions/adjustmentToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 200
                }),
            },
            "value": {
                "type": "string",
                "options": propertyOptionsFill({
                    "grid_columns": 8,
                    "propertyOrder": 300
                }),
            },
        }
    },
    "modifierObjectToken": {
        "type": "object",
        "title": "Modificateur",
        "required": ["name", "adjustment", "modifier"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["modifier"],
                "default": "modifier",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "adjustment": {
                "$ref": "#/definitions/adjustmentToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 200
                }),
            },
            "modifier": {
                "$ref": "#/definitions/modifierToken",
                "options": propertyOptionsFill({
                    "grid_columns": 8,
                    "propertyOrder": 300
                }),
            },
        }
    },
    "attributeObjectToken": {
        "type": "object",
        "title": "Caractéristique",
        "required": ["name", "adjustment", "attribute"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["attribute"],
                "default": "attribute",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "adjustment": {
                "$ref": "#/definitions/adjustmentToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 200
                }),
            },
            "attribute": {
                "$ref": "#/definitions/attributeToken",
                "options": propertyOptionsFill({
                    "grid_columns": 8,
                    "propertyOrder": 300
                }),
            },
        }
    },
    "otherObjectToken": {
        "type": "object",
        "title": "Autres",
        "required": ["name", "adjustment", "other"],
        "properties": {
            "name": {
                "type": "string",
                "enum": ["other"],
                "default": "other",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "adjustment": {
                "$ref": "#/definitions/adjustmentToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "propertyOrder": 200
                }),
            },
            "other": {
                "$ref": "#/definitions/otherToken",
                "options": propertyOptionsFill({
                    "grid_columns": 8,
                    "propertyOrder": 300
                }),
            },
        }
    },
    "quantityObjectToken": {
        "type": "object",
        "title": "Quantité",
        "required": ["name", "adjustment", "count"],
        "format": "grid-strict",
        "properties": {
            "name": {
                "type": "string",
                "enum": ["quantity"],
                "default": "quantity",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "adjustment": {
                "$ref": "#/definitions/adjustmentToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                }),
            },
            "count": {
                "$ref": "#/definitions/countToken",
                "options": propertyOptionsFill({
                    "grid_columns": 8,
                }),
            }
        }
    },
    "countToken": {
        "Title": "Nombre",
        "type": "integer",
        "exclusiveMinimum": 0,
        "default": 1,
        "options": propertyOptionsFill({
            "infoText": "Une valeur numéraire",
        }),
    },
    "dieToken": {
        "title": "Dé",
        "type": "string",
        "enum": ["4", "6", "8", "10", "12", "20", "100"],
        "default": "20",
        "options": propertyOptionsFill({
            "infoText": "Le dé à utiliser",
        }),
    },
    "adjustmentToken": {
        "title": "Mod",
        "type": "string",
        "enum": ["+", "-", "/", "x", "=", "<", ">", "≥", "≤"],
        "default": "=",
        "options": propertyOptionsFill({
            "infoText": "Permet de définir les bonus (+), les malus (-), multiplicateurs (x) et diviseur (/) pour préciser le type de la valeur",
            "grid_columns": 2
        }),
    },
    "attributeToken": {
        "title": "Caractéristique",
        "type": "string",
        "enum": ["FOR", "DEX", "CON", "INT", "SAG", "CHA", "JUTSU"],
        "default": "FOR",
        "options": propertyOptionsFill({
            "infoText": "Abréviation de la caractéristique",
        })
    },
    "stateToken": {
        "title": "État",
        "type": "string",
        "enum": ["Aveuglé", "Affaibli", "Étourdi", "Immobilisé", "Paralysé", "Ralenti", "Renversé", "Surpris", "Immunisé"],
        "default": "Aveuglé",
        "options": propertyOptionsFill({
            "infoText": "État préjudiciable",
        })
    },
    "modifierToken": {
        "title": "Modificateur",
        "type": "string",
        "enum": ["[FOR]", "[DEX]", "[CON]", "[INT]", "[SAG]", "[CHA]", "[JUTSU]"],
        "default": "[FOR]",
        "options": propertyOptionsFill({
            "infoText": "Modificateur de caractéristique",
        })
    },
    "elementToken": {
        "title": "Element",
        "type": "string",
        "enum": ["Feu", "Eau", "Vent", "Terre", "Froid", "Foudre", "Acide", "Poison", "Mana", "Chakra"],
        "default": "Chakra",
        "options": propertyOptionsFill({
            "infoText": "Modificateur de caractéristique",
        })
    },
    "otherToken": {
        "title": "Autre",
        "type": "string",
        "enum": ["niveau", "rang", "PJ", "échec", "succès", ",", ":"],
        "options": propertyOptionsFill({
            "enum_titles": ["Niveau", "Rang dans la voie", "Personnage-Joueur", "Échec", "Succès"],
            "infoText": "Autre type de référence permettant de définir la valeur de la propriété",
            "grid_columns": 4
        }),
        "default": "rang"
    },
    // Measure
    "rangeToken": {
        "title": "Distance",
        "type": "object",
        "format": "grid-strict",
        "required": [ "measure", "values", "unit"],
        "properties": {
            "measure": {
                "type": "string",
                "enum": ["range"],
                "default": "range",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "values": {
                "$ref": "#/definitions/valuesToken",
                "options": propertyOptionsFill({
                    "grid_columns": 10
                }),
            },
            "unit": {
                "$ref": "#/definitions/metricToken",
                "options": {
                    "grid_columns": 2
                }
            }
        }
    },
    "areaToken": {
        "title": "Zone d'effet",
        "type": "object",
        "format": "grid-strict",
        "required": [ "measure", "values", "unit"], 
        "properties": {
            "measure": {
                "type": "string",
                "enum": ["area"],
                "default": "area",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "values": {
                "$ref": "#/definitions/valuesToken",
                "options": propertyOptionsFill({
                    "grid_columns": 10
                }),
            },
            "unit": {
                "$ref": "#/definitions/metricToken",
                "options": propertyOptionsFill({
                    "grid_columns": 2,
                    "infoText": "Unité de distance",
                })
            }
        }
    },
    "durationToken": {
        "title": "Durée de l'effet",
        "type": "object",
        "format": "grid-strict",
        "required": [ "measure", "values", "unit"], 
        "properties": {
            "measure": {
                "type": "string",
                "enum": ["duration"],
                "default": "duration",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "values": {
                "$ref": "#/definitions/valuesToken",
                "options": propertyOptionsFill({
                    "grid_columns": 10
                }),
            },
            "unit": {
                "$ref": "#/definitions/timeToken",
                "options": propertyOptionsFill({
                    "grid_columns": 2,
                    "infoText": "Unité du rayon de l'aire circulaire de la zone d'effet",
                })
            }
        }
    },
    "containerToken": {
        "title": "Contenance de l'objet",
        "type": "object",
        "format": "grid-strict",
        "required": [ "measure", "values", "unit"], 
        "properties": {
            "measure": {
                "type": "string",
                "enum": ["capacity"],
                "default": "capacity",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "values": {
                "$ref": "#/definitions/valuesToken",
                "options": propertyOptionsFill({
                    "grid_columns": 10,
                }),
            },
            "unit": {
                "$ref": "#/definitions/capacityToken",
                "options": propertyOptionsFill({
                    "grid_columns": 2,
                    "infoText": "Unité du contenant",
                })
            }
        }
    },
    "weighedToken": {
        "title": "Poids",
        "type": "object",
        "format": "grid-strict",
        "required": [ "measure", "values", "unit"], 

        "properties": {
            "measure": {
                "type": "string",
                "enum": ["weight"],
                "default": "weight",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "values": {
                "$ref": "#/definitions/valuesToken",
                "options": propertyOptionsFill({
                    "grid_columns": 10
                }),
            },
            "unit": {
                "$ref": "#/definitions/weightToken",
                "options": propertyOptionsFill({
                    "grid_columns": 2,
                    "infoText": "Unité de temps",
                })
            }
        }
    },
    "criticalToken": {
        "options": propertyOptionsFill({}),
        "title": "Plage de critique",
        "type": "array",
        "format": "checkbox",
        "uniqueItems": true,
        "default": [20],
        "example": [20],
        "items": {
            "type": "integer",
            "default": 20,
            "enum": [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
            "options": propertyOptionsFill({
                "grid_columns": 2,
                "infoText": "Nombres sur lesquels un critique survient",
            })
        },
    },
    "metricToken": {
        "title": "Unité",
        "type": "string",
        "enum": ["m", "cm", "mm", "Km"],
        "default": "m"
    },
    "capacityToken": {
        "title": "Unité",
        "type": "string",
        "enum": ["L", "cL", "mL"],
        "default": "L"
    },
    "timeToken": {
        "title": "Unité",
        "type": "string",
        "enum": ["tr", "s", "min", "h", "j", "Combat", "Scénario", "Campagne"],
        "default": "tr"
    },
    "weightToken": {
        "title": "Unité",
        "type": "string",
        "enum": ["Kg", "g", "t"],
        "default": "Kg"
    },
    "currencyToken": {
        "title": "Unité",
        "type": "string",
        "enum": ["Ryô"],
        "default": "Ryô"
    },
    // Damage
    "damageToken": {
        "title": "Dégâts",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "values", "dm"], 
        "options": propertyOptionsFill({}),
        "properties": {
            "name": {
                "type": "string",
                "enum": ["damage"],
                "default": "damage",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "values": {
                "$ref": "#/definitions/valuesToken",
                "options": propertyOptionsFill({
                    "grid_columns": 8
                }),
            },
            "dm": {
                "$ref": "#/definitions/dmToken",
                "options": propertyOptionsFill({
                    "grid_columns": 4
                })
            }
        }
    },
    // Attack
    "attackToken": {
        "title": "Attaque",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "attack", "values"], 
        "options": propertyOptionsFill({}),
        "default": {
            "name":"attack",
            "attack":"Contact",
            "values": [{
                "name":"quantity",
                "adjustment":"=","count":0
            }]
        },
        "properties": {
            "name": {
                "type": "string",
                "enum": ["attack"],
                "default": "attack",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "attack":{
                "type": "string",
                "title": "Type d'attaque",
                "enum": ["Contact", "Distance", "Magique", "Jutsu"],
                "default": "Contact",
                "options": propertyOptionsFill({
                    "grid_columns": 4,
                    "infoText": "Type d'attaque",
                })

            },
            "values": {
                "title": "Modificateur d'attaque",
                "default": [],
                "$ref": "#/definitions/valuesToken",
                "options": propertyOptionsFill({
                    "grid_columns": 8
                }),
            },
        }
    },
    // Damage
    "dmToken": {
        "title": "Nature",
        "type": "object",
        "format": "grid-strict",
        "required": [ "name", "dm"], 
        "options": propertyOptionsFill({}),
        "properties": {
            "name": {
                "type": "string",
                "enum": ["dm"],
                "default": "dm",
                "readonly": true,
                "options": propertyOptionsFill({
                    "hidden": true
                }),
            },
            "dm": {
                "options": propertyOptionsFill({}),
                "title": "Nature",
                "type": "array",
                "format": "checkbox",
                "uniqueItems": true,
                "items": {
                    "type": "string",
                    "enum": ["Tranchant", "Perforant", "Contondant", "Magique", "Feu", "Froid", "Foudre", "Acide", "Poison", "Mentaux", "Chakra"],
                    "default": "Tranchant",
                    "options": propertyOptionsFill({
                        "grid_columns": 4,
                        "infoText": "Nature des dégâts",
                    })
                }
            }
        }
    },
    // Actions 
    "actionFORToken": {
        "title": "Action (FOR)",
        "type": "string",
        "enum": ["Bras de fer", "Soulever", "Tordre", "Lancer", "Immobiliser"],
        "default": "Soulever",
        "options": propertyOptionsFill({
            "infoText": "Action basée sur la force",
            "enum_titles": ["Bras de fer", "Soulever", "Tordre", "Lancer (objet lourd)", "Immobiliser (adversaire)"],
        })
    },
    "actionDEXToken": {
        "title": "Action (DEX)",
        "type": "string",
        "enum": ["Acrobatie", "Équilibre", "Grimper", "Sauter", "Sprinter", "Discrétion", "Chaparder", "Esquive"],
        "default": "Discétion",
        "options": propertyOptionsFill({
            "infoText": "Action basée sur la dextérité",
        })
    },
    "actionCONToken": {
        "title": "Action (CON)",
        "type": "string",
        "enum": ["Endurance", "Encaisser", "Survie"],
        "default": "Survie",
        "options": propertyOptionsFill({
            "infoText": "Action basée sur la constitution",
        })
    },
    "actionINTToken": {
        "title": "Action (INT)",
        "type": "string",
        "enum": ["Raisoner", "Savoir", "Information", "Mémoire", "Chercher"],
        "default": "Savoir",
        "options": propertyOptionsFill({
            "infoText": "Action basée sur l'intelligence",
            "enum_titles": ["Raisoner", "Savoir", "Information (dans un livre)", "Mémoire", "Chercher"]
        })
    },
    "actionSAGToken": {
        "title": "Action (SAG)",
        "type": "string",
        "enum": [
            "Volonté", "Intuition", "Perception", "Observer", "Entendre", "Détecter", "Vision", 
            "Repérer", "Pister", "Suivre des traces", "Deviner", "Sensation", "Éviter d'être surpris"
        ],
        "default": "Perception",
        "options": propertyOptionsFill({
            "infoText": "Action basée sur la sagesse",
        })
    },
    "actionCHAToken": {
        "title": "Action (CHA)",
        "type": "string",
        "enum": [
            "Persuader", "Commander", "Baratiner", "Bluffer", "Mentir", "Négocier", 
            "Séduire", "Intimider", "Convaincre", "Marchander"
        ],
        "default": "Négocier",
        "options": propertyOptionsFill({
            "infoText": "Action basée sur le charisme",
        })
    },
    "actionOtherToken": {
        "title": "Action (autres)",
        "type": "string",
        "enum": [
            "Difficulté", "Utilisation", "Maintenir", "Attaque", "Déclencher", "Attaque sournoise", "Defense", "Taille", 
            "Quantité", "Se relever", "Soigne", "Méditer", "Absorbe", "Déplacement", "Contourner", "Cible", 
            "Portée", "Coût", "Protéger", "Indisponible", "Équiper/Ranger", "Reculer", "Déplier",
        ],
        "default": "Difficulté",
        "options": propertyOptionsFill({
            "infoText": "Autres types d'action",
        })
    },
};