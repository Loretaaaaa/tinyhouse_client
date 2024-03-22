import { Card, Layout, Typography } from "antd";

const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = () => {
  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              Log in to TinyHouse!
            </span>
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button className="log-in-card__google-button">
          <img
            alt="Google-logo"
            className="log-in-card__google-button-logo"
            src="https://d2uusema5elisf.cloudfront.net/courses/tinyhouse-react-masterclass-part-2/module_4/lesson_4.6/public/assets/google_logo.jpg"
          />
          <span className="log-in-card__google-button-text">
            Sign in with Google
          </span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form
          to sign in with your Google account.
        </Text>
      </Card>
    </Content>
  );
};
