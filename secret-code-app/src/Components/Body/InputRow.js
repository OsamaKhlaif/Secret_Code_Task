import classes from "./InputRow.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Input = (props) => {
  let result = "";
  const [showResult, setShowResult] = useState(false);
  const data = useSelector((state) => state);
  const [circleList, setCircleList] = useState([]);
  const [numberList, setNumberList] = useState([]);
  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    const inputList = new Array(4);
    inputList.fill(1);
    setInputList(inputList);
    if (data.enableIndex === 0) {
      setShowResult(false);
      setCircleList([]);
      setNumberList([]);
    }
  }, [data.enableIndex]);

  const changeHandler = (data) => {
    const numberListTmp = [...numberList];
    numberListTmp[data.target.id] = +data.target.value;
    setNumberList(numberListTmp);
  };

  const checkHandler = (event) => {
    event.preventDefault();
    const originalData = [...data.number];
    const number = [...numberList];
    let circle = [];

    for (const item in number) {
      //compares the items in the two arrays if the same value, pushes the blue circle in the array.
      if (originalData[item] === number[item] && number[item] !== "") {
        circle.push("blue");
        originalData[item] = "";
        number[item] = "";
      } else {
        //here check the repeat number (enter by user) in the two array (user numbers, random numbers), if equal go to else, if not equal enter in this if condition.
        if (
          number.filter((x) => x === number[item]).length !==
          originalData.filter((x) => x === number[item]).length
        ) {
          //create two array for find the index of user number in the two array(random numbers, user numbers).
          let originalIndexData = [];
          let numberIndexData = [];
          //here find the index of user number in random number array and in user number array.
          for (const index in originalData) {
            if (originalData[index] === number[item]) {
              originalIndexData.push(index);
            }

            if (number[index] === number[item]) {
              numberIndexData.push(index);
            }
          }
          //here move in user number indexes in user number array.
          for (const index in numberIndexData) {
            //check if the random number indexes array have the user number index, if have pushes blue circle.
            if (originalIndexData.includes(numberIndexData[index])) {
              circle.push("blue");
              originalData[numberIndexData[index]] = "";
              number[numberIndexData[index]] = "";
              originalIndexData[
                originalIndexData.indexOf(numberIndexData[index])
              ] = -1;
              numberIndexData[index] = -1;
            }
          }
          //filter the two arrays from (-1) value.
          if (
            originalIndexData.length -
              originalIndexData.filter((x) => x === -1).length <
              numberIndexData.length -
                numberIndexData.filter((x) => x === -1).length &&
            originalIndexData.length !== 0
          ) {
            for (const index in originalIndexData) {
              if (originalIndexData[index] !== -1) {
                circle.push("white");
                originalData[originalIndexData[index]] = "";
              }
            }
          }
        } else {
          //add white circle because correct number wrong place.
          if (number[item] !== "" && originalData !== "") {
            circle.push("white");
            const index = originalData.indexOf(number[item]);
            number[item] = "";
            originalData[index] = "";
          }
        }
      }
      circle.sort();
    }

    if (circle.length !== 0) {
      setShowResult(true);
      setCircleList(circle);
    }

    if (
      (circle.includes("white") || circle.length === 0 || circle.length < 4) &&
      data.enableIndex !== -1 &&
      data.enableIndex < props.length - 1
    ) {
      props.dispatch({
        type: "updateEnableIndex",
        enableIndex: data.enableIndex + 1,
      });
    } else {
      if (
        data.enableIndex === 7 &&
        (circle.includes("white") || circle.length !== 4)
      ) {
        result = "YOU LOST";
      } else {
        result = "YOU WIN";
      }
      props.dispatch({ type: "updateEnableIndex", enableIndex: -1 });
      props.dispatch({ type: "updateResult", resultValue: result });
    }
  };

  return (
    <div className={classes.input}>
      <form onSubmit={checkHandler}>
        {inputList.map((item, index) => {
          return (
            <input
              key={index}
              id={index}
              type="number"
              onChange={changeHandler}
              value={numberList.length === 0 ? "" : numberList[index]}
              min="0"
              max="9"
              required
              disabled={props.disabled}
            />
          );
        })}
        <button disabled={props.disabled}>Check</button>
      </form>
      {showResult &&
        circleList.length !== 0 &&
        circleList.map((item, index) => {
          return (
            <div
              key={index}
              className={classes.circle}
              style={{ backgroundColor: item }}
            ></div>
          );
        })}
    </div>
  );
};

export default Input;
