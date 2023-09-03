import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes , Route , Navigate } from 'react-router-dom';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import ViewContact from './components/ViewContact';
import Spinner from './components/Spinner';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}/>
        <Route path='/contacts/list' element={<ContactList/>} />
        <Route path='/contacts/add' element={<AddContact/>} />
        <Route path='/contacts/edit/:contactId' element={<EditContact/>} />
        <Route path='/contacts/view/:contactId' element={<ViewContact/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
