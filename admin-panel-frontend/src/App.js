import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import UserList from './components/UserList';
import AddUser from './components/AddUser';


function App() {


  const user = useSelector((state) => state.user.value);
  console.log(user)


  return (
    <div className="App">
      <Header/>
      {
        user.role ==="admin" &&
        <div>
          <UserList/>
          <AddUser/>
        </div>

      }
    </div>
  );
}

export default App;
