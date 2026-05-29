// ═══════════════════════════════════════════════
//  SILLBRIDGE — VIEWS
// ═══════════════════════════════════════════════

const Views = {};

function escHtml(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function greetByTime() {
  const h = new Date().getHours();
  if (h < 12) return 'goodMorning';
  if (h < 17) return 'goodAfternoon';
  return 'goodEvening';
}

// ── LANDING ──────────────────────────────────
Views.landing = ({ t }) => `
<div class="landing">
  <section class="hero">
    <div class="hero-content">
      <div class="hero-badge">🚀 ${t('beginnerToSenior')}</div>
      <h1 class="hero-title">
        <span class="gradient-text">SillBridge</span><br>
        ${t('tagline')}
      </h1>
      <p class="hero-sub">Master IT step-by-step — Frontend, Backend, ML, DevOps and more. With quizzes, projects, games, and interview prep. In English, Russian, or Turkmen.</p>
      <div class="hero-cta">
        <button class="btn btn-primary btn-lg" onclick="App.navigate('register')">Start Learning Free →</button>
        <button class="btn btn-ghost btn-lg" onclick="App.navigate('login')">${t('login')}</button>
      </div>
      <div class="hero-stats">
        <div class="stat"><span>8+</span><label>IT Branches</label></div>
        <div class="stat"><span>10</span><label>Levels Each</label></div>
        <div class="stat"><span>3</span><label>Languages</label></div>
        <div class="stat"><span>100+</span><label>Lessons</label></div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="code-window">
        <div class="window-dots"><span></span><span></span><span></span></div>
        <div class="window-code">
<pre><span class="c-keyword">const</span> <span class="c-var">dev</span> = {
  name: <span class="c-str">"You"</span>,
  level: <span class="c-num">0</span> → <span class="c-num">Senior</span>,
  skills: [
    <span class="c-str">"HTML"</span>, <span class="c-str">"CSS"</span>, <span class="c-str">"JS"</span>,
    <span class="c-str">"React"</span>, <span class="c-str">"Node"</span>, <span class="c-str">"SQL"</span>
  ],
  deployed: <span class="c-bool">true</span> ✅
};</pre>
        </div>
      </div>
    </div>
  </section>

  <section class="features-section">
    <h2 class="section-title">Everything You Need to Become a Developer</h2>
    <div class="features-grid">
      ${[
        { icon:'🎯', title:'Step-by-Step Learning', desc:'Every branch goes from absolute beginner to senior level in 10 structured levels' },
        { icon:'🎮', title:'Games & Quizzes', desc:'Word Match, Code Breaker, Term Hunt, and level quizzes make learning fun' },
        { icon:'💼', title:'Interview Prep', desc:'Real technical interview questions with model answers for international companies' },
        { icon:'📝', title:'README Helper', desc:'Generate professional README.md files for your GitHub projects instantly' },
        { icon:'🏗️', title:'Real Projects', desc:'Build actual projects at each level to solidify your skills' },
        { icon:'🌍', title:'3 Languages', desc:'Learn in English, Russian, or Turkmen — switch anytime' },
        { icon:'🏆', title:'XP & Badges', desc:'Track progress with XP, level up, earn badges, compete on leaderboard' },
        { icon:'🚀', title:'Deploy to Production', desc:'Learn to actually deploy your apps to the internet with real tools' },
      ].map(f => `<div class="feature-card"><div class="feature-icon">${f.icon}</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join('')}
    </div>
  </section>

  <section class="branches-preview">
    <h2 class="section-title">Choose Your IT Branch</h2>
    <div class="branches-grid">
      ${SB.branches.map(b => `
        <div class="branch-preview" style="--color:${b.color}">
          <span class="branch-icon">${b.icon}</span>
          <h3>${b.label}</h3>
          <p>${b.desc}</p>
        </div>`).join('')}
    </div>
  </section>

  <section class="cta-section">
    <h2>Ready to start your IT journey?</h2>
    <p>Join thousands of developers learning from zero to senior.</p>
    <button class="btn btn-primary btn-lg" onclick="App.navigate('register')">Create Free Account →</button>
  </section>
</div>`;

// ── AUTH VIEWS ────────────────────────────────
Views.login = ({ t }) => `
<div class="auth-page">
  <div class="auth-card">
    <div class="auth-logo"><span class="logo-icon">SB</span><span>SillBridge</span></div>
    <h2>${t('signIn')}</h2>
    <p class="auth-sub">Welcome back! Continue your learning journey.</p>
    <form id="login-form">
      <div class="form-group">
        <label>${t('email')}</label>
        <input id="l-email" type="email" class="form-input" placeholder="your@email.com" required>
      </div>
      <div class="form-group">
        <label>${t('password')}</label>
        <input id="l-pass" type="password" class="form-input" placeholder="••••••••" required>
      </div>
      <a class="auth-helper-link" onclick="App.navigate('forgot')">${t('forgotPassword')}</a>
      <div id="login-error" class="form-error"></div>
      <button type="submit" class="btn btn-primary btn-full">${t('signIn')} →</button>
    </form>
    <p class="auth-link">${t('dontHave')} <a onclick="App.navigate('register')">${t('signUp')}</a></p>
    <div class="auth-demo">
      <p>🧪 Demo: use any email + password (min 6 chars) to register</p>
    </div>
  </div>
