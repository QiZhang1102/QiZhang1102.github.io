# Data sources and actual acquisition status

Access date: 2026-11-09. Candidate claims below are distinct from acquired and cleaned observations. No sources are pooled.

| Source | Published/repository claim | Acquired table | Primary inclusion |
|---|---|---|---|
| A: DOI 10.1155/er/2400202 | 662 entries, 47 publications | No experimental table; linked GitHub repository/file returned404 | Not admitted |
| B: DOI 10.1039/D6GC01753C | 3,880 postprocessed literature-extracted points | No original table; publisher blocked403 | Not admitted |
| Predecessor: DOI 10.1021/jacsau.5c01087 | LLM literature-extraction study | XLSX4,286 rows,52 columns;383 opaque filenames, not verified source-paper IDs | Not admitted: no DOI mapping; unit/label extraction issues |
| Wang-Group modifier workbook | README237 points,33 selected of59 screened papers | Sheet1:322 rows after header,26 columns | 86 distinct eligible recorded conditions / 22 DOI groups /4 classes |
| fengwangli/co2rr_database | Experimental efficiency datapage | Product/performance/reference CSV downloaded | Not admitted: catalyst absent, pre-outcome conditions insufficient |
| hpaalv/CO2RR_LLM_Extract | Sentence-level LLM extraction corpus | 56,753 raw extraction rows;96,292 expanded entity rows | Not experiments; not admitted |

## Primary raw source: verified fallback

Repository: https://github.com/Wang-Group/Cu-CO2RR_modifiers

Related original paper, verified by Crossref exact DOI metadata: Xinru He et al., *Uncovering the influence of the modifier redox potential on CO2 reduction through combined data-driven machine learning and hypothesis-driven experimentation*. Journal of Materials Chemistry A11 (2023),18106–18114. https://doi.org/10.1039/D3TA03115B. This identity does not imply we reproduced its original delta-FE classification target.

Immutable repository commit observed: `b9c7f420fed238cca9e1e3ac3e4010b09bd68ce9`. The downloadable workbook is pinned to that commit:

https://raw.githubusercontent.com/Wang-Group/Cu-CO2RR_modifiers/b9c7f420fed238cca9e1e3ac3e4010b09bd68ce9/CO2RRMolecularModification-HXR-20230323.xlsx

Raw filename: `CO2RRMolecularModification-HXR-20230323.xlsx`. Actual bytes:44,842. SHA256:`6b4277e0eb681dee284533854b467089395aa1957681f8ba6a09636e9c552793`. Worksheet:`Sheet1`. The workbook is not modified by any pipeline step. `scripts/download_data.py` downloads it once, verifies the exact hash, and verifies cached contents on subsequent runs. A changed file fails rather than silently replacing the research input.

The separately downloaded author-processed CSV has241 rows and29 columns; SHA256:`e269d006ac5a9ba3853d394151b85b7b6f8f42a49ef3543067e21118fac3335e`. Its different representations and extra100-row JACS dataset do not match the raw workbook row by row. It is evidence for the audit only and does not enter the primary models. The README claim of237 points is not reused as an acquired or cleaned count.

Actual primary audit:322 raw worksheet rows →100 eligible candidates before duplicate/class handling →99 distinct full-audit conditions in23 DOI groups →86 primary conditions in22 DOI groups. The primary class set is exactly C2H4,C2H5OH,CH4,CO. The full audit additionally contains CH3CO2H and HCOOH, excluded by the frozen minimum10 records and3 DOI groups per class. See `data/processed/class_coverage.csv` for exact row/study counts, and `exclusions.csv` for every excluded raw row.

Every admitted study ID is an explicit DOI from an original citation block (or explicit Nature article URL), not a guessed author/condition group. Workbook reference header rows and numbered source-block markers support continuation; each continued record keeps its original citation header row. Citations lacking DOI are conservatively excluded. Combined independent checks verified19 of23 full-audit DOI records through Crossref metadata; the remaining4 resolve HTTP302 via doi.org to expected publisher article URLs while Crossref was rate-limited. This verifies source identifier resolution, not all original experimental measurements. Evidence: `combined_study_doi_verification.json`, with individual attempt logs retained.

