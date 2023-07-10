window.addEventListener("load",()=>{
    const input = document.getElementById("add_mini_pics");
    const listpic = document.getElementById("list_mini_pics");

    input.addEventListener("change", (e)=>{
        let files = e.target.files;
        console.log(files);
        for (var i = 0; i < files.length; i++) {
            const f = files[i];
            console.log(f);
            let imageService = URL.createObjectURL(f);
            console.log(imageService);
            let fileName = '';
            let fileType = '';
            fileshow(fileName, fileType, imageService);
        }
    })

    const fileshow=(fileName, fileType, file)=>{
        const showfileboxElem = document.createElement("div");
        showfileboxElem.classList.add("album-img-preview");
        const imgElem = document.createElement("img");
        imgElem.src= file;
        imgElem.classList.add("each-pic-preview");
        const closeElem = document.createElement("span");
        closeElem.innerHTML="&times;";
        showfileboxElem.append(closeElem)
        showfileboxElem.append(imgElem);
        listpic.append(showfileboxElem);
        console.log(file, listpic);

        closeElem.addEventListener("click",()=>{
            listpic.removeChild(showfileboxElem);
            input.value="";
        })
    }
})