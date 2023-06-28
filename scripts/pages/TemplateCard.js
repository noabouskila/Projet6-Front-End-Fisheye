class TemplateCard{

    constructor(photo){
        this._photo = photo
    }

    get photo(){
        return this._photo
    }

    // Affiche une "card" description pour chaque photographe (nom prix photo slogan ville)
    getUserCardDOM() {
        const article = document.createElement('article');
        article.innerHTML = 
        `
        <a href=" ${this._photo.href}?id=${this._photo.id} "style="text-decoration:none">
        <article>
            <img class="portrait" src="./assets/photographers/portraitPhotographers/${this._photo.portrait}" alt="image photagraphe : ${this._photo.name}">
            <h2>${this._photo.name}</h2>
            <h3>${this._photo.city}/${this._photo.country}</h3>
            <p>${this._photo.tagline}</p>
            <span>${this._photo.price}€/jour</span>
        </article> 
        </a>
        `
        return article
    }
}