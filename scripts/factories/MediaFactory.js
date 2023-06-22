class MediaFactory{
    constructor(media){
        this._media = media
    }

    getInstance(){
        // console.log(this._media)
        let obj = null
        // console.log(this._media.video)

        if(this._media.image){
            // console.log("je contient une image")
            obj =  new MediaImage(this._media);
            //  console.log("mon objet enfant",obj)
            
        }else{
            // console.log("je contient une video")
            obj =  new MediaVideo(this._media);
            // console.log(obj._video)
           
        }
        return obj;
    }
    
   
}


//  const photographerFactory = new MediaFactory()
//  photographerFactory.getInstance()






