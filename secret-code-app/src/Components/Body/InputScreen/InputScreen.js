import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputRow from "../InputRow/InputRow";
import classes from "./InputScreen.module.css";

const InputScreen = (props) => {
  const [inputList, setInputList] = useState([]);
  const enableIndexValue = useSelector((state) => state.enableIndex);

  useEffect(() => {
    const inputList = new Array(8);
    inputList.fill(true);
    setInputList(inputList);
  }, [enableIndexValue]);

  inputList[enableIndexValue] = false;

  return (
    <div className={classes.body}>
      {inputList.map((item, index) => {
        return (
          <InputRow
            key={index}
            length={inputList.length}
            disabled={item}
            dispatch={props.dispatch}
          />
        );
      })}
    </div>
  );
};

export default InputScreen;
