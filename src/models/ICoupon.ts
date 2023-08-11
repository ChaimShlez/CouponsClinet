export default interface ICoupon{
    id:number;
    name:string;
    price:number;
    description:string;
    startDate:string;
    endDate:string;
    imgUrl:string;
    companyId?:number;
    companyName?:string;
    categoryId?:number;
    categoryName:string;
}
