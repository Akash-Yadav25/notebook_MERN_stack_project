import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [credentials,setcredentials] = useState({email:"",password:""})
    let history = useHistory();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
      
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password : credentials.password })
          });
          const json = await response.json()

          console.log(json);
          if(json.success){
            //save the auth token redirect
            localStorage.setItem('token',json.authtoken);
            history.push("/");

          }else{
            alert("wrong credentials")
          }
    }

    const onChange = (e) =>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (

        

        <form onSubmit={handleSubmit}>
            <div className='container my-5'>
                <div>
                    <h3>Your Notes are her!</h3>
                </div>

                <div className="mb-3 row my-4">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" vale={credentials.password} onChange={onChange} id="password" name='password'/>
                    </div>
                </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>


            </div >
        </form >
    )
}

export default Login
