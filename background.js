let sessionStatus = false;


function getSessionStatus() {
    return { status: sessionStatus };
}

function logIn(request) {
    sessionStatus = true;

    const response = {
        user: "Pepe",
        status: sessionStatus
    }

    /* MENSAJEAMOS A CONTENT*/
    chrome.tabs.query({}, function(tabs){
        tabs.forEach(tb => {
            chrome.tabs.sendMessage(tb.id, {content: "SESSION"});
        });
    });


    return response;
}

function logOut(request){
    sessionStatus = false;

    /* MENSAJEAMOS A CONTENT*/
    chrome.tabs.query({}, function(tabs){
        tabs.forEach(tb => {
            chrome.tabs.sendMessage(tb.id, {content: "NO_SESSION"});
        });
    });

    return getSessionStatus();
}




chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        switch (request.background) {
            case "GET_SESSION_STATUS":
                sendResponse(getSessionStatus())
                break;
            case "LOG_IN":
                sendResponse(logIn(request))
                break;
            case "LOG_OUT":
                sendResponse(logOut(request))
                break;
        }
    }
);