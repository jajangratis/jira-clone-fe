import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';

import Home from "./pages/Home";
import Login from "./pages/Login";
// import Backlogs from "./pages/Backlogs";
// import Sprints from "./pages/Sprints";
// import NotFound from "./pages/NotFound";

const Backlogs = React.lazy(() => import('./pages/Backlogs'));
const Sprints = React.lazy(() => import('./pages/Sprints'));
const NotFound = React.lazy(() => import('./pages/NotFound'));



const MainRoutes = () => {
    const authState = useSelector(state => state.auth)
    return (
        <Suspense fallback={
            <div  className='centered'>
                <CircularProgress/>
            </div>
        }>
            { authState?.isAuthenticated || authState !== null ?
            <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/backlogs' element={<Backlogs/>}/>
                <Route path='/sprints' element={<Sprints/>}/>
                <Route path='*' element={<NotFound/>} />
            </Routes>
            :
            <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<NotFound/>} />
            </Routes>}
        </Suspense>
    )
}


export default MainRoutes