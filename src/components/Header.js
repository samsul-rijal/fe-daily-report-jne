import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/header.css'
import '../assets/css/login.css'
import Avatar from 'react-avatar';
import ModalRegisterLogin from './ModalRegisterLogin'
import UserFoto from '../assets/images/foto-user.jpeg'
import { Dropdown } from 'react-bootstrap'
import { FaUserAlt } from 'react-icons/fa';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { AiOutlineLogout } from 'react-icons/ai';

import { UserContext } from '../contexts/userContext'

const path = 'http://localhost:5000/uploads/'

const Header = () => {
    const [show, setShow] = useState(false);
    const [nameModal, setNameModal] = useState('');

    const handleModalLogin = () => {
        setShow(!show);
        setNameModal('login');
    }

    const handleModalRegister = () => {
        setShow(!show);
        setNameModal('register');
    }

    const [state, dispatch] = useContext(UserContext);

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });
    }

    return (
        <div className="header">
            <Link to="/">
                <p className="logo-app">Daily Report</p>
            </Link>
            <ModalRegisterLogin show={show} nameModal={nameModal} handleClose={setShow} handleChangeModal={setNameModal} />

            <div className="menu">
                {(state.isLogin) ?
                    <>
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown-toggle" variant="transparant" id="dropdown-basic">
                                <Avatar src={path + state.user.foto} color="grey" name={state.user.nama} size="40" round={true} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark" className="dropdown-menu">

                                {(state.user.levelId === 2) ?
                                    <>
                                        <Dropdown.Item>
                                            <Link to="/profile" className="link-icon">
                                                <FaUserAlt color="#1c87a1" />
                                                <p className="title-icon">Profile</p>
                                            </Link>
                                        </Dropdown.Item>

                                        <Dropdown.Item>
                                            <Link to={`/report/${state.user.id}`} className="link-icon">
                                                <HiDocumentDuplicate color="#1c87a1" />
                                                <p className="title-icon">Report</p>
                                            </Link>
                                        </Dropdown.Item>
                                    </>
                                    :
                                    <>
                                        <Dropdown.Item>
                                            <Link to={'/report-pegawai'} className="link-icon">
                                                <HiDocumentDuplicate color="#1c87a1" />
                                                <p className="title-icon">Report Pegawai</p>
                                            </Link>
                                        </Dropdown.Item>
                                    </>
                                }

                                <Dropdown.Item>
                                    <div className="link-icon" onClick={handleLogout}>
                                        <AiOutlineLogout color="#1c87a1" />
                                        <p className="title-icon">Logout</p>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                    :
                    <>
                        <p className="menu-item" onClick={handleModalLogin}>Login</p>
                        <p className="menu-item" onClick={handleModalRegister}>Register</p>
                    </>
                }
            </div>

        </div >
    )
}

export default Header
