import React from 'react'
import {Routes,Route} from "react-router-dom";
import About from './About'
import ChallengesList from './entity';
import SignUp from './components/signUp'
import Login from './components/Login'
import AddChallenge from './components/AddChallenge'
import UserChallenges from './components/UserChallenges'
import TestAuth from './components/TestAuth'
import Home from './components/Home'
import Navbar from './components/Navbar'

const AllRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/challenges' element={<ChallengesList/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user-challenges' element={<UserChallenges/>}/>
        <Route path='/test-auth' element={<TestAuth/>}/>
        {/* Catch-all route for undefined routes */}
        <Route path='*' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes