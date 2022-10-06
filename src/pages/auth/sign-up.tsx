import {
  IonAlert,
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
import axios from "axios";
import { keyOutline, mailOutline, personOutline } from "ionicons/icons";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import Constent from "../../components/Constent";
const SignUp: React.FC = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [values, setValues] = useState({
    username: '',
    email: '',
    password:'',
    password_confirmation:'',
  });
  const handleChange = (e:any, name:string) => {
    console.log(e.target.value);
    setValues({
      ...values,
      ...{ [name]: e.target.value },
    });
  }
 

  const registerUser = () => {
    console.log(values);
    const api = axios.create({
      baseURL: Constent.BASE_URL
    })
    api.post("/registeruser", values)
    .then(res => {   
      console.log(res);
      history.push("/");
     })
     .catch(e =>{
      console.log(e);
      console.log(e.response.data);
      if(e.response && e.response.data && e.response.data.message){
          setMessage(e.response.data.message);
      }else if(e.response.data.username){
        setMessage(e.response.data.username[0]);
      }else if(e.response.data.email){
          setMessage(e.response.data.email[0]);
      }else if(e.response.data.password){
        setMessage(e.response.data.password[0]);
      }else{
          setMessage("Something went wrong!");
      }
        setIserror(true)
     })
     
  }
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
          <div className="form-wrap">
            <form>
              <IonList lines="none">
                <IonItem class="input-item">
                  <IonIcon icon={personOutline} />
                  <IonInput type="text" name="username" onIonChange={(e)=>handleChange(e,'username')} placeholder="Full Name" required />
                </IonItem>
                <IonItem class="input-item">
                  <IonIcon icon={mailOutline} />
                  <IonInput type="email" name="email" onIonChange={(e) => handleChange(e,'email')} placeholder="Email Address" required />
                </IonItem>
                <IonItem class="input-item">
                  <IonIcon icon={keyOutline} />
                  <IonInput type="password" name="password" onIonChange={(e) => handleChange(e,'password')} placeholder="Password" required />
                </IonItem>
                <IonItem class="input-item">
                  <IonIcon icon={keyOutline} />
                  <IonInput
                    type="password"
                    name="password_confirmation"
                    onIonChange={(e) => handleChange(e,'password_confirmation')}
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
                  type="button"
                  expand="block"
                  onClick={registerUser}
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
