import React from "react";

const Tasks = ({ state, dispatch, handleChange, condition }) => {
   const toRenderTasks = condition //splits tasks to completed and incomplete tasks
      ? state.todoList.filter((tasks) => !tasks.isChecked)
      : state.todoList.filter((tasks) => tasks.isChecked);
   return (
      <>
         {!condition && <h4>Completed Tasks</h4>}
         {toRenderTasks.map((tasks) => {
            return (
               <div className="item" key={tasks.id}>
                  {!tasks.isChecked && (
                     <input
                        type="checkbox"
                        value={tasks.id}
                        onClick={handleChange}
                     ></input>
                  )}
                  <h4>{tasks.task}</h4>
                  {tasks.isChecked && <p>Task Done</p>}
                  <button
                     type="btn"
                     onClick={() => {
                        dispatch({
                           type: "REMOVE_TASK",
                           payload: tasks.id,
                        });
                     }}
                  >
                     Remove
                  </button>
               </div>
            );
         })}
      </>
   );
};

export default Tasks;
