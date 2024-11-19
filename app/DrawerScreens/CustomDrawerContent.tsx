// CustomDrawerContent.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CustomDrawerContent (
        props: DrawerContentComponentProps
    ) {
    const [activeSection, setActiveSection] = useState<string | null>(null); // Estado para controlar la sección activa
  
    // Verificación de que props.state exista para evitar errores
    if (!props.state) return null;
  
    // Obtener la ruta actual activa
    const currentRoute = props.state.routeNames[props.state.index];
    
    // Función para determinar si una ruta es activa
    const isRouteActive = (routeName: string) => routeName === currentRoute;
  
    // Función para manejar la apertura/cierre de una sección
    const toggleSection = (section: string) => {
      setActiveSection(activeSection === section ? null : section); // Cierra la sección actual si se vuelve a tocar, o abre otra sección
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
            onPress={() => console.log('Cerrar sesión')}
            style={styles.drawerItem}
            >
            <Ionicons name="log-out-outline" size={20} color="black" />
            <Text style={styles.drawerLabel}>Cerrar Sesión</Text>
            </TouchableOpacity>
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
    }
);