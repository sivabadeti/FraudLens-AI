import { Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        
        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight">
              FraudLens<span className="text-orange-500">A</span>
              <span className="text-green-400">I</span>
            </h2>

            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">
              Fraud Intelligence
            </p>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              An AI-powered fraud detection platform that analyzes transaction
              patterns, identifies suspicious activity, and provides
              explainable risk insights.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              
              {/* GitHub */}
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:text-orange-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.2-3.37-1.2-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.08 1.53 1.08.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.06A9.25 9.25 0 0112 6.9c.85 0 1.7.12 2.5.35 1.91-1.34 2.75-1.06 2.75-1.06.55 1.43.2 2.49.1 2.75.64.73 1.03 1.65 1.03 2.78 0 3.98-2.35 4.85-4.58 5.11.36.33.68.96.68 1.94 0 1.4-.01 2.53-.01 2.87 0 .27.18.6.69.49A10.24 10.24 0 0022 12.23C22 6.58 17.52 2 12 2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:text-green-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zm1.78 13.02H3.56V9h3.56v11.45z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:your-email@example.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:text-orange-400"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Platform
            </h3>

            <ul className="mt-5 space-y-3">
              {[
                "Analyze Transaction",
                "Live Monitor",
                "Model Insights",
                "Data Pipeline",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-orange-400"
                  >
                    {item}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Project
            </h3>

            <ul className="mt-5 space-y-3">
              {[
                "About Project",
                "Machine Learning Model",
                "Technology Stack",
                "Documentation",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-green-400"
                  >
                    {item}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="my-10 border-t border-slate-800" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} FraudLensAI. All rights reserved.
          </p>

          <p>
            Built with React, Machine Learning & Explainable AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;