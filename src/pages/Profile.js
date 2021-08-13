import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import UserFoto from '../assets/images/foto-user.jpeg'
import '../assets/css/profile.css'
import { Modal, Button, Form } from 'react-bootstrap'
import { UserContext } from '../contexts/userContext'
import { Link } from 'react-router-dom'

const path = 'http://localhost:5000/uploads/'

const Profile = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state, dispatch] = useContext(UserContext);

    return (
        <div>
            <Header />
            <p className="title-profile">Profile User</p>

            <div className="card-profile">
                <div className="title-user">
                    {(state.user.foto === null) ?
                        <img src={UserFoto} alt="img-user" />
                        :
                        <img src={path + state.user.foto} alt="img-user" />
                    }

                    <p className="profile-name">{state.user.nama}</p>
                </div>

                <div className="profile-user">
                    <div className="title-label">
                        <p>NIK</p>
                        <p>Jenis Kelamin</p>
                        <p>Nomor Hp</p>
                        <p>Alamat</p>
                        <p>Hak Akses</p>
                    </div>

                    <div className="data-user">
                        <p>: {state.user.nik}</p>
                        <p>: {state.user.jenisKelamin}</p>
                        <p>: {state.user.noHp}</p>
                        <p>: {state.user.alamat}</p>
                        <>
                            {(state.user.levelId === 2) ?
                                <p>: Pegawai</p>
                                :
                                <p>: Manager</p>
                            }
                        </>
                    </div>
                </div>

                <Link to={`/edit-profile/${state.user.id}`}>
                    <button className="btn-edit-user">Edit</button>
                </Link>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
                <div className="bg-dark">
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User
                    </Modal.Title>
                </div>

                <Modal.Body className="bg-dark">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <input className="form-input" type="email" placeholder="Email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <input className="form-input" type="email" placeholder="Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <input className="form-input" type="email" placeholder="Username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <input className="form-input" type="password" placeholder="Password" />
                        </Form.Group>


                        <Button className="btn-loginModal">Edit</Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile
