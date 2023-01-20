import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const BoardComp = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 10px;
  min-height: 200px;
  margin: 0px 5px;
  background-color: ${(props) => props.theme.boardColor};
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provided) => (
        <BoardComp ref={provided.innerRef} {...provided.droppableProps}>
          {toDos.map((toDo, index) => (
            <DragabbleCard key={toDo} index={index} toDo={toDo} />
          ))}
          {provided.placeholder}
        </BoardComp>
      )}
    </Droppable>
  );
}

export default Board;
