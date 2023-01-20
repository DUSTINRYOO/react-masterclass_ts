import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    todo: ["a", "b", "c", "d"],
    doing: [],
    done: [],
  },
});
