// fonction pour afficher le resultat  
function afficherResultat(score,motsProposes){
  let scoreSpan = document.querySelector(".zoneScore span")
  let msgScore = `${score} / ${motsProposes}`
  scoreSpan.innerText = msgScore
}

//fonction pour afficher les propositions
function afficherProposition(listeMots){
  let zoneDeProposition = document.querySelector(".zoneProposition")
  zoneDeProposition.innerText = listeMots
}

// fonction afficher email
function afficherEmail(nom, email, score) {
  let mailto = `mailto:${email}?subject=Partage du score TypeMaster&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
  location.href = mailto
}

//fonction valider nom
function validerNom(nom){
  if(nom.length < 2){
    throw new Error(`Attention le nom est trop court`)
  }
}

// fonction verifier email
function validerEmail(email){
  let regle= new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
  if(!regle.test(email)){
    throw new Error(`Attention l'email est invalide`)
  }
}

//fonction popup message erreur
function afficherMessageErreur(message){
  let  messageErreur = document.getElementById("spanErreur")

  if(!messageErreur){
    let popup = document.querySelector(".popup")
    messageErreur = document.createElement("span")
    messageErreur.id ="spanErreur"
    messageErreur.style.color = "red"
    popup.appendChild(messageErreur)
  }
  messageErreur.innerText = message
}

//fonction gerer formulaire
function gererFormulaire(scoreEmail){
  try{
    let nom = document.getElementById("nom").value
    validerNom(nom)
    let email = document.getElementById("email").value
    validerEmail(email)
    afficherMessageErreur("")
    afficherEmail(nom,email,scoreEmail)

  }catch(erreur){
    afficherMessageErreur(erreur.message)
  } 
}

// fonction recommencer jeu
function recommencer(){
  let boutonReplay = document.getElementById("replay")
  boutonReplay.addEventListener("click", () =>{
    location.reload()
  })
}

// fonction principale
function lancerJeu(){
  initAddEventListenerPopup()
  let score = 0
  let listeProposition = listeMots
  let i = 0

  afficherProposition(listeProposition[i])
  let inputEcriture = document.getElementById("inputEcriture")
  inputEcriture.addEventListener("keypress", (even) =>{
    if(even.key === 'Enter' || even.keycode === 13){
      document.getElementById("btnValiderMot").click()
    }
  })


  let boutonValider = document.querySelector(".zoneSaisie #btnValiderMot")
  boutonValider.addEventListener("click", () =>{
    console.log(inputEcriture.value)
    if(inputEcriture.value === listeProposition[i]){
      score++
    }
    i++
    afficherResultat(score,i)
    inputEcriture.value = ''
    if(listeProposition[i] === undefined){
      afficherProposition("Le jeu est termine.")
      boutonValider.disabled = true
    }else{
      afficherProposition(listeProposition[i])
    }

  } )

  let mesBoutonsRadio = document.querySelectorAll(".optionSource input")
  for(let compt = 0; compt < mesBoutonsRadio.length; compt++){
    mesBoutonsRadio[compt].addEventListener("change", (event) =>{
      console.log(event.target.value)
      if(event.target.value === "1"){
        listeProposition = listeMots
      }else{
        listeProposition = listePhrases
      }
      afficherProposition(listeProposition[i])
    })
  }
  
  let form = document.querySelector("form")
  form.addEventListener("submit", (event) =>{
    event.preventDefault()
    let scoreEmail = `${score} / ${i}`
    gererFormulaire(scoreEmail)
  })
  recommencer()
}

