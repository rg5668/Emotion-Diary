// toISOString ISO 형식의 문자열로 반환하고 0 ~ 9번째 문자열까지 잘라서 리턴
export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
