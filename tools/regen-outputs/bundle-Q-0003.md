# Bundle: Q-0003

_Generated 2026-05-03 from `graph/` by `tools/regen.py`._

**Composition:** 210 nodes — 1 seed + 209 expanded (semantic walk; --q-overlap = 1).

## Prompt

You are composing narrative prose from a discourse graph. The nodes below
are the bundled context for the following seeds:

- Q-0003 (question): What does research data loss cost institutions and science?

Framing rules:
- A Question seed means: compose a narrative answering it. The addressing
  Claims are the candidate answers. Use their Evidence to substantiate.
  Surface counter-Claims as contrast where present.
- A Claim seed means: compose a narrative establishing it as the position
  being argued. Support it with the supporting Evidence; surface opposing
  Evidence and counter-Claims as the counter-arguments to address.
- An Evidence, Method, or Source seed means: compose around it as the
  focal artifact, drawing in the Claim it supports and that Claim's
  context.
- Multiple seeds: weave them into a unified narrative that respects each
  seed's framing.

Citations: cite Sources inline by graph ID — e.g. "(S-0042)" — NOT by
numeric reference like "[42]" and NOT by author-year. Do NOT generate a
References / Bibliography section. The Source nodes ARE the bibliography;
in the rendered graph view a reader follows the inline ID to the Source.

Voice: dispassionate, architectural, citation-dense.

Produce the result as Markdown with whatever heading depth fits the seeds.
Do not invent claims or evidence not present in the bundle. If a transition
would require something not in the bundle, leave a `[GAP: <what's missing>]`
marker.

## Seed nodes

Q-0003

## Expanded nodes

Q-0001, Q-0002, Q-0004, Q-0005, M-0001, M-0002, M-0003, M-0004, M-0005, C-0001, C-0002, C-0003, C-0004, C-0005, C-0006, C-0007, C-0008, C-0009, C-0010, C-0011, C-0012, C-0013, C-0014, C-0015, C-0016, C-0017, C-0018, C-0019, C-0020, C-0021, C-0022, C-0023, C-0024, C-0025, C-0026, C-0027, C-0028, C-0029, C-0030, C-0031, C-0032, C-0033, C-0034, C-0035, C-0036, C-0037, C-0039, C-0040, C-0041, C-0042, C-0043, C-0044, C-0045, C-0047, E-0001, E-0002, E-0003, E-0004, E-0005, E-0006, E-0007, E-0008, E-0009, E-0010, E-0011, E-0012, E-0013, E-0014, E-0015, E-0016, E-0017, E-0018, E-0019, E-0020, E-0021, E-0022, E-0023, E-0024, E-0025, E-0026, E-0027, E-0028, E-0029, E-0030, E-0031, E-0032, E-0033, E-0034, E-0035, E-0036, E-0037, E-0038, E-0039, E-0040, E-0041, E-0042, E-0043, E-0044, E-0045, E-0046, E-0047, E-0048, E-0049, E-0050, E-0051, E-0052, E-0053, E-0054, E-0055, E-0056, E-0057, E-0058, E-0059, E-0060, E-0061, E-0062, E-0063, E-0065, E-0066, E-0067, E-0068, E-0069, E-0072, S-0001, S-0002, S-0003, S-0004, S-0005, S-0009, S-0012, S-0013, S-0015, S-0016, S-0017, S-0018, S-0019, S-0020, S-0021, S-0022, S-0023, S-0025, S-0025a, S-0026, S-0027, S-0028, S-0029, S-0030, S-0031, S-0032, S-0033, S-0034, S-0035, S-0036, S-0037, S-0038, S-0039, S-0040, S-0041, S-0042, S-0043, S-0044, S-0045, S-0046, S-0047, S-0048, S-0049, S-0050, S-0051, S-0052, S-0053, S-0054, S-0056, S-0057, S-0058, S-0064, S-0065, S-0066, S-0067, S-0068, S-0073, S-0074, S-0075, S-0076, S-0078, S-0080, S-0081, S-0082, S-0083, S-0084, S-0088, S-0095, S-0096, S-0097, S-0098, S-0099, S-0100, S-0101, S-0102, S-0104, S-0105, S-0106, S-0107, S-0108, S-0109, S-0111, S-0112, S-0113, S-0114, S-0115

---

## Nodes

### Q-0001 — question — Is research data loss architectural or operational?
source_section: §1.3
edges:
  (none)

# Q-0001 — Is research data loss architectural or operational?

The empirical record on research data preservation documents a steady-state outcome: 73 to 93 percent of published research carries underlying data that cannot be produced on request, with that fraction stable across two decades, multiple disciplines, and successive funder regimes. The standard interpretation treats this as an operational failure — insufficient researcher discipline, inadequate data management plans, underfunded libraries, uneven training — and addresses it through procedural reform.

This question asks whether that interpretation is correct. Are the documented losses produced by behaviors that procedural reform can fix, or by structural properties of the storage architecture that procedural reform cannot reach?

The answer determines what counts as a credible response. If the cause is operational, the policy stack already in place — stronger plans, mandatory deposit, funder enforcement — is the right approach and needs only better execution. If the cause is architectural, no amount of policy reform changes an outcome that the underlying storage substrate determines.

Subsidiary questions within Q-0001:
- Do operational explanations close the documented compliance gap?
- Do procedural mandates produce different outcomes on different architectures?
- Is the survival of a dataset a property of researcher behavior or of how many independent copies exist across independent failure domains?

---

### Q-0002 — question — Under what architectural conditions does research data survive long horizons?
source_section: §2
edges:
  (none)

# Q-0002 — Under what architectural conditions does research data survive long horizons?

Some information systems have survived multi-decade operational horizons on the open Internet — DNS for 43 years, email for 44, BitTorrent for 25, Git for 21 — without any single organization underwriting their continuity. Other systems, including many built specifically to preserve research data, have failed within their first 12 to 20 years.

This question asks which architectural properties distinguish the systems that survive from the systems that do not, and whether those properties are transferable to scientific data preservation.

The framework developed by the paper organizes the answer around three properties: distribution of independent copies across independent failure domains, verifiable integrity without trusting the holder, and independence of persistence from any single organization's governance, funding, or operational continuity. The four-tier taxonomy (Tier 0/1/2/3) is the structural classification under which research data infrastructure is read against those properties.

This question is the analytical foundation for the rest of the paper. Every Claim about loss mechanisms, costs, prevention, and verification reduces to whether the underlying architecture supplies these three properties.

---

### Q-0003 — question — What does research data loss cost institutions and science?
source_section: §4–5
edges:
  (none)

# Q-0003 — What does research data loss cost institutions and science?

If 73 to 93 percent of published research sits on data that cannot be produced on request, the cost of that condition operates across at least three dimensions: the institutional liability carried on each non-verifiable dataset, the cost to scientific progress when reproducibility and reuse are foreclosed, and the compounding loss of downstream research the destroyed data would have enabled.

This question asks how to quantify each of those dimensions, what mechanisms convert latent liability into realized cost, and what an honest accounting of the carrying cost looks like at institutional and sectoral scale.

Subsidiary questions:
- What is the institutional liability carried on a single dataset that cannot be produced on request?
- What is that liability summed across an institution's annual publication output?
- Through what mechanisms does latent liability convert to realized loss — audit, retraction, FCA action, funder verification, compliance check?
- How does the cost to science as an enterprise (reproducibility, reference rot, foregone reuse) compound across decades of single-copy architecture?

The Four-Term Liability Formula (M-0003) is the analytical instrument used to answer the institutional half of the question. Reproducibility and structural-decay measurements answer the scientific half.

---

### Q-0004 — question — What is the economic cost structure of preservation across architectural tiers?
source_section: §7
edges:
  (none)

# Q-0004 — What is the economic cost structure of preservation across architectural tiers?

The architectural framework (Q-0002) classifies preservation into four tiers. Each tier has a distinct cost profile: who pays, what they pay for, what fixed and marginal costs look like, and how those costs scale with coverage and time.

This question asks what an institution actually spends — and what value it gets — for preservation at each tier, and whether the marginal cost of moving from one tier to a more resilient tier is a barrier or a rounding error against the liability the lower tier carries.

The 1:10:100 Cost Heuristic (M-0004) is the analytical frame: prevention at the source costs $1, detection and correction after bad data propagates costs $10, and handling once bad data drives decisions costs $100. The paper applies this to preservation: prevention is the Tier 3 deployment, detection-and-correction is forensic recovery after loss, handling is FCA exposure and compliance failure.

Subsidiary questions:
- What does Tier 1 hosted storage cost per dataset, and what fails it?
- What does Tier 2 coordinated preservation cost, and what conditions make it sustainable?
- What is the marginal cost of adding Tier 3 protocol participation to existing institutional infrastructure?
- What is the documented return on investment for research data infrastructure across studies?

Q-0004 is the economic counterpart to Q-0002.

---

### Q-0005 — question — What architecture produces verification evidence as a byproduct of operation?
source_section: §8
edges:
  (none)

# Q-0005 — What architecture produces verification evidence as a byproduct of operation?

The funder mandate regime is shifting from self-reported plans ("did you write a DMP?") to verifiable evidence ("did you actually do it, and can you prove it?"). The Gates Foundation contracts OA.Works for programmatic compliance review; the May 2026 NIH standardized DMSP format replaces narrative descriptions with structured questions; Horizon Europe ties FAIR compliance to grant-agreement payments under Article 17.

This question asks what architectural properties allow an institution to *produce* the evidence the verification regime is converging on — without retrospective reconstruction, without forensic investigation, and without trusting an opaque service provider.

The structural answer the paper develops: under content-addressed, distributed architecture, verification is mathematical and inspectable. The hash confirms integrity; the node list confirms location and copy count; the access layer confirms permission state. The same single cryptographic query produces evidence any third party can independently re-verify. Under Tier 1 architecture, each of those four properties opens a separate audit burden the institution cannot answer by inspection.

Q-0005 connects the architectural question (Q-0002) to the regulatory and fiduciary question (Q-0003). It is the operational hinge under which architectural choice becomes a compliance posture.

---

### M-0001 — method — The Four-Tier Architectural Taxonomy
source_section: §2.2
edges:
  (none)

# M-0001 — The Four-Tier Architectural Taxonomy

A classification of preservation architectures by how many copies of a dataset exist, across how many independent failure domains, under what coordination model, and with what verification capability.

**Tier 0 — Local storage.** A single copy on a single system in a single location. Laboratory server, departmental drive, PI laptop, external hard drive. No replication, no geographic redundancy, no verification beyond the storage medium itself. Default architecture of most research data.

**Tier 1 — Hosted storage.** A single copy held by an external hosting provider (institutional repository, Zenodo, Dryad, AWS, Google Cloud). Professional management and provider-internal redundancy, but the data exists in one organizational context, subject to one provider's business decisions, funding continuity, terms of service, and jurisdiction.

**Tier 2 — Coordinated institutional preservation.** Multiple copies across multiple locations, coordinated by institutional agreements, funded by membership fees, libraries, and philanthropic support. Examples: INSDC (3 sites), wwPDB (4 sites), CLOCKSS (12 mirror nodes), WLCG. Resilience depends on the continued coordination of three to four organizations.

**Tier 3 — Protocol-level distribution.** Data is distributed as a structural byproduct of use across a protocol that requires no organization to operate. Redundancy arises at every point of participation. Examples: DNS, email, BitTorrent, Git, IPFS, ATProto, Matrix, Tor. Persistence is independent of any single organization's continuity.

The taxonomy is the analytical instrument under which every Claim about architecture-induced loss, prevention, cost, and verification in the paper is read. A Claim that a particular failure mode reduces to single-copy concentration uses M-0001 to identify the reduction.

The taxonomy is also a *practice* property, not just a *technology* property: a Tier 3 protocol deployed in a centralized configuration delivers Tier 1 resilience. The tier at which a dataset effectively exists is determined by the deployment, not by the software.

---

### M-0002 — method — Three Architectural Principles
source_section: §2.1
edges:
  (none)

# M-0002 — Three Architectural Principles

Three properties that determine whether an information system survives triggering events over long time horizons. Together they constitute the analytical vocabulary against which the four-tier taxonomy (M-0001) is constructed.

**Distribution across independent failure domains.** A failure domain is the scope within which a single event can cause total loss. Servers, organizations, funding sources, and jurisdictions are each failure domains. For a dataset to survive a triggering event, independent copies must exist in failure domains that the event does not reach. Concentration of copies inside a single failure domain — however reliable that domain appears — produces single-event loss.

**Verifiable integrity.** When data integrity depends on the assertion of the holder, verification is procedural and depends on the holder's continued cooperation. When data is identified by a cryptographic hash of its contents, verification is mathematical: any recipient can independently confirm that the bytes received are identical to the bytes originally published, without trusting any intermediate party. RFC 6920 (S-0010) formalizes the approach; Git, IPFS, and Software Heritage implement it.

**Organizational independence.** Any preservation system requiring an organization's continued commitment inherits that organization's failure modes — governance change, budget cut, acquisition, operational collapse, strategic reprioritization, jurisdictional action. Protocols that produce additional copies as a byproduct of use — Git's clone, BitTorrent's seeding, DNS caching — deliver resilience that does not depend on any single organization continuing to maintain it. The act of use is the act of contributing to redundancy.

These three principles are independent properties. A system can satisfy one without satisfying the others; only their joint presence produces Tier 3 resilience. The four-tier taxonomy (M-0001) classifies architectures by how many of the three principles they embody.

---

### M-0003 — method — The Four-Term Liability Formula (A + B + C + D)
source_section: §5.2
edges:
  (none)

# M-0003 — The Four-Term Liability Formula

The institutional liability carried, for each dataset in the unretrievable fraction (the 73-93% baseline), is the sum of four terms.

**A — Sunk grant value.** The dollars that originally produced the data, available directly from the award record. For a multi-year PI grant at a research university, A typically ranges from several hundred thousand to several million dollars. Stern et al. 2014 (S-0050) measured the median NIH direct cost per retracted paper at $239,381 and the mean at $392,582 — a defensible per-paper attribution when grant-specific data is not available.

**B — Replacement cost.** When reconstruction is feasible, B can run significantly higher than A because field conditions, cohorts, and experimental alignments rarely reassemble; re-collection carries full new-project overhead rather than incremental cost. When reconstruction is not feasible — long-term ecological time series, decommissioned cohorts, datasets tied to one-time events — B is *maximal* rather than zero, because the data cannot be purchased back at any price and the institution has destroyed an irreplaceable capital asset.

**C — Downstream value lost.** The citation stream, follow-on grants, regulatory products, and reuse the dataset would have generated across its useful life. Piwowar & Vision 2013 (S-0055) documented a 9% citation advantage for papers with open data and estimated 150 reuse papers generated per 100 deposited datasets within 5 years. C typically exceeds A on its own for long-horizon research.

**D — False Claims Act exposure.** Settlement risk under the FCA, which attaches to false or fraudulent claims connected to federal grant funds. The "reckless disregard" standard, combined with the implied-certification theory established in *Universal Health Services v. Escobar* (2016), extends liability beyond deliberate fraud to certifications of compliance the institution has no infrastructure to verify.

A + C + D is a lower bound on per-dataset liability; A + B + C is maximum exposure under full surfacing. Expected annual loss is the sum weighted by the probability of surfacing — currently low but on a rising trajectory across three vectors (funder verification, FCA precedent, regulatory convergence).

The formula does not describe a cost incurred when something breaks. It describes a liability the institution *already carries* on 73-93% of its published output. What varies year to year is not the liability but the probability that some fraction of it surfaces.

---

### M-0004 — method — The 1:10:100 Cost Heuristic (Labovitz & Chang)
source_section: §7
edges:
  (none)

# M-0004 — The 1:10:100 Cost Heuristic

A widely used heuristic in quality and reliability engineering, originally documented by Labovitz and Chang in 1992. The heuristic states:

- **$1** spent on prevention at the source
- **$10** to detect and correct after bad data propagates
- **$100** to handle once bad data has driven decisions

The ratio is order-of-magnitude rather than exact. It expresses the geometric structure of cost when defects are absorbed downstream rather than prevented at the point of origin.

Applied to research data infrastructure:
- **Prevention** is the Tier 3 deployment at near-zero marginal cost on existing institutional infrastructure (S-0080, S-0006, S-0007, S-0008).
- **Detection and correction** is forensic recovery after loss — re-collection (when feasible), reconstruction from fragments, manual chasing of data through emeritus PI archives.
- **Handling once decisions have been driven** is the FCA exposure, retraction cascade, faculty-flight cost, and reputational and competitive cost the paper quantifies in §5.

The heuristic gives the rest of §7 its structure. The paper prices Tier 1 (~$1 per dataset on cloud archive), Tier 2 (~$1K-$25K/year per institution for coordinated preservation), and Tier 3 (effectively zero marginal cost on existing institutional infrastructure), then prices the consequences of architectural failure (the ~$1.1B/year representative-R1 latent liability quantified by M-0003).

The heuristic does not require the exact 1:10:100 ratio to hold for the argument to bind. It only requires that prevention be substantially cheaper than the realized cost of failure — a property the paper documents directly through the cost-side numbers in §7 against the liability-side numbers in §5, with a multiple closer to 1:1,000,000 than 1:100 in the representative-R1 case.

---

### M-0005 — method — The Failure-Mode Taxonomy
source_section: §3
edges:
  (none)

# M-0005 — The Failure-Mode Taxonomy

A four-category classification of the mechanisms by which research data is lost, organized by the operational origin of the triggering event. The taxonomy is the analytical frame of §3 of the paper and the empirical input to the architectural argument.

**3.1 — Personnel turnover and institutional memory.** Departing graduate students, postdocs, and PIs carry operational knowledge of data location, format, and provenance with them. The median time from grad school start to PhD is 7.3 years; the median postdoc is ~4.5 years; ~15-23% of postdocs secure tenure-track. The person who understands a dataset is always within a few years of leaving the institution that holds it. Bus-factor analyses show 65% of popular GitHub projects have a truck factor ≤ 2 (S-0027); HLRS at Stuttgart found 57 of 262 user accounts de-registered, leaving ~619 TB of orphaned data (S-0028).

**3.2 — Physical and technical loss.** Hardware fails, buildings burn, laptops are stolen, software updates collide with backup scripts. Each is routine until it touches single-copy data. Examples: Kyoto University's December 2021 backup-script failure deleting 77 TB across 14 research groups, with 4 groups losing the only copies (S-0029); Brazil's 2018 National Museum fire destroying ~18.4M of 20M items (S-0030).

**3.3 — Funding termination.** Grants keep data alive; when grants end, maintenance ends. Between February and August 2025, NIH terminated 2,291 active grants ($2.45B), NSF terminated 1,752 grants (~$1.4B); FY2026 proposed cuts of ~56% to NSF, ~24% to NOAA, ~57% to ARPA-E (S-0031, S-0032, S-0033, S-0034).

**3.4 — Platform discontinuation and access restriction.** 191 research data repositories shut down 2012–2023 at median age 12, 47% with no migration (S-0005). Access can be restricted without closure: Twitter API (S-0038), GISAID (S-0039), CKNI cross-border (S-0040), CERN Russia (S-0041), UK Biobank pricing (S-0042). Ownership transitions: Bepress acquisition (S-0043), Mendeley shutdown (S-0044), Academia.edu paywall (S-0045).

**3.5 — Shared structural property.** Each category is absorbed without permanent loss when independent copies exist across independent failure domains. The single point of failure varies in form (hardware, organization, funding, jurisdiction); the structural property is constant.

M-0005 is used by every Claim in §3 that reduces a documented loss event to single-copy architecture.

---

### C-0001 — claim — Research data loss is architectural, not operational
source_section: §1.3
edges:
  addresses: [Q-0001]
  usesMethod: [M-0001, M-0005]

# C-0001 — Research data loss is architectural, not operational

The losses documented in the empirical record on research data preservation are produced by structural properties of the storage substrate rather than by behaviors that procedural reform can fix. Operational explanations — insufficient training, inadequate data management plans, uneven researcher discipline, underfunded libraries — identify real problems, and addressing them produces real but bounded improvements. What operational explanations do not address is the underlying property that makes the losses possible in the first place: research data typically exists in a single copy, held by a single organization, funded by a single grant, maintained by a single person. Each of those is a single point of failure, and in most research environments they coincide.

The claim is causal: if the loss-producing mechanisms catalogued in §3 (M-0005) operate on single-copy architecture and are absorbed without loss on distributed architecture, then the architecture determines the outcome and procedural reforms layered on top of single-copy storage cannot change the result. The Four-Tier Taxonomy (M-0001) supplies the structural vocabulary; the empirical evidence in §3 supplies the case-by-case demonstration.

This is the central argument of the paper. Every subsequent Claim about cost, prevention, and verification rests on it.

---

### C-0002 — claim — 73 to 93 percent of published research cannot produce its underlying data on request
source_section: §1.2, §5.1
edges:
  addresses: [Q-0001, Q-0003]
  supports: [C-0001]

# C-0002 — 73 to 93 percent of published research cannot produce its underlying data on request

This is the empirical baseline against which the rest of the paper is read. Four direct-contact studies across two decades, four disciplines, and four funder regimes converge on the same finding: a substantial majority of published research carries underlying data that cannot be produced when an outside party requests it.

- Vines 2014 (S-0001): 19% delivered, 516 ecology and evolutionary biology papers (i.e., ~81% non-delivery).
- Wicherts 2006 (S-0003): 73% non-compliance, 141 APA psychology papers.
- Acciai 2023 (S-0004): 86% non-sharing, 1,634 PNAS and Nature-portfolio papers from 2017–2021.
- Gabelica 2022 (S-0002): 93% non-compliance, 1,792 biomedical papers whose authors had explicitly committed to share.

The range is 73-93%. The studies span ecology, biomedicine, psychology, and high-impact general-science journals. They span 2006 through 2023. They use direct-contact methodology in every case — the cited measure is what authors actually delivered when asked, not what data-availability statements promised.

This is the steady state, not a probabilistic forecast. The events that produce it — drives lost, laptops stolen, repositories shut down, personnel departed, formats obsoleted, backups overwritten — have already happened across most of the institution's published output. The question subsequent sections answer is not how often loss occurs, but what the accumulated loss costs when something forces it to surface.

---

### C-0003 — claim — Funder mandates are shifting from self-reported plans to programmatic verification
source_section: §1.2, §5.4
edges:
  addresses: [Q-0005]
  supports: [C-0001]

# C-0003 — Funder mandates are shifting from self-reported plans to programmatic verification

Research-funder compliance regimes are converging from "did you write a data management plan?" toward "did you actually deliver on it, and can you prove it?" The shift is documented across multiple major funders simultaneously and is not specific to any single agency.

- The NIH Data Management and Sharing Policy took effect January 25, 2023 as a term and condition of award; annual progress reports must document what data has been shared, where, and by what unique identifier (S-0067).
- The May 25, 2026 simpler Data Management and Sharing Plan format replaces narrative descriptions with structured yes/no questions designed to make compliance review machine-actionable (S-0067).
- The Gates Foundation contracted OA.Works in January 2025 to perform programmatic compliance review at funder scale (S-0068).
- Horizon Europe makes FAIR data mandatory with no opt-out, enforceable through Grant Agreement Article 17 which ties compliance to payments (S-0069).
- The Wellcome Trust may decline to accept new applications from non-compliant researchers and may suspend funding to the institution in extreme cases (S-0070).
- The OSTP Nelson Memo (August 2022) directed all federal agencies to require immediate open access to federally funded research and data covering ~$90B in annual federal research funding (S-0072).

Most institutions cannot answer the second question — "did you do it, and can you prove it?" — by inspection on Tier 0/1/2 architecture. The shift from a regime that cannot programmatically detect non-compliance to one that can is the converging condition under which the Section 5 latent liability surfaces.

---

### C-0004 — claim — Tier 2 coordinated preservation works but does not extend to most research
source_section: Exec Summary, §6.1, §6.2
edges:
  addresses: [Q-0002]
  supports: [C-0001]
  usesMethod: [M-0001]

# C-0004 — Tier 2 coordinated preservation works but does not extend to most research

The most sophisticated coordinated preservation systems on Earth — INSDC for nucleotide sequences, wwPDB for macromolecular structures, CLOCKSS for journals, the Worldwide LHC Computing Grid for particle physics, NOAA NCEI for environmental data, and the IVOA partnership for astronomical archives — operate at Tier 2 (M-0001). They have survived multi-decade horizons, generated extraordinary returns on the investments that sustain them, and absorbed events including hurricanes, floods, and decades of operational pressure without permanent loss.

The architectural ceiling is lower than the institutional reputation suggests. INSDC holds three copies. wwPDB holds four. NOAA NCEI holds four — all within a single agency. The astronomical consortium holds three. Three or four independently-maintained copies is the demonstrated state of the art in coordinated scientific preservation. Each system is sustained by one or two funding streams, and the organizations governing those copies are not independent failure domains: a single budget decision can affect every NOAA storage site simultaneously because all four report to the same agency.

Tier 2 covers a narrow slice of research. Cross-disciplinary work, small-team studies, underfunded projects, and data types without a community standard have no Tier 2 infrastructure at all. The 73-93% baseline (C-0002) is precisely the slice Tier 2 does not reach. Coverage extension to the remainder is bounded by the economics of consortium operation — Tier 2 fees are priced for well-funded disciplinary consortia, which is why coverage has accumulated where it has and not where it hasn't.

This claim does not argue that Tier 2 is bad. It argues that Tier 2's success defines the ceiling that Tier 3 has to extend.

---

### C-0005 — claim — A representative R1 carries ~$1.1B/year in unverifiable research output as latent liability
source_section: Exec Summary, §5.3.2, §5.6
edges:
  addresses: [Q-0003]
  supports: [C-0001]
  usesMethod: [M-0003]

# C-0005 — A representative R1 carries ~$1.1B/year in unverifiable research output as latent liability

Applying the Four-Term Liability Formula (M-0003) to a Carnegie R1 university running approximately $200M in annual R&D and producing ~3,000 peer-reviewed publications per year, of which ~80% (the C-0002 baseline) carry underlying data that cannot be produced on request:

- **Term A (sunk grant value):** ~$574M/year applied at the Stern et al. peer-reviewed median of $239,381 per retracted paper across 2,400 unretrievable papers (rising to ~$942M/year at the mean of $392,582) (S-0050).
- **Term B (replacement cost):** ~$360–420M/year for the reconstructible fraction; the irreplaceable remainder (human-subjects studies, decommissioned cohorts, one-time-event datasets) is unbounded above.
- **Term C (downstream value lost):** ~$172M/year in foregone reuse value, applying Piwowar & Vision's 150-reuse-papers-per-100-deposited-datasets at the per-paper grant attribution from Term A (S-0055).
- **Term D (FCA exposure):** institutional tail risk of $10M-$112.5M per major surfaced event under the precedent stack (Duke $112.5M, Harvard-Anversa $10M, Dana-Farber $15M).

Maximum institutional exposure under a full-enforcement scenario: approximately **$1.1 billion per year** (~$574M A + ~$360-420M B + ~$172M C). This is the *tail* — the loss the institution would realize if every unverifiable paper were surfaced within a given year. Expected annual loss is substantially lower in absolute terms in any current year and is a function of the surfacing probability that §5.4 documents as rising across three independent vectors.

The number is order-of-magnitude. The methodology — A + B + C + D applied to the unretrievable fraction — is the contestable substance. The ~$1.1B headline is the visible consequence of the methodology, not an independent estimate.

---

### C-0006 — claim — Marginal cost of adding Tier 3 to existing institutional infrastructure is effectively zero
source_section: Exec Summary, §7.3
edges:
  addresses: [Q-0004]
  supports: [C-0001]
  usesMethod: [M-0004]

# C-0006 — Marginal cost of adding Tier 3 to existing institutional infrastructure is effectively zero

The cost case against Tier 3 deployment usually treats it as new infrastructure. It is not. Most institutions already operate the substrate Tier 3 needs, at substantial idle capacity:

