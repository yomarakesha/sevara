// ═══════════════════════════════════════════════
//  SILLBRIDGE — GAMES
// ═══════════════════════════════════════════════

const Games = (() => {

  // ── WORD MATCH ────────────────────────────────
  function startWordMatch() {
    const area = document.getElementById('game-area');
    if (!area) return;
    const pairs = shuffle([...SB.wordMatchPairs]).slice(0, 6);
    let selected = null;
    let matched = 0;
    let score = 0;
    let timeLeft = 60;
    let timer;

    const terms = shuffle(pairs.map(p => ({ text: p.term, type: 'term', pair: p.term })));
    const defs  = shuffle(pairs.map(p => ({ text: p.def,  type: 'def',  pair: p.term })));

    area.innerHTML = `
      <div class="game-active word-match">
        <div class="game-hud">
          <span>⏱️ <span id="wm-timer">${timeLeft}</span>s</span>
          <span>Score: <span id="wm-score">0</span></span>
          <span>Matched: <span id="wm-matched">0</span>/${pairs.length}</span>
        </div>
        <div class="wm-grid">
          <div class="wm-col">
            <h4>Terms</h4>
            <div id="wm-terms">
              ${terms.map((t,i) => `<button class="wm-item" data-idx="${i}" data-type="term" data-pair="${t.pair}">${escHtml(t.text)}</button>`).join('')}
            </div>
          </div>
          <div class="wm-col">
            <h4>Definitions</h4>
            <div id="wm-defs">
              ${defs.map((d,i) => `<button class="wm-item" data-idx="${i}" data-type="def" data-pair="${d.pair}">${escHtml(d.text)}</button>`).join('')}
            </div>
          </div>
        </div>
      </div>`;

    timer = setInterval(() => {
      timeLeft--;
      const el = document.getElementById('wm-timer');
      if (el) el.textContent = timeLeft;
      if (timeLeft <= 0) { clearInterval(timer); endGame('wordmatch', score); }
    }, 1000);

    area.querySelectorAll('.wm-item').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        if (!selected) {
          selected = btn;
          btn.classList.add('selected');
        } else if (selected === btn) {
          selected.classList.remove('selected');
          selected = null;
        } else {
          const a = selected, b = btn;
          if (a.dataset.pair === b.dataset.pair && a.dataset.type !== b.dataset.type) {
            a.classList.add('matched'); b.classList.add('matched');
            a.disabled = true; b.disabled = true;
            matched++;
            score += 10 + timeLeft;
            document.getElementById('wm-score').textContent = score;
            document.getElementById('wm-matched').textContent = matched;
            if (matched === pairs.length) { clearInterval(timer); setTimeout(() => endGame('wordmatch', score), 500); }
          } else {
            a.classList.add('wrong'); b.classList.add('wrong');
            setTimeout(() => { a.classList.remove('wrong','selected'); b.classList.remove('wrong'); }, 700);
          }
          selected = null;
        }
      });
    });
  }

  // ── CODE BREAKER ─────────────────────────────
  function startCodeBreaker() {
    const area = document.getElementById('game-area');
    if (!area) return;
    const challenges = shuffle([...SB.codeBreakerChallenges]);
    let idx = 0;
    let score = 0;
    let lives = 3;

    function render() {
      if (idx >= challenges.length) { endGame('codebreaker', score); return; }
      const ch = challenges[idx];
      area.innerHTML = `
        <div class="game-active code-breaker">
          <div class="game-hud">
            <span>❤️ ${'♥'.repeat(lives)}${'♡'.repeat(3-lives)}</span>
            <span>Score: ${score}</span>
            <span>${idx+1}/${challenges.length}</span>
          </div>
          <h3>Fill in the blank:</h3>
          <div class="cb-code">${escHtml(ch.code)}</div>
          <input id="cb-input" class="form-input cb-input" placeholder="Your answer..." autocomplete="off">
          <div id="cb-hint" class="cb-hint" style="display:none">💡 ${escHtml(ch.hint)}</div>
          <div class="cb-btns">
            <button class="btn btn-primary" id="cb-submit">Submit</button>
            <button class="btn btn-ghost" id="cb-hint-btn">Hint (-2pts)</button>
          </div>
          <div id="cb-feedback" class="cb-feedback"></div>
        </div>`;

      let hintUsed = false;
      document.getElementById('cb-hint-btn').addEventListener('click', () => {
        if (!hintUsed) { hintUsed = true; document.getElementById('cb-hint').style.display = 'block'; score = Math.max(0, score - 2); }
      });

      const submit = () => {
        const val = document.getElementById('cb-input').value.trim();
        const fb = document.getElementById('cb-feedback');
        if (val.toLowerCase() === ch.answer.toLowerCase()) {
          fb.innerHTML = '<span class="correct-fb">✅ Correct! +10 XP</span>';
          score += 10;
          idx++;
          setTimeout(render, 1000);
        } else {
          lives--;
          fb.innerHTML = `<span class="wrong-fb">❌ Wrong! Answer: <code>${escHtml(ch.answer)}</code></span>`;
          if (lives <= 0) setTimeout(() => endGame('codebreaker', score), 1200);
        }
      };

      document.getElementById('cb-submit').addEventListener('click', submit);
      document.getElementById('cb-input').addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
      document.getElementById('cb-input').focus();
    }
    render();
  }

  // ── TERM HUNT ─────────────────────────────────
  function startTermHunt() {
    const area = document.getElementById('game-area');
    if (!area) return;
    const terms = shuffle([...SB.techTerms]).slice(0, 10);
    let idx = 0;
    let score = 0;
    let streak = 0;

    function render() {
      if (idx >= terms.length) { endGame('termhunt', score); return; }
      const correct = terms[idx];
      const wrongs = shuffle(SB.techTerms.filter(t => t.term !== correct.term)).slice(0, 3);
      const options = shuffle([correct, ...wrongs]);

      area.innerHTML = `
        <div class="game-active term-hunt">
          <div class="game-hud">
            <span>🔥 Streak: ${streak}</span>
            <span>Score: ${score}</span>
            <span>${idx+1}/${terms.length}</span>
          </div>
          <div class="th-term">
            <div class="th-category">${correct.category}</div>
            <h2>${escHtml(correct.term)}</h2>
            <p>What does this mean?</p>
          </div>
          <div class="th-options">
            ${options.map((opt, i) => `
              <button class="th-opt" data-correct="${opt.term === correct.term}">
                ${escHtml(opt.def)}
              </button>`).join('')}
          </div>
        </div>`;

      area.querySelectorAll('.th-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          area.querySelectorAll('.th-opt').forEach(b => b.disabled = true);
          if (btn.dataset.correct === 'true') {
            btn.classList.add('correct-opt');
            streak++;
            score += 10 + streak * 2;
          } else {
            btn.classList.add('wrong-opt');
            streak = 0;
            area.querySelectorAll('.th-opt[data-correct="true"]').forEach(b => b.classList.add('correct-opt'));
          }
          idx++;
          setTimeout(render, 1200);
        });
      });
    }
    render();
  }

  // ── END GAME ──────────────────────────────────
  function endGame(gameId, score) {
    const area = document.getElementById('game-area');
    if (!area) return;
    const user = Store.getCurrentUser();
    let xpEarned = Math.floor(score / 2);
    if (user) Store.completeLesson('game_' + gameId + '_' + Date.now(), xpEarned);

    area.innerHTML = `
      <div class="game-over">
        <div class="go-icon">🎮</div>
        <h2>Game Over!</h2>
        <div class="go-score">${score} points</div>
        ${xpEarned > 0 ? `<div class="go-xp">+${xpEarned} XP earned!</div>` : ''}
        <div class="go-btns">
          <button class="btn btn-primary" onclick="App.navigate('games')">Play Again</button>
          <button class="btn btn-ghost" onclick="App.navigate('dashboard')">Back to Dashboard</button>
        </div>
      </div>`;
  }

  // ── UTILS ──────────────────────────────────────
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function escHtml(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  return { startWordMatch, startCodeBreaker, startTermHunt };
})();
