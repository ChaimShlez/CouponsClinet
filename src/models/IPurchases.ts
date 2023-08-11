export default interface IPurchases {
    id: number;
    couponId: number;
    couponName: string;
    description: string;
    price: number;
    startDate?: string;
    endDate?: string;
    timestamp: string;
    amount: number;
    imgUrl?:string;
    firstName?:string;
    lastName?:string;
    address?:string;
    phoneNumber?:string
}


