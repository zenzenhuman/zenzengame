const createInitialState = () => ({
  calm: 1,
  spark: 0,
  insight: 0,
  achievements: new Set()
});

let state = createInitialState();
let currentSceneId = "title";
let typingController = null;

const achievementsInfo = {
  deepBreather: { label: "DEEP BREATHER", description: "深呼吸で夢を安定させた" },
  pixelGardener: { label: "PIXEL GARDENER", description: "庭の声を聞いた" },
  heartListener: { label: "HEART LISTENER", description: "鼓動を感じ取った" },
  glitchFriend: { label: "GLITCH FRIEND", description: "データの迷子を助けた" }
};

const scenes = {
  title: {
    speaker: "？？？",
    text: "ピコピコ光る禅然園ピクセル支部へようこそ。虹色の砂がふわりと舞い、あなたの到着を待っていたようです。",
    background: "dream",
    character: "guide",
    mood: "spark",
    choices: [
      {
        text: "目を開いて光の庭に飛び込む",
        next: "neonGarden",
        effects: { spark: 1 }
      },
      {
        text: "胸いっぱいに空気を吸う",
        next: "breathingRoom",
        effects: { calm: 1 },
        unlock: "deepBreather"
      }
    ]
  },
  neonGarden: {
    speaker: "ニア",
    text: "わぁ、キラキラの砂浜にようこそ！ わたしは案内役のニア。君の心拍とリンクして色が変わるんだよ。",
    background: "garden",
    character: "heroine",
    mood: "spark",
    onEnter() {
      state.spark += 1;
    },
    choices: [
      {
        text: "砂の光を手ですくう",
        next: "pixelLotus",
        effects: { insight: 1 },
        unlock: "pixelGardener"
      },
      {
        text: "遠くのピクセル松に近づく",
        next: "memoryEcho",
        effects: { calm: 1 }
      }
    ]
  },
  breathingRoom: {
    speaker: "ニア",
    text: "静かな呼吸室だよ。丸いモニターがあなたの息をドットで描いてくれるんだ。",
    background: "dream",
    character: "heroine",
    mood: "calm",
    choices: [
      {
        text: "波紋に合わせて呼吸を整える",
        next: "memoryEcho",
        effects: { calm: 2 }
      },
      {
        text: "モニターの裏側を覗く",
        next: "dataLab",
        effects: { insight: 1 }
      }
    ]
  },
  memoryEcho: {
    speaker: "ナレーション",
    text: "ピクセル松の葉が揺れるたび、過去の会話がふわっと再生される。優しい声や笑い声がドットの粒で舞う。",
    background: "garden",
    character: "guide",
    mood: "calm",
    choices: [
      {
        text: "懐かしい音に耳を澄ます",
        next: "heartChamber",
        effects: { calm: 1 },
        unlock: "heartListener"
      },
      {
        text: "声の出どころを追う",
        next: "glitchPlaza",
        effects: { spark: 1 }
      }
    ]
  },
  pixelLotus: {
    speaker: "ニア",
    text: "ほら、小さなロータスが生まれた！ 君の想いがピクセル花弁に描かれてる。触れると未来の線が増えるみたい。",
    background: "garden",
    character: "heroine",
    mood: "insight",
    choices: [
      {
        text: "未来の線をたどる",
        next: "dataLab",
        effects: { insight: 2 }
      },
      {
        text: "花弁を砂に還す",
        next: "breathingRoom",
        effects: { calm: 1, spark: 1 }
      }
    ]
  },
  dataLab: {
    speaker: "シエル",
    text: "私はシエル。この夢の医療棟の管理AIよ。君の心臓ログに不思議な波があるんだけど、見てみる？",
    background: "lab",
    character: "mysterious",
    mood: "insight",
    choices: [
      {
        text: "波の正体を解析する",
        next: "heartChamber",
        effects: { insight: 1, calm: 1 }
      },
      {
        text: "シエルに任せて散策する",
        next: "glitchPlaza",
        effects: { spark: 2 }
      }
    ]
  },
  heartChamber: {
    speaker: "ナレーション",
    text: "透明なドットの心臓が鼓動するたび、リズムがネオンの雨となって降り注ぐ。あなたの胸とも共鳴している。",
    background: "lab",
    character: "mysterious",
    mood: "calm",
    onEnter() {
      state.calm += 1;
    },
    choices: [
      {
        text: "リズムに合わせて手を打つ",
        next: "glitchPlaza",
        effects: { spark: 1 }
      },
      {
        text: "静かに手を当てる",
        next: "starlitHub",
        effects: { calm: 1, insight: 1 }
      }
    ]
  },
  glitchPlaza: {
    speaker: "迷子データ",
    text: "ぴょこっ。ボク、ループにハマって帰れなくなっちゃった。ピコピコ手をつないで出口を探してくれる？",
    background: "dream",
    character: "guide",
    mood: "spark",
    choices: [
      {
        text: "迷子データの手を握る",
        next: "starlitHub",
        effects: { spark: 1, calm: 1 },
        unlock: "glitchFriend"
      },
      {
        text: "ループの中心へ飛び込む",
        next: "pixelLotus",
        effects: { insight: 1 }
      }
    ]
  },
  starlitHub: {
    speaker: "ニア",
    text: "ドットの星座が組み替わって、君だけのゲートが姿を現したよ。選ぶ灯りで道が変わるんだ。",
    background: "dream",
    character: "heroine",
    mood: "insight",
    choices: [
      {
        text: "穏やかな青の灯りを選ぶ",
        next: selectEnding("calm")
      },
      {
        text: "きらめく桃色の灯りを選ぶ",
        next: selectEnding("spark")
      },
      {
        text: "ひそやかな金色の灯りを選ぶ",
        next: selectEnding("insight")
      }
    ]
  },
  endingCalm: {
    speaker: "ナレーション",
    text: "青い灯りが柔らかな波になって、あなたの胸を撫でていく。目を開いたとき、日常のざわめきさえドットの子守唄のように聞こえた。",
    background: "garden",
    character: "heroine",
    mood: "calm",
    choices: [
      {
        text: "また夢を訪れる",
        next: "credits",
        effects: { calm: 1 }
      }
    ]
  },
  endingSpark: {
    speaker: "ニア",
    text: "桃色の灯りが弾けて、君の足取りはリズムゲームのステップみたい。現実に戻っても、アイデアが蛍光色で舞うんだろうな。",
    background: "dream",
    character: "heroine",
    mood: "spark",
    choices: [
      {
        text: "ハイタッチして帰る",
        next: "credits",
        effects: { spark: 1 }
      }
    ]
  },
  endingInsight: {
    speaker: "シエル",
    text: "金色の灯りは静かにきらめき、君の歩む先を一本の線でつないだ。どんな瞬間も、観察すれば優しいリズムを持つと気づいたね。",
    background: "lab",
    character: "mysterious",
    mood: "insight",
    choices: [
      {
        text: "学びを胸に刻む",
        next: "credits",
        effects: { insight: 1 }
      }
    ]
  },
  credits: {
    speaker: "ニア",
    text: "禅然ピクセル支部はいつでもオープン！ ハートがざわざわしたら、またドットの門をくぐってね。",
    background: "dream",
    character: "heroine",
    mood: "spark",
    choices: [
      {
        text: "タイトルに戻る",
        next: "title"
      }
    ]
  }
};

