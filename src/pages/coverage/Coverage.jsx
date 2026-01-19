import React, { useRef } from 'react'
import { useLoaderData } from 'react-router'
import { MapContainer ,TileLayer,Marker,Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const position = [23.8, 90.4]
function Coverage() {
  const mafRef =  useRef(null)
  const wareHouses = useLoaderData();
  

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.search.value;
    const district = wareHouses.find(c => c.district.toLowerCase().includes(location.toLowerCase()));
    if (district) {
      const coord = [district.latitude, district.longitude];
      mafRef.current.flyTo(coord,12)
    }

  };
  return (
    <div className="my-10">
      <div className="text-center space-y-5 p-5">
        <h1 className="text-4xl font-bold mt-5">We are available in 64 districts</h1>
        <div>
         <form className="join" onSubmit={handleSearch}>
         <input className="input join-item rounded-l-full" placeholder="Search district" name="search"/>
          <button type="submit" className="btn join-item rounded-r-full bg-primary text-white">Search</button>
        </form>
        </div>
      </div>

      <div className="w-full min-h-[500px]  border border-gray-400 rounded-3xl">
        <MapContainer
          ref={mafRef}
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="w-full min-h-[500px] rounded-3xl">
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            wareHouses.map(center => (
              
              <Marker key={center.district} position={[center.latitude,center.longitude]}>
                <Popup>
                  {center.district} <br /> Covered Area : {center.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))
          }
  </MapContainer>
      </div>
    </div>
  )
}

export default Coverage