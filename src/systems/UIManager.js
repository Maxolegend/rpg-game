class UIManager {
    constructor(player) {
        this.player = player;
    }

    updateHUD() {
        this.updateHealthBar();
        this.updateManaBar();
        this.updateExperienceBar();
        this.updateDebugInfo();
    }

    updateHealthBar() {
        const healthPercentage = (this.player.health / this.player.maxHealth) * 100;
        console.log(`Health Bar: ${healthPercentage}%`);
    }

    updateManaBar() {
        const manaPercentage = (this.player.mana / this.player.maxMana) * 100;
        console.log(`Mana Bar: ${manaPercentage}%`);
    }

    updateExperienceBar() {
        const experiencePercentage = (this.player.experience / this.player.maxExperience) * 100;
        console.log(`Experience Bar: ${experiencePercentage}%`);
    }

    updateDebugInfo() {
        console.log(`DEBUG: Player Stats -> Health: ${this.player.health}, Mana: ${this.player.mana}, Experience: ${this.player.experience}`);
    }
}

export default UIManager;