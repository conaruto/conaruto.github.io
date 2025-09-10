profilSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "schemas/profil.schema.json",
    "title": "Schema d'un profil",
    "name": "profil",
    "description": "Un profil",
    "type": "object",
    "properties": {
        "otype": {
            "type": "string",
            "description": "Type de l'objet : profil",
            "example": "profil",
            "enum": ["profil"],
            "default": "profil",
            "options": {
                "hidden": true
            },
        },
        "name": {
            "title": "Nom du profil",
            "type": "string",
            "description": "Nom du profil",
            "example": "Nouveau profil",
            "minLength": 1,
            "options": {
                "infoText": "Nom du profil",
                "grid_columns": 12
            },
        },
        "full-description": {
            "title": "Description du profil",
            "format": "textarea",
            "type": "string",
            "description": "Description du profil",
            "example": "Mon profil regroupe toutes les voies qui permettent à un ninja d'avoir des pouvoirs géniaux.",
            "minLength": 1,
            "options": {
                "input_height": "200px",
                "infoText": "Description complète du profil",
                "grid_columns": 12
            },
        }
    },
    "required": [ "otype", "name", "full-description"]
}