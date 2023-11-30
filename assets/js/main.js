// Location JS
let selectedLocation =document.getElementById("loc");
let headerLocation = document.getElementById("h1");
let cities = [
    {
        arabicName:"أسوان",
        Ename:"Aswān"
    },
    {
        arabicName:"الشرقيه",
        Ename:"Ash Sharqīyah"
    },
    {
        arabicName:"قنا",
        Ename:"Qinā"
    },
    {
        arabicName:"القاهره",
        Ename:"	Al Qāhirah"
    },
    {
        arabicName:"السويس",
        Ename:"	As Suways"
    },
    {
        arabicName:"البحر الاحمر",
        Ename:"Al Baḩr al Aḩmar"
    },
]
new Promise((resolve)=>{
    for(let city of cities){
        let opt=document.createElement("option")
        opt.setAttribute("value",city.Ename)
        opt.setAttribute("name",city.arabicName)
        opt.className="opt"
        opt.innerHTML=city.arabicName
        selectedLocation.appendChild(opt)
    }
    resolve()
}).then(()=>{
    selectedLocation.addEventListener("change",()=>{
        window.localStorage.setItem("location",selectedLocation.value);
        let opt =document.querySelectorAll(".opt")
        for(let options of opt){
            if(options.value == selectedLocation.value){
                window.localStorage.setItem("Name",options.innerHTML);
            }
        }
        headerLocation.innerHTML=window.localStorage.getItem("Name")
        getAladhan(window.localStorage.getItem("location"))
    })
    if(window.localStorage.getItem("location") && window.localStorage.getItem("Name")){
        getAladhan(window.localStorage.getItem("location"))
        selectedLocation.value=window.localStorage.getItem("location")
        headerLocation.innerHTML=window.localStorage.getItem("Name")
    }else {
        let opt =document.querySelectorAll(".opt")
        for(let options of opt){
            if(options.value == selectedLocation.value){
                window.localStorage.setItem("Name",options.innerHTML);
            }
        }
        window.localStorage.setItem("location",selectedLocation.value)
        headerLocation.innerHTML=window.localStorage.getItem("Name");
        selectedLocation.value=window.localStorage.getItem("location") 
        getAladhan(window.localStorage.getItem("location"))
    }
})

// Time JS
//#region
let timeValue = document.querySelector(".time")
let time = new Date()
let timingNow;
if(time.getHours()>12){
    timingNow=`${time.getHours()-12}`
    let text=document.createTextNode(`${timingNow}:${time.getMinutes()} pm`)
    timeValue.appendChild(text)
}else if (time.getHours() == 0){
    timingNow=`${time.getHours()+12}`
    let text=document.createTextNode(`${timingNow}:${time.getMinutes()} am`)
    timeValue.appendChild(text)

}else {
    timingNow=`${time.getHours()}`
    let text=document.createTextNode(`${timingNow}:${time.getMinutes()} am`)
    timeValue.appendChild(text)
}
//#endregion

function getAladhan(cityName){
    axios.get(`http://api.aladhan.com/v1/timingsByCity?country=EG&city=${cityName}`)
    .then((response) =>{
        let timing =response.data.data.timings
        fillTimeForPryer("fajr-time",timing.Fajr)
        fillTimeForPryer("sunrise-time",timing.Sunrise)
        fillTimeForPryer("dhuhr-time",timing.Dhuhr)
        fillTimeForPryer("asr-time",timing.Asr)
        fillTimeForPryer("asr-time",timing.Asr)
        fillTimeForPryer("maghrib-time",timing.Maghrib)
        fillTimeForPryer("isha-time",timing.Isha)
        let date = response.data.data.date.gregorian.date
        let day = response.data.data.date.gregorian.weekday.en
        let dateAndDay=`${date} ${day}`;
        fillTimeForPryer("date",dateAndDay)
    })
    .catch((error)=> {
        console.log(error);
    })
}
function fillTimeForPryer(id,time) {
    document.getElementById(id).innerHTML=time
}

