import express from 'express';
const app = express();
import fetch from 'node-fetch';
const PORT = process.env.PORT || 5001;


app.set('view engine', 'ejs');
app.use(express.static('public'));

let url = "http://api.openweathermap.org/data/2.5/forecast?lat=32.109333&lon=34.855499&appid=bf8bdc6ff3f8af3bd4bad0fa482bfc3c";

fetch(url)
.then(function(response){
    console.log(response.json());
}
)
.catch(function(response){
    console.log('An Error occured');
    console.log(response);
})

const get_city = async () =>{
    let city = await fetch(url);
    let data = await city.json();
    return data
}


app.get('/', function(req, res){
    get_city().then((data)=>{
        res.render('index', {weatherData: data});
    })
   
   
})

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})

