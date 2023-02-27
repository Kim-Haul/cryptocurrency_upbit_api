import { createStore, combineReducers } from 'redux';
import coinListReducer from './modules/coinListReducer';

// 스토어에는 하나의 리듀서만 들어갈 수 있음.
// 만약, 여러개의 리듀서가 있을 경우 하나로 합쳐서 넘겨주어야 함.
const rootReducer = combineReducers({ coinListReducer });
const store = createStore(rootReducer);

export default store;
