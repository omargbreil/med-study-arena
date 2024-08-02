import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/dataContext/DataContext'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/user/userContext';

export default function CourseAdmin() {
    const { courses, tracks } = useContext(DataContext);
    const [ctrack, setCtracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [course, setcourse] = useState(null);
    let { id } = useParams();
    let { token } = useContext(UserContext);
    const [deleted, setdeleted] = useState(false)


    async function deleteTrack(tid) {


        setdeleted(false)


        try {
            const response = await axios.delete(`${process.env.REACT_APP_prourl}/arena/v1/track/delete/${tid}`, {
                headers: {
                    'token': token,
                },
            });
            if (response.data.message === "done") {

                setdeleted(true)

            }
        } catch (err) {

            console.log(err);
        }

    }

    if (deleted) {
        console.log("deleted");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await courses.find((t) => t.id === id);
                setcourse(result);

                const trackResult = await tracks.filter((track) => track.course === id);
                setCtracks(trackResult);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [courses, id, tracks]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    {course && (
                        <div key={course.id} className="col-sm-4">
                            <div className="card" style={{ width: '18rem' }}>
                                <img src={course.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{course.name}</h5>
                                    <p className="card-text">{course.discription}</p>
                                    <Link to={`/updatecourse/${course.id}`} className="btn btn-primary">
                                        update
                                    </Link>
                                    <Link to={`/addstep/${course.id}`} className="m-2 btn btn-outline-success">
                                        Add Step
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {ctrack.map((track, index) => (
                    <div className="p-3 my-5 alert alert-primary d-flex justify-content-between" role="alert" key={index}>
                        <h3>Step {index + 1}</h3>
                        <div className="p-2">
                            <Link className='btn btn-primary mx-1' to={`/stepadmin/${track.id}`}>
                                view details
                            </Link>
                            <button onClick={() => deleteTrack(track.id)} className='btn btn-danger'>Delete track</button>

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}