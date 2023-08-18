import './Header.scss';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro.js';
import AppContext from '../../AppContext.js';

const Header = () => {
  const { api } = useContext(AppContext);

  return (
    <header>
      <div className="header header__container">
        <div className="header__item">
          <div className="header__logo">Croddis</div>
        </div>
        <div className="header__item">
          {api.token ? <ProfileBlock /> : <LoginButton />}
        </div>
      </div>
    </header>
  );
};

const ProfileBlock = () => {
  const { api } = useContext(AppContext);
  const { userData: user } = api;

  return (
    <>
      <Link to={'/me'}>
        <div className="header__profile">
          <div className="header__profile-photo">
            <img src={user?.avatar?.medium} alt="" />
          </div>
          <div className="header__username">{user?.username}</div>
        </div>
      </Link>

      <div className="header__logout" onClick={api.logout}>
        <FontAwesomeIcon icon={icon({ name: 'arrow-right-from-bracket' })} />
      </div>
    </>
  );
};

const LoginButton = () => {
  const { api } = useContext(AppContext);

  const redirect = async () => {
    const url = await api.getAuthUrl();

    window.open(url, '_self');
  };

  return (
    <button className="header__login" onClick={redirect}>
      <FontAwesomeIcon icon={icon({ name: 'steam-symbol', style: 'brands' })} />
      <div>
        Login
        <br />
        via Steam
      </div>
    </button>
  );
};

export default Header;
