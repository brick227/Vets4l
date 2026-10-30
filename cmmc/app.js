/* V4L CMMC Readiness: app.js
   Vanilla JS, no dependencies. Reads window.CMMC_DATA (data.js), keeps the
   assessment in localStorage, and renders five views:
   Cockpit, Control Library, POA&M, Findings, Roadmap. */
"use strict";

const DATA = window.CMMC_DATA;
const STORE_KEY = "v4l-cmmc-readiness-v1";

/* ---------- statuses ---------- */
const STATUS = {
  unassessed: { label: "Not assessed", cls: "unassessed" },
  met:        { label: "Met",          cls: "met" },
  partial:    { label: "Partial",      cls: "partial" },
  notmet:     { label: "Not met",      cls: "notmet" },
  na:         { label: "N/A",          cls: "na" }
};
/* Click order for a status pill. */
const CYCLE = ["unassessed", "met", "partial", "notmet", "na"];
/* Letters used by the sample statuses in data.js. */
const SAMPLE_CODE = { M: "met", P: "partial", N: "notmet", A: "na", "-": "unassessed" };
const STACK_ORDER = ["met", "partial", "notmet", "na", "unassessed"];

const CONTROLS = DATA.controls;
const BY_ID = Object.fromEntries(CONTROLS.map(c => [c.id, c]));
const FAMILY = Object.fromEntries(DATA.families.map(f => [f.code, f.name]));

/* ---------- helpers ---------- */
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
const identifier = c => `${c.fam}.L2-${c.id}`;
const points = c => (c.type === "Basic" ? 5 : 1);
/* Local calendar date (toISOString would shift to UTC and can land a day off). */
function localDate(d) {
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return localDate(d);
}
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* ---------- state ---------- */
function sampleState() {
  const statuses = {};
  const docs = {};
  for (const fam of DATA.families) {
    const letters = DATA.sample.statuses[fam.code] || "";
    CONTROLS.filter(c => c.fam === fam.code).forEach((c, i) => {
      statuses[c.id] = SAMPLE_CODE[letters[i]] || "unassessed";
      // Demo evidence documents: two for Met, one for Partial.
      docs[c.id] = statuses[c.id] === "met" ? 2 : statuses[c.id] === "partial" ? 1 : 0;
    });
  }
  return { mode: "sample", client: DATA.sample.client, statuses, docs };
}
function blankState() {
  const statuses = {};
  const docs = {};
  CONTROLS.forEach(c => { statuses[c.id] = "unassessed"; docs[c.id] = 0; });
  return { mode: "blank", client: "New assessment", statuses, docs };
}
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved && saved.statuses) return normalize(saved);
  } catch (err) { /* storage blocked or corrupt: fall back to the sample */ }
  return sampleState();
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  catch (err) { /* private window or blocked storage: keep working in memory */ }
}
/* Keep only known control IDs and valid statuses.
   Modes: sample (untouched demo), edited (demo with changes), blank, imported. */
const MODES = ["sample", "edited", "blank", "imported"];
function normalize(s) {
  const out = blankState();
  out.mode = MODES.includes(s.mode) ? s.mode : "imported";
  out.client = typeof s.client === "string" && s.client.trim() ? s.client.trim().slice(0, 80) : out.client;
  for (const c of CONTROLS) {
    if (STATUS[s.statuses?.[c.id]]) out.statuses[c.id] = s.statuses[c.id];
    const n = Number(s.docs?.[c.id]);
    if (Number.isFinite(n) && n >= 0) out.docs[c.id] = Math.floor(n);
  }
  return out;
}
/* Sample findings, owners and the SAMPLE badge belong to demo-based assessments only. */
const isSample = () => state.mode === "sample" || state.mode === "edited";

let state = loadState();
const ui = { view: "cockpit", search: "", fam: "", status: "", open: new Set(), focus: null };

/* ---------- scoring ---------- */
function tally() {
  const counts = { met: 0, partial: 0, notmet: 0, na: 0, unassessed: 0 };
  let deduction = 0;
  for (const c of CONTROLS) {
    const s = state.statuses[c.id];
    counts[s]++;
    // Simplified SPRS: every requirement not Met loses its points; N/A is excluded.
    if (s !== "met" && s !== "na") deduction += points(c);
  }
  return { counts, sprs: 110 - deduction };
}
const findingsFor = id => (isSample() ? DATA.sample.findings : []).filter(f => f.controls.includes(id));
const evidenceCount = id => (state.docs[id] || 0) + findingsFor(id).length;
const ownerFor = c => (isSample() ? DATA.sample.owners[c.fam] : "") || "—";
function automationFor(c) {
  return DATA.automation.byControl[c.id] || DATA.automation.byFamily[c.fam] || { source: "—", method: "—" };
}
const unmet = () => CONTROLS
  .filter(c => ["notmet", "partial"].includes(state.statuses[c.id]))
  .sort((a, b) => (a.type === b.type ? 0 : a.type === "Basic" ? -1 : 1));

