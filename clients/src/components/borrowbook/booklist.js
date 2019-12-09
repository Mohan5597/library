import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startListBooks} from '../../actions/book'

class Books extends React.Component{

    componentDidMount(){
        this.props.dispatch(startListBooks())

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
                                    <td>{book.currentAvailabilityStatus}<button className="btn btn-dark"><Link to={`/borrow/status/${book._id}`}>Borrow</Link></button></td>

                               </tr>)
                                     
                    })}
                    </tbody>
                   
                </table>

            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        books:state.books
    }
}
export default connect(mapStateToProps)(Books)