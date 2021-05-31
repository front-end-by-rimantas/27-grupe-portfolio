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
        return true;
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