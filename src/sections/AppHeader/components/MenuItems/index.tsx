import { Button, Menu } from "antd";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Viewer } from "../../../../lib/api/types";
import { LOG_OUT } from "../../../../lib/api/graphql/mutations";
import {
  displaySuccessNotification,
  displayErrorMessage,
} from "../../../../lib/api/utils";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { SubMenu } = Menu;

export const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to log you out. Please try again later!"
      );
    },
  });

  const handleLogOut = () => {
    logOut();
  };
  const SubMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Menu.Item key="/user" icon={<UserOutlined />}>
          <Link to={`/user/${viewer.id}`}>Profile</Link>
        </Menu.Item>
        <Menu.Item key="/logout" icon={<LogoutOutlined />}>
          <div onClick={handleLogOut}>Log out</div>
        </Menu.Item>
      </SubMenu>
    ) : (
      <Menu.Item key="/login">
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Menu.Item>
    );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Menu.Item key="/host" icon={<HomeOutlined />}>
        <Link to="/host">Host</Link>
      </Menu.Item>
      {SubMenuLogin}
    </Menu>
  );
};
