
var gameApp = {
    data: function() {
        return({
            image: undefined,
            width: 680,
            height: 800,
            xOrigin: 150.0,
            yOrigin: 100.0,
            attributes: [],
            items: coCharacterConfig.items,
            categoryId: "body",
            characterId: "boy",
            imageLink: undefined,
            jsonLink: undefined,
            loadAlerts: [],
            selectedElement: false,
            offset: {}
        });
    },
    computed: {
        character: function() {
            c = this.items.getByID(this.characterId);
            //console.log("Character : "+c.id +"("+c.label+")");
            return(c);
        },
        category: function() {
            return(this.character.items.getByID(this.categoryId));
        },
        label: function() {
            return(this.category.label);
        },
        noAlerts: function() {
            return(this.loadAlerts.length == 0);
        }
    },
    methods: {
        getLabel: function(categoryId) {
            return(this.character.items.getByID(categoryId).label);
        },
        previousCategory: function() {
            //console.log("Previous("+this.categoryId+","+this.category.numId+")");
            if (  this.category.numId > 0) {
                this.categoryId = this.character.items[this.category.numId-1].id;
            } else {
                this.categoryId = this.character.items[this.character.items.length-1].id;
            }
        },
        nextCategory: function() {
            //console.log("Next("+this.categoryId+","+this.category.numId+"<"+this.character.items.length+")");
            if (this.category.numId < this.character.items.length-1) {
                this.categoryId = this.character.items[this.category.numId+1].id;
                //console.log("Current("+this.categoryId+","+this.category.numId+"<"+this.character.items.length+")");
            } else {
                this.categoryId = this.character.items[0].id;
                //console.log("Current("+this.categoryId+","+this.category.numId+"<"+this.character.items.length+")");
            }
        },
        previousCharacter: function() {
            //console.log("Previous("+this.characterId+","+this.character.numId+")");
            if (  this.character.numId > 0) {
                this.characterId = this.items[this.character.numId-1].id;
                //console.log("Current("+this.characterId+","+this.character.numId+">0");
            } else {
                this.characterId = this.items[this.items.length-1].id;
                //console.log("Current("+this.characterId+","+this.character.numId+"=<0");
            }
            this.categoryId = "body";
            this.attributes = clone(coCharacterConfig.items.getByID(this.characterId).attributes);
            this.draw();

        },
        nextCharacter: function() {
            //console.log("Next("+this.characterId+","+this.character.numId+"<"+this.items.length+")");
            if (this.character.numId < this.items.length-1) {
                this.characterId = this.items[this.character.numId+1].id;
                //console.log("Current("+this.characterId+","+this.character.numId+"<"+this.items.length+")");
            } else {
                this.characterId = this.items[0].id;
                //console.log("Current("+this.characterId+","+this.character.numId+">="+this.items.length+")");
            }
            this.categoryId = "body";
            this.attributes = clone(coCharacterConfig.items.getByID(this.characterId).attributes);
            this.draw();
            
        },
        getSrc: function(categoryId, itemId) {
            //console.log("getSrc("+categoryIndex+","+itemId+")");
            src = "./images/game/"+this.character.id+"/"+categoryId+"/"+itemId+".svg";
            //console.log("getSrc("+this.character.id+", "+category+", "+id+") = "+src);
            return(src);
        },
        getx: function(categoryId, itemId) {
            categoryItem = this.character.items.getByID(categoryId);
            item = categoryItem.items.getByID(itemId);
            x = 0.0;
            if ('x' in item) {
                x = this.xOrigin + item.x;
            } else {
                x = this.xOrigin + categoryItem.x;
            }
            //console.log("getx("+this.character.id+", "+categoryId+", "+JSON.stringify(itemId)+") = "+x);
            return(x);
        },
        gety: function(categoryId, itemId) {
            categoryItem = this.character.items.getByID(categoryId);
            item = categoryItem.items.getByID(itemId);
            y = 0.0;
            if ('y' in item) {
                y = this.yOrigin + item.y;
            } else {
                y = this.yOrigin + categoryItem.y;
            }
            //console.log("gety("+this.character.id+", "+categoryId+", "+JSON.stringify(itemId)+") = "+y);
            return(y);
        },
        change: function(item) {
            // Update attributes
            //console.log("Change:"+item.id);
            if (item != undefined) {
                attributes = clone(this.attributes);
                attributes.map(a => {
                    if (a.categoryId == this.categoryId) {
                        a.itemId = item.id;
                    }
                    return(a);
                });
                this.attributes = attributes;
            }
            this.draw();
        },
        draw: function(){
            var jsonCharacterAttributes = this.attributes.map(x => {
                return({"categoryId": x.categoryId, "itemId": x.itemId});
            });
            var jsonCharacter = {
                "characterId": this.characterId,
                "attributes": jsonCharacterAttributes
            };
            console.log("Draw("+JSON.stringify(jsonCharacter)+")")
            var attributes = clone(this.attributes);
            var attributes = attributes.map( a => {
                src = this.getSrc(a.categoryId, a.itemId);
                a.p = fetch(src).then(
                        response => response.text()
                    ).then(data => {
                        a.svgData = data;
                    });
                a.svgId = a.categoryId+'-'+a.itemId;
                return(a);
            });
            _this = this;
            Promise.all(attributes.map(a => a.p)).then(function(){
                //console.log("attributes:"+JSON.stringify(attributes));
                _this.attributes = attributes;
            });    
        },
        
        saveSvg: function() {
            var serializer = new XMLSerializer();
            var source = serializer.serializeToString(this.image);
            source = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + encodeURIComponent(source);
            //console.log("Save Svg :" +source);
            eventBus.$emit('svgDataUriEvent', "data:image/svg+xml;utf8,"+source);
        },
        startDrag: (evt, index) => {
            //console.log("Drag : "+index);
            //console.log("Drag : "+index+"("+this.attributes[index].categoryId+")");
            evt.dataTransfer.dropEffect = 'move';
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('attributeIndex', index);
        },
        onDrop (evt, index) {
            attributes = clone(this.attributes);
            attributeIndex = evt.dataTransfer.getData('attributeIndex');
            //console.log("Drop : from "+attributeIndex+" to "+index);
            //console.log("Drop : "+index+"("+this.attributes[index].categoryId+")");
            evt.dataTransfer.dropEffect = 'move';
            attribute = attributes[index]
            attributes[index] = attributes[attributeIndex];
            attributes[attributeIndex] = attribute;
            this.attributes = attributes;
        },
        saveJson: function() {
            var jsonCharacterAttributes = this.attributes.map(x => {
                return({"categoryId": x.categoryId, "itemId": x.itemId});
            });
            var jsonCharacter = {
                "characterId": this.characterId,
                "attributes": jsonCharacterAttributes
            };
            source = encodeURIComponent(characterStringify(jsonCharacter));
            //console.log("Save Svg :" +source);
            eventBus.$emit('jsonDataUriEvent', "data:application/json;utf8,"+source);
        },
        loadJson: function(files) {
            this.loadAlerts = [];
            if (!files.length) {
                console.log('Error while uploading file ...');
            } else {
                var reader = new FileReader();
                reader.readAsText(files[0]);
                reader.onload = e => { 
                    var newCharacter = { 
                        "characterId": 'unknown', 
                        "attributes": []
                    };
                    var loadedJson = JSON.parse(e.target.result);
                    if (loadedJson != undefined) {
                        if (('characterId' in loadedJson) && 
                            ('attributes' in loadedJson) &&
                            ((typeof loadedJson.characterId === 'string' || loadedJson.characterId instanceof String)) &&
                            Array.isArray(loadedJson.attributes)) {
                            var loadedCharacter = this.items.getByID(loadedJson.characterId);
                            //console.log("loadedCharacter ID : "+loadedJson.characterId+"("+JSON.stringify(loadedCharacter)+")");
                            if (loadedCharacter != {}) {
                                newCharacter["characterId"] = loadedCharacter.id;
                                loadedCharacter.attributes.map( a => {
                                    x = loadedJson.attributes.find( y => 
                                            ('categoryId' in y) && 
                                            (y.categoryId == a.categoryId) && 
                                            ('itemId' in y) &&
                                            (loadedCharacter.items.getByID(y.categoryId).items.getByID(y.itemId) != {})
                                        )
                                    if (x != undefined) {
                                        var attribute = {"id": loadedJson.attributes.indexOf(x), "categoryId": x.categoryId, "itemId": x.itemId};
                                        //console.log("Adding attribute : "+ JSON.stringify(attribute));
                                        newCharacter["attributes"].push(attribute);
                                    } else {
                                        this.loadAlerts.push("L'attribut de personnage '"+a.categoryId+"' n'est pas définit ou n'est pas valide.");
                                    }
                                });
                            } else {
                                this.loadAlerts.push("Personnage avec un characterId incorrect.");
                            }
                        } else {
                            this.loadAlerts.push("Fichier personnage au mauvais format.");
                        }
                    } else {
                        this.loadAlerts.push("Fichier personnage n'est pas un json.");
                    }
                    //console.log("Data loaded(Alerts : "+JSON.stringify(this.loadAlerts)+")");
                    if (this.noAlerts) {
                        //console.log("New character : "+JSON.stringify(newCharacter));
                        this.characterId = newCharacter.characterId;
                        this.attributes = newCharacter.attributes.sort(function(a,b){return(a.id - b.id)}).map( a => {
                            return({"categoryId": a.categoryId, "itemId": a.itemId});
                        });
                        this.draw();
                    }
                };
                event.target.value = '';
            }
        },
        randomCharacter: function() {
            var attributes = [];
            //console.log("Random attributes : "+JSON.stringify(this.character.attributes.map(a => a.categoryId)));
            this.character.attributes.map(a => {
                categoryItems = this.character.items.getByID(a.categoryId).items;
                randomItemIndex = Math.floor(Math.random() * Math.floor(categoryItems.length));
                attributes.push({"categoryId": a.categoryId, "itemId": categoryItems[randomItemIndex].id});
                //console.log("Generating '"+a.categoryId+"' item index '"+randomItemIndex+"' : "+categoryItems[randomItemIndex].id);
            });
            this.attributes = attributes;
            this.draw();
        },
        getMousePosition: function(evt) {
            var CTM = this.image.getScreenCTM();
            return {
                x: (evt.clientX - CTM.e) / CTM.a,
                y: (evt.clientY - CTM.f) / CTM.d
            };
        },
        beginDrag: function(eltId, evt) {
            this.selectedElement = document.getElementById(eltId);
            this.offset = this.getMousePosition(evt);
            this.offset.x -= parseFloat(this.selectedElement.getAttributeNS(null, "x"));
            this.offset.y -= parseFloat(this.selectedElement.getAttributeNS(null, "y"));
            //console.log("Mousedown event on id ["+eltId+"]");
        },
        drag: function(eltId, evt) {
            if (this.selectedElement) {
                //console.log("Mousemouve event on id ["+eltId+"]");
                var coord = this.getMousePosition(evt);
                this.selectedElement.setAttributeNS(null, "x", coord.x - this.offset.x);
                this.selectedElement.setAttributeNS(null, "y", coord.y - this.offset.y);
            }
        },
        endDrag: function(eltId) {
            if (this.selectedElement) {
                x = parseFloat(this.selectedElement.getAttribute("x"))-this.xOrigin;
                y = parseFloat(this.selectedElement.getAttribute("y"))-this.yOrigin;
                console.log("Position for element '"+eltId+"', \"x\": " +x.toFixed(3)+ ", \"y\": "+y.toFixed(3));
                this.selectedElement = false;
                //console.log("Mouseup or mouseleave event on id ["+eltId+"]");
            }
        },
        reset: function() {
            console.log("reset");
            document.location.reload();
        },

    },
    mounted: function () {
        //coCharacterConfig.items.push(alice);
        //coCharacterConfig.items.push(thomas);
        
        this.attributes = coCharacterConfig.items.getByID(this.characterId).attributes;
        for (chaIndex=0; chaIndex < this.items.length; chaIndex++) {
            this.items[chaIndex].numId = chaIndex;
            for (catIndex=0; catIndex < this.items[chaIndex].items.length; catIndex++) {
                this.items[chaIndex].items[catIndex].numId = catIndex;             
            };
        };
        this.image = document.getElementById("characterImage");
        this.draw();
        //console.log("attributes:"+JSON.stringify(this.attributes));
        console.log('draw()');
        eventBus.$on('resetEvent', this.reset);
        eventBus.$on('saveSvgEvent', this.saveSvg);
        eventBus.$on('saveJsonEvent', this.saveJson);
        eventBus.$on('loadJsonEvent', this.loadJson);
    },
    template: 
        `<div class="gameApp">
            <div class="gameController">
                <div v-show="! noAlerts" class="loadAlerts">
                    <div class="loadAlert">Erreurs lors du chargement du fichier de personnage :</div>
                    <div v-for="alert in loadAlerts" class="loadAlert">&thinsp;&bull;&thinsp;{{alert}}</div>
                </div>
                <div class="characterMenu">
                    <div class="arrow" v-on:click="previousCharacter()">&#9664;</div>
                    <div class="characterLabel">{{character.label}}</div>
                    <div class="arrow" v-on:click="nextCharacter()">&#9654;</div>
                </div>
                <div class="categoryMenu">
                    <div class="arrow" v-on:click="previousCategory()">&#9664;</div>
                    <div class="categoryLabel">{{label}}</div>
                    <div class="arrow" v-on:click="nextCategory()">&#9654;</div>
                </div>
                <div class="itemPreview">
                    <div v-for="item in category.items" 
                        class="itemPreviewImageBox"
                        v-on:click=change(item)>
                        <img v-bind:src="getSrc(categoryId,item.id)" 
                            class="itemPreview"/>
                    </div>
                </div>
                <img class="randomCharacterIcon" v-on:click="randomCharacter()"
                        src="images/ui/random.png" 
                        alt="Personnage aléatoire" 
                        title="Personnage aléatoire"/>
                    </a>
            </div>
            <div class="itemZOrder">
                <label class="itemZOrder">Z</label>
                <div v-for="(a, index) in attributes" class="itemZOrderBox" 
                    v-on:drop="onDrop($event, index)" v-on:dragover.prevent v-on:dragenter.prevent>
                    <img v-bind:src="getSrc(a.categoryId,a.itemId)" class="itemZOrder" v-bind:title="getLabel(a.categoryId)"
                        draggable="true" v-on:dragstart="startDrag($event, index)" v-on:dragover.prevent v-on:dragenter.prevent />
                </div>
            </div>
            <div class="characterImage">
                <!--viewBox="0 0 960 1200"-->
                <svg id="characterImage"
                    v-bind:width="width" 
                    v-bind:height="height"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg">
                    <svg v-bind:id="a.svgId" v-for="a in attributes"  v-html="a.svgData" 
                         v-bind:x="getx(a.categoryId,a.itemId)" v-bind:y="gety(a.categoryId,a.itemId)"
                         draggable="true" v-on:mousedown="beginDrag(a.svgId,$event)" v-on:mousemove.prevent="drag(a.svgId,$event)"
                         v-on:mouseup="endDrag(a.svgId)" v-on:mouseleave="endDrag(a.svgId)"
                         ></svg>
                </svg>
            </div>
        </div>`
}
var game = new Vue({
    el: '#game',
    components: {
        "game-app": gameApp
    },
    
});