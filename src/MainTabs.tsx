import React, { useEffect } from "react";
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
import { addCircleOutline, heartOutline, homeOutline, homeSharp, personCircleSharp, personOutline, pulseOutline, searchOutline } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Tab3 from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import DoctorList from "./pages/DoctorList";
import NewPost from "./pages/NewPost";
import Archived from "./pages/Archived";
import Notifications from "./pages/Notifications";
import { useHistory } from "react-router";
import Singlepost from "./pages/Singlepost";
import SearchFeed from "./pages/SearchFeed";
import User from "./pages/User";

const MainTabs: React.FC = () => {
  const history = useHistory();
  useEffect(()=>{
console.log(history.location.pathname);
  });
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
           <Route path="/archived/">
             <Archived />
           </Route>
           <Route path="/singlepost/:post_id">
             <Singlepost />
           </Route>
           <Route path="/notifications/">
             <Notifications />
           </Route>
           <Route path="/forgot-password">
           <Redirect to="/dashboard" />
           </Route>
           <Route path="/search-feed/">
             <SearchFeed />
           </Route>
           <Route path="/user/:username/">
             <User />
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
             <IonIcon icon={homeOutline} />
             {/* <IonLabel>Dashboard</IonLabel> */}
           </IonTabButton>

           <IonTabButton tab="search-feed" href="/search-feed">
             <IonIcon icon={searchOutline} />
             {/* <IonLabel>New Post</IonLabel> */}
           </IonTabButton>

           <IonTabButton tab="new-post" href="/new-post">
             <IonIcon icon={addCircleOutline} />
             {/* <IonLabel>New Post</IonLabel> */}
           </IonTabButton>
           <IonTabButton tab="notifications" href="/notifications">
             <IonIcon icon={heartOutline} />
             {/* <IonLabel>Notifications</IonLabel> */}
           </IonTabButton>
           <IonTabButton tab="profile" href="/profile/">
             <IonIcon icon={personOutline} />
             {/* <IonLabel>Profile</IonLabel> */}
           </IonTabButton>
         </IonTabBar>
       </IonTabs>
     </IonReactRouter>
   </IonApp>
    </>

  );
};

export default MainTabs;
