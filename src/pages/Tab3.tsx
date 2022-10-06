import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../App';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" />
        <IonButton class='login-btn' expand="full" onClick={handleLogOut} size="default" shape="round">LogOut</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
