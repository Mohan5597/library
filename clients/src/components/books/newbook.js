import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class NewBook extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:"",
            author:"",
            currentAvailabilityStatus:""
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange(e){
        e.persist()
        this.setState({
            [e.target.name]:e.target.value
        })
     }

     handleSubmit(e){
        e.preventDefault()
        const formData={
            name:this.state.name,
            author:this.state.author,
            currentAvailabilityStatus:this.state.currentAvailabilityStatus
        }
        axios.post('/books', formData,{
            headers:{'x-auth':localStorage.getItem('userAuth')}
        })
        .then(response =>{
             console.log("res",response.data)
             this.props.history.push('/admin/booklist')
            
        })
    }
    render(){
        return(
            <div className="container col-md-4">
                <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label className="col-md-3 col-form-label">Book Name  </label>
                    <div className="col-md-6">
                        <input type='text' className="form-control" placeholder='Book name' value={this.state.name} onChange={this.handleChange} name='name'/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-3 col-form-label">Author </label>
                    <div className="col-md-6">
                        <input type='text' className="form-control" placeholder='Author name' value={this.state.author} onChange={this.handleChange} name='author'/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-md-3 col-form-label">Book Name  </label>
                    <div className="col-md-6">
                        <input type='text' className="form-control" placeholder='status' value={this.state.currentAvailabilityStatus} onChange={this.handleChange} name='currentAvailabilityStatus'/>
                    </div>
                </div>
                    
                    <input type='submit' className="btn btn-primary"/> <span><botton className="btn btn-dark"><Link to='/admin/booklist'>Back</Link></botton></span>
                </form>

            </div>

        )
    }
}
export default NewBook