/* ---------- shared fragments ---------- */
function pill(id, staticPill) {
  const s = STATUS[state.statuses[id]];
  if (staticPill) return `<span class="pill static ${s.cls}">${s.label}</span>`;
  return `<button type="button" class="pill ${s.cls}" data-cycle="${esc(id)}"
    aria-label="${esc(id)} status: ${s.label}. Click to change.">${s.label}</button>`;
}
function stackBar(counts, total) {
  return `<div class="stack" role="img" aria-label="${STACK_ORDER.map(k => `${counts[k]} ${STATUS[k].label}`).join(", ")}">
    ${STACK_ORDER.map(k => counts[k] ? `<span class="bg-${STATUS[k].cls}" style="width:${(counts[k] / total) * 100}%"></span>` : "").join("")}
  </div>`;
}
function legend(counts) {
  return `<div class="legend">${STACK_ORDER.map(k =>
    `<span><i class="bg-${STATUS[k].cls}"></i>${STATUS[k].label} ${counts ? `<b class="mono">${counts[k]}</b>` : ""}</span>`).join("")}</div>`;
}

/* ---------- views ---------- */
function viewCockpit() {
  const { counts, sprs } = tally();
  const fams = DATA.families.map(f => {
    const list = CONTROLS.filter(c => c.fam === f.code);
    const met = list.filter(c => state.statuses[c.id] === "met").length;
    return `<button type="button" class="fam" data-fam="${f.code}"
        aria-label="${f.name}: ${met} of ${list.length} met. Show in control library.">
      <div class="fam-top"><span class="fam-code">${f.code}</span><span class="fam-score">${met}/${list.length}</span></div>
      <div class="fam-name">${esc(f.name)}</div>
      <div class="squares" aria-hidden="true">${list.map(c =>
        `<i class="bg-${STATUS[state.statuses[c.id]].cls}" title="${c.id} · ${STATUS[state.statuses[c.id]].label}"></i>`).join("")}</div>
    </button>`;
  }).join("");

  const fixList = unmet();
  const fix = fixList.length
    ? `<ul class="fix">${fixList.slice(0, 10).map(c => `<li><button type="button" data-goto="${c.id}">
        <span class="fix-id">${c.id}</span><span class="fix-req">${esc(c.req)}</span>
        <span class="fix-pts">−${points(c)}</span></button></li>`).join("")}</ul>
       ${fixList.length > 10 ? `<p class="note">+ ${fixList.length - 10} more on the POA&amp;M.</p>` : ""}`
    : counts.unassessed
      ? `<p class="fix-empty">No gaps recorded yet. ${counts.unassessed} requirement${counts.unassessed === 1 ? "" : "s"} still to assess in the control library.</p>`
      : `<p class="fix-empty">No open gaps. Every requirement is Met or N/A.</p>`;

  return `
    <div class="view-head"><h2>Readiness cockpit</h2><p>CMMC Level 2 · 110 requirements · 14 families</p></div>
    <section class="kpis" aria-label="Key numbers">
      <div class="kpi met"><div class="label">Requirements met</div>
        <div class="value">${counts.met}<small> / 110</small></div>
        ${stackBar(counts, 110)}${legend(counts)}</div>
      <div class="kpi sprs"><div class="label">SPRS estimate</div><div class="value">${sprs}</div>
        <div class="hint">Simplified estimate (max 110)</div></div>
      <div class="kpi gaps"><div class="label">Open gaps</div><div class="value">${counts.notmet}</div><div class="hint">Not met</div></div>
      <div class="kpi partial"><div class="label">Partial</div><div class="value">${counts.partial}</div><div class="hint">Counted as not met</div></div>
      <div class="kpi"><div class="label">Not assessed</div><div class="value">${counts.unassessed}</div><div class="hint">Still to review</div></div>
    </section>
    <div class="cockpit-grid">
      <section class="card"><h2>Family map <span class="sub">One square per requirement · click a family to filter</span></h2>
        <div class="families">${fams}</div>${legend()}</section>
      <section class="card"><h2>Fix first <span class="sub">Basic before Derived</span></h2>${fix}</section>
    </div>`;
}

