import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import '../assets/css/editReport.css'
import Header from '../components/Header';

import { API } from '../config/api'

const EditReport = () => {

    const { id } = useParams()

    const [form, setForm] = useState({
        tglKirim: '',
        noPaket: '',
        namaPenerima: '',
        alamat: ''
    })

    const { tglKirim, noPaket, namaPenerima, alamat } = form

    const onChange = (e) => {
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

            const body = JSON.stringify({ ...form })

            const response = await API.patch(`/edit-report/${id}`, body, config)

            setForm(
                {
                    tglKirim: '',
                    noPaket: '',
                    namaPenerima: '',
                    alamat: ''
                }
            )


        } catch (error) {
            console.log(error)
        }
    }

    const [data, setData] = useState()
    const loadReport = async () => {
        try {
            const response = await API.get(`/report/${id}`)
            console.log(response)

            console.log(response.data.data.report)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadReport()
    }, [])


    return (
        <div>
            <Header />

            <Form onSubmit={handleOnSubmit} className="form-edit">
                <div className="h3 text-center mt-3 title-update">Update Report</div>

                <Form.Group className="mb-2">
                    <Form.Label>Tanggal Kirim</Form.Label>
                    <Form.Control required onChange={onChange} value={tglKirim} name="tglKirim" type="date" placeholder="Tanggal Kirim" />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Nomor Paket</Form.Label>
                    <Form.Control required onChange={onChange} value={noPaket} name="noPaket" type="number" placeholder="Nomor Paket" />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Nama Penerima</Form.Label>
                    <Form.Control required onChange={onChange} value={namaPenerima} name="namaPenerima" type="text" placeholder="Nama Penerima" />
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

export default EditReport
