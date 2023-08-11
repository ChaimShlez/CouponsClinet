import { useState } from "react";
import ICustomer from "../../models/ICustomer";
import axios from "axios";
import { ActionType } from "../../redux/action-type";
import { useDispatch } from "react-redux";
import { VscSaveAs } from "react-icons/vsc";

interface IEditCustomer {
    closeModal(): void
    
    customer:ICustomer
}

function EditUser(props: IEditCustomer) {

    const [id, setId] = useState(props.customer.id)
    const [userName, setUserName] = useState(props.customer.userName);
    const [firstName, setFirstName] = useState(props.customer.firstName);
    const [lastName, setLastName] = useState(props.customer.lastName);
    const [address, setAddress] = useState(props.customer.address);
    const [phoneNumber, setPhoneNumber] = useState(props.customer.phoneNumber);
    
   
    const dispatch = useDispatch();

   

   


    async function updateCustomer() {

        try {
          
            await axios.put("http://localhost:8080/customers", {
                user: {
                    userName,
                    firstName,
                    lastName,
                },
               
                address,
                phoneNumber

            }
            );
            const customer: ICustomer = {
                id: id,
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phoneNumber: phoneNumber,
               
            }
            dispatch({ type: ActionType.updateCustomer, payload: { customer } });
            props.closeModal();


        }catch (e: any) {
            console.error(e);
            if (e.response?.data?.error?.massage) {
                alert(e.response.data.error.massage)
            } else {
                alert("Login invalid,try later")
            }
        }
    }


    return (
        <div className="EditUser">
            <div className="wrapper" >
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.customer.userName} onChange={event => setUserName(event.target.value)} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.customer.firstName} onChange={event => setFirstName(event.target.value)} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.customer.lastName} onChange={event => setLastName(event.target.value)} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.customer.address} onChange={event => setAddress(event.target.value)} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.customer.phoneNumber} onChange={event => setPhoneNumber(event.target.value)} />
                </div>
                






                <div className="options-buttons" >
                    <button className="save-edit-coupon-button" onClick={updateCustomer}><VscSaveAs /></button>
                </div>

            </div>
        </div>
    );
} export default EditUser