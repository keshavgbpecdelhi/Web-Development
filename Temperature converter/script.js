        const tempInput = document.getElementById('temperature');
        const fromUnit = document.getElementById('fromUnit');
        const toUnit = document.getElementById('toUnit');
        const result = document.getElementById('result');
        const formula = document.getElementById('formula');

        function convert() {
            const temp = parseFloat(tempInput.value);
            
            if (isNaN(temp)) {
                result.textContent = 'Enter a temperature to convert';
                formula.textContent = '';
                return;
            }

            const from = fromUnit.value;
            const to = toUnit.value;

            if (from === to) {
                result.textContent = `${temp.toFixed(2)}° (Same unit)`;
                formula.textContent = '';
                return;
            }

            let celsius;
            
            // Convert to Celsius first
            if (from === 'celsius') {
                celsius = temp;
            } else if (from === 'fahrenheit') {
                celsius = (temp - 32) * 5/9;
            } else if (from === 'kelvin') {
                celsius = temp - 273.15;
            }

            // Convert from Celsius to target unit
            let converted;
            let symbol;
            let formulaText = '';

            if (to === 'celsius') {
                converted = celsius;
                symbol = '°C';
                if (from === 'fahrenheit') {
                    formulaText = `Formula: (${temp}°F - 32) × 5/9 = ${converted.toFixed(2)}°C`;
                } else if (from === 'kelvin') {
                    formulaText = `Formula: ${temp}K - 273.15 = ${converted.toFixed(2)}°C`;
                }
            } else if (to === 'fahrenheit') {
                converted = (celsius * 9/5) + 32;
                symbol = '°F';
                if (from === 'celsius') {
                    formulaText = `Formula: (${temp}°C × 9/5) + 32 = ${converted.toFixed(2)}°F`;
                } else if (from === 'kelvin') {
                    formulaText = `Formula: (${temp}K - 273.15) × 9/5 + 32 = ${converted.toFixed(2)}°F`;
                }
            } else if (to === 'kelvin') {
                converted = celsius + 273.15;
                symbol = 'K';
                if (from === 'celsius') {
                    formulaText = `Formula: ${temp}°C + 273.15 = ${converted.toFixed(2)}K`;
                } else if (from === 'fahrenheit') {
                    formulaText = `Formula: (${temp}°F - 32) × 5/9 + 273.15 = ${converted.toFixed(2)}K`;
                }
            }

            result.textContent = `${converted.toFixed(2)}${symbol}`;
            formula.textContent = formulaText;
        }

        tempInput.addEventListener('input', convert);
        fromUnit.addEventListener('change', convert);
        toUnit.addEventListener('change', convert);
