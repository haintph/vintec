(function () {
  window.addEventListener("message", function (event) {
    if (event.data.type !== "capsolverCallback") return;
    window[event.data.callback] && window[event.data.callback]();
  });
})();
//========
("use strict");
(() => {
  var Z = Object.create;
  var _ = Object.defineProperty;
  var ee = Object.getOwnPropertyDescriptor;
  var te = Object.getOwnPropertyNames;
  var ne = Object.getPrototypeOf,
    re = Object.prototype.hasOwnProperty;
  var oe = (e, t) => () => (
    t ||
      e(
        (t = {
          exports: {},
        }).exports,
        t
      ),
    t.exports
  );
  var ie = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let o of te(t))
        !re.call(e, o) &&
          o !== r &&
          _(e, o, {
            get: () => t[o],
            enumerable: !(n = ee(t, o)) || n.enumerable,
          });
    return e;
  };
  var ae = (e, t, r) => (
    (r = e != null ? Z(ne(e)) : {}),
    ie(
      t || !e || !e.__esModule
        ? _(r, "default", {
            value: e,
            enumerable: !0,
          })
        : r,
      e
    )
  );
  var O = oe((Ce, C) => {
    "use strict";
    var h = typeof Reflect == "object" ? Reflect : null,
      I =
        h && typeof h.apply == "function"
          ? h.apply
          : function (t, r, n) {
              return Function.prototype.apply.call(t, r, n);
            },
      y;
    h && typeof h.ownKeys == "function"
      ? (y = h.ownKeys)
      : Object.getOwnPropertySymbols
      ? (y = function (t) {
          return Object.getOwnPropertyNames(t).concat(
            Object.getOwnPropertySymbols(t)
          );
        })
      : (y = function (t) {
          return Object.getOwnPropertyNames(t);
        });
    function se(e) {
      console && console.warn && console.warn(e);
    }
    var k =
      Number.isNaN ||
      function (t) {
        return t !== t;
      };
    function l() {
      l.init.call(this);
    }
    C.exports = l;
    C.exports.once = fe;
    l.EventEmitter = l;
    l.prototype._events = void 0;
    l.prototype._eventsCount = 0;
    l.prototype._maxListeners = void 0;
    var S = 10;
    function v(e) {
      if (typeof e != "function")
        throw new TypeError(
          'The "listener" argument must be of type Function. Received type ' +
            typeof e
        );
    }
    Object.defineProperty(l, "defaultMaxListeners", {
      enumerable: !0,
      get: function () {
        return S;
      },
      set: function (e) {
        if (typeof e != "number" || e < 0 || k(e))
          throw new RangeError(
            'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
              e +
              "."
          );
        S = e;
      },
    });
    l.init = function () {
      (this._events === void 0 ||
        this._events === Object.getPrototypeOf(this)._events) &&
        ((this._events = Object.create(null)), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    };
    l.prototype.setMaxListeners = function (t) {
      if (typeof t != "number" || t < 0 || k(t))
        throw new RangeError(
          'The value of "n" is out of range. It must be a non-negative number. Received ' +
            t +
            "."
        );
      return (this._maxListeners = t), this;
    };
    function B(e) {
      return e._maxListeners === void 0
        ? l.defaultMaxListeners
        : e._maxListeners;
    }
    l.prototype.getMaxListeners = function () {
      return B(this);
    };
    l.prototype.emit = function (t) {
      for (var r = [], n = 1; n < arguments.length; n++) r.push(arguments[n]);
      var o = t === "error",
        i = this._events;
      if (i !== void 0) o = o && i.error === void 0;
      else if (!o) return !1;
      if (o) {
        var a;
        if ((r.length > 0 && (a = r[0]), a instanceof Error)) throw a;
        var f = new Error(
          "Unhandled error." + (a ? " (" + a.message + ")" : "")
        );
        throw ((f.context = a), f);
      }
      var c = i[t];
      if (c === void 0) return !1;
      if (typeof c == "function") I(c, this, r);
      else
        for (var s = c.length, u = A(c, s), n = 0; n < s; ++n) I(u[n], this, r);
      return !0;
    };
    function R(e, t, r, n) {
      var o, i, a;
      if (
        (v(r),
        (i = e._events),
        i === void 0
          ? ((i = e._events = Object.create(null)), (e._eventsCount = 0))
          : (i.newListener !== void 0 &&
              (e.emit("newListener", t, r.listener ? r.listener : r),
              (i = e._events)),
            (a = i[t])),
        a === void 0)
      )
        (a = i[t] = r), ++e._eventsCount;
      else if (
        (typeof a == "function"
          ? (a = i[t] = n ? [r, a] : [a, r])
          : n
          ? a.unshift(r)
          : a.push(r),
        (o = B(e)),
        o > 0 && a.length > o && !a.warned)
      ) {
        a.warned = !0;
        var f = new Error(
          "Possible EventEmitter memory leak detected. " +
            a.length +
            " " +
            String(t) +
            " listeners added. Use emitter.setMaxListeners() to increase limit"
        );
        (f.name = "MaxListenersExceededWarning"),
          (f.emitter = e),
          (f.type = t),
          (f.count = a.length),
          se(f);
      }
      return e;
    }
    l.prototype.addListener = function (t, r) {
      return R(this, t, r, !1);
    };
    l.prototype.on = l.prototype.addListener;
    l.prototype.prependListener = function (t, r) {
      return R(this, t, r, !0);
    };
    function ce() {
      if (!this.fired)
        return (
          this.target.removeListener(this.type, this.wrapFn),
          (this.fired = !0),
          arguments.length === 0
            ? this.listener.call(this.target)
            : this.listener.apply(this.target, arguments)
        );
    }
    function P(e, t, r) {
      var n = {
          fired: !1,
          wrapFn: void 0,
          target: e,
          type: t,
          listener: r,
        },
        o = ce.bind(n);
      return (o.listener = r), (n.wrapFn = o), o;
    }
    l.prototype.once = function (t, r) {
      return v(r), this.on(t, P(this, t, r)), this;
    };
    l.prototype.prependOnceListener = function (t, r) {
      return v(r), this.prependListener(t, P(this, t, r)), this;
    };
    l.prototype.removeListener = function (t, r) {
      var n, o, i, a, f;
      if ((v(r), (o = this._events), o === void 0)) return this;
      if (((n = o[t]), n === void 0)) return this;
      if (n === r || n.listener === r)
        --this._eventsCount === 0
          ? (this._events = Object.create(null))
          : (delete o[t],
            o.removeListener &&
              this.emit("removeListener", t, n.listener || r));
      else if (typeof n != "function") {
        for (i = -1, a = n.length - 1; a >= 0; a--)
          if (n[a] === r || n[a].listener === r) {
            (f = n[a].listener), (i = a);
            break;
          }
        if (i < 0) return this;
        i === 0 ? n.shift() : le(n, i),
          n.length === 1 && (o[t] = n[0]),
          o.removeListener !== void 0 && this.emit("removeListener", t, f || r);
      }
      return this;
    };
    l.prototype.off = l.prototype.removeListener;
    l.prototype.removeAllListeners = function (t) {
      var r, n, o;
      if (((n = this._events), n === void 0)) return this;
      if (n.removeListener === void 0)
        return (
          arguments.length === 0
            ? ((this._events = Object.create(null)), (this._eventsCount = 0))
            : n[t] !== void 0 &&
              (--this._eventsCount === 0
                ? (this._events = Object.create(null))
                : delete n[t]),
          this
        );
      if (arguments.length === 0) {
        var i = Object.keys(n),
          a;
        for (o = 0; o < i.length; ++o)
          (a = i[o]), a !== "removeListener" && this.removeAllListeners(a);
        return (
          this.removeAllListeners("removeListener"),
          (this._events = Object.create(null)),
          (this._eventsCount = 0),
          this
        );
      }
      if (((r = n[t]), typeof r == "function")) this.removeListener(t, r);
      else if (r !== void 0)
        for (o = r.length - 1; o >= 0; o--) this.removeListener(t, r[o]);
      return this;
    };
    function D(e, t, r) {
      var n = e._events;
      if (n === void 0) return [];
      var o = n[t];
      return o === void 0
        ? []
        : typeof o == "function"
        ? r
          ? [o.listener || o]
          : [o]
        : r
        ? ue(o)
        : A(o, o.length);
    }
    l.prototype.listeners = function (t) {
      return D(this, t, !0);
    };
    l.prototype.rawListeners = function (t) {
      return D(this, t, !1);
    };
    l.listenerCount = function (e, t) {
      return typeof e.listenerCount == "function"
        ? e.listenerCount(t)
        : W.call(e, t);
    };
    l.prototype.listenerCount = W;
    function W(e) {
      var t = this._events;
      if (t !== void 0) {
        var r = t[e];
        if (typeof r == "function") return 1;
        if (r !== void 0) return r.length;
      }
      return 0;
    }
    l.prototype.eventNames = function () {
      return this._eventsCount > 0 ? y(this._events) : [];
    };
    function A(e, t) {
      for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
      return r;
    }
    function le(e, t) {
      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
      e.pop();
    }
    function ue(e) {
      for (var t = new Array(e.length), r = 0; r < t.length; ++r)
        t[r] = e[r].listener || e[r];
      return t;
    }
    function fe(e, t) {
      return new Promise(function (r, n) {
        function o(a) {
          e.removeListener(t, i), n(a);
        }
        function i() {
          typeof e.removeListener == "function" && e.removeListener("error", o),
            r([].slice.call(arguments));
        }
        H(e, t, i, {
          once: !0,
        }),
          t !== "error" &&
            pe(e, o, {
              once: !0,
            });
      });
    }
    function pe(e, t, r) {
      typeof e.on == "function" && H(e, "error", t, r);
    }
    function H(e, t, r, n) {
      if (typeof e.on == "function") n.once ? e.once(t, r) : e.on(t, r);
      else if (typeof e.addEventListener == "function")
        e.addEventListener(t, function o(i) {
          n.once && e.removeEventListener(t, o), r(i);
        });
      else
        throw new TypeError(
          'The "emitter" argument must be of type EventEmitter. Received type ' +
            typeof e
        );
    }
  });
  var N = ae(O());
  var w,
    b = 0,
    d = new Array(256);
  for (let e = 0; e < 256; e++) d[e] = (e + 256).toString(16).substring(1);
  var de = (() => {
      let e =
        typeof crypto != "undefined"
          ? crypto
          : typeof window != "undefined"
          ? window.crypto || window.msCrypto
          : void 0;
      if (e !== void 0) {
        if (e.randomBytes !== void 0) return e.randomBytes;
        if (e.getRandomValues !== void 0)
          return (t) => {
            let r = new Uint8Array(t);
            return e.getRandomValues(r), r;
          };
      }
      return (t) => {
        let r = [];
        for (let n = t; n > 0; n--) r.push(Math.floor(Math.random() * 256));
        return r;
      };
    })(),
    F = 4096;
  function q() {
    (w === void 0 || b + 16 > F) && ((b = 0), (w = de(F)));
    let e = Array.prototype.slice.call(w, b, (b += 16));
    return (
      (e[6] = (e[6] & 15) | 64),
      (e[8] = (e[8] & 63) | 128),
      d[e[0]] +
        d[e[1]] +
        d[e[2]] +
        d[e[3]] +
        "-" +
        d[e[4]] +
        d[e[5]] +
        "-" +
        d[e[6]] +
        d[e[7]] +
        "-" +
        d[e[8]] +
        d[e[9]] +
        "-" +
        d[e[10]] +
        d[e[11]] +
        d[e[12]] +
        d[e[13]] +
        d[e[14]] +
        d[e[15]]
    );
  }
  var me = {
      undefined: () => 0,
      boolean: () => 4,
      number: () => 8,
      string: (e) => 2 * e.length,
      object: (e) =>
        e ? Object.keys(e).reduce((t, r) => L(r) + L(e[r]) + t, 0) : 0,
    },
    L = (e) => me[typeof e](e),
    g = class extends N.EventEmitter {
      constructor(t) {
        super(),
          this.setMaxListeners(1 / 0),
          (this.wall = t),
          t.listen((r) => {
            Array.isArray(r) ? r.forEach((n) => this._emit(n)) : this._emit(r);
          }),
          (this._sendingQueue = []),
          (this._sending = !1),
          (this._maxMessageSize = 32 * 1024 * 1024);
      }
      send(t, r) {
        return this._send([
          {
            event: t,
            payload: r,
          },
        ]);
      }
      getEvents() {
        return this._events;
      }
      on(t, r) {
        return super.on(t, (n) => {
          r({
            ...n,
            respond: (o) => this.send(n.eventResponseKey, o),
          });
        });
      }
      _emit(t) {
        typeof t == "string" ? this.emit(t) : this.emit(t.event, t.payload);
      }
      _send(t) {
        return this._sendingQueue.push(t), this._nextSend();
      }
      _nextSend() {
        if (!this._sendingQueue.length || this._sending)
          return Promise.resolve();
        this._sending = !0;
        let t = this._sendingQueue.shift(),
          r = t[0],
          n = `${r.event}.${q()}`,
          o = n + ".result";
        return new Promise((i, a) => {
          let f = [],
            c = (s) => {
              if (s !== void 0 && s._chunkSplit) {
                let u = s._chunkSplit;
                (f = [...f, ...s.data]), u.lastChunk && (this.off(o, c), i(f));
              } else this.off(o, c), i(s);
            };
          this.on(o, c);
          try {
            let s = t.map((u) => ({
              ...u,
              payload: {
                data: u.payload,
                eventResponseKey: o,
              },
            }));
            this.wall.send(s);
          } catch (s) {
            let u = "Message length exceeded maximum allowed length.";
            if (s.message === u && Array.isArray(r.payload)) {
              let p = L(r);
              if (p > this._maxMessageSize) {
                let m = Math.ceil(p / this._maxMessageSize),
                  G = Math.ceil(r.payload.length / m),
                  T = r.payload;
                for (let x = 0; x < m; x++) {
                  let J = Math.min(T.length, G);
                  this.wall.send([
                    {
                      event: r.event,
                      payload: {
                        _chunkSplit: {
                          count: m,
                          lastChunk: x === m - 1,
                        },
                        data: T.splice(0, J),
                      },
                    },
                  ]);
                }
              }
            }
          }
          (this._sending = !1), setTimeout(() => this._nextSend(), 16);
        });
      }
    };
  var j = (e, t) => {
    window.addEventListener(
      "message",
      (r) => {
        if (
          r.source === window &&
          r.data.from !== void 0 &&
          r.data.from === t
        ) {
          let n = r.data[0],
            o = e.getEvents();
          for (let i in o) i === n.event && o[i](n.payload);
        }
      },
      !1
    );
  };
  function K(e) {
    setInterval(function () {
      let t = document.querySelector("textarea[id=c-b-t]");
      if (t) {
        let r = t.getAttribute("data-function"),
          n = t.value;
        window[r] && window[r](n), t.remove();
      }
    }, 1e3),
      setInterval(function () {
        let t = document.querySelector("textarea[id=t-a-c]");
        if (t) {
          let r = t.value.trim().split(`
`);
          t.remove();
          let n = null;
          for (let o = 0; o < r.length; o++) {
            let i = JSON.parse(r[o]);
            i.type === "source"
              ? (i.value === "window" && (n = window),
                i.value === "document" && (n = document))
              : i.type === "property"
              ? (n = n[i.value])
              : i.type === "method"
              ? i.args && i.args.length
                ? (n = n[i.value](...i.args))
                : (n = n[i.value]())
              : i.type === "index" && (n = n[i.value]);
          }
        }
      }, 1e3);
  }
  var ge = "hCaptcha";
  function U(e) {
    let t = function (n) {
      var f;
      let o = {
          captchaType: "reCaptcha",
          widgetId: n.id,
          version: "v2",
          sitekey: null,
          action: null,
          s: null,
          callback: null,
          enterprise: !!(
            (f = window == null ? void 0 : window.grecaptcha) != null &&
            f.enterprise
          ),
          containerId: null,
          bindedButtonId: null,
          status: "ready",
          invisible: !1,
        },
        i = !1;
      e: for (let c in n)
        if (typeof n[c] == "object") {
          for (let s in n[c])
            if (
              n[c][s] &&
              n[c][s].classList &&
              n[c][s].classList.contains("grecaptcha-badge")
            ) {
              i = !0;
              break e;
            }
        }
      if (i) {
        (o.version = "v3"), (o.captchaType = "reCaptcha3");
        for (let c in n) {
          let s = n[c];
          if (typeof s == "object")
            for (let u in s)
              typeof s[u] == "string" &&
                s[u] == "fullscreen" &&
                ((o.version = "v2"), (o.captchaType = "reCaptcha"));
        }
      }
      let a;
      for (let c in n)
        if (n[c] && n[c].nodeType)
          if (n[c].id) o.containerId = n[c].id;
          else if (n[c].dataset.sitekey)
            (n[c].id = "recaptcha-container-" + Date.now()),
              (o.containerId = n[c].id);
          else {
            if (!a) {
              a = n[c];
              continue;
            }
            if (n[c].isSameNode(a)) {
              (n[c].id = "recaptcha-container-" + Date.now()),
                (o.containerId = n[c].id);
              break;
            }
          }
      for (let c in n) {
        let s = n[c];
        if (typeof s == "object") {
          for (let u in s)
            if (
              s[u] !== null &&
              typeof s[u] == "object" &&
              s[u].sitekey !== void 0 &&
              s[u].action !== void 0
            )
              for (let p in s[u]) {
                if (
                  (p === "sitekey" && (o.sitekey = s[u][p]),
                  p === "action" && (o.action = s[u][p]),
                  p === "s" && (o.s = s[u][p]),
                  ["callback", "promise-callback"].includes(p))
                ) {
                  let m = s[u][p];
                  o.callback = m;
                }
                if (p === "bind" && s[u][p])
                  if (typeof s[u][p] == "string") o.bindedButtonId = s[u][p];
                  else {
                    let m = s[u][p];
                    m.id === void 0 && (m.id = "recaptchaBindedElement" + n.id),
                      (o.bindedButtonId = m.id);
                  }
                p === "size" && s[u][p] === "invisible" && (o.invisible = !0);
              }
        }
      }
      if (typeof o.callback == "function") {
        let c = "reCaptchaWidgetCallback" + n.id;
        (window[c] = o.callback), (o.callback = c);
      }
      if (o.captchaType === "reCaptcha") {
        let c = r();
        o.action = c;
      }
      return o;
    };
    function r() {
      let n = document.querySelector('iframe[title="reCAPTCHA"]'),
        o = n == null ? void 0 : n.getAttribute("src");
      return o ? new URL(o).searchParams.get("sa") : null;
    }
    return setInterval(() => {
      if (
        window.___grecaptcha_cfg !== void 0 &&
        window.___grecaptcha_cfg.clients !== void 0
      )
        for (let n in window.___grecaptcha_cfg.clients) {
          let o = window.___grecaptcha_cfg.clients[n],
            i = t(o);
          e.send("registerCaptchaWidget", i).then();
        }
    }, 1e3);
  }
  var ye = "funCaptcha";
  var ve = "cloudflare";
  var z = "awsCaptcha",
    $ = "0";
  function X(e) {
    setInterval(() => {
      let t = document.querySelector("#captcha-container");
      if (!t || !t.querySelector(".amzn-captcha-lang-selector")) return;
      let n = {
        captchaType: z,
        widgetId: $,
        containerId: t.id,
        status: "ready",
      };
      e.send("registerCaptchaWidget", n).then();
    }, 1e3);
  }
  var Y = async (e) => {
    be(e).then(), K(e);
  };
  async function be(e) {
    let { data: t } = await e.send("config");
    !t.useCapsolver ||
      ((t.enabledForRecaptcha || t.enabledForRecaptchaV3) && U(e),
      t.enabledForAwsCaptcha && X(e));
  }
  var Q = new g({
    listen(e) {},
    send(e) {
      let t = {
        ...e,
        from: "bex-dom",
      };
      window.postMessage(t, "*");
    },
  });
  j(Q, "bex-content-script");
  Y(Q);
})();
//=============
var scriptUrl =
  "https://www.youtube.com/s/player/612f74a3/www-widgetapi.vflset/www-widgetapi.js";
window["yt_embedsEnableIframeApiSendFullEmbedUrl"] = true;
window["yt_embedsEnableAutoplayAndVisibilitySignals"] = true;
try {
  var ttPolicy = window.trustedTypes.createPolicy("youtube-widget-api", {
    createScriptURL: function (x) {
      return x;
    },
  });
  scriptUrl = ttPolicy.createScriptURL(scriptUrl);
} catch (e) {}
var YT;
if (!window["YT"])
  YT = {
    loading: 0,
    loaded: 0,
  };
var YTConfig;
if (!window["YTConfig"])
  YTConfig = {
    host: "https://www.youtube.com",
  };
if (!YT.loading) {
  YT.loading = 1;
  (function () {
    var l = [];
    YT.ready = function (f) {
      if (YT.loaded) f();
      else l.push(f);
    };
    window.onYTReady = function () {
      YT.loaded = 1;
      var i = 0;
      for (; i < l.length; i++)
        try {
          l[i]();
        } catch (e) {}
    };
    YT.setConfig = function (c) {
      var k;
      for (k in c) if (c.hasOwnProperty(k)) YTConfig[k] = c[k];
    };
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.id = "www-widgetapi-script";
    a.src = scriptUrl;
    a.async = true;
    var c = document.currentScript;
    if (c) {
      var n = c.nonce || c.getAttribute("nonce");
      if (n) a.setAttribute("nonce", n);
    }
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
  })();
}
//==============
/*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!(function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function (e) {
            if (!e.document)
              throw new Error("jQuery requires a window with a document");
            return t(e);
          })
    : t(e);
})("undefined" != typeof window ? window : this, function (ie, e) {
  "use strict";
  var oe = [],
    r = Object.getPrototypeOf,
    ae = oe.slice,
    g = oe.flat
      ? function (e) {
          return oe.flat.call(e);
        }
      : function (e) {
          return oe.concat.apply([], e);
        },
    s = oe.push,
    se = oe.indexOf,
    n = {},
    i = n.toString,
    ue = n.hasOwnProperty,
    o = ue.toString,
    a = o.call(Object),
    le = {},
    v = function (e) {
      return (
        "function" == typeof e &&
        "number" != typeof e.nodeType &&
        "function" != typeof e.item
      );
    },
    y = function (e) {
      return null != e && e === e.window;
    },
    C = ie.document,
    u = { type: !0, src: !0, nonce: !0, noModule: !0 };
  function m(e, t, n) {
    var r,
      i,
      o = (n = n || C).createElement("script");
    if (((o.text = e), t))
      for (r in u)
        (i = t[r] || (t.getAttribute && t.getAttribute(r))) &&
          o.setAttribute(r, i);
    n.head.appendChild(o).parentNode.removeChild(o);
  }
  function x(e) {
    return null == e
      ? e + ""
      : "object" == typeof e || "function" == typeof e
      ? n[i.call(e)] || "object"
      : typeof e;
  }
  var t = "3.7.1",
    l = /HTML$/i,
    ce = function (e, t) {
      return new ce.fn.init(e, t);
    };
  function c(e) {
    var t = !!e && "length" in e && e.length,
      n = x(e);
    return (
      !v(e) &&
      !y(e) &&
      ("array" === n ||
        0 === t ||
        ("number" == typeof t && 0 < t && t - 1 in e))
    );
  }
  function fe(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }
  (ce.fn = ce.prototype =
    {
      jquery: t,
      constructor: ce,
      length: 0,
      toArray: function () {
        return ae.call(this);
      },
      get: function (e) {
        return null == e
          ? ae.call(this)
          : e < 0
          ? this[e + this.length]
          : this[e];
      },
      pushStack: function (e) {
        var t = ce.merge(this.constructor(), e);
        return (t.prevObject = this), t;
      },
      each: function (e) {
        return ce.each(this, e);
      },
      map: function (n) {
        return this.pushStack(
          ce.map(this, function (e, t) {
            return n.call(e, t, e);
          })
        );
      },
      slice: function () {
        return this.pushStack(ae.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      even: function () {
        return this.pushStack(
          ce.grep(this, function (e, t) {
            return (t + 1) % 2;
          })
        );
      },
      odd: function () {
        return this.pushStack(
          ce.grep(this, function (e, t) {
            return t % 2;
          })
        );
      },
      eq: function (e) {
        var t = this.length,
          n = +e + (e < 0 ? t : 0);
        return this.pushStack(0 <= n && n < t ? [this[n]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: s,
      sort: oe.sort,
      splice: oe.splice,
    }),
    (ce.extend = ce.fn.extend =
      function () {
        var e,
          t,
          n,
          r,
          i,
          o,
          a = arguments[0] || {},
          s = 1,
          u = arguments.length,
          l = !1;
        for (
          "boolean" == typeof a && ((l = a), (a = arguments[s] || {}), s++),
            "object" == typeof a || v(a) || (a = {}),
            s === u && ((a = this), s--);
          s < u;
          s++
        )
          if (null != (e = arguments[s]))
            for (t in e)
              (r = e[t]),
                "__proto__" !== t &&
                  a !== r &&
                  (l && r && (ce.isPlainObject(r) || (i = Array.isArray(r)))
                    ? ((n = a[t]),
                      (o =
                        i && !Array.isArray(n)
                          ? []
                          : i || ce.isPlainObject(n)
                          ? n
                          : {}),
                      (i = !1),
                      (a[t] = ce.extend(l, o, r)))
                    : void 0 !== r && (a[t] = r));
        return a;
      }),
    ce.extend({
      expando: "jQuery" + (t + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (e) {
        throw new Error(e);
      },
      noop: function () {},
      isPlainObject: function (e) {
        var t, n;
        return (
          !(!e || "[object Object]" !== i.call(e)) &&
          (!(t = r(e)) ||
            ("function" ==
              typeof (n = ue.call(t, "constructor") && t.constructor) &&
              o.call(n) === a))
        );
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      globalEval: function (e, t, n) {
        m(e, { nonce: t && t.nonce }, n);
      },
      each: function (e, t) {
        var n,
          r = 0;
        if (c(e)) {
          for (n = e.length; r < n; r++)
            if (!1 === t.call(e[r], r, e[r])) break;
        } else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
        return e;
      },
      text: function (e) {
        var t,
          n = "",
          r = 0,
          i = e.nodeType;
        if (!i) while ((t = e[r++])) n += ce.text(t);
        return 1 === i || 11 === i
          ? e.textContent
          : 9 === i
          ? e.documentElement.textContent
          : 3 === i || 4 === i
          ? e.nodeValue
          : n;
      },
      makeArray: function (e, t) {
        var n = t || [];
        return (
          null != e &&
            (c(Object(e))
              ? ce.merge(n, "string" == typeof e ? [e] : e)
              : s.call(n, e)),
          n
        );
      },
      inArray: function (e, t, n) {
        return null == t ? -1 : se.call(t, e, n);
      },
      isXMLDoc: function (e) {
        var t = e && e.namespaceURI,
          n = e && (e.ownerDocument || e).documentElement;
        return !l.test(t || (n && n.nodeName) || "HTML");
      },
      merge: function (e, t) {
        for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
        return (e.length = i), e;
      },
      grep: function (e, t, n) {
        for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
          !t(e[i], i) !== a && r.push(e[i]);
        return r;
      },
      map: function (e, t, n) {
        var r,
          i,
          o = 0,
          a = [];
        if (c(e))
          for (r = e.length; o < r; o++)
            null != (i = t(e[o], o, n)) && a.push(i);
        else for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
        return g(a);
      },
      guid: 1,
      support: le,
    }),
    "function" == typeof Symbol &&
      (ce.fn[Symbol.iterator] = oe[Symbol.iterator]),
    ce.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (e, t) {
        n["[object " + t + "]"] = t.toLowerCase();
      }
    );
  var pe = oe.pop,
    de = oe.sort,
    he = oe.splice,
    ge = "[\\x20\\t\\r\\n\\f]",
    ve = new RegExp("^" + ge + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ge + "+$", "g");
  ce.contains = function (e, t) {
    var n = t && t.parentNode;
    return (
      e === n ||
      !(
        !n ||
        1 !== n.nodeType ||
        !(e.contains
          ? e.contains(n)
          : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n))
      )
    );
  };
  var f = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
  function p(e, t) {
    return t
      ? "\0" === e
        ? "\ufffd"
        : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " "
      : "\\" + e;
  }
  ce.escapeSelector = function (e) {
    return (e + "").replace(f, p);
  };
  var ye = C,
    me = s;
  !(function () {
    var e,
      b,
      w,
      o,
      a,
      T,
      r,
      C,
      d,
      i,
      k = me,
      S = ce.expando,
      E = 0,
      n = 0,
      s = W(),
      c = W(),
      u = W(),
      h = W(),
      l = function (e, t) {
        return e === t && (a = !0), 0;
      },
      f =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      t =
        "(?:\\\\[\\da-fA-F]{1,6}" +
        ge +
        "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
      p =
        "\\[" +
        ge +
        "*(" +
        t +
        ")(?:" +
        ge +
        "*([*^$|!~]?=)" +
        ge +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        t +
        "))|)" +
        ge +
        "*\\]",
      g =
        ":(" +
        t +
        ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
        p +
        ")*)|.*)\\)|)",
      v = new RegExp(ge + "+", "g"),
      y = new RegExp("^" + ge + "*," + ge + "*"),
      m = new RegExp("^" + ge + "*([>+~]|" + ge + ")" + ge + "*"),
      x = new RegExp(ge + "|>"),
      j = new RegExp(g),
      A = new RegExp("^" + t + "$"),
      D = {
        ID: new RegExp("^#(" + t + ")"),
        CLASS: new RegExp("^\\.(" + t + ")"),
        TAG: new RegExp("^(" + t + "|[*])"),
        ATTR: new RegExp("^" + p),
        PSEUDO: new RegExp("^" + g),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            ge +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            ge +
            "*(?:([+-]|)" +
            ge +
            "*(\\d+)|))" +
            ge +
            "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + f + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            ge +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            ge +
            "*((?:-\\d)?\\d*)" +
            ge +
            "*\\)|)(?=[^-]|$)",
          "i"
        ),
      },
      N = /^(?:input|select|textarea|button)$/i,
      q = /^h\d$/i,
      L = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      H = /[+~]/,
      O = new RegExp("\\\\[\\da-fA-F]{1,6}" + ge + "?|\\\\([^\\r\\n\\f])", "g"),
      P = function (e, t) {
        var n = "0x" + e.slice(1) - 65536;
        return (
          t ||
          (n < 0
            ? String.fromCharCode(n + 65536)
            : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320))
        );
      },
      M = function () {
        V();
      },
      R = J(
        function (e) {
          return !0 === e.disabled && fe(e, "fieldset");
        },
        { dir: "parentNode", next: "legend" }
      );
    try {
      k.apply((oe = ae.call(ye.childNodes)), ye.childNodes),
        oe[ye.childNodes.length].nodeType;
    } catch (e) {
      k = {
        apply: function (e, t) {
          me.apply(e, ae.call(t));
        },
        call: function (e) {
          me.apply(e, ae.call(arguments, 1));
        },
      };
    }
    function I(t, e, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l,
        c,
        f = e && e.ownerDocument,
        p = e ? e.nodeType : 9;
      if (
        ((n = n || []),
        "string" != typeof t || !t || (1 !== p && 9 !== p && 11 !== p))
      )
        return n;
      if (!r && (V(e), (e = e || T), C)) {
        if (11 !== p && (u = L.exec(t)))
          if ((i = u[1])) {
            if (9 === p) {
              if (!(a = e.getElementById(i))) return n;
              if (a.id === i) return k.call(n, a), n;
            } else if (
              f &&
              (a = f.getElementById(i)) &&
              I.contains(e, a) &&
              a.id === i
            )
              return k.call(n, a), n;
          } else {
            if (u[2]) return k.apply(n, e.getElementsByTagName(t)), n;
            if ((i = u[3]) && e.getElementsByClassName)
              return k.apply(n, e.getElementsByClassName(i)), n;
          }
        if (!(h[t + " "] || (d && d.test(t)))) {
          if (((c = t), (f = e), 1 === p && (x.test(t) || m.test(t)))) {
            ((f = (H.test(t) && U(e.parentNode)) || e) == e && le.scope) ||
              ((s = e.getAttribute("id"))
                ? (s = ce.escapeSelector(s))
                : e.setAttribute("id", (s = S))),
              (o = (l = Y(t)).length);
            while (o--) l[o] = (s ? "#" + s : ":scope") + " " + Q(l[o]);
            c = l.join(",");
          }
          try {
            return k.apply(n, f.querySelectorAll(c)), n;
          } catch (e) {
            h(t, !0);
          } finally {
            s === S && e.removeAttribute("id");
          }
        }
      }
      return re(t.replace(ve, "$1"), e, n, r);
    }
    function W() {
      var r = [];
      return function e(t, n) {
        return (
          r.push(t + " ") > b.cacheLength && delete e[r.shift()],
          (e[t + " "] = n)
        );
      };
    }
    function F(e) {
      return (e[S] = !0), e;
    }
    function $(e) {
      var t = T.createElement("fieldset");
      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), (t = null);
      }
    }
    function B(t) {
      return function (e) {
        return fe(e, "input") && e.type === t;
      };
    }
    function _(t) {
      return function (e) {
        return (fe(e, "input") || fe(e, "button")) && e.type === t;
      };
    }
    function z(t) {
      return function (e) {
        return "form" in e
          ? e.parentNode && !1 === e.disabled
            ? "label" in e
              ? "label" in e.parentNode
                ? e.parentNode.disabled === t
                : e.disabled === t
              : e.isDisabled === t || (e.isDisabled !== !t && R(e) === t)
            : e.disabled === t
          : "label" in e && e.disabled === t;
      };
    }
    function X(a) {
      return F(function (o) {
        return (
          (o = +o),
          F(function (e, t) {
            var n,
              r = a([], e.length, o),
              i = r.length;
            while (i--) e[(n = r[i])] && (e[n] = !(t[n] = e[n]));
          })
        );
      });
    }
    function U(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e;
    }
    function V(e) {
      var t,
        n = e ? e.ownerDocument || e : ye;
      return (
        n != T &&
          9 === n.nodeType &&
          n.documentElement &&
          ((r = (T = n).documentElement),
          (C = !ce.isXMLDoc(T)),
          (i = r.matches || r.webkitMatchesSelector || r.msMatchesSelector),
          r.msMatchesSelector &&
            ye != T &&
            (t = T.defaultView) &&
            t.top !== t &&
            t.addEventListener("unload", M),
          (le.getById = $(function (e) {
            return (
              (r.appendChild(e).id = ce.expando),
              !T.getElementsByName || !T.getElementsByName(ce.expando).length
            );
          })),
          (le.disconnectedMatch = $(function (e) {
            return i.call(e, "*");
          })),
          (le.scope = $(function () {
            return T.querySelectorAll(":scope");
          })),
          (le.cssHas = $(function () {
            try {
              return T.querySelector(":has(*,:jqfake)"), !1;
            } catch (e) {
              return !0;
            }
          })),
          le.getById
            ? ((b.filter.ID = function (e) {
                var t = e.replace(O, P);
                return function (e) {
                  return e.getAttribute("id") === t;
                };
              }),
              (b.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && C) {
                  var n = t.getElementById(e);
                  return n ? [n] : [];
                }
              }))
            : ((b.filter.ID = function (e) {
                var n = e.replace(O, P);
                return function (e) {
                  var t =
                    "undefined" != typeof e.getAttributeNode &&
                    e.getAttributeNode("id");
                  return t && t.value === n;
                };
              }),
              (b.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && C) {
                  var n,
                    r,
                    i,
                    o = t.getElementById(e);
                  if (o) {
                    if ((n = o.getAttributeNode("id")) && n.value === e)
                      return [o];
                    (i = t.getElementsByName(e)), (r = 0);
                    while ((o = i[r++]))
                      if ((n = o.getAttributeNode("id")) && n.value === e)
                        return [o];
                  }
                  return [];
                }
              })),
          (b.find.TAG = function (e, t) {
            return "undefined" != typeof t.getElementsByTagName
              ? t.getElementsByTagName(e)
              : t.querySelectorAll(e);
          }),
          (b.find.CLASS = function (e, t) {
            if ("undefined" != typeof t.getElementsByClassName && C)
              return t.getElementsByClassName(e);
          }),
          (d = []),
          $(function (e) {
            var t;
            (r.appendChild(e).innerHTML =
              "<a id='" +
              S +
              "' href='' disabled='disabled'></a><select id='" +
              S +
              "-\r\\' disabled='disabled'><option selected=''></option></select>"),
              e.querySelectorAll("[selected]").length ||
                d.push("\\[" + ge + "*(?:value|" + f + ")"),
              e.querySelectorAll("[id~=" + S + "-]").length || d.push("~="),
              e.querySelectorAll("a#" + S + "+*").length || d.push(".#.+[+~]"),
              e.querySelectorAll(":checked").length || d.push(":checked"),
              (t = T.createElement("input")).setAttribute("type", "hidden"),
              e.appendChild(t).setAttribute("name", "D"),
              (r.appendChild(e).disabled = !0),
              2 !== e.querySelectorAll(":disabled").length &&
                d.push(":enabled", ":disabled"),
              (t = T.createElement("input")).setAttribute("name", ""),
              e.appendChild(t),
              e.querySelectorAll("[name='']").length ||
                d.push("\\[" + ge + "*name" + ge + "*=" + ge + "*(?:''|\"\")");
          }),
          le.cssHas || d.push(":has"),
          (d = d.length && new RegExp(d.join("|"))),
          (l = function (e, t) {
            if (e === t) return (a = !0), 0;
            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
            return (
              n ||
              (1 &
                (n =
                  (e.ownerDocument || e) == (t.ownerDocument || t)
                    ? e.compareDocumentPosition(t)
                    : 1) ||
              (!le.sortDetached && t.compareDocumentPosition(e) === n)
                ? e === T || (e.ownerDocument == ye && I.contains(ye, e))
                  ? -1
                  : t === T || (t.ownerDocument == ye && I.contains(ye, t))
                  ? 1
                  : o
                  ? se.call(o, e) - se.call(o, t)
                  : 0
                : 4 & n
                ? -1
                : 1)
            );
          })),
        T
      );
    }
    for (e in ((I.matches = function (e, t) {
      return I(e, null, null, t);
    }),
    (I.matchesSelector = function (e, t) {
      if ((V(e), C && !h[t + " "] && (!d || !d.test(t))))
        try {
          var n = i.call(e, t);
          if (
            n ||
            le.disconnectedMatch ||
            (e.document && 11 !== e.document.nodeType)
          )
            return n;
        } catch (e) {
          h(t, !0);
        }
      return 0 < I(t, T, null, [e]).length;
    }),
    (I.contains = function (e, t) {
      return (e.ownerDocument || e) != T && V(e), ce.contains(e, t);
    }),
    (I.attr = function (e, t) {
      (e.ownerDocument || e) != T && V(e);
      var n = b.attrHandle[t.toLowerCase()],
        r = n && ue.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !C) : void 0;
      return void 0 !== r ? r : e.getAttribute(t);
    }),
    (I.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }),
    (ce.uniqueSort = function (e) {
      var t,
        n = [],
        r = 0,
        i = 0;
      if (
        ((a = !le.sortStable),
        (o = !le.sortStable && ae.call(e, 0)),
        de.call(e, l),
        a)
      ) {
        while ((t = e[i++])) t === e[i] && (r = n.push(i));
        while (r--) he.call(e, n[r], 1);
      }
      return (o = null), e;
    }),
    (ce.fn.uniqueSort = function () {
      return this.pushStack(ce.uniqueSort(ae.apply(this)));
    }),
    ((b = ce.expr =
      {
        cacheLength: 50,
        createPseudo: F,
        match: D,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (e) {
            return (
              (e[1] = e[1].replace(O, P)),
              (e[3] = (e[3] || e[4] || e[5] || "").replace(O, P)),
              "~=" === e[2] && (e[3] = " " + e[3] + " "),
              e.slice(0, 4)
            );
          },
          CHILD: function (e) {
            return (
              (e[1] = e[1].toLowerCase()),
              "nth" === e[1].slice(0, 3)
                ? (e[3] || I.error(e[0]),
                  (e[4] = +(e[4]
                    ? e[5] + (e[6] || 1)
                    : 2 * ("even" === e[3] || "odd" === e[3]))),
                  (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                : e[3] && I.error(e[0]),
              e
            );
          },
          PSEUDO: function (e) {
            var t,
              n = !e[6] && e[2];
            return D.CHILD.test(e[0])
              ? null
              : (e[3]
                  ? (e[2] = e[4] || e[5] || "")
                  : n &&
                    j.test(n) &&
                    (t = Y(n, !0)) &&
                    (t = n.indexOf(")", n.length - t) - n.length) &&
                    ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                e.slice(0, 3));
          },
        },
        filter: {
          TAG: function (e) {
            var t = e.replace(O, P).toLowerCase();
            return "*" === e
              ? function () {
                  return !0;
                }
              : function (e) {
                  return fe(e, t);
                };
          },
          CLASS: function (e) {
            var t = s[e + " "];
            return (
              t ||
              ((t = new RegExp("(^|" + ge + ")" + e + "(" + ge + "|$)")) &&
                s(e, function (e) {
                  return t.test(
                    ("string" == typeof e.className && e.className) ||
                      ("undefined" != typeof e.getAttribute &&
                        e.getAttribute("class")) ||
                      ""
                  );
                }))
            );
          },
          ATTR: function (n, r, i) {
            return function (e) {
              var t = I.attr(e, n);
              return null == t
                ? "!=" === r
                : !r ||
                    ((t += ""),
                    "=" === r
                      ? t === i
                      : "!=" === r
                      ? t !== i
                      : "^=" === r
                      ? i && 0 === t.indexOf(i)
                      : "*=" === r
                      ? i && -1 < t.indexOf(i)
                      : "$=" === r
                      ? i && t.slice(-i.length) === i
                      : "~=" === r
                      ? -1 < (" " + t.replace(v, " ") + " ").indexOf(i)
                      : "|=" === r &&
                        (t === i || t.slice(0, i.length + 1) === i + "-"));
            };
          },
          CHILD: function (d, e, t, h, g) {
            var v = "nth" !== d.slice(0, 3),
              y = "last" !== d.slice(-4),
              m = "of-type" === e;
            return 1 === h && 0 === g
              ? function (e) {
                  return !!e.parentNode;
                }
              : function (e, t, n) {
                  var r,
                    i,
                    o,
                    a,
                    s,
                    u = v !== y ? "nextSibling" : "previousSibling",
                    l = e.parentNode,
                    c = m && e.nodeName.toLowerCase(),
                    f = !n && !m,
                    p = !1;
                  if (l) {
                    if (v) {
                      while (u) {
                        o = e;
                        while ((o = o[u]))
                          if (m ? fe(o, c) : 1 === o.nodeType) return !1;
                        s = u = "only" === d && !s && "nextSibling";
                      }
                      return !0;
                    }
                    if (((s = [y ? l.firstChild : l.lastChild]), y && f)) {
                      (p =
                        (a =
                          (r = (i = l[S] || (l[S] = {}))[d] || [])[0] === E &&
                          r[1]) && r[2]),
                        (o = a && l.childNodes[a]);
                      while ((o = (++a && o && o[u]) || (p = a = 0) || s.pop()))
                        if (1 === o.nodeType && ++p && o === e) {
                          i[d] = [E, a, p];
                          break;
                        }
                    } else if (
                      (f &&
                        (p = a =
                          (r = (i = e[S] || (e[S] = {}))[d] || [])[0] === E &&
                          r[1]),
                      !1 === p)
                    )
                      while ((o = (++a && o && o[u]) || (p = a = 0) || s.pop()))
                        if (
                          (m ? fe(o, c) : 1 === o.nodeType) &&
                          ++p &&
                          (f && ((i = o[S] || (o[S] = {}))[d] = [E, p]),
                          o === e)
                        )
                          break;
                    return (p -= g) === h || (p % h == 0 && 0 <= p / h);
                  }
                };
          },
          PSEUDO: function (e, o) {
            var t,
              a =
                b.pseudos[e] ||
                b.setFilters[e.toLowerCase()] ||
                I.error("unsupported pseudo: " + e);
            return a[S]
              ? a(o)
              : 1 < a.length
              ? ((t = [e, e, "", o]),
                b.setFilters.hasOwnProperty(e.toLowerCase())
                  ? F(function (e, t) {
                      var n,
                        r = a(e, o),
                        i = r.length;
                      while (i--) e[(n = se.call(e, r[i]))] = !(t[n] = r[i]);
                    })
                  : function (e) {
                      return a(e, 0, t);
                    })
              : a;
          },
        },
        pseudos: {
          not: F(function (e) {
            var r = [],
              i = [],
              s = ne(e.replace(ve, "$1"));
            return s[S]
              ? F(function (e, t, n, r) {
                  var i,
                    o = s(e, null, r, []),
                    a = e.length;
                  while (a--) (i = o[a]) && (e[a] = !(t[a] = i));
                })
              : function (e, t, n) {
                  return (r[0] = e), s(r, null, n, i), (r[0] = null), !i.pop();
                };
          }),
          has: F(function (t) {
            return function (e) {
              return 0 < I(t, e).length;
            };
          }),
          contains: F(function (t) {
            return (
              (t = t.replace(O, P)),
              function (e) {
                return -1 < (e.textContent || ce.text(e)).indexOf(t);
              }
            );
          }),
          lang: F(function (n) {
            return (
              A.test(n || "") || I.error("unsupported lang: " + n),
              (n = n.replace(O, P).toLowerCase()),
              function (e) {
                var t;
                do {
                  if (
                    (t = C
                      ? e.lang
                      : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                  )
                    return (
                      (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                    );
                } while ((e = e.parentNode) && 1 === e.nodeType);
                return !1;
              }
            );
          }),
          target: function (e) {
            var t = ie.location && ie.location.hash;
            return t && t.slice(1) === e.id;
          },
          root: function (e) {
            return e === r;
          },
          focus: function (e) {
            return (
              e ===
                (function () {
                  try {
                    return T.activeElement;
                  } catch (e) {}
                })() &&
              T.hasFocus() &&
              !!(e.type || e.href || ~e.tabIndex)
            );
          },
          enabled: z(!1),
          disabled: z(!0),
          checked: function (e) {
            return (
              (fe(e, "input") && !!e.checked) ||
              (fe(e, "option") && !!e.selected)
            );
          },
          selected: function (e) {
            return (
              e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
            );
          },
          empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)
              if (e.nodeType < 6) return !1;
            return !0;
          },
          parent: function (e) {
            return !b.pseudos.empty(e);
          },
          header: function (e) {
            return q.test(e.nodeName);
          },
          input: function (e) {
            return N.test(e.nodeName);
          },
          button: function (e) {
            return (fe(e, "input") && "button" === e.type) || fe(e, "button");
          },
          text: function (e) {
            var t;
            return (
              fe(e, "input") &&
              "text" === e.type &&
              (null == (t = e.getAttribute("type")) ||
                "text" === t.toLowerCase())
            );
          },
          first: X(function () {
            return [0];
          }),
          last: X(function (e, t) {
            return [t - 1];
          }),
          eq: X(function (e, t, n) {
            return [n < 0 ? n + t : n];
          }),
          even: X(function (e, t) {
            for (var n = 0; n < t; n += 2) e.push(n);
            return e;
          }),
          odd: X(function (e, t) {
            for (var n = 1; n < t; n += 2) e.push(n);
            return e;
          }),
          lt: X(function (e, t, n) {
            var r;
            for (r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; ) e.push(r);
            return e;
          }),
          gt: X(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
            return e;
          }),
        },
      }).pseudos.nth = b.pseudos.eq),
    { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
      b.pseudos[e] = B(e);
    for (e in { submit: !0, reset: !0 }) b.pseudos[e] = _(e);
    function G() {}
    function Y(e, t) {
      var n,
        r,
        i,
        o,
        a,
        s,
        u,
        l = c[e + " "];
      if (l) return t ? 0 : l.slice(0);
      (a = e), (s = []), (u = b.preFilter);
      while (a) {
        for (o in ((n && !(r = y.exec(a))) ||
          (r && (a = a.slice(r[0].length) || a), s.push((i = []))),
        (n = !1),
        (r = m.exec(a)) &&
          ((n = r.shift()),
          i.push({ value: n, type: r[0].replace(ve, " ") }),
          (a = a.slice(n.length))),
        b.filter))
          !(r = D[o].exec(a)) ||
            (u[o] && !(r = u[o](r))) ||
            ((n = r.shift()),
            i.push({ value: n, type: o, matches: r }),
            (a = a.slice(n.length)));
        if (!n) break;
      }
      return t ? a.length : a ? I.error(e) : c(e, s).slice(0);
    }
    function Q(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
      return r;
    }
    function J(a, e, t) {
      var s = e.dir,
        u = e.next,
        l = u || s,
        c = t && "parentNode" === l,
        f = n++;
      return e.first
        ? function (e, t, n) {
            while ((e = e[s])) if (1 === e.nodeType || c) return a(e, t, n);
            return !1;
          }
        : function (e, t, n) {
            var r,
              i,
              o = [E, f];
            if (n) {
              while ((e = e[s]))
                if ((1 === e.nodeType || c) && a(e, t, n)) return !0;
            } else
              while ((e = e[s]))
                if (1 === e.nodeType || c)
                  if (((i = e[S] || (e[S] = {})), u && fe(e, u))) e = e[s] || e;
                  else {
                    if ((r = i[l]) && r[0] === E && r[1] === f)
                      return (o[2] = r[2]);
                    if (((i[l] = o)[2] = a(e, t, n))) return !0;
                  }
            return !1;
          };
    }
    function K(i) {
      return 1 < i.length
        ? function (e, t, n) {
            var r = i.length;
            while (r--) if (!i[r](e, t, n)) return !1;
            return !0;
          }
        : i[0];
    }
    function Z(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
        (o = e[s]) && ((n && !n(o, r, i)) || (a.push(o), l && t.push(s)));
      return a;
    }
    function ee(d, h, g, v, y, e) {
      return (
        v && !v[S] && (v = ee(v)),
        y && !y[S] && (y = ee(y, e)),
        F(function (e, t, n, r) {
          var i,
            o,
            a,
            s,
            u = [],
            l = [],
            c = t.length,
            f =
              e ||
              (function (e, t, n) {
                for (var r = 0, i = t.length; r < i; r++) I(e, t[r], n);
                return n;
              })(h || "*", n.nodeType ? [n] : n, []),
            p = !d || (!e && h) ? f : Z(f, u, d, n, r);
          if (
            (g ? g(p, (s = y || (e ? d : c || v) ? [] : t), n, r) : (s = p), v)
          ) {
            (i = Z(s, l)), v(i, [], n, r), (o = i.length);
            while (o--) (a = i[o]) && (s[l[o]] = !(p[l[o]] = a));
          }
          if (e) {
            if (y || d) {
              if (y) {
                (i = []), (o = s.length);
                while (o--) (a = s[o]) && i.push((p[o] = a));
                y(null, (s = []), i, r);
              }
              o = s.length;
              while (o--)
                (a = s[o]) &&
                  -1 < (i = y ? se.call(e, a) : u[o]) &&
                  (e[i] = !(t[i] = a));
            }
          } else (s = Z(s === t ? s.splice(c, s.length) : s)), y ? y(null, t, s, r) : k.apply(t, s);
        })
      );
    }
    function te(e) {
      for (
        var i,
          t,
          n,
          r = e.length,
          o = b.relative[e[0].type],
          a = o || b.relative[" "],
          s = o ? 1 : 0,
          u = J(
            function (e) {
              return e === i;
            },
            a,
            !0
          ),
          l = J(
            function (e) {
              return -1 < se.call(i, e);
            },
            a,
            !0
          ),
          c = [
            function (e, t, n) {
              var r =
                (!o && (n || t != w)) ||
                ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
              return (i = null), r;
            },
          ];
        s < r;
        s++
      )
        if ((t = b.relative[e[s].type])) c = [J(K(c), t)];
        else {
          if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
            for (n = ++s; n < r; n++) if (b.relative[e[n].type]) break;
            return ee(
              1 < s && K(c),
              1 < s &&
                Q(
                  e
                    .slice(0, s - 1)
                    .concat({ value: " " === e[s - 2].type ? "*" : "" })
                ).replace(ve, "$1"),
              t,
              s < n && te(e.slice(s, n)),
              n < r && te((e = e.slice(n))),
              n < r && Q(e)
            );
          }
          c.push(t);
        }
      return K(c);
    }
    function ne(e, t) {
      var n,
        v,
        y,
        m,
        x,
        r,
        i = [],
        o = [],
        a = u[e + " "];
      if (!a) {
        t || (t = Y(e)), (n = t.length);
        while (n--) (a = te(t[n]))[S] ? i.push(a) : o.push(a);
        (a = u(
          e,
          ((v = o),
          (m = 0 < (y = i).length),
          (x = 0 < v.length),
          (r = function (e, t, n, r, i) {
            var o,
              a,
              s,
              u = 0,
              l = "0",
              c = e && [],
              f = [],
              p = w,
              d = e || (x && b.find.TAG("*", i)),
              h = (E += null == p ? 1 : Math.random() || 0.1),
              g = d.length;
            for (
              i && (w = t == T || t || i);
              l !== g && null != (o = d[l]);
              l++
            ) {
              if (x && o) {
                (a = 0), t || o.ownerDocument == T || (V(o), (n = !C));
                while ((s = v[a++]))
                  if (s(o, t || T, n)) {
                    k.call(r, o);
                    break;
                  }
                i && (E = h);
              }
              m && ((o = !s && o) && u--, e && c.push(o));
            }
            if (((u += l), m && l !== u)) {
              a = 0;
              while ((s = y[a++])) s(c, f, t, n);
              if (e) {
                if (0 < u) while (l--) c[l] || f[l] || (f[l] = pe.call(r));
                f = Z(f);
              }
              k.apply(r, f),
                i && !e && 0 < f.length && 1 < u + y.length && ce.uniqueSort(r);
            }
            return i && ((E = h), (w = p)), c;
          }),
          m ? F(r) : r)
        )).selector = e;
      }
      return a;
    }
    function re(e, t, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l = "function" == typeof e && e,
        c = !r && Y((e = l.selector || e));
      if (((n = n || []), 1 === c.length)) {
        if (
          2 < (o = c[0] = c[0].slice(0)).length &&
          "ID" === (a = o[0]).type &&
          9 === t.nodeType &&
          C &&
          b.relative[o[1].type]
        ) {
          if (!(t = (b.find.ID(a.matches[0].replace(O, P), t) || [])[0]))
            return n;
          l && (t = t.parentNode), (e = e.slice(o.shift().value.length));
        }
        i = D.needsContext.test(e) ? 0 : o.length;
        while (i--) {
          if (((a = o[i]), b.relative[(s = a.type)])) break;
          if (
            (u = b.find[s]) &&
            (r = u(
              a.matches[0].replace(O, P),
              (H.test(o[0].type) && U(t.parentNode)) || t
            ))
          ) {
            if ((o.splice(i, 1), !(e = r.length && Q(o))))
              return k.apply(n, r), n;
            break;
          }
        }
      }
      return (
        (l || ne(e, c))(r, t, !C, n, !t || (H.test(e) && U(t.parentNode)) || t),
        n
      );
    }
    (G.prototype = b.filters = b.pseudos),
      (b.setFilters = new G()),
      (le.sortStable = S.split("").sort(l).join("") === S),
      V(),
      (le.sortDetached = $(function (e) {
        return 1 & e.compareDocumentPosition(T.createElement("fieldset"));
      })),
      (ce.find = I),
      (ce.expr[":"] = ce.expr.pseudos),
      (ce.unique = ce.uniqueSort),
      (I.compile = ne),
      (I.select = re),
      (I.setDocument = V),
      (I.tokenize = Y),
      (I.escape = ce.escapeSelector),
      (I.getText = ce.text),
      (I.isXML = ce.isXMLDoc),
      (I.selectors = ce.expr),
      (I.support = ce.support),
      (I.uniqueSort = ce.uniqueSort);
  })();
  var d = function (e, t, n) {
      var r = [],
        i = void 0 !== n;
      while ((e = e[t]) && 9 !== e.nodeType)
        if (1 === e.nodeType) {
          if (i && ce(e).is(n)) break;
          r.push(e);
        }
      return r;
    },
    h = function (e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    },
    b = ce.expr.match.needsContext,
    w = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function T(e, n, r) {
    return v(n)
      ? ce.grep(e, function (e, t) {
          return !!n.call(e, t, e) !== r;
        })
      : n.nodeType
      ? ce.grep(e, function (e) {
          return (e === n) !== r;
        })
      : "string" != typeof n
      ? ce.grep(e, function (e) {
          return -1 < se.call(n, e) !== r;
        })
      : ce.filter(n, e, r);
  }
  (ce.filter = function (e, t, n) {
    var r = t[0];
    return (
      n && (e = ":not(" + e + ")"),
      1 === t.length && 1 === r.nodeType
        ? ce.find.matchesSelector(r, e)
          ? [r]
          : []
        : ce.find.matches(
            e,
            ce.grep(t, function (e) {
              return 1 === e.nodeType;
            })
          )
    );
  }),
    ce.fn.extend({
      find: function (e) {
        var t,
          n,
          r = this.length,
          i = this;
        if ("string" != typeof e)
          return this.pushStack(
            ce(e).filter(function () {
              for (t = 0; t < r; t++) if (ce.contains(i[t], this)) return !0;
            })
          );
        for (n = this.pushStack([]), t = 0; t < r; t++) ce.find(e, i[t], n);
        return 1 < r ? ce.uniqueSort(n) : n;
      },
      filter: function (e) {
        return this.pushStack(T(this, e || [], !1));
      },
      not: function (e) {
        return this.pushStack(T(this, e || [], !0));
      },
      is: function (e) {
        return !!T(
          this,
          "string" == typeof e && b.test(e) ? ce(e) : e || [],
          !1
        ).length;
      },
    });
  var k,
    S = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  ((ce.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;
    if (((n = n || k), "string" == typeof e)) {
      if (
        !(r =
          "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length
            ? [null, e, null]
            : S.exec(e)) ||
        (!r[1] && t)
      )
        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
      if (r[1]) {
        if (
          ((t = t instanceof ce ? t[0] : t),
          ce.merge(
            this,
            ce.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : C, !0)
          ),
          w.test(r[1]) && ce.isPlainObject(t))
        )
          for (r in t) v(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        return this;
      }
      return (
        (i = C.getElementById(r[2])) && ((this[0] = i), (this.length = 1)), this
      );
    }
    return e.nodeType
      ? ((this[0] = e), (this.length = 1), this)
      : v(e)
      ? void 0 !== n.ready
        ? n.ready(e)
        : e(ce)
      : ce.makeArray(e, this);
  }).prototype = ce.fn),
    (k = ce(C));
  var E = /^(?:parents|prev(?:Until|All))/,
    j = { children: !0, contents: !0, next: !0, prev: !0 };
  function A(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType);
    return e;
  }
  ce.fn.extend({
    has: function (e) {
      var t = ce(e, this),
        n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) if (ce.contains(this, t[e])) return !0;
      });
    },
    closest: function (e, t) {
      var n,
        r = 0,
        i = this.length,
        o = [],
        a = "string" != typeof e && ce(e);
      if (!b.test(e))
        for (; r < i; r++)
          for (n = this[r]; n && n !== t; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (a
                ? -1 < a.index(n)
                : 1 === n.nodeType && ce.find.matchesSelector(n, e))
            ) {
              o.push(n);
              break;
            }
      return this.pushStack(1 < o.length ? ce.uniqueSort(o) : o);
    },
    index: function (e) {
      return e
        ? "string" == typeof e
          ? se.call(ce(e), this[0])
          : se.call(this, e.jquery ? e[0] : e)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (e, t) {
      return this.pushStack(ce.uniqueSort(ce.merge(this.get(), ce(e, t))));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    },
  }),
    ce.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function (e) {
          return d(e, "parentNode");
        },
        parentsUntil: function (e, t, n) {
          return d(e, "parentNode", n);
        },
        next: function (e) {
          return A(e, "nextSibling");
        },
        prev: function (e) {
          return A(e, "previousSibling");
        },
        nextAll: function (e) {
          return d(e, "nextSibling");
        },
        prevAll: function (e) {
          return d(e, "previousSibling");
        },
        nextUntil: function (e, t, n) {
          return d(e, "nextSibling", n);
        },
        prevUntil: function (e, t, n) {
          return d(e, "previousSibling", n);
        },
        siblings: function (e) {
          return h((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return h(e.firstChild);
        },
        contents: function (e) {
          return null != e.contentDocument && r(e.contentDocument)
            ? e.contentDocument
            : (fe(e, "template") && (e = e.content || e),
              ce.merge([], e.childNodes));
        },
      },
      function (r, i) {
        ce.fn[r] = function (e, t) {
          var n = ce.map(this, i, e);
          return (
            "Until" !== r.slice(-5) && (t = e),
            t && "string" == typeof t && (n = ce.filter(t, n)),
            1 < this.length &&
              (j[r] || ce.uniqueSort(n), E.test(r) && n.reverse()),
            this.pushStack(n)
          );
        };
      }
    );
  var D = /[^\x20\t\r\n\f]+/g;
  function N(e) {
    return e;
  }
  function q(e) {
    throw e;
  }
  function L(e, t, n, r) {
    var i;
    try {
      e && v((i = e.promise))
        ? i.call(e).done(t).fail(n)
        : e && v((i = e.then))
        ? i.call(e, t, n)
        : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }
  (ce.Callbacks = function (r) {
    var e, n;
    r =
      "string" == typeof r
        ? ((e = r),
          (n = {}),
          ce.each(e.match(D) || [], function (e, t) {
            n[t] = !0;
          }),
          n)
        : ce.extend({}, r);
    var i,
      t,
      o,
      a,
      s = [],
      u = [],
      l = -1,
      c = function () {
        for (a = a || r.once, o = i = !0; u.length; l = -1) {
          t = u.shift();
          while (++l < s.length)
            !1 === s[l].apply(t[0], t[1]) &&
              r.stopOnFalse &&
              ((l = s.length), (t = !1));
        }
        r.memory || (t = !1), (i = !1), a && (s = t ? [] : "");
      },
      f = {
        add: function () {
          return (
            s &&
              (t && !i && ((l = s.length - 1), u.push(t)),
              (function n(e) {
                ce.each(e, function (e, t) {
                  v(t)
                    ? (r.unique && f.has(t)) || s.push(t)
                    : t && t.length && "string" !== x(t) && n(t);
                });
              })(arguments),
              t && !i && c()),
            this
          );
        },
        remove: function () {
          return (
            ce.each(arguments, function (e, t) {
              var n;
              while (-1 < (n = ce.inArray(t, s, n)))
                s.splice(n, 1), n <= l && l--;
            }),
            this
          );
        },
        has: function (e) {
          return e ? -1 < ce.inArray(e, s) : 0 < s.length;
        },
        empty: function () {
          return s && (s = []), this;
        },
        disable: function () {
          return (a = u = []), (s = t = ""), this;
        },
        disabled: function () {
          return !s;
        },
        lock: function () {
          return (a = u = []), t || i || (s = t = ""), this;
        },
        locked: function () {
          return !!a;
        },
        fireWith: function (e, t) {
          return (
            a ||
              ((t = [e, (t = t || []).slice ? t.slice() : t]),
              u.push(t),
              i || c()),
            this
          );
        },
        fire: function () {
          return f.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!o;
        },
      };
    return f;
  }),
    ce.extend({
      Deferred: function (e) {
        var o = [
            [
              "notify",
              "progress",
              ce.Callbacks("memory"),
              ce.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              ce.Callbacks("once memory"),
              ce.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              ce.Callbacks("once memory"),
              ce.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          i = "pending",
          a = {
            state: function () {
              return i;
            },
            always: function () {
              return s.done(arguments).fail(arguments), this;
            },
            catch: function (e) {
              return a.then(null, e);
            },
            pipe: function () {
              var i = arguments;
              return ce
                .Deferred(function (r) {
                  ce.each(o, function (e, t) {
                    var n = v(i[t[4]]) && i[t[4]];
                    s[t[1]](function () {
                      var e = n && n.apply(this, arguments);
                      e && v(e.promise)
                        ? e
                            .promise()
                            .progress(r.notify)
                            .done(r.resolve)
                            .fail(r.reject)
                        : r[t[0] + "With"](this, n ? [e] : arguments);
                    });
                  }),
                    (i = null);
                })
                .promise();
            },
            then: function (t, n, r) {
              var u = 0;
              function l(i, o, a, s) {
                return function () {
                  var n = this,
                    r = arguments,
                    e = function () {
                      var e, t;
                      if (!(i < u)) {
                        if ((e = a.apply(n, r)) === o.promise())
                          throw new TypeError("Thenable self-resolution");
                        (t =
                          e &&
                          ("object" == typeof e || "function" == typeof e) &&
                          e.then),
                          v(t)
                            ? s
                              ? t.call(e, l(u, o, N, s), l(u, o, q, s))
                              : (u++,
                                t.call(
                                  e,
                                  l(u, o, N, s),
                                  l(u, o, q, s),
                                  l(u, o, N, o.notifyWith)
                                ))
                            : (a !== N && ((n = void 0), (r = [e])),
                              (s || o.resolveWith)(n, r));
                      }
                    },
                    t = s
                      ? e
                      : function () {
                          try {
                            e();
                          } catch (e) {
                            ce.Deferred.exceptionHook &&
                              ce.Deferred.exceptionHook(e, t.error),
                              u <= i + 1 &&
                                (a !== q && ((n = void 0), (r = [e])),
                                o.rejectWith(n, r));
                          }
                        };
                  i
                    ? t()
                    : (ce.Deferred.getErrorHook
                        ? (t.error = ce.Deferred.getErrorHook())
                        : ce.Deferred.getStackHook &&
                          (t.error = ce.Deferred.getStackHook()),
                      ie.setTimeout(t));
                };
              }
              return ce
                .Deferred(function (e) {
                  o[0][3].add(l(0, e, v(r) ? r : N, e.notifyWith)),
                    o[1][3].add(l(0, e, v(t) ? t : N)),
                    o[2][3].add(l(0, e, v(n) ? n : q));
                })
                .promise();
            },
            promise: function (e) {
              return null != e ? ce.extend(e, a) : a;
            },
          },
          s = {};
        return (
          ce.each(o, function (e, t) {
            var n = t[2],
              r = t[5];
            (a[t[1]] = n.add),
              r &&
                n.add(
                  function () {
                    i = r;
                  },
                  o[3 - e][2].disable,
                  o[3 - e][3].disable,
                  o[0][2].lock,
                  o[0][3].lock
                ),
              n.add(t[3].fire),
              (s[t[0]] = function () {
                return (
                  s[t[0] + "With"](this === s ? void 0 : this, arguments), this
                );
              }),
              (s[t[0] + "With"] = n.fireWith);
          }),
          a.promise(s),
          e && e.call(s, s),
          s
        );
      },
      when: function (e) {
        var n = arguments.length,
          t = n,
          r = Array(t),
          i = ae.call(arguments),
          o = ce.Deferred(),
          a = function (t) {
            return function (e) {
              (r[t] = this),
                (i[t] = 1 < arguments.length ? ae.call(arguments) : e),
                --n || o.resolveWith(r, i);
            };
          };
        if (
          n <= 1 &&
          (L(e, o.done(a(t)).resolve, o.reject, !n),
          "pending" === o.state() || v(i[t] && i[t].then))
        )
          return o.then();
        while (t--) L(i[t], a(t), o.reject);
        return o.promise();
      },
    });
  var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  (ce.Deferred.exceptionHook = function (e, t) {
    ie.console &&
      ie.console.warn &&
      e &&
      H.test(e.name) &&
      ie.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
  }),
    (ce.readyException = function (e) {
      ie.setTimeout(function () {
        throw e;
      });
    });
  var O = ce.Deferred();
  function P() {
    C.removeEventListener("DOMContentLoaded", P),
      ie.removeEventListener("load", P),
      ce.ready();
  }
  (ce.fn.ready = function (e) {
    return (
      O.then(e)["catch"](function (e) {
        ce.readyException(e);
      }),
      this
    );
  }),
    ce.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (e) {
        (!0 === e ? --ce.readyWait : ce.isReady) ||
          ((ce.isReady = !0) !== e && 0 < --ce.readyWait) ||
          O.resolveWith(C, [ce]);
      },
    }),
    (ce.ready.then = O.then),
    "complete" === C.readyState ||
    ("loading" !== C.readyState && !C.documentElement.doScroll)
      ? ie.setTimeout(ce.ready)
      : (C.addEventListener("DOMContentLoaded", P),
        ie.addEventListener("load", P));
  var M = function (e, t, n, r, i, o, a) {
      var s = 0,
        u = e.length,
        l = null == n;
      if ("object" === x(n))
        for (s in ((i = !0), n)) M(e, t, s, n[s], !0, o, a);
      else if (
        void 0 !== r &&
        ((i = !0),
        v(r) || (a = !0),
        l &&
          (a
            ? (t.call(e, r), (t = null))
            : ((l = t),
              (t = function (e, t, n) {
                return l.call(ce(e), n);
              }))),
        t)
      )
        for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
      return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
    },
    R = /^-ms-/,
    I = /-([a-z])/g;
  function W(e, t) {
    return t.toUpperCase();
  }
  function F(e) {
    return e.replace(R, "ms-").replace(I, W);
  }
  var $ = function (e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };
  function B() {
    this.expando = ce.expando + B.uid++;
  }
  (B.uid = 1),
    (B.prototype = {
      cache: function (e) {
        var t = e[this.expando];
        return (
          t ||
            ((t = {}),
            $(e) &&
              (e.nodeType
                ? (e[this.expando] = t)
                : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0,
                  }))),
          t
        );
      },
      set: function (e, t, n) {
        var r,
          i = this.cache(e);
        if ("string" == typeof t) i[F(t)] = n;
        else for (r in t) i[F(r)] = t[r];
        return i;
      },
      get: function (e, t) {
        return void 0 === t
          ? this.cache(e)
          : e[this.expando] && e[this.expando][F(t)];
      },
      access: function (e, t, n) {
        return void 0 === t || (t && "string" == typeof t && void 0 === n)
          ? this.get(e, t)
          : (this.set(e, t, n), void 0 !== n ? n : t);
      },
      remove: function (e, t) {
        var n,
          r = e[this.expando];
        if (void 0 !== r) {
          if (void 0 !== t) {
            n = (t = Array.isArray(t)
              ? t.map(F)
              : (t = F(t)) in r
              ? [t]
              : t.match(D) || []).length;
            while (n--) delete r[t[n]];
          }
          (void 0 === t || ce.isEmptyObject(r)) &&
            (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
        }
      },
      hasData: function (e) {
        var t = e[this.expando];
        return void 0 !== t && !ce.isEmptyObject(t);
      },
    });
  var _ = new B(),
    z = new B(),
    X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    U = /[A-Z]/g;
  function V(e, t, n) {
    var r, i;
    if (void 0 === n && 1 === e.nodeType)
      if (
        ((r = "data-" + t.replace(U, "-$&").toLowerCase()),
        "string" == typeof (n = e.getAttribute(r)))
      ) {
        try {
          n =
            "true" === (i = n) ||
            ("false" !== i &&
              ("null" === i
                ? null
                : i === +i + ""
                ? +i
                : X.test(i)
                ? JSON.parse(i)
                : i));
        } catch (e) {}
        z.set(e, t, n);
      } else n = void 0;
    return n;
  }
  ce.extend({
    hasData: function (e) {
      return z.hasData(e) || _.hasData(e);
    },
    data: function (e, t, n) {
      return z.access(e, t, n);
    },
    removeData: function (e, t) {
      z.remove(e, t);
    },
    _data: function (e, t, n) {
      return _.access(e, t, n);
    },
    _removeData: function (e, t) {
      _.remove(e, t);
    },
  }),
    ce.fn.extend({
      data: function (n, e) {
        var t,
          r,
          i,
          o = this[0],
          a = o && o.attributes;
        if (void 0 === n) {
          if (
            this.length &&
            ((i = z.get(o)), 1 === o.nodeType && !_.get(o, "hasDataAttrs"))
          ) {
            t = a.length;
            while (t--)
              a[t] &&
                0 === (r = a[t].name).indexOf("data-") &&
                ((r = F(r.slice(5))), V(o, r, i[r]));
            _.set(o, "hasDataAttrs", !0);
          }
          return i;
        }
        return "object" == typeof n
          ? this.each(function () {
              z.set(this, n);
            })
          : M(
              this,
              function (e) {
                var t;
                if (o && void 0 === e)
                  return void 0 !== (t = z.get(o, n))
                    ? t
                    : void 0 !== (t = V(o, n))
                    ? t
                    : void 0;
                this.each(function () {
                  z.set(this, n, e);
                });
              },
              null,
              e,
              1 < arguments.length,
              null,
              !0
            );
      },
      removeData: function (e) {
        return this.each(function () {
          z.remove(this, e);
        });
      },
    }),
    ce.extend({
      queue: function (e, t, n) {
        var r;
        if (e)
          return (
            (t = (t || "fx") + "queue"),
            (r = _.get(e, t)),
            n &&
              (!r || Array.isArray(n)
                ? (r = _.access(e, t, ce.makeArray(n)))
                : r.push(n)),
            r || []
          );
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var n = ce.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = ce._queueHooks(e, t);
        "inprogress" === i && ((i = n.shift()), r--),
          i &&
            ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(
              e,
              function () {
                ce.dequeue(e, t);
              },
              o
            )),
          !r && o && o.empty.fire();
      },
      _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return (
          _.get(e, n) ||
          _.access(e, n, {
            empty: ce.Callbacks("once memory").add(function () {
              _.remove(e, [t + "queue", n]);
            }),
          })
        );
      },
    }),
    ce.fn.extend({
      queue: function (t, n) {
        var e = 2;
        return (
          "string" != typeof t && ((n = t), (t = "fx"), e--),
          arguments.length < e
            ? ce.queue(this[0], t)
            : void 0 === n
            ? this
            : this.each(function () {
                var e = ce.queue(this, t, n);
                ce._queueHooks(this, t),
                  "fx" === t && "inprogress" !== e[0] && ce.dequeue(this, t);
              })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          ce.dequeue(this, e);
        });
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, t) {
        var n,
          r = 1,
          i = ce.Deferred(),
          o = this,
          a = this.length,
          s = function () {
            --r || i.resolveWith(o, [o]);
          };
        "string" != typeof e && ((t = e), (e = void 0)), (e = e || "fx");
        while (a--)
          (n = _.get(o[a], e + "queueHooks")) &&
            n.empty &&
            (r++, n.empty.add(s));
        return s(), i.promise(t);
      },
    });
  var G = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    Y = new RegExp("^(?:([+-])=|)(" + G + ")([a-z%]*)$", "i"),
    Q = ["Top", "Right", "Bottom", "Left"],
    J = C.documentElement,
    K = function (e) {
      return ce.contains(e.ownerDocument, e);
    },
    Z = { composed: !0 };
  J.getRootNode &&
    (K = function (e) {
      return (
        ce.contains(e.ownerDocument, e) || e.getRootNode(Z) === e.ownerDocument
      );
    });
  var ee = function (e, t) {
    return (
      "none" === (e = t || e).style.display ||
      ("" === e.style.display && K(e) && "none" === ce.css(e, "display"))
    );
  };
  function te(e, t, n, r) {
    var i,
      o,
      a = 20,
      s = r
        ? function () {
            return r.cur();
          }
        : function () {
            return ce.css(e, t, "");
          },
      u = s(),
      l = (n && n[3]) || (ce.cssNumber[t] ? "" : "px"),
      c =
        e.nodeType &&
        (ce.cssNumber[t] || ("px" !== l && +u)) &&
        Y.exec(ce.css(e, t));
    if (c && c[3] !== l) {
      (u /= 2), (l = l || c[3]), (c = +u || 1);
      while (a--)
        ce.style(e, t, c + l),
          (1 - o) * (1 - (o = s() / u || 0.5)) <= 0 && (a = 0),
          (c /= o);
      (c *= 2), ce.style(e, t, c + l), (n = n || []);
    }
    return (
      n &&
        ((c = +c || +u || 0),
        (i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
        r && ((r.unit = l), (r.start = c), (r.end = i))),
      i
    );
  }
  var ne = {};
  function re(e, t) {
    for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)
      (r = e[c]).style &&
        ((n = r.style.display),
        t
          ? ("none" === n &&
              ((l[c] = _.get(r, "display") || null),
              l[c] || (r.style.display = "")),
            "" === r.style.display &&
              ee(r) &&
              (l[c] =
                ((u = a = o = void 0),
                (a = (i = r).ownerDocument),
                (s = i.nodeName),
                (u = ne[s]) ||
                  ((o = a.body.appendChild(a.createElement(s))),
                  (u = ce.css(o, "display")),
                  o.parentNode.removeChild(o),
                  "none" === u && (u = "block"),
                  (ne[s] = u)))))
          : "none" !== n && ((l[c] = "none"), _.set(r, "display", n)));
    for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
    return e;
  }
  ce.fn.extend({
    show: function () {
      return re(this, !0);
    },
    hide: function () {
      return re(this);
    },
    toggle: function (e) {
      return "boolean" == typeof e
        ? e
          ? this.show()
          : this.hide()
        : this.each(function () {
            ee(this) ? ce(this).show() : ce(this).hide();
          });
    },
  });
  var xe,
    be,
    we = /^(?:checkbox|radio)$/i,
    Te = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    Ce = /^$|^module$|\/(?:java|ecma)script/i;
  (xe = C.createDocumentFragment().appendChild(C.createElement("div"))),
    (be = C.createElement("input")).setAttribute("type", "radio"),
    be.setAttribute("checked", "checked"),
    be.setAttribute("name", "t"),
    xe.appendChild(be),
    (le.checkClone = xe.cloneNode(!0).cloneNode(!0).lastChild.checked),
    (xe.innerHTML = "<textarea>x</textarea>"),
    (le.noCloneChecked = !!xe.cloneNode(!0).lastChild.defaultValue),
    (xe.innerHTML = "<option></option>"),
    (le.option = !!xe.lastChild);
  var ke = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""],
  };
  function Se(e, t) {
    var n;
    return (
      (n =
        "undefined" != typeof e.getElementsByTagName
          ? e.getElementsByTagName(t || "*")
          : "undefined" != typeof e.querySelectorAll
          ? e.querySelectorAll(t || "*")
          : []),
      void 0 === t || (t && fe(e, t)) ? ce.merge([e], n) : n
    );
  }
  function Ee(e, t) {
    for (var n = 0, r = e.length; n < r; n++)
      _.set(e[n], "globalEval", !t || _.get(t[n], "globalEval"));
  }
  (ke.tbody = ke.tfoot = ke.colgroup = ke.caption = ke.thead),
    (ke.th = ke.td),
    le.option ||
      (ke.optgroup = ke.option =
        [1, "<select multiple='multiple'>", "</select>"]);
  var je = /<|&#?\w+;/;
  function Ae(e, t, n, r, i) {
    for (
      var o,
        a,
        s,
        u,
        l,
        c,
        f = t.createDocumentFragment(),
        p = [],
        d = 0,
        h = e.length;
      d < h;
      d++
    )
      if ((o = e[d]) || 0 === o)
        if ("object" === x(o)) ce.merge(p, o.nodeType ? [o] : o);
        else if (je.test(o)) {
          (a = a || f.appendChild(t.createElement("div"))),
            (s = (Te.exec(o) || ["", ""])[1].toLowerCase()),
            (u = ke[s] || ke._default),
            (a.innerHTML = u[1] + ce.htmlPrefilter(o) + u[2]),
            (c = u[0]);
          while (c--) a = a.lastChild;
          ce.merge(p, a.childNodes), ((a = f.firstChild).textContent = "");
        } else p.push(t.createTextNode(o));
    (f.textContent = ""), (d = 0);
    while ((o = p[d++]))
      if (r && -1 < ce.inArray(o, r)) i && i.push(o);
      else if (
        ((l = K(o)), (a = Se(f.appendChild(o), "script")), l && Ee(a), n)
      ) {
        c = 0;
        while ((o = a[c++])) Ce.test(o.type || "") && n.push(o);
      }
    return f;
  }
  var De = /^([^.]*)(?:\.(.+)|)/;
  function Ne() {
    return !0;
  }
  function qe() {
    return !1;
  }
  function Le(e, t, n, r, i, o) {
    var a, s;
    if ("object" == typeof t) {
      for (s in ("string" != typeof n && ((r = r || n), (n = void 0)), t))
        Le(e, s, n, r, t[s], o);
      return e;
    }
    if (
      (null == r && null == i
        ? ((i = n), (r = n = void 0))
        : null == i &&
          ("string" == typeof n
            ? ((i = r), (r = void 0))
            : ((i = r), (r = n), (n = void 0))),
      !1 === i)
    )
      i = qe;
    else if (!i) return e;
    return (
      1 === o &&
        ((a = i),
        ((i = function (e) {
          return ce().off(e), a.apply(this, arguments);
        }).guid = a.guid || (a.guid = ce.guid++))),
      e.each(function () {
        ce.event.add(this, t, i, r, n);
      })
    );
  }
  function He(e, r, t) {
    t
      ? (_.set(e, r, !1),
        ce.event.add(e, r, {
          namespace: !1,
          handler: function (e) {
            var t,
              n = _.get(this, r);
            if (1 & e.isTrigger && this[r]) {
              if (n)
                (ce.event.special[r] || {}).delegateType && e.stopPropagation();
              else if (
                ((n = ae.call(arguments)),
                _.set(this, r, n),
                this[r](),
                (t = _.get(this, r)),
                _.set(this, r, !1),
                n !== t)
              )
                return e.stopImmediatePropagation(), e.preventDefault(), t;
            } else
              n &&
                (_.set(this, r, ce.event.trigger(n[0], n.slice(1), this)),
                e.stopPropagation(),
                (e.isImmediatePropagationStopped = Ne));
          },
        }))
      : void 0 === _.get(e, r) && ce.event.add(e, r, Ne);
  }
  (ce.event = {
    global: {},
    add: function (t, e, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        g,
        v = _.get(t);
      if ($(t)) {
        n.handler && ((n = (o = n).handler), (i = o.selector)),
          i && ce.find.matchesSelector(J, i),
          n.guid || (n.guid = ce.guid++),
          (u = v.events) || (u = v.events = Object.create(null)),
          (a = v.handle) ||
            (a = v.handle =
              function (e) {
                return "undefined" != typeof ce && ce.event.triggered !== e.type
                  ? ce.event.dispatch.apply(t, arguments)
                  : void 0;
              }),
          (l = (e = (e || "").match(D) || [""]).length);
        while (l--)
          (d = g = (s = De.exec(e[l]) || [])[1]),
            (h = (s[2] || "").split(".").sort()),
            d &&
              ((f = ce.event.special[d] || {}),
              (d = (i ? f.delegateType : f.bindType) || d),
              (f = ce.event.special[d] || {}),
              (c = ce.extend(
                {
                  type: d,
                  origType: g,
                  data: r,
                  handler: n,
                  guid: n.guid,
                  selector: i,
                  needsContext: i && ce.expr.match.needsContext.test(i),
                  namespace: h.join("."),
                },
                o
              )),
              (p = u[d]) ||
                (((p = u[d] = []).delegateCount = 0),
                (f.setup && !1 !== f.setup.call(t, r, h, a)) ||
                  (t.addEventListener && t.addEventListener(d, a))),
              f.add &&
                (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)),
              i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
              (ce.event.global[d] = !0));
      }
    },
    remove: function (e, t, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        g,
        v = _.hasData(e) && _.get(e);
      if (v && (u = v.events)) {
        l = (t = (t || "").match(D) || [""]).length;
        while (l--)
          if (
            ((d = g = (s = De.exec(t[l]) || [])[1]),
            (h = (s[2] || "").split(".").sort()),
            d)
          ) {
            (f = ce.event.special[d] || {}),
              (p = u[(d = (r ? f.delegateType : f.bindType) || d)] || []),
              (s =
                s[2] &&
                new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")),
              (a = o = p.length);
            while (o--)
              (c = p[o]),
                (!i && g !== c.origType) ||
                  (n && n.guid !== c.guid) ||
                  (s && !s.test(c.namespace)) ||
                  (r && r !== c.selector && ("**" !== r || !c.selector)) ||
                  (p.splice(o, 1),
                  c.selector && p.delegateCount--,
                  f.remove && f.remove.call(e, c));
            a &&
              !p.length &&
              ((f.teardown && !1 !== f.teardown.call(e, h, v.handle)) ||
                ce.removeEvent(e, d, v.handle),
              delete u[d]);
          } else for (d in u) ce.event.remove(e, d + t[l], n, r, !0);
        ce.isEmptyObject(u) && _.remove(e, "handle events");
      }
    },
    dispatch: function (e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s = new Array(arguments.length),
        u = ce.event.fix(e),
        l = (_.get(this, "events") || Object.create(null))[u.type] || [],
        c = ce.event.special[u.type] || {};
      for (s[0] = u, t = 1; t < arguments.length; t++) s[t] = arguments[t];
      if (
        ((u.delegateTarget = this),
        !c.preDispatch || !1 !== c.preDispatch.call(this, u))
      ) {
        (a = ce.event.handlers.call(this, u, l)), (t = 0);
        while ((i = a[t++]) && !u.isPropagationStopped()) {
          (u.currentTarget = i.elem), (n = 0);
          while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped())
            (u.rnamespace &&
              !1 !== o.namespace &&
              !u.rnamespace.test(o.namespace)) ||
              ((u.handleObj = o),
              (u.data = o.data),
              void 0 !==
                (r = (
                  (ce.event.special[o.origType] || {}).handle || o.handler
                ).apply(i.elem, s)) &&
                !1 === (u.result = r) &&
                (u.preventDefault(), u.stopPropagation()));
        }
        return c.postDispatch && c.postDispatch.call(this, u), u.result;
      }
    },
    handlers: function (e, t) {
      var n,
        r,
        i,
        o,
        a,
        s = [],
        u = t.delegateCount,
        l = e.target;
      if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
        for (; l !== this; l = l.parentNode || this)
          if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
            for (o = [], a = {}, n = 0; n < u; n++)
              void 0 === a[(i = (r = t[n]).selector + " ")] &&
                (a[i] = r.needsContext
                  ? -1 < ce(i, this).index(l)
                  : ce.find(i, this, null, [l]).length),
                a[i] && o.push(r);
            o.length && s.push({ elem: l, handlers: o });
          }
      return (
        (l = this), u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s
      );
    },
    addProp: function (t, e) {
      Object.defineProperty(ce.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: v(e)
          ? function () {
              if (this.originalEvent) return e(this.originalEvent);
            }
          : function () {
              if (this.originalEvent) return this.originalEvent[t];
            },
        set: function (e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e,
          });
        },
      });
    },
    fix: function (e) {
      return e[ce.expando] ? e : new ce.Event(e);
    },
    special: {
      load: { noBubble: !0 },
      click: {
        setup: function (e) {
          var t = this || e;
          return (
            we.test(t.type) && t.click && fe(t, "input") && He(t, "click", !0),
            !1
          );
        },
        trigger: function (e) {
          var t = this || e;
          return (
            we.test(t.type) && t.click && fe(t, "input") && He(t, "click"), !0
          );
        },
        _default: function (e) {
          var t = e.target;
          return (
            (we.test(t.type) &&
              t.click &&
              fe(t, "input") &&
              _.get(t, "click")) ||
            fe(t, "a")
          );
        },
      },
      beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        },
      },
    },
  }),
    (ce.removeEvent = function (e, t, n) {
      e.removeEventListener && e.removeEventListener(t, n);
    }),
    (ce.Event = function (e, t) {
      if (!(this instanceof ce.Event)) return new ce.Event(e, t);
      e && e.type
        ? ((this.originalEvent = e),
          (this.type = e.type),
          (this.isDefaultPrevented =
            e.defaultPrevented ||
            (void 0 === e.defaultPrevented && !1 === e.returnValue)
              ? Ne
              : qe),
          (this.target =
            e.target && 3 === e.target.nodeType
              ? e.target.parentNode
              : e.target),
          (this.currentTarget = e.currentTarget),
          (this.relatedTarget = e.relatedTarget))
        : (this.type = e),
        t && ce.extend(this, t),
        (this.timeStamp = (e && e.timeStamp) || Date.now()),
        (this[ce.expando] = !0);
    }),
    (ce.Event.prototype = {
      constructor: ce.Event,
      isDefaultPrevented: qe,
      isPropagationStopped: qe,
      isImmediatePropagationStopped: qe,
      isSimulated: !1,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = Ne),
          e && !this.isSimulated && e.preventDefault();
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = Ne),
          e && !this.isSimulated && e.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = Ne),
          e && !this.isSimulated && e.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    ce.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0,
      },
      ce.event.addProp
    ),
    ce.each({ focus: "focusin", blur: "focusout" }, function (r, i) {
      function o(e) {
        if (C.documentMode) {
          var t = _.get(this, "handle"),
            n = ce.event.fix(e);
          (n.type = "focusin" === e.type ? "focus" : "blur"),
            (n.isSimulated = !0),
            t(e),
            n.target === n.currentTarget && t(n);
        } else ce.event.simulate(i, e.target, ce.event.fix(e));
      }
      (ce.event.special[r] = {
        setup: function () {
          var e;
          if ((He(this, r, !0), !C.documentMode)) return !1;
          (e = _.get(this, i)) || this.addEventListener(i, o),
            _.set(this, i, (e || 0) + 1);
        },
        trigger: function () {
          return He(this, r), !0;
        },
        teardown: function () {
          var e;
          if (!C.documentMode) return !1;
          (e = _.get(this, i) - 1)
            ? _.set(this, i, e)
            : (this.removeEventListener(i, o), _.remove(this, i));
        },
        _default: function (e) {
          return _.get(e.target, r);
        },
        delegateType: i,
      }),
        (ce.event.special[i] = {
          setup: function () {
            var e = this.ownerDocument || this.document || this,
              t = C.documentMode ? this : e,
              n = _.get(t, i);
            n ||
              (C.documentMode
                ? this.addEventListener(i, o)
                : e.addEventListener(r, o, !0)),
              _.set(t, i, (n || 0) + 1);
          },
          teardown: function () {
            var e = this.ownerDocument || this.document || this,
              t = C.documentMode ? this : e,
              n = _.get(t, i) - 1;
            n
              ? _.set(t, i, n)
              : (C.documentMode
                  ? this.removeEventListener(i, o)
                  : e.removeEventListener(r, o, !0),
                _.remove(t, i));
          },
        });
    }),
    ce.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (e, i) {
        ce.event.special[e] = {
          delegateType: i,
          bindType: i,
          handle: function (e) {
            var t,
              n = e.relatedTarget,
              r = e.handleObj;
            return (
              (n && (n === this || ce.contains(this, n))) ||
                ((e.type = r.origType),
                (t = r.handler.apply(this, arguments)),
                (e.type = i)),
              t
            );
          },
        };
      }
    ),
    ce.fn.extend({
      on: function (e, t, n, r) {
        return Le(this, e, t, n, r);
      },
      one: function (e, t, n, r) {
        return Le(this, e, t, n, r, 1);
      },
      off: function (e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj)
          return (
            (r = e.handleObj),
            ce(e.delegateTarget).off(
              r.namespace ? r.origType + "." + r.namespace : r.origType,
              r.selector,
              r.handler
            ),
            this
          );
        if ("object" == typeof e) {
          for (i in e) this.off(i, t, e[i]);
          return this;
        }
        return (
          (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
          !1 === n && (n = qe),
          this.each(function () {
            ce.event.remove(this, e, n, t);
          })
        );
      },
    });
  var Oe = /<script|<style|<link/i,
    Pe = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Me = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
  function Re(e, t) {
    return (
      (fe(e, "table") &&
        fe(11 !== t.nodeType ? t : t.firstChild, "tr") &&
        ce(e).children("tbody")[0]) ||
      e
    );
  }
  function Ie(e) {
    return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
  }
  function We(e) {
    return (
      "true/" === (e.type || "").slice(0, 5)
        ? (e.type = e.type.slice(5))
        : e.removeAttribute("type"),
      e
    );
  }
  function Fe(e, t) {
    var n, r, i, o, a, s;
    if (1 === t.nodeType) {
      if (_.hasData(e) && (s = _.get(e).events))
        for (i in (_.remove(t, "handle events"), s))
          for (n = 0, r = s[i].length; n < r; n++) ce.event.add(t, i, s[i][n]);
      z.hasData(e) && ((o = z.access(e)), (a = ce.extend({}, o)), z.set(t, a));
    }
  }
  function $e(n, r, i, o) {
    r = g(r);
    var e,
      t,
      a,
      s,
      u,
      l,
      c = 0,
      f = n.length,
      p = f - 1,
      d = r[0],
      h = v(d);
    if (h || (1 < f && "string" == typeof d && !le.checkClone && Pe.test(d)))
      return n.each(function (e) {
        var t = n.eq(e);
        h && (r[0] = d.call(this, e, t.html())), $e(t, r, i, o);
      });
    if (
      f &&
      ((t = (e = Ae(r, n[0].ownerDocument, !1, n, o)).firstChild),
      1 === e.childNodes.length && (e = t),
      t || o)
    ) {
      for (s = (a = ce.map(Se(e, "script"), Ie)).length; c < f; c++)
        (u = e),
          c !== p &&
            ((u = ce.clone(u, !0, !0)), s && ce.merge(a, Se(u, "script"))),
          i.call(n[c], u, c);
      if (s)
        for (
          l = a[a.length - 1].ownerDocument, ce.map(a, We), c = 0;
          c < s;
          c++
        )
          (u = a[c]),
            Ce.test(u.type || "") &&
              !_.access(u, "globalEval") &&
              ce.contains(l, u) &&
              (u.src && "module" !== (u.type || "").toLowerCase()
                ? ce._evalUrl &&
                  !u.noModule &&
                  ce._evalUrl(
                    u.src,
                    { nonce: u.nonce || u.getAttribute("nonce") },
                    l
                  )
                : m(u.textContent.replace(Me, ""), u, l));
    }
    return n;
  }
  function Be(e, t, n) {
    for (var r, i = t ? ce.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
      n || 1 !== r.nodeType || ce.cleanData(Se(r)),
        r.parentNode &&
          (n && K(r) && Ee(Se(r, "script")), r.parentNode.removeChild(r));
    return e;
  }
  ce.extend({
    htmlPrefilter: function (e) {
      return e;
    },
    clone: function (e, t, n) {
      var r,
        i,
        o,
        a,
        s,
        u,
        l,
        c = e.cloneNode(!0),
        f = K(e);
      if (
        !(
          le.noCloneChecked ||
          (1 !== e.nodeType && 11 !== e.nodeType) ||
          ce.isXMLDoc(e)
        )
      )
        for (a = Se(c), r = 0, i = (o = Se(e)).length; r < i; r++)
          (s = o[r]),
            (u = a[r]),
            void 0,
            "input" === (l = u.nodeName.toLowerCase()) && we.test(s.type)
              ? (u.checked = s.checked)
              : ("input" !== l && "textarea" !== l) ||
                (u.defaultValue = s.defaultValue);
      if (t)
        if (n)
          for (o = o || Se(e), a = a || Se(c), r = 0, i = o.length; r < i; r++)
            Fe(o[r], a[r]);
        else Fe(e, c);
      return (
        0 < (a = Se(c, "script")).length && Ee(a, !f && Se(e, "script")), c
      );
    },
    cleanData: function (e) {
      for (var t, n, r, i = ce.event.special, o = 0; void 0 !== (n = e[o]); o++)
        if ($(n)) {
          if ((t = n[_.expando])) {
            if (t.events)
              for (r in t.events)
                i[r] ? ce.event.remove(n, r) : ce.removeEvent(n, r, t.handle);
            n[_.expando] = void 0;
          }
          n[z.expando] && (n[z.expando] = void 0);
        }
    },
  }),
    ce.fn.extend({
      detach: function (e) {
        return Be(this, e, !0);
      },
      remove: function (e) {
        return Be(this, e);
      },
      text: function (e) {
        return M(
          this,
          function (e) {
            return void 0 === e
              ? ce.text(this)
              : this.empty().each(function () {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    (this.textContent = e);
                });
          },
          null,
          e,
          arguments.length
        );
      },
      append: function () {
        return $e(this, arguments, function (e) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            Re(this, e).appendChild(e);
        });
      },
      prepend: function () {
        return $e(this, arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = Re(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function () {
        return $e(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return $e(this, arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++)
          1 === e.nodeType && (ce.cleanData(Se(e, !1)), (e.textContent = ""));
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function () {
            return ce.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return M(
          this,
          function (e) {
            var t = this[0] || {},
              n = 0,
              r = this.length;
            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
            if (
              "string" == typeof e &&
              !Oe.test(e) &&
              !ke[(Te.exec(e) || ["", ""])[1].toLowerCase()]
            ) {
              e = ce.htmlPrefilter(e);
              try {
                for (; n < r; n++)
                  1 === (t = this[n] || {}).nodeType &&
                    (ce.cleanData(Se(t, !1)), (t.innerHTML = e));
                t = 0;
              } catch (e) {}
            }
            t && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function () {
        var n = [];
        return $e(
          this,
          arguments,
          function (e) {
            var t = this.parentNode;
            ce.inArray(this, n) < 0 &&
              (ce.cleanData(Se(this)), t && t.replaceChild(e, this));
          },
          n
        );
      },
    }),
    ce.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (e, a) {
        ce.fn[e] = function (e) {
          for (var t, n = [], r = ce(e), i = r.length - 1, o = 0; o <= i; o++)
            (t = o === i ? this : this.clone(!0)),
              ce(r[o])[a](t),
              s.apply(n, t.get());
          return this.pushStack(n);
        };
      }
    );
  var _e = new RegExp("^(" + G + ")(?!px)[a-z%]+$", "i"),
    ze = /^--/,
    Xe = function (e) {
      var t = e.ownerDocument.defaultView;
      return (t && t.opener) || (t = ie), t.getComputedStyle(e);
    },
    Ue = function (e, t, n) {
      var r,
        i,
        o = {};
      for (i in t) (o[i] = e.style[i]), (e.style[i] = t[i]);
      for (i in ((r = n.call(e)), t)) e.style[i] = o[i];
      return r;
    },
    Ve = new RegExp(Q.join("|"), "i");
  function Ge(e, t, n) {
    var r,
      i,
      o,
      a,
      s = ze.test(t),
      u = e.style;
    return (
      (n = n || Xe(e)) &&
        ((a = n.getPropertyValue(t) || n[t]),
        s && a && (a = a.replace(ve, "$1") || void 0),
        "" !== a || K(e) || (a = ce.style(e, t)),
        !le.pixelBoxStyles() &&
          _e.test(a) &&
          Ve.test(t) &&
          ((r = u.width),
          (i = u.minWidth),
          (o = u.maxWidth),
          (u.minWidth = u.maxWidth = u.width = a),
          (a = n.width),
          (u.width = r),
          (u.minWidth = i),
          (u.maxWidth = o))),
      void 0 !== a ? a + "" : a
    );
  }
  function Ye(e, t) {
    return {
      get: function () {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      },
    };
  }
  !(function () {
    function e() {
      if (l) {
        (u.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
          (l.style.cssText =
            "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
          J.appendChild(u).appendChild(l);
        var e = ie.getComputedStyle(l);
        (n = "1%" !== e.top),
          (s = 12 === t(e.marginLeft)),
          (l.style.right = "60%"),
          (o = 36 === t(e.right)),
          (r = 36 === t(e.width)),
          (l.style.position = "absolute"),
          (i = 12 === t(l.offsetWidth / 3)),
          J.removeChild(u),
          (l = null);
      }
    }
    function t(e) {
      return Math.round(parseFloat(e));
    }
    var n,
      r,
      i,
      o,
      a,
      s,
      u = C.createElement("div"),
      l = C.createElement("div");
    l.style &&
      ((l.style.backgroundClip = "content-box"),
      (l.cloneNode(!0).style.backgroundClip = ""),
      (le.clearCloneStyle = "content-box" === l.style.backgroundClip),
      ce.extend(le, {
        boxSizingReliable: function () {
          return e(), r;
        },
        pixelBoxStyles: function () {
          return e(), o;
        },
        pixelPosition: function () {
          return e(), n;
        },
        reliableMarginLeft: function () {
          return e(), s;
        },
        scrollboxSize: function () {
          return e(), i;
        },
        reliableTrDimensions: function () {
          var e, t, n, r;
          return (
            null == a &&
              ((e = C.createElement("table")),
              (t = C.createElement("tr")),
              (n = C.createElement("div")),
              (e.style.cssText =
                "position:absolute;left:-11111px;border-collapse:separate"),
              (t.style.cssText = "box-sizing:content-box;border:1px solid"),
              (t.style.height = "1px"),
              (n.style.height = "9px"),
              (n.style.display = "block"),
              J.appendChild(e).appendChild(t).appendChild(n),
              (r = ie.getComputedStyle(t)),
              (a =
                parseInt(r.height, 10) +
                  parseInt(r.borderTopWidth, 10) +
                  parseInt(r.borderBottomWidth, 10) ===
                t.offsetHeight),
              J.removeChild(e)),
            a
          );
        },
      }));
  })();
  var Qe = ["Webkit", "Moz", "ms"],
    Je = C.createElement("div").style,
    Ke = {};
  function Ze(e) {
    var t = ce.cssProps[e] || Ke[e];
    return (
      t ||
      (e in Je
        ? e
        : (Ke[e] =
            (function (e) {
              var t = e[0].toUpperCase() + e.slice(1),
                n = Qe.length;
              while (n--) if ((e = Qe[n] + t) in Je) return e;
            })(e) || e))
    );
  }
  var et = /^(none|table(?!-c[ea]).+)/,
    tt = { position: "absolute", visibility: "hidden", display: "block" },
    nt = { letterSpacing: "0", fontWeight: "400" };
  function rt(e, t, n) {
    var r = Y.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }
  function it(e, t, n, r, i, o) {
    var a = "width" === t ? 1 : 0,
      s = 0,
      u = 0,
      l = 0;
    if (n === (r ? "border" : "content")) return 0;
    for (; a < 4; a += 2)
      "margin" === n && (l += ce.css(e, n + Q[a], !0, i)),
        r
          ? ("content" === n && (u -= ce.css(e, "padding" + Q[a], !0, i)),
            "margin" !== n &&
              (u -= ce.css(e, "border" + Q[a] + "Width", !0, i)))
          : ((u += ce.css(e, "padding" + Q[a], !0, i)),
            "padding" !== n
              ? (u += ce.css(e, "border" + Q[a] + "Width", !0, i))
              : (s += ce.css(e, "border" + Q[a] + "Width", !0, i)));
    return (
      !r &&
        0 <= o &&
        (u +=
          Math.max(
            0,
            Math.ceil(
              e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - 0.5
            )
          ) || 0),
      u + l
    );
  }
  function ot(e, t, n) {
    var r = Xe(e),
      i =
        (!le.boxSizingReliable() || n) &&
        "border-box" === ce.css(e, "boxSizing", !1, r),
      o = i,
      a = Ge(e, t, r),
      s = "offset" + t[0].toUpperCase() + t.slice(1);
    if (_e.test(a)) {
      if (!n) return a;
      a = "auto";
    }
    return (
      ((!le.boxSizingReliable() && i) ||
        (!le.reliableTrDimensions() && fe(e, "tr")) ||
        "auto" === a ||
        (!parseFloat(a) && "inline" === ce.css(e, "display", !1, r))) &&
        e.getClientRects().length &&
        ((i = "border-box" === ce.css(e, "boxSizing", !1, r)),
        (o = s in e) && (a = e[s])),
      (a = parseFloat(a) || 0) +
        it(e, t, n || (i ? "border" : "content"), o, r, a) +
        "px"
    );
  }
  function at(e, t, n, r, i) {
    return new at.prototype.init(e, t, n, r, i);
  }
  ce.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = Ge(e, "opacity");
            return "" === n ? "1" : n;
          }
        },
      },
    },
    cssNumber: {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageSlice: !0,
      columnCount: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      scale: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
    },
    cssProps: {},
    style: function (e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
          o,
          a,
          s = F(t),
          u = ze.test(t),
          l = e.style;
        if (
          (u || (t = Ze(s)),
          (a = ce.cssHooks[t] || ce.cssHooks[s]),
          void 0 === n)
        )
          return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
        "string" === (o = typeof n) &&
          (i = Y.exec(n)) &&
          i[1] &&
          ((n = te(e, t, i)), (o = "number")),
          null != n &&
            n == n &&
            ("number" !== o ||
              u ||
              (n += (i && i[3]) || (ce.cssNumber[s] ? "" : "px")),
            le.clearCloneStyle ||
              "" !== n ||
              0 !== t.indexOf("background") ||
              (l[t] = "inherit"),
            (a && "set" in a && void 0 === (n = a.set(e, n, r))) ||
              (u ? l.setProperty(t, n) : (l[t] = n)));
      }
    },
    css: function (e, t, n, r) {
      var i,
        o,
        a,
        s = F(t);
      return (
        ze.test(t) || (t = Ze(s)),
        (a = ce.cssHooks[t] || ce.cssHooks[s]) &&
          "get" in a &&
          (i = a.get(e, !0, n)),
        void 0 === i && (i = Ge(e, t, r)),
        "normal" === i && t in nt && (i = nt[t]),
        "" === n || n
          ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
          : i
      );
    },
  }),
    ce.each(["height", "width"], function (e, u) {
      ce.cssHooks[u] = {
        get: function (e, t, n) {
          if (t)
            return !et.test(ce.css(e, "display")) ||
              (e.getClientRects().length && e.getBoundingClientRect().width)
              ? ot(e, u, n)
              : Ue(e, tt, function () {
                  return ot(e, u, n);
                });
        },
        set: function (e, t, n) {
          var r,
            i = Xe(e),
            o = !le.scrollboxSize() && "absolute" === i.position,
            a = (o || n) && "border-box" === ce.css(e, "boxSizing", !1, i),
            s = n ? it(e, u, n, a, i) : 0;
          return (
            a &&
              o &&
              (s -= Math.ceil(
                e["offset" + u[0].toUpperCase() + u.slice(1)] -
                  parseFloat(i[u]) -
                  it(e, u, "border", !1, i) -
                  0.5
              )),
            s &&
              (r = Y.exec(t)) &&
              "px" !== (r[3] || "px") &&
              ((e.style[u] = t), (t = ce.css(e, u))),
            rt(0, t, s)
          );
        },
      };
    }),
    (ce.cssHooks.marginLeft = Ye(le.reliableMarginLeft, function (e, t) {
      if (t)
        return (
          (parseFloat(Ge(e, "marginLeft")) ||
            e.getBoundingClientRect().left -
              Ue(e, { marginLeft: 0 }, function () {
                return e.getBoundingClientRect().left;
              })) + "px"
        );
    })),
    ce.each({ margin: "", padding: "", border: "Width" }, function (i, o) {
      (ce.cssHooks[i + o] = {
        expand: function (e) {
          for (
            var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e];
            t < 4;
            t++
          )
            n[i + Q[t] + o] = r[t] || r[t - 2] || r[0];
          return n;
        },
      }),
        "margin" !== i && (ce.cssHooks[i + o].set = rt);
    }),
    ce.fn.extend({
      css: function (e, t) {
        return M(
          this,
          function (e, t, n) {
            var r,
              i,
              o = {},
              a = 0;
            if (Array.isArray(t)) {
              for (r = Xe(e), i = t.length; a < i; a++)
                o[t[a]] = ce.css(e, t[a], !1, r);
              return o;
            }
            return void 0 !== n ? ce.style(e, t, n) : ce.css(e, t);
          },
          e,
          t,
          1 < arguments.length
        );
      },
    }),
    (((ce.Tween = at).prototype = {
      constructor: at,
      init: function (e, t, n, r, i, o) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = i || ce.easing._default),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = o || (ce.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var e = at.propHooks[this.prop];
        return e && e.get ? e.get(this) : at.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          n = at.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = t =
                ce.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration
                ))
            : (this.pos = t = e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : at.propHooks._default.set(this),
          this
        );
      },
    }).init.prototype = at.prototype),
    ((at.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return 1 !== e.elem.nodeType ||
            (null != e.elem[e.prop] && null == e.elem.style[e.prop])
            ? e.elem[e.prop]
            : (t = ce.css(e.elem, e.prop, "")) && "auto" !== t
            ? t
            : 0;
        },
        set: function (e) {
          ce.fx.step[e.prop]
            ? ce.fx.step[e.prop](e)
            : 1 !== e.elem.nodeType ||
              (!ce.cssHooks[e.prop] && null == e.elem.style[Ze(e.prop)])
            ? (e.elem[e.prop] = e.now)
            : ce.style(e.elem, e.prop, e.now + e.unit);
        },
      },
    }).scrollTop = at.propHooks.scrollLeft =
      {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        },
      }),
    (ce.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
      _default: "swing",
    }),
    (ce.fx = at.prototype.init),
    (ce.fx.step = {});
  var st,
    ut,
    lt,
    ct,
    ft = /^(?:toggle|show|hide)$/,
    pt = /queueHooks$/;
  function dt() {
    ut &&
      (!1 === C.hidden && ie.requestAnimationFrame
        ? ie.requestAnimationFrame(dt)
        : ie.setTimeout(dt, ce.fx.interval),
      ce.fx.tick());
  }
  function ht() {
    return (
      ie.setTimeout(function () {
        st = void 0;
      }),
      (st = Date.now())
    );
  }
  function gt(e, t) {
    var n,
      r = 0,
      i = { height: e };
    for (t = t ? 1 : 0; r < 4; r += 2 - t)
      i["margin" + (n = Q[r])] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i;
  }
  function vt(e, t, n) {
    for (
      var r,
        i = (yt.tweeners[t] || []).concat(yt.tweeners["*"]),
        o = 0,
        a = i.length;
      o < a;
      o++
    )
      if ((r = i[o].call(n, t, e))) return r;
  }
  function yt(o, e, t) {
    var n,
      a,
      r = 0,
      i = yt.prefilters.length,
      s = ce.Deferred().always(function () {
        delete u.elem;
      }),
      u = function () {
        if (a) return !1;
        for (
          var e = st || ht(),
            t = Math.max(0, l.startTime + l.duration - e),
            n = 1 - (t / l.duration || 0),
            r = 0,
            i = l.tweens.length;
          r < i;
          r++
        )
          l.tweens[r].run(n);
        return (
          s.notifyWith(o, [l, n, t]),
          n < 1 && i
            ? t
            : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1)
        );
      },
      l = s.promise({
        elem: o,
        props: ce.extend({}, e),
        opts: ce.extend(
          !0,
          { specialEasing: {}, easing: ce.easing._default },
          t
        ),
        originalProperties: e,
        originalOptions: t,
        startTime: st || ht(),
        duration: t.duration,
        tweens: [],
        createTween: function (e, t) {
          var n = ce.Tween(
            o,
            l.opts,
            e,
            t,
            l.opts.specialEasing[e] || l.opts.easing
          );
          return l.tweens.push(n), n;
        },
        stop: function (e) {
          var t = 0,
            n = e ? l.tweens.length : 0;
          if (a) return this;
          for (a = !0; t < n; t++) l.tweens[t].run(1);
          return (
            e
              ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e]))
              : s.rejectWith(o, [l, e]),
            this
          );
        },
      }),
      c = l.props;
    for (
      !(function (e, t) {
        var n, r, i, o, a;
        for (n in e)
          if (
            ((i = t[(r = F(n))]),
            (o = e[n]),
            Array.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
            n !== r && ((e[r] = o), delete e[n]),
            (a = ce.cssHooks[r]) && ("expand" in a))
          )
            for (n in ((o = a.expand(o)), delete e[r], o))
              (n in e) || ((e[n] = o[n]), (t[n] = i));
          else t[r] = i;
      })(c, l.opts.specialEasing);
      r < i;
      r++
    )
      if ((n = yt.prefilters[r].call(l, o, c, l.opts)))
        return (
          v(n.stop) &&
            (ce._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)),
          n
        );
    return (
      ce.map(c, vt, l),
      v(l.opts.start) && l.opts.start.call(o, l),
      l
        .progress(l.opts.progress)
        .done(l.opts.done, l.opts.complete)
        .fail(l.opts.fail)
        .always(l.opts.always),
      ce.fx.timer(ce.extend(u, { elem: o, anim: l, queue: l.opts.queue })),
      l
    );
  }
  (ce.Animation = ce.extend(yt, {
    tweeners: {
      "*": [
        function (e, t) {
          var n = this.createTween(e, t);
          return te(n.elem, e, Y.exec(t), n), n;
        },
      ],
    },
    tweener: function (e, t) {
      v(e) ? ((t = e), (e = ["*"])) : (e = e.match(D));
      for (var n, r = 0, i = e.length; r < i; r++)
        (n = e[r]),
          (yt.tweeners[n] = yt.tweeners[n] || []),
          yt.tweeners[n].unshift(t);
    },
    prefilters: [
      function (e, t, n) {
        var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = "width" in t || "height" in t,
          p = this,
          d = {},
          h = e.style,
          g = e.nodeType && ee(e),
          v = _.get(e, "fxshow");
        for (r in (n.queue ||
          (null == (a = ce._queueHooks(e, "fx")).unqueued &&
            ((a.unqueued = 0),
            (s = a.empty.fire),
            (a.empty.fire = function () {
              a.unqueued || s();
            })),
          a.unqueued++,
          p.always(function () {
            p.always(function () {
              a.unqueued--, ce.queue(e, "fx").length || a.empty.fire();
            });
          })),
        t))
          if (((i = t[r]), ft.test(i))) {
            if (
              (delete t[r],
              (o = o || "toggle" === i),
              i === (g ? "hide" : "show"))
            ) {
              if ("show" !== i || !v || void 0 === v[r]) continue;
              g = !0;
            }
            d[r] = (v && v[r]) || ce.style(e, r);
          }
        if ((u = !ce.isEmptyObject(t)) || !ce.isEmptyObject(d))
          for (r in (f &&
            1 === e.nodeType &&
            ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
            null == (l = v && v.display) && (l = _.get(e, "display")),
            "none" === (c = ce.css(e, "display")) &&
              (l
                ? (c = l)
                : (re([e], !0),
                  (l = e.style.display || l),
                  (c = ce.css(e, "display")),
                  re([e]))),
            ("inline" === c || ("inline-block" === c && null != l)) &&
              "none" === ce.css(e, "float") &&
              (u ||
                (p.done(function () {
                  h.display = l;
                }),
                null == l && ((c = h.display), (l = "none" === c ? "" : c))),
              (h.display = "inline-block"))),
          n.overflow &&
            ((h.overflow = "hidden"),
            p.always(function () {
              (h.overflow = n.overflow[0]),
                (h.overflowX = n.overflow[1]),
                (h.overflowY = n.overflow[2]);
            })),
          (u = !1),
          d))
            u ||
              (v
                ? "hidden" in v && (g = v.hidden)
                : (v = _.access(e, "fxshow", { display: l })),
              o && (v.hidden = !g),
              g && re([e], !0),
              p.done(function () {
                for (r in (g || re([e]), _.remove(e, "fxshow"), d))
                  ce.style(e, r, d[r]);
              })),
              (u = vt(g ? v[r] : 0, r, p)),
              r in v ||
                ((v[r] = u.start), g && ((u.end = u.start), (u.start = 0)));
      },
    ],
    prefilter: function (e, t) {
      t ? yt.prefilters.unshift(e) : yt.prefilters.push(e);
    },
  })),
    (ce.speed = function (e, t, n) {
      var r =
        e && "object" == typeof e
          ? ce.extend({}, e)
          : {
              complete: n || (!n && t) || (v(e) && e),
              duration: e,
              easing: (n && t) || (t && !v(t) && t),
            };
      return (
        ce.fx.off
          ? (r.duration = 0)
          : "number" != typeof r.duration &&
            (r.duration in ce.fx.speeds
              ? (r.duration = ce.fx.speeds[r.duration])
              : (r.duration = ce.fx.speeds._default)),
        (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
        (r.old = r.complete),
        (r.complete = function () {
          v(r.old) && r.old.call(this), r.queue && ce.dequeue(this, r.queue);
        }),
        r
      );
    }),
    ce.fn.extend({
      fadeTo: function (e, t, n, r) {
        return this.filter(ee)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, r);
      },
      animate: function (t, e, n, r) {
        var i = ce.isEmptyObject(t),
          o = ce.speed(e, n, r),
          a = function () {
            var e = yt(this, ce.extend({}, t), o);
            (i || _.get(this, "finish")) && e.stop(!0);
          };
        return (
          (a.finish = a),
          i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        );
      },
      stop: function (i, e, o) {
        var a = function (e) {
          var t = e.stop;
          delete e.stop, t(o);
        };
        return (
          "string" != typeof i && ((o = e), (e = i), (i = void 0)),
          e && this.queue(i || "fx", []),
          this.each(function () {
            var e = !0,
              t = null != i && i + "queueHooks",
              n = ce.timers,
              r = _.get(this);
            if (t) r[t] && r[t].stop && a(r[t]);
            else for (t in r) r[t] && r[t].stop && pt.test(t) && a(r[t]);
            for (t = n.length; t--; )
              n[t].elem !== this ||
                (null != i && n[t].queue !== i) ||
                (n[t].anim.stop(o), (e = !1), n.splice(t, 1));
            (!e && o) || ce.dequeue(this, i);
          })
        );
      },
      finish: function (a) {
        return (
          !1 !== a && (a = a || "fx"),
          this.each(function () {
            var e,
              t = _.get(this),
              n = t[a + "queue"],
              r = t[a + "queueHooks"],
              i = ce.timers,
              o = n ? n.length : 0;
            for (
              t.finish = !0,
                ce.queue(this, a, []),
                r && r.stop && r.stop.call(this, !0),
                e = i.length;
              e--;

            )
              i[e].elem === this &&
                i[e].queue === a &&
                (i[e].anim.stop(!0), i.splice(e, 1));
            for (e = 0; e < o; e++)
              n[e] && n[e].finish && n[e].finish.call(this);
            delete t.finish;
          })
        );
      },
    }),
    ce.each(["toggle", "show", "hide"], function (e, r) {
      var i = ce.fn[r];
      ce.fn[r] = function (e, t, n) {
        return null == e || "boolean" == typeof e
          ? i.apply(this, arguments)
          : this.animate(gt(r, !0), e, t, n);
      };
    }),
    ce.each(
      {
        slideDown: gt("show"),
        slideUp: gt("hide"),
        slideToggle: gt("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (e, r) {
        ce.fn[e] = function (e, t, n) {
          return this.animate(r, e, t, n);
        };
      }
    ),
    (ce.timers = []),
    (ce.fx.tick = function () {
      var e,
        t = 0,
        n = ce.timers;
      for (st = Date.now(); t < n.length; t++)
        (e = n[t])() || n[t] !== e || n.splice(t--, 1);
      n.length || ce.fx.stop(), (st = void 0);
    }),
    (ce.fx.timer = function (e) {
      ce.timers.push(e), ce.fx.start();
    }),
    (ce.fx.interval = 13),
    (ce.fx.start = function () {
      ut || ((ut = !0), dt());
    }),
    (ce.fx.stop = function () {
      ut = null;
    }),
    (ce.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (ce.fn.delay = function (r, e) {
      return (
        (r = (ce.fx && ce.fx.speeds[r]) || r),
        (e = e || "fx"),
        this.queue(e, function (e, t) {
          var n = ie.setTimeout(e, r);
          t.stop = function () {
            ie.clearTimeout(n);
          };
        })
      );
    }),
    (lt = C.createElement("input")),
    (ct = C.createElement("select").appendChild(C.createElement("option"))),
    (lt.type = "checkbox"),
    (le.checkOn = "" !== lt.value),
    (le.optSelected = ct.selected),
    ((lt = C.createElement("input")).value = "t"),
    (lt.type = "radio"),
    (le.radioValue = "t" === lt.value);
  var mt,
    xt = ce.expr.attrHandle;
  ce.fn.extend({
    attr: function (e, t) {
      return M(this, ce.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function (e) {
      return this.each(function () {
        ce.removeAttr(this, e);
      });
    },
  }),
    ce.extend({
      attr: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return "undefined" == typeof e.getAttribute
            ? ce.prop(e, t, n)
            : ((1 === o && ce.isXMLDoc(e)) ||
                (i =
                  ce.attrHooks[t.toLowerCase()] ||
                  (ce.expr.match.bool.test(t) ? mt : void 0)),
              void 0 !== n
                ? null === n
                  ? void ce.removeAttr(e, t)
                  : i && "set" in i && void 0 !== (r = i.set(e, n, t))
                  ? r
                  : (e.setAttribute(t, n + ""), n)
                : i && "get" in i && null !== (r = i.get(e, t))
                ? r
                : null == (r = ce.find.attr(e, t))
                ? void 0
                : r);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (!le.radioValue && "radio" === t && fe(e, "input")) {
              var n = e.value;
              return e.setAttribute("type", t), n && (e.value = n), t;
            }
          },
        },
      },
      removeAttr: function (e, t) {
        var n,
          r = 0,
          i = t && t.match(D);
        if (i && 1 === e.nodeType) while ((n = i[r++])) e.removeAttribute(n);
      },
    }),
    (mt = {
      set: function (e, t, n) {
        return !1 === t ? ce.removeAttr(e, n) : e.setAttribute(n, n), n;
      },
    }),
    ce.each(ce.expr.match.bool.source.match(/\w+/g), function (e, t) {
      var a = xt[t] || ce.find.attr;
      xt[t] = function (e, t, n) {
        var r,
          i,
          o = t.toLowerCase();
        return (
          n ||
            ((i = xt[o]),
            (xt[o] = r),
            (r = null != a(e, t, n) ? o : null),
            (xt[o] = i)),
          r
        );
      };
    });
  var bt = /^(?:input|select|textarea|button)$/i,
    wt = /^(?:a|area)$/i;
  function Tt(e) {
    return (e.match(D) || []).join(" ");
  }
  function Ct(e) {
    return (e.getAttribute && e.getAttribute("class")) || "";
  }
  function kt(e) {
    return Array.isArray(e) ? e : ("string" == typeof e && e.match(D)) || [];
  }
  ce.fn.extend({
    prop: function (e, t) {
      return M(this, ce.prop, e, t, 1 < arguments.length);
    },
    removeProp: function (e) {
      return this.each(function () {
        delete this[ce.propFix[e] || e];
      });
    },
  }),
    ce.extend({
      prop: function (e, t, n) {
        var r,
          i,
          o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o)
          return (
            (1 === o && ce.isXMLDoc(e)) ||
              ((t = ce.propFix[t] || t), (i = ce.propHooks[t])),
            void 0 !== n
              ? i && "set" in i && void 0 !== (r = i.set(e, n, t))
                ? r
                : (e[t] = n)
              : i && "get" in i && null !== (r = i.get(e, t))
              ? r
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = ce.find.attr(e, "tabindex");
            return t
              ? parseInt(t, 10)
              : bt.test(e.nodeName) || (wt.test(e.nodeName) && e.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    }),
    le.optSelected ||
      (ce.propHooks.selected = {
        get: function (e) {
          var t = e.parentNode;
          return t && t.parentNode && t.parentNode.selectedIndex, null;
        },
        set: function (e) {
          var t = e.parentNode;
          t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        },
      }),
    ce.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        ce.propFix[this.toLowerCase()] = this;
      }
    ),
    ce.fn.extend({
      addClass: function (t) {
        var e, n, r, i, o, a;
        return v(t)
          ? this.each(function (e) {
              ce(this).addClass(t.call(this, e, Ct(this)));
            })
          : (e = kt(t)).length
          ? this.each(function () {
              if (
                ((r = Ct(this)), (n = 1 === this.nodeType && " " + Tt(r) + " "))
              ) {
                for (o = 0; o < e.length; o++)
                  (i = e[o]), n.indexOf(" " + i + " ") < 0 && (n += i + " ");
                (a = Tt(n)), r !== a && this.setAttribute("class", a);
              }
            })
          : this;
      },
      removeClass: function (t) {
        var e, n, r, i, o, a;
        return v(t)
          ? this.each(function (e) {
              ce(this).removeClass(t.call(this, e, Ct(this)));
            })
          : arguments.length
          ? (e = kt(t)).length
            ? this.each(function () {
                if (
                  ((r = Ct(this)),
                  (n = 1 === this.nodeType && " " + Tt(r) + " "))
                ) {
                  for (o = 0; o < e.length; o++) {
                    i = e[o];
                    while (-1 < n.indexOf(" " + i + " "))
                      n = n.replace(" " + i + " ", " ");
                  }
                  (a = Tt(n)), r !== a && this.setAttribute("class", a);
                }
              })
            : this
          : this.attr("class", "");
      },
      toggleClass: function (t, n) {
        var e,
          r,
          i,
          o,
          a = typeof t,
          s = "string" === a || Array.isArray(t);
        return v(t)
          ? this.each(function (e) {
              ce(this).toggleClass(t.call(this, e, Ct(this), n), n);
            })
          : "boolean" == typeof n && s
          ? n
            ? this.addClass(t)
            : this.removeClass(t)
          : ((e = kt(t)),
            this.each(function () {
              if (s)
                for (o = ce(this), i = 0; i < e.length; i++)
                  (r = e[i]), o.hasClass(r) ? o.removeClass(r) : o.addClass(r);
              else
                (void 0 !== t && "boolean" !== a) ||
                  ((r = Ct(this)) && _.set(this, "__className__", r),
                  this.setAttribute &&
                    this.setAttribute(
                      "class",
                      r || !1 === t ? "" : _.get(this, "__className__") || ""
                    ));
            }));
      },
      hasClass: function (e) {
        var t,
          n,
          r = 0;
        t = " " + e + " ";
        while ((n = this[r++]))
          if (1 === n.nodeType && -1 < (" " + Tt(Ct(n)) + " ").indexOf(t))
            return !0;
        return !1;
      },
    });
  var St = /\r/g;
  ce.fn.extend({
    val: function (n) {
      var r,
        e,
        i,
        t = this[0];
      return arguments.length
        ? ((i = v(n)),
          this.each(function (e) {
            var t;
            1 === this.nodeType &&
              (null == (t = i ? n.call(this, e, ce(this).val()) : n)
                ? (t = "")
                : "number" == typeof t
                ? (t += "")
                : Array.isArray(t) &&
                  (t = ce.map(t, function (e) {
                    return null == e ? "" : e + "";
                  })),
              ((r =
                ce.valHooks[this.type] ||
                ce.valHooks[this.nodeName.toLowerCase()]) &&
                "set" in r &&
                void 0 !== r.set(this, t, "value")) ||
                (this.value = t));
          }))
        : t
        ? (r = ce.valHooks[t.type] || ce.valHooks[t.nodeName.toLowerCase()]) &&
          "get" in r &&
          void 0 !== (e = r.get(t, "value"))
          ? e
          : "string" == typeof (e = t.value)
          ? e.replace(St, "")
          : null == e
          ? ""
          : e
        : void 0;
    },
  }),
    ce.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = ce.find.attr(e, "value");
            return null != t ? t : Tt(ce.text(e));
          },
        },
        select: {
          get: function (e) {
            var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              a = "select-one" === e.type,
              s = a ? null : [],
              u = a ? o + 1 : i.length;
            for (r = o < 0 ? u : a ? o : 0; r < u; r++)
              if (
                ((n = i[r]).selected || r === o) &&
                !n.disabled &&
                (!n.parentNode.disabled || !fe(n.parentNode, "optgroup"))
              ) {
                if (((t = ce(n).val()), a)) return t;
                s.push(t);
              }
            return s;
          },
          set: function (e, t) {
            var n,
              r,
              i = e.options,
              o = ce.makeArray(t),
              a = i.length;
            while (a--)
              ((r = i[a]).selected =
                -1 < ce.inArray(ce.valHooks.option.get(r), o)) && (n = !0);
            return n || (e.selectedIndex = -1), o;
          },
        },
      },
    }),
    ce.each(["radio", "checkbox"], function () {
      (ce.valHooks[this] = {
        set: function (e, t) {
          if (Array.isArray(t))
            return (e.checked = -1 < ce.inArray(ce(e).val(), t));
        },
      }),
        le.checkOn ||
          (ce.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          });
    });
  var Et = ie.location,
    jt = { guid: Date.now() },
    At = /\?/;
  ce.parseXML = function (e) {
    var t, n;
    if (!e || "string" != typeof e) return null;
    try {
      t = new ie.DOMParser().parseFromString(e, "text/xml");
    } catch (e) {}
    return (
      (n = t && t.getElementsByTagName("parsererror")[0]),
      (t && !n) ||
        ce.error(
          "Invalid XML: " +
            (n
              ? ce
                  .map(n.childNodes, function (e) {
                    return e.textContent;
                  })
                  .join("\n")
              : e)
        ),
      t
    );
  };
  var Dt = /^(?:focusinfocus|focusoutblur)$/,
    Nt = function (e) {
      e.stopPropagation();
    };
  ce.extend(ce.event, {
    trigger: function (e, t, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l,
        c,
        f,
        p = [n || C],
        d = ue.call(e, "type") ? e.type : e,
        h = ue.call(e, "namespace") ? e.namespace.split(".") : [];
      if (
        ((o = f = a = n = n || C),
        3 !== n.nodeType &&
          8 !== n.nodeType &&
          !Dt.test(d + ce.event.triggered) &&
          (-1 < d.indexOf(".") && ((d = (h = d.split(".")).shift()), h.sort()),
          (u = d.indexOf(":") < 0 && "on" + d),
          ((e = e[ce.expando]
            ? e
            : new ce.Event(d, "object" == typeof e && e)).isTrigger = r
            ? 2
            : 3),
          (e.namespace = h.join(".")),
          (e.rnamespace = e.namespace
            ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (e.result = void 0),
          e.target || (e.target = n),
          (t = null == t ? [e] : ce.makeArray(t, [e])),
          (c = ce.event.special[d] || {}),
          r || !c.trigger || !1 !== c.trigger.apply(n, t)))
      ) {
        if (!r && !c.noBubble && !y(n)) {
          for (
            s = c.delegateType || d, Dt.test(s + d) || (o = o.parentNode);
            o;
            o = o.parentNode
          )
            p.push(o), (a = o);
          a === (n.ownerDocument || C) &&
            p.push(a.defaultView || a.parentWindow || ie);
        }
        i = 0;
        while ((o = p[i++]) && !e.isPropagationStopped())
          (f = o),
            (e.type = 1 < i ? s : c.bindType || d),
            (l =
              (_.get(o, "events") || Object.create(null))[e.type] &&
              _.get(o, "handle")) && l.apply(o, t),
            (l = u && o[u]) &&
              l.apply &&
              $(o) &&
              ((e.result = l.apply(o, t)),
              !1 === e.result && e.preventDefault());
        return (
          (e.type = d),
          r ||
            e.isDefaultPrevented() ||
            (c._default && !1 !== c._default.apply(p.pop(), t)) ||
            !$(n) ||
            (u &&
              v(n[d]) &&
              !y(n) &&
              ((a = n[u]) && (n[u] = null),
              (ce.event.triggered = d),
              e.isPropagationStopped() && f.addEventListener(d, Nt),
              n[d](),
              e.isPropagationStopped() && f.removeEventListener(d, Nt),
              (ce.event.triggered = void 0),
              a && (n[u] = a))),
          e.result
        );
      }
    },
    simulate: function (e, t, n) {
      var r = ce.extend(new ce.Event(), n, { type: e, isSimulated: !0 });
      ce.event.trigger(r, null, t);
    },
  }),
    ce.fn.extend({
      trigger: function (e, t) {
        return this.each(function () {
          ce.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        var n = this[0];
        if (n) return ce.event.trigger(e, t, n, !0);
      },
    });
  var qt = /\[\]$/,
    Lt = /\r?\n/g,
    Ht = /^(?:submit|button|image|reset|file)$/i,
    Ot = /^(?:input|select|textarea|keygen)/i;
  function Pt(n, e, r, i) {
    var t;
    if (Array.isArray(e))
      ce.each(e, function (e, t) {
        r || qt.test(n)
          ? i(n, t)
          : Pt(
              n + "[" + ("object" == typeof t && null != t ? e : "") + "]",
              t,
              r,
              i
            );
      });
    else if (r || "object" !== x(e)) i(n, e);
    else for (t in e) Pt(n + "[" + t + "]", e[t], r, i);
  }
  (ce.param = function (e, t) {
    var n,
      r = [],
      i = function (e, t) {
        var n = v(t) ? t() : t;
        r[r.length] =
          encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
      };
    if (null == e) return "";
    if (Array.isArray(e) || (e.jquery && !ce.isPlainObject(e)))
      ce.each(e, function () {
        i(this.name, this.value);
      });
    else for (n in e) Pt(n, e[n], t, i);
    return r.join("&");
  }),
    ce.fn.extend({
      serialize: function () {
        return ce.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var e = ce.prop(this, "elements");
          return e ? ce.makeArray(e) : this;
        })
          .filter(function () {
            var e = this.type;
            return (
              this.name &&
              !ce(this).is(":disabled") &&
              Ot.test(this.nodeName) &&
              !Ht.test(e) &&
              (this.checked || !we.test(e))
            );
          })
          .map(function (e, t) {
            var n = ce(this).val();
            return null == n
              ? null
              : Array.isArray(n)
              ? ce.map(n, function (e) {
                  return { name: t.name, value: e.replace(Lt, "\r\n") };
                })
              : { name: t.name, value: n.replace(Lt, "\r\n") };
          })
          .get();
      },
    });
  var Mt = /%20/g,
    Rt = /#.*$/,
    It = /([?&])_=[^&]*/,
    Wt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Ft = /^(?:GET|HEAD)$/,
    $t = /^\/\//,
    Bt = {},
    _t = {},
    zt = "*/".concat("*"),
    Xt = C.createElement("a");
  function Ut(o) {
    return function (e, t) {
      "string" != typeof e && ((t = e), (e = "*"));
      var n,
        r = 0,
        i = e.toLowerCase().match(D) || [];
      if (v(t))
        while ((n = i[r++]))
          "+" === n[0]
            ? ((n = n.slice(1) || "*"), (o[n] = o[n] || []).unshift(t))
            : (o[n] = o[n] || []).push(t);
    };
  }
  function Vt(t, i, o, a) {
    var s = {},
      u = t === _t;
    function l(e) {
      var r;
      return (
        (s[e] = !0),
        ce.each(t[e] || [], function (e, t) {
          var n = t(i, o, a);
          return "string" != typeof n || u || s[n]
            ? u
              ? !(r = n)
              : void 0
            : (i.dataTypes.unshift(n), l(n), !1);
        }),
        r
      );
    }
    return l(i.dataTypes[0]) || (!s["*"] && l("*"));
  }
  function Gt(e, t) {
    var n,
      r,
      i = ce.ajaxSettings.flatOptions || {};
    for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    return r && ce.extend(!0, e, r), e;
  }
  (Xt.href = Et.href),
    ce.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: Et.href,
        type: "GET",
        isLocal:
          /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
            Et.protocol
          ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": zt,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": ce.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (e, t) {
        return t ? Gt(Gt(e, ce.ajaxSettings), t) : Gt(ce.ajaxSettings, e);
      },
      ajaxPrefilter: Ut(Bt),
      ajaxTransport: Ut(_t),
      ajax: function (e, t) {
        "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
        var c,
          f,
          p,
          n,
          d,
          r,
          h,
          g,
          i,
          o,
          v = ce.ajaxSetup({}, t),
          y = v.context || v,
          m = v.context && (y.nodeType || y.jquery) ? ce(y) : ce.event,
          x = ce.Deferred(),
          b = ce.Callbacks("once memory"),
          w = v.statusCode || {},
          a = {},
          s = {},
          u = "canceled",
          T = {
            readyState: 0,
            getResponseHeader: function (e) {
              var t;
              if (h) {
                if (!n) {
                  n = {};
                  while ((t = Wt.exec(p)))
                    n[t[1].toLowerCase() + " "] = (
                      n[t[1].toLowerCase() + " "] || []
                    ).concat(t[2]);
                }
                t = n[e.toLowerCase() + " "];
              }
              return null == t ? null : t.join(", ");
            },
            getAllResponseHeaders: function () {
              return h ? p : null;
            },
            setRequestHeader: function (e, t) {
              return (
                null == h &&
                  ((e = s[e.toLowerCase()] = s[e.toLowerCase()] || e),
                  (a[e] = t)),
                this
              );
            },
            overrideMimeType: function (e) {
              return null == h && (v.mimeType = e), this;
            },
            statusCode: function (e) {
              var t;
              if (e)
                if (h) T.always(e[T.status]);
                else for (t in e) w[t] = [w[t], e[t]];
              return this;
            },
            abort: function (e) {
              var t = e || u;
              return c && c.abort(t), l(0, t), this;
            },
          };
        if (
          (x.promise(T),
          (v.url = ((e || v.url || Et.href) + "").replace(
            $t,
            Et.protocol + "//"
          )),
          (v.type = t.method || t.type || v.method || v.type),
          (v.dataTypes = (v.dataType || "*").toLowerCase().match(D) || [""]),
          null == v.crossDomain)
        ) {
          r = C.createElement("a");
          try {
            (r.href = v.url),
              (r.href = r.href),
              (v.crossDomain =
                Xt.protocol + "//" + Xt.host != r.protocol + "//" + r.host);
          } catch (e) {
            v.crossDomain = !0;
          }
        }
        if (
          (v.data &&
            v.processData &&
            "string" != typeof v.data &&
            (v.data = ce.param(v.data, v.traditional)),
          Vt(Bt, v, t, T),
          h)
        )
          return T;
        for (i in ((g = ce.event && v.global) &&
          0 == ce.active++ &&
          ce.event.trigger("ajaxStart"),
        (v.type = v.type.toUpperCase()),
        (v.hasContent = !Ft.test(v.type)),
        (f = v.url.replace(Rt, "")),
        v.hasContent
          ? v.data &&
            v.processData &&
            0 ===
              (v.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
            (v.data = v.data.replace(Mt, "+"))
          : ((o = v.url.slice(f.length)),
            v.data &&
              (v.processData || "string" == typeof v.data) &&
              ((f += (At.test(f) ? "&" : "?") + v.data), delete v.data),
            !1 === v.cache &&
              ((f = f.replace(It, "$1")),
              (o = (At.test(f) ? "&" : "?") + "_=" + jt.guid++ + o)),
            (v.url = f + o)),
        v.ifModified &&
          (ce.lastModified[f] &&
            T.setRequestHeader("If-Modified-Since", ce.lastModified[f]),
          ce.etag[f] && T.setRequestHeader("If-None-Match", ce.etag[f])),
        ((v.data && v.hasContent && !1 !== v.contentType) || t.contentType) &&
          T.setRequestHeader("Content-Type", v.contentType),
        T.setRequestHeader(
          "Accept",
          v.dataTypes[0] && v.accepts[v.dataTypes[0]]
            ? v.accepts[v.dataTypes[0]] +
                ("*" !== v.dataTypes[0] ? ", " + zt + "; q=0.01" : "")
            : v.accepts["*"]
        ),
        v.headers))
          T.setRequestHeader(i, v.headers[i]);
        if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h))
          return T.abort();
        if (
          ((u = "abort"),
          b.add(v.complete),
          T.done(v.success),
          T.fail(v.error),
          (c = Vt(_t, v, t, T)))
        ) {
          if (((T.readyState = 1), g && m.trigger("ajaxSend", [T, v]), h))
            return T;
          v.async &&
            0 < v.timeout &&
            (d = ie.setTimeout(function () {
              T.abort("timeout");
            }, v.timeout));
          try {
            (h = !1), c.send(a, l);
          } catch (e) {
            if (h) throw e;
            l(-1, e);
          }
        } else l(-1, "No Transport");
        function l(e, t, n, r) {
          var i,
            o,
            a,
            s,
            u,
            l = t;
          h ||
            ((h = !0),
            d && ie.clearTimeout(d),
            (c = void 0),
            (p = r || ""),
            (T.readyState = 0 < e ? 4 : 0),
            (i = (200 <= e && e < 300) || 304 === e),
            n &&
              (s = (function (e, t, n) {
                var r,
                  i,
                  o,
                  a,
                  s = e.contents,
                  u = e.dataTypes;
                while ("*" === u[0])
                  u.shift(),
                    void 0 === r &&
                      (r = e.mimeType || t.getResponseHeader("Content-Type"));
                if (r)
                  for (i in s)
                    if (s[i] && s[i].test(r)) {
                      u.unshift(i);
                      break;
                    }
                if (u[0] in n) o = u[0];
                else {
                  for (i in n) {
                    if (!u[0] || e.converters[i + " " + u[0]]) {
                      o = i;
                      break;
                    }
                    a || (a = i);
                  }
                  o = o || a;
                }
                if (o) return o !== u[0] && u.unshift(o), n[o];
              })(v, T, n)),
            !i &&
              -1 < ce.inArray("script", v.dataTypes) &&
              ce.inArray("json", v.dataTypes) < 0 &&
              (v.converters["text script"] = function () {}),
            (s = (function (e, t, n, r) {
              var i,
                o,
                a,
                s,
                u,
                l = {},
                c = e.dataTypes.slice();
              if (c[1])
                for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
              o = c.shift();
              while (o)
                if (
                  (e.responseFields[o] && (n[e.responseFields[o]] = t),
                  !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                  (u = o),
                  (o = c.shift()))
                )
                  if ("*" === o) o = u;
                  else if ("*" !== u && u !== o) {
                    if (!(a = l[u + " " + o] || l["* " + o]))
                      for (i in l)
                        if (
                          (s = i.split(" "))[1] === o &&
                          (a = l[u + " " + s[0]] || l["* " + s[0]])
                        ) {
                          !0 === a
                            ? (a = l[i])
                            : !0 !== l[i] && ((o = s[0]), c.unshift(s[1]));
                          break;
                        }
                    if (!0 !== a)
                      if (a && e["throws"]) t = a(t);
                      else
                        try {
                          t = a(t);
                        } catch (e) {
                          return {
                            state: "parsererror",
                            error: a
                              ? e
                              : "No conversion from " + u + " to " + o,
                          };
                        }
                  }
              return { state: "success", data: t };
            })(v, s, T, i)),
            i
              ? (v.ifModified &&
                  ((u = T.getResponseHeader("Last-Modified")) &&
                    (ce.lastModified[f] = u),
                  (u = T.getResponseHeader("etag")) && (ce.etag[f] = u)),
                204 === e || "HEAD" === v.type
                  ? (l = "nocontent")
                  : 304 === e
                  ? (l = "notmodified")
                  : ((l = s.state), (o = s.data), (i = !(a = s.error))))
              : ((a = l), (!e && l) || ((l = "error"), e < 0 && (e = 0))),
            (T.status = e),
            (T.statusText = (t || l) + ""),
            i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]),
            T.statusCode(w),
            (w = void 0),
            g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]),
            b.fireWith(y, [T, l]),
            g &&
              (m.trigger("ajaxComplete", [T, v]),
              --ce.active || ce.event.trigger("ajaxStop")));
        }
        return T;
      },
      getJSON: function (e, t, n) {
        return ce.get(e, t, n, "json");
      },
      getScript: function (e, t) {
        return ce.get(e, void 0, t, "script");
      },
    }),
    ce.each(["get", "post"], function (e, i) {
      ce[i] = function (e, t, n, r) {
        return (
          v(t) && ((r = r || n), (n = t), (t = void 0)),
          ce.ajax(
            ce.extend(
              { url: e, type: i, dataType: r, data: t, success: n },
              ce.isPlainObject(e) && e
            )
          )
        );
      };
    }),
    ce.ajaxPrefilter(function (e) {
      var t;
      for (t in e.headers)
        "content-type" === t.toLowerCase() &&
          (e.contentType = e.headers[t] || "");
    }),
    (ce._evalUrl = function (e, t, n) {
      return ce.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        converters: { "text script": function () {} },
        dataFilter: function (e) {
          ce.globalEval(e, t, n);
        },
      });
    }),
    ce.fn.extend({
      wrapAll: function (e) {
        var t;
        return (
          this[0] &&
            (v(e) && (e = e.call(this[0])),
            (t = ce(e, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (n) {
        return v(n)
          ? this.each(function (e) {
              ce(this).wrapInner(n.call(this, e));
            })
          : this.each(function () {
              var e = ce(this),
                t = e.contents();
              t.length ? t.wrapAll(n) : e.append(n);
            });
      },
      wrap: function (t) {
        var n = v(t);
        return this.each(function (e) {
          ce(this).wrapAll(n ? t.call(this, e) : t);
        });
      },
      unwrap: function (e) {
        return (
          this.parent(e)
            .not("body")
            .each(function () {
              ce(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    }),
    (ce.expr.pseudos.hidden = function (e) {
      return !ce.expr.pseudos.visible(e);
    }),
    (ce.expr.pseudos.visible = function (e) {
      return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }),
    (ce.ajaxSettings.xhr = function () {
      try {
        return new ie.XMLHttpRequest();
      } catch (e) {}
    });
  var Yt = { 0: 200, 1223: 204 },
    Qt = ce.ajaxSettings.xhr();
  (le.cors = !!Qt && "withCredentials" in Qt),
    (le.ajax = Qt = !!Qt),
    ce.ajaxTransport(function (i) {
      var o, a;
      if (le.cors || (Qt && !i.crossDomain))
        return {
          send: function (e, t) {
            var n,
              r = i.xhr();
            if (
              (r.open(i.type, i.url, i.async, i.username, i.password),
              i.xhrFields)
            )
              for (n in i.xhrFields) r[n] = i.xhrFields[n];
            for (n in (i.mimeType &&
              r.overrideMimeType &&
              r.overrideMimeType(i.mimeType),
            i.crossDomain ||
              e["X-Requested-With"] ||
              (e["X-Requested-With"] = "XMLHttpRequest"),
            e))
              r.setRequestHeader(n, e[n]);
            (o = function (e) {
              return function () {
                o &&
                  ((o =
                    a =
                    r.onload =
                    r.onerror =
                    r.onabort =
                    r.ontimeout =
                    r.onreadystatechange =
                      null),
                  "abort" === e
                    ? r.abort()
                    : "error" === e
                    ? "number" != typeof r.status
                      ? t(0, "error")
                      : t(r.status, r.statusText)
                    : t(
                        Yt[r.status] || r.status,
                        r.statusText,
                        "text" !== (r.responseType || "text") ||
                          "string" != typeof r.responseText
                          ? { binary: r.response }
                          : { text: r.responseText },
                        r.getAllResponseHeaders()
                      ));
              };
            }),
              (r.onload = o()),
              (a = r.onerror = r.ontimeout = o("error")),
              void 0 !== r.onabort
                ? (r.onabort = a)
                : (r.onreadystatechange = function () {
                    4 === r.readyState &&
                      ie.setTimeout(function () {
                        o && a();
                      });
                  }),
              (o = o("abort"));
            try {
              r.send((i.hasContent && i.data) || null);
            } catch (e) {
              if (o) throw e;
            }
          },
          abort: function () {
            o && o();
          },
        };
    }),
    ce.ajaxPrefilter(function (e) {
      e.crossDomain && (e.contents.script = !1);
    }),
    ce.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (e) {
          return ce.globalEval(e), e;
        },
      },
    }),
    ce.ajaxPrefilter("script", function (e) {
      void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }),
    ce.ajaxTransport("script", function (n) {
      var r, i;
      if (n.crossDomain || n.scriptAttrs)
        return {
          send: function (e, t) {
            (r = ce("<script>")
              .attr(n.scriptAttrs || {})
              .prop({ charset: n.scriptCharset, src: n.url })
              .on(
                "load error",
                (i = function (e) {
                  r.remove(),
                    (i = null),
                    e && t("error" === e.type ? 404 : 200, e.type);
                })
              )),
              C.head.appendChild(r[0]);
          },
          abort: function () {
            i && i();
          },
        };
    });
  var Jt,
    Kt = [],
    Zt = /(=)\?(?=&|$)|\?\?/;
  ce.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = Kt.pop() || ce.expando + "_" + jt.guid++;
      return (this[e] = !0), e;
    },
  }),
    ce.ajaxPrefilter("json jsonp", function (e, t, n) {
      var r,
        i,
        o,
        a =
          !1 !== e.jsonp &&
          (Zt.test(e.url)
            ? "url"
            : "string" == typeof e.data &&
              0 ===
                (e.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              Zt.test(e.data) &&
              "data");
      if (a || "jsonp" === e.dataTypes[0])
        return (
          (r = e.jsonpCallback =
            v(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
          a
            ? (e[a] = e[a].replace(Zt, "$1" + r))
            : !1 !== e.jsonp &&
              (e.url += (At.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
          (e.converters["script json"] = function () {
            return o || ce.error(r + " was not called"), o[0];
          }),
          (e.dataTypes[0] = "json"),
          (i = ie[r]),
          (ie[r] = function () {
            o = arguments;
          }),
          n.always(function () {
            void 0 === i ? ce(ie).removeProp(r) : (ie[r] = i),
              e[r] && ((e.jsonpCallback = t.jsonpCallback), Kt.push(r)),
              o && v(i) && i(o[0]),
              (o = i = void 0);
          }),
          "script"
        );
    }),
    (le.createHTMLDocument =
      (((Jt = C.implementation.createHTMLDocument("").body).innerHTML =
        "<form></form><form></form>"),
      2 === Jt.childNodes.length)),
    (ce.parseHTML = function (e, t, n) {
      return "string" != typeof e
        ? []
        : ("boolean" == typeof t && ((n = t), (t = !1)),
          t ||
            (le.createHTMLDocument
              ? (((r = (t =
                  C.implementation.createHTMLDocument("")).createElement(
                  "base"
                )).href = C.location.href),
                t.head.appendChild(r))
              : (t = C)),
          (o = !n && []),
          (i = w.exec(e))
            ? [t.createElement(i[1])]
            : ((i = Ae([e], t, o)),
              o && o.length && ce(o).remove(),
              ce.merge([], i.childNodes)));
      var r, i, o;
    }),
    (ce.fn.load = function (e, t, n) {
      var r,
        i,
        o,
        a = this,
        s = e.indexOf(" ");
      return (
        -1 < s && ((r = Tt(e.slice(s))), (e = e.slice(0, s))),
        v(t)
          ? ((n = t), (t = void 0))
          : t && "object" == typeof t && (i = "POST"),
        0 < a.length &&
          ce
            .ajax({ url: e, type: i || "GET", dataType: "html", data: t })
            .done(function (e) {
              (o = arguments),
                a.html(r ? ce("<div>").append(ce.parseHTML(e)).find(r) : e);
            })
            .always(
              n &&
                function (e, t) {
                  a.each(function () {
                    n.apply(this, o || [e.responseText, t, e]);
                  });
                }
            ),
        this
      );
    }),
    (ce.expr.pseudos.animated = function (t) {
      return ce.grep(ce.timers, function (e) {
        return t === e.elem;
      }).length;
    }),
    (ce.offset = {
      setOffset: function (e, t, n) {
        var r,
          i,
          o,
          a,
          s,
          u,
          l = ce.css(e, "position"),
          c = ce(e),
          f = {};
        "static" === l && (e.style.position = "relative"),
          (s = c.offset()),
          (o = ce.css(e, "top")),
          (u = ce.css(e, "left")),
          ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto")
            ? ((a = (r = c.position()).top), (i = r.left))
            : ((a = parseFloat(o) || 0), (i = parseFloat(u) || 0)),
          v(t) && (t = t.call(e, n, ce.extend({}, s))),
          null != t.top && (f.top = t.top - s.top + a),
          null != t.left && (f.left = t.left - s.left + i),
          "using" in t ? t.using.call(e, f) : c.css(f);
      },
    }),
    ce.fn.extend({
      offset: function (t) {
        if (arguments.length)
          return void 0 === t
            ? this
            : this.each(function (e) {
                ce.offset.setOffset(this, t, e);
              });
        var e,
          n,
          r = this[0];
        return r
          ? r.getClientRects().length
            ? ((e = r.getBoundingClientRect()),
              (n = r.ownerDocument.defaultView),
              { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
            : { top: 0, left: 0 }
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var e,
            t,
            n,
            r = this[0],
            i = { top: 0, left: 0 };
          if ("fixed" === ce.css(r, "position")) t = r.getBoundingClientRect();
          else {
            (t = this.offset()),
              (n = r.ownerDocument),
              (e = r.offsetParent || n.documentElement);
            while (
              e &&
              (e === n.body || e === n.documentElement) &&
              "static" === ce.css(e, "position")
            )
              e = e.parentNode;
            e &&
              e !== r &&
              1 === e.nodeType &&
              (((i = ce(e).offset()).top += ce.css(e, "borderTopWidth", !0)),
              (i.left += ce.css(e, "borderLeftWidth", !0)));
          }
          return {
            top: t.top - i.top - ce.css(r, "marginTop", !0),
            left: t.left - i.left - ce.css(r, "marginLeft", !0),
          };
        }
      },
      offsetParent: function () {
        return this.map(function () {
          var e = this.offsetParent;
          while (e && "static" === ce.css(e, "position")) e = e.offsetParent;
          return e || J;
        });
      },
    }),
    ce.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (t, i) {
        var o = "pageYOffset" === i;
        ce.fn[t] = function (e) {
          return M(
            this,
            function (e, t, n) {
              var r;
              if (
                (y(e) ? (r = e) : 9 === e.nodeType && (r = e.defaultView),
                void 0 === n)
              )
                return r ? r[i] : e[t];
              r
                ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset)
                : (e[t] = n);
            },
            t,
            e,
            arguments.length
          );
        };
      }
    ),
    ce.each(["top", "left"], function (e, n) {
      ce.cssHooks[n] = Ye(le.pixelPosition, function (e, t) {
        if (t)
          return (t = Ge(e, n)), _e.test(t) ? ce(e).position()[n] + "px" : t;
      });
    }),
    ce.each({ Height: "height", Width: "width" }, function (a, s) {
      ce.each(
        { padding: "inner" + a, content: s, "": "outer" + a },
        function (r, o) {
          ce.fn[o] = function (e, t) {
            var n = arguments.length && (r || "boolean" != typeof e),
              i = r || (!0 === e || !0 === t ? "margin" : "border");
            return M(
              this,
              function (e, t, n) {
                var r;
                return y(e)
                  ? 0 === o.indexOf("outer")
                    ? e["inner" + a]
                    : e.document.documentElement["client" + a]
                  : 9 === e.nodeType
                  ? ((r = e.documentElement),
                    Math.max(
                      e.body["scroll" + a],
                      r["scroll" + a],
                      e.body["offset" + a],
                      r["offset" + a],
                      r["client" + a]
                    ))
                  : void 0 === n
                  ? ce.css(e, t, i)
                  : ce.style(e, t, n, i);
              },
              s,
              n ? e : void 0,
              n
            );
          };
        }
      );
    }),
    ce.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        ce.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    ce.fn.extend({
      bind: function (e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, n, r) {
        return this.on(t, e, n, r);
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", n);
      },
      hover: function (e, t) {
        return this.on("mouseenter", e).on("mouseleave", t || e);
      },
    }),
    ce.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
        " "
      ),
      function (e, n) {
        ce.fn[n] = function (e, t) {
          return 0 < arguments.length
            ? this.on(n, null, e, t)
            : this.trigger(n);
        };
      }
    );
  var en = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
  (ce.proxy = function (e, t) {
    var n, r, i;
    if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), v(e)))
      return (
        (r = ae.call(arguments, 2)),
        ((i = function () {
          return e.apply(t || this, r.concat(ae.call(arguments)));
        }).guid = e.guid =
          e.guid || ce.guid++),
        i
      );
  }),
    (ce.holdReady = function (e) {
      e ? ce.readyWait++ : ce.ready(!0);
    }),
    (ce.isArray = Array.isArray),
    (ce.parseJSON = JSON.parse),
    (ce.nodeName = fe),
    (ce.isFunction = v),
    (ce.isWindow = y),
    (ce.camelCase = F),
    (ce.type = x),
    (ce.now = Date.now),
    (ce.isNumeric = function (e) {
      var t = ce.type(e);
      return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
    }),
    (ce.trim = function (e) {
      return null == e ? "" : (e + "").replace(en, "$1");
    }),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return ce;
      });
  var tn = ie.jQuery,
    nn = ie.$;
  return (
    (ce.noConflict = function (e) {
      return (
        ie.$ === ce && (ie.$ = nn),
        e && ie.jQuery === ce && (ie.jQuery = tn),
        ce
      );
    }),
    "undefined" == typeof e && (ie.jQuery = ie.$ = ce),
    ce
  );
});
/*! jQuery UI - v1.12.1 - 2016-09-14
 * http://jqueryui.com
 * Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (t) {
  function e(t) {
    for (var e = t.css("visibility"); "inherit" === e; )
      (t = t.parent()), (e = t.css("visibility"));
    return "hidden" !== e;
  }
  function i(t) {
    for (var e, i; t.length && t[0] !== document; ) {
      if (
        ((e = t.css("position")),
        ("absolute" === e || "relative" === e || "fixed" === e) &&
          ((i = parseInt(t.css("zIndex"), 10)), !isNaN(i) && 0 !== i))
      )
        return i;
      t = t.parent();
    }
    return 0;
  }
  function s() {
    (this._curInst = null),
      (this._keyEvent = !1),
      (this._disabledInputs = []),
      (this._datepickerShowing = !1),
      (this._inDialog = !1),
      (this._mainDivId = "ui-datepicker-div"),
      (this._inlineClass = "ui-datepicker-inline"),
      (this._appendClass = "ui-datepicker-append"),
      (this._triggerClass = "ui-datepicker-trigger"),
      (this._dialogClass = "ui-datepicker-dialog"),
      (this._disableClass = "ui-datepicker-disabled"),
      (this._unselectableClass = "ui-datepicker-unselectable"),
      (this._currentClass = "ui-datepicker-current-day"),
      (this._dayOverClass = "ui-datepicker-days-cell-over"),
      (this.regional = []),
      (this.regional[""] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        monthNamesShort: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        dayNames: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "mm/dd/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: "",
      }),
      (this._defaults = {
        showOn: "focus",
        showAnim: "fadeIn",
        showOptions: {},
        defaultDate: null,
        appendText: "",
        buttonText: "...",
        buttonImage: "",
        buttonImageOnly: !1,
        hideIfNoPrevNext: !1,
        navigationAsDateFormat: !1,
        gotoCurrent: !1,
        changeMonth: !1,
        changeYear: !1,
        yearRange: "c-10:c+10",
        showOtherMonths: !1,
        selectOtherMonths: !1,
        showWeek: !1,
        calculateWeek: this.iso8601Week,
        shortYearCutoff: "+10",
        minDate: null,
        maxDate: null,
        duration: "fast",
        beforeShowDay: null,
        beforeShow: null,
        onSelect: null,
        onChangeMonthYear: null,
        onClose: null,
        numberOfMonths: 1,
        showCurrentAtPos: 0,
        stepMonths: 1,
        stepBigMonths: 12,
        altField: "",
        altFormat: "",
        constrainInput: !0,
        showButtonPanel: !1,
        autoSize: !1,
        disabled: !1,
      }),
      t.extend(this._defaults, this.regional[""]),
      (this.regional.en = t.extend(!0, {}, this.regional[""])),
      (this.regional["en-US"] = t.extend(!0, {}, this.regional.en)),
      (this.dpDiv = n(
        t(
          "<div id='" +
            this._mainDivId +
            "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
        )
      ));
  }
  function n(e) {
    var i =
      "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return e
      .on("mouseout", i, function () {
        t(this).removeClass("ui-state-hover"),
          -1 !== this.className.indexOf("ui-datepicker-prev") &&
            t(this).removeClass("ui-datepicker-prev-hover"),
          -1 !== this.className.indexOf("ui-datepicker-next") &&
            t(this).removeClass("ui-datepicker-next-hover");
      })
      .on("mouseover", i, o);
  }
  function o() {
    t.datepicker._isDisabledDatepicker(
      m.inline ? m.dpDiv.parent()[0] : m.input[0]
    ) ||
      (t(this)
        .parents(".ui-datepicker-calendar")
        .find("a")
        .removeClass("ui-state-hover"),
      t(this).addClass("ui-state-hover"),
      -1 !== this.className.indexOf("ui-datepicker-prev") &&
        t(this).addClass("ui-datepicker-prev-hover"),
      -1 !== this.className.indexOf("ui-datepicker-next") &&
        t(this).addClass("ui-datepicker-next-hover"));
  }
  function a(e, i) {
    t.extend(e, i);
    for (var s in i) null == i[s] && (e[s] = i[s]);
    return e;
  }
  function r(t) {
    return function () {
      var e = this.element.val();
      t.apply(this, arguments),
        this._refresh(),
        e !== this.element.val() && this._trigger("change");
    };
  }
  (t.ui = t.ui || {}), (t.ui.version = "1.12.1");
  var h = 0,
    l = Array.prototype.slice;
  (t.cleanData = (function (e) {
    return function (i) {
      var s, n, o;
      for (o = 0; null != (n = i[o]); o++)
        try {
          (s = t._data(n, "events")),
            s && s.remove && t(n).triggerHandler("remove");
        } catch (a) {}
      e(i);
    };
  })(t.cleanData)),
    (t.widget = function (e, i, s) {
      var n,
        o,
        a,
        r = {},
        h = e.split(".")[0];
      e = e.split(".")[1];
      var l = h + "-" + e;
      return (
        s || ((s = i), (i = t.Widget)),
        t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))),
        (t.expr[":"][l.toLowerCase()] = function (e) {
          return !!t.data(e, l);
        }),
        (t[h] = t[h] || {}),
        (n = t[h][e]),
        (o = t[h][e] =
          function (t, e) {
            return this._createWidget
              ? (arguments.length && this._createWidget(t, e), void 0)
              : new o(t, e);
          }),
        t.extend(o, n, {
          version: s.version,
          _proto: t.extend({}, s),
          _childConstructors: [],
        }),
        (a = new i()),
        (a.options = t.widget.extend({}, a.options)),
        t.each(s, function (e, s) {
          return t.isFunction(s)
            ? ((r[e] = (function () {
                function t() {
                  return i.prototype[e].apply(this, arguments);
                }
                function n(t) {
                  return i.prototype[e].apply(this, t);
                }
                return function () {
                  var e,
                    i = this._super,
                    o = this._superApply;
                  return (
                    (this._super = t),
                    (this._superApply = n),
                    (e = s.apply(this, arguments)),
                    (this._super = i),
                    (this._superApply = o),
                    e
                  );
                };
              })()),
              void 0)
            : ((r[e] = s), void 0);
        }),
        (o.prototype = t.widget.extend(
          a,
          { widgetEventPrefix: n ? a.widgetEventPrefix || e : e },
          r,
          { constructor: o, namespace: h, widgetName: e, widgetFullName: l }
        )),
        n
          ? (t.each(n._childConstructors, function (e, i) {
              var s = i.prototype;
              t.widget(s.namespace + "." + s.widgetName, o, i._proto);
            }),
            delete n._childConstructors)
          : i._childConstructors.push(o),
        t.widget.bridge(e, o),
        o
      );
    }),
    (t.widget.extend = function (e) {
      for (var i, s, n = l.call(arguments, 1), o = 0, a = n.length; a > o; o++)
        for (i in n[o])
          (s = n[o][i]),
            n[o].hasOwnProperty(i) &&
              void 0 !== s &&
              (e[i] = t.isPlainObject(s)
                ? t.isPlainObject(e[i])
                  ? t.widget.extend({}, e[i], s)
                  : t.widget.extend({}, s)
                : s);
      return e;
    }),
    (t.widget.bridge = function (e, i) {
      var s = i.prototype.widgetFullName || e;
      t.fn[e] = function (n) {
        var o = "string" == typeof n,
          a = l.call(arguments, 1),
          r = this;
        return (
          o
            ? this.length || "instance" !== n
              ? this.each(function () {
                  var i,
                    o = t.data(this, s);
                  return "instance" === n
                    ? ((r = o), !1)
                    : o
                    ? t.isFunction(o[n]) && "_" !== n.charAt(0)
                      ? ((i = o[n].apply(o, a)),
                        i !== o && void 0 !== i
                          ? ((r = i && i.jquery ? r.pushStack(i.get()) : i), !1)
                          : void 0)
                      : t.error(
                          "no such method '" +
                            n +
                            "' for " +
                            e +
                            " widget instance"
                        )
                    : t.error(
                        "cannot call methods on " +
                          e +
                          " prior to initialization; " +
                          "attempted to call method '" +
                          n +
                          "'"
                      );
                })
              : (r = void 0)
            : (a.length && (n = t.widget.extend.apply(null, [n].concat(a))),
              this.each(function () {
                var e = t.data(this, s);
                e
                  ? (e.option(n || {}), e._init && e._init())
                  : t.data(this, s, new i(n, this));
              })),
          r
        );
      };
    }),
    (t.Widget = function () {}),
    (t.Widget._childConstructors = []),
    (t.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { classes: {}, disabled: !1, create: null },
      _createWidget: function (e, i) {
        (i = t(i || this.defaultElement || this)[0]),
          (this.element = t(i)),
          (this.uuid = h++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.bindings = t()),
          (this.hoverable = t()),
          (this.focusable = t()),
          (this.classesElementLookup = {}),
          i !== this &&
            (t.data(i, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (t) {
                t.target === i && this.destroy();
              },
            }),
            (this.document = t(i.style ? i.ownerDocument : i.document || i)),
            (this.window = t(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          (this.options = t.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            e
          )),
          this._create(),
          this.options.disabled &&
            this._setOptionDisabled(this.options.disabled),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: function () {
        return {};
      },
      _getCreateEventData: t.noop,
      _create: t.noop,
      _init: t.noop,
      destroy: function () {
        var e = this;
        this._destroy(),
          t.each(this.classesElementLookup, function (t, i) {
            e._removeClass(i, t);
          }),
          this.element.off(this.eventNamespace).removeData(this.widgetFullName),
          this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
          this.bindings.off(this.eventNamespace);
      },
      _destroy: t.noop,
      widget: function () {
        return this.element;
      },
      option: function (e, i) {
        var s,
          n,
          o,
          a = e;
        if (0 === arguments.length) return t.widget.extend({}, this.options);
        if ("string" == typeof e)
          if (((a = {}), (s = e.split(".")), (e = s.shift()), s.length)) {
            for (
              n = a[e] = t.widget.extend({}, this.options[e]), o = 0;
              s.length - 1 > o;
              o++
            )
              (n[s[o]] = n[s[o]] || {}), (n = n[s[o]]);
            if (((e = s.pop()), 1 === arguments.length))
              return void 0 === n[e] ? null : n[e];
            n[e] = i;
          } else {
            if (1 === arguments.length)
              return void 0 === this.options[e] ? null : this.options[e];
            a[e] = i;
          }
        return this._setOptions(a), this;
      },
      _setOptions: function (t) {
        var e;
        for (e in t) this._setOption(e, t[e]);
        return this;
      },
      _setOption: function (t, e) {
        return (
          "classes" === t && this._setOptionClasses(e),
          (this.options[t] = e),
          "disabled" === t && this._setOptionDisabled(e),
          this
        );
      },
      _setOptionClasses: function (e) {
        var i, s, n;
        for (i in e)
          (n = this.classesElementLookup[i]),
            e[i] !== this.options.classes[i] &&
              n &&
              n.length &&
              ((s = t(n.get())),
              this._removeClass(n, i),
              s.addClass(
                this._classes({ element: s, keys: i, classes: e, add: !0 })
              ));
      },
      _setOptionDisabled: function (t) {
        this._toggleClass(
          this.widget(),
          this.widgetFullName + "-disabled",
          null,
          !!t
        ),
          t &&
            (this._removeClass(this.hoverable, null, "ui-state-hover"),
            this._removeClass(this.focusable, null, "ui-state-focus"));
      },
      enable: function () {
        return this._setOptions({ disabled: !1 });
      },
      disable: function () {
        return this._setOptions({ disabled: !0 });
      },
      _classes: function (e) {
        function i(i, o) {
          var a, r;
          for (r = 0; i.length > r; r++)
            (a = n.classesElementLookup[i[r]] || t()),
              (a = e.add
                ? t(t.unique(a.get().concat(e.element.get())))
                : t(a.not(e.element).get())),
              (n.classesElementLookup[i[r]] = a),
              s.push(i[r]),
              o && e.classes[i[r]] && s.push(e.classes[i[r]]);
        }
        var s = [],
          n = this;
        return (
          (e = t.extend(
            { element: this.element, classes: this.options.classes || {} },
            e
          )),
          this._on(e.element, { remove: "_untrackClassesElement" }),
          e.keys && i(e.keys.match(/\S+/g) || [], !0),
          e.extra && i(e.extra.match(/\S+/g) || []),
          s.join(" ")
        );
      },
      _untrackClassesElement: function (e) {
        var i = this;
        t.each(i.classesElementLookup, function (s, n) {
          -1 !== t.inArray(e.target, n) &&
            (i.classesElementLookup[s] = t(n.not(e.target).get()));
        });
      },
      _removeClass: function (t, e, i) {
        return this._toggleClass(t, e, i, !1);
      },
      _addClass: function (t, e, i) {
        return this._toggleClass(t, e, i, !0);
      },
      _toggleClass: function (t, e, i, s) {
        s = "boolean" == typeof s ? s : i;
        var n = "string" == typeof t || null === t,
          o = {
            extra: n ? e : i,
            keys: n ? t : e,
            element: n ? this.element : t,
            add: s,
          };
        return o.element.toggleClass(this._classes(o), s), this;
      },
      _on: function (e, i, s) {
        var n,
          o = this;
        "boolean" != typeof e && ((s = i), (i = e), (e = !1)),
          s
            ? ((i = n = t(i)), (this.bindings = this.bindings.add(i)))
            : ((s = i), (i = this.element), (n = this.widget())),
          t.each(s, function (s, a) {
            function r() {
              return e ||
                (o.options.disabled !== !0 &&
                  !t(this).hasClass("ui-state-disabled"))
                ? ("string" == typeof a ? o[a] : a).apply(o, arguments)
                : void 0;
            }
            "string" != typeof a &&
              (r.guid = a.guid = a.guid || r.guid || t.guid++);
            var h = s.match(/^([\w:-]*)\s*(.*)$/),
              l = h[1] + o.eventNamespace,
              c = h[2];
            c ? n.on(l, c, r) : i.on(l, r);
          });
      },
      _off: function (e, i) {
        (i =
          (i || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          e.off(i).off(i),
          (this.bindings = t(this.bindings.not(e).get())),
          (this.focusable = t(this.focusable.not(e).get())),
          (this.hoverable = t(this.hoverable.not(e).get()));
      },
      _delay: function (t, e) {
        function i() {
          return ("string" == typeof t ? s[t] : t).apply(s, arguments);
        }
        var s = this;
        return setTimeout(i, e || 0);
      },
      _hoverable: function (e) {
        (this.hoverable = this.hoverable.add(e)),
          this._on(e, {
            mouseenter: function (e) {
              this._addClass(t(e.currentTarget), null, "ui-state-hover");
            },
            mouseleave: function (e) {
              this._removeClass(t(e.currentTarget), null, "ui-state-hover");
            },
          });
      },
      _focusable: function (e) {
        (this.focusable = this.focusable.add(e)),
          this._on(e, {
            focusin: function (e) {
              this._addClass(t(e.currentTarget), null, "ui-state-focus");
            },
            focusout: function (e) {
              this._removeClass(t(e.currentTarget), null, "ui-state-focus");
            },
          });
      },
      _trigger: function (e, i, s) {
        var n,
          o,
          a = this.options[e];
        if (
          ((s = s || {}),
          (i = t.Event(i)),
          (i.type = (
            e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e
          ).toLowerCase()),
          (i.target = this.element[0]),
          (o = i.originalEvent))
        )
          for (n in o) n in i || (i[n] = o[n]);
        return (
          this.element.trigger(i, s),
          !(
            (t.isFunction(a) &&
              a.apply(this.element[0], [i].concat(s)) === !1) ||
            i.isDefaultPrevented()
          )
        );
      },
    }),
    t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
      t.Widget.prototype["_" + e] = function (s, n, o) {
        "string" == typeof n && (n = { effect: n });
        var a,
          r = n ? (n === !0 || "number" == typeof n ? i : n.effect || i) : e;
        (n = n || {}),
          "number" == typeof n && (n = { duration: n }),
          (a = !t.isEmptyObject(n)),
          (n.complete = o),
          n.delay && s.delay(n.delay),
          a && t.effects && t.effects.effect[r]
            ? s[e](n)
            : r !== e && s[r]
            ? s[r](n.duration, n.easing, o)
            : s.queue(function (i) {
                t(this)[e](), o && o.call(s[0]), i();
              });
      };
    }),
    t.widget,
    (function () {
      function e(t, e, i) {
        return [
          parseFloat(t[0]) * (u.test(t[0]) ? e / 100 : 1),
          parseFloat(t[1]) * (u.test(t[1]) ? i / 100 : 1),
        ];
      }
      function i(e, i) {
        return parseInt(t.css(e, i), 10) || 0;
      }
      function s(e) {
        var i = e[0];
        return 9 === i.nodeType
          ? {
              width: e.width(),
              height: e.height(),
              offset: { top: 0, left: 0 },
            }
          : t.isWindow(i)
          ? {
              width: e.width(),
              height: e.height(),
              offset: { top: e.scrollTop(), left: e.scrollLeft() },
            }
          : i.preventDefault
          ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } }
          : {
              width: e.outerWidth(),
              height: e.outerHeight(),
              offset: e.offset(),
            };
      }
      var n,
        o = Math.max,
        a = Math.abs,
        r = /left|center|right/,
        h = /top|center|bottom/,
        l = /[\+\-]\d+(\.[\d]+)?%?/,
        c = /^\w+/,
        u = /%$/,
        d = t.fn.position;
      (t.position = {
        scrollbarWidth: function () {
          if (void 0 !== n) return n;
          var e,
            i,
            s = t(
              "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
            ),
            o = s.children()[0];
          return (
            t("body").append(s),
            (e = o.offsetWidth),
            s.css("overflow", "scroll"),
            (i = o.offsetWidth),
            e === i && (i = s[0].clientWidth),
            s.remove(),
            (n = e - i)
          );
        },
        getScrollInfo: function (e) {
          var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
            s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
            n =
              "scroll" === i ||
              ("auto" === i && e.width < e.element[0].scrollWidth),
            o =
              "scroll" === s ||
              ("auto" === s && e.height < e.element[0].scrollHeight);
          return {
            width: o ? t.position.scrollbarWidth() : 0,
            height: n ? t.position.scrollbarWidth() : 0,
          };
        },
        getWithinInfo: function (e) {
          var i = t(e || window),
            s = t.isWindow(i[0]),
            n = !!i[0] && 9 === i[0].nodeType,
            o = !s && !n;
          return {
            element: i,
            isWindow: s,
            isDocument: n,
            offset: o ? t(e).offset() : { left: 0, top: 0 },
            scrollLeft: i.scrollLeft(),
            scrollTop: i.scrollTop(),
            width: i.outerWidth(),
            height: i.outerHeight(),
          };
        },
      }),
        (t.fn.position = function (n) {
          if (!n || !n.of) return d.apply(this, arguments);
          n = t.extend({}, n);
          var u,
            p,
            f,
            g,
            m,
            _,
            v = t(n.of),
            b = t.position.getWithinInfo(n.within),
            y = t.position.getScrollInfo(b),
            w = (n.collision || "flip").split(" "),
            k = {};
          return (
            (_ = s(v)),
            v[0].preventDefault && (n.at = "left top"),
            (p = _.width),
            (f = _.height),
            (g = _.offset),
            (m = t.extend({}, g)),
            t.each(["my", "at"], function () {
              var t,
                e,
                i = (n[this] || "").split(" ");
              1 === i.length &&
                (i = r.test(i[0])
                  ? i.concat(["center"])
                  : h.test(i[0])
                  ? ["center"].concat(i)
                  : ["center", "center"]),
                (i[0] = r.test(i[0]) ? i[0] : "center"),
                (i[1] = h.test(i[1]) ? i[1] : "center"),
                (t = l.exec(i[0])),
                (e = l.exec(i[1])),
                (k[this] = [t ? t[0] : 0, e ? e[0] : 0]),
                (n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]);
            }),
            1 === w.length && (w[1] = w[0]),
            "right" === n.at[0]
              ? (m.left += p)
              : "center" === n.at[0] && (m.left += p / 2),
            "bottom" === n.at[1]
              ? (m.top += f)
              : "center" === n.at[1] && (m.top += f / 2),
            (u = e(k.at, p, f)),
            (m.left += u[0]),
            (m.top += u[1]),
            this.each(function () {
              var s,
                r,
                h = t(this),
                l = h.outerWidth(),
                c = h.outerHeight(),
                d = i(this, "marginLeft"),
                _ = i(this, "marginTop"),
                x = l + d + i(this, "marginRight") + y.width,
                C = c + _ + i(this, "marginBottom") + y.height,
                D = t.extend({}, m),
                I = e(k.my, h.outerWidth(), h.outerHeight());
              "right" === n.my[0]
                ? (D.left -= l)
                : "center" === n.my[0] && (D.left -= l / 2),
                "bottom" === n.my[1]
                  ? (D.top -= c)
                  : "center" === n.my[1] && (D.top -= c / 2),
                (D.left += I[0]),
                (D.top += I[1]),
                (s = { marginLeft: d, marginTop: _ }),
                t.each(["left", "top"], function (e, i) {
                  t.ui.position[w[e]] &&
                    t.ui.position[w[e]][i](D, {
                      targetWidth: p,
                      targetHeight: f,
                      elemWidth: l,
                      elemHeight: c,
                      collisionPosition: s,
                      collisionWidth: x,
                      collisionHeight: C,
                      offset: [u[0] + I[0], u[1] + I[1]],
                      my: n.my,
                      at: n.at,
                      within: b,
                      elem: h,
                    });
                }),
                n.using &&
                  (r = function (t) {
                    var e = g.left - D.left,
                      i = e + p - l,
                      s = g.top - D.top,
                      r = s + f - c,
                      u = {
                        target: {
                          element: v,
                          left: g.left,
                          top: g.top,
                          width: p,
                          height: f,
                        },
                        element: {
                          element: h,
                          left: D.left,
                          top: D.top,
                          width: l,
                          height: c,
                        },
                        horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
                        vertical: 0 > r ? "top" : s > 0 ? "bottom" : "middle",
                      };
                    l > p && p > a(e + i) && (u.horizontal = "center"),
                      c > f && f > a(s + r) && (u.vertical = "middle"),
                      (u.important =
                        o(a(e), a(i)) > o(a(s), a(r))
                          ? "horizontal"
                          : "vertical"),
                      n.using.call(this, t, u);
                  }),
                h.offset(t.extend(D, { using: r }));
            })
          );
        }),
        (t.ui.position = {
          fit: {
            left: function (t, e) {
              var i,
                s = e.within,
                n = s.isWindow ? s.scrollLeft : s.offset.left,
                a = s.width,
                r = t.left - e.collisionPosition.marginLeft,
                h = n - r,
                l = r + e.collisionWidth - a - n;
              e.collisionWidth > a
                ? h > 0 && 0 >= l
                  ? ((i = t.left + h + e.collisionWidth - a - n),
                    (t.left += h - i))
                  : (t.left =
                      l > 0 && 0 >= h
                        ? n
                        : h > l
                        ? n + a - e.collisionWidth
                        : n)
                : h > 0
                ? (t.left += h)
                : l > 0
                ? (t.left -= l)
                : (t.left = o(t.left - r, t.left));
            },
            top: function (t, e) {
              var i,
                s = e.within,
                n = s.isWindow ? s.scrollTop : s.offset.top,
                a = e.within.height,
                r = t.top - e.collisionPosition.marginTop,
                h = n - r,
                l = r + e.collisionHeight - a - n;
              e.collisionHeight > a
                ? h > 0 && 0 >= l
                  ? ((i = t.top + h + e.collisionHeight - a - n),
                    (t.top += h - i))
                  : (t.top =
                      l > 0 && 0 >= h
                        ? n
                        : h > l
                        ? n + a - e.collisionHeight
                        : n)
                : h > 0
                ? (t.top += h)
                : l > 0
                ? (t.top -= l)
                : (t.top = o(t.top - r, t.top));
            },
          },
          flip: {
            left: function (t, e) {
              var i,
                s,
                n = e.within,
                o = n.offset.left + n.scrollLeft,
                r = n.width,
                h = n.isWindow ? n.scrollLeft : n.offset.left,
                l = t.left - e.collisionPosition.marginLeft,
                c = l - h,
                u = l + e.collisionWidth - r - h,
                d =
                  "left" === e.my[0]
                    ? -e.elemWidth
                    : "right" === e.my[0]
                    ? e.elemWidth
                    : 0,
                p =
                  "left" === e.at[0]
                    ? e.targetWidth
                    : "right" === e.at[0]
                    ? -e.targetWidth
                    : 0,
                f = -2 * e.offset[0];
              0 > c
                ? ((i = t.left + d + p + f + e.collisionWidth - r - o),
                  (0 > i || a(c) > i) && (t.left += d + p + f))
                : u > 0 &&
                  ((s =
                    t.left - e.collisionPosition.marginLeft + d + p + f - h),
                  (s > 0 || u > a(s)) && (t.left += d + p + f));
            },
            top: function (t, e) {
              var i,
                s,
                n = e.within,
                o = n.offset.top + n.scrollTop,
                r = n.height,
                h = n.isWindow ? n.scrollTop : n.offset.top,
                l = t.top - e.collisionPosition.marginTop,
                c = l - h,
                u = l + e.collisionHeight - r - h,
                d = "top" === e.my[1],
                p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                f =
                  "top" === e.at[1]
                    ? e.targetHeight
                    : "bottom" === e.at[1]
                    ? -e.targetHeight
                    : 0,
                g = -2 * e.offset[1];
              0 > c
                ? ((s = t.top + p + f + g + e.collisionHeight - r - o),
                  (0 > s || a(c) > s) && (t.top += p + f + g))
                : u > 0 &&
                  ((i = t.top - e.collisionPosition.marginTop + p + f + g - h),
                  (i > 0 || u > a(i)) && (t.top += p + f + g));
            },
          },
          flipfit: {
            left: function () {
              t.ui.position.flip.left.apply(this, arguments),
                t.ui.position.fit.left.apply(this, arguments);
            },
            top: function () {
              t.ui.position.flip.top.apply(this, arguments),
                t.ui.position.fit.top.apply(this, arguments);
            },
          },
        });
    })(),
    t.ui.position,
    t.extend(t.expr[":"], {
      data: t.expr.createPseudo
        ? t.expr.createPseudo(function (e) {
            return function (i) {
              return !!t.data(i, e);
            };
          })
        : function (e, i, s) {
            return !!t.data(e, s[3]);
          },
    }),
    t.fn.extend({
      disableSelection: (function () {
        var t =
          "onselectstart" in document.createElement("div")
            ? "selectstart"
            : "mousedown";
        return function () {
          return this.on(t + ".ui-disableSelection", function (t) {
            t.preventDefault();
          });
        };
      })(),
      enableSelection: function () {
        return this.off(".ui-disableSelection");
      },
    });
  var c = "ui-effects-",
    u = "ui-effects-style",
    d = "ui-effects-animated",
    p = t;
  (t.effects = { effect: {} }),
    (function (t, e) {
      function i(t, e, i) {
        var s = u[e.type] || {};
        return null == t
          ? i || !e.def
            ? null
            : e.def
          : ((t = s.floor ? ~~t : parseFloat(t)),
            isNaN(t)
              ? e.def
              : s.mod
              ? (t + s.mod) % s.mod
              : 0 > t
              ? 0
              : t > s.max
              ? s.max
              : t);
      }
      function s(i) {
        var s = l(),
          n = (s._rgba = []);
        return (
          (i = i.toLowerCase()),
          f(h, function (t, o) {
            var a,
              r = o.re.exec(i),
              h = r && o.parse(r),
              l = o.space || "rgba";
            return h
              ? ((a = s[l](h)),
                (s[c[l].cache] = a[c[l].cache]),
                (n = s._rgba = a._rgba),
                !1)
              : e;
          }),
          n.length
            ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), s)
            : o[i]
        );
      }
      function n(t, e, i) {
        return (
          (i = (i + 1) % 1),
          1 > 6 * i
            ? t + 6 * (e - t) * i
            : 1 > 2 * i
            ? e
            : 2 > 3 * i
            ? t + 6 * (e - t) * (2 / 3 - i)
            : t
        );
      }
      var o,
        a =
          "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        r = /^([\-+])=\s*(\d+\.?\d*)/,
        h = [
          {
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (t) {
              return [t[1], t[2], t[3], t[4]];
            },
          },
          {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (t) {
              return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
            },
          },
          {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function (t) {
              return [
                parseInt(t[1], 16),
                parseInt(t[2], 16),
                parseInt(t[3], 16),
              ];
            },
          },
          {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function (t) {
              return [
                parseInt(t[1] + t[1], 16),
                parseInt(t[2] + t[2], 16),
                parseInt(t[3] + t[3], 16),
              ];
            },
          },
          {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function (t) {
              return [t[1], t[2] / 100, t[3] / 100, t[4]];
            },
          },
        ],
        l = (t.Color = function (e, i, s, n) {
          return new t.Color.fn.parse(e, i, s, n);
        }),
        c = {
          rgba: {
            props: {
              red: { idx: 0, type: "byte" },
              green: { idx: 1, type: "byte" },
              blue: { idx: 2, type: "byte" },
            },
          },
          hsla: {
            props: {
              hue: { idx: 0, type: "degrees" },
              saturation: { idx: 1, type: "percent" },
              lightness: { idx: 2, type: "percent" },
            },
          },
        },
        u = {
          byte: { floor: !0, max: 255 },
          percent: { max: 1 },
          degrees: { mod: 360, floor: !0 },
        },
        d = (l.support = {}),
        p = t("<p>")[0],
        f = t.each;
      (p.style.cssText = "background-color:rgba(1,1,1,.5)"),
        (d.rgba = p.style.backgroundColor.indexOf("rgba") > -1),
        f(c, function (t, e) {
          (e.cache = "_" + t),
            (e.props.alpha = { idx: 3, type: "percent", def: 1 });
        }),
        (l.fn = t.extend(l.prototype, {
          parse: function (n, a, r, h) {
            if (n === e) return (this._rgba = [null, null, null, null]), this;
            (n.jquery || n.nodeType) && ((n = t(n).css(a)), (a = e));
            var u = this,
              d = t.type(n),
              p = (this._rgba = []);
            return (
              a !== e && ((n = [n, a, r, h]), (d = "array")),
              "string" === d
                ? this.parse(s(n) || o._default)
                : "array" === d
                ? (f(c.rgba.props, function (t, e) {
                    p[e.idx] = i(n[e.idx], e);
                  }),
                  this)
                : "object" === d
                ? (n instanceof l
                    ? f(c, function (t, e) {
                        n[e.cache] && (u[e.cache] = n[e.cache].slice());
                      })
                    : f(c, function (e, s) {
                        var o = s.cache;
                        f(s.props, function (t, e) {
                          if (!u[o] && s.to) {
                            if ("alpha" === t || null == n[t]) return;
                            u[o] = s.to(u._rgba);
                          }
                          u[o][e.idx] = i(n[t], e, !0);
                        }),
                          u[o] &&
                            0 > t.inArray(null, u[o].slice(0, 3)) &&
                            ((u[o][3] = 1), s.from && (u._rgba = s.from(u[o])));
                      }),
                  this)
                : e
            );
          },
          is: function (t) {
            var i = l(t),
              s = !0,
              n = this;
            return (
              f(c, function (t, o) {
                var a,
                  r = i[o.cache];
                return (
                  r &&
                    ((a = n[o.cache] || (o.to && o.to(n._rgba)) || []),
                    f(o.props, function (t, i) {
                      return null != r[i.idx] ? (s = r[i.idx] === a[i.idx]) : e;
                    })),
                  s
                );
              }),
              s
            );
          },
          _space: function () {
            var t = [],
              e = this;
            return (
              f(c, function (i, s) {
                e[s.cache] && t.push(i);
              }),
              t.pop()
            );
          },
          transition: function (t, e) {
            var s = l(t),
              n = s._space(),
              o = c[n],
              a = 0 === this.alpha() ? l("transparent") : this,
              r = a[o.cache] || o.to(a._rgba),
              h = r.slice();
            return (
              (s = s[o.cache]),
              f(o.props, function (t, n) {
                var o = n.idx,
                  a = r[o],
                  l = s[o],
                  c = u[n.type] || {};
                null !== l &&
                  (null === a
                    ? (h[o] = l)
                    : (c.mod &&
                        (l - a > c.mod / 2
                          ? (a += c.mod)
                          : a - l > c.mod / 2 && (a -= c.mod)),
                      (h[o] = i((l - a) * e + a, n))));
              }),
              this[n](h)
            );
          },
          blend: function (e) {
            if (1 === this._rgba[3]) return this;
            var i = this._rgba.slice(),
              s = i.pop(),
              n = l(e)._rgba;
            return l(
              t.map(i, function (t, e) {
                return (1 - s) * n[e] + s * t;
              })
            );
          },
          toRgbaString: function () {
            var e = "rgba(",
              i = t.map(this._rgba, function (t, e) {
                return null == t ? (e > 2 ? 1 : 0) : t;
              });
            return 1 === i[3] && (i.pop(), (e = "rgb(")), e + i.join() + ")";
          },
          toHslaString: function () {
            var e = "hsla(",
              i = t.map(this.hsla(), function (t, e) {
                return (
                  null == t && (t = e > 2 ? 1 : 0),
                  e && 3 > e && (t = Math.round(100 * t) + "%"),
                  t
                );
              });
            return 1 === i[3] && (i.pop(), (e = "hsl(")), e + i.join() + ")";
          },
          toHexString: function (e) {
            var i = this._rgba.slice(),
              s = i.pop();
            return (
              e && i.push(~~(255 * s)),
              "#" +
                t
                  .map(i, function (t) {
                    return (
                      (t = (t || 0).toString(16)), 1 === t.length ? "0" + t : t
                    );
                  })
                  .join("")
            );
          },
          toString: function () {
            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
          },
        })),
        (l.fn.parse.prototype = l.fn),
        (c.hsla.to = function (t) {
          if (null == t[0] || null == t[1] || null == t[2])
            return [null, null, null, t[3]];
          var e,
            i,
            s = t[0] / 255,
            n = t[1] / 255,
            o = t[2] / 255,
            a = t[3],
            r = Math.max(s, n, o),
            h = Math.min(s, n, o),
            l = r - h,
            c = r + h,
            u = 0.5 * c;
          return (
            (e =
              h === r
                ? 0
                : s === r
                ? (60 * (n - o)) / l + 360
                : n === r
                ? (60 * (o - s)) / l + 120
                : (60 * (s - n)) / l + 240),
            (i = 0 === l ? 0 : 0.5 >= u ? l / c : l / (2 - c)),
            [Math.round(e) % 360, i, u, null == a ? 1 : a]
          );
        }),
        (c.hsla.from = function (t) {
          if (null == t[0] || null == t[1] || null == t[2])
            return [null, null, null, t[3]];
          var e = t[0] / 360,
            i = t[1],
            s = t[2],
            o = t[3],
            a = 0.5 >= s ? s * (1 + i) : s + i - s * i,
            r = 2 * s - a;
          return [
            Math.round(255 * n(r, a, e + 1 / 3)),
            Math.round(255 * n(r, a, e)),
            Math.round(255 * n(r, a, e - 1 / 3)),
            o,
          ];
        }),
        f(c, function (s, n) {
          var o = n.props,
            a = n.cache,
            h = n.to,
            c = n.from;
          (l.fn[s] = function (s) {
            if ((h && !this[a] && (this[a] = h(this._rgba)), s === e))
              return this[a].slice();
            var n,
              r = t.type(s),
              u = "array" === r || "object" === r ? s : arguments,
              d = this[a].slice();
            return (
              f(o, function (t, e) {
                var s = u["object" === r ? t : e.idx];
                null == s && (s = d[e.idx]), (d[e.idx] = i(s, e));
              }),
              c ? ((n = l(c(d))), (n[a] = d), n) : l(d)
            );
          }),
            f(o, function (e, i) {
              l.fn[e] ||
                (l.fn[e] = function (n) {
                  var o,
                    a = t.type(n),
                    h = "alpha" === e ? (this._hsla ? "hsla" : "rgba") : s,
                    l = this[h](),
                    c = l[i.idx];
                  return "undefined" === a
                    ? c
                    : ("function" === a &&
                        ((n = n.call(this, c)), (a = t.type(n))),
                      null == n && i.empty
                        ? this
                        : ("string" === a &&
                            ((o = r.exec(n)),
                            o &&
                              (n =
                                c +
                                parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))),
                          (l[i.idx] = n),
                          this[h](l)));
                });
            });
        }),
        (l.hook = function (e) {
          var i = e.split(" ");
          f(i, function (e, i) {
            (t.cssHooks[i] = {
              set: function (e, n) {
                var o,
                  a,
                  r = "";
                if (
                  "transparent" !== n &&
                  ("string" !== t.type(n) || (o = s(n)))
                ) {
                  if (((n = l(o || n)), !d.rgba && 1 !== n._rgba[3])) {
                    for (
                      a = "backgroundColor" === i ? e.parentNode : e;
                      ("" === r || "transparent" === r) && a && a.style;

                    )
                      try {
                        (r = t.css(a, "backgroundColor")), (a = a.parentNode);
                      } catch (h) {}
                    n = n.blend(r && "transparent" !== r ? r : "_default");
                  }
                  n = n.toRgbaString();
                }
                try {
                  e.style[i] = n;
                } catch (h) {}
              },
            }),
              (t.fx.step[i] = function (e) {
                e.colorInit ||
                  ((e.start = l(e.elem, i)),
                  (e.end = l(e.end)),
                  (e.colorInit = !0)),
                  t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos));
              });
          });
        }),
        l.hook(a),
        (t.cssHooks.borderColor = {
          expand: function (t) {
            var e = {};
            return (
              f(["Top", "Right", "Bottom", "Left"], function (i, s) {
                e["border" + s + "Color"] = t;
              }),
              e
            );
          },
        }),
        (o = t.Color.names =
          {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff",
          });
    })(p),
    (function () {
      function e(e) {
        var i,
          s,
          n = e.ownerDocument.defaultView
            ? e.ownerDocument.defaultView.getComputedStyle(e, null)
            : e.currentStyle,
          o = {};
        if (n && n.length && n[0] && n[n[0]])
          for (s = n.length; s--; )
            (i = n[s]), "string" == typeof n[i] && (o[t.camelCase(i)] = n[i]);
        else for (i in n) "string" == typeof n[i] && (o[i] = n[i]);
        return o;
      }
      function i(e, i) {
        var s,
          o,
          a = {};
        for (s in i)
          (o = i[s]),
            e[s] !== o &&
              (n[s] || ((t.fx.step[s] || !isNaN(parseFloat(o))) && (a[s] = o)));
        return a;
      }
      var s = ["add", "remove", "toggle"],
        n = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1,
        };
      t.each(
        [
          "borderLeftStyle",
          "borderRightStyle",
          "borderBottomStyle",
          "borderTopStyle",
        ],
        function (e, i) {
          t.fx.step[i] = function (t) {
            (("none" !== t.end && !t.setAttr) || (1 === t.pos && !t.setAttr)) &&
              (p.style(t.elem, i, t.end), (t.setAttr = !0));
          };
        }
      ),
        t.fn.addBack ||
          (t.fn.addBack = function (t) {
            return this.add(
              null == t ? this.prevObject : this.prevObject.filter(t)
            );
          }),
        (t.effects.animateClass = function (n, o, a, r) {
          var h = t.speed(o, a, r);
          return this.queue(function () {
            var o,
              a = t(this),
              r = a.attr("class") || "",
              l = h.children ? a.find("*").addBack() : a;
            (l = l.map(function () {
              var i = t(this);
              return { el: i, start: e(this) };
            })),
              (o = function () {
                t.each(s, function (t, e) {
                  n[e] && a[e + "Class"](n[e]);
                });
              }),
              o(),
              (l = l.map(function () {
                return (
                  (this.end = e(this.el[0])),
                  (this.diff = i(this.start, this.end)),
                  this
                );
              })),
              a.attr("class", r),
              (l = l.map(function () {
                var e = this,
                  i = t.Deferred(),
                  s = t.extend({}, h, {
                    queue: !1,
                    complete: function () {
                      i.resolve(e);
                    },
                  });
                return this.el.animate(this.diff, s), i.promise();
              })),
              t.when.apply(t, l.get()).done(function () {
                o(),
                  t.each(arguments, function () {
                    var e = this.el;
                    t.each(this.diff, function (t) {
                      e.css(t, "");
                    });
                  }),
                  h.complete.call(a[0]);
              });
          });
        }),
        t.fn.extend({
          addClass: (function (e) {
            return function (i, s, n, o) {
              return s
                ? t.effects.animateClass.call(this, { add: i }, s, n, o)
                : e.apply(this, arguments);
            };
          })(t.fn.addClass),
          removeClass: (function (e) {
            return function (i, s, n, o) {
              return arguments.length > 1
                ? t.effects.animateClass.call(this, { remove: i }, s, n, o)
                : e.apply(this, arguments);
            };
          })(t.fn.removeClass),
          toggleClass: (function (e) {
            return function (i, s, n, o, a) {
              return "boolean" == typeof s || void 0 === s
                ? n
                  ? t.effects.animateClass.call(
                      this,
                      s ? { add: i } : { remove: i },
                      n,
                      o,
                      a
                    )
                  : e.apply(this, arguments)
                : t.effects.animateClass.call(this, { toggle: i }, s, n, o);
            };
          })(t.fn.toggleClass),
          switchClass: function (e, i, s, n, o) {
            return t.effects.animateClass.call(
              this,
              { add: i, remove: e },
              s,
              n,
              o
            );
          },
        });
    })(),
    (function () {
      function e(e, i, s, n) {
        return (
          t.isPlainObject(e) && ((i = e), (e = e.effect)),
          (e = { effect: e }),
          null == i && (i = {}),
          t.isFunction(i) && ((n = i), (s = null), (i = {})),
          ("number" == typeof i || t.fx.speeds[i]) &&
            ((n = s), (s = i), (i = {})),
          t.isFunction(s) && ((n = s), (s = null)),
          i && t.extend(e, i),
          (s = s || i.duration),
          (e.duration = t.fx.off
            ? 0
            : "number" == typeof s
            ? s
            : s in t.fx.speeds
            ? t.fx.speeds[s]
            : t.fx.speeds._default),
          (e.complete = n || i.complete),
          e
        );
      }
      function i(e) {
        return !e || "number" == typeof e || t.fx.speeds[e]
          ? !0
          : "string" != typeof e || t.effects.effect[e]
          ? t.isFunction(e)
            ? !0
            : "object" != typeof e || e.effect
            ? !1
            : !0
          : !0;
      }
      function s(t, e) {
        var i = e.outerWidth(),
          s = e.outerHeight(),
          n =
            /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
          o = n.exec(t) || ["", 0, i, s, 0];
        return {
          top: parseFloat(o[1]) || 0,
          right: "auto" === o[2] ? i : parseFloat(o[2]),
          bottom: "auto" === o[3] ? s : parseFloat(o[3]),
          left: parseFloat(o[4]) || 0,
        };
      }
      t.expr &&
        t.expr.filters &&
        t.expr.filters.animated &&
        (t.expr.filters.animated = (function (e) {
          return function (i) {
            return !!t(i).data(d) || e(i);
          };
        })(t.expr.filters.animated)),
        t.uiBackCompat !== !1 &&
          t.extend(t.effects, {
            save: function (t, e) {
              for (var i = 0, s = e.length; s > i; i++)
                null !== e[i] && t.data(c + e[i], t[0].style[e[i]]);
            },
            restore: function (t, e) {
              for (var i, s = 0, n = e.length; n > s; s++)
                null !== e[s] && ((i = t.data(c + e[s])), t.css(e[s], i));
            },
            setMode: function (t, e) {
              return (
                "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
              );
            },
            createWrapper: function (e) {
              if (e.parent().is(".ui-effects-wrapper")) return e.parent();
              var i = {
                  width: e.outerWidth(!0),
                  height: e.outerHeight(!0),
                  float: e.css("float"),
                },
                s = t("<div></div>")
                  .addClass("ui-effects-wrapper")
                  .css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0,
                  }),
                n = { width: e.width(), height: e.height() },
                o = document.activeElement;
              try {
                o.id;
              } catch (a) {
                o = document.body;
              }
              return (
                e.wrap(s),
                (e[0] === o || t.contains(e[0], o)) && t(o).trigger("focus"),
                (s = e.parent()),
                "static" === e.css("position")
                  ? (s.css({ position: "relative" }),
                    e.css({ position: "relative" }))
                  : (t.extend(i, {
                      position: e.css("position"),
                      zIndex: e.css("z-index"),
                    }),
                    t.each(["top", "left", "bottom", "right"], function (t, s) {
                      (i[s] = e.css(s)),
                        isNaN(parseInt(i[s], 10)) && (i[s] = "auto");
                    }),
                    e.css({
                      position: "relative",
                      top: 0,
                      left: 0,
                      right: "auto",
                      bottom: "auto",
                    })),
                e.css(n),
                s.css(i).show()
              );
            },
            removeWrapper: function (e) {
              var i = document.activeElement;
              return (
                e.parent().is(".ui-effects-wrapper") &&
                  (e.parent().replaceWith(e),
                  (e[0] === i || t.contains(e[0], i)) && t(i).trigger("focus")),
                e
              );
            },
          }),
        t.extend(t.effects, {
          version: "1.12.1",
          define: function (e, i, s) {
            return (
              s || ((s = i), (i = "effect")),
              (t.effects.effect[e] = s),
              (t.effects.effect[e].mode = i),
              s
            );
          },
          scaledDimensions: function (t, e, i) {
            if (0 === e)
              return { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
            var s = "horizontal" !== i ? (e || 100) / 100 : 1,
              n = "vertical" !== i ? (e || 100) / 100 : 1;
            return {
              height: t.height() * n,
              width: t.width() * s,
              outerHeight: t.outerHeight() * n,
              outerWidth: t.outerWidth() * s,
            };
          },
          clipToBox: function (t) {
            return {
              width: t.clip.right - t.clip.left,
              height: t.clip.bottom - t.clip.top,
              left: t.clip.left,
              top: t.clip.top,
            };
          },
          unshift: function (t, e, i) {
            var s = t.queue();
            e > 1 && s.splice.apply(s, [1, 0].concat(s.splice(e, i))),
              t.dequeue();
          },
          saveStyle: function (t) {
            t.data(u, t[0].style.cssText);
          },
          restoreStyle: function (t) {
            (t[0].style.cssText = t.data(u) || ""), t.removeData(u);
          },
          mode: function (t, e) {
            var i = t.is(":hidden");
            return (
              "toggle" === e && (e = i ? "show" : "hide"),
              (i ? "hide" === e : "show" === e) && (e = "none"),
              e
            );
          },
          getBaseline: function (t, e) {
            var i, s;
            switch (t[0]) {
              case "top":
                i = 0;
                break;
              case "middle":
                i = 0.5;
                break;
              case "bottom":
                i = 1;
                break;
              default:
                i = t[0] / e.height;
            }
            switch (t[1]) {
              case "left":
                s = 0;
                break;
              case "center":
                s = 0.5;
                break;
              case "right":
                s = 1;
                break;
              default:
                s = t[1] / e.width;
            }
            return { x: s, y: i };
          },
          createPlaceholder: function (e) {
            var i,
              s = e.css("position"),
              n = e.position();
            return (
              e
                .css({
                  marginTop: e.css("marginTop"),
                  marginBottom: e.css("marginBottom"),
                  marginLeft: e.css("marginLeft"),
                  marginRight: e.css("marginRight"),
                })
                .outerWidth(e.outerWidth())
                .outerHeight(e.outerHeight()),
              /^(static|relative)/.test(s) &&
                ((s = "absolute"),
                (i = t("<" + e[0].nodeName + ">")
                  .insertAfter(e)
                  .css({
                    display: /^(inline|ruby)/.test(e.css("display"))
                      ? "inline-block"
                      : "block",
                    visibility: "hidden",
                    marginTop: e.css("marginTop"),
                    marginBottom: e.css("marginBottom"),
                    marginLeft: e.css("marginLeft"),
                    marginRight: e.css("marginRight"),
                    float: e.css("float"),
                  })
                  .outerWidth(e.outerWidth())
                  .outerHeight(e.outerHeight())
                  .addClass("ui-effects-placeholder")),
                e.data(c + "placeholder", i)),
              e.css({ position: s, left: n.left, top: n.top }),
              i
            );
          },
          removePlaceholder: function (t) {
            var e = c + "placeholder",
              i = t.data(e);
            i && (i.remove(), t.removeData(e));
          },
          cleanUp: function (e) {
            t.effects.restoreStyle(e), t.effects.removePlaceholder(e);
          },
          setTransition: function (e, i, s, n) {
            return (
              (n = n || {}),
              t.each(i, function (t, i) {
                var o = e.cssUnit(i);
                o[0] > 0 && (n[i] = o[0] * s + o[1]);
              }),
              n
            );
          },
        }),
        t.fn.extend({
          effect: function () {
            function i(e) {
              function i() {
                r.removeData(d),
                  t.effects.cleanUp(r),
                  "hide" === s.mode && r.hide(),
                  a();
              }
              function a() {
                t.isFunction(h) && h.call(r[0]), t.isFunction(e) && e();
              }
              var r = t(this);
              (s.mode = c.shift()),
                t.uiBackCompat === !1 || o
                  ? "none" === s.mode
                    ? (r[l](), a())
                    : n.call(r[0], s, i)
                  : (r.is(":hidden") ? "hide" === l : "show" === l)
                  ? (r[l](), a())
                  : n.call(r[0], s, a);
            }
            var s = e.apply(this, arguments),
              n = t.effects.effect[s.effect],
              o = n.mode,
              a = s.queue,
              r = a || "fx",
              h = s.complete,
              l = s.mode,
              c = [],
              u = function (e) {
                var i = t(this),
                  s = t.effects.mode(i, l) || o;
                i.data(d, !0),
                  c.push(s),
                  o && ("show" === s || (s === o && "hide" === s)) && i.show(),
                  (o && "none" === s) || t.effects.saveStyle(i),
                  t.isFunction(e) && e();
              };
            return t.fx.off || !n
              ? l
                ? this[l](s.duration, h)
                : this.each(function () {
                    h && h.call(this);
                  })
              : a === !1
              ? this.each(u).each(i)
              : this.queue(r, u).queue(r, i);
          },
          show: (function (t) {
            return function (s) {
              if (i(s)) return t.apply(this, arguments);
              var n = e.apply(this, arguments);
              return (n.mode = "show"), this.effect.call(this, n);
            };
          })(t.fn.show),
          hide: (function (t) {
            return function (s) {
              if (i(s)) return t.apply(this, arguments);
              var n = e.apply(this, arguments);
              return (n.mode = "hide"), this.effect.call(this, n);
            };
          })(t.fn.hide),
          toggle: (function (t) {
            return function (s) {
              if (i(s) || "boolean" == typeof s)
                return t.apply(this, arguments);
              var n = e.apply(this, arguments);
              return (n.mode = "toggle"), this.effect.call(this, n);
            };
          })(t.fn.toggle),
          cssUnit: function (e) {
            var i = this.css(e),
              s = [];
            return (
              t.each(["em", "px", "%", "pt"], function (t, e) {
                i.indexOf(e) > 0 && (s = [parseFloat(i), e]);
              }),
              s
            );
          },
          cssClip: function (t) {
            return t
              ? this.css(
                  "clip",
                  "rect(" +
                    t.top +
                    "px " +
                    t.right +
                    "px " +
                    t.bottom +
                    "px " +
                    t.left +
                    "px)"
                )
              : s(this.css("clip"), this);
          },
          transfer: function (e, i) {
            var s = t(this),
              n = t(e.to),
              o = "fixed" === n.css("position"),
              a = t("body"),
              r = o ? a.scrollTop() : 0,
              h = o ? a.scrollLeft() : 0,
              l = n.offset(),
              c = {
                top: l.top - r,
                left: l.left - h,
                height: n.innerHeight(),
                width: n.innerWidth(),
              },
              u = s.offset(),
              d = t("<div class='ui-effects-transfer'></div>")
                .appendTo("body")
                .addClass(e.className)
                .css({
                  top: u.top - r,
                  left: u.left - h,
                  height: s.innerHeight(),
                  width: s.innerWidth(),
                  position: o ? "fixed" : "absolute",
                })
                .animate(c, e.duration, e.easing, function () {
                  d.remove(), t.isFunction(i) && i();
                });
          },
        }),
        (t.fx.step.clip = function (e) {
          e.clipInit ||
            ((e.start = t(e.elem).cssClip()),
            "string" == typeof e.end && (e.end = s(e.end, e.elem)),
            (e.clipInit = !0)),
            t(e.elem).cssClip({
              top: e.pos * (e.end.top - e.start.top) + e.start.top,
              right: e.pos * (e.end.right - e.start.right) + e.start.right,
              bottom: e.pos * (e.end.bottom - e.start.bottom) + e.start.bottom,
              left: e.pos * (e.end.left - e.start.left) + e.start.left,
            });
        });
    })(),
    (function () {
      var e = {};
      t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, i) {
        e[i] = function (e) {
          return Math.pow(e, t + 2);
        };
      }),
        t.extend(e, {
          Sine: function (t) {
            return 1 - Math.cos((t * Math.PI) / 2);
          },
          Circ: function (t) {
            return 1 - Math.sqrt(1 - t * t);
          },
          Elastic: function (t) {
            return 0 === t || 1 === t
              ? t
              : -Math.pow(2, 8 * (t - 1)) *
                  Math.sin(((80 * (t - 1) - 7.5) * Math.PI) / 15);
          },
          Back: function (t) {
            return t * t * (3 * t - 2);
          },
          Bounce: function (t) {
            for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t; );
            return (
              1 / Math.pow(4, 3 - i) -
              7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            );
          },
        }),
        t.each(e, function (e, i) {
          (t.easing["easeIn" + e] = i),
            (t.easing["easeOut" + e] = function (t) {
              return 1 - i(1 - t);
            }),
            (t.easing["easeInOut" + e] = function (t) {
              return 0.5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2;
            });
        });
    })();
  var f = t.effects;
  t.effects.define("blind", "hide", function (e, i) {
    var s = {
        up: ["bottom", "top"],
        vertical: ["bottom", "top"],
        down: ["top", "bottom"],
        left: ["right", "left"],
        horizontal: ["right", "left"],
        right: ["left", "right"],
      },
      n = t(this),
      o = e.direction || "up",
      a = n.cssClip(),
      r = { clip: t.extend({}, a) },
      h = t.effects.createPlaceholder(n);
    (r.clip[s[o][0]] = r.clip[s[o][1]]),
      "show" === e.mode &&
        (n.cssClip(r.clip), h && h.css(t.effects.clipToBox(r)), (r.clip = a)),
      h && h.animate(t.effects.clipToBox(r), e.duration, e.easing),
      n.animate(r, {
        queue: !1,
        duration: e.duration,
        easing: e.easing,
        complete: i,
      });
  }),
    t.effects.define("bounce", function (e, i) {
      var s,
        n,
        o,
        a = t(this),
        r = e.mode,
        h = "hide" === r,
        l = "show" === r,
        c = e.direction || "up",
        u = e.distance,
        d = e.times || 5,
        p = 2 * d + (l || h ? 1 : 0),
        f = e.duration / p,
        g = e.easing,
        m = "up" === c || "down" === c ? "top" : "left",
        _ = "up" === c || "left" === c,
        v = 0,
        b = a.queue().length;
      for (
        t.effects.createPlaceholder(a),
          o = a.css(m),
          u || (u = a["top" === m ? "outerHeight" : "outerWidth"]() / 3),
          l &&
            ((n = { opacity: 1 }),
            (n[m] = o),
            a
              .css("opacity", 0)
              .css(m, _ ? 2 * -u : 2 * u)
              .animate(n, f, g)),
          h && (u /= Math.pow(2, d - 1)),
          n = {},
          n[m] = o;
        d > v;
        v++
      )
        (s = {}),
          (s[m] = (_ ? "-=" : "+=") + u),
          a.animate(s, f, g).animate(n, f, g),
          (u = h ? 2 * u : u / 2);
      h &&
        ((s = { opacity: 0 }),
        (s[m] = (_ ? "-=" : "+=") + u),
        a.animate(s, f, g)),
        a.queue(i),
        t.effects.unshift(a, b, p + 1);
    }),
    t.effects.define("clip", "hide", function (e, i) {
      var s,
        n = {},
        o = t(this),
        a = e.direction || "vertical",
        r = "both" === a,
        h = r || "horizontal" === a,
        l = r || "vertical" === a;
      (s = o.cssClip()),
        (n.clip = {
          top: l ? (s.bottom - s.top) / 2 : s.top,
          right: h ? (s.right - s.left) / 2 : s.right,
          bottom: l ? (s.bottom - s.top) / 2 : s.bottom,
          left: h ? (s.right - s.left) / 2 : s.left,
        }),
        t.effects.createPlaceholder(o),
        "show" === e.mode && (o.cssClip(n.clip), (n.clip = s)),
        o.animate(n, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: i,
        });
    }),
    t.effects.define("drop", "hide", function (e, i) {
      var s,
        n = t(this),
        o = e.mode,
        a = "show" === o,
        r = e.direction || "left",
        h = "up" === r || "down" === r ? "top" : "left",
        l = "up" === r || "left" === r ? "-=" : "+=",
        c = "+=" === l ? "-=" : "+=",
        u = { opacity: 0 };
      t.effects.createPlaceholder(n),
        (s =
          e.distance || n["top" === h ? "outerHeight" : "outerWidth"](!0) / 2),
        (u[h] = l + s),
        a && (n.css(u), (u[h] = c + s), (u.opacity = 1)),
        n.animate(u, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: i,
        });
    }),
    t.effects.define("explode", "hide", function (e, i) {
      function s() {
        b.push(this), b.length === u * d && n();
      }
      function n() {
        p.css({ visibility: "visible" }), t(b).remove(), i();
      }
      var o,
        a,
        r,
        h,
        l,
        c,
        u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
        d = u,
        p = t(this),
        f = e.mode,
        g = "show" === f,
        m = p.show().css("visibility", "hidden").offset(),
        _ = Math.ceil(p.outerWidth() / d),
        v = Math.ceil(p.outerHeight() / u),
        b = [];
      for (o = 0; u > o; o++)
        for (h = m.top + o * v, c = o - (u - 1) / 2, a = 0; d > a; a++)
          (r = m.left + a * _),
            (l = a - (d - 1) / 2),
            p
              .clone()
              .appendTo("body")
              .wrap("<div></div>")
              .css({
                position: "absolute",
                visibility: "visible",
                left: -a * _,
                top: -o * v,
              })
              .parent()
              .addClass("ui-effects-explode")
              .css({
                position: "absolute",
                overflow: "hidden",
                width: _,
                height: v,
                left: r + (g ? l * _ : 0),
                top: h + (g ? c * v : 0),
                opacity: g ? 0 : 1,
              })
              .animate(
                {
                  left: r + (g ? 0 : l * _),
                  top: h + (g ? 0 : c * v),
                  opacity: g ? 1 : 0,
                },
                e.duration || 500,
                e.easing,
                s
              );
    }),
    t.effects.define("fade", "toggle", function (e, i) {
      var s = "show" === e.mode;
      t(this)
        .css("opacity", s ? 0 : 1)
        .animate(
          { opacity: s ? 1 : 0 },
          { queue: !1, duration: e.duration, easing: e.easing, complete: i }
        );
    }),
    t.effects.define("fold", "hide", function (e, i) {
      var s = t(this),
        n = e.mode,
        o = "show" === n,
        a = "hide" === n,
        r = e.size || 15,
        h = /([0-9]+)%/.exec(r),
        l = !!e.horizFirst,
        c = l ? ["right", "bottom"] : ["bottom", "right"],
        u = e.duration / 2,
        d = t.effects.createPlaceholder(s),
        p = s.cssClip(),
        f = { clip: t.extend({}, p) },
        g = { clip: t.extend({}, p) },
        m = [p[c[0]], p[c[1]]],
        _ = s.queue().length;
      h && (r = (parseInt(h[1], 10) / 100) * m[a ? 0 : 1]),
        (f.clip[c[0]] = r),
        (g.clip[c[0]] = r),
        (g.clip[c[1]] = 0),
        o &&
          (s.cssClip(g.clip), d && d.css(t.effects.clipToBox(g)), (g.clip = p)),
        s
          .queue(function (i) {
            d &&
              d
                .animate(t.effects.clipToBox(f), u, e.easing)
                .animate(t.effects.clipToBox(g), u, e.easing),
              i();
          })
          .animate(f, u, e.easing)
          .animate(g, u, e.easing)
          .queue(i),
        t.effects.unshift(s, _, 4);
    }),
    t.effects.define("highlight", "show", function (e, i) {
      var s = t(this),
        n = { backgroundColor: s.css("backgroundColor") };
      "hide" === e.mode && (n.opacity = 0),
        t.effects.saveStyle(s),
        s
          .css({
            backgroundImage: "none",
            backgroundColor: e.color || "#ffff99",
          })
          .animate(n, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i,
          });
    }),
    t.effects.define("size", function (e, i) {
      var s,
        n,
        o,
        a = t(this),
        r = ["fontSize"],
        h = [
          "borderTopWidth",
          "borderBottomWidth",
          "paddingTop",
          "paddingBottom",
        ],
        l = [
          "borderLeftWidth",
          "borderRightWidth",
          "paddingLeft",
          "paddingRight",
        ],
        c = e.mode,
        u = "effect" !== c,
        d = e.scale || "both",
        p = e.origin || ["middle", "center"],
        f = a.css("position"),
        g = a.position(),
        m = t.effects.scaledDimensions(a),
        _ = e.from || m,
        v = e.to || t.effects.scaledDimensions(a, 0);
      t.effects.createPlaceholder(a),
        "show" === c && ((o = _), (_ = v), (v = o)),
        (n = {
          from: { y: _.height / m.height, x: _.width / m.width },
          to: { y: v.height / m.height, x: v.width / m.width },
        }),
        ("box" === d || "both" === d) &&
          (n.from.y !== n.to.y &&
            ((_ = t.effects.setTransition(a, h, n.from.y, _)),
            (v = t.effects.setTransition(a, h, n.to.y, v))),
          n.from.x !== n.to.x &&
            ((_ = t.effects.setTransition(a, l, n.from.x, _)),
            (v = t.effects.setTransition(a, l, n.to.x, v)))),
        ("content" === d || "both" === d) &&
          n.from.y !== n.to.y &&
          ((_ = t.effects.setTransition(a, r, n.from.y, _)),
          (v = t.effects.setTransition(a, r, n.to.y, v))),
        p &&
          ((s = t.effects.getBaseline(p, m)),
          (_.top = (m.outerHeight - _.outerHeight) * s.y + g.top),
          (_.left = (m.outerWidth - _.outerWidth) * s.x + g.left),
          (v.top = (m.outerHeight - v.outerHeight) * s.y + g.top),
          (v.left = (m.outerWidth - v.outerWidth) * s.x + g.left)),
        a.css(_),
        ("content" === d || "both" === d) &&
          ((h = h.concat(["marginTop", "marginBottom"]).concat(r)),
          (l = l.concat(["marginLeft", "marginRight"])),
          a.find("*[width]").each(function () {
            var i = t(this),
              s = t.effects.scaledDimensions(i),
              o = {
                height: s.height * n.from.y,
                width: s.width * n.from.x,
                outerHeight: s.outerHeight * n.from.y,
                outerWidth: s.outerWidth * n.from.x,
              },
              a = {
                height: s.height * n.to.y,
                width: s.width * n.to.x,
                outerHeight: s.height * n.to.y,
                outerWidth: s.width * n.to.x,
              };
            n.from.y !== n.to.y &&
              ((o = t.effects.setTransition(i, h, n.from.y, o)),
              (a = t.effects.setTransition(i, h, n.to.y, a))),
              n.from.x !== n.to.x &&
                ((o = t.effects.setTransition(i, l, n.from.x, o)),
                (a = t.effects.setTransition(i, l, n.to.x, a))),
              u && t.effects.saveStyle(i),
              i.css(o),
              i.animate(a, e.duration, e.easing, function () {
                u && t.effects.restoreStyle(i);
              });
          })),
        a.animate(v, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: function () {
            var e = a.offset();
            0 === v.opacity && a.css("opacity", _.opacity),
              u ||
                (a.css("position", "static" === f ? "relative" : f).offset(e),
                t.effects.saveStyle(a)),
              i();
          },
        });
    }),
    t.effects.define("scale", function (e, i) {
      var s = t(this),
        n = e.mode,
        o =
          parseInt(e.percent, 10) ||
          (0 === parseInt(e.percent, 10) ? 0 : "effect" !== n ? 0 : 100),
        a = t.extend(
          !0,
          {
            from: t.effects.scaledDimensions(s),
            to: t.effects.scaledDimensions(s, o, e.direction || "both"),
            origin: e.origin || ["middle", "center"],
          },
          e
        );
      e.fade && ((a.from.opacity = 1), (a.to.opacity = 0)),
        t.effects.effect.size.call(this, a, i);
    }),
    t.effects.define("puff", "hide", function (e, i) {
      var s = t.extend(!0, {}, e, {
        fade: !0,
        percent: parseInt(e.percent, 10) || 150,
      });
      t.effects.effect.scale.call(this, s, i);
    }),
    t.effects.define("pulsate", "show", function (e, i) {
      var s = t(this),
        n = e.mode,
        o = "show" === n,
        a = "hide" === n,
        r = o || a,
        h = 2 * (e.times || 5) + (r ? 1 : 0),
        l = e.duration / h,
        c = 0,
        u = 1,
        d = s.queue().length;
      for (
        (o || !s.is(":visible")) && (s.css("opacity", 0).show(), (c = 1));
        h > u;
        u++
      )
        s.animate({ opacity: c }, l, e.easing), (c = 1 - c);
      s.animate({ opacity: c }, l, e.easing),
        s.queue(i),
        t.effects.unshift(s, d, h + 1);
    }),
    t.effects.define("shake", function (e, i) {
      var s = 1,
        n = t(this),
        o = e.direction || "left",
        a = e.distance || 20,
        r = e.times || 3,
        h = 2 * r + 1,
        l = Math.round(e.duration / h),
        c = "up" === o || "down" === o ? "top" : "left",
        u = "up" === o || "left" === o,
        d = {},
        p = {},
        f = {},
        g = n.queue().length;
      for (
        t.effects.createPlaceholder(n),
          d[c] = (u ? "-=" : "+=") + a,
          p[c] = (u ? "+=" : "-=") + 2 * a,
          f[c] = (u ? "-=" : "+=") + 2 * a,
          n.animate(d, l, e.easing);
        r > s;
        s++
      )
        n.animate(p, l, e.easing).animate(f, l, e.easing);
      n
        .animate(p, l, e.easing)
        .animate(d, l / 2, e.easing)
        .queue(i),
        t.effects.unshift(n, g, h + 1);
    }),
    t.effects.define("slide", "show", function (e, i) {
      var s,
        n,
        o = t(this),
        a = {
          up: ["bottom", "top"],
          down: ["top", "bottom"],
          left: ["right", "left"],
          right: ["left", "right"],
        },
        r = e.mode,
        h = e.direction || "left",
        l = "up" === h || "down" === h ? "top" : "left",
        c = "up" === h || "left" === h,
        u = e.distance || o["top" === l ? "outerHeight" : "outerWidth"](!0),
        d = {};
      t.effects.createPlaceholder(o),
        (s = o.cssClip()),
        (n = o.position()[l]),
        (d[l] = (c ? -1 : 1) * u + n),
        (d.clip = o.cssClip()),
        (d.clip[a[h][1]] = d.clip[a[h][0]]),
        "show" === r &&
          (o.cssClip(d.clip), o.css(l, d[l]), (d.clip = s), (d[l] = n)),
        o.animate(d, {
          queue: !1,
          duration: e.duration,
          easing: e.easing,
          complete: i,
        });
    });
  var f;
  t.uiBackCompat !== !1 &&
    (f = t.effects.define("transfer", function (e, i) {
      t(this).transfer(e, i);
    })),
    (t.ui.focusable = function (i, s) {
      var n,
        o,
        a,
        r,
        h,
        l = i.nodeName.toLowerCase();
      return "area" === l
        ? ((n = i.parentNode),
          (o = n.name),
          i.href && o && "map" === n.nodeName.toLowerCase()
            ? ((a = t("img[usemap='#" + o + "']")),
              a.length > 0 && a.is(":visible"))
            : !1)
        : (/^(input|select|textarea|button|object)$/.test(l)
            ? ((r = !i.disabled),
              r && ((h = t(i).closest("fieldset")[0]), h && (r = !h.disabled)))
            : (r = "a" === l ? i.href || s : s),
          r && t(i).is(":visible") && e(t(i)));
    }),
    t.extend(t.expr[":"], {
      focusable: function (e) {
        return t.ui.focusable(e, null != t.attr(e, "tabindex"));
      },
    }),
    t.ui.focusable,
    (t.fn.form = function () {
      return "string" == typeof this[0].form
        ? this.closest("form")
        : t(this[0].form);
    }),
    (t.ui.formResetMixin = {
      _formResetHandler: function () {
        var e = t(this);
        setTimeout(function () {
          var i = e.data("ui-form-reset-instances");
          t.each(i, function () {
            this.refresh();
          });
        });
      },
      _bindFormResetHandler: function () {
        if (((this.form = this.element.form()), this.form.length)) {
          var t = this.form.data("ui-form-reset-instances") || [];
          t.length ||
            this.form.on("reset.ui-form-reset", this._formResetHandler),
            t.push(this),
            this.form.data("ui-form-reset-instances", t);
        }
      },
      _unbindFormResetHandler: function () {
        if (this.form.length) {
          var e = this.form.data("ui-form-reset-instances");
          e.splice(t.inArray(this, e), 1),
            e.length
              ? this.form.data("ui-form-reset-instances", e)
              : this.form
                  .removeData("ui-form-reset-instances")
                  .off("reset.ui-form-reset");
        }
      },
    }),
    "1.7" === t.fn.jquery.substring(0, 3) &&
      (t.each(["Width", "Height"], function (e, i) {
        function s(e, i, s, o) {
          return (
            t.each(n, function () {
              (i -= parseFloat(t.css(e, "padding" + this)) || 0),
                s &&
                  (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0),
                o && (i -= parseFloat(t.css(e, "margin" + this)) || 0);
            }),
            i
          );
        }
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
          o = i.toLowerCase(),
          a = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight,
          };
        (t.fn["inner" + i] = function (e) {
          return void 0 === e
            ? a["inner" + i].call(this)
            : this.each(function () {
                t(this).css(o, s(this, e) + "px");
              });
        }),
          (t.fn["outer" + i] = function (e, n) {
            return "number" != typeof e
              ? a["outer" + i].call(this, e)
              : this.each(function () {
                  t(this).css(o, s(this, e, !0, n) + "px");
                });
          });
      }),
      (t.fn.addBack = function (t) {
        return this.add(
          null == t ? this.prevObject : this.prevObject.filter(t)
        );
      })),
    (t.ui.keyCode = {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
    }),
    (t.ui.escapeSelector = (function () {
      var t = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
      return function (e) {
        return e.replace(t, "\\$1");
      };
    })()),
    (t.fn.labels = function () {
      var e, i, s, n, o;
      return this[0].labels && this[0].labels.length
        ? this.pushStack(this[0].labels)
        : ((n = this.eq(0).parents("label")),
          (s = this.attr("id")),
          s &&
            ((e = this.eq(0).parents().last()),
            (o = e.add(e.length ? e.siblings() : this.siblings())),
            (i = "label[for='" + t.ui.escapeSelector(s) + "']"),
            (n = n.add(o.find(i).addBack(i)))),
          this.pushStack(n));
    }),
    (t.fn.scrollParent = function (e) {
      var i = this.css("position"),
        s = "absolute" === i,
        n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        o = this.parents()
          .filter(function () {
            var e = t(this);
            return s && "static" === e.css("position")
              ? !1
              : n.test(
                  e.css("overflow") + e.css("overflow-y") + e.css("overflow-x")
                );
          })
          .eq(0);
      return "fixed" !== i && o.length
        ? o
        : t(this[0].ownerDocument || document);
    }),
    t.extend(t.expr[":"], {
      tabbable: function (e) {
        var i = t.attr(e, "tabindex"),
          s = null != i;
        return (!s || i >= 0) && t.ui.focusable(e, s);
      },
    }),
    t.fn.extend({
      uniqueId: (function () {
        var t = 0;
        return function () {
          return this.each(function () {
            this.id || (this.id = "ui-id-" + ++t);
          });
        };
      })(),
      removeUniqueId: function () {
        return this.each(function () {
          /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id");
        });
      },
    }),
    t.widget("ui.accordion", {
      version: "1.12.1",
      options: {
        active: 0,
        animate: {},
        classes: {
          "ui-accordion-header": "ui-corner-top",
          "ui-accordion-header-collapsed": "ui-corner-all",
          "ui-accordion-content": "ui-corner-bottom",
        },
        collapsible: !1,
        event: "click",
        header: "> li > :first-child, > :not(li):even",
        heightStyle: "auto",
        icons: {
          activeHeader: "ui-icon-triangle-1-s",
          header: "ui-icon-triangle-1-e",
        },
        activate: null,
        beforeActivate: null,
      },
      hideProps: {
        borderTopWidth: "hide",
        borderBottomWidth: "hide",
        paddingTop: "hide",
        paddingBottom: "hide",
        height: "hide",
      },
      showProps: {
        borderTopWidth: "show",
        borderBottomWidth: "show",
        paddingTop: "show",
        paddingBottom: "show",
        height: "show",
      },
      _create: function () {
        var e = this.options;
        (this.prevShow = this.prevHide = t()),
          this._addClass("ui-accordion", "ui-widget ui-helper-reset"),
          this.element.attr("role", "tablist"),
          e.collapsible ||
            (e.active !== !1 && null != e.active) ||
            (e.active = 0),
          this._processPanels(),
          0 > e.active && (e.active += this.headers.length),
          this._refresh();
      },
      _getCreateEventData: function () {
        return {
          header: this.active,
          panel: this.active.length ? this.active.next() : t(),
        };
      },
      _createIcons: function () {
        var e,
          i,
          s = this.options.icons;
        s &&
          ((e = t("<span>")),
          this._addClass(e, "ui-accordion-header-icon", "ui-icon " + s.header),
          e.prependTo(this.headers),
          (i = this.active.children(".ui-accordion-header-icon")),
          this._removeClass(i, s.header)
            ._addClass(i, null, s.activeHeader)
            ._addClass(this.headers, "ui-accordion-icons"));
      },
      _destroyIcons: function () {
        this._removeClass(this.headers, "ui-accordion-icons"),
          this.headers.children(".ui-accordion-header-icon").remove();
      },
      _destroy: function () {
        var t;
        this.element.removeAttr("role"),
          this.headers
            .removeAttr(
              "role aria-expanded aria-selected aria-controls tabIndex"
            )
            .removeUniqueId(),
          this._destroyIcons(),
          (t = this.headers
            .next()
            .css("display", "")
            .removeAttr("role aria-hidden aria-labelledby")
            .removeUniqueId()),
          "content" !== this.options.heightStyle && t.css("height", "");
      },
      _setOption: function (t, e) {
        return "active" === t
          ? (this._activate(e), void 0)
          : ("event" === t &&
              (this.options.event &&
                this._off(this.headers, this.options.event),
              this._setupEvents(e)),
            this._super(t, e),
            "collapsible" !== t ||
              e ||
              this.options.active !== !1 ||
              this._activate(0),
            "icons" === t && (this._destroyIcons(), e && this._createIcons()),
            void 0);
      },
      _setOptionDisabled: function (t) {
        this._super(t),
          this.element.attr("aria-disabled", t),
          this._toggleClass(null, "ui-state-disabled", !!t),
          this._toggleClass(
            this.headers.add(this.headers.next()),
            null,
            "ui-state-disabled",
            !!t
          );
      },
      _keydown: function (e) {
        if (!e.altKey && !e.ctrlKey) {
          var i = t.ui.keyCode,
            s = this.headers.length,
            n = this.headers.index(e.target),
            o = !1;
          switch (e.keyCode) {
            case i.RIGHT:
            case i.DOWN:
              o = this.headers[(n + 1) % s];
              break;
            case i.LEFT:
            case i.UP:
              o = this.headers[(n - 1 + s) % s];
              break;
            case i.SPACE:
            case i.ENTER:
              this._eventHandler(e);
              break;
            case i.HOME:
              o = this.headers[0];
              break;
            case i.END:
              o = this.headers[s - 1];
          }
          o &&
            (t(e.target).attr("tabIndex", -1),
            t(o).attr("tabIndex", 0),
            t(o).trigger("focus"),
            e.preventDefault());
        }
      },
      _panelKeyDown: function (e) {
        e.keyCode === t.ui.keyCode.UP &&
          e.ctrlKey &&
          t(e.currentTarget).prev().trigger("focus");
      },
      refresh: function () {
        var e = this.options;
        this._processPanels(),
          (e.active === !1 && e.collapsible === !0) || !this.headers.length
            ? ((e.active = !1), (this.active = t()))
            : e.active === !1
            ? this._activate(0)
            : this.active.length && !t.contains(this.element[0], this.active[0])
            ? this.headers.length ===
              this.headers.find(".ui-state-disabled").length
              ? ((e.active = !1), (this.active = t()))
              : this._activate(Math.max(0, e.active - 1))
            : (e.active = this.headers.index(this.active)),
          this._destroyIcons(),
          this._refresh();
      },
      _processPanels: function () {
        var t = this.headers,
          e = this.panels;
        (this.headers = this.element.find(this.options.header)),
          this._addClass(
            this.headers,
            "ui-accordion-header ui-accordion-header-collapsed",
            "ui-state-default"
          ),
          (this.panels = this.headers
            .next()
            .filter(":not(.ui-accordion-content-active)")
            .hide()),
          this._addClass(
            this.panels,
            "ui-accordion-content",
            "ui-helper-reset ui-widget-content"
          ),
          e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)));
      },
      _refresh: function () {
        var e,
          i = this.options,
          s = i.heightStyle,
          n = this.element.parent();
        (this.active = this._findActive(i.active)),
          this._addClass(
            this.active,
            "ui-accordion-header-active",
            "ui-state-active"
          )._removeClass(this.active, "ui-accordion-header-collapsed"),
          this._addClass(this.active.next(), "ui-accordion-content-active"),
          this.active.next().show(),
          this.headers
            .attr("role", "tab")
            .each(function () {
              var e = t(this),
                i = e.uniqueId().attr("id"),
                s = e.next(),
                n = s.uniqueId().attr("id");
              e.attr("aria-controls", n), s.attr("aria-labelledby", i);
            })
            .next()
            .attr("role", "tabpanel"),
          this.headers
            .not(this.active)
            .attr({
              "aria-selected": "false",
              "aria-expanded": "false",
              tabIndex: -1,
            })
            .next()
            .attr({ "aria-hidden": "true" })
            .hide(),
          this.active.length
            ? this.active
                .attr({
                  "aria-selected": "true",
                  "aria-expanded": "true",
                  tabIndex: 0,
                })
                .next()
                .attr({ "aria-hidden": "false" })
            : this.headers.eq(0).attr("tabIndex", 0),
          this._createIcons(),
          this._setupEvents(i.event),
          "fill" === s
            ? ((e = n.height()),
              this.element.siblings(":visible").each(function () {
                var i = t(this),
                  s = i.css("position");
                "absolute" !== s && "fixed" !== s && (e -= i.outerHeight(!0));
              }),
              this.headers.each(function () {
                e -= t(this).outerHeight(!0);
              }),
              this.headers
                .next()
                .each(function () {
                  t(this).height(
                    Math.max(0, e - t(this).innerHeight() + t(this).height())
                  );
                })
                .css("overflow", "auto"))
            : "auto" === s &&
              ((e = 0),
              this.headers
                .next()
                .each(function () {
                  var i = t(this).is(":visible");
                  i || t(this).show(),
                    (e = Math.max(e, t(this).css("height", "").height())),
                    i || t(this).hide();
                })
                .height(e));
      },
      _activate: function (e) {
        var i = this._findActive(e)[0];
        i !== this.active[0] &&
          ((i = i || this.active[0]),
          this._eventHandler({
            target: i,
            currentTarget: i,
            preventDefault: t.noop,
          }));
      },
      _findActive: function (e) {
        return "number" == typeof e ? this.headers.eq(e) : t();
      },
      _setupEvents: function (e) {
        var i = { keydown: "_keydown" };
        e &&
          t.each(e.split(" "), function (t, e) {
            i[e] = "_eventHandler";
          }),
          this._off(this.headers.add(this.headers.next())),
          this._on(this.headers, i),
          this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
          this._hoverable(this.headers),
          this._focusable(this.headers);
      },
      _eventHandler: function (e) {
        var i,
          s,
          n = this.options,
          o = this.active,
          a = t(e.currentTarget),
          r = a[0] === o[0],
          h = r && n.collapsible,
          l = h ? t() : a.next(),
          c = o.next(),
          u = {
            oldHeader: o,
            oldPanel: c,
            newHeader: h ? t() : a,
            newPanel: l,
          };
        e.preventDefault(),
          (r && !n.collapsible) ||
            this._trigger("beforeActivate", e, u) === !1 ||
            ((n.active = h ? !1 : this.headers.index(a)),
            (this.active = r ? t() : a),
            this._toggle(u),
            this._removeClass(
              o,
              "ui-accordion-header-active",
              "ui-state-active"
            ),
            n.icons &&
              ((i = o.children(".ui-accordion-header-icon")),
              this._removeClass(i, null, n.icons.activeHeader)._addClass(
                i,
                null,
                n.icons.header
              )),
            r ||
              (this._removeClass(a, "ui-accordion-header-collapsed")._addClass(
                a,
                "ui-accordion-header-active",
                "ui-state-active"
              ),
              n.icons &&
                ((s = a.children(".ui-accordion-header-icon")),
                this._removeClass(s, null, n.icons.header)._addClass(
                  s,
                  null,
                  n.icons.activeHeader
                )),
              this._addClass(a.next(), "ui-accordion-content-active")));
      },
      _toggle: function (e) {
        var i = e.newPanel,
          s = this.prevShow.length ? this.prevShow : e.oldPanel;
        this.prevShow.add(this.prevHide).stop(!0, !0),
          (this.prevShow = i),
          (this.prevHide = s),
          this.options.animate
            ? this._animate(i, s, e)
            : (s.hide(), i.show(), this._toggleComplete(e)),
          s.attr({ "aria-hidden": "true" }),
          s.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }),
          i.length && s.length
            ? s.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
            : i.length &&
              this.headers
                .filter(function () {
                  return 0 === parseInt(t(this).attr("tabIndex"), 10);
                })
                .attr("tabIndex", -1),
          i
            .attr("aria-hidden", "false")
            .prev()
            .attr({
              "aria-selected": "true",
              "aria-expanded": "true",
              tabIndex: 0,
            });
      },
      _animate: function (t, e, i) {
        var s,
          n,
          o,
          a = this,
          r = 0,
          h = t.css("box-sizing"),
          l = t.length && (!e.length || t.index() < e.index()),
          c = this.options.animate || {},
          u = (l && c.down) || c,
          d = function () {
            a._toggleComplete(i);
          };
        return (
          "number" == typeof u && (o = u),
          "string" == typeof u && (n = u),
          (n = n || u.easing || c.easing),
          (o = o || u.duration || c.duration),
          e.length
            ? t.length
              ? ((s = t.show().outerHeight()),
                e.animate(this.hideProps, {
                  duration: o,
                  easing: n,
                  step: function (t, e) {
                    e.now = Math.round(t);
                  },
                }),
                t.hide().animate(this.showProps, {
                  duration: o,
                  easing: n,
                  complete: d,
                  step: function (t, i) {
                    (i.now = Math.round(t)),
                      "height" !== i.prop
                        ? "content-box" === h && (r += i.now)
                        : "content" !== a.options.heightStyle &&
                          ((i.now = Math.round(s - e.outerHeight() - r)),
                          (r = 0));
                  },
                }),
                void 0)
              : e.animate(this.hideProps, o, n, d)
            : t.animate(this.showProps, o, n, d)
        );
      },
      _toggleComplete: function (t) {
        var e = t.oldPanel,
          i = e.prev();
        this._removeClass(e, "ui-accordion-content-active"),
          this._removeClass(i, "ui-accordion-header-active")._addClass(
            i,
            "ui-accordion-header-collapsed"
          ),
          e.length && (e.parent()[0].className = e.parent()[0].className),
          this._trigger("activate", null, t);
      },
    }),
    (t.ui.safeActiveElement = function (t) {
      var e;
      try {
        e = t.activeElement;
      } catch (i) {
        e = t.body;
      }
      return e || (e = t.body), e.nodeName || (e = t.body), e;
    }),
    t.widget("ui.menu", {
      version: "1.12.1",
      defaultElement: "<ul>",
      delay: 300,
      options: {
        icons: { submenu: "ui-icon-caret-1-e" },
        items: "> *",
        menus: "ul",
        position: { my: "left top", at: "right top" },
        role: "menu",
        blur: null,
        focus: null,
        select: null,
      },
      _create: function () {
        (this.activeMenu = this.element),
          (this.mouseHandled = !1),
          this.element
            .uniqueId()
            .attr({ role: this.options.role, tabIndex: 0 }),
          this._addClass("ui-menu", "ui-widget ui-widget-content"),
          this._on({
            "mousedown .ui-menu-item": function (t) {
              t.preventDefault();
            },
            "click .ui-menu-item": function (e) {
              var i = t(e.target),
                s = t(t.ui.safeActiveElement(this.document[0]));
              !this.mouseHandled &&
                i.not(".ui-state-disabled").length &&
                (this.select(e),
                e.isPropagationStopped() || (this.mouseHandled = !0),
                i.has(".ui-menu").length
                  ? this.expand(e)
                  : !this.element.is(":focus") &&
                    s.closest(".ui-menu").length &&
                    (this.element.trigger("focus", [!0]),
                    this.active &&
                      1 === this.active.parents(".ui-menu").length &&
                      clearTimeout(this.timer)));
            },
            "mouseenter .ui-menu-item": function (e) {
              if (!this.previousFilter) {
                var i = t(e.target).closest(".ui-menu-item"),
                  s = t(e.currentTarget);
                i[0] === s[0] &&
                  (this._removeClass(
                    s.siblings().children(".ui-state-active"),
                    null,
                    "ui-state-active"
                  ),
                  this.focus(e, s));
              }
            },
            mouseleave: "collapseAll",
            "mouseleave .ui-menu": "collapseAll",
            focus: function (t, e) {
              var i =
                this.active || this.element.find(this.options.items).eq(0);
              e || this.focus(t, i);
            },
            blur: function (e) {
              this._delay(function () {
                var i = !t.contains(
                  this.element[0],
                  t.ui.safeActiveElement(this.document[0])
                );
                i && this.collapseAll(e);
              });
            },
            keydown: "_keydown",
          }),
          this.refresh(),
          this._on(this.document, {
            click: function (t) {
              this._closeOnDocumentClick(t) && this.collapseAll(t),
                (this.mouseHandled = !1);
            },
          });
      },
      _destroy: function () {
        var e = this.element
            .find(".ui-menu-item")
            .removeAttr("role aria-disabled"),
          i = e
            .children(".ui-menu-item-wrapper")
            .removeUniqueId()
            .removeAttr("tabIndex role aria-haspopup");
        this.element
          .removeAttr("aria-activedescendant")
          .find(".ui-menu")
          .addBack()
          .removeAttr(
            "role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex"
          )
          .removeUniqueId()
          .show(),
          i.children().each(function () {
            var e = t(this);
            e.data("ui-menu-submenu-caret") && e.remove();
          });
      },
      _keydown: function (e) {
        var i,
          s,
          n,
          o,
          a = !0;
        switch (e.keyCode) {
          case t.ui.keyCode.PAGE_UP:
            this.previousPage(e);
            break;
          case t.ui.keyCode.PAGE_DOWN:
            this.nextPage(e);
            break;
          case t.ui.keyCode.HOME:
            this._move("first", "first", e);
            break;
          case t.ui.keyCode.END:
            this._move("last", "last", e);
            break;
          case t.ui.keyCode.UP:
            this.previous(e);
            break;
          case t.ui.keyCode.DOWN:
            this.next(e);
            break;
          case t.ui.keyCode.LEFT:
            this.collapse(e);
            break;
          case t.ui.keyCode.RIGHT:
            this.active &&
              !this.active.is(".ui-state-disabled") &&
              this.expand(e);
            break;
          case t.ui.keyCode.ENTER:
          case t.ui.keyCode.SPACE:
            this._activate(e);
            break;
          case t.ui.keyCode.ESCAPE:
            this.collapse(e);
            break;
          default:
            (a = !1),
              (s = this.previousFilter || ""),
              (o = !1),
              (n =
                e.keyCode >= 96 && 105 >= e.keyCode
                  ? "" + (e.keyCode - 96)
                  : String.fromCharCode(e.keyCode)),
              clearTimeout(this.filterTimer),
              n === s ? (o = !0) : (n = s + n),
              (i = this._filterMenuItems(n)),
              (i =
                o && -1 !== i.index(this.active.next())
                  ? this.active.nextAll(".ui-menu-item")
                  : i),
              i.length ||
                ((n = String.fromCharCode(e.keyCode)),
                (i = this._filterMenuItems(n))),
              i.length
                ? (this.focus(e, i),
                  (this.previousFilter = n),
                  (this.filterTimer = this._delay(function () {
                    delete this.previousFilter;
                  }, 1e3)))
                : delete this.previousFilter;
        }
        a && e.preventDefault();
      },
      _activate: function (t) {
        this.active &&
          !this.active.is(".ui-state-disabled") &&
          (this.active.children("[aria-haspopup='true']").length
            ? this.expand(t)
            : this.select(t));
      },
      refresh: function () {
        var e,
          i,
          s,
          n,
          o,
          a = this,
          r = this.options.icons.submenu,
          h = this.element.find(this.options.menus);
        this._toggleClass(
          "ui-menu-icons",
          null,
          !!this.element.find(".ui-icon").length
        ),
          (s = h
            .filter(":not(.ui-menu)")
            .hide()
            .attr({
              role: this.options.role,
              "aria-hidden": "true",
              "aria-expanded": "false",
            })
            .each(function () {
              var e = t(this),
                i = e.prev(),
                s = t("<span>").data("ui-menu-submenu-caret", !0);
              a._addClass(s, "ui-menu-icon", "ui-icon " + r),
                i.attr("aria-haspopup", "true").prepend(s),
                e.attr("aria-labelledby", i.attr("id"));
            })),
          this._addClass(s, "ui-menu", "ui-widget ui-widget-content ui-front"),
          (e = h.add(this.element)),
          (i = e.find(this.options.items)),
          i.not(".ui-menu-item").each(function () {
            var e = t(this);
            a._isDivider(e) &&
              a._addClass(e, "ui-menu-divider", "ui-widget-content");
          }),
          (n = i.not(".ui-menu-item, .ui-menu-divider")),
          (o = n
            .children()
            .not(".ui-menu")
            .uniqueId()
            .attr({ tabIndex: -1, role: this._itemRole() })),
          this._addClass(n, "ui-menu-item")._addClass(
            o,
            "ui-menu-item-wrapper"
          ),
          i.filter(".ui-state-disabled").attr("aria-disabled", "true"),
          this.active &&
            !t.contains(this.element[0], this.active[0]) &&
            this.blur();
      },
      _itemRole: function () {
        return { menu: "menuitem", listbox: "option" }[this.options.role];
      },
      _setOption: function (t, e) {
        if ("icons" === t) {
          var i = this.element.find(".ui-menu-icon");
          this._removeClass(i, null, this.options.icons.submenu)._addClass(
            i,
            null,
            e.submenu
          );
        }
        this._super(t, e);
      },
      _setOptionDisabled: function (t) {
        this._super(t),
          this.element.attr("aria-disabled", t + ""),
          this._toggleClass(null, "ui-state-disabled", !!t);
      },
      focus: function (t, e) {
        var i, s, n;
        this.blur(t, t && "focus" === t.type),
          this._scrollIntoView(e),
          (this.active = e.first()),
          (s = this.active.children(".ui-menu-item-wrapper")),
          this._addClass(s, null, "ui-state-active"),
          this.options.role &&
            this.element.attr("aria-activedescendant", s.attr("id")),
          (n = this.active
            .parent()
            .closest(".ui-menu-item")
            .children(".ui-menu-item-wrapper")),
          this._addClass(n, null, "ui-state-active"),
          t && "keydown" === t.type
            ? this._close()
            : (this.timer = this._delay(function () {
                this._close();
              }, this.delay)),
          (i = e.children(".ui-menu")),
          i.length && t && /^mouse/.test(t.type) && this._startOpening(i),
          (this.activeMenu = e.parent()),
          this._trigger("focus", t, { item: e });
      },
      _scrollIntoView: function (e) {
        var i, s, n, o, a, r;
        this._hasScroll() &&
          ((i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0),
          (s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0),
          (n = e.offset().top - this.activeMenu.offset().top - i - s),
          (o = this.activeMenu.scrollTop()),
          (a = this.activeMenu.height()),
          (r = e.outerHeight()),
          0 > n
            ? this.activeMenu.scrollTop(o + n)
            : n + r > a && this.activeMenu.scrollTop(o + n - a + r));
      },
      blur: function (t, e) {
        e || clearTimeout(this.timer),
          this.active &&
            (this._removeClass(
              this.active.children(".ui-menu-item-wrapper"),
              null,
              "ui-state-active"
            ),
            this._trigger("blur", t, { item: this.active }),
            (this.active = null));
      },
      _startOpening: function (t) {
        clearTimeout(this.timer),
          "true" === t.attr("aria-hidden") &&
            (this.timer = this._delay(function () {
              this._close(), this._open(t);
            }, this.delay));
      },
      _open: function (e) {
        var i = t.extend({ of: this.active }, this.options.position);
        clearTimeout(this.timer),
          this.element
            .find(".ui-menu")
            .not(e.parents(".ui-menu"))
            .hide()
            .attr("aria-hidden", "true"),
          e
            .show()
            .removeAttr("aria-hidden")
            .attr("aria-expanded", "true")
            .position(i);
      },
      collapseAll: function (e, i) {
        clearTimeout(this.timer),
          (this.timer = this._delay(function () {
            var s = i
              ? this.element
              : t(e && e.target).closest(this.element.find(".ui-menu"));
            s.length || (s = this.element),
              this._close(s),
              this.blur(e),
              this._removeClass(
                s.find(".ui-state-active"),
                null,
                "ui-state-active"
              ),
              (this.activeMenu = s);
          }, this.delay));
      },
      _close: function (t) {
        t || (t = this.active ? this.active.parent() : this.element),
          t
            .find(".ui-menu")
            .hide()
            .attr("aria-hidden", "true")
            .attr("aria-expanded", "false");
      },
      _closeOnDocumentClick: function (e) {
        return !t(e.target).closest(".ui-menu").length;
      },
      _isDivider: function (t) {
        return !/[^\-\u2014\u2013\s]/.test(t.text());
      },
      collapse: function (t) {
        var e =
          this.active &&
          this.active.parent().closest(".ui-menu-item", this.element);
        e && e.length && (this._close(), this.focus(t, e));
      },
      expand: function (t) {
        var e =
          this.active &&
          this.active.children(".ui-menu ").find(this.options.items).first();
        e &&
          e.length &&
          (this._open(e.parent()),
          this._delay(function () {
            this.focus(t, e);
          }));
      },
      next: function (t) {
        this._move("next", "first", t);
      },
      previous: function (t) {
        this._move("prev", "last", t);
      },
      isFirstItem: function () {
        return this.active && !this.active.prevAll(".ui-menu-item").length;
      },
      isLastItem: function () {
        return this.active && !this.active.nextAll(".ui-menu-item").length;
      },
      _move: function (t, e, i) {
        var s;
        this.active &&
          (s =
            "first" === t || "last" === t
              ? this.active["first" === t ? "prevAll" : "nextAll"](
                  ".ui-menu-item"
                ).eq(-1)
              : this.active[t + "All"](".ui-menu-item").eq(0)),
          (s && s.length && this.active) ||
            (s = this.activeMenu.find(this.options.items)[e]()),
          this.focus(i, s);
      },
      nextPage: function (e) {
        var i, s, n;
        return this.active
          ? (this.isLastItem() ||
              (this._hasScroll()
                ? ((s = this.active.offset().top),
                  (n = this.element.height()),
                  this.active.nextAll(".ui-menu-item").each(function () {
                    return (i = t(this)), 0 > i.offset().top - s - n;
                  }),
                  this.focus(e, i))
                : this.focus(
                    e,
                    this.activeMenu
                      .find(this.options.items)
                      [this.active ? "last" : "first"]()
                  )),
            void 0)
          : (this.next(e), void 0);
      },
      previousPage: function (e) {
        var i, s, n;
        return this.active
          ? (this.isFirstItem() ||
              (this._hasScroll()
                ? ((s = this.active.offset().top),
                  (n = this.element.height()),
                  this.active.prevAll(".ui-menu-item").each(function () {
                    return (i = t(this)), i.offset().top - s + n > 0;
                  }),
                  this.focus(e, i))
                : this.focus(
                    e,
                    this.activeMenu.find(this.options.items).first()
                  )),
            void 0)
          : (this.next(e), void 0);
      },
      _hasScroll: function () {
        return this.element.outerHeight() < this.element.prop("scrollHeight");
      },
      select: function (e) {
        this.active = this.active || t(e.target).closest(".ui-menu-item");
        var i = { item: this.active };
        this.active.has(".ui-menu").length || this.collapseAll(e, !0),
          this._trigger("select", e, i);
      },
      _filterMenuItems: function (e) {
        var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
          s = RegExp("^" + i, "i");
        return this.activeMenu
          .find(this.options.items)
          .filter(".ui-menu-item")
          .filter(function () {
            return s.test(
              t.trim(t(this).children(".ui-menu-item-wrapper").text())
            );
          });
      },
    }),
    t.widget("ui.autocomplete", {
      version: "1.12.1",
      defaultElement: "<input>",
      options: {
        appendTo: null,
        autoFocus: !1,
        delay: 300,
        minLength: 1,
        position: { my: "left top", at: "left bottom", collision: "none" },
        source: null,
        change: null,
        close: null,
        focus: null,
        open: null,
        response: null,
        search: null,
        select: null,
      },
      requestIndex: 0,
      pending: 0,
      _create: function () {
        var e,
          i,
          s,
          n = this.element[0].nodeName.toLowerCase(),
          o = "textarea" === n,
          a = "input" === n;
        (this.isMultiLine = o || (!a && this._isContentEditable(this.element))),
          (this.valueMethod = this.element[o || a ? "val" : "text"]),
          (this.isNewMenu = !0),
          this._addClass("ui-autocomplete-input"),
          this.element.attr("autocomplete", "off"),
          this._on(this.element, {
            keydown: function (n) {
              if (this.element.prop("readOnly"))
                return (e = !0), (s = !0), (i = !0), void 0;
              (e = !1), (s = !1), (i = !1);
              var o = t.ui.keyCode;
              switch (n.keyCode) {
                case o.PAGE_UP:
                  (e = !0), this._move("previousPage", n);
                  break;
                case o.PAGE_DOWN:
                  (e = !0), this._move("nextPage", n);
                  break;
                case o.UP:
                  (e = !0), this._keyEvent("previous", n);
                  break;
                case o.DOWN:
                  (e = !0), this._keyEvent("next", n);
                  break;
                case o.ENTER:
                  this.menu.active &&
                    ((e = !0), n.preventDefault(), this.menu.select(n));
                  break;
                case o.TAB:
                  this.menu.active && this.menu.select(n);
                  break;
                case o.ESCAPE:
                  this.menu.element.is(":visible") &&
                    (this.isMultiLine || this._value(this.term),
                    this.close(n),
                    n.preventDefault());
                  break;
                default:
                  (i = !0), this._searchTimeout(n);
              }
            },
            keypress: function (s) {
              if (e)
                return (
                  (e = !1),
                  (!this.isMultiLine || this.menu.element.is(":visible")) &&
                    s.preventDefault(),
                  void 0
                );
              if (!i) {
                var n = t.ui.keyCode;
                switch (s.keyCode) {
                  case n.PAGE_UP:
                    this._move("previousPage", s);
                    break;
                  case n.PAGE_DOWN:
                    this._move("nextPage", s);
                    break;
                  case n.UP:
                    this._keyEvent("previous", s);
                    break;
                  case n.DOWN:
                    this._keyEvent("next", s);
                }
              }
            },
            input: function (t) {
              return s
                ? ((s = !1), t.preventDefault(), void 0)
                : (this._searchTimeout(t), void 0);
            },
            focus: function () {
              (this.selectedItem = null), (this.previous = this._value());
            },
            blur: function (t) {
              return this.cancelBlur
                ? (delete this.cancelBlur, void 0)
                : (clearTimeout(this.searching),
                  this.close(t),
                  this._change(t),
                  void 0);
            },
          }),
          this._initSource(),
          (this.menu = t("<ul>")
            .appendTo(this._appendTo())
            .menu({ role: null })
            .hide()
            .menu("instance")),
          this._addClass(this.menu.element, "ui-autocomplete", "ui-front"),
          this._on(this.menu.element, {
            mousedown: function (e) {
              e.preventDefault(),
                (this.cancelBlur = !0),
                this._delay(function () {
                  delete this.cancelBlur,
                    this.element[0] !==
                      t.ui.safeActiveElement(this.document[0]) &&
                      this.element.trigger("focus");
                });
            },
            menufocus: function (e, i) {
              var s, n;
              return this.isNewMenu &&
                ((this.isNewMenu = !1),
                e.originalEvent && /^mouse/.test(e.originalEvent.type))
                ? (this.menu.blur(),
                  this.document.one("mousemove", function () {
                    t(e.target).trigger(e.originalEvent);
                  }),
                  void 0)
                : ((n = i.item.data("ui-autocomplete-item")),
                  !1 !== this._trigger("focus", e, { item: n }) &&
                    e.originalEvent &&
                    /^key/.test(e.originalEvent.type) &&
                    this._value(n.value),
                  (s = i.item.attr("aria-label") || n.value),
                  s &&
                    t.trim(s).length &&
                    (this.liveRegion.children().hide(),
                    t("<div>").text(s).appendTo(this.liveRegion)),
                  void 0);
            },
            menuselect: function (e, i) {
              var s = i.item.data("ui-autocomplete-item"),
                n = this.previous;
              this.element[0] !== t.ui.safeActiveElement(this.document[0]) &&
                (this.element.trigger("focus"),
                (this.previous = n),
                this._delay(function () {
                  (this.previous = n), (this.selectedItem = s);
                })),
                !1 !== this._trigger("select", e, { item: s }) &&
                  this._value(s.value),
                (this.term = this._value()),
                this.close(e),
                (this.selectedItem = s);
            },
          }),
          (this.liveRegion = t("<div>", {
            role: "status",
            "aria-live": "assertive",
            "aria-relevant": "additions",
          }).appendTo(this.document[0].body)),
          this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
          this._on(this.window, {
            beforeunload: function () {
              this.element.removeAttr("autocomplete");
            },
          });
      },
      _destroy: function () {
        clearTimeout(this.searching),
          this.element.removeAttr("autocomplete"),
          this.menu.element.remove(),
          this.liveRegion.remove();
      },
      _setOption: function (t, e) {
        this._super(t, e),
          "source" === t && this._initSource(),
          "appendTo" === t && this.menu.element.appendTo(this._appendTo()),
          "disabled" === t && e && this.xhr && this.xhr.abort();
      },
      _isEventTargetInWidget: function (e) {
        var i = this.menu.element[0];
        return (
          e.target === this.element[0] ||
          e.target === i ||
          t.contains(i, e.target)
        );
      },
      _closeOnClickOutside: function (t) {
        this._isEventTargetInWidget(t) || this.close();
      },
      _appendTo: function () {
        var e = this.options.appendTo;
        return (
          e &&
            (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)),
          (e && e[0]) || (e = this.element.closest(".ui-front, dialog")),
          e.length || (e = this.document[0].body),
          e
        );
      },
      _initSource: function () {
        var e,
          i,
          s = this;
        t.isArray(this.options.source)
          ? ((e = this.options.source),
            (this.source = function (i, s) {
              s(t.ui.autocomplete.filter(e, i.term));
            }))
          : "string" == typeof this.options.source
          ? ((i = this.options.source),
            (this.source = function (e, n) {
              s.xhr && s.xhr.abort(),
                (s.xhr = t.ajax({
                  url: i,
                  data: e,
                  dataType: "json",
                  success: function (t) {
                    n(t);
                  },
                  error: function () {
                    n([]);
                  },
                }));
            }))
          : (this.source = this.options.source);
      },
      _searchTimeout: function (t) {
        clearTimeout(this.searching),
          (this.searching = this._delay(function () {
            var e = this.term === this._value(),
              i = this.menu.element.is(":visible"),
              s = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
            (!e || (e && !i && !s)) &&
              ((this.selectedItem = null), this.search(null, t));
          }, this.options.delay));
      },
      search: function (t, e) {
        return (
          (t = null != t ? t : this._value()),
          (this.term = this._value()),
          t.length < this.options.minLength
            ? this.close(e)
            : this._trigger("search", e) !== !1
            ? this._search(t)
            : void 0
        );
      },
      _search: function (t) {
        this.pending++,
          this._addClass("ui-autocomplete-loading"),
          (this.cancelSearch = !1),
          this.source({ term: t }, this._response());
      },
      _response: function () {
        var e = ++this.requestIndex;
        return t.proxy(function (t) {
          e === this.requestIndex && this.__response(t),
            this.pending--,
            this.pending || this._removeClass("ui-autocomplete-loading");
        }, this);
      },
      __response: function (t) {
        t && (t = this._normalize(t)),
          this._trigger("response", null, { content: t }),
          !this.options.disabled && t && t.length && !this.cancelSearch
            ? (this._suggest(t), this._trigger("open"))
            : this._close();
      },
      close: function (t) {
        (this.cancelSearch = !0), this._close(t);
      },
      _close: function (t) {
        this._off(this.document, "mousedown"),
          this.menu.element.is(":visible") &&
            (this.menu.element.hide(),
            this.menu.blur(),
            (this.isNewMenu = !0),
            this._trigger("close", t));
      },
      _change: function (t) {
        this.previous !== this._value() &&
          this._trigger("change", t, { item: this.selectedItem });
      },
      _normalize: function (e) {
        return e.length && e[0].label && e[0].value
          ? e
          : t.map(e, function (e) {
              return "string" == typeof e
                ? { label: e, value: e }
                : t.extend({}, e, {
                    label: e.label || e.value,
                    value: e.value || e.label,
                  });
            });
      },
      _suggest: function (e) {
        var i = this.menu.element.empty();
        this._renderMenu(i, e),
          (this.isNewMenu = !0),
          this.menu.refresh(),
          i.show(),
          this._resizeMenu(),
          i.position(t.extend({ of: this.element }, this.options.position)),
          this.options.autoFocus && this.menu.next(),
          this._on(this.document, { mousedown: "_closeOnClickOutside" });
      },
      _resizeMenu: function () {
        var t = this.menu.element;
        t.outerWidth(
          Math.max(t.width("").outerWidth() + 1, this.element.outerWidth())
        );
      },
      _renderMenu: function (e, i) {
        var s = this;
        t.each(i, function (t, i) {
          s._renderItemData(e, i);
        });
      },
      _renderItemData: function (t, e) {
        return this._renderItem(t, e).data("ui-autocomplete-item", e);
      },
      _renderItem: function (e, i) {
        return t("<li>").append(t("<div>").text(i.label)).appendTo(e);
      },
      _move: function (t, e) {
        return this.menu.element.is(":visible")
          ? (this.menu.isFirstItem() && /^previous/.test(t)) ||
            (this.menu.isLastItem() && /^next/.test(t))
            ? (this.isMultiLine || this._value(this.term),
              this.menu.blur(),
              void 0)
            : (this.menu[t](e), void 0)
          : (this.search(null, e), void 0);
      },
      widget: function () {
        return this.menu.element;
      },
      _value: function () {
        return this.valueMethod.apply(this.element, arguments);
      },
      _keyEvent: function (t, e) {
        (!this.isMultiLine || this.menu.element.is(":visible")) &&
          (this._move(t, e), e.preventDefault());
      },
      _isContentEditable: function (t) {
        if (!t.length) return !1;
        var e = t.prop("contentEditable");
        return "inherit" === e
          ? this._isContentEditable(t.parent())
          : "true" === e;
      },
    }),
    t.extend(t.ui.autocomplete, {
      escapeRegex: function (t) {
        return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      },
      filter: function (e, i) {
        var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
        return t.grep(e, function (t) {
          return s.test(t.label || t.value || t);
        });
      },
    }),
    t.widget("ui.autocomplete", t.ui.autocomplete, {
      options: {
        messages: {
          noResults: "No search results.",
          results: function (t) {
            return (
              t +
              (t > 1 ? " results are" : " result is") +
              " available, use up and down arrow keys to navigate."
            );
          },
        },
      },
      __response: function (e) {
        var i;
        this._superApply(arguments),
          this.options.disabled ||
            this.cancelSearch ||
            ((i =
              e && e.length
                ? this.options.messages.results(e.length)
                : this.options.messages.noResults),
            this.liveRegion.children().hide(),
            t("<div>").text(i).appendTo(this.liveRegion));
      },
    }),
    t.ui.autocomplete;
  var g = /ui-corner-([a-z]){2,6}/g;
  t.widget("ui.controlgroup", {
    version: "1.12.1",
    defaultElement: "<div>",
    options: {
      direction: "horizontal",
      disabled: null,
      onlyVisible: !0,
      items: {
        button:
          "input[type=button], input[type=submit], input[type=reset], button, a",
        controlgroupLabel: ".ui-controlgroup-label",
        checkboxradio: "input[type='checkbox'], input[type='radio']",
        selectmenu: "select",
        spinner: ".ui-spinner-input",
      },
    },
    _create: function () {
      this._enhance();
    },
    _enhance: function () {
      this.element.attr("role", "toolbar"), this.refresh();
    },
    _destroy: function () {
      this._callChildMethod("destroy"),
        this.childWidgets.removeData("ui-controlgroup-data"),
        this.element.removeAttr("role"),
        this.options.items.controlgroupLabel &&
          this.element
            .find(this.options.items.controlgroupLabel)
            .find(".ui-controlgroup-label-contents")
            .contents()
            .unwrap();
    },
    _initWidgets: function () {
      var e = this,
        i = [];
      t.each(this.options.items, function (s, n) {
        var o,
          a = {};
        return n
          ? "controlgroupLabel" === s
            ? ((o = e.element.find(n)),
              o.each(function () {
                var e = t(this);
                e.children(".ui-controlgroup-label-contents").length ||
                  e
                    .contents()
                    .wrapAll(
                      "<span class='ui-controlgroup-label-contents'></span>"
                    );
              }),
              e._addClass(
                o,
                null,
                "ui-widget ui-widget-content ui-state-default"
              ),
              (i = i.concat(o.get())),
              void 0)
            : (t.fn[s] &&
                ((a = e["_" + s + "Options"]
                  ? e["_" + s + "Options"]("middle")
                  : { classes: {} }),
                e.element.find(n).each(function () {
                  var n = t(this),
                    o = n[s]("instance"),
                    r = t.widget.extend({}, a);
                  if ("button" !== s || !n.parent(".ui-spinner").length) {
                    o || (o = n[s]()[s]("instance")),
                      o && (r.classes = e._resolveClassesValues(r.classes, o)),
                      n[s](r);
                    var h = n[s]("widget");
                    t.data(
                      h[0],
                      "ui-controlgroup-data",
                      o ? o : n[s]("instance")
                    ),
                      i.push(h[0]);
                  }
                })),
              void 0)
          : void 0;
      }),
        (this.childWidgets = t(t.unique(i))),
        this._addClass(this.childWidgets, "ui-controlgroup-item");
    },
    _callChildMethod: function (e) {
      this.childWidgets.each(function () {
        var i = t(this),
          s = i.data("ui-controlgroup-data");
        s && s[e] && s[e]();
      });
    },
    _updateCornerClass: function (t, e) {
      var i =
          "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",
        s = this._buildSimpleOptions(e, "label").classes.label;
      this._removeClass(t, null, i), this._addClass(t, null, s);
    },
    _buildSimpleOptions: function (t, e) {
      var i = "vertical" === this.options.direction,
        s = { classes: {} };
      return (
        (s.classes[e] = {
          middle: "",
          first: "ui-corner-" + (i ? "top" : "left"),
          last: "ui-corner-" + (i ? "bottom" : "right"),
          only: "ui-corner-all",
        }[t]),
        s
      );
    },
    _spinnerOptions: function (t) {
      var e = this._buildSimpleOptions(t, "ui-spinner");
      return (
        (e.classes["ui-spinner-up"] = ""),
        (e.classes["ui-spinner-down"] = ""),
        e
      );
    },
    _buttonOptions: function (t) {
      return this._buildSimpleOptions(t, "ui-button");
    },
    _checkboxradioOptions: function (t) {
      return this._buildSimpleOptions(t, "ui-checkboxradio-label");
    },
    _selectmenuOptions: function (t) {
      var e = "vertical" === this.options.direction;
      return {
        width: e ? "auto" : !1,
        classes: {
          middle: {
            "ui-selectmenu-button-open": "",
            "ui-selectmenu-button-closed": "",
          },
          first: {
            "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
            "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left"),
          },
          last: {
            "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
            "ui-selectmenu-button-closed":
              "ui-corner-" + (e ? "bottom" : "right"),
          },
          only: {
            "ui-selectmenu-button-open": "ui-corner-top",
            "ui-selectmenu-button-closed": "ui-corner-all",
          },
        }[t],
      };
    },
    _resolveClassesValues: function (e, i) {
      var s = {};
      return (
        t.each(e, function (n) {
          var o = i.options.classes[n] || "";
          (o = t.trim(o.replace(g, ""))),
            (s[n] = (o + " " + e[n]).replace(/\s+/g, " "));
        }),
        s
      );
    },
    _setOption: function (t, e) {
      return (
        "direction" === t &&
          this._removeClass("ui-controlgroup-" + this.options.direction),
        this._super(t, e),
        "disabled" === t
          ? (this._callChildMethod(e ? "disable" : "enable"), void 0)
          : (this.refresh(), void 0)
      );
    },
    refresh: function () {
      var e,
        i = this;
      this._addClass(
        "ui-controlgroup ui-controlgroup-" + this.options.direction
      ),
        "horizontal" === this.options.direction &&
          this._addClass(null, "ui-helper-clearfix"),
        this._initWidgets(),
        (e = this.childWidgets),
        this.options.onlyVisible && (e = e.filter(":visible")),
        e.length &&
          (t.each(["first", "last"], function (t, s) {
            var n = e[s]().data("ui-controlgroup-data");
            if (n && i["_" + n.widgetName + "Options"]) {
              var o = i["_" + n.widgetName + "Options"](
                1 === e.length ? "only" : s
              );
              (o.classes = i._resolveClassesValues(o.classes, n)),
                n.element[n.widgetName](o);
            } else i._updateCornerClass(e[s](), s);
          }),
          this._callChildMethod("refresh"));
    },
  }),
    t.widget("ui.checkboxradio", [
      t.ui.formResetMixin,
      {
        version: "1.12.1",
        options: {
          disabled: null,
          label: null,
          icon: !0,
          classes: {
            "ui-checkboxradio-label": "ui-corner-all",
            "ui-checkboxradio-icon": "ui-corner-all",
          },
        },
        _getCreateOptions: function () {
          var e,
            i,
            s = this,
            n = this._super() || {};
          return (
            this._readType(),
            (i = this.element.labels()),
            (this.label = t(i[i.length - 1])),
            this.label.length ||
              t.error("No label found for checkboxradio widget"),
            (this.originalLabel = ""),
            this.label
              .contents()
              .not(this.element[0])
              .each(function () {
                s.originalLabel +=
                  3 === this.nodeType ? t(this).text() : this.outerHTML;
              }),
            this.originalLabel && (n.label = this.originalLabel),
            (e = this.element[0].disabled),
            null != e && (n.disabled = e),
            n
          );
        },
        _create: function () {
          var t = this.element[0].checked;
          this._bindFormResetHandler(),
            null == this.options.disabled &&
              (this.options.disabled = this.element[0].disabled),
            this._setOption("disabled", this.options.disabled),
            this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"),
            this._addClass(
              this.label,
              "ui-checkboxradio-label",
              "ui-button ui-widget"
            ),
            "radio" === this.type &&
              this._addClass(this.label, "ui-checkboxradio-radio-label"),
            this.options.label && this.options.label !== this.originalLabel
              ? this._updateLabel()
              : this.originalLabel && (this.options.label = this.originalLabel),
            this._enhance(),
            t &&
              (this._addClass(
                this.label,
                "ui-checkboxradio-checked",
                "ui-state-active"
              ),
              this.icon && this._addClass(this.icon, null, "ui-state-hover")),
            this._on({
              change: "_toggleClasses",
              focus: function () {
                this._addClass(
                  this.label,
                  null,
                  "ui-state-focus ui-visual-focus"
                );
              },
              blur: function () {
                this._removeClass(
                  this.label,
                  null,
                  "ui-state-focus ui-visual-focus"
                );
              },
            });
        },
        _readType: function () {
          var e = this.element[0].nodeName.toLowerCase();
          (this.type = this.element[0].type),
            ("input" === e && /radio|checkbox/.test(this.type)) ||
              t.error(
                "Can't create checkboxradio on element.nodeName=" +
                  e +
                  " and element.type=" +
                  this.type
              );
        },
        _enhance: function () {
          this._updateIcon(this.element[0].checked);
        },
        widget: function () {
          return this.label;
        },
        _getRadioGroup: function () {
          var e,
            i = this.element[0].name,
            s = "input[name='" + t.ui.escapeSelector(i) + "']";
          return i
            ? ((e = this.form.length
                ? t(this.form[0].elements).filter(s)
                : t(s).filter(function () {
                    return 0 === t(this).form().length;
                  })),
              e.not(this.element))
            : t([]);
        },
        _toggleClasses: function () {
          var e = this.element[0].checked;
          this._toggleClass(
            this.label,
            "ui-checkboxradio-checked",
            "ui-state-active",
            e
          ),
            this.options.icon &&
              "checkbox" === this.type &&
              this._toggleClass(
                this.icon,
                null,
                "ui-icon-check ui-state-checked",
                e
              )._toggleClass(this.icon, null, "ui-icon-blank", !e),
            "radio" === this.type &&
              this._getRadioGroup().each(function () {
                var e = t(this).checkboxradio("instance");
                e &&
                  e._removeClass(
                    e.label,
                    "ui-checkboxradio-checked",
                    "ui-state-active"
                  );
              });
        },
        _destroy: function () {
          this._unbindFormResetHandler(),
            this.icon && (this.icon.remove(), this.iconSpace.remove());
        },
        _setOption: function (t, e) {
          return "label" !== t || e
            ? (this._super(t, e),
              "disabled" === t
                ? (this._toggleClass(this.label, null, "ui-state-disabled", e),
                  (this.element[0].disabled = e),
                  void 0)
                : (this.refresh(), void 0))
            : void 0;
        },
        _updateIcon: function (e) {
          var i = "ui-icon ui-icon-background ";
          this.options.icon
            ? (this.icon ||
                ((this.icon = t("<span>")),
                (this.iconSpace = t("<span> </span>")),
                this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")),
              "checkbox" === this.type
                ? ((i += e
                    ? "ui-icon-check ui-state-checked"
                    : "ui-icon-blank"),
                  this._removeClass(
                    this.icon,
                    null,
                    e ? "ui-icon-blank" : "ui-icon-check"
                  ))
                : (i += "ui-icon-blank"),
              this._addClass(this.icon, "ui-checkboxradio-icon", i),
              e ||
                this._removeClass(
                  this.icon,
                  null,
                  "ui-icon-check ui-state-checked"
                ),
              this.icon.prependTo(this.label).after(this.iconSpace))
            : void 0 !== this.icon &&
              (this.icon.remove(), this.iconSpace.remove(), delete this.icon);
        },
        _updateLabel: function () {
          var t = this.label.contents().not(this.element[0]);
          this.icon && (t = t.not(this.icon[0])),
            this.iconSpace && (t = t.not(this.iconSpace[0])),
            t.remove(),
            this.label.append(this.options.label);
        },
        refresh: function () {
          var t = this.element[0].checked,
            e = this.element[0].disabled;
          this._updateIcon(t),
            this._toggleClass(
              this.label,
              "ui-checkboxradio-checked",
              "ui-state-active",
              t
            ),
            null !== this.options.label && this._updateLabel(),
            e !== this.options.disabled && this._setOptions({ disabled: e });
        },
      },
    ]),
    t.ui.checkboxradio,
    t.widget("ui.button", {
      version: "1.12.1",
      defaultElement: "<button>",
      options: {
        classes: { "ui-button": "ui-corner-all" },
        disabled: null,
        icon: null,
        iconPosition: "beginning",
        label: null,
        showLabel: !0,
      },
      _getCreateOptions: function () {
        var t,
          e = this._super() || {};
        return (
          (this.isInput = this.element.is("input")),
          (t = this.element[0].disabled),
          null != t && (e.disabled = t),
          (this.originalLabel = this.isInput
            ? this.element.val()
            : this.element.html()),
          this.originalLabel && (e.label = this.originalLabel),
          e
        );
      },
      _create: function () {
        !this.option.showLabel & !this.options.icon &&
          (this.options.showLabel = !0),
          null == this.options.disabled &&
            (this.options.disabled = this.element[0].disabled || !1),
          (this.hasTitle = !!this.element.attr("title")),
          this.options.label &&
            this.options.label !== this.originalLabel &&
            (this.isInput
              ? this.element.val(this.options.label)
              : this.element.html(this.options.label)),
          this._addClass("ui-button", "ui-widget"),
          this._setOption("disabled", this.options.disabled),
          this._enhance(),
          this.element.is("a") &&
            this._on({
              keyup: function (e) {
                e.keyCode === t.ui.keyCode.SPACE &&
                  (e.preventDefault(),
                  this.element[0].click
                    ? this.element[0].click()
                    : this.element.trigger("click"));
              },
            });
      },
      _enhance: function () {
        this.element.is("button") || this.element.attr("role", "button"),
          this.options.icon &&
            (this._updateIcon("icon", this.options.icon),
            this._updateTooltip());
      },
      _updateTooltip: function () {
        (this.title = this.element.attr("title")),
          this.options.showLabel ||
            this.title ||
            this.element.attr("title", this.options.label);
      },
      _updateIcon: function (e, i) {
        var s = "iconPosition" !== e,
          n = s ? this.options.iconPosition : i,
          o = "top" === n || "bottom" === n;
        this.icon
          ? s && this._removeClass(this.icon, null, this.options.icon)
          : ((this.icon = t("<span>")),
            this._addClass(this.icon, "ui-button-icon", "ui-icon"),
            this.options.showLabel || this._addClass("ui-button-icon-only")),
          s && this._addClass(this.icon, null, i),
          this._attachIcon(n),
          o
            ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
              this.iconSpace && this.iconSpace.remove())
            : (this.iconSpace ||
                ((this.iconSpace = t("<span> </span>")),
                this._addClass(this.iconSpace, "ui-button-icon-space")),
              this._removeClass(this.icon, null, "ui-wiget-icon-block"),
              this._attachIconSpace(n));
      },
      _destroy: function () {
        this.element.removeAttr("role"),
          this.icon && this.icon.remove(),
          this.iconSpace && this.iconSpace.remove(),
          this.hasTitle || this.element.removeAttr("title");
      },
      _attachIconSpace: function (t) {
        this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](
          this.iconSpace
        );
      },
      _attachIcon: function (t) {
        this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](
          this.icon
        );
      },
      _setOptions: function (t) {
        var e = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
          i = void 0 === t.icon ? this.options.icon : t.icon;
        e || i || (t.showLabel = !0), this._super(t);
      },
      _setOption: function (t, e) {
        "icon" === t &&
          (e
            ? this._updateIcon(t, e)
            : this.icon &&
              (this.icon.remove(), this.iconSpace && this.iconSpace.remove())),
          "iconPosition" === t && this._updateIcon(t, e),
          "showLabel" === t &&
            (this._toggleClass("ui-button-icon-only", null, !e),
            this._updateTooltip()),
          "label" === t &&
            (this.isInput
              ? this.element.val(e)
              : (this.element.html(e),
                this.icon &&
                  (this._attachIcon(this.options.iconPosition),
                  this._attachIconSpace(this.options.iconPosition)))),
          this._super(t, e),
          "disabled" === t &&
            (this._toggleClass(null, "ui-state-disabled", e),
            (this.element[0].disabled = e),
            e && this.element.blur());
      },
      refresh: function () {
        var t = this.element.is("input, button")
          ? this.element[0].disabled
          : this.element.hasClass("ui-button-disabled");
        t !== this.options.disabled && this._setOptions({ disabled: t }),
          this._updateTooltip();
      },
    }),
    t.uiBackCompat !== !1 &&
      (t.widget("ui.button", t.ui.button, {
        options: { text: !0, icons: { primary: null, secondary: null } },
        _create: function () {
          this.options.showLabel &&
            !this.options.text &&
            (this.options.showLabel = this.options.text),
            !this.options.showLabel &&
              this.options.text &&
              (this.options.text = this.options.showLabel),
            this.options.icon ||
            (!this.options.icons.primary && !this.options.icons.secondary)
              ? this.options.icon &&
                (this.options.icons.primary = this.options.icon)
              : this.options.icons.primary
              ? (this.options.icon = this.options.icons.primary)
              : ((this.options.icon = this.options.icons.secondary),
                (this.options.iconPosition = "end")),
            this._super();
        },
        _setOption: function (t, e) {
          return "text" === t
            ? (this._super("showLabel", e), void 0)
            : ("showLabel" === t && (this.options.text = e),
              "icon" === t && (this.options.icons.primary = e),
              "icons" === t &&
                (e.primary
                  ? (this._super("icon", e.primary),
                    this._super("iconPosition", "beginning"))
                  : e.secondary &&
                    (this._super("icon", e.secondary),
                    this._super("iconPosition", "end"))),
              this._superApply(arguments),
              void 0);
        },
      }),
      (t.fn.button = (function (e) {
        return function () {
          return !this.length ||
            (this.length && "INPUT" !== this[0].tagName) ||
            (this.length &&
              "INPUT" === this[0].tagName &&
              "checkbox" !== this.attr("type") &&
              "radio" !== this.attr("type"))
            ? e.apply(this, arguments)
            : (t.ui.checkboxradio || t.error("Checkboxradio widget missing"),
              0 === arguments.length
                ? this.checkboxradio({ icon: !1 })
                : this.checkboxradio.apply(this, arguments));
        };
      })(t.fn.button)),
      (t.fn.buttonset = function () {
        return (
          t.ui.controlgroup || t.error("Controlgroup widget missing"),
          "option" === arguments[0] && "items" === arguments[1] && arguments[2]
            ? this.controlgroup.apply(this, [
                arguments[0],
                "items.button",
                arguments[2],
              ])
            : "option" === arguments[0] && "items" === arguments[1]
            ? this.controlgroup.apply(this, [arguments[0], "items.button"])
            : ("object" == typeof arguments[0] &&
                arguments[0].items &&
                (arguments[0].items = { button: arguments[0].items }),
              this.controlgroup.apply(this, arguments))
        );
      })),
    t.ui.button,
    t.extend(t.ui, { datepicker: { version: "1.12.1" } });
  var m;
  t.extend(s.prototype, {
    markerClassName: "hasDatepicker",
    maxRows: 4,
    _widgetDatepicker: function () {
      return this.dpDiv;
    },
    setDefaults: function (t) {
      return a(this._defaults, t || {}), this;
    },
    _attachDatepicker: function (e, i) {
      var s, n, o;
      (s = e.nodeName.toLowerCase()),
        (n = "div" === s || "span" === s),
        e.id || ((this.uuid += 1), (e.id = "dp" + this.uuid)),
        (o = this._newInst(t(e), n)),
        (o.settings = t.extend({}, i || {})),
        "input" === s
          ? this._connectDatepicker(e, o)
          : n && this._inlineDatepicker(e, o);
    },
    _newInst: function (e, i) {
      var s = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
      return {
        id: s,
        input: e,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: i,
        dpDiv: i
          ? n(
              t(
                "<div class='" +
                  this._inlineClass +
                  " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
              )
            )
          : this.dpDiv,
      };
    },
    _connectDatepicker: function (e, i) {
      var s = t(e);
      (i.append = t([])),
        (i.trigger = t([])),
        s.hasClass(this.markerClassName) ||
          (this._attachments(s, i),
          s
            .addClass(this.markerClassName)
            .on("keydown", this._doKeyDown)
            .on("keypress", this._doKeyPress)
            .on("keyup", this._doKeyUp),
          this._autoSize(i),
          t.data(e, "datepicker", i),
          i.settings.disabled && this._disableDatepicker(e));
    },
    _attachments: function (e, i) {
      var s,
        n,
        o,
        a = this._get(i, "appendText"),
        r = this._get(i, "isRTL");
      i.append && i.append.remove(),
        a &&
          ((i.append = t(
            "<span class='" + this._appendClass + "'>" + a + "</span>"
          )),
          e[r ? "before" : "after"](i.append)),
        e.off("focus", this._showDatepicker),
        i.trigger && i.trigger.remove(),
        (s = this._get(i, "showOn")),
        ("focus" === s || "both" === s) && e.on("focus", this._showDatepicker),
        ("button" === s || "both" === s) &&
          ((n = this._get(i, "buttonText")),
          (o = this._get(i, "buttonImage")),
          (i.trigger = t(
            this._get(i, "buttonImageOnly")
              ? t("<img/>")
                  .addClass(this._triggerClass)
                  .attr({ src: o, alt: n, title: n })
              : t("<button type='button'></button>")
                  .addClass(this._triggerClass)
                  .html(o ? t("<img/>").attr({ src: o, alt: n, title: n }) : n)
          )),
          e[r ? "before" : "after"](i.trigger),
          i.trigger.on("click", function () {
            return (
              t.datepicker._datepickerShowing &&
              t.datepicker._lastInput === e[0]
                ? t.datepicker._hideDatepicker()
                : t.datepicker._datepickerShowing &&
                  t.datepicker._lastInput !== e[0]
                ? (t.datepicker._hideDatepicker(),
                  t.datepicker._showDatepicker(e[0]))
                : t.datepicker._showDatepicker(e[0]),
              !1
            );
          }));
    },
    _autoSize: function (t) {
      if (this._get(t, "autoSize") && !t.inline) {
        var e,
          i,
          s,
          n,
          o = new Date(2009, 11, 20),
          a = this._get(t, "dateFormat");
        a.match(/[DM]/) &&
          ((e = function (t) {
            for (i = 0, s = 0, n = 0; t.length > n; n++)
              t[n].length > i && ((i = t[n].length), (s = n));
            return s;
          }),
          o.setMonth(
            e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))
          ),
          o.setDate(
            e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) +
              20 -
              o.getDay()
          )),
          t.input.attr("size", this._formatDate(t, o).length);
      }
    },
    _inlineDatepicker: function (e, i) {
      var s = t(e);
      s.hasClass(this.markerClassName) ||
        (s.addClass(this.markerClassName).append(i.dpDiv),
        t.data(e, "datepicker", i),
        this._setDate(i, this._getDefaultDate(i), !0),
        this._updateDatepicker(i),
        this._updateAlternate(i),
        i.settings.disabled && this._disableDatepicker(e),
        i.dpDiv.css("display", "block"));
    },
    _dialogDatepicker: function (e, i, s, n, o) {
      var r,
        h,
        l,
        c,
        u,
        d = this._dialogInst;
      return (
        d ||
          ((this.uuid += 1),
          (r = "dp" + this.uuid),
          (this._dialogInput = t(
            "<input type='text' id='" +
              r +
              "' style='position: absolute; top: -100px; width: 0px;'/>"
          )),
          this._dialogInput.on("keydown", this._doKeyDown),
          t("body").append(this._dialogInput),
          (d = this._dialogInst = this._newInst(this._dialogInput, !1)),
          (d.settings = {}),
          t.data(this._dialogInput[0], "datepicker", d)),
        a(d.settings, n || {}),
        (i = i && i.constructor === Date ? this._formatDate(d, i) : i),
        this._dialogInput.val(i),
        (this._pos = o ? (o.length ? o : [o.pageX, o.pageY]) : null),
        this._pos ||
          ((h = document.documentElement.clientWidth),
          (l = document.documentElement.clientHeight),
          (c = document.documentElement.scrollLeft || document.body.scrollLeft),
          (u = document.documentElement.scrollTop || document.body.scrollTop),
          (this._pos = [h / 2 - 100 + c, l / 2 - 150 + u])),
        this._dialogInput
          .css("left", this._pos[0] + 20 + "px")
          .css("top", this._pos[1] + "px"),
        (d.settings.onSelect = s),
        (this._inDialog = !0),
        this.dpDiv.addClass(this._dialogClass),
        this._showDatepicker(this._dialogInput[0]),
        t.blockUI && t.blockUI(this.dpDiv),
        t.data(this._dialogInput[0], "datepicker", d),
        this
      );
    },
    _destroyDatepicker: function (e) {
      var i,
        s = t(e),
        n = t.data(e, "datepicker");
      s.hasClass(this.markerClassName) &&
        ((i = e.nodeName.toLowerCase()),
        t.removeData(e, "datepicker"),
        "input" === i
          ? (n.append.remove(),
            n.trigger.remove(),
            s
              .removeClass(this.markerClassName)
              .off("focus", this._showDatepicker)
              .off("keydown", this._doKeyDown)
              .off("keypress", this._doKeyPress)
              .off("keyup", this._doKeyUp))
          : ("div" === i || "span" === i) &&
            s.removeClass(this.markerClassName).empty(),
        m === n && (m = null));
    },
    _enableDatepicker: function (e) {
      var i,
        s,
        n = t(e),
        o = t.data(e, "datepicker");
      n.hasClass(this.markerClassName) &&
        ((i = e.nodeName.toLowerCase()),
        "input" === i
          ? ((e.disabled = !1),
            o.trigger
              .filter("button")
              .each(function () {
                this.disabled = !1;
              })
              .end()
              .filter("img")
              .css({ opacity: "1.0", cursor: "" }))
          : ("div" === i || "span" === i) &&
            ((s = n.children("." + this._inlineClass)),
            s.children().removeClass("ui-state-disabled"),
            s
              .find("select.ui-datepicker-month, select.ui-datepicker-year")
              .prop("disabled", !1)),
        (this._disabledInputs = t.map(this._disabledInputs, function (t) {
          return t === e ? null : t;
        })));
    },
    _disableDatepicker: function (e) {
      var i,
        s,
        n = t(e),
        o = t.data(e, "datepicker");
      n.hasClass(this.markerClassName) &&
        ((i = e.nodeName.toLowerCase()),
        "input" === i
          ? ((e.disabled = !0),
            o.trigger
              .filter("button")
              .each(function () {
                this.disabled = !0;
              })
              .end()
              .filter("img")
              .css({ opacity: "0.5", cursor: "default" }))
          : ("div" === i || "span" === i) &&
            ((s = n.children("." + this._inlineClass)),
            s.children().addClass("ui-state-disabled"),
            s
              .find("select.ui-datepicker-month, select.ui-datepicker-year")
              .prop("disabled", !0)),
        (this._disabledInputs = t.map(this._disabledInputs, function (t) {
          return t === e ? null : t;
        })),
        (this._disabledInputs[this._disabledInputs.length] = e));
    },
    _isDisabledDatepicker: function (t) {
      if (!t) return !1;
      for (var e = 0; this._disabledInputs.length > e; e++)
        if (this._disabledInputs[e] === t) return !0;
      return !1;
    },
    _getInst: function (e) {
      try {
        return t.data(e, "datepicker");
      } catch (i) {
        throw "Missing instance data for this datepicker";
      }
    },
    _optionDatepicker: function (e, i, s) {
      var n,
        o,
        r,
        h,
        l = this._getInst(e);
      return 2 === arguments.length && "string" == typeof i
        ? "defaults" === i
          ? t.extend({}, t.datepicker._defaults)
          : l
          ? "all" === i
            ? t.extend({}, l.settings)
            : this._get(l, i)
          : null
        : ((n = i || {}),
          "string" == typeof i && ((n = {}), (n[i] = s)),
          l &&
            (this._curInst === l && this._hideDatepicker(),
            (o = this._getDateDatepicker(e, !0)),
            (r = this._getMinMaxDate(l, "min")),
            (h = this._getMinMaxDate(l, "max")),
            a(l.settings, n),
            null !== r &&
              void 0 !== n.dateFormat &&
              void 0 === n.minDate &&
              (l.settings.minDate = this._formatDate(l, r)),
            null !== h &&
              void 0 !== n.dateFormat &&
              void 0 === n.maxDate &&
              (l.settings.maxDate = this._formatDate(l, h)),
            "disabled" in n &&
              (n.disabled
                ? this._disableDatepicker(e)
                : this._enableDatepicker(e)),
            this._attachments(t(e), l),
            this._autoSize(l),
            this._setDate(l, o),
            this._updateAlternate(l),
            this._updateDatepicker(l)),
          void 0);
    },
    _changeDatepicker: function (t, e, i) {
      this._optionDatepicker(t, e, i);
    },
    _refreshDatepicker: function (t) {
      var e = this._getInst(t);
      e && this._updateDatepicker(e);
    },
    _setDateDatepicker: function (t, e) {
      var i = this._getInst(t);
      i &&
        (this._setDate(i, e),
        this._updateDatepicker(i),
        this._updateAlternate(i));
    },
    _getDateDatepicker: function (t, e) {
      var i = this._getInst(t);
      return (
        i && !i.inline && this._setDateFromField(i, e),
        i ? this._getDate(i) : null
      );
    },
    _doKeyDown: function (e) {
      var i,
        s,
        n,
        o = t.datepicker._getInst(e.target),
        a = !0,
        r = o.dpDiv.is(".ui-datepicker-rtl");
      if (((o._keyEvent = !0), t.datepicker._datepickerShowing))
        switch (e.keyCode) {
          case 9:
            t.datepicker._hideDatepicker(), (a = !1);
            break;
          case 13:
            return (
              (n = t(
                "td." +
                  t.datepicker._dayOverClass +
                  ":not(." +
                  t.datepicker._currentClass +
                  ")",
                o.dpDiv
              )),
              n[0] &&
                t.datepicker._selectDay(
                  e.target,
                  o.selectedMonth,
                  o.selectedYear,
                  n[0]
                ),
              (i = t.datepicker._get(o, "onSelect")),
              i
                ? ((s = t.datepicker._formatDate(o)),
                  i.apply(o.input ? o.input[0] : null, [s, o]))
                : t.datepicker._hideDatepicker(),
              !1
            );
          case 27:
            t.datepicker._hideDatepicker();
            break;
          case 33:
            t.datepicker._adjustDate(
              e.target,
              e.ctrlKey
                ? -t.datepicker._get(o, "stepBigMonths")
                : -t.datepicker._get(o, "stepMonths"),
              "M"
            );
            break;
          case 34:
            t.datepicker._adjustDate(
              e.target,
              e.ctrlKey
                ? +t.datepicker._get(o, "stepBigMonths")
                : +t.datepicker._get(o, "stepMonths"),
              "M"
            );
            break;
          case 35:
            (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target),
              (a = e.ctrlKey || e.metaKey);
            break;
          case 36:
            (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target),
              (a = e.ctrlKey || e.metaKey);
            break;
          case 37:
            (e.ctrlKey || e.metaKey) &&
              t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"),
              (a = e.ctrlKey || e.metaKey),
              e.originalEvent.altKey &&
                t.datepicker._adjustDate(
                  e.target,
                  e.ctrlKey
                    ? -t.datepicker._get(o, "stepBigMonths")
                    : -t.datepicker._get(o, "stepMonths"),
                  "M"
                );
            break;
          case 38:
            (e.ctrlKey || e.metaKey) &&
              t.datepicker._adjustDate(e.target, -7, "D"),
              (a = e.ctrlKey || e.metaKey);
            break;
          case 39:
            (e.ctrlKey || e.metaKey) &&
              t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"),
              (a = e.ctrlKey || e.metaKey),
              e.originalEvent.altKey &&
                t.datepicker._adjustDate(
                  e.target,
                  e.ctrlKey
                    ? +t.datepicker._get(o, "stepBigMonths")
                    : +t.datepicker._get(o, "stepMonths"),
                  "M"
                );
            break;
          case 40:
            (e.ctrlKey || e.metaKey) &&
              t.datepicker._adjustDate(e.target, 7, "D"),
              (a = e.ctrlKey || e.metaKey);
            break;
          default:
            a = !1;
        }
      else
        36 === e.keyCode && e.ctrlKey
          ? t.datepicker._showDatepicker(this)
          : (a = !1);
      a && (e.preventDefault(), e.stopPropagation());
    },
    _doKeyPress: function (e) {
      var i,
        s,
        n = t.datepicker._getInst(e.target);
      return t.datepicker._get(n, "constrainInput")
        ? ((i = t.datepicker._possibleChars(
            t.datepicker._get(n, "dateFormat")
          )),
          (s = String.fromCharCode(
            null == e.charCode ? e.keyCode : e.charCode
          )),
          e.ctrlKey || e.metaKey || " " > s || !i || i.indexOf(s) > -1)
        : void 0;
    },
    _doKeyUp: function (e) {
      var i,
        s = t.datepicker._getInst(e.target);
      if (s.input.val() !== s.lastVal)
        try {
          (i = t.datepicker.parseDate(
            t.datepicker._get(s, "dateFormat"),
            s.input ? s.input.val() : null,
            t.datepicker._getFormatConfig(s)
          )),
            i &&
              (t.datepicker._setDateFromField(s),
              t.datepicker._updateAlternate(s),
              t.datepicker._updateDatepicker(s));
        } catch (n) {}
      return !0;
    },
    _showDatepicker: function (e) {
      if (
        ((e = e.target || e),
        "input" !== e.nodeName.toLowerCase() &&
          (e = t("input", e.parentNode)[0]),
        !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e)
      ) {
        var s, n, o, r, h, l, c;
        (s = t.datepicker._getInst(e)),
          t.datepicker._curInst &&
            t.datepicker._curInst !== s &&
            (t.datepicker._curInst.dpDiv.stop(!0, !0),
            s &&
              t.datepicker._datepickerShowing &&
              t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),
          (n = t.datepicker._get(s, "beforeShow")),
          (o = n ? n.apply(e, [e, s]) : {}),
          o !== !1 &&
            (a(s.settings, o),
            (s.lastVal = null),
            (t.datepicker._lastInput = e),
            t.datepicker._setDateFromField(s),
            t.datepicker._inDialog && (e.value = ""),
            t.datepicker._pos ||
              ((t.datepicker._pos = t.datepicker._findPos(e)),
              (t.datepicker._pos[1] += e.offsetHeight)),
            (r = !1),
            t(e)
              .parents()
              .each(function () {
                return (r |= "fixed" === t(this).css("position")), !r;
              }),
            (h = { left: t.datepicker._pos[0], top: t.datepicker._pos[1] }),
            (t.datepicker._pos = null),
            s.dpDiv.empty(),
            s.dpDiv.css({
              position: "absolute",
              display: "block",
              top: "-1000px",
            }),
            t.datepicker._updateDatepicker(s),
            (h = t.datepicker._checkOffset(s, h, r)),
            s.dpDiv.css({
              position:
                t.datepicker._inDialog && t.blockUI
                  ? "static"
                  : r
                  ? "fixed"
                  : "absolute",
              display: "none",
              left: h.left + "px",
              top: h.top + "px",
            }),
            s.inline ||
              ((l = t.datepicker._get(s, "showAnim")),
              (c = t.datepicker._get(s, "duration")),
              s.dpDiv.css("z-index", i(t(e)) + 1),
              (t.datepicker._datepickerShowing = !0),
              t.effects && t.effects.effect[l]
                ? s.dpDiv.show(l, t.datepicker._get(s, "showOptions"), c)
                : s.dpDiv[l || "show"](l ? c : null),
              t.datepicker._shouldFocusInput(s) && s.input.trigger("focus"),
              (t.datepicker._curInst = s)));
      }
    },
    _updateDatepicker: function (e) {
      (this.maxRows = 4),
        (m = e),
        e.dpDiv.empty().append(this._generateHTML(e)),
        this._attachHandlers(e);
      var i,
        s = this._getNumberOfMonths(e),
        n = s[1],
        a = 17,
        r = e.dpDiv.find("." + this._dayOverClass + " a");
      r.length > 0 && o.apply(r.get(0)),
        e.dpDiv
          .removeClass(
            "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4"
          )
          .width(""),
        n > 1 &&
          e.dpDiv
            .addClass("ui-datepicker-multi-" + n)
            .css("width", a * n + "em"),
        e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"](
          "ui-datepicker-multi"
        ),
        e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"](
          "ui-datepicker-rtl"
        ),
        e === t.datepicker._curInst &&
          t.datepicker._datepickerShowing &&
          t.datepicker._shouldFocusInput(e) &&
          e.input.trigger("focus"),
        e.yearshtml &&
          ((i = e.yearshtml),
          setTimeout(function () {
            i === e.yearshtml &&
              e.yearshtml &&
              e.dpDiv
                .find("select.ui-datepicker-year:first")
                .replaceWith(e.yearshtml),
              (i = e.yearshtml = null);
          }, 0));
    },
    _shouldFocusInput: function (t) {
      return (
        t.input &&
        t.input.is(":visible") &&
        !t.input.is(":disabled") &&
        !t.input.is(":focus")
      );
    },
    _checkOffset: function (e, i, s) {
      var n = e.dpDiv.outerWidth(),
        o = e.dpDiv.outerHeight(),
        a = e.input ? e.input.outerWidth() : 0,
        r = e.input ? e.input.outerHeight() : 0,
        h =
          document.documentElement.clientWidth +
          (s ? 0 : t(document).scrollLeft()),
        l =
          document.documentElement.clientHeight +
          (s ? 0 : t(document).scrollTop());
      return (
        (i.left -= this._get(e, "isRTL") ? n - a : 0),
        (i.left -=
          s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0),
        (i.top -=
          s && i.top === e.input.offset().top + r
            ? t(document).scrollTop()
            : 0),
        (i.left -= Math.min(
          i.left,
          i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0
        )),
        (i.top -= Math.min(
          i.top,
          i.top + o > l && l > o ? Math.abs(o + r) : 0
        )),
        i
      );
    },
    _findPos: function (e) {
      for (
        var i, s = this._getInst(e), n = this._get(s, "isRTL");
        e &&
        ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));

      )
        e = e[n ? "previousSibling" : "nextSibling"];
      return (i = t(e).offset()), [i.left, i.top];
    },
    _hideDatepicker: function (e) {
      var i,
        s,
        n,
        o,
        a = this._curInst;
      !a ||
        (e && a !== t.data(e, "datepicker")) ||
        (this._datepickerShowing &&
          ((i = this._get(a, "showAnim")),
          (s = this._get(a, "duration")),
          (n = function () {
            t.datepicker._tidyDialog(a);
          }),
          t.effects && (t.effects.effect[i] || t.effects[i])
            ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), s, n)
            : a.dpDiv[
                "slideDown" === i
                  ? "slideUp"
                  : "fadeIn" === i
                  ? "fadeOut"
                  : "hide"
              ](i ? s : null, n),
          i || n(),
          (this._datepickerShowing = !1),
          (o = this._get(a, "onClose")),
          o &&
            o.apply(a.input ? a.input[0] : null, [
              a.input ? a.input.val() : "",
              a,
            ]),
          (this._lastInput = null),
          this._inDialog &&
            (this._dialogInput.css({
              position: "absolute",
              left: "0",
              top: "-100px",
            }),
            t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))),
          (this._inDialog = !1)));
    },
    _tidyDialog: function (t) {
      t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
    },
    _checkExternalClick: function (e) {
      if (t.datepicker._curInst) {
        var i = t(e.target),
          s = t.datepicker._getInst(i[0]);
        ((i[0].id !== t.datepicker._mainDivId &&
          0 === i.parents("#" + t.datepicker._mainDivId).length &&
          !i.hasClass(t.datepicker.markerClassName) &&
          !i.closest("." + t.datepicker._triggerClass).length &&
          t.datepicker._datepickerShowing &&
          (!t.datepicker._inDialog || !t.blockUI)) ||
          (i.hasClass(t.datepicker.markerClassName) &&
            t.datepicker._curInst !== s)) &&
          t.datepicker._hideDatepicker();
      }
    },
    _adjustDate: function (e, i, s) {
      var n = t(e),
        o = this._getInst(n[0]);
      this._isDisabledDatepicker(n[0]) ||
        (this._adjustInstDate(
          o,
          i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0),
          s
        ),
        this._updateDatepicker(o));
    },
    _gotoToday: function (e) {
      var i,
        s = t(e),
        n = this._getInst(s[0]);
      this._get(n, "gotoCurrent") && n.currentDay
        ? ((n.selectedDay = n.currentDay),
          (n.drawMonth = n.selectedMonth = n.currentMonth),
          (n.drawYear = n.selectedYear = n.currentYear))
        : ((i = new Date()),
          (n.selectedDay = i.getDate()),
          (n.drawMonth = n.selectedMonth = i.getMonth()),
          (n.drawYear = n.selectedYear = i.getFullYear())),
        this._notifyChange(n),
        this._adjustDate(s);
    },
    _selectMonthYear: function (e, i, s) {
      var n = t(e),
        o = this._getInst(n[0]);
      (o["selected" + ("M" === s ? "Month" : "Year")] = o[
        "draw" + ("M" === s ? "Month" : "Year")
      ] =
        parseInt(i.options[i.selectedIndex].value, 10)),
        this._notifyChange(o),
        this._adjustDate(n);
    },
    _selectDay: function (e, i, s, n) {
      var o,
        a = t(e);
      t(n).hasClass(this._unselectableClass) ||
        this._isDisabledDatepicker(a[0]) ||
        ((o = this._getInst(a[0])),
        (o.selectedDay = o.currentDay = t("a", n).html()),
        (o.selectedMonth = o.currentMonth = i),
        (o.selectedYear = o.currentYear = s),
        this._selectDate(
          e,
          this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)
        ));
    },
    _clearDate: function (e) {
      var i = t(e);
      this._selectDate(i, "");
    },
    _selectDate: function (e, i) {
      var s,
        n = t(e),
        o = this._getInst(n[0]);
      (i = null != i ? i : this._formatDate(o)),
        o.input && o.input.val(i),
        this._updateAlternate(o),
        (s = this._get(o, "onSelect")),
        s
          ? s.apply(o.input ? o.input[0] : null, [i, o])
          : o.input && o.input.trigger("change"),
        o.inline
          ? this._updateDatepicker(o)
          : (this._hideDatepicker(),
            (this._lastInput = o.input[0]),
            "object" != typeof o.input[0] && o.input.trigger("focus"),
            (this._lastInput = null));
    },
    _updateAlternate: function (e) {
      var i,
        s,
        n,
        o = this._get(e, "altField");
      o &&
        ((i = this._get(e, "altFormat") || this._get(e, "dateFormat")),
        (s = this._getDate(e)),
        (n = this.formatDate(i, s, this._getFormatConfig(e))),
        t(o).val(n));
    },
    noWeekends: function (t) {
      var e = t.getDay();
      return [e > 0 && 6 > e, ""];
    },
    iso8601Week: function (t) {
      var e,
        i = new Date(t.getTime());
      return (
        i.setDate(i.getDate() + 4 - (i.getDay() || 7)),
        (e = i.getTime()),
        i.setMonth(0),
        i.setDate(1),
        Math.floor(Math.round((e - i) / 864e5) / 7) + 1
      );
    },
    parseDate: function (e, i, s) {
      if (null == e || null == i) throw "Invalid arguments";
      if (((i = "object" == typeof i ? "" + i : i + ""), "" === i)) return null;
      var n,
        o,
        a,
        r,
        h = 0,
        l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
        c =
          "string" != typeof l
            ? l
            : (new Date().getFullYear() % 100) + parseInt(l, 10),
        u = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
        d = (s ? s.dayNames : null) || this._defaults.dayNames,
        p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
        f = (s ? s.monthNames : null) || this._defaults.monthNames,
        g = -1,
        m = -1,
        _ = -1,
        v = -1,
        b = !1,
        y = function (t) {
          var i = e.length > n + 1 && e.charAt(n + 1) === t;
          return i && n++, i;
        },
        w = function (t) {
          var e = y(t),
            s =
              "@" === t
                ? 14
                : "!" === t
                ? 20
                : "y" === t && e
                ? 4
                : "o" === t
                ? 3
                : 2,
            n = "y" === t ? s : 1,
            o = RegExp("^\\d{" + n + "," + s + "}"),
            a = i.substring(h).match(o);
          if (!a) throw "Missing number at position " + h;
          return (h += a[0].length), parseInt(a[0], 10);
        },
        k = function (e, s, n) {
          var o = -1,
            a = t
              .map(y(e) ? n : s, function (t, e) {
                return [[e, t]];
              })
              .sort(function (t, e) {
                return -(t[1].length - e[1].length);
              });
          if (
            (t.each(a, function (t, e) {
              var s = e[1];
              return i.substr(h, s.length).toLowerCase() === s.toLowerCase()
                ? ((o = e[0]), (h += s.length), !1)
                : void 0;
            }),
            -1 !== o)
          )
            return o + 1;
          throw "Unknown name at position " + h;
        },
        x = function () {
          if (i.charAt(h) !== e.charAt(n))
            throw "Unexpected literal at position " + h;
          h++;
        };
      for (n = 0; e.length > n; n++)
        if (b) "'" !== e.charAt(n) || y("'") ? x() : (b = !1);
        else
          switch (e.charAt(n)) {
            case "d":
              _ = w("d");
              break;
            case "D":
              k("D", u, d);
              break;
            case "o":
              v = w("o");
              break;
            case "m":
              m = w("m");
              break;
            case "M":
              m = k("M", p, f);
              break;
            case "y":
              g = w("y");
              break;
            case "@":
              (r = new Date(w("@"))),
                (g = r.getFullYear()),
                (m = r.getMonth() + 1),
                (_ = r.getDate());
              break;
            case "!":
              (r = new Date((w("!") - this._ticksTo1970) / 1e4)),
                (g = r.getFullYear()),
                (m = r.getMonth() + 1),
                (_ = r.getDate());
              break;
            case "'":
              y("'") ? x() : (b = !0);
              break;
            default:
              x();
          }
      if (i.length > h && ((a = i.substr(h)), !/^\s+/.test(a)))
        throw "Extra/unparsed characters found in date: " + a;
      if (
        (-1 === g
          ? (g = new Date().getFullYear())
          : 100 > g &&
            (g +=
              new Date().getFullYear() -
              (new Date().getFullYear() % 100) +
              (c >= g ? 0 : -100)),
        v > -1)
      )
        for (m = 1, _ = v; ; ) {
          if (((o = this._getDaysInMonth(g, m - 1)), o >= _)) break;
          m++, (_ -= o);
        }
      if (
        ((r = this._daylightSavingAdjust(new Date(g, m - 1, _))),
        r.getFullYear() !== g || r.getMonth() + 1 !== m || r.getDate() !== _)
      )
        throw "Invalid date";
      return r;
    },
    ATOM: "yy-mm-dd",
    COOKIE: "D, dd M yy",
    ISO_8601: "yy-mm-dd",
    RFC_822: "D, d M y",
    RFC_850: "DD, dd-M-y",
    RFC_1036: "D, d M y",
    RFC_1123: "D, d M yy",
    RFC_2822: "D, d M yy",
    RSS: "D, d M y",
    TICKS: "!",
    TIMESTAMP: "@",
    W3C: "yy-mm-dd",
    _ticksTo1970:
      1e7 *
      60 *
      60 *
      24 *
      (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
    formatDate: function (t, e, i) {
      if (!e) return "";
      var s,
        n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
        o = (i ? i.dayNames : null) || this._defaults.dayNames,
        a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
        r = (i ? i.monthNames : null) || this._defaults.monthNames,
        h = function (e) {
          var i = t.length > s + 1 && t.charAt(s + 1) === e;
          return i && s++, i;
        },
        l = function (t, e, i) {
          var s = "" + e;
          if (h(t)) for (; i > s.length; ) s = "0" + s;
          return s;
        },
        c = function (t, e, i, s) {
          return h(t) ? s[e] : i[e];
        },
        u = "",
        d = !1;
      if (e)
        for (s = 0; t.length > s; s++)
          if (d) "'" !== t.charAt(s) || h("'") ? (u += t.charAt(s)) : (d = !1);
          else
            switch (t.charAt(s)) {
              case "d":
                u += l("d", e.getDate(), 2);
                break;
              case "D":
                u += c("D", e.getDay(), n, o);
                break;
              case "o":
                u += l(
                  "o",
                  Math.round(
                    (new Date(
                      e.getFullYear(),
                      e.getMonth(),
                      e.getDate()
                    ).getTime() -
                      new Date(e.getFullYear(), 0, 0).getTime()) /
                      864e5
                  ),
                  3
                );
                break;
              case "m":
                u += l("m", e.getMonth() + 1, 2);
                break;
              case "M":
                u += c("M", e.getMonth(), a, r);
                break;
              case "y":
                u += h("y")
                  ? e.getFullYear()
                  : (10 > e.getFullYear() % 100 ? "0" : "") +
                    (e.getFullYear() % 100);
                break;
              case "@":
                u += e.getTime();
                break;
              case "!":
                u += 1e4 * e.getTime() + this._ticksTo1970;
                break;
              case "'":
                h("'") ? (u += "'") : (d = !0);
                break;
              default:
                u += t.charAt(s);
            }
      return u;
    },
    _possibleChars: function (t) {
      var e,
        i = "",
        s = !1,
        n = function (i) {
          var s = t.length > e + 1 && t.charAt(e + 1) === i;
          return s && e++, s;
        };
      for (e = 0; t.length > e; e++)
        if (s) "'" !== t.charAt(e) || n("'") ? (i += t.charAt(e)) : (s = !1);
        else
          switch (t.charAt(e)) {
            case "d":
            case "m":
            case "y":
            case "@":
              i += "0123456789";
              break;
            case "D":
            case "M":
              return null;
            case "'":
              n("'") ? (i += "'") : (s = !0);
              break;
            default:
              i += t.charAt(e);
          }
      return i;
    },
    _get: function (t, e) {
      return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e];
    },
    _setDateFromField: function (t, e) {
      if (t.input.val() !== t.lastVal) {
        var i = this._get(t, "dateFormat"),
          s = (t.lastVal = t.input ? t.input.val() : null),
          n = this._getDefaultDate(t),
          o = n,
          a = this._getFormatConfig(t);
        try {
          o = this.parseDate(i, s, a) || n;
        } catch (r) {
          s = e ? "" : s;
        }
        (t.selectedDay = o.getDate()),
          (t.drawMonth = t.selectedMonth = o.getMonth()),
          (t.drawYear = t.selectedYear = o.getFullYear()),
          (t.currentDay = s ? o.getDate() : 0),
          (t.currentMonth = s ? o.getMonth() : 0),
          (t.currentYear = s ? o.getFullYear() : 0),
          this._adjustInstDate(t);
      }
    },
    _getDefaultDate: function (t) {
      return this._restrictMinMax(
        t,
        this._determineDate(t, this._get(t, "defaultDate"), new Date())
      );
    },
    _determineDate: function (e, i, s) {
      var n = function (t) {
          var e = new Date();
          return e.setDate(e.getDate() + t), e;
        },
        o = function (i) {
          try {
            return t.datepicker.parseDate(
              t.datepicker._get(e, "dateFormat"),
              i,
              t.datepicker._getFormatConfig(e)
            );
          } catch (s) {}
          for (
            var n =
                (i.toLowerCase().match(/^c/)
                  ? t.datepicker._getDate(e)
                  : null) || new Date(),
              o = n.getFullYear(),
              a = n.getMonth(),
              r = n.getDate(),
              h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
              l = h.exec(i);
            l;

          ) {
            switch (l[2] || "d") {
              case "d":
              case "D":
                r += parseInt(l[1], 10);
                break;
              case "w":
              case "W":
                r += 7 * parseInt(l[1], 10);
                break;
              case "m":
              case "M":
                (a += parseInt(l[1], 10)),
                  (r = Math.min(r, t.datepicker._getDaysInMonth(o, a)));
                break;
              case "y":
              case "Y":
                (o += parseInt(l[1], 10)),
                  (r = Math.min(r, t.datepicker._getDaysInMonth(o, a)));
            }
            l = h.exec(i);
          }
          return new Date(o, a, r);
        },
        a =
          null == i || "" === i
            ? s
            : "string" == typeof i
            ? o(i)
            : "number" == typeof i
            ? isNaN(i)
              ? s
              : n(i)
            : new Date(i.getTime());
      return (
        (a = a && "Invalid Date" == "" + a ? s : a),
        a &&
          (a.setHours(0),
          a.setMinutes(0),
          a.setSeconds(0),
          a.setMilliseconds(0)),
        this._daylightSavingAdjust(a)
      );
    },
    _daylightSavingAdjust: function (t) {
      return t
        ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t)
        : null;
    },
    _setDate: function (t, e, i) {
      var s = !e,
        n = t.selectedMonth,
        o = t.selectedYear,
        a = this._restrictMinMax(t, this._determineDate(t, e, new Date()));
      (t.selectedDay = t.currentDay = a.getDate()),
        (t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth()),
        (t.drawYear = t.selectedYear = t.currentYear = a.getFullYear()),
        (n === t.selectedMonth && o === t.selectedYear) ||
          i ||
          this._notifyChange(t),
        this._adjustInstDate(t),
        t.input && t.input.val(s ? "" : this._formatDate(t));
    },
    _getDate: function (t) {
      var e =
        !t.currentYear || (t.input && "" === t.input.val())
          ? null
          : this._daylightSavingAdjust(
              new Date(t.currentYear, t.currentMonth, t.currentDay)
            );
      return e;
    },
    _attachHandlers: function (e) {
      var i = this._get(e, "stepMonths"),
        s = "#" + e.id.replace(/\\\\/g, "\\");
      e.dpDiv.find("[data-handler]").map(function () {
        var e = {
          prev: function () {
            t.datepicker._adjustDate(s, -i, "M");
          },
          next: function () {
            t.datepicker._adjustDate(s, +i, "M");
          },
          hide: function () {
            t.datepicker._hideDatepicker();
          },
          today: function () {
            t.datepicker._gotoToday(s);
          },
          selectDay: function () {
            return (
              t.datepicker._selectDay(
                s,
                +this.getAttribute("data-month"),
                +this.getAttribute("data-year"),
                this
              ),
              !1
            );
          },
          selectMonth: function () {
            return t.datepicker._selectMonthYear(s, this, "M"), !1;
          },
          selectYear: function () {
            return t.datepicker._selectMonthYear(s, this, "Y"), !1;
          },
        };
        t(this).on(
          this.getAttribute("data-event"),
          e[this.getAttribute("data-handler")]
        );
      });
    },
    _generateHTML: function (t) {
      var e,
        i,
        s,
        n,
        o,
        a,
        r,
        h,
        l,
        c,
        u,
        d,
        p,
        f,
        g,
        m,
        _,
        v,
        b,
        y,
        w,
        k,
        x,
        C,
        D,
        I,
        T,
        P,
        M,
        S,
        H,
        z,
        O,
        A,
        N,
        W,
        E,
        F,
        L,
        R = new Date(),
        B = this._daylightSavingAdjust(
          new Date(R.getFullYear(), R.getMonth(), R.getDate())
        ),
        Y = this._get(t, "isRTL"),
        j = this._get(t, "showButtonPanel"),
        q = this._get(t, "hideIfNoPrevNext"),
        K = this._get(t, "navigationAsDateFormat"),
        U = this._getNumberOfMonths(t),
        V = this._get(t, "showCurrentAtPos"),
        $ = this._get(t, "stepMonths"),
        X = 1 !== U[0] || 1 !== U[1],
        G = this._daylightSavingAdjust(
          t.currentDay
            ? new Date(t.currentYear, t.currentMonth, t.currentDay)
            : new Date(9999, 9, 9)
        ),
        Q = this._getMinMaxDate(t, "min"),
        J = this._getMinMaxDate(t, "max"),
        Z = t.drawMonth - V,
        te = t.drawYear;
      if ((0 > Z && ((Z += 12), te--), J))
        for (
          e = this._daylightSavingAdjust(
            new Date(
              J.getFullYear(),
              J.getMonth() - U[0] * U[1] + 1,
              J.getDate()
            )
          ),
            e = Q && Q > e ? Q : e;
          this._daylightSavingAdjust(new Date(te, Z, 1)) > e;

        )
          Z--, 0 > Z && ((Z = 11), te--);
      for (
        t.drawMonth = Z,
          t.drawYear = te,
          i = this._get(t, "prevText"),
          i = K
            ? this.formatDate(
                i,
                this._daylightSavingAdjust(new Date(te, Z - $, 1)),
                this._getFormatConfig(t)
              )
            : i,
          s = this._canAdjustMonth(t, -1, te, Z)
            ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" +
              i +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (Y ? "e" : "w") +
              "'>" +
              i +
              "</span></a>"
            : q
            ? ""
            : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" +
              i +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (Y ? "e" : "w") +
              "'>" +
              i +
              "</span></a>",
          n = this._get(t, "nextText"),
          n = K
            ? this.formatDate(
                n,
                this._daylightSavingAdjust(new Date(te, Z + $, 1)),
                this._getFormatConfig(t)
              )
            : n,
          o = this._canAdjustMonth(t, 1, te, Z)
            ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" +
              n +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (Y ? "w" : "e") +
              "'>" +
              n +
              "</span></a>"
            : q
            ? ""
            : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" +
              n +
              "'><span class='ui-icon ui-icon-circle-triangle-" +
              (Y ? "w" : "e") +
              "'>" +
              n +
              "</span></a>",
          a = this._get(t, "currentText"),
          r = this._get(t, "gotoCurrent") && t.currentDay ? G : B,
          a = K ? this.formatDate(a, r, this._getFormatConfig(t)) : a,
          h = t.inline
            ? ""
            : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
              this._get(t, "closeText") +
              "</button>",
          l = j
            ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
              (Y ? h : "") +
              (this._isInRange(t, r)
                ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" +
                  a +
                  "</button>"
                : "") +
              (Y ? "" : h) +
              "</div>"
            : "",
          c = parseInt(this._get(t, "firstDay"), 10),
          c = isNaN(c) ? 0 : c,
          u = this._get(t, "showWeek"),
          d = this._get(t, "dayNames"),
          p = this._get(t, "dayNamesMin"),
          f = this._get(t, "monthNames"),
          g = this._get(t, "monthNamesShort"),
          m = this._get(t, "beforeShowDay"),
          _ = this._get(t, "showOtherMonths"),
          v = this._get(t, "selectOtherMonths"),
          b = this._getDefaultDate(t),
          y = "",
          k = 0;
        U[0] > k;
        k++
      ) {
        for (x = "", this.maxRows = 4, C = 0; U[1] > C; C++) {
          if (
            ((D = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay))),
            (I = " ui-corner-all"),
            (T = ""),
            X)
          ) {
            if (((T += "<div class='ui-datepicker-group"), U[1] > 1))
              switch (C) {
                case 0:
                  (T += " ui-datepicker-group-first"),
                    (I = " ui-corner-" + (Y ? "right" : "left"));
                  break;
                case U[1] - 1:
                  (T += " ui-datepicker-group-last"),
                    (I = " ui-corner-" + (Y ? "left" : "right"));
                  break;
                default:
                  (T += " ui-datepicker-group-middle"), (I = "");
              }
            T += "'>";
          }
          for (
            T +=
              "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
              I +
              "'>" +
              (/all|left/.test(I) && 0 === k ? (Y ? o : s) : "") +
              (/all|right/.test(I) && 0 === k ? (Y ? s : o) : "") +
              this._generateMonthYearHeader(
                t,
                Z,
                te,
                Q,
                J,
                k > 0 || C > 0,
                f,
                g
              ) +
              "</div><table class='ui-datepicker-calendar'><thead>" +
              "<tr>",
              P = u
                ? "<th class='ui-datepicker-week-col'>" +
                  this._get(t, "weekHeader") +
                  "</th>"
                : "",
              w = 0;
            7 > w;
            w++
          )
            (M = (w + c) % 7),
              (P +=
                "<th scope='col'" +
                ((w + c + 6) % 7 >= 5
                  ? " class='ui-datepicker-week-end'"
                  : "") +
                ">" +
                "<span title='" +
                d[M] +
                "'>" +
                p[M] +
                "</span></th>");
          for (
            T += P + "</tr></thead><tbody>",
              S = this._getDaysInMonth(te, Z),
              te === t.selectedYear &&
                Z === t.selectedMonth &&
                (t.selectedDay = Math.min(t.selectedDay, S)),
              H = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7,
              z = Math.ceil((H + S) / 7),
              O = X ? (this.maxRows > z ? this.maxRows : z) : z,
              this.maxRows = O,
              A = this._daylightSavingAdjust(new Date(te, Z, 1 - H)),
              N = 0;
            O > N;
            N++
          ) {
            for (
              T += "<tr>",
                W = u
                  ? "<td class='ui-datepicker-week-col'>" +
                    this._get(t, "calculateWeek")(A) +
                    "</td>"
                  : "",
                w = 0;
              7 > w;
              w++
            )
              (E = m ? m.apply(t.input ? t.input[0] : null, [A]) : [!0, ""]),
                (F = A.getMonth() !== Z),
                (L = (F && !v) || !E[0] || (Q && Q > A) || (J && A > J)),
                (W +=
                  "<td class='" +
                  ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") +
                  (F ? " ui-datepicker-other-month" : "") +
                  ((A.getTime() === D.getTime() &&
                    Z === t.selectedMonth &&
                    t._keyEvent) ||
                  (b.getTime() === A.getTime() && b.getTime() === D.getTime())
                    ? " " + this._dayOverClass
                    : "") +
                  (L
                    ? " " + this._unselectableClass + " ui-state-disabled"
                    : "") +
                  (F && !_
                    ? ""
                    : " " +
                      E[1] +
                      (A.getTime() === G.getTime()
                        ? " " + this._currentClass
                        : "") +
                      (A.getTime() === B.getTime()
                        ? " ui-datepicker-today"
                        : "")) +
                  "'" +
                  ((F && !_) || !E[2]
                    ? ""
                    : " title='" + E[2].replace(/'/g, "&#39;") + "'") +
                  (L
                    ? ""
                    : " data-handler='selectDay' data-event='click' data-month='" +
                      A.getMonth() +
                      "' data-year='" +
                      A.getFullYear() +
                      "'") +
                  ">" +
                  (F && !_
                    ? "&#xa0;"
                    : L
                    ? "<span class='ui-state-default'>" +
                      A.getDate() +
                      "</span>"
                    : "<a class='ui-state-default" +
                      (A.getTime() === B.getTime()
                        ? " ui-state-highlight"
                        : "") +
                      (A.getTime() === G.getTime() ? " ui-state-active" : "") +
                      (F ? " ui-priority-secondary" : "") +
                      "' href='#'>" +
                      A.getDate() +
                      "</a>") +
                  "</td>"),
                A.setDate(A.getDate() + 1),
                (A = this._daylightSavingAdjust(A));
            T += W + "</tr>";
          }
          Z++,
            Z > 11 && ((Z = 0), te++),
            (T +=
              "</tbody></table>" +
              (X
                ? "</div>" +
                  (U[0] > 0 && C === U[1] - 1
                    ? "<div class='ui-datepicker-row-break'></div>"
                    : "")
                : "")),
            (x += T);
        }
        y += x;
      }
      return (y += l), (t._keyEvent = !1), y;
    },
    _generateMonthYearHeader: function (t, e, i, s, n, o, a, r) {
      var h,
        l,
        c,
        u,
        d,
        p,
        f,
        g,
        m = this._get(t, "changeMonth"),
        _ = this._get(t, "changeYear"),
        v = this._get(t, "showMonthAfterYear"),
        b = "<div class='ui-datepicker-title'>",
        y = "";
      if (o || !m) y += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
      else {
        for (
          h = s && s.getFullYear() === i,
            l = n && n.getFullYear() === i,
            y +=
              "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
            c = 0;
          12 > c;
          c++
        )
          (!h || c >= s.getMonth()) &&
            (!l || n.getMonth() >= c) &&
            (y +=
              "<option value='" +
              c +
              "'" +
              (c === e ? " selected='selected'" : "") +
              ">" +
              r[c] +
              "</option>");
        y += "</select>";
      }
      if ((v || (b += y + (!o && m && _ ? "" : "&#xa0;")), !t.yearshtml))
        if (((t.yearshtml = ""), o || !_))
          b += "<span class='ui-datepicker-year'>" + i + "</span>";
        else {
          for (
            u = this._get(t, "yearRange").split(":"),
              d = new Date().getFullYear(),
              p = function (t) {
                var e = t.match(/c[+\-].*/)
                  ? i + parseInt(t.substring(1), 10)
                  : t.match(/[+\-].*/)
                  ? d + parseInt(t, 10)
                  : parseInt(t, 10);
                return isNaN(e) ? d : e;
              },
              f = p(u[0]),
              g = Math.max(f, p(u[1] || "")),
              f = s ? Math.max(f, s.getFullYear()) : f,
              g = n ? Math.min(g, n.getFullYear()) : g,
              t.yearshtml +=
                "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
            g >= f;
            f++
          )
            t.yearshtml +=
              "<option value='" +
              f +
              "'" +
              (f === i ? " selected='selected'" : "") +
              ">" +
              f +
              "</option>";
          (t.yearshtml += "</select>"),
            (b += t.yearshtml),
            (t.yearshtml = null);
        }
      return (
        (b += this._get(t, "yearSuffix")),
        v && (b += (!o && m && _ ? "" : "&#xa0;") + y),
        (b += "</div>")
      );
    },
    _adjustInstDate: function (t, e, i) {
      var s = t.selectedYear + ("Y" === i ? e : 0),
        n = t.selectedMonth + ("M" === i ? e : 0),
        o =
          Math.min(t.selectedDay, this._getDaysInMonth(s, n)) +
          ("D" === i ? e : 0),
        a = this._restrictMinMax(
          t,
          this._daylightSavingAdjust(new Date(s, n, o))
        );
      (t.selectedDay = a.getDate()),
        (t.drawMonth = t.selectedMonth = a.getMonth()),
        (t.drawYear = t.selectedYear = a.getFullYear()),
        ("M" === i || "Y" === i) && this._notifyChange(t);
    },
    _restrictMinMax: function (t, e) {
      var i = this._getMinMaxDate(t, "min"),
        s = this._getMinMaxDate(t, "max"),
        n = i && i > e ? i : e;
      return s && n > s ? s : n;
    },
    _notifyChange: function (t) {
      var e = this._get(t, "onChangeMonthYear");
      e &&
        e.apply(t.input ? t.input[0] : null, [
          t.selectedYear,
          t.selectedMonth + 1,
          t,
        ]);
    },
    _getNumberOfMonths: function (t) {
      var e = this._get(t, "numberOfMonths");
      return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e;
    },
    _getMinMaxDate: function (t, e) {
      return this._determineDate(t, this._get(t, e + "Date"), null);
    },
    _getDaysInMonth: function (t, e) {
      return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
    },
    _getFirstDayOfMonth: function (t, e) {
      return new Date(t, e, 1).getDay();
    },
    _canAdjustMonth: function (t, e, i, s) {
      var n = this._getNumberOfMonths(t),
        o = this._daylightSavingAdjust(
          new Date(i, s + (0 > e ? e : n[0] * n[1]), 1)
        );
      return (
        0 > e && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())),
        this._isInRange(t, o)
      );
    },
    _isInRange: function (t, e) {
      var i,
        s,
        n = this._getMinMaxDate(t, "min"),
        o = this._getMinMaxDate(t, "max"),
        a = null,
        r = null,
        h = this._get(t, "yearRange");
      return (
        h &&
          ((i = h.split(":")),
          (s = new Date().getFullYear()),
          (a = parseInt(i[0], 10)),
          (r = parseInt(i[1], 10)),
          i[0].match(/[+\-].*/) && (a += s),
          i[1].match(/[+\-].*/) && (r += s)),
        (!n || e.getTime() >= n.getTime()) &&
          (!o || e.getTime() <= o.getTime()) &&
          (!a || e.getFullYear() >= a) &&
          (!r || r >= e.getFullYear())
      );
    },
    _getFormatConfig: function (t) {
      var e = this._get(t, "shortYearCutoff");
      return (
        (e =
          "string" != typeof e
            ? e
            : (new Date().getFullYear() % 100) + parseInt(e, 10)),
        {
          shortYearCutoff: e,
          dayNamesShort: this._get(t, "dayNamesShort"),
          dayNames: this._get(t, "dayNames"),
          monthNamesShort: this._get(t, "monthNamesShort"),
          monthNames: this._get(t, "monthNames"),
        }
      );
    },
    _formatDate: function (t, e, i, s) {
      e ||
        ((t.currentDay = t.selectedDay),
        (t.currentMonth = t.selectedMonth),
        (t.currentYear = t.selectedYear));
      var n = e
        ? "object" == typeof e
          ? e
          : this._daylightSavingAdjust(new Date(s, i, e))
        : this._daylightSavingAdjust(
            new Date(t.currentYear, t.currentMonth, t.currentDay)
          );
      return this.formatDate(
        this._get(t, "dateFormat"),
        n,
        this._getFormatConfig(t)
      );
    },
  }),
    (t.fn.datepicker = function (e) {
      if (!this.length) return this;
      t.datepicker.initialized ||
        (t(document).on("mousedown", t.datepicker._checkExternalClick),
        (t.datepicker.initialized = !0)),
        0 === t("#" + t.datepicker._mainDivId).length &&
          t("body").append(t.datepicker.dpDiv);
      var i = Array.prototype.slice.call(arguments, 1);
      return "string" != typeof e ||
        ("isDisabled" !== e && "getDate" !== e && "widget" !== e)
        ? "option" === e &&
          2 === arguments.length &&
          "string" == typeof arguments[1]
          ? t.datepicker["_" + e + "Datepicker"].apply(
              t.datepicker,
              [this[0]].concat(i)
            )
          : this.each(function () {
              "string" == typeof e
                ? t.datepicker["_" + e + "Datepicker"].apply(
                    t.datepicker,
                    [this].concat(i)
                  )
                : t.datepicker._attachDatepicker(this, e);
            })
        : t.datepicker["_" + e + "Datepicker"].apply(
            t.datepicker,
            [this[0]].concat(i)
          );
    }),
    (t.datepicker = new s()),
    (t.datepicker.initialized = !1),
    (t.datepicker.uuid = new Date().getTime()),
    (t.datepicker.version = "1.12.1"),
    t.datepicker,
    (t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
  var _ = !1;
  t(document).on("mouseup", function () {
    _ = !1;
  }),
    t.widget("ui.mouse", {
      version: "1.12.1",
      options: {
        cancel: "input, textarea, button, select, option",
        distance: 1,
        delay: 0,
      },
      _mouseInit: function () {
        var e = this;
        this.element
          .on("mousedown." + this.widgetName, function (t) {
            return e._mouseDown(t);
          })
          .on("click." + this.widgetName, function (i) {
            return !0 === t.data(i.target, e.widgetName + ".preventClickEvent")
              ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"),
                i.stopImmediatePropagation(),
                !1)
              : void 0;
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.off("." + this.widgetName),
          this._mouseMoveDelegate &&
            this.document
              .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .off("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (e) {
        if (!_) {
          (this._mouseMoved = !1),
            this._mouseStarted && this._mouseUp(e),
            (this._mouseDownEvent = e);
          var i = this,
            s = 1 === e.which,
            n =
              "string" == typeof this.options.cancel && e.target.nodeName
                ? t(e.target).closest(this.options.cancel).length
                : !1;
          return s && !n && this._mouseCapture(e)
            ? ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  i.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(e) &&
              this._mouseDelayMet(e) &&
              ((this._mouseStarted = this._mouseStart(e) !== !1),
              !this._mouseStarted)
                ? (e.preventDefault(), !0)
                : (!0 ===
                    t.data(e.target, this.widgetName + ".preventClickEvent") &&
                    t.removeData(
                      e.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (t) {
                    return i._mouseMove(t);
                  }),
                  (this._mouseUpDelegate = function (t) {
                    return i._mouseUp(t);
                  }),
                  this.document
                    .on("mousemove." + this.widgetName, this._mouseMoveDelegate)
                    .on("mouseup." + this.widgetName, this._mouseUpDelegate),
                  e.preventDefault(),
                  (_ = !0),
                  !0))
            : !0;
        }
      },
      _mouseMove: function (e) {
        if (this._mouseMoved) {
          if (
            t.ui.ie &&
            (!document.documentMode || 9 > document.documentMode) &&
            !e.button
          )
            return this._mouseUp(e);
          if (!e.which)
            if (
              e.originalEvent.altKey ||
              e.originalEvent.ctrlKey ||
              e.originalEvent.metaKey ||
              e.originalEvent.shiftKey
            )
              this.ignoreMissingWhich = !0;
            else if (!this.ignoreMissingWhich) return this._mouseUp(e);
        }
        return (
          (e.which || e.button) && (this._mouseMoved = !0),
          this._mouseStarted
            ? (this._mouseDrag(e), e.preventDefault())
            : (this._mouseDistanceMet(e) &&
                this._mouseDelayMet(e) &&
                ((this._mouseStarted =
                  this._mouseStart(this._mouseDownEvent, e) !== !1),
                this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
              !this._mouseStarted)
        );
      },
      _mouseUp: function (e) {
        this.document
          .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
          .off("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            e.target === this._mouseDownEvent.target &&
              t.data(e.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(e)),
          this._mouseDelayTimer &&
            (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer),
          (this.ignoreMissingWhich = !1),
          (_ = !1),
          e.preventDefault();
      },
      _mouseDistanceMet: function (t) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - t.pageX),
            Math.abs(this._mouseDownEvent.pageY - t.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      },
    }),
    (t.ui.plugin = {
      add: function (e, i, s) {
        var n,
          o = t.ui[e].prototype;
        for (n in s)
          (o.plugins[n] = o.plugins[n] || []), o.plugins[n].push([i, s[n]]);
      },
      call: function (t, e, i, s) {
        var n,
          o = t.plugins[e];
        if (
          o &&
          (s ||
            (t.element[0].parentNode &&
              11 !== t.element[0].parentNode.nodeType))
        )
          for (n = 0; o.length > n; n++)
            t.options[o[n][0]] && o[n][1].apply(t.element, i);
      },
    }),
    (t.ui.safeBlur = function (e) {
      e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur");
    }),
    t.widget("ui.draggable", t.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "drag",
      options: {
        addClasses: !0,
        appendTo: "parent",
        axis: !1,
        connectToSortable: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        iframeFix: !1,
        opacity: !1,
        refreshPositions: !1,
        revert: !1,
        revertDuration: 500,
        scope: "default",
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: !1,
        snapMode: "both",
        snapTolerance: 20,
        stack: !1,
        zIndex: !1,
        drag: null,
        start: null,
        stop: null,
      },
      _create: function () {
        "original" === this.options.helper && this._setPositionRelative(),
          this.options.addClasses && this._addClass("ui-draggable"),
          this._setHandleClassName(),
          this._mouseInit();
      },
      _setOption: function (t, e) {
        this._super(t, e),
          "handle" === t &&
            (this._removeHandleClassName(), this._setHandleClassName());
      },
      _destroy: function () {
        return (this.helper || this.element).is(".ui-draggable-dragging")
          ? ((this.destroyOnClear = !0), void 0)
          : (this._removeHandleClassName(), this._mouseDestroy(), void 0);
      },
      _mouseCapture: function (e) {
        var i = this.options;
        return this.helper ||
          i.disabled ||
          t(e.target).closest(".ui-resizable-handle").length > 0
          ? !1
          : ((this.handle = this._getHandle(e)),
            this.handle
              ? (this._blurActiveElement(e),
                this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix),
                !0)
              : !1);
      },
      _blockFrames: function (e) {
        this.iframeBlocks = this.document.find(e).map(function () {
          var e = t(this);
          return t("<div>")
            .css("position", "absolute")
            .appendTo(e.parent())
            .outerWidth(e.outerWidth())
            .outerHeight(e.outerHeight())
            .offset(e.offset())[0];
        });
      },
      _unblockFrames: function () {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _blurActiveElement: function (e) {
        var i = t.ui.safeActiveElement(this.document[0]),
          s = t(e.target);
        s.closest(i).length || t.ui.safeBlur(i);
      },
      _mouseStart: function (e) {
        var i = this.options;
        return (
          (this.helper = this._createHelper(e)),
          this._addClass(this.helper, "ui-draggable-dragging"),
          this._cacheHelperProportions(),
          t.ui.ddmanager && (t.ui.ddmanager.current = this),
          this._cacheMargins(),
          (this.cssPosition = this.helper.css("position")),
          (this.scrollParent = this.helper.scrollParent(!0)),
          (this.offsetParent = this.helper.offsetParent()),
          (this.hasFixedAncestor =
            this.helper.parents().filter(function () {
              return "fixed" === t(this).css("position");
            }).length > 0),
          (this.positionAbs = this.element.offset()),
          this._refreshOffsets(e),
          (this.originalPosition = this.position =
            this._generatePosition(e, !1)),
          (this.originalPageX = e.pageX),
          (this.originalPageY = e.pageY),
          i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
          this._setContainment(),
          this._trigger("start", e) === !1
            ? (this._clear(), !1)
            : (this._cacheHelperProportions(),
              t.ui.ddmanager &&
                !i.dropBehaviour &&
                t.ui.ddmanager.prepareOffsets(this, e),
              this._mouseDrag(e, !0),
              t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e),
              !0)
        );
      },
      _refreshOffsets: function (t) {
        (this.offset = {
          top: this.positionAbs.top - this.margins.top,
          left: this.positionAbs.left - this.margins.left,
          scroll: !1,
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset(),
        }),
          (this.offset.click = {
            left: t.pageX - this.offset.left,
            top: t.pageY - this.offset.top,
          });
      },
      _mouseDrag: function (e, i) {
        if (
          (this.hasFixedAncestor &&
            (this.offset.parent = this._getParentOffset()),
          (this.position = this._generatePosition(e, !0)),
          (this.positionAbs = this._convertPositionTo("absolute")),
          !i)
        ) {
          var s = this._uiHash();
          if (this._trigger("drag", e, s) === !1)
            return this._mouseUp(new t.Event("mouseup", e)), !1;
          this.position = s.position;
        }
        return (
          (this.helper[0].style.left = this.position.left + "px"),
          (this.helper[0].style.top = this.position.top + "px"),
          t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
          !1
        );
      },
      _mouseStop: function (e) {
        var i = this,
          s = !1;
        return (
          t.ui.ddmanager &&
            !this.options.dropBehaviour &&
            (s = t.ui.ddmanager.drop(this, e)),
          this.dropped && ((s = this.dropped), (this.dropped = !1)),
          ("invalid" === this.options.revert && !s) ||
          ("valid" === this.options.revert && s) ||
          this.options.revert === !0 ||
          (t.isFunction(this.options.revert) &&
            this.options.revert.call(this.element, s))
            ? t(this.helper).animate(
                this.originalPosition,
                parseInt(this.options.revertDuration, 10),
                function () {
                  i._trigger("stop", e) !== !1 && i._clear();
                }
              )
            : this._trigger("stop", e) !== !1 && this._clear(),
          !1
        );
      },
      _mouseUp: function (e) {
        return (
          this._unblockFrames(),
          t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
          this.handleElement.is(e.target) && this.element.trigger("focus"),
          t.ui.mouse.prototype._mouseUp.call(this, e)
        );
      },
      cancel: function () {
        return (
          this.helper.is(".ui-draggable-dragging")
            ? this._mouseUp(new t.Event("mouseup", { target: this.element[0] }))
            : this._clear(),
          this
        );
      },
      _getHandle: function (e) {
        return this.options.handle
          ? !!t(e.target).closest(this.element.find(this.options.handle)).length
          : !0;
      },
      _setHandleClassName: function () {
        (this.handleElement = this.options.handle
          ? this.element.find(this.options.handle)
          : this.element),
          this._addClass(this.handleElement, "ui-draggable-handle");
      },
      _removeHandleClassName: function () {
        this._removeClass(this.handleElement, "ui-draggable-handle");
      },
      _createHelper: function (e) {
        var i = this.options,
          s = t.isFunction(i.helper),
          n = s
            ? t(i.helper.apply(this.element[0], [e]))
            : "clone" === i.helper
            ? this.element.clone().removeAttr("id")
            : this.element;
        return (
          n.parents("body").length ||
            n.appendTo(
              "parent" === i.appendTo ? this.element[0].parentNode : i.appendTo
            ),
          s && n[0] === this.element[0] && this._setPositionRelative(),
          n[0] === this.element[0] ||
            /(fixed|absolute)/.test(n.css("position")) ||
            n.css("position", "absolute"),
          n
        );
      },
      _setPositionRelative: function () {
        /^(?:r|a|f)/.test(this.element.css("position")) ||
          (this.element[0].style.position = "relative");
      },
      _adjustOffsetFromHelper: function (e) {
        "string" == typeof e && (e = e.split(" ")),
          t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
          "left" in e && (this.offset.click.left = e.left + this.margins.left),
          "right" in e &&
            (this.offset.click.left =
              this.helperProportions.width - e.right + this.margins.left),
          "top" in e && (this.offset.click.top = e.top + this.margins.top),
          "bottom" in e &&
            (this.offset.click.top =
              this.helperProportions.height - e.bottom + this.margins.top);
      },
      _isRootNode: function (t) {
        return /(html|body)/i.test(t.tagName) || t === this.document[0];
      },
      _getParentOffset: function () {
        var e = this.offsetParent.offset(),
          i = this.document[0];
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== i &&
            t.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((e.left += this.scrollParent.scrollLeft()),
            (e.top += this.scrollParent.scrollTop())),
          this._isRootNode(this.offsetParent[0]) && (e = { top: 0, left: 0 }),
          {
            top:
              e.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              e.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
        var t = this.element.position(),
          e = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            t.top -
            (parseInt(this.helper.css("top"), 10) || 0) +
            (e ? 0 : this.scrollParent.scrollTop()),
          left:
            t.left -
            (parseInt(this.helper.css("left"), 10) || 0) +
            (e ? 0 : this.scrollParent.scrollLeft()),
        };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.element.css("marginLeft"), 10) || 0,
          top: parseInt(this.element.css("marginTop"), 10) || 0,
          right: parseInt(this.element.css("marginRight"), 10) || 0,
          bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var e,
          i,
          s,
          n = this.options,
          o = this.document[0];
        return (
          (this.relativeContainer = null),
          n.containment
            ? "window" === n.containment
              ? ((this.containment = [
                  t(window).scrollLeft() -
                    this.offset.relative.left -
                    this.offset.parent.left,
                  t(window).scrollTop() -
                    this.offset.relative.top -
                    this.offset.parent.top,
                  t(window).scrollLeft() +
                    t(window).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  t(window).scrollTop() +
                    (t(window).height() || o.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top,
                ]),
                void 0)
              : "document" === n.containment
              ? ((this.containment = [
                  0,
                  0,
                  t(o).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  (t(o).height() || o.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top,
                ]),
                void 0)
              : n.containment.constructor === Array
              ? ((this.containment = n.containment), void 0)
              : ("parent" === n.containment &&
                  (n.containment = this.helper[0].parentNode),
                (i = t(n.containment)),
                (s = i[0]),
                s &&
                  ((e = /(scroll|auto)/.test(i.css("overflow"))),
                  (this.containment = [
                    (parseInt(i.css("borderLeftWidth"), 10) || 0) +
                      (parseInt(i.css("paddingLeft"), 10) || 0),
                    (parseInt(i.css("borderTopWidth"), 10) || 0) +
                      (parseInt(i.css("paddingTop"), 10) || 0),
                    (e
                      ? Math.max(s.scrollWidth, s.offsetWidth)
                      : s.offsetWidth) -
                      (parseInt(i.css("borderRightWidth"), 10) || 0) -
                      (parseInt(i.css("paddingRight"), 10) || 0) -
                      this.helperProportions.width -
                      this.margins.left -
                      this.margins.right,
                    (e
                      ? Math.max(s.scrollHeight, s.offsetHeight)
                      : s.offsetHeight) -
                      (parseInt(i.css("borderBottomWidth"), 10) || 0) -
                      (parseInt(i.css("paddingBottom"), 10) || 0) -
                      this.helperProportions.height -
                      this.margins.top -
                      this.margins.bottom,
                  ]),
                  (this.relativeContainer = i)),
                void 0)
            : ((this.containment = null), void 0)
        );
      },
      _convertPositionTo: function (t, e) {
        e || (e = this.position);
        var i = "absolute" === t ? 1 : -1,
          s = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            e.top +
            this.offset.relative.top * i +
            this.offset.parent.top * i -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.top
              : s
              ? 0
              : this.offset.scroll.top) *
              i,
          left:
            e.left +
            this.offset.relative.left * i +
            this.offset.parent.left * i -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.left
              : s
              ? 0
              : this.offset.scroll.left) *
              i,
        };
      },
      _generatePosition: function (t, e) {
        var i,
          s,
          n,
          o,
          a = this.options,
          r = this._isRootNode(this.scrollParent[0]),
          h = t.pageX,
          l = t.pageY;
        return (
          (r && this.offset.scroll) ||
            (this.offset.scroll = {
              top: this.scrollParent.scrollTop(),
              left: this.scrollParent.scrollLeft(),
            }),
          e &&
            (this.containment &&
              (this.relativeContainer
                ? ((s = this.relativeContainer.offset()),
                  (i = [
                    this.containment[0] + s.left,
                    this.containment[1] + s.top,
                    this.containment[2] + s.left,
                    this.containment[3] + s.top,
                  ]))
                : (i = this.containment),
              t.pageX - this.offset.click.left < i[0] &&
                (h = i[0] + this.offset.click.left),
              t.pageY - this.offset.click.top < i[1] &&
                (l = i[1] + this.offset.click.top),
              t.pageX - this.offset.click.left > i[2] &&
                (h = i[2] + this.offset.click.left),
              t.pageY - this.offset.click.top > i[3] &&
                (l = i[3] + this.offset.click.top)),
            a.grid &&
              ((n = a.grid[1]
                ? this.originalPageY +
                  Math.round((l - this.originalPageY) / a.grid[1]) * a.grid[1]
                : this.originalPageY),
              (l = i
                ? n - this.offset.click.top >= i[1] ||
                  n - this.offset.click.top > i[3]
                  ? n
                  : n - this.offset.click.top >= i[1]
                  ? n - a.grid[1]
                  : n + a.grid[1]
                : n),
              (o = a.grid[0]
                ? this.originalPageX +
                  Math.round((h - this.originalPageX) / a.grid[0]) * a.grid[0]
                : this.originalPageX),
              (h = i
                ? o - this.offset.click.left >= i[0] ||
                  o - this.offset.click.left > i[2]
                  ? o
                  : o - this.offset.click.left >= i[0]
                  ? o - a.grid[0]
                  : o + a.grid[0]
                : o)),
            "y" === a.axis && (h = this.originalPageX),
            "x" === a.axis && (l = this.originalPageY)),
          {
            top:
              l -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.top
                : r
                ? 0
                : this.offset.scroll.top),
            left:
              h -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.left
                : r
                ? 0
                : this.offset.scroll.left),
          }
        );
      },
      _clear: function () {
        this._removeClass(this.helper, "ui-draggable-dragging"),
          this.helper[0] === this.element[0] ||
            this.cancelHelperRemoval ||
            this.helper.remove(),
          (this.helper = null),
          (this.cancelHelperRemoval = !1),
          this.destroyOnClear && this.destroy();
      },
      _trigger: function (e, i, s) {
        return (
          (s = s || this._uiHash()),
          t.ui.plugin.call(this, e, [i, s, this], !0),
          /^(drag|start|stop)/.test(e) &&
            ((this.positionAbs = this._convertPositionTo("absolute")),
            (s.offset = this.positionAbs)),
          t.Widget.prototype._trigger.call(this, e, i, s)
        );
      },
      plugins: {},
      _uiHash: function () {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs,
        };
      },
    }),
    t.ui.plugin.add("draggable", "connectToSortable", {
      start: function (e, i, s) {
        var n = t.extend({}, i, { item: s.element });
        (s.sortables = []),
          t(s.options.connectToSortable).each(function () {
            var i = t(this).sortable("instance");
            i &&
              !i.options.disabled &&
              (s.sortables.push(i),
              i.refreshPositions(),
              i._trigger("activate", e, n));
          });
      },
      stop: function (e, i, s) {
        var n = t.extend({}, i, { item: s.element });
        (s.cancelHelperRemoval = !1),
          t.each(s.sortables, function () {
            var t = this;
            t.isOver
              ? ((t.isOver = 0),
                (s.cancelHelperRemoval = !0),
                (t.cancelHelperRemoval = !1),
                (t._storedCSS = {
                  position: t.placeholder.css("position"),
                  top: t.placeholder.css("top"),
                  left: t.placeholder.css("left"),
                }),
                t._mouseStop(e),
                (t.options.helper = t.options._helper))
              : ((t.cancelHelperRemoval = !0), t._trigger("deactivate", e, n));
          });
      },
      drag: function (e, i, s) {
        t.each(s.sortables, function () {
          var n = !1,
            o = this;
          (o.positionAbs = s.positionAbs),
            (o.helperProportions = s.helperProportions),
            (o.offset.click = s.offset.click),
            o._intersectsWith(o.containerCache) &&
              ((n = !0),
              t.each(s.sortables, function () {
                return (
                  (this.positionAbs = s.positionAbs),
                  (this.helperProportions = s.helperProportions),
                  (this.offset.click = s.offset.click),
                  this !== o &&
                    this._intersectsWith(this.containerCache) &&
                    t.contains(o.element[0], this.element[0]) &&
                    (n = !1),
                  n
                );
              })),
            n
              ? (o.isOver ||
                  ((o.isOver = 1),
                  (s._parent = i.helper.parent()),
                  (o.currentItem = i.helper
                    .appendTo(o.element)
                    .data("ui-sortable-item", !0)),
                  (o.options._helper = o.options.helper),
                  (o.options.helper = function () {
                    return i.helper[0];
                  }),
                  (e.target = o.currentItem[0]),
                  o._mouseCapture(e, !0),
                  o._mouseStart(e, !0, !0),
                  (o.offset.click.top = s.offset.click.top),
                  (o.offset.click.left = s.offset.click.left),
                  (o.offset.parent.left -=
                    s.offset.parent.left - o.offset.parent.left),
                  (o.offset.parent.top -=
                    s.offset.parent.top - o.offset.parent.top),
                  s._trigger("toSortable", e),
                  (s.dropped = o.element),
                  t.each(s.sortables, function () {
                    this.refreshPositions();
                  }),
                  (s.currentItem = s.element),
                  (o.fromOutside = s)),
                o.currentItem && (o._mouseDrag(e), (i.position = o.position)))
              : o.isOver &&
                ((o.isOver = 0),
                (o.cancelHelperRemoval = !0),
                (o.options._revert = o.options.revert),
                (o.options.revert = !1),
                o._trigger("out", e, o._uiHash(o)),
                o._mouseStop(e, !0),
                (o.options.revert = o.options._revert),
                (o.options.helper = o.options._helper),
                o.placeholder && o.placeholder.remove(),
                i.helper.appendTo(s._parent),
                s._refreshOffsets(e),
                (i.position = s._generatePosition(e, !0)),
                s._trigger("fromSortable", e),
                (s.dropped = !1),
                t.each(s.sortables, function () {
                  this.refreshPositions();
                }));
        });
      },
    }),
    t.ui.plugin.add("draggable", "cursor", {
      start: function (e, i, s) {
        var n = t("body"),
          o = s.options;
        n.css("cursor") && (o._cursor = n.css("cursor")),
          n.css("cursor", o.cursor);
      },
      stop: function (e, i, s) {
        var n = s.options;
        n._cursor && t("body").css("cursor", n._cursor);
      },
    }),
    t.ui.plugin.add("draggable", "opacity", {
      start: function (e, i, s) {
        var n = t(i.helper),
          o = s.options;
        n.css("opacity") && (o._opacity = n.css("opacity")),
          n.css("opacity", o.opacity);
      },
      stop: function (e, i, s) {
        var n = s.options;
        n._opacity && t(i.helper).css("opacity", n._opacity);
      },
    }),
    t.ui.plugin.add("draggable", "scroll", {
      start: function (t, e, i) {
        i.scrollParentNotHidden ||
          (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
          i.scrollParentNotHidden[0] !== i.document[0] &&
            "HTML" !== i.scrollParentNotHidden[0].tagName &&
            (i.overflowOffset = i.scrollParentNotHidden.offset());
      },
      drag: function (e, i, s) {
        var n = s.options,
          o = !1,
          a = s.scrollParentNotHidden[0],
          r = s.document[0];
        a !== r && "HTML" !== a.tagName
          ? ((n.axis && "x" === n.axis) ||
              (s.overflowOffset.top + a.offsetHeight - e.pageY <
              n.scrollSensitivity
                ? (a.scrollTop = o = a.scrollTop + n.scrollSpeed)
                : e.pageY - s.overflowOffset.top < n.scrollSensitivity &&
                  (a.scrollTop = o = a.scrollTop - n.scrollSpeed)),
            (n.axis && "y" === n.axis) ||
              (s.overflowOffset.left + a.offsetWidth - e.pageX <
              n.scrollSensitivity
                ? (a.scrollLeft = o = a.scrollLeft + n.scrollSpeed)
                : e.pageX - s.overflowOffset.left < n.scrollSensitivity &&
                  (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed)))
          : ((n.axis && "x" === n.axis) ||
              (e.pageY - t(r).scrollTop() < n.scrollSensitivity
                ? (o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed))
                : t(window).height() - (e.pageY - t(r).scrollTop()) <
                    n.scrollSensitivity &&
                  (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))),
            (n.axis && "y" === n.axis) ||
              (e.pageX - t(r).scrollLeft() < n.scrollSensitivity
                ? (o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed))
                : t(window).width() - (e.pageX - t(r).scrollLeft()) <
                    n.scrollSensitivity &&
                  (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))),
          o !== !1 &&
            t.ui.ddmanager &&
            !n.dropBehaviour &&
            t.ui.ddmanager.prepareOffsets(s, e);
      },
    }),
    t.ui.plugin.add("draggable", "snap", {
      start: function (e, i, s) {
        var n = s.options;
        (s.snapElements = []),
          t(
            n.snap.constructor !== String
              ? n.snap.items || ":data(ui-draggable)"
              : n.snap
          ).each(function () {
            var e = t(this),
              i = e.offset();
            this !== s.element[0] &&
              s.snapElements.push({
                item: this,
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: i.top,
                left: i.left,
              });
          });
      },
      drag: function (e, i, s) {
        var n,
          o,
          a,
          r,
          h,
          l,
          c,
          u,
          d,
          p,
          f = s.options,
          g = f.snapTolerance,
          m = i.offset.left,
          _ = m + s.helperProportions.width,
          v = i.offset.top,
          b = v + s.helperProportions.height;
        for (d = s.snapElements.length - 1; d >= 0; d--)
          (h = s.snapElements[d].left - s.margins.left),
            (l = h + s.snapElements[d].width),
            (c = s.snapElements[d].top - s.margins.top),
            (u = c + s.snapElements[d].height),
            h - g > _ ||
            m > l + g ||
            c - g > b ||
            v > u + g ||
            !t.contains(
              s.snapElements[d].item.ownerDocument,
              s.snapElements[d].item
            )
              ? (s.snapElements[d].snapping &&
                  s.options.snap.release &&
                  s.options.snap.release.call(
                    s.element,
                    e,
                    t.extend(s._uiHash(), { snapItem: s.snapElements[d].item })
                  ),
                (s.snapElements[d].snapping = !1))
              : ("inner" !== f.snapMode &&
                  ((n = g >= Math.abs(c - b)),
                  (o = g >= Math.abs(u - v)),
                  (a = g >= Math.abs(h - _)),
                  (r = g >= Math.abs(l - m)),
                  n &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: c - s.helperProportions.height,
                      left: 0,
                    }).top),
                  o &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: u,
                      left: 0,
                    }).top),
                  a &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: h - s.helperProportions.width,
                    }).left),
                  r &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: l,
                    }).left)),
                (p = n || o || a || r),
                "outer" !== f.snapMode &&
                  ((n = g >= Math.abs(c - v)),
                  (o = g >= Math.abs(u - b)),
                  (a = g >= Math.abs(h - m)),
                  (r = g >= Math.abs(l - _)),
                  n &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: c,
                      left: 0,
                    }).top),
                  o &&
                    (i.position.top = s._convertPositionTo("relative", {
                      top: u - s.helperProportions.height,
                      left: 0,
                    }).top),
                  a &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: h,
                    }).left),
                  r &&
                    (i.position.left = s._convertPositionTo("relative", {
                      top: 0,
                      left: l - s.helperProportions.width,
                    }).left)),
                !s.snapElements[d].snapping &&
                  (n || o || a || r || p) &&
                  s.options.snap.snap &&
                  s.options.snap.snap.call(
                    s.element,
                    e,
                    t.extend(s._uiHash(), { snapItem: s.snapElements[d].item })
                  ),
                (s.snapElements[d].snapping = n || o || a || r || p));
      },
    }),
    t.ui.plugin.add("draggable", "stack", {
      start: function (e, i, s) {
        var n,
          o = s.options,
          a = t.makeArray(t(o.stack)).sort(function (e, i) {
            return (
              (parseInt(t(e).css("zIndex"), 10) || 0) -
              (parseInt(t(i).css("zIndex"), 10) || 0)
            );
          });
        a.length &&
          ((n = parseInt(t(a[0]).css("zIndex"), 10) || 0),
          t(a).each(function (e) {
            t(this).css("zIndex", n + e);
          }),
          this.css("zIndex", n + a.length));
      },
    }),
    t.ui.plugin.add("draggable", "zIndex", {
      start: function (e, i, s) {
        var n = t(i.helper),
          o = s.options;
        n.css("zIndex") && (o._zIndex = n.css("zIndex")),
          n.css("zIndex", o.zIndex);
      },
      stop: function (e, i, s) {
        var n = s.options;
        n._zIndex && t(i.helper).css("zIndex", n._zIndex);
      },
    }),
    t.ui.draggable,
    t.widget("ui.resizable", t.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "resize",
      options: {
        alsoResize: !1,
        animate: !1,
        animateDuration: "slow",
        animateEasing: "swing",
        aspectRatio: !1,
        autoHide: !1,
        classes: { "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se" },
        containment: !1,
        ghost: !1,
        grid: !1,
        handles: "e,s,se",
        helper: !1,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,
        zIndex: 90,
        resize: null,
        start: null,
        stop: null,
      },
      _num: function (t) {
        return parseFloat(t) || 0;
      },
      _isNumber: function (t) {
        return !isNaN(parseFloat(t));
      },
      _hasScroll: function (e, i) {
        if ("hidden" === t(e).css("overflow")) return !1;
        var s = i && "left" === i ? "scrollLeft" : "scrollTop",
          n = !1;
        return e[s] > 0 ? !0 : ((e[s] = 1), (n = e[s] > 0), (e[s] = 0), n);
      },
      _create: function () {
        var e,
          i = this.options,
          s = this;
        this._addClass("ui-resizable"),
          t.extend(this, {
            _aspectRatio: !!i.aspectRatio,
            aspectRatio: i.aspectRatio,
            originalElement: this.element,
            _proportionallyResizeElements: [],
            _helper:
              i.helper || i.ghost || i.animate
                ? i.helper || "ui-resizable-helper"
                : null,
          }),
          this.element[0].nodeName.match(
            /^(canvas|textarea|input|select|button|img)$/i
          ) &&
            (this.element.wrap(
              t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css(
                {
                  position: this.element.css("position"),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css("top"),
                  left: this.element.css("left"),
                }
              )
            ),
            (this.element = this.element
              .parent()
              .data("ui-resizable", this.element.resizable("instance"))),
            (this.elementIsWrapper = !0),
            (e = {
              marginTop: this.originalElement.css("marginTop"),
              marginRight: this.originalElement.css("marginRight"),
              marginBottom: this.originalElement.css("marginBottom"),
              marginLeft: this.originalElement.css("marginLeft"),
            }),
            this.element.css(e),
            this.originalElement.css("margin", 0),
            (this.originalResizeStyle = this.originalElement.css("resize")),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(
              this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block",
              })
            ),
            this.originalElement.css(e),
            this._proportionallyResize()),
          this._setupHandles(),
          i.autoHide &&
            t(this.element)
              .on("mouseenter", function () {
                i.disabled ||
                  (s._removeClass("ui-resizable-autohide"), s._handles.show());
              })
              .on("mouseleave", function () {
                i.disabled ||
                  s.resizing ||
                  (s._addClass("ui-resizable-autohide"), s._handles.hide());
              }),
          this._mouseInit();
      },
      _destroy: function () {
        this._mouseDestroy();
        var e,
          i = function (e) {
            t(e)
              .removeData("resizable")
              .removeData("ui-resizable")
              .off(".resizable")
              .find(".ui-resizable-handle")
              .remove();
          };
        return (
          this.elementIsWrapper &&
            (i(this.element),
            (e = this.element),
            this.originalElement
              .css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left"),
              })
              .insertAfter(e),
            e.remove()),
          this.originalElement.css("resize", this.originalResizeStyle),
          i(this.originalElement),
          this
        );
      },
      _setOption: function (t, e) {
        switch ((this._super(t, e), t)) {
          case "handles":
            this._removeHandles(), this._setupHandles();
            break;
          default:
        }
      },
      _setupHandles: function () {
        var e,
          i,
          s,
          n,
          o,
          a = this.options,
          r = this;
        if (
          ((this.handles =
            a.handles ||
            (t(".ui-resizable-handle", this.element).length
              ? {
                  n: ".ui-resizable-n",
                  e: ".ui-resizable-e",
                  s: ".ui-resizable-s",
                  w: ".ui-resizable-w",
                  se: ".ui-resizable-se",
                  sw: ".ui-resizable-sw",
                  ne: ".ui-resizable-ne",
                  nw: ".ui-resizable-nw",
                }
              : "e,s,se")),
          (this._handles = t()),
          this.handles.constructor === String)
        )
          for (
            "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
              s = this.handles.split(","),
              this.handles = {},
              i = 0;
            s.length > i;
            i++
          )
            (e = t.trim(s[i])),
              (n = "ui-resizable-" + e),
              (o = t("<div>")),
              this._addClass(o, "ui-resizable-handle " + n),
              o.css({ zIndex: a.zIndex }),
              (this.handles[e] = ".ui-resizable-" + e),
              this.element.append(o);
        (this._renderAxis = function (e) {
          var i, s, n, o;
          e = e || this.element;
          for (i in this.handles)
            this.handles[i].constructor === String
              ? (this.handles[i] = this.element
                  .children(this.handles[i])
                  .first()
                  .show())
              : (this.handles[i].jquery || this.handles[i].nodeType) &&
                ((this.handles[i] = t(this.handles[i])),
                this._on(this.handles[i], { mousedown: r._mouseDown })),
              this.elementIsWrapper &&
                this.originalElement[0].nodeName.match(
                  /^(textarea|input|select|button)$/i
                ) &&
                ((s = t(this.handles[i], this.element)),
                (o = /sw|ne|nw|se|n|s/.test(i)
                  ? s.outerHeight()
                  : s.outerWidth()),
                (n = [
                  "padding",
                  /ne|nw|n/.test(i)
                    ? "Top"
                    : /se|sw|s/.test(i)
                    ? "Bottom"
                    : /^e$/.test(i)
                    ? "Right"
                    : "Left",
                ].join("")),
                e.css(n, o),
                this._proportionallyResize()),
              (this._handles = this._handles.add(this.handles[i]));
        }),
          this._renderAxis(this.element),
          (this._handles = this._handles.add(
            this.element.find(".ui-resizable-handle")
          )),
          this._handles.disableSelection(),
          this._handles.on("mouseover", function () {
            r.resizing ||
              (this.className &&
                (o = this.className.match(
                  /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                )),
              (r.axis = o && o[1] ? o[1] : "se"));
          }),
          a.autoHide &&
            (this._handles.hide(), this._addClass("ui-resizable-autohide"));
      },
      _removeHandles: function () {
        this._handles.remove();
      },
      _mouseCapture: function (e) {
        var i,
          s,
          n = !1;
        for (i in this.handles)
          (s = t(this.handles[i])[0]),
            (s === e.target || t.contains(s, e.target)) && (n = !0);
        return !this.options.disabled && n;
      },
      _mouseStart: function (e) {
        var i,
          s,
          n,
          o = this.options,
          a = this.element;
        return (
          (this.resizing = !0),
          this._renderProxy(),
          (i = this._num(this.helper.css("left"))),
          (s = this._num(this.helper.css("top"))),
          o.containment &&
            ((i += t(o.containment).scrollLeft() || 0),
            (s += t(o.containment).scrollTop() || 0)),
          (this.offset = this.helper.offset()),
          (this.position = { left: i, top: s }),
          (this.size = this._helper
            ? { width: this.helper.width(), height: this.helper.height() }
            : { width: a.width(), height: a.height() }),
          (this.originalSize = this._helper
            ? { width: a.outerWidth(), height: a.outerHeight() }
            : { width: a.width(), height: a.height() }),
          (this.sizeDiff = {
            width: a.outerWidth() - a.width(),
            height: a.outerHeight() - a.height(),
          }),
          (this.originalPosition = { left: i, top: s }),
          (this.originalMousePosition = { left: e.pageX, top: e.pageY }),
          (this.aspectRatio =
            "number" == typeof o.aspectRatio
              ? o.aspectRatio
              : this.originalSize.width / this.originalSize.height || 1),
          (n = t(".ui-resizable-" + this.axis).css("cursor")),
          t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n),
          this._addClass("ui-resizable-resizing"),
          this._propagate("start", e),
          !0
        );
      },
      _mouseDrag: function (e) {
        var i,
          s,
          n = this.originalMousePosition,
          o = this.axis,
          a = e.pageX - n.left || 0,
          r = e.pageY - n.top || 0,
          h = this._change[o];
        return (
          this._updatePrevProperties(),
          h
            ? ((i = h.apply(this, [e, a, r])),
              this._updateVirtualBoundaries(e.shiftKey),
              (this._aspectRatio || e.shiftKey) &&
                (i = this._updateRatio(i, e)),
              (i = this._respectSize(i, e)),
              this._updateCache(i),
              this._propagate("resize", e),
              (s = this._applyChanges()),
              !this._helper &&
                this._proportionallyResizeElements.length &&
                this._proportionallyResize(),
              t.isEmptyObject(s) ||
                (this._updatePrevProperties(),
                this._trigger("resize", e, this.ui()),
                this._applyChanges()),
              !1)
            : !1
        );
      },
      _mouseStop: function (e) {
        this.resizing = !1;
        var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l = this.options,
          c = this;
        return (
          this._helper &&
            ((i = this._proportionallyResizeElements),
            (s = i.length && /textarea/i.test(i[0].nodeName)),
            (n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height),
            (o = s ? 0 : c.sizeDiff.width),
            (a = {
              width: c.helper.width() - o,
              height: c.helper.height() - n,
            }),
            (r =
              parseFloat(c.element.css("left")) +
                (c.position.left - c.originalPosition.left) || null),
            (h =
              parseFloat(c.element.css("top")) +
                (c.position.top - c.originalPosition.top) || null),
            l.animate || this.element.css(t.extend(a, { top: h, left: r })),
            c.helper.height(c.size.height),
            c.helper.width(c.size.width),
            this._helper && !l.animate && this._proportionallyResize()),
          t("body").css("cursor", "auto"),
          this._removeClass("ui-resizable-resizing"),
          this._propagate("stop", e),
          this._helper && this.helper.remove(),
          !1
        );
      },
      _updatePrevProperties: function () {
        (this.prevPosition = {
          top: this.position.top,
          left: this.position.left,
        }),
          (this.prevSize = {
            width: this.size.width,
            height: this.size.height,
          });
      },
      _applyChanges: function () {
        var t = {};
        return (
          this.position.top !== this.prevPosition.top &&
            (t.top = this.position.top + "px"),
          this.position.left !== this.prevPosition.left &&
            (t.left = this.position.left + "px"),
          this.size.width !== this.prevSize.width &&
            (t.width = this.size.width + "px"),
          this.size.height !== this.prevSize.height &&
            (t.height = this.size.height + "px"),
          this.helper.css(t),
          t
        );
      },
      _updateVirtualBoundaries: function (t) {
        var e,
          i,
          s,
          n,
          o,
          a = this.options;
        (o = {
          minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0,
          maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0,
          minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0,
          maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0,
        }),
          (this._aspectRatio || t) &&
            ((e = o.minHeight * this.aspectRatio),
            (s = o.minWidth / this.aspectRatio),
            (i = o.maxHeight * this.aspectRatio),
            (n = o.maxWidth / this.aspectRatio),
            e > o.minWidth && (o.minWidth = e),
            s > o.minHeight && (o.minHeight = s),
            o.maxWidth > i && (o.maxWidth = i),
            o.maxHeight > n && (o.maxHeight = n)),
          (this._vBoundaries = o);
      },
      _updateCache: function (t) {
        (this.offset = this.helper.offset()),
          this._isNumber(t.left) && (this.position.left = t.left),
          this._isNumber(t.top) && (this.position.top = t.top),
          this._isNumber(t.height) && (this.size.height = t.height),
          this._isNumber(t.width) && (this.size.width = t.width);
      },
      _updateRatio: function (t) {
        var e = this.position,
          i = this.size,
          s = this.axis;
        return (
          this._isNumber(t.height)
            ? (t.width = t.height * this.aspectRatio)
            : this._isNumber(t.width) &&
              (t.height = t.width / this.aspectRatio),
          "sw" === s &&
            ((t.left = e.left + (i.width - t.width)), (t.top = null)),
          "nw" === s &&
            ((t.top = e.top + (i.height - t.height)),
            (t.left = e.left + (i.width - t.width))),
          t
        );
      },
      _respectSize: function (t) {
        var e = this._vBoundaries,
          i = this.axis,
          s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
          n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
          o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
          a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
          r = this.originalPosition.left + this.originalSize.width,
          h = this.originalPosition.top + this.originalSize.height,
          l = /sw|nw|w/.test(i),
          c = /nw|ne|n/.test(i);
        return (
          o && (t.width = e.minWidth),
          a && (t.height = e.minHeight),
          s && (t.width = e.maxWidth),
          n && (t.height = e.maxHeight),
          o && l && (t.left = r - e.minWidth),
          s && l && (t.left = r - e.maxWidth),
          a && c && (t.top = h - e.minHeight),
          n && c && (t.top = h - e.maxHeight),
          t.width || t.height || t.left || !t.top
            ? t.width || t.height || t.top || !t.left || (t.left = null)
            : (t.top = null),
          t
        );
      },
      _getPaddingPlusBorderDimensions: function (t) {
        for (
          var e = 0,
            i = [],
            s = [
              t.css("borderTopWidth"),
              t.css("borderRightWidth"),
              t.css("borderBottomWidth"),
              t.css("borderLeftWidth"),
            ],
            n = [
              t.css("paddingTop"),
              t.css("paddingRight"),
              t.css("paddingBottom"),
              t.css("paddingLeft"),
            ];
          4 > e;
          e++
        )
          (i[e] = parseFloat(s[e]) || 0), (i[e] += parseFloat(n[e]) || 0);
        return { height: i[0] + i[2], width: i[1] + i[3] };
      },
      _proportionallyResize: function () {
        if (this._proportionallyResizeElements.length)
          for (
            var t, e = 0, i = this.helper || this.element;
            this._proportionallyResizeElements.length > e;
            e++
          )
            (t = this._proportionallyResizeElements[e]),
              this.outerDimensions ||
                (this.outerDimensions =
                  this._getPaddingPlusBorderDimensions(t)),
              t.css({
                height: i.height() - this.outerDimensions.height || 0,
                width: i.width() - this.outerDimensions.width || 0,
              });
      },
      _renderProxy: function () {
        var e = this.element,
          i = this.options;
        (this.elementOffset = e.offset()),
          this._helper
            ? ((this.helper =
                this.helper || t("<div style='overflow:hidden;'></div>")),
              this._addClass(this.helper, this._helper),
              this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex,
              }),
              this.helper.appendTo("body").disableSelection())
            : (this.helper = this.element);
      },
      _change: {
        e: function (t, e) {
          return { width: this.originalSize.width + e };
        },
        w: function (t, e) {
          var i = this.originalSize,
            s = this.originalPosition;
          return { left: s.left + e, width: i.width - e };
        },
        n: function (t, e, i) {
          var s = this.originalSize,
            n = this.originalPosition;
          return { top: n.top + i, height: s.height - i };
        },
        s: function (t, e, i) {
          return { height: this.originalSize.height + i };
        },
        se: function (e, i, s) {
          return t.extend(
            this._change.s.apply(this, arguments),
            this._change.e.apply(this, [e, i, s])
          );
        },
        sw: function (e, i, s) {
          return t.extend(
            this._change.s.apply(this, arguments),
            this._change.w.apply(this, [e, i, s])
          );
        },
        ne: function (e, i, s) {
          return t.extend(
            this._change.n.apply(this, arguments),
            this._change.e.apply(this, [e, i, s])
          );
        },
        nw: function (e, i, s) {
          return t.extend(
            this._change.n.apply(this, arguments),
            this._change.w.apply(this, [e, i, s])
          );
        },
      },
      _propagate: function (e, i) {
        t.ui.plugin.call(this, e, [i, this.ui()]),
          "resize" !== e && this._trigger(e, i, this.ui());
      },
      plugins: {},
      ui: function () {
        return {
          originalElement: this.originalElement,
          element: this.element,
          helper: this.helper,
          position: this.position,
          size: this.size,
          originalSize: this.originalSize,
          originalPosition: this.originalPosition,
        };
      },
    }),
    t.ui.plugin.add("resizable", "animate", {
      stop: function (e) {
        var i = t(this).resizable("instance"),
          s = i.options,
          n = i._proportionallyResizeElements,
          o = n.length && /textarea/i.test(n[0].nodeName),
          a = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
          r = o ? 0 : i.sizeDiff.width,
          h = { width: i.size.width - r, height: i.size.height - a },
          l =
            parseFloat(i.element.css("left")) +
              (i.position.left - i.originalPosition.left) || null,
          c =
            parseFloat(i.element.css("top")) +
              (i.position.top - i.originalPosition.top) || null;
        i.element.animate(t.extend(h, c && l ? { top: c, left: l } : {}), {
          duration: s.animateDuration,
          easing: s.animateEasing,
          step: function () {
            var s = {
              width: parseFloat(i.element.css("width")),
              height: parseFloat(i.element.css("height")),
              top: parseFloat(i.element.css("top")),
              left: parseFloat(i.element.css("left")),
            };
            n && n.length && t(n[0]).css({ width: s.width, height: s.height }),
              i._updateCache(s),
              i._propagate("resize", e);
          },
        });
      },
    }),
    t.ui.plugin.add("resizable", "containment", {
      start: function () {
        var e,
          i,
          s,
          n,
          o,
          a,
          r,
          h = t(this).resizable("instance"),
          l = h.options,
          c = h.element,
          u = l.containment,
          d =
            u instanceof t
              ? u.get(0)
              : /parent/.test(u)
              ? c.parent().get(0)
              : u;
        d &&
          ((h.containerElement = t(d)),
          /document/.test(u) || u === document
            ? ((h.containerOffset = { left: 0, top: 0 }),
              (h.containerPosition = { left: 0, top: 0 }),
              (h.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height:
                  t(document).height() || document.body.parentNode.scrollHeight,
              }))
            : ((e = t(d)),
              (i = []),
              t(["Top", "Right", "Left", "Bottom"]).each(function (t, s) {
                i[t] = h._num(e.css("padding" + s));
              }),
              (h.containerOffset = e.offset()),
              (h.containerPosition = e.position()),
              (h.containerSize = {
                height: e.innerHeight() - i[3],
                width: e.innerWidth() - i[1],
              }),
              (s = h.containerOffset),
              (n = h.containerSize.height),
              (o = h.containerSize.width),
              (a = h._hasScroll(d, "left") ? d.scrollWidth : o),
              (r = h._hasScroll(d) ? d.scrollHeight : n),
              (h.parentData = {
                element: d,
                left: s.left,
                top: s.top,
                width: a,
                height: r,
              })));
      },
      resize: function (e) {
        var i,
          s,
          n,
          o,
          a = t(this).resizable("instance"),
          r = a.options,
          h = a.containerOffset,
          l = a.position,
          c = a._aspectRatio || e.shiftKey,
          u = { top: 0, left: 0 },
          d = a.containerElement,
          p = !0;
        d[0] !== document && /static/.test(d.css("position")) && (u = h),
          l.left < (a._helper ? h.left : 0) &&
            ((a.size.width =
              a.size.width +
              (a._helper
                ? a.position.left - h.left
                : a.position.left - u.left)),
            c && ((a.size.height = a.size.width / a.aspectRatio), (p = !1)),
            (a.position.left = r.helper ? h.left : 0)),
          l.top < (a._helper ? h.top : 0) &&
            ((a.size.height =
              a.size.height +
              (a._helper ? a.position.top - h.top : a.position.top)),
            c && ((a.size.width = a.size.height * a.aspectRatio), (p = !1)),
            (a.position.top = a._helper ? h.top : 0)),
          (n = a.containerElement.get(0) === a.element.parent().get(0)),
          (o = /relative|absolute/.test(a.containerElement.css("position"))),
          n && o
            ? ((a.offset.left = a.parentData.left + a.position.left),
              (a.offset.top = a.parentData.top + a.position.top))
            : ((a.offset.left = a.element.offset().left),
              (a.offset.top = a.element.offset().top)),
          (i = Math.abs(
            a.sizeDiff.width +
              (a._helper ? a.offset.left - u.left : a.offset.left - h.left)
          )),
          (s = Math.abs(
            a.sizeDiff.height +
              (a._helper ? a.offset.top - u.top : a.offset.top - h.top)
          )),
          i + a.size.width >= a.parentData.width &&
            ((a.size.width = a.parentData.width - i),
            c && ((a.size.height = a.size.width / a.aspectRatio), (p = !1))),
          s + a.size.height >= a.parentData.height &&
            ((a.size.height = a.parentData.height - s),
            c && ((a.size.width = a.size.height * a.aspectRatio), (p = !1))),
          p ||
            ((a.position.left = a.prevPosition.left),
            (a.position.top = a.prevPosition.top),
            (a.size.width = a.prevSize.width),
            (a.size.height = a.prevSize.height));
      },
      stop: function () {
        var e = t(this).resizable("instance"),
          i = e.options,
          s = e.containerOffset,
          n = e.containerPosition,
          o = e.containerElement,
          a = t(e.helper),
          r = a.offset(),
          h = a.outerWidth() - e.sizeDiff.width,
          l = a.outerHeight() - e.sizeDiff.height;
        e._helper &&
          !i.animate &&
          /relative/.test(o.css("position")) &&
          t(this).css({ left: r.left - n.left - s.left, width: h, height: l }),
          e._helper &&
            !i.animate &&
            /static/.test(o.css("position")) &&
            t(this).css({
              left: r.left - n.left - s.left,
              width: h,
              height: l,
            });
      },
    }),
    t.ui.plugin.add("resizable", "alsoResize", {
      start: function () {
        var e = t(this).resizable("instance"),
          i = e.options;
        t(i.alsoResize).each(function () {
          var e = t(this);
          e.data("ui-resizable-alsoresize", {
            width: parseFloat(e.width()),
            height: parseFloat(e.height()),
            left: parseFloat(e.css("left")),
            top: parseFloat(e.css("top")),
          });
        });
      },
      resize: function (e, i) {
        var s = t(this).resizable("instance"),
          n = s.options,
          o = s.originalSize,
          a = s.originalPosition,
          r = {
            height: s.size.height - o.height || 0,
            width: s.size.width - o.width || 0,
            top: s.position.top - a.top || 0,
            left: s.position.left - a.left || 0,
          };
        t(n.alsoResize).each(function () {
          var e = t(this),
            s = t(this).data("ui-resizable-alsoresize"),
            n = {},
            o = e.parents(i.originalElement[0]).length
              ? ["width", "height"]
              : ["width", "height", "top", "left"];
          t.each(o, function (t, e) {
            var i = (s[e] || 0) + (r[e] || 0);
            i && i >= 0 && (n[e] = i || null);
          }),
            e.css(n);
        });
      },
      stop: function () {
        t(this).removeData("ui-resizable-alsoresize");
      },
    }),
    t.ui.plugin.add("resizable", "ghost", {
      start: function () {
        var e = t(this).resizable("instance"),
          i = e.size;
        (e.ghost = e.originalElement.clone()),
          e.ghost.css({
            opacity: 0.25,
            display: "block",
            position: "relative",
            height: i.height,
            width: i.width,
            margin: 0,
            left: 0,
            top: 0,
          }),
          e._addClass(e.ghost, "ui-resizable-ghost"),
          t.uiBackCompat !== !1 &&
            "string" == typeof e.options.ghost &&
            e.ghost.addClass(this.options.ghost),
          e.ghost.appendTo(e.helper);
      },
      resize: function () {
        var e = t(this).resizable("instance");
        e.ghost &&
          e.ghost.css({
            position: "relative",
            height: e.size.height,
            width: e.size.width,
          });
      },
      stop: function () {
        var e = t(this).resizable("instance");
        e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0));
      },
    }),
    t.ui.plugin.add("resizable", "grid", {
      resize: function () {
        var e,
          i = t(this).resizable("instance"),
          s = i.options,
          n = i.size,
          o = i.originalSize,
          a = i.originalPosition,
          r = i.axis,
          h = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
          l = h[0] || 1,
          c = h[1] || 1,
          u = Math.round((n.width - o.width) / l) * l,
          d = Math.round((n.height - o.height) / c) * c,
          p = o.width + u,
          f = o.height + d,
          g = s.maxWidth && p > s.maxWidth,
          m = s.maxHeight && f > s.maxHeight,
          _ = s.minWidth && s.minWidth > p,
          v = s.minHeight && s.minHeight > f;
        (s.grid = h),
          _ && (p += l),
          v && (f += c),
          g && (p -= l),
          m && (f -= c),
          /^(se|s|e)$/.test(r)
            ? ((i.size.width = p), (i.size.height = f))
            : /^(ne)$/.test(r)
            ? ((i.size.width = p),
              (i.size.height = f),
              (i.position.top = a.top - d))
            : /^(sw)$/.test(r)
            ? ((i.size.width = p),
              (i.size.height = f),
              (i.position.left = a.left - u))
            : ((0 >= f - c || 0 >= p - l) &&
                (e = i._getPaddingPlusBorderDimensions(this)),
              f - c > 0
                ? ((i.size.height = f), (i.position.top = a.top - d))
                : ((f = c - e.height),
                  (i.size.height = f),
                  (i.position.top = a.top + o.height - f)),
              p - l > 0
                ? ((i.size.width = p), (i.position.left = a.left - u))
                : ((p = l - e.width),
                  (i.size.width = p),
                  (i.position.left = a.left + o.width - p)));
      },
    }),
    t.ui.resizable,
    t.widget("ui.dialog", {
      version: "1.12.1",
      options: {
        appendTo: "body",
        autoOpen: !0,
        buttons: [],
        classes: {
          "ui-dialog": "ui-corner-all",
          "ui-dialog-titlebar": "ui-corner-all",
        },
        closeOnEscape: !0,
        closeText: "Close",
        draggable: !0,
        hide: null,
        height: "auto",
        maxHeight: null,
        maxWidth: null,
        minHeight: 150,
        minWidth: 150,
        modal: !1,
        position: {
          my: "center",
          at: "center",
          of: window,
          collision: "fit",
          using: function (e) {
            var i = t(this).css(e).offset().top;
            0 > i && t(this).css("top", e.top - i);
          },
        },
        resizable: !0,
        show: null,
        title: null,
        width: 300,
        beforeClose: null,
        close: null,
        drag: null,
        dragStart: null,
        dragStop: null,
        focus: null,
        open: null,
        resize: null,
        resizeStart: null,
        resizeStop: null,
      },
      sizeRelatedOptions: {
        buttons: !0,
        height: !0,
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
        width: !0,
      },
      resizableRelatedOptions: {
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
      },
      _create: function () {
        (this.originalCss = {
          display: this.element[0].style.display,
          width: this.element[0].style.width,
          minHeight: this.element[0].style.minHeight,
          maxHeight: this.element[0].style.maxHeight,
          height: this.element[0].style.height,
        }),
          (this.originalPosition = {
            parent: this.element.parent(),
            index: this.element.parent().children().index(this.element),
          }),
          (this.originalTitle = this.element.attr("title")),
          null == this.options.title &&
            null != this.originalTitle &&
            (this.options.title = this.originalTitle),
          this.options.disabled && (this.options.disabled = !1),
          this._createWrapper(),
          this.element.show().removeAttr("title").appendTo(this.uiDialog),
          this._addClass("ui-dialog-content", "ui-widget-content"),
          this._createTitlebar(),
          this._createButtonPane(),
          this.options.draggable && t.fn.draggable && this._makeDraggable(),
          this.options.resizable && t.fn.resizable && this._makeResizable(),
          (this._isOpen = !1),
          this._trackFocus();
      },
      _init: function () {
        this.options.autoOpen && this.open();
      },
      _appendTo: function () {
        var e = this.options.appendTo;
        return e && (e.jquery || e.nodeType)
          ? t(e)
          : this.document.find(e || "body").eq(0);
      },
      _destroy: function () {
        var t,
          e = this.originalPosition;
        this._untrackInstance(),
          this._destroyOverlay(),
          this.element.removeUniqueId().css(this.originalCss).detach(),
          this.uiDialog.remove(),
          this.originalTitle && this.element.attr("title", this.originalTitle),
          (t = e.parent.children().eq(e.index)),
          t.length && t[0] !== this.element[0]
            ? t.before(this.element)
            : e.parent.append(this.element);
      },
      widget: function () {
        return this.uiDialog;
      },
      disable: t.noop,
      enable: t.noop,
      close: function (e) {
        var i = this;
        this._isOpen &&
          this._trigger("beforeClose", e) !== !1 &&
          ((this._isOpen = !1),
          (this._focusedElement = null),
          this._destroyOverlay(),
          this._untrackInstance(),
          this.opener.filter(":focusable").trigger("focus").length ||
            t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])),
          this._hide(this.uiDialog, this.options.hide, function () {
            i._trigger("close", e);
          }));
      },
      isOpen: function () {
        return this._isOpen;
      },
      moveToTop: function () {
        this._moveToTop();
      },
      _moveToTop: function (e, i) {
        var s = !1,
          n = this.uiDialog
            .siblings(".ui-front:visible")
            .map(function () {
              return +t(this).css("z-index");
            })
            .get(),
          o = Math.max.apply(null, n);
        return (
          o >= +this.uiDialog.css("z-index") &&
            (this.uiDialog.css("z-index", o + 1), (s = !0)),
          s && !i && this._trigger("focus", e),
          s
        );
      },
      open: function () {
        var e = this;
        return this._isOpen
          ? (this._moveToTop() && this._focusTabbable(), void 0)
          : ((this._isOpen = !0),
            (this.opener = t(t.ui.safeActiveElement(this.document[0]))),
            this._size(),
            this._position(),
            this._createOverlay(),
            this._moveToTop(null, !0),
            this.overlay &&
              this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
            this._show(this.uiDialog, this.options.show, function () {
              e._focusTabbable(), e._trigger("focus");
            }),
            this._makeFocusTarget(),
            this._trigger("open"),
            void 0);
      },
      _focusTabbable: function () {
        var t = this._focusedElement;
        t || (t = this.element.find("[autofocus]")),
          t.length || (t = this.element.find(":tabbable")),
          t.length || (t = this.uiDialogButtonPane.find(":tabbable")),
          t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")),
          t.length || (t = this.uiDialog),
          t.eq(0).trigger("focus");
      },
      _keepFocus: function (e) {
        function i() {
          var e = t.ui.safeActiveElement(this.document[0]),
            i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
          i || this._focusTabbable();
        }
        e.preventDefault(), i.call(this), this._delay(i);
      },
      _createWrapper: function () {
        (this.uiDialog = t("<div>")
          .hide()
          .attr({ tabIndex: -1, role: "dialog" })
          .appendTo(this._appendTo())),
          this._addClass(
            this.uiDialog,
            "ui-dialog",
            "ui-widget ui-widget-content ui-front"
          ),
          this._on(this.uiDialog, {
            keydown: function (e) {
              if (
                this.options.closeOnEscape &&
                !e.isDefaultPrevented() &&
                e.keyCode &&
                e.keyCode === t.ui.keyCode.ESCAPE
              )
                return e.preventDefault(), this.close(e), void 0;
              if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
                var i = this.uiDialog.find(":tabbable"),
                  s = i.filter(":first"),
                  n = i.filter(":last");
                (e.target !== n[0] && e.target !== this.uiDialog[0]) ||
                e.shiftKey
                  ? (e.target !== s[0] && e.target !== this.uiDialog[0]) ||
                    !e.shiftKey ||
                    (this._delay(function () {
                      n.trigger("focus");
                    }),
                    e.preventDefault())
                  : (this._delay(function () {
                      s.trigger("focus");
                    }),
                    e.preventDefault());
              }
            },
            mousedown: function (t) {
              this._moveToTop(t) && this._focusTabbable();
            },
          }),
          this.element.find("[aria-describedby]").length ||
            this.uiDialog.attr({
              "aria-describedby": this.element.uniqueId().attr("id"),
            });
      },
      _createTitlebar: function () {
        var e;
        (this.uiDialogTitlebar = t("<div>")),
          this._addClass(
            this.uiDialogTitlebar,
            "ui-dialog-titlebar",
            "ui-widget-header ui-helper-clearfix"
          ),
          this._on(this.uiDialogTitlebar, {
            mousedown: function (e) {
              t(e.target).closest(".ui-dialog-titlebar-close") ||
                this.uiDialog.trigger("focus");
            },
          }),
          (this.uiDialogTitlebarClose = t("<button type='button'></button>")
            .button({
              label: t("<a>").text(this.options.closeText).html(),
              icon: "ui-icon-closethick",
              showLabel: !1,
            })
            .appendTo(this.uiDialogTitlebar)),
          this._addClass(
            this.uiDialogTitlebarClose,
            "ui-dialog-titlebar-close"
          ),
          this._on(this.uiDialogTitlebarClose, {
            click: function (t) {
              t.preventDefault(), this.close(t);
            },
          }),
          (e = t("<span>").uniqueId().prependTo(this.uiDialogTitlebar)),
          this._addClass(e, "ui-dialog-title"),
          this._title(e),
          this.uiDialogTitlebar.prependTo(this.uiDialog),
          this.uiDialog.attr({ "aria-labelledby": e.attr("id") });
      },
      _title: function (t) {
        this.options.title ? t.text(this.options.title) : t.html("&#160;");
      },
      _createButtonPane: function () {
        (this.uiDialogButtonPane = t("<div>")),
          this._addClass(
            this.uiDialogButtonPane,
            "ui-dialog-buttonpane",
            "ui-widget-content ui-helper-clearfix"
          ),
          (this.uiButtonSet = t("<div>").appendTo(this.uiDialogButtonPane)),
          this._addClass(this.uiButtonSet, "ui-dialog-buttonset"),
          this._createButtons();
      },
      _createButtons: function () {
        var e = this,
          i = this.options.buttons;
        return (
          this.uiDialogButtonPane.remove(),
          this.uiButtonSet.empty(),
          t.isEmptyObject(i) || (t.isArray(i) && !i.length)
            ? (this._removeClass(this.uiDialog, "ui-dialog-buttons"), void 0)
            : (t.each(i, function (i, s) {
                var n, o;
                (s = t.isFunction(s) ? { click: s, text: i } : s),
                  (s = t.extend({ type: "button" }, s)),
                  (n = s.click),
                  (o = {
                    icon: s.icon,
                    iconPosition: s.iconPosition,
                    showLabel: s.showLabel,
                    icons: s.icons,
                    text: s.text,
                  }),
                  delete s.click,
                  delete s.icon,
                  delete s.iconPosition,
                  delete s.showLabel,
                  delete s.icons,
                  "boolean" == typeof s.text && delete s.text,
                  t("<button></button>", s)
                    .button(o)
                    .appendTo(e.uiButtonSet)
                    .on("click", function () {
                      n.apply(e.element[0], arguments);
                    });
              }),
              this._addClass(this.uiDialog, "ui-dialog-buttons"),
              this.uiDialogButtonPane.appendTo(this.uiDialog),
              void 0)
        );
      },
      _makeDraggable: function () {
        function e(t) {
          return { position: t.position, offset: t.offset };
        }
        var i = this,
          s = this.options;
        this.uiDialog.draggable({
          cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
          handle: ".ui-dialog-titlebar",
          containment: "document",
          start: function (s, n) {
            i._addClass(t(this), "ui-dialog-dragging"),
              i._blockFrames(),
              i._trigger("dragStart", s, e(n));
          },
          drag: function (t, s) {
            i._trigger("drag", t, e(s));
          },
          stop: function (n, o) {
            var a = o.offset.left - i.document.scrollLeft(),
              r = o.offset.top - i.document.scrollTop();
            (s.position = {
              my: "left top",
              at:
                "left" +
                (a >= 0 ? "+" : "") +
                a +
                " " +
                "top" +
                (r >= 0 ? "+" : "") +
                r,
              of: i.window,
            }),
              i._removeClass(t(this), "ui-dialog-dragging"),
              i._unblockFrames(),
              i._trigger("dragStop", n, e(o));
          },
        });
      },
      _makeResizable: function () {
        function e(t) {
          return {
            originalPosition: t.originalPosition,
            originalSize: t.originalSize,
            position: t.position,
            size: t.size,
          };
        }
        var i = this,
          s = this.options,
          n = s.resizable,
          o = this.uiDialog.css("position"),
          a = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
        this.uiDialog
          .resizable({
            cancel: ".ui-dialog-content",
            containment: "document",
            alsoResize: this.element,
            maxWidth: s.maxWidth,
            maxHeight: s.maxHeight,
            minWidth: s.minWidth,
            minHeight: this._minHeight(),
            handles: a,
            start: function (s, n) {
              i._addClass(t(this), "ui-dialog-resizing"),
                i._blockFrames(),
                i._trigger("resizeStart", s, e(n));
            },
            resize: function (t, s) {
              i._trigger("resize", t, e(s));
            },
            stop: function (n, o) {
              var a = i.uiDialog.offset(),
                r = a.left - i.document.scrollLeft(),
                h = a.top - i.document.scrollTop();
              (s.height = i.uiDialog.height()),
                (s.width = i.uiDialog.width()),
                (s.position = {
                  my: "left top",
                  at:
                    "left" +
                    (r >= 0 ? "+" : "") +
                    r +
                    " " +
                    "top" +
                    (h >= 0 ? "+" : "") +
                    h,
                  of: i.window,
                }),
                i._removeClass(t(this), "ui-dialog-resizing"),
                i._unblockFrames(),
                i._trigger("resizeStop", n, e(o));
            },
          })
          .css("position", o);
      },
      _trackFocus: function () {
        this._on(this.widget(), {
          focusin: function (e) {
            this._makeFocusTarget(), (this._focusedElement = t(e.target));
          },
        });
      },
      _makeFocusTarget: function () {
        this._untrackInstance(), this._trackingInstances().unshift(this);
      },
      _untrackInstance: function () {
        var e = this._trackingInstances(),
          i = t.inArray(this, e);
        -1 !== i && e.splice(i, 1);
      },
      _trackingInstances: function () {
        var t = this.document.data("ui-dialog-instances");
        return t || ((t = []), this.document.data("ui-dialog-instances", t)), t;
      },
      _minHeight: function () {
        var t = this.options;
        return "auto" === t.height
          ? t.minHeight
          : Math.min(t.minHeight, t.height);
      },
      _position: function () {
        var t = this.uiDialog.is(":visible");
        t || this.uiDialog.show(),
          this.uiDialog.position(this.options.position),
          t || this.uiDialog.hide();
      },
      _setOptions: function (e) {
        var i = this,
          s = !1,
          n = {};
        t.each(e, function (t, e) {
          i._setOption(t, e),
            t in i.sizeRelatedOptions && (s = !0),
            t in i.resizableRelatedOptions && (n[t] = e);
        }),
          s && (this._size(), this._position()),
          this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", n);
      },
      _setOption: function (e, i) {
        var s,
          n,
          o = this.uiDialog;
        "disabled" !== e &&
          (this._super(e, i),
          "appendTo" === e && this.uiDialog.appendTo(this._appendTo()),
          "buttons" === e && this._createButtons(),
          "closeText" === e &&
            this.uiDialogTitlebarClose.button({
              label: t("<a>")
                .text("" + this.options.closeText)
                .html(),
            }),
          "draggable" === e &&
            ((s = o.is(":data(ui-draggable)")),
            s && !i && o.draggable("destroy"),
            !s && i && this._makeDraggable()),
          "position" === e && this._position(),
          "resizable" === e &&
            ((n = o.is(":data(ui-resizable)")),
            n && !i && o.resizable("destroy"),
            n && "string" == typeof i && o.resizable("option", "handles", i),
            n || i === !1 || this._makeResizable()),
          "title" === e &&
            this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
      },
      _size: function () {
        var t,
          e,
          i,
          s = this.options;
        this.element
          .show()
          .css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }),
          s.minWidth > s.width && (s.width = s.minWidth),
          (t = this.uiDialog
            .css({ height: "auto", width: s.width })
            .outerHeight()),
          (e = Math.max(0, s.minHeight - t)),
          (i =
            "number" == typeof s.maxHeight
              ? Math.max(0, s.maxHeight - t)
              : "none"),
          "auto" === s.height
            ? this.element.css({ minHeight: e, maxHeight: i, height: "auto" })
            : this.element.height(Math.max(0, s.height - t)),
          this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", "minHeight", this._minHeight());
      },
      _blockFrames: function () {
        this.iframeBlocks = this.document.find("iframe").map(function () {
          var e = t(this);
          return t("<div>")
            .css({
              position: "absolute",
              width: e.outerWidth(),
              height: e.outerHeight(),
            })
            .appendTo(e.parent())
            .offset(e.offset())[0];
        });
      },
      _unblockFrames: function () {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _allowInteraction: function (e) {
        return t(e.target).closest(".ui-dialog").length
          ? !0
          : !!t(e.target).closest(".ui-datepicker").length;
      },
      _createOverlay: function () {
        if (this.options.modal) {
          var e = !0;
          this._delay(function () {
            e = !1;
          }),
            this.document.data("ui-dialog-overlays") ||
              this._on(this.document, {
                focusin: function (t) {
                  e ||
                    this._allowInteraction(t) ||
                    (t.preventDefault(),
                    this._trackingInstances()[0]._focusTabbable());
                },
              }),
            (this.overlay = t("<div>").appendTo(this._appendTo())),
            this._addClass(this.overlay, null, "ui-widget-overlay ui-front"),
            this._on(this.overlay, { mousedown: "_keepFocus" }),
            this.document.data(
              "ui-dialog-overlays",
              (this.document.data("ui-dialog-overlays") || 0) + 1
            );
        }
      },
      _destroyOverlay: function () {
        if (this.options.modal && this.overlay) {
          var t = this.document.data("ui-dialog-overlays") - 1;
          t
            ? this.document.data("ui-dialog-overlays", t)
            : (this._off(this.document, "focusin"),
              this.document.removeData("ui-dialog-overlays")),
            this.overlay.remove(),
            (this.overlay = null);
        }
      },
    }),
    t.uiBackCompat !== !1 &&
      t.widget("ui.dialog", t.ui.dialog, {
        options: { dialogClass: "" },
        _createWrapper: function () {
          this._super(), this.uiDialog.addClass(this.options.dialogClass);
        },
        _setOption: function (t, e) {
          "dialogClass" === t &&
            this.uiDialog.removeClass(this.options.dialogClass).addClass(e),
            this._superApply(arguments);
        },
      }),
    t.ui.dialog,
    t.widget("ui.droppable", {
      version: "1.12.1",
      widgetEventPrefix: "drop",
      options: {
        accept: "*",
        addClasses: !0,
        greedy: !1,
        scope: "default",
        tolerance: "intersect",
        activate: null,
        deactivate: null,
        drop: null,
        out: null,
        over: null,
      },
      _create: function () {
        var e,
          i = this.options,
          s = i.accept;
        (this.isover = !1),
          (this.isout = !0),
          (this.accept = t.isFunction(s)
            ? s
            : function (t) {
                return t.is(s);
              }),
          (this.proportions = function () {
            return arguments.length
              ? ((e = arguments[0]), void 0)
              : e
              ? e
              : (e = {
                  width: this.element[0].offsetWidth,
                  height: this.element[0].offsetHeight,
                });
          }),
          this._addToManager(i.scope),
          i.addClasses && this._addClass("ui-droppable");
      },
      _addToManager: function (e) {
        (t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || []),
          t.ui.ddmanager.droppables[e].push(this);
      },
      _splice: function (t) {
        for (var e = 0; t.length > e; e++) t[e] === this && t.splice(e, 1);
      },
      _destroy: function () {
        var e = t.ui.ddmanager.droppables[this.options.scope];
        this._splice(e);
      },
      _setOption: function (e, i) {
        if ("accept" === e)
          this.accept = t.isFunction(i)
            ? i
            : function (t) {
                return t.is(i);
              };
        else if ("scope" === e) {
          var s = t.ui.ddmanager.droppables[this.options.scope];
          this._splice(s), this._addToManager(i);
        }
        this._super(e, i);
      },
      _activate: function (e) {
        var i = t.ui.ddmanager.current;
        this._addActiveClass(), i && this._trigger("activate", e, this.ui(i));
      },
      _deactivate: function (e) {
        var i = t.ui.ddmanager.current;
        this._removeActiveClass(),
          i && this._trigger("deactivate", e, this.ui(i));
      },
      _over: function (e) {
        var i = t.ui.ddmanager.current;
        i &&
          (i.currentItem || i.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], i.currentItem || i.element) &&
          (this._addHoverClass(), this._trigger("over", e, this.ui(i)));
      },
      _out: function (e) {
        var i = t.ui.ddmanager.current;
        i &&
          (i.currentItem || i.element)[0] !== this.element[0] &&
          this.accept.call(this.element[0], i.currentItem || i.element) &&
          (this._removeHoverClass(), this._trigger("out", e, this.ui(i)));
      },
      _drop: function (e, i) {
        var s = i || t.ui.ddmanager.current,
          n = !1;
        return s && (s.currentItem || s.element)[0] !== this.element[0]
          ? (this.element
              .find(":data(ui-droppable)")
              .not(".ui-draggable-dragging")
              .each(function () {
                var i = t(this).droppable("instance");
                return i.options.greedy &&
                  !i.options.disabled &&
                  i.options.scope === s.options.scope &&
                  i.accept.call(i.element[0], s.currentItem || s.element) &&
                  v(
                    s,
                    t.extend(i, { offset: i.element.offset() }),
                    i.options.tolerance,
                    e
                  )
                  ? ((n = !0), !1)
                  : void 0;
              }),
            n
              ? !1
              : this.accept.call(this.element[0], s.currentItem || s.element)
              ? (this._removeActiveClass(),
                this._removeHoverClass(),
                this._trigger("drop", e, this.ui(s)),
                this.element)
              : !1)
          : !1;
      },
      ui: function (t) {
        return {
          draggable: t.currentItem || t.element,
          helper: t.helper,
          position: t.position,
          offset: t.positionAbs,
        };
      },
      _addHoverClass: function () {
        this._addClass("ui-droppable-hover");
      },
      _removeHoverClass: function () {
        this._removeClass("ui-droppable-hover");
      },
      _addActiveClass: function () {
        this._addClass("ui-droppable-active");
      },
      _removeActiveClass: function () {
        this._removeClass("ui-droppable-active");
      },
    });
  var v = (t.ui.intersect = (function () {
    function t(t, e, i) {
      return t >= e && e + i > t;
    }
    return function (e, i, s, n) {
      if (!i.offset) return !1;
      var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
        a = (e.positionAbs || e.position.absolute).top + e.margins.top,
        r = o + e.helperProportions.width,
        h = a + e.helperProportions.height,
        l = i.offset.left,
        c = i.offset.top,
        u = l + i.proportions().width,
        d = c + i.proportions().height;
      switch (s) {
        case "fit":
          return o >= l && u >= r && a >= c && d >= h;
        case "intersect":
          return (
            o + e.helperProportions.width / 2 > l &&
            u > r - e.helperProportions.width / 2 &&
            a + e.helperProportions.height / 2 > c &&
            d > h - e.helperProportions.height / 2
          );
        case "pointer":
          return (
            t(n.pageY, c, i.proportions().height) &&
            t(n.pageX, l, i.proportions().width)
          );
        case "touch":
          return (
            ((a >= c && d >= a) || (h >= c && d >= h) || (c > a && h > d)) &&
            ((o >= l && u >= o) || (r >= l && u >= r) || (l > o && r > u))
          );
        default:
          return !1;
      }
    };
  })());
  (t.ui.ddmanager = {
    current: null,
    droppables: { default: [] },
    prepareOffsets: function (e, i) {
      var s,
        n,
        o = t.ui.ddmanager.droppables[e.options.scope] || [],
        a = i ? i.type : null,
        r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
      t: for (s = 0; o.length > s; s++)
        if (
          !(
            o[s].options.disabled ||
            (e &&
              !o[s].accept.call(o[s].element[0], e.currentItem || e.element))
          )
        ) {
          for (n = 0; r.length > n; n++)
            if (r[n] === o[s].element[0]) {
              o[s].proportions().height = 0;
              continue t;
            }
          (o[s].visible = "none" !== o[s].element.css("display")),
            o[s].visible &&
              ("mousedown" === a && o[s]._activate.call(o[s], i),
              (o[s].offset = o[s].element.offset()),
              o[s].proportions({
                width: o[s].element[0].offsetWidth,
                height: o[s].element[0].offsetHeight,
              }));
        }
    },
    drop: function (e, i) {
      var s = !1;
      return (
        t.each(
          (t.ui.ddmanager.droppables[e.options.scope] || []).slice(),
          function () {
            this.options &&
              (!this.options.disabled &&
                this.visible &&
                v(e, this, this.options.tolerance, i) &&
                (s = this._drop.call(this, i) || s),
              !this.options.disabled &&
                this.visible &&
                this.accept.call(this.element[0], e.currentItem || e.element) &&
                ((this.isout = !0),
                (this.isover = !1),
                this._deactivate.call(this, i)));
          }
        ),
        s
      );
    },
    dragStart: function (e, i) {
      e.element.parentsUntil("body").on("scroll.droppable", function () {
        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
      });
    },
    drag: function (e, i) {
      e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i),
        t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
          if (!this.options.disabled && !this.greedyChild && this.visible) {
            var s,
              n,
              o,
              a = v(e, this, this.options.tolerance, i),
              r =
                !a && this.isover
                  ? "isout"
                  : a && !this.isover
                  ? "isover"
                  : null;
            r &&
              (this.options.greedy &&
                ((n = this.options.scope),
                (o = this.element
                  .parents(":data(ui-droppable)")
                  .filter(function () {
                    return t(this).droppable("instance").options.scope === n;
                  })),
                o.length &&
                  ((s = t(o[0]).droppable("instance")),
                  (s.greedyChild = "isover" === r))),
              s &&
                "isover" === r &&
                ((s.isover = !1), (s.isout = !0), s._out.call(s, i)),
              (this[r] = !0),
              (this["isout" === r ? "isover" : "isout"] = !1),
              this["isover" === r ? "_over" : "_out"].call(this, i),
              s &&
                "isout" === r &&
                ((s.isout = !1), (s.isover = !0), s._over.call(s, i)));
          }
        });
    },
    dragStop: function (e, i) {
      e.element.parentsUntil("body").off("scroll.droppable"),
        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
    },
  }),
    t.uiBackCompat !== !1 &&
      t.widget("ui.droppable", t.ui.droppable, {
        options: { hoverClass: !1, activeClass: !1 },
        _addActiveClass: function () {
          this._super(),
            this.options.activeClass &&
              this.element.addClass(this.options.activeClass);
        },
        _removeActiveClass: function () {
          this._super(),
            this.options.activeClass &&
              this.element.removeClass(this.options.activeClass);
        },
        _addHoverClass: function () {
          this._super(),
            this.options.hoverClass &&
              this.element.addClass(this.options.hoverClass);
        },
        _removeHoverClass: function () {
          this._super(),
            this.options.hoverClass &&
              this.element.removeClass(this.options.hoverClass);
        },
      }),
    t.ui.droppable,
    t.widget("ui.progressbar", {
      version: "1.12.1",
      options: {
        classes: {
          "ui-progressbar": "ui-corner-all",
          "ui-progressbar-value": "ui-corner-left",
          "ui-progressbar-complete": "ui-corner-right",
        },
        max: 100,
        value: 0,
        change: null,
        complete: null,
      },
      min: 0,
      _create: function () {
        (this.oldValue = this.options.value = this._constrainedValue()),
          this.element.attr({ role: "progressbar", "aria-valuemin": this.min }),
          this._addClass("ui-progressbar", "ui-widget ui-widget-content"),
          (this.valueDiv = t("<div>").appendTo(this.element)),
          this._addClass(
            this.valueDiv,
            "ui-progressbar-value",
            "ui-widget-header"
          ),
          this._refreshValue();
      },
      _destroy: function () {
        this.element.removeAttr(
          "role aria-valuemin aria-valuemax aria-valuenow"
        ),
          this.valueDiv.remove();
      },
      value: function (t) {
        return void 0 === t
          ? this.options.value
          : ((this.options.value = this._constrainedValue(t)),
            this._refreshValue(),
            void 0);
      },
      _constrainedValue: function (t) {
        return (
          void 0 === t && (t = this.options.value),
          (this.indeterminate = t === !1),
          "number" != typeof t && (t = 0),
          this.indeterminate
            ? !1
            : Math.min(this.options.max, Math.max(this.min, t))
        );
      },
      _setOptions: function (t) {
        var e = t.value;
        delete t.value,
          this._super(t),
          (this.options.value = this._constrainedValue(e)),
          this._refreshValue();
      },
      _setOption: function (t, e) {
        "max" === t && (e = Math.max(this.min, e)), this._super(t, e);
      },
      _setOptionDisabled: function (t) {
        this._super(t),
          this.element.attr("aria-disabled", t),
          this._toggleClass(null, "ui-state-disabled", !!t);
      },
      _percentage: function () {
        return this.indeterminate
          ? 100
          : (100 * (this.options.value - this.min)) /
              (this.options.max - this.min);
      },
      _refreshValue: function () {
        var e = this.options.value,
          i = this._percentage();
        this.valueDiv
          .toggle(this.indeterminate || e > this.min)
          .width(i.toFixed(0) + "%"),
          this._toggleClass(
            this.valueDiv,
            "ui-progressbar-complete",
            null,
            e === this.options.max
          )._toggleClass(
            "ui-progressbar-indeterminate",
            null,
            this.indeterminate
          ),
          this.indeterminate
            ? (this.element.removeAttr("aria-valuenow"),
              this.overlayDiv ||
                ((this.overlayDiv = t("<div>").appendTo(this.valueDiv)),
                this._addClass(this.overlayDiv, "ui-progressbar-overlay")))
            : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": e,
              }),
              this.overlayDiv &&
                (this.overlayDiv.remove(), (this.overlayDiv = null))),
          this.oldValue !== e && ((this.oldValue = e), this._trigger("change")),
          e === this.options.max && this._trigger("complete");
      },
    }),
    t.widget("ui.selectable", t.ui.mouse, {
      version: "1.12.1",
      options: {
        appendTo: "body",
        autoRefresh: !0,
        distance: 0,
        filter: "*",
        tolerance: "touch",
        selected: null,
        selecting: null,
        start: null,
        stop: null,
        unselected: null,
        unselecting: null,
      },
      _create: function () {
        var e = this;
        this._addClass("ui-selectable"),
          (this.dragged = !1),
          (this.refresh = function () {
            (e.elementPos = t(e.element[0]).offset()),
              (e.selectees = t(e.options.filter, e.element[0])),
              e._addClass(e.selectees, "ui-selectee"),
              e.selectees.each(function () {
                var i = t(this),
                  s = i.offset(),
                  n = {
                    left: s.left - e.elementPos.left,
                    top: s.top - e.elementPos.top,
                  };
                t.data(this, "selectable-item", {
                  element: this,
                  $element: i,
                  left: n.left,
                  top: n.top,
                  right: n.left + i.outerWidth(),
                  bottom: n.top + i.outerHeight(),
                  startselected: !1,
                  selected: i.hasClass("ui-selected"),
                  selecting: i.hasClass("ui-selecting"),
                  unselecting: i.hasClass("ui-unselecting"),
                });
              });
          }),
          this.refresh(),
          this._mouseInit(),
          (this.helper = t("<div>")),
          this._addClass(this.helper, "ui-selectable-helper");
      },
      _destroy: function () {
        this.selectees.removeData("selectable-item"), this._mouseDestroy();
      },
      _mouseStart: function (e) {
        var i = this,
          s = this.options;
        (this.opos = [e.pageX, e.pageY]),
          (this.elementPos = t(this.element[0]).offset()),
          this.options.disabled ||
            ((this.selectees = t(s.filter, this.element[0])),
            this._trigger("start", e),
            t(s.appendTo).append(this.helper),
            this.helper.css({
              left: e.pageX,
              top: e.pageY,
              width: 0,
              height: 0,
            }),
            s.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function () {
              var s = t.data(this, "selectable-item");
              (s.startselected = !0),
                e.metaKey ||
                  e.ctrlKey ||
                  (i._removeClass(s.$element, "ui-selected"),
                  (s.selected = !1),
                  i._addClass(s.$element, "ui-unselecting"),
                  (s.unselecting = !0),
                  i._trigger("unselecting", e, { unselecting: s.element }));
            }),
            t(e.target)
              .parents()
              .addBack()
              .each(function () {
                var s,
                  n = t.data(this, "selectable-item");
                return n
                  ? ((s =
                      (!e.metaKey && !e.ctrlKey) ||
                      !n.$element.hasClass("ui-selected")),
                    i
                      ._removeClass(
                        n.$element,
                        s ? "ui-unselecting" : "ui-selected"
                      )
                      ._addClass(
                        n.$element,
                        s ? "ui-selecting" : "ui-unselecting"
                      ),
                    (n.unselecting = !s),
                    (n.selecting = s),
                    (n.selected = s),
                    s
                      ? i._trigger("selecting", e, { selecting: n.element })
                      : i._trigger("unselecting", e, {
                          unselecting: n.element,
                        }),
                    !1)
                  : void 0;
              }));
      },
      _mouseDrag: function (e) {
        if (((this.dragged = !0), !this.options.disabled)) {
          var i,
            s = this,
            n = this.options,
            o = this.opos[0],
            a = this.opos[1],
            r = e.pageX,
            h = e.pageY;
          return (
            o > r && ((i = r), (r = o), (o = i)),
            a > h && ((i = h), (h = a), (a = i)),
            this.helper.css({ left: o, top: a, width: r - o, height: h - a }),
            this.selectees.each(function () {
              var i = t.data(this, "selectable-item"),
                l = !1,
                c = {};
              i &&
                i.element !== s.element[0] &&
                ((c.left = i.left + s.elementPos.left),
                (c.right = i.right + s.elementPos.left),
                (c.top = i.top + s.elementPos.top),
                (c.bottom = i.bottom + s.elementPos.top),
                "touch" === n.tolerance
                  ? (l = !(
                      c.left > r ||
                      o > c.right ||
                      c.top > h ||
                      a > c.bottom
                    ))
                  : "fit" === n.tolerance &&
                    (l =
                      c.left > o && r > c.right && c.top > a && h > c.bottom),
                l
                  ? (i.selected &&
                      (s._removeClass(i.$element, "ui-selected"),
                      (i.selected = !1)),
                    i.unselecting &&
                      (s._removeClass(i.$element, "ui-unselecting"),
                      (i.unselecting = !1)),
                    i.selecting ||
                      (s._addClass(i.$element, "ui-selecting"),
                      (i.selecting = !0),
                      s._trigger("selecting", e, { selecting: i.element })))
                  : (i.selecting &&
                      ((e.metaKey || e.ctrlKey) && i.startselected
                        ? (s._removeClass(i.$element, "ui-selecting"),
                          (i.selecting = !1),
                          s._addClass(i.$element, "ui-selected"),
                          (i.selected = !0))
                        : (s._removeClass(i.$element, "ui-selecting"),
                          (i.selecting = !1),
                          i.startselected &&
                            (s._addClass(i.$element, "ui-unselecting"),
                            (i.unselecting = !0)),
                          s._trigger("unselecting", e, {
                            unselecting: i.element,
                          }))),
                    i.selected &&
                      (e.metaKey ||
                        e.ctrlKey ||
                        i.startselected ||
                        (s._removeClass(i.$element, "ui-selected"),
                        (i.selected = !1),
                        s._addClass(i.$element, "ui-unselecting"),
                        (i.unselecting = !0),
                        s._trigger("unselecting", e, {
                          unselecting: i.element,
                        })))));
            }),
            !1
          );
        }
      },
      _mouseStop: function (e) {
        var i = this;
        return (
          (this.dragged = !1),
          t(".ui-unselecting", this.element[0]).each(function () {
            var s = t.data(this, "selectable-item");
            i._removeClass(s.$element, "ui-unselecting"),
              (s.unselecting = !1),
              (s.startselected = !1),
              i._trigger("unselected", e, { unselected: s.element });
          }),
          t(".ui-selecting", this.element[0]).each(function () {
            var s = t.data(this, "selectable-item");
            i
              ._removeClass(s.$element, "ui-selecting")
              ._addClass(s.$element, "ui-selected"),
              (s.selecting = !1),
              (s.selected = !0),
              (s.startselected = !0),
              i._trigger("selected", e, { selected: s.element });
          }),
          this._trigger("stop", e),
          this.helper.remove(),
          !1
        );
      },
    }),
    t.widget("ui.selectmenu", [
      t.ui.formResetMixin,
      {
        version: "1.12.1",
        defaultElement: "<select>",
        options: {
          appendTo: null,
          classes: {
            "ui-selectmenu-button-open": "ui-corner-top",
            "ui-selectmenu-button-closed": "ui-corner-all",
          },
          disabled: null,
          icons: { button: "ui-icon-triangle-1-s" },
          position: { my: "left top", at: "left bottom", collision: "none" },
          width: !1,
          change: null,
          close: null,
          focus: null,
          open: null,
          select: null,
        },
        _create: function () {
          var e = this.element.uniqueId().attr("id");
          (this.ids = { element: e, button: e + "-button", menu: e + "-menu" }),
            this._drawButton(),
            this._drawMenu(),
            this._bindFormResetHandler(),
            (this._rendered = !1),
            (this.menuItems = t());
        },
        _drawButton: function () {
          var e,
            i = this,
            s = this._parseOption(
              this.element.find("option:selected"),
              this.element[0].selectedIndex
            );
          (this.labels = this.element.labels().attr("for", this.ids.button)),
            this._on(this.labels, {
              click: function (t) {
                this.button.focus(), t.preventDefault();
              },
            }),
            this.element.hide(),
            (this.button = t("<span>", {
              tabindex: this.options.disabled ? -1 : 0,
              id: this.ids.button,
              role: "combobox",
              "aria-expanded": "false",
              "aria-autocomplete": "list",
              "aria-owns": this.ids.menu,
              "aria-haspopup": "true",
              title: this.element.attr("title"),
            }).insertAfter(this.element)),
            this._addClass(
              this.button,
              "ui-selectmenu-button ui-selectmenu-button-closed",
              "ui-button ui-widget"
            ),
            (e = t("<span>").appendTo(this.button)),
            this._addClass(
              e,
              "ui-selectmenu-icon",
              "ui-icon " + this.options.icons.button
            ),
            (this.buttonItem = this._renderButtonItem(s).appendTo(this.button)),
            this.options.width !== !1 && this._resizeButton(),
            this._on(this.button, this._buttonEvents),
            this.button.one("focusin", function () {
              i._rendered || i._refreshMenu();
            });
        },
        _drawMenu: function () {
          var e = this;
          (this.menu = t("<ul>", {
            "aria-hidden": "true",
            "aria-labelledby": this.ids.button,
            id: this.ids.menu,
          })),
            (this.menuWrap = t("<div>").append(this.menu)),
            this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"),
            this.menuWrap.appendTo(this._appendTo()),
            (this.menuInstance = this.menu
              .menu({
                classes: { "ui-menu": "ui-corner-bottom" },
                role: "listbox",
                select: function (t, i) {
                  t.preventDefault(),
                    e._setSelection(),
                    e._select(i.item.data("ui-selectmenu-item"), t);
                },
                focus: function (t, i) {
                  var s = i.item.data("ui-selectmenu-item");
                  null != e.focusIndex &&
                    s.index !== e.focusIndex &&
                    (e._trigger("focus", t, { item: s }),
                    e.isOpen || e._select(s, t)),
                    (e.focusIndex = s.index),
                    e.button.attr(
                      "aria-activedescendant",
                      e.menuItems.eq(s.index).attr("id")
                    );
                },
              })
              .menu("instance")),
            this.menuInstance._off(this.menu, "mouseleave"),
            (this.menuInstance._closeOnDocumentClick = function () {
              return !1;
            }),
            (this.menuInstance._isDivider = function () {
              return !1;
            });
        },
        refresh: function () {
          this._refreshMenu(),
            this.buttonItem.replaceWith(
              (this.buttonItem = this._renderButtonItem(
                this._getSelectedItem().data("ui-selectmenu-item") || {}
              ))
            ),
            null === this.options.width && this._resizeButton();
        },
        _refreshMenu: function () {
          var t,
            e = this.element.find("option");
          this.menu.empty(),
            this._parseOptions(e),
            this._renderMenu(this.menu, this.items),
            this.menuInstance.refresh(),
            (this.menuItems = this.menu
              .find("li")
              .not(".ui-selectmenu-optgroup")
              .find(".ui-menu-item-wrapper")),
            (this._rendered = !0),
            e.length &&
              ((t = this._getSelectedItem()),
              this.menuInstance.focus(null, t),
              this._setAria(t.data("ui-selectmenu-item")),
              this._setOption("disabled", this.element.prop("disabled")));
        },
        open: function (t) {
          this.options.disabled ||
            (this._rendered
              ? (this._removeClass(
                  this.menu.find(".ui-state-active"),
                  null,
                  "ui-state-active"
                ),
                this.menuInstance.focus(null, this._getSelectedItem()))
              : this._refreshMenu(),
            this.menuItems.length &&
              ((this.isOpen = !0),
              this._toggleAttr(),
              this._resizeMenu(),
              this._position(),
              this._on(this.document, this._documentClick),
              this._trigger("open", t)));
        },
        _position: function () {
          this.menuWrap.position(
            t.extend({ of: this.button }, this.options.position)
          );
        },
        close: function (t) {
          this.isOpen &&
            ((this.isOpen = !1),
            this._toggleAttr(),
            (this.range = null),
            this._off(this.document),
            this._trigger("close", t));
        },
        widget: function () {
          return this.button;
        },
        menuWidget: function () {
          return this.menu;
        },
        _renderButtonItem: function (e) {
          var i = t("<span>");
          return (
            this._setText(i, e.label),
            this._addClass(i, "ui-selectmenu-text"),
            i
          );
        },
        _renderMenu: function (e, i) {
          var s = this,
            n = "";
          t.each(i, function (i, o) {
            var a;
            o.optgroup !== n &&
              ((a = t("<li>", { text: o.optgroup })),
              s._addClass(
                a,
                "ui-selectmenu-optgroup",
                "ui-menu-divider" +
                  (o.element.parent("optgroup").prop("disabled")
                    ? " ui-state-disabled"
                    : "")
              ),
              a.appendTo(e),
              (n = o.optgroup)),
              s._renderItemData(e, o);
          });
        },
        _renderItemData: function (t, e) {
          return this._renderItem(t, e).data("ui-selectmenu-item", e);
        },
        _renderItem: function (e, i) {
          var s = t("<li>"),
            n = t("<div>", { title: i.element.attr("title") });
          return (
            i.disabled && this._addClass(s, null, "ui-state-disabled"),
            this._setText(n, i.label),
            s.append(n).appendTo(e)
          );
        },
        _setText: function (t, e) {
          e ? t.text(e) : t.html("&#160;");
        },
        _move: function (t, e) {
          var i,
            s,
            n = ".ui-menu-item";
          this.isOpen
            ? (i = this.menuItems.eq(this.focusIndex).parent("li"))
            : ((i = this.menuItems
                .eq(this.element[0].selectedIndex)
                .parent("li")),
              (n += ":not(.ui-state-disabled)")),
            (s =
              "first" === t || "last" === t
                ? i["first" === t ? "prevAll" : "nextAll"](n).eq(-1)
                : i[t + "All"](n).eq(0)),
            s.length && this.menuInstance.focus(e, s);
        },
        _getSelectedItem: function () {
          return this.menuItems.eq(this.element[0].selectedIndex).parent("li");
        },
        _toggle: function (t) {
          this[this.isOpen ? "close" : "open"](t);
        },
        _setSelection: function () {
          var t;
          this.range &&
            (window.getSelection
              ? ((t = window.getSelection()),
                t.removeAllRanges(),
                t.addRange(this.range))
              : this.range.select(),
            this.button.focus());
        },
        _documentClick: {
          mousedown: function (e) {
            this.isOpen &&
              (t(e.target).closest(
                ".ui-selectmenu-menu, #" + t.ui.escapeSelector(this.ids.button)
              ).length ||
                this.close(e));
          },
        },
        _buttonEvents: {
          mousedown: function () {
            var t;
            window.getSelection
              ? ((t = window.getSelection()),
                t.rangeCount && (this.range = t.getRangeAt(0)))
              : (this.range = document.selection.createRange());
          },
          click: function (t) {
            this._setSelection(), this._toggle(t);
          },
          keydown: function (e) {
            var i = !0;
            switch (e.keyCode) {
              case t.ui.keyCode.TAB:
              case t.ui.keyCode.ESCAPE:
                this.close(e), (i = !1);
                break;
              case t.ui.keyCode.ENTER:
                this.isOpen && this._selectFocusedItem(e);
                break;
              case t.ui.keyCode.UP:
                e.altKey ? this._toggle(e) : this._move("prev", e);
                break;
              case t.ui.keyCode.DOWN:
                e.altKey ? this._toggle(e) : this._move("next", e);
                break;
              case t.ui.keyCode.SPACE:
                this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
                break;
              case t.ui.keyCode.LEFT:
                this._move("prev", e);
                break;
              case t.ui.keyCode.RIGHT:
                this._move("next", e);
                break;
              case t.ui.keyCode.HOME:
              case t.ui.keyCode.PAGE_UP:
                this._move("first", e);
                break;
              case t.ui.keyCode.END:
              case t.ui.keyCode.PAGE_DOWN:
                this._move("last", e);
                break;
              default:
                this.menu.trigger(e), (i = !1);
            }
            i && e.preventDefault();
          },
        },
        _selectFocusedItem: function (t) {
          var e = this.menuItems.eq(this.focusIndex).parent("li");
          e.hasClass("ui-state-disabled") ||
            this._select(e.data("ui-selectmenu-item"), t);
        },
        _select: function (t, e) {
          var i = this.element[0].selectedIndex;
          (this.element[0].selectedIndex = t.index),
            this.buttonItem.replaceWith(
              (this.buttonItem = this._renderButtonItem(t))
            ),
            this._setAria(t),
            this._trigger("select", e, { item: t }),
            t.index !== i && this._trigger("change", e, { item: t }),
            this.close(e);
        },
        _setAria: function (t) {
          var e = this.menuItems.eq(t.index).attr("id");
          this.button.attr({
            "aria-labelledby": e,
            "aria-activedescendant": e,
          }),
            this.menu.attr("aria-activedescendant", e);
        },
        _setOption: function (t, e) {
          if ("icons" === t) {
            var i = this.button.find("span.ui-icon");
            this._removeClass(i, null, this.options.icons.button)._addClass(
              i,
              null,
              e.button
            );
          }
          this._super(t, e),
            "appendTo" === t && this.menuWrap.appendTo(this._appendTo()),
            "width" === t && this._resizeButton();
        },
        _setOptionDisabled: function (t) {
          this._super(t),
            this.menuInstance.option("disabled", t),
            this.button.attr("aria-disabled", t),
            this._toggleClass(this.button, null, "ui-state-disabled", t),
            this.element.prop("disabled", t),
            t
              ? (this.button.attr("tabindex", -1), this.close())
              : this.button.attr("tabindex", 0);
        },
        _appendTo: function () {
          var e = this.options.appendTo;
          return (
            e &&
              (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)),
            (e && e[0]) || (e = this.element.closest(".ui-front, dialog")),
            e.length || (e = this.document[0].body),
            e
          );
        },
        _toggleAttr: function () {
          this.button.attr("aria-expanded", this.isOpen),
            this._removeClass(
              this.button,
              "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open")
            )
              ._addClass(
                this.button,
                "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed")
              )
              ._toggleClass(
                this.menuWrap,
                "ui-selectmenu-open",
                null,
                this.isOpen
              ),
            this.menu.attr("aria-hidden", !this.isOpen);
        },
        _resizeButton: function () {
          var t = this.options.width;
          return t === !1
            ? (this.button.css("width", ""), void 0)
            : (null === t &&
                ((t = this.element.show().outerWidth()), this.element.hide()),
              this.button.outerWidth(t),
              void 0);
        },
        _resizeMenu: function () {
          this.menu.outerWidth(
            Math.max(
              this.button.outerWidth(),
              this.menu.width("").outerWidth() + 1
            )
          );
        },
        _getCreateOptions: function () {
          var t = this._super();
          return (t.disabled = this.element.prop("disabled")), t;
        },
        _parseOptions: function (e) {
          var i = this,
            s = [];
          e.each(function (e, n) {
            s.push(i._parseOption(t(n), e));
          }),
            (this.items = s);
        },
        _parseOption: function (t, e) {
          var i = t.parent("optgroup");
          return {
            element: t,
            index: e,
            value: t.val(),
            label: t.text(),
            optgroup: i.attr("label") || "",
            disabled: i.prop("disabled") || t.prop("disabled"),
          };
        },
        _destroy: function () {
          this._unbindFormResetHandler(),
            this.menuWrap.remove(),
            this.button.remove(),
            this.element.show(),
            this.element.removeUniqueId(),
            this.labels.attr("for", this.ids.element);
        },
      },
    ]),
    t.widget("ui.slider", t.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        classes: {
          "ui-slider": "ui-corner-all",
          "ui-slider-handle": "ui-corner-all",
          "ui-slider-range": "ui-corner-all ui-widget-header",
        },
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
        change: null,
        slide: null,
        start: null,
        stop: null,
      },
      numPages: 5,
      _create: function () {
        (this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this._calculateNewMax(),
          this._addClass(
            "ui-slider ui-slider-" + this.orientation,
            "ui-widget ui-widget-content"
          ),
          this._refresh(),
          (this._animateOff = !1);
      },
      _refresh: function () {
        this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue();
      },
      _createHandles: function () {
        var e,
          i,
          s = this.options,
          n = this.element.find(".ui-slider-handle"),
          o = "<span tabindex='0'></span>",
          a = [];
        for (
          i = (s.values && s.values.length) || 1,
            n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
            e = n.length;
          i > e;
          e++
        )
          a.push(o);
        (this.handles = n.add(t(a.join("")).appendTo(this.element))),
          this._addClass(this.handles, "ui-slider-handle", "ui-state-default"),
          (this.handle = this.handles.eq(0)),
          this.handles.each(function (e) {
            t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
          });
      },
      _createRange: function () {
        var e = this.options;
        e.range
          ? (e.range === !0 &&
              (e.values
                ? e.values.length && 2 !== e.values.length
                  ? (e.values = [e.values[0], e.values[0]])
                  : t.isArray(e.values) && (e.values = e.values.slice(0))
                : (e.values = [this._valueMin(), this._valueMin()])),
            this.range && this.range.length
              ? (this._removeClass(
                  this.range,
                  "ui-slider-range-min ui-slider-range-max"
                ),
                this.range.css({ left: "", bottom: "" }))
              : ((this.range = t("<div>").appendTo(this.element)),
                this._addClass(this.range, "ui-slider-range")),
            ("min" === e.range || "max" === e.range) &&
              this._addClass(this.range, "ui-slider-range-" + e.range))
          : (this.range && this.range.remove(), (this.range = null));
      },
      _setupEvents: function () {
        this._off(this.handles),
          this._on(this.handles, this._handleEvents),
          this._hoverable(this.handles),
          this._focusable(this.handles);
      },
      _destroy: function () {
        this.handles.remove(),
          this.range && this.range.remove(),
          this._mouseDestroy();
      },
      _mouseCapture: function (e) {
        var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c = this,
          u = this.options;
        return u.disabled
          ? !1
          : ((this.elementSize = {
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
            }),
            (this.elementOffset = this.element.offset()),
            (i = { x: e.pageX, y: e.pageY }),
            (s = this._normValueFromMouse(i)),
            (n = this._valueMax() - this._valueMin() + 1),
            this.handles.each(function (e) {
              var i = Math.abs(s - c.values(e));
              (n > i ||
                (n === i &&
                  (e === c._lastChangedValue || c.values(e) === u.min))) &&
                ((n = i), (o = t(this)), (a = e));
            }),
            (r = this._start(e, a)),
            r === !1
              ? !1
              : ((this._mouseSliding = !0),
                (this._handleIndex = a),
                this._addClass(o, null, "ui-state-active"),
                o.trigger("focus"),
                (h = o.offset()),
                (l = !t(e.target).parents().addBack().is(".ui-slider-handle")),
                (this._clickOffset = l
                  ? { left: 0, top: 0 }
                  : {
                      left: e.pageX - h.left - o.width() / 2,
                      top:
                        e.pageY -
                        h.top -
                        o.height() / 2 -
                        (parseInt(o.css("borderTopWidth"), 10) || 0) -
                        (parseInt(o.css("borderBottomWidth"), 10) || 0) +
                        (parseInt(o.css("marginTop"), 10) || 0),
                    }),
                this.handles.hasClass("ui-state-hover") || this._slide(e, a, s),
                (this._animateOff = !0),
                !0));
      },
      _mouseStart: function () {
        return !0;
      },
      _mouseDrag: function (t) {
        var e = { x: t.pageX, y: t.pageY },
          i = this._normValueFromMouse(e);
        return this._slide(t, this._handleIndex, i), !1;
      },
      _mouseStop: function (t) {
        return (
          this._removeClass(this.handles, null, "ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(t, this._handleIndex),
          this._change(t, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1),
          !1
        );
      },
      _detectOrientation: function () {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function (t) {
        var e, i, s, n, o;
        return (
          "horizontal" === this.orientation
            ? ((e = this.elementSize.width),
              (i =
                t.x -
                this.elementOffset.left -
                (this._clickOffset ? this._clickOffset.left : 0)))
            : ((e = this.elementSize.height),
              (i =
                t.y -
                this.elementOffset.top -
                (this._clickOffset ? this._clickOffset.top : 0))),
          (s = i / e),
          s > 1 && (s = 1),
          0 > s && (s = 0),
          "vertical" === this.orientation && (s = 1 - s),
          (n = this._valueMax() - this._valueMin()),
          (o = this._valueMin() + s * n),
          this._trimAlignValue(o)
        );
      },
      _uiHash: function (t, e, i) {
        var s = {
          handle: this.handles[t],
          handleIndex: t,
          value: void 0 !== e ? e : this.value(),
        };
        return (
          this._hasMultipleValues() &&
            ((s.value = void 0 !== e ? e : this.values(t)),
            (s.values = i || this.values())),
          s
        );
      },
      _hasMultipleValues: function () {
        return this.options.values && this.options.values.length;
      },
      _start: function (t, e) {
        return this._trigger("start", t, this._uiHash(e));
      },
      _slide: function (t, e, i) {
        var s,
          n,
          o = this.value(),
          a = this.values();
        this._hasMultipleValues() &&
          ((n = this.values(e ? 0 : 1)),
          (o = this.values(e)),
          2 === this.options.values.length &&
            this.options.range === !0 &&
            (i = 0 === e ? Math.min(n, i) : Math.max(n, i)),
          (a[e] = i)),
          i !== o &&
            ((s = this._trigger("slide", t, this._uiHash(e, i, a))),
            s !== !1 &&
              (this._hasMultipleValues() ? this.values(e, i) : this.value(i)));
      },
      _stop: function (t, e) {
        this._trigger("stop", t, this._uiHash(e));
      },
      _change: function (t, e) {
        this._keySliding ||
          this._mouseSliding ||
          ((this._lastChangedValue = e),
          this._trigger("change", t, this._uiHash(e)));
      },
      value: function (t) {
        return arguments.length
          ? ((this.options.value = this._trimAlignValue(t)),
            this._refreshValue(),
            this._change(null, 0),
            void 0)
          : this._value();
      },
      values: function (e, i) {
        var s, n, o;
        if (arguments.length > 1)
          return (
            (this.options.values[e] = this._trimAlignValue(i)),
            this._refreshValue(),
            this._change(null, e),
            void 0
          );
        if (!arguments.length) return this._values();
        if (!t.isArray(arguments[0]))
          return this._hasMultipleValues() ? this._values(e) : this.value();
        for (
          s = this.options.values, n = arguments[0], o = 0;
          s.length > o;
          o += 1
        )
          (s[o] = this._trimAlignValue(n[o])), this._change(null, o);
        this._refreshValue();
      },
      _setOption: function (e, i) {
        var s,
          n = 0;
        switch (
          ("range" === e &&
            this.options.range === !0 &&
            ("min" === i
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" === i &&
                ((this.options.value = this._values(
                  this.options.values.length - 1
                )),
                (this.options.values = null))),
          t.isArray(this.options.values) && (n = this.options.values.length),
          this._super(e, i),
          e)
        ) {
          case "orientation":
            this._detectOrientation(),
              this._removeClass(
                "ui-slider-horizontal ui-slider-vertical"
              )._addClass("ui-slider-" + this.orientation),
              this._refreshValue(),
              this.options.range && this._refreshRange(i),
              this.handles.css("horizontal" === i ? "bottom" : "left", "");
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), s = n - 1;
              s >= 0;
              s--
            )
              this._change(null, s);
            this._animateOff = !1;
            break;
          case "step":
          case "min":
          case "max":
            (this._animateOff = !0),
              this._calculateNewMax(),
              this._refreshValue(),
              (this._animateOff = !1);
            break;
          case "range":
            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
        }
      },
      _setOptionDisabled: function (t) {
        this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
      },
      _value: function () {
        var t = this.options.value;
        return (t = this._trimAlignValue(t));
      },
      _values: function (t) {
        var e, i, s;
        if (arguments.length)
          return (e = this.options.values[t]), (e = this._trimAlignValue(e));
        if (this._hasMultipleValues()) {
          for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)
            i[s] = this._trimAlignValue(i[s]);
          return i;
        }
        return [];
      },
      _trimAlignValue: function (t) {
        if (this._valueMin() >= t) return this._valueMin();
        if (t >= this._valueMax()) return this._valueMax();
        var e = this.options.step > 0 ? this.options.step : 1,
          i = (t - this._valueMin()) % e,
          s = t - i;
        return (
          2 * Math.abs(i) >= e && (s += i > 0 ? e : -e),
          parseFloat(s.toFixed(5))
        );
      },
      _calculateNewMax: function () {
        var t = this.options.max,
          e = this._valueMin(),
          i = this.options.step,
          s = Math.round((t - e) / i) * i;
        (t = s + e),
          t > this.options.max && (t -= i),
          (this.max = parseFloat(t.toFixed(this._precision())));
      },
      _precision: function () {
        var t = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (t = Math.max(t, this._precisionOf(this.options.min))),
          t
        );
      },
      _precisionOf: function (t) {
        var e = "" + t,
          i = e.indexOf(".");
        return -1 === i ? 0 : e.length - i - 1;
      },
      _valueMin: function () {
        return this.options.min;
      },
      _valueMax: function () {
        return this.max;
      },
      _refreshRange: function (t) {
        "vertical" === t && this.range.css({ width: "", left: "" }),
          "horizontal" === t && this.range.css({ height: "", bottom: "" });
      },
      _refreshValue: function () {
        var e,
          i,
          s,
          n,
          o,
          a = this.options.range,
          r = this.options,
          h = this,
          l = this._animateOff ? !1 : r.animate,
          c = {};
        this._hasMultipleValues()
          ? this.handles.each(function (s) {
              (i =
                100 *
                ((h.values(s) - h._valueMin()) /
                  (h._valueMax() - h._valueMin()))),
                (c["horizontal" === h.orientation ? "left" : "bottom"] =
                  i + "%"),
                t(this).stop(1, 1)[l ? "animate" : "css"](c, r.animate),
                h.options.range === !0 &&
                  ("horizontal" === h.orientation
                    ? (0 === s &&
                        h.range
                          .stop(1, 1)
                          [l ? "animate" : "css"]({ left: i + "%" }, r.animate),
                      1 === s &&
                        h.range[l ? "animate" : "css"](
                          { width: i - e + "%" },
                          { queue: !1, duration: r.animate }
                        ))
                    : (0 === s &&
                        h.range
                          .stop(1, 1)
                          [l ? "animate" : "css"](
                            { bottom: i + "%" },
                            r.animate
                          ),
                      1 === s &&
                        h.range[l ? "animate" : "css"](
                          { height: i - e + "%" },
                          { queue: !1, duration: r.animate }
                        ))),
                (e = i);
            })
          : ((s = this.value()),
            (n = this._valueMin()),
            (o = this._valueMax()),
            (i = o !== n ? 100 * ((s - n) / (o - n)) : 0),
            (c["horizontal" === this.orientation ? "left" : "bottom"] =
              i + "%"),
            this.handle.stop(1, 1)[l ? "animate" : "css"](c, r.animate),
            "min" === a &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [l ? "animate" : "css"]({ width: i + "%" }, r.animate),
            "max" === a &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [l ? "animate" : "css"]({ width: 100 - i + "%" }, r.animate),
            "min" === a &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [l ? "animate" : "css"]({ height: i + "%" }, r.animate),
            "max" === a &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [l ? "animate" : "css"]({ height: 100 - i + "%" }, r.animate));
      },
      _handleEvents: {
        keydown: function (e) {
          var i,
            s,
            n,
            o,
            a = t(e.target).data("ui-slider-handle-index");
          switch (e.keyCode) {
            case t.ui.keyCode.HOME:
            case t.ui.keyCode.END:
            case t.ui.keyCode.PAGE_UP:
            case t.ui.keyCode.PAGE_DOWN:
            case t.ui.keyCode.UP:
            case t.ui.keyCode.RIGHT:
            case t.ui.keyCode.DOWN:
            case t.ui.keyCode.LEFT:
              if (
                (e.preventDefault(),
                !this._keySliding &&
                  ((this._keySliding = !0),
                  this._addClass(t(e.target), null, "ui-state-active"),
                  (i = this._start(e, a)),
                  i === !1))
              )
                return;
          }
          switch (
            ((o = this.options.step),
            (s = n = this._hasMultipleValues() ? this.values(a) : this.value()),
            e.keyCode)
          ) {
            case t.ui.keyCode.HOME:
              n = this._valueMin();
              break;
            case t.ui.keyCode.END:
              n = this._valueMax();
              break;
            case t.ui.keyCode.PAGE_UP:
              n = this._trimAlignValue(
                s + (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case t.ui.keyCode.PAGE_DOWN:
              n = this._trimAlignValue(
                s - (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case t.ui.keyCode.UP:
            case t.ui.keyCode.RIGHT:
              if (s === this._valueMax()) return;
              n = this._trimAlignValue(s + o);
              break;
            case t.ui.keyCode.DOWN:
            case t.ui.keyCode.LEFT:
              if (s === this._valueMin()) return;
              n = this._trimAlignValue(s - o);
          }
          this._slide(e, a, n);
        },
        keyup: function (e) {
          var i = t(e.target).data("ui-slider-handle-index");
          this._keySliding &&
            ((this._keySliding = !1),
            this._stop(e, i),
            this._change(e, i),
            this._removeClass(t(e.target), null, "ui-state-active"));
        },
      },
    }),
    t.widget("ui.sortable", t.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "sort",
      ready: !1,
      options: {
        appendTo: "parent",
        axis: !1,
        connectWith: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        dropOnEmpty: !0,
        forcePlaceholderSize: !1,
        forceHelperSize: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        items: "> *",
        opacity: !1,
        placeholder: !1,
        revert: !1,
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: "default",
        tolerance: "intersect",
        zIndex: 1e3,
        activate: null,
        beforeStop: null,
        change: null,
        deactivate: null,
        out: null,
        over: null,
        receive: null,
        remove: null,
        sort: null,
        start: null,
        stop: null,
        update: null,
      },
      _isOverAxis: function (t, e, i) {
        return t >= e && e + i > t;
      },
      _isFloating: function (t) {
        return (
          /left|right/.test(t.css("float")) ||
          /inline|table-cell/.test(t.css("display"))
        );
      },
      _create: function () {
        (this.containerCache = {}),
          this._addClass("ui-sortable"),
          this.refresh(),
          (this.offset = this.element.offset()),
          this._mouseInit(),
          this._setHandleClassName(),
          (this.ready = !0);
      },
      _setOption: function (t, e) {
        this._super(t, e), "handle" === t && this._setHandleClassName();
      },
      _setHandleClassName: function () {
        var e = this;
        this._removeClass(
          this.element.find(".ui-sortable-handle"),
          "ui-sortable-handle"
        ),
          t.each(this.items, function () {
            e._addClass(
              this.instance.options.handle
                ? this.item.find(this.instance.options.handle)
                : this.item,
              "ui-sortable-handle"
            );
          });
      },
      _destroy: function () {
        this._mouseDestroy();
        for (var t = this.items.length - 1; t >= 0; t--)
          this.items[t].item.removeData(this.widgetName + "-item");
        return this;
      },
      _mouseCapture: function (e, i) {
        var s = null,
          n = !1,
          o = this;
        return this.reverting
          ? !1
          : this.options.disabled || "static" === this.options.type
          ? !1
          : (this._refreshItems(e),
            t(e.target)
              .parents()
              .each(function () {
                return t.data(this, o.widgetName + "-item") === o
                  ? ((s = t(this)), !1)
                  : void 0;
              }),
            t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)),
            s
              ? !this.options.handle ||
                i ||
                (t(this.options.handle, s)
                  .find("*")
                  .addBack()
                  .each(function () {
                    this === e.target && (n = !0);
                  }),
                n)
                ? ((this.currentItem = s), this._removeCurrentsFromItems(), !0)
                : !1
              : !1);
      },
      _mouseStart: function (e, i, s) {
        var n,
          o,
          a = this.options;
        if (
          ((this.currentContainer = this),
          this.refreshPositions(),
          (this.helper = this._createHelper(e)),
          this._cacheHelperProportions(),
          this._cacheMargins(),
          (this.scrollParent = this.helper.scrollParent()),
          (this.offset = this.currentItem.offset()),
          (this.offset = {
            top: this.offset.top - this.margins.top,
            left: this.offset.left - this.margins.left,
          }),
          t.extend(this.offset, {
            click: {
              left: e.pageX - this.offset.left,
              top: e.pageY - this.offset.top,
            },
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
          this.helper.css("position", "absolute"),
          (this.cssPosition = this.helper.css("position")),
          (this.originalPosition = this._generatePosition(e)),
          (this.originalPageX = e.pageX),
          (this.originalPageY = e.pageY),
          a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt),
          (this.domPosition = {
            prev: this.currentItem.prev()[0],
            parent: this.currentItem.parent()[0],
          }),
          this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
          this._createPlaceholder(),
          a.containment && this._setContainment(),
          a.cursor &&
            "auto" !== a.cursor &&
            ((o = this.document.find("body")),
            (this.storedCursor = o.css("cursor")),
            o.css("cursor", a.cursor),
            (this.storedStylesheet = t(
              "<style>*{ cursor: " + a.cursor + " !important; }</style>"
            ).appendTo(o))),
          a.opacity &&
            (this.helper.css("opacity") &&
              (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", a.opacity)),
          a.zIndex &&
            (this.helper.css("zIndex") &&
              (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", a.zIndex)),
          this.scrollParent[0] !== this.document[0] &&
            "HTML" !== this.scrollParent[0].tagName &&
            (this.overflowOffset = this.scrollParent.offset()),
          this._trigger("start", e, this._uiHash()),
          this._preserveHelperProportions || this._cacheHelperProportions(),
          !s)
        )
          for (n = this.containers.length - 1; n >= 0; n--)
            this.containers[n]._trigger("activate", e, this._uiHash(this));
        return (
          t.ui.ddmanager && (t.ui.ddmanager.current = this),
          t.ui.ddmanager &&
            !a.dropBehaviour &&
            t.ui.ddmanager.prepareOffsets(this, e),
          (this.dragging = !0),
          this._addClass(this.helper, "ui-sortable-helper"),
          this._mouseDrag(e),
          !0
        );
      },
      _mouseDrag: function (e) {
        var i,
          s,
          n,
          o,
          a = this.options,
          r = !1;
        for (
          this.position = this._generatePosition(e),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll &&
              (this.scrollParent[0] !== this.document[0] &&
              "HTML" !== this.scrollParent[0].tagName
                ? (this.overflowOffset.top +
                    this.scrollParent[0].offsetHeight -
                    e.pageY <
                  a.scrollSensitivity
                    ? (this.scrollParent[0].scrollTop = r =
                        this.scrollParent[0].scrollTop + a.scrollSpeed)
                    : e.pageY - this.overflowOffset.top < a.scrollSensitivity &&
                      (this.scrollParent[0].scrollTop = r =
                        this.scrollParent[0].scrollTop - a.scrollSpeed),
                  this.overflowOffset.left +
                    this.scrollParent[0].offsetWidth -
                    e.pageX <
                  a.scrollSensitivity
                    ? (this.scrollParent[0].scrollLeft = r =
                        this.scrollParent[0].scrollLeft + a.scrollSpeed)
                    : e.pageX - this.overflowOffset.left <
                        a.scrollSensitivity &&
                      (this.scrollParent[0].scrollLeft = r =
                        this.scrollParent[0].scrollLeft - a.scrollSpeed))
                : (e.pageY - this.document.scrollTop() < a.scrollSensitivity
                    ? (r = this.document.scrollTop(
                        this.document.scrollTop() - a.scrollSpeed
                      ))
                    : this.window.height() -
                        (e.pageY - this.document.scrollTop()) <
                        a.scrollSensitivity &&
                      (r = this.document.scrollTop(
                        this.document.scrollTop() + a.scrollSpeed
                      )),
                  e.pageX - this.document.scrollLeft() < a.scrollSensitivity
                    ? (r = this.document.scrollLeft(
                        this.document.scrollLeft() - a.scrollSpeed
                      ))
                    : this.window.width() -
                        (e.pageX - this.document.scrollLeft()) <
                        a.scrollSensitivity &&
                      (r = this.document.scrollLeft(
                        this.document.scrollLeft() + a.scrollSpeed
                      ))),
              r !== !1 &&
                t.ui.ddmanager &&
                !a.dropBehaviour &&
                t.ui.ddmanager.prepareOffsets(this, e)),
            this.positionAbs = this._convertPositionTo("absolute"),
            (this.options.axis && "y" === this.options.axis) ||
              (this.helper[0].style.left = this.position.left + "px"),
            (this.options.axis && "x" === this.options.axis) ||
              (this.helper[0].style.top = this.position.top + "px"),
            i = this.items.length - 1;
          i >= 0;
          i--
        )
          if (
            ((s = this.items[i]),
            (n = s.item[0]),
            (o = this._intersectsWithPointer(s)),
            o &&
              s.instance === this.currentContainer &&
              n !== this.currentItem[0] &&
              this.placeholder[1 === o ? "next" : "prev"]()[0] !== n &&
              !t.contains(this.placeholder[0], n) &&
              ("semi-dynamic" === this.options.type
                ? !t.contains(this.element[0], n)
                : !0))
          ) {
            if (
              ((this.direction = 1 === o ? "down" : "up"),
              "pointer" !== this.options.tolerance &&
                !this._intersectsWithSides(s))
            )
              break;
            this._rearrange(e, s), this._trigger("change", e, this._uiHash());
            break;
          }
        return (
          this._contactContainers(e),
          t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
          this._trigger("sort", e, this._uiHash()),
          (this.lastPositionAbs = this.positionAbs),
          !1
        );
      },
      _mouseStop: function (e, i) {
        if (e) {
          if (
            (t.ui.ddmanager &&
              !this.options.dropBehaviour &&
              t.ui.ddmanager.drop(this, e),
            this.options.revert)
          ) {
            var s = this,
              n = this.placeholder.offset(),
              o = this.options.axis,
              a = {};
            (o && "x" !== o) ||
              (a.left =
                n.left -
                this.offset.parent.left -
                this.margins.left +
                (this.offsetParent[0] === this.document[0].body
                  ? 0
                  : this.offsetParent[0].scrollLeft)),
              (o && "y" !== o) ||
                (a.top =
                  n.top -
                  this.offset.parent.top -
                  this.margins.top +
                  (this.offsetParent[0] === this.document[0].body
                    ? 0
                    : this.offsetParent[0].scrollTop)),
              (this.reverting = !0),
              t(this.helper).animate(
                a,
                parseInt(this.options.revert, 10) || 500,
                function () {
                  s._clear(e);
                }
              );
          } else this._clear(e, i);
          return !1;
        }
      },
      cancel: function () {
        if (this.dragging) {
          this._mouseUp(new t.Event("mouseup", { target: null })),
            "original" === this.options.helper
              ? (this.currentItem.css(this._storedCSS),
                this._removeClass(this.currentItem, "ui-sortable-helper"))
              : this.currentItem.show();
          for (var e = this.containers.length - 1; e >= 0; e--)
            this.containers[e]._trigger("deactivate", null, this._uiHash(this)),
              this.containers[e].containerCache.over &&
                (this.containers[e]._trigger("out", null, this._uiHash(this)),
                (this.containers[e].containerCache.over = 0));
        }
        return (
          this.placeholder &&
            (this.placeholder[0].parentNode &&
              this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper &&
              this.helper &&
              this.helper[0].parentNode &&
              this.helper.remove(),
            t.extend(this, {
              helper: null,
              dragging: !1,
              reverting: !1,
              _noFinalSort: null,
            }),
            this.domPosition.prev
              ? t(this.domPosition.prev).after(this.currentItem)
              : t(this.domPosition.parent).prepend(this.currentItem)),
          this
        );
      },
      serialize: function (e) {
        var i = this._getItemsAsjQuery(e && e.connected),
          s = [];
        return (
          (e = e || {}),
          t(i).each(function () {
            var i = (t(e.item || this).attr(e.attribute || "id") || "").match(
              e.expression || /(.+)[\-=_](.+)/
            );
            i &&
              s.push(
                (e.key || i[1] + "[]") +
                  "=" +
                  (e.key && e.expression ? i[1] : i[2])
              );
          }),
          !s.length && e.key && s.push(e.key + "="),
          s.join("&")
        );
      },
      toArray: function (e) {
        var i = this._getItemsAsjQuery(e && e.connected),
          s = [];
        return (
          (e = e || {}),
          i.each(function () {
            s.push(t(e.item || this).attr(e.attribute || "id") || "");
          }),
          s
        );
      },
      _intersectsWith: function (t) {
        var e = this.positionAbs.left,
          i = e + this.helperProportions.width,
          s = this.positionAbs.top,
          n = s + this.helperProportions.height,
          o = t.left,
          a = o + t.width,
          r = t.top,
          h = r + t.height,
          l = this.offset.click.top,
          c = this.offset.click.left,
          u = "x" === this.options.axis || (s + l > r && h > s + l),
          d = "y" === this.options.axis || (e + c > o && a > e + c),
          p = u && d;
        return "pointer" === this.options.tolerance ||
          this.options.forcePointerForContainers ||
          ("pointer" !== this.options.tolerance &&
            this.helperProportions[this.floating ? "width" : "height"] >
              t[this.floating ? "width" : "height"])
          ? p
          : e + this.helperProportions.width / 2 > o &&
              a > i - this.helperProportions.width / 2 &&
              s + this.helperProportions.height / 2 > r &&
              h > n - this.helperProportions.height / 2;
      },
      _intersectsWithPointer: function (t) {
        var e,
          i,
          s =
            "x" === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.top + this.offset.click.top,
              t.top,
              t.height
            ),
          n =
            "y" === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              t.left,
              t.width
            ),
          o = s && n;
        return o
          ? ((e = this._getDragVerticalDirection()),
            (i = this._getDragHorizontalDirection()),
            this.floating
              ? "right" === i || "down" === e
                ? 2
                : 1
              : e && ("down" === e ? 2 : 1))
          : !1;
      },
      _intersectsWithSides: function (t) {
        var e = this._isOverAxis(
            this.positionAbs.top + this.offset.click.top,
            t.top + t.height / 2,
            t.height
          ),
          i = this._isOverAxis(
            this.positionAbs.left + this.offset.click.left,
            t.left + t.width / 2,
            t.width
          ),
          s = this._getDragVerticalDirection(),
          n = this._getDragHorizontalDirection();
        return this.floating && n
          ? ("right" === n && i) || ("left" === n && !i)
          : s && (("down" === s && e) || ("up" === s && !e));
      },
      _getDragVerticalDirection: function () {
        var t = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 !== t && (t > 0 ? "down" : "up");
      },
      _getDragHorizontalDirection: function () {
        var t = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 !== t && (t > 0 ? "right" : "left");
      },
      refresh: function (t) {
        return (
          this._refreshItems(t),
          this._setHandleClassName(),
          this.refreshPositions(),
          this
        );
      },
      _connectWith: function () {
        var t = this.options;
        return t.connectWith.constructor === String
          ? [t.connectWith]
          : t.connectWith;
      },
      _getItemsAsjQuery: function (e) {
        function i() {
          r.push(this);
        }
        var s,
          n,
          o,
          a,
          r = [],
          h = [],
          l = this._connectWith();
        if (l && e)
          for (s = l.length - 1; s >= 0; s--)
            for (o = t(l[s], this.document[0]), n = o.length - 1; n >= 0; n--)
              (a = t.data(o[n], this.widgetFullName)),
                a &&
                  a !== this &&
                  !a.options.disabled &&
                  h.push([
                    t.isFunction(a.options.items)
                      ? a.options.items.call(a.element)
                      : t(a.options.items, a.element)
                          .not(".ui-sortable-helper")
                          .not(".ui-sortable-placeholder"),
                    a,
                  ]);
        for (
          h.push([
            t.isFunction(this.options.items)
              ? this.options.items.call(this.element, null, {
                  options: this.options,
                  item: this.currentItem,
                })
              : t(this.options.items, this.element)
                  .not(".ui-sortable-helper")
                  .not(".ui-sortable-placeholder"),
            this,
          ]),
            s = h.length - 1;
          s >= 0;
          s--
        )
          h[s][0].each(i);
        return t(r);
      },
      _removeCurrentsFromItems: function () {
        var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
        this.items = t.grep(this.items, function (t) {
          for (var i = 0; e.length > i; i++) if (e[i] === t.item[0]) return !1;
          return !0;
        });
      },
      _refreshItems: function (e) {
        (this.items = []), (this.containers = [this]);
        var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c = this.items,
          u = [
            [
              t.isFunction(this.options.items)
                ? this.options.items.call(this.element[0], e, {
                    item: this.currentItem,
                  })
                : t(this.options.items, this.element),
              this,
            ],
          ],
          d = this._connectWith();
        if (d && this.ready)
          for (i = d.length - 1; i >= 0; i--)
            for (n = t(d[i], this.document[0]), s = n.length - 1; s >= 0; s--)
              (o = t.data(n[s], this.widgetFullName)),
                o &&
                  o !== this &&
                  !o.options.disabled &&
                  (u.push([
                    t.isFunction(o.options.items)
                      ? o.options.items.call(o.element[0], e, {
                          item: this.currentItem,
                        })
                      : t(o.options.items, o.element),
                    o,
                  ]),
                  this.containers.push(o));
        for (i = u.length - 1; i >= 0; i--)
          for (a = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++)
            (h = t(r[s])),
              h.data(this.widgetName + "-item", a),
              c.push({
                item: h,
                instance: a,
                width: 0,
                height: 0,
                left: 0,
                top: 0,
              });
      },
      refreshPositions: function (e) {
        (this.floating = this.items.length
          ? "x" === this.options.axis || this._isFloating(this.items[0].item)
          : !1),
          this.offsetParent &&
            this.helper &&
            (this.offset.parent = this._getParentOffset());
        var i, s, n, o;
        for (i = this.items.length - 1; i >= 0; i--)
          (s = this.items[i]),
            (s.instance !== this.currentContainer &&
              this.currentContainer &&
              s.item[0] !== this.currentItem[0]) ||
              ((n = this.options.toleranceElement
                ? t(this.options.toleranceElement, s.item)
                : s.item),
              e || ((s.width = n.outerWidth()), (s.height = n.outerHeight())),
              (o = n.offset()),
              (s.left = o.left),
              (s.top = o.top));
        if (this.options.custom && this.options.custom.refreshContainers)
          this.options.custom.refreshContainers.call(this);
        else
          for (i = this.containers.length - 1; i >= 0; i--)
            (o = this.containers[i].element.offset()),
              (this.containers[i].containerCache.left = o.left),
              (this.containers[i].containerCache.top = o.top),
              (this.containers[i].containerCache.width =
                this.containers[i].element.outerWidth()),
              (this.containers[i].containerCache.height =
                this.containers[i].element.outerHeight());
        return this;
      },
      _createPlaceholder: function (e) {
        e = e || this;
        var i,
          s = e.options;
        (s.placeholder && s.placeholder.constructor !== String) ||
          ((i = s.placeholder),
          (s.placeholder = {
            element: function () {
              var s = e.currentItem[0].nodeName.toLowerCase(),
                n = t("<" + s + ">", e.document[0]);
              return (
                e
                  ._addClass(
                    n,
                    "ui-sortable-placeholder",
                    i || e.currentItem[0].className
                  )
                  ._removeClass(n, "ui-sortable-helper"),
                "tbody" === s
                  ? e._createTrPlaceholder(
                      e.currentItem.find("tr").eq(0),
                      t("<tr>", e.document[0]).appendTo(n)
                    )
                  : "tr" === s
                  ? e._createTrPlaceholder(e.currentItem, n)
                  : "img" === s && n.attr("src", e.currentItem.attr("src")),
                i || n.css("visibility", "hidden"),
                n
              );
            },
            update: function (t, n) {
              (!i || s.forcePlaceholderSize) &&
                (n.height() ||
                  n.height(
                    e.currentItem.innerHeight() -
                      parseInt(e.currentItem.css("paddingTop") || 0, 10) -
                      parseInt(e.currentItem.css("paddingBottom") || 0, 10)
                  ),
                n.width() ||
                  n.width(
                    e.currentItem.innerWidth() -
                      parseInt(e.currentItem.css("paddingLeft") || 0, 10) -
                      parseInt(e.currentItem.css("paddingRight") || 0, 10)
                  ));
            },
          })),
          (e.placeholder = t(
            s.placeholder.element.call(e.element, e.currentItem)
          )),
          e.currentItem.after(e.placeholder),
          s.placeholder.update(e, e.placeholder);
      },
      _createTrPlaceholder: function (e, i) {
        var s = this;
        e.children().each(function () {
          t("<td>&#160;</td>", s.document[0])
            .attr("colspan", t(this).attr("colspan") || 1)
            .appendTo(i);
        });
      },
      _contactContainers: function (e) {
        var i,
          s,
          n,
          o,
          a,
          r,
          h,
          l,
          c,
          u,
          d = null,
          p = null;
        for (i = this.containers.length - 1; i >= 0; i--)
          if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
            if (this._intersectsWith(this.containers[i].containerCache)) {
              if (d && t.contains(this.containers[i].element[0], d.element[0]))
                continue;
              (d = this.containers[i]), (p = i);
            } else
              this.containers[i].containerCache.over &&
                (this.containers[i]._trigger("out", e, this._uiHash(this)),
                (this.containers[i].containerCache.over = 0));
        if (d)
          if (1 === this.containers.length)
            this.containers[p].containerCache.over ||
              (this.containers[p]._trigger("over", e, this._uiHash(this)),
              (this.containers[p].containerCache.over = 1));
          else {
            for (
              n = 1e4,
                o = null,
                c = d.floating || this._isFloating(this.currentItem),
                a = c ? "left" : "top",
                r = c ? "width" : "height",
                u = c ? "pageX" : "pageY",
                s = this.items.length - 1;
              s >= 0;
              s--
            )
              t.contains(
                this.containers[p].element[0],
                this.items[s].item[0]
              ) &&
                this.items[s].item[0] !== this.currentItem[0] &&
                ((h = this.items[s].item.offset()[a]),
                (l = !1),
                e[u] - h > this.items[s][r] / 2 && (l = !0),
                n > Math.abs(e[u] - h) &&
                  ((n = Math.abs(e[u] - h)),
                  (o = this.items[s]),
                  (this.direction = l ? "up" : "down")));
            if (!o && !this.options.dropOnEmpty) return;
            if (this.currentContainer === this.containers[p])
              return (
                this.currentContainer.containerCache.over ||
                  (this.containers[p]._trigger("over", e, this._uiHash()),
                  (this.currentContainer.containerCache.over = 1)),
                void 0
              );
            o
              ? this._rearrange(e, o, null, !0)
              : this._rearrange(e, null, this.containers[p].element, !0),
              this._trigger("change", e, this._uiHash()),
              this.containers[p]._trigger("change", e, this._uiHash(this)),
              (this.currentContainer = this.containers[p]),
              this.options.placeholder.update(
                this.currentContainer,
                this.placeholder
              ),
              this.containers[p]._trigger("over", e, this._uiHash(this)),
              (this.containers[p].containerCache.over = 1);
          }
      },
      _createHelper: function (e) {
        var i = this.options,
          s = t.isFunction(i.helper)
            ? t(i.helper.apply(this.element[0], [e, this.currentItem]))
            : "clone" === i.helper
            ? this.currentItem.clone()
            : this.currentItem;
        return (
          s.parents("body").length ||
            t(
              "parent" !== i.appendTo
                ? i.appendTo
                : this.currentItem[0].parentNode
            )[0].appendChild(s[0]),
          s[0] === this.currentItem[0] &&
            (this._storedCSS = {
              width: this.currentItem[0].style.width,
              height: this.currentItem[0].style.height,
              position: this.currentItem.css("position"),
              top: this.currentItem.css("top"),
              left: this.currentItem.css("left"),
            }),
          (!s[0].style.width || i.forceHelperSize) &&
            s.width(this.currentItem.width()),
          (!s[0].style.height || i.forceHelperSize) &&
            s.height(this.currentItem.height()),
          s
        );
      },
      _adjustOffsetFromHelper: function (e) {
        "string" == typeof e && (e = e.split(" ")),
          t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
          "left" in e && (this.offset.click.left = e.left + this.margins.left),
          "right" in e &&
            (this.offset.click.left =
              this.helperProportions.width - e.right + this.margins.left),
          "top" in e && (this.offset.click.top = e.top + this.margins.top),
          "bottom" in e &&
            (this.offset.click.top =
              this.helperProportions.height - e.bottom + this.margins.top);
      },
      _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var e = this.offsetParent.offset();
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== this.document[0] &&
            t.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((e.left += this.scrollParent.scrollLeft()),
            (e.top += this.scrollParent.scrollTop())),
          (this.offsetParent[0] === this.document[0].body ||
            (this.offsetParent[0].tagName &&
              "html" === this.offsetParent[0].tagName.toLowerCase() &&
              t.ui.ie)) &&
            (e = { top: 0, left: 0 }),
          {
            top:
              e.top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              e.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        if ("relative" === this.cssPosition) {
          var t = this.currentItem.position();
          return {
            top:
              t.top -
              (parseInt(this.helper.css("top"), 10) || 0) +
              this.scrollParent.scrollTop(),
            left:
              t.left -
              (parseInt(this.helper.css("left"), 10) || 0) +
              this.scrollParent.scrollLeft(),
          };
        }
        return { top: 0, left: 0 };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
          top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var e,
          i,
          s,
          n = this.options;
        "parent" === n.containment &&
          (n.containment = this.helper[0].parentNode),
          ("document" === n.containment || "window" === n.containment) &&
            (this.containment = [
              0 - this.offset.relative.left - this.offset.parent.left,
              0 - this.offset.relative.top - this.offset.parent.top,
              "document" === n.containment
                ? this.document.width()
                : this.window.width() -
                  this.helperProportions.width -
                  this.margins.left,
              ("document" === n.containment
                ? this.document.height() ||
                  document.body.parentNode.scrollHeight
                : this.window.height() ||
                  this.document[0].body.parentNode.scrollHeight) -
                this.helperProportions.height -
                this.margins.top,
            ]),
          /^(document|window|parent)$/.test(n.containment) ||
            ((e = t(n.containment)[0]),
            (i = t(n.containment).offset()),
            (s = "hidden" !== t(e).css("overflow")),
            (this.containment = [
              i.left +
                (parseInt(t(e).css("borderLeftWidth"), 10) || 0) +
                (parseInt(t(e).css("paddingLeft"), 10) || 0) -
                this.margins.left,
              i.top +
                (parseInt(t(e).css("borderTopWidth"), 10) || 0) +
                (parseInt(t(e).css("paddingTop"), 10) || 0) -
                this.margins.top,
              i.left +
                (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) -
                (parseInt(t(e).css("borderLeftWidth"), 10) || 0) -
                (parseInt(t(e).css("paddingRight"), 10) || 0) -
                this.helperProportions.width -
                this.margins.left,
              i.top +
                (s
                  ? Math.max(e.scrollHeight, e.offsetHeight)
                  : e.offsetHeight) -
                (parseInt(t(e).css("borderTopWidth"), 10) || 0) -
                (parseInt(t(e).css("paddingBottom"), 10) || 0) -
                this.helperProportions.height -
                this.margins.top,
            ]));
      },
      _convertPositionTo: function (e, i) {
        i || (i = this.position);
        var s = "absolute" === e ? 1 : -1,
          n =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              t.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          o = /(html|body)/i.test(n[0].tagName);
        return {
          top:
            i.top +
            this.offset.relative.top * s +
            this.offset.parent.top * s -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollTop()
              : o
              ? 0
              : n.scrollTop()) *
              s,
          left:
            i.left +
            this.offset.relative.left * s +
            this.offset.parent.left * s -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollLeft()
              : o
              ? 0
              : n.scrollLeft()) *
              s,
        };
      },
      _generatePosition: function (e) {
        var i,
          s,
          n = this.options,
          o = e.pageX,
          a = e.pageY,
          r =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              t.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          h = /(html|body)/i.test(r[0].tagName);
        return (
          "relative" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              this.scrollParent[0] !== this.offsetParent[0]) ||
            (this.offset.relative = this._getRelativeOffset()),
          this.originalPosition &&
            (this.containment &&
              (e.pageX - this.offset.click.left < this.containment[0] &&
                (o = this.containment[0] + this.offset.click.left),
              e.pageY - this.offset.click.top < this.containment[1] &&
                (a = this.containment[1] + this.offset.click.top),
              e.pageX - this.offset.click.left > this.containment[2] &&
                (o = this.containment[2] + this.offset.click.left),
              e.pageY - this.offset.click.top > this.containment[3] &&
                (a = this.containment[3] + this.offset.click.top)),
            n.grid &&
              ((i =
                this.originalPageY +
                Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1]),
              (a = this.containment
                ? i - this.offset.click.top >= this.containment[1] &&
                  i - this.offset.click.top <= this.containment[3]
                  ? i
                  : i - this.offset.click.top >= this.containment[1]
                  ? i - n.grid[1]
                  : i + n.grid[1]
                : i),
              (s =
                this.originalPageX +
                Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0]),
              (o = this.containment
                ? s - this.offset.click.left >= this.containment[0] &&
                  s - this.offset.click.left <= this.containment[2]
                  ? s
                  : s - this.offset.click.left >= this.containment[0]
                  ? s - n.grid[0]
                  : s + n.grid[0]
                : s))),
          {
            top:
              a -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : h
                ? 0
                : r.scrollTop()),
            left:
              o -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : h
                ? 0
                : r.scrollLeft()),
          }
        );
      },
      _rearrange: function (t, e, i, s) {
        i
          ? i[0].appendChild(this.placeholder[0])
          : e.item[0].parentNode.insertBefore(
              this.placeholder[0],
              "down" === this.direction ? e.item[0] : e.item[0].nextSibling
            ),
          (this.counter = this.counter ? ++this.counter : 1);
        var n = this.counter;
        this._delay(function () {
          n === this.counter && this.refreshPositions(!s);
        });
      },
      _clear: function (t, e) {
        function i(t, e, i) {
          return function (s) {
            i._trigger(t, s, e._uiHash(e));
          };
        }
        this.reverting = !1;
        var s,
          n = [];
        if (
          (!this._noFinalSort &&
            this.currentItem.parent().length &&
            this.placeholder.before(this.currentItem),
          (this._noFinalSort = null),
          this.helper[0] === this.currentItem[0])
        ) {
          for (s in this._storedCSS)
            ("auto" === this._storedCSS[s] ||
              "static" === this._storedCSS[s]) &&
              (this._storedCSS[s] = "");
          this.currentItem.css(this._storedCSS),
            this._removeClass(this.currentItem, "ui-sortable-helper");
        } else this.currentItem.show();
        for (
          this.fromOutside &&
            !e &&
            n.push(function (t) {
              this._trigger("receive", t, this._uiHash(this.fromOutside));
            }),
            (!this.fromOutside &&
              this.domPosition.prev ===
                this.currentItem.prev().not(".ui-sortable-helper")[0] &&
              this.domPosition.parent === this.currentItem.parent()[0]) ||
              e ||
              n.push(function (t) {
                this._trigger("update", t, this._uiHash());
              }),
            this !== this.currentContainer &&
              (e ||
                (n.push(function (t) {
                  this._trigger("remove", t, this._uiHash());
                }),
                n.push(
                  function (t) {
                    return function (e) {
                      t._trigger("receive", e, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ),
                n.push(
                  function (t) {
                    return function (e) {
                      t._trigger("update", e, this._uiHash(this));
                    };
                  }.call(this, this.currentContainer)
                ))),
            s = this.containers.length - 1;
          s >= 0;
          s--
        )
          e || n.push(i("deactivate", this, this.containers[s])),
            this.containers[s].containerCache.over &&
              (n.push(i("out", this, this.containers[s])),
              (this.containers[s].containerCache.over = 0));
        if (
          (this.storedCursor &&
            (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
          this._storedOpacity &&
            this.helper.css("opacity", this._storedOpacity),
          this._storedZIndex &&
            this.helper.css(
              "zIndex",
              "auto" === this._storedZIndex ? "" : this._storedZIndex
            ),
          (this.dragging = !1),
          e || this._trigger("beforeStop", t, this._uiHash()),
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
          this.cancelHelperRemoval ||
            (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            (this.helper = null)),
          !e)
        ) {
          for (s = 0; n.length > s; s++) n[s].call(this, t);
          this._trigger("stop", t, this._uiHash());
        }
        return (this.fromOutside = !1), !this.cancelHelperRemoval;
      },
      _trigger: function () {
        t.Widget.prototype._trigger.apply(this, arguments) === !1 &&
          this.cancel();
      },
      _uiHash: function (e) {
        var i = e || this;
        return {
          helper: i.helper,
          placeholder: i.placeholder || t([]),
          position: i.position,
          originalPosition: i.originalPosition,
          offset: i.positionAbs,
          item: i.currentItem,
          sender: e ? e.element : null,
        };
      },
    }),
    t.widget("ui.spinner", {
      version: "1.12.1",
      defaultElement: "<input>",
      widgetEventPrefix: "spin",
      options: {
        classes: {
          "ui-spinner": "ui-corner-all",
          "ui-spinner-down": "ui-corner-br",
          "ui-spinner-up": "ui-corner-tr",
        },
        culture: null,
        icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" },
        incremental: !0,
        max: null,
        min: null,
        numberFormat: null,
        page: 10,
        step: 1,
        change: null,
        spin: null,
        start: null,
        stop: null,
      },
      _create: function () {
        this._setOption("max", this.options.max),
          this._setOption("min", this.options.min),
          this._setOption("step", this.options.step),
          "" !== this.value() && this._value(this.element.val(), !0),
          this._draw(),
          this._on(this._events),
          this._refresh(),
          this._on(this.window, {
            beforeunload: function () {
              this.element.removeAttr("autocomplete");
            },
          });
      },
      _getCreateOptions: function () {
        var e = this._super(),
          i = this.element;
        return (
          t.each(["min", "max", "step"], function (t, s) {
            var n = i.attr(s);
            null != n && n.length && (e[s] = n);
          }),
          e
        );
      },
      _events: {
        keydown: function (t) {
          this._start(t) && this._keydown(t) && t.preventDefault();
        },
        keyup: "_stop",
        focus: function () {
          this.previous = this.element.val();
        },
        blur: function (t) {
          return this.cancelBlur
            ? (delete this.cancelBlur, void 0)
            : (this._stop(),
              this._refresh(),
              this.previous !== this.element.val() &&
                this._trigger("change", t),
              void 0);
        },
        mousewheel: function (t, e) {
          if (e) {
            if (!this.spinning && !this._start(t)) return !1;
            this._spin((e > 0 ? 1 : -1) * this.options.step, t),
              clearTimeout(this.mousewheelTimer),
              (this.mousewheelTimer = this._delay(function () {
                this.spinning && this._stop(t);
              }, 100)),
              t.preventDefault();
          }
        },
        "mousedown .ui-spinner-button": function (e) {
          function i() {
            var e =
              this.element[0] === t.ui.safeActiveElement(this.document[0]);
            e ||
              (this.element.trigger("focus"),
              (this.previous = s),
              this._delay(function () {
                this.previous = s;
              }));
          }
          var s;
          (s =
            this.element[0] === t.ui.safeActiveElement(this.document[0])
              ? this.previous
              : this.element.val()),
            e.preventDefault(),
            i.call(this),
            (this.cancelBlur = !0),
            this._delay(function () {
              delete this.cancelBlur, i.call(this);
            }),
            this._start(e) !== !1 &&
              this._repeat(
                null,
                t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                e
              );
        },
        "mouseup .ui-spinner-button": "_stop",
        "mouseenter .ui-spinner-button": function (e) {
          return t(e.currentTarget).hasClass("ui-state-active")
            ? this._start(e) === !1
              ? !1
              : (this._repeat(
                  null,
                  t(e.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                  e
                ),
                void 0)
            : void 0;
        },
        "mouseleave .ui-spinner-button": "_stop",
      },
      _enhance: function () {
        this.uiSpinner = this.element
          .attr("autocomplete", "off")
          .wrap("<span>")
          .parent()
          .append("<a></a><a></a>");
      },
      _draw: function () {
        this._enhance(),
          this._addClass(
            this.uiSpinner,
            "ui-spinner",
            "ui-widget ui-widget-content"
          ),
          this._addClass("ui-spinner-input"),
          this.element.attr("role", "spinbutton"),
          (this.buttons = this.uiSpinner
            .children("a")
            .attr("tabIndex", -1)
            .attr("aria-hidden", !0)
            .button({ classes: { "ui-button": "" } })),
          this._removeClass(this.buttons, "ui-corner-all"),
          this._addClass(
            this.buttons.first(),
            "ui-spinner-button ui-spinner-up"
          ),
          this._addClass(
            this.buttons.last(),
            "ui-spinner-button ui-spinner-down"
          ),
          this.buttons
            .first()
            .button({ icon: this.options.icons.up, showLabel: !1 }),
          this.buttons
            .last()
            .button({ icon: this.options.icons.down, showLabel: !1 }),
          this.buttons.height() > Math.ceil(0.5 * this.uiSpinner.height()) &&
            this.uiSpinner.height() > 0 &&
            this.uiSpinner.height(this.uiSpinner.height());
      },
      _keydown: function (e) {
        var i = this.options,
          s = t.ui.keyCode;
        switch (e.keyCode) {
          case s.UP:
            return this._repeat(null, 1, e), !0;
          case s.DOWN:
            return this._repeat(null, -1, e), !0;
          case s.PAGE_UP:
            return this._repeat(null, i.page, e), !0;
          case s.PAGE_DOWN:
            return this._repeat(null, -i.page, e), !0;
        }
        return !1;
      },
      _start: function (t) {
        return this.spinning || this._trigger("start", t) !== !1
          ? (this.counter || (this.counter = 1), (this.spinning = !0), !0)
          : !1;
      },
      _repeat: function (t, e, i) {
        (t = t || 500),
          clearTimeout(this.timer),
          (this.timer = this._delay(function () {
            this._repeat(40, e, i);
          }, t)),
          this._spin(e * this.options.step, i);
      },
      _spin: function (t, e) {
        var i = this.value() || 0;
        this.counter || (this.counter = 1),
          (i = this._adjustValue(i + t * this._increment(this.counter))),
          (this.spinning && this._trigger("spin", e, { value: i }) === !1) ||
            (this._value(i), this.counter++);
      },
      _increment: function (e) {
        var i = this.options.incremental;
        return i
          ? t.isFunction(i)
            ? i(e)
            : Math.floor((e * e * e) / 5e4 - (e * e) / 500 + (17 * e) / 200 + 1)
          : 1;
      },
      _precision: function () {
        var t = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (t = Math.max(t, this._precisionOf(this.options.min))),
          t
        );
      },
      _precisionOf: function (t) {
        var e = "" + t,
          i = e.indexOf(".");
        return -1 === i ? 0 : e.length - i - 1;
      },
      _adjustValue: function (t) {
        var e,
          i,
          s = this.options;
        return (
          (e = null !== s.min ? s.min : 0),
          (i = t - e),
          (i = Math.round(i / s.step) * s.step),
          (t = e + i),
          (t = parseFloat(t.toFixed(this._precision()))),
          null !== s.max && t > s.max
            ? s.max
            : null !== s.min && s.min > t
            ? s.min
            : t
        );
      },
      _stop: function (t) {
        this.spinning &&
          (clearTimeout(this.timer),
          clearTimeout(this.mousewheelTimer),
          (this.counter = 0),
          (this.spinning = !1),
          this._trigger("stop", t));
      },
      _setOption: function (t, e) {
        var i, s, n;
        return "culture" === t || "numberFormat" === t
          ? ((i = this._parse(this.element.val())),
            (this.options[t] = e),
            this.element.val(this._format(i)),
            void 0)
          : (("max" === t || "min" === t || "step" === t) &&
              "string" == typeof e &&
              (e = this._parse(e)),
            "icons" === t &&
              ((s = this.buttons.first().find(".ui-icon")),
              this._removeClass(s, null, this.options.icons.up),
              this._addClass(s, null, e.up),
              (n = this.buttons.last().find(".ui-icon")),
              this._removeClass(n, null, this.options.icons.down),
              this._addClass(n, null, e.down)),
            this._super(t, e),
            void 0);
      },
      _setOptionDisabled: function (t) {
        this._super(t),
          this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t),
          this.element.prop("disabled", !!t),
          this.buttons.button(t ? "disable" : "enable");
      },
      _setOptions: r(function (t) {
        this._super(t);
      }),
      _parse: function (t) {
        return (
          "string" == typeof t &&
            "" !== t &&
            (t =
              window.Globalize && this.options.numberFormat
                ? Globalize.parseFloat(t, 10, this.options.culture)
                : +t),
          "" === t || isNaN(t) ? null : t
        );
      },
      _format: function (t) {
        return "" === t
          ? ""
          : window.Globalize && this.options.numberFormat
          ? Globalize.format(t, this.options.numberFormat, this.options.culture)
          : t;
      },
      _refresh: function () {
        this.element.attr({
          "aria-valuemin": this.options.min,
          "aria-valuemax": this.options.max,
          "aria-valuenow": this._parse(this.element.val()),
        });
      },
      isValid: function () {
        var t = this.value();
        return null === t ? !1 : t === this._adjustValue(t);
      },
      _value: function (t, e) {
        var i;
        "" !== t &&
          ((i = this._parse(t)),
          null !== i &&
            (e || (i = this._adjustValue(i)), (t = this._format(i)))),
          this.element.val(t),
          this._refresh();
      },
      _destroy: function () {
        this.element
          .prop("disabled", !1)
          .removeAttr(
            "autocomplete role aria-valuemin aria-valuemax aria-valuenow"
          ),
          this.uiSpinner.replaceWith(this.element);
      },
      stepUp: r(function (t) {
        this._stepUp(t);
      }),
      _stepUp: function (t) {
        this._start() &&
          (this._spin((t || 1) * this.options.step), this._stop());
      },
      stepDown: r(function (t) {
        this._stepDown(t);
      }),
      _stepDown: function (t) {
        this._start() &&
          (this._spin((t || 1) * -this.options.step), this._stop());
      },
      pageUp: r(function (t) {
        this._stepUp((t || 1) * this.options.page);
      }),
      pageDown: r(function (t) {
        this._stepDown((t || 1) * this.options.page);
      }),
      value: function (t) {
        return arguments.length
          ? (r(this._value).call(this, t), void 0)
          : this._parse(this.element.val());
      },
      widget: function () {
        return this.uiSpinner;
      },
    }),
    t.uiBackCompat !== !1 &&
      t.widget("ui.spinner", t.ui.spinner, {
        _enhance: function () {
          this.uiSpinner = this.element
            .attr("autocomplete", "off")
            .wrap(this._uiSpinnerHtml())
            .parent()
            .append(this._buttonHtml());
        },
        _uiSpinnerHtml: function () {
          return "<span>";
        },
        _buttonHtml: function () {
          return "<a></a><a></a>";
        },
      }),
    t.ui.spinner,
    t.widget("ui.tabs", {
      version: "1.12.1",
      delay: 300,
      options: {
        active: null,
        classes: {
          "ui-tabs": "ui-corner-all",
          "ui-tabs-nav": "ui-corner-all",
          "ui-tabs-panel": "ui-corner-bottom",
          "ui-tabs-tab": "ui-corner-top",
        },
        collapsible: !1,
        event: "click",
        heightStyle: "content",
        hide: null,
        show: null,
        activate: null,
        beforeActivate: null,
        beforeLoad: null,
        load: null,
      },
      _isLocal: (function () {
        var t = /#.*$/;
        return function (e) {
          var i, s;
          (i = e.href.replace(t, "")), (s = location.href.replace(t, ""));
          try {
            i = decodeURIComponent(i);
          } catch (n) {}
          try {
            s = decodeURIComponent(s);
          } catch (n) {}
          return e.hash.length > 1 && i === s;
        };
      })(),
      _create: function () {
        var e = this,
          i = this.options;
        (this.running = !1),
          this._addClass("ui-tabs", "ui-widget ui-widget-content"),
          this._toggleClass("ui-tabs-collapsible", null, i.collapsible),
          this._processTabs(),
          (i.active = this._initialActive()),
          t.isArray(i.disabled) &&
            (i.disabled = t
              .unique(
                i.disabled.concat(
                  t.map(this.tabs.filter(".ui-state-disabled"), function (t) {
                    return e.tabs.index(t);
                  })
                )
              )
              .sort()),
          (this.active =
            this.options.active !== !1 && this.anchors.length
              ? this._findActive(i.active)
              : t()),
          this._refresh(),
          this.active.length && this.load(i.active);
      },
      _initialActive: function () {
        var e = this.options.active,
          i = this.options.collapsible,
          s = location.hash.substring(1);
        return (
          null === e &&
            (s &&
              this.tabs.each(function (i, n) {
                return t(n).attr("aria-controls") === s
                  ? ((e = i), !1)
                  : void 0;
              }),
            null === e &&
              (e = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
            (null === e || -1 === e) && (e = this.tabs.length ? 0 : !1)),
          e !== !1 &&
            ((e = this.tabs.index(this.tabs.eq(e))),
            -1 === e && (e = i ? !1 : 0)),
          !i && e === !1 && this.anchors.length && (e = 0),
          e
        );
      },
      _getCreateEventData: function () {
        return {
          tab: this.active,
          panel: this.active.length ? this._getPanelForTab(this.active) : t(),
        };
      },
      _tabKeydown: function (e) {
        var i = t(t.ui.safeActiveElement(this.document[0])).closest("li"),
          s = this.tabs.index(i),
          n = !0;
        if (!this._handlePageNav(e)) {
          switch (e.keyCode) {
            case t.ui.keyCode.RIGHT:
            case t.ui.keyCode.DOWN:
              s++;
              break;
            case t.ui.keyCode.UP:
            case t.ui.keyCode.LEFT:
              (n = !1), s--;
              break;
            case t.ui.keyCode.END:
              s = this.anchors.length - 1;
              break;
            case t.ui.keyCode.HOME:
              s = 0;
              break;
            case t.ui.keyCode.SPACE:
              return (
                e.preventDefault(),
                clearTimeout(this.activating),
                this._activate(s),
                void 0
              );
            case t.ui.keyCode.ENTER:
              return (
                e.preventDefault(),
                clearTimeout(this.activating),
                this._activate(s === this.options.active ? !1 : s),
                void 0
              );
            default:
              return;
          }
          e.preventDefault(),
            clearTimeout(this.activating),
            (s = this._focusNextTab(s, n)),
            e.ctrlKey ||
              e.metaKey ||
              (i.attr("aria-selected", "false"),
              this.tabs.eq(s).attr("aria-selected", "true"),
              (this.activating = this._delay(function () {
                this.option("active", s);
              }, this.delay)));
        }
      },
      _panelKeydown: function (e) {
        this._handlePageNav(e) ||
          (e.ctrlKey &&
            e.keyCode === t.ui.keyCode.UP &&
            (e.preventDefault(), this.active.trigger("focus")));
      },
      _handlePageNav: function (e) {
        return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP
          ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
            !0)
          : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN
          ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
            !0)
          : void 0;
      },
      _findNextTab: function (e, i) {
        function s() {
          return e > n && (e = 0), 0 > e && (e = n), e;
        }
        for (
          var n = this.tabs.length - 1;
          -1 !== t.inArray(s(), this.options.disabled);

        )
          e = i ? e + 1 : e - 1;
        return e;
      },
      _focusNextTab: function (t, e) {
        return (
          (t = this._findNextTab(t, e)), this.tabs.eq(t).trigger("focus"), t
        );
      },
      _setOption: function (t, e) {
        return "active" === t
          ? (this._activate(e), void 0)
          : (this._super(t, e),
            "collapsible" === t &&
              (this._toggleClass("ui-tabs-collapsible", null, e),
              e || this.options.active !== !1 || this._activate(0)),
            "event" === t && this._setupEvents(e),
            "heightStyle" === t && this._setupHeightStyle(e),
            void 0);
      },
      _sanitizeSelector: function (t) {
        return t
          ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&")
          : "";
      },
      refresh: function () {
        var e = this.options,
          i = this.tablist.children(":has(a[href])");
        (e.disabled = t.map(i.filter(".ui-state-disabled"), function (t) {
          return i.index(t);
        })),
          this._processTabs(),
          e.active !== !1 && this.anchors.length
            ? this.active.length && !t.contains(this.tablist[0], this.active[0])
              ? this.tabs.length === e.disabled.length
                ? ((e.active = !1), (this.active = t()))
                : this._activate(
                    this._findNextTab(Math.max(0, e.active - 1), !1)
                  )
              : (e.active = this.tabs.index(this.active))
            : ((e.active = !1), (this.active = t())),
          this._refresh();
      },
      _refresh: function () {
        this._setOptionDisabled(this.options.disabled),
          this._setupEvents(this.options.event),
          this._setupHeightStyle(this.options.heightStyle),
          this.tabs
            .not(this.active)
            .attr({
              "aria-selected": "false",
              "aria-expanded": "false",
              tabIndex: -1,
            }),
          this.panels
            .not(this._getPanelForTab(this.active))
            .hide()
            .attr({ "aria-hidden": "true" }),
          this.active.length
            ? (this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0,
              }),
              this._addClass(this.active, "ui-tabs-active", "ui-state-active"),
              this._getPanelForTab(this.active)
                .show()
                .attr({ "aria-hidden": "false" }))
            : this.tabs.eq(0).attr("tabIndex", 0);
      },
      _processTabs: function () {
        var e = this,
          i = this.tabs,
          s = this.anchors,
          n = this.panels;
        (this.tablist = this._getList().attr("role", "tablist")),
          this._addClass(
            this.tablist,
            "ui-tabs-nav",
            "ui-helper-reset ui-helper-clearfix ui-widget-header"
          ),
          this.tablist
            .on("mousedown" + this.eventNamespace, "> li", function (e) {
              t(this).is(".ui-state-disabled") && e.preventDefault();
            })
            .on("focus" + this.eventNamespace, ".ui-tabs-anchor", function () {
              t(this).closest("li").is(".ui-state-disabled") && this.blur();
            }),
          (this.tabs = this.tablist
            .find("> li:has(a[href])")
            .attr({ role: "tab", tabIndex: -1 })),
          this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"),
          (this.anchors = this.tabs
            .map(function () {
              return t("a", this)[0];
            })
            .attr({ role: "presentation", tabIndex: -1 })),
          this._addClass(this.anchors, "ui-tabs-anchor"),
          (this.panels = t()),
          this.anchors.each(function (i, s) {
            var n,
              o,
              a,
              r = t(s).uniqueId().attr("id"),
              h = t(s).closest("li"),
              l = h.attr("aria-controls");
            e._isLocal(s)
              ? ((n = s.hash),
                (a = n.substring(1)),
                (o = e.element.find(e._sanitizeSelector(n))))
              : ((a = h.attr("aria-controls") || t({}).uniqueId()[0].id),
                (n = "#" + a),
                (o = e.element.find(n)),
                o.length ||
                  ((o = e._createPanel(a)),
                  o.insertAfter(e.panels[i - 1] || e.tablist)),
                o.attr("aria-live", "polite")),
              o.length && (e.panels = e.panels.add(o)),
              l && h.data("ui-tabs-aria-controls", l),
              h.attr({ "aria-controls": a, "aria-labelledby": r }),
              o.attr("aria-labelledby", r);
          }),
          this.panels.attr("role", "tabpanel"),
          this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"),
          i &&
            (this._off(i.not(this.tabs)),
            this._off(s.not(this.anchors)),
            this._off(n.not(this.panels)));
      },
      _getList: function () {
        return this.tablist || this.element.find("ol, ul").eq(0);
      },
      _createPanel: function (e) {
        return t("<div>").attr("id", e).data("ui-tabs-destroy", !0);
      },
      _setOptionDisabled: function (e) {
        var i, s, n;
        for (
          t.isArray(e) &&
            (e.length
              ? e.length === this.anchors.length && (e = !0)
              : (e = !1)),
            n = 0;
          (s = this.tabs[n]);
          n++
        )
          (i = t(s)),
            e === !0 || -1 !== t.inArray(n, e)
              ? (i.attr("aria-disabled", "true"),
                this._addClass(i, null, "ui-state-disabled"))
              : (i.removeAttr("aria-disabled"),
                this._removeClass(i, null, "ui-state-disabled"));
        (this.options.disabled = e),
          this._toggleClass(
            this.widget(),
            this.widgetFullName + "-disabled",
            null,
            e === !0
          );
      },
      _setupEvents: function (e) {
        var i = {};
        e &&
          t.each(e.split(" "), function (t, e) {
            i[e] = "_eventHandler";
          }),
          this._off(this.anchors.add(this.tabs).add(this.panels)),
          this._on(!0, this.anchors, {
            click: function (t) {
              t.preventDefault();
            },
          }),
          this._on(this.anchors, i),
          this._on(this.tabs, { keydown: "_tabKeydown" }),
          this._on(this.panels, { keydown: "_panelKeydown" }),
          this._focusable(this.tabs),
          this._hoverable(this.tabs);
      },
      _setupHeightStyle: function (e) {
        var i,
          s = this.element.parent();
        "fill" === e
          ? ((i = s.height()),
            (i -= this.element.outerHeight() - this.element.height()),
            this.element.siblings(":visible").each(function () {
              var e = t(this),
                s = e.css("position");
              "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0));
            }),
            this.element
              .children()
              .not(this.panels)
              .each(function () {
                i -= t(this).outerHeight(!0);
              }),
            this.panels
              .each(function () {
                t(this).height(
                  Math.max(0, i - t(this).innerHeight() + t(this).height())
                );
              })
              .css("overflow", "auto"))
          : "auto" === e &&
            ((i = 0),
            this.panels
              .each(function () {
                i = Math.max(i, t(this).height("").height());
              })
              .height(i));
      },
      _eventHandler: function (e) {
        var i = this.options,
          s = this.active,
          n = t(e.currentTarget),
          o = n.closest("li"),
          a = o[0] === s[0],
          r = a && i.collapsible,
          h = r ? t() : this._getPanelForTab(o),
          l = s.length ? this._getPanelForTab(s) : t(),
          c = { oldTab: s, oldPanel: l, newTab: r ? t() : o, newPanel: h };
        e.preventDefault(),
          o.hasClass("ui-state-disabled") ||
            o.hasClass("ui-tabs-loading") ||
            this.running ||
            (a && !i.collapsible) ||
            this._trigger("beforeActivate", e, c) === !1 ||
            ((i.active = r ? !1 : this.tabs.index(o)),
            (this.active = a ? t() : o),
            this.xhr && this.xhr.abort(),
            l.length ||
              h.length ||
              t.error("jQuery UI Tabs: Mismatching fragment identifier."),
            h.length && this.load(this.tabs.index(o), e),
            this._toggle(e, c));
      },
      _toggle: function (e, i) {
        function s() {
          (o.running = !1), o._trigger("activate", e, i);
        }
        function n() {
          o._addClass(
            i.newTab.closest("li"),
            "ui-tabs-active",
            "ui-state-active"
          ),
            a.length && o.options.show
              ? o._show(a, o.options.show, s)
              : (a.show(), s());
        }
        var o = this,
          a = i.newPanel,
          r = i.oldPanel;
        (this.running = !0),
          r.length && this.options.hide
            ? this._hide(r, this.options.hide, function () {
                o._removeClass(
                  i.oldTab.closest("li"),
                  "ui-tabs-active",
                  "ui-state-active"
                ),
                  n();
              })
            : (this._removeClass(
                i.oldTab.closest("li"),
                "ui-tabs-active",
                "ui-state-active"
              ),
              r.hide(),
              n()),
          r.attr("aria-hidden", "true"),
          i.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }),
          a.length && r.length
            ? i.oldTab.attr("tabIndex", -1)
            : a.length &&
              this.tabs
                .filter(function () {
                  return 0 === t(this).attr("tabIndex");
                })
                .attr("tabIndex", -1),
          a.attr("aria-hidden", "false"),
          i.newTab.attr({
            "aria-selected": "true",
            "aria-expanded": "true",
            tabIndex: 0,
          });
      },
      _activate: function (e) {
        var i,
          s = this._findActive(e);
        s[0] !== this.active[0] &&
          (s.length || (s = this.active),
          (i = s.find(".ui-tabs-anchor")[0]),
          this._eventHandler({
            target: i,
            currentTarget: i,
            preventDefault: t.noop,
          }));
      },
      _findActive: function (e) {
        return e === !1 ? t() : this.tabs.eq(e);
      },
      _getIndex: function (e) {
        return (
          "string" == typeof e &&
            (e = this.anchors.index(
              this.anchors.filter("[href$='" + t.ui.escapeSelector(e) + "']")
            )),
          e
        );
      },
      _destroy: function () {
        this.xhr && this.xhr.abort(),
          this.tablist.removeAttr("role").off(this.eventNamespace),
          this.anchors.removeAttr("role tabIndex").removeUniqueId(),
          this.tabs.add(this.panels).each(function () {
            t.data(this, "ui-tabs-destroy")
              ? t(this).remove()
              : t(this).removeAttr(
                  "role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded"
                );
          }),
          this.tabs.each(function () {
            var e = t(this),
              i = e.data("ui-tabs-aria-controls");
            i
              ? e.attr("aria-controls", i).removeData("ui-tabs-aria-controls")
              : e.removeAttr("aria-controls");
          }),
          this.panels.show(),
          "content" !== this.options.heightStyle &&
            this.panels.css("height", "");
      },
      enable: function (e) {
        var i = this.options.disabled;
        i !== !1 &&
          (void 0 === e
            ? (i = !1)
            : ((e = this._getIndex(e)),
              (i = t.isArray(i)
                ? t.map(i, function (t) {
                    return t !== e ? t : null;
                  })
                : t.map(this.tabs, function (t, i) {
                    return i !== e ? i : null;
                  }))),
          this._setOptionDisabled(i));
      },
      disable: function (e) {
        var i = this.options.disabled;
        if (i !== !0) {
          if (void 0 === e) i = !0;
          else {
            if (((e = this._getIndex(e)), -1 !== t.inArray(e, i))) return;
            i = t.isArray(i) ? t.merge([e], i).sort() : [e];
          }
          this._setOptionDisabled(i);
        }
      },
      load: function (e, i) {
        e = this._getIndex(e);
        var s = this,
          n = this.tabs.eq(e),
          o = n.find(".ui-tabs-anchor"),
          a = this._getPanelForTab(n),
          r = { tab: n, panel: a },
          h = function (t, e) {
            "abort" === e && s.panels.stop(!1, !0),
              s._removeClass(n, "ui-tabs-loading"),
              a.removeAttr("aria-busy"),
              t === s.xhr && delete s.xhr;
          };
        this._isLocal(o[0]) ||
          ((this.xhr = t.ajax(this._ajaxSettings(o, i, r))),
          this.xhr &&
            "canceled" !== this.xhr.statusText &&
            (this._addClass(n, "ui-tabs-loading"),
            a.attr("aria-busy", "true"),
            this.xhr
              .done(function (t, e, n) {
                setTimeout(function () {
                  a.html(t), s._trigger("load", i, r), h(n, e);
                }, 1);
              })
              .fail(function (t, e) {
                setTimeout(function () {
                  h(t, e);
                }, 1);
              })));
      },
      _ajaxSettings: function (e, i, s) {
        var n = this;
        return {
          url: e.attr("href").replace(/#.*$/, ""),
          beforeSend: function (e, o) {
            return n._trigger(
              "beforeLoad",
              i,
              t.extend({ jqXHR: e, ajaxSettings: o }, s)
            );
          },
        };
      },
      _getPanelForTab: function (e) {
        var i = t(e).attr("aria-controls");
        return this.element.find(this._sanitizeSelector("#" + i));
      },
    }),
    t.uiBackCompat !== !1 &&
      t.widget("ui.tabs", t.ui.tabs, {
        _processTabs: function () {
          this._superApply(arguments), this._addClass(this.tabs, "ui-tab");
        },
      }),
    t.ui.tabs,
    t.widget("ui.tooltip", {
      version: "1.12.1",
      options: {
        classes: { "ui-tooltip": "ui-corner-all ui-widget-shadow" },
        content: function () {
          var e = t(this).attr("title") || "";
          return t("<a>").text(e).html();
        },
        hide: !0,
        items: "[title]:not([disabled])",
        position: {
          my: "left top+15",
          at: "left bottom",
          collision: "flipfit flip",
        },
        show: !0,
        track: !1,
        close: null,
        open: null,
      },
      _addDescribedBy: function (e, i) {
        var s = (e.attr("aria-describedby") || "").split(/\s+/);
        s.push(i),
          e
            .data("ui-tooltip-id", i)
            .attr("aria-describedby", t.trim(s.join(" ")));
      },
      _removeDescribedBy: function (e) {
        var i = e.data("ui-tooltip-id"),
          s = (e.attr("aria-describedby") || "").split(/\s+/),
          n = t.inArray(i, s);
        -1 !== n && s.splice(n, 1),
          e.removeData("ui-tooltip-id"),
          (s = t.trim(s.join(" "))),
          s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby");
      },
      _create: function () {
        this._on({ mouseover: "open", focusin: "open" }),
          (this.tooltips = {}),
          (this.parents = {}),
          (this.liveRegion = t("<div>")
            .attr({
              role: "log",
              "aria-live": "assertive",
              "aria-relevant": "additions",
            })
            .appendTo(this.document[0].body)),
          this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
          (this.disabledTitles = t([]));
      },
      _setOption: function (e, i) {
        var s = this;
        this._super(e, i),
          "content" === e &&
            t.each(this.tooltips, function (t, e) {
              s._updateContent(e.element);
            });
      },
      _setOptionDisabled: function (t) {
        this[t ? "_disable" : "_enable"]();
      },
      _disable: function () {
        var e = this;
        t.each(this.tooltips, function (i, s) {
          var n = t.Event("blur");
          (n.target = n.currentTarget = s.element[0]), e.close(n, !0);
        }),
          (this.disabledTitles = this.disabledTitles.add(
            this.element
              .find(this.options.items)
              .addBack()
              .filter(function () {
                var e = t(this);
                return e.is("[title]")
                  ? e
                      .data("ui-tooltip-title", e.attr("title"))
                      .removeAttr("title")
                  : void 0;
              })
          ));
      },
      _enable: function () {
        this.disabledTitles.each(function () {
          var e = t(this);
          e.data("ui-tooltip-title") &&
            e.attr("title", e.data("ui-tooltip-title"));
        }),
          (this.disabledTitles = t([]));
      },
      open: function (e) {
        var i = this,
          s = t(e ? e.target : this.element).closest(this.options.items);
        s.length &&
          !s.data("ui-tooltip-id") &&
          (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")),
          s.data("ui-tooltip-open", !0),
          e &&
            "mouseover" === e.type &&
            s.parents().each(function () {
              var e,
                s = t(this);
              s.data("ui-tooltip-open") &&
                ((e = t.Event("blur")),
                (e.target = e.currentTarget = this),
                i.close(e, !0)),
                s.attr("title") &&
                  (s.uniqueId(),
                  (i.parents[this.id] = {
                    element: this,
                    title: s.attr("title"),
                  }),
                  s.attr("title", ""));
            }),
          this._registerCloseHandlers(e, s),
          this._updateContent(s, e));
      },
      _updateContent: function (t, e) {
        var i,
          s = this.options.content,
          n = this,
          o = e ? e.type : null;
        return "string" == typeof s || s.nodeType || s.jquery
          ? this._open(e, t, s)
          : ((i = s.call(t[0], function (i) {
              n._delay(function () {
                t.data("ui-tooltip-open") &&
                  (e && (e.type = o), this._open(e, t, i));
              });
            })),
            i && this._open(e, t, i),
            void 0);
      },
      _open: function (e, i, s) {
        function n(t) {
          (l.of = t), a.is(":hidden") || a.position(l);
        }
        var o,
          a,
          r,
          h,
          l = t.extend({}, this.options.position);
        if (s) {
          if ((o = this._find(i)))
            return o.tooltip.find(".ui-tooltip-content").html(s), void 0;
          i.is("[title]") &&
            (e && "mouseover" === e.type
              ? i.attr("title", "")
              : i.removeAttr("title")),
            (o = this._tooltip(i)),
            (a = o.tooltip),
            this._addDescribedBy(i, a.attr("id")),
            a.find(".ui-tooltip-content").html(s),
            this.liveRegion.children().hide(),
            (h = t("<div>").html(a.find(".ui-tooltip-content").html())),
            h.removeAttr("name").find("[name]").removeAttr("name"),
            h.removeAttr("id").find("[id]").removeAttr("id"),
            h.appendTo(this.liveRegion),
            this.options.track && e && /^mouse/.test(e.type)
              ? (this._on(this.document, { mousemove: n }), n(e))
              : a.position(t.extend({ of: i }, this.options.position)),
            a.hide(),
            this._show(a, this.options.show),
            this.options.track &&
              this.options.show &&
              this.options.show.delay &&
              (r = this.delayedShow =
                setInterval(function () {
                  a.is(":visible") && (n(l.of), clearInterval(r));
                }, t.fx.interval)),
            this._trigger("open", e, { tooltip: a });
        }
      },
      _registerCloseHandlers: function (e, i) {
        var s = {
          keyup: function (e) {
            if (e.keyCode === t.ui.keyCode.ESCAPE) {
              var s = t.Event(e);
              (s.currentTarget = i[0]), this.close(s, !0);
            }
          },
        };
        i[0] !== this.element[0] &&
          (s.remove = function () {
            this._removeTooltip(this._find(i).tooltip);
          }),
          (e && "mouseover" !== e.type) || (s.mouseleave = "close"),
          (e && "focusin" !== e.type) || (s.focusout = "close"),
          this._on(!0, i, s);
      },
      close: function (e) {
        var i,
          s = this,
          n = t(e ? e.currentTarget : this.element),
          o = this._find(n);
        return o
          ? ((i = o.tooltip),
            o.closing ||
              (clearInterval(this.delayedShow),
              n.data("ui-tooltip-title") &&
                !n.attr("title") &&
                n.attr("title", n.data("ui-tooltip-title")),
              this._removeDescribedBy(n),
              (o.hiding = !0),
              i.stop(!0),
              this._hide(i, this.options.hide, function () {
                s._removeTooltip(t(this));
              }),
              n.removeData("ui-tooltip-open"),
              this._off(n, "mouseleave focusout keyup"),
              n[0] !== this.element[0] && this._off(n, "remove"),
              this._off(this.document, "mousemove"),
              e &&
                "mouseleave" === e.type &&
                t.each(this.parents, function (e, i) {
                  t(i.element).attr("title", i.title), delete s.parents[e];
                }),
              (o.closing = !0),
              this._trigger("close", e, { tooltip: i }),
              o.hiding || (o.closing = !1)),
            void 0)
          : (n.removeData("ui-tooltip-open"), void 0);
      },
      _tooltip: function (e) {
        var i = t("<div>").attr("role", "tooltip"),
          s = t("<div>").appendTo(i),
          n = i.uniqueId().attr("id");
        return (
          this._addClass(s, "ui-tooltip-content"),
          this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"),
          i.appendTo(this._appendTo(e)),
          (this.tooltips[n] = { element: e, tooltip: i })
        );
      },
      _find: function (t) {
        var e = t.data("ui-tooltip-id");
        return e ? this.tooltips[e] : null;
      },
      _removeTooltip: function (t) {
        t.remove(), delete this.tooltips[t.attr("id")];
      },
      _appendTo: function (t) {
        var e = t.closest(".ui-front, dialog");
        return e.length || (e = this.document[0].body), e;
      },
      _destroy: function () {
        var e = this;
        t.each(this.tooltips, function (i, s) {
          var n = t.Event("blur"),
            o = s.element;
          (n.target = n.currentTarget = o[0]),
            e.close(n, !0),
            t("#" + i).remove(),
            o.data("ui-tooltip-title") &&
              (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")),
              o.removeData("ui-tooltip-title"));
        }),
          this.liveRegion.remove();
      },
    }),
    t.uiBackCompat !== !1 &&
      t.widget("ui.tooltip", t.ui.tooltip, {
        options: { tooltipClass: null },
        _tooltip: function () {
          var t = this._superApply(arguments);
          return (
            this.options.tooltipClass &&
              t.tooltip.addClass(this.options.tooltipClass),
            t
          );
        },
      }),
    t.ui.tooltip;
});
/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery)
  throw new Error("Bootstrap's JavaScript requires jQuery");
!(function (t) {
  "use strict";
  var e = jQuery.fn.jquery.split(" ")[0].split(".");
  if (
    (e[0] < 2 && e[1] < 9) ||
    (1 == e[0] && 9 == e[1] && e[2] < 1) ||
    3 < e[0]
  )
    throw new Error(
      "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4"
    );
})(),
  (function (n) {
    "use strict";
    (n.fn.emulateTransitionEnd = function (t) {
      var e = !1,
        i = this;
      n(this).one("bsTransitionEnd", function () {
        e = !0;
      });
      return (
        setTimeout(function () {
          e || n(i).trigger(n.support.transition.end);
        }, t),
        this
      );
    }),
      n(function () {
        (n.support.transition = (function o() {
          var t = document.createElement("bootstrap"),
            e = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd otransitionend",
              transition: "transitionend",
            };
          for (var i in e) if (t.style[i] !== undefined) return { end: e[i] };
          return !1;
        })()),
          n.support.transition &&
            (n.event.special.bsTransitionEnd = {
              bindType: n.support.transition.end,
              delegateType: n.support.transition.end,
              handle: function (t) {
                if (n(t.target).is(this))
                  return t.handleObj.handler.apply(this, arguments);
              },
            });
      });
  })(jQuery),
  (function (s) {
    "use strict";
    var e = '[data-dismiss="alert"]',
      a = function (t) {
        s(t).on("click", e, this.close);
      };
    (a.VERSION = "3.4.1"),
      (a.TRANSITION_DURATION = 150),
      (a.prototype.close = function (t) {
        var e = s(this),
          i = e.attr("data-target");
        i || (i = (i = e.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, "")),
          (i = "#" === i ? [] : i);
        var o = s(document).find(i);
        function n() {
          o.detach().trigger("closed.bs.alert").remove();
        }
        t && t.preventDefault(),
          o.length || (o = e.closest(".alert")),
          o.trigger((t = s.Event("close.bs.alert"))),
          t.isDefaultPrevented() ||
            (o.removeClass("in"),
            s.support.transition && o.hasClass("fade")
              ? o
                  .one("bsTransitionEnd", n)
                  .emulateTransitionEnd(a.TRANSITION_DURATION)
              : n());
      });
    var t = s.fn.alert;
    (s.fn.alert = function o(i) {
      return this.each(function () {
        var t = s(this),
          e = t.data("bs.alert");
        e || t.data("bs.alert", (e = new a(this))),
          "string" == typeof i && e[i].call(t);
      });
    }),
      (s.fn.alert.Constructor = a),
      (s.fn.alert.noConflict = function () {
        return (s.fn.alert = t), this;
      }),
      s(document).on("click.bs.alert.data-api", e, a.prototype.close);
  })(jQuery),
  (function (s) {
    "use strict";
    var n = function (t, e) {
      (this.$element = s(t)),
        (this.options = s.extend({}, n.DEFAULTS, e)),
        (this.isLoading = !1);
    };
    function i(o) {
      return this.each(function () {
        var t = s(this),
          e = t.data("bs.button"),
          i = "object" == typeof o && o;
        e || t.data("bs.button", (e = new n(this, i))),
          "toggle" == o ? e.toggle() : o && e.setState(o);
      });
    }
    (n.VERSION = "3.4.1"),
      (n.DEFAULTS = { loadingText: "loading..." }),
      (n.prototype.setState = function (t) {
        var e = "disabled",
          i = this.$element,
          o = i.is("input") ? "val" : "html",
          n = i.data();
        (t += "Text"),
          null == n.resetText && i.data("resetText", i[o]()),
          setTimeout(
            s.proxy(function () {
              i[o](null == n[t] ? this.options[t] : n[t]),
                "loadingText" == t
                  ? ((this.isLoading = !0),
                    i.addClass(e).attr(e, e).prop(e, !0))
                  : this.isLoading &&
                    ((this.isLoading = !1),
                    i.removeClass(e).removeAttr(e).prop(e, !1));
            }, this),
            0
          );
      }),
      (n.prototype.toggle = function () {
        var t = !0,
          e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
          var i = this.$element.find("input");
          "radio" == i.prop("type")
            ? (i.prop("checked") && (t = !1),
              e.find(".active").removeClass("active"),
              this.$element.addClass("active"))
            : "checkbox" == i.prop("type") &&
              (i.prop("checked") !== this.$element.hasClass("active") &&
                (t = !1),
              this.$element.toggleClass("active")),
            i.prop("checked", this.$element.hasClass("active")),
            t && i.trigger("change");
        } else
          this.$element.attr("aria-pressed", !this.$element.hasClass("active")),
            this.$element.toggleClass("active");
      });
    var t = s.fn.button;
    (s.fn.button = i),
      (s.fn.button.Constructor = n),
      (s.fn.button.noConflict = function () {
        return (s.fn.button = t), this;
      }),
      s(document)
        .on(
          "click.bs.button.data-api",
          '[data-toggle^="button"]',
          function (t) {
            var e = s(t.target).closest(".btn");
            i.call(e, "toggle"),
              s(t.target).is('input[type="radio"], input[type="checkbox"]') ||
                (t.preventDefault(),
                e.is("input,button")
                  ? e.trigger("focus")
                  : e
                      .find("input:visible,button:visible")
                      .first()
                      .trigger("focus"));
          }
        )
        .on(
          "focus.bs.button.data-api blur.bs.button.data-api",
          '[data-toggle^="button"]',
          function (t) {
            s(t.target)
              .closest(".btn")
              .toggleClass("focus", /^focus(in)?$/.test(t.type));
          }
        );
  })(jQuery),
  (function (p) {
    "use strict";
    var c = function (t, e) {
      (this.$element = p(t)),
        (this.$indicators = this.$element.find(".carousel-indicators")),
        (this.options = e),
        (this.paused = null),
        (this.sliding = null),
        (this.interval = null),
        (this.$active = null),
        (this.$items = null),
        this.options.keyboard &&
          this.$element.on("keydown.bs.carousel", p.proxy(this.keydown, this)),
        "hover" == this.options.pause &&
          !("ontouchstart" in document.documentElement) &&
          this.$element
            .on("mouseenter.bs.carousel", p.proxy(this.pause, this))
            .on("mouseleave.bs.carousel", p.proxy(this.cycle, this));
    };
    function r(n) {
      return this.each(function () {
        var t = p(this),
          e = t.data("bs.carousel"),
          i = p.extend({}, c.DEFAULTS, t.data(), "object" == typeof n && n),
          o = "string" == typeof n ? n : i.slide;
        e || t.data("bs.carousel", (e = new c(this, i))),
          "number" == typeof n
            ? e.to(n)
            : o
            ? e[o]()
            : i.interval && e.pause().cycle();
      });
    }
    (c.VERSION = "3.4.1"),
      (c.TRANSITION_DURATION = 600),
      (c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }),
      (c.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
          switch (t.which) {
            case 37:
              this.prev();
              break;
            case 39:
              this.next();
              break;
            default:
              return;
          }
          t.preventDefault();
        }
      }),
      (c.prototype.cycle = function (t) {
        return (
          t || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              p.proxy(this.next, this),
              this.options.interval
            )),
          this
        );
      }),
      (c.prototype.getItemIndex = function (t) {
        return (
          (this.$items = t.parent().children(".item")),
          this.$items.index(t || this.$active)
        );
      }),
      (c.prototype.getItemForDirection = function (t, e) {
        var i = this.getItemIndex(e);
        if (
          (("prev" == t && 0 === i) ||
            ("next" == t && i == this.$items.length - 1)) &&
          !this.options.wrap
        )
          return e;
        var o = (i + ("prev" == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(o);
      }),
      (c.prototype.to = function (t) {
        var e = this,
          i = this.getItemIndex(
            (this.$active = this.$element.find(".item.active"))
          );
        if (!(t > this.$items.length - 1 || t < 0))
          return this.sliding
            ? this.$element.one("slid.bs.carousel", function () {
                e.to(t);
              })
            : i == t
            ? this.pause().cycle()
            : this.slide(i < t ? "next" : "prev", this.$items.eq(t));
      }),
      (c.prototype.pause = function (t) {
        return (
          t || (this.paused = !0),
          this.$element.find(".next, .prev").length &&
            p.support.transition &&
            (this.$element.trigger(p.support.transition.end), this.cycle(!0)),
          (this.interval = clearInterval(this.interval)),
          this
        );
      }),
      (c.prototype.next = function () {
        if (!this.sliding) return this.slide("next");
      }),
      (c.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev");
      }),
      (c.prototype.slide = function (t, e) {
        var i = this.$element.find(".item.active"),
          o = e || this.getItemForDirection(t, i),
          n = this.interval,
          s = "next" == t ? "left" : "right",
          a = this;
        if (o.hasClass("active")) return (this.sliding = !1);
        var r = o[0],
          l = p.Event("slide.bs.carousel", { relatedTarget: r, direction: s });
        if ((this.$element.trigger(l), !l.isDefaultPrevented())) {
          if (
            ((this.sliding = !0), n && this.pause(), this.$indicators.length)
          ) {
            this.$indicators.find(".active").removeClass("active");
            var h = p(this.$indicators.children()[this.getItemIndex(o)]);
            h && h.addClass("active");
          }
          var d = p.Event("slid.bs.carousel", {
            relatedTarget: r,
            direction: s,
          });
          return (
            p.support.transition && this.$element.hasClass("slide")
              ? (o.addClass(t),
                "object" == typeof o && o.length && o[0].offsetWidth,
                i.addClass(s),
                o.addClass(s),
                i
                  .one("bsTransitionEnd", function () {
                    o.removeClass([t, s].join(" ")).addClass("active"),
                      i.removeClass(["active", s].join(" ")),
                      (a.sliding = !1),
                      setTimeout(function () {
                        a.$element.trigger(d);
                      }, 0);
                  })
                  .emulateTransitionEnd(c.TRANSITION_DURATION))
              : (i.removeClass("active"),
                o.addClass("active"),
                (this.sliding = !1),
                this.$element.trigger(d)),
            n && this.cycle(),
            this
          );
        }
      });
    var t = p.fn.carousel;
    (p.fn.carousel = r),
      (p.fn.carousel.Constructor = c),
      (p.fn.carousel.noConflict = function () {
        return (p.fn.carousel = t), this;
      });
    var e = function (t) {
      var e = p(this),
        i = e.attr("href");
      i && (i = i.replace(/.*(?=#[^\s]+$)/, ""));
      var o = e.attr("data-target") || i,
        n = p(document).find(o);
      if (n.hasClass("carousel")) {
        var s = p.extend({}, n.data(), e.data()),
          a = e.attr("data-slide-to");
        a && (s.interval = !1),
          r.call(n, s),
          a && n.data("bs.carousel").to(a),
          t.preventDefault();
      }
    };
    p(document)
      .on("click.bs.carousel.data-api", "[data-slide]", e)
      .on("click.bs.carousel.data-api", "[data-slide-to]", e),
      p(window).on("load", function () {
        p('[data-ride="carousel"]').each(function () {
          var t = p(this);
          r.call(t, t.data());
        });
      });
  })(jQuery),
  (function (a) {
    "use strict";
    var r = function (t, e) {
      (this.$element = a(t)),
        (this.options = a.extend({}, r.DEFAULTS, e)),
        (this.$trigger = a(
          '[data-toggle="collapse"][href="#' +
            t.id +
            '"],[data-toggle="collapse"][data-target="#' +
            t.id +
            '"]'
        )),
        (this.transitioning = null),
        this.options.parent
          ? (this.$parent = this.getParent())
          : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle();
    };
    function n(t) {
      var e,
        i =
          t.attr("data-target") ||
          ((e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""));
      return a(document).find(i);
    }
    function l(o) {
      return this.each(function () {
        var t = a(this),
          e = t.data("bs.collapse"),
          i = a.extend({}, r.DEFAULTS, t.data(), "object" == typeof o && o);
        !e && i.toggle && /show|hide/.test(o) && (i.toggle = !1),
          e || t.data("bs.collapse", (e = new r(this, i))),
          "string" == typeof o && e[o]();
      });
    }
    (r.VERSION = "3.4.1"),
      (r.TRANSITION_DURATION = 350),
      (r.DEFAULTS = { toggle: !0 }),
      (r.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height";
      }),
      (r.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var t,
            e =
              this.$parent &&
              this.$parent.children(".panel").children(".in, .collapsing");
          if (
            !(e && e.length && (t = e.data("bs.collapse")) && t.transitioning)
          ) {
            var i = a.Event("show.bs.collapse");
            if ((this.$element.trigger(i), !i.isDefaultPrevented())) {
              e &&
                e.length &&
                (l.call(e, "hide"), t || e.data("bs.collapse", null));
              var o = this.dimension();
              this.$element
                .removeClass("collapse")
                .addClass("collapsing")
                [o](0)
                .attr("aria-expanded", !0),
                this.$trigger
                  .removeClass("collapsed")
                  .attr("aria-expanded", !0),
                (this.transitioning = 1);
              var n = function () {
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse in")
                  [o](""),
                  (this.transitioning = 0),
                  this.$element.trigger("shown.bs.collapse");
              };
              if (!a.support.transition) return n.call(this);
              var s = a.camelCase(["scroll", o].join("-"));
              this.$element
                .one("bsTransitionEnd", a.proxy(n, this))
                .emulateTransitionEnd(r.TRANSITION_DURATION)
                [o](this.$element[0][s]);
            }
          }
        }
      }),
      (r.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var t = a.Event("hide.bs.collapse");
          if ((this.$element.trigger(t), !t.isDefaultPrevented())) {
            var e = this.dimension();
            this.$element[e](this.$element[e]())[0].offsetHeight,
              this.$element
                .addClass("collapsing")
                .removeClass("collapse in")
                .attr("aria-expanded", !1),
              this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
              (this.transitioning = 1);
            var i = function () {
              (this.transitioning = 0),
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse")
                  .trigger("hidden.bs.collapse");
            };
            if (!a.support.transition) return i.call(this);
            this.$element[e](0)
              .one("bsTransitionEnd", a.proxy(i, this))
              .emulateTransitionEnd(r.TRANSITION_DURATION);
          }
        }
      }),
      (r.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      }),
      (r.prototype.getParent = function () {
        return a(document)
          .find(this.options.parent)
          .find(
            '[data-toggle="collapse"][data-parent="' +
              this.options.parent +
              '"]'
          )
          .each(
            a.proxy(function (t, e) {
              var i = a(e);
              this.addAriaAndCollapsedClass(n(i), i);
            }, this)
          )
          .end();
      }),
      (r.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i),
          e.toggleClass("collapsed", !i).attr("aria-expanded", i);
      });
    var t = a.fn.collapse;
    (a.fn.collapse = l),
      (a.fn.collapse.Constructor = r),
      (a.fn.collapse.noConflict = function () {
        return (a.fn.collapse = t), this;
      }),
      a(document).on(
        "click.bs.collapse.data-api",
        '[data-toggle="collapse"]',
        function (t) {
          var e = a(this);
          e.attr("data-target") || t.preventDefault();
          var i = n(e),
            o = i.data("bs.collapse") ? "toggle" : e.data();
          l.call(i, o);
        }
      );
  })(jQuery),
  (function (a) {
    "use strict";
    var r = '[data-toggle="dropdown"]',
      o = function (t) {
        a(t).on("click.bs.dropdown", this.toggle);
      };
    function l(t) {
      var e = t.attr("data-target");
      e ||
        (e =
          (e = t.attr("href")) &&
          /#[A-Za-z]/.test(e) &&
          e.replace(/.*(?=#[^\s]*$)/, ""));
      var i = "#" !== e ? a(document).find(e) : null;
      return i && i.length ? i : t.parent();
    }
    function s(o) {
      (o && 3 === o.which) ||
        (a(".dropdown-backdrop").remove(),
        a(r).each(function () {
          var t = a(this),
            e = l(t),
            i = { relatedTarget: this };
          e.hasClass("open") &&
            ((o &&
              "click" == o.type &&
              /input|textarea/i.test(o.target.tagName) &&
              a.contains(e[0], o.target)) ||
              (e.trigger((o = a.Event("hide.bs.dropdown", i))),
              o.isDefaultPrevented() ||
                (t.attr("aria-expanded", "false"),
                e
                  .removeClass("open")
                  .trigger(a.Event("hidden.bs.dropdown", i)))));
        }));
    }
    (o.VERSION = "3.4.1"),
      (o.prototype.toggle = function (t) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
          var i = l(e),
            o = i.hasClass("open");
          if ((s(), !o)) {
            "ontouchstart" in document.documentElement &&
              !i.closest(".navbar-nav").length &&
              a(document.createElement("div"))
                .addClass("dropdown-backdrop")
                .insertAfter(a(this))
                .on("click", s);
            var n = { relatedTarget: this };
            if (
              (i.trigger((t = a.Event("show.bs.dropdown", n))),
              t.isDefaultPrevented())
            )
              return;
            e.trigger("focus").attr("aria-expanded", "true"),
              i.toggleClass("open").trigger(a.Event("shown.bs.dropdown", n));
          }
          return !1;
        }
      }),
      (o.prototype.keydown = function (t) {
        if (
          /(38|40|27|32)/.test(t.which) &&
          !/input|textarea/i.test(t.target.tagName)
        ) {
          var e = a(this);
          if (
            (t.preventDefault(),
            t.stopPropagation(),
            !e.is(".disabled, :disabled"))
          ) {
            var i = l(e),
              o = i.hasClass("open");
            if ((!o && 27 != t.which) || (o && 27 == t.which))
              return (
                27 == t.which && i.find(r).trigger("focus"), e.trigger("click")
              );
            var n = i.find(".dropdown-menu li:not(.disabled):visible a");
            if (n.length) {
              var s = n.index(t.target);
              38 == t.which && 0 < s && s--,
                40 == t.which && s < n.length - 1 && s++,
                ~s || (s = 0),
                n.eq(s).trigger("focus");
            }
          }
        }
      });
    var t = a.fn.dropdown;
    (a.fn.dropdown = function e(i) {
      return this.each(function () {
        var t = a(this),
          e = t.data("bs.dropdown");
        e || t.data("bs.dropdown", (e = new o(this))),
          "string" == typeof i && e[i].call(t);
      });
    }),
      (a.fn.dropdown.Constructor = o),
      (a.fn.dropdown.noConflict = function () {
        return (a.fn.dropdown = t), this;
      }),
      a(document)
        .on("click.bs.dropdown.data-api", s)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
          t.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", r, o.prototype.toggle)
        .on("keydown.bs.dropdown.data-api", r, o.prototype.keydown)
        .on(
          "keydown.bs.dropdown.data-api",
          ".dropdown-menu",
          o.prototype.keydown
        );
  })(jQuery),
  (function (a) {
    "use strict";
    var s = function (t, e) {
      (this.options = e),
        (this.$body = a(document.body)),
        (this.$element = a(t)),
        (this.$dialog = this.$element.find(".modal-dialog")),
        (this.$backdrop = null),
        (this.isShown = null),
        (this.originalBodyPad = null),
        (this.scrollbarWidth = 0),
        (this.ignoreBackdropClick = !1),
        (this.fixedContent = ".navbar-fixed-top, .navbar-fixed-bottom"),
        this.options.remote &&
          this.$element.find(".modal-content").load(
            this.options.remote,
            a.proxy(function () {
              this.$element.trigger("loaded.bs.modal");
            }, this)
          );
    };
    function r(o, n) {
      return this.each(function () {
        var t = a(this),
          e = t.data("bs.modal"),
          i = a.extend({}, s.DEFAULTS, t.data(), "object" == typeof o && o);
        e || t.data("bs.modal", (e = new s(this, i))),
          "string" == typeof o ? e[o](n) : i.show && e.show(n);
      });
    }
    (s.VERSION = "3.4.1"),
      (s.TRANSITION_DURATION = 300),
      (s.BACKDROP_TRANSITION_DURATION = 150),
      (s.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
      (s.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t);
      }),
      (s.prototype.show = function (i) {
        var o = this,
          t = a.Event("show.bs.modal", { relatedTarget: i });
        this.$element.trigger(t),
          this.isShown ||
            t.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.checkScrollbar(),
            this.setScrollbar(),
            this.$body.addClass("modal-open"),
            this.escape(),
            this.resize(),
            this.$element.on(
              "click.dismiss.bs.modal",
              '[data-dismiss="modal"]',
              a.proxy(this.hide, this)
            ),
            this.$dialog.on("mousedown.dismiss.bs.modal", function () {
              o.$element.one("mouseup.dismiss.bs.modal", function (t) {
                a(t.target).is(o.$element) && (o.ignoreBackdropClick = !0);
              });
            }),
            this.backdrop(function () {
              var t = a.support.transition && o.$element.hasClass("fade");
              o.$element.parent().length || o.$element.appendTo(o.$body),
                o.$element.show().scrollTop(0),
                o.adjustDialog(),
                t && o.$element[0].offsetWidth,
                o.$element.addClass("in"),
                o.enforceFocus();
              var e = a.Event("shown.bs.modal", { relatedTarget: i });
              t
                ? o.$dialog
                    .one("bsTransitionEnd", function () {
                      o.$element.trigger("focus").trigger(e);
                    })
                    .emulateTransitionEnd(s.TRANSITION_DURATION)
                : o.$element.trigger("focus").trigger(e);
            }));
      }),
      (s.prototype.hide = function (t) {
        t && t.preventDefault(),
          (t = a.Event("hide.bs.modal")),
          this.$element.trigger(t),
          this.isShown &&
            !t.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            this.resize(),
            a(document).off("focusin.bs.modal"),
            this.$element
              .removeClass("in")
              .off("click.dismiss.bs.modal")
              .off("mouseup.dismiss.bs.modal"),
            this.$dialog.off("mousedown.dismiss.bs.modal"),
            a.support.transition && this.$element.hasClass("fade")
              ? this.$element
                  .one("bsTransitionEnd", a.proxy(this.hideModal, this))
                  .emulateTransitionEnd(s.TRANSITION_DURATION)
              : this.hideModal());
      }),
      (s.prototype.enforceFocus = function () {
        a(document)
          .off("focusin.bs.modal")
          .on(
            "focusin.bs.modal",
            a.proxy(function (t) {
              document === t.target ||
                this.$element[0] === t.target ||
                this.$element.has(t.target).length ||
                this.$element.trigger("focus");
            }, this)
          );
      }),
      (s.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              "keydown.dismiss.bs.modal",
              a.proxy(function (t) {
                27 == t.which && this.hide();
              }, this)
            )
          : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
      }),
      (s.prototype.resize = function () {
        this.isShown
          ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this))
          : a(window).off("resize.bs.modal");
      }),
      (s.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(),
          this.backdrop(function () {
            t.$body.removeClass("modal-open"),
              t.resetAdjustments(),
              t.resetScrollbar(),
              t.$element.trigger("hidden.bs.modal");
          });
      }),
      (s.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      }),
      (s.prototype.backdrop = function (t) {
        var e = this,
          i = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
          var o = a.support.transition && i;
          if (
            ((this.$backdrop = a(document.createElement("div"))
              .addClass("modal-backdrop " + i)
              .appendTo(this.$body)),
            this.$element.on(
              "click.dismiss.bs.modal",
              a.proxy(function (t) {
                this.ignoreBackdropClick
                  ? (this.ignoreBackdropClick = !1)
                  : t.target === t.currentTarget &&
                    ("static" == this.options.backdrop
                      ? this.$element[0].focus()
                      : this.hide());
              }, this)
            ),
            o && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !t)
          )
            return;
          o
            ? this.$backdrop
                .one("bsTransitionEnd", t)
                .emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION)
            : t();
        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass("in");
          var n = function () {
            e.removeBackdrop(), t && t();
          };
          a.support.transition && this.$element.hasClass("fade")
            ? this.$backdrop
                .one("bsTransitionEnd", n)
                .emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION)
            : n();
        } else t && t();
      }),
      (s.prototype.handleUpdate = function () {
        this.adjustDialog();
      }),
      (s.prototype.adjustDialog = function () {
        var t =
          this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
          paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
          paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : "",
        });
      }),
      (s.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: "", paddingRight: "" });
      }),
      (s.prototype.checkScrollbar = function () {
        var t = window.innerWidth;
        if (!t) {
          var e = document.documentElement.getBoundingClientRect();
          t = e.right - Math.abs(e.left);
        }
        (this.bodyIsOverflowing = document.body.clientWidth < t),
          (this.scrollbarWidth = this.measureScrollbar());
      }),
      (s.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        var n = this.scrollbarWidth;
        this.bodyIsOverflowing &&
          (this.$body.css("padding-right", t + n),
          a(this.fixedContent).each(function (t, e) {
            var i = e.style.paddingRight,
              o = a(e).css("padding-right");
            a(e)
              .data("padding-right", i)
              .css("padding-right", parseFloat(o) + n + "px");
          }));
      }),
      (s.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad),
          a(this.fixedContent).each(function (t, e) {
            var i = a(e).data("padding-right");
            a(e).removeData("padding-right"), (e.style.paddingRight = i || "");
          });
      }),
      (s.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        (t.className = "modal-scrollbar-measure"), this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e;
      });
    var t = a.fn.modal;
    (a.fn.modal = r),
      (a.fn.modal.Constructor = s),
      (a.fn.modal.noConflict = function () {
        return (a.fn.modal = t), this;
      }),
      a(document).on(
        "click.bs.modal.data-api",
        '[data-toggle="modal"]',
        function (t) {
          var e = a(this),
            i = e.attr("href"),
            o = e.attr("data-target") || (i && i.replace(/.*(?=#[^\s]+$)/, "")),
            n = a(document).find(o),
            s = n.data("bs.modal")
              ? "toggle"
              : a.extend({ remote: !/#/.test(i) && i }, n.data(), e.data());
          e.is("a") && t.preventDefault(),
            n.one("show.bs.modal", function (t) {
              t.isDefaultPrevented() ||
                n.one("hidden.bs.modal", function () {
                  e.is(":visible") && e.trigger("focus");
                });
            }),
            r.call(n, s, this);
        }
      );
  })(jQuery),
  (function (g) {
    "use strict";
    var o = ["sanitize", "whiteList", "sanitizeFn"],
      a = [
        "background",
        "cite",
        "href",
        "itemtype",
        "longdesc",
        "poster",
        "src",
        "xlink:href",
      ],
      t = {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      r = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
      l =
        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    function u(t, e) {
      var i = t.nodeName.toLowerCase();
      if (-1 !== g.inArray(i, e))
        return (
          -1 === g.inArray(i, a) ||
          Boolean(t.nodeValue.match(r) || t.nodeValue.match(l))
        );
      for (
        var o = g(e).filter(function (t, e) {
            return e instanceof RegExp;
          }),
          n = 0,
          s = o.length;
        n < s;
        n++
      )
        if (i.match(o[n])) return !0;
      return !1;
    }
    function n(t, e, i) {
      if (0 === t.length) return t;
      if (i && "function" == typeof i) return i(t);
      if (
        !document.implementation ||
        !document.implementation.createHTMLDocument
      )
        return t;
      var o = document.implementation.createHTMLDocument("sanitization");
      o.body.innerHTML = t;
      for (
        var n = g.map(e, function (t, e) {
            return e;
          }),
          s = g(o.body).find("*"),
          a = 0,
          r = s.length;
        a < r;
        a++
      ) {
        var l = s[a],
          h = l.nodeName.toLowerCase();
        if (-1 !== g.inArray(h, n))
          for (
            var d = g.map(l.attributes, function (t) {
                return t;
              }),
              p = [].concat(e["*"] || [], e[h] || []),
              c = 0,
              f = d.length;
            c < f;
            c++
          )
            u(d[c], p) || l.removeAttribute(d[c].nodeName);
        else l.parentNode.removeChild(l);
      }
      return o.body.innerHTML;
    }
    var m = function (t, e) {
      (this.type = null),
        (this.options = null),
        (this.enabled = null),
        (this.timeout = null),
        (this.hoverState = null),
        (this.$element = null),
        (this.inState = null),
        this.init("tooltip", t, e);
    };
    (m.VERSION = "3.4.1"),
      (m.TRANSITION_DURATION = 150),
      (m.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: "body", padding: 0 },
        sanitize: !0,
        sanitizeFn: null,
        whiteList: t,
      }),
      (m.prototype.init = function (t, e, i) {
        if (
          ((this.enabled = !0),
          (this.type = t),
          (this.$element = g(e)),
          (this.options = this.getOptions(i)),
          (this.$viewport =
            this.options.viewport &&
            g(document).find(
              g.isFunction(this.options.viewport)
                ? this.options.viewport.call(this, this.$element)
                : this.options.viewport.selector || this.options.viewport
            )),
          (this.inState = { click: !1, hover: !1, focus: !1 }),
          this.$element[0] instanceof document.constructor &&
            !this.options.selector)
        )
          throw new Error(
            "`selector` option must be specified when initializing " +
              this.type +
              " on the window.document object!"
          );
        for (var o = this.options.trigger.split(" "), n = o.length; n--; ) {
          var s = o[n];
          if ("click" == s)
            this.$element.on(
              "click." + this.type,
              this.options.selector,
              g.proxy(this.toggle, this)
            );
          else if ("manual" != s) {
            var a = "hover" == s ? "mouseenter" : "focusin",
              r = "hover" == s ? "mouseleave" : "focusout";
            this.$element.on(
              a + "." + this.type,
              this.options.selector,
              g.proxy(this.enter, this)
            ),
              this.$element.on(
                r + "." + this.type,
                this.options.selector,
                g.proxy(this.leave, this)
              );
          }
        }
        this.options.selector
          ? (this._options = g.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      }),
      (m.prototype.getDefaults = function () {
        return m.DEFAULTS;
      }),
      (m.prototype.getOptions = function (t) {
        var e = this.$element.data();
        for (var i in e)
          e.hasOwnProperty(i) && -1 !== g.inArray(i, o) && delete e[i];
        return (
          (t = g.extend({}, this.getDefaults(), e, t)).delay &&
            "number" == typeof t.delay &&
            (t.delay = { show: t.delay, hide: t.delay }),
          t.sanitize && (t.template = n(t.template, t.whiteList, t.sanitizeFn)),
          t
        );
      }),
      (m.prototype.getDelegateOptions = function () {
        var i = {},
          o = this.getDefaults();
        return (
          this._options &&
            g.each(this._options, function (t, e) {
              o[t] != e && (i[t] = e);
            }),
          i
        );
      }),
      (m.prototype.enter = function (t) {
        var e =
          t instanceof this.constructor
            ? t
            : g(t.currentTarget).data("bs." + this.type);
        if (
          (e ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            g(t.currentTarget).data("bs." + this.type, e)),
          t instanceof g.Event &&
            (e.inState["focusin" == t.type ? "focus" : "hover"] = !0),
          e.tip().hasClass("in") || "in" == e.hoverState)
        )
          e.hoverState = "in";
        else {
          if (
            (clearTimeout(e.timeout),
            (e.hoverState = "in"),
            !e.options.delay || !e.options.delay.show)
          )
            return e.show();
          e.timeout = setTimeout(function () {
            "in" == e.hoverState && e.show();
          }, e.options.delay.show);
        }
      }),
      (m.prototype.isInStateTrue = function () {
        for (var t in this.inState) if (this.inState[t]) return !0;
        return !1;
      }),
      (m.prototype.leave = function (t) {
        var e =
          t instanceof this.constructor
            ? t
            : g(t.currentTarget).data("bs." + this.type);
        if (
          (e ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            g(t.currentTarget).data("bs." + this.type, e)),
          t instanceof g.Event &&
            (e.inState["focusout" == t.type ? "focus" : "hover"] = !1),
          !e.isInStateTrue())
        ) {
          if (
            (clearTimeout(e.timeout),
            (e.hoverState = "out"),
            !e.options.delay || !e.options.delay.hide)
          )
            return e.hide();
          e.timeout = setTimeout(function () {
            "out" == e.hoverState && e.hide();
          }, e.options.delay.hide);
        }
      }),
      (m.prototype.show = function () {
        var t = g.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(t);
          var e = g.contains(
            this.$element[0].ownerDocument.documentElement,
            this.$element[0]
          );
          if (t.isDefaultPrevented() || !e) return;
          var i = this,
            o = this.tip(),
            n = this.getUID(this.type);
          this.setContent(),
            o.attr("id", n),
            this.$element.attr("aria-describedby", n),
            this.options.animation && o.addClass("fade");
          var s =
              "function" == typeof this.options.placement
                ? this.options.placement.call(this, o[0], this.$element[0])
                : this.options.placement,
            a = /\s?auto?\s?/i,
            r = a.test(s);
          r && (s = s.replace(a, "") || "top"),
            o
              .detach()
              .css({ top: 0, left: 0, display: "block" })
              .addClass(s)
              .data("bs." + this.type, this),
            this.options.container
              ? o.appendTo(g(document).find(this.options.container))
              : o.insertAfter(this.$element),
            this.$element.trigger("inserted.bs." + this.type);
          var l = this.getPosition(),
            h = o[0].offsetWidth,
            d = o[0].offsetHeight;
          if (r) {
            var p = s,
              c = this.getPosition(this.$viewport);
            (s =
              "bottom" == s && l.bottom + d > c.bottom
                ? "top"
                : "top" == s && l.top - d < c.top
                ? "bottom"
                : "right" == s && l.right + h > c.width
                ? "left"
                : "left" == s && l.left - h < c.left
                ? "right"
                : s),
              o.removeClass(p).addClass(s);
          }
          var f = this.getCalculatedOffset(s, l, h, d);
          this.applyPlacement(f, s);
          var u = function () {
            var t = i.hoverState;
            i.$element.trigger("shown.bs." + i.type),
              (i.hoverState = null),
              "out" == t && i.leave(i);
          };
          g.support.transition && this.$tip.hasClass("fade")
            ? o
                .one("bsTransitionEnd", u)
                .emulateTransitionEnd(m.TRANSITION_DURATION)
            : u();
        }
      }),
      (m.prototype.applyPlacement = function (t, e) {
        var i = this.tip(),
          o = i[0].offsetWidth,
          n = i[0].offsetHeight,
          s = parseInt(i.css("margin-top"), 10),
          a = parseInt(i.css("margin-left"), 10);
        isNaN(s) && (s = 0),
          isNaN(a) && (a = 0),
          (t.top += s),
          (t.left += a),
          g.offset.setOffset(
            i[0],
            g.extend(
              {
                using: function (t) {
                  i.css({ top: Math.round(t.top), left: Math.round(t.left) });
                },
              },
              t
            ),
            0
          ),
          i.addClass("in");
        var r = i[0].offsetWidth,
          l = i[0].offsetHeight;
        "top" == e && l != n && (t.top = t.top + n - l);
        var h = this.getViewportAdjustedDelta(e, t, r, l);
        h.left ? (t.left += h.left) : (t.top += h.top);
        var d = /top|bottom/.test(e),
          p = d ? 2 * h.left - o + r : 2 * h.top - n + l,
          c = d ? "offsetWidth" : "offsetHeight";
        i.offset(t), this.replaceArrow(p, i[0][c], d);
      }),
      (m.prototype.replaceArrow = function (t, e, i) {
        this.arrow()
          .css(i ? "left" : "top", 50 * (1 - t / e) + "%")
          .css(i ? "top" : "left", "");
      }),
      (m.prototype.setContent = function () {
        var t = this.tip(),
          e = this.getTitle();
        this.options.html
          ? (this.options.sanitize &&
              (e = n(e, this.options.whiteList, this.options.sanitizeFn)),
            t.find(".tooltip-inner").html(e))
          : t.find(".tooltip-inner").text(e),
          t.removeClass("fade in top bottom left right");
      }),
      (m.prototype.hide = function (t) {
        var e = this,
          i = g(this.$tip),
          o = g.Event("hide.bs." + this.type);
        function n() {
          "in" != e.hoverState && i.detach(),
            e.$element &&
              e.$element
                .removeAttr("aria-describedby")
                .trigger("hidden.bs." + e.type),
            t && t();
        }
        if ((this.$element.trigger(o), !o.isDefaultPrevented()))
          return (
            i.removeClass("in"),
            g.support.transition && i.hasClass("fade")
              ? i
                  .one("bsTransitionEnd", n)
                  .emulateTransitionEnd(m.TRANSITION_DURATION)
              : n(),
            (this.hoverState = null),
            this
          );
      }),
      (m.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) &&
          t
            .attr("data-original-title", t.attr("title") || "")
            .attr("title", "");
      }),
      (m.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (m.prototype.getPosition = function (t) {
        var e = (t = t || this.$element)[0],
          i = "BODY" == e.tagName,
          o = e.getBoundingClientRect();
        null == o.width &&
          (o = g.extend({}, o, {
            width: o.right - o.left,
            height: o.bottom - o.top,
          }));
        var n = window.SVGElement && e instanceof window.SVGElement,
          s = i ? { top: 0, left: 0 } : n ? null : t.offset(),
          a = {
            scroll: i
              ? document.documentElement.scrollTop || document.body.scrollTop
              : t.scrollTop(),
          },
          r = i
            ? { width: g(window).width(), height: g(window).height() }
            : null;
        return g.extend({}, o, a, r, s);
      }),
      (m.prototype.getCalculatedOffset = function (t, e, i, o) {
        return "bottom" == t
          ? { top: e.top + e.height, left: e.left + e.width / 2 - i / 2 }
          : "top" == t
          ? { top: e.top - o, left: e.left + e.width / 2 - i / 2 }
          : "left" == t
          ? { top: e.top + e.height / 2 - o / 2, left: e.left - i }
          : { top: e.top + e.height / 2 - o / 2, left: e.left + e.width };
      }),
      (m.prototype.getViewportAdjustedDelta = function (t, e, i, o) {
        var n = { top: 0, left: 0 };
        if (!this.$viewport) return n;
        var s = (this.options.viewport && this.options.viewport.padding) || 0,
          a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
          var r = e.top - s - a.scroll,
            l = e.top + s - a.scroll + o;
          r < a.top
            ? (n.top = a.top - r)
            : l > a.top + a.height && (n.top = a.top + a.height - l);
        } else {
          var h = e.left - s,
            d = e.left + s + i;
          h < a.left
            ? (n.left = a.left - h)
            : d > a.right && (n.left = a.left + a.width - d);
        }
        return n;
      }),
      (m.prototype.getTitle = function () {
        var t = this.$element,
          e = this.options;
        return (
          t.attr("data-original-title") ||
          ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
        );
      }),
      (m.prototype.getUID = function (t) {
        for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
        return t;
      }),
      (m.prototype.tip = function () {
        if (
          !this.$tip &&
          ((this.$tip = g(this.options.template)), 1 != this.$tip.length)
        )
          throw new Error(
            this.type +
              " `template` option must consist of exactly 1 top-level element!"
          );
        return this.$tip;
      }),
      (m.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      }),
      (m.prototype.enable = function () {
        this.enabled = !0;
      }),
      (m.prototype.disable = function () {
        this.enabled = !1;
      }),
      (m.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (m.prototype.toggle = function (t) {
        var e = this;
        t &&
          ((e = g(t.currentTarget).data("bs." + this.type)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this.getDelegateOptions()
            )),
            g(t.currentTarget).data("bs." + this.type, e))),
          t
            ? ((e.inState.click = !e.inState.click),
              e.isInStateTrue() ? e.enter(e) : e.leave(e))
            : e.tip().hasClass("in")
            ? e.leave(e)
            : e.enter(e);
      }),
      (m.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout),
          this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type),
              t.$tip && t.$tip.detach(),
              (t.$tip = null),
              (t.$arrow = null),
              (t.$viewport = null),
              (t.$element = null);
          });
      }),
      (m.prototype.sanitizeHtml = function (t) {
        return n(t, this.options.whiteList, this.options.sanitizeFn);
      });
    var e = g.fn.tooltip;
    (g.fn.tooltip = function i(o) {
      return this.each(function () {
        var t = g(this),
          e = t.data("bs.tooltip"),
          i = "object" == typeof o && o;
        (!e && /destroy|hide/.test(o)) ||
          (e || t.data("bs.tooltip", (e = new m(this, i))),
          "string" == typeof o && e[o]());
      });
    }),
      (g.fn.tooltip.Constructor = m),
      (g.fn.tooltip.noConflict = function () {
        return (g.fn.tooltip = e), this;
      });
  })(jQuery),
  (function (n) {
    "use strict";
    var s = function (t, e) {
      this.init("popover", t, e);
    };
    if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
    (s.VERSION = "3.4.1"),
      (s.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      })),
      (((s.prototype = n.extend(
        {},
        n.fn.tooltip.Constructor.prototype
      )).constructor = s).prototype.getDefaults = function () {
        return s.DEFAULTS;
      }),
      (s.prototype.setContent = function () {
        var t = this.tip(),
          e = this.getTitle(),
          i = this.getContent();
        if (this.options.html) {
          var o = typeof i;
          this.options.sanitize &&
            ((e = this.sanitizeHtml(e)),
            "string" === o && (i = this.sanitizeHtml(i))),
            t.find(".popover-title").html(e),
            t
              .find(".popover-content")
              .children()
              .detach()
              .end()
              ["string" === o ? "html" : "append"](i);
        } else
          t.find(".popover-title").text(e),
            t.find(".popover-content").children().detach().end().text(i);
        t.removeClass("fade top bottom left right in"),
          t.find(".popover-title").html() || t.find(".popover-title").hide();
      }),
      (s.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (s.prototype.getContent = function () {
        var t = this.$element,
          e = this.options;
        return (
          t.attr("data-content") ||
          ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
        );
      }),
      (s.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
      });
    var t = n.fn.popover;
    (n.fn.popover = function e(o) {
      return this.each(function () {
        var t = n(this),
          e = t.data("bs.popover"),
          i = "object" == typeof o && o;
        (!e && /destroy|hide/.test(o)) ||
          (e || t.data("bs.popover", (e = new s(this, i))),
          "string" == typeof o && e[o]());
      });
    }),
      (n.fn.popover.Constructor = s),
      (n.fn.popover.noConflict = function () {
        return (n.fn.popover = t), this;
      });
  })(jQuery),
  (function (s) {
    "use strict";
    function n(t, e) {
      (this.$body = s(document.body)),
        (this.$scrollElement = s(t).is(document.body) ? s(window) : s(t)),
        (this.options = s.extend({}, n.DEFAULTS, e)),
        (this.selector = (this.options.target || "") + " .nav li > a"),
        (this.offsets = []),
        (this.targets = []),
        (this.activeTarget = null),
        (this.scrollHeight = 0),
        this.$scrollElement.on(
          "scroll.bs.scrollspy",
          s.proxy(this.process, this)
        ),
        this.refresh(),
        this.process();
    }
    function e(o) {
      return this.each(function () {
        var t = s(this),
          e = t.data("bs.scrollspy"),
          i = "object" == typeof o && o;
        e || t.data("bs.scrollspy", (e = new n(this, i))),
          "string" == typeof o && e[o]();
      });
    }
    (n.VERSION = "3.4.1"),
      (n.DEFAULTS = { offset: 10 }),
      (n.prototype.getScrollHeight = function () {
        return (
          this.$scrollElement[0].scrollHeight ||
          Math.max(
            this.$body[0].scrollHeight,
            document.documentElement.scrollHeight
          )
        );
      }),
      (n.prototype.refresh = function () {
        var t = this,
          o = "offset",
          n = 0;
        (this.offsets = []),
          (this.targets = []),
          (this.scrollHeight = this.getScrollHeight()),
          s.isWindow(this.$scrollElement[0]) ||
            ((o = "position"), (n = this.$scrollElement.scrollTop())),
          this.$body
            .find(this.selector)
            .map(function () {
              var t = s(this),
                e = t.data("target") || t.attr("href"),
                i = /^#./.test(e) && s(e);
              return (
                (i && i.length && i.is(":visible") && [[i[o]().top + n, e]]) ||
                null
              );
            })
            .sort(function (t, e) {
              return t[0] - e[0];
            })
            .each(function () {
              t.offsets.push(this[0]), t.targets.push(this[1]);
            });
      }),
      (n.prototype.process = function () {
        var t,
          e = this.$scrollElement.scrollTop() + this.options.offset,
          i = this.getScrollHeight(),
          o = this.options.offset + i - this.$scrollElement.height(),
          n = this.offsets,
          s = this.targets,
          a = this.activeTarget;
        if ((this.scrollHeight != i && this.refresh(), o <= e))
          return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0]) return (this.activeTarget = null), this.clear();
        for (t = n.length; t--; )
          a != s[t] &&
            e >= n[t] &&
            (n[t + 1] === undefined || e < n[t + 1]) &&
            this.activate(s[t]);
      }),
      (n.prototype.activate = function (t) {
        (this.activeTarget = t), this.clear();
        var e =
            this.selector +
            '[data-target="' +
            t +
            '"],' +
            this.selector +
            '[href="' +
            t +
            '"]',
          i = s(e).parents("li").addClass("active");
        i.parent(".dropdown-menu").length &&
          (i = i.closest("li.dropdown").addClass("active")),
          i.trigger("activate.bs.scrollspy");
      }),
      (n.prototype.clear = function () {
        s(this.selector)
          .parentsUntil(this.options.target, ".active")
          .removeClass("active");
      });
    var t = s.fn.scrollspy;
    (s.fn.scrollspy = e),
      (s.fn.scrollspy.Constructor = n),
      (s.fn.scrollspy.noConflict = function () {
        return (s.fn.scrollspy = t), this;
      }),
      s(window).on("load.bs.scrollspy.data-api", function () {
        s('[data-spy="scroll"]').each(function () {
          var t = s(this);
          e.call(t, t.data());
        });
      });
  })(jQuery),
  (function (r) {
    "use strict";
    var a = function (t) {
      this.element = r(t);
    };
    function e(i) {
      return this.each(function () {
        var t = r(this),
          e = t.data("bs.tab");
        e || t.data("bs.tab", (e = new a(this))),
          "string" == typeof i && e[i]();
      });
    }
    (a.VERSION = "3.4.1"),
      (a.TRANSITION_DURATION = 150),
      (a.prototype.show = function () {
        var t = this.element,
          e = t.closest("ul:not(.dropdown-menu)"),
          i = t.data("target");
        if (
          (i || (i = (i = t.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, "")),
          !t.parent("li").hasClass("active"))
        ) {
          var o = e.find(".active:last a"),
            n = r.Event("hide.bs.tab", { relatedTarget: t[0] }),
            s = r.Event("show.bs.tab", { relatedTarget: o[0] });
          if (
            (o.trigger(n),
            t.trigger(s),
            !s.isDefaultPrevented() && !n.isDefaultPrevented())
          ) {
            var a = r(document).find(i);
            this.activate(t.closest("li"), e),
              this.activate(a, a.parent(), function () {
                o.trigger({ type: "hidden.bs.tab", relatedTarget: t[0] }),
                  t.trigger({ type: "shown.bs.tab", relatedTarget: o[0] });
              });
          }
        }
      }),
      (a.prototype.activate = function (t, e, i) {
        var o = e.find("> .active"),
          n =
            i &&
            r.support.transition &&
            ((o.length && o.hasClass("fade")) || !!e.find("> .fade").length);
        function s() {
          o
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active")
            .end()
            .find('[data-toggle="tab"]')
            .attr("aria-expanded", !1),
            t
              .addClass("active")
              .find('[data-toggle="tab"]')
              .attr("aria-expanded", !0),
            n ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"),
            t.parent(".dropdown-menu").length &&
              t
                .closest("li.dropdown")
                .addClass("active")
                .end()
                .find('[data-toggle="tab"]')
                .attr("aria-expanded", !0),
            i && i();
        }
        o.length && n
          ? o
              .one("bsTransitionEnd", s)
              .emulateTransitionEnd(a.TRANSITION_DURATION)
          : s(),
          o.removeClass("in");
      });
    var t = r.fn.tab;
    (r.fn.tab = e),
      (r.fn.tab.Constructor = a),
      (r.fn.tab.noConflict = function () {
        return (r.fn.tab = t), this;
      });
    var i = function (t) {
      t.preventDefault(), e.call(r(this), "show");
    };
    r(document)
      .on("click.bs.tab.data-api", '[data-toggle="tab"]', i)
      .on("click.bs.tab.data-api", '[data-toggle="pill"]', i);
  })(jQuery),
  (function (l) {
    "use strict";
    var h = function (t, e) {
      this.options = l.extend({}, h.DEFAULTS, e);
      var i =
        this.options.target === h.DEFAULTS.target
          ? l(this.options.target)
          : l(document).find(this.options.target);
      (this.$target = i
        .on("scroll.bs.affix.data-api", l.proxy(this.checkPosition, this))
        .on(
          "click.bs.affix.data-api",
          l.proxy(this.checkPositionWithEventLoop, this)
        )),
        (this.$element = l(t)),
        (this.affixed = null),
        (this.unpin = null),
        (this.pinnedOffset = null),
        this.checkPosition();
    };
    function i(o) {
      return this.each(function () {
        var t = l(this),
          e = t.data("bs.affix"),
          i = "object" == typeof o && o;
        e || t.data("bs.affix", (e = new h(this, i))),
          "string" == typeof o && e[o]();
      });
    }
    (h.VERSION = "3.4.1"),
      (h.RESET = "affix affix-top affix-bottom"),
      (h.DEFAULTS = { offset: 0, target: window }),
      (h.prototype.getState = function (t, e, i, o) {
        var n = this.$target.scrollTop(),
          s = this.$element.offset(),
          a = this.$target.height();
        if (null != i && "top" == this.affixed) return n < i && "top";
        if ("bottom" == this.affixed)
          return null != i
            ? !(n + this.unpin <= s.top) && "bottom"
            : !(n + a <= t - o) && "bottom";
        var r = null == this.affixed,
          l = r ? n : s.top;
        return null != i && n <= i
          ? "top"
          : null != o && t - o <= l + (r ? a : e) && "bottom";
      }),
      (h.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(h.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
          e = this.$element.offset();
        return (this.pinnedOffset = e.top - t);
      }),
      (h.prototype.checkPositionWithEventLoop = function () {
        setTimeout(l.proxy(this.checkPosition, this), 1);
      }),
      (h.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
          var t = this.$element.height(),
            e = this.options.offset,
            i = e.top,
            o = e.bottom,
            n = Math.max(l(document).height(), l(document.body).height());
          "object" != typeof e && (o = i = e),
            "function" == typeof i && (i = e.top(this.$element)),
            "function" == typeof o && (o = e.bottom(this.$element));
          var s = this.getState(n, t, i, o);
          if (this.affixed != s) {
            null != this.unpin && this.$element.css("top", "");
            var a = "affix" + (s ? "-" + s : ""),
              r = l.Event(a + ".bs.affix");
            if ((this.$element.trigger(r), r.isDefaultPrevented())) return;
            (this.affixed = s),
              (this.unpin = "bottom" == s ? this.getPinnedOffset() : null),
              this.$element
                .removeClass(h.RESET)
                .addClass(a)
                .trigger(a.replace("affix", "affixed") + ".bs.affix");
          }
          "bottom" == s && this.$element.offset({ top: n - t - o });
        }
      });
    var t = l.fn.affix;
    (l.fn.affix = i),
      (l.fn.affix.Constructor = h),
      (l.fn.affix.noConflict = function () {
        return (l.fn.affix = t), this;
      }),
      l(window).on("load", function () {
        l('[data-spy="affix"]').each(function () {
          var t = l(this),
            e = t.data();
          (e.offset = e.offset || {}),
            null != e.offsetBottom && (e.offset.bottom = e.offsetBottom),
            null != e.offsetTop && (e.offset.top = e.offsetTop),
            i.call(t, e);
        });
      });
  })(jQuery);
function _setBrowser() {
  var userAgent = navigator.userAgent.toLowerCase();
  jQuery.browser = {
    version: (userAgent.match(/.+(?:rv|it|ra|ie|me|ve)[\/: ]([\d.]+)/) ||
      [])[1],
    chrome: /chrome/.test(userAgent),
    safari: /webkit/.test(userAgent) && !/chrome/.test(userAgent),
    opera: /opera/.test(userAgent),
    firefox: /firefox/.test(userAgent),
    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
    mozilla:
      /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
    gecko: /[^like]{4} gecko/.test(userAgent),
    presto: /presto/.test(userAgent),
    xoom: /xoom/.test(userAgent),
    android: /android/.test(userAgent),
    androidVersion: (userAgent.match(/.+(?:android)[\/: ]([\d.]+)/) || [
      0, 0,
    ])[1],
    iphone: /iphone|ipod/.test(userAgent),
    iphoneVersion: (userAgent.match(/.+(?:iphone\ os)[\/: ]([\d_]+)/) || [
      0, 0,
    ])[1]
      .toString()
      .split("_")
      .join("."),
    ipad: /ipad/.test(userAgent),
    ipadVersion: (userAgent.match(/.+(?:cpu\ os)[\/: ]([\d_]+)/) || [0, 0])[1]
      .toString()
      .split("_")
      .join("."),
    blackberry: /blackberry/.test(userAgent),
    winMobile: /Windows\ Phone/.test(userAgent),
    winMobileVersion: (userAgent.match(
      /.+(?:windows\ phone\ os)[\/: ]([\d_]+)/
    ) || [0, 0])[1],
  };
  jQuery.browser.mobile =
    $.browser.iphone ||
    $.browser.ipad ||
    $.browser.android ||
    $.browser.blackberry;
}
function is_mobile() {
  if ($("header .navbar-toggle:visible").length) {
    return true;
  } else {
    return false;
  }
}
var last_focus_element_before_showing_modal = null;
$(document).ready(function () {
  _setBrowser();
  var ua = $.browser;
  var chrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
  if (chrome) {
    $("body").addClass("uaChrome");
  } else if (ua.safari) {
    $("body").addClass("uaSafari");
  } else if (ua.mozilla) {
    $("body").addClass("uaMozilla");
  } else if (ua.msie) {
    $("body").addClass("uaMsie");
    if (ua.version.slice(0, 1) == "6") {
      $("body").addClass("uaMsie6");
    } else if (ua.version.slice(0, 1) == "7") {
      $("body").addClass("uaMsie7");
    } else if (ua.version.slice(0, 1) == "8") {
      $("body").addClass("uaMsie8");
    } else if (ua.version.slice(0, 1) == "9") {
      $("body").addClass("uaMsie9");
    }
  } else {
    $("body").addClass("noUADetected");
  }
  if (!ua.msie) {
    $(".item-logo.vtech-kids svg").css("bottom", 0);
  }
  function appendheight() {
    var result = $("#player_container").height();
    $("#video-list").css("height", result - 26);
  }
  appendheight();
  function setVideoSrc(ele, vid, para) {
    if (vid) {
      var videoId = vid;
    } else {
      var videoId = $(ele).data("video-id");
    }
    var url =
      "//www.youtube-nocookie.com/embed/" +
      videoId +
      "?version=3&showinfo=1&controls=2&modestbranding=1&rel=0";
    if (para) {
      url += para;
    }
    $(ele).attr("src", url);
  }
  if ($("#ytplayer").length > 0) {
    setVideoSrc(
      $("#ytplayer"),
      $("#ytplayer").data("video-id"),
      $("#ytplayer").data("video-para")
    );
  }
  $(".video-item").click(function () {
    setTimeout(function () {
      $("#ytplayer_img").remove();
    }, 700);
    var videoId = $(this).data("video-id");
    setVideoSrc($("#ytplayer"), videoId, $(this).data("video-para"));
    $(".video-item").removeClass("selected-item");
    $(this).addClass("selected-item");
  });
  $("#ytplayer_img").click(function () {
    $(".video-item:first").trigger("click");
  });
  $(".video-item").each(function (i, o) {
    if ($(o).data("video-id") && $(o).data("video-id") != "") {
      if ($.trim($(o).children(".content").html()).length <= 0) {
        $.ajax({
          url:
            "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
            $(o).data("video-id") +
            "&key=AIzaSyDwEJXxSxiD_T_kdX7bZPJ1gn13R-yjtts",
          dataType: "jsonp",
          success: function (data) {
            $(o).children(".content").html(data.items[0].snippet.title);
          },
        });
      }
    }
  });
  $("#video-list ul").show();
  accessibility_for_images();
  accessibility_for_tabs();
  setTimeout(function () {
    accessibility_for_carousel();
  }, 500);
  accessibility_for_navigation($("#navigation-sub"));
  accessibility_for_modal_dialog();
  $("input:checkbox").keypress(function (e) {
    if ((e.keyCode ? e.keyCode : e.which) == 13) {
      $(this).trigger("click");
    }
  });
  if ($('.nav-tabs a[aria-selected="true"]').length == 0) {
    var active_tab;
    if ($('.nav-tabs li[role="presentation"].active').length == 1) {
      active_tab = $('.nav-tabs li[role="presentation"].active a');
    } else {
      active_tab = $(".nav-tabs")
        .find('a[data-toggle="tab"], a[role="tab"]')
        .first();
    }
    active_tab.tab("show");
    active_tab.attr("aria-selected", "true");
  }
  $(".product_list_inner .product_wrapper").each(function () {
    var classA = $(this).find("a").attr("class");
    if (classA === "product-redirect-popup") {
      $(this)
        .find(".image")
        .on("click", function () {
          $(this).parent().find("a").click();
        });
    } else {
      var link = $(this).find("a").attr("href");
      $(this)
        .find(".image")
        .on("click", function () {
          window.open(link, "_self");
        });
    }
  });
  $(document).on("keydown", "body", function (e) {
    if (
      e.key == "Tab" &&
      $('[role="dialog"]').find($(document.activeElement)).length == 0 &&
      !$(document.activeElement).is(".modal, [role='dialog']")
    ) {
      last_focus_element_before_showing_modal = $(document.activeElement);
    }
  });
  $(document).on("click", "body", function (e) {
    if (
      $('[role="dialog"]').find($(document.activeElement)).length == 0 &&
      !$(document.activeElement).is(".modal, [role='dialog']")
    ) {
      last_focus_element_before_showing_modal = $(document.activeElement);
    }
  });
  function accessibility_for_modal_dialog() {
    modal_dialog_keydown();
    if (typeof $().modal == "function") {
      $(document).on("show.bs.modal", ".modal", function () {
        var content = $(this).find(".modal-content");
        var wrapper_selector = $(content).parents(".modal-dialog");
        var close_btn_selector = wrapper_selector.find(".close");
        var title_selector = wrapper_selector
          .find(".modal-title, h1, h2")
          .first();
        add_attribute_and_heading({
          wrapper_selector: wrapper_selector,
          close_btn_selector: close_btn_selector,
          title_selector: title_selector,
        });
      });
      $(window).on("hidden.bs.modal", function () {
        after_modal_closed();
      });
    }
    function add_attribute_and_heading(selectors) {
      if (
        typeof selectors.wrapper_selector == "undefined" ||
        selectors.wrapper_selector.length == 0
      ) {
        return;
      }
      if (typeof selectors.prev_btn_selector != "undefined") {
        selectors.prev_btn_selector.attr("role", "button");
      }
      if (typeof selectors.next_btn_selector != "undefined") {
        selectors.next_btn_selector.attr("role", "button");
      }
      if (typeof selectors.close_btn_selector != "undefined") {
        selectors.close_btn_selector.attr({
          role: "button",
          "aria-label": "Close",
        });
      }
      let wrapper_selector = selectors.wrapper_selector;
      wrapper_selector.attr({ tabindex: -1 });
      if (
        typeof selectors.title_selector != "undefined" &&
        selectors.title_selector.length
      ) {
        if (selectors.title_selector.is(":header")) {
          title_selector = selectors.title_selector;
        } else {
          if (wrapper_selector.find(":header").length) {
            title_selector = wrapper_selector.find(":header").first();
          } else {
            title_selector = selectors.title_selector;
            title_selector.attr({ role: "heading", "aria-level": "2" });
          }
        }
      } else {
        if (wrapper_selector.find(":header").length) {
          title_selector = wrapper_selector.find(":header").first();
        } else {
          title_selector = wrapper_selector
            .find("*")
            .filter(function () {
              return (
                $(this)
                  .contents()
                  .filter(function () {
                    return (
                      this.nodeType === 3 && this.textContent.trim() !== ""
                    );
                  }).length > 0
              );
            })
            .first();
          title_selector.attr({ role: "heading", "aria-level": "2" });
        }
      }
      if (typeof title_selector.attr("id") != "undefined") {
        wrapper_selector.attr({ "aria-labelledby": title_selector.attr("id") });
      } else {
        title_selector.attr({ id: "modal_heading" });
        wrapper_selector.attr({ "aria-labelledby": "modal_heading" });
      }
    }
    function after_modal_closed() {
      if (
        last_focus_element_before_showing_modal &&
        last_focus_element_before_showing_modal.attr("type") == "checkbox"
      ) {
        last_focus_element_before_showing_modal = null;
        return;
      }
      if (
        last_focus_element_before_showing_modal == null ||
        last_focus_element_before_showing_modal.length == 0
      ) {
        last_focus_element_before_showing_modal = $("body")
          .find("a:visible, button:visible, input:visible")
          .first();
      }
      last_focus_element_before_showing_modal.focus();
      last_focus_element_before_showing_modal = null;
    }
  }
  function modal_dialog_keydown() {
    $(document).on("keydown", '[role="dialog"]', function (e) {
      var firstFocusableElement = $(this)
        .find("button:visible, a:visible")
        .first();
      var lastFocusableElement = $(this)
        .find("button:visible, a:visible")
        .last();
      var closeBtnElement = $(this).find(".close").first();
      if (
        $(this).find("iframe").length &&
        firstFocusableElement[0] == lastFocusableElement[0]
      ) {
        return;
      }
      if (
        $(e.target).is(lastFocusableElement) &&
        e.key == "Tab" &&
        !e.shiftKey
      ) {
        e.preventDefault();
        firstFocusableElement.focus();
      } else if (
        $(e.target).is(firstFocusableElement) &&
        e.key == "Tab" &&
        e.shiftKey
      ) {
        e.preventDefault();
        lastFocusableElement.focus();
      } else if (
        e.key == "Enter" &&
        !e.shiftKey &&
        closeBtnElement.length &&
        $(e.target).is(closeBtnElement)
      ) {
        if (typeof $().modal == "function") {
          $(this).modal("hide");
        }
      }
    });
  }
  formAnimation(".form-group");
  function formAnimation(classarow) {
    $(classarow)
      .find(".form-control")
      .each(function () {
        var targetItem = $(this).parent();
        if ($(this).val()) {
          $(targetItem).find("label").css({ top: "6px", fontSize: "12px" });
        }
      });
    $(classarow)
      .find(".form-control")
      .focus(function () {
        $(this).parent(".input-box").addClass("focus");
        $(this)
          .parent()
          .find("label")
          .animate({ top: "6px", fontSize: "12px" }, 300);
      });
    $(classarow)
      .find(".form-control")
      .blur(function () {
        if ($(this).val().length == 0) {
          $(this).parent(".input-box").removeClass("focus");
          $(this)
            .parent()
            .find("label")
            .animate({ top: "22px", fontSize: "16px" }, 300);
        }
      });
  }
});
var fakewaffle = (function ($, fakewaffle) {
  "use strict";
  fakewaffle.responsiveTabs = function (collapseDisplayed) {
    fakewaffle.currentPosition = "tabs";
    var tabGroups = $(".nav-tabs.responsive");
    var hidden = "";
    var visible = "";
    var activeTab = "";
    if (collapseDisplayed === undefined) {
      collapseDisplayed = ["xs", "sm"];
    }
    $.each(collapseDisplayed, function () {
      hidden += " hidden-" + this;
      visible += " visible-" + this;
    });
    $.each(tabGroups, function (index) {
      var collapseDiv;
      var $tabGroup = $(this);
      var tabs = $tabGroup.find("li a");
      if ($tabGroup.attr("id") === undefined) {
        $tabGroup.attr("id", "tabs-" + index);
      }
      collapseDiv = $("<div></div>", {
        class: "panel-group responsive" + visible,
        id: "collapse-" + $tabGroup.attr("id"),
      });
      $.each(tabs, function () {
        var $this = $(this);
        var oldLinkClass =
          $this.attr("class") === undefined ? "" : $this.attr("class");
        var newLinkClass = "accordion-toggle";
        var oldParentClass =
          $this.parent().attr("class") === undefined
            ? ""
            : $this.parent().attr("class");
        var newParentClass = "panel panel-default";
        var newHash = $this.get(0).hash.replace("#", "collapse-");
        if (oldLinkClass.length > 0) {
          newLinkClass += " " + oldLinkClass;
        }
        if (oldParentClass.length > 0) {
          oldParentClass = oldParentClass.replace(/\bactive\b/g, "");
          newParentClass += " " + oldParentClass;
          newParentClass = newParentClass.replace(/\s{2,}/g, " ");
          newParentClass = newParentClass.replace(/^\s+|\s+$/g, "");
        }
        if ($this.parent().hasClass("active")) {
          activeTab = "#" + newHash;
        }
        collapseDiv.append(
          $("<div>")
            .attr("class", newParentClass)
            .html(
              $("<div>")
                .attr("class", "panel-heading")
                .html(
                  $("<h4>")
                    .attr("class", "panel-title")
                    .html(
                      $("<a>", {
                        class: newLinkClass,
                        "data-toggle": "collapse",
                        "data-parent": "#collapse-" + $tabGroup.attr("id"),
                        href: "#" + newHash,
                        html: $this.html(),
                      })
                    )
                )
            )
            .append(
              $("<div>", { id: newHash, class: "panel-collapse collapse" })
            )
        );
      });
      $tabGroup.next().after(collapseDiv);
      $tabGroup.addClass(hidden);
      $(".tab-content.responsive").addClass(hidden);
    });
    fakewaffle.checkResize();
    fakewaffle.bindTabToCollapse();
    if (activeTab) {
      $(activeTab).collapse("show");
    }
  };
  fakewaffle.checkResize = function () {
    if (
      $(".panel-group.responsive").is(":visible") === true &&
      fakewaffle.currentPosition === "tabs"
    ) {
      fakewaffle.tabToPanel();
      fakewaffle.currentPosition = "panel";
    } else if (
      $(".panel-group.responsive").is(":visible") === false &&
      fakewaffle.currentPosition === "panel"
    ) {
      fakewaffle.panelToTab();
      fakewaffle.currentPosition = "tabs";
    }
  };
  fakewaffle.tabToPanel = function () {
    var tabGroups = $(".nav-tabs.responsive");
    $.each(tabGroups, function (index, tabGroup) {
      var tabContents = $(tabGroup).next(".tab-content").find(".tab-pane");
      $.each(tabContents, function (index, tabContent) {
        var destinationId = $(tabContent).attr("id").replace(/^/, "#collapse-");
        $(tabContent)
          .removeClass("tab-pane")
          .addClass("panel-body")
          .appendTo($(destinationId));
      });
    });
  };
  fakewaffle.panelToTab = function () {
    var panelGroups = $(".panel-group.responsive");
    $.each(panelGroups, function (index, panelGroup) {
      var destinationId = $(panelGroup).attr("id").replace("collapse-", "#");
      var destination = $(destinationId).next(".tab-content")[0];
      var panelContents = $(panelGroup).find(".panel-body");
      panelContents
        .removeClass("panel-body")
        .addClass("tab-pane")
        .appendTo($(destination));
    });
  };
  fakewaffle.appendHeight = function () {
    var result = $("#player_container").height();
    $("#video-list").css("height", result - 26);
  };
  fakewaffle.bindTabToCollapse = function () {
    var tabs = $(".nav-tabs.responsive").find("li a");
    var collapse = $(".panel-group.responsive").find(".panel-collapse");
    tabs.on("shown.bs.tab", function (e) {
      if (fakewaffle.currentPosition === "tabs") {
        var $current = $(e.currentTarget.hash.replace(/#/, "#collapse-"));
        $current.collapse("show");
        if (e.relatedTarget) {
          var $previous = $(e.relatedTarget.hash.replace(/#/, "#collapse-"));
          $previous.collapse("hide");
        }
      }
    });
    collapse.on("shown.bs.collapse", function (e) {
      if (fakewaffle.currentPosition === "panel") {
        var current = $(e.target).context.id.replace(/collapse-/g, "#");
        $('a[href="' + current + '"]').tab("show");
        var panelGroup = $(e.currentTarget).closest(".panel-group.responsive");
        $(panelGroup).find(".panel-body").removeClass("active");
        $(e.currentTarget).find(".panel-body").addClass("active");
      }
    });
  };
  $(window).resize(function () {
    fakewaffle.checkResize();
    fakewaffle.appendHeight();
  });
  return fakewaffle;
})(window.jQuery, fakewaffle || {});
function accessibility_for_images() {
  $("img").not("[alt]").attr("alt", "");
}
function accessibility_for_tabs() {
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabList = document.querySelector('[role="tablist"]');
  if (tabs != null) {
    tabs.forEach((tab) => {
      var aria_controls =
        tab.getAttribute("href") == null
          ? ""
          : tab.getAttribute("href").replace("#", "");
      tab.addEventListener("click", changeTabs);
      tab.setAttribute("aria-controls", aria_controls);
      tab.setAttribute("tabindex", -1);
      tab.removeAttribute("aria-expanded");
      if (tab.parentElement.classList.contains("active")) {
        tab.removeAttribute("tabindex");
      }
    });
  }
  if (tabList != null) {
    let tabFocus = 0;
    tabList.addEventListener("keydown", (e) => {
      if (e.keyCode === 39 || e.keyCode === 37) {
        tabs[tabFocus].setAttribute("tabindex", -1);
        if (e.keyCode === 39) {
          tabFocus++;
          if (tabFocus >= tabs.length) {
            tabFocus = 0;
          }
        } else if (e.keyCode === 37) {
          tabFocus--;
          if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
          }
        }
        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
      }
    });
  }
  const tabPanes = document.querySelectorAll(".tab-content .tab-pane");
  if (tabPanes != null) {
    tabPanes.forEach((pane) => {
      pane.setAttribute("role", "tabpanel");
    });
  }
  function changeTabs(e) {
    const target = e.target;
    const parent = $(e.target).parents('[role="tablist"]');
    parent[0].querySelectorAll('[aria-selected="true"]').forEach((t) => {
      t.setAttribute("aria-selected", false);
      t.setAttribute("tabindex", -1);
    });
    target.setAttribute("aria-selected", true);
    target.removeAttribute("tabindex");
    setTimeout(function () {
      parent[0]
        .querySelectorAll('[role="tab"]')
        .forEach((t) => t.removeAttribute("aria-expanded"));
    }, 200);
    const tabpanels = document.querySelectorAll('[role="tabpanel"]');
    tabpanels.forEach((t) => t.removeAttribute("tabindex"));
    document
      .querySelector(
        '[id="' + target.getAttribute("href").replace("#", "") + '"]'
      )
      .setAttribute("tabindex", 0);
  }
}
function toggle_second_level_menu(show, menuItem) {
  if (show) {
    menuItem.parent().addClass("active");
    let subMenu = menuItem.parent("li").find("> ul");
    if (!subMenu || subMenu.length < 1) return;
    subMenu.addClass("in");
    menuItem.attr("aria-expanded", true);
  } else {
    if (typeof menuItem != "undefined" && menuItem.length) {
      menuItem.parent().removeClass("active");
      if (menuItem.attr("aria-expanded") === "true") {
        menuItem.attr("aria-expanded", false);
      }
      let subMenu = menuItem.parent("li").find("> ul");
      if (!subMenu || subMenu.length < 1) return;
      subMenu.removeClass("in");
    } else {
      var navigation = $("#navigation-sub");
      navigation.find("> li").removeClass("active");
      navigation.find("> li > ul").removeClass("in");
      navigation.find("> li > button").each(function () {
        if ($(this).attr("aria-expanded") === "true") {
          $(this).attr("aria-expanded", false);
        }
      });
    }
  }
}
function accessibility_for_navigation(navigation) {
  let topLevel = navigation.find("> li > button, > li > a");
  $(topLevel)
    .on("mouseleave", function () {
      if (!is_mobile()) {
        if ($(this).next().hasClass("collapse")) return;
        toggle_second_level_menu(false, $(this));
      }
    })
    .on("mouseenter", function (target) {
      if (!is_mobile()) {
        toggle_second_level_menu(true, $(this));
      }
    });
  $(navigation.find("> li")).on("mouseleave", function () {
    if (!is_mobile()) {
      toggle_second_level_menu(false, undefined);
    }
  });
  $(topLevel).on("click", function (e) {
    var show = true;
    if ($(this).attr("aria-expanded") === "true") {
      show = false;
    }
    toggle_second_level_menu(show, $(this));
  });
  $(topLevel).on("keyup", function () {
    if ($(this).attr("aria-expanded") !== "true") {
      toggle_second_level_menu(false, undefined);
    }
  });
  var openButton = $(".navbar-toggle");
  var modal = $("#navigation .navbar-collaps")[0];
  var menu = $("#navigation .navbar-collaps ul.navi")[0];
  reset_navigation_on_resizing();
  window.addEventListener("resize", function (e) {
    reset_navigation_on_resizing();
  });
  openButton.on("click", function (e) {
    e.stopPropagation();
    if ($(this).hasClass("active")) {
      closeMenu();
    } else {
      $(this).addClass("active");
      $(modal).show(0, function () {
        $(menu).slideDown();
        $("#navigation").addClass("in");
        $("body").addClass("mobile-menu-is-open");
        modal.focus();
      });
    }
  });
  document.body.addEventListener("click", function (e) {
    if (
      $("body").hasClass("mobile-menu-is-open") &&
      !modal.contains(e.target)
    ) {
      closeMenu();
    }
  });
  function reset_navigation_on_resizing() {
    if ($("header .navbar-toggle:visible").length) {
      $(modal).hide();
      $("#navigation .navbar-collaps").attr({
        role: "dialog",
        "aria-modal": true,
        "aria-label": "menu",
        tabindex: -1,
      });
    } else {
      toggle_second_level_menu(false, undefined);
      $(modal).css("display", "");
      $(menu).css("display", "");
      openButton.not(".close_btn").removeClass("active");
      $("#navigation").removeClass("in");
      $("body").removeClass("mobile-menu-is-open");
      $("#navigation .navbar-collaps").removeAttr(
        "role aria-modal aria-label tabindex"
      );
    }
  }
  function closeMenu() {
    if (!$("body").hasClass("mobile-menu-is-open")) return;
    openButton.not(".close_btn").removeClass("active");
    $(menu).slideUp(400, function () {
      $(modal).hide();
      openButton.focus();
      $("#navigation").removeClass("in");
      $("body").removeClass("mobile-menu-is-open");
    });
  }
}
function accessibility_for_carousel() {
  $(".slick-slider").each(function () {
    $(this)
      .find(".slick-slide, .slick-slide img, .slick-slide a")
      .removeAttr("aria-describedby");
    $(this).on("afterChange", function (event, slick, currentSlide, nextSlide) {
      let currentSlideObj = $(slick.$slides.get(currentSlide));
      if (currentSlideObj.find("button.image_btn")) {
        currentSlideObj.find("button.image_btn").attr("aria-current", "true");
        $(this)
          .find(".slick-slide")
          .not(currentSlideObj)
          .find("button.image_btn")
          .removeAttr("aria-current");
        return;
      }
      currentSlideObj.attr("aria-current", "true");
      $(this)
        .find(".slick-slide")
        .not(currentSlideObj)
        .removeAttr("aria-current");
    });
    let total_no_of_slide = $(this).find(
      ".slick-slide:not('.slick-cloned')"
    ).length;
    $(this)
      .find(".slick-slide")
      .each(function () {
        let slide_index = parseInt($(this).attr("data-slick-index"));
        if (slide_index < 0) {
          slide_index += total_no_of_slide;
        } else if (slide_index > total_no_of_slide - 1) {
          slide_index -= total_no_of_slide;
        }
        $(this).attr(
          "aria-label",
          "slide " + (slide_index + 1) + " of " + total_no_of_slide
        );
      });
  });
}
$(function () {
  if ($(".regular-slick-2").length) {
    $(".regular-slick-2").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      instructionsText:
        "You can use the previous and next buttons to navigate this carousel.",
    });
  }
  if ($(".regular-slick-4").length) {
    $(".regular-slick-4").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      instructionsText:
        "You can use the previous and next buttons to navigate this carousel.",
    });
  }
}); // jQuery Mask Plugin v1.13.4
// github.com/igorescobar/jQuery-Mask-Plugin
(function (b) {
  "function" === typeof define && define.amd
    ? define(["jquery"], b)
    : "object" === typeof exports
    ? (module.exports = b(require("jquery")))
    : b(jQuery || Zepto);
})(function (b) {
  var y = function (a, c, d) {
    a = b(a);
    var g = this,
      k = a.val(),
      l;
    c = "function" === typeof c ? c(a.val(), void 0, a, d) : c;
    var e = {
      invalid: [],
      getCaret: function () {
        try {
          var q,
            b = 0,
            e = a.get(0),
            f = document.selection,
            c = e.selectionStart;
          if (f && -1 === navigator.appVersion.indexOf("MSIE 10"))
            (q = f.createRange()),
              q.moveStart(
                "character",
                a.is("input") ? -a.val().length : -a.text().length
              ),
              (b = q.text.length);
          else if (c || "0" === c) b = c;
          return b;
        } catch (d) {}
      },
      setCaret: function (q) {
        try {
          if (a.is(":focus")) {
            var b,
              c = a.get(0);
            c.setSelectionRange
              ? c.setSelectionRange(q, q)
              : c.createTextRange &&
                ((b = c.createTextRange()),
                b.collapse(!0),
                b.moveEnd("character", q),
                b.moveStart("character", q),
                b.select());
          }
        } catch (f) {}
      },
      events: function () {
        a.on("input.mask keyup.mask", e.behaviour)
          .on("paste.mask drop.mask", function () {
            setTimeout(function () {
              a.keydown().keyup();
            }, 100);
          })
          .on("change.mask", function () {
            a.data("changed", !0);
          })
          .on("blur.mask", function () {
            k === a.val() || a.data("changed") || a.triggerHandler("change");
            a.data("changed", !1);
          })
          .on("blur.mask", function () {
            k = a.val();
          })
          .on("focus.mask", function (a) {
            !0 === d.selectOnFocus && b(a.target).select();
          })
          .on("focusout.mask", function () {
            d.clearIfNotMatch && !l.test(e.val()) && e.val("");
          });
      },
      getRegexMask: function () {
        for (var a = [], b, e, f, d, h = 0; h < c.length; h++)
          (b = g.translation[c.charAt(h)])
            ? ((e = b.pattern.toString().replace(/.{1}$|^.{1}/g, "")),
              (f = b.optional),
              (b = b.recursive)
                ? (a.push(c.charAt(h)),
                  (d = { digit: c.charAt(h), pattern: e }))
                : a.push(f || b ? e + "?" : e))
            : a.push(c.charAt(h).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
        a = a.join("");
        d &&
          (a = a
            .replace(
              new RegExp("(" + d.digit + "(.*" + d.digit + ")?)"),
              "($1)?"
            )
            .replace(new RegExp(d.digit, "g"), d.pattern));
        return new RegExp(a);
      },
      destroyEvents: function () {
        a.off(
          "input keydown keyup paste drop blur focusout "
            .split(" ")
            .join(".mask ")
        );
      },
      val: function (b) {
        var c = a.is("input") ? "val" : "text";
        if (0 < arguments.length) {
          if (a[c]() !== b) a[c](b);
          c = a;
        } else c = a[c]();
        return c;
      },
      getMCharsBeforeCount: function (a, b) {
        for (var e = 0, f = 0, d = c.length; f < d && f < a; f++)
          g.translation[c.charAt(f)] || ((a = b ? a + 1 : a), e++);
        return e;
      },
      caretPos: function (a, b, d, f) {
        return g.translation[c.charAt(Math.min(a - 1, c.length - 1))]
          ? Math.min(a + d - b - f, d)
          : e.caretPos(a + 1, b, d, f);
      },
      behaviour: function (a) {
        a = a || window.event;
        e.invalid = [];
        var c = a.keyCode || a.which;
        if (-1 === b.inArray(c, g.byPassKeys)) {
          var d = e.getCaret(),
            f = e.val().length,
            n = d < f,
            h = e.getMasked(),
            k = h.length,
            m = e.getMCharsBeforeCount(k - 1) - e.getMCharsBeforeCount(f - 1);
          e.val(h);
          !n ||
            (65 === c && a.ctrlKey) ||
            (8 !== c && 46 !== c && (d = e.caretPos(d, f, k, m)),
            e.setCaret(d));
          return e.callbacks(a);
        }
      },
      getMasked: function (a) {
        var b = [],
          k = e.val(),
          f = 0,
          n = c.length,
          h = 0,
          l = k.length,
          m = 1,
          p = "push",
          u = -1,
          t,
          w;
        d.reverse
          ? ((p = "unshift"),
            (m = -1),
            (t = 0),
            (f = n - 1),
            (h = l - 1),
            (w = function () {
              return -1 < f && -1 < h;
            }))
          : ((t = n - 1),
            (w = function () {
              return f < n && h < l;
            }));
        for (; w(); ) {
          var x = c.charAt(f),
            v = k.charAt(h),
            r = g.translation[x];
          if (r)
            v.match(r.pattern)
              ? (b[p](v),
                r.recursive &&
                  (-1 === u ? (u = f) : f === t && (f = u - m),
                  t === u && (f -= m)),
                (f += m))
              : r.optional
              ? ((f += m), (h -= m))
              : r.fallback
              ? (b[p](r.fallback), (f += m), (h -= m))
              : e.invalid.push({ p: h, v: v, e: r.pattern }),
              (h += m);
          else {
            if (!a) b[p](x);
            v === x && (h += m);
            f += m;
          }
        }
        a = c.charAt(t);
        n !== l + 1 || g.translation[a] || b.push(a);
        return b.join("");
      },
      callbacks: function (b) {
        var g = e.val(),
          l = g !== k,
          f = [g, b, a, d],
          n = function (a, b, c) {
            "function" === typeof d[a] && b && d[a].apply(this, c);
          };
        n("onChange", !0 === l, f);
        n("onKeyPress", !0 === l, f);
        n("onComplete", g.length === c.length, f);
        n("onInvalid", 0 < e.invalid.length, [g, b, a, e.invalid, d]);
      },
    };
    g.mask = c;
    g.options = d;
    g.remove = function () {
      var b = e.getCaret();
      e.destroyEvents();
      e.val(g.getCleanVal());
      e.setCaret(b - e.getMCharsBeforeCount(b));
      return a;
    };
    g.getCleanVal = function () {
      return e.getMasked(!0);
    };
    g.init = function (c) {
      c = c || !1;
      d = d || {};
      g.byPassKeys = b.jMaskGlobals.byPassKeys;
      g.translation = b.jMaskGlobals.translation;
      g.translation = b.extend({}, g.translation, d.translation);
      g = b.extend(!0, {}, g, d);
      l = e.getRegexMask();
      !1 === c
        ? (d.placeholder && a.attr("placeholder", d.placeholder),
          b("input").length &&
            !1 === "oninput" in b("input")[0] &&
            "on" === a.attr("autocomplete") &&
            a.attr("autocomplete", "off"),
          e.destroyEvents(),
          e.events(),
          (c = e.getCaret()),
          e.val(e.getMasked()),
          e.setCaret(c + e.getMCharsBeforeCount(c, !0)))
        : (e.events(), e.val(e.getMasked()));
    };
    g.init(!a.is("input"));
  };
  b.maskWatchers = {};
  var A = function () {
      var a = b(this),
        c = {},
        d = a.attr("data-mask");
      a.attr("data-mask-reverse") && (c.reverse = !0);
      a.attr("data-mask-clearifnotmatch") && (c.clearIfNotMatch = !0);
      "true" === a.attr("data-mask-selectonfocus") && (c.selectOnFocus = !0);
      if (z(a, d, c)) return a.data("mask", new y(this, d, c));
    },
    z = function (a, c, d) {
      d = d || {};
      var g = b(a).data("mask"),
        k = JSON.stringify;
      a = b(a).val() || b(a).text();
      try {
        return (
          "function" === typeof c && (c = c(a)),
          "object" !== typeof g || k(g.options) !== k(d) || g.mask !== c
        );
      } catch (l) {}
    };
  b.fn.mask = function (a, c) {
    c = c || {};
    var d = this.selector,
      g = b.jMaskGlobals,
      k = b.jMaskGlobals.watchInterval,
      l = function () {
        if (z(this, a, c)) return b(this).data("mask", new y(this, a, c));
      };
    b(this).each(l);
    d &&
      "" !== d &&
      g.watchInputs &&
      (clearInterval(b.maskWatchers[d]),
      (b.maskWatchers[d] = setInterval(function () {
        b(document).find(d).each(l);
      }, k)));
    return this;
  };
  b.fn.unmask = function () {
    clearInterval(b.maskWatchers[this.selector]);
    delete b.maskWatchers[this.selector];
    return this.each(function () {
      var a = b(this).data("mask");
      a && a.remove().removeData("mask");
    });
  };
  b.fn.cleanVal = function () {
    return this.data("mask").getCleanVal();
  };
  b.applyDataMask = function (a) {
    a = a || b.jMaskGlobals.maskElements;
    (a instanceof b ? a : b(a)).filter(b.jMaskGlobals.dataMaskAttr).each(A);
  };
  var p = {
    maskElements: "input,td,span,div",
    dataMaskAttr: "*[data-mask]",
    dataMask: !0,
    watchInterval: 300,
    watchInputs: !0,
    watchDataMask: !1,
    byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
    translation: {
      0: { pattern: /\d/ },
      9: { pattern: /\d/, optional: !0 },
      "#": { pattern: /\d/, recursive: !0 },
      A: { pattern: /[a-zA-Z0-9]/ },
      S: { pattern: /[a-zA-Z]/ },
    },
  };
  b.jMaskGlobals = b.jMaskGlobals || {};
  p = b.jMaskGlobals = b.extend(!0, {}, p, b.jMaskGlobals);
  p.dataMask && b.applyDataMask();
  setInterval(function () {
    b.jMaskGlobals.watchDataMask && b.applyDataMask();
  }, p.watchInterval);
});
function getCSRFToken() {
  return getCSRF("csrf-token");
}
function getCSRFName() {
  return getCSRF("csrf-name");
}
function getCSRF(n) {
  return $("meta[name='" + n + "']").attr("content");
}
$(function ($) {
  $.ajaxSetup({
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status == 400) {
        location.reload();
      }
    },
  });
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    if (
      options.url.indexOf("/") === 0 ||
      options.url.indexOf("http://" + window.location.hostname) === 0 ||
      options.url.indexOf("https://" + window.location.hostname) === 0
    ) {
      if (originalOptions.type !== "GET" || options.type !== "GET") {
        if (typeof options.data == "undefined") {
          options.data = getCSRFName() + "=" + getCSRFToken();
        } else if (typeof options.data == "string") {
          if (options.data != "") options.data += "&";
          options.data += getCSRFName() + "=" + getCSRFToken();
        } else {
          options.data[getCSRFName()] = getCSRFToken();
        }
      }
    }
  });
});
!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (d) {
  "use strict";
  var s,
    l = window.Slick || {};
  (s = 0),
    ((l = function (i, e) {
      var t,
        o = this;
      (o.defaults = {
        adaptiveHeight: !1,
        appendArrows: d(i),
        appendDots: d(i),
        arrows: !0,
        arrowsPlacement: null,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" type="button"><span class="slick-prev-icon" aria-hidden="true"></span><span class="slick-sr-only">Previous</span></button>',
        nextArrow:
          '<button class="slick-next" type="button"><span class="slick-next-icon" aria-hidden="true"></span><span class="slick-sr-only">Next</span></button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (i, e) {
          return d(
            '<button type="button"><span class="slick-dot-icon" aria-hidden="true"></span><span class="slick-sr-only">Go to slide ' +
              (e + 1) +
              "</span></button>"
          );
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        infinite: !0,
        initialSlide: 0,
        instructionsText: null,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        playIcon: '<span class="slick-play-icon" aria-hidden="true"></span>',
        pauseIcon: '<span class="slick-pause-icon" aria-hidden="true"></span>',
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        regionLabel: "carousel",
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useAutoplayToggleButton: !0,
        useCSS: !0,
        useGroupRole: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (o.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          $instructionsText: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $pauseButton: null,
          $pauseIcon: null,
          $playIcon: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        d.extend(o, o.initials),
        (o.activeBreakpoint = null),
        (o.animType = null),
        (o.animProp = null),
        (o.breakpoints = []),
        (o.breakpointSettings = []),
        (o.cssTransitions = !1),
        (o.focussed = !1),
        (o.interrupted = !1),
        (o.hidden = "hidden"),
        (o.paused = !0),
        (o.positionProp = null),
        (o.respondTo = null),
        (o.rowCount = 1),
        (o.shouldClick = !0),
        (o.$slider = d(i)),
        (o.$slidesCache = null),
        (o.transformType = null),
        (o.transitionType = null),
        (o.visibilityChange = "visibilitychange"),
        (o.windowWidth = 0),
        (o.windowTimer = null),
        (t = d(i).data("slick") || {}),
        (o.options = d.extend({}, o.defaults, e, t)),
        (o.currentSlide = o.options.initialSlide),
        (o.originalSettings = o.options),
        void 0 !== document.mozHidden
          ? ((o.hidden = "mozHidden"),
            (o.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((o.hidden = "webkitHidden"),
            (o.visibilityChange = "webkitvisibilitychange")),
        (o.autoPlay = d.proxy(o.autoPlay, o)),
        (o.autoPlayClear = d.proxy(o.autoPlayClear, o)),
        (o.autoPlayIterator = d.proxy(o.autoPlayIterator, o)),
        (o.autoPlayToggleHandler = d.proxy(o.autoPlayToggleHandler, o)),
        (o.changeSlide = d.proxy(o.changeSlide, o)),
        (o.clickHandler = d.proxy(o.clickHandler, o)),
        (o.selectHandler = d.proxy(o.selectHandler, o)),
        (o.setPosition = d.proxy(o.setPosition, o)),
        (o.swipeHandler = d.proxy(o.swipeHandler, o)),
        (o.dragHandler = d.proxy(o.dragHandler, o)),
        (o.instanceUid = s++),
        (o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        o.registerBreakpoints(),
        o.init(!0);
    }).prototype.addSlide = l.prototype.slickAdd =
      function (i, e, t) {
        var o = this;
        if ("boolean" == typeof e) (t = e), (e = null);
        else if (e < 0 || e >= o.slideCount) return !1;
        o.unload(),
          "number" == typeof e
            ? 0 === e && 0 === o.$slides.length
              ? d(i).appendTo(o.$slideTrack)
              : t
              ? d(i).insertBefore(o.$slides.eq(e))
              : d(i).insertAfter(o.$slides.eq(e))
            : !0 === t
            ? d(i).prependTo(o.$slideTrack)
            : d(i).appendTo(o.$slideTrack),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          o.$slides.each(function (i, e) {
            d(e).attr("data-slick-index", i),
              d(e).attr("role", "group"),
              d(e).attr("aria-label", "slide " + i);
          }),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (l.prototype.animateHeight = function () {
      var i,
        e = this;
      1 === e.options.slidesToShow &&
        !0 === e.options.adaptiveHeight &&
        !1 === e.options.vertical &&
        ((i = e.$slides.eq(e.currentSlide).outerHeight(!0)),
        e.$list.animate({ height: i }, e.options.speed));
    }),
    (l.prototype.animateSlide = function (i, e) {
      var t = {},
        o = this;
      o.animateHeight(),
        !0 === o.options.rtl && !1 === o.options.vertical && (i = -i),
        !1 === o.transformsEnabled
          ? !1 === o.options.vertical
            ? o.$slideTrack.animate(
                { left: i },
                o.options.speed,
                o.options.easing,
                e
              )
            : o.$slideTrack.animate(
                { top: i },
                o.options.speed,
                o.options.easing,
                e
              )
          : !1 === o.cssTransitions
          ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
            d({ animStart: o.currentLeft }).animate(
              { animStart: i },
              {
                duration: o.options.speed,
                easing: o.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    !1 === o.options.vertical
                      ? (t[o.animType] = "translate(" + i + "px, 0px)")
                      : (t[o.animType] = "translate(0px," + i + "px)"),
                    o.$slideTrack.css(t);
                },
                complete: function () {
                  e && e.call();
                },
              }
            ))
          : (o.applyTransition(),
            (i = Math.ceil(i)),
            !1 === o.options.vertical
              ? (t[o.animType] = "translate3d(" + i + "px, 0px, 0px)")
              : (t[o.animType] = "translate3d(0px," + i + "px, 0px)"),
            o.$slideTrack.css(t),
            e &&
              setTimeout(function () {
                o.disableTransition(), e.call();
              }, o.options.speed));
    }),
    (l.prototype.getNavTarget = function () {
      var i = this.options.asNavFor;
      return i && null !== i && (i = d(i).not(this.$slider)), i;
    }),
    (l.prototype.asNavFor = function (e) {
      var i = this.getNavTarget();
      null !== i &&
        "object" == typeof i &&
        i.each(function () {
          var i = d(this).slick("getSlick");
          i.unslicked || i.slideHandler(e, !0);
        });
    }),
    (l.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      !1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (l.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (l.prototype.autoPlayClear = function () {
      this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    }),
    (l.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (l.prototype.autoPlayToggleHandler = function () {
      var i = this;
      i.paused
        ? (i.$playIcon.css("display", "none"),
          i.$pauseIcon.css("display", "inline"),
          i.$pauseButton
            .find(".slick-play-text")
            .attr("style", "display: none"),
          i.$pauseButton.find(".slick-pause-text").removeAttr("style"),
          i.slickPlay())
        : (i.$playIcon.css("display", "inline"),
          i.$pauseIcon.css("display", "none"),
          i.$pauseButton.find(".slick-play-text").removeAttr("style"),
          i.$pauseButton
            .find(".slick-pause-text")
            .attr("style", "display: none"),
          i.slickPause());
    }),
    (l.prototype.buildArrows = function () {
      var i = this;
      if (!0 === i.options.arrows)
        if (
          ((i.$prevArrow = d(i.options.prevArrow).addClass("slick-arrow")),
          (i.$nextArrow = d(i.options.nextArrow).addClass("slick-arrow")),
          i.slideCount > i.options.slidesToShow)
        ) {
          if (i.htmlExpr.test(i.options.prevArrow))
            if (null != i.options.arrowsPlacement)
              switch (i.options.arrowsPlacement) {
                case "beforeSlides":
                case "split":
                  console.log("test"),
                    i.$prevArrow.prependTo(i.options.appendArrows);
                  break;
                case "afterSlides":
                  i.$prevArrow.appendTo(i.options.appendArrows);
              }
            else i.$prevArrow.prependTo(i.options.appendArrows);
          if (i.htmlExpr.test(i.options.nextArrow))
            if (null != i.options.arrowsPlacement)
              switch (i.options.arrowsPlacement) {
                case "beforeSlides":
                  console.log("test2"), i.$prevArrow.after(i.$nextArrow);
                  break;
                case "afterSlides":
                case "split":
                  i.$nextArrow.appendTo(i.options.appendArrows);
              }
            else i.$nextArrow.appendTo(i.options.appendArrows);
          !0 !== i.options.infinite &&
            i.$prevArrow.addClass("slick-disabled").prop("disabled", !0);
        } else
          i.$prevArrow
            .add(i.$nextArrow)
            .addClass("slick-hidden")
            .prop("disabled", !0);
    }),
    (l.prototype.buildDots = function () {
      var i,
        e,
        t = this;
      if (!0 === t.options.dots && t.slideCount > t.options.slidesToShow) {
        for (
          t.$slider.addClass("slick-dotted"),
            e = d("<ul />").addClass(t.options.dotsClass),
            i = 0;
          i <= t.getDotCount();
          i += 1
        )
          e.append(d("<li />").append(t.options.customPaging.call(this, t, i)));
        (t.$dots = e.appendTo(t.options.appendDots)),
          t.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (l.prototype.buildOut = function () {
      var t = this;
      (t.$slides = t.$slider
        .children(t.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (t.slideCount = t.$slides.length),
        t.$slides.each(function (i, e) {
          d(e)
            .attr("data-slick-index", i)
            .data("originalStyling", d(e).attr("style") || ""),
            t.options.useGroupRole &&
              d(e)
                .attr("role", "group")
                .attr("aria-label", "slide " + (i + 1));
        }),
        t.$slider.addClass("slick-slider"),
        t.$slider.attr("role", "region"),
        t.$slider.attr("aria-label", t.options.regionLabel),
        (t.$slideTrack =
          0 === t.slideCount
            ? d('<div class="slick-track"/>').appendTo(t.$slider)
            : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        t.$slideTrack.css("opacity", 0),
        (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) ||
          (t.options.slidesToScroll = 1),
        d("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
        t.setupInfinite(),
        t.buildArrows(),
        t.buildDots(),
        t.updateDots(),
        t.setSlideClasses(
          "number" == typeof t.currentSlide ? t.currentSlide : 0
        ),
        !0 === t.options.draggable && t.$list.addClass("draggable"),
        t.options.autoplay &&
          t.options.useAutoplayToggleButton &&
          ((t.$pauseIcon = d(t.options.pauseIcon).attr("aria-hidden", !0)),
          (t.$playIcon = d(t.options.playIcon).attr("aria-hidden", !0)),
          (t.$pauseButton = d(
            '<button type="button" class="slick-autoplay-toggle-button">'
          )),
          t.$pauseButton.append(t.$pauseIcon),
          t.$pauseButton.append(t.$playIcon.css("display", "none")),
          t.$pauseButton.append(
            d('<span class="slick-pause-text slick-sr-only">Pause</span>')
          ),
          t.$pauseButton.append(
            d(
              '<span class="slick-play-text slick-sr-only" style="display: none">Play</span>'
            )
          ),
          t.$pauseButton.prependTo(t.$slider)),
        null != t.options.instructionsText &&
          "" != t.options.instructionsText &&
          ((t.$instructionsText = d(
            '<p class="slick-instructions slick-sr-only">' +
              t.options.instructionsText +
              "</p>"
          )),
          t.$instructionsText.prependTo(t.$slider));
    }),
    (l.prototype.buildRows = function () {
      var i,
        e,
        t,
        o = this,
        s = document.createDocumentFragment(),
        n = o.$slider.children();
      if (0 < o.options.rows) {
        for (
          t = o.options.slidesPerRow * o.options.rows,
            e = Math.ceil(n.length / t),
            i = 0;
          i < e;
          i++
        ) {
          for (
            var l = document.createElement("div"), r = 0;
            r < o.options.rows;
            r++
          ) {
            for (
              var a = document.createElement("div"), d = 0;
              d < o.options.slidesPerRow;
              d++
            ) {
              var p = i * t + (r * o.options.slidesPerRow + d);
              n.get(p) && a.appendChild(n.get(p));
            }
            l.appendChild(a);
          }
          s.appendChild(l);
        }
        o.$slider.empty().append(s),
          o.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / o.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (l.prototype.checkResponsive = function (i, e) {
      var t,
        o,
        s,
        n = this,
        l = !1,
        r = n.$slider.width(),
        a = window.innerWidth || d(window).width();
      if (
        ("window" === n.respondTo
          ? (s = a)
          : "slider" === n.respondTo
          ? (s = r)
          : "min" === n.respondTo && (s = Math.min(a, r)),
        n.options.responsive &&
          n.options.responsive.length &&
          null !== n.options.responsive)
      ) {
        for (t in ((o = null), n.breakpoints))
          n.breakpoints.hasOwnProperty(t) &&
            (!1 === n.originalSettings.mobileFirst
              ? s < n.breakpoints[t] && (o = n.breakpoints[t])
              : s > n.breakpoints[t] && (o = n.breakpoints[t]));
        null !== o
          ? (null !== n.activeBreakpoint && o === n.activeBreakpoint && !e) ||
            ((n.activeBreakpoint = o),
            "unslick" === n.breakpointSettings[o]
              ? n.unslick(o)
              : ((n.options = d.extend(
                  {},
                  n.originalSettings,
                  n.breakpointSettings[o]
                )),
                !0 === i && (n.currentSlide = n.options.initialSlide),
                n.refresh(i)),
            (l = o))
          : null !== n.activeBreakpoint &&
            ((n.activeBreakpoint = null),
            (n.options = n.originalSettings),
            !0 === i && (n.currentSlide = n.options.initialSlide),
            n.refresh(i),
            (l = o)),
          i || !1 === l || n.$slider.trigger("breakpoint", [n, l]);
      }
    }),
    (l.prototype.changeSlide = function (i, e) {
      var t,
        o,
        s = this,
        n = d(i.currentTarget);
      switch (
        (n.is("a") && i.preventDefault(),
        n.is("li") || (n = n.closest("li")),
        (t =
          s.slideCount % s.options.slidesToScroll != 0
            ? 0
            : (s.slideCount - s.currentSlide) % s.options.slidesToScroll),
        i.data.message)
      ) {
        case "previous":
          (o = 0 == t ? s.options.slidesToScroll : s.options.slidesToShow - t),
            s.slideCount > s.options.slidesToShow &&
              s.slideHandler(s.currentSlide - o, !1, e);
          break;
        case "next":
          (o = 0 == t ? s.options.slidesToScroll : t),
            s.slideCount > s.options.slidesToShow &&
              s.slideHandler(s.currentSlide + o, !1, e);
          break;
        case "index":
          var l =
            0 === i.data.index
              ? 0
              : i.data.index || n.index() * s.options.slidesToScroll;
          s.slideHandler(s.checkNavigable(l), !1, e),
            n.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (l.prototype.checkNavigable = function (i) {
      var e = this.getNavigableIndexes(),
        t = 0;
      if (i > e[e.length - 1]) i = e[e.length - 1];
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t;
            break;
          }
          t = e[o];
        }
      return i;
    }),
    (l.prototype.cleanUpEvents = function () {
      var i = this;
      i.options.autoplay &&
        i.options.useAutoplayToggleButton &&
        i.$pauseButton.off("click.slick", i.autoPlayToggleHandler),
        i.options.dots &&
          null !== i.$dots &&
          d("li", i.$dots)
            .off("click.slick", i.changeSlide)
            .off("mouseenter.slick", d.proxy(i.interrupt, i, !0))
            .off("mouseleave.slick", d.proxy(i.interrupt, i, !1)),
        i.$slider.off("focus.slick blur.slick"),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide),
          i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide)),
        i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler),
        i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler),
        i.$list.off("touchend.slick mouseup.slick", i.swipeHandler),
        i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler),
        i.$list.off("click.slick", i.clickHandler),
        d(document).off(i.visibilityChange, i.visibility),
        i.cleanUpSlideEvents(),
        d(window).off(
          "orientationchange.slick.slick-" + i.instanceUid,
          i.orientationChange
        ),
        d(window).off("resize.slick.slick-" + i.instanceUid, i.resize),
        d("[draggable!=true]", i.$slideTrack).off(
          "dragstart",
          i.preventDefault
        ),
        d(window).off("load.slick.slick-" + i.instanceUid, i.setPosition);
    }),
    (l.prototype.cleanUpSlideEvents = function () {
      var i = this;
      i.$list.off("mouseenter.slick", d.proxy(i.interrupt, i, !0)),
        i.$list.off("mouseleave.slick", d.proxy(i.interrupt, i, !1));
    }),
    (l.prototype.cleanUpRows = function () {
      var i;
      0 < this.options.rows &&
        ((i = this.$slides.children().children()).removeAttr("style"),
        this.$slider.empty().append(i));
    }),
    (l.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (l.prototype.destroy = function (i) {
      var e = this;
      e.autoPlayClear(),
        (e.touchObject = {}),
        e.cleanUpEvents(),
        d(".slick-cloned", e.$slider).detach(),
        e.options.autoplay &&
          e.options.useAutoplayToggleButton &&
          e.$pauseButton.remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.$prevArrow.length &&
          (e.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .prop("disabled", !1)
            .css("display", ""),
          e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()),
        e.$nextArrow &&
          e.$nextArrow.length &&
          (e.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .prop("disabled", !1)
            .css("display", ""),
          e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()),
        e.$slides &&
          (e.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              d(this).attr("style", d(this).data("originalStyling"));
            }),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slideTrack.detach(),
          e.$list.detach(),
          e.$slider.append(e.$slides)),
        e.cleanUpRows(),
        e.$slider.removeClass("slick-slider"),
        e.$slider.removeClass("slick-initialized"),
        e.$slider.removeClass("slick-dotted"),
        (e.unslicked = !0),
        i || e.$slider.trigger("destroy", [e]);
    }),
    (l.prototype.disableTransition = function (i) {
      var e = {};
      (e[this.transitionType] = ""),
        !1 === this.options.fade
          ? this.$slideTrack.css(e)
          : this.$slides.eq(i).css(e);
    }),
    (l.prototype.fadeSlide = function (i, e) {
      var t = this;
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (l.prototype.fadeSlideOut = function (i) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (l.prototype.filterSlides = l.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (l.prototype.focusHandler = function () {
      var t = this;
      t.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick", "*", function (i) {
          var e = d(this);
          setTimeout(function () {
            t.options.pauseOnFocus &&
              e.is(":focus") &&
              ((t.focussed = !0), t.autoPlay());
          }, 0);
        })
        .on("blur.slick", "*", function (i) {
          d(this);
          t.options.pauseOnFocus && ((t.focussed = !1), t.autoPlay());
        });
    }),
    (l.prototype.getCurrent = l.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (l.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (!0 === i.options.centerMode) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (l.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        l = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (l = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (l =
                i > n.slideCount
                  ? ((n.slideOffset =
                      (n.options.slidesToShow - (i - n.slideCount)) *
                      n.slideWidth *
                      -1),
                    (n.options.slidesToShow - (i - n.slideCount)) * t * -1)
                  : ((n.slideOffset =
                      (n.slideCount % n.options.slidesToScroll) *
                      n.slideWidth *
                      -1),
                    (n.slideCount % n.options.slidesToScroll) * t * -1)))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (l = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow && (l = n.slideOffset = 0),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + l),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (l.prototype.getOption = l.prototype.slickGetOption =
      function (i) {
        return this.options[i];
      }),
    (l.prototype.getNavigableIndexes = function () {
      for (
        var i = this,
          e = 0,
          t = 0,
          o = [],
          s =
            !1 === i.options.infinite
              ? i.slideCount
              : ((e = -1 * i.options.slidesToScroll),
                (t = -1 * i.options.slidesToScroll),
                2 * i.slideCount);
        e < s;

      )
        o.push(e),
          (e = t + i.options.slidesToScroll),
          (t +=
            i.options.slidesToScroll <= i.options.slidesToShow
              ? i.options.slidesToScroll
              : i.options.slidesToShow);
      return o;
    }),
    (l.prototype.getSlick = function () {
      return this;
    }),
    (l.prototype.getSlideCount = function () {
      var s,
        n = this,
        i = !0 === n.options.centerMode ? Math.floor(n.$list.width() / 2) : 0,
        l = -1 * n.swipeLeft + i;
      return !0 === n.options.swipeToSlide
        ? (n.$slideTrack.find(".slick-slide").each(function (i, e) {
            var t = d(e).outerWidth(),
              o = e.offsetLeft;
            if ((!0 !== n.options.centerMode && (o += t / 2), l < o + t))
              return (s = e), !1;
          }),
          Math.abs(d(s).attr("data-slick-index") - n.currentSlide) || 1)
        : n.options.slidesToScroll;
    }),
    (l.prototype.goTo = l.prototype.slickGoTo =
      function (i, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (l.prototype.init = function (i) {
      var e = this;
      d(e.$slider).hasClass("slick-initialized") ||
        (d(e.$slider).addClass("slick-initialized"),
        e.buildRows(),
        e.buildOut(),
        e.setProps(),
        e.startLoad(),
        e.loadSlider(),
        e.initializeEvents(),
        e.updateArrows(),
        e.updateDots(),
        e.checkResponsive(!0),
        e.focusHandler()),
        i && e.$slider.trigger("init", [e]),
        e.options.autoplay && ((e.paused = !1), e.autoPlay()),
        e.updateSlideVisibility(),
        null != e.options.accessibility &&
          console.warn("accessibility setting is no longer supported."),
        null != e.options.focusOnChange &&
          console.warn("focusOnChange is no longer supported."),
        null != e.options.focusOnSelect &&
          console.warn("focusOnSelect is no longer supported.");
    }),
    (l.prototype.initArrowEvents = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide));
    }),
    (l.prototype.initDotEvents = function () {
      var i = this;
      !0 === i.options.dots &&
        i.slideCount > i.options.slidesToShow &&
        d("li", i.$dots).on("click.slick", { message: "index" }, i.changeSlide),
        !0 === i.options.dots &&
          !0 === i.options.pauseOnDotsHover &&
          i.slideCount > i.options.slidesToShow &&
          d("li", i.$dots)
            .on("mouseenter.slick", d.proxy(i.interrupt, i, !0))
            .on("mouseleave.slick", d.proxy(i.interrupt, i, !1));
    }),
    (l.prototype.initSlideEvents = function () {
      var i = this;
      i.options.pauseOnHover &&
        (i.$list.on("mouseenter.slick", d.proxy(i.interrupt, i, !0)),
        i.$list.on("mouseleave.slick", d.proxy(i.interrupt, i, !1)));
    }),
    (l.prototype.initializeEvents = function () {
      var i = this;
      i.initArrowEvents(),
        i.initDotEvents(),
        i.initSlideEvents(),
        i.options.autoplay &&
          i.options.useAutoplayToggleButton &&
          i.$pauseButton.on("click.slick", i.autoPlayToggleHandler),
        i.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          i.swipeHandler
        ),
        i.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          i.swipeHandler
        ),
        i.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          i.swipeHandler
        ),
        i.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          i.swipeHandler
        ),
        i.$list.on("click.slick", i.clickHandler),
        d(document).on(i.visibilityChange, d.proxy(i.visibility, i)),
        d(window).on(
          "orientationchange.slick.slick-" + i.instanceUid,
          d.proxy(i.orientationChange, i)
        ),
        d(window).on(
          "resize.slick.slick-" + i.instanceUid,
          d.proxy(i.resize, i)
        ),
        d("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault),
        d(window).on("load.slick.slick-" + i.instanceUid, i.setPosition),
        d(i.setPosition);
    }),
    (l.prototype.initUI = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (l.prototype.lazyLoad = function () {
      var i,
        e,
        t,
        n = this;
      function o(i) {
        d("img[data-lazy]", i).each(function () {
          var i = d(this),
            e = d(this).attr("data-lazy"),
            t = d(this).attr("data-srcset"),
            o = d(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            s = document.createElement("img");
          (s.onload = function () {
            i.animate({ opacity: 0 }, 100, function () {
              t && (i.attr("srcset", t), o && i.attr("sizes", o)),
                i.attr("src", e).animate({ opacity: 1 }, 200, function () {
                  i.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                n.$slider.trigger("lazyLoaded", [n, i, e]);
            });
          }),
            (s.onerror = function () {
              i
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                n.$slider.trigger("lazyLoadError", [n, i, e]);
            }),
            (s.src = e);
        });
      }
      if (
        (!0 === n.options.centerMode
          ? (t =
              !0 === n.options.infinite
                ? (e = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                  n.options.slidesToShow +
                  2
                : ((e = Math.max(
                    0,
                    n.currentSlide - (n.options.slidesToShow / 2 + 1)
                  )),
                  n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((e = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (t = Math.ceil(e + n.options.slidesToShow)),
            !0 === n.options.fade && (0 < e && e--, t <= n.slideCount && t++)),
        (i = n.$slider.find(".slick-slide").slice(e, t)),
        "anticipated" === n.options.lazyLoad)
      )
        for (
          var s = e - 1, l = t, r = n.$slider.find(".slick-slide"), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          s < 0 && (s = n.slideCount - 1),
            (i = (i = i.add(r.eq(s))).add(r.eq(l))),
            s--,
            l++;
      o(i),
        n.slideCount <= n.options.slidesToShow
          ? o(n.$slider.find(".slick-slide"))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? o(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            o(
              n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)
            );
    }),
    (l.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (l.prototype.next = l.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (l.prototype.orientationChange = function () {
      this.checkResponsive(), this.setPosition();
    }),
    (l.prototype.pause = l.prototype.slickPause =
      function () {
        this.autoPlayClear(), (this.paused = !0);
      }),
    (l.prototype.play = l.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (l.prototype.postSlide = function (i) {
      var e = this;
      e.unslicked ||
        (e.$slider.trigger("afterChange", [e, i]),
        (e.animating = !1),
        e.slideCount > e.options.slidesToShow && e.setPosition(),
        (e.swipeLeft = null),
        e.options.autoplay && e.autoPlay(),
        e.updateSlideVisibility());
    }),
    (l.prototype.prev = l.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (l.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (l.prototype.progressiveLazyLoad = function (i) {
      i = i || 1;
      var e,
        t,
        o,
        s,
        n,
        l = this,
        r = d("img[data-lazy]", l.$slider);
      r.length
        ? ((e = r.first()),
          (t = e.attr("data-lazy")),
          (o = e.attr("data-srcset")),
          (s = e.attr("data-sizes") || l.$slider.attr("data-sizes")),
          ((n = document.createElement("img")).onload = function () {
            o && (e.attr("srcset", o), s && e.attr("sizes", s)),
              e
                .attr("src", t)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, e, t]),
              l.progressiveLazyLoad();
          }),
          (n.onerror = function () {
            i < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(i + 1);
                }, 500)
              : (e
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, e, t]),
                l.progressiveLazyLoad());
          }),
          (n.src = t))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (l.prototype.refresh = function (i) {
      var e,
        t = this,
        o = t.slideCount - t.options.slidesToShow;
      !t.options.infinite && t.currentSlide > o && (t.currentSlide = o),
        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
        (e = t.currentSlide),
        t.destroy(!0),
        d.extend(t, t.initials, { currentSlide: e }),
        t.init(),
        i || t.changeSlide({ data: { message: "index", index: e } }, !1);
    }),
    (l.prototype.registerBreakpoints = function () {
      var i,
        e,
        t,
        o = this,
        s = o.options.responsive || null;
      if ("array" === d.type(s) && s.length) {
        for (i in ((o.respondTo = o.options.respondTo || "window"), s))
          if (((t = o.breakpoints.length - 1), s.hasOwnProperty(i))) {
            for (e = s[i].breakpoint; 0 <= t; )
              o.breakpoints[t] &&
                o.breakpoints[t] === e &&
                o.breakpoints.splice(t, 1),
                t--;
            o.breakpoints.push(e), (o.breakpointSettings[e] = s[i].settings);
          }
        o.breakpoints.sort(function (i, e) {
          return o.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (l.prototype.reinit = function () {
      var i = this;
      (i.$slides = i.$slideTrack
        .children(i.options.slide)
        .addClass("slick-slide")),
        (i.slideCount = i.$slides.length),
        i.currentSlide >= i.slideCount &&
          0 !== i.currentSlide &&
          (i.currentSlide = i.currentSlide - i.options.slidesToScroll),
        i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0),
        i.registerBreakpoints(),
        i.setProps(),
        i.setupInfinite(),
        i.buildArrows(),
        i.updateArrows(),
        i.initArrowEvents(),
        i.buildDots(),
        i.updateDots(),
        i.initDotEvents(),
        i.cleanUpSlideEvents(),
        i.initSlideEvents(),
        i.checkResponsive(!1, !0),
        i.setSlideClasses(
          "number" == typeof i.currentSlide ? i.currentSlide : 0
        ),
        i.setPosition(),
        i.focusHandler(),
        (i.paused = !i.options.autoplay),
        i.autoPlay(),
        i.$slider.trigger("reInit", [i]);
    }),
    (l.prototype.resize = function () {
      var i = this;
      d(window).width() !== i.windowWidth &&
        (clearTimeout(i.windowDelay),
        (i.windowDelay = window.setTimeout(function () {
          (i.windowWidth = d(window).width()),
            i.checkResponsive(),
            i.unslicked || i.setPosition();
        }, 50)));
    }),
    (l.prototype.removeSlide = l.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        if (
          ((i =
            "boolean" == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --i
              : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (l.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      !0 === o.options.rtl && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled ||
          (!(s = {}) === o.cssTransitions
            ? (s[o.animType] = "translate(" + e + ", " + t + ")")
            : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)")),
        o.$slideTrack.css(s);
    }),
    (l.prototype.setDimensions = function () {
      var i = this;
      !1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : !0 === i.options.variableWidth
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      !1 === i.options.variableWidth &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (l.prototype.setFade = function () {
      var t,
        o = this;
      o.$slides.each(function (i, e) {
        (t = o.slideWidth * i * -1),
          !0 === o.options.rtl
            ? d(e).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0,
              })
            : d(e).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0,
              });
      }),
        o.$slides
          .eq(o.currentSlide)
          .css({ zIndex: o.options.zIndex - 1, opacity: 1 });
    }),
    (l.prototype.setHeight = function () {
      var i,
        e = this;
      1 === e.options.slidesToShow &&
        !0 === e.options.adaptiveHeight &&
        !1 === e.options.vertical &&
        ((i = e.$slides.eq(e.currentSlide).outerHeight(!0)),
        e.$list.css("height", i));
    }),
    (l.prototype.setOption = l.prototype.slickSetOption =
      function () {
        var i,
          e,
          t,
          o,
          s,
          n = this,
          l = !1;
        if (
          ("object" === d.type(arguments[0])
            ? ((t = arguments[0]), (l = arguments[1]), (s = "multiple"))
            : "string" === d.type(arguments[0]) &&
              ((o = arguments[1]),
              (l = arguments[2]),
              "responsive" === (t = arguments[0]) &&
              "array" === d.type(arguments[1])
                ? (s = "responsive")
                : void 0 !== arguments[1] && (s = "single")),
          "single" === s)
        )
          n.options[t] = o;
        else if ("multiple" === s)
          d.each(t, function (i, e) {
            n.options[i] = e;
          });
        else if ("responsive" === s)
          for (e in o)
            if ("array" !== d.type(n.options.responsive))
              n.options.responsive = [o[e]];
            else {
              for (i = n.options.responsive.length - 1; 0 <= i; )
                n.options.responsive[i].breakpoint === o[e].breakpoint &&
                  n.options.responsive.splice(i, 1),
                  i--;
              n.options.responsive.push(o[e]);
            }
        l && (n.unload(), n.reinit());
      }),
    (l.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (l.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType);
    }),
    (l.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        l = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")
          .attr("aria-label", function () {
            return d(this).attr("aria-label").replace(" (centered)", "");
          });
      n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode
          ? ((o = n.options.slidesToShow % 2 == 0 ? 1 : 0),
            (s = Math.floor(n.options.slidesToShow / 2)),
            !0 === n.options.infinite &&
              (s <= i && i <= n.slideCount - 1 - s
                ? n.$slides
                    .slice(i - s + o, i + s + 1)
                    .addClass("slick-active")
                    .removeAttr("aria-hidden")
                : ((e = n.options.slidesToShow + i),
                  l
                    .slice(e - s + 1 + o, e + s + 2)
                    .addClass("slick-active")
                    .removeAttr("aria-hidden")),
              0 === i
                ? l
                    .eq(n.options.slidesToShow + n.slideCount + 1)
                    .addClass("slick-center")
                    .attr("aria-label", function () {
                      return d(this).attr("aria-label") + " (centered)";
                    })
                : i === n.slideCount - 1 &&
                  l
                    .eq(n.options.slidesToShow)
                    .addClass("slick-center")
                    .attr("aria-label", function () {
                      return d(this).attr("aria-label") + " (centered)";
                    })),
            n.$slides
              .eq(i)
              .addClass("slick-center")
              .attr("aria-label", function () {
                return d(this).attr("aria-label") + " (centered)";
              }))
          : 0 <= i && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .removeAttr("aria-hidden")
          : l.length <= n.options.slidesToShow
          ? l.addClass("slick-active").removeAttr("aria-hidden")
          : ((t = n.slideCount % n.options.slidesToShow),
            (e = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? l
                  .slice(e - (n.options.slidesToShow - t), e + t)
                  .addClass("slick-active")
                  .removeAttr("aria-hidden")
              : l
                  .slice(e, e + n.options.slidesToShow)
                  .addClass("slick-active")
                  .removeAttr("aria-hidden")),
        ("ondemand" !== n.options.lazyLoad &&
          "anticipated" !== n.options.lazyLoad) ||
          n.lazyLoad();
    }),
    (l.prototype.setupInfinite = function () {
      var i,
        e,
        t,
        o = this;
      if (
        (!0 === o.options.fade && (o.options.centerMode = !1),
        !0 === o.options.infinite &&
          !1 === o.options.fade &&
          ((e = null), o.slideCount > o.options.slidesToShow))
      ) {
        for (
          t =
            !0 === o.options.centerMode
              ? o.options.slidesToShow + 1
              : o.options.slidesToShow,
            i = o.slideCount;
          i > o.slideCount - t;
          --i
        )
          (e = i - 1),
            d(o.$slides[e])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", e - o.slideCount)
              .prependTo(o.$slideTrack)
              .addClass("slick-cloned");
        for (i = 0; i < t + o.slideCount; i += 1)
          (e = i),
            d(o.$slides[e])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", e + o.slideCount)
              .appendTo(o.$slideTrack)
              .addClass("slick-cloned");
        o.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            d(this).attr("id", "");
          });
      }
    }),
    (l.prototype.interrupt = function (i) {
      i || this.autoPlay(), (this.interrupted = i);
    }),
    (l.prototype.selectHandler = function (i) {
      var e = d(i.target).is(".slick-slide")
          ? d(i.target)
          : d(i.target).parents(".slick-slide"),
        t = (t = parseInt(e.attr("data-slick-index"))) || 0;
      this.slideCount <= this.options.slidesToShow
        ? this.slideHandler(t, !1, !0)
        : this.slideHandler(t);
    }),
    (l.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        l,
        r,
        a,
        d = this;
      if (
        ((e = e || !1),
        !(
          (!0 === d.animating && !0 === d.options.waitForAnimate) ||
          (!0 === d.options.fade && d.currentSlide === i)
        ))
      )
        if (
          (!1 === e && d.asNavFor(i),
          (o = i),
          (r = d.getLeft(o)),
          (l = d.getLeft(d.currentSlide)),
          (d.currentLeft = null === d.swipeLeft ? l : d.swipeLeft),
          !1 === d.options.infinite &&
            !1 === d.options.centerMode &&
            (i < 0 || i > d.getDotCount() * d.options.slidesToScroll))
        )
          !1 === d.options.fade &&
            ((o = d.currentSlide),
            !0 !== t && d.slideCount > d.options.slidesToShow
              ? d.animateSlide(l, function () {
                  d.postSlide(o);
                })
              : d.postSlide(o));
        else if (
          !1 === d.options.infinite &&
          !0 === d.options.centerMode &&
          (i < 0 || i > d.slideCount - d.options.slidesToScroll)
        )
          !1 === d.options.fade &&
            ((o = d.currentSlide),
            !0 !== t && d.slideCount > d.options.slidesToShow
              ? d.animateSlide(l, function () {
                  d.postSlide(o);
                })
              : d.postSlide(o));
        else {
          if (
            (d.options.autoplay && clearInterval(d.autoPlayTimer),
            (s =
              o < 0
                ? d.slideCount % d.options.slidesToScroll != 0
                  ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                  : d.slideCount + o
                : o >= d.slideCount
                ? d.slideCount % d.options.slidesToScroll != 0
                  ? 0
                  : o - d.slideCount
                : o),
            (d.animating = !0),
            d.$slider.trigger("beforeChange", [d, d.currentSlide, s]),
            (n = d.currentSlide),
            (d.currentSlide = s),
            d.setSlideClasses(d.currentSlide),
            d.options.asNavFor &&
              (a = (a = d.getNavTarget()).slick("getSlick")).slideCount <=
                a.options.slidesToShow &&
              a.setSlideClasses(d.currentSlide),
            d.updateDots(),
            d.updateArrows(),
            !0 === d.options.fade)
          )
            return (
              !0 !== t
                ? (d.fadeSlideOut(n),
                  d.fadeSlide(s, function () {
                    d.postSlide(s);
                  }))
                : d.postSlide(s),
              void d.animateHeight()
            );
          !0 !== t && d.slideCount > d.options.slidesToShow
            ? d.animateSlide(r, function () {
                d.postSlide(s);
              })
            : d.postSlide(s);
        }
    }),
    (l.prototype.startLoad = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (l.prototype.swipeDirection = function () {
      var i = this,
        e = i.touchObject.startX - i.touchObject.curX,
        t = i.touchObject.startY - i.touchObject.curY,
        o = Math.atan2(t, e),
        s = Math.round((180 * o) / Math.PI);
      return (
        s < 0 && (s = 360 - Math.abs(s)),
        (s <= 45 && 0 <= s) || (s <= 360 && 315 <= s)
          ? !1 === i.options.rtl
            ? "left"
            : "right"
          : 135 <= s && s <= 225
          ? !1 === i.options.rtl
            ? "right"
            : "left"
          : !0 === i.options.verticalSwiping
          ? 35 <= s && s <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (l.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1);
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(10 < o.touchObject.swipeLength)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (l.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ("ontouchend" in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (l.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        l = this,
        r = void 0 !== i.originalEvent ? i.originalEvent.touches : null;
      return (
        !(!l.dragging || l.scrolling || (r && 1 !== r.length)) &&
        ((e = l.getLeft(l.currentSlide)),
        (l.touchObject.curX = void 0 !== r ? r[0].pageX : i.clientX),
        (l.touchObject.curY = void 0 !== r ? r[0].pageY : i.clientY),
        (l.touchObject.swipeLength = Math.round(
          Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
        )),
        (n = Math.round(
          Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
        )),
        !l.options.verticalSwiping && !l.swiping && 4 < n
          ? !(l.scrolling = !0)
          : (!0 === l.options.verticalSwiping &&
              (l.touchObject.swipeLength = n),
            (t = l.swipeDirection()),
            void 0 !== i.originalEvent &&
              4 < l.touchObject.swipeLength &&
              ((l.swiping = !0), i.preventDefault()),
            (s =
              (!1 === l.options.rtl ? 1 : -1) *
              (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
            !0 === l.options.verticalSwiping &&
              (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
            (o = l.touchObject.swipeLength),
            (l.touchObject.edgeHit = !1) === l.options.infinite &&
              ((0 === l.currentSlide && "right" === t) ||
                (l.currentSlide >= l.getDotCount() && "left" === t)) &&
              ((o = l.touchObject.swipeLength * l.options.edgeFriction),
              (l.touchObject.edgeHit = !0)),
            !1 === l.options.vertical
              ? (l.swipeLeft = e + o * s)
              : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
            !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
            !0 !== l.options.fade &&
              !1 !== l.options.touchMove &&
              (!0 === l.animating
                ? ((l.swipeLeft = null), !1)
                : void l.setCSS(l.swipeLeft))))
      );
    }),
    (l.prototype.swipeStart = function (i) {
      var e,
        t = this;
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return !(t.touchObject = {});
      void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0);
    }),
    (l.prototype.unfilterSlides = l.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (l.prototype.unload = function () {
      var i = this;
      d(".slick-cloned", i.$slider).remove(),
        i.$dots && i.$dots.remove(),
        i.$prevArrow &&
          i.htmlExpr.test(i.options.prevArrow) &&
          i.$prevArrow.remove(),
        i.$nextArrow &&
          i.htmlExpr.test(i.options.nextArrow) &&
          i.$nextArrow.remove(),
        i.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (l.prototype.unslick = function (i) {
      this.$slider.trigger("unslick", [this, i]), this.destroy();
    }),
    (l.prototype.updateArrows = function () {
      var i = this;
      Math.floor(i.options.slidesToShow / 2);
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        !i.options.infinite &&
        (i.$prevArrow.removeClass("slick-disabled").prop("disabled", !1),
        i.$nextArrow.removeClass("slick-disabled").prop("disabled", !1),
        0 === i.currentSlide
          ? (i.$prevArrow.addClass("slick-disabled").prop("disabled", !0),
            i.$nextArrow.removeClass("slick-disabled").prop("disabled", !1))
          : ((i.currentSlide >= i.slideCount - i.options.slidesToShow &&
              !1 === i.options.centerMode) ||
              (i.currentSlide >= i.slideCount - 1 &&
                !0 === i.options.centerMode)) &&
            (i.$nextArrow.addClass("slick-disabled").prop("disabled", !0),
            i.$prevArrow.removeClass("slick-disabled").prop("disabled", !1)));
    }),
    (l.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots
          .find("li")
          .removeClass("slick-active")
          .find("button")
          .removeAttr("aria-current")
          .end()
          .end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active")
          .find("button")
          .attr("aria-current", !0)
          .end()
          .end());
    }),
    (l.prototype.updateSlideVisibility = function () {
      this.$slideTrack
        .find(".slick-slide")
        .attr("aria-hidden", "true")
        .find("a, input, button, select")
        .attr("tabindex", "-1"),
        this.$slideTrack
          .find(".slick-active")
          .removeAttr("aria-hidden")
          .find("a, input, button, select")
          .removeAttr("tabindex");
    }),
    (l.prototype.visibility = function () {
      this.options.autoplay &&
        (document[this.hidden]
          ? (this.interrupted = !0)
          : (this.interrupted = !1));
    }),
    (d.fn.slick = function () {
      for (
        var i,
          e = this,
          t = arguments[0],
          o = Array.prototype.slice.call(arguments, 1),
          s = e.length,
          n = 0;
        n < s;
        n++
      )
        if (
          ("object" == typeof t || void 0 === t
            ? (e[n].slick = new l(e[n], t))
            : (i = e[n].slick[t].apply(e[n].slick, o)),
          void 0 !== i)
        )
          return i;
      return e;
    });
});
