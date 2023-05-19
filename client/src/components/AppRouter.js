import React, {useContext, useEffect} from 'react';
import {authRoutes, publicRoutes} from "../routes";
import {
    Navigate,
    Route,
    BrowserRouter,
    Routes
} from "react-router-dom";
import {HOME_ROUTE} from "../utils/consts";
import {Context} from "../index";
import InfoCard from "../pages/infoCard/InfoCard";
import {observer} from "mobx-react-lite";
import Sidebar from "./Sidebar/Sidebar";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    // const {card} = useContext(Context)
    // const isAuth = true
    console.log(user)
    // console.log(card)

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/*<Sidebar/>*/}
                    <>
                        {user.isAuth && authRoutes.map(({path, Component}) =>
                            <Route key={path} path={path} element={<Component/>} exact/>
                        )}
                    </>
                    <>
                        {publicRoutes.map(({path, Component}) =>
                            <Route key={path} path={path} element={<Component/>} exact/>
                        )}
                    </>
                    <Route path='*' element={<Navigate to={HOME_ROUTE}/>} />
                    //TODO: доделать переадресацию с неверного адреса
                    //TODO: переадресация с авторизации для авторизованных пользователей
                </Routes>
            </BrowserRouter>
        </div>
    );
})

export default AppRouter;