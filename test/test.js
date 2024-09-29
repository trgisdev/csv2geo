const csv2geo = require('../index')

csv2geo.geojson('./example.csv',{saveFilePath:'test.geojson'})
.then((res)=>{
    
    let geojsonObject   = res
    let geojsonFeatures = res.features
    console.log(geojsonObject)
    console.log(geojsonFeatures[0])

})
.catch((err)=>{
    console.log(err)
})

csv2geo.kml('./example.csv',{saveFilePath:'test.kml'})
.then((res)=>{
    
    console.log(res)

})
.catch((err)=>{
    console.log(err)
})