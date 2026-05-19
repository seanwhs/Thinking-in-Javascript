// ============================================================================
// THE CONCEPT: IMMUTABILITY
// In FP, data is treated as read-only. Instead of changing (mutating) an existing
// object or array, we generate a brand-new copy containing our updates.
// ============================================================================

const currentSession = {
  username: "sara_dev",
  isLoggedIn: true,
  preferences: { theme: "dark" }
};

// --- THE MUTATING WAY (Dangerous) ---
function logOutUser(session) {
  // ❌ PITFALL: This alters the original object directly in memory.
  // Any other part of your app tracking 'currentSession' just had its data changed 
  // without warning. This is how "ghost bugs" happen in large applications.
  session.isLoggedIn = false; 
  return session;
}


// --- THE IMMUTABLE WAY (Safe) ---
function logOutUserPure(session) {
  //  BENEFIT: We use the JavaScript spread operator (...) to shallow-copy the 
  // properties into a completely new object, overwriting only what we need to.
  return {
    ...session,         // Copy all existing properties
    isLoggedIn: false   // Overwrite this specific field
  };
  // The original 'currentSession' object remains untouched and intact elsewhere.
}