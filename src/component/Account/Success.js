/**
 *  Success Screen
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

class Success extends Component {
  render() {
    const date = new Date();

    return (
      <div>
        <div className="inner-intro">
          <Container>
            <Row className="intro-title align-items-center">
              <Col md={6} className="text-left">
                <div className="intro-title-inner">
                  <h1>My Account</h1>
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
                    <span>My Account</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section-ptb">
          <Container>
            <Row className="justify-content-center">
              <Col lg={7}>
                <div className="success-screen">
                  <div className="thank-you text-center">
                    <i className="fa fa-check-circle-o"></i>
                    <h1 className="text-white">Thank You</h1>
                    <span>Your order will be processed soon.</span>
                    {/* Success! We received your payment. */}
                    {/* <strong className="text-white">Transaction ID:637686G154T154485</strong> */}
                  </div>
                  <div className="delivery p-4 p-md-5 bg-light text-center">
                    <span className="h5">Expected Date Of Delivery</span>
                    <h2 className="mb-0 mt-2">
                      {" "}
                      {date.toLocaleString("en-us", { month: "long" })}{" "}
                      {new Date().getDay() + 2}, {new Date().getFullYear()}{" "}
                    </h2>
                  </div>

                  <div className="d-sm-flex px-4 pb-4 px-md-5 pb-md-5">
                    <Link className="button ml-auto" to="/">
                      Go to home
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default Success;
