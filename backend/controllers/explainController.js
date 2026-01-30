// import { generateExplanation } from "../services/explainService.js";
// import { getAIExplanation } from "../services/aiService.js";

// export const explainArchitecture = async (req, res) => {
//   try {
//     const { nodes, edges, mode } = req.body;

//     if (!nodes || !edges) {
//       return res.status(400).json({
//         message: "Nodes and edges are required",
//       });
//     }

//     let explanation;

//     if (mode === "ai") {
//       try {
//         explanation = await getAIExplanation(nodes, edges);
//       } catch (err) {
//         console.error("AI failed, using fallback");

//         explanation = generateExplanation(nodes, edges);
//       }
//     } else {
//       explanation = generateExplanation(nodes, edges);
//     }

//     res.json({ explanation });
//   } catch (error) {
//     console.error("Explain error:", error);
//     res.status(500).json({
//       message: "Failed to explain architecture",
//     });
//   }
// };


import { generateExplanation } from "../services/explainService.js";
import { getAIExplanation } from "../services/aiService.js";

export const explainArchitecture = async (req, res) => {
  try {
    const { nodes, edges, mode } = req.body;

    console.log("Explain request received");
    console.log("Nodes:", nodes.length);
    console.log("Edges:", edges.length);

    let explanation;

    if (mode === "ai") {
      try {
        explanation = await getAIExplanation(nodes, edges);
      } catch (err) {
        console.log("AI failed — using rule based");
        explanation = generateExplanation(nodes, edges);
      }
    } else {
      explanation = generateExplanation(nodes, edges);
    }

    res.json({ explanation });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Explain failed",
    });
  }
};