- More than half of institutional server capacity sits idle; only ~40% of data centers measure server utilization at all and ~25% of physical servers are entirely comatose. Where utilization is measured, on-premises enterprise servers run at 12-18% of capacity (S-0006).
- Networks run at ~26% average utilization globally; Internet2 maintains over 50% headroom by policy and flags concern at 30% (S-0007, S-0008).
- Internet2 bandwidth contracts are flat-rate based on institutional scale, not traffic volume (S-0008).

Against that idle capacity, Tier 3 protocol nodes are operationally trivial. A BitTorrent seeding daemon averages 9-14 MB resident memory; a Tor relay needs 512 MB and 10-16 Mbps (~0.016% of a 100 Gbps campus connection); Forgejo runs as a single binary at 100-150 MB resident memory; BitTorrent's WebSeed specification allows any existing web server to function as a seed with no software modification (S-0097, S-0098, S-0099).

Universities are already running these protocols as routine background operations: TU Dortmund's student-run Matrix homeserver (S-0100); TU Dresden's Matrix for 18,000 users (S-0101); MIT's SIPB-operated Mastodon and Forgejo (S-0102); Tor relays at over 45 universities (S-0098); 298+ TB of research data on Academic Torrents at zero central infrastructure cost (S-0097).

For an institution starting from nothing, a Hetzner CX23 instance costs ~$46/year. For an institution with existing infrastructure, the marginal cost is closer to zero — invisible in the noise floor of the existing operating budget. The 1:10:100 cost heuristic (M-0004) sets prevention as the cheapest column; this Claim documents that the cheapest column is, in this case, effectively free.

---

### C-0007 — claim — Tier 3 is the only architecture that generates verifiable compliance evidence as a byproduct
source_section: Exec Summary, §8.2
edges:
  addresses: [Q-0005]
  supports: [C-0001]
  usesMethod: [M-0001, M-0002]

# C-0007 — Tier 3 is the only architecture that generates verifiable compliance evidence as a byproduct

The verification regime emerging in 2026 (C-0003) requires an institution to demonstrate four properties on inspection: that data described in a plan exists, that it resides at the location the plan specified, that it has not been altered since deposit, and that access controls match the plan's stated terms. Each architecture produces evidence for these questions in qualitatively different forms.

**Tier 0:** Existence is asserted by the researcher; location is a personal device; integrity is implicit; access control is the device's owner. None of the four is independently inspectable.

**Tier 1:** Existence is checked by manual query to a repository portal; location is a claim from the provider that the customer cannot independently verify; integrity is an assertion about backups the customer cannot inspect; access control is a screenshot. Each opens a separate audit burden.

**Tier 2:** The consortium asserts the protocol is operating as documented. MetaArchive's 2025 sunset audit (S-0096) shows those assertions can silently fail with no external party positioned to catch it. When the consortium dissolves, the verification dissolves with it.

**Tier 3:** Content addressing makes integrity mathematically verifiable (RFC 6920, S-0010): altering one byte alters the hash. Distribution makes copy count and locations observable by inspection. A single cryptographic query across the distribution network produces evidence any third party can independently re-verify. The hash confirms integrity; the node list confirms location and copy count; the access layer confirms permission state.

The verification is not bolted on. It is a structural product of how the protocol operates. The institution can produce a signed attestation that the auditor can independently re-verify without trusting the institution. This is the property M-0002's three architectural principles produce when present jointly.

---

### C-0008 — claim — Tier 3 produces the AI-ready data substrate as a structural byproduct of preservation
source_section: Exec Summary, §10
edges:
  addresses: [Q-0007]
  supports: [C-0001, C-0006]
  usesMethod: [M-0001, M-0002]

# C-0008 — Tier 3 produces the AI-ready data substrate as a structural byproduct of preservation

The data properties required for defensible artificial-intelligence development — provenance, reproducibility, federation, verification — are the same architectural properties that produce preservation under Tier 3.

- **Provenance** (what data trained a model and where it came from) is the structural product of content addressing and signed deposit (M-0002, §2.1, §8.2).
- **Reproducibility** (re-run a training pipeline against the original corpus) requires the corpus to persist across the lifetime of any model trained on it — exactly the preservation property Tier 3 produces (§6.2, §9).
- **Federation** (train across institutional boundaries without consolidating sensitive data into a single trust domain) is the operational pattern §7.6 documents for permissioned BitTorrent, federated Matrix, and permissioned IPFS clusters; the same architecture HIPAA-, FERPA-, and export-controlled research already requires.
- **Verification** (demonstrate to a regulator, court, or peer reviewer that training data was what the model card claims) is the architectural property C-0007 develops: a single cryptographic query produces evidence any third party can independently re-verify.

The institutions that operate Tier 3 preservation nodes for the reasons in §§2-9 hold the AI-ready data substrate as a byproduct. The infrastructure investment that hedges the §5 liability also captures the AI dimension. The deployment is two-sided rather than a one-sided hedge.

The competitive position is direct. Federal AI grant programs increasingly emphasize data-management capacity, reproducibility, and access governance in solicitation language (S-0128, S-0120). International competitors — EOSC, EuroHPC, China Science and Technology Cloud — are closing the gap on the same infrastructure axis (S-0130, S-0131, S-0132). Institutions without credible AI-data infrastructure in 2026 cede position they cannot recover by spending more later.

---

### C-0009 — claim — Three architectural properties jointly determine long-horizon survival
source_section: §2.1
edges:
  addresses: [Q-0002]
  supports: [C-0001]
  usesMethod: [M-0002]

# C-0009 — Three architectural properties jointly determine long-horizon survival

The survival of an information system over multi-decade horizons is determined by three properties operating in conjunction: (1) distribution of independent copies across independent failure domains, (2) verifiable integrity that does not require trust in the holder, and (3) organizational independence — persistence that does not depend on any single organization's continued governance, funding, or operational continuity.

The three properties are independent. A system can satisfy one without the others; only joint presence produces the kind of resilience that lets DNS, email, BitTorrent, and Git survive across decades of organizational change, jurisdictional action, and budget pressure. Tier 1 hosted storage typically satisfies (1) within a provider but fails (2) and (3). Tier 2 coordinated preservation satisfies (1) at small consortium scale, (2) within consortium agreements, and (3) only as long as the consortium itself persists. Tier 3 satisfies all three structurally, and its resilience does not degrade when any single organization participating in the protocol fails.

The framework is the analytical instrument under which the four-tier taxonomy (M-0001) is constructed. M-0002 is the canonical statement of the three properties; this Claim is the assertion that joint presence is necessary and that any subset is insufficient.

The claim is testable: a Tier 3 protocol deployed in a centralized configuration violates property (3) and produces Tier 1 resilience regardless of the underlying software. C-0016 documents this case via the GitHub-Iran episode.

---

### C-0010 — claim — Tier 0 produces the documented year-over-year decline in dataset survival by default
source_section: §2.2
edges:
  addresses: [Q-0002]
  supports: [C-0001, C-0002]
  usesMethod: [M-0001]

# C-0010 — Tier 0 produces the documented year-over-year decline in dataset survival by default

Tier 0 — a single copy on a single system in a single location, with no replication, no geographic redundancy, and no verification beyond the storage medium — is the architecture that produces the ~17%-per-year decline in conditional dataset survival documented by Vines 2014 (E-0005). The decline is not an unexplained empirical regularity; it is the structural output of the architecture most research data is stored on.

When the grant ends, the principal investigator moves, the laptop is replaced, or the hardware fails, the data migrates through manual effort or it does not migrate at all. Each of those events is routine. Each of them is absorbed by Tier 0 as a preservation event the architecture is not equipped to handle. The cumulative consequence is the C-0002 baseline: 73-93% of published research carries data that cannot be produced on request.

Tier 0 is the default architecture of most research data. The default outcome — single-event loss on every routine operational event the institution experiences — is what the empirical record measures.

Counterclaim opportunity: any case in which Tier 0 storage produced multi-decade preservation without external intervention would oppose this Claim. The paper does not present such cases. The empirical record's pattern is consistent with Tier 0 producing default loss across the cohort age distribution.

---

### C-0011 — claim — Tier 1 is one organizational decision away from the same outcome as Tier 0
source_section: §2.2
edges:
  addresses: [Q-0002]
  supports: [C-0001]
  usesMethod: [M-0001]

# C-0011 — Tier 1 is one organizational decision away from the same outcome as Tier 0

Tier 1 — a single copy held by an external hosting provider — is a genuine improvement over Tier 0 in the dimension of local hardware failure. It does not solve the problem of platform failure, and the platform can fail through bankruptcy, acquisition, defunding, jurisdictional change, or internal reorganization as readily as through technical failure.

Three structural vulnerabilities make Tier 1 only a partial improvement: (1) platform opacity — the data exists in one organizational context, subject to one provider's business decisions, funding continuity, terms of service, and infrastructure choices the customer cannot see; (2) funding-model dependency — most research-facing hosted storage survives on grants, institutional subsidies, membership fees, and philanthropy, none of which are contractually protected against reprioritization; (3) jurisdictional exposure — data on a provider's servers is governed by the laws of the country where those servers sit and where the provider is incorporated, neither of which the researcher selects.

The empirical input to this Claim is E-0006: 191 repository closures since 2012, median age 12 years, 47% with no migration. The median Tier 1 platform persists for 12 years before its preservation contract evaporates. For most research papers the citation tail is longer than the median Tier 1 lifespan. The architecture is one organizational decision away from producing the same outcome as Tier 0 at scale.

For the majority of researchers who follow current best practice, Tier 1 is the point at which the data-management journey terminates. The architecture is therefore a major contributor to the C-0002 baseline, not a reliable defense against it.

---

### C-0012 — claim — Tier 2 redundancy is contingent on continued coordination of 3-4 organizations
source_section: §2.2, §6.1
edges:
  addresses: [Q-0002]
  supports: [C-0001, C-0004]
  usesMethod: [M-0001]

# C-0012 — Tier 2 redundancy is contingent on continued coordination of 3-4 organizations

Tier 2 maintains multiple copies across multiple locations, coordinated by institutional agreements and funded through membership fees, research libraries, and philanthropic support. The most sophisticated coordinated preservation systems on Earth — INSDC (3 sites), wwPDB (4 sites), CLOCKSS (12 mirror nodes, 691 publishers), WLCG (>170 sites in 42 countries), NOAA NCEI (4 U.S. locations), and the IVOA partnership (3 sites across 30 years) — operate at this tier.

The architectural limitation is economic and organizational rather than technical. A Tier 2 network depends on the continued coordination of a small number of organizations, and that coordination requires continuous operational funding. When funding or coordination fails, the redundancy members paid for is no longer the redundancy they have. The MetaArchive 2025 sunset (E-0066) and the Digital Preservation Network 2018 dissolution (E-0065) are documented cases in which this dependency converted to actual preservation gaps.

The institutional copies are physically independent; the organizational, political, and budgetary domains governing them frequently are not. NOAA NCEI's four U.S. locations all report to the same agency — a single budget decision at one level of government can affect all four. The FY2026 ~27% NOAA cut and the proposed defunding of Mauna Loa's 68-year CO₂ record (S-0032) illustrate the failure mode.

Three or four independently-maintained copies is the demonstrated state of the art in coordinated scientific preservation. Tier 2 is not a failure mode within its scope; it is a successful architecture whose resilience is bounded by the continued coordination it requires.

---

### C-0013 — claim — Tier 3 produces redundancy as a structural byproduct of use
source_section: §2.2
edges:
  addresses: [Q-0002]
  supports: [C-0001, C-0007]
  usesMethod: [M-0001, M-0002]

# C-0013 — Tier 3 produces redundancy as a structural byproduct of use

Tier 3 distributes data as a structural byproduct of participation across a protocol that requires no organization to operate and produces redundancy at every point of use. The architectural pattern is visible in the longest-running information systems on the open Internet:

- DNS has resolved domain names for 43 years, handling trillions of queries per day across 350 million registered domains, and has never gone down globally (S-0016).
- Email has operated for 44 years, serves 4.73 billion users, and carries 392.5 billion messages per day across infrastructure no single entity owns (S-0017, S-0018).
- BitTorrent has operated for 25 years with over 2 billion cumulative installations; the Internet Archive uses it as the fastest method to retrieve content from over a million Archive items (S-0019, S-0020).
- Git has operated for 21 years, is used by 93.87% of professional developers, and maintains complete repository history in every clone (S-0021, S-0022).

These systems share structural properties that differ from Tier 2 in kind rather than in degree. Redundancy is not maintained by organizational agreement; it is produced by participation. Integrity is not asserted by the host; it is verifiable by cryptographic inspection. Governance failures do not terminate the copies; the copies persist on every node that participated. Scale is not limited by coordination overhead; it grows with each additional user.

In fact, Tier 3 is *anti-fragile* in a sense Tier 2 is not: the more it is used, the more redundant it becomes, and the cost per dataset of additional redundancy goes down. The economic and organizational properties this produces are why DNS, email, BitTorrent, and Git survived where comparable centrally-coordinated alternatives did not.

---

### C-0014 — claim — Content addressing operates on any byte sequence regardless of semantics
source_section: §2.4
edges:
  addresses: [Q-0002]
  supports: [C-0013]
  usesMethod: [M-0002]

# C-0014 — Content addressing operates on any byte sequence regardless of semantics

A common objection to applying Tier 3 to scientific data: the protocols transport opaque byte streams, while scientific data carries provenance, metadata, and governance requirements those protocols were not designed for.

The objection conflates the storage substrate with the governance layers every preservation system has always built on top of it. Content addressing operates on any byte sequence regardless of its semantics. The hash of a FITS cube from a radio telescope, an fMRI volume, a CSV of field measurements, or a Git commit is computed the same way; identity, integrity, and deduplication behave identically across content types. Signed repositories (Git commit signing, Git tag signing) establish provenance without requiring trust in the host, and the signature travels with the object.

The features scientific data requires above the byte-stream layer — curated metadata, versioning policy, dispute resolution, schema governance — are the same features every Tier 2 system already layers on top of Tier 1 storage. The Protein Data Bank's weekly synchronization, GenBank's Feature Table format, and the IVOA standards are each governance and metadata layers built above a storage substrate. The architectural question is not whether protocols can preserve scientific context. It is whether the storage substrate beneath those governance layers is architecturally fragile or structurally redundant.

Tier 3 is a foundation layer, not a complete solution. The layering principle that has made Tier 2 successful on top of Tier 1 operates equally on top of Tier 3.

---

### C-0015 — claim — Permissioned Tier 3 configurations restrict access while preserving redundancy and integrity
source_section: §2.4
edges:
  addresses: [Q-0002]
  supports: [C-0013]
  usesMethod: [M-0002]

# C-0015 — Permissioned Tier 3 configurations restrict access while preserving redundancy and integrity

A second common objection to applying Tier 3 to scientific data: much scientific data is sensitive — clinical records under HIPAA, embargoed pre-publication results, indigenous data sovereignty obligations, classified observations — and cannot be distributed on the kind of network that carries movies and music.

The objection conflates Tier 3 architecture with public distribution. Permissioned variants of every major protocol exist and are in production use:

- Private BitTorrent trackers restrict which clients can join the swarm.
- Federated Matrix homeservers restrict which servers federate with each other.
- Permissioned IPFS clusters restrict which nodes can hold copies.

Each restricts which nodes can hold copies while preserving the protocol's redundancy and integrity properties. Sensitive scientific data does not require Tier 3 to be abandoned; it requires the permissioned configuration of the same architecture.

Access control and structural redundancy are independent properties. Three orthogonal techniques compose: client-side encryption keeps data unreadable on every replica (institutional keys never leave the institution); permissioned networks bound which partners hold copies and constrain jurisdictional exposure; content addressing separates integrity from access — any node can verify integrity by recomputing a hash without being able to read the underlying data.

The same techniques are already deployed for HIPAA-covered records, FERPA-covered student data, export-controlled research, and embargoed datasets in Tier 2 contexts (the Electronic Medical Records and Genomics Network, the All of Us Research Program). The architectural question is whether to apply them at Tier 3 as well, where the resilience properties of the protocol compound the access controls already in use.

---

### C-0016 — claim — Architectural tier is determined by the deployment, not by the underlying software
source_section: §2.5
edges:
  addresses: [Q-0002]
  supports: [C-0001, C-0009]
  usesMethod: [M-0001]

# C-0016 — Architectural tier is determined by the deployment, not by the underlying software

The tier at which a dataset effectively exists is determined not only by the infrastructure available to the researcher but also by the way that infrastructure is used. A Tier 3 protocol deployed in a centralized configuration delivers Tier 1 resilience, because the distributed properties of the protocol remain latent when only one copy is maintained.

GitHub illustrates the pattern. GitHub hosts 630 million repositories and serves 180 million developers (S-0024). Git is a distributed protocol; GitHub is a single commercial platform operated by a single company subject to a single country's legal regime. In July 2019, GitHub blocked developers in Iran, Syria, Crimea, Cuba, and North Korea from accessing their own repositories, citing United States export controls. When affected developers requested copies of their disabled repositories, the platform responded that it was "not legally able to send an export of the disabled repository content" (S-0025, S-0025a).

Developers who had maintained local clones retained every commit, branch, and line of code. Developers who had relied exclusively on GitHub lost access to their own work.

The underlying protocol supported Tier 3 resilience; the usage pattern delivered Tier 1 exposure. A researcher who deposits a dataset in a single repository and moves on is operating under the same pattern. The infrastructure may support distribution, but a single copy in a single organizational context is Tier 1 regardless of what the underlying technology makes possible.

The architectural tier is a property of the deployment, not of the software. Recommendation 6 (R6) makes the corresponding operational point at the laboratory level: maintain at least one local clone and one content-addressed copy of every research dataset.

---

### C-0017 — claim — Personnel turnover is a structural preservation event for research data
source_section: §3.1
edges:
  addresses: [Q-0001, Q-0002]
  supports: [C-0001]
  usesMethod: [M-0005]

# C-0017 — Personnel turnover is a structural preservation event for research data

Research is performed predominantly by temporary workers who leave by design. The median time from grad school start to PhD is 7.3 years, ~43% have not completed within ten years, the average postdoc lasts ~4.5 years, and only ~15-23% of postdocs eventually secure tenure-track positions (S-0026). The person who understands what a dataset is, how it was generated, and where it lives is always within a few years of leaving the institution that holds it.

The structural exposure this creates is measurable. In 133 popular GitHub projects, 65% have a bus factor ≤ 2 — two departures would leave the project effectively unmaintained (S-0027). At HLRS Stuttgart, 57 of 262 user accounts on the tape archive were de-registered, leaving ~619 TB of dark data without active stewardship (S-0028). The same pattern operates at every research institution at every level of granularity.

Institutional infrastructure treats every departing researcher as a preservation event it is not equipped to handle, then responds to the accumulated consequence as if it were unexpected. The architectural fix — preservation that survives independent of any individual's continued participation — is the M-0001 Tier 3 property. Every other "fix" (better onboarding/offboarding, stronger DMPs, mandatory deposit) is layered on top of the same single-point-of-failure architecture.

---

### C-0018 — claim — Single-domain backups are not backups
source_section: §3.2
edges:
  addresses: [Q-0002]
  supports: [C-0001]
  usesMethod: [M-0002, M-0005]

# C-0018 — Single-domain backups are not backups

A backup that shares a failure domain with the data it protects is not a backup. It is a second copy in the same system, and a single event that reaches the system destroys the primary data and the safety net in the same operation.

The failure domain need not be physical. At Kyoto University in December 2021 (E-0015), buggy backup scripts and the data they protected executed in the same software context; a single administrative action destroyed both. The same architectural principle holds for physical failure domains — a backup in the same building is destroyed by the same fire, the same flood, or the same power failure — but the Kyoto case shows that *software* failure domains collapse the distinction between primary and backup just as completely.

This Claim is the operational form of the M-0002 distribution principle. Independent failure domains are the architectural input; "backups" that violate independence are not preservation, regardless of how they are labeled.

The operational implication is that a great deal of what institutions count as backup is not. On-premises backup-to-tape in the same data center is not a backup against fire, flood, or administrative action. Cloud backup to the same provider is not a backup against acquisition, defunding, or jurisdictional action. Geographic separation alone does not produce independence if the failure domain is organizational or jurisdictional.

---

### C-0019 — claim — Grant termination terminates data maintenance
source_section: §3.3
edges:
  addresses: [Q-0001, Q-0002]
  supports: [C-0001]
  usesMethod: [M-0005]

# C-0019 — Grant termination terminates data maintenance

When grants end, maintenance ends with them. Data infrastructure paid for by a project budget has the lifespan of that project budget — three to five years, after which the server contract lapses, the storage migrates ad hoc or not at all, and the dataset enters the failure modes catalogued in C-0017 (personnel) and C-0011 (Tier 1 platform).

The 2025 NIH and NSF terminations are the cleanest available demonstration: 2,291 NIH grants ($2.45B) and 1,752 NSF grants ($1.4B) terminated between February and August 2025 (S-0031); the NSF STEM Education Directorate alone lost 839 grants worth $888M; FY2026 proposed cuts of ~56% to NSF, ~24% to NOAA, and ~57% to ARPA-E. Every long-term dataset funded under those grants entered the failure mode this Claim describes within months of the termination.

Specific data infrastructure disappeared alongside the grants: the NOAA Billion-Dollar Disasters database (S-0032), Mauna Loa's 68-year CO₂ record proposed for complete defunding, ~3,400 datasets removed from Data.gov by late February 2025 (S-0033), and 191 of 411 long-term mammal studies terminated, including a 63-year yellow-bellied marmot time series rejected on the grounds it had "too much data" (S-0034).

Every long-term dataset is a cumulative capital asset. When the funding stops, the asset is abandoned, and re-collection is rarely possible because the ecological, cohort, or instrumental conditions under which the original data was collected cannot be reassembled.

---

### C-0020 — claim — Platforms discontinue or restrict access on timelines researchers do not control
source_section: §3.4
edges:
  addresses: [Q-0001, Q-0002]
  supports: [C-0001, C-0011]
  usesMethod: [M-0005]

# C-0020 — Platforms discontinue or restrict access on timelines researchers do not control

Platforms that host research data can cease to exist, cease to provide access, or cease to be affordable, on timelines the platform controls and the researcher does not. The mechanism is not a single failure mode — it is the union of:

- **Discontinuation:** 191 research data repositories shut down 2012-2023; median operational age 12 years; 47% with no migration (E-0006).
- **State action:** China National Knowledge Infrastructure cut foreign subscribers off from dissertations and statistics in April 2023 under cross-border data review (S-0040). CERN terminated cooperation with ~500 Russia-affiliated scientists and Belarus institutions in November 2024 under EU/Swiss sanctions (S-0041).
- **Governance turning adversarial:** GISAID suspended individual researcher accounts in 2023 after publications it disagreed with; re3data downgraded it from open-access to restricted-access (S-0039).
- **Access fees:** UK Biobank transitioned 2023-2024 from bulk download to metered cloud-only on top of an existing £9,000 access fee, approximately doubling project costs (S-0042).
- **API termination:** Twitter eliminated its free academic research API in February 2023; 33,306 studies across 8,914 venues with 610,738 citations had built on it; over 100 active research projects canceled, halted, or pivoted (S-0038).
- **Commercial capture:** Elsevier acquired Bepress in 2017, putting >500 universities' open-access infrastructure under publisher ownership (S-0043). Mendeley Desktop EOL 2022 after a 2018 update lost user PDFs and annotations (S-0044). Academia.edu's premium tier rose from $99/year (2016) to ~$498/year (2026), with 40% of users in developing nations (S-0045). Elsevier and Springer Nature route TDM access to their 5,500+ journals through publisher-gated APIs under restrictive click-through licenses (S-0046).

Each mechanism is a different trigger for the same architectural failure: the researcher's data, code, or access depended on one organization's continued decision to provide it, and the organization changed its decision.

---

### C-0021 — claim — Every loss mode reduces to single-copy dependency
source_section: §3.5
edges:
  addresses: [Q-0001]
  supports: [C-0001]
  usesMethod: [M-0001, M-0002, M-0005]

# C-0021 — Every loss mode reduces to single-copy dependency

The four categories developed in §3 — personnel turnover (C-0017), physical and technical loss (C-0018), funding termination (C-0019), and platform discontinuation (C-0020) — describe triggers that differ substantially in their immediate cause. A graduate student's departure, a data center fire, a grant termination, and a platform acquisition occupy different positions in the operational life of a research institution, require different administrative responses, and are managed by different people.

They share one property. **Each of them destroys a specific dataset only when that dataset exists in a single copy within a single failure domain.** Each of them is absorbed without permanent loss when independent copies exist across independent failure domains.

This is the architectural claim of the paper reduced to its operational form. The mechanisms documented in §3 are the normal operating conditions of centralized research data infrastructure. Every research institution experiences some of them every year. Whether a given dataset survives is determined by how many independent copies exist across independent failure domains when the triggering event occurs.

The reduction from four mechanisms to a single property is what makes C-0001 a structural claim rather than a list of separate problems. A regime that addresses the four mechanisms separately — better PI offboarding, better backups, longer grant terms, alternative platforms — does not converge on the same outcome as a regime that addresses the single underlying property. The former is procedural; the latter is architectural. C-0001 asserts that only the latter works.

---

### C-0022 — claim — Reproducibility failure is the downstream signature of data loss
source_section: §4.1
edges:
  addresses: [Q-0003]
  supports: [C-0001]

# C-0022 — Reproducibility failure is the downstream signature of data loss

The reproducibility crisis is not a separate phenomenon from the architectural argument. It is the *consequence* the architectural failures of §3 produce when measured at the publication level. When the underlying data survives in a form a third party can verify, reproducibility failures become diagnosable: the independent investigator can examine the source, trace the divergence, and identify whether the issue lies in the protocol, the analysis, or the measurement. When the data does not survive, reproducibility failure becomes the terminal state of the investigation because the evidence required to diagnose anything else is already gone.

The empirical signature is consistent across every domain that has been measured (E-0033 through E-0037): >70% of researchers report failed reproduction of others' experiments and >50% of their own; 11% replication success in landmark cancer biology; 97% of *Molecular Brain* manuscript authors unable to produce raw data on request; 74% of R analysis files failing to execute without error.

Reproducibility failure has many proximate causes — methodological variation, biological noise, undocumented procedures, analytical flexibility. The architectural Claim is that *all* of those proximate causes become permanent once the underlying data is gone. The reproducibility crisis is the accumulated consequence of single-copy architecture operating across the research enterprise for decades. The fix is upstream of the proximate causes.

---

### C-0023 — claim — The scholarly record itself is decaying through reference rot
source_section: §4.2
edges:
  addresses: [Q-0003]
  supports: [C-0001]

# C-0023 — The scholarly record itself is decaying through reference rot

Beyond individual reproducibility failures, the aggregate loss is visible in the structural decay of the scholarly record itself. Every dead reference is a broken link between a published claim and the evidence that supported it; at the scale of the scholarly record, the aggregate is a measurable decline in the degree to which research can be built upon.

- 25% of all webpages from 2013-2023 are already gone, rising to 38% for pages a decade old (E-0038, S-0052).
- One in five scientific articles suffers reference rot; among articles citing web content, seven in ten have compromised scholarly context (E-0039, S-0053).
- More than 70% of URLs cited across a sample drawn from the *Harvard Law Review* and two other Harvard journals between 1996 and 2012 no longer resolve to the originally cited content (E-0040, S-0054).

These figures are decay rates, not decay magnitudes. They imply that the value of every published reference declines monotonically as a function of time-since-publication, and that the scholarly record's net informational content is decreasing in some dimensions even as new publications add to it.

The architectural cause is the same as in §3: cited content depends on continued access through whatever single copy or single platform originally hosted it. When that copy or platform fails (which it does at the C-0011 / E-0006 base rate), the citation breaks and the scholarly chain through it terminates. Tier 3 architectural alternatives — content-addressed citation, distributed archives, cryptographic snapshots — produce reference durability as a structural property rather than as a hope.

