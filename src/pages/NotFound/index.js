import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const history = useNavigate()
    const onClickHandler = () => {
        history('/login')
    }
    return (
        <div>
            <h1>404 - Not Found!</h1>
            <Button onClick={onClickHandler}>Go Home</Button>
        </div>
    )
};

export default NotFound;