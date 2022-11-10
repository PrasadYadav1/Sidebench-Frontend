import { List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { LEFT_PANNEL_ITEMS, LEFT_PANNEL_TEXT } from '../../utils/constants';
import styles from './styles';

const LeftPannel = () => {
  const { pathname } = useLocation();
  return (
    <List style={styles.list}>
      {LEFT_PANNEL_ITEMS.map(({ id, url, Icon, ActiveIcon, text }) => (
        <ListItem
          key={id}
          style={{
            ...(text === LEFT_PANNEL_TEXT.SETTINGS
              ? { ...styles.settings }
              : {}),
            ...(url && pathname.includes(url)
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
                    url && pathname.includes(url)
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

      <ListItem key="logout" style={styles.list_item}>
        <ListItemIcon>
          <img
            alt=""
            src="/images/logout.png"
            data-testid="logout"
            style={styles.image}
          />
          <Typography component="div" style={styles.text}>
            Logout
          </Typography>
        </ListItemIcon>
      </ListItem>
    </List>
  );
};
export default LeftPannel;
