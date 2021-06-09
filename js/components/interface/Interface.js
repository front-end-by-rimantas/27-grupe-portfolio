class Interface {
    constructor(data) {
        this.data = data;
    }

    HTML() {
        const src = this.data.imgPath + this.data.src;
        return `<img class="interface" src="${src}" alt="${this.data.alt}">`;
    }
}

export { Interface }