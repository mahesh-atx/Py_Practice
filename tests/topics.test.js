const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { topics, questionSeeds } = require('../js/topics-data.js');

describe('topics-data.js - topics array', () => {
  it('should have 21 topics', () => {
    assert.equal(topics.length, 21);
  });

  it('each topic should have name, desc, icon', () => {
    for (const t of topics) {
      assert.equal(typeof t.name, 'string', `topic missing name: ${JSON.stringify(t)}`);
      assert.ok(t.name.length > 0);
      assert.equal(typeof t.desc, 'string');
      assert.ok(t.desc.length > 10, `desc too short for ${t.name}`);
      assert.equal(typeof t.icon, 'string');
      assert.match(t.icon, /^\d{2}$/, `icon should be 2-digit for ${t.name}`);
    }
  });

  it('topic names should be unique', () => {
    const names = topics.map(t => t.name);
    const uniq = new Set(names);
    assert.equal(uniq.size, names.length);
  });

  it('should include expected core topics', () => {
    const names = topics.map(t => t.name);
    const mustHave = ['Python Basics', 'Variables', 'Data Types', 'Input and Output', 'Operators', 'Conditional Statements', 'For Loops', 'While Loops', 'Nested Loops', 'Strings', 'String Methods', 'Functions', 'Lists', 'Dictionaries', 'Comprehension', 'Exception Handling', 'File Handling', 'Object-Oriented Programming'];
    for (const n of mustHave) {
      assert.ok(names.includes(n), `missing topic ${n}`);
    }
  });
});

