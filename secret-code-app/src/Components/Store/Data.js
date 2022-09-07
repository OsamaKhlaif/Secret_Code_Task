import { createStore } from "redux";

const initialState = {
  number: [],
  enableIndex: -1,
  result: "",
};

const reducer = (state = initialState, action) => {
  if ((action.type = "start" && action.numberList !== undefined)) {
    for (const item in action.numberList) {
      state.number[item] = action.numberList[item];
    }
    state.enableIndex = 0;
  }
  if ((action.type = "updateEnableIndex" && action.enableIndex !== undefined)) {
    state.enableIndex = action.enableIndex;
  }

  if ((action.type = "updateResult")) {
    state.result = action.resultValue;
  }
  return state;
};

export const store = createStore(reducer);
