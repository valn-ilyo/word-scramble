# Word Scramble

A fast-paced party word game for 2+ teams. Unscramble words, earn points, and survive the chaos of random cards.

---

## How to Play

A scrambled word appears on screen with a clue beneath it. Use the **Team Tracker** to award or adjust points as rounds are played. After every correct answer a card is drawn. Cards set the tone for what comes next, some taking effect before the next word, others immediately after.

The first team to reach the **target score** finishes. The game continues until all remaining teams finish or you hit **END GAME**. Final rankings are shown on the results screen.

In **Infinite mode** (target set to ∞) there is no finish line. End the game manually whenever you like.

---

## Settings

### Word Pack

The word pool is organised into **packs**, each representing a category of words the game draws from. Within a pack, **subpacks** let you narrow the pool to a specific topic or difficulty. Select a subpack to play only those words, or leave it on **All** to draw from the entire pack.

Words are marked as used once played and won't appear again in the same session. The **↺ reset button** next to the active subpack clears only that subpack's used words, leaving all other progress untouched.

### Target Score

Set the number of points a team needs to win. Use **-** and **+** to adjust, or set to **∞** for an open-ended game with no finish line.

### Card Draw Weights

Control how often each card appears. The weight is a relative multiplier:

- **x1** = baseline (equal chance with other x1 cards)
- **x3** = three times as likely to be drawn
- **x0 / OFF** = card removed from the deck entirely

### Theme

Choose a visual theme for the game. See [Adding a Theme](#adding-a-theme) to create your own.

---

## Team Tracker

The sidebar during play shows each team's score and a progress bar toward the target. Use the **-** and **+** buttons to manually adjust points at any time.

---

## Extending the Game

Everything, word packs, cards, and themes, is data-driven and plugged in through a single registration step.

### Adding a Word Pack

1. Create `src/data/words/yourpack.ts` exporting a `WordPack`.
2. Register it in `src/data/words/index.ts`. The pack appears in Settings automatically.

Each pack can define **subpacks** to group words by difficulty, topic, or any other dimension:

```ts
{
  id: "my-pack",
  label: "My Pack",
  subPacks: [
    { id: "easy", label: "Easy", words: [...] },
    { id: "hard", label: "Hard", words: [...] },
  ],
}
```

**Composite subpacks** merge multiple base subpacks into one pool using `subPackRefs`, useful for longer sessions or mixed-difficulty rounds:

```ts
{
  id: "mixed",
  label: "Mixed",
  words: [],
  subPackRefs: ["easy", "hard"],
}
```

### Adding a Card

Add an entry to the `cards` array in `src/data/cards.ts`:

```ts
{
  id: "my-card",
  name: "My Card",
  description: "What this card does.",
  weight: 1,
  type: "before",   // "before" | "after" | "both"
  color: "#FF6D00",
  icon: "mdi-icon-name",
}
```

- `type: "before"` fires before the next word is attempted
- `type: "after"` fires after a correct answer
- `type: "both"` can fire at either moment

The card appears in Settings (with weight controls) and in the card preview automatically.

### Adding a Theme

Add an entry to the `themes` array in `src/data/themes.ts` with your CSS variable values. The theme appears in Settings immediately.

---

## Tech Stack

- **Vue 3** + Composition API
- **TypeScript**
- **Pinia** (state + persistence)
- **Vuetify 3** (UI components)
- **Vite**
