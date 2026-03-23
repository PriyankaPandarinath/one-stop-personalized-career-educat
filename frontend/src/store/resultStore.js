export const setCareerResult = (data) => {
  localStorage.setItem("careerResult", JSON.stringify(data));
};

export const getCareerResult = () => {
  const data = localStorage.getItem("careerResult");
  return data ? JSON.parse(data) : null;
};