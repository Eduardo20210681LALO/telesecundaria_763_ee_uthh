import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Divider, Modal, Portal, Provider as PaperProvider } from 'react-native-paper';
import { UserContext } from '../UsertContext';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

type Alumno = { vchCurpAlumno: string; vchNombre: string; vchAPaterno: string; vchAMaterno: string; };
type Calificacion = { materia: string; M1: number; M2: number; M3: number; Final: number; };

export default function VisualizarCalificaciones() {
    const { user } = useContext(UserContext);

    const [studentsData, setStudentsData] = useState<Alumno[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Alumno | null>(null);
    const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);

    const [periodos, setPeriodos] = useState<{ label: string; value: string }[]>([]);
    const [grados, setGrados] = useState<{ label: string; value: string }[]>([]);
    const [grupos, setGrupos] = useState<{ label: string; value: string }[]>([]);

    const [selectedPeriodo, setSelectedPeriodo] = useState<string>('');
    const [selectedGrado, setSelectedGrado] = useState<string>('');
    const [selectedGrupo, setSelectedGrupo] = useState<string>('');

    const [openPeriodo, setOpenPeriodo] = useState(false);
    const [openGrado, setOpenGrado] = useState(false);
    const [openGrupo, setOpenGrupo] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php')
            .then(res => {
                const formattedPeriodos = res.data.map((periodo: any) => ({
                    label: periodo.vchPeriodo,
                    value: String(periodo.intClvPeriodo)
                }));
                setPeriodos(formattedPeriodos);
            })
            .catch(err => console.error('Error al obtener periodos:', err));

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php')
            .then(res => {
                const formattedGrados = res.data.map((grado: any) => ({
                    label: grado.vchGrado,
                    value: String(grado.intClvGrado)
                }));
                setGrados(formattedGrados);
            })
            .catch(err => console.error('Error al obtener grados:', err));

        axios.get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')
            .then(res => {
                const formattedGrupos = res.data.map((grupo: any) => ({
                    label: grupo.vchGrupo,
                    value: String(grupo.intClvGrupo)
                }));
                setGrupos(formattedGrupos);
            })
            .catch(err => console.error('Error al obtener grupos:', err));
    }, []);

    const fetchStudents = () => {
        if (selectedPeriodo && selectedGrado && selectedGrupo && user?.id_usuario) {
            axios.get(`https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Docentes/TraerAlumnosPorDocente.php?periodo=${selectedPeriodo}&grado=${selectedGrado}&grupo=${selectedGrupo}&docenteId=${user.id_usuario}`)
                .then(res => setStudentsData(Array.isArray(res.data.alumnos) ? res.data.alumnos : []))
                .catch(err => console.error('Error al obtener alumnos:', err));
        }
    };

    const handleStudentSelect = (student: Alumno) => {
        setSelectedStudent(student);
        fetchCalificaciones(student.vchCurpAlumno, selectedPeriodo, selectedGrado, selectedGrupo);
        showModal();
    };

    const fetchCalificaciones = (matricula: string, periodo: string, grado: string, grupo: string) => {
        axios.get(`https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Docentes/ObtenerCalificaciones.php?matricula=${matricula}&periodo=${periodo}&grado=${grado}&grupo=${grupo}`)
            .then(response => setCalificaciones(Array.isArray(response.data.calificaciones) ? response.data.calificaciones : []))
            .catch(error => console.error('Error al obtener calificaciones:', error));
    };

    const calcularPromedio = () => {
        if (calificaciones.length === 0) return '0.00';
        const sum = calificaciones.reduce((total, item) => total + item.Final, 0);
        return (sum / calificaciones.length).toFixed(2);
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.header}>Visualizar Calificaciones</Text>

                <Card style={styles.card}>
                    <Card.Content>
                        {/* Dropdown de Periodo */}
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
                        {/* Dropdown de Grado */}
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
                        {/* Dropdown de Grupo */}
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
                        <TouchableOpacity style={styles.button} onPress={fetchStudents} activeOpacity={0.7}>
                            <Text style={styles.buttonText}>Buscar Alumnos</Text>
                        </TouchableOpacity>

                        {/* Lista de Alumnos */}
                        <View style={styles.alumnosContainer}>
                            <ScrollView>
                                {studentsData.length > 0 ? (
                                    studentsData.map((student) => (
                                        <View key={student.vchCurpAlumno} style={styles.alumnoContainer}>
                                            <Text style={styles.alumnoNombre}>{`${student.vchNombre} ${student.vchAPaterno} ${student.vchAMaterno}`}</Text>
                                            <Text style={styles.alumnoCurp}>CURP: {student.vchCurpAlumno}</Text>
                                            <TouchableOpacity onPress={() => handleStudentSelect(student)} style={styles.selectButton} activeOpacity={0.7}>
                                                <Text style={styles.selectButtonText}>Seleccionar</Text>
                                            </TouchableOpacity>
                                            <Divider style={styles.divider} />
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.noAlumnosText}>No hay alumnos para los filtros seleccionados.</Text>
                                )}
                            </ScrollView>
                        </View>
                    </Card.Content>
                </Card>

                {/* Modal para mostrar calificaciones */}
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        {selectedStudent && (
                            <>
                                <Text style={styles.modalTitle}>Calificaciones obtenidas por: {selectedStudent.vchNombre} {selectedStudent.vchAPaterno} {selectedStudent.vchAMaterno}</Text>
                                <ScrollView style={styles.calificacionesTable}>
                                    <View style={styles.tableHeader}>
                                        <Text style={styles.tableHeaderText}>Materia</Text>
                                        <Text style={styles.tableHeaderText}>M1</Text>
                                        <Text style={styles.tableHeaderText}>M2</Text>
                                        <Text style={styles.tableHeaderText}>M3</Text>
                                        <Text style={styles.tableHeaderText}>Final</Text>
                                    </View>
                                    {calificaciones.map((calificacion, index) => (
                                        <View key={index} style={styles.tableRow}>
                                            <Text style={styles.tableCell}>{calificacion.materia}</Text>
                                            <Text style={styles.tableCell}>{calificacion.M1}</Text>
                                            <Text style={styles.tableCell}>{calificacion.M2}</Text>
                                            <Text style={styles.tableCell}>{calificacion.M3}</Text>
                                            <Text style={styles.tableCell}>{calificacion.Final}</Text>
                                        </View>
                                    ))}
                                    <Divider style={styles.divider} />
                                    <Text style={styles.promedioText}>Promedio: {calcularPromedio()}</Text>
                                </ScrollView>
                            </>
                        )}
                    </Modal>
                </Portal>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    card: { padding: 10, borderRadius: 8, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    alumnosContainer: { maxHeight: 350, marginTop: 10 },
    alumnoContainer: { padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 10 },
    alumnoNombre: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
    alumnoCurp: { fontSize: 14, color: '#555', textAlign: 'center', marginTop: 4 },
    divider: { marginVertical: 10 },
    noAlumnosText: { textAlign: 'center', fontSize: 16, color: '#777', marginTop: 20 },
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
    modalContainer: { backgroundColor: 'white', padding: 20, borderRadius: 10, maxHeight: '100%' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    calificacionesTable: { marginTop: 10 },
    tableHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, backgroundColor: '#e0e0e0' },
    tableHeaderText: { fontWeight: 'bold', flex: 1, textAlign: 'center' },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
    tableCell: { flex: 1, textAlign: 'center' },
    promedioText: { fontWeight: 'bold', marginTop: 10, textAlign: 'right' },
    selectButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdownContainer: {
        marginBottom: 15,
    },
    dropdown: {
        borderColor: '#c4c4c4',
        backgroundColor: '#fff',
    },
});
