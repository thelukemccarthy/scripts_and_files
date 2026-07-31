# Confluence Documentation System Recommendation

## Purpose

**==Design a Confluence space structure that lets developers, BAs, and product managers find
documentation without relying on search.==** The system must make it obvious where to find
things and where to put new things - even for a new team member on day one.

This document captures the full design, rules, policies, rationale, and guidance for
iterating when problems arise.

---

## Principles

These principles are borrowed from PARA (Building a Second Brain - Tiago Forte) and adapted
for a shared team context rather than personal knowledge management.

1. **==Actionable vs reference must be obvious.==** Active Projects are time-bound work.
   Everything else is reference.
2. **==Archive aggressively.==** Completed work moves out of the active tree. What remains
   is current and trustworthy.
3. **==Structure over search.==** People find things by browsing a shallow, well-named tree.
   Search is a fallback, not the primary mechanism.
4. **==Flat until forced.==** Start flat. Only add sub-groupings when a section grows too
   large to scan. Headings on a parent page act as proto-categories before graduating to
   child pages.
5. **==Low friction to contribute.==** Templates reduce blank-page paralysis. Clear "put it
   here if..." rules eliminate decision fatigue.

---

## Space Structure

**==Five top-level sections. No more.==**

```
Space Home
 +-- Services
 +-- Standards
 +-- Guides
 +-- Active Projects
 +-- Archive
```

### Section Definitions

| Section         | Contains                                                                   | Put it here if...                                                    |
|-----------------|---------------------------------------------------------------------------|----------------------------------------------------------------------|
| Services        | One child page per service/product owned by the team                      | It describes, documents, or supports a specific service we own       |
| Standards       | Coding conventions, API standards, team agreements                        | It applies across all services as a rule or convention                |
| Guides          | How-tos, onboarding, dev setup, process guides                           | It teaches someone how to do something                               |
| Active Projects | Time-bound initiatives needing their own documentation                   | It needs a tech analysis/design doc and doesn't belong to one service|
| Archive         | Completed projects, superseded decisions, deprecated service docs         | It is no longer current                                              |

---

## Services - Detailed Structure

**==Every service gets a page with the same child page template.==** Empty placeholders are
kept to make missing documentation visible.

```
Services
 +-- [Service Name]
      +-- Overview
      +-- Architecture / Design
      +-- ADRs
      |    +-- ADR-001: [Decision title]
      |    +-- ADR-002: [Decision title]
      +-- Runbook
      +-- API Specification
      +-- Technical Analysis
           +-- [Analysis title]
```

### Service Page Template Content

#### Overview
- What this service does (one paragraph)
- Team ownership
- Key links: repository, CI/CD pipeline, dashboards, Jira board, Slack channel

#### Architecture / Design
- System context diagram
- Key technical decisions (link to ADRs)
- Dependencies (upstream and downstream)
- Data stores

#### ADRs
- Container page listing all ADRs for this service
- Each ADR is a child page using the ADR template

#### Runbook
- Common alerts and their responses
- Restart/recovery procedures
- Escalation path
- Health check endpoints
- Known failure modes

#### API Specification
- Contracts, endpoints, authentication
- Link to external spec if hosted elsewhere (e.g. Kong Developer Portal)

#### Technical Analysis
- Investigation docs, spikes, feasibility assessments
- Each analysis is a child page

---

## Standards Section

**==Flat list of pages. Each page is one standard.==**

Page titles must be specific and descriptive. Examples:
- "Java naming conventions"
- "REST API error response format"
- "Branch naming convention"
- "Pull request review checklist"

### Rules

- No sub-pages unless the section grows past 15 pages
- If grouping is needed, start with headings on a single index page
- Graduate headings to sub-pages only when a group has 5+ standards within it
- The heading text becomes the sub-page name

---

## Guides Section

**==Flat list of pages. Each page title starts with a verb.==**

Examples:
- "How to set up local development"
- "How to deploy to production"
- "How to onboard a new team member"
- "How to write an ADR"
- "Setting up VPN access"

### Rules

