var eventBus = new Vue({});

var saveDataToSession = function(key, value) {
    //console.log("Save to session : "+key+ "("+JSON.stringify(value)+")");
    sessionStorage.setItem(key,JSON.stringify(value));    
};

var loadDataFromSession = function(defaults, key) {
    var storedValue = JSON.parse(sessionStorage.getItem(key));
    //console.log("Loading '"+JSON.stringify(storedValue)+"' from session");
    var value = null;
    if (storedValue) {
        value = storedValue;
        //console.log("Load ["+key+"] from session");
    } else {
        //console.log("Load ["+key+"] from session (defaults)");
        value = defaults[key];
    }
    //console.log("Load ["+key+"] from session : "+JSON.stringify(value));
    //console.log("Load ["+key+"] from session");
    return(value);
};

var clearDataSession = function(keys) {
    keys.map( k => {
        sessionStorage.removeItem(k);
    });
}

var getCurrentMenu = function() {
    var locationRegex = new RegExp('^/(?:(?<category>[^-]+)-)?(?<name>.+).html$');
    l = window.location.pathname;
    //console.log("Path : '" + l + "' (" + locationRegex + ")");
    m = locationRegex.exec(l);
    //console.log("Match : "+ m + " ("+JSON.stringify(m.group)+")");
    menuCategory = m.groups.category == undefined ? "default" : m.groups.category;
    menuName = m.groups.name;
    return(loadDataFromSession(coHeadersConfig, 'menus').find(m => ((m.category == menuCategory) && ( m.name == menuName))));
}

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

var clone = function(o) {
    return(JSON.parse(JSON.stringify(o)));
};

Array.prototype.default=function() {
    return(this[0]);
};

Array.prototype.contains = function(item) {
    return(this.find(elt => isEqual(elt, item)) != undefined);
}

Array.prototype.unique = function() {
    return this.filter(function (value, index, self) { 
        return self.indexOf(value) === index;
    });
};

Array.prototype.getByID = function(id) {
    if (this != undefined) {
        return(this.find(i=>i.id == id));
    } else {
        return({});
    }
}

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
        case "thing":
            if ('cid' in item) {
                //console.log([item.otype, item.name].join('#') + item.cid);
                return([item.otype, item.name].join('#') + '#' + item.cid);
            } else {
                return([item.otype, item.name].join('#'));
                
            }
    default:
// console.log("Unable to minify item '"+JSON.stringify(item)+"'");
        return("#-1###NO##OID####");
    };
}

var objHash = function(obj) {
    return(sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(JSON.stringify(obj))));
}
var oid = function(item) {
    //console.log("oid()="+sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(JSON.stringify(item))));
    return(sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(minify(item))));
};

var isEqual = function(a, b) {
    //console.log("isEqual("+oid(a)+" == "+oid(b)+")="+(oid(a) == oid(b)));
    return(oid(a) == oid(b));
}

var propertyOptionsFill = function(options) {
    po = Object.assign({}, options, jsonEditorPropertyOptions);
    return(po);
};

var itemCompare = function(a, b) {
    var aFullName = getOption(a).name;
    var bFullName = getOption(b).name;
    return aFullName.localeCompare(bFullName, 'fr');
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
    //console.log("Example oid:" + oid(examples));
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
        case "thing":     
            return(getExamples(schemas).concat(items).getItemsByType("thing").map(i => {return getOption(i);}));
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
        case "thing":
            return(getExamples(schemas).concat(items).getItemsByType("thing").find(o => oid(o) == selected));
        default:
// console.log("Error");
    };
};

Array.prototype.toRangeSet = function() {
    var criticalSet = [...this];
    criticalSet.sort(function(a, b) {return a - b;});
    //console.log("toRangeSet("+JSON.stringify(criticalSet)+")");
    var rset = [];
    if (criticalSet.length > 0) {
        previous = criticalSet.shift();
        var currentRange = [previous];     
        criticalSet.map( i => {
            //console.log("Current range ("+currentRange.length+") = "+JSON.stringify(currentRange));
            if (i == (previous + 1)) {
                currentRange.push(i);
                previous = i;
            } else {
                if (currentRange.length > 1) {
                    rmin = currentRange.shift();
                    rmax = currentRange.pop();
                    rset.push(rmin + "-" + rmax);
                } else {
                    rset.push(currentRange.shift());
                }
                currentRange = [i];
                previous = i;
            }
        })
        //console.log("Current range ("+currentRange.length+") = "+JSON.stringify(currentRange));
        if (currentRange.length > 1) {
            rmin = currentRange.shift();
            rmax = currentRange.pop();
            rset.push(rmin + "-" + rmax);
        } else {
            rset.push(currentRange.shift());
        }
    }
    //console.log("toRangeSet("+JSON.stringify(criticalSet)+")="+"[" + rset.join(",") + "]");
    return "[" + rset.join(",") + "]";
}

