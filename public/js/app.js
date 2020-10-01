

//client side javascript to fetch location and return weather parameters 


const button = document.querySelector('#button')
const form = document.querySelector('#demo-name')
const weaDisp = document.querySelector('.table-wrapper')
weaDisp.style.display= 'none'


//Using DOM to render weather parameters

const weaMsg = document.querySelector('#weaMsg')
const weaTime = document.querySelector('#weaTime')
const weaTemp = document.querySelector('#weaTemp')
const weaRain = document.querySelector('#weaRain')
const weaHumid = document.querySelector('#weaHumid')
const weaDesc = document.querySelector('#weaDesc')



//Taking input and rendering data to the WebPage

button.addEventListener('click', ()=>{
    if (form.value==''){
        weaMsg.textContent= 'Please enter a location.'
        weaDisp.style.display= 'none'
    }else{
        const location = form.value
        console.log(location)
                
        fetch('/weather?address='+ location).then((response)=>{
            response.json().then((data)=>{
                if (data.error){
                    weaMsg.textContent= data.error
                    weaDisp.style.display= 'none'

                }else{
                    weaMsg.textContent= 'The weather parameters for '+ data.location + ' are:'
                    weaTime.textContent=  data.time
                    weaTemp.textContent= data.temp + ' °C'
                    weaRain.textContent= data.rainfall + ' mm'
                    weaHumid.textContent= data.humidity + '%'
                    weaDesc.textContent=  data.description + '.'
                    weaDisp.style.display= 'block'
                    console.log(data);
                }
            })
        })
    }
})
