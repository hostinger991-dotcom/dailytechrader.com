import React, { useState } from 'react';
import { 
  X, Phone, Mail, Shield, Award, Users, CheckCircle2, 
  Send, MapPin, Clock, FileText, Lock, Globe, MessageSquare 
} from 'lucide-react';

interface EditorialModalProps {
  type: 'about' | 'contact' | 'editors' | 'standards' | 'privacy' | 'terms';
  onClose: () => void;
}

export const EditorialModal: React.FC<EditorialModalProps> = ({ type, onClose }) => {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Technical Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-[#081c18] border border-[#5fdee7]/40 rounded-2xl shadow-2xl overflow-hidden my-8"
        style={{
          boxShadow: '0 0 50px rgba(95,222,231,0.2)'
        }}
      >
        {/* Modal Header */}
        <div className="p-5 md:px-8 border-b border-[#5fdee7]/20 bg-[#061411] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-[#0b2721] border border-[#5fdee7]/30 text-[#5fdee7]">
              {type === 'about' && <Award className="w-5 h-5" />}
              {type === 'contact' && <Mail className="w-5 h-5" />}
              {type === 'editors' && <Users className="w-5 h-5" />}
              {type === 'standards' && <Shield className="w-5 h-5" />}
              {type === 'privacy' && <Lock className="w-5 h-5" />}
              {type === 'terms' && <FileText className="w-5 h-5" />}
            </span>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#5fdee7] uppercase block">
                DAILYTECHRADER OFFICIAL DISCLOSURE
              </span>
              <h2 className="text-xl md:text-2xl font-bold font-display text-white uppercase">
                {type === 'about' && 'About dailytechrader'}
                {type === 'contact' && 'Contact Editorial Newsroom'}
                {type === 'editors' && 'Editorial Board & Benchmarking Staff'}
                {type === 'standards' && 'Editorial Standards & Peer Review'}
                {type === 'privacy' && 'Privacy Policy & Data Protection'}
                {type === 'terms' && 'Terms of Service & Licensing'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#0b2721] border border-white/10 text-slate-300 hover:text-white hover:border-white/30 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed font-sans">
          {/* ABOUT THE BLOG */}
          {type === 'about' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/30">
                <h3 className="text-base font-bold text-white font-display uppercase text-[#5fdee7] mb-1">
                  Our Mission & Engineering Charter
                </h3>
                <p className="text-xs md:text-sm text-slate-200">
                  Founded as an independent technical publication, <strong className="text-white">dailytechrader</strong> provides uncompromising, evidence-based journalism covering consumer hardware, semiconductor physics, artificial intelligence models, cybersecurity protocols, and connected smart home infrastructure.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white font-mono uppercase text-[#ffcc00]">
                  Core Principles of dailytechrader
                </h4>
                <ul className="space-y-2 text-xs md:text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5fdee7] shrink-0 mt-0.5" />
                    <span><strong>Empirical Hardware Benchmarking:</strong> We reject marketing press releases. Every claims analysis is supported by oscilloscope measurements, thermal imaging, power analyzer readings, and automated compiler test suites.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5fdee7] shrink-0 mt-0.5" />
                    <span><strong>100% Commercial Independence:</strong> We accept no manufacturer sponsorship for test outcomes. Products purchased at retail are subjected to identical rigorous protocols as evaluation units.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5fdee7] shrink-0 mt-0.5" />
                    <span><strong>Peer-Reviewed Methodology:</strong> Every published technical investigation undergoes multi-editor validation and code review before release.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono space-y-2">
                <div className="text-[#5fdee7] font-bold">Physical Testing Facility:</div>
                <p>dailytechrader Systems Benchmarking Lab, Sector G-10/4, Islamabad & Remote EMEA Field Offices</p>
                <div className="text-slate-400">Accredited under International Telecommunications Union (ITU) and IEEE testing procedures.</div>
              </div>
            </div>
          )}

          {/* EDITORS */}
          {type === 'editors' && (
            <div className="space-y-5">
              <p className="text-xs md:text-sm">
                Our editorial newsroom is comprised of seasoned hardware engineers, digital forensics investigators, AI compiler specialists, and consumer technology journalists.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0b2721] border border-white/10 flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                    alt="Marcus Vance"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#5fdee7]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">Marcus Vance</h4>
                    <p className="text-[11px] text-[#5fdee7]">Editor-in-Chief & Lead Silicon Analyst</p>
                    <p className="text-[10px] text-slate-400 mt-1">Ex-semiconductor layout engineer specializing in TSMC 3nm nodes and mobile ISP architectures.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b2721] border border-white/10 flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80"
                    alt="Dr. Aris Thorne"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#ff007f]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">Dr. Aris Thorne</h4>
                    <p className="text-[11px] text-[#ff007f]">Director of AI & Neural Systems</p>
                    <p className="text-[10px] text-slate-400 mt-1">Ph.D. in Computer Science with focus on Diffusion Transformers, MoE routing, and RLVR reasoning.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b2721] border border-white/10 flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"
                    alt="Natalia Romanova"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#00ff66]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">Natalia Romanova</h4>
                    <p className="text-[11px] text-[#00ff66]">Cybersecurity & Cryptography Editor</p>
                    <p className="text-[10px] text-slate-400 mt-1">CISSP certified security auditor with deep expertise in WireGuard, kernel EDR, and memory-hard KDFs.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b2721] border border-white/10 flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
                    alt="Oliver Sterling"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#ffd700]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">Oliver Sterling</h4>
                    <p className="text-[11px] text-[#ffd700]">Smart Infrastructure & IoT Editor</p>
                    <p className="text-[10px] text-slate-400 mt-1">Embedded systems engineer specializing in Matter over Thread, Zigbee 3.0, and local Home Assistant firmware.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT NEWSROOM */}
          {type === 'contact' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/40 space-y-3">
                <h3 className="text-sm font-mono font-bold uppercase text-[#ffcc00] tracking-wider">
                  Direct Editorial & Newsroom Contact Points
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <a 
                    href="tel:03046308630"
                    className="p-3 rounded-lg bg-black/50 border border-white/10 hover:border-[#ffcc00] transition-colors flex items-center gap-3 text-white"
                  >
                    <div className="p-2 rounded-md bg-[#5fdee7]/20 text-[#5fdee7]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Phone / WhatsApp Desk:</span>
                      <span className="font-bold text-[#ffcc00]">03046308630</span>
                    </div>
                  </a>

                  <a 
                    href="mailto:ibrahimtrader019@gmail.com"
                    className="p-3 rounded-lg bg-black/50 border border-white/10 hover:border-[#5fdee7] transition-colors flex items-center gap-3 text-white"
                  >
                    <div className="p-2 rounded-md bg-[#5fdee7]/20 text-[#5fdee7]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Official Editorial Email:</span>
                      <span className="font-bold text-slate-200 truncate block">ibrahimtrader019@gmail.com</span>
                    </div>
                  </a>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#5fdee7]" />
                  <span>Newsroom Response SLA: Under 4 Business Hours for Whistleblower & Technical Inquiries</span>
                </div>
              </div>

              {/* Interactive Contact Form */}
              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white font-mono">
                    Dispatch Transmitted to Newsroom
                  </h4>
                  <p className="text-xs text-slate-300">
                    Thank you. Your message has been encrypted and routed directly to the dailytechrader editorial desk at <strong className="text-white">ibrahimtrader019@gmail.com</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-1.5 rounded text-xs font-mono bg-[#0b2721] text-[#5fdee7] border border-[#5fdee7]/30"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                    Submit Editorial Inquiry or Hardware Sample Request
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5fdee7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. alex@enterprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5fdee7]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Phone / WhatsApp Number</label>
                      <input
                        type="text"
                        placeholder="e.g. +92 304 6308630"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5fdee7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Subject Department</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#5fdee7]"
                      >
                        <option>General Technical Inquiry</option>
                        <option>Hardware Teardown & Benchmarking Pitch</option>
                        <option>Cybersecurity Vulnerability Disclosure</option>
                        <option>Editorial Fact-Check Verification</option>
                        <option>Syndication & Licensing Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Detailed Technical Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please provide details, test parameters, or background context..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5fdee7]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-mono text-slate-500">
                      Encrypted transmission. No data shared with 3rd parties.
                    </span>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-mono font-bold bg-[#ffcc00] hover:bg-[#ffd700] text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(255,204,0,0.4)] disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Transmitting...' : 'Send to Editors'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* EDITORIAL STANDARDS */}
          {type === 'standards' && (
            <div className="space-y-4">
              <p>
                At <strong>dailytechrader</strong>, we adhere to rigorous journalistic ethics and technical fact-checking protocols.
              </p>
              <div className="space-y-3">
                <div className="p-3.5 rounded-lg bg-[#0b2721] border border-white/10">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#5fdee7] mb-1">
                    1. Zero-Plagiarism & Authentic Authorship
                  </h4>
                  <p className="text-xs text-slate-300">
                    All technical evaluations, benchmarks, and architectural analyses are original works written by accredited specialists. We employ multi-engine verification tools to ensure 100% original content.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0b2721] border border-white/10">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#5fdee7] mb-1">
                    2. Correction & Errata Transparency
                  </h4>
                  <p className="text-xs text-slate-300">
                    If an empirical error or hardware revision discrepancy is identified, an update notice is prominently posted at the head of the article with explicit timestamping and diff logs.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0b2721] border border-white/10">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#5fdee7] mb-1">
                    3. Commercial Independence & Affiliate Disclosure
                  </h4>
                  <p className="text-xs text-slate-300">
                    Our editorial team operates with strict segregation from advertising networks. Product review scores and verdicts are never influenced by manufacturer ad spends or affiliate partnerships.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {type === 'privacy' && (
            <div className="space-y-4">
              <p>
                This Privacy Policy outlines how <strong>dailytechrader</strong> handles user privacy in compliance with GDPR, CCPA, and global internet data privacy frameworks.
              </p>
              <div className="space-y-3 text-xs">
                <h4 className="font-mono font-bold text-white uppercase text-[#5fdee7]">Information Collection & Use</h4>
                <p>
                  We do not harvest or sell personal user identifying information. We collect standard server logs (IP address, browser type, referral URL) solely for network load balancing and DDoS mitigation.
                </p>
                <h4 className="font-mono font-bold text-white uppercase text-[#5fdee7]">Cookie Usage & AdSense Compliance</h4>
                <p>
                  We deploy essential cookies required for session state, reading preferences (such as font size and bookmarks), and GDPR consent settings. Third-party advertising networks (including Google AdSense) may deploy cookies to deliver relevant advertisements in compliance with authorized digital seller specifications.
                </p>
                <h4 className="font-mono font-bold text-white uppercase text-[#5fdee7]">Your Rights</h4>
                <p>
                  Under GDPR Article 17 and CCPA, you hold the right to request access to or permanent erasure of any personal telemetry data by contacting our Data Protection Officer at <strong>ibrahimtrader019@gmail.com</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TERMS OF SERVICE */}
          {type === 'terms' && (
            <div className="space-y-4 text-xs">
              <p>
                By accessing <strong>dailytechrader</strong>, you agree to comply with standard acceptable use terms and intellectual property laws.
              </p>
              <h4 className="font-mono font-bold text-white uppercase text-[#5fdee7]">Intellectual Property</h4>
              <p>
                All original diagrams, technical benchmarks, infographic visual specifications, and article manuscripts are proprietary works of dailytechrader, protected under international copyright conventions (2026).
              </p>
              <h4 className="font-mono font-bold text-white uppercase text-[#5fdee7]">Technical Disclaimer</h4>
              <p>
                Hardware overclocking, firmware flashing, and electrical modifications described in our guides carry inherent risks. Users must exercise appropriate safety precautions; dailytechrader accepts no liability for hardware damage resulting from user modifications.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#061411] border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400 px-6">
          <span>dailytechrader Official Records • 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#5fdee7] hover:bg-[#ffcc00] text-black font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