- No sub-pages unless the section grows past 15 pages
- If grouping is needed later, group by audience (developer, ops, new starter)
- Same graduation rule as Standards: headings first, sub-pages when earned

---

## Active Projects Section

**==Time-bound work that needs its own documentation.==**

### Qualification Rule

**==A piece of work qualifies as an Active Project if it needs a technical analysis or
design document before coding starts.==** If it can go straight from a Jira story to code,
it lives under the relevant service page instead.

An Active Project typically:
- Spans multiple services, OR
- Is large enough to need design docs, analysis, and tracked decisions outside Jira

### Structure

Each active project gets one page with child pages as needed:
```
Active Projects
 +-- [Project Name]
      +-- Technical Analysis
      +-- Design / Approach
      +-- Decisions
      +-- [Other pages as needed]
```

### Lifecycle

When a project is complete (shipped and stable), move the entire page tree to Archive.

---

## Archive Section

**==Mirrors the top-level structure.==** Archiving is just "move the page to the same
location but under Archive."

```
Archive
 +-- Services
 +-- Standards
 +-- Guides
 +-- Active Projects
```

### Rules

- When content is archived, move it to the matching section inside Archive
- Do not restructure, rename, or reorganise archived content
- Archive entire page trees together (don't split a project's pages across locations)
- Archived content is a historical record - it does not get updated

### What Gets Archived

| Trigger                      | Action                                           |
|------------------------------|--------------------------------------------------|
| Project is complete          | Move from Active Projects to Archive/Active Projects |
| Service is decommissioned    | Move from Services to Archive/Services           |
| Standard is superseded       | Move from Standards to Archive/Standards         |
| Guide is no longer relevant  | Move from Guides to Archive/Guides               |
| ADR is reversed/superseded   | Move from the service's ADR section to Archive   |

---

## Space Home Page

**==The home page answers three questions: what does this team do, what do they own, and
how do I find things.==**

### Layout

1. **Team name and purpose** - one sentence
2. **How this space is organised** - the five sections with "put it here if..." rules:
   - **Services** - service/product we own (runbooks, ADRs, specs, tech analysis all live
     under the relevant service)
   - **Standards** - coding conventions, API standards, team agreements that apply across
     all services
   - **Guides** - how-tos, onboarding, dev setup
   - **Active Projects** - time-bound initiatives that span multiple services or don't
     belong to one service
   - **Archive** - completed projects, superseded decisions, deprecated service docs
3. **Quick links** - Jira board, repositories, dashboards, Slack channel

---

## Naming Conventions

### General Rules

- **==No prefixes on page titles==** except ADRs. The page's location in the tree provides
  type context.
- Page titles must be specific and descriptive
- Guides start with a verb ("How to...", "Setting up...")
- Keep titles short - aim for under 60 characters

### ADR Naming

**==ADRs use a sequential number prefix: ADR-001, ADR-002, etc.==**

Format: `ADR-NNN: [Decision title]`

Examples:
- "ADR-001: Use PostgreSQL for event store"
- "ADR-002: Adopt trunk-based development"

#### Rules

- Numbers are sequential per service (each service starts at 001)
- Numbers are never reused, even if an ADR is superseded
- Reference ADRs in conversation and code comments by number ("see ADR-012")

#### Rationale

- Sequential numbers are short and memorable
- Easy to reference in standups, PRs, and code comments
- The creation date is visible in page metadata - no need to encode it in the title
- No coordination problems in practice (ADRs are infrequent enough)

---

## Page Templates

**==Three templates are mandatory: ADR, Runbook, Technical Analysis.==**

### ADR Template

```
Page Properties Macro:
  Status: [Proposed | Accepted | Superseded | Deprecated]
  Next Review: [date - see Maintenance section]

## Context

What is the issue motivating this decision?

## Decision

What is the change being proposed?

## Consequences

What becomes easier or harder as a result?

## Alternatives Considered

What other options were evaluated and why were they rejected?
```

### Runbook Template

