import { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";
import type { Servicio } from '../../types/index';
import * as FaIcons from "react-icons/fa";

const iconosDisponibles = [
  "FaTags",
  "FaQrcode",
  "FaLightbulb",
  "FaPaintBrush",
  "FaGift",
  "FaShoppingBag",
  "FaPrint",
];

const ServiciosManager = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(false);
  const [subiendoIcono, setSubiendoIcono] = useState(false);
  const [editando, setEditando] = useState<Servicio | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    icono: "",
    iconoURL: "", // Para imágenes personalizadas
  });

  const obtenerServicios = async () => {
    const snapshot = await getDocs(collection(db, "servicios"));
    setServicios(
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Servicio[]
    );
  };

  useEffect(() => {
    obtenerServicios();
  }, []);

  const manejarSubidaIcono = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const archivo = e.target.files[0];
    setSubiendoIcono(true);
    try {
      const storageRef = ref(storage, `servicios/iconos/${archivo.name}`);
      await uploadBytes(storageRef, archivo);
      const urlDescargada = await getDownloadURL(storageRef);
      setFormData({ ...formData, iconoURL: urlDescargada, icono: "" }); // Prioridad imagen
      toast.success("Ícono subido correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al subir el ícono");
    } finally {
      setSubiendoIcono(false);
    }
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo || !formData.descripcion || (!formData.icono && !formData.iconoURL)) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const data = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        icono: formData.icono,
        iconoURL: formData.iconoURL,
      };
      if (editando) {
        await updateDoc(doc(db, "servicios", editando.id), data);
        toast.success("Servicio actualizado");
      } else {
        await addDoc(collection(db, "servicios"), data);
        toast.success("Servicio agregado");
      }
      setFormData({ titulo: "", descripcion: "", icono: "", iconoURL: "" });
      setEditando(null);
      obtenerServicios();
    } catch {
      toast.error("Error al guardar el servicio");
    } finally {
      setLoading(false);
    }
  };

  const eliminarServicio = async (id: string) => {
    if (!confirm("¿Eliminar este servicio?")) return;
    await deleteDoc(doc(db, "servicios", id));
    toast.success("Servicio eliminado");
    obtenerServicios();
  };

  const editarServicio = (servicio: Servicio) => {
    setEditando(servicio);
    setFormData({
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      icono: servicio.icono || "",
      iconoURL: (servicio as any).iconoURL || "",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestionar Servicios</h2>
      <form onSubmit={manejarSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Título"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        {/* Selector visual de íconos */}
        <div>
          <p className="mb-2 font-semibold">Seleccionar ícono (opcional):</p>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {iconosDisponibles.map((iconName) => {
              const IconComp = (FaIcons as any)[iconName];
              return (
                <button
                  type="button"
                  key={iconName}
                  className={`p-2 border rounded hover:bg-gray-100 ${
                    formData.icono === iconName
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, icono: iconName, iconoURL: "" })
                  }
                >
                  <IconComp size={28} className="text-gray-700" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Subida de ícono personalizado */}
        <div>
          <p className="mb-2 font-semibold">Subir ícono personalizado (opcional):</p>
          <input
            type="file"
            accept="image/*"
            onChange={manejarSubidaIcono}
            className="block mb-2"
          />
          {subiendoIcono && <p className="text-sm text-gray-500">Subiendo ícono...</p>}
          {formData.iconoURL && (
            <img
              src={formData.iconoURL}
              alt="Ícono seleccionado"
              className="h-12 mt-2 mx-auto"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : editando ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/* Lista de servicios */}
      <ul className="space-y-3">
        {servicios.map((servicio) => {
          const IconComp = (FaIcons as any)[servicio.icono];
          return (
            <li
              key={servicio.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded"
            >
              <div className="flex items-center gap-3">
                {servicio.iconoURL ? (
                  <img src={servicio.iconoURL} alt="Ícono" className="h-8 w-8" />
                ) : IconComp ? (
                  <IconComp size={24} className="text-gray-700" />
                ) : (
                  <span className="text-gray-400 text-sm">Sin ícono</span>
                )}
                <div>
                  <h3 className="font-semibold">{servicio.titulo}</h3>
                  <p className="text-sm">{servicio.descripcion}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editarServicio(servicio)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarServicio(servicio.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ServiciosManager;
