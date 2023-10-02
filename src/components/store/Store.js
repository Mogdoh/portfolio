import {createStore} from 'redux'
import { startMenuReducer } from '../reducer/Reducers'

const store = createStore(startMenuReducer);

export default store;