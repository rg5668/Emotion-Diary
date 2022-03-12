import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Eidt = () => {
  const [originData, setOriginData] = useState();
  // useNavigate page를 이동시킬 수 있는
  // 로그인이 안된 사용자가 로그인이 필요한 페이지로 가려할때 로그인 값을 검사해서 로그인으로 강제 이동
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const diaryList = useContext(DiaryStateContext);
  console.log(diaryList);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `나의 다이어리 - ${id}번 수정`;
  });

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      console.log(targetDiary);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Eidt;
