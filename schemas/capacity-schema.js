capacitySchema = {
    
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "schemas/capacity.schema.json",
    "title": "Schema d'une capacité",
    "name": "capacity",
    "description": "Une capacité dans une voie dans un profil",
    "type": "object",
    "required": [ "otype", "name", "voname", "limited", "profil", "way", "rank", "full-description", "short-description", "mudras", "element", "jutsu", "properties"],
    "properties": {
        "otype": {
            "title": "Type",
            "type": "string",
            "description": "Type de l'objet",
            "default": "capacity",
            "example": "capacity",
            "readonly": true,
            "options": {
                "hidden": true
            },
            
        },
        "name": {
            "title": "Nom",
            "type": "string",
            "description": "Nom de la capacité",
            "example": "Nouvelle capacité",
            "minLength": 1,
            "options": {
                "infoText": "Nom de la capacité",
                "grid_columns": 4
            }
            
        },
        "voname": {
            "title": "Non original",
            "type": "string",
            "description": "Nom original de la capacité",
            "example": "Great capacity",
            "default": "Inconnu",
            "minLength": 1,
            "options": {
                "infoText": "Nom original de la capacité",
                "grid_columns": 3
            }
        },
        "limited": {
            "title": "Action limitée ?",
            "type": "boolean",
            "description": "Est-ce une action limitée ?",
            "example": false,
            "format": "checkbox",
            "options": {
                "infoText": "Est-ce une action limitée ?",
                "grid_columns": 3
            }   
        },
        "rank": {
            "title": "Rang",
            "description": "Rang de la capacité dans la voie",
            "example": 1,
            "type": "integer",
            "enum": [1, 2, 3, 4, 5],
            default: 1,
            "options": {
                "infoText": "Rang de la capacité dans la voie",
                "grid_columns": 2,
                "grid_break": true
            }
        },
        "profil": {
            "title": "Profil",
            "type": "string",
            "example": "Techniques super balèzes",
            "minLength": 1,
            "options": {
                "infoText": "Nom du profil de la voie",
                "grid_columns": 4
            }
        },
        "way": {
            "title": "Voie",
            "type": "string",
            "description": "Nom de la voie",
            "example": "Voie du super ninja",
            "minLength": 1,
            "options": {
                "infoText": "Nom de la voie de la capacité",
                "grid_columns": 3
            }
        },
        "jutsu": {
            "title": "Type de technique",
            "type": "string",
            "description": "Type de la technique",
            "example": "ninjutsu",
            "enum": ["Inconnu","Ninjutsu", "Genjutsu", "Taijutsu", "Jūken", "Fûinjutsu", "Juinjutsu", "Senjutsu", "Kekkei genkai", "Kekkai ninjutsu", "Dôjutsu", "Bunshinjutsu", "Renkei ninjutsu", "Hiden", "Jujutsu", "Kenjutsu", "Kinjutsu", "Iryô ninjutsu", "Tensei ninjutsu", "Kekkei môra", "Kekkei Tôta", "Jikûkan Ninjutsu", "Bukijutsu", "Chakura Kyûin jutsu", "Chakura nagashi",  "Shurikenjutsu", "Shurikenjutsu", "Nintaijutsu", "Secrète" ],
            "default": "Inconnu",
            "options": {
                "infoText": "Type de la technique",
                "grid_columns": 3
            }
        },
        "element": {
            "title": "Nature",
            "description": "Nature du chakra associé à la technique",
            "example": "Katon",
            "type": "string",
            "enum": ["Inconnu", "Katon", "Suiton", "Doton", "Raiton", "Fūton", "Hyōton", "Mokuton", "Deiton", "Yôton", "Ranton", "Futton", "Bakuton", "Shakuton", "Jiton", "Enton", "Taiton", "Shôton", "Meiton", "Kôton", "Jinton", "Inton", "Yôton","Inyôton"],
            "default": "Inconnu",
            "options": {
                "infoText": "Nature du chakra associé à la technique",
                "grid_break": true,
                "grid_columns": 2
            }
        },
        "full-description": {
            "title": "Description complète",
            "type": "string",
            "description": "Description complète et exhaustive de la capacité",
            "example": "Ma capacité super géniale fait 1d6 DM par rang dans la voie à toute personne se trouvant à moins de 10 mètres de l'utilisateur de cette capacité pendant 1+[mod. INT] tour.",
            "minLength": 1,
            "format": "textarea",
            "options": {
                "input_height": "200px",
                "infoText": "Description complète et exhaustive de la capacité",
                "grid_columns": 6
            },
        },
        "short-description": {
            "title": "Description courte",
            "type": "string",
            "description": "Description résumée de la capacité",
            "example": "Ma capacité super géniale fait des dégâts à toute personne se trouvant autour d'elle pendant un court laps de temps.",
            "minLength": 1,
            "format": "textarea",
            "options": {
                "input_height": "200px",
                "infoText": "Description résumée de la capacité",
                "grid_columns": 6
            },
        },
        
        "properties": {
            "title": "Propriétés spéciales",
            "type": "array",
            //"description": "Propriétés spéciales",
            "example": [],
            "default": [],
            "format": "tabs",
            "options": {
                "disable_collapse": true,
                "infoText": "Propriétés spéciales de la capacité",
                "grid_columns": 12,
                "grid_break": true
            },
            "items": {
                "options": {
                    "disable_properties": true,
                    "remove_button_labels": true,
                    "no_additional_properties": true,
                    "compact": true,
                    "use_default_values": true,
                    "disable_collapse": true,
                    "disable_edit_json": true,
                    "disable_array_delete_all_rows": true,
                    "disable_array_delete_last_row": true,
                    "enable_array_copy": true,
                    "array_controls_top": true,
                },
                "title": "Propriété spéciale",
                "headerTemplate": "{{i1}}",
                "oneOf": [
                    { "$ref": "#/definitions/attribute"},
                    { "$ref": "#/definitions/measure"},
                    { "$ref": "#/definitions/test"},
                    { "$ref": "#/definitions/action"},
                    { "$ref": "#/definitions/character"},
                    { "$ref": "#/definitions/fight"},
                    { "$ref": "#/definitions/defense"},
                    { "$ref": "#/definitions/damage"},
                    { "$ref": "#/definitions/creature"},
                    { "$ref": "#/definitions/state"},
                    { "$ref": "#/definitions/property"}
                ]
            },
        },
        "mudras": {
            "title": "Mudras",
            "type": "array",
            "description": "Liste des mudras utilisés pour réaliser la technique",
            "example": ["Buffle", "Cheval"],
            "items": {
                "title": "mudra",
                "type": "string",
                "enum": ["Buffle", "Cheval", "Chèvre", "Chien", "Coq", "Dragon", "Lièvre", "Multiclonage", "Rat", "Rupture", "Sanglier", "Serpent", "Singe", "Tigre", "Sang"]
            },
            default: [],
            "format": "table",
            "options": {
                "disable_collapse": true,
                "infoText": "Liste des mudras utilisés pour réaliser la technique",
                "grid_columns": 12,
                "grid_break": true
            }
        },   
    },
    "definitions": schemaDefinitions
};
