import { INGREDIENTS_URL } from "./data";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.json());
}

export const getIngredients = () => {
  return fetch(`${INGREDIENTS_URL}/ingredients`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse);
}
