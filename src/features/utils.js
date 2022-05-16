const initialFetching = {loading: "idle", error: null}
  
  //! HIGH ORDER REDUCER:
  const makeFetchingReducer = actions => (state = initialFetching, action) => {
    switch(action.type){
      case actions[0]: {
        return { ...state, loading: "pending"};
      }
      case actions[1]: {
        return { ...state, loading: "succeded"};
      }
      case actions[2]: {
        return { error: action.error, loading: "rejected"};
      }
      default:
        return state;
    }
  } 

  //! FILTER REDUCER:
const makeSetReducer  = actions => (state = "all", action) => {
    switch (action.type) {
      case actions[0]:
        return action.payload;
      default:
        return state;
    }
  }

export {makeFetchingReducer, makeSetReducer }