export function explainArchitecture(nodes, edges) {
  const labels = nodes.map((n) => n.data.label.toLowerCase());

  const explanation = [];

  // Request flow
  explanation.push(
    "Client sends request to the system entry point."
  );

  if (labels.includes("load balancer")) {
    explanation.push(
      "Load balancer distributes incoming traffic across multiple servers."
    );
  }

  if (labels.includes("api server")) {
    explanation.push(
      "API servers handle business logic and remain stateless."
    );
  }

  if (labels.includes("cache")) {
    explanation.push(
      "Cache reduces database load and improves response time."
    );
  }

  if (labels.includes("database")) {
    explanation.push(
      "Database stores persistent application data."
    );
  }

  // Bottlenecks
  if (!labels.includes("load balancer")) {
    explanation.push(
      "⚠️ Single server detected — potential bottleneck under high traffic."
    );
  }

  // Scaling
  explanation.push(
    "📈 Horizontal scaling can be applied by adding more API servers."
  );

  return explanation;
}
