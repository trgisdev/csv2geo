
# csv2geo

csv2geo is a Node.js module that allows you to convert **CSV** files into geographic data formats such as **GeoJSON**, **KML**, and more.



## Installation

To install ***csv2geo***, run the following command:

```bash
npm install csv2geo

```

  
## Example Usage (geojson) 

Example Usage
Here's a simple example of how to use csv2geo to convert a CSV file into GeoJSON format. You don't need to provide any options, the tool will automatically detect the latitude and longitude fields in your CSV.

```javascript 
const csv2geo = require('csv2geo');

csv2geo.geojson('./example.csv')
.then((geojson) => {
    // geojson contains the full GeoJSON object
    let geojsonObject   = geojson;
    let geojsonFeatures = geojson.features;

    console.log('GeoJSON created:', geojsonObject);
})
.catch((err) => {
    console.error('Error:', err);
});
```


## Example with Options (geojson) 

If your CSV file uses custom field names for latitude and longitude, or has a different delimiter, you can pass these options into the method.



```javascript 
const csv2geo = require('csv2geo');

csv2geo.geojson('./example.csv', {
    latitudeFieldName: "latFieldName",       // Custom field name for Latitude 
    longitudeFieldName: "lonFieldName",      // Custom field name for Longitude 
    delimeter: ";",                          // Custom delimiter character
    saveFilePath: "./output.geojson",        // Save the GeoJSON as a file
})
.then((geojson) => {
    // geojson contains the full GeoJSON object
    let geojsonObject   = geojson;
    let geojsonFeatures = geojson.features;

    console.log('GeoJSON saved to file and created:', geojsonObject);
})
.catch((err) => {
    console.error('Error:', err);
});

```

    
    
## Options

- **latitudeFieldName** (optional): Specify the name of the latitude field in your CSV if it's not automatically detected.
- **longitudeFieldName** (optional): Specify the name of the longitude field in your CSV if it's not automatically detected.
- **delimeter** (optional): The delimiter used in your CSV file (default is ,).
- **saveFilePath** (optional): The path where the output GeoJSON will be saved. If not provided, the GeoJSON will only be returned as an object.

  
## KML Conversion

You can also convert **CSV** to **KML** format using the same method:



```javascript
csv2geo.kml('./example.csv', {
    saveFilePath: "./output.kml"
})
.then((kml) => {
    console.log('KML created and saved to file:', kml);
})
.catch((err) => {
    console.error('Error:', err);
});
```

## GPX Conversion

Convert CSV to GPX format effortlessly with csv2geo:




```javascript
const csv2geo = require('csv2geo');

csv2geo.gpx('./example.csv', {
    saveFilePath: "./output.gpx"
})
.then((gpx) => {
    console.log('GPX created and saved to file:', gpx);
})
.catch((err) => {
    console.error('Error:', err);
});
```

    
    
## Options

- **latitudeFieldName** (optional): Specify the name of the latitude field in your CSV if it's not automatically detected.
- **longitudeFieldName** (optional): Specify the name of the longitude field in your CSV if it's not automatically detected.
- **delimeter** (optional): The delimiter used in your CSV file (default is ,).
- **saveFilePath** (optional): The path where the output GeoJSON will be saved. If not provided, the GeoJSON will only be returned as an object.

  
## Shapefile and GPX Conversion (Coming Soon)

The **shapefile()** method are currently under development and will be available soon.
