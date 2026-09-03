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

/* Alias topics exist in questionSeeds and may be looked up by name, but
   have no .md file of their own. Point each at the notes that cover it. */
const ALIASES = {
  'Variables and Data Types': 'Variables',
  'For Loops': 'Loops',
  'While Loops': 'Loops',
  'Nested Loops': 'Loops',
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

  const files = fs
    .readdirSync(NOTES_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

  if (files.length !== topics.length) {
    throw new Error(
      `notes/ has ${files.length} .md files but there are ${topics.length} topics. ` +
      'They must match one-to-one (notes/NN_name.md <-> topics[NN]).'
    );
  }

  const byTopic = {};
  topics.forEach((topic, i) => {
    const file = files[i];
    const expectedPrefix = String(i).padStart(2, '0');
    if (!file.startsWith(expectedPrefix + '_')) {
      throw new Error(
        `notes/${file} does not match topics[${i}] ("${topic.name}"). ` +
        `Expected the file to be named ${expectedPrefix}_*.md.`
      );
    }
    byTopic[topic.name] = fs.readFileSync(path.join(NOTES_DIR, file), 'utf8').trim();
  });

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
