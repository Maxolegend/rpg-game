class CombatSystem {
    constructor() {
        this.damageLog = [];
    }

    calculateDamage(attack, defense) {
        // Simple damage calculation
        const damage = attack - defense;
        return damage > 0 ? damage : 0;
    }

    applyDamage(target, damage) {
        target.health -= damage;
        this.logDamage(target, damage);
    }

    logDamage(target, damage) {
        this.damageLog.push({ target: target.name, damage: damage, time: new Date().toISOString() });
    }

    getDamageLog() {
        return this.damageLog;
    }
}

export default CombatSystem;