```
Page Properties Macro:
  Next Review: [date - see Maintenance section]

## Service Overview

Brief description and architecture context.

## Health Checks

Endpoints, expected responses, monitoring dashboards.

## Common Alerts

| Alert | Cause | Response |
|-------|-------|----------|

## Recovery Procedures

Step-by-step instructions for common failure scenarios.

## Escalation

Who to contact and when.

## Dependencies

Upstream and downstream services that may be affected.
```

### Technical Analysis Template

```
Page Properties Macro:
  Status: [In Progress | Complete]
  Next Review: [Never]

## Problem Statement

What are we trying to solve and why?

## Constraints

Non-negotiable boundaries.

## Options

### Option A: [Name]
Description, pros, cons, effort estimate.

### Option B: [Name]
Description, pros, cons, effort estimate.

## Recommendation

Which option and why.

## Risks

What could go wrong with the recommended approach.
```

---

## Labels Policy

**==Labels are a secondary discovery mechanism, not primary navigation.==**

### Rules

- Labels do not replace tree structure for finding content
- Do not define a label vocabulary upfront
- Revisit labels as a second iteration once the structure is proven
- If labels are introduced later, define a fixed vocabulary of no more than 15 labels
  documented on the space home page

### Rationale

Labels only work with consistent team-wide application. Structure works without
discipline - the page tree is always visible. Get the structure right first.
Labels are polish for power users and automated content views.

---

## Maintenance Policy

### Review Cycle

**==Pages have a "Next Review" date stored in a Page Properties macro.==** A "Documentation
Health" page uses the Page Properties Report macro to list all pages and their review dates.

#### Review Frequency by Document Type

| Document Type      | Review Frequency | Rationale                                     |
|--------------------|------------------|-----------------------------------------------|
| Runbook            | 3 months         | Infrastructure changes frequently beneath them|
| Standards          | 6 months         | Stable but should be confirmed periodically   |
| Guides             | 6 months         | Tools and processes drift over time            |
| Technical Analysis | Never            | Point-in-time historical document             |
| ADR                | Never            | Historical record of a decision               |
| Service Overview   | 6 months         | Ownership and links change                    |

#### Review Outcomes

When a page reaches its review date, two outcomes exist:

1. **Still relevant** - update content if needed, reset "Next Review" date
2. **No longer relevant** - move to Archive

#### Documentation Health Page

A single page titled "Documentation Health" lives at the space root level (sibling to the
five sections). It uses the Page Properties Report macro to display:

- All pages with a "Next Review" date in the past
- Sorted by most overdue first

**==This page is the single source of truth for what needs attention.==**

#### Jira Integration

Overdue pages can generate Jira cards for the team to address during sprint planning.
This makes documentation maintenance visible work rather than invisible debt.

### New Joiner Review

**==When a new team member joins, assign them to work through key docs as part of
onboarding.==** They update or flag anything incorrect as they go.

This achieves two things simultaneously:
1. The new joiner learns the systems
2. Documentation gets a real-world accuracy test

New joiners should work through (in order):
1. Space home page
2. Onboarding guide (in Guides)
3. Service overview pages for services they'll work on
4. Runbooks for those services

Anything they find wrong or confusing is either fixed immediately or raised as a Jira card.

---

## Governance Rules

### Where to Put Things

| I have a...                                  | It goes in...                            |
|----------------------------------------------|------------------------------------------|
| Document about how a specific service works  | Services / [Service Name]                |
| A decision record for a service              | Services / [Service Name] / ADRs         |
| A rule that applies to all services          | Standards                                |
| Instructions on how to do something          | Guides                                   |
| Design work for a multi-service initiative   | Active Projects                          |
| Something that is no longer current          | Archive / [matching section]             |

### Page Creation Rules

1. **==Every new page must live inside one of the five top-level sections.==** No pages at
   the space root except the home page and Documentation Health page.
2. New service pages use the full service template (all child pages created, even if empty).
3. ADRs, Runbooks, and Technical Analysis pages use their respective templates.
4. Pages without a clear home - ask the team in Slack rather than dumping at root.

### Page Modification Rules

1. Update the "Last Modified" note if making substantive changes to a runbook or standard.
2. Do not delete pages - archive them instead.
3. If a page is wrong, fix it. If you're unsure, add a note at the top flagging the concern.

