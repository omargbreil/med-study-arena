import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../../context/dataContext/DataContext';
import ReactPlayer from 'react-player/lazy';

export default function Step() {
  const { tracks } = useContext(DataContext);
  const { tid } = useParams();

  const track = tracks.find((t) => t.id === tid);

  return (
    <>
      {track ? (
        <div className="container">
          <div className="row m-2 p-2">
            <div className="col-8 m-auto text-center w-100">
              <ReactPlayer
                url={track.video}
                controls
                className="rounded-5 bg-black w-100"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-4 text-center">
              <img src={track.image} className="w-100" alt="" />
            </div>
            <div className="col-4 text-center">
              <h1>{track.text}</h1>
            </div>
            <div className="col-4 text-center">
              <iframe
                title={track.id}
                className="w-100"
                src={track.pdf}
                width="100%"
                height="500px"
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row m-2 p-2">
            <div className="col-8 m-auto text-center w-100">
              <p>No track data available.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}