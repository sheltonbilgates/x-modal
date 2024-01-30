import React, { useState, useEffect, useRef } from 'react';

const Modal = () => {
  const [showForm, setShowForm] = useState(false);
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });


  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate phone number
    const phoneNumber = event.target.phone.value;
    if (!isValidPhoneNumber(phoneNumber)) {
      alert('Please enter a valid 10-digit phone number.');
      const newK = formData
      console.log(newK);
      return;
    }
    const dob = new Date(event.target.dob.value);
    if (dob > new Date()) {
      alert('Please enter a valid date of birth.');
      return;
    }
    // Proceed with form submission logic
    
    // ...
    setFormData({
        username: '',
        email: '',
        phone: '',
        dob: '',
      });
    // Example: You might want to reset the form and hide it
    setShowForm(false);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Check if the phone number has 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        
        setShowForm(false);
      }
    };

  
    document.addEventListener('click', handleClickOutside);

   
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className={`h-screen w-full flex justify-center modal ${showForm ? 'bg-gray-400' : ''}`}>
      <div className='modal-content' ref={modalRef}>

        <div className={`flex flex-col justify-center items-center mt-48 btn ${showForm ? 'hidden' : ''}`}>
          <h1 className='font-bold text-4xl'>User Details Modal</h1>
          <button onClick={() => setShowForm(true)} className='bg-blue-500 rounded w-28 h-8 mt-4 text-white'>Open Form</button>
        </div>

        {showForm && (
          <div className='w-[600px] text-center bg-white mt-12 p-8 flex flex-col justify-center items-center from-detail rounded'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center w-full'>
              <h1 className='font-bold text-2xl'>Fill Details</h1>

       
              <label htmlFor="username" className='font-bold text-xl p-4'>Username:</label>
              <input type="text" id='username' className='outline w-full'  required/>

              <label htmlFor="email" className='font-bold text-xl p-4 '>Email Address:</label>
              <input type="email" id='email' className='outline w-full' required/>

              <label htmlFor="phone" className='font-bold text-xl p-4'>Phone Number:</label>
              <input type="number" id='phone' className='outline w-full' required/>

              <label htmlFor="dob" className='font-bold text-xl p-4'>Date of Birth</label>
              <input type="date" id='dob' className='outline w-full' required/>

              <button type='submit' className='bg-blue-500 rounded w-28 h-8 mt-4 text-white'>Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
