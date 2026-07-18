class Extra {
    /**
     *
     * @param {number} number
     */
    metricNumber(number, decimal = 2) {
        const units = ['', 'K', 'M', 'B', 'T', 'Q'];
        let index = 0;
        while (Math.abs(number) >= 1000 && index < units.length - 1) {
            number /= 1000;
            index++;
        }
        return `${parseFloat(number.toFixed(decimal))}${units[index]}`
    }
}

export default new Extra();
