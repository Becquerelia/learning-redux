import { combineReducers } from "redux";
import { makeFetchingReducer, makeSetReducer, reduceReducers, makeCrudReducer } from "./utils";

//! "SET PENDING" FUNCTION:
const setPending = () => {
    return {
      type: "todos/pending"
    }
  }
  
  //! "SET FULLFILED" FUNCTION:
  const setFullfilled = (todos) => {
    return {
      type: "todos/fulfilled", 
      payload: todos
    }
  }
  
  //! "SET ERROR" FUNCTION:
  const setError = (e) => {
    return {
      type: "todos/error", 
      error: e.message
    }
  }
  
  //! "SET COMPLETE" FUNCTION:
  const setComplete = (todo) => {
    return {
      type: "todo/complete", 
      payload: todo
    }
  }
  
  //! "SET FILTER" FUNCTION:
  const setFilter = (payload) => {
    return {
      type: "filter/set", 
      payload
    }
  }

 //! FUNCTION FOR GET DATA WITH FETCHING:
  const fetchThunk = () => async dispatch => {
  dispatch (setPending());
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json()
    const todos = data.slice(0, 10);
    dispatch(setFullfilled(todos))    
  }
  catch (e) {
    dispatch (setError(e));
  }
}

//! FILTER REDUCER:
const filterReducer = makeSetReducer(["filter/set"]);
  
//! FETCHING REDUCER:
 const fetchingReducer = makeFetchingReducer(["todos/pending", "todos/fulfilled", "todos/rejected"]);

 //! FULFILLED REDUCER:
 const fulfilledReducer = makeSetReducer(["todos/fulfilled"]);

 //! CRUD REDUCER:
 const crudReducer = makeCrudReducer(["todo/add", "todo/complete"]);

 //! "ToDOs" REDUCER:
 const todosReducer = reduceReducers(crudReducer, fulfilledReducer);
    
  //!COMBINE REDUCERS:
  const reducer = combineReducers({
    todos: combineReducers({
      entities: todosReducer, //propiedad del estado que debe mantener (entities), asignándole el reducer que va a utilizar para mantenerla (todosReducer)
      status: fetchingReducer
    }), 
    filter: filterReducer,
  })

  //! SELECT TODOS COMPLETE/INCOMPLETE:
  const selectTodos = state => {
    const {todos: {entities}, filter } = state;
    if (filter === "complete") {
      return entities.filter(todo => todo.completed);
    } else if (filter === "incomplete") {
      return entities.filter(todo => !todo.completed);
    }
    return entities;
  }
  
  //! SELECT STATUS:
  const selectStatus = state => state.todos.status;

    export { 
      setPending, 
      setFullfilled, 
      setError, 
      setComplete, 
      setFilter, 
      fetchThunk, 
      filterReducer, 
      fetchingReducer, 
      todosReducer, 
      reducer,
      selectTodos,
      selectStatus,
      crudReducer 
    }
