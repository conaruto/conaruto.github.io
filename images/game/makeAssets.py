

from xml.etree import ElementTree as ET
from pathlib import Path
from subprocess import run
from time import sleep
from pprint import pprint
swfFile = "Naruto_CC_4.swf"
FFDBinary = "/home/plic/Documents/dev/naruto-ressources/naruto_cc_4/ffdec_12.0.1/ffdec.sh"
FFDBinaryGeneralOptions = "-cli -format sprite:svg"
FFDExportOptions = "-export sprite"
FFDESelectOptions = "-selectid"
assetsRootPath = Path("/home/plic/Documents/dev/naruto-ressources/naruto_cc_4")
assetsXmlPath = Path("fla/Naruto_CC_4")
assetsSVGPath = Path("SVG")
assetsLogPath = Path("log")
assetsLibrayXmlPath = Path("LIBRARY")
assetsXmlFile = "DOMDocument.xml"

ns={'root': 'http://ns.adobe.com/xfl/2008/'}
tree = ET.parse(assetsRootPath.joinpath(assetsXmlPath,assetsXmlFile))

boys = ["body", "legs", "feet", "bottom", "under", "animal", 
        "forearms", "top", "Fsymbol", "nose", "mouth", "weapon",
        "eyes", "headband", "face", "hair", "extra"]
boysItems = []

girls = ["animal2", "body2", "legs2", "feet2", "pants2", "undershirt2", 
         "forearms2", "shirt2", "mouth2", "access2" "face2", "eyes2", 
         "headband2", "access2", "hair2", "nose2", "weapon2"]
girlsItems = []

labels = {"body": "Corps", "legs": "Jambes", "feet": "Pieds", "bottom": "Bas", "under": "Dessous", "animal": "Animal", 
          "forearms": "Avant bras", "top": "Haut", "Fsymbol": "Symboles", "nose": "Nez", "mouth": "Bouche", "weapon": "Armes",
          "eyes": "Yeux", "headband": "Bandeau", "face": "Visage", "hair": "Cheveux", "extra": "Extras", "shirt": "Haut", "undershirt": "Dessous", "pants": "Bas", "access": "Accessoires"}

excludedSymbolId = ["415"]

