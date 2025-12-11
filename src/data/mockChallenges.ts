/**
 * Mock Challenge Data
 * Based on PRD Section 6.1 and WORK_PLAN Phase 1.2
 *
 * MVP Goal: 9 challenges (3 languages × 3 difficulties)
 * Initial: 3 sample challenges (JavaScript, TypeScript, Python)
 */

import type { Challenge } from '../types';

/**
 * JavaScript Challenge: React Hook Rules Violation
 * Difficulty: JUNIOR
 * Bug: useState called conditionally
 */
export const jsHookRulesChallenge: Challenge = {
  id: 'js-hooks-001',
  title: 'React Hook Rules',
  description: 'A simple user profile component with state management',
  language: 'javascript',
  codeRaw: `function UserProfile({ isAdmin }) {
  if (isAdmin) {
    const [adminData, setAdminData] = useState(null);
  }

  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetchUserData().then(data => setUserData(data));
  }, []);

  return (
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
    </div>
  );
}`,
  sections: [
    {
      id: 'hook-conditional',
      startLine: 2,
      endLine: 4,
      isBug: true, // Hook called conditionally - violates Rules of Hooks
    },
    {
      id: 'hook-valid-state',
      startLine: 6,
      endLine: 9,
      isBug: false, // Valid useState call
    },
    {
      id: 'hook-valid-effect',
      startLine: 11,
      endLine: 13,
      isBug: false, // Valid useEffect call
    },
  ],
  explanation: `## Why This is Wrong

**React Hook Rules**: Hooks must be called at the top level of a component, not inside conditionals, loops, or nested functions.

### The Bug (Lines 2-4)
\`\`\`javascript
if (isAdmin) {
  const [adminData, setAdminData] = useState(null); // ❌ WRONG
}
\`\`\`

This violates the **Rules of Hooks** because:
1. The hook call is inside an \`if\` statement
2. React relies on hook call order to maintain state
3. Conditional hooks break this order, causing bugs

### Correct Solution
\`\`\`javascript
// ✅ Declare hook at top level
const [adminData, setAdminData] = useState(null);

// Use the value conditionally instead
if (isAdmin && adminData) {
  // Use adminData
}
\`\`\`

**Key Principle**: Always call hooks unconditionally at the top level.`,
  timeLimit: 120, // 2 minutes
  difficulty: 'JUNIOR',
};

/**
 * TypeScript Challenge: Type Safety Violation
 * Difficulty: JUNIOR
 * Bug: Using 'any' type defeating TypeScript's purpose
 */
export const tsTypeSafetyChallenge: Challenge = {
  id: 'ts-type-001',
  title: 'Type Safety Matters',
  description: 'A utility function for processing user data',
  language: 'typescript',
  codeRaw: `interface User {
  id: number;
  name: string;
  email: string;
}

function processUserData(data: any): User {
  return {
    id: data.id,
    name: data.name,
    email: data.email
  };
}

const result = processUserData({ id: "123", name: "John" });
console.log(result.id.toFixed(2));`,
  sections: [
    {
      id: 'any-type-param',
      startLine: 7,
      endLine: 7,
      isBug: true, // Using 'any' type defeats TypeScript's purpose
    },
    {
      id: 'unsafe-usage',
      startLine: 15,
      endLine: 16,
      isBug: true, // Runtime error: toFixed() on string
    },
    {
      id: 'interface-def',
      startLine: 1,
      endLine: 5,
      isBug: false, // Valid interface definition
    },
  ],
  explanation: `## Why This is Wrong

**Type Safety**: TypeScript's main purpose is to catch type errors at compile time.

### Bug #1 (Line 7)
\`\`\`typescript
function processUserData(data: any): User { // ❌ Using 'any'
\`\`\`

Problems:
1. \`any\` disables all type checking
2. No compile-time validation of input data
3. Defeats the purpose of using TypeScript

### Bug #2 (Lines 15-16)
\`\`\`typescript
const result = processUserData({ id: "123", name: "John" });
console.log(result.id.toFixed(2)); // ❌ Runtime error!
\`\`\`

Because \`data\` is \`any\`:
- TypeScript doesn't catch that \`id\` is a string, not a number
- \`toFixed()\` will fail at runtime
- Missing \`email\` property is also not caught

### Correct Solution
\`\`\`typescript
function processUserData(data: unknown): User {
  // Validate and narrow the type
  if (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  ) {
    return {
      id: Number(data.id),
      name: String(data.name),
      email: String(data.email)
    };
  }
  throw new Error('Invalid user data');
}
\`\`\`

**Key Principle**: Use \`unknown\` instead of \`any\`, then validate and narrow types.`,
  timeLimit: 180, // 3 minutes
  difficulty: 'JUNIOR',
};

