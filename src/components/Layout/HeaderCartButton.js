import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isBump, setIsBump] = useState(false);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    // console.log("Curnumber: " + curNumber);
    // console.log("Item: " + item.amount);
    // console.log("------------");
    // console.log("------------");
    return curNumber + item.amount;
  }, 0); //turn array into single value, 0 is an initial value

  // if yes "?" if not ":"
  const btnClasses = `${classes.button} ${isBump ? classes.bump : ""}`; // set to string with template literal notation

  //useEffect need function and dependency
  //timeout need function and sec for duration
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBump(true);

    const timer = setTimeout(() => {
      setIsBump(false);
    }, 300); // if only true, then it won't bump, so we need to reset it to false

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HCartButton;
