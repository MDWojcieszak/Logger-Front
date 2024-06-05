import { useContext, useEffect, useState } from 'react';
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
  active: boolean;
};

const useLogStream = (messageType: string) => {
  const ctx = useContext(WebSocketContext);

  const [rawLogs, setRawLogs] = useState<LogType[]>();
  const [scopes, setScopes] = useState<ScopeType[]>();

  const handleLog = (log: LogType) => {
    setRawLogs((prev) => (prev ? [...prev, log] : [log]));
    if (!log.scope) return;
    if (!scopes?.find((s) => s.name === log.scope))
      setScopes((prev) =>
        prev?.find((s) => s.name === log.scope)
          ? [...prev]
          : prev
            ? [...prev, { active: true, color: log.color, name: log.scope }]
            : [{ active: true, color: log.color, name: log.scope }],
      );
  };

  const handleSetScopeActive = (name: string, isActive: boolean) => {
    const index = scopes?.findIndex((s) => s.name === name);
    if (index === -1 || index === undefined) return;
    setScopes((prev) => prev && prev.map((p) => (p.name === name ? { ...p, active: isActive } : p)));
  };

  useEffect(() => {
    if (!ctx || !ctx.socket) return;

    ctx.socket.on(messageType, handleLog);
    return () => {
      ctx?.socket?.off(messageType, handleLog);
    };
  }, [ctx, ctx?.socket, messageType, handleLog]);

  return {
    logs: rawLogs?.filter((log) => scopes?.find((s) => s.name === log.scope && s.active)),
    scopes,
    handleSetScopeActive,
    handleClear: () => setRawLogs([]),
  };
};

export default useLogStream;
