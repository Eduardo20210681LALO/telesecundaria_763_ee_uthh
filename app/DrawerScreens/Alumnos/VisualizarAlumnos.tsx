import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Button,TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card, Divider, Text } from 'react-native-paper';
import { UserContext } from '../UsertContext';
import axios from 'axios';

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

type Alumno = {
    vchCurpAlumno: string;
    vchNombre: string;
    vchAPaterno: string;
    vchAMaterno: string;
};

export default function VisualizarAlumnos() {
    const { user } = useContext(UserContext);

    const [periodos, setPeriodos] = useState<{ label: string; value: string }[]>([]);
    const [grados, setGrados] = useState<{ label: string; value: string }[]>([]);
    const [grupos, setGrupos] = useState<{ label: string; value: string }[]>([]);
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);

    // Estados de dropdown
    const [openPeriodo, setOpenPeriodo] = useState(false);
    const [selectedPeriodo, setSelectedPeriodo] = useState<string | null>(null);

    const [openGrado, setOpenGrado] = useState(false);
    const [selectedGrado, setSelectedGrado] = useState<string | null>(null);

    const [openGrupo, setOpenGrupo] = useState(false);
    const [selectedGrupo, setSelectedGrupo] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerPeriodos.php')
            .then(res => {
                const data = res.data.map((periodo: Periodo) => ({
                    label: periodo.vchPeriodo,
                    value: String(periodo.intClvPeriodo),
                }));
                setPeriodos(data);
            })
            .catch(err => console.error('Error al obtener periodos:', err));

        axios
            .get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrados.php')
            .then(res => {
                const data = res.data.map((grado: Grado) => ({
                    label: grado.vchGrado,
                    value: String(grado.intClvGrado),
                }));
                setGrados(data);
            })
            .catch(err => console.error('Error al obtener grados:', err));

        axios
            .get('https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/AdminAlumnos/ObtenerGrupos.php')
            .then(res => {
                const data = res.data.map((grupo: Grupo) => ({
                    label: grupo.vchGrupo,
                    value: String(grupo.intClvGrupo),
                }));
                setGrupos(data);
            })
            .catch(err => console.error('Error al obtener grupos:', err));
    }, []);

    const buscarAlumnos = () => {
        if (selectedPeriodo && selectedGrado && selectedGrupo && user?.id_usuario) {
            axios
                .get(`https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/Docentes/TraerAlumnosPorDocente.php?periodo=${selectedPeriodo}&grado=${selectedGrado}&grupo=${selectedGrupo}&docenteId=${user.id_usuario}`)
                .then(res => {
                    console.log("Alumnos:", res.data);
                    if (res.data.success) {
                        setAlumnos(res.data.alumnos);
                    } else {
                        setAlumnos([]);
                    }
                })
                .catch(err => console.error('Error al obtener alumnos:', err));
        } else {
            console.log("Seleccione todos los filtros.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Alumnos Por Grupo</Text>

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
                    
                    <TouchableOpacity style={styles.button} onPress={buscarAlumnos} activeOpacity={0.7}>
                            <Text style={styles.buttonText}>Buscar Alumnos</Text>
                    </TouchableOpacity>

                    {/* Lista de Alumnos */}
                    <View style={styles.alumnosContainer}>
                        {alumnos.length > 0 ? (
                            <ScrollView>
                                {alumnos.map(alumno => (
                                    <View key={alumno.vchCurpAlumno} style={styles.alumnoContainer}>
                                        <Text style={styles.alumnoNombre}>{`${alumno.vchNombre} ${alumno.vchAPaterno} ${alumno.vchAMaterno}`}</Text>
                                        <Text style={styles.alumnoCurp}>CURP: {alumno.vchCurpAlumno}</Text>
                                        <Divider style={styles.divider} />
                                    </View>
                                ))}
                            </ScrollView>
                        ) : (
                            <Text style={styles.noAlumnosText}>No hay alumnos para los filtros seleccionados.</Text>
                        )}
                    </View>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    card: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#c4c4c4',
    },
    dropdownContainer: {
        marginBottom: 15,
        width: '100%',
    },
    alumnosContainer: {
        maxHeight: 450,
        marginTop: 10,
    },
    alumnoContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    alumnoNombre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    alumnoCurp: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginTop: 4,
    },
    divider: {
        marginVertical: 10,
        backgroundColor: '#ddd',
    },
    noAlumnosText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 15,
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
});
