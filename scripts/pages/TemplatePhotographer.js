//Mettre le code JavaScript lié à la page photographer.html
class TemplatePhotographer{

    constructor(){
        this.urlParams = new URLSearchParams(window.location.search);
        this.photographersApi = new Api('./assets/data/photographers.json');
        this.init();
        this.currentPhotographer = null;
        this.medias = null;
        this.classMedias ;
        this.currentImageIndex = 0;
        this.selectSort;
    }

    async init(){
        const Data = await this.photographersApi.get(); 
        this.medias = Data.media.filter(x => x.photographerId == this.urlParams.get('id')); 

        // console.log(this.medias)   

        this.currentPhotographer = Data.photographers.find(x => x.id == this.urlParams.get('id'));
        
        // affiche les info du photographe en EN-TETE
        const photographerSection = document.querySelector(".photograph-header");
        const photographerModel = this.getUserInfoDOM()
        // const userCardDOM = photographerModel.getUserInfoDOM();
        photographerSection.appendChild(photographerModel);


        //ajout du prix par jour au FOOTER
        const footer = document.querySelector(".price");
        footer.innerHTML = `${this.currentPhotographer.price} €/jour`;


        // ajout du nom de photographe dans modal contact
        const header = document.getElementById("modalTitle");
        header.innerHTML = `Contactez-moi <br>${this.currentPhotographer.name}`;
      

        // inserer les medias
        const mediaSection = document.querySelector(".photographer-media-div");
        const totalMedia = [];
        
        this.medias.forEach((media) => {    
            const myMedia = new MediaFactory(media).getInstance()  
            // console.log(myMedia) 
            totalMedia.push(myMedia)  
            const mediaCardDOM = this.getMediaCardDOM(myMedia);  
            mediaSection.appendChild(mediaCardDOM);
        });
        // console.log(totalMedia)
        
           
        // likes
        const totalLike = document.querySelector(".totalLike");

        // 1) additionner les likes deja existant
        const tabLikes =  this.medias.map(medlike =>{
            let like = medlike.likes
        //    console.log(like)
            return like
        })
        // tableau des likes
        // console.log(tabLikes)
        let total= 0
        for( let i=0 ; i<tabLikes.length ; i++){
            total +=tabLikes[i]
        }
        // total des likes
       console.log(total)
       totalLike.innerHTML =  total

        // 2) additionner les likes au click du user pour chaque image
        const clickHeart = document.querySelectorAll(".heart")
        let nbclick = 0
        
        clickHeart.forEach(heart => {
            heart.addEventListener("click" , function(e){      
      
                const h4 = document.querySelector('[id="'+e.target.id+'"]');    
                console.log(h4)            
                const pressed =heart.getAttribute("aria-pressed") 

                heart.setAttribute("aria-pressed", pressed);
                if(pressed === "true"){             
                    heart.setAttribute("aria-pressed","false")
                    heart.setAttribute("aria-label", "je n'aime plus")

                    nbclick -= 1
                    console.log(nbclick)
                    h4.textContent = parseInt(h4.textContent) - 1                  
                }
                else{               
                    heart.setAttribute("aria-pressed", "true")
                    heart.setAttribute("aria-label", "j'aime")

                    nbclick += 1
                    console.log(nbclick)
                    h4.textContent = parseInt(h4.textContent) + 1      
                }               
                h4.setAttribute("aria-label", `aimé ${h4.textContent} fois`);
                totalLike.innerHTML = total + nbclick               
            })
        })
       
        // affiche la modale media au click 
        this.classMedias = document.querySelectorAll(".mediaDisplayLink")
        
        this.classMedias.forEach((classMedia) =>{
            classMedia.addEventListener("click", this.displayMedia.bind(this)) 
            // lier le contexte de this à la méthode displayMedia. Cela garantit que this fait référence à l'instance de TemplatePhotographer lors de l'appel de displayMedia et que l'événement e est transmis correctement
        })

        // option de tri 
        this.selectSort = document.querySelector("#sort")
        this.selectSort.addEventListener("click", this.sortMedia.bind(this))
    }

