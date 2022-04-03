import { useState } from "react";
import { FormComponent } from "./components/FormComponent";
import { useAuth } from "contexts";
import styles from "./auth.module.css"
export function AuthModal() {
  const {setShowAuthModal} = useAuth();
  const [activeForm, setActiveForm] = useState("login");
  const overlayClickHandler=()=> setShowAuthModal(false); // To close the modal if user clicks outside the form
  const formClickHandler = (e) => e.stopPropagation();
  return (
    <main onClick={overlayClickHandler} className={`${styles.authContainer} d-flex justify-c-center`}>
      <div onClick={formClickHandler} className={`${styles.authFormContainer} form-body flex-col align-i-center pd-sm radius-sm`}>
        <div className={` d-flex justify-c-center w-100`}>
          <button
            onClick={() => setActiveForm("login")}
            className={`tr-btn ${styles.formToggleButtons} ${
              activeForm === "login" ? "tr-btn-primary" : "tr-btn-outline-primary"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveForm("signup")}
            className={`tr-btn ${styles.formToggleButtons} ${
              activeForm === "signup" ? "tr-btn-primary" : "tr-btn-outline-primary"
            }`}
          >
            Sign-Up
          </button>
        </div>
        {<FormComponent styles={styles} formType={activeForm} />}
      </div>
    </main>
  );
}
