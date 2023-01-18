import { atom, selector } from "recoil";
export interface IToDo {
  text: string;
  category: "To_Do" | "Doing" | "Done";
  id: number;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category === "To_Do"),
      toDos.filter((toDo) => toDo.category === "Doing"),
      toDos.filter((toDo) => toDo.category === "Done"),
    ];
  },
});
