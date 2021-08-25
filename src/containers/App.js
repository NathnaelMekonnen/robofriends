import React, { useState, useEffect } from 'react';
import './App.css';
import 'tachyons';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll.js'
import ErrorBoundry from '../components/ErrorBoundry';

function App() {

    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')

    useEffect(()=> {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => setRobots(users))
    },[])

    const onSearchChange = (event) => {
      setSearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    return !robots.length ? 
      <h2 className='tc loadmsg'>Loading Please Wait a Second</h2>
      : 
      ( 
        <div className='tc'>
          <div className='flex justify-between items-center pos-style'>
            <h1 className='ml6'>RoboFriends</h1>
            <SearchBox SearchChange={onSearchChange} />
          </div>
          <Scroll>
            <ErrorBoundry><CardList robots={filteredRobots}/></ErrorBoundry>
          </Scroll>
        </div>
      );  
}

export default App;
 