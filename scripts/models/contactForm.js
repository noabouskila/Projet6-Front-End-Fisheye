function displayModal() {
    console.log("je suis dans displayModal")
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    document.getElementById("prenom").focus();

    // Ferme la modal avec la touche 'ESC'
    window.addEventListener("keydown", (event) => {
        // console.log(event)
        if (event.key === "Backspace" || event.key === "Escape") {
            const modal = document.getElementById("contact_modal");
            modal.style.display = "none";
        }
    }); 
}

function closeModal() {
    console.log("je suis dans closeModal")
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


// FORMULAIRE/////////////////////
const prenom = document.getElementById("prenom")
const nom = document.getElementById("nom")
const email = document.getElementById("email")
const message = document.getElementById("message")

const prenomError = document.querySelector("#prenomError");
const nomError = document.querySelector("#nomError");
const emailError = document.querySelector("#emailError");
const messageError = document.querySelector("#messageError");

const submitBtn = document.getElementById("submit");

//verifier email
function isValidEmail(email) {
    // Vérifie que l'email est valide selon une expression régulière
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// onblur
// prenom.addEventListener('blur' , function(){
//     console.log("mon prenom : " , prenom.value)
// })

// nom.addEventListener('blur' , function(){
//     console.log("mon nom : ", nom.value)
// })

// email.addEventListener('blur' , function(){
//     console.log("mon email : " , email.value)
// })

// message.addEventListener('blur' , function(){
//     console.log("mon message : " , message.value)
// })


// submit
submitBtn.onclick= function(e){

    e.preventDefault()
    let isValid = true
    
    if(prenom.value < 2){
        prenomError.classList.add("error-message");
        prenomError.textContent = "Veuillez saisir 2 caractères ou plus pour le prénom.";
        prenom.focus();
        return false;
    }
    if(nom.value < 2){
        nomError.classList.add("error-message");
        nomError.textContent = "Veuillez saisir 2 caractères ou plus pour le nom.";
        nom.focus();
        return false;
    }
    if(email.value === ""){
        emailError.classList.add("error-message");
        emailError.textContent = "Veuillez saisir une adresse email";
        email.focus();
        return false;
    }
    else if(!isValidEmail(email.value)){
        emailError.classList.add("error-message");
        emailError.textContent = "Veuillez saisir une adresse email valide";
        email.focus();
        return false;

    }
    if(message.value < 5){
        messageError.classList.add("error-message");
        messageError.textContent = "Veuillez saisir 5 caractères ou plus pour le message.";
        message.focus();
        return false;
    }
    
    if (isValid) {
        console.log("prenom:", prenom.value);
        console.log("nom:", nom.value);
        console.log("email:", email.value);
        console.log("message:", message.value);

        alert("Votre message a bien été envoyé.");
        closeModal();
    }  
}