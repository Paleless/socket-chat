import { createBrowserHistory } from 'history'
import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router'
import Choice from './views/choice/index.js'
import Room from './views/room/index.js'
const history = createBrowserHistory()
export default () => (
    <Router history={history}>
        <Switch>
            <Route path='/' exact render={props=>
                props.location.state&&props.location.username?
                <Redirect to='/room'/>:
                <Redirect to='/choice'/>}/>
            <Route path='/choice' exact component={Choice}/>
            <Route path='/room' exact render={props=>
                props.location.state?
                <Room {...props}/>:
                <Redirect to='/choice'/>}/>
            <Route path='*' render={()=>(<h1>404</h1>)} />
        </Switch>
    </Router>
)