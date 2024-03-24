
# csv2geo

It enables you to convert files in CSV format into geographic datasets

##  



```bash 
  npm install csv2geo
```
    
## Example

```javascript
const csv2geo = require('csv2geo')

csv2geo.geojson('./example.csv')
.then((res)=>{
    
    let geojsonObject   = res
    let geojsonFeatures = res.features
    
})
.catch((err)=>{
    console.log(err)
})
```

## Example with Options

```javascript
const csv2geo = require('csv2geo')

csv2geo.geojson('./example.csv',{
    latitudeFieldName  :"latFieldName",       // Field Name of Latitude 
    longitudeFieldName :"lonFieldName",       // Field Name of Longitude 
    delimeter          :";",                  // Delimetery character
    saveFilePath       :"./example.geojson",  // Save geojson as a file
})
.then((res)=>{
    
    let geojsonObject   = res
    let geojsonFeatures = res.features
    
})
.catch((err)=>{
    console.log(err)
})
```

  