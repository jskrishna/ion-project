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
  chatbubbleSharp,
  createOutline,
  ellipsisVertical,
  grid,
  heartOutline,
  heartSharp,
  list,
  shareSocial,
} from "ionicons/icons";
import { useRef, useState } from "react";
import SideNav from "../components/common/sidenav";
import Constent from "../components/Constent";
import "./Profile.css";
import { Share } from '@capacitor/share';
import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  var human = require("human-time");
  const history = useHistory();
  
  const modal = useRef<HTMLIonModalElement>(null);
  function dismiss() {
    modal.current?.dismiss();
  }
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

  const getloggedindata = () => {
    api
      .get(`/getloggedindata/` + loggedInData.id)
      .then((res: any) => {
        localStorage.setItem("loggedInData", JSON.stringify(res.data.data));
        var mydata = res.data.data;
        setValues({ ...values, ...{ ["email"]: mydata.email } });
        setValues({ ...values, ...{ ["username"]: mydata.username } });
        setValues({ ...values, ...{ ["mobile"]: mydata.mobile } });
        setValues({ ...values, ...{ ["profile"]: mydata.profile } });
        setValues({ ...values, ...{ ["bio"]: mydata.bio } });
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
    getloggedindata();
    setShowLoading(true);
    getPostdata();
  });

  const [values, setValues] = useState({
    id: loggedInData.id,
    username: loggedInData.username,
    email: loggedInData.email,
    bio: loggedInData.bio,
    mobile: loggedInData.mobile,
  });

  const handleChange = (e: any, name: string) => {
    setValues({
      ...values,
      ...{ [name]: e.target.value },
    });
  };
  const api = axios.create({
    baseURL: Constent.BASE_URL,
  });
  const handleUpdate = () => {
    if (!values.username) {
      setMessage("Please enter a valid username");
      setIserror(true);
      return;
    }
    if (!values.email) {
      setMessage("Please enter a valid Email");
      setIserror(true);
      return;
    }
    if (!values.mobile) {
      setMessage("Please enter a valid mobile number");
      setIserror(true);
      return;
    }

    setShowLoading(true);
    api
      .post("/updateuser", values)
      .then((res: any) => {
        localStorage.setItem("loggedInData", JSON.stringify(res.data.data));
        dismiss();
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

  const handleLike = (user_id: any, post_id: any, user_by: any) => {
    let formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("post_id", post_id);
    formData.append("user_by", user_by);
    api
      .post("/makeLike", formData)
      .then((res: any) => {
        console.log(res.data);
        getPostdata();
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


const [isListview, setListview] = useState<boolean>(false);
const listViewButton = () => {
  setListview(true);
  console.log('list',isListview);
};
const gridViewButton = () => {
  setListview(false);
  console.log('grid',isListview);
}

  const sharing = async (url:any) => {
    await Share.share({
        title: 'This post will be shared',
        text: 'Really awesome post you need to see right now',
        url: url,
        dialogTitle: 'Share with Friends',
      });
};

  // const handleAnchor = (e:any) => {
  //  	e.preventDefault();
  // }

  return (
    <>
      <SideNav />
      <IonPage id="main-content">
        <IonHeader no-border>
          <IonToolbar>
            <IonButtons slot="start">
              {
                isListview ? 
                <IonBackButton defaultHref="/profile" />
                : ''
              }
            </IonButtons>
            <IonTitle>Profile</IonTitle>
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
            <div className="doctor-listing">
              <IonGrid class="ion-no-padding">
                <IonRow>
                  <IonCol>
                    <IonItem
                      lines="none"
                      className="ion-justify-content-center"
                    >
                      <IonAvatar>
                        <img
                          text-center="true"
                          src={
                            loggedInData && loggedInData.profile
                              ? loggedInData.profile
                              : "/assets/images/user.png"
                          }
                          alt=""
                        />
                      </IonAvatar>
                    </IonItem>
                    <IonItem button lines="none">
                      <IonLabel>
                        <h1>{values ? values.username : ""}</h1>
                        <h3>{values ? values.email : ""}</h3>
                        <h3>{values ? values.mobile : ""}</h3>
                        <p className="user-bio">{values ? values.bio : ""}</p>
                      </IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <div className="ion-inline width-100">
                        <div>
                          <IonButton>
                            <IonIcon icon={addCircle} />
                            <IonLabel>Add story</IonLabel>
                          </IonButton>
                        </div>
                        <div>
                          <IonButton id="edit-modal">
                            <IonIcon icon={createOutline} />
                            <IonLabel>Edit Profile</IonLabel>
                          </IonButton>
                        </div>
                      </div>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>

              {/* modal start  */}
              <IonModal ref={modal} trigger="edit-modal">
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
              </IonModal>   
              {/* modal end  */}
              <IonSegment value="buttons" className="filter-buttons">
                <IonSegmentButton className={!isListview ? 'active-view grid-view-button' : 'grid-view-button'} onClick={gridViewButton}>
                  <IonIcon icon={grid} ></IonIcon>
                </IonSegmentButton>
                <IonSegmentButton className={isListview ? 'active-view list-view-button' : 'list-view-button'} onClick={listViewButton}>
                <IonIcon icon={list} ></IonIcon>
                </IonSegmentButton>
              </IonSegment>
              <IonGrid className={isListview ? 'list list-view-filter' : 'list grid-view-filter'} fixed={true}>
                {postdata.map((item: any, index) => (
                  <IonCard key={index}>
                    <IonItem lines="none" className="item-top">
                      <IonLabel className="ion-justify-content-between">
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
                          </div>
                        </div>
                      </IonLabel>
                    </IonItem>
                    <a key={index} id={'post'+item['id']} href={'profile/#post'+item['id']}>

                      <IonCardContent onClick={listViewButton}>
                        <div className="post-detail-wrap">
                          <IonItem className="ion-no-padding" lines="none">
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
                        <div className="action-wrap">
                          <IonGrid>
                            <IonRow>
                              <IonCol col-3 className="ion-no-padding">
                                <IonButton
                                  onClick={(e) =>
                                    handleLike(
                                      item['user_id'],
                                      item["id"],
                                      loggedInData.id
                                    )
                                  }
                                  expand="block"
                                  fill="clear"
                                >
                                  <IonIcon
                                    icon={
                                      item["likeBy"].includes(loggedInData.id)
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
                            onClick={(e) => 
                              sharing('http://localhost:8100/singlepost/'+item['id'])}
                                fill="clear">
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
                    </a>
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

export default Profile;
