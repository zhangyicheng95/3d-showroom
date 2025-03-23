import { Routes, Route } from 'react-router-dom';
import * as _ from 'lodash-es';
import HomePage from './Home';

const IndexRouter = () => {

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <HomePage />
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
