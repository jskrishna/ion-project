import { IonButton, IonCheckbox, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { keyOutline, mailOutline } from 'ionicons/icons';
import { useHistory } from "react-router-dom";


const Login: React.FC = () => {
    const history = useHistory();

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
                        </IonToolbar>
                    </div>
                    <div className='form-wrap'>
                        <form>
                            <IonList lines="none">
                                <IonItem class='input-item'>
                                    <IonIcon icon={mailOutline} />
                                    <IonInput type='email' value="" placeholder="Email address"></IonInput>
                                </IonItem>
                                <IonItem class='input-item'>
                                    <IonIcon icon={keyOutline} />
                                    <IonInput type='password' value="" placeholder="Password"></IonInput>
                                </IonItem>
                                <IonItem class="forgot-text">
                                    <IonButton routerLink="/forgot-password" fill="clear">Forgot Password?</IonButton>
                                </IonItem>
                                <IonItem class="custom-checkbox">
                                    <IonCheckbox slot="start"></IonCheckbox>
                                    <IonLabel>By using any of ScheduleMe services, you have agreed to the terms of service, and have read and understand our privacy policy and cookie policy and terms and condition</IonLabel>
                                </IonItem>
                                <IonButton class='login-btn' expand="full" size="default" shape="round" routerLink="/dashboard">Login</IonButton>
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
