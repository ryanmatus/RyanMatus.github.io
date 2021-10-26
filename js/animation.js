{
    // https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
    function scrollIt(destination, duration = 200, easing = 'linear', callback) {
        const easings = {
          linear(t) {
            return t;
          },
          easeInQuad(t) {
            return t * t;
          },
          easeOutQuad(t) {
            return t * (2 - t);
          },
          easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          },
          easeInCubic(t) {
            return t * t * t;
          },
          easeOutCubic(t) {
            return (--t) * t * t + 1;
          },
          easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          },
          easeInQuart(t) {
            return t * t * t * t;
          },
          easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
          },
          easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
          },
          easeInQuint(t) {
            return t * t * t * t * t;
          },
          easeOutQuint(t) {
            return 1 + (--t) * t * t * t * t;
          },
          easeInOutQuint(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
          }
        };
      
        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      
        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
        const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
      
        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, destinationOffsetToScroll);
          if (callback) {
            callback();
          }
          return;
        }
      
        function scroll() {
          const now = 'now' in window.performance ? performance.now() : new Date().getTime();
          const time = Math.min(1, ((now - startTime) / duration));
          const timeFunction = easings[easing](time);
          window.scroll(0, Math.abs(Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start)));
          if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
              callback();
            }
            return;
          }
      
          requestAnimationFrame(scroll);
        }
      
        scroll();
    }

    // Generates a random float.
    const getRandom = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    // from http://www.quirksmode.org/js/events_properties.html#position
    const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) 	{
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) 	{
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { x : posx, y : posy }
    };

    // Equation of a line (y = mx + b ).
    const lineEq = (y2, y1, x2, x1, currentVal) => {
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        return m * currentVal + b;
    };

    // Window sizes.
    let winsize;
    const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    class MenuItem {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.number = this.DOM.el.querySelector('.menu__item-number');
            this.DOM.textwrap = this.DOM.el.querySelector('.menu__item-textwrap');
            this.DOM.text = this.DOM.textwrap.querySelector('.menu__item-text');
            this.DOM.link = this.DOM.el.querySelector('.menu__item-link');
        }
        toggleCurrent(direction = 'up') {
            const isCurrent = this.DOM.el.classList.contains('menu__item--current');
            this.DOM.el.classList[isCurrent ? 'remove' : 'add']('menu__item--current');
            // Toggle the link element ("explore").
            /*TweenMax.to(this.DOM.link, 1, {
                ease: Expo.easeOut,
                startAt: isCurrent ? null : {opacity: 0, y: direction === 'up' ? 15 : -15},
                y: isCurrent ? direction === 'up' ? -15 : 15 : 0,
                opacity: isCurrent ? 0 : 1
            });*/
        }
        show() {
            this.toggle('show');
        }
        hide() {
            this.toggle('hide');
        }
        toggle(action) {
            // Slide in/out the text.
            TweenMax.to(this.DOM.text, action === 'hide' ? 0.5 : 1, {
                ease: action === 'hide' ? Expo.easeIn : Expo.easeInOut,
                startAt: action === 'hide' ? null : {y: '103%'},
                y: action === 'hide' ? '103%' : '0%'
            });
            
            // Fade in/out the number and link.
            let extraElems = [this.DOM.number];
            if ( action === 'show' && !this.DOM.el.classList.contains('menu__item--current') ) {
                extraElems = [this.DOM.number];
            }
            TweenMax.to(extraElems, action === 'hide' ? 0.5 : 1, {
                ease: action === 'hide' ? Quint.easeIn : Quint.easeInOut,
                startAt: action === 'hide' ? null : {opacity: 0},
                opacity: action === 'hide' ? 0 : 1
            });
        }
	}
	
	class ContentItem {
        constructor(el) {
            this.DOM = {el: el};

            this.DOM.items = Array.from(this.DOM.el.querySelectorAll('content__item'));
        }
        toggleCurrent() {
            this.DOM.el.classList[this.DOM.el.classList.contains('content__item--current') ? 'remove' : 'add']('content__item--current');
        }
        open() {
            return new Promise((resolve, reject) => {
                this.DOM.el.classList.add('content--open');

                TweenMax.to(this.DOM.items, 1, {
                    ease: Expo.easeInOut,
                    opacity: 1
                });
            })
        }
    }

    class NavController {
        constructor(el) {
            this.DOM = {menu: el}; // Initialize with the menu element.
            // The Menu items instances.
            this.menuItems = [];
            Array.from(this.DOM.menu.querySelectorAll('.menu__item')).forEach((item) => this.menuItems.push(new MenuItem(item)));
            // The page element (the grids and contents parent)
            this.DOM.page = document.querySelector('.page');
            // The back ctrl. For closing the grid/content view and go back to the main page.
            this.DOM.backCtrl = this.DOM.page.querySelector('button.gridback');
            this.DOM.pageContents = this.DOM.page.querySelector('.content');
			// The content items instances.
            this.contentItems = [];
            Array.from(this.DOM.page.querySelectorAll('.content > .content__item')).forEach((item) => this.contentItems.push(new ContentItem(item)));
            
            this.init();
        }
        init() {
            // Current nav menu item index (starting with the first one).
            this.current = 0;
            // Add current class to the first menu item.
            this.menuItems[this.current].toggleCurrent();
            // Add current class to the first content item.
            this.contentItems[this.current].toggleCurrent();

            this.initEvents();
        }
        initEvents() {
            // Clicking the menu item text and link. (navigation and show the content).
            for (const [pos, item] of this.menuItems.entries()) {
                // Clicking on the menu item text will trigger the navigation
                item.DOM.textwrap.addEventListener('click', () => this.showContent(pos));
                // Clicking the view all will show the grid.
                item.DOM.link.addEventListener('click', () => this.showContent(pos));
            }

            // Closing the content view.
            this.DOM.backCtrl.addEventListener('click', () => this.hideContent());
        }

        showContent(pos) {
            if ( this.isAnimating ) return;
            const direction = this.current < pos ? 'up' : 'down';
			this.menuItems[this.current].toggleCurrent(direction);
			this.contentItems[this.current].toggleCurrent();
            this.isAnimating = true;
            // Update current value.
            this.current = pos;
			this.menuItems[this.current].toggleCurrent(direction);
			this.contentItems[this.current].toggleCurrent();
            this.isAnimating = false;

            if ( this.isAnimating  ) return;
			this.isAnimating = true;
            // Disable the menu.
            this.DOM.menu.classList.add('menu--closed');

            this.isAnimating = false;

            // Hide the menu items.
            for (const item of this.menuItems) {
                item.hide();
            }
            // Allow scroll.
            this.DOM.page.classList.remove('page--preview');
            // Show back ctrl.
            TweenMax.to(this.DOM.backCtrl, 1, {
                ease: Expo.easeInOut,
                opacity: 1
            });
            TweenMax.to(this.DOM.pageContents, 1, {
                ease: Expo.easeInOut,
                opacity: 1
            });
        }
        hideContent() {
            if ( this.isAnimating ) return;
            this.isAnimating = true;

            TweenMax.to(this.DOM.pageContents, 1, {
                ease: Expo.easeInOut,
                opacity: 0
            });

            // Hide back ctrl.
            TweenMax.to(this.DOM.backCtrl, 1, {
                ease: Expo.easeInOut,
                opacity: 0
            });
            
            scrollIt(0, 300, 'easeOutQuad', () => {
                // Disable scroll.
                this.DOM.page.classList.add('page--preview');
                // Enable the menu.
                this.DOM.menu.classList.remove('menu--closed');
                this.isAnimating = false;
                // Show the menu items.
                for (const item of this.menuItems) {
                    item.show();
                } 
            });
        }
    }

    // Initialize the nav controller.
    const controller = new NavController(document.querySelector('.menu'));

	// Preload all the images in the page..
    imagesLoaded(document.querySelectorAll('.grid__item'), {background: true}, () => document.body.classList.remove('loading'));
}
