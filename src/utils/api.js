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

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const fetchWithRefresh = async (endpoint, method, accessToken, refreshToken, data) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify(data)
  }

  try {
    const res = await fetch(`${INGREDIENTS_URL}${endpoint}`, options).then(checkResponse);
    return await res;
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await postRefreshToken(refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${INGREDIENTS_URL}${endpoint}`, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = async (accessToken, refreshToken) => {
  const res = await fetchWithRefresh('/auth/user', 'GET', accessToken, refreshToken);
  return await res;
}

export const patchUser = async (accessToken, refreshToken, name, email, password) => {
  const res = await fetchWithRefresh('/auth/user', 'PATCH', accessToken, refreshToken, {name, email, password});
  return await res;
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
