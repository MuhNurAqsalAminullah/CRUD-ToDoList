import { createBrowserHistory } from '@remix-run/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    // let history = createBrowserHistory()
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [kegiatan, setKegiatan] = useState('')
    const [ID, setID] = useState(null);
    const sendDataUpdate = () => {
        axios.put(`http://localhost:3006/list/${ID}`, {
            name,
            kegiatan
        })
        navigate('/')
    }

    useEffect(() => {
        setName(localStorage.getItem('name'))
        setKegiatan(localStorage.getItem('kegiatan'))
        setID(localStorage.getItem('ID'))
    }, [])
    return (
        <div className='sm:mx-5 sm:mt-5 md:mx-[200px] lg:mx-[400px]'>
            <div className='rounded shadow-cutome'>
            <h2 className='sm:text-lg md:text-xl lg:text-2xl text-center bg-[#ff5858] text-white p-3 font-bold rounded-t'>Edit Kegiatan</h2>
                <form className='sm:p-5' onSubmit={sendDataUpdate} >
                    <div className='sm:flex sm:flex-col '>
                        <label className='font-semibold'>Username</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Masukkan nama' className='outline-none border-b border-black' />
                    </div>
                    <div className='sm:flex sm:flex-col sm:mt-5'>
                        <label className='font-semibold'>Kegiatan</label>
                        <input value={kegiatan} onChange={(e) => setKegiatan(e.target.value)} type="text" placeholder='Masukkan kegiatan' className='outline-none border-b border-black' />
                    </div>
                    <div className='sm:flex sm:justify-end mt-3'>
                        <button type='submit' className='border border-[#ff5858] text-[#ff5858] hover:bg-[#ff5858] hover:text-white font-semibold rounded sm:px-3 sm:py-1'>Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;

