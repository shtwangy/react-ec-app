import { signInAction } from "./actions";
import { push } from 'connected-react-router';

export const signIn = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const isSinedIn = state.users.isSignedIn;

        if (!isSinedIn) {
            const url = 'https://api.github.com/users/shtwangy';

            const response = await fetch(url)
                .then(res => res.json())
                .catch(() => null);

            const username = response.login;

            dispatch(signInAction({
                isSinedIn: true,
                uid: '00001',
                username: username
            }));
            dispatch(push('/'));
        }
    };
};
