import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

import { UserContext } from './UsertContext';

export default function HomeDocentes (){
    const { user } = useContext(UserContext);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.breadcrumb}>
                {/* Breadcrumb de navegación, reemplázalo con tu componente */}
                {/* <BreadcrumDocent /> */}
            </View>

            <Text style={styles.title}>Inicio</Text>

            <Card style={styles.card}>
                <View style={styles.welcomeSection}>
                {user ? (
                    <>
                    <Text style={styles.welcomeTitle}>
                        ¡Bienvenido al Portal Virtual Telesecundaria 763!
                    </Text>
                    <Text style={styles.paragraph}>
                        Estamos encantados de verte nuevamente, <Text style={styles.bold}>Docente</Text>.
                    </Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>CORREO:</Text> {user.vch_correo}
                    </Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>NOMBRE:</Text> {`${user.vch_nombre} ${user.vch_APaterno} ${user.vch_AMaterno}`}
                    </Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>USUARIO:</Text> {user.vch_usuario}
                    </Text>
                    <Text style={styles.italicParagraph}>
                        El futuro académico de nuestros estudiantes está en tus manos. ¡Gracias por contribuir a su éxito!
                    </Text>
                    <Text style={styles.boldParagraph}>
                        OBJETIVO DEL SISTEMA: Este portal está diseñado para facilitar la administración de la información
                        académica de nuestros alumnos, permitiéndote realizar gestiones de manera rápida y eficiente. Juntos estamos construyendo un mejor futuro.
                    </Text>
                    </>
                ) : (
                    <Text style={styles.loadingText}>Cargando información del usuario...</Text>
                )}
                </View>
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#f0f0f0',
    },
    breadcrumb: {
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    card: {
      backgroundColor: '#fff',
      padding: 20,
      flexGrow: 1,
    },
    welcomeSection: {
      backgroundColor: '#800000',
      borderRadius: 12,
      padding: 30,
      alignItems: 'center',
      marginBottom: 20,
    },
    welcomeTitle: {
      fontSize: 22,
      color: '#FFD700',
      textAlign: 'center',
      marginBottom: 15,
    },
    paragraph: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 10,
    },
    bold: {
      fontWeight: 'bold',
    },
    italicParagraph: {
      color: '#fff',
      fontSize: 16,
      fontStyle: 'italic',
      marginTop: 20,
      textAlign: 'center',
    },
    boldParagraph: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
    },
    loadingText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
  });
  