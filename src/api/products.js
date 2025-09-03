// src/api/tasks.js

// Hacer un fetch simple para obtener todas las tareas
export const getProducts = async () => {
  try {
    // Petición GET al backend (Render)
    const response = await fetch(
      "https://corregir-xl06.onrender.com/api",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Aquí podrías agregar más cabeceras si lo necesitas, como autorización
          // 'Authorization': 'Bearer TU_TOKEN'
        },
      }
    );

    // Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("No se pudo obtener la información");
    }

    // Convertimos la respuesta a un objeto
    const result = await response.json();

    // Devolvemos los datos en una estructura { data: ... }
    return { data: result };
  } catch (error) {
    // Si ocurre un error, lo enviamos como una Promesa rechazada
    return Promise.reject(error);
  }
};

// Crear una tarea
export const createTask = async (task) => {
  try {
    const response = await fetch(
      "https://corregir-xl06.onrender.com/api",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear la tarea");
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Obtener una tarea por id
export const getTask = async (id) => {
  try {
    const response = await fetch(`https://corregir-xl06.onrender.com/api/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener la tarea");
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Eliminar tarea por id
export const deleteTaskapi = async (id) => {
  try {
    const response = await fetch(
      `https://corregir-xl06.onrender.com/api/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }

    return { data: { message: "Tarea eliminada exitosamente" } };
  } catch (error) {
    return Promise.reject(error);
  }
};

// Actualizar tarea por id
export const updateTask2 = async (id, task) => {
  try {
    const response = await fetch(
      `https://corregir-xl06.onrender.com/api/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return Promise.reject(error);
  }
};
