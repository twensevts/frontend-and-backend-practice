class ProductCards {
  constructor() {
    this.selectedProducts = new Set();
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (card) {
        this.handleCardClick(card);
      }
      
      if (e.target.classList.contains('product-card__button')) {
        e.stopPropagation(); 
        this.handleAddToCart(e.target);
      }
    });
    
    document.addEventListener('mouseover', (e) => {
      const card = e.target.closest('.product-card');
      if (card && !card.classList.contains('product-card--selected')) {
        card.classList.add('product-card--hover');
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      const card = e.target.closest('.product-card');
      if (card) {
        card.classList.remove('product-card--hover');
      }
    });
  }
  
  handleCardClick(card) {
    const productId = card.dataset.productId;
    
    if (card.classList.contains('product-card--selected')) {
      card.classList.remove('product-card--selected');
      this.selectedProducts.delete(productId);
    } else {
      card.classList.add('product-card--selected');
      this.selectedProducts.add(productId);
    }
    
    this.updateSelectionCounter();
  }
  
  handleAddToCart(button) {
    const card = button.closest('.product-card');
    const productName = card.querySelector('.product-card__title').textContent;
    const productPrice = card.querySelector('.product-card__price').textContent;
    
    button.textContent = 'Добавлено!';
    button.classList.add('product-card__button--added');
    
    setTimeout(() => {
      button.textContent = 'В корзину';
      button.classList.remove('product-card__button--added');
    }, 2000);
    
    console.log(`Товар добавлен в корзину: ${productName} - ${productPrice}`);
  }
  
  updateSelectionCounter() {
    console.log(`Выбрано товаров: ${this.selectedProducts.size}`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ProductCards();
});