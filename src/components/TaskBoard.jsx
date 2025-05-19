import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";
import TaskDetailModal from "./TaskDetailModal";
import { fetchTasks, createTask, updateTaskStatus, deleteTask } from "../services/api";

const columnTitles = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {

  // managing the initial states
  const [state, setState] = useState([[],[],[]]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // loading the tasks
  const loadTasks = useCallback(async () => {
    try {
      const tasks = await fetchTasks();
      const newState = [[],[],[]];
      tasks.forEach(task => {
        newState[task.status].push(task);
      });
      setState(newState);
      setLoading(false);
    } catch (err) {
      setError('Failed to load tasks');
      setLoading(false);
    }
  }, []);

  useEffect(() => {loadTasks()}, [loadTasks]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  // helper functions for modal control
  const openModal = (data = null) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  // used for the dnd interface to change state at the end of drag of a draggable element on a droppable element
  const onDragEnd = async (result) => {
    const {source, destination} = result;
    if (!destination) return;

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    const newState = state.map(col => [...col]);
    const [removed] = newState[sInd].splice(source.index, 1);
    newState[dInd].splice(destination.index, 0, removed);

    setState(newState);

    // if moved across columns change the status of the task card
    if (sInd !== dInd) {
      try {
        await updateTaskStatus(removed.id, dInd);
      } catch (err) {
        setState(state);
        setError('Failed to update task status');
      }
    }
  };

  // adding a new task to the board
  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData.title, taskData.content, taskData.deadline);
      setState(prev => {
        const newState = [...prev];
        newState[0] = [...newState[0], newTask];
        return newState;
      });
      closeModal();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  // functionality to update the task details
  const updateTask = async (updatedTask) => {
    try {
      await updateTaskStatus(
        updatedTask.id,
        updatedTask.status,
        updatedTask.title,
        updatedTask.content,
        updatedTask.deadline
      );
      setState(prev => {
        const newState = [...prev];
        const taskIndex = newState[updatedTask.status].findIndex(t => t.id === updatedTask.id);
        if (taskIndex !== -1) {
          newState[updatedTask.status][taskIndex] = updatedTask;
        }
        return newState;
      });
    } catch (err) {
      setError('Failed to update task');
    }
  };

  // delete the task from the board
  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setState(prev => {
        const newState = [...prev];
        for (let i = 0; i < newState.length; i++) {
          newState[i] = newState[i].filter(task => task.id !== taskId);
        }
        return newState;
      });
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="min-h-[650px] container mx-auto p-8">
      <div className="flex justify-center mb-6">
        <button 
          type="button" 
          onClick={() => openModal()}
          className="p-3 text-violet-800 font-medium rounded-lg shadow-md"
        >
          Add new task
        </button>
      </div>

      {!modalData && (
        <AddTaskModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          onAdd={addTask}
        />
      )}

      {modalData && (
        <TaskDetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          task={modalData}
          onDelete={() => removeTask(modalData.id)}
          onUpdate={updateTask}
        />
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((group, groupIdx) => (
            <Droppable key={groupIdx} droppableId={`${groupIdx}`}>
              {(provided, snapshot) => (
                <div className="flex-1 bg-white rounded-lg shadow-md min-h-[500px] min-w-[350px]">
                  <h3 className="text-lg font-semibold text-center p-4">
                    {columnTitles[groupIdx]}
                  </h3>
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`p-6 h-[calc(100%-4rem)] ${
                      snapshot.isDraggingOver ? 'bg-violet-50' : ''
                    }`}
                  >
                    {group.map((item, itemIdx) => (
                      <Task
                        key={item.id}
                        item={item}
                        index={itemIdx}
                        onClick={() => openModal(item)}
                        isModalOpen={isModalOpen}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;