Repository metadata explicitly declares Apache-2.0, and its full LICENSE was downloaded to `docs/source_wang_license.txt`. This is a repository license declaration; rights in all underlying published measurements were not independently adjudicated. Default delivery excludes the raw workbook and raw/processed measurement tables from the distributable archive, and supplies pinned retrieval/cleaning code, audit statistics, split/prediction results and reports. The user can reproduce locally from the public source.

## Candidates A/B and bounded retrieval failures

A: https://doi.org/10.1155/er/2400202. Publisher identity and article-reported662/47 are verified. Linked repository https://github.com/alpertap74/CO2-electrolyzer_2003_2025 and raw main/master workbook returned404. Publisher data availability says corresponding author on reasonable request. Public repository searches/user repository listing, Figshare resource-DOI lookup, OpenAlex locations and archive probing yielded no data table. Dataset SHA256, worksheet and actual usable count are not applicable. Article CC-BY-4.0 does not establish a separate unavailable-dataset license. Full evidence: `source_a.md` and `source_a_evidence/`.

B: https://doi.org/10.1039/D6GC01753C. Crossref/OpenAlex metadata verifies Farris,Meckstroth,Leonard, *Interpretable, low-compute machine learning integrating experimental and catalytic descriptors for sustainable CO2 electroreduction*, Green Chemistry2026. 3,880 is a publisher claim; table schema and actual counts are unverified. Publisher landing/HTML/PDF/author-version requests hit403. Guessed SI paths are explicitly guesses, not real download links. Crossref lists article CC-BY-NC3.0; no acquired original table license can be asserted. Full evidence: `source_b.md` and `source_b_evidence/`.

Verified predecessor Farris/Leonard, *Accelerating Catalysis Understanding via Large Language Model Data Extraction and Shallow Machine Learning Techniques*, JACS Au5(11),5578–5589(2025), https://doi.org/10.1021/jacsau.5c01087: actual XLSX https://ndownloader.figshare.com/files/58928814,592,423 bytes,SHA256`ab56da9b5823ff045d80a84d17a076f78df1a1b05e724e2ef39211a8614fdf0a`,Sheet1. SI metadata declares CC-BY-NC4.0. Opaque `pdfs_N.pdf` filenames lack a citation map and can recur across annual extraction batches. The source cannot meet true-paper grouping requirements; no model treats383 filenames as383 verified studies.

## Other alternatives screened

- https://github.com/fengwangli/co2rr_database: `resources/data/co2rr.csv`,SHA256`a84f81abfa466cfe280b81c053a4f6304bbdc99f112c6d275d3b40db279ea3ef`; repositoryGPL-3.0. Product,year,FE,current,full/cathode potential,reference scale,stability,reference. No catalyst and no verified usable pre-outcome condition feature set; not admitted.
- https://github.com/hpaalv/CO2RR_LLM_Extract: `extractions.zip`,22,892,420bytes,SHA256`234cf883d8883b08b7ef9abfb41a0b6fe9643bc85cba76597687eb8329ed9bdc`; repositoryMIT. Raw file contains sentence/context/entity outputs with opaqueFILE identifiers and no DOI map; expanded entity rows lose source file_name. First example joins mixtureCO/H2 FE with generic thermodynamic onset text. Entity rows are not independent experiments and are excluded.
- cxqwindy/fuyun-cas CO2 reduction electrocatalyst repositories expose NLP training/extraction corpora rather than an admitted complete experiment table; jiajun-xmu/ML-CO2RR data has generic feature/sample names without product/source meaning. No calculated adsorption-energy database is substituted for experimental FE data.

## Provenance limits

The fallback changes scientific scope to organic-modified copper representations in a source workbook. It does not establish broad CO2RR catalyst generalization, experimentally confirmed negative products, complete product distributions, or independently checked extraction correctness. Absence of exactly repeated modifier+recorded-condition inputs across different DOIs was checked (zero matches); unreported conditions, equivalent SMILES and reused original measurements can still conceal overlap. See `data_audit.md`, `feature_policy.csv` and the report for target/feature restrictions.
