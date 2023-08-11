import ICategoty from "../models/ICategory";
import ICoupon from "../models/ICoupon";
import ICustomer from "../models/ICustomer";
import IPurchases from "../models/IPurchases";
import ISuccessfulLoginData from "../models/ISuccessfulLoginData";
import IUser from "../models/IUser";

export class AppState {
    public coupons: ICoupon[] = [];

    
    public user: ISuccessfulLoginData = {
        id: 0,
        companyId: 0,
        firstName: "",
        lastName: "",
        userType: ""
    };
   
    public customer: ICustomer = {
        id: 0,
        address: "",
        phoneNumber: ""
    }
    public customers:ICustomer[]=[]
    public categories: ICategoty[] = [];

    public text: string = "";

   public coupon:ICoupon={
       id: 0,
       name: "",
       price: 0,
       description: "",
       startDate: "",
       endDate: "",
       imgUrl: "",
        companyId:0,
       companyName: "",
       categoryId: 0,
       categoryName: "",
      
   }
   public modalLoginOpen:boolean=false;

   public modalRegisterOpen:boolean=false;

   public amount:number=0;
   
   public purchases:IPurchases[] = [];

   public users:IUser[]=[];

}