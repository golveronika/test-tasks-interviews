import axios from "axios";

const getQuizes = async () => {
  const url =
    "https://raw.githubusercontent.com/golveronika/golveronika.github.io/master/quiz/quizes.json";
  const response = await axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });

  return response;
};

export default getQuizes;
