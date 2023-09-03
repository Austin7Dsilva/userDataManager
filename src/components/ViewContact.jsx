import React,{useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import { ContactService } from '../services/ContactService';
import Spinner from './Spinner';

function ViewContact() {

  let {contactId} = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage : ''
  });

  useEffect(() => {
    async function fetchSingleData(){
      try {
        setState({
          ...state,
          loading: true
        });
        let response = await ContactService.getSingleContact(contactId);
        setState({
          ...state,
          loading: false,
          contact: response.data
        })
        console.log(contact);
      } catch (error) {
        setState({
          ...state,
          loading : false,
          errorMessage : error.message
        })
      }
    }
    fetchSingleData();
  }, [contactId]);

  let {loading, contact, errorMessage} = state;

  return (
    <React.Fragment>
        <section className="view-contact-head p-5">
          <div className="container">
            <div className="row">
              <p className="h3 text-warning">User Info</p>
            </div>
          </div>
        </section>
        {
          loading ? <Spinner /> : <React.Fragment>
            {
              Object.keys(contact).length > 0 && 
              <section className="view-contact-body mt-3">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <img src={contact.photo} alt="" className='img-fluid user-image'/>
                    </div>
                    <div className="col-md-8">
                    <ul className="list-group">
                                <li className="list-group-item list-group-item-action">
                                  First Name : <span className="fw-bold">{contact.firstName}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Last Name : <span className="fw-bold">{contact.lastName}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Mobile : <span className="fw-bold">+{contact.mobile}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Email : <span className="fw-bold">{contact.email}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Adress-1 : <span className="fw-bold">{contact.address1}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Address-2 : <span className="fw-bold">{contact.address2}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Zipcode : <span className="fw-bold">{contact.zipcode}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Country and State : <span className="fw-bold">{contact.states}, {contact.country}</span>
                                </li>
                              </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Link to={'/contacts/list'} className='btn btn-warning'>Back</Link>
                    </div>
                  </div>
                </div>
              </section>
            }
          </React.Fragment>
        }
    </React.Fragment>
  )
}

export default ViewContact