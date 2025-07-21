import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CardUser = ({ user, onUpdate, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{user.nombre}</Text>
      <Text style={styles.cardText}>Edad: {user.edad}</Text>
      <Text style={styles.cardText}>Correo: {user.correo}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={() => onUpdate(user)}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(user)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5C3D2E',
    marginBottom: 5
  },
  cardText: {
    fontSize: 16,
    color: '#3B2C24'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  updateButton: {
    backgroundColor: '#1976D2', // Azul
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#D32F2F', // Rojo
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  }
});

export default CardUser;
