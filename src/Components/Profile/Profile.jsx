import './Profile.scss';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro.js';
import AppContext from '../../AppContext.js';
import Header from '../Header/Header.jsx';

const ProfileContext = createContext({});

const Profile = ({ self = false }) => {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState(profile);
  const [isValidationError, setIsValidationError] = useState(false);

  const navigate = useNavigate();
  const { steamid } = useParams();

  const { api } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const thisUser = await api.getUserData();
      const data = self
        ? await api.getUserData()
        : await api.getUserData(steamid);
      if (!data?.username) navigate('/');
      if (thisUser && thisUser.id === data.id) navigate('/me');
      setProfile(data);
      setFormData(data);
    })();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        self,
        formData,
        setFormData,
        isValidationError,
        setIsValidationError,
      }}
    >
      <Header />
      <div className="profile">
        <div className="profile__container">
          <AboutBlock />
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

const AboutBlock = () => {
  const { api } = useContext(AppContext);
  const { profile, self, formData, isValidationError } =
    useContext(ProfileContext);

  const onSaveClick = async () => {
    await api.updateUser(profile._id, formData);
  };

  return (
    <>
      <div className="profile__block">
        <div className="profile__photo">
          <img src={profile?.avatar?.large} alt="" />
        </div>
        <div className="profile__text">
          <span className="profile__text_big">
            {profile?.username}
            <a
              href={`https://steamcommunity.com/id/${profile.username}/`}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={icon({ name: 'steam', style: 'brands' })}
              />
            </a>
            {profile.twitchUrl && !self ? (
              <a href={profile.twitchUrl} target="_blank" rel="noreferrer">
                <FontAwesomeIcon
                  icon={icon({ name: 'twitch', style: 'brands' })}
                />
              </a>
            ) : (
              ''
            )}
            {profile.youtubeUrl && !self ? (
              <a href={profile.youtubeUrl} target="_blank" rel="noreferrer">
                <FontAwesomeIcon
                  icon={icon({ name: 'youtube', style: 'brands' })}
                />
              </a>
            ) : (
              ''
            )}
          </span>
          <span>
            С нами с{' '}
            <span className="profile__text_highlighted">
              {new Date(profile?.createdAt).toLocaleDateString('ru')}
            </span>
          </span>
        </div>
        {self ? (
          <button
            disabled={isValidationError}
            className="profile__button"
            onClick={onSaveClick}
          >
            Сохранить
          </button>
        ) : (
          ''
        )}
      </div>
      {self ? <EditableBlock /> : ''}
    </>
  );
};

const EditableBlock = () => {
  const { formData, setFormData, setIsValidationError } =
    useContext(ProfileContext);

  const onTwitchChange = (e) => {
    if (
      e.target.value !== '' &&
      !e.target.value.trim().match(/^https:\/\/(www.)?twitch.tv\/?/g)
    ) {
      setIsValidationError(true);
      e.target.dataset.invalid = true;
    } else {
      setIsValidationError(false);
      e.target.dataset.invalid = false;
    }

    setFormData({ ...formData, twitchUrl: e.target.value.trim() });
  };

  const onYoutubeChange = (e) => {
    if (
      e.target.value !== '' &&
      !e.target.value.trim().match(/^https:\/\/(www.)?youtube.com\/?/g)
    ) {
      setIsValidationError(true);
      e.target.dataset.invalid = true;
    } else {
      setIsValidationError(false);
      e.target.dataset.invalid = false;
    }

    setFormData({ ...formData, youtubeUrl: e.target.value.trim() });
  };

  return (
    <>
      <div className="profile__block">
        <div className="profile__text profile__text_big">Ссылки:</div>
      </div>
      <div className="profile__block">
        <div className="profile__text">Twitch</div>
        <input
          className="profile__input-text"
          type="text"
          onChange={onTwitchChange}
          value={formData.twitchUrl}
        />
      </div>
      <div className="profile__block">
        <div className="profile__text">Youtube</div>
        <input
          className="profile__input-text"
          type="text"
          onChange={onYoutubeChange}
          value={formData.youtubeUrl}
        />
      </div>
    </>
  );
};

export default Profile;
