export class CatalogDTO {
    //_id: holds an ObjectId.
    readonly sku:  String;
    readonly name: string;
    readonly description: string;
    readonly images: string[];
    readonly category: string;
    readonly grossPrice: number;
    readonly stock: number;
};


