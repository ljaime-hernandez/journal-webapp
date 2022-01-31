import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// the PrivateRoute is going to receive several pieces of data which we will use as filter
// to either render or not certain pages in our webapp, the isAuthenticated comes from the
// AppRouter which is a boolean used for confirming if the user is logged into his account
// or not, the component will be the private component the user will have access to when 
// he is authenticated.
export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    // the return has a ternary operator which will redirect the user back to the login
    // page if its not authenticated, otherwise the user will have access to whatever
    // component was passed as parameter in this private route
    return (
        <Route {...rest}
            component={(props) => (
                (isAuthenticated)
                    ? (<Component {...props}/>)
                    : (<Redirect to="/auth/login"/>)
                )
            }
       />
    )
}

// we use the propTypes for us to make sure this router is launched at least
// with a piece of data confirming if the user is authenticated or not
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}