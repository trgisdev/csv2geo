const fs = require('fs');
const { parse } = require("csv-parse");
const { rejects } = require('assert');

const possibleLongitudeNames = [
    'lon',
    'long',
    'longitude',
    'Y',
    'boylam',
]

const possibleLatitudeNames = [
    'lat',
    'latitude',
    'X',
    'enlem'
]





class csv2geo {

    geojson = (csvFile,options) => new Promise((resolve,reject)=>{

        let csvArr      = []
        let geojson     =   {
                                "type": "FeatureCollection",
                                "features": []
                            }


        let latitudeFieldName   = options?.latitudeFieldName    ? options.latitudeFieldName    : null 
        let longitudeFieldName  = options?.longitudeFieldName   ? options.longitudeFieldName   : null
        let delimeter           = options?.delimeter            ? options.delimeter            : ","
        let saveFilePath        = options?.saveFilePath         ? options.saveFilePath         : null

        fs.createReadStream(csvFile)
        .pipe(parse({ delimiter:delimeter, from_line: 1 }))
        .on("data", function (row) {
            csvArr.push(row)
        })
        .on("end", function () {
            if(latitudeFieldName == null || longitudeFieldName == null){
                
                let fieldNames = csvArr[0]
                let lonIndex
                let latIndex
    
                for (let i = 0; i < fieldNames.length; i++) {
                    let currentName = fieldNames[i].toLowerCase();
                    
                    if(possibleLongitudeNames.includes(currentName))
                        lonIndex = fieldNames.indexOf(fieldNames[i])
                    if(possibleLatitudeNames.includes(currentName))
                        latIndex = fieldNames.indexOf(fieldNames[i])
                }

                if(lonIndex == undefined || latIndex == undefined){
                    reject("Error while find Lon-lat Values. Please use options parameter. doc:https://github.com/trgisdev/csv2geo");
                    return
                }

                // Remove field names
                csvArr.shift()

                for (let i = 0; i < csvArr.length; i++) {
                    let currentRow = csvArr[i]
                    let lat = currentRow[latIndex]
                    let lon = currentRow[lonIndex]
                    
                    let currentGeojson = {
                            "type": "Feature",
                            "geometry": {
                            "type": "Point",
                            "coordinates": [lon,lat]
                        },
                            "properties": currentRow.map((d,i)=>{return {[fieldNames[i]]:d}})
                        
                    }

                    geojson.features.push(currentGeojson)

                    
                }
                resolve(geojson)

            }
        })
        .on("error", function (error) {
            reject("Error while read CSV file. doc:https://github.com/trgisdev/csv2geo ",error);
        });
        return

    })
        
    
  }


  module.exports = new csv2geo;