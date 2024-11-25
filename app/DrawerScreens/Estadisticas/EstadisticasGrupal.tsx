import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import Svg, { Rect, Text as SvgText, Line } from "react-native-svg";

type Periodo = {
  vchPeriodo: string;
  intClvPeriodo: number;
};

type Grado = {
  vchGrado: string;
  intClvGrado: number;
};

type Grupo = {
  vchGrupo: string;
  intClvGrupo: number;
};

type Calificacion = {
  vchNombre: string;
  vchAPaterno: string;
  vchAMaterno: string;
  Trimestre1: number;
  Trimestre2: number;
  Trimestre3: number;
  PromedioGeneralPeriodo: number;
};

export default function EstadisticasGrupalDocent() {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(false);

  const [periodos, setPeriodos] = useState<{ label: string; value: string }[]>([]);
  const [grados, setGrados] = useState<{ label: string; value: string }[]>([]);
  const [grupos, setGrupos] = useState<{ label: string; value: string }[]>([]);

  const [openPeriodo, setOpenPeriodo] = useState(false);
  const [selectedPeriodo, setSelectedPeriodo] = useState<string | null>(null);

  const [openGrado, setOpenGrado] = useState(false);
  const [selectedGrado, setSelectedGrado] = useState<string | null>(null);

  const [openGrupo, setOpenGrupo] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState<string | null>(null);

  const [visibleTrimestres, setVisibleTrimestres] = useState<{
    Trimestre1: boolean;
    Trimestre2: boolean;
    Trimestre3: boolean;
    PromedioGeneralPeriodo: boolean;
  }>({
    Trimestre1: true,
    Trimestre2: true,
    Trimestre3: true,
    PromedioGeneralPeriodo: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const periodosRes = await axios.get<Periodo[]>(
          "https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763Movil/AdminAlumnos/ObtenerPeriodos.php"
        );
        setPeriodos(
          periodosRes.data.map((periodo) => ({
            label: periodo.vchPeriodo,
            value: String(periodo.intClvPeriodo),
          }))
        );

        const gradosRes = await axios.get<Grado[]>(
          "https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763Movil/AdminAlumnos/ObtenerGrados.php"
        );
        setGrados(
          gradosRes.data.map((grado) => ({
            label: grado.vchGrado,
            value: String(grado.intClvGrado),
          }))
        );

        const gruposRes = await axios.get<Grupo[]>(
          "https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763Movil/AdminAlumnos/ObtenerGrupos.php"
        );
        setGrupos(
          gruposRes.data.map((grupo) => ({
            label: grupo.vchGrupo,
            value: String(grupo.intClvGrupo),
          }))
        );
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
        Alert.alert("Error", "No se pudieron cargar los datos iniciales.");
      }
    };
    fetchData();
  }, []);

  const fetchCalificacionesGrupo = async () => {
    if (selectedPeriodo && selectedGrado && selectedGrupo) {
      setLoading(true);
      try {
        const response = await axios.get<{ calificaciones: Calificacion[] }>(
          "https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Directivos/ObtenerCalificacionesGrupo.php",
          {
            params: {
              periodo: selectedPeriodo,
              grado: selectedGrado,
              grupo: selectedGrupo,
            },
          }
        );

        if (response.data.calificaciones.length > 0) {
          setCalificaciones(response.data.calificaciones);
        } else {
          Alert.alert(
            "Advertencia",
            "No se encontraron calificaciones para el grupo seleccionado."
          );
        }
      } catch (error) {
        console.error("Error al cargar calificaciones:", error);
        Alert.alert("Error", "No se pudieron cargar las calificaciones.");
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Advertencia", "Por favor seleccione todos los campos.");
    }
  };





  const toggleTrimestre = (trimestre: keyof typeof visibleTrimestres) => {
    setVisibleTrimestres((prev) => ({
      ...prev,
      [trimestre]: !prev[trimestre],
    }));
  };

  return (
    <ScrollView style={styles.globalScrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Estadísticas Alumnos por Grupo</Text>

        <DropDownPicker
          open={openPeriodo}
          value={selectedPeriodo}
          items={periodos}
          setOpen={setOpenPeriodo}
          setValue={setSelectedPeriodo}
          placeholder="Seleccione un periodo"
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
        />
        <DropDownPicker
          open={openGrado}
          value={selectedGrado}
          items={grados}
          setOpen={setOpenGrado}
          setValue={setSelectedGrado}
          placeholder="Seleccione un grado"
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
        />
        <DropDownPicker
          open={openGrupo}
          value={selectedGrupo}
          items={grupos}
          setOpen={setOpenGrupo}
          setValue={setSelectedGrupo}
          placeholder="Seleccione un grupo"
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
        />

        <TouchableOpacity style={styles.button} onPress={fetchCalificacionesGrupo}>
          <Text style={styles.buttonText}>Ver Calificaciones del Grupo</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#6200ee" />
        ) : (
          calificaciones.length > 0 && (
            <ScrollView horizontal style={styles.chartScrollView}>
              <Svg height={calificaciones.length * 100 + 50} width={1000}>
                {[...Array(11)].map((_, i) => (
                  <React.Fragment key={i}>
                    <SvgText
                      x={200 + i * 50}
                      y="20"
                      fontSize="12"
                      textAnchor="middle"
                      fill="#000"
                    >
                      {i}
                    </SvgText>
                    <Line
                      x1={200 + i * 50}
                      y1="30"
                      x2={200 + i * 50}
                      y2={calificaciones.length * 100 + 50}
                      stroke="#ccc"
                      strokeWidth="1"
                    />
                  </React.Fragment>
                ))}
                {calificaciones.map((calif, index) => (
                  <React.Fragment key={index}>
                    <SvgText
                      x="10"
                      y={index * 100 + 75}
                      fontSize="14"
                      textAnchor="start"
                      fill="#000"
                    >
                      {`${calif.vchNombre} ${calif.vchAPaterno}`}
                    </SvgText>
                    {visibleTrimestres.Trimestre1 && (
                      <Rect
                        x="200"
                        y={index * 100 + 60}
                        width={(calif.Trimestre1 / 10) * 300}
                        height="20"
                        fill="#6200ee"
                      />
                    )}
                    {visibleTrimestres.Trimestre2 && (
                      <Rect
                        x="200"
                        y={index * 100 + 90}
                        width={(calif.Trimestre2 / 10) * 300}
                        height="20"
                        fill="#ff5722"
                      />
                    )}
                    {visibleTrimestres.Trimestre3 && (
                      <Rect
                        x="200"
                        y={index * 100 + 120}
                        width={(calif.Trimestre3 / 10) * 300}
                        height="20"
                        fill="#4caf50"
                      />
                    )}
                    {visibleTrimestres.PromedioGeneralPeriodo && (
                      <Rect
                        x="200"
                        y={index * 100 + 150}
                        width={(calif.PromedioGeneralPeriodo / 10) * 300}
                        height="20"
                        fill="#03a9f4"
                      />
                    )}
                  </React.Fragment>
                ))}
              </Svg>
            </ScrollView>
          )
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.trimestreButton}
            onPress={() => toggleTrimestre("Trimestre1")}
          >
            <Text style={styles.trimestreButtonText}>Trimestre 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trimestreButton}
            onPress={() => toggleTrimestre("Trimestre2")}
          >
            <Text style={styles.trimestreButtonText}>Trimestre 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trimestreButton}
            onPress={() => toggleTrimestre("Trimestre3")}
          >
            <Text style={styles.trimestreButtonText}>Trimestre 3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trimestreButton}
            onPress={() => toggleTrimestre("PromedioGeneralPeriodo")}
          >
            <Text style={styles.trimestreButtonText}>Promedio Final</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  globalScrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noData: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    marginBottom: 16,
    zIndex: 10,
  },
  chartScrollView: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  trimestreButton: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 8,
  },
  trimestreButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});
