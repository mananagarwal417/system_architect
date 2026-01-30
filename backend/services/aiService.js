import openai from "../config/openai.js";

function buildArchitectureText(nodes, edges) {
  let text = "System Architecture Diagram\n\n";

  text += "Components:\n";
  nodes.forEach((node) => {
    text += `- ${node.data.label}\n`;
  });

  text += "\nConnections:\n";

  edges.forEach((edge) => {
    const from = nodes.find((n) => n.id === edge.source);
    const to = nodes.find((n) => n.id === edge.target);

    if (from && to) {
      text += `${from.data.label} → ${to.data.label}\n`;
    }
  });

  return text;
}

export const getAIExplanation = async (nodes, edges) => {
  const architectureText = buildArchitectureText(nodes, edges);
console.log("Calling OpenAI...");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a senior system design interviewer. Explain architectures clearly.",
      },
      {
        role: "user",
        content: `
${architectureText}

Explain this system architecture step by step.
Include:
- request flow
- why each component is used
- scalability considerations
- possible bottlenecks
        `,
      },
    ],
    temperature: 0.3,
  });

  return completion.choices[0].message.content;
};
