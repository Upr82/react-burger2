import { INGREDIENTS_URL } from "./data";
import { setCookie } from "./cookie";
import { IIngredient, IUser } from "../services/types/types";

type TServerResponse<T> = {
  success: boolean;
} & T;

type TGetIngredientsRequest = TServerResponse<{ data: IIngredient[] }>

type TPostRefreshToken = TServerResponse<{
  accessToken: string,
  refreshToken: string,
}>

type TPostOrger = TServerResponse<{
  name: string,
  order: { number: number }
}>

type TPostLogin = {
  user: {
    email: string,
    name: string
  }
} & TPostRefreshToken

type TPostReturnMessage = TServerResponse<{
  message: string
}>

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
}

const postRefreshToken = (refreshToken: string) => {
  return fetch(`${INGREDIENTS_URL}/auth/token`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    })
  })
    .then(res => checkResponse<TPostRefreshToken>(res))
}

const fetchWithRefresh = async<T>(
  endpoint: string, method: string, accessToken: string,
  refreshToken: string, data?: { name: string, email: string, password: string }
) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify(data)
  }

  try {
    const res = await fetch(`${INGREDIENTS_URL}${endpoint}`, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === "jwt expired") {
      const refreshData = await postRefreshToken(refreshToken);
      if (!refreshData.success) {
        Promise.reject(refreshData)
      }
      setCookie('accessToken', refreshData.accessToken);
      setCookie('refreshToken', refreshData.refreshToken);

      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
      }
      const res = await fetch(`${INGREDIENTS_URL}${endpoint}`, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = async (accessToken: string, refreshToken: string) => {
  const res = await fetchWithRefresh<IUser>('/auth/user', 'GET', accessToken, refreshToken);
  return await res;
}

export const patchUser = async (
  accessToken: string, refreshToken: string, name: string, email: string, password: string
) => {
  const res = await fetchWithRefresh<IUser>('/auth/user', 'PATCH', accessToken, refreshToken, { name, email, password });
  return await res;
}

export const getIngredientsRequest = () => {
  return fetch(`${INGREDIENTS_URL}/ingredients`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => checkResponse<TGetIngredientsRequest>(res));
}

export const postCreateOrderRequest = (ingredients: IIngredient) => {
  return fetch(`${INGREDIENTS_URL}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  })
    .then(res => checkResponse<TPostOrger>(res));
}

export const postRegister = (name: string, email: string, password: string) => {
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
    .then(res => checkResponse<TPostLogin>(res));
}

export const postLogin = (email: string, password: string) => {
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
    .then(res => checkResponse<TPostLogin>(res));
}

export const postLogout = (token: string) => {
  return fetch(`${INGREDIENTS_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  })
    .then(res => checkResponse<TPostReturnMessage>(res));
}

export const postPasswordReset = (email: string) => {
  return fetch(`${INGREDIENTS_URL}/password-reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email })
  })
    .then(res => checkResponse<TPostReturnMessage>(res));
}

export const postPasswordToken = (password: string, token: string) => {
  return fetch(`${INGREDIENTS_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token })
  })
  .then(res => checkResponse<TPostReturnMessage>(res));
}
