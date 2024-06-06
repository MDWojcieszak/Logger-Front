import { useCallback, useContext, useEffect, useState } from 'react';
import { WebSocketContext } from '~/contexts/WebSocket/WebSocketContext';

export type LogType = {
  color: string;
  timestamp: number;
  level?: string;
  scope?: string;
  message?: any[];
};

export type ScopeType = {
  name?: string;
  color: string;
};

const logLevelOrder: { [key: string]: number } = {
  info: 1,
  debug: 2,
  success: 3,
  warn: 4,
  error: 5,
};

const useLogStream = (messageType: string) => {
  const ctx = useContext(WebSocketContext);

  const [rawLogs, setRawLogs] = useState<LogType[]>();
  const [scopes, setScopes] = useState<ScopeType[]>();

  const handleLog = useCallback((log: LogType) => {
    setRawLogs((prevLogs) => {
      if (!prevLogs) return [log];
      const newLogs = [...prevLogs];
      let low = 0,
        high = newLogs.length;
      while (low < high) {
        const mid = Math.floor((low + high) / 2);
        const existingLog = newLogs[mid];
        if (log.timestamp < existingLog.timestamp) {
          high = mid;
        } else if (log.timestamp > existingLog.timestamp) {
          low = mid + 1;
        } else {
          const logLevel = log.level ? logLevelOrder[log.level] : Infinity;
          const existingLogLevel = existingLog.level ? logLevelOrder[existingLog.level] : Infinity;

          if (logLevel < existingLogLevel) {
            high = mid;
          } else {
            low = mid + 1;
          }
        }
      }

      newLogs.splice(low, 0, log);
      return newLogs;
    });

    if (!log.scope) return;

    setScopes((prevScopes) => {
      if (!prevScopes) return [{ active: true, color: log.color, name: log.scope }];
      const scopeExists = prevScopes.find((s) => s.name === log.scope);
      if (scopeExists) return prevScopes;
      return [...prevScopes, { active: true, color: log.color, name: log.scope }];
    });
  }, []);

  useEffect(() => {
    if (!ctx || !ctx.socket) return;

    ctx.socket.on(messageType, handleLog);
    return () => {
      ctx?.socket?.off(messageType, handleLog);
    };
  }, [ctx, ctx?.socket, messageType, handleLog]);

  return {
    logs: rawLogs,
    scopes,
    handleClear: () => setRawLogs([]),
  };
};

export default useLogStream;
