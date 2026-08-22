# Relio — Engineering Guidelines

## Expo

**# Expo HAS CHANGED**

Read the exact versioned docs at [https://docs.expo.dev/versions/v54.0.0/](https://docs.expo.dev/versions/v54.0.0/) before writing any code.

Use the documentation matching the installed Expo version.
Do not rely on generic or unversioned Expo documentation.

---

# Project

Relio is a mobile application built with:

- React Native
- Expo
- Expo Router
- TypeScript

The project is frontend-first and may evolve as backend services are introduced.

---

# Architecture

Relio uses a **feature-based architecture organized around business responsibilities**, not around screens or routes.

Keep these responsibilities distinct:

- `app/` → routing and navigation
- `features/` → business domains
- `components/` → shared UI
- `hooks/` → reusable React behavior
- `stores/` → shared application state
- `services/` → external/data access
- `mocks/` → temporary fake data
- `types/` → shared TypeScript contracts
- `theme/` → design tokens
- `assets/` → visual resources
- `utils/` → generic pure utilities

---

# Business Domains

A business domain is a coherent business responsibility with its own concepts, rules, state, and potential for independent evolution.

Do not define a domain solely because:

- there is a screen for it;
- there is a route for it;
- there is a navigation tab for it;
- there is a user flow for it;
- there is a folder with the same name.

A route, screen, persona, flow, or UI component may belong to a domain without being a domain itself.

Domain boundaries may evolve as the product evolves.

Do not create new top-level domains without a clear business justification.

---

# Routing

`app/` is responsible primarily for Expo Router.

Keep route files thin whenever practical.

Do not place large amounts of business logic, duplicated UI, or large datasets directly inside route files.

Prefer:

`route → feature screen → domain logic`

---

# Features

Feature folders represent business responsibilities.

A feature may contain only the structures it actually needs, for example:

```text
feature/
├── components/
├── screens/
├── hooks/
├── services/
├── types/
└── utils/
````

Do not create empty folders for symmetry.

Do not introduce abstractions before there is a real need for them.

---

# Domain Boundaries

Related domains may interact without becoming one domain.

For example:

```text
Domain A → triggers → Domain B
```

does not imply:

```text
Domain A owns Domain B
```

Avoid unnecessary coupling and circular dependencies.

Keep domain-specific logic inside its owning feature.

---

# Shared UI

Use `components/` for genuinely reusable UI.

Generic components belong in `components/ui/`.

Examples:

* Button
* Input
* Card
* Modal
* Badge
* Avatar

Do not move domain-specific components into shared folders merely because they are reused in multiple places.

---

# Types

Types define data shapes and contracts.

Keep domain-specific types close to their domain when practical.

Use global `types/` only for types that are genuinely shared across domains.

Avoid giant centralized files containing unrelated business models.

---

# State

Prefer local state for local concerns.

Use stores only when state must be shared across multiple parts of the application or must outlive a single component.

Do not create global state merely because it is convenient.

---

# Hooks

Use hooks to encapsulate meaningful or reusable React behavior.

Keep domain-specific hooks inside their feature.

Do not create hooks for trivial wrappers without a clear benefit.

---

# Services and Data Access

Keep data access separate from UI.

Prefer:

```text
UI
→ service
→ data source
```

The data source may initially be mocks or local data and may later become an API.

Do not couple UI components directly to backend implementation details.

Do not invent backend contracts unless explicitly requested.

---

# Mocks

Mock data is temporary development data.

Keep mocks typed and separate from production logic.

Avoid large inline mock datasets inside screens.

---

# Theme and Assets

Use `theme/` for reusable design tokens such as:

* colors
* typography
* spacing
* radius
* shadows

Organize `assets/` by purpose and keep feature-specific assets close to the owning feature when appropriate.

Avoid hardcoding repeated design tokens when they belong to the design system.

---

# Code Quality

Prefer:

* clear ownership
* explicit data flow
* small focused components
* strong typing
* low coupling
* reusable domain logic
* predictable naming

Avoid:

* giant components
* duplicated business logic
* circular dependencies
* generic dumping-ground folders
* premature abstractions
* architecture created only for appearance

---

# Refactoring

When refactoring existing code:

1. Preserve intended product behavior.
2. Preserve the established visual language unless a design change is requested.
3. Extract before redesigning.
4. Remove duplication when ownership is clear.
5. Do not invent business rules to make the architecture look complete.
6. Prefer simple and reversible structures when the domain boundary is uncertain.
7. Update architectural documentation when a durable architectural rule changes.

---

# Decision Principle

When choosing where code belongs, ask:

1. What responsibility does this code have?
2. Who owns that responsibility?
3. Is it domain-specific or shared?
4. Does it represent business logic, UI, state, data access, or infrastructure?
5. Will this boundary remain understandable as the product grows?

Choose the simplest structure that preserves clear ownership and allows the product to evolve.

```

Cette version est volontairement **indépendante de notre état actuel** : elle ne dit pas « Relio possède exactement `auth`, `profile`, `mission`, `payment` », parce que cette cartographie pourra évoluer. Elle donne plutôt à Claude **les règles pour décider correctement quand elle évoluera**.
```
