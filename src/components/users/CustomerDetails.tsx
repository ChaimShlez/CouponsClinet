import { useDispatch } from "react-redux";
import ICustomer from "../../models/ICustomer";
import axios from "axios";
import { ActionType } from "../../redux/action-type";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from 'react-modal';
import EditUser from "./EditUser";
import EditCustomer from "../CustomerComponents/EditCustomer";
import { FaRegEdit, FaRegSave, FaRegWindowClose } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import'./CustomerDetails.css'

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

function CustomerDetails(props: ICustomer) {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const id = props.id
    const customer: ICustomer = {
        id: props.id,
        userName: props.userName,
        firstName: props.firstName,
        lastName: props.lastName,
       address:props.address,
       phoneNumber:props.phoneNumber
      }


   
    function openModalEdit() {
        setModalIsOpen(true)
      }

      function closeModalEdit() {
        setModalIsOpen(false)
      }
    
      


    function purchasesCustomer(userId: number) {
        navigate("admin/purchasesCustomer/" + userId);


    }



    async function deleteCustomer() {

        try {

            await axios.delete(`http://localhost:8080/customers/${id}`)

            dispatch({ type: ActionType.deleteCustomer, payload: { id } });

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
        <tr className='Customer-details'>
            <td>{props.userName}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.address}</td>
            <td>{props.phoneNumber}</td>
           
          +<td>  <button className='display-details-customer' onClick={() => purchasesCustomer(props.id)}></button></td>
           
            <td><button className="edit-button" onClick={openModalEdit}> <FaRegEdit /> </button></td>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModalEdit} style={customStyles}>
                <EditCustomer closeModal={closeModalEdit} customer={customer} />
            </Modal>
            <td><button className="delete-button" onClick={deleteCustomer}> <AiOutlineDelete /> </button></td>


        </tr>
    );
} export default CustomerDetails