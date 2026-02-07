"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type RoiInputs = {
  headcount: number;
  annualHealthcareSpendPerPerson: number;
  sickDaysPerPerson: number;
  costPerSickDay: number;
  annualProgramCost: number;
};

function formatINR(n: number) {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
  } catch {
    return "₹" + Math.round(n).toLocaleString("en-IN");
  }
}

function formatUSD(n: number) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  } catch {
    return "$" + Math.round(n).toLocaleString("en-US");
  }
}

function clampNumber(value: string, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export default function ProgramsPage() {
  const [roiOpen, setRoiOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const [roi, setRoi] = useState<RoiInputs>({
    headcount: 1000,
    annualHealthcareSpendPerPerson: 12000, // INR (edit as needed)
    sickDaysPerPerson: 6,
    costPerSickDay: 2500, // INR
    annualProgramCost: 3500000, // INR
  });

  // These are the “headline” ranges used in your page copy.
  // You can change them later to match your internal model assumptions.
  const ASSUME_HEALTHCARE_COST_REDUCTION = 0.42; // 42%
  const ASSUME_SICKDAY_REDUCTION = 0.67; // 67%

  const roiResult = useMemo(() => {
    const headcount = Math.max(0, roi.headcount);
    const healthcareBaseline = Math.max(0, roi.annualHealthcareSpendPerPerson) * headcount;
    const healthcareSavings = healthcareBaseline * ASSUME_HEALTHCARE_COST_REDUCTION;

    const sickDayBaseline = Math.max(0, roi.sickDaysPerPerson) * headcount;
    const sickDaySavings = sickDayBaseline * ASSUME_SICKDAY_REDUCTION;
    const productivitySavings = sickDaySavings * Math.max(0, roi.costPerSickDay);

    const totalSavings = healthcareSavings + productivitySavings;
    const programCost = Math.max(0, roi.annualProgramCost);

    const netBenefit = totalSavings - programCost;
    const roiMultiple = programCost > 0 ? totalSavings / programCost : 0;

    return {
      healthcareBaseline,
      healthcareSavings,
      sickDayBaseline,
      sickDaySavings,
      productivitySavings,
      totalSavings,
      programCost,
      netBenefit,
      roiMultiple,
    };
  }, [roi]);

  useEffect(() => {
    const metricCards = Array.from(
      document.querySelectorAll<HTMLElement>('[data-anim="metric-card"]')
    );
    const flowSteps = Array.from(
      document.querySelectorAll<HTMLElement>('[data-anim="flow-step"]')
    );

    if (typeof IntersectionObserver === "undefined") {
      metricCards.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
      flowSteps.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.style.opacity = "1";
            target.style.transform =
              target.dataset.anim === "flow-step" ? "scale(1)" : "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    metricCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });

    flowSteps.forEach((step, index) => {
      step.style.opacity = "0";
      step.style.transform = "scale(0.9)";
      step.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
      observer.observe(step);
    });

    // Animate ROI metric
    const roiMetric = document.querySelector<HTMLElement>('[data-anim="roi-metric"]');
    let observer2: IntersectionObserver | null = null;
    const timeoutIds: number[] = [];

    if (roiMetric) {
      const originalText = roiMetric.textContent ?? "$3.80 ROI";
      roiMetric.textContent = "$0.00 ROI";

      observer2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            let counter = 0;
            const target = 3.8;
            const increment = target / 40;

            const updateCounter = () => {
              if (!roiMetric) return;

              if (counter < target) {
                counter += increment;
                roiMetric.textContent = "$" + counter.toFixed(2) + " ROI";
                const id = window.setTimeout(updateCounter, 50);
                timeoutIds.push(id);
              } else {
                roiMetric.textContent = originalText;
              }
            };

            updateCounter();
            observer2?.unobserve(entry.target);
          });
        },
        { threshold: 0.5 }
      );

      observer2.observe(roiMetric);
    }

    return () => {
      observer.disconnect();
      observer2?.disconnect();
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Close modals on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setRoiOpen(false);
        setDemoOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("LifeBack™ — Request Integration Demo");
    const body = encodeURIComponent(
      [
        "Hello LifeBack Team,",
        "",
        "I would like to request an integration demo.",
        "",
        "Name:",
        "Organization:",
        "Role:",
        "Email:",
        "Phone:",
        "Notes / Requirements:",
        "",
        "Thanks,",
      ].join("\n")
    );
    return `mailto:contact@lifeback.ai?subject=${subject}&body=${body}`;
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.titleStrip}>
          <h1>Corporate &amp; Education Wellness Augmentation</h1>
          <div className={styles.tagline}>
            AI-Layer Integration with existing clinical partners for measurable productivity &amp; family-centric healthcare outcomes
          </div>
        </div>

        <div className={styles.overviewBox}>
          <p>
            LifeBack bridges <span className={styles.highlight}>corporate/education wellness initiatives</span> with{" "}
            <span className={styles.highlight}>clinical treatment efficacy</span> through an intelligent AI augmentation layer.
            We don&apos;t replace your clinical partners—we enhance them. Our platform delivers{" "}
            <span className={styles.metricHighlight}>measurable ROI</span> through early detection, reduced healthcare costs,
            and enhanced productivity while extending comprehensive care to employees&apos; entire families.
          </p>
        </div>

        <div className={styles.metricContainer}>
          <div className={styles.metricCard} data-anim="metric-card">
            <div className={styles.metricValue}>↑ 23%</div>
            <div className={styles.metricLabel}>Productivity Gain</div>
          </div>

          <div className={styles.metricCard} data-anim="metric-card">
            <div className={styles.metricValue}>↓ 42%</div>
            <div className={styles.metricLabel}>Healthcare Costs</div>
          </div>

          <div className={styles.metricCard} data-anim="metric-card">
            <div className={styles.metricValue}>$3.8</div>
            <div className={styles.metricLabel}>ROI per $1 invested</div>
          </div>

          <div className={styles.metricCard} data-anim="metric-card">
            <div className={styles.metricValue}>↓ 67%</div>
            <div className={styles.metricLabel}>Sick Days</div>
          </div>
        </div>

        <h2 className={styles.h2}>Corporate and Institutional</h2>

        <div className={styles.gridContainer}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <i className="fas fa-handshake" aria-hidden="true" />
              </div>
              <h3 className={styles.h3}>Clinical Partner Integration</h3>
            </div>
            <ul className={styles.ul}>
              <li className={styles.li}>
                Seamless <span className={styles.highlight}>AI augmentation</span> of existing clinical relationships
              </li>
              <li className={styles.li}>Real-time data sharing with HIPAA-compliant protocols</li>
              <li className={styles.li}>Unified dashboard for HR, clinical teams, and employees</li>
              <li className={styles.li}>Enhanced diagnostic accuracy without replacing human expertise</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <i className="fas fa-chart-line" aria-hidden="true" />
              </div>
              <h3 className={styles.h3}>Consistent Screening</h3>
            </div>
            <ul className={styles.ul}>
              <li className={styles.li}>Standardized assessment across entire workforce/student body</li>
              <li className={styles.li}>
                <span className={styles.metricHighlight}>Passive monitoring</span> with minimal disruption
              </li>
              <li className={styles.li}>
                Shift from reactive to <span className={styles.highlight}>preventive healthcare</span>
              </li>
              <li className={styles.li}>Early detection reducing facility administration needs</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <i className="fas fa-graduation-cap" aria-hidden="true" />
              </div>
              <h3 className={styles.h3}>Education Institution Focus</h3>
            </div>
            <ul className={styles.ul}>
              <li className={styles.li}>Student mental health &amp; wellness programs</li>
              <li className={styles.li}>Faculty/staff healthcare optimization</li>
              <li className={styles.li}>Research collaboration opportunities</li>
              <li className={styles.li}>Early intervention for at-risk student populations</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <i className="fas fa-shield-alt" aria-hidden="true" />
              </div>
              <h3 className={styles.h3}>Compliance &amp; Data Security</h3>
            </div>
            <ul className={styles.ul}>
              <li className={styles.li}>HIPAA-compliant end-to-end encryption</li>
              <li className={styles.li}>GDPR-ready for international deployments</li>
              <li className={styles.li}>Role-based access control with audit logging</li>
              <li className={styles.li}>Enterprise-grade security infrastructure</li>
              <li className={styles.li}>Regular compliance audits and certifications</li>
            </ul>
          </div>
        </div>

        <div className={styles.integrationFlow}>
          <div className={styles.flowStep} data-anim="flow-step">
            <div className={styles.stepNumber}>1</div>
            <strong>Existing Clinical Partners</strong>
            <p>Your current healthcare providers</p>
          </div>

          <div className={styles.flowArrow}>→</div>

          <div className={styles.flowStep} data-anim="flow-step">
            <div className={styles.stepNumber}>2</div>
            <strong>AI Augmentation Layer</strong>
            <p>LifeBack&apos;s intelligent analysis</p>
          </div>

          <div className={styles.flowArrow}>→</div>

          <div className={styles.flowStep} data-anim="flow-step">
            <div className={styles.stepNumber}>3</div>
            <strong>Enhanced Outcomes</strong>
            <p>Better diagnostics &amp; treatment</p>
          </div>

          <div className={styles.flowArrow}>→</div>

          <div className={styles.flowStep} data-anim="flow-step">
            <div className={styles.stepNumber}>4</div>
            <strong>Measurable ROI</strong>
            <p>Productivity &amp; cost savings</p>
          </div>
        </div>

        <h2 className={styles.h2}>Treatment Outcome Efficacy (TOE) Framework</h2>

        <div className={styles.toePillar}>
          <div className={styles.pillarTitle}>
            <i className="fas fa-heartbeat" aria-hidden="true" /> Clinical Effectiveness
          </div>
          <p>
            Objective measurement of treatment progress with standardized metrics.{" "}
            <span className={styles.metricHighlight}>Real-time efficacy tracking</span> with comparative benchmarks against
            population norms and individualized treatment goals.
          </p>
        </div>

        <div className={styles.toePillar}>
          <div className={styles.pillarTitle}>
            <i className="fas fa-dollar-sign" aria-hidden="true" /> Cost-Effectiveness
          </div>
          <p>
            Reduction in overall healthcare expenditure through{" "}
            <span className={styles.highlight}>preventive care, early detection, and optimized treatment pathways</span>.
            Demonstrable ROI for organizations through decreased insurance claims and improved productivity.
          </p>
        </div>

        <div className={styles.familySection}>
          <h3 className={styles.h3}>
            <i className="fas fa-users" aria-hidden="true" /> Whole Family Coverage
          </h3>
          <p>
            Extending organizational wellness benefits to employees&apos; families creates a{" "}
            <span className={styles.highlight}>comprehensive health ecosystem</span> with multiplier effects on wellbeing and
            productivity.
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>Family-wide screening and preventive care initiatives</li>
            <li className={styles.li}>Reduced employee stress through family health security</li>
            <li className={styles.li}>Early intervention for dependents reduces long-term organizational costs</li>
            <li className={styles.li}>Unified family health dashboard with privacy controls</li>
          </ul>
        </div>

        <div className={styles.roiSection}>
          <div className={styles.roiTitle}>Measurable Organizational Impact</div>
          <div className={styles.roiMetric} data-anim="roi-metric">
            $3.80 ROI
          </div>
          <p className={styles.centerText}>
            For every $1 invested in LifeBack, organizations see $3.80 return through reduced healthcare costs and increased
            productivity.
          </p>
        </div>

        <div className={styles.csrSection}>
          <h3 className={styles.h3}>
            <i className="fas fa-hands-helping" aria-hidden="true" /> Built-In Corporate Social Responsibility
          </h3>
          <p>
            LifeBack transforms wellness from a cost center to a <span className={styles.highlight}>strategic CSR asset</span>{" "}
            with measurable social impact.
          </p>
          <ul className={styles.ul}>
            <li className={styles.li}>Demonstrable commitment to employee/student wellbeing</li>
            <li className={styles.li}>ESG (Environmental, Social, Governance) reporting automation</li>
            <li className={styles.li}>Positive brand association with health innovation leadership</li>
            <li className={styles.li}>Community health initiatives powered by aggregated, anonymized data</li>
          </ul>
        </div>

        <h2 className={styles.h2}>Adaptable Integration for Organizations</h2>

        <div className={styles.gridContainer}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <i className="fas fa-building" aria-hidden="true" />
              </div>
              <h3 className={styles.h3}>Corporate Enterprises</h3>
            </div>
            <ul className={styles.ul}>
              <li className={styles.li}>Scalable from 100 to 100,000+ employees</li>
              <li className={styles.li}>Department-specific wellness initiatives</li>
              <li className={styles.li}>Executive health optimization programs</li>
              <li className={styles.li}>Global deployment with localization</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <i className="fas fa-university" aria-hidden="true" />
              </div>
              <h3 className={styles.h3}>Educational Institutions</h3>
            </div>
            <ul className={styles.ul}>
              <li className={styles.li}>Student mental health &amp; wellness programs</li>
              <li className={styles.li}>Faculty/staff healthcare optimization</li>
              <li className={styles.li}>Research collaboration opportunities</li>
              <li className={styles.li}>Campus-wide health initiatives</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <i className="fas fa-hospital" aria-hidden="true" />
              </div>
              <h3 className={styles.h3}>Healthcare Systems</h3>
            </div>
            <ul className={styles.ul}>
              <li className={styles.li}>Employee wellness for clinical staff</li>
              <li className={styles.li}>Patient outcome improvement programs</li>
              <li className={styles.li}>Value-based care optimization</li>
              <li className={styles.li}>Population health management</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <i className="fas fa-home" aria-hidden="true" />
              </div>
              <h3 className={styles.h3}>Personal &amp; Family Level Care</h3>
            </div>
            <ul className={styles.ul}>
              <li className={styles.li}>
                <span className={styles.highlight}>Individual health optimization</span> within organizational context
              </li>
              <li className={styles.li}>Family-centric care extending beyond the employee/student</li>
              <li className={styles.li}>Personalized health recommendations based on individual &amp; family data</li>
              <li className={styles.li}>Privacy-protected family health dashboards</li>
              <li className={styles.li}>Multi-generational wellness tracking and intervention</li>
              <li className={styles.li}>Preventive care for entire households reducing organizational burden</li>
            </ul>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaTitle}>Ready to Augment Corporate Wellness Strategy?</div>
          <p className={styles.ctaText}>
            Schedule a consultation to see how LifeBack can integrate with your existing clinical partners to deliver
            measurable Treatment Outcome Efficacy and ROI.
          </p>

          <div className={styles.ctaRow}>
            <button type="button" className={`${styles.ctaPill} ${styles.ctaPillLight}`} onClick={() => setRoiOpen(true)}>
              ROI Calculator
            </button>
            <button
              type="button"
              className={`${styles.ctaPill} ${styles.ctaPillGreen}`}
              onClick={() => {
                setDemoSubmitted(false);
                setDemoOpen(true);
              }}
            >
              Request Integration Demo
            </button>
          </div>

          <div className={styles.ctaHint}>
            *This calculator uses the same headline assumptions shown on this page (42% healthcare cost reduction and 67% sick-day reduction).
          </div>
        </div>

        <div className={styles.pageFooter}>
          <p>LifeBack Wellness Augmentation Platform | AI-Layer Integration with Clinical Partners | HIPAA Compliant | GDPR Ready</p>
          <p>Treatment Outcome Efficacy = Clinical Effectiveness + Cost Effectiveness + Family-Centric Care</p>
        </div>
      </div>

      {/* ROI CALCULATOR MODAL */}
      {roiOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="ROI Calculator">
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <i className="fas fa-calculator" aria-hidden="true" /> ROI Calculator
              </div>
              <button type="button" className={styles.modalClose} onClick={() => setRoiOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span className={styles.label}>Population size (employees / students)</span>
                  <input
                    className={styles.input}
                    inputMode="numeric"
                    value={roi.headcount}
                    onChange={(e) => setRoi({ ...roi, headcount: Math.max(0, clampNumber(e.target.value, roi.headcount)) })}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Annual healthcare spend per person (INR)</span>
                  <input
                    className={styles.input}
                    inputMode="numeric"
                    value={roi.annualHealthcareSpendPerPerson}
                    onChange={(e) =>
                      setRoi({
                        ...roi,
                        annualHealthcareSpendPerPerson: Math.max(0, clampNumber(e.target.value, roi.annualHealthcareSpendPerPerson)),
                      })
                    }
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Average sick days per person / year</span>
                  <input
                    className={styles.input}
                    inputMode="numeric"
                    value={roi.sickDaysPerPerson}
                    onChange={(e) => setRoi({ ...roi, sickDaysPerPerson: Math.max(0, clampNumber(e.target.value, roi.sickDaysPerPerson)) })}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Cost per sick day (INR)</span>
                  <input
                    className={styles.input}
                    inputMode="numeric"
                    value={roi.costPerSickDay}
                    onChange={(e) => setRoi({ ...roi, costPerSickDay: Math.max(0, clampNumber(e.target.value, roi.costPerSickDay)) })}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Annual program cost (INR)</span>
                  <input
                    className={styles.input}
                    inputMode="numeric"
                    value={roi.annualProgramCost}
                    onChange={(e) => setRoi({ ...roi, annualProgramCost: Math.max(0, clampNumber(e.target.value, roi.annualProgramCost)) })}
                  />
                </label>
              </div>

              <div className={styles.resultBox}>
                <div className={styles.resultTitle}>Estimated Savings (Annual)</div>

                <div className={styles.resultRow}>
                  <span>Healthcare baseline</span>
                  <span>{formatINR(roiResult.healthcareBaseline)}</span>
                </div>
                <div className={styles.resultRow}>
                  <span>Healthcare savings (≈ 42%)</span>
                  <span>{formatINR(roiResult.healthcareSavings)}</span>
                </div>
                <div className={styles.resultRow}>
                  <span>Sick-day baseline</span>
                  <span>{Math.round(roiResult.sickDayBaseline).toLocaleString("en-IN")} days</span>
                </div>
                <div className={styles.resultRow}>
                  <span>Sick-day savings (≈ 67%)</span>
                  <span>{Math.round(roiResult.sickDaySavings).toLocaleString("en-IN")} days</span>
                </div>
                <div className={styles.resultRow}>
                  <span>Productivity savings (sick days)</span>
                  <span>{formatINR(roiResult.productivitySavings)}</span>
                </div>

                <div className={styles.resultDivider} />

                <div className={styles.resultRowStrong}>
                  <span>Total savings</span>
                  <span>{formatINR(roiResult.totalSavings)}</span>
                </div>
                <div className={styles.resultRow}>
                  <span>Program cost</span>
                  <span>{formatINR(roiResult.programCost)}</span>
                </div>
                <div className={styles.resultRowStrong}>
                  <span>Net benefit</span>
                  <span>{formatINR(roiResult.netBenefit)}</span>
                </div>
                <div className={styles.resultRowStrong}>
                  <span>ROI multiple</span>
                  <span>{roiResult.roiMultiple.toFixed(2)}×</span>
                </div>

                <div className={styles.smallPrint}>
                  Note: This is a directional model for planning conversations. Replace assumptions and costs with your internal numbers during scoping.
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.secondaryBtn} onClick={() => setRoiOpen(false)}>
                  Close
                </button>
                <a className={styles.primaryBtn} href={mailtoHref}>
                  Email these numbers
                </a>
              </div>
            </div>
          </div>

          <button className={styles.modalBackdrop} onClick={() => setRoiOpen(false)} aria-label="Close ROI modal" />
        </div>
      )}

      {/* DEMO REQUEST MODAL */}
      {demoOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Request Integration Demo">
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <i className="fas fa-video" aria-hidden="true" /> Request Integration Demo
              </div>
              <button type="button" className={styles.modalClose} onClick={() => setDemoOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {!demoSubmitted ? (
                <form
                  className={styles.demoForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDemoSubmitted(true);
                  }}
                >
                  <div className={styles.formGrid}>
                    <label className={styles.field}>
                      <span className={styles.label}>Full name</span>
                      <input className={styles.input} required placeholder="Your name" />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Organization</span>
                      <input className={styles.input} required placeholder="Company / University / Hospital" />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Work email</span>
                      <input className={styles.input} type="email" required placeholder="name@org.com" />
                    </label>

                    <label className={styles.field}>
                      <span className={styles.label}>Phone (optional)</span>
                      <input className={styles.input} placeholder="+91…" />
                    </label>

                    <label className={styles.fieldWide}>
                      <span className={styles.label}>What do you want to integrate? (brief)</span>
                      <textarea className={styles.textarea} rows={4} placeholder="EAP / hospital partner / counseling cell / insurance / HRMS / LMS, etc." />
                    </label>
                  </div>

                  <div className={styles.modalActions}>
                    <button type="button" className={styles.secondaryBtn} onClick={() => setDemoOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className={styles.primaryBtnBtn}>
                      Submit request
                    </button>
                    <a className={styles.linkBtn} href={mailtoHref}>
                      Or email instead
                    </a>
                  </div>
                </form>
              ) : (
                <div className={styles.successBox}>
                  <div className={styles.successTitle}>Request received ✅</div>
                  <div className={styles.successText}>
                    Thank you. We’ll respond on email with next steps and a short checklist for integration readiness.
                  </div>
                  <div className={styles.modalActions}>
                    <button type="button" className={styles.primaryBtnBtn} onClick={() => setDemoOpen(false)}>
                      Close
                    </button>
                    <a className={styles.linkBtn} href={mailtoHref}>
                      Email details
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className={styles.modalBackdrop} onClick={() => setDemoOpen(false)} aria-label="Close Demo modal" />
        </div>
      )}
    </main>
  );
}
