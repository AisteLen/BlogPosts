const rnd = (num) => Math.round(Math.random()*num)

export default {
    rnd: (num) => rnd(num),
    generate_id: () => {
        const letters = "abcdefghijklmnoprstuvz"
        const numbers = "0123456789"

        let result = ""

        for (let i = 0; i < 10; i++) {
            const symbol = rnd(1)

            if(symbol) {
                result += letters[rnd(letters.length-1)]
            } else {
                result += numbers[rnd(numbers.length-1)]
            }
        }

        return result
    },
    convert_date: (timestamp) => {
        const date = new Date(timestamp);

        // Define options for formatting the date in Lithuanian locale
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        return date.toLocaleDateString('lt-LT', options);
    }
}