import { Droppable } from "react-beautiful-dnd";

import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

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

interface IBoardProps {
  toDos: string[];
  boardId: string;
}
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <BoardComp
          isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          isDraggingOver={snapshot.isDraggingOver}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
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
