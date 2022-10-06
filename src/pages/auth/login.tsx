import { IonAlert, IonButton, IonCheckbox, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { keyOutline, mailOutline } from 'ionicons/icons';
import { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from '../../App';
import Constent from '../../components/Constent';
import axios from "axios";

const Login: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>("admin@gmail.com");
    const [password, setPassword] = useState<string>("admin");
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
  
    const user = useContext(UserContext);
    
    const handleLogin = () => {
      if (!email) {
          setMessage("Please enter a valid Email");
          setIserror(true);
          return;
      }
  
      if (!password) {
          setMessage("Please enter your password");
          setIserror(true);
          return;
      }
  
      const loginData = {
          "email": email,
          "password": password
      }
  
      const api = axios.create({
        baseURL: Constent.BASE_URL
      })
      api.post("/login", loginData)
          .then(res => {         
            console.log(res.data.data.id);
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('loggedInId', res.data.data.id);
            user.setIsLoggedIn(true);
            history.push("/dashboard");
           })
           .catch(e =>{
            console.log(e);
            if(e.response && e.response.data && e.response.data.message){
                setMessage(e.response.data.message);
            }else{
                setMessage("Auth failure!");
            }
              setIserror(true)
           })
    };
  
    const redirect = () => {
        history.push("/dashboard");
    }
    return (
        <IonPage>
            <IonContent >
                <div className='auth-page'>
                    <div className='auth-img-wrap'>
                        <IonImg src="/assets/images/login.png" ></IonImg>
                    </div>
                    <div className='auth-header'>
                        <IonToolbar>
                            <IonTitle>Welcome Back!</IonTitle>
                            <IonTitle size="small">Sign in to your account</IonTitle>
                            <IonAlert
                                isOpen={iserror}
                                onDidDismiss={() => setIserror(false)}
                                cssClass="my-custom-class"
                                header={"Error!"}
                                message={message}
                                buttons={["Dismiss"]}
                            />
                        </IonToolbar>
                    </div>
                    <div className='form-wrap'>
                        <form>
                            <IonList lines="none">
                                <IonItem class='input-item'>
                                    <IonIcon icon={mailOutline} />
                                    <IonInput type='email' 
                                     value={email}
                                     autocomplete='off'
                                     onIonChange={(e) => setEmail(e.detail.value!)}
                                    placeholder="Email address"></IonInput>
                                </IonItem>
                                <IonItem class='input-item'>
                                    <IonIcon icon={keyOutline} />
                                    <IonInput type='password' 
                                    value={password}
                                    autocomplete='off'
                                    onIonChange={(e) => setPassword(e.detail.value!)}
                                    placeholder="Password"></IonInput>
                                </IonItem>
                                <IonItem class="forgot-text">
                                    <IonButton routerLink="/forgot-password" fill="clear">Forgot Password?</IonButton>
                                </IonItem>
                                <IonItem class="custom-checkbox">
                                    <IonCheckbox slot="start"></IonCheckbox>
                                    <IonLabel>By using any of ScheduleMe services, you have agreed to the terms of service, and have read and understand our privacy policy and cookie policy and terms and condition</IonLabel>
                                </IonItem>
                                <IonButton class='login-btn' expand="full" onClick={handleLogin} size="default" shape="round" 
                                // routerLink="/dashboard"
                                >Login</IonButton>
                                <IonItem class="ion-text-center">
                                    <IonLabel>Don't have an account? <IonButton routerLink="/sign-up" size="small" fill="clear">Sign Up</IonButton> here</IonLabel>
                                </IonItem>
                            </IonList>
                        </form>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
