const USER = JSON.parse(sessionStorage.getItem('User'));
const TBLBODY = document.getElementById('tblBody');
const RENDER = _ => {
    Toastify({
        text: `Welcome ${USER.Firstname} ${USER.Lastname}`,
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: 'center', // `left`, `center` or `right`
        backgroundColor: "#218838",
        stopOnFocus: true
    }).showToast();

    LOADUSERSGRID();

};

const LOADUSERSGRID = _ => {

    axios.get(`${BASE_URL}/UsersGrid`)
        .then(res => {
            TBLBODY.innerHTML = '';
            for (let user of res.data) {
                TBLBODY.innerHTML += `${HTMLUSER(user)}`;
            };
        });
};

const HTMLUSER = (item) => {

    let stringfy = JSON.stringify(item);
    let DELBTN = `<i class = "fa fa-remove btn btn-danger" data-item='${stringfy}' onclick="DELETEUSER(this)"></i>`;
    let DISPLAYBTN = `<i class = "fa fa-edit btn btn-info"  data-toggle="modal"
                data-target="#updateModal" data-item='${stringfy}' onclick="DISPLAYUSER(this)"></i>`;
    return `
    <tr>
        <th scope="row">${item.id}</th>
        <td>${item.firstname} ${item.lastname}</td>
        <td>${item.email}</td>
        <td>${DELBTN} ${DISPLAYBTN}</td>
    </tr>
    `;
};

const DISPLAYUSER = e => {
    let { id, firstname, lastname } = JSON.parse(e.getAttribute('data-item'));
    let MODALBODY = document.getElementById('mBody');
    MODALBODY.innerHTML = '';
    MODALBODY.innerHTML = `    
   <form>
                            <input type="hidden" id="userId" value='${id}'/>
                            <div class="row">
                                <div class="col-6">
                                    <label>Firstname</label>
                                    <input type="text" class="form-control" id="fnameTxt2" placeholder="Firstname" autocomplete="off" value='${firstname}'/>
                                </div>
                                <div class="col-6">
                                    <label>Lastname</label>
                                    <input type="text" class="form-control" id="lnameTxt2" placeholder="Lastname" autocomplete="off" value='${lastname}'/>
                                </div>
                            </div>
                        </form>   
    `
};

const APPLYVALIDATION = _ => {

    let validation = true;
    errorMsg = [];

    let FNAME = document.getElementById('fnameTxt').value;
    let LNAME = document.getElementById('lnameTxt').value;
    let EMAIL = document.getElementById('emailTxt').value;
    let PASSWORD = document.getElementById('passTxt').value;

    if (FNAME == "") {
        errorMsg.push('Firstname is required');
        validation = false;
    }

    if (LNAME == "") {
        errorMsg.push('Lastname is required');
        validation = false;
    }

    if (EMAIL == "") {
        errorMsg.push('Email is required');
        validation = false;
    }

    if (!isEmail(EMAIL)) {
        errorMsg.push('Invalid Format Email');
        validation = false;
    }

    if (PASSWORD == "") {
        errorMsg.push('Password is required');
        validation = false;
    }

    return validation;

}


const APPLYEDITVALIDATION = _ => {

    let validation = true;
    errorMsg = [];

    let FNAME = document.getElementById('fnameTxt2').value;
    let LNAME = document.getElementById('lnameTxt2').value;

    if (FNAME == "") {
        errorMsg.push('Firstname is required');
        validation = false;
    }

    if (LNAME == "") {
        errorMsg.push('Lastname is required');
        validation = false;
    }
    return validation;

};

const ADDUSER = _ => {

    let validation = APPLYVALIDATION();

    if (validation) {


        let FNAME = document.getElementById('fnameTxt').value;
        let LNAME = document.getElementById('lnameTxt').value;
        let EMAIL = document.getElementById('emailTxt').value;
        let PASSWORD = document.getElementById('passTxt').value;

        let model = {
            Email: EMAIL,
            Password: PASSWORD,
            Firstname: FNAME,
            Lastname: LNAME
        };
        axios(`${BASE_URL}/AddUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(model)
        }).then(res => {
            let result = res.data;
            if (result.code == 0) {

                Toastify({
                    text: result.message,
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: 'center', // `left`, `center` or `right`
                    backgroundColor: "#17a2b8",
                    stopOnFocus: true
                }).showToast();

            } else {

                Toastify({
                    text: result.message,
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: 'center', // `left`, `center` or `right`
                    backgroundColor: "#38b44a",
                    stopOnFocus: true
                }).showToast();

                document.getElementById('fnameTxt').value = '';
                document.getElementById('lnameTxt').value = '';
                document.getElementById('emailTxt').value = '';
                document.getElementById('passTxt').value = '';

                LOADUSERSGRID();
            }
        })

    }
    else {

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

    };
}

const EDITUSER = _ => {

    let validation = APPLYEDITVALIDATION();

    if (validation) {


        let ID = +document.getElementById('userId').value;
        let FNAME = document.getElementById('fnameTxt2').value;
        let LNAME = document.getElementById('lnameTxt2').value;

        let model = {
            Id: ID,
            Firstname: FNAME,
            Lastname: LNAME
        };
        axios(`${BASE_URL}/EditUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(model)
        }).then(res => {
            let result = res.data;
            if (result.code == 0) {

                Toastify({
                    text: result.message,
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: 'center', // `left`, `center` or `right`
                    backgroundColor: "#c82333",
                    stopOnFocus: true
                }).showToast();

            } else {

                Toastify({
                    text: result.message,
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: 'center', // `left`, `center` or `right`
                    backgroundColor: "#38b44a",
                    stopOnFocus: true
                }).showToast();

                LOADUSERSGRID();
            }
        })

    }
    else {

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

    };
}


const DELETEUSER = e => {

    let { id } = JSON.parse(e.getAttribute('data-item'));

    if (confirm('Are you sure ?')) {

        axios(`${BASE_URL}/DeleteUser/${+id}`, {
            method: 'GET',
        }).then(res => {
            let result = res.data;
            if (result.code == 0) {

                Toastify({
                    text: result.message,
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: 'center', // `left`, `center` or `right`
                    backgroundColor: "#c82333",
                    stopOnFocus: true
                }).showToast();

            } else {

                Toastify({
                    text: result.message,
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: 'center', // `left`, `center` or `right`
                    backgroundColor: "#38b44a",
                    stopOnFocus: true
                }).showToast();

                LOADUSERSGRID();
            }
        });
    }

};

const isEmail = (email = null) => {

    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);

}

(function () {

    if (USER) {
        RENDER();
    } else {
        location.href = LOGINVIEW;
    };

})();