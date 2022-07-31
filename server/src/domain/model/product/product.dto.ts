

export class ProductDTO {
    //_id: holds an ObjectId.
    readonly sku:  String;
    readonly barcode:  String;
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly category: string;
    readonly type: string;
    readonly brand: string;
    readonly color: string;
    readonly model: string;
    readonly gender: string;
    readonly size: string;
    readonly price: number;
    readonly stock: number;
};