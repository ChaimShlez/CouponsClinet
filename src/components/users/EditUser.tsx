import React, { useEffect, useState } from "react";
import IUser from "../../models/IUser";
import axios from "axios";
import { ICompany } from "../../models/ICompany";
import { VscSaveAs } from "react-icons/vsc";
import { ActionType } from "../../redux/action-type";
import { useDispatch } from "react-redux";
import ICustomer from "../../models/ICustomer";



interface IEditUser {
    closeModal(): void
    user: IUser
    
}

function EditUser(props: IEditUser) {

    const [id, setId] = useState(props.user.id)
    const [userName, setUserName] = useState(props.user.userName);
    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [type, setType] = useState(props.user.type);
    const [companyName, setCompanyName] = useState(props.user.companyName);
    const [companyId, setCompanyId] = useState(props.user.companyId);
    const dispatch = useDispatch();

    const handleCompanySelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedCompany = +event.target.value;
        setCompanyId(selectedCompany)
    };

    const handleTypeSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedType = event.target.value;
        setType(selectedType)
    };


    async function updateUser() {

        try {
          
            await axios.put("http://localhost:8080/users", {
                id,
                userName,
                firstName,
                lastName,
                type,
                company: {

                }

            }
            );
            const user: IUser = {
                id: id,
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                type: type,
                companyId: companyId,
                companyName:companyName
            }
            dispatch({ type: ActionType.updateUser, payload: { user } });
            props.closeModal();


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
        <div className="EditUser">
            <div className="wrapper" >
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.user.userName} onChange={event => setUserName(event.target.value)} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.user.firstName} onChange={event => setFirstName(event.target.value)} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.user.lastName} onChange={event => setLastName(event.target.value)} />
                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.user.type} />

                </div>
                <div className='form-text-box'>
                    <input id='filling-box' type="text" defaultValue={props.user.companyName} />

                </div>






                <div className="options-buttons" >
                    <button className="save-edit-coupon-button" onClick={updateUser}><VscSaveAs /></button>
                </div>

            </div>
        </div>
    );
} export default EditUser