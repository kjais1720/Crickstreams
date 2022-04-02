import "./App.css";
import { Header, Footer } from "components";
import { AllRoutes } from "./AllRoutes";
import { useAuth } from "contexts";
import { Toast } from "components";
import { AuthModal } from "pages"
function App() {
  const { showAuthModal } = useAuth();
  return (
    <div className="App bg-primary">
      <Header />
      <AllRoutes />
      <Footer />
      <Toast />
      {showAuthModal ? <AuthModal /> : " "}
    </div>
  );
}

export default App;
