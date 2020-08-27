import LoginClass from '../templates/LoginClass';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../reducks/users/operations';

const mapStateToProps = state => {
    return {
        users: state.users // 渡したいstateだけをオブジェクト型で記述
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: {
            signIn() {
                dispatch(Actions.signIn()) // StoreからDispatchする関数
            }
        }
    }
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(LoginClass);
