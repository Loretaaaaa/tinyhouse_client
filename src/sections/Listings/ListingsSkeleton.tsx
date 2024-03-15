import { Alert, Divider, Skeleton } from "antd";

interface Props {
  title: string;
  error?: boolean;
}

export const ListingsSkeleton = ({ title, error = false }: Props) => {
  const errorAlert = error ? <Alert type="error" message="Uh, uh, something went wrong. Please try again later" /> : null;

  return (
    <>
      {errorAlert}
      <h2>{title}</h2>
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
    </>
  )
}
