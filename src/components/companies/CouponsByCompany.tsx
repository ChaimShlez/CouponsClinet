import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import axios from "axios";
import { ActionType } from "../../redux/action-type";
import CouponByCompany from "./CouponByCompany";
import'./CouponsByCompany.css';
import Pagination from "../pagination/Pagination";

function CouponsByCompany() {
    const companyId = useSelector((state: AppState) => state.user.companyId);
    let [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch();
    const coupons = useSelector((state: AppState) => state.coupons);
    let [totalPages, setTotalPages] = useState(10);
    
    const onPageChange = (pageNumber: number) => {
        setPageNumber(pageNumber);
    };



    
    useEffect(() => {
        getAllcouponsByCompany(pageNumber);
    }, [pageNumber]);

    function onNextClicked() {
        pageNumber++;
        setPageNumber(pageNumber);
    }

    function onBackClicked() {
        pageNumber--;
        setPageNumber(pageNumber);
    }

    async function getAllcouponsByCompany(pageNumber: number) {

        try {

            let url = `http://localhost:8080/coupons/byCompanyId?pageNumber=${pageNumber}&companyId=${companyId}`;

            let response = await axios.get(url);
            let coupons = response.data;
            dispatch({ type: ActionType.saveCoupons, payload: { coupons } });
           debugger
        
        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("Get invalid,try later")
            }
        }
    }
   
    return (
        <div className='Coupons-customer'>
            <div className='coupons-container'>
                
                 <table>
                    <tr>
                    <th> Name</th>
                        <th>Price</th>
                        
                        <th> description</th>
                        <th>startDate</th>
                        <th>endDate</th>
                        <th>imgUrl</th>
                        <th> categoryName</th>
                       




                    </tr>


                    {coupons.map((coupon) =>
                       ( <CouponByCompany key={coupon.id} name={coupon.name} price={coupon.price}
                            description={coupon.description} startDate={coupon.startDate} endDate={coupon.endDate} 
                           imgUrl={coupon.imgUrl} companyId={coupon.companyId} companyName={coupon.companyName}
                            categoryId={coupon.categoryId} categoryName={coupon.categoryName}  id={coupon.id} />))}
                </table>
                
              

            </div>

            <div className="pages">
                <div className="page-number">  <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={onPageChange} /></div>
            </div>
        </div>
    );
} export default CouponsByCompany