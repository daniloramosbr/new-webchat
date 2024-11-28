import React, { createContext, useState, ReactNode, FC } from 'react';

interface User {
  id: string;
  name: string;
}

interface ContextProps {
  width: string;
  setWidth: React.Dispatch<React.SetStateAction<string>>;
  chat: boolean;
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
  dataUser: User;
  setDataUser: React.Dispatch<React.SetStateAction<User>>;
  update: unknown; // Use `unknown` se você não tiver certeza do tipo exato
  setUpdate: React.Dispatch<React.SetStateAction<unknown>>;
}

export const ContextTsx = createContext<ContextProps>({
  width: "0%",
  setWidth: () => {},
  chat: false,
  setChat: () => {},
  dataUser: { id: "", name: "" },
  setDataUser: () => {},
  update: null,
  setUpdate: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const ContextProvider: FC<ProviderProps> = ({ children }) => {
  const [width, setWidth] = useState("0%");
  const [chat, setChat] = useState(false);
  const [dataUser, setDataUser] = useState<User>({ id: "", name: "" });
  const [update, setUpdate] = useState<unknown>(null);

  return (
    <ContextTsx.Provider value={{ width, setWidth, chat, setChat, dataUser, setDataUser, update, setUpdate }}>
      {children}
    </ContextTsx.Provider>
  );
};
