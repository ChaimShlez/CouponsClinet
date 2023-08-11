import React from "react";
import'./Menu.css';
import { AppState } from "../../redux/app-state";
import { useSelector } from "react-redux";


function Menu(){
    const coupons = useSelector((state: AppState) => state.coupons);
   return (
        <div className="Menu">
         coupons({coupons.length})
        
        </div>
    );
}export default Menu;