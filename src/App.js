import { useEffect, useState } from 'react';
let channels = [
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
];

function App() {
  const [allChannels, setAllChannels] = useState([]);
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchData = async (channel) => {
    const response = await fetch(
      `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${channel}`
    );
    const data = await response.json();
    setAllChannels((all) => {
      let arr = [...all, data];
      return arr;
    });
  };

  useEffect(() => {
    channels.forEach((channel) => {
      fetchData(channel);
    });
    setLoading(false);
  }, []);

  return (
    <main>
      <header>
        <h1>Free Code Camp</h1>
        <h1>Twitch JSON API</h1>
      </header>
      <section>
        <article className='top'>
          <h2>STREAMERS</h2>
          <div className='btn-container'>
            <button>all</button>
            <button>online</button>
            <button>offline</button>
          </div>
        </article>
        <article className='bottom'>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              {allChannels.map((item) => {
                console.log(item);
                return <h1>hello</h1>;
              })}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}

export default App;
