# `README.md`

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
* why browser rendering freezes
* how workers create real parallelism
* how events travel through the DOM
* how encapsulation evolved from closures → Symbols → private class fields

This repo became my personal JavaScript laboratory.

It is intentionally verbose.

Every file is written like I’m teaching my future self after forgetting the concept six months later.

---

# Philosophy of This Repository

I no longer want to learn JavaScript as:

> “Here’s syntax. Memorize it.”

I want to learn it as:

> “Here’s how the engine allocates memory, schedules tasks, resolves scope chains, preserves closures, and moves work across threads.”

That shift changed everything for me.

This repo is essentially:

* part notebook
* part architecture documentation
* part runtime deep-dive
* part mental-model reconstruction
* part systems engineering journal

---

# What I Covered

---

# 1. Scope & Lexical Environments

I started with the foundation:

* Global Scope
* Function Scope
* Block Scope
* Lexical Scoping
* Scope Chains
* `var` leakage
* `let` / `const`
* TDZ (Temporal Dead Zone)

The goal was to stop thinking:

> “Variables exist somewhere.”

And start thinking:

> “Variables live inside specific lexical environments created during execution context initialization.”

Topics explored:

* why `var` ignores block scope
* why `let` creates isolated bindings
* why closures preserve outer environments
* how nested scopes resolve identifiers
* how JavaScript walks upward through the scope chain

---

# 2. Closures

Closures were the first moment JavaScript stopped feeling random.

I learned that closures are not magic.

They are simply:

> functions retaining references to outer lexical environments even after the outer function has completed execution.

I explored closures through:

* greeting factories
* stateful counters
* banking systems
* encapsulation patterns
* memoization
* async callbacks
* loop traps

One of the biggest mental unlocks for me:

```js
A closure does not copy variables.
It preserves references to environments.
```

That distinction explains almost every closure-related bug.

---

# 3. The Famous `var` Loop Trap

I spent a ridiculous amount of time deeply understanding this.

Especially this:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

Why does it print:

```txt
3
3
3
```

Instead of:

```txt
0
1
2
```

The answer forced me to understand:

* shared lexical environments
* asynchronous callbacks
* deferred execution
* closure references
* event loop scheduling
* block-scoped iteration environments

Then comparing it against:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

helped me finally internalize:

> `let` creates a brand-new binding for every iteration.

That was a major breakthrough.

---

# 4. Hoisting & the Temporal Dead Zone

I wanted to stop saying:

> “JavaScript moves variables to the top.”

because that explanation is misleading.

Instead I learned:

## During the Creation Phase:

JavaScript:

* allocates memory
* registers identifiers
* initializes function declarations
* marks `var` as `undefined`
* leaves `let`/`const` uninitialized

Which creates the:

# Temporal Dead Zone (TDZ)

This helped me finally understand why:

```js
console.log(x);
let x = 5;
```

throws:

```txt
ReferenceError
```

instead of `undefined`.

---

# 5. Execution Contexts & the Call Stack

This was where JavaScript began feeling like an actual runtime engine instead of a scripting language.

I explored:

* Global Execution Context (GEC)
* Function Execution Contexts (FEC)
* Memory Creation Phase
* Execution Phase
* Call Stack behavior
* Scope Chains
* `this`
* Context creation/destruction

I stopped viewing function calls as “jumping into functions.”

Instead I began thinking:

> “The engine allocates a new execution context frame and pushes it onto the call stack.”

That mental model made async JavaScript dramatically easier later.

---

# 6. Prototypes & the Prototype Chain

This section completely changed how I understand objects.

Before this repo, I thought:

> “Classes create objects.”

Now I think:

> “Objects delegate property lookups through prototype chains.”

I explored:

* `__proto__`
* `Object.getPrototypeOf`
* constructor functions
* shared prototype methods
* property shadowing
* inheritance via delegation

One huge realization:

```js
Classes are syntax sugar over prototypes.
```

Understanding that made JavaScript feel far less mysterious.

---

# 7. Object-Oriented Programming in JavaScript

After understanding prototypes, I explored modern OOP patterns:

* encapsulation
* abstraction
* inheritance
* polymorphism
* private fields
* method overriding
* shared behavior

I implemented:

* banking systems
* payment processors
* inheritance trees
* secure vault systems

I also explored multiple privacy models:

