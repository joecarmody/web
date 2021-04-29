// factory function for word storage objects

const sentenceFactory = (verbs, pronouns, places) => {
    return {
        // fields for arrays of input
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
        
        // functions printing sentences of increasing complexity from word arrays above

        simpleSentence () {
            let verb = this.verbs[Math.floor(Math.random() * this.verbs.length)];
            const pronoun = this.pronouns[Math.floor(Math.random() * this.pronouns.length)];

            if (pronoun !== 'I' && pronoun !== 'You' && pronoun !== 'They') verb += 's';

            console.log(`${pronoun} ${verb}.`);

        },

        likeSentence () {
            let verb = this.verbs[Math.floor(Math.random() * this.verbs.length)];
            const pronoun = this.pronouns[Math.floor(Math.random() * this.pronouns.length)];
            let like = 'like';

            if (pronoun !== 'I' && pronoun !== 'You' && pronoun !== 'They') like += 's';

            console.log(`${pronoun} ${like} to ${verb}.`);
        },

        placeSentence () {
            let verb = this.verbs[Math.floor(Math.random() * this.verbs.length)];
            const pronoun = this.pronouns[Math.floor(Math.random() * this.pronouns.length)];
            let like = 'like';
            const place = this.places[Math.floor(Math.random() * this.places.length)];

            if (pronoun !== 'I' && pronoun !== 'You' && pronoun !== 'They') like += 's';

            console.log(`${pronoun} ${like} to ${verb} near ${place}.`);
        },

        compoundSentence () {
            let verb1;
            let verb2;
            let like1 = 'like';
            let like2 = 'like';
            const place1 = this.places[Math.floor(Math.random() * this.places.length)];
            const place2 = this.places[Math.floor(Math.random() * this.places.length)];
            const pronoun1 = this.pronouns[Math.floor(Math.random() * this.pronouns.length)];
            const pronoun2 = this.pronouns[Math.floor(Math.random() * this.pronouns.length)];
            
            while (verb1 === verb2) {
                verb1 = this.verbs[Math.floor(Math.random() * this.verbs.length)];
                verb2 = this.verbs[Math.floor(Math.random() * this.verbs.length)];
            }

            if (pronoun1 !== 'I' && pronoun1 !== 'You' && pronoun1 !== 'They') like1 += 's';
            if (pronoun2 !== 'I' && pronoun2 !== 'You' && pronoun2 !== 'They') like2 += 's';

            if (pronoun1 === pronoun2) {
                console.log(`${pronoun1} ${like1} to ${verb1} and ${verb2}.`);
                return;
            }

            console.log(`${pronoun1} ${like1} to ${verb1} near ${place1}, but ${pronoun2} ${like2} to ${verb2} near ${place2}.`)
        
        },
        
        randomSentence () {
            const sentenceTypeNumber = Math.floor(Math.random() * 4) + 1;
            switch (sentenceTypeNumber) {
                case 1:
                    return this.simpleSentence();
                case 2:
                    return this.likeSentence();
                case 3:
                    return this.placeSentence();
                case 4:
                    return this.compoundSentence();

            }
        },

        randomParagraph (numSentences) {
            let paragraph = this.randomSentence();
            for (let i = 0; i < numSentences - 1; i++) {
                sentence = this.randomSentence();
                paragraph += ' ' + sentence;
            }
            return paragraph;
        }

    }
}

// I, You, He, She, They

const pronouns = ['I', 'You', 'He', 'She', 'They'];

const verbs = ['swim', 'run', 'jump', 'fly', 'sing', 'play', 'adapt', 'achieve', 'agree', 'bake', 'bathe', 'believe', 'calculate', 'climb', 
                'communicate', 'dance', 'deny', 'disagree', 'eat', 'earn', 'exist', 'fail', 'fight', 'give', 'grow', 'hate', 'hit', 'hesitate',
                'ignore', 'impress', 'improve', 'kick', 'kiss', 'kneel', 'laugh', 'lead', 'learn', 'lie', 'measure', 'need',' negotiate', 
                'observe', 'obtain', 'own', 'paint', 'pinch', 'persuade', 'quit', 'qualify', 'read', 'reflect', 'regret', 'sew', 'shrink', 'shake',
                'take', 'taste', 'think', 'understand', 'volunteer', 'wake', 'walk', 'write'];

const places = ['their house', 'the beach', 'the school', 'the police station', 'the hospital', 'the bar', 'the library', 'the restaurant',
                'the lake', 'the hotel', 'the mansion', 'the palace', 'the mountain', 'the hill', 'the fountain', 'the pond', 'the river',
                'the tree', 'the forest', 'the post office', 'the city hall', 'the park', 'the road', 'the bridge'];

const sentenceGenerator = sentenceFactory(verbs, pronouns, places);

console.log(sentenceGenerator.randomParagraph(10));