import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layers, Cpu, Database, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";




export default function Home() {
  const navigate = useNavigate();

const handleStartDesigning = () => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/designer");
  } else {
    navigate("/login");
  }
};
  return (
    <div className="pt-32 px-6">

      {/* HERO */}
      <section className="text-center mb-32">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-6"
        >
          Design Scalable Systems <br />
          <span className="text-indigo-400">Visually</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 max-w-xl mx-auto"
        >
          Build, visualize, and explain system architectures including
          load balancers, databases, caching layers, message queues,
          and microservices.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-10"
        >
          <button
  onClick={handleStartDesigning}
  className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition"
>
  Start Designing →
</button>

        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto mb-32">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why System Designer?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: Layers,
              title: "Visual Architecture",
              desc: "Design complex systems using an intuitive drag and drop interface."
            },
            {
              icon: Cpu,
              title: "Explain Mode",
              desc: "Automatically understand request flow, bottlenecks, and scaling strategies."
            },
            {
              icon: Database,
              title: "Real World Components",
              desc: "Use databases, caches, queues, and load balancers just like real systems."
            },
            {
              icon: Zap,
              title: "Interview Ready",
              desc: "Perfect for system design interviews and architecture practice."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6"
            >
              <item.icon className="text-indigo-400 mb-4" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto mb-32 text-center">
        <h2 className="text-3xl font-semibold mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Design",
              desc: "Drag system components onto the canvas and connect them."
            },
            {
              step: "02",
              title: "Analyze",
              desc: "Use explain mode to understand request flow and bottlenecks."
            },
            {
              step: "03",
              title: "Improve",
              desc: "Optimize architecture for scalability and performance."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <div className="text-indigo-400 text-4xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-6xl mx-auto mb-32">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Perfect For
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            "System Design Interviews",
            "Backend Architecture Learning",
            "Microservices Visualization",
            "Scalability Planning",
            "Teaching & Learning",
            "Architecture Documentation"
          ].map((use, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-slate-900 border border-white/10 rounded-xl"
            >
              {use}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center mb-32">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold mb-6"
        >
          Start Designing Smarter Systems
        </motion.h2>

        <button
  onClick={handleStartDesigning}
  className="px-10 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition"
>
  Launch Designer →
</button>

      </section>

    </div>
  );
}
