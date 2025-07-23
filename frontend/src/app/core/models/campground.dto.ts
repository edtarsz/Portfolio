export interface ICampgroundDTO {
    _id?: string;
    title: string;
    price: string;
    description: string;
    location: string;
}

export class CampgroundDTO implements ICampgroundDTO {
    _id?: string;
    title: string;
    price: string;
    description: string;
    location: string;

    // Se reciben los datos crudos, aqui se transforman/modifican y se guardan en las propiedades de la clase
    constructor(data: ICampgroundDTO) {
        this._id = data._id;
        this.title = data.title;
        this.price = data.price;
        this.description = data.description;
        this.location = data.location;
    }
}