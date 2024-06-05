import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '~/components/Button';
import { Loader } from '~/components/Loader';
import { Scrollbar } from '~/components/Scrollbar';
import { Toggle } from '~/components/Toggle';
import { LogContainer } from '~/routes/Streams/components/LogContainer';
import { Scope } from '~/routes/Streams/components/Scope';
import useLogStream, { LogType, ScopeType } from '~/routes/Streams/hooks/useLogStream';
import { useStream } from '~/routes/Streams/hooks/useStream';

import { mkUseStyles } from '~/utils/theme';

export const ManageStream = () => {
  const styles = useStyles();
  const { streamId } = useParams();
  const { data } = useStream(streamId);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const { logs, scopes, handleSetScopeActive, handleClear } = useLogStream(`stream.message.${streamId}`);
  const [autoScroll, setAutoScroll] = useState(true);
  const renderLog = (log: LogType) => {
    return <LogContainer {...log} />;
  };

  useEffect(() => {
    if (autoScroll) {
      logContainerRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
    }
  }, [logs, autoScroll]);

  const renderScope = (scope: ScopeType) => {
    return (
      <Scope
        active={scope.active}
        color={scope.color}
        name={scope.name || ''}
        setEnabled={(enabled) => {
          handleSetScopeActive(scope.name || '', enabled);
        }}
      />
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        {data?.name}
        <Loader size={24} color='blue' />
      </div>
      <div style={styles.headerContainer}>{scopes?.map(renderScope)}</div>
      <Scrollbar>
        <div style={styles.logContainer} ref={logContainerRef}>
          {logs?.map(renderLog)}
        </div>
      </Scrollbar>
      <div style={styles.footerContainer}>
        <div style={styles.row}>
          <Toggle enabled={autoScroll} setEnabled={setAutoScroll} />
          <p style={styles.text}>Auto scroll</p>
        </div>

        <Button onClick={() => handleClear()} label='Clear' variant='secondary' />
      </div>
    </div>
  );
};

const useStyles = mkUseStyles((t) => ({
  container: {
    height: '100%',
    width: '100%',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: t.spacing.s,
    gap: t.spacing.s,
    fontSize: 18,
    color: t.colors.blue,
    marginBottom: t.spacing.s,
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    gap: t.spacing.m,
    marginBottom: t.spacing.m,
  },
  logContainer: {
    marginTop: t.spacing.m,
    width: 'calc(100% - 10px)',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerContainer: {
    marginTop: t.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: t.spacing.s,
    marginRight: t.spacing.s,
  },
}));
