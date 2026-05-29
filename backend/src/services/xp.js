// ═══════════════════════════════════════════════
//  SILLBRIDGE — SERVER-SIDE XP TABLE
//  Single source of truth for XP rewards.
//  Frontend cannot inflate XP — the server uses
//  these constants and ignores client-sent XP.
// ═══════════════════════════════════════════════

// Map of lessonId / quizId / projectId → XP reward.
// If an ID is not in the table, a small default reward is used.
const LESSON_XP = {
  // ── Frontend ──
  'html-1': 20, 'html-2': 20, 'html-quiz': 50,
  'css-1': 25, 'css-2': 30, 'css-quiz': 60,
  'js-1': 30, 'js-2': 35, 'js-3': 30, 'js-quiz': 80,
  'react-1': 35, 'react-2': 40, 'react-project': 100, 'react-quiz': 80,
  'vue-1': 30, 'vue-quiz': 60,
  'git-1': 30, 'git-quiz': 50,
  'api-1': 40, 'api-quiz': 80,
  'build-1': 35, 'deploy-1': 35, 'build-quiz': 80,
  'ts-1': 40, 'test-quiz': 80,
  'senior-1': 50, 'senior-project': 200,

  // ── Backend ──
  'be-1': 25, 'be-2': 30, 'be-quiz': 60,
  'node-1': 30, 'node-2': 35, 'node-quiz': 70,
  'db-1': 35, 'db-2': 35, 'db-quiz': 70,
  'api-be-1': 40, 'api-be-2': 40, 'api-be-quiz': 80,
  'auth-1': 40, 'auth-quiz': 70,
  'be-project': 150, 'be-senior': 200,

  // ── ML ──
  'ml-1': 25, 'ml-2': 30, 'ml-quiz': 60,
  'stats-1': 30, 'stats-quiz': 70,
  'pandas-1': 35, 'pandas-quiz': 70,
  'sklearn-1': 40, 'sklearn-quiz': 80,
  'dl-1': 40, 'dl-quiz': 80,
  'ml-project': 150, 'ml-senior': 200,

  // ── DevOps ──
  'linux-1': 25, 'linux-quiz': 60,
  'docker-1': 35, 'docker-2': 35, 'docker-quiz': 80,
  'cicd-1': 35, 'cicd-quiz': 70,
  'k8s-1': 40, 'k8s-quiz': 80,
  'cloud-1': 40, 'cloud-quiz': 80,
  'devops-project': 150, 'devops-senior': 200,
};

// Bonus for perfect quiz score
const PERFECT_QUIZ_BONUS = 25;

// XP thresholds matching the frontend curriculum (10 levels)
const XP_THRESHOLDS = [0, 150, 350, 600, 900, 1150, 1350, 1650, 1950, 2300];

function calcLevel(xp) {
  let level = 1;
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) { level = i + 1; break; }
  }
  return Math.min(level, 10);
}

function xpForLesson(lessonId) {
  return LESSON_XP[lessonId] ?? 20;
}

function xpForQuiz(quizId, score) {
  const base = LESSON_XP[quizId] ?? 50;
  // Only reward XP if quiz was passed (>= 70%); +bonus if perfect
  if (score < 70) return 0;
  return base + (score === 100 ? PERFECT_QUIZ_BONUS : 0);
}

function xpForProject(projectId) {
  return LESSON_XP[projectId] ?? 100;
}

module.exports = {
  LESSON_XP,
  XP_THRESHOLDS,
  calcLevel,
  xpForLesson,
  xpForQuiz,
  xpForProject,
};
