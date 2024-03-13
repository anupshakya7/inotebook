import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
  const history = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {name,email,password} =credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem("token",json.authtoken);
      history("/");
      props.showAlert("Account Created Successfully","success");
    }else{
      props.showAlert("Invalid Credentials","danger");
    }
    
  }

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }
  return (
    <div className='container'>
       <form className="card p-3 mt-5" onSubmit={handleSubmit}>
                <h3>Signup</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} name="name" id="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} name="email" id="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Signup
