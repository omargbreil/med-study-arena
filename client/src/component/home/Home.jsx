import './style.css'

export default function Home() {
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url('https://www.shutterstock.com/image-vector/online-education-hand-drawn-seamless-260nw-1777262141.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '80vh',
        }}
      >
        <h1 className="display-1 text-white">Home Page</h1>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Card 1</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, beatae.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Card 2</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Card 3</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nostrum et tempore in pariatur architecto.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-5">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="content text-center">
              <div className="icons mb-3">
                <i className="fas fa-user fa-3x"></i>
              </div>
              <h2></h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, quibusdam? Non necessitatibus ea expedita soluta eum.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="content text-center">
              <div className="icons mb-3">
                <i className="fas fa-code fa-3x"></i>
              </div>
              <h2></h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, quibusdam? Non necessitatibus ea expedita soluta eum.</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="content text-center">
              <div className="icons mb-3">
                <i className="fas fa-chart-line fa-3x"></i>
              </div>
              <h2></h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, quibusdam? Non necessitatibus ea expedita soluta eum.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}