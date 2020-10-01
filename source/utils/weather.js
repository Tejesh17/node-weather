const request = require ('request')


//Getting weather parameters using a weather API
const weather = ((lat, lon, callback) =>{
    url = `http://api.weatherstack.com/current?access_key=216a6eb37c07a88e29da29a1c3245fc4&query=${lat},${lon}`
    // url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b7bd93cd9eca4c01e1c211bd4f946c72&units=metric`
    request( { url: url , json: true}, (error,response)=>{
        if (error){
            callback('Something went wrong, Please try again.', undefined)
        }else if (response.body.error){
            callback('Something went wrong, Please try a different location or try again.', undefined)
        }else{
            callback(undefined,{
                description: response.body.current.weather_descriptions[0],
                temp: response.body.current.temperature,
                city: response.body.location.name,
                country: response.body.location.country,
                humidity: response.body.current.humidity,
                time: response.body.location.localtime,
                rainfall: response.body.current.precip,
                //url: url

            })
        }
     })
    

})


module.exports= weather