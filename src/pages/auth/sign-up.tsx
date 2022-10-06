import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { keyOutline, mailOutline, personOutline } from "ionicons/icons";

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonContent color="custom-gray">
        <div className="auth-page">
          <div className="auth-img-wrap">
            <IonImg src="/assets/images/login.png"></IonImg>
          </div>
          <div className="auth-header">
            <IonToolbar>
              <IonTitle>Get Started!</IonTitle>
              <IonTitle size="small">
                Create an account with us to get all features
              </IonTitle>
            </IonToolbar>
          </div>
          <div className="form-wrap">
            <form>
              <IonList lines="none">
                <IonItem class="input-item">
                  <IonIcon icon={personOutline} />
                  <IonInput type="text" placeholder="Full Name" required />
                </IonItem>
                <IonItem class="input-item">
                  <IonIcon icon={mailOutline} />
                  <IonInput type="text" placeholder="Email Address" required />
                </IonItem>
                <IonItem class="input-item">
                  <IonIcon icon={keyOutline} />
                  <IonInput type="text" placeholder="Password" required />
                </IonItem>
                <IonItem class="input-item">
                  <IonIcon icon={keyOutline} />
                  <IonInput
                    type="text"
                    placeholder="Confirm Password"
                    required
                  />
                </IonItem>
                <IonItem class="custom-checkbox">
                  <IonCheckbox slot="start"></IonCheckbox>
                  <IonLabel>
                    By using any of ScheduleMe services, you have agreed to the
                    terms of service, and have read and understand our privacy
                    policy and cookie policy and terms and condition
                  </IonLabel>
                </IonItem>
                <IonButton
                  class="ion-margin-top login-btn"
                  shape="round"
                  type="submit"
                  expand="block"
                >
                  Sign Up
                </IonButton>
                <IonItem class="ion-text-center">
                  <IonLabel>
                    Already have an account?{" "}
                    <IonButton routerLink="/login" size="small" fill="clear">
                      Log In
                    </IonButton>{" "}
                    here
                  </IonLabel>
                </IonItem>
              </IonList>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