function selectEnding(priority) {
  return () => {
    const values = {
      calm: state.calm,
      spark: state.spark,
      insight: state.insight
    };

    const topMood = Object.entries(values).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "calm";
    if (values[priority] >= values[topMood]) {
      return endingId(priority);
    }
    return endingId(topMood);
  };
}

function endingId(mood) {
  switch (mood) {
    case "spark":
      return "endingSpark";
    case "insight":
      return "endingInsight";
    default:
      return "endingCalm";
  }
}

const elements = {
  name: document.getElementById("character-name"),
  text: document.getElementById("text"),
  background: document.getElementById("background"),
  character: document.getElementById("character"),
  choices: document.getElementById("choices"),
  restart: document.getElementById("restart"),
  badge: document.getElementById("mood-badge"),
  achievements: document.getElementById("achievements"),
  textbox: document.getElementById("textbox"),
  stats: {
    calm: document.getElementById("stat-calm"),
    spark: document.getElementById("stat-spark"),
    insight: document.getElementById("stat-insight")
  }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function applyEffects(effects = {}) {
  Object.entries(effects).forEach(([key, delta]) => {
    if (key in state && typeof state[key] === "number") {
      state[key] += delta;
    }
  });
  updateStats();
}

function updateStats() {
  (/** @type {const} */ (["calm", "spark", "insight"]))
    .forEach((key) => {
      const value = clamp(state[key], 0, 8);
      const percent = (value / 8) * 100;
      elements.stats[key].style.width = `${percent}%`;
    });
}

function grantAchievement(id) {
  if (!id || state.achievements.has(id)) {
    return;
  }
  state.achievements.add(id);
  renderAchievements();
}

function renderAchievements() {
  elements.achievements.innerHTML = "";
  state.achievements.forEach((id) => {
    const info = achievementsInfo[id];
    if (!info) return;
    const item = document.createElement("span");
    item.className = "achievement-item";
    item.textContent = `${info.label}`;
    item.title = info.description;
    elements.achievements.appendChild(item);
  });
}

function updateBadge(mood) {
  const labels = {
    calm: "serene",
    spark: "sparkly",
    insight: "wise"
  };
  elements.badge.textContent = labels[mood] ?? mood ?? "calm";
}

async function typeText(text) {
  if (typingController) {
    typingController.abort();
  }

  const controller = new AbortController();
  typingController = controller;
  elements.text.textContent = "";
  const characters = [...text];

  for (let i = 0; i < characters.length; i += 1) {
    if (controller.signal.aborted) {
      elements.text.textContent = text;
      typingController = null;
      return;
    }
    elements.text.textContent += characters[i];
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 28));
  }
  typingController = null;
}

