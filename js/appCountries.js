import Country from "./classCountry.js"
import PreviewCountry from "./classPrevCountry.js";

let parent = document.querySelector("#id_parent");
let headerCountries = document.querySelector("#id_header")
const countriesAr = ["Usa", "Israel", "Britain", "France", "Thailand"]





const init = () => {
    countriesAr.forEach(country => createA(country))
    declareEvents();
    doApi("Zimbabwe");

    

}



const createA = (country) => {
    let a = document.createElement("a");
    a.innerHTML = country;
    a.addEventListener("click", () => {
        doApi(a.innerHTML);
    })

    headerCountries.append(a);

}

const declareEvents = () => {
    let input = document.querySelector("#id_input");
    let searchBtn = document.querySelector("#id_search");

    searchBtn.addEventListener("click", () => {
        doApi(input.value);
    })

}



 const doApi = async (input) => {
    parent.innerHTML ='<div class="loading d-flex mt-5"><img width="200px" class="mx-auto  mt-5" src="./images/ZZ5H.gif"></div>'
    
    let url = `https://restcountries.com/v3.1/name/${input}`;
    let resp = await fetch(url);
    let data = await resp.json();
    parent.innerHTML = "";
    console.log(data);

    if (!data[0]) {
        parent.innerHTML = `
        <h2 class="display-2 text-center pt-5 text-white">sorry,<br>country not found</h2>
        `
    }
    else if (data.length == 1) {
        showFullCountry(data[0]);
    }
    else {
        showPreviewCountries(data);

    }
}




export const doApiSpesipicCountry = async (country) => {
    parent.innerHTML ='<div class="loading d-flex mt-5"><img width="200px" class="mx-auto  mt-5" src="./images/ZZ5H.gif"></div>'
    
    let url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
    let resp = await fetch(url);
    let data = await resp.json();
    parent.innerHTML = "";
    console.log(data);

    showFullCountry(data[0]);
}

export const doApiByCode = async (code) => {
    parent.innerHTML ='<div class="loading d-flex mt-5"><img width="200px" class="mx-auto  mt-5" src="./images/ZZ5H.gif"></div>'
    
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    parent.innerHTML =""
    console.log(data);
    if (!data[0]) {
        parent.innerHTML = `
        <h2 class="display-2 text-center pt-5 text-white">sorry,<br>country not found</h2>
        `
    }
    else if (data.length == 1) {
        showFullCountry(data[0]);
    }
    else {
        showPreviewCountries(data);

    }
}



const showFullCountry = (item) => {

    let country = new Country(parent, item);
    country.renderToHtml();
}




const showPreviewCountries = (data) => {
let row = document.createElement("div");
row.className ="row pt-5 justify-content-center";
parent.append(row);

    data.forEach((country) => {
        let previewCountry = new PreviewCountry(row, country);
        previewCountry.renderToHtml();
    })
}



init();