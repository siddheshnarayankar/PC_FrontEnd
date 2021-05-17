import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppLayout } from './AppLayout';
export const PrivateRoute = ({ component: Component, ...rest }) => (

    
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <div className="privateWindow">
                <AppLayout  users={localStorage.getItem('user')}  component = {<Component {...props} />}>
                </AppLayout>
              </div>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)