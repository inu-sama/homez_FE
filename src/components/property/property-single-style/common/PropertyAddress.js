import React from "react";

const PropertyAddress = ({ address, location }) => {
  return (
    <>
      <div className={`col-md-8`}>
        <div className="d-flex justify-content-between">
          <div className="pd-list">
            <p className="fw600 mb10 ff-heading dark-color">Địa chỉ</p>
            <p className="fw600 mb10 ff-heading dark-color">Vị trí</p>
            <p className="fw600 mb-0 ff-heading dark-color">Quốc gia</p>
          </div>
          <div className="pd-list">
            <p className="text mb10">{address}</p>
            <p className="text mb10">{location}</p>
            <p className="text mb-0">Việt Nam</p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <iframe
          className="position-relative bdrs12"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${address}&output=embed`}
          title={address}
          aria-label={address}
        />
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