| Approach         | True Privacy? | Notes                   |
| ---------------- | ------------- | ----------------------- |
| Closures         | Yes           | Excellent encapsulation |
| Symbols          | Semi-private  | Reflectable             |
| `#privateFields` | Yes           | Runtime-enforced        |

That comparison was incredibly valuable.

---

# 8. Event Propagation

I wanted to understand how browser events actually travel.

So I built experiments around:

* bubbling
* capturing
* target phase
* `event.target`
* `event.currentTarget`
* propagation chains
* `stopPropagation()`

The mental model I use now:

```txt
Capture Phase:
window ↓ document ↓ parent ↓ target

Bubble Phase:
target ↑ parent ↑ document ↑ window
```

Once I understood this, event delegation suddenly made perfect sense.

---

# 9. Event Delegation

This became one of my favorite browser performance patterns.

Instead of attaching listeners everywhere:

```js
1000 items = 1000 listeners
```

I learned to leverage bubbling:

```js
1 parent listener handles everything
```

This section helped me understand:

* scalable UI architectures
* dynamic DOM systems
* delegation patterns
* target matching
* `.closest()`
* DOM traversal

It also explains why frameworks heavily rely on delegation internally.

---

# 10. Custom Events & Decoupled Systems

This section felt surprisingly architectural.

I explored:

* `CustomEvent`
* `dispatchEvent`
* `event.detail`
* bubbling custom events
* decoupled communication

This made browser systems feel more like distributed systems:

```txt
Producer → Event → Consumers
```

instead of tightly coupled direct function calls.

---

# 11. Async JavaScript

This was one of the largest sections in the repo.

I explored the full evolution:

| Era          | Pattern     |
| ------------ | ----------- |
| Legacy       | Callbacks   |
| Intermediate | Promises    |
| Modern       | Async/Await |

I specifically wanted to understand:

* why async code is non-blocking
* what `await` actually pauses
* why Promises are microtasks
* why callbacks became “callback hell”
* how `.then()` chains flatten async logic

One major realization:

```txt
await does NOT block the thread.
It pauses only the current async function.
```

That distinction matters enormously.

---

# 12. Memoization

Memoization was my introduction to:

* caching
* higher-order functions
* deterministic computation
* performance optimization

I implemented memoization from scratch to deeply understand:

* closures preserving cache state
* argument serialization
* cache lookup strategies
* computational reuse

This section connected beautifully with functional programming later.

---

# 13. Browser Multi-Threading & Web Workers

This section completely changed how I think about browser performance.

I used huge blocking loops to visualize:

* UI freezing
* main-thread starvation
* rendering interruption

Then I moved the workload into:

# Web Workers

and finally understood:

> JavaScript is single-threaded per execution context, but the browser itself is massively multi-threaded.

I explored:

* worker messaging
* structured cloning
* background execution
* thread isolation
* DOM restrictions inside workers

This was one of the most eye-opening parts of the repo.

---

# 14. Node.js Internals

This became one of my favorite sections.

I wanted to understand:

> “If JavaScript is single-threaded, how is Node handling thousands of requests simultaneously?”

That led me into:

* libuv
* the Event Loop
* microtasks
* macrotasks
* async I/O
* the thread pool
* worker threads
* OS delegation

I built experiments around:

* `setTimeout`
* Promise queues
* `fs.readFile`
* `crypto.pbkdf2`
* worker threads
* event loop scheduling

One massive realization:

```txt
Node.js is NOT single-threaded.
JavaScript execution is single-threaded.
```

Node itself uses:

* OS async APIs
* libuv
* thread pools
* worker threads
* background scheduling

to create concurrency.

That distinction fundamentally changed how I architect backend systems.

---

# 15. Node Worker Threads

I specifically explored:

```js
worker_threads
```

to understand real CPU parallelism in Node.

This helped me distinguish:

| Concept     | Meaning                  |
| ----------- | ------------------------ |
| Concurrency | Managing many tasks      |
| Parallelism | Executing simultaneously |

Worker Threads finally gave me:

* isolated V8 instances
* true background computation
* inter-thread messaging
* non-blocking CPU workloads

This connected deeply with distributed systems thinking.

---

# 16. IIFEs (Immediately Invoked Function Expressions)

I explored IIFEs to understand:

