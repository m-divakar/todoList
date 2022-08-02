export const Form = ({ handleSubmit, textContainer }) => {
   return (
      <form className="form" onSubmit={handleSubmit}>
         <div>
            <input type="text" ref={textContainer}></input>
         </div>
         <button type="submit">Add Task</button>
      </form>
   );
};
