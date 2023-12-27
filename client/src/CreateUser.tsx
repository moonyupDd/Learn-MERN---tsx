import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
  const [name ,setName] = useState<string | undefined>(undefined)
  const [email ,setEmail] = useState<string | undefined>(undefined)
  const [age ,setAge] =  useState<number | undefined>(undefined);
  const navigate = useNavigate()

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAge(isNaN(value) ? undefined : value);
  };

  const SubmitFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("http://localhost:3000/createUser", { name, email, age })
      .then((response) => {
        navigate('/')
        // Handle successful response
        console.log(response.data); // Log the response data
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
    return (
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
          <form action="" onSubmit={SubmitFunc}>
            <h2>Add User</h2>
            <div className='mb-2'>
              <label htmlFor="">Name</label>
              <input type="text" name="" id="" placeholder='Enter Name' className='form-control'
              onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='mb-2'>
              <label htmlFor="">Email</label>
              <input type="text" name="" id="" placeholder='Enter Email' className='form-control'
              onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='mb-2'>
              <label htmlFor="">Age</label>
              <input type="text" name="" id="" placeholder='Enter Age' className='form-control'
              onChange={handleAgeChange}/>
            </div>
            <button className='btn btn-success'>Submit</button>
          </form>
        </div>
      </div>
    )
}

export default CreateUser
