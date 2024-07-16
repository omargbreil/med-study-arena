import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import { DataContext } from '../../context/dataContext/DataContext';
import ReactPlayer from 'react-player';

export default function StepAdmin() {
  const { tracks } = useContext(DataContext);
  const { id } = useParams();

  const track = tracks.find((t) => t.id === id);

  return (
    <>
      {track ? (
        <div className="container my-5">

          <div className="row justify-content-center">
            <Link to={`/updatestep/${track.id}`}  className="btn btn-primary">
              Update
          
            </Link>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 mb-4">
              <ReactPlayer
                url={track.video}
                controls
                className="rounded-5 bg-black w-100"
              />
            </div>
            <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
              <div className="text-center mb-4">
                <img src={track.image} className="w-75" alt="" />
              </div>
              <h1 className="text-center mb-4">{track.text}</h1>
              <div className="text-center">
              </div>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-12 col-md-8 m-auto">
              <iframe
                title={track.id}
                className="w-100"
                src={track.pdf}
                style={{ height: '60vh' }}
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <div className="container my-5">
          <div className="row">
            <div className="col-8 m-auto text-center">
              <p>No track data available.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}