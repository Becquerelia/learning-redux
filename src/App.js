import './App.css';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

export const reducer = (state = initialState, action) => {
  switch(action.type){
    case "todo/add": {
      console.log("reducer");
      return {
        ...state,
        entities: state.entities.concat({...action.payload})
      }
    }
    case "todo/complete": {
       const newTodos = state.entities.map(todo => {
         if (todo.id === action.payload.id){
           return {...todo, completed: !todo.completed}
         }
         return todo
       })   
       return {
         ...state,
         entities: newTodos
       }  
    }
  }
  return state;
}

const initialState = {
  entities: []
}

const TodoItem = ({todo}) => {
  const dispatch = useDispatch()
  return (
    <li style={{textDecoration: todo.completed ? "line-through" : "none" }} onClick={()=> dispatch({type: "todo/complete", payload: todo})} >{todo.title}</li>
  )
}

function App() {

  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const state = useSelector(x => x);
  

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()){
      return;
    }
    const id = Math.random().toString(36);
    const todo = {title: value, completed: false, id}
    dispatch ({type:"todo/add", payload: todo});
    setValue("");
  }

  

  return (
    <div >
      <form onSubmit={submit} >
        <input value={value} onChange={e => setValue(e.target.value)} />
      </form>
      <button>Mostrar ToDOs</button>
      <button>Completados</button>
      <button>Incompletos</button>
      <ul>
        {state.entities.map(todo => <TodoItem key={todo.id} todo={todo} /> ) }
      </ul>
    </div>
  );
}

export default App;
