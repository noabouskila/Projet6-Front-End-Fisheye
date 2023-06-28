
class App{ 
    constructor(){
        this.photographersSection = document.querySelector(".photographer_section");
        this.photographersApi = new Api('./data/photographers.json')
    }

    async main(){
        console.log(this.photographersApi)

        const Data = await this.photographersApi.get()
        console.log(Data)

        const photoData = Data.hasOwnProperty('photographers') ? Data.photographers : ""
        console.log(photoData)

        const mediaData = Data.hasOwnProperty('media') ? Data.media : ""
        console.log(mediaData)


        // const photos = mediaData.map(photo => new  PhotographerFactory(photo , "photo"))
        // console.log(photos)

        // const medias = mediaData.map(media =>new PhotographerFactory(media , "media"))
        // console.log(medias)

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
      

  
    
