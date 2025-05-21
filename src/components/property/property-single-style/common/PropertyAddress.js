import React from "react";

const PropertyAddress = ({ address, location }) => {
  return (
    <>
      {/* <div className={`col-md-6`}>
        <div className="d-flex justify-content-between">
          <div className="pd-list">
            <p className="fw600 mb10 ff-heading dark-color">Địa chỉ</p>
            <p className="fw600 mb10 ff-heading dark-color">Vị trí</p>
          </div>
          <div className="pd-list">
            <p className="text mb10">{address}</p>
            <p className="text mb10">{location}</p>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className={`col-md-6`}>
          <div className="d-flex justify-content-between">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">Địa chỉ</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{address}</p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">Vị trí</p>
            </div>
            <div className="pd-list">
              <p className="text mb10">{location}</p>
            </div>
          </div>
        </div>
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
