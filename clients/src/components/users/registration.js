import React from 'react'
import { registerUser } from '../../actions/user';
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from '../../config/axios'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            name:'',
            email:'',
            contactNumber:'',
            password:'',
            errorMsg:'',
            successMsg:''

        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData={
            username:this.state.username,
            name:this.state.name,
            email:this.state.email,
            contactNumber:this.state.contactNumber,
            password:this.state.password

        }

        axios.post('/users/register', formData)
            .then(response => {
               
                if (response.data.errors) {
                    alert(response.data.message)
                } else {
                    this.props.dispatch(registerUser(response.data))
                    if(_.isEmpty(response.data.errors)){
                       
                        this.props.history.push('/user/login')
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
        
     }

    render(){
        return(
            <div className="container col-md-4">
                  <h2>Register Now</h2>
                
                <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label className="col-md-3 col-form-label">UserName  </label>
                    <div className="col-md-6">
                        <input type='text' className="form-control" placeholder='User name' value={this.state.username} onChange={this.handleChange} name='username'/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Name  </label>
                    <div className="col-sm-6">
                        <input type='text' className="form-control" placeholder='Name' value={this.state.name} onChange={this.handleChange} name='name'/>
                    </div>
                    </div>
                <div className="form-group row">
                    <label className="col-md-3 col-form-label">Email  </label>
                    <div className="col-md-6">
                        <input type='text' className="form-control" placeholder='Enter email' value={this.state.email} onChange={this.handleChange} name='email'/>
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Contact Number  </label>
                    <div className="col-sm-6">
                        <input type='text' className="form-control" placeholder='Enter contact Number' value={this.state.contactNumber} onChange={this.handleChange} name='contactNumber'/>
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Password  </label>
                    <div className="col-sm-6">
                        <input type='password' className="form-control" placeholder='Password' value={this.state.password} onChange={this.handleChange} name='password'/>
                    </div>
                    </div>
                    <input type='submit' className="btn btn-primary" value='register' />
                </form>
            </div>
        )
    }
}

const mapStateToProps=(state) =>{
    return{
        errors:state.errors
    }
}


export default connect(mapStateToProps)(Register)