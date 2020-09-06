import React from "react"
import { getUserId, getUsername } from "../reducks/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { singOut } from "../reducks/users/operations";

const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const username = getUsername(selector);
    return (
        <div>
            <h2>Home</h2>
            <p>ID: {uid}</p>
            <p>NAME: {username}</p>
            <button onClick={ () => dispatch(singOut()) }>SIGN OUT</button>
        </div>
    );
};

export default Home;