var fromIndex = function(index, limit) {
    var table = [...Array(limit).keys()].map(x => x+1);
    rowIndex = Math.floor(index/6);
    columnIndex = index%6;
    //console.log("fromIndex ["+index+"] = ("+table[rowIndex]+","+table[columnIndex]+")");
    return [table[rowIndex], table[columnIndex]];
};

var toIndex = function(rowIndex, columnIndex, limit) {
    var table = [...Array(limit).keys()].map(x => x+1);
    realRow = table.indexOf(rowIndex);
    realColumn = table.indexOf(columnIndex);
    realIndex = (realRow * 6) + realColumn;
    //console.log("  toIndex ["+realIndex+"] = ("+rowIndex+","+columnIndex+")");
    return realIndex;
};

var updateIconifiedPropertyTokens = function(refs, limit, extraIcon, extraQuantity) {
    index = 0;
    Object.keys(refs).map(r => {
        span = 1;
        ip = document.getElementById(r);
        p = document.getElementById(r+'-propertyToken');
        if (( ip != null ) && ( p != null )){
            wp = p.parentElement.parentElement.getBoundingClientRect().width;
            //console.log("parent :" +wp);
            w = p.getBoundingClientRect().width;
            var [rowIndex, columnIndex] = fromIndex(index, limit);
            //console.log("["+r+"] Width : " + w);
            if (w < (wp / 6.0)+1) {
                //console.log("["+r+"] Keep width (" + w +")  => span = 1");
                ip.className = "iconifiedPropertyTokens smallIconifiedPropertyTokens";
            } else {
                if (w < (wp / 3.0)+1) {
                    ip.className = "iconifiedPropertyTokens bigIconifiedPropertyTokens";
                    span = 2;
                    //console.log("["+r+"] New width (" + w +") => span = 2");
                } else {
                    //console.log("["+r+"] New width (" + w +") => span = 3");
                    ip.className = "iconifiedPropertyTokens veryBigIconifiedPropertyTokens";
                    if (!(extraIcon)) {
                        //this.grid[r].span = 3;
                        span = 3;
                    } else {
                        span = 2;
                    }
                }
            }
            
            if ((columnIndex > 1) && ((columnIndex + span) > (limit + 1))) {
                // Next row append
                rowIndex += 1;
                columnIndex = 1;
                index = toIndex(rowIndex, columnIndex, limit);
            }
            if (extraIcon) {
                if ((columnIndex > 1) && ((columnIndex + span) > 3) && ((columnIndex + span) < 5) ) {
                    // Next row append
                    columnIndex = 5;
                    index = toIndex(rowIndex, columnIndex, limit);
                }
            }
            if (extraQuantity) {
                if ((columnIndex > 1) && ((columnIndex + span) > 4)) {
                    // Next row append
                    rowIndex += 1;
                    columnIndex = 1;
                    index = toIndex(rowIndex, columnIndex, limit);
                }
            }
            if ((columnIndex + span) > (limit+1)) {
                console.error("Unable to display succesfully this iconified property (too long) ["+r+"]")
                console.error(JSON.stringify(this.properties));
            }
            if (extraIcon) {
                if ((columnIndex < 3) && ((columnIndex + span) > 4)) {
                    console.error("Unable to display succesfully this iconified property (too long) ["+r+"]")
                    console.error(JSON.stringify(this.properties));
                } 
            }
            console.log("updateIconifiedPropertyTokens("+r+", "+limit+", "+extraIcon+", "+extraQuantity+") = [r="+rowIndex+", c="+columnIndex+", s="+span+"]");
            ip.style['grid-row-start'] = rowIndex;
            ip.style['grid-column-start'] = columnIndex;
            ip.style['grid-column-end'] = "span " + span;
            index += span;
            if (extraIcon) {
                if (((columnIndex + span) > 2) && ((columnIndex + span) < 5)) {
                    columnIndex = 5;
                    index = toIndex(rowIndex, columnIndex, limit);
                }
            }   
        }
    }); 
};

