import type { ProjectTone } from "@/data/projects";
import { ArrowUpRight, MapPin, Play } from "lucide-react";

function NusaArtwork() {
  return (
    <div className="project-art nusa-art">
      <div className="nusa-sun" />
      <p className="nusa-wordmark">nusa</p>
      <div className="nusa-meta">
        <span>Personal finance</span>
        <span>ID / 2026</span>
      </div>

      <div className="nusa-phone">
        <div className="nusa-island" />
        <div className="nusa-screen">
          <div className="nusa-status">
            <span>09:41</span>
            <span>•••</span>
          </div>
          <p className="nusa-greeting">Good morning, Yun</p>
          <div className="nusa-balance-row">
            <div>
              <p className="nusa-balance-label">Total balance</p>
              <p className="nusa-balance">Rp 24.680.000</p>
            </div>
            <span className="nusa-plus">+</span>
          </div>
          <div className="nusa-actions">
            <span>Transfer</span>
            <span>Top up</span>
            <span>Split</span>
          </div>
          <div className="nusa-transaction">
            <div className="nusa-avatar">K</div>
            <div>
              <p>Kopi Kenangan</p>
              <span>Today · 08:24</span>
            </div>
            <b>−Rp 28.000</b>
          </div>
          <div className="nusa-transaction">
            <div className="nusa-avatar nusa-avatar-alt">A</div>
            <div>
              <p>Aruna Studio</p>
              <span>Yesterday · 16:02</span>
            </div>
            <b className="nusa-positive">+Rp 6.400.000</b>
          </div>
          <div className="nusa-chart">
            <span style={{ height: "38%" }} />
            <span style={{ height: "55%" }} />
            <span style={{ height: "44%" }} />
            <span style={{ height: "72%" }} />
            <span style={{ height: "61%" }} />
            <span style={{ height: "88%" }} />
            <span style={{ height: "78%" }} />
            <span style={{ height: "100%" }} />
          </div>
        </div>
      </div>

      <div className="nusa-card">
        <div className="nusa-card-top">
          <span>nusa.</span>
          <span>debit</span>
        </div>
        <span className="nusa-chip" />
        <div className="nusa-card-bottom">
          <span>•••• 4291</span>
          <span>YUN W.</span>
        </div>
      </div>

      <div className="nusa-pill">
        <span className="nusa-pill-dot" />
        Instant transfer · 0.4s
      </div>

      <div className="nusa-transfer-word">transfer</div>
      <div className="nusa-ring" />
    </div>
  );
}

