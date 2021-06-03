// IMPORT
import { Carousel } from './components/carousel/Carousel.js';
import { Features } from './components/features/Features.js';
import { Interface } from './components/interface/Interface.js';
import { Testimonials } from './components/testimonials/Testimonials.js';
import { featuresData } from './data/featuresData.js';
import { interfaceData } from './data/interfaceData.js';
import { testimonialsData } from './data/testimonialsData.js';

// EXECUTION
new Features('#features_block', featuresData);

new Carousel('#interface_block', Interface, interfaceData);
// new Carousel('#testimonials_block', Testimonials, testimonialsData);