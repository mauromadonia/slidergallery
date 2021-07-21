/* class NavSelector{
    constructor(){
        this.card = document.querySelectorAll('.portfolio__carousel__slide__item'); 
        this.navSelector = document.querySelector('.sliderNav__menu__item');
        this.sliderNav = document.querySelector('.sliderNav__menu');
    }

    nav(){ 

        this.sliderNav.addEventListener('click', (e)=> {
            console.log(e.target.getAttribute('data-slides'));
            let navAttr = e.target.getAttribute('data-slides');

            this.card.forEach(element => {
                if(element.getAttribute('data-slides') != navAttr){
                    element.remove();
                }
            });
        });

    }
}


class CreateClone{
    constructor(){
        this.slide = document.querySelector('.portfolio__carousel__slide');
        this.card = document.querySelectorAll('.portfolio__carousel__slide__item');
        this.nbr = this.card.length - 1;
    }

    create(){ 
        for(let i = this.nbr; i > (this.nbr-4); i--){
            const lastClone = this.card[i].cloneNode(true);
            if(i === this.nbr){lastClone.setAttribute('id', 'lastClone');}
            this.slide.prepend(lastClone);
        }
        
        for(let i = 0; i < 4; i++){
            const firstClone = this.card[i].cloneNode(true);
            if(i === 0){firstClone.setAttribute('id', 'firstClone');}
            this.slide.append(firstClone);
        } 
    }
}


class SlideCard {
    constructor(){
        this.slide = document.querySelector('.portfolio__carousel__slide');
        this.card = document.querySelectorAll('.portfolio__carousel__slide__item'); 
        this.btnPrev = document.getElementById('prev');
        this.btnNext = document.getElementById('next');
        this.cardLength = this.card.length - 1;
        this.counter = Math.floor(this.cardLength / 2);
        this.size = this.card[0].clientWidth;    
    }
     
    slider(){
            //Position
            this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px';
            this.slide.style.transition = 'transform 0.4s ease-in-out';
            
            this.btnNext.addEventListener('click', ()=>{
                this.slide.style.transition = 'transform 0.4s ease-in-out';
                this.counter++;
                if(this.counter > this.cardLength){
                    this.counter = this.cardLength;
                }
                this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px';

                this.card.forEach(element => {
                    if(element.classList.value == 'portfolio__carousel__slide__item active'){
                        element.classList.remove('active');
                    }
                });

            });
        
            this.btnPrev.addEventListener('click', ()=> {
                this.slide.style.transition = 'transform 0.4s ease-in-out';
                this.counter--;
                if(this.counter < 0){
                    this.counter = 0;
                }
                this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px';

                this.card.forEach(element => {
                    if(element.classList.value == 'portfolio__carousel__slide__item active'){
                        element.classList.remove('active');
                    }
                });
            });
            
 

            this.slide.addEventListener('transitionend', ()=>{
                this.card[this.counter].classList.add('active');
                if(this.card[this.counter].id === 'lastClone'){
                    this.slide.style.transition = 'none';
                    this.counter = this.card.length - 5;
                    this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px';
                    this.card[this.counter].classList.add('active');
                }
            });

            this.slide.addEventListener('transitionend', ()=>{
                this.card[this.counter].classList.add('active');
            if(this.card[this.counter].id === 'firstClone'){
                this.slide.style.transition = 'none';
                this.counter = this.card.length - this.counter;
                this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px';
                this.card[this.counter].classList.add('active');
                }    
            });
    }
}


let navSelector = new NavSelector();
navSelector.nav(); 
let createClone = new CreateClone();
createClone.create();
let slide = new SlideCard();
slide.slider();
*/


class Slider {
    constructor(){
        this.slide = document.querySelector('.portfolio__carousel__slide');
        this.card = document.querySelectorAll('.portfolio__carousel__slide__item'); 
        this.btnPrev = document.getElementById('prev');
        this.btnNext = document.getElementById('next');
        this.cardLength = this.card.length - 1;
        this.counter = Math.floor(this.cardLength / 2);
        this.size = this.card[0].clientWidth;   
        this.navSelector = document.querySelector('.sliderNav__menu__item');
        this.sliderNav = document.querySelector('.sliderNav__menu');
        this.cardArray = [];
        this.newCard;
    }