---

### C-0024 — claim — Per-paper liability application — Agh 2009 yields $725K-$1.88M with effectively-infinite B
source_section: §5.3.1
edges:
  addresses: [Q-0003]
  supports: [C-0001, C-0005]
  usesMethod: [M-0003]

# C-0024 — Per-paper application of M-0003 to the Agh 2009 case

Applying the four-term liability formula (M-0003) to the Agh et al. 2009 *Artemia* paper:

- **Term A (sunk grant value):** ~$210,000 to $340,000 in 2026 dollars. The CORDIS-verified Urmia partner share of EU ICA4-CT-2001-10020 is ~€57,000 (a hard-verifiable floor), but multi-funder triangulation yields a reasoned all-in total of ~€140,000-€225,000 in 2004 euros.
- **Term B (replacement cost):** Feasible-resample floor ~$95,000-$180,000 — *moot* against an effectively infinite cap because Urmia Lake has lost ~88% of its surface area by the mid-2010s and *Artemia urmiana* has collapsed in its type locality. The dataset cannot be reproduced at any price.
- **Term C (downstream value lost):** ~$420,000-$1,360,000 in foregone reuse value, anchored on Piwowar & Vision's 150-reuse-papers-per-100-deposited reuse rate, applied through 2-4 reuse papers conservatively estimated for this dataset (above baseline because it would have served as pre-collapse reference for the post-collapse genetic-erosion literature).
- **Term D (regulatory exposure):** Not directly applicable here (work predates NSF DMP and NIH DMS Policy; non-US jurisdiction). An analogous incident at a US institution today would sit within doctrinal reach of the FCA implied-certification theory.

**Quantifiable cost:** approximately **$725,000 to $1.88 million** for one paper — composed of A + (moot B floor) + C, against an effectively unbounded B cap.

This is one paper. The R1 application at C-0005 / §5.3.2 applies the same pattern across an institution's annual publication output. Both the per-paper worked example and the institutional aggregate use the same formula — the M-0003 method scales from individual cases to institutional totals.

---

### C-0025 — claim — Three independent vectors are converging on programmatic verification of research data compliance
source_section: §5.4
edges:
  addresses: [Q-0003, Q-0005]
  supports: [C-0001, C-0003]

# C-0025 — Three vectors are converging on programmatic verification

The Section 5 latent liability is currently not surfaced at architectural scale. Three independent vectors are loading the conditions under which surfacing becomes mechanically possible:

**Vector 1 — Funder verification policy.** NIH DMS Policy effective January 2023, simpler standardized DMSP format effective May 25, 2026, Gates Foundation OA.Works contracted January 2025, Horizon Europe FAIR mandate via Grant Agreement Article 17, Wellcome Trust suspension power, NSF DMP-required-or-returned-without-review policy, OSTP Nelson Memo (August 2022) covering ~$90B in annual federal research funding (E-0046 through E-0051). The shift is not from "no mandate" to "mandate"; it is from a mandate regime that cannot programmatically detect non-compliance to one that can.

**Vector 2 — False Claims Act precedent.** Duke $112.5M (2019), Harvard-Anversa $10M (2017), Dana-Farber $15M (December 2025) under the implied-certification theory established in *Universal Health Services v. Escobar* (2016). The settlement range above prices scientific fraud, not architectural data unavailability — but the implied-certification theory sits doctrinally available for that extension. What has prevented architectural cases is not the legal theory but the audit infrastructure required to surface architectural failure as a documentable claim.

**Vector 3 — Regulatory convergence.** Every adjacent industry handling consequential data has crossed the verification threshold: SEC Rule 17a-4 + $3.5B in fines since 2021, HIPAA Security Rule + $2.19M willful-neglect penalty tier, 21 CFR Part 11 + Applied Therapeutics rejection. Research is the last major consequential-data sector without mandatory verification of the infrastructure that holds it. The mandate regime is now closing that outlier status (E-0052 through E-0055).

The convergence does not, in 2026, convert Section 5's latent liability to realized loss. It loads the conditions under which conversion becomes mechanically possible across the next funding and audit cycles, on a trajectory in which the rate-limiting input — institutional audit infrastructure — is also the input the rest of the paper proposes that institutions build.

---

### C-0026 — claim — Faculty flight and failed recruiting compound continuously, independent of liability surfacing
source_section: §5.5
edges:
  addresses: [Q-0003]
  supports: [C-0001]

# C-0026 — Faculty flight and failed recruiting compound continuously

The institutional liability documented in §5.2 (M-0003) coexists with a continuous erosion that institutions pay every year the infrastructure remains unchanged, *independent* of whether any audit or enforcement action occurs.

**Term E — Faculty flight.** A 2025 *Nature* reader poll of more than 1,600 respondents (the majority scientists) found that **75% said they were considering leaving the country**, rising to **79% among postgraduate researchers**, citing funding cuts, firings, and cancelled programs as drivers (E-0056). Each departure compounds across subsequent grant cycles.

**Term F — Failed recruiting.** Positions that remain open or offers that are declined because the infrastructure a candidate requires does not exist. The European Commission's "Choose Europe for Science" program — launched May 2025 at €500M and expanded to ~€900M across 100+ national and regional initiatives — is actively recruiting global research talent during the US disruptions through ERC super-grants, ERA Chairs, and MSCA fellowships (E-0056). Only **44% of US faculty** report that their institution provides adequate technology support for grant-funded projects (E-0057).

These costs are continuous and compounding. They do not appear in the fiscal year when the underinvestment decision was made; they accrue across all subsequent years during which the underinvestment persists. They do not depend on any audit, retraction, or FCA action surfacing the §5.2 liability — they accrue regardless.

The architectural reading: institutions that operate adequate research data infrastructure can recruit and retain against the candidates' real preferences; institutions that do not cede position quietly, on a timeline that does not show up in any single year's budget but compounds into the next decade's competitive standing.

---

### C-0027 — claim — The institutional position is an unhedged billion-dollar tail exposure against a rounding-error fix
source_section: §5.6
edges:
  addresses: [Q-0003, Q-0004]
  supports: [C-0001, C-0005, C-0006]
  usesMethod: [M-0003, M-0004]

# C-0027 — Asymmetry: billion-dollar tail vs. rounding-error fix

The institution's position is straightforward to summarize.

**On the liability side:** approximately **$1.1 billion per year** in unverifiable research output at a $200M R1 (C-0005), rising with annual publication volume, against a probability of surfacing that three independent vectors (C-0025) are pushing up simultaneously.

**On the prevention side:** protocol-level preservation that runs on existing institutional server infrastructure at effectively zero marginal cost (C-0006), and at $42 to $360 per node per year for a standalone deployment from nothing.

The asymmetry is large enough that the surfacing trajectory does not need to materialize on any specific timeline for the recommendation to follow. Even in a world where the architectural-extension scenario remains untested in litigation across the next decade, the continuous erosion documented in C-0026 alone justifies the deployment.

The institution is **carrying an unhedged billion-dollar tail exposure to avoid a rounding-error expenditure**. The 1:10:100 cost heuristic (M-0004) holds at minimum — and arguably at 1:1,000,000 in this specific case, given the gap between Tier 3 deployment cost and the latent liability.

This is the synthesis Claim of §5: the asymmetry binds the recommendation regardless of timing assumptions on any specific trajectory vector. The decision to deploy the prevention infrastructure does not require the institution to take a position on when, or whether, the surfacing trajectory fires; it requires only the institution to take a position that paying a rounding error to hedge a billion-dollar tail exposure is worth doing.

---

### C-0028 — claim — Tier 2 fragility takes three operational forms
source_section: §6.2
edges:
  addresses: [Q-0002]
  supports: [C-0001, C-0004, C-0012]
  usesMethod: [M-0001]

# C-0028 — Tier 2 fragility takes three operational forms

The cases that bracket Tier 2's structural fragility — GISAID, DPN, MetaArchive — illustrate three distinct failure modes the architecture is exposed to:

- **Adversarial governance.** GISAID (E-0025) shows that when governance turns adversarial, the platform can be wielded against parts of its own user community while the technology keeps running. Single-organization centralization within a Tier 2 operating model produces vulnerability identical in form to what the paper attributes to Tier 1.

- **Coordinator dissolution.** Digital Preservation Network spent $7M over its run as a coordinator among five federated nodes. When DPN dissolved in 2018, the actual storage continued operating at the federated nodes, but the cross-node integrity contract — fixity audits, succession guarantees, consortium-level provenance — dissolved with the coordinator. Members had to renegotiate preservation node by node.

- **Silent operational failure.** MetaArchive's 2025 sunset audit (E-0056) discovered that automated LOCKSS polling had not been replicating content the way it advertised. The cooperative had to collapse the distributed architecture entirely — manually consolidating every member's content onto a new audit node at Stanford — to recover. By Educopia's own statement, "it was not possible to secure a permanent archival home for all of MetaArchive's materials within the sunset time frame."

Tier 2 redundancy is contingent on the consortium operating correctly, with no independent verification path available to the institutions that depend on it. The three cases each demonstrate a different way that contingency fails — none of which is rare or surprising, all of which produce data-loss outcomes despite formal preservation infrastructure being in place.

The architectural implication is that Tier 2 is not a complete replacement for Tier 3 even within the disciplines where Tier 2 is well-funded; the absence of an independent verification path makes Tier 2 systematically vulnerable to silent failures that members cannot detect.

---

### C-0029 — claim — Coverage extension to the 73-93% requires architecture below domain-specific governance
source_section: §6.2
edges:
  addresses: [Q-0002]
  supports: [C-0001, C-0004]
  usesMethod: [M-0001]

# C-0029 — Universal coverage requires architecture below domain governance

Tier 2 covers a narrow slice of research output — the well-funded disciplines whose communities could organize and fund coordinated preservation consortia. The 73-93% baseline (C-0002) is the slice Tier 2 does not reach: cross-disciplinary work, small-team studies, underfunded projects, data types without a community standard.

Closing the gap requires an architecture that operates **below and across domain-specific governance**: a protocol-level, domain-agnostic substrate on which the same resilience properties apply to genomic sequences, sociology datasets, climate observations, and educational interventions, because the resilience lives in the protocol rather than in the community that happens to maintain a particular instance of it.

The economic constraint that produces the current coverage gap is not technical. Tier 2 participation is priced for well-funded disciplinary consortia — thousands to tens of thousands of dollars per year, with dedicated staffing and infrastructure expectations. Tier 3 participation scales down to existing institutional infrastructure at effectively zero marginal cost (C-0006). The economics make universal coverage architecturally possible at Tier 3 in a way Tier 2 has never been able to deliver.

This is the central architectural argument for moving Tier 3 from "aspirational" to "operating standard." It is the only architecture that can extend the resilience properties of the best-coordinated existing systems to the long tail of research output that produces most of the literature and most of the data.

---

### C-0030 — claim — Tier 2 economics produce the surviving-consortia pattern
source_section: §7.2
edges:
  addresses: [Q-0004]
  supports: [C-0001, C-0012]
  usesMethod: [M-0004]

# C-0030 — Tier 2 economics produce the surviving-consortia pattern

A pattern is legible across the documented Tier 2 cases. Proportional fees, easy ingestion, and automated contribution produce consortia that survive — CLOCKSS has operated for 20 years (S-0090), LOCKSS for 27 (S-0091), HathiTrust for 18 (S-0092). Flat fees, difficult ingestion, and voluntary contribution produce consortia that do not — DPN charged $20,000/year flat regardless of size and shut down in 2018 with 27 of ~60 members ever depositing content (E-0054).

The economic risk at Tier 2 lies in the organizational model the fees fund rather than in the fees themselves. The fees are modest for research universities (CLOCKSS at the low end is less than a departmental software license; LOCKSS at the high end is a rounding error on R1 operating budgets). What kills Tier 2 consortia is the mismatch between operating-cost growth, member-recruitment difficulty, and operating-reserve requirements.

The consortia that last are the ones in which the economics make participation rational at the institutional level. The consortia that fail are the ones whose model imposes member friction without delivering proportional value back to participation.

This is the operational extension of C-0012. Even the well-architected Tier 2 systems are structurally bounded by their economic-and-organizational sustainability conditions. The Tier 3 alternative — participation cost effectively zero, infrastructure already operating at idle, no consortium-level economic dependency — does not face this same bounded-by-economics constraint.

---

### C-0031 — claim — ROI on research data infrastructure is positive in every documented study, ranging 5x to 800x
source_section: §7.5
edges:
  addresses: [Q-0004]
  supports: [C-0001, C-0006]
  usesMethod: [M-0004]

# C-0031 — ROI on research data infrastructure is positive across all documented studies

The return on well-maintained research data infrastructure is positive in every documented study, across disciplines and geographies. Representative measurements:

- **EMBL-EBI** — operates on ~£50M/yr; generates an estimated £1B-£1.3B/yr in user value; **20:1 to 26:1 return** (E-0059, S-0104).
- **UK Archaeology Data Service** — produces £13M/yr in efficiency gains; **5:1** return (E-0065, S-0105).
- **Australian NCRIS** — **$7 returned per $1 invested** (E-0066, S-0106).
- **XSEDE** — generated $4.7B-$22.7B on $257.5M; **18:1 to 88:1** (E-0067, S-0107).
- **Apon et al.** — every $100K in research-computing salaries associated with $14.3M increase in HERD; every 100 TFLOPs with $1.3M increase (E-0068, S-0108).
- **Protein Data Bank** — operates on ~$6.1M/yr federal funding; generates ~$5.5B/yr in economic impact; **800:1** (E-0060, S-0109).

The PDB 800:1 is the documented outlier. The cluster from the other measurements (5:1 to 26:1) sits well within an order of magnitude across radically different domains and scales.

The economic case for research data infrastructure investment is not contestable on the question of *whether* it produces returns. It is contestable on the question of how to capture the returns — institutional vs. sectoral, and the gap between proven Tier 2 infrastructure (where these measurements come from) and the Tier 3 deployment the paper recommends (whose returns measurable against a regime that does not truncate at the grant cycle have not yet been priced because the regime does not yet exist).

Infrastructure investment is also inseparable from R1 status: the 2025 Carnegie threshold requires $50M annual research spending and 70 research doctorates (S-0110), and every infrastructure investment that supports research at scale qualifies the institution for the next tier of funding eligibility.

---

### C-0032 — claim — Open access multiplies the return on preserved data infrastructure
source_section: §7.6
edges:
  addresses: [Q-0004]
  supports: [C-0031]

# C-0032 — Open access multiplies the return on preservation

When the preserved data can be shared openly, the return documented in C-0031 compounds further, because openness converts preserved data into reuse at planet scale.

- **Human Genome Project + genomics:** Federal investment of $14.5B from 1988-2012; generated $965B in economic impact (E-0069, S-0111).
- **Landsat Earth observation imagery:** Pre-2008 closed-access policy — max **53 scenes/day** downloaded; post-2008 open policy — **5,700 scenes/day**, $25.6B/yr economic value (E-0061, S-0112). Same satellites; the access change unlocked the value.
- **Protein Data Bank:** 88% of 210 new FDA-approved drugs 2010-2016 facilitated by open PDB structures (S-0013a); 100% of 34 cancer drugs 2019-2023 (E-0050, S-0081).
- **COVID-19:** SARS-CoV-2 genome shared publicly January 10-11, 2020 via virological.org and GISAID; BioNTech Project Lightspeed launched January 27 (17 days later); Pfizer-BioNTech vaccines generated ~$1.9T in global economic value, part of $5.2T across all COVID-19 vaccines (E-0062, S-0113).
- **EU FAIR cost:** European Commission estimated cost of *not having* FAIR research data at minimum **€10.2 billion per year** across the EU (E-0072, S-0114).

Distribution is an architecture for redundancy, not a policy on access. Three orthogonal techniques (client-side encryption, permissioned networks, content-addressing for integrity verification independent of access) compose: sensitive data participates in the same architecture as open data, with encryption and permission layers added on top. Health records (HIPAA), student data (FERPA), export-controlled research, and embargoed datasets each participate in this architecture today.

Resilient infrastructure delivers preservation that allows data to survive long enough for compounding use to materialize. Openness delivers the reuse that realizes the value. The investment in infrastructure pays off in both cases; the open-data multiplier compounds the return where the data can be opened.

---

### C-0033 — claim — Data management plans and infrastructure are structurally disconnected
source_section: §8.1
edges:
  addresses: [Q-0005]
  supports: [C-0001, C-0007]
  usesMethod: [M-0001]

# C-0033 — Plans and infrastructure are structurally disconnected

The compliance gap between what institutions promise funders and what they deliver is structural rather than behavioral. A researcher writes a data management plan because the funder requires one. The plan describes depositing data in a repository, maintaining metadata, and providing access. The researcher receives the grant, spends three to five years generating data, and stores it on a laboratory server or a personal drive in whatever format is convenient at the time. When the grant ends, the plan sits in a filing cabinet and the data sits on a hard drive. **Neither is connected to the other.**

The plan was a compliance artifact, and the institution provided no infrastructure to make it anything else. This is a Tier 0 problem dressed in Tier 1 language: the plan promises Tier 1 behavior, while the infrastructure supporting most researchers remains Tier 0.

The 8/2 declared-vs-delivered compliance gap (E-0048) measures the consequence of this structural disconnect across 2.1 million articles. The gap is not closing through better plan-writing; it can only close by infrastructure that produces compliance as a byproduct of operation rather than as a manual procedural follow-through.

C-0033 is the operational counterpart to C-0007. C-0007 says verification is the architectural property the regime is converging on; C-0033 says the current state is its absence — plans without infrastructure to back them. The two together describe the gap R3 (integrate compliance evidence generation into the deposit workflow) closes operationally.

---

### C-0034 — claim — Content addressing makes "my data is lost" a testable rather than unfalsifiable defense
source_section: §8.2
edges:
  addresses: [Q-0005]
  supports: [C-0007]
  usesMethod: [M-0002]

# C-0034 — Content addressing makes data-loss a testable defense

The architectural shift from trust-based to verification-based compliance also eliminates a category of unfalsifiable defense against misconduct allegations.

In 2012, Erasmus University concluded it had no confidence in the scientific integrity of social psychologist Dirk Smeesters' published work, and its 2014 final report formally found misconduct across seven papers. When asked to produce raw data supporting his published results, Smeesters responded that his home computer had crashed and that selectively discarding data was nothing out of the ordinary in his field and his department (S-0115).

The "my data is lost" defense is credible only in an architecture that cannot distinguish lost data from data that never existed in the form reported. Under content-addressed deposit at the point of collection, the hashes and signatures either resolve against the original attestation or they do not. **Data loss becomes a testable claim rather than an unfalsifiable one.**

The reckless-disregard theory developed in §5.4 (C-0025) applies with particular force to institutions in which this category of defense is still structurally available, because the absence of verification infrastructure is precisely what makes the defense possible. An institution that has deployed Tier 3 architecture and the integrity-attestation layer at deposit can establish, post hoc, whether claimed data ever existed in the form reported. An institution operating on Tier 0 architecture cannot.

The architectural reading: integrity attestation at deposit is not just preservation infrastructure. It is forensic infrastructure, and it changes the evidentiary landscape under which research-misconduct cases are litigated.

---

### C-0035 — claim — Universal coverage becomes possible at Tier 3
source_section: §9
edges:
  addresses: [Q-0006]
  supports: [C-0001, C-0029]
  usesMethod: [M-0001]

# C-0035 — Universal coverage becomes possible at Tier 3

Tier 2 extended coordinated preservation to a handful of well-funded disciplines — nucleotide sequences, macromolecular structures, particle physics. The 73-93% of research output that sits outside that coverage — cross-disciplinary work, small-team studies, underfunded projects, data types without a community standard — becomes preservable for the first time, at near-zero marginal cost on infrastructure institutions already operate.

The universe of research data with durable, verifiable preservation expands from the covered disciplines to the entire research enterprise. The economic constraint that produced the current coverage gap (Tier 2 fees priced for well-funded consortia) is not technical — it is structural to the consortium-membership model. Tier 3 has no equivalent constraint because participation cost scales down to zero on existing infrastructure.

This is the most direct constructive consequence of the architectural argument. C-0029 establishes the necessary architectural property; C-0035 names the consequence: every research dataset becomes preservable, not just the ones in disciplines that could afford the consortium model.

---

### C-0036 — claim — Preservation horizon decouples from project budget
source_section: §9
edges:
  addresses: [Q-0006]
  supports: [C-0001, C-0019]
  usesMethod: [M-0001]

# C-0036 — Preservation horizon decouples from project budget

Under the current regime, research data has the useful life of its originating grant — three to five years, after which maintenance ends and the data enters the §3 failure modes. Under Tier 3, **preservation is a byproduct of participation rather than a line item on a time-bounded award**.

Longitudinal cohorts, ecological time series, and cross-decade measurement studies — the class of research for which a 63-year yellow-bellied marmot record is the exception rather than the norm (E-0020) — become structurally supportable instead of heroically sustained. The time horizon of preservation aligns with the time horizon of scientific inquiry rather than with the fiscal year of a grant cycle.

The architectural property: nodes participating in Tier 3 protocols continue to hold the data after the grant that originally funded the deposit terminates, because there is no operational dependency between the grant and the continued node operation. The data persists wherever it has been replicated, on whatever timeline the participating nodes choose to operate, regardless of the originating grant's status.

This Claim is one of the strongest direct connections between the architectural argument (Q-0002) and the funding-policy argument (R5). R5 — fund preservation through facilities-and-administrative cost recovery — is the policy expression of the same property: align the duration of funding with the duration of preservation need. Tier 3 architecture supplies the technical mechanism by which the funding-architecture mismatch becomes operationally tractable.

---

### C-0037 — claim — Reanalysis becomes a first-class research activity
source_section: §9
edges:
  addresses: [Q-0006]
  supports: [C-0001]

# C-0037 — Reanalysis becomes a first-class research activity

When data persists across decades with cryptographically verifiable integrity, **applying new analytical methods to older data stops being archaeological and becomes routine**. Methods developed in 2035 can be applied to data collected in 2015 without negotiating access to an emeritus PI's personal drive, reconstructing experimental context from fragmentary documentation, or accepting that the comparison cannot be run.

The scientific record compounds into a queryable substrate rather than an accumulating list of unverifiable claims. Each new analytical method can be backtested against decades of preserved data with the same confidence as it can be applied to fresh data, because the integrity attestation guarantees that the data has not drifted.

This Claim is generative. It identifies a research practice that becomes routinely possible for the first time at architectural scale, rather than an existing practice that is improved. The implication for research methodology is substantial: longitudinal meta-research, cross-cohort comparison, and re-application of new statistical or machine-learning methods to pre-existing data become standard activities, not heroic ones.

The case is also implicit in C-0032's open-data multiplier (the Landsat reanalysis multiplier, the Mauna Loa cross-decade comparison, the cancer drug pipeline drawing on 10+ year-old PDB structures). What was occasional under the current regime becomes routine under Tier 3.

---

### C-0039 — claim — Institutions that deploy Tier 3 in 2026 hold three positions simultaneously
source_section: §10.3, §10.4
edges:
  addresses: [Q-0007]
  supports: [C-0001, C-0008, C-0027, C-0038]

# C-0039 — Tier 3 deployment in 2026 captures three positions on the same investment

The institutional consequence of the architectural decision is direct. Federal AI grant programs increasingly emphasize data-management capacity, reproducibility, and access governance in solicitation language. The NSF National AI Research Institutes solicitation (NSF 23-610, S-0128) requires institutes to develop shared community infrastructure for data and software supporting reproducibility. The NAIRR Pilot's NAIRR-Open and NAIRR-Secure focus areas (S-0120) tie funding access to documented data-governance practices.

The AI faculty market is the most competitive faculty market in academia, driven by a 2-3x compensation differential between academic and industry AI roles (S-0129). Offer-acceptance rates depend on institutional data and compute infrastructure that determines whether candidates can run the research their industry counterparts could fund directly.

International competitors are closing the gap on the same infrastructure axis: EOSC (S-0130), EuroHPC Federation Platform + AI Factories (S-0131), and the China Science and Technology Cloud (S-0132).

Institutions that deploy Tier 3 infrastructure in 2026 hold **three positions simultaneously**:
1. The preservation posture documented in §§2-9 — the §5 liability hedged.
2. The verification posture documented in §8 — compliance answerable on inspection.
3. The AI-readiness posture documented in §10 — the data substrate institutional AI strategy depends on.

The institutions that do not deploy it cede each of those positions in the same operational year, on infrastructure they already operate at substantial idle capacity (C-0006).

The compounding asymmetry: the same investment that closes a one-sided hedge against the §5 liability also captures the upside of the AI dimension. C-0027's "billion-dollar tail vs. rounding-error fix" understates the case once the AI dimension is included — the prevention investment is positive-value on the cost side and positive-value on the upside side. This is the synthesis Claim of §10 and the connective tissue between §§5-9 and the implementation regime developed in §11.

---

### C-0040 — claim — R1 — Conduct an architectural audit of existing data infrastructure
source_section: §11 R1
edges:
  addresses: [Q-0008]
  supports: [C-0001]
  usesMethod: [M-0001, M-0005]

# C-0040 — R1: Conduct an architectural audit of existing data infrastructure

**Audience:** Research institutions (offices of research, IT leadership, research libraries).

**Action:** Classify every research dataset the institution holds by its current architectural tier, using the M-0001 framework. For each dataset, record the number of independent copies, the failure domains those copies occupy, the verification capability available, and the exposure to each failure mechanism (M-0005). Complete the audit within twelve months.

**Rationale:** An institution cannot remediate architectural exposure it has not measured. The audit creates the baseline against which subsequent recommendations are scoped and priced, and it surfaces the datasets most immediately exposed to the failure mechanisms peer institutions have already experienced. The audit template produced by the working group (intended to be released as part of R7) is designed to complete in approximately two staff-months at a research university of median size.

R1 is the entry point. R2-R6 cannot be priced or sequenced without it. The audit is also the institutional mechanism by which the diffuse §3 failure modes become a concrete inventory the institution can act on rather than a list of things that have happened elsewhere.

---

### C-0041 — claim — R2 — Deploy at least one protocol-level preservation node
source_section: §11 R2
edges:
  addresses: [Q-0008]
  supports: [C-0001, C-0006]
  usesMethod: [M-0001]

# C-0041 — R2: Deploy at least one protocol-level preservation node

**Audience:** Research institutions (research IT, institutional repositories, research libraries).

**Action:** Deploy at least one Tier 3 preservation node — a BitTorrent seeder, a Tor relay, a Forgejo instance, an IPFS pinning node, or an AT Protocol personal data server — on existing institutional infrastructure within twelve months. Document the deployment as a reference configuration for subsequent institutions.

**Rationale:** Tier 3 is the only architecture that generates preservation redundancy and compliance verification as structural byproducts of operation (C-0007, C-0013). The marginal cost on existing infrastructure is effectively zero (C-0006). The deployment establishes the institution's capacity to participate in protocol-level preservation before the mandate regime requires it (C-0025), and produces the operational experience necessary to scale subsequent deployments.

Reference configurations from existing deployments at TU Dortmund, TU Dresden, and MIT (E-0057) demonstrate the operational overhead is within the capacity of existing IT staff or student volunteers. The deployment is operationally trivial; the recommendation is to do it before the mandate regime requires it, not after.

R2 is the operational hinge. Without one deployed node, R1's audit cannot be tested against an alternative; without R2, R3 (compliance evidence into deposit workflow) has no Tier 3 endpoint to deposit into.

---

### C-0042 — claim — R3 — Integrate compliance evidence generation into the data deposit workflow
source_section: §11 R3
edges:
  addresses: [Q-0008]
  supports: [C-0007, C-0033]
  usesMethod: [M-0002]

# C-0042 — R3: Integrate compliance evidence generation into the deposit workflow

**Audience:** Research institutions (offices of research compliance, research libraries, research IT).

