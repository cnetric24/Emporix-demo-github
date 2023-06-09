/**
 *  Shop Main Page
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

// import { getFilterProductsdata } from "../../services";
import ProductList from "../../widgets/ProductList";
import ShopBanner from "../../widgets/shopfilter/ShopBanner";
import SideFilter from "../../widgets/shopfilter/SideFilter";
import SocialFilter from "../../widgets/shopfilter/SocialInfo";
import TopFilter from "../../widgets/shopfilter/TopFilter";

const pageLimit = 24;
class ShopPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      limit: pageLimit,
      hasMoreProduct: true,
      getproduct: [],
      searchValue: "",
      ss: this.props.products,
      searchColor: "",
    };
  }
  componentWillMount() {
    // if (this.state.limit < this.state.getproduct.length) {
    //   setTimeout(() => {
    //     this.setState({
    //       limit: this.state.limit + 8,
    //     });
    //   }, 2500);
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.searchColor !== this.state.searchColor
    ) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-Algolia-API-Key", "9eb2ec7ff1e5ae226bb793c220b16382");
      myHeaders.append("X-Algolia-Application-Id", "XRZ5HVGA1E");

      var raw = "";

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `http://13.126.66.2:1899/algoliaSearch/${this.state.searchValue}${this.state.searchColor}/10`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) =>
          this.setState({
            ...this.state,
            searchValue: "",
            searchColor: "",
            ss: result.hits,
          })
        )
        .catch((error) => console.log("error", error));
    }
  }

  onLoadMore = () => {
    let nextLimit = this.state.limit + pageLimit;
    if (this.props.products.length < nextLimit) {
      nextLimit =
        this.state.limit + (this.props.products.length - this.state.limit);
    }

    if (this.props.products.length < pageLimit) {
      nextLimit = this.props.products.length;
    }
    this.setState({
      limit: nextLimit,
    });
  };

  searchValues = (e) => {
    console.log("ff", e.target.value);
    this.setState({ ...this.state, searchValue: e.target.value });
    // const searchResults = usersDetailsList.filter(eachUser =>
    //   eachUser.name.includes(e.target.value)
    // )
  };
  searchColors = (e) => {
    console.log("This is now testing", e.target.value);
    this.setState({ ...this.state, searchColor: e.target.value });
  };
  refreshPage = () => {
    window.location.reload(false);
  };

  clearTest = () => {
    this.setState({ ...this.state, searchValue: "", ss: this.props.products });
  };

  highToLow(e) {
    if (e.target.value == "Pricelow") {
      this.props.products.sort((a, b) => {
        return a.prices[0]?.originalAmount - b.prices[0]?.originalAmount;
      });
      this.setState({ ...this.state, ss: this.props.products });
    } else if (e.target.value == "Pricehigh") {
      this.props.products.sort((a, b) => {
        return b.prices[0]?.originalAmount - a.prices[0]?.originalAmount;
      });
      this.setState({ ...this.state, ss: this.props.products });
    } else {
      this.setState({ ...this.state, ss: this.props.products });
    }
  }
  render() {
    let { products } = this.props;
    let layoutstyle = localStorage.getItem("setLayoutStyle");

    if (layoutstyle == null) {
      layoutstyle = localStorage.setItem("setLayoutStyle", "col-sm-6 col-md-4");
    }

    // const searchResults = products?.filter((eachUser) =>
    //   eachUser?.code.toLowerCase().includes(this.state.searchValue)
    // );
    const searchResults = this.state.ss || products;

    return (
      <div className="site-content">
        <div className="inner-intro">
          <Container>
            <Row className="intro-title align-items-center">
              <Col md={6} className="text-left">
                <div className="intro-title-inner">
                  <h1>Shop</h1>
                </div>
              </Col>
              <Col md={6} className="text-right">
                <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                  <li className="home">
                    <span>
                      <Link className="bread-link bread-home" to="/">
                        Home
                      </Link>
                    </span>
                  </li>
                  <li>
                    <span>Products</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="content-wrapper section-pt mb-3 mb-md-5">
          <Container>
            <Row>
              <div className="sidebar col-xl-3 col-lg-4 desktop">
                <div className="shop-sidebar-widgets">
                  <SideFilter
                    onChange={(e) => {
                      this.setState({ limit: 0 }, () => {
                        this.onLoadMore();
                      });
                    }}
                    Test={(e) => {
                      this.searchValues(e);
                    }}
                    Test1={(e) => {
                      this.searchColors(e);
                    }}
                    ClearTest={() => {
                      this.clearTest();
                    }}
                  />
                  <SocialFilter />
                  {/* <ShopBanner /> */}
                </div>
              </div>
              <div className="content col-xl-9 col-lg-8">
                <div className="products-header">
                  <div className="loop-header">
                    <div className="loop-header-tools">
                      <div className="loop-header-tools-wrapper">
                        <TopFilter
                          totalProducts={products.length}
                          productlength={this.state.limit}
                          highToLow={(e) => {
                            this.highToLow(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {searchResults.length > 0 ? (
                  <div>
                    <Row className="products products-loop grid ciyashop-products-shortcode pgs-product-list">
                      {searchResults
                        .slice(0, this.state.limit)
                        .map((product, index) => (
                          <ProductList
                            product={product}
                            key={index}
                            layoutstyle={layoutstyle}
                            prices={this.props.allPrices}
                            cartID={this.props.cartID}
                            customerID={this.props.customerID}
                          />
                        ))}
                    </Row>

                    {products && products.length > this.state.limit ? (
                      <div className="text-center">
                        <a onClick={this.onLoadMore} className="loadmore-btn">
                          Load More
                        </a>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Row className="products products-loop grid ciyashop-products-shortcode">
                    <div className="col-sm-12 text-center  mt-5">
                      <img
                        src={require(`../../assets/images/empty-search.jpg`)}
                        className="img-fluid mb-4"
                      />
                      <h3>
                        Sorry! No products were found matching your selection!{" "}
                      </h3>
                      <p>Please try to other words.</p>
                      <button
                        onClick={this.refreshPage}
                        className="btn btn-solid"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </Row>
                )}
              </div>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (state) => ({
  // products: getFilterProductsdata(state.data, state.filters),
  products: state.data.products,
  allPrices: state?.price?.prices,
  cartID: state.cartId.cartId,
  customerID: state?.user?.user?.customer_id,
});
export default connect(mapDispatchToProps, {})(ShopPage);