</div>`;

Views.forgot = ({ t }) => `
<div class="auth-page">
  <div class="auth-card">
    <div class="auth-logo"><span class="logo-icon">SB</span><span>SillBridge</span></div>
    <h2>🔑 ${t('forgotPassword')}</h2>
    <p class="auth-sub">Enter the email tied to your account — we'll send you a reset link.</p>
    <form id="forgot-form">
      <div class="form-group">
        <label>${t('email')}</label>
        <input id="f-email" type="email" class="form-input" placeholder="your@email.com" required>
      </div>
      <div id="forgot-error"   class="form-error"></div>
      <div id="forgot-success" class="form-success" style="display:none"></div>
      <button type="submit" class="btn btn-primary btn-full">Send reset link →</button>
    </form>
    <p class="auth-link"><a onclick="App.navigate('login')">← Back to ${t('signIn')}</a></p>
  </div>
</div>`;

Views.reset = ({ t, resetToken }) => `
<div class="auth-page">
  <div class="auth-card">
    <div class="auth-logo"><span class="logo-icon">SB</span><span>SillBridge</span></div>
    <h2>🔒 Choose a new password</h2>
    <p class="auth-sub">Set your new password to regain access.</p>
    <form id="reset-form">
      <input type="hidden" id="reset-token" value="${escHtml(resetToken || '')}">
      <div class="form-group">
        <label>New ${t('password')}</label>
        <input id="reset-pass" type="password" class="form-input" placeholder="Min 6 characters" required>
      </div>
      <div class="form-group">
        <label>${t('confirmPassword')}</label>
        <input id="reset-pass2" type="password" class="form-input" placeholder="Repeat password" required>
      </div>
      <div id="reset-error"   class="form-error"></div>
      <div id="reset-success" class="form-success" style="display:none"></div>
      <button type="submit" class="btn btn-primary btn-full">Reset password →</button>
    </form>
    <p class="auth-link"><a onclick="App.navigate('login')">← Back to ${t('signIn')}</a></p>
  </div>
</div>`;

Views.register = ({ t }) => `
<div class="auth-page">
  <div class="auth-card">
    <div class="auth-logo"><span class="logo-icon">SB</span><span>SillBridge</span></div>
    <h2>${t('signUp')}</h2>
    <p class="auth-sub">Start your journey from zero to senior developer.</p>
    <form id="reg-form">
      <div class="form-group">
        <label>${t('name')}</label>
        <input id="r-name" type="text" class="form-input" placeholder="Merdan Durdyyew" required>
      </div>
      <div class="form-group">
        <label>${t('email')}</label>
        <input id="r-email" type="email" class="form-input" placeholder="merdan@email.com" required>
      </div>
      <div class="form-group">
        <label>${t('password')}</label>
        <input id="r-pass" type="password" class="form-input" placeholder="Min 6 characters" required>
      </div>
      <div class="form-group">
        <label>${t('confirmPassword')}</label>
        <input id="r-pass2" type="password" class="form-input" placeholder="Repeat password" required>
      </div>
      <div id="reg-error" class="form-error"></div>
      <button type="submit" class="btn btn-primary btn-full">${t('signUp')} →</button>
    </form>
    <p class="auth-link">${t('alreadyHave')} <a onclick="App.navigate('login')">${t('signIn')}</a></p>
  </div>
</div>`;

// ── BRANCH SELECTION ──────────────────────────
Views.branches = ({ t, user }) => `
<div class="branches-page">
  <div class="branches-header">
    <h1>${t('selectBranch')}</h1>
    <p>Each branch takes you from beginner to senior in 10 levels</p>
    ${user?.branch ? `<p class="current-branch">Current: ${SB.branches.find(b=>b.id===user.branch)?.label || ''}</p>` : ''}
  </div>
  <div class="branches-choose-grid">
    ${SB.branches.map(b => `
      <div class="branch-card ${user?.branch===b.id?'selected':''}" data-branch="${b.id}" style="--color:${b.color}">
        <div class="branch-card-icon">${b.icon}</div>
        <h3>${b.label}</h3>
        <p>${b.desc}</p>
        <div class="branch-levels">10 Levels · 40+ Lessons</div>
        ${user?.branch===b.id ? '<div class="branch-current">✓ Current</div>' : '<div class="branch-select-btn">Select →</div>'}
      </div>`).join('')}
  </div>
</div>`;

// ── DASHBOARD ─────────────────────────────────
Views.dashboard = ({ t, user, lang }) => {
  if (!user) return Views.login({ t });
  const branch = SB.branches.find(b => b.id === user.branch) || SB.branches[0];
  const curriculum = SB.curriculum[user.branch] || SB.curriculum.frontend;
  const totalLessons = curriculum.levels.reduce((sum, l) => sum + l.lessons.length, 0);
  const completedCount = user.completedLessons?.length || 0;
  const pct = Math.round((completedCount / totalLessons) * 100);
  const levelData = curriculum.levels[Math.min(user.level - 1, curriculum.levels.length - 1)];
  const greet = t(greetByTime());

  return `
