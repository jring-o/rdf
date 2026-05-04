## 11\. Recommendations

The analysis developed in Sections 2 through 8 supports seven recommendations addressed to three audiences: research institutions, funders, and the working group coordinating the development of reference infrastructure. Each recommendation identifies the audience, specifies the action, and sets out the rationale connecting the action to the architectural case.

### Recommendation 1: Conduct an architectural audit of existing data infrastructure

**Audience:** Research institutions (offices of research, information technology leadership, research libraries).

**Action:** Classify every research dataset the institution holds by its current architectural tier, using the framework developed in Section 2\. For each dataset, record the number of independent copies, the failure domains those copies occupy, the verification capability available, and the exposure to each failure mechanism documented in Section 3\. Complete the audit within twelve months.

**Rationale:** An institution cannot remediate architectural exposure it has not measured. The audit creates the baseline against which subsequent recommendations are scoped and priced, and it surfaces the datasets most immediately exposed to the failure mechanisms the institution has already experienced at peer institutions. The audit template produced by the working group (Appendix D) is designed to complete in approximately two staff-months at a research university of median size.

### Recommendation 2: Deploy at least one protocol-level preservation node on existing institutional infrastructure

**Audience:** Research institutions (research information technology, institutional repositories, research libraries).

**Action:** Deploy at least one Tier 3 preservation node — a BitTorrent seeder, a Tor relay, a Forgejo instance, an IPFS pinning node, or an AT Protocol personal data server — on existing institutional infrastructure within twelve months. Document the deployment as a reference configuration for subsequent institutions.

**Rationale:** Tier 3 is the only architecture that generates preservation redundancy and compliance verification as structural byproducts of operation. The marginal cost on existing infrastructure is effectively zero, as documented in Section 7\. The deployment establishes the institution's capacity to participate in protocol-level preservation before the mandate regime requires it, and produces the operational experience necessary to scale subsequent deployments. Reference configurations from existing deployments at TU Dortmund, TU Dresden, and the Massachusetts Institute of Technology \[100\]\[101\]\[102\] demonstrate that the operational overhead is within the capacity of existing information technology staff or student volunteers.

### Recommendation 3: Integrate compliance evidence generation into the data deposit workflow

**Audience:** Research institutions (offices of research compliance, research libraries, research information technology).

**Action:** Modify the data deposit workflow so that every dataset produces, at the point of deposit, the verification artifacts required by funder mandates: content-addressed identifiers, cryptographic hashes of all deposited objects, signed attestations of deposit location and access control state, and machine-readable metadata conforming to the forthcoming National Institutes of Health standardized Data Management and Sharing Plan format.

**Rationale:** Compliance evidence generated as a byproduct of the deposit workflow is the only configuration under which compliance checks become answerable by inspection rather than by retrospective investigation. The May 2026 National Institutes of Health format transition and the Gates Foundation's OA.Works monitoring program are both converging on machine-readable verification, and institutions whose deposit workflows do not produce the required artifacts will fail programmatic compliance checks they cannot currently see coming. This recommendation is the operational expression of the architectural property described in Section 8.2.

### Recommendation 4: Require verifiable evidence of data preservation, not self-reported plans

**Audience:** Funders (federal agencies, private foundations, international funders).

**Action:** Transition grant submission and progress reporting requirements from self-reported data management plans to verifiable evidence of deposit, distribution, and access. Specify the technical form of the evidence — content-addressed identifiers, cryptographic hashes, signed attestations from independent nodes — rather than the human-readable form of the plan.

**Rationale:** The compliance gap — 8% declared availability, 2% actual availability across 2.1 million articles \[84\] — is a direct consequence of a regime that measures plan existence rather than plan execution. Transitioning the reporting requirement to verifiable evidence aligns the compliance check with the architectural property that produces compliance in the first place. The Gates Foundation's 2025 transition to automated compliance monitoring through OA.Works \[68\] is the reference implementation of this recommendation at the funder level.

### Recommendation 5: Fund preservation through facilities and administrative cost recovery

**Audience:** Funders and research institutions (jointly, through facilities and administrative rate negotiation).

**Action:** Include preservation infrastructure as a recognized category in facilities and administrative cost rate calculations, and negotiate rates that reflect the long-term institutional cost of data stewardship. Treat preservation as a continuing facilities cost rather than a project-scoped expense.

**Rationale:** As the National Academies of Sciences, Engineering, and Medicine documented in 2020, "the current system for funding research is not conducive to data life-cycle cost forecasting" \[116\]. Grants run three to five years; preservation needs run decades. A funding mechanism that scopes preservation to grants forces researchers to deprecate preservation obligations at grant close, which is the operational origin of the failure mode described in Section 3.1. Facilities and administrative cost mechanisms already exist for exactly this purpose; the recommendation is to apply them.

### Recommendation 6: Maintain local clones and content-addressed copies of all research data

**Audience:** Principal investigators, laboratory directors, and individual researchers.

**Action:** As a standard laboratory practice, maintain at least one local clone and one content-addressed copy of every research dataset. Use Git for code; use BitTorrent, IPFS, or Git large-file storage for data; use Signal-style end-to-end encryption where the data is sensitive. Treat the clone and the content-addressed copy as non-optional components of the research workflow.

**Rationale:** The GitHub-Iran episode documented in Section 2.5 demonstrates the difference between using Tier 3 infrastructure and capturing its resilience properties \[25\]. A single local clone of a Git repository contains the complete repository history with cryptographic integrity, and its existence determines whether a Tier 1 access restriction produces permanent loss or temporary inconvenience. The recommendation is operationally trivial at the laboratory level and architecturally decisive at the institutional level.

### Recommendation 7: Publish reference deployments, audit templates, and cost models through coordinated working-group activity

**Audience:** The Resilient Data Futures working group, coordinated with partner organizations.

**Action:** Publish, under open licensing, reference deployment configurations for each protocol node class identified in Section 7.3, audit templates for Recommendation 1, cost models calibrated to the formula in Section 5.2, and case studies documenting institutional deployments. Update the material as the working group collects additional evidence.

**Rationale:** The adoption cost of each of the preceding recommendations declines as reference implementations accumulate. The Software Heritage project, the CLOCKSS documentation, the Forgejo and IPFS reference deployments, and the existing university Matrix and Tor deployments demonstrate that well-documented reference material substantially accelerates subsequent adoption. The SciOS working group is the natural convener of this material; publication under open licensing ensures that the material is not itself exposed to the failure modes documented in Section 3\.
