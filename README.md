# background.js

    recive mensajes de 

        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                // console.log("recibimos mensaje en background");  
                console.log(request)    
            }
        )

# content.js

    manejamos el contenido de la pagina de origen

    * Enviamos mensaje a background.js usando:

        chrome.runtime.sendMessage({message: "MANDAMOS_DESDE_CONTENT"}, function(response) {
        console.log("Mandamos mensaje desde content");
        });

    * Recibimos mensaje de popup.js

        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                // console.log(request)                
            }
        );    


# popup.js

    manejamos el componente que se muestra por arriba de la pagina osea al nivel del navegador

    * Enviamos mensaje a content.js usando:

        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "MANDAMOS_DESDE_POPUP"});
        });

