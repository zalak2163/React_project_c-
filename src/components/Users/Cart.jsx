// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch cart data from the backend (GET request)
//     axios
//       .get("https://localhost:7166/api/purchase") // No id here
//       .then((response) => {
//         setCartItems(response.data);
//         calculateTotal(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError("Failed to load cart.");
//         setLoading(false);
//       });
//   }, []);

//   // Calculate total price
//   const calculateTotal = (items) => {
//     const total = items.reduce((sum, item) => {
//       const price = parseFloat(item.totalPrice) || 0;
//       const quantity = parseInt(item.quantity, 10) || 0;
//       return sum + price * quantity;
//     }, 0);
//     setTotalPrice(total);
//   };

//   // Handle increasing item quantity
//   const handleIncrease = (id) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     );

//     setCartItems(updatedCart);

//     // Send the updated item to the backend
//     const updatedItem = updatedCart.find((item) => item.id === id);
//     axios
//       .put(`https://localhost:7166/api/purchase/${id}`, updatedItem) // Update the specific item by ID
//       .then(() => {
//         console.log("Item updated successfully.");
//         calculateTotal(updatedCart); // Recalculate total after update
//       })
//       .catch((error) => {
//         console.error("Error updating item:", error);
//         setError("Failed to update item.");
//       });
//   };

//   // Handle decreasing item quantity
//   const handleDecrease = (id) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     );

//     setCartItems(updatedCart);

//     // Send the updated item to the backend
//     const updatedItem = updatedCart.find((item) => item.id === id);
//     axios
//       .put(`https://localhost:7166/api/purchase/${id}`, updatedItem) // Update the specific item by ID
//       .then(() => {
//         console.log("Item updated successfully.");
//         calculateTotal(updatedCart); // Recalculate total after update
//       })
//       .catch((error) => {
//         console.error("Error updating item:", error);
//         setError("Failed to update item.");
//       });
//   };

//   // Handle removing an item from the cart
//   const handleRemoveItem = (id) => {
//     axios
//       .delete(`https://localhost:7166/api/purchase/${id}`) // Delete the specific item by ID
//       .then(() => {
//         console.log("Item removed successfully.");
//         const updatedCart = cartItems.filter((item) => item.id !== id);
//         setCartItems(updatedCart);
//         calculateTotal(updatedCart); // Recalculate total after removal
//       })
//       .catch((error) => {
//         console.error("Error removing item:", error);
//         setError("Failed to remove item.");
//       });
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>Loading cart...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <section className="h-100 gradient-custom">
//       <div className="container py-5">
//         <div className="row d-flex justify-content-center my-4">
//           <div className="col-md-8">
//             <div className="card mb-4">
//               <div className="card-header py-3">
//                 <h5 className="mb-0">Cart - {cartItems.length} items</h5>
//               </div>
//               <div className="card-body">
//                 {/* Loop through each cart item */}
//                 {cartItems.map((item) => (
//                   <div className="row mb-4" key={item.id}>
//                     <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
//                       <div
//                         className="bg-image hover-overlay hover-zoom ripple rounded"
//                         data-mdb-ripple-color="light"
//                       >
//                         <img
//                           src={item.event?.image || "default-image.jpg"}
//                           className="w-100"
//                           alt={item.event?.title}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
//                       <p>
//                         <strong>{item.event?.title}</strong>
//                       </p>
//                       <button
//                         type="button"
//                         className="btn btn-primary btn-sm me-1 mb-2"
//                         title="Remove item"
//                         onClick={() => handleRemoveItem(item.id)}
//                       >
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     </div>

//                     <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
//                       <div
//                         className="d-flex mb-4"
//                         style={{ maxWidth: "300px" }}
//                       >
//                         <button
//                           className="btn btn-primary px-3 me-2"
//                           onClick={() => handleDecrease(item.id)}
//                         >
//                           <i className="fas fa-minus"></i>
//                         </button>

//                         <div className="form-outline">
//                           <input
//                             type="number"
//                             className="form-control"
//                             value={item.quantity}
//                             min="1"
//                             onChange={(e) => {
//                               const updatedCart = cartItems.map((i) =>
//                                 i.id === item.id
//                                   ? { ...i, quantity: e.target.value }
//                                   : i
//                               );
//                               setCartItems(updatedCart);
//                               const updatedItem = updatedCart.find(
//                                 (i) => i.id === item.id
//                               );
//                               axios
//                                 .put(
//                                   `https://localhost:7166/api/purchase/${item.id}`,
//                                   updatedItem
//                                 )
//                                 .then(() => {
//                                   console.log("Item updated successfully.");
//                                   calculateTotal(updatedCart); // Recalculate total after change
//                                 })
//                                 .catch((error) => {
//                                   console.error("Error updating item:", error);
//                                   setError("Failed to update item.");
//                                 });
//                             }}
//                           />
//                           <label className="form-label">Quantity</label>
//                         </div>

//                         <button
//                           className="btn btn-primary px-3 ms-2"
//                           onClick={() => handleIncrease(item.id)}
//                         >
//                           <i className="fas fa-plus"></i>
//                         </button>
//                       </div>

