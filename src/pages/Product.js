import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import ProductList from "../component/ProductList"
import {base_url,product_image_url} from '../config'
import axios from 'axios'

export default class Product extends Component {
    constructor() {
        super()
        this.state={
            products:[],
            token:"",
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        }else{
            window.location="/login"
        }
        this.headerConfig.bind(this)
    }
    headerConfig =() =>{
        let header ={
            headers:{Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    getProduct =() =>{
        let url = base_url + "/product"
        axios.get(url,this.headerConfig())
        .then(response =>{
            this.setState({products:response.data})
        })
        .catch(error =>{
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount(){
        this.getProduct()
    }
    addToCart = (selectedItem) =>{
        // membuat sebuah variabel untuk menampung data
        let tempCart =[]
        //cek eksistensi
        if (localStorage.getItem("cart") !== null) {
            tempCart=JSON.parse(localStorage.getItem("cart"))
            //JSON Parse digunakan untuk mengkonversi dari String ke Array
        }
        //cek data yang dipilih
        let existItem = tempCart.find(item => item.product_id === selectedItem.product_id)
        if (existItem) {
            //jika item yang dipilih sudah ada
            window.alert(`Anda telah memasukan ${selectedItem.name}`)
        }else{
            //user diminta memasukan jumlah ang ingin dibeli
            let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.name} yang beli`,"")
            if(promptJumlah !== null && promptJumlah !== ""){
                //Jika user masukan jumlah beli
                //menambahkan properti
                selectedItem.qty = promptJumlah

                //masukan item yg dipilij ke dalam cart
                tempCart.push(selectedItem)
                //simpan Array
                localStorage.setItem("cart",JSON.stringify(tempCart))
                
            }
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Product List</h3>
                    <div className="row">
                        {this.state.products.map(item =>(
                           <ProductList 
                           key ={item.product_id}
                           name ={item.name}
                           price={item.price}
                           stock ={item.stock}
                           image ={product_image_url + "/" + item.image}
                           onCart ={() => this.addToCart(item)}
                           /> 
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}