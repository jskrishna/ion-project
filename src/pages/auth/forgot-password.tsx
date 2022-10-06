import { IonButton, IonContent, IonImg, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent color="custom-gray">
                <div className='auth-page'>
                    <div className='auth-img-wrap'>
                        <IonImg src="/assets/images/login.png" ></IonImg>
                    </div>
                    <div className='auth-header'>
                        <IonToolbar>
                            <IonTitle>Forgot Password?</IonTitle>
                            <IonTitle size="small">Enter your email below to retrieve your account</IonTitle>
                        </IonToolbar>
                    </div>
                    <div className='form-wrap'>
                        <form>
                            <IonList lines="none">
                                <IonItem class='input-item'>
                                    <IonInput type="text" placeholder="Email address" required />
                                </IonItem>
                                <IonButton class="ion-margin-top login-btn" shape="round" type="submit" expand="block">
                                    Reset
                                </IonButton>
                                <IonButton expand="block" routerLink="/login" size="small" fill="clear"> Back to login</IonButton>
                            </IonList>
                        </form>
                    </div>
                </div>
            </IonContent>
        </IonPage >
    );
};

export default Login;
