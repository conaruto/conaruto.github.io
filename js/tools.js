

var clone = function(o) {
    return(JSON.parse(JSON.stringify(o)));
};

var propertyOptionsFill = function(options) {
    po = Object.assign({}, options, jsonEditorPropertyOptions);
    return(po);
};

// Retieves multiples json file from url array
var fetchDatas = (urls) => {
    const allRequests = urls.map(url =>
        fetch(url).then(response => response.json())
    );
    return(Promise.all(allRequests));
};

var fetchData = (url) => {
    const request = fetch(url).then(response => response.json());
    return(request);
};

var fetchMdData = (url) => {
    const request = fetch(url).then(response => response.text());
    return(request);
};

Array.prototype.getItemsByType = function(otype) {
    //console.log("getItemsByType("+otype+") = "+JSON.stringify(this.filter(i => (('otype' in i) && (i.otype == otype)))));
    return(this.filter(i => (('otype' in i) && (i.otype == otype))));
};

var minify = function(item) {
    switch(item.otype) {
        case "profil":
            return([item.otype, item.name].join('#'));
        case "way":      
            return([item.otype, item.name, item.profil].join('#'));
        case "capacity":     
            return([item.otype, item.rank, item.name, item.profil, item.way].join('#'));
        case "object":     
            return([item.otype, item.name].join('#'));
    default:
// console.log("Unable to minify item '"+JSON.stringify(item)+"'");
        return("#-1###NO##OID####")
        
    };
}

var oid = function(item) {
    //console.log("oid()="+sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(JSON.stringify(item))));
    return(sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(minify(item))));
};

var isEqual = function(a, b) {
    return(oid(a) == oid(b));
}

Array.prototype.contains = function(item) {
    return(this.find(elt => isEqual(elt, item)) != undefined);
}

Array.prototype.unique = function() {
    return this.filter(function (value, index, self) { 
        return self.indexOf(value) === index;
    });
};


var getOption = function(item) {
    var name = item.name;
    if ('way' in item) { 
        name =  item.way + " - " + item.rank + ". " + name;
    }
    if ('profil' in item) { 
        name =  item.profil + " - " + name;
    }
    //console.log("getOption() = "+JSON.stringify({"id":oid(item), "name": name}));
    return({"id":oid(item), "name": name});
};


var itemCompare = function(a, b) {
    var aFullName = getOption(a).name;
    var bFullName = getOption(b).name;
    return aFullName.localeCompare(bFullName, 'fr');
};

var getExamples = function(schemas) {
    var examples = [];
    Object.keys(schemas).map(s => {
        var example = {};
        for (const [ k, v ] of Object.entries(schemas[s].properties)) {
            //console.log("Key : "+k+", Example : "+ v['example']);
            example[k] = v['example'];
        }
        examples.push(example);
    });
    //console.log("getExamples("+JSON.stringify(Object.keys(schemas))+")" + JSON.stringify(examples));
    return(examples);
};

var examplesOids = function(schemas) {
    //console.log("examplesOids :" +  getExamples(schemas).map(s => oid(s)));
    return(getExamples(schemas).map(s => oid(s)));
};

var getOptions = function(items, picked, schemas) {
    //console.log("getOptions("+picked+")");
    switch(picked) {
        case "profil":
            return(getExamples(schemas).concat(items).getItemsByType("profil").map(i => {return getOption(i);}));
        case "way":      
            return(getExamples(schemas).concat(items).getItemsByType("way").map(i => {return getOption(i);}));
        case "capacity":     
            return(getExamples(schemas).concat(items).getItemsByType("capacity").map(i => {return getOption(i);}).sort());
        case "object":     
            return(getExamples(schemas).concat(items).getItemsByType("object").map(i => {return getOption(i);}));
    default:
// console.log("Error")
    };
};


var getItem = function(items, schemas, picked, selected) {
    //console.log("getItem('"+picked+"', '"+selected+"')");
    switch(picked) {
        case "profil":
            return(getExamples(schemas).concat(items).getItemsByType("profil").find(p => oid(p) == selected));
        case "way":
            return(getExamples(schemas).concat(items).getItemsByType("way").find(w => oid(w) == selected));
        case "capacity":
            return(getExamples(schemas).concat(items).getItemsByType("capacity").find(c => oid(c) == selected));
        case "object":
            return(getExamples(schemas).concat(items).getItemsByType("object").find(o => oid(o) == selected));
        default:
// console.log("Error");
    };
};

