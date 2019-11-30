import React, { Component } from 'react'
import Form from "./Form"
import Navbar from "../Navbar"

class Home extends Component {
    render() {
        return (
                  <div className="container">
                    <div className="row pt-5">
                      <div className="col-12 col-lg-6 offset-lg-3">
                        <h1 className="text-center">ArticleBlog</h1>
                      </div>
                       <Navbar /> 
                      <Form />
                    </div>
                  </div>
                );   
    }
}
export default Home