    newSlides(){ 

        //Create Array
        this.card.forEach(element => this.cardArray.push(element));

        this.sliderNav.addEventListener('click', (e) => {

            if(e.target.getAttribute('data-slides') != 'all'){
                for ( let i = 0; i < this.card.length; i++){
                    if (this.card[i].getAttribute('data-slides') != e.target.getAttribute('data-slides')){
                        this.card[i].remove();
                    }else{
                        this.slide.append(this.cardArray[i]);
                    }
                }
 

            }else{
                for (let i = 0; i < this.cardArray.length; i++){
                    this.slide.append(this.cardArray[i]);
                }
            }
        
            this.newCard = document.querySelectorAll('#card');
            this.createClone(this.newCard);
            this.slider();

        });

         this.createClone(this.card);
         this.slider();

    }

    createClone(card){
        const oldCard = document.querySelectorAll('.portfolio__carousel__slide__item');
        for( let i = 0; i < oldCard.length; i++){
            if(oldCard[i].getAttribute('data-slides') === 'clone'){
                oldCard[i].remove();
            }
        }

        const cardLength = card.length - 1;

                //Create last and first Clone
                for(let i = cardLength; i > (cardLength-4); i--){
                    const lastClone = card[i].cloneNode(true);
                    lastClone.setAttribute('data-slides', 'clone');
                    lastClone.removeAttribute('id');
                    if(i === cardLength){
                        lastClone.setAttribute('id', 'lastClone');
                        
                    }
                    this.slide.prepend(lastClone);
                }
                
                for(let i = 0; i < 4; i++){
                    const firstClone = card[i].cloneNode(true);
                    firstClone.setAttribute('data-slides', 'clone');
                    firstClone.removeAttribute('id');
                    if(i === 0){
                        firstClone.setAttribute('id', 'firstClone');
                        
                    }
                    this.slide.append(firstClone);
                }
                this.card = document.querySelectorAll('.portfolio__carousel__slide__item'); 
                this.cardLength = this.card.length - 1;
    }
    slider(){

        this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px';
        this.slide.style.transition = 'transform 0.4s ease-in-out';
        
        this.btnNext.addEventListener('click', ()=>{
            this.slide.style.transition = 'transform 0.4s ease-in-out';
            this.counter++;
            if(this.counter > this.cardLength){
                this.counter = this.cardLength;
            }
            this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px';

            this.card.forEach(element => {
                if(element.classList.value == 'portfolio__carousel__slide__item active'){
                    element.classList.remove('active');
                }
            });

        });
    
        this.btnPrev.addEventListener('click', ()=> {
            this.slide.style.transition = 'transform 0.4s ease-in-out';
            this.counter--;
            if(this.counter < 0){
                this.counter = 0;
            }
            this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px';

            this.card.forEach(element => {
                if(element.classList.value == 'portfolio__carousel__slide__item active'){
                    element.classList.remove('active');
                }
            });
        });

        this.slide.addEventListener('transitionend', ()=>{
            this.card[this.counter].classList.add('active');

            if(this.card[this.counter].id){
                this.slide.style.transition = 'none';
                if(this.card[this.counter].id === 'lastClone'){
                    this.counter = this.card.length - 5;
                }
                if(this.card[this.counter].id === 'firstClone'){
                    this.counter = this.card.length - this.counter;
                }
                this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px';
                this.card[this.counter].classList.add('active');
            }
        });
    }

}

let slider = new Slider();
slider.newSlides();



class Test {
    constructor(){
        this.records = document.querySelector('.records');
        this.record = document.querySelectorAll('.record');
        this.item = document.querySelectorAll('.item');
        this.recordArray = Array.from(this.record);
        this.recordContainer = document.querySelector('.record_container');
        this.itemArray = [];
    }

    start(){

     this.item.forEach(element => this.itemArray.push(element));

this.records.addEventListener('click', (e) =>{

    if(e.target.getAttribute('data-record') != 'all'){
        for ( let i = 0; i < this.item.length; i++){
            if (this.item[i].getAttribute('data-record') != e.target.getAttribute('data-record')){
                this.item[i].remove();
            }else{
                this.recordContainer.append(this.itemArray[i]);
            }
        }
    }else{
        for (let i = 0; i < this.item.length; i++){
            this.recordContainer.append(this.itemArray[i]);
        }
    }

    
});



    }

    stampa(param){
        console.log(param);
    }
}

let test = new Test();
test.start();