describe('topics-data.js - questionSeeds structure', () => {
  it('every topic should have seeds (or alias)', () => {
    for (const t of topics) {
      assert.ok(questionSeeds[t.name] !== undefined, `missing seeds for ${t.name}`);
    }
  });

  it('each topic should have basic/intermediate/advanced arrays', () => {
    for (const [topicName, levels] of Object.entries(questionSeeds)) {
      // Some aliases like Variables share same object - skip duplicate checks?
      assert.ok(levels.basic !== undefined || levels.intermediate !== undefined || levels.advanced !== undefined, `no levels for ${topicName}`);
      if (levels.basic) assert.ok(Array.isArray(levels.basic), `basic not array for ${topicName}`);
      if (levels.intermediate) assert.ok(Array.isArray(levels.intermediate), `intermediate not array for ${topicName}`);
      if (levels.advanced) assert.ok(Array.isArray(levels.advanced), `advanced not array for ${topicName}`);
    }
  });

  it('each question should be [title, desc, input, output, extraCases]', () => {
    let total = 0;
    for (const [topic, levels] of Object.entries(questionSeeds)) {
      for (const lvl of ['basic', 'intermediate', 'advanced']) {
        const qs = levels[lvl];
        if (!qs) continue;
        for (let i = 0; i < qs.length; i++) {
          const q = qs[i];
          total++;
          assert.ok(Array.isArray(q), `question not array ${topic} ${lvl} ${i}`);
          assert.equal(q.length, 5, `question should have 5 elements ${topic} ${lvl} ${i}: ${q[0]}`);
          const [title, desc, input, output, extras] = q;
          assert.equal(typeof title, 'string', `title not string ${topic} ${lvl} ${i}`);
          assert.ok(title.length > 0);
          assert.equal(typeof desc, 'string');
          assert.ok(desc.length > 5);
          assert.equal(typeof input, 'string', `input not string ${topic} ${lvl} ${i}`);
          assert.equal(typeof output, 'string', `output not string ${topic} ${lvl} ${i}`);
          assert.ok(Array.isArray(extras), `extras not array ${topic} ${lvl} ${i}`);
          for (let j = 0; j < extras.length; j++) {
            const ec = extras[j];
            assert.equal(typeof ec.input, 'string', `extra input not string ${topic} ${lvl} ${i} extra ${j}`);
            assert.equal(typeof ec.output, 'string', `extra output not string ${topic} ${lvl} ${i} extra ${j}`);
          }
        }
      }
    }
    // Ensure we have a reasonable total (original README says 162)
    assert.ok(total >= 100, `total questions ${total} seems too low`);
  });

  it('sample I/O should not be null/undefined', () => {
    for (const levels of Object.values(questionSeeds)) {
      for (const lvl of ['basic', 'intermediate', 'advanced']) {
        const qs = levels[lvl] || [];
        for (const q of qs) {
          const [ , , input, output ] = q;
          assert.equal(input !== null && input !== undefined, true);
          assert.equal(output !== null && output !== undefined, true);
          assert.equal(typeof output, 'string');
          // output should not be empty for most? But some Hello World has input '' and output 'Hello, World!'
          assert.ok(output.length > 0 || input.length === 0, 'both input and output empty is suspicious');
        }
      }
    }
  });

  it('extra cases should be valid', () => {
    for (const [topic, levels] of Object.entries(questionSeeds)) {
      for (const lvl of ['basic', 'intermediate', 'advanced']) {
        const qs = levels[lvl] || [];
        for (const q of qs) {
          const extras = q[4];
          for (const e of extras) {
            // Ensure no extra is missing output
            assert.ok(e.output !== undefined, `missing output in extra for ${topic} ${lvl}`);
          }
        }
      }
    }
  });

  it('should have aliases correctly wired', () => {
    assert.equal(questionSeeds['List Comprehension'], questionSeeds['Comprehension']);
    assert.equal(questionSeeds['Comprehensions'], questionSeeds['Comprehension']);
  });

  it('Variables and Data Types should have separate question buckets', () => {
    assert.notEqual(questionSeeds['Variables'], questionSeeds['Data Types']);
    assert.equal(questionSeeds['Variables'].basic.length, 6);
    assert.equal(questionSeeds['Data Types'].basic.length, 4);
    assert.equal(questionSeeds['Variables'].intermediate.length, 5);
    assert.equal(questionSeeds['Data Types'].intermediate.length, 5);
    assert.equal(questionSeeds['Variables'].advanced.length, 5);
    assert.equal(questionSeeds['Data Types'].advanced.length, 5);
  });

  it('For Loops, While Loops, and Nested Loops should have separate question buckets', () => {
    for (const name of ['For Loops', 'While Loops', 'Nested Loops']) {
      assert.equal(questionSeeds[name].basic.length, 10);
      assert.equal(questionSeeds[name].intermediate.length, 10);
      assert.equal(questionSeeds[name].advanced.length, 10);
    }
  });

  it('Strings and String Methods should have separate question buckets', () => {
    for (const name of ['Strings', 'String Methods']) {
      assert.equal(questionSeeds[name].basic.length, 10);
      assert.equal(questionSeeds[name].intermediate.length, 10);
      assert.equal(questionSeeds[name].advanced.length, 10);
    }
  });

  it('topics with their own content keep their own namespace', () => {
    const { TOPIC_SOURCE } = require('../js/topics-data.js');
    const canonical = n => TOPIC_SOURCE[n] || n;
    // Variables and Data Types now keep their own distinct namespaces.
    assert.equal(canonical('Variables'), 'Variables');
    assert.equal(canonical('Data Types'), 'Data Types');
    assert.notEqual(canonical('Variables'), canonical('Data Types'));
    assert.equal(canonical('For Loops'), 'For Loops');
    assert.equal(canonical('While Loops'), 'While Loops');
    assert.equal(canonical('Nested Loops'), 'Nested Loops');
    assert.equal(canonical('Strings'), 'Strings');
    assert.equal(canonical('String Methods'), 'String Methods');
    // Aliased topics resolve to their source topic
    assert.equal(canonical('List Comprehension'), 'Comprehension');
    assert.equal(canonical('Comprehensions'), 'Comprehension');
    assert.equal(canonical('Loops'), 'For Loops');
  });
});

describe('topics-data.js - integration helpers', () => {
  // Test the core.js questionsFor logic without needing DOM
  it('questionsFor should generate testCases correctly (mock)', () => {
    // Re-implement minimal questionsFor
    function questionsFor(topicName, level) {
      const seeds = questionSeeds[topicName] && questionSeeds[topicName][level] || [];
      return seeds.map((x, i) => {
        const primary = { label: 'Case 1 · sample', input: x[2], output: x[3] };
        const extras = (x[4] || []).map((c, ci) => ({ label: `Case ${ci+2} · test`, input: c.input, output: c.output }));
        return { id: `${topicName}__${level}__${i+1}`, testCases: [primary, ...extras] };
      });
    }
    const qs = questionsFor('Python Basics', 'basic');
    assert.equal(qs.length, 3);
    assert.equal(qs[0].testCases.length, 2); // sample + 1 extra
    assert.equal(qs[0].testCases[0].input, '');
    assert.equal(qs[0].testCases[0].output, 'Hello, World!');
    assert.equal(qs[0].id, 'Python Basics__basic__1');

    const vars = questionsFor('Variables and Data Types', 'intermediate');
    assert.ok(vars.length > 0);
    for (const q of vars) {
      assert.ok(q.testCases.length >= 1);
      for (const tc of q.testCases) {
        assert.equal(typeof tc.input, 'string');
        assert.equal(typeof tc.output, 'string');
      }
    }
  });
});
