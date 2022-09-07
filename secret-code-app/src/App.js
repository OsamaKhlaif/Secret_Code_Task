import { useState} from "react";
import { useDispatch } from "react-redux";
import classes from "./App.module.css";
import InputScreen from "./Components/Body/InputScreen";
import ResultScreen from "./Components/Body/ResultScreen";
import Header from "./Components/Header/Header";

const App = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  const dispatchData = (data) => {
    dispatch(data);
    setRefresh(!refresh);
  };

  return (
    <div className={classes.mainBody}>
      <Header />
      <div className={classes.body}>
        <InputScreen dispatch={dispatchData} />
        <ResultScreen dispatch={dispatchData} />
      </div>
    </div>
  );
};

export default App;
