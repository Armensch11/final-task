import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicItem from "../publications/publicItem/PublicItem";
import { v4 as uuidv4 } from "uuid";
import { UNIPROT_URL } from "../../../utils/uniprotURL/uniprotURL";
import "./Publics.css";
type Link = {
  database: string;
  id: string;
};
interface PublicationResponse {
  results: PublicationInfo[];
}
interface Reference {
  referencePositions: string[];
  sourceCategories: string[];
  source: { name: string };
}

interface PublicationInfo {
  citation: {
    authors: string[];
    citationCrossReferences: Link[];
    title: string;
    journal: string;
    volume: string;
    firstPage: string;
    lastPage: string;
    publicationDate: string;
  };
  references: Reference[];
}

const Publics: React.FC = (): JSX.Element => {
  const { proteinId: entry } = useParams();
  const [publicationsInfo, setPublicationsInfo] =
    useState<PublicationResponse>();

  const getPublics = async (): Promise<void> => {
    try {
      const result = await fetch(`${UNIPROT_URL.BASE}${entry}/publications`);
      const publicsData: PublicationResponse = await result.json();

      setPublicationsInfo(publicsData);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  useEffect(() => {
    getPublics();
  }, []);

  return (
    <>
      <div>
        {publicationsInfo &&
          publicationsInfo.results.map((publication) => (
            <PublicItem
              key={uuidv4()}
              title={publication.citation.title}
              authors={publication.citation.authors}
              categories={publication.references[0].sourceCategories}
              citied={publication.references[0].referencePositions}
              source={publication.references[0].source.name}
              links={publication.citation.citationCrossReferences}
              link3Title={`${
                publication.citation.journal ? publication.citation.journal : ""
              } ${
                publication.citation.volume ? publication.citation.volume : ""
              }:${
                publication.citation.firstPage
                  ? publication.citation.firstPage
                  : ""
              }-${
                publication.citation.lastPage
                  ? publication.citation.lastPage
                  : ""
              } (${
                publication.citation.publicationDate
                  ? publication.citation.publicationDate
                  : ""
              })`}
            />
          ))}
      </div>
    </>
  );
};

export default Publics;
