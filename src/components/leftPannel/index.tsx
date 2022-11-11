import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  Typography
} from '@mui/material';
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { clearLocalStorage } from '../../utils/commonHelpers';
import { LEFT_PANNEL_ITEMS, LEFT_PANNEL_TEXT } from '../../utils/constants';
import Popup from '../elements/popup';
import styles from './styles';

const LeftPannel = () => {
  const { pathname } = useLocation();
  const [logout, setLogout] = React.useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <>
      <List style={styles.list}>
        {LEFT_PANNEL_ITEMS.map(({ id, url, Icon, ActiveIcon, text }) => (
          <ListItem
            key={id}
            style={{
              ...(text === LEFT_PANNEL_TEXT.SETTINGS
                ? { ...styles.settings }
                : {}),
              ...(url && pathname.includes(url) && !logout
                ? { ...styles.active, ...styles.list_item }
                : { ...styles.list_item })
            }}
          >
            {Icon ? (
              <NavLink
                id={id.toString()}
                key={id}
                to={url || ''}
                style={styles.nav_link}
              >
                <ListItemIcon>
                  {url && pathname.includes(url) ? (
                    <img
                      alt=""
                      src={ActiveIcon}
                      data-testid={`${text} active_icon`}
                      style={styles.image}
                    />
                  ) : (
                    <img
                      alt=""
                      src={Icon}
                      data-testid={`${text}`}
                      style={styles.image}
                    />
                  )}
                  <Typography
                    component="div"
                    style={
                      url && pathname.includes(url) && !logout
                        ? { ...styles.text, ...styles.active_text }
                        : { ...styles.text }
                    }
                  >
                    {text}
                  </Typography>
                </ListItemIcon>
              </NavLink>
            ) : null}
          </ListItem>
        ))}

        <ListItem
          key="logout"
          style={
            logout
              ? {
                  ...styles.active,
                  ...styles.list_item,
                  ...styles.logout_list_item
                }
              : { ...styles.list_item, ...styles.logout_list_item }
          }
        >
          <ListItemIcon>
            <img
              alt=""
              src="/images/logout.png"
              data-testid="logout-item"
              style={styles.image}
            />
            <Typography
              component="div"
              style={
                logout
                  ? { ...styles.text, ...styles.active_text }
                  : { ...styles.text }
              }
              onClick={() => setLogout(true)}
            >
              {LEFT_PANNEL_TEXT.LOGOUT}
            </Typography>
          </ListItemIcon>
        </ListItem>
      </List>

      <Popup
        id="logout"
        open={logout}
        title="Log Out"
        textAlign="left"
        handleClose={() => null}
        description={
          <>Are you sure you want to sign out from the Admin Portal?</>
        }
      >
        <>
          <Button
            id="cancel"
            onClick={() => setLogout(false)}
            style={styles.cancel}
          >
            Cancel
          </Button>
          <Button
            id="logout-button"
            data-testid="logout-button"
            variant="contained"
            color="secondary"
            style={styles.logout}
            onClick={() => {
              clearLocalStorage();
              setLogout(false);
              navigate('/');
            }}
          >
            Logout
          </Button>
        </>
      </Popup>
    </>
  );
};
export default LeftPannel;
