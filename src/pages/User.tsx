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
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonModal,
  IonPage,
  IonPopover,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import axios from "axios";
import {
  addCircle,
  chatboxOutline,
  chatbubbleSharp,
  createOutline,
  ellipsisVertical,
  grid,
  heartOutline,
  heartSharp,
  list,
  personAddOutline,
  settingsOutline,
  shareSocial,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import SideNav from "../components/common/sidenav";
import Constent from "../components/Constent";
import "./Profile.css";
import { Share } from "@capacitor/share";
import { useHistory, useParams } from "react-router-dom";

const User: React.FC = () => {
  var human = require("human-time");
  const params: any = useParams();
  const modal = useRef<HTMLIonModalElement>(null);
  function dismiss() {
    modal.current?.dismiss();
  }
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);
  const [showData, setshowData] = useState(false);
  const [ReadyArray, setReadyArray] = useState<any>([]);
  const [presentAlert] = useIonAlert();
  const handleClick = (e: any) => {
    if (ReadyArray.includes(e)) {
      setReadyArray(ReadyArray.filter((item: any) => item !== e));
    } else {
      setReadyArray([...ReadyArray, e]);
    }
  };

  const [userData, setuserData] = useState<any>({});

  var loggedInData: any = localStorage.getItem("loggedInData")
    ? localStorage.getItem("loggedInData")
    : null;
  loggedInData = JSON.parse(loggedInData);
  const [isFriend, setisFriend] = useState("");

  const getloggedindata = () => {
    api
      .get(`/getuser/` + params.username)
      .then((res: any) => {
        setuserData(res.data.data);
        setShowLoading(false);
        getPostdata(res.data.data.id);
        setshowData(true);
        getFollowDetails(loggedInData.id, res.data.data.id);
        getFollowing(res.data.data.id);
        getfollowers(res.data.data.id);
      })
      .catch((e) => {
        console.log(e);
        if (e.response && e.response.data && e.response.data.message) {
          setMessage(e.response.data.message);
        } else {
          setMessage("Auth failure!");
        }
        setIserror(true);
        setshowData(false);
        setShowLoading(false);
      });
  };

  const [following, setFollowing] = useState([]);

  const getFollowing = (user_id:any) => {
    api
      .get(`/following/` + user_id)
      .then((res: any) => {
        console.log('following--',res.data.data);
        setFollowing(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }


  const [followers, setfollowers] = useState([]);

  const getfollowers = (user_id:any) => {
    api
      .get(`/followers/` + user_id)
      .then((res: any) => {
        console.log('followers--',res.data.data);
        setfollowers(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

//   useIonViewWillEnter(() => {
//     console.log(params);
//     setShowLoading(true);
//     getloggedindata();
//   });

  useEffect(()=>{
      setShowLoading(true);
      getloggedindata();
  },[params])

  const api = axios.create({
    baseURL: Constent.BASE_URL,
  });

  const getFollowDetails = (follow_by: any, follow_to: any) => {
    api
      .get(`/checkFollow/?follow_by=` + follow_by + `&follow_to=` + follow_to)
      .then((res: any) => {
        if (res.data.data) {
          setisFriend(res.data.data.request);
        }else{
            setisFriend('');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [postdata, setpostdata] = useState([]);

  // getposts
  const getPostdata = (userId: any) => {
    api
      .get(`/getposts/` + userId)
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

  const handleLike = (user_id: any, post_id: any, user_by: any) => {
    let formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("post_id", post_id);
    formData.append("user_by", user_by);
    api
      .post("/makeLike", formData)
      .then((res: any) => {
        console.log(res.data);
        getPostdata(user_id);
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

  const addFollow = (user_id: any, follow_to: any, request: any) => {
    api
      .get(
        `/addfollow/?user_id=` +
          user_id +
          `&follow_to=` +
          follow_to +
          `&request=` +
          request
      )
      .then((res: any) => {
        console.log(res.data);
        setisFriend(res.data.data.request);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [isListview, setListview] = useState<boolean>(false);
  const listViewButton = () => {
    setListview(true);
    console.log("list", isListview);
  };
  const gridViewButton = () => {
    setListview(false);
    console.log("grid", isListview);
  };

  const sharing = async (url: any) => {
    await Share.share({
      title: "This post will be shared",
      text: "Really awesome post you need to see right now",
      url: url,
      dialogTitle: "Share with Friends",
    });
  };

  return (
    <>
      <SideNav />
      <IonPage id="main-content">
        <IonHeader no-border>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Profile</IonTitle>
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
          {showData ? (
            <section>
              <div className="doctor-listing">
                <IonGrid class="ion-no-padding">
                  <IonRow>
                    <IonCol>
                      <IonItem
                        lines="none"
                        className="ion-justify-content-center profile-top-wrap"
                      >
                        <IonAvatar>
                          <img
                            text-center="true"
                            src={
                              userData && userData.profile
                                ? userData.profile
                                : "/assets/images/user.png"
                            }
                            alt=""
                          />
                        </IonAvatar>
                        <div className="follower-dtl">
                          <div className="tPost">
                            <h4>{postdata.length}</h4>
                            <p>Posts</p>
                          </div>
                          <div className="tFollower">
                            <h4>{followers?followers.length:0}</h4>
                            <p>Followers</p>
                          </div>
                          <div className="tFollowing">
                            <h4>{following?following.length:0}</h4>
                            <p>Followings</p>
                          </div>
                        </div>
                      </IonItem>
                      <IonItem button lines="none">
                        <IonLabel>
                          <h1>{userData ? userData.username : ""}</h1>
                          <h2>{userData ? userData.fullname : ""}</h2>
                          <h3>{userData ? userData.email : ""}</h3>
                          <h3>{userData ? userData.mobile : ""}</h3>
                          <p className="user-bio">
                            {userData ? userData.bio : ""}
                          </p>
                        </IonLabel>
                      </IonItem>
                      <IonItem lines="none">
                        <div className="ion-inline width-100">
                          <div>
                            <IonButton
                              onClick={(e) =>
                                addFollow(
                                  loggedInData.id,
                                  userData.id,
                                  "accepted"
                                )
                              }
                            >
                              <IonIcon icon={personAddOutline} />
                              <IonLabel>
                                {isFriend == "accepted"
                                  ? "following"
                                  : isFriend == "pending"
                                  ? "requested"
                                  : "follow"}
                              </IonLabel>
                            </IonButton>
                          </div>
                          {isFriend == "accepted" ? (
                            <div>
                              <IonButton>
                                <IonIcon icon={chatboxOutline} />
                                <IonLabel>message</IonLabel>
                              </IonButton>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                {/* modal start  */}
                {/* <IonModal ref={modal} trigger="edit-modal">
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Edit Profile</IonTitle>
                      <IonButtons slot="end">
                        <IonButton onClick={() => dismiss()}>Close</IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent className="ion-padding">
                    <IonList>
                      <IonItem>
                        <IonLabel>Name :-</IonLabel>
                        <IonInput
                          placeholder="Enter Name"
                          onIonChange={(e) => handleChange(e, "username")}
                          value={values ? values.username : ""}
                        ></IonInput>
                      </IonItem>
  
                      <IonItem>
                        <IonLabel>Mobile Number :-</IonLabel>
                        <IonInput
                          type="number"
                          placeholder="000"
                          onIonChange={(e) => handleChange(e, "mobile")}
                          value={values ? values.mobile : ""}
                        ></IonInput>
                      </IonItem>
  
                      <IonItem>
                        <IonLabel>Email :-</IonLabel>
                        <IonInput
                          type="email"
                          placeholder="email@domain.com"
                          onIonChange={(e) => handleChange(e, "email")}
                          value={values ? values.email : ""}
                        ></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position="stacked">Bio :-</IonLabel>
                        <IonTextarea
                          placeholder="Enter text"
                          onIonChange={(e) => handleChange(e, "bio")}
                          value={values ? values.bio : ""}
                        ></IonTextarea>
                      </IonItem>
                    </IonList>
                    <IonButton
                      class="login-btn"
                      expand="full"
                      size="default"
                      shape="round"
                      onClick={handleUpdate}
                    >
                      Update
                    </IonButton>
                  </IonContent>
                </IonModal>    */}
                {/* modal end  */}
                {isFriend == "accepted" ? (
                  <div>
                    <IonSegment value="buttons" className="filter-buttons">
                      <IonSegmentButton
                        className={
                          !isListview
                            ? "active-view grid-view-button"
                            : "grid-view-button"
                        }
                        onClick={gridViewButton}
                      >
                        <IonIcon icon={grid}></IonIcon>
                      </IonSegmentButton>
                      <IonSegmentButton
                        className={
                          isListview
                            ? "active-view list-view-button"
                            : "list-view-button"
                        }
                        onClick={listViewButton}
                      >
                        <IonIcon icon={list}></IonIcon>
                      </IonSegmentButton>
                    </IonSegment>
                    <IonGrid
                      className={
                        isListview
                          ? "list list-view-filter"
                          : "list grid-view-filter"
                      }
                      fixed={true}
                    >
                      {postdata.map((item: any, index) => (
                        <IonCard key={index}>
                          <IonItem lines="none" className="item-top">
                            <IonLabel className="ion-justify-content-between">
                              <div className="ion-inline">
                                <div>
                                  <h3>
                                    <b>{userData.username}</b>
                                  </h3>
                                  <p>{human(new Date(item["created_at"]))}</p>
                                </div>
                                {/* <div>
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
                            </div> */}
                              </div>
                            </IonLabel>
                          </IonItem>
                         
                            <IonCardContent onClick={listViewButton}>
                            <a
                            key={index}
                            id={"post" + item["id"]}
                            href={"user/" + userData.username}
                          >
                              <div className="post-detail-wrap">
                                <IonItem
                                  className="ion-no-padding"
                                  lines="none"
                                >
                                  <div className="post-img-top">
                                    <p>
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
                                        <video controls>
                                          <source
                                            src={item["media"]}
                                            type="video/mp4"
                                          />
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      ) : item["media_type"] == "mp3" ? (
                                        <audio controls>
                                          <source
                                            src={item["media"]}
                                            type="audio/mpeg"
                                          />
                                          Your browser does not support the
                                          audio element.
                                        </audio>
                                      ) : (
                                        <img src={item["media"]} alt="" />
                                      )}
                                    </div>
                                  </div>
                                </IonItem>
                              </div>
                          </a>

                              <div className="action-wrap">
                                <IonGrid>
                                  <IonRow>
                                    <IonCol col-3 className="ion-no-padding">
                                      <IonButton
                                        onClick={(e) =>
                                          handleLike(
                                            item["user_id"],
                                            item["id"],
                                            userData.id
                                          )
                                        }
                                        expand="block"
                                        fill="clear"
                                      >
                                        <IonIcon
                                          icon={
                                            item["likeBy"].includes(userData.id)
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
                                      <IonButton
                                        expand="block"
                                        onClick={(e) =>
                                          sharing(
                                            "http://localhost:8100/singlepost/" +
                                              item["id"]
                                          )
                                        }
                                        fill="clear"
                                      >
                                        <IonIcon icon={shareSocial} />
                                      </IonButton>
                                    </IonCol>
                                  </IonRow>
                                  {item["like_count"] == 2 ? (
                                    <p>
                                      Liked by{" "}
                                      {
                                        <span>
                                          <b>{item["like"][0].username}</b>
                                          &nbsp;and&nbsp;
                                          <b>{item["like"][1].username}</b>
                                        </span>
                                      }
                                    </p>
                                  ) : item["like_count"] == 0 ? (
                                    ""
                                  ) : item["like_count"] == 1 ? (
                                    <p>
                                      Liked by{" "}
                                      {
                                        <span>
                                          <b>{item["like"][0].username}</b>
                                        </span>
                                      }
                                    </p>
                                  ) : item["like_count"] > 2 ? (
                                    <p>
                                      Liked by{" "}
                                      {
                                        <span>
                                          <b>{item["like"][0].username}</b>
                                          &nbsp;and&nbsp;
                                          <b>{item["like_count"] - 1} others</b>
                                        </span>
                                      }
                                    </p>
                                  ) : (
                                    ""
                                  )}

                                  <div className="comments">
                                    <span>
                                      {item["comment_count"] == 0
                                        ? ""
                                        : item["comment_count"] == 1
                                        ? "View comment"
                                        : item["comment_count"] > 1
                                        ? "view all " +
                                          item["comment_count"] +
                                          " comments"
                                        : ""}
                                    </span>
                                    {item["comment_count"] > 0 ? (
                                      <span>
                                        <p>
                                          <b> {item["comment"][0].username}</b>{" "}
                                          {item["comment"][0].comment}
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
                      ))}
                    </IonGrid>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </section>
          ) : (
            ""
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default User;
