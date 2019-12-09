import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import _ from 'lodash'


//import '../../App.css'



function TopNav(props)
{
  
    return (
      <div>
      
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-secondary mb-4">
          
        <Link className="navbar-brand" to="#"><b>LIBRARY</b></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='main-page' className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
              {
                !_.isEmpty(localStorage.getItem('userAuth'))?(
                  <div className="collapse navbar-collapse" id="navbarNavDropdown">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/users/booklist">Books <span className="sr-only">(current)</span></Link>
                      </li>  
                      <li className="nav-item active">
                        <Link className="nav-link" to="/logout">Logout <span className="sr-only">(current)</span></Link>
                      </li>
                      
                  </div>
                ):(
                  <div  className="collapse navbar-collapse" id="navbarNavDropdown">
                     <li className="nav-item active">
                      <Link className="nav-link" to="/admin/login">Admin<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="nav-link" to="/registration">Register <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="nav-link" to="/user/login">Login <span className="sr-only">(current)</span></Link>
                    </li>
                   

                    
                  </div>
                )
              }
          </ul>
         
        </div>
     
      </nav>
     
      
      </div>
    )
}

const mapStateToProps=(state)=>{
  return {
    user:state.user
  }
}

export default connect(mapStateToProps)(TopNav)