var saveDataToSession = function(key, value) {
    //console.log("Save to session : "+key);
    sessionStorage.setItem(key,JSON.stringify(value));    
};

var loadDataFromSession = function(defaults, key) {
    var storedValue = JSON.parse(sessionStorage.getItem(key));
    var value = null;
    if (storedValue) {
        value = storedValue;
    } else {
        value = defaults[key];
    }
    //console.log("Load ["+key+"] from session : "+JSON.stringify(value));
    //console.log("Load ["+key+"] from session");
    return(value);
};

Array.prototype.default=function() {
    return(this[0]);
};

var itemStringify = function(obj, padding="")  {
    var jsonData = padding + "{\n";
    var jsonPropertyArray = [];
    for (const [ k, v ] of Object.entries(obj)) {
        jsonPropertyArray.push(padding+'  "'+k+'": '+JSON.stringify(v));
    }

    jsonData += jsonPropertyArray.join(",\n")+"\n"+padding+"}";
    return(jsonData);
};

var itemsStringify = function(objs)  {
    var jsonData = "[\n";
    var jsonItemArray = [];
    objs.map( obj => {
        jsonItemArray.push(itemStringify(obj,"  "));
    });
    jsonData += jsonItemArray.join(",\n")+"\n]";
// console.log(jsonData);
    return(jsonData);
};


var getUIConfigKey = function(cfgSection, cfgName, obj, key, ptype) {
//console.log("getUIConfigKey("+cfgSection+","+cfgName+","+JSON.stringify(obj)+","+key+","+ptype+")")
    cfg = coUIconfig[cfgSection][cfgName];
    realKey = key;
    if (obj != undefined) {
        if ('name' in obj) {
            // If key is undefined we set it to object name
            if (realKey == undefined) {
                if (obj.name in obj) {
                    realKey = obj[obj.name];
                    //console.log("No key is defined, using attribute name value '"+realKey+"' as key");
                }
            }
            if (realKey != undefined) {
                // if object has an attribute named as realkey
                if ((realKey in obj) && 
                    (obj.name in coUIconfig[cfgSection][cfgName])) { 
                    if (realKey in coUIconfig[cfgSection][cfgName][obj.name]) {
                        r = coUIconfig[cfgSection][cfgName][obj.name][realKey](obj[realKey], ptype);
//console.log("Looking in key config["+obj.name+"]["+realKey+"]("+obj[realKey]+","+ptype+")="+r);
                        return(r);
                    } else {
                        if ("*" in coUIconfig[cfgSection][cfgName][obj.name]) {
                            r = coUIconfig[cfgSection][cfgName][obj.name]["*"](obj[realKey], ptype);
//console.log("Looking in key config["+obj.name+"][*]("+obj[realKey]+","+ptype+")="+r);
                            return(r);
                        }
                    }
                }
                // if object has an attribute named as object name
                if ((obj.name in obj) &&
                    (obj.name in coUIconfig[cfgSection][cfgName])) {
                        if (realKey in coUIconfig[cfgSection][cfgName][obj.name]) {
                            r = coUIconfig[cfgSection][cfgName][obj.name][realKey](obj[obj.name], ptype);
//console.log("Looking in name config["+obj.name+"]["+realKey+"]("+obj[obj.name]+","+ptype+")="+r);
                            return(r);
                        } else {
                            if ("*" in coUIconfig[cfgSection][cfgName][obj.name]) {
                                r = coUIconfig[cfgSection][cfgName][obj.name]["*"](obj[obj.name], ptype);
//console.log("Looking in name config["+obj.name+"][*]("+obj[obj.name]+","+ptype+")="+r);
                                return(r);
                            }
                        }
                }
                if ((cfgName == "labels") && (realKey in obj)){
                    r = obj[realKey];
                    //console.log("Looking obj key ["+realKey+"]="+r);
                    return(r);
                }
            }
            if (cfgName == "labels") {
                r = obj[obj.name];
                //console.log("Looking obj name ["+obj.name+"]="+r);
                return(r);
            }
        }
    }
    return(coUIconfig[cfgSection][cfgName].default);
};