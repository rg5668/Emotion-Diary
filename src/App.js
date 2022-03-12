import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Eidt from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// const dummyData = [
//   {
//     id: 1,
//     emotion: 1,
//     content: "오늘의일기 1번",
//     date: 1647080333243,
//   },
//   {
//     id: 2,
//     emotion: 2,
//     content: "오늘의일기 2번",
//     date: 1647080333244,
//   },
//   {
//     id: 3,
//     emotion: 3,
//     content: "오늘의일기 3번",
//     date: 1647080333245,
//   },
//   {
//     id: 4,
//     emotion: 4,
//     content: "오늘의일기 4번",
//     date: 1647080333246,
//   },
//   {
//     id: 5,
//     emotion: 5,
//     content: "오늘의일기 5번",
//     date: 1647080333247,
//   },
// ];

function App() {
  // useEffect(() => {
  //   const item1 = parseInt(localStorage.getItem("item1"));
  //   const item2 = localStorage.getItem("item2");
  //   const item3 = JSON.parse(localStorage.getItem("item3"));

  //   console.log({ item1, item2, item3 });
  // }, []);

  const [data, dispatch] = useReducer(reducer, []);

  // localstorage db처럼 쓸 수 있다.
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      // 내림차순 정렬
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: "INIT", data: diaryList });
      }
      // console.log("diaryList는 ", diaryList);
      // console.log("dataId는 ", dataId);
    }
  }, []);
  // console.log(new Date().getTime());
  const dataId = useRef(6);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        {/* BrowserRouter Mapping될 수 있다. */}
        <BrowserRouter>
          <div className="App">
            {/* Routes 는 변경되는 부분 (컨텐츠 느낌) */}
            <Routes>
              {/* Route는 url 경로와 컴포넌트를 매핑시켜준다. */}
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Eidt />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
            {/* a tag는 MPA 방식이고 쓸 경우는 외부 페이지로 나갈 경우 */}
            {/* a tag 대신 link를 쓴다. */}
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
