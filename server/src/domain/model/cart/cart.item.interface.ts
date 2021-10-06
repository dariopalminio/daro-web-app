export interface ICartItem{
    itemNumber: number; //item number or position id
    productId: string; //_id: holds an ObjectId.
    productName: string;
    price: number;
    quantity: number; //{ type: String, required: true },
    itemAmount: number;
};
