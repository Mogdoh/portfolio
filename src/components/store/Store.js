import {createStore} from 'redux'
import { windowReducer } from '../reducer/Reducers'

const store = createStore(windowReducer);

export default store;