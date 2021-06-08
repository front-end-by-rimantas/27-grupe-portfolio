class Testimonials {
    constructor(data) {
        this.data = data;
    }

    HTML() {
        const src = this.data.imgPath + this.data.src;
        return `<div class="testimonial">
                    <img src="${src}" alt="${this.data.name} photo">
                    <div class="name">${this.data.name}</div>
                    <div class="location">${this.data.location}</div>
                    <div class="rating">5/5</div>
                    <div class="message">${this.data.message}</div>
                </div>`
    }
}

export { Testimonials }