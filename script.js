/* ========================================================
   ZAKWAN'S BIG BIRTHDAY BLAST - JAVASCRIPT LOGIC
   Pure Vanilla JS • Web Audio Synthesizer • Canvas Particles
   ======================================================== */

// ========================================================
// 1. CONFIGURATION
// Keep all editable details in one configuration section
// ========================================================
const CONFIG = {
  name: "Zakwan",
  birthDate: "2017-10-31",
  birthdayAge: 9,
  password: "123456789", // Secret birthday PIN
  birthdayMessage: "Happy Birthday Zakwan!",
  music: "./assets/birthday-music.mp3",
  soundEnabled: true,
  musicEnabled: false,
  familyWishes: [
    {
      name: "Ammi",
      avatar: "🌸",
      stamp: "💌",
      message: "Happy Birthday Zakwan! May Allah bless you with happiness, good health and success."
    },
    {
      name: "Family",
      avatar: "💖",
      stamp: "🎉",
      message: "We love you, Zakwan! Have the most wonderful birthday!"
    }
  ]
};

// ========================================================
// 2. PROCEDURAL WEB AUDIO SYNTHESIZER
// 100% self-contained: works out of the box with zero external audio files!
// ========================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.musicOscInterval = null;
    this.audioElement = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Cartoon Air Puff ("*pffft!*")
  puff() {
    if (!CONFIG.soundEnabled || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.18);
      filter.Q.setValueAtTime(3, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Balloon Pop / Cloud Pop ("pop!")
  pop() {
    if (!CONFIG.soundEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(750, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  // Mega Cartoon Air Blast ("BOOOOM! PFFFFT!")
  blast() {
    if (!CONFIG.soundEnabled || !this.ctx) return;
    try {
      // White noise explosion
      const bufferSize = this.ctx.sampleRate * 0.7;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.7);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.7);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();

      // Low rumble sub-bass
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = "sine";
      sub.frequency.setValueAtTime(160, this.ctx.currentTime);
      sub.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.6);

      subGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);

      sub.connect(subGain);
      subGain.connect(this.ctx.destination);

      sub.start();
      sub.stop(this.ctx.currentTime + 0.65);
    } catch (e) {}
  }

  // Major Fanfare for victories & celebrations
  fanfare() {
    if (!CONFIG.soundEnabled || !this.ctx) return;
    try {
      const notes = [
        { f: 523.25, d: 0.12, t: 0.0 }, // C5
        { f: 659.25, d: 0.12, t: 0.14 }, // E5
        { f: 783.99, d: 0.15, t: 0.28 }, // G5
        { f: 1046.50, d: 0.45, t: 0.45 } // C6
      ];

      notes.forEach(({ f, d, t }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + t);

        gain.gain.setValueAtTime(0.4, this.ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + t + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + t);
        osc.stop(this.ctx.currentTime + t + d + 0.05);
      });
    } catch (e) {}
  }

  // Candle blow whoosh
  blow() {
    if (!CONFIG.soundEnabled || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.4);
      filter.Q.value = 1.5;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {}
  }

  // Key click
  click() {
    if (!CONFIG.soundEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  // Error buzz
  error() {
    if (!CONFIG.soundEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    } catch (e) {}
  }

  // Countdown Beep / Tick
  tick(isHigh = false) {
    if (!CONFIG.soundEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(isHigh ? 880 : 440, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch (e) {}
  }

  // Background Birthday Melody Generator (8-bit music-box Happy Birthday)
  toggleMusic(forceState) {
    if (typeof forceState === "boolean") {
      CONFIG.musicEnabled = forceState;
    } else {
      CONFIG.musicEnabled = !CONFIG.musicEnabled;
    }

    if (!CONFIG.musicEnabled) {
      if (this.musicOscInterval) {
        clearInterval(this.musicOscInterval);
        this.musicOscInterval = null;
      }
      if (this.audioElement) {
        this.audioElement.pause();
      }
      return false;
    }

    // Try playing MP3 if present, otherwise play synthesizer tune
    if (!this.audioElement && CONFIG.music) {
      this.audioElement = new Audio(CONFIG.music);
      this.audioElement.loop = true;
      this.audioElement.volume = 0.5;
    }

    if (this.audioElement) {
      this.audioElement.play().catch(() => {
        // Fallback to built-in synthesizer tune
        this.startSynthMelody();
      });
    } else {
      this.startSynthMelody();
    }
    return true;
  }

  startSynthMelody() {
    if (this.musicOscInterval || !this.ctx) return;
    // Happy Birthday notes: [freq in Hz, duration in seconds]
    const melody = [
      [261.63, 0.3], [261.63, 0.2], [293.66, 0.5], [261.63, 0.5], [349.23, 0.5], [329.63, 0.8],
      [261.63, 0.3], [261.63, 0.2], [293.66, 0.5], [261.63, 0.5], [392.00, 0.5], [349.23, 0.8],
      [261.63, 0.3], [261.63, 0.2], [523.25, 0.5], [440.00, 0.5], [349.23, 0.5], [329.63, 0.5], [293.66, 0.8],
      [466.16, 0.3], [466.16, 0.2], [440.00, 0.5], [349.23, 0.5], [392.00, 0.5], [349.23, 1.0]
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!CONFIG.musicEnabled || !this.ctx) return;
      const [freq, dur] = melody[noteIdx];
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + dur);
      } catch (e) {}

      noteIdx = (noteIdx + 1) % melody.length;
      const pause = noteIdx === 0 ? 1200 : (dur * 1000 + 40);
      this.musicOscInterval = setTimeout(playNext, pause);
    };

    playNext();
  }
}

