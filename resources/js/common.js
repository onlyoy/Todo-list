let addLocalStorage = (k,v) =>{

    let items = JSON.parse(localStorage.getItem(k));
    
    if(items){
        items.push(v);
        localStorage.setItem(k, JSON.stringify(items));
    }else{
        localStorage.setItem(k, JSON.stringify([v]));
    }
}

let addSessionStorage = (k,v) =>{
    let items = JSON.parse(sessionStorage.getItem(k));
    
    if(items){
        items.push(v);
        sessionStorage.setItem(k, JSON.stringify(items));
    }else{
        sessionStorage.setItem(k, JSON.stringify([v]));
    }
}

let getLocalStorage = k => {
    let items = JSON.parse(localStorage.getItem(k));
    if(!items) return null;
    return items;
}

let getSessionStorage = k => {
    let items = JSON.parse(sessionStorage.getItem(k));
    if(!items) return null;
    return items;
}

let removeLocalStorage = (k, fn) => {
    let items = getLocalStorage(k);
    let tmpArr = items.filter(fn);
    localStorage.setItem(k, JSON.stringify(tmpArr));
}

// attrs = {prop:{}, style:{}, text:str}
let createElement = (tag, attrs) => {
    let element = document.createElement(tag);
    if(!attrs) return element;

    for(p in attrs.prop){
        element[p] = attrs.prop[p];
    }

    for(p in attrs.style){
        element.style[p] = attrs.style[p];
    }

    if(attrs.text){
        let textNode = document.createTextNode(attrs.text);
        element.appendChild(textNode);
    }

    return element;
}

const generateFormUrlEncoded = params => {

    let tmp = [];

    for(key in params){
        tmp.push(`${key}=${params[key]}`);
    }

    return encodeURI(tmp.join('&'));

}