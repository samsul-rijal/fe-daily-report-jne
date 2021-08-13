import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { API } from '../config/api'

function FormRegister() {
    const [message, setMessage] = useState('')

    const [messageSuccess, setMessageSuccess] = useState('')

    const [form, setForm] = useState({
        nik: '',
        password: '',
        nama: '',
        jenisKelamin: 'male',
        noHp: '',
        alamat: '',
        levelId: '2',
    })

    const { nik, password, nama, jenisKelamin, noHp, alamat, levelId } = form

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = async (e) => {

        try {
            e.preventDefault()

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }


            const body = JSON.stringify({
                ...form
            })

            const response = await API.post('/register', body, config)
            console.log(response)

            setMessage(response.data.message)

            if (response.data.status === 'success') {
                setMessageSuccess("Registered Successfully")
            }

            setForm({
                nik: '',
                password: '',
                nama: '',
                jenisKelamin: 'male',
                noHp: '',
                alamat: '',
                levelId: '2',
            })

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Form onSubmit={handleOnSubmit}>

            {message &&
                <div class="alert alert-danger" role="alert">
                    {message}
                </div>
            }

            {messageSuccess &&
                <div class="alert alert-success" role="alert">
                    {messageSuccess}
                </div>
            }
            <Form.Group className="mb-3">
                <input className="form-input" onChange={handleOnChange} value={nik} name="nik" type="number" placeholder="NIK" required />
            </Form.Group>

            <Form.Group className="mb-3">
                <input className="form-input" onChange={handleOnChange} value={password} name="password" type="password" placeholder="Password" required />
            </Form.Group>

            <Form.Group className="mb-3">
                <input className="form-input" onChange={handleOnChange} value={nama} name="nama" type="text" placeholder="Nama Lengkap" required />
            </Form.Group>

            <select className="jenis-kelamin" name="jenisKelamin">
                <option>Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
            </select>

            <Form.Group className="mb-3" >
                <input className="form-input" onChange={handleOnChange} value={noHp} name="noHp" type="number" placeholder="Nomor Handphone" required />
            </Form.Group>

            <Form.Group className="mb-3" >
                <textarea className="form-input" onChange={handleOnChange} value={alamat} name="alamat" type="textarea" placeholder="Alamat" required />
            </Form.Group>

            <Button type="submit" className="btn-loginModal">Register</Button>
        </Form>
    )
}

export default FormRegister