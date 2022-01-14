import { useContext } from "react";
import CartContext from "../../store/cart-context";
import useInput from "../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const notEmpty = (item) => item.trim() !== "";
  const okPostal = (item) => item.trim() !== "" && item.trim().length === 5;

  const cartCtx = useContext(CartContext);

  const {
    value: nameValue,
    valid: nameValid,
    touchInvalid: nameTouchInvalid,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(notEmpty);

  const {
    value: streetValue,
    valid: streetValid,
    touchInvalid: streetTouchInvalid,
    onChangeHandler: streetChangeHandler,
    onBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(notEmpty);

  const {
    value: postalValue,
    valid: postalValid,
    touchInvalid: postalTouchInvalid,
    onChangeHandler: postalChangeHandler,
    onBlurHandler: postalBlurHandler,
    reset: postalReset,
  } = useInput(okPostal);

  const {
    value: cityValue,
    valid: cityValid,
    touchInvalid: cityTouchInvalid,
    onChangeHandler: cityChangeHandler,
    onBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(notEmpty);

  const userData = {
    name: nameValue,
    street: streetValue,
    postalcode: postalValue,
    city: cityValue,
  };

  const acceptOrder = async () => {
    try {
      const response = await fetch(
        "https://reactletsgo-65a5c-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: userData, order: cartCtx.items }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
    cartCtx.clearItem();
  };

  const confirmHandler = (event) => {
    event.preventDefault();
    nameBlurHandler();
    streetBlurHandler();
    postalBlurHandler();
    cityBlurHandler();

    if (!nameValid || !streetValid || !postalValid || !cityValid) {
      return;
    }
    props.onLoading();
    acceptOrder();
    props.onSumbitted();

    console.log("success!");
    nameReset();
    streetReset();
    postalReset();
    cityReset();
  };

  const nameClasses = `${classes.control} ${
    nameTouchInvalid ? classes.invalid : ""
  }`;
  const streetClasses = `${classes.control} ${
    streetTouchInvalid ? classes.invalid : ""
  }`;
  const postalClasses = `${classes.control} ${
    postalTouchInvalid ? classes.invalid : ""
  }`;
  const cityClasses = `${classes.control} ${
    cityTouchInvalid ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameValue}
        />
        {nameTouchInvalid && <p>please fill in a valid name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={streetValue}
        />
        {streetTouchInvalid && <p>please fill in a valid street</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
          value={postalValue}
        />
        {postalTouchInvalid && <p>please fill in a valid postal</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={cityValue}
        />
        {cityTouchInvalid && <p>please fill in a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
