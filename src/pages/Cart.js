import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import { base_url } from '../config'
import axios from 'axios'
export default class Cart extends Component {
    constructor() {
        super()
        this.state = {
            token: "",
            customerID: "",
            customername: "",
            cart: [], //menyimpan list cart
            total: 0 //menyimpan total belanja
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    initCart = () => {
        //mengambil data pad local storage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        if (localStorage.getItem("customer") !== null) {
            let customer = JSON.parse(localStorage.getItem("customer"))
            this.setState({
                customerID: customer.customer_id,
                customername: customer.name
            })
        }
        //kalkulasi total
        let totalHarga = 0
        tempCart.map(item => {
            totalHarga += (item.price * item.qty)
        })
        //memasukan data cart user dan total harga
        this.setState({
            cart: tempCart,
            total: totalHarga
        })
    }
    componentDidMount() {
        this.initCart()
    }
    editItem = selectedItem =>{
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart =JSON.parse(localStorage.getItem("cart"))
        } 
        let index = tempCart.findIndex( it => it.product_id === selectedItem.product_id)
        let promptJumlah = window.prompt(`Masukan Jumlah ${selectedItem.name} yang beli`,selectedItem.qty)
        tempCart[index].qty = promptJumlah

        //update local storage
        localStorage.setItem("cart",JSON.stringify(tempCart))

        //refresh cart
        this.initCart()
    }
    saveCustomer = event =>{
        event.preventDefault()
        let form = new FormData()
    }
    dropItem = selectedItem =>{
        if (window.confirm(`Apakah anda yakin menghapus ${selectedItem.name} dari Cart?`)) {
            let tempCart = []
            if (localStorage.getItem("cart") !== null) {
                tempCart =JSON.parse(localStorage.getItem("cart"))
            }
            let index = tempCart.findIndex(it => it.product_id === selectedItem.product_id)
            tempCart.splice(index,1)

            //update local storage
            localStorage.setItem("cart",JSON.stringify(tempCart))
            //refresh cart
            this.initCart()
        }
    }
    checkOut = ()=>{
        let tempCart= []
        if (localStorage.getItem("cart")!== null) {
            tempCart=JSON.parse(localStorage.getItem("cart"))
        }
        let data = {
            customer_id:this.state.customerID,
            detail_transaksi : tempCart
        }
        let url = base_url + "/transaksi"
        axios.post(url,data,this.headerConfig())
        .then(response =>{
            //clear cart
            window.alert(response.data.message)
            localStorage.removeItem("cart")
            window.location="/transaction"
        })
        .catch(error =>{
            if (error.response) {
                if (error.resonse.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="card col-12 mt-2">
                        <div className="card-header bg-primary text-white">
                            <h4>Cart List</h4>
                        </div>

                        <div className="card-body">
                            <h5 className="text-primary">
                                Customer: {this.state.customername}
                            </h5>

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>QTY</th>
                                        <th>Total</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.cart.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.qty}</td>
                                            <td className="text-right">
                                                RP {item.price}
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-info m-1"
                                                onClick={()=>this.editItem(item)}>
                                                    Edit
                                                </button>

                                                <button className="btn btn-sm btn-warning m-1"
                                                onClick={()=>this.dropItem(item)}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3">Total</td>
                                        <td className="text-right">
                                            Rp {this.state.total}
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-success btn-block m-1"
                                            onClick={() => this.checkOut()} disabled={this.state.cart.length === 0}>
                                                CheckOut
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}