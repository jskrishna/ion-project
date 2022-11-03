import {
    IonAlert,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonLoading,
    IonMenuButton,
    IonPage,
    IonPopover,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonViewDidEnter,
    useIonViewWillEnter,
  } from "@ionic/react";
  import axios from "axios";
  import {
    ellipsisVertical,
  } from "ionicons/icons";
  import { useState } from "react";
  import SideNav from "../components/common/sidenav";
  import Constent from "../components/Constent";
  import "./Profile.css";
  
  const Notifications: React.FC = () => {
    var human = require("human-time");
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showLoading, setShowLoading] = useState(false);
  
    var loggedInData: any = localStorage.getItem("loggedInData")
      ? localStorage.getItem("loggedInData")
      : null;
    loggedInData = JSON.parse(loggedInData);
    const [postdata, setpostdata] = useState([]);
    // getposts
    const getPostdata = () => {
      api
        .get(`/getposts/` + loggedInData.id)
        .then((res: any) => {
          setpostdata(res.data.data);
          setShowLoading(false);
        })
        .catch((e) => {
          console.log(e);
          if (e.response && e.response.data && e.response.data.message) {
            setMessage(e.response.data.message);
          } else {
            setMessage("Auth failure!");
          }
          setIserror(true);
          setShowLoading(false);
        });
    };
    useIonViewWillEnter(() => {
        // setShowLoading(true);
      getPostdata();
    });

    const api = axios.create({
      baseURL: Constent.BASE_URL,
    });
  
    return (
      <>
        <SideNav />
        <IonPage id="main-content">
          <IonHeader no-border>
            <IonToolbar>
              <IonTitle>Notifications</IonTitle>
              <IonButtons slot="end">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonAlert
            isOpen={iserror}
            onDidDismiss={() => setIserror(false)}
            cssClass="my-custom-class"
            header={"Error!"}
            message={message}
            buttons={["Dismiss"]}
          />
          <IonLoading
            cssClass="custom-loading"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Loading..."}
            spinner="circles"
          />
          <IonContent
            class="ion-padding custom-content"
            scrollEvents={true}
            onIonScrollStart={() => {}}
            onIonScroll={() => {}}
            onIonScrollEnd={() => {}}
          >
            <section>
              <div className="archive-listing">
                <IonGrid
                  className='list list-view-filter'
                  fixed={true}
                >
                  {postdata.map((item: any, index) => (
                    <IonCard key={index}>
                      <IonItem lines="none">
                        <IonLabel className="ion-justify-content-between post-header">
                         Admin liked your post
                        </IonLabel>
                      </IonItem>
                    </IonCard>
                  ))}
                </IonGrid>
              </div>
            </section>
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default Notifications;
  