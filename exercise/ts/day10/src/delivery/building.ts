export class Building {
    static whichFloor(instructions: string): number {
        let result = 0;

        for (let i = 0; i < instructions.length; i++) {
            const c = instructions[i];
            if (c !== '(' && c !== ')') {
                continue;
            } else if (instructions.includes('🧝')) {
                const j = c === ')' ? 3 : -2;
                result += j;
            } else if (!instructions.includes('🧝')) {
                const j = c === '(' ? 1 : -1;
                result += j;
            }
        }

        return result;
    }
}
