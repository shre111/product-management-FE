import React, { Component } from "react";

class ProductTable extends Component {
  state = {
    showModal: false,
    selectedProductId: null,
  };

  handleDeleteClick = (productId) => {
    this.setState({
      showModal: true,
      selectedProductId: productId,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      selectedProductId: null,
    });
  };

  handleConfirmDelete = () => {
    const { onDelete } = this.props;
    const { selectedProductId } = this.state;

    if (selectedProductId) {
      onDelete(selectedProductId);
    }

    this.handleCloseModal();
  };
  render() {
    const { products, onEdit, onDelete } = this.props;
    const { showModal } = this.state;

    return (
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr key={index + 1}>
                  <td>{product?.name}</td>
                  <td>{product?.price}</td>
                  <td>{product?.discountPercentage}</td>
                  <td>{product?.quantityInStock}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(product, "view")}
                    >
                      View
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => this.handleDeleteClick(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this product?</p>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={this.handleCloseModal}>
                  Cancel
                </button>
                <button
                  className="btn-confirm"
                  onClick={this.handleConfirmDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductTable;
