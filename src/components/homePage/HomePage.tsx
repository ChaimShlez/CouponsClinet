import axios from "axios";
import { useEffect, useState } from "react";
import './HomePage.css';
import { Link } from "react-router-dom";
import ICoupon from "../../models/ICoupon";
import Coupon from "../couponsComponents/Coupon";
import Coupons from "../couponsComponents/Coupon";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";
import { ActionType } from "../../redux/action-type";
import Pagination from "../pagination/Pagination";

function HomePage() {
    let [totalPages, setTotalPages] = useState(10);
    let [pageNumber, setPageNumber] = useState(1);
    const [maxPrice, setMaxPrice] = useState(600)
    const [minPrice, setMinPrice] = useState(0)
    const [openDrop, setOpenDrop] = useState(false)

    const dispatch = useDispatch();
    const coupons = useSelector((state: AppState) => state.coupons);
    const subText = useSelector((State: AppState) => State.text);
    const userType = useSelector((State: AppState) => State.user.userType);

    const onPageChange = (pageNumber: number) => {
        setPageNumber(pageNumber);
    };


    useEffect(() => {
        getCouponsByPage(pageNumber);
    }, [pageNumber]);

    async function getCouponsByPage(pageNumber: number) {

        try {

            let url = `http://localhost:8080/coupons/limitedCouponInformation?pageNumber=${pageNumber}`;

            let response = await axios.get(url);
            let coupons = response.data;

            console.log(coupons);
            dispatch({ type: ActionType.saveCoupons, payload: { coupons } });
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
    async function filterByPrice(pageNumber: number) {

        try {
            debugger
            let url = `http://localhost:8080/coupons/byPriceRange?pageNumber=${pageNumber}&maxPrice=${maxPrice}&minPrice=${minPrice}`;

            let response = await axios.get(url);
            let coupons = response.data;

            console.log(coupons);
            dispatch({ type: ActionType.saveCoupons, payload: { coupons } });
        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("filter invalid,try later")
            }
        }
    }




    return (
        <div className="HomeComponent">

            <div className="coupons-container">

                {(userType == "CUSTOMER" || !userType) && <div className="drop-down-cost" ><button className="button-cost" onClick={() => setOpenDrop(!openDrop)}>  <h6>Price Range</h6> </button>
                    <div className={openDrop ? 'price-range' : 'price-range-in-active'}>
                        <h6>Price </h6>
                        <div className="price-input">
                            <div className="field">

                                <input type="number" value={minPrice} min="0" max="600" />
                            </div>

                            <div className="field">

                                <input type="number" value={maxPrice} min="0" max="600" />
                            </div>
                        </div>
                        <div className="slider">

                        </div>
                        <div className="range-input">
                            <input type="range" className="range-max" value={maxPrice} min="0" max="600" onChange={event => setMaxPrice(+event.target.value)} onClick={() => filterByPrice(pageNumber)} />
                            <input type="range" className="range-min" value={minPrice} min="0" max="600" onChange={event => setMinPrice(+event.target.value)} onClick={() => filterByPrice(pageNumber)} />


                        </div>

                    </div>

                </div>
                }
                <div className="coupons-details">
                    {coupons.filter(coupon => {
                        if (subText === "") {
                            return true;
                        }
                        return coupon.name.trim().toLocaleLowerCase().includes(subText);
                    })

                        .map((coupon) =>
                        (<Coupon key={coupon.id} name={coupon.name} price={coupon.price} description={coupon.description}
                            startDate={coupon.startDate} endDate={coupon.endDate} imgUrl={coupon.imgUrl} companyId={coupon.companyId} companyName={coupon.categoryName}
                            categoryId={coupon.categoryId} categoryName={coupon.categoryName}

                            id={coupon.id} />))}

                </div>
            </div>
            <div className="pages">
                <div className="page-number">  <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={onPageChange} /></div>
            </div>



        </div>


    );
} export default HomePage
