import Architecture from "../models/Architecture.js";

export const saveDesign = async (req, res) => {
  const design = await Architecture.create({
    user: req.user._id,
    name: req.body.name,
    nodes: req.body.nodes,
    edges: req.body.edges,
  });

  res.json(design);
};

export const getMyDesigns = async (req, res) => {
  const designs = await Architecture.find({
    user: req.user._id,
  });

  res.json(designs);
};
