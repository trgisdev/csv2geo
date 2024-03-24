const csv2geo = require('../index')

csv2geo.geojson('./example.csv')
.then((res)=>{
    
    let geojsonObject   = res
    let geojsonFeatures = res.features
    console.log(geojsonObject)
    console.log(geojsonFeatures[0])

})
.catch((err)=>{
    console.log(err)
})