### Team Agreement

**==If you cannot figure out where a page belongs within 30 seconds, ask in Slack.==**
Do not create pages outside the structure. This is how spaces become unsearchable.

---

## Iteration Guidance

**==This system is a starting point, not a final state.==** It will need adjustment as the
team users the new system.

### When to Iterate

| Signal                                        | Response                                     |
|-----------------------------------------------|----------------------------------------------|
| A section has more than 15 child pages        | Introduce grouping (headings first, then sub-pages) |
| People keep putting things in the wrong place | Clarify the "put it here if..." rules on the home page |
| A document type appears that doesn't fit      | Discuss in team, add a new section only if it genuinely doesn't fit anywhere |
| Labels keep being requested                   | Define a fixed vocabulary, document on home page |
| The team grows significantly                  | Consider splitting into sub-spaces per product area |
| Archive grows too large to browse             | Group archive contents by year                |
| Templates aren't being used                   | Simplify them - remove fields people skip    |

### How to Iterate

1. **==Headings before pages.==** When a flat section needs structure, add headings to the
   parent page first. This is cheap to change, move, and rename.
2. **==Graduate to sub-pages==** only when a heading group has 5+ items beneath it. The
   heading text becomes the sub-page title.
3. **==One change at a time.==** Don't restructure multiple sections simultaneously. Change
   one thing, live with it for a sprint, then assess.
4. **==Update the home page==** whenever the structure changes. The home page is the
   contract with the team about how the space works.

### Common Problems and Fixes

#### "People aren't documenting things"

- Check if templates exist for what they need to write
- Check if they know where to put it (home page clear enough?)
- Make documentation part of "definition of done" for stories that warrant it
- The blank page is the enemy - templates solve this

#### "Pages are going stale"

- Check the Documentation Health page regularly
- Create Jira cards for overdue reviews
- Attach review work to new joiner onboarding
- Reduce review frequency if the team can't keep up (better to review annually than never)

#### "Someone created pages outside the structure"

- Move them to the correct location (don't delete)
- Remind the team of the 30-second rule
- If it keeps happening with the same type of content, the structure has a gap - fix it

#### "We've inherited docs from another team"

- Don't migrate everything at once
- Identify which docs are still relevant
- Move relevant docs into the matching section of this space
- Archive or leave behind anything that's no longer the team's responsibility

#### "A new service/product is assigned to us"

- Create the full service template immediately (all child pages)
- Populate Overview first (takes 15 minutes)
- Fill other sections as the team learns the service
- Empty pages are visible reminders of documentation debt

---

## Implementation Checklist

1. Create the new Confluence space
2. Set up the home page with layout described above
3. Create the five top-level section pages
4. Create Archive sub-pages mirroring the structure (Services, Standards, Guides,
   Active Projects)
5. Create page templates (ADR, Runbook, Technical Analysis)
6. Create the Documentation Health page with Page Properties Report macro
7. Create service pages for known services using the full template
8. Populate service Overview pages (minimum viable content)
9. Write the onboarding guide in Guides
10. Communicate the system to the team - walk through the home page together

---

## Rationale Summary

| Decision                            | Reason                                                       |
|-------------------------------------|--------------------------------------------------------------|
| Dedicated space                     | Full control, clean reset, no inherited mess                 |
| Five top-level sections             | Few enough to hold in memory, covers all document types      |
| Project-first not type-first        | People know what they're working on, not what doc type they need |
| Flat until forced                   | Avoids premature structure, cheap to iterate                 |
| Templates with empty placeholders   | Makes missing docs visible, reduces blank-page friction      |
| Sequential ADR numbers              | Short, memorable, easy to reference in conversation          |
| No page title prefixes (except ADR) | Tree location provides context, keeps titles clean           |
| Mirrored archive                    | Zero thought required to archive - same mental model         |
| Page Properties for review dates    | Enables automated reporting without admin access             |
| No labels initially                 | Structure first, polish later                                |
| No page ownership                   | Creates handover debt, concentrates work on individuals      |
