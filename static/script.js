class Entity {
    
    #title;
    #description;
    #totalAmount;
    #paymentMethod;

    constructor(
        //user provided properties
        title = '',
        description = '',

        //payload properties
        totalAmount = 0,
        paymentMethod = '',
    ){
        this.#title = title;
        this.#description = description;
        this.#totalAmount = totalAmount;
        this.#paymentMethod = paymentMethod;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get totalAmount() {
        return this.#totalAmount;
    }

    get paymentMethod() {
        return this.#paymentMethod;
    }
}

class EntityStore {

    #entities = [];

    constructor(){
        if(EntityStore.instance) {
            throw new Error('Cannot instantiate more than once.')
        }
        EntityStore.instance = this;
    }


    get entities() {
        return this.#entities;
    }


    /**
     * this is a placeholder function, until rest api is established
     */
    fillEntities() {
        for(let i = 0; i <= 10; i++) {
            this.#entities.push(new Entity(`title${i}`, `description${i}`));
        }
    }
}

class Display {

    /**
     * @type {EntityStore}
     * @private
     */
    #entityStore;

    constructor(){
        if(Display.instance) {
            throw new Error('Cannot instantiate more than once.')
        }
        Display.instance = this;
        this.#entityStore = new EntityStore();
    }

    renderEntities(currentPage = 1) {
        this.#entityStore.fillEntities(); 
        const cards = document.querySelector('.cards');
        const pages = ArrayUtils.chunkArray(this.#entityStore.entities, 9);

        for(const chunk of ArrayUtils.chunkArray(pages[currentPage], 3)) {
            const row = document.createElement('row');
            row.classList.add('row', 'gap-3', 'justify-content-center');

            for(const item of chunk) {
                const card = document.createElement('div');
                card.classList.add('card', 'col-md-3','col-lg-2' , 'mb-3');
    
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body', 'd-flex', 'flex-column');
    
                const cardTitle = document.createElement('span');
                cardTitle.classList.add('card-title');
                cardTitle.innerText = item.title;
    
                const cardText = document.createElement('span');
                cardText.classList.add('card-text', 'd-flex', 'flex-column');

                const itemTotalAmount = document.createElement('span');
                itemTotalAmount.innerText = `Total amount: ${item.totalAmount}`;

                const itemPaymentMethod = document.createElement('span');
                itemPaymentMethod.innerText = `Payment method: ${item.paymentMethod}`;
    
                cardText.append(itemTotalAmount, itemPaymentMethod);
                cardBody.append(cardTitle, cardText);
                card.appendChild(cardBody);
                row.appendChild(card);
            }
            cards.appendChild(row)
        }
    }

    renderPageBtns() {

        const paginationContainer = document.querySelector('.pagination');

        const nextPageBtn = document.createElement('li');
        nextPageBtn.classList.add('page-item', 'disabled');

        const nextPageLink = document.createElement('a');
        nextPageLink.classList.add('page-link');
        nextPageLink.innerText = 'Next';

        paginationContainer.append(nextPageBtn, nextPageLink)

        ArrayUtils.chunkArray(this.#entityStore.entities, 9).forEach((element, index) => {
            const pageBtn = document.createElement('li');
            pageBtn.classList.add('page-item');

            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.tabIndex = -1;
            pageLink.href = index + 1;
            pageLink.innerText = index + 1;
            

            paginationContainer.append(pageBtn, pageLink)
        })

        const previousPageBtn = document.createElement('li');
        previousPageBtn.classList.add('page-item', 'disabled');

        const previousPageLink = document.createElement('a');
        previousPageLink.classList.add('page-link');
        previousPageLink.innerText = 'Previous';

        paginationContainer.append(previousPageBtn, previousPageLink)
    }
}

class ArrayUtils {
    /**
     * 
     * @param {Array} array 
     * @param {number} chunkSize 
     * @returns {Array}
     */
    static chunkArray(array, chunkSize) {
        const result = [];

        for(let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }

        return result;
    }
}

(function run() {
    const display = new Display();

    display.renderEntities();
    display.renderPageBtns();
    
})()




