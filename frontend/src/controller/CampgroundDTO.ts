export class CampgroundDTO implements ICampgroundDTO {
    _id?: string;
    title: string;
    price: string;
    description: string;
    location: string;

    // Recibo los datos crudos, aqui los transformo y los guardo en las propiedades de la clase
    constructor(data: ICampgroundDTO) {
        this._id = data._id;
        this.title = data.title;
        this.price = data.price;
        this.description = data.description;
        this.location = data.location;
    }
}