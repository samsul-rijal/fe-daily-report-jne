import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import '../assets/css/login.css'

function ModalRegisterLogin(props) {
    const { show, nameModal, handleClose, handleChangeModal } = props;

    let modal = null;

    const handleChangeModalLogin = () => handleChangeModal('login');
    const handleChangeModalRegister = () => handleChangeModal('register');

    if (nameModal === 'login') {
        modal = (
            <div>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <div className="bg-dark">
                        <Modal.Title id="contained-modal-title-vcenter">
                            Login
                        </Modal.Title>
                    </div>

                    <Modal.Body className="bg-dark">
                        <FormLogin
                            handleClose={handleClose}
                            handleChangeModalLogin={handleChangeModalLogin}
                        />
                        <p className="title-login">Belum punya akun? Klik <span className="here" onClick={handleChangeModalRegister}>Disini</span></p>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    if (nameModal === 'register') {
        modal = (
            <div>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <div className="bg-dark">
                        <Modal.Title id="contained-modal-title-vcenter">
                            Register
                        </Modal.Title>
                    </div>

                    <Modal.Body className="bg-dark">
                        <FormRegister
                            handleClose={handleClose}
                            handleChangeModalLogin={handleChangeModalLogin}
                        />
                        <p className="title-login">Sudah punya akun? Klik <span className="here" onClick={handleChangeModalLogin}>Disini</span></p>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    return modal;
}

export default ModalRegisterLogin