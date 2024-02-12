import { INGREDIENTS_URL } from "./data";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.json());
}

export const getIngredientsRequest = () => {
  return fetch(`${INGREDIENTS_URL}/ingredients`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse);
}

export const postCreateOrderRequest = (ingredients) => {
  return fetch(`${INGREDIENTS_URL}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  })
  .then(checkResponse);
}
