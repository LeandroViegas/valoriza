import { BrowserRouter, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import { AuthRedirect } from "./utils/AuthRedirect";

// pages
import { Sent } from "./pages/compliments/Sent";
import { Received } from "./pages/compliments/Received";
import { Home } from "./pages/Home";
import { Tags } from "./pages/admin/Tags";
import { Users } from "./pages/admin/Usuarios";

// css
import "./styles/global.css";
import "./styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />

        <AuthRedirect to="/">
          <Route path="/elogios/enviados" exact component={Sent} />
          <Route path="/elogios/recebidos" exact component={Received} />
        </AuthRedirect>
        
        <AuthRedirect admin={true} to="/">
          <Route path="/admin/tags" exact component={Tags} />
          <Route path="/admin/usuarios" exact component={Users} />
        </AuthRedirect>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
