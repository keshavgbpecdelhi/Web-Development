let listQuantities;
let optionQuantity;
let inputTop;
let inputBottom;
let optionTop;
let optionBottom;
let quantity;
let defQuantityId = 'length';
let quantities = [{
        name: 'Length',
        id: 'length',
        defUnitIndex: 1,
        units: [
            ["kilometer", 1000],
            ["meter", 1],
            ["centimeter", 0.01],
            ["millimeter", 0.001],
            ["micrometer", 1e-6],
            ["nanometer", 1e-9],
            ["picometer", 1e-12],
            ["mile", 1609.344],
            ["nautical mile", 1852],
            ["yard", 0.9144],
            ["feet", 0.3048],
            ["inch", 0.0254]
        ]
    },
    {
        name: 'Mass',
        id: 'mass',
        defUnitIndex: 0,
        units: [
            ["kilogram", 1],
            ["gram", 1e-3],
            ["milligram", 1e-6],
            ["nanogram", 1e-12],
            ["ton", 1000],
            ["quintal", 100],
            ["pound", 0.45359237]
        ]
    },
    {
        name: 'Time',
        id: 'time',
        defUnitIndex: 7,
        units: [
            ["millennium", 31536000000],
            ["century", 3153600000],
            ["decade", 315360000],
            ["windu", 252288000],
            ["year (365 days)", 31536000],
            ["month (30 days)", 2628000],
            ["week", 604800],
            ["day", 86400],
            ["hour", 3600],
            ["minute", 60],
            ["second", 1],
            ["millisecond", 1e-3],
            ["microsecond", 1e-6],
            ["nanosecond", 1e-9],
            ["picosecond", 1e-12],
        ]
    },
    {
        name: 'Temperature',
        id: 'temperature',
        defUnitIndex: 0,
        units: [
            ["Celsius", 'value + 273.15', 'value - 273.15'],
            ["Fahrenheit", '5/9 * (value + 459.67)', '9/5 * value - 459.67'],
            ["Kelvin", 1],
            ["Rankine", '5/9 * value', '9/5 * value'],
            ["Reaumur", '5/4 * value + 273.15', '4/5 * (value - 273.15)']
        ]
    },
    {
        name: 'Angle',
        id: 'angle',
        defUnitIndex: 0,
        units: [
            ["degree", 'value/360', 'value*360'],
            ["radian", 'value / (2 * Math.PI)', 'value * 2 * Math.PI'],
            ["revolution", 1],
            ["quadrant", 0.25],
            ["minutes", 'value/(360*60)', 'value * (360*60)'],
            ["seconds", 'value/(360*3600)', 'value * (360*3600)']
        ]
    },
    {
        name: 'Area',
        id: 'area',
        defUnitIndex: 1,
        units: [
            ["square kilometer", 1e6],
            ["square meter", 1],
            ["square centimeter", 1e-4],
            ["square millimeter", 1e-6],
            ["hectare", 1e4],
            ["square mile", 2589988.110336],
            ["square yard", 0.83612736],
            ["square feet", 0.09290304],
            ["square inch", 0.00064516]
        ]
    },
    {
        name: 'Volume',
        id: 'volume',
        defUnitIndex: 5,
        units: [
            ["cubic kilometer", 1e12],
            ["cubic meter kubik", 1e3],
            ["cubic decimete kubik", 1],
            ["cubic milimeter kubik", 1e-6],
            ["kiloliter", 1e3],
            ["liter", 1],
            ["milliliter", 1e-3],
            ["cubic yard kubik", 764.554857984],
            ["cubic mil kubik", 4.168181825e12],
            ["cubic inci kubik", 0.016387064],
            ["cubic kaki kubik", 28.316846592],
            ["gallon", 3.785411784],
            ["cup", 0.2365882365],
            ["tablespoon", 0.01478676478125],
            ["teaspoon", 0.00492892159375]
        ]
    },
    {
        name: 'Digital Storage',
        id: 'digital-storage',
        defUnitIndex: 1,
        units: [
            ["bits", 0.125],
            ["bytes", 1],
            ["kilobits", 128],
            ["kilobytes", 1024],
            ["megabits", 131072],
            ["megabytes", 1048576],
            ["gigabits", 134217728],
            ["gigabytes", 1073741824],
            ["terabits", 137438953472],
            ["terabytes", 1099511627776],
            ["petabits", 140737488355328],
            ["petabytes", 1125899906842624],
            ["exabits", 144115188075855872],
            ["exabytes", 1152921504606846976]
        ]
    },
]

