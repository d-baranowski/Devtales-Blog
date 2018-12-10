import {AuthService} from './AuthService';
import {LoginCallbackComponentFactory} from './LoginCallbackComponent';
import {LoginComponentFactory} from './LoginComponent';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {push} from 'react-router-redux';

const auth = new AuthService();
export const LoginComponent = LoginComponentFactory(auth);

const mapDispatchToProps = (dispatch) => ({
    goToHomePage: () => dispatch(push('/'))
});
export const LoginCallbackComponent =  withRouter(connect(() => ({}), mapDispatchToProps)(LoginCallbackComponentFactory(auth)));
