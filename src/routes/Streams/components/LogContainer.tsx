import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { LogType } from '~/routes/Streams/hooks/useLogStream';
import { mkUseStyles, useTheme } from '~/utils/theme';
import { motion } from 'framer-motion';
import { FaRegCircleDot } from 'react-icons/fa6';

type LogProps = LogType & { disabled?: boolean; showDisabled?: boolean };

export const LogContainer = ({ timestamp, scope, color, disabled = false, ...p }: LogProps) => {
  const styles = useStyles();
  const theme = useTheme();
  const [marker, setMarker] = useState(false);
  const fontColor = useMemo(() => {
    switch (p.level) {
      case 'debug':
        return 'gray';
      case 'info':
        return theme.colors.white;
      case 'warn':
        return theme.colors.yellow;
      case 'error':
        return theme.colors.red;
      case 'success':
        return theme.colors.lightGreen;
      default:
        return theme.colors.blue;
    }
  }, []);

  const renderMessage = (message: any[] | undefined) => {
    return (
      <>
        {message &&
          message.map((m) => {
            return typeof m === 'object' ? (
              <pre
                style={{
                  ...styles.text,
                  color: fontColor,
                }}
              >
                {JSON.stringify(m, null, 1)}
              </pre>
            ) : (
              <p
                style={{
                  ...styles.text,
                  color: fontColor,
                }}
              >
                {m}&nbsp;
              </p>
            );
          })}
      </>
    );
  };
  return (
    <motion.div
      onClick={() => !marker && setMarker(true)}
      style={styles.container}
      initial={{ borderColor: '#00000000' }}
      animate={{
        opacity: disabled ? 0.05 : 1,
        borderColor: marker ? theme.colors.red : theme.colors.red + theme.colorOpacity(0),
      }}
      whileHover={{ backgroundColor: theme.colors.dark01, transition: { duration: 0.2 } }}
    >
      <motion.div
        style={styles.marker}
        initial={{ opacity: 0 }}
        onClick={() => setMarker(false)}
        animate={{ opacity: marker ? 1 : 0 }}
      >
        <FaRegCircleDot
          size={18}
          color={theme.colors.red}
          style={{ backgroundColor: theme.colors.dark01, borderRadius: '50%' }}
        />
      </motion.div>

      <div style={{ color: fontColor, opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>
        {format(new Date(timestamp), 'HH:mm:ss : SSS')}
      </div>
      <div style={{ ...styles.scopeContainer, backgroundColor: color }}>{scope}</div>
      <div style={{ ...styles.levelContainer, color: fontColor }}>{p.level?.toUpperCase()}</div>
      <div style={styles.messageContainer}>{renderMessage(p.message)}</div>
    </motion.div>
  );
};

const useStyles = mkUseStyles((t) => ({
  container: {
    position: 'relative',
    flexDirection: 'row',
    color: 'white',
    width: '100%',
    maxWidth: '100%',
    alignItems: 'flex-start',
    padding: 4,
    zIndex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: t.spacing.m,
    borderRadius: t.borderRadius.default,
  },
  marker: {
    height: '100%',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: t.borderRadius.default,
    zIndex: 1,
    marginRight: t.spacing.s,
    marginLeft: -14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scopeContainer: {
    paddingLeft: t.spacing.s,
    paddingRight: t.spacing.s,
    borderRadius: 2,
    marginLeft: t.spacing.s,
  },
  levelContainer: {
    marginLeft: t.spacing.s,
  },
  messageContainer: {
    alignSelf: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    overflow: 'auto',
    paddingRight: t.spacing.m,
    marginLeft: t.spacing.sm,
  },
  text: {
    padding: 0,
    margin: 0,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
  },
}));
