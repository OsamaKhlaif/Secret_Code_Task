import classes from "./ResultScreen.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const ResultScreen = (props) => {
  const result = useSelector(state => state.result);
  const numberList = useSelector(state => state.number);
  const show = useSelector(state =>state.enableIndex);
  const [disabled, setDisabled] = useState(false);
  
  const startHandler = () => {
    const numbers = [];

    for (let item = 0; item < 4; item++) {
      const number = Math.floor(Math.random() * 10);
      numbers.push(number);
    }

    props.dispatch({ type: "start", numberList: numbers });
    setDisabled(!disabled);
  };

  return (
    <div className={classes.body}>
      <p>Secret Code</p>
      {show === -1 &&
      <div>
       <p>{result}</p>
       <p>{result === ''? '': numberList}</p> 
       <button onClick={startHandler}>Start</button>
       </div>}
    </div>
  );
};

export default ResultScreen;
