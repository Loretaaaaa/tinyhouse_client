import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Layout, Typography, Spin } from "antd";
import { Viewer } from "../../lib/api/types";
import { useApolloClient, useMutation } from "@apollo/client";
import { ErrorBanner } from "../../lib/api/components";
import { AUTH_URL } from "../../lib/api/graphql/queries/AuthUrl";
import { LOG_IN } from "../../lib/api/graphql/mutations/LogIn";
import { displayErrorMessage, displaySuccessNotification } from "../../lib/api/utils";

const { Content } = Layout;
const { Text, Title } = Typography;

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: Props) => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [logIn, { data: logInData, loading: logInLoading, error: logInError }] = useMutation(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        displaySuccessNotification("You've successfully logged in!");
      }
    },

  });
  const logInRef = useRef(logIn);
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      logInRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query({
        query: AUTH_URL,
      });
      window.location.href = data.authUrl;
    } catch {
      displayErrorMessage("Sorry! We weren't able to log you in. Please try again later!");
    }
  };

  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    );
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    navigate(`/user/${viewerId}`);
  }

  const logInErrorBannerElement = logInError ? (
    <ErrorBanner message="Sorry! We weren't able to log you in. Please try again later!" />
  ) : null;

  return (
    <Content className="log-in">
      {logInErrorBannerElement}
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
        <button
          className="log-in-card__google-button"
          onClick={handleAuthorize}
        >
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
