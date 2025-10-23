import { date2Rtime, rtime2Date } from "./xid";

export function checkStringFormat(input?: string) {
    if (input && input.length < 4) {
        return false;
    }
    if (!input?.[0]?.match(/[A-Z]/)) {
        return false;
    }
    for (var i = 1; i < 4; i++) {
        if (!input?.[i]?.match(/[0-9]/)) {
            return false;
        }
    }
    return true;
}

export function checkStringFormat2(input?: string) {
    if (!input) return false;

    for (var i = 1; i < 3; i++) {
        if (!input[i]?.match(/[0-9]/)) {
            return false;
        }
    }
    return true;
}


export function calcJson(text: string) {

    var prior = "";
    var identifier = "";


    var priorIndex = text.indexOf("-");

    if (priorIndex == 3 || priorIndex == 4 || priorIndex == 8) {
        var prefixText = text.slice(0, priorIndex);
        if (prefixText.indexOf(".") > 0) {
            var t1 = prefixText.split(".")[0];
            var t2 = prefixText.split(".")[1];
            if (checkStringFormat(t1) && checkStringFormat2(t2)) {
                prior = t1!;
                identifier = t2!;
                text = text.slice(priorIndex + 1);
            }
        } else {
            if (checkStringFormat(prefixText)) {
                prior = prefixText;
                text = text.slice(priorIndex + 1);
            } else if (checkStringFormat2(prefixText)) {
                identifier = prefixText;
                text = text.slice(priorIndex + 1);
            }
        }
    }

    var tip = "";
    var tag = "";
    var name = "";
    var time = "";
    var person = "";

    var tagIndex = text.indexOf("&");
    var personIndex = text.indexOf("@");
    var tipIndex = text.indexOf("$");
    var timeIndex = text.lastIndexOf("-");

    if ([6, 8, 15].includes(text.length - timeIndex)) {
        var timeStr = text.slice(timeIndex + 1);
        if (!timeStr.match(/[0-9]/) && ![6, 8, 15].includes(timeStr.length)) {
            timeIndex = -1;
        }
    }

    //name&tag@person$tip-time
    function output(index = 0) {
        var json = {
            index: index,
            name: name,
            tag: tag,
            person: person,
            time: time,
            tip: tip,
            prior: prior,
            identifier: identifier
        }
        return (JSON.stringify(json))
    }


    //name
    if (timeIndex < 0 && personIndex < 0 && tagIndex < 0 && tipIndex < 0) {
        name = text;
        return output();
    }

    //name$tip
    if (tagIndex < 0 && personIndex < 0 && timeIndex < 0 && tipIndex > 0) {
        name = text.slice(0, tipIndex);
        tip = text.slice(tipIndex + 1);
        return output(1);
    }


    //name-time
    if (tagIndex < 0 && personIndex < 0 && tipIndex < 0 && timeIndex > 0) {
        name = text.slice(0, timeIndex);
        time = text.slice(timeIndex + 1);
        return output(0);
    }

    //name@person
    if (tagIndex < 0 && tipIndex < 0 && timeIndex < 0 && personIndex > 0) {
        name = text.slice(0, personIndex);
        person = text.slice(personIndex + 1);
        return output(1);
    }

    //name&tag
    if (personIndex < 0 && tipIndex < 0 && timeIndex < 0 && tagIndex > 0) {
        name = text.slice(0, tagIndex);
        tag = text.slice(tagIndex + 1);
        return output(2);
    }

    //name@person-time
    if (tagIndex < 0 && tipIndex < 0 && timeIndex > 0 && personIndex > 0) {
        name = text.slice(0, personIndex);
        person = text.slice(personIndex + 1, timeIndex);
        time = text.slice(timeIndex + 1);
        return output(3);
    }

    //name&tag-time
    if (personIndex < 0 && tipIndex < 0 && tagIndex > 0 && timeIndex > 0) {
        name = text.slice(0, tagIndex);
        tag = text.slice(tagIndex + 1, timeIndex);

        time = text.slice(timeIndex + 1);
        return output(4);
    }

    //name$tip-time
    if (personIndex < 0 && tagIndex < 0 && tipIndex > 0 && timeIndex > 0) {
        name = text.slice(0, tipIndex);
        tip = text.slice(tipIndex + 1, timeIndex);

        time = text.slice(timeIndex + 1);
        return output(5);
    }

    //name&tag$tip-time
    if (personIndex < 0 && timeIndex > 0 && tagIndex > 0 && tipIndex > 0) {
        person = "";
        name = text.slice(0, tagIndex);
        tag = text.slice(tagIndex + 1, tipIndex);
        tip = text.slice(tipIndex + 1, timeIndex);

        time = text.slice(timeIndex + 1);
        return output(6);
    }

    //name@person$tip
    if (tagIndex < 0 && timeIndex < 0 && personIndex > 0 && tipIndex > 0) {
        name = text.slice(0, personIndex);
        person = text.slice(personIndex + 1, tipIndex);
        tip = text.slice(tipIndex + 1, timeIndex);
        return output(7);
    }

    //name@person$tip-time
    if (tagIndex < 0 && timeIndex > 0 && personIndex > 0 && tipIndex > 0) {
        name = text.slice(0, personIndex);
        person = text.slice(personIndex + 1, tipIndex);
        tip = text.slice(tipIndex + 1, timeIndex);

        time = text.slice(timeIndex + 1);
        return output(7);
    }

    //name&tag@person
    if (tipIndex < 0 && timeIndex < 0 && personIndex > 0 && tagIndex > 0) {
        name = text.slice(0, tagIndex);
        tag = text.slice(tagIndex + 1, personIndex);
        person = text.slice(personIndex + 1, timeIndex);
        return output(8);
    }

    //name&tag@person-time
    if (tipIndex < 0 && timeIndex > 0 && personIndex > 0 && tagIndex > 0) {
        name = text.slice(0, tagIndex);
        tag = text.slice(tagIndex + 1, personIndex);
        person = text.slice(personIndex + 1, timeIndex);
        time = text.slice(timeIndex + 1);
        return output(8);
    }

    //name&tag@person$tip
    if (tipIndex > 0 && timeIndex < 0 && personIndex > 0 && tagIndex > 0) {
        name = text.slice(0, tagIndex);
        tag = text.slice(tagIndex + 1, personIndex);
        person = text.slice(personIndex + 1, tipIndex);
        tip = text.slice(tipIndex + 1);
        return output(8);
    }

    //name&tag@person$tip-time
    if (tagIndex > 0 && personIndex > 0 && tipIndex > 0 && timeIndex > 0) {
        name = text.slice(0, tagIndex);
        tag = text.slice(tagIndex + 1, personIndex);
        person = text.slice(personIndex + 1, tipIndex);
        tip = text.slice(tipIndex + 1, timeIndex);
        time = text.slice(timeIndex + 1);
        return output(9);
    }
}

export function parseInput(input: string) {
    let json = {} as any;
    const jsonText = calcJson(input) || "";
    try {
        json = JSON.parse(jsonText);
        json.time = json.time.replace('(', '').replace(')', '');
        json.time = rtime2Date(json.time);
    } catch (e) { }
    finally {
        return json;
    }
}