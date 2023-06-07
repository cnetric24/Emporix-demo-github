/**
 * Shop Page Side Bar Filter
 */
import { Slider } from "antd";
import React, { Component, useRef } from "react";
import { connect } from "react-redux";
import {
  categoryValue,
  colorValue,
  priceValue,
  searchValue,
  sizeValue,
} from "../../actions/filter";
import {
  uniqueCategory,
  uniqueColors,
  uniqueMinMaxPrice,
  uniqueSizes,
} from "../../services";
import { Scrollbars } from "react-custom-scrollbars";
import { bindActionCreators } from "redux";
import { getSearchProduct } from "../../actions/Search";
import debounce from "lodash.debounce";
class SideFilter extends Component {
  searchTextchangeFunc = undefined;
  constructor(props) {
    super(props);
    console.log("props =>", props);
    this.state = {
      SearchValue: "",
      priceplace: [this.props.prices.min, this.props.prices.max],
      setfistprice: [this.props.prices.min, this.props.prices.max],
      sidebarmenu: false,
      selectColor: "",
    };
    this.showfilter = this.showfilter.bind(this);
    this.searchTextchangeFunc = debounce(this.SearchTextchange, 400);
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      SearchValue: "",
    });
    this.props.searchValue("");
    this.nameInput.focus();
  }

  // componentWillMount() {
  // this.getCategories() 

  // }

  // getCategories() {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("X-Algolia-API-Key", "9eb2ec7ff1e5ae226bb793c220b16382");
  //   myHeaders.append("X-Algolia-Application-Id", "XRZ5HVGA1E");

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch(`http://13.126.66.2:1899/getAllCategories`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => console.log("get categories ", result))
  //     .catch((error) => console.log("error", error));
  // }

  handleChange = (event) => {
    console.log(event.target.value);
    this.props.Test1(event);
    this.setState({ ...this.state, selectColor: event.target.value });
  };
  showfilter() {
    this.setState((prevState) => ({
      sidebarmenu: !prevState.sidebarmenu,
    }));
  }
  onClickColorFilter = (event, colors) => {
    var index = colors.indexOf(event.target.value);
    if (event.target.checked) {
      colors.push(event.target.value);
    } else {
      colors.splice(index, 1);
    }
    this.props.colorValue(colors);
  };

  onClickCategoryFilter(event, categorys) {
    var index = categorys.indexOf(event.target.value);
    if (event.target.checked) {
      categorys.push(event.target.value);
    } else {
      categorys.splice(index, 1);
    }
    this.props.categoryValue(categorys);
    this.props.onChange();
  }

  onClickSizeFilter(event, sizes) {
    var index = sizes.indexOf(event.target.value);
    if (event.target.checked) {
      sizes.push(event.target.value);
    } else {
      sizes.splice(index, 1);
    }
    this.props.sizeValue(sizes);
  }
  SearchTextchange(searchText) {
    console.log("search method called", this.props);
    // this.props.searchValue(SearchText.target.value);
    // this.props
    //   .getSearchProduct(searchText, this.props.totalCategory)
    //   .then((response) => {
    //     if (response.status == 200) {
    //       if (response.searchText == this.state.SearchValue) {
    //         this.props.onChange();
    //       } else {
    //         this.searchTextchangeFunc(this.state.SearchValue);
    //       }
    //     }
    //   });
  }

  onChangePricePlace = (values) => {
    var maximumval = this.props.prices.max / 5;

    var value = {
      min: values["0"],
      max: values["1"],
    };
    if (value.min == 0) {
      value.min = 0;
    } else if (value.min > 0 && value.min <= 20) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 1)) / 20));
    } else if (value.min > 20 && value.min <= 40) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 2)) / 40));
    } else if (value.min > 40 && value.min <= 60) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 3)) / 60));
    } else if (value.min > 60 && value.min <= 80) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 4)) / 80));
    } else if (value.min > 80 && value.min <= 100) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 5)) / 100));
    } else {
      value.min = false;
    }

    if (value.max === 0) {
      value.max = 0;
    } else if (value.max > 0 && value.max <= 20) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 1)) / 20));
    } else if (value.max > 20 && value.max <= 40) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 2)) / 40));
    } else if (value.max > 40 && value.max <= 60) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 3)) / 60));
    } else if (value.max > 60 && value.max <= 80) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 4)) / 80));
    } else if (value.max > 80 && value.max <= 100) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 5)) / 100));
    } else {
      value.max = false;
    }
    this.setState(
      {
        priceplace: values,
      },
      () => {
        this.props.onChange();
      }
    );
    this.props.priceValue({ value });
  };
  fncl = (value) => {
    return Number.parseFloat(value).toFixed(0);
  };
  convertValue = (labelValue) => {
    return labelValue.toLocaleString("en", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  toolformatter = (value) => {
    var maximumval = this.props.prices.max / 5;
    if (value === 0) {
      value = "0";
    } else if (value > 0 && value <= 20) {
      value = (value * (maximumval * 1)) / 20;
    } else if (value > 20 && value <= 40) {
      value = (value * (maximumval * 2)) / 40;
    } else if (value > 40 && value <= 60) {
      value = (value * (maximumval * 3)) / 60;
    } else if (value > 60 && value <= 80) {
      value = (value * (maximumval * 4)) / 80;
    } else if (value > 80 && value <= 100) {
      value = (value * (maximumval * 5)) / 100;
    }
    return this.convertValue(value);
  };

  clearprice(pricesval) {
    var value = {
      min: pricesval.min,
      max: pricesval.max,
    };
    this.setState({
      priceplace: [this.props.prices.min, this.props.prices.max],
    });
    this.props.priceValue({ value });
    this.props.onChange();
  }
  // Clear Color Filter Code
  clearcolor() {
    var colors = [];
    this.props.colorValue(colors);
    this.props.onChange();
    this.setState({ ...this.state, selectColor: "" });
    this.props.ClearTest();
  }
  clearsizes() {
    this.setState({ ...this.state, selectColor: "" });
  }

  // Clear Category Filter Code
  clearcategory() {
    var categorys = [];
    this.props.categoryValue(categorys);
    this.props.onChange();
  }
  // Clear Size Filter Code
  clearsize() {
    var sizes = [];
    this.props.sizeValue(sizes);
    this.props.onChange();
  }
  render() {
    let colorList = ["RED", "BLUE"];
    var max = this.props.prices.max;
    var maxdivide = max / 5;
    const marks = {
      0: 0,
      20: (maxdivide * 1).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      40: (maxdivide * 2).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      60: (maxdivide * 3).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      80: (maxdivide * 4).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      100: max.toLocaleString(navigator.language, { minimumFractionDigits: 0 }),
    };
    const sizeFilterValues = this.props.filters.size;
    const categoryFilterValues = this.props.filters.category;
    const colorsFilterValues = this.props.filters.color;
    console.log("categoryFilterValues", categoryFilterValues);
    return (
      <div>
        <div className="">
          <h4 className="widget-title">Search</h4>
          <input
            type="text"
            id="btn-search"
            ref={(input) => {
              this.nameInput = input;
            }}
            className="form-control"
            value={this.state.SearchValue}
            onChange={(e) => {
              this.setState({
                ...this.state,
                SearchValue: e.target.value,
              });
              this.searchTextchangeFunc(e.target.value);
              this.props.Test(e);
            }}
            placeholder="Search a Product"
          />
        </div>

        <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav" style={{marginTop:'10px'}}>
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Color</h4>
            <p>
              <a
                className="price-clear-filter"
                onClick={() => this.clearcolor()}
              >
                Clear All
              </a>
            </p>
          </div>

          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: "210px" }}
          >
            <Scrollbars>
              <ul
                className="pgs-widget-layered-nav-list"
                tabIndex={0}
                style={{ right: "-17px" }}
              >
                <div className="form-check pgs-filter-checkbox">
                  <input
                    type="radio"
                    id="red"
                    value="red"
                    onChange={this.handleChange}
                    checked={this.state.selectColor === "red"}
                  />
                  <label className="form-check-label" htmlFor="red">
                    Red
                  </label>
                </div>
                <div className="form-check pgs-filter-checkbox">
                  <input
                    type="radio"
                    id="Blue"
                    value="Blue"
                    onChange={this.handleChange}
                    checked={this.state.selectColor === "Blue"}
                  />
                  <label className="form-check-label" htmlFor="Blue">
                    Blue
                  </label>
                </div>
                <div className="form-check pgs-filter-checkbox">
                  <input
                    type="radio"
                    id="Black"
                    value="Black"
                    onChange={this.handleChange}
                    checked={this.state.selectColor === "Black"}
                  />
                  <label className="form-check-label" htmlFor="Black">
                    Black
                  </label>
                </div>
              </ul>
            </Scrollbars>
          </div>
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ marginTop: "-100px" }}
          >
            <h4 className="widget-title">Size</h4>
            <p>
              {/* <a
                className="price-clear-filter"
                onClick={() => this.clearsizes()}
              >
                Clear
              </a> */}
            </p>
          </div>

          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: "210px" }}
          >
            <Scrollbars>
              <ul
                className="pgs-widget-layered-nav-list"
                tabIndex={0}
                style={{ right: "-17px" }}
              >
                <div className="form-check pgs-filter-checkbox">
                  <input
                    type="radio"
                    id="small"
                    value="small"
                    onChange={this.handleChange}
                    checked={this.state.selectColor === "small"}
                  />
                  <label className="form-check-label" htmlFor="small">
                    Small
                  </label>
                </div>
                <div className="form-check pgs-filter-checkbox">
                  <input
                    type="radio"
                    id="medium"
                    value="medium"
                    onChange={this.handleChange}
                    checked={this.state.selectColor === "medium"}
                  />
                  <label className="form-check-label" htmlFor="medium">
                    Medium
                  </label>
                </div>
                <div className="form-check pgs-filter-checkbox">
                  <input
                    type="radio"
                    id="large"
                    value="large"
                    onChange={this.handleChange}
                    checked={this.state.selectColor === "large"}
                  />
                  <label className="form-check-label" htmlFor="large">
                    Large
                  </label>
                </div>
              </ul>
            </Scrollbars>
          </div>
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ marginTop: "-100px" }}
          >
            <p className="widget-title" style={{ fontWeight: "bold" }}>
              Categories
            </p>
          </div>
          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: "210px" }}
          >
            <Scrollbars>
              <ul
                className="pgs-widget-layered-nav-list"
                tabIndex={0}
                style={{ right: "-17px" }}
              >
                <div className="form-check pgs-filter-checkbox">
                  <input
                    type="radio"
                    id="men"
                    value="Men's T Shirts"
                    onChange={this.handleChange}
                    checked={this.state.selectColor === "Men's T Shirts"}
                  />
                  <label className="form-check-label" htmlFor="men">
                    Men
                  </label>
                </div>
                <div className="form-check pgs-filter-checkbox">
                  <input
                    type="radio"
                    id="women"
                    value="Women's Tops"
                    onChange={this.handleChange}
                    checked={this.state.selectColor === "Women's Tops"}
                  />
                  <label className="form-check-label" htmlFor="women">
                    Women
                  </label>
                </div>
                <div className="form-check pgs-filter-checkbox">
                  <input
                    type="radio"
                    id="kids"
                    value="kids"
                    onChange={this.handleChange}
                    checked={this.state.selectColor === "kids"}
                  />
                  <label className="form-check-label" htmlFor="kids">
                    Kid's
                  </label>
                </div>
              </ul>
            </Scrollbars>
          </div>
          <div
            className="widget widget_price_filter"
            style={{ marginTop: "-100px" }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="widget-title">Filter by Price</h4>
              <p>
                <a
                  className="price-clear-filter"
                  onClick={() => this.clearprice(this.props.prices)}
                >
                  Clear
                </a>
              </p>
            </div>
            <div classs="shop-filter shop-filter-product-price widget_price_filter">
              <div className="shop-filter-wrapper">
                <div className="price_slider_wrapper">
                  <Slider
                    range
                    step={1}
                    min={0}
                    max={100}
                    tipFormatter={this.toolformatter}
                    value={this.state.priceplace}
                    onChange={this.onChangePricePlace}
                    marks={marks}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filter by Categories</h4>
            <p>
              <a
                className="price-clear-filter"
                onClick={() => this.clearcategory()}
              >
                Clear
              </a>
            </p>
          </div>
          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: "215px" }}
          >
            <Scrollbars>
              {this.props.categorys.map((category, index) => {
                return (
                  <div className="form-check pgs-filter-checkbox" key={index}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.onClickCategoryFilter(e, categoryFilterValues)
                      }
                      value={category}
                      defaultChecked={
                        categoryFilterValues.includes(category) ? true : false
                      }
                      checked={
                        categoryFilterValues.includes(category) ? true : false
                      }
                      className="form-check-input"
                      id={category}
                    />
                    <label className="form-check-label" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </div> */}
        {/* <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="widget-title">Filter by Size</h4>
                        <p><a className="price-clear-filter" onClick={() => this.clearsize()} >Clear</a></p>
                    </div>
                    <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '215px' }}>
                        <Scrollbars>
                            {this.props.sizes.map((size, index) => {
                                return (

                                    <div class="form-check pgs-filter-checkbox">
                                        <input type="checkbox" onClick={(e) => this.onClickSizeFilter(e, sizeFilterValues)} value={size} defaultChecked={sizeFilterValues.includes(size) ? true : false} class="form-check-input" id={size} />
                                        <label class="form-check-label" htmlFor={size}>{size}</label>
                                    </div>
                                )
                            })}
                        </Scrollbars>
                    </div>
                </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categorys: uniqueCategory(state.data.products),
    sizes: uniqueSizes(state.data.products),
    colors: uniqueColors(state.data.products),
    prices: uniqueMinMaxPrice(state.data.products),
    filters: state.filters,
    totalCategory: state.category.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      categoryValue,
      sizeValue,
      colorValue,
      priceValue,
      searchValue,
      getSearchProduct,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SideFilter);
