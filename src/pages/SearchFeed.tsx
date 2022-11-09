import {
    IonAlert,
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonMenuButton,
    IonPage,
    IonPopover,
    IonRippleEffect,
    IonRow,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonViewWillEnter,
  } from "@ionic/react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import SideNav from "../components/common/sidenav";
  import Constent from "../components/Constent";
  import "./Profile.css";
import {  useParams } from "react-router-dom";
import { settingsOutline } from "ionicons/icons";

  const SearchFeed: React.FC = () => {
var human = require("human-time");

    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showLoading, setShowLoading] = useState(false);
    const params :any = useParams();
  
    var loggedInData: any = localStorage.getItem("loggedInData")
      ? localStorage.getItem("loggedInData")
      : null;
    loggedInData = JSON.parse(loggedInData);
    const [SearchData, setSearchData] = useState(Array);
    // getposts
    const getSearchdata = (e:any) => {
        if(e.target.value!== null ){
      api
        .get(`/searchuser/?search=` + e.target.value)
        .then((res: any) => {
            console.log(res.data.data);
            if(res.data.status == 'notfound'){
                console.log('if');
                setIserror(true);
                setMessage('User not found.');
                setSearchData([]);
            }else{
                console.log('else');
                setIserror(false);
                setSearchData(res.data.data);
                console.log(res.data.data);
                setShowLoading(false);
            }
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
    }
    };
    useIonViewWillEnter(() => {
    });
useEffect(()=>{
})
    const api = axios.create({
      baseURL: Constent.BASE_URL,
    });
 
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  
    return (
      <>
        <SideNav />
        <IonPage id="main-content">
          <IonHeader no-border>
            <IonToolbar>
                {/* <IonButtons slot='start'> */}
            <IonSearchbar
            onIonChange={(e) => getSearchdata(e)}
            animated={true} placeholder="Search"></IonSearchbar>
                <IonBackButton></IonBackButton>
                {/* </IonButtons> */}
              <IonButtons slot="end">
                <IonMenuButton>
              <IonIcon icon={settingsOutline}></IonIcon>

                </IonMenuButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          {/* <IonAlert
            isOpen={iserror}
            onDidDismiss={() => setIserror(false)}
            cssClass="my-custom-class"
            header={"Error!"}
            message={message}
            buttons={["Dismiss"]}
          /> */}
          <IonLoading
            cssClass="custom-loading"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Loading..."}
            spinner="circles"
          />
          <IonContent
          fullscreen
            class="ion-padding custom-content"
            scrollEvents={true}
            onIonScrollStart={() => {}}
            onIonScroll={() => {}}
            onIonScrollEnd={() => {}}
          >
            <section>
            <IonGrid className='' fixed={true}>
          <IonList>
                {SearchData.map((item: any, index) => (
                    <IonItem 
                    routerLink={loggedInData.id == item['id'] ? '/profile/' : '/user/'+item['username']}
                    key={index}>
                     <IonAvatar>
                         <img alt='avatar' src={
                             item && item['profile']
                               ? item['profile']
                               : "/assets/images/user.png"
                           }/>
                     </IonAvatar>
                     <IonLabel>{item['username']}
                     <br />
                     <small>{item['fullname']}</small>
                     </IonLabel>
                     
                     </IonItem>
                ))}
                {
                    iserror? 
                    <IonLabel>{message}</IonLabel>
                     : ''
                }
          </IonList>
          
          <IonInfiniteScroll
            onIonInfinite={getSearchdata}
            threshold="100px"
            disabled={isInfiniteDisabled}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more data..."
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>
              </IonGrid>
            </section>
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default SearchFeed;
  