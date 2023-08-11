import React, { useEffect, useState } from "react";
import ICoupon from "../../models/ICoupon";
import { log } from "console";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AppState } from "../../redux/app-state";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import ICategoty from "../../models/ICategory";

interface IEdit {
    closeModal():void ;
     coupon:ICoupon ;
     setCoupon(coupon:ICoupon):void
   
    }

    

function Edit(props:IEdit ) {
    const userType = useSelector((state: AppState) => state.user.userType);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let categories = useSelector((state: AppState) => state.categories);
   const[id,setId]=useState(props.coupon.id)
    const [name, setName] = useState(props.coupon.name);

    const [price, setPrice] = useState(props.coupon.price);
    const [description, setDescription] = useState(props.coupon.description);
    const [startDate, setStartDate] = useState(props.coupon.startDate);
    const [endDate, setEndDate] = useState(props.coupon.endDate);
    const [imgUrl, setImgUrl] = useState(props.coupon.imgUrl);
    const [companyId,setCompanyId]=useState(props.coupon.companyId)
    const [companyName,setCompanyName]=useState(props.coupon.companyName)
    const [categoryName, setCategoryName] = useState(props.coupon.categoryName);
    const [categoryId, setCategoryID] = useState(props.coupon.categoryId);

    
    
    const handleCategorySelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        const selectedCategory = +event.target.value;
        setCategoryID(selectedCategory);
      };
      
   
    async function getCouponById() {

        try {

            let url = `http://localhost:8080/coupons/${id}`;

            let response = await axios.get(url);
            let coupon = response.data;

            console.log(coupon);

            dispatch({ type: ActionType.saveCoupon, payload: { coupon } });

        }
        catch (e) {
            console.log(e);
            alert("Falid to retrieve coupons ");
        }
    }





    async function updateCoupon() {
       
        try {
            await axios.put("http://localhost:8080/coupons", {
                id,
                name,
                price,
                description,
                startDate,
                endDate,
                imgUrl,
                category: {
                    id: categoryId
                },
                company: {
                    id:companyId

                }
            }
            );
            const coupon:ICoupon= {
                id:id,
                name:name,
                price: price,
                description: description,
                startDate: startDate,
                endDate: endDate,
                imgUrl: imgUrl,
                 companyId:companyId,
                companyName: companyName,
                categoryId: categoryId,
                categoryName: categoryName,
               
            }
           props.setCoupon(coupon)
          
           
            props.closeModal();
            navigate('/admin/')

        } catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("Login invalid,try later")
            }
        }
    }

    return (
        <div className="EditCouponContainer">
            <div >
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.coupon.name} onChange={event => setName(event.target.value)} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="number" defaultValue={props.coupon.price} onChange={event => setPrice(parseInt(event.target.value))} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.coupon.description} onChange={event => setDescription(event.target.value)} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="date" defaultValue={new Date(props.coupon.startDate).toISOString().slice(0, 10)} onChange={event => setStartDate((event.target.value))} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="date" defaultValue={new Date(props.coupon.endDate).toISOString().slice(0, 10)} onChange={event => setEndDate((event.target.value))} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.coupon.imgUrl} onChange={event => setImgUrl(event.target.value)} />
                </div>
                <div className='form-text-box'>
                {userType=="ADMIN"&& <input id='filling-box' type="text" defaultValue={props.coupon.companyName}  />}    
                </div>
                <div className='form-text-box'>
                <select
                id="categories"
                defaultValue={props.coupon.categoryName}
                onChange={handleCategorySelectChange}
              >
                {categories.map((category) => (<option value={category.id}>{category.name}</option>))}
              </select>
                </div>

                <div className="options-buttons" >
                    <input className="save-edit-coupon-button" type="button" value="save" onClick={updateCoupon} />
                    </div>

            </div>

        </div>
    );

} export default Edit;
