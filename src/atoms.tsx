import { atom, selector } from "recoil";
export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}

export enum Categories {
  "To_Do" = "To_Do",
  "Doing" = "Doing",
  "Done" = "Done",
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.To_Do,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
