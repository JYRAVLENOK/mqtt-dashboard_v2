import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore'
import CardStore from "./store/CardStore"
import DeviceStore from "./store/DeviceStore"
import RoomStore from "./store/RoomStore";

export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Context.Provider value = {{
            user: new UserStore(),
            card: new CardStore(),
            device: new DeviceStore(),
            room: new RoomStore()
        }}>
            <App />
        </Context.Provider>
    // </React.StrictMode>
);

