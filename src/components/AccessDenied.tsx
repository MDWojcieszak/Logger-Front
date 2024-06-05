import { mkUseStyles, useTheme } from '~/utils/theme';
import { ImBlocked } from 'react-icons/im';

export const AccessDenied = () => {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <div style={styles.contaner}>
      <ImBlocked size={60} color={theme.colors.red} />
      <p style={styles.message}>You do not have access to this page!</p>
      <p>Ask your system administrator for access.</p>
    </div>
  );
};

const useStyles = mkUseStyles((t) => ({
  contaner: {
    alignSelf: 'center',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    gap: t.spacing.m,
  },
  message: {
    fontSize: 20,
    color: t.colors.red,
  },
}));
