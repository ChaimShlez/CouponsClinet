import { ICompany } from "../../models/ICompany";
import './Company.css';
function Company(props: ICompany) {

    return (
      <tr className='Company'>
        <td>{props.name}</td>
        <td>{props.address}</td>
        <td>{props.phoneNumber}</td>
      </tr>
    );
  } export default Company