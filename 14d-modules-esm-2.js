import { add } from "./14c-modules-esm-1.js";

try {
  const firstValue = 2;
  const secondValue = 3;
  
  const sum = add(firstValue, secondValue);
  
  console.log(`The sum of ${firstValue} and ${secondValue} is: ${sum}`);
} catch (error) {
  console.error(`Failed to calculate sum: ${error.message}`);
}
