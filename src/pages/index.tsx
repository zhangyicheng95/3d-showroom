import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as _ from 'lodash-es';
import Login from './Login';
import HomePage from './Home';

const IndexRouter = () => {

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Login />
                }
            />
            <Route
                path="/home"
                element={
                    <HomePage />
                }
            />
        </Routes>
    );
};
export default IndexRouter;
