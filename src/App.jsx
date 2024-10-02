import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Estado inicial de las notas
  const [notas, setNotas] = useState([]);
  const [formData, setFormData] = useState({
    nombreEstudiante: '',
    actividades: '',
    primerParcial: '',
    segundoParcial: '',
    examenFinal: '',
    notaFinal: 0
  });
  
  // Estados para manejar la edición
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validar que el puntaje ingresado no supere el máximo permitido
    const maxValues = {
      actividades: 35,
      primerParcial: 15,
      segundoParcial: 15,
      examenFinal: 35
    };

    if (maxValues[name] && Number(value) > maxValues[name]) {
      alert(`El valor máximo para ${name} es ${maxValues[name]} puntos.`);
      return;
    }

    // Actualizar el estado con el nuevo valor
    const updatedFormData = {
      ...formData,
      [name]: value
    };

    // Calcular la Nota Final si los campos relevantes han cambiado
    if (['actividades', 'primerParcial', 'segundoParcial', 'examenFinal'].includes(name)) {
      const actividades = Number(name === 'actividades' ? value : formData.actividades);
      const primerParcial = Number(name === 'primerParcial' ? value : formData.primerParcial);
      const segundoParcial = Number(name === 'segundoParcial' ? value : formData.segundoParcial);
      const examenFinal = Number(name === 'examenFinal' ? value : formData.examenFinal);

      const notaFinal = actividades + primerParcial + segundoParcial + examenFinal;

      updatedFormData.notaFinal = notaFinal;
    }

    setFormData(updatedFormData);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombreEstudiante, actividades, primerParcial, segundoParcial, examenFinal, notaFinal } = formData;
    
    // Validación para que todos los campos estén completos
    if (!nombreEstudiante || actividades === '' || primerParcial === '' || segundoParcial === '' || examenFinal === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (isEditing) {
      // Guardar los cambios en la nota existente
      const updatedNotas = notas.map((nota) => 
        nota.id === editingId 
          ? { ...nota, nombreEstudiante, actividades: Number(actividades), primerParcial: Number(primerParcial), segundoParcial: Number(segundoParcial), examenFinal: Number(examenFinal), notaFinal: Number(notaFinal) }
          : nota
      );
      setNotas(updatedNotas);
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Crear una nueva nota con los datos ingresados
      const nuevaNota = {
        id: Date.now(),
        nombreEstudiante,
        actividades: Number(actividades),
        primerParcial: Number(primerParcial),
        segundoParcial: Number(segundoParcial),
        examenFinal: Number(examenFinal),
        notaFinal: Number(notaFinal)
      };

      // Añadir la nueva nota al estado
      setNotas([...notas, nuevaNota]);
    }

    // Limpiar el formulario
    setFormData({
      nombreEstudiante: '',
      actividades: '',
      primerParcial: '',
      segundoParcial: '',
      examenFinal: '',
      notaFinal: 0
    });
  };

  // Función para eliminar una nota
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      const updatedNotas = notas.filter((nota) => nota.id !== id);
      setNotas(updatedNotas);
      
      // Si se está editando esta nota, cancelar la edición
      if (isEditing && editingId === id) {
        handleCancel();
      }
    }
  };

  // Función para manejar la edición de una nota
  const handleEdit = (id) => {
    const notaToEdit = notas.find((nota) => nota.id === id);
    setFormData({
      nombreEstudiante: notaToEdit.nombreEstudiante,
      actividades: notaToEdit.actividades,
      primerParcial: notaToEdit.primerParcial,
      segundoParcial: notaToEdit.segundoParcial,
      examenFinal: notaToEdit.examenFinal,
      notaFinal: notaToEdit.notaFinal
    });
    setIsEditing(true);
    setEditingId(id);
  };

  // Función para cancelar la edición
  const handleCancel = () => {
    setFormData({
      nombreEstudiante: '',
      actividades: '',
      primerParcial: '',
      segundoParcial: '',
      examenFinal: '',
      notaFinal: 0
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div id="root">
      <header className="header">
        <h1>Ingreso de Notas</h1>
      </header>
      <div className="note-form">
        <h2>{isEditing ? 'Editar Nota' : 'Ingresar Notas'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombreEstudiante">Nombre Completo del Estudiante:</label>
          <input
            type="text"
            id="nombreEstudiante"
            name="nombreEstudiante"
            value={formData.nombreEstudiante}
            onChange={handleInputChange}
          />
          <label htmlFor="actividades">Actividades (Máximo 35 puntos):</label>
          <input
            type="number"
            id="actividades"
            name="actividades"
            value={formData.actividades}
            onChange={handleInputChange}
            max="35"
            min="0"
          />
          <label htmlFor="primerParcial">Primer Parcial (Máximo 15 puntos):</label>
          <input
            type="number"
            id="primerParcial"
            name="primerParcial"
            value={formData.primerParcial}
            onChange={handleInputChange}
            max="15"
            min="0"
          />
          <label htmlFor="segundoParcial">Segundo Parcial (Máximo 15 puntos):</label>
          <input
            type="number"
            id="segundoParcial"
            name="segundoParcial"
            value={formData.segundoParcial}
            onChange={handleInputChange}
            max="15"
            min="0"
          />
          <label htmlFor="examenFinal">Examen Final (Máximo 35 puntos):</label>
          <input
            type="number"
            id="examenFinal"
            name="examenFinal"
            value={formData.examenFinal}
            onChange={handleInputChange}
            max="35"
            min="0"
          />
          <label htmlFor="notaFinal">Nota Final:</label>
          <input
            type="number"
            id="notaFinal"
            name="notaFinal"
            value={formData.notaFinal}
            readOnly
          />
          <button type="submit">{isEditing ? 'Guardar Cambios' : 'Agregar Nota'}</button>
          {isEditing && <button type="button" onClick={handleCancel}>Cancelar</button>}
        </form>
      </div>

      <div className="notes-table">
        <h2>Listado de Notas</h2>
        {notas.length === 0 ? (
          <p>No hay notas registradas.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre del Estudiante</th>
                <th>Actividades</th>
                <th>Primer Parcial</th>
                <th>Segundo Parcial</th>
                <th>Examen Final</th>
                <th>Nota Final</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota, index) => (
                <tr key={nota.id}>
                  <td>{index + 1}</td>
                  <td>{nota.nombreEstudiante}</td>
                  <td>{nota.actividades}</td>
                  <td>{nota.primerParcial}</td>
                  <td>{nota.segundoParcial}</td>
                  <td>{nota.examenFinal}</td>
                  <td>{nota.notaFinal}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(nota.id)}>
                      Editar
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(nota.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
