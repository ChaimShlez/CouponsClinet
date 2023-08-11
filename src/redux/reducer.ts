import Coupon from "../components/couponsComponents/Coupon";
import ICoupon from "../models/ICoupon";
import IUser from "../models/IUser";
import { Action } from "./action";
import { ActionType } from "./action-type";
import { AppState } from "./app-state";

let initialAppState = new AppState();
export function reduce(oldAppState: AppState = initialAppState, action: Action): AppState {

    const newAppState = { ...oldAppState };

    switch (action.type) {


        case ActionType.saveCoupons:

            newAppState.coupons = action.payload.coupons;
            break;

        case ActionType.saveUser:
            newAppState.user = action.payload.successfulLoginData;
            break;
        
        case ActionType.saveCustomer:

            newAppState.customer = action.payload.customer;
            break;

        case ActionType.saveCategories:

            newAppState.categories = action.payload.categories;
            break;
        case ActionType.saveSubText:


            newAppState.text = action.payload.subText;

            break;
        case ActionType.modalLogin:
            newAppState.modalLoginOpen = !newAppState.modalLoginOpen;

            break;

        case ActionType.modalRegister:

            newAppState.modalRegisterOpen = !newAppState.modalRegisterOpen;
            break;
        case ActionType.saveCoupon:
            newAppState.coupon = action.payload.coupon;

            break;

        case ActionType.saveAmount:
            newAppState.amount = action.payload.quantity;
            break;

        case ActionType.savePurchases:
            newAppState.purchases = action.payload.purchases;
            break;

        case ActionType.saveUsers:
            newAppState.users = action.payload.users;
            break;

        case ActionType.deleteUser:
            let userId = action.payload.userId;

            newAppState.users = newAppState.users.filter((user) => user.id != userId);

            break;
        case ActionType.deleteCustomer:
            let id = action.payload.id;

            newAppState.customers = newAppState.customers.filter((customer) => customer.id != id);

            break;
            case ActionType.deleteCoupon:
                let couponId= action.payload.couponId;
    
                newAppState.coupons = newAppState.coupons.filter((coupon) => coupon.id != couponId);
    
                break;

        case ActionType.updateUser:

            const updatedUser = action.payload.user;
            const userIndex = newAppState.users.findIndex((user) => user.id === updatedUser.id);

            if (userIndex !== -1) {

                newAppState.users[userIndex] = updatedUser;

                newAppState.users = [...newAppState.users];
                
            }
            break;
            case ActionType.updateCustomer:

            const updatedCustomer = action.payload.customer;
            const customerIndex = newAppState.customers.findIndex((customer) => customer.id === updatedCustomer.id);

            if (customerIndex !== -1) {

                newAppState.customers[customerIndex] = updatedCustomer;

                newAppState.customers = [...newAppState.customers];
            
            }
            break;
            
            case ActionType.updateCoupon:

            const updatedCoupon = action.payload.coupon;
            const couponIndex = newAppState.coupons.findIndex((coupon) => coupon.id === updatedUser.id);

            if (couponIndex  !== -1) {

                newAppState.coupons[couponIndex ] = updatedCoupon;

                newAppState.coupons = [...newAppState.coupons];
                
            }
            break;
    }
    return newAppState;
}

