import { useParams } from "react-router-dom";

const Feature = () => {
  const { proteinId } = useParams();
  return (
    <>
      <div>{`features for ${proteinId}`}</div>
    </>
  );
};

export default Feature;
