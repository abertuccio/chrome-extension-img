function draw() {
    const bar = document.createElement("div");
    bar.id = "wrapper-bar"
    bar.innerHTML = "Estas logueado";

    hideButton = document.createElement("button");
    hideButton.innerHTML = "ocultar";
    hideButton.addEventListener("click", function(){
        imgs = [...document.querySelectorAll("img")];

        [...document.querySelectorAll("body *:not(#wrapper-bar)")].forEach(e=>{
            e.remove();
        })
        
        sorted = imgs.sort((a,b)=>(a.width < b.width) ? 1 : -1)

        sorted.forEach(element => {
            element.style.float = "left"
            element.style.width = "200px";
            element.style.height = "200px";
            element.style.border = "1px solid #666";
            element.style.padding = "10px";
            element.style.margin = "5px";
            document.body.appendChild(element)
        });
    }) 
    
    

    const styles = {
        height: "100px",
        position: "relative",        
        "z-index": "999999999999999999999999999999",
        width: "100%",
        "text-align": "center",
        "background-color": "red",
        "font-size": "50px",
    }
    Object.assign(bar.style, styles)

    bar.appendChild(hideButton);
    document.body.prepend(bar);

    const styleSticky = {
        position: "fixed",
        top: "0",
        width: "100%",
      }

    window.onscroll = function() {

        var sticky = navbar.offsetTop;

        if (window.pageYOffset >= sticky) {
            Object.assign(bar.style, styleSticky)
      } else {
            Object.assign(bar.style, styles)
      }};




}

function remove() {
    document.getElementById("wrapper-bar").remove();
}




//recibimos mensaje de background
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        switch (request.content) {
            case "SESSION":
                draw()
                break;
            case "NO_SESSION":
                remove()
                break;
        }
    }
);

//checkeamos el status
chrome.runtime.sendMessage({background: "GET_SESSION_STATUS"}, function (response) {    
   (response.status)?draw():remove();
});