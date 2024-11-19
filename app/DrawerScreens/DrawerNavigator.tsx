// DrawerNavigator.tsx
import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// importaciones de las pantallas

import HomeDocentes from './HomeDocentes';

import VisualizarAlumnos from './Alumnos/VisualizarAlumnos';
import VisualizarCalificaciones from './Alumnos/VisualizarCalificaciones';

import EstadisticasGrupal from './Estadisticas/EstadisticasGrupal';
import EstadisticasIndividual from './Estadisticas/EstadisticasIndividual';

import PerfilUsuario from './Usuario/PerfilUsuario';

import CustomDrawerContent from './CustomDrawerContent';

import { UserContext } from './UsertContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator () {
    const { user } = useContext(UserContext); // Acceder al contexto del usuario

    return (
        <Drawer.Navigator
        initialRouteName="HomeDocentes"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="HomeDocentes" component={HomeDocentes} />
       
        <Drawer.Screen name="Visualizar Alumnos" component={VisualizarAlumnos} />
        <Drawer.Screen
          name="Visualizar Calificaciones"
          component={VisualizarCalificaciones}
        />
        <Drawer.Screen
          name="Estadísticas Grupales"
          component={EstadisticasGrupal}
        />
        <Drawer.Screen
          name="Estadísticas Individuales"
          component={EstadisticasIndividual}
        />
        <Drawer.Screen name="Perfil de Usuario" component={PerfilUsuario} />
      </Drawer.Navigator>
    );
}

