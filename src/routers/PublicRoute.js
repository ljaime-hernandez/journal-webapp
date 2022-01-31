import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


// the PublicRoute is going to receive several pieces of data which we will use as filter
// to either render or not certain pages in our webapp, the isAuthenticated comes from the
// AppRouter which is a boolean used for confirming if the user is logged into his account
// or not, the component will be the public component the user will have access to when 
// he is authenticated.
export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    // the return has a ternary operator which will redirect the user to the journal
    // page if its authenticated, otherwise the user will have no access to any other
    // component more than the login or register pages
    return (
        <Route {...rest}
            component={(props) => (
                (isAuthenticated)
                    ? (<Redirect to="/"/>)
                    : (<Component {...props}/>)
                )
            }
       />
    )
}

// we use the propTypes for us to make sure this router is launched at least
// with a piece of data confirming if the user is authenticated or not
PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}