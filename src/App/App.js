import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../_helpers";
import { alertActions, professionalAction } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../Pages/HomePage";
import { LoginPage } from "../Pages/LoginPage";
import { ProfessionalForm } from "../Pages/ProfessionalForm/ProfessionalForm";
import "antd/dist/antd.css";
import "./App.css";
import { AppUserLogin } from "../Pages/AppUserPage";
import {FindAccusedPage} from "../Pages/FindAccusedPage";
import { News } from "../Pages/News";
import { Notifications } from "../Pages/Notifications";
import { GPSInformation } from "../Pages/GPSInformation";
import { Wanted } from "../Pages/Wanted/Wanted";
import { Help } from "../Pages/Help/Help";
import { AboutUs } from "../Pages/AboutUs/AboutUs";
import { Reports } from "../Pages/Reports";
import { Reports3 } from "../Pages/Reports";
import { Reports4 } from "../Pages/Reports/Reports4";
import { Profile } from "../Pages/Profile";
import { Dashboard } from "../Pages/Dashboard/Dashboard";


 
 
class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  componentDidMount(){
     
    this.props.dispatch(professionalAction.getAllMaster());
    this.props.dispatch(professionalAction.getCity());
    this.props.dispatch(professionalAction.getDharm());
    // this.props.dispatch(professionalAction.getKalam());
    this.props.dispatch(professionalAction.getKayda());
    this.props.dispatch(professionalAction.getCrimeType());
    this.props.dispatch(professionalAction.getCrimeTitle());
    this.props.dispatch(professionalAction.getStatus());
  }
  render() {
    const { alert ,authentication} = this.props;
    //console.log(authentication)
    return (
      <Router history={history}>
        <div>
          <PrivateRoute exact path="/" component={authentication && authentication.user && authentication.user.role ==='2'?ProfessionalForm:Dashboard} />
          <PrivateRoute exact path="/AppUserLogin" component={AppUserLogin} />
          <PrivateRoute exact path="/finds" component={FindAccusedPage} />
          <PrivateRoute exact path="/News" component={News} />
          <PrivateRoute exact path="/users" component={HomePage} />
          <PrivateRoute exact path="/Notifications" component={Notifications} />
          <PrivateRoute exact path="/wanted" component={Wanted} />
          <PrivateRoute exact path="/help" component={Help} />
          <PrivateRoute exact path="/aboutus" component={AboutUs} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/gps" component={GPSInformation} />
          <PrivateRoute exact path="/reports" component={Reports} />
          <PrivateRoute exact path="/reports3" component={Reports3} />
          <PrivateRoute exact path="/reports4" component={Reports4} />
          <PrivateRoute exact path="/ProfessionalForm" component={ProfessionalForm} />
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert,authentication } = state;
  return {
    alert,
    authentication
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
