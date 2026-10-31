# 💨🎉 ZAKWAN'S BIG BIRTHDAY BLAST!

A funny, highly animated, interactive birthday website celebrating **Zakwan's 9th Birthday**!

## ✨ Key Features

1. **🔐 Secret Password Gate**: Playful VIP access screen. Default PIN: `123456789`.
2. **🤔 The Mystery Opening**: Wobbling, cheek-bulging little cartoon cloud with gentle "*pfft...*" animations.
3. **💨 The Big Air Blast Reveal**: 3-2-1 countdown, comic screen rumble, giant `PFFFFFFT! BOOOOM!` cartoon explosion, and confetti storm unlocking **Level 9**!
4. **🎂 Interactive Birthday Cake**: 3-tier cartoon cake with 9 glowing candles that blow out with smoke and confetti when tapped!
5. **💨 Puff Attack Mini-Game**: Fast-paced mobile-friendly game where Zakwan catches 9 cheeky cartoon clouds to become the **Puff Master**!
6. **🎈 Balloon Pop Challenge**: Pop 9 colorful floating party balloons to become the **Birthday Champion**!
7. **🎁 The Mystery Gift**: Animated shaking present box with flying lid revealing a heartwarming family tribute.
8. **👑 Zakwan's Fun Profile**: Video game player card with playful stats (Happiness 100%, Energy MAX, Fun 999, Smile Power ∞, Birthday Power UNLIMITED) and achievement badges.
9. **💌 Family Wishes**: Interactive envelopes from Ammi, Abbu, and Family with smooth flip/open animations.
10. **🎆 Grand Finale (Biggest Blast Ever!)**: Fullscreen celebration with carnival lights, spotlight, 3-2-1 countdown, mega cartoon explosion, fireworks canvas, and loving message.
11. **🔊 Zero-Dependency Web Audio Synthesizer**: Custom synthesized cartoon sound effects (puffs, pops, blasts, fanfare, candle blow, countdown ticks) and an 8-bit Happy Birthday melody generator that work 100% out of the box with zero external files.

---

## ⚙️ Configuration & Customization

Open `script.js` to modify any details inside the `CONFIG` object:

```javascript
const CONFIG = {
  name: "Zakwan",
  birthDate: "2017-10-31",
  birthdayAge: 9,
  password: "123456789", // Change the entry code here
  birthdayMessage: "Happy Birthday Zakwan!",
  music: "./assets/birthday-music.mp3", // Optional custom MP3
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
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any modern web browser, or serve it locally:

```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

Then visit `http://localhost:8000` in your browser!
Enter password `123456789` to start the adventure.

---

## 📱 Mobile Sharing

The website is 100% responsive, optimized for touchscreens, and designed specifically for sharing over WhatsApp or mobile browsers (iPhone, Android, Tablets, Desktop).
