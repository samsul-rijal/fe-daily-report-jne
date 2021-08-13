import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useHistory, useParams } from "react-router-dom";
import { Button } from 'react-bootstrap'

import { API } from '../config/api'
import Header from '../components/Header';

export default function FormEditCreatePost() {
    const { id } = useParams()

    const [state, setState] = useState([])
    const [form, setForm] = useState({
        image: '',
        nama: '',
        jenisKelamin: '',
        noHp: '',
        alamat: '',
    })

    const [preview, setPreview] = useState('')

    const { image, nama, jenisKelamin, noHp, alamat } = form

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    const handleOnSubmit = async () => {
        try {

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const formData = new FormData()
            formData.set("nama", form.nama ? form.nama : state.nama)
            formData.set("jenisKelamin", form.jenisKelamin ? form.jenisKelamin : state.jenisKelamin)
            formData.set("noHp", form.noHp ? form.noHp : state.noHp)
            formData.set("alamat", form.alamat ? form.alamat : state.alamat)

            if (form.image) {
                formData.set("imageFile", form.image[0], form.image[0].name)
            }
            const response = await API.patch(`/user/${id}`, formData, config)
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    const [data, setData] = useState()

    const loadUser = async () => {
        try {
            const response = await API.get('/users')
            console.log(response)

            setData(response.data.data.users)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    console.log(state)

    return (
        <div className='form-create'>

            <Header />

            <Form onSubmit={handleOnSubmit} className="form-edit">
                <div className="h3 text-center mt-3 title-update">Update user</div>

                <div>
                    <input type="file" name="fileImage" onChange={onChange} name="image" className="btn-post" id="inputGroupFile01" />
                </div>

                <div className="preview-img">
                    {preview && <img src={preview} />}
                </div>

                <Form.Group className="mb-2">
                    <Form.Label>Tanggal Kirim</Form.Label>
                    <Form.Control required onChange={onChange} value={nama} name="nama" type="text" placeholder="Nama" />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Nomor Paket</Form.Label>
                    <Form.Control required onChange={onChange} value={jenisKelamin} name="jenisKelamin" as="select">
                        <option>Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Nomor Handphone</Form.Label>
                    <Form.Control required onChange={onChange} value={noHp} name="noHp" type="number" placeholder="Nomor Handphone" />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control required onChange={onChange} value={alamat} name="alamat" type="text" placeholder="Alamat" />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 btn-sm me-2">
                    Update user
                </Button>
            </Form>
        </div>
    )
}