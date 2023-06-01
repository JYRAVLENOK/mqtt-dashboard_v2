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

import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import {Button, Form} from "react-bootstrap";
import "./settingsPage.scss"

const SettingsPage = () => {
    return (
        <div className="settings">
            <Sidebar/>
            <div className="page">
                <Navbar/>
                <span>Адрес MQTT-брокера</span>
                <Form>
                    <Form.Control
                        // placeholder={createValue.bright}
                        // onChange={handleChange}
                        // name='bright'
                        // value={String(createValue.bright)}
                    />
                </Form>
            </div>
        </div>
    );
};

export default SettingsPage;