/**
 * Python Challenge: Mutable Default Argument
 * Difficulty: JUNIOR
 * Bug: Using mutable default argument (list)
 */
export const pythonMutableDefaultChallenge: Challenge = {
  id: 'py-mutable-001',
  title: 'Mutable Default Arguments',
  description: 'A function to add items to a shopping list',
  language: 'python',
  codeRaw: `def add_to_cart(item, cart=[]):
    cart.append(item)
    return cart

# First purchase
order1 = add_to_cart("Apple")
print(order1)  # ['Apple']

# Second purchase (new customer)
order2 = add_to_cart("Banana")
print(order2)  # ['Apple', 'Banana'] - Bug!`,
  sections: [
    {
      id: 'mutable-default',
      startLine: 1,
      endLine: 1,
      isBug: true, // Mutable default argument
    },
    {
      id: 'append-operation',
      startLine: 2,
      endLine: 3,
      isBug: false, // The logic itself is fine
    },
    {
      id: 'first-call',
      startLine: 6,
      endLine: 7,
      isBug: false, // First call works as expected
    },
    {
      id: 'second-call',
      startLine: 10,
      endLine: 11,
      isBug: false, // This exposes the bug but isn't the bug itself
    },
  ],
  explanation: `## Why This is Wrong

**Mutable Default Arguments**: Default arguments are evaluated once when the function is defined, not each time it's called.

### The Bug (Line 1)
\`\`\`python
def add_to_cart(item, cart=[]):  # ❌ Mutable default
\`\`\`

What happens:
1. \`cart=[]\` is created **once** when function is defined
2. **Same list object** is reused across all function calls
3. Each \`append()\` mutates the same shared list

### The Result
\`\`\`python
order1 = add_to_cart("Apple")
# cart = ['Apple']

order2 = add_to_cart("Banana")
# cart = ['Apple', 'Banana']  # ❌ Shares state!
\`\`\`

Second customer gets first customer's items!

### Correct Solution
\`\`\`python
def add_to_cart(item, cart=None):  # ✅ Use None
    if cart is None:
        cart = []  # Create new list each time
    cart.append(item)
    return cart
\`\`\`

**Key Principle**: Never use mutable objects (\`[]\`, \`{}\`) as default arguments. Use \`None\` and create new objects inside the function.`,
  timeLimit: 120, // 2 minutes
  difficulty: 'JUNIOR',
};

/**
 * All available challenges
 */
export const mockChallenges: Challenge[] = [
  jsHookRulesChallenge,
  tsTypeSafetyChallenge,
  pythonMutableDefaultChallenge,
];

/**
 * Get a random challenge
 */
export function getRandomChallenge(): Challenge {
  const randomIndex = Math.floor(Math.random() * mockChallenges.length);
  return mockChallenges[randomIndex];
}

/**
 * Get challenges by difficulty
 */
export function getChallengesByDifficulty(difficulty: Challenge['difficulty']): Challenge[] {
  return mockChallenges.filter(c => c.difficulty === difficulty);
}

/**
 * Get challenges by language
 */
export function getChallengesByLanguage(language: Challenge['language']): Challenge[] {
  return mockChallenges.filter(c => c.language === language);
}