function AuralisArtwork() {
  return (
    <div className="project-art auralis-art">
      <div className="auralis-glow" />
      <div className="auralis-ring auralis-ring-one" />
      <div className="auralis-ring auralis-ring-two" />
      <div className="auralis-orb" />

      <div className="auralis-top">
        <span>Adaptive sound / 03</span>
        <span>18:42</span>
      </div>
      <p className="auralis-wordmark">auralis</p>
      <p className="auralis-tagline">
        Your nervous system,
        <br />
        in tune.
      </p>

      <div className="auralis-stat">
        <span className="auralis-stat-value">+8%</span>
        <span className="auralis-stat-label">HRV this week</span>
        <div className="auralis-spark">
          {[28, 45, 34, 62, 48, 72, 66, 88].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>

      <div className="auralis-player">
        <div className="auralis-cover">
          <div className="auralis-cover-glow" />
          <span>ar</span>
        </div>
        <div className="auralis-track">
          <span className="auralis-track-label">Now playing</span>
          <p>Soft reset</p>
          <span className="auralis-track-meta">Breathwork · 12 min</span>
          <div className="auralis-waveform">
            {[18, 40, 72, 32, 56, 96, 48, 64, 30, 76, 44, 86, 22, 58, 36, 70].map(
              (height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%`, animationDelay: `${index * 90}ms` }}
                />
              ),
            )}
          </div>
        </div>
        <button type="button" tabIndex={-1} className="auralis-play" aria-hidden="true">
          <Play className="ml-0.5 size-3 fill-current" strokeWidth={0} />
        </button>
      </div>

      <div className="auralis-caption">
        <span className="size-1 rounded-full bg-[#ff9d7d]" />
        Generated from your morning check-in
      </div>

      <svg
        className="absolute right-[7%] top-[27%] size-[8%] text-[#ffb199]/60"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path
          d="M8 0c.4 4.5 3.5 7.6 8 8-4.5.4-7.6 3.5-8 8-.4-4.5-3.5-7.6-8-8 4.5-.4 7.6-3.5 8-8Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function NorthlineArtwork() {
  return (
    <div className="project-art northline-art">
      <svg
        className="northline-map"
        viewBox="0 0 800 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1">
          <path d="M-40 150C90 90 190 190 290 140s190-90 290-10 170 80 280 30" />
          <path d="M-60 190C70 130 170 230 280 180s190-80 300 0 180 70 280 10" />
          <path d="M-40 230C80 180 180 270 290 225s200-70 300 10 160 60 270 5" />
          <path d="M-30 270C100 220 190 310 300 265s190-50 300 25 170 45 250-5" />
          <path d="M-20 315C110 270 200 350 310 305s180-40 290 40 180 30 250-20" />
          <path d="M-40 360C90 315 170 390 280 350s200-40 300 45 170 25 260-30" />
          <path d="M-30 405C100 360 200 430 310 395s190-25 290 50 170 20 260-35" />
          <path d="M-20 450C110 410 210 475 320 440s180-15 280 60 180 10 270-40" />
        </g>
        <path
          d="M168 340c55-95 170-156 282-116 77 27 102 109 177 104 44-3 77-31 104-67"
          stroke="#b35432"
          strokeWidth="1.4"
          strokeDasharray="3 5"
        />
        <circle cx="168" cy="340" r="5" fill="#1b2418" />
        <circle cx="168" cy="340" r="11" stroke="#1b2418" strokeWidth="1" />
        <circle cx="731" cy="261" r="4" fill="#b35432" />
      </svg>

      <div className="northline-nav">
        <span className="northline-logo">northline<span>.</span></span>
        <span>Journeys&nbsp;&nbsp; Journal&nbsp;&nbsp; About</span>
      </div>

      <p className="northline-kicker">Issue Nº 07 · The slow edition</p>
      <p className="northline-headline">
        Field notes for the
        <br />
        <em>modern explorer.</em>
      </p>

      <div className="northline-place">
        <div className="northline-place-top">
          <span>Featured journey</span>
          <span>07°42′S</span>
        </div>
        <p className="northline-place-name">Sumba</p>
        <p className="northline-place-meta">
          Indonesia <span>·</span> 5 days <span>·</span> April
        </p>
        <div className="northline-place-footer">
          <span>
            <MapPin className="size-3" />
            The quiet coast
          </span>
          <span className="northline-arrow">
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>

      <div className="northline-ticket">
        <span className="northline-ticket-label">Boarding pass</span>
        <div className="northline-ticket-route">
          <strong>JKT</strong>
          <span className="northline-ticket-line">
            <i />
            <em>·····</em>
          </span>
          <strong>SWG</strong>
        </div>
        <div className="northline-ticket-meta">
          <span>GA · 18A</span>
          <span>APR 14</span>
        </div>
      </div>

      <div className="northline-stamp">
        <span>Slow</span>
        <span>travel</span>
        <span>co.</span>
      </div>

      <span className="northline-coord">S 09° 39′ · E 120° 15′</span>
      <span className="northline-issue">N / 07</span>
    </div>
  );
}

export function ProjectArtwork({ tone }: { tone: ProjectTone }) {
  return (
    <div aria-hidden="true" className="size-full">
      {tone === "acid" && <NusaArtwork />}
      {tone === "ember" && <AuralisArtwork />}
      {tone === "ocean" && <NorthlineArtwork />}
    </div>
  );
}