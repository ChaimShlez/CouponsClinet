import React, { useState } from 'react';
import ICoupon from '../../models/ICoupon';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import axios from 'axios';
import { ActionType } from '../../redux/action-type';
import Modal from 'react-modal';
import Edit from '../editComponent/Edit';
import { FaRegEdit, FaRegSave, FaRegWindowClose } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import './CouponByCompany.css';


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
        boxShadow: '0 0 35px rgb(0, 0,0)',
        height: '50%',
        width: '30%',
    },
};
Modal.setAppElement('#root');
function CouponByCompany(props: ICoupon) {


    const [categoryId, setCategoryID] = useState(props.categoryId);

    let categories = useSelector((state: AppState) => state.categories);
    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [pageNumber, setPageNumber] = useState(1);
    const couponId = props.id


    const handleCategorySelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        const selectedCategory = +event.target.value;
        setCategoryID(selectedCategory);
      };
      
      const coupon:ICoupon= {
        id:props.id,
        name:props.name,
        price:props.price,
        description:props.description,
        startDate:props.startDate,
        endDate:props.endDate,
        imgUrl:props.imgUrl,
         companyId:props.companyId,
        companyName:props.companyName,
        categoryId:props.categoryId,
        categoryName:props.categoryName,
       
    }


    function openModalEdit() {


        setModalIsOpen(true)
    }
    function closeModalEdit() {
        setModalIsOpen(false)
    }




    async function deleteUser() {

        try {

            await axios.delete(`http://localhost:8080/coupons/${couponId}`)

            dispatch({ type: ActionType.deleteCoupon, payload: {couponId} });

        }
        catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("delete invalid,try later")
            }
        }

    }

    return (
        <tr className='Coupon-by-company'>
            <td>{props.name}</td>
            <td>{props.price}</td>
            <td>{props.description}</td>
            <td>{new Date(props.startDate).toLocaleDateString()}</td>
            <td>{new Date(props.endDate).toLocaleDateString()}</td>
            <td className='img-box'><img className='img' src={props.imgUrl}  alt="" /></td>
           

            <td> <select
                id="categories"
                defaultValue={props.categoryName}
                onChange={handleCategorySelectChange}
            >
                {categories.map((category) => (<option value={category.id}>{category.name}</option>))}
            </select></td>

            
            <td><button className="edit-button" onClick={openModalEdit}> <FaRegEdit /> </button></td>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModalEdit} style={customStyles}>
                <Edit  closeModal={closeModalEdit} coupon={coupon}  setCoupon ={()=>(null)}/>
            </Modal>
            <td><button className="delete-button" onClick={deleteUser}> <AiOutlineDelete /> </button></td>


        </tr>
    );

} export default CouponByCompany