// ═══════════════════════════════════════════════
//  SILLBRIDGE — STORE  (API-backed)
//  Replaces the old localStorage-only store.
//  All auth & progress calls go to the backend.
//  Preferences (lang, darkMode) stay in localStorage
//  so the UI can load them instantly without a round-trip.
// ═══════════════════════════════════════════════

const Store = (() => {

  // ── Config ───────────────────────────────────
  // Auto-detect the backend URL:
  //   1. Use window.SILLBRIDGE_API if explicitly set in config.js (production deploys).
  //   2. If opened from file://, fall back to http://localhost:3000/api (dev).
  //   3. Otherwise use same-origin /api (normal case: backend serves the frontend).
  function detectAPI() {
    if (typeof window !== 'undefined' && window.SILLBRIDGE_API) return window.SILLBRIDGE_API;
    if (typeof window !== 'undefined' && window.location.protocol === 'file:') return 'http://localhost:3000/api';
    return '/api';
  }
  const API = detectAPI();

  // ── In-memory cache ───────────────────────────
  let _currentUser = null;   // full user object after login
  let _token       = null;   // JWT

  // ── Bootstrap: restore token from localStorage ─
  (function bootstrap() {
    _token = localStorage.getItem('sb_token') || null;
    const cached = localStorage.getItem('sb_user');
    if (cached) {
      try { _currentUser = JSON.parse(cached); } catch { _currentUser = null; }
    }
  })();

  // ── HTTP helpers ──────────────────────────────
  async function apiFetch(path, opts = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (_token) headers['Authorization'] = `Bearer ${_token}`;

    let res;
    try {
      res = await fetch(API + path, {
        ...opts,
        headers: { ...headers, ...(opts.headers || {}) },
        body: opts.body ? JSON.stringify(opts.body) : undefined,
      });
    } catch (networkErr) {
      throw new Error('Cannot reach the server. Make sure the backend is running (node src/server.js) then open http://localhost:3000');
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  function persist(user, token) {
    _currentUser = user;
    _token       = token;
    localStorage.setItem('sb_token', token);
    localStorage.setItem('sb_user', JSON.stringify(user));
  }

  function clearSession() {
    _currentUser = null;
    _token       = null;
    localStorage.removeItem('sb_token');
    localStorage.removeItem('sb_user');
  }

  // ── AUTH ──────────────────────────────────────
  async function register(name, email, password) {
    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: { name, email, password },
      });
      persist(data.user, data.token);
      return { success: true, user: data.user };
    } catch (err) {
      return { error: err.message };
    }
  }

  async function login(email, password) {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      persist(data.user, data.token);
      return { success: true, user: data.user };
    } catch (err) {
      return { error: err.message };
    }
  }

  function logout() {
    clearSession();
  }

  function getCurrentUser() {
    return _currentUser;
  }

  // Re-fetch the latest user from the server and update cache
  async function refreshUser() {
    if (!_token) return null;
    try {
      const data = await apiFetch('/auth/me');
      _currentUser = data.user;
      localStorage.setItem('sb_user', JSON.stringify(_currentUser));
      return _currentUser;
    } catch {
      return _currentUser; // fall back to cached
    }
  }

  // Update local cache + patch profile on server
  async function updateUser(updates) {
    if (!_currentUser) return;
    Object.assign(_currentUser, updates);
    localStorage.setItem('sb_user', JSON.stringify(_currentUser));
    try {
      await apiFetch('/progress/profile', { method: 'PATCH', body: updates });
    } catch (err) {
      console.warn('Profile patch failed:', err.message);
    }
  }

  // ── PROGRESS ──────────────────────────────────
  // XP is computed server-side now. We do an optimistic UI update with
  // the client-side estimate, then reconcile against the server's reply.
  function applyServerXP(data) {
    if (!_currentUser) return;
    if (data.xp        !== undefined) _currentUser.xp       = data.xp;
    if (data.level     !== undefined) _currentUser.level    = data.level;
    if (data.daily_xp  !== undefined) _currentUser.dailyXP  = data.daily_xp;
    if (data.weekly_xp !== undefined) _currentUser.weeklyXP = data.weekly_xp;
    if (data.badges) _currentUser.badges = data.badges;
    localStorage.setItem('sb_user', JSON.stringify(_currentUser));
  }

  async function completeLesson(lessonId, xpEstimate = 0) {
    if (!_currentUser) return;
    if (!_currentUser.completedLessons.includes(lessonId)) {
      _currentUser.completedLessons.push(lessonId);
      _currentUser.xp       += xpEstimate;
      _currentUser.dailyXP   = (_currentUser.dailyXP  || 0) + xpEstimate;
      _currentUser.weeklyXP  = (_currentUser.weeklyXP || 0) + xpEstimate;
    }
    localStorage.setItem('sb_user', JSON.stringify(_currentUser));

    try {
      const data = await apiFetch('/progress/lesson', { method: 'POST', body: { lessonId } });
      applyServerXP(data);
    } catch (err) {
      console.warn('Lesson sync failed:', err.message);
    }
    return _currentUser;
  }

  async function completeQuiz(quizId, score, xpEstimate = 0) {
    if (!_currentUser) return;
    const existing = _currentUser.completedQuizzes.find(q => q.id === quizId);
    if (!existing) {
      _currentUser.completedQuizzes.push({ id: quizId, score, date: new Date().toISOString() });
      _currentUser.xp      += xpEstimate;
      _currentUser.dailyXP  = (_currentUser.dailyXP || 0) + xpEstimate;
    }
    localStorage.setItem('sb_user', JSON.stringify(_currentUser));

    try {
      const data = await apiFetch('/progress/quiz', { method: 'POST', body: { quizId, score } });
      applyServerXP(data);
    } catch (err) {
      console.warn('Quiz sync failed:', err.message);
    }
    return _currentUser;
  }

  async function completeProject(projectId, xpEstimate = 0) {
    if (!_currentUser) return;
    if (!_currentUser.completedProjects.includes(projectId)) {
      _currentUser.completedProjects.push(projectId);
      _currentUser.xp += xpEstimate;
    }
    localStorage.setItem('sb_user', JSON.stringify(_currentUser));

    try {
      const data = await apiFetch('/progress/project', { method: 'POST', body: { projectId } });
      applyServerXP(data);
    } catch (err) {
      console.warn('Project sync failed:', err.message);
    }
    return _currentUser;
  }

  async function awardBadge(user, badgeId) {
    if (!user.badges.includes(badgeId)) {
      user.badges.push(badgeId);
      localStorage.setItem('sb_user', JSON.stringify(_currentUser));
      try {
        await apiFetch('/progress/badge', { method: 'POST', body: { badgeId } });
      } catch (err) {
        console.warn('Badge sync failed:', err.message);
      }
      return true;
    }
    return false;
  }

  // ── LEADERBOARD ───────────────────────────────
  async function getLeaderboard() {
    try {
      const data = await apiFetch('/progress/leaderboard');
      return data.leaderboard;
    } catch {
      if (_currentUser) {
        return [{ name: _currentUser.name, xp: _currentUser.xp, level: _currentUser.level, branch: _currentUser.branch, badges: _currentUser.badges?.length || 0 }];
      }
      return [];
    }
  }

  async function getFriendsLeaderboard() {
    try {
      const data = await apiFetch('/progress/leaderboard/friends');
      return data.leaderboard;
    } catch {
      return [];
    }
  }

  // ── ACTIVITY HISTORY (GitHub-style graph) ─────
  async function getActivity(days = 365) {
    try {
      const data = await apiFetch(`/progress/activity?days=${days}`);
      return data.activity || [];
    } catch {
      return [];
    }
  }

  // ── FRIENDS / STUDY GROUPS ────────────────────
  async function getFriends() {
    try { return await apiFetch('/progress/friends'); }
    catch { return { friends: [], incoming: [], outgoing: [] }; }
  }

  async function addFriend(email) {
    try {
      await apiFetch('/progress/friends', { method: 'POST', body: { email } });
      return { success: true };
    } catch (err) { return { error: err.message }; }
  }

  async function acceptFriend(friendshipId) {
    try {
      await apiFetch(`/progress/friends/${friendshipId}`, { method: 'PATCH' });
      return { success: true };
    } catch (err) { return { error: err.message }; }
  }

  async function removeFriend(friendshipId) {
    try {
      await apiFetch(`/progress/friends/${friendshipId}`, { method: 'DELETE' });
      return { success: true };
    } catch (err) { return { error: err.message }; }
  }

  // ── PASSWORD RESET ────────────────────────────
  async function forgotPassword(email) {
    try {
      await apiFetch('/auth/forgot-password', { method: 'POST', body: { email } });
      return { success: true };
    } catch (err) { return { error: err.message }; }
  }

  async function resetPassword(token, password) {
    try {
      await apiFetch('/auth/reset-password', { method: 'POST', body: { token, password } });
      return { success: true };
    } catch (err) { return { error: err.message }; }
  }

  // ── PREFERENCES (local-only — instant UI) ─────
  function getLang()    { return localStorage.getItem('sb_lang') || (_currentUser?.lang) || 'en'; }
  function setLang(l)   {
    localStorage.setItem('sb_lang', l);
    if (_currentUser) { _currentUser.lang = l; updateUser({ lang: l }); }
  }
  function getDark()    { return localStorage.getItem('sb_dark') === 'true' || (_currentUser?.darkMode) || false; }
  function setDark(v)   {
    localStorage.setItem('sb_dark', String(v));
    if (_currentUser) { _currentUser.darkMode = v; updateUser({ darkMode: v }); }
  }

  // ── Public API ────────────────────────────────
  return {
    register, login, logout,
    getCurrentUser, refreshUser, updateUser,
    completeLesson, completeQuiz, completeProject, awardBadge,
    getLeaderboard, getFriendsLeaderboard,
    getActivity,
    getFriends, addFriend, acceptFriend, removeFriend,
    forgotPassword, resetPassword,
    getLang, setLang, getDark, setDark,
  };

})();
