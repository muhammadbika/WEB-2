'use client';
import axios from 'axios';
import {useEffect, useState} from 'react';

export default function ViewPage() {
    //buat react hook useEffect untuk menyimpann data barang dari API
    //formula
    //barang 
    //setBarang = useState([]);
    const [barang, setBarang] = useState([]);
    //buat arrow function untuk menampilkan data barang dari API
const getBarang = async  () => {
    const response = await axios.get(
    "http://localhost:3000/api/barang"
    );
    // console.log(response.data.data);
    // simpan barang
    setBarang(response.data.data);
};
    useEffect(() => {
        //panggil fungsi barang 
        getBarang();    
    },[]);
    
    return (
        <> 
            <div>Halaman Lihat Barang dan tampil</div>
        </>
    )
}

