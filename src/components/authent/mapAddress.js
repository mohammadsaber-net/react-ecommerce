import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import { useDispatch, useSelector } from "react-redux";
import { sendingOrder } from "../../redux-tool/confirmOrder";

function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}
function MapAddressPicker(props) {
  const [position, setPosition] = useState(null);
  const [fetchedAddress, setFetchedAddress] = useState(null);
  useEffect(() => {
    if (position) {
      const fetchAddress = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
          );
          const data = await response.json();
          setFetchedAddress(data.display_name);
        } catch (error) {
          console.error("حدث خطأ أثناء جلب العنوان:", error);
          setFetchedAddress("an error while getting address");
        }
      };

      fetchAddress();
    }
  }, [position]);
  const cash=useSelector(state=>state.sendingOrder)
  console.log(cash)
  const dispatch=useDispatch()
  const userInfo=useSelector((state) => state.checkAuth.data)
  const handleConfirm = () => {
    const locationData = {
      coords: position,
      addressText: fetchedAddress
    };
    const items=JSON.parse(localStorage.getItem("order"))
    let typeOfPayment="cash"
    if(props.visa==="visa")typeOfPayment="visa"
    const orderInfo={
      name:userInfo.name,
      email:userInfo.email,
      phone:userInfo.phone,
      typeOfPayment:typeOfPayment,
      items:items,
      address:locationData
    }
    dispatch(sendingOrder(orderInfo))
  };

  return (
    <div className="map-address-picker">
      <h5>set your address on map : </h5>

      <MapContainer
        center={[30.0444, 31.2357]}
        zoom={13}
        style={{ height: "250px", width: "100%", marginBottom: "10px" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Marker position={position} />}
        <LocationMarker setPosition={setPosition} />
      </MapContainer>
      {fetchedAddress && (
        <div className="alert alert-info p-2">
          <strong>📍  chosen address :</strong><br />
          {fetchedAddress}
        </div>
      )}
      <button
        className={`btn btn-success ${cash.data?.status==="SUCCESS"&&"d-none"}`}
        onClick={handleConfirm}
        disabled={!position}
      >
      {cash.loading || props.loading?<div className="d-flex align-items-center gap-2">Loading...<span className="Submit-loading"></span></div>:"confirm"}
      </button>
    </div>
  );
}

export default MapAddressPicker;
