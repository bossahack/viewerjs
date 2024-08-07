window.onload = function () {
  'use strict';

  var Viewer = window.Viewer;
  var console = window.console || { log: function () {} };
  var pictures = document.querySelector('.docs-pictures');
  var toggles = document.querySelector('.docs-toggles');
  var buttons = document.querySelector('.docs-buttons');
  var options = {
    // inline: true,
    url: 'data-original',
    wheelSpeed:300,
    ready: function (e) {
      console.log(e.type);
    },
    show: function (e) {
      console.log(e.type);
    },
    shown: function (e) {
      console.log(e.type);
    },
    hide: function (e) {
      console.log(e.type);
    },
    hidden: function (e) {
      console.log(e.type);
    },
    view: function (e) {
      console.log(e.type);
    },
    viewed: function (e) {
      console.log(e.type);
    },
    move: function (e) {
      console.log(e.type);
    },
    moved: function (e) {
      console.log(e.type);
    },
    rotate: function (e) {
      console.log(e.type);
    },
    rotated: function (e) {
      console.log(e.type);
    },
    scale: function (e) {
      console.log(e.type);
    },
    scaled: function (e) {
      console.log(e.type);
    },
    zoom: function (e) {
      console.log(e.type);
    },
    zoomed: function (e) {
      console.log(e.type);
    },
    play: function (e) {
      console.log(e.type);
    },
    stop: function (e) {
      console.log(e.type);
    },
    toolbar: {
      toogleNavbar: function () {
        viewer.toggleNavbar();
      },
      divider1:true,
      zoomOut: true,
      zoomIn: true,
      oneToOne: true,     
      divider2:true, 
      oneToOne: true,     
      pagination:true
    },
    title: false,
    tooltip:false,
    initialCoverage: 0.98,
    inheritedAttributes: [ 'tags' ],
    toggleOnDblclick: false,
    backdrop:'static',
    filter:function(image){
      console.log(image)
      return image.getAttribute('ignore') !=='true'
    },
    justOneChangeCallback:function(){
      alert('仅一张图片')
    },
    url:function(img){
      return img.dataset.original.replace('_s','_b').replace('_n','_b')
    },
    //缩略图使用的图片
    navbarImgUrl:'data-small'
  };
  var viewer = window.viewer = new Viewer(pictures, options);

  function toggleButtons(mode) {
    var targets;
    var target;
    var length;
    var i;

    if (/modal|inline|none/.test(mode)) {
      targets = buttons.querySelectorAll('button[data-enable]');

      for (i = 0, length = targets.length; i < length; i++) {
        target = targets[i];
        target.disabled = true;

        if (String(target.getAttribute('data-enable')).indexOf(mode) > -1) {
          target.disabled = false;
        }
      }
    }
  }

  function addEventListener(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    }
  }

  toggleButtons(options.inline ? 'inline' : 'modal');

  toggles.onchange = function (event) {
    var e = event || window.event;
    var input = e.target || e.srcElement;
    var name;

    if (viewer) {
      name = input.getAttribute('name');
      options[name] = name === 'inline' ? JSON.parse(input.getAttribute('data-value')) : input.checked;
      viewer.destroy();
      viewer = new Viewer(pictures, options);
      toggleButtons(options.inline ? 'inline' : 'modal');
    }
  };

  buttons.onclick = function (event) {
    var e = event || window.event;
    var button = e.target || e.srcElement;
    var method = button.getAttribute('data-method');
    var target = button.getAttribute('data-target');
    var args = JSON.parse(button.getAttribute('data-arguments')) || [];

    if (viewer && method) {
      if (target) {
        viewer[method](document.querySelector(target).value);
      } else {
        viewer[method](args[0], args[1]);
      }

      switch (method) {
        case 'scaleX':
        case 'scaleY':
          args[0] = -args[0];
          break;

        case 'destroy':
          viewer = null;
          toggleButtons('none');
          break;
      }
    }
  };

  // $('[data-toggle="tooltip"]').tooltip();
};
// document.querySelector('body').append(window.navigator.userAgent.toLowerCase())

// class AccurateTimer{
//   constructor(callback,interval,repeat) {
//     this.id = null;
//     this.callback = callback;
//     this.interval = interval;
//     this.repeat = repeat;
//     this.startTime = null;
//   }
//   exec (startTime=performance.now()) {
//     this.startTime = startTime
//     this.id=requestAnimationFrame(this.loop.bind(this))
//   }
//   loop () {
//     if (!this.id) return;
//     let now=performance.now()
//     if (now - this.startTime >= this.interval) {
//       this.callback();
//       if (this.repeat) {
//         this.startTime = now;
//         this.exec()
//       }
//     } else {
//       this.exec(this.startTime)
//     }
//   }
//   cancel () {
//     this.id = null;
//   }

// }

// let timer = new AccurateTimer(() => {
//   console.count()
// },1000,true);
// timer.exec()