**Action:** Modify the data deposit workflow so that every dataset produces, at the point of deposit, the verification artifacts required by funder mandates: content-addressed identifiers, cryptographic hashes of all deposited objects, signed attestations of deposit location and access control state, and machine-readable metadata conforming to the forthcoming NIH standardized DMSP format.

**Rationale:** Compliance evidence generated as a byproduct of the deposit workflow is the only configuration under which compliance checks become answerable by inspection rather than by retrospective investigation. The May 2026 NIH format transition (E-0044) and the Gates Foundation OA.Works monitoring program (E-0045) are both converging on machine-readable verification, and institutions whose deposit workflows do not produce the required artifacts will fail programmatic compliance checks they cannot currently see coming.

This recommendation is the operational expression of the architectural property C-0007 / C-0033 develop. It connects the institution's operational deposit workflow to the verification regime under construction at the funder side. R3 is the operational counterpart of R4 — the institutional half of the funder/institution handshake by which compliance becomes evidentiary rather than self-reported.

---

### C-0043 — claim — R4 — Funders should require verifiable evidence of preservation, not self-reported plans
source_section: §11 R4
edges:
  addresses: [Q-0008]
  supports: [C-0003, C-0007, C-0025]

# C-0043 — R4: Require verifiable evidence rather than self-reported plans

**Audience:** Funders (federal agencies, private foundations, international funders).

**Action:** Transition grant submission and progress reporting requirements from self-reported data management plans to verifiable evidence of deposit, distribution, and access. Specify the technical form of the evidence — content-addressed identifiers, cryptographic hashes, signed attestations from independent nodes — rather than the human-readable form of the plan.

**Rationale:** The compliance gap — 8% declared availability, 2% actual availability across 2.1M articles (E-0048) — is the direct consequence of a regime that measures plan existence rather than plan execution. Transitioning the reporting requirement to verifiable evidence aligns the compliance check with the architectural property that produces compliance in the first place.

The Gates Foundation's 2025 transition to automated compliance monitoring through OA.Works (E-0045, S-0068) is the reference implementation of this recommendation at the funder level. Other funders following this template would close the 8/2 gap structurally rather than through audit pressure.

R4 and R3 (C-0042) are the funder-side and institution-side of the same operational change. Adopting either alone creates friction; adopting both jointly closes the gap.

---

### C-0044 — claim — R5 — Fund preservation through facilities and administrative cost recovery
source_section: §11 R5
edges:
  addresses: [Q-0008]
  supports: [C-0019, C-0036]

# C-0044 — R5: Fund preservation through facilities and administrative cost recovery

**Audience:** Funders and research institutions (jointly, through F&A rate negotiation).

**Action:** Include preservation infrastructure as a recognized category in facilities and administrative cost rate calculations, and negotiate rates that reflect the long-term institutional cost of data stewardship. Treat preservation as a continuing facilities cost rather than a project-scoped expense.

**Rationale:** The National Academies of Sciences, Engineering, and Medicine documented in 2020 that "the current system for funding research is not conducive to data life-cycle cost forecasting" (S-0116). Grants run three to five years; preservation needs run decades. A funding mechanism that scopes preservation to grants forces researchers to deprecate preservation obligations at grant close — the operational origin of the §3.1 (C-0017) and §3.3 (C-0019) failure modes.

Facilities and administrative cost mechanisms already exist for exactly this purpose. R5 is to apply them. The architectural counterpart is C-0036 (preservation horizon decoupled from project budget); R5 is the funding-mechanism counterpart that makes the architectural decoupling sustainable.

R5 is the recommendation with the longest implementation timeline because it requires negotiation between funder and institution at the F&A rate level. It is also the recommendation with the largest sustainable financial impact because it shifts preservation cost from project line items (where it competes with research activities for limited grant dollars) to institutional infrastructure (where it is amortized across all federally funded research).

---

### C-0045 — claim — R6 — Maintain local clones and content-addressed copies of all research data
source_section: §11 R6
edges:
  addresses: [Q-0008]
  supports: [C-0001, C-0016]
  usesMethod: [M-0002]

# C-0045 — R6: Maintain local clones and content-addressed copies

**Audience:** Principal investigators, laboratory directors, individual researchers.

**Action:** As a standard laboratory practice, maintain at least one local clone and one content-addressed copy of every research dataset. Use Git for code; use BitTorrent, IPFS, or Git large-file storage for data; use Signal-style end-to-end encryption where the data is sensitive. Treat the clone and the content-addressed copy as non-optional components of the research workflow.

**Rationale:** The GitHub-Iran episode (E-0009) demonstrates the difference between *using* Tier 3 infrastructure and *capturing* its resilience properties. A single local clone of a Git repository contains the complete repository history with cryptographic integrity, and its existence determines whether a Tier 1 access restriction produces permanent loss or temporary inconvenience. The recommendation is operationally trivial at the laboratory level and architecturally decisive at the institutional level.

R6 is the only recommendation aimed at the individual researcher rather than the institution or funder. It is also the recommendation with the lowest implementation cost — `git clone` and `ipfs add` are commands, not capital projects. The cumulative effect of R6 across an institution is that every individual researcher's local environment becomes an independent failure-domain copy of every dataset they work with, producing the M-0002 distribution property at zero institutional cost.

R6 is implementable today. R1-R5 require institutional or funder coordination; R6 requires only the researcher's decision to make `git clone` and `ipfs add` part of their normal workflow.

---

### C-0047 — claim — The most expensive data infrastructure is the infrastructure built after the disaster
source_section: §12
edges:
  addresses: [Q-0008]
  supports: [C-0001, C-0027]
  usesMethod: [M-0004]

# C-0047 — The most expensive infrastructure is the infrastructure built after the disaster

The conclusion of the paper, in one sentence: **the most expensive data infrastructure is the infrastructure built after the disaster.**

The same architectural decision — deploying Tier 3 preservation on existing institutional infrastructure — costs effectively zero today and addresses the latent §5 liability before the §5.4 trajectory surfaces it. Built after the disaster, it costs:

- The settlement value of any FCA case that lands during the gap (E-0041, E-0042, E-0043 establish the $10M-$112.5M settlement range).
- The forensic-recovery effort required to reconstruct what can be reconstructed (Term B in M-0003).
- The downstream-research value never realized (Term C).
- The faculty-flight and failed-recruiting cost compounded across the years of underinvestment (C-0026).
- The competitive position lost to institutions that deployed the architecture earlier (C-0008's two-sided position cedes to those institutions).

The 1:10:100 cost heuristic (M-0004) holds at minimum. The asymmetry between prevention and post-disaster reconstruction in this specific case may run closer to 1:1,000,000 — the gap between Tier 3 deployment cost (effectively zero on existing infrastructure) and the latent liability (~$1.1B/year at a $200M R1, C-0005).

The recommendation regime developed in §11 (R1-R7) is the operational expression of this asymmetry. Each recommendation has a specific audience and timeline. None of them require new technology to be invented or new architectural principles to be developed. They require the institutional decision to deploy what already exists, before the moment when it is required to have already been deployed.

This is the closing Claim of the paper. The architecture that produces these outcomes is already deployed at scale in adjacent domains. The remaining requirement is deliberate research-sector adoption.

---

### E-0001 — evidence — Vines 2014 — 19% of 516 ecology dataset requests delivered
source_section: §1.2, §5.1
edges:
  supports: [C-0002]
  derivedFrom: [S-0001]

# E-0001 — Vines 2014: 19% of 516 ecology dataset requests delivered

Vines, Albert, and colleagues attempted to retrieve raw morphological data underlying 516 papers in ecology and evolutionary biology, sampled at two-year intervals from 1991 through 2011. They received only **19%** of the requested datasets. Among authors who responded, the odds of a dataset still existing fell by approximately **17% per year** after publication.

The study established the empirical method (direct contact for raw data) that subsequent measurements (E-0002, E-0003, E-0004) replicated across other disciplines and decades. The 17%-per-year decay is the time dimension of the baseline established in C-0002: data does not survive at a constant rate; it survives less, year over year, on the architecture most papers in the cohort were stored on.

The paper's interpretation focused on operational explanations (researcher behavior, institutional policy). The architectural reading developed in C-0001 reinterprets the same finding as a structural consequence of the storage substrate the cohort was using.

---

### E-0002 — evidence — Gabelica 2022 — 93% non-compliance among 1,792 biomedical authors who had committed to share
source_section: §1.2, §5.1
edges:
  supports: [C-0002]
  derivedFrom: [S-0002]

# E-0002 — Gabelica 2022: 93% non-compliance among 1,792 biomedical authors who had committed to share

Gabelica, Bojčić, and Puljak repeated the direct-contact methodology of Vines 2014 (E-0001) on a larger biomedical corpus: 1,792 published papers whose authors had explicitly committed in print to share their data on request. **93%** failed to deliver.

The framing matters. The corpus was not a random sample of biomedical research; it was filtered to include only papers whose authors had pre-committed to share. The non-compliance rate measures the gap between published commitment and actual delivery, not between policy and behavior. The 8%-vs-2% declared-vs-delivered compliance gap documented across 2.1 million articles (S-0084) is the same pattern at sectoral scale.

This is the strongest single anchor for the upper end of the 73-93% range C-0002 reports. The architectural reading: pre-commitment is an operational variable; delivery requires a substrate that can produce the data on inspection. Operational pre-commitment without architectural backing produces the documented 93% gap.

---

### E-0003 — evidence — Wicherts 2006 — 73% non-compliance, 141 APA psychology papers
source_section: §1.2, §5.1
edges:
  supports: [C-0002]
  derivedFrom: [S-0003]

# E-0003 — Wicherts 2006: 73% non-compliance, 141 APA psychology papers

Wicherts, Borsboom, Kats, and Molenaar requested raw data from authors of 141 psychology papers published in journals of the American Psychological Association in 2005. The authors had signed the APA's data-sharing compliance certification at submission. **73%** failed to produce data on request.

The study is the earliest of the four direct-contact cohorts that constitute the C-0002 baseline. It establishes that the non-delivery pattern is not a 2020s artifact and not a biomedicine-specific phenomenon — it was already present at this magnitude two decades ago, in psychology, at journals with explicit data-sharing policies.

The 73% lower bound of the C-0002 range comes from this study. The combination of E-0001, E-0002, E-0003, E-0004 establishes the range at 73-93% across two decades, four disciplines, and four funder regimes — converging on the same finding from independent starting points.

---

### E-0004 — evidence — Acciai 2023 — 86% non-sharing, 1,634 PNAS and Nature-portfolio papers from 2017-2021
source_section: §1.2, §5.1
edges:
  supports: [C-0002]
  derivedFrom: [S-0004]

# E-0004 — Acciai 2023: 86% non-sharing, 1,634 PNAS and Nature-portfolio papers

Acciai, Schneider, and Nielsen ran an audit experiment in 2022 on 1,634 papers published 2017-2021 in PNAS and Nature-portfolio journals. The papers' data-availability statements promised data on request. **86%** of the requests went unfulfilled.

The corpus is high-impact, recent, and explicitly committed in writing. The non-sharing rate sits squarely in the C-0002 range and demonstrates that the pattern persisted into the 2020s in the journals research universities most often cite as exemplary. The replication of Vines 2014 (E-0001) and Gabelica 2022 (E-0002) seventeen years later, in a different field, with the same direct-contact methodology, is what establishes the C-0002 baseline as steady-state rather than artifactual.

The four cohorts (E-0001, E-0002, E-0003, E-0004) span two decades, four fields, and four funder regimes. The convergence on 73-93% non-delivery is the strongest available evidence that the baseline is structural rather than cohort-specific.

---

### E-0005 — evidence — Conditional dataset survival decays ~17% per year after publication
source_section: §1.2
edges:
  supports: [C-0002]
  derivedFrom: [S-0001]

# E-0005 — Conditional dataset survival decays ~17% per year after publication

Vines 2014 (S-0001) found that, conditional on authors responding with the status of their data, the odds of a dataset still existing fell by approximately **17% per year** after publication.

The conditioning matters. The 17% figure is the per-year decline in survival probability among datasets the original author was still able to comment on at all. Datasets associated with authors who could not be located, had moved institutions, had retired, or had died are not in this conditional measure — they are upstream of it, and their non-delivery rates are higher.

The 17%-per-year decay is the time dimension of the C-0002 baseline. Static cross-sectional measurements (E-0001 through E-0004) report the steady-state non-delivery rate; the decay rate explains why the steady state is what it is. Each year after publication, the storage substrate loses a fraction of the datasets it nominally holds. The aggregate measurement at any time captures the cumulative consequence of that decay across the cohort's age distribution.

The architectural implication: a regime in which preservation does not survive the operational lifetime of an individual researcher produces this exact decay rate. A regime in which preservation survives independently of any individual's continued participation produces a fundamentally different time profile. The decay rate is what each architecture tier produces.

---

### E-0006 — evidence — 191 research data repositories shut down 2012-2023; median age 12; 47% no migration
source_section: §1.2, §3.4
edges:
  supports: [C-0002, C-0004]
  derivedFrom: [S-0005]

# E-0006 — 191 research data repositories shut down 2012-2023; median age 12; 47% no migration

Strecker, Pampel, Schabinger, and Weisweiler 2023 analyzed the re3data directory of research data repositories and identified **191 closures since 2012**, with a **median operational age of 12 years** at closure. **47%** of the closures gave no indication of data migration or continued limited access.

The number is not "platforms that became less reliable" or "platforms that raised prices." It is platforms that ceased to exist as preservation services. Of those, nearly half terminated without a successor — the data they held was either lost, fragmented across multiple ad-hoc destinations, or transferred under conditions Strecker et al. could not document.

The 12-year median is the clearest available number for how long Tier 1 hosted infrastructure persists in practice. It is shorter than a researcher's career, shorter than the citation tail of most papers, and shorter than the timescales NIH/NSF preservation requirements implicitly assume. It is the empirical input that establishes Tier 1 as one organizational decision away from the same outcome as Tier 0.

The 47% no-migration figure is the rate at which Tier 1 closures convert to permanent loss rather than transition. The architectural implication: the survival of data on Tier 1 depends on the continued business viability of one provider, and the realized churn rate at the sector level is documented at this magnitude.

---

### E-0007 — evidence — U.S. preclinical research consumes ~$28B/year on irreproducible work
source_section: §1.2
edges:
  supports: [C-0002]
  derivedFrom: [S-0009]

# E-0007 — U.S. preclinical research consumes ~$28B/year on irreproducible work

Freedman, Cockburn, and Simcoe 2015 estimated that preclinical research in the United States alone consumes approximately **$28 billion per year** on work that cannot be reproduced.

The estimate is methodologically derived (not measured directly) by combining published reproducibility-failure rates with NIH expenditure data. The number is contestable in its precision, but its order of magnitude has held up across subsequent reanalyses, and the methodology is transparent enough to permit replacement of any input.

The relevance to C-0002 is the cost dimension: the 73-93% non-verifiability rate is a *condition*, not yet a *cost*; this is one of the earliest serious estimates of what the condition costs the U.S. preclinical sector specifically when reproducibility failures are priced. The aggregate scales with sector size, and Section 4.1 of the paper tracks the same pattern through reproducibility-failure measurements at smaller corpora (Amgen 11%, Molecular Brain 97%, Stern et al. retraction costs).

This Evidence node primarily supports the cost-side argument that C-0001's architectural framing is *worth taking seriously* — that the carrying cost is large, not negligible.

---

### E-0008 — evidence — Long-running protocol systems have survived multi-decade horizons without organizational continuity
source_section: §2.2
edges:
  supports: [C-0013]
  derivedFrom: [S-0016, S-0017, S-0018, S-0019, S-0020, S-0021, S-0022]

# E-0008 — Long-running protocol systems have survived multi-decade horizons

Four production protocols demonstrate the architectural pattern at planetary scale, each with multi-decade operational history and no single organization underwriting their continuity:

- **DNS** — 43 years (since 1983); 350 million registered domains; trillions of queries per day; never gone down globally (S-0016).
- **Email (SMTP)** — 44 years (RFC 821 1982; RFC 5321 2008); 4.73 billion active users; 392.5 billion messages per day in 2026 (S-0017, S-0018).
- **BitTorrent** — 25 years; over 2 billion cumulative installations of BitTorrent and µTorrent clients (S-0019); the Internet Archive uses BitTorrent for over 1 million items and describes it as "the now fastest way to download items from the Archive" (S-0020).
- **Git** — 21 years (initial commit April 7, 2005); 93.87% adoption among professional developers in 2024 (S-0021, S-0022).

The systems were designed under different threat models, by different communities, in different decades. They share the architectural pattern in M-0002: distribution across independent failure domains, verifiable integrity (where applicable), and persistence independent of any single organization. They are the empirical demonstration that Tier 3 architecture is not theoretical — it is the foundation of the open Internet and has been for decades.

---

### E-0009 — evidence — GitHub blocked developers in 5 sanctioned regions in July 2019
source_section: §2.5
edges:
  supports: [C-0016, C-0011]
  derivedFrom: [S-0025, S-0025a]

# E-0009 — GitHub blocked developers in 5 sanctioned regions in July 2019

In July 2019, GitHub blocked developers in **Iran, Syria, Crimea, Cuba, and North Korea** from accessing their own repositories, citing United States export controls (S-0025).

When affected developers requested copies of their disabled repositories, GitHub responded in writing that it was "not legally able to send an export of the disabled repository content. I'm sorry for the frustration here, but GitHub must comply with U.S. export control laws and sanction requirements" (S-0025a).

Developers who had maintained local Git clones retained every commit, branch, and line of code from their disabled repositories. Developers who had relied exclusively on GitHub-hosted access lost access to their own work.

This is the cleanest available case demonstrating C-0016: the architectural tier is a property of the deployment, not of the software. Git is a Tier 3 protocol; GitHub is a Tier 1 deployment of it. Researchers who used Git as Tier 3 (kept local clones) preserved continuity. Researchers who used Git through GitHub as Tier 1 lost access on a single organizational decision they did not control.

The implication for research data is direct: any institution depositing data in a single hosted repository is, by deployment pattern, Tier 1 — regardless of whether the underlying repository software is Tier 3-capable. Recommendation R6 generalizes this: maintain at least one local clone and one content-addressed copy.

---

### E-0010 — evidence — kernel.org compromised 2011; Linux source not at risk because of distributed Git copies
source_section: §2.2
edges:
  supports: [C-0013, C-0007]
  derivedFrom: [S-0023]

# E-0010 — kernel.org compromised 2011; Linux source not at risk

In August 2011, kernel.org — the canonical hosting site for the Linux kernel — was compromised by attackers who obtained root access on multiple servers and ran modified versions of OpenSSH and other utilities (S-0023).

The compromise of the central distribution point did not compromise the source code. Thousands of developers held independently verifiable Git clones of the kernel repository. The cryptographic hash chain Git maintains over its commit history made tampering with any single clone immediately detectable: a modified commit produces a different hash, breaking the chain. The kernel community could verify against any clone whether what was on a specific server matched the trusted history.

This is the architectural property C-0007 asserts: integrity is mathematically verifiable rather than procedurally trusted. The kernel.org event is the strongest available natural experiment in the difference between Tier 1 (trust the host) and Tier 3 (verify by inspection). The same compromise on a Tier 1 archive would have been a preservation event because tampering could not have been independently detected. On Git's content-addressed substrate, the compromise was a security incident at a distribution point; the source itself was structurally protected.

The case is also empirical evidence that the architectural property is not academic. The Linux kernel is among the most consequential open-source artifacts in computing history; its survival of an active attack against its central host is a demonstration that the architecture works under adversarial pressure.

---

### E-0011 — evidence — Median PhD time 7.3 years; postdoc avg 4.5 years; 15-23% tenure-track placement
source_section: §3.1
edges:
  supports: [C-0017]
  derivedFrom: [S-0026]

# E-0011 — Researcher career timelines guarantee turnover

NCSES *Survey of Earned Doctorates: 2023* and supporting career-trajectory studies establish:
- Median total time from grad school start to PhD: 7.3 years.
- ~43% of PhD candidates have not completed within ten years (Council of Graduate Schools 2008).
- Median postdoc duration: 4.5–4.6 years (Kahn & Ginther 2017; Woolston 2020).
- ~15-23% of postdocs eventually secure tenure-track placement, depending on field.

The implication for research data preservation: the person who understands a dataset's content, format, and storage location is, on average, within a few years of leaving the institution that holds it. The architectural fix C-0017 calls for is preservation independent of any one researcher's continued participation; the demographic data here is the empirical input that makes "personnel turnover as preservation event" a steady-state property rather than an exceptional case.

---

### E-0012 — evidence — 65% of popular GitHub projects have bus factor ≤ 2
source_section: §3.1
edges:
  supports: [C-0017]
  derivedFrom: [S-0027]

# E-0012 — 65% of popular GitHub projects have bus factor ≤ 2

Avelino, Passos, Hora and Valente 2016 analyzed 133 popular GitHub projects and found that **65% had a truck factor (bus factor) ≤ 2** — meaning that two contributor departures would leave the project effectively unmaintained.

The "popular GitHub project" sample is not a worst case; it is a sampled distribution of projects with active community engagement and substantial codebase scale. The bus-factor concentration measures contributor structure, not project quality. The same concentration applies, with stronger force, in academic research where authorship structures are typically smaller and contributor turnover (C-0017) is structurally guaranteed.

This is one of the few systematically-measured studies of operational concentration in software projects, and it generalizes by analogy to research data: the data underlying most published papers is maintained by a small number of people, and the loss of any one of them is a high-probability preservation event.

---

### E-0013 — evidence — HLRS Stuttgart — 57 of 262 user accounts de-registered, ~619 TB orphaned
source_section: §3.1
edges:
  supports: [C-0017]
  derivedFrom: [S-0028]

# E-0013 — HLRS Stuttgart orphaned-data measurement

Schembera and Durán 2020 audited the High-Performance Computing Center Stuttgart's tape archive (state of December 1, 2017) and identified **57 of 262 user accounts** as de-registered, having left behind approximately **619 terabytes** of dark data without active stewardship.

The measurement is one of the few institutional-scale audits of orphaned research data with named numbers. It illustrates the C-0017 mechanism at a single supercomputing center: roughly 22% of accounts are orphaned at any given time, and the data they hold is in administrative limbo — neither preserved with continued metadata stewardship nor cleared, with no clear party responsible for either disposition.

The Schembera-Durán paper introduces the "Scientific Data Officer" role as one institutional response. The architectural reading developed in C-0017 frames the problem differently: institutional infrastructure should not depend on a continued role at all; preservation should be a property of the deposit, not of the deposit-account ownership.

---

### E-0014 — evidence — Agh 2009 Artemia — laptop theft destroyed only copy of irreplaceable dataset
source_section: §3.2, §5.3.1
edges:
  supports: [C-0018]
  derivedFrom: [S-0056, S-0057, S-0058]

# E-0014 — Agh 2009 Artemia: laptop theft destroyed only copy

Agh et al. 2009 (S-0056) characterized six populations of the brine shrimp *Artemia* from Iranian salt lakes across 19 morphometric variables, demonstrating 85.9% correct classification to source population on morphology alone, and 100% separation of the bisexual *Artemia urmiana* (endemic to Urmia Lake) from the parthenogenetic populations.

The raw data — 19 morphometric variables across individuals from six Iranian populations — was lost when a laptop containing the dataset was stolen (T. Vines, pers. comm., 2026). No backup survived.

The Iranian populations cannot be re-sampled. Urmia Lake has lost approximately 88% of its surface area by the mid-2010s under upstream agricultural diversion and drought (S-0058). The pre-collapse salinity, temperature, and hydrological conditions under which the six populations were sampled cannot be reconstructed. *A. urmiana* has collapsed in its type locality. Re-sampling today produces measurements from a transformed ecosystem, not a replacement dataset.

This is the single-event variant of C-0018: a Tier 0 storage configuration (laptop with no off-device backup) intersected an ordinary criminal event and produced permanent loss of an irreplaceable scientific record. The case is developed in detail in §5.3.1 as a worked-example application of the M-0003 four-term liability formula.

---

### E-0015 — evidence — Kyoto University December 2021 — buggy backup script deleted 77 TB across 14 research groups
source_section: §3.2
edges:
  supports: [C-0018]
  derivedFrom: [S-0029]

# E-0015 — Kyoto University 77 TB loss

In December 2021, a routine software update at Kyoto University's supercomputing center (IIMC) interacted badly with the center's backup scripts and deleted approximately **77 terabytes** of research data across **34 million files** belonging to **14 research groups**. The buggy update executed December 14-16, 2021. Approximately 28 TB across 25 million files belonging to **four** of the fourteen groups was the only copy the center held; that fraction is permanently lost (S-0029).

The case is the cleanest available demonstration of C-0018: the backup script and the data it was meant to protect executed in the same software context. A single administrative action (the buggy script update) reached both. There was no protection because the architecture did not provide an independent failure domain between the primary copy and the backup.

The institutional response (post-incident apology, process change, software auditing) addresses the proximate cause but not the architectural property that made the proximate cause catastrophic. A backup that shares a software failure domain with the data is not a backup; the cure is independence at the protocol layer (M-0002), not better software auditing.

---

### E-0016 — evidence — Brazil National Museum fire 2018 — ~18.4M of 20M items destroyed
source_section: §3.2
edges:
  supports: [C-0018]
  derivedFrom: [S-0030]

# E-0016 — Brazil National Museum fire 2018

On September 2, 2018, the National Museum of Brazil in Rio de Janeiro burned. Approximately **18.4 million of 20 million items** were destroyed, including 200 years of scientific archives, field records, expedition logs, and irreplaceable catalog data accumulated across decades of Brazilian and international research. The destroyed records included documentation underlying substantial portions of Brazilian natural history, linguistics, and anthropology (S-0030).

The proximate cause was an electrical fault. The architectural cause was that there were no off-site copies of most of the archival material. The museum's annual maintenance budget had collapsed to ~$13,000 in 2018, against the $128,000 the museum required and had not received in any year since 2014. The fire was the trigger; the architecture was what made the fire catastrophic.

This is the extreme variant of C-0018: a single physical failure domain held the only copy of two centuries of accumulated scientific record, and a single physical event reduced it to ash. The event is unrecoverable — there is no funding mechanism that can re-create the destroyed record. Tier 3 architecture would not have prevented the fire; it would have prevented the fire from being a preservation event.

---

### E-0017 — evidence — NIH 2,291 grants ($2.45B) and NSF 1,752 grants ($1.4B) terminated Feb-Aug 2025
source_section: §3.3
edges:
  supports: [C-0019]
  derivedFrom: [S-0031]

# E-0017 — NIH and NSF mass grant terminations 2025

Between February and August 2025, the National Institutes of Health terminated **2,291 active grants**, withdrawing **$2.45 billion** in committed funding and disrupting **383 clinical trials with more than 74,000 enrolled participants**. The National Science Foundation terminated **1,752 grants** totaling roughly **$1.4 billion** in the same window, with the STEM Education Directorate alone losing 839 grants worth $888 million (S-0031).

Proposed FY2026 reductions extend the pattern: NSF approximately **−56%** from the FY2025 enacted level of $9.06 billion, NOAA approximately **−24%**, ARPA-E approximately **−57%** (S-0031, S-0034).

Every long-term dataset funded under those grants entered C-0019's mechanism. The data infrastructure they paid for — server contracts, repository hosting, data-curation staffing — lapsed with the funding. The cumulative consequence has not yet been measured because the events are recent; the structural prediction from C-0019 is that a substantial fraction of the affected datasets will enter the failure modes of §3.1 and §3.4 within five years of termination.

This is the largest documented funder-driven preservation event in U.S. research history, and the architectural prediction is that its data-loss consequences will compound across the next decade unless the affected institutions deploy preservation independent of the originating grants.

---

### E-0018 — evidence — NOAA Billion-Dollar Disasters database stopped updating; Mauna Loa CO₂ record proposed for defunding
source_section: §3.3
edges:
  supports: [C-0019]
  derivedFrom: [S-0032]

# E-0018 — NOAA Billion-Dollar Disasters and Mauna Loa

The National Oceanic and Atmospheric Administration's **Billion-Dollar Disasters** database tracked $2.9 trillion in U.S. climate disaster costs since 1980 (403 disasters). NOAA retired the database in May 2025 — no updates beyond 2024 (S-0032).

**Mauna Loa Observatory** maintains the 68-year continuous atmospheric CO₂ record that began in 1958 — the longest continuous CO₂ measurement series on Earth and the empirical anchor of the global climate-change record. The FY2026 budget request proposed elimination of the NOAA Office of Oceanic and Atmospheric Research, which would defund Mauna Loa entirely (S-0032).

Both are direct, named cases of C-0019: research data infrastructure abandoned when the funding line is cut. Neither dataset is technically difficult to preserve. The architectural failure is that both depend on a single agency's continued line-item funding. Tier 3 preservation across multiple universities and institutions could keep the records readable and verifiable independent of agency budget action.

The cases also illustrate that "long-term dataset" includes irreplaceable instrumental records: Mauna Loa cannot be re-collected because the conditions of 1958 cannot be reassembled. The asset is a 68-year cumulative capital that ceases to grow if measurements stop.

---

### E-0019 — evidence — ~3,400 datasets removed from Data.gov and 14 NOAA datasets decommissioned by Feb 2025
source_section: §3.3
edges:
  supports: [C-0019, C-0020]
  derivedFrom: [S-0033]

# E-0019 — Data.gov dataset removals and NOAA decommissioning

By February 21, 2025, **~3,379 datasets** had been removed from Data.gov (308,000 → 304,621), alongside **>8,000 web pages** modified. NOAA decommissioned **14 datasets** covering earthquakes, marine science, and coastal systems (S-0033).

The removals are documented by the Environmental Data and Governance Initiative (EDGI), the Data Rescue Project, and Harvard Law School Library Innovation Lab's Data.gov archive project — independent rescue efforts that mirrored what they could before the removals propagated.

The case sits at the intersection of C-0019 (funding-driven termination) and C-0020 (state-action access restriction). The proximate trigger is the FY2025 federal administration change; the architectural property is that 14 NOAA datasets were held in a single failure domain (NOAA's own infrastructure) and thus removable by single administrative action.

The rescue projects are themselves a Tier 3 response: independent volunteer mirrors, content-addressed snapshots, off-jurisdiction replicas. The presence of the rescue activity at this scale demonstrates both the failure mode and the architectural fix in the same event.

---

### E-0020 — evidence — 191 of 411 long-term mammal studies terminated; 63-year marmot record cut
source_section: §3.3
edges:
  supports: [C-0019]
  derivedFrom: [S-0034]

# E-0020 — Long-term ecological studies terminated

Blumstein 2025 analyzed **411 long-term mammal studies** and found that **191 had been terminated**. Among the cases is a **63-year yellow-bellied marmot time series** at Rocky Mountain Biological Laboratory rejected for future funding on the explicit grounds that it had "too much data" (S-0034).

The marmot case is illustrative of the deeper structural problem. A 63-year continuous mammal-population time series is exactly the kind of record that becomes more valuable as it accumulates — for disease ecology, conservation genetics, climate response, and population dynamics modeling. The funding decision treated long duration as a liability rather than an asset, which is what happens when the funding mechanism is grant-cycle scoped (3-5 years) and the dataset is decade-scoped.

Recommendation R5 (fund preservation through facilities-and-administrative cost recovery) is the operational response: align the duration of funding with the duration of preservation need. The 191 terminated studies are the empirical input for that recommendation.

This is also the strongest single piece of evidence for C-0019's claim that long-term datasets are cumulative capital assets: the ones being terminated are not failed projects, they are scientific infrastructure that the funding mechanism is structurally unable to maintain.

---

### E-0021 — evidence — NASA Astronomical Data Center terminated 2002 with no formal successor
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0035]

# E-0021 — NASA ADC closure 2002

The NASA Astronomical Data Center, a federally funded archive of stellar, galactic, and extragalactic catalogs operated by NASA Goddard Space Flight Center for **25 years**, was terminated in October 2002 after NASA determined that its services "sufficiently overlap those provided by [other services] to allow termination" (S-0035).

Users were redirected informally to the Centre de Données astronomiques de Strasbourg, with no formally designated successor and curation responsibility fragmented across multiple independent services.

This is C-0020's discontinuation pattern at the federal-agency scale. Even a federally-funded national archive in active scientific use was terminated on a single agency's strategic decision. The redirect mechanism was informal — there was no preservation contract enforceable against future erosion. The data has continued to be accessible through CDS and other follow-on services, but the architectural property holds: a single organizational decision determined the data's continued availability, and the institution that made that decision had no continuing obligation to maintain access.

The 25-year operational life sits well above the §3.4 median of 12 years (E-0006) but is still well below the timescales scientific archives are usefully measured against.

---

### E-0022 — evidence — UK Arts and Humanities Data Service closed 2008 at 12-year median
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0036]

