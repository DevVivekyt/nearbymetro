import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [title, setTitle] = useState('All Station');
    const [bgColor, setBgColor] = useState('#00A693');
    const [user, setUser] = useState(null);
    const [metroId, setMetroId] = useState(null);

    return (
        <GlobalContext.Provider
            value={{
                title,
                setTitle,
                bgColor,
                setBgColor,
                user,
                setUser,
                metroId,
                setMetroId
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
