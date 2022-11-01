import { IonAlert, IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { config } from 'process';
import { useState, useRef } from 'react';
import SideNav from '../components/common/sidenav';
import Constent from '../components/Constent';
import './DoctorList.css';
import { useHistory } from "react-router-dom";

interface MultipleValues {
    fileOne: any;
  }
const NewPost: React.FC = () => {
    const [iserror, setIserror] = useState<boolean>(false);
    const [issuccess, setSucess] = useState<boolean>(false);
    const [caption, setcaption] = useState<string>("");
    const fileone = useRef(null);
    const filetwo = useRef(null);
    const [message, setMessage] = useState<string>("");
    const [showLoading, setShowLoading] = useState(false);
    const history = useHistory();

    const multipleValues = useRef<MultipleValues>({
        fileOne: false,
      });
      const onMediaChange = (fileChangeEvent: any) => {
        multipleValues.current.fileOne = fileChangeEvent.target.files[0];
      };
      const submitForm = async () => {
        if (
          !multipleValues.current.fileOne
        ) {
        setIserror(true);
        setMessage('Upload image first!');
        return false;
        }
    
        let formData = new FormData();
        formData.append(
          "media",
          multipleValues.current.fileOne,
          multipleValues.current.fileOne.name
        );
        setShowLoading(true);
       
        const user_id : any = localStorage.getItem('loggedInId');
        formData.append("user_id", user_id);
        formData.append("caption", caption);
        const api = axios.create({
            baseURL: Constent.BASE_URL,
          });
          api
            .post("/createpost", formData)
            .then((res : any) => {
                console.log(res.data);
              setShowLoading(false);
            history.push("/profile");
            setcaption('');
            })
            .catch((e) => {
              console.log(e);
              if (e.response && e.response.data && e.response.data.message) {
                setMessage(e.response.data.message);
              } else {
                setMessage("Auth failure!");
              }
              setIserror(true);
              setShowLoading(false);
            });
      };
  return (
    <>
      <SideNav />
      <IonPage id="main-content">
        <IonHeader no-border>
          <IonToolbar>
            <IonTitle>New Post</IonTitle>
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
            <div className='doctor-listing'>
              <IonGrid class="ion-no-padding">
            <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
            />
              <IonToast
                isOpen={issuccess}
                onDidDismiss={() => setSucess(false)}
                message={message}
                duration={200}
                color="dark"
              />
                <IonLoading
                  cssClass="custom-loading"
                  isOpen={showLoading}
                  onDidDismiss={() => setShowLoading(false)}
                  message={"Please wait..."}
                  spinner='circles'
                />
        <IonItem>
          <IonLabel position="floating">Caption</IonLabel>
            <IonTextarea placeholder="Enter text" value={caption} onIonChange={(e: any) => setcaption(e.target.value)} ></IonTextarea >
          </IonItem>
          <IonItem>
          <IonLabel position="floating">Media</IonLabel>
          <br />
          <br />
          <input type="file" ref={fileone} onChange={(ev) => onMediaChange(ev)}></input>
          </IonItem>
         
          <IonButton color="primary" expand="full" onClick={() => submitForm()}>
            Submit
          </IonButton>
              </IonGrid>
            </div>
          </section>
        </IonContent>
      </IonPage>
    </>
  );
};

export default NewPost;
