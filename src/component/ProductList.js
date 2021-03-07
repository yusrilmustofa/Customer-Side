import React,{Component} from 'react'

export default class ProductList extends Component{
    render(){
        return(
            <div className="col-lg-6  col-sm-12 p-2">
                <div className="card">
                    <div className="card-body row">
                        {/* Menampilkan Gambar/Cover */}
                        <div className="col-5">
                            <img src={this.props.image} className="img"
                            height="200" width="200" alt={this.props.name} />
                        </div>
                        {/* Deskripsi */}
                        <div className="col-7">
                            <h5 className="text-info">
                                {this.props.name}
                            </h5>
                            <h6 className="text-danger">
                               PRICE: {this.props.price}
                            </h6>
                            <h6 className="text-dark">
                                STOCK: {this.props.stock}
                            </h6>

                            <button className="btn btn-sm btn-success m-1"
                            onClick={this.props.onCart}>
                                Tambah ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}