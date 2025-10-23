const START_YEAR = 1997;
const KEY = "0123456789ABCDFEGHIJKLMNOPQRSTUVWXYZ".split("");

export function num2key(n: string) {
    var res = [];
    var num = parseInt(n);
    if (num <= 0) return [];
    var klen = KEY.length;
    while (num > 0) {
        var v = num % klen;
        num = (num - v) / klen;
        var k = KEY[v];
        //if (k == 'I') k = 'i';
        //if (k == 'Z') k = 'z';
        res.push(k);
    }
    return res.reverse();
}

export function key2num(keys: string) {
    var num = 0;
    var mult = 1;
    var klen = KEY.length;
    for (var i = keys.length - 1; i >= 0; i -= 1) {
        num += mult * KEY.indexOf(keys[i]!);
        mult *= klen;
    }
    return num;
}



function padStart(s: string, targetLength: number, padString: string) {
    s = String(s);
    while (s.length < targetLength) {
        s = padString + s;
    }
    return s;
}


function padEnd(s: string, targetLength: number, padString: string) {
    s = String(s);
    while (s.length < targetLength) {
        s = s + padString;
    }
    return s;
}


export function date2Rtime(datetime: string) {
    var s = datetime.toString();
    var simpleYear = parseInt(s.slice(0, 4)) - START_YEAR;
    var month = parseInt(s.slice(4, 6));
    var date = parseInt(s.slice(6, 8));
    var hour = parseInt(s.slice(8, 10));
    var minute = parseInt(s.slice(10, 12));
    var second = Math.floor(parseInt(s.slice(12, 14)) / 4);

    var yearMonthRtime = (simpleYear << 4) | month;
    var hmsRtime = (hour << 10) | (minute << 4) | second;

    var rtimeKey = num2key(yearMonthRtime.toString()).join("") + num2key(date.toString()).join("") + num2key(hmsRtime.toString()).join("");
    rtimeKey = padEnd(rtimeKey, 6, '0');
    return rtimeKey;
}

export function rtime2Date(rtimeKey: string) {
    var hmsRtime = key2num(rtimeKey.slice(3, 6));
    var yearMonthRtime = key2num(rtimeKey.slice(0, 2));
    var date = String(key2num(rtimeKey.slice(2, 3)));

    var year = (yearMonthRtime >> 4) + START_YEAR;
    var month = String(yearMonthRtime & 0b1111);
    var hour = hmsRtime >> 10;
    var minute = (hmsRtime >> 4) & 0b111111;
    var second = 4 * (hmsRtime & 0b1111);
    var datetime = year + padStart(month, 2, '0') + padStart(date, 2, '0') + padStart(hour.toString(), 2, '0') + padStart(minute.toString(), 2, '0') + padStart(second.toString(), 2, '0');
    return datetime;
}


export const getDateString = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);

    const formattedTime = year + month + day + hours + minutes + seconds;
    return formattedTime;

}