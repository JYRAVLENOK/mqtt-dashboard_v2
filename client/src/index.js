// Copyright 2023 Alexandr Vasilev
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

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

