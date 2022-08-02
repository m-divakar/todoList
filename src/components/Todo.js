import React, { useReducer, useRef, useEffect } from "react";
import Modal from "./Modal";
import Tasks from "./Tasks";
import { Form } from "./Form";
import { reducer } from "./Reducer";

const defaultState = {
   todoList: [],
   isModalOpen: false,
   modalContent: "",
};

const Todo = () => {
   const [state, dispatch] = useReducer(reducer, defaultState);
   const textContainer = useRef(null);

   const handleSubmit = (e) => {
      e.preventDefault();
      const task = textContainer.current.value;
      if (task) {
         const newTask = {
            id: new Date().getTime().toString(),
            task,
            isChecked: false,
         };
         dispatch({ type: "ADD_TASK", payload: newTask });
         textContainer.current.value = "";
      } else {
         dispatch({ type: "NO_CONTENT" });
      }
   };

   const handleChange = (e) => {
      setTimeout(() => {
         dispatch({
            type: "IS_COMPLETED",
            payload: { isChecked: e.target.checked, id: e.target.value },
         });
      }, 500);
   };

   useEffect(() => {
      textContainer.current.focus();
   });

   const closeModal = () => {
      dispatch({ type: "CLOSE_MODAL" });
   };

   const renderCheck = () => {
      const flag = state.todoList.some((tasks) => tasks.isChecked === true);
      return flag;
   };

   return (
      <>
         {state.isModalOpen && (
            <Modal modalContent={state.modalContent} closeModal={closeModal} />
         )}
         <Form handleSubmit={handleSubmit} textContainer={textContainer} />
         <Tasks
            state={state}
            dispatch={dispatch}
            handleChange={handleChange}
            condition={true}
         />
         {renderCheck() && (
            <Tasks
               state={state}
               dispatch={dispatch}
               handleChange={handleChange}
               condition={false}
            />
         )}
         <button
            className="btn"
            onClick={() => {
               dispatch({ type: "REMOVE_ALL" });
            }}
         >
            Remove All Tasks
         </button>
         <button
            className="btn-completed"
            onClick={() => {
               dispatch({ type: "REMOVE_COMPLETED" });
            }}
         >
            Remove Completed Tasks
         </button>
      </>
   );
};

export default Todo;
