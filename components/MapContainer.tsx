interface MapContainerProps {
  mapLink: string;
}

function MapContainer({ mapLink }: MapContainerProps) {
  return (
    <iframe
      className="w-full h-72 rounded-lg shadow-lg object-cover"
      src={mapLink}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}

export default MapContainer;
