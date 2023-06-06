/**
 * Top Salling Product Widgets
 */
import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import MyProducts from "../api/product.json";
import { addToCartItem } from "../actions/Cart";
import { connect } from "react-redux";

class TopSellingProduct extends Component {
  constructor(props) {
    super(props);
    this.AddToCart = this.AddToCart.bind(this);
    this.AddToWishList = this.AddToWishList.bind(this);
    var AddToCart, AddToWishList;
  }

  AddToCart(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus, Sku) {
    var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));

    if (Cart == null) Cart = new Array();
    let selectedProduct = Cart.find(
      (product) => product.ProductID === ProductID
    );
    if (selectedProduct == null) {
      Cart.push({
        ProductID: ProductID,
        ProductName,
        ProductImage: ProductImage,
        Qty: Qty,
        Rate: Rate,
        StockStatus: StockStatus,
        Sku: Sku,
      });
      localStorage.removeItem("LocalCartItems");
      localStorage.setItem("LocalCartItems", JSON.stringify(Cart));
      let pricelist = [];
      this.props.allPrices.map((each, index) => {
        if (each.itemId.id === ProductID) {
          pricelist.push(each);
        }
      });

      if (pricelist.length > 0) {
        addToCartItem(this.props.cartID, ProductID, pricelist);
      }

      toast.success("Item Added to Cart");
    } else {
      toast.warning("Item is already in Cart");
    }
    console.log("this is stipe", Cart);
  }

  AddToWishList(
    ProductID,
    ProductName,
    ProductImage,
    Qty,
    // Rate,
    StockStatus,
    Sku
  ) {
    var Cart = JSON.parse(localStorage.getItem("LocalWishListItems"));

    if (Cart == null) Cart = new Array();

    let selectedProduct = Cart.find(
      (product) => product.ProductID === ProductID
    );
    if (selectedProduct == null) {
      Cart.push({
        ProductID: ProductID,
        ProductName: ProductName,
        ProductImage: ProductImage,
        Qty: Qty,
        // Rate: Rate,
        StockStatus: StockStatus,
        Sku: Sku,
      });
      localStorage.removeItem("LocalWishListItems");
      localStorage.setItem("LocalWishListItems", JSON.stringify(Cart));

      toast.success("Item Added to WishList");
    } else {
      toast.warning("Item is already in WishList");
    }
  }
  CheckCardItem(ID) {
    let checkcart = false;
    var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
    if (Cart && Cart.length > 0) {
      for (const cartItem of Cart) {
        if (cartItem.ProductID === ID) {
          checkcart = true;
        }
      }
    }
    return checkcart;
  }
  CheckWishList(ID) {
    let wishlist = false;
    var Wish = JSON.parse(localStorage.getItem("LocalWishListItems"));

    if (Wish && Wish.length > 0) {
      for (const wishItem of Wish) {
        if (wishItem.ProductID === ID) {
          wishlist = true;
        }
      }
    }
    return wishlist;
  }

  rating(productrat) {
    let rat = [];
    let i = 1;
    while (i <= 5) {
      if (i <= productrat) {
        rat.push(<i className="fa fa-star" />);
      } else {
        rat.push(<i className="fa fa-star-o" />);
      }
      i += 1;
    }
    return rat;
  }

  getProductPrice(id) {
    let price;

    this.props.allPrices.map((each, index) => {
      if (each?.itemId?.id === id) {
        price =
          each?.tierValues[0]?.priceValue - each?.salePrice?.discountAmount;
      }
    });

    return price;
  }

  render() {
    console.log("final testing...", this.props.products[10]);
    return (
      <Row className="products products-loop grid ciyashop-products-shortcode">
        <ToastContainer autoClose={1000} />

        {this.props?.products?.map((product, index) =>
          index < 20 ? (
            <Col sm={6} lg={3}>
              <div className="product product_tag-black product-hover-style-default product-hover-button-style-dark product_title_type-single_line product_icon_type-line-icon">
                <div className="product-inner element-hovered">
                  <div className="product-thumbnail">
                    <div className="product-thumbnail-inner">
                      <Link to={`/shop/${product?.id}`}>
                        {product?.medias ? (
                          <div className="product-thumbnail-main">
                            <img
                              src={`${product?.medias[0]?.url}`}
                              className="img-fluid"
                              alt="shop"
                            />
                          </div>
                        ) : (
                          <img src="shop" className="img-fluid" alt="shop" />
                        )}
                        {/* <div className="product-thumbnail-swap">
                          <img
                            src={`${product.pictures[1]}`}
                            className="img-fluid"
                            alt="shop"
                          />
                        </div> */}
                      </Link>
                    </div>
                    <div className="product-actions">
                      <div className="product-actions-inner">
                        <div className="product-action product-action-add-to-cart">
                          {!this.CheckCardItem(product.id) ? (
                            <Link
                              onClick={() => {
                                if (this.props.customerID) {
                                  this.AddToCart(
                                    product?.id[(0, 23)],
                                    product?.code,
                                    product?.medias[0]?.url,
                                    1,
                                    this.getProductPrice(product?.id[(0, 23)]),
                                    "In Stock",
                                    product?.id
                                  );
                                } else {
                                  toast.error("Please Login...");
                                }
                              }}
                              className="button add_to_cart_button"
                              rel="nofollow"
                            >
                              Add to cart
                            </Link>
                          ) : (
                            <Link
                              to="/ShopingCart"
                              className="button add_to_cart_button"
                              rel="nofollow"
                            >
                              View Cart
                            </Link>
                          )}
                        </div>
                        {/* <div className="product-action product-action-wishlist">
                          {!this.CheckWishList(product.id) ? (
                            <Link
                              onClick={() =>
                                this.AddToWishList(
                                  product.id,
                                  product.name.en,
                                  product.media[0].url,
                                  1,
                                
                                  "In Stock",
                                  product.id
                                )
                              }
                              className="add_to_wishlist"
                              data-toggle="tooltip"
                              data-original-title="Wishlist"
                              data-placement="top"
                            >
                              {" "}
                              Add to Wishlist
                            </Link>
                          ) : (
                            <Link
                              to="/wishlist"
                              className="add_to_wishlist_fill"
                              data-toggle="tooltip"
                              data-original-title="Wishlist"
                              data-placement="top"
                            >
                              View Wishlist
                            </Link>
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="product-info">
                    <span className="ciyashop-product-category">
                      {/* {product.category} */}
                    </span>
                    <h3 className="product-name">
                      <Link to={`/shop/${product?.id}`}>{product?.code} </Link>
                    </h3>
                    <div className="product-rating-price">
                      <span className="price">
                        <ins>
                          <span className="price-amount amount">
                            <span className="currency-symbol">$</span>
                            {product?.prices &&product.prices[0]?.originalAmount}

                            {/* {this.getProductPrice(product?.id) || ""} */}
                          </span>
                        </ins>
                      </span>
                      {/* <div className="product-rating">
                        {this.rating(product.rating)}
                      </div> */}
                    </div>
                    <div className="product-details__short-description">
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ) : (
            <div></div>
          )
        )}
      </Row>
    );
  }
}

const mapDispatchToProps = (state) => {
  let products = [];
  if (state.data.products && state.data.products.length > 0) {
    let category = [];
    state.data.products.reverse().forEach((info) => {
      if (info.tags && info.tags.length > 0) {
        if (!category.includes(info.tags[0]) && products.length < 4) {
          products.push(info);
        }
        category.push(info.tags[0]);
      }
    });
  }
  return {
    products: state.data.products,
    customerID: state?.user?.user?.customer_id,
    allPrices: state?.price?.prices,
    cartID: state.cartId.cartId,
  };
};
export default connect(mapDispatchToProps, {})(TopSellingProduct);
