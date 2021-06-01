class Features {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;
        this.maxItemsPerList = 'all';       // default: all, allowed: any postivie integer
        this.allowedRenderStrategies = ['first', 'last', 'random'];
        this.listRenderStrategy = this.allowedRenderStrategies[0];

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.findElementBySelector() ||
            !this.isValidData()) {
            return false;
        }

        this.setMaxItemsPerList(this.data.maxItemsPerList);
        this.render();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            return false;
        }
        return true;
    }

    findElementBySelector() {
        const DOM = document.querySelector(this.selector);
        if (!DOM) {
            return false;
        }
        this.DOM = DOM;
        return true;
    }

    isValidData() {
        // this.data has to an object
        if (typeof this.data !== 'object' ||
            Array.isArray(this.data) ||
            this.data === null) {
            return false;
        }

        // this.data.imgPath has to exist
        if (typeof this.data.imgPath !== 'string' ||
            this.data.imgPath === '') {
            return false;
        }

        // this.data.list has to exist
        if (!Array.isArray(this.data.list) ||
            this.data.list.length === 0) {
            return false;
        }

        return true;
    }

    setMaxItemsPerList(itemsCount) {
        // allowed: integer > 0 | 'all'
        if (typeof itemsCount === 'number' &&
            isFinite(itemsCount) &&
            itemsCount > 0 &&
            itemsCount % 1 === 0) {
            this.maxItemsPerList = itemsCount;
        }
        if (itemsCount === 'all') {
            this.maxItemsPerList = itemsCount;
        }

        return this.maxItemsPerList;
    }

    render() {
        let HTML = '';

        for (const feature of this.data.list) {
            HTML += `<div class="col-12 col-md-6 col-lg-4">
                        FEATURE 1
                    </div>`;
        }

        this.DOM.innerHTML = HTML;
    }
}

export { Features }