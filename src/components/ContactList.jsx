import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {ContactService} from '../services/ContactService.js';
import Spinner from './Spinner.js';


function ContactList() {

  let [searchUser, setSearchUser] = useState({
    text : ''
  });

  let [state, setState] = useState({
    loading : false,
    contacts : [],
    filteredContacts: [],
    errorMessage : ''
  });

  useEffect(  () => {
    async function fetchData(){
      try {
        setState({
          ...state,
          loading : true
        });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading : false,
          contacts : response.data,
          filteredContacts: response.data
        })
      } catch (error) {
        setState({
          ...state,
          loading : false,
          errorMessage : error.message
        })
      }
    }
    fetchData();
  }, []);

  let contactdelete = async(contactId) => {
    try {
      let response  = await ContactService.deleteContact(contactId);
      if(response){
        setState({
          ...state,
          loading: true
        })
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading : false,
          contacts : response.data,
          filteredContacts: response.data
        })
      }
    } catch (error) {
      setState({
        ...state,
        loading : false,
        errorMessage : error.message
      })
    }
  }

  let getUser = (e) => {
    setSearchUser({
      ...searchUser,
      text : e.target.value
    });
    let theContact = state.contacts.filter(contact => {
      return contact.firstName.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setState({
      ...state,
      filteredContacts: theContact
    })
  }

  let {loading, contacts, errorMessage, filteredContacts}  = state;

  return (
    <React.Fragment>
        <section className="contact-search p-5">
          <div className="container">
            <div className="grid">
              <div className="row">
                <div className="col">
                  <p className="h3">
                    <Link to={'/contacts/add'} className='btn btn-primary ms-2'>
                      Click to create new user 
                      <i class="fa fa-user-plus" aria-hidden="true"></i>
                    </Link>
                  </p>
                </div>
              </div>
              <h3 className='proheading p-3'>Find the list of users below</h3>
              <div className="d-flex justify-content-center">
                <div>
                  <form className='d-flex gap-3'>
                    <div className="mb-2">
                      <input 
                        type="text" 
                        name='text'
                        value={searchUser.text}
                        onChange={getUser}
                        className="form-control" placeholder='Search by First Name' />
                    </div>
                    <div className="mb-2">
                      <input type="submit" className='btn btn-outline-dark' value="Search" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {
          loading ? <Spinner /> : <React.Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {
                  filteredContacts.length > 0 && filteredContacts.map(contact =>{
                    return(
                      <div className="col-md-6" key={contact.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <img src={contact.photo} alt="" className='img-fluid user-image'/>
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    First Name : <span className="fw-bold">{contact.firstName}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mobile : <span className="fw-bold">+{contact.mobile}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email : <span className="fw-bold">{contact.email}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'>
                                  <i className='fa fa-eye'></i>
                                </Link>
                                <Link to={`/contacts/edit/${contact.id}`} className='btn btn-warning my-1'>
                                  <i className='fa fa-pen'></i>
                                </Link>
                                <button className='btn btn-danger my-1' onClick={() => contactdelete(contact.id)}>
                                  <i className='fa fa-trash'></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </section>
          </React.Fragment>
        }

    </React.Fragment>
  )
}

export default ContactList