const sound = new SoundFX();

// ========================================================
// 3. FULLSCREEN CONFETTI & FIREWORKS CANVAS ENGINE
// ========================================================
class ParticleFX {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.fireworks = [];
    this.active = true;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // Blast confetti explosion from a point or across screen
  burstConfetti(originX, originY, count = 100) {
    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#06b6d4', '#10b981', '#facc15', '#f97316'];
    const x = originX !== undefined ? originX : this.canvas.width / 2;
    const y = originY !== undefined ? originY : this.canvas.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 10 - 5,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 70 + 80,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }
  }

  // Firework burst for grand celebrations
  addFirework(x, y) {
    const colors = ['#fde047', '#38bdf8', '#f43f5e', '#4ade80', '#c084fc', '#fb923c'];
    const fireworkColor = colors[Math.floor(Math.random() * colors.length)];
    const sparkCount = 60;

    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 / sparkCount) * i + (Math.random() * 0.2);
      const speed = Math.random() * 7 + 2;
      this.fireworks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2,
        color: fireworkColor,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.015
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update & draw Confetti
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.vx *= 0.98; // air drag
      p.rotation += p.rotSpeed;
      p.life++;

      if (p.life > p.maxLife - 20) {
        p.opacity = Math.max(0, (p.maxLife - p.life) / 20);
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();

      if (p.life >= p.maxLife || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
      }
    }

    // Update & draw Fireworks
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const f = this.fireworks[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.08; // subtle gravity
      f.alpha -= f.decay;

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, f.alpha);
      this.ctx.fillStyle = f.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = f.color;
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();

      if (f.alpha <= 0) {
        this.fireworks.splice(i, 1);
      }
    }

    requestAnimationFrame(this.loop);
  }
}

// Global particle instance initialized after DOM loads
let fx;

