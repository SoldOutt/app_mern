
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing'
// import Login from './components/LoginForm'
import Auth from './components/Auth'
import AuthContextProvider from './contexts/AuthContext'
import DashBoard from './components/DashBoard';
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          {/* <Route exact path="/login" component={Login}></Route> */}
          <Route exact path="/login" render={props => <Auth {...props} authUrl='login'></Auth>} />
          <Route exact path="/register" render={props => <Auth {...props} authUrl='register'></Auth>} />
          <Route exact path="/dashboard" component={DashBoard} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;