function getQuantityById(id) {
    for (let i = 0; i < quantities.length; i++) {
        if (id === quantities[i].id)
            return quantities[i];
    }
}

function onInitPage() {
    listQuantities = document.getElementById('listQuantities');
    optionQuantity = document.getElementById('optionQuantity');
    inputTop = document.getElementById('inputTop');
    inputBottom = document.getElementById('inputBottom');
    optionTop = document.getElementById('optionTop');
    optionBottom = document.getElementById('optionBottom');

    let startQuantity;
    if (!startQuantity) {
        let id = localStorageGetDefault('lastQuantityID', defQuantityId);
        startQuantity = getQuantityById(id);
    }
    if (!startQuantity) {
        startQuantity = getQuantityById(defQuantityId);
    }
    loadQuantity(startQuantity.id);
}

function loadQuantity(quantityId) {
    quantity = getQuantityById(quantityId);
    localStorage.setItem('lastQuantityId', quantityId);

    optionTop.innerHTML = '';
    optionBottom.innerHTML = '';
    let unitOptions = '';
    for (let i = 0; i < quantity.units.length; i++) {
        let title = quantity.units[i][0];
        unitOptions += '<option>' + title + '</option>';
    }
    optionTop.innerHTML = unitOptions;
    optionBottom.innerHTML = unitOptions;

    document.getElementById('quantityTitle').innerHTML = quantity.name + ' Converter';

    loadUnits();

    optionQuantity.value = quantityId;
    let itemId = '';
    for (let i = 0; i < quantities.length; i++) {
        itemId = 'item' + i;
        if (quantities[i].id === quantityId) document.getElementById(itemId).className = 'selected';
        else document.getElementById(itemId).className = '';
    }

    convert();
}

function findUnitIndexByName(name) {
    for (let i = 0; i < quantity.units.length; i++) {
        if (quantity.units[i][0] === name) return i;
    }
    return -1;
}

function loadUnits() {
    optionTop.selectedIndex = findUnitIndexByName(localStorageGetDefault('top: ' + quantity.name, ''));
    if (optionTop.selectedIndex === -1) optionTop.selectedIndex = quantity.defUnitIndex;
    optionBottom.selectedIndex = findUnitIndexByName(localStorageGetDefault('bottom: ' + quantity.name, ''));
    if (optionBottom.selectedIndex === -1) optionBottom.selectedIndex = quantity.defUnitIndex + 1;
}

document.addEventListener("DOMContentLoaded", onInitPage, false);

function localStorageGetDefault(name, defaultValue) {
    let value = localStorage.getItem(name);
    return (value !== null) ? value : defaultValue;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function convertInternal(topUnitIndex, value, bottomUnitIndex, inputResult) {

    let topUnitFactor = quantity.units[topUnitIndex][1];
    let bottomUnitFactor = quantity.units[bottomUnitIndex][1];

    if (isNumber(topUnitFactor)) {
        value = value * topUnitFactor;
    } else {
        value = eval(topUnitFactor);
    }

    if (isNumber(bottomUnitFactor)) {
        value = value / bottomUnitFactor;
    } else {
        value = eval(quantity.units[bottomUnitIndex][2]);
    }

    inputResult.value = value.toFixed(4);
}

function convert() {
    let value = parseFloat(inputTop.value);
    if (isNaN(value)) {
        inputBottom.value = '';
    } else {
        convertInternal(optionTop.selectedIndex, value, optionBottom.selectedIndex, inputBottom)
        localStorage.setItem('input' + quantity.name, value.toString());
    }
}

function convertBack() {
    let value = parseFloat(inputBottom.value);

    if (isNaN(value)) {
        inputTop.value = '';
    } else {
        let topUnitIndex = optionBottom.selectedIndex;
        let bottomUnitIndex = optionTop.selectedIndex;

        convertInternal(topUnitIndex, value, bottomUnitIndex, inputTop);
    }
}