import { useState } from "react";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div>
      {token ? (
        <AdminDashboard setToken={setToken} />
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
}

export default App;
