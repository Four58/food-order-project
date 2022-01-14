import React, { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; //2 decimal places, `` to input $ sign
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const checkOutHandler = () => {
    setCheckout(true);
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClickClose}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={checkOutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const loadingHandler = () => {
    setIsLoading(true);
  };

  const submittedHandler = () => {
    setIsLoading(false);
    setSubmitted(true);
  };

  const modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout
          onCancel={props.onClickClose}
          onLoading={loadingHandler}
          onSumbitted={submittedHandler}
        />
      )}
      {!checkout && modalAction}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClickClose}>
      {!isLoading && !submitted && modalContent}
      {isLoading && <p>Sending order...</p>}
      {submitted && <p>Order complete!</p>}
    </Modal>
  );
};

export default Cart;
