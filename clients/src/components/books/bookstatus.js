import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class BookStatus extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentAvailabilityStatus:""
        }
       
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleRadio=this. handleRadio.bind(this)
    }
    handleRadio(e){
        this.setState ({currentAvailabilityStatus: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        const formData={
            currentAvailabilityStatus:this.state.currentAvailabilityStatus
        }
        const id=this.props.match.params.id
        axios.put(`books/${id}`,formData,{
            headers:{'x-auth':localStorage.getItem('userAuth')}
        })
        .then(response =>{
            const currentAvailabilityStatus=response.data
            this.setState(() =>({currentAvailabilityStatus}))
            this.props.history.push('/admin/booklist')
            console.log('status',currentAvailabilityStatus)
        })
    }

    render(){
        return(
            <div>
                <h2>Update book status</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="radio" name="w" value ="Available"checked = {this.state.currentAvailabilityStatus === 'Available'} onChange={this.handleRadio} /> Available
                        <input type="radio" name="w" value ="Unavilable"checked = {this.state.currentAvailabilityStatus === 'Unavilable'} onChange={this.handleRadio} /> Unavilable
                    </label><br/>
                   
                    <input className="btn btn-dark" type='submit' /> <span><botton className="btn btn-dark"><Link to='/admin/booklist'>Back</Link></botton></span>
                </form>
            </div>
        )
    }
}
export default BookStatus