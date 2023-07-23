import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { listAll, getStorage, ref, getDownloadURL, deleteObject, uploadBytesResumable, uploadBytes } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const apiDomain = "https://api.framemates.io.vn/"

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
let data = {
};
const storage = getStorage();
function uploadAvatarImage(storageRef, image) {
    return uploadBytes(storageRef, image)
        .then((snapshot) => {
            return getDownloadURL(snapshot.ref)
        })
        .then(url => {
            data.avatarStudio = url;
            console.log(data)

        })
}
function uploadCoverImage(storageRef, image) {
    return uploadBytes(storageRef, image)
        .then((snapshot) => {
            return getDownloadURL(snapshot.ref)
        })
        .then(url => {
            data.coverImage = url;
            console.log(data)
        })
}


function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function createStudio() {
    let coverImage = document.querySelector('input[name="coverImage"]').files[0]
    let avatar = document.querySelector('input[name="avatar"]').files[0]
    let studioName = $('input[name="studioName"]').val()
    let description = $('textarea[name="description"]').val()
    let address = $('input[name="address"]').val()
    const avatarRef = ref(storage, "avatar/" + uuidv4() + "." + avatar.name.split(".")[1]);
    const coverImageRef = ref(storage, "cover/" + uuidv4() + "." + coverImage.name.split(".")[1]);
    data = {
        name: studioName,
        address: address,
        description: description,
    };
    Promise.all([
        uploadAvatarImage(avatarRef, avatar),
        uploadCoverImage(coverImageRef, coverImage),
    ]).then(() => {
        $.ajax({
            url: apiDomain + 'api/studios',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                let accessToken = localStorage.getItem('accessToken');
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            },
            success: function (response) {
                window.location.href = '/Studiopage'
            },
            error: function (error) {
                // Handle any errors that occur during the request
                console.error(error);
                // Display an error message to the user
            }
        });
    });
}
function updateStudio(id) {
    let coverImage = document.querySelector('input[name="coverImage"]').files[0]
    let avatar = document.querySelector('input[name="avatar"]').files[0]
    let studioName = $('input[name="studioName"]').val()
    let description = $('textarea[name="description"]').val()
    let address = $('input[name="address"]').val()
    console.log(avatar)
    console.log(address)
    const avatarRef = ref(storage, "avatar/" + uuidv4() + "." + avatar.name.split(".")[1]);
    const coverImageRef = ref(storage, "cover/" + uuidv4() + "." + coverImage.name.split(".")[1]);
    data = {
        name: studioName,
        address: address,
        description: description,
    };
    console.log(data)
    Promise.all([
        uploadAvatarImage(avatarRef, avatar),
        uploadCoverImage(coverImageRef, coverImage),
    ]).then(() => {
        $.ajax({
            url: apiDomain + 'api/studios/' + id,
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                let accessToken = localStorage.getItem('accessToken');
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            },
            success: function (response) {
                window.location.href = '/Studiopage'
            },
            error: function (error) {
                // Handle any errors that occur during the request
                console.error(error);
                // Display an error message to the user
            }
        });
    });
}
$(document).ready(function () {
    $('#createStudio').submit(function (event) {
        event.preventDefault();
    });
});
export { updateStudio, createStudio }