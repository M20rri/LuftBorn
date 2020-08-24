let errorMsg = [];

const LOGIN = _ => {

    let validation = APPLYVALIDATION();
    if (validation) {

        let EMAIL = document.getElementById('emailTxt').value;
        let PASSWORD = document.getElementById('passwordTxt').value;
        let model = {
            Email: EMAIL,
            Password: PASSWORD
        };
        axios(`${BASE_URL}/Login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(model)
        }).then(res => {
            let result = res.data;
            if (result.code == 1) {
                sessionStorage.setItem('User', result.message);
                location.href = INDEXVIEW;
            } else {

                Toastify({
                    text: result.message,
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: 'center', // `left`, `center` or `right`
                    backgroundColor: "#c82333",
                    stopOnFocus: true
                }).showToast();

            }
        })
    } else {

        var msg = '';

        errorMsg.forEach(v => {
            msg += v + '<br />';
        });

        Toastify({
            text: msg,
            duration: 3000,
            newWindow: true,
            gravity: "top", // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            backgroundColor: "#c82333",
            stopOnFocus: true
        }).showToast();

    }
};


const APPLYVALIDATION = _ => {

    let validation = true;
    errorMsg = [];

    let EMAIL = document.getElementById('emailTxt').value;
    let PASSWORD = document.getElementById('passwordTxt').value;

    if (EMAIL == "") {
        errorMsg.push('Email is required');
        validation = false;
    }

    if (PASSWORD == "") {
        errorMsg.push('Password is required');
        validation = false;
    }

    return validation;

}
