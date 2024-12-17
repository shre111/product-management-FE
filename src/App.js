import React, { Component } from "react";
import ProductService from "./utils/api";
import ProductModal from "./components/ProductModal";
import ProductTable from "./components/ProductTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isModalOpen: false,
      selectedProduct: null,
      state: "",
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const data = await ProductService.getProducts();
      this.setState({ products: data });
    } catch (error) {
      toast.error("Error fetching products!");
      console.error("Error fetching products:", error);
    }
  };

  handleAddProduct = (newProduct) => {
    ProductService.addProduct(newProduct)
      .then((product) => {
        this.setState({ isModalOpen: false });
        if (product.message) {
          this.fetchProducts();
        }
        toast.success(product?.message);
      })
      .catch((error) => {
        toast.error("Error adding product!");
      });
  };

  handleUpdateProduct = (updatedProduct) => {
    ProductService.updateProduct(updatedProduct.id, updatedProduct)
      .then((res) => {
        this.fetchProducts();
        this.setState({ isModalOpen: false, selectedProduct: null });
        toast.success(res?.message);
      })
      .catch((error) => {
        toast.error("Error updating product!");
      });
  };

  handleEditProduct = (product, state) => {
    this.setState({ selectedProduct: product, isModalOpen: true, state });
  };

  handleViewProducts = (product) => {
    this.setState({ selectedProduct: product, isModalOpen: true });
  };

  handleDeleteProduct = (id) => {
    ProductService.deleteProduct(id)
      .then((res) => {
        this.fetchProducts();
        toast.success(res?.message);
      })
      .catch((error) => {
        toast.error("Error deleting product!");
      });
  };

  render() {
    const { products, isModalOpen, selectedProduct, state } = this.state;

    return (
      <div className="app-container">
        <ToastContainer />
        <h1>Product Management</h1>
        <button
          className="btn-add"
          onClick={() => this.setState({selectedProduct:null, isModalOpen: true})}
        >
          Add Product
        </button>
        <ProductTable
          products={products}
          onView={this.handleViewProducts}
          onEdit={this.handleEditProduct}
          onDelete={this.handleDeleteProduct}
        />
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => this.setState({ isModalOpen: false, state:null })}
          onSubmit={
            selectedProduct ? this.handleUpdateProduct : this.handleAddProduct
          }
          initialProduct={selectedProduct}
          state={state}
        />
      </div>
    );
  }
}

export default App;
