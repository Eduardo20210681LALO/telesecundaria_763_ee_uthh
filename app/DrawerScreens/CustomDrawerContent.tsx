// CustomDrawerContent.tsx
import React, { useState, useContext  } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserContext } from './UsertContext';

export default function CustomDrawerContent (
        props: DrawerContentComponentProps
    ) {
    const [activeSection, setActiveSection] = useState<string | null>(null); // Estado para controlar la sección activa

    const { setUser } = useContext(UserContext); // Obtén el contexto del usuario // Obtén el contexto del usuario
    const [modalVisible, setModalVisible] = useState(false);
  
    if (!props.state) return null;
  
    const currentRoute = props.state.routeNames[props.state.index];
    const isRouteActive = (routeName: string) => routeName === currentRoute;

    const toggleSection = (section: string) => {
      setActiveSection(activeSection === section ? null : section); // Cierra la sección actual si se vuelve a tocar, o abre otra sección
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user_data'); // Elimina los datos del usuario
            setUser(null); // Resetea el estado del usuario
            setModalVisible(false); // Cierra el modal
        
            // Limpia el historial y navega a la pantalla de inicio de sesión
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }], // Asegúrate de que 'Login' sea el nombre correcto de la pantalla de inicio de sesión
            });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <DrawerContentScrollView {...props}>
            {/* Inicio */}
            <TouchableOpacity
            onPress={() => props.navigation.navigate('HomeDocentes')}
            style={[
                styles.drawerItem,
                isRouteActive('HomeDocentes') && styles.activeItem,
            ]}
            >
            <Ionicons
                name="home-outline"
                size={20}
                color={isRouteActive('HomeDocentes') ? 'blue' : 'black'}
            />
            <Text
                style={[
                styles.drawerLabel,
                isRouteActive('HomeDocentes') && styles.activeLabel,
                ]}
            >
                Inicio
            </Text>
            </TouchableOpacity>
    
            {/* Sección Alumnos */}
            <TouchableOpacity
            onPress={() => toggleSection('Alumnos')}
            style={styles.drawerItem}
            >
            <View style={styles.sectionRow}>
                <Ionicons name="people-outline" size={20} color="black" />
                <Text style={styles.drawerLabel}>ALUMNOS</Text>
                <Ionicons
                name={
                    activeSection === 'Alumnos'
                    ? 'chevron-up-outline'
                    : 'chevron-down-outline'
                }
                size={20}
                color="black"
                />
            </View>
            </TouchableOpacity>
            {activeSection === 'Alumnos' && (
            <View style={styles.subSection}>
                
                <TouchableOpacity
                onPress={() =>
                    props.navigation.navigate('Visualizar Calificaciones')
                }
                style={[
                    styles.drawerItem,
                    styles.subSectionItem,
                    isRouteActive('Visualizar Calificaciones') && styles.activeItem,
                ]}
                >
                <Text
                    style={[
                    styles.drawerLabel,
                    isRouteActive('Visualizar Calificaciones') &&
                        styles.activeLabel,
                    ]}
                >
                    Visualizar Calificaciones
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => props.navigation.navigate('Visualizar Alumnos')}
                style={[
                    styles.drawerItem,
                    styles.subSectionItem,
                    isRouteActive('Visualizar Alumnos') && styles.activeItem,
                ]}
                >
                <Text
                    style={[
                    styles.drawerLabel,
                    isRouteActive('Visualizar Alumnos') && styles.activeLabel,
                    ]}
                >
                    Visualizar Alumnos
                </Text>
                </TouchableOpacity>
            </View>
            )}
    
            {/* Sección Estadísticas */}
            <TouchableOpacity
            onPress={() => toggleSection('Estadisticas')}
            style={styles.drawerItem}  
            >
            <View style={styles.sectionRow}>
                <Ionicons name="bar-chart-outline" size={20} color="black" />
                <Text style={styles.drawerLabel}>ESTADÍSTICAS</Text>
                <Ionicons
                name={
                    activeSection === 'Estadisticas'
                    ? 'chevron-up-outline'
                    : 'chevron-down-outline'
                }
                size={20}
                color="black"
                />
            </View>
            </TouchableOpacity>
            {activeSection === 'Estadisticas' && (
            <View style={styles.subSection}>
                <TouchableOpacity
                onPress={() => props.navigation.navigate('Estadísticas Grupales')}
                style={[
                    styles.drawerItem,
                    styles.subSectionItem,
                    isRouteActive('Estadísticas Grupales') && styles.activeItem,
                ]}
                >
                <Text
                    style={[
                    styles.drawerLabel,
                    isRouteActive('Estadísticas Grupales') && styles.activeLabel,
                    ]}
                >
                    Estadísticas Grupales
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() =>
                    props.navigation.navigate('Estadísticas Individuales')
                }
                style={[
                    styles.drawerItem,
                    styles.subSectionItem,
                    isRouteActive('Estadísticas Individuales') && styles.activeItem,
                ]}
                >
                <Text
                    style={[
                    styles.drawerLabel,
                    isRouteActive('Estadísticas Individuales') &&
                        styles.activeLabel,
                    ]}
                >
                    Estadísticas Individuales
                </Text>
                </TouchableOpacity>
            </View>
            )}
    
            {/* Sección Usuario */}
            <TouchableOpacity
            onPress={() => toggleSection('Usuario')}
            style={styles.drawerItem}
            >
            <View style={styles.sectionRow}>
                <Ionicons name="person-outline" size={20} color="black" />
                <Text style={styles.drawerLabel}>USUARIO</Text>
                <Ionicons
                name={
                    activeSection === 'Usuario'
                    ? 'chevron-up-outline'
                    : 'chevron-down-outline'
                }
                size={20}
                color="black"
                />
            </View>
            </TouchableOpacity>
            {activeSection === 'Usuario' && (
            <View style={styles.subSection}>
                <TouchableOpacity
                onPress={() => props.navigation.navigate('Perfil de Usuario')}
                style={[
                    styles.drawerItem,
                    styles.subSectionItem,
                    isRouteActive('Perfil de Usuario') && styles.activeItem,
                ]}
                >
                <Text
                    style={[
                    styles.drawerLabel,
                    isRouteActive('Perfil de Usuario') && styles.activeLabel,
                    ]}
                >
                    Perfil
                </Text>
                </TouchableOpacity>
            </View>
            )}
    
            {/* Cerrar Sesión */}
            <TouchableOpacity
                onPress={() => setModalVisible(true)} // Abre el modal
                style={styles.drawerItem}
            >
                <Ionicons name="log-out-outline" size={20} color="black" />
                <Text style={styles.drawerLabel}>Cerrar Sesión</Text>
            </TouchableOpacity>


            {/* Modal de confirmación */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)} // Cerrar modal al presionar fuera
            >
                <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>¿Estás seguro de que quieres salir?</Text>
                    <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setModalVisible(false)} // Cancela y cierra el modal
                    >
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout} // Llama a la función de cierre de sesión
                    >
                        <Text style={styles.logoutButtonText}>Salir</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>

        </DrawerContentScrollView>
    );
}
  
const styles = StyleSheet.create
(
    {
        drawerItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
        },
        drawerLabel: {
            marginLeft: 10,
            fontSize: 16,
            color: 'black',
        },
        activeItem: {
            backgroundColor: '#E3F2FD',
            borderRadius: 5,
        },
        activeLabel: {
            color: 'blue',
        },
        sectionRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
        },
        subSection: {
            marginLeft: 40,
        },
        subSectionItem: {
            marginVertical: 5,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
            alignItems: 'center',
        },
        modalText: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
        },
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
        },
        cancelButton: {
            backgroundColor: '#ccc',
            padding: 10,
            borderRadius: 5,
            width: '40%',
            alignItems: 'center',
        },
        cancelButtonText: {
            color: 'black',
            fontWeight: 'bold',
        },
        logoutButton: {
            backgroundColor: '#800020',
            padding: 10,
            borderRadius: 5,
            width: '40%',
            alignItems: 'center',
        },
        logoutButtonText: {
            color: 'white',
            fontWeight: 'bold',
        },
    }
);