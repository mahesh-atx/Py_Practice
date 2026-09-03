const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const { build } = require(path.join(ROOT, 'scripts', 'build-notes.js'));

function readCompiled() {
  return fs.readFileSync(path.join(ROOT, 'js', 'topic-notes-data.js'), 'utf8');
}

function parseCompiled(source) {
  // Only the first object (topicNotes) — the file also declares the
  // TOPIC_NOTES_ALIASES map, so slicing to the last brace grabs too much.
  const start = source.indexOf('{');
  const end = source.indexOf('\n};', start);
  return JSON.parse(source.slice(start, end + 2));
}

/* Load the real helpers out of js/learn.js so these checks test what the
   browser actually runs, rather than a copy that can silently drift. */
const LEARN_SRC = fs.readFileSync(path.join(ROOT, 'js', 'learn.js'), 'utf8');

const stripFencedCodeBlocks = (() => {
  const m = LEARN_SRC.match(/function stripFencedCodeBlocks[\s\S]*?\n\}/);
  assert.ok(m, 'stripFencedCodeBlocks() not found in js/learn.js');
  return new Function(m[0] + '\nreturn stripFencedCodeBlocks;')();
})();

const headingRegex = (() => {
  const m = LEARN_SRC.match(/const headingRegex = (\/.*\/gm);/);
  assert.ok(m, 'headingRegex not found in js/learn.js');
  return new Function('return ' + m[1] + ';')();
})();

describe('notes build — js/topic-notes-data.js is in sync with notes/*.md', () => {
  it('committed output matches a fresh build (run: npm run build:notes)', () => {
    assert.equal(
      readCompiled(),
      build(),
      'js/topic-notes-data.js is stale. Run `npm run build:notes` and commit the result.'
    );
  });

  it('compiles without throwing', () => {
    assert.doesNotThrow(() => build());
  });

  it('every topic in topics-data.js has notes', () => {
    const vm = require('vm');
    const sandbox = { module: { exports: {} }, console };
    vm.createContext(sandbox);
    vm.runInContext(
      fs.readFileSync(path.join(ROOT, 'js', 'topics-data.js'), 'utf8'),
      sandbox
    );
    const topics = sandbox.module.exports.topics;
    const notes = parseCompiled(readCompiled());

    for (const t of topics) {
      assert.ok(notes[t.name], `No notes for topic "${t.name}"`);
      assert.ok(notes[t.name].markdown.length > 500, `"${t.name}" notes look empty`);
    }
  });
});

describe('notes content — structure the Learn page depends on', () => {
  const notesDir = path.join(ROOT, 'notes');
  const files = fs.readdirSync(notesDir).filter(f => f.endsWith('.md')).sort();

  it('has one .md file per topic', () => {
    assert.equal(files.length, 18, `Expected 18 note files, found ${files.length}`);
  });

  it('files are numbered 00..17 so the build can map them to topics', () => {
    files.forEach((f, i) => {
      assert.ok(
        f.startsWith(String(i).padStart(2, '0') + '_'),
        `notes/${f} should be named ${String(i).padStart(2, '0')}_*.md`
      );
    });
  });

  // renderMarkdownNotes() builds the section anchors from headings matching
  // learn.js's headingRegex, so real sections must be numbered 1..N in order.
  // Code fences are stripped first — a Python comment like `# 1. Read` is not
  // a heading, and would otherwise collide with a real section's anchor id.
  it('every file has sequentially numbered sections for the anchors', () => {
    for (const f of files) {
      const md = stripFencedCodeBlocks(fs.readFileSync(path.join(notesDir, f), 'utf8'));
      const matches = [...md.matchAll(headingRegex)].map(m => m[1].trim());
      assert.ok(matches.length >= 4, `notes/${f} has only ${matches.length} numbered sections`);
      matches.forEach((title, i) => {
        assert.ok(
          title.startsWith(String(i + 1) + '.'),
          `notes/${f} section "${title}" should be numbered ${i + 1}`
        );
      });
    }
  });

  it('section anchor ids are unique within each file (no slug collisions)', () => {
    for (const f of files) {
      const md = stripFencedCodeBlocks(fs.readFileSync(path.join(notesDir, f), 'utf8'));
      const ids = [...md.matchAll(headingRegex)].map(m =>
        m[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      );
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
      assert.deepEqual(dupes, [], `notes/${f} has duplicate anchor ids: ${dupes.join(', ')}`);
    }
  });

  it('every file ends with a Quick Revision section', () => {
    for (const f of files) {
      const md = fs.readFileSync(path.join(notesDir, f), 'utf8');
      assert.match(md, /## Quick Revision/, `notes/${f} is missing a Quick Revision section`);
    }
  });

  // `TODO` inside a code sample is legitimate teaching content (e.g. the
  // `pass` placeholder), so only prose is checked.
  it('no file contains unresolved placeholder text outside code examples', () => {
    for (const f of files) {
      const prose = stripFencedCodeBlocks(fs.readFileSync(path.join(notesDir, f), 'utf8'));
      assert.doesNotMatch(prose, /\bTODO\b/, `notes/${f} contains a TODO in prose`);
    }
  });
});
