export interface Card {
  id: string;
  name: string;
  description: string;
  weight: number;
  type: "before" | "after" | "both";
  color: string;
  icon: string;
}

export const jokerJokes: string[] = [
  "Why do bees have sticky hair? Because they use a honeycomb.",
  "I asked the librarian if they had books about paranoia. She whispered: they're right behind you.",
  "What's a vampire's favourite fruit? A blood orange. Just kidding, it's a neck-tarine.",
  "Why did the superhero flush the toilet? Because it was his doody.",
  "What do you call a man who can't stand? Neil.",
  "Did you hear about the claustrophobic astronaut? He just needed a little space.",
  "I tried to come up with a carpentry joke. But I'm still nailing it.",
  "What do sprinters eat before a race? Nothing — they fast.",
  "Why do French people eat only one egg for breakfast? Because one egg is un oeuf.",
  "I have a joke about paper. It's tearable.",
  "What do you call a dog that does magic tricks? A labracadabrador.",
  "Why did the calendar go to therapy? It had too many dates.",
  "My wife told me to stop acting like a flamingo. I had to put my foot down.",
  "What do you call a man who irons? Fernando.",
  "I told my boss three companies were after me and I needed a raise. He asked which ones. I said gas, electricity and water.",
  "Why can't Elsa have a balloon? She'll let it go.",
  "What do you call a guy who's had too much to drink? A cab.",
  "I only know 25 letters of the alphabet. I don't know y.",
  "Why does Waldo wear stripes? Because he doesn't want to be spotted.",
  "What did the janitor say when he jumped out of the closet? Supplies!",
  "Why did the bank robber take a bath? He wanted to make a clean getaway.",
  "What do you call an eagle that can play piano? Talonted.",
  "Why are elevators so funny? Because they work on so many levels.",
  "I'm terrified of elevators. I'm going to start taking steps to avoid them.",
  "What do you call a sad cup of coffee? A depresso.",
  "Why don't scientists trust atoms? Because they make up everything.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "I'm reading a book about anti-gravity. It's impossible to put down.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "What do you call a fake noodle? An impasta.",
  "I would tell you a joke about construction, but I'm still working on it.",
  "What did the ocean say to the beach? Nothing, it just waved.",
  "Why did the math book look so sad? Because it had too many problems.",
  "I asked my dog what two minus two is. He said nothing.",
  "What do you call cheese that isn't yours? Nacho cheese.",
  "Why did the bicycle fall over? Because it was two-tired.",
  "How do you organize a space party? You planet.",
  "What do you call a sleeping dinosaur? A dino-snore.",
  "Why did the golfer bring an extra pair of pants? In case he got a hole in one.",
  "I used to hate facial hair, but then it grew on me.",
  "What do you call a bear with no teeth? A gummy bear.",
  "Why can't a nose be 12 inches long? Because then it'd be a foot.",
  "What did one wall say to the other? I'll meet you at the corner.",
  "Why do cows wear bells? Because their horns don't work.",
  "What do you call a fish without eyes? A fsh.",
  "I'm on a seafood diet. I see food and I eat it.",
  "Why did the invisible man turn down the job offer? He couldn't see himself doing it.",
  "What do you call a boomerang that won't come back? A stick.",
  "I told my doctor I broke my arm in two places. He told me to stop going to those places.",
  "Why did the tomato turn red? Because it saw the salad dressing.",
  "What do you call a pony with a cough? A little horse.",
  "I'm great at sleeping. I can do it with my eyes closed.",
  "Why don't skeletons fight each other? They don't have the guts.",
  "I told my wife she should embrace her mistakes. She gave me a hug.",
  "What do you call a man with no arms and no legs in a pool? Bob.",
  "Why did the stadium get hot after the game? All the fans left.",
  "I wrote a song about a tortilla. Well, it's more of a wrap.",
  "What do you call an alligator in a vest? An investigator.",
  "Why did the cookie go to the doctor? Because it was feeling crummy.",
  "What do prisoners use to call each other? Cell phones.",
  "I used to be a banker, but I lost interest.",
  "Why did the belt go to jail? For holding up a pair of pants.",
  "What do you call a snowman with a six-pack? An abdominal snowman.",
  "I'm reading a book about mazes. I got lost in it.",
  "Why can't you hear a pterodactyl going to the bathroom? Because the P is silent.",
  "What do you call a factory that makes okay products? A satisfactory.",
  "Why did the picture go to jail? Because it was framed.",
  "I'd tell you a joke about time travel, but you didn't like it.",
  "What do you call a parade of rabbits hopping backward? A receding hare-line.",
  "Why did the scarecrow become a successful politician? He was outstanding in his field.",
  "What do you call a lazy kangaroo? A pouch potato.",
  "I have a joke about a roof, but it's over your head.",
];

// Weights are relative multipliers — 1 = baseline equal chance, 2 = twice as likely, 0 = excluded.
// No upper limit; drawCard normalises internally against whatever the weights sum to.
export const cards: Card[] = [
  {
    id: "hint",
    name: "Hint",
    description: "The first letter of the answer is revealed on the next word.",
    weight: 1,
    type: "before",
    color: "#00E5FF",
    icon: "mdi-lightbulb",
  },
  {
    id: "joker",
    name: "Joker",
    description:
      "A wild card — brace for a joke, or absolutely nothing. You'll see.",
    weight: 1,
    type: "both",
    color: "#FFD600",
    icon: "mdi-cards-playing",
  },
  {
    id: "one",
    name: "One",
    description: "Only one player may attempt to answer the next word!",
    weight: 1,
    type: "before",
    color: "#FF6D00",
    icon: "mdi-rotate-left",
  },
  {
    id: "jeopardy",
    name: "Jeopardy",
    description:
      "The point earned this round must be given to another team of your choice.",
    weight: 1,
    type: "after",
    color: "#76FF03",
    icon: "mdi-arrow-right-bold",
  },
  {
    id: "jackpot",
    name: "Jackpot",
    description: "The winning team scores 3 points instead of 1!",
    weight: 1,
    type: "after",
    color: "#FFD600",
    icon: "mdi-trophy",
  },
  {
    id: "cannon",
    name: "Cannon",
    description:
      "The winning team gets a ping pong ball to throw at another team!",
    weight: 1,
    type: "after",
    color: "#FF6D00",
    icon: "mdi-baseball",
  },
  {
    id: "gamble",
    name: "Gamble",
    description: "Take the risk! Win: +5 points. Lose: −3 points.",
    weight: 1,
    type: "after",
    color: "#FF1744",
    icon: "mdi-cash",
  },
  {
    id: "team_shift",
    name: "Team Shift",
    description: "Current players must rotate to the next team!",
    weight: 1,
    type: "before",
    color: "#D500F9",
    icon: "mdi-swap-horizontal",
  },
  {
    id: "brain_drain",
    name: "Brain Drain",
    description: "Swap a member of your team with anyone from another team!",
    weight: 1,
    type: "after",
    color: "#00E676",
    icon: "mdi-brain",
  },
];

/** Draw a card using relative weights. Zero-weight cards are excluded. */
export function drawCard(weightOverrides: Record<string, number> = {}): Card {
  const pool = cards
    .map((c) => ({ card: c, w: weightOverrides[c.id] ?? c.weight }))
    .filter(({ w }) => w > 0);
  if (!pool.length) return cards[0];
  const total = pool.reduce((s, { w }) => s + w, 0);
  let r = Math.random() * total;
  for (const { card, w } of pool) {
    r -= w;
    if (r <= 0) return card;
  }
  return pool[0].card;
}
