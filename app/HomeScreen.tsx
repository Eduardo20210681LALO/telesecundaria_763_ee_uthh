import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/Login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>Al portal Virtual</Text>
        <Text style={styles.highlight}>TeleSecundaria 763</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ir al Login</Text>
        </TouchableOpacity>
      </View>

      {/* Misión */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Misión</Text>
        <Image
          source={require("../assets/images/Imagen1.jpg")}
          style={styles.image}
        />
        <Text style={styles.text}>
          Somos una escuela que logra un trabajo colaborativo entre dirección,
          docentes, personal de apoyo, alumnos(as) y padres de familia, para
          obtener aprendizajes significativos y lograr los objetivos de la nueva
          escuela mexicana.
        </Text>
      </View>

      {/* Visión */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visión</Text>
        <Image
          source={require("../assets/images/Imagen4.jpeg")}
          style={styles.image}
        />
        <Text style={styles.text}>
          Ser una institución reconocida por su desempeño académico y formativo,
          capaz de proveer a nuestros alumnos(as) conocimientos, habilidades,
          destrezas y aptitudes que les permita ser competentes y participar
          activamente en la sociedad cambiante a la que pertenecen.
        </Text>
      </View>

      {/* Valores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Valores</Text>
        <Image
          source={require("../assets/images/work1.jpg")}
          style={styles.image}
        />
        <Text style={styles.text}>
          Puntualidad, Responsabilidad, Compromiso, Respeto, Disciplina, Empatía,
          Actitud de Servicio, Liderazgo, Igualdad, Resiliencia.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#7d0430",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
  },
  highlight: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFDE03",
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FFDE03",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#7d0430",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7d0430",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    marginVertical: 10,
  },
});