symbols = tree.findall("root:timelines//root:DOMSymbolInstance[@name]", ns)
for symbol in symbols:
    n = symbol.get("name")
    # if n in boys:
    #     originX = 205.95
    #     originY = 37.7
    #     items = []
    #     symbolID = symbol.get("libraryItemName").replace("Symbol ","")
    #     if symbolID not in excludedSymbolId and not [x for x in boysItems if x['id'] == n]:
    #         print(f"Extracting svg boys assets : {n}")
    #         exportPath = assetsRootPath.joinpath(assetsSVGPath,"boy",n)
    #         logFile = f"{assetsRootPath.joinpath(assetsLogPath,f'{n}-{symbolID}.log')}"
    #         exportCommand = f"{FFDBinary} {FFDBinaryGeneralOptions} {FFDESelectOptions} {symbolID} {FFDExportOptions} {exportPath} {assetsRootPath.joinpath(swfFile)}"
    #         print(f"Export command : {exportCommand}")
    #         # print(logFile)
    #         with open(logFile, 'w') as f:
    #             run(exportCommand,shell=True, check=True, text=True, stdout=f)
            
    #         # CleanUp
    #         # print(list(exportPath.joinpath(f"DefineSprite_{symbolID}").glob("*.svg")))
    #         for svgFile in sorted(exportPath.joinpath(f"DefineSprite_{symbolID}").glob("*.svg"),key=lambda f:int(f.name.replace(".svg",""))):
    #             svgFile.replace(exportPath.joinpath(svgFile.name.replace(".svg",".orig.svg")))
    #             items.append({"id": svgFile.name.replace(".svg","")})
            
    #         exportPath.joinpath(f"DefineSprite_{symbolID}").rmdir()

    #         # Rescale
    #         m = symbol.find("root:matrix/root:Matrix", ns)
    #         translateX = float(m.get("tx")) - originX if "tx" in m.attrib else 0.0 - originX
    #         translateY = float(m.get("ty")) - originY if "ty" in m.attrib else 0.0 - originY
    #         scaleX = float(m.get("a")) if "a" in m.attrib else 1.0  
    #         scaleY = float(m.get("d")) if "d" in m.attrib else 1.0

    #         rsvgBinary = "/usr/bin/rsvg-convert"
    #         rsvgGeneralOptions = "--keep-image-data -f svg"
    #         boyItems = {"id": n, "x": translateX, "y": translateY, "label": labels[n], "items": items}
    #         print(f"Boy : {boyItems}")

    #         for svgFile in sorted(exportPath.glob("*.orig.svg"),key=lambda f:int(f.name.replace(".orig.svg",""))):
    #             svgTree = ET.parse(svgFile)
    #             svgRoot = svgTree.getroot()
    #             width = int(float(svgRoot.get("width").replace("px","")) * scaleX)
    #             height = int(float(svgRoot.get("height").replace("px","")) * scaleY)
    #             outputSVGFile = exportPath.joinpath(svgFile.name.replace(".orig.svg",".svg"))
    #             resizeCommand = f"{rsvgBinary} {rsvgGeneralOptions} -w {width} -h {height} -o {outputSVGFile} {svgFile}"
    #             print(f"Resize command : {resizeCommand}")
    #             run(resizeCommand,shell=True, check=True)

    #             # add a transparent boundary box
    #             svgTree = ET.parse(outputSVGFile)
    #             svgRoot = svgTree.getroot()
    #             rectAttrib = {
    #                 'style': "opacity:0.0950426;fill:none;stroke:#000000;stroke-width:0;stroke-dasharray:none",
    #                 'id': "rect999999999",
    #                 'width': f"{width}",
    #                 'height': f"{height}",
    #                 'x': "0", 'y': "0"
    #             }
    #             rect = ET.Element("rect", attrib=rectAttrib)
    #             svgRoot.append(rect)
    #             outputSVGBBFile = exportPath.joinpath(svgFile.name.replace(".orig.svg",".bb.svg"))
    #             print(f"Add bb to boy '{n}' : {width} x {height}")
    #             svgTree.write(outputSVGBBFile)
    #         boysItems.append(boyItems)
            
    if n in girls:
        originX = 205.95
        originY = 37.7
        items = []
        symbolID = symbol.get("libraryItemName").replace("Symbol ","")
        if symbolID not in excludedSymbolId and not [x for x in girlsItems if x['id'] == n]:
            print(f"Extracting svg girls assets : {n}")
            exportPath = assetsRootPath.joinpath(assetsSVGPath,"girl",n.replace("2",""))
            logFile = f"{assetsRootPath.joinpath(assetsLogPath,f'{n}-{symbolID}.log')}"
            exportCommand = f"{FFDBinary} {FFDBinaryGeneralOptions} {FFDESelectOptions} {symbolID} {FFDExportOptions} {exportPath} {assetsRootPath.joinpath(swfFile)}"
            print(f"Export command : {exportCommand}")
            # print(logFile)
            with open(logFile, 'w') as f:
                run(exportCommand,shell=True, check=True, text=True, stdout=f)
            
            # CleanUp
            # print(list(exportPath.joinpath(f"DefineSprite_{symbolID}").glob("*.svg")))
            for svgFile in sorted(exportPath.joinpath(f"DefineSprite_{symbolID}").glob("*.svg"),key=lambda f:int(f.name.replace(".svg",""))):
                svgFile.replace(exportPath.joinpath(svgFile.name.replace(".svg",".orig.svg")))
                items.append({"id": svgFile.name.replace(".svg","")})
            
            exportPath.joinpath(f"DefineSprite_{symbolID}").rmdir()

            # Rescale
            m = symbol.find("root:matrix/root:Matrix", ns)
            translateX = float(m.get("tx")) - originX if "tx" in m.attrib else 0.0 - originX
            translateY = float(m.get("ty")) - originY if "ty" in m.attrib else 0.0 - originY
            scaleX = float(m.get("a")) if "a" in m.attrib else 1.0  
            scaleY = float(m.get("d")) if "d" in m.attrib else 1.0

            rsvgBinary = "/usr/bin/rsvg-convert"
            rsvgGeneralOptions = "--keep-image-data -f svg"
            girlItems = {"id": n.replace("2",""), "x": translateX, "y": translateY, "label": labels[n.replace("2","")], "items": items}
            print(f"girl : {girlItems}")

            for svgFile in sorted(exportPath.glob("*.orig.svg"),key=lambda f:int(f.name.replace(".orig.svg",""))):
                svgTree = ET.parse(svgFile)
                svgRoot = svgTree.getroot()
                width = int(float(svgRoot.get("width").replace("px","")) * scaleX)
                height = int(float(svgRoot.get("height").replace("px","")) * scaleY)
                outputSVGFile = exportPath.joinpath(svgFile.name.replace(".orig.svg",".svg"))
                resizeCommand = f"{rsvgBinary} {rsvgGeneralOptions} -w {width} -h {height} -o {outputSVGFile} {svgFile}"
                print(f"Resize command : {resizeCommand}")
                run(resizeCommand,shell=True, check=True)

                # add a transparent boundary box
                svgTree = ET.parse(outputSVGFile)
                svgRoot = svgTree.getroot()
                rectAttrib = {
                    'style': "opacity:0.0950426;fill:none;stroke:#000000;stroke-width:0;stroke-dasharray:none",
                    'id': "rect999999999",
                    'width': f"{width}",
                    'height': f"{height}",
                    'x': "0", 'y': "0"
                }
                rect = ET.Element("rect", attrib=rectAttrib)
                svgRoot.append(rect)
                outputSVGBBFile = exportPath.joinpath(svgFile.name.replace(".orig.svg",".bb.svg"))
                print(f"Add bb to girl '{n}' : {width} x {height}")
                svgTree.write(outputSVGBBFile)


            girlsItems.append(girlItems)
            
# pprint(boysItems)
# pprint([{"categoryId": i['id'], "itemId": i['items'][0]['id']} for i in boysItems])

pprint(girlsItems)
pprint([{"categoryId": i['id'], "itemId": i['items'][0]['id']} for i in girlsItems])