// ========================================================
// 4. MAIN APP CONTROLLER
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("fx-canvas");
  fx = new ParticleFX(canvasEl);

  // App DOM Elements
  const passwordScreen = document.getElementById("password-screen");
  const mysteryScreen = document.getElementById("mystery-screen");
  const revealOverlay = document.getElementById("reveal-overlay");
  const revealScene = document.getElementById("reveal-scene");
  const megaCloud = document.getElementById("mega-cloud");
  const countdownBanner = document.getElementById("countdown-banner");
  const countdownNumber = document.getElementById("countdown-number");
  const blastTextPfft = document.getElementById("blast-text-pfft");
  const blastTextBoom = document.getElementById("blast-text-boom");
  const revealCard = document.getElementById("reveal-card");
  const mainDashboard = document.getElementById("main-dashboard");
  const grandFinaleModal = document.getElementById("grand-finale-modal");

  // Global Header Controls
  const soundToggleBtn = document.getElementById("sound-toggle-btn");
  const musicToggleBtn = document.getElementById("music-toggle-btn");
  const replayBtn = document.getElementById("replay-btn");

  // Setup Sound Toggle
  soundToggleBtn.addEventListener("click", () => {
    sound.init();
    CONFIG.soundEnabled = !CONFIG.soundEnabled;
    soundToggleBtn.classList.toggle("active", CONFIG.soundEnabled);
    soundToggleBtn.querySelector(".btn-icon").textContent = CONFIG.soundEnabled ? "🔊" : "🔇";
    soundToggleBtn.querySelector(".btn-label").textContent = CONFIG.soundEnabled ? "Sound ON" : "Sound OFF";
    if (CONFIG.soundEnabled) sound.click();
  });

  // Setup Music Toggle
  musicToggleBtn.addEventListener("click", () => {
    sound.init();
    const isPlaying = sound.toggleMusic();
    musicToggleBtn.classList.toggle("active", isPlaying);
    musicToggleBtn.querySelector(".btn-label").textContent = isPlaying ? "Music ON" : "Music OFF";
  });

  // Replay Opening Surprise
  replayBtn.addEventListener("click", () => {
    sound.init();
    sound.click();
    mainDashboard.classList.remove("active");
    mysteryScreen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ========================================================
  // SCREEN 0: PASSWORD PROTECTION GATE
  // ========================================================
  let enteredPin = "";
  const pinDots = document.querySelectorAll(".pin-dot");
  const passwordError = document.getElementById("password-error");
  const numpad = document.getElementById("numpad");
  const passCard = document.querySelector(".pass-card");

  function updatePinDots() {
    pinDots.forEach((dot, index) => {
      dot.classList.toggle("filled", index < enteredPin.length);
    });
  }

  function checkPassword() {
    if (enteredPin === CONFIG.password) {
      // Success!
      passwordError.textContent = "🎉 VIP Pass Unlocked! Welcome, Champion!";
      passwordError.style.color = "#15803d";
      sound.fanfare();
      fx.burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 80);

      setTimeout(() => {
        passwordScreen.classList.remove("active");
        mysteryScreen.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 700);
    } else {
      // Wrong PIN
      sound.error();
      passCard.classList.add("shake");
      passwordError.textContent = "Oops! Secret code didn't match. Try again! 🎈";
      passwordError.style.color = "#f43f5e";

      setTimeout(() => {
        passCard.classList.remove("shake");
        enteredPin = "";
        updatePinDots();
      }, 600);
    }
  }

  numpad.addEventListener("click", (e) => {
    sound.init();
    const btn = e.target.closest("button");
    if (!btn) return;

    const key = btn.dataset.key;
    if (key === "clear") {
      sound.click();
      enteredPin = "";
      passwordError.textContent = "";
      updatePinDots();
    } else if (key === "enter") {
      sound.click();
      if (enteredPin.length === 0) {
        passwordError.textContent = "Please enter the secret code first! 😊";
        return;
      }
      checkPassword();
    } else if (key) {
      if (enteredPin.length < 9) {
        sound.click();
        enteredPin += key;
        passwordError.textContent = "";
        updatePinDots();

        // Auto submit if reached 9 digits
        if (enteredPin.length === 9) {
          setTimeout(checkPassword, 150);
        }
      }
    }
  });

  // Physical Keyboard Support
  window.addEventListener("keydown", (e) => {
    if (!passwordScreen.classList.contains("active")) return;
    if (e.key >= "0" && e.key <= "9") {
      sound.init();
      if (enteredPin.length < 9) {
        sound.click();
        enteredPin += e.key;
        passwordError.textContent = "";
        updatePinDots();
        if (enteredPin.length === 9) setTimeout(checkPassword, 150);
      }
    } else if (e.key === "Backspace") {
      sound.click();
      enteredPin = enteredPin.slice(0, -1);
      updatePinDots();
    } else if (e.key === "Enter") {
      sound.click();
      checkPassword();
    }
  });

  // ========================================================
  // SCREEN 1 & 2: THE MYSTERY & BIG AIR BLAST REVEAL
  // ========================================================
  const startSurpriseBtn = document.getElementById("start-surprise-btn");
  const mysteryCloud = document.getElementById("mystery-cloud");

  mysteryCloud.addEventListener("click", () => {
    sound.init();
    sound.puff();
    mysteryCloud.classList.add("shake");
    setTimeout(() => mysteryCloud.classList.remove("shake"), 400);
  });

  startSurpriseBtn.addEventListener("click", () => {
    sound.init();
    startAirBlastReveal();
  });

  function startAirBlastReveal() {
    mysteryScreen.classList.remove("active");
    revealOverlay.classList.add("active");

    // Reset components
    megaCloud.style.transform = "scale(1)";
    countdownBanner.classList.add("hidden");
    blastTextPfft.classList.add("hidden");
    blastTextBoom.classList.add("hidden");
    revealCard.classList.add("hidden");
    document.body.classList.remove("screen-rumble");

    // Sequence 1: Cloud starts wobbling & growing
    sound.puff();
    megaCloud.style.transition = "transform 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
    megaCloud.style.transform = "scale(1.8)";

    // Sequence 2: Screen starts rumbling gently
    setTimeout(() => {
      document.body.classList.add("screen-rumble");
      sound.tick(false);
    }, 1200);

    // Sequence 3: Comic Countdown 3... 2... 1...
    setTimeout(() => {
      countdownBanner.classList.remove("hidden");
      countdownNumber.textContent = "3";
      sound.tick(false);
    }, 2000);

    setTimeout(() => {
      countdownNumber.textContent = "2";
      megaCloud.style.transform = "scale(2.4)";
      sound.tick(false);
    }, 2900);

    setTimeout(() => {
      countdownNumber.textContent = "1";
      megaCloud.style.transform = "scale(3.2)";
      sound.tick(true);
    }, 3800);

    // Sequence 4: Huge Cartoon PFFFFFFT!
    setTimeout(() => {
      countdownBanner.classList.add("hidden");
      blastTextPfft.classList.remove("hidden");
      sound.puff();
    }, 4700);

    // Sequence 5: BOOOOOOM! Huge Cartoon Blast & Explosion
    setTimeout(() => {
      blastTextPfft.classList.add("hidden");
      blastTextBoom.classList.remove("hidden");
      megaCloud.style.transform = "scale(5.5)";
      megaCloud.style.opacity = "0.2";
      sound.blast();

      // Confetti storm
      fx.burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 180);
      fx.addFirework(window.innerWidth * 0.3, window.innerHeight * 0.4);
      fx.addFirework(window.innerWidth * 0.7, window.innerHeight * 0.4);
    }, 5500);

    // Sequence 6: The Grand Birthday Reveal Card
    setTimeout(() => {
      blastTextBoom.classList.add("hidden");
      document.body.classList.remove("screen-rumble");
      megaCloud.style.display = "none";
      revealCard.classList.remove("hidden");
      sound.fanfare();
      fx.burstConfetti(window.innerWidth / 2, window.innerHeight * 0.35, 120);
    }, 6600);
  }

  // Button to enter dashboard after reveal
  const enterPartyBtn = document.getElementById("enter-party-btn");
  enterPartyBtn.addEventListener("click", () => {
    sound.init();
    sound.fanfare();
    revealOverlay.classList.remove("active");
    mainDashboard.classList.add("active");
    replayBtn.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ========================================================
  // SECTION: THE GIANT BIRTHDAY CAKE & 9 CANDLES
  // ========================================================
  const blowCandlesBtn = document.getElementById("blow-candles-btn");
  const relightCandlesBtn = document.getElementById("relight-candles-btn");
  const flames = document.querySelectorAll(".flame");
  const smokes = document.querySelectorAll(".smoke");
  const cakeWishBanner = document.getElementById("cake-wish-banner");

  blowCandlesBtn.addEventListener("click", () => {
    sound.init();
    sound.blow();

    // Extinguish flames in sequential wave
    flames.forEach((flame, index) => {
      setTimeout(() => {
        flame.classList.add("extinguished");
        const smoke = smokes[index];
        if (smoke) smoke.classList.add("active");
        sound.puff();
      }, index * 100);
    });

    // Reveal wish banner & confetti
    setTimeout(() => {
      cakeWishBanner.classList.remove("hidden");
      blowCandlesBtn.classList.add("hidden");
      relightCandlesBtn.classList.remove("hidden");
      sound.fanfare();
      fx.burstConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 100);
    }, 1100);
  });

  relightCandlesBtn.addEventListener("click", () => {
    sound.init();
    sound.click();
    flames.forEach(flame => flame.classList.remove("extinguished"));
    smokes.forEach(smoke => smoke.classList.remove("active"));
    cakeWishBanner.classList.add("hidden");
    blowCandlesBtn.classList.remove("hidden");
    relightCandlesBtn.classList.add("hidden");
  });

  // ========================================================
  // SECTION: PUFF ATTACK MINI-GAME
  // ========================================================
  let puffScore = 0;
  let puffSpawnerInterval = null;
  const puffScoreEl = document.getElementById("puff-score");
  const puffProgressBar = document.getElementById("puff-progress-bar");
  const puffArena = document.getElementById("puff-arena");
  const puffStartWrap = document.getElementById("puff-start-wrap");
  const startPuffGameBtn = document.getElementById("start-puff-game-btn");
  const replayPuffGameBtn = document.getElementById("replay-puff-game-btn");
  const puffVictoryBanner = document.getElementById("puff-victory-banner");

  const comicWords = ["WHOOSH!", "SPEEDY!", "POW!", "NICE ONE!", "ZAP!", "BOING!", "AWESOME!"];

  function startPuffGame() {
    sound.init();
    sound.click();
    puffScore = 0;
    puffScoreEl.textContent = puffScore;
    puffProgressBar.style.width = "0%";
    puffStartWrap.classList.add("hidden");
    puffVictoryBanner.classList.add("hidden");

    // Clear any leftover target
    const existingPuffs = puffArena.querySelectorAll(".puff-target");
    existingPuffs.forEach(p => p.remove());

    spawnNextPuff();
    puffSpawnerInterval = setInterval(spawnNextPuff, 1400);
  }

  function spawnNextPuff() {
    if (puffScore >= 9) return;

    // Remove existing if unclicked
    const existing = puffArena.querySelector(".puff-target");
    if (existing) existing.remove();

    const target = document.createElement("div");
    target.className = "puff-target";

    const arenaW = puffArena.clientWidth;
    const arenaH = puffArena.clientHeight;
    const posX = Math.max(10, Math.min(arenaW - 90, Math.random() * (arenaW - 90)));
    const posY = Math.max(10, Math.min(arenaH - 90, Math.random() * (arenaH - 90)));

    target.style.left = `${posX}px`;
    target.style.top = `${posY}px`;

    target.innerHTML = `
      <div class="puff-target-inner">
        <span>💨</span>
      </div>
    `;

    target.addEventListener("click", (e) => {
      e.stopPropagation();
      sound.init();
      sound.pop();
      puffScore++;
      puffScoreEl.textContent = puffScore;
      puffProgressBar.style.width = `${(puffScore / 9) * 100}%`;

      // Show comic word
      const word = comicWords[Math.floor(Math.random() * comicWords.length)];
      showPraise(posX, posY, word);

      fx.burstConfetti(e.clientX, e.clientY, 25);
      target.remove();

      if (puffScore >= 9) {
        clearInterval(puffSpawnerInterval);
        setTimeout(celebratePuffVictory, 300);
      }
    });

    puffArena.appendChild(target);
  }

  function showPraise(x, y, text) {
    const praise = document.createElement("div");
    praise.className = "comic-praise";
    praise.textContent = text;
    praise.style.left = `${x}px`;
    praise.style.top = `${y}px`;
    puffArena.appendChild(praise);
    setTimeout(() => praise.remove(), 800);
  }

  function celebratePuffVictory() {
    sound.fanfare();
    puffVictoryBanner.classList.remove("hidden");
    fx.burstConfetti(window.innerWidth / 2, window.innerHeight * 0.5, 120);
  }

  startPuffGameBtn.addEventListener("click", startPuffGame);
  replayPuffGameBtn.addEventListener("click", startPuffGame);

  // ========================================================
  // SECTION: BALLOON POP CHALLENGE MINI-GAME
  // ========================================================
  let balloonScore = 0;
  let balloonSpawnerInterval = null;
  const balloonScoreEl = document.getElementById("balloon-score");
  const balloonProgressBar = document.getElementById("balloon-progress-bar");
  const balloonArena = document.getElementById("balloon-arena");
  const balloonStartWrap = document.getElementById("balloon-start-wrap");
  const startBalloonGameBtn = document.getElementById("start-balloon-game-btn");
  const replayBalloonGameBtn = document.getElementById("replay-balloon-game-btn");
  const balloonVictoryBanner = document.getElementById("balloon-victory-banner");

  const balloonColors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  function startBalloonGame() {
    sound.init();
    sound.click();
    balloonScore = 0;
    balloonScoreEl.textContent = balloonScore;
    balloonProgressBar.style.width = "0%";
    balloonStartWrap.classList.add("hidden");
    balloonVictoryBanner.classList.add("hidden");

    // Remove existing
    const existing = balloonArena.querySelectorAll(".balloon-target");
    existing.forEach(b => b.remove());

    spawnBalloon();
    balloonSpawnerInterval = setInterval(spawnBalloon, 1100);
  }

  function spawnBalloon() {
    if (balloonScore >= 9) return;

    const balloon = document.createElement("div");
    balloon.className = "balloon-target";

    const arenaW = balloonArena.clientWidth;
    const startX = Math.max(20, Math.min(arenaW - 80, Math.random() * (arenaW - 80)));
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];

    balloon.style.left = `${startX}px`;
    balloon.style.bottom = "-90px";

    balloon.innerHTML = `
      <svg class="balloon-svg" viewBox="0 0 60 75" fill="none">
        <ellipse cx="30" cy="35" rx="26" ry="32" fill="${color}" />
        <ellipse cx="22" cy="22" rx="6" ry="10" fill="rgba(255,255,255,0.4)" transform="rotate(-20 22 22)" />
        <polygon points="30,67 26,73 34,73" fill="${color}" />
      </svg>
      <div class="balloon-string"></div>
    `;

    let currentBottom = -90;
    const floatSpeed = Math.random() * 2 + 1.8;
    const swayAmp = Math.random() * 15 + 10;
    let swayAngle = 0;

    const balloonInterval = setInterval(() => {
      currentBottom += floatSpeed;
      swayAngle += 0.05;
      const swayOffset = Math.sin(swayAngle) * swayAmp;
      balloon.style.bottom = `${currentBottom}px`;
      balloon.style.transform = `translateX(${swayOffset}px)`;

      if (currentBottom > balloonArena.clientHeight + 20) {
        clearInterval(balloonInterval);
        balloon.remove();
      }
    }, 20);

    balloon.addEventListener("click", (e) => {
      e.stopPropagation();
      clearInterval(balloonInterval);
      sound.init();
      sound.pop();

      balloonScore++;
      balloonScoreEl.textContent = balloonScore;
      balloonProgressBar.style.width = `${(balloonScore / 9) * 100}%`;

      fx.burstConfetti(e.clientX, e.clientY, 35);
      balloon.remove();

      if (balloonScore >= 9) {
        clearInterval(balloonSpawnerInterval);
        setTimeout(celebrateBalloonVictory, 300);
      }
    });

    balloonArena.appendChild(balloon);
  }

  function celebrateBalloonVictory() {
    sound.fanfare();
    balloonVictoryBanner.classList.remove("hidden");
    fx.burstConfetti(window.innerWidth / 2, window.innerHeight * 0.5, 120);
  }

  startBalloonGameBtn.addEventListener("click", startBalloonGame);
  replayBalloonGameBtn.addEventListener("click", startBalloonGame);

  // ========================================================
  // SECTION: THE MYSTERY GIFT
  // ========================================================
  const openGiftBtn = document.getElementById("open-gift-btn");
  const presentBox = document.getElementById("present-box");
  const giftRevealBox = document.getElementById("gift-reveal-box");

  openGiftBtn.addEventListener("click", () => {
    sound.init();
    sound.blast();

    presentBox.classList.add("opened");
    fx.burstConfetti(window.innerWidth / 2, window.innerHeight * 0.5, 120);
    sound.fanfare();

    setTimeout(() => {
      giftRevealBox.classList.remove("hidden");
      openGiftBtn.classList.add("hidden");
    }, 600);
  });

  // ========================================================
  // SECTION: FAMILY WISHES (DYNAMIC INJECTION)
  // ========================================================
  const familyWishesContainer = document.getElementById("family-wishes-container");

  function renderFamilyWishes() {
    familyWishesContainer.innerHTML = "";
    CONFIG.familyWishes.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "envelope-card";
      card.innerHTML = `
        <div class="envelope-box" data-index="${index}">
          <div class="env-stamp">${item.stamp || "💌"}</div>
          <div class="env-sender">${item.avatar || "❤️"} From ${item.name}</div>
          <span class="env-status">Tap to open envelope</span>
          <div class="letter-content hidden">
            <p>"${item.message}"</p>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        sound.init();
        sound.click();
        const box = card.querySelector(".envelope-box");
        const letter = card.querySelector(".letter-content");
        const status = card.querySelector(".env-status");

        const isOpen = !letter.classList.contains("hidden");
        if (isOpen) {
          letter.classList.add("hidden");
          box.classList.remove("opened");
          status.textContent = "Tap to open envelope";
        } else {
          letter.classList.remove("hidden");
          box.classList.add("opened");
          status.textContent = "Letter Opened! ✨";
          sound.puff();
          fx.burstConfetti(card.getBoundingClientRect().left + 80, card.getBoundingClientRect().top + 50, 25);
        }
      });

      familyWishesContainer.appendChild(card);
    });
  }

  renderFamilyWishes();

  // ========================================================
  // SECTION: GRAND FINALE (THE BIGGEST BLAST EVER!)
  // ========================================================
  const launchFinaleBtn = document.getElementById("launch-finale-btn");
  const finaleCountdown = document.getElementById("finale-countdown");
  const finaleCountText = document.getElementById("finale-count-text");
  const finaleBlastBanner = document.getElementById("finale-blast-banner");
  const finaleRevealMessage = document.getElementById("finale-reveal-message");
  const replayFinaleBtn = document.getElementById("replay-finale-btn");
  const closeFinaleBtn = document.getElementById("close-finale-btn");

  launchFinaleBtn.addEventListener("click", () => {
    sound.init();
    startGrandFinale();
  });

  function startGrandFinale() {
    grandFinaleModal.classList.add("active");
    finaleCountdown.classList.remove("hidden");
    finaleBlastBanner.classList.add("hidden");
    finaleRevealMessage.classList.add("hidden");

    // Countdown 3... 2... 1...
    finaleCountText.textContent = "3";
    sound.tick(false);

    setTimeout(() => {
      finaleCountText.textContent = "2";
      sound.tick(false);
    }, 1000);

    setTimeout(() => {
      finaleCountText.textContent = "1";
      sound.tick(true);
    }, 2000);

    // Mega Cartoon Blast!
    setTimeout(() => {
      finaleCountdown.classList.add("hidden");
      finaleBlastBanner.classList.remove("hidden");
      sound.blast();

      // Explode fireworks across the screen
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const fxX = Math.random() * (window.innerWidth - 100) + 50;
          const fxY = Math.random() * (window.innerHeight * 0.6) + 50;
          fx.addFirework(fxX, fxY);
          sound.pop();
        }, i * 250);
      }
      fx.burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 250);
    }, 3000);

    // Final Celebration Screen Reveal
    setTimeout(() => {
      finaleBlastBanner.classList.add("hidden");
      finaleRevealMessage.classList.remove("hidden");
      sound.fanfare();
      fx.burstConfetti(window.innerWidth / 2, window.innerHeight * 0.3, 150);
    }, 4200);
  }

  replayFinaleBtn.addEventListener("click", () => {
    sound.init();
    startGrandFinale();
  });

  closeFinaleBtn.addEventListener("click", () => {
    sound.init();
    sound.click();
    grandFinaleModal.classList.remove("active");
  });
});
