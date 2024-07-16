import React, { useContext } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { DataContext } from '../../context/dataContext/DataContext';

export default function Track() {
  const { tracks } = useContext(DataContext);
  const { cid } = useParams();

  const ctracks = tracks.filter((track) => track.course === cid);

  return (
    <>
      <h1>Track</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <ul>
              {ctracks.length > 0 ? (
                ctracks.map((track, index) => (
                  <li className="list-unstyled p-2 my-1" key={track.id}>
                    <Link className="navbar-brand" to={`step/${track.id}`}>
                      <button className="btn btn-outline-success">step{index + 1}</button>
                    </Link>
                  </li>
                ))
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          </div>
          <div className="col-lg-10">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}