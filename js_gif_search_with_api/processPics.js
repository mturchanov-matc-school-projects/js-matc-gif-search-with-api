window.onload = () => {
    let picBtn = document.querySelector("#getPictures");
    let resetBtn = document.querySelector("#reset");
    picBtn.addEventListener("click", output);
    resetBtn.addEventListener("click", reset);
}


const output = async () => {
    let picturesURLs = await getPicturesURL();
    await addHtml(picturesURLs);
}

const getPicturesURL =  async () => {
    let picValue = document.querySelector("#picturesValue").value;
    let offset = (Math.round(Math.random() * 50 ) + 1);
    const picturesURL = `https://api.giphy.com/v1/gifs/search?api_key=MANImog4c29KwPFDXiaZfVOB9U0Xwzmh&q=${picValue}&limit=10&offset=${offset}`;
    return await fetch(picturesURL).then(data => data.json()).then(jsonData => {
        const picture = jsonData.data;
        return picture.map((pic => {
            return {"url" : pic.images.fixed_width.url, "alt": pic.title.replace(/GIF.*/gi, "")}          
        }));            
    });
}

const reset = () => {
    if(document.querySelector("#outputPics")) {
        document.querySelector("#outputPics").remove();
    }
    document.querySelector("#picturesValue").value = "";
}

const addHtml = picUrls => {
    reset();
    let div = document.createElement("div");
    div.setAttribute("id", "outputPics");    
    
    picUrls.map((pic => {
        let picHtml = document.createElement("img");
        picHtml.src = pic.url;
        picHtml.setAttribute("class", "outputPic");
        picHtml.setAttribute("alt", pic.alt);
        div.appendChild(picHtml);
    }))
    document.body.appendChild(div);
}