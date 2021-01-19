import { createSelector } from 'reselect';

const usersSelector = (state: any) => state.users;

export const getSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
);

export const getUserName = createSelector(
    [usersSelector],
    state =>  state.username
);

export const getUid = createSelector(
    [usersSelector],
    state => state.uid
)