function instantText() {
  if (typingController && !typingController.signal.aborted) {
    typingController.abort();
  }
}

function setBackground(sceneId) {
  const targetId = sceneId ?? "";
  if (elements.background.dataset.scene === targetId) {
    return;
  }
  elements.background.style.opacity = "0";
  requestAnimationFrame(() => {
    if (targetId) {
      elements.background.dataset.scene = targetId;
    } else {
      delete elements.background.dataset.scene;
    }
    elements.background.style.opacity = "1";
  });
}

const spriteLabels = {
  heroine: "案内役ニア",
  guide: "ネオンガイド",
  mysterious: "医療AIシエル"
};

function setCharacter(spriteId) {
  const targetId = spriteId ?? "";
  if (!targetId) {
    elements.character.classList.remove("is-visible");
    elements.character.className = "sprite";
    delete elements.character.dataset.sprite;
    elements.character.removeAttribute("aria-label");
    return;
  }

  if (elements.character.dataset.sprite === targetId) {
    elements.character.classList.add("is-visible");
    return;
  }

  elements.character.classList.remove("is-visible");
  requestAnimationFrame(() => {
    elements.character.dataset.sprite = targetId;
    elements.character.className = `sprite sprite--${targetId}`;
    const label = spriteLabels[targetId];
    if (label) {
      elements.character.setAttribute("aria-label", label);
    } else {
      elements.character.removeAttribute("aria-label");
    }
    requestAnimationFrame(() => {
      elements.character.classList.add("is-visible");
    });
  });
}

function resolveNext(next) {
  if (typeof next === "function") {
    return next();
  }
  return next;
}

function renderChoices(choices = []) {
  elements.choices.innerHTML = "";
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.textContent = choice.text;
    button.addEventListener("click", () => {
      instantText();
      applyEffects(choice.effects);
      grantAchievement(choice.unlock);
      const nextId = resolveNext(choice.next);
      showScene(nextId);
    });
    elements.choices.appendChild(button);
  });
}

function showScene(id) {
  const scene = scenes[id];
  if (!scene) {
    console.warn(`Scene '${id}' not found.`);
    return;
  }

  currentSceneId = id;
  scene.onEnter?.();
  updateStats();

  elements.name.textContent = scene.speaker ?? "";
  updateBadge(scene.mood);
  setBackground(scene.background);
  setCharacter(scene.character);
  typeText(scene.text ?? "");
  renderChoices(scene.choices ?? []);
}

elements.restart.addEventListener("click", () => {
  state = createInitialState();
  updateStats();
  renderAchievements();
  showScene("title");
});

function advanceOrSkip() {
  if (typingController && !typingController.signal.aborted) {
    typingController.abort();
    return;
  }
  const firstChoice = elements.choices.querySelector(".choice-button");
  if (firstChoice) {
    firstChoice.click();
  }
}

elements.textbox.addEventListener("click", advanceOrSkip);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    advanceOrSkip();
  }
});

updateStats();
showScene(currentSceneId);
