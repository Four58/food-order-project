import { Fragment } from "react";
import mealsImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";
import HCartButton from "./HeaderCartButton";

// line 14 and line 10 dash so use [] instead of .

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Free food</h1>
        <HCartButton onClick={props.onClickOpen} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table food of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
