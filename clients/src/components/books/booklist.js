import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startListBooks, startRemoveBook} from '../../actions/book'

class Booklist extends React.Component{

    componentDidMount(){
        this.props.dispatch(startListBooks())

    }
    handleRemove=(id)=>{
       this.props.dispatch(startRemoveBook(id))
       window.location.reload()
    }

    render(){
        return(
            <div>
                <h2>Book list</h2>
                <table  className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.props.books.map((book,index) =>{
                        return(<tr key={book._id}>
                                    <td>{index+1}</td>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.currentAvailabilityStatus}<button className="btn btn-dark"><Link to={`/book/status/${book._id}`}>Update</Link></button></td>
                                    <td><button className="btn btn-dark" onClick={() =>{
                                        const confirmRemove=window.confirm('Are you sure?')
                                        if(confirmRemove){
                                            this.handleRemove(book._id)
                                        }
                                    }}><Link>Delete</Link></button></td>

                               </tr>)
                                     
                    })}
                    </tbody>
                   
                </table>
                <button className="btn btn-dark"><Link to='/admin/newbook'>Add Book</Link></button>

            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        books:state.books
    }
}
export default connect(mapStateToProps)(Booklist)