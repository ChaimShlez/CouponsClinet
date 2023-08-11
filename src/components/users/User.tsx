import React, { useState } from 'react'
import IUser from '../../models/IUser';
import './User.css';
import { FaRegEdit, FaRegSave, FaRegWindowClose } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { ActionType } from '../../redux/action-type';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import EditUser from './EditUser';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ICustomer from '../../models/ICustomer';


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



function User(props: IUser) {
  
 
  const dispatch = useDispatch();
  
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [pageNumber, setPageNumber] = useState(1);
  const userId = props.id

  const user: IUser = {
    id: props.id,
    userName: props.userName,
    firstName: props.firstName,
    lastName: props.lastName,
    type: props.type,
    companyName: props.companyName,
    companyId: props.companyId

  }


  function openModalEdit() {
    

    setModalIsOpen(true)
  }
  function closeModalEdit() {
    setModalIsOpen(false)
  }

  

  
  async function deleteUser() {

    try {

      await axios.delete(`http://localhost:8080/users/${userId}`)

      dispatch({ type: ActionType.deleteUser, payload: { userId } });

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
    <tr className='User'>
      <td>{props.userName}</td>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      
      <td>{props.companyName}</td>
      <td><button className="edit-button" onClick={openModalEdit}> <FaRegEdit /> </button></td>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModalEdit} style={customStyles}>
        <EditUser closeModal={closeModalEdit} user={user} />
      </Modal>
      <td><button className="delete-button" onClick={deleteUser}> <AiOutlineDelete /> </button></td>


    </tr>
  );
} export default User