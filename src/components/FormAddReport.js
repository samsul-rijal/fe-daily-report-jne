import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { API } from '../config/api'

function FormAddReport() {
    const [message, setMessage] = useState('')

    const [messageSuccess, setMessageSuccess] = useState('')

    const [form, setForm] = useState({
        tglKirim: '',
        noPaket: '',
        namaPenerima: '',
        alamat: '',
    })

    const { tglKirim, noPaket, namaPenerima, alamat } = form

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

            const response = await API.post('/report', body, config)
            console.log(response)

            setMessage(response.data.message)

            if (response.data.status === 'success') {
                setMessageSuccess("Registered Successfully")
            }

            setForm({
                tglKirim: '',
                noPaket: '',
                namaPenerima: '',
                alamat: '',
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
                <input className="form-input" onChange={handleOnChange} value={tglKirim} name="tglKirim" type="date" placeholder="Tanggal Kirim" required />
            </Form.Group>

            <Form.Group className="mb-3">
                <input className="form-input" onChange={handleOnChange} value={noPaket} name="noPaket" type="number" placeholder="Nomor Paket" required />
            </Form.Group>

            <Form.Group className="mb-3">
                <input className="form-input" onChange={handleOnChange} value={namaPenerima} name="namaPenerima" type="text" placeholder="Nama Penerima" required />
            </Form.Group>

            <Form.Group className="mb-3" >
                <textarea className="form-input" onChange={handleOnChange} value={alamat} name="alamat" type="textarea" placeholder="Alamat" required />
            </Form.Group>

            <Button type="submit" className="btn-loginModal">Simpan</Button>
        </Form>
    )
}

export default FormAddReport