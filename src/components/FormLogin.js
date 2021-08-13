import { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap'

import { UserContext } from '../contexts/userContext'
import { API, setAuthToken } from '../config/api'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


export default function FormLogin() {
    const [state, dispatch] = useContext(UserContext);
    let history = useHistory()
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({
        nik: '',
        password: ''
    })

    const { nik, password } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const body = JSON.stringify({
                nik,
                password
            })

            const response = await API.post("/login", body, config)
            console.log(response)

            setMessage(response.data.message)

            setAuthToken(response.data.token)

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...response.data, token: response.data.token }
            })

            if (response.data.status === 'success') {
                swal("Selamat!", "Login Berhasil!", "success");
            }

        } catch (error) {
            setMessage(error.response.data.message)
            console.log(error.response)
        }

    }

    return (
        <Form onSubmit={handleSubmit}>

            {message &&
                <div class="alert alert-danger" role="alert">
                    {message}
                </div>
            }

            <Form.Group className="mb-3" controlId="formBasicnik">
                <input className="form-input"
                    onChange={onChange}
                    value={nik}
                    name="nik"
                    type="number"
                    placeholder="NIK" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <input className="form-input"
                    onChange={onChange}
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
            </Form.Group>
            <Button type="submit" className="btn-loginModal">Login</Button>
        </Form>
    )
}