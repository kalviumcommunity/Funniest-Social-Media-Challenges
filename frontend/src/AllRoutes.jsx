import React from 'react'
import {Routes,Route} from "react-router-dom";
import About from './About'
import ChallengesList from '../entity';
const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<h1>Home</h1>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/challenges' element={<ChallengesList/>}/>
    </Routes>
  )
}

export default AllRoutes