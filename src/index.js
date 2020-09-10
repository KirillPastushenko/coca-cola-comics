import Vue from 'vue';
import Vuebar from 'vuebar';
import * as comicsData from './components/comics-data';
import './css/style.css';
Vue.use(Vuebar);
const app = new Vue({
    el: '#app',
    data: function () {
        return {
            items: comicsData.comicsData,
            isComicsShow: false,
            isThumbsActive: false,
            currComics: {},
            currImageArr: [],
            currImageArrId: -1,
            prev: false,
            next: true,
            currCountImages: 0,
        }
    },
    methods: {
        showThumbs: function () {
            this.isThumbsActive = !this.isThumbsActive;
        },

        showComicPage: function (comicsID) {
            this.isComicsShow = true;
            this.currComics = this.items.filter(item => item.id == comicsID)[0];
            this.currImageArr = [];
            this.currImageArrId = -1;
            this.currCountImages = this.currComics.pages.length;
            this.currImageArr.push(this.currComics.poster);
        },

        setCurrImageArr: function(id){
            this.currCountImages = this.currComics.pages.length;
            this.currImageArrId = id;
            this.currImageArr = [];
            this.currImageArr = this.currComics.pages[id].slice();
            
        },

        beforeEnter: function (el) {
            el.style.opacity = 0;
        },

        enter: function (el, done) {
            let delay = el.dataset.index * 350;
            setTimeout(function () {
                el.style.opacity = 1;
            }, delay)
        },

        showPrevPage: function(){
             this.setCurrImageArr(--this.currImageArrId);
        },

        showNextPage: function(){
            this.setCurrImageArr(++this.currImageArrId);
        }
    }
})



setTimeout(function () {
    document.querySelector('body').classList.remove('firstload');
}, 50);

 