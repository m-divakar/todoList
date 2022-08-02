export const reducer = (state, action) => {
   if (action.type === "ADD_TASK") {
      const newTodoList = [...state.todoList, action.payload];
      return {
         ...state,
         todoList: newTodoList,
         isModalOpen: true,
         modalContent: `Task Added: ${action.payload.task} `,
      };
   }
   if (action.type === "NO_CONTENT") {
      return {
         ...state,
         isModalOpen: true,
         modalContent: "Please Enter Task",
      };
   }
   if (action.type === "CLOSE_MODAL") {
      return {
         ...state,
         isModalOpen: false,
      };
   }
   if (action.type === "REMOVE_TASK") {
      const removedTask = state.todoList.find(
         (tasks) => action.payload === tasks.id
      );
      //   console.log(removedTask);
      const newTodoList = state.todoList.filter(
         (tasks) => action.payload !== tasks.id
      );
      return {
         ...state,
         todoList: newTodoList,
         isModalOpen: true,
         modalContent: `Removed Task: ${removedTask.task} `,
      };
   }
   if (action.type === "REMOVE_ALL") {
      return {
         ...state,
         todoList: [],
         isModalOpen: true,
         modalContent: "Removed All Tasks",
      };
   }
   if (action.type === "REMOVE_COMPLETED") {
      const newArray = state.todoList.filter((tasks) => !tasks.isChecked);
      return {
         ...state,
         todoList: newArray,
         isModalOpen: true,
         modalContent: "Removed Completed Tasks",
      };
   }
   if (action.type === "IS_COMPLETED") {
      const checkedTask = state.todoList.find(
         (tasks) => action.payload.id === tasks.id
      );
      checkedTask.isChecked = true;
      const newArray = state.todoList.filter(
         (tasks) => action.payload.id !== tasks.id
      );
      const newTodoList = [...newArray, checkedTask];
      return {
         ...state,
         todoList: newTodoList,
         isModalOpen: true,
         modalContent: `Completed Task: ${checkedTask.task}`,
      };
   }
   throw new Error("No matching action type in reducer");
};

export default reducer;
