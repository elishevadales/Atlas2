import { doApiByCode } from "./appCountries.js";
export default class Country {
    constructor(_parent, _item) {
        let lang = _item.languages;
        let coin = _item.currencies;

        this.parent = _parent;
        this.name = _item.name.common;
        this.pop = _item.population;
        this.region = _item.region;
        this.lang = Object.values(lang);
        this.coin = Object.keys(coin);
        this.coin2 = Object.values(coin)[0].name;
        this.capital = _item.capital;
        this.borders = _item.borders;
        this.flag = _item.flags.png;
        this.lat = Object.values(_item.capitalInfo.latlng)[0];
        this.lng = Object.values(_item.capitalInfo.latlng)[1];


    }

    renderToHtml() {
        let country = document.createElement("div");
        country.className = "full-country shadow row justify-content-around p-4 mt-5";
        country.style.cssText = "background: rgba(255, 255, 255, 0.789); border-radius: 20px";
        country.innerHTML = `
        <div class="d-flex left align-items-center col-5 ">
            <div class="map border shadow w-100">
                <div class="mapouter w-100">
                    <div class="gmap_canvas w-100">
                        <iframe width=100% height="400" id="gmap_canvas"
                            src="https://maps.google.com/maps?q=${this.lat},${this.lng}&t=&z=5&ie=UTF8&iwloc=&output=embed"
                            frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                        <a href="https://putlocker-is.org"></a>
                        <br>
                        <a href="https://www.embedgooglemap.net">embedgooglemap.net</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="right col-5" style="word-wrap: break-word;">
            <div class="lead" >
                <h2>${this.name}</h2>
                <p>POP: ${this.pop}</p>
                <p>Region: ${this.region}</p>
                <p>Languages: ${this.lang}</p>
                <p>Coin: ${this.coin}, ${this.coin2}</p>
                <p>Capital: ${this.capital}</p>
            </div>
            <div class="borders">
                <h4 id="borders_title" class=${!this.borders ? "d-none" : "d-block"}>Borders:</h4>
                <p id="borders"></p>
            </div>
            <div class="flag">
                <img class="shadow" src=${this.flag}>
            </div>
        </div>
        `

        this.parent.append(country);

        this.borders.forEach(async (border) => {
            let url = `https://restcountries.com/v3.1/alpha/${border}`;
            let resp = await fetch(url);
            let data = await resp.json();
            let fullNameBorder = data[0].name.common;

            let borderSpan = document.createElement("span");
            borderSpan.innerHTML = fullNameBorder
            borderSpan.style.cssText = "cursor:pointer;text-decoration:underline; margin-right:15px; display:inline-block;"

            borderSpan.addEventListener("click", () => {
                doApiByCode(border);
            })

            document.querySelector("#borders").append(borderSpan);
        })

    }


}