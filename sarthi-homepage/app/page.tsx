"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll } from "framer-motion"
import {
  ArrowRight,
  Mail,
  Shield,
  LogIn,
  MessageCircle,
  ChevronDown,
  Quote,
  Star,
  TrendingUp,
  Smile,
  Scale,
  Sparkles,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Clean, simple central icon
function SilencedVoiceIcon() {
  return (
    <div className="relative">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-zinc-300">
        {/* Simple conversation bubble */}
        <path
          d="M8 14c0-4 3-7 7-7h18c4 0 7 3 7 7v12c0 4-3 7-7 7H20l-6 6v-6H15c-4 0-7-3-7-7V14z"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(244, 63, 94, 0.1)"
        />

        {/* Text lines */}
        <path d="M14 18h12M14 22h8M14 26h10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />

        {/* Simple prohibition symbol */}
        <circle cx="24" cy="24" r="18" stroke="#ef4444" strokeWidth="3" fill="none" />
        <path d="M10 10l28 28" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// Clean feedback ignored icon
function FeedbackIgnoredIcon() {
  return (
    <div className="relative">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-orange-400">
        {/* Simple message bubble */}
        <path
          d="M8 12c0-4 3-7 7-7h18c4 0 7 3 7 7v12c0 4-3 7-7 7H20l-6 6v-6H15c-4 0-7-3-7-7V12z"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(251, 146, 60, 0.1)"
        />

        {/* Text lines */}
        <path d="M14 16h12M14 20h8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />

        {/* Simple X mark */}
        <path d="M32 8l8 8M40 8l-8 8" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  )
}

// Clean unspoken regrets icon
function UnspokenRegretsIcon() {
  return (
    <div className="relative">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-blue-400">
        {/* Simple clock */}
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" fill="rgba(59, 130, 246, 0.1)" />

        {/* Clock hands */}
        <path d="M24 12v12l8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

        {/* Small thought bubble */}
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="rgba(59, 130, 246, 0.2)" />
        <path d="M10 7h2M10 9h1.5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  )
}

// Clean missing closure icon
function MissingClosureIcon() {
  return (
    <div className="relative">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-purple-400">
        {/* First complete bubble */}
        <path
          d="M6 14c0-3 2-5 5-5h12c3 0 5 2 5 5v8c0 3-2 5-5 5H11l-5 5v-5z"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(147, 51, 234, 0.1)"
        />

        {/* Second incomplete bubble */}
        <path
          d="M20 26c0-2 1.5-4 4-4h12c2.5 0 4 2 4 4v6c0 2-1.5 4-4 4h-8l-4 4v-4h-4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="rgba(147, 51, 234, 0.05)"
          opacity="0.6"
        />

        {/* Text in first bubble */}
        <path d="M10 16h8M10 19h6" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />

        {/* Dots in second bubble */}
        <circle cx="26" cy="30" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="30" cy="30" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="34" cy="30" r="1" fill="currentColor" opacity="0.4" />
      </svg>
    </div>
  )
}

function AIGuideIcon() {
  return (
    <div className="relative">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-blue-400">
        {/* AI brain/guide */}
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" fill="rgba(59, 130, 246, 0.1)" />
        {/* Neural connections */}
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.8" />
        <circle cx="24" cy="16" r="2" fill="currentColor" opacity="0.8" />
        <circle cx="20" cy="24" r="2" fill="currentColor" opacity="0.8" />
        <path d="M16 16l4 8M24 16l-4 8M16 16h8" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        {/* Guiding light */}
        <path d="M20 8v4M20 28v4M8 20h4M28 20h4" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
      <motion.div
        className="absolute inset-0 rounded-full border border-blue-400/30"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  )
}

function InsightMirrorIcon() {
  return (
    <div className="relative">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-purple-400">
        {/* Mirror with reflection */}
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" fill="rgba(147, 51, 234, 0.1)" />
        {/* Reflection line */}
        <path d="M20 8v24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        {/* Self-awareness symbols */}
        <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.7" />
        <circle cx="24" cy="16" r="1.5" fill="currentColor" opacity="0.7" />
        <path d="M16 24c2-2 6-2 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Insight sparkles */}
        <path d="M12 12l2 2-2 2-2-2z" fill="#a855f7" opacity="0.6" />
        <path d="M28 12l2 2-2 2-2-2z" fill="#a855f7" opacity="0.6" />
      </svg>
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full"
        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
      />
    </div>
  )
}

function SafeSpaceIcon() {
  return (
    <div className="relative">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-green-400">
        {/* Protected sanctuary */}
        <path
          d="M20 4l12 8v12c0 8-12 12-12 12S8 32 8 24V12l12-8z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="rgba(34, 197, 94, 0.1)"
        />
        {/* Heart in center representing emotional safety */}
        <path
          d="M20 24c-0.5-0.5-4-3-4-7 0-2 1.5-3.5 3.5-3.5 1 0 1.5 0.5 2 1 0.5-0.5 1-1 2-1 2 0 3.5 1.5 3.5 3.5 0 4-3.5 6.5-4 7z"
          fill="currentColor"
          opacity="0.8"
        />
        {/* Protective aura */}
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      </svg>
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.3)",
            "0 0 0 8px rgba(34, 197, 94, 0.1)",
            "0 0 0 0 rgba(34, 197, 94, 0)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  )
}

export default function Home() {
  const { scrollY } = useScroll()
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [interest, setInterest] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedCountry, setSelectedCountry] = useState({ name: "United States", code: "+1", flag: "🇺🇸" })
  const [countrySearchTerm, setCountrySearchTerm] = useState("")
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  const countries = [
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "Brazil", code: "+55", flag: "🇧🇷" },
    // Add more countries as needed
  ]

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
      country.code.includes(countrySearchTerm) ||
      country.flag.includes(countrySearchTerm),
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          phoneNumber,
          selectedCountry,
          interest,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        // Reset form
        setEmail("")
        setFirstName("")
        setPhoneNumber("")
        setInterest("")
        setSelectedCountry({ name: "United States", code: "+1", flag: "🇺🇸" })

        // Hide success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        setSubmitError(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting waitlist:", error)
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 md:py-24 lg:py-32 text-center relative overflow-hidden"
        style={{ backgroundColor: "#1A1A1A" }}
        aria-labelledby="hero-title"
      >
        <header className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 lg:p-8">
          <div className="flex justify-end">
            <Button
              asChild
              variant="outline"
              className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:scale-[1.02] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] bg-transparent border border-white/20 hover:border-white/40 text-white hover:bg-white/5 rounded-xl px-4 sm:px-6 py-2.5 text-sm font-light min-h-[44px] min-w-[80px]"
              role="button"
              aria-label="Login"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </header>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-6xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                "0 0 30px rgba(255,255,255,0.15)",
                "0 0 50px rgba(255,255,255,0.25)",
                "0 0 30px rgba(255,255,255,0.15)",
              ],
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              boxShadow: {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            className="w-24 h-24 sm:w-28 sm:h-28 bg-zinc-800/50 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-zinc-700/30 relative"
            style={{
              filter: "drop-shadow(0 0 25px rgba(255,255,255,0.2))",
            }}
          >
            <Image
              src="/logo.png"
              alt="Sarthi logo"
              width={64}
              height={64}
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
              priority
              sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 64px"
            />
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                background: [
                  "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 sm:space-y-8 lg:space-y-10 relative"
          >
            <div className="relative">
              <h1
                id="hero-title"
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.15] text-white px-2 sm:px-0"
              >
                Say what's hard to say.
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 font-light max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
              <span className="font-medium text-white">Sarthi.me</span> helps you give meaningful feedback, see how
              you're perceived, and grow with clarity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="px-2 sm:px-0"
          >
            <Button
              asChild
              size="lg"
              className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:scale-[1.02] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white border-2 border-white/20 hover:border-white/40 transition-all duration-300 rounded-2xl px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl font-medium h-auto shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 w-full sm:w-auto min-w-[280px] min-h-[56px] sm:min-h-[64px]"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.1)",
              }}
              role="button"
            >
              <Link href="#waitlist" className="flex items-center justify-center">
                <span className="text-center">Join the exclusive waitlist</span>
                <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <AnimatedSection
        className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="problem-section-title"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-zinc-900/50 rounded-2xl flex items-center justify-center mx-auto mb-8 sm:mb-10 border border-zinc-800/50">
              <SilencedVoiceIcon />
            </div>
            <h2
              id="problem-section-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-8 sm:mb-10 tracking-tight px-2 sm:px-0"
              style={{ lineHeight: "1.2" }}
            >
              The hidden cost of unsaid words.
            </h2>
            <p
              className="text-lg sm:text-xl lg:text-2xl text-zinc-300 font-light max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
              style={{ lineHeight: "1.6" }}
            >
              When feedback is left unsaid, regret, misunderstanding, and distance grow. Sarthi exists to change that.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <motion.div variants={fadeInUp}>
              <Card className="bg-zinc-950/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm h-full hover:bg-zinc-900/30 transition-all duration-300">
                <CardContent className="p-8 sm:p-10 text-center space-y-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900/30 rounded-xl flex items-center justify-center mx-auto border border-zinc-800/30">
                    <FeedbackIgnoredIcon />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-light">Feedback ignored</h3>
                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                    75% of employees feel unheard when they try to speak up.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="bg-zinc-950/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm h-full hover:bg-zinc-900/30 transition-all duration-300">
                <CardContent className="p-8 sm:p-10 text-center space-y-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900/30 rounded-xl flex items-center justify-center mx-auto border border-zinc-800/30">
                    <UnspokenRegretsIcon />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-light">Unspoken regrets</h3>
                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                    60% of people regret not saying what they truly felt when it mattered most.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="bg-zinc-950/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm h-full hover:bg-zinc-900/30 transition-all duration-300">
                <CardContent className="p-8 sm:p-10 text-center space-y-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900/30 rounded-xl flex items-center justify-center mx-auto border border-zinc-800/30">
                    <MissingClosureIcon />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-light">Missing closure</h3>
                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                    Most people never get to share their side and carry that silence for years.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* How Sarthi.me Helps Section */}
      <AnimatedSection
        className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/30"
        aria-labelledby="how-it-helps-title"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2
              id="how-it-helps-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-8 sm:mb-10 tracking-tight px-2 sm:px-0"
              style={{ lineHeight: "1.2" }}
            >
              You don't have to hold it in anymore.
            </h2>
            <p
              className="text-lg sm:text-xl lg:text-2xl text-zinc-300 font-light max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
              style={{ lineHeight: "1.6" }}
            >
              Sarthi is your AI companion that helps you express feedback, emotions, and truth, when it's hard to find
              the right words.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-20 sm:space-y-24 lg:space-y-32">
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center"
            >
              <div className="space-y-8 sm:space-y-10 order-1 lg:order-1">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900/30 rounded-xl flex items-center justify-center border border-zinc-800/30">
                  <AIGuideIcon />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light">Say it clearly. Say it safely.</h3>
                <p
                  className="text-lg sm:text-xl lg:text-2xl text-zinc-300 leading-relaxed"
                  style={{ lineHeight: "1.6" }}
                >
                  Sarthi helps you shape what's hard to say, with clarity, care, and presence.
                </p>
              </div>
              <div className="order-2 lg:order-2">
                <div className="w-full h-64 sm:h-72 lg:h-80 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 p-6 sm:p-8 flex items-center justify-center overflow-hidden relative">
                  <div className="w-full max-w-md space-y-4 sm:space-y-5">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
                      className="flex justify-end"
                    >
                      <div className="bg-white/10 rounded-lg px-3 sm:px-4 py-2.5 max-w-[75%]">
                        <p className="text-sm sm:text-base text-white">I'm struggling with...</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, delay: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
                      className="flex justify-start"
                    >
                      <div className="bg-zinc-700/50 rounded-lg px-3 sm:px-4 py-2.5">
                        <div className="flex space-x-1">
                          <div
                            className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 2.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
                      className="flex justify-start"
                    >
                      <div className="bg-zinc-700/50 rounded-lg px-3 sm:px-4 py-2.5 max-w-[85%]">
                        <p className="text-sm sm:text-base text-zinc-200">Here's a thoughtful way to express that...</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 3.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
                      className="flex justify-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-blue-400"
                        >
                          <path d="M4 8h8M8 4l4 4-4 4" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center"
            >
              <div className="order-2 lg:order-1">
                <div className="w-full h-64 sm:h-72 lg:h-80 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 p-6 sm:p-8 flex items-center justify-center overflow-hidden relative">
                  <div className="w-full max-w-sm">
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <p className="text-sm sm:text-base text-zinc-400">Communication patterns</p>
                      </div>
                      {[
                        { label: "Directness", value: 60, color: "bg-blue-400", insight: "Room to grow" },
                        { label: "Empathy", value: 85, color: "bg-green-400", insight: "Strong" },
                        { label: "Clarity", value: 40, color: "bg-orange-400", insight: "Developing" },
                      ].map((pattern, index) => (
                        <motion.div
                          key={pattern.label}
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "100%" }}
                          transition={{
                            duration: 1,
                            delay: index * 0.3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 3,
                          }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm sm:text-base text-zinc-300">{pattern.label}</span>
                            <span className="text-xs sm:text-sm text-zinc-400">{pattern.insight}</span>
                          </div>
                          <div className="w-full bg-zinc-700/30 rounded-full h-2.5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pattern.value}%` }}
                              transition={{
                                duration: 1,
                                delay: index * 0.3 + 0.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 3,
                              }}
                              className={`h-2.5 rounded-full ${pattern.color}`}
                            />
                          </div>
                        </motion.div>
                      ))}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                        className="mt-6 bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/30"
                      >
                        <p className="text-sm sm:text-base text-zinc-200">
                          💡 You excel at empathy but could be more direct.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8 sm:space-y-10 order-1 lg:order-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900/30 rounded-xl flex items-center justify-center border border-zinc-800/30">
                  <InsightMirrorIcon />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light">See what others feel but don't say.</h3>
                <p
                  className="text-lg sm:text-xl lg:text-2xl text-zinc-300 leading-relaxed"
                  style={{ lineHeight: "1.6" }}
                >
                  Reflect on your tone, impact, and patterns to grow your awareness and connection.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center"
            >
              <div className="space-y-8 sm:space-y-10 order-1 lg:order-1">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900/30 rounded-xl flex items-center justify-center border border-zinc-800/30">
                  <SafeSpaceIcon />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light">A space where your words are yours.</h3>
                <p
                  className="text-lg sm:text-xl lg:text-2xl text-zinc-300 leading-relaxed"
                  style={{ lineHeight: "1.6" }}
                >
                  Send directly, anonymously, or just reflect. Your thoughts stay private, always.
                </p>
              </div>
              <div className="order-2 lg:order-2">
                <div className="w-full h-64 sm:h-72 lg:h-80 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 p-6 sm:p-8 flex items-center justify-center overflow-hidden relative">
                  <div className="w-full max-w-sm space-y-6 sm:space-y-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                      className="relative"
                    >
                      <div className="bg-zinc-800/50 rounded-lg p-4 sm:p-5 border border-zinc-700/30">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                          <span className="text-sm sm:text-base text-zinc-300">End-to-end encrypted</span>
                        </div>
                        <p className="text-sm sm:text-base text-zinc-200">Your thoughts are safe here...</p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
                        transition={{ duration: 2, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                        className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-full flex items-center justify-center"
                      >
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      </motion.div>
                    </motion.div>
                    <div className="space-y-3">
                      <p className="text-sm sm:text-base text-zinc-400 text-center">Choose your privacy level</p>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {["Send direct", "Anonymous", "Private journal"].map((option, index) => (
                          <motion.div
                            key={option}
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 1.5,
                              delay: index * 0.5 + 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 3,
                            }}
                            className="bg-zinc-700/30 rounded-md p-2 sm:p-3 text-center border border-zinc-600/30"
                          >
                            <p className="text-xs sm:text-sm text-zinc-300">{option}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                      className="text-center"
                    >
                      <p className="text-sm sm:text-base text-zinc-400">🔒 Your data never leaves your control.</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Experience Sarthi's Guidance Section */}
      <AnimatedSection
        className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="experience-section-title-givers"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16 sm:mb-20">
            <p className="text-sm text-zinc-500 font-medium mb-3 sm:mb-4 uppercase tracking-wider">
              For feedback givers
            </p>
            <h2
              id="experience-section-title-givers"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-8 sm:mb-10 tracking-tight px-2 sm:px-0"
              style={{ lineHeight: "1.2" }}
            >
              How Sarthi helps you express feedback clearly and kindly.
            </h2>
            <p
              className="text-lg sm:text-xl lg:text-2xl text-zinc-300 font-light max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
              style={{ lineHeight: "1.6" }}
            >
              Struggling to say something important? Sarthi guides you, step by step, to shape your message with
              clarity, empathy, and emotional safety.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
            <Card className="bg-zinc-950/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-zinc-900/50 px-6 sm:px-8 py-5 border-b border-zinc-800/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                      <Image
                        src="/logo.png"
                        alt="Sarthi logo"
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white">Sarthi</h3>
                      <p className="text-sm text-zinc-300">Your empathetic guide</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-6 min-h-[400px] sm:min-h-[450px]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex justify-end"
                  >
                    <div className="bg-white/10 rounded-2xl rounded-br-md px-4 sm:px-5 py-3.5 max-w-[85%] sm:max-w-[80%]">
                      <p className="text-sm sm:text-base text-white leading-relaxed">
                        I need to tell my manager I'm feeling undervalued, but I don't know how without sounding
                        demanding.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="flex justify-start"
                  >
                    <div className="bg-zinc-800/50 rounded-2xl rounded-bl-md px-4 sm:px-5 py-3.5 max-w-[85%] sm:max-w-[80%]">
                      <p className="text-sm sm:text-base text-zinc-100 leading-relaxed">
                        That takes courage. I'm here with you. Can you tell me more about what made you feel this way?
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                    className="flex justify-start"
                  >
                    <div className="bg-zinc-800/50 rounded-2xl rounded-bl-md px-4 sm:px-5 py-3.5 max-w-[90%] sm:max-w-[85%]">
                      <p className="text-sm sm:text-base text-zinc-100 leading-relaxed mb-4">
                        Here are some ways to express this thoughtfully:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-zinc-700/30 rounded-lg p-3 sm:p-4 border border-zinc-600/30 hover:border-zinc-500/50 motion-safe:transition-colors motion-safe:duration-300 cursor-pointer">
                          <p className="text-sm sm:text-base text-white font-medium mb-2">Option A: Direct approach</p>
                          <p className="text-xs sm:text-sm text-zinc-300">
                            "I'd like to discuss my role and contributions to better understand how I can grow here."
                          </p>
                        </div>
                        <div className="bg-zinc-700/30 rounded-lg p-3 sm:p-4 border border-zinc-600/30 hover:border-zinc-500/50 motion-safe:transition-colors motion-safe:duration-300 cursor-pointer">
                          <p className="text-sm sm:text-base text-white font-medium mb-2">
                            Option B: Collaborative tone
                          </p>
                          <p className="text-xs sm:text-sm text-zinc-300">
                            "I'm hoping we can explore ways for me to take on more meaningful responsibilities."
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4, duration: 0.6 }}
                    className="pt-6 border-t border-zinc-800/50"
                  >
                    <p className="text-sm text-zinc-400 mb-4 text-center">When you're ready, here's what you can do:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:scale-[1.02] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] bg-transparent border-zinc-600/50 text-zinc-300 hover:bg-zinc-700/30 hover:border-zinc-500/50 text-sm py-3 h-auto min-h-[48px]"
                        role="button"
                      >
                        Send with my name
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:scale-[1.02] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] bg-transparent border-zinc-600/50 text-zinc-300 hover:bg-zinc-700/30 hover:border-zinc-500/50 text-sm py-3 h-auto min-h-[48px]"
                        role="button"
                      >
                        Send anonymously
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:scale-[1.02] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] bg-transparent border-zinc-600/50 text-zinc-300 hover:bg-zinc-700/30 hover:border-zinc-500/50 text-sm py-3 h-auto min-h-[48px]"
                        role="button"
                      >
                        Just for me
                      </Button>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ delay: 3, duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="flex justify-start"
                  >
                    <div className="bg-zinc-800/50 rounded-2xl rounded-bl-md px-4 sm:px-5 py-3.5">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Your Growth, Visualized Section (Feedback Receiver Dashboard) */}
      <AnimatedSection
        className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/30"
        aria-labelledby="growth-section-title"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16 sm:mb-20">
            <p className="text-sm text-zinc-500 font-medium mb-3 sm:mb-4 uppercase tracking-wider">
              For feedback receivers
            </p>
            <h2
              id="growth-section-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-8 sm:mb-10 tracking-tight px-2 sm:px-0"
              style={{ lineHeight: "1.2" }}
            >
              Receive feedback with clarity, not confusion.
            </h2>
            <p
              className="text-lg sm:text-xl lg:text-2xl text-zinc-300 font-light max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
              style={{ lineHeight: "1.6" }}
            >
              Receiving feedback can be hard. Sarthi makes it easier by showing patterns, highlighting your strengths,
              and guiding your next steps with care.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="max-w-5xl mx-auto">
            <Card className="bg-zinc-950/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-zinc-900/50 px-6 sm:px-8 py-5 border-b border-zinc-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                        <Image
                          src="/logo.png"
                          alt="Sarthi logo"
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white">Your dashboard</h3>
                        <p className="text-sm text-zinc-300">Hi Alex</p> {/* Placeholder name */}
                      </div>
                    </div>
                    <div className="text-sm text-zinc-400 hidden sm:block">Last updated: Today</div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  {/* Insight Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                    {/* Top Strengths Card */}
                    <motion.div
                      variants={fadeInUp}
                      className="bg-zinc-800/30 rounded-xl p-5 border border-zinc-700/30 hover:bg-zinc-700/40 transition-colors duration-300 group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Star className="h-5 w-5 text-green-400" />
                        <span className="text-sm text-zinc-400">Top strengths</span>
                      </div>
                      <p className="text-base font-medium text-white">
                        Others consistently feel heard and understood in your conversations.
                      </p>
                      <p className="text-sm text-zinc-500 mt-2">89% of feedback highlights empathy as a strength.</p>
                      <p className="text-xs text-zinc-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        ↑ 12% since last review
                      </p>
                    </motion.div>

                    {/* Growth Area Card */}
                    <motion.div
                      variants={fadeInUp}
                      className="bg-zinc-800/30 rounded-xl p-5 border border-zinc-700/30 hover:bg-zinc-700/40 transition-colors duration-300 group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <TrendingUp className="h-5 w-5 text-blue-400" />
                        <span className="text-sm text-zinc-400">Growth area</span>
                      </div>
                      <p className="text-base font-medium text-white">
                        You're becoming more clear in tough conversations, a shift others are starting to notice.
                      </p>
                      <p className="text-sm text-zinc-500 mt-2">Tone clarity up 23% in high-friction conversations.</p>
                    </motion.div>

                    {/* Sentiment Trend Card */}
                    <motion.div
                      variants={fadeInUp}
                      className="bg-zinc-800/30 rounded-xl p-5 border border-zinc-700/30 hover:bg-zinc-700/40 transition-colors duration-300 group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Smile className="h-5 w-5 text-purple-400" />
                        <span className="text-sm text-zinc-400">Sentiment trend</span>
                      </div>
                      <p className="text-base font-medium text-white">
                        Your tone is increasingly perceived as thoughtful and constructive.
                      </p>
                      <p className="text-sm text-zinc-500 mt-2">Positive sentiment ↑ 15% over 3 weeks.</p>
                    </motion.div>

                    {/* Communication Balance Card */}
                    <motion.div
                      variants={fadeInUp}
                      className="bg-zinc-800/30 rounded-xl p-5 border border-zinc-700/30 hover:bg-zinc-700/40 transition-colors duration-300 group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Scale className="h-5 w-5 text-orange-400" />
                        <span className="text-sm text-zinc-400">Communication balance</span>
                      </div>
                      <p className="text-base font-medium text-white">
                        You're being seen as warm and thoughtful, but sometimes hard to interpret under pressure.
                      </p>
                      <p className="text-sm text-zinc-500 mt-2">
                        42% empathetic / 33% assertive / 25% unclear (tone perception breakdown)
                      </p>
                    </motion.div>
                  </div>

                  {/* Recent Insights Section */}
                  <motion.div
                    variants={fadeInUp}
                    className="bg-zinc-800/30 rounded-xl p-6 sm:p-8 border border-zinc-700/30 mb-8"
                  >
                    <h4 className="text-base font-medium text-white mb-6 flex items-center">
                      <Sparkles className="h-5 w-5 mr-3 text-zinc-400" />
                      Recent insights
                    </h4>
                    <div className="space-y-5">
                      <div className="p-4 bg-zinc-700/20 rounded-lg hover:bg-zinc-700/30 transition-colors duration-300">
                        <p className="text-sm text-white">
                          People are noticing more appreciation from you, it's making an impact.
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">Perceived appreciation +14% in the past 7 days.</p>
                      </div>
                      <div className="p-4 bg-zinc-700/20 rounded-lg hover:bg-zinc-700/30 transition-colors duration-300">
                        <p className="text-sm text-white">
                          Some responses suggest your tone can feel soft or indirect, even when your intent is clear.
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">Reported confusion in 28% of longer responses.</p>
                      </div>
                      <div className="p-4 bg-zinc-700/20 rounded-lg hover:bg-zinc-700/30 transition-colors duration-300">
                        <p className="text-sm text-white">
                          Feedback shows a growing sense of empathy in how others experience you.
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">Empathy score +18% over past 10 feedback moments.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Suggested Next Steps Section */}
                  <motion.div
                    variants={fadeInUp}
                    className="bg-zinc-800/30 rounded-xl p-6 sm:p-8 border border-zinc-700/30"
                  >
                    <h4 className="text-base font-medium text-white mb-6 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-zinc-400" />
                      Suggested next steps
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-start space-y-2 p-4 bg-zinc-700/20 rounded-lg hover:bg-zinc-700/30 transition-colors duration-300">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                          <span className="text-xs text-blue-400 font-medium">1</span>
                        </div>
                        <p className="text-sm text-white font-medium">
                          Explore clarity in moments where your message may not land as intended.
                        </p>
                        <p className="text-xs text-zinc-500">Most confusion occurs in written feedback replies.</p>
                      </div>
                      <div className="flex flex-col items-start space-y-2 p-4 bg-zinc-700/20 rounded-lg hover:bg-zinc-700/30 transition-colors duration-300">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                          <span className="text-xs text-green-400 font-medium">2</span>
                        </div>
                        <p className="text-sm text-white font-medium">
                          Reflect on where people feel most connected to you.
                        </p>
                        <p className="text-xs text-zinc-500">Top connection moments: end-of-meeting shares, 1:1s.</p>
                      </div>
                      <div className="flex flex-col items-start space-y-2 p-4 bg-zinc-700/20 rounded-lg hover:bg-zinc-700/30 transition-colors duration-300">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                          <span className="text-xs text-purple-400 font-medium">3</span>
                        </div>
                        <p className="text-sm text-white font-medium">Use patterns to guide your next growth step.</p>
                        <p className="text-xs text-zinc-500">
                          Set a focus goal, e.g., 'improve tone clarity in async comms.'
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="px-6 sm:px-8 py-4 text-center border-t border-zinc-800/50">
                  <p className="text-xs text-zinc-600">
                    Only you can see this. These insights are private, built from your received feedback.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Who is Sarthi for? Section */}
      <AnimatedSection
        className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="who-is-sarthi-for-title"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2
              id="who-is-sarthi-for-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-8 sm:mb-10 tracking-tight px-2 sm:px-0"
              style={{ lineHeight: "1.2" }}
            >
              Who is Sarthi for?
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            <motion.div variants={fadeInUp}>
              <Card className="bg-zinc-950/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm h-full hover:bg-zinc-900/30 transition-all duration-300 flex flex-col">
                <CardContent className="p-8 sm:p-10 space-y-6 flex-grow flex flex-col">
                  <h3 className="text-2xl sm:text-3xl font-light text-center sm:text-left">
                    <span role="img" aria-label="Person standing icon" className="mr-2">
                      🧍
                    </span>
                    Feedback givers
                  </h3>
                  <p className="text-lg text-zinc-300 leading-relaxed flex-grow">
                    You have something meaningful to say, but it's hard to know how or when.
                  </p>
                  <ul className="list-disc list-inside space-y-3 text-zinc-300 text-base sm:text-lg">
                    <li>Get help shaping your message with empathy and clarity.</li>
                    <li>Choose how and when to send it, or keep it just for yourself.</li>
                    <li>Reduce regret. Be understood without conflict.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="bg-zinc-950/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm h-full hover:bg-zinc-900/30 transition-all duration-300 flex flex-col">
                <CardContent className="p-8 sm:p-10 space-y-6 flex-grow flex flex-col">
                  <h3 className="text-2xl sm:text-3xl font-light text-center sm:text-left">
                    <span role="img" aria-label="Ear icon" className="mr-2">
                      👂
                    </span>
                    Feedback receivers
                  </h3>
                  <p className="text-lg text-zinc-300 leading-relaxed flex-grow">
                    You want to grow, but don't always know how others experience you.
                  </p>
                  <ul className="list-disc list-inside space-y-3 text-zinc-300 text-base sm:text-lg">
                    <li>Receive feedback in a calm, safe, guided space.</li>
                    <li>See trends in your tone, clarity, and emotional impact.</li>
                    <li>Get insights you can act on, with context and control.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Join Waitlist Section */}
      <AnimatedSection
        id="waitlist"
        className="py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="waitlist-section-title"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="space-y-12 sm:space-y-16">
            <div className="space-y-8 sm:space-y-10">
              <h2
                id="waitlist-section-title"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight px-2 sm:px-0"
                style={{ lineHeight: "1.2" }}
              >
                Start your journey with Sarthi.
              </h2>
              <p
                className="text-lg sm:text-xl lg:text-2xl text-zinc-300 font-light leading-relaxed px-2 sm:px-0 max-w-xl mx-auto"
                style={{ lineHeight: "1.6" }}
              >
                Say what matters. Hear what's unsaid. Join the waitlist to try Sarthi before anyone else.
              </p>
            </div>

            <Card className="bg-zinc-950/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm">
              <CardContent className="p-8 sm:p-10 lg:p-12">
                {!isSubmitted ? (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-8">
                    <div className="space-y-6">
                      <div className="space-y-3 text-left">
                        <Label htmlFor="email" className="text-base font-medium text-zinc-200">
                          Email address <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out focus:scale-[1.01] focus:shadow-lg focus:shadow-white/10 bg-zinc-900/50 border-zinc-700/50 rounded-xl h-14 text-base px-5 placeholder:text-zinc-500 focus:border-white/40 focus:ring-white/10 min-h-[56px]"
                          required
                          aria-invalid={isSubmitted && !email}
                          aria-describedby="email-helper"
                        />
                      </div>
                      <div className="space-y-3 text-left">
                        <Label htmlFor="firstName" className="text-base font-medium text-zinc-200">
                          First name <span className="text-zinc-500 font-normal">(optional)</span>
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Your first name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out focus:scale-[1.01] focus:shadow-lg focus:shadow-white/10 bg-zinc-900/50 border-zinc-700/50 rounded-xl h-14 text-base px-5 placeholder:text-zinc-500 focus:border-white/40 focus:ring-white/10 min-h-[56px]"
                        />
                      </div>
                      <div className="space-y-3 text-left">
                        <Label htmlFor="phone" className="text-base font-medium text-zinc-200">
                          Phone number <span className="text-zinc-500 font-normal">(optional)</span>
                        </Label>
                        <div className="flex space-x-2">
                          <div className="relative" ref={countryDropdownRef}>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                              className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out bg-zinc-900/50 border-zinc-700/50 rounded-xl h-14 px-3 text-base text-white hover:border-white/40 focus:border-white/40 focus:ring-1 focus:ring-white/20 min-h-[56px] flex items-center justify-between w-[150px]"
                              aria-expanded={isCountryDropdownOpen}
                              aria-haspopup="listbox"
                              aria-label="Select country code"
                            >
                              <span className="flex items-center truncate">
                                <span className="mr-2 text-lg">{selectedCountry.flag}</span>
                                <span className="text-sm">{selectedCountry.code}</span>
                              </span>
                              <ChevronDown
                                className={`ml-1 h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                              />
                            </Button>
                            {isCountryDropdownOpen && (
                              <div className="absolute z-20 mt-1 w-72 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800">
                                <div className="p-2">
                                  <Input
                                    type="text"
                                    placeholder="Search country..."
                                    value={countrySearchTerm}
                                    onChange={(e) => setCountrySearchTerm(e.target.value)}
                                    className="w-full bg-zinc-800 border-zinc-600 placeholder:text-zinc-500 h-10 px-3 text-sm"
                                    aria-label="Search for a country code"
                                  />
                                </div>
                                <ul role="listbox" aria-label="Country codes">
                                  {filteredCountries.length > 0 ? (
                                    filteredCountries.map((country) => (
                                      <li
                                        key={country.name}
                                        onClick={() => {
                                          setSelectedCountry(country)
                                          setIsCountryDropdownOpen(false)
                                          setCountrySearchTerm("")
                                        }}
                                        className="px-3 py-2.5 hover:bg-zinc-800 cursor-pointer flex items-center text-sm text-zinc-200"
                                        role="option"
                                        aria-selected={selectedCountry.name === country.name}
                                      >
                                        <span className="mr-3 text-lg">{country.flag}</span>
                                        <span>
                                          {country.name} ({country.code})
                                        </span>
                                      </li>
                                    ))
                                  ) : (
                                    <li className="px-3 py-2.5 text-sm text-zinc-400 text-center">
                                      No countries found.
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="flex-grow motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out focus:scale-[1.01] focus:shadow-lg focus:shadow-white/10 bg-zinc-900/50 border-zinc-700/50 rounded-xl h-14 text-base px-5 placeholder:text-zinc-500 focus:border-white/40 focus:ring-1 focus:ring-white/20 min-h-[56px]"
                            aria-label="Phone number"
                          />
                        </div>
                      </div>
                      <div className="space-y-3 pt-2 text-left">
                        <Label className="text-base font-medium text-zinc-200">
                          Which area are you most interested in improving with Sarthi.me?{" "}
                          <span className="text-zinc-500 font-normal">(optional)</span>
                        </Label>
                        <RadioGroup
                          value={interest}
                          onValueChange={setInterest}
                          className="flex flex-col space-y-2 pt-2"
                        >
                          <div className="flex items-center space-x-3 min-h-[44px] p-2 rounded-lg hover:bg-zinc-800/30 transition-colors">
                            <RadioGroupItem
                              value="personal"
                              id="personal"
                              className="border-zinc-600 text-white w-5 h-5"
                            />
                            <Label
                              htmlFor="personal"
                              className="font-normal text-zinc-200 text-base cursor-pointer flex-1"
                            >
                              Personal relationships and conversations
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 min-h-[44px] p-2 rounded-lg hover:bg-zinc-800/30 transition-colors">
                            <RadioGroupItem
                              value="professional"
                              id="professional"
                              className="border-zinc-600 text-white w-5 h-5"
                            />
                            <Label
                              htmlFor="professional"
                              className="font-normal text-zinc-200 text-base cursor-pointer flex-1"
                            >
                              Professional communication and feedback
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 min-h-[44px] p-2 rounded-lg hover:bg-zinc-800/30 transition-colors">
                            <RadioGroupItem value="both" id="both" className="border-zinc-600 text-white w-5 h-5" />
                            <Label htmlFor="both" className="font-normal text-zinc-200 text-base cursor-pointer flex-1">
                              Both personal and professional
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {submitError && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                        <p className="text-red-400 text-sm">{submitError}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:scale-[1.02] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white border-2 border-white/20 hover:border-white/40 transition-all duration-300 rounded-2xl h-16 text-lg font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] min-h-[64px] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.1)",
                      }}
                      role="button"
                    >
                      <span className="flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-3 h-6 w-6 animate-spin flex-shrink-0" aria-hidden="true" />
                            Joining waitlist...
                          </>
                        ) : (
                          <>
                            Join waitlist
                            <ArrowRight className="ml-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                          </>
                        )}
                      </span>
                    </Button>
                    <p
                      className="text-sm text-zinc-400 font-light pt-4 px-2 sm:px-0 text-center"
                      style={{ lineHeight: "1.6" }}
                    >
                      Your thoughts are safe with us. Always. We'll notify you first when Sarthi.me is ready for beta
                      access.{" "}
                      <Link href="/privacy" className="text-white underline underline-offset-2 hover:text-zinc-300">
                        Privacy policy
                      </Link>
                    </p>
                  </form>
                ) : (
                  <div className="py-12 space-y-6">
                    <div className="w-20 h-20 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto">
                      <Mail className="h-10 w-10 text-green-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light">You're on the list!</h3>
                    <p className="text-lg sm:text-xl text-zinc-300">We'll be in touch soon with early access.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection
        className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-black"
        aria-labelledby="testimonials-section-title"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16 sm:mb-20 lg:mb-24">
            <h2
              id="testimonials-section-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-8 sm:mb-10 tracking-tight px-2 sm:px-0"
              style={{ lineHeight: "1.2" }}
            >
              Here's how Sarthi is helping others speak up and grow…
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <motion.div variants={fadeInUp}>
              <Card className="bg-zinc-900/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm h-full hover:bg-zinc-800/60 transition-all duration-300 flex flex-col shadow-lg">
                <CardContent className="p-8 sm:p-10 flex flex-col flex-grow space-y-6">
                  <Quote className="w-10 h-10 text-blue-400 mb-4 opacity-70" aria-hidden="true" />
                  <blockquote className="text-lg sm:text-xl text-zinc-200 leading-relaxed flex-grow">
                    <p>
                      "I finally said something I'd been holding in for months. Sarthi helped me say it in a way that
                      felt honest, but kind. I didn't lose the relationship. I deepened it."
                    </p>
                  </blockquote>
                  <footer className="mt-auto pt-6 border-t border-zinc-700/50">
                    <p className="text-base font-medium text-white">Maya K.</p>
                    <p className="text-sm text-zinc-400">Marketing manager, San Francisco</p>
                  </footer>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="bg-zinc-900/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm h-full hover:bg-zinc-800/60 transition-all duration-300 flex flex-col shadow-lg">
                <CardContent className="p-8 sm:p-10 flex flex-col flex-grow space-y-6">
                  <Quote className="w-10 h-10 text-purple-400 mb-4 opacity-70" aria-hidden="true" />
                  <blockquote className="text-lg sm:text-xl text-zinc-200 leading-relaxed flex-grow">
                    <p>
                      "I never realized how people felt around me. The insight was gentle, but clear. I've grown more in
                      a week than I have in years of vague 'feedback.'"
                    </p>
                  </blockquote>
                  <footer className="mt-auto pt-6 border-t border-zinc-700/50">
                    <p className="text-base font-medium text-white">Dev P.</p>
                    <p className="text-sm text-zinc-400">Team lead, Bangalore</p>
                  </footer>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="bg-zinc-900/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm h-full hover:bg-zinc-800/60 transition-all duration-300 flex flex-col shadow-lg">
                <CardContent className="p-8 sm:p-10 flex flex-col flex-grow space-y-6">
                  <Quote className="w-10 h-10 text-green-400 mb-4 opacity-70" aria-hidden="true" />
                  <blockquote className="text-lg sm:text-xl text-zinc-200 leading-relaxed flex-grow">
                    <p>
                      "I've used Sarthi to both send and receive. It feels like having an emotional coach with me,
                      someone who knows what I mean before I do."
                    </p>
                  </blockquote>
                  <footer className="mt-auto pt-6 border-t border-zinc-700/50">
                    <p className="text-base font-medium text-white">Jordan R.</p>
                    <p className="text-sm text-zinc-400">UX designer, Berlin</p>
                  </footer>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Join Our Community Section */}
      <AnimatedSection
        className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/30"
        aria-labelledby="community-section-title"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="space-y-8 sm:space-y-10">
            <div className="space-y-6 sm:space-y-8">
              <h2
                id="community-section-title"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight px-2 sm:px-0"
                style={{ lineHeight: "1.2" }}
              >
                Join our community.
              </h2>
              <p
                className="text-lg sm:text-xl lg:text-2xl text-zinc-300 font-light leading-relaxed px-2 sm:px-0"
                style={{ lineHeight: "1.6" }}
              >
                Connect with others navigating tough talks. Join our community for support and insights.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:scale-[1.02] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] bg-transparent border-2 border-white/20 hover:border-white/40 text-white hover:bg-zinc-800/50 transition-all duration-300 rounded-2xl px-8 sm:px-12 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl font-medium h-auto shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 w-full sm:w-auto min-h-[64px]"
              role="button"
            >
              <Link
                href="https://chat.whatsapp.com/YOUR_WHATSAPP_GROUP_INVITE_LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <span>Join our WhatsApp community</span>
                <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Secondary Entry Points Section */}
      <AnimatedSection
        className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/30"
        aria-labelledby="secondary-entry-title"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16 sm:mb-20">
            <h2
              id="secondary-entry-title"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 tracking-tight px-2 sm:px-0"
              style={{ lineHeight: "1.2" }}
            >
              Already have an invite?
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            <motion.div variants={fadeInUp}>
              <Card className="bg-zinc-950/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm h-full hover:bg-zinc-900/30 motion-safe:transition-all motion-safe:duration-300">
                <CardContent className="p-8 sm:p-10 text-center space-y-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-900/50 rounded-xl flex items-center justify-center mx-auto">
                    <LogIn className="h-8 w-8 sm:h-10 sm:w-10 text-zinc-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-light">Login with invite code</h3>
                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8">
                    Enter your invitation code to access your Sarthi account.
                  </p>
                  <Button
                    asChild
                    className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:scale-[1.02] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] bg-transparent border-2 border-white/20 hover:border-white/40 text-white hover:bg-zinc-800/50 transition-all duration-300 rounded-xl px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-medium h-auto shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] w-full min-h-[64px]"
                    role="button"
                  >
                    <Link href="/login" className="flex items-center justify-center">
                      <span>Login with invite code</span>
                      <LogIn className="ml-3 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="bg-zinc-950/50 border-zinc-800/50 rounded-2xl backdrop-blur-sm h-full hover:bg-zinc-900/30 motion-safe:transition-all motion-safe:duration-300">
                <CardContent className="p-8 sm:p-10 text-center space-y-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-900/50 rounded-xl flex items-center justify-center mx-auto">
                    <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-zinc-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-light">Claim feedback</h3>
                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8">
                    Someone shared feedback with you? Claim it here.
                  </p>
                  <Button
                    asChild
                    className="motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:scale-[1.02] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black active:scale-[0.98] bg-transparent border-2 border-white/20 hover:border-white/40 text-white hover:bg-zinc-800/50 transition-all duration-300 rounded-xl px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-medium h-auto shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] w-full min-h-[64px]"
                    role="button"
                  >
                    <Link href="/claim" className="flex items-center justify-center">
                      <span>Claim feedback</span>
                      <MessageCircle className="ml-3 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer
        className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50"
        aria-labelledby="footer-content"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-10 sm:space-y-12"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900/50 rounded-xl flex items-center justify-center border border-zinc-800/30">
              <Image
                src="/logo.png"
                alt="Sarthi logo"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
              <Link
                href="/privacy"
                className="text-zinc-300 hover:text-white motion-safe:transition-colors motion-safe:duration-300 font-light text-lg min-h-[48px] flex items-center"
              >
                Privacy policy
              </Link>
              <Link
                href="/terms"
                className="text-zinc-300 hover:text-white motion-safe:transition-colors motion-safe:duration-300 font-light text-lg min-h-[48px] flex items-center"
              >
                Terms of service
              </Link>
              <Link
                href="/contact"
                className="text-zinc-300 hover:text-white motion-safe:transition-colors motion-safe:duration-300 font-light text-lg min-h-[48px] flex items-center"
              >
                Contact us
              </Link>
              <Link
                href="/about"
                className="text-zinc-300 hover:text-white motion-safe:transition-colors motion-safe:duration-300 font-light text-lg min-h-[48px] flex items-center"
              >
                About us
              </Link>
            </div>
            <div className="flex items-center space-x-10 sm:space-x-12">
              <Link
                href="https://linkedin.com/company/sarthi"
                className="text-zinc-500 hover:text-zinc-300 motion-safe:transition-colors motion-safe:duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link
                href="https://twitter.com/sarthi"
                className="text-zinc-500 hover:text-zinc-300 motion-safe:transition-colors motion-safe:duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="Twitter"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com/sarthi"
                className="text-zinc-500 hover:text-zinc-300 motion-safe:transition-colors motion-safe:duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </Link>
            </div>
            <div className="space-y-3 text-center">
              <p className="text-zinc-400 font-light">Built with ❤️. For the unsaid.</p>
              <p className="text-zinc-500 font-light">&copy; {new Date().getFullYear()} Sarthi. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
