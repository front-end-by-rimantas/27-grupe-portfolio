class Carousel {
    constructor(selector, component, data) {
        this.selector = selector;
        this.component = component;
        this.data = data;

        this.DOM = null;
        this.listDOM = null;
        this.allDotsDOM = null;
        this.allAnglesDOM = null;
        this.dotsEnabled = true;
        this.anglesEnabled = false;
        this.animationInProgress = false;
        this.animationDuration = 1000;
        this.itemsPerView = 1;
        this.visibleItemIndex = 0;      // matomoje ekrano dalyje is atvaizduotu elementu labiausiai kaireje stovincio index'as visu duomenu atzvilgiu

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.findElementBySelector()) {
            return false;
        }

        // controls config update
        if (typeof this.data.controls.anglesEnabled === 'boolean') {
            this.anglesEnabled = this.data.controls.anglesEnabled;
        }
        if (typeof this.data.controls.dotsEnabled === 'boolean') {
            this.dotsEnabled = this.data.controls.dotsEnabled;
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

    generateControls() {
        let anglePrevious = '';
        let dotsHTML = '';
        let angleNext = '';

        if (this.anglesEnabled) {
            anglePrevious = '<i class="fa fa-angle-left"></i>';
            angleNext = '<i class="fa fa-angle-right"></i>';
        }

        if (this.dotsEnabled) {
            dotsHTML = `<div class="dots">
                            ${this.generateDots()}
                        </div>`;
        }

        return anglePrevious + dotsHTML + angleNext;
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
                            ${this.generateControls()}
                        </div>
                    </div>`;

        this.DOM.innerHTML = HTML;
        this.listDOM = this.DOM.querySelector('.list');
        this.allDotsDOM = this.DOM.querySelectorAll('.controls .dot');
        this.allAnglesDOM = this.DOM.querySelectorAll('.controls > .fa');
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

    slideAnimation() {
        const translate = this.visibleItemIndex / (this.data.list.length + 2 * this.itemsPerView) * 100;
        this.listDOM.style.transform = `translateX(-${translate}%)`;
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

        if (this.dotsEnabled) {
            this.allDotsDOM.forEach((dotDOM, i) => {
                dotDOM.addEventListener('click', () => {
                    if (!this.animationInProgress) {
                        this.animationInProgress = true;
                        this.visibleItemIndex = this.itemsPerView + i;
                        this.slideAnimation();
                        setTimeout(() => {
                            this.animationInProgress = false;
                        }, this.animationDuration);
                    }
                })
            });
        }
        // PREVIOUS ITEM
        if (this.anglesEnabled) {
            this.allAnglesDOM[0].addEventListener('click', () => {
                if (!this.animationInProgress) {
                    this.animationInProgress = true;
                    this.visibleItemIndex--;
                    this.slideAnimation();
                    if (this.visibleItemIndex === 0) {
                        setTimeout(() => {
                            this.listDOM.style.transition = 'all 0s';
                            this.visibleItemIndex = this.data.list.length;
                            this.slideAnimation();
                        }, this.animationDuration);
                        setTimeout(() => {
                            this.listDOM.style.transition = `all ${this.animationDuration}ms`;
                        }, this.animationDuration + 100)
                    }
                    setTimeout(() => {
                        this.animationInProgress = false;
                    }, this.animationDuration);
                }
            })
            // NEXT ITEM
            this.allAnglesDOM[1].addEventListener('click', () => {
                if (!this.animationInProgress) {
                    this.animationInProgress = true;
                    this.visibleItemIndex++;
                    this.slideAnimation();
                    if (this.data.list.length + this.itemsPerView === this.visibleItemIndex) {
                        setTimeout(() => {
                            this.listDOM.style.transition = 'all 0s';
                            this.visibleItemIndex = this.itemsPerView;
                            this.slideAnimation();
                        }, this.animationDuration);
                        setTimeout(() => {
                            this.listDOM.style.transition = `all ${this.animationDuration}ms`;
                        }, this.animationDuration + 10)
                    }
                    setTimeout(() => {
                        this.animationInProgress = false;
                    }, this.animationDuration);
                }
            })
        }
    }
}

export { Carousel }