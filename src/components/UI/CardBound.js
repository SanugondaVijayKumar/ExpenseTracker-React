import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import classes from "./CardBound.module.css";

const CardBound = (props) => {
  return (
    <Card>
      <Card.Body>{props.children}</Card.Body>
    </Card>
  );
};

export default CardBound;
