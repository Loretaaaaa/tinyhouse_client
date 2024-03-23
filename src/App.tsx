import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Host,
  Listing,
  Listings,
  Login,
  NotFound,
  User,
  AppHeader
} from "./sections";
import { Layout } from "antd";
import { Viewer } from "./lib/api/types";
import { useState } from "react";

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};


function App() {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  return (
    <BrowserRouter>
      <Layout id="app" style={{ position: "relative" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/listings/:location?" element={<Listings />} />
          <Route path="/login" element={<Login setViewer={setViewer} />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
