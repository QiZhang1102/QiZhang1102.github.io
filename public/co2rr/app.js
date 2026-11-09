const asset = (path) => new URL(`./assets/${path}`, import.meta.url).href;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const fmt = (number, places = 3) => Number(number).toFixed(places);
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const names = {majority:'Majority baseline',logistic_regression:'Logistic regression',random_forest:'Random forest',hist_gradient_boosting:'Gradient boosting'};
const products = {C2H4:'C₂H₄',C2H5OH:'C₂H₅OH',CH4:'CH₄',CO:'CO',CH3CO2H:'CH₃CO₂H',HCOOH:'HCOOH'};
const models = ['logistic_regression','random_forest','hist_gradient_boosting','majority'];
const state = {protocol:'study',feature:'combined',metric:'macro_f1',curve:'reliability'};

export function getMetricRows(data, protocol, feature) {
  return models.map((model) => data.metrics.find((row) => row.split===protocol && row.model===model && row.feature_set===(model==='majority'?'none':feature) && row.calibration==='uncalibrated')).filter(Boolean);
}
export function matchedCalibration(data, model) {
  return data.calibration_matched_metrics.filter((row) => row.split==='study' && row.model===model);
}

function setPressed(selector, activeAttribute, value) {
  $$(selector).forEach((button) => button.setAttribute('aria-pressed',String(button.getAttribute(activeAttribute)===value)));
}
function renderData(data) {
  const full = data.full_class_coverage;
  const cohort = full.filter((row) => row.main_eligible===true || row.main_eligible==='True');
  $('#class-bars').innerHTML = cohort.map((row) => `<div class="class-row"><span class="class-name">${products[row.target]||escapeHTML(row.target)}</span><div class="bar-track"><span class="bar-fill" style="--value:${row.n_records/42*100}%"></span></div><strong>${row.n_records}</strong><small>${row.n_studies} DOIs</small></div>`).join('');
  $('#full-class-coverage').innerHTML = full.map((row) => `<tr><th scope="row">${products[row.target]||escapeHTML(row.target)}</th><td>${row.n_records}</td><td>${row.n_studies}</td><td>${row.main_eligible===true||row.main_eligible==='True'?'Included':'Outside primary rule'}</td></tr>`).join('');
  const reasons={source_citation_has_no_explicit_doi:'Citation without an explicit DOI',bare_copper_control:'Bare copper control',modifier_not_lexically_parseable_smiles_representation:'Modifier representation not deterministically parseable',no_modifier_record_or_source_note:'Source note or absent modifier',class_has_fewer_than_10_records_or_3_doi_groups:'Class below primary coverage rule',fewer_than_two_explicit_numeric_carbon_species:'Fewer than two reported carbon species',nonpositive_or_tied_maximum_reported_carbon_fe:'Nonpositive or tied FE maximum',same_recorded_condition_same_label_duplicate_collapsed:'Consistent duplicate collapsed'};
  $('#exclusion-ledger').innerHTML=Object.entries(data.exclusion_counts).map(([key,value])=>`<div class="ledger-row"><span>${reasons[key]||escapeHTML(key.replaceAll('_',' '))}</span><strong>${value}</strong></div>`).join('');
}
function renderResults(data) {
  const rows=getMetricRows(data,state.protocol,state.feature);
  const label={macro_f1:'macro-F1',accuracy:'accuracy',equal_study_macro_f1:'equal-study macro-F1',equal_study_accuracy:'equal-study accuracy'}[state.metric];
  $('#results-chart').innerHTML=rows.map((row)=>{
    const value=row[state.metric];
    const lo=row[state.metric+'_ci_low'],hi=row[state.metric+'_ci_high'];
    const hasCI=Number.isFinite(lo)&&Number.isFinite(hi);
    return `<div class="model-row"><div class="model-info"><strong>${names[row.model]}</strong><small>${row.model==='majority'?'Feature-independent reference':{combined:'Modifier + conditions',catalyst:'Modifier information',conditions:'Experimental conditions'}[state.feature]}</small></div><div class="result-track" role="img" aria-label="${names[row.model]} ${label}: ${fmt(value)}${hasCI?`, 95 percent source-bootstrap interval ${fmt(lo)} to ${fmt(hi)}`:''}"><span class="result-fill ${row.model==='majority'?'baseline-fill':''}" style="--value:${value*100}%"></span>${hasCI?`<span class="ci-range" style="left:${lo*100}%;width:${(hi-lo)*100}%"></span>`:''}</div><div class="result-value"><strong>${fmt(value)}</strong>${hasCI?`<small>${fmt(lo)}–${fmt(hi)}</small>`:''}</div></div>`;
  }).join('');
  $('#result-caption').textContent=`${state.protocol==='study'?'Paper-disjoint':'Random condition-grouped'} outer predictions · ${label}.${['macro_f1','accuracy'].includes(state.metric)?' Lines show 95% DOI-cluster bootstrap intervals.':' Each source has equal total weight in the global confusion matrix.'}`;
  $('#result-table').innerHTML=rows.map((row)=>`<tr><th scope="row">${names[row.model]}</th>${['macro_f1','accuracy','equal_study_macro_f1','log_loss','brier'].map((key)=>`<td>${fmt(row[key])}</td>`).join('')}</tr>`).join('');
  $('#ablation-table').innerHTML=models.filter((model)=>model!=='majority').map((model)=>`<tr><th scope="row">${names[model]}</th>${['catalyst','conditions','combined'].map((feature)=>`<td>${fmt(getMetricRows(data,state.protocol,feature).find((row)=>row.model===model).macro_f1)}</td>`).join('')}</tr>`).join('');
  const pairs=data.paired_comparisons.filter((row)=>row.split===state.protocol&&row.left_calibration==='uncalibrated'&&row.right_model===row.model&&row.right_feature_set==='catalyst');
  $('#ablation-pairs').innerHTML='<p class="caption">Combined minus modifier-only macro-F1 · paired source-bootstrap contrasts</p>'+pairs.map((row)=>`<div class="pair-note"><span>${names[row.model]}</span><strong>${row.delta_macro_f1>0?'+':''}${fmt(row.delta_macro_f1)}</strong><small>95% interval ${fmt(row.ci_low)} to ${fmt(row.ci_high)}</small></div>`).join('');
  renderClasses(data);
}
function renderClasses(data) {
  const model=$('#class-model').value;
  const rows=data.per_class.filter((row)=>row.split===state.protocol&&row.model===model&&row.feature_set==='combined'&&row.calibration==='uncalibrated');
  $('#class-table').innerHTML=rows.map((row)=>`<tr><th scope="row">${products[row.class]||escapeHTML(row.class)}</th><td>${row.n_records} / ${row.n_studies}</td><td>${fmt(row.precision)}</td><td><span class="recall-number">${fmt(row.recall)}</span><span class="micro-track"><i style="width:${row.recall*100}%"></i></span></td><td>${fmt(row.f1)}</td></tr>`).join('');
}
function renderSubgroups(data) {
  const group=$('#subgroup-select').value;
  const rows=data.subgroup_errors.filter((row)=>row.split==='study'&&row.model==='random_forest'&&row.feature_set==='combined'&&row.calibration==='uncalibrated'&&row.subgroup_variable===group);
  const friendly={none:'No input missing',polymer_category:'Polymer category missing',potential_rhe_v:'Potential missing','potential_rhe_v,reactor':'Potential + reactor missing',nonpolymer:'Nonpolymer',polymer:'Polymer',missing:'Not recorded'};
  $('#subgroup-table').innerHTML=rows.map((row)=>`<tr><th scope="row">${friendly[row.subgroup]||escapeHTML(row.subgroup)}</th><td>${row.n_records}</td><td>${row.n_studies}</td><td>${fmt(row.accuracy)}</td><td>${fmt(row.log_loss)}</td><td>${fmt(row.brier)}</td></tr>`).join('');
}
function renderCalibration(data) {
  const model=$('#calibration-model').value;
  const matched=matchedCalibration(data,model);
  const raw=matched.find((row)=>row.calibration==='uncalibrated_matched');
  const calibrated=matched.find((row)=>row.calibration==='sigmoid');
  $('#calibration-comparison').innerHTML=[['log_loss','Log loss','Lower is better'],['brier','Multiclass Brier','Lower is better'],['macro_f1','Macro-F1','Higher is better']].map(([key,label,note])=>`<div class="cal-metric"><div class="cal-label"><strong>${label}</strong><small>${note}</small></div><div class="cal-value"><span>Raw</span><strong>${fmt(raw[key])}</strong></div><span class="cal-arrow" aria-hidden="true">→</span><div class="cal-value calibrated"><span>Sigmoid</span><strong>${fmt(calibrated[key])}</strong></div></div>`).join('');
}
function renderProbabilityTables(data) {
  $('#full-probability-table').innerHTML=data.metrics.filter((row)=>row.split==='study'&&row.feature_set==='combined'&&row.calibration==='uncalibrated').map((row)=>`<tr><th scope="row">${names[row.model]}</th><td>${fmt(row.log_loss)}</td><td>${fmt(row.brier)}</td><td>${fmt(row.macro_f1)}</td></tr>`).join('');
  $('#matched-probability-table').innerHTML=data.calibration_matched_metrics.filter((row)=>row.split==='study').map((row)=>`<tr><th scope="row">${names[row.model]}</th><td>${row.calibration==='sigmoid'?'Sigmoid':'Raw · matched'}</td><td>${fmt(row.log_loss)}</td><td>${fmt(row.brier)}</td><td>${fmt(row.macro_f1)}</td></tr>`).join('');
}
function renderCurve(data) {
  const model=$('#curve-model').value;
  const table=state.curve==='reliability'?data.reliability_bins:data.risk_coverage;
  const points=table.filter((row)=>row.split==='study'&&row.model===model&&row.feature_set==='combined'&&row.calibration==='uncalibrated').sort((a,b)=>(state.curve==='reliability'?a.confidence-b.confidence:a.coverage-b.coverage));
  const width=820,height=330,left=60,right=26,top=20,bottom=48;
  const x=(value)=>left+value*(width-left-right),y=(value)=>height-bottom-value*(height-top-bottom);
  const xKey=state.curve==='reliability'?'confidence':'coverage';
  const yKey='accuracy';
  const ticks=[0,.25,.5,.75,1];
  const grid=ticks.map((v)=>`<line x1="${left}" x2="${width-right}" y1="${y(v)}" y2="${y(v)}" class="svg-grid"/><text x="${left-13}" y="${y(v)+4}" text-anchor="end" class="svg-label">${v.toFixed(2)}</text><text x="${x(v)}" y="${height-25}" text-anchor="middle" class="svg-label">${v.toFixed(2)}</text>`).join('');
  const path=points.map((p,i)=>`${i?'L':'M'}${x(p[xKey]).toFixed(2)},${y(p[yKey]).toFixed(2)}`).join(' ');
  $('#reliability-curve').innerHTML=`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${names[model]}: ${state.curve==='reliability'?'top-label reliability':'confidence–coverage accuracy'} on held-out papers"><title>${names[model]} held-out-paper outer predictions</title>${grid}${state.curve==='reliability'?`<path d="M${x(0)},${y(0)} L${x(1)},${y(1)}" class="svg-reference"/>`:''}<path d="${path}" class="svg-curve"/>${points.map((p)=>`<circle cx="${x(p[xKey])}" cy="${y(p[yKey])}" r="${state.curve==='reliability'?Math.min(9,3+Math.sqrt(p.n_records)/2):3.5}" class="svg-point"><title>${state.curve==='reliability'?'Confidence':'Coverage'} ${fmt(p[xKey])}; accuracy ${fmt(p.accuracy)}; ${p.n_records} records, ${p.n_studies} DOI groups</title></circle>`).join('')}<text x="${(left+width-right)/2}" y="${height-4}" text-anchor="middle" class="svg-axis-label">${state.curve==='reliability'?'Mean top-label confidence':'Retained record coverage'}</text><text x="15" y="${height/2}" transform="rotate(-90 15 ${height/2})" text-anchor="middle" class="svg-axis-label">Observed accuracy</text></svg>`;
  $('#curve-caption').textContent=state.curve==='reliability'?'Full 86-record cohort · uncalibrated, combined features · ten fixed confidence bins. Point size reflects record count; the dashed diagonal indicates agreement between confidence and accuracy.':'Full 86-record cohort · uncalibrated, combined features · predictions retained by descending confidence with ties kept together. This is an exploratory outer-test curve; no operational threshold was selected.';
}
const figures=[['data_coverage.png','Data coverage','Class support and concentration across source-paper DOI groups.'],['split_comparison.png','Evaluation protocols','Combined-feature models and the majority baseline, with source-bootstrap intervals.'],['model_feature_comparison.png','Feature experiments','All fixed model and feature combinations under both protocols.'],['confusion_matrix.png','Product-level errors','Random forest, combined features, held-out-paper confusion matrix.'],['reliability_risk.png','Reliability & coverage','Full-cohort uncalibrated reliability and exploratory coverage curves.'],['calibration_matched_subsets.png','Matched calibration','Raw and sigmoid reliability on identical eligible record subsets.']];
function renderFigures() {
  $('#figure-gallery').innerHTML=figures.map(([file,title,caption],index)=>`<article class="figure-item"><button type="button" class="figure-open" data-figure="${index}" aria-label="Open full-resolution figure: ${title}"><div class="figure-image"><img src="${asset('figures/'+file)}" alt="${caption}" loading="lazy" width="1000" height="600"><span class="figure-expand" aria-hidden="true">↗</span></div></button><div class="figure-caption"><span class="mono-label">FIGURE ${String(index+1).padStart(2,'0')}</span><h3>${title}</h3><p>${caption}</p><a href="${asset('figures/'+file)}" download>Download PNG ↓</a></div></article>`).join('');
  $$('.figure-open').forEach((button)=>button.addEventListener('click',()=>{
    const [file,title,caption]=figures[Number(button.dataset.figure)];
    $('#dialog-image').src=asset('figures/'+file);$('#dialog-image').alt=caption;$('#dialog-caption').textContent=title+' — '+caption;$('#dialog-download').href=asset('figures/'+file);$('#figure-dialog').showModal();
  }));
}
function initializeNavigation() {
  const toggle=$('#menu-toggle');const nav=$('#site-nav');
  toggle.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('is-open',open);
  });
  $$('#site-nav a').forEach((a)=>a.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}));
  if(typeof IntersectionObserver!=='undefined'){
    const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){$$('#site-nav a').forEach((a)=>a.classList.toggle('is-active',a.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-20% 0px -65% 0px'});
    $$('main section[id]').forEach((section)=>observer.observe(section));
  }
}
function initializeActions(data) {
  $$('[data-protocol]').forEach((button)=>button.addEventListener('click',()=>{state.protocol=button.dataset.protocol;setPressed('[data-protocol]','data-protocol',state.protocol);renderResults(data);}));
  $$('[data-feature]').forEach((button)=>button.addEventListener('click',()=>{state.feature=button.dataset.feature;setPressed('[data-feature]','data-feature',state.feature);renderResults(data);}));
  $('#metric-select').addEventListener('change',(event)=>{state.metric=event.target.value;renderResults(data);});
  $('#class-model').addEventListener('change',()=>renderClasses(data));
  $('#calibration-model').addEventListener('change',()=>renderCalibration(data));
  $('#subgroup-select').addEventListener('change',()=>renderSubgroups(data));
  $$('[data-curve]').forEach((button)=>button.addEventListener('click',()=>{state.curve=button.dataset.curve;setPressed('[data-curve]','data-curve',state.curve);renderCurve(data);}));
  $('#curve-model').addEventListener('change',()=>renderCurve(data));
  $('#table-toggle').addEventListener('click',()=>{const button=$('#table-toggle');const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));$('#result-table-wrap').hidden=!open;button.innerHTML=open?'Hide exact values <span aria-hidden="true">−</span>':'View exact values <span aria-hidden="true">+</span>';});
  $('#figure-close').addEventListener('click',()=>$('#figure-dialog').close());
  $('#figure-dialog').addEventListener('click',(event)=>{if(event.target===$('#figure-dialog'))$('#figure-dialog').close();});
  $('#copy-command').addEventListener('click',async()=>{
    const command='python -m pip install -r requirements.txt\npython scripts/reproduce.py';
    const toast=$('#toast');
    try {await navigator.clipboard.writeText(command);toast.textContent='Reproduction commands copied.';$('#copy-command').innerHTML='Copied <span aria-hidden="true">✓</span>';}
    catch {toast.textContent='Select and copy the commands shown in the code block.';}
    toast.classList.add('is-visible');setTimeout(()=>{toast.classList.remove('is-visible');$('#copy-command').innerHTML='Copy commands <span aria-hidden="true">⧉</span>';},2500);
  });
}
export async function init() {
  initializeNavigation();
  const response=await fetch(asset('research-data.json'));
  if(!response.ok)throw new Error('The research data file could not be loaded.');
  const data=await response.json();
  renderData(data);renderResults(data);renderSubgroups(data);renderCalibration(data);renderProbabilityTables(data);renderCurve(data);renderFigures();initializeActions(data);
  document.documentElement.classList.add('data-ready');
  return data;
}
export const ready=init().catch((error)=>{
  console.error(error);
  $('#results-chart').innerHTML='<p class="data-error">The interactive data could not be loaded. <a href="./assets/report.pdf">Open the full report</a> to inspect all saved results.</p>';
  throw error;
});
