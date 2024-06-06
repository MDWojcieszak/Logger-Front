import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '~/components/Button';
import { Loader } from '~/components/Loader';
import { Scrollbar } from '~/components/Scrollbar';
import { Toggle } from '~/components/Toggle';
import { LogContainer } from '~/routes/Streams/components/LogContainer';
import { Scope } from '~/routes/Streams/components/Scope';
import { VerticalManu } from '~/routes/Streams/components/VerticalMenu';
import useLogStream, { LogType, ScopeType } from '~/routes/Streams/hooks/useLogStream';
import { useStream } from '~/routes/Streams/hooks/useStream';
import { LogLevel } from '~/types/stream';
import { MdOutlineSpaceBar } from 'react-icons/md';

import { mkUseStyles, useTheme } from '~/utils/theme';

export const ManageStream = () => {
  const styles = useStyles();
  const theme = useTheme();
  const { streamId } = useParams();
  const { data } = useStream(streamId);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const { logs, scopes, handleClear } = useLogStream(`stream.message.${streamId}`);
  const [autoScroll, setAutoScroll] = useState(true);
  const [hideItems, setHideItems] = useState(true);
  const [disabledLogLevels, setDisabledLogLevels] = useState<LogLevel[]>([]);
  const [disabledScopes, setDisabledScopes] = useState<string[]>([]);

  const filteredLogs = useMemo(() => {
    if (!hideItems) return logs;
    return logs?.filter(
      (log) => !disabledLogLevels.includes(log.level || ('' as any)) && !disabledScopes.includes(log.scope || ''),
    );
  }, [logs, disabledLogLevels, disabledScopes, hideItems]);
  const [verticalMenuExpanded, setVerticalMenuExpanded] = useState(false);
  const renderLog = useCallback(
    (log: LogType, index: number) => {
      const disabled =
        log?.level && log?.scope && !hideItems
          ? disabledLogLevels.includes(log.level as any) || disabledScopes.includes(log.scope)
          : false;
      return <LogContainer key={`${log.timestamp}+ ${index}`} {...log} disabled={disabled} />;
    },
    [hideItems, disabledLogLevels, disabledScopes, filteredLogs],
  );

  const scroll = useCallback(() => {
    if (autoScroll) {
      logContainerRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
    }
  }, [logContainerRef, autoScroll]);

  useEffect(() => {
    scroll();
  }, [filteredLogs, autoScroll]);

  useEffect(() => {
    let pressed = 0;
    const keyHandler = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (!pressed) setAutoScroll((s) => !s);
        pressed += 1;
      }
    };
    const keyReset = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (pressed > 2) setAutoScroll((s) => !s);
        pressed = 0;
      }
    };
    document.addEventListener('keydown', keyHandler);
    document.addEventListener('keyup', keyReset);

    return () => {
      document.removeEventListener('keydown', keyHandler);
      document.removeEventListener('keyup', keyReset);
    };
  }, []);

  const renderScope = (scope: ScopeType) => {
    return (
      <Scope
        active={!disabledScopes.includes(scope.name || '')}
        color={scope.color}
        name={scope.name || ''}
        setEnabled={() => {
          handleDisableScope(scope.name || '');
        }}
      />
    );
  };

  const handleDisableLogLevel = (level: LogLevel) => {
    setDisabledLogLevels((prev) => (!!prev.includes(level) ? [...prev.filter((l) => l !== level)] : [...prev, level]));
  };

  const handleDisableScope = (scope: string) => {
    setDisabledScopes((prev) => (!!prev.includes(scope) ? [...prev.filter((l) => l !== scope)] : [...prev, scope]));
  };

  return (
    <div style={styles.horizontalContainer}>
      <div style={styles.container}>
        <div style={styles.title}>
          {data?.name}
          <div onClick={() => setVerticalMenuExpanded((p) => !p)} style={styles.handle}>
            <Loader size={24} color='blue' />
          </div>
        </div>
        <div style={styles.headerContainer}>{scopes?.map(renderScope)}</div>
        <Scrollbar>
          <div style={styles.logContainer} ref={logContainerRef}>
            {filteredLogs?.map(renderLog)}
          </div>
        </Scrollbar>
        <div style={styles.footerContainer}>
          <div style={styles.row}>
            <Toggle enabled={autoScroll} setEnabled={setAutoScroll} />
            <p style={styles.text}>Auto scroll</p>
            <MdOutlineSpaceBar />

            <p style={{ opacity: 0.4, marginLeft: theme.spacing.xs }}>SPACE</p>
          </div>

          <Button onClick={() => handleClear()} label='Clear' variant='secondary' />
        </div>
      </div>
      <VerticalManu
        disabledLogLevels={disabledLogLevels}
        setDisabledLogLevel={handleDisableLogLevel}
        isExpanded={verticalMenuExpanded}
        hideItems={hideItems}
        setHideItems={setHideItems}
      />
    </div>
  );
};

const useStyles = mkUseStyles((t) => ({
  container: {
    height: '100%',
    width: 'calc(100% + 16px)',
    marginLeft: -t.spacing.m,
  },
  title: {
    marginLeft: t.spacing.m,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: t.spacing.s,
    gap: t.spacing.s,
    fontSize: 18,
    color: t.colors.blue,
    marginBottom: t.spacing.s,
    flexDirection: 'row',
  },
  horizontalContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  handle: {
    cursor: 'pointer',
  },
  headerContainer: {
    marginLeft: t.spacing.m,
    flexDirection: 'row',
    gap: t.spacing.m,
    marginBottom: t.spacing.m,
    flexWrap: 'wrap',
  },
  logContainer: {
    marginTop: t.spacing.m,
    marginRight: t.spacing.xxl,
    width: 'calc(100% - 48px)',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerContainer: {
    marginLeft: t.spacing.m,
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