function filteredControls() {
  const q = ui.search.trim().toLowerCase();
  return CONTROLS.filter(c =>
    (!ui.fam || c.fam === ui.fam) &&
    (!ui.status || state.statuses[c.id] === ui.status) &&
    (!q || c.id.includes(q) || identifier(c).toLowerCase().includes(q) || c.req.toLowerCase().includes(q)));
}

function viewLibrary() {
  const rows = filteredControls();
  const body = rows.length ? rows.map(c => {
    const open = ui.open.has(c.id);
    const a = automationFor(c);
    const f = findingsFor(c.id);
    return `<tr id="row-${c.id}" class="${open ? "open" : ""}">
        <td class="id" data-label="ID">${c.id}</td>
        <td data-label="Family"><span class="mono">${c.fam}</span></td>
        <td data-label="Type"><span class="tag ${c.type === "Basic" ? "basic" : ""}">${c.type}</span></td>
        <td data-label="Requirement"><button type="button" class="expander" data-toggle="${c.id}" aria-expanded="${open}">${esc(c.req)}</button></td>
        <td data-label="Status">${pill(c.id)}</td>
        <td class="num" data-label="Evidence">${evidenceCount(c.id)}</td>
        <td data-label="Owner">${esc(ownerFor(c))}</td>
      </tr>${open ? `<tr class="detail"><td colspan="7"><div class="detail-grid">
        <div><b>Identifier</b><span class="mono">${identifier(c)}</span></div>
        <div><b>Data source</b>${esc(a.source)}</div>
        <div><b>Automation method</b>${esc(a.method)}</div>
        <div><b>Scan findings</b>${f.length ? f.map(x => `${x.id} (${x.severity})`).join(", ") : "None mapped"}</div>
        </div>${DATA.automation.isSample ? `<p class="sample-note">Data source and automation method are sample values until the automation map is loaded.</p>` : ""}</td></tr>` : ""}`;
  }).join("") : `<tr><td colspan="7" class="empty">No requirements match these filters.</td></tr>`;

  return `
    <div class="view-head"><h2>Control library</h2><p>Click a status to cycle it · click a requirement for details</p></div>
    <div class="filters" role="search">
      <label class="sr-only" for="q">Search requirements</label>
      <input id="q" type="search" placeholder="Search ID or requirement text" value="${esc(ui.search)}">
      <label class="sr-only" for="famSel">Family</label>
      <select id="famSel"><option value="">All families</option>${DATA.families.map(f =>
        `<option value="${f.code}" ${ui.fam === f.code ? "selected" : ""}>${f.code} · ${esc(f.name)}</option>`).join("")}</select>
      <label class="sr-only" for="statusSel">Status</label>
      <select id="statusSel"><option value="">All statuses</option>${CYCLE.map(k =>
        `<option value="${k}" ${ui.status === k ? "selected" : ""}>${STATUS[k].label}</option>`).join("")}</select>
      <span class="shown">${rows.length} of 110</span>
    </div>
    <div class="table-wrap"><table>
      <thead><tr><th>ID</th><th>Family</th><th>Type</th><th>Requirement</th><th>Status</th><th>Evidence</th><th>Owner</th></tr></thead>
      <tbody>${body}</tbody></table></div>`;
}

function poamRows() {
  return unmet().map(c => ({
    id: c.id,
    weakness: `${state.statuses[c.id] === "partial" ? "Partially implemented" : "Not implemented"}: ${c.req}`,
    points: points(c),
    target: addDays(c.type === "Basic" ? 30 : 90),
    status: STATUS[state.statuses[c.id]].label
  }));
}
function viewPoam() {
  const rows = poamRows();
  const total = rows.reduce((n, r) => n + r.points, 0);
  return `
    <div class="view-head"><h2>POA&amp;M draft</h2>
      <p>${rows.length} items · ${total} points at stake · Basic due in 30 days, Derived in 90</p></div>
    <div class="filters"><button class="btn primary" id="btnCopy" type="button" ${rows.length ? "" : "disabled"}>Copy as table</button>
      <span class="shown">Pastes into Excel, Word or email as a table</span></div>
    <div class="table-wrap"><table>
      <thead><tr><th>ID</th><th>Weakness</th><th>Points</th><th>Target date</th><th>Status</th></tr></thead>
      <tbody>${rows.length ? rows.map(r => `<tr>
        <td class="id" data-label="ID"><button type="button" class="linkish" data-goto="${r.id}">${r.id}</button></td>
        <td data-label="Weakness">${esc(r.weakness)}</td>
        <td class="num" data-label="Points">${r.points}</td>
        <td class="mono" data-label="Target date">${r.target}</td>
        <td data-label="Status">${pill(r.id, true)}</td></tr>`).join("")
        : `<tr><td colspan="5" class="empty">Nothing to remediate: no Partial or Not met requirements.</td></tr>`}</tbody>
    </table></div>`;
}

