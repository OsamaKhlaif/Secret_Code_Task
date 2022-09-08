import { useEffect, useState } from "react";

const InputLine = (props) => {
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    const inputList = new Array(4);
    inputList.fill(1);
    setInputList(inputList);
  }, [props.numberList]);

  return (
    <div>
      {inputList.map((item, index) => {
        return (
          <input
            key={index}
            id={index}
            type="number"
            onChange={props.changeHandler}
            value={props.numberList.length === 0 ? "" : props.numberList[index]}
            min="0"
            max="9"
            required
            disabled={props.disabled}
          />
        );
      })}
    </div>
  );
};

export default InputLine;
