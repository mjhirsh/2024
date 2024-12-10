export class Building {
    static whichFloor(instructions: string): number {
        let floor = 0;

        for (let i = 0; i < instructions.length; i++) {
            const character = instructions[i];
            if (this.isInvalidCharacter(character)) {
                continue;
            } else if (instructions.includes('🧝')) {
                floor += this.modifierForInstructionsWithEmoji(character);
            } else {
                floor += this.modifierForInstructionsWithoutEmoji(character);
            }
        }

        return floor;
    }

    private static modifierForInstructionsWithoutEmoji(
        character: string
    ): number {
        return character === '(' ? 1 : -1;
    }

    private static modifierForInstructionsWithEmoji(character) {
        return character === ')' ? 3 : -2;
    }

    private static isInvalidCharacter(character: string): boolean {
        return character !== '(' && character !== ')';
    }
}
