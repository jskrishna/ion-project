import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent,  IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonModal, IonPage, IonPopover, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonThumbnail, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { chatbubbles, chatbubbleSharp, ellipsisVertical, heartOutline, heartSharp, settingsOutline, shareSocial, thumbsUp } from 'ionicons/icons';
import SideNav from '../components/common/sidenav';
import './Dashboard.css';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Share } from '@capacitor/share';
import Constent from "../components/Constent";
import { handleLike } from '../components/common/Actions';
const Dashboard: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  var human = require("human-time");

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  // pull down refresh
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    // console.log('Begin async operation');
    getNewsFeed(loggedInData.id)
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
  }

  const sharing = async (url:any) => {
    await Share.share({
        title: 'This post will be shared',
        text: 'Really awesome post you need to see right now',
        url: url,
        dialogTitle: 'Share with Friends',
      });
};
  // scroll down refresh
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [ReadyArray, setReadyArray] = useState<any>([]);
  const handleClick = (e: any) => {
    if (ReadyArray.includes(e)) {
      setReadyArray(ReadyArray.filter((item :any) => item !== e));
    } else {
      setReadyArray([...ReadyArray, e]);
    }
  };

  const api = axios.create({
    baseURL: Constent.BASE_URL,
  });
  var loggedInData: any = localStorage.getItem("loggedInData")
  ? localStorage.getItem("loggedInData")
  : null;
loggedInData = JSON.parse(loggedInData);

const [feedData, setFeedData] = useState([]);
const [likeData, setlikeData] = useState<any>([]);
const [commentData, setcommentData] = useState<any>([]);

  const getNewsFeed = (user_id:any) => {
    api
      .get(`/newsfeed/` + user_id)
      .then((res: any) => {
        setFeedData(res.data.data);
        setlikeData(res.data.like);
        setcommentData(res.data.comment);
        console.log('feed--',res.data.data);
        console.log('like--',res.data.like);
        console.log('comment--',res.data.comment);
        setShowLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useIonViewWillEnter(() => {
    // newsFeed
    setShowLoading(true);
    getNewsFeed(loggedInData.id);
  });
  const [showLoading, setShowLoading] = useState(false);

  const handleLikeAction = (user_id: any, post_id: any, user_by: any) => {
    handleLike(user_id,post_id,user_by);
    setTimeout(() => {
      getNewsFeed(loggedInData.id);
    }, 1000);
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
            <IonTitle>Dashboard</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton>
              <IonIcon icon={settingsOutline}></IonIcon>
              </IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonLoading
          cssClass="custom-loading"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Loading..."}
          spinner="circles"
        />
        <IonContent class="ion-padding custom-content" scrollEvents={true}
          onIonScrollStart={() => { }}
          onIonScroll={() => { }}
          onIonScrollEnd={() => { }}>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={100} pullMax={200}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <section>
            <div>
            {feedData.map((item: any, index) => (
            <IonCard key={item['id']}>
                    <IonItem lines="none" className="">
                      <IonLabel className="ion-justify-content-between">
                        <div className="post-header-wrap">
                          <div className='post-header-left'>
                            <IonAvatar>
                              <img src={item['profile']? item['profile'] : "/assets/images/user.png"} alt="profile" />
                            </IonAvatar>
                          </div>
                          <div className='post-header-right'>
                          <h3>
                              <b>{item['username']}</b>
                            </h3>
                            <p>{human(new Date(item['created_at']))}</p>
                          </div>
                        </div>
                      </IonLabel>
                    </IonItem>
                      <IonCardContent>
                        <div className="post-detail-wrap">
                          <IonItem className="ion-no-padding" lines="none">
                            <div className="">
                              <p>
                                {item['caption']}
                              </p>
                              <div className="post-img">
                                {item['media_type'] == "mp4" ||
                                  item['media_type'] == "avi" ||
                                  item['media_type'] == "flv" ||
                                  item['media_type'] == "3gp" ||
                                  item['media_type'] == "mkv" ? (
                                  <video controls>
                                    <source
                                      src={item['media']}
                                      type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : item['media_type'] == "mp3" ? (
                                  <audio controls>
                                    <source
                                      src={item['media']}
                                      type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio>
                                ) : (
                                  <img src={item['media']} alt="" />
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
                                    handleLikeAction(
                                      item['user_id'],
                                      item['id'],
                                      loggedInData.id
                                    )
                                  }
                                  expand="block"
                                  fill="clear"
                                >
                                  <IonIcon
                                    icon={
                                      likeData[item['id']].some((el:any) => el.user_by === loggedInData.id)
                                        ? heartSharp
                                        : 
                                        heartOutline
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
                            onClick={(e) => sharing('http://localhost:8100/singlepost/'+item['id'])}
                                fill="clear">
                                  <IonIcon icon={shareSocial} />
                                </IonButton>
                              </IonCol>
                            </IonRow>
                            {
                            likeData[item['id']] ?
                            likeData[item['id']].length == 2 ? (
                              <p>
                                Liked by{" "}
                                {
                                  <span>
                                    <b>{likeData[item['id']][0].username}</b>
                                    &nbsp;and&nbsp;
                                    <b>{likeData[item['id']][1].username}</b>
                                  </span>
                                }
                              </p>
                            ) : likeData[item['id']].length  == 0 ? (
                              ""
                            ) : likeData[item['id']].length  == 1 ? (
                              <p>
                                Liked by{" "}
                                {
                                  <span>
                                    <b>{likeData[item['id']][0].username}</b>
                                  </span>
                                }
                              </p>
                            ) : likeData[item['id']].length  > 2 ? (
                              <p>
                                Liked by{" "}
                                {
                                  <span>
                                    <b>{likeData[item['id']][0].username}</b>
                                    &nbsp;and&nbsp;
                                    <b>{likeData[item['id']].length  - 1} others</b>
                                  </span>
                                }
                              </p>
                            ) : (
                              ""
                            )
                            : ''
                            }

                          { commentData[item['id']] ? 
                            <div className="comments">
                              <span>
                                {
                                commentData[item['id']].length == 0
                                  ? ""
                                  : commentData[item['id']].length == 1
                                    ? "View comment"
                                    : commentData[item['id']].length > 1
                                      ? "view all " +
                                      commentData[item['id']].length +
                                      " comments"
                                      : ""}
                              </span>
                              {commentData[item['id']].length > 0 ? (
                                <span>
                                  <p>
                                    <b> {commentData[item['id']][0].username}</b>{" "}
                                    {commentData[item['id']][0].comment}
                                  </p>
                                </span>
                              ) : (
                                ""
                              )
                              }
                            </div>
                             : ''}
                          </IonGrid>
                        </div>
                      </IonCardContent>
                  </IonCard>
                                 ))}
            </div>
            </section>
          <IonModal ref={modal} trigger="open-modal" presentingElement={presentingElement!}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src="https://i.pravatar.cc/300?u=b" />
                </IonAvatar>
                <IonLabel>
                  <h2>Connor Smith</h2>
                  <p>Sales Rep</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src="https://i.pravatar.cc/300?u=a" />
                </IonAvatar>
                <IonLabel>
                  <h2>Daniel Smith</h2>
                  <p>Product Designer</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src="https://i.pravatar.cc/300?u=d" />
                </IonAvatar>
                <IonLabel>
                  <h2>Greg Smith</h2>
                  <p>Director of Operations</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src="https://i.pravatar.cc/300?u=e" />
                </IonAvatar>
                <IonLabel>
                  <h2>Zoey Smith</h2>
                  <p>CEO</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Dashboard;
