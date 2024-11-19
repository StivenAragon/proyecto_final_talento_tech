import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routesConfig from './routesConfig';
import { TurismoContextProvider } from '../context/TurismoProvider';
import { Navbar } from '../components/Navbar';

const AppRouter = () => {
    return (
        <TurismoContextProvider>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    {routesConfig.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            index={route.index}
                            element={route.element}
                        />
                    ))}
                </Route>
            </Routes>
        </TurismoContextProvider>
    );
};

export default AppRouter;