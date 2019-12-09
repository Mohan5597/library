import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import TopNav from './components/topNav/topNav'
import Registration from "./components/admin/registration"
import AdminLogin from './components/admin/login'
import UserLogin from './components/users/login'
import Logout from './components/admin/logout'
import Booklist from './components/books/booklist';
import BookStatus from './components/books/bookstatus';
import NewBook from './components/books/newbook'
import Books from './components/borrowbook/booklist'
import BorrowStatus from './components/borrowbook/borrowstatus'



function App() {
  
  return (
    <BrowserRouter>
     <div>
     <ul>
       
       <TopNav/>
       </ul>
 
      <Switch>
        <Route path="/registration" component={Registration} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/user/login" component={UserLogin} />
        <Route path="/logout" component={Logout} />
        <Route path='/admin/booklist' component={Booklist} />
        <Route path='/book/status/:id'component={BookStatus}/>
        <Route path="/admin/newbook" component={NewBook}/>
        <Route path='/users/booklist' component={Books} />
        <Route path='/borrow/status/:id'component={BorrowStatus}/>
      
      </Switch>
    </div>
    </BrowserRouter>
   
  );
}

export default App;
