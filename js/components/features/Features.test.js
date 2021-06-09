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

describe('Kokia strategija naudoti generuojant turini', () => {
    test('jei neduodamas strategy parametras, tai lieka default reiksme', () => {
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
        expect(features.listRenderStrategy).toBe('first');
    })

    test('jei strategy parametras duodamas ne tinkamo tipo (undefined), tai lieka default reiksme', () => {
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
            maxItemsPerList: 'all',
            listRenderStrategy: undefined
        });
        expect(features.listRenderStrategy).toBe('first');
    })

    test('jei strategy parametras duodamas ne tinkamo tipo (number), tai lieka default reiksme', () => {
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
            maxItemsPerList: 'all',
            listRenderStrategy: 21456
        });
        expect(features.listRenderStrategy).toBe('first');
    })

    test('jei strategy parametras duodamas tuscias tekstas, tai lieka default reiksme', () => {
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
            maxItemsPerList: 'all',
            listRenderStrategy: ''
        });
        expect(features.listRenderStrategy).toBe('first');
    })

    test('jei strategy parametras duodamas ne tuscias tekstas, taciau netinkama reiksme, tai lieka default reiksme', () => {
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
            maxItemsPerList: 'all',
            listRenderStrategy: 'asd'
        });
        expect(features.listRenderStrategy).toBe('first');
    })

    test('jei strategy parametras "first", tai atnaujinama reiksme i "first"', () => {
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
            maxItemsPerList: 'all',
            listRenderStrategy: 'first'
        });
        expect(features.listRenderStrategy).toBe('first');
    })

    test('jei strategy parametras "last", tai atnaujinama reiksme i "last"', () => {
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
            maxItemsPerList: 'all',
            listRenderStrategy: 'last'
        });
        expect(features.listRenderStrategy).toBe('last');
    })

    test('jei strategy parametras "random", tai atnaujinama reiksme i "random"', () => {
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
            maxItemsPerList: 'all',
            listRenderStrategy: 'random'
        });
        expect(features.listRenderStrategy).toBe('random');
    })
})

describe('Duomenu saraso filtravimas, paliekant tik teisingus irasus', () => {
    test('jei duodamas tuscias sarasas, tai toks ir lieka', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: []
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei sarase ne tinkamo tipo elementas (number), tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                48565
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei sarase ne tinkamo tipo elementas (array), tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                []
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei sarase ne tinkamo tipo elementas (null), tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                null
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei sarase ne tinkamos reiksmes elementas (empty object), tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {}
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento icon reiksme ne tekstas, tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 1455
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento icon reiksme tuscias tekstas, tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: ''
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento title reiksme ne tekstas, tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png'
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento title reiksme tuscias tekstas, tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: ''
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento description reiksme ne tekstas, tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento description reiksme tuscias tekstas, tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: ''
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento active reiksme ne boolean (neduotas), tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento active reiksme ne boolean (undefined), tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: undefined
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento active reiksme ne boolean (zero), tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: 0
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento active reiksme ne boolean (empty string), tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: ''
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento active reiksme ne boolean (null), tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: null
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento active reiksme yra boolean (false), tai sarasas lieka tuscias', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: false
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei sarase yra tinkamas elementas', () => {
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
            ]
        });
        expect(features.data.list.length).toBe(1);
    })

    test('jei sarase yra nereikalingu keys, tai elementas ismetamas', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true,
                    hacker: 'if you allow extra keys, I will hack you 😎🐱‍👤'
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento icon nera priimtinas failas (nera tasko), tai elementas ismetamas', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'featured_image_1png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento icon nera priimtinas failas (empty local part), tai elementas ismetamas', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: '.pngasd',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento icon nera priimtinas failas (empty file extension part), tai elementas ismetamas', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'filename.',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento icon nera priimtinas failas (netinkamas file extension part), tai elementas ismetamas', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'filename.pn',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento icon nera priimtinas failas (netinkamas file extension: bmp), tai elementas ismetamas', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'filename.bmp',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ]
        });
        expect(features.data.list.length).toBe(0);
    })

    test('jei elemento icon yra png failas, tai paliekam', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'filename.png',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ]
        });
        expect(features.data.list.length).toBe(1);
    })

    test('jei elemento icon yra jpg failas, tai paliekam', () => {
        document.body.innerHTML = '<div id="features_block"></div>';
        const features = new Features('#features_block', {
            imgPath: './',
            list: [
                {
                    icon: 'filename.jpg',
                    title: 'Fully functional',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos.',
                    active: true
                }
            ]
        });
        expect(features.data.list.length).toBe(1);
    })
})