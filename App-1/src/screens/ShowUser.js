import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CardUser from "../components/Users/CardUser";
import useFetchUser from "../hooks/useFetchUser";

const ShowUser = () => {
  const {
    usuarios,
    loading,
    fetchUsuarios,
    handleDelete,
    handleUpdate,
    nombre,
    setNombre,
    edad,
    setEdad,
    correo,
    setCorreo,
  } = useFetchUser();

  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);

  // Actualiza usuarios al enfocar esta pantalla
  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [])
  );

  const abrirModalEdicion = (user) => {
    setNombre(user.nombre);
    setEdad(String(user.edad));
    setCorreo(user.correo);
    setUsuarioId(user.id);
    setModalVisible(true);
  };

  const guardarActualizacion = () => {
    handleUpdate(usuarioId);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <Text style={styles.subtitle}>
        Consulta los usuarios registrados desde la API
      </Text>

      {!loading && (
        <Text style={styles.counterText}>
          Total de usuarios: {usuarios.length}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#5C3D2E" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <CardUser
              user={item}
              onUpdate={() => abrirModalEdicion(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Modal para editar usuario */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Usuario</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Edad"
              value={edad}
              onChangeText={setEdad}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={guardarActualizacion}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8C0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  listContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 10,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B2C24",
    textAlign: "center",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#5C3D2E",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#A3C4BC",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#E7717D",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ShowUser;
