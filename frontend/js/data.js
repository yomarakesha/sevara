// ═══════════════════════════════════════════════
//  SILLBRIDGE — CORE DATA
// ═══════════════════════════════════════════════

const SB = {};

// ── i18n ──────────────────────────────────────
SB.i18n = {
  en: {
    appName: "SillBridge",
    tagline: "From zero to senior — your IT career starts here",
    login: "Log In", register: "Register", logout: "Logout",
    dashboard: "Dashboard", branches: "IT Branches", progress: "My Progress",
    interview: "Interview Prep", readme: "README Helper", leaderboard: "Leaderboard",
    chooseLanguage: "Choose Language", continueLesson: "Continue Lesson",
    startLearning: "Start Learning", nextLesson: "Next Lesson", prevLesson: "Prev Lesson",
    runCode: "Run Code", submitAnswer: "Submit", checkAnswer: "Check Answer",
    correct: "Correct! 🎉", wrong: "Wrong, try again!", level: "Level",
    xp: "XP", streak: "Streak", badge: "Badge", complete: "Complete",
    quiz: "Quiz", project: "Project", lesson: "Lesson", locked: "Locked",
    unlock: "Unlock with XP", wellDone: "Well done!", keep: "Keep going!",
    selectBranch: "Select your IT branch", days: "days", points: "points",
    beginnerToSenior: "Beginner → Senior", profile: "Profile",
    settings: "Settings", darkMode: "Dark Mode", save: "Save",
    name: "Name", email: "Email", password: "Password", confirmPassword: "Confirm Password",
    forgotPassword: "Forgot password?", alreadyHave: "Already have an account?",
    dontHave: "Don't have an account?", signIn: "Sign In", signUp: "Sign Up",
    myBranch: "My Branch", changeBranch: "Change Branch",
    projectDesc: "Build this project to earn XP and level up",
    hint: "Hint", showHint: "Show Hint", levelUp: "Level Up!", newBadge: "New Badge!",
    interviewTips: "Interview Tips", technicalTerms: "Technical Terms",
    practiceInterview: "Practice Interview", copyReadme: "Copy README",
    generateReadme: "Generate README", projectName: "Project Name",
    description: "Description", features: "Features", installation: "Installation",
    usage: "Usage", contributing: "Contributing", license: "License",
    totalXP: "Total XP", currentLevel: "Current Level", completedLessons: "Completed Lessons",
    achievements: "Achievements", dailyGoal: "Daily Goal", weeklyGoal: "Weekly Goal",
    close: "Close", start: "Start", finish: "Finish", skip: "Skip", back: "Back", next: "Next",
    home: "Home", search: "Search", notifications: "Notifications",
    welcomeBack: "Welcome back", goodMorning: "Good morning", goodAfternoon: "Good afternoon", goodEvening: "Good evening",
    continueWhere: "Continue where you left off", browseAll: "Browse All Branches",
    trendingTopics: "Trending Topics", featuredPath: "Featured Path",
    quizTime: "Quiz Time!", projectTime: "Project Time!",
    readyForQuiz: "Ready for the quiz?", readyForProject: "Ready to build?",
    score: "Score", passed: "Passed!", failed: "Failed — try again",
    minPassScore: "Minimum passing score: 70%",
    codeEditor: "Code Editor", output: "Output", reset: "Reset",
    congratulations: "Congratulations!", youReached: "You reached",
    fullStack: "Full Stack Developer", senior: "Senior Level",
    roadmap: "Roadmap", allLevels: "All Levels", yourPath: "Your Path",
    playGame: "Play Game", minigame: "Mini Game", wordMatch: "Word Match",
    codeBreaker: "Code Breaker", termHunt: "Term Hunt",
  },
  ru: {
    appName: "SillBridge",
    tagline: "От нуля до сеньора — ваша IT-карьера начинается здесь",
    login: "Войти", register: "Регистрация", logout: "Выйти",
    dashboard: "Панель", branches: "IT Ветки", progress: "Мой прогресс",
    interview: "Подготовка к интервью", readme: "README Помощник", leaderboard: "Рейтинг",
    chooseLanguage: "Выберите язык", continueLesson: "Продолжить урок",
    startLearning: "Начать обучение", nextLesson: "Следующий урок", prevLesson: "Предыдущий",
    runCode: "Запустить", submitAnswer: "Ответить", checkAnswer: "Проверить",
    correct: "Правильно! 🎉", wrong: "Неверно, попробуйте снова!", level: "Уровень",
    xp: "XP", streak: "Серия", badge: "Значок", complete: "Завершено",
    quiz: "Тест", project: "Проект", lesson: "Урок", locked: "Заблокировано",
    unlock: "Разблокировать за XP", wellDone: "Отлично!", keep: "Продолжайте!",
    selectBranch: "Выберите IT направление", days: "дней", points: "очков",
    beginnerToSenior: "Начинающий → Сеньор", profile: "Профиль",
    settings: "Настройки", darkMode: "Тёмный режим", save: "Сохранить",
    name: "Имя", email: "Email", password: "Пароль", confirmPassword: "Подтвердите пароль",
    forgotPassword: "Забыли пароль?", alreadyHave: "Уже есть аккаунт?",
    dontHave: "Нет аккаунта?", signIn: "Войти", signUp: "Зарегистрироваться",
    myBranch: "Моя ветка", changeBranch: "Сменить ветку",
    projectDesc: "Создайте этот проект, чтобы получить XP и повысить уровень",
    hint: "Подсказка", showHint: "Показать подсказку", levelUp: "Уровень повышен!",
    interviewTips: "Советы для интервью", technicalTerms: "Технические термины",
    practiceInterview: "Практика интервью", copyReadme: "Копировать README",
    generateReadme: "Создать README", projectName: "Название проекта",
    description: "Описание", features: "Функции", installation: "Установка",
    usage: "Использование", contributing: "Участие", license: "Лицензия",
    totalXP: "Всего XP", currentLevel: "Текущий уровень", completedLessons: "Пройденные уроки",
    achievements: "Достижения", dailyGoal: "Дневная цель", weeklyGoal: "Недельная цель",
    close: "Закрыть", start: "Начать", finish: "Завершить", skip: "Пропустить", back: "Назад", next: "Далее",
    home: "Главная", search: "Поиск", notifications: "Уведомления",
    welcomeBack: "С возвращением", goodMorning: "Доброе утро", goodAfternoon: "Добрый день", goodEvening: "Добрый вечер",
    continueWhere: "Продолжите с того места", browseAll: "Все направления",
    trendingTopics: "Популярные темы", featuredPath: "Рекомендуемый путь",
    quizTime: "Время теста!", projectTime: "Время проекта!",
    readyForQuiz: "Готовы к тесту?", readyForProject: "Готовы создать?",
    score: "Результат", passed: "Пройдено!", failed: "Провалено — попробуйте снова",
    minPassScore: "Минимальный проходной балл: 70%",
    codeEditor: "Редактор кода", output: "Вывод", reset: "Сбросить",
    congratulations: "Поздравляем!", youReached: "Вы достигли",
    fullStack: "Full Stack разработчик", senior: "Уровень сеньора",
    roadmap: "Дорожная карта", allLevels: "Все уровни", yourPath: "Ваш путь",
    playGame: "Играть", minigame: "Мини-игра", wordMatch: "Сопоставление слов",
    codeBreaker: "Взломщик кода", termHunt: "Охота за терминами",
    newBadge: "Новый значок!",
  },
  tk: {
    appName: "SillBridge",
    tagline: "Noldan seniora — IT karýeraňyz şu ýerden başlanýar",
    login: "Giriş", register: "Hasap açmak", logout: "Çykmak",
    dashboard: "Dolandyryş", branches: "IT Ugurlary", progress: "Meniň ösüşim",
    interview: "Interwýu taýýarlygy", readme: "README Kömekçi", leaderboard: "Liderler",
    chooseLanguage: "Dil saýlaň", continueLesson: "Sapaga dowam et",
    startLearning: "Öwrenmäge başla", nextLesson: "Indiki sapak", prevLesson: "Öňki sapak",
    runCode: "Işlet", submitAnswer: "Jogap ber", checkAnswer: "Barla",
    correct: "Dogry! 🎉", wrong: "Ýalňyş, täzeden synanyşyň!", level: "Dereçe",
    xp: "XP", streak: "Yzygiderlilik", badge: "Nyşan", complete: "Tamamlandy",
    quiz: "Test", project: "Taslama", lesson: "Sapak", locked: "Gulply",
    unlock: "XP bilen açmak", wellDone: "Gowy!", keep: "Dowam et!",
    selectBranch: "IT ugrunuzy saýlaň", days: "gün", points: "bal",
    beginnerToSenior: "Başlangyç → Senior", profile: "Profil",
    settings: "Sazlamalar", darkMode: "Garaňky tema", save: "Ýatda sakla",
    name: "At", email: "Email", password: "Açar söz", confirmPassword: "Açar sözi tassykla",
    forgotPassword: "Açar sözi unuttuňyzmy?", alreadyHave: "Hasabyňyz barmy?",
    dontHave: "Hasabyňyz ýokmy?", signIn: "Giriş", signUp: "Hasap açmak",
    myBranch: "Meniň ugrum", changeBranch: "Ugry çalyşmak",
    projectDesc: "XP gazanmak we dereçäňi ýokarlandyrmak üçin bu taslamany dör",
    hint: "Maslahat", showHint: "Maslahaty görkez", levelUp: "Dereçe ýokarlandy!",
    interviewTips: "Interwýu maslahatlary", technicalTerms: "Tehniki terminler",
    practiceInterview: "Interwýu türgenleşigi", copyReadme: "README göçür",
    generateReadme: "README dör", projectName: "Taslamanyň ady",
    description: "Düşündiriş", features: "Aýratynlyklar", installation: "Gurnamak",
    usage: "Ulanmak", contributing: "Goşant", license: "Ygtyýarnama",
    totalXP: "Jemi XP", currentLevel: "Häzirki dereçe", completedLessons: "Tamamlanan sapaklar",
    achievements: "Üstünlikler", dailyGoal: "Günlik maksat", weeklyGoal: "Hepdelik maksat",
    close: "Ýap", start: "Başla", finish: "Tamam", skip: "Geç", back: "Yza", next: "Öňe",
    home: "Baş sahypa", search: "Gözle", notifications: "Habarlar",
    welcomeBack: "Hoş geldiňiz", goodMorning: "Ertiriňiz haýyrly bolsun", goodAfternoon: "Günüňiz haýyrly bolsun", goodEvening: "Agşamyňyz haýyrly bolsun",
    continueWhere: "Galan ýeriňizden dowam ediň", browseAll: "Ähli ugurlary gör",
    trendingTopics: "Meşhur mowzuklar", featuredPath: "Maslahat berilýän ýol",
    quizTime: "Test wagty!", projectTime: "Taslama wagty!",
    readyForQuiz: "Teste taýynmy?", readyForProject: "Döretmäge taýynmy?",
    score: "Netije", passed: "Geçdi!", failed: "Geçmedi — täzeden synanyşyň",
    minPassScore: "Iň az geçiş baly: 70%",
    codeEditor: "Kod redaktory", output: "Çykyş", reset: "Täzele",
    congratulations: "Gutlaýarys!", youReached: "Siz ýetdiňiz",
    fullStack: "Full Stack Öndüriji", senior: "Senior dereçesi",
    roadmap: "Ýol kartasy", allLevels: "Ähli dereçeler", yourPath: "Siziň ýoluňyz",
    playGame: "Oýna", minigame: "Mini oýun", wordMatch: "Söz gabatlaşdyrma",
    codeBreaker: "Kod döwüji", termHunt: "Termin awçysy",
    newBadge: "Täze nyşan!",
  }
};

