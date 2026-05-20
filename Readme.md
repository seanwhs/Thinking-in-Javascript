# JavaScript From First Principles

### A Personal Knowledge Base for Future-Me

This repository serves as a reference for my future self.

It is an attempt to reverse-engineer how JavaScript actually behaves as a runtime system.

I built this because memorizing syntax was not the problem—understanding execution was.

I wanted to understand:

* why closures retain state
* why `var` behaves differently from `let`
* how the event loop schedules work
* why async code feels “magical”
* how prototypes actually delegate behavior
* how Node.js hides concurrency behind a single-threaded model
* why functional programming improves predictability
* why browser rendering freezes under load
* how DOM events propagate through a structured system
* how workers introduce real parallelism
* how streams model backpressure
* how module systems evolved from chaos → structure

This repo is intentionally verbose.

Every file is written as if I’m teaching my future self after forgetting everything six months later.

---

# Philosophy

I no longer want to learn JavaScript as:

> “Here’s syntax. Memorize it.”

Instead:

> “Here is how the runtime allocates memory, schedules tasks, resolves scope chains, propagates events, batches rendering, and orchestrates concurrency.”

This shift reframes everything.

This repo becomes:

* a runtime observability notebook
* a mental model reconstruction system
* a browser + Node execution simulator (conceptually)
* a systems architecture lens over everyday code

---

# Instrumentation Layer (Runtime Lab Kit)

This repository now includes a **live runtime inspection tool**:

```js
runtime-lab-kit.js
```

It turns the browser into a teaching environment.

## What it exposes

### 🧠 Memory Behavior (GC visibility)

* Tracks object lifecycle using `FinalizationRegistry`
* Observes garbage collection events (non-deterministic by design)

### ⚡ Event Loop Pressure

* Measures macro-task lag via `setTimeout`
* Simulates blocking work to expose UI starvation

### 🎨 Rendering / Layout Thrashing

* Forces read/write layout cycles
* Demonstrates reflow + repaint penalties
* Exposes DOM performance traps

---

## Why this matters

I'm no longer guessing what the runtime is doing.

I'm observing it.

---

## Usage

```js
__RUNTIME_LAB__.help()

const obj = __RUNTIME_LAB__.memory.track({}, "test-object")

__RUNTIME_LAB__.eventLoop.measureLag()
__RUNTIME_LAB__.eventLoop.block(200)

__RUNTIME_LAB__.render.runLayoutThrash({ iterations: 5, nodes: 100 })
```

---

## Mental Model Shift

Instead of:

> “Why is my UI slow?”

You begin asking:

> “Which subsystem is saturated: JS execution, layout invalidation, or task queue starvation?”

---

# Module System Evolution (Critical Architectural Gap)

JavaScript did not start structured. It accumulated structure through constraints.

---

## 1. IIFE Era (Scope Isolation Hack)

```js
(function () {
  const secret = 123;
})();
```

A workaround for missing module systems.

---

## 2. CommonJS (Server-First Modules)

```js
const lib = require("./lib");
module.exports = { lib };
```

Characteristics:

* synchronous loading
* runtime resolution
* cached execution
* singleton-like behavior

> Modules execute when required, not when defined.

---

## 3. AMD (Browser Async Era)

Designed for the browser:

* asynchronous dependency loading
* explicit dependency arrays
* loader-driven execution

Mostly historical, but conceptually important.

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

## Key Differences

### Static vs Dynamic Linking

* `require()` → runtime resolution
* `import` → compile-time graph construction

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

* CommonJS → partially initialized exports
* ESM → live bindings with temporal resolution

---

### Top-Level Await (ESM only)

```js
const data = await fetch(url);
```

> Modules themselves become async execution units

---

# Core Concepts Covered

---

## 1. Scope & Lexical Environments

* global / function / block scope
* lexical scoping
* scope chains
* TDZ behavior

> Variables live in execution contexts, not global space.

---

## 2. Closures

Functions retain references, not copies.

Used for:

* state encapsulation
* memoization
* async continuation
* private data

---

## 3. Execution Context & Call Stack

* memory phase vs execution phase
* stack-based invocation model

> Code does not “run”—execution contexts are pushed and popped.

---

## 4. Hoisting & TDZ

* `var` → initialized as `undefined`
* `let/const` → uninitialized until execution
* declarations exist before execution begins

---

## 5. Prototypes & Delegation

Objects delegate behavior:

> Property lookup flows up the prototype chain.

Not inheritance—delegation.

---

## 6. Event System (DOM)

The DOM is a propagation system:

```txt
Capture → Target → Bubble
```

Events are routed, not delivered.

---

## 7. Event Delegation

```js
parent.addEventListener("click", e => {
  if (e.target.matches("button")) {}
});
```

> The DOM becomes a routing layer.

---

## 8. Custom Events

```js
new CustomEvent("cart:updated", { detail });
```

> Direct calls evolve into event-driven architecture.

---

## 9. Event Loop & Rendering Model

Execution ordering:

1. macrotask
2. microtasks
3. render checkpoint
4. style → layout → paint → composite

---

### Critical Insight

JavaScript does not render UI.

It schedules rendering.

---

### Layout Thrashing

```js
el.offsetHeight
```

Forces synchronous layout recalculation.

> JS ↔ layout ping-pong destroys frame performance.

---

### Microtask Starvation

Infinite microtasks can block rendering entirely.

---

## 10. Browser Runtime Model

Three subsystems:

* JavaScript engine
* rendering engine
* input system

Frame cycle:

```txt
Input → JS → Microtasks → Render → Paint → Frame
```

---

## 11. Node.js Runtime Model

Node.js uses:

* libuv
* thread pool
* OS async APIs

> JavaScript is single-threaded; the runtime is not.

---

## 12. Web Workers

* true parallel execution
* isolated runtime contexts
* message-passing only
* no DOM access

---

## 13. Streams & Async Iteration

Evolution:

* Iterator → sync sequence
* Generator → paused computation
* Async Iterator → async sequence
* Async Generator → backpressure-aware pipeline

---

## 14. Functional Programming

FP is predictability engineering:

* pure functions
* immutability
* composition

> imperative flow → declarative pipelines

---

## 15. Composition

```js
pipe(a, b, c)(x)
```

Instead of:

```js
c(b(a(x)))
```

---

## 16. Effects & Monads

* Maybe → null safety
* Either → error handling
* IO → side-effect isolation

---

# Architectural Themes

| Theme              | Appears In        |
| ------------------ | ----------------- |
| Scope isolation    | closures, TDZ     |
| Scheduling         | event loop        |
| State preservation | closures, modules |
| Delegation         | prototypes, DOM   |
| Composition        | FP                |
| Concurrency        | workers, Node.js  |
| Streaming          | async iterators   |

---

# Final Mental Model

JavaScript is not a scripting language.

It is a **runtime orchestration system** composed of:

* lexical environments
* task queues
* delegation chains
* async pipelines
* rendering coordination layers

---

# Final Insight

Syntax is simple.

The system is not.

This repository exists to model the system—not memorize the syntax.

