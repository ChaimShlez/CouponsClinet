import axios from "axios";
import ICategoty from "../../models/ICategory";
import './Category.css';
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppState } from "../../redux/app-state";
import Coupon from "../couponsComponents/Coupon";






function Category() {
    
    const coupons = useSelector((state: AppState) => state.coupons);
    const { categoryId } = useParams();
    let [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch();


    useEffect(() => {
        getCouponsByCategoryId(pageNumber);
    }, [pageNumber,categoryId]);


    async function getCouponsByCategoryId(pageNumber: number) {

        try {

            let url = `http://localhost:8080/coupons/byCategoryId?categoryId=${categoryId}&pageNumber=${pageNumber}`;


            let response = await axios.get(url);
            let coupons = response.data;

            console.log(coupons);

            dispatch({ type: ActionType.saveCoupons, payload: { coupons } });
        }
        catch (e) {
            console.log(e);
            alert("Falid to retrieve coupons ");
        }

    }
    return (
        <div className='Category' >
            <div className="coupon">
                {coupons.map((coupon) =>
                (<Coupon key={coupon.id} name={coupon.name} price={coupon.price} imgUrl={coupon.imgUrl}

                id={coupon.id} description={coupon.description} startDate={coupon.startDate} endDate={coupon.endDate}companyId={coupon.companyId} companyName={coupon.companyName} categoryId={coupon.categoryId} categoryName={coupon.categoryName} />))}
            </div>
        </div>
    );
} export default Category