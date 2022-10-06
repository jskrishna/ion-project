import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar} from '@ionic/react';

const SideNav: React.FC = () => {
  return (
    <>
     <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonList>
          <IonItem routerLink="/dashboard/">
            <IonLabel>Dashboard</IonLabel>
          </IonItem>
          <IonItem routerLink="/tab2">
            <IonLabel>Tab 2</IonLabel>
          </IonItem>
        </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
};

export default SideNav;
