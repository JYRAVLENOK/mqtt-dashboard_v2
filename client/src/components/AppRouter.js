import React, {useContext} from 'react';
import {authRoutes, publicRoutes} from "../routes";
import {
    Navigate,
    Route,
    BrowserRouter,
    Routes
} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, CARD_ROUTE, CARD_CREATE_ROUTE} from "../utils/consts";

import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import CreateCard from '../pages/createCard/CreateCard'
import {Context} from "../index";
import InfoCard from "../pages/infoCard/InfoCard";

const AppRouter = () => {
    const {user} = useContext(Context)
    const {card} = useContext(Context)
    console.log(user)
    console.log(card)
    return (
        <div>
            <BrowserRouter>
                {/*<Routes>*/}
                {/*    {isAuth && authRoutes.map(({path, Component}) =>*/}
                {/*        <Route key={path} path={path} component={Component} exact/>*/}
                {/*    )}*/}
                {/*    {publicRoutes.map(({path, Component}) =>*/}
                {/*        <Route key={path} path={path} component={Component} exact/>*/}
                {/*    )}*/}
                {/*    <Navigate to={HOME_ROUTE}/>*/}
                {/*</Routes>*/}
                <Routes>
                    <Route path={HOME_ROUTE}>
                        <Route index element={<Home />}/>
                    </Route>
                    <Route path={LOGIN_ROUTE}>
                        <Route index element={<Login/>}/>
                    </Route>
                    <Route path={CARD_ROUTE + '/:id'}>
                        <Route index element={<InfoCard/>}/>
                    </Route>
                    <Route path={CARD_CREATE_ROUTE}>
                        <Route index element={<CreateCard/>}/>
                    </Route>
                    {/*<Navigate to={HOME_ROUTE}/>*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default AppRouter;