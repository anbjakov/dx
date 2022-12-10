import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import Title from "./Title";
import Images from "./Images";
import axios from "../helpers/axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios.get(`/list?page=${page}&limit=10`).then((pageImagesArray) => {
      setImages([...images, ...pageImagesArray]);
    });
    setLoading(false);
  }, [page]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="container text-center">
      <Title>IMAGE GALLERY</Title>
      <div className="row">
        <Images images={images} />
      </div>
      <Button onClick={handleShowMore}>Show more</Button>
    </div>
  );
};
export default Gallery;
