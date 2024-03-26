import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addContact = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/contacts', {
        name,
        email,
        phone
      });
      setContacts([...contacts, response.data]);
      setName('');
      setEmail('');
      setPhone('');
      setSuccessMessage('Contact added successfully.');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error('Error adding contact:', error);
      setErrorMessage('Failed to add contact. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Contact Manager</h1>
      <form onSubmit={addContact}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="tel" className="form-control" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Contact</button>
      </form>
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      
    </div>
  );
}

export default App;
