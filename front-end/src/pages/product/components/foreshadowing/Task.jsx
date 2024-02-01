import { useFshadow } from "@/store/useFshadow";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: orange;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

export default function Task({ task, index }) {
  const { state, setState } = useFshadow((state) => ({
    state: state.allData,
    setState: state.setAllData,
  }));

  const deleteTask = () => {
    // 'tasks'에서 현재 작업(task)을 제거
    const updatedTasks = { ...state.tasks };
    delete updatedTasks[task.fshadowId];

    // 'columns' 내의 모든 'taskIds' 배열에서 현재 작업(task)의 ID를 제거
    const updatedColumns = { ...state.columns };
    Object.keys(updatedColumns).forEach((columnId) => {
      updatedColumns[columnId].taskIds = updatedColumns[
        columnId
      ].taskIds.filter((id) => id !== task.fshadowId);
    });

    // // 업데이트된 'tasks'와 'columns'로 상태를 업데이트
    setState({
      ...state,
      tasks: { ...updatedTasks },
      columns: { ...updatedColumns },
    });
  };
  return (
    <Draggable draggableId={task.fshadowId} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
          className="flex justify-between"
        >
          {task.fshadowName}
          <button type="button" onClick={deleteTask}>
            x
          </button>
        </Container>
      )}
    </Draggable>
  );
}
