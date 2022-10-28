import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonPopover, IonProgressBar, IonRadio, IonRadioGroup, IonRange, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle, createOutline, ellipsisHorizontal, images, informationCircle, musicalNote, videocam } from 'ionicons/icons';
import SideNav from '../components/common/sidenav';
import './Profile.css';

const Profile: React.FC = () => {

  return (
    <>
      <SideNav />
      <IonPage id="main-content">
        <IonHeader no-border>
          <IonToolbar>
            <IonTitle>Profile</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding custom-content" scrollEvents={true}
          onIonScrollStart={() => { }}
          onIonScroll={() => { }}
          onIonScrollEnd={() => { }}>
          <section>
            <div className='doctor-listing'>
              <IonGrid class="ion-no-padding">
                <IonRow>
                  <IonCol>
                    <IonItem lines="none" className='ion-justify-content-center'>
                      <IonThumbnail >
                        <img text-center src='/assets/images/pk.png' alt="" />
                      </IonThumbnail>
                    </IonItem>
                    <IonItem button lines="none">
                      <IonLabel>
                        <h2>Pradhuman Patidar</h2>
                      </IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                      <div className='ion-inline width-100'>
                        <div>
                          <IonButton>
                            <IonIcon icon={addCircle} />
                            <IonLabel>Add to story</IonLabel>
                          </IonButton>
                        </div>
                        <div>
                          <IonButton >
                            <IonIcon icon={createOutline} />
                            <IonLabel>Edit Profile</IonLabel>
                          </IonButton>
                        </div>
                        <div>
                          <IonButton id="trigger11" fill='clear'>
                            <IonIcon icon={ellipsisHorizontal} />
                          </IonButton>
                          <IonPopover trigger="trigger11" size="auto">
                            <IonContent class="ion-padding">Edit</IonContent>
                          </IonPopover>
                        </div>
                      </div>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
              {/* <IonTabBar>
                <IonTabButton tab="schedule">
                  <IonIcon icon={images} />
                  <IonLabel>Photos</IonLabel>
                  <IonBadge>6</IonBadge>
                </IonTabButton>

                <IonTabButton tab="speakers">
                  <IonIcon icon={videocam} />
                  <IonLabel>Videos</IonLabel>
                </IonTabButton>

                <IonTabButton tab="map">
                  <IonIcon icon={musicalNote} />
                  <IonLabel>Map</IonLabel>
                </IonTabButton>

                <IonTabButton tab="about">
                  <IonIcon icon={informationCircle} />
                  <IonLabel>About</IonLabel>
                </IonTabButton>
              </IonTabBar>
              <IonGrid>
                <IonCol>
                </IonCol>
              </IonGrid> */}
            </div>
          </section>

          {/* <IonItem>
        <IonLabel>Toppings</IonLabel>
        <IonSelect multiple={true} cancelText="Nah" okText="Okay!">
          <IonSelectOption value="bacon">Bacon</IonSelectOption>
          <IonSelectOption value="olives">Black Olives</IonSelectOption>
          <IonSelectOption value="xcheese">Extra Cheese</IonSelectOption>
          <IonSelectOption value="peppers">Green Peppers</IonSelectOption>
          <IonSelectOption value="mushrooms">Mushrooms</IonSelectOption>
          <IonSelectOption value="onions">Onions</IonSelectOption>
          <IonSelectOption value="pepperoni">Pepperoni</IonSelectOption>
          <IonSelectOption value="pineapple">Pineapple</IonSelectOption>
          <IonSelectOption value="sausage">Sausage</IonSelectOption>
          <IonSelectOption value="Spinach">Spinach</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonLabel>Hair Color</IonLabel>
        <IonSelect value="brown" okText="Okay" cancelText="Dismiss">
          <IonSelectOption value="brown">Brown</IonSelectOption>
          <IonSelectOption value="blonde">Blonde</IonSelectOption>
          <IonSelectOption value="black">Black</IonSelectOption>
          <IonSelectOption value="red">Red</IonSelectOption>
        </IonSelect>
      </IonItem>
      

          <IonSegment>
            <IonSegmentButton layout="icon-end">
              <IonIcon name="call" />
              <IonLabel>Item One</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton layout="icon-end">
              <IonIcon name="heart" />
              <IonLabel>Item Two</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton layout="icon-end">
              <IonIcon name="pin" />
              <IonLabel>Item Three</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <IonList>
            <IonItem>
              <IonRange color="danger" pin={true} />
            </IonItem>

            <IonItem>
              <IonRange min={-200} max={200} color="secondary">
                <IonLabel slot="start">-200</IonLabel>
                <IonLabel slot="end">200</IonLabel>
              </IonRange>
            </IonItem>

            <IonItem>
              <IonRange min={20} max={80} step={2}>
                <IonIcon size="small" slot="start" name="sunny" />
                <IonIcon slot="end" name="sunny" />
              </IonRange>
            </IonItem>

            <IonItem>
              <IonRange min={1000} max={2000} step={100} snaps={true} color="secondary" />
            </IonItem>

            <IonItem>
              <IonRange min={1000} max={2000} step={100} snaps={true} ticks={false} color="secondary" />
            </IonItem>

            <IonItem>
              <IonRange dualKnobs={true} min={21} max={72} step={3} snaps={true} />
            </IonItem>
          </IonList> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Profile;
