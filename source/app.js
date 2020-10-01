
//importing prerequisites
const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')



//configuring views and view engine for handlebars
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))


//serving up static pages
app.use(express.static(path.join(__dirname, '../public')))




//setting up routes

app.get('/', (req,res)=>{
    res.render('index',{
        title: 'Weather!',
        name:'Tejesh',

    })
    
})


app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'Weather!',
        name:'Tejesh'
    })
})

app.get('/weather', (req,res)=> {
    if (!req.query.address) {
        res.send({
            error: 'You must enter an address!'
        })}
    else{  
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if (error){
                return res.send({error})
            }
        weather(latitude,longitude, (error, {description, temp, humidity, time, rainfall} = {})=>{
            if (error){
                return (res.send({error}))
            }
        res.send({
            temp,
            description,
            location,
            humidity,
            time,
            rainfall
        })

            })
        })
    }

})




app.get('*', (req,res)=>{
    res.render('404',{
        title:'Error:404',
        name:'Tejesh'
    })
})




//starting up server
app.listen(3000, ()=>{
    console.log('Server started on port 3000.')
})
