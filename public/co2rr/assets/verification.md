# Executed verification

All reported values originate from actual public-input processing and saved outer predictions. The main engine ran75fits/2146prediction rows without fit warnings. Ten actual-output unittest checks passed (results/tests.log); this is not a toy/synthetic smoke test. Their raw trace/labels, leakage/feature/probability invariants and independently recomputed metrics cover the principal scientific failure modes.

A separate fresh result directory reproduced46substantive result files and all6figures byte for byte, including probabilities/bootstrap estimates;75fitting-provenance entries matched after elapsed times were removed. Evidence:results/reproduction_check.json.

The distributable archive was also extracted into a separate project directory without the raw workbook or full curated measurement tables. The exact README one-command entry downloaded the pinned44,842-byte workbook, recreated inputs, fitted the full benchmark, recomputed analyses, ran all10tests and regenerated reports. All6stages returned0. Five archived reference files (splits,predictions,metrics,paired comparisons,matched calibration metrics) were SHA256-identical. Evidence:results/package_reproduction_check.json and package_reproduction_tests.log.

Validated runtime:Linux,Python3.12.14, CPU, package versions pinned in requirements.txt and results/environment.json. Exact cross-platform byte equality is not asserted. Git/source data were not published; original measurement tables are retrieved rather than redistributed.
