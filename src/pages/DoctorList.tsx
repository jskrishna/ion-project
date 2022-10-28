import { IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import SideNav from '../components/common/sidenav';
import './DoctorList.css';

const Tab2: React.FC = () => {
  return (
    <>
      <SideNav />
      <IonPage id="main-content">
        <IonHeader no-border>
          <IonToolbar>
            <IonTitle>Doctors</IonTitle>
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
            <IonToolbar>
              <IonSearchbar></IonSearchbar>
            </IonToolbar>
            <div className='doctor-listing'>
              <IonGrid class="ion-no-padding">
                <IonRow>
                  <IonCol>
                    <IonCard>
                      
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </section>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tab2;
