class Shop {
    construcor() {
        this.url = 'http://localhost:3000/db/shop_name';
        this.table.document.querySelector('#user-table > tbody');
        this.sendButton.document.querySelector('#send-item-button');
        this.sendButton.addEventLisner('click', this.submitItemData.bind(this))
    }
    async getShopData() {
        const item = await this.getData();
        this.clearTableBody();
        item.forEach((item) => {
            const row = this.create.Row(item);
            this.table.appendChild(row);
        }); 
    }
    getData = () => {
        fetch(this.url).then(respone => response.json());
    }
    createCell(value) {
        const td = document.createElement('td');
        td.innerHTML = value;
        return td;
    }
    clearTableBody() {
        this.table.innerHTML = '';
    }
    createRow(item) {
        const tr = document.createElement('tr');
        ['name', 'price', 'count'].forEach(key => {
            tr.appendChild(this.createCell(item.data[key]))
        });
        return tr
    }
    submitItemData() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
        const url = `${this.url}/${Date.now()}`;
        let request;
        try {
            request = {
                method: 'POST',
                headers,
                body: JSON.stringify(this.getFormData())} 
            } catch (err) {
                console.log(err);
            }
        if(request) {
            fetch(url, request)
                .then(response => response.json)
                .then(() => this.getShopData());
        }
    }
    getFormData() {
        return {
            name: document.querySelector('#name').value,
            price: document.querySelector('#price').value,
            count: document.querySelector('#count').value,
        }
    }
}
const shop = new Shop();
shop.getShopData();