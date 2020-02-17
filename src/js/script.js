class Shop {
    construcor() {
        this.url = 'http://localhost:3000/db/shop_name';
        this.table.document.querySelector('#user-table > tbody');
        this.sendButton.document.querySelector('#send-item-button');
        this.sendButton.addEventLisner('click', this.submitItemData.bind(this))
    }
    async getShopData() {
        const items = await this.getData();
        this.clearTableBody();
        items.forEach((item) => {
            const row = this.createRow(item);
            this.table.appendChild(row);
        });
    }
    getData = () => fetch(this.url)
        .then(response => response.json());

    createCell(value) {
        const td = document.createElement('td');
        td.innerHTML = value;
        return td;
    }
   
    createRow(item) {
        const tr = document.createElement('tr');
        ['name', 'price', 'count'].forEach(key => {
            tr.appendChild(this.createCell(item.data[key]))
        });
        tr.appendChild(this.deleteButton(item._id))
        return tr
    }
    clearTableBody() {
        this.table.innerHTML = '';
    }
    deleteButton(id) {
        const button = document.createElement('button');
        button.innerText = 'Usuń';
        button.dataset.itemId = id;
        button.addEventListener('click', this.removeItemHandler.bind(this));
        const cell = document.createElement('td');
        cell.appendChild(button);
        return cell;
    }
    removeItemHandler(e) {
        const id = e.target.dataset.itemId;
        const url = `${this.url}/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(() => this.getShopData())
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
                .then(response => response.json())
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