import React, { useState , useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { ContactService } from '../services/ContactService';
import {Country, State} from "country-state-city";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

export default function EditContact() {

  let countryList = Country.getAllCountries();

  let navigate = useNavigate();

  let {contactId} = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {
      firstName: '',
      lastName: '',
      photo: '',
      mobile: '',
      email: '',
      zipcode: '',
      country: '',
      states: '',
      address1: '',
      address2: ''
    },
    errorMessage: ''    
  });

  useEffect(() => {
    async function updateData(){
      try {
        setState({
          ...state,
          loading: true
        })
        let response = await ContactService.getSingleContact(contactId);
        setState({
          ...state,
          loading: false,
          contact: response.data
        })
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message
        })
      }
    }
    updateData();
  }, [contactId]);

  let updateData = (e) => {
    setState({
      ...state,
      contact:{
        ...state.contact,
        [e.target.name] : e.target.value
      }
    })
  }

  let createForm = async(e) => {
    e.preventDefault();
    try {
      let response = await ContactService.updateContact(state.contact, contactId);
      if(response){
        navigate('/contacts/list',{replace: true});
      }
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message
      });
      navigate(`/contacts/edit/${contactId}`,{replace: false})
    }
  }

  let {loading, contact, errorMessage} = state;

  let countryCode = contact.country;

  const [phonenum, setphonenum] = useState('');
  const [valid, setvalid] = useState(true);

  let handleCh = (val) => {
    contact.mobile = val;
    setphonenum(val);
    setvalid(validatePhNum(val))
    
  }

  let validatePhNum = (mobnum) => {
    const mobPattern = /^\d{12}$/;
    return mobPattern.test(mobnum)
  }

  return (
    <React.Fragment>
        <section className="add-contact p-5">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h4 text-primary fw-bold">Edit Contact</p>

              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-4">
                <form onSubmit={createForm}>
                  <div className="mb-2">
                    <input 
                      required={true}
                      minlength="5"
                      type="text" 
                      name='firstName'
                      value={contact.firstName}
                      onChange={updateData}
                      className="form-control" placeholder='First Name' />
                  </div>
                  <div className="mb-2">
                    <input 
                      required={true}
                      minlength="5"
                      type="text" 
                      name='lastName'
                      value={contact.lastName}
                      onChange={updateData}
                      className="form-control" placeholder='Last Name' />
                  </div>
                  <div className="mb-2">
                    <input type="text" 
                    name='photo'
                    value={contact.photo}
                    onChange={updateData}
                    className="form-control" placeholder='UserIcon link' />
                  </div>
                  <div className="mb-2">
                    <PhoneInput 
                        country={'us'}
                        name='mobile'
                        value={contact.mobile}
                        onChange={handleCh}
                        placeholder='Mobile' />
                        {!valid && <p className='errorText'>Please enter valid 10-digit number</p>}
                  </div>
                  <div className="mb-2">
                    <input type="email" 
                    name='email'
                    value={contact.email}
                    onChange={updateData}
                    className="form-control" placeholder='Email' />
                  </div>
                  <div className="mb-2">
                    <input type="text"
                      required={true}
                      name='address1'
                      value={contact.address1}
                      onChange={updateData}
                      className='form-control'
                      placeholder='enter address-1'
                      />
                  </div>
                  <div className="mb-2">
                    <input type="text"
                      name='address2'
                      value={contact.address2}
                      onChange={updateData}
                      className='form-control'
                      placeholder='enter address-2'
                      />
                  </div>
                  <div className="mb-2">
                    <input 
                      type="text" 
                      name="zipcode"
                      required={true}
                      value={contact.zipcode}
                      onChange={updateData}
                      className='form-control'
                      pattern='\d{5,5}(-\d{4,4})?'
                      placeholder='Zipcode'
                      />
                  </div>
                  <div className="mb-2">
                    <select
                      name='country'
                      value={contact.country}
                      onChange={updateData}
                      className='form-control'>
                      <option value="">Select your Country</option>
                      {
                        countryList.map(cot => {
                            return(
                              <option key={cot.isoCode} value={cot.isoCode}>{cot.isoCode} / {cot.name}</option>
                            )
                          })
                      }
                    </select>
                  </div>
                  <div className="mb-2">
                    <select
                      name='states'
                      value={contact.states}
                      onChange={updateData}
                      className='form-control'>
                      <option value="">Select your State</option>
                      {
                        State.getStatesOfCountry(countryCode).map(stn => {
                            return(
                              <option key={stn.name} value={stn.name}>{stn.name}</option>
                            )
                          })
                      }
                    </select>
                  </div>
                  <div className="mb-2 d-flex gap-2">
                    <input type="submit" className="btn btn-primary" value="Update" />
                    <Link to={'/contacts/list'} className='btn btn-dark'>Close</Link>
                  </div>

                </form>
              </div>

              <div className="col-md-6">
                <img src={contact.photo} alt="" className='img-fluid user-image'/>
              </div>
            </div>
          </div>
        </section>
    </React.Fragment>
  )
}