# E-0022 — AHDS closure 2008

The Arts and Humanities Data Service — a United Kingdom national service operating five domain centers in archaeology, history, literature/languages/linguistics, performing arts, and visual arts — closed on **March 31, 2008**, exactly at the 12-year median documented in E-0006. The closure followed a vote by the Arts and Humanities Research Council to discontinue co-funding despite community opposition (S-0036).

The disposition of the holdings was uneven:
- Archaeology and history collections were absorbed by successor services at the University of York and the University of Essex.
- Visual arts collections continued as VADS at the University for the Creative Arts.
- **Performing arts collections had no direct successor**, and their long-term accessibility has been uneven.

The case is C-0020's discontinuation pattern at the national-service level. National designation, dedicated funding, and explicit preservation mission were each insufficient to prevent closure once the funding decision was made. The 47% no-migration figure from E-0006 is illustrated unevenly here: most collections found a successor, one did not.

The architectural reading: a service that depends on a single funder's continued decision is one decision away from termination, regardless of how mission-critical the service is or how active its user community is.

---

### E-0023 — evidence — BIIACS social-sciences repository went dark December 2023 despite "perpetuity" pledge
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0037]

# E-0023 — BIIACS shutdown 2023

The Banco de Información para la Investigación Aplicada en Ciencias Sociales — a social sciences repository hosted by the Centro de Investigación y Docencia Económicas in Mexico City across political science, economics, jurisprudence, and geography — obtained Data Seal of Approval certification in 2013 with an explicit pledge of **"perpetuity of the data."** It went dark on **December 15, 2023**. Its persistent identifiers no longer resolve, and no successor repository has been named (S-0037).

The case is the strongest counterexample to the claim that formal certification is a reliable indicator of long-term preservation. Federal funding (the host institution is federally funded), national-service designation, and Data Seal of Approval certification with an express durability pledge each proved insufficient to prevent closure under organizational conditions that produced the aggregate statistic in E-0006.

The pledge of "perpetuity" was operationally meaningless because the architecture supplying it was Tier 1: a single institutional repository at a single host. C-0011's Claim — Tier 1 is one organizational decision away from the same outcome as Tier 0 — is realized in this case, on a 10-year timeline, despite the strongest formal preservation commitments available in the certification regime.

The architectural fix is not a stronger pledge; it is preservation that does not depend on a pledge.

---

### E-0024 — evidence — Twitter eliminated free academic API Feb 2023; 33,306 studies built on Twitter data
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0038]

# E-0024 — Twitter API termination

In February 2023, Twitter eliminated its free academic research application programming interface. A subsequent analysis identified **33,306 studies** across **8,914 venues** and **610,738 citations** that had been built on Twitter data, with **over 100 active research projects canceled, halted, or pivoted** (S-0038).

A single platform's access decision reshaped a subfield of computational social science within months.

The case is C-0020's access-restriction-without-closure pattern at sectoral scale. The platform did not shut down. The data was not technically lost. The mechanism by which researchers had been accessing it was withdrawn, and the research that had been built on that mechanism became unrunnable on its previous footing. Tier 1 access is, in the relevant sense, also access — and access can be withdrawn without affecting the underlying data's existence.

The architectural reading: research that depends on continued access through a single API is one business decision away from termination, regardless of whether the underlying data continues to exist somewhere. Tier 3 alternatives — content-archived snapshots, federated mirrors, off-platform research collections — would have preserved continuity for the studies that pivoted.

---

### E-0025 — evidence — GISAID suspended researcher accounts in 2023 and revoked Open Access designation
source_section: §3.4, §6.2
edges:
  supports: [C-0020]
  derivedFrom: [S-0039]

# E-0025 — GISAID 2023 access suspensions

The Global Initiative on Sharing All Influenza Data (GISAID) was the primary platform for COVID-19 genomic surveillance, with submissions from over 200 countries and territories and over 16.5 million SARS-CoV-2 sequences as of 2024.

In **2023**, GISAID suspended individual researcher accounts after publications critical of the platform's origin narrative — including the Scripps group that flagged a discrepancy in the original SARS-CoV-2 submission and the international team that published the Wuhan market origin analysis. In **2025**, GISAID terminated data feeds to critical surveillance tools including **Nextstrain, Outbreak.info, and CoV-Spectrum**. The research data repository registry **re3data subsequently reclassified the platform from open-access to restricted-access** (S-0039).

The case is C-0020's "governance turning adversarial" pattern at the platform that hosted the most consequential infectious-disease genomic surveillance dataset of the decade. The technology continued to operate; the governance, centralized under a single founder, determined which parts of its user community lost access for which reasons.

GISAID is the §6.2 counterpoint to INSDC: identical technical capability, opposite governance pattern. The contrast establishes that Tier 2 resilience depends on the consortium operating correctly under transparent governance, and that single-organization centralization within Tier 2 carries the same vulnerability the paper attributes to Tier 1.

---

### E-0026 — evidence — China National Knowledge Infrastructure cut off foreign subscribers April 2023
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0040]

# E-0026 — CKNI cross-border restriction April 2023

In April 2023, the China National Knowledge Infrastructure — the dominant aggregator of Chinese-language scholarship, serving approximately **1,600 institutional subscribers outside mainland China** — cut off foreign subscribers from its dissertations, master's theses, conference proceedings, statistical yearbooks, and population census databases under the Data Security Law's cross-border data transfer review.

Researchers at named institutions including Georgetown and the University of Notre Dame lost forward access to primary material in China studies, demography, economics, and law (S-0040).

The mechanism is state action via cross-border data law, not platform business decision. The architectural property is the same: research that depends on continued access through a single national platform is one regulatory action away from termination. The 1,600 affected institutions had no operational recourse; the data did not become technically unavailable, but the access route under which it had been usable for research was withdrawn.

The case is one of the cleanest demonstrations that the M-0001 Tier 1 vulnerability includes jurisdictional exposure as a primary failure mode, not just an edge case. Any research-data deposit on a single foreign-jurisdiction platform inherits the jurisdictional risk of that platform's national context.

---

### E-0027 — evidence — CERN terminated Russia/Belarus cooperation Nov 2024; ~500 scientists expelled
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0041]

# E-0027 — CERN ended Russia/Belarus cooperation 2024

In November 2024, CERN terminated its cooperation with Russian and Belarusian institutions under European Union and Swiss sanctions following the 2022 invasion of Ukraine. Approximately **500 scientists affiliated with Russian institutions** were expelled from LHC experiments, alongside a smaller cohort affiliated with Belarusian institutions whose contracts had ended earlier in 2024 (S-0041).

The action ended decades of direct Russian-state participation in the world's largest particle physics collaboration.

The case sits at the intersection of state action (sanctions regime), institutional decision (CERN's response to the regime), and access restriction. Researchers' continued participation in active experiments was determined by the geopolitical context of their institutional affiliation. Data those researchers had contributed to or relied on remained in CERN's hands; their ongoing research access was withdrawn.

This is a less-pure form of C-0020 (the data is still preserved on CERN's Tier 2 infrastructure), but it illustrates a closely related architectural property: research collaboration that depends on continued mutual access between institutions across jurisdictional boundaries is exposed to the jurisdictional regime's evolution. The Tier 3 architectural response — collaborator-side mirrors of relevant data, content-addressed snapshots, federated alternative compute paths — is independent of any host institution's bilateral relationship with any partner government.

---

### E-0028 — evidence — UK Biobank moved to metered cloud-only access in 2023-24, ~doubling project costs
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0042]

# E-0028 — UK Biobank pricing transition

UK Biobank — a UK research charity serving over **30,000 approved researchers worldwide** — transitioned during 2023 and 2024 from bulk data download to a **cloud-only research platform metered per-analysis**, on top of an existing **£9,000 three-year access fee** (S-0042). Members of the neuroscience community publicly reported that their research project costs would approximately **double** under the new model.

The case illustrates that "access" is a graduated property, not binary. UK Biobank did not shut down; it did not block any approved researcher. It changed the operational model under which the data is accessible, in a direction that imposes substantial new continuing costs on every research project that uses the platform. For underfunded labs, the new costs are equivalent to access loss.

This is C-0020's affordability variant: the platform persists, the access mechanism persists, but the cost structure changes on a timeline the research community does not control. The architectural response is not "negotiate harder with UK Biobank" — UK Biobank's cost transition reflects real operational economics of cloud compute. The architectural response is to maintain off-platform copies of relevant slices when permitted, and to architect research workflows so that no single platform's pricing change can double project costs without alternatives.

UK Biobank specifically permits export under approved terms; the operational question is whether downstream researchers exercise that permission as a standard practice or only after the cost shift forces them to.

---

### E-0029 — evidence — Elsevier acquired Bepress 2017; >500 universities' OA infrastructure under publisher ownership
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0043]

# E-0029 — Elsevier-Bepress acquisition 2017

When **Elsevier acquired Bepress in 2017**, more than **500 universities** discovered that their institutional repository infrastructure — which many had built specifically to circumvent commercial publishers — was now owned by a commercial publisher (S-0043).

The acquisition did not require a shutdown. Ownership alone is sufficient to control the terms of preservation for every dataset and paper the platform holds. The institutional repositories continued to operate; the entity setting the strategic direction for them changed without any technical disruption.

This is the C-0020 commercial-capture pattern at sectoral scale. 500+ universities found themselves on the wrong side of a single corporate transaction they did not anticipate and could not block. The remediation cost — migrating institutional repositories, re-establishing equivalent infrastructure — was substantial; many universities did not migrate, accepting the changed ownership rather than absorbing the cost.

The case is foundational evidence that C-0011's "one organizational decision away" Claim applies to acquisitions and ownership changes, not just to closures. The institutional repository as a Tier 1 deployment inherits the strategic direction of whichever entity owns it, and that ownership can change on quarterly business timelines while the underlying infrastructure appears continuous.

---

### E-0030 — evidence — Mendeley Desktop EOL 2022; 2018 update lost user PDFs and annotations
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0044]

# E-0030 — Mendeley shutdown / Elsevier acquisition

Elsevier's acquisition of Mendeley produced two distinct losses for the research community:

1. A **2018 update** caused users to lose PDFs and annotations curated inside the application. The update reorganized internal data structures in a way that broke prior data. Mendeley issued patches and partial recovery tools, but a fraction of users' annotated libraries was permanently lost.
2. **End-of-life of Mendeley Desktop in September 2022**, four years after the 2018 incident. Researchers using Mendeley Desktop as their primary reference manager were forced to migrate or accept feature regression in the cloud-based replacement.

The case demonstrates two distinct C-0020 mechanisms operating on the same platform: (a) data integrity loss through software change pushed by the platform owner; (b) discontinuation of a major research workflow tool on the platform owner's strategic timeline.

The annotations-loss incident is rarely cited as a research-data preservation event because the affected data was metadata about papers (notes, highlights, organizational tags), not the papers themselves. From the user's perspective, the value is in the curation; the loss of the curation is the loss of accumulated research labor. The architectural reading: a research workflow that depends on a single proprietary application's continued operation, with no export path that fully preserves curation state, is exposed to both the application's continued existence and to disruptive updates within its lifetime.

---

### E-0031 — evidence — Academia.edu paywall escalated $99→$498/year; 40% of users in developing nations
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0045]

# E-0031 — Academia.edu paywall escalation

Academia.edu launched as a free platform in 2008. It added a $99/year premium tier in 2016 and has raised prices annually since. Reports in 2026 place the rate at approximately **$498/year**, with **40% of its users in developing nations** where the paywall is most exclusionary (S-0045).

The case illustrates that the affordability dimension of C-0020 disproportionately hits researchers in lower-resource regions. A platform that begins free and gradually shifts critical functionality behind escalating paywalls produces a structural exclusion that does not show up in formal "access" measurements. Researchers technically retain access; functionally, the access is restricted to those who can afford the escalating fee.

The 40% figure is the equity dimension of the architectural argument: Tier 1 platforms governed by a single commercial entity make pricing decisions that affect every user identically, regardless of resource context. The same fee that is a rounding error at a U.S. R1 is exclusionary at an underfunded institution.

The architectural reading: research-infrastructure access that scales with platform pricing is one pricing decision away from exclusion. Tier 3 alternatives where the cost structure is participant-side (institutional servers, federation, content-addressed mirrors) do not have this property.

---

### E-0032 — evidence — Elsevier and Springer route TDM through gated APIs; institutional contract violations reported
source_section: §3.4
edges:
  supports: [C-0020]
  derivedFrom: [S-0046]

# E-0032 — Publisher-gated TDM

Elsevier and Springer Nature route text-and-data-mining (TDM) access to their combined **5,500+ journals** through publisher-gated application programming interfaces under click-through licenses that:

- Cap mining rate
- Restrict republishing of derivative outputs
- Assert publisher rights over derivative outputs

Elsevier has reported **institutional contract violations** to universities when researchers attempted bulk download through standard subscribed access (S-0046).

The case extends C-0020 from "access can be discontinued" to "access can be partitioned into operationally restrictive sub-categories." The journals are still accessible. The act of computationally analyzing them — increasingly central to AI-era research workflows — is governed by separate restrictive licenses that override the institutional subscription's nominal rights.

The contract-violation reporting mechanism shows that the publishers actively police the access boundary. Researchers who exceed the publisher's allowed pattern face institutional consequences (their university hears about the violation), which produces self-censorship at the laboratory level.

The architectural reading: research workflows built on commercially-licensed text corpora inherit the commercial licensor's evolving restrictions on use. The Tier 3 alternative — corpora archived under open licensing, content-addressed snapshots, federated TDM-friendly substrates — is the only architectural posture that decouples research method from publisher business decisions.

---

### E-0033 — evidence — Nature survey of 1,576 researchers — >70% failed to reproduce others' experiments
source_section: §4.1
edges:
  supports: [C-0022]
  derivedFrom: [S-0047]

# E-0033 — Nature reproducibility survey

A *Nature* survey of **1,576 researchers** found that more than **70%** had failed to reproduce another scientist's experiments, and more than **50%** had failed to reproduce their own (S-0047).

The respondents are self-selected (they engaged with a *Nature* survey on reproducibility), which biases toward researchers thinking about reproducibility in the first place. The result is therefore a directional rather than a population estimate, but it is a directional estimate at the upper bound of plausibility — the population of researchers most attentive to reproducibility includes 70% who have hit the wall personally.

The case is empirical input for C-0022. Reproducibility failures, as experienced by the people doing science day-to-day, are not edge cases; they are the modal experience.

---

### E-0034 — evidence — Amgen — 11% replication success of 53 landmark cancer biology studies
source_section: §4.1
edges:
  supports: [C-0022]
  derivedFrom: [S-0048]

# E-0034 — Amgen replication of cancer biology

Amgen's hematology and oncology team attempted to replicate **53 landmark preclinical cancer studies** and succeeded on **6** — an **11% success rate** (S-0048).

The studies were not random. They were the foundational cancer biology that was guiding drug development at major pharmaceutical companies. The 11% figure is therefore a measurement of the reliability of the most consequential preclinical literature, not of mediocre work selected for failure analysis.

The case is one of the strongest empirical inputs for C-0022. The architectural reading: replication attempts that failed when raw data was unavailable terminated as inconclusive because the diagnostic step (examine the original measurements) was unavailable. Even where replication clearly failed for methodological reasons, the inability to inspect the original data prevented diagnosis of *which* methodological reason. The 89% failure rate compounds across decades of pharmaceutical R&D investment.

---

### E-0035 — evidence — Molecular Brain — 97% of authors couldn't produce raw data; 21 papers withdrawn
source_section: §4.1
edges:
  supports: [C-0022]
  derivedFrom: [S-0049]

# E-0035 — Molecular Brain raw-data audit

When the editor of *Molecular Brain* asked **41 authors** of submitted manuscripts to produce the raw data behind their results, **97% could not**, and **21 of the papers were withdrawn** (S-0049).

The 41-paper sample is small but the methodology is direct: papers were already in the editorial pipeline at a peer-reviewed journal; the editor asked authors to produce the underlying data; nearly every author failed.

The 21-paper withdrawal rate is the operational consequence: in the editorial workflow, when raw data is asked for and cannot be produced, papers are withdrawn rather than published. The case is a microcosm of what happens when verification is enforced at scale: the publication funnel narrows substantially, because the underlying data infrastructure does not support a verification-based regime.

The architectural reading: in the steady state, the gap between "results produced" and "raw data inspectable" is the 97% figure here. Most papers fall through the gap by default; the 21 withdrawals here became visible only because the editor asked.

---

### E-0036 — evidence — Stern et al. 2014 — NIH-funded retracted papers carry $392,582 mean attributable cost
source_section: §4.1, §5.3.2
edges:
  supports: [C-0022, C-0005]
  derivedFrom: [S-0050]

# E-0036 — Stern et al. 2014 retraction cost analysis

Stern, Casadevall, Steen and Fang 2014 measured the mean attributable cost of retracted NIH-funded papers at approximately **$392,582** per retraction, with a peer-reviewed median of **$239,381**, against an aggregate of **~$46.9 million** in unadjusted NIH funding across retracted papers from 1992-2012 (S-0050).

The distribution is right-skewed (the median is below the mean), so the median is the conservative estimate for per-paper retraction cost. The methodology attributes funding to retraction by direct cost — not by total grant value — and is therefore conservative.

The figures are critical inputs to two parts of the paper:
1. C-0022 (reproducibility cost): retraction is one mechanism by which non-reproducible work is eventually withdrawn from the literature, and Stern's measurement is the strongest available estimate of what each such withdrawal costs.
2. C-0005 / M-0003 Term A: the sunk-grant value attributable to a single unverifiable paper is anchored on Stern's figures when grant-specific data is unavailable.

The cost is conservative because it captures direct NIH funding only, not downstream policy decisions, follow-on research, regulatory products, or the citation cascade the retracted paper had triggered before withdrawal.

---

### E-0037 — evidence — 74% of published R analysis files fail to execute without error
source_section: §4.1
edges:
  supports: [C-0022]
  derivedFrom: [S-0051]

# E-0037 — Published R code execution failure rate

A large-scale analysis of published research code found that **74% of R files fail to complete without error**, and **56% still fail after automated cleaning** (S-0051).

The figures measure code reproducibility, which is a tighter standard than data reproducibility — code can in principle be re-executed; data must be re-collected. That 74% of published R analysis files cannot be executed without error means the analysis cannot be re-run from the published artifact, even when the underlying data is available.

The 56%-after-cleaning figure shows that the failures are not entirely environmental drift (library versions, R versions, OS-specific quirks). After automated cleaning, a majority still fails — meaning the code as published is not capable of producing the published result.

The case is empirical input for C-0022 at the *code* layer of the reproducibility crisis. The architectural fix at this layer is content-addressed code (Git, Software Heritage), which the paper develops in §2.5 and §11.6 (R6).

---

### E-0038 — evidence — Pew Research — 25% of webpages 2013-2023 are gone; 38% at 10 years
source_section: §4.2
edges:
  supports: [C-0023]
  derivedFrom: [S-0052]

# E-0038 — Web decay rates

A Pew Research Center analysis found that **25% of all webpages from 2013 to 2023 are already gone**, rising to **38% for pages a decade old** (S-0052).

These are not specialized scientific webpages; they are the open web. The decay rate is the baseline for any preservation argument involving web-cited references. Citations from the scholarly literature to the open web inherit this decay rate by default, since most are Tier 1 from the perspective of the cited content (one URL, one host, one organizational decision).

The case is empirical input for C-0023. The architectural reading: scholarly citation that depends on continued web availability of the cited content is one organizational decision away (per cited URL) from breaking. Tier 3 alternatives — content-addressed snapshots, Internet Archive captures, distributed mirrors — produce citation durability as a structural property rather than as a hope against the documented decay rate.

---

### E-0039 — evidence — One in five scientific articles suffers reference rot; 7-in-10 web-citing have compromised context
source_section: §4.2
edges:
  supports: [C-0023]
  derivedFrom: [S-0053]

# E-0039 — Scientific reference rot

An analysis of 3.5 million scientific articles and approximately one million Uniform Resource Identifiers found:

- **One in five scientific articles** suffers reference rot.
- Among articles that cite web content, **seven in ten** have compromised scholarly context (S-0053).

The figures measure the cost of reference rot at the scholarly-record level. Reference rot here is not the failure of a citation in isolation; it is the failure of citations to communicate the context in which the citing claim was made.

When 70% of web-citing articles have compromised context, the cumulative effect on the scholarly record is that the chain from claim to evidence breaks at a substantial rate even within published, peer-reviewed literature. Future researchers can read the citing article, see the web URL, and find that the URL no longer points to what it once did — or to anything at all.

The case is one of the strongest available inputs for C-0023. The architectural fix is content addressing of cited material; the W3C Robust Link standards, perma.cc, Internet Archive, and Tier 3 distributed archives each address it through different mechanisms.

---

### E-0040 — evidence — Harvard Law Review — >70% of URL citations 1996-2012 no longer resolve
source_section: §4.2
edges:
  supports: [C-0023]
  derivedFrom: [S-0054]

# E-0040 — Harvard Law Review URL decay

A study of legal scholarship found that **more than 70%** of URLs cited across a sample drawn from the *Harvard Law Review* and two other Harvard journals between **1996 and 2012** no longer resolve to the originally cited content (S-0054).

The case is empirical input for C-0023, with two specific properties that strengthen the argument:

1. **The corpus is high-prestige.** *Harvard Law Review* is among the most-cited law publications. The 70% rot rate among its citations indicates that web-citation reliability does not improve at the upper end of the prestige distribution.
2. **The 1996-2012 timeframe is generous.** Citations from 2012 had only a few years to rot; citations from 1996 had nearly two decades. The aggregate of 70% rot across a 16-year span tracks the same decay curve as Pew's findings (E-0038) but applied to specifically scholarly citations.

Legal scholarship has responded with the perma.cc service (Harvard LIL) which content-addresses cited URLs at the time of citation. The architectural model — content-address at the moment of use — is exactly the Tier 3 fix the paper recommends generalizing across the scholarly record.

---

### E-0041 — evidence — Duke University $112.5M FCA settlement (March 2019) — largest university FCA payment
source_section: §5.3.2, §5.4
edges:
  supports: [C-0005, C-0025]
  derivedFrom: [S-0065]

# E-0041 — Duke / Potts-Kant FCA settlement

In March 2019, Duke University paid **$112.5 million** in a False Claims Act settlement related to grant applications and progress reports submitted to the National Institutes of Health and the Environmental Protection Agency, involving falsified data attributed to lab analyst Erin Potts-Kant (S-0065). It was the **largest False Claims Act payment by a university**.

The case priced scientific fraud rather than architectural data unavailability. The FCA mechanism applied because the certifications attached to the grant submissions were knowingly false, satisfying the Act's "knowing or reckless disregard" standard.

The case is critical evidence for C-0025 / M-0003 Term D. It establishes:
1. The settlement range for institutional misconduct under FCA at university scale ($112.5M is the upper anchor).
2. The doctrinal applicability of FCA implied-certification theory to research grant outputs.
3. The political viability of bringing such a case at scale — Duke is among the most prestigious U.S. research universities.

