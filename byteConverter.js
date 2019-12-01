const MAP_BIT_6 = new Map(
    [
        ["000000", ' '],
        ["000001", '.'],
        ["000010", '-'],
        ["000011", '"'],
        ["000100", '0'],
        ["000101", '1'],
        ["000110", '2'],
        ["000111", '3'],
        ["001000", '4'],
        ["001001", '5'],
        ["001010", '6'],
        ["001011", '7'],
        ["001100", '8'],
        ["001101", '9'],
        ["001110", 'А'],
        ["001111", 'Б'],
        ["010000", 'В'],
        ["010001", 'Г'],
        ["010010", 'Д'],
        ["010011", 'Е'],
        ["010100", 'Ё'],
        ["010101", 'Ж'],
        ["010110", 'З'],
        ["010111", 'И'],
        ["011000", 'Й'],
        ["011001", 'К'],
        ["011010", 'Л'],
        ["011011", 'М'],
        ["011100", 'Н'],
        ["011101", 'О'],
        ["011110", 'П'],
        ["011111", 'Р'],
        ["100000", 'С'],
        ["100001", 'Т'],
        ["100010", 'У'],
        ["100011", 'Ф'],
        ["100100", 'Х'],
        ["100101", 'Ц'],
        ["100110", 'Ч'],
        ["100111", 'Ш'],
        ["101000", 'Щ'],
        ["101001", 'Ь'],
        ["101010", 'Ъ'],
        ["101011", 'Ы'],
        ["101100", 'Э'],
        ["101101", 'Ю'],
        ["101110", 'Я'],
        ["111111", '|']
    ]);

export class ByteConverter {

    static toString(bytes) {
        if ((bytes.length * 8) % 6 != 0)
            return null;

        let stringData = '';
        let stringBinary = bytes.reduce((x, y) => x + this.toBinaryString(y), '');

        for (let i = 0; i < stringBinary.length;) {
            let current = stringBinary.slice(i, i += 6);
            stringData += MAP_BIT_6.get(current) || ' ';
        }

        return stringData;
    }

    static toBinaryString(byte) {
        return byte.toString(2).padStart(8, '0');
    }

    static toDate(bytes) {
        let daysCount = (bytes[0] << 8) + bytes[1];
        if (daysCount == 0)
            return null;
        return new Date(Date.UTC(1900, 0, 1 + daysCount));
    }

    static toUInt64(bytes) {
        return bytes.reduce((a, c, i) => a + c * 2 ** (56 - i * 8), 0);
    }
}