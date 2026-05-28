// ═══════════════════════════════════════════════
//  SILLBRIDGE — APP ROUTER & RENDERER
// ═══════════════════════════════════════════════

const App = (() => {
  let currentView = 'home';
  let currentLesson = null;
  let toastQueue = [];

  // ── INIT ──
  function init() {
    applyTheme();
    renderNav();
    const user = Store.getCurrentUser();
    if (!user) {
      navigate('landing');
    } else {
      navigate(user.branch ? 'dashboard' : 'branches');
    }
    setupGlobalListeners();
  }

  function applyTheme() {
    const dark = Store.getDark();
    document.documentElement.classList.toggle('dark', dark);
  }

  function setupGlobalListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.nav-item')) {
        const view = e.target.closest('.nav-item').dataset.view;
        if (view) navigate(view);
      }
    });
    window.addEventListener('popstate', () => {
      const hash = location.hash.replace('#', '') || 'landing';
      navigate(hash, false);
    });
  }

  // ── ROUTER ──
  function navigate(view, pushState = true) {
    const user = Store.getCurrentUser();
    const protectedViews = ['dashboard', 'learn', 'progress', 'interview', 'readme', 'leaderboard', 'branches', 'profile'];

    if (protectedViews.includes(view) && !user) {
      view = 'login';
    }

    currentView = view;
    if (pushState) history.pushState({}, '', '#' + view);
    renderApp();
  }

  // ── MAIN RENDER ──
  async function renderApp() {
    const root = document.getElementById('app');
    const user = Store.getCurrentUser();
    const lang = Store.getLang();
    const t = (k) => SB.i18n[lang]?.[k] || SB.i18n.en[k] || k;

    // Nav
    renderNav();

    // Pre-load leaderboard data if needed
    let leaderboardData = null;
    if (currentView === 'leaderboard') {
      leaderboardData = await Store.getLeaderboard().catch(() => []);
    }

    // Views
    const views = {
      landing: Views.landing,
      login: Views.login,
      register: Views.register,
      dashboard: Views.dashboard,
      branches: Views.branches,
      learn: Views.learn,
      progress: Views.progress,
      interview: Views.interview,
      readme: Views.readme,
      leaderboard: Views.leaderboard,
      profile: Views.profile,
      terms: Views.terms,
      games: Views.games,
    };

    const viewFn = views[currentView] || Views.landing;
    root.innerHTML = viewFn({ user, t, lang, leaderboardData });
    attachViewEvents(currentView);
  }

  function renderNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const user = Store.getCurrentUser();
    const lang = Store.getLang();
    const t = (k) => SB.i18n[lang]?.[k] || SB.i18n.en[k] || k;

    if (!user) {
      nav.innerHTML = `
        <div class="nav-inner">
          <a class="nav-logo" onclick="App.navigate('landing')">
            <span class="logo-icon">SB</span>
            <span class="logo-text">SillBridge</span>
          </a>
          <div class="nav-actions">
            ${LangSwitcher(lang, t)}
            <button class="btn btn-ghost" onclick="App.navigate('login')">${t('login')}</button>
            <button class="btn btn-primary" onclick="App.navigate('register')">${t('register')}</button>
            <button class="btn-icon dark-toggle" onclick="App.toggleDark()" title="Toggle theme">
              ${Store.getDark() ? '☀️' : '🌙'}
            </button>
          </div>
        </div>`;
    } else {
      const levelInfo = getLevelInfo(user);
      nav.innerHTML = `
        <div class="nav-inner">
          <a class="nav-logo" onclick="App.navigate('dashboard')">
            <span class="logo-icon">SB</span>
            <span class="logo-text">SillBridge</span>
          </a>
          <nav class="nav-links">
            <a class="nav-item ${currentView==='dashboard'?'active':''}" data-view="dashboard">${t('dashboard')}</a>
            <a class="nav-item ${currentView==='learn'?'active':''}" data-view="learn">${t('branches')}</a>
            <a class="nav-item ${currentView==='progress'?'active':''}" data-view="progress">${t('progress')}</a>
            <a class="nav-item ${currentView==='interview'?'active':''}" data-view="interview">${t('interview')}</a>
            <a class="nav-item ${currentView==='readme'?'active':''}" data-view="readme">${t('readme')}</a>
            <a class="nav-item ${currentView==='games'?'active':''}" data-view="games">${t('playGame')}</a>
            <a class="nav-item ${currentView==='leaderboard'?'active':''}" data-view="leaderboard">${t('leaderboard')}</a>
          </nav>
          <div class="nav-actions">
            ${LangSwitcher(lang, t)}
            <div class="nav-xp" title="${user.xp} XP — Level ${user.level}">
              <span class="xp-badge">⚡ ${user.xp} XP</span>
              <div class="xp-bar-mini"><div style="width:${Math.min((user.xp % 300)/3,100)}%"></div></div>
            </div>
            <div class="nav-streak" title="${user.streak} day streak">🔥 ${user.streak}</div>
            <button class="nav-avatar" onclick="App.navigate('profile')">${user.name[0].toUpperCase()}</button>
            <button class="btn-icon dark-toggle" onclick="App.toggleDark()">${Store.getDark() ? '☀️' : '🌙'}</button>
          </div>
        </div>`;
    }
    // Attach lang switcher events
    document.querySelectorAll('.lang-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        Store.setLang(btn.dataset.lang);
        renderApp();
      });
    });
  }

  function LangSwitcher(lang, t) {
    return `<div class="lang-switcher">
      ${['en','ru','tk'].map(l => `<button class="lang-opt ${lang===l?'active':''}" data-lang="${l}">${l.toUpperCase()}</button>`).join('')}
    </div>`;
  }

  function getLevelInfo(user) {
    if (!user.branch || !SB.curriculum[user.branch]) return { current: 1, next: null };
    const levels = SB.curriculum[user.branch].levels;
    const lvl = levels.find((l, i) => {
      const nextXP = levels[i+1]?.xpRequired || Infinity;
      return user.xp >= l.xpRequired && user.xp < nextXP;
    }) || levels[levels.length - 1];
    return lvl;
  }

  // ── EVENT ATTACHMENT ──
  function attachViewEvents(view) {
    if (view === 'login') attachLoginEvents();
    if (view === 'register') attachRegisterEvents();
    if (view === 'branches') attachBranchEvents();
    if (view === 'learn') attachLearnEvents();
    if (view === 'interview') attachInterviewEvents();
    if (view === 'readme') attachReadmeEvents();
    if (view === 'games') attachGameEvents();
    if (view === 'progress') attachProgressEvents();
    if (view === 'profile') attachProfileEvents();
    attachQuizEvents();
    attachProjectEvents();
    attachCodeEditorEvents();
  }

  function attachLoginEvents() {
    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn   = e.target.querySelector('button[type=submit]') || document.querySelector('#login-form button');
      const email = document.getElementById('l-email').value.trim();
      const pass  = document.getElementById('l-pass').value;
      if (btn) { btn.disabled = true; btn.textContent = 'Signing in…'; }
      const result = await Store.login(email, pass);
      if (btn) { btn.disabled = false; btn.textContent = 'Sign In'; }
      if (result.error) {
        showFormError('login-error', result.error);
      } else {
        toast('Welcome back, ' + result.user.name + '! 👋', 'success');
        navigate(result.user.branch ? 'dashboard' : 'branches');
      }
    });
  }

  function attachRegisterEvents() {
    document.getElementById('reg-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name  = document.getElementById('r-name').value.trim();
      const email = document.getElementById('r-email').value.trim();
      const pass  = document.getElementById('r-pass').value;
      const pass2 = document.getElementById('r-pass2').value;
      if (pass !== pass2) { showFormError('reg-error', 'Passwords do not match'); return; }
      if (pass.length < 6) { showFormError('reg-error', 'Password must be at least 6 characters'); return; }
      const btn = document.querySelector('#reg-form button[type=submit]') || document.querySelector('#reg-form button');
      if (btn) { btn.disabled = true; btn.textContent = 'Creating account...'; }
      const result = await Store.register(name, email, pass);
      if (btn) { btn.disabled = false; btn.textContent = 'Create Account'; }
      if (result.error) showFormError('reg-error', result.error);
      else {
        toast('Welcome to SillBridge, ' + name + '! 🎉', 'success');
        navigate('branches');
      }
    });
  }

  function attachBranchEvents() {
    document.querySelectorAll('.branch-card').forEach(card => {
      card.addEventListener('click', () => {
        const branch = card.dataset.branch;
        Store.updateUser({ branch, level: 1 });
        toast('Branch selected! Let\'s start learning 🚀', 'success');
        navigate('learn');
      });
    });
  }

  function attachLearnEvents() {
    document.querySelectorAll('.lesson-row').forEach(row => {
      row.addEventListener('click', () => {
        if (row.classList.contains('locked')) {
          toast('Complete previous levels to unlock this! 🔒', 'warning');
          return;
        }
        const lessonId = row.dataset.lesson;
        const levelIdx = parseInt(row.dataset.level);
        const lessonIdx = parseInt(row.dataset.lessonIdx);
        openLesson(lessonId, levelIdx, lessonIdx);
      });
    });
  }

  function openLesson(lessonId, levelIdx, lessonIdx) {
    const user = Store.getCurrentUser();
    const curriculum = SB.curriculum[user.branch];
    if (!curriculum) return;
    const level = curriculum.levels[levelIdx];
    const lesson = level?.lessons[lessonIdx];
    if (!lesson) return;

    currentLesson = { lessonId, levelIdx, lessonIdx, lesson, level };
    const lang = Store.getLang();
    const t = (k) => SB.i18n[lang]?.[k] || k;

    document.getElementById('app').innerHTML = Views.lessonView({ lesson, level, user, t, lang, curriculum, levelIdx, lessonIdx });
    attachLessonViewEvents(lesson, levelIdx, lessonIdx);
  }

  function attachLessonViewEvents(lesson, levelIdx, lessonIdx) {
    const user = Store.getCurrentUser();
    const curriculum = SB.curriculum[user.branch];

    // Mark lesson as read
    if (lesson.type === 'lesson' && !user.completedLessons.includes(lesson.id)) {
      const btn = document.getElementById('mark-done-btn');
      if (btn) {
        btn.addEventListener('click', async () => {
          const oldLevel = user.level;
          const updUser = await Store.completeLesson(lesson.id, lesson.xp);
          checkNewBadges(user.badges, updUser.badges);
          toast(`+${lesson.xp} XP earned! 🎉`, 'success');
          if (updUser.level > oldLevel) {
            setTimeout(() => toast(`🎊 Level Up! You reached Level ${updUser.level}!`, 'success'), 800);
          }
          btn.textContent = '✅ Completed!';
          btn.disabled = true;
          btn.classList.add('btn-done');
          // Auto-advance
          setTimeout(() => advanceLesson(levelIdx, lessonIdx), 1200);
        });
      }
    }

    // Navigation
    document.getElementById('next-lesson-btn')?.addEventListener('click', () => advanceLesson(levelIdx, lessonIdx));
    document.getElementById('prev-lesson-btn')?.addEventListener('click', () => {
      if (lessonIdx > 0) openLesson(curriculum.levels[levelIdx].lessons[lessonIdx-1].id, levelIdx, lessonIdx-1);
      else if (levelIdx > 0) {
        const prevLevel = curriculum.levels[levelIdx-1];
        openLesson(prevLevel.lessons[prevLevel.lessons.length-1].id, levelIdx-1, prevLevel.lessons.length-1);
      } else navigate('learn');
    });

    document.getElementById('back-to-course-btn')?.addEventListener('click', () => navigate('learn'));
    attachQuizEvents();
    attachProjectEvents();
    attachCodeEditorEvents();
  }

  function advanceLesson(levelIdx, lessonIdx) {
    const user = Store.getCurrentUser();
    const curriculum = SB.curriculum[user.branch];
    const level = curriculum.levels[levelIdx];
    if (lessonIdx + 1 < level.lessons.length) {
      openLesson(level.lessons[lessonIdx+1].id, levelIdx, lessonIdx+1);
    } else if (levelIdx + 1 < curriculum.levels.length) {
      openLesson(curriculum.levels[levelIdx+1].lessons[0].id, levelIdx+1, 0);
    } else {
      toast('🎉 Congratulations! You completed the entire curriculum!', 'success');
      navigate('progress');
    }
  }

  function attachQuizEvents() {
    const form = document.getElementById('quiz-form');
    if (!form) return;
    document.getElementById('quiz-submit-btn')?.addEventListener('click', async () => {
      const form = document.getElementById('quiz-form');
      if (!form) return;
      const lesson = currentLesson?.lesson;
      if (!lesson?.questions) return;

      let correct = 0;
      const results = lesson.questions.map((q, i) => {
        const selected = form.querySelector(`input[name="q${i}"]:checked`);
        const isCorrect = selected && parseInt(selected.value) === q.answer;
        if (isCorrect) correct++;
        return { isCorrect, selected: selected ? parseInt(selected.value) : -1 };
      });

      const score = Math.round((correct / lesson.questions.length) * 100);
      const passed = score >= 70;
      const lang = Store.getLang();
      const t = (k) => SB.i18n[lang]?.[k] || k;

      // Show result overlay
      document.getElementById('quiz-result-overlay').innerHTML = Views.quizResult({ score, passed, correct, total: lesson.questions.length, t });
      document.getElementById('quiz-result-overlay').style.display = 'flex';

      if (passed) {
        const user = Store.getCurrentUser();
        const updUser = await Store.completeQuiz(lesson.id, score, lesson.xp);
        checkNewBadges(user.badges, updUser.badges);
        toast(`Quiz passed! +${lesson.xp} XP 🎓`, 'success');
        document.getElementById('quiz-next-btn')?.addEventListener('click', () => {
          document.getElementById('quiz-result-overlay').style.display = 'none';
          advanceLesson(currentLesson.levelIdx, currentLesson.lessonIdx);
        });
      } else {
        document.getElementById('quiz-retry-btn')?.addEventListener('click', () => {
          document.getElementById('quiz-result-overlay').style.display = 'none';
          // Reset form
          form.querySelectorAll('input[type=radio]').forEach(r => r.checked = false);
        });
      }
    });
  }

  function attachProjectEvents() {
    document.getElementById('project-done-btn')?.addEventListener('click', async () => {
      const lesson = currentLesson?.lesson;
      if (!lesson) return;
      const user = Store.getCurrentUser();
      const updUser = await Store.completeProject(lesson.id, lesson.xp);
      checkNewBadges(user.badges, updUser.badges);
      toast(`Project completed! +${lesson.xp} XP 🏗️`, 'success');
      document.getElementById('project-done-btn').textContent = '✅ Project Completed!';
      document.getElementById('project-done-btn').disabled = true;
    });
  }

  function attachCodeEditorEvents() {
    const runBtn = document.getElementById('run-code-btn');
    const resetBtn = document.getElementById('reset-code-btn');
    const editor = document.getElementById('code-editor');
    if (!runBtn || !editor) return;

    const originalCode = editor.value;
    runBtn.addEventListener('click', () => {
      const code = editor.value;
      const output = document.getElementById('code-output');
      try {
        const logs = [];
        const mockConsole = { log: (...args) => logs.push(args.map(String).join(' ')), error: (...args) => logs.push('❌ ' + args.join(' ')), warn: (...args) => logs.push('⚠️ ' + args.join(' ')) };
        const fn = new Function('console', code);
        fn(mockConsole);
        output.innerHTML = `<div class="output-success">${logs.length ? logs.map(l => `<div>${escHtml(l)}</div>`).join('') : '<em>No output</em>'}</div>`;
      } catch (err) {
        output.innerHTML = `<div class="output-error">❌ ${escHtml(err.message)}</div>`;
      }
    });

    resetBtn?.addEventListener('click', () => {
      editor.value = originalCode;
      document.getElementById('code-output').innerHTML = '';
    });
  }

  function attachInterviewEvents() {
    document.querySelectorAll('.interview-q').forEach(q => {
      q.addEventListener('click', () => {
        const answer = q.nextElementSibling;
        const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
        document.querySelectorAll('.interview-answer').forEach(a => { a.style.maxHeight = '0px'; });
        document.querySelectorAll('.interview-q').forEach(qq => qq.classList.remove('open'));
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          q.classList.add('open');
        }
      });
    });

    document.querySelectorAll('.term-card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('flipped'));
    });
  }

  function attachReadmeEvents() {
    document.getElementById('gen-readme-btn')?.addEventListener('click', generateReadme);
    document.getElementById('copy-readme-btn')?.addEventListener('click', () => {
      const text = document.getElementById('readme-output')?.textContent;
      if (text) {
        navigator.clipboard.writeText(text).then(() => toast('README copied to clipboard! 📋', 'success'));
      }
    });
  }

  function generateReadme() {
    const name = document.getElementById('r-proj-name')?.value || 'My Project';
    const desc = document.getElementById('r-proj-desc')?.value || 'A cool project';
    const features = document.getElementById('r-features')?.value || '';
    const install = document.getElementById('r-install')?.value || 'npm install';
    const usage = document.getElementById('r-usage')?.value || 'npm start';
    const license = document.getElementById('r-license')?.value || 'MIT';
    const featureList = features.split('\n').filter(Boolean).map(f => `- ${f}`).join('\n');
    const readme = `# ${name}

> ${desc}

## ✨ Features

${featureList || '- Feature 1\n- Feature 2'}

## 🚀 Installation

\`\`\`bash
${install}
\`\`\`

## 📖 Usage

\`\`\`bash
${usage}
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch: \`git checkout -b feat/amazing-feature\`
3. Commit your changes: \`git commit -m 'feat: add amazing feature'\`
4. Push to the branch: \`git push origin feat/amazing-feature\`
5. Open a Pull Request

## 📄 License

This project is licensed under the **${license} License**.

---
*Built with ❤️ using [SillBridge](https://sillbridge.dev)*`;

    const out = document.getElementById('readme-output');
    if (out) {
      out.textContent = readme;
      out.style.display = 'block';
      document.getElementById('copy-readme-btn').style.display = 'inline-flex';
    }
  }

  function attachGameEvents() {
    document.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => {
        const game = card.dataset.game;
        if (game === 'wordmatch') Games.startWordMatch();
        if (game === 'codebreaker') Games.startCodeBreaker();
        if (game === 'termhunt') Games.startTermHunt();
      });
    });
  }

  function attachProgressEvents() {}

  function attachProfileEvents() {
    document.getElementById('profile-save-btn')?.addEventListener('click', () => {
      const name = document.getElementById('p-name')?.value?.trim();
      if (name) {
        Store.updateUser({ name });
        toast('Profile updated! ✅', 'success');
        renderNav();
      }
    });

    document.getElementById('dark-toggle-check')?.addEventListener('change', (e) => {
      Store.setDark(e.target.checked);
      applyTheme();
      renderNav();
    });

    document.getElementById('lang-select')?.addEventListener('change', (e) => {
      Store.setLang(e.target.value);
      renderApp();
    });

    document.getElementById('logout-btn')?.addEventListener('click', () => {
      Store.logout();
      toast('Logged out. See you soon! 👋', 'success');
      navigate('landing');
    });
  }

  // ── UTILITIES ──
  function checkNewBadges(oldBadges, newBadges) {
    if (!newBadges) return;
    const newOnes = newBadges.filter(b => !oldBadges.includes(b));
    newOnes.forEach(badgeId => {
      const badge = SB.badges.find(b => b.id === badgeId);
      if (badge) {
        setTimeout(() => toast(`${badge.icon} New Badge: ${badge.name}!`, 'badge'), 500);
      }
    });
  }

  function showFormError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  function toast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span>${msg}</span>`;
    container.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 3500);
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function toggleDark() {
    const v = !Store.getDark();
    Store.setDark(v);
    applyTheme();
    renderNav();
  }

  return { init, navigate, toast, toggleDark };
})();

document.addEventListener('DOMContentLoaded', App.init);
