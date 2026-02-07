"use client";

import React, { useEffect, useMemo, useState } from "react";

type NavItem = { label: string; active?: boolean };
type SidebarItem = { label: string; icon: React.ReactNode; active?: boolean };
type PatientRow = {
  name: string;
  id: string;
  department: string;
  assessmentType: string;
  status: "New" | "In Progress" | "Completed";
  severity: "Low" | "Moderate" | "High";
  dateLabel: string;
  actionLabel: string;
};

const css = `
:root {
  --primary-blue: #129ba5c4;
  --primary-dark: #0c267a;
  --secondary-blue: #35cfc2;
  --light-blue: #dbeafe;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --gray-50: hsla(0, 20%, 98%, 0.94);
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #f5f9ff;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --white: #ffffff;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html, body {
  height: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: var(--gray-50);
  color: var(--gray-800);
  line-height: 1.6;
}

/* Header - Clinical Style */
.clinical-header {
  background-color: var(--white);
  border-bottom: 1px solid var(--gray-200);
  padding: 0.75rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.header-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-container { display: flex; align-items: center; gap: 0.75rem; }
.logo-icon {
  width: 2.5rem; height: 2.5rem;
  
  
  background: linear-gradient(135deg, #E3B12E 0%, #F6C343 100%));
  
  border-radius: 0.5rem;
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 700; font-size: 1.125rem;
}
.logo-text { font-size: 1.7rem; font-weight: 700; color: #ff7e5f; }
.logo-text span { font-size: 0.75rem; vertical-align: super; color: #e5484d ; }

.clinical-nav { display: flex; gap: 2rem; align-items: center; }
.nav-link {
  color: #f8f9fa;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;
  padding: 0.5rem 0;
  position: relative;
}
.nav-link:hover { color: var(--primary-blue); }
.nav-link.active { color: ; }
.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: 2px;
  background-color: var(--primary-blue);
}

.user-info {
  display: flex; align-items: center; gap: 1rem;
  padding-left: 1rem;
  border-left: 1px solid var(--gray-200);
}
.user-avatar {
  width: 2.5rem; height: 2.5rem;
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-dark));
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 600; font-size: 1rem;
}
.hospital-badge {
  background-color: var(--light-blue);
  color: var(--primary-dark);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--gray-200);
}

/* Main Layout - Clinical Dashboard */
.clinical-layout {
  display: flex;
  min-height: calc(100vh - 64px);
  max-width: 1400px;
  margin: 0 auto;
}

/* Sidebar - Clinical Navigation */
.clinical-sidebar {
  width: 250px;
  background-color: var(--white);
  border-right: 1px solid var(--gray-200);
  padding: 1.5rem 0;
  flex-shrink: 0;
}
.sidebar-section { padding: 0 1.5rem; margin-bottom: 2rem; }
.sidebar-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--gray-500);
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}
.sidebar-nav { list-style: none; }
.sidebar-item { margin-bottom: 0.5rem; }
.sidebar-link {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--gray-700);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s;
}
.sidebar-link:hover { background-color: var(--gray-100); color: var(--primary-blue); }
.sidebar-link.active {
  background-color: var(--light-blue);
  color: var(--primary-blue);
  font-weight: 600;
}
.sidebar-icon { width: 1.25rem; height: 1.25rem; color: var(--gray-500); }
.sidebar-link.active .sidebar-icon { color: var(--primary-blue); }

/* Main Content Area */
.clinical-content { flex: 1; padding: 0; overflow-y: auto; }

/* Blue Banner Section */
.blue-banner {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-blue));
  color: white;
  padding: 4rem 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}
.banner-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}
.banner-container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
.banner-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
  max-width: 800px;
}
.banner-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 700px;
  margin-bottom: 2rem;
}
.banner-features {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
}
.feature-icon { width: 1.5rem; height: 1.5rem; }

.banner-stats {
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}
.stat-item { text-align: center; }
.stat-number { font-size: 2.5rem; font-weight: 700; display: block; }
.stat-label { font-size: 0.975rem; opacity: 0.8; }

.content-container { padding: 0 2rem 2rem 2rem; }

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--white);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-200);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.filter-options { display: flex; gap: 1rem; align-items: center; }
.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  background-color: white;
  color: var(--gray-700);
  font-size: 0.875rem;
}
.search-box { position: relative; width: 300px; }
.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: var(--gray-50);
}
.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-500);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}
.btn-primary { background-color: var(--primary-blue); color: white; }
.btn-primary:hover { background-color: var(--primary-dark); }
.btn-secondary {
  background-color: var(--gray-100);
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
}
.btn-secondary:hover { background-color: var(--gray-200); }
.btn-banner {
  background-color: white;
  color: var(--primary-blue);
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}
.btn-banner:hover {
  background-color: var(--gray-50);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* Patient Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.dashboard-card {
  background-color: var(--white);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-200);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.card-title { font-size: 1.125rem; font-weight: 600; color: var(--gray-900); }
.card-subtitle { color: var(--gray-600); font-size: 0.875rem; }

/* Stats Cards */
.stats-card { grid-column: span 3; display: flex; flex-direction: column; }
.stat-value { font-size: 2rem; font-weight: 700; color: var(--primary-blue); margin-bottom: 0.5rem; }
.stat-label { font-size: 0.875rem; color: #f8f9fa; }
.stat-change {
  margin-top: auto;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.positive { color: #e5484d; }
.negative { color: var(--danger); }

/* Patient List Table */
.patients-card { grid-column: span 8; }
.table-container { overflow-x: auto; }
.clinical-table { width: 100%; border-collapse: collapse; }
.clinical-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: var(--gray-700);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--gray-200);
  background-color: var(--gray-50);
}
.clinical-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-200);
  font-size: 0.875rem;
}
.patient-name { font-weight: 600; color: var(--gray-900); }
.patient-id { color: var(--gray-600); font-size: 0.75rem; margin-top: 0.25rem; }

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}
.status-new { background-color: var(--light-blue); color: var(--primary-dark); }
.status-in-progress { background-color: #fef3c7; color: #92400e; }
.status-completed { background-color: #d1fae5; color: #065f46; }

.severity-indicator { display: flex; align-items: center; gap: 0.5rem; }
.severity-dot { width: 0.75rem; height: 0.75rem; border-radius: 50%; }
.severity-low { background-color: var(--success); }
.severity-moderate { background-color: var(--warning); }
.severity-high { background-color: var(--danger); }

/* Assessment Cards */
.assessment-card { grid-column: span 4; }
.assessment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray-200);
}
.assessment-item:last-child { border-bottom: none; }
.assessment-type { font-weight: 600; color: var(--gray-900); }
.assessment-count {
  background-color: var(--gray-100);
  color: var(--gray-700);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.17);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}
.assessment-modal {
  background-color: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--gray-200);
}
.modal-title { font-size: 1.5rem; font-weight: 700; color: var(--gray-900); }
.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--gray-500);
  cursor: pointer;
  padding: 0.25rem;
}
.modal-body { padding: 2rem; }
.modal-tabs {
  display: flex;
  border-bottom: 1px solid var(--gray-200);
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.modal-tab {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-weight: 600;
  color: var(--gray-600);
  cursor: pointer;
  position: relative;
}
.modal-tab.active { color: var(--primary-blue); }
.modal-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-blue);
}

.step-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--gray-900); }
.step-description { color: var(--gray-600); margin-bottom: 1.5rem; }

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.form-field input, .form-field select, .form-field textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  background: white;
}
.form-field textarea { min-height: 100px; resize: vertical; }
.form-span-2 { grid-column: span 2; }

.recording-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background-color: var(--gray-50);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-200);
}
.recording-visualizer {
  width: 200px;
  height: 100px;
  background: linear-gradient(to right, var(--primary-blue) 0%, var(--primary-blue) 50%, var(--gray-200) 50%, var(--gray-200) 100%);
  border-radius: 0.5rem;
  animation: pulse 2s infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
.record-btn {
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background-color: var(--danger);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.record-btn.recording { background-color: var(--gray-700); }

.assessment-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-200);
}

/* Footnote */
.clinical-footnote {
  background-color: var(--white);
  border-top: 1px solid var(--gray-200);
  padding: 3rem 2rem;
  margin-top: 3rem;
}
.footnote-container { max-width: 1200px; margin: 0 auto; }
.footnote-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}
.footnote-description {
  color: var(--gray-600);
  font-size: 1.125rem;
  max-width: 800px;
  line-height: 1.6;
}
.footnote-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin: 2rem 0 3rem 0;
}
.column-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--light-blue);
}
.column-list { list-style: none; padding: 0; }
.column-list li {
  padding: 0.75rem 0;
  color: var(--gray-600);
  font-size: 1rem;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
}
.column-list li:before {
  content: "•";
  color: var(--primary-blue);
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-right: 0.75rem;
  font-size: 1.5rem;
  line-height: 1;
}
.column-list li:last-child { border-bottom: none; }

.clinical-scales-column {
  margin-top: 2rem;
  background-color: var(--gray-50);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid var(--gray-200);
}
.scales-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.scales-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}
.scale-item {
  background-color: var(--white);
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  color: var(--gray-700);
  border: 1px solid var(--gray-200);
  text-align: center;
}
.footnote-disclaimer {
  color: var(--gray-600);
  font-size: 0.875rem;
  line-height: 1.6;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-200);
  max-width: 800px;
}
.footnote-copyright { font-weight: 600; margin-bottom: 0.5rem; }

/* Responsive */
@media (max-width: 1200px) {
  .dashboard-grid { grid-template-columns: repeat(6, 1fr); }
  .stats-card { grid-column: span 3; }
  .patients-card { grid-column: span 6; }
  .assessment-card { grid-column: span 6; }
  .banner-title { font-size: 2.5rem; }
}
@media (max-width: 992px) {
  .clinical-layout { flex-direction: column; }
  .clinical-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--gray-200);
    padding: 1rem 0;
  }
  .sidebar-nav {
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
    padding: 0 1rem;
  }
  .sidebar-item { margin-bottom: 0; flex-shrink: 0; }
  .sidebar-link { white-space: nowrap; }
  .footnote-content { grid-template-columns: 1fr; gap: 2rem; }
  .banner-title { font-size: 2.25rem; }
  .banner-subtitle { font-size: 1.125rem; }
  .banner-stats { gap: 2rem; }
  .stat-number { font-size: 2rem; }
}
@media (max-width: 768px) {
  .clinical-header { padding: 0.75rem 1rem; }
  .clinical-nav { gap: 1rem; }
  .user-info { padding-left: 0.5rem; }
  .content-container { padding: 0 1rem 1rem 1rem; }
  .action-bar { flex-direction: column; gap: 1rem; align-items: stretch; }
  .filter-options { flex-wrap: wrap; }
  .search-box { width: 100%; }
  .dashboard-grid { grid-template-columns: 1fr; gap: 1rem; }
  .stats-card { grid-column: span 1; }
  .patients-card, .assessment-card { grid-column: span 1; }
  .modal-body { padding: 1.5rem; }
  .clinical-footnote { padding: 2rem 1rem; }
  .footnote-title { font-size: 1.75rem; }
  .scales-list { grid-template-columns: 1fr; }
  .blue-banner { padding: 3rem 1rem; }
  .banner-title { font-size: 2rem; }
  .banner-subtitle { font-size: 1rem; }
  .banner-features { gap: 1rem; }
  .feature-item { padding: 0.5rem 1rem; }
  .banner-stats { gap: 1.5rem; justify-content: space-between; }
  .stat-number { font-size: 1.75rem; }
}
`;

