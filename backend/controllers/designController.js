import Design from "../models/Design.js";

export const saveDesign = async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;

    const design = await Design.create({
      name,
      nodes,
      edges,
      user: req.user.id,
    });

    res.status(201).json(design);
  } catch (err) {
    console.error("SAVE DESIGN ERROR:", err.message);

    res.status(400).json({
      error: err.message,
    });
  }
};

export const getMyDesigns = async (req, res) => {
  try {
    const designs = await Design.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDesign = async (req, res) => {
  try {
    const design = await Design.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!design) {
      return res.status(404).json({
        message: "Design not found",
      });
    }

    await design.deleteOne();

    res.json({ message: "Design deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
