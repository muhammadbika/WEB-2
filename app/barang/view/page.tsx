'use client';
import axios from 'axios';
import {useEffect, useState} from 'react';

//buat interface untuk tipe data barang
interface Barang {
    id: number;
    kode: string;
    nama: string;
    harga: number;
    stok: number;
}

export default function ViewPage() {
    //buat react hook useEffect untuk menyimpann data barang dari API
    //formula
    //barang = output
    //setBarang = input
    const [barang, setBarang] = useState<Barang[]>([]);
    //buat arrow function untuk menampilkan data barang dari API
    useEffect(() => {
    const getBarang = async  () => {
        const response = await axios.get(
            "http://localhost:3000/api/barang"
        );
    
        // console.log(response.data.data);
        // simpan barang
    setBarang(response.data.data);
    };
        //panggil fungsi barang 
        getBarang();    
    },[]);
    
    return (
        <> 
            <div>Halaman Lihat Barang dan tampil</div>
            {
                //tampilkan data barang dengan looping
                barang.map((item) => (
                    <div key={item.id}>
                        <p>{item.kode}</p>
                        <p>{item.nama}</p>
                        <p>{item.harga}</p>
                        <p>{item.stok}</p>
                    </div>
                ))
            }
        </>
    )
}

