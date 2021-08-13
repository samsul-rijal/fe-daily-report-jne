import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Report from './pages/Report';
import Profile from './pages/Profile';

import { UserContext } from './contexts/userContext'
import { useContext, useEffect } from 'react';
import { API, setAuthToken } from './config/api'
import EditReport from './pages/EditReport';
import EditProfile from './pages/EditProfile';
import ReportPegawai from './pages/ReportPegawai';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth')
      console.log(response)

      console.log(localStorage.token)

      let payload = response.data.user
      console.log(payload)

      payload.token = localStorage.token

      dispatch({
        type: "USER_SUCCESS",
        payload
      })

    } catch (error) {
      console.log(error.response)
    }
  }

  console.log(state)

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          {(state.isLogin) ?
            <>
              {
                (state.user.levelId === 2) &&
                <>
                  <Route path="/report/:id" component={Report} />
                  <Route path="/edit-report/:id" component={EditReport} />
                  <Route path="/edit-profile/:id" component={EditProfile} />
                  <Route path="/profile" component={Profile} />
                </>
              }
              <Route path="/report-pegawai" component={ReportPegawai} />
              <Route path="/" exact component={Home} />
            </>
            :
            <>
              <Route exact path="/*" component={Home} />
            </>
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;

