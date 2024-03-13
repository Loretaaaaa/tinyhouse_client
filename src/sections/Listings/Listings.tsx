import { server } from "../../lib/api/server";

const LISTINGS = `
query Listings {
  listings {
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
  }
}`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch({ query: LISTINGS });
    console.log(data);
  };

  return (
    <>
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
    </>
  );
};

// export const Listings2: FunctionComponent<Props> = ({title, children}) => {
//   return <h2>{title}</h2>
// }
