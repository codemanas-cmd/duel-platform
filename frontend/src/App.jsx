import ChatPage from "./components/chat-page";
import Dashboard from "./components/dashboard";
import SocketWrapper from "./context/socketWrapper";
import UserWrapper from "./context/userrWrapper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  console.log("hel0l");
  return (
    <>
<Router> {/* Wrap with Router */}
      <UserWrapper>
        <SocketWrapper>

          <Routes> {/* Use Routes to wrap Route components */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat-page" element={<ChatPage />} />
          </Routes>
        </SocketWrapper>
      </UserWrapper>
    </Router>
    </>
    
  );
}

export default App;
