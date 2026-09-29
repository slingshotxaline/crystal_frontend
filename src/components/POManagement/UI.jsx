"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/** Fade + slide in once when scrolled into view. Respects reduced motion. */
export function Reveal({
  as = "div",
  delay = 0,
  x = 0,
  y = 20,
  amount = 0.25,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers any <StaggerItem> children. */
export function Stagger({
  as = "div",
  stagger = 0.12,
  delay = 0,
  amount = 0.2,
  className,
  children,
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  as = "div",
  className,
  children,
  variants,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  const v = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : variants || {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      };
  return (
    <Tag className={className} variants={v} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionHeading({
  title,
  intro,
  light = false,
  className = "",
}) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <h2
        className={`text-2xl font-bold sm:text-3xl ${light ? "text-white" : "text-navy-900"}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-3 ${light ? "text-navy-100" : "text-navy-500"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}

export function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "document":
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4M10 12h5M10 16h5" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M8 10h8" />
        </svg>
      );
    case "box":
      return (
        <svg {...common}>
          <path d="M3 8l9-5 9 5v8l-9 5-9-5z" />
          <path d="M3 8l9 5 9-5M12 13v8" />
        </svg>
      );
    case "report":
      return (
        <svg {...common}>
          <path d="M4 20V4M4 20h16" />
          <path d="M8 16v-4M12 16V8M16 16v-6" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M6 21V4M6 5h11l-2 4 2 4H6" />
        </svg>
      );
    case "share":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.2 11l7.6-4M8.2 13l7.6 4" />
        </svg>
      );
    case "trace":
      return (
        <svg {...common}>
          <path d="M9 4h6v3H9zM6 6H5v15h14V6h-1" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      );
    default:
      return null;
  }
}
