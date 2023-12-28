import { LightningElement } from 'lwc';
import CAROUSEL_IMAGE from '@salesforce/resourceUrl/carousel'
export default class RtfCustomCarouselWrapper extends LightningElement {

    slides=[
        {
            image:`${CAROUSEL_IMAGE}/carousel/photo1.jpg`,
            heading:'caption one',
            description:'you can add description of first slide here'
        },
        {
            image:`${CAROUSEL_IMAGE}/carousel/photo2.jpg`,
            heading:'caption two',
            description:'you can add description of two slide here'
        },
        {
            image:`${CAROUSEL_IMAGE}/carousel/photo3.jpg`,
            heading:'caption three',
            description:'you can add description of three slide here'
        },
    ]
}