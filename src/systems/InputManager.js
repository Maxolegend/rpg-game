class InputManager {
    constructor() {
        this.keys = {};
        this.mouse = {
            position: { x: 0, y: 0 },
            leftButton: false,
            rightButton: false,
        };

        this.init();
    }

    init() {
        window.addEventListener('keydown', (event) => {
            this.keys[event.code] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.code] = false;
        });

        window.addEventListener('mousemove', (event) => {
            this.mouse.position.x = event.clientX;
            this.mouse.position.y = event.clientY;
        });

        window.addEventListener('mousedown', (event) => {
            if (event.button === 0) this.mouse.leftButton = true;
            if (event.button === 2) this.mouse.rightButton = true;
        });

        window.addEventListener('mouseup', (event) => {
            if (event.button === 0) this.mouse.leftButton = false;
            if (event.button === 2) this.mouse.rightButton = false;
        });
    }

    isKeyPressed(keyCode) {
        return this.keys[keyCode] || false;
    }

    getMousePosition() {
        return this.mouse.position;
    }

    isLeftButtonPressed() {
        return this.mouse.leftButton;
    }

    isRightButtonPressed() {
        return this.mouse.rightButton;
    }
}

export default InputManager;