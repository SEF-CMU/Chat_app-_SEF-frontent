import { Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
