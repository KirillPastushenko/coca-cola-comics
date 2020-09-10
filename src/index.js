import Vue from 'vue';
import * as comicsData from './components/comics-data';
import './css/style.css';

const app = new Vue({
    el: '#app',
    data: function () {
        return {
            items: comicsData.comicsData,
            isComicsShow: false,
            isThumbsActive: false,
            currComics: {},
            currImage: [],
            prev: true,
            next: true
        }
    },
    methods: {
        showThumbs: function () {
            this.isThumbsActive = !this.isThumbsActive;
        },

        showComicPage: function (comicsID) {
            this.isComicsShow = true;
            this.currComics = this.items.filter(item => item.id == comicsID)[0];
            this.currImage = [];
            this.currImage.push(this.currComics.poster);
        //    if(this.currComics.pages.length > 1) this.next = true;
        },

        setCurrImage: function(id){
            if(this.currComics.id != id){
                this.currImage = [];
                this.currImage = this.currComics.pages[id].slice();
            }
        },

        beforeEnter: function (el) {
            el.style.opacity = 0;
            el.style.transition = '.3s';
        },
        enter: function (el) {
            let delay = el.dataset.index * 850
            setTimeout(function () {
                el.style.opacity = 1 
            }, delay)
          },

    }

})







setTimeout(function () {
    document.querySelector('body').classList.remove('firstload');
}, 50);

 