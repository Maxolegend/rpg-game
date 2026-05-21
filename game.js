// ==================== ITEM SYSTEM ====================
class Item {
    constructor(name, type, value, description) {
        this.name = name;
        this.type = type; // 'weapon', 'armor', 'potion', 'misc'
        this.value = value;
        this.description = description;
    }
}

// ==================== PLAYER CLASS ====================
class Player {
    constructor(name) {
        this.name = name;
        this.level = 1;
        this.experience = 0;
        this.expToLevel = 100;
        this.maxHP = 100;
        this.hp = 100;
        this.maxMana = 50;
        this.mana = 50;
        this.attack = 10;
        this.defense = 5;
        this.gold = 0;
        this.inventory = [];
        this.equippedWeapon = null;
        this.equippedArmor = null;
    }

    takeDamage(amount) {
        const damage = Math.max(1, amount - (this.defense * 0.1));
        this.hp = Math.max(0, this.hp - damage);
        return Math.floor(damage);
    }

    heal(amount) {
        this.hp = Math.min(this.maxHP, this.hp + amount);
    }

    addExperience(amount) {
        this.experience += amount;
        if (this.experience >= this.expToLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.experience = 0;
        this.expToLevel = Math.floor(this.expToLevel * 1.5);
        this.maxHP += 20;
        this.hp = this.maxHP;
        this.maxMana += 10;
        this.mana = this.maxMana;
        this.attack += 5;
        this.defense += 2;
        game.addLog(`🎉 LEVEL UP! You are now level ${this.level}!`, 'info');
    }

    addItem(item) {
        this.inventory.push(item);
    }

    removeItem(index) {
        this.inventory.splice(index, 1);
    }

    addGold(amount) {
        this.gold += amount;
    }

    getAttackPower() {
        let power = this.attack;
        if (this.equippedWeapon) {
            power += this.equippedWeapon.value;
        }
        return power + Math.floor(Math.random() * 5); // Add some variance
    }
}

// ==================== ENEMY CLASS ====================
class Enemy {
    constructor(name, level, maxHP, attack, defense, expReward, goldReward) {
        this.name = name;
        this.level = level;
        this.maxHP = maxHP;
        this.hp = maxHP;
        this.attack = attack;
        this.defense = defense;
        this.expReward = expReward;
        this.goldReward = goldReward;
    }

    takeDamage(amount) {
        const damage = Math.max(1, amount - (this.defense * 0.1));
        this.hp = Math.max(0, this.hp - damage);
        return Math.floor(damage);
    }

    getAttackPower() {
        return this.attack + Math.floor(Math.random() * 5);
    }
}

// ==================== GAME CLASS ====================
class Game {
    constructor() {
        this.player = null;
        this.currentEnemy = null;
        this.inBattle = false;
        this.gameActive = false;
        this.enemies = [
            { name: 'Goblin', level: 1, hp: 30, atk: 5, def: 2, exp: 25, gold: 10 },
            { name: 'Orc', level: 2, hp: 50, atk: 8, def: 3, exp: 50, gold: 25 },
            { name: 'Troll', level: 3, hp: 80, atk: 12, def: 5, exp: 100, gold: 50 },
            { name: 'Dragon', level: 5, hp: 150, atk: 20, def: 8, exp: 250, gold: 150 },
            { name: 'Shadow Knight', level: 4, hp: 120, atk: 15, def: 6, exp: 150, gold: 100 },
        ];
    }

    start() {
        this.gameActive = true;
        this.player = new Player('Adventurer');
        
        this.updateUI();
        this.showStory('You awaken in a dark dungeon with no memory of how you got here. ' +
                       'Your only hope is to fight your way out. \n\n' +
                       'Steel yourself, brave adventurer...');
        this.showActions();
    }

    startBattle() {
        this.inBattle = true;
        const randomEnemy = this.enemies[Math.floor(Math.random() * this.enemies.length)];
        this.currentEnemy = new Enemy(
            randomEnemy.name,
            randomEnemy.level,
            randomEnemy.hp,
            randomEnemy.atk,
            randomEnemy.def,
            randomEnemy.exp,
            randomEnemy.gold
        );
        this.addLog(`⚔️ You encountered a ${this.currentEnemy.name}!`, 'enemy');
        this.updateUI();
        this.showBattleActions();
    }

    playerAttack() {
        if (!this.inBattle || !this.gameActive) return;

        const damage = this.player.getAttackPower();
        const actualDamage = this.currentEnemy.takeDamage(damage);
        this.addLog(`You attack for ${actualDamage} damage!`, 'damage');

        if (this.currentEnemy.hp <= 0) {
            this.endBattle(true);
            return;
        }

        setTimeout(() => this.enemyAttack(), 500);
    }

