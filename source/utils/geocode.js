const request = require ('request')



// geo code function to interact with the API and convert location into coordinates

const geocode = ((location, callback)=>{
    url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoidGVqZXNoMTciLCJhIjoiY2tmbW0xd2FxMDhnODJxczV5cHBpaWgxdyJ9.Zu4ZZhjdcuuXwROdmeEjNQ&limit=1'
    request( { url: url , json: true}, (error,response)=>{
        if (error){
            callback('Something went wrong, please try again.', undefined)
        }else if ((response.body.features).length ===0  )
        {
            callback('City not found', undefined)
        }else{
            // console.log((response.body.features).length)

            callback(undefined,{
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                place: response.body.features[0].text,
                location: response.body.features[0].place_name
            } )
        }
    })
    

})

module.exports = geocode