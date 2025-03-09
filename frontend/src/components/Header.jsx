import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/authProvider.jsx';
import routes from '../routes.js';

const HeaderComponent = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const loggedIn = auth.user !== null;

  return (
    <nav className="shadow-sm navbar-light bg-white navbar nav nav-pills">
      <div className="nav-item ms-4">
        <a className="navbar-brand" href={routes.chat()}>{t('header.title')}</a>
      </div>
      <div className="nav-item me-4">
        {loggedIn
          ? <Button className="btn-danger" onClick={auth.logOut}>{t('header.exit')}</Button>
          : null}
      </div>
    </nav>
  );
};

export default HeaderComponent;
