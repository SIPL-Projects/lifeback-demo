import PageShell from "../../components/PageShell";

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      subtitle="Objective mental-health decision support for hospitals and clinicians."
    >
      <div className="page-card">
        <div 
          style={{
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            padding: "25px",
            borderRadius: "15px",
            fontSize: "22px",
            color: "#333",
            lineHeight: 1.6
          }}
        >
          <p style={{ margin: 0 }}>
            LifeBack™ helps hospitals and clinicians bring objectivity to mental-health care. Today,
            assessments are often subjective, time-intensive, and inconsistent across clinicians and visits.
            LifeBack's MVP (Minimum Viable Product) combines audio-video analysis + standardized scales to generate decision-support
            insights—risk flags, symptom severity trends, and follow-up tracking—inside routine clinical workflows.
            The goal is not to replace clinicians, but to standardize evaluation, reduce missed cases, and enable
            measurable monitoring across visits. We are deploying the MVP in multi-location pilots with performance,
            safety, and adoption KPIs, alongside a clear roadmap toward QMS (Quality Management System) + SaMD (Software as a Medical Device) readiness.
          </p>
        </div>
      </div>
    </PageShell>
  );
}