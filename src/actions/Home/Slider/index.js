import { get } from "../../../api/APIController";
import LocalStorageService from "../../../storage/LocalStorageService";

import store from "../../../Store";
export const getContent = () => {
  get("getBanners")
    .then((response) => {
      if (response.status == 200) {
        console.log("responseCONTENT", response);
        store.dispatch({
          type: "GET_CONTENT_SUCCESS",
          slider: response.data ? response.data.items : [],
        });
      }
    })
    .catch((error) => {})
    .finally();
};

export const checkout111111 = () => {
  const custEmail = LocalStorageService.getCustEmail();
  var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
  console.log("this is stripe api testing", Cart);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    "Bearer sk_test_51LueYMSJR3MKnRF3268B3qx0LDEK9geJ451EKxtEhljfXbYBJMLaeb1DqV0vqUo9IeVDIaGx4xIjRRX2IrAXjNqQ00Kg4KMZdq"
  );

  var urlencoded = new URLSearchParams();
  urlencoded.append("cancel_url", "http://emporixdemo.universalcommerce.io:3020/Error");
  urlencoded.append(
    "success_url",
    "http://emporixdemo.universalcommerce.io:3020/Success"
  );
  urlencoded.append("customer_email", custEmail);
  urlencoded.append("line_items[0][price_data][currency]", "usd");
  urlencoded.append(
    "line_items[0][price_data][product_data][name]",
    Cart[0].ProductName
  );
  urlencoded.append(
    "line_items[0][price_data][product_data][description]",
    Cart[0].ProductName
  );
  urlencoded.append(
    "line_items[0][price_data][product_data][images][0]",
    Cart[0].ProductImage
  );
  urlencoded.append("line_items[0][price_data][unit_amount]", "100");
  urlencoded.append("line_items[0][quantity]", "1");
  // urlencoded.append("line_items[1][price_data][currency]", "usd");
  // urlencoded.append("line_items[1][price_data][product_data][name]", "Pant");
  // urlencoded.append(
  //   "line_items[1][price_data][product_data][description]",
  //   "Pant for gents"
  // );
  // urlencoded.append(
  //   "line_items[1][price_data][product_data][images][0]",
  //   "https://res.cloudinary.com/saas-ag/image/upload/v1674124328/cnetric/products/7c71cca9-e53e-4171-a181-271862e96d8c.jpg"
  // );
  // urlencoded.append("line_items[1][price_data][unit_amount]", "2400");
  // urlencoded.append("line_items[1][quantity]", "3");
  urlencoded.append("mode", "payment");
  urlencoded.append("payment_method_types[0]", "card");
  urlencoded.append(
    "shipping_options[0][shipping_rate_data][display_name]",
    "BlueDart"
  );
  urlencoded.append(
    "shipping_options[0][shipping_rate_data][fixed_amount][amount]",
    "50"
  );
  urlencoded.append(
    "shipping_options[0][shipping_rate_data][fixed_amount][currency]",
    "usd"
  );
  urlencoded.append(
    "shipping_options[0][shipping_rate_data][type]",
    "fixed_amount"
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("https://api.stripe.com/v1/checkout/sessions", requestOptions)
    .then((response) => 
    // response.text()
    response.json()
    )
    .then((result) => {
      if (result) {
        // console.log("stripe responce", result.url);
        localStorage.removeItem("LocalCartItems");
         window.location.replace(result.url)
      }
    })
    .catch((error) => console.log("error", error));
};

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
// myHeaders.append(
//   "Authorization",
//   "Bearer sk_test_51LueYMSJR3MKnRF3268B3qx0LDEK9geJ451EKxtEhljfXbYBJMLaeb1DqV0vqUo9IeVDIaGx4xIjRRX2IrAXjNqQ00Kg4KMZdq"
// );

// var urlencoded = new URLSearchParams();
// urlencoded.append("cancel_url", "https://example.com/cancel");
// urlencoded.append(
//   "success_url",
//   "http://emporixdemo.universalcommerce.io:3020/SuccessScreen"
// );
// urlencoded.append("customer_email", "test@gmail.com");
// urlencoded.append("line_items[0][price_data][currency]", "usd");
// urlencoded.append("line_items[0][price_data][product_data][name]", "Shoes");
// urlencoded.append(
//   "line_items[0][price_data][product_data][description]",
//   "Shoes for men"
// );
// urlencoded.append(
//   "line_items[0][price_data][product_data][images][0]",
//   "https://res.cloudinary.com/saas-ag/image/upload/v1674124355/cnetric/products/9b525aa1-4f20-4354-b9cd-d2c6c0ff1366.jpg"
// );
// urlencoded.append("line_items[0][price_data][unit_amount]", "2200");
// urlencoded.append("line_items[0][quantity]", "1");
// urlencoded.append("line_items[1][price_data][currency]", "usd");
// urlencoded.append("line_items[1][price_data][product_data][name]", "Pant");
// urlencoded.append(
//   "line_items[1][price_data][product_data][description]",
//   "Pant for gents"
// );
// urlencoded.append(
//   "line_items[1][price_data][product_data][images][0]",
//   "https://res.cloudinary.com/saas-ag/image/upload/v1674124328/cnetric/products/7c71cca9-e53e-4171-a181-271862e96d8c.jpg"
// );
// urlencoded.append("line_items[1][price_data][unit_amount]", "2400");
// urlencoded.append("line_items[1][quantity]", "3");
// urlencoded.append("mode", "payment");
// urlencoded.append("payment_method_types[0]", "card");
// urlencoded.append(
//   "shipping_options[0][shipping_rate_data][display_name]",
//   "BlueDart"
// );
// urlencoded.append(
//   "shipping_options[0][shipping_rate_data][fixed_amount][amount]",
//   "1000"
// );
// urlencoded.append(
//   "shipping_options[0][shipping_rate_data][fixed_amount][currency]",
//   "usd"
// );
// urlencoded.append(
//   "shipping_options[0][shipping_rate_data][type]",
//   "fixed_amount"
// );

// var requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: urlencoded,
//   redirect: "follow",
// };

// fetch("https://api.stripe.com/v1/checkout/sessions", requestOptions)
//   .then((response) => response.text())
//   .then((result) =>   window.location.replace(result.url)
//   )
//   .catch((error) => console.log("error", error));
