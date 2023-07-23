// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

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

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function logout() {
    localStorage.removeItem('accessToken');
    window.location.href = '/Login';
}
$(document).ready(function () {
    if (window.location.pathname == "/Login" || window.location.pathname == "/Signup") return;
    $.ajax({
        url: 'https://api.framemates.io.vn/' + 'api/employees/current',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
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
            let user_fullName = document.getElementById('user_fullName')
            let user_username = document.getElementById('user_username')
            user_fullName.innerHTML = response.accountModel.fullName
            user_username.innerHTML = response.accountModel.username
        },
        error: function (error) {
            // Handle any errors that occur during the request
            console.error(error);
            logout()
        }
    });
});