    // affiche les infos  en header du photographe
    getUserInfoDOM() {
        const article = document.createElement("article");
        article.setAttribute("class" , "articleInfoDOM")
        const portrait = `./assets/photographers/portraitPhotographers/${this.currentPhotographer.portrait}`
        article.innerHTML =`
            <div class="information">
                <h2>${this.currentPhotographer.name}</h2>
                <h3>${this.currentPhotographer.city},   ${this.currentPhotographer.country}</h3>
                <p>${this.currentPhotographer.tagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()" aria-label="Contactez-moi" aria-haspopup="dialog" aria-controls="dialog">Contactez-moi</button>
            <img class="img-page-photo" src="${portrait}" alt=">"aller sur la page de " ${this.currentPhotographer.name} ,  
             ${this.currentPhotographer.city} , ${this.currentPhotographer.tagline} , ${this.currentPhotographer.price}€ par jour"
            />
        `
        return article;
    }
    // affiche les media (main) du photographe
    getMediaCardDOM(myMedia){
        const article = document.createElement("article");

        const picture =`assets/photographers/${myMedia._image}`;
        const vid = `assets/photographers/${myMedia._video}`;
        article.innerHTML = 
        `
        <a class="mediaDisplayLink" href="#" title="${myMedia._title}" aria-label="${myMedia._title}">
           ${myMedia._image ? 
            `<img  class="imgVidMedia" src="${picture}" alt="${myMedia._title}"  aria-label="${myMedia._title}" data-id="${myMedia._id}">`
            
            //ou 
    
            : `<video class="imgVidMedia"  src="${vid}" aria-label="${myMedia._title}" data-id="${myMedia._id}"
            type="video/mp4"></video>`
           }
        </a>
        <div class="titleMedia">
            <h3 class="mediaDisplayInfosTitle">${myMedia._title}</h3>
            <div class="like">
                <h4 id="${myMedia._id}" class="mediaDisplayLike" aria-label="aimé ${myMedia._likes} fois">${myMedia._likes}</h4>
                <img id="${myMedia._id}" class="heart"
                 src="assets/icons/heart-solid.svg" 
                 alt="heart" aria-describedby="${myMedia._id}"   
                
                />
            </div>
        </div>
        `
        return article
    }

