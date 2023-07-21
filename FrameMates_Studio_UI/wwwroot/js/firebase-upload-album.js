import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { listAll, getStorage, ref, getDownloadURL, deleteObject, uploadBytesResumable, uploadBytes } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log(';12367123786')
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBx43VpSxmcC6ELlPLuPyU2qB1rquelHf0",
    authDomain: "framemates-363d4.firebaseapp.com",
    projectId: "framemates-363d4",
    storageBucket: "framemates-363d4.appspot.com",
    messagingSenderId: "116881990658",
    appId: "1:116881990658:web:960f030a355222f600f31b",
    measurementId: "G-4GKGQKPW42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage();
var album = {
    title: "Ha Noi ASDADDADASSDD",
    album_mediaFile: [

    ]
}
var miniAlbum = {
    title: "Ha Noi ASDADDADASSDD",


}
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
try {
    const albumForm = document.querySelector("#album-form");
    albumForm.addEventListener("submit", async e => {
        e.preventDefault();
        const albumName = albumForm.querySelector("input[type=text]").value;
        album.title = albumName;
        console.log(4)
        const albumImgList = document.querySelectorAll(".album-img-preview");
        const mediaFiles = [];
        Promise.all([
            new Promise(res => {
                albumImgList.forEach((imgPreview, index) => {
                    const imgSrc = imgPreview.querySelector("img").src;
                    fetch(imgSrc)
                        .then(res => res.blob())
                        .then(data => {
                            const storageRef = ref(storage, "album/" + uuidv4() + "." + data.type.split("/")[1]);

                            uploadBytes(storageRef, data)
                                .then((snapshot) => {
                                    return getDownloadURL(snapshot.ref)
                                })
                                .then(url => {
                                    mediaFiles.push({
                                        index: index,
                                        title: albumName,
                                        filePath: url,
                                        description: ""
                                    })
                                    console.log(albumImgList.length + ' ' + index)
                                    if (albumImgList.length == index + 1) {
                                        return res(mediaFiles)
                                    }
                                })

                        })
                })

            })

        ]).then(res => res[0])
            .then(res => {
                res = res.sort((a, b) => a.index - b.index);
                console.log(res)
                album.album_mediaFile = res;
                console.log("Album")
                console.log(album)
                callAddAlbumApi(album);
            });
        //promise.then(res => {
        //    console.log(res)
        //    album.album_mediaFile = res;
        //    console.log("Album")
        //    console.log(album)
        //    //callAddAlbumApi(album);
        //})

    });
} catch (Error) { }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
let object = {}
try {
    
    document.querySelector('#loading').style.display = 'none'
    const create_input = document.querySelector("#create_input");
    create_input.addEventListener("click",  e => {
        console.log('12312312312312312312321213123123132132321123')
        document.querySelector('#loading').style.display = 'flex'
       
        document.querySelector('#loading').innerHTML = `<span class="loader"></span>`
        e.preventDefault();
        const imgList = document.querySelectorAll('.each-pic-preview')
        let srcList = [...imgList].map(i => i.src)
        console.log(srcList)
      

        // album.title = albumName;

        // const albumImgList = document.querySelectorAll(".album-img-preview");
        const mediaFiles2 = [];
        Promise.all([
            new Promise(res => {
                srcList.forEach((imgSrc, index) => {

                    fetch(imgSrc)
                        .then(res => res.blob())
                        .then(data => {
                            const storageRef = ref(storage, "mini-album/" + uuidv4() + "." + data.type.split("/")[1]);

                            uploadBytes(storageRef, data)
                                .then((snapshot) => {
                                    return getDownloadURL(snapshot.ref)
                                })
                                .then(url => {
                                    mediaFiles2.push({
                                        index: index,
                                        filePath: url,
                                        description: ""
                                    })

                                    if (srcList.length == index + 1) {
                                        return res(mediaFiles2)
                                    }
                                })

                        })
                })

            })

        ]).then(res => res[0])
            .then(res => {
                res.forEach(i => console.log("1 " + i))


                const price_input = document.querySelector('#price_input')
                const name_input = document.querySelector('#name_input')
              
                res = res.sort((a, b) => a.index - b.index);
                console.log("213" + res)
                miniAlbum.album_mediaFile = res;
                console.log("Album")
             
                object = {
                    name: name_input.value,
                    price: price_input.value,
                    servicePack_mediaService: miniAlbum.album_mediaFile,
                    description: editor4.getData()
                }
                console.log(object)
                return new Promise(res => res(object)) 
            })

                    .then(obj => {
                        console.log(obj)
                        fetch('http://localhost:8080/api/services', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${getCookie('accessToken')}`,
                            },

                            body: JSON.stringify(obj),

                        })
                            .then(() => {
                                document.querySelector('#loading').innerHTML = ""
                                document.querySelector('#loading').style.display = 'none'
                                Swal.fire(
                                    'Created!',
                                    '',
                                    'success'
                                ).then(() => { window.location.href = '/DashboardStudio' })
                            })

                    })

            })






} catch (Error) { }

const callAddAlbumApi = (album) => {
    console.log(1)
    $.ajax({
        async: false,
        url: "http://localhost:8080" + '/api/albums',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(album),
        beforeSend: function (xhr) {
            let accessToken = localStorage.getItem('accessToken');
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

        },
        success: function (response, status, xhr) {
            if (!response) {
                logout()
                return
            }
            console.log(response)
        },
        error: function (error) {
            // Handle any errors that occur during the request
            console.error(error);
        }
    });
}
