/* Cette fonction affiche la popup pour partager son score. */
function afficherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    popupBackground.classList.add("active")
}

/* Cette fonction cache la popup pour partager son score. */
function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    popupBackground.classList.remove("active")
}


/* Cette fonction initialise les écouteurs d'événements qui concernent  l'affichage de la popup. */
function initAddEventListenerPopup() {
    btnPartage = document.querySelector(".zonePartage button")
    let popupBackground = document.querySelector(".popupBackground")
    btnPartage.addEventListener("click", () => {
        afficherPopup()
    })
    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            cacherPopup()
        }
    })
}