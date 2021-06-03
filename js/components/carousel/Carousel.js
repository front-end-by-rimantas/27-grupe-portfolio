class Carousel {
    constructor(selector, component, data) {
        this.selector = selector;
        this.component = component;
        this.data = data;

        this.DOM = null;
        this.itemsPerView = 1;

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.findElementBySelector()) {
            return false;
        }

        this.data.itemsPerView = this.data.itemsPerView.sort((a, b) => a.minWidth - b.minWidth);
        this.itemsPerView = this.calculateItemsPerViewValue();
        this.render(this.itemsPerView);
        this.addEvents();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            return false;
        }
        return true;
    }

    findElementBySelector() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    generateItems() {
        const itemsCount = this.data.list.length;
        const itemWidth = 100 / itemsCount;
        let HTML = '';

        for (let i = 0; i < itemsCount; i++) {
            HTML += `<div class="item" style="width: ${itemWidth}%;">ITEM</div>`;
        }

        return HTML;
    }

    generateDots() {
        const itemsCount = this.data.list.length;
        let HTML = '';

        for (let i = 0; i < itemsCount; i++) {
            HTML += `<div class="dot"></div>`;
        }

        return HTML;
    }

    render(itemsPerView) {
        const itemsCount = this.data.list.length;
        const listWidth = itemsCount / itemsPerView * 100;

        const HTML = `<div class="carousel">
                        <div class="gallery">
                            <div class="list" style="width: ${listWidth}%;">
                                ${this.generateItems()}
                            </div>
                        </div>
                        <div class="controls">
                            <div class="dots">
                                ${this.generateDots()}
                            </div>
                        </div>
                    </div>`;

        this.DOM.innerHTML = HTML;
    }

    calculateItemsPerViewValue() {
        const responsive = this.data.itemsPerView;

        let itemsToRender = 1;
        for (let i = 0; i < responsive.length; i++) {
            if (innerWidth > responsive[i].minWidth) {
                itemsToRender = responsive[i].itemsCount;
            }
        }

        return itemsToRender;
    }

    addEvents() {
        window.addEventListener('resize', () => {
            const itemsToRender = this.calculateItemsPerViewValue();

            // re-render content only if there is new value for this.itemsPerView
            if (this.itemsPerView !== itemsToRender) {
                this.render(itemsToRender);
                this.itemsPerView = itemsToRender;
            }
        })
    }
}

export { Carousel }