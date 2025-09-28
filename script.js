const story = {
  intro: {
    name: "ミドリ",
    text: "ようこそ、禅然園へ。ここは心を整えたい旅人が集う小さな庵。あなたも一息つきに来たのでしょう？",
    background: "linear-gradient(135deg, rgba(60, 99, 141, 0.6), rgba(22, 38, 65, 0.9))",
    choices: [
      { text: "頷く", next: "garden" },
      { text: "ここはどこか尋ねる", next: "askPlace" }
    ]
  },
  askPlace: {
    name: "あなた",
    text: "ここは……夢ですか？ それとも現実？",
    background: "linear-gradient(135deg, rgba(34, 63, 109, 0.75), rgba(12, 23, 43, 0.9))",
    choices: [
      {
        text: "現実だと言われるのを待つ",
        next: "reality"
      }
    ]
  },
  reality: {
    name: "ミドリ",
    text: "夢でも現でも、息があるなら感じられますよ。深呼吸を、どうぞ。",
    background: "linear-gradient(160deg, rgba(86, 121, 171, 0.7), rgba(15, 26, 44, 0.9))",
    choices: [
      { text: "深呼吸する", next: "garden" }
    ]
  },
  garden: {
    name: "Narration",
    text: "足元に敷かれた白砂は朝日に淡く輝き、松の香りが静かに漂う。遠くで水琴窟が澄んだ音を響かせている。",
    background: "linear-gradient(140deg, rgba(46, 98, 123, 0.65), rgba(16, 47, 68, 0.9))",
    choices: [
      { text: "音に耳を澄ます", next: "listen" },
      { text: "庭を眺める", next: "look" }
    ]
  },
  listen: {
    name: "Narration",
    text: "滴り落ちる一滴が、やがてあなたの呼吸と重なり合う。音はただそこにあるだけなのに、心が澄んでいくのを感じる。",
    background: "linear-gradient(180deg, rgba(36, 78, 116, 0.6), rgba(11, 30, 48, 0.95))",
    choices: [
      { text: "呼吸を数える", next: "breath" }
    ]
  },
  look: {
    name: "ミドリ",
    text: "この庭は、訪れる人の心を映す鏡です。あなたにはどんな景色が見えていますか？",
    background: "linear-gradient(150deg, rgba(74, 112, 152, 0.55), rgba(19, 32, 52, 0.92))",
    choices: [
      { text: "静かな湖のようだと話す", next: "lake" },
      { text: "嵐の前のようだと話す", next: "storm" }
    ]
  },
  lake: {
    name: "ミドリ",
    text: "穏やかな湖の心は、波風を拒まないそうですよ。揺れてもまた戻る。その余白があなたの強さです。",
    background: "linear-gradient(160deg, rgba(58, 92, 143, 0.6), rgba(14, 35, 58, 0.92))",
    choices: [
      { text: "もう少し話を聞く", next: "teachings" }
    ]
  },
  storm: {
    name: "ミドリ",
    text: "嵐を予感できるのは感性が澄んでいる証拠。恐れるよりも、備えと共に寄り添ってみませんか。",
    background: "linear-gradient(160deg, rgba(92, 68, 123, 0.55), rgba(23, 26, 52, 0.95))",
    choices: [
      { text: "どう備えればいいか尋ねる", next: "teachings" }
    ]
  },
  breath: {
    name: "Narration",
    text: "一つ、二つ。吸って、吐いて。気がつけば数える必要もなく、呼吸が自然に整っていく。",
    background: "linear-gradient(140deg, rgba(48, 88, 128, 0.6), rgba(9, 24, 41, 0.9))",
    choices: [
      { text: "心の内を見つめる", next: "inner" }
    ]
  },
  teachings: {
    name: "ミドリ",
    text: "備えるとは、余白をつくること。慌ただしさの中でも、立ち止まる場所を心に用意しておくのです。",
    background: "linear-gradient(145deg, rgba(52, 81, 132, 0.65), rgba(16, 26, 51, 0.95))",
    choices: [
      { text: "余白とは？", next: "inner" }
    ]
  },
  inner: {
    name: "Narration",
    text: "瞼の裏に浮かぶ光が柔らかく揺れる。浮かんでは消えていく想いが、まるで静かな波紋のように広がった。",
    background: "linear-gradient(160deg, rgba(66, 102, 149, 0.6), rgba(14, 28, 47, 0.9))",
    choices: [
      { text: "波紋の中心を見る", next: "core" }
    ]
  },
  core: {
    name: "ミドリ",
    text: "そこにあるのは、ただ息づくあなた自身です。過去も未来も、今この瞬間を支えるためにあるのでしょう。",
    background: "linear-gradient(170deg, rgba(94, 121, 178, 0.55), rgba(16, 26, 45, 0.92))",
    choices: [
      { text: "禅然園を後にする", next: "ending" },
      { text: "もう少しここにいる", next: "stay" }
    ]
  },
  stay: {
    name: "Narration",
    text: "ゆっくりと瞼を開くと、庭の景色は変わらずそこにあった。静けさが心に溶け込んでいく。",
    background: "linear-gradient(160deg, rgba(72, 102, 152, 0.6), rgba(15, 27, 47, 0.95))",
    choices: [
      { text: "静けさを味わう", next: "ending" }
    ]
  },
  ending: {
    name: "Narration",
    text: "深い呼吸とともにあなたは立ち上がる。胸の内に芽生えた静謐は、きっと日常にも寄り添ってくれるだろう。",
    background: "linear-gradient(160deg, rgba(88, 128, 176, 0.6), rgba(18, 30, 49, 0.9))",
    choices: [
      { text: "また訪れると誓う", next: "credits" }
    ]
  },
  credits: {
    name: "ミドリ",
    text: "いつでも戻ってきてくださいね。禅然園は、あなたが静けさを思い出したくなった時に開かれますから。",
    background: "linear-gradient(160deg, rgba(112, 138, 196, 0.5), rgba(18, 30, 53, 0.92))",
    choices: [
      { text: "タイトルへ", next: "intro" }
    ]
  }
};

const elements = {
  name: document.getElementById("character-name"),
  text: document.getElementById("text"),
  background: document.getElementById("background"),
  choices: document.getElementById("choices"),
  restart: document.getElementById("restart")
};

let currentSceneId = "intro";
let typingController = null;

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
      return;
    }

    elements.text.textContent += characters[i];
    await new Promise((resolve) => setTimeout(resolve, 24));
  }
}

function renderChoices(choices) {
  elements.choices.innerHTML = "";

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "button";
    button.textContent = choice.text;
    button.addEventListener("click", () => {
      showScene(choice.next);
    });
    elements.choices.appendChild(button);
  });
}

function showScene(id) {
  const scene = story[id];
  if (!scene) {
    console.warn(`Scene '${id}' not found.`);
    return;
  }
  currentSceneId = id;

  elements.name.textContent = scene.name || "";
  elements.background.style.background = scene.background || "";
  typeText(scene.text || "");
  renderChoices(scene.choices || []);
}

elements.restart.addEventListener("click", () => {
  showScene("intro");
});

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    const firstChoice = elements.choices.querySelector(".button");
    if (firstChoice) {
      firstChoice.click();
      event.preventDefault();
    }
  }
});

showScene(currentSceneId);
