waySchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "schemas/way.schema.json",
    "title": "Schema d'une voie",
    "name": "way",
    "description": "Une voie dans un profil",
    "type": "object",
    "properties": {
        "otype": {
            "type": "string",
            "description": "Type de l'objet : way",
            "example": "way",
            "enum": ["way"]
        },
        "name": {
            "type": "string",
            "description": "Nom de la voie",
            "example": "Nouvelle voie",
            "minLength": 1
        },
        "profil": {
            "type": "string",
            "description": "Nom du profil de la voie",
            "example": "Techniques super balèzes",
            "minLength": 1
        },
        "full-description": {
            "type": "string",
            "description": "Description de la voie et de ses spécificités",
            "example": "Ma voie permet à un ninja de d'avoir un pouvoir génial. Elle octroie également, dès qu'au moins un rang est atteind, un bonus de +1 en génie par rang dans la voie.",
            "minLength": 1
        }, 
        "icon": {
            "type": "string",
            "description": "URL de l'icône de la voie",
            "example": "https://conaruto.github.io/images/ways/no-way.png",
            "minLength": 1
        }
    },
    "required": [ "otype", "name", "profil", "full-description", "icon"]
}