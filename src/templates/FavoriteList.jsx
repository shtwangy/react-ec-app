import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFavoriteProducts} from "../reducks/users/selectors";
import List from "@material-ui/core/List";
import {FavoriteListItem} from "../components/Products";
import {GreyButton} from "../components/UIkit";
import {makeStyles} from "@material-ui/styles";
import {push} from "connected-react-router";

const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%'
    }
});

const FavoriteList = () => {
    const classes = useStyles();
    const selector = useSelector(state => state);
    const favoriteProducts = getFavoriteProducts(selector);
    const dispatch = useDispatch();

    const backToHome = useCallback(() => {
        dispatch(push('/'));
    }, []);

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">
                お気に入り
            </h2>
            <List className={classes.root}>
                {favoriteProducts.length > 0 && (
                    favoriteProducts.map(product => <FavoriteListItem key={product.favoriteId} product={product}/>)
                )}
            </List>
            <div className='module-spacer--medium' />
            <div className='p-grid__column'>
                <GreyButton label={'ショッピングを続ける'} onClick={backToHome}/>
            </div>
        </section>
    );
};

export default FavoriteList;