    enemyAttack() {
        if (!this.inBattle) return;

        const damage = this.currentEnemy.getAttackPower();
        const actualDamage = this.player.takeDamage(damage);
        this.addLog(`${this.currentEnemy.name} attacks for ${actualDamage} damage!`, 'enemy');

        if (this.player.hp <= 0) {
            this.endBattle(false);
            return;
        }

        this.updateUI();
    }

    playerCast() {
        if (!this.inBattle || !this.gameActive) return;

        if (this.player.mana < 20) {
            this.addLog('Not enough mana!', 'info');
            return;
        }

        this.player.mana -= 20;
        const damage = this.player.getAttackPower() * 1.5;
        const actualDamage = this.currentEnemy.takeDamage(damage);
        
        this.addLog(`🔥 You cast Fireball for ${Math.floor(actualDamage)} damage!`, 'critical');

        if (this.currentEnemy.hp <= 0) {
            this.endBattle(true);
            return;
        }

        setTimeout(() => this.enemyAttack(), 500);
    }

    playerHeal() {
        if (!this.inBattle || !this.gameActive) return;

        if (this.player.mana < 15) {
            this.addLog('Not enough mana!', 'info');
            return;
        }

        this.player.mana -= 15;
        const healAmount = 30;
        this.player.heal(healAmount);
        
        this.addLog(`💚 You heal for ${healAmount} HP!`, 'heal');

        setTimeout(() => this.enemyAttack(), 500);
    }

    endBattle(won) {
        this.inBattle = false;

        if (won) {
            this.addLog(`🎉 You defeated the ${this.currentEnemy.name}!`, 'info');
            this.player.addExperience(this.currentEnemy.expReward);
            this.player.addGold(this.currentEnemy.goldReward);
            this.addLog(`Gained ${this.currentEnemy.expReward} EXP and ${this.currentEnemy.goldReward} gold!`, 'info');
        } else {
            this.addLog('💀 You have been defeated!', 'damage');
            this.gameActive = false;
        }

        this.currentEnemy = null;
        this.updateUI();
        this.showActions();
    }

    usePotionFromInventory(index) {
        const item = this.player.inventory[index];
        if (item.type === 'potion') {
            this.player.heal(item.value);
            this.addLog(`Used ${item.name} and healed for ${item.value} HP!`, 'heal');
            this.player.removeItem(index);
            this.updateUI();
            
            if (this.inBattle) {
                setTimeout(() => this.enemyAttack(), 500);
            }
        }
    }

    visitShop() {
        this.inBattle = false;
        this.showStory(
            '=== ARMOR SHOP ===\n\n' +
            'Welcome, adventurer! Here are our finest goods:\n\n' +
            '🗡️ Iron Sword - 50 gold (ATK +5)\n' +
            '🛡️ Steel Armor - 75 gold (DEF +3)\n' +
            '⚗️ Health Potion - 25 gold (Heal 50 HP)\n' +
            '⚗️ Mana Potion - 20 gold (Restore 30 Mana)\n\n' +
            'Your gold: ' + this.player.gold
        );
        this.showShopActions();
    }

    buyItem(itemType) {
        let item = null;
        let cost = 0;

        switch (itemType) {
            case 'sword':
                item = new Item('Iron Sword', 'weapon', 5, 'Increases attack power');
                cost = 50;
                break;
            case 'armor':
                item = new Item('Steel Armor', 'armor', 3, 'Increases defense');
                cost = 75;
                break;
            case 'potion':
                item = new Item('Health Potion', 'potion', 50, 'Restores 50 HP');
                cost = 25;
                break;
            case 'mana':
                item = new Item('Mana Potion', 'potion', 30, 'Restores 30 Mana');
                cost = 20;
                break;
        }

        if (this.player.gold >= cost) {
            this.player.gold -= cost;
            this.player.addItem(item);
            this.addLog(`Purchased ${item.name}!`, 'info');
        } else {
            this.addLog('Not enough gold!', 'info');
        }

        this.updateUI();
    }

    showStory(text) {
        document.getElementById('storyText').innerHTML = `<p>${text}</p>`;
    }

    showActions() {
        const buttonsDiv = document.getElementById('actionButtons');
        
        if (!this.gameActive) {
            buttonsDiv.innerHTML = `
                <button class="btn btn-primary" onclick="location.reload()">Play Again</button>
            `;
            return;
        }

        buttonsDiv.innerHTML = `
            <button class="btn btn-danger" onclick="game.startBattle()">Explore Dungeon</button>
            <button class="btn btn-warning" onclick="game.visitShop()">Visit Shop</button>
            <button class="btn btn-success" onclick="game.rest()">Rest</button>
        `;
    }

