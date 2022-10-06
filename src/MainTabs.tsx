import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonApp,
  IonLabel,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import { gridOutline, homeSharp, listCircleSharp, personCircleSharp, settingsOutline, timerOutline } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Dashboard from "./pages/Dashboard";

const MainTabs: React.FC = () => {
  return (
    <>
       <IonApp>
     <IonReactRouter>
       <IonTabs>
         <IonRouterOutlet>
           <Route exact path="/dashboard">
             <Dashboard />
           </Route>
           <Route exact path="/tab2">
             <Tab2 />
           </Route>
           <Route path="/tab3">
             <Tab3 />
           </Route>
           <Route path="/forgot-password">
           <Redirect to="/dashboard" />
           </Route>
           <Route exact path="/">
             <Redirect to="/dashboard" />
           </Route>
           <Route exact path="/login">
             <Redirect to="/dashboard" />
           </Route>
           <Route path="/sign-up">
           <Redirect to="/dashboard" />
           </Route>
         </IonRouterOutlet>
         <IonTabBar slot="bottom">
           <IonTabButton tab="dashboard" href="/dashboard">
             <IonIcon icon={homeSharp} />
             <IonLabel>Dashboard</IonLabel>
           </IonTabButton>
           <IonTabButton tab="tab2" href="/tab2">
             <IonIcon icon={listCircleSharp} />
             <IonLabel>Users</IonLabel>
           </IonTabButton>
           <IonTabButton tab="tab3" href="/tab3">
             <IonIcon icon={personCircleSharp} />
             <IonLabel>Profile</IonLabel>
           </IonTabButton>
         </IonTabBar>
       </IonTabs>
     </IonReactRouter>
   </IonApp>
    </>

  );
};

export default MainTabs;
