import { motion } from "framer-motion";
import { easeOutExpo } from "../lib/animations";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  once?: boolean;
}

export default function SplitText({
  text,
  className = "",
  as: Tag = "p",
  delay = 0,
  once = true,
}: SplitTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="text-split-word mr-[0.25em] last:mr-0">
          <motion.span
            className="text-split-word-inner"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once, amount: 0.3 }}
            transition={{
              duration: 0.8,
              ease: easeOutExpo,
              delay: i * 0.03 + delay,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
