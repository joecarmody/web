/* sentence structure example
 * ${pronoun} ${present verb} ${noun}
 */

// factory function for word storage objects

const wordFactory = (nouns, verbs, pronouns, places) => {
    return {
        _nouns: nouns,
        get nouns () {
            return this._nouns;
        },
        _verbs: verbs,
        get verbs () {
            return this._verbs;
        },
        _pronouns: pronouns,
        get pronouns () {
            return this._pronouns;
        },
        _places: places,
        get places () {
            return this._places;
        },
        
        simpleSentence () {
            let verb = this.verbs[Math.floor(Math.random() * this.verbs.length)];
            const pronoun = this.pronouns[Math.floor(Math.random() * this.pronouns.length)];

            if (!(pronoun === 'I' || pronoun === 'You' || pronoun === 'They')) verb += 's';

            console.log(`${pronoun} ${verb}.`);

        },

        likeSentence () {
            let verb = this.verbs[Math.floor(Math.random() * this.verbs.length)];
            const pronoun = this.pronouns[Math.floor(Math.random() * this.pronouns.length)];
            let like = 'like';

            if (!(pronoun === 'I' || pronoun === 'You' || pronoun === 'They')) like += 's';

            console.log(`${pronoun} ${like} to ${verb}.`);
        },

        placeSentence () {
            let verb = this.verbs[Math.floor(Math.random() * this.verbs.length)];
            const pronoun = this.pronouns[Math.floor(Math.random() * this.pronouns.length)];
            let like = 'like';
            const place = this.places[Math.floor(Math.random() * this.places.length)];

            if (!(pronoun === 'I' || pronoun === 'You' || pronoun === 'They')) like += 's';

            console.log(`${pronoun} ${like} to ${verb} at ${place}.`);
        }

    }
}
// I, You, He, She, They

const pronouns = ['I', 'You', 'He', 'She', 'They'];
const verbs = ['swim', 'run', 'jump', 'fly', 'sing', 'play'];
const places = ['your mom\'s house', 'the beach', 'school'];

const sentence = wordFactory(null, verbs, pronouns, places);

sentence.placeSentence();
sentence.placeSentence();
sentence.placeSentence();