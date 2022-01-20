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

  const handleClick = (e) => {
    setType(e.target.textContent);
  };

  useEffect(() => {
    setAllChannels([]);
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
            <button onClick={handleClick}>all</button>
            <button onClick={handleClick}>online</button>
            <button onClick={handleClick}>offline</button>
          </div>
        </article>
        <article className='bottom'>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              {allChannels.map((item, index) => {
                const self = item._links.self.split('/')[5];
                if (type === 'online' && !item.stream) {
                  return '';
                }
                if (type === 'offline' && item.stream) {
                  return '';
                }
                return (
                  <div
                    className={!item.stream ? 'offline' : 'online'}
                    key={index}
                  >
                    <h3>{self}</h3>
                    <p>{item.stream ? item.stream.game : 'offline'}</p>
                    <a href={`https://www.twitch.tv/${self}`}>
                      check this channel
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}

export default App;
