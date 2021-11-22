var coHeadersConfig = {
    "menus": [{
        "name": "capacity",
        "label": "Capacités",
        "link": "tables-capacity.html",
        "category": "tables",
        "selected": false,
        "reset": true,
    },
    {
         "name": "thing",
         "label": "Objets",
         "link": "tables-thing.html",
         "category": "tables",
         "selected": true,
         "reset": true,
    }, {
        "name": "capacity",
        "label": "Cartes (capacités)",
        "link": "cards-capacity.html",
        "category": "cards",
        "linked": "tables",
        "selected": false,
    }, {
        "name": "thing",
        "label": "Cartes (objets)",
        "link": "cards-thing.html",
        "category": "cards",
        "linked": "tables",
        "selected": true,
    }, {
        "name": "game",
        "label": "Personnage",
        "link": "resources-game.html",
        "category": "resources",
        "selected": true,
    }, {
        "name": "resources",
        "label": "Aides de jeu",
        "link": "resources-resources.html",
        "category": "resources",
        "selected": false,
    // }, {
    //     "name": "capacity-editor",
    //     "label": "Éditeur de capacités",
    //     "link": "resources-capacity-editor.html",
    //     "category": "resources",
    //     "selected": false,
    //     "reset": true,
    //  }, {
    //     "name": "thing-editor",
    //     "label": "Éditeur d'objets",
    //     "link": "resources-thing-editor.html",
    //     "category": "resources",
    //     "selected": false,
    //     "reset": true,
      }
    ],
    "icons": {
        "tables": {
            "capacity": [{ 
                "name": "reset",
                "label": "reset",
                "title": "Réinitialiser la page et vider le panier",
            }, { 
                "name": "fake",
                "label": "fakeIndentRight",
                "title": "Icone d'indentation des icones suivants à droite de la barre",
            }, { 
                "name": "cart",
                "label": "Panier",
                "title": "Afficher / Cacher le panier",
            }, { 
                "name": "help",
                "label": "Aide",
                "title": "Affiche l'aide",
            }],
            "thing": [{ 
                "name": "reset",
                "label": "reset",
                "title": "Réinitialiser la page et vider le panier",
            }, { 
                "name": "fake",
                "label": "fakeIndentRight",
                "title": "Icone d'indentation des icones suivants à droite de la barre",
            }, { 
                "name": "cart",
                "label": "Panier",
                "title": "Afficher / Cacher le panier",
            }, { 
                "name": "help",
                "label": "Aide",
                "title": "Affiche l'aide",
            }]
        },
        "cards": {
            "capacity": [{ 
                "name": "reset",
                "label": "reset",
                "title": "Réinitialiser la page",
            }, { 
                "name": "trash",
                "label": "Poubelle",
                "title": "Enlever la capacité de la feuille de capacité",
            }, { 
                "name": "fake",
                "label": "fakeIndentRight",
                "title": "Icone d'indentation des icones suivants à droite de la barre",
            },{ 
                "name": "help",
                "label": "Aide",
                "title": "Affiche l'aide",
            }],
            "thing": [{ 
                "name": "reset",
                "label": "reset",
                "title": "Réinitialiser la page",
            }, { 
                "name": "trash",
                "label": "Poubelle",
                "title": "Enlever l'objet de la feuille d'objets à imprimer",
            }, { 
                "name": "fake",
                "label": "fakeIndentRight",
                "title": "Icone d'indentation des icones suivants à droite de la barre",
            },{ 
                "name": "help",
                "label": "Aide",
                "title": "Affiche l'aide",
            }]
        },
        "resources": {
            "game": [{ 
                "name": "reset",
                "label": "reset",
                "title": "Réinitialiser la page",
            },{ 
                "name": "load-json",
                "label": "Charger un fichier json",
                "title": "Charger un fichier de personnage au format json",
            },{ 
                "name": "fake",
                "label": "fakeIndentRight",
                "title": "Icone d'indentation des icones suivants à droite de la barre",
            },{ 
                "name": "save-json",
                "label": "Sauvegarder un fichier json",
                "title": "Sauvegarder un personnage au format json",
            },{ 
                "name": "save-svg",
                "label": "Sauvegarder une image svg",
                "title": "Sauvegarder un personnage sous la forme d'une image au format svg",
            },{ 
                "name": "help",
                "label": "Aide",
                "title": "Affiche l'aide",
            }],"capacity-editor": [{ 
                "name": "reset",
                "label": "reset",
                "title": "Réinitialiser la page",
            },{ 
                "name": "load-json",
                "label": "Charger un fichier json",
                "title": "Charger un fichier de capacités au format json",
            },{ 
                "name": "fake",
                "label": "fakeIndentRight",
                "title": "Icone d'indentation des icones suivants à droite de la barre",
            },{ 
                "name": "save-json",
                "label": "Sauvegarder un fichier json",
                "title": "Sauvegarder les capacités au format json",
            },{ 
                "name": "help",
                "label": "Aide",
                "title": "Affiche l'aide",
            }],
            "thing-editor": [{ 
                "name": "reset",
                "label": "reset",
                "title": "Réinitialiser la page",
            },{ 
                "name": "load-json",
                "label": "Charger un fichier json",
                "title": "Charger un fichier d'objets au format json",
            },{ 
                "name": "fake",
                "label": "fakeIndentRight",
                "title": "Icone d'indentation des icones suivants à droite de la barre",
            },{ 
                "name": "save-json",
                "label": "Sauvegarder un fichier json",
                "title": "Sauvegarder les objets au format json",
            },{ 
                "name": "help",
                "label": "Aide",
                "title": "Affiche l'aide",
            }]
        },
    }
}