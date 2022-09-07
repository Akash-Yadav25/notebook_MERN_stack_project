import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = () => {
  const [credentials,setcredentials] = useState({name:"",email:"",password:""})

  let history = useHistory();
  const handleSubmit = async(e) =>{
    const {name , email ,password} = credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
  
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkNmM3ODYzYWUwNDk0NmNlYTgzNDljIn0sImlhdCI6MTY1ODM5MDEzMX0.KuiQg3zQ0zRxf9HehFIQngLMK0h5iUOlJjU-XWU_vv8'
        },
        body: JSON.stringify({ name,email,password })
      });
      const json = await response.json()

      console.log(json);
      if(json.success){
        //save the auth token redirect
        localStorage.setItem('token',json.authtoken);
        history.push("/");

      }else{
        alert("Alraedy exist or wrong credentials")
      }
}

const onChange = (e) =>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
}

  return (
    <div className='container my-5'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="name" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
