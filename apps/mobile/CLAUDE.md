@AGENTS.md

# Relio — Claude Code Working Context

## Mission

Work as a senior frontend engineer and software architect on Relio.

The goal is to build a clean, modular, maintainable React Native / Expo application while preserving the intended product behavior and visual identity.

Read `AGENTS.md` and follow it as the project's durable engineering rules.

---

# Current Project State

Relio is currently in a frontend refactoring phase.

The existing implementation is a prototype and represents approximately 80% of the planned product.

The current code may therefore contain:
- duplicated logic
- oversized screens
- inline mock data
- temporary structures
- incomplete flows
- architecture that does not yet reflect the final product

Do not assume the current filesystem structure is authoritative.

## Refactoring progress

Already migrated to the target structure:

- `auth` (login, register, verify)
- onboarding (route-local components under `app/(onboarding)/`)
- `payment`
- `profile`
- `mission` (client request flow, provider mission flow, both home screens)

Still in prototype form:

- the splash and welcome screens (`app/index.tsx`, `app/welcome.tsx`)

---

# Current Architectural Direction

The project is moving toward a feature-based architecture organized around business domains.

Current validated domains:

- `auth`
- `profile`
- `mission`
- `payment`

Current open architectural questions:

- `review` — the "évaluations données / reçues" screen currently lives in
  `profile` because it is reached from the account space. Its data access is
  isolated in `profile/services/reviews.service.ts` so it can be extracted if
  reviews become a domain.
- `notifications`
- `become-pro` — the promo card, the application screen and its status
  currently live in `profile`, with the application logic isolated in
  `profile/services/pro-application.service.ts`.
- activity history — `profil/history` lists missions and payments. It stayed
  in `profile` after the `mission` refactoring: it is an account-level recap
  across domains, not the mission lifecycle itself. Revisit it if it starts
  needing mission business rules.

These decisions are not permanent and may change as the remaining product is implemented.

Do not silently turn an open question into a permanent architectural rule.

---

# Important Domain Understanding

## Mission

`mission` is currently the central operational domain.

Client and provider are different user experiences around the same underlying intervention.

Do not duplicate the underlying mission business logic simply because the screens differ between client and provider.

Data access is split by reading side rather than by screen:

- `service-catalog.service` — trade categories, shared by both sides
- `service-request.service` — client requests, their filters and timeline
- `provider-matching.service` — matching and the assigned professional
- `intervention.service` — journal, Relio tariff, QR code validity
- `provider-mission.service` — everything the provider sees of a mission

Both home screens belong to `mission`: they are the entry points of the
request and mission lifecycle, not a domain of their own. The client home
reuses `profile`'s `BecomeProPromoCard`, which is a domain interaction, not
ownership.

## Payment

Payment is currently treated as a distinct business responsibility even though it occurs during the mission lifecycle.

Mission may trigger payment-related behavior without owning all payment logic.

Payment owns its screens wherever their route happens to live: the saved
payment methods screen is routed under `app/(client)/profil/`, and the provider
"awaiting payment" screen under `app/(prestataire)/mission/`, but both belong
to `features/payment`. Routes describe navigation, not ownership.

## Profile

Profile represents account information and configuration.

Do not automatically merge profile and authentication logic.

## Auth

Auth represents access, authentication, session, and account entry.

---

# Refactoring Strategy

When refactoring the prototype:

1. Understand the existing behavior first.
2. Identify the responsibility of the code being changed.
3. Move code to the correct architectural owner.
4. Extract reusable pieces.
5. Remove duplication.
6. Keep behavior unchanged unless the task explicitly requires a product change.
7. Keep the UI unchanged unless a design change is explicitly requested.

It is acceptable to significantly restructure or delete existing code when the new structure is clearly better.

Do not preserve bad architecture simply because it already exists.

---

# Decision Making

When unsure where code belongs, determine:

- business responsibility
- ownership
- scope
- state ownership
- reuse
- dependencies

Do not decide based only on the current filename or route.

If two architectural choices are both reasonable, prefer the simpler one with clearer ownership.

If a decision affects domain boundaries, surface the ambiguity instead of silently inventing a rule.

---

# Routes

Expo Router routes should primarily describe navigation.

Prefer:

```text
app route
→ feature screen
→ feature logic
````

rather than putting large implementations directly inside route files.

---

# Components

Before creating a shared component, determine whether it is:

1. generic UI
2. domain-specific UI
3. a layout/navigation component

Keep domain-specific components inside their feature unless they are genuinely shared.

Avoid creating generic abstractions prematurely.

`components/ui/` currently provides: `Button`, `Input`, `Header`, `Card`,
`Badge`, `Avatar`, `StepPagination`, `Notice`, `BottomBar`, `RatingStars`,
`RatingSummary`, `FilterChips`, `SegmentedTabs`, `EmptyState`, `StatCard`,
`BrandHeader`, `ModeSwitchBadge`.

`Header` covers the two header shapes used across the product: plain, and
`bordered` for screens with a separator under the top bar. Prefer extending an
existing primitive over re-implementing a header or an action bar in a screen.

Two tab shapes coexist on purpose: `FilterChips` for a scrollable list of
filters, `SegmentedTabs` for a full-width bar of equally sized tabs.

---

# Hooks and Stores

Use hooks for reusable React behavior.

Use stores only for genuinely shared application state.

Do not create hooks or stores just to make the architecture look more sophisticated.

---

# Services and Mocks

There is currently no production API.

Use services as the boundary between application logic and external data.

Mocks are temporary development data and should not leak into unrelated UI components.

Do not invent backend endpoints or contracts unless explicitly requested.

---

# Notifications

Notifications are currently considered a cross-cutting capability.

Business domains may trigger notifications.

Do not make notification delivery part of the business logic of the domain that triggered it.

This decision may evolve if notifications become a substantial product capability.

---

# Before Large Changes

For significant refactoring:

* inspect the relevant files first
* identify dependencies
* identify affected routes
* identify affected features
* avoid unrelated changes

Prefer a sequence of coherent changes over a repository-wide uncontrolled rewrite.

---

# After Changes

Before considering a task complete:

* run TypeScript checks
* verify imports
* verify affected routes
* verify affected screens
* verify no obvious duplication was introduced
* verify domain ownership remains clear
* verify consistency with `AGENTS.md`

---

# Documentation

When a durable architectural rule changes:

* update `AGENTS.md` if it is a project-wide rule
* update this file if it concerns the current working architecture or active refactoring context

Do not add temporary implementation details to `AGENTS.md`.

````

### La différence entre les deux est donc nette

```text
AGENTS.md
→ règles qui doivent rester vraies longtemps

CLAUDE.md
→ contexte architectural actuel + manière de travailler maintenant
````

Et surtout, **`CLAUDE.md` pourra changer beaucoup plus souvent** pendant notre refactorisation : quand on aura définitivement tranché `review`, quand `notifications` sera implémenté, quand l'API arrivera, etc.
