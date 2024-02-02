import { DogsResponse } from '@/common/types';
import { ActionType, createStandardAction } from 'typesafe-actions';

const getDogs = createStandardAction('plain-redux/GET_DOGS')();

const getDogsSuccess = createStandardAction(
  'plain-redux/GET_DOGS_SUCCESS',
)<DogsResponse>();

const getDogsFailure = createStandardAction(
  'plain-redux/GET_DOGS_FAILURE',
)<string>();

const actions = { getDogs, getDogsSuccess, getDogsFailure };

export type PlainReduxActions = ActionType<typeof actions>;

export { actions };
