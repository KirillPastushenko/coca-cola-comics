import "@babel/polyfill";
import Vue from "vue";
import Vuebar from "vuebar";
import * as comicsData from "./components/comics-data";
import "./css/style.css";



Vue.use(Vuebar);
const app = new Vue({
  el: "#app",
  data: function () {
    return {
      items: comicsData.comicsData,
      isComicsShow: false,
      isThumbsActive: false,
      currComics: {},
      currImageArr: [],
      currImageArrId: -1,
      currCountImages: 0,
      prev: false,
      next: true,
      showMobile: false,
      showModal: false,
      anim: true,
      timer: null,
      nextPage: true
    };
  },

  created() {
    if (process.browser) {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    };
    document.addEventListener("keydown", (event) => {
      if (event.keyCode == 32 || event.keyCode == 39 || event.keyCode == 13) {
        this.showNextPage();
      } else if (event.keyCode == 37) {
        this.showPrevPage();
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    showThumbs: function () {
      this.isThumbsActive = !this.isThumbsActive;
    },

    showComicPage: function (comicsID) {
      this.isComicsShow = true;
      this.currComics = this.items.filter((item) => item.id == comicsID)[0];
      this.currImageArr = [];
      this.currImageArrId = -1;
      this.currCountImages = this.currComics.pages.length;
      this.currImageArr.push(this.currComics.poster);
    },

    setCurrImageArr: function (id) {
      this.anim = false;
      this.currCountImages = this.currComics.pages.length;
      this.currImageArrId = id;
      this.currImageArr = [];
      this.currImageArr = this.currComics.pages[id].slice();
      this.timer = setTimeout(() => {
        this.anim = true;
      }, this.currImageArr.length * 700);
      this.isNextPageActive();
    },

    beforeEnter: function (el) {
      el.style.opacity = 0;
      el.style.transform = "translateY(20px)";
    },

    enter: function (el, done) {
      let delay = el.getAttribute('data-index') * 700;
      setTimeout(function () {
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, delay);
    },

    showPrevPage: function () {
      if (this.currImageArrId > 0 && this.anim == true) {
        this.setCurrImageArr(--this.currImageArrId);
      } else {
        this.anim = true;
        clearTimeout(this.timer);
      }
    },

    showNextPage: function () {
      if (this.currImageArrId + 1 < this.currCountImages && this.anim == true && this.nextPage) {
        this.setCurrImageArr(++this.currImageArrId);
      } else {
        this.anim = true;
        clearTimeout(this.timer);
      }
      this.isNextPageActive();
    },

    isNextPageActive: function () {
        this.nextPage = this.currImageArrId + 1 == this.currCountImages ?
        this.items[this.currComics.id].active : 
        true;
    },

    goToBlock: function (event) {
      event.preventDefault();
      let link = event.target.getAttribute('href');
      document.querySelector(link).scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    onResize: function () {
      this.showMobile = document.documentElement.clientWidth > 1023 ? false : true;
    },
  },
});

setTimeout(function () {
  document.querySelector("body").classList.remove("firstload");
}, 50);

