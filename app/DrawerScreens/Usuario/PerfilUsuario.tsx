import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Text } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../UsertContext';

export default function  PerfilUsuario() {
    const { user, setUser } = useContext(UserContext);

    const [nombre, setNombre] = useState('');
    const [APaterno, setAPaterno] = useState('');
    const [AMaterno, setAMaterno] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [mostrarContrasenia2, setMostrarContrasenia2] = useState(false);
  
    const toggleMostrarContrasenia = () => setMostrarContrasenia(!mostrarContrasenia);
    const toggleMostrarContrasenia2 = () => setMostrarContrasenia2(!mostrarContrasenia2);
  
    const handleUpdate = async () => {
      const usuarioRegex = /^[a-zA-Z0-9]+$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&])[A-Za-z\d#\$%&]+$/;
  
      // Validación de campos obligatorios y formato
      if (!nombre || !APaterno || !AMaterno || !correo || !usuario || !telefono) {
        Alert.alert('Atención', 'Por favor, complete todos los campos antes de actualizar.');
        return;
      }
      if (!usuarioRegex.test(usuario)) {
        Alert.alert('Atención', 'El nombre de usuario solo debe contener letras y números.');
        return;
      }
      if (!emailRegex.test(correo)) {
        Alert.alert('Atención', 'Por favor, ingrese un correo electrónico válido.');
        return;
      }
      if (nuevaContraseña) {
        if (!passwordRegex.test(nuevaContraseña)) {
          Alert.alert('Atención', 'La nueva contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial (#, $, %, &).');
          return;
        }
        if (nuevaContraseña !== confirmarContraseña) {
          Alert.alert('Atención', 'La nueva contraseña y la confirmación deben coincidir.');
          return;
        }
      }
  
      const idUsuario = user?.id_usuario;
      const data = { idUsuario, nombre, APaterno, AMaterno, correo, usuario, telefono, nuevaContraseña };
  
      try {
        const response = await fetch('http://192.168.1.146/TeleSecundaria763Movil/UsuarioGeneral/actualizarDatosUsuario.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.success) {
          Alert.alert('Éxito', 'Datos actualizados exitosamente');
          
          const updatedUser = { 
            id_usuario: user?.id_usuario || '',
            token: user?.token || '',
            id_estatus: user?.id_estatus || '',
            vch_nombre: nombre, 
            vch_APaterno: APaterno, 
            vch_AMaterno: AMaterno, 
            vch_correo: correo, 
            vch_usuario: usuario,
            vch_telefono: telefono,
            id_rol: user?.id_rol || '',
          };
          
          setUser(updatedUser);
          await AsyncStorage.setItem('user_data', JSON.stringify(updatedUser));
          
          // Limpia los campos después de la actualización
          setNombre('');
          setAPaterno('');
          setAMaterno('');
          setCorreo('');
          setUsuario('');
          setTelefono('');
          setNuevaContraseña('');
          setConfirmarContraseña('');
        } else {
          Alert.alert('Error', 'Error al actualizar los datos');
        }
      } catch (error) {
        console.error('Error al hacer la petición de actualización:', error);
        Alert.alert('Error', 'Hubo un problema al actualizar los datos');
      }
    };
  
    const renderRolTag = () => {
      let label = 'Ninguno';
      let color = '#6c757d';
  
      switch (user?.id_rol) {
        case '1':
          label = 'Directivo';
          color = '#007bff';
          break;
        case '2':
          label = 'Administrativo';
          color = '#28a745';
          break;
        case '3':
          label = 'Docente';
          color = '#ffc107';
          break;
      }
  
      return (
        <View style={[styles.tag, { backgroundColor: color }]}>
          <Text style={styles.tagText}>{label}</Text>
        </View>
      );
    };
  
    const renderEstatusTag = () => {
      let label = 'Desconocido';
      let color = '#6c757d';
  
      switch (user?.id_estatus) {
        case '1':
          label = 'Activo';
          color = '#28a745';
          break;
        case '2':
          label = 'Inactivo';
          color = '#ffc107';
          break;
        case '3':
          label = 'Bloqueado';
          color = '#dc3545';
          break;
      }
  
      return (
        <View style={[styles.tag, { backgroundColor: color }]}>
          <Text style={styles.tagText}>{label}</Text>
        </View>
      );
    };

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {user ? (
            <>
              <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/007/654/158/non_2x/user-sign-in-profile-avatar-user-icon-in-flat-style-user-icon-for-the-website-team-logo-vector.jpg' }} style={styles.avatar} />
                </View>
                <Text style={styles.title}>{`${user.vch_nombre} ${user.vch_APaterno} ${user.vch_AMaterno}`}</Text>
                <Text style={styles.subtitle}>{user.vch_correo}</Text>
                <Text style={styles.subtitle}>{user.vch_usuario}</Text>
              </View>
  
              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Teléfono:</Text>
                  <Text style={styles.infoValue}>{user.vch_telefono}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Rol:</Text>
                  {renderRolTag()}
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Estado de Cuenta:</Text>
                  {renderEstatusTag()}
                </View>
              </View>
  
  
              <Text style={styles.subTitle}>Actualizar Datos</Text>
              
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Nombre completo"
                    mode="outlined"
                    placeholder="Ingrese su nombre"
                    value={nombre}
                    onChangeText={setNombre}
                  />
                </View>
  
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Apellido Paterno"
                    mode="outlined"
                    placeholder="Ingrese su Apellido Paterno"
                    value={APaterno}
                    onChangeText={setAPaterno}
                  />
                </View>
  
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Apellido Materno"
                    mode="outlined"
                    placeholder="Ingrese su Apellido Materno"
                    value={AMaterno}
                    onChangeText={setAMaterno}
                  />
                </View>
  
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Correo Electrónico"
                    mode="outlined"
                    placeholder="Ingrese su correo electrónico"
                    value={correo}
                    onChangeText={setCorreo}
                  />
                </View>
  
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Nombre de Usuario"
                    mode="outlined"
                    placeholder="Ingrese su nombre de usuario"
                    value={usuario}
                    onChangeText={setUsuario}
                  />
                </View>
  
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Número de Teléfono"
                    mode="outlined"
                    keyboardType="numeric"
                    placeholder="Ingrese su número de teléfono"
                    value={telefono}
                    onChangeText={(text) => setTelefono(text.replace(/[^0-9]/g, ''))}
                  />
                </View>
  
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Nueva contraseña"
                    mode="outlined"
                    placeholder="Ingrese su nueva contraseña"
                    secureTextEntry={!mostrarContrasenia}
                    value={nuevaContraseña}
                    onChangeText={setNuevaContraseña}
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
  
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Confirmar contraseña"
                    mode="outlined"
                    placeholder="Confirme su contraseña"
                    secureTextEntry={!mostrarContrasenia2}
                    value={confirmarContraseña}
                    onChangeText={setConfirmarContraseña}
                    right={
                      <TextInput.Icon
                        icon={() => (
                          <FontAwesomeIcon
                            icon={mostrarContrasenia2 ? faEyeSlash : faEye}
                            size={20}
                            color="#666"
                          />
                        )}
                        onPress={toggleMostrarContrasenia2}
                      />
                    }
                  />
                </View>
  
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleUpdate}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>Actualizar Datos</Text>
                </TouchableOpacity>
  
              </View>
            </>
          ) : (
            <Text style={styles.loadingText}>Cargando información del usuario...</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#f0f0f0',
      alignItems: 'center',
    },
    profileContainer: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#ffffff',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      marginVertical: 10,
    },
    avatarContainer: {
      backgroundColor: '#f0f0f0',
      borderRadius: 50,
      padding: 4,
      marginBottom: 10,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 5,
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
    },
    infoCard: {
      width: '100%',
      padding: 20,
      borderRadius: 15,
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      marginVertical: 10,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    infoLabel: {
      fontSize: 16,
      color: '#333',
      fontWeight: '600',
    },
    infoValue: {
      fontSize: 16,
      color: '#555',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    value: {
      fontSize: 16,
      color: '#555',
      marginBottom: 5,
    },
    additionalInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    column: {
      alignItems: 'center',
      flex: 1,
    },
    tag: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 8,
      marginTop: 5,
    },
    tagText: {
      color: '#fff',
      fontSize: 14,
    },
    subTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    formContainer: {
      width: '100%',
    },
    inputContainer: { 
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#800020',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    loadingText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
    },
});
  