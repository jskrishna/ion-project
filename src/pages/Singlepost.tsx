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
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonLoading,
    IonMenuButton,
    IonPage,
    IonPopover,
    IonRouterLink,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonViewDidEnter,
    useIonViewWillEnter,
  } from "@ionic/react";
  import axios from "axios";
  import {
      chatbubbleSharp,
    ellipsisVertical, heartOutline, heartSharp, musicalNoteOutline, shareSocial, videocamOutline,
  } from "ionicons/icons";
  import { useEffect, useState } from "react";
  import SideNav from "../components/common/sidenav";
  import Constent from "../components/Constent";
  import "./Profile.css";
import { Share } from '@capacitor/share';
import { useHistory, useParams } from "react-router-dom";
var human = require("human-time");

  const Singlepost: React.FC = () => {
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showLoading, setShowLoading] = useState(false);
    const params :any = useParams();
  
    var loggedInData: any = localStorage.getItem("loggedInData")
      ? localStorage.getItem("loggedInData")
      : null;
    loggedInData = JSON.parse(loggedInData);
    const [post, setPost] = useState(Object);
    const [analytics, setAnalytics] = useState<any>({});
    // getposts
    const getPost = () => {
      api
        .get(`/getSinglepost/` + params.post_id)
        .then((res: any) => {
          setPost(res.data.data);
          setAnalytics(res.data.analytics);
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
        setShowLoading(true);
      getPost();
    });
useEffect(()=>{
  console.log(analytics);
  console.log(analytics.likeBy);
  
})
    const api = axios.create({
      baseURL: Constent.BASE_URL,
    });

    const sharing = async (url:any) => {
        await Share.share({
            title: 'This post will be shared',
            text: 'Really awesome post you need to see right now',
            url: url,
            dialogTitle: 'Share with Friends',
          });
    };
    const [presentAlert] = useIonAlert();

    
  const handleLike = (user_id: any, post_id: any, user_by: any) => {
    let formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("post_id", post_id);
    formData.append("user_by", user_by);
    api
      .post("/makeLike", formData)
      .then((res: any) => {
        console.log(res.data);
      getPost();
      })
      .catch((e) => {
        console.log(e);
        if (e.response && e.response.data && e.response.data.message) {
          console.log(e.response.data.message);
        } else {
          console.log("Auth failure!");
        }
      });
  };

  const handlearchivepost = (post_id: number) => {
    api
      .post(`/archivepost/` + post_id)
      .then((res: any) => {
        setShowLoading(false);
        // getPostdata();
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
        // getPostdata();
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
                <IonButtons slot='start'>
                <IonBackButton></IonBackButton>
                </IonButtons>
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
            <IonGrid className='list grid-view-filter' fixed={true}>
                {post ? 
                  <IonCard key={post.id}>
                    <IonItem lines="none" className="">
                      <IonLabel className="ion-justify-content-between">
                        <div className="ion-inline">
                          <div>
                            <IonAvatar>
                              <img src={post.profile? post.profile : "/assets/images/user.png"} alt="profile" />
                            </IonAvatar>
                            <h3>
                              <b>{post.username}</b>
                            </h3>
                            <p>{human(new Date(post.created_at))}</p>
                          </div>
                          <div>
                          {
                              loggedInData.id == post.user_id ? 
                              <IonIcon
                              id={"trigger" + post.id}
                              icon={ellipsisVertical}
                            />
                              :''}
                            {
                              loggedInData.id == post.user_id ?
                           
                            <IonPopover
                              dismissOnSelect={true}
                              trigger={"trigger" + post.id}
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
                                          handlearchivepost(post.id);
                                        },
                                      },
                                    ],
                                  })
                                }
                              >
                                Archive
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
                                          handledeletepost(post.id);
                                        },
                                      },
                                    ],
                                  })
                                }
                              >
                                Delete
                              </IonContent>
                            </IonPopover>
                            :'' }
                          </div>
                        </div>
                      </IonLabel>
                    </IonItem>
                      <IonCardContent>
                        <div className="post-detail-wrap">
                          <IonItem className="ion-no-padding" lines="none">
                            <div className="">
                              <p>
                                {post.caption}
                              </p>
                              <div className="post-img">
                                {post.media_type == "mp4" ||
                                  post.media_type == "avi" ||
                                  post.media_type == "flv" ||
                                  post.media_type == "3gp" ||
                                  post.media_type == "mkv" ? (
                                  <video controls>
                                    <source
                                      src={post.media}
                                      type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : post.media_type == "mp3" ? (
                                  <audio controls>
                                    <source
                                      src={post.media}
                                      type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio>
                                ) : (
                                  <img src={post.media} alt="" />
                                )}
                              </div>
                            </div>
                          </IonItem>
                        </div>
                        <div className="wrap">
                          <IonGrid>
                            <IonRow>
                              <IonCol col-3 className="ion-no-padding">
                                <IonButton
                                  onClick={(e) =>
                                    handleLike(
                                      post.user_id,
                                      post.id,
                                      loggedInData.id
                                    )
                                  }
                                  expand="block"
                                  fill="clear"
                                >
                                  <IonIcon
                                    icon={
                                      analytics&& analytics.likeBy && analytics.likeBy.includes(loggedInData.id)
                                        ? heartSharp
                                        : heartOutline
                                    }
                                  />
                                </IonButton>
                              </IonCol>
                              <IonCol col-3 className="ion-no-padding">
                                <IonButton expand="block" fill="clear">
                                  <IonIcon icon={chatbubbleSharp} />
                                </IonButton>
                              </IonCol>
                              <IonCol col-3 className="ion-no-padding">
                                <IonButton expand="block" 
                            onClick={(e) => sharing('http://localhost:8100/singlepost/'+post.id)}
                                fill="clear">
                                  <IonIcon icon={shareSocial} />
                                </IonButton>
                              </IonCol>
                            </IonRow>
                            {analytics.like_count == 2 ? (
                              <p>
                                Liked by{" "}
                                {
                                  <span>
                                    <b>{analytics.like[0].username}</b>
                                    &nbsp;and&nbsp;
                                    <b>{analytics.like[1].username}</b>
                                  </span>
                                }
                              </p>
                            ) : analytics.like_count == 0 ? (
                              ""
                            ) : analytics.like_count == 1 ? (
                              <p>
                                Liked by{" "}
                                {
                                  <span>
                                    <b>{analytics.like[0].username}</b>
                                  </span>
                                }
                              </p>
                            ) : analytics.like_count > 2 ? (
                              <p>
                                Liked by{" "}
                                {
                                  <span>
                                    <b>{analytics.like[0].username}</b>
                                    &nbsp;and&nbsp;
                                    <b>{analytics.like_count - 1} others</b>
                                  </span>
                                }
                              </p>
                            ) : (
                              ""
                            )}

                            <div className="comments">
                              <span>
                                {analytics.comment_count == 0
                                  ? ""
                                  : analytics.comment_count == 1
                                    ? "View comment"
                                    : analytics.comment_count > 1
                                      ? "view all " +
                                      analytics.comment_count +
                                      " comments"
                                      : ""}
                              </span>
                              {analytics.comment_count > 0 ? (
                                <span>
                                  <p>
                                    <b> {analytics.comment[0].username}</b>{" "}
                                    {analytics.comment[0].comment}
                                  </p>
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </IonGrid>
                        </div>
                      </IonCardContent>
                  </IonCard>
                :
                'Post not found.'
                }
              </IonGrid>
            </section>
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default Singlepost;
  