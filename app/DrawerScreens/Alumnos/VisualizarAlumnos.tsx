import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import { Card, Divider, Provider as PaperProvider } from "react-native-paper";
import { UserContext } from "../UsertContext";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

type Alumno = {
    vchCurpAlumno: string;
    vchNombre: string;
    vchAPaterno: string;
    vchAMaterno: string;
};

export default function VisualizarAlumnos() {
    const { user } = useContext(UserContext);

    const [studentsData, setStudentsData] = useState<Alumno[]>([]);
    const [periodos, setPeriodos] = useState<{ label: string; value: string }[]>(
      []
    );
    const [grados, setGrados] = useState<{ label: string; value: string }[]>([]);
    const [grupos, setGrupos] = useState<{ label: string; value: string }[]>([]);
  
    const [selectedPeriodo, setSelectedPeriodo] = useState<string>("");
    const [selectedGrado, setSelectedGrado] = useState<string>("");
    const [selectedGrupo, setSelectedGrupo] = useState<string>("");
  
    const [openPeriodo, setOpenPeriodo] = useState(false);
    const [openGrado, setOpenGrado] = useState(false);
    const [openGrupo, setOpenGrupo] = useState(false);
  
    useEffect(() => {
        // Obtener periodos
        axios
            .get(
            "https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763Movil/AdminAlumnos/ObtenerPeriodos.php"
            )
            .then((res) => {
            const formattedPeriodos = res.data.map((periodo: any) => ({
                label: periodo.vchPeriodo,
                value: String(periodo.intClvPeriodo),
        }));
        setPeriodos(formattedPeriodos);
        })
        .catch((err) => console.error("Error al obtener periodos:", err));
  
        // Obtener grados
        axios
            .get(
            "https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763Movil/AdminAlumnos/ObtenerGrados.php"
            )
            .then((res) => {
            const formattedGrados = res.data.map((grado: any) => ({
                label: grado.vchGrado,
                value: String(grado.intClvGrado),
            })
        );
            setGrados(formattedGrados);
        })
        .catch((err) => console.error("Error al obtener grados:", err));
  
        // Obtener grupos
        axios
            .get(
            "https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763Movil/AdminAlumnos/ObtenerGrupos.php"
            )
            .then((res) => {
            const formattedGrupos = res.data.map((grupo: any) => ({
                label: grupo.vchGrupo,
                value: String(grupo.intClvGrupo),
            })
        );
            setGrupos(formattedGrupos);
        })
            .catch((err) => console.error("Error al obtener grupos:", err));
    }, []);
  
    const fetchStudents = () => {
        if (selectedPeriodo && selectedGrado && selectedGrupo && user?.id_usuario) {
            axios
            .get(
                `https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763Movil/Docentes/TraerAlumnosPorDocente.php?periodo=${selectedPeriodo}&grado=${selectedGrado}&grupo=${selectedGrupo}&docenteId=${user.id_usuario}`
            )
            .then((res) => {
                const uniqueStudents = Array.isArray(res.data.alumnos)
                ? res.data.alumnos.filter(
                    (student: Alumno, index: number, self: Alumno[]) =>
                        self.findIndex((s) => s.vchCurpAlumno === student.vchCurpAlumno) ===
                        index
                    )
                : [];
                setStudentsData(uniqueStudents);
            })
            .catch((err) => console.error("Error al obtener alumnos:", err));
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
            <Text style={styles.header}>Visualizar Alumnos</Text>

            <Card style={styles.card}>
                <Card.Content>
                {/* Dropdowns */}
                <DropDownPicker
                    open={openPeriodo}
                    value={selectedPeriodo}
                    items={periodos}
                    setOpen={setOpenPeriodo}
                    setValue={setSelectedPeriodo}
                    placeholder="Seleccione un periodo"
                    style={styles.dropdown}
                    containerStyle={styles.dropdownContainer}
                    listMode="MODAL"
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
                    listMode="MODAL"
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
                    listMode="MODAL"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={fetchStudents}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Buscar Alumnos</Text>
                </TouchableOpacity>

                {/* Lista de Alumnos */}
                <View style={styles.alumnosContainer}>
                    <ScrollView>
                    {studentsData.length > 0 ? (
                        studentsData.map((student) => (
                        <View
                            key={student.vchCurpAlumno}
                            style={styles.alumnoContainer}
                        >
                            <Text style={styles.alumnoNombre}>
                            {`${student.vchNombre} ${student.vchAPaterno} ${student.vchAMaterno}`}
                            </Text>
                            <Text style={styles.alumnoCurp}>
                            CURP: {student.vchCurpAlumno}
                            </Text>
                            <Divider style={styles.divider} />
                        </View>
                        ))
                    ) : (
                        <Text style={styles.noAlumnosText}>
                        No hay alumnos para los filtros seleccionados.
                        </Text>
                    )}
                    </ScrollView>
                </View>
                </Card.Content>
            </Card>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f0f0f0" },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    alumnosContainer: { maxHeight: 350, marginTop: 10 },
    alumnoContainer: {
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        marginBottom: 10,
    },
    alumnoNombre: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
    alumnoCurp: { fontSize: 14, color: "#555", textAlign: "center", marginTop: 4 },
    divider: { marginVertical: 10 },
    noAlumnosText: {
        textAlign: "center",
        fontSize: 16,
        color: "#777",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#800020",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    dropdownContainer: {
        marginBottom: 15,
    },
    dropdown: {
        borderColor: "#c4c4c4",
        backgroundColor: "#fff",
    },
});