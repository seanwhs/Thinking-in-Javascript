// ============================================================================
// THE EITHER MONAD
// An architectural replacement for try/catch blocks that carries error context.
// ============================================================================

class Either {
  constructor(value) {
    this._value = value;
  }
}

// The Success Path
class Right extends Either {
  static of(value) { return new Right(value); }
  
  // 'Right' represents success, so we DO run the transformation functions.
  map(fn) { return Right.of(fn(this._value)); }
  
  // Fold is used to extract the value. It executes the second function on success.
  fold(leftFn, rightFn) { return rightFn(this._value); }
}

// The Failure Path
class Left extends Either {
  static of(value) { return new Left(value); }
  
  // 'Left' represents a failure. We IGNORE all subsequent mappings.
  // This behaves like short-circuiting out of a try/catch block.
  map(fn) { return this; }
  
  // Fold extracts the error. It executes the first function on failure.
  fold(leftFn, rightFn) { return leftFn(this._value); }
}

// --- EXAMPLE USAGE ---

// A function to parse JSON string data safely
const parseJSON = (str) => {
  try {
    return Right.of(JSON.parse(str)); // Wrap successful parse in Right
  } catch (error) {
    return Left.of("Invalid JSON string syntax"); // Wrap failure in Left
  }
};

// A function to validate that a user object has an email address
const validateEmail = (user) => {
  return user.email 
    ? Right.of(user) 
    : Left.of("User profile is missing a valid email address");
};

// --- THE PIPELINE ---

const handleUserResponse = (rawJsonString) => {
  return parseJSON(rawJsonString)
    .fold(
      (error) => `Parsing Error: ${error}`, // Left path handler
      (user) => validateEmail(user).fold(    // Right path handler -> triggers next check
        (validationError) => `Validation Error: ${validationError}`,
        (validUser) => `Success! Welcome ${validUser.email}`
      )
    );
};

// Test 1: Catastrophic JSON failure
console.log(handleUserResponse("{ bad json }")); 
// Output: "Parsing Error: Invalid JSON string syntax"

// Test 2: Logical validation failure
console.log(handleUserResponse('{"username": "clara_dev"}')); 
// Output: "Validation Error: User profile is missing a valid email address"

// Test 3: Complete pipeline success
console.log(handleUserResponse('{"username": "clara_dev", "email": "clara@dev.com"}')); 
// Output: "Success! Welcome clara@dev.com"