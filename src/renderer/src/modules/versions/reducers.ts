import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { fetchEditableVersionProgressAction, switchVersionAction, updateVersionAction } from './actions';
import { EmptyVersionState } from './types';
import { registerProgressAction } from '../actionCreatorsHelpers';

const reducer = reducerWithInitialState({ ...EmptyVersionState });

reducer.case(switchVersionAction, (state, { versionId }) => ({ ...state, activeVersion: versionId }));

registerProgressAction(reducer, fetchEditableVersionProgressAction, (state, { value }) => ({
  ...state,
  editingVersion: value,
}));

reducer.case(updateVersionAction, (state, { versionId, data: value }) => {
  if (!state.editingVersion.value || state.editingVersion.value.id !== versionId) {
    return state;
  }
  return {
    ...state,
    editingVersion: {
      ...state.editingVersion,
      value,
    },
  };
});

export default reducer;
