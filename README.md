# ⚔️ Dungeon Quest - RPG Game

A text-based dungeon crawler RPG game built with vanilla JavaScript, HTML, and CSS.

## Features

### 🎮 Gameplay
- **Turn-based Combat**: Engage in exciting battles with various enemies
- **Enemy Variety**: Fight Goblins, Orcs, Trolls, Shadow Knights, and even Dragons
- **Level Progression**: Gain experience, level up, and increase your stats
- **Item System**: Collect and use weapons, armor, and potions

### ⚙️ Game Mechanics
- **Character Stats**:
  - HP (Health Points)
  - Mana (for casting spells)
  - Attack Power
  - Defense
  - Gold Currency
  - Experience Points

- **Battle Actions**:
  - **Attack**: Basic physical attack
  - **Cast Fireball**: Spell attack (costs 20 Mana)
  - **Heal**: Restore health (costs 15 Mana)

- **Shop System**:
  - Buy Iron Sword (50 gold) - +5 Attack
  - Buy Steel Armor (75 gold) - +3 Defense
  - Buy Health Potion (25 gold) - Restore 50 HP
  - Buy Mana Potion (20 gold) - Restore 30 Mana

- **Other Features**:
  - Rest to recover HP and Mana
  - Use items from inventory during battle
  - Dynamic difficulty scaling with leveling
  - Real-time stat updates

## How to Play

1. Open `index.html` in your web browser
2. Click "Start Game" to begin your adventure
3. Choose your action:
   - **Explore Dungeon**: Enter a battle with a random enemy
   - **Visit Shop**: Buy items and equipment
   - **Rest**: Recover all HP and Mana

### During Battle
- Select an action each turn
- Defeat enemies to gain experience and gold
- Buy equipment to increase your power
- Level up to improve your stats

## Game Balance

### Enemy Stats by Level
| Enemy | Level | HP | ATK | DEF | EXP | Gold |
|-------|-------|----|----|-----|-----|------|
| Goblin | 1 | 30 | 5 | 2 | 25 | 10 |
| Orc | 2 | 50 | 8 | 3 | 50 | 25 |
| Troll | 3 | 80 | 12 | 5 | 100 | 50 |
| Shadow Knight | 4 | 120 | 15 | 6 | 150 | 100 |
| Dragon | 5 | 150 | 20 | 8 | 250 | 150 |

### Progression
- Each level up increases:
  - Max HP: +20
  - Max Mana: +10
  - Attack: +5
  - Defense: +2
  - EXP to next level: ×1.5

## File Structure

```
rpg-game/
├── index.html      # Main HTML file with game layout
├── style.css       # Styling and animations
├── game.js         # Game logic and classes
└── README.md       # This file
```

## Classes

### Player
- Manages character stats, inventory, and health
- Handles experience and leveling
- Tracks equipped items

### Enemy
- Defines enemy properties and behavior
- Calculates damage taken

### Game
- Controls game flow and turn-based combat
- Manages UI updates
- Handles shop and inventory systems

### Item
- Represents equipment and consumables
- Stores item properties and descriptions

## Keyboard & Mouse Controls

- **Click Buttons**: Perform actions
- **Click Items**: Use items from inventory during battle

## Future Enhancements

Potential features for expansion:
- More enemy types and boss battles
- Equipment slots and stats modifications
- Quest system
- Multiple dungeons with increasing difficulty
- Party system
- Skill trees
- Save/Load functionality
- Sound effects and music

## Browser Support

Works on all modern browsers supporting:
- ES6 JavaScript
- CSS Grid and Flexbox
- Local Storage (future enhancement)

## Tips for Playing

1. **Early Game**: Buy a sword to increase damage output
2. **Save Gold**: Prioritize health potions for survival
3. **Armor Later**: Defense becomes more important at higher levels
4. **Mana Management**: Plan spell usage carefully
5. **Grinding**: Defeat lower-level enemies to gain easy gold and experience
6. **Potions**: Keep potions for emergency healing during tough fights

## License

Feel free to modify and expand this game!

---

**Made with ❤️ using vanilla JavaScript**
