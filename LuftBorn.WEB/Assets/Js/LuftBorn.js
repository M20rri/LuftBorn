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
    let DELBTN = `<i class = "fa fa-remove btn btn-danger" data-item='${stringfy}' onclick="DELETEPRODUCT(this)"></i>`;
    let DISPLAYBTN = `<i class = "fa fa-edit btn btn-info" data-item='${stringfy}' onclick="DISPLAYPRODUCT(this)"></i>`;
    return `
    <tr>
        <th scope="row">${item.id}</th>
        <td>${item.firstname} ${item.lastname}</td>
        <td>${item.email}</td>
        <td>${DELBTN} ${DISPLAYBTN}</td>
    </tr>
    `;
};

(function () {

    if (USER) {
        RENDER();
    } else {
        location.href = LOGINVIEW;
    };

})();