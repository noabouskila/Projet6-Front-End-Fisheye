class Card{
    constructor(data){
        this._name = data.name 
        this._id = data.id 
        this._city = data.city 
        this._country = data.country 
        this._tagline = data.tagline 
        this._price = data.price 
        this._portrait = data.portrait
        this._href = data.href
    }

    get name(){
        return this._name
    }
    get id(){
        return this._id
    }
    get city(){
        return this._city
    }
    get tagline(){
        return this._tagline
    }
    get price(){
        return this._price
    }
    get portrait(){
        return this._portrait
    }
    // get href(){
    //     return this._href
    // }
    // get link(){
    //     return`${this._href}?id=${this._id}`  
    // }
    get href(){
        return`${this._href}?id=${this._id}`  
    }
}