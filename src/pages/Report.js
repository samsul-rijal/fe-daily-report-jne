import React, { useEffect, useState } from 'react'
import { API } from '../config/api'
import Header from '../components/Header'
import '../assets/css/report.css'
import { Table, Modal, Form, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import FormAddReport from '../components/FormAddReport'

const Report = () => {
    const [showReport, setShowReport] = useState(false);

    const handleCloseReport = () => setShowReport(false);
    const handleShowReport = () => setShowReport(true);

    const [data, setData] = useState([])

    const { id } = useParams()

    const [input, setInput] = useState("")
    const [output, setOutput] = useState([])

    const loadReport = async () => {
        try {
            const response = await API.get(`/report/${id}`)
            console.log(response)

            setData(response.data.data.report)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteById = async (id) => {
        try {
            await API.delete(`/report/${id}`)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadReport()
    }, [])

    useEffect(() => {
        setOutput([])
        data.filter(val => {
            if (val.tglKirim.toLowerCase().includes(input.toLocaleLowerCase())) {
                setOutput(output => [...output, val])
            }
        })
    }, [input])

    return (
        <div className="report">
            <Header />

            <div className="add-report">
                <button className="btn-add-report" onClick={handleShowReport}>Tambah Report</button>
            </div>

            <div>
                <input type="date" onChange={e => setInput(e.target.value)} className="search-input" />
            </div>

            <div className="table-report">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Kurir</th>
                            <th>Tanggal Kirim</th>
                            <th>Nomor Paket</th>
                            <th>Nama Penerima</th>
                            <th>Alamat</th>
                            <th colSpan="2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((report, i) => (
                            <tr>
                                <td>{++i}</td>
                                <td>{report.user.nama}</td>
                                <td>{(report.tglKirim.length > 10) ? report.tglKirim.substring(0, 10) : report.tglKirim}</td>
                                <td>{report.noPaket}</td>
                                <td>{report.namaPenerima}</td>
                                <td>{report.alamat}</td>
                                <td>
                                    <Link to={`/edit-report/${report.id}`}>
                                        <Button variant="warning" size="sm">Edit</Button>
                                    </Link>
                                </td>
                                <td>
                                    <Button onClick={() => deleteById(report.id)} size="sm" variant="danger">Delete</Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

            </div>

            <Modal show={showReport} onHide={handleCloseReport} animation={true}>
                <div className="bg-dark">
                    <Modal.Title id="contained-modal-title-vcenter">
                        Tambah Report
                    </Modal.Title>
                </div>

                <Modal.Body className="bg-dark">
                    <FormAddReport />
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default Report
