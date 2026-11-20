//import { PrismaClient } from "@/generated/prisma/internal/class";
//import { PrismaPg } from "@prisma/adapter-pg";
import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { NextRequest } from "next/server";


// Buat fungsi (arrow function) API (GET)
export const GET = async () => {
    //tampilkan data barang
    const barang= await prisma.tb_barang.findMany();
    

    //jika data barang kosong atau tidak ditemukan
    if(barang.length === 0){
        return NextResponse.json({
        success: false,
        message: "Data Barang Tidak Ditemukan",
        data: null,
        meta :{
            code : 404,
            total: barang.length,
        }
    },{ status: 404 }
    );
    }
    return NextResponse.json({
        success: true,
        message: "Berhasil menampilkan data barang",
        data: barang,
        meta :{
            code : 200,
            total: barang.length,
        }
    })
    //tampilkan hasil (respon)
    
};

//buat fungsi simpan data barang (POST)
export const POST = async(request : NextRequest ) => { 
    //buat variabel untuk menampung data agar bersifat dinamis
    const body = await request.json();
    //cek kode barang apakah sudah ada atau belum
    const check = await prisma.tb_barang.findUnique({
        where: {
            kode: body.kode
        }
    });

    //jika kode barang sudah ada
    if(check){ 
        return NextResponse.json({
            success: false,
            message: "Kode Barang Sudah Ada",
            data: null,
            meta :{
                code : 409,
            }
        },{ status: 409 }
        );
    }
    return NextResponse.json({
        success: true,
        message: "Kode Barang Belum Ada",
        meta :{
            code : 200,
            total: 0,
        }
    })


    //simpan data barang
    const barang = await prisma.tb_barang.create({
        data: {
            kode : body.kode,
            nama : body.nama,
            harga : body.harga,
            stok : body.stok,
            keterangan : body.keterangan,
        },
    });

    //tampilkan hasil (respon)
    return NextResponse.json({
        success: true,
        message: "Berhasil menyimpan data barang",
        data: barang,
        meta :{
            code : 201,
            total: 1,
        }
    },{ status: 201 }
    );
}

