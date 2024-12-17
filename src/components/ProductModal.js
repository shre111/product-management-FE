import React, { Component } from "react";
import "./ProductModal.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: "",
        price: "",
        discountPercentage: "",
        quantityInStock: "",
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.initialProduct !== prevProps.initialProduct) {
      this.setState({ product: this.props.initialProduct || {} });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const updatedProduct = {
        ...prevState.product,
        [name]: value,
      };

      if (updatedProduct.price && updatedProduct.discountPercentage) {
        const price = parseFloat(updatedProduct.price) || 0;
        const discountPercentage =
          parseFloat(updatedProduct.discountPercentage) || 0;
        updatedProduct.finalPrice = (
          price -
          (price * discountPercentage) / 100
        ).toFixed(2);
      }

      return { product: updatedProduct };
    });
  };

  resetForm=()=>{
    this.setState({
      product: {
        name: "",
        price: "",
        discountPercentage: "",
        quantityInStock: "",
        finalPrice: "",
      },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.product);
    this.resetForm()
  };

  render() {
    const { isOpen, onClose, state } = this.props;
    const { product } = this.state;

    if (!isOpen) return null;

    return (
  
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {console.log("state",state  )}
              <h5 className="modal-title" id="productModalLabel">
               {state === "view" ? "Product details" : (this.props.initialProduct ? "Edit Product" : "Add Product") }
              </h5>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={product.name}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={product.price}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Discount Percentage</label>
                  <input
                    type="text"
                    className="form-control"
                    name="discountPercentage"
                    value={product.discountPercentage}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Final Price</label>
                  <input
                    type="text"
                    className="form-control"
                    name="finalPrice"
                    value={product.finalPrice}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity In Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantityInStock"
                    value={product.quantityInStock}
                    onChange={this.handleChange}
                    required
                    min="0"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-actions">
                  {state !== "view" && <button type="submit">Save</button>}
                  <button type="button" onClick={()=>{
                    if(state!== "view"){
                      this.resetForm()
                    }
                    onClose()}}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductModal;
