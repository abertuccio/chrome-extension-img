/* LOGUEAMOS */
function logIn() {

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];

        const request = {
            background: "LOG_IN",
            user: "pepe",
            password: "un password choto"
        }


        chrome.runtime.sendMessage(request, function (response) {

            if (response.status) {
                drawData();
            } else {
                drawLogIn();
            }

        });
    });

    setTimeout(()=>{
      window.close();
    },2000)


}

function logOut() {

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];

        const request = {
            background: "LOG_OUT"
        }

        chrome.runtime.sendMessage(request, function (response) {
            drawLogIn();
        });
    });

    setTimeout(()=>{
        window.close();
      },2000)
}

function drawData() {

    document.body.innerHTML = "";

    const title = document.createElement("h4");
    title.innerHTML = `Bienvenido!, esta logueado.`
    const button = document.createElement("button");
    button.innerHTML = "Cerrar session"

    button.addEventListener('click', logOut)

    document.body.appendChild(title);
    document.body.appendChild(button);

}


function drawLogIn() {

    document.body.innerHTML = "";

    const wrapper = document.createElement("form");

    const labelUser = document.createElement("label");
    const inputUser = document.createElement("input");
    const labelPassword = document.createElement("label");
    const inputPassword = document.createElement("input");
    const submit = document.createElement("button");
    submit.innerHTML = "Enviar";

    wrapper.addEventListener('submit', logIn)


    wrapper.appendChild(labelUser);
    wrapper.appendChild(inputUser);
    wrapper.appendChild(labelPassword);
    wrapper.appendChild(inputPassword);
    wrapper.appendChild(submit);

    document.body.appendChild(wrapper);


}


/*CHEQUEAMOS STATUS*/
chrome.tabs.query({}, function (tabs) {    
    tabs.forEach(tb => {
        chrome.runtime.sendMessage({ "background": "GET_SESSION_STATUS" }, function (response) {
    
            if (response.status) {
                drawData();
            } else {
                drawLogIn();
            }
    
        });        
    });
});
