import { signInAction } from "./actions";
import { push } from 'connected-react-router';
import {auth, db, FirebaseTimestamp} from '../../firebase';

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

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // validation TODO: メソッド化する
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            alert('必須項目が未入力です');
            return false;
        }

        if (password !== confirmPassword) {
            alert('パスワードと確認用パスワードが一致しません');
            return false;
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    const uid = user.uid;
                    const timestamp = FirebaseTimestamp.now();

                    const userInitialData = {
                        created_at: timestamp,
                        email: email,
                        role: 'customer',
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    };

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            dispatch(push('/'));
                        });
                }
            })
    };
};
