import { motion } from "framer-motion";
import Button from "../components/Button";
import OrbitDiagram from "../components/OrbitDiagram";
import { rise, stagger } from "../lib/animations";
import { hero } from "../content";

type Props = { start?: boolean };

export default function Hero({ start = true }: Props) {
  return (
    <section id="top" className="relative bg-paper pt-32 md:pt-36">
      <div className="mx-auto grid max-w-shell grid-cols-1 items-center gap-8 px-6 pb-20 md:grid-cols-2 md:pb-28">
        <motion.div variants={stagger(0.12, 0.1)} initial="hidden" animate={start ? "show" : "hidden"}>
          <motion.h1
            variants={rise}
            className="font-display text-[3.4rem] font-extrabold leading-[0.98] tracking-tightest text-ink md:text-[4.6rem]"
          >
            {hero.pre}
            <span className="em">{hero.em}</span>
            {hero.post}
          </motion.h1>

          <motion.p variants={rise} className="mt-6 max-w-md text-[15px] leading-relaxed text-inkMut">
            {hero.sub}
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
            <Button variant="dark">{hero.primary}</Button>
            <Button variant="blue">{hero.secondary}</Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={start ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <OrbitDiagram labels={hero.orbit} variant="line" className="h-[420px] w-full md:h-[520px]" />
        </motion.div>
      </div>
    </section>
  );
}
