import { useState, useEffect } from "react";
import { Alert } from "react-native";
 
const useFetchUser = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
 
  // Estados para la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
 
  // Obtener usuarios desde la API
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };
 
  // Guardar nuevo usuario en la API
  const handleGuardar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }
 
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });
 
      if (response.ok) {
        Alert.alert("Éxito", "Usuario guardado correctamente");
        setNombre("");
        setEdad("");
        setCorreo("");
        fetchUsuarios(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo guardar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar los datos");
    }
  };

  //Parte para eliminar el usuario
  const handleDelete = async (id) => {
    console.log({ message: "Eliminando ID: " + id })
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.ok) {
        Alert.alert("Exito", "Usuario Eliminado correctamente")
        fetchUsuarios() //Actualiza lista
      } else {
        Alert.alert("Error", "Ocurrio un error al eliminar el usuario")
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al eliminar los datos");
    }
  };

  //Parte para actualizar los usuarios
  const handleUpdate = async (id) => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    } else{
      console.log({ message: "Id del Usuario que se esta Actualizando: " + id })
    }
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });
      if (response.ok) {
        Alert.alert("Éxito", "Usuario actualizado correctamente");
        setNombre("");
        setEdad("");
        setCorreo("");
        fetchUsuarios(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo actualizar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar los datos");
    }
  }
 
  // Ejecutar al cargar componente
  useEffect(() => {
    fetchUsuarios();
    console.log("actualizando en useEffect");
  }, []);
 
  return {
    nombre,
    setNombre,
    edad,
    setEdad,
    correo,
    setCorreo,
    handleGuardar,
    handleDelete,
    handleUpdate,
    usuarios,
    loading,
    fetchUsuarios,
  };
};
 
export default useFetchUser;