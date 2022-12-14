import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircle, archiveOutline, homeOutline, logOutOutline, person } from 'ionicons/icons';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';

const SideNav: React.FC = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  const handleLogOut = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInId');
    user.setIsLoggedIn(false);
    history.push("/login");
    console.log('logout');
  }
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="no-padding">
          <IonList className='menu-wrap'>
            <IonItem routerLink="/dashboard/">
            <IonIcon className='menu-icon' icon={homeOutline} />
              <IonLabel>Dashboard</IonLabel>
            </IonItem>
            <IonItem routerLink="/new-post">
            <IonIcon className='menu-icon' icon={addCircle} />
              <IonLabel>New Post</IonLabel>
            </IonItem>
            <IonItem routerLink="/archived">
            <IonIcon className='menu-icon' icon={archiveOutline} />
              <IonLabel>Archived</IonLabel>
            </IonItem>
            <IonItem routerLink="/profile/">
            <IonIcon className='menu-icon' icon={person} />
              <IonLabel>Profile</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
        <IonFooter>
          <IonItem button onClick={handleLogOut}>
            <IonIcon slot="start" icon={logOutOutline} ></IonIcon>
            <IonReactRouter></IonReactRouter>
            <IonLabel>Log out</IonLabel>
          </IonItem>
        </IonFooter>
      </IonMenu>
    </>
  );
};

export default SideNav;