function viewFindings() {
  const list = isSample() ? DATA.sample.findings : [];
  const sevs = ["Critical", "High", "Medium", "Low"];
  const counts = sevs.map(s => `<span class="sev ${s}">${s}: ${list.filter(f => f.severity === s).length}</span>`).join(" ");
  return `
    <div class="view-head"><h2>Findings</h2><p>ACAS scanner findings mapped to controls</p></div>
    ${list.length ? `<div class="filters">${counts}<span class="shown sample-note">Sample findings for the demo client</span></div>` : ""}
    <div class="table-wrap"><table>
      <thead><tr><th>ID</th><th>Finding</th><th>Severity</th><th>Hosts</th><th>Controls</th><th>Evidence</th></tr></thead>
      <tbody>${list.length ? list.map(f => `<tr>
        <td class="id" data-label="ID">${f.id}</td>
        <td data-label="Finding">${esc(f.title)}</td>
        <td data-label="Severity"><span class="sev ${f.severity}">${f.severity}</span></td>
        <td class="num" data-label="Hosts">${f.hosts}</td>
        <td data-label="Controls">${f.controls.map(id => `<button type="button" class="linkish" data-goto="${id}">${id}</button>`).join("")}</td>
        <td data-label="Evidence">${esc(f.evidence)}</td></tr>`).join("")
        : `<tr><td colspan="6" class="empty">No findings loaded. Import ACAS results mapped to control IDs to see them here.</td></tr>`}</tbody>
    </table></div>`;
}

function viewRoadmap() {
  const phases = DATA.sample.roadmap;
  const days = phases.reduce((n, p) => n + p.days, 0);
  const done = Math.round(phases.reduce((n, p) => n + p.days * p.pct, 0) / days);
  return `
    <div class="view-head"><h2>Roadmap</h2><p>${days} days across 4 phases · ${done}% complete overall</p></div>
    <section class="card">
      <div class="road">${phases.map(p => `<div class="seg" style="flex:${p.days}">
        <div class="seg-bar" role="img" aria-label="Phase ${p.phase}, ${esc(p.name)}: ${p.pct}% complete">
          <div class="seg-fill" style="width:${p.pct}%"></div><span>${p.pct}%</span></div>
        <div class="seg-label"><b>Phase ${p.phase} · ${p.days} days</b>${esc(p.name)}</div></div>`).join("")}</div>
      <p class="sample-note">Sample phases and progress until loaded from the Roadmap sheet.</p>
    </section>`;
}

const VIEWS = [
  { id: "cockpit",  label: "Cockpit",         render: viewCockpit },
  { id: "library",  label: "Control library", render: viewLibrary, count: () => 110 },
  { id: "poam",     label: "POA&M",           render: viewPoam,    count: () => unmet().length },
  { id: "findings", label: "Findings",        render: viewFindings, count: () => (isSample() ? DATA.sample.findings.length : 0) },
  { id: "roadmap",  label: "Roadmap",         render: viewRoadmap }
];

