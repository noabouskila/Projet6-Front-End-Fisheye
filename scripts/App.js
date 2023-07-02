
class App{ 
    constructor(){
        this.photographersSection = document.querySelector(".photographer_section");
        // Recuperation des données
        this.photographersApi = new Api('./assets/data/photographers.json')
    }

    async main(){
        // console.log(this.photographersApi)

        const Data = await this.photographersApi.get()
        console.log(Data)

        // recuperation des phographes et leurs infos 
        const photoData = Data.hasOwnProperty('photographers') ? Data.photographers : ""
        console.log(photoData)

        // recuperation des medias des photographes (images et video)
        const mediaData = Data.hasOwnProperty('media') ? Data.media : ""
        console.log(mediaData)

        // inserer les donnes des photographes dans la page d'accueil 
        photoData.forEach( photo => {
            const photographerModel = new TemplateCard(photo);
            console.log(photographerModel)

            const userCardDOM = photographerModel.getUserCardDOM();
            console.log(userCardDOM)

            this.photographersSection.appendChild(userCardDOM);
        });

    }
}

const app = new App()
app.main()
      

  
    
