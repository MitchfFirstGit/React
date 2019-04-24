const API_URL = "https://rickandmortyapi.com/api/character";
let arr = [];
for (let i = 1; i < 494; i++) {
  arr.push(i);
}
export const getCharacterList = async () => {
  const response = await fetch(API_URL + `/${arr}`);
  const data = await response.json();
  return data;
};
