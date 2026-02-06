import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ANIMATION } from "../../lib/constants";
import { getSectionGradient, getGlowColor } from "../../lib/themes";
import type { ExtraCurricular as ExtraCurricularType } from "../../types/portfolio";

const INITIAL_SHOW_COUNT = 4;

interface ExtraCurricularProps {
  extracurriculars: ExtraCurricularType[];
}

export default function ExtraCurricular({ extracurriculars }: ExtraCurricularProps) {
  const { colors, mode } = useTheme();
  const [expandedExtra, setExpandedExtra] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedExtraCurricular = showAll ? extracurriculars : extracurriculars.slice(0, INITIAL_SHOW_COUNT);
  const hasMore = extracurriculars.length > INITIAL_SHOW_COUNT;

  return (
    <motion.section
      variants={ANIMATION.fadeIn}
      className="mb-5 sm:mb-6 relative overflow-hidden rounded-2xl p-4 sm:p-6 backdrop-blur-xl border"
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
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div
            className="h-6 sm:h-8 w-1 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${colors.highlight}, ${colors.accent})` }}
          />
          <h2 className="text-base sm:text-lg font-semibold" style={{ color: colors.foreground }}>
            What do I do, other than tech?
          </h2>
        </div>

        <div className="space-y-3">
          {displayedExtraCurricular.map((extra, index) => (
            <motion.div
              key={index}
              className="rounded-xl border overflow-hidden transition-all backdrop-blur-md"
              style={{
                backgroundColor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.5)",
                borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${colors.highlight}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
              }}
            >
              <button
                onClick={() => setExpandedExtra(expandedExtra === index ? null : index)}
                className="w-full p-3 sm:p-4 text-left transition-colors cursor-pointer"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1 sm:mb-0">
                      <span className="font-medium text-sm sm:text-base" style={{ color: colors.foreground }}>
                        {extra.activity}
                      </span>
                    </div>
                    {/* <p className="text-sm" style={{ color: `${colors.foreground}b3` }}>
                      {extra.role}  {extra.organization}
                    </p> */}
                    {extra.achievements && extra.achievements.length > 0 && (
                      <p className="text-xs mt-1" style={{ color: `${colors.foreground}80` }}>
                        {extra.achievements.join(', ')}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs sm:hidden mt-1" style={{ color: `${colors.foreground}99` }}>
                      <span>{extra.period}</span>
                      <span>•</span>
                      {/* <span>{extra.location}</span> */}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-start gap-3">
                    <div className="text-right">
                      <p className="text-sm" style={{ color: `${colors.foreground}cc` }}>{extra.period}</p>
                      <p className="text-xs" style={{ color: `${colors.foreground}80` }}>{extra.location}</p>
                    </div>
                  </div>
                  {extra.details && extra.details.length > 0 && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${expandedExtra === index ? "rotate-180" : ""}`}
                      style={{ color: `${colors.foreground}66` }}
                    />
                  )}
                </div>
              </button>

              {extra.details && extra.details.length > 0 && (
                <AnimatePresence>
                  {expandedExtra === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 border-t"
                        style={{ borderColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                      >
                        <ul className="space-y-1.5 sm:space-y-2 pt-2.5 sm:pt-3">
                          {extra.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm" style={{ color: `${colors.foreground}b3` }}>
                              <span style={{ color: colors.highlight }} className="mt-0.5 leading-none">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer"
              style={{
                background: mode === "dark" ? `${colors.highlight}15` : `${colors.highlight}10`,
                borderColor: mode === "dark" ? `${colors.highlight}30` : `${colors.highlight}20`,
                color: mode === "dark" ? colors.highlight : colors.primary,
              }}
            >
              {showAll ? (
                <>
                  Show less
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  Show {extracurriculars.length - INITIAL_SHOW_COUNT} more
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
