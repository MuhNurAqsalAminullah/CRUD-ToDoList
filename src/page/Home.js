import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [list , setList] = useState([])
    const [dataSeacrh, setDataSearch] = useState([])
    const [listInput, setListInput] = useState('')
    const [show, setShow] = useState(false)

    const handleAdd = () => {
        setShow(true)
    }

    useEffect(() => {
        const gettingData = async() => {
            try{
                const {data : response} = await axios.get('http://localhost:3006/list')
                setList(response)
                setDataSearch(response)
            }catch (error) {
                console.log(error);
            }
        }
        setList(gettingData)
        setDataSearch(gettingData)
    }, [])

    const handleSearch = () => {
        const newData = list
        .filter (x => x.name == (listInput == '' ? x.name : listInput))
        console.log(listInput);
        setDataSearch(newData)
    }

    
    const [name, setName] = useState('')
    const [kegiatan, setKegiatan] = useState('')

    const saveList = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3006/list', {
                name,
                kegiatan
            },window.location.reload())
        }catch (error) {
            console.log(error);
        }
    }

    const deleteData = async(id, e) => {
        await axios.delete(`http://localhost:3006/list/${id}`)
        console.log('berhasil');
        window.location.reload()
    }

    const update = async(id, name, kegiatan) => {
        console.log(id, name, kegiatan);
        localStorage.setItem('ID', id)
        localStorage.setItem('name', name)
        localStorage.setItem('kegiatan', kegiatan)
    }
    return (
        <div>
            <div className='bg-custome sm:flex sm:flex-col sm:justify-center sm:gap-y-5'>
                <div className='sm:flex sm:justify-center '>
                    <input onChange={(e) => setListInput(e.target.value)} type="text" placeholder='Cari...' className='outline-none border-none sm:pl-2 md:w-[300px] lg:w-[400px] rounded-l' />
                    <button onClick={handleSearch} className='sm:py-1 sm:px-3 bg-[#ff5858] rounded-r text-white font-semibold'>Search</button>
                </div>
                <div className='sm:flex sm:justify-center'>
                    <button onClick={handleAdd} className='sm:py-1 sm:px-3 bg-[#ff5858] rounded w-fit text-white font-semibold'>Tambah</button>
                </div>
            </div>

            {
                show ? 
                <div className='sm:mx-5 sm:mt-5 md:mx-[200px] lg:mx-[400px]'>
                    <form className='' onSubmit={saveList}>
                        <div className='sm:flex sm:flex-col'>
                            <label>Username</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Masukkan nama' className='outline-none border-b border-black' />
                        </div>
                        <div className='sm:flex sm:flex-col sm:mt-3'>
                            <label>Kegiatan</label>
                            <input value={kegiatan} onChange={(e) => setKegiatan(e.target.value)} type="text" placeholder='Masukkan kegiatan' className='outline-none border-b border-black' />
                        </div>
                        <div className='sm:flex sm:justify-end mt-3'>
                            <button type='submit' className='border border-[#ff5858] text-[#ff5858] hover:bg-[#ff5858] hover:text-white font-semibold rounded sm:px-3 sm:py-1'>Simpan</button>
                        </div>
                    </form>
                </div> : null
            }

            <div className='sm:px-5'>
                <div className='md:flex sm:flex-wrap sm:justify-between'>
                    {
                        dataSeacrh && dataSeacrh.length > 0 ?
                        dataSeacrh.map(items => (
                        <div key={items.id} className='sm:mt-10 sm:flex sm:flex-col sm:justify-between shadow-cutome rounded md:w-[48%] lg:w-[24%]'>
                            <h4 className='sm:text-xl sm:py-2 bg-[#ff5858] text-white text-center font-semibold rounded-t'>{items.name}</h4>
                            <h2 className='sm:p-2 sm:mt-1'>{items.kegiatan}</h2>
                            <div className='sm:flex sm:gap-x-3 sm:p-2 sm:mt-3 sm:mb-1'>
                                <Link to={'/update'} className='sm:py-1 sm:w-full sm:flex sm:justify-center bg-[#ff5858] rounded w-fit text-white font-semibold'>
                                    <button onClick={() => update(items.id, items.name, items.kegiatan)} >Edit</button>
                                </Link>
                                <button onClick={(e) => deleteData(items.id, e)} className='sm:py-1 sm:w-full bg-[#ff5858] rounded w-fit text-white font-semibold'>Delete</button>
                            </div>
                        </div>
                        ))
                        :
                        <div>
                            <p>Daftar tidak ditemukan</p>
                        </div> 
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;