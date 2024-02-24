
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

  