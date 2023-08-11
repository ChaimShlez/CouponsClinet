import axios from "axios";
import { useEffect, useState } from "react";
import { IPurchasesCompany } from "../../models/IPurchasesCompany";
import CustomersPurchase from "./CustomersPurchaseByCompany";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import './CustomersPurchasesByCompany.css';
import CustomersPurchaseByCompany from "./CustomersPurchaseByCompany";
import Pagination from "../pagination/Pagination";

function CustomerPurchasesByCompany() {
    const companyId = useSelector((state: AppState) => state.user.companyId);
    let [pageNumber, setPageNumber] = useState(1);
   const[purchases,setPurchases]=useState<IPurchasesCompany[]>([])
   let [totalPages, setTotalPages] = useState(10);
   
   const onPageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
};



    
    useEffect(() => {
        getAllPurchasesByCompany(pageNumber);
    }, [pageNumber]);

    function onNextClicked() {
        pageNumber++;
        setPageNumber(pageNumber);
    }

    function onBackClicked() {
        pageNumber--;
        setPageNumber(pageNumber);
    }

    async function getAllPurchasesByCompany(pageNumber: number) {

        try {

            let url = `http://localhost:8080/purchases/getPurchaseByCompanyId?pageNumber=${pageNumber}&companyId=${companyId}`;

            let response = await axios.get(url);
            let purchases = response.data;
            setPurchases(purchases)
           debugger
        
        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("get invalid,try later")
            }
        }
    }
   
    return (
        <div className='Customers-purchases'>
            <div className='purchases-container'>
                
                 <table>
                    <tr>
                    <th>Coupon name</th>
                        <th>Full name</th>
                        <th>Address</th>
                        <th>Phone number</th>
                        <th>Order date</th>
                        <th>amount</th>
                    </tr>
                    {purchases.map((purchase) =>
                       ( <CustomersPurchaseByCompany key={purchase.id} firstName={purchase.firstName} lastName={purchase.lastName}
                            address={purchase.address} phoneNumber={purchase.phoneNumber} couponName={purchase.couponName} 
                            timestamp={purchase.timestamp} amount={purchase.amount} id={purchase.id} />))}
                </table>
                
              

            </div>

            <div className="pages">
                <div className="page-number">  <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={onPageChange} /></div>
            </div>
        </div>
    );
} export default CustomerPurchasesByCompany