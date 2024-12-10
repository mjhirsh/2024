export class Building {
    static whichFloor(instructions: string): number {
        let val: Array<[number]> = [];

        for (let i = 0; i < instructions.length; i++) {
            const c = instructions[i];
            if (c !== '(' && c !== ')') {
                continue;
            } else if (instructions.includes('🧝')) {
                const j = c === ')' ? 3 : -2;
                val.push([j]);
            } else if (!instructions.includes('🧝')) {
                val.push([c === '(' ? 1 : -1]);
            }
        }

        let result = 0;
        for (const kp of val) {
            result += kp[0];
        }

        return result;
    }
}
