import React, { useEffect, Suspense } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';

import Home from "./pages/Home";
import Login from "./pages/Login";
// import Backlogs from "./pages/Backlogs";
import Sprints from "./pages/Sprints";
// import NotFound from "./pages/NotFound";

import { masterData, masterUser } from "./global/actions"

const Backlogs = React.lazy(() => import('./pages/Backlogs'));
// const Sprints = React.lazy(() => import('./pages/Sprints'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const RetroSpective = React.lazy(() => import('./pages/Retro'));
const SingleDataBacklog = React.lazy(() => import('./pages/Backlogs/components/SingleDataBacklogPage'));



const MainRoutes = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(masterData())
        dispatch(masterUser())
        
    }, [dispatch])
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
                <Route path='/backlogs/:c_backlog_id' element={<SingleDataBacklog/>}/>
                <Route path='/retrospective/:c_sprint_id' element={<RetroSpective/>}/>
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