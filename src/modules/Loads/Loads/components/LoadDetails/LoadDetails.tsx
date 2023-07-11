import { useParams } from 'react-router-dom';

export const LoadDetails = () => {
  const { loadId } = useParams();
  console.log(loadId);
  return <div></div>;
};
