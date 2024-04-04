import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.thingspeak.com/channels/2497104/feeds.json?results=1&api_key=JKXFVZRJ6SVQI6A0'
        );

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data immediately when component mounts

    // Setup interval to fetch data every 15 seconds
    const interval = setInterval(fetchData, 15000);

    // Cleanup function to clear interval when component unmounts or changes
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { channel, feeds } = data;

  return (
    <div className="text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">{channel.name}</h1>
        <div>
          {feeds.map(feed => (
            <div key={feed.entry_id} className="bg-gray-800 p-4 rounded-lg mb-4">
              <h2 className="text-lg font-semibold mb-2">Entry ID: {feed.entry_id}</h2>
              <p><span className="font-semibold">Temperature:</span> {feed.field1} °C</p>
              <p><span className="font-semibold">Humidity:</span> {feed.field2}%</p>
              <p><span className="font-semibold">Light:</span> {feed.field3}</p>
              <p><span className="font-semibold">Gas:</span> {feed.field4 === "1" ? "No" : "Yes"}</p>
              <p><span className="font-semibold">Created At:</span> {feed.created_at}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
