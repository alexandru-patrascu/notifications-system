import { useEffect, useState, createContext, ReactNode } from "react";

const webSocket = new WebSocket("ws://localhost:8080");

export const SocketContext = createContext(webSocket);

interface ISocketProvider {
  children: ReactNode;
}

export const SocketProvider = (props: ISocketProvider) => {
  const [ws, setWs] = useState<WebSocket>(webSocket);

  useEffect(() => {
    const onClose = () => {
      setTimeout(() => {
        setWs(new WebSocket("ws://localhost:8080"));
      }, 500);
    };

    ws.addEventListener("close", onClose);

    return () => {
      ws.removeEventListener("close", onClose);
    };
  }, [ws, setWs]);

  return (
    <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>
  );
};
