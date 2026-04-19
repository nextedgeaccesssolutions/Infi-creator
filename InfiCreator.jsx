/**
 * InfiCreator — AI Marketing Studio
 * React JSX · Open Source · No API Key Required for Image Generation
 * Image Generation: Pollinations.ai (FREE, no key)
 * Marketing Copy: Claude AI (via Anthropic API)
 * Meta Integration: Facebook & Instagram Publisher UI
 *
 * Usage:
 *   npm create vite@latest infi-creator -- --template react
 *   cd infi-creator && npm install
 *   Replace src/App.jsx with this file
 *   npm run dev
 */

import { useState, useRef, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const STYLES = [
  { label: "📸 Photo",    value: "photorealistic" },
  { label: "🎨 Digital",  value: "digital art" },
  { label: "🎬 Cinema",   value: "cinematic" },
  { label: "◽ Minimal",  value: "minimalist" },
  { label: "💎 3D",       value: "3d render" },
  { label: "📦 Product",  value: "product photography" },
  { label: "✨ Anime",    value: "anime" },
  { label: "🖼 Painting", value: "oil painting" },
  { label: "🌊 Abstract", value: "abstract art" },
];

const RATIOS = [
  { label: "1:1",    w: 1024, h: 1024 },
  { label: "1.91:1", w: 1200, h: 628  },
  { label: "9:16",   w: 1080, h: 1920 },
  { label: "FB",     w: 1200, h: 630  },
  { label: "IG",     w: 1080, h: 1080 },
];

const MODELS = [
  { label: "FLUX (Best Quality)",  value: "flux"           },
  { label: "Turbo (Fastest)",      value: "turbo"           },
  { label: "FLUX Realism",         value: "flux-realism"    },
  { label: "FLUX Anime",           value: "flux-anime"      },
  { label: "DreamShaper XL",       value: "dreamshaper"     },
];

const BOOSTS = [
  { label: "None", value: "" },
  { label: "Product Ad",    value: "professional marketing photo, commercial quality, studio lighting, brand advertisement" },
  { label: "Social Media",  value: "social media viral content, eye-catching, trending aesthetic, professional" },
  { label: "Luxury Brand",  value: "luxury brand aesthetic, premium quality, elegant composition, award-winning photography" },
  { label: "E-Commerce",    value: "e-commerce product photo, white background, clean, high resolution" },
  { label: "Facebook Ad",   value: "Facebook ad creative, high CTR, attention-grabbing, marketing campaign" },
];

const TONES = ["🔥 Hype", "✨ Inspiring", "😂 Funny", "💼 Professional", "💜 Emotional", "🎯 Direct"];

const PLATFORMS = [
  { id: "fb", label: "📘 Facebook",  cls: "fb" },
  { id: "ig", label: "📸 Instagram", cls: "ig" },
  { id: "tt", label: "🎵 TikTok",    cls: "tt" },
  { id: "tw", label: "𝕏 Twitter",    cls: "tw" },
];

const GOALS = ["Drive Sales", "Brand Awareness", "Engagement & Shares", "App Downloads", "Event Promotion", "Lead Generation"];

const AUTOMATIONS = [
  { icon: "📅", name: "Daily Post Scheduler",    desc: "AI generates & posts 3× daily at optimal times · Facebook + Instagram", color: "rgba(16,185,129,.12)",  defaultOn: true  },
  { icon: "✦",  name: "AI Content Generator",    desc: "Auto-generates images + captions from your product catalog weekly",     color: "rgba(124,58,237,.12)", defaultOn: true  },
  { icon: "💬", name: "Auto Comment Responder",  desc: "AI reads & replies to every comment with brand-appropriate responses",  color: "rgba(6,182,212,.12)",  defaultOn: true  },
  { icon: "📊", name: "Performance Optimizer",   desc: "Analyzes post metrics, adjusts strategy, boosts high-performing content",color: "rgba(245,158,11,.1)", defaultOn: false },
  { icon: "🎯", name: "Trend Watcher",           desc: "Monitors viral trends, auto-creates trend-relevant content to maximize reach", color: "rgba(236,72,153,.1)", defaultOn: true },
  { icon: "🔄", name: "Cross-Platform Reposter", desc: "Reformats & reposts top content across all linked Meta accounts",        color: "rgba(16,185,129,.1)", defaultOn: false },
];

const NAV = [
  { section: "Create",   items: [
    { id: "dashboard", icon: "⊞", label: "Dashboard"       },
    { id: "generator", icon: "✦", label: "AI Image Creator", badge: "Free" },
    { id: "media",     icon: "⊟", label: "Media Library"   },
    { id: "copy",      icon: "✍", label: "Marketing Copy"  },
  ]},
  { section: "Publish",  items: [
    { id: "publisher",  icon: "📡", label: "Meta Publisher" },
    { id: "campaigns",  icon: "⚡", label: "Campaigns"      },
  ]},
  { section: "Automate", items: [
    { id: "automation", icon: "🤖", label: "AI Automation", badge: "New" },
    { id: "analytics",  icon: "◈",  label: "Analytics"      },
  ]},
];

const PANEL_TITLES = {
  dashboard: "Dashboard", generator: "AI Image Creator", media: "Media Library",
  copy: "Marketing Copy", publisher: "Meta Publisher", campaigns: "Campaigns",
  automation: "AI Automation", analytics: "Analytics",
};

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES  (injected once as a <style> tag)
// ─────────────────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:#080810; --sb:#0d0d18; --surf:#12121f; --surf2:#1a1a2e; --surf3:#21213a;
  --bdr:#1e1e35; --bdr2:#2a2a45;
  --txt:#ede9ff; --txt2:#8b85aa; --txt3:#4a4568;
  --acc:#7c3aed; --acc2:#9d5ff0; --ag:rgba(124,58,237,.18);
  --pink:#ec4899; --cyan:#06b6d4; --amb:#f59e0b; --grn:#10b981; --red:#ef4444;
  --meta:#1877f2;
  --r:10px; --rsm:7px; --rxs:5px;
  --ff:'DM Sans',system-ui,sans-serif;
  --fd:'Syne',system-ui,sans-serif;
  --fm:'DM Mono',monospace;
}

html, body, #root { height: 100%; overflow: hidden; }
body { font-family: var(--ff); background: var(--bg); color: var(--txt); font-size: 14px; line-height: 1.6; }

/* ── APP SHELL ── */
.app   { display: flex; height: 100vh; overflow: hidden; }
.sidebar { width: 228px; min-width: 228px; background: var(--sb); border-right: 0.5px solid var(--bdr); display: flex; flex-direction: column; height: 100vh; overflow: hidden; transition: width .2s, min-width .2s, opacity .2s; }
.sidebar.collapsed { width: 0; min-width: 0; opacity: 0; border: none; overflow: hidden; }
.main  { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }

