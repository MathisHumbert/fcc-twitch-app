import { useEffect } from 'react';
const channels = [];

function App() {
  const fetchData = async (channel) => {
    const response = await fetch(
      `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${channel}`
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchData('manuelferraratv');
  }, []);

  return (
    <main>
      <h1>twitch</h1>
    </main>
  );
}

export default App;
