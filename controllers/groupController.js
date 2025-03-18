const Group = require("../models/groupModel");

// Obtener todos los grupos
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los grupos" });
  }
};

// Obtener un grupo por ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el grupo" });
  }
};

// Crear un nuevo grupo
exports.createGroup = async (req, res) => {
  try {
    const { name, professor } = req.body;
    const newGroup = new Group({ name, professor });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el grupo" });
  }
};

// Eliminar un grupo por ID
exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }
    res.status(200).json({ message: "Grupo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el grupo" });
  }
};
