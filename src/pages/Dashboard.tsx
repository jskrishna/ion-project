import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import SideNav from '../components/common/sidenav';
import './Dashboard.css';

const Dashboard: React.FC = () => {
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
        <IonContent class="ion-padding" scrollEvents={true}
          onIonScrollStart={() => { }}
          onIonScroll={() => { }}
          onIonScrollEnd={() => { }}>
          <section>
            <IonGrid class="ion-no-padding">
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle class='ion-sm-small'>Cardiology</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>60</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Dentistry</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>70</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Psychiatry</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>70</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Pediatrian</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>70</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle class='ion-sm-small'>Cardiology</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>60</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Dentistry</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>70</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Psychiatry</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>70</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Pediatrian</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>70</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle class='ion-sm-small'>Cardiology</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>60</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Dentistry</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>70</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Psychiatry</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>70</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Pediatrian</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <h2>70</h2>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </section>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Dashboard;
