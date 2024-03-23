import { Layout } from "antd";
import { Link } from "react-router-dom";
import { MenuItems } from "./components";
import { Viewer } from "../../lib/api/types";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;

export const AppHeader = ({ viewer, setViewer }: Props) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img
              src="https://d2uusema5elisf.cloudfront.net/courses/tinyhouse-react-masterclass-part-2/module_4/lesson_4.8/public/assets/tinyhouse-logo.png"
              alt="App logo"
            />
          </Link>
        </div>
      </div>
      <div className="app-header_menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  );
};
