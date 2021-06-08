class Carousel {
    constructor(selector, component, data) {
        this.selector = selector;
        this.component = component;
        this.data = data;

        this.DOM = null;
        this.listDOM = null;
        this.allDotsDOM = null;
        this.itemsPerView = 1;
        this.visibleItemIndex = 0;      // matomoje ekrano dalyje is atvaizduotu elementu labiausiai kaireje stovincio index'as visu duomenu atzvilgiu

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.findElementBySelector()) {
            return false;
        }

        this.data.itemsPerView = this.data.itemsPerView.sort((a, b) => a.minWidth - b.minWidth);
        this.itemsPerView = this.calculateItemsPerViewValue();
        this.visibleItemIndex = this.itemsPerView;
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

    generateItems(data) {
        const itemsCount = data.length;
        const itemWidth = 100 / itemsCount;
        let HTML = '';

        for (let i = 0; i < itemsCount; i++) {
            const obj = new this.component({
                ...data[i],
                imgPath: this.data.imgPath
            });
            HTML += `<div class="item" style="width: ${itemWidth}%;">
                        ${obj.HTML()}
                    </div>`;
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
        const clonedData = [
            ...this.data.list.slice(-itemsPerView),
            ...this.data.list,
            ...this.data.list.slice(0, itemsPerView)
        ];
        const itemsCount = clonedData.length;
        const listWidth = itemsCount / itemsPerView * 100;
        const translate = itemsPerView / clonedData.length * 100;

        const HTML = `<div class="carousel">
                        <div class="gallery">
                            <div class="list" style="width: ${listWidth}%; transform: translateX(-${translate}%);">
                                ${this.generateItems(clonedData)}
                            </div>
                        </div>
                        <div class="controls">
                            <div class="dots">
                                ${this.generateDots()}
                            </div>
                        </div>
                    </div>`;

        this.DOM.innerHTML = HTML;
        this.listDOM = this.DOM.querySelector('.list');
        this.allDotsDOM = this.DOM.querySelectorAll('.dot');
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

        this.allDotsDOM.forEach((dotDOM, i) => {
            dotDOM.addEventListener('click', () => {
                this.visibleItemIndex = this.itemsPerView + i;
                const translate = this.visibleItemIndex / (this.data.list.length + 2 * this.itemsPerView) * 100;

                this.listDOM.style.transform = `translateX(-${translate}%)`;
            })
        });
    }
}

export { Carousel }