<div class="dashboard">
  <div class="dash-header">
    <div>
      <h1>${greet}, <span class="gradient-text">${escHtml(user.name)}</span>! 👋</h1>
      <p>${t('continueWhere')}</p>
    </div>
    <div class="dash-header-actions">
      <button class="btn btn-primary" onclick="App.navigate('learn')">${t('continueLesson')} →</button>
    </div>
  </div>

  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-icon">⚡</div>
      <div class="stat-val">${user.xp}</div>
      <div class="stat-label">${t('totalXP')}</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📊</div>
      <div class="stat-val">${user.level}/10</div>
      <div class="stat-label">${t('currentLevel')}</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📖</div>
      <div class="stat-val">${completedCount}</div>
      <div class="stat-label">${t('completedLessons')}</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🔥</div>
      <div class="stat-val">${user.streak}</div>
      <div class="stat-label">${t('streak')} ${t('days')}</div>
    </div>
  </div>

  <div class="dash-grid">
    <div class="dash-main">
      <div class="progress-card">
        <div class="progress-card-header">
          <h3>${branch?.icon} ${branch?.label || 'Frontend'}</h3>
          <span>${pct}% ${t('complete')}</span>
        </div>
        <div class="progress-bar-large">
          <div style="width:${pct}%;background:${branch?.color || '#3B82F6'}"></div>
        </div>
        <div class="levels-roadmap">
          ${curriculum.levels.map((lvl, i) => {
            const lvlCompleted = user.xp >= (curriculum.levels[i+1]?.xpRequired || Infinity);
            const lvlActive = user.level - 1 === i;
            return `<div class="roadmap-step ${lvlCompleted?'done':''} ${lvlActive?'active':''}">
              <div class="roadmap-dot">${lvlCompleted ? '✓' : i+1}</div>
              <div class="roadmap-label">${lvl.title}</div>
            </div>`;
          }).join('<div class="roadmap-line"></div>')}
        </div>
        <button class="btn btn-primary mt-16" onclick="App.navigate('learn')">${t('continueLesson')} →</button>
      </div>
    </div>

    <div class="dash-side">
      <div class="card">
        <h3>🏅 ${t('achievements')} (${user.badges?.length || 0})</h3>
        <div class="badges-grid">
          ${SB.badges.map(b => `
            <div class="badge-item ${user.badges?.includes(b.id)?'earned':''}" title="${b.name}: ${b.desc}">
              <span>${b.icon}</span>
            </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <h3>🎮 ${t('minigame')}</h3>
        <p>Practice what you learned</p>
        <div class="mini-games-list">
          <button class="btn btn-secondary btn-sm" onclick="App.navigate('games')">🔤 ${t('wordMatch')}</button>
          <button class="btn btn-secondary btn-sm" onclick="App.navigate('games')">💻 ${t('codeBreaker')}</button>
          <button class="btn btn-secondary btn-sm" onclick="App.navigate('games')">🔍 ${t('termHunt')}</button>
        </div>
      </div>

      <div class="card">
        <h3>📅 ${t('dailyGoal')}</h3>
        <div class="daily-progress">
          <div class="daily-bar">
            <div style="width:${Math.min((user.dailyXP||0)/1*100,100)}%"></div>
          </div>
          <p>${user.dailyXP || 0} / 100 XP today</p>
        </div>
      </div>
    </div>
  </div>
</div>`;
};

// ── LEARN (COURSE) ────────────────────────────
Views.learn = ({ t, user }) => {
  if (!user?.branch) return Views.branches({ t, user });
  const curriculum = SB.curriculum[user.branch];
  const branch = SB.branches.find(b => b.id === user.branch);
  if (!curriculum) return `<p>No curriculum found</p>`;

  return `
<div class="learn-page">
  <div class="learn-header">
    <div>
      <h1>${branch?.icon} ${branch?.label} ${t('roadmap')}</h1>
      <p>${t('beginnerToSenior')} — 10 levels</p>
    </div>
    <button class="btn btn-ghost btn-sm" onclick="App.navigate('branches')">${t('changeBranch')}</button>
  </div>

  <div class="curriculum-list">
    ${curriculum.levels.map((level, li) => {
      const isUnlocked = user.xp >= level.xpRequired;
      const isActive = user.level - 1 === li;
      const lvlDone = user.xp >= (curriculum.levels[li+1]?.xpRequired || Infinity);

      return `
      <div class="level-block ${isUnlocked?'unlocked':'locked'} ${lvlDone?'done':''} ${isActive?'active':''}">
        <div class="level-header">
          <div class="level-badge" style="background:${branch?.color}">
            ${lvlDone ? '✓' : `L${li+1}`}
          </div>
          <div class="level-info">
            <h3>${t('level')} ${li+1}: ${escHtml(level.title)}</h3>
            <p>${level.lessons.length} lessons · ${level.xpReward} XP reward · Requires ${level.xpRequired} XP</p>
          </div>
          ${!isUnlocked ? `<div class="level-lock">🔒 ${level.xpRequired} XP</div>` : ''}
        </div>
        ${isUnlocked ? `
        <div class="lessons-list">
          ${level.lessons.map((lesson, lsi) => {
            const done = user.completedLessons?.includes(lesson.id) || user.completedQuizzes?.find(q=>q.id===lesson.id) || user.completedProjects?.includes(lesson.id);
            const icons = { lesson:'📖', quiz:'✅', project:'🏗️' };
            return `<div class="lesson-row ${done?'done':''}" data-lesson="${lesson.id}" data-level="${li}" data-lesson-idx="${lsi}">
              <span class="lesson-type-icon">${icons[lesson.type] || '📖'}</span>
              <span class="lesson-title">${escHtml(lesson.title)}</span>
              <span class="lesson-xp">+${lesson.xp} XP</span>
              ${done ? '<span class="lesson-done-badge">✓</span>' : '<span class="lesson-arrow">→</span>'}
            </div>`;
          }).join('')}
        </div>` : `<div class="level-locked-msg">Complete previous levels to unlock</div>`}
      </div>`;
    }).join('')}
  </div>
</div>`;
};

// ── LESSON VIEW ───────────────────────────────
Views.lessonView = ({ lesson, level, user, t, curriculum, levelIdx, lessonIdx }) => {
  const isCompleted = user.completedLessons?.includes(lesson.id) || user.completedQuizzes?.find(q=>q.id===lesson.id) || user.completedProjects?.includes(lesson.id);
  const hasNext = lessonIdx + 1 < level.lessons.length || levelIdx + 1 < curriculum.levels.length;

  let body = '';
  if (lesson.type === 'lesson') {
    body = `
    <div class="lesson-content">
      ${lesson.content || ''}
      ${lesson.tryCode ? (() => {
        const starter = lesson.tryCode.starter || '';
        // Treat anything that starts with "<" as HTML — run with live preview.
        const mode = (lesson.tryCode.mode) || (starter.trim().startsWith('<') ? 'html' : 'js');
        return `
      <div class="try-it-section">
        <h3>👩‍💻 Try It Yourself</h3>
        <p class="try-task"><strong>Task:</strong> ${escHtml(lesson.tryCode.task)}</p>
        <div class="code-editor-wrap">
          <div class="editor-header">
            <span>${t('codeEditor')} <span class="editor-mode">[${mode.toUpperCase()}]</span></span>
            <div>
              <button class="btn btn-sm btn-primary" id="run-code-btn">▶ ${t('runCode')}</button>
              <button class="btn btn-sm btn-ghost" id="reset-code-btn">${t('reset')}</button>
            </div>
          </div>
          <textarea id="code-editor" class="code-editor" spellcheck="false" data-mode="${mode}">${escHtml(starter)}</textarea>
          <div class="code-preview-wrap">
            <div class="output-label">${mode === 'html' ? '🖼️ Live Preview' : '🖥️ Sandbox'}:</div>
            <div id="code-preview" class="code-preview"></div>
          </div>
          <div class="output-section">
            <div class="output-label">${t('output')}:</div>
            <div id="code-output" class="code-output"></div>
          </div>
        </div>
      </div>`;
      })() : ''}
      ${!isCompleted ? `<button class="btn btn-primary btn-lg" id="mark-done-btn">✅ Mark as Complete (+${lesson.xp} XP)</button>` : `<div class="completed-badge">✅ Completed!</div>`}
    </div>`;
  } else if (lesson.type === 'quiz') {
    body = `
    <div class="quiz-container">
      <div class="quiz-header">
        <h2>🎯 ${lesson.title}</h2>
        <p>${lesson.questions?.length} questions · Pass with 70%+</p>
      </div>
      <form id="quiz-form">
        ${(lesson.questions || []).map((q, qi) => `
          <div class="quiz-question">
            <div class="q-num">Q${qi+1}</div>
            <p class="q-text">${escHtml(q.q)}</p>
            <div class="q-options">
              ${q.options.map((opt, oi) => `
                <label class="q-option">
                  <input type="radio" name="q${qi}" value="${oi}">
                  <span>${escHtml(opt)}</span>
                </label>`).join('')}
            </div>
          </div>`).join('')}
      </form>
      ${isCompleted ? `<div class="completed-badge">✅ Already passed!</div>` : `<button class="btn btn-primary btn-lg" id="quiz-submit-btn">${t('submitAnswer')}</button>`}
      <div id="quiz-result-overlay" class="quiz-result-overlay" style="display:none"></div>
    </div>`;
  } else if (lesson.type === 'project') {
    const isProjectDone = user.completedProjects?.includes(lesson.id);
    body = `
    <div class="project-container">
      <div class="project-header">
        <h2>🏗️ ${lesson.title}</h2>
        <p class="project-xp">+${lesson.xp} XP on completion</p>
      </div>
      <div class="project-desc">
        <p>${escHtml(lesson.desc)}</p>
      </div>
      <div class="requirements-section">
        <h3>📋 Requirements</h3>
        <ul>
          ${(lesson.requirements || []).map(r => `<li>✓ ${escHtml(r)}</li>`).join('')}
        </ul>
      </div>
      ${lesson.hints ? `
      <details class="hints-section">
        <summary class="btn btn-ghost">${t('showHint')} 💡</summary>
        <ul>${lesson.hints.map(h => `<li>${escHtml(h)}</li>`).join('')}</ul>
      </details>` : ''}
      ${lesson.starterCode ? `
      <div class="starter-code-section">
        <h3>🚀 Starter Code</h3>
        <div class="code-block"><pre><code>${escHtml(lesson.starterCode)}</code></pre></div>
      </div>` : ''}
      ${isProjectDone ? `<div class="completed-badge">✅ Project Completed!</div>` : 
        `<button class="btn btn-primary btn-lg" id="project-done-btn">✅ I Built This! (+${lesson.xp} XP)</button>`}
    </div>`;
  }

  return `
<div class="lesson-page">
  <div class="lesson-nav">
    <button class="btn btn-ghost btn-sm" id="back-to-course-btn">← ${t('back')}</button>
    <div class="lesson-nav-info">
      <span>${escHtml(level.title)}</span>
      <span>·</span>
      <span>${lesson.type === 'lesson' ? '📖' : lesson.type === 'quiz' ? '✅' : '🏗️'} ${escHtml(lesson.title)}</span>
    </div>
    <div class="lesson-nav-btns">
      <button class="btn btn-ghost btn-sm" id="prev-lesson-btn">← ${t('prevLesson')}</button>
      ${hasNext ? `<button class="btn btn-primary btn-sm" id="next-lesson-btn">${t('nextLesson')} →</button>` : ''}
    </div>
  </div>
  <div class="lesson-body">
    ${body}
  </div>
</div>`;
};

Views.quizResult = ({ score, passed, correct, total, t }) => `
<div class="quiz-result-card">
  <div class="result-icon">${passed ? '🎉' : '😅'}</div>
  <h2>${passed ? t('passed') : t('failed')}</h2>
  <div class="result-score">${score}%</div>
  <p>${correct} / ${total} correct</p>
  ${!passed ? `<p class="result-min">${t('minPassScore')}</p>` : ''}
  ${passed ? `<button class="btn btn-primary" id="quiz-next-btn">${t('nextLesson')} →</button>` 
           : `<button class="btn btn-secondary" id="quiz-retry-btn">Try Again</button>`}
</div>`;

// ── ACTIVITY GRAPH (GitHub-style) ─────────────
// Renders a 7×N grid where each cell is one day, colored by XP gained.
Views.activityGraph = (activity, days = 365) => {
  // Build a Map: 'YYYY-MM-DD' -> xp
  const map = new Map((activity || []).map(a => [a.day, a.xp]));
  const cells = [];
  const today = new Date();
  // Round to local midnight
  today.setHours(0, 0, 0, 0);

  // Start from `days - 1` days ago, so the rightmost column is current week.
  const start = new Date(today);
  start.setDate(start.getDate() - (days - 1));
  // Align the start to a Sunday so each column is one ISO week (Sun→Sat).
  start.setDate(start.getDate() - start.getDay());

  // Build a contiguous list of date strings from start → today inclusive
  let totalXP = 0;
  let activeDays = 0;
  let longestStreak = 0;
  let currentStreak = 0;
  let cur = new Date(start);
  while (cur <= today) {
    const y = cur.getFullYear();
    const m = String(cur.getMonth() + 1).padStart(2, '0');
    const d = String(cur.getDate()).padStart(2, '0');
    const key = `${y}-${m}-${d}`;
    const xp = map.get(key) || 0;
    const cls = xp === 0  ? ''
              : xp < 30   ? 'l1'
              : xp < 80   ? 'l2'
              : xp < 150  ? 'l3'
              : 'l4';
    cells.push(`<div class="activity-cell ${cls}" title="${key}: ${xp} XP"></div>`);
    if (xp > 0) { activeDays++; totalXP += xp; currentStreak++; longestStreak = Math.max(longestStreak, currentStreak); }
    else currentStreak = 0;
    cur.setDate(cur.getDate() + 1);
  }

  return `
  <div class="activity-graph">
    <h3>📈 Learning Activity (last ${days} days)</h3>
    <div class="activity-summary">
      <span>⚡ <strong>${totalXP}</strong> XP earned</span>
      <span>🗓️ <strong>${activeDays}</strong> active days</span>
      <span>🔥 longest streak: <strong>${longestStreak}</strong></span>
    </div>
    <div class="activity-scroll">
      <div class="activity-grid">${cells.join('')}</div>
    </div>
    <div class="activity-legend">
      Less
      <span class="activity-cell"></span>
      <span class="activity-cell l1"></span>
      <span class="activity-cell l2"></span>
      <span class="activity-cell l3"></span>
      <span class="activity-cell l4"></span>
      More
    </div>
  </div>`;
};

// ── PROGRESS ─────────────────────────────────
Views.progress = ({ t, user, activity }) => {
  if (!user) return Views.login({ t });
  const curriculum = user.branch ? SB.curriculum[user.branch] : SB.curriculum.frontend;
  const totalLessons = curriculum.levels.reduce((s, l) => s + l.lessons.length, 0);
  const completedCount = user.completedLessons?.length || 0;
  const quizCount = user.completedQuizzes?.length || 0;
  const projectCount = user.completedProjects?.length || 0;

  return `
<div class="progress-page">
  <h1>📊 ${t('progress')}</h1>

  <div class="stats-row">
    <div class="stat-card"><div class="stat-icon">⚡</div><div class="stat-val">${user.xp}</div><div class="stat-label">${t('totalXP')}</div></div>
    <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-val">${user.level}/10</div><div class="stat-label">${t('level')}</div></div>
    <div class="stat-card"><div class="stat-icon">📖</div><div class="stat-val">${completedCount}</div><div class="stat-label">Lessons</div></div>
    <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-val">${quizCount}</div><div class="stat-label">Quizzes</div></div>
    <div class="stat-card"><div class="stat-icon">🏗️</div><div class="stat-val">${projectCount}</div><div class="stat-label">Projects</div></div>
    <div class="stat-card"><div class="stat-icon">🔥</div><div class="stat-val">${user.streak}</div><div class="stat-label">${t('streak')}</div></div>
  </div>

  ${Views.activityGraph(activity, 365)}

  <div class="progress-section">
    <h2>${t('currentLevel')} ${t('progress')}</h2>
    <div class="progress-bar-wrap">
      <span>0</span>
      <div class="progress-bar-large"><div style="width:${Math.round((completedCount/totalLessons)*100)}%"></div></div>
      <span>${totalLessons}</span>
    </div>
    <p>${completedCount} of ${totalLessons} lessons completed</p>
  </div>

  <div class="levels-progress">
    <h2>${t('allLevels')}</h2>
    <div class="levels-grid">
      ${curriculum.levels.map((lvl, i) => {
        const unlocked = user.xp >= lvl.xpRequired;
        const done = user.xp >= (curriculum.levels[i+1]?.xpRequired || Infinity);
        return `<div class="level-progress-card ${done?'done':''} ${!unlocked?'locked':''}">
          <div class="lpc-num">${done ? '✓' : i+1}</div>
          <div class="lpc-info">
            <strong>${escHtml(lvl.title)}</strong>
            <span>${lvl.xpRequired} XP required</span>
          </div>
          <div class="lpc-status">${done ? '✅' : unlocked ? '▶' : '🔒'}</div>
        </div>`;
      }).join('')}
    </div>
  </div>

  <div class="badges-section">
    <h2>🏅 ${t('achievements')}</h2>
    <div class="badges-full-grid">
      ${SB.badges.map(b => {
        const earned = user.badges?.includes(b.id);
        return `<div class="badge-full ${earned?'earned':''}">
          <span class="badge-icon">${b.icon}</span>
          <span class="badge-name">${b.name}</span>
          <span class="badge-desc">${b.desc}</span>
          ${earned ? '<span class="badge-earned">✓ Earned</span>' : '<span class="badge-locked">🔒 Locked</span>'}
        </div>`;
      }).join('')}
    </div>
  </div>
</div>`;
};

// ── INTERVIEW PREP ────────────────────────────
Views.interview = ({ t }) => `
<div class="interview-page">
  <h1>💼 ${t('interview')}</h1>
  <p class="page-sub">Prepare for international company technical interviews</p>

  <div class="interview-tabs">
    <button class="tab-btn active" data-tab="questions" onclick="switchInterviewTab('questions',this)">❓ Questions</button>
    <button class="tab-btn" data-tab="terms" onclick="switchInterviewTab('terms',this)">📚 ${t('technicalTerms')}</button>
    <button class="tab-btn" data-tab="tips" onclick="switchInterviewTab('tips',this)">💡 Tips</button>
  </div>

  <div id="interview-questions" class="interview-panel">
    ${SB.interviewQuestions.map(cat => `
      <div class="interview-category">
        <h3 class="category-label">${cat.category}</h3>
        ${cat.questions.map(q => `
          <div class="interview-item">
            <div class="interview-q">
              <span>${escHtml(q.q)}</span>
              <span class="q-arrow">▼</span>
            </div>
            <div class="interview-answer" style="max-height:0;overflow:hidden;transition:max-height .3s ease">
              <div class="answer-body">${escHtml(q.a)}</div>
            </div>
          </div>`).join('')}
      </div>`).join('')}
  </div>

  <div id="interview-terms" class="interview-panel" style="display:none">
    <p class="terms-hint">Click a card to flip and see the definition</p>
    <div class="terms-flip-grid">
      ${SB.techTerms.map(t => `
        <div class="term-card" title="Click to flip">
          <div class="term-front">
            <span class="term-category">${t.category}</span>
            <span class="term-word">${t.term}</span>
          </div>
          <div class="term-back">
            <p>${t.def}</p>
          </div>
        </div>`).join('')}
    </div>
  </div>

  <div id="interview-tips" class="interview-panel" style="display:none">
    <div class="tips-grid">
      ${[
        { icon:'🤝', title:'Before the Interview', tips:['Research the company and their tech stack','Review your projects and be ready to explain decisions','Practice coding on paper/whiteboard','Prepare questions to ask them','Check your internet/environment for remote interviews'] },
        { icon:'💬', title:'During the Interview', tips:['Think aloud — interviewers want to see your process','Ask clarifying questions before solving','Start with brute force, then optimize','Use STAR method for behavioral questions','Be honest about what you don\'t know'] },
        { icon:'📝', title:'Coding Questions', tips:['Read the problem fully before coding','Identify edge cases','Discuss time/space complexity (Big O)','Write clean, readable code with variable names','Test your solution with examples'] },
        { icon:'🌍', title:'International Companies', tips:['English proficiency is key — practice technical vocabulary','Know about FAANG/MAANG interview formats','LeetCode for algorithms, System Design for seniors','Prepare a 2-minute "tell me about yourself"','Follow up with a thank-you email'] },
      ].map(section => `
        <div class="tip-section">
          <h3>${section.icon} ${section.title}</h3>
          <ul>${section.tips.map(tip => `<li>${escHtml(tip)}</li>`).join('')}</ul>
        </div>`).join('')}
    </div>
  </div>
</div>

<script>
function switchInterviewTab(tab, btn) {
  document.querySelectorAll('.interview-panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('interview-' + tab).style.display = 'block';
  btn.classList.add('active');
}
</script>`;

// ── README HELPER ─────────────────────────────
Views.readme = ({ t }) => `
<div class="readme-page">
  <h1>📝 ${t('readme')} Generator</h1>
  <p class="page-sub">Generate professional README.md files for your GitHub projects</p>

  <div class="readme-builder">
    <div class="readme-form">
      <div class="form-group">
        <label>${t('projectName')} *</label>
        <input id="r-proj-name" class="form-input" placeholder="MyAwesomeProject">
      </div>
      <div class="form-group">
        <label>${t('description')} *</label>
        <textarea id="r-proj-desc" class="form-input" rows="3" placeholder="A brief description of what your project does and why it exists."></textarea>
      </div>
      <div class="form-group">
        <label>${t('features')} (one per line)</label>
        <textarea id="r-features" class="form-input" rows="4" placeholder="User authentication\nReal-time updates\nMobile responsive\nREST API"></textarea>
      </div>
      <div class="form-group">
        <label>${t('installation')} command</label>
        <input id="r-install" class="form-input" placeholder="npm install" value="npm install">
      </div>
      <div class="form-group">
        <label>${t('usage')} command</label>
        <input id="r-usage" class="form-input" placeholder="npm start" value="npm start">
      </div>
      <div class="form-group">
        <label>${t('license')}</label>
        <select id="r-license" class="form-input">
          <option>MIT</option><option>Apache 2.0</option><option>GPL 3.0</option><option>BSD 3-Clause</option><option>Unlicense</option>
        </select>
      </div>
      <button class="btn btn-primary" id="gen-readme-btn">${t('generateReadme')} ✨</button>
    </div>
    
    <div class="readme-output-section">
      <div class="readme-output-header">
        <h3>Generated README.md</h3>
        <button class="btn btn-secondary" id="copy-readme-btn" style="display:none">${t('copyReadme')} 📋</button>
      </div>
      <pre id="readme-output" class="readme-output" style="display:none"></pre>
      <div class="readme-placeholder" id="readme-placeholder">
        <div>📄</div>
        <p>Fill in the form and click "Generate README"</p>
      </div>
    </div>
  </div>
</div>`;

// ── LEADERBOARD ───────────────────────────────
Views.leaderboard = ({ t, user, leaderboardData, leaderboardMode }) => {
  const leaders = leaderboardData || [];
  const myRank = leaders.findIndex(l => l.name === user?.name) + 1;
  const mode = leaderboardMode || 'global';

  return `
<div class="leaderboard-page">
  <h1>🏆 ${t('leaderboard')}</h1>
  <div class="leaderboard-tabs">
    <button class="tab-btn ${mode==='global'?'active':''}" data-lb-mode="global">🌍 Global Top 20</button>
    <button class="tab-btn ${mode==='friends'?'active':''}" data-lb-mode="friends">👥 My Study Group</button>
  </div>
  ${myRank ? `<p class="my-rank">Your rank: <strong>#${myRank}</strong></p>` : ''}

  <div class="leaders-list">
    ${leaders.length === 0 ? `<p class="empty-state">${
      mode === 'friends'
        ? "Add a friend to see a private leaderboard. Head to the Friends page."
        : "Be the first on the leaderboard! Start learning to earn XP."
    }</p>` :
      leaders.map((l, i) => {
        const branch = SB.branches.find(b => b.id === l.branch);
        const medals = ['🥇','🥈','🥉'];
        return `<div class="leader-row ${l.name === user?.name ? 'is-me' : ''}">
          <div class="leader-rank">${medals[i] || `#${i+1}`}</div>
          <div class="leader-avatar">${l.name[0]?.toUpperCase()}</div>
          <div class="leader-info">
            <span class="leader-name">${escHtml(l.name)} ${l.name === user?.name ? '(You)' : ''}</span>
            <span class="leader-branch">${branch?.icon || '💻'} ${branch?.label || 'Learner'} · Level ${l.level}</span>
          </div>
          <div class="leader-xp">⚡ ${l.xp} XP</div>
          <div class="leader-badges">🏅 ${l.badges}</div>
        </div>`;
      }).join('')}
  </div>
</div>`;
};

// ── FRIENDS / STUDY GROUPS ────────────────────
Views.friends = ({ t, user, friendsData }) => {
  if (!user) return Views.login({ t });
  const d = friendsData || { friends: [], incoming: [], outgoing: [] };

  const row = (f, kind) => {
    const branch = SB.branches.find(b => b.id === f.branch);
    const actions = kind === 'incoming'
      ? `<button class="btn btn-primary btn-sm" data-accept="${f.friendshipId}">Accept</button>
         <button class="btn btn-ghost btn-sm"   data-remove="${f.friendshipId}">Decline</button>`
      : kind === 'outgoing'
      ? `<span style="color:var(--muted);font-size:14px;">Pending…</span>
         <button class="btn btn-ghost btn-sm" data-remove="${f.friendshipId}">Cancel</button>`
      : `<button class="btn btn-ghost btn-sm" data-remove="${f.friendshipId}">Remove</button>`;
    return `<div class="friend-row">
      <div class="friend-avatar">${escHtml((f.name||'?')[0].toUpperCase())}</div>
      <div class="friend-info">
        <strong>${escHtml(f.name)}</strong>
        <small>${escHtml(f.email || '')}${branch ? ' · ' + branch.icon + ' ' + branch.label : ''}</small>
      </div>
      <div class="friend-stats">
        <span>⚡ ${f.xp || 0} XP</span>
        <span>🎯 L${f.level || 1}</span>
      </div>
      <div class="friend-actions">${actions}</div>
    </div>`;
  };

  return `
<div class="friends-page">
  <h1>👥 Friends &amp; Study Groups</h1>
  <p class="page-sub">Add learners by email and compare progress on a private leaderboard.</p>

  <form id="add-friend-form" class="friends-add">
    <input id="friend-email" type="email" class="form-input" placeholder="friend@email.com" required>
    <button type="submit" class="btn btn-primary">Send request</button>
  </form>
  <div id="friends-error" class="form-error" style="display:none"></div>
  <div id="friends-success" class="form-success" style="display:none"></div>

  ${d.incoming.length ? `<div class="friends-section">
    <h2>Incoming requests (${d.incoming.length})</h2>
    ${d.incoming.map(f => row(f, 'incoming')).join('')}
  </div>` : ''}

  ${d.outgoing.length ? `<div class="friends-section">
    <h2>Sent requests (${d.outgoing.length})</h2>
    ${d.outgoing.map(f => row(f, 'outgoing')).join('')}
  </div>` : ''}

  <div class="friends-section">
    <h2>My friends (${d.friends.length})</h2>
    ${d.friends.length === 0
      ? '<div class="friends-empty">No friends yet — invite someone by email above.</div>'
      : d.friends.map(f => row(f, 'friend')).join('')}
  </div>
</div>`;
};

// ── PROFILE ───────────────────────────────────
Views.profile = ({ t, user, lang }) => {
  if (!user) return Views.login({ t });
  const branch = SB.branches.find(b => b.id === user.branch);
  return `
<div class="profile-page">
  <h1>👤 ${t('profile')}</h1>
  <div class="profile-grid">
    <div class="profile-card">
      <div class="profile-avatar-lg">${user.name[0]?.toUpperCase()}</div>
      <h2>${escHtml(user.name)}</h2>
      <p>${escHtml(user.email)}</p>
      <div class="profile-badges">
        <span>⚡ ${user.xp} XP</span>
        <span>🎯 Level ${user.level}</span>
        <span>🔥 ${user.streak} day streak</span>
      </div>
      ${branch ? `<div class="profile-branch" style="color:${branch.color}">${branch.icon} ${branch.label}</div>` : ''}
      <p class="profile-joined">Joined: ${new Date(user.joinDate).toLocaleDateString()}</p>
    </div>
    <div class="profile-settings">
      <div class="card">
        <h3>${t('settings')}</h3>
        <div class="form-group">
          <label>${t('name')}</label>
          <input id="p-name" class="form-input" value="${escHtml(user.name)}">
        </div>
        <div class="form-group">
          <label>${t('email')}</label>
          <input class="form-input" value="${escHtml(user.email)}" disabled>
        </div>
        <div class="form-group setting-row">
          <label>${t('darkMode')}</label>
          <input type="checkbox" id="dark-toggle-check" ${Store.getDark()?'checked':''}>
        </div>
        <div class="form-group">
          <label>${t('chooseLanguage')}</label>
          <select id="lang-select" class="form-input">
            <option value="en" ${lang==='en'?'selected':''}>🇬🇧 English</option>
            <option value="ru" ${lang==='ru'?'selected':''}>🇷🇺 Русский</option>
            <option value="tk" ${lang==='tk'?'selected':''}>🇹🇲 Türkmençe</option>
          </select>
        </div>
        <div class="form-row">
          <button class="btn btn-primary" id="profile-save-btn">${t('save')}</button>
          <button class="btn btn-danger" id="logout-btn">${t('logout')}</button>
        </div>
      </div>
    </div>
  </div>
</div>`;
};

// ── TECH TERMS ────────────────────────────────
Views.terms = ({ t }) => `
<div class="terms-page">
  <h1>📚 Technical Terms Dictionary</h1>
  <div class="terms-grid">
    ${SB.techTerms.map(term => `
      <div class="term-entry">
        <div class="term-head">
          <strong>${term.term}</strong>
          <span class="term-cat-badge">${term.category}</span>
        </div>
        <p>${term.def}</p>
      </div>`).join('')}
  </div>
</div>`;

// ── GAMES ─────────────────────────────────────
Views.games = ({ t }) => `
<div class="games-page">
  <h1>🎮 ${t('minigame')}</h1>
  <p class="page-sub">Practice vocabulary and coding skills through games</p>
  <div class="games-grid">
    <div class="game-card" data-game="wordmatch">
      <div class="game-icon">🔤</div>
      <h3>${t('wordMatch')}</h3>
      <p>Match IT terms with their definitions before time runs out</p>
      <button class="btn btn-primary">${t('playGame')} →</button>
    </div>
    <div class="game-card" data-game="codebreaker">
      <div class="game-icon">💻</div>
      <h3>${t('codeBreaker')}</h3>
      <p>Fill in the missing piece of code to complete the challenge</p>
      <button class="btn btn-primary">${t('playGame')} →</button>
    </div>
    <div class="game-card" data-game="termhunt">
      <div class="game-icon">🔍</div>
      <h3>${t('termHunt')}</h3>
      <p>Find the correct definition for the displayed tech term</p>
      <button class="btn btn-primary">${t('playGame')} →</button>
    </div>
  </div>
  <div id="game-area" class="game-area"></div>
</div>`;
