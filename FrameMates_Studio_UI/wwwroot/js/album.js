window.addEventListener("load",()=>{
    const input = document.getElementById("add_pics");
    const listpic = document.getElementById("list_alb");

    input.addEventListener("change", (e)=>{
        let imagealb = URL.createObjectURL(event.target.files[0]);
        let fileName = e.target.files[0].name;
        let fileType = e.target.value.split(".").pop();
        fileshow(fileName, fileType, imagealb);
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