var itemStringify = function(obj, padding="")  {
    var jsonData = padding + "{\n";
    var jsonPropertyArray = [];
    for (const [ k, v ] of Object.entries(obj)) {
        if (k == 'properties') {
            var pArray = [];
            var allProperties = padding+'  "'+k+'": [\n';
            pArray = [];
            v.map(p => {
                pArray.push(padding+'    '+JSON.stringify(p));
            });
            allProperties = allProperties + pArray.join(",\n") + '\n' + padding + '  ]';
            jsonPropertyArray.push(allProperties);
        } else {
            jsonPropertyArray.push(padding+'  "'+k+'": '+JSON.stringify(v));
        }
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

var characterStringify = function(character)  {
    var jsonData = "{\n\t\"characterId\": \""+character.characterId+"\",\n\t\"attributes\": [\n";
    var jsonItemArray = [];
    character.attributes.map( obj => {
        jsonItemArray.push("\t\t" + JSON.stringify(obj));
    });
    jsonData += jsonItemArray.join(",\n")+"\n\t]\n}";
// console.log(jsonData);
    return(jsonData);
};


var getUIConfigKey = function(cfgSection, cfgName, obj, key, ptype) {
   //console.log("getUIConfigKey("+cfgSection+","+cfgName+","+JSON.stringify(obj)+","+key+","+ptype+")")
    cfg = coUIConfig[cfgSection][cfgName];
    realKey = key;
    if (obj != undefined) {
        if ('name' in obj) {
            // If key is undefined we set it to object name
            if (realKey == undefined) {
                if (obj.name in obj) {
                    realKey = obj[obj.name];
                   //console.log("=> No key is defined, using attribute name value '"+realKey+"' as key");
                }
            }
            if (realKey != undefined) {
                
                // if object has an attribute named as realkey
                if ((realKey in obj) && 
                    (obj.name in coUIConfig[cfgSection][cfgName])) {
                       //console.log("=> Found key ["+obj.name+"]["+realKey+"] in config ("+obj[realKey]+","+ptype+")");
                    if (realKey in coUIConfig[cfgSection][cfgName][obj.name]) {
                        r = coUIConfig[cfgSection][cfgName][obj.name][realKey](obj[realKey], ptype);
                       //console.log("=> Looking in key config["+obj.name+"]["+realKey+"]("+obj[realKey]+","+ptype+")="+r);
                        return(r);
                    } else {
                        if ("*" in coUIConfig[cfgSection][cfgName][obj.name]) {
                            r = coUIConfig[cfgSection][cfgName][obj.name]["*"](obj[realKey], ptype);
                           //console.log("=> Looking in key config["+obj.name+"][*]("+obj[realKey]+","+ptype+")="+r);
                            return(r);
                        }
                    }
                }
                // if object has an attribute named as object name
                if ((obj.name in obj) &&
                    (obj.name in coUIConfig[cfgSection][cfgName])) {
                        if (realKey in coUIConfig[cfgSection][cfgName][obj.name]) {
                            r = coUIConfig[cfgSection][cfgName][obj.name][realKey](obj[obj.name], ptype);
                           //console.log("=> Looking in name config["+obj.name+"]["+realKey+"]("+obj[obj.name]+","+ptype+")="+r);
                            return(r);
                        } else {
                            if ("*" in coUIConfig[cfgSection][cfgName][obj.name]) {
                                r = coUIConfig[cfgSection][cfgName][obj.name]["*"](obj[obj.name], ptype);
                               //console.log("=> Looking in name config["+obj.name+"][*]("+obj[obj.name]+","+ptype+")="+r);
                                return(r);
                            }
                        }
                }
                if ((cfgName == "labels") && (realKey in obj)){
                    r = obj[realKey];
                   //console.log("=> Looking obj key ["+realKey+"]="+r);
                    return(r);
                }
            }
            if (cfgName == "labels") {
                r = obj[obj.name];
               //console.log("=> Looking obj name ["+obj.name+"]="+r);
                return(r);
            }
        }
    }
    return(coUIConfig[cfgSection][cfgName].default);
};