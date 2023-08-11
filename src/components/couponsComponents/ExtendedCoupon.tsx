import React, { useEffect, useState } from 'react'
import ICoupon from '../../models/ICoupon';
import Coupons from './Coupon';
import axios from 'axios';
import './ExtendedCoupon.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AppState } from '../../redux/app-state';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../redux/action-type';
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from 'react-modal';
import Edit from '../editComponent/Edit';

const customStyles = {
    content: {
        top: '60%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        borderRadius: '10px',
    border: '2px solid rgb(197, 168, 189)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 0 35px rgb(210, 187, 198)',
    height: '50%',
    width: '30%',
    },
};
Modal.setAppElement('#root');



function ExpendedCoupon() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: AppState) => state.user);
  
    const [coupon, setCoupon] = useState<ICoupon>({ id: 0, name: '', price: 0, description: '', startDate: '', endDate: '', imgUrl: '',companyId: 0, companyName: '' , categoryId: 0, categoryName: ''})
    const { couponId } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [amount,setAmount]=useState(1)

    function openModalEdit() {
        setModalIsOpen(true)
    }
    function closeModalEdit() {
        setModalIsOpen(false)
    }
    function editCoupon(coupon:ICoupon){
        setCoupon(coupon)

    }


    function openModal() {
        dispatch({ type: ActionType.modalLogin });
    }
    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const quantity = +event.target.value
        setAmount(quantity)

        
    };

   


   

    function buyCoupon() {

        if (user.userType === 'CUSTOMER') {
          BuyClicked();
        }
        else {
            openModal();
        }

    }
    async function BuyClicked() {
        try {
            debugger
            const response = await axios.post("http://localhost:8080/purchases", {
                coupon:{
                    id:couponId
                 },
                customer:{
                   
                },
               amount
            }
            );
            navigate("/");
          
            console.log(response);
        } catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("buy invalid,try later")
            }
        }
    }
    useEffect(() => {
        getCouponById();
    }, []);

    async function getCouponById() {

        try {

            let url = `http://localhost:8080/coupons/${couponId}`;

            let response = await axios.get(url);
            let coupon = response.data;
            setCoupon(coupon)

            console.log(coupon);

           

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
    async function deleteCoupon() {

        try {

            await axios.delete(`http://localhost:8080/coupons/${couponId}`)



        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("delete invalid,try later")
            }
        }
        navigate('account/')
    }
    return (
        <div className="ExtendedCoupon">
            <div className='extended-container'>
                <div className='imgBox'> <img src={coupon.imgUrl} className='img' alt="" />

                </div>
                <div className='informatoin-box'>
                    <div className='informatoin'>
                        <div className='details-coupon'>
                            <span className='coupon'> Name:</span><span className='coupon'>{coupon.name}</span>
                        </div>
                        <div className='details-coupon'>
                            <span className='coupon'> Price:</span><span className='coupon'>{coupon.price}</span>
                        </div>
                        <div className='details-coupon'>
                            <span className='coupon'>Description:</span><span className='coupon'>{coupon.description}</span>
                        </div>
                        
                        <div className='details-coupon'>
                            <span className='coupon'>Expire:</span><span className='coupon'>{new Date(coupon.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className='details-coupon'>
                            <span className='coupon'> Company name:</span><span className='coupon'>{coupon.companyName} </span>
                        </div>
                        <div className='details-coupon'>
                            <span className='coupon'>Category name:</span><span className='coupon'>{coupon.categoryName}</span>
                        </div>
                    </div>

                    <div className='buttons'>
                        {user.userType == "CUSTOMER" && <div>

                            <label className="amount">Amount of purchase:</label>
                            <select className="cars" onChange={handleQuantityChange} >
                                <option value=" 1">Quantity 1   price = {coupon.price * 1}</option>
                                <option value=" 2">Quantity 2   price = {coupon.price * 2}</option>
                                <option value=" 3">Quantity 3   price = {coupon.price * 3}</option>
                                <option value=" 4">Quantity 4   price = {coupon.price * 4}</option>
                            </select>


                        </div>}
                        <div className='button-buy'>
                            {(user.userType=='CUSTOMER' ||!user.userType) && <input className='button' type="button" value="Buy" onClick={buyCoupon} />}

                            <div className='buttons-admin'>
                                {user.userType == "ADMIN" && < button className='edit' onClick={() => openModalEdit()}> <BiEditAlt /> </button>}

                                <Modal isOpen={modalIsOpen} onRequestClose={closeModalEdit} style={customStyles}>
                                    <Edit closeModal={closeModalEdit} coupon ={coupon} setCoupon ={setCoupon} />
                                </Modal>
                                {user.userType == "ADMIN" && < button className='delete' onClick={() => deleteCoupon()}> <AiOutlineDelete /> </button>}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    );
} export default ExpendedCoupon


