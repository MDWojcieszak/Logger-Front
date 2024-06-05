import { format } from 'date-fns';
import { LogType } from '~/routes/Streams/hooks/useLogStream';
import { mkUseStyles } from '~/utils/theme';

type LogProps = LogType;

export const LogContainer = ({ timestamp, scope, color, ...p }: LogProps) => {
  const styles = useStyles();
  const fontColor = p.level === 'debug' ? 'gray' : 'white';
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
    <div style={styles.container}>
      <div style={{ color: fontColor, opacity: 0.6 }}>{format(new Date(timestamp), 'HH:mm:ss:SSS')}</div>
      <div style={{ ...styles.scopeContainer, backgroundColor: color }}>{scope}</div>
      <div style={{ ...styles.levelContainer, color: fontColor }}>{p.level?.toUpperCase()}</div>
      <div style={styles.messageContainer}>{renderMessage(p.message)}</div>
    </div>
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
    marginBottom: t.spacing.xs,
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
