window.addEventListener("load",()=>{
    const input = document.getElementById("add_mini_pics");
    const listpic = document.getElementById("list_mini_pics");
    const arr_files = []
    input.addEventListener("change", (e)=>{
        let files = e.target.files;
        //arr_files.push(files)
        //console.log(arr_files)
        if (e.target.files.length <= 4) {
            const imgs = document.querySelectorAll('.each-pic-preview')
            console.log('a' + imgs.length + e.target.files.length)
            if (imgs == null || (imgs.length + e.target.files.length <= 4)) {
                for (var i = 0; i < files.length; i++) {
                    const f = files[i];
                    console.log(f);
                    let imageService = URL.createObjectURL(f);
                    console.log(imageService);
                    let fileName = '';
                    let fileType = '';
                    fileshow(fileName, fileType, imageService);
                }
                return
            }
        }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can only post maximum 4 images!',

            })
            //console.log(arr_files)
            //console.log(e.target.files)
            //arr_files.splice(arr_files.length, (arr_files.length - 1 + e.target.files.length))
          
            //console.log(arr_files.length + e.target.files.length)
            //console.log(arr_files)
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