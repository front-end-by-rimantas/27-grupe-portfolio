import { Features } from './Features.js';

describe('Objekto tipas', () => {
    test('turi buti tinkamas tipas', () => {
        const features = new Features();
        expect(features instanceof Features).toBe(true);
    })
})

describe('Selector validacija', () => {
    test('be parametru turi grazinti false', () => {
        const features = new Features();
        expect(features.isValidSelector()).toBe(false);
    })

    test('selector parametras netinkamo tipo', () => {
        const features = new Features(145);
        expect(features.isValidSelector()).toBe(false);
    })

    test('selector parametras negali buti tuscias tekstas', () => {
        const features = new Features('');
        expect(features.isValidSelector()).toBe(false);
    })

    test('selector parametras ne tuscias tekstas', () => {
        const features = new Features('a');
        expect(features.isValidSelector()).toBe(true);
    })
})

describe('Elemento paieska', () => {
    test('geba rasti reikiama elementa pagal selector parametra', () => {
        document.body.innerHTML = '<p></p>';
        const features = new Features('p');
        features.findElementBySelector();
        expect(features.DOM).not.toBeNull();
    })

    test('neranda reikiamo elemento pagal selector parametra, jei elementas neegzistuoja', () => {
        document.body.innerHTML = '<p></p>';
        const features = new Features('#features_block');
        features.findElementBySelector();
        expect(features.DOM).toBeNull();
    })

    test('geba rasti reikiama elementa pagal selector parametra ID', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block');
        features.findElementBySelector();
        expect(features.DOM).not.toBeNull();
    })
})

describe('Duomenu validavimas', () => {
    test('neduoti duomenys grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block');
        expect(features.isValidData()).toBe(false);
    })

    test('netinkamo formato duomenys (number) grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', 145548);
        expect(features.isValidData()).toBe(false);
    })

    test('netinkamo formato duomenys (array) grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', []);
        expect(features.isValidData()).toBe(false);
    })

    test('netinkamo formato duomenys (null) grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', null);
        expect(features.isValidData()).toBe(false);
    })

    test('netinkamo formato duomenys (null) grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', null);
        expect(features.isValidData()).toBe(false);
    })

    test('duomenyse egzistuoja imgPath parametras grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {});
        expect(features.isValidData()).toBe(false);
    })

    test('jei imgPath parametras yra ne tekstinis grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: 4785
        });
        expect(features.isValidData()).toBe(false);
    })

    test('jei imgPath parametras tuscias tekstas grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: ''
        });
        expect(features.isValidData()).toBe(false);
    })

    test('jei list parametras ne array (undefined) grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './'
        });
        expect(features.isValidData()).toBe(false);
    })

    test('jei list parametras ne array (number) grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: 488
        });
        expect(features.isValidData()).toBe(false);
    })

    test('jei list parametras ne array (object) grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: {}
        });
        expect(features.isValidData()).toBe(false);
    })

    test('jei list parametras tuscias array grazina false', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: []
        });
        expect(features.isValidData()).toBe(false);
    })
})

describe('Kiek elementu sugeneruoti', () => {
    test('jei neduodamas maxItemsPerList parametras, tai islieka default reiksme', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: []
        });
        expect(features.maxItemsPerList).toBe('all');
    })

    test('jei maxItemsPerList parametras yra undefined, tai islieka default reiksme', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: undefined
        });
        expect(features.maxItemsPerList).toBe('all');
    })

    test('jei maxItemsPerList parametras yra ne tinkamo tipo (boolean), tai islieka default reiksme', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: true
        });
        expect(features.maxItemsPerList).toBe('all');
    })

    test('jei maxItemsPerList parametras yra tuscias tekstas, tai islieka default reiksme', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: ''
        });
        expect(features.maxItemsPerList).toBe('all');
    })

    test('jei maxItemsPerList parametras yra maziau nuo 1, tai islieka default reiksme', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: 0
        });
        expect(features.maxItemsPerList).toBe('all');
    })

    test('jei maxItemsPerList parametras yra desimtainis skaicius, tai islieka default reiksme', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: 3.5
        });
        expect(features.maxItemsPerList).toBe('all');
    })

    test('jei maxItemsPerList parametras yra NaN, tai islieka default reiksme', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: NaN
        });
        expect(features.maxItemsPerList).toBe('all');
    })

    test('jei maxItemsPerList parametras yra Infinity, tai islieka default reiksme', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: Infinity
        });
        expect(features.maxItemsPerList).toBe('all');
    })

    test('jei maxItemsPerList parametras yra -Infinity, tai islieka default reiksme', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: -Infinity
        });
        expect(features.maxItemsPerList).toBe('all');
    })

    test('jei maxItemsPerList parametras yra 6, tai reiksme atsinaujina i 6', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: 6
        });
        expect(features.maxItemsPerList).toBe(6);
    })

    test('jei maxItemsPerList parametras yra 3, tai reiksme atsinaujina i 3', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: 3
        });
        expect(features.maxItemsPerList).toBe(3);
    })

    test('jei maxItemsPerList parametras yra 6, tai reiksme atsinaujina i 6', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ],
            maxItemsPerList: 'all'
        });
        expect(features.maxItemsPerList).toBe('all');
    })
})