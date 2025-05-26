window.addEventListener("DOMContentLoaded", function(){
    const button: HTMLButtonElement = (
        document.getElementById("button") as
        HTMLButtonElement
    );
    button.addEventListener("click", function(){
        window.ElectronAPI.sendMessage("Hello World!")
    })
})