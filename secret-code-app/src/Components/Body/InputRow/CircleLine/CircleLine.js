import classes from "./CircleLine.module.css";

const CircleLine = (props) => {
  return (
    <div className={classes.circleLine}>
      {props.showResult &&
        props.circleList.length !== 0 &&
        props.circleList.map((item, index) => {
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

export default CircleLine;
