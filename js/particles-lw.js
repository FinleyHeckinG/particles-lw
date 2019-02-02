"use strict";
var _createClass = (function() {
  function a(b, d) {
    for (var f, e = 0; e < d.length; e++)
      (f = d[e]),
        (f.enumerable = f.enumerable || !1),
        (f.configurable = !0),
        "value" in f && (f.writable = !0),
        Object.defineProperty(b, f.key, f);
  }
  return function(b, d, e) {
    return d && a(b.prototype, d), e && a(b, e), b;
  };
})();
function _possibleConstructorReturn(a, b) {
  if (!a)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return b && ("object" == typeof b || "function" == typeof b) ? b : a;
}
function _inherits(a, b) {
  if ("function" != typeof b && null !== b)
    throw new TypeError(
      "Super expression must either be null or a function, not " + typeof b
    );
  (a.prototype = Object.create(b && b.prototype, {
    constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 }
  })),
    b &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : (a.__proto__ = b));
}
function _defineProperty(a, b, d) {
  return (
    b in a
      ? Object.defineProperty(a, b, {
          value: d,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (a[b] = d),
    a
  );
}
function _classCallCheck(a, b) {
  if (!(a instanceof b))
    throw new TypeError("Cannot call a class as a function");
}
var generators = (function() {
    function a() {
      _classCallCheck(this, a);
    }
    return (
      _createClass(a, [
        {
          key: "createNewProportions",
          value: function createNewProportions(b, d) {
            return (b += Math.floor(Math.random() * d) - d);
          }
        },
        {
          key: "createRandomColour",
          value: function createRandomColour() {
            var b = {
              r: Math.floor(255 * Math.random()),
              g: Math.floor(255 * Math.random()),
              b: Math.floor(255 * Math.random())
            };
            return "rgb(" + b.r + "," + b.g + "," + b.b + ")";
          }
        },
        {
          key: "colour",
          get: function get() {
            return this.createRandomColour();
          }
        }
      ]),
      a
    );
  })(),
  particle = (function() {
    function a(b, d, e) {
      _classCallCheck(this, a),
        (this.ctx = b),
        (this.ctn = d),
        this.initPos(),
        (this.settings = {
          size: e.size || 20,
          variance: e.variance || 2,
          force: e.force || _defineProperty({ speed: speed }, "speed", speed),
          colour: this.selectColour(e.colour) || generator.colour
        });
      var f = generator.createNewProportions(
        this.settings.size,
        this.settings.variance
      );
      (this.width = f), (this.height = f);
    }
    return (
      _createClass(a, [
        {
          key: "initPos",
          value: function initPos() {
            (this.x = Math.floor(Math.random() * this.ctn.width)),
              (this.y = Math.floor(Math.random() * this.ctn.height));
          }
        },
        {
          key: "setCTN",
          value: function setCTN(b) {
            (this.ctn = { width: b.width, height: b.height }), this.initPos();
          }
        },
        {
          key: "render",
          value: function render() {
            this.settings.colour &&
              ((this.ctx.fillStyle = this.settings.colour),
              this.ctx.fillRect(this.x, this.y, this.width, this.height));
          }
        },
        {
          key: "selectColour",
          value: function selectColour(b) {
            try {
              return b[Math.floor(Math.random() * b.length)];
            } catch (d) {
              return !1;
            }
          }
        },
        {
          key: "checkSettings",
          value: function checkSettings() {
            this.x > this.ctn.width &&
              ((this.x = -this.width),
              (this.y =
                Math.floor(Math.random() * this.ctn.height) - 10 - this.width)),
              this.y > this.ctn.height &&
                ((this.y = -this.height),
                (this.x =
                  Math.floor(Math.random() * this.ctn.width) -
                  10 -
                  this.height));
          }
        },
        {
          key: "nextStep",
          value: function nextStep() {
            (this.x += this.settings.force.x),
              (this.y += this.settings.force.y),
              this.render(),
              this.checkSettings();
          }
        }
      ]),
      a
    );
  })(),
  particle_circle = (function(a) {
    function b() {
      return (
        _classCallCheck(this, b),
        _possibleConstructorReturn(
          this,
          (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments)
        )
      );
    }
    return (
      _inherits(b, a),
      _createClass(b, [
        {
          key: "render",
          value: function render() {
            (this.ctx.fillStyle = this.settings.colour),
              this.ctx.beginPath(),
              this.ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI),
              this.ctx.fill();
          }
        },
        {
          key: "checkSettings",
          value: function checkSettings() {
            this.x - this.width > this.ctn.width &&
              ((this.x = -this.width),
              (this.y =
                Math.floor(Math.random() * this.ctn.height) - 10 - this.width)),
              this.y - this.width > this.ctn.height &&
                ((this.y = -this.height),
                (this.x =
                  Math.floor(Math.random() * this.ctn.width) -
                  10 -
                  this.height));
          }
        }
      ]),
      b
    );
  })(particle),
  particleArea = (function() {
    function a(b) {
      var d = this;
      _classCallCheck(this, a),
        (this.parent = {
          dom: document.getElementById(b.root),
          box: document.getElementById(b.root).getBoundingClientRect()
        }),
        (this.width = this.parent.box.width),
        (this.height = this.parent.box.height),
        (this.settings = b),
        (this.particles = []),
        (window.onresize = function() {
          d.resizeCanvas();
        }),
        this.createSelf(),
        this.createParticles(b.amount || 20);
    }
    return (
      _createClass(a, [
        {
          key: "createSelf",
          value: function createSelf() {
            var b = document.createElement("canvas");
            (b.height = this.height),
              (b.width = this.width),
              this.parent.dom.appendChild(b),
              (this.ctx = b.getContext("2d")),
              (this.can = b);
          }
        },
        {
          key: "createParticles",
          value: function createParticles(b) {
            switch (this.settings.type) {
              case "circle": {
                for (var d = 0; d < b; d++)
                  this.particles.push(
                    new particle_circle(
                      this.ctx,
                      {
                        width: this.parent.box.width,
                        height: this.parent.box.height
                      },
                      this.settings
                    )
                  );
                break;
              }
              default: {
                for (var e = 0; e < b; e++)
                  this.particles.push(
                    new particle(
                      this.ctx,
                      {
                        width: this.parent.box.width,
                        height: this.parent.box.height
                      },
                      this.settings
                    )
                  );
                break;
              }
            }
            this.startAnimation();
          }
        },
        {
          key: "startAnimation",
          value: function startAnimation() {
            var b = this;
            (this.updateCanvas = function() {
              b.drawBG();
              for (var d = 0; d < b.particles.length; d++)
                b.particles[d].nextStep();
            }),
              (this.canvasLoop = setInterval(
                this.updateCanvas,
                this.settings.msPerUpdate || 10
              ));
          }
        },
        {
          key: "pauseAnimation",
          value: function pauseAnimation() {
            clearInterval(this.canvasLoop);
          }
        },
        {
          key: "drawBG",
          value: function drawBG() {
            this.ctx.clearRect(0, 0, this.width, this.height),
              (this.ctx.fillStyle = this.settings.background),
              this.ctx.fillRect(0, 0, this.width, this.height);
          }
        },
        {
          key: "resetSize",
          value: function resetSize() {
            (this.parent.box = this.parent.dom.getBoundingClientRect()),
              (this.width = this.parent.box.width),
              (this.height = this.parent.box.height),
              (this.can.width = this.width),
              (this.can.height = this.height);
          }
        },
        {
          key: "resizeCanvas",
          value: function resizeCanvas() {
            var b = this;
            this.pauseAnimation(),
              this.resetSize(),
              this.drawBG(),
              this.resizeEnd && clearTimeout(this.resizeEnd),
              (this.resizeEnd = setTimeout(function() {
                for (var d = 0; d < b.particles.length; d++)
                  b.particles[d].setCTN({
                    width: b.parent.box.width,
                    height: b.parent.box.height
                  });
                b.startAnimation();
              }, 50));
          }
        }
      ]),
      a
    );
  })(),
  generator = new generators();
