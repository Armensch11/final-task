import { useParams } from "react-router-dom";
import ProtvistaUniprot from "protvista-uniprot";
import "./Feature.css";
window.customElements.define("protvista-uniprot", ProtvistaUniprot);
const Feature = () => {
  const { proteinId } = useParams();

  return (
    <>
      <div className="protvista-container">
        <protvista-uniprot accession={proteinId} />
      </div>
    </>
  );
};

export default Feature;
