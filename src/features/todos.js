import { combineReducers } from "redux";

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
const filterReducer = (state = "all", action) => {
    switch (action.type) {
      case "filter/set":
        return action.payload;
      default:
        return state;
    }
  }
  
  const initialFetching = {loading: "idle", error: null}
  
  //! FETCHING REDUCER:
  const fetchingReducer = (state = initialFetching, action) => {
    switch(action.type){
      case "todos/pending": {
        return { ...state, loading: "pending"};
      }
      case "todos/fulfilled": {
        return { ...state, loading: "succeded"};
      }
      case "todos/error": {
        return { error: action.error, loading: "rejected"};
      }
      default:
        return state;
    }
  } 
  
  //! "ToDOs" REDUCER:
  const todosReducer = (state = [], action) => {
    switch (action.type) {
      case "todos/fulfilled":
        return action.payload;
      case "todo/add": 
        return state.concat({ ...action.payload });      
      case "todo/complete":
        const newTodos = state.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        })
        return newTodos;
      default:
        return state;
    }
  }
  
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
      selectStatus 
    }
