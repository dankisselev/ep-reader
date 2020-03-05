import { ByteConverter } from './byteConverter.js';

export class EPReader {

    constructor() { }

    readFromArrayBuffer(buffer) {
        return this.readFromBytesArray(new Uint8Array(buffer));
    }

    readFromBytesArray(bytes) {
        let version = bytes[0];
        if (version == 2) {
            return this.getFromV2(bytes);
        } else if (version == 1) {
            return this.getFromV1(bytes);
        }
        return null;
    }

    readFromHexString(hexString) {
        let bytes = [];
        for (let i = 0; i < hexString.length;) {
            bytes.push(parseInt(hexString.slice(i, i += 2), 16));
        }
        return this.readFromBytesArray(bytes);
    }

    getFromV2(bytes) {
        let enp = ByteConverter.toUInt64(bytes.slice(1, 9)).toString().padStart(16, '0');
        let names = ByteConverter.toString(bytes.slice(9, 60));
        let [surname, name1, name2] = [null, null, null];
        if (names)
            [surname, name1, name2] = names.trim().split('|');
        let sex = bytes[60];
        let birthDate = ByteConverter.toDate(bytes.slice(61, 63));
        let expireDate = ByteConverter.toDate(bytes.slice(63, 65));

        return { version: 2, enp, surname, name1, name2, sex, birthDate, expireDate };
    }
    
    getFromV1(bytes) {
        let enp = this.toUInt64(bytes.slice(1, 9)).toString().padStart(16, '0');
        let names = this.toString(bytes.slice(9, 51).reverse());
        let [surname, name1, name2] = [null, null, null];
        if (names)
            [name2, surname, name1] = names.trim().split('').reverse().join('').split('|');

        let sex = bytes[51];
        let birthDate = this.toDate(bytes.slice(52, 54));
        let expireDate = this.toDate(bytes.slice(54, 56));

        return { version: 1, enp, surname, name1, name2, sex, birthDate, expireDate };
    }
}