// ── IT BRANCHES ───────────────────────────────
SB.branches = [
  { id: 'frontend', icon: '🎨', color: '#3B82F6', label: 'Frontend Dev', desc: 'HTML → CSS → JS → React → Vue.js → Deploy' },
  { id: 'backend', icon: '⚙️', color: '#10B981', label: 'Backend Dev', desc: 'Python/Node → APIs → Databases → Auth → Deploy' },
  { id: 'fullstack', icon: '🌐', color: '#8B5CF6', label: 'Full Stack', desc: 'Both worlds — Frontend + Backend + DevOps' },
  { id: 'ml', icon: '🤖', color: '#F59E0B', label: 'Machine Learning', desc: 'Python → Stats → ML → Deep Learning → Deploy' },
  { id: 'devops', icon: '🔧', color: '#EF4444', label: 'DevOps / Cloud', desc: 'Linux → Docker → CI/CD → Kubernetes → AWS/GCP' },
  { id: 'mobile', icon: '📱', color: '#06B6D4', label: 'Mobile Dev', desc: 'React Native → Flutter → App Store → Deploy' },
  { id: 'security', icon: '🔒', color: '#DC2626', label: 'Cybersecurity', desc: 'Networks → Ethical Hacking → Pen Testing → SOC' },
  { id: 'data', icon: '📊', color: '#7C3AED', label: 'Data Science', desc: 'SQL → Python → Pandas → Visualization → Reports' },
];

