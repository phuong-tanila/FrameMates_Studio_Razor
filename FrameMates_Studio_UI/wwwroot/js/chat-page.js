const priceEl = document.querySelector("#Price");
const selectService = document.querySelector("#Options");
const customer_name = document.querySelector('#customer_name')
const date_input = document.querySelector('#date_input')
const form = document.querySelector("#form");
const compare_dates = (d1, d2, parentNode) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 <= date2) {
        console.log(`${d1} is less than ${d2}`);
        return false
    } else if (date1 > date2) {
        console.log(`${d1} is greater than ${d2}`);
        return true
    }
};
function clickHandle(btn) {
    console.log(btn.innerText)
    customer_name.value = btn.innerText
    document.querySelector('#list').style.display = 'none'
    customer_name.setAttribute("data-id", btn.getAttribute('data-id'));
}

function renderPriceService() {
    var id = selectService.value;
    const price = services.filter(i => id == i.serviceId)[0].price
    console.log(price)
    priceEl.value = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    const currency = new AutoNumeric('#deposit', {
        allowDecimalPadding: false,
        createLocalList: false,
        decimalPlaces: 0,
        maximumValue: price,
        minimumValue: "0",
        onInvalidPaste: "replace"
    });
}
customer_name.addEventListener('input', e => {
    console.log(e.target.value == "")
    if (!e.target.value == "") {
        fetch(`http:localhost:8080/api/customers/username/${e.target.value}`, { method: "GET" })
            .then(res => res.json())
            .then(arr => {
                console.log(arr)
                if (!arr) {
                    document.querySelector('#list').style.display = 'none'
                } else {
                    const htmls = arr.map(i => ` <li data-id = ${i.customerId} onclick="clickHandle(this)">${i.accountModel.username}</li>`)
                    document.querySelector('#list').style.display = 'block'
                    document.querySelector('#list').innerHTML = htmls.join('')

                }

            })
    } else {
        document.querySelector('#list').style.display = 'none'
    }
})

selectService.addEventListener("change", renderPriceService);
renderPriceService();
document.querySelector('#create_booking').addEventListener('click', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    form.reportValidity();
    document.querySelector('#loading').style.display = 'flex'
    document.querySelector('#loading').innerHTML = `<span class="loader"></span>`
    const description_field = document.querySelector('#description_field')
    const address = document.querySelector('#address')
    const date_input = document.querySelector('#date_input')
    const deposit = document.querySelector('#deposit')
    const options = document.querySelector('#Options')
    const price = document.querySelector('#Price')
    const name = document.querySelector('#customer_name')
    const strPrice = price.value;
    const intPrice = strPrice.replaceAll(".", "").replaceAll(" VND", "");
    const obj = {
        "description": description_field.value,
        "deposit": deposit.value.replaceAll(",", ""),
        "address": address.value,
        "checkIn": date_input.value,
        "customer": {
            "customerId": name.getAttribute('data-id')
        },
        "orderDetails": [
            {
                "discount": 0,
                "price": parseInt(intPrice),
                "servicePack": {
                    "serviceId": options.value
                }
            }

        ]


    }
    fetch('http://localhost:8080/api/orders', {
        method: 'post',
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${getCookie('accesstoken')}`,
        },

        body: JSON.stringify(obj),

    })
        .then(() => {
            document.querySelector('#loading').style.display = 'none'
            document.querySelector('#loading').innerHTML = ""
        })
        .then(() => {
            window.location.href = '/ManageOrder'
        }).catch(err => {
            console.log(err)
        })

});

date_input.addEventListener('change', function () {
    let currentDate = new Date()
    let chosenDate = new Date(this.value)
    console.log(new Date(this.value))


    let currentDateByFormat = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear()
    let chosenDateFormat = (chosenDate.getMonth() + 1) + '/' + chosenDate.getDate() + '/' + chosenDate.getFullYear()

    if (compare_dates(currentDateByFormat, chosenDateFormat, this.parentNode)) {
        Swal.fire('Choose from to current day')
        this.value = ""
    }
})