import { LightningElement } from 'lwc';

export default class P2cParrentComponent extends LightningElement {
    carouselData=[
        {
            src : "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg",
            header : "First Card",
            description : "First card description from P2C.",
            href : "https://www.example.com"
        },
        {
            src : "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg",
            header :"Second Card",
            description : "Second card description from P2C.",
            href : "https://www.example.com"
        },
        {
            src : "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg",
            header : "Third Card",
            description : "Third card description from P2C.",
            href :  "https://www.example.com"
        }
    
    
    ];

    percentage=10;

    changeHandler(event){
        this.percentage=event.target.value;
    }

    handleClick(event){
        this.template.querySelector('c-p2c-slider-component').resetSlider();
    }
}