* expression contexts
* private scope isolation
* module patterns before ES Modules
* execution wrapping

This section helped explain the historical evolution of JavaScript architecture.

---

# 17. Increment Operators (`++`)

This sounds simple.

It absolutely is not.

I explored:

* prefix evaluation
* postfix evaluation
* inline assignment behavior
* loop semantics
* conditional evaluation timing

Especially:

```js
++i
```

vs

```js
i++
```

inside conditions and loops.

Tiny syntax differences can completely alter execution flow.

---

# 18. Functional Programming (FP)

This became one of the most transformative sections in the repo.

I used to think FP was:

> academic syntax gymnastics

Now I think:

> FP is about building predictable software pipelines with minimal hidden behavior.

The three pillars I focused on:

## Pure Functions

Functions should:

* depend only on inputs
* produce deterministic outputs
* avoid hidden external state

That makes code:

* predictable
* testable
* composable

---

## Immutability

Instead of mutating shared objects:

```js
user.loggedIn = false;
```

I learned to generate new state snapshots:

```js
return {
  ...user,
  loggedIn: false
};
```

This dramatically reduces:

* hidden side effects
* race-condition-style bugs
* accidental shared-state corruption

---

## Higher-Order Functions & Pipelines

This changed how I structure transformations entirely.

Instead of:

```js
for (...) {
  if (...) {
    ...
  }
}
```

I began thinking in:

```js
filter → map → reduce
```

pipelines.

That shift made my code:

* more declarative
* easier to reason about
* easier to compose
* easier to test

---

# 19. Function Composition

I explored building reusable pipelines using:

```js
pipe(...)
```

This helped me think about software as:

```txt
Input → Transform → Transform → Transform → Output
```

instead of deeply nested execution trees.

One major lesson:

```txt
Readable systems flow left-to-right.
```

not inside-out like:

```js
square(addTen(double(x)))
```

---

# 20. Monads, Maybe & Either

This section pushed me into advanced FP architecture.

I explored:

* `Maybe`
* `Either`
* null-safety
* composable error handling
* explicit data containers

The biggest realization:

> Monads are not magic.

They are controlled computational wrappers.

Instead of crashing pipelines:

```js
Cannot read property 'x' of undefined
```

I learned to safely propagate absence and failure through transformation chains.

---

# 21. `fp-ts` & `Sanctuary`

I explored production-grade FP ecosystems:

| Library     | Ecosystem                  |
| ----------- | -------------------------- |
| `fp-ts`     | TypeScript-heavy systems   |
| `Sanctuary` | Runtime-safe JavaScript FP |

This section forced me to think deeply about:

* type systems
* algebraic data types
* runtime validation
* compile-time guarantees
* functional architecture design

It also exposed me to the broader ecosystem around:

* Effect
* Option
* Either
* composable effect systems

---

# Architectural Themes Across the Entire Repo

The more I learned JavaScript deeply, the more recurring themes emerged:

| Theme                   | Everywhere                   |
| ----------------------- | ---------------------------- |
| Scope isolation         | Closures, TDZ, IIFEs         |
| Deferred execution      | Async, callbacks, Event Loop |
| State preservation      | Closures, memoization        |
| Delegation              | Prototypes, events           |
| Isolation boundaries    | Workers, private fields      |
| Data flow               | FP pipelines                 |
| Predictability          | Pure functions               |
| Controlled side effects | Monads                       |
| Concurrency             | Node/libuv/workers           |
| Composition             | FP & architecture            |

Eventually I realized:

> JavaScript is not random.

It is an environment built around:

* lexical environments
* event scheduling
* delegation
* composition
* asynchronous orchestration

---

# Why I Built This Repo

Because I wanted a reference for my future self.

Not:

```txt
“How do I use JavaScript?”
```

But:

```txt
“How does JavaScript THINK?”
```

This repo is my attempt to document that mental model while I’m learning it.

Future-me will forget details.

This repo is insurance against that.

---

# Final Thought

The deeper I went into JavaScript, the more I realized:

JavaScript is not “just a scripting language.”

It is:

* a runtime
* an event orchestration system
* a concurrency abstraction layer
* a prototype delegation engine
* a functional composition environment
* a browser systems language
* a distributed async platform

The syntax is the easy part.

The hard part is learning how the engine behaves under pressure.

That is what this repository is about.
