import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import totalReducer from './totalReducer';
export default combineReducers({
  total:totalReducer,
   form: reduxForm,
});
