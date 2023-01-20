import { Droppable } from "react-beautiful-dnd";

import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis?: boolean;
}

const BoardComp = styled.div<IAreaProps>`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 10px;
  min-height: 200px;
  margin: 0px 5px;
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
`;
const Form = styled.form`
  background-color: white;
`;

interface IForm {
  toDo: string;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}
function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`${boardId}`}
        ></input>
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <BoardComp
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </BoardComp>
        )}
      </Droppable>
    </div>
  );
}

export default Board;
