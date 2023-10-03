import React, { useContext, useState } from "react";
import ItemContext from "./item-context";

const ItemContextProvider = (props) => {
  const itemCtx = useContext(ItemContext);
  const [count, setCount] = useState(0);

  const changeItemHandler = () => {
    setCount(count + 1);
  };

  const itemCtxValue = {
    item: count,
    changeItem: changeItemHandler,
  };

  return (
    <ItemContext.Provider value={itemCtxValue}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;
