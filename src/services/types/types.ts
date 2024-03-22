import { ReactNode } from "react";

export interface IModal {
  onClose: () => void;
  children: ReactNode;
}

export interface IModalOverlay {
  children: ReactNode,
  handleCloseModal: () => void;
}

export interface IIngredient {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
}

export interface IDragableIngredient {
  ingredient: IIngredient,
  index: number
}

export interface IUser {
  success: boolean,
  user: {
    name: string,
    email: string,
    password?: string,
  }
}

export interface ISetCookie {
  (name: string,
    value: string,
    props?: { [key: string]: any }
  ): void
}

export interface IFetchWithRefresh {
  (endpoint: string,
    method: string,
    accessToken: string,
    refreshToken: string,
    data?: {
      name: string,
      email: string,
      password: string
    }
  ): Promise<any>
}

export interface IParent {
  children: ReactNode,
  className?: string
}

export interface IBurgerIngredients {
  data: IIngredient[]
}

export interface ITitleRefs {
  bunRef: React.RefObject<HTMLDivElement>,
  sauceRef: React.RefObject<HTMLDivElement>,
  mainRef: React.RefObject<HTMLDivElement>
}
