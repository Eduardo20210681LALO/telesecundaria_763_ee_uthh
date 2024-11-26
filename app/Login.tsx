import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { TextInput, Card, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './DrawerScreens/UsertContext';
import tw from 'tailwind-react-native-classnames';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message'; // Importar Toast

const Login = () => {
    const { setUser } = useContext(UserContext);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

    const toggleMostrarContrasenia = () =>
        setMostrarContrasenia(!mostrarContrasenia);

    const IniciarSesión = async () => {
        try {
            const response = await fetch(
                'https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763Movil/Inicio/login2.php',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario, email, password }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log('Respuesta del servidor:', data);

                if (data.success) {
                    await AsyncStorage.setItem('user_data', JSON.stringify(data));
                    setUser(data);
                    router.push('/DrawerScreens/DrawerNavigator');
                } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error de inicio de sesión',
                    text2: data.messages || 'Intente nuevamente',
                });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Error en la solicitud, intente nuevamente.',
                });
            }
        } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error inesperado',
            text2: 'Ocurrió un error. Intente nuevamente.',
        });
            console.error('Error en el catch:', error);
        }
    };

    const Validacion = async () => {
        const usuarioRegex = /^[a-zA-Z0-9]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&])[A-Za-z\d#\$%&]+$/;

        if (!usuario) {
            Toast.show({ type: 'info', text1: 'Validación', text2: 'Ingrese un nombre de usuario.' });
            return;
        }
        if (!email) {
            Toast.show({ type: 'info', text1: 'Validación', text2: 'Ingrese un correo electrónico.' });
            return;
        }
        if (!password) {
            Toast.show({ type: 'info', text1: 'Validación', text2: 'Ingrese una contraseña.' });
            return;
        }
        if (!usuarioRegex.test(usuario)) {
            Toast.show({ type: 'info', text1: 'Validación', text2: 'Nombre de usuario no válido.' });
            return;
        }
        if (!emailRegex.test(email)) {
            Toast.show({ type: 'info', text1: 'Validación', text2: 'Correo electrónico no válido.' });
            return;
        }
        if (!passwordRegex.test(password)) {
            Toast.show({ type: 'info', text1: 'Validación', text2: 'Contraseña no válida.' });
            return;
        }
        await IniciarSesión();
    };

    return (
        <>
        <ScrollView
            contentContainerStyle={[
            tw`flex-grow bg-gray-100`,
            { paddingTop: insets.top, paddingBottom: insets.bottom },
            ]}
        >
            <View style={tw`flex-1 justify-center p-5`}>
            <Card style={tw`p-5`}>
                <Card.Content>
                <Text style={tw`text-3xl font-bold text-center text-gray-800 mb-2`}>
                    Inicio de Sesión
                </Text>
                <Text style={tw`text-center text-gray-500 mb-8`}>
                    Por favor, inicie sesión para continuar
                </Text>

                <View style={tw`mb-5`}>
                    <TextInput
                    label="Usuario"
                    placeholder="Ingrese su nombre de usuario"
                    mode="outlined"
                    value={usuario}
                    onChangeText={setUsuario}
                    keyboardType="default"
                    />
                </View>

                <View style={tw`mb-5`}>
                    <TextInput
                    label="Correo Electrónico"
                    placeholder="Ingrese su correo electrónico"
                    mode="outlined"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    />
                </View>

                <View style={tw`mb-8`}>
                    <TextInput
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                    mode="outlined"
                    secureTextEntry={!mostrarContrasenia}
                    value={password}
                    onChangeText={setPassword}
                    right={
                        <TextInput.Icon
                        icon={() => (
                            <FontAwesomeIcon
                            icon={mostrarContrasenia ? faEyeSlash : faEye}
                            size={20}
                            color="#666"
                            />
                        )}
                        onPress={toggleMostrarContrasenia}
                        />
                    }
                    />
                </View>

                <TouchableOpacity
                    style={tw`bg-red-800 p-4 rounded`}
                    onPress={Validacion}
                >
                    <Text style={tw`text-white text-center text-lg font-bold`}>
                    Iniciar Sesión
                    </Text>
                </TouchableOpacity>
                </Card.Content>
            </Card>
            </View>
        </ScrollView>
        <Toast /> {/* Componente Toast */}
        </>
    );
};

export default Login;