Architectural extension: the doctrinal theory could reach institutions that certify compliance they cannot independently verify, even without intentional fraud. No such case has been brought as of 2026, but the precedent stack would land on adjacent fact patterns at this magnitude if the architectural extension were brought.

---

### E-0042 — evidence — Harvard-Brigham/Anversa $10M FCA settlement (April 2017) — 31 retractions
source_section: §5.3.2, §5.4
edges:
  supports: [C-0005, C-0025]
  derivedFrom: [S-0064]

# E-0042 — Harvard / Brigham / Anversa $10M settlement

In April 2017, Harvard and Brigham and Women's Hospital paid **$10 million** in a False Claims Act settlement on claims related to the Anversa cardiac stem cell research program. The settlement followed (and preceded) **31 papers recommended for retraction** in October 2018 (S-0064).

The case prices the FCA mechanism applied to a long-running fraud-pattern preceded by an extensive retraction cascade. The 31 retractions were themselves a downstream consequence of the misconduct that triggered the FCA action — exactly the pattern Stern et al. 2014 (E-0036) measured at sectoral scale.

For M-0003 Term D, the case provides a lower-anchor on the institutional-tail-risk range. Harvard and BWH are among the most prestigious biomedical institutions in the world; the $10M settlement is not a marginal action but a substantial one against a defendant with significant resources and reputational stake.

The architectural reading: even without architectural FCA extension, the precedent stack establishes that FCA settlements for research-data-related claims at major U.S. universities are routine, not exceptional, on the order of $10M-$100M+ per institutional event. The architectural-extension scenario would land on this established precedent.

---

### E-0043 — evidence — Dana-Farber $15M FCA settlement (December 2025) — most recent precedent
source_section: §5.4
edges:
  supports: [C-0025]
  derivedFrom: [S-0066]

# E-0043 — Dana-Farber December 2025 settlement

In December 2025, the Dana-Farber Cancer Institute settled an FCA case for **$15 million on six NIH grants** under the implied-certification theory (S-0066). It is the **most recent precedent** in the sequence of research-related FCA settlements against major U.S. institutions.

The case is a preview of what fraud-pattern cases settled under the maturing mandate regime look like, not a forecast of architectural cases at scale. But its structure — implied-certification theory applied to NIH grant submissions where compliance representations could not be independently verified — establishes the template the architectural extension would build on.

The 5-year cadence of major settlements (2017 Harvard-Anversa, 2019 Duke, 2025 Dana-Farber) represents a stable enforcement environment rather than a one-off. Each settlement establishes the precedent stack at a rough institutional-event magnitude. The compliance regime now maturing (C-0025) is what determines whether enforcement scales to the architectural fact pattern in subsequent cycles.

For M-0003 Term D, this is the most recent anchor — December 2025 sets the immediate baseline against which 2026-2027 institutional decisions about architectural deployment are made.

---

### E-0044 — evidence — NIH DMS Policy effective Jan 2023 + simpler standardized format effective May 2026
source_section: §5.4
edges:
  supports: [C-0003, C-0025]
  derivedFrom: [S-0067]

# E-0044 — NIH Data Management and Sharing Policy

The National Institutes of Health Data Management and Sharing Policy took effect on **January 25, 2023** as a term and condition of award, enforceable under the same mechanism as any other grant condition. As of October 2024, annual progress reports must document **what data has actually been shared, what repository was used, and by what unique identifier** (S-0067).

A simpler **Data Management and Sharing Plan format** scheduled to take effect for applications due on or after **May 25, 2026** is intended to aid compliance monitoring. The format replaces narrative descriptions with three structured yes/no questions plus a data-type-and-repository table and a privacy attestation for human-subjects data.

The format is forward-looking, designed to make compliance review **machine-actionable**. It does not yet require independent verification that the data described in the plan exists, that it resides at the location the plan specified, that it has not been altered since deposit, or that access controls match the plan's stated terms. But the architectural direction is clear: structured, queryable plans demand structured, queryable infrastructure to back them.

This is the strongest single piece of evidence for C-0025's claim that the funder verification regime is shifting toward programmatic verification. The May 2026 effective date is loaded — institutions with current Tier 1 deposit workflows will face mandate-driven verification queries against architecture that cannot answer them by inspection.

---

### E-0045 — evidence — Gates Foundation contracted OA.Works for programmatic compliance review (Jan 2025)
source_section: §5.4
edges:
  supports: [C-0003, C-0025]
  derivedFrom: [S-0068]

# E-0045 — Gates Foundation OA.Works programmatic compliance

In January 2025, the Gates Foundation contracted **OA.Works** to perform programmatic compliance review at funder scale (S-0068). This is the reference implementation of the verification-shift documented in C-0025 / E-0044 at a major private funder.

OA.Works performs ongoing independent verification of grantee outputs — checking deposit, accessibility, license terms, and machine-readable metadata against grant requirements. The model is automated, continuous, and applies across the foundation's portfolio rather than as a sample audit.

The case is critical because it demonstrates the technical feasibility of programmatic compliance verification at funder scale. Once the operational template is in place at one major funder, the marginal cost of other funders adopting it is lower than building it from scratch — which is the trajectory C-0025 anticipates.

For institutions, the implication is that the Gates Foundation portfolio is a leading indicator. Compliance failures programmatically detected by OA.Works against Gates grants will prefigure compliance failures detected by similar systems against NIH, NSF, and Wellcome Trust grants in subsequent cycles.

R4 (require verifiable evidence rather than self-reported plans) is the operational expression of this evidence at the funder side.

---

### E-0046 — evidence — Adjacent industries already cross verification threshold — SEC, HIPAA, FDA Part 11
source_section: §5.4
edges:
  supports: [C-0025]
  derivedFrom: [S-0073, S-0074, S-0075, S-0076]

# E-0046 — Adjacent-industry verification regimes

Every other industry that handles consequential data has already crossed the verification threshold:

- **SEC Rule 17a-4** mandates 6 years of retention in tamper-proof format with audited disaster recovery. **Over $3.5 billion in fines for records-related failures since 2021** across SEC, CFTC, and FINRA combined (S-0073, S-0074).
- **HIPAA Security Rule** mandates encrypted, redundant backups with tested restoration. Maximum penalties of **$2.19 million per violation in the willful-neglect tier** (S-0075).
- **21 CFR Part 11** requires complete audit trails for any electronic record submitted to the FDA. When **Applied Therapeutics** submitted a new drug application and the FDA discovered that a vendor had **deleted audit trails two days after FDA preannounced its inspection**, the application was **rejected** — unverifiable data was inadmissible regardless of what it showed (S-0076).

Each sector built audit infrastructure before enforcement matured, and each saw enforcement scale rapidly once infrastructure was in place. The historical pattern: SEC Rule 17a-4 preceded the off-channel-communications enforcement wave by more than two decades; HIPAA Security Rule preceded the systematic OCR audit program by approximately a decade; 21 CFR Part 11 was published in 1997 and reached the Applied Therapeutics-style enforcement posture only after FDA inspection capacity caught up.

Research data is at the equivalent point in its own arc: mandate regime in place, legal theory settled, precedent stack on adjacent fact patterns accumulated. The variable that determines when enforcement scales to the architectural fact pattern is institutional audit infrastructure — exactly what this paper argues institutions should build.

---

### E-0047 — evidence — Nature 2025 poll — 75% of US researchers considering leaving the country
source_section: §5.5
edges:
  supports: [C-0026]
  derivedFrom: [S-0078]

# E-0047 — Nature 2025 reader poll on US researcher flight

A 2025 *Nature* reader poll drew more than **1,600 respondents** (the majority of whom were scientists). **75% said they were considering leaving the country**, rising to **79% among postgraduate researchers**, citing funding cuts, firings, and cancelled programs as drivers (S-0078).

The European Commission's "Choose Europe for Science" program — launched May 2025 at €500M and expanded to **~€900M across 100+ national and regional initiatives** — is actively recruiting global research talent during the US disruptions through ERC super-grants, ERA Chairs, and MSCA fellowships (S-0078).

The case is the strongest available empirical input for C-0026 Term E (faculty flight). Two properties strengthen it: (1) the magnitude — 75% considering departure is the sort of figure that, if even partially realized, dramatically reshapes the U.S. research labor market — and (2) the active recruiting context — receiving institutions are moving in real time to capture the displaced researchers, which means the consideration-to-departure conversion has structural enabling conditions.

The 44%-adequate-IT-support figure (E-0057) is the structural explanation for why infrastructure-thin institutions lose this competition: candidates with options choose the institution where the work can be done.

---

### E-0048 — evidence — 8% declared, 2% actual — 2.1M-article compliance gap
source_section: §5.4, §11 R4
edges:
  supports: [C-0003, C-0025]
  derivedFrom: [S-0084]

# E-0048 — Sectoral compliance gap

Across **2.1 million articles**, **8% declared** their underlying data available and **2% actually was** (S-0084). The four-percentage-point gap is the largest available sectoral measurement of the difference between published intention and operational delivery on data sharing.

The gap is the direct quantification of what C-0003 / C-0025 argue is the failure mode the verification regime is converging on. The current mandate regime measures the 8% (plan existence); the verification regime under construction will measure the 2% (plan execution). Institutions whose deposit workflows produce 8%-style declarations without 2%-style follow-through will fail programmatic compliance checks at scale once the verification infrastructure on the funder side matures (E-0044, E-0045).

The figure is also empirical input for R4 (require verifiable evidence rather than self-reported plans). The 4× gap between declaration and delivery is what R4 directly closes by transitioning the reporting requirement from plan to evidence.

The architectural reading: a regime that measures plans rather than execution selects for plan-writing capacity; a regime that measures execution selects for the architecture that can execute. The 8/2 gap is the structural consequence of the former; closing it requires the latter.

---

### E-0049 — evidence — INSDC — 53.9 trillion bases across 3 continents, continuously operational since 1980s
source_section: §6.1
edges:
  supports: [C-0004, C-0012]
  derivedFrom: [S-0012]

# E-0049 — INSDC scale and history

The International Nucleotide Sequence Database Collaboration maintains three mirrored databases on three continents — NCBI (US), EMBL-EBI (UK), DDBJ (Japan) — synchronized daily through a shared Feature Table format (S-0012).

**Key facts:**
- 53.9 trillion bases
- 6.27 billion records
- Continuous operation since the 1980s
- Any single node can go down without data loss because the other two hold complete copies

INSDC is the canonical example of Tier 2 working as intended at scale. Resilience depends on the three institutions continuing to coordinate and fund their operations — exactly the dependency C-0012 identifies. As of 2026 that coordination has held for nearly 40 years, demonstrating that Tier 2 can deliver multi-decade resilience under stable governance.

The case is also useful as a contrast for E-0025 (GISAID): identical technical capability, opposite governance pattern. INSDC's federated 3-institution structure produces the resilience GISAID's centralized single-organization structure does not.

---

### E-0050 — evidence — wwPDB — 4 sites, 50+ years, $23B replacement, 100% of 34 cancer drugs 2019-2023
source_section: §6.1
edges:
  supports: [C-0004, C-0012]
  derivedFrom: [S-0013, S-0081]

# E-0050 — wwPDB

The Protein Data Bank has operated since 1971. Since 2003, four wwPDB partner sites — RCSB PDB (US), PDBe (UK), PDBj (Japan), and BMRB (Wisconsin) — have maintained synchronized copies of the complete archive of over **250,000 experimentally determined 3D structures**, with **estimated replacement cost ~$23 billion** (S-0013).

**100% of 34 new United States Food and Drug Administration-approved low-molecular-weight, protein-targeted cancer drugs between 2019 and 2023 relied on Protein Data Bank data** (S-0081). 88% of 210 new drug approvals 2010-2016 had structural coverage from PDB structures (S-0013a).

The PDB has been continuously preserved for over 50 years; four-site weekly synchronization has secured the present $23 billion archive since 2003.

The case is one of the strongest empirical anchors for Tier 2 working: half a century of continuity, $23B in scientific capital, downstream impact saturating new drug approvals. It is also the strongest empirical anchor for the C-0029 argument: this level of preservation is available to one structural-biology community because that community could afford and organize the consortium. The same architecture is not available to most of research, which is why the C-0002 baseline persists.

---

### E-0051 — evidence — WLCG — 1.5 EB, 170+ sites, 42 countries, 2M+ tasks/day
source_section: §6.1
edges:
  supports: [C-0004, C-0012]
  derivedFrom: [S-0015]

# E-0051 — Worldwide LHC Computing Grid

CERN's Worldwide LHC Computing Grid operates **1.5 exabytes** across more than **170 sites in 42 countries** and processes **over 2 million tasks per day** (S-0015).

