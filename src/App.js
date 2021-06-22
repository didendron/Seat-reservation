import React, {   useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './app/Home';
import Board from './app/Board';
import Summary from './app/Summary';
import { useDispatch } from 'react-redux';
import {fetchSeats} from './app/seatsSlice';



function App() {

    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(fetchSeats());
    },[dispatch]);
 
    return(
      
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route path="/board" component={Board}></Route>
        <Route path="/summary" component={Summary}></Route>
      </Router>
    
    );
  
}

export default App;
