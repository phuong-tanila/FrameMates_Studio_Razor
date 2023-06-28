const serviceTypeInfo = {
    Service: {
        "Kỷ yếu": ["92093", "92101"],
        "Cá nhân": ["66666", "88888"],
    },
    "Combo Services": {
        "chưa nghĩ ra 1": ["90402", "90403", "90404", "90405"],
        "chưa nghĩ ra 2": ["65623", "84646", "22222", "33333"],
    },
};
window.onload = function () {
    //todo: Get all input html elements from the DOM

    const optionsSelection = document.querySelector("#Options"),
        typeSelection = document.querySelector("#Type"),
        priceSelection = document.querySelector("#Price");
    // todo: Disable all  Selection by setting disabled to false
    typeSelection.disabled = true; // remove all options bar first
    priceSelection.disabled = true; // remove all options bar first


    for (let options in serviceTypeInfo) {
        optionsSelection.options[optionsSelection.options.length] = new Option(
            options,
            options
        );
    }

    //todo: type Changed
    optionsSelection.onchange = (e) => {
        typeSelection.disabled = false;

        typeSelection.length = 1;
        priceSelection.length = 1; // remove all options bar first
        for (let type in serviceTypeInfo[e.target.value]) {
            typeSelection.options[typeSelection.options.length] = new Option(
                type,
                type
            );
        }
    };
    //todo: Service change
    typeSelection.onchange = (e) => {
        priceSelection.disabled = false;

        priceSelection.length = 1; // remove all options bar first

        let prices = serviceTypeInfo[optionsSelection.value][e.target.value];


        for (let i = 0; i < prices.length; i++) {
            priceSelection.options[priceSelection.options.length] = new Option(
                prices[i],
                prices[i]
            );
        }
    };
};