The grid is a managed hierarchy with a central coordination layer at CERN, representing **the most sophisticated Tier 2 system ever deployed**. The 170+ participating sites are real failure-domain independence at large scale; the central coordination at CERN is the architectural risk (C-0012's structural dependency).

The case demonstrates two things: (1) Tier 2 architectures can scale to planetary distribution and exabyte storage, and (2) even at this scale, the coordination layer remains a single organizational dependency. The CERN-Russia/Belarus expulsion (E-0027) illustrates the latter — central coordination's terms of participation can change on geopolitical timelines that the participating institutions do not control.

WLCG is the high-water mark of Tier 2 in operational scale; it is also the upper bound on what Tier 2 can produce without the architectural shift to Tier 3.

---

### E-0052 — evidence — NOAA NCEI — 60+ PB across 4 US locations; data confirmed safe after Hurricane Helene 2024
source_section: §6.1
edges:
  supports: [C-0004, C-0012]
  derivedFrom: [S-0082]

# E-0052 — NOAA NCEI

NOAA's National Centers for Environmental Information manage **over 60 petabytes** of environmental data across **four U.S. locations** (S-0082).

When Hurricane Helene struck the centers' Asheville headquarters in **September 2024**, all archived data holdings were confirmed safe. The four-site distribution allowed the system to absorb a major weather event at one site without preservation impact.

The case is an illustration of Tier 2 working under physical-disaster pressure — and simultaneously of the limit C-0012 identifies. The four sites are physically independent, but all four report to the same agency. The FY2026 ~24% NOAA budget proposal (E-0017, S-0031) and the proposed Mauna Loa defunding (E-0018, S-0032) demonstrate that physical independence does not produce organizational independence: a single agency-budget decision can affect all four sites simultaneously, in a way that no hurricane can.

The case is therefore evidence both for Tier 2's success (Helene survival) and for its structural limits (single-agency budget exposure). The architectural fix C-0029 calls for is preservation that survives across both physical and organizational failure modes — which is what Tier 3 distribution adds on top of Tier 2's geographic distribution.

---

### E-0053 — evidence — Astronomical archives — STScI/CADC/ESAC 30-year IVOA partnership
source_section: §6.1
edges:
  supports: [C-0004, C-0012]
  derivedFrom: [S-0083]

# E-0053 — Astronomical archive partnership

The Space Telescope Science Institute, the Canadian Astronomy Data Centre, and the European Space Astronomy Centre have maintained a **30-year international data sharing partnership** for astronomical archives, interoperating through **International Virtual Observatory Alliance (IVOA) standards** (S-0083).

The partnership is one of the longest-running successful examples of cross-jurisdictional Tier 2 coordination outside the high-funded biomedical and physics domains. The 30-year span establishes the organizational durability achievable when coordination is grounded in common technical standards (IVOA) rather than common funding agencies.

The case is empirical input for both C-0004 (Tier 2 ceiling demonstrated) and C-0012 (resilience contingent on continued coordination). The astronomical-archive consortium is also the strongest example of a domain that has bridged Tier 2 across multiple national contexts via standards rather than via shared funding, making it the closest existing approximation to the "below and across domain governance" architecture C-0029 calls for.

---

### E-0054 — evidence — Digital Preservation Network dissolved 2018; integrity layer dissolved with coordinator
source_section: §6.2
edges:
  supports: [C-0028]
  derivedFrom: [S-0095]

# E-0054 — DPN dissolution 2018

The Digital Preservation Network spent **$7 million** over its run as a coordinator among five federated Replicating Nodes (APTrust, Chronopolis, HathiTrust, Stanford Digital Repository, Texas Digital Library), latterly as a single-member LLC of Internet2 (2017-2018). DPN announced wind-down in **December 2018** with **26 of 64 charter members** ever having deposited content and membership at dissolution at **31** (S-0095).

Because DPN was a *coordinator* rather than an operator — actual storage living at the federated nodes, each a free-standing preservation service — the dissolution did not destroy any copies. The five nodes continued operating, and depositors transitioned individually by their ingest node.

What dissolved was the cross-node integrity layer: fixity audits across nodes, succession guarantees, and the consortium-level provenance layer that members had paid for. Depositors had to renegotiate preservation node by node on whatever terms each node offered in DPN's absence.

The case is C-0028's coordinator-dissolution failure mode in its purest form. The data did not vanish; the integrity contract did. From the depositor's perspective, what they had purchased — verified preservation across multiple nodes — became something else (preservation at a single node, with no consortium-level integrity verification). The architectural reading: integrity contracts that depend on a coordinator's continued operation are exactly as durable as the coordinator.

---

### E-0055 — evidence — MetaArchive Cooperative sunset 2025; silent under-replication, manual Stanford rebuild
source_section: §6.2
edges:
  supports: [C-0028]
  derivedFrom: [S-0096]

# E-0055 — MetaArchive Cooperative sunset 2025

MetaArchive Cooperative operated for **20 years** across institutions in three countries and nearly a dozen U.S. states, successfully preserved HBCU collections, born-digital objects, and digitized A/V recordings, and won the American Library Association's George Cunha and Susan Swartzburg Preservation Award in 2017.

The cooperative dissolved on **March 31, 2025** after Educopia shifted its fiscal-sponsorship requirement to one full-time-equivalent staff member per community in January 2025, two members departed, and the operational reserve fell below policy threshold (S-0096).

Unlike DPN, MetaArchive **operated the replication protocol on members' behalf** — running LOCKSS automated polling that produced the distributed copies — and members had outsourced replication-state verification to the cooperative. When the eleven-month wind-down forced a comprehensive audit, the cooperative discovered **"issues with insufficient replications and problems with the automated LOCKSS polling process"** — automated polling had not been replicating content the way it advertised.

Recovery required collapsing the distributed architecture entirely — **manually consolidating every member's content onto a new audit node at Stanford** so it could be audited and rebuilt to a known-good baseline before being redistributed. By Educopia's own statement, "it was not possible to secure a permanent archival home for all of MetaArchive's materials within the sunset time frame."

The case is C-0028's silent-operational-failure mode at sectoral scale. No specific dataset has been documented as permanently lost in the public record, but the cooperative's own wind-down language acknowledges that not all materials reached permanent preservation, and the silent under-replication discovered during the sunset audit means pre-2025 loss within the cooperative cannot be ruled out.

---

### E-0056 — evidence — Self-hosted repository costs — 58-96% staff; MIT DSpace ~$260K/yr; Southampton ePrints £116K/yr
source_section: §7.1
edges:
  supports: [C-0030]
  derivedFrom: [S-0088]

# E-0056 — Self-hosted repository cost structure

Across the repository budgets studied, **staff costs account for 58% to 96% of total** (S-0088).

- **MIT DSpace:** ~$260,000/year ($76K infrastructure + $184K staffing for 2.75 FTE).
- **University of Southampton ePrints:** ~£116,000/year, **96%** of which goes to staff.

The technology is inexpensive; the expertise to curate, maintain, and govern a repository is the substantial expense. Hosted-storage alternatives are cheaper still: AWS S3 Glacier Instant Retrieval ~$48/TB/year, Glacier Deep Archive ~$12/TB/year, Google Cloud Archive ~$14/TB/year (S-0089).

The case structures the §7 cost picture: at all four tiers (Tier 0 through Tier 3), the marginal storage cost is small; the structural cost is staffing and governance. The Tier 3 architectural argument does not eliminate that cost — it changes its character. Volunteer-staffed deployments at TU Dortmund, TU Dresden, and MIT SIPB demonstrate that the staffing requirements scale down dramatically when the operational model shifts from custodial repository management to protocol participation.

---

### E-0057 — evidence — Universities running protocol nodes — TU Dortmund, TU Dresden, MIT SIPB, Tor relays at 45+
source_section: §7.3
edges:
  supports: [C-0006]
  derivedFrom: [S-0100, S-0101, S-0102, S-0098, S-0097]

# E-0057 — Universities are already running protocol nodes

Universities are already running protocol nodes as routine background operations, with no published study measuring their incremental cost — because the costs have apparently not been significant enough to track.

- **TU Dortmund Fachschaft Informatik** operates a Matrix homeserver (matrix.fachschaften.org) for university-wide messaging in the university's own data center, run by student volunteers (S-0100).
- **TU Dresden** runs Matrix for **18,000 users** on existing IT staff and student assistants (S-0101).
- **MIT** runs both a Mastodon instance and a Forgejo Git forge through its Student Information Processing Board, on existing server hardware, at effectively zero cost to the university (S-0102).
- **Over 45 universities** run **Tor relays** as background processes requiring near-zero maintenance (S-0098).
- **Academic Torrents** distributes **over 298 terabytes** of research data across volunteer seeders at zero central infrastructure cost (S-0097).

The cases demonstrate that institutional Tier 3 deployment is not theoretical. It is operationally trivial in practice — a fact pattern that can be referenced as the existence proof for R2 (deploy at least one protocol-level preservation node).

---

### E-0058 — evidence — Protocol-node baseline cost ~$46/yr; protocol-daemon memory footprints near zero
source_section: §7.3
edges:
  supports: [C-0006]
  derivedFrom: [S-0080, S-0097, S-0098, S-0099]

# E-0058 — Standalone Tier 3 cost and footprint

For an institution starting from nothing, a Hetzner CX23 instance — 2 vCPU, 4 GB RAM, 40 GB disk, 20 TB monthly transfer — costs ~$46/year. It can run any protocol node simultaneously (S-0080):

- **BitTorrent seedbox** $36-$84/yr
- **AT Protocol PDS** $42-$72/yr
- **Matrix homeserver** $60-$240/yr
- **Self-hosted Git forge** $60-$120/yr
- **IPFS pinning** $60-$360/yr

For institutions with existing infrastructure, the marginal cost is closer to zero. Daemon footprints:
- **BitTorrent seeding daemon:** 9-14 MB resident memory on Linux (S-0097).
- **Tor relay:** 512 MB RAM, 10-16 Mbps bandwidth (~0.016% of a 100 Gbps campus Internet2 connection) (S-0098).
- **Forgejo Git forge:** 100-150 MB resident memory; runs on 1-2 CPU cores.
- **BitTorrent WebSeed:** any existing web server can function as a seed with no software modification (S-0099).

The case shows the absolute and marginal cost of Tier 3 deployment. Both numbers are small enough that they fit within ordinary noise on institutional IT budgets — which is why TU Dortmund/Dresden/MIT (E-0057) can run such deployments without published cost studies.

---

### E-0059 — evidence — EMBL-EBI ROI 20-26x on £50M/yr (£1B-£1.3B annual user value)
source_section: §7.5
edges:
  supports: [C-0031]
  derivedFrom: [S-0104]

# E-0059 — EMBL-EBI ROI

The European Molecular Biology Laboratory - European Bioinformatics Institute operates on approximately **£50 million/year** and generates an estimated **£1 billion to £1.3 billion annually in user value** — a return of roughly **20:1 to 26:1** (S-0104).

The measurement uses commissioned economic-impact studies that quantify time savings, methodology improvements, and downstream research enabled by EMBL-EBI's data services. The methodology is conservative: it captures only directly attributable user value, not network effects, capability effects on cross-institutional research, or AI training value.

The figure is the strongest available anchor for biological-data-infrastructure ROI in the European context. It establishes that even at the low end of the documented ROI range, the return is order-of-magnitude positive. The case is one of the empirical inputs to C-0031.

---

### E-0060 — evidence — PDB ROI 800x — $5.5B economic impact / $6.1M federal funding/yr
source_section: §7.5
edges:
  supports: [C-0031]
  derivedFrom: [S-0109]

# E-0060 — Protein Data Bank ROI

The Protein Data Bank, operating on approximately **$6.1 million/year** in federal funding, generates an estimated **$5.5 billion in annual economic impact** — an **800:1** return (S-0109).

The figure is the documented outlier in the ROI range. The reason for the outlier status is the open-data multiplier C-0032 documents: PDB structural data feeds the entire pharmaceutical R&D pipeline, with 88% of new drug approvals 2010-2016 (S-0013a) and 100% of new cancer drugs 2019-2023 (S-0081, E-0050) drawing on PDB data.

The 800:1 return is not generalizable to all research data infrastructure — most data does not have pharmaceutical R&D as a downstream economic vector. But it does establish the ceiling of what well-curated, openly-accessible research data infrastructure can deliver, and it establishes that the documented ROI range (5:1-26:1 for the cluster, 800:1 for the outlier) brackets a wide envelope within which any specific Tier 3 deployment will fall.

---

### E-0061 — evidence — Landsat free-access — 53 scenes/day → 5,700/day; $25.6B/yr economic value
source_section: §7.6
edges:
  supports: [C-0032]
  derivedFrom: [S-0112]

# E-0061 — Landsat free-access multiplier

The Landsat satellite program distributed Earth observation imagery for decades with limited public value: **before the 2008 open-access policy, a maximum of 53 scenes were downloaded per day**. After the policy change, **downloads reached 5,700 scenes per day**, and the program's estimated economic value reached **$25.6 billion per year by 2023** (S-0112).

The data and the satellites were identical before and after. The access change alone unlocked the value.

The case is the cleanest available natural experiment in the open-data multiplier. The same physical infrastructure, same data quality, same scientific content — and a 100x increase in usage and a step-function increase in measurable economic value, achieved entirely through changing the access policy.

The implication for C-0032: when preserved data can be opened, the marginal value of opening it is potentially much larger than the marginal cost of preserving it. Tier 3 deployment that includes an open-access default for non-sensitive data captures both halves of the asymmetry — preservation and reuse.

---

### E-0062 — evidence — COVID-19 vaccines — $1.9T BioNTech / $5.2T total enabled by open-genome publication
source_section: §7.6
edges:
  supports: [C-0032]
  derivedFrom: [S-0113]

# E-0062 — COVID-19 vaccine value chain

On **January 10-11, 2020**, the SARS-CoV-2 genome was shared publicly via virological.org and GISAID. **BioNTech's Project Lightspeed launched January 27, 2020 — 17 days later, with eight vaccine candidates designed within 48 hours of the founders' decision**. Pfizer joined the partnership on March 17, 2020.

The resulting Pfizer-BioNTech vaccines generated an estimated **$1.9 trillion in global economic value**, part of **$5.2 trillion across all COVID-19 vaccines** (S-0113).

The case is the strongest single demonstration of the time dimension of the open-data multiplier. The 17-day lag between public genome publication and vaccine candidate generation was operationally possible only because the genome was shared openly and unconditionally. A regime in which the genome had been shared under standard restrictive licensing or held internally would have produced a different vaccine timeline measured in months or quarters rather than days.

For the AI-era extension developed in §10 (C-0033), the same architectural property — open, content-addressed, distributed scientific data — is what enables the timescale-of-discovery acceleration AI research depends on. The COVID case is the proof of concept for what Tier 3 + open access can deliver at planetary scale.

---

### E-0063 — evidence — Smeesters/Erasmus 2014 — "computer crash" defense in misconduct case
source_section: §8.2
edges:
  supports: [C-0034]
  derivedFrom: [S-0115]

# E-0063 — Smeesters/Erasmus

In 2012, Erasmus University concluded it had no confidence in the scientific integrity of social psychologist Dirk Smeesters' published work. The 2014 final report formally found misconduct across **seven papers**.

When asked to produce raw data supporting his published results, Smeesters responded that **his home computer had crashed** and that **selectively discarding data was nothing out of the ordinary in his field and his department** (S-0115).

The case is the cleanest documented example of "my data is lost" as an unfalsifiable defense in a research-misconduct proceeding. The investigation could not test the lost-data claim because the architecture under which the data had been stored did not produce attestable artifacts at the time of deposit. The defense was successful only in the limited sense that no specific data-fabrication finding could be made — but the seven-paper misconduct ruling stood on the indirect evidence available.

Under content-addressed deposit at the point of collection (the architectural fix C-0034 calls for), the same defense becomes testable. Hashes and signatures resolve, or they do not. The investigation has a clean evidentiary path that the Smeesters case did not.

The case is empirical input for both C-0034 (forensic implications of architectural choice) and the broader §8 verification argument.

---

### E-0065 — evidence — UK Archaeology Data Service — £13M/yr efficiency gains, ~5:1 return
source_section: §7.5
edges:
  supports: [C-0031]
  derivedFrom: [S-0105]

# E-0065 — UK Archaeology Data Service ROI

The United Kingdom's Archaeology Data Service produces **£13 million in annual efficiency gains** against operating costs — a return of **roughly 5:1** (S-0105).

The case is at the lower end of the documented ROI cluster. Even at the lower bound of the range that C-0031 brackets, the return is substantially positive. The figure is also useful as a non-biomedical, non-physics anchor — establishing that the ROI argument generalizes beyond the high-impact disciplines that produce the higher multiples.

---

### E-0066 — evidence — Australia NCRIS — $7 returned per $1 invested
source_section: §7.5
edges:
  supports: [C-0031]
  derivedFrom: [S-0106]

# E-0066 — Australian NCRIS ROI

Australia's **National Collaborative Research Infrastructure Strategy** program returns **$7 for every $1 invested** (S-0106).

The case is the strongest available cross-domain anchor for research-infrastructure ROI in a national-scale program. NCRIS funds research infrastructure across multiple disciplines (not just biomedical or physics), making the 7:1 return a generalist measurement rather than a specialist outlier.

The figure sits in the middle of the documented ROI cluster (5:1 to 26:1, plus PDB at 800:1). It supports C-0031's claim that ROI on research data infrastructure is positive across disciplines, not just within the well-known high-multiple domains.

---

### E-0067 — evidence — XSEDE cyberinfrastructure — $4.7B-$22.7B value on $257.5M; 18:1 to 88:1
source_section: §7.5
edges:
  supports: [C-0031]
  derivedFrom: [S-0107]

# E-0067 — XSEDE ROI

The Extreme Science and Engineering Discovery Environment cyberinfrastructure program generated **$4.7 billion to $22.7 billion in total value** on a **$257.5 million investment** — a **18:1 to 88:1 return** (S-0107).

The wide range reflects different valuation methodologies; the lower bound is conservative, the upper bound is comprehensive. Even the conservative 18:1 sits well above the documented ROI cluster's middle, and the upper-bound 88:1 approaches the PDB outlier.

XSEDE is the strongest U.S. anchor for the ROI argument. It directly funded the kind of research-computing infrastructure that supports the AI workloads C-0008 / §10 develops, and the documented return demonstrates the case for similar investment in the data-preservation layer.

---

### E-0068 — evidence — Apon et al. — $14.3M HERD per $100K research-computing salary; $1.3M per 100 TFLOPs
source_section: §7.5
edges:
  supports: [C-0031]
  derivedFrom: [S-0108]

# E-0068 — Apon et al. research-computing leverage

Apon and colleagues found that **every $100,000 in research-computing salaries is associated with a $14.3 million increase in higher-education R&D expenditure**, and **every 100 TeraFLOPs of added capacity with a $1.3 million increase** (S-0108).

The figure is leverage, not direct ROI: it measures the institutional research-funding capacity unlocked by additional infrastructure investment, not the dollar-value-per-dollar return. As leverage, the 143:1 ratio (HERD increase per salary dollar) is one of the cleanest available demonstrations that infrastructure capacity is the constraint — adding capacity unlocks proportionally larger increases in the institution's overall research-funding ability.

The case extends C-0031: research data infrastructure is not just self-justifying through direct ROI; it is also a leverage point for the institution's competitive position in attracting research funding generally.

---

### E-0069 — evidence — Human Genome Project — $14.5B federal investment 1988-2012 → $965B economic impact
source_section: §7.6
edges:
  supports: [C-0032]
  derivedFrom: [S-0111]

# E-0069 — Human Genome Project economic impact

Federal investment in the Human Genome Project and subsequent genomics research totaled **$14.5 billion from 1988 through 2012** and generated **$965 billion in economic impact** (S-0111) — a return of approximately **66:1**.

The case is among the strongest available anchors for the open-data multiplier. The HGP's defining policy decision was to release the reference genome openly into the public domain. The downstream impact compounded across pharmaceutical R&D, agricultural genomics, evolutionary biology, and medical diagnostics — each application building on the same openly available reference.

Within the C-0032 framework, the HGP demonstrates that the open-access multiplier scales to multi-decade horizons. The $965B impact figure measures returns out to ~25 years from initial investment; the architectural property the paper recommends (Tier 3 preservation that does not truncate at the grant cycle) is what made that timescale possible. Closed-access alternatives that truncated at funding renewal would have produced a fundamentally different impact curve.

---

### E-0072 — evidence — European Commission — minimum €10.2B/yr cost of not having FAIR research data
source_section: §7.6
edges:
  supports: [C-0032]
  derivedFrom: [S-0114]

# E-0072 — Cost of not having FAIR data (EU)

The European Commission estimated the cost of *not having* FAIR research data at a **minimum of €10.2 billion per year across the European Union** (S-0114).

The figure is the inverse of the open-data multiplier: rather than measuring the return on open data, it measures the foregone value when research data is not Findable, Accessible, Interoperable, and Reusable. The two are coupled — the EU figure is approximately the value that would otherwise have been captured had FAIR practices been universal.

The €10.2B/yr is conservative. It captures only directly attributable inefficiency (duplicated effort, search costs, methodology drift) at the EU scale. The full open-access multiplier documented in cases like the HGP (E-0069), Landsat (E-0061), and COVID-19 (E-0062) is substantially larger because it captures upside rather than just avoided cost.

The case reinforces C-0032 from the lost-value angle: openness produces measurable economic returns; the absence of openness produces equally measurable losses.

---

### S-0001 — source — Vines et al. 2014 — The Availability of Research Data Declines Rapidly with Article Age
source_section: References [1]
edges:
  (none)

# S-0001 — Vines et al. 2014

**Citation:** Vines, T.H. et al. "The Availability of Research Data Declines Rapidly with Article Age." *Current Biology* 24(1), 2014.

**Type:** Peer-reviewed empirical study.
**Method:** Direct contact with corresponding authors of 516 ecology and evolutionary biology papers, sampled at two-year intervals 1991-2011, requesting raw morphological data underlying the publications.

**Key findings used in this graph:**
- 19% of dataset requests delivered (E-0001)
- ~17%-per-year decline in conditional dataset survival probability (E-0005)
- Methodology established for subsequent direct-contact replications (E-0002, E-0003, E-0004)

**Original whitepaper reference:** [1]

---

### S-0002 — source — Gabelica et al. 2022 — Many researchers were not compliant with their published data sharing statement
source_section: References [2]
edges:
  (none)

# S-0002 — Gabelica, Bojčić & Puljak 2022

**Citation:** Gabelica, M., Bojčić, R. & Puljak, L. "Many researchers were not compliant with their published data sharing statement: A mixed-methods study." *Journal of Clinical Epidemiology* 150:33-41, 2022. doi:10.1016/j.jclinepi.2022.05.019. PubMed: 35654271.

**Type:** Peer-reviewed mixed-methods study.
**Method:** Direct contact with authors of 1,792 biomedical papers whose published data-availability statements committed to sharing on request.

**Key finding used in this graph:**
- 93% non-compliance with the published data-sharing commitment (E-0002)

**Original whitepaper reference:** [2]

---

### S-0003 — source — Wicherts et al. 2006 — The poor availability of psychological research data for reanalysis
source_section: References [3]
edges:
  (none)

# S-0003 — Wicherts, Borsboom, Kats & Molenaar 2006

**Citation:** Wicherts, J.M., Borsboom, D., Kats, J. & Molenaar, D. "The poor availability of psychological research data for reanalysis." *American Psychologist* 61(7):726-728, 2006. doi:10.1037/0003-066X.61.7.726.

**Type:** Peer-reviewed empirical study.
**Method:** Direct contact with corresponding authors of 141 psychology papers published in 2005 in journals of the American Psychological Association whose authors had signed APA's data-sharing compliance certification.

**Key finding used in this graph:**
- 73% of authors failed to produce data on request (E-0003)

**Original whitepaper reference:** [3]

---

### S-0004 — source — Acciai, Schneider & Nielsen 2023 — Estimating social bias in data sharing behaviours
source_section: References [4]
edges:
  (none)

# S-0004 — Acciai, Schneider & Nielsen 2023

**Citation:** Acciai, C., Schneider, J.W. & Nielsen, M.W. "Estimating social bias in data sharing behaviours: an open science experiment." *Scientific Data* 10:233, 2023. doi:10.1038/s41597-023-02129-8.

**Type:** Peer-reviewed audit experiment.
**Method:** Direct contact with corresponding authors of 1,634 papers published 2017-2021 in PNAS and Nature-portfolio journals whose data-availability statements promised data on request, contacted in 2022.

**Key finding used in this graph:**
- 86% non-sharing rate (E-0004)

**Original whitepaper reference:** [4]

---

### S-0005 — source — Strecker et al. 2023 — Disappearing repositories
source_section: References [5]
edges:
  (none)

# S-0005 — Strecker, Pampel, Schabinger & Weisweiler 2023

**Citation:** Strecker, D., Pampel, H., Schabinger, R. & Weisweiler, N.L. "Disappearing repositories: Taking an infrastructure perspective on the long-term availability of research data." *Quantitative Science Studies* 4(4):839-856, 2023. doi:10.1162/qss_a_00276.

**Type:** Peer-reviewed infrastructure analysis.
**Method:** Analysis of the re3data directory of research data repositories, identifying closures and tracking outcomes for hosted data.

**Key findings used in this graph:**
- 191 research data repositories closed since 2012 (E-0006)
- Median operational age at closure: 12 years (E-0006)
- 47% of closures gave no indication of data migration (E-0006)

**Original whitepaper reference:** [5]

---

### S-0009 — source — Freedman, Cockburn & Simcoe 2015 — The Economics of Reproducibility in Preclinical Research
source_section: References [9]
edges:
  (none)

# S-0009 — Freedman, Cockburn & Simcoe 2015

**Citation:** Freedman, L.P., Cockburn, I.M. & Simcoe, T.S. "The Economics of Reproducibility in Preclinical Research." *PLOS Biology* 13(6):e1002165, 2015. doi:10.1371/journal.pbio.1002165.

**Type:** Peer-reviewed economic analysis.
**Method:** Combined published reproducibility-failure rates with U.S. National Institutes of Health expenditure data to estimate the annual sector-level cost of irreproducible preclinical research.

**Key finding used in this graph:**
- Approximately $28 billion per year in U.S. preclinical research consumed on work that cannot be reproduced (E-0007).

**Original whitepaper reference:** [9]

---

### S-0012 — source — INSDC — Arita et al. 2025
source_section: References [12]
edges:
  (none)

# S-0012 — INSDC reference set

Arita, M. et al. "The international nucleotide sequence database collaboration (INSDC): enhancing global participation." *Nucleic Acids Research* 53(D1):D62-D69, 2025. doi:10.1093/nar/gkae1088. GenBank Release 271.0, April 27, 2026 (53.90 trillion bases, 6.27 billion records). DDBJ/ENA/GenBank Feature Table Definition, insdc.org/submitting-standards/feature-table/.

**Use:** Anchor reference for INSDC as the canonical Tier 2 nucleotide-sequence preservation case. Three mirrored databases (NCBI / EMBL-EBI / DDBJ) on three continents, synchronized daily; in continuous operation since the 1980s.

**Original whitepaper reference:** [12]

---

### S-0013 — source — wwPDB — Berman, Henrick & Nakamura 2003 + RCSB economic impact
source_section: References [13]
edges:
  (none)

# S-0013 — Worldwide Protein Data Bank

Berman, H.M., Henrick, K. & Nakamura, H. "Announcing the worldwide Protein Data Bank." *Nature Structural Biology* 10:980, 2003. wwPDB Consortium, wwpdb.org. RCSB PDB, "Economic Impact" summary, rcsb.org/pages/about-us/economic-impact.

**Key facts:** 4-site weekly RSYNC synchronization (RCSB PDB, PDBe, PDBj, BMRB). ~227,000 experimentally determined structures. ~$23 billion replacement cost. Continuously operational since 1971.

**Use:** Tier 2 exemplar for macromolecular structures. Cited in C-0004, C-0012, and §6.1.

**Original whitepaper reference:** [13]

---

### S-0015 — source — Worldwide LHC Computing Grid (CERN)
source_section: References [15]
edges:
  (none)

# S-0015 — WLCG

CERN. "The Worldwide LHC Computing Grid." home.cern/science/computing/grid. WLCG collaboration, wlcg.web.cern.ch.

**Key facts:** 1.5 exabytes managed. 1.4 million cores. >170 sites in 42 countries. >2 million tasks per day. Managed hierarchy with central coordination at CERN.

**Use:** Tier 2 exemplar for particle physics; the largest-scale Tier 2 system in operation, demonstrating that coordinated multi-site preservation works at planetary scale.

**Original whitepaper reference:** [15]

---

### S-0016 — source — DNS scale and reliability metrics
source_section: References [16]
edges:
  (none)

# S-0016 — DNS metrics

ICANN Root Server System Advisory Committee. *RSSAC002: Advisory on Measurements of the Root Server System*, 2014, and subsequent quarterly reports. Verisign, *Domain Name Industry Brief*, 2025. Cloudflare, "How Cloudflare analyzes 1M DNS queries per second." Vercara/DigiCert, *2023 DNS Traffic and Trends Analysis* (41.97 trillion DNS queries on a single platform in 2023).

**Key facts:** ~350 million registered domains. Trillions of queries per day across the system. 43 years of continuous operation; never gone down globally.

**Use:** Tier 3 exemplar for organizational independence at planetary scale. Cited in C-0013 and E-0008.

**Original whitepaper reference:** [16]

---

### S-0017 — source — SMTP — RFC 821 (1982) and RFC 5321 (2008)
source_section: References [17]
edges:
  (none)

# S-0017 — SMTP

Postel, J. *Simple Mail Transfer Protocol.* RFC 821, IETF, August 1982. Klensin, J. RFC 5321, IETF, October 2008.

**Use:** Foundational protocol specification for email. RFC 821 establishes the 44-year operational lineage cited in C-0013 and E-0008. RFC 5321 is the current canonical specification.

**Original whitepaper reference:** [17]

---

### S-0018 — source — Email statistics 2026 (Radicati / Statista / EmailToolTester)
source_section: References [18]
edges:
  (none)

# S-0018 — Email volume and adoption

Radicati Group / Statista / EmailToolTester. *Email Statistics* reporting for 2026. emailtooltester.com/en/blog/how-many-emails-are-sent-per-day/.

**Key facts:** 4.73 billion active email users worldwide. 392.5 billion messages per day in 2026.

**Use:** Establishes operational scale of email as a Tier 3 system. Cited in C-0013 and E-0008.

**Original whitepaper reference:** [18]

---

### S-0019 — source — BitTorrent 2 billion installations milestone (2020)
source_section: References [19]
edges:
  (none)

# S-0019 — BitTorrent installations

BitTorrent Inc. "BitTorrent Crosses Historic 2 Billion Installations Milestone." Company blog and BusinessWire press release, August 11, 2020. bittorrent.com/blog/2020/08/11/bittorrent-crosses-historic-2-billion-installations/

**Key fact:** Cumulative installations of BitTorrent and µTorrent clients across Windows, Mac, and Android crossed 2 billion as of August 2020.

**Use:** Establishes BitTorrent's operational scale and global reach as a Tier 3 protocol. Cited in C-0013 and E-0008.

**Original whitepaper reference:** [19]

---

### S-0020 — source — Internet Archive uses BitTorrent for over 1M items
source_section: References [20]
edges:
  (none)

# S-0020 — Internet Archive BitTorrent distribution

Internet Archive Blog. "Over 1,000,000 Torrents of Downloadable Books, Music, and Movies." August 7, 2012. blog.archive.org/2012/08/07/over-1000000-torrents-of-downloadable-books-music-and-movies/. Internet Archive Help Center, "Archive BitTorrents," help.archive.org/help/archive-bittorrents/.

**Key facts:** Internet Archive distributes over 1 million items via BitTorrent. The Archive describes BitTorrent as "the now fastest way to download items from the Archive" and "a supplement to traditional HTTP download."

**Use:** Demonstrates that a major preservation institution actively uses BitTorrent as a Tier 3 distribution layer for non-copyrighted scientific and cultural content. Cited in C-0013, E-0008, and §7.

**Original whitepaper reference:** [20]

---

### S-0021 — source — GitHub Octoverse Report 2025 + Git release history
source_section: References [21]
edges:
  (none)

# S-0021 — GitHub Octoverse 2025 + Git lineage

GitHub, Inc. *Octoverse Report 2025*. Git 1.0 release announcement, December 2005. Linus Torvalds first commit April 7, 2005.

**Use:** Establishes Git's 21-year operational lineage and the most authoritative annual report on Git/GitHub usage. Cited in C-0013 and E-0008.

**Original whitepaper reference:** [21]

---

### S-0022 — source — Stack Overflow 2024 Developer Survey — 93.87% Git adoption
source_section: References [22]
edges:
  (none)

# S-0022 — Stack Overflow 2024 Developer Survey

Stack Overflow. *2024 Developer Survey*. survey.stackoverflow.co/2024/

**Key fact:** 93.87% Git adoption among professional developers worldwide.

**Use:** Establishes Git's adoption baseline as the dominant version control system. Cited in C-0013 and E-0008.

**Original whitepaper reference:** [22]

---

### S-0023 — source — kernel.org compromise 2011 (Corbet, Linux Foundation)
source_section: References [23]
edges:
  (none)

# S-0023 — kernel.org compromise

Corbet, J. "Kernel.org compromised." *LWN.net*, August 31, 2011. lwn.net/Articles/457142/. The Linux Foundation, "The Cracking of Kernel.org." Wikipedia, kernel.org.

**Key facts:** Attackers obtained root access on multiple kernel.org servers and ran modified versions of OpenSSH and other utilities. Linux source code was not at risk because Git's cryptographic hash chain made tampering immediately detectable across the thousands of independent clones held by developers.

**Use:** Empirical demonstration of integrity-as-architectural-property under adversarial pressure. Cited in C-0013, C-0007, and E-0010.

**Original whitepaper reference:** [23]

---

### S-0025 — source — GitHub blocked sanctioned-region developers 2019
source_section: References [25]
edges:
  (none)

# S-0025 — GitHub Iran/Syria/Crimea/Cuba/N. Korea ban

Liao, R. & Singh, M. "GitHub confirms it has blocked developers in Iran, Syria and Crimea." *TechCrunch*, July 29, 2019. techcrunch.com/2019/07/29/github-ban-sanctioned-countries/. GitHub, "GitHub and Trade Controls." docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls.

**Key facts:** GitHub access restrictions imposed on developers in Iran, Syria, Crimea, Cuba, and North Korea under U.S. export controls in July 2019.

**Use:** Empirical anchor for C-0016 / E-0009. The sanctioned-region ban is the canonical case for the difference between Tier 3 protocol and Tier 1 deployment of it.

**Original whitepaper reference:** [25]

---

### S-0025a — source — GitHub email refusing repository export to sanctioned developer
source_section: References [25a]
edges:
  (none)

# S-0025a — GitHub repository-export refusal email

Saeedi Fard, H. "A Sad Day for Iranian Developers." *Medium*, July 2019; archived via the Wayback Machine where the original is unavailable.

**Key fact:** Verbatim email from GitHub support to a sanctioned-region developer: "Unfortunately we are not legally able to send an export of the disabled repository content. I'm sorry for the frustration here, but GitHub must comply with U.S. export control laws and sanction requirements."

**Use:** Primary-source evidence for E-0009. Demonstrates that the platform's compliance posture extended to refusing user export of their own work — the exact failure mode C-0016 / R6 prescribe maintaining local clones to prevent.

**Original whitepaper reference:** [25a]

---

### S-0026 — source — Researcher career timelines (NCSES SED 2023, CGS 2008, Kahn & Ginther 2017, Woolston 2020)
source_section: References [26]
edges:
  (none)

# S-0026 — Researcher career data

NCSES *Survey of Earned Doctorates: 2023* and *Doctorate Recipients from U.S. Universities: 2023* (NSF, 2024-2025); Council of Graduate Schools, *Ph.D. Completion and Attrition*, 2008; Kahn & Ginther, *Nature Biotechnology* 35(1), 2017; Woolston, "Postdocs in crisis," *Nature Careers*, 2020.

**Key facts:** Median time-to-PhD 7.3 years; ~43% non-completion at 10 years; median postdoc 4.5-4.6 years; ~17% tenure-track placement.

**Use:** E-0011, C-0017.

**Original whitepaper reference:** [26]

---

### S-0027 — source — Avelino et al. 2016 — Truck factor analysis of 133 GitHub projects
source_section: References [27]
edges:
  (none)

# S-0027 — Truck factor study

Avelino, G., Passos, L., Hora, A. & Valente, M.T. "A Novel Approach for Estimating Truck Factors." *IEEE 24th International Conference on Program Comprehension (ICPC)*, 2016. doi:10.1109/ICPC.2016.7503718. arxiv.org/abs/1604.06766.

**Key fact:** 65% of 133 popular GitHub projects have truck factor ≤ 2.

**Use:** E-0012, C-0017.

**Original whitepaper reference:** [27]

---

### S-0028 — source — Schembera & Durán 2020 — Dark Data at HLRS Stuttgart
source_section: References [28]
edges:
  (none)

# S-0028 — Schembera & Durán 2020

Schembera, B. & Durán, J.M. "Dark Data as the New Challenge for Big Data Science and the Introduction of the Scientific Data Officer." *Philosophy & Technology* 33:93-115, 2020 (online March 13, 2019). doi:10.1007/s13347-019-00346-x. Heidorn, P.B. "Shedding Light on the Dark Data in the Long Tail of Science." *Library Trends* 57(2), 2008 (dark-data typology).

**Key fact:** HLRS tape archive — 57 of 262 de-registered accounts holding ~619 TB of orphaned data as of December 1, 2017.

**Use:** E-0013, C-0017.

**Original whitepaper reference:** [28]

---

### S-0029 — source — Kyoto University IIMC 77TB loss notice (Dec 2021)
source_section: References [29]
edges:
  (none)

# S-0029 — Kyoto IIMC incident

Kyoto University Institute for Information Management and Communication (IIMC), official incident notification on the loss of storage files on the supercomputer system, December 28, 2021. iimc.kyoto-u.ac.jp/en. Claburn, T. "Kyoto University loses 77TB of supercomputer data after buggy update to HPE backup program," *Data Center Dynamics*, January 2022.

**Key facts:** Buggy HPE backup script update executed December 14-16, 2021. ~77 TB across 34 million files deleted from 14 research groups. ~28 TB across ~25 million files across four groups unrecoverable.

**Use:** E-0015, C-0018.

**Original whitepaper reference:** [29]

---

### S-0030 — source — Brazil National Museum fire — Escobar 2018, AHA Perspectives, Smithsonian Magazine
source_section: References [30]
edges:
  (none)

# S-0030 — Brazil National Museum

Escobar, H. "In a 'foretold tragedy,' fire consumes Brazil museum." *Science* 361(6406):960, 2018. doi:10.1126/science.361.6406.960. American Historical Association, "The Degradation of History," *Perspectives on History*, December 2018. Daley, J. "Why Brazil's National Museum Fire Was a Devastating Blow," *Smithsonian Magazine*, September 5, 2018. UNESCO and IBRAM documentation.

**Key facts:** September 2, 2018 fire destroyed ~18.4M of 20M items. Operating budget collapsed to $13K in 2018 against $128K required and not received in any year since 2014.

**Use:** E-0016, C-0018.

**Original whitepaper reference:** [30]

---

### S-0031 — source — NIH/NSF 2025 grant terminations
source_section: References [31]
edges:
  (none)

# S-0031 — 2025 grant terminations

Kaiser, J. "NIH terminations reach $2.45 billion." *Science* News, August 2025. Mervis, J. "NSF kills 1,700 grants." *Science* News, August 2025. COGR/PNAS, "How the 2025 NIH grant terminations varied by researchers' demographic groups," *PNAS* 2025, doi:10.1073/pnas.2527755123 (2,291 NIH grants / $2.45B). Committee of Concerned Scientists / COSSA, "NSF Releases List of Terminated Grants," May 21, 2025 (1,752 NSF grants / $1.4B; STEM Education Directorate 839 / $888M). FY2026 President's Budget Request, 2025. AAS, "The FY26 President's Budget Request," June 2025 (NSF FY2026 request $3.9B vs. $9.06B FY2025 enacted, ~56% cut). Grant Watch (grant-watch.us).

**Use:** E-0017, C-0019.

**Original whitepaper reference:** [31]

---

### S-0032 — source — NOAA Billion-Dollar Disasters retirement + Mauna Loa defunding proposal
source_section: References [32]
edges:
  (none)

# S-0032 — NOAA database closures and FY2026 climate cuts

NOAA NCEI, "Billion-Dollar Weather and Climate Disasters" archive, ncei.noaa.gov (403 disasters / ~$2.9T in damages since 1980). NOAA Notice of Changes, May 2025 (database retired). *Washington Post*, "NOAA will stop tracking billion-dollar weather disasters," May 8, 2025. Eos, "Proposed NOAA Budget Calls for $0 for Climate Research," 2025 (FY2026 elimination of NOAA Office of Oceanic and Atmospheric Research, including Mauna Loa's 1958-onward atmospheric CO₂ record).

**Use:** E-0018, C-0012, C-0019.

**Original whitepaper reference:** [32]

---

### S-0033 — source — Data.gov dataset removals 2025 (EDGI, Data Rescue Project, Harvard LIL)
source_section: References [33]
edges:
  (none)

# S-0033 — Federal data removals 2025

Environmental Data and Governance Initiative (EDGI), *Federal Environmental Web Tracker*, envirodatagov.org. Data Rescue Project, datarescueproject.org. Harvard Law School Library Innovation Lab, Data.gov archive project. Wikipedia, "2025 United States government online resource removals."

**Key facts:** 308,000 → 304,621 Data.gov datasets by February 21, 2025 (~3,379 removed). >8,000 web pages modified. NOAA Eos reporting of 14 decommissioned earthquake, marine, and coastal datasets, April 2025.

**Use:** E-0019, C-0019, C-0020.

**Original whitepaper reference:** [33]

---

### S-0034 — source — Blumstein 2025 — The end of long-term ecological data?
source_section: References [34]
edges:
  (none)

# S-0034 — Long-term ecological studies

Blumstein, D.T. "The end of long-term ecological data?" *PLOS Biology* 23(4):e3003102, April 2025. doi:10.1371/journal.pbio.3003102.

**Key facts:** 411 long-term mammal studies analyzed; 191 terminated. 63-year yellow-bellied marmot study at Rocky Mountain Biological Laboratory rejected for future funding on the grounds it had "too much data."

**Use:** E-0020, C-0019.

**Original whitepaper reference:** [34]

---

### S-0035 — source — NASA Astronomical Data Center closure 2002
source_section: References [35]
edges:
  (none)

# S-0035 — NASA ADC closure

NASA Astronomical Data Center closure notice, October 1, 2002. Archived at classe.cornell.edu/~seb/celestia/adc-closure.html. Eichhorn, G., "The end of the NASA Astronomical Data Center," community discussion, 2003. Strecker et al. 2023 [S-0005] for typology context.

**Use:** E-0021, C-0020.

**Original whitepaper reference:** [35]

---

### S-0036 — source — AHRC AHDS closure decision 2007-2008
source_section: References [36]
edges:
  (none)

# S-0036 — AHDS closure

Arts and Humanities Research Council decision to discontinue AHDS co-funding, announced March 2007, effective March 31, 2008. Digital Curation Centre, "Arts and Humanities Data Service decision," dcc.ac.uk/news/arts-and-humanities-data-service-decision. *Arts and Humanities Data Service*, Wikipedia.

**Key facts:** Five centres (Archaeology, History, Literature/Languages/Linguistics, Performing Arts, Visual Arts). Archaeology Data Service continued at University of York; History Data Service collections transferred to UK Data Archive at Essex; Visual Arts continued as VADS. Performing Arts had no direct successor.

**Use:** E-0022, C-0020.

**Original whitepaper reference:** [36]

---

### S-0037 — source — BIIACS shutdown December 2023
source_section: References [37]
edges:
  (none)

# S-0037 — BIIACS shutdown

Banco de Información para la Investigación Aplicada en Ciencias Sociales, hosted by Centro de Investigación y Docencia Económicas, Mexico City. Data Seal of Approval certification 2013 with explicit "perpetuity of the data" pledge. Repository went dark December 15, 2023; persistent identifiers no longer resolve; no successor named.

Documentation: re3data registry historical entry for BIIACS; community reports of identifier resolution failure.

**Use:** E-0023, C-0011, C-0020.

**Original whitepaper reference:** [37]

---

### S-0038 — source — Twitter API termination impact analysis
source_section: References [38]
edges:
  (none)

# S-0038 — Twitter free academic API termination

Free academic research API eliminated February 2023. Subsequent analysis: 33,306 studies across 8,914 venues with 610,738 citations had been built on Twitter data; over 100 active research projects canceled, halted, or pivoted.

**Use:** E-0024, C-0020.

**Original whitepaper reference:** [38]

---

### S-0039 — source — GISAID — governance and access controversies
source_section: References [39]
edges:
  (none)

# S-0039 — GISAID

Global Initiative on Sharing All Influenza Data. Primary platform for COVID-19 genomic surveillance; >16.5M SARS-CoV-2 sequences from >195 countries.

**Key facts:** SARS-CoV-2 genome publicly shared January 11, 2020. BioNTech Project Lightspeed launched January 27, 2020 using the genome. 2023 suspended individual researcher accounts after publications critical of the platform's origin narrative (Scripps group, Wuhan market origin team). 2025 terminated data feeds to Nextstrain, Outbreak.info, CoV-Spectrum. re3data subsequently reclassified the platform from open-access to restricted-access.

**Use:** E-0025, C-0012, C-0020.

**Original whitepaper reference:** [39]

---

### S-0040 — source — CKNI cross-border subscription cutoff April 2023
source_section: References [40]
edges:
  (none)

# S-0040 — China National Knowledge Infrastructure

April 2023: CKNI cut off ~1,600 institutional subscribers outside mainland China from dissertations, master's theses, conference proceedings, statistical yearbooks, and population census databases under the Data Security Law's cross-border data transfer review. Affected institutions included Georgetown and University of Notre Dame.

**Use:** E-0026, C-0020.

**Original whitepaper reference:** [40]

---

### S-0041 — source — CERN ended cooperation with Russian/Belarusian institutions Nov 2024
source_section: References [41]
edges:
  (none)

# S-0041 — CERN-Russia/Belarus termination

November 2024: CERN terminated cooperation with Russian and Belarusian institutions under EU and Swiss sanctions following the 2022 invasion of Ukraine. ~500 scientists affiliated with Russian institutions expelled from LHC experiments. Smaller Belarusian-affiliated cohort whose contracts ended earlier in 2024.

**Use:** E-0027, C-0020.

**Original whitepaper reference:** [41]

---

### S-0042 — source — UK Biobank cloud-only metered access transition
source_section: References [42]
edges:
  (none)

# S-0042 — UK Biobank pricing

UK Biobank, UK research charity serving >30,000 approved researchers worldwide. 2023-2024 transition from bulk data download to cloud-only research platform, metered per-analysis on top of an existing £9,000 three-year access fee. Members of the neuroscience community reported research project costs would approximately double.

**Use:** E-0028, C-0020.

**Original whitepaper reference:** [42]

---

### S-0043 — source — Elsevier acquisition of Bepress (2017)
source_section: References [43]
edges:
  (none)

# S-0043 — Elsevier-Bepress acquisition

2017 Elsevier acquisition of Bepress, the platform underlying institutional repository infrastructure at >500 universities — many of whom had built their repositories specifically to circumvent commercial publishers.

**Use:** E-0029, C-0020.

**Original whitepaper reference:** [43]

---

### S-0044 — source — Mendeley Desktop EOL September 2022 + 2018 update annotation loss
source_section: References [44]
edges:
  (none)

# S-0044 — Mendeley shutdown timeline

2018 Mendeley update caused users to lose PDFs and annotations curated inside the application. Mendeley Desktop end-of-life September 2022, four years later. Both events occurred under Elsevier ownership of Mendeley.

**Use:** E-0030, C-0020.

**Original whitepaper reference:** [44]

---

### S-0045 — source — Academia.edu pricing escalation timeline
source_section: References [45]
edges:
  (none)

# S-0045 — Academia.edu pricing

Academia.edu launched as a free platform in 2008. Added $99/year premium tier in 2016. Annual price increases since. 2026 reports place the rate at ~$498/year. ~40% of users in developing nations where the paywall is most exclusionary.

**Use:** E-0031, C-0020.

**Original whitepaper reference:** [45]

---

### S-0046 — source — Elsevier and Springer Nature publisher-gated TDM APIs
source_section: References [46]
edges:
  (none)

# S-0046 — Publisher-gated TDM

Elsevier and Springer Nature route text-and-data-mining (TDM) access to their combined 5,500+ journals through publisher-gated APIs under click-through licenses that cap mining rate, restrict republishing, and assert publisher rights over derivative outputs. Elsevier has reported institutional contract violations to universities when researchers attempted bulk download through standard subscribed access.

**Use:** E-0032, C-0020.

**Original whitepaper reference:** [46]

---

### S-0047 — source — Nature reproducibility survey 2016 (Baker)
source_section: References [47]
edges:
  (none)

# S-0047 — Nature reproducibility survey

Baker, M. "1,500 scientists lift the lid on reproducibility." *Nature* 533:452-454, 2016 (and ongoing *Nature* reproducibility survey reporting).

**Key facts:** 1,576 respondents; >70% had failed to reproduce another scientist's experiments; >50% had failed to reproduce their own.

**Use:** E-0033, C-0022.

**Original whitepaper reference:** [47]

---

### S-0048 — source — Begley & Ellis 2012 — Amgen replication of cancer biology
source_section: References [48]
edges:
  (none)

# S-0048 — Begley & Ellis 2012

Begley, C.G. & Ellis, L.M. "Drug development: Raise standards for preclinical cancer research." *Nature* 483:531-533, 2012.

**Key facts:** Amgen attempted to replicate 53 landmark preclinical cancer studies; succeeded on 6 (~11%).

**Use:** E-0034, C-0022.

**Original whitepaper reference:** [48]

---

### S-0049 — source — Miyakawa 2020 — Molecular Brain editor's raw data audit
source_section: References [49]
edges:
  (none)

# S-0049 — Miyakawa 2020

Miyakawa, T. "No raw data, no science: another possible source of the reproducibility crisis." *Molecular Brain* 13:24, 2020.

**Key facts:** Editor of *Molecular Brain* asked 41 authors of submitted manuscripts to produce raw data; 97% could not; 21 of the papers were withdrawn.

**Use:** E-0035, C-0022.

**Original whitepaper reference:** [49]

---

### S-0050 — source — Stern, Casadevall, Steen & Fang 2014 — Financial costs of NIH retractions
source_section: References [50]
edges:
  (none)

# S-0050 — Stern et al. 2014

Stern, A.M., Casadevall, A., Steen, R.G. & Fang, F.C. "Financial costs and personal consequences of research misconduct resulting in retracted publications." *eLife* 3:e02956, 2014.

**Key facts:** Mean attributable cost per retracted NIH-funded paper ~$392,582; peer-reviewed median $239,381; aggregate ~$46.9M unadjusted NIH funding across retracted papers 1992-2012.

**Use:** E-0036, C-0022, C-0005, M-0003 (Term A anchor).

**Original whitepaper reference:** [50]

---

### S-0051 — source — Trisovic et al. 2022 — Reproducibility of computational research code
source_section: References [51]
edges:
  (none)

# S-0051 — Trisovic et al. 2022

Trisovic, A., Lau, M.K., Pasquier, T. & Crosas, M. "A large-scale study on research code quality and execution." *Scientific Data* 9:60, 2022.

**Key facts:** 74% of R analysis files in published research fail to complete without error; 56% still fail after automated cleaning.

**Use:** E-0037, C-0022.

**Original whitepaper reference:** [51]

---

### S-0052 — source — Pew Research Center 2024 — Web decay
source_section: References [52]
edges:
  (none)

# S-0052 — Pew web decay

Pew Research Center analysis of webpage availability 2013-2023.

**Key facts:** 25% of all webpages from 2013 to 2023 are gone; 38% of pages a decade old are gone.

**Use:** E-0038, C-0023.

**Original whitepaper reference:** [52]

---

### S-0053 — source — Klein et al. 2014 — Scholarly Context Not Found
source_section: References [53]
edges:
  (none)

# S-0053 — Klein et al. 2014 (reference rot in science)

Klein, M., Van de Sompel, H., Sanderson, R., Shankar, H., Balakireva, L., Zhou, K. & Tobin, R. "Scholarly Context Not Found: One in Five Articles Suffers from Reference Rot." *PLOS ONE* 9(12):e115253, 2014.

**Key facts:** Analysis of 3.5M scientific articles and ~1M URIs. One in five articles suffers reference rot. Among articles citing web content, seven in ten have compromised scholarly context.

**Use:** E-0039, C-0023.

**Original whitepaper reference:** [53]

---

### S-0054 — source — Zittrain, Albert & Lessig 2014 — Perma.cc / link rot in legal scholarship
source_section: References [54]
edges:
  (none)

# S-0054 — Zittrain et al. (legal-scholarship link rot)

Zittrain, J., Albert, K. & Lessig, L. "Perma: Scoping and Addressing the Problem of Link and Reference Rot in Legal Citations." *Harvard Law Review* / Harvard Public Law Working Paper, 2014.

**Key fact:** >70% of URLs cited across a sample drawn from the *Harvard Law Review* and two other Harvard journals between 1996 and 2012 no longer resolve to the originally cited content.

**Use:** E-0040, C-0023.

**Original whitepaper reference:** [54]

---

### S-0056 — source — Agh et al. 2009 — Iranian Artemia morphometric and genetic characterization
source_section: References [56]
edges:
  (none)

# S-0056 — Agh et al. 2009 Artemia paper

Agh, N., Bossier, P., Abatzopoulos, T.J., Beardmore, J.A., Van Stappen, G., Mohammadyari, A., Rahimian, H. & Sorgeloos, P. "Morphometric and Preliminary Genetic Characteristics of *Artemia* Populations from Iran." *International Review of Hydrobiology* 94(2):194-207, 2009.

**Key facts:** 19 morphometric variables across 6 populations; 85.9% correct classification on morphology alone; 100% separation of *A. urmiana* from parthenogenetic populations. Underlying raw dataset lost through laptop theft (T. Vines, pers. comm., 2026).

**Use:** E-0014, C-0024 (worked-example case for M-0003).

**Original whitepaper reference:** [56]

---

### S-0057 — source — CORDIS — EU ICA4-CT-2001-10020 award record (Artemia INCO-DEV)
source_section: References [57]
edges:
  (none)

# S-0057 — CORDIS award record

CORDIS award record for ICA4-CT-2001-10020, an EU INCO-DEV Concerted Action on *Artemia* biodiversity. 14 partners; total EU funding €800,000; January 2002 - December 2004.

**Use:** E-0014, C-0024 (Term A floor for the Agh case).

**Original whitepaper reference:** [57]

---

### S-0058 — source — Urmia Lake collapse documentation
source_section: References [58]
edges:
  (none)

# S-0058 — Urmia Lake collapse

Documentation of Urmia Lake's loss of approximately 88% of its surface area by the mid-2010s, driven by upstream agricultural water diversion and drought. *Artemia urmiana* population collapse documented in subsequent biodiversity literature.

**Use:** E-0014, C-0024 (establishes "irreplaceable" status of B term in the Agh case).

**Original whitepaper reference:** [58]

---

### S-0064 — source — Harvard / Brigham / Anversa $10M FCA settlement (April 2017)
source_section: References [64]
edges:
  (none)

# S-0064 — Harvard-Anversa settlement

April 2017 — Harvard and Brigham and Women's Hospital paid $10 million to settle FCA claims related to the Anversa cardiac stem cell research program. 31 papers subsequently recommended for retraction in October 2018.

**Use:** E-0042, C-0025, M-0003 Term D.

**Original whitepaper reference:** [64]

---

### S-0065 — source — Duke / Potts-Kant $112.5M FCA settlement (March 2019)
source_section: References [65]
edges:
  (none)

# S-0065 — Duke FCA settlement

March 2019 — Duke University paid $112.5 million in an FCA settlement on grant applications and progress reports submitted to NIH and EPA, involving falsified data attributed to lab analyst Erin Potts-Kant. The largest FCA payment by a university.

**Use:** E-0041, C-0025, M-0003 Term D.

**Original whitepaper reference:** [65]

---

### S-0066 — source — Dana-Farber $15M FCA settlement (December 2025)
source_section: References [66]
edges:
  (none)

# S-0066 — Dana-Farber settlement

December 2025 — Dana-Farber Cancer Institute settled an FCA case for $15 million on six NIH grants under the implied-certification theory.

**Use:** E-0043, C-0025, M-0003 Term D (most recent precedent anchor).

**Original whitepaper reference:** [66]

---

### S-0067 — source — NIH Data Management and Sharing Policy (NOT-OD-21-013)
source_section: References [67]
edges:
  (none)

# S-0067 — NIH DMS Policy

NIH Notice NOT-OD-21-013, effective January 25, 2023. As of October 2024, annual progress reports must document what data has actually been shared, what repository was used, and by what unique identifier. Simpler standardized DMSP format effective for applications due on or after May 25, 2026.

**Use:** E-0044, C-0003, C-0025.

**Original whitepaper reference:** [67]

---

### S-0068 — source — Gates Foundation OA.Works programmatic compliance (Jan 2025)
source_section: References [68]
edges:
  (none)

# S-0068 — Gates / OA.Works

January 2025 — Gates Foundation contracted OA.Works to perform programmatic compliance review at funder scale.

**Use:** E-0045, C-0003, C-0025; reference implementation for R4.

**Original whitepaper reference:** [68]

---

### S-0073 — source — SEC Rule 17a-4 records retention requirements
source_section: References [73]
edges:
  (none)

# S-0073 — SEC Rule 17a-4

SEC Rule 17a-4 mandates 6 years of retention in tamper-proof format with audited disaster recovery for broker-dealer records.

**Use:** E-0046, C-0025 (regulatory convergence).

**Original whitepaper reference:** [73]

---

### S-0074 — source — SEC/CFTC/FINRA $3.5B+ in records-related fines since 2021
source_section: References [74]
edges:
  (none)

# S-0074 — Records-related enforcement fines

>$3.5 billion in fines for records-related failures since 2021 across SEC, CFTC, and FINRA combined (off-channel-communications enforcement wave).

**Use:** E-0046, C-0025 (regulatory convergence).

**Original whitepaper reference:** [74]

---

### S-0075 — source — HIPAA Security Rule penalties
source_section: References [75]
edges:
  (none)

# S-0075 — HIPAA Security Rule

HIPAA Security Rule mandates encrypted, redundant backups with tested restoration. Maximum penalties of $2.19 million per violation in the willful-neglect tier.

**Use:** E-0046, C-0025.

**Original whitepaper reference:** [75]

---

### S-0076 — source — 21 CFR Part 11 + Applied Therapeutics rejection
source_section: References [76]
edges:
  (none)

# S-0076 — 21 CFR Part 11 / Applied Therapeutics

21 CFR Part 11 requires complete audit trails for any electronic record submitted to the FDA. Applied Therapeutics submitted a new drug application; FDA discovered that a vendor had deleted audit trails two days after FDA preannounced its inspection. The application was rejected.

**Use:** E-0046, C-0025 (verification regime; data inadmissibility regardless of content).

**Original whitepaper reference:** [76]

---

### S-0078 — source — Nature 2025 reader poll + Choose Europe for Science
source_section: References [78]
edges:
  (none)

# S-0078 — Nature poll + Choose Europe

2025 *Nature* reader poll: >1,600 respondents; 75% considering leaving the country (79% among postgraduate researchers).

European Commission's "Choose Europe for Science" program: launched May 2025 at €500M; expanded to ~€900M across 100+ initiatives.

**Use:** E-0047, C-0026.

**Original whitepaper reference:** [78]

---

### S-0080 — source — Standalone Tier 3 protocol-node hosting costs
source_section: References [80]
edges:
  (none)

# S-0080 — Standalone protocol-node costs

Hetzner CX23: 2 vCPU, 4 GB RAM, 40 GB disk, 20 TB monthly transfer; ~$46/yr. Per-protocol cost ranges (BitTorrent seedbox $36-$84/yr; AT Protocol PDS $42-$72; Matrix homeserver $60-$240; Git forge $60-$120; IPFS pinning $60-$360). Forgejo single binary 100-150 MB resident memory, 1-2 cores serves small institutional deployments.

**Use:** E-0058, C-0006, C-0027.

**Original whitepaper reference:** [80]

---

### S-0081 — source — PDB and FDA cancer drug approvals 2019-2023
source_section: References [81]
edges:
  (none)

# S-0081 — PDB cancer drug coverage

100% of 34 new United States Food and Drug Administration-approved low-molecular-weight, protein-targeted cancer drugs between 2019 and 2023 relied on Protein Data Bank data.

**Use:** E-0050.

**Original whitepaper reference:** [81]

---

### S-0082 — source — NOAA NCEI 60+ PB across 4 sites; Hurricane Helene 2024
source_section: References [82]
edges:
  (none)

# S-0082 — NOAA NCEI

NOAA's National Centers for Environmental Information manage over 60 PB of environmental data across 4 U.S. locations. When Hurricane Helene struck the centers' Asheville headquarters in September 2024, all archived data holdings were confirmed safe.

**Use:** E-0052.

**Original whitepaper reference:** [82]

---

### S-0083 — source — STScI/CADC/ESAC astronomical archive partnership (IVOA)
source_section: References [83]
edges:
  (none)

# S-0083 — Astronomical archive partnership

The Space Telescope Science Institute (US), the Canadian Astronomy Data Centre, and the European Space Astronomy Centre have maintained a 30-year international data sharing partnership for astronomical archives, interoperating through International Virtual Observatory Alliance (IVOA) standards.

**Use:** E-0053.

**Original whitepaper reference:** [83]

---

### S-0084 — source — 8% declared / 2% actual data availability across 2.1M articles
source_section: References [84]
edges:
  (none)

# S-0084 — Sectoral compliance gap

Cross-sectoral measurement of declared-vs-actual data availability across 2.1 million articles: 8% declared, 2% actually available.

**Use:** E-0048, C-0003, C-0025, R4.

**Original whitepaper reference:** [84]

---

### S-0088 — source — Self-hosted repository cost analyses (MIT DSpace, Southampton ePrints)
source_section: References [88]
edges:
  (none)

# S-0088 — Self-hosted repository costs

MIT DSpace ~$260,000/year ($76K infrastructure + $184K staffing for 2.75 FTE). University of Southampton ePrints ~£116,000/year, 96% staff. Across studied repository budgets, staff costs 58%-96% of total.

**Use:** E-0056, C-0030.

**Original whitepaper reference:** [88]

---

### S-0095 — source — Digital Preservation Network dissolution 2018
source_section: References [95]
edges:
  (none)

# S-0095 — DPN dissolution

DPN: $7M operating budget over its run; 47% on overhead; 11% on marketing. 5 federated Replicating Nodes (APTrust, Chronopolis, HathiTrust, Stanford Digital Repository, Texas Digital Library). 26 of 64 charter members ever deposited content. Membership at dissolution: 31. Wind-down announced December 2018 (operations ceased 2018; final closure follow-on).

**Use:** E-0054, C-0028.

**Original whitepaper reference:** [95]

---

### S-0096 — source — MetaArchive Cooperative sunset 2025
source_section: References [96]
edges:
  (none)

# S-0096 — MetaArchive sunset

MetaArchive Cooperative dissolved March 31, 2025. Educopia announcement noted "issues with insufficient replications and problems with the automated LOCKSS polling process." Manual consolidation onto Stanford audit node, redistribution to Dandelion Archive bridge network or returned to members. "It was not possible to secure a permanent archival home for all of MetaArchive's materials within the sunset time frame."

**Use:** E-0055, C-0028.

**Original whitepaper reference:** [96]

---

### S-0097 — source — BitTorrent daemon footprint + Academic Torrents
source_section: References [97]
edges:
  (none)

# S-0097 — BitTorrent footprint and Academic Torrents

BitTorrent seeding daemon: 9-14 MB resident memory on Linux. Academic Torrents distributes >298 TB of research data across volunteer seeders at zero central infrastructure cost.

**Use:** E-0057, E-0058, C-0006.

**Original whitepaper reference:** [97]

---

### S-0098 — source — Tor relay requirements + 45+ universities running relays
source_section: References [98]
edges:
  (none)

# S-0098 — Tor at universities

Tor relay requires 512 MB memory and 10-16 Mbps bandwidth (~0.016% of a 100 Gbps campus Internet2 connection). Over 45 universities run Tor relays as background processes requiring near-zero maintenance.

**Use:** E-0057, E-0058, C-0006.

**Original whitepaper reference:** [98]

---

### S-0099 — source — BitTorrent WebSeed specification
source_section: References [99]
edges:
  (none)

# S-0099 — BitTorrent WebSeed

BitTorrent's WebSeed specification allows any existing web server to function as a seed with no software modification. If a university already hosts datasets on a web server, making them available via BitTorrent adds no hardware, no software, and no cost.

**Use:** E-0058, C-0006.

**Original whitepaper reference:** [99]

---

### S-0100 — source — TU Dortmund Fachschaft Informatik Matrix homeserver
source_section: References [100]
edges:
  (none)

# S-0100 — TU Dortmund Matrix

TU Dortmund's Fachschaft Informatik operates a Matrix homeserver (matrix.fachschaften.org) for university-wide messaging in the university's own data center, run by student volunteers.

**Use:** E-0057, C-0006, R2.

**Original whitepaper reference:** [100]

---

### S-0101 — source — TU Dresden Matrix for 18,000 users
source_section: References [101]
edges:
  (none)

# S-0101 — TU Dresden Matrix

TU Dresden runs Matrix for 18,000 users on existing IT staff and student assistants.

**Use:** E-0057, C-0006, R2.

**Original whitepaper reference:** [101]

---

### S-0102 — source — MIT SIPB-operated Mastodon and Forgejo
source_section: References [102]
edges:
  (none)

# S-0102 — MIT SIPB

The Massachusetts Institute of Technology runs both a Mastodon instance and a Forgejo Git forge through its Student Information Processing Board, on existing server hardware, at effectively zero cost to the university.

**Use:** E-0057, C-0006, R2.

**Original whitepaper reference:** [102]

---

### S-0104 — source — EMBL-EBI economic-impact study (~£50M/yr → £1B-£1.3B/yr)
source_section: References [104]
edges:
  (none)

# S-0104 — EMBL-EBI ROI

The European Molecular Biology Laboratory - European Bioinformatics Institute operates on ~£50M/yr and generates an estimated £1B-£1.3B annually in user value (~20:1 to 26:1 return).

**Use:** E-0059, C-0031.

**Original whitepaper reference:** [104]

---

### S-0105 — source — UK Archaeology Data Service — £13M/yr efficiency gains
source_section: References [105]
edges:
  (none)

# S-0105 — ADS efficiency

The United Kingdom's Archaeology Data Service produces £13M in annual efficiency gains against operating costs (~5:1 return).

**Use:** C-0031.

**Original whitepaper reference:** [105]

---

### S-0106 — source — Australia NCRIS — $7 returned per $1 invested
source_section: References [106]
edges:
  (none)

# S-0106 — Australian NCRIS

Australia's National Collaborative Research Infrastructure Strategy program returns $7 for every $1 invested.

**Use:** C-0031.

**Original whitepaper reference:** [106]

---

### S-0107 — source — XSEDE — $4.7B-$22.7B value on $257.5M investment
source_section: References [107]
edges:
  (none)

# S-0107 — XSEDE

The Extreme Science and Engineering Discovery Environment cyberinfrastructure program generated $4.7B to $22.7B in total value on a $257.5M investment (18:1 to 88:1 return).

**Use:** C-0031.

**Original whitepaper reference:** [107]

---

### S-0108 — source — Apon et al. — $14.3M HERD per $100K research-computing salary
source_section: References [108]
edges:
  (none)

# S-0108 — Apon et al.

Every $100K in research-computing salaries is associated with a $14.3M increase in higher-education R&D expenditure; every 100 TFLOPs of added capacity with a $1.3M increase.

**Use:** C-0031.

**Original whitepaper reference:** [108]

---

### S-0109 — source — PDB ROI — $5.5B annual impact / $6.1M federal funding
source_section: References [109]
edges:
  (none)

# S-0109 — PDB economic impact

The Protein Data Bank, operating on ~$6.1M/year in federal funding, generates ~$5.5B in annual economic impact (800:1 return — documented outlier).

**Use:** E-0060, C-0031.

**Original whitepaper reference:** [109]

---

### S-0111 — source — Human Genome Project + genomics — $14.5B → $965B economic impact
source_section: References [111]
edges:
  (none)

# S-0111 — Human Genome Project economic impact

Federal investment in the Human Genome Project and subsequent genomics research totaled $14.5B from 1988 through 2012 and generated $965B in economic impact.

**Use:** C-0032.

**Original whitepaper reference:** [111]

---

### S-0112 — source — Landsat — 53/day → 5,700/day; $25.6B/yr economic value
source_section: References [112]
edges:
  (none)

# S-0112 — Landsat free-access multiplier

Pre-2008 closed-access policy: max 53 scenes/day downloaded. Post-2008 open-access policy: 5,700 scenes/day; estimated economic value $25.6B/yr by 2023.

**Use:** E-0061, C-0032.

**Original whitepaper reference:** [112]

---

### S-0113 — source — COVID-19 vaccine value — $1.9T BioNTech / $5.2T total
source_section: References [113]
edges:
  (none)

# S-0113 — COVID-19 vaccine value

SARS-CoV-2 genome shared publicly January 10-11, 2020 via virological.org and GISAID. BioNTech Project Lightspeed launched January 27, 2020 (17 days later); 8 vaccine candidates designed within 48 hours of the founders' decision. Pfizer joined March 17, 2020. Pfizer-BioNTech generated ~$1.9T global economic value, part of $5.2T across all COVID-19 vaccines.

**Use:** E-0062, C-0032.

**Original whitepaper reference:** [113]

---

### S-0114 — source — European Commission — €10.2B/yr cost of not having FAIR data
source_section: References [114]
edges:
  (none)

# S-0114 — Cost of not having FAIR

European Commission estimated minimum cost of not having FAIR research data at €10.2B/yr across the European Union.

**Use:** C-0032.

**Original whitepaper reference:** [114]

---

### S-0115 — source — Erasmus University 2012 / 2014 Smeesters report
source_section: References [115]
edges:
  (none)

# S-0115 — Smeesters / Erasmus

Erasmus University concluded in 2012 it had no confidence in Smeesters' scientific integrity; 2014 final report formally found misconduct across 7 papers. Smeesters' "computer crashed" + "selectively discarding data was nothing out of the ordinary in his field" defense.

**Use:** E-0063, C-0034.

**Original whitepaper reference:** [115]

---
