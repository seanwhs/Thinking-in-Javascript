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
* how streams model backpressure and asynchronous flow
* how encapsulation evolved from closures → Symbols → private fields

This repo became my personal JavaScript laboratory.

It is intentionally verbose.

Every file is written like I’m teaching my future self after forgetting the concept six months later.

---

# Philosophy of This Repository

I no longer want to learn JavaScript as:

> “Here’s syntax. Memorize it.”

I want to learn it as:

> “Here’s how the engine allocates memory, schedules tasks, resolves scope chains, preserves closures, propagates events, batches rendering, and moves work across threads.”

That shift changed everything.

This repo is:

* part notebook
* part runtime documentation
* part systems architecture study
* part mental-model reconstruction
* part distributed-systems thinking applied to the browser

---

# What This Repo Covers

---

# 1. Scope & Lexical Environments

Foundational execution model:

* Global / Function / Block scope
* Lexical scoping
* Scope chains
* `var` vs `let` vs `const`
* TDZ (Temporal Dead Zone)

Core mental shift:

> Variables do not “exist globally.” They live inside lexical environments created per execution context.

---

# 2. Closures

Closures are not magic—they are **persistent lexical environment references**.

Key insight:

> Functions do not copy outer variables. They retain references to environments.

Applications:

* stateful counters
* memoization
* encapsulation patterns
* async callbacks
* loop capture behavior

---

# 3. Execution Contexts & Call Stack

JavaScript execution model:

* Global Execution Context (GEC)
* Function Execution Context (FEC)
* Memory creation phase vs execution phase
* Call stack behavior

Mental model shift:

> Functions do not “run.” Execution contexts are pushed and popped on a stack.

---

# 4. Hoisting & Temporal Dead Zone

Hoisting is not relocation.

It is **memory allocation before execution**.

Phases:

* Identifier registration
* `var` initialized as `undefined`
* `let` / `const` remain uninitialized (TDZ)

---

# 5. Prototypes & Delegation

Objects are not class instances.

They are **delegation chains**.

Core idea:

> Property lookup flows through prototype chains, not class hierarchies.

---

# 6. Event System (DOM Propagation Model)

The DOM is not a tree of static nodes.

It is a **signal propagation network**.

## Event Flow

```txt
Capture Phase   → down the tree
Target Phase    → execution point
Bubbling Phase  → back up the tree
```

## Key Insight

> Events are not delivered. They are propagated.

---

# 7. Event Delegation

Instead of attaching many listeners:

> Use one parent listener and route via `event.target`.

The DOM becomes a **routing system**.

Benefits:

* scalability
* dynamic UI support
* reduced memory overhead

---

# 8. Custom Events

Custom events turn the DOM into a **message bus**.

```js
new CustomEvent("cart:updated", { detail });
```

Architecture shift:

> Direct function calls → decoupled event-driven systems

---

# 9. The Event Loop & Rendering Model

This is where frontend behavior actually becomes predictable.

---

## 9.1 The Critical Misconception

> “User action triggers immediate UI update”

Reality:

> Input → event queue → JS execution → microtasks → render pipeline → paint

---

## 9.2 Execution Order

1. **Macrotask (Event Handler executes)**
2. **Microtasks (Promises flush)**
3. **Render Checkpoint**
4. **Style → Layout → Paint → Composite**

---

## 9.3 Key Insight

> DOM events do NOT trigger rendering directly. They schedule JavaScript execution that eventually leads to rendering.

---

## 9.4 Layout Thrashing

```js
element.offsetWidth // forces sync layout
```

Causes:

> JS ↔ Layout ping-pong inside a single frame

Result:

* jank
* input lag
* frame drops

---

## 9.5 requestAnimationFrame

Aligns JS with frame timing:

> “Run this right before render”

It is the bridge between:

* JS execution
* rendering pipeline

---

## 9.6 Microtask Starvation

Infinite promise chains can block rendering:

> microtasks run before render is allowed

Meaning:

> Promises can freeze the UI even without heavy computation

---

# 10. Unified Browser Runtime Model

The browser is a single coordinated system:

## Three Core Layers

### 1. Input System

* clicks
* scroll
* network events

### 2. JavaScript Runtime

* event loop
* macrotasks
* microtasks

### 3. Rendering Engine

* style
* layout
* paint
* composite

---

## Frame Cycle

```txt
Input → JS Execution → Microtasks → Render → Paint → Frame
```

---

## Key Insight

> Everything competes for the same main thread. The problem is scheduling, not execution speed.

---

# 11. Node.js Runtime Model

JavaScript is single-threaded.

Node.js is not.

Node uses:

* libuv
* OS async APIs
* thread pool
* worker threads

Key insight:

> JavaScript executes single-threaded, but Node orchestrates concurrency underneath.

---

# 12. Web Workers

Workers introduce real parallelism:

* isolated V8 instances
* message-based communication
* no DOM access
* background CPU execution

---

# 13. Iterators, Generators & Async Streams

A progression of data handling models:

* Iterators → synchronous sequences
* Generators → pause/resume state machines
* Async Iterators → streamed async data
* Async Generators → backpressure-aware pipelines

---

# 14. Functional Programming

FP is not theory—it is **predictability engineering**.

Core principles:

* pure functions
* immutability
* composability

Mental shift:

> imperative loops → declarative pipelines

---

# 15. Function Composition

Instead of nested logic:

```js
square(add(10(x)))
```

We use pipelines:

```js
pipe(x → transform → transform → output)
```

---

# 16. Monads & Effect Systems

Monads are:

> controlled wrappers for computation + side effects

They enable:

* safe composition
* error propagation
* null safety (`Maybe`)
* branching logic (`Either`)

---

# Architectural Themes Across the Repo

| Theme              | Appears In                   |
| ------------------ | ---------------------------- |
| Scope isolation    | Closures, TDZ, IIFEs         |
| Deferred execution | Event loop, async, rendering |
| State preservation | Closures, generators         |
| Delegation         | Prototypes, DOM events       |
| Scheduling         | Microtasks, macrotasks       |
| Composition        | FP pipelines                 |
| Isolation          | Workers, private fields      |
| Streaming          | Async iterators              |

---

# Final Mental Model

After all layers collapse:

> JavaScript is not a scripting language.

It is a **runtime orchestration system** built on:

* lexical environments
* event scheduling
* delegation chains
* asynchronous pipelines
* frame-based rendering coordination

---

# Final Insight

The syntax is simple.

The system is not.

This repository exists to model the system—not memorize the syntax.
