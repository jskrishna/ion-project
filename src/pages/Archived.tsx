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
  
  const Archived: React.FC = () => {
    var human = require("human-time");
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showLoading, setShowLoading] = useState(false);
    const [ReadyArray, setReadyArray] = useState<any>([]);
    const [presentAlert] = useIonAlert();
    const handleClick = (e: any) => {
      if (ReadyArray.includes(e)) {
        setReadyArray(ReadyArray.filter((item: any) => item !== e));
      } else {
        setReadyArray([...ReadyArray, e]);
      }
    };
  
    var loggedInData: any = localStorage.getItem("loggedInData")
      ? localStorage.getItem("loggedInData")
      : null;
    loggedInData = JSON.parse(loggedInData);
  
    const [postdata, setpostdata] = useState([]);
    // getposts
    const getPostdata = () => {
      api
        .get(`/getarchivedpost/` + loggedInData.id)
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
  
    useIonViewDidEnter(() => {});
  
    useIonViewWillEnter(() => {
        setShowLoading(true);
      getPostdata();
    });

    const api = axios.create({
      baseURL: Constent.BASE_URL,
    });
  
    const handlearchivepost = (post_id: number) => {
      api
        .post(`/archivepost/` + post_id)
        .then((res: any) => {
          setShowLoading(false);
          getPostdata();
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
  
    const handledeletepost = (post_id: number) => {
      api
        .post(`/deletepost/` + post_id)
        .then((res: any) => {
          setShowLoading(false);
          getPostdata();
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
  
    return (
      <>
        <SideNav />
        <IonPage id="main-content">
          <IonHeader no-border>
            <IonToolbar>
              <IonTitle>Archived Posts</IonTitle>
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
                  className='list grid-view-filter'
                  fixed={true}
                >
                  {postdata.map((item: any, index) => (
                    <IonCard key={index}>
                      <IonItem lines="none">
                        <IonLabel className="ion-justify-content-between post-header">
                          <div className="ion-inline">
                            <div>
                              <h3>
                                <b>{loggedInData.username}</b>
                              </h3>
                              <p>{human(new Date(item["created_at"]))}</p>
                            </div>
                            <div>
                              <IonIcon
                                id={"trigger" + index}
                                icon={ellipsisVertical}
                              />
                              <IonPopover
                                dismissOnSelect={true}
                                trigger={"trigger" + index}
                                size="auto"
                              >
                                <IonContent
                                  class="ion-padding"
                                  onClick={() =>
                                    presentAlert({
                                      header:
                                        "Are you sure to archive this post?",
                                      buttons: [
                                        {
                                          text: "Cancel",
                                          role: "cancel",
                                          handler: () => {},
                                        },
                                        {
                                          text: "OK",
                                          role: "confirm",
                                          handler: () => {
                                            handlearchivepost(item["id"]);
                                          },
                                        },
                                      ],
                                    })
                                  }
                                >
                                  Unarchive
                                </IonContent>
                                <IonContent
                                  class="ion-padding"
                                  onClick={() =>
                                    presentAlert({
                                      header: "Are you sure?",
                                      buttons: [
                                        {
                                          text: "Cancel",
                                          role: "cancel",
                                          handler: () => {},
                                        },
                                        {
                                          text: "yes, Delete",
                                          role: "confirm",
                                          handler: () => {
                                            handledeletepost(item["id"]);
                                          },
                                        },
                                      ],
                                    })
                                  }
                                >
                                  Delete
                                </IonContent>
                              </IonPopover>
                            </div>
                          </div>
                        </IonLabel>
                      </IonItem>
                      <IonCardContent>
                        <div className="post-detail-wrap">
                          <IonItem className="ion-no-padding" lines="none">
                            <div className="">
                              <p className="post-caption">
                                {ReadyArray.includes(index)
                                  ? item["caption"]
                                  : item["caption"].substring(0, 40)}
                                {item["caption"].length > 40 ? (
                                  <span
                                    className="readmore"
                                    onClick={() => handleClick(index)}
                                  >
                                    {ReadyArray.includes(index)
                                      ? " Show less"
                                      : " Read more"}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </p>
                                <div className="post-img">
                                  {item["media_type"] == "mp4" ||
                                  item["media_type"] == "avi" ||
                                  item["media_type"] == "flv" ||
                                  item["media_type"] == "3gp" ||
                                  item["media_type"] == "mkv" ? (
                                    <video width="320" height="240" controls>
                                      <source
                                        src={item["media"]}
                                        type="video/mp4"
                                      />
                                      Your browser does not support the video tag.
                                    </video>
                                  ) : item["media_type"] == "mp3" ? (
                                    <audio controls>
                                      <source
                                        src={item["media"]}
                                        type="audio/mpeg"
                                      />
                                      Your browser does not support the audio
                                      element.
                                    </audio>
                                  ) : (
                                    <img src={item["media"]} alt="" />
                                  )}
                                </div>
                            </div>
                          </IonItem>
                        </div>
                      </IonCardContent>
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
  
  export default Archived;
  