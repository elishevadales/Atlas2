import {doApiSpesipicCountry} from "./appCountries.js"

export default class PreviewCountry {
    
    constructor(_parent, _item) {
        this.parent = _parent;
        this.flag = _item.flags.png;
        this.name = _item.name.common;
    }

    renderToHtml() {
        let country = document.createElement("div");
        country.className = "preCountry col-3 p- mx-2 mb-3 p-3";
        country.style.cssText ="background: rgba(255, 255, 255, 0.789); border-radius: 10px; cursor: pointer;"
        country.innerHTML =`
        <img src="${this.flag}" alt="${this.name} flag" width="100%">
        <p class="display-5 text-center">${this.name}</p>
        `
        country.addEventListener("click",() => {
            doApiSpesipicCountry(this.name);

        } )

        this.parent.append(country);
    }
}