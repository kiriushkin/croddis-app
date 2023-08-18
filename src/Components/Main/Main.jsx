import './Main.scss';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro.js';
import AppContext from '../../AppContext.js';
import Header from '../Header/Header.jsx';
import { Link } from 'react-router-dom';

const Main = () => {
  const { api } = useContext(AppContext);

  useEffect(() => {
    api.getUserData();
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="main__container">
          <Top />
        </div>
      </main>
    </>
  );
};

const Top = () => {
  const { api } = useContext(AppContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const newUsers = await api.getAllUsers();

      setUsers(newUsers);
    })();
  }, []);

  return (
    <div className="top">
      <h2 className="text_big">Топ-2 Челов</h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {users.map((user) => {
          return (
            <Link to={`/user/${user.steamid}`} target="_blank">
              <div className="card">
                <div className="card-img">
                  <img src={user?.avatar.medium} alt="" />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div className="text">{user?.username}</div>
                  <div
                    className="text"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <a
                      href={`https://steamcommunity.com/profiles/${user?.steamid}/`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={icon({ name: 'steam', style: 'brands' })}
                      />
                    </a>
                    {user?.twitchUrl ? (
                      <a href={user.twitchUrl} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon
                          icon={icon({ name: 'twitch', style: 'brands' })}
                        />
                      </a>
                    ) : (
                      ''
                    )}

                    {user?.youtubeUrl ? (
                      <a
                        href={user.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon
                          icon={icon({ name: 'youtube', style: 'brands' })}
                        />
                      </a>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
