import React from "react";
import { Draggable } from "react-beautiful-dnd";

// very basic task card
// added a plus -> functionality to add a deadline for the task.
const Task = ({ item, index, onClick, isModalOpen }) => {
  return (
    <Draggable draggableId={item.id.toString()} index={index} isDragDisabled={isModalOpen}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(item)}
          className={`text-white mb-4 p-4 bg-violet-500 rounded-lg shadow-md cursor-pointer hover:bg-violet-800 active:bg-violet-800`}
        >
          <h3 className="font-medium mb-2 line-clamp-2">{item.title}</h3>
          <p className="text-sm line-clamp-2">{item.content}</p>
          {item.deadline && (
            <div className="mt-2 text-sm">
              Due: {new Date(item.deadline).toLocaleString()}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task; 