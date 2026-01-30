// export const generateExplanation = async (nodes, edges) => {
//   const labels = nodes.map((n) =>
//     n.data.label.toLowerCase()
//   );

//   let explanation = "";

//   explanation += "The system receives requests from clients. ";

//   if (labels.includes("load balancer")) {
//     explanation +=
//       "A load balancer distributes traffic across multiple servers. ";
//   } else {
//     explanation +=
//       "Since there is no load balancer, the system may face scaling issues. ";
//   }

//   if (labels.includes("api server")) {
//     explanation +=
//       "API servers handle business logic and remain stateless. ";
//   }

//   if (labels.includes("cache")) {
//     explanation +=
//       "A caching layer improves performance by reducing database queries. ";
//   }

//   if (labels.includes("database")) {
//     explanation +=
//       "The database stores persistent application data. ";
//   }

//   explanation +=
//     "Horizontal scaling can be achieved by adding more application servers.";

//   return explanation;
// };



export const generateExplanation = (nodes, edges) => {
  const explanation = [];

  if (!nodes || nodes.length === 0) {
    return ["No components found in the architecture."];
  }

  // ======================
  // COMPONENT OVERVIEW
  // ======================
  explanation.push(
    `This system contains ${nodes.length} major components.`
  );

  const nodeMap = {};
  nodes.forEach((n) => {
    nodeMap[n.id] = n.data.label;
  });

  // ======================
  // REQUEST FLOW
  // ======================
  if (edges.length > 0) {
    explanation.push("");
    explanation.push("Request Flow:");

    edges.forEach((edge) => {
      const from = nodeMap[edge.source];
      const to = nodeMap[edge.target];

      if (from && to) {
        explanation.push(
          `• Requests move from ${from} to ${to}.`
        );
      }
    });
  }

  // ======================
  // COMPONENT ROLES
  // ======================
  explanation.push("");
  explanation.push("Component Responsibilities:");

  nodes.forEach((node) => {
    const label = node.data.label.toLowerCase();

    if (label.includes("client")) {
      explanation.push(
        "• Client initiates requests and interacts with the system."
      );
    } else if (label.includes("gateway")) {
      explanation.push(
        "• API Gateway routes incoming traffic to backend services."
      );
    } else if (label.includes("load")) {
      explanation.push(
        "• Load Balancer distributes traffic across servers."
      );
    } else if (label.includes("server")) {
      explanation.push(
        "• Application Server handles business logic."
      );
    } else if (label.includes("cache")) {
      explanation.push(
        "• Cache improves performance by storing frequently accessed data."
      );
    } else if (label.includes("database")) {
      explanation.push(
        "• Database stores persistent application data."
      );
    } else {
      explanation.push(
        `• ${node.data.label} plays a supporting role in the system.`
      );
    }
  });

  // ======================
  // SCALABILITY NOTES
  // ======================
  explanation.push("");
  explanation.push("Scalability Considerations:");

  explanation.push(
    "• Stateless services can be horizontally scaled."
  );
  explanation.push(
    "• Caching reduces database load and improves latency."
  );
  explanation.push(
    "• Load balancers prevent single-server bottlenecks."
  );

  return explanation;
};