function IconDashboard() {
  return (
    <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  );
}
function IconUser() {
  return (
    <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
function IconDoc() {
  return (
    <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}
function IconMic() {
  return (
    <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="22"></line>
    </svg>
  );
}
function IconSmile() {
  return (
    <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
      <line x1="9" y1="9" x2="9.01" y2="9"></line>
      <line x1="15" y1="9" x2="15.01" y2="9"></line>
    </svg>
  );
}
function IconBars() {
  return (
    <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  );
}

function StatusBadge({ status }: { status: PatientRow["status"] }) {
  const className =
    status === "New"
      ? "status-badge status-new"
      : status === "In Progress"
      ? "status-badge status-in-progress"
      : "status-badge status-completed";
  return <span className={className}>{status}</span>;
}

function Severity({ severity }: { severity: PatientRow["severity"] }) {
  const dotClass =
    severity === "Low"
      ? "severity-dot severity-low"
      : severity === "Moderate"
      ? "severity-dot severity-moderate"
      : "severity-dot severity-high";
  return (
    <div className="severity-indicator">
      <div className={dotClass} />
      <span>{severity}</span>
    </div>
  );
}

export default function DoctorDashboard(): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isRecording, setIsRecording] = useState(false);

  const topNav: NavItem[] = useMemo(
    () => [
      { label: "Dashboard", active: true },
      { label: "Patients" },
      { label: "Assessments" },
      { label: "Reports" },
      { label: "Analytics" },
      { label: "Settings" },
    ],
    []
  );

  const sidebarTools: SidebarItem[] = useMemo(
    () => [
      { label: "Dashboard", icon: <IconDashboard />, active: true },
      { label: "Patients", icon: <IconUser /> },
      { label: "Assessments", icon: <IconCheck /> },
      { label: "Reports", icon: <IconDoc /> },
    ],
    []
  );

  const sidebarTypes: SidebarItem[] = useMemo(
    () => [
      { label: "Voice Analysis", icon: <IconMic /> },
      { label: "Facial Analysis", icon: <IconSmile /> },
      { label: "Clinical Scales", icon: <IconBars /> },
    ],
    []
  );

  const patients: PatientRow[] = useMemo(
    () => [
      {
        name: "Robert Johnson",
        id: "P-7842",
        department: "Oncology",
        assessmentType: "Comprehensive (Voice + Facial + PHQ-9)",
        status: "New",
        severity: "High",
        dateLabel: "Today, 09:30 AM",
        actionLabel: "Review",
      },
      {
        name: "Sarah Williams",
        id: "P-6391",
        department: "Gynecology",
        assessmentType: "Voice Analysis + GAD-7",
        status: "In Progress",
        severity: "Moderate",
        dateLabel: "Yesterday, 2:15 PM",
        actionLabel: "Continue",
      },
      {
        name: "Michael Chen",
        id: "P-9257",
        department: "Nephrology",
        assessmentType: "Facial Analysis + HAM-D",
        status: "Completed",
        severity: "Low",
        dateLabel: "Nov 12, 10:45 AM",
        actionLabel: "View Report",
      },
      {
        name: "Emma Rodriguez",
        id: "P-4183",
        department: "Gerontology",
        assessmentType: "Comprehensive (All Modalities)",
        status: "In Progress",
        severity: "Moderate",
        dateLabel: "Nov 11, 3:20 PM",
        actionLabel: "Continue",
      },
    ],
    []
  );

  const assessmentTypes = useMemo(
    () => [
      { label: "Comprehensive Assessment", count: 58 },
      { label: "Voice Pattern Analysis", count: 42 },
      { label: "Facial Action Unit Analysis", count: 51 },
      { label: "Clinical Scale Integration", count: 89 },
      { label: "PHQ-9 Depression Scale", count: 76 },
    ],
    []
  );

  const openModal = () => {
    setIsModalOpen(true);
    setStep(1);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsRecording(false);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  const stepTitles: Record<1 | 2 | 3 | 4 | 5, string> = {
    1: "Patient Info",
    2: "Voice Recording",
    3: "Facial Analysis",
    4: "Clinical Scales",
    5: "Review & Complete",
  };

  const canGoPrev = step > 1;
  const canGoNext = step < 5;

  return (
    <>
      <style>{css}</style>

      {/* Header */}
      <header className="clinical-header">
        <div className="header-container">
          <div className="logo-container">
            <div className="logo-icon">LB</div>
            <div className="logo-text">
              LifeBack<span>™</span>
            </div>
          </div>

          <nav className="clinical-nav" aria-label="Primary">
            {topNav.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`nav-link ${item.active ? "active" : ""}`}
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
            ))}

            <div className="user-info">
              <div className="user-avatar">JD</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>Dr. Jane Doe</div>
                <div style={{ fontSize: "0.75rem", color: "var(--gray-600)" }}>Psychiatrist</div>
              </div>
              <div className="hospital-badge">St. Mary&apos;s Hospital</div>
            </div>
          </nav>
        </div>
      </header>

      {/* Layout */}
      <div className="clinical-layout">
        {/* Sidebar */}
        <aside className="clinical-sidebar" aria-label="Sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Clinical Tools</div>
            <ul className="sidebar-nav">
              {sidebarTools.map((s) => (
                <li className="sidebar-item" key={s.label}>
                  <a
                    href="#"
                    className={`sidebar-link ${s.active ? "active" : ""}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    {s.icon}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Assessment Types</div>
            <ul className="sidebar-nav">
              {sidebarTypes.map((s) => (
                <li className="sidebar-item" key={s.label}>
                  <a href="#" className="sidebar-link" onClick={(e) => e.preventDefault()}>
                    {s.icon}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <main className="clinical-content">
          {/* Banner */}
          <section className="blue-banner">
            <div className="banner-overlay" />
            <div className="banner-container">
              <h1 className="banner-title">LifeBack™ Clinical Platform</h1>
              <p className="banner-subtitle">AI-Powered Mental Health Assessment for Healthcare Professionals</p>

              <button type="button" className="btn-banner" onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Start New Assessment
              </button>

              <div className="banner-features">
                <div className="feature-item">
                  <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="22"></line>
                  </svg>
                  Voice Pattern Analysis
                </div>

                <div className="feature-item">
                  <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                  Facial Action Unit Analysis
                </div>

                <div className="feature-item">
                  <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  Expert Rating Scale Integration
                </div>
              </div>

              <div className="banner-stats">
                <div className="stat-item">
                  <span className="stat-number">94.2%</span>
                  <span className="stat-label">Clinical Accuracy</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">14 min</span>
                  <span className="stat-label">Avg. Assessment Time</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">347+</span>
                  <span className="stat-label">Active Patients</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24</span>
                  <span className="stat-label">Assessments Today</span>
                </div>
              </div>
            </div>
          </section>

          {/* Body */}
          <div className="content-container">
            {/* Action bar */}
            <div className="action-bar">
              <div className="filter-options">
                <select className="filter-select" defaultValue="All Patients">
                  <option>All Patients</option>
                  <option>Today&apos;s Assessments</option>
                  <option>Pending Review</option>
                  <option>High Priority</option>
                </select>

                <select className="filter-select" defaultValue="All Departments">
                  <option>All Departments</option>
                  <option>Oncology</option>
                  <option>Gynecology</option>
                  <option>Nephrology</option>
                  <option>Gerontology</option>
                  <option>Psychiatry</option>
                  <option>Psychology</option>
                  <option>Neurology</option>
                  <option>Cardiology</option>
                  <option>Endocrinology</option>
                  <option>Pulmonology</option>
                  <option>Gastroenterology</option>
                </select>

                <div className="search-box">
                  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input className="search-input" placeholder="Search patients or assessments..." />
                </div>
              </div>

              <button type="button" className="btn btn-primary" onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.5rem" }}>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New Assessment
              </button>
            </div>

            {/* Grid */}
            <div className="dashboard-grid">
              {/* Stats */}
              <div className="dashboard-card stats-card">
                <div className="card-header">
                  <div>
                    <div className="card-title">Total Patients</div>
                    <div className="card-subtitle">Active in system</div>
                  </div>
                </div>
                <div className="stat-value">347</div>
                <div className="stat-label">Across all departments</div>
                <div className="stat-change positive">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                  18% increase
                </div>
              </div>

              <div className="dashboard-card stats-card">
                <div className="card-header">
                  <div>
                    <div className="card-title">Assessments Today</div>
                    <div className="card-subtitle">Completed / Scheduled</div>
                  </div>
                </div>
                <div className="stat-value">24</div>
                <div className="stat-label">5 pending review</div>
                <div className="stat-change positive">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                  8% increase
                </div>
              </div>

              <div className="dashboard-card stats-card">
                <div className="card-header">
                  <div>
                    <div className="card-title">Avg. Assessment Time</div>
                    <div className="card-subtitle">Multi-modal completion</div>
                  </div>
                </div>
                <div className="stat-value">14 min</div>
                <div className="stat-label">vs. 45 min traditional</div>
                <div className="stat-change positive">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                  69% faster
                </div>
              </div>

              <div className="dashboard-card stats-card">
                <div className="card-header">
                  <div>
                    <div className="card-title">System Accuracy</div>
                    <div className="card-subtitle">Clinical correlation</div>
                  </div>
                </div>
                <div className="stat-value">94.2%</div>
                <div className="stat-label">vs. expert ratings</div>
                <div className="stat-change positive">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                  2.3% improvement
                </div>
              </div>

              {/* Patients table */}
              <div className="dashboard-card patients-card">
                <div className="card-header">
                  <div>
                    <div className="card-title">Recent Assessments</div>
                    <div className="card-subtitle">Patients requiring attention</div>
                  </div>
                  <button type="button" className="btn btn-secondary">
                    View All
                  </button>
                </div>

                <div className="table-container">
                  <table className="clinical-table">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Department</th>
                        <th>Assessment Type</th>
                        <th>Status</th>
                        <th>Severity</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div className="patient-name">{p.name}</div>
                            <div className="patient-id">ID: {p.id}</div>
                          </td>
                          <td>{p.department}</td>
                          <td>{p.assessmentType}</td>
                          <td>
                            <StatusBadge status={p.status} />
                          </td>
                          <td>
                            <Severity severity={p.severity} />
                          </td>
                          <td>{p.dateLabel}</td>
                          <td>
                            <button type="button" className="btn btn-secondary" style={{ padding: "0.5rem 1rem" }}>
                              {p.actionLabel}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Assessment types */}
              <div className="dashboard-card assessment-card">
                <div className="card-header">
                  <div>
                    <div className="card-title">Assessment Types</div>
                    <div className="card-subtitle">Multi-modal breakdown</div>
                  </div>
                </div>

                {assessmentTypes.map((a) => (
                  <div className="assessment-item" key={a.label}>
                    <div className="assessment-type">{a.label}</div>
                    <div className="assessment-count">{a.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footnote */}
            <section className="clinical-footnote">
              <div className="footnote-container">
                <div style={{ marginBottom: "2rem" }}>
                  <h2 className="footnote-title"> Why LifeBack™</h2>
                  <p className="footnote-description">
                    Plug-and-play deployment: Easy to set up and start using across clinics, hospitals, or remote settings. 
Enhanced mental-care workflow: Streamlines screening, assessment, and follow-up with objective, time-saving insights.
Works across specialties: Supports diverse clinical needs across psychiatry and allied specialties involved in mental-health care.
Scale-aligned assessment: Integrates with standard clinical scales (optional) to enable comprehensive, evidence-based evaluation and monitoring..
                  </p>
                </div>

                <div className="footnote-content">
                  <div>
                    <h3 className="column-title">Analyses</h3>
                    <ul className="column-list">
                      <li>Voice Patterns</li>
                      <li>Facial Action Units</li>
                      <li>Expert Rating Scales</li>
                      <li>Clinical Integration</li>
                    </ul>

                    <div className="clinical-scales-column">
                      <div className="scales-title">
                        <IconBars />
                        Clinical Scales Integrated (Optional)
                      </div>
                      <div className="scales-list">
                        <div className="scale-item">PHQ-9</div>
                        <div className="scale-item">GAD-7</div>
                        <div className="scale-item">HAM-D</div>
                        <div className="scale-item">PANSS</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="column-title">Resources</h3>
                    <ul className="column-list">
                      <li>Research Validation</li>
                      <li>Clinical Trials</li>
                      <li>API Documentation</li>
                      <li>Technical Support</li>
                    </ul>
                  </div>
                </div>

                <div className="footnote-disclaimer">
                  <div className="footnote-copyright">© 2023 LifeBack. All rights reserved.</div>
                  <p>
                    Voice patterns, facial action units, and expert rating scales are analyzed as complementary, independent features. This tool is for clinical
                    support purposes only and should be used in conjunction with professional medical judgment.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="New Multi-Modal Assessment"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="assessment-modal">
            <div className="modal-header">
              <div className="modal-title">New Multi-Modal Assessment</div>
              <button type="button" className="modal-close" onClick={closeModal} aria-label="Close">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-tabs" aria-label="Assessment steps">
                {(Object.keys(stepTitles) as Array<keyof typeof stepTitles>).map((k) => {
                  const s = Number(k) as 1 | 2 | 3 | 4 | 5;
                  return (
                    <button
                      key={s}
                      type="button"
                      className={`modal-tab ${step === s ? "active" : ""}`}
                      onClick={() => setStep(s)}
                    >
                      {stepTitles[s]}
                    </button>
                  );
                })}
              </div>

              {/* Step content */}
              {step === 1 && (
                <>
                  <h3 className="step-title">Patient Information</h3>
                  <p className="step-description">Enter patient details to begin the multi-modal assessment.</p>

                  <div className="form-grid">
                    <div className="form-field">
                      <label>Full Name</label>
                      <input type="text" placeholder="e.g., Robert Johnson" />
                    </div>
                    <div className="form-field">
                      <label>Patient ID</label>
                      <input type="text" placeholder="e.g., P-7842" />
                    </div>
                    <div className="form-field">
                      <label>Date of Birth</label>
                      <input type="date" />
                    </div>
                    <div className="form-field">
                      <label>Gender</label>
                      <select defaultValue="Prefer not to say">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Department</label>
                      <select defaultValue="Select Department">
                        <option>Select Department</option>
                        <option>Oncology</option>
                        <option>Gynecology</option>
                        <option>Nephrology</option>
                        <option>Gerontology</option>
                        <option>Psychiatry</option>
                        <option>Psychology</option>
                        <option>Neurology</option>
                        <option>Cardiology</option>
                        <option>Endocrinology</option>
                        <option>Pulmonology</option>
                        <option>Gastroenterology</option>
                      </select>
                    </div>
                    <div className="form-field form-span-2">
                      <label>Reason for Assessment</label>
                      <textarea placeholder="Short clinical note..." />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="step-title">Voice Pattern Analysis</h3>
                  <p className="step-description">
                    Record patient&apos;s voice to analyze speech patterns, tone, and vocal biomarkers.
                  </p>

                  <div className="recording-controls">
                    <div className="recording-visualizer" />

                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Recording Instructions</div>
                      <div style={{ color: "var(--gray-600)", fontSize: "0.875rem", maxWidth: 640 }}>
                        Ask the patient to describe their day, how they&apos;ve been feeling, or read a provided passage. The recording can be used to analyze speech
                        rate, tone, pitch, and vocal markers.
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`record-btn ${isRecording ? "recording" : ""}`}
                      onClick={() => setIsRecording((v) => !v)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10,8 16,12 10,16" />
                      </svg>
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="step-title">Facial Action Unit Analysis</h3>
                  <p className="step-description">
                    Capture a short video or image sequence to analyze facial action units and affect markers.
                  </p>

                  <div className="dashboard-card" style={{ padding: "1.25rem" }}>
                    <div style={{ color: "var(--gray-600)", marginBottom: "1rem" }}>
                      (Placeholder) Connect camera capture + upload here.
                    </div>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <button type="button" className="btn btn-secondary">Upload Video</button>
                      <button type="button" className="btn btn-secondary">Open Camera</button>
                      <button type="button" className="btn btn-primary">Run Analysis</button>
                    </div>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h3 className="step-title">Clinical Scales</h3>
                  <p className="step-description">
                    Fill in or import validated scales (PHQ-9, GAD-7, HAM-D, PANSS, etc.) for clinical correlation.
                  </p>

                  <div className="dashboard-card" style={{ padding: "1.25rem" }}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label>Scale</label>
                        <select defaultValue="PHQ-9">
                          <option>PHQ-9</option>
                          <option>GAD-7</option>
                          <option>HAM-D</option>
                          <option>PANSS</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label>Score</label>
                        <input type="number" min={0} max={100} placeholder="e.g., 12" />
                      </div>
                      <div className="form-field form-span-2">
                        <label>Notes</label>
                        <textarea placeholder="Clinical notes / observations..." />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <h3 className="step-title">Review & Complete</h3>
                  <p className="step-description">Review collected modalities and finalize the assessment.</p>

                  <div className="dashboard-card" style={{ padding: "1.25rem" }}>
                    <div style={{ display: "grid", gap: "0.75rem", color: "var(--gray-700)" }}>
                      <div><strong>Patient:</strong> (placeholder)</div>
                      <div><strong>Voice:</strong> {isRecording ? "Recording in progress" : "Ready / Not recorded"}</div>
                      <div><strong>Face:</strong> Pending</div>
                      <div><strong>Scales:</strong> Pending</div>
                    </div>

                    <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <button type="button" className="btn btn-secondary">Save Draft</button>
                      <button type="button" className="btn btn-primary" onClick={closeModal}>Complete Assessment</button>
              </div>
                  </div>
                </>
              )}

              {/* Controls */}
              <div className="assessment-controls">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep((s) => (Math.max(1, s - 1) as 1 | 2 | 3 | 4 | 5))}
                  disabled={!canGoPrev}
                  style={{ opacity: canGoPrev ? 1 : 0.6, cursor: canGoPrev ? "pointer" : "not-allowed" }}
                >
                  Back
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setStep((s) => (Math.min(5, s + 1) as 1 | 2 | 3 | 4 | 5))}
                  disabled={!canGoNext}
                  style={{ opacity: canGoNext ? 1 : 0.6, cursor: canGoNext ? "pointer" : "not-allowed" }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
