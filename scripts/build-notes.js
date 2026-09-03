#!/usr/bin/env node
/* ==========================================================================
   Build js/topic-notes-data.js from notes/*.md

   The Learn page reads js/topic-notes-data.js, NOT the .md files directly.
   The .md files under notes/ are the source of truth; this script compiles
   them into the single JS object the browser loads.

       npm run build:notes

   Run this after editing anything under notes/. tests/notes-build.test.js
   fails if the compiled output is ever out of date.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const NOTES_DIR = path.join(ROOT, 'notes');
const OUT_FILE = path.join(ROOT, 'js', 'topic-notes-data.js');

const NOTES_MAP = {
  'Python Basics': '00_python_basics.md',
  'Variables': '01_variables.md',
  'Data Types': '02_data_types.md',
  'Input and Output': '03_input_and_output.md',
  'Operators': '04_operators.md',
  'Conditional Statements': '05_conditional_statements.md',
  'For Loops': '06_loops.md',
  'While Loops': '06_loops.md',
  'Nested Loops': '06_loops.md',
  'Loops': '06_loops.md',
  'Strings': '07_strings.md',
  'String Methods': '07_strings.md',
  'Functions': '08_functions.md',
  'Lists': '09_lists.md',
  'Tuples': '10_tuples.md',
  'Sets': '11_sets.md',
  'Dictionaries': '12_dictionaries.md',
  'Comprehension': '13_comprehensions.md',
  'Exception Handling': '14_exception_handling.md',
  'File Handling': '15_file_handling.md',
  'Modules and Packages': '16_modules_and_packages.md',
  'Object-Oriented Programming': '17_object_oriented_programming.md'
};

/* Alias topics exist in questionSeeds and may be looked up by name, but
   have no .md file of their own. Point each at the notes that cover it. */
const ALIASES = {
  'Variables and Data Types': 'Variables',
  'Loops': 'For Loops',
  'String Methods': 'Strings',
  'List Comprehension': 'Comprehension',
  'Comprehensions': 'Comprehension'
};

function loadTopics() {
  const vm = require('vm');
  const src = fs.readFileSync(path.join(ROOT, 'js', 'topics-data.js'), 'utf8');
  const sandbox = { module: { exports: {} }, console };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.module.exports.topics;
}

function build() {
  const topics = loadTopics();

  const byTopic = {};
  topics.forEach((topic) => {
    const file = NOTES_MAP[topic.name];
    if (file && fs.existsSync(path.join(NOTES_DIR, file))) {
      byTopic[topic.name] = fs.readFileSync(path.join(NOTES_DIR, file), 'utf8').trim();
    }
  });

  if (!byTopic['Loops'] && fs.existsSync(path.join(NOTES_DIR, '06_loops.md'))) {
    byTopic['Loops'] = fs.readFileSync(path.join(NOTES_DIR, '06_loops.md'), 'utf8').trim();
  }

  // Aliases are emitted as a lookup table, not duplicated markdown — copying
  // seven sets of notes into the bundle roughly doubled its size for no gain.
  for (const [alias, target] of Object.entries(ALIASES)) {
    if (!byTopic[target]) {
      throw new Error(`Alias "${alias}" points at unknown topic "${target}".`);
    }
  }

  const body = Object.keys(byTopic)
    .map(name => `  ${JSON.stringify(name)}: {\n    "markdown": ${JSON.stringify(byTopic[name])}\n  }`)
    .join(',\n');

  const aliasBody = Object.entries(ALIASES)
    .map(([alias, target]) => `  ${JSON.stringify(alias)}: ${JSON.stringify(target)}`)
    .join(',\n');

  return `// PyPractice - Compiled Topic Notes from /notes/*.md
// GENERATED FILE — do not edit by hand.
// Edit the markdown in notes/ instead, then run:  npm run build:notes
const topicNotes = {
${body}
};

// Alias topics have no notes file of their own. learn.js resolves them to
// the topic that covers the same material rather than shipping a copy.
const TOPIC_NOTES_ALIASES = {
${aliasBody}
};
`;
}

if (require.main === module) {
  const output = build();
  const changed = !fs.existsSync(OUT_FILE) || fs.readFileSync(OUT_FILE, 'utf8') !== output;
  fs.writeFileSync(OUT_FILE, output, 'utf8');

  const keys = (output.match(/^  "/gm) || []).length;
  const kb = (Buffer.byteLength(output, 'utf8') / 1024).toFixed(1);
  console.log(
    changed
      ? `✓ Wrote js/topic-notes-data.js (${keys} entries, ${kb} KB)`
      : `· js/topic-notes-data.js already up to date (${keys} entries, ${kb} KB)`
  );
}

module.exports = { build };
