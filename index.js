const fs = require('fs');
const { parse } = require("csv-parse");

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

    geojson = (csvFile, options) => new Promise((resolve, reject) => {
        let csvArr = [];
        let geojson = {
            "type": "FeatureCollection",
            "features": []
        };

        let latitudeFieldName = options?.latitudeFieldName ? options.latitudeFieldName : null;
        let longitudeFieldName = options?.longitudeFieldName ? options.longitudeFieldName : null;
        let delimeter = options?.delimeter ? options.delimeter : ",";
        let saveFilePath = options?.saveFilePath ? options.saveFilePath : null;

        fs.createReadStream(csvFile)
            .pipe(parse({ delimiter: delimeter, from_line: 1 }))
            .on("data", function (row) {
                csvArr.push(row);
            })
            .on("end", function () {
                let fieldNames = csvArr[0];
                let lonIndex;
                let latIndex;

                if (latitudeFieldName == null || longitudeFieldName == null) {
                    for (let i = 0; i < fieldNames.length; i++) {
                        let currentName = fieldNames[i].toLowerCase();
                        if (possibleLongitudeNames.includes(currentName))
                            lonIndex = fieldNames.indexOf(fieldNames[i]);
                        if (possibleLatitudeNames.includes(currentName))
                            latIndex = fieldNames.indexOf(fieldNames[i]);
                    }
                } else {
                    lonIndex = fieldNames.indexOf(longitudeFieldName);
                    latIndex = fieldNames.indexOf(latitudeFieldName);
                }

                if ((lonIndex == undefined || latIndex == undefined) || (lonIndex == -1 || latIndex == -1)) {
                    reject("Error while find Lon-lat Values. Please use options parameter. doc:https://github.com/trgisdev/csv2geo");
                    return;
                }

                // Remove field names
                csvArr.shift();

                for (let i = 0; i < csvArr.length; i++) {
                    let currentRow = csvArr[i];
                    let lat = currentRow[latIndex];
                    let lon = currentRow[lonIndex];

                    let currentGeojson = {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [lon, lat]
                        },
                        "properties": {}
                    };
                    currentRow.map((d, i) => { return currentGeojson.properties[fieldNames[i]] = d });

                    geojson.features.push(currentGeojson);
                }

                if (saveFilePath != null) {
                    fs.writeFile(saveFilePath, JSON.stringify(geojson), err => {
                        if (err) {
                            reject("Error while write CSV file. doc:https://github.com/trgisdev/csv2geo ", err);
                        }
                    });
                }

                resolve(geojson);
            })
            .on("error", function (error) {
                reject("Error while read CSV file. doc:https://github.com/trgisdev/csv2geo ", error);
            });
        return;
    })

    shapefile = (csvFile, options) => new Promise((resolve, reject) => {
        // Implement shapefile logic
    })

    kml = (csvFile, options) => new Promise((resolve, reject) => {
        let csvArr = [];
        let latitudeFieldName = options?.latitudeFieldName ? options.latitudeFieldName : null;
        let longitudeFieldName = options?.longitudeFieldName ? options.longitudeFieldName : null;
        let delimeter = options?.delimeter ? options.delimeter : ",";
        let saveFilePath = options?.saveFilePath ? options.saveFilePath : null;

        let kmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2">
        <Document>`;
        let kmlFooter = `</Document></kml>`;
        let kmlBody = "";

        fs.createReadStream(csvFile)
            .pipe(parse({ delimiter: delimeter, from_line: 1 }))
            .on("data", function (row) {
                csvArr.push(row);
            })
            .on("end", function () {
                let fieldNames = csvArr[0];
                let lonIndex;
                let latIndex;

                if (latitudeFieldName == null || longitudeFieldName == null) {
                    for (let i = 0; i < fieldNames.length; i++) {
                        let currentName = fieldNames[i].toLowerCase();
                        if (possibleLongitudeNames.includes(currentName))
                            lonIndex = fieldNames.indexOf(fieldNames[i]);
                        if (possibleLatitudeNames.includes(currentName))
                            latIndex = fieldNames.indexOf(fieldNames[i]);
                    }
                } else {
                    lonIndex = fieldNames.indexOf(longitudeFieldName);
                    latIndex = fieldNames.indexOf(latitudeFieldName);
                }

                if ((lonIndex == undefined || latIndex == undefined) || (lonIndex == -1 || latIndex == -1)) {
                    reject("Error while find Lon-lat Values. Please use options parameter. doc:https://github.com/trgisdev/csv2geo");
                    return;
                }

                // Remove field names
                csvArr.shift();

                for (let i = 0; i < csvArr.length; i++) {
                    let currentRow = csvArr[i];
                    let lat = currentRow[latIndex];
                    let lon = currentRow[lonIndex];
                    let placemark = `<Placemark>
                        <Point>
                            <coordinates>${lon},${lat}</coordinates>
                        </Point>
                        <ExtendedData>`;

                    currentRow.forEach((data, index) => {
                        placemark += `<Data name="${fieldNames[index]}">
                            <value>${data}</value>
                        </Data>`;
                    });

                    placemark += `</ExtendedData></Placemark>`;
                    kmlBody += placemark;
                }

                let kmlContent = kmlHeader + kmlBody + kmlFooter;

                if (saveFilePath != null) {
                    fs.writeFile(saveFilePath, kmlContent, err => {
                        if (err) {
                            reject("Error while write KML file. doc:https://github.com/trgisdev/csv2geo ", err);
                        }
                    });
                }

                resolve(kmlContent);
            })
            .on("error", function (error) {
                reject("Error while read CSV file. doc:https://github.com/trgisdev/csv2geo ", error);
            });
        return;
    })

    gpx = (csvFile, options) => new Promise((resolve, reject) => {
        // Implement gpx logic
    })

}

module.exports = new csv2geo;
