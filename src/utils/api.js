import { INGREDIENTS_URL } from "./data";
import { setCookie } from "./cookie";

const postRefreshToken = (refreshToken) => {
  return fetch(`${INGREDIENTS_URL}/auth/token`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    })
  })
    .then(checkResponse)
    .then(data => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
    })
    .catch(Error);
}

export const checkToken = (accessToken, refreshToken) => {
  return fetch(`${INGREDIENTS_URL}/auth/user`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": accessToken
    }
  })
    .then(res => {
      return (res.ok || !res?.success) ? res.json() : Promise.reject(res.json());
    })
    .then(data => {
      if (!data.success) {
        postRefreshToken(refreshToken);
      }
    })
    .catch(Error);
}

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

export const postCreateOrderRequest = (ingredients, token) => {
  return fetch(`${INGREDIENTS_URL}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "authorization": token
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  })
    .then(checkResponse);
}

export const postRegister = (name, email, password) => {
  return fetch(`${INGREDIENTS_URL}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    }),
  })
    .then(checkResponse);
}

export const postLogin = (email, password) => {
  return fetch(`${INGREDIENTS_URL}/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    }),
  })
    .then(checkResponse);
}

export const postLogout = (token) => {
  return fetch(`${INGREDIENTS_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  })
    .then(checkResponse);
}

export const getUser = (token) => {
  return fetch(`${INGREDIENTS_URL}/auth/user`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "authorization": token
    }
  })
    .then(checkResponse);
}

export const patchUser = (token, name, email, password) => {
  return fetch(`${INGREDIENTS_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "authorization": token
    },
    body: JSON.stringify({
      name, email, password
    })
  })
    .then(checkResponse);
}

export const postPasswordReset = (email) => {
  return fetch(`${INGREDIENTS_URL}/password-reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email})
  })
    .then(checkResponse);
}

export const postPasswordToken = (password, token) => {
  return fetch(`${INGREDIENTS_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({password, token})
  })
    .then(checkResponse);
}
