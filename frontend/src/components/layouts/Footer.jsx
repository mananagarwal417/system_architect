import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 mt-20 ">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 text-sm text-slate-400">

        {/* Brand */}
        <div>
          <h3 className="text-indigo-400 font-semibold mb-2">
            System Designer
          </h3>
          <p>
            Visualize, design, and explain scalable system
            architectures.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white mb-2">Product</h4>
          <ul className="space-y-1">
            <li>Designer</li>
            <li>Templates</li>
            <li>Explain Mode</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white mb-2">Connect</h4>
          <div className="flex gap-4 mt-2">
            <Github className="hover:text-white cursor-pointer" />
            <Linkedin className="hover:text-white cursor-pointer" />
            <Mail className="hover:text-white cursor-pointer" />
          </div>
        </div>

      </div>

      <div className="text-center text-xs text-slate-500 pb-6">
        © {new Date().getFullYear()} System Designer. All rights reserved.
      </div>
    </footer>
  );
}
