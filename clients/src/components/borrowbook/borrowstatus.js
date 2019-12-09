import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class BorrowStatus extends React.Component{
    constructor(props){
        super(props)
        this.state={
            currentAvailabilityStatus:""
        }
        this.handleRadio=this. handleRadio.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
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
            this.props.history.push('/users/booklist')
            console.log('status',currentAvailabilityStatus)
        })
    }

    render(){
        return(
            <div>
                <h2>Update borrow status</h2>
                <form onSubmit={this.handleSubmit}>
                <label>
                        <input type="radio" name="w" value ="Borrow"checked = {this.state.currentAvailabilityStatus === 'Borrow'} onChange={this.handleRadio} />Borrow
                        <input type="radio" name="w" value ="Return"checked = {this.state.currentAvailabilityStatus === 'Return'} onChange={this.handleRadio} />Return
                    </label><br/>
                    <input className="btn btn-dark" type='submit' /> <span><botton className="btn btn-dark"><Link to='/users/booklist'>Back</Link></botton></span>
                </form>
            </div>
        )
    }
}
export default BorrowStatus