    showBattleActions() {
        const buttonsDiv = document.getElementById('actionButtons');
        buttonsDiv.innerHTML = `
            <button class="btn btn-danger" onclick="game.playerAttack()">Attack</button>
            <button class="btn btn-warning" onclick="game.playerCast()">Cast Fireball</button>
            <button class="btn btn-success" onclick="game.playerHeal()">Heal</button>
        `;
    }

    showShopActions() {
        const buttonsDiv = document.getElementById('actionButtons');
        buttonsDiv.innerHTML = `
            <button class="btn btn-primary" onclick="game.buyItem('sword')">Buy Sword (50g)</button>
            <button class="btn btn-primary" onclick="game.buyItem('armor')">Buy Armor (75g)</button>
            <button class="btn btn-primary" onclick="game.buyItem('potion')">Buy Health Potion (25g)</button>
            <button class="btn btn-primary" onclick="game.buyItem('mana')">Buy Mana Potion (20g)</button>
            <button class="btn btn-warning" colspan="2" onclick="game.showActions()">Return to Dungeon</button>
        `;
    }

    rest() {
        if (!this.gameActive) return;
        
        this.player.hp = this.player.maxHP;
        this.player.mana = this.player.maxMana;
        this.addLog('You rest and recover all HP and Mana.', 'heal');
        this.updateUI();
        this.showActions();
    }

    updateUI() {
        // Update character stats
        document.getElementById('charName').textContent = this.player.name;
        document.getElementById('charLevel').textContent = this.player.level;
        document.getElementById('charExp').textContent = `${this.player.experience}/${this.player.expToLevel}`;
        document.getElementById('charHP').textContent = `${Math.floor(this.player.hp)}/${this.player.maxHP}`;
        document.getElementById('charMana').textContent = `${Math.floor(this.player.mana)}/${this.player.maxMana}`;
        document.getElementById('charAtk').textContent = this.player.attack;
        document.getElementById('charDef').textContent = this.player.defense;
        document.getElementById('charGold').textContent = this.player.gold;

        // Update bars
        const hpPercent = (this.player.hp / this.player.maxHP) * 100;
        const manaPercent = (this.player.mana / this.player.maxMana) * 100;
        document.getElementById('hpBar').style.width = hpPercent + '%';
        document.getElementById('manaBar').style.width = manaPercent + '%';

        // Update inventory
        this.updateInventory();

        // Update enemy info
        this.updateEnemyInfo();
    }

    updateInventory() {
        const inventoryDiv = document.getElementById('inventoryList');
        
        if (this.player.inventory.length === 0) {
            inventoryDiv.innerHTML = '<p class="empty-msg">Empty</p>';
            return;
        }

        let html = '';
        this.player.inventory.forEach((item, index) => {
            html += `
                <div class="inventory-item" onclick="game.usePotionFromInventory(${index})">
                    <div class="item-name">${item.name}</div>
                    <div class="item-desc">${item.description}</div>
                </div>
            `;
        });
        inventoryDiv.innerHTML = html;
    }

    updateEnemyInfo() {
        const enemyDiv = document.getElementById('enemyInfo');
        
        if (!this.currentEnemy) {
            enemyDiv.innerHTML = '<p class="empty-msg">No enemy encountered</p>';
            return;
        }

        const hpPercent = (this.currentEnemy.hp / this.currentEnemy.maxHP) * 100;
        enemyDiv.innerHTML = `
            <div class="enemy-stats">
                <div class="enemy-name">${this.currentEnemy.name}</div>
                <div class="enemy-stat">
                    <span>HP:</span>
                    <span>${Math.floor(this.currentEnemy.hp)}/${this.currentEnemy.maxHP}</span>
                </div>
                <div class="hp-bar" style="margin: 10px 0;">
                    <div class="hp-fill" style="width: ${hpPercent}%"></div>
                </div>
                <div class="enemy-stat">
                    <span>Level:</span>
                    <span>${this.currentEnemy.level}</span>
                </div>
                <div class="enemy-stat">
                    <span>Attack:</span>
                    <span>${this.currentEnemy.attack}</span>
                </div>
                <div class="enemy-stat">
                    <span>Defense:</span>
                    <span>${this.currentEnemy.defense}</span>
                </div>
            </div>
        `;
    }

    addLog(message, type = 'info') {
        const logDiv = document.getElementById('battleLog');
        const entry = document.createElement('p');
        entry.className = `log-entry ${type}`;
        entry.textContent = message;
        logDiv.appendChild(entry);
        logDiv.scrollTop = logDiv.scrollHeight;
    }
}

// ==================== INITIALIZE GAME ====================
const game = new Game();
