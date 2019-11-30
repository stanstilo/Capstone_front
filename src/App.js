import React from "react";

import Home from './components/Feed/Home'
import "./App.css";

class App extends React.Component {
  
    state =  {
      title:"Employees Data",
      sign:"Sign In",
      first_name:"",
      last_name:"",
      email:"",
      password:"",
      address:"",
      dept:"",
      job:"",
      gender:""
    }
 
 //make ajax calls here
//  componentDidMount(){

 

changeHandler = (event) => {
  this.setState({[event.target.name]:event.target.value})
 }

  submitHandler = (event) =>{
    event.preventDefault()
    let data = this.state
    console.log(data)
    let url = 'http://localhost:8000/auth/create-user';
    
    fetch(url,{
      method:'POST',
      headers:{
      'Content-Type':'application/json',
      'Accept':'application/json',
      },
      body:JSON.stringify(data)   
    }).then(result=>{
      result.json()
    })
      .then(resp => {
        console.log(resp)
      })
      .catch(error=>{
       console.log(error)
      })
  }
  
  submitCredential = (event) =>{
    event.preventDefault()
    let data = this.state
    console.log(data)
    let url = 'http://localhost:8000/auth/signin';
    
    fetch(url,{
      method:'POST',
      headers:{
      'Content-Type':'application/json',
      'Accept':'application/json',
      },
      body:JSON.stringify(data)   
    }).then(result=>{
      result.json()
    })
      .then(resp => {
        console.log(resp)
      })
      .catch(error=>{
       console.log(error)
      })
  }

 render(){
   let title = this.state.title
   let sign = this.state.sign
   const {first_name, last_name, email, password, gender, address, job, dept} = this.state
   return( 
     <div>
      <form>
       <h1>{title}</h1>
       <input type="text" 
       placeholder="enter your firstname" 
       name="first_name" value={first_name} 
       onChange={this.changeHandler}
       />
       <input type="text" 
       placeholder="enter your lastname" 
       name="last_name" value={last_name} 
       onChange={this.changeHandler}
       />
         <input 
         type="email" 
         placeholder="enter your email" 
         name="email" 
         value={email}
         onChange={this.changeHandler}
         />
         <input 
         type="password" 
         placeholder="please enter your password" 
         name="password" 
         value={password}
         onChange={this.changeHandler}
         />
         <input 
         type="text" 
         placeholder="please enter your gender" 
         name="gender" 
         value={gender}
         onChange={this.changeHandler}
         />
         <input 
         type="text" 
         placeholder="enter your address" 
         name="address" 
         value={address}
         onChange={this.changeHandler}
         />
         <input 
         type="text" 
         placeholder="enter your jobname" 
         name="job" 
         value={job}
         onChange={this.changeHandler}
         /> 
         <input 
         type="text" 
         placeholder="please enter your department" 
         name="dept" 
         value={dept}
         onChange={this.changeHandler}
         />
         <button onClick={this.submitHandler}>Register</button>
         <h1>{sign}</h1>
         <input 
         type="email" 
         placeholder="enter your email" 
         name="email" 
         value={email}
         onChange={this.changeHandler}
         />
         <input 
         type="password" 
         placeholder="enter your password" 
         name="password" 
         value={password}
         onChange={this.changeHandler}
         />
         <button onClick={this.submitCredential}>Sign In</button>
      </form>
       <Home />
     </div>
   )
 }
 }

export default App;


