import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Protein.css";
const Protein = () => {
  const [proteinData, setProteinData] = useState();
  const { proteinId } = useParams();
  const getProteinData = async () => {
    try {
      const response = await fetch(
        `https://rest.uniprot.org/uniprotkb/${proteinId}`
      );
      const data = await response.json();
      setProteinData(data.sequence.value);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    getProteinData();
  }, [proteinId]);
  return <div className="protein-details">{proteinData}</div>;
};

export default Protein;
