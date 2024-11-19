import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id_usuario: string;
    token: string;
    id_estatus: string;
    id_rol: string;
    vch_AMaterno: string;
    vch_APaterno: string;
    vch_correo: string;
    vch_nombre: string;
    vch_telefono: string;
    vch_usuario: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('user_data');
                if (storedUserData) {
                    setUser(JSON.parse(storedUserData));
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
