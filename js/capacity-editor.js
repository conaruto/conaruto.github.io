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

var editorCommon = new Vue({
    el: '#editor-common',
    data: {
        items: [],
        itemTypePicked: "profil",
        itemNameSelected: null,
        item: {},
        options: [],
        schemas: {},
        save: editorDefaults['save'],
        saveEnable: editorDefaults['save'],
        saveData: editorDefaults['saveData'],
        saveFileName: editorDefaults['saveFileName'],
        jsonEditor: null,
        imageUpdateSrc: "images/ui/update-item.png",
        imageAddSrc: "images/ui/add-item.png",
        imageRemoveSrc: "images/ui/remove-item.png",
    },
    components: {
        'way': way,
        'capacity': capacity,
        'editor-box': editorBox
    },
    watch: {
        item(newItem) {
            //console.log("Item [UP]:" +JSON.stringify(newItem));
            saveDataToSession("item",newItem);
        },
        items(newItems) {
            saveDataToSession("items",newItems);
            this.options = getOptions(newItems, this.itemTypePicked, this.schemas);
        },
        itemTypePicked(newItemTypePicked) {
            this.options = getOptions(this.items, this.itemTypePicked, this.schemas);
            if (this.item.otype != newItemTypePicked) {
                this.itemNameSelected = this.options.default().id;
            }
            //console.log("itemTypePicked("+newItemTypePicked+")");
            saveDataToSession("itemTypePicked",newItemTypePicked);
        },
        itemNameSelected(newItemNameSelected) {
            //console.log("itemNameSelected("+newItemNameSelected+")");
            newItem = getItem(this.items, this.schemas, this.itemTypePicked, newItemNameSelected);
            if (oid(newItem) != oid(this.item)) {
                this.item = newItem;
                //console.log("JSON editor 2("+this.jsonEditor+")");
                // Json editor update
                if (this.jsonEditor != null) {
                    this.jsonEditor.destroy();
                }
                const element = document.getElementById('editorBox');
    
                this.jsonEditor = new JSONEditor(element, 
                    Object.assign({}, {
                        startval: this.item,
                        schema: this.schemas[this.itemTypePicked]
                    }, jsonEditorConfig)
                    
                );
                var optionalCheckboxes = document.getElementsByClassName("json-editor-opt-in");
                if (optionalCheckboxes.length > 0) {
                    optionalCheckboxes.forEach(c => {
                        //console.log("Hack element : ["+c.id+"]" )
                        //console.log("Hack element : ["+JSON.stringify(c)+"]" );
                        c.checked = true;
                        c.click();
                    });
                }   
                this.jsonEditor.on('change',() => {
                    var jsonEditorErrors = this.jsonEditor.validate();
                    if (jsonEditorErrors.length) {
                        x=1;
                    } else {
                        this.item = this.jsonEditor.getValue();
                    }
                });
            }
            //console.log("itemNameSelected("+newItemNameSelected+")");
            saveDataToSession("itemNameSelected",newItemNameSelected);
        }
    },
    methods: {
        inItems: function(){
            //console.log("inItems() = "+this.items.map(item => oid(item)).includes(oid(this.item)));
            return(this.items.map(item => oid(item)).includes(oid(this.item)));
        },
        loadJson: function(files, event) {
            this.loadAlerts = [];
            if (!files.length) {
                console.log('Error while uploading file ...');
            } else {
                var reader = new FileReader();
                reader.readAsText(files[0]);
                reader.onload = e => { 
                    this.items.push(...JSON.parse(e.target.result));
                    this.options = getOptions(this.items, this.itemTypePicked, this.schemas);
                }
            }
        },
        saveJson: function() {
            source = encodeURIComponent(itemsStringify(this.items));
            download("data:application/json;utf8,"+source, "capacites.json");
        },
        saveText: function() {
            var text="";
            this.items.forEach( (item) => {
                title = item.name;
                if (item.limited) {
                    title = title + "\xa0(L)"
                }
                text += title+"\n";
                text += item['full-description']+"\n";
            });
            source = encodeURIComponent(text);
            download("data:application/txt;utf8,"+source, "capacites.txt");
        },
        reset: function() {
            console.log("reset");
            sessionStorage.clear();
            console.log(sessionStorage)
            this.items = editorDefaults.items;
            this.itemTypePicked = editorDefaults.itemTypePicked;
            this.options = getOptions(this.items, this.itemTypePicked, this.schemas);
            
            this.itemNameSelected = this.options.default().id;
            this.item = getItem(this.items, this.schemas, this.itemTypePicked, this.itemNameSelected);
            saveDataToSession('selectedMenu', 'editor');
            document.location.reload();
        },
        addToList: function() {
            //console.log("addToList("+this.item.otype+", "+this.item.name+")");
            if (examplesOids(this.schemas).includes(oid(this.item))) {
                console.log("Can't add example");
            } else {
                this.items = this.items.filter(o => oid(o) != oid(this.item));
                this.items.push(this.item);
                this.items.sort(itemCompare);
                this.itemNameSelected = oid(this.item);
            }
            //console.log(JSON.stringify(this.items));
        },
        
        removeFromList: function() {
            //console.log("removeFromList("+this.item.otype+", "+this.item.name+")");
            this.items = this.items.filter(o => oid(o) != oid(this.item));
            this.itemNameSelected = this.options.default().id;
        },
        imageUpdateListPress: function() {
            this.imageUpdateSrc = "images/ui/update-item-pressed.png"
        },
        imageUpdateListRelease: function() {
            this.imageUpdateSrc = "images/ui/update-item.png"
        },
        imageAddToListPress: function() {
            this.imageAddSrc = "images/ui/add-item-pressed.png"
        },
        imageAddToListRelease: function() {
            this.imageAddSrc = "images/ui/add-item.png"
        },
        imageRemoveFromListPress: function() {
            this.imageRemoveSrc = "images/ui/remove-item-pressed.png"
        },
        imageRemoveFromListRelease: function() {
            this.imageRemoveSrc = "images/ui/remove-item.png"
        }
    },
    mounted: function () {
        console.time("COFvN schema data loaded");
        this.schemas = {
            "profil" : profilSchema,
            "way": waySchema,
            "capacity": capacitySchema
        }
        //("Schemas : "+JSON.stringify(Object.keys(this.schemas)));
        console.timeEnd("COFvN schema data loaded");
        console.time("Initialization");
        this.items = loadDataFromSession(editorDefaults, "items");
        this.itemTypePicked = loadDataFromSession(editorDefaults, "itemTypePicked");
        this.options = getOptions(this.items, this.itemTypePicked, this.schemas);
        this.itemNameSelected = loadDataFromSession(editorDefaults, "itemNameSelected");
        //console.log("itemNameSelected("+this.itemNameSelected+")");
        console.timeEnd("Initialization");

        console.time("JSON Editor initialization");
        if (this.jsonEditor != null) {
            this.jsonEditor.destroy();
        }
        const element = document.getElementById('editorBox');

        this.jsonEditor = new JSONEditor(element, 
            Object.assign({}, {
                startval: this.item,
                schema: this.schemas[this.itemTypePicked]
            }, jsonEditorConfig)
            
        );
        var optionalCheckboxes = document.getElementsByClassName("json-editor-opt-in");
        if (optionalCheckboxes.length > 0) {
            optionalCheckboxes.forEach(c => {
                //console.log("Hack element : ["+c.id+"]" )
                //console.log("Hack element : ["+JSON.stringify(c)+"]" );
                c.checked = true;
                c.click();
            });
        }   

        this.jsonEditor.on('ready',() => {
            if (this.itemNameSelected == null) {
                this.itemNameSelected = examplesOids(this.schemas).default();
            }
            this.item = loadDataFromSession(editorDefaults, "item");
            console.log("item("+JSON.stringify(this.items)+")");
        });
        this.jsonEditor.on('change',() => {
            var jsonEditorErrors = this.jsonEditor.validate();
            if (jsonEditorErrors.length) {
                x=1;
                // jsonEditorErrors.map(e => {
                //     console.log("Validation error path : "+e.path);
                //     console.log("Validation error property : "+e.property);
                //     console.log("Validation error message : "+e.message);
                // });
            } else {
                this.item = this.jsonEditor.getValue();
            }
        });
        console.timeEnd("JSON Editor initialization");
        eventBus.$on('resetEvent', this.reset);
        eventBus.$on('loadJsonEvent', this.loadJson);
        eventBus.$on('saveJsonEvent', this.saveJson);
        eventBus.$on('saveTextEvent', this.saveText);
    }
});