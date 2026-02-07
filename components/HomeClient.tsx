"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function HomeClient() {
  const [activeTab, setActiveTab] = useState<"lb-assessment" | "comprehensive">("lb-assessment");
  const [modalOpen, setModalOpen] = useState(false);

  // Canvas refs
  const severityRef = useRef<HTMLCanvasElement | null>(null);
  const moodRef = useRef<HTMLCanvasElement | null>(null);
  const vocalRef = useRef<HTMLCanvasElement | null>(null);
  const facialRef = useRef<HTMLCanvasElement | null>(null);
  const phqRef = useRef<HTMLCanvasElement | null>(null);
  const hamdRef = useRef<HTMLCanvasElement | null>(null);

  // Store chart instances so we can destroy them
  const chartsRef = useRef<Chart[]>([]);

  function destroyCharts() {
    chartsRef.current.forEach((c) => c.destroy());
    chartsRef.current = [];
  }

  function initializeCharts() {
    destroyCharts();

    // Helper to create chart safely
    const make = (canvas: HTMLCanvasElement | null, config: any) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const chart = new Chart(ctx, config);
      chartsRef.current.push(chart);
    };

    // 1) Severity (Radar)
    make(severityRef.current, {
      type: "radar",
      data: {
        labels: ["Depression", "Anxiety", "Stress", "Energy", "Social", "Sleep"],
        datasets: [
          {
            label: "Current Score",
            data: [65, 58, 70, 42, 55, 80],
            backgroundColor: "rgba(74, 111, 165, 0.2)",
            borderColor: "rgba(74, 111, 165, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(74, 111, 165, 1)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
          },
          {
            label: "Population Average",
            data: [50, 50, 50, 50, 50, 50],
            backgroundColor: "rgba(255, 126, 95, 0.1)",
            borderColor: "rgba(255, 126, 95, 0.5)",
            borderWidth: 1,
            borderDash: [5, 5],
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } },
        },
        plugins: { legend: { position: "bottom" } },
      },
    });

    // 2) Mood Trends (Line)
    make(moodRef.current, {
      type: "line",
      data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
        datasets: [
          {
            label: "Mood Score",
            data: [45, 52, 48, 60, 65, 70],
            backgroundColor: "rgba(255, 126, 95, 0.1)",
            borderColor: "rgba(255, 126, 95, 1)",
            borderWidth: 3,
            tension: 0.3,
            fill: true,
          },
          {
            label: "Energy Level",
            data: [40, 45, 42, 50, 55, 58],
            backgroundColor: "rgba(74, 111, 165, 0.1)",
            borderColor: "rgba(74, 111, 165, 1)",
            borderWidth: 2,
            tension: 0.3,
            fill: false,
            borderDash: [5, 5],
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 100, title: { display: true, text: "Score" } },
          x: { title: { display: true, text: "Assessment Week" } },
        },
        plugins: { legend: { position: "top" } },
      },
    });

    // 3) Vocal Biomarkers (Bar)
    make(vocalRef.current, {
      type: "bar",
      data: {
        labels: ["Pitch Variation", "Speech Rate", "Pause Frequency", "Voice Energy", "Jitter", "Shimmer"],
        datasets: [
          {
            label: "Score",
            data: [35, 42, 68, 45, 72, 60],
            backgroundColor: [
              "rgba(74, 111, 165, 0.7)",
              "rgba(74, 111, 165, 0.7)",
              "rgba(255, 126, 95, 0.7)",
              "rgba(74, 111, 165, 0.7)",
              "rgba(255, 126, 95, 0.7)",
              "rgba(255, 126, 95, 0.7)",
            ],
            borderColor: [
              "rgba(74, 111, 165, 1)",
              "rgba(74, 111, 165, 1)",
              "rgba(255, 126, 95, 1)",
              "rgba(74, 111, 165, 1)",
              "rgba(255, 126, 95, 1)",
              "rgba(255, 126, 95, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 100, title: { display: true, text: "Score (higher = more pronounced)" } },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => `${context.label}: ${context.raw}%`,
            },
          },
        },
      },
    });

    // 4) Facial (Doughnut)
    make(facialRef.current, {
      type: "doughnut",
      data: {
        labels: ["Positive Expressions", "Negative Expressions", "Neutral Expressions", "Micro-expressions"],
        datasets: [
          {
            data: [25, 40, 30, 5],
            backgroundColor: [
              "rgba(76, 175, 80, 0.7)",
              "rgba(255, 126, 95, 0.7)",
              "rgba(158, 158, 158, 0.7)",
              "rgba(255, 193, 7, 0.7)",
            ],
            borderColor: [
              "rgba(76, 175, 80, 1)",
              "rgba(255, 126, 95, 1)",
              "rgba(158, 158, 158, 1)",
              "rgba(255, 193, 7, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: (context: any) => `${context.label}: ${context.raw}%`,
            },
          },
        },
      },
    });

    // 5) PHQ-9 (Horizontal Bar)
    make(phqRef.current, {
      type: "bar",
      data: {
        labels: ["Interest", "Mood", "Sleep", "Energy", "Appetite", "Self-esteem", "Concentration", "Psychomotor", "Suicidal"],
        datasets: [
          {
            label: "PHQ-9 Score",
            data: [2, 3, 1, 2, 1, 2, 2, 0, 1],
            backgroundColor: "rgba(74, 111, 165, 0.7)",
            borderColor: "rgba(74, 111, 165, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          x: { beginAtZero: true, max: 3, ticks: { stepSize: 1 }, title: { display: true, text: "Severity (0-3)" } },
        },
        plugins: { legend: { display: false } },
      },
    });

    // 6) HAM-D (Bar)
    make(hamdRef.current, {
      type: "bar",
      data: {
        labels: ["Depressed Mood", "Guilt", "Suicide", "Insomnia", "Work/Activities", "Retardation", "Agitation", "Anxiety", "Somatic", "Hypochondriasis", "Weight Loss", "Insight"],
        datasets: [
          {
            label: "HAM-D Score",
            data: [3, 2, 1, 1, 3, 1, 2, 2, 2, 1, 0, 2],
            backgroundColor: "rgba(255, 126, 95, 0.7)",
            borderColor: "rgba(255, 126, 95, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 4, ticks: { stepSize: 1 }, title: { display: true, text: "Severity (0-4)" } },
          x: { ticks: { maxRotation: 45, minRotation: 45 } },
        },
        plugins: { legend: { display: false } },
      },
    });
  }

  // Modal behavior: lock scroll + escape key
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setModalOpen(false);
    }
    document.addEventListener("keydown", onEsc);

    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      // Create charts when modal opens
      initializeCharts();
    } else {
      document.body.style.overflow = "auto";
      destroyCharts();
    }

    return () => {
      document.body.style.overflow = "auto";
      destroyCharts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  function scrollToTest() {
    const el = document.getElementById("test-section");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function beginAssessment(kind: "lb" | "comprehensive") {
    if (kind === "lb") {
      alert("Starting your LB Assessment. This AI-powered analysis will take approximately 5-10 minutes.");
    } else {
      alert("Starting your Comprehensive Assessment. This includes both AI analysis and clinical scales and will take approximately 15-20 minutes.");
    }
  }

  return (
    <>
      <header>
        <div className="container">
          <div className="header-content">
            <h1>
              LifeBack<span className="trademark">™</span>
            </h1>
            <p className="tagline">
              Your Voice and Face Can Reveal What Words Don't. LifeBack™ uses advanced AI to analyze voice patterns and facial expressions,
              providing scientific insights into mental well-being. Our multi-modal approach offers a more comprehensive understanding than traditional methods.
            </p>
            <button className="btn" onClick={scrollToTest}>
              Start Free Analysis
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <h2 className="section-title">
          How LifeBack<span className="trademark">™</span> Works
        </h2>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-microphone-alt" />
            </div>
            <h3 className="feature-title">Voice Analysis</h3>
            <p className="feature-description">
              Deep speech models detect vocal biomarkers—prosody, pitch variation, pauses, and energy—linked to emotional state and risk signals.
            </p>
            <ul className="biomarker-list">
              <li>Prosody &amp; intonation patterns</li>
              <li>Pitch variation analysis</li>
              <li>Pause frequency &amp; duration</li>
              <li>Speech energy &amp; intensity</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-smile" />
            </div>
            <h3 className="feature-title">Facial Expression Recognition</h3>
            <p className="feature-description">
              Tracks AUs and facial dynamics to capture micro-expression patterns and affective shifts relevant to mental well-being.
            </p>
            <ul className="biomarker-list">
              <li>Facial Action Units (AUs) tracking</li>
              <li>Micro-expression pattern detection</li>
              <li>Affective shift monitoring</li>
              <li>Emotional valence analysis</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-brain" />
            </div>
            <h3 className="feature-title">Multi-Modal Insights</h3>
            <p className="feature-description">
              Combines voice + face signals to improve reliability, reduce noise, and generate trend-based assessments over time.
            </p>
            <ul className="biomarker-list">
              <li>Cross-modal signal fusion</li>
              <li>Noise reduction algorithms</li>
              <li>Longitudinal trend analysis</li>
              <li>Personalized baseline establishment</li>
            </ul>
          </div>
        </div>

        <hr />

        <div id="test-section" className="test-section">
          <div className="test-tabs">
            <button
              className={`tab-btn ${activeTab === "lb-assessment" ? "active" : ""}`}
              onClick={() => setActiveTab("lb-assessment")}
              type="button"
            >
              LB Assessment
            </button>
            <button
              className={`tab-btn ${activeTab === "comprehensive" ? "active" : ""}`}
              onClick={() => setActiveTab("comprehensive")}
              type="button"
            >
              Comprehensive Assessment
            </button>
          </div>

          {/* LB TAB */}
          <div className={`tab-content ${activeTab === "lb-assessment" ? "active" : ""}`} id="lb-assessment">
            <h2 className="tab-title">LB Assessment</h2>
            <p className="tab-description">
              Our core AI-powered assessment that analyzes your voice patterns and facial expressions to provide insights into your mental well-being.
            </p>

            <ul className="tab-features">
              <li>
                <i className="fas fa-check-circle" /> AI-powered voice pattern analysis
              </li>
              <li>
                <i className="fas fa-check-circle" /> Facial expression recognition
              </li>
              <li>
                <i className="fas fa-check-circle" /> Calibrated with standardized psychological scales
              </li>
              <li>
                <i className="fas fa-check-circle" /> Instant results with detailed insights
              </li>
              <li>
                <i className="fas fa-check-circle" /> Privacy-focused analysis
              </li>
            </ul>

            <div className="warning-note">
              <p>
                <i className="fas fa-exclamation-triangle" /> <strong>Note:</strong> The LB Assessment is calibrated with standard psychological scales but is not
                yet a medically approved diagnostic tool. Results are for informational purposes only.
              </p>
            </div>

            <div className="tab-buttons">
              <button className="btn" onClick={() => beginAssessment("lb")} type="button">
                Begin LB Assessment
              </button>
              <button className="tab-btn-secondary" onClick={() => alert("This can open a Learn More page later.")} type="button">
                Learn More About This Test
              </button>
            </div>
          </div>

          {/* COMPREHENSIVE TAB */}
          <div className={`tab-content ${activeTab === "comprehensive" ? "active" : ""}`} id="comprehensive">
            <h2 className="tab-title">Comprehensive Assessment</h2>
            <p className="tab-description">A complete evaluation combining our AI analysis with expert-rated clinical scales for a more thorough assessment.</p>

            <ul className="tab-features">
              <li>
                <i className="fas fa-check-circle" /> Includes full LB Assessment
              </li>
              <li>
                <i className="fas fa-check-circle" /> Expert-rated clinical scales (HAMD, PHQ-9, etc.)
              </li>
              <li>
                <i className="fas fa-check-circle" /> Detailed psychological evaluation
              </li>
              <li>
                <i className="fas fa-check-circle" /> Personalized recommendations
              </li>
              <li>
                <i className="fas fa-check-circle" /> Option to share results with healthcare providers
              </li>
            </ul>

            <div className="assessment-note">
              <p>
                <i className="fas fa-file-medical-alt" /> <strong>Medically Approved Report:</strong> The Comprehensive Assessment includes a detailed report that can be reviewed
                by healthcare professionals.
              </p>
            </div>

            <div className="tab-buttons">
              <button className="btn" onClick={() => beginAssessment("comprehensive")} type="button">
                Begin Comprehensive Assessment
              </button>
              <button className="tab-btn-secondary" onClick={() => setModalOpen(true)} type="button">
                See Sample Report
              </button>
            </div>
          </div>
        </div>
      </div>
	  
	  
	
      {/* MODAL */}
      <div
        className="modal-overlay"
        style={{ display: modalOpen ? "block" : "none" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModalOpen(false);
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <i className="fas fa-file-medical-alt" /> LifeBack™ Sample Assessment Report
            </h2>
            <button className="close-modal" onClick={() => setModalOpen(false)} type="button">
              &times;
            </button>
          </div>

          <div className="modal-body">
            <div className="report-section">
              <h3>Assessment Overview</h3>
              <div className="charts-container">
                <div className="chart-card">
                  <div className="chart-title">Depression Severity Score</div>
                  <div className="chart-container">
                    <canvas ref={severityRef} />
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-title">Weekly Mood Trends</div>
                  <div className="chart-container">
                    <canvas ref={moodRef} />
                  </div>
                </div>
              </div>

              <div className="report-summary">
                <h4>Summary</h4>
                <p>
                  This sample report demonstrates the comprehensive analysis provided by LifeBack™. The assessment combines multimodal AI analysis (voice and facial
                  biomarkers) with validated clinical scales (PHQ-9, HAMD) to provide a holistic view of mental well-being.
                </p>
                <p>
                  The individual shows moderate depressive symptoms with notable improvements in vocal energy and facial expressiveness over the assessment period,
                  suggesting potential response to therapeutic interventions.
                </p>
              </div>
            </div>

            <div className="report-section">
              <h3>Biomarker Analysis</h3>
              <div className="charts-container">
                <div className="chart-card">
                  <div className="chart-title">Vocal Biomarker Scores</div>
                  <div className="chart-container">
                    <canvas ref={vocalRef} />
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-title">Facial Expression Metrics</div>
                  <div className="chart-container">
                    <canvas ref={facialRef} />
                  </div>
                </div>
              </div>
            </div>

            <div className="report-section">
              <h3>Clinical Scale Results</h3>
              <div className="charts-container">
                <div className="chart-card">
                  <div className="chart-title">PHQ-9 Assessment</div>
                  <div className="chart-container">
                    <canvas ref={phqRef} />
                  </div>
                </div>

                <div className="chart-card">
                  <div className="chart-title">HAM-D Assessment</div>
                  <div className="chart-container">
                    <canvas ref={hamdRef} />
                  </div>
                </div>
              </div>

              <div className="report-summary">
                <h4>Clinical Interpretation</h4>
                <p>
                  PHQ-9 score of 14 indicates moderate depression severity. HAM-D score of 18 confirms moderate depressive symptoms with particular elevation in
                  items related to work/activities, psychic anxiety, and somatic symptoms.
                </p>
                <p>The AI-biomarker analysis correlates strongly with clinical scale results (r=0.78), validating the multimodal assessment approach.</p>
              </div>
            </div>

            <div className="report-section">
              <h3>Recommendations</h3>
              <div className="report-summary">
                <p>
                  <strong>Disclaimer:</strong> This is a sample report for demonstration purposes only. Actual reports are generated based on individual assessment data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
