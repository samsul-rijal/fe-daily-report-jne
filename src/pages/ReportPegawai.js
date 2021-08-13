import React, { useEffect, useState } from 'react'
import { API } from '../config/api'
import Header from '../components/Header'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ReportPegawai = () => {
    const [data, setData] = useState([])

    const [input, setInput] = useState("")
    const [output, setOutput] = useState([])

    const loadReport = async () => {
        try {
            const response = await API.get('/reports')
            console.log(response)

            setData(response.data.data.reports)

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
            if (val.tglKirim.toLowerCase().includes(input.toLocaleLowerCase()) || val.user.nama.toLowerCase().includes(input.toLocaleLowerCase())) {
                setOutput(output => [...output, val])
            }
        })
    }, [input])

    return (
        <div>
            <Header />

            <div>
                <input type="text" onChange={e => setInput(e.target.value)} className="search-input" placeholder="Cari Nama" />
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
                        </tr>
                    </thead>
                    <tbody>
                        {output.map((report, i) => (
                            <tr>
                                <td>{++i}</td>
                                <td>{report.user.nama}</td>
                                <td>{(report.tglKirim.length > 10) ? report.tglKirim.substring(0, 10) : report.tglKirim}</td>
                                <td>{report.noPaket}</td>
                                <td>{report.namaPenerima}</td>
                                <td>{report.alamat}</td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

            </div>
        </div>
    )
}

export default ReportPegawai