    // affiche le media  dans la modale en fonction de sa nature : video ou image
    displayMedia(e){
        let typeMedia ;
        let titleMedia;
        let idMedia  = e.target.getAttribute("data-id")
        let srcMedia = e.target.getAttribute("src")

        if(e.target.tagName === "IMG"){

            typeMedia = "picture"
            titleMedia = e.target.getAttribute("alt")
            //  console.log(typeMedia , titleMedia , idMedia , srcMedia)
            
        }
        else if(e.target.tagName === "VIDEO"){
            typeMedia = "video"
            titleMedia = e.target.getAttribute("aria-label")
            // console.log(typeMedia , titleMedia , idMedia , srcMedia)
        }

        const divMedia = document.createElement('div')
        divMedia.setAttribute("class", "divMedia")
        
        divMedia.innerHTML = `
        <div class="lightbox" role="dialog" aria-modal="true" data-id="${idMedia}" data-title="${titleMedia}">
            
            <img src="assets/icons/close.svg" alt="fermer modale" class=" closeModal colorMedia" aria-describedby="fermer"/>
           
            <main>
                <div class="lightbox-prev colorMedia" aria-label="suivant">
                &#10094;
                </div>
          
                ${ typeMedia == "picture" ? 
                `<img  class="imgVidMedia carousel-image" src="${srcMedia}" alt="${titleMedia}"  data-id="${idMedia}">`
                
                //ou 
        
                : `<video class="imgVidMedia carousel-video"  src="${srcMedia}" aria-label="${titleMedia}" data-id="${idMedia}"  
                type="video/mp4" controls></video>`
                }

                <div class="lightbox-next colorMedia" aria-label="precedent">
                &#10095;
                </div>
                
            </main>

            <p class="title">${titleMedia}</p> 
        </div>
        `

        const mediaModal = document.getElementById("media_modal")    
       
        // affiche modal
        mediaModal.appendChild(divMedia)
        mediaModal.style.display = "block"
        
        // enleve l'arriere plan
        const main = document.getElementById("main")
        main.style.display = "none"

        // ferme la modal au click
        const closeModal = document.querySelector(".closeModal")
        closeModal.addEventListener("click", ()=>{
            mediaModal.style.display = "none"
            main.style.display = "block"
        }) 

        // ajout
        // Ferme la modal avec la touche 'ESC'
        window.addEventListener("keydown", (event) => {
        // console.log(event)
            if (event.key === "Backspace") {
                mediaModal.style.display = "none";
                main.style.display = "block"
            }
        });
        // fin ajout

        // Passer d'une modale à l'autre

        // selection des fleches prev et next 
        const prevButton = document.querySelector(".lightbox-prev");
        const nextButton = document.querySelector(".lightbox-next");
        
        // Récupére l'index de l'image actuelle
        let currentIndex = this.medias.indexOf(this.medias.find(x => x.id == idMedia));
        // console.log("mon currentIndex : " , currentIndex)
        // appelle la fnction next ou prev
        prevButton.addEventListener("click", () => this.showPreviousMedia(currentIndex));
        nextButton.addEventListener("click", () => this.showNextMedia(currentIndex));
        
        this.currentImageIndex = currentIndex;


        // ajout 

        // passage des images avec le clavier
        window.addEventListener("keydown",function(event) {
            // console.log(event)
            // console.log("je suis dans le passage d'image au clavier")
            if(event.defaultPrevented) {
                return;
            }
            switch (event.key) {
                case "ArrowLeft":
                //clique sur fleche precedente
                prevButton.click();
                break;
                case "ArrowRight":
                // clique sur fleche suivante
                nextButton.click();
                break;
                default: return; //fait rien si appuie sur une autre touche
            }
            event.preventDefault();
            },
            true
        );  

        //lecture de video avec clavier
        window.addEventListener("keydown", function (event) {
            const lightbox = document.querySelector(".lightbox");
            if (event.key === " ") {
            // Touche d'espace
            const videoElement = lightbox.querySelector("video");
            event.preventDefault();
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
            }
        });
        // fin ajout
    }

    // passe à l'image precedente
    showPreviousMedia() {

        if (this.currentImageIndex > 0) {
          this.currentImageIndex--;
        } else {
          // Si vous voulez que le carrousel soit circulaire, définissez l'index sur le dernier élément lorsque le premier est atteint.
          // Sinon, vous pouvez choisir de ne rien faire lorsque le premier élément est atteint.
           this.currentImageIndex = this.medias.length - 1;
          //return;
        }
      
        this.displayMediaAtIndex(this.currentImageIndex);
    }
      
    // passe à l'image suivante
    showNextMedia() {
        // console.log("je suis dans shownextmedia")
        if (this.currentImageIndex < this.medias.length - 1) {
          this.currentImageIndex++;
        }
        else {
            // Si vous voulez que le carrousel soit circulaire, définissez l'index sur le dernier élément lorsque le premier est atteint.
            // Sinon, vous pouvez choisir de ne rien faire lorsque le premier élément est atteint.
            // this.currentImageIndex = this.medias.length - 1;
            return;
        }
      
        
        this.displayMediaAtIndex(this.currentImageIndex);
    }

