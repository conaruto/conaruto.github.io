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
            "enum": ["profil"]
        },
        "name": {
            "type": "string",
            "description": "Nom du profil",
            "example": "Nouveau profil",
            "minLength": 1
        },
        "full-description": {
            "type": "string",
            "description": "Description du profil",
            "example": "Mon profil regroupe toutes les voies qui permettent à un ninja d'avoir des pouvoirs géniaux.",
            "minLength": 1
        }
    },
    "required": [ "otype", "name", "full-description"]
}