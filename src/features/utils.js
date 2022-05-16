const initialFetching = { loading: "idle", error: null };

//! REDUCE REDUCERS:
const reduceReducers =
  (...reducers) =>
  (state, action) =>
    reducers.reduce((acc, el) => el(acc, action), state);

//! HIGH ORDER REDUCER:
const makeFetchingReducer =
  (actions) =>
  (state = initialFetching, action) => {
    switch (action.type) {
      case actions[0]: {
        return { ...state, loading: "pending" };
      }
      case actions[1]: {
        return { ...state, loading: "succeded" };
      }
      case actions[2]: {
        return { error: action.error, loading: "rejected" };
      }
      default:
        return state;
    }
  };

//! FILTER REDUCER:
const makeSetReducer =
  (actions) =>
  (state = "all", action) => {
    switch (action.type) {
      case actions[0]:
        return action.payload;
      default:
        return state;
    }
  };

//! CRUD REDUCER:
const makeCrudReducer =
  (actions) =>
  (state = [], action) => {
    switch (action.type) {
      case actions[0]:
        return state.concat({ ...action.payload });
      case actions[1]:
        const newEntities = state.map((entity) => {
          if (entity.id === action.payload.id) {
            return { ...entity, completed: !entity.completed };
          }
          return entity;
        });
        return newEntities;
      default:
        return state;
    }
  };

//! MAKE ASYNC TYPES (MAT):
const mat = (entity) => [
  `${entity}/pending`,
  `${entity}/fulfilled`,
  `${entity}/rejected`,
];

//! MAKE ACTION CREATOR (MAC):
const mac =
  (type, ...argNames) =>
  (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };

//! ASYNC MAC FUNCTION:
const asyncMac = (asyncTypes) => [
  mac(asyncTypes[0]),
  mac(asyncTypes[1], "payload"),
  mac(asyncTypes[2], "error"),
];

export {
  makeFetchingReducer,
  makeSetReducer,
  reduceReducers,
  makeCrudReducer,
  mac,
  mat,
  asyncMac,
};
