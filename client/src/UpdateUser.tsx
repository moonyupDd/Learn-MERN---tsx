import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUser: React.FC = () => {
  const { id } = useParams()
  const [name, setName] = useState<string | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [age, setAge] =  useState<number | undefined>(undefined)
  const navigate = useNavigate()

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setAge(isNaN(value) ? undefined : value)
  }

  useEffect(() =>{
    axios.get('http://localhost:3001/getUser/'+id)
      .then((result) => {
        console.log(result)
        setName(result.data.name)
        setEmail(result.data.email)
        setAge(result.data.age)
      })
      .catch(err => console.log(err))
  }, [])

  const Update = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.put("http://localhost:3000/updateUser/"+id, { name, email, age })
      .then((response) => {
        navigate('/')
        // Handle successful response
        console.log(response.data) // Log the response data
      })
      .catch((error) => {
        // Handle error
        console.error(error)
      })
  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
      <form action="" onSubmit={Update}>
        <h2>Update User</h2>
        <div className='mb-2'>
          <label htmlFor="">Name</label>
          <input type="text" name="" id="" placeholder='Enter Name' className='form-control'
          value={name || ''} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='mb-2'>
          <label htmlFor="">Email</label>
          <input type="text" name="" id="" placeholder='Enter Email' className='form-control'
          value={email || ''} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='mb-2'>
          <label htmlFor="">Age</label>
          <input type="text" name="" id="" placeholder='Enter Age' className='form-control'
          value={age || ''} onChange={handleAgeChange}/>
        </div>
        <button className='btn btn-success'>Update</button>
      </form>
    </div>
    </div>
  )
}

export default UpdateUser


