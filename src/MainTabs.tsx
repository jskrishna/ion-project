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
import { homeSharp, listCircleSharp, personCircleSharp, pulseOutline } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Tab3 from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import DoctorList from "./pages/DoctorList";
import NewPost from "./pages/NewPost";

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
           <Route exact path="/doctor-list">
             <DoctorList />
           </Route>
           <Route exact path="/new-post">
             <NewPost />
           </Route>
           <Route path="/profile/">
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
           <IonTabButton tab="new-post" href="/new-post">
             <IonIcon icon={pulseOutline} />
             <IonLabel>New Post</IonLabel>
           </IonTabButton>
           {/* <IonTabButton tab="doctor-list" href="/doctor-list">
             <IonIcon icon={listCircleSharp} />
             <IonLabel>Doctors</IonLabel>
           </IonTabButton> */}
           <IonTabButton tab="profile" href="/profile/">
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
