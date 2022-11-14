import {
    IonAlert,
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonLoading,
    IonMenuButton,
    IonPage,
    IonPopover,
    IonRefresher,
    IonRefresherContent,
    IonRouterLink,
    IonTitle,
    IonToolbar,
    RefresherEventDetail,
    useIonAlert,
    useIonViewDidEnter,
    useIonViewWillEnter,
  } from "@ionic/react";
  import axios from "axios";
  import {
    ellipsisVertical, musicalNoteOutline, settingsOutline, videocamOutline,
  } from "ionicons/icons";
  import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
    const [TodayNotify, setTodayNotify] = useState(Array);
    const [YesNotify, setYesNotify] = useState(Array);
    const [OlderNotify, setOlderNotify] = useState(Array);
    // getposts
    const getNotify = () => {
      api
        .get(`/getNotifications/` + loggedInData.id)
        .then((res: any) => {
          setTodayNotify(res.data.today);
          setYesNotify(res.data.yesterday);
          setOlderNotify(res.data.older);
          setShowLoading(false);
          getFollowing();
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


    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
      // console.log('Begin async operation');
      getNotify()
      setTimeout(() => {
        // console.log('Async operation has ended');
        event.detail.complete();
      }, 2000);
    }

    useIonViewWillEnter(() => {
    });

    useIonViewDidEnter(()=>{
      // setShowLoading(true);
      getNotify();

    })

    const api = axios.create({
      baseURL: Constent.BASE_URL,
    });

    const removeRequest = (analy_id:any,follow_by:any,follow_to:any) =>{
      let formData = new FormData();
    formData.append("analy_id", analy_id);
    formData.append("follow_by", follow_by);
    formData.append("follow_to", follow_to);
      api.post('/removeNotification', formData)
      .then((res: any) => {
        getNotify();
      })
      .catch((e) => {
        console.log(e);
        setShowLoading(false);
      });
    }

    const followBack = (follow_to:any) => {
        api.get(`/addfollow?user_id=`+ loggedInData.id+`&follow_to=`+follow_to +`&request=accepted`)
        .then((res: any) => {
          getNotify();
        })
        .catch((e) => {
          console.log(e);
          setShowLoading(false);
        });
    }

    const [following, setFollowing] = useState([]);

    const getFollowing = () => {
      api
        .get(`/following/` + loggedInData.id)
        .then((res: any) => {
          console.log('following--',res.data.data);
          setFollowing(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  
    return (
      <>
        <SideNav />
        <IonPage id="main-content">
          <IonHeader no-border>
            <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
              <IonTitle>Notifications</IonTitle>
              <IonButtons slot="end">
                <IonMenuButton>
              <IonIcon icon={settingsOutline}></IonIcon>

                </IonMenuButton>
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
            <IonRefresher slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={100} pullMax={200}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
            <section>
            {TodayNotify.length > 0 ?
              <IonItemGroup>
              <IonItemDivider>
                  <IonLabel>Today</IonLabel>
              </IonItemDivider>
              {TodayNotify.length > 0 ? TodayNotify.sort((a:any, b:any) => b.id - a.id).map((item: any, index) => (

                item['user_by'] != loggedInData.id ? 
                    <IonCard key={index}>
                      <IonItem 
                      // routerLink={item['type'] == 'follow' ? '/user/'+ item['username']:"/singlepost/"+item['post_id']} 
                      lines="none">
                      <IonAvatar slot="start">
                        <img alt='avatar' src={item['profile'] ? item['profile']: "/assets/images/user.png"}/>
                    </IonAvatar>
                        <IonLabel className="ion-justify-content-between post-header">
                          {item['type'] == 'like'? 
                        <p>
                          <b> {item['username']}</b> liked your post.
                        </p>
                        : 
                       (item['type'] == 'follow' ?
                       (item['request'] == 'pending' ? 
                       <p>
                       <b> {item['username']} has request to follow you</b>.
                      </p>
                       :
                       <p>
                        <b> {item['username']} Follow you</b>.
                       </p>
                       )
                       :
                       <p>
                      <b>{item['username']}</b> commented<b> {item['comment']}</b> your post.
                     </p>
                       )
                        }
                        {
                          <p>{human(new Date(item['created_at']))}</p>
                        }
                        </IonLabel>
                        <IonAvatar slot="end">
                        {item["media_type"] ?
                        item["media_type"] == "mp4" ||
                                  item["media_type"] == "avi" ||
                                  item["media_type"] == "flv" ||
                                  item["media_type"] == "3gp" ||
                                  item["media_type"] == "mkv" ? (
                                  <IonIcon icon={videocamOutline}></IonIcon>
                                ) : item["media_type"] == "mp3" ? (
                                  <IonIcon icon={musicalNoteOutline}></IonIcon>
                                ) : (
                                  <img alt='post' src={item["media"]} />
                                ) : ''
                              }
                    </IonAvatar>
                    {
                      item['type'] == 'follow' ? 
                      <div>
                        <IonButton>
                          <IonLabel>
                            {
                                (item['type'] == 'follow' ?
                                (item['request'] == 'pending' ? 
                                  <IonButtons>
                                    <IonButton className="btn-primary">Accept</IonButton>
                                    <IonButton onClick={(e)=> removeRequest(item['id'],item['user_by'],item['user_id'])}>Remove</IonButton>
                                  </IonButtons>
                                : (
                                  following.some((el:any) => el.id === item['user_by'])
                                   ? 
                                <IonButtons>
                                <IonButton>Following</IonButton>
                               </IonButtons>
                              : 
                                <IonButtons>
                                <IonButton onClick={(e)=>followBack(item['user_by'])}>Follow Back</IonButton>
                                <IonButton onClick={(e)=> removeRequest(item['id'],item['user_by'],item['user_id'])}>Remove</IonButton>
                            </IonButtons>
                                )
                                 
                                )
                                :''
                                )
                            }
                          </IonLabel>
                        </IonButton>
                    </div>
                      :''
                    }
                      </IonItem>
                    </IonCard>
                      : ''

                  )) : ''}
              </IonItemGroup> :''}

              {YesNotify.length > 0 ?
              <IonItemGroup>
              <IonItemDivider>
                  <IonLabel>Yesterday</IonLabel>
                  
              </IonItemDivider>
              {YesNotify.length > 0 ? YesNotify.sort((a:any, b:any) => b.id - a.id).map((item: any, index) => (
                item['user_by'] != loggedInData.id ? 
                    
                    <IonCard key={index}>
                      <IonItem 
                      // routerLink={item['type'] == 'follow' ? '/user/'+ item['username']:"/singlepost/"+item['post_id']} 
                      lines="none">

                      <IonAvatar slot="start">
                        <img alt='avatar' src={item['profile'] ? item['profile']: "/assets/images/user.png"}/>
                    </IonAvatar>
                    <IonLabel className="ion-justify-content-between post-header">
                          {item['type'] == 'like'? 
                        <p>
                          <b> {item['username']}</b> liked your post.
                        </p>
                        : 
                       (item['type'] == 'follow' ?
                       (item['request'] == 'pending' ? 
                       <p>
                       <b> {item['username']} has request to follow you</b>.
                      </p>
                       :
                       <p>
                        <b> {item['username']} Follow you</b>.
                       </p>
                       )
                       :
                       <p>
                      <b>{item['username']}</b> commented<b> {item['comment']}</b> your post.
                     </p>
                       )
                        }
                        {
                         <p>{human(new Date(item['created_at']))}</p>
                        }
                        </IonLabel>
                        <IonAvatar slot="end">
                        {item["media_type"] ?
                        item["media_type"] == "mp4" ||
                                  item["media_type"] == "avi" ||
                                  item["media_type"] == "flv" ||
                                  item["media_type"] == "3gp" ||
                                  item["media_type"] == "mkv" ? (
                                  <IonIcon icon={videocamOutline}></IonIcon>
                                ) : item["media_type"] == "mp3" ? (
                                  <IonIcon icon={musicalNoteOutline}></IonIcon>
                                ) : (
                                  <img alt='post' src={item["media"]} />
                                ) : ''
                              }
                    </IonAvatar>
                    {
                      item['type'] == 'follow' ? 
                      <div>
                        <IonButton>
                          <IonLabel>
                            {
                                (item['type'] == 'follow' ?
                                (item['request'] == 'pending' ? 
                                  <IonButtons>
                                    <IonButton className="btn-primary">Accept</IonButton>
                                    <IonButton onClick={(e)=> removeRequest(item['id'],item['user_by'],item['user_id'])}>Remove</IonButton>
                                  </IonButtons>
                                :
                                (
                                  following.some((el:any) => el.id === item['user_by'])
                                  ? 
                                <IonButtons>
                                <IonButton>Following</IonButton>
                               </IonButtons>
                              : 
                                <IonButtons>
                                <IonButton onClick={(e)=>followBack(item['user_by'])}>Follow Back</IonButton>
                                <IonButton onClick={(e)=> removeRequest(item['id'],item['user_by'],item['user_id'])}>Remove</IonButton>
                            </IonButtons>
                                )
                                )
                                :''
                                )
                            }
                          </IonLabel>
                        </IonButton>
                    </div>
                      :''
                    }
                      </IonItem>
                    </IonCard>
                    :''
                  )) : ''}
              </IonItemGroup> :''}
              {OlderNotify.length > 0 ?
              <IonItemGroup>
              <IonItemDivider >
                  <IonLabel >Older</IonLabel>
              </IonItemDivider>
              {OlderNotify.length > 0 ? OlderNotify.sort((a:any, b:any) => b.id - a.id).map((item: any, index) => (
                item['user_by'] != loggedInData.id ? 

                    <IonCard key={index}>
                      <IonItem 
                      // routerLink={item['type'] == 'follow' ? '/user/'+ item['username']:"/singlepost/"+item['post_id']} 
                      lines="none">
                      <IonAvatar slot="start">
                        <img alt='avatar' src={item['profile'] ? item['profile']: "/assets/images/user.png"}/>
                    </IonAvatar>
                    <IonLabel className="ion-justify-content-between post-header">
                          {item['type'] == 'like'? 
                        <p>
                          <b> {item['username']}</b> liked your post.
                        </p>
                        : 
                       (item['type'] == 'follow' ?
                       (item['request'] == 'pending' ? 
                       <p>
                       <b> {item['username']} has request to follow you</b>.
                      </p>
                       :
                       <p>
                        <b> {item['username']} Follow you</b>.
                       </p>
                       )
                       :
                       <p>
                      <b>{item['username']}</b> commented<b> {item['comment']}</b> your post.
                     </p>
                       )
                        }
                        {
                       <p>{human(new Date(item['created_at']))}</p>
                        }
                        </IonLabel>
                        <IonAvatar slot="end">
                        {item["media_type"] ?
                        item["media_type"] == "mp4" ||
                                  item["media_type"] == "avi" ||
                                  item["media_type"] == "flv" ||
                                  item["media_type"] == "3gp" ||
                                  item["media_type"] == "mkv" ? (
                                  <IonIcon icon={videocamOutline}></IonIcon>
                                ) : item["media_type"] == "mp3" ? (
                                  <IonIcon icon={musicalNoteOutline}></IonIcon>
                                ) : (
                                  <img alt='post' src={item["media"]} />
                                ) : ''
                              }
                    </IonAvatar>
                    {
                      item['type'] == 'follow' ? 
                      <div>
                        <IonButton>
                          <IonLabel>
                            {
                                (item['type'] == 'follow' ?
                                (item['request'] == 'pending' ? 
                                  <IonButtons>
                                    <IonButton className="btn-primary">Accept</IonButton>
                                    <IonButton onClick={(e)=> removeRequest(item['id'],item['user_by'],item['user_id'])}>Remove</IonButton>
                                  </IonButtons>
                                :
                                (
                                  following.some((el:any) => el.id === item['user_by'])
                                   ? 
                                <IonButtons>
                                <IonButton>Following</IonButton>
                               </IonButtons>
                              : 
                                <IonButtons>
                                <IonButton onClick={(e)=>followBack(item['user_by'])}>Follow Back</IonButton>
                                <IonButton onClick={(e)=> removeRequest(item['id'],item['user_by'],item['user_id'])}>Remove</IonButton>
                            </IonButtons>
                                )
                                )
                                :''
                                )
                            }
                          </IonLabel>
                        </IonButton>
                    </div>
                      :''
                    }

                      </IonItem>
                    </IonCard>
                    :''
                  )) : ''}
              </IonItemGroup> :''}
            </section>
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default Notifications;
  