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

import React, {useContext, useEffect, useMemo, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import {Button, Card} from "react-bootstrap";
import "./UsersPage.scss"
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {deleteOneUser, getAllUsers} from "../../http/userAPI";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CreateCard from "../../components/modals/CreateCard";
import CreateDevice from "../../components/modals/CreateDevice";
import CreateRoom from "../../components/modals/CreateRoom";
import CreateUser from "../../components/modals/CreateUser";

const UsersPage = observer(() => {
    const {user} = useContext(Context)
    const [addVisible, setAddVisible] = useState(false)

    useEffect(() => {
        getAllUsers().then(data => user.setUsers(data))
        console.log(user._user.id)
    }, [user])

    const deleteUser = (id) => {
        deleteOneUser(id).then(data => {})
    }

    return (
        <div className="usersPage">
            <Sidebar/>
            <div className="users">
                <Navbar/>
                <div className="searchBar">
                    <Button
                        // type='submit'
                        className = "buttonAdd"
                        variant={"outline-success"}
                        // className={"mr-4"}
                        onClick={() => {setAddVisible(true)}}
                    >
                        Добавить пользователя
                    </Button>
                    <CreateUser show={addVisible} onHide={() => {
                        setAddVisible(false)
                    }}/>
                    {/*<CreateDevice show={deviceVisible} onHide={() => {*/}
                    {/*    setDeviceVisible(false)*/}
                    {/*}}/>*/}
                </div>
                {user._users.map(usersMap => {
                    if (usersMap.id !== user._user.id) {
                        return (
                            <Card
                                key={usersMap.id}
                                className="user"
                            >
                                <Card.Body>
                                    <Card.Title>{usersMap.username}</Card.Title>
                                    <Card.Text>
                                        id: {usersMap.id},
                                    </Card.Text>
                                    <Card.Text>
                                        права администратора: {usersMap.root ? 'Есть' : 'Отсутствуют'}
                                    </Card.Text>
                                    <Button
                                        // type='submit'
                                        // className = "buttonAdd"
                                        variant={"outline-danger"}
                                        // className={"m-2"}
                                        onClick={() => {
                                            deleteUser(usersMap.id)
                                        }}
                                    >
                                        Удалить
                                    </Button>
                                </Card.Body>
                            </Card>
                        )
                    }
                })}
            </div>
        </div>
    );
});

export default UsersPage;