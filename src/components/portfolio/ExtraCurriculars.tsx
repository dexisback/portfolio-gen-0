import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient, getGlowColor } from "../../lib/themes";
import type { ExtraCurricular as ExtraCurricularType } from "../../types/portfolio";

interface ExtraCurricularProps {
  extracurriculars: ExtraCurricularType[];
}

export default function ExtraCurricular({ extracurriculars }: ExtraCurricularProps) {
  const { colors, mode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const allDetails = extracurriculars.flatMap(extra => extra.details || []);

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-5 sm:mb-6 relative overflow-hidden rounded-2xl backdrop-blur-xl border"
      style={{
        background: getSectionGradient(colors, mode),
        borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: getGlowColor(colors, mode) }}
      />
      <div className="relative z-10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 sm:p-6 text-left transition-colors cursor-pointer flex items-center justify-between"
          style={{ backgroundColor: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="h-6 sm:h-8 w-1 rounded-full"
              style={{ background: `linear-gradient(to bottom, ${colors.highlight}, ${colors.accent})` }}
            />
            <h2 className="text-base sm:text-lg font-semibold" style={{ color: colors.foreground }}>
              What do I do, other than tech?
            </h2>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
            style={{ color: `${colors.foreground}66` }}
          />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div
                className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 border-t"
                style={{ borderColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
              >
                <ul className="space-y-2 sm:space-y-3 pt-4">
                  {allDetails.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: `${colors.foreground}b3` }}>
                      <span style={{ color: colors.highlight }} className="mt-0.5 leading-none">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
