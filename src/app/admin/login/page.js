"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { login } from "@/lib/auth";

/* ---------- Small inline icons (no extra dependency) ---------- */
const MailIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LockIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const EyeIcon = ({ off, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="m4 4 16 16" />}
  </svg>
);

const CheckIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m5 12 5 5L20 7" />
  </svg>
);

const AlertIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16.5h.01" />
  </svg>
);

/* ---------- Animation variants ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const features = [
  { title: "Quotes", text: "Review and respond to incoming quote requests." },
  {
    title: "Enquiries",
    text: "Reply to customers straight from the dashboard.",
  },
  { title: "Site content", text: "Update services, industries and images." },
];

/* ---------- Animated background blobs ---------- */
function Blobs({ reduce, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-crimson/30 blur-3xl sm:h-96 sm:w-96"
        animate={
          reduce
            ? undefined
            : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl sm:h-[28rem] sm:w-[28rem]"
        animate={
          reduce
            ? undefined
            : { x: [0, -50, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-crimson/20 blur-3xl"
        animate={
          reduce ? undefined : { y: [0, 30, 0], opacity: [0.5, 0.9, 0.5] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
    </div>
  );
}

/* ---------- Animated logistics route ---------- */
function RouteAnimation({ reduce }) {
  const path = "M10 150 C 90 150, 80 40, 170 60 S 270 150, 350 50";
  return (
    <svg
      viewBox="0 0 360 180"
      className="h-auto w-full max-w-md"
      fill="none"
      aria-hidden="true"
    >
      {/* faint base route */}
      <path
        d={path}
        stroke="white"
        strokeOpacity="0.12"
        strokeWidth="2"
        strokeDasharray="4 8"
        strokeLinecap="round"
      />
      {/* animated drawn route */}
      <motion.path
        d={path}
        className="stroke-crimson"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 0.85, 1],
        }}
      />
      {/* stops */}
      {[
        [10, 150],
        [170, 60],
        [350, 50],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <motion.circle
            cx={cx}
            cy={cy}
            r="10"
            className="fill-crimson/30"
            animate={
              reduce ? undefined : { r: [6, 14, 6], opacity: [0.8, 0, 0.8] }
            }
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
          />
          <circle cx={cx} cy={cy} r="5" className="fill-white" />
        </g>
      ))}
    </svg>
  );
}

/* ---------- Page ---------- */
export default function AdminLoginPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      setSuccess(true);
      router.push("/admin");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "peer w-full rounded-lg border border-navy-200 bg-white py-3 pl-11 text-sm text-navy-900 placeholder:text-navy-400/70 transition-all duration-200 hover:border-navy-400 focus:border-crimson focus:outline-none focus:ring-4 focus:ring-crimson/10";

  return (
    <div className="grid min-h-[100dvh] bg-navy-900 lg:grid-cols-2">
      {/* ============ LEFT: Brand panel (desktop only) ============ */}
      <section className="relative hidden overflow-hidden bg-navy-900 lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        <Blobs reduce={reduce} />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-crimson text-xs font-bold text-crimson">
            EL
          </span>
          <span className="text-lg font-bold tracking-wide text-white">
            Crystal Express
          </span>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-lg"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-crimson"
          >
            Admin Dashboard
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-4 text-4xl font-extrabold leading-tight text-white xl:text-5xl"
          >
            Keep every shipment of your site{" "}
            <span className="bg-gradient-to-r from-crimson to-white bg-clip-text text-transparent">
              moving.
            </span>
          </motion.h2>

          <motion.div variants={item} className="mt-10">
            <RouteAnimation reduce={reduce} />
          </motion.div>

          <motion.ul variants={container} className="mt-8 space-y-4">
            {features.map((f) => (
              <motion.li
                key={f.title}
                variants={item}
                whileHover={reduce ? undefined : { x: 6 }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson/20 text-crimson">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <p className="text-sm text-white/70">
                  <span className="font-semibold text-white">{f.title}</span> —{" "}
                  {f.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <p className="relative z-10 text-xs text-white/40">
          © {new Date().getFullYear()} Crystal Express. All rights reserved.
        </p>
      </section>

      {/* ============ RIGHT: Form ============ */}
      <section className="relative flex items-center justify-center overflow-hidden px-4 py-10 sm:px-8 lg:bg-white">
        <Blobs reduce={reduce} className="lg:hidden" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile / tablet brand */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center justify-center gap-3 lg:hidden"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-crimson text-xs font-bold text-crimson">
              EL
            </span>
            <span className="text-base font-bold tracking-wide text-white">
              Crystal Express
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8 lg:p-0 lg:shadow-none"
          >
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.span
                variants={item}
                className="hidden h-10 w-10 items-center justify-center rounded-full border-2 border-crimson text-xs font-bold text-crimson lg:flex"
              >
                EL
              </motion.span>

              <motion.h1
                variants={item}
                className="text-2xl font-bold text-navy-900 sm:text-3xl lg:mt-5"
              >
                Crystal Express Admin
              </motion.h1>
              <motion.p variants={item} className="mt-2 text-sm text-navy-400">
                Sign in to manage quotes, enquiries and site content.
              </motion.p>

              <form
                onSubmit={onSubmit}
                className="mt-8 space-y-5"
                noValidate={false}
              >
                {/* Email */}
                <motion.div variants={item}>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-navy-800"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputClass} pr-4`}
                    />
                    <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400 transition-colors duration-200 peer-focus:text-crimson" />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div variants={item}>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-semibold text-navy-800"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputClass} pr-12`}
                    />
                    <LockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400 transition-colors duration-200 peer-focus:text-crimson" />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-navy-400 transition-colors hover:bg-cream-100 hover:text-navy-800 focus:outline-none focus:ring-2 focus:ring-crimson"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={showPassword ? "off" : "on"}
                          initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="flex"
                        >
                          <EyeIcon off={showPassword} className="h-5 w-5" />
                        </motion.span>
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      key="error"
                      role="alert"
                      initial={{ opacity: 0, height: 0, x: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        x: [0, -8, 8, -6, 6, 0],
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-2 rounded-lg border border-crimson/30 bg-crimson/5 px-3.5 py-3 text-sm font-medium text-crimson-700">
                        <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.div variants={item}>
                  <motion.button
                    type="submit"
                    disabled={loading || success}
                    whileHover={
                      loading || reduce ? undefined : { scale: 1.015, y: -1 }
                    }
                    whileTap={loading ? undefined : { scale: 0.98 }}
                    className="focus-ring group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-crimson px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-crimson/30 transition-colors hover:bg-crimson-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {/* shimmer */}
                    {!reduce && (
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/20"
                        animate={{ x: ["0%", "450%"] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          repeatDelay: 1.6,
                          ease: "easeInOut",
                        }}
                      />
                    )}

                    <AnimatePresence mode="wait" initial={false}>
                      {success ? (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative flex items-center gap-2"
                        >
                          <CheckIcon className="h-5 w-5" /> Redirecting…
                        </motion.span>
                      ) : loading ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative flex items-center gap-2"
                        >
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeOpacity="0.3"
                              strokeWidth="3"
                            />
                            <path
                              d="M21 12a9 9 0 0 0-9-9"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          Signing in…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative flex items-center gap-2"
                        >
                          Sign In
                          <span className="transition-transform duration-200 group-hover:translate-x-1">
                            →
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </form>

             
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
