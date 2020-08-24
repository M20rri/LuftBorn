const USER = JSON.parse(sessionStorage.getItem('User'));
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

};
(function () {

    if (USER) {
        RENDER();
    } else {
        location.href = LOGINVIEW;
    };

})();