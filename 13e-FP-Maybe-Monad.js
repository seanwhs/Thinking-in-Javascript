// ============================================================================
// THE MAYBE MONAD
// A safety wrapper that prevents "Cannot read property of undefined" crashes.
// ============================================================================

class Maybe {
  constructor(value) {
    this._value = value;
  }

  // A helper method to easily create a new Maybe container
  static of(value) {
    return new Maybe(value);
  }

  // Is this container holding a null or undefined value?
  isNothing() {
    return this._value === null || this._value === undefined;
  }

  // The 'map' method safely applies a transformation function to the value inside.
  // CRITICAL RULE: If the container is 'Nothing', it skips the function entirely!
  map(fn) {
    if (this.isNothing()) {
      return Maybe.of(null); // Keep passing the "Nothing" down the line safely
    }
    return Maybe.of(fn(this._value)); // Transform the value and wrap it back up
  }

  // A way to safely extract the value at the very end of your pipeline, providing a fallback.
  getOrElse(fallbackValue) {
    return this.isNothing() ? fallbackValue : this._value;
  }
}

// --- EXAMPLE USAGE ---

const userDatabase = {
  1: { id: 1, name: "Alice", preferences: { theme: "dark" } },
  2: { id: 2, name: "Bob" } // Uh oh, Bob doesn't have a 'preferences' object!
};

// A function that extracts a user's theme safely
const getUserTheme = (userId) => {
  return Maybe.of(userDatabase[userId])                 // Wrap the user object (might be undefined)
    .map(user => user.preferences)                      // Safe! Skips if user is missing
    .map(prefs => prefs.theme)                          // Safe! Skips if preferences are missing
    .map(theme => theme.toUpperCase())                  // Safe! Skips if theme is missing
    .getOrElse("LIGHT (DEFAULT)");                      // If anything failed along the way, use this fallback
};

console.log(getUserTheme(1)); // Output: "DARK"  (Smooth pipeline success)
console.log(getUserTheme(2)); // Output: "LIGHT (DEFAULT)" (Safely bypassed the missing data bugs!)
console.log(getUserTheme(9)); // Output: "LIGHT (DEFAULT)" (User 9 doesn't even exist, but no crash!)