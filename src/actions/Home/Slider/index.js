import { get } from "../../../api/APIController";
// import { post } from "../../../api/APIControllerTest";
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

// export const getStrip = () => {
//   let data = {
//     cancel_url: "https://example.com/cancel",
//     success_url: "http://emporixdemo.universalcommerce.io:3020",
//     customer_email: "test@gmail.com",
//     "line_items[0][price_data][currency]": "usd",
//     "line_items[0][price_data][product_data][name]": "Shoes",
//     "line_items[0][price_data][product_data][description]": "Shoes for men",
//     "line_items[0][price_data][product_data][images][0]":
//       "https://res.cloudinary.com/saas-ag/image/upload/v1674124355/cnetric/products/9b525aa1-4f20-4354-b9cd-d2c6c0ff1366.jpg",
//     "line_items[0][price_data][unit_amount]": "2200",
//     "line_items[0][quantity]": "1",
//     mode: "payment",
//     "payment_method_types[0]": "card",
//     "shipping_options[0][shipping_rate_data][display_name]": "BlueDart",
//     "shipping_options[0][shipping_rate_data][fixed_amount][amount]": "1000",
//     "shipping_options[0][shipping_rate_data][fixed_amount][currency]": "usd",
//     "shipping_options[0][shipping_rate_data][type]": "fixed_amount",
//   };
//   let data1 = {
//    success_url: "https://emporixdemo.universalcommerce.io:3020",
//     cancel_url: "https://example.com/cancel",

//     customer_email: "test@gmail.com",
//     mode: "payment",
//     line_items: [
//       [
//         {
//           price_data: {
//             currency: "usd",
//             unit_amount: "2200",
//             product_data: {
//               name: "Shoes",
//               description: "Shoes for me",
//               images: [
//                 "https://res.cloudinary.com/saas-ag/image/upload/v1674124355/cnetric/products/9b525aa1-4f20-4354-b9cd-d2c6c0ff1366.jpg",
//               ],
//             },
//           },
//           quantity: "1",
//         },
//       ],
//     ],
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           display_name: "BlueDart",

//           fixed_amount: {
//             amount: "1000",
//             currency: "usd",
//           },
//           type: "fixed_amount",
//         },
//       },
//     ],
//   };

//   post("v1/checkout/sessions", data1, true)
//     .then((response) => {
//       if (response.status == 200) {
//         console.log("stripe", response);
//       }
//     })
//     .catch((error) => {})
//     .finally();
// };
