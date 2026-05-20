# JavaScript From First Principles

### A Personal Knowledge Base for Future-Me

This repository is not a “JavaScript tutorial.”

It is my attempt to reverse-engineer how JavaScript actually thinks.

I built this repo because I got tired of memorizing syntax without understanding runtime behavior. I wanted to understand:

* why closures work
* why `var` behaves differently from `let`
* how the Event Loop actually schedules work
* why async code feels “magical”
* how prototypes really chain together
* how Node.js hides concurrency behind a single-threaded model
* why functional programming creates more predictable systems
* why browser rendering freezes under load
* how DOM events propagate through a structured system
* how workers enable true parallelism
* how streams model backpressure and async flow
* how encapsulation evolved from closures → Symbols → private fields
* how module systems evolved from chaos to structure

This repo became my personal JavaScript laboratory.

It is intentionally verbose.

Every file is written like I’m teaching my future self after forgetting the concept six months later.

---

# Philosophy

I no longer want to learn JavaScript as:

> “Here’s syntax. Memorize it.”

I want to learn it as:

> “Here’s how the engine allocates memory, schedules tasks, resolves scope chains, preserves closures, propagates events, batches rendering, and moves work across threads.”

That shift changes everything.

This repo is:

* a notebook
* a runtime documentation layer
* a systems architecture study
* a mental model reconstruction exercise
* a distributed systems lens applied to the browser and Node

---

# Module System Evolution (Critical Architectural Gap)

JavaScript did not start structured.

It evolved through layered constraints:

## 1. IIFE Era (Isolation via Scope)

Before modules:

```js
(function () {
  const secret = 123;
})();
```

**Idea:** Use function scope to simulate modules.

---

## 2. CommonJS (Node.js)

```js
const lib = require("./lib");
module.exports = { ... };
```

Key traits:

* synchronous loading
* runtime resolution
* cached singletons
* Node-first design

> Modules are executed when required, not when defined.

---

## 3. AMD (Browser Async Modules)

Designed for browsers:

* asynchronous loading
* dependency arrays
* loader-based execution

Mostly historical now, but important conceptually.

---

## 4. ES Modules (Modern Standard)

```js
import { add } from "./math.js";
export function add() {}
```

Key properties:

* static analysis
* compile-time dependency graph
* hoisted imports
* strict mode by default

---

## Critical Differences

### Static vs Dynamic

* `require()` → dynamic runtime evaluation
* `import` → static compile-time graph

---

### Tree Shaking

Because ES modules are static:

> unused exports can be eliminated at build time

---

### Module Caching

Both systems cache modules:

> A module is evaluated once, then reused by reference

---

### Circular Dependencies

* CommonJS: partially initialized exports
* ESM: live bindings with temporal resolution

---

### Top-Level Await (ESM only)

```js
const data = await fetch(url);
```

> Modules themselves become async units of execution

---

# What This Repo Covers

---

# 1. Scope & Lexical Environments

* global / function / block scope
* lexical scoping
* scope chains
* TDZ behavior

> Variables live in execution-time environments, not in global space.

---

# 2. Closures

Functions retain references, not copies.

Use cases:

* state retention
* memoization
* encapsulation
* async callbacks

---

# 3. Execution Contexts & Call Stack

* memory phase vs execution phase
* stack-based execution
* function invocation lifecycle

> Code does not “run” — contexts are pushed and popped.

---

# 4. Hoisting & TDZ

* `var` → initialized as `undefined`
* `let/const` → uninitialized until execution
* identifier registration happens before execution

---

# 5. Prototypes & Delegation

Objects delegate behavior:

> property lookup flows upward through prototype chains

Not inheritance—delegation.

---

# 6. Event System (DOM)

The DOM is a propagation system:

```txt
Capture → Target → Bubble
```

Events are not delivered—they propagate.

---

# 7. Event Delegation

One listener replaces many:

```js
parent.addEventListener("click", e => {
  if (e.target.matches("button")) {}
});
```

> The DOM becomes a routing layer.

---

# 8. Custom Events

```js
new CustomEvent("cart:updated", { detail });
```

> Direct calls → event-driven architecture

---

# 9. Event Loop & Rendering Model

## Execution Order

1. macrotask (event handler)
2. microtasks (Promises)
3. render checkpoint
4. style → layout → paint → composite

---

## Key Insight

> JavaScript does not render anything. It schedules rendering.

---

## Layout Thrashing

```js
el.offsetWidth
```

Forces synchronous layout recalculation.

> JS ↔ layout ping-pong kills frame performance

---

## requestAnimationFrame

Aligns logic with frame boundary.

---

## Microtask Starvation

Infinite promises can block rendering entirely.

> microtasks always run before paint

---

# 10. Browser Runtime Model

Three subsystems:

* Input system
* JS runtime
* Rendering engine

Frame cycle:

```txt
Input → JS → Microtasks → Render → Paint → Frame
```

---

# 11. Node.js Runtime Model

* JS is single-threaded
* Node is not

Uses:

* libuv
* thread pool
* OS async APIs

> Concurrency is orchestrated outside JavaScript.

---

# 12. Web Workers

* true parallel execution
* isolated V8 instances
* message passing only
* no DOM access

---

# 13. Streams & Async Iteration

Progression:

* Iterator → sync sequence
* Generator → paused state machine
* Async Iterator → async stream
* Async Generator → backpressure-aware pipeline

---

# 14. Functional Programming

FP = predictability engineering

* pure functions
* immutability
* composition

> imperative control flow → declarative pipelines

---

# 15. Function Composition

```js
pipe(x → a → b → c)
```

Instead of nested calls:

```js
c(b(a(x)))
```

---

# 16. Monads & Effects

Controlled execution wrappers:

* Maybe (null safety)
* Either (error handling)
* IO (side effects isolation)

---

# Module Examples (Real Code Layer)

## Stateful CommonJS Module (Singleton via Cache)

```js
let runningTotal = 0;

function add(valueToAdd) {
  if (typeof valueToAdd !== "number" || !Number.isFinite(valueToAdd)) {
    throw new TypeError("Value must be finite number");
  }

  runningTotal += valueToAdd;
  return runningTotal;
}

module.exports = { add };
```

### Key Insight

> Node caches modules → state persists like a singleton

---

## CommonJS Usage

```js
const statefulMath = require("./statefulMath");

console.log(statefulMath.add(5));
```

---

## ES Module (Stateless Pure Function)

```js
export function add(a, b) {
  return a + b;
}
```

---

## ES Module Usage

```js
import { add } from "./math.js";

console.log(add(2, 3));
```

---

# Architectural Themes

| Theme              | Appears In        |
| ------------------ | ----------------- |
| Scope isolation    | closures, TDZ     |
| Deferred execution | event loop        |
| State preservation | closures, modules |
| Delegation         | prototypes, DOM   |
| Scheduling         | micro/macrotasks  |
| Composition        | FP                |
| Isolation          | workers           |
| Streaming          | async iterators   |

---

# Final Mental Model

JavaScript is not a scripting language.

It is a **runtime orchestration system** composed of:

* lexical environments
* scheduling queues
* delegation chains
* async pipelines
* rendering coordination

---

# Final Insight

Syntax is simple.

The system is not.

This repository exists to model the system—not memorize the syntax.

