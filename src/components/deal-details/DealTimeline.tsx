import { motion, AnimatePresence, useInView } from "framer-motion";
import { DollarSign, FileText, Hammer, Megaphone, TrendingUp } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState, useRef, useEffect } from "react";

interface DealTimelineProps {
  deal: DealData;
}

type TimelineScenario = "optimistic" | "downside";

// Premium Phase Illustrations - World-class design
const PhaseIllustration = ({ phaseIndex, isActive }: { phaseIndex: number; isActive: boolean }) => {
  const illustrations: Record<number, JSX.Element> = {
    // FUND - Sophisticated money visualization
    0: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="coinGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="coinShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="glowPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        
        {/* Ambient glow */}
        <motion.circle cx="100" cy="100" r="60" fill="url(#glowPurple)"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isActive ? { opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.1, 0.8] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Coin stack base - 3D effect */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.g key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <ellipse cx="100" cy={145 - i * 12} rx="45" ry="12" fill="url(#coinShadow)" />
            <ellipse cx="100" cy={140 - i * 12} rx="45" ry="12" fill="url(#coinGold)" />
            <ellipse cx="100" cy={140 - i * 12} rx="35" ry="8" fill="#fcd34d" opacity="0.4" />
          </motion.g>
        ))}
        
        {/* Central dollar emblem */}
        <motion.g filter="url(#glow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.5, type: "spring", damping: 12 }}
        >
          <circle cx="100" cy="70" r="28" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
          <text x="100" y="80" textAnchor="middle" fill="#fbbf24" fontSize="28" fontWeight="bold" fontFamily="serif">$</text>
        </motion.g>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={60 + Math.random() * 80}
            cy={50 + Math.random() * 100}
            r={2 + Math.random() * 3}
            fill="#fbbf24"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { 
              opacity: [0, 1, 0], 
              y: [20, -30, -60],
              x: [0, (Math.random() - 0.5) * 40]
            } : { opacity: 0 }}
            transition={{ 
              delay: 0.8 + i * 0.15, 
              duration: 2.5, 
              repeat: Infinity,
              repeatDelay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Rising value indicator */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.path
            d="M155 90 L165 75 L175 90 M165 75 L165 110"
            stroke="#22c55e" strokeWidth="3" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </motion.g>
      </svg>
    ),
    
    // DESIGN PERMITS - Architectural blueprint with 3D wireframe
    1: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="blueprintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        
        {/* Blueprint grid background */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(10)].map((_, i) => (
            <line key={`h-${i}`} x1="20" y1={30 + i * 16} x2="180" y2={30 + i * 16} stroke="#1e40af" strokeWidth="0.5" opacity="0.3" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`v-${i}`} x1={20 + i * 18} y1="30" x2={20 + i * 18} y2="180" stroke="#1e40af" strokeWidth="0.5" opacity="0.3" />
          ))}
        </motion.g>
        
        {/* 3D Isometric building wireframe */}
        <motion.g filter="url(#neonGlow)">
          {/* Base */}
          <motion.path
            d="M50 140 L100 160 L150 140 L100 120 Z"
            fill="url(#blueprintGrad)" stroke="url(#lineGlow)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          
          {/* Left wall */}
          <motion.path
            d="M50 140 L50 80 L100 60 L100 120 Z"
            fill="url(#blueprintGrad)" stroke="url(#lineGlow)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          
          {/* Right wall */}
          <motion.path
            d="M150 140 L150 80 L100 60 L100 120 Z"
            fill="url(#blueprintGrad)" stroke="url(#lineGlow)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          {/* Roof peak */}
          <motion.path
            d="M50 80 L100 40 L150 80 L100 60 Z"
            fill="url(#blueprintGrad)" stroke="url(#lineGlow)" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
        </motion.g>
        
        {/* Dimension lines */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <line x1="35" y1="140" x2="35" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="30" y1="140" x2="40" y2="140" stroke="#94a3b8" strokeWidth="1" />
          <line x1="30" y1="80" x2="40" y2="80" stroke="#94a3b8" strokeWidth="1" />
          <text x="25" y="115" fill="#94a3b8" fontSize="8" textAnchor="middle" transform="rotate(-90, 25, 115)">12m</text>
        </motion.g>
        
        {/* Approval stamp */}
        <motion.g
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={isActive ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 1.5, duration: 0.5, type: "spring", damping: 10 }}
        >
          <circle cx="160" cy="45" r="22" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="4,2" />
          <circle cx="160" cy="45" r="16" fill="none" stroke="#22c55e" strokeWidth="2" />
          <text x="160" y="42" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">APPROVED</text>
          <text x="160" y="52" textAnchor="middle" fill="#22c55e" fontSize="6">2026</text>
        </motion.g>
        
        {/* Scanning line effect */}
        <motion.line
          x1="20" y1="30" x2="20" y2="180"
          stroke="#a855f7" strokeWidth="2" opacity="0.6"
          initial={{ x1: 20, x2: 20 }}
          animate={isActive ? { x1: [20, 180, 20], x2: [20, 180, 20] } : {}}
          transition={{ delay: 0.5, duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
      </svg>
    ),
    
    // CONSTRUCTION - Premium crane and building animation
    2: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="craneArm" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="buildingGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <filter id="dropShadow">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Ground */}
        <motion.rect x="20" y="175" width="160" height="8" rx="2" fill="#1e293b"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ originX: 0.5 }} transition={{ duration: 0.5 }}
        />
        
        {/* Building under construction */}
        <motion.g filter="url(#dropShadow)">
          {/* Floor 1 */}
          <motion.rect x="100" y="145" width="70" height="30" rx="2" fill="url(#buildingGrad)"
            initial={{ scaleY: 0 }} animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
            style={{ originY: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          />
          {/* Floor 2 */}
          <motion.rect x="100" y="115" width="70" height="30" rx="2" fill="url(#buildingGrad)"
            initial={{ scaleY: 0 }} animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
            style={{ originY: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
          />
          {/* Floor 3 */}
          <motion.rect x="100" y="85" width="70" height="30" rx="2" fill="url(#buildingGrad)"
            initial={{ scaleY: 0 }} animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
            style={{ originY: 1 }} transition={{ delay: 0.9, duration: 0.6 }}
          />
          
          {/* Windows */}
          {[0, 1, 2].map((floor) =>
            [0, 1, 2].map((win) => (
              <motion.rect
                key={`win-${floor}-${win}`}
                x={108 + win * 22} y={152 - floor * 30} width="14" height="18" rx="1"
                fill="#0ea5e9" opacity="0.6"
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: [0, 0.8, 0.6] } : { opacity: 0 }}
                transition={{ delay: 1.2 + floor * 0.2 + win * 0.1, duration: 0.5 }}
              />
            ))
          )}
        </motion.g>
        
        {/* Crane */}
        <motion.g>
          {/* Crane base */}
          <motion.rect x="35" y="160" width="30" height="15" rx="3" fill="url(#steelGrad)"
            initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Crane tower */}
          <motion.rect x="45" y="40" width="10" height="120" fill="url(#steelGrad)"
            initial={{ scaleY: 0 }} animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
            style={{ originY: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
          />
          
          {/* Crane arm */}
          <motion.rect x="45" y="35" width="100" height="8" rx="2" fill="url(#craneArm)"
            initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            style={{ originX: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
          />
          
          {/* Counter weight */}
          <motion.rect x="20" y="35" width="25" height="12" rx="2" fill="#ef4444"
            initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
          />
          
          {/* Cable */}
          <motion.line x1="130" y1="43" x2="130" y2="70" stroke="#94a3b8" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
          />
          
          {/* Lifting block */}
          <motion.g
            initial={{ y: -20, opacity: 0 }}
            animate={isActive ? { y: [0, -10, 0], opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.2, duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <rect x="120" y="70" width="20" height="15" rx="2" fill="#a855f7" />
            <rect x="122" y="72" width="16" height="11" rx="1" fill="#7c3aed" />
          </motion.g>
        </motion.g>
        
        {/* Construction particles */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={`spark-${i}`}
            cx={110 + Math.random() * 50}
            cy={100 + Math.random() * 60}
            r="2"
            fill="#f59e0b"
            initial={{ opacity: 0 }}
            animate={isActive ? { 
              opacity: [0, 1, 0],
              y: [0, -20],
              x: [(Math.random() - 0.5) * 20]
            } : { opacity: 0 }}
            transition={{ 
              delay: 1.5 + i * 0.2, 
              duration: 1,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        ))}
        
        {/* Progress indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.8 }}
        >
          <rect x="100" y="180" width="70" height="6" rx="3" fill="#1e293b" />
          <motion.rect x="100" y="180" width="70" height="6" rx="3" fill="#a855f7"
            initial={{ scaleX: 0 }}
            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            style={{ originX: 0 }}
            transition={{ delay: 2, duration: 2 }}
          />
        </motion.g>
      </svg>
    ),
    
    // MARKETING - Digital advertising and engagement
    3: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="adGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <filter id="screenFilter">
            <feGaussianBlur stdDeviation="1" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        
        {/* Central phone/screen */}
        <motion.g filter="url(#screenFilter)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <rect x="65" y="40" width="70" height="120" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <rect x="70" y="50" width="60" height="95" rx="4" fill="url(#screenGlow)" />
          
          {/* Property image placeholder */}
          <rect x="75" y="55" width="50" height="35" rx="3" fill="#334155" />
          <motion.rect x="75" y="55" width="50" height="35" rx="3" fill="url(#adGrad)" opacity="0.8"
            animate={isActive ? { opacity: [0.6, 0.9, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Text lines */}
          <rect x="75" y="95" width="40" height="4" rx="2" fill="#64748b" />
          <rect x="75" y="103" width="50" height="3" rx="1" fill="#475569" />
          <rect x="75" y="110" width="35" height="3" rx="1" fill="#475569" />
          
          {/* CTA Button */}
          <motion.rect x="75" y="120" width="50" height="18" rx="4" fill="#22c55e"
            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="100" y="132" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">VIEW</text>
        </motion.g>
        
        {/* Floating engagement icons */}
        <motion.g>
          {/* Hearts */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0, y: [0, -5, 0] } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
          >
            <circle cx="45" cy="70" r="15" fill="#ec4899" />
            <text x="45" y="75" textAnchor="middle" fill="white" fontSize="14">♥</text>
            <text x="45" y="95" textAnchor="middle" fill="#ec4899" fontSize="9" fontWeight="bold">2.4K</text>
          </motion.g>
          
          {/* Comments */}
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 1, x: 0, y: [0, -8, 0] } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
          >
            <circle cx="155" cy="85" r="13" fill="#3b82f6" />
            <text x="155" y="89" textAnchor="middle" fill="white" fontSize="10">💬</text>
            <text x="155" y="108" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="bold">847</text>
          </motion.g>
          
          {/* Views */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: [0, -5, 0] } : { opacity: 0 }}
            transition={{ delay: 0.9, duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <circle cx="155" cy="140" r="12" fill="#8b5cf6" />
            <text x="155" y="144" textAnchor="middle" fill="white" fontSize="9">👁</text>
            <text x="155" y="162" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontWeight="bold">15K</text>
          </motion.g>
          
          {/* Shares */}
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={isActive ? { opacity: 1, y: [0, -6, 0] } : { opacity: 0 }}
            transition={{ delay: 1.1, duration: 2, repeat: Infinity, repeatDelay: 0.7 }}
          >
            <circle cx="40" cy="130" r="11" fill="#22c55e" />
            <text x="40" y="134" textAnchor="middle" fill="white" fontSize="10">↗</text>
            <text x="40" y="150" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">512</text>
          </motion.g>
        </motion.g>
        
        {/* Signal waves */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`wave-${i}`}
            cx="100" cy="100" r={30 + i * 20}
            fill="none" stroke="#8b5cf6" strokeWidth="1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isActive ? { opacity: [0, 0.3, 0], scale: [0.5, 1.2, 1.5] } : { opacity: 0 }}
            transition={{ delay: 1.3 + i * 0.3, duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}
        
        {/* Notification badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: [0, 1.2, 1] } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
        >
          <circle cx="130" cy="48" r="12" fill="#ef4444" />
          <text x="130" y="53" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">99+</text>
        </motion.g>
      </svg>
    ),
    
    // EXIT - Profit celebration with money
    4: (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="goldBill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="profitArrow" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#86efac" />
          </linearGradient>
          <filter id="celebrationGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        
        {/* Celebration burst */}
        <motion.circle cx="100" cy="100" r="80" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.3"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: [0, 1.5, 0], opacity: [0.5, 0, 0] } : {}}
          transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
        />
        
        {/* Money bag */}
        <motion.g filter="url(#celebrationGlow)"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <path d="M60 80 Q100 60 140 80 L150 150 Q100 170 50 150 Z" fill="url(#bagGrad)" />
          <path d="M70 82 Q100 70 130 82" fill="none" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="100" cy="155" rx="48" ry="8" fill="#14532d" opacity="0.3" />
          
          {/* Dollar sign on bag */}
          <text x="100" y="130" textAnchor="middle" fill="white" fontSize="40" fontWeight="bold" fontFamily="serif">$</text>
        </motion.g>
        
        {/* Flying money bills */}
        {[
          { x: 30, y: 60, rotate: -20, delay: 0.8 },
          { x: 160, y: 50, rotate: 15, delay: 1 },
          { x: 45, y: 40, rotate: -10, delay: 1.2 },
          { x: 145, y: 70, rotate: 25, delay: 1.4 },
          { x: 80, y: 25, rotate: -5, delay: 1.6 },
          { x: 120, y: 30, rotate: 10, delay: 1.8 },
        ].map((bill, i) => (
          <motion.g key={`bill-${i}`}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            animate={isActive ? { 
              opacity: [0, 1, 1, 0],
              y: [50, bill.y, bill.y - 30, bill.y - 60],
              x: [0, (bill.x - 100) * 0.5, bill.x - 100],
              rotate: [0, bill.rotate, bill.rotate * 1.5]
            } : { opacity: 0 }}
            transition={{ delay: bill.delay, duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <rect x={bill.x} y={bill.y} width="25" height="15" rx="2" fill="url(#goldBill)" />
            <text x={bill.x + 12.5} y={bill.y + 11} textAnchor="middle" fill="#15803d" fontSize="8" fontWeight="bold">$</text>
          </motion.g>
        ))}
        
        {/* Profit percentage badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5, type: "spring", damping: 10 }}
        >
          <rect x="130" y="100" width="55" height="30" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
          <text x="157" y="112" textAnchor="middle" fill="#22c55e" fontSize="8">TARGET</text>
          <text x="157" y="124" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">+15%</text>
        </motion.g>
        
        {/* Upward arrows */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.path d="M25 120 L25 80 L15 95 M25 80 L35 95" 
            stroke="url(#profitArrow)" strokeWidth="3" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          />
          <motion.path d="M175 130 L175 95 L165 108 M175 95 L185 108"
            stroke="url(#profitArrow)" strokeWidth="3" strokeLinecap="round" fill="none"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          />
        </motion.g>
        
        {/* Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.text
            key={`sparkle-${i}`}
            x={40 + Math.random() * 120}
            y={30 + Math.random() * 60}
            fill="#fbbf24"
            fontSize={8 + Math.random() * 6}
            initial={{ opacity: 0, scale: 0 }}
            animate={isActive ? { 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180]
            } : { opacity: 0 }}
            transition={{ 
              delay: 2 + i * 0.15,
              duration: 1,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >✦</motion.text>
        ))}
      </svg>
    ),
  };
  
  return illustrations[phaseIndex] || illustrations[0];
};

const getPhaseIcon = (index: number) => {
  const icons = [DollarSign, FileText, Hammer, Megaphone, TrendingUp];
  return icons[index] || DollarSign;
};

// Timeline data for different scenarios
const optimisticTimeline = [
  { year: "2026", month: "January", title: "Acquisition", description: "Secure the property with investor capital" },
  { year: "2026", month: "August", title: "Permit Accepted", description: "Design approval and permits obtained" },
  { year: "2026", month: "September", title: "Construction Starts", description: "Begin development phase" },
  { year: "2027", month: "October", title: "Sale Listing", description: "Property marketed to buyers" },
  { year: "2028", month: "January", title: "Exit", description: "Final sale and profit distribution", duration: "24 months" },
];

const downsideTimeline = [
  { year: "2026", month: "January", title: "Acquisition", description: "Secure the property with investor capital" },
  { year: "2027", month: "March", title: "Permit Accepted", description: "Extended permit approval process" },
  { year: "2027", month: "April", title: "Construction Starts", description: "Begin development phase" },
  { year: "2028", month: "May", title: "Sale Listing", description: "Property marketed to buyers" },
  { year: "2028", month: "September", title: "Exit", description: "Final sale and profit distribution", duration: "32 months" },
];

export const DealTimeline = ({ deal }: DealTimelineProps) => {
  const [activeScenario, setActiveScenario] = useState<TimelineScenario>("optimistic");
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  if (!deal.timeline) return null;

  const currentTimeline = activeScenario === "optimistic" ? optimisticTimeline : downsideTimeline;

  // Auto-progress through steps
  useEffect(() => {
    if (!isInView || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % currentTimeline.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, isPaused, currentTimeline.length, activeScenario]);

  // Reset step when scenario changes
  useEffect(() => {
    setActiveStep(0);
  }, [activeScenario]);

  const handleStepClick = (index: number) => {
    setIsPaused(true);
    setActiveStep(index);
    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-slate-900">
      {/* Premium background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-900/5 rounded-full blur-[80px]" />
      </div>
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[11px] tracking-[0.4em] uppercase text-violet-400 font-medium">
            Investment Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mt-4 tracking-tight">
            Development Timeline
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto items-center">
          {/* Left - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            {/* Vertical line with glow */}
            <div className="absolute left-[11px] top-4 bottom-4 w-[2px]">
              <div className="absolute inset-0 bg-gradient-to-b from-violet-500/50 via-slate-600 to-slate-700" />
              <motion.div 
                className="absolute top-0 w-full bg-violet-500"
                style={{ 
                  height: `${((activeStep + 1) / currentTimeline.length) * 100}%`,
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            
            {/* Steps */}
            <div className="space-y-2">
              <AnimatePresence mode="sync">
                {currentTimeline.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPast = index < activeStep;
                  
                  return (
                    <motion.div
                      key={`${activeScenario}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="relative pl-12 py-4 cursor-pointer group"
                      onClick={() => handleStepClick(index)}
                    >
                      {/* Dot */}
                      <motion.div 
                        className={`absolute left-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          isActive 
                            ? 'bg-violet-600 border-violet-400 scale-125' 
                            : isPast
                              ? 'bg-violet-600/50 border-violet-500/50'
                              : 'bg-slate-800 border-slate-600 group-hover:border-violet-500/50'
                        }`}
                        style={{
                          boxShadow: isActive ? '0 0 20px rgba(139, 92, 246, 0.6)' : 'none'
                        }}
                      >
                        {(isActive || isPast) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </motion.div>

                      {/* Content */}
                      <motion.div 
                        className={`transition-all duration-500 ${isActive ? 'translate-x-2' : ''}`}
                      >
                        <div className="flex items-baseline gap-4 mb-1">
                          <span className={`text-3xl font-extralight tracking-tight transition-colors duration-500 ${
                            isActive ? 'text-white' : isPast ? 'text-slate-400' : 'text-slate-600 group-hover:text-slate-400'
                          }`}>
                            {step.year}
                          </span>
                          <span className={`text-sm font-serif italic transition-colors duration-500 ${
                            isActive ? 'text-violet-400' : 'text-slate-500'
                          }`}>
                            {step.month}
                          </span>
                        </div>
                        <h4 className={`text-xl md:text-2xl font-light tracking-tight transition-colors duration-500 ${
                          isActive ? 'text-white' : isPast ? 'text-slate-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}>
                          {step.title}
                          {step.duration && (
                            <span className="ml-3 text-sm text-slate-500 font-normal">
                              {step.duration}
                            </span>
                          )}
                        </h4>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right - Premium Animation Display */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl border border-slate-700/50 p-8 lg:p-12 backdrop-blur-sm overflow-hidden min-h-[400px] flex flex-col">
              {/* Ambient background glow */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              {/* Animation container */}
              <div className="flex-1 flex items-center justify-center relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeScenario}-${activeStep}`}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-56 h-56 md:w-72 md:h-72"
                  >
                    <PhaseIllustration phaseIndex={activeStep} isActive={true} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${activeStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center relative z-10 mt-6"
                >
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-violet-400 font-medium">
                      Phase {activeStep + 1} of {currentTimeline.length}
                    </span>
                  </div>
                  <h4 className="text-2xl text-white font-light tracking-tight mb-2">
                    {currentTimeline[activeStep]?.title}
                  </h4>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">
                    {currentTimeline[activeStep]?.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-6 relative z-10">
                {currentTimeline.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeStep 
                        ? 'bg-violet-500 w-6' 
                        : index < activeStep 
                          ? 'bg-violet-500/50' 
                          : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scenario Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center gap-4 mt-16"
        >
          <button
            onClick={() => setActiveScenario("optimistic")}
            className={`group relative px-10 py-4 text-sm font-medium transition-all duration-500 overflow-hidden ${
              activeScenario === "optimistic"
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className={`absolute inset-0 border-2 transition-all duration-500 ${
              activeScenario === "optimistic"
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-slate-600 group-hover:border-slate-500'
            }`} />
            {activeScenario === "optimistic" && (
              <motion.span
                layoutId="scenarioIndicator"
                className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20"
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              />
            )}
            <span className="relative">Optimistic</span>
          </button>
          <button
            onClick={() => setActiveScenario("downside")}
            className={`group relative px-10 py-4 text-sm font-medium transition-all duration-500 overflow-hidden ${
              activeScenario === "downside"
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className={`absolute inset-0 border-2 transition-all duration-500 ${
              activeScenario === "downside"
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-slate-600 group-hover:border-slate-500'
            }`} />
            {activeScenario === "downside" && (
              <motion.span
                layoutId="scenarioIndicator"
                className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20"
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              />
            )}
            <span className="relative">Downside</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