    // fonction apppellée dans next et prev pour afficher le media en fonction du click des fleche suivantes
    displayMediaAtIndex(index) {
       
        const media = this.medias[index];       

        // Afficher l'image correspondante

        const divMedia = document.getElementsByClassName('divMedia')[0];      
        divMedia.innerHTML = `
        <div class="lightbox" role="dialog" data-id="${media.id}" data-title="${media.title}">
            
            <img src="assets/icons/close.svg" alt="fermer modale" class=" closeModal colorMedia" aria-describedby="fermer"/>
           
            <main>
                <div class="lightbox-prev colorMedia" aria-label="suivant">
                &#10094;
                </div>
          
                ${ media.image !=null ? 
                `<img  class="imgVidMedia carousel-image" src="assets/photographers/${media.image}" alt="${media.title}"  data-id="${media.id}">`
                
                //ou 
        
                : `<video class="imgVidMedia carousel-video"  src="assets/photographers/${media.video}" aria-label="${media.title}" data-id="${media.id}"  
                type="video/mp4" controls></video>`
                }

                <div class="lightbox-next colorMedia" aria-label="precedent">
                &#10095;
                </div>
                
            </main>

            <p class="title">${media.title}</p> 
        </div>
        `
        // Mettre à jour le titre du média
        const titleElement = document.querySelector(".title");
        titleElement.textContent = media.title;
        
        return media
    }

    // TRI popularité et titre
    sortMedia(){
        const selectedOption = this.selectSort.options[this.selectSort.selectedIndex];
        // console.log(selectedOption)
        const mediaSection = document.querySelector(".photographer-media-div");
        
        if(selectedOption.value == "sort-popularity"){
            // console.log('je suis dans popularité')
             this.medias.sort((a, b) => b.likes - a.likes)

            // reaffiche les medias dans l'ordre de tri 
            mediaSection.innerHTML =""
            this.medias.forEach((media) => {    
                const myMedia = new MediaFactory(media).getInstance()  
                // console.log(myMedia)   
                const mediaCardDOM = this.getMediaCardDOM(myMedia);  
                mediaSection.appendChild(mediaCardDOM);
                console.log(media.likes)
            });

            // ajoute le bon aria-label 
            document.querySelector("#sort-popularity").setAttribute("aria-label", "true");
            document.querySelector("#sort-date").setAttribute("aria-label", "false");
            document.querySelector("#sort-title").setAttribute("aria-label", "false");

        }
        else if(selectedOption.value == "sort-date"){
            // console.log('je suis dans date')
            this.medias.sort((a, b) => new Date(b.date) - new Date(a.date))

            // reaffiche les medias dans l'ordre de tri 
            mediaSection.innerHTML =""
            this.medias.forEach((media) => {    
                const myMedia = new MediaFactory(media).getInstance()  
                // console.log(myMedia)   
                const mediaCardDOM = this.getMediaCardDOM(myMedia);  
                mediaSection.appendChild(mediaCardDOM);
                console.log(media.date)
            });

            // ajoute le bon aria-label 
            document.querySelector("#sort-popularity").setAttribute("aria-label", "false");
            document.querySelector("#sort-date").setAttribute("aria-label", "true");
            document.querySelector("#sort-title").setAttribute("aria-label", "false");
        }
        else if(selectedOption.value == "sort-title"){
            // console.log('je suis dans title')
             this.medias.sort((a, b) => a.title.localeCompare(b.title))

            // reaffiche les medias dans l'ordre de tri 
            mediaSection.innerHTML =""
            this.medias.forEach((media) => {    
                const myMedia = new MediaFactory(media).getInstance()  
                // console.log(myMedia)   
                const mediaCardDOM = this.getMediaCardDOM(myMedia);  
                mediaSection.appendChild(mediaCardDOM);
                console.log(media.title)
            });

            // ajoute le bon aria-label 
            document.querySelector("#sort-popularity").setAttribute("aria-label", "false");
            document.querySelector("#sort-date").setAttribute("aria-label", "false");
            document.querySelector("#sort-title").setAttribute("aria-label", "true");
        }
    }
}

new TemplatePhotographer()