/* ---------- render ---------- */
function render() {
  const view = VIEWS.find(v => v.id === ui.view) || VIEWS[0];
  document.getElementById("nav").innerHTML = VIEWS.map(v =>
    `<button type="button" data-view="${v.id}" ${v.id === view.id ? 'aria-current="page"' : ""}>${v.label}${v.count ? `<span class="count">${v.count()}</span>` : ""}</button>`).join("");
  document.getElementById("view").innerHTML = view.render();
  document.getElementById("clientName").textContent = state.client;
  document.getElementById("sampleBadge").hidden = !isSample();
  if (ui.focus) {
    const row = document.getElementById("row-" + ui.focus);
    if (row) { row.classList.add("flash"); row.scrollIntoView({ block: "center" }); }
    ui.focus = null;
  }
}
/* Internal V4L panel: needs internal.js (never published) AND ?internal in the URL. */
function renderOwnership() {
  const o = window.CMMC_INTERNAL?.ownership;
  const wanted = new URLSearchParams(location.search).has("internal");
  if (!o || !wanted) return;
  document.querySelector(".own").hidden = false;
  const rows = [["Bucket", o.bucket], ["Owner", o.owner], ["Assessment lead", o.assessmentLead],
    ["Sustainment owner", o.sustainmentOwner], ["Sprint", o.sprint]];
  document.getElementById("ownership").innerHTML = rows.map(([k, v]) =>
    `<div><dt>${k}</dt><dd class="${/unassigned/i.test(v) ? "unassigned" : ""}">${esc(v)}</dd></div>`).join("");
}
function go(view) {
  ui.view = view;
  try { history.replaceState(null, "", "#" + view); } catch (err) { /* file:// or sandboxed */ }
  render();
  document.getElementById("view").focus({ preventScroll: true });
  window.scrollTo(0, 0);
}
/* Open a control in the library, cleared filters, expanded and highlighted. */
function gotoControl(id) {
  ui.search = ""; ui.fam = ""; ui.status = "";
  ui.open.add(id); ui.focus = id; ui.view = "library";
  try { history.replaceState(null, "", "#library"); } catch (err) { /* ignore */ }
  render();
}

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.view) return go(t.dataset.view);
  if (t.dataset.goto) return gotoControl(t.dataset.goto);
  if (t.dataset.fam) { ui.fam = t.dataset.fam; ui.status = ""; ui.search = ""; return go("library"); }
  if (t.dataset.toggle) {
    const id = t.dataset.toggle;
    ui.open.has(id) ? ui.open.delete(id) : ui.open.add(id);
    return render();
  }
  if (t.dataset.cycle) {
    const id = t.dataset.cycle;
    state.statuses[id] = CYCLE[(CYCLE.indexOf(state.statuses[id]) + 1) % CYCLE.length];
    if (state.mode === "sample") state.mode = "edited";
    saveState();
    render();
    document.querySelector(`[data-cycle="${CSS.escape(id)}"]`)?.focus();
    return;
  }
  if (t.id === "btnCopy") return copyPoam();
});
document.addEventListener("input", e => {
  if (e.target.id === "q") {
    ui.search = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const q = document.getElementById("q");
    q.focus(); q.setSelectionRange(pos, pos);
  }
});
document.addEventListener("change", e => {
  if (e.target.id === "famSel") { ui.fam = e.target.value; render(); }
  if (e.target.id === "statusSel") { ui.status = e.target.value; render(); }
});

document.getElementById("btnBlank").addEventListener("click", () => {
  if (!confirm("Start a blank assessment? All 110 requirements reset to Not assessed. Export first if you want to keep the current one.")) return;
  state = blankState(); ui.open.clear(); saveState(); go("cockpit"); toast("Blank assessment started");
});
document.getElementById("btnSample").addEventListener("click", () => {
  if (state.mode !== "sample" && !confirm("Replace the current assessment with the sample data?")) return;
  state = sampleState(); ui.open.clear(); saveState(); go("cockpit"); toast("Sample data loaded");
});
document.getElementById("btnExport").addEventListener("click", () => {
  const payload = { app: "v4l-cmmc-readiness", version: 1, exported: new Date().toISOString(),
    client: state.client, mode: state.mode, statuses: state.statuses, docs: state.docs };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `cmmc-assessment-${state.client.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${localDate(new Date())}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("Assessment exported");
});
document.getElementById("btnImport").addEventListener("click", () => document.getElementById("importFile").click());
document.getElementById("importFile").addEventListener("change", async e => {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    if (!parsed || typeof parsed.statuses !== "object") throw new Error("missing statuses");
    state = normalize(parsed); ui.open.clear(); saveState(); go("cockpit");
    toast(`Imported ${file.name}`);
  } catch (err) {
    toast("That file isn't a CMMC assessment export");
  }
});

/* Light / dark toggle, remembered per browser. */
const THEME_KEY = "v4l-cmmc-theme";
function applyTheme(t) { if (t) document.documentElement.dataset.theme = t; }
try { applyTheme(localStorage.getItem(THEME_KEY)); } catch (err) { /* ignore */ }
document.getElementById("btnTheme").addEventListener("click", () => {
  const current = document.documentElement.dataset.theme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem(THEME_KEY, next); } catch (err) { /* ignore */ }
});

/* Copy the POA&M as tab-separated rows, which paste as a real table. */
async function copyPoam() {
  const rows = poamRows();
  const tsv = [["ID", "Weakness", "Points", "Target date", "Status"].join("\t"),
    ...rows.map(r => [r.id, r.weakness, r.points, r.target, r.status].join("\t"))].join("\n");
  try {
    await navigator.clipboard.writeText(tsv);
  } catch (err) {
    const ta = document.createElement("textarea");
    ta.value = tsv; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } finally { ta.remove(); }
  }
  toast(`Copied ${rows.length} POA&M rows`);
}

/* ---------- boot ---------- */
renderOwnership();
const start = location.hash.slice(1);
ui.view = VIEWS.some(v => v.id === start) ? start : "cockpit";
render();
