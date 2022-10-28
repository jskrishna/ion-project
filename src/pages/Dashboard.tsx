import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent,  IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonPopover, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonThumbnail, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { chatbubbles, ellipsisVertical, shareSocial, thumbsUp } from 'ionicons/icons';
import SideNav from '../components/common/sidenav';
import './Dashboard.css';
import { OverlayEventDetail } from '@ionic/core/components';
import { useEffect, useRef, useState } from 'react';
import { Share } from '@capacitor/share';

const Dashboard: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  const Modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

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
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
  }

  const sharing = async () => {
    await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: 'http://ionicframework.com/',
        dialogTitle: 'Share with buddies',
      });
};

  // scroll down refresh
  const [data, setData] = useState<string[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [ReadyArray, setReadyArray] = useState<any>([]);
  const handleClick = (e: any) => {
    if (ReadyArray.includes(e)) {
      setReadyArray(ReadyArray.filter((item :any) => item !== e));
    } else {
      setReadyArray([...ReadyArray, e]);
    }
  };

  const pushData = () => {
    const max = data.length + 20;
    const min = max - 20;
    const newData = [];
    for (let i = min; i < max; i++) {
      newData.push('Item' + i);
    }
    setData([
      ...data,
      ...newData
    ]);
  }
  const loadData = (ev: any) => {
    setTimeout(() => {
      pushData();
      ev.target.complete();
      if (data.length === 1000) {
        setInfiniteDisabled(true);
      }
    }, 500);
  }
  useIonViewWillEnter(() => {
    pushData();
  });

  return (
    <>
      <SideNav />
      <IonPage id="main-content">
        <IonHeader no-border>
          <IonToolbar>
            <IonTitle>Dashboard</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding custom-content" scrollEvents={true}
          onIonScrollStart={() => { }}
          onIonScroll={() => { }}
          onIonScrollEnd={() => { }}>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={100} pullMax={200}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <section>
            <IonToolbar className='no-padding'>
              <IonSearchbar></IonSearchbar>
            </IonToolbar>
            <div>
              <IonCard>
                <IonItem lines="none">
                  <IonThumbnail slot="start">
                    <img src='/assets/images/pk.png' alt="" />
                  </IonThumbnail>
                  <IonLabel className='ion-justify-content-between'>
                    <div className='ion-inline'>
                      <div>
                        <h2>Pk</h2>
                        <p>36 min ago</p>
                      </div>
                      <div>
                        <IonIcon id="trigger1" icon={ellipsisVertical} />
                        <IonPopover trigger="trigger1" size="auto">
                          <IonContent class="ion-padding">Hello!</IonContent>
                        </IonPopover>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  <div className='post-detail-wrap'>
                    <IonItem className='ion-no-padding' lines="none">
                      <div className='' key={"1"}>
                        <p>
                          {ReadyArray.includes('1') ? "Keep close to Nature's heart and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean" : `${`Keep close to Nature's heart and break clear away, once in awhile,
                          and climb a mountain or spend a week in the woods. Wash your spirit clean`.substring(0, 40)}...`}
                          <a onClick={() => handleClick("1")} href="javascript:void(0)">{ReadyArray.includes('1') ? " Show less" : " Read more"}</a></p>
                        <div className='post-img' id="open-modal">
                          <img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" alt="" />
                        </div>
                      </div>
                    </IonItem>
                  </div>
                  <div className='action-wrap'>
                    <IonGrid >
                      <IonRow>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={thumbsUp} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={chatbubbles} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton onClick={sharing} expand="block" fill='clear'>
                            <IonIcon icon={shareSocial} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </div>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonItem lines="none">
                  <IonThumbnail slot="start">
                    <img src='/assets/images/pk.png' alt="" />
                  </IonThumbnail>
                  <IonLabel className='ion-justify-content-between'>
                    <div className='ion-inline'>
                      <div>
                        <h2>Pk</h2>
                        <p>36 min ago</p>
                      </div>
                      <div>
                        <IonIcon id="trigger2" icon={ellipsisVertical} />
                        <IonPopover trigger="trigger2" size="auto">
                          <IonContent class="ion-padding">Hello!</IonContent>
                        </IonPopover>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  <div className='post-detail-wrap'>
                  <IonItem className='ion-no-padding' lines="none">
                      <div className='' key={"2"}>
                        <p>
                          {ReadyArray.includes('2') ? "Keep close to Nature's heart and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean" : `${`Keep close to Nature's heart and break clear away, once in awhile,
                          and climb a mountain or spend a week in the woods. Wash your spirit clean`.substring(0, 40)}...`}
                          <a onClick={() => handleClick("2")} href="javascript:void(0)">{ReadyArray.includes('2') ? " Show less" : " Read more"}</a></p>
                        <div className='post-img' id="open-modal">
                          <img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" alt="" />
                        </div>
                      </div>
                    </IonItem>
                  </div>
                  <div className='action-wrap'>
                    <IonGrid >
                      <IonRow>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={thumbsUp} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={chatbubbles} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={shareSocial} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </div>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonItem lines="none">
                  <IonThumbnail slot="start">
                    <img src='/assets/images/pk.png' alt="" />
                  </IonThumbnail>
                  <IonLabel className='ion-justify-content-between'>
                    <div className='ion-inline'>
                      <div>
                        <h2>Pk</h2>
                        <p>36 min ago</p>
                      </div>
                      <div>
                        <IonIcon id="trigger3" icon={ellipsisVertical} />
                        <IonPopover trigger="trigger3" size="auto">
                          <IonContent class="ion-padding">Hello!</IonContent>
                        </IonPopover>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  <div className='post-detail-wrap'>
                  <IonItem className='ion-no-padding' lines="none">
                      <div className='' key={"3"}>
                        <p>
                          {ReadyArray.includes('3') ? "Keep close to Nature's heart and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean" : `${`Keep close to Nature's heart and break clear away, once in awhile,
                          and climb a mountain or spend a week in the woods. Wash your spirit clean`.substring(0, 40)}...`}
                          <a onClick={() => handleClick("3")} href="javascript:void(0)">{ReadyArray.includes('3') ? " Show less" : " Read more"}</a></p>
                        <div className='post-img' id="open-modal">
                          <img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" alt="" />
                        </div>
                      </div>
                    </IonItem>
                  </div>
                  <div className='action-wrap'>
                    <IonGrid >
                      <IonRow>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={thumbsUp} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={chatbubbles} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={shareSocial} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </div>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonItem lines="none">
                  <IonThumbnail slot="start">
                    <img src='/assets/images/pk.png' alt="" />
                  </IonThumbnail>
                  <IonLabel className='ion-justify-content-between'>
                    <div className='ion-inline'>
                      <div>
                        <h2>Pk</h2>
                        <p>36 min ago</p>
                      </div>
                      <div>
                        <IonIcon id="trigger4" icon={ellipsisVertical} />
                        <IonPopover trigger="trigger4" size="auto">
                          <IonContent class="ion-padding">Hello!</IonContent>
                        </IonPopover>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  <div className='post-detail-wrap'>
                  <IonItem className='ion-no-padding' lines="none">
                      <div className='' key={"4"}>
                        <p>
                          {ReadyArray.includes('4') ? "Keep close to Nature's heart and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean" : `${`Keep close to Nature's heart and break clear away, once in awhile,
                          and climb a mountain or spend a week in the woods. Wash your spirit clean`.substring(0, 40)}...`}
                          <a onClick={() => handleClick("4")} href="javascript:void(0)">{ReadyArray.includes('4') ? " Show less" : " Read more"}</a></p>
                        <div className='post-img' id="open-modal">
                          <img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" alt="" />
                        </div>
                      </div>
                    </IonItem>
                  </div>
                  <div className='action-wrap'>
                    <IonGrid >
                      <IonRow>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={thumbsUp} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={chatbubbles} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={shareSocial} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </div>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonItem lines="none">
                  <IonThumbnail slot="start">
                    <img src='/assets/images/pk.png' alt="" />
                  </IonThumbnail>
                  <IonLabel className='ion-justify-content-between'>
                    <div className='ion-inline'>
                      <div>
                        <h2>Pk</h2>
                        <p>36 min ago</p>
                      </div>
                      <div>
                        <IonIcon id="trigger5" icon={ellipsisVertical} />
                        <IonPopover trigger="trigger5" size="auto">
                          <IonContent class="ion-padding">Hello!</IonContent>
                        </IonPopover>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  <div className='post-detail-wrap'>
                  <IonItem className='ion-no-padding' lines="none">
                      <div className='' key={"5"}>
                        <p>
                          {ReadyArray.includes('5') ? "Keep close to Nature's heart and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean" : `${`Keep close to Nature's heart and break clear away, once in awhile,
                          and climb a mountain or spend a week in the woods. Wash your spirit clean`.substring(0, 50)}...`}
                          <a onClick={() => handleClick("5")} href="javascript:void(0)">{ReadyArray.includes('5') ? " Show less" : " Read more"}</a></p>
                        <div className='post-img' id="open-modal">
                          <img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" alt="" />
                        </div>
                      </div>
                    </IonItem>
                  </div>
                  <div className='action-wrap'>
                    <IonGrid >
                      <IonRow>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={thumbsUp} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={chatbubbles} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={shareSocial} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </div>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonItem lines="none">
                  <IonThumbnail slot="start">
                    <img src='/assets/images/pk.png' alt="" />
                  </IonThumbnail>
                  <IonLabel className='ion-justify-content-between'>
                    <div className='ion-inline'>
                      <div>
                        <h2>Pk</h2>
                        <p>36 min ago</p>
                      </div>
                      <div>
                        <IonIcon id="trigger6" icon={ellipsisVertical} />
                        <IonPopover trigger="trigger6" size="auto">
                          <IonContent class="ion-padding">Hello!</IonContent>
                        </IonPopover>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
                <IonCardContent>
                  <div className='post-detail-wrap'>
                  <IonItem className='ion-no-padding' lines="none">
                      <div className='' key={"6"}>
                        <p>
                          {ReadyArray.includes('6') ? "Keep close to Nature's heart and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spirit clean" : `${`Keep close to Nature's heart and break clear away, once in awhile,
                          and climb a mountain or spend a week in the woods. Wash your spirit clean`.substring(0, 60)}...`}
                          <a onClick={() => handleClick("6")} href="javascript:void(0)">{ReadyArray.includes('6') ? " Show less" : " Read more"}</a></p>
                        <div className='post-img' id="open-modal">
                          <img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" alt="" />
                        </div>
                      </div>
                    </IonItem>
                  </div>
                  <div className='action-wrap'>
                    <IonGrid >
                      <IonRow>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={thumbsUp} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={chatbubbles} />
                          </IonButton>
                        </IonCol>
                        <IonCol col-3 className='ion-no-padding'>
                          <IonButton expand="block" fill='clear'>
                            <IonIcon icon={shareSocial} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
            <IonInfiniteScroll
              onIonInfinite={loadData}
              threshold="100px"
              disabled={isInfiniteDisabled}
            >
              <IonInfiniteScrollContent
                loadingSpinner="bubbles"
                loadingText="Loading more data..."
              ></IonInfiniteScrollContent>
            </IonInfiniteScroll>
            {/* <IonGrid class="ion-no-padding">
              <IonRow>
                <IonCol>
                  <IonCard routerLink="/cardiology">
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/heartbeat.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Cardiology</IonCardTitle>
                      <h4>46 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard routerLink="/profile">
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/dentistry.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Dentistry</IonCardTitle>
                      <h4>30 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard routerLink="/psychiatry">
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/brain.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Psychiatry</IonCardTitle>
                      <h4>20 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard routerLink="/pediatrian">
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/child.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Pediatrian</IonCardTitle>
                      <h4>50 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/knee.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Cardiology</IonCardTitle>
                      <h4>24 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/path 2335.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Dentistry</IonCardTitle>
                      <h4>10 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/heartbeat.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Psychiatry</IonCardTitle>
                      <h4>12 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/heartbeat.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Cardiology</IonCardTitle>
                      <h4>70 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/heartbeat.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Cardiology</IonCardTitle>
                      <h4>60 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/heartbeat.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Dentistry</IonCardTitle>
                      <h4>70 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/heartbeat.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Psychiatry</IonCardTitle>
                      <h4>70 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <div className='card-icon'>
                        <img src="/assets/images/heartbeat.png" alt="" />
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonCardTitle>Test</IonCardTitle>
                      <h4>70 Specialist</h4>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid> */}
          </section>
          {/* <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                </IonButtons>
                <IonTitle>Welcome</IonTitle>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={() => confirm()}>
                    Confirm
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <div className='post-img'>
                  <img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" alt="" />
                </div>
              </IonItem>
              <div className=''>
                <IonGrid >
                  <IonRow>
                    <IonCol col-3 className='ion-no-padding'>
                      <IonItem className='ion-no-padding ion-text-center'>
                        <IonIcon icon={thumbsUp} />
                      </IonItem>
                    </IonCol>
                    <IonCol col-3 className='ion-no-padding'>
                      <IonItem className='ion-no-padding'>
                        <IonIcon icon={chatbubbles} />
                      </IonItem>
                    </IonCol>
                    <IonCol col-3 className='ion-no-padding'>
                      <IonItem className='ion-no-padding'>
                        <IonIcon icon={shareSocial} />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            </IonContent>
          </IonModal> */}
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