// ── CURRICULUM ────────────────────────────────
SB.curriculum = {
  frontend: {
    levels: [
      {
        level: 1, title: 'HTML Basics', xpRequired: 0, xpReward: 150,
        lessons: [
          {
            id: 'html-1', title: 'What is HTML?', type: 'lesson', xp: 20,
            content: `<h2>What is HTML?</h2>
<p><strong>HTML</strong> (HyperText Markup Language) is the skeleton of every web page. It structures content using <em>elements</em> wrapped in <strong>tags</strong>.</p>
<div class="code-block"><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is a paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre></div>
<div class="key-points"><h4>🔑 Key Points</h4><ul>
<li>HTML uses <strong>tags</strong> like <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;div&gt;</code></li>
<li>Every page starts with <code>&lt;!DOCTYPE html&gt;</code></li>
<li><code>&lt;head&gt;</code> = metadata, <code>&lt;body&gt;</code> = visible content</li>
<li>Tags have opening <code>&lt;tag&gt;</code> and closing <code>&lt;/tag&gt;</code></li>
</ul></div>
<div class="term-box"><strong>📖 Tech Term:</strong> <em>Semantic HTML</em> — using tags that describe their meaning, e.g. <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;article&gt;</code> instead of generic <code>&lt;div&gt;</code>. Important for SEO and accessibility.</div>`,
            tryCode: { starter: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <!-- Write your heading here -->\n  \n</body>\n</html>', task: 'Add an <h1> tag with your name and a <p> tag with your dream job.' }
          },
          {
            id: 'html-2', title: 'HTML Elements & Attributes', type: 'lesson', xp: 20,
            content: `<h2>HTML Elements & Attributes</h2>
<p>Attributes provide extra information about elements. They are written inside the opening tag.</p>
<div class="code-block"><pre><code>&lt;a href="https://google.com" target="_blank"&gt;Visit Google&lt;/a&gt;
&lt;img src="photo.jpg" alt="A photo" width="300"&gt;
&lt;input type="text" placeholder="Enter name" required&gt;
&lt;div class="container" id="main"&gt;Content&lt;/div&gt;</code></pre></div>
<div class="key-points"><h4>🔑 Key Attributes</h4><ul>
<li><code>href</code> — URL for links</li>
<li><code>src</code> — source for images/scripts</li>
<li><code>class</code> — CSS styling hook</li>
<li><code>id</code> — unique identifier</li>
<li><code>alt</code> — image description (accessibility!)</li>
</ul></div>
<div class="term-box"><strong>📖 Tech Term:</strong> <em>DOM</em> (Document Object Model) — the tree structure of your HTML that the browser creates. JavaScript uses the DOM to manipulate web pages dynamically.</div>`,
            tryCode: { starter: '<a href="">Click me</a>\n<img src="" alt="">\n<input type="text">', task: 'Fix the <a> tag to link to "https://github.com", add a real alt text to the img, and add a placeholder to the input.' }
          },
          {
            id: 'html-quiz', title: 'HTML Quiz', type: 'quiz', xp: 50,
            questions: [
              { q: 'What does HTML stand for?', options: ['HyperText Markup Language','HighText Machine Language','HyperTransfer Markup Language','HyperText Modern Language'], answer: 0 },
              { q: 'Which tag creates the largest heading?', options: ['<h6>','<h1>','<heading>','<head>'], answer: 1 },
              { q: 'Which attribute specifies the URL for a link?', options: ['src','link','href','url'], answer: 2 },
              { q: 'What is the correct HTML for a paragraph?', options: ['<p>text</p>','<para>text</para>','<pg>text</pg>','<paragraph>text</paragraph>'], answer: 0 },
              { q: 'Which element is used for the largest section of a web page?', options: ['<div>','<section>','<body>','<main>'], answer: 2 },
            ]
          }
        ]
      },
      {
        level: 2, title: 'CSS Styling', xpRequired: 150, xpReward: 200,
        lessons: [
          {
            id: 'css-1', title: 'CSS Fundamentals', type: 'lesson', xp: 25,
            content: `<h2>CSS Fundamentals</h2>
<p><strong>CSS</strong> (Cascading Style Sheets) controls the visual appearance of your HTML. The three ways to apply CSS:</p>
<div class="code-block"><pre><code>/* 1. External (best practice) */
&lt;link rel="stylesheet" href="style.css"&gt;

/* 2. Internal */
&lt;style&gt;
  body { background: #f0f0f0; }
&lt;/style&gt;

/* 3. Inline (avoid!) */
&lt;p style="color: red;"&gt;Text&lt;/p&gt;</code></pre></div>
<div class="code-block"><pre><code>/* CSS Rule Structure */
selector {
  property: value;
  property: value;
}

h1 { color: #3B82F6; font-size: 2rem; }
.card { background: white; border-radius: 8px; padding: 16px; }
#header { position: fixed; top: 0; width: 100%; }</code></pre></div>
<div class="key-points"><h4>🔑 Selector Types</h4><ul>
<li><code>h1</code> — element selector</li>
<li><code>.class</code> — class selector (reusable)</li>
<li><code>#id</code> — ID selector (unique)</li>
<li><code>h1, h2</code> — multiple selectors</li>
<li><code>.parent .child</code> — descendant selector</li>
</ul></div>`,
            tryCode: { starter: '<style>\n  /* Style the paragraph */\n  p {\n    \n  }\n</style>\n<p>Style me!</p>', task: 'Make the paragraph have blue color, font-size 20px, and a background of #f0f8ff.' }
          },
          {
            id: 'css-2', title: 'Flexbox & Grid', type: 'lesson', xp: 30,
            content: `<h2>Flexbox & Grid</h2>
<p>Modern CSS layout systems that replaced floats and make responsive design easy.</p>
<div class="code-block"><pre><code>/* FLEXBOX — 1D layout */
.container {
  display: flex;
  justify-content: space-between; /* horizontal */
  align-items: center;            /* vertical */
  gap: 16px;
  flex-wrap: wrap;
}

/* GRID — 2D layout */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Responsive grid */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}</code></pre></div>
<div class="term-box"><strong>📖 Tech Term:</strong> <em>Responsive Design</em> — building websites that adapt to any screen size. Use CSS media queries: <code>@media (max-width: 768px) { ... }</code></div>`,
            tryCode: { starter: '<style>\n.box { background: #3B82F6; color: white; padding: 20px; }\n.container {\n  /* Add flexbox here */\n}\n</style>\n<div class="container">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n</div>', task: 'Make the container use flexbox, center items, and add gap of 10px.' }
          },
          {
            id: 'css-quiz', title: 'CSS Quiz', type: 'quiz', xp: 60,
            questions: [
              { q: 'Which property changes text color in CSS?', options: ['text-color','font-color','color','foreground'], answer: 2 },
              { q: 'How do you select an element with class="box"?', options: ['#box','.box','box','*box'], answer: 1 },
              { q: 'Which display value enables Flexbox?', options: ['flex-box','inline-flex-start','display: flex','flex'], answer: 2 },
              { q: 'What does "cascading" mean in CSS?', options: ['Styles fall down a waterfall','Rules are applied in order, with specificity','CSS files cascade into HTML','None of the above'], answer: 1 },
              { q: 'Which unit is relative to the root font size?', options: ['px','em','rem','vw'], answer: 2 },
            ]
          }
        ]
      },
      {
        level: 3, title: 'JavaScript Core', xpRequired: 350, xpReward: 250,
        lessons: [
          {
            id: 'js-1', title: 'JS Variables & Functions', type: 'lesson', xp: 30,
            content: `<h2>JavaScript Variables & Functions</h2>
<p>JavaScript brings pages to life. Always use <code>const</code> or <code>let</code>, never <code>var</code>.</p>
<div class="code-block"><pre><code>// Variables
const name = "Merdan";      // can't reassign
let age = 25;               // can reassign
// var score = 0;           // ❌ avoid!

// Functions
function greet(person) {
  return \`Hello, \${person}!\`;
}

// Arrow functions (modern)
const add = (a, b) => a + b;
const double = n => n * 2;

// Template literals
const message = \`My name is \${name} and I am \${age} years old.\`;

console.log(greet("World")); // Hello, World!
console.log(add(3, 4));      // 7</code></pre></div>
<div class="term-box"><strong>📖 Tech Term:</strong> <em>Scope</em> — where a variable is accessible. <code>const</code>/<code>let</code> are block-scoped. <em>Hoisting</em> — JS moves declarations to the top of their scope before execution.</div>`,
            tryCode: { starter: '// Create a function called multiply\n// that takes two numbers and returns their product\n\n\nconsole.log(multiply(4, 5)); // should print 20', task: 'Write the multiply function using arrow syntax.' }
          },
          {
            id: 'js-2', title: 'DOM Manipulation', type: 'lesson', xp: 35,
            content: `<h2>DOM Manipulation</h2>
<p>The DOM API lets JavaScript interact with HTML elements on the page.</p>
<div class="code-block"><pre><code>// Selecting elements
const btn = document.getElementById('myBtn');
const items = document.querySelectorAll('.item');
const heading = document.querySelector('h1');

// Changing content
heading.textContent = 'New Title';
heading.innerHTML = '&lt;span&gt;Styled&lt;/span&gt; Title';

// Changing styles
btn.style.backgroundColor = '#3B82F6';
btn.classList.add('active');
btn.classList.toggle('hidden');

// Event listeners
btn.addEventListener('click', () => {
  alert('Button clicked!');
});

// Creating elements
const li = document.createElement('li');
li.textContent = 'New item';
document.querySelector('ul').appendChild(li);</code></pre></div>`,
            tryCode: { starter: '// Change the heading text when button is clicked\nconst btn = document.getElementById("btn");\nconst heading = document.getElementById("heading");\n\n// Add click event here\n\n', task: 'Add a click event to #btn that changes #heading text to "You clicked me!"' }
          },
          {
            id: 'js-3', title: 'Arrays & Objects', type: 'lesson', xp: 30,
            content: `<h2>Arrays & Objects</h2>
<div class="code-block"><pre><code>// Arrays
const fruits = ['apple', 'banana', 'mango'];
fruits.push('kiwi');        // add to end
fruits.pop();               // remove last
const len = fruits.length;  // 3

// Array methods (very important!)
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);      // [2,4,6,8,10]
const evens = nums.filter(n => n % 2 === 0); // [2,4]
const sum = nums.reduce((acc, n) => acc + n, 0); // 15

// Objects
const user = {
  name: 'Merdan',
  age: 25,
  skills: ['JavaScript', 'React'],
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
};
console.log(user.name);      // Merdan
console.log(user['age']);    // 25

// Destructuring
const { name, age } = user;
const [first, ...rest] = fruits;</code></pre></div>`,
            tryCode: { starter: 'const students = [\n  { name: "Ali", score: 85 },\n  { name: "Merdan", score: 92 },\n  { name: "Aynur", score: 78 }\n];\n\n// Filter students with score > 80\nconst topStudents = \n\nconsole.log(topStudents);', task: 'Use .filter() to get students with score > 80.' }
          },
          {
            id: 'js-quiz', title: 'JavaScript Quiz', type: 'quiz', xp: 80,
            questions: [
              { q: 'Which keyword declares a constant in JavaScript?', options: ['var','let','const','def'], answer: 2 },
              { q: 'What does === check?', options: ['Value only','Type only','Value AND type','Neither'], answer: 2 },
              { q: 'Which array method creates a new array with transformed elements?', options: ['filter','forEach','map','reduce'], answer: 2 },
              { q: 'What is a closure?', options: ['A function inside a class','A function that remembers its outer scope','A loop that closes','An arrow function'], answer: 1 },
              { q: 'What does JSON.parse() do?', options: ['Converts object to string','Converts JSON string to JS object','Parses HTML','None'], answer: 1 },
              { q: 'Which method adds an element to the END of an array?', options: ['push()','pop()','shift()','unshift()'], answer: 0 },
            ]
          }
        ]
      },
      {
        level: 4, title: 'React Fundamentals', xpRequired: 600, xpReward: 300,
        lessons: [
          {
            id: 'react-1', title: 'What is React?', type: 'lesson', xp: 35,
            content: `<h2>What is React?</h2>
<p>React is a JavaScript library by Meta for building user interfaces with <strong>components</strong>.</p>
<div class="code-block"><pre><code>// Function Component
function Button({ text, onClick, variant = 'primary' }) {
  return (
    &lt;button 
      className={\`btn btn-\${variant}\`} 
      onClick={onClick}
    &gt;
      {text}
    &lt;/button&gt;
  );
}

// useState Hook
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;Button text="+" onClick={() =&gt; setCount(count + 1)} /&gt;
      &lt;Button text="-" onClick={() =&gt; setCount(count - 1)} variant="danger" /&gt;
    &lt;/div&gt;
  );
}</code></pre></div>
<div class="term-box"><strong>📖 Tech Term:</strong> <em>Virtual DOM</em> — React keeps a virtual copy of the DOM in memory. When state changes, it compares (diffs) and only updates what changed in the real DOM — making it fast.</div>`,
            tryCode: { starter: '// Create a simple React component\nfunction Greeting({ name }) {\n  // Return JSX\n  \n}\n\n// Use it\n// <Greeting name="Merdan" />', task: 'Complete the Greeting component to return <h1>Hello, {name}!</h1>' }
          },
          {
            id: 'react-2', title: 'Hooks & State', type: 'lesson', xp: 40,
            content: `<h2>React Hooks</h2>
<div class="code-block"><pre><code>import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // useEffect runs after render
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // re-run when userId changes
  
  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;
  
  return (
    &lt;div className="profile"&gt;
      &lt;img src={user.avatar} alt={user.name} /&gt;
      &lt;h2&gt;{user.name}&lt;/h2&gt;
      &lt;p&gt;{user.email}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre></div>`,
            tryCode: { starter: '// Toggle a message with useState\nfunction Toggle() {\n  const [show, setShow] = useState(false);\n  \n  return (\n    &lt;div&gt;\n      &lt;button onClick={() => setShow(!show)}&gt;Toggle&lt;/button&gt;\n      {/* Show message only when show is true */}\n    &lt;/div&gt;\n  );\n}', task: 'Show a <p>Hello!</p> only when show is true using conditional rendering.' }
          },
          {
            id: 'react-project', title: 'Project: Todo App', type: 'project', xp: 100,
            desc: 'Build a full CRUD Todo application with React',
            requirements: [
              'Add new todos with an input + button',
              'Mark todos as complete (toggle)',
              'Delete todos',
              'Filter: All / Active / Completed',
              'Show count of remaining todos',
            ],
            hints: ['Use useState for todos array', 'Each todo: { id, text, done }', 'Use Array.filter() for filtering', 'Use Array.map() to render list'],
            starterCode: `import { useState } from 'react';\n\nfunction TodoApp() {\n  const [todos, setTodos] = useState([]);\n  const [input, setInput] = useState('');\n  const [filter, setFilter] = useState('all');\n\n  const addTodo = () => {\n    // TODO: add new todo to array\n  };\n\n  return (\n    <div className="todo-app">\n      <h1>Todo App</h1>\n      {/* Build your UI here */}\n    </div>\n  );\n}\n\nexport default TodoApp;`
          },
          {
            id: 'react-quiz', title: 'React Quiz', type: 'quiz', xp: 80,
            questions: [
              { q: 'What is JSX?', options: ['A database query language','JavaScript XML — JS syntax extension','A CSS framework','A testing library'], answer: 1 },
              { q: 'Which hook manages component state?', options: ['useEffect','useContext','useState','useRef'], answer: 2 },
              { q: 'When does useEffect run by default?', options: ['Only once on mount','Every render','Only on unmount','Never automatically'], answer: 1 },
              { q: 'What does the key prop do in lists?', options: ['Adds a keyboard shortcut','Helps React identify which items changed','Encrypts data','Locks the component'], answer: 1 },
              { q: 'What is "lifting state up"?', options: ['Putting state in a higher component','Deleting state','Using useReducer','React DevTools feature'], answer: 0 },
            ]
          }
        ]
      },
      {
        level: 5, title: 'Vue.js Basics', xpRequired: 900, xpReward: 250,
        lessons: [
          {
            id: 'vue-1', title: 'Vue.js Introduction', type: 'lesson', xp: 30,
            content: `<h2>Vue.js Introduction</h2>
<p>Vue.js is a progressive JavaScript framework. Easier to learn than React for beginners.</p>
<div class="code-block"><pre><code>&lt;!-- Single File Component (SFC) --&gt;
&lt;template&gt;
  &lt;div class="counter"&gt;
    &lt;h2&gt;Count: {{ count }}&lt;/h2&gt;
    &lt;button @click="increment"&gt;+&lt;/button&gt;
    &lt;button @click="decrement"&gt;-&lt;/button&gt;
    &lt;p v-if="count > 10"&gt;Wow, that's high!&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';

const count = ref(0);
const increment = () =&gt; count.value++;
const decrement = () =&gt; count.value--;
&lt;/script&gt;

&lt;style scoped&gt;
button { margin: 4px; padding: 8px 16px; }
&lt;/style&gt;</code></pre></div>
<div class="key-points"><h4>Vue Directives</h4><ul>
<li><code>v-if</code> — conditional rendering</li>
<li><code>v-for</code> — list rendering</li>
<li><code>v-bind</code> (or <code>:</code>) — bind attributes</li>
<li><code>v-on</code> (or <code>@</code>) — event handling</li>
<li><code>v-model</code> — two-way data binding</li>
</ul></div>`,
            tryCode: { starter: '<!-- Add a v-model input and display its value -->\n<template>\n  <div>\n    <input v-model="" placeholder="Type here">\n    <p>You typed: {{ }}</p>\n  </div>\n</template>', task: 'Create a reactive variable "message" and bind it to the input with v-model, then display it.' }
          },
          {
            id: 'vue-quiz', title: 'Vue.js Quiz', type: 'quiz', xp: 60,
            questions: [
              { q: 'Which directive handles events in Vue?', options: ['v-event','v-on / @','v-handle','@click only'], answer: 1 },
              { q: 'What does v-model do?', options: ['One-way data binding','Two-way data binding','Model validation','Vue Router navigation'], answer: 1 },
              { q: 'Which Vue function creates reactive data?', options: ['reactive()','useState()','data()','ref()'], answer: 3 },
              { q: 'What is a computed property in Vue?', options: ['A property that auto-calculates based on reactive data','A CSS property','A method that takes arguments','None'], answer: 0 },
            ]
          }
        ]
      },
      {
        level: 6, title: 'Git & Version Control', xpRequired: 1150, xpReward: 200,
        lessons: [
          {
            id: 'git-1', title: 'Git Fundamentals', type: 'lesson', xp: 30,
            content: `<h2>Git & Version Control</h2>
<p>Git is the most used version control system. Essential for every developer.</p>
<div class="code-block"><pre><code># Initial setup
git config --global user.name "Your Name"
git config --global user.email "you@email.com"

# Starting a project
git init                     # initialize repo
git clone URL               # clone existing repo

# Daily workflow
git status                  # check what changed
git add .                   # stage all changes
git add filename.js         # stage specific file
git commit -m "feat: add login page"  # commit
git push origin main        # push to remote

# Branching
git checkout -b feature/login    # create & switch branch
git merge feature/login          # merge branch
git branch -d feature/login      # delete branch

# History & undo
git log --oneline          # commit history
git diff                   # see changes
git revert HEAD            # undo last commit</code></pre></div>
<div class="term-box"><strong>📖 Tech Term:</strong> <em>Conventional Commits</em> — a commit message convention: <code>feat:</code>, <code>fix:</code>, <code>docs:</code>, <code>style:</code>, <code>refactor:</code>, <code>test:</code>. Used in professional teams.</div>`,
            tryCode: null
          },
          {
            id: 'git-quiz', title: 'Git Quiz', type: 'quiz', xp: 50,
            questions: [
              { q: 'What command stages ALL changes for commit?', options: ['git commit .','git stage all','git add .','git push'], answer: 2 },
              { q: 'What is a branch in Git?', options: ['A folder in the repo','An independent line of development','A backup copy','A remote server'], answer: 1 },
              { q: 'What does git clone do?', options: ['Creates a new repo','Copies a remote repo locally','Deletes a repo','Merges two repos'], answer: 1 },
              { q: 'What is the main/master branch?', options: ['A deleted branch','The default primary branch','A test branch','A GitHub feature'], answer: 1 },
            ]
          }
        ]
      },
      {
        level: 7, title: 'APIs & Async JS', xpRequired: 1350, xpReward: 300,
        lessons: [
          {
            id: 'api-1', title: 'REST APIs & Fetch', type: 'lesson', xp: 40,
            content: `<h2>REST APIs & Fetch</h2>
<p>Frontend apps talk to backends via APIs. The Fetch API is the modern way.</p>
<div class="code-block"><pre><code>// GET request
const getUsers = async () => {
  try {
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) throw new Error('HTTP error: ' + response.status);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
};

// POST request
const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Using async/await
const main = async () => {
  const users = await getUsers();
  console.log(users);
};</code></pre></div>
<div class="term-box"><strong>📖 Tech Term:</strong> <em>REST</em> — Representational State Transfer. An API design style using HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (delete). Each URL is a "resource".</div>`,
            tryCode: { starter: '// Fetch a joke from an API\nconst getJoke = async () => {\n  // Fetch from: https://official-joke-api.appspot.com/random_joke\n  \n};\n\ngetJoke();', task: 'Complete the async function to fetch and console.log a random joke.' }
          },
          {
            id: 'api-quiz', title: 'API & Async Quiz', type: 'quiz', xp: 80,
            questions: [
              { q: 'What HTTP method is used to READ data?', options: ['POST','PUT','GET','DELETE'], answer: 2 },
              { q: 'What does async/await do?', options: ['Makes code run faster','Lets you write async code synchronously','Replaces fetch()','Creates a new thread'], answer: 1 },
              { q: 'What does a 404 status code mean?', options: ['Server error','Not Found','Success','Unauthorized'], answer: 1 },
              { q: 'What is JSON?', options: ['JavaScript Object Notation — a data format','A database','A JavaScript library','A network protocol'], answer: 0 },
              { q: 'What is CORS?', options: ['A CSS property','Cross-Origin Resource Sharing — a security feature','A JavaScript error','A React hook'], answer: 1 },
            ]
          }
        ]
      },
      {
        level: 8, title: 'Build Tools & Deployment', xpRequired: 1650, xpReward: 300,
        lessons: [
          {
            id: 'build-1', title: 'npm, Vite & Build Process', type: 'lesson', xp: 35,
            content: `<h2>Build Tools & npm</h2>
<div class="code-block"><pre><code># npm basics
npm init -y                  # create package.json
npm install react react-dom  # install packages
npm install -D vite          # dev dependency
npm run dev                  # start dev server
npm run build                # production build

# Vite — modern build tool (much faster than webpack)
npm create vite@latest my-app -- --template react
cd my-app && npm install && npm run dev

# package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}</code></pre></div>
<div class="key-points"><h4>Key Concepts</h4><ul>
<li><code>node_modules</code> — installed packages (never commit to git!)</li>
<li><code>.gitignore</code> — files Git ignores</li>
<li><code>package-lock.json</code> — exact dependency versions</li>
<li>Bundling — combining files for production</li>
</ul></div>`,
            tryCode: null
          },
          {
            id: 'deploy-1', title: 'Deploying to Vercel/Netlify', type: 'lesson', xp: 35,
            content: `<h2>Deploying Your App</h2>
<p>Modern frontend apps deploy in seconds — no server needed!</p>
<div class="code-block"><pre><code># Deploy to Vercel (recommended for React/Vue)
npm install -g vercel
vercel login
vercel                    # deploy current folder
vercel --prod             # deploy to production

# Or use GitHub integration:
# 1. Push to GitHub
# 2. Connect repo to vercel.com
# 3. Auto-deploys on every push ✨

# Deploy to Netlify
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist

# Environment variables
# Create .env file:
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_key_here
# Access in code:
const url = import.meta.env.VITE_API_URL;</code></pre></div>
<div class="term-box"><strong>📖 Tech Term:</strong> <em>CI/CD</em> — Continuous Integration/Continuous Deployment. Automatically test and deploy code when you push to Git. GitHub Actions, Vercel, and Netlify all do this.</div>`,
            tryCode: null
          },
          {
            id: 'build-quiz', title: 'Build & Deploy Quiz', type: 'quiz', xp: 80,
            questions: [
              { q: 'What is npm?', options: ['A browser','Node Package Manager — manages JS libraries','A code editor','A testing tool'], answer: 1 },
              { q: 'What should you add to .gitignore?', options: ['src folder','package.json','node_modules','index.html'], answer: 2 },
              { q: 'What does "npm run build" do?', options: ['Starts dev server','Runs tests','Creates optimized production files','Installs dependencies'], answer: 2 },
              { q: 'What is Vite?', options: ['A CSS framework','A fast modern build tool','A database','A React component'], answer: 1 },
            ]
          }
        ]
      },
      {
        level: 9, title: 'Testing & TypeScript', xpRequired: 1950, xpReward: 350,
        lessons: [
          {
            id: 'ts-1', title: 'TypeScript Basics', type: 'lesson', xp: 40,
            content: `<h2>TypeScript</h2>
<p>TypeScript is JavaScript with types. Used by almost every professional team.</p>
<div class="code-block"><pre><code>// Basic types
let name: string = "Merdan";
let age: number = 25;
let isDev: boolean = true;
let skills: string[] = ['JS', 'React'];

// Interface — define object shape
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// Function with types
const greet = (user: User): string => {
  return \`Hello, \${user.name}!\`;
};

// Generic functions
function getFirst&lt;T&gt;(arr: T[]): T | undefined {
  return arr[0];
}

// Optional & default props
interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
  onClick: () =&gt; void;
}</code></pre></div>`,
            tryCode: { starter: '// Add types to this function\nfunction createUser(name, age, email) {\n  return { name, age, email, createdAt: new Date() };\n}\n\n// Define an interface for User first', task: 'Define a User interface and type the function parameters and return type.' }
          },
          {
            id: 'test-quiz', title: 'TS & Testing Quiz', type: 'quiz', xp: 80,
            questions: [
              { q: 'What is TypeScript?', options: ['A new language','JavaScript with static type checking','A CSS preprocessor','A Node.js framework'], answer: 1 },
              { q: 'What does an interface do in TypeScript?', options: ['Creates a class','Defines a contract/shape for objects','Handles errors','Imports modules'], answer: 1 },
              { q: 'Which testing library is most popular with React?', options: ['Mocha','Karma','Jest + React Testing Library','Jasmine'], answer: 2 },
              { q: 'What does TDD stand for?', options: ['Test Driven Design','Test Driven Development','Type Driven Development','Technical Design Document'], answer: 1 },
            ]
          }
        ]
      },
      {
        level: 10, title: 'Senior Level — Full Project', xpRequired: 2300, xpReward: 500,
        lessons: [
          {
            id: 'senior-1', title: 'System Design & Architecture', type: 'lesson', xp: 50,
            content: `<h2>Frontend Architecture — Senior Level</h2>
<div class="key-points"><h4>🏗️ What Senior Devs Know</h4><ul>
<li><strong>Component Architecture</strong> — Atomic Design, feature-based folders</li>
<li><strong>State Management</strong> — Zustand, Redux Toolkit, React Query</li>
<li><strong>Performance</strong> — Code splitting, lazy loading, memoization</li>
<li><strong>Security</strong> — XSS prevention, CSRF, Content Security Policy</li>
<li><strong>Accessibility</strong> — WCAG 2.1, ARIA, keyboard navigation</li>
<li><strong>SEO</strong> — SSR (Next.js), meta tags, structured data</li>
<li><strong>Testing</strong> — Unit, Integration, E2E (Cypress/Playwright)</li>
</ul></div>
<div class="code-block"><pre><code>// Feature-based folder structure (senior approach)
src/
  features/
    auth/
      components/
      hooks/
      api/
      store/
      types/
    dashboard/
    products/
  shared/
    components/
    hooks/
    utils/
  app/
    routes.tsx
    store.ts</code></pre></div>
<div class="term-box"><strong>🎓 You are now Senior Frontend!</strong> You understand HTML, CSS, JS, React, Vue, Git, APIs, TypeScript, Testing, and Deployment. Time to build real projects!</div>`,
            tryCode: null
          },
          {
            id: 'senior-project', title: '🏆 FINAL PROJECT: Full Portfolio Site', type: 'project', xp: 200,
            desc: 'Build a complete developer portfolio with React + TypeScript + API integration + deploy to Vercel',
            requirements: [
              'Hero section with animated intro',
              'Projects section fetched from GitHub API',
              'Skills section with proficiency levels',
              'Contact form with validation',
              'Dark/light mode toggle',
              'Fully responsive (mobile-first)',
              'Deployed live on Vercel',
              'TypeScript throughout',
              'Written tests for key components',
              'README.md file',
            ],
            hints: ['Use Vite + React + TypeScript', 'GitHub API: https://api.github.com/users/{username}/repos', 'Use CSS custom properties for theming', 'Netlify/Vercel for deployment'],
            starterCode: null
          },
        ]
      }
    ]
  }
};

// Copy frontend curriculum to other branches with different labels
SB.curriculum.backend = { levels: SB.curriculum.frontend.levels.map(l => ({...l, title: l.title.replace('React','Node.js').replace('Vue','Express').replace('HTML','Python').replace('CSS','SQL')})) };
SB.curriculum.fullstack = { levels: SB.curriculum.frontend.levels };
SB.curriculum.ml = { levels: SB.curriculum.frontend.levels.map(l => ({...l})) };
SB.curriculum.devops = { levels: SB.curriculum.frontend.levels.map(l => ({...l})) };
SB.curriculum.mobile = { levels: SB.curriculum.frontend.levels.map(l => ({...l})) };
SB.curriculum.security = { levels: SB.curriculum.frontend.levels.map(l => ({...l})) };
SB.curriculum.data = { levels: SB.curriculum.frontend.levels.map(l => ({...l})) };

// ── TECHNICAL TERMS ───────────────────────────
SB.techTerms = [
  { term: 'API', def: 'Application Programming Interface — a contract allowing software to communicate', category: 'General' },
  { term: 'REST', def: 'Representational State Transfer — architectural style for HTTP APIs using GET/POST/PUT/DELETE', category: 'Backend' },
  { term: 'JSON', def: 'JavaScript Object Notation — lightweight data interchange format', category: 'General' },
  { term: 'DOM', def: 'Document Object Model — tree structure of HTML that JS can manipulate', category: 'Frontend' },
  { term: 'CRUD', def: 'Create, Read, Update, Delete — the four basic database operations', category: 'Backend' },
  { term: 'SPA', def: 'Single Page Application — app that loads once and updates dynamically', category: 'Frontend' },
  { term: 'SSR', def: 'Server-Side Rendering — HTML generated on server (Next.js, Nuxt)', category: 'Frontend' },
  { term: 'CI/CD', def: 'Continuous Integration/Continuous Deployment — automated testing and deployment', category: 'DevOps' },
  { term: 'Docker', def: 'Platform to package and run apps in isolated containers', category: 'DevOps' },
  { term: 'JWT', def: 'JSON Web Token — compact, URL-safe token for authentication', category: 'Security' },
  { term: 'OAuth', def: 'Open Authorization — delegated access framework (Login with Google)', category: 'Security' },
  { term: 'SQL', def: 'Structured Query Language — for managing relational databases', category: 'Backend' },
  { term: 'ORM', def: 'Object-Relational Mapping — use objects to interact with databases (Prisma, Sequelize)', category: 'Backend' },
  { term: 'Async', def: 'Asynchronous — operations that run without blocking execution', category: 'General' },
  { term: 'TypeScript', def: 'JavaScript superset with static type checking — catches bugs before runtime', category: 'Frontend' },
  { term: 'Webpack/Vite', def: 'Module bundlers — combine many JS files into optimized output', category: 'Frontend' },
  { term: 'Git', def: 'Distributed version control system — tracks code changes over time', category: 'General' },
  { term: 'Agile', def: 'Iterative development methodology with sprints and daily standups', category: 'Process' },
  { term: 'Scrum', def: 'Agile framework with sprints, sprint planning, retrospectives', category: 'Process' },
  { term: 'PR/MR', def: 'Pull Request / Merge Request — code review before merging to main branch', category: 'Process' },
  { term: 'Kubernetes', def: 'Container orchestration platform — manages Docker containers at scale', category: 'DevOps' },
  { term: 'Microservices', def: 'Architecture where app is split into small independent services', category: 'Architecture' },
  { term: 'GraphQL', def: 'Query language for APIs — ask for exactly what you need', category: 'Backend' },
  { term: 'WebSocket', def: 'Persistent connection between client and server for real-time data', category: 'Backend' },
  { term: 'TDD', def: 'Test-Driven Development — write tests before code', category: 'Process' },
  { term: 'SOLID', def: 'Five principles of OOP design: Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion', category: 'Architecture' },
  { term: 'Big O', def: 'Algorithm complexity notation — describes performance as input grows', category: 'CS' },
  { term: 'Cache', def: 'Storing frequently accessed data for faster retrieval', category: 'General' },
  { term: 'CDN', def: 'Content Delivery Network — distributes content from servers near users', category: 'DevOps' },
  { term: 'HTTPS', def: 'HTTP Secure — encrypted HTTP using TLS/SSL', category: 'Security' },
];

// ── INTERVIEW QUESTIONS ───────────────────────
SB.interviewQuestions = [
  {
    category: 'JavaScript',
    questions: [
      { q: 'Explain the difference between var, let, and const.', a: 'var is function-scoped and hoisted. let and const are block-scoped. const cannot be reassigned. Always prefer const, use let when reassignment is needed, avoid var.' },
      { q: 'What is event bubbling?', a: 'When an event fires on an element, it bubbles up through parent elements. Use event.stopPropagation() to prevent bubbling. Event delegation uses this — attach one listener to parent instead of many to children.' },
      { q: 'What is a closure?', a: 'A closure is a function that has access to variables from its outer (enclosing) scope even after the outer function has returned. Used for data privacy, factory functions, and module patterns.' },
      { q: 'Explain Promise vs async/await.', a: 'Promises represent eventual values. .then()/.catch() chains. async/await is syntactic sugar over promises — cleaner, more readable. Both handle asynchronous operations. async functions always return a Promise.' },
      { q: 'What is the event loop?', a: "JavaScript is single-threaded. The event loop handles async operations: call stack runs synchronous code, Web APIs handle async tasks (setTimeout, fetch), their callbacks queue in the callback/microtask queue, event loop moves them to call stack when it's empty." },
    ]
  },
  {
    category: 'React',
    questions: [
      { q: 'What is the Virtual DOM and why is it fast?', a: 'React keeps a virtual copy of the DOM in memory. On state change, it creates a new virtual DOM, diffs it with the previous one (reconciliation), and only updates the real DOM with actual changes — minimizing expensive DOM operations.' },
      { q: 'When do you use useCallback and useMemo?', a: 'useMemo memoizes expensive computed values. useCallback memoizes function references. Use them to prevent unnecessary re-renders when passing to child components. Overuse causes more harm than good — only optimize when there\'s a measurable performance problem.' },
      { q: 'Explain React\'s reconciliation algorithm.', a: 'React uses the "diffing" algorithm: elements of different types produce different trees, elements with the same key between renders are treated as the same element. It compares element type, then props, updating only what changed.' },
      { q: 'What are controlled vs uncontrolled components?', a: 'Controlled: form data handled by React state (value={state} onChange={setter}). Uncontrolled: data handled by DOM itself using refs. Controlled is preferred for React forms as single source of truth.' },
    ]
  },
  {
    category: 'CSS',
    questions: [
      { q: 'Explain CSS specificity.', a: 'Specificity determines which CSS rule applies: inline styles (1000) > IDs (100) > classes/attributes (10) > elements (1). Higher specificity wins. Equal specificity: last rule wins. !important overrides all (avoid it).' },
      { q: 'What is the CSS Box Model?', a: 'Every element is a box: content → padding → border → margin. box-sizing: border-box includes padding and border in the width (preferred). box-sizing: content-box (default) adds padding/border on top of width.' },
      { q: 'How does position: sticky work?', a: 'sticky is a hybrid of relative and fixed. Element is treated as relative until it reaches a threshold (top: 0), then acts as fixed within its parent container. Used for sticky headers/nav within sections.' },
    ]
  },
  {
    category: 'System Design',
    questions: [
      { q: 'How would you design a URL shortener?', a: 'Frontend: input form, short URL display. Backend: POST /shorten → generate unique hash (6 chars), store in DB (hash → original URL), return short URL. GET /{hash} → lookup DB → 301 redirect. Scale: Redis cache, CDN, rate limiting.' },
      { q: 'How do you optimize a slow React app?', a: 'Profile with React DevTools. Solutions: React.memo for components, useMemo/useCallback, code splitting with lazy(), virtualized lists (react-window), avoid inline objects/arrays in JSX, state colocation.' },
    ]
  },
  {
    category: 'Behavioral',
    questions: [
      { q: 'Tell me about a difficult bug you fixed.', a: 'Structure: Situation (context), Task (what needed fixing), Action (steps you took — reading error logs, isolation, research), Result (fixed, learned, added tests). Be specific, show problem-solving process.' },
      { q: 'How do you handle disagreement with a teammate?', a: 'Listen first, understand their perspective. Focus on the solution, not personal views. Discuss trade-offs objectively. If stuck, escalate to lead or architect. Data and examples > opinions.' },
      { q: 'Describe your development workflow.', a: 'Read ticket/requirements. Break into subtasks. Create feature branch. TDD if possible. PR with description and screenshots. Address review feedback. Merge, monitor, document. Show agile/scrum experience.' },
    ]
  }
];

// ── BADGES ────────────────────────────────────
SB.badges = [
  { id: 'first_lesson', icon: '📖', name: 'First Step', desc: 'Complete your first lesson' },
  { id: 'first_quiz', icon: '✅', name: 'Quiz Taker', desc: 'Pass your first quiz' },
  { id: 'level_3', icon: '⚡', name: 'Rising Star', desc: 'Reach Level 3' },
  { id: 'level_5', icon: '🔥', name: 'On Fire', desc: 'Reach Level 5' },
  { id: 'level_10', icon: '🏆', name: 'Senior Dev', desc: 'Complete all 10 levels!' },
  { id: 'streak_7', icon: '📅', name: 'Week Warrior', desc: '7-day learning streak' },
  { id: 'xp_500', icon: '💫', name: 'XP Hunter', desc: 'Earn 500 XP' },
  { id: 'xp_1000', icon: '🌟', name: 'XP Master', desc: 'Earn 1000 XP' },
  { id: 'xp_2000', icon: '💎', name: 'Diamond', desc: 'Earn 2000 XP' },
  { id: 'first_project', icon: '🏗️', name: 'Builder', desc: 'Complete your first project' },
  { id: 'all_quizzes', icon: '🎓', name: 'Quiz Master', desc: 'Pass all quizzes in a branch' },
  { id: 'perfect_quiz', icon: '💯', name: 'Perfect Score', desc: 'Get 100% on a quiz' },
];

// ── WORD MATCH GAME ───────────────────────────
SB.wordMatchPairs = [
  { term: 'API', def: 'Interface for software communication' },
  { term: 'DOM', def: 'Tree structure of HTML elements' },
  { term: 'CSS', def: 'Styles and layouts for HTML' },
  { term: 'Git', def: 'Version control system' },
  { term: 'npm', def: 'Node Package Manager' },
  { term: 'JSX', def: 'JavaScript XML syntax for React' },
  { term: 'JSON', def: 'Data interchange format' },
  { term: 'REST', def: 'HTTP API design style' },
];

// ── CODE BREAKER GAME ────────────────────────
SB.codeBreakerChallenges = [
  { code: 'const x = [1,2,3]; console.log(x._____(n => n*2));', answer: 'map', hint: 'Transforms each element' },
  { code: 'const [a, b] = [10, 20]; console.log(a + b); // ___', answer: '30', hint: 'Addition of destructured values' },
  { code: 'fetch(url).then(r => r._____()).then(data => ...)', answer: 'json', hint: 'Parses response as JSON' },
  { code: '"hello world".split(" ")._____(w=>w[0].toUpperCase()+w.slice(1)).join(" ")', answer: 'map', hint: 'Transforms each word' },
  { code: 'document.querySelector(".btn").addEventListener("_____", handler)', answer: 'click', hint: 'Most common mouse event' },
  { code: 'const sum = arr.reduce((acc, n) => acc + n, ___)', answer: '0', hint: 'Initial value for sum' },
];