/* ── SIDEBAR ── */
.sb-logo { padding: 15px 14px 12px; display: flex; align-items: center; gap: 10px; border-bottom: 0.5px solid var(--bdr); flex-shrink: 0; }
.sb-logo-icon { width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg,var(--acc),var(--pink)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sb-logo-name { font-family: var(--fd); font-size: 14px; font-weight: 700; letter-spacing: -.02em; white-space: nowrap; }
.sb-logo-sub  { font-size: 9px; color: var(--txt3); letter-spacing: .05em; text-transform: uppercase; margin-top: 1px; }
.sb-nav { padding: 10px 9px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 1px; }
.sb-nav::-webkit-scrollbar { width: 2px; }
.sb-nav::-webkit-scrollbar-thumb { background: var(--bdr2); border-radius: 2px; }
.nav-section { font-size: 9.5px; font-weight: 500; letter-spacing: .08em; color: var(--txt3); text-transform: uppercase; padding: 8px 5px 4px; margin-top: 3px; }
.nav-item { display: flex; align-items: center; gap: 8px; padding: 7px 9px; border-radius: var(--rsm); cursor: pointer; border: 0.5px solid transparent; color: var(--txt2); transition: all .12s; white-space: nowrap; }
.nav-item:hover { background: var(--surf); border-color: var(--bdr); color: var(--txt); }
.nav-item.active { background: var(--surf2); border-color: var(--bdr2); color: var(--txt); }
.nav-item.active .nav-icon { color: var(--acc); }
.nav-icon  { font-size: 14px; width: 18px; text-align: center; flex-shrink: 0; }
.nav-label { font-size: 12.5px; }
.nav-badge { margin-left: auto; font-size: 9px; background: var(--acc); color: #fff; border-radius: 8px; padding: 1px 6px; font-weight: 500; }
.sb-bottom { padding: 11px; border-top: 0.5px solid var(--bdr); flex-shrink: 0; }
.sb-plan   { background: linear-gradient(135deg,rgba(124,58,237,.15),rgba(236,72,153,.08)); border: 0.5px solid rgba(124,58,237,.3); border-radius: var(--rsm); padding: 10px 12px; }
.sb-plan-title { font-size: 11px; font-weight: 500; margin-bottom: 2px; }
.sb-plan-sub   { font-size: 10px; color: var(--txt2); line-height: 1.5; }
.sb-plan-tag   { display: inline-block; font-size: 9px; font-weight: 600; background: var(--acc); color: #fff; border-radius: 3px; padding: 1px 5px; margin-top: 4px; letter-spacing: .04em; }

/* ── HEADER ── */
.mhead { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; border-bottom: 0.5px solid var(--bdr); flex-shrink: 0; }
.mh-title { font-family: var(--fd); font-size: 15px; font-weight: 600; letter-spacing: -.02em; }
.mh-right { display: flex; align-items: center; gap: 8px; }
.mh-btn   { background: none; border: 0.5px solid var(--bdr2); border-radius: var(--rsm); padding: 5px 11px; cursor: pointer; font-family: var(--ff); font-size: 12px; color: var(--txt2); display: flex; align-items: center; gap: 5px; transition: all .12s; }
.mh-btn:hover { border-color: var(--acc); color: var(--txt); background: var(--ag); }
.mh-btn.primary { background: var(--acc); color: #fff; border-color: var(--acc); }
.mh-btn.primary:hover { background: var(--acc2); }

/* ── CONTENT ── */
.content { flex: 1; overflow-y: auto; }
.content::-webkit-scrollbar { width: 3px; }
.content::-webkit-scrollbar-thumb { background: var(--bdr2); border-radius: 2px; }
.panel { padding: 20px 20px; display: none; }
.panel.active { display: block; }

/* ── CARDS ── */
.card  { background: var(--surf); border: 0.5px solid var(--bdr); border-radius: var(--r); padding: 16px; }
.card-title { font-family: var(--fd); font-size: 13px; font-weight: 600; letter-spacing: -.01em; margin-bottom: 2px; }
.card-sub   { font-size: 11.5px; color: var(--txt2); margin-bottom: 12px; line-height: 1.5; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 11px; }
.grid4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 11px; }

/* ── STAT CARDS ── */
.stat-card { background: var(--surf); border: 0.5px solid var(--bdr); border-radius: var(--r); padding: 13px 15px; }
.stat-icon  { width: 32px; height: 32px; border-radius: var(--rsm); display: flex; align-items: center; justify-content: center; margin-bottom: 9px; font-size: 15px; }
.stat-val   { font-family: var(--fd); font-size: 22px; font-weight: 700; letter-spacing: -.03em; line-height: 1; }
.stat-label { font-size: 11px; color: var(--txt2); margin-top: 3px; }
.stat-up    { font-size: 10.5px; color: var(--grn); margin-top: 4px; }
.stat-dn    { font-size: 10.5px; color: var(--red); margin-top: 4px; }

/* ── FORMS ── */
.form-group { margin-bottom: 13px; }
.form-label { font-size: 11.5px; color: var(--txt2); display: block; margin-bottom: 4px; }
.form-input { background: var(--surf2); border: 0.5px solid var(--bdr2); border-radius: var(--rsm); padding: 8px 11px; font-family: var(--ff); font-size: 13px; color: var(--txt); outline: none; width: 100%; transition: border-color .15s; }
.form-input::placeholder { color: var(--txt3); }
.form-input:focus { border-color: var(--acc); }
.form-textarea { resize: vertical; min-height: 80px; line-height: 1.6; }
.form-select option { background: var(--surf); }
.row { display: flex; gap: 10px; }
.row .form-group { flex: 1; }

/* ── BUTTONS ── */
.btn    { padding: 8px 15px; border-radius: var(--rsm); border: none; cursor: pointer; font-family: var(--ff); font-size: 13px; font-weight: 500; display: inline-flex; align-items: center; gap: 7px; transition: all .15s; }
.btn-primary   { background: var(--acc); color: #fff; }
.btn-primary:hover { background: var(--acc2); }
.btn-secondary { background: var(--surf2); color: var(--txt2); border: 0.5px solid var(--bdr2); }
.btn-secondary:hover { color: var(--txt); border-color: var(--bdr2); }
.btn-meta { background: var(--meta); color: #fff; }
.btn-meta:hover { background: #1464cc; }
.btn-ig   { background: linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045); color: #fff; border: none; }
.btn-sm   { padding: 5px 10px; font-size: 12px; }
.btn-xs   { padding: 3px 8px; font-size: 11px; }
.btn:disabled { opacity: .38; cursor: default; }

/* ── TAGS / BADGES ── */
.tag      { display: inline-flex; align-items: center; gap: 4px; padding: 2px 7px; border-radius: 4px; font-size: 10.5px; font-weight: 500; }
.tag-free { background: rgba(16,185,129,.12); color: var(--grn);  border: 0.5px solid rgba(16,185,129,.25); }
.tag-ai   { background: rgba(124,58,237,.12); color: var(--acc2); border: 0.5px solid rgba(124,58,237,.25); }
.tag-meta { background: rgba(24,119,242,.12); color: var(--meta); border: 0.5px solid rgba(24,119,242,.25); }
.ai-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 20px; font-size: 10.5px; background: linear-gradient(135deg,rgba(124,58,237,.2),rgba(236,72,153,.1)); border: 0.5px solid rgba(124,58,237,.3); color: var(--acc2); }

/* ── UPLOAD ZONE ── */
.upload-zone { border: 1.5px dashed var(--bdr2); border-radius: var(--r); padding: 32px 16px; text-align: center; cursor: pointer; transition: all .2s; background: var(--surf); }
.upload-zone:hover, .upload-zone.drag { border-color: var(--acc); background: var(--ag); }
.upload-icon  { font-size: 34px; margin-bottom: 8px; }
.upload-title { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
.upload-sub   { font-size: 12px; color: var(--txt2); }
.upload-note  { display: inline-block; margin-top: 9px; font-size: 10.5px; color: var(--txt3); background: var(--surf2); border-radius: 20px; padding: 2px 10px; border: 0.5px solid var(--bdr); }

/* ── MEDIA GRID ── */
.media-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(120px,1fr)); gap: 9px; margin-top: 13px; }
.media-item { aspect-ratio: 1; border-radius: var(--rsm); overflow: hidden; position: relative; border: 0.5px solid var(--bdr); cursor: pointer; transition: all .15s; }
.media-item:hover { border-color: var(--acc); }
.media-item.selected { border: 1.5px solid var(--acc); box-shadow: 0 0 0 2px var(--ag); }
.media-item img, .media-item video { width: 100%; height: 100%; object-fit: cover; }
.media-type { position: absolute; top: 5px; right: 5px; font-size: 9.5px; background: rgba(0,0,0,.65); color: #fff; border-radius: 3px; padding: 1px 5px; font-family: var(--fm); }
.media-check { position: absolute; top: 5px; left: 5px; width: 17px; height: 17px; border-radius: 50%; background: var(--acc); display: none; align-items: center; justify-content: center; font-size: 9px; color: #fff; }
.media-item.selected .media-check { display: flex; }

/* ── IMAGE GENERATOR ── */
.gen-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
.gen-preview { aspect-ratio: 1; background: var(--surf2); border-radius: var(--r); border: 0.5px solid var(--bdr); display: flex; align-items: center; justify-content: center; overflow: hidden; }
.gen-placeholder { text-align: center; color: var(--txt3); }
.gen-placeholder-icon { font-size: 38px; margin-bottom: 8px; }
.style-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; margin-top: 7px; }
.style-chip { padding: 6px 7px; border-radius: var(--rxs); border: 0.5px solid var(--bdr2); background: var(--surf2); cursor: pointer; font-size: 11.5px; text-align: center; color: var(--txt2); transition: all .12s; }
.style-chip:hover { border-color: var(--acc); color: var(--txt); }
.style-chip.active { border-color: var(--acc); background: var(--ag); color: var(--acc); }
.ratio-row { display: flex; gap: 5px; margin-top: 6px; }
.ratio-btn { padding: 4px 10px; border-radius: var(--rxs); border: 0.5px solid var(--bdr2); background: var(--surf2); cursor: pointer; font-family: var(--fm); font-size: 11px; color: var(--txt2); transition: all .12s; }
.ratio-btn.active { border-color: var(--acc); color: var(--acc); background: var(--ag); }
.load-bar { height: 2px; background: var(--bdr); border-radius: 2px; overflow: hidden; margin-top: 9px; }
.load-fill { height: 100%; background: linear-gradient(90deg,var(--acc),var(--pink)); border-radius: 2px; width: 0; transition: width .4s; }
.load-fill.animate { animation: lbar 1.8s ease infinite; }
@keyframes lbar { 0%{width:0;margin-left:0} 50%{width:60%;margin-left:20%} 100%{width:0;margin-left:100%} }
.gen-actions { display: flex; gap: 7px; margin-top: 9px; flex-wrap: wrap; }
.hist-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 5px; margin-top: 8px; }
.hist-thumb { aspect-ratio: 1; border-radius: var(--rxs); overflow: hidden; cursor: pointer; border: 0.5px solid var(--bdr); transition: border-color .12s; }
.hist-thumb:hover { border-color: var(--acc); }
.hist-thumb img { width: 100%; height: 100%; object-fit: cover; }

/* ── COPY PANEL ── */
.copy-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.plat-tabs { display: flex; gap: 5px; margin-bottom: 12px; flex-wrap: wrap; }
.plat-tab  { padding: 5px 11px; border-radius: 20px; border: 0.5px solid var(--bdr2); background: none; cursor: pointer; font-family: var(--ff); font-size: 12px; color: var(--txt2); display: flex; align-items: center; gap: 5px; transition: all .12s; }
.plat-tab:hover { border-color: var(--bdr2); color: var(--txt); }
.plat-tab.active.fb { background: rgba(24,119,242,.15); border-color: rgba(24,119,242,.4); color: var(--meta); }
.plat-tab.active.ig { background: rgba(236,72,153,.12); border-color: rgba(236,72,153,.35); color: var(--pink); }
.plat-tab.active.tt { background: rgba(6,182,212,.12);  border-color: rgba(6,182,212,.35);  color: var(--cyan); }
.plat-tab.active.tw { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.2); color: var(--txt); }
.copy-output { background: var(--surf2); border: 0.5px solid var(--bdr2); border-radius: var(--rsm); padding: 11px 13px; min-height: 130px; font-size: 13.5px; line-height: 1.75; color: var(--txt); }
.hashtag-cloud { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px; }
.hashtag { padding: 2px 8px; border-radius: 20px; background: var(--ag); border: 0.5px solid rgba(124,58,237,.3); color: var(--acc2); font-size: 11.5px; cursor: pointer; font-family: var(--fm); transition: background .12s; }
.hashtag:hover { background: rgba(124,58,237,.28); }
.tone-row { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 5px; }
.tone-chip { padding: 4px 9px; border-radius: 20px; border: 0.5px solid var(--bdr2); background: none; cursor: pointer; font-size: 11.5px; color: var(--txt2); transition: all .12s; }
.tone-chip:hover { border-color: var(--bdr2); color: var(--txt); }
.tone-chip.active { border-color: var(--acc); color: var(--acc); background: var(--ag); }

/* ── META PUBLISHER ── */
.pub-layout { display: grid; grid-template-columns: 1fr 1.15fr; gap: 18px; align-items: start; }
.preview-device { background: var(--surf2); border-radius: 14px; border: 0.5px solid var(--bdr); overflow: hidden; }
.device-bar  { background: var(--surf); padding: 8px 12px; display: flex; align-items: center; gap: 7px; border-bottom: 0.5px solid var(--bdr); }
.device-dots { display: flex; gap: 4px; }
.device-dot  { width: 7px; height: 7px; border-radius: 50%; }
.device-name { font-size: 10px; color: var(--txt3); margin-left: auto; font-family: var(--fm); }
.fb-post     { background: #18191a; padding: 11px; }
.fb-avatar   { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,var(--acc),var(--pink)); display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
.fb-ph       { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; }
.fb-name     { font-size: 13px; font-weight: 500; color: #e4e6eb; }
.fb-meta     { font-size: 11px; color: #b0b3b8; }
.fb-body     { color: #e4e6eb; line-height: 1.65; font-size: 13px; margin-bottom: 9px; }
.fb-image    { width: 100%; border-radius: 5px; background: var(--surf3); aspect-ratio: 1.91; display: flex; align-items: center; justify-content: center; overflow: hidden; color: var(--txt3); font-size: 11px; }
.fb-image img { width: 100%; height: 100%; object-fit: cover; }
.fb-actions  { display: flex; gap: 0; border-top: 0.5px solid #3a3b3c; margin-top: 9px; padding-top: 6px; }
.fb-action   { flex: 1; text-align: center; padding: 3px; font-size: 12px; color: #b0b3b8; cursor: pointer; border-radius: 4px; }
.fb-action:hover { background: #3a3b3c; }
.ig-post     { background: #000; padding: 11px; }
.ig-ph       { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.ig-ava-wrap { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#f77737,#e1306c,#833ab4); padding: 2px; flex-shrink: 0; }
.ig-ava-inner{ width: 100%; height: 100%; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center; font-size: 11px; }
.ig-name     { font-size: 13px; font-weight: 500; color: #fff; }
.ig-image    { width: 100%; aspect-ratio: 1; background: var(--surf3); display: flex; align-items: center; justify-content: center; overflow: hidden; color: var(--txt3); font-size: 11px; }
.ig-image img { width: 100%; height: 100%; object-fit: cover; }
.ig-acts     { display: flex; gap: 12px; padding: 8px 0 4px; font-size: 18px; }
.ig-caption  { font-size: 12.5px; color: #fff; line-height: 1.55; margin-top: 3px; }
.ig-tags     { font-size: 12px; color: #00b4d8; margin-top: 3px; }
.plat-switch { display: flex; gap: 5px; margin-bottom: 12px; }
.psw-btn     { padding: 5px 12px; border-radius: 20px; border: 0.5px solid var(--bdr2); background: none; cursor: pointer; font-size: 12px; color: var(--txt2); display: flex; align-items: center; gap: 5px; transition: all .12s; }
.psw-btn.fb.active { background: var(--meta); border-color: var(--meta); color: #fff; }
.psw-btn.ig.active { background: linear-gradient(135deg,#833ab4,#fd1d1d); border-color: transparent; color: #fff; }

/* ── CAMPAIGNS ── */
.camp-card  { background: var(--surf); border: 0.5px solid var(--bdr); border-radius: var(--r); padding: 12px 15px; margin-bottom: 7px; display: flex; align-items: center; gap: 13px; }
.camp-thumb { width: 42px; height: 42px; border-radius: var(--rsm); background: var(--surf2); display: flex; align-items: center; justify-content: center; font-size: 19px; flex-shrink: 0; overflow: hidden; }
.camp-thumb img { width: 100%; height: 100%; object-fit: cover; }
.camp-name  { font-size: 13px; font-weight: 500; }
.camp-meta  { font-size: 11px; color: var(--txt2); margin-top: 1px; }
.camp-stats { margin-left: auto; display: flex; gap: 14px; text-align: right; }
.camp-sv    { font-family: var(--fd); font-size: 14px; font-weight: 600; }
.camp-sl    { font-size: 9.5px; color: var(--txt2); }
.status-pill { padding: 2px 8px; border-radius: 20px; font-size: 10.5px; font-weight: 500; white-space: nowrap; }
.status-live  { background: rgba(16,185,129,.15); color: var(--grn);  border: 0.5px solid rgba(16,185,129,.3); }
.status-draft { background: rgba(245,158,11,.12); color: var(--amb);  border: 0.5px solid rgba(245,158,11,.25); }
.status-done  { background: var(--surf2);          color: var(--txt3); border: 0.5px solid var(--bdr); }

/* ── AUTOMATION ── */
.flow-card { background: var(--surf); border: 0.5px solid var(--bdr); border-radius: var(--r); padding: 12px 14px; display: flex; align-items: center; gap: 12px; margin-bottom: 7px; cursor: pointer; transition: all .12s; }
.flow-card:hover { border-color: var(--bdr2); }
.flow-card.active-flow { border-color: var(--acc); background: var(--ag); }
.flow-icon { width: 36px; height: 36px; border-radius: var(--rsm); display: flex; align-items: center; justify-content: center; font-size: 17px; flex-shrink: 0; }
.flow-name { font-size: 13px; font-weight: 500; letter-spacing: -.01em; margin-bottom: 1px; }
.flow-desc { font-size: 11.5px; color: var(--txt2); line-height: 1.45; }
.flow-status { margin-left: auto; display: flex; align-items: center; gap: 5px; font-size: 11px; white-space: nowrap; }
.flow-dot  { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.flow-dot.on  { background: var(--grn); box-shadow: 0 0 5px var(--grn); }
.flow-dot.off { background: var(--txt3); }
.toggle-sw { width: 32px; height: 17px; border-radius: 9px; border: none; cursor: pointer; position: relative; transition: background .2s; flex-shrink: 0; }
.toggle-sw.on  { background: var(--acc); }
.toggle-sw.off { background: var(--bdr2); }
.toggle-sw::after { content:''; position: absolute; width: 13px; height: 13px; border-radius: 50%; background: #fff; top: 2px; transition: left .2s; }
.toggle-sw.on::after  { left: 17px; }
.toggle-sw.off::after { left: 2px; }

/* ── MISC ── */
.section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.section-title  { font-family: var(--fd); font-size: 16px; font-weight: 600; letter-spacing: -.02em; }
.section-sub    { font-size: 11.5px; color: var(--txt2); margin-top: 2px; }
.divider { border: none; border-top: 0.5px solid var(--bdr); margin: 14px 0; }
.empty   { text-align: center; padding: 36px 20px; color: var(--txt3); }
.empty-icon { font-size: 30px; margin-bottom: 7px; }
.empty-text { font-size: 12.5px; }
.model-label { font-size: 10.5px; color: var(--txt3); display: flex; align-items: center; gap: 5px; margin-bottom: 5px; font-family: var(--fm); }
.model-dot   { width: 4px; height: 4px; border-radius: 50%; background: var(--acc); }

/* ── SPINNERS / ANIMATION ── */
.spinner { width: 14px; height: 14px; border: 1.5px solid var(--bdr2); border-top-color: var(--acc); border-radius: 50%; animation: spin .7s linear infinite; display: inline-block; flex-shrink: 0; }
.spin-icon { animation: spin .7s linear infinite; display: inline-block; }
@keyframes spin { to { transform: rotate(360deg) } }
.fade-in { animation: fadeIn .3s ease forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px) } to { opacity: 1; transform: translateY(0) } }

/* ── ANALYTICS ── */
.insight-card { padding: 10px 13px; border-radius: var(--rsm); font-size: 13px; margin-bottom: 8px; line-height: 1.6; }
.insight-purple { background: rgba(124,58,237,.08); border: 0.5px solid rgba(124,58,237,.2); }
.insight-green  { background: rgba(16,185,129,.08);  border: 0.5px solid rgba(16,185,129,.2); }
.insight-amber  { background: rgba(245,158,11,.08);  border: 0.5px solid rgba(245,158,11,.2); }

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 3px; height: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--bdr2); border-radius: 2px; }

/* ── MOBILE ── */
@media (max-width:660px) {
  .sidebar { position:fixed;left:0;top:0;bottom:0;z-index:200;transform:translateX(-100%);transition:transform .25s;width:228px!important;min-width:228px!important;opacity:1!important;border-right:0.5px solid var(--bdr)!important; }
  .sidebar.mobile-open { transform:translateX(0); }
  .sidebar.collapsed { transform:translateX(-100%);width:228px!important;min-width:228px!important; }
  .gen-layout, .copy-layout, .pub-layout { grid-template-columns:1fr; }
  .grid4 { grid-template-columns:repeat(2,1fr); }
  .grid3 { grid-template-columns:1fr 1fr; }
  .mobile-overlay { display:block!important; }
}
.mobile-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.55); z-index:199; backdrop-filter:blur(2px); }
`;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callClaude(prompt, maxTokens = 900) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

function buildPollinationsUrl(prompt, style, model, w, h, seed) {
  const full = `${prompt}, ${style}`;
  const enc = encodeURIComponent(full);
  return `https://image.pollinations.ai/prompt/${enc}?width=${w}&height=${h}&model=${model}&seed=${seed}&nologo=true&enhance=true`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** Small toast notification */
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{ position:"fixed", bottom:22, right:22, background:"#1a1a2e", border:"0.5px solid var(--acc)", borderRadius:9, padding:"9px 15px", fontSize:13, color:"var(--txt)", zIndex:999, boxShadow:"0 4px 20px rgba(0,0,0,.5)" }} className="fade-in">
      {message}
    </div>
  );
}

/** Toggle switch */
function ToggleSw({ on, onToggle, onClick }) {
  return (
    <button className={`toggle-sw ${on ? "on" : "off"}`}
      onClick={(e) => { e.stopPropagation(); onToggle(); if (onClick) onClick(e); }}
    />
  );
}

/** Facebook post preview */
function FBPreview({ caption, imageUrl }) {
  return (
    <div className="preview-device">
      <div className="device-bar">
        <div className="device-dots">
          <div className="device-dot" style={{ background: "#ff5f56" }} />
          <div className="device-dot" style={{ background: "#ffbd2e" }} />
          <div className="device-dot" style={{ background: "#27c93f" }} />
        </div>
        <span className="device-name">facebook.com</span>
      </div>
      <div className="fb-post">
        <div className="fb-ph">
          <div className="fb-avatar">🏢</div>
          <div><div className="fb-name">Your Page</div><div className="fb-meta">Just now · 🌐</div></div>
        </div>
        <div className="fb-body" dangerouslySetInnerHTML={{ __html: caption.replace(/\n/g, "<br>") || "Your caption will appear here…" }} />
        <div className="fb-image">
          {imageUrl ? <img src={imageUrl} alt="post" /> : "Image preview"}
        </div>
        <div className="fb-actions">
          <div className="fb-action">👍 Like</div>
          <div className="fb-action">💬 Comment</div>
          <div className="fb-action">↗ Share</div>
        </div>
      </div>
    </div>
  );
}

/** Instagram post preview */
function IGPreview({ caption, imageUrl, hashtags }) {
  return (
    <div className="preview-device">
      <div className="device-bar">
        <div className="device-dots">
          <div className="device-dot" style={{ background: "#ff5f56" }} />
          <div className="device-dot" style={{ background: "#ffbd2e" }} />
          <div className="device-dot" style={{ background: "#27c93f" }} />
        </div>
        <span className="device-name">instagram.com</span>
      </div>
      <div className="ig-post">
        <div className="ig-ph">
          <div className="ig-ava-wrap"><div className="ig-ava-inner">📸</div></div>
          <div className="ig-name">your_brand</div>
          <button style={{ marginLeft:"auto", background:"none", border:"none", color:"#0095f6", cursor:"pointer", fontSize:13, fontWeight:500 }}>Follow</button>
        </div>
        <div className="ig-image">{imageUrl ? <img src={imageUrl} alt="ig" /> : "Image preview"}</div>
        <div className="ig-acts"><span>🤍</span><span>💬</span><span>↗</span><span style={{ marginLeft:"auto" }}>🔖</span></div>
        <div className="ig-caption"><strong>your_brand</strong> {caption || "Caption here…"}</div>
        {hashtags.length > 0 && <div className="ig-tags">{hashtags.slice(0, 8).join(" ")}</div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PANELS
// ─────────────────────────────────────────────────────────────────────────────

function DashboardPanel({ onNavigate, mediaItems }) {
  const LIBS = [
    { icon: "🎨", name: "Pollinations.ai",  desc: "Free image generation · FLUX · No key", tags: ["Free","AI"] },
    { icon: "🤗", name: "Transformers.js",  desc: "Browser AI · Open source · No backend",  tags: ["Free","AI"] },
    { icon: "📡", name: "Meta Graph API",   desc: "FB & IG publishing · Schedule · Analytics",tags: ["Meta"] },
  ];
  const tagClass = { Free:"tag-free", AI:"tag-ai", Meta:"tag-meta" };
  return (
    <div>
      <div className="grid4" style={{ marginBottom:14 }}>
        {[["✦","rgba(124,58,237,.15)","var(--acc)","1,284","Images Created","↑ 23% this week"],
          ["📡","rgba(24,119,242,.12)","#1877f2","48","Posts Published","↑ 8 today"],
          ["⚡","rgba(16,185,129,.12)","var(--grn)","92K","Total Reach","↑ 41% vs last"],
          ["🤖","rgba(236,72,153,.12)","var(--pink)","7","Automations","All running"]
        ].map(([icon,bg,color,val,label,change]) => (
          <div className="stat-card" key={label}>
            <div className="stat-icon" style={{ background:bg, color }}>{icon}</div>
            <div className="stat-val">{val}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-up">{change}</div>
          </div>
        ))}
      </div>
      <div className="grid2" style={{ marginBottom:14 }}>
        <div className="card">
          <div className="card-title">Quick Create</div>
          <div className="card-sub">Generate AI content in one click</div>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {[["✦ AI Image Generator","generator"],["✍ Marketing Copy","copy"],["📡 Post to Meta","publisher"],["⊟ Upload Media","media"]].map(([l,id]) => (
              <button key={id} className={`btn ${id==="generator"?"btn-primary":"btn-secondary"}`} style={{ justifyContent:"center" }} onClick={() => onNavigate(id)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title">Recent Activity</div>
          <div className="card-sub">Latest AI actions</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, fontSize:12.5 }}>
            {[["✦","Generated product image","2 min ago · Pollinations AI"],
              ["📡","Auto-posted to Facebook","15 min ago · Meta API"],
              ["✍","Generated 5 captions","1h ago · Claude AI"],
              ["🤖","Scheduled 12 posts","2h ago · AI Autopilot"]
            ].map(([icon,text,meta]) => (
              <div key={text} style={{ display:"flex", gap:10, alignItems:"center" }}>
                <span style={{ fontSize:16 }}>{icon}</span>
                <div><div>{text}</div><div style={{ color:"var(--txt3)", fontSize:11 }}>{meta}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="section-header" style={{ marginBottom:10 }}>
          <div><div className="card-title">Open Source Libraries</div><div className="card-sub">Free AI tools powering InfiCreator — no API key required for image generation</div></div>
          <a href="https://github.com/pollinations/pollinations" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">GitHub ↗</a>
        </div>
        <div className="grid3">
          {LIBS.map((lib) => (
            <div key={lib.name} style={{ background:"var(--surf2)", border:"0.5px solid var(--bdr2)", borderRadius:"var(--rsm)", padding:12 }}>
              <div style={{ fontSize:13, fontWeight:500, marginBottom:3 }}>{lib.icon} {lib.name}</div>
              <div style={{ fontSize:11, color:"var(--txt2)", lineHeight:1.5 }}>{lib.desc}</div>
              <div style={{ marginTop:6, display:"flex", gap:4 }}>
                {lib.tags.map(t => <span key={t} className={`tag ${tagClass[t]}`}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function GeneratorPanel({ onSaveToLibrary, onUseInPost, sharedImage, setSharedImage }) {
  const [prompt, setPrompt] = useState("");
  const [negative, setNegative] = useState("");
  const [style, setStyle] = useState("photorealistic");
  const [ratio, setRatio] = useState(RATIOS[0]);
  const [model, setModel] = useState("flux");
  const [boost, setBoost] = useState("");
  const [seed, setSeed] = useState("");
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState(sharedImage || null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setLoading(true);
    setImageUrl(null);
    const s = seed || Math.floor(Math.random() * 99999);
    const fullPrompt = `${prompt}${boost ? ", " + boost : ""}${negative ? ", NOT: " + negative : ""}`;
    const url = buildPollinationsUrl(fullPrompt, style, model, ratio.w, ratio.h, s);
    try {
      await new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
      setImageUrl(url);
      setSharedImage(url);
      setHistory((prev) => [{ url, prompt }, ...prev.slice(0, 7)]);
    } catch {
      alert("Generation failed — please try again");
    }
    setGenerating(false);
    setLoading(false);
  };

  const download = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl; a.download = "infi-creator-image.jpg"; a.click();
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">✦ AI Image Creator</div>
          <div className="section-sub">Pollinations.ai · FLUX / SDXL / DreamShaper · 100% free · No API key needed</div>
        </div>
        <span className="tag tag-free">100% Free</span>
      </div>
      <div className="gen-layout">
        {/* Preview */}
        <div>
          <div className="gen-preview">
            {imageUrl
              ? <img src={imageUrl} alt="generated" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"var(--r)" }} />
              : <div className="gen-placeholder">
                  <div className="gen-placeholder-icon">{generating ? <span className="spin-icon">✦</span> : "✦"}</div>
                  <div style={{ fontSize:13, fontWeight:500 }}>{generating ? "Generating with FLUX…" : "Image will appear here"}</div>
                  <div style={{ fontSize:11, marginTop:4, color:"var(--txt3)" }}>Free · No API key</div>
                </div>
            }
          </div>
          <div className="load-bar"><div className={`load-fill${loading ? " animate" : ""}`} /></div>
          {imageUrl && (
            <div className="gen-actions fade-in">
              <button className="btn btn-primary btn-sm" onClick={download}>⬇ Download</button>
              <button className="btn btn-secondary btn-sm" onClick={() => { onSaveToLibrary(imageUrl); }}>+ Library</button>
              <button className="btn btn-secondary btn-sm" onClick={() => onUseInPost(imageUrl)}>📡 Post to Meta</button>
              <button className="btn btn-secondary btn-sm" onClick={generate}>⟳ Regenerate</button>
            </div>
          )}
          {history.length > 0 && (
            <div style={{ marginTop:12 }}>
              <div style={{ fontSize:11, color:"var(--txt3)", marginBottom:6 }}>Recent generations</div>
              <div className="hist-grid">
                {history.map((h, i) => (
                  <div className="hist-thumb" key={i} onClick={() => { setImageUrl(h.url); setSharedImage(h.url); }}>
                    <img src={h.url} alt="hist" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Controls */}
        <div>
          <div className="form-group">
            <label className="form-label">Prompt</label>
            <textarea className="form-input form-textarea" style={{ minHeight:80 }} placeholder="Describe the image… (e.g. 'Professional product photo of a luxury watch on marble, dramatic lighting, 8k quality')"
              value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Negative Prompt (optional)</label>
            <input className="form-input" placeholder="blurry, low quality, distorted, watermark…" value={negative} onChange={(e) => setNegative(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Style Preset</label>
            <div className="style-grid">
              {STYLES.map((s) => (
                <div key={s.value} className={`style-chip ${style === s.value ? "active" : ""}`} onClick={() => setStyle(s.value)}>{s.label}</div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Aspect Ratio</label>
            <div className="ratio-row">
              {RATIOS.map((r) => (
                <div key={r.label} className={`ratio-btn ${ratio.label === r.label ? "active" : ""}`} onClick={() => setRatio(r)}>{r.label}</div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label className="form-label">Model</label>
              <select className="form-input form-select" value={model} onChange={(e) => setModel(e.target.value)}>
                {MODELS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Seed (optional)</label>
              <input className="form-input" type="number" placeholder="Random" value={seed} onChange={(e) => setSeed(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Marketing Boost</label>
            <select className="form-input form-select" value={boost} onChange={(e) => setBoost(e.target.value)}>
              {BOOSTS.map((b) => <option key={b.label} value={b.value}>{b.label}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" style={{ width:"100%", justifyContent:"center", fontSize:14, padding:"11px 0" }} onClick={generate} disabled={!prompt.trim() || generating}>
            {generating ? <><span className="spinner" />  Generating…</> : "✦ Generate Image (Free)"}
          </button>
          <div style={{ textAlign:"center", fontSize:10.5, color:"var(--txt3)", marginTop:8 }}>
            Powered by <a href="https://pollinations.ai" target="_blank" rel="noreferrer" style={{ color:"var(--acc)", textDecoration:"none" }}>Pollinations.ai</a> · FLUX · Open Source · No API Key Required
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function MediaPanel({ items, onAddItems, onUseInPost }) {
  const [drag, setDrag] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const fileRef = useRef();

  const handleFiles = (files) => {
    const newItems = Array.from(files).map((f) => ({
      url: URL.createObjectURL(f),
      type: f.type.startsWith("video") ? "video" : "image",
      name: f.name,
    }));
    onAddItems(newItems);
  };

  const toggleSel = (i) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Media Library</div>
          <div className="section-sub">Upload, convert and manage photos and videos</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {selected.size > 0 && <button className="btn btn-secondary btn-sm" onClick={() => { alert("Converting selected files — in a real deployment this uses canvas/ffmpeg.wasm"); }}>⟳ Convert {selected.size}</button>}
          <label className="btn btn-primary btn-sm" style={{ cursor:"pointer" }}>
            + Upload
            <input type="file" ref={fileRef} multiple accept="image/*,video/*" style={{ display:"none" }} onChange={(e) => handleFiles(e.target.files)} />
          </label>
        </div>
      </div>
      <div className={`upload-zone ${drag ? "drag" : ""}`}
        onClick={() => fileRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); }}>
        <div className="upload-icon">⊟</div>
        <div className="upload-title">Drag & Drop Photos or Videos</div>
        <div className="upload-sub">Or click to browse files</div>
        <div className="upload-note">JPG · PNG · GIF · MP4 · MOV · WebP · SVG · up to 50 MB</div>
      </div>
      {items.length > 0 ? (
        <div className="media-grid">
          {items.map((item, i) => (
            <div key={i} className={`media-item ${selected.has(i) ? "selected" : ""}`} onClick={() => toggleSel(i)}>
              {item.type === "video"
                ? <video src={item.url} muted />
                : <img src={item.url} alt={item.name} loading="lazy" />}
              <div className="media-type">{item.type === "video" ? "VIDEO" : "IMG"}</div>
              <div className="media-check">✓</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty"><div className="empty-icon">⊟</div><div className="empty-text">Upload media to get started</div></div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function CopyPanel({ onUpdateCaption, onUpdateTags, sharedCaption, sharedTags }) {
  const [product, setProduct] = useState("");
  const [platform, setPlatform] = useState("fb");
  const [tone, setTone] = useState("🔥 Hype");
  const [goal, setGoal] = useState(GOALS[0]);
  const [context, setContext] = useState("");
  const [copy, setCopy] = useState("");
  const [tags, setTags] = useState([]);
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);

  const platMeta = { fb: { name: "Facebook", chars: "up to 63,206 chars" }, ig: { name: "Instagram", chars: "2,200 chars, use emojis" }, tt: { name: "TikTok", chars: "150 chars, trendy" }, tw: { name: "Twitter/X", chars: "280 chars, punchy" } };

  const generateCopy = async () => {
    if (!product.trim()) return;
    setLoadingCopy(true);
    const p = platMeta[platform];
    try {
      const text = await callClaude(`Write a ${tone.replace(/[^\w\s]/g,"").trim().toLowerCase()} marketing post for ${p.name} about: ${product}.
Goal: ${goal}. ${context ? "Context: " + context : ""}
Platform limit: ${p.chars}.
Include: engaging hook, key selling point, strong CTA.
Add 15 hashtags on a new line starting with HASHTAGS:`);
      const parts = text.split("HASHTAGS:");
      const c = (parts[0] || text).trim();
      const t = (parts[1] || "").trim().split(/\s+/).filter((x) => x.startsWith("#"));
      setCopy(c);
      setTags(t);
      onUpdateCaption(c);
      onUpdateTags(t);
    } catch { setCopy("Error generating copy. Please try again."); }
    setLoadingCopy(false);
  };

  const generateTags = async () => {
    if (!product.trim()) return;
    setLoadingTags(true);
    try {
      const text = await callClaude(`Generate 20 highly relevant trending hashtags for ${product}. Return ONLY hashtags separated by spaces.`);
      const t = text.trim().split(/\s+/).filter((x) => x.startsWith("#"));
      setTags(t);
      onUpdateTags(t);
    } catch {}
    setLoadingTags(false);
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">✍ Marketing Copy</div>
          <div className="section-sub">AI captions, hashtags and ad copy for every platform</div>
        </div>
        <span className="ai-badge"><span className="spin-icon">✦</span> Claude AI</span>
      </div>
      <div className="copy-layout">
        {/* Left: controls */}
        <div>
          <div className="form-group">
            <label className="form-label">Product / Brand / Topic</label>
            <input className="form-input" placeholder="e.g. Premium Wireless Headphones, Coffee Shop Opening…" value={product} onChange={(e) => setProduct(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Platform</label>
            <div className="plat-tabs">
              {PLATFORMS.map((p) => (
                <button key={p.id} className={`plat-tab ${platform === p.id ? "active " + p.cls : ""}`} onClick={() => setPlatform(p.id)}>{p.label}</button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Tone of Voice</label>
            <div className="tone-row">
              {TONES.map((t) => (
                <button key={t} className={`tone-chip ${tone === t ? "active" : ""}`} onClick={() => setTone(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Goal</label>
            <select className="form-input form-select" value={goal} onChange={(e) => setGoal(e.target.value)}>
              {GOALS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Additional Context</label>
            <textarea className="form-input form-textarea" style={{ minHeight:70 }} placeholder="Any special offers, features, target audience details…" value={context} onChange={(e) => setContext(e.target.value)} />
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-primary" style={{ flex:1, justifyContent:"center" }} onClick={generateCopy} disabled={!product.trim() || loadingCopy}>
              {loadingCopy ? <><span className="spinner" /> Generating…</> : "✦ Generate Copy"}
            </button>
            <button className="btn btn-secondary" onClick={generateTags} disabled={!product.trim() || loadingTags}>
              {loadingTags ? <span className="spinner" /> : "🏷"} Hashtags
            </button>
          </div>
        </div>
        {/* Right: output */}
        <div>
          <div style={{ fontSize:11.5, color:"var(--txt2)", marginBottom:7 }}>Generated Copy</div>
          <div className="copy-output" style={{ minHeight:140 }}>
            {copy ? <span dangerouslySetInnerHTML={{ __html: copy.replace(/\n/g,"<br>") }} /> : <span style={{ color:"var(--txt3)" }}>Your AI-generated marketing copy will appear here…</span>}
          </div>
          <div style={{ display:"flex", gap:6, marginTop:7 }}>
            <button className="btn btn-secondary btn-xs" onClick={() => { navigator.clipboard.writeText(copy); }}>⊞ Copy</button>
            <button className="btn btn-secondary btn-xs" onClick={generateCopy} disabled={loadingCopy}>⟳ Regen</button>
          </div>
          <div style={{ fontSize:11.5, color:"var(--txt2)", margin:"13px 0 6px" }}>Hashtags</div>
          <div className="hashtag-cloud">
            {tags.length > 0
              ? tags.map((t) => <span key={t} className="hashtag">{t}</span>)
              : <span style={{ fontSize:11.5, color:"var(--txt3)" }}>Generate copy to see hashtags…</span>}
          </div>
          {tags.length > 0 && (
            <button className="btn btn-secondary btn-xs" style={{ marginTop:7 }} onClick={() => navigator.clipboard.writeText(tags.join(" "))}>⊞ Copy All Hashtags</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function PublisherPanel({ sharedImage, sharedCaption, sharedTags, onToast }) {
  const [caption, setCaption] = useState(sharedCaption || "");
  const [postImage, setPostImage] = useState(sharedImage || null);
  const [previewPlatform, setPreviewPlatform] = useState("fb");
  const [autoSettings, setAutoSettings] = useState({ caption:true, time:true, hashtags:true, reply:false, cross:false });
  const fileRef = useRef();

  useEffect(() => { if (sharedCaption) setCaption(sharedCaption); }, [sharedCaption]);
  useEffect(() => { if (sharedImage) setPostImage(sharedImage); }, [sharedImage]);

  const handleMedia = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setPostImage(URL.createObjectURL(f));
  };

  const publish = (platform) => {
    onToast(platform === "fb" ? "📘 Posted to Facebook successfully!" : "📸 Posted to Instagram successfully!");
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">📡 Meta Publisher</div>
          <div className="section-sub">Facebook & Instagram · AI-controlled publishing · No human interaction needed</div>
        </div>
        <span className="tag tag-meta">Meta API</span>
      </div>
      <div className="pub-layout">
        {/* Controls */}
        <div>
          <div className="form-group">
            <label className="form-label">Page / Account</label>
            <select className="form-input form-select">
              <option>🔵 My Facebook Page</option>
              <option>📸 @my_instagram</option>
              <option>+ Connect Account</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Caption</label>
            <textarea className="form-input form-textarea" style={{ minHeight:100 }} placeholder="Write or paste your caption here…" value={caption} onChange={(e) => setCaption(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Media</label>
            <div style={{ background:"var(--surf2)", border:"0.5px dashed var(--bdr2)", borderRadius:"var(--rsm)", padding:18, textAlign:"center", cursor:"pointer" }} onClick={() => fileRef.current.click()}>
              {postImage
                ? <img src={postImage} alt="pub" style={{ maxHeight:80, borderRadius:6 }} />
                : <div style={{ color:"var(--txt3)", fontSize:12.5 }}>📎 Click to attach image/video<br /><span style={{ fontSize:10.5 }}>Or use AI-generated image from gallery</span></div>}
              <input type="file" ref={fileRef} accept="image/*,video/*" style={{ display:"none" }} onChange={handleMedia} />
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label className="form-label">Publish Time</label>
              <select className="form-input form-select"><option>🤖 AI Optimal Time</option><option>Now</option><option>Schedule…</option></select>
            </div>
            <div className="form-group">
              <label className="form-label">Post Type</label>
              <select className="form-input form-select"><option>Feed Post</option><option>Story</option><option>Reel</option><option>Carousel</option></select>
            </div>
          </div>
          <div className="card" style={{ marginBottom:14 }}>
            <div style={{ fontSize:12, fontWeight:500, marginBottom:10 }}>🤖 AI Automation Settings</div>
            {[["caption","Auto-generate caption with AI"],["time","AI picks best time to post"],["hashtags","Auto-add optimal hashtags"],["reply","Auto-reply to comments (AI)"],["cross","Cross-post to all platforms"]].map(([key,label]) => (
              <label key={key} style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", fontSize:12.5, color:"var(--txt)", marginBottom:7 }}>
                <input type="checkbox" checked={autoSettings[key]} onChange={(e) => setAutoSettings((p) => ({ ...p, [key]: e.target.checked }))} />
                {label}
              </label>
            ))}
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-meta" style={{ flex:1, justifyContent:"center" }} onClick={() => publish("fb")}>📘 Publish to Facebook</button>
            <button className="btn btn-ig"   style={{ flex:1, justifyContent:"center" }} onClick={() => publish("ig")}>📸 Post to Instagram</button>
          </div>
          <button className="btn btn-secondary" style={{ width:"100%", justifyContent:"center", marginTop:7 }} onClick={() => onToast("⏰ Post scheduled — AI will publish at optimal time")}>⏰ Schedule with AI</button>
        </div>
        {/* Previews */}
        <div>
          <div className="plat-switch">
            <button className={`psw-btn fb ${previewPlatform === "fb" ? "active" : ""}`} onClick={() => setPreviewPlatform("fb")}>📘 Facebook</button>
            <button className={`psw-btn ig ${previewPlatform === "ig" ? "active" : ""}`} onClick={() => setPreviewPlatform("ig")}>📸 Instagram</button>
          </div>
          {previewPlatform === "fb"
            ? <FBPreview caption={caption} imageUrl={postImage} />
            : <IGPreview caption={caption} imageUrl={postImage} hashtags={sharedTags || []} />}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function CampaignsPanel({ onToast }) {
  const CAMPS = [
    { icon:"🛍", name:"Summer Sale 2025",         meta:"Facebook + Instagram · 14 posts · AI-controlled", status:"live",  reach:"24.1K", ctr:"3.2%", cost:"$0" },
    { icon:"🎉", name:"Product Launch — AirPods", meta:"Instagram · 8 posts scheduled · AI Autopilot",   status:"draft", reach:"—",     ctr:"—",    cost:"$0" },
    { icon:"💜", name:"Brand Awareness Q1",       meta:"Facebook · 30 posts · Completed",                status:"done",  reach:"68K",   ctr:"4.7%", cost:"$0" },
  ];
  return (
    <div>
      <div className="section-header">
        <div><div className="section-title">⚡ Campaigns</div><div className="section-sub">Manage AI-powered marketing campaigns</div></div>
        <button className="btn btn-primary btn-sm" onClick={() => onToast("✦ New campaign created — AI is setting it up…")}>+ New Campaign</button>
      </div>
      {CAMPS.map((c) => (
        <div className="camp-card fade-in" key={c.name}>
          <div className="camp-thumb">{c.icon}</div>
          <div><div className="camp-name">{c.name}</div><div className="camp-meta">{c.meta}</div></div>
          <span className={`status-pill status-${c.status}`}>{c.status === "live" ? "● Live" : c.status === "draft" ? "◌ Draft" : "✓ Done"}</span>
          <div className="camp-stats">
            {[["Reach",c.reach],["CTR",c.ctr],["Cost",c.cost]].map(([l,v]) => (
              <div key={l}><div className="camp-sv">{v}</div><div className="camp-sl">{l}</div></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function AutomationPanel() {
  const [autopilot, setAutopilot] = useState(true);
  const [states, setStates] = useState(AUTOMATIONS.map((a) => a.defaultOn));
  const [active, setActive] = useState(null);
  const toggle = (i) => setStates((prev) => prev.map((v, j) => j === i ? !v : v));
  return (
    <div>
      <div className="section-header">
        <div><div className="section-title">🤖 AI Automation</div><div className="section-sub">Zero human interaction · AI controls everything end-to-end</div></div>
        <span className="ai-badge">Full AI Control</span>
      </div>
      <div className="card" style={{ marginBottom:14, background:"linear-gradient(135deg,rgba(124,58,237,.08),rgba(236,72,153,.05))", borderColor:"rgba(124,58,237,.25)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ fontSize:26 }}>🤖</div>
          <div>
            <div style={{ fontSize:13, fontWeight:500, marginBottom:2 }}>AI Autopilot Mode</div>
            <div style={{ fontSize:11.5, color:"var(--txt2)" }}>InfiCreator AI will autonomously generate content, pick the best time, and publish to all connected Meta accounts — no human needed.</div>
          </div>
          <ToggleSw on={autopilot} onToggle={() => setAutopilot((v) => !v)} />
        </div>
      </div>
      {AUTOMATIONS.map((auto, i) => (
        <div key={auto.name} className={`flow-card ${active === i ? "active-flow" : ""}`} onClick={() => setActive(active === i ? null : i)}>
          <div className="flow-icon" style={{ background: auto.color }}>{auto.icon}</div>
          <div><div className="flow-name">{auto.name}</div><div className="flow-desc">{auto.desc}</div></div>
          <div className="flow-status"><div className={`flow-dot ${states[i] ? "on" : "off"}`} />{states[i] ? "Running" : "Off"}</div>
          <ToggleSw on={states[i]} onToggle={() => toggle(i)} />
        </div>
      ))}
      <div className="card" style={{ marginTop:14 }}>
        <div className="card-title" style={{ marginBottom:10 }}>📅 AI Posting Schedule</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => <div key={d} style={{ textAlign:"center", fontSize:10.5, color:"var(--txt2)", padding:"3px 0" }}>{d}</div>)}
          {[1,0,1,2,1,0,0, 0,1,2,1,2,1,0, 2,1,0,0,1,0,1].map((v, i) => (
            <div key={i} style={{ aspectRatio:"1", borderRadius:4, background: v===2 ? "rgba(236,72,153,.5)" : v===1 ? "var(--acc)" : "var(--surf2)", opacity: v>0 ? .8 : 1, cursor:"pointer" }} />
          ))}
        </div>
        <div style={{ display:"flex", gap:12, marginTop:8, fontSize:11, color:"var(--txt2)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:10, height:10, borderRadius:2, background:"var(--acc)" }} />Scheduled</div>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:10, height:10, borderRadius:2, background:"rgba(236,72,153,.5)" }} />Peak Time</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function AnalyticsPanel() {
  return (
    <div>
      <div className="section-header">
        <div><div className="section-title">◈ Analytics</div><div className="section-sub">AI-powered insights across all platforms</div></div>
      </div>
      <div className="grid4" style={{ marginBottom:14 }}>
        {[["📘","rgba(24,119,242,.1)","#1877f2","41.2K","Facebook Reach","↑ 18%"],
          ["📸","rgba(236,72,153,.1)","var(--pink)","28.7K","Instagram Reach","↑ 31%"],
          ["👍","rgba(16,185,129,.1)","var(--grn)","8,421","Engagements","↑ 24%"],
          ["🖱","rgba(245,158,11,.1)","var(--amb)","3.8%","Avg. CTR","↑ 0.6%"],
        ].map(([icon,bg,color,val,label,change]) => (
          <div className="stat-card" key={label}>
            <div className="stat-icon" style={{ background:bg, color }}>{icon}</div>
            <div className="stat-val">{val}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-up">{change}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-title" style={{ marginBottom:12 }}>AI Insights</div>
        <div className="insight-card insight-purple">✦ <strong>Best performing content:</strong> Product images with purple backgrounds get 3.2× more engagement. AI will prioritize this style.</div>
        <div className="insight-card insight-green">📅 <strong>Optimal post time:</strong> 7–9 PM on Thursdays yields highest reach for your audience. Automation adjusted.</div>
        <div className="insight-card insight-amber">🏷 <strong>Hashtag performance:</strong> #luxury and #premium tags outperform category tags by 42%.</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────

export default function InfiCreator() {
  const [activePanel, setActivePanel]     = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [toast, setToast]                 = useState(null);
  const [mediaItems, setMediaItems]       = useState([]);
  const [sharedImage, setSharedImage]     = useState(null);
  const [sharedCaption, setSharedCaption] = useState("");
  const [sharedTags, setSharedTags]       = useState([]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }, []);

  const navigate = (panel) => {
    setActivePanel(panel);
    setMobileSidebar(false);
  };

  const useInPost = (imgUrl) => {
    setSharedImage(imgUrl);
    navigate("publisher");
  };

  const saveToLibrary = (imgUrl) => {
    setMediaItems((prev) => [{ url: imgUrl, type: "image", name: "ai-generated.jpg" }, ...prev]);
    showToast("✦ Saved to Media Library");
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* Mobile overlay */}
        {mobileSidebar && <div className="mobile-overlay visible" onClick={() => setMobileSidebar(false)} />}

        {/* ── SIDEBAR ── */}
        <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${mobileSidebar ? "mobile-open" : ""}`}>
          <div className="sb-logo">
            <div className="sb-logo-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div>
              <div className="sb-logo-name">InfiCreator</div>
              <div className="sb-logo-sub">AI Marketing Studio</div>
            </div>
          </div>

          <div className="sb-nav">
            {NAV.map((group) => (
              <div key={group.section}>
                <div className="nav-section">{group.section}</div>
                {group.items.map((item) => (
                  <div key={item.id} className={`nav-item ${activePanel === item.id ? "active" : ""}`} onClick={() => navigate(item.id)}>
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="sb-bottom">
            <div className="sb-plan">
              <div className="sb-plan-title">InfiCreator Studio</div>
              <div className="sb-plan-sub">Open source · No API key for images · Powered by free AI</div>
              <div className="sb-plan-tag">100% FREE</div>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="main">
          <div className="mhead">
            <div style={{ display:"flex", alignItems:"center", gap:10, minWidth:0 }}>
              <button className="mh-btn" onClick={() => { if (window.innerWidth <= 660) setMobileSidebar((v) => !v); else setSidebarCollapsed((v) => !v); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <span className="mh-title">{PANEL_TITLES[activePanel] || activePanel}</span>
            </div>
            <div className="mh-right">
              <span className="ai-badge"><span className="spin-icon">✦</span> AI Ready</span>
              <button className="mh-btn primary" onClick={() => navigate("generator")}>✦ Create Now</button>
            </div>
          </div>

          <div className="content">
            <div className={`panel ${activePanel === "dashboard"  ? "active" : ""}`}><DashboardPanel  onNavigate={navigate} mediaItems={mediaItems} /></div>
            <div className={`panel ${activePanel === "generator"  ? "active" : ""}`}><GeneratorPanel  onSaveToLibrary={saveToLibrary} onUseInPost={useInPost} sharedImage={sharedImage} setSharedImage={setSharedImage} /></div>
            <div className={`panel ${activePanel === "media"      ? "active" : ""}`}><MediaPanel      items={mediaItems} onAddItems={(items) => setMediaItems((p) => [...items, ...p])} onUseInPost={useInPost} /></div>
            <div className={`panel ${activePanel === "copy"       ? "active" : ""}`}><CopyPanel       onUpdateCaption={setSharedCaption} onUpdateTags={setSharedTags} sharedCaption={sharedCaption} sharedTags={sharedTags} /></div>
            <div className={`panel ${activePanel === "publisher"  ? "active" : ""}`}><PublisherPanel  sharedImage={sharedImage} sharedCaption={sharedCaption} sharedTags={sharedTags} onToast={showToast} /></div>
            <div className={`panel ${activePanel === "campaigns"  ? "active" : ""}`}><CampaignsPanel  onToast={showToast} /></div>
            <div className={`panel ${activePanel === "automation" ? "active" : ""}`}><AutomationPanel /></div>
            <div className={`panel ${activePanel === "analytics"  ? "active" : ""}`}><AnalyticsPanel /></div>
          </div>
        </div>

        {/* Toast */}
        {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      </div>
    </>
  );
}