//                       <p className="text-start text-md-center">
//                         <strong>${item.totalPrice}</strong>
//                       </p>
//                     </div>
//                   </div>
//                 ))}

//                 <hr className="my-4" />
//               </div>
//             </div>

//             <div className="card mb-4 mb-lg-0">
//               <div className="card-body">
//                 <p>
//                   <strong>We accept</strong>
//                 </p>
//                 <img
//                   className="me-2"
//                   width="45px"
//                   src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
//                   alt="Visa"
//                 />
//                 <img
//                   className="me-2"
//                   width="45px"
//                   src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
//                   alt="American Express"
//                 />
//                 <img
//                   className="me-2"
//                   width="45px"
//                   src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
//                   alt="Mastercard"
//                 />
//                 <img
//                   className="me-2"
//                   width="45px"
//                   src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
//                   alt="PayPal"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="card mb-4">
//               <div className="card-header py-3">
//                 <h5 className="mb-0">Summary</h5>
//               </div>
//               <div className="card-body">
//                 <ul className="list-group list-group-flush">
//                   <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                     Products <span>${totalPrice.toFixed(2)}</span>
//                   </li>

//                   <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                     <div>
//                       <strong>Total amount</strong>
//                       <strong>
//                         <p className="mb-0">(including VAT)</p>
//                       </strong>
//                     </div>
//                     <span>
//                       <strong>${totalPrice.toFixed(2)}</strong>
//                     </span>
//                   </li>
//                 </ul>

//                 <button
//                   type="button"
//                   className="btn btn-primary btn-lg btn-block"
//                 >
//                   Go to checkout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;
import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cart data from the backend (GET request)

    axios
      .get("https://localhost:7166/api/purchase") // No id here
      .then((response) => {
        setCartItems(response.data);
        calculateTotal(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load cart.");
        setLoading(false);
      });
  }, []);

  // Calculate total price
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.totalPrice) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return sum + price * quantity;
    }, 0);
    setTotalPrice(total);
  };

  // Handle increasing item quantity
  const handleIncrease = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCart);

    // Send the updated item to the backend
    const updatedItem = updatedCart.find((item) => item.id === id);
    axios
      .put(`https://localhost:7166/api/purchase/${id}`, updatedItem) // Update the specific item by ID
      .then(() => {
        console.log("Item updated successfully.");
        calculateTotal(updatedCart); // Recalculate total after update
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        setError("Failed to update item.");
      });
  };

  // Handle decreasing item quantity
  const handleDecrease = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCartItems(updatedCart);

    // Send the updated item to the backend
    const updatedItem = updatedCart.find((item) => item.id === id);
    axios
      .put(`https://localhost:7166/api/purchase/${id}`, updatedItem) // Update the specific item by ID
      .then(() => {
        console.log("Item updated successfully.");
        calculateTotal(updatedCart); // Recalculate total after update
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        setError("Failed to update item.");
      });
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    axios
      .delete(`https://localhost:7166/api/purchase/${id}`) // Delete the specific item by ID
      .then(() => {
        console.log("Item removed successfully.");
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        calculateTotal(updatedCart); // Recalculate total after removal
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        setError("Failed to remove item.");
      });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {cartItems.length} items</h5>
              </div>
              <div className="card-body">
                {/* Loop through each cart item */}
                {cartItems.map((item) => (
                  <div className="row mb-4" key={item.id}>
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src={item.event?.image}
                          alt={item.event?.title || "Event Image"}
                          className="w-100"
                        />
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <p>
                        <strong>{item.event?.title}</strong>
                      </p>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm me-1 mb-2"
                        title="Remove item"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <div
                        className="d-flex mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <button
                          className="btn btn-primary px-3 me-2"
                          onClick={() => handleDecrease(item.id)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <div className="form-outline">
                          <input
                            type="number"
                            className="form-control"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => {
                              const updatedCart = cartItems.map((i) =>
                                i.id === item.id
                                  ? { ...i, quantity: e.target.value }
                                  : i
                              );
                              setCartItems(updatedCart);
                              const updatedItem = updatedCart.find(
                                (i) => i.id === item.id
                              );
                              axios
                                .put(
                                  `https://localhost:7166/api/purchase/${item.id}`,
                                  updatedItem
                                )
                                .then(() => {
                                  console.log("Item updated successfully.");
                                  calculateTotal(updatedCart); // Recalculate total after change
                                })
                                .catch((error) => {
                                  console.error("Error updating item:", error);
                                  setError("Failed to update item.");
                                });
                            }}
                          />
                          <label className="form-label">Quantity</label>
                        </div>

                        <button
                          className="btn btn-primary px-3 ms-2"
                          onClick={() => handleIncrease(item.id)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>

                      {/* Updated item price text */}
                      <p className="text-start text-md-center">
                        <strong>Price per ticket: ${item.totalPrice}</strong>
                      </p>
                    </div>
                  </div>
                ))}

                <hr className="my-4" />
              </div>
            </div>

            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
                <img
                  class="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                  alt="PayPal acceptance mark"
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products <span>${totalPrice.toFixed(2)}</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
