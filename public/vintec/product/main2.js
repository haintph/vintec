/*!!
 * Matomo - free/libre analytics platform
 *
 * Matomo Tag Manager
 *
 * @link https://matomo.org
 * @source https://github.com/matomo-org/tag-manager/blob/master/js/piwik.js
 * @license https://matomo.org/free-software/bsd/ BSD-3 Clause (also in js/LICENSE.txt)
 */
(function() {
    var b = document;
    var a = window;
    var ignoreGtmDataLayer = false;
    var activelySyncGtmDataLayer = false;
    ;/*!!! previewModeHook */
    ;if (typeof window.MatomoTagManager !== "object") {
        if (typeof window._mtm !== "object") {
            window._mtm = []
        }
        window.MatomoTagManager = (function() {
            var l = new Date().getTime();
            function j() {
                if (window.mtmPreviewWindow && "object" === typeof window.mtmPreviewWindow.mtmLogs) {
                    var H = new Date();
                    var J = [];
                    for (var I = 0; I < arguments.length; I++) {
                        J.push(JSON.stringify(arguments[I], function(i, K) {
                            if (typeof K === "object" && K instanceof Node) {
                                return K.nodeName
                            } else {
                                return K
                            }
                        }))
                    }
                    window.mtmPreviewWindow.mtmLogs.push({
                        time: H.toLocaleTimeString() + "." + H.getMilliseconds(),
                        messages: J
                    })
                }
            }
            function d(H) {
                if (window.mtmPreviewWindow && "object" === typeof window.mtmPreviewWindow.mtmEvents && H) {
                    var i = new Date();
                    H.time = i.toLocaleTimeString() + "." + i.getMilliseconds();
                    window.mtmPreviewWindow.mtmEvents.push(H)
                }
            }
            var z = {
                enabled: !!window.mtmPreviewWindow,
                log: function() {
                    j.apply(a, arguments);
                    if (this.enabled && "undefined" !== typeof console && console && console.debug) {
                        console.debug.apply(console, arguments)
                    }
                },
                error: function() {
                    j.apply(a, arguments);
                    if ("undefined" !== typeof console && console && console.error) {
                        console.error.apply(console, arguments)
                    }
                }
            };
            function D(i) {
                z.error(i);
                if (typeof m !== "object" || m.THROW_ERRORS) {
                    throw new Error(i)
                }
            }
            function v(I, K) {
                if (C.isString(I) && I.indexOf(".") !== -1) {
                    var J = I.split(".");
                    var H;
                    for (H = 0; H < J.length; H++) {
                        if (J[H]in K) {
                            K = K[J[H]]
                        } else {
                            return
                        }
                    }
                    return K
                }
            }
            function G(L) {
                var K = "mtm:";
                var H = {};
                function J(O) {
                    return L in a && C.isObject(a[L])
                }
                function N(O) {
                    return J() && C.isFunction(a[L][O])
                }
                function M(Q, O) {
                    if (N("setItem")) {
                        try {
                            a[L].setItem(K + Q, JSON.stringify(O))
                        } catch (P) {}
                    } else {
                        H[Q] = O
                    }
                }
                function I(Q) {
                    if (N("getItem")) {
                        try {
                            var O = a[L].getItem(K + Q);
                            if (O) {
                                O = JSON.parse(O);
                                if (C.isObject(O)) {
                                    return O
                                }
                            }
                        } catch (P) {}
                        return {}
                    } else {
                        if (Q in H) {
                            return H[Q]
                        }
                    }
                }
                function i(P) {
                    if (N("removeItem")) {
                        try {
                            a[L].removeItem(K + P)
                        } catch (O) {}
                    } else {
                        if (P in H) {
                            delete H[P]
                        }
                    }
                }
                this.set = function(S, P, T, O) {
                    var Q = null;
                    if (O) {
                        Q = (new Date().getTime()) + (parseInt(O, 10) * 1000)
                    }
                    var R = I(S);
                    R[P] = {
                        value: T,
                        expire: Q
                    };
                    M(S, R)
                }
                ;
                this.get = function(Q, O) {
                    var P = I(Q);
                    if (P && O in P && "value"in P[O]) {
                        if (P[O].expire && P[O].expire < (new Date().getTime())) {
                            delete P[O];
                            M(Q);
                            return
                        }
                        return P[O].value
                    }
                }
                ;
                this.clearAll = function() {
                    H = {};
                    if (J() && C.isFunction(Object.keys)) {
                        var O = Object.keys(a[L]);
                        if (O) {
                            for (var P = 0; P < O.length; P++) {
                                if (String(O[P]).substr(0, K.length) === K) {
                                    i(String(O[P]).substr(K.length))
                                }
                            }
                        }
                    }
                }
            }
            var y = new G("localStorage");
            var e = new G("sessionStorage");
            var C = {
                _compare: function(K, H, J) {
                    var I = ["equals", "starts_with", "contains", "ends_with"];
                    if (this.indexOfArray(I, J) !== -1) {
                        K = String(K).toLowerCase();
                        H = String(H).toLowerCase()
                    }
                    switch (J) {
                    case "equals":
                        return String(K) === String(H);
                    case "equals_exactly":
                        return String(K) === String(H);
                    case "regexp":
                        return null !== (String(K).match(new RegExp(H)));
                    case "regexp_ignore_case":
                        return null !== (String(K).match(new RegExp(H,"i")));
                    case "lower_than":
                        return K < H;
                    case "lower_than_or_equals":
                        return K <= H;
                    case "greater_than":
                        return K > H;
                    case "greater_than_or_equals":
                        return K >= H;
                    case "contains":
                        return String(K).indexOf(H) !== -1;
                    case "match_css_selector":
                        if (!H || !K) {
                            return false
                        }
                        var i = B.bySelector(H);
                        return C.indexOfArray(i, K) !== -1;
                    case "starts_with":
                        return String(K).indexOf(H) === 0;
                    case "ends_with":
                        return String(K).substring(K.length - H.length, K.length) === H
                    }
                    return false
                },
                compare: function(K, H, I) {
                    var J = String(I).indexOf("not_") === 0;
                    if (J) {
                        I = String(I).substr("not_".length)
                    }
                    var i = this._compare(K, H, I);
                    if (J) {
                        return !i
                    }
                    return i
                },
                trim: function(i) {
                    if (i && String(i) === i) {
                        return i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                    }
                    return i
                },
                isDefined: function(H) {
                    var i = typeof H;
                    return i !== "undefined"
                },
                isFunction: function(i) {
                    return typeof i === "function"
                },
                isObject: function(i) {
                    return typeof i === "object" && i !== null
                },
                isString: function(i) {
                    return typeof i === "string"
                },
                isNumber: function(i) {
                    return typeof i === "number"
                },
                isArray: function(H) {
                    if (!C.isObject(H)) {
                        return false
                    }
                    if ("function" === typeof Array.isArray && Array.isArray) {
                        return Array.isArray(H)
                    }
                    var I = Object.prototype.toString;
                    var i = I.call([]);
                    return I.call(H) === i
                },
                hasProperty: function(i, H) {
                    return Object.prototype.hasOwnProperty.call(i, H)
                },
                indexOfArray: function(J, I) {
                    if (!J) {
                        return -1
                    }
                    if ("function" === typeof J.indexOf && J.indexOf) {
                        return J.indexOf(I)
                    }
                    if (!this.isArray(J)) {
                        return -1
                    }
                    for (var H = 0; H < J.length; H++) {
                        if (J[H] === I) {
                            return H
                        }
                    }
                    return -1
                },
                setMethodWrapIfNeeded: function(H, I, K) {
                    if (!(I in H)) {
                        H[I] = K;
                        return
                    }
                    var J = H[I];
                    if (!m.utils.isFunction(J)) {
                        H[I] = K;
                        return
                    }
                    try {
                        H[I] = function() {
                            try {
                                var L = J.apply(H, [].slice.call(arguments, 0))
                            } catch (M) {
                                K.apply(H, [].slice.call(arguments, 0));
                                throw M
                            }
                            K.apply(H, [].slice.call(arguments, 0));
                            return L
                        }
                    } catch (i) {}
                }
            };
            var u = function() {
                this.values = {};
                this.events = [];
                this.callbacks = [];
                this.reset = function() {
                    this.values = {};
                    this.events = [];
                    this.callbacks = []
                }
                ;
                this.push = function(I) {
                    if (!C.isObject(I)) {
                        z.log("pushed dataLayer value is not an object", I);
                        return
                    }
                    this.events.push(I);
                    var H;
                    for (H in I) {
                        if (C.hasProperty(I, H)) {
                            this.set(H, I[H])
                        }
                    }
                    for (H = 0; H < this.callbacks.length; H++) {
                        if (this.callbacks[H]) {
                            this.callbacks[H](I)
                        }
                    }
                }
                ;
                this.on = function(i) {
                    this.callbacks.push(i);
                    return this.callbacks.length - 1
                }
                ;
                this.off = function(i) {
                    if (i in this.callbacks) {
                        this.callbacks[i] = null
                    }
                }
                ;
                this.set = function(i, H) {
                    this.values[i] = H
                }
                ;
                this.getAllEvents = function(i) {
                    return this.events
                }
                ;
                this.get = function(i) {
                    if (i in this.values) {
                        if (C.isFunction(this.values[i])) {
                            return this.values[i]()
                        } else {
                            if (C.isObject(this.values[i]) && C.isFunction(this.values[i].get)) {
                                return this.values[i].get()
                            }
                        }
                        return this.values[i]
                    }
                    var H = v(i, this.values);
                    if (C.isDefined(H)) {
                        return H
                    }
                }
            };
            var q = new u();
            var F = {
                matchesDateRange: function(I, H, J) {
                    var K = Date.UTC(I.getUTCFullYear(), I.getUTCMonth(), I.getUTCDate(), I.getUTCHours(), I.getUTCMinutes(), I.getUTCSeconds());
                    if (H) {
                        H = String(H).replace(/-/g, "/")
                    }
                    if (J) {
                        J = String(J).replace(/-/g, "/")
                    }
                    var M, i;
                    try {
                        M = this.convertStringToDate(H)
                    } catch (L) {
                        if (H) {
                            D("Invalid startDateTime given")
                        }
                    }
                    try {
                        i = this.convertStringToDate(J)
                    } catch (L) {
                        if (J) {
                            D("Invalid endDateTime given")
                        }
                    }
                    if (H && isNaN && isNaN(M.getTime())) {
                        D("Invalid startDateTime given")
                    }
                    if (J && isNaN && isNaN(i.getTime())) {
                        D("Invalid endDateTime given")
                    }
                    if (H && K < M.getTime()) {
                        return false
                    }
                    if (J && K > i.getTime()) {
                        return false
                    }
                    return true
                },
                convertStringToDate: function(i) {
                    var H = (i && i.split(" ").length > 2);
                    i = i + (i && i.toLowerCase() !== "invalid date" && !H ? " UTC" : "");
                    return new Date(i)
                }
            };
            var s = {
                parseUrl: function(i, K) {
                    try {
                        var L = document.createElement("a");
                        L.href = i;
                        var H = L.href;
                        L = document.createElement("a");
                        L.href = H;
                        if (K && K in L) {
                            if ("hash" === K) {
                                return String(L[K]).replace("#", "")
                            } else {
                                if ("protocol" === K) {
                                    return String(L[K]).replace(":", "")
                                } else {
                                    if ("search" === K) {
                                        return String(L[K]).replace("?", "")
                                    } else {
                                        if ("port" === K && !L[K]) {
                                            if (L.protocol === "https:") {
                                                return "443"
                                            } else {
                                                if (L.protocol === "http:") {
                                                    return "80"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if ("pathname" === K && L[K] && String(L[K]).substr(0, 1) !== "/") {
                                return "/" + L[K]
                            }
                            if ("port" === K && L[K]) {
                                return String(L[K])
                            }
                            return L[K]
                        }
                        if ("origin" === K && "protocol"in L && L.protocol) {
                            return L.protocol + "//" + L.hostname + (L.port ? ":" + L.port : "")
                        }
                        return
                    } catch (J) {
                        if ("function" === typeof URL) {
                            var I = new URL(i);
                            if (K && K in I) {
                                if ("hash" === K) {
                                    return String(I[K]).replace("#", "")
                                } else {
                                    if ("protocol" === K) {
                                        return String(I[K]).replace(":", "")
                                    } else {
                                        if ("search" === K) {
                                            return String(I[K]).replace("?", "")
                                        } else {
                                            if ("port" === K && !I[K]) {
                                                if (I.protocol === "https:") {
                                                    return "443"
                                                } else {
                                                    if (I.protocol === "http:") {
                                                        return "80"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                return I[K]
                            }
                            return
                        }
                    }
                },
                decodeSafe: function(H) {
                    try {
                        return a.decodeURIComponent(H)
                    } catch (i) {
                        return a.unescape(H)
                    }
                },
                getQueryParameter: function(L, H) {
                    if (!C.isDefined(H)) {
                        H = a.location.search
                    }
                    if (!H || !C.isDefined(L) || L === null || L === false || L === "") {
                        return null
                    }
                    var i = H.substr(0, 1);
                    if (H !== "?" && H !== "&") {
                        H = "?" + H
                    }
                    L = L.replace("[", "\\[");
                    L = L.replace("]", "\\]");
                    var K = new RegExp("[?&]" + L + "(=([^&#]*)|&|#|$)");
                    var J = K.exec(H);
                    if (!J) {
                        return null
                    }
                    if (!J[2]) {
                        return ""
                    }
                    var I = J[2].replace(/\+/g, " ");
                    return this.decodeSafe(I)
                }
            };
            var c;
            var E = {
                hasSetupScroll: false,
                scrollCallbacks: [],
                scrollListenEvents: ["scroll", "resize"],
                offScroll: function(H) {
                    if (H in this.scrollCallbacks) {
                        this.scrollCallbacks[H] = null
                    }
                    var J = 0
                      , I = 0;
                    for (J in this.scrollCallbacks) {
                        if (this.scrollCallbacks[J]) {
                            I++
                        }
                    }
                    if (!I) {
                        for (J = 0; J < this.scrollListenEvents.length; J++) {
                            if (b.removeEventListener) {
                                a.removeEventListener(this.scrollListenEvents[J], this.didScroll, true)
                            } else {
                                a.detachEvent("on" + this.scrollListenEvents[J], this.didScroll)
                            }
                        }
                        this.hasSetupScroll = false
                    }
                },
                didScroll: function(i) {
                    if (c) {
                        return
                    }
                    if (i && i.type && i.type === "scroll" && i.target && i.target !== b && i.target !== a) {
                        return
                    }
                    c = setTimeout(function() {
                        c = null;
                        var H;
                        for (H = 0; H < E.scrollCallbacks.length; H++) {
                            if (E.scrollCallbacks[H]) {
                                E.scrollCallbacks[H](i)
                            }
                        }
                    }, 120)
                },
                onScroll: function(H) {
                    this.scrollCallbacks.push(H);
                    if (!this.hasSetupScroll) {
                        this.hasSetupScroll = true;
                        var i = 0;
                        for (i = 0; i < this.scrollListenEvents.length; i++) {
                            if (b.addEventListener) {
                                a.addEventListener(this.scrollListenEvents[i], this.didScroll, true)
                            } else {
                                a.attachEvent("on" + this.scrollListenEvents[i], this.didScroll)
                            }
                        }
                    }
                    return this.scrollCallbacks.length - 1
                },
                getScreenHeight: function() {
                    return a.screen.height
                },
                getScreenWidth: function() {
                    return a.screen.width
                },
                getViewportWidth: function() {
                    var i = a.innerWidth || b.documentElement.clientWidth || b.body.clientWidth;
                    if (!i) {
                        return 0
                    }
                    return i
                },
                getViewportHeight: function() {
                    var i = a.innerHeight || b.documentElement.clientHeight || b.body.clientHeight;
                    if (!i) {
                        return 0
                    }
                    return i
                },
                getPerformanceTiming: function(i) {
                    if ("performance"in a && C.isObject(a.performance) && C.isObject(a.performance.timing) && i in a.performance.timing) {
                        return a.performance.timing[i]
                    }
                    return 0
                }
            };
            var B = {
                loadScriptUrl: function(I, H) {
                    if (!H) {
                        H = {}
                    }
                    if (!C.isDefined(H.defer)) {
                        H.defer = true
                    }
                    if (!C.isDefined(H.async)) {
                        H.async = true
                    }
                    if (!C.isDefined(H.type)) {
                        H.type = "text/javascript"
                    }
                    var i = document.createElement("script");
                    i.src = I;
                    i.type = H.type;
                    i.defer = !!H.defer;
                    i.async = !!H.async;
                    if (C.isFunction(H.onload)) {
                        i.onload = H.onload
                    }
                    if (C.isFunction(H.onerror)) {
                        i.onerror = H.onerror
                    }
                    if (C.isDefined(H.charset)) {
                        i.charset = H.charset
                    }
                    if (C.isDefined(H.id)) {
                        i.id = H.id
                    }
                    b.head.appendChild(i)
                },
                getScrollLeft: function() {
                    return a.document.body.scrollLeft || a.document.documentElement.scrollLeft
                },
                getScrollTop: function() {
                    return a.document.body.scrollTop || a.document.documentElement.scrollTop
                },
                getDocumentHeight: function() {
                    return Math.max(b.body.offsetHeight, b.body.scrollHeight, b.documentElement.offsetHeight, b.documentElement.clientHeight, b.documentElement.scrollHeight, 1)
                },
                getDocumentWidth: function() {
                    return Math.max(b.body.offsetWidth, b.body.scrollWidth, b.documentElement.offsetWidth, b.documentElement.clientWidth, b.documentElement.scrollWidth, 1)
                },
                addEventListener: function(J, I, H, i) {
                    if (!J) {
                        z.log("element not found, cannot add event listener", J, this);
                        return
                    }
                    if (J.addEventListener) {
                        i = i || false;
                        J.addEventListener(I, H, i);
                        return true
                    }
                    if (J.attachEvent) {
                        return J.attachEvent("on" + I, H)
                    }
                    J["on" + I] = H
                },
                getElementText: function(H) {
                    if (!H) {
                        return
                    }
                    if (m.dom.shouldElementBeMasked(H) && H.children.length === 0) {
                        return "*******"
                    }
                    if (m.dom.elementHasMaskedChild(H)) {
                        return m.dom.getElementTextWithMaskedChildren(H)
                    }
                    var i = H.innerText || H.textContent || "";
                    i = i.replace(/([\s\uFEFF\xA0])+/g, " ");
                    i = i.replace(/(\s)+/g, " ");
                    return C.trim(i)
                },
                getElementClassNames: function(i) {
                    if (i && i.className) {
                        return C.trim(String(i.className).replace(/\s{2,}/g, " "))
                    }
                    return ""
                },
                getElementAttribute: function(J, H) {
                    if (!J || !H) {
                        return
                    }
                    var i = H.toLowerCase();
                    if ((i === "value" || i === "title" || i === "alt" || i === "label" || i === "placeholder") && m.dom.shouldElementBeMasked(J)) {
                        return "*******"
                    }
                    if (J && J.getAttribute) {
                        return J.getAttribute(H)
                    }
                    if (!J || !J.attributes) {
                        return
                    }
                    var I = (typeof J.attributes[H]);
                    if ("undefined" === I) {
                        return null
                    }
                    if (J.attributes[H].value) {
                        return J.attributes[H].value
                    }
                    if (J.attributes[H].nodeValue) {
                        return J.attributes[H].nodeValue
                    }
                    return null
                },
                _htmlCollectionToArray: function(I) {
                    var i = [];
                    if (!I || !I.length) {
                        return i
                    }
                    var H;
                    for (H = 0; H < I.length; H++) {
                        i.push(I[H])
                    }
                    return i
                },
                byId: function(i) {
                    if (C.isString(i) && i.substr(0, 1) === "#") {
                        i = i.substr(1)
                    }
                    return b.getElementById(i)
                },
                byClassName: function(i) {
                    if (i && "getElementsByClassName"in b) {
                        return this._htmlCollectionToArray(b.getElementsByClassName(i))
                    }
                    return []
                },
                byTagName: function(i) {
                    if (i && "getElementsByTagName"in b) {
                        return this._htmlCollectionToArray(b.getElementsByTagName(i))
                    }
                    return []
                },
                bySelector: function(i) {
                    if (i && "querySelectorAll"in b) {
                        return this._htmlCollectionToArray(b.querySelectorAll(i))
                    }
                    return []
                },
                isElementContext: function(J, i) {
                    if (!J || !i) {
                        return false
                    }
                    J = String(J).toLowerCase();
                    i = String(i).toLowerCase();
                    var I = J.lastIndexOf("<" + i);
                    if (I === -1) {
                        return false
                    }
                    var H = J.substring(I);
                    return !H.match(new RegExp("<\\s*/\\s*" + i + ">"))
                },
                isAttributeContext: function(N, L) {
                    if (!N || !L) {
                        return false
                    }
                    N = String(N).replace(/([\s\uFEFF\xA0]*=[\s\uFEFF\xA0]*)/g, "=");
                    var I = N.lastIndexOf("<");
                    if (I === -1) {
                        return false
                    }
                    var P = N.substring(I);
                    var H = P.indexOf(">");
                    if (H !== -1) {
                        return false
                    }
                    var O = P.lastIndexOf("=");
                    if (O === -1) {
                        return false
                    }
                    var K = P.lastIndexOf(" ", O);
                    var M = P.substring(K, O);
                    M = C.trim(M);
                    if (M.toLowerCase() !== L.toLowerCase()) {
                        return false
                    }
                    var J = P.substring(O).replace("=", "");
                    var i = J.substring(0, 1);
                    if ('"' === i) {
                        return -1 === J.substring(1).indexOf('"')
                    } else {
                        if ("'" === i) {
                            return -1 === J.substring(1).indexOf("'")
                        }
                    }
                    return -1 === J.indexOf(" ")
                },
                onLoad: function(i) {
                    if (b.readyState === "complete") {
                        i()
                    } else {
                        if (a.addEventListener) {
                            a.addEventListener("load", i)
                        } else {
                            if (a.attachEvent) {
                                a.attachEvent("onload", i)
                            }
                        }
                    }
                },
                onReady: function(I) {
                    var i = false;
                    if (b.attachEvent) {
                        i = b.readyState === "complete"
                    } else {
                        i = b.readyState !== "loading"
                    }
                    if (i) {
                        I();
                        return
                    }
                    if (b.addEventListener) {
                        this.addEventListener(b, "DOMContentLoaded", function H() {
                            b.removeEventListener("DOMContentLoaded", H, false);
                            if (!i) {
                                i = true;
                                I()
                            }
                        })
                    } else {
                        if (b.attachEvent) {
                            b.attachEvent("onreadystatechange", function H() {
                                if (b.readyState === "complete") {
                                    b.detachEvent("onreadystatechange", H);
                                    if (!i) {
                                        i = true;
                                        I()
                                    }
                                }
                            })
                        }
                    }
                    this.onLoad(function() {
                        if (!i) {
                            i = true;
                            I()
                        }
                    })
                },
                onClick: function(H, i) {
                    if (typeof i === "undefined") {
                        i = b.body
                    }
                    m.dom.addEventListener(i, "click", function(I) {
                        var J = (I.which ? I.which : 1);
                        if (J === 1) {
                            H(I, "left")
                        }
                    }, true);
                    m.dom.addEventListener(i, "auxclick", function(I) {
                        var J = (I.which ? I.which : 2);
                        if (J === 2) {
                            H(I, "middle")
                        }
                    }, true);
                    m.dom.addEventListener(i, "contextmenu", function(I) {
                        var J = (I.which ? I.which : 3);
                        if (J === 3) {
                            H(I, "right")
                        }
                    }, true)
                },
                shouldElementBeMasked: function(H) {
                    if (typeof H === "undefined") {
                        return false
                    }
                    if (H.hasAttribute("data-matomo-mask") || H.hasAttribute("data-piwik-mask")) {
                        return true
                    }
                    if (H.hasAttribute("data-matomo-unmask") || H.hasAttribute("data-piwik-unmask")) {
                        return false
                    }
                    var i = H.parentElement;
                    while (i) {
                        if (i.hasAttribute("data-matomo-mask") || i.hasAttribute("data-piwik-mask")) {
                            return true
                        }
                        if (i.hasAttribute("data-matomo-unmask") || i.hasAttribute("data-piwik-unmask")) {
                            return false
                        }
                        i = i.parentElement
                    }
                    return false
                },
                elementHasMaskedChild: function(i) {
                    if (typeof i === "undefined") {
                        return false
                    }
                    if (i.children.length === 0) {
                        return false
                    }
                    if (i.hasAttribute("data-matomo-mask") || i.hasAttribute("data-piwik-mask") || m.dom.shouldElementBeMasked(i)) {
                        return true
                    }
                    return i.querySelector("[data-matomo-mask],[data-piwik-mask]") !== null
                },
                getElementTextWithMaskedChildren: function(I) {
                    var L = "";
                    var K = I.children;
                    for (var H = 0; H < K.length; H++) {
                        var J = K[H];
                        L += m.dom.getElementText(J) + " "
                    }
                    return C.trim(L)
                }
            };
            function x(I) {
                this.window = a;
                this.document = b;
                this.set = function(i, J) {
                    this[i] = J
                }
                ;
                this.get = function(J, i) {
                    if (J === null || J === false || !C.isDefined(J)) {
                        return i
                    }
                    if (J in this) {
                        if (C.isObject(this[J]) && "get"in this[J] && C.isFunction(this[J].get)) {
                            return this[J].get()
                        }
                        return this[J]
                    }
                    var K = v(J, this);
                    if (C.isDefined(K)) {
                        return K
                    }
                    return i
                }
                ;
                this.buildVariable = function(i) {
                    return p(i, this.get("container"))
                }
                ;
                if (C.isObject(I)) {
                    for (var H in I) {
                        if (C.hasProperty(I, H)) {
                            this.set(H, I[H])
                        }
                    }
                }
            }
            function A(H, i) {
                this.isValid = function() {
                    var J = p(H.actual, i).get();
                    var I = p(H.expected, i).get();
                    return C.compare(J, I, H.comparison)
                }
            }
            function p(H, i) {
                if (C.isObject(H) && H.joinedVariable && C.isArray(H.joinedVariable)) {
                    return new r(H.joinedVariable,i)
                } else {
                    if (C.isObject(H) && H.type) {
                        return new t(H,i)
                    }
                }
                return new n(H,i)
            }
            function r(H, i) {
                this.name = "";
                this.type = "JoinedVariable";
                this.getDefinition = function() {
                    return H
                }
                ;
                this.get = function() {
                    var J = "", K;
                    for (var I = 0; I < H.length; I++) {
                        K = p(H[I], i).toString();
                        if (K !== false && K !== null && C.isDefined(K)) {
                            J += K
                        }
                    }
                    return J
                }
                ;
                this.toString = function() {
                    return this.get()
                }
                ;
                this.addDebugValues = function(I) {
                    I.push({
                        name: null,
                        type: "_joined",
                        value: this.get()
                    })
                }
            }
            function n(J, H) {
                this.name = "";
                this.type = "ConstantVariable";
                this.getDefinition = function() {
                    return J
                }
                ;
                function I(L) {
                    return L && C.isObject(L) && !C.isArray(L) && (C.hasProperty(L, "type") || C.hasProperty(L, "joinedVariable"))
                }
                function K(N) {
                    if (N == null || typeof N !== "object") {
                        return N
                    }
                    var L = new N.constructor();
                    var M;
                    for (M in N) {
                        if (C.hasProperty(N, M)) {
                            L[M] = K(N[M])
                        }
                    }
                    return L
                }
                function i(M) {
                    var L;
                    if (I(M)) {
                        M = p(M, H).get()
                    } else {
                        if (M && C.isArray(M)) {
                            for (L = 0; L < M.length; L++) {
                                M[L] = i(M[L])
                            }
                        } else {
                            if (M && C.isObject(M)) {
                                for (L in M) {
                                    if (C.hasProperty(M, L)) {
                                        M[L] = i(M[L])
                                    }
                                }
                            }
                        }
                    }
                    return M
                }
                this.get = function() {
                    var L = J;
                    if (C.isObject(L)) {
                        L = K(L);
                        L = i(L)
                    }
                    return L
                }
                ;
                this.toString = function() {
                    return J
                }
                ;
                this.addDebugValues = function(L) {
                    L.push({
                        name: null,
                        type: "_constant",
                        value: this.get()
                    })
                }
            }
            function t(I, H) {
                this.type = I.type;
                this.name = I.name;
                this.lookUpTable = I.lookUpTable || [];
                this.defaultValue = undefined;
                this.parameters = I.parameters || {};
                this.getDefinition = function() {
                    return I
                }
                ;
                this.get = function() {
                    var M;
                    try {
                        M = this.theVariable.get()
                    } catch (N) {
                        z.error("Failed to get value of variable", N, this);
                        M = undefined
                    }
                    if ((!C.isDefined(M) || M === null || M === false) && C.isDefined(this.defaultValue)) {
                        M = this.defaultValue
                    }
                    var L;
                    for (L = 0; L < this.lookUpTable.length; L++) {
                        var O = this.lookUpTable[L];
                        if (C.compare(M, O.matchValue, O.comparison)) {
                            return O.outValue
                        }
                    }
                    return M
                }
                ;
                this.toString = function() {
                    if (this.theVariable && C.hasProperty(this.theVariable, "toString") && C.isFunction(this.theVariable.toString)) {
                        try {
                            return this.theVariable.toString()
                        } catch (i) {
                            z.error("Failed to get toString of variable", i, this);
                            return
                        }
                    }
                    return this.get()
                }
                ;
                this.addDebugValues = function(i) {
                    i.push({
                        name: this.name,
                        type: this.type,
                        value: this.get()
                    })
                }
                ;
                if ("undefined" !== typeof I.defaultValue) {
                    this.defaultValue = I.defaultValue
                }
                if (!C.isDefined(I.Variable) || !I.Variable) {
                    z.log("no template defined for variable ", I);
                    return
                }
                var J, K = new x({
                    variable: this,
                    container: H
                });
                if (C.isObject(I.parameters)) {
                    for (J in I.parameters) {
                        if (C.hasProperty(I.parameters, J)) {
                            K.set(J, p(I.parameters[J], H))
                        }
                    }
                }
                if (C.isFunction(I.Variable)) {
                    this.theVariable = new I.Variable(K,m)
                } else {
                    if (C.isObject(I.Variable)) {
                        this.theVariable = I.Variable
                    } else {
                        if (I.Variable in H.templates) {
                            this.theVariable = new H.templates[I.Variable](K,m)
                        } else {
                            D("No matching variable template found")
                        }
                    }
                }
            }
            function f(J, H) {
                this.referencedTags = [];
                this.id = J.id;
                this.type = J.type;
                this.name = J.name;
                this.conditions = [];
                this.parameters = J.parameters || {};
                var I = this;
                this.getId = function() {
                    return this.id
                }
                ;
                this.setUp = function() {
                    if (this.theTrigger && this.theTrigger.setUp && C.isFunction(this.theTrigger.setUp)) {
                        this.theTrigger.setUp(function(Q) {
                            q.push(Q);
                            if (!("event"in Q)) {
                                return
                            }
                            var M = {
                                tags: [],
                                variables: [],
                                metTrigger: null,
                                name: Q.event,
                                eventData: Q,
                                container: {}
                            };
                            var P, O;
                            if (I.meetsConditions()) {
                                z.log("The condition is met for trigger " + I.name, I);
                                M.metTrigger = {
                                    name: I.name,
                                    type: I.type
                                };
                                var N = I.getReferencedTags();
                                for (O = 0; O < N.length; O++) {
                                    if (N[O].hasBlockTrigger(I)) {
                                        N[O].block();
                                        N[O].addDebugValues(M.tags, "Block")
                                    } else {
                                        if (N[O].hasFireTrigger(I)) {
                                            N[O].fire();
                                            N[O].addDebugValues(M.tags, "Fire")
                                        }
                                    }
                                }
                            }
                            if (window.mtmPreviewWindow || z.enabled) {
                                H.addDebugValues(M.container);
                                d(M);
                                if (z.enabled) {
                                    z.log("event: ", M)
                                }
                            }
                        })
                    }
                }
                ;
                this.addReferencedTag = function(i) {
                    this.referencedTags.push(i)
                }
                ;
                this.getReferencedTags = function() {
                    return this.referencedTags
                }
                ;
                this.meetsConditions = function() {
                    var M, N;
                    for (M = 0; M < this.conditions.length; M++) {
                        N = new A(this.conditions[M],H);
                        if (!N.isValid()) {
                            return false
                        }
                    }
                    return true
                }
                ;
                if (J.conditions && C.isArray(J.conditions)) {
                    this.conditions = J.conditions
                }
                var K, L = new x({
                    trigger: this,
                    container: H
                });
                if (C.isObject(J.parameters)) {
                    for (K in J.parameters) {
                        if (C.hasProperty(J.parameters, K)) {
                            L.set(K, p(J.parameters[K], H))
                        }
                    }
                }
                if (!C.isDefined(J.Trigger) || !J.Trigger) {
                    z.error("no template defined for trigger ", J);
                    return
                }
                if (C.isFunction(J.Trigger)) {
                    this.theTrigger = new J.Trigger(L,m)
                } else {
                    if (C.isObject(J.Trigger)) {
                        this.theTrigger = J.Trigger
                    } else {
                        if (J.Trigger in H.templates) {
                            this.theTrigger = new H.templates[J.Trigger](L,m)
                        } else {
                            D("No matching trigger template found")
                        }
                    }
                }
                L = null
            }
            function h(H, I) {
                this.type = H.type;
                this.name = H.name;
                this.fireTriggerIds = H.fireTriggerIds ? H.fireTriggerIds : [];
                this.blockTriggerIds = H.blockTriggerIds ? H.blockTriggerIds : [];
                this.fireLimit = H.fireLimit ? H.fireLimit : h.FIRE_LIMIT_UNLIMITED;
                this.fireDelay = H.fireDelay ? parseInt(H.fireDelay, 10) : 0;
                this.startDate = H.startDate ? H.startDate : null;
                this.endDate = H.endDate ? H.endDate : null;
                this.numExecuted = 0;
                this.blocked = false;
                this.parameters = H.parameters || {};
                this.isTagFireLimitAllowedInPreviewMode = I.isTagFireLimitAllowedInPreviewMode || false;
                var J = this;
                this.addDebugValues = function(i, M) {
                    i.push({
                        action: M,
                        type: this.type,
                        name: this.name,
                        numExecuted: this.numExecuted
                    })
                }
                ;
                this._doFire = function() {
                    if (this.blocked) {
                        z.log("not firing as this tag is blocked", this);
                        return "tag is blocked"
                    }
                    if (this.fireLimit !== h.FIRE_LIMIT_UNLIMITED && this.numExecuted) {
                        z.log("not firing as this tag has limit reached", this);
                        return "fire limit is restricted"
                    }
                    var M = "tag";
                    if (I.id) {
                        M += "_" + I.id
                    }
                    if (this.fireLimit === h.FIRE_LIMIT_ONCE_24HOURS && (!window.mtmPreviewWindow || this.isTagFireLimitAllowedInPreviewMode)) {
                        if (y.get(M, this.name)) {
                            z.log("not firing as this tag has 24hours limit reached", this);
                            return "fire limit 24hours is restricted"
                        }
                    }
                    if (this.fireLimit === h.FIRE_LIMIT_ONCE_LIFETIME && (!window.mtmPreviewWindow || this.isTagFireLimitAllowedInPreviewMode)) {
                        if (y.get(M, this.name)) {
                            z.log("not firing as this tag has limit reached", this);
                            return "fire limit lifetime is restricted"
                        }
                    }
                    if (!F.matchesDateRange(new Date(), this.startDate, this.endDate)) {
                        z.log("not firing as this tag does not match date", this);
                        return "date range does not match"
                    }
                    if (!this.theTag || !this.theTag.fire) {
                        z.log("not firing as tag does not exist anymore", this);
                        return "tag not found"
                    }
                    z.log("firing this tag", this);
                    this.numExecuted++;
                    if (this.fireLimit === h.FIRE_LIMIT_ONCE_24HOURS) {
                        var i = 24 * 60 * 60;
                        y.set(M, this.name, "1", i)
                    }
                    if (this.fireLimit === h.FIRE_LIMIT_ONCE_LIFETIME) {
                        y.set(M, this.name, "1")
                    }
                    this.theTag.fire();
                    z.log("fired this tag", this)
                }
                ;
                this.fire = function() {
                    if (this.fireDelay) {
                        setTimeout(function() {
                            J._doFire()
                        }, this.fireDelay)
                    } else {
                        return this._doFire()
                    }
                }
                ;
                this.block = function() {
                    this.blocked = true
                }
                ;
                this.hasFireTrigger = function(i) {
                    if (!this.fireTriggerIds || !this.fireTriggerIds.length) {
                        return false
                    }
                    if (!i) {
                        return false
                    }
                    var M = i.getId();
                    return C.indexOfArray(this.fireTriggerIds, M) !== -1
                }
                ;
                this.hasBlockTrigger = function(i) {
                    if (!this.blockTriggerIds || !this.blockTriggerIds.length) {
                        return false
                    }
                    if (!i) {
                        return false
                    }
                    var M = i.getId();
                    return C.indexOfArray(this.blockTriggerIds, M) !== -1
                }
                ;
                if (!C.isDefined(H.Tag) || !H.Tag) {
                    z.error("no template defined for tag ", H);
                    return
                }
                var K, L = new x({
                    tag: this,
                    container: I
                });
                if (C.isObject(H.parameters)) {
                    for (K in H.parameters) {
                        if (C.hasProperty(H.parameters, K)) {
                            L.set(K, p(H.parameters[K], I))
                        }
                    }
                }
                if (C.isFunction(H.Tag)) {
                    this.theTag = new H.Tag(L,m)
                } else {
                    if (C.isObject(H.Tag)) {
                        this.theTag = H.Tag
                    } else {
                        if (H.Tag in I.templates) {
                            this.theTag = new I.templates[H.Tag](L,m)
                        } else {
                            D("No matching tag template found")
                        }
                    }
                }
            }
            h.FIRE_LIMIT_ONCE_PAGE = "once_page";
            h.FIRE_LIMIT_ONCE_24HOURS = "once_24hours";
            h.FIRE_LIMIT_ONCE_LIFETIME = "once_lifetime";
            h.FIRE_LIMIT_UNLIMITED = "unlimited";
            function o(I, N) {
                var J = this;
                this.id = I.id;
                this.idsite = I.idsite || null;
                this.isTagFireLimitAllowedInPreviewMode = I.isTagFireLimitAllowedInPreviewMode || false;
                this.versionName = I.versionName || null;
                this.revision = I.revision || null;
                this.environment = I.environment || null;
                this.templates = N || {};
                this.dataLayer = new u();
                this.variables = [];
                this.triggers = [];
                this.tags = [];
                this.onNewGlobalDataLayerValue = function(i) {
                    this.dataLayer.push(i)
                }
                ;
                q.on(function(i) {
                    J.onNewGlobalDataLayerValue(i)
                });
                this.addDebugValues = function(P) {
                    P.variables = [];
                    var Q;
                    for (Q = 0; Q < this.variables.length; Q++) {
                        this.variables[Q].addDebugValues(P.variables)
                    }
                    P.tags = [];
                    for (Q = 0; Q < this.tags.length; Q++) {
                        this.tags[Q].addDebugValues(P.tags, "Not Fired Yet")
                    }
                    P.id = this.id;
                    P.versionName = this.versionName;
                    P.dataLayer = JSON.parse(JSON.stringify(this.dataLayer.values, function(i, R) {
                        if (typeof R === "object" && R instanceof Node) {
                            return R.nodeName
                        } else {
                            return R
                        }
                    }))
                }
                ;
                this.getTriggerById = function(P) {
                    if (!P) {
                        return
                    }
                    var Q;
                    for (Q = 0; Q < this.triggers.length; Q++) {
                        if (this.triggers[Q].getId() === P) {
                            return this.triggers[Q]
                        }
                    }
                }
                ;
                this.addTrigger = function(i) {
                    if (!i) {
                        return
                    }
                    var P = this.getTriggerById(i.id);
                    if (!P) {
                        P = new f(i,this);
                        this.triggers.push(P)
                    }
                    return P
                }
                ;
                var M, L, H, O, K;
                if (I.variables && C.isArray(I.variables)) {
                    for (M = 0; M < I.variables.length; M++) {
                        this.variables.push(p(I.variables[M], this))
                    }
                }
                if (I.triggers && C.isArray(I.triggers)) {
                    if (I.tags && C.isArray(I.tags)) {
                        I.triggers.sort(function(Q, P) {
                            var R = false, T = false, i, S;
                            for (S = 0; S < I.tags.length; S++) {
                                i = I.tags[S];
                                if (i && i.blockTriggerIds && C.isArray(i.blockTriggerIds)) {
                                    R = R || C.indexOfArray(i.blockTriggerIds, Q.id) !== -1;
                                    T = T || C.indexOfArray(i.blockTriggerIds, P.id) !== -1
                                }
                            }
                            if (R && !T) {
                                return -1
                            } else {
                                if (T && !R) {
                                    return 1
                                }
                            }
                            if (Q.id < P.id) {
                                return -1
                            }
                            return 1
                        })
                    }
                    for (M = 0; M < I.triggers.length; M++) {
                        this.addTrigger(I.triggers[M])
                    }
                }
                if (I.tags && C.isArray(I.tags)) {
                    for (M = 0; M < I.tags.length; M++) {
                        O = I.tags[M];
                        H = new h(O,this);
                        this.tags.push(H);
                        if (O.blockTriggerIds && C.isArray(O.blockTriggerIds)) {
                            for (L = 0; L < O.blockTriggerIds.length; L++) {
                                K = this.getTriggerById(O.blockTriggerIds[L]);
                                if (K) {
                                    K.addReferencedTag(H)
                                }
                            }
                        }
                        if (O.fireTriggerIds && C.isArray(O.fireTriggerIds)) {
                            for (L = 0; L < O.fireTriggerIds.length; L++) {
                                K = this.getTriggerById(O.fireTriggerIds[L]);
                                if (K) {
                                    K.addReferencedTag(H)
                                }
                            }
                        }
                    }
                }
                this.run = function() {
                    var Q = q.getAllEvents();
                    var P;
                    for (P = 0; P < Q.length; P++) {
                        this.onNewGlobalDataLayerValue(Q[P])
                    }
                    for (P = 0; P < this.triggers.length; P++) {
                        this.triggers[P].setUp()
                    }
                }
            }
            var m = {
                THROW_ERRORS: true,
                dataLayer: q,
                containers: [],
                url: s,
                date: F,
                utils: C,
                debug: z,
                dom: B,
                window: E,
                Variable: t,
                storage: {
                    local: y,
                    session: e
                },
                _buildVariable: p,
                Condition: A,
                TemplateParameters: x,
                Trigger: f,
                Tag: h,
                throwError: D,
                Container: o,
                addContainer: function(N, K) {
                    var L = s.getQueryParameter("mtmSetDebugFlag");
                    if (L) {
                        var I = encodeURIComponent(N.idsite);
                        var i = encodeURIComponent(N.id);
                        if (L == 1) {
                            var J = new Date();
                            J.setTime(J.getTime() + (7 * 24 * 60 * 60 * 1000));
                            document.cookie = "mtmPreviewMode=mtmPreview" + I + "_" + i + "%3D1;expires=" + J.toUTCString() + ";SameSite=Lax"
                        } else {
                            document.cookie = "mtmPreviewMode=mtmPreview" + I + "_" + i + "%3D1;expires=Thu, 01 Jan 1970 00:00:00 UTC;SameSite=Lax";
                            window.close()
                        }
                    }
                    if (!window.mtmPreviewWindow) {
                        var M = b.getElementById("mtmDebugFrame");
                        if (M && M.contentWindow) {
                            window.mtmPreviewWindow = M.contentWindow
                        }
                    }
                    z.log("creating container");
                    var H = new o(N,K);
                    this.containers.push(H);
                    H.dataLayer.push({
                        "mtm.containerId": H.id
                    });
                    z.log("running container");
                    H.run();
                    return H
                },
                enableDebugMode: function() {
                    z.enabled = true
                }
            };
            if ("matomoTagManagerAsyncInit"in a && C.isFunction(a.matomoTagManagerAsyncInit)) {
                a.matomoTagManagerAsyncInit(m)
            }
            function g() {
                var L, J, I, N, O;
                for (L = 0; L < arguments.length; L += 1) {
                    O = null;
                    if (arguments[L] && arguments[L].slice) {
                        O = arguments[L].slice()
                    }
                    N = arguments[L];
                    if (C.isObject(N) && !C.isArray(N)) {
                        q.push(N);
                        continue
                    }
                    I = N.shift();
                    var M = C.isString(I) && I.indexOf("::") > 0;
                    if (M) {
                        var H, K;
                        H = I.split("::");
                        K = H[0];
                        I = H[1];
                        if ("object" === typeof m[K] && C.isFunction(m[K][I])) {
                            m[K][I].apply(m[K], N)
                        }
                    } else {
                        if (I && I in m && C.isFunction(m[I])) {
                            m[I].apply(m, N)
                        } else {
                            z.error("method " + I + " is not valid")
                        }
                    }
                }
            }
            C.setMethodWrapIfNeeded(a._mtm, "push", g);
            var w;
            for (w = 0; w < a._mtm.length; w++) {
                g(a._mtm[w])
            }
            q.push({
                "mtm.mtmScriptLoadedTime": l
            });
            if (("undefined" === typeof ignoreGtmDataLayer || !ignoreGtmDataLayer) && "undefined" !== typeof a.dataLayer && C.isArray(a.dataLayer)) {
                for (w = 0; w < a.dataLayer.length; w++) {
                    if (C.isObject(a.dataLayer[w])) {
                        q.push(a.dataLayer[w])
                    }
                }
            }
            if (!("undefined" === typeof activelySyncGtmDataLayer) && activelySyncGtmDataLayer) {
                a.dataLayer = a.dataLayer || [];
                const k = function(H, i) {
                    H.push = function(I) {
                        Array.prototype.push.call(H, I);
                        i(H)
                    }
                };
                k(a.dataLayer, function(i) {
                    q.push(a.dataLayer[a.dataLayer.length - 1])
                })
            }
            return m
        }
        )()
    }
    (function() {
        var Templates = {};
        Templates['MatomoTag'] = (function() {
            var libLoaded = false;
            var libAvailable = false;
            var callbacks = {
                callbacks: [],
                push: function(callback) {
                    if (libAvailable) {
                        callback();
                    } else {
                        this.callbacks.push(callback);
                    }
                }
            };
            window._paq = window._paq || [];
            if ('object' !== typeof window.matomoPluginAsyncInit) {
                window.matomoPluginAsyncInit = [];
            }
            function executeCallbacks() {
                var i;
                for (i = 0; i < callbacks.callbacks.length; i++) {
                    callbacks.callbacks[i]();
                }
                callbacks.callbacks = [];
            }
            window.matomoPluginAsyncInit.push(function() {
                libAvailable = true;
                executeCallbacks();
            });
            function checkLoadedAlready() {
                if (libAvailable || typeof window.Piwik === 'object') {
                    libAvailable = true;
                    libLoaded = true;
                    executeCallbacks();
                    return true;
                }
                return false;
            }
            function loadMatomo() {
                if (checkLoadedAlready()) {
                    return;
                }
                /*!!
 * Matomo - free/libre analytics platform
 *
 * JavaScript tracking client
 *
 * @link https://piwik.org
 * @source https://github.com/matomo-org/matomo/blob/master/js/piwik.js
 * @license https://piwik.org/free-software/bsd/ BSD-3 Clause (also in js/LICENSE.txt)
 * @license magnet:?xt=urn:btih:c80d50af7d3db9be66a4d0a86db0286e4fd33292&dn=bsd-3-clause.txt BSD-3-Clause
 */
                ;if (typeof _paq !== "object") {
                    _paq = []
                }
                if (typeof window.Matomo !== "object") {
                    window.Matomo = window.Piwik = (function() {
                        var s, b = {}, A = {}, K = document, g = navigator, ac = screen, X = window, h = X.performance || X.mozPerformance || X.msPerformance || X.webkitPerformance, u = X.encodeURIComponent, W = X.decodeURIComponent, k = unescape, M = [], I, v, am = [], z = 0, ag = 0, Y = 0, m = false, q = "";
                        function p(au) {
                            try {
                                return W(au)
                            } catch (av) {
                                return unescape(au)
                            }
                        }
                        function N(av) {
                            var au = typeof av;
                            return au !== "undefined"
                        }
                        function D(au) {
                            return typeof au === "function"
                        }
                        function aa(au) {
                            return typeof au === "object"
                        }
                        function y(au) {
                            return typeof au === "string" || au instanceof String
                        }
                        function al(au) {
                            return typeof au === "number" || au instanceof Number
                        }
                        function ad(au) {
                            return N(au) && (al(au) || (y(au) && au.length))
                        }
                        function E(av) {
                            if (!av) {
                                return true
                            }
                            var au;
                            for (au in av) {
                                if (Object.prototype.hasOwnProperty.call(av, au)) {
                                    return false
                                }
                            }
                            return true
                        }
                        function ap(au) {
                            var av = typeof console;
                            if (av !== "undefined" && console && console.error) {
                                console.error(au)
                            }
                        }
                        function ak() {
                            var az, ay, aB, av, au;
                            for (az = 0; az < arguments.length; az += 1) {
                                au = null;
                                if (arguments[az] && arguments[az].slice) {
                                    au = arguments[az].slice()
                                }
                                av = arguments[az];
                                aB = av.shift();
                                var aA, aw;
                                var ax = y(aB) && aB.indexOf("::") > 0;
                                if (ax) {
                                    aA = aB.split("::");
                                    aw = aA[0];
                                    aB = aA[1];
                                    if ("object" === typeof v[aw] && "function" === typeof v[aw][aB]) {
                                        v[aw][aB].apply(v[aw], av)
                                    } else {
                                        if (au) {
                                            am.push(au)
                                        }
                                    }
                                } else {
                                    for (ay = 0; ay < M.length; ay++) {
                                        if (y(aB)) {
                                            aw = M[ay];
                                            var aC = aB.indexOf(".") > 0;
                                            if (aC) {
                                                aA = aB.split(".");
                                                if (aw && "object" === typeof aw[aA[0]]) {
                                                    aw = aw[aA[0]];
                                                    aB = aA[1]
                                                } else {
                                                    if (au) {
                                                        am.push(au);
                                                        break
                                                    }
                                                }
                                            }
                                            if (aw[aB]) {
                                                aw[aB].apply(aw, av)
                                            } else {
                                                var aD = "The method '" + aB + '\' was not found in "_paq" variable.  Please have a look at the Matomo tracker documentation: https://developer.matomo.org/api-reference/tracking-javascript';
                                                ap(aD);
                                                if (!aC) {
                                                    throw new TypeError(aD)
                                                }
                                            }
                                            if (aB === "addTracker") {
                                                break
                                            }
                                            if (aB === "setTrackerUrl" || aB === "setSiteId") {
                                                break
                                            }
                                        } else {
                                            aB.apply(M[ay], av)
                                        }
                                    }
                                }
                            }
                        }
                        function at(ax, aw, av, au) {
                            if (ax.addEventListener) {
                                ax.addEventListener(aw, av, au);
                                return true
                            }
                            if (ax.attachEvent) {
                                return ax.attachEvent("on" + aw, av)
                            }
                            ax["on" + aw] = av
                        }
                        function n(au) {
                            if (K.readyState === "complete") {
                                au()
                            } else {
                                if (X.addEventListener) {
                                    X.addEventListener("load", au, false)
                                } else {
                                    if (X.attachEvent) {
                                        X.attachEvent("onload", au)
                                    }
                                }
                            }
                        }
                        function r(ax) {
                            var au = false;
                            if (K.attachEvent) {
                                au = K.readyState === "complete"
                            } else {
                                au = K.readyState !== "loading"
                            }
                            if (au) {
                                ax();
                                return
                            }
                            var aw;
                            if (K.addEventListener) {
                                at(K, "DOMContentLoaded", function av() {
                                    K.removeEventListener("DOMContentLoaded", av, false);
                                    if (!au) {
                                        au = true;
                                        ax()
                                    }
                                })
                            } else {
                                if (K.attachEvent) {
                                    K.attachEvent("onreadystatechange", function av() {
                                        if (K.readyState === "complete") {
                                            K.detachEvent("onreadystatechange", av);
                                            if (!au) {
                                                au = true;
                                                ax()
                                            }
                                        }
                                    });
                                    if (K.documentElement.doScroll && X === X.top) {
                                        (function av() {
                                            if (!au) {
                                                try {
                                                    K.documentElement.doScroll("left")
                                                } catch (ay) {
                                                    setTimeout(av, 0);
                                                    return
                                                }
                                                au = true;
                                                ax()
                                            }
                                        }())
                                    }
                                }
                            }
                            at(X, "load", function() {
                                if (!au) {
                                    au = true;
                                    ax()
                                }
                            }, false)
                        }
                        function ah(av, aA, aB) {
                            if (!av) {
                                return ""
                            }
                            var au = "", ax, aw, ay, az;
                            for (ax in b) {
                                if (Object.prototype.hasOwnProperty.call(b, ax)) {
                                    az = b[ax] && "function" === typeof b[ax][av];
                                    if (az) {
                                        aw = b[ax][av];
                                        ay = aw(aA || {}, aB);
                                        if (ay) {
                                            au += ay
                                        }
                                    }
                                }
                            }
                            return au
                        }
                        function an(av) {
                            var au;
                            m = true;
                            ah("unload");
                            au = new Date();
                            var aw = au.getTimeAlias();
                            if ((s - aw) > 3000) {
                                s = aw + 3000
                            }
                            if (s) {
                                do {
                                    au = new Date()
                                } while (au.getTimeAlias() < s)
                            }
                        }
                        function o(aw, av) {
                            var au = K.createElement("script");
                            au.type = "text/javascript";
                            au.src = aw;
                            if (au.readyState) {
                                au.onreadystatechange = function() {
                                    var ax = this.readyState;
                                    if (ax === "loaded" || ax === "complete") {
                                        au.onreadystatechange = null;
                                        av()
                                    }
                                }
                            } else {
                                au.onload = av
                            }
                            K.getElementsByTagName("head")[0].appendChild(au)
                        }
                        function O() {
                            var au = "";
                            try {
                                au = X.top.document.referrer
                            } catch (aw) {
                                if (X.parent) {
                                    try {
                                        au = X.parent.document.referrer
                                    } catch (av) {
                                        au = ""
                                    }
                                }
                            }
                            if (au === "") {
                                au = K.referrer
                            }
                            return au
                        }
                        function t(au) {
                            var aw = new RegExp("^([a-z]+):")
                              , av = aw.exec(au);
                            return av ? av[1] : null
                        }
                        function d(au) {
                            var aw = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)")
                              , av = aw.exec(au);
                            return av ? av[1] : au
                        }
                        function H(au) {
                            return (/^[0-9][0-9]*(\.[0-9]+)?$/).test(au)
                        }
                        function R(aw, ax) {
                            var au = {}, av;
                            for (av in aw) {
                                if (aw.hasOwnProperty(av) && ax(aw[av])) {
                                    au[av] = aw[av]
                                }
                            }
                            return au
                        }
                        function C(aw) {
                            var au = {}, av;
                            for (av in aw) {
                                if (aw.hasOwnProperty(av)) {
                                    if (H(aw[av])) {
                                        au[av] = Math.round(aw[av])
                                    } else {
                                        throw new Error('Parameter "' + av + '" provided value "' + aw[av] + '" is not valid. Please provide a numeric value.')
                                    }
                                }
                            }
                            return au
                        }
                        function l(av) {
                            var aw = "", au;
                            for (au in av) {
                                if (av.hasOwnProperty(au)) {
                                    aw += "&" + u(au) + "=" + u(av[au])
                                }
                            }
                            return aw
                        }
                        function ao(av, au) {
                            av = String(av);
                            return av.lastIndexOf(au, 0) === 0
                        }
                        function V(av, au) {
                            av = String(av);
                            return av.indexOf(au, av.length - au.length) !== -1
                        }
                        function B(av, au) {
                            av = String(av);
                            return av.indexOf(au) !== -1
                        }
                        function f(av, au) {
                            av = String(av);
                            return av.substr(0, av.length - au)
                        }
                        function J(ax, aw, az) {
                            ax = String(ax);
                            if (!az) {
                                az = ""
                            }
                            var au = ax.indexOf("#");
                            var aA = ax.length;
                            if (au === -1) {
                                au = aA
                            }
                            var ay = ax.substr(0, au);
                            var av = ax.substr(au, aA - au);
                            if (ay.indexOf("?") === -1) {
                                ay += "?"
                            } else {
                                if (!V(ay, "?")) {
                                    ay += "&"
                                }
                            }
                            return ay + u(aw) + "=" + u(az) + av
                        }
                        function j(av, aw) {
                            av = String(av);
                            if (av.indexOf("?" + aw + "=") === -1 && av.indexOf("&" + aw + "=") === -1 && av.indexOf("#" + aw + "=") === -1) {
                                return av
                            }
                            var aB = "";
                            var aD = av.indexOf("#");
                            if (aD !== -1) {
                                aB = av.substr(aD + 1);
                                av = av.substr(0, aD)
                            }
                            var ax = av.indexOf("?");
                            var au = "";
                            var aA = av;
                            if (ax > -1) {
                                au = av.substr(ax + 1);
                                aA = av.substr(0, ax)
                            }
                            var az = function(aF) {
                                var aH;
                                var aG = aF.length - 1;
                                for (aG; aG >= 0; aG--) {
                                    aH = aF[aG].split("=")[0];
                                    if (aH === aw) {
                                        aF.splice(aG, 1)
                                    }
                                }
                                return aF
                            };
                            if (au) {
                                var aC = az(au.split("&")).join("&");
                                if (aC) {
                                    aA += "?" + aC
                                }
                            }
                            if (aB && aB.indexOf("=") > 0) {
                                var ay = aB.charAt(0) === "?";
                                if (ay) {
                                    aB = aB.substr(1)
                                }
                                var aE = az(aB.split("&")).join("&");
                                if (aE) {
                                    aA += "#";
                                    if (ay) {
                                        aA += "?"
                                    }
                                    aA += aE
                                }
                            } else {
                                if (aB) {
                                    aA += "#" + aB
                                }
                            }
                            return aA
                        }
                        function e(aw, av) {
                            var au = "[\\?&#]" + av + "=([^&#]*)";
                            var ay = new RegExp(au);
                            var ax = ay.exec(aw);
                            return ax ? p(ax[1]) : ""
                        }
                        function a(au) {
                            if (au && String(au) === au) {
                                return au.replace(/^\s+|\s+$/g, "")
                            }
                            return au
                        }
                        function G(au) {
                            return unescape(u(au))
                        }
                        function ar(aJ) {
                            var aw = function(aP, aO) {
                                return (aP << aO) | (aP >>> (32 - aO))
                            }, aK = function(aR) {
                                var aP = "", aQ, aO;
                                for (aQ = 7; aQ >= 0; aQ--) {
                                    aO = (aR >>> (aQ * 4)) & 15;
                                    aP += aO.toString(16)
                                }
                                return aP
                            }, az, aM, aL, av = [], aD = 1732584193, aB = 4023233417, aA = 2562383102, ay = 271733878, ax = 3285377520, aI, aH, aG, aF, aE, aN, au, aC = [];
                            aJ = G(aJ);
                            au = aJ.length;
                            for (aM = 0; aM < au - 3; aM += 4) {
                                aL = aJ.charCodeAt(aM) << 24 | aJ.charCodeAt(aM + 1) << 16 | aJ.charCodeAt(aM + 2) << 8 | aJ.charCodeAt(aM + 3);
                                aC.push(aL)
                            }
                            switch (au & 3) {
                            case 0:
                                aM = 2147483648;
                                break;
                            case 1:
                                aM = aJ.charCodeAt(au - 1) << 24 | 8388608;
                                break;
                            case 2:
                                aM = aJ.charCodeAt(au - 2) << 24 | aJ.charCodeAt(au - 1) << 16 | 32768;
                                break;
                            case 3:
                                aM = aJ.charCodeAt(au - 3) << 24 | aJ.charCodeAt(au - 2) << 16 | aJ.charCodeAt(au - 1) << 8 | 128;
                                break
                            }
                            aC.push(aM);
                            while ((aC.length & 15) !== 14) {
                                aC.push(0)
                            }
                            aC.push(au >>> 29);
                            aC.push((au << 3) & 4294967295);
                            for (az = 0; az < aC.length; az += 16) {
                                for (aM = 0; aM < 16; aM++) {
                                    av[aM] = aC[az + aM]
                                }
                                for (aM = 16; aM <= 79; aM++) {
                                    av[aM] = aw(av[aM - 3] ^ av[aM - 8] ^ av[aM - 14] ^ av[aM - 16], 1)
                                }
                                aI = aD;
                                aH = aB;
                                aG = aA;
                                aF = ay;
                                aE = ax;
                                for (aM = 0; aM <= 19; aM++) {
                                    aN = (aw(aI, 5) + ((aH & aG) | (~aH & aF)) + aE + av[aM] + 1518500249) & 4294967295;
                                    aE = aF;
                                    aF = aG;
                                    aG = aw(aH, 30);
                                    aH = aI;
                                    aI = aN
                                }
                                for (aM = 20; aM <= 39; aM++) {
                                    aN = (aw(aI, 5) + (aH ^ aG ^ aF) + aE + av[aM] + 1859775393) & 4294967295;
                                    aE = aF;
                                    aF = aG;
                                    aG = aw(aH, 30);
                                    aH = aI;
                                    aI = aN
                                }
                                for (aM = 40; aM <= 59; aM++) {
                                    aN = (aw(aI, 5) + ((aH & aG) | (aH & aF) | (aG & aF)) + aE + av[aM] + 2400959708) & 4294967295;
                                    aE = aF;
                                    aF = aG;
                                    aG = aw(aH, 30);
                                    aH = aI;
                                    aI = aN
                                }
                                for (aM = 60; aM <= 79; aM++) {
                                    aN = (aw(aI, 5) + (aH ^ aG ^ aF) + aE + av[aM] + 3395469782) & 4294967295;
                                    aE = aF;
                                    aF = aG;
                                    aG = aw(aH, 30);
                                    aH = aI;
                                    aI = aN
                                }
                                aD = (aD + aI) & 4294967295;
                                aB = (aB + aH) & 4294967295;
                                aA = (aA + aG) & 4294967295;
                                ay = (ay + aF) & 4294967295;
                                ax = (ax + aE) & 4294967295
                            }
                            aN = aK(aD) + aK(aB) + aK(aA) + aK(ay) + aK(ax);
                            return aN.toLowerCase()
                        }
                        function af(aw, au, av) {
                            if (!aw) {
                                aw = ""
                            }
                            if (!au) {
                                au = ""
                            }
                            if (aw === "translate.googleusercontent.com") {
                                if (av === "") {
                                    av = au
                                }
                                au = e(au, "u");
                                aw = d(au)
                            } else {
                                if (aw === "cc.bingj.com" || aw === "webcache.googleusercontent.com" || aw.slice(0, 5) === "74.6.") {
                                    au = K.links[0].href;
                                    aw = d(au)
                                }
                            }
                            return [aw, au, av]
                        }
                        function P(av) {
                            var au = av.length;
                            if (av.charAt(--au) === ".") {
                                av = av.slice(0, au)
                            }
                            if (av.slice(0, 2) === "*.") {
                                av = av.slice(1)
                            }
                            if (av.indexOf("/") !== -1) {
                                av = av.substr(0, av.indexOf("/"))
                            }
                            return av
                        }
                        function aq(av) {
                            av = av && av.text ? av.text : av;
                            if (!y(av)) {
                                var au = K.getElementsByTagName("title");
                                if (au && N(au[0])) {
                                    av = au[0].text
                                }
                            }
                            return av
                        }
                        function T(au) {
                            if (!au) {
                                return []
                            }
                            if (!N(au.children) && N(au.childNodes)) {
                                return au.children
                            }
                            if (N(au.children)) {
                                return au.children
                            }
                            return []
                        }
                        function Z(av, au) {
                            if (!av || !au) {
                                return false
                            }
                            if (av.contains) {
                                return av.contains(au)
                            }
                            if (av === au) {
                                return true
                            }
                            if (av.compareDocumentPosition) {
                                return !!(av.compareDocumentPosition(au) & 16)
                            }
                            return false
                        }
                        function Q(aw, ax) {
                            if (aw && aw.indexOf) {
                                return aw.indexOf(ax)
                            }
                            if (!N(aw) || aw === null) {
                                return -1
                            }
                            if (!aw.length) {
                                return -1
                            }
                            var au = aw.length;
                            if (au === 0) {
                                return -1
                            }
                            var av = 0;
                            while (av < au) {
                                if (aw[av] === ax) {
                                    return av
                                }
                                av++
                            }
                            return -1
                        }
                        function i(aw) {
                            if (!aw) {
                                return false
                            }
                            function au(ay, az) {
                                if (X.getComputedStyle) {
                                    return K.defaultView.getComputedStyle(ay, null)[az]
                                }
                                if (ay.currentStyle) {
                                    return ay.currentStyle[az]
                                }
                            }
                            function ax(ay) {
                                ay = ay.parentNode;
                                while (ay) {
                                    if (ay === K) {
                                        return true
                                    }
                                    ay = ay.parentNode
                                }
                                return false
                            }
                            function av(aA, aG, ay, aD, aB, aE, aC) {
                                var az = aA.parentNode
                                  , aF = 1;
                                if (!ax(aA)) {
                                    return false
                                }
                                if (9 === az.nodeType) {
                                    return true
                                }
                                if ("0" === au(aA, "opacity") || "none" === au(aA, "display") || "hidden" === au(aA, "visibility")) {
                                    return false
                                }
                                if (!N(aG) || !N(ay) || !N(aD) || !N(aB) || !N(aE) || !N(aC)) {
                                    aG = aA.offsetTop;
                                    aB = aA.offsetLeft;
                                    aD = aG + aA.offsetHeight;
                                    ay = aB + aA.offsetWidth;
                                    aE = aA.offsetWidth;
                                    aC = aA.offsetHeight
                                }
                                if (aw === aA && (0 === aC || 0 === aE) && "hidden" === au(aA, "overflow")) {
                                    return false
                                }
                                if (az) {
                                    if (("hidden" === au(az, "overflow") || "scroll" === au(az, "overflow"))) {
                                        if (aB + aF > az.offsetWidth + az.scrollLeft || aB + aE - aF < az.scrollLeft || aG + aF > az.offsetHeight + az.scrollTop || aG + aC - aF < az.scrollTop) {
                                            return false
                                        }
                                    }
                                    if (aA.offsetParent === az) {
                                        aB += az.offsetLeft;
                                        aG += az.offsetTop
                                    }
                                    return av(az, aG, ay, aD, aB, aE, aC)
                                }
                                return true
                            }
                            return av(aw)
                        }
                        var aj = {
                            htmlCollectionToArray: function(aw) {
                                var au = [], av;
                                if (!aw || !aw.length) {
                                    return au
                                }
                                for (av = 0; av < aw.length; av++) {
                                    au.push(aw[av])
                                }
                                return au
                            },
                            find: function(au) {
                                if (!document.querySelectorAll || !au) {
                                    return []
                                }
                                var av = document.querySelectorAll(au);
                                return this.htmlCollectionToArray(av)
                            },
                            findMultiple: function(aw) {
                                if (!aw || !aw.length) {
                                    return []
                                }
                                var av, ax;
                                var au = [];
                                for (av = 0; av < aw.length; av++) {
                                    ax = this.find(aw[av]);
                                    au = au.concat(ax)
                                }
                                au = this.makeNodesUnique(au);
                                return au
                            },
                            findNodesByTagName: function(av, au) {
                                if (!av || !au || !av.getElementsByTagName) {
                                    return []
                                }
                                var aw = av.getElementsByTagName(au);
                                return this.htmlCollectionToArray(aw)
                            },
                            makeNodesUnique: function(au) {
                                var az = [].concat(au);
                                au.sort(function(aB, aA) {
                                    if (aB === aA) {
                                        return 0
                                    }
                                    var aD = Q(az, aB);
                                    var aC = Q(az, aA);
                                    if (aD === aC) {
                                        return 0
                                    }
                                    return aD > aC ? -1 : 1
                                });
                                if (au.length <= 1) {
                                    return au
                                }
                                var av = 0;
                                var ax = 0;
                                var ay = [];
                                var aw;
                                aw = au[av++];
                                while (aw) {
                                    if (aw === au[av]) {
                                        ax = ay.push(av)
                                    }
                                    aw = au[av++] || null
                                }
                                while (ax--) {
                                    au.splice(ay[ax], 1)
                                }
                                return au
                            },
                            getAttributeValueFromNode: function(ay, aw) {
                                if (!this.hasNodeAttribute(ay, aw)) {
                                    return
                                }
                                if (ay && ay.getAttribute) {
                                    return ay.getAttribute(aw)
                                }
                                if (!ay || !ay.attributes) {
                                    return
                                }
                                var ax = (typeof ay.attributes[aw]);
                                if ("undefined" === ax) {
                                    return
                                }
                                if (ay.attributes[aw].value) {
                                    return ay.attributes[aw].value
                                }
                                if (ay.attributes[aw].nodeValue) {
                                    return ay.attributes[aw].nodeValue
                                }
                                var av;
                                var au = ay.attributes;
                                if (!au) {
                                    return
                                }
                                for (av = 0; av < au.length; av++) {
                                    if (au[av].nodeName === aw) {
                                        return au[av].nodeValue
                                    }
                                }
                                return null
                            },
                            hasNodeAttributeWithValue: function(av, au) {
                                var aw = this.getAttributeValueFromNode(av, au);
                                return !!aw
                            },
                            hasNodeAttribute: function(aw, au) {
                                if (aw && aw.hasAttribute) {
                                    return aw.hasAttribute(au)
                                }
                                if (aw && aw.attributes) {
                                    var av = (typeof aw.attributes[au]);
                                    return "undefined" !== av
                                }
                                return false
                            },
                            hasNodeCssClass: function(aw, au) {
                                if (aw && au && aw.className) {
                                    var av = typeof aw.className === "string" ? aw.className.split(" ") : [];
                                    if (-1 !== Q(av, au)) {
                                        return true
                                    }
                                }
                                return false
                            },
                            findNodesHavingAttribute: function(ay, aw, au) {
                                if (!au) {
                                    au = []
                                }
                                if (!ay || !aw) {
                                    return au
                                }
                                var ax = T(ay);
                                if (!ax || !ax.length) {
                                    return au
                                }
                                var av, az;
                                for (av = 0; av < ax.length; av++) {
                                    az = ax[av];
                                    if (this.hasNodeAttribute(az, aw)) {
                                        au.push(az)
                                    }
                                    au = this.findNodesHavingAttribute(az, aw, au)
                                }
                                return au
                            },
                            findFirstNodeHavingAttribute: function(aw, av) {
                                if (!aw || !av) {
                                    return
                                }
                                if (this.hasNodeAttribute(aw, av)) {
                                    return aw
                                }
                                var au = this.findNodesHavingAttribute(aw, av);
                                if (au && au.length) {
                                    return au[0]
                                }
                            },
                            findFirstNodeHavingAttributeWithValue: function(ax, aw) {
                                if (!ax || !aw) {
                                    return
                                }
                                if (this.hasNodeAttributeWithValue(ax, aw)) {
                                    return ax
                                }
                                var au = this.findNodesHavingAttribute(ax, aw);
                                if (!au || !au.length) {
                                    return
                                }
                                var av;
                                for (av = 0; av < au.length; av++) {
                                    if (this.getAttributeValueFromNode(au[av], aw)) {
                                        return au[av]
                                    }
                                }
                            },
                            findNodesHavingCssClass: function(ay, ax, au) {
                                if (!au) {
                                    au = []
                                }
                                if (!ay || !ax) {
                                    return au
                                }
                                if (ay.getElementsByClassName) {
                                    var az = ay.getElementsByClassName(ax);
                                    return this.htmlCollectionToArray(az)
                                }
                                var aw = T(ay);
                                if (!aw || !aw.length) {
                                    return []
                                }
                                var av, aA;
                                for (av = 0; av < aw.length; av++) {
                                    aA = aw[av];
                                    if (this.hasNodeCssClass(aA, ax)) {
                                        au.push(aA)
                                    }
                                    au = this.findNodesHavingCssClass(aA, ax, au)
                                }
                                return au
                            },
                            findFirstNodeHavingClass: function(aw, av) {
                                if (!aw || !av) {
                                    return
                                }
                                if (this.hasNodeCssClass(aw, av)) {
                                    return aw
                                }
                                var au = this.findNodesHavingCssClass(aw, av);
                                if (au && au.length) {
                                    return au[0]
                                }
                            },
                            isLinkElement: function(av) {
                                if (!av) {
                                    return false
                                }
                                var au = String(av.nodeName).toLowerCase();
                                var ax = ["a", "area"];
                                var aw = Q(ax, au);
                                return aw !== -1
                            },
                            setAnyAttribute: function(av, au, aw) {
                                if (!av || !au) {
                                    return
                                }
                                if (av.setAttribute) {
                                    av.setAttribute(au, aw)
                                } else {
                                    av[au] = aw
                                }
                            }
                        };
                        var x = {
                            CONTENT_ATTR: "data-track-content",
                            CONTENT_CLASS: "matomoTrackContent",
                            LEGACY_CONTENT_CLASS: "piwikTrackContent",
                            CONTENT_NAME_ATTR: "data-content-name",
                            CONTENT_PIECE_ATTR: "data-content-piece",
                            CONTENT_PIECE_CLASS: "matomoContentPiece",
                            LEGACY_CONTENT_PIECE_CLASS: "piwikContentPiece",
                            CONTENT_TARGET_ATTR: "data-content-target",
                            CONTENT_TARGET_CLASS: "matomoContentTarget",
                            LEGACY_CONTENT_TARGET_CLASS: "piwikContentTarget",
                            CONTENT_IGNOREINTERACTION_ATTR: "data-content-ignoreinteraction",
                            CONTENT_IGNOREINTERACTION_CLASS: "matomoContentIgnoreInteraction",
                            LEGACY_CONTENT_IGNOREINTERACTION_CLASS: "piwikContentIgnoreInteraction",
                            location: undefined,
                            findContentNodes: function() {
                                var av = "." + this.CONTENT_CLASS;
                                var aw = "." + this.LEGACY_CONTENT_CLASS;
                                var au = "[" + this.CONTENT_ATTR + "]";
                                var ax = aj.findMultiple([av, aw, au]);
                                return ax
                            },
                            findContentNodesWithinNode: function(ax) {
                                if (!ax) {
                                    return []
                                }
                                var av = aj.findNodesHavingCssClass(ax, this.CONTENT_CLASS);
                                av = aj.findNodesHavingCssClass(ax, this.LEGACY_CONTENT_CLASS, av);
                                var au = aj.findNodesHavingAttribute(ax, this.CONTENT_ATTR);
                                if (au && au.length) {
                                    var aw;
                                    for (aw = 0; aw < au.length; aw++) {
                                        av.push(au[aw])
                                    }
                                }
                                if (aj.hasNodeAttribute(ax, this.CONTENT_ATTR)) {
                                    av.push(ax)
                                } else {
                                    if (aj.hasNodeCssClass(ax, this.CONTENT_CLASS)) {
                                        av.push(ax)
                                    } else {
                                        if (aj.hasNodeCssClass(ax, this.LEGACY_CONTENT_CLASS)) {
                                            av.push(ax)
                                        }
                                    }
                                }
                                av = aj.makeNodesUnique(av);
                                return av
                            },
                            findParentContentNode: function(av) {
                                if (!av) {
                                    return
                                }
                                var aw = av;
                                var au = 0;
                                while (aw && aw !== K && aw.parentNode) {
                                    if (aj.hasNodeAttribute(aw, this.CONTENT_ATTR)) {
                                        return aw
                                    }
                                    if (aj.hasNodeCssClass(aw, this.CONTENT_CLASS)) {
                                        return aw
                                    }
                                    if (aj.hasNodeCssClass(aw, this.LEGACY_CONTENT_CLASS)) {
                                        return aw
                                    }
                                    aw = aw.parentNode;
                                    if (au > 1000) {
                                        break
                                    }
                                    au++
                                }
                            },
                            findPieceNode: function(av) {
                                var au;
                                au = aj.findFirstNodeHavingAttribute(av, this.CONTENT_PIECE_ATTR);
                                if (!au) {
                                    au = aj.findFirstNodeHavingClass(av, this.CONTENT_PIECE_CLASS)
                                }
                                if (!au) {
                                    au = aj.findFirstNodeHavingClass(av, this.LEGACY_CONTENT_PIECE_CLASS)
                                }
                                if (au) {
                                    return au
                                }
                                return av
                            },
                            findTargetNodeNoDefault: function(au) {
                                if (!au) {
                                    return
                                }
                                var av = aj.findFirstNodeHavingAttributeWithValue(au, this.CONTENT_TARGET_ATTR);
                                if (av) {
                                    return av
                                }
                                av = aj.findFirstNodeHavingAttribute(au, this.CONTENT_TARGET_ATTR);
                                if (av) {
                                    return av
                                }
                                av = aj.findFirstNodeHavingClass(au, this.CONTENT_TARGET_CLASS);
                                if (av) {
                                    return av
                                }
                                av = aj.findFirstNodeHavingClass(au, this.LEGACY_CONTENT_TARGET_CLASS);
                                if (av) {
                                    return av
                                }
                            },
                            findTargetNode: function(au) {
                                var av = this.findTargetNodeNoDefault(au);
                                if (av) {
                                    return av
                                }
                                return au
                            },
                            findContentName: function(av) {
                                if (!av) {
                                    return
                                }
                                var ay = aj.findFirstNodeHavingAttributeWithValue(av, this.CONTENT_NAME_ATTR);
                                if (ay) {
                                    return aj.getAttributeValueFromNode(ay, this.CONTENT_NAME_ATTR)
                                }
                                var au = this.findContentPiece(av);
                                if (au) {
                                    return this.removeDomainIfIsInLink(au)
                                }
                                if (aj.hasNodeAttributeWithValue(av, "title")) {
                                    return aj.getAttributeValueFromNode(av, "title")
                                }
                                var aw = this.findPieceNode(av);
                                if (aj.hasNodeAttributeWithValue(aw, "title")) {
                                    return aj.getAttributeValueFromNode(aw, "title")
                                }
                                var ax = this.findTargetNode(av);
                                if (aj.hasNodeAttributeWithValue(ax, "title")) {
                                    return aj.getAttributeValueFromNode(ax, "title")
                                }
                            },
                            findContentPiece: function(av) {
                                if (!av) {
                                    return
                                }
                                var ax = aj.findFirstNodeHavingAttributeWithValue(av, this.CONTENT_PIECE_ATTR);
                                if (ax) {
                                    return aj.getAttributeValueFromNode(ax, this.CONTENT_PIECE_ATTR)
                                }
                                var au = this.findPieceNode(av);
                                var aw = this.findMediaUrlInNode(au);
                                if (aw) {
                                    return this.toAbsoluteUrl(aw)
                                }
                            },
                            findContentTarget: function(aw) {
                                if (!aw) {
                                    return
                                }
                                var ax = this.findTargetNode(aw);
                                if (aj.hasNodeAttributeWithValue(ax, this.CONTENT_TARGET_ATTR)) {
                                    return aj.getAttributeValueFromNode(ax, this.CONTENT_TARGET_ATTR)
                                }
                                var av;
                                if (aj.hasNodeAttributeWithValue(ax, "href")) {
                                    av = aj.getAttributeValueFromNode(ax, "href");
                                    return this.toAbsoluteUrl(av)
                                }
                                var au = this.findPieceNode(aw);
                                if (aj.hasNodeAttributeWithValue(au, "href")) {
                                    av = aj.getAttributeValueFromNode(au, "href");
                                    return this.toAbsoluteUrl(av)
                                }
                            },
                            isSameDomain: function(au) {
                                if (!au || !au.indexOf) {
                                    return false
                                }
                                if (0 === au.indexOf(this.getLocation().origin)) {
                                    return true
                                }
                                var av = au.indexOf(this.getLocation().host);
                                if (8 >= av && 0 <= av) {
                                    return true
                                }
                                return false
                            },
                            removeDomainIfIsInLink: function(aw) {
                                var av = "^https?://[^/]+";
                                var au = "^.*//[^/]+";
                                if (aw && aw.search && -1 !== aw.search(new RegExp(av)) && this.isSameDomain(aw)) {
                                    aw = aw.replace(new RegExp(au), "");
                                    if (!aw) {
                                        aw = "/"
                                    }
                                }
                                return aw
                            },
                            findMediaUrlInNode: function(ay) {
                                if (!ay) {
                                    return
                                }
                                var aw = ["img", "embed", "video", "audio"];
                                var au = ay.nodeName.toLowerCase();
                                if (-1 !== Q(aw, au) && aj.findFirstNodeHavingAttributeWithValue(ay, "src")) {
                                    var ax = aj.findFirstNodeHavingAttributeWithValue(ay, "src");
                                    return aj.getAttributeValueFromNode(ax, "src")
                                }
                                if (au === "object" && aj.hasNodeAttributeWithValue(ay, "data")) {
                                    return aj.getAttributeValueFromNode(ay, "data")
                                }
                                if (au === "object") {
                                    var az = aj.findNodesByTagName(ay, "param");
                                    if (az && az.length) {
                                        var av;
                                        for (av = 0; av < az.length; av++) {
                                            if ("movie" === aj.getAttributeValueFromNode(az[av], "name") && aj.hasNodeAttributeWithValue(az[av], "value")) {
                                                return aj.getAttributeValueFromNode(az[av], "value")
                                            }
                                        }
                                    }
                                    var aA = aj.findNodesByTagName(ay, "embed");
                                    if (aA && aA.length) {
                                        return this.findMediaUrlInNode(aA[0])
                                    }
                                }
                            },
                            trim: function(au) {
                                return a(au)
                            },
                            isOrWasNodeInViewport: function(az) {
                                if (!az || !az.getBoundingClientRect || az.nodeType !== 1) {
                                    return true
                                }
                                var ay = az.getBoundingClientRect();
                                var ax = K.documentElement || {};
                                var aw = ay.top < 0;
                                if (aw && az.offsetTop) {
                                    aw = (az.offsetTop + ay.height) > 0
                                }
                                var av = ax.clientWidth;
                                if (X.innerWidth && av > X.innerWidth) {
                                    av = X.innerWidth
                                }
                                var au = ax.clientHeight;
                                if (X.innerHeight && au > X.innerHeight) {
                                    au = X.innerHeight
                                }
                                return ((ay.bottom > 0 || aw) && ay.right > 0 && ay.left < av && ((ay.top < au) || aw))
                            },
                            isNodeVisible: function(av) {
                                var au = i(av);
                                var aw = this.isOrWasNodeInViewport(av);
                                return au && aw
                            },
                            buildInteractionRequestParams: function(au, av, aw, ax) {
                                var ay = "";
                                if (au) {
                                    ay += "c_i=" + u(au)
                                }
                                if (av) {
                                    if (ay) {
                                        ay += "&"
                                    }
                                    ay += "c_n=" + u(av)
                                }
                                if (aw) {
                                    if (ay) {
                                        ay += "&"
                                    }
                                    ay += "c_p=" + u(aw)
                                }
                                if (ax) {
                                    if (ay) {
                                        ay += "&"
                                    }
                                    ay += "c_t=" + u(ax)
                                }
                                if (ay) {
                                    ay += "&ca=1"
                                }
                                return ay
                            },
                            buildImpressionRequestParams: function(au, av, aw) {
                                var ax = "c_n=" + u(au) + "&c_p=" + u(av);
                                if (aw) {
                                    ax += "&c_t=" + u(aw)
                                }
                                if (ax) {
                                    ax += "&ca=1"
                                }
                                return ax
                            },
                            buildContentBlock: function(aw) {
                                if (!aw) {
                                    return
                                }
                                var au = this.findContentName(aw);
                                var av = this.findContentPiece(aw);
                                var ax = this.findContentTarget(aw);
                                au = this.trim(au);
                                av = this.trim(av);
                                ax = this.trim(ax);
                                return {
                                    name: au || "Unknown",
                                    piece: av || "Unknown",
                                    target: ax || ""
                                }
                            },
                            collectContent: function(ax) {
                                if (!ax || !ax.length) {
                                    return []
                                }
                                var aw = [];
                                var au, av;
                                for (au = 0; au < ax.length; au++) {
                                    av = this.buildContentBlock(ax[au]);
                                    if (N(av)) {
                                        aw.push(av)
                                    }
                                }
                                return aw
                            },
                            setLocation: function(au) {
                                this.location = au
                            },
                            getLocation: function() {
                                var au = this.location || X.location;
                                if (!au.origin) {
                                    au.origin = au.protocol + "//" + au.hostname + (au.port ? ":" + au.port : "")
                                }
                                return au
                            },
                            toAbsoluteUrl: function(av) {
                                if ((!av || String(av) !== av) && av !== "") {
                                    return av
                                }
                                if ("" === av) {
                                    return this.getLocation().href
                                }
                                if (av.search(/^\/\//) !== -1) {
                                    return this.getLocation().protocol + av
                                }
                                if (av.search(/:\/\//) !== -1) {
                                    return av
                                }
                                if (0 === av.indexOf("#")) {
                                    return this.getLocation().origin + this.getLocation().pathname + av
                                }
                                if (0 === av.indexOf("?")) {
                                    return this.getLocation().origin + this.getLocation().pathname + av
                                }
                                if (0 === av.search("^[a-zA-Z]{2,11}:")) {
                                    return av
                                }
                                if (av.search(/^\//) !== -1) {
                                    return this.getLocation().origin + av
                                }
                                var au = "(.*/)";
                                var aw = this.getLocation().origin + this.getLocation().pathname.match(new RegExp(au))[0];
                                return aw + av
                            },
                            isUrlToCurrentDomain: function(av) {
                                var aw = this.toAbsoluteUrl(av);
                                if (!aw) {
                                    return false
                                }
                                var au = this.getLocation().origin;
                                if (au === aw) {
                                    return true
                                }
                                if (0 === String(aw).indexOf(au)) {
                                    if (":" === String(aw).substr(au.length, 1)) {
                                        return false
                                    }
                                    return true
                                }
                                return false
                            },
                            setHrefAttribute: function(av, au) {
                                if (!av || !au) {
                                    return
                                }
                                aj.setAnyAttribute(av, "href", au)
                            },
                            shouldIgnoreInteraction: function(au) {
                                if (aj.hasNodeAttribute(au, this.CONTENT_IGNOREINTERACTION_ATTR)) {
                                    return true
                                }
                                if (aj.hasNodeCssClass(au, this.CONTENT_IGNOREINTERACTION_CLASS)) {
                                    return true
                                }
                                if (aj.hasNodeCssClass(au, this.LEGACY_CONTENT_IGNOREINTERACTION_CLASS)) {
                                    return true
                                }
                                return false
                            }
                        };
                        function ab(av, ay) {
                            if (ay) {
                                return ay
                            }
                            av = x.toAbsoluteUrl(av);
                            if (B(av, "?")) {
                                var ax = av.indexOf("?");
                                av = av.slice(0, ax)
                            }
                            if (V(av, "matomo.php")) {
                                av = f(av, "matomo.php".length)
                            } else {
                                if (V(av, "piwik.php")) {
                                    av = f(av, "piwik.php".length)
                                } else {
                                    if (V(av, ".php")) {
                                        var au = av.lastIndexOf("/");
                                        var aw = 1;
                                        av = av.slice(0, au + aw)
                                    }
                                }
                            }
                            if (V(av, "/js/")) {
                                av = f(av, "js/".length)
                            }
                            return av
                        }
                        function S(aA) {
                            var aC = "Matomo_Overlay";
                            var av = new RegExp("index\\.php\\?module=Overlay&action=startOverlaySession&idSite=([0-9]+)&period=([^&]+)&date=([^&]+)(&segment=[^&]*)?");
                            var aw = av.exec(K.referrer);
                            if (aw) {
                                var ay = aw[1];
                                if (ay !== String(aA)) {
                                    return false
                                }
                                var az = aw[2]
                                  , au = aw[3]
                                  , ax = aw[4];
                                if (!ax) {
                                    ax = ""
                                } else {
                                    if (ax.indexOf("&segment=") === 0) {
                                        ax = ax.substr("&segment=".length)
                                    }
                                }
                                X.name = aC + "###" + az + "###" + au + "###" + ax
                            }
                            var aB = X.name.split("###");
                            return aB.length === 4 && aB[0] === aC
                        }
                        function ae(av, aA, aw) {
                            var az = X.name.split("###")
                              , ay = az[1]
                              , au = az[2]
                              , ax = az[3]
                              , aB = ab(av, aA);
                            o(aB + "plugins/Overlay/client/client.js?v=1", function() {
                                Matomo_Overlay_Client.initialize(aB, aw, ay, au, ax)
                            })
                        }
                        function w() {
                            var aw;
                            try {
                                aw = X.frameElement
                            } catch (av) {
                                return true
                            }
                            if (N(aw)) {
                                return (aw && String(aw.nodeName).toLowerCase() === "iframe") ? true : false
                            }
                            try {
                                return X.self !== X.top
                            } catch (au) {
                                return true
                            }
                        }
                        function U(ct, cn) {
                            var bV = this, bo = "mtm_consent", c1 = "mtm_cookie_consent", da = "mtm_consent_removed", ch = af(K.domain, X.location.href, O()), di = P(ch[0]), bZ = p(ch[1]), bA = p(ch[2]), dg = false, cx = "GET", dC = cx, aQ = "application/x-www-form-urlencoded; charset=UTF-8", cR = aQ, aM = ct || "", bU = "", dr = "", cD = "", cj = cn || "", bL = "", b0 = "", bf, bu = "", dy = ["3mf", "7z", "aac", "apk", "arc", "arj", "asc", "asf", "asx", "avi", "azw3", "bin", "bz", "bz2", "csv", "deb", "dmg", "doc", "docx", "epub", "exe", "flv", "gif", "gz", "gzip", "hqx", "ibooks", "jar", "jpeg", "jpg", "js", "md5", "mobi", "mov", "movie", "mp2", "mp3", "mp4", "mpg", "mpeg", "msi", "msp", "obj", "odb", "odf", "odg", "ods", "odt", "ogg", "ogv", "pdf", "phps", "png", "ply", "ppt", "pptx", "qt", "qtm", "ra", "ram", "rar", "rpm", "rtf", "sea", "sha", "sha256", "sha512", "sig", "sit", "stl", "tar", "tbz", "tbz2", "tgz", "torrent", "txt", "wav", "wma", "wmv", "wpd", "xls", "xlsx", "xml", "xz", "z", "zip"], aG = [di], bM = [], cS = [".paypal.com"], cy = [], bY = [], bj = [], bW = 500, dl = true, c7, bg, b4, b1, aw, cH = ["pk_campaign", "mtm_campaign", "piwik_campaign", "matomo_campaign", "utm_campaign", "utm_source", "utm_medium"], bT = ["pk_kwd", "mtm_kwd", "piwik_kwd", "matomo_kwd", "utm_term"], cV = ["mtm_campaign", "matomo_campaign", "mtm_cpn", "pk_campaign", "piwik_campaign", "pk_cpn", "utm_campaign", "mtm_keyword", "matomo_kwd", "mtm_kwd", "pk_keyword", "piwik_kwd", "pk_kwd", "utm_term", "mtm_source", "pk_source", "utm_source", "mtm_medium", "pk_medium", "utm_medium", "mtm_content", "pk_content", "utm_content", "mtm_cid", "pk_cid", "utm_id", "mtm_clid", "mtm_group", "pk_group", "mtm_placement", "pk_placement"], bv = "_pk_", aD = "pk_vid", ba = 180, dp, bC, b5 = false, aR = "Lax", bx = false, de, bp, dm = true, bI, c8 = 33955200000, cE = 1800000, dx = 15768000000, bd = true, bR = false, bs = false, b3 = false, aZ = false, cq, b9 = {}, cC = {}, bz = {}, bG = 200, cN = {}, ds = {}, dz = {}, a3 = {}, co = [], by = false, ck = false, cp = [], cu = false, cZ = false, ax = false, dA = false, db = false, aW = false, bn = w(), cT = null, dq = null, a0, bO, cl = ar, bB, aU, bN = false, cK = 0, bH = ["id", "ses", "cvar", "ref"], cY = false, bP = null, c9 = [], cM = [], aF = Y++, aE = false, dn = true, cW = false;
                            try {
                                bu = K.title
                            } catch (cU) {
                                bu = ""
                            }
                            function aL(dN) {
                                if (bx && dN !== da) {
                                    return 0
                                }
                                var dL = new RegExp("(^|;)[ ]*" + dN + "=([^;]*)")
                                  , dM = dL.exec(K.cookie);
                                return dM ? W(dM[2]) : 0
                            }
                            bP = !aL(da);
                            function dG(dP, dQ, dT, dS, dN, dO, dR) {
                                if (bx && dP !== da) {
                                    return
                                }
                                var dM;
                                if (dT) {
                                    dM = new Date();
                                    dM.setTime(dM.getTime() + dT)
                                }
                                if (!dR) {
                                    dR = "Lax"
                                }
                                K.cookie = dP + "=" + u(dQ) + (dT ? ";expires=" + dM.toGMTString() : "") + ";path=" + (dS || "/") + (dN ? ";domain=" + dN : "") + (dO ? ";secure" : "") + ";SameSite=" + dR;
                                if ((!dT || dT >= 0) && aL(dP) !== String(dQ)) {
                                    var dL = "There was an error setting cookie `" + dP + "`. Please check domain and path.";
                                    ap(dL)
                                }
                            }
                            function cf(dL) {
                                var dN, dM;
                                if (dm !== true && !cY) {
                                    for (dM = 0; dM < cH.length; dM++) {
                                        dL = j(dL, cH[dM])
                                    }
                                    for (dM = 0; dM < bT.length; dM++) {
                                        dL = j(dL, bT[dM])
                                    }
                                    for (dM = 0; dM < cV.length; dM++) {
                                        dL = j(dL, cV[dM])
                                    }
                                }
                                dL = j(dL, aD);
                                dL = j(dL, "ignore_referrer");
                                dL = j(dL, "ignore_referer");
                                for (dM = 0; dM < cy.length; dM++) {
                                    dL = j(dL, cy[dM])
                                }
                                if (b1) {
                                    dN = new RegExp("#.*");
                                    return dL.replace(dN, "")
                                }
                                return dL
                            }
                            function b8(dN, dL) {
                                var dO = t(dL), dM;
                                if (dO) {
                                    return dL
                                }
                                if (dL.slice(0, 1) === "/") {
                                    return t(dN) + "://" + d(dN) + dL
                                }
                                dN = cf(dN);
                                dM = dN.indexOf("?");
                                if (dM >= 0) {
                                    dN = dN.slice(0, dM)
                                }
                                dM = dN.lastIndexOf("/");
                                if (dM !== dN.length - 1) {
                                    dN = dN.slice(0, dM + 1)
                                }
                                return dN + dL
                            }
                            function c5(dN, dL) {
                                var dM;
                                dN = String(dN).toLowerCase();
                                dL = String(dL).toLowerCase();
                                if (dN === dL) {
                                    return true
                                }
                                if (dL.slice(0, 1) === ".") {
                                    if (dN === dL.slice(1)) {
                                        return true
                                    }
                                    dM = dN.length - dL.length;
                                    if ((dM > 0) && (dN.slice(dM) === dL)) {
                                        return true
                                    }
                                }
                                return false
                            }
                            function cB(dL) {
                                var dM = document.createElement("a");
                                if (dL.indexOf("//") !== 0 && dL.indexOf("http") !== 0) {
                                    if (dL.indexOf("*") === 0) {
                                        dL = dL.substr(1)
                                    }
                                    if (dL.indexOf(".") === 0) {
                                        dL = dL.substr(1)
                                    }
                                    dL = "http://" + dL
                                }
                                dM.href = x.toAbsoluteUrl(dL);
                                if (dM.pathname) {
                                    return dM.pathname
                                }
                                return ""
                            }
                            function be(dM, dL) {
                                if (!ao(dL, "/")) {
                                    dL = "/" + dL
                                }
                                if (!ao(dM, "/")) {
                                    dM = "/" + dM
                                }
                                var dN = (dL === "/" || dL === "/*");
                                if (dN) {
                                    return true
                                }
                                if (dM === dL) {
                                    return true
                                }
                                dL = String(dL).toLowerCase();
                                dM = String(dM).toLowerCase();
                                if (V(dL, "*")) {
                                    dL = dL.slice(0, -1);
                                    dN = (!dL || dL === "/");
                                    if (dN) {
                                        return true
                                    }
                                    if (dM === dL) {
                                        return true
                                    }
                                    return dM.indexOf(dL) === 0
                                }
                                if (!V(dM, "/")) {
                                    dM += "/"
                                }
                                if (!V(dL, "/")) {
                                    dL += "/"
                                }
                                return dM.indexOf(dL) === 0
                            }
                            function aA(dP, dR) {
                                var dM, dL, dN, dO, dQ;
                                for (dM = 0; dM < aG.length; dM++) {
                                    dO = P(aG[dM]);
                                    dQ = cB(aG[dM]);
                                    if (c5(dP, dO) && be(dR, dQ)) {
                                        return true
                                    }
                                }
                                return false
                            }
                            function a6(dO) {
                                var dM, dL, dN;
                                for (dM = 0; dM < aG.length; dM++) {
                                    dL = P(aG[dM].toLowerCase());
                                    if (dO === dL) {
                                        return true
                                    }
                                    if (dL.slice(0, 1) === ".") {
                                        if (dO === dL.slice(1)) {
                                            return true
                                        }
                                        dN = dO.length - dL.length;
                                        if ((dN > 0) && (dO.slice(dN) === dL)) {
                                            return true
                                        }
                                    }
                                }
                                return false
                            }
                            function cJ(dL) {
                                var dM, dO, dQ, dN, dP;
                                if (!dL.length || !cS.length) {
                                    return false
                                }
                                dO = d(dL);
                                dQ = cB(dL);
                                if (dO.indexOf("www.") === 0) {
                                    dO = dO.substr(4)
                                }
                                for (dM = 0; dM < cS.length; dM++) {
                                    dN = P(cS[dM]);
                                    dP = cB(cS[dM]);
                                    if (dN.indexOf("www.") === 0) {
                                        dN = dN.substr(4)
                                    }
                                    if (c5(dO, dN) && be(dQ, dP)) {
                                        return true
                                    }
                                }
                                return false
                            }
                            function au() {
                                if (q && q.length > 0) {
                                    return true
                                }
                                q = e(X.location.href, "tracker_install_check");
                                return q && q.length > 0
                            }
                            function cI() {
                                if (au() && aa(X)) {
                                    X.close()
                                }
                            }
                            function cF(dL, dN) {
                                dL = dL.replace("send_image=0", "send_image=1");
                                var dM = new Image(1,1);
                                dM.onload = function() {
                                    I = 0;
                                    if (typeof dN === "function") {
                                        dN({
                                            request: dL,
                                            trackerUrl: aM,
                                            success: true
                                        })
                                    }
                                }
                                ;
                                dM.onerror = function() {
                                    if (typeof dN === "function") {
                                        dN({
                                            request: dL,
                                            trackerUrl: aM,
                                            success: false
                                        })
                                    }
                                }
                                ;
                                dM.src = aM + (aM.indexOf("?") < 0 ? "?" : "&") + dL;
                                cI()
                            }
                            function c2(dL) {
                                if (dC === "POST") {
                                    return true
                                }
                                return dL && (dL.length > 2000 || dL.indexOf('{"requests"') === 0)
                            }
                            function aT() {
                                return "object" === typeof g && "function" === typeof g.sendBeacon && "function" === typeof Blob
                            }
                            function bh(dP, dS, dR) {
                                var dN = aT();
                                if (!dN) {
                                    return false
                                }
                                var dO = {
                                    type: "application/x-www-form-urlencoded; charset=UTF-8"
                                };
                                var dT = false;
                                var dM = aM;
                                try {
                                    var dL = new Blob([dP],dO);
                                    if (dR && !c2(dP)) {
                                        dL = new Blob([],dO);
                                        dM = dM + (dM.indexOf("?") < 0 ? "?" : "&") + dP
                                    }
                                    dT = g.sendBeacon(dM, dL)
                                } catch (dQ) {
                                    return false
                                }
                                if (dT && typeof dS === "function") {
                                    dS({
                                        request: dP,
                                        trackerUrl: aM,
                                        success: true,
                                        isSendBeacon: true
                                    })
                                }
                                cI();
                                return dT
                            }
                            function dw(dM, dN, dL) {
                                if (!N(dL) || null === dL) {
                                    dL = true
                                }
                                if (m && bh(dM, dN, dL)) {
                                    return
                                }
                                setTimeout(function() {
                                    if (m && bh(dM, dN, dL)) {
                                        return
                                    }
                                    var dQ;
                                    try {
                                        var dP = X.XMLHttpRequest ? new X.XMLHttpRequest() : X.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : null;
                                        dP.open("POST", aM, true);
                                        dP.onreadystatechange = function() {
                                            if (this.readyState === 4 && !(this.status >= 200 && this.status < 300)) {
                                                var dR = m && bh(dM, dN, dL);
                                                if (!dR && dL) {
                                                    cF(dM, dN)
                                                } else {
                                                    if (typeof dN === "function") {
                                                        dN({
                                                            request: dM,
                                                            trackerUrl: aM,
                                                            success: false,
                                                            xhr: this
                                                        })
                                                    }
                                                }
                                            } else {
                                                if (this.readyState === 4 && (typeof dN === "function")) {
                                                    dN({
                                                        request: dM,
                                                        trackerUrl: aM,
                                                        success: true,
                                                        xhr: this
                                                    })
                                                }
                                            }
                                        }
                                        ;
                                        dP.setRequestHeader("Content-Type", cR);
                                        dP.withCredentials = true;
                                        dP.send(dM)
                                    } catch (dO) {
                                        dQ = m && bh(dM, dN, dL);
                                        if (!dQ && dL) {
                                            cF(dM, dN)
                                        } else {
                                            if (typeof dN === "function") {
                                                dN({
                                                    request: dM,
                                                    trackerUrl: aM,
                                                    success: false
                                                })
                                            }
                                        }
                                    }
                                    cI()
                                }, 50)
                            }
                            function cv(dM) {
                                var dL = new Date();
                                var dN = dL.getTime() + dM;
                                if (!s || dN > s) {
                                    s = dN
                                }
                            }
                            function bl() {
                                bn = true;
                                cT = new Date().getTime()
                            }
                            function dF() {
                                var dL = new Date().getTime();
                                return !cT || (dL - cT) > bg
                            }
                            function aH() {
                                if (dF()) {
                                    b4()
                                }
                            }
                            function a5() {
                                if (K.visibilityState === "hidden" && dF()) {
                                    b4()
                                } else {
                                    if (K.visibilityState === "visible") {
                                        cT = new Date().getTime()
                                    }
                                }
                            }
                            function dJ() {
                                if (aW || !bg) {
                                    return
                                }
                                aW = true;
                                at(X, "focus", bl);
                                at(X, "blur", aH);
                                at(X, "visibilitychange", a5);
                                ag++;
                                v.addPlugin("HeartBeat" + ag, {
                                    unload: function() {
                                        if (aW && dF()) {
                                            b4()
                                        }
                                    }
                                })
                            }
                            function c0(dP) {
                                var dM = new Date();
                                var dL = dM.getTime();
                                dq = dL;
                                if (cZ && dL < cZ) {
                                    var dN = cZ - dL;
                                    setTimeout(dP, dN);
                                    cv(dN + 50);
                                    cZ += 50;
                                    return
                                }
                                if (cZ === false) {
                                    var dO = 800;
                                    cZ = dL + dO
                                }
                                dP()
                            }
                            function aX() {
                                if (aL(da)) {
                                    bP = false
                                } else {
                                    if (aL(bo)) {
                                        bP = true
                                    }
                                }
                            }
                            function b2(dO) {
                                var dN, dM = "", dL = "";
                                for (dN in dz) {
                                    if (Object.prototype.hasOwnProperty.call(dz, dN)) {
                                        dL += "&" + dN + "=" + dz[dN]
                                    }
                                }
                                if (a3) {
                                    dM = "&uadata=" + u(X.JSON.stringify(a3))
                                }
                                if (dO instanceof Array) {
                                    for (dN = 0; dN < dO.length; dN++) {
                                        dO[dN] += dM + dL
                                    }
                                } else {
                                    dO += dM + dL
                                }
                                return dO
                            }
                            function av() {
                                return N(g.userAgentData) && D(g.userAgentData.getHighEntropyValues)
                            }
                            function cG(dL) {
                                if (by || ck) {
                                    return
                                }
                                ck = true;
                                a3 = {
                                    brands: g.userAgentData.brands,
                                    platform: g.userAgentData.platform
                                };
                                g.userAgentData.getHighEntropyValues(["brands", "model", "platform", "platformVersion", "uaFullVersion", "fullVersionList", "formFactors"]).then(function(dN) {
                                    var dM;
                                    if (dN.fullVersionList) {
                                        delete dN.brands;
                                        delete dN.uaFullVersion
                                    }
                                    a3 = dN;
                                    by = true;
                                    ck = false;
                                    dL()
                                }, function(dM) {
                                    by = true;
                                    ck = false;
                                    dL()
                                })
                            }
                            function bS(dM, dL, dN) {
                                aX();
                                if (!bP) {
                                    c9.push([dM, dN]);
                                    return
                                }
                                if (dn && !by && av()) {
                                    co.push([dM, dN]);
                                    return
                                }
                                aE = true;
                                if (!de && dM) {
                                    if (cY && bP) {
                                        dM += "&consent=1"
                                    }
                                    dM = b2(dM);
                                    c0(function() {
                                        if (dl && bh(dM, dN, true)) {
                                            cv(100);
                                            return
                                        }
                                        if (c2(dM)) {
                                            dw(dM, dN)
                                        } else {
                                            cF(dM, dN)
                                        }
                                        cv(dL)
                                    })
                                }
                                if (!aW) {
                                    dJ()
                                }
                            }
                            function cA(dL) {
                                if (de) {
                                    return false
                                }
                                return (dL && dL.length)
                            }
                            function dv(dL, dP) {
                                if (!dP || dP >= dL.length) {
                                    return [dL]
                                }
                                var dM = 0;
                                var dN = dL.length;
                                var dO = [];
                                for (dM; dM < dN; dM += dP) {
                                    dO.push(dL.slice(dM, dM + dP))
                                }
                                return dO
                            }
                            function dH(dM, dL) {
                                if (!cA(dM)) {
                                    return
                                }
                                if (dn && !by && av()) {
                                    co.push([dM, null]);
                                    return
                                }
                                if (!bP) {
                                    c9.push([dM, null]);
                                    return
                                }
                                aE = true;
                                c0(function() {
                                    var dP = dv(dM, 50);
                                    var dN = 0, dO;
                                    for (dN; dN < dP.length; dN++) {
                                        dO = '{"requests":["?' + b2(dP[dN]).join('","?') + '"],"send_image":0}';
                                        if (dl && bh(dO, null, false)) {
                                            cv(100)
                                        } else {
                                            dw(dO, null, false)
                                        }
                                    }
                                    cv(dL)
                                })
                            }
                            function a2(dL) {
                                return bv + dL + "." + cj + "." + bB
                            }
                            function cc(dN, dM, dL) {
                                dG(dN, "", -129600000, dM, dL)
                            }
                            function ci() {
                                if (bx) {
                                    return "0"
                                }
                                if (!N(X.showModalDialog) && N(g.cookieEnabled)) {
                                    return g.cookieEnabled ? "1" : "0"
                                }
                                var dL = bv + "testcookie";
                                dG(dL, "1", undefined, bC, dp, b5, aR);
                                var dM = aL(dL) === "1" ? "1" : "0";
                                cc(dL);
                                return dM
                            }
                            function bt() {
                                bB = cl((dp || di) + (bC || "/")).slice(0, 4)
                            }
                            function ay() {
                                var dM, dL;
                                for (dM = 0; dM < co.length; dM++) {
                                    dL = typeof co[dM][0];
                                    if (dL === "string") {
                                        bS(co[dM][0], bW, co[dM][1])
                                    } else {
                                        if (dL === "object") {
                                            dH(co[dM][0], bW)
                                        }
                                    }
                                }
                                co = []
                            }
                            function c6() {
                                if (!dn) {
                                    return {}
                                }
                                if (av()) {
                                    cG(ay)
                                }
                                if (N(dz.res)) {
                                    return dz
                                }
                                var dM, dO, dQ = {
                                    pdf: "application/pdf",
                                    qt: "video/quicktime",
                                    realp: "audio/x-pn-realaudio-plugin",
                                    wma: "application/x-mplayer2",
                                    fla: "application/x-shockwave-flash",
                                    java: "application/x-java-vm",
                                    ag: "application/x-silverlight"
                                };
                                if (!((new RegExp("MSIE")).test(g.userAgent))) {
                                    if (g.mimeTypes && g.mimeTypes.length) {
                                        for (dM in dQ) {
                                            if (Object.prototype.hasOwnProperty.call(dQ, dM)) {
                                                dO = g.mimeTypes[dQ[dM]];
                                                dz[dM] = (dO && dO.enabledPlugin) ? "1" : "0"
                                            }
                                        }
                                    }
                                    try {
                                        if (!((new RegExp("Edge[ /](\\d+[\\.\\d]+)")).test(g.userAgent)) && typeof navigator.javaEnabled !== "unknown" && N(g.javaEnabled) && g.javaEnabled()) {
                                            dz.java = "1"
                                        }
                                    } catch (dP) {}
                                    if (!N(X.showModalDialog) && N(g.cookieEnabled)) {
                                        dz.cookie = g.cookieEnabled ? "1" : "0"
                                    } else {
                                        dz.cookie = ci()
                                    }
                                }
                                var dN = parseInt(ac.width, 10);
                                var dL = parseInt(ac.height, 10);
                                dz.res = parseInt(dN, 10) + "x" + parseInt(dL, 10);
                                return dz
                            }
                            function ca() {
                                var dM = a2("cvar")
                                  , dL = aL(dM);
                                if (dL && dL.length) {
                                    dL = X.JSON.parse(dL);
                                    if (aa(dL)) {
                                        return dL
                                    }
                                }
                                return {}
                            }
                            function c3() {
                                if (aZ === false) {
                                    aZ = ca()
                                }
                            }
                            function df() {
                                var dL = c6();
                                return cl((g.userAgent || "") + (g.platform || "") + X.JSON.stringify(dL) + (new Date()).getTime() + Math.random()).slice(0, 16)
                            }
                            function aJ() {
                                var dL = c6();
                                return cl((g.userAgent || "") + (g.platform || "") + X.JSON.stringify(dL)).slice(0, 6)
                            }
                            function bq() {
                                return Math.floor((new Date()).getTime() / 1000)
                            }
                            function aS() {
                                var dM = bq();
                                var dN = aJ();
                                var dL = String(dM) + dN;
                                return dL
                            }
                            function du(dN) {
                                dN = String(dN);
                                var dQ = aJ();
                                var dO = dQ.length;
                                var dP = dN.substr(-1 * dO, dO);
                                var dM = parseInt(dN.substr(0, dN.length - dO), 10);
                                if (dM && dP && dP === dQ) {
                                    var dL = bq();
                                    if (ba <= 0) {
                                        return true
                                    }
                                    if (dL >= dM && dL <= (dM + ba)) {
                                        return true
                                    }
                                }
                                return false
                            }
                            function dI(dL) {
                                if (!db) {
                                    return ""
                                }
                                var dP = e(dL, aD);
                                if (!dP) {
                                    return ""
                                }
                                dP = String(dP);
                                var dN = new RegExp("^[a-zA-Z0-9]+$");
                                if (dP.length === 32 && dN.test(dP)) {
                                    var dM = dP.substr(16, 32);
                                    if (du(dM)) {
                                        var dO = dP.substr(0, 16);
                                        return dO
                                    }
                                }
                                return ""
                            }
                            function dc() {
                                if (!b0) {
                                    b0 = dI(bZ)
                                }
                                var dN = new Date(), dL = Math.round(dN.getTime() / 1000), dM = a2("id"), dQ = aL(dM), dP, dO;
                                if (dQ) {
                                    dP = dQ.split(".");
                                    dP.unshift("0");
                                    if (b0.length) {
                                        dP[1] = b0
                                    }
                                    return dP
                                }
                                if (b0.length) {
                                    dO = b0
                                } else {
                                    if ("0" === ci()) {
                                        dO = ""
                                    } else {
                                        dO = df()
                                    }
                                }
                                dP = ["1", dO, dL];
                                return dP
                            }
                            function a9() {
                                var dO = dc()
                                  , dM = dO[0]
                                  , dN = dO[1]
                                  , dL = dO[2];
                                return {
                                    newVisitor: dM,
                                    uuid: dN,
                                    createTs: dL
                                }
                            }
                            function aP() {
                                var dO = new Date()
                                  , dM = dO.getTime()
                                  , dP = a9().createTs;
                                var dL = parseInt(dP, 10);
                                var dN = (dL * 1000) + c8 - dM;
                                return dN
                            }
                            function aV(dL) {
                                if (!cj) {
                                    return
                                }
                                var dN = new Date()
                                  , dM = Math.round(dN.getTime() / 1000);
                                if (!N(dL)) {
                                    dL = a9()
                                }
                                var dO = dL.uuid + "." + dL.createTs + ".";
                                dG(a2("id"), dO, aP(), bC, dp, b5, aR)
                            }
                            function bX() {
                                var dL = aL(a2("ref"));
                                if (dL.length) {
                                    try {
                                        dL = X.JSON.parse(dL);
                                        if (aa(dL)) {
                                            return dL
                                        }
                                    } catch (dM) {}
                                }
                                return ["", "", 0, ""]
                            }
                            function bJ(dN) {
                                var dM = bv + "testcookie_domain";
                                var dL = "testvalue";
                                dG(dM, dL, 10000, null, dN, b5, aR);
                                if (aL(dM) === dL) {
                                    cc(dM, null, dN);
                                    return true
                                }
                                return false
                            }
                            function aN() {
                                var dM = bx;
                                bx = false;
                                var dL, dN;
                                for (dL = 0; dL < bH.length; dL++) {
                                    dN = a2(bH[dL]);
                                    if (dN !== da && dN !== bo && 0 !== aL(dN)) {
                                        cc(dN, bC, dp)
                                    }
                                }
                                bx = dM
                            }
                            function cg(dL) {
                                cj = dL
                            }
                            function dK(dP) {
                                if (!dP || !aa(dP)) {
                                    return
                                }
                                var dO = [];
                                var dN;
                                for (dN in dP) {
                                    if (Object.prototype.hasOwnProperty.call(dP, dN)) {
                                        dO.push(dN)
                                    }
                                }
                                var dQ = {};
                                dO.sort();
                                var dL = dO.length;
                                var dM;
                                for (dM = 0; dM < dL; dM++) {
                                    dQ[dO[dM]] = dP[dO[dM]]
                                }
                                return dQ
                            }
                            function cs() {
                                dG(a2("ses"), "1", cE, bC, dp, b5, aR)
                            }
                            function br() {
                                var dO = "";
                                var dM = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                                var dN = dM.length;
                                var dL;
                                for (dL = 0; dL < 6; dL++) {
                                    dO += dM.charAt(Math.floor(Math.random() * dN))
                                }
                                return dO
                            }
                            function aI(dM) {
                                if (cD !== "") {
                                    dM += cD;
                                    bs = true;
                                    return dM
                                }
                                if (!h) {
                                    return dM
                                }
                                var dN = (typeof h.timing === "object") && h.timing ? h.timing : undefined;
                                if (!dN) {
                                    dN = (typeof h.getEntriesByType === "function") && h.getEntriesByType("navigation") ? h.getEntriesByType("navigation")[0] : undefined
                                }
                                if (!dN) {
                                    return dM
                                }
                                var dL = "";
                                if (dN.connectEnd && dN.fetchStart) {
                                    if (dN.connectEnd < dN.fetchStart) {
                                        return dM
                                    }
                                    dL += "&pf_net=" + Math.round(dN.connectEnd - dN.fetchStart)
                                }
                                if (dN.responseStart && dN.requestStart) {
                                    if (dN.responseStart < dN.requestStart) {
                                        return dM
                                    }
                                    dL += "&pf_srv=" + Math.round(dN.responseStart - dN.requestStart)
                                }
                                if (dN.responseStart && dN.responseEnd) {
                                    if (dN.responseEnd < dN.responseStart) {
                                        return dM
                                    }
                                    dL += "&pf_tfr=" + Math.round(dN.responseEnd - dN.responseStart)
                                }
                                if (N(dN.domLoading)) {
                                    if (dN.domInteractive && dN.domLoading) {
                                        if (dN.domInteractive < dN.domLoading) {
                                            return dM
                                        }
                                        dL += "&pf_dm1=" + Math.round(dN.domInteractive - dN.domLoading)
                                    }
                                } else {
                                    if (dN.domInteractive && dN.responseEnd) {
                                        if (dN.domInteractive < dN.responseEnd) {
                                            return dM
                                        }
                                        dL += "&pf_dm1=" + Math.round(dN.domInteractive - dN.responseEnd)
                                    }
                                }
                                if (dN.domComplete && dN.domInteractive) {
                                    if (dN.domComplete < dN.domInteractive) {
                                        return dM
                                    }
                                    dL += "&pf_dm2=" + Math.round(dN.domComplete - dN.domInteractive)
                                }
                                if (dN.loadEventEnd && dN.loadEventStart) {
                                    if (dN.loadEventEnd < dN.loadEventStart) {
                                        return dM
                                    }
                                    dL += "&pf_onl=" + Math.round(dN.loadEventEnd - dN.loadEventStart)
                                }
                                return dM + dL
                            }
                            function cr(dL) {
                                return e(dL, "ignore_referrer") === "1" || e(dL, "ignore_referer") === "1"
                            }
                            function dB() {
                                var dV, dO = new Date(), dP = Math.round(dO.getTime() / 1000), d0, dN, dQ = 1024, dX, dR, dM = a2("ses"), dU = a2("ref"), dT = aL(dM), dL = bX(), dZ = bf || bZ, dW, dS, dY = {};
                                dW = dL[0];
                                dS = dL[1];
                                d0 = dL[2];
                                dN = dL[3];
                                if (!cr(dZ) && !dT) {
                                    if ((!bI || !dW.length) && (dm || cY)) {
                                        for (dV in cH) {
                                            if (Object.prototype.hasOwnProperty.call(cH, dV)) {
                                                dW = e(dZ, cH[dV]);
                                                if (dW.length) {
                                                    break
                                                }
                                            }
                                        }
                                        for (dV in bT) {
                                            if (Object.prototype.hasOwnProperty.call(bT, dV)) {
                                                dS = e(dZ, bT[dV]);
                                                if (dS.length) {
                                                    break
                                                }
                                            }
                                        }
                                    }
                                    dX = d(bA);
                                    dR = dN.length ? d(dN) : "";
                                    if (dX.length && !a6(dX) && !cJ(bA) && (!bI || !dR.length || a6(dR) || cJ(dN))) {
                                        dN = bA
                                    }
                                    if (dN.length || dW.length) {
                                        d0 = dP;
                                        dL = [dW, dS, d0, cf(dN.slice(0, dQ))];
                                        dG(dU, X.JSON.stringify(dL), dx, bC, dp, b5, aR)
                                    }
                                }
                                if (dW.length) {
                                    dY._rcn = u(dW)
                                }
                                if (dS.length) {
                                    dY._rck = u(dS)
                                }
                                dY._refts = d0;
                                if (String(dN).length) {
                                    dY._ref = u(cf(dN.slice(0, dQ)))
                                }
                                return dY
                            }
                            function cL(dM, dY, dZ) {
                                var dX, dL = new Date(), dW = aZ, dS = a2("cvar"), d1 = bf || bZ, dN = cr(d1);
                                if (bx) {
                                    aN()
                                }
                                if (de) {
                                    return ""
                                }
                                var d0 = new RegExp("^file://","i");
                                if (!cW && (X.location.protocol === "file:" || d0.test(d1))) {
                                    return ""
                                }
                                c6();
                                var dT = a9();
                                var dQ = K.characterSet || K.charset;
                                if (!dQ || dQ.toLowerCase() === "utf-8") {
                                    dQ = null
                                }
                                dM += "&idsite=" + cj + "&rec=1&r=" + String(Math.random()).slice(2, 8) + "&h=" + dL.getHours() + "&m=" + dL.getMinutes() + "&s=" + dL.getSeconds() + "&url=" + u(cf(d1)) + (bA.length && !cJ(bA) && !dN ? "&urlref=" + u(cf(bA)) : "") + (ad(bL) ? "&uid=" + u(bL) : "") + "&_id=" + dT.uuid + "&_idn=" + dT.newVisitor + (dQ ? "&cs=" + u(dQ) : "") + "&send_image=0";
                                var dV = dB();
                                for (dX in dV) {
                                    if (Object.prototype.hasOwnProperty.call(dV, dX)) {
                                        dM += "&" + dX + "=" + dV[dX]
                                    }
                                }
                                var d3 = [];
                                if (dY) {
                                    for (dX in dY) {
                                        if (Object.prototype.hasOwnProperty.call(dY, dX) && /^dimension\d+$/.test(dX)) {
                                            var dO = dX.replace("dimension", "");
                                            d3.push(parseInt(dO, 10));
                                            d3.push(String(dO));
                                            dM += "&" + dX + "=" + u(dY[dX]);
                                            delete dY[dX]
                                        }
                                    }
                                }
                                if (dY && E(dY)) {
                                    dY = null
                                }
                                for (dX in cN) {
                                    if (Object.prototype.hasOwnProperty.call(cN, dX)) {
                                        dM += "&" + dX + "=" + u(cN[dX])
                                    }
                                }
                                for (dX in bz) {
                                    if (Object.prototype.hasOwnProperty.call(bz, dX)) {
                                        var dR = (-1 === Q(d3, dX));
                                        if (dR) {
                                            dM += "&dimension" + dX + "=" + u(bz[dX])
                                        }
                                    }
                                }
                                if (dY) {
                                    dM += "&data=" + u(X.JSON.stringify(dY))
                                } else {
                                    if (aw) {
                                        dM += "&data=" + u(X.JSON.stringify(aw))
                                    }
                                }
                                function dP(d4, d5) {
                                    var d6 = X.JSON.stringify(d4);
                                    if (d6.length > 2) {
                                        return "&" + d5 + "=" + u(d6)
                                    }
                                    return ""
                                }
                                var d2 = dK(b9);
                                var dU = dK(cC);
                                dM += dP(d2, "cvar");
                                dM += dP(dU, "e_cvar");
                                if (aZ) {
                                    dM += dP(aZ, "_cvar");
                                    for (dX in dW) {
                                        if (Object.prototype.hasOwnProperty.call(dW, dX)) {
                                            if (aZ[dX][0] === "" || aZ[dX][1] === "") {
                                                delete aZ[dX]
                                            }
                                        }
                                    }
                                    if (b3) {
                                        dG(dS, X.JSON.stringify(aZ), cE, bC, dp, b5, aR)
                                    }
                                }
                                if (bd && bR && !bs) {
                                    dM = aI(dM);
                                    bs = true
                                }
                                if (aU) {
                                    dM += "&pv_id=" + aU
                                }
                                aV(dT);
                                cs();
                                dM += ah(dZ, {
                                    tracker: bV,
                                    request: dM
                                });
                                if (dr.length) {
                                    dM += "&" + dr
                                }
                                if (au()) {
                                    dM += "&tracker_install_check=" + q
                                }
                                if (D(cq)) {
                                    dM = cq(dM)
                                }
                                return dM
                            }
                            b4 = function bi() {
                                var dL = new Date();
                                dL = dL.getTime();
                                if (!dq) {
                                    return false
                                }
                                if (dq + bg <= dL) {
                                    bV.ping();
                                    return true
                                }
                                return false
                            }
                            ;
                            function bD(dO, dN, dS, dP, dL, dV) {
                                var dR = "idgoal=0", dM = new Date(), dT = [], dU, dQ = String(dO).length;
                                if (dQ) {
                                    dR += "&ec_id=" + u(dO)
                                }
                                dR += "&revenue=" + dN;
                                if (String(dS).length) {
                                    dR += "&ec_st=" + dS
                                }
                                if (String(dP).length) {
                                    dR += "&ec_tx=" + dP
                                }
                                if (String(dL).length) {
                                    dR += "&ec_sh=" + dL
                                }
                                if (String(dV).length) {
                                    dR += "&ec_dt=" + dV
                                }
                                if (ds) {
                                    for (dU in ds) {
                                        if (Object.prototype.hasOwnProperty.call(ds, dU)) {
                                            if (!N(ds[dU][1])) {
                                                ds[dU][1] = ""
                                            }
                                            if (!N(ds[dU][2])) {
                                                ds[dU][2] = ""
                                            }
                                            if (!N(ds[dU][3]) || String(ds[dU][3]).length === 0) {
                                                ds[dU][3] = 0
                                            }
                                            if (!N(ds[dU][4]) || String(ds[dU][4]).length === 0) {
                                                ds[dU][4] = 1
                                            }
                                            dT.push(ds[dU])
                                        }
                                    }
                                    dR += "&ec_items=" + u(X.JSON.stringify(dT))
                                }
                                dR = cL(dR, aw, "ecommerce");
                                bS(dR, bW);
                                if (dQ) {
                                    ds = {}
                                }
                            }
                            function cb(dL, dP, dO, dN, dM, dQ) {
                                if (String(dL).length && N(dP)) {
                                    bD(dL, dP, dO, dN, dM, dQ)
                                }
                            }
                            function bF(dL) {
                                if (N(dL)) {
                                    bD("", dL, "", "", "", "")
                                }
                            }
                            function cd(dM, dO, dN) {
                                if (!bN) {
                                    aU = br()
                                }
                                var dL = cL("action_name=" + u(aq(dM || bu)), dO, "log");
                                if (bd && !bs) {
                                    dL = aI(dL)
                                }
                                bS(dL, bW, dN)
                            }
                            function bb(dN, dM) {
                                var dO, dL = "(^| )(piwik[_-]" + dM + "|matomo[_-]" + dM;
                                if (dN) {
                                    for (dO = 0; dO < dN.length; dO++) {
                                        dL += "|" + dN[dO]
                                    }
                                }
                                dL += ")( |$)";
                                return new RegExp(dL)
                            }
                            function a4(dL) {
                                return (aM && dL && 0 === String(dL).indexOf(aM))
                            }
                            function cP(dP, dL, dQ, dM) {
                                if (a4(dL)) {
                                    return 0
                                }
                                var dO = bb(bY, "download")
                                  , dN = bb(bj, "link")
                                  , dR = new RegExp("\\.(" + dy.join("|") + ")([?&#]|$)","i");
                                if (dN.test(dP)) {
                                    return "link"
                                }
                                if (dM || dO.test(dP) || dR.test(dL)) {
                                    return "download"
                                }
                                if (dQ) {
                                    return 0
                                }
                                return "link"
                            }
                            function aC(dM) {
                                var dL;
                                dL = dM.parentNode;
                                while (dL !== null && N(dL)) {
                                    if (aj.isLinkElement(dM)) {
                                        break
                                    }
                                    dM = dL;
                                    dL = dM.parentNode
                                }
                                return dM
                            }
                            function dE(dQ) {
                                dQ = aC(dQ);
                                if (!aj.hasNodeAttribute(dQ, "href")) {
                                    return
                                }
                                if (!N(dQ.href)) {
                                    return
                                }
                                var dP = aj.getAttributeValueFromNode(dQ, "href");
                                var dM = dQ.pathname || cB(dQ.href);
                                var dR = dQ.hostname || d(dQ.href);
                                var dS = dR.toLowerCase();
                                var dN = dQ.href.replace(dR, dS);
                                var dO = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto|tel):","i");
                                if (!dO.test(dN)) {
                                    var dL = cP(dQ.className, dN, aA(dS, dM), aj.hasNodeAttribute(dQ, "download"));
                                    if (dL) {
                                        return {
                                            type: dL,
                                            href: dN
                                        }
                                    }
                                }
                            }
                            function aY(dL, dM, dN, dO) {
                                var dP = x.buildInteractionRequestParams(dL, dM, dN, dO);
                                if (!dP) {
                                    return
                                }
                                return cL(dP, null, "contentInteraction")
                            }
                            function bm(dL, dM) {
                                if (!dL || !dM) {
                                    return false
                                }
                                var dN = x.findTargetNode(dL);
                                if (x.shouldIgnoreInteraction(dN)) {
                                    return false
                                }
                                dN = x.findTargetNodeNoDefault(dL);
                                if (dN && !Z(dN, dM)) {
                                    return false
                                }
                                return true
                            }
                            function cO(dN, dM, dP) {
                                if (!dN) {
                                    return
                                }
                                var dL = x.findParentContentNode(dN);
                                if (!dL) {
                                    return
                                }
                                if (!bm(dL, dN)) {
                                    return
                                }
                                var dO = x.buildContentBlock(dL);
                                if (!dO) {
                                    return
                                }
                                if (!dO.target && dP) {
                                    dO.target = dP
                                }
                                return x.buildInteractionRequestParams(dM, dO.name, dO.piece, dO.target)
                            }
                            function a7(dM) {
                                if (!cp || !cp.length) {
                                    return false
                                }
                                var dL, dN;
                                for (dL = 0; dL < cp.length; dL++) {
                                    dN = cp[dL];
                                    if (dN && dN.name === dM.name && dN.piece === dM.piece && dN.target === dM.target) {
                                        return true
                                    }
                                }
                                return false
                            }
                            function a8(dL) {
                                return function(dP) {
                                    if (!dL) {
                                        return
                                    }
                                    var dN = x.findParentContentNode(dL);
                                    var dM;
                                    if (dP) {
                                        dM = dP.target || dP.srcElement
                                    }
                                    if (!dM) {
                                        dM = dL
                                    }
                                    if (!bm(dN, dM)) {
                                        return
                                    }
                                    if (!dN) {
                                        return false
                                    }
                                    var dQ = x.findTargetNode(dN);
                                    if (!dQ || x.shouldIgnoreInteraction(dQ)) {
                                        return false
                                    }
                                    var dO = dE(dQ);
                                    if (dA && dO && dO.type) {
                                        return dO.type
                                    }
                                    return bV.trackContentInteractionNode(dM, "click")
                                }
                            }
                            function ce(dN) {
                                if (!dN || !dN.length) {
                                    return
                                }
                                var dL, dM;
                                for (dL = 0; dL < dN.length; dL++) {
                                    dM = x.findTargetNode(dN[dL]);
                                    if (dM && !dM.contentInteractionTrackingSetupDone) {
                                        dM.contentInteractionTrackingSetupDone = true;
                                        at(dM, "click", a8(dM))
                                    }
                                }
                            }
                            function bK(dN, dO) {
                                if (!dN || !dN.length) {
                                    return []
                                }
                                var dL, dM;
                                for (dL = 0; dL < dN.length; dL++) {
                                    if (a7(dN[dL])) {
                                        dN.splice(dL, 1);
                                        dL--
                                    } else {
                                        cp.push(dN[dL])
                                    }
                                }
                                if (!dN || !dN.length) {
                                    return []
                                }
                                ce(dO);
                                var dP = [];
                                for (dL = 0; dL < dN.length; dL++) {
                                    dM = cL(x.buildImpressionRequestParams(dN[dL].name, dN[dL].piece, dN[dL].target), undefined, "contentImpressions");
                                    if (dM) {
                                        dP.push(dM)
                                    }
                                }
                                return dP
                            }
                            function cX(dM) {
                                var dL = x.collectContent(dM);
                                return bK(dL, dM)
                            }
                            function bk(dM) {
                                if (!dM || !dM.length) {
                                    return []
                                }
                                var dL;
                                for (dL = 0; dL < dM.length; dL++) {
                                    if (!x.isNodeVisible(dM[dL])) {
                                        dM.splice(dL, 1);
                                        dL--
                                    }
                                }
                                if (!dM || !dM.length) {
                                    return []
                                }
                                return cX(dM)
                            }
                            function aO(dN, dL, dM) {
                                var dO = x.buildImpressionRequestParams(dN, dL, dM);
                                return cL(dO, null, "contentImpression")
                            }
                            function dD(dO, dM) {
                                if (!dO) {
                                    return
                                }
                                var dL = x.findParentContentNode(dO);
                                var dN = x.buildContentBlock(dL);
                                if (!dN) {
                                    return
                                }
                                if (!dM) {
                                    dM = "Unknown"
                                }
                                return aY(dM, dN.name, dN.piece, dN.target)
                            }
                            function dd(dM, dO, dL, dN) {
                                return "e_c=" + u(dM) + "&e_a=" + u(dO) + (N(dL) ? "&e_n=" + u(dL) : "") + (N(dN) ? "&e_v=" + u(dN) : "") + "&ca=1"
                            }
                            function aB(dN, dP, dL, dO, dR, dQ) {
                                if (!ad(dN) || !ad(dP)) {
                                    ap("Error while logging event: Parameters `category` and `action` must not be empty or filled with whitespaces");
                                    return false
                                }
                                var dM = cL(dd(dN, dP, dL, dO), dR, "event");
                                bS(dM, bW, dQ)
                            }
                            function cm(dL, dO, dM, dP) {
                                var dN = cL("search=" + u(dL) + (dO ? "&search_cat=" + u(dO) : "") + (N(dM) ? "&search_count=" + dM : ""), dP, "sitesearch");
                                bS(dN, bW)
                            }
                            function dh(dL, dP, dO, dN) {
                                var dM = cL("idgoal=" + dL + (dP ? "&revenue=" + dP : ""), dO, "goal");
                                bS(dM, bW, dN)
                            }
                            function dt(dO, dL, dS, dR, dN) {
                                var dQ = dL + "=" + u(cf(dO));
                                var dM = cO(dN, "click", dO);
                                if (dM) {
                                    dQ += "&" + dM
                                }
                                var dP = cL(dQ, dS, "link");
                                bS(dP, bW, dR)
                            }
                            function b7(dM, dL) {
                                if (dM !== "") {
                                    return dM + dL.charAt(0).toUpperCase() + dL.slice(1)
                                }
                                return dL
                            }
                            function cw(dQ) {
                                var dP, dL, dO = ["", "webkit", "ms", "moz"], dN;
                                if (!bp) {
                                    for (dL = 0; dL < dO.length; dL++) {
                                        dN = dO[dL];
                                        if (Object.prototype.hasOwnProperty.call(K, b7(dN, "hidden"))) {
                                            if (K[b7(dN, "visibilityState")] === "prerender") {
                                                dP = true
                                            }
                                            break
                                        }
                                    }
                                }
                                if (dP) {
                                    at(K, dN + "visibilitychange", function dM() {
                                        K.removeEventListener(dN + "visibilitychange", dM, false);
                                        dQ()
                                    });
                                    return
                                }
                                dQ()
                            }
                            function bE() {
                                var dM = bV.getVisitorId();
                                var dL = aS();
                                return dM + dL
                            }
                            function cz(dL) {
                                if (!dL) {
                                    return
                                }
                                if (!aj.hasNodeAttribute(dL, "href")) {
                                    return
                                }
                                var dM = aj.getAttributeValueFromNode(dL, "href");
                                if (!dM || a4(dM)) {
                                    return
                                }
                                if (!bV.getVisitorId()) {
                                    return
                                }
                                dM = j(dM, aD);
                                var dN = bE();
                                dM = J(dM, aD, dN);
                                aj.setAnyAttribute(dL, "href", dM)
                            }
                            function bw(dO) {
                                var dP = aj.getAttributeValueFromNode(dO, "href");
                                if (!dP) {
                                    return false
                                }
                                dP = String(dP);
                                var dM = dP.indexOf("//") === 0 || dP.indexOf("http://") === 0 || dP.indexOf("https://") === 0;
                                if (!dM) {
                                    return false
                                }
                                var dL = dO.pathname || cB(dO.href);
                                var dN = (dO.hostname || d(dO.href)).toLowerCase();
                                if (aA(dN, dL)) {
                                    if (!c5(di, P(dN))) {
                                        return true
                                    }
                                    return false
                                }
                                return false
                            }
                            function c4(dL) {
                                var dM = dE(dL);
                                if (dM && dM.type) {
                                    dM.href = p(dM.href);
                                    dt(dM.href, dM.type, undefined, null, dL);
                                    return
                                }
                                if (db) {
                                    dL = aC(dL);
                                    if (bw(dL)) {
                                        cz(dL)
                                    }
                                }
                            }
                            function cQ() {
                                return K.all && !K.addEventListener
                            }
                            function dj(dL) {
                                var dN = dL.which;
                                var dM = (typeof dL.button);
                                if (!dN && dM !== "undefined") {
                                    if (cQ()) {
                                        if (dL.button & 1) {
                                            dN = 1
                                        } else {
                                            if (dL.button & 2) {
                                                dN = 3
                                            } else {
                                                if (dL.button & 4) {
                                                    dN = 2
                                                }
                                            }
                                        }
                                    } else {
                                        if (dL.button === 0 || dL.button === "0") {
                                            dN = 1
                                        } else {
                                            if (dL.button & 1) {
                                                dN = 2
                                            } else {
                                                if (dL.button & 2) {
                                                    dN = 3
                                                }
                                            }
                                        }
                                    }
                                }
                                return dN
                            }
                            function b6(dL) {
                                switch (dj(dL)) {
                                case 1:
                                    return "left";
                                case 2:
                                    return "middle";
                                case 3:
                                    return "right"
                                }
                            }
                            function bc(dL) {
                                return dL.target || dL.srcElement
                            }
                            function dk(dL) {
                                return dL === "A" || dL === "AREA"
                            }
                            function aK(dL) {
                                function dM(dO) {
                                    var dP = bc(dO);
                                    var dQ = dP.nodeName;
                                    var dN = bb(bM, "ignore");
                                    while (!dk(dQ) && dP && dP.parentNode) {
                                        dP = dP.parentNode;
                                        dQ = dP.nodeName
                                    }
                                    if (dP && dk(dQ) && !dN.test(dP.className)) {
                                        return dP
                                    }
                                }
                                return function(dP) {
                                    dP = dP || X.event;
                                    var dQ = dM(dP);
                                    if (!dQ) {
                                        return
                                    }
                                    var dO = b6(dP);
                                    if (dP.type === "click") {
                                        var dN = false;
                                        if (dL && dO === "middle") {
                                            dN = true
                                        }
                                        if (dQ && !dN) {
                                            c4(dQ)
                                        }
                                    } else {
                                        if (dP.type === "mousedown") {
                                            if (dO === "middle" && dQ) {
                                                a0 = dO;
                                                bO = dQ
                                            } else {
                                                a0 = bO = null
                                            }
                                        } else {
                                            if (dP.type === "mouseup") {
                                                if (dO === a0 && dQ === bO) {
                                                    c4(dQ)
                                                }
                                                a0 = bO = null
                                            } else {
                                                if (dP.type === "contextmenu") {
                                                    c4(dQ)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            function az(dO, dN, dL) {
                                var dM = typeof dN;
                                if (dM === "undefined") {
                                    dN = true
                                }
                                at(dO, "click", aK(dN), dL);
                                if (dN) {
                                    at(dO, "mouseup", aK(dN), dL);
                                    at(dO, "mousedown", aK(dN), dL);
                                    at(dO, "contextmenu", aK(dN), dL)
                                }
                            }
                            function a1(dM, dP, dQ) {
                                if (cu) {
                                    return true
                                }
                                cu = true;
                                var dR = false;
                                var dO, dN;
                                function dL() {
                                    dR = true
                                }
                                n(function() {
                                    function dS(dU) {
                                        setTimeout(function() {
                                            if (!cu) {
                                                return
                                            }
                                            dR = false;
                                            dQ.trackVisibleContentImpressions();
                                            dS(dU)
                                        }, dU)
                                    }
                                    function dT(dU) {
                                        setTimeout(function() {
                                            if (!cu) {
                                                return
                                            }
                                            if (dR) {
                                                dR = false;
                                                dQ.trackVisibleContentImpressions()
                                            }
                                            dT(dU)
                                        }, dU)
                                    }
                                    if (dM) {
                                        dO = ["scroll", "resize"];
                                        for (dN = 0; dN < dO.length; dN++) {
                                            if (K.addEventListener) {
                                                K.addEventListener(dO[dN], dL, false)
                                            } else {
                                                X.attachEvent("on" + dO[dN], dL)
                                            }
                                        }
                                        dT(100)
                                    }
                                    if (dP && dP > 0) {
                                        dP = parseInt(dP, 10);
                                        dS(dP)
                                    }
                                })
                            }
                            var bQ = {
                                enabled: true,
                                requests: [],
                                timeout: null,
                                interval: 2500,
                                sendRequests: function() {
                                    var dL = this.requests;
                                    this.requests = [];
                                    if (dL.length === 1) {
                                        bS(dL[0], bW)
                                    } else {
                                        dH(dL, bW)
                                    }
                                },
                                canQueue: function() {
                                    return !m && this.enabled
                                },
                                pushMultiple: function(dM) {
                                    if (!this.canQueue()) {
                                        dH(dM, bW);
                                        return
                                    }
                                    var dL;
                                    for (dL = 0; dL < dM.length; dL++) {
                                        this.push(dM[dL])
                                    }
                                },
                                push: function(dL) {
                                    if (!dL) {
                                        return
                                    }
                                    if (!this.canQueue()) {
                                        bS(dL, bW);
                                        return
                                    }
                                    bQ.requests.push(dL);
                                    if (this.timeout) {
                                        clearTimeout(this.timeout);
                                        this.timeout = null
                                    }
                                    this.timeout = setTimeout(function() {
                                        bQ.timeout = null;
                                        bQ.sendRequests()
                                    }, bQ.interval);
                                    var dM = "RequestQueue" + aF;
                                    if (!Object.prototype.hasOwnProperty.call(b, dM)) {
                                        b[dM] = {
                                            unload: function() {
                                                if (bQ.timeout) {
                                                    clearTimeout(bQ.timeout)
                                                }
                                                bQ.sendRequests()
                                            }
                                        }
                                    }
                                }
                            };
                            bt();
                            this.hasConsent = function() {
                                return bP
                            }
                            ;
                            this.getVisitorInfo = function() {
                                if (!aL(a2("id"))) {
                                    aV()
                                }
                                return dc()
                            }
                            ;
                            this.getVisitorId = function() {
                                return this.getVisitorInfo()[1]
                            }
                            ;
                            this.getAttributionInfo = function() {
                                return bX()
                            }
                            ;
                            this.getAttributionCampaignName = function() {
                                return bX()[0]
                            }
                            ;
                            this.getAttributionCampaignKeyword = function() {
                                return bX()[1]
                            }
                            ;
                            this.getAttributionReferrerTimestamp = function() {
                                return bX()[2]
                            }
                            ;
                            this.getAttributionReferrerUrl = function() {
                                return bX()[3]
                            }
                            ;
                            this.setTrackerUrl = function(dL) {
                                aM = dL
                            }
                            ;
                            this.getTrackerUrl = function() {
                                return aM
                            }
                            ;
                            this.getMatomoUrl = function() {
                                return ab(this.getTrackerUrl(), bU)
                            }
                            ;
                            this.getPiwikUrl = function() {
                                return this.getMatomoUrl()
                            }
                            ;
                            this.addTracker = function(dN, dM) {
                                if (!N(dN) || null === dN) {
                                    dN = this.getTrackerUrl()
                                }
                                var dL = new U(dN,dM);
                                M.push(dL);
                                v.trigger("TrackerAdded", [this]);
                                return dL
                            }
                            ;
                            this.getSiteId = function() {
                                return cj
                            }
                            ;
                            this.setSiteId = function(dL) {
                                cg(dL)
                            }
                            ;
                            this.resetUserId = function() {
                                bL = ""
                            }
                            ;
                            this.setUserId = function(dL) {
                                if (ad(dL)) {
                                    bL = dL
                                }
                            }
                            ;
                            this.setVisitorId = function(dM) {
                                var dL = /[0-9A-Fa-f]{16}/g;
                                if (y(dM) && dL.test(dM)) {
                                    b0 = dM
                                } else {
                                    ap("Invalid visitorId set" + dM)
                                }
                            }
                            ;
                            this.getUserId = function() {
                                return bL
                            }
                            ;
                            this.setCustomData = function(dL, dM) {
                                if (aa(dL)) {
                                    aw = dL
                                } else {
                                    if (!aw) {
                                        aw = {}
                                    }
                                    aw[dL] = dM
                                }
                            }
                            ;
                            this.getCustomData = function() {
                                return aw
                            }
                            ;
                            this.setCustomRequestProcessing = function(dL) {
                                cq = dL
                            }
                            ;
                            this.appendToTrackingUrl = function(dL) {
                                dr = dL
                            }
                            ;
                            this.getRequest = function(dL) {
                                return cL(dL)
                            }
                            ;
                            this.addPlugin = function(dL, dM) {
                                b[dL] = dM
                            }
                            ;
                            this.setCustomDimension = function(dL, dM) {
                                dL = parseInt(dL, 10);
                                if (dL > 0) {
                                    if (!N(dM)) {
                                        dM = ""
                                    }
                                    if (!y(dM)) {
                                        dM = String(dM)
                                    }
                                    bz[dL] = dM
                                }
                            }
                            ;
                            this.getCustomDimension = function(dL) {
                                dL = parseInt(dL, 10);
                                if (dL > 0 && Object.prototype.hasOwnProperty.call(bz, dL)) {
                                    return bz[dL]
                                }
                            }
                            ;
                            this.deleteCustomDimension = function(dL) {
                                dL = parseInt(dL, 10);
                                if (dL > 0) {
                                    delete bz[dL]
                                }
                            }
                            ;
                            this.setCustomVariable = function(dM, dL, dP, dN) {
                                var dO;
                                if (!N(dN)) {
                                    dN = "visit"
                                }
                                if (!N(dL)) {
                                    return
                                }
                                if (!N(dP)) {
                                    dP = ""
                                }
                                if (dM > 0) {
                                    dL = !y(dL) ? String(dL) : dL;
                                    dP = !y(dP) ? String(dP) : dP;
                                    dO = [dL.slice(0, bG), dP.slice(0, bG)];
                                    if (dN === "visit" || dN === 2) {
                                        c3();
                                        aZ[dM] = dO
                                    } else {
                                        if (dN === "page" || dN === 3) {
                                            b9[dM] = dO
                                        } else {
                                            if (dN === "event") {
                                                cC[dM] = dO
                                            }
                                        }
                                    }
                                }
                            }
                            ;
                            this.getCustomVariable = function(dM, dN) {
                                var dL;
                                if (!N(dN)) {
                                    dN = "visit"
                                }
                                if (dN === "page" || dN === 3) {
                                    dL = b9[dM]
                                } else {
                                    if (dN === "event") {
                                        dL = cC[dM]
                                    } else {
                                        if (dN === "visit" || dN === 2) {
                                            c3();
                                            dL = aZ[dM]
                                        }
                                    }
                                }
                                if (!N(dL) || (dL && dL[0] === "")) {
                                    return false
                                }
                                return dL
                            }
                            ;
                            this.deleteCustomVariable = function(dL, dM) {
                                if (this.getCustomVariable(dL, dM)) {
                                    this.setCustomVariable(dL, "", "", dM)
                                }
                            }
                            ;
                            this.deleteCustomVariables = function(dL) {
                                if (dL === "page" || dL === 3) {
                                    b9 = {}
                                } else {
                                    if (dL === "event") {
                                        cC = {}
                                    } else {
                                        if (dL === "visit" || dL === 2) {
                                            aZ = {}
                                        }
                                    }
                                }
                            }
                            ;
                            this.storeCustomVariablesInCookie = function() {
                                b3 = true
                            }
                            ;
                            this.setLinkTrackingTimer = function(dL) {
                                bW = dL
                            }
                            ;
                            this.getLinkTrackingTimer = function() {
                                return bW
                            }
                            ;
                            this.setDownloadExtensions = function(dL) {
                                if (y(dL)) {
                                    dL = dL.split("|")
                                }
                                dy = dL
                            }
                            ;
                            this.addDownloadExtensions = function(dM) {
                                var dL;
                                if (y(dM)) {
                                    dM = dM.split("|")
                                }
                                for (dL = 0; dL < dM.length; dL++) {
                                    dy.push(dM[dL])
                                }
                            }
                            ;
                            this.removeDownloadExtensions = function(dN) {
                                var dM, dL = [];
                                if (y(dN)) {
                                    dN = dN.split("|")
                                }
                                for (dM = 0; dM < dy.length; dM++) {
                                    if (Q(dN, dy[dM]) === -1) {
                                        dL.push(dy[dM])
                                    }
                                }
                                dy = dL
                            }
                            ;
                            this.setDomains = function(dL) {
                                aG = y(dL) ? [dL] : dL;
                                var dP = false, dN = 0, dM;
                                for (dN; dN < aG.length; dN++) {
                                    dM = String(aG[dN]);
                                    if (c5(di, P(dM))) {
                                        dP = true;
                                        break
                                    }
                                    var dO = cB(dM);
                                    if (dO && dO !== "/" && dO !== "/*") {
                                        dP = true;
                                        break
                                    }
                                }
                                if (!dP) {
                                    aG.push(di)
                                }
                            }
                            ;
                            this.setExcludedReferrers = function(dL) {
                                cS = y(dL) ? [dL] : dL
                            }
                            ;
                            this.enableCrossDomainLinking = function() {
                                db = true
                            }
                            ;
                            this.disableCrossDomainLinking = function() {
                                db = false
                            }
                            ;
                            this.isCrossDomainLinkingEnabled = function() {
                                return db
                            }
                            ;
                            this.setCrossDomainLinkingTimeout = function(dL) {
                                ba = dL
                            }
                            ;
                            this.getCrossDomainLinkingUrlParameter = function() {
                                return u(aD) + "=" + u(bE())
                            }
                            ;
                            this.setIgnoreClasses = function(dL) {
                                bM = y(dL) ? [dL] : dL
                            }
                            ;
                            this.setRequestMethod = function(dL) {
                                if (dL) {
                                    dC = String(dL).toUpperCase()
                                } else {
                                    dC = cx
                                }
                                if (dC === "GET") {
                                    this.disableAlwaysUseSendBeacon()
                                }
                            }
                            ;
                            this.setRequestContentType = function(dL) {
                                cR = dL || aQ
                            }
                            ;
                            this.setGenerationTimeMs = function(dL) {
                                ap("setGenerationTimeMs is no longer supported since Matomo 4. The call will be ignored. The replacement is setPagePerformanceTiming.")
                            }
                            ;
                            this.setPagePerformanceTiming = function(dP, dR, dQ, dM, dS, dN) {
                                var dO = {
                                    pf_net: dP,
                                    pf_srv: dR,
                                    pf_tfr: dQ,
                                    pf_dm1: dM,
                                    pf_dm2: dS,
                                    pf_onl: dN
                                };
                                try {
                                    dO = R(dO, N);
                                    dO = C(dO);
                                    cD = l(dO);
                                    if (cD === "") {
                                        ap("setPagePerformanceTiming() called without parameters. This function needs to be called with at least one performance parameter.");
                                        return
                                    }
                                    bs = false;
                                    bR = true
                                } catch (dL) {
                                    ap("setPagePerformanceTiming: " + dL.toString())
                                }
                            }
                            ;
                            this.setReferrerUrl = function(dL) {
                                bA = dL
                            }
                            ;
                            this.setCustomUrl = function(dL) {
                                bf = b8(bZ, dL)
                            }
                            ;
                            this.getCurrentUrl = function() {
                                return bf || bZ
                            }
                            ;
                            this.setDocumentTitle = function(dL) {
                                bu = dL
                            }
                            ;
                            this.setPageViewId = function(dL) {
                                aU = dL;
                                bN = true
                            }
                            ;
                            this.getPageViewId = function() {
                                return aU
                            }
                            ;
                            this.setAPIUrl = function(dL) {
                                bU = dL
                            }
                            ;
                            this.setDownloadClasses = function(dL) {
                                bY = y(dL) ? [dL] : dL
                            }
                            ;
                            this.setLinkClasses = function(dL) {
                                bj = y(dL) ? [dL] : dL
                            }
                            ;
                            this.setCampaignNameKey = function(dL) {
                                cH = y(dL) ? [dL] : dL
                            }
                            ;
                            this.setCampaignKeywordKey = function(dL) {
                                bT = y(dL) ? [dL] : dL
                            }
                            ;
                            this.discardHashTag = function(dL) {
                                b1 = dL
                            }
                            ;
                            this.setCookieNamePrefix = function(dL) {
                                bv = dL;
                                if (aZ) {
                                    aZ = ca()
                                }
                            }
                            ;
                            this.setCookieDomain = function(dL) {
                                var dM = P(dL);
                                if (!bx && !bJ(dM)) {
                                    ap("Can't write cookie on domain " + dL)
                                } else {
                                    dp = dM;
                                    bt()
                                }
                            }
                            ;
                            this.setExcludedQueryParams = function(dL) {
                                cy = y(dL) ? [dL] : dL
                            }
                            ;
                            this.getCookieDomain = function() {
                                return dp
                            }
                            ;
                            this.hasCookies = function() {
                                return "1" === ci()
                            }
                            ;
                            this.setSessionCookie = function(dN, dM, dL) {
                                if (!dN) {
                                    throw new Error("Missing cookie name")
                                }
                                if (!N(dL)) {
                                    dL = cE
                                }
                                bH.push(dN);
                                dG(a2(dN), dM, dL, bC, dp, b5, aR)
                            }
                            ;
                            this.getCookie = function(dM) {
                                var dL = aL(a2(dM));
                                if (dL === 0) {
                                    return null
                                }
                                return dL
                            }
                            ;
                            this.setCookiePath = function(dL) {
                                bC = dL;
                                bt()
                            }
                            ;
                            this.getCookiePath = function() {
                                return bC
                            }
                            ;
                            this.setVisitorCookieTimeout = function(dL) {
                                c8 = dL * 1000
                            }
                            ;
                            this.setSessionCookieTimeout = function(dL) {
                                cE = dL * 1000
                            }
                            ;
                            this.getSessionCookieTimeout = function() {
                                return cE
                            }
                            ;
                            this.setReferralCookieTimeout = function(dL) {
                                dx = dL * 1000
                            }
                            ;
                            this.setConversionAttributionFirstReferrer = function(dL) {
                                bI = dL
                            }
                            ;
                            this.setSecureCookie = function(dL) {
                                if (dL && location.protocol !== "https:") {
                                    ap("Error in setSecureCookie: You cannot use `Secure` on http.");
                                    return
                                }
                                b5 = dL
                            }
                            ;
                            this.setCookieSameSite = function(dL) {
                                dL = String(dL);
                                dL = dL.charAt(0).toUpperCase() + dL.toLowerCase().slice(1);
                                if (dL !== "None" && dL !== "Lax" && dL !== "Strict") {
                                    ap("Ignored value for sameSite. Please use either Lax, None, or Strict.");
                                    return
                                }
                                if (dL === "None") {
                                    if (location.protocol === "https:") {
                                        this.setSecureCookie(true)
                                    } else {
                                        ap("sameSite=None cannot be used on http, reverted to sameSite=Lax.");
                                        dL = "Lax"
                                    }
                                }
                                aR = dL
                            }
                            ;
                            this.disableCookies = function() {
                                bx = true;
                                if (cj) {
                                    aN()
                                }
                            }
                            ;
                            this.areCookiesEnabled = function() {
                                return !bx
                            }
                            ;
                            this.setCookieConsentGiven = function() {
                                if (bx && !de) {
                                    bx = false;
                                    if (!dn) {
                                        this.enableBrowserFeatureDetection()
                                    }
                                    if (cj && aE) {
                                        aV();
                                        var dL = cL("ping=1", null, "ping");
                                        bS(dL, bW)
                                    }
                                }
                            }
                            ;
                            this.requireCookieConsent = function() {
                                if (this.getRememberedCookieConsent()) {
                                    return false
                                }
                                this.disableCookies();
                                return true
                            }
                            ;
                            this.getRememberedCookieConsent = function() {
                                return aL(c1)
                            }
                            ;
                            this.forgetCookieConsentGiven = function() {
                                cc(c1, bC, dp);
                                this.disableCookies()
                            }
                            ;
                            this.rememberCookieConsentGiven = function(dM) {
                                if (dM) {
                                    dM = dM * 60 * 60 * 1000
                                } else {
                                    dM = 30 * 365 * 24 * 60 * 60 * 1000
                                }
                                this.setCookieConsentGiven();
                                var dL = new Date().getTime();
                                dG(c1, dL, dM, bC, dp, b5, aR)
                            }
                            ;
                            this.deleteCookies = function() {
                                aN()
                            }
                            ;
                            this.setDoNotTrack = function(dM) {
                                var dL = g.doNotTrack || g.msDoNotTrack;
                                de = dM && (dL === "yes" || dL === "1");
                                if (de) {
                                    this.disableCookies()
                                }
                            }
                            ;
                            this.disableCampaignParameters = function() {
                                dm = false
                            }
                            ;
                            this.alwaysUseSendBeacon = function() {
                                dl = true
                            }
                            ;
                            this.disableAlwaysUseSendBeacon = function() {
                                dl = false
                            }
                            ;
                            this.addListener = function(dM, dL) {
                                az(dM, dL, false)
                            }
                            ;
                            this.enableLinkTracking = function(dM) {
                                if (dA) {
                                    return
                                }
                                dA = true;
                                var dL = this;
                                r(function() {
                                    ax = true;
                                    var dN = K.body;
                                    az(dN, dM, true)
                                })
                            }
                            ;
                            this.enableJSErrorTracking = function() {
                                if (dg) {
                                    return
                                }
                                dg = true;
                                var dL = X.onerror;
                                X.onerror = function(dQ, dO, dN, dP, dM) {
                                    cw(function() {
                                        var dR = "JavaScript Errors";
                                        var dS = dO + ":" + dN;
                                        if (dP) {
                                            dS += ":" + dP
                                        }
                                        if (Q(cM, dR + dS + dQ) === -1) {
                                            cM.push(dR + dS + dQ);
                                            aB(dR, dS, dQ)
                                        }
                                    });
                                    if (dL) {
                                        return dL(dQ, dO, dN, dP, dM)
                                    }
                                    return false
                                }
                            }
                            ;
                            this.disablePerformanceTracking = function() {
                                bd = false
                            }
                            ;
                            this.enableHeartBeatTimer = function(dL) {
                                dL = Math.max(dL || 15, 5);
                                bg = dL * 1000;
                                if (dq !== null) {
                                    dJ()
                                }
                            }
                            ;
                            this.disableHeartBeatTimer = function() {
                                if (bg || aW) {
                                    if (X.removeEventListener) {
                                        X.removeEventListener("focus", bl);
                                        X.removeEventListener("blur", aH);
                                        X.removeEventListener("visibilitychange", a5)
                                    } else {
                                        if (X.detachEvent) {
                                            X.detachEvent("onfocus", bl);
                                            X.detachEvent("onblur", aH);
                                            X.detachEvent("visibilitychange", a5)
                                        }
                                    }
                                }
                                bg = null;
                                aW = false
                            }
                            ;
                            this.killFrame = function() {
                                if (X.location !== X.top.location) {
                                    X.top.location = X.location
                                }
                            }
                            ;
                            this.redirectFile = function(dL) {
                                if (X.location.protocol === "file:") {
                                    X.location = dL
                                }
                            }
                            ;
                            this.setCountPreRendered = function(dL) {
                                bp = dL
                            }
                            ;
                            this.trackGoal = function(dL, dO, dN, dM) {
                                cw(function() {
                                    dh(dL, dO, dN, dM)
                                })
                            }
                            ;
                            this.trackLink = function(dM, dL, dO, dN) {
                                cw(function() {
                                    dt(dM, dL, dO, dN)
                                })
                            }
                            ;
                            this.getNumTrackedPageViews = function() {
                                return cK
                            }
                            ;
                            this.trackPageView = function(dL, dN, dM) {
                                cp = [];
                                c9 = [];
                                cM = [];
                                if (S(cj)) {
                                    cw(function() {
                                        ae(aM, bU, cj)
                                    })
                                } else {
                                    cw(function() {
                                        cK++;
                                        cd(dL, dN, dM)
                                    })
                                }
                            }
                            ;
                            this.disableBrowserFeatureDetection = function() {
                                dn = false;
                                dz = {};
                                if (av()) {
                                    ay()
                                }
                            }
                            ;
                            this.enableBrowserFeatureDetection = function() {
                                dn = true;
                                c6()
                            }
                            ;
                            this.trackAllContentImpressions = function() {
                                if (S(cj)) {
                                    return
                                }
                                cw(function() {
                                    r(function() {
                                        var dL = x.findContentNodes();
                                        var dM = cX(dL);
                                        bQ.pushMultiple(dM)
                                    })
                                })
                            }
                            ;
                            this.trackVisibleContentImpressions = function(dL, dM) {
                                if (S(cj)) {
                                    return
                                }
                                if (!N(dL)) {
                                    dL = true
                                }
                                if (!N(dM)) {
                                    dM = 750
                                }
                                a1(dL, dM, this);
                                cw(function() {
                                    n(function() {
                                        var dN = x.findContentNodes();
                                        var dO = bk(dN);
                                        bQ.pushMultiple(dO)
                                    })
                                })
                            }
                            ;
                            this.trackContentImpression = function(dN, dL, dM) {
                                if (S(cj)) {
                                    return
                                }
                                dN = a(dN);
                                dL = a(dL);
                                dM = a(dM);
                                if (!dN) {
                                    return
                                }
                                dL = dL || "Unknown";
                                cw(function() {
                                    var dO = aO(dN, dL, dM);
                                    bQ.push(dO)
                                })
                            }
                            ;
                            this.trackContentImpressionsWithinNode = function(dL) {
                                if (S(cj) || !dL) {
                                    return
                                }
                                cw(function() {
                                    if (cu) {
                                        n(function() {
                                            var dM = x.findContentNodesWithinNode(dL);
                                            var dN = bk(dM);
                                            bQ.pushMultiple(dN)
                                        })
                                    } else {
                                        r(function() {
                                            var dM = x.findContentNodesWithinNode(dL);
                                            var dN = cX(dM);
                                            bQ.pushMultiple(dN)
                                        })
                                    }
                                })
                            }
                            ;
                            this.trackContentInteraction = function(dN, dO, dL, dM) {
                                if (S(cj)) {
                                    return
                                }
                                dN = a(dN);
                                dO = a(dO);
                                dL = a(dL);
                                dM = a(dM);
                                if (!dN || !dO) {
                                    return
                                }
                                dL = dL || "Unknown";
                                cw(function() {
                                    var dP = aY(dN, dO, dL, dM);
                                    if (dP) {
                                        bQ.push(dP)
                                    }
                                })
                            }
                            ;
                            this.trackContentInteractionNode = function(dN, dM) {
                                if (S(cj) || !dN) {
                                    return
                                }
                                var dL = null;
                                cw(function() {
                                    dL = dD(dN, dM);
                                    if (dL) {
                                        bQ.push(dL)
                                    }
                                });
                                return dL
                            }
                            ;
                            this.logAllContentBlocksOnPage = function() {
                                var dN = x.findContentNodes();
                                var dL = x.collectContent(dN);
                                var dM = typeof console;
                                if (dM !== "undefined" && console && console.log) {
                                    console.log(dL)
                                }
                            }
                            ;
                            this.trackEvent = function(dM, dO, dL, dN, dQ, dP) {
                                cw(function() {
                                    aB(dM, dO, dL, dN, dQ, dP)
                                })
                            }
                            ;
                            this.trackSiteSearch = function(dL, dN, dM, dO) {
                                cp = [];
                                cw(function() {
                                    cm(dL, dN, dM, dO)
                                })
                            }
                            ;
                            this.setEcommerceView = function(dP, dL, dN, dM) {
                                cN = {};
                                if (ad(dN)) {
                                    dN = String(dN)
                                }
                                if (!N(dN) || dN === null || dN === false || !dN.length) {
                                    dN = ""
                                } else {
                                    if (dN instanceof Array) {
                                        dN = X.JSON.stringify(dN)
                                    }
                                }
                                var dO = "_pkc";
                                cN[dO] = dN;
                                if (N(dM) && dM !== null && dM !== false && String(dM).length) {
                                    dO = "_pkp";
                                    cN[dO] = dM
                                }
                                if (!ad(dP) && !ad(dL)) {
                                    return
                                }
                                if (ad(dP)) {
                                    dO = "_pks";
                                    cN[dO] = dP
                                }
                                if (!ad(dL)) {
                                    dL = ""
                                }
                                dO = "_pkn";
                                cN[dO] = dL
                            }
                            ;
                            this.getEcommerceItems = function() {
                                return JSON.parse(JSON.stringify(ds))
                            }
                            ;
                            this.addEcommerceItem = function(dP, dL, dN, dM, dO) {
                                if (ad(dP)) {
                                    ds[dP] = [String(dP), dL, dN, dM, dO]
                                }
                            }
                            ;
                            this.removeEcommerceItem = function(dL) {
                                if (ad(dL)) {
                                    dL = String(dL);
                                    delete ds[dL]
                                }
                            }
                            ;
                            this.clearEcommerceCart = function() {
                                ds = {}
                            }
                            ;
                            this.trackEcommerceOrder = function(dL, dP, dO, dN, dM, dQ) {
                                cb(dL, dP, dO, dN, dM, dQ)
                            }
                            ;
                            this.trackEcommerceCartUpdate = function(dL) {
                                bF(dL)
                            }
                            ;
                            this.trackRequest = function(dM, dO, dN, dL) {
                                cw(function() {
                                    var dP = cL(dM, dO, dL);
                                    bS(dP, bW, dN)
                                })
                            }
                            ;
                            this.ping = function() {
                                this.trackRequest("ping=1", null, null, "ping")
                            }
                            ;
                            this.disableQueueRequest = function() {
                                bQ.enabled = false
                            }
                            ;
                            this.setRequestQueueInterval = function(dL) {
                                if (dL < 1000) {
                                    throw new Error("Request queue interval needs to be at least 1000ms")
                                }
                                bQ.interval = dL
                            }
                            ;
                            this.queueRequest = function(dM, dL) {
                                cw(function() {
                                    var dN = dL ? dM : cL(dM);
                                    bQ.push(dN)
                                })
                            }
                            ;
                            this.isConsentRequired = function() {
                                return cY
                            }
                            ;
                            this.getRememberedConsent = function() {
                                var dL = aL(bo);
                                if (aL(da)) {
                                    if (dL) {
                                        cc(bo, bC, dp)
                                    }
                                    return null
                                }
                                if (!dL || dL === 0) {
                                    return null
                                }
                                return dL
                            }
                            ;
                            this.hasRememberedConsent = function() {
                                return !!this.getRememberedConsent()
                            }
                            ;
                            this.requireConsent = function() {
                                cY = true;
                                bP = this.hasRememberedConsent();
                                if (!bP) {
                                    bx = true
                                }
                                z++;
                                b["CoreConsent" + z] = {
                                    unload: function() {
                                        if (!bP) {
                                            aN()
                                        }
                                    }
                                }
                            }
                            ;
                            this.setConsentGiven = function(dM) {
                                bP = true;
                                if (!dn) {
                                    this.enableBrowserFeatureDetection()
                                }
                                cc(da, bC, dp);
                                var dN, dL;
                                for (dN = 0; dN < c9.length; dN++) {
                                    dL = typeof c9[dN][0];
                                    if (dL === "string") {
                                        bS(c9[dN][0], bW, c9[dN][1])
                                    } else {
                                        if (dL === "object") {
                                            dH(c9[dN][0], bW)
                                        }
                                    }
                                }
                                c9 = [];
                                if (!N(dM) || dM) {
                                    this.setCookieConsentGiven()
                                }
                            }
                            ;
                            this.rememberConsentGiven = function(dN) {
                                if (dN) {
                                    dN = dN * 60 * 60 * 1000
                                } else {
                                    dN = 30 * 365 * 24 * 60 * 60 * 1000
                                }
                                var dL = true;
                                this.setConsentGiven(dL);
                                var dM = new Date().getTime();
                                dG(bo, dM, dN, bC, dp, b5, aR)
                            }
                            ;
                            this.forgetConsentGiven = function(dL) {
                                if (dL) {
                                    dL = dL * 60 * 60 * 1000
                                } else {
                                    dL = 30 * 365 * 24 * 60 * 60 * 1000
                                }
                                cc(bo, bC, dp);
                                dG(da, new Date().getTime(), dL, bC, dp, b5, aR);
                                this.forgetCookieConsentGiven();
                                this.requireConsent()
                            }
                            ;
                            this.isUserOptedOut = function() {
                                return !bP
                            }
                            ;
                            this.optUserOut = this.forgetConsentGiven;
                            this.forgetUserOptOut = function() {
                                this.setConsentGiven(false)
                            }
                            ;
                            this.enableFileTracking = function() {
                                cW = true
                            }
                            ;
                            n(function() {
                                setTimeout(function() {
                                    bR = true
                                }, 0)
                            });
                            v.trigger("TrackerSetup", [this]);
                            v.addPlugin("TrackerVisitorIdCookie" + aF, {
                                unload: function() {
                                    if (av() && !by) {
                                        by = true;
                                        ay()
                                    }
                                    if (!aE) {
                                        aV();
                                        dB()
                                    }
                                }
                            })
                        }
                        function L() {
                            return {
                                push: ak
                            }
                        }
                        function c(az, ay) {
                            var aA = {};
                            var aw, ax;
                            for (aw = 0; aw < ay.length; aw++) {
                                var au = ay[aw];
                                aA[au] = 1;
                                for (ax = 0; ax < az.length; ax++) {
                                    if (az[ax] && az[ax][0]) {
                                        var av = az[ax][0];
                                        if (au === av) {
                                            ak(az[ax]);
                                            delete az[ax];
                                            if (aA[av] > 1 && av !== "addTracker" && av !== "enableLinkTracking") {
                                                ap("The method " + av + ' is registered more than once in "_paq" variable. Only the last call has an effect. Please have a look at the multiple Matomo trackers documentation: https://developer.matomo.org/guides/tracking-javascript-guide#multiple-piwik-trackers')
                                            }
                                            aA[av]++
                                        }
                                    }
                                }
                            }
                            return az
                        }
                        var F = ["addTracker", "enableFileTracking", "forgetCookieConsentGiven", "requireCookieConsent", "disableBrowserFeatureDetection", "disableCampaignParameters", "disableCookies", "setTrackerUrl", "setAPIUrl", "enableCrossDomainLinking", "setCrossDomainLinkingTimeout", "setSessionCookieTimeout", "setVisitorCookieTimeout", "setCookieNamePrefix", "setCookieSameSite", "setSecureCookie", "setCookiePath", "setCookieDomain", "setDomains", "setUserId", "setVisitorId", "setSiteId", "alwaysUseSendBeacon", "disableAlwaysUseSendBeacon", "enableLinkTracking", "setCookieConsentGiven", "requireConsent", "setConsentGiven", "disablePerformanceTracking", "setPagePerformanceTiming", "setExcludedQueryParams", "setExcludedReferrers"];
                        function ai(aw, av) {
                            var au = new U(aw,av);
                            M.push(au);
                            _paq = c(_paq, F);
                            for (I = 0; I < _paq.length; I++) {
                                if (_paq[I]) {
                                    ak(_paq[I])
                                }
                            }
                            _paq = new L();
                            v.trigger("TrackerAdded", [au]);
                            return au
                        }
                        at(X, "beforeunload", an, false);
                        at(X, "visibilitychange", function() {
                            if (m) {
                                return
                            }
                            if (K.visibilityState === "hidden") {
                                ah("unload")
                            }
                        }, false);
                        at(X, "online", function() {
                            if (N(g.serviceWorker)) {
                                g.serviceWorker.ready.then(function(au) {
                                    if (au && au.sync) {
                                        return au.sync.register("matomoSync")
                                    }
                                }, function() {})
                            }
                        }, false);
                        at(X, "message", function(az) {
                            if (!az || !az.origin) {
                                return
                            }
                            var aB, ax, av;
                            var aC = d(az.origin);
                            var ay = v.getAsyncTrackers();
                            for (ax = 0; ax < ay.length; ax++) {
                                av = d(ay[ax].getMatomoUrl());
                                if (av === aC) {
                                    aB = ay[ax];
                                    break
                                }
                            }
                            if (!aB) {
                                return
                            }
                            var aw = null;
                            try {
                                aw = JSON.parse(az.data)
                            } catch (aA) {
                                return
                            }
                            if (!aw) {
                                return
                            }
                            function au(aF) {
                                var aH = K.getElementsByTagName("iframe");
                                for (ax = 0; ax < aH.length; ax++) {
                                    var aG = aH[ax];
                                    var aD = d(aG.src);
                                    if (aG.contentWindow && N(aG.contentWindow.postMessage) && aD === aC) {
                                        var aE = JSON.stringify(aF);
                                        aG.contentWindow.postMessage(aE, az.origin)
                                    }
                                }
                            }
                            if (N(aw.maq_initial_value)) {
                                au({
                                    maq_opted_in: aw.maq_initial_value && aB.hasConsent(),
                                    maq_url: aB.getMatomoUrl(),
                                    maq_optout_by_default: aB.isConsentRequired()
                                })
                            } else {
                                if (N(aw.maq_opted_in)) {
                                    ay = v.getAsyncTrackers();
                                    for (ax = 0; ax < ay.length; ax++) {
                                        aB = ay[ax];
                                        if (aw.maq_opted_in) {
                                            aB.rememberConsentGiven()
                                        } else {
                                            aB.forgetConsentGiven()
                                        }
                                    }
                                    au({
                                        maq_confirm_opted_in: aB.hasConsent(),
                                        maq_url: aB.getMatomoUrl(),
                                        maq_optout_by_default: aB.isConsentRequired()
                                    })
                                }
                            }
                        }, false);
                        Date.prototype.getTimeAlias = Date.prototype.getTime;
                        v = {
                            initialized: false,
                            JSON: X.JSON,
                            DOM: {
                                addEventListener: function(ax, aw, av, au) {
                                    var ay = typeof au;
                                    if (ay === "undefined") {
                                        au = false
                                    }
                                    at(ax, aw, av, au)
                                },
                                onLoad: n,
                                onReady: r,
                                isNodeVisible: i,
                                isOrWasNodeVisible: x.isNodeVisible
                            },
                            on: function(av, au) {
                                if (!A[av]) {
                                    A[av] = []
                                }
                                A[av].push(au)
                            },
                            off: function(aw, av) {
                                if (!A[aw]) {
                                    return
                                }
                                var au = 0;
                                for (au; au < A[aw].length; au++) {
                                    if (A[aw][au] === av) {
                                        A[aw].splice(au, 1)
                                    }
                                }
                            },
                            trigger: function(aw, ax, av) {
                                if (!A[aw]) {
                                    return
                                }
                                var au = 0;
                                for (au; au < A[aw].length; au++) {
                                    A[aw][au].apply(av || X, ax)
                                }
                            },
                            addPlugin: function(au, av) {
                                b[au] = av
                            },
                            getTracker: function(av, au) {
                                if (!N(au)) {
                                    au = this.getAsyncTracker().getSiteId()
                                }
                                if (!N(av)) {
                                    av = this.getAsyncTracker().getTrackerUrl()
                                }
                                return new U(av,au)
                            },
                            getAsyncTrackers: function() {
                                return M
                            },
                            addTracker: function(aw, av) {
                                var au;
                                if (!M.length) {
                                    au = ai(aw, av)
                                } else {
                                    au = M[0].addTracker(aw, av)
                                }
                                return au
                            },
                            getAsyncTracker: function(ay, ax) {
                                var aw;
                                if (M && M.length && M[0]) {
                                    aw = M[0]
                                } else {
                                    return ai(ay, ax)
                                }
                                if (!ax && !ay) {
                                    return aw
                                }
                                if ((!N(ax) || null === ax) && aw) {
                                    ax = aw.getSiteId()
                                }
                                if ((!N(ay) || null === ay) && aw) {
                                    ay = aw.getTrackerUrl()
                                }
                                var av, au = 0;
                                for (au; au < M.length; au++) {
                                    av = M[au];
                                    if (av && String(av.getSiteId()) === String(ax) && av.getTrackerUrl() === ay) {
                                        return av
                                    }
                                }
                            },
                            retryMissedPluginCalls: function() {
                                var av = am;
                                am = [];
                                var au = 0;
                                for (au; au < av.length; au++) {
                                    ak(av[au])
                                }
                            }
                        };
                        if (typeof define === "function" && define.amd) {
                            define("piwik", [], function() {
                                return v
                            });
                            define("matomo", [], function() {
                                return v
                            })
                        }
                        return v
                    }())
                }
                /*!!! pluginTrackerHook */

                /* GENERATED: tracker.min.js */
                /*!!
 * Copyright (C) InnoCraft Ltd - All rights reserved.
 *
 * All information contained herein is, and remains the property of InnoCraft Ltd.
 *
 * @link https://www.innocraft.com/
 * @license For license details see https://www.innocraft.com/license
 */
                (function() {
                    var x = new Date().getTime();
                    var D = null;
                    var U = false;
                    var F = 10;
                    var O = false;
                    var a = true;
                    var A = null;
                    var I = 1000 * 60 * 60 * 3;
                    var t = document;
                    var G = window;
                    var i = 0;
                    var o = 0;
                    var E = false;
                    var d = {
                        play: 50,
                        pause: 25,
                        resume: 25,
                        finish: 50,
                        seek: 50
                    };
                    var M = function() {
                        return {
                            play: 0,
                            pause: 0,
                            resume: 0,
                            finish: 0,
                            seek: 0
                        }
                    };
                    var m = {
                        play: 50,
                        pause: 100,
                        resume: 100,
                        finish: 50,
                        seek: 100
                    };
                    var j = 25;
                    var y = true;
                    var u = function() {
                        return ""
                    };
                    var K = [];
                    function q() {
                        if (typeof Piwik === "object" && typeof Piwik.JSON === "object") {
                            return Piwik.JSON
                        } else {
                            if (G.JSON && G.JSON.parse && G.JSON.stringify) {
                                return G.JSON
                            } else {
                                if (typeof G.JSON2 === "object" && G.JSON2.parse && G.JSON2.stringify) {
                                    return G.JSON2
                                } else {
                                    return {
                                        parse: function() {
                                            return {}
                                        },
                                        stringify: function() {
                                            return ""
                                        }
                                    }
                                }
                            }
                        }
                    }
                    var e = true;
                    function f() {
                        if (U && "undefined" !== typeof console && console && console.debug) {
                            console.debug.apply(console, arguments)
                        }
                    }
                    function v(W) {
                        return typeof W === "object" && typeof W.length === "number"
                    }
                    function N() {
                        return t.getElementById("engage_video") && t.getElementById("videoDisplay1_wrapper")
                    }
                    function b() {
                        return "function" === typeof jwplayer
                    }
                    function n() {
                        return "function" === typeof flowplayer
                    }
                    function r(Y, X) {
                        if (!X.getMediaTitle() && "function" === typeof u) {
                            var W = u(Y);
                            if (W) {
                                X.setMediaTitle(W)
                            }
                        }
                    }
                    var g = {
                        AUDIO: "Audio",
                        VIDEO: "Video"
                    };
                    var J = {
                        getLocation: function() {
                            var W = this.location || G.location;
                            if (!W.origin) {
                                W.origin = W.protocol + "//" + W.hostname + (W.port ? ":" + W.port : "")
                            }
                            return W
                        },
                        setLocation: function(W) {
                            this.location = W
                        },
                        makeUrlAbsolute: function(X) {
                            if ((!X || String(X) !== X) && X !== "") {
                                return X
                            }
                            if (X.indexOf("//") === 0) {
                                return this.getLocation().protocol + X
                            }
                            if (X.indexOf("://") !== -1) {
                                return X
                            }
                            if (X.indexOf("/") === 0) {
                                return this.getLocation().origin + X
                            }
                            if (X.indexOf("#") === 0 || X.indexOf("?") === 0) {
                                return this.getLocation().origin + this.getLocation().pathname + X
                            }
                            if ("" === X) {
                                return this.getLocation().href
                            }
                            var W = "(.*/)";
                            var Y = this.getLocation().origin + this.getLocation().pathname.match(new RegExp(W))[0];
                            return Y + X
                        }
                    };
                    var T = {
                        getCurrentTime: function() {
                            return new Date().getTime()
                        },
                        roundTimeToSeconds: function(W) {
                            return Math.round(W / 1000)
                        },
                        isNumber: function(W) {
                            return !isNaN(W)
                        },
                        isArray: function(W) {
                            return typeof W === "object" && W !== null && typeof W.length === "number"
                        },
                        indexOfArray: function(Y, X) {
                            if (!Y) {
                                return -1
                            }
                            if (Y.indexOf) {
                                return Y.indexOf(X)
                            }
                            if (!this.isArray(Y)) {
                                return -1
                            }
                            for (var W = 0; W < Y.length; W++) {
                                if (Y[W] === X) {
                                    return W
                                }
                            }
                            return -1
                        },
                        getTimeScriptLoaded: function(W) {
                            return x
                        },
                        generateUniqueId: function() {
                            var Z = "";
                            var X = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                            var Y = X.length;
                            for (var W = 0; W < 6; W++) {
                                Z += X.charAt(Math.floor(Math.random() * Y))
                            }
                            return Z
                        },
                        trim: function(W) {
                            if (W && String(W) === W) {
                                return W.replace(/^\s+|\s+$/g, "")
                            }
                            return W
                        },
                        getQueryParameter: function(W, aa) {
                            var Z = new RegExp("[?&]" + aa + "(=([^&#]*)|&|#|$)");
                            var Y = Z.exec(W);
                            if (!Y) {
                                return null
                            }
                            if (!Y[2]) {
                                return ""
                            }
                            var X = Y[2].replace(/\+/g, " ");
                            return decodeURIComponent(X)
                        },
                        isDocumentOffScreen: function() {
                            return t && "undefined" !== t.hidden && t.hidden
                        },
                        roundUp: function(X, W) {
                            if (X !== null && X !== false && this.isNumber(X)) {
                                return Math.ceil(X / W) * W
                            }
                        }
                    };
                    var p = {
                        getAttribute: function(X, W) {
                            if (X && X.getAttribute && W) {
                                return X.getAttribute(W)
                            }
                            return null
                        },
                        setAttribute: function(Y, W, X) {
                            if (Y && Y.setAttribute) {
                                Y.setAttribute(W, X)
                            }
                        },
                        isMediaIgnored: function(W) {
                            var X = p.getAttribute(W, "data-piwik-ignore");
                            if (!!X || X === "") {
                                return true
                            }
                            X = p.getAttribute(W, "data-matomo-ignore");
                            if (!!X || X === "") {
                                return true
                            }
                            return false
                        },
                        getMediaResource: function(W, X) {
                            var Y = p.getAttribute(W, "data-matomo-resource");
                            if (Y) {
                                return Y
                            }
                            Y = p.getAttribute(W, "data-piwik-resource");
                            if (Y) {
                                return Y
                            }
                            Y = p.getAttribute(W, "src");
                            if (Y) {
                                return Y
                            }
                            return X
                        },
                        getMediaTitle: function(W) {
                            var X = p.getAttribute(W, "data-matomo-title");
                            if (!X) {
                                X = p.getAttribute(W, "data-piwik-title")
                            }
                            if (!X) {
                                X = p.getAttribute(W, "title")
                            }
                            if (!X) {
                                X = p.getAttribute(W, "alt")
                            }
                            return X
                        },
                        hasCssClass: function(Y, Z) {
                            if (Y && Y.className) {
                                var X = ("" + Y.className).split(" ");
                                for (var W = 0; W < X.length; W++) {
                                    if (X[W] === Z) {
                                        return true
                                    }
                                }
                            }
                            return false
                        },
                        getFirstParentWithClass: function(Y, Z, W) {
                            if (W <= 0 || !Y || !Y.parentNode) {
                                return null
                            }
                            var X = Y.parentNode;
                            if (this.hasCssClass(X, Z)) {
                                return X
                            } else {
                                return this.getFirstParentWithClass(X, Z, --W)
                            }
                        },
                        isFullscreen: function(W) {
                            if (W && t.fullScreenElement === W || t.mozFullScreenElement === W || t.webkitFullscreenElement === W || t.msFullscreenElement === W) {
                                return true
                            }
                            return false
                        }
                    };
                    function V() {
                        if (null === A) {
                            if ("object" === typeof Piwik && Piwik.getAsyncTrackers) {
                                return Piwik.getAsyncTrackers()
                            }
                        }
                        if (v(A)) {
                            return A
                        }
                        return []
                    }
                    function l(X, W, Y) {
                        this.playerName = X;
                        this.type = W;
                        this.resource = Y;
                        this.disabled = false;
                        this.reset()
                    }
                    l.piwikTrackers = [];
                    l.prototype.disable = function() {
                        this.disabled = true
                    }
                    ;
                    l.prototype.reset = function() {
                        this.id = T.generateUniqueId();
                        this.mediaTitle = null;
                        this.timeToInitialPlay = null;
                        this.width = null;
                        this.height = null;
                        this.fullscreen = false;
                        this.timeout = null;
                        this.watchedTime = 0;
                        this.lastTimeCheck = null;
                        this.isPlaying = false;
                        this.isPaused = false;
                        this.mediaProgressInSeconds = 0;
                        this.mediaLengthInSeconds = 0;
                        this.disabled = false;
                        this.numPlaysSameMedia = 0;
                        this.numPlaysSameMediaOffScreen = 0;
                        this.viewedSegments = [];
                        this.trackedSegments = [];
                        this.lastSentProgressRequestUrl = ""
                    }
                    ;
                    l.prototype.setResource = function(W) {
                        this.resource = W
                    }
                    ;
                    l.prototype.getResource = function() {
                        return this.resource
                    }
                    ;
                    l.prototype.makeRequestUrlFromParams = function(Y) {
                        var X = "";
                        for (var W in Y) {
                            if (Object.prototype.hasOwnProperty.call(Y, W)) {
                                X += W + "=" + encodeURIComponent(Y[W]) + "&"
                            }
                        }
                        return X
                    }
                    ;
                    l.prototype.trackEvent = function(ac) {
                        if (this.disabled) {
                            return
                        }
                        if (!D) {
                            D = T.getCurrentTime()
                        } else {
                            if ((T.getCurrentTime() - D) > I) {
                                this.disable();
                                return
                            }
                        }
                        var W = V();
                        var X = "Media" + this.type;
                        var Z = this.mediaTitle || this.resource;
                        var aa = this.makeRequestUrlFromParams({
                            e_c: X,
                            e_a: ac,
                            e_n: Z,
                            e_v: parseInt(Math.round(this.mediaProgressInSeconds), 10),
                            ca: "1"
                        });
                        if (W && W.length) {
                            var Y = 0, ab;
                            for (Y; Y < W.length; Y++) {
                                ab = W[Y];
                                if (ab && ab.MediaAnalytics && ab.MediaAnalytics.isTrackEventsEnabled()) {
                                    if (L.isEventsLimitReached(ab, Z, ac, this.mediaLengthInSeconds)) {
                                        f("Event limit reached for event: " + ac);
                                        continue
                                    }
                                    if ("function" === typeof ab.queueRequest && "function" === typeof ab.disableQueueRequest) {
                                        ab.queueRequest(aa)
                                    } else {
                                        ab.trackRequest(aa)
                                    }
                                    L.incrLimitPerTrackerPerMediaResource(ab, Z, ac)
                                }
                            }
                        } else {
                            if (typeof G._paq === "undefined") {
                                G._paq = []
                            }
                            G._paq.push(["trackRequest", aa]);
                            f("piwikWasNotYetInitialized. This means players were scanning too early for media or there are no async trackers")
                        }
                        f("trackEvent", X, Z, ac)
                    }
                    ;
                    l.prototype.trackProgress = function(aa, ac, ab, X, Y, ae, an, af, ak, ag, ad, W, ai) {
                        if (this.disabled) {
                            return
                        }
                        if (!D) {
                            D = T.getCurrentTime()
                        } else {
                            if ((T.getCurrentTime() - D) > I) {
                                this.disable();
                                return
                            }
                        }
                        if (this.isPlaying && !ae) {
                            ae = 1
                        }
                        var am = {
                            ma_id: aa,
                            ma_ti: ac !== null ? ac : "",
                            ma_pn: ab,
                            ma_mt: X,
                            ma_re: Y,
                            ma_st: parseInt(Math.floor(ae), 10),
                            ma_ps: parseInt(an, 10),
                            ma_le: af,
                            ma_ttp: ak !== null ? ak : "",
                            ma_w: ag ? ag : "",
                            ma_h: ad ? ad : "",
                            ma_fs: W ? "1" : "0",
                            ma_se: ai.join(","),
                            ca: "1"
                        };
                        var ah = this.makeRequestUrlFromParams(am);
                        if (ah === this.lastSentProgressRequestUrl) {
                            return
                        }
                        this.lastSentProgressRequestUrl = ah;
                        var al = V();
                        if (al && al.length) {
                            var aj = 0, Z;
                            for (aj; aj < al.length; aj++) {
                                Z = al[aj];
                                if (Z && Z.MediaAnalytics && Z.MediaAnalytics.isTrackProgressEnabled()) {
                                    if ("function" === typeof Z.queueRequest && "function" === typeof Z.disableQueueRequest) {
                                        Z.queueRequest(ah)
                                    } else {
                                        Z.trackRequest(ah)
                                    }
                                }
                            }
                        } else {
                            if (typeof G._paq === "undefined") {
                                G._paq = []
                            }
                            G._paq.push(["trackRequest", ah]);
                            f("piwikWasNotYetInitialized. This means players were scanning too early for media or there are no async trackers")
                        }
                        if (U) {
                            f("trackProgress", q().stringify(am))
                        }
                    }
                    ;
                    l.prototype.setFullscreen = function(W) {
                        if (!this.fullscreen) {
                            this.fullscreen = !!W
                        }
                    }
                    ;
                    l.prototype.setWidth = function(W) {
                        if (T.isNumber(W)) {
                            this.width = parseInt(W, 10)
                        }
                    }
                    ;
                    l.prototype.setHeight = function(W) {
                        if (T.isNumber(W)) {
                            this.height = parseInt(W, 10)
                        }
                    }
                    ;
                    l.prototype.setMediaTitle = function(W) {
                        this.mediaTitle = W
                    }
                    ;
                    l.prototype.getMediaTitle = function() {
                        return this.mediaTitle
                    }
                    ;
                    l.prototype.setMediaProgressInSeconds = function(W) {
                        this.mediaProgressInSeconds = W;
                        if (this.isPlaying) {
                            this.viewedSegments.push(W)
                        }
                    }
                    ;
                    l.prototype.getMediaProgressInSeconds = function() {
                        return this.mediaProgressInSeconds
                    }
                    ;
                    l.prototype.setMediaTotalLengthInSeconds = function(W) {
                        this.mediaLengthInSeconds = W
                    }
                    ;
                    l.prototype.getMediaTotalLengthInSeconds = function() {
                        return this.mediaLengthInSeconds
                    }
                    ;
                    l.prototype.play = function() {
                        if (this.isPlaying) {
                            return
                        }
                        this.isPlaying = true;
                        this.setMediaProgressInSeconds(this.getMediaProgressInSeconds());
                        this.startWatchedTime();
                        if (e && this.timeToInitialPlay === null) {
                            this.timeToInitialPlay = T.roundTimeToSeconds(T.getCurrentTime() - T.getTimeScriptLoaded())
                        }
                        e = false;
                        if (this.isPaused) {
                            this.isPaused = false;
                            this.trackEvent("resume")
                        } else {
                            this.trackEvent("play");
                            var W = T.isDocumentOffScreen();
                            this.numPlaysSameMedia++;
                            i++;
                            if (W) {
                                this.numPlaysSameMediaOffScreen++;
                                o++
                            }
                            if (this.numPlaysSameMedia > 25 || i > 50) {
                                this.disable()
                            } else {
                                if (this.numPlaysSameMediaOffScreen > 10 || o > 15) {
                                    this.disable()
                                }
                            }
                        }
                        this.trackUpdate()
                    }
                    ;
                    l.prototype.startWatchedTime = function() {
                        this.lastTimeCheck = T.getCurrentTime()
                    }
                    ;
                    l.prototype.stopWatchedTime = function() {
                        if (this.lastTimeCheck) {
                            this.watchedTime += T.getCurrentTime() - this.lastTimeCheck;
                            this.lastTimeCheck = null
                        }
                    }
                    ;
                    l.prototype.seekStart = function() {
                        if (this.isPlaying) {
                            this.stopWatchedTime()
                        }
                    }
                    ;
                    l.prototype.seekFinish = function() {
                        if (this.isPlaying) {
                            this.startWatchedTime()
                        }
                    }
                    ;
                    l.prototype.pause = function() {
                        if (this.isPlaying) {
                            this.isPaused = true;
                            this.isPlaying = false;
                            if (this.timeout) {
                                clearTimeout(this.timeout);
                                this.timeout = null
                            }
                            this.stopWatchedTime();
                            this.trackUpdate();
                            this.trackEvent("pause")
                        }
                    }
                    ;
                    l.prototype.finish = function() {
                        if (this.timeout) {
                            clearTimeout(this.timeout);
                            this.timeout = null
                        }
                        this.stopWatchedTime();
                        this.trackUpdate();
                        this.trackEvent("finish");
                        this.id = T.generateUniqueId();
                        this.timeToInitialPlay = null;
                        this.lastTimeCheck = null;
                        this.isPlaying = false;
                        this.isPaused = false;
                        this.watchedTime = 0;
                        this.mediaProgressInSeconds = 0
                    }
                    ;
                    l.prototype.trackUpdate = function() {
                        if (this.timeout) {
                            clearTimeout(this.timeout);
                            this.timeout = null
                        }
                        var W = T.getCurrentTime();
                        if (this.lastTimeCheck) {
                            this.watchedTime += (W - this.lastTimeCheck);
                            this.lastTimeCheck = W
                        }
                        var ac = this.mediaLengthInSeconds;
                        if (!ac || !T.isNumber(ac)) {
                            ac = ""
                        } else {
                            ac = parseInt(this.mediaLengthInSeconds, 10)
                        }
                        var Z = T.roundTimeToSeconds(this.watchedTime);
                        var aa = this.mediaProgressInSeconds;
                        if (aa > ac && ac) {
                            aa = ac
                        }
                        var X = [];
                        var Y, ab;
                        for (Y = 0; Y < this.viewedSegments.length; Y++) {
                            ab = this.viewedSegments[Y];
                            if (ab >= 0 && ab <= ac) {
                                if (ab <= 300) {
                                    ab = T.roundUp(ab, 15)
                                } else {
                                    ab = T.roundUp(ab, 30)
                                }
                                if (ab >= 0 && ab < 1) {
                                    ab = 15
                                }
                                if (-1 === T.indexOfArray(X, ab) && -1 === T.indexOfArray(this.trackedSegments, ab)) {
                                    X.push(ab);
                                    this.trackedSegments.push(ab)
                                }
                            }
                        }
                        this.viewedSegments = [];
                        this.trackProgress(this.id, this.mediaTitle, this.playerName, this.type, this.resource, Z, aa, ac, this.timeToInitialPlay, this.width, this.height, this.fullscreen, X)
                    }
                    ;
                    l.prototype.update = function() {
                        if (this.timeout) {
                            return
                        }
                        var Y = T.roundTimeToSeconds(this.watchedTime);
                        var X = F;
                        if (!O && (Y >= 1800 || i > 10)) {
                            X = 300
                        } else {
                            if (!O && (Y >= 600 || i > 4)) {
                                X = 240
                            } else {
                                if (!O && (Y >= 300 || i > 2)) {
                                    X = 120
                                } else {
                                    if (!O && Y >= 60) {
                                        X = 60
                                    }
                                }
                            }
                        }
                        X = X * 1000;
                        var W = this;
                        this.timeout = setTimeout(function() {
                            W.trackUpdate();
                            W.timeout = null
                        }, X)
                    }
                    ;
                    var L = {
                        isEventsLimitReached: function(Z, X, Y, W) {
                            if (!y) {
                                return false
                            }
                            if (L.getTotalEventsOnTracker(Z, Y) >= L.getTotalAllowedEventsPerTracker(Y)) {
                                f("blocked due to max tracker limit reached for action: " + Y);
                                return true
                            }
                            var aa = (W && W > 900 && (Y === "pause" || Y === "resume")) ? 2 : 1;
                            L.initializeLimitPerTrackerPerMediaResource(Z, X, Y);
                            return (Z.MediaAnalytics.quotaEventRequests[X][Y] > (d[Y] * aa))
                        },
                        getTotalEventsOnTracker: function(Z, Y) {
                            var X = 0;
                            if (typeof Z.MediaAnalytics.quotaEventRequests === "undefined") {
                                Z.MediaAnalytics.quotaEventRequests = {};
                                return X
                            }
                            if (Object.keys(Z.MediaAnalytics.quotaEventRequests).length) {
                                for (var W in Z.MediaAnalytics.quotaEventRequests) {
                                    X = X + (Z.MediaAnalytics.quotaEventRequests[W][Y] || 0)
                                }
                            }
                            return X
                        },
                        getTotalAllowedEventsPerTracker: function(W) {
                            return (m[W] || j)
                        },
                        initializeLimitPerTrackerPerMediaResource: function(Y, W, X) {
                            if (typeof Y.MediaAnalytics.quotaEventRequests === "undefined") {
                                Y.MediaAnalytics.quotaEventRequests = {}
                            }
                            if (typeof Y.MediaAnalytics.quotaEventRequests[W] === "undefined") {
                                Y.MediaAnalytics.quotaEventRequests[W] = M()
                            }
                            if (typeof Y.MediaAnalytics.quotaEventRequests[W][X] === "undefined") {
                                Y.MediaAnalytics.quotaEventRequests[W][X] = 0
                            }
                        },
                        incrLimitPerTrackerPerMediaResource: function(Y, W, X) {
                            if (!y) {
                                return
                            }
                            L.initializeLimitPerTrackerPerMediaResource(Y, W, X);
                            Y.MediaAnalytics.quotaEventRequests[W][X]++
                        }
                    };
                    var c = {
                        players: {},
                        registerPlayer: function(W, X) {
                            if (!X || !X.scanForMedia || "function" !== typeof X.scanForMedia) {
                                throw new Error("A registered player does not implement the scanForMedia function")
                            }
                            W = W.toLowerCase();
                            this.players[W] = X
                        },
                        removePlayer: function(W) {
                            W = W.toLowerCase();
                            delete this.players[W]
                        },
                        getPlayer: function(W) {
                            W = W.toLowerCase();
                            if (W in this.players) {
                                return this.players[W]
                            }
                            return null
                        },
                        getPlayers: function() {
                            return this.players
                        },
                        scanForMedia: function(X) {
                            if (!a) {
                                return
                            }
                            if ("undefined" === typeof X || !X) {
                                X = document
                            }
                            var W;
                            for (W in this.players) {
                                if (Object.prototype.hasOwnProperty.call(this.players, W)) {
                                    this.players[W].scanForMedia(X)
                                }
                            }
                        }
                    };
                    var S = function(ai, Y) {
                        if (!ai) {
                            return
                        }
                        if (!G.addEventListener) {
                            return
                        }
                        if (ai.hasPlayerInstance) {
                            return
                        }
                        ai.hasPlayerInstance = true;
                        var an = g.VIDEO === Y;
                        var ab = J.makeUrlAbsolute(ai.currentSrc);
                        var W = p.getMediaResource(ai, ab);
                        var ac = "html5" + Y.toLowerCase();
                        if (typeof paella === "object" && typeof paella.opencast === "object") {
                            ac = "paella-opencast"
                        } else {
                            if (p.getFirstParentWithClass(ai, "video-js", 1)) {
                                ac = "video.js"
                            } else {
                                if (p.hasCssClass(ai, "jw-video")) {
                                    ac = "jwplayer";
                                    var af = p.getFirstParentWithClass(ai, "jw-flag-media-audio");
                                    if (af) {
                                        Y = g.AUDIO
                                    }
                                } else {
                                    if (p.getFirstParentWithClass(ai, "flowplayer", 3)) {
                                        ac = "flowplayer"
                                    }
                                }
                            }
                        }
                        var aa = new l(ac,Y,W);
                        K.push(aa);
                        function X() {
                            if (ai.duration) {
                                aa.setMediaTotalLengthInSeconds(ai.duration)
                            }
                        }
                        function ad() {
                            if (an) {
                                var au = ai;
                                if (ac === "jwplayer") {
                                    var at = p.getFirstParentWithClass(au, "jwplayer");
                                    if (at) {
                                        au = at
                                    }
                                }
                                if ("undefined" !== typeof au.videoWidth && au.videoWidth) {
                                    aa.setWidth(au.videoWidth)
                                } else {
                                    if ("undefined" !== typeof au.clientWidth && au.clientWidth) {
                                        aa.setWidth(au.clientWidth)
                                    }
                                }
                                if ("undefined" !== typeof au.videoHeight && au.videoHeight) {
                                    aa.setHeight(au.videoHeight)
                                } else {
                                    if ("undefined" !== typeof au.clientHeight && au.clientHeight) {
                                        aa.setHeight(au.clientHeight)
                                    }
                                }
                                aa.setFullscreen(p.isFullscreen(au))
                            }
                        }
                        function ae() {
                            aa.setMediaProgressInSeconds(ai.currentTime)
                        }
                        function ao() {
                            var at = p.getMediaTitle(ai);
                            if (at) {
                                aa.setMediaTitle(at)
                            } else {
                                ak(ai, aa)
                            }
                        }
                        ar(ai, aa);
                        ad();
                        ao();
                        X();
                        ae();
                        var Z = false;
                        var ag = false;
                        var ah = null;
                        if (ai.currentSrc) {
                            ah = ai.currentSrc
                        }
                        function ak(av, az) {
                            if (b() && !az.getMediaTitle()) {
                                var ax = p.getFirstParentWithClass(av, "jwplayer", 3);
                                if (!ax) {
                                    ax = p.getFirstParentWithClass(av, "jwplayer-video", 3);
                                    if (ax && "undefined" !== typeof ax.children && ax.children && ax.children.length && ax.children[0]) {
                                        ax = ax.children[0]
                                    }
                                }
                                if (ax) {
                                    try {
                                        var aA = jwplayer(ax);
                                        if (aA && aA.getPlaylistItem) {
                                            var aB = aA.getPlaylistItem();
                                            if (aB && aB.matomoTitle) {
                                                az.setMediaTitle(aB.matomoTitle)
                                            } else {
                                                if (aB && aB.piwikTitle) {
                                                    az.setMediaTitle(aB.piwikTitle)
                                                } else {
                                                    if (aB && aB.title) {
                                                        az.setMediaTitle(aB.title)
                                                    }
                                                }
                                            }
                                        }
                                    } catch (aw) {
                                        f(aw)
                                    }
                                }
                            }
                            if (n() && !az.getMediaTitle()) {
                                var at = p.getFirstParentWithClass(av, "flowplayer", 4);
                                if (at) {
                                    var aA = flowplayer(at);
                                    if (aA && aA.video && aA.video.matomoTitle) {
                                        az.setMediaTitle(aA.video.matomoTitle)
                                    } else {
                                        if (aA && aA.video && aA.video.piwikTitle) {
                                            az.setMediaTitle(aA.video.piwikTitle)
                                        } else {
                                            if (aA && aA.video && aA.video.title) {
                                                az.setMediaTitle(aA.video.title)
                                            } else {
                                                if (aA && aA.video && aA.video.fv_title) {
                                                    az.setMediaTitle(aA.video.fv_title)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (!az.getMediaTitle()) {
                                var au = t.getElementById("engage_basic_description_title");
                                if (au && au.innerText) {
                                    var ay = T.trim(au.innerText);
                                    if (ay) {
                                        az.setMediaTitle(ay)
                                    }
                                } else {
                                    if (typeof paella === "object" && typeof paella.opencast === "object" && typeof paella.opencast._episode === "object" && paella.opencast._episode.dcTitle) {
                                        var ay = T.trim(paella.opencast._episode.dcTitle);
                                        if (ay) {
                                            az.setMediaTitle(ay)
                                        }
                                    }
                                }
                            }
                            r(av, az)
                        }
                        function ar(ax, aw) {
                            if (b()) {
                                var az = p.getFirstParentWithClass(ax, "jwplayer", 3);
                                if (!az) {
                                    az = p.getFirstParentWithClass(ax, "jwplayer-video", 3);
                                    if (az && "undefined" !== typeof az.children && az.children && az.children.length && az.children[0]) {
                                        az = az.children[0]
                                    }
                                }
                                if (az) {
                                    try {
                                        var au = jwplayer(az);
                                        if (au && au.getPlaylistItem) {
                                            var av = au.getPlaylistItem();
                                            if (av && "undefined" !== typeof av.matomoResource && av.matomoResource) {
                                                aw.setResource(av.matomoResource)
                                            } else {
                                                if (av && "undefined" !== typeof av.piwikResource && av.piwikResource) {
                                                    aw.setResource(av.piwikResource)
                                                }
                                            }
                                        }
                                    } catch (ay) {
                                        f(ay)
                                    }
                                }
                            }
                            if (n()) {
                                var at = p.getFirstParentWithClass(ax, "flowplayer", 4);
                                if (at) {
                                    var au = flowplayer(at);
                                    if (au && au.video && "undefined" !== typeof au.video.matomoResource && au.video.matomoResource) {
                                        aw.setResource(au.video.matomoResource)
                                    } else {
                                        if (au && au.video && "undefined" !== typeof au.video.piwikResource && au.video.piwikResource) {
                                            aw.setResource(au.video.piwikResource)
                                        }
                                    }
                                }
                            }
                        }
                        function aj() {
                            if (!ah && ai.currentSrc) {
                                ah = ai.currentSrc
                            } else {
                                if (ah && ai.currentSrc && ah != ai.currentSrc) {
                                    ah = ai.currentSrc;
                                    var au = J.makeUrlAbsolute(ah);
                                    var at = aa.getMediaTitle();
                                    Z = false;
                                    aa.reset();
                                    aa.setResource(au);
                                    aa.setMediaTitle("");
                                    var av = p.getMediaTitle(ai);
                                    if (av && av !== at) {
                                        aa.setMediaTitle(av)
                                    } else {
                                        ak(ai, aa)
                                    }
                                    ar(ai, aa);
                                    X()
                                }
                            }
                        }
                        function aq() {
                            if (!ag && (aa.getResource() || aa.getMediaTitle())) {
                                ag = true;
                                ao(ai, aa);
                                ar(ai, aa);
                                aa.trackUpdate()
                            }
                        }
                        function al() {
                            aj();
                            ad();
                            X();
                            ae();
                            aq()
                        }
                        var am = null;
                        if (ai.loop) {
                            am = 0
                        }
                        var ap = false;
                        if (ai.loop && ai.autoplay && ai.muted) {
                            ap = true
                        }
                        ai.addEventListener("playing", function() {
                            aj();
                            if ("undefined" !== typeof ai.paused && ai.paused) {
                                return
                            }
                            if ("undefined" !== typeof ai.ended && ai.ended) {
                                return
                            }
                            if (!Z) {
                                ae();
                                Z = true;
                                aa.play()
                            }
                        }, true);
                        ai.addEventListener("durationchange", X, true);
                        ai.addEventListener("loadedmetadata", al, true);
                        ai.addEventListener("loadeddata", al, true);
                        ai.addEventListener("pause", function() {
                            if (ai.currentTime && ai.duration && ai.currentTime === ai.duration) {
                                return
                            }
                            if (ai.seeking) {
                                return
                            }
                            ae();
                            Z = false;
                            aa.pause()
                        }, true);
                        ai.addEventListener("seeking", function() {
                            if (ai.seeking) {
                                ae();
                                var at = parseInt(aa.getMediaProgressInSeconds(), 10);
                                if (am === null || am !== at) {
                                    am = at;
                                    aa.trackEvent("seek")
                                }
                            }
                        }, true);
                        ai.addEventListener("ended", function() {
                            Z = false;
                            aa.finish()
                        }, true);
                        ai.addEventListener("timeupdate", function() {
                            ae();
                            X();
                            if (an && !aa.width) {
                                ad()
                            }
                            if ("undefined" !== typeof ai.paused && ai.paused) {
                                return
                            }
                            if ("undefined" !== typeof ai.ended && ai.ended) {
                                return
                            }
                            if (ap) {
                                var at = T.roundTimeToSeconds(aa.watchedTime);
                                var au = aa.getMediaTotalLengthInSeconds();
                                if (at >= 30 && au >= 1 && au < 30 && (at / au) >= 3) {
                                    aa.disable()
                                }
                            }
                            ag = true;
                            if (!Z) {
                                Z = true;
                                aa.play()
                            } else {
                                aa.update()
                            }
                        }, true);
                        ai.addEventListener("seeking", function() {
                            aa.seekStart()
                        }, true);
                        ai.addEventListener("seeked", function() {
                            ae();
                            X();
                            aa.seekFinish()
                        }, true);
                        if (an) {
                            ai.addEventListener("resize", al, true);
                            G.addEventListener("resize", function() {
                                ad()
                            }, false)
                        }
                        aa.timeout = setTimeout(function() {
                            al();
                            aa.timeout = null
                        }, 1500)
                    };
                    S.scanForMedia = function(Z) {
                        if (!G.addEventListener) {
                            return
                        }
                        var aa = N();
                        var ad = Z.getElementsByTagName("video");
                        var X;
                        for (var Y = 0; Y < ad.length; Y++) {
                            if (!p.isMediaIgnored(ad[Y])) {
                                X = p.getAttribute(ad[Y], "id");
                                if (aa) {
                                    var ab = Z.querySelector("#videoDisplay1_wrapper");
                                    if (ab && ("function" === typeof ab.contains) && !ab.contains(ad[Y])) {
                                        continue
                                    }
                                }
                                if (X !== "video_0" && Z.querySelector("#videoPlayerWrapper_0") && Z.querySelector("#video_0")) {
                                    continue
                                }
                                new S(ad[Y],g.VIDEO)
                            }
                        }
                        ad = null;
                        var W = Z.getElementsByTagName("audio");
                        for (var Y = 0; Y < W.length; Y++) {
                            if (!p.isMediaIgnored(W[Y])) {
                                new S(W[Y],g.AUDIO)
                            }
                        }
                        W = null;
                        if ("undefined" !== typeof soundManager && soundManager && "undefined" !== typeof soundManager.sounds) {
                            for (var Y in soundManager.sounds) {
                                if (Object.prototype.hasOwnProperty.call(soundManager.sounds, Y)) {
                                    var ac = soundManager.sounds[Y];
                                    if (ac && ac.isHTML5 && ac._a) {
                                        if (!p.isMediaIgnored(ac._a)) {
                                            new S(ac._a,g.AUDIO)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ;
                    var P = function(Y, ae) {
                        if (!Y || !G.addEventListener) {
                            return
                        }
                        if (Y.hasPlayerInstance || !b()) {
                            return
                        }
                        var af = p.getFirstParentWithClass(Y, "jwplayer", 3);
                        if (!af) {
                            return
                        }
                        var aj = jwplayer(af);
                        if (!aj || !aj.getItem || "undefined" === (typeof aj.getItem())) {
                            return
                        }
                        Y.hasPlayerInstance = true;
                        function ag(al) {
                            var am = al.getPlaylistItem();
                            if (am && am.matomoResource) {
                                return am.matomoResource
                            }
                            if (am && am.piwikResource) {
                                return am.piwikResource
                            }
                            if (am && am.file) {
                                return am.file
                            }
                            return ""
                        }
                        function X(am) {
                            var an = am.getPlaylistItem();
                            if (an && an.matomoTitle) {
                                return an.matomoTitle
                            }
                            if (an && an.piwikTitle) {
                                return an.piwikTitle
                            }
                            if (an && an.title) {
                                return an.title
                            }
                            if ("function" === typeof u) {
                                var al = u(Y);
                                if (al) {
                                    return al
                                }
                            }
                            return null
                        }
                        function ad(al, am, ao) {
                            var an = ag(al);
                            if (ao && an && ao != an) {
                                ao = an;
                                am.reset();
                                am.setResource(J.makeUrlAbsolute(ao));
                                am.setMediaTitle(X(al));
                                am.setWidth(al.getWidth());
                                am.setHeight(al.getHeight());
                                am.setFullscreen(al.getFullscreen());
                                return true
                            }
                            return false
                        }
                        var ai = ag(aj);
                        var W = J.makeUrlAbsolute(ai);
                        var Z = p.getMediaResource(Y, W);
                        var ah = new l("jwplayer",ae,Z);
                        ah.setMediaTitle(X(aj));
                        ah.setWidth(aj.getWidth());
                        ah.setHeight(aj.getHeight());
                        ah.setFullscreen(aj.getFullscreen());
                        K.push(ah);
                        var aa = aj.getDuration();
                        if (aa) {
                            ah.setMediaTotalLengthInSeconds(aa)
                        }
                        var ab = false
                          , ac = ai;
                        var ak = null;
                        aj.on("play", function() {
                            ad(aj, ah, ac);
                            ab = true;
                            ah.play()
                        }, true);
                        aj.on("playlistItem", function() {
                            ad(aj, ah, ac);
                            if (aj.getState() !== "playing") {
                                ab = false
                            }
                        }, true);
                        aj.on("pause", function() {
                            if (aj.getPosition() && aj.getDuration() && aj.getPosition() === aj.getDuration()) {
                                return
                            }
                            ah.pause()
                        }, true);
                        aj.on("complete", function() {
                            ah.finish()
                        }, true);
                        aj.on("time", function() {
                            var al = aj.getPosition();
                            if (al) {
                                ah.setMediaProgressInSeconds(al)
                            }
                            var am = aj.getDuration();
                            if (am) {
                                ah.setMediaTotalLengthInSeconds(am)
                            }
                            if (ab) {
                                ah.update()
                            } else {
                                ab = true;
                                ah.play()
                            }
                        }, true);
                        aj.on("seek", function() {
                            ah.seekStart()
                        }, true);
                        aj.on("seeked", function() {
                            var al = aj.getPosition();
                            if (al) {
                                ah.setMediaProgressInSeconds(al)
                            }
                            var an = aj.getDuration();
                            if (an) {
                                ah.setMediaTotalLengthInSeconds(an)
                            }
                            ah.seekFinish();
                            var am = parseInt(ah.getMediaProgressInSeconds(), 10);
                            if (ak === null || ak !== am) {
                                ak = am;
                                ah.trackEvent("seek")
                            }
                        }, true);
                        aj.on("resize", function() {
                            ah.setWidth(aj.getWidth());
                            ah.setHeight(aj.getHeight());
                            ah.setFullscreen(aj.getFullscreen())
                        }, true);
                        aj.on("fullscreen", function() {
                            ah.setWidth(aj.getWidth());
                            ah.setHeight(aj.getHeight());
                            ah.setFullscreen(aj.getFullscreen())
                        }, false);
                        ah.trackUpdate()
                    };
                    P.scanForMedia = function(X) {
                        if (!G.addEventListener || !b()) {
                            return
                        }
                        var Z = X.getElementsByTagName("object");
                        for (var W = 0; W < Z.length; W++) {
                            if (!p.isMediaIgnored(Z[W]) && p.hasCssClass(Z[W], "jw-swf")) {
                                var Y = g.VIDEO;
                                if (p.hasCssClass(Z[W], "jw-flag-media-audio")) {
                                    Y = g.AUDIO
                                }
                                new P(Z[W],Y)
                            }
                        }
                        Z = null
                    }
                    ;
                    var s = function(Z, ac) {
                        if (!Z) {
                            return
                        }
                        if (!G.addEventListener) {
                            return
                        }
                        if (Z.playerInstance) {
                            return
                        }
                        Z.playerInstance = true;
                        var W = p.getAttribute(Z, "src");
                        var Y = p.getMediaResource(Z, null);
                        var af = new l("vimeo",ac,Y);
                        af.setWidth(Z.clientWidth);
                        af.setHeight(Z.clientHeight);
                        af.setFullscreen(p.isFullscreen(Z));
                        K.push(af);
                        G.addEventListener("resize", function() {
                            af.setWidth(Z.clientWidth);
                            af.setHeight(Z.clientHeight);
                            af.setFullscreen(p.isFullscreen(Z))
                        }, false);
                        var ae = p.getMediaTitle(Z);
                        var aa = !p.getAttribute(Z, "data-piwik-title") && !p.getAttribute(Z, "data-matomo-title");
                        if (ae) {
                            af.setMediaTitle(ae)
                        }
                        Z.matomoSeekLastTime = null;
                        var X = function(ai) {
                            if (!(/^(https?:)?\/\/(player.)?vimeo.com(?=$|\/)/).test(ai.origin)) {
                                return false
                            }
                            if (!ai || !ai.data) {
                                return
                            }
                            if (Z.contentWindow && ai.source && Z.contentWindow !== ai.source) {
                                return
                            }
                            var aj = ai.data;
                            if ("string" === typeof aj) {
                                aj = q().parse(ai.data)
                            }
                            if (("event"in aj && aj.event === "ready") || ("method"in aj && aj.method === "ping")) {
                                if (ab === "*") {
                                    ab = ai.origin
                                }
                                if (!Z.isVimeoReady) {
                                    Z.isVimeoReady = true;
                                    ad("addEventListener", "play");
                                    ad("addEventListener", "pause");
                                    ad("addEventListener", "finish");
                                    ad("addEventListener", "seek");
                                    ad("addEventListener", "seeked");
                                    ad("addEventListener", "playProgress");
                                    ad("getVideoTitle")
                                }
                                return
                            }
                            if ("method"in aj) {
                                f("vimeoMethod", aj.method);
                                switch (aj.method) {
                                case "getVideoTitle":
                                    if (aj.value && aa) {
                                        af.setMediaTitle(aj.value)
                                    } else {
                                        if (aa) {
                                            r(Z, af)
                                        }
                                    }
                                    aa = true;
                                    af.trackUpdate();
                                    break;
                                case "getPaused":
                                    if (aj.value) {
                                        af.pause()
                                    }
                                }
                                return
                            }
                            if ("event"in aj) {
                                var ag = aj.event;
                                f("vimeoEvent", ag);
                                if (aj && aj.data) {
                                    aj = aj.data
                                }
                                if (af && aj && aj.seconds) {
                                    if (af.getMediaProgressInSeconds() === aj.seconds && (ag === "playProgress" || ag === "timeupdate")) {
                                        return
                                    }
                                    af.setMediaProgressInSeconds(aj.seconds)
                                }
                                if (af && aj && aj.duration) {
                                    af.setMediaTotalLengthInSeconds(aj.duration)
                                }
                                switch (ag) {
                                case "play":
                                    af.play();
                                    break;
                                case "timeupdate":
                                case "playProgress":
                                    if (af._isSeeking) {
                                        af._isSeeking = false;
                                        af.seekFinish()
                                    }
                                    af.update();
                                    break;
                                case "seek":
                                    af.seekStart();
                                    af._isSeeking = true;
                                    break;
                                case "seeked":
                                    var ah = parseInt(af.getMediaProgressInSeconds(), 10);
                                    if (Z.matomoSeekLastTime === null || Z.matomoSeekLastTime !== ah) {
                                        Z.matomoSeekLastTime = ah;
                                        af.trackEvent("seek")
                                    }
                                    break;
                                case "pause":
                                    if (aj && aj.seconds && aj && aj.duration && aj.seconds === aj.duration) {
                                        f("ignoring pause event because video is finished");
                                        break
                                    }
                                    setTimeout(function() {
                                        ad("getPaused")
                                    }, 700);
                                    break;
                                case "finish":
                                    af.finish();
                                    break
                                }
                            }
                        };
                        G.addEventListener("message", X, true);
                        var ab = "*";
                        af._isSeeking = false;
                        function ad(aj, ah) {
                            var ag = {
                                method: aj
                            };
                            if (ah !== undefined) {
                                ag.value = ah
                            }
                            if (Z && Z.contentWindow) {
                                if (navigator && navigator.userAgent) {
                                    var ai = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
                                    if (ai >= 8 && ai < 10) {
                                        ag = q().stringify(ag)
                                    }
                                }
                                Z.contentWindow.postMessage(ag, ab)
                            }
                        }
                        ad("ping")
                    };
                    s.scanForMedia = function(Y) {
                        if (!G.addEventListener) {
                            return
                        }
                        var X = Y.getElementsByTagName("iframe");
                        for (var W = 0; W < X.length; W++) {
                            if (p.isMediaIgnored(X[W])) {
                                continue
                            }
                            var Z = p.getAttribute(X[W], "src");
                            if (Z && (Z.indexOf("player.vimeo.com") > 0 || (Z.indexOf("vimeo.com") > 0 && Z.indexOf("embed") > 0))) {
                                new s(X[W],g.VIDEO)
                            }
                        }
                        X = null
                    }
                    ;
                    var w = function(ab, ae) {
                        if (!ab) {
                            return
                        }
                        if (!G.addEventListener) {
                            return
                        }
                        if (ab.playerInstance) {
                            return
                        }
                        if (typeof Plyr === "function" && p.getFirstParentWithClass(ab, "plyr", 2)) {
                            return
                        }
                        var X = p.getMediaResource(ab, null);
                        var ah = new l("youtube",ae,X);
                        ah.setWidth(ab.clientWidth);
                        ah.setHeight(ab.clientHeight);
                        ah.setFullscreen(p.isFullscreen(ab));
                        K.push(ah);
                        G.addEventListener("resize", function() {
                            ah.setWidth(ab.clientWidth);
                            ah.setHeight(ab.clientHeight);
                            ah.setFullscreen(p.isFullscreen(ab))
                        }, false);
                        var ag = p.getMediaTitle(ab);
                        if (ag) {
                            ah.setMediaTitle(ag)
                        }
                        var Y = false;
                        var aa = null;
                        var ad = !p.getAttribute(ab, "data-piwik-title") && !p.getAttribute(ab, "data-matomo-title");
                        var W = false;
                        var ac = false;
                        var af = null;
                        function Z(ai) {
                            if (!ai || !ai.target) {
                                return
                            }
                            var am = ai.target;
                            var al;
                            if (ai && "undefined" !== typeof ai.data && null !== ai.data) {
                                al = ai.data
                            } else {
                                if (!am.getPlayerState) {
                                    f("youtubeMissingPlayerState");
                                    return
                                }
                                al = am.getPlayerState()
                            }
                            f("youtubeStateChange", al);
                            switch (al) {
                            case YT.PlayerState.ENDED:
                                if (am.getCurrentTime) {
                                    ah.setMediaProgressInSeconds(am.getCurrentTime())
                                }
                                if (am.getDuration) {
                                    ah.setMediaTotalLengthInSeconds(am.getDuration())
                                }
                                ah.finish();
                                if (aa) {
                                    clearInterval(aa);
                                    aa = null
                                }
                                break;
                            case YT.PlayerState.PLAYING:
                                var aj = null;
                                if (am.getVideoData) {
                                    aj = am.getVideoData()
                                }
                                if (!af && aj && aj.video_id) {
                                    af = aj.video_id
                                } else {
                                    if (af && aj && aj.video_id && af != aj.video_id) {
                                        af = aj.video_id;
                                        ah.reset();
                                        if (am.getVideoUrl) {
                                            ah.setResource(am.getVideoUrl())
                                        }
                                        ad = true;
                                        W = false;
                                        Y = false;
                                        f("currentVideoId has changed to " + af)
                                    }
                                }
                                if (am.getCurrentTime) {
                                    ah.setMediaProgressInSeconds(am.getCurrentTime())
                                }
                                if (am.getDuration) {
                                    ah.setMediaTotalLengthInSeconds(am.getDuration())
                                }
                                if (ad) {
                                    if (aj && aj.title) {
                                        ah.setMediaTitle(aj.title)
                                    }
                                    ad = false
                                }
                                if (!W || ac) {
                                    W = true;
                                    ac = false;
                                    Y = false;
                                    ah.play()
                                } else {
                                    if (Y) {
                                        Y = false;
                                        ah.seekFinish()
                                    }
                                }
                                ah.update();
                                if (!aa) {
                                    var ak = [];
                                    aa = setInterval(function() {
                                        if (ah.isPlaying) {
                                            if (am && am.getCurrentTime) {
                                                var an = am.getCurrentTime();
                                                ah.setMediaProgressInSeconds(an);
                                                ak.push(an);
                                                if (ak.length > 60) {
                                                    ak.shift();
                                                    var ao = 0;
                                                    var ap = true;
                                                    for (ao = 0; ao < ak.length; ao++) {
                                                        if (ak[ao] !== ak[0]) {
                                                            ap = false
                                                        }
                                                    }
                                                    if (ap) {
                                                        ac = true;
                                                        ah.pause();
                                                        ak = [];
                                                        return
                                                    }
                                                }
                                            }
                                            ah.update()
                                        }
                                    }, 1 * 1000)
                                }
                                break;
                            case -1:
                            case YT.PlayerState.PAUSED:
                                setTimeout(function() {
                                    if (am && am.getPlayerState && am.getPlayerState() == YT.PlayerState.PAUSED) {
                                        if (am && am.getCurrentTime) {
                                            ah.setMediaProgressInSeconds(am.getCurrentTime())
                                        }
                                        ah.pause();
                                        ac = true;
                                        if (aa) {
                                            clearInterval(aa);
                                            aa = null
                                        }
                                    } else {
                                        f("target not found in YT paused state")
                                    }
                                }, 1000);
                                break;
                            case YT.PlayerState.BUFFERING:
                                ah.seekStart();
                                Y = true;
                                if (aa) {
                                    clearInterval(aa);
                                    aa = null
                                }
                                break
                            }
                        }
                        ab.playerInstance = new YT.Player(ab,{
                            events: {
                                onReady: function(ai) {
                                    if (!ai || !ai.target) {
                                        return
                                    }
                                    if (ad && ai.target && ai.target.getVideoData) {
                                        var aj = ai.target.getVideoData();
                                        if (aj && aj.title) {
                                            ah.setMediaTitle(aj.title)
                                        } else {
                                            r(ab, ah)
                                        }
                                    }
                                    ah.trackUpdate();
                                    if (ai.target.getPlayerState && ai.target.getPlayerState() == YT.PlayerState.PLAYING) {
                                        Z(ai)
                                    }
                                },
                                onError: function(ai) {
                                    if (!ai || !ai.data) {
                                        return
                                    }
                                    if (ah.isPlaying) {
                                        ac = true;
                                        ah.pause()
                                    }
                                    f("YT onError event happened")
                                },
                                onStateChange: Z
                            }
                        })
                    };
                    w.scanForMedia = function(ae) {
                        if (!G.addEventListener) {
                            return
                        }
                        var Y = [];
                        var ad = ae.getElementsByTagName("iframe");
                        for (var aa = 0; aa < ad.length; aa++) {
                            if (p.isMediaIgnored(ad[aa])) {
                                continue
                            }
                            var W = p.getAttribute(ad[aa], "src");
                            if (W && (W.indexOf("youtube.com") > 0 || W.indexOf("youtube-nocookie.com") > 0)) {
                                p.setAttribute(ad[aa], "enablejsapi", "true");
                                Y.push(ad[aa])
                            }
                        }
                        ad = null;
                        function X(ai, ah) {
                            if (!(ai in window)) {
                                return
                            }
                            var aj = window[ai];
                            if ("function" !== typeof aj) {
                                return
                            }
                            try {
                                if (aj.toString && aj.toString().indexOf("function replaceMe") === 0) {
                                    return
                                }
                            } catch (ag) {}
                            function af() {
                                try {
                                    aj.apply(window, [].slice.call(arguments, 0));
                                    ah()
                                } catch (ak) {
                                    ah();
                                    throw ak
                                }
                            }
                            window[ai] = af
                        }
                        function ac() {
                            return "object" === typeof YT && YT && YT.Player
                        }
                        function Z() {
                            if (!ac()) {
                                return
                            }
                            var af = ae.getElementsByTagName("iframe");
                            for (var ag = 0; ag < af.length; ag++) {
                                if (p.isMediaIgnored(af[ag])) {
                                    continue
                                }
                                var ah = p.getAttribute(af[ag], "src");
                                if (ah && (ah.indexOf("youtube.com") > 0 || ah.indexOf("youtube-nocookie.com") > 0)) {
                                    if (af[ag].setAttribute) {
                                        af[ag].setAttribute("enablejsapi", "true")
                                    }
                                    new w(af[ag],g.VIDEO)
                                }
                            }
                        }
                        if (Y && Y.length) {
                            if (ac()) {
                                Z()
                            } else {
                                if (G.onYouTubeIframeAPIReady) {
                                    X("onYouTubeIframeAPIReady", Z);
                                    ab(false)
                                } else {
                                    if (G.onYouTubePlayerAPIReady) {
                                        X("onYouTubePlayerAPIReady", Z);
                                        ab(false)
                                    } else {
                                        G.onYouTubeIframeAPIReady = Z;
                                        ab(true)
                                    }
                                }
                            }
                        }
                        function ab(ah) {
                            if (!ah && (typeof G.YT === "object" || t.querySelectorAll('script[src="https://www.youtube.com/iframe_api"]').length > 0)) {
                                return
                            }
                            var ag = t.createElement("script");
                            ag.src = "https://www.youtube.com/iframe_api";
                            var af = t.getElementsByTagName("script");
                            if (af && af.length) {
                                var ai = af[0];
                                ai.parentNode.insertBefore(ag, ai)
                            } else {
                                if (t.body) {
                                    t.body.appendChild(ag)
                                }
                            }
                        }
                        Y = null
                    }
                    ;
                    var H = function(Z, aj) {
                        if (!Z) {
                            return
                        }
                        if (Z.playerInstance) {
                            return
                        }
                        var am = new SC.Widget(Z);
                        Z.playerInstance = am;
                        var W = p.getAttribute(Z, "data-matomo-resource");
                        if (!W) {
                            W = p.getAttribute(Z, "data-piwik-resource")
                        }
                        var al = new l("soundcloud",aj,W);
                        K.push(al);
                        var ak = p.getMediaTitle(Z);
                        if (ak) {
                            al.setMediaTitle(ak)
                        }
                        var X = false;
                        var Y = null;
                        var ae = !p.getAttribute(Z, "data-piwik-title") && !p.getAttribute(Z, "data-matomo-title");
                        function ab() {
                            return al.getMediaTitle() && al.getResource()
                        }
                        var ai = null;
                        function ah(an) {
                            am.getCurrentSound(function(ao) {
                                if (ao === null) {
                                    am.getCurrentSoundIndex(function(ap) {
                                        if (ap >= 0) {
                                            am.getSounds(function(aq) {
                                                if (ap in aq && aq[ap]) {
                                                    an(aq[ap])
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    an(ao)
                                }
                            })
                        }
                        function ag(an) {
                            if (!an) {
                                return
                            }
                            ai = an.id;
                            if (ae && !al.getMediaTitle() && an.title) {
                                al.setMediaTitle(an.title)
                            }
                            if (an.uri && !al.getResource()) {
                                al.setResource(an.uri)
                            }
                            if (an.duration) {
                                al.setMediaTotalLengthInSeconds(parseInt(Math.floor(an.duration / 1000)))
                            }
                            al.trackUpdate()
                        }
                        function ad(an) {
                            if (an && an.soundId && ai !== an.soundId) {
                                ai = an.soundId;
                                al.reset();
                                al.setResource("");
                                al.setMediaTitle("");
                                ae = true;
                                X = false;
                                ah(ag);
                                f("currentId has changed to " + ai);
                                return true
                            }
                            return false
                        }
                        function aa() {
                            am.getDuration(function(an) {
                                al.setMediaTotalLengthInSeconds(parseInt(Math.floor(an / 1000)))
                            })
                        }
                        function af(an) {
                            if ("object" === typeof an && "undefined" !== typeof an.currentPosition) {
                                al.setMediaProgressInSeconds(parseInt(Math.floor(an.currentPosition / 1000)))
                            }
                        }
                        var ac = false;
                        am.bind(SC.Widget.Events.READY, function(an) {
                            ah(ag);
                            am.bind(SC.Widget.Events.PLAY, function(ao) {
                                if (!ab()) {
                                    return
                                }
                                if (ad(ao)) {
                                    return
                                }
                                aa();
                                af(ao);
                                al.play()
                            });
                            am.bind(SC.Widget.Events.PLAY_PROGRESS, function(ao) {
                                if (!ab()) {
                                    return
                                }
                                if (ad(ao)) {
                                    return
                                }
                                aa();
                                af(ao);
                                if (ac) {
                                    return
                                }
                                if (al.isPaused) {
                                    al.play();
                                    return
                                }
                                if (!al.isPlaying) {
                                    return
                                }
                                if (X) {
                                    X = false;
                                    al.seekFinish()
                                }
                                al.update()
                            });
                            am.bind(SC.Widget.Events.PAUSE, function(ao) {
                                if (!ab()) {
                                    return
                                }
                                if (ad(ao)) {
                                    return
                                }
                                aa();
                                af(ao);
                                if (al.getMediaProgressInSeconds() && al.getMediaTotalLengthInSeconds() === al.getMediaProgressInSeconds()) {
                                    f("ignoring pause event because video is finished");
                                    return
                                }
                                al.pause();
                                ac = true;
                                setTimeout(function() {
                                    ac = false
                                }, 1000)
                            });
                            am.bind(SC.Widget.Events.FINISH, function(ao) {
                                if (!ab()) {
                                    return
                                }
                                if (ad(ao)) {
                                    return
                                }
                                aa();
                                af(ao);
                                al.finish()
                            });
                            am.bind(SC.Widget.Events.SEEK, function(ao) {
                                if (!ab()) {
                                    return
                                }
                                if (ad(ao)) {
                                    return
                                }
                                aa();
                                af(ao);
                                al.seekStart();
                                X = true
                            })
                        })
                    };
                    H.scanForMedia = function(ab) {
                        function Z() {
                            var ag = [];
                            var ae = ab.getElementsByTagName("iframe");
                            for (var af = 0; af < ae.length; af++) {
                                if (p.isMediaIgnored(ae[af])) {
                                    continue
                                }
                                var ah = p.getAttribute(ae[af], "src");
                                if (ah && ah.indexOf("w.soundcloud.com") > 0) {
                                    ag.push(ae[af])
                                }
                            }
                            return ag
                        }
                        function aa() {
                            return "object" === typeof SC && SC && SC.Widget
                        }
                        function ad() {
                            if (!aa()) {
                                return
                            }
                            var af = Z();
                            for (var ae = 0; ae < af.length; ae++) {
                                var ag = p.getAttribute(af[ae], "src");
                                if (ag && ag.indexOf("w.soundcloud.com") > 0) {
                                    new H(af[ae],g.AUDIO)
                                }
                            }
                        }
                        var Y = Z();
                        if (Y && Y.length) {
                            if (aa()) {
                                ad()
                            } else {
                                var X = t.createElement("script");
                                X.src = "https://w.soundcloud.com/player/api.js";
                                X.onload = ad;
                                var W = t.getElementsByTagName("script");
                                if (W && W.length) {
                                    var ac = W[0];
                                    ac.parentNode.insertBefore(X, ac)
                                } else {
                                    if (t.body) {
                                        t.body.appendChild(X)
                                    }
                                }
                            }
                        }
                        Y = null
                    }
                    ;
                    c.registerPlayer("html5", S);
                    c.registerPlayer("vimeo", s);
                    c.registerPlayer("youtube", w);
                    c.registerPlayer("jwplayer", P);
                    c.registerPlayer("soundcloud", H);
                    function C(W) {
                        if ("undefined" !== typeof W.MediaAnalytics) {
                            return
                        }
                        W.MediaAnalytics = {
                            enableEvents: true,
                            enableProgress: true,
                            quotaEventRequests: {},
                            disableTrackEvents: function() {
                                this.enableEvents = false
                            },
                            enableTrackEvents: function() {
                                this.enableEvents = true
                            },
                            isTrackEventsEnabled: function() {
                                return a && this.enableEvents
                            },
                            disableTrackProgress: function() {
                                this.enableProgress = false
                            },
                            enableTrackProgress: function() {
                                this.enableProgress = true
                            },
                            isTrackProgressEnabled: function() {
                                return a && this.enableProgress
                            }
                        };

                        ;Piwik.trigger("MediaAnalytics.TrackerInitialized", [W])
                    }
                    function z() {
                        if (typeof window === "object" && "function" === typeof G.piwikMediaAnalyticsAsyncInit) {
                            G.piwikMediaAnalyticsAsyncInit()
                        }
                        if (typeof window === "object" && "function" === typeof G.matomoMediaAnalyticsAsyncInit) {
                            G.matomoMediaAnalyticsAsyncInit()
                        }
                        E = true
                    }
                    var B = false;
                    var k = false;
                    function h() {
                        if (!B && b()) {
                            B = true;
                            var X = jwplayer();
                            if ("object" === typeof X && "function" === typeof X.on) {
                                X.on("ready", function(Y) {
                                    c.scanForMedia(document)
                                })
                            }
                        }
                        if (!k && n()) {
                            k = true;
                            flowplayer(function(Z, Y) {
                                if (Z) {
                                    Z.on("ready", function() {
                                        c.scanForMedia(document)
                                    });
                                    Z.on("load", function() {
                                        c.scanForMedia(document)
                                    })
                                }
                            });
                            var W = flowplayer();
                            if ("object" === typeof W && "function" === typeof W.on) {
                                W.on("ready", function() {
                                    c.scanForMedia(document)
                                });
                                W.on("load", function() {
                                    c.scanForMedia(document)
                                })
                            }
                        }
                    }
                    function Q() {
                        Piwik.DOM.onReady(function() {
                            var W = V();
                            if (!W || !v(W) || !W.length) {
                                return
                            }
                            c.scanForMedia(document);
                            h()
                        });
                        Piwik.DOM.onLoad(function() {
                            var W = V();
                            if (!W || !v(W) || !W.length) {
                                return
                            }
                            c.scanForMedia(document);
                            h()
                        })
                    }
                    function R() {
                        if ("object" === typeof G && "object" === typeof G.Piwik && "object" === typeof G.Piwik.MediaAnalytics) {
                            return
                        }
                        if ("object" === typeof G && !G.Piwik) {
                            return
                        }
                        Piwik.MediaAnalytics = {
                            utils: T,
                            url: J,
                            element: p,
                            players: c,
                            rateLimit: L,
                            MediaTracker: l,
                            mediaType: g,
                            scanForMedia: function(Y) {
                                c.scanForMedia(Y || document)
                            },
                            setPingInterval: function(Y) {
                                if (10 > Y) {
                                    throw new Error("Ping interval needs to be at least ten seconds")
                                }
                                O = true;
                                F = parseInt(Y, 10)
                            },
                            removePlayer: function(Y) {
                                c.removePlayer(Y)
                            },
                            addPlayer: function(Z, Y) {
                                c.registerPlayer(Z, Y)
                            },
                            disableMediaAnalytics: function() {
                                a = false
                            },
                            enableMediaAnalytics: function() {
                                a = true
                            },
                            setMatomoTrackers: function(Y) {
                                this.setPiwikTrackers(Y)
                            },
                            setPiwikTrackers: function(Y) {
                                if (Y === null) {
                                    A = null;
                                    return
                                }
                                if (!v(Y)) {
                                    Y = [Y]
                                }
                                A = Y;
                                if (E) {
                                    Q()
                                }
                            },
                            setMediaTitleFallback: function(Y) {
                                if ("function" !== typeof Y) {
                                    throw new Error("The mediaTitleFallback needs to be callback function")
                                }
                                u = Y
                            },
                            getMatomoTrackers: function() {
                                return V()
                            },
                            getPiwikTrackers: function() {
                                return V()
                            },
                            isMediaAnalyticsEnabled: function() {
                                return a
                            },
                            setMaxTrackingTime: function(Y) {
                                I = parseInt(Y, 10) * 1000
                            },
                            enableDebugMode: function() {
                                U = true
                            },
                            enableRateLimit: function() {
                                y = true
                            },
                            disableRateLimit: function() {
                                y = false
                            }
                        };
                        Piwik.addPlugin("MediaAnalytics", {
                            unload: function() {
                                var Z;
                                f("tracker intances mediaTrackerInstances");
                                for (var Y = 0; Y < K.length; Y++) {
                                    Z = K[Y];
                                    if (Z && Z.timeout) {
                                        f("before unload");
                                        Z.trackUpdate()
                                    }
                                }
                            },
                            log: function(aa) {
                                var Y = V();
                                if (Y && Y.length) {
                                    for (var Z = 0; Z < Y.length; Z++) {
                                        if (typeof Y[Z].MediaAnalytics.quotaEventRequests !== "undefined" && Object.keys(Y[Z].MediaAnalytics.quotaEventRequests).length > 0) {
                                            Y[Z].MediaAnalytics.quotaEventRequests = {}
                                        }
                                    }
                                }
                                return ""
                            }
                        });
                        if (G.Piwik.initialized) {
                            var W = Piwik.getAsyncTrackers();
                            var X = 0;
                            for (X; X < W.length; X++) {
                                C(W[X])
                            }
                            Piwik.on("TrackerSetup", C);
                            Piwik.retryMissedPluginCalls();
                            z();
                            Q();
                            Piwik.on("TrackerAdded", Q)
                        } else {
                            Piwik.on("TrackerSetup", C);
                            Piwik.on("MatomoInitialized", function() {
                                z();
                                Q();
                                Piwik.on("TrackerAdded", Q)
                            })
                        }
                    }
                    if ("object" === typeof G.Piwik) {
                        R()
                    } else {
                        if ("object" !== typeof G.matomoPluginAsyncInit) {
                            G.matomoPluginAsyncInit = []
                        }
                        G.matomoPluginAsyncInit.push(R)
                    }
                }
                )();
                /* END GENERATED: tracker.min.js */

                /* GENERATED: tracker.min.js */
                /*!!
 * Copyright (C) InnoCraft Ltd - All rights reserved.
 *
 * All information contained herein is, and remains the property of InnoCraft Ltd.
 *
 * @link https://www.innocraft.com/
 * @license For license details see https://www.innocraft.com/license
 */
                (function() {
                    var l = false;
                    var r = true;
                    var q = null;
                    var k = false;
                    var j = "FIELD_CHECKABLE";
                    var y = "FIELD_SELECTABLE";
                    var h = "FIELD_TEXT";
                    var n = ["password", "text", "url", "tel", "email", "search", "", null];
                    var a = ["color", "date", "datetime", "datetime-local", "month", "number", "range", "time", "week"];
                    var b = ["radio", "checkbox"];
                    var p = ["button", "submit", "hidden", "reset"];
                    var u = 30000;
                    var z = [];
                    var o = 500;
                    function e() {
                        if (l && "undefined" !== typeof console && console && console.debug) {
                            console.debug.apply(console, arguments)
                        }
                    }
                    var c = {
                        getAttribute: function(B, A) {
                            if (B && B.getAttribute && A) {
                                return B.getAttribute(A)
                            }
                            return null
                        },
                        hasClass: function(B, A) {
                            if (!B || !B.className) {
                                return false
                            }
                            return (" " + B.className + " ").indexOf(" " + A + " ") > -1
                        },
                        hasNodeAttribute: function(B, A) {
                            if (B && B.hasAttribute) {
                                return B.hasAttribute(A)
                            }
                            if (B && B.attributes) {
                                var C = (typeof B.attributes[A]);
                                return C !== "undefined"
                            }
                            return false
                        },
                        isIgnored: function(A) {
                            if (this.hasNodeAttribute(A, "data-matomo-ignore")) {
                                return true
                            }
                            if (this.hasNodeAttribute(A, "data-piwik-ignore")) {
                                return true
                            }
                            return false
                        },
                        getTagName: function(A) {
                            if (A && A.tagName) {
                                return ("" + A.tagName).toLowerCase()
                            }
                            return null
                        },
                        findAllFormElements: function(A) {
                            if (A && A.querySelectorAll) {
                                return A.querySelectorAll("form, [data-piwik-form], [data-matomo-form]")
                            }
                            return []
                        },
                        findAllFieldElements: function(A) {
                            if (A && A.querySelectorAll) {
                                return A.querySelectorAll("input,select,textarea,button,textarea")
                            }
                            return []
                        },
                        findFormTrackerInstance: function(B, A) {
                            if ("undefined" === typeof A) {
                                A = 100
                            }
                            if (A <= 0 || !B) {
                                return null
                            }
                            if (B.formTrackerInstance) {
                                return B.formTrackerInstance
                            }
                            if (B.parentNode) {
                                return this.findFormTrackerInstance(B.parentNode, --A)
                            }
                        }
                    };
                    var v = {
                        isArray: function(A) {
                            return typeof A === "object" && A !== null && typeof A.length === "number"
                        },
                        indexOfArray: function(C, B) {
                            if (!C) {
                                return -1
                            }
                            if (C.indexOf) {
                                return C.indexOf(B)
                            }
                            if (!this.isArray(C)) {
                                return -1
                            }
                            for (var A = 0; A < C.length; A++) {
                                if (C[A] === B) {
                                    return A
                                }
                            }
                            return -1
                        },
                        getCurrentTime: function() {
                            return new Date().getTime()
                        },
                        isNumber: function(A) {
                            return !isNaN(A)
                        },
                        generateUniqueId: function() {
                            var D = "";
                            var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                            var C = B.length;
                            for (var A = 0; A < 6; A++) {
                                D += B.charAt(Math.floor(Math.random() * C))
                            }
                            return D
                        },
                        paramsToQueryString: function(C) {
                            if (!C) {
                                C = {}
                            }
                            var B = "";
                            for (var A in C) {
                                if (Object.prototype.hasOwnProperty.call(C, A)) {
                                    if (C[A] === null) {
                                        continue
                                    }
                                    B += A + "=" + encodeURIComponent(C[A]) + "&"
                                }
                            }
                            return B
                        }
                    };
                    var g = {
                        getPiwikTrackers: function() {
                            if (null === q) {
                                if ("object" === typeof Piwik && Piwik.getAsyncTrackers) {
                                    return Piwik.getAsyncTrackers()
                                }
                            }
                            if (v.isArray(q)) {
                                return q
                            }
                            return []
                        },
                        trackParams: function(F, E) {
                            if (!r) {
                                return
                            }
                            var C = v.paramsToQueryString(F);
                            if (C) {
                                if (C.substr(-1) !== "&") {
                                    C += "&"
                                }
                                C += "ca=1"
                            }
                            if (!C || C === "") {
                                return
                            }
                            var A = this.getPiwikTrackers();
                            if (A && A.length) {
                                var B = 0, D;
                                for (B; B < A.length; B++) {
                                    D = A[B];
                                    if (!D.noOfFormRequestsSent) {
                                        D.noOfFormRequestsSent = 0
                                    }
                                    if (D.noOfFormRequestsSent > o) {
                                        e("maximum number of form request allowed for a tracker reached");
                                        continue
                                    }
                                    if (E && 500 === D.getLinkTrackingTimer() && D.setLinkTrackingTimer) {
                                        D.setLinkTrackingTimer(650)
                                    }
                                    if (D && (!D.FormAnalytics || D.FormAnalytics.isEnabled())) {
                                        D.queueRequest(C);
                                        D.noOfFormRequestsSent++
                                    }
                                }
                            }
                            if (l) {
                                e("trackProgress: " + Piwik.JSON.stringify(F))
                            }
                        }
                    };
                    function f() {
                        Matomo.FormAnalytics.setMaxNoOfFormRequestsAllowed(500);
                        ;if (typeof window === "object" && "function" === typeof window.piwikFormAnalyticsAsyncInit) {
                            window.piwikFormAnalyticsAsyncInit()
                        }
                        if (typeof window === "object" && "function" === typeof window.matomoFormAnalyticsAsyncInit) {
                            window.matomoFormAnalyticsAsyncInit()
                        }
                        k = true
                    }
                    function t(A) {
                        this.reset();
                        this.fields = [];
                        this.firstFieldEngagementDate = null;
                        this.lastFieldEngagementDate = null;
                        this.hesitationTimeTracked = false;
                        this.formStartTracked = false;
                        this.node = A;
                        this.formId = c.getAttribute(A, "id");
                        this.formName = c.getAttribute(A, "data-matomo-name");
                        if (!this.formName) {
                            this.formName = c.getAttribute(A, "data-piwik-name")
                        }
                        if (!this.formName) {
                            this.formName = c.getAttribute(A, "name")
                        }
                        this.entryFieldName = "";
                        this.exitFieldName = "";
                        this.lastFocusedFieldName = "";
                        this.fieldsWithUpdates = [];
                        this.fieldNodes = [];
                        this.initialFormViewLoggedWithTrackers = [];
                        this.trackingTimeout = null;
                        this.timeLastTrackingRequest = 0;
                        this.timeOffWindowBeforeEngagement = 0;
                        this.timeOffWindowSinceEngagement = 0;
                        Piwik.DOM.addEventListener(window, "focus", (function(B) {
                            return function() {
                                if (!B.timeWindowBlur) {
                                    return
                                }
                                var C = v.getCurrentTime() - B.timeWindowBlur;
                                B.timeWindowBlur = null;
                                if (C < 0) {
                                    C = 0
                                }
                                if (B.timeLastTrackingRequest) {
                                    B.timeLastTrackingRequest = B.timeLastTrackingRequest + C
                                }
                                if (B.firstFieldEngagementDate) {
                                    B.timeOffWindowSinceEngagement += C;
                                    e("time off engaged " + B.timeOffWindowSinceEngagement)
                                } else {
                                    B.timeOffWindowBeforeEngagement += C;
                                    e("time off not engaged " + B.timeOffWindowBeforeEngagement)
                                }
                            }
                        }
                        )(this));
                        Piwik.DOM.addEventListener(window, "blur", (function(B) {
                            return function() {
                                B.timeWindowBlur = v.getCurrentTime();
                                e("window blur")
                            }
                        }
                        )(this));
                        Piwik.DOM.addEventListener(A, "submit", (function(B) {
                            return function() {
                                e("form submit");
                                B.trackFormSubmit()
                            }
                        }
                        )(this))
                    }
                    t.prototype.reset = function() {
                        this.detectionDate = v.getCurrentTime();
                        this.formViewId = v.generateUniqueId();
                        this.fieldsWithUpdates = [];
                        this.firstFieldEngagementDate = null;
                        this.lastFieldEngagementDate = null;
                        this.timeOffWindowSinceEngagement = 0;
                        this.timeOffWindowBeforeEngagement = 0;
                        this.formStartTracked = false;
                        if (this.fields && this.fields.length) {
                            for (var A = 0; A < this.fields.length; A++) {
                                this.fields[A].resetOnFormSubmit()
                            }
                        }
                    }
                    ;
                    t.prototype.trackFormSubmit = function() {
                        this.setEngagedWithForm();
                        var A = this.lastFieldEngagementDate - this.firstFieldEngagementDate - this.timeOffWindowSinceEngagement;
                        if (A < 0) {
                            A = 0
                        }
                        var B = {
                            fa_su: 1,
                            fa_tts: A
                        };
                        this.sendUpdate(this.fields, B, true);
                        this.reset()
                    }
                    ;
                    t.prototype.trackFormConversion = function() {
                        if (!this.timeLastTrackingRequest) {
                            this.sendUpdate([], {
                                fa_co: 1
                            });
                            return
                        }
                        var A = (v.getCurrentTime() - this.timeLastTrackingRequest) / 1000;
                        if (A < 2) {
                            var B = this;
                            setTimeout(function() {
                                B.sendUpdate([], {
                                    fa_co: 1
                                })
                            }, 800)
                        } else {
                            this.sendUpdate([], {
                                fa_co: 1
                            })
                        }
                    }
                    ;
                    t.prototype.shouldBeTracked = function() {
                        return !!this.fields && !!this.fields.length
                    }
                    ;
                    t.prototype.trackInitialFormView = function() {
                        if (!this.initialFormViewLoggedWithTrackers || !this.initialFormViewLoggedWithTrackers.length) {
                            this.initialFormViewLoggedWithTrackers = g.getPiwikTrackers();
                            this.sendUpdate([], {
                                fa_fv: "1"
                            })
                        }
                    }
                    ;
                    t.prototype.setEngagedWithForm = function(A) {
                        this.lastFieldEngagementDate = v.getCurrentTime();
                        if (!this.firstFieldEngagementDate) {
                            this.firstFieldEngagementDate = this.lastFieldEngagementDate
                        }
                    }
                    ;
                    t.prototype.trackFieldUpdate = function(A) {
                        if (v.indexOfArray(this.fieldsWithUpdates, A) === -1) {
                            this.fieldsWithUpdates.push(A)
                        }
                        this.scheduleSendUpdate()
                    }
                    ;
                    t.prototype.scheduleSendUpdate = function() {
                        if (this.trackingTimeout) {
                            clearTimeout(this.trackingTimeout);
                            this.trackingTimeout = null
                        }
                        var A = this;
                        this.trackingTimeout = setTimeout(function() {
                            var B = A.fieldsWithUpdates;
                            A.fieldsWithUpdates = [];
                            A.sendUpdate(B)
                        }, u)
                    }
                    ;
                    t.prototype.sendUpdate = function(D, G, F) {
                        if (!this.shouldBeTracked()) {
                            return
                        }
                        if (this.trackingTimeout) {
                            clearTimeout(this.trackingTimeout);
                            this.trackingTimeout = null
                        }
                        if (!D) {
                            D = []
                        }
                        var A = [];
                        for (var C = 0; C < D.length; C++) {
                            A.push(D[C].getTrackingParams())
                        }
                        var E = {
                            fa_vid: this.formViewId,
                            fa_id: this.formId,
                            fa_name: this.formName
                        };
                        if (this.entryFieldName) {
                            E.fa_ef = this.entryFieldName
                        }
                        if (this.exitFieldName) {
                            E.fa_lf = this.exitFieldName
                        }
                        if (A.length) {
                            E.fa_fields = Piwik.JSON.stringify(A)
                        }
                        if (this.firstFieldEngagementDate) {
                            if (!this.formStartTracked) {
                                E.fa_st = "1";
                                this.formStartTracked = true
                            }
                            if (!this.hesitationTimeTracked) {
                                E.fa_ht = this.firstFieldEngagementDate - this.detectionDate - this.timeOffWindowBeforeEngagement;
                                this.hesitationTimeTracked = true
                            }
                            if (this.lastFieldEngagementDate && this.timeLastTrackingRequest) {
                                E.fa_ts = this.lastFieldEngagementDate - this.timeLastTrackingRequest;
                                if (E.fa_ts < 0) {
                                    E.fa_ts = 0
                                }
                            } else {
                                if (this.lastFieldEngagementDate && !this.timeLastTrackingRequest) {
                                    E.fa_ts = this.lastFieldEngagementDate - this.firstFieldEngagementDate - this.timeOffWindowSinceEngagement;
                                    if (E.fa_ts < 0) {
                                        E.fa_ts = 0
                                    }
                                }
                            }
                            this.timeLastTrackingRequest = v.getCurrentTime()
                        }
                        if (G) {
                            for (var B in G) {
                                if (Object.prototype.hasOwnProperty.call(G, B)) {
                                    E[B] = G[B]
                                }
                            }
                        }
                        if ("undefined" === typeof F) {
                            F = false
                        }
                        g.trackParams(E, F)
                    }
                    ;
                    t.prototype.scanForFields = function() {
                        var D, C = 0, G, F, B;
                        F = c.findAllFieldElements(this.node);
                        for (D = 0; D < F.length; D++) {
                            if (!F[D]) {
                                continue
                            }
                            if (this.fields && this.fields.length && this.fields.length > 2500) {
                                continue
                            }
                            B = F[D];
                            if (c.isIgnored(B) || v.indexOfArray(this.fieldNodes, B) > -1) {
                                continue
                            }
                            var A = c.getTagName(B);
                            var E = c.getAttribute(B, "type");
                            if (v.indexOfArray(p, E) !== -1) {
                                continue
                            } else {
                                if ("button" === A) {
                                    continue
                                }
                            }
                            if (A === "input" && !E) {
                                E = "text"
                            }
                            var H = c.getAttribute(B, "data-matomo-name");
                            if (!H) {
                                H = c.getAttribute(B, "data-piwik-name");
                                if (!H) {
                                    H = c.getAttribute(B, "name");
                                    if (!H) {
                                        H = c.getAttribute(B, "id");
                                        if (!H) {
                                            continue
                                        }
                                    }
                                }
                            }
                            this.fieldNodes.push(B);
                            var I = false;
                            for (C = 0; C < this.fields.length; C++) {
                                if (this.fields[C] && this.fields[C].fieldName === H) {
                                    I = true;
                                    this.fields[C].addNode(B);
                                    break
                                }
                            }
                            if (!I) {
                                G = new w(this,F[D],A,E,H);
                                this.addFormField(G)
                            }
                        }
                    }
                    ;
                    t.prototype.addFormField = function(A) {
                        this.fields.push(A)
                    }
                    ;
                    function w(E, D, C, B, F) {
                        this.discoveredDate = v.getCurrentTime();
                        this.tracker = E;
                        this.timespent = 0;
                        this.hesitationtime = 0;
                        this.nodes = [];
                        this.tagName = C;
                        this.fieldName = F;
                        this.fieldType = B;
                        this.startFocus = null;
                        this.timeLastChange = null;
                        this.numChanges = 0;
                        this.numFocus = 0;
                        this.numDeletes = 0;
                        this.numCursor = 0;
                        this.canCountChange = true;
                        this.isFocusedCausedAuto = c.hasNodeAttribute(D, "autofocus");
                        if (this.tagName === "select") {
                            this.category = y
                        } else {
                            if (this.tagName === "textarea") {
                                this.category = h
                            } else {
                                if (v.indexOfArray(b, this.fieldType) !== -1) {
                                    this.category = j
                                } else {
                                    if (v.indexOfArray(a, this.fieldType) !== -1) {
                                        this.category = y
                                    } else {
                                        this.category = h
                                    }
                                }
                            }
                        }
                        this.addNode(D);
                        var A = (D === document.activeElement);
                        if (A) {
                            this.onFocus()
                        }
                    }
                    w.prototype.addNode = function(B) {
                        this.nodes.push(B);
                        function A(E, C, G) {
                            if (E && "object" === typeof tinymce && "function" === typeof tinymce.get && c.getTagName(E) === "textarea" && c.getAttribute(E, "id")) {
                                var F = c.getAttribute(E, "id");
                                var D = tinymce.get(F);
                                if (D) {
                                    D.on(C, G);
                                    return
                                }
                            } else {
                                if (E && "function" === typeof jQuery && c.getTagName(E) === "select" && c.hasClass(E, "select2-hidden-accessible") && E.nextSibling) {
                                    if (C === "focus") {
                                        C = "select2:open"
                                    } else {
                                        if (C === "blur") {
                                            C = "select2:close"
                                        }
                                    }
                                    jQuery(E).on(C, G);
                                    return
                                }
                            }
                            Piwik.DOM.addEventListener(E, C, G)
                        }
                        A(B, "focus", (function(C) {
                            return function(D) {
                                if (C.isAutoFocus()) {
                                    e("field autofocus " + C.fieldName)
                                } else {
                                    e("field focus " + C.fieldName)
                                }
                                C.onFocus()
                            }
                        }
                        )(this));
                        A(B, "blur", (function(C) {
                            return function() {
                                e("field blur " + C.fieldName);
                                C.onBlur()
                            }
                        }
                        )(this));
                        if (this.category === h) {
                            A(B, "keyup", (function(C) {
                                return function(F) {
                                    var E = F.which || F.keyCode;
                                    var D = [9, 16, 17, 18, 20, 27, 91];
                                    if ((E && v.indexOfArray(D, E) !== -1) || F.isCtrlKey) {
                                        return
                                    }
                                    if (E >= 37 && E <= 40) {
                                        if (!C.isBlank()) {
                                            C.numCursor++;
                                            C.tracker.trackFieldUpdate(C)
                                        }
                                        return
                                    }
                                    if (E == 8 || E == 46) {
                                        if (!C.isBlank()) {
                                            C.numDeletes++;
                                            C.tracker.trackFieldUpdate(C)
                                        }
                                        return
                                    }
                                    e("field text keyup " + C.fieldName);
                                    C.onChange()
                                }
                            }
                            )(this));
                            A(B, "paste", (function(C) {
                                return function() {
                                    e("field text paste " + C.fieldName);
                                    C.onChange()
                                }
                            }
                            )(this))
                        } else {
                            A(B, "change", (function(C) {
                                return function() {
                                    e("field change " + C.fieldName);
                                    C.onChange()
                                }
                            }
                            )(this))
                        }
                    }
                    ;
                    w.prototype.resetOnFormSubmit = function() {
                        this.hesitationtime = 0;
                        this.timespent = 0;
                        this.numFocus = 0;
                        this.numDeletes = 0;
                        this.numCursor = 0;
                        this.numChanges = 0;
                        this.startFocus = null;
                        this.timeLastChange = null;
                        this.canCountChange = true;
                        this.hasChangedValueSinceFocus = false;
                        this.isFocusedCausedAuto = false
                    }
                    ;
                    w.prototype.isAutoFocus = function() {
                        if (!this.isFocusedCausedAuto) {
                            return false
                        }
                        if (this.tracker.entryFieldName && this.tracker.entryFieldName !== this.fieldName) {
                            this.isFocusedCausedAuto = false
                        }
                        if (this.tracker.exitFieldName && this.tracker.exitFieldName !== this.fieldName) {
                            this.isFocusedCausedAuto = false
                        }
                        return this.isFocusedCausedAuto
                    }
                    ;
                    w.prototype.getTrackingParams = function() {
                        return {
                            fa_fts: this.getTimeSpent(),
                            fa_fht: this.getHesitationTime(),
                            fa_fb: this.isBlank(),
                            fa_fn: this.fieldName,
                            fa_fch: this.numChanges,
                            fa_ff: this.numFocus,
                            fa_fd: this.numDeletes,
                            fa_fcu: this.numCursor,
                            fa_ft: this.fieldType || this.tagName,
                            fa_fs: this.getFieldSize()
                        }
                    }
                    ;
                    w.prototype.isBlank = function() {
                        if (this.category === j) {
                            for (var A = 0; A < this.nodes.length; A++) {
                                if (this.nodes[A] && this.nodes[A].checked) {
                                    return false
                                }
                            }
                            return true
                        }
                        if (!this.nodes[0]) {
                            return false
                        }
                        var B = this.nodes[0];
                        if ("undefined" === typeof B.value) {
                            return true
                        }
                        var C = B.value;
                        if (null === C || false === C || "" === C) {
                            return true
                        }
                        return String(C).length === 0
                    }
                    ;
                    w.prototype.getFieldSize = function() {
                        if (this.category === h) {
                            if (this.nodes[0] && this.nodes[0].value) {
                                return String(this.nodes[0].value).length
                            } else {
                                return 0
                            }
                        } else {
                            return -1
                        }
                    }
                    ;
                    w.prototype.getTimeSpent = function() {
                        if (this.numChanges && !this.timeSpent) {
                            this.timeSpent = 1
                        }
                        if (!this.startFocus || this.isAutoFocus()) {
                            return this.timespent
                        }
                        if (this.timeLastChange) {
                            var A = this.timeLastChange - this.startFocus;
                            if (A < 0) {
                                A = 0
                            }
                            return this.timespent + A
                        }
                        return this.timespent + v.getCurrentTime() - this.startFocus
                    }
                    ;
                    w.prototype.getHesitationTime = function() {
                        if (this.numChanges || !this.startFocus || this.isAutoFocus()) {
                            return this.hesitationtime
                        }
                        var A = v.getCurrentTime();
                        return this.hesitationtime + (A - this.startFocus)
                    }
                    ;
                    w.prototype.onFocus = function() {
                        this.startFocus = v.getCurrentTime();
                        var A = this.fieldName !== this.tracker.lastFocusedFieldName;
                        if (A && this.tracker.lastFocusedFieldName) {
                            this.isFocusedCausedAuto = false
                        }
                        this.timeLastChange = null;
                        this.hasChangedValueSinceFocus = false;
                        this.tracker.lastFocusedFieldName = this.fieldName;
                        if (A) {
                            this.canCountChange = true
                        }
                        if (A && !this.isAutoFocus()) {
                            this.numFocus++;
                            this.tracker.setEngagedWithForm();
                            this.tracker.trackFieldUpdate(this);
                            this.tracker.exitFieldName = this.fieldName;
                            this.tracker.scheduleSendUpdate()
                        }
                    }
                    ;
                    w.prototype.onBlur = function() {
                        if (!this.startFocus) {
                            return
                        }
                        if (this.hasChangedValueSinceFocus) {
                            if (this.timeLastChange && this.startFocus) {
                                this.timespent += (this.timeLastChange - this.startFocus)
                            }
                            this.timeLastChange = null;
                            this.startFocus = null;
                            return
                        }
                        if (!this.isAutoFocus()) {
                            var A = v.getCurrentTime();
                            this.timespent += A - this.startFocus;
                            if (!this.numChanges) {
                                this.hesitationtime += A - this.startFocus
                            }
                            this.tracker.setEngagedWithForm();
                            this.tracker.trackFieldUpdate(this)
                        }
                        this.startFocus = null
                    }
                    ;
                    w.prototype.onChange = function() {
                        this.timeLastChange = v.getCurrentTime();
                        if (this.isAutoFocus()) {
                            this.startFocus = this.timeLastChange
                        } else {
                            if (!this.startFocus) {
                                return
                            }
                        }
                        this.isFocusedCausedAuto = false;
                        this.hasChangedValueSinceFocus = true;
                        if (!this.numChanges) {
                            this.hesitationtime += this.timeLastChange - this.startFocus
                        }
                        if (this.canCountChange) {
                            this.numChanges++;
                            this.canCountChange = false
                        }
                        if (!this.tracker.entryFieldName) {
                            this.tracker.entryFieldName = this.fieldName
                        }
                        this.tracker.setEngagedWithForm();
                        this.tracker.trackFieldUpdate(this)
                    }
                    ;
                    function x(C, A) {
                        if (!r) {
                            return
                        }
                        if (!document.querySelectorAll) {
                            return
                        }
                        var B;
                        if (C && C.formTrackerInstance) {
                            B = C.formTrackerInstance;
                            B.scanForFields()
                        } else {
                            if (!c.isIgnored(C)) {
                                B = new t(C);
                                B.scanForFields();
                                z.push(B);
                                C.formTrackerInstance = B
                            }
                        }
                        if (A && B && B.shouldBeTracked()) {
                            B.trackInitialFormView()
                        }
                        return B
                    }
                    function d(C) {
                        if ("undefined" === typeof C) {
                            C = document
                        }
                        var A = c.findAllFormElements(C);
                        for (var B = 0; B < A.length; B++) {
                            x(A[B], true)
                        }
                    }
                    function i() {
                        Piwik.DOM.onReady(function() {
                            var A = g.getPiwikTrackers();
                            if (!A || !v.isArray(A) || !A.length) {
                                return
                            }
                            d(document)
                        });
                        Piwik.DOM.onLoad(function() {
                            var A = g.getPiwikTrackers();
                            if (!A || !v.isArray(A) || !A.length) {
                                return
                            }
                            d(document)
                        })
                    }
                    function m(A) {
                        if ("undefined" !== typeof A.FormAnalytics) {
                            return
                        }
                        A.FormAnalytics = {
                            enabled: true,
                            enable: function() {
                                this.enabled = true
                            },
                            disable: function() {
                                this.enabled = false
                            },
                            isEnabled: function() {
                                return r && this.enabled
                            }
                        }
                    }
                    function s() {
                        if ("object" === typeof window && "object" === typeof window.Piwik && "object" === typeof window.Piwik.FormAnalytics) {
                            return
                        }
                        if ("object" === typeof window && !window.Piwik) {
                            return
                        }
                        Piwik.FormAnalytics = {
                            element: c,
                            utils: v,
                            tracking: g,
                            FormField: w,
                            FormTracker: t,
                            disableFormAnalytics: function() {
                                r = false
                            },
                            enableFormAnalytics: function() {
                                r = true
                            },
                            isFormAnalyticsEnabled: function() {
                                return r
                            },
                            setMatomoTrackers: function(A) {
                                this.setPiwikTrackers(A)
                            },
                            setPiwikTrackers: function(A) {
                                if (A === null) {
                                    q = null;
                                    return
                                }
                                if (!v.isArray(A)) {
                                    A = [A]
                                }
                                q = A;
                                if (k) {
                                    i()
                                }
                            },
                            setTrackingTimer: function(A) {
                                if (A < 5) {
                                    throw new Error("Delay needs to be at least five")
                                }
                                u = parseInt(A, 10)
                            },
                            enableDebugMode: function() {
                                l = true
                            },
                            scanForForms: d,
                            trackFormSubmit: function(B) {
                                var A = c.findFormTrackerInstance(B);
                                if (A) {
                                    A.trackFormSubmit()
                                }
                            },
                            trackFormConversion: function(A, C) {
                                if ("string" === typeof A || "string" === typeof C) {
                                    g.trackParams({
                                        fa_vid: v.generateUniqueId(),
                                        fa_id: C,
                                        fa_name: A,
                                        fa_co: 1
                                    });
                                    return
                                }
                                var B = c.findFormTrackerInstance(A);
                                if (B) {
                                    B.trackFormConversion()
                                }
                            },
                            trackForm: function(A) {
                                return x(A, true)
                            },
                            setMaxNoOfFormRequestsAllowed: function(A) {
                                if (A == parseInt(A)) {
                                    o = A
                                }
                            }
                        };
                        Piwik.addPlugin("FormAnalytics", {
                            log: function(F) {
                                if (!r || !F || !F.tracker) {
                                    return ""
                                }
                                var C = F.tracker;
                                if (C.FormAnalytics && !C.FormAnalytics.isEnabled()) {
                                    return ""
                                }
                                var A = c.findAllFormElements(document);
                                var E = "";
                                for (var B = 0; B < A.length; B++) {
                                    var D = x(A[B], false);
                                    if (D && D.shouldBeTracked() && v.indexOfArray(D.initialFormViewLoggedWithTrackers, C) === -1) {
                                        D.initialFormViewLoggedWithTrackers.push(C);
                                        if (D.formViewId !== null) {
                                            E += "&fa_fp[" + B + "][fa_vid]=" + encodeURIComponent(D.formViewId)
                                        }
                                        if (D.formId !== null) {
                                            E += "&fa_fp[" + B + "][fa_id]=" + encodeURIComponent(D.formId)
                                        }
                                        if (D.formName !== null) {
                                            E += "&fa_fp[" + B + "][fa_name]=" + encodeURIComponent(D.formName)
                                        }
                                        E += "&fa_fp[" + B + "][fa_fv]=1"
                                    }
                                }
                                if (E) {
                                    e("sending request with pageview" + E);
                                    return "&fa_pv=1" + E
                                }
                                return ""
                            },
                            unload: function() {
                                var B;
                                for (var A = 0; A < z.length; A++) {
                                    B = z[A];
                                    if (B && B.trackingTimeout) {
                                        e("before unload");
                                        clearTimeout(B.trackingTimeout);
                                        B.sendUpdate(B.fieldsWithUpdates, {}, true)
                                    }
                                }
                            }
                        });
                        if (window.Piwik.initialized) {
                            Piwik.on("TrackerSetup", m);
                            Piwik.retryMissedPluginCalls();
                            f();
                            i();
                            Piwik.on("TrackerAdded", function() {
                                setTimeout(i, 700)
                            })
                        } else {
                            Piwik.on("TrackerSetup", m);
                            Piwik.on("MatomoInitialized", function() {
                                f();
                                i();
                                Piwik.on("TrackerAdded", function() {
                                    setTimeout(i, 700)
                                })
                            })
                        }
                    }
                    if ("object" === typeof window.Piwik) {
                        s()
                    } else {
                        if ("object" !== typeof window.matomoPluginAsyncInit) {
                            window.matomoPluginAsyncInit = []
                        }
                        window.matomoPluginAsyncInit.push(s)
                    }
                }
                )();
                /* END GENERATED: tracker.min.js */

                /* GENERATED: tracker.min.js */
                /*!!
 * Copyright (C) InnoCraft Ltd - All rights reserved.
 *
 * All information contained herein is, and remains the property of InnoCraft Ltd.
 *
 * @link https://www.innocraft.com/
 * @license For license details see https://www.innocraft.com/license
 */
                (function() {
                    var a = "original";
                    var p = false;
                    var k = true;
                    const m = "PiwikAbTesting";
                    const i = "MatomoAbTesting";
                    const e = 13;
                    window.matomoAbTestingCampaignUrlParamList = ["mtm_campaign", "matomo_campaign", "mtm_cpn", "pk_campaign", "piwik_campaign", "pk_cpn", "utm_campaign", "mtm_keyword", "matomo_kwd", "mtm_kwd", "pk_keyword", "piwik_kwd", "pk_kwd", "utm_term", "mtm_source", "pk_source", "utm_source", "mtm_medium", "pk_medium", "utm_medium", "mtm_content", "pk_content", "utm_content", "mtm_cid", "pk_cid", "utm_id", "mtm_clid", "mtm_group", "pk_group", "mtm_placement", "pk_placement"];
                    ;function o() {
                        if (p && "undefined" !== typeof console && console && console.debug) {
                            console.debug.apply(console, arguments)
                        }
                    }
                    function b(q) {
                        o(q);
                        if (typeof l !== "undefined" && l && l.THROW_ERRORS) {
                            throw new Error(q)
                        }
                    }
                    var j = {
                        isItpBrowser: function() {
                            return navigator.vendor && navigator.vendor.indexOf("Apple") > -1 && navigator.userAgent && navigator.userAgent.indexOf("CriOS") === -1 && navigator.userAgent.indexOf("FxiOS") === -1
                        },
                        getRandomNumber: function(r, q) {
                            return parseInt(Math.round(Math.random() * (q - r) + r, 10))
                        },
                        hasLocalStorage: function() {
                            if (typeof localStorage === "undefined") {
                                return false
                            }
                            var r = new Date();
                            var q;
                            try {
                                localStorage.setItem(r, r);
                                q = localStorage.getItem(r) == r;
                                localStorage.removeItem(r);
                                return q && localStorage && typeof JSON === "object" && typeof JSON.parse === "function"
                            } catch (s) {
                                return false
                            }
                        },
                        decodeSafe: function(r) {
                            try {
                                return window.decodeURIComponent(r)
                            } catch (q) {
                                return window.unescape(r)
                            }
                        },
                        getQueryParameter: function(q, u) {
                            q = ("" + q).toLowerCase();
                            u = ("" + u).toLowerCase();
                            var t = new RegExp("[?&]" + u + "(=([^&#]*)|&|#|$)","i");
                            var s = t.exec(q);
                            if (!s) {
                                return null
                            }
                            if (!s[2]) {
                                return ""
                            }
                            var r = s[2].replace(/\+/g, " ");
                            return this.decodeSafe(r)
                        },
                        removeQueryAndHashFromUrl: function(r) {
                            var q = r.indexOf("#");
                            if (q !== -1) {
                                r = r.substr(0, q)
                            }
                            var s = r.indexOf("?");
                            if (s !== -1) {
                                r = r.substr(0, s)
                            }
                            return r
                        },
                        removeProtocol: function(r) {
                            var q = ("" + r).indexOf("://");
                            if (q !== -1 && q < 9) {
                                return r.substr(q)
                            }
                            return r
                        },
                        removeWwwSubdomain: function(q) {
                            return ("" + q).replace("://www.", "://")
                        },
                        getVariationTest: function(q) {
                            if (q && q.search) {
                                var r = j.getQueryParameter(q.search, "pk_ab_test");
                                if (r) {
                                    o("requested variation test " + r);
                                    return String(r).split(",")
                                }
                            }
                            return []
                        },
                        getQueryParamDelimiter: function(q) {
                            if (q && (q.indexOf("?") !== -1)) {
                                return "&"
                            }
                            return "?"
                        },
                        appendCampaignUrlParamsIfPresent: function(s, t) {
                            if (typeof window.matomoAbTestingCampaignUrlParamList === "undefined") {
                                return t
                            }
                            for (var u = 0; u < window.matomoAbTestingCampaignUrlParamList.length; u++) {
                                const w = window.matomoAbTestingCampaignUrlParamList[u];
                                const q = j.getQueryParameter(s.search, w);
                                if (q && !j.getQueryParameter(t, w)) {
                                    t += j.getQueryParamDelimiter(t) + w + "=" + q
                                }
                            }
                            const r = j.getQueryParameter(s.search, "utm_content");
                            const v = j.getQueryParameter(s.search, "utm_id");
                            if (r && !j.getQueryParameter(t, "utm_content")) {
                                t += j.getQueryParamDelimiter(t) + "utm_content=" + r
                            }
                            if (v && !j.getQueryParameter(t, "utm_id")) {
                                t += j.getQueryParamDelimiter(t) + "utm_id=" + v
                            }
                            return t
                        },
                        appendAllUrlParamsIfPresent: function(q, r) {
                            if (q.search) {
                                var s = q.search.substr(1);
                                if (s) {
                                    r += j.getQueryParamDelimiter(r) + s
                                }
                            }
                            return r
                        },
                        getNewExpirationTime: function() {
                            var q = new Date();
                            return new Date(q.getFullYear(),q.getMonth() + e,q.getDate()).getTime()
                        }
                    };
                    var d = {
                        local: function() {
                            var x = localStorage.getItem(m) || "{}";
                            if (x && x !== "{}") {
                                localStorage.removeItem(m)
                            }
                            if (!x || x === "{}") {
                                x = localStorage.getItem(i) || "{}"
                            }
                            var r = new Date();
                            var w = r.getTime();
                            var q = new Date(r.getFullYear(),r.getMonth() + e,r.getDate());
                            var t = q.getTime();
                            var v = JSON.parse(x) || {};
                            for (var s in v) {
                                var u = v[s];
                                if (typeof u === "string") {
                                    v[s] = {
                                        value: u,
                                        expire: t
                                    }
                                }
                                if (w >= v[s]["expire"]) {
                                    delete v[s]
                                }
                            }
                            if (v && Object.keys(v).length === 0) {
                                localStorage.removeItem(i)
                            }
                            if (v && Object.keys(v).length > 0) {
                                localStorage.setItem(i, JSON.stringify(v))
                            }
                            this.set = function(A, y, z) {
                                y = A + ":" + y;
                                v[y] = {
                                    value: z,
                                    expire: j.getNewExpirationTime()
                                };
                                localStorage.setItem(i, JSON.stringify(v))
                            }
                            ;
                            this.get = function(z, y) {
                                y = z + ":" + y;
                                if (v && y in v) {
                                    return v[y]["value"]
                                }
                            }
                            ;
                            this.clearAll = function() {
                                v = {};
                                localStorage.setItem(i, JSON.stringify({}))
                            }
                        },
                        cookies: function() {
                            this.set = function(u, s, t) {
                                s = i + ":" + u + ":" + s;
                                var r = new Date();
                                r.setTime(j.getNewExpirationTime());
                                var q = "; expires=" + r.toGMTString();
                                document.cookie = s + "=" + encodeURIComponent(t) + "; expires=" + q + "; path=/;SameSite=Lax"
                            }
                            ;
                            this.get = function(s, r) {
                                r = i + ":" + s + ":" + r;
                                var t = r + "=";
                                var v = document.cookie.split(";");
                                for (var q = 0; q < v.length; q++) {
                                    var u = v[q];
                                    u = ("" + u).replace(/^\s+/, "");
                                    if (u.indexOf(t) == 0) {
                                        return decodeURIComponent(u.substring(t.length, u.length))
                                    }
                                }
                            }
                            ;
                            this.clearAll = function() {}
                        }
                    };
                    var f = {
                        location: window.location,
                        matchesTarget: function(q) {
                            if (!q || !q.type || !q.attribute) {
                                return true
                            }
                            var r = f._getValueForAttribute(q);
                            return f._matchesAttribute(q, r)
                        },
                        matchesTargets: function(u, s) {
                            if (s && s.length) {
                                var q;
                                for (var r = 0; r < s.length; r++) {
                                    q = s[r];
                                    if (this.matchesTarget(q)) {
                                        return false
                                    }
                                }
                            }
                            if (u && u.length) {
                                var t;
                                for (var r = 0; r < u.length; r++) {
                                    t = u[r];
                                    if (this.matchesTarget(t)) {
                                        return true
                                    }
                                }
                                return false
                            }
                            return true
                        },
                        matchesDate: function(s, r, t) {
                            var u = s.getTime() + (s.getTimezoneOffset() * 60000);
                            try {
                                var w = new Date(r)
                            } catch (v) {
                                if (r) {
                                    b("Invalid startDateTime given")
                                }
                            }
                            try {
                                var q = new Date(t)
                            } catch (v) {
                                if (t) {
                                    b("Invalid startDateTime given")
                                }
                            }
                            if (r && isNaN && isNaN(w.getTime())) {
                                b("Invalid startDateTime given")
                            }
                            if (t && isNaN && isNaN(q.getTime())) {
                                b("Invalid endDateTime given")
                            }
                            if (r && u < (w.getTime() + (w.getTimezoneOffset() * 60000))) {
                                return false
                            }
                            if (t && u > (q.getTime() + (q.getTimezoneOffset() * 60000))) {
                                return false
                            }
                            return true
                        },
                        _getValueForAttribute: function(r) {
                            var q = ("" + r.attribute).toLowerCase();
                            switch (q) {
                            case l.TARGET_ATTRIBUTE_URL:
                                return j.decodeSafe(this.location.href);
                            case l.TARGET_ATTRIBUTE_PATH:
                                return j.decodeSafe(this.location.pathname);
                            case l.TARGET_ATTRIBUTE_URLPARAM:
                                return j.getQueryParameter(this.location.search, r.value)
                            }
                        },
                        _matchesAttribute: function(s, q) {
                            var r = ("" + s.attribute).toLowerCase();
                            switch (r) {
                            case l.TARGET_ATTRIBUTE_URL:
                            case l.TARGET_ATTRIBUTE_PATH:
                                return this._matchesTargetValue(q, s.type, s.inverted, s.value);
                            case l.TARGET_ATTRIBUTE_URLPARAM:
                                return this._matchesTargetValue(q, s.type, s.inverted, s.value2);
                            default:
                                b("Invalid target attribute")
                            }
                            return false
                        },
                        _matchesTargetValue: function(s, r, u, q) {
                            var t = false;
                            var u = !!u && u !== "0";
                            if ("string" === typeof s) {
                                s = s.toLowerCase()
                            }
                            if ("string" === typeof q && r !== "regexp") {
                                q = q.toLowerCase()
                            }
                            switch (r) {
                            case l.TARGET_TYPE_ANY:
                                t = true;
                                break;
                            case l.TARGET_TYPE_EXISTS:
                                if (typeof s !== "undefined" && s !== null) {
                                    t = true
                                }
                                break;
                            case l.TARGET_TYPE_EQUALS_SIMPLE:
                                if (s && s === String(q)) {
                                    t = true
                                }
                                s = j.removeQueryAndHashFromUrl(s);
                                s = j.removeProtocol(s);
                                q = j.removeProtocol(q);
                                s = j.removeWwwSubdomain(s);
                                q = j.removeWwwSubdomain(q);
                                if (s && (s === String(q) || s + "/" === String(q) || s === "/" + q || s === q + "/" || s === "/" + q + "/")) {
                                    t = true
                                }
                                break;
                            case l.TARGET_TYPE_EQUALS_EXACTLY:
                                if (s && s === String(q)) {
                                    t = true
                                }
                                if (s && s.indexOf("://") > 0 && s.charAt(s.length - 1) === "/" && 3 === (s.split("/").length - 1) && s === (q + "/")) {
                                    t = true
                                }
                                if (q && q.indexOf("://") > 0 && q.charAt(q.length - 1) === "/" && 3 === (q.split("/").length - 1) && q === (s + "/")) {
                                    t = true
                                }
                                break;
                            case l.TARGET_TYPE_CONTAINS:
                                if (s && s.indexOf(String(q)) !== -1) {
                                    t = true
                                }
                                break;
                            case l.TARGET_TYPE_STARTS_WITH:
                                if (s && s.indexOf(String(q)) === 0) {
                                    t = true
                                }
                                break;
                            case l.TARGET_TYPE_REGEXP:
                                if (new RegExp(q).test(s)) {
                                    t = true
                                }
                                break;
                            default:
                                b("Invalid target type given")
                            }
                            if (u) {
                                return !t
                            }
                            return t
                        }
                    };
                    var l = function(r) {
                        this.options = r ? r : {};
                        o("creating experiment with options", r);
                        if (!this.options.name) {
                            b('Missing experiment name in options. Use eg: new PiwikAbTesting.Experiment({name: "MyName"})')
                        }
                        if (!this.options.variations) {
                            b('Missing "variations" option. Use eg: new PiwikAbTesting.Experiment({variations: [{...}, {...}]})')
                        }
                        if (typeof this.options.variations !== "object" || !this.options.variations.length) {
                            b('"variations" has to be an array')
                        }
                        var s;
                        for (s = 0; s < this.options.variations.length; s++) {
                            if (typeof this.options.variations[s] !== "object") {
                                b("Each variation has to be an object")
                            }
                            if (!this.options.variations[s].name) {
                                b("Missing variation name")
                            }
                            if (typeof this.options.variations[s].activate !== "function") {
                                b('A variation does not implement the "activate" method' + JSON.stringify(r))
                            }
                        }
                        if (this.options.trigger && typeof this.options.trigger !== "function") {
                            b('The "trigger" option is not a function')
                        }
                        if (this.options.matomoTracker && !this.options.piwikTracker) {
                            this.options.piwikTracker = this.options.matomoTracker
                        }
                        if (this.options.piwikTracker) {
                            if (typeof this.options.piwikTracker !== "object") {
                                b("The Matomo tracker must be an instance of Piwik")
                            }
                            if (!this.options.piwikTracker.trackEvent) {
                                b("The Matomo instance does not implement the trackEvent method. Maybe a wrong Matomo instance is based as option?")
                            }
                            if (!this.options.piwikTracker.trackGoal) {
                                b("The Matomo instance does not implement the trackGoal method. Maybe a wrong Matomo instance is based as option?")
                            }
                        }
                        if (this.options.percentage && this.options.percentage < 0 || this.options.percentage > 100) {
                            b("percentage has to be between 0 and 100")
                        }
                        this.name = null;
                        this.variations = null;
                        this.includedTargets = null;
                        this.excludedTargets = null;
                        this.startDateTime = null;
                        this.endDateTime = null;
                        this.percentage = 100;
                        this.piwikTracker = null;
                        this.trigger = function() {
                            return true
                        }
                        ;
                        this._cacheForcedVariationName = null;
                        if (j.hasLocalStorage()) {
                            o("using local storage");
                            this.storage = new d.local()
                        } else {
                            o("using cookies storage");
                            this.storage = new d.cookies()
                        }
                        var q;
                        for (q in this.options) {
                            if (Object.prototype.hasOwnProperty.call(this.options, q)) {
                                this[q] = this.options[q]
                            }
                        }
                        this._track = function(w, v) {
                            if (this.piwikTracker) {
                                this.piwikTracker[w].apply(this.piwikTracker, v)
                            } else {
                                if (typeof window._paq === "undefined") {
                                    window._paq = []
                                }
                                v.unshift(w);
                                window._paq.push(v)
                            }
                            o("sent tracking request", w, v)
                        }
                        ;
                        this.trackUsedVariation = function(v) {
                            this._track("trackEvent", ["abtesting", this.name, v])
                        }
                        ;
                        this.trackGoal = function(v) {
                            if (v) {
                                this._track("trackGoal", [v])
                            }
                        }
                        ;
                        this._getVariationByName = function(w) {
                            w = ("" + w).toLowerCase();
                            for (var v = 0; v < this.variations.length; v++) {
                                if (("" + this.variations[v].name).toLowerCase() === w) {
                                    return this.variations[v]
                                }
                            }
                        }
                        ;
                        this._makeEvent = function(w) {
                            var v = this;
                            var x = function(y) {
                                y()
                            };
                            if ("undefined" !== typeof Piwik && "undefined" !== typeof Piwik.DOM && Piwik.DOM.onReady) {
                                x = Piwik.DOM.onReady
                            }
                            return {
                                type: "activate",
                                experiment: this,
                                onReady: x,
                                redirect: function(z) {
                                    var y = "pk_abe=" + encodeURIComponent(v.name) + "&pk_abv=" + encodeURIComponent(w.name);
                                    z += j.getQueryParamDelimiter(z) + y;
                                    if (v.options.forwardAllQueryParams) {
                                        z = j.appendAllUrlParamsIfPresent(window.location, z)
                                    } else {
                                        if (v.options.forwardUtmParams) {
                                            z = j.appendCampaignUrlParamsIfPresent(window.location, z)
                                        }
                                    }
                                    var B = Piwik.getAsyncTrackers();
                                    for (var A = 0; A < B.length; A++) {
                                        B[A].trackPageView = function() {}
                                        ;
                                        B[A].trackEvent = function() {}
                                        ;
                                        B[A].trackGoal = function() {}
                                    }
                                    if (window.location.href === z) {
                                        return
                                    }
                                    window.location.replace(z)
                                }
                            }
                        }
                        ;
                        this.forceVariation = function(y) {
                            this._cacheForcedVariationName = y;
                            o(this.name, "forcing variation", y);
                            var w = this._getVariationByName(y);
                            var v = this.storage.set("variation", this.name, y);
                            if (w && w.activate) {
                                var x = this._makeEvent(w);
                                w.activate.apply(w, [x])
                            }
                            this.trackUsedVariation(y);
                            return v
                        }
                        ;
                        this.getActivatedVariationName = function() {
                            var v;
                            if (this._cacheForcedVariationName) {
                                v = this._cacheForcedVariationName
                            } else {
                                v = this.storage.get("variation", this.name)
                            }
                            if (this._getVariationByName(v)) {
                                return v
                            }
                        }
                        ;
                        this._doVariationsIncludeOriginal = function() {
                            for (var w = 0; w < this.variations.length; w++) {
                                var v = this.variations[w];
                                if (v && v.name && v.name === a) {
                                    return true
                                }
                            }
                            return false
                        }
                        ;
                        this._getVariationDefaultPercentage = function() {
                            var w = 100;
                            var z = this.variations.length;
                            for (var y = 0; y < this.variations.length; y++) {
                                var x = this.variations[y];
                                if (x && (x.percentage || x.percentage === 0 || x.percentage === "0")) {
                                    w = w - parseInt(x.percentage, 10);
                                    z--
                                }
                            }
                            var v = Math.round(w / z);
                            if (v > 100) {
                                v = 100
                            }
                            if (v < 0) {
                                v = 0
                            }
                            return v
                        }
                        ;
                        this.getRandomVariationName = function() {
                            var B = this._getVariationDefaultPercentage();
                            var y = [];
                            for (var z = 0; z < this.variations.length; z++) {
                                var v = B;
                                if (this.variations[z].percentage || this.variations[z].percentage === 0 || this.variations[z].percentage === "0") {
                                    v = this.variations[z].percentage
                                }
                                for (var x = 0; x < v; x++) {
                                    y.push(z)
                                }
                            }
                            var w = j.getRandomNumber(0, y.length - 1);
                            var A = y[w];
                            return this.variations[A].name
                        }
                        ;
                        this._isInTestGroup = function() {
                            var v = this.storage.get("isInTestGroup", this.name);
                            if (typeof v !== "undefined" && v !== null) {
                                return v === "1" ? true : false
                            }
                            v = j.getRandomNumber(1, 100) <= this.percentage;
                            this.storage.set("isInTestGroup", this.name, v ? "1" : "0");
                            return v
                        }
                        ;
                        this.selectRandomVariation = function() {
                            o(this.name, "select random variation");
                            var v = this.getRandomVariationName();
                            this.forceVariation(v);
                            return v
                        }
                        ;
                        this.shouldTrigger = function() {
                            if (!k) {
                                o(this.name, "wont run because feature is disabled");
                                return false
                            }
                            if (!f.matchesDate(new Date(), this.startDateTime, this.endDateTime)) {
                                o(this.name, "wont run, scheduled date does not match");
                                return false
                            }
                            if (!f.matchesTargets(this.includedTargets, this.excludedTargets)) {
                                o(this.name, "wont run, targets do not match");
                                return false
                            }
                            if (!this.trigger()) {
                                o(this.name, "wont run, disabled by trigger method");
                                return false
                            }
                            if (!this._isInTestGroup()) {
                                o(this.name, "wont run, not in test group");
                                return false
                            }
                            return true
                        }
                        ;
                        if (!this._doVariationsIncludeOriginal()) {
                            this.variations.push({
                                name: a,
                                activate: function() {}
                            })
                        }
                        var t = j.getVariationTest(window.location || null);
                        if (t && t.length) {
                            for (var s = 0; s < t.length; s++) {
                                if (this._getVariationByName(t[s])) {
                                    o("going to test variation and disable tracking " + t[s]);
                                    this.trackUsedVariation = function() {}
                                    ;
                                    this.forceVariation(t[s]);
                                    return
                                }
                            }
                        }
                        if (!this.shouldTrigger()) {
                            o(this.name, "experiment should not trigger");
                            return
                        }
                        o(this.name, "should trigger");
                        var u = this.getActivatedVariationName();
                        if (u) {
                            this.forceVariation(u)
                        } else {
                            o(this.name, "no existing variation found");
                            this.selectRandomVariation()
                        }
                    };
                    l.NAME_ORIGINAL_VARIATION = a;
                    l.TARGET_ATTRIBUTE_URL = "url";
                    l.TARGET_ATTRIBUTE_PATH = "path";
                    l.TARGET_ATTRIBUTE_URLPARAM = "urlparam";
                    l.TARGET_TYPE_ANY = "any";
                    l.TARGET_TYPE_EXISTS = "exists";
                    l.TARGET_TYPE_EQUALS_SIMPLE = "equals_simple";
                    l.TARGET_TYPE_EQUALS_EXACTLY = "equals_exactly";
                    l.TARGET_TYPE_CONTAINS = "contains";
                    l.TARGET_TYPE_STARTS_WITH = "starts_with";
                    l.TARGET_TYPE_REGEXP = "regexp";
                    l.THROW_ERRORS = true;
                    function g() {
                        if (typeof window === "object" && "function" === typeof window.piwikAbTestingAsyncInit) {
                            window.piwikAbTestingAsyncInit()
                        }
                        if (typeof window === "object" && "function" === typeof window.matomoAbTestingAsyncInit) {
                            window.matomoAbTestingAsyncInit()
                        }
                    }
                    var c = false;
                    function h() {
                        function q() {
                            if (c) {
                                return
                            }
                            if ("object" !== typeof Piwik) {
                                return
                            }
                            var t = Piwik.getAsyncTrackers();
                            if (!t || !t.length) {
                                return
                            }
                            if (window.location && j.getQueryParameter(window.location.search, "pk_abe")) {
                                c = true;
                                var s = j.getQueryParameter(window.location.search, "pk_abe");
                                var r = j.getQueryParameter(window.location.search, "pk_abv");
                                Piwik.AbTesting.enter({
                                    experiment: s,
                                    variation: r
                                });
                                o("entered experiment from url parameters")
                            }
                        }
                        Piwik.DOM.onReady(q);
                        Piwik.DOM.onLoad(q)
                    }
                    function n() {
                        if ("object" === typeof window && "object" === typeof window.Piwik && "object" === typeof window.Piwik.AbTesting) {
                            o("wont initialize, AbTesting already loaded");
                            return
                        }
                        if ("object" === typeof window && "object" !== typeof window.Piwik) {
                            o("wont initialize, Matomo is not yet loaded");
                            return
                        }
                        Piwik.AbTesting = {
                            utils: j,
                            target: f,
                            storage: d,
                            Experiment: l,
                            disableWhenItp: function() {
                                if (j.isItpBrowser()) {
                                    this.disable();
                                    o("disabled because itp browser")
                                }
                            },
                            isEnabled: function() {
                                return k
                            },
                            disable: function() {
                                k = false
                            },
                            enable: function() {
                                k = true
                            },
                            enter: function(q) {
                                if (q && q.experiment) {
                                    window._paq = window._paq || [];
                                    window._paq.push(["trackEvent", "abtesting", q.experiment, q.variation || a]);
                                    o("entering user into an experiment", q)
                                } else {
                                    o("not entering user into an experiment, missing parameter experiment")
                                }
                            },
                            create: function(q) {
                                return new l(q)
                            },
                            enableDebugMode: function() {
                                p = true
                            }
                        };
                        if (window.Piwik.initialized) {
                            Piwik.retryMissedPluginCalls();
                            g();
                            h()
                        } else {
                            Piwik.on("MatomoInitialized", function() {
                                g();
                                h()
                            })
                        }
                        if (j.isItpBrowser() && j.hasLocalStorage()) {
                            new d.local()
                        }
                    }
                    if (typeof piwikExposeAbTestingTarget !== "undefined" && piwikExposeAbTestingTarget) {
                        window.piwikAbTestingTarget = f
                    }
                    if ("object" === typeof window.Piwik) {
                        o("matomo was already loaded, initializing abTesting now");
                        n()
                    } else {
                        if ("object" !== typeof window.matomoPluginAsyncInit) {
                            window.matomoPluginAsyncInit = []
                        }
                        window.matomoPluginAsyncInit.push(n);
                        o("matomo not loaded yet, waiting for it to be loaded")
                    }
                }
                )();
                /* END GENERATED: tracker.min.js */

                (function() {
                    function b() {
                        if ("object" !== typeof _paq) {
                            return false
                        }
                        var c = typeof _paq.length;
                        if ("undefined" === c) {
                            return false
                        }
                        return !!_paq.length
                    }
                    if (window && "object" === typeof window.matomoPluginAsyncInit && window.matomoPluginAsyncInit.length) {
                        var a = 0;
                        for (a; a < window.matomoPluginAsyncInit.length; a++) {
                            if (typeof window.matomoPluginAsyncInit[a] === "function") {
                                window.matomoPluginAsyncInit[a]()
                            }
                        }
                    }
                    if (window && window.piwikAsyncInit) {
                        window.piwikAsyncInit()
                    }
                    if (window && window.matomoAsyncInit) {
                        window.matomoAsyncInit()
                    }
                    if (!window.Matomo.getAsyncTrackers().length) {
                        if (b()) {
                            window.Matomo.addTracker()
                        } else {
                            _paq = {
                                push: function(c) {
                                    var d = typeof console;
                                    if (d !== "undefined" && console && console.error) {
                                        console.error("_paq.push() was used but Matomo tracker was not initialized before the matomo.js file was loaded. Make sure to configure the tracker via _paq.push before loading matomo.js. Alternatively, you can create a tracker via Matomo.addTracker() manually and then use _paq.push but it may not fully work as tracker methods may not be executed in the correct order.", c)
                                    }
                                }
                            }
                        }
                    }
                    window.Matomo.trigger("MatomoInitialized", []);
                    window.Matomo.initialized = true
                }());
                (function() {
                    var a = (typeof window.AnalyticsTracker);
                    if (a === "undefined") {
                        window.AnalyticsTracker = window.Matomo
                    }
                }());
                if (typeof window.piwik_log !== "function") {
                    window.piwik_log = function(c, e, g, f) {
                        function b(h) {
                            try {
                                if (window["piwik_" + h]) {
                                    return window["piwik_" + h]
                                }
                            } catch (i) {}
                            return
                        }
                        var d, a = window.Matomo.getTracker(g, e);
                        a.setDocumentTitle(c);
                        a.setCustomData(f);
                        d = b("tracker_pause");
                        if (d) {
                            a.setLinkTrackingTimer(d)
                        }
                        d = b("download_extensions");
                        if (d) {
                            a.setDownloadExtensions(d)
                        }
                        d = b("hosts_alias");
                        if (d) {
                            a.setDomains(d)
                        }
                        d = b("ignore_classes");
                        if (d) {
                            a.setIgnoreClasses(d)
                        }
                        a.trackPageView();
                        if (b("install_tracker")) {
                            piwik_track = function(i, j, k, h) {
                                a.setSiteId(j);
                                a.setTrackerUrl(k);
                                a.trackLink(i, h)
                            }
                            ;
                            a.enableLinkTracking()
                        }
                    }
                }
                /*!! @license-end */
                ;libAvailable = typeof window.Piwik !== 'undefined' || typeof window.Matomo !== 'undefined';
                libLoaded = libAvailable;
            }
            function loadTracker(url, jsEndpoint) {
                if (checkLoadedAlready()) {
                    return;
                }
                if (!libLoaded) {
                    libLoaded = true;
                    var d = document
                      , g = d.createElement('script')
                      , s = d.getElementsByTagName('script')[0];
                    g.async = true;
                    g.src = url + jsEndpoint;
                    s.parentNode.insertBefore(g, s);
                }
            }
            var configuredTrackers = {};
            return function(parameters, TagManager) {
                var lastUserId;
                var lastIdSite;
                var lastMatomoUrl;
                function getMatomoUrlFromConfig(matomoConfig) {
                    var matomoUrl = matomoConfig.matomoUrl;
                    if (matomoUrl && String(matomoUrl).substr(-1, 1) !== '/') {
                        matomoUrl += '/';
                    }
                    return matomoUrl;
                }
                function setCustomDimensions(tracker, customDimensions, isBuildObject=false) {
                    if (!tracker) {
                        return;
                    }
                    if (!customDimensions || !TagManager.utils.isArray(customDimensions) || customDimensions.length === 0) {
                        return;
                    }
                    const dimensionsObject = {};
                    var dimIndex;
                    for (dimIndex = 0; dimIndex < customDimensions.length; dimIndex++) {
                        const dimension = customDimensions[dimIndex];
                        if (!dimension || !TagManager.utils.isObject(dimension) || !dimension.index) {
                            continue;
                        }
                        if (!(dimension.value || dimension.value === null)) {
                            continue;
                        }
                        if (isBuildObject) {
                            const dimensionIndex = 'dimension' + dimension.index;
                            dimensionsObject[dimensionIndex] = dimension.value;
                            continue;
                        }
                        tracker.setCustomDimension(dimension.index, dimension.value);
                    }
                    return dimensionsObject;
                }
                this.fire = function() {
                    callbacks.push(function() {
                        if (!parameters.matomoConfig || !parameters.matomoConfig.name) {
                            return;
                        }
                        var variableName = parameters.matomoConfig.name;
                        var matomoConfig = parameters.get('matomoConfig', {});
                        var trackingEndpoint = matomoConfig.trackingEndpoint == 'custom' ? matomoConfig.trackingEndpointCustom : matomoConfig.trackingEndpoint;
                        var tracker;
                        if (variableName in configuredTrackers) {
                            tracker = configuredTrackers[variableName];
                        } else {
                            lastIdSite = matomoConfig.idSite;
                            lastMatomoUrl = getMatomoUrlFromConfig(matomoConfig);
                            var trackerUrl = lastMatomoUrl + trackingEndpoint;
                            if (matomoConfig.registerAsDefaultTracker) {
                                tracker = Piwik.addTracker(trackerUrl, matomoConfig.idSite);
                            } else {
                                tracker = Piwik.getTracker(trackerUrl, matomoConfig.idSite);
                            }
                            configuredTrackers[variableName] = tracker;
                            if (matomoConfig.requireCookieConsent) {
                                tracker.requireCookieConsent();
                            }
                            if (matomoConfig.disableBrowserFeatureDetection && typeof tracker.disableBrowserFeatureDetection === 'function') {
                                tracker.disableBrowserFeatureDetection();
                            }
                            if (matomoConfig.disableCampaignParameters) {
                                tracker.disableCampaignParameters();
                            }
                            if (matomoConfig.disableCookies) {
                                tracker.disableCookies();
                            }
                            if (matomoConfig.enableCrossDomainLinking) {
                                tracker.enableCrossDomainLinking();
                                tracker.setCrossDomainLinkingTimeout(matomoConfig.crossDomainLinkingTimeout);
                            }
                            if (matomoConfig.cookieSameSite) {
                                tracker.setCookieSameSite(matomoConfig.cookieSameSite);
                            }
                            if (matomoConfig.customCookieTimeOutEnable) {
                                tracker.setVisitorCookieTimeout(matomoConfig.customCookieTimeOut * 86400);
                                tracker.setReferralCookieTimeout(matomoConfig.referralCookieTimeOut * 86400);
                                tracker.setSessionCookieTimeout(matomoConfig.sessionCookieTimeOut * 60);
                            }
                            if (matomoConfig.setSecureCookie) {
                                tracker.setSecureCookie(true);
                            }
                            if (matomoConfig.cookiePath) {
                                tracker.setCookiePath(matomoConfig.cookiePath);
                            }
                            if (matomoConfig.cookieNamePrefix) {
                                tracker.setCookieNamePrefix(matomoConfig.cookieNamePrefix);
                            }
                            if (matomoConfig.cookieDomain) {
                                tracker.setCookieDomain(matomoConfig.cookieDomain);
                            }
                            if (matomoConfig.domains && TagManager.utils.isArray(matomoConfig.domains) && matomoConfig.domains.length) {
                                var domains = [];
                                var k, domainType;
                                for (k = 0; k < matomoConfig.domains.length; k++) {
                                    var domainType = typeof matomoConfig.domains[k];
                                    if (domainType === 'string') {
                                        domains.push(matomoConfig.domains[k]);
                                    } else if (domainType === 'object' && matomoConfig.domains[k].domain) {
                                        domains.push(matomoConfig.domains[k].domain);
                                    }
                                }
                                tracker.setDomains(domains);
                            }
                            if (matomoConfig.alwaysUseSendBeacon) {
                                tracker.alwaysUseSendBeacon();
                            }
                            if (matomoConfig.disableAlwaysUseSendBeacon) {
                                tracker.disableAlwaysUseSendBeacon();
                            }
                            if (matomoConfig.forceRequestMethod) {
                                tracker.setRequestMethod(matomoConfig.requestMethod);
                                if (matomoConfig.requestMethod.toUpperCase() === 'POST') {
                                    tracker.setRequestContentType(matomoConfig.requestContentType);
                                }
                            }
                            if (matomoConfig.enableLinkTracking) {
                                tracker.enableLinkTracking();
                            }
                            if (matomoConfig.enableFileTracking) {
                                tracker.enableFileTracking();
                            }
                            if (matomoConfig.requireConsent) {
                                tracker.requireConsent();
                            }
                            if (matomoConfig.enableDoNotTrack) {
                                tracker.setDoNotTrack(1);
                            }
                            if (matomoConfig.disablePerformanceTracking) {
                                tracker.disablePerformanceTracking();
                            }
                            if (typeof matomoConfig.appendToTrackingUrl === 'string' && matomoConfig.appendToTrackingUrl.length > 0) {
                                tracker.appendToTrackingUrl(matomoConfig.appendToTrackingUrl);
                            }
                            if (typeof matomoConfig.customRequestProcessing === 'function' && matomoConfig.customRequestProcessing.length >= 1) {
                                tracker.setCustomRequestProcessing(matomoConfig.customRequestProcessing);
                            }
                            if (matomoConfig.enableJSErrorTracking) {
                                tracker.enableJSErrorTracking();
                            }
                            if (matomoConfig.enableHeartBeatTimer) {
                                tracker.enableHeartBeatTimer(matomoConfig.heartBeatTime);
                            }
                            if (matomoConfig.trackAllContentImpressions) {
                                tracker.trackAllContentImpressions();
                            }
                            if (matomoConfig.trackVisibleContentImpressions) {
                                tracker.trackVisibleContentImpressions();
                            }
                            if (matomoConfig.trackBots) {
                                tracker.appendToTrackingUrl('bots=1');
                            }
                            if (matomoConfig.hasOwnProperty('enableFormAnalytics') && !matomoConfig.enableFormAnalytics && window.Matomo && window.Matomo.FormAnalytics && typeof window.Matomo.FormAnalytics.disableFormAnalytics === 'function') {
                                window.Matomo.FormAnalytics.disableFormAnalytics();
                            }
                            if (matomoConfig.hasOwnProperty('enableMediaAnalytics') && !matomoConfig.enableMediaAnalytics && window.Matomo && window.Matomo.MediaAnalytics && typeof window.Matomo.MediaAnalytics.disableMediaAnalytics === 'function') {
                                window.Matomo.MediaAnalytics.disableMediaAnalytics();
                            }
                        }
                        if ((matomoConfig.userId || tracker.getUserId()) && lastUserId !== matomoConfig.userId) {
                            tracker.setUserId(matomoConfig.userId);
                            lastUserId = matomoConfig.userId;
                        }
                        if (matomoConfig.idSite && lastIdSite !== matomoConfig.idSite) {
                            tracker.setSiteId(matomoConfig.idSite);
                            lastIdSite = matomoConfig.idSite;
                        }
                        var possiblyUpdatedMatomoUrl = getMatomoUrlFromConfig(matomoConfig);
                        if (possiblyUpdatedMatomoUrl && lastMatomoUrl !== possiblyUpdatedMatomoUrl) {
                            tracker.setTrackerUrl(possiblyUpdatedMatomoUrl + trackingEndpoint);
                            lastIdSite = possiblyUpdatedMatomoUrl;
                        }
                        const tagCustomDimensions = parameters.get('customDimensions');
                        setCustomDimensions(tracker, matomoConfig.customDimensions);
                        const areCustomDimensionsSticky = parameters.get('areCustomDimensionsSticky');
                        const dimensionsObject = setCustomDimensions(tracker, tagCustomDimensions, !areCustomDimensionsSticky);
                        if (tracker) {
                            var trackingType = parameters.get('trackingType');
                            if (trackingType === 'pageview') {
                                var customTitle = parameters.get('documentTitle');
                                if (customTitle) {
                                    tracker.setDocumentTitle(customTitle);
                                }
                                var customUrl = parameters.get('customUrl');
                                if (customUrl) {
                                    tracker.setCustomUrl(customUrl);
                                }
                                if (parameters.get('isEcommerceView')) {
                                    tracker.setEcommerceView(parameters.get('productSKU'), parameters.get('productName'), parameters.get('categoryName'), parameters.get('price'));
                                }
                                tracker.trackPageView(customTitle, dimensionsObject);
                            } else if (trackingType === 'event') {
                                tracker.trackEvent(parameters.get('eventCategory'), parameters.get('eventAction'), parameters.get('eventName'), parameters.get('eventValue'), dimensionsObject);
                            } else if (trackingType === 'goal') {
                                tracker.trackGoal(parameters.get('idGoal'), parameters.get('goalCustomRevenue'), dimensionsObject);
                            }
                            if (matomoConfig.customData && matomoConfig.customData.length && matomoConfig.customData[0].name && matomoConfig.customData[0].value) {
                                tracker.setCustomData(matomoConfig.customData[0].name, matomoConfig.customData[0].value);
                            }
                            if (matomoConfig.setDownloadExtensions) {
                                tracker.setDownloadExtensions(matomoConfig.setDownloadExtensions.split(','));
                            }
                            if (matomoConfig.addDownloadExtensions) {
                                tracker.addDownloadExtensions(matomoConfig.addDownloadExtensions.split(','));
                            }
                            if (matomoConfig.removeDownloadExtensions) {
                                tracker.removeDownloadExtensions(matomoConfig.removeDownloadExtensions.split(','));
                            }
                            if (matomoConfig.setIgnoreClasses) {
                                tracker.setIgnoreClasses(matomoConfig.setIgnoreClasses.split(','));
                            }
                            if (matomoConfig.setReferrerUrl) {
                                tracker.setReferrerUrl(matomoConfig.setReferrerUrl);
                            }
                            if (matomoConfig.setAPIUrl) {
                                tracker.setAPIUrl(matomoConfig.setAPIUrl);
                            }
                            if (matomoConfig.setPageViewId) {
                                tracker.setPageViewId(matomoConfig.setPageViewId);
                            }
                            if (matomoConfig.setExcludedReferrers) {
                                tracker.setExcludedReferrers(matomoConfig.setExcludedReferrers.split(','));
                            }
                            if (matomoConfig.setDownloadClasses) {
                                tracker.setDownloadClasses(matomoConfig.setDownloadClasses.split(','));
                            }
                            if (matomoConfig.setLinkClasses) {
                                tracker.setLinkClasses(matomoConfig.setLinkClasses.split(','));
                            }
                            if (matomoConfig.setCampaignNameKey) {
                                tracker.setCampaignNameKey(matomoConfig.setCampaignNameKey);
                            }
                            if (matomoConfig.setCampaignKeywordKey) {
                                tracker.setCampaignKeywordKey(matomoConfig.setCampaignKeywordKey);
                            }
                            if (matomoConfig.setConsentGiven) {
                                tracker.setConsentGiven();
                            }
                            if (matomoConfig.rememberConsentGiven) {
                                if (matomoConfig.rememberConsentGivenForHours) {
                                    tracker.rememberConsentGiven(matomoConfig.rememberConsentGivenForHours);
                                } else {
                                    tracker.rememberConsentGiven();
                                }
                            }
                            if (matomoConfig.forgetConsentGiven) {
                                tracker.forgetConsentGiven();
                            }
                            if (matomoConfig.discardHashTag) {
                                tracker.discardHashTag(true);
                            }
                            if (matomoConfig.setExcludedQueryParams) {
                                tracker.setExcludedQueryParams(matomoConfig.setExcludedQueryParams.split(','));
                            }
                            if (matomoConfig.setConversionAttributionFirstReferrer) {
                                tracker.setConversionAttributionFirstReferrer(true);
                            }
                            if (matomoConfig.setDoNotTrack) {
                                tracker.setDoNotTrack(true);
                            }
                            if (matomoConfig.setLinkTrackingTimer) {
                                tracker.setLinkTrackingTimer(matomoConfig.setLinkTrackingTimer);
                            }
                            if (matomoConfig.killFrame) {
                                tracker.killFrame();
                            }
                            if (matomoConfig.setCountPreRendered) {
                                tracker.setCountPreRendered(true);
                            }
                            if (matomoConfig.setRequestQueueInterval) {
                                tracker.setRequestQueueInterval(matomoConfig.setRequestQueueInterval);
                            }
                        }
                    });
                    var matomoConfig = parameters.get('matomoConfig', {});
                    if (matomoConfig.bundleTracker) {
                        loadMatomo();
                    }
                    if (!matomoConfig.matomoUrl || !matomoConfig.idSite) {
                        return;
                    }
                    var matomoUrl = getMatomoUrlFromConfig(matomoConfig);
                    var jsEndpoint = matomoConfig.jsEndpoint == 'custom' ? matomoConfig.jsEndpointCustom : matomoConfig.jsEndpoint;
                    loadTracker(matomoUrl, jsEndpoint);
                }
                ;
            }
            ;
        }
        )();
        Templates['MatomoConfigurationVariable'] = (function() {
            return function(parameters, TagManager) {
                this.get = function() {
                    var config = {};
                    for (var i in parameters) {
                        if (i === 'document' || i === 'window' || i === 'container' || i === 'variable' || TagManager.utils.isFunction(parameters[i])) {
                            continue;
                        }
                        if (TagManager.utils.hasProperty(parameters, i)) {
                            config[i] = parameters.get(i);
                        }
                    }
                    return config;
                }
                ;
                this.toString = function() {
                    return '';
                }
                ;
            }
            ;
        }
        )();
        Templates['UrlVariable'] = (function() {
            return function(parameters, TagManager) {
                this.get = function() {
                    var urlPart = parameters.get('urlPart', 'href');
                    var loc = parameters.window.location;
                    return TagManager.url.parseUrl(loc.href, urlPart);
                }
                ;
            }
            ;
        }
        )();
        Templates['CustomHtmlTag'] = (function() {
            /*!
    * secure-filters from https://github.com/salesforce/secure-filters/blob/master/lib/secure-filters.js
    * license: BSD-3-Clause https://github.com/salesforce/secure-filters/blob/master/LICENSE.txt
    * */
            function convertControlCharacters(str) {
                return String(str).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ');
            }
            ;var secureFilters = {};
            secureFilters.css = function(val) {
                var str = String(val);
                str = convertControlCharacters(str);
                return str.replace(/[^a-zA-Z0-9\uD800-\uDFFF]/g, function(match) {
                    var code = match.charCodeAt(0);
                    if (code === 0) {
                        return '\\fffd ';
                    } else {
                        var hex = code.toString(16).toLowerCase();
                        return '\\' + hex + ' ';
                    }
                });
            }
            ;
            secureFilters.html = function(val) {
                var str = String(val);
                str = convertControlCharacters(str);
                return str.replace(/[^\t\n\v\f\r ,\.0-9A-Z_a-z\-\u00A0-\uFFFF]/g, function(match) {
                    var code = match.charCodeAt(0);
                    switch (code) {
                    case 0x22:
                        return '&quot;';
                    case 0x26:
                        return '&amp;';
                    case 0x3C:
                        return '&lt;';
                    case 0x3E:
                        return '&gt;';
                    default:
                        if (code < 100) {
                            var dec = code.toString(10);
                            return '&#' + dec + ';';
                        } else {
                            var hex = code.toString(16).toUpperCase();
                            return '&#x' + hex + ';';
                        }
                    }
                });
            }
            ;
            secureFilters.style = function(val) {
                return secureFilters.html(secureFilters.css(val));
            }
            ;
            secureFilters.uri = function(val) {
                var QUOT = /\x22/g;
                var APOS = /\x27/g;
                var AST = /\*/g;
                var TILDE = /~/g;
                var BANG = /!/g;
                var LPAREN = /\(/g;
                var RPAREN = /\)/g;
                var encode = encodeURI(String(val));
                return encode.replace(BANG, '%21').replace(QUOT, '%27').replace(APOS, '%27').replace(LPAREN, '%28').replace(RPAREN, '%29').replace(AST, '%2A').replace(TILDE, '%7E');
            }
            ;
            /*! end secure filters */
            return function(parameters, TagManager) {
                function moveChildrenToArray(element) {
                    var children = [];
                    var j = 0;
                    while (j in element.childNodes && element.childNodes.length) {
                        children.push(element.removeChild(element.childNodes[j]));
                    }
                    return children;
                }
                function cloneScript(element) {
                    var newScript = parameters.document.createElement('script');
                    var src = TagManager.dom.getElementAttribute(element, 'src');
                    if (src) {
                        newScript.setAttribute('src', src);
                    } else {
                        newScript.text = element.text || element.textContent || element.innerHTML || '';
                    }
                    if (element.hasAttribute('id')) {
                        newScript.setAttribute('id', element.getAttribute('id'));
                    }
                    if (element.hasAttribute('charset')) {
                        newScript.setAttribute('charset', element.getAttribute('charset'));
                    }
                    if (element.hasAttribute('defer')) {
                        newScript.setAttribute('defer', element.getAttribute('defer'));
                    }
                    if (element.hasAttribute('async')) {
                        newScript.setAttribute('async', element.getAttribute('async'));
                    }
                    if (element.hasAttribute('onload')) {
                        newScript.setAttribute('onload', element.getAttribute('onload'));
                    }
                    if (element.hasAttribute('type')) {
                        newScript.setAttribute('type', element.getAttribute('type'));
                    }
                    var scriptWithNonce = TagManager.dom.bySelector('script[nonce]');
                    if (scriptWithNonce.length && scriptWithNonce[0]) {
                        scriptWithNonce = scriptWithNonce[0];
                        var nonceAttr = TagManager.dom.getElementAttribute(scriptWithNonce, 'nonce');
                        nonceAttr = nonceAttr ? nonceAttr : scriptWithNonce.nonce;
                        newScript.setAttribute('nonce', nonceAttr);
                    }
                    return newScript;
                }
                function isJavaScriptElement(element) {
                    if (element && element.nodeName && element.nodeName.toLowerCase() === 'script') {
                        var type = TagManager.dom.getElementAttribute(element, 'type');
                        if (!type || String(type).toLowerCase() === 'text/javascript') {
                            return true;
                        }
                    }
                    return false;
                }
                function doChildrenContainJavaScript(element) {
                    return element && element.innerHTML && element.innerHTML.toLowerCase().indexOf("<script") !== -1;
                }
                function insertNode(parent, child, append, previousElement) {
                    if (append || !parent.firstChild) {
                        return parent.appendChild(child);
                    } else {
                        if (previousElement) {
                            return previousElement.parentNode.insertBefore(child, previousElement.nextSibling);
                        }
                        return parent.insertBefore(child, parent.firstChild);
                    }
                }
                function moveNodes(parent, children, append) {
                    var limit = 5000;
                    var counter = 0;
                    var child;
                    var previousElement = null;
                    while (counter in children && children[counter] && counter < limit) {
                        child = children[counter];
                        counter++;
                        if (isJavaScriptElement(child)) {
                            previousElement = insertNode(parent, cloneScript(child), append, previousElement);
                        } else if (doChildrenContainJavaScript(child)) {
                            var subChildren = moveChildrenToArray(child);
                            previousElement = insertNode(parent, child, append, previousElement);
                            moveNodes(child, subChildren);
                        } else {
                            previousElement = insertNode(parent, child, append, previousElement);
                        }
                    }
                }
                this.fire = function() {
                    var html = parameters.customHtml;
                    if (html && html.type === 'JoinedVariable') {
                        var variables = html.getDefinition();
                        var value = '', varReturn, theVarValue, isVariable, hasValueSet;
                        for (var i = 0; i < variables.length; i++) {
                            varReturn = parameters.buildVariable(variables[i]);
                            isVariable = TagManager.utils.isObject(variables[i]);
                            theVarValue = varReturn.get();
                            hasValueSet = theVarValue !== false && theVarValue !== null && TagManager.utils.isDefined(theVarValue);
                            if (isVariable) {
                                if (TagManager.dom.isElementContext(value, 'script')) {
                                    if (!TagManager.utils.isDefined(TagManager.customHtmlDataStore)) {
                                        TagManager.customHtmlDataStore = [];
                                    }
                                    TagManager.customHtmlDataStore.push(theVarValue);
                                    value += 'window.MatomoTagManager.customHtmlDataStore[' + (TagManager.customHtmlDataStore.length - 1) + ']';
                                } else if (TagManager.dom.isElementContext(value, 'style') || TagManager.dom.isAttributeContext(value, 'style')) {
                                    if (hasValueSet) {
                                        value += secureFilters.css(theVarValue);
                                    } else {
                                        value += 'mTmKpwoqM';
                                    }
                                } else if (TagManager.dom.isAttributeContext(value, 'href') || TagManager.dom.isAttributeContext(value, 'src')) {
                                    if (hasValueSet) {
                                        value += secureFilters.uri(theVarValue);
                                    }
                                } else if (hasValueSet) {
                                    value += secureFilters.html(theVarValue);
                                }
                            } else if (hasValueSet) {
                                value += theVarValue;
                            }
                        }
                        html = value;
                    } else {
                        html = html.get();
                    }
                    if (html) {
                        var div = parameters.document.createElement('div');
                        div.innerHTML = html;
                        if (div.childNodes) {
                            var children = moveChildrenToArray(div);
                            var htmlPosition = parameters.get('htmlPosition', 'bodyEnd');
                            var append = true;
                            if (htmlPosition === 'headStart' || htmlPosition === 'bodyStart') {
                                append = false;
                            }
                            if (htmlPosition === 'headStart' || htmlPosition === 'headEnd') {
                                moveNodes(parameters.document.head, children, append);
                            } else if (parameters.document.body) {
                                moveNodes(parameters.document.body, children, append);
                            } else {
                                TagManager.dom.onReady(function() {
                                    moveNodes(parameters.document.body, children, append);
                                });
                            }
                        }
                    }
                }
                ;
            }
            ;
        }
        )();
        Templates['CustomEventTrigger'] = (function() {
            return function(parameters, TagManager) {
                function isMatchingEvent(value) {
                    var eventName = parameters.get('eventName');
                    return eventName && TagManager.utils.isObject(value) && 'event'in value && value.event === eventName;
                }
                var missedEvents = [];
                var index = parameters.container.dataLayer.on(function(value) {
                    if (isMatchingEvent(value)) {
                        missedEvents.push(value.event);
                    }
                });
                this.setUp = function(triggerEvent) {
                    parameters.container.dataLayer.off(index);
                    for (var i = 0; i < missedEvents.length; i++) {
                        triggerEvent({
                            event: 'mtm.CustomEvent',
                            'mtm.customEventMatch': missedEvents[i]
                        });
                    }
                    parameters.container.dataLayer.on(function(value) {
                        if (isMatchingEvent(value)) {
                            triggerEvent({
                                event: 'mtm.CustomEvent',
                                'mtm.customEventMatch': value.event
                            });
                        }
                    });
                }
                ;
            }
            ;
        }
        )();
        Templates['PageViewTrigger'] = (function() {
            return function(parameters, TagManager) {
                this.setUp = function(triggerEvent) {
                    triggerEvent({
                        event: 'mtm.PageView'
                    });
                }
                ;
            }
            ;
        }
        )();
        Templates['DataLayerVariable'] = (function() {
            return function(parameters, TagManager) {
                this.get = function() {
                    var dataLayerName = parameters.get('dataLayerName');
                    if (dataLayerName && parameters.container) {
                        return parameters.container.dataLayer.get(dataLayerName);
                    }
                }
                ;
            }
            ;
        }
        )();
        window.MatomoTagManager.addContainer({
            "id": "TB6Sfh67",
            "isTagFireLimitAllowedInPreviewMode": 0,
            "idsite": 29,
            "versionName": "Add Hubspot Tracking code",
            "revision": 3,
            "environment": "live",
            "tags": [{
                "id": 1143,
                "type": "Matomo",
                "name": "aa8c6a41baa48c5a4f588a2ecdfbfba7",
                "parameters": {
                    "matomoConfig": {
                        "name": "Matomo Configuration",
                        "type": "MatomoConfiguration",
                        "lookUpTable": [],
                        "defaultValue": "",
                        "parameters": {
                            "matomoUrl": "https:\/\/vtech.matomo.cloud\/",
                            "idSite": {
                                "name": "matomo_site_id",
                                "type": "Url",
                                "lookUpTable": [{
                                    "matchValue": "www.vtechhotelphones.com",
                                    "outValue": "29",
                                    "comparison": "equals"
                                }, {
                                    "matchValue": "www.vtechhotelphones.com",
                                    "outValue": "30",
                                    "comparison": "not_equals"
                                }],
                                "defaultValue": "29",
                                "parameters": {
                                    "urlPart": "hostname"
                                },
                                "Variable": "UrlVariable"
                            },
                            "enableLinkTracking": true,
                            "enableFormAnalytics": true,
                            "enableMediaAnalytics": true,
                            "enableFileTracking": false,
                            "enableCrossDomainLinking": false,
                            "crossDomainLinkingTimeout": 180,
                            "enableDoNotTrack": false,
                            "disablePerformanceTracking": false,
                            "enableJSErrorTracking": false,
                            "enableHeartBeatTimer": false,
                            "heartBeatTime": 15,
                            "trackAllContentImpressions": false,
                            "trackVisibleContentImpressions": false,
                            "trackBots": false,
                            "disableCookies": true,
                            "requireConsent": false,
                            "requireCookieConsent": false,
                            "customCookieTimeOutEnable": false,
                            "customCookieTimeOut": 393,
                            "referralCookieTimeOut": 182,
                            "sessionCookieTimeOut": 30,
                            "setSecureCookie": true,
                            "cookieDomain": "",
                            "cookieNamePrefix": "_pk_",
                            "cookiePath": "",
                            "cookieSameSite": "Lax",
                            "disableBrowserFeatureDetection": false,
                            "disableCampaignParameters": false,
                            "domains": [],
                            "alwaysUseSendBeacon": false,
                            "disableAlwaysUseSendBeacon": false,
                            "userId": "",
                            "customDimensions": [],
                            "registerAsDefaultTracker": true,
                            "bundleTracker": true,
                            "jsEndpoint": "matomo.js",
                            "jsEndpointCustom": "custom.js",
                            "trackingEndpoint": "matomo.php",
                            "trackingEndpointCustom": "custom.php",
                            "appendToTrackingUrl": "",
                            "forceRequestMethod": false,
                            "requestMethod": "GET",
                            "requestContentType": "application\/x-www-form-urlencoded; charset=UTF-8",
                            "customRequestProcessing": "",
                            "customData": [],
                            "setDownloadExtensions": "",
                            "addDownloadExtensions": "",
                            "removeDownloadExtensions": "",
                            "setIgnoreClasses": "",
                            "setReferrerUrl": "",
                            "setApiUrl": "",
                            "setPageViewId": "",
                            "setExcludedReferrers": "",
                            "setDownloadClasses": "",
                            "setLinkClasses": "",
                            "setCampaignNameKey": "",
                            "setCampaignKeywordKey": "",
                            "setConsentGiven": false,
                            "rememberConsentGiven": false,
                            "rememberConsentGivenForHours": "",
                            "forgetConsentGiven": false,
                            "discardHashTag": false,
                            "setExcludedQueryParams": "",
                            "setConversionAttributionFirstReferrer": false,
                            "setDoNotTrack": false,
                            "setLinkTrackingTimer": "",
                            "killFrame": false,
                            "setCountPreRendered": false,
                            "setRequestQueueInterval": ""
                        },
                        "Variable": "MatomoConfigurationVariable"
                    },
                    "trackingType": "pageview",
                    "idGoal": "",
                    "goalCustomRevenue": "",
                    "documentTitle": "",
                    "customUrl": "",
                    "isEcommerceView": false,
                    "productSKU": "",
                    "productName": "",
                    "categoryName": "",
                    "price": "",
                    "eventCategory": "",
                    "eventAction": "",
                    "eventName": "",
                    "eventValue": "",
                    "customDimensions": [],
                    "areCustomDimensionsSticky": false
                },
                "blockTriggerIds": [],
                "fireTriggerIds": [1897],
                "fireLimit": "once_page",
                "fireDelay": 0,
                "startDate": null,
                "endDate": null,
                "Tag": "MatomoTag"
            }, {
                "id": 1144,
                "type": "CustomHtml",
                "name": "dd9e5bacb26f386fe4cf5911a6692fe3",
                "parameters": {
                    "customHtml": "<script>\n\twindow._paq = window._paq || [];\n\ttry{\n\t\t\/\/ opt-out from tracking\n\t\twindow._paq.push(['optUserOut']);\n\n\t\t\/\/ revoke tracking consent\n\t\twindow._paq.push(['forgetConsentGiven']);\n\n\t\t\/\/ revoke cookie consent\n\t\twindow._paq.push(['forgetCookieConsentGiven']);\n\t}\n\tcatch(e){}\n<\/script>",
                    "htmlPosition": "bodyEnd"
                },
                "blockTriggerIds": [],
                "fireTriggerIds": [1899],
                "fireLimit": "unlimited",
                "fireDelay": 0,
                "startDate": null,
                "endDate": null,
                "Tag": "CustomHtmlTag"
            }, {
                "id": 1145,
                "type": "CustomHtml",
                "name": "c3ffab313642de5459efa3c43a24383f",
                "parameters": {
                    "customHtml": "<script type=\"text\/javascript\">\n_linkedin_partner_id = \"2876956\";\nwindow._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];\nwindow._linkedin_data_partner_ids.push(_linkedin_partner_id);\n<\/script><script type=\"text\/javascript\">\n(function(){var s = document.getElementsByTagName(\"script\")[0];\nvar b = document.createElement(\"script\");\nb.type = \"text\/javascript\";b.async = true;\nb.src = \"https:\/\/snap.licdn.com\/li.lms-analytics\/insight.min.js\";\ns.parentNode.insertBefore(b, s);})();\n<\/script>\n<noscript>\n<img height=\"1\" width=\"1\" style=\"display:none;\" alt=\"\" src=\"https:\/\/px.ads.linkedin.com\/collect\/?pid=2876956&fmt=gif\" \/>\n<\/noscript>",
                    "htmlPosition": "bodyEnd"
                },
                "blockTriggerIds": [],
                "fireTriggerIds": [1900],
                "fireLimit": "unlimited",
                "fireDelay": 0,
                "startDate": null,
                "endDate": null,
                "Tag": "CustomHtmlTag"
            }, {
                "id": 1146,
                "type": "CustomHtml",
                "name": "d9781d9e138f02ebbebb090e71f39012",
                "parameters": {
                    "customHtml": "<script type=\"text\/javascript\" id=\"hs-script-loader\" async defer src=\"\/\/js.hs-scripts.com\/6657475.js\">",
                    "htmlPosition": "bodyEnd"
                },
                "blockTriggerIds": [],
                "fireTriggerIds": [1897],
                "fireLimit": "unlimited",
                "fireDelay": 0,
                "startDate": null,
                "endDate": null,
                "Tag": "CustomHtmlTag"
            }],
            "triggers": [{
                "id": 1892,
                "type": "CustomEvent",
                "name": "CustomEvent",
                "parameters": {
                    "eventName": "custom_evt_functional_revoked"
                },
                "conditions": [],
                "Trigger": "CustomEventTrigger"
            }, {
                "id": 1893,
                "type": "CustomEvent",
                "name": "CustomEvent",
                "parameters": {
                    "eventName": "custom_evt_video_accepted"
                },
                "conditions": [],
                "Trigger": "CustomEventTrigger"
            }, {
                "id": 1894,
                "type": "CustomEvent",
                "name": "CustomEvent",
                "parameters": {
                    "eventName": "custom_evt_video_revoked"
                },
                "conditions": [],
                "Trigger": "CustomEventTrigger"
            }, {
                "id": 1895,
                "type": "CustomEvent",
                "name": "CustomEvent",
                "parameters": {
                    "eventName": "custom_evt_sns_accepted"
                },
                "conditions": [],
                "Trigger": "CustomEventTrigger"
            }, {
                "id": 1896,
                "type": "CustomEvent",
                "name": "CustomEvent",
                "parameters": {
                    "eventName": "custom_evt_sns_revoked"
                },
                "conditions": [],
                "Trigger": "CustomEventTrigger"
            }, {
                "id": 1897,
                "type": "CustomEvent",
                "name": "CustomEvent",
                "parameters": {
                    "eventName": "custom_evt_analytics_accepted"
                },
                "conditions": [],
                "Trigger": "CustomEventTrigger"
            }, {
                "id": 1898,
                "type": "PageView",
                "name": "PageView",
                "parameters": [],
                "conditions": [],
                "Trigger": "PageViewTrigger"
            }, {
                "id": 1899,
                "type": "CustomEvent",
                "name": "CustomEvent",
                "parameters": {
                    "eventName": "custom_evt_analytics_revoked"
                },
                "conditions": [],
                "Trigger": "CustomEventTrigger"
            }, {
                "id": 1900,
                "type": "CustomEvent",
                "name": "CustomEvent",
                "parameters": {
                    "eventName": "custom_evt_functional_accepted"
                },
                "conditions": [],
                "Trigger": "CustomEventTrigger"
            }],
            "variables": [{
                "name": "Url",
                "type": "Url",
                "lookUpTable": [{
                    "matchValue": "www.vtechhotelphones.com",
                    "outValue": "29",
                    "comparison": "equals"
                }, {
                    "matchValue": "www.vtechhotelphones.com",
                    "outValue": "30",
                    "comparison": "not_equals"
                }],
                "defaultValue": "29",
                "parameters": {
                    "urlPart": "hostname"
                },
                "Variable": "UrlVariable"
            }, {
                "name": "MatomoConfiguration",
                "type": "MatomoConfiguration",
                "lookUpTable": [],
                "defaultValue": "",
                "parameters": {
                    "matomoUrl": "https:\/\/vtech.matomo.cloud\/",
                    "idSite": {
                        "name": "matomo_site_id",
                        "type": "Url",
                        "lookUpTable": [{
                            "matchValue": "www.vtechhotelphones.com",
                            "outValue": "29",
                            "comparison": "equals"
                        }, {
                            "matchValue": "www.vtechhotelphones.com",
                            "outValue": "30",
                            "comparison": "not_equals"
                        }],
                        "defaultValue": "29",
                        "parameters": {
                            "urlPart": "hostname"
                        },
                        "Variable": "UrlVariable"
                    },
                    "enableLinkTracking": true,
                    "enableFormAnalytics": true,
                    "enableMediaAnalytics": true,
                    "enableFileTracking": false,
                    "enableCrossDomainLinking": false,
                    "crossDomainLinkingTimeout": 180,
                    "enableDoNotTrack": false,
                    "disablePerformanceTracking": false,
                    "enableJSErrorTracking": false,
                    "enableHeartBeatTimer": false,
                    "heartBeatTime": 15,
                    "trackAllContentImpressions": false,
                    "trackVisibleContentImpressions": false,
                    "trackBots": false,
                    "disableCookies": true,
                    "requireConsent": false,
                    "requireCookieConsent": false,
                    "customCookieTimeOutEnable": false,
                    "customCookieTimeOut": 393,
                    "referralCookieTimeOut": 182,
                    "sessionCookieTimeOut": 30,
                    "setSecureCookie": true,
                    "cookieDomain": "",
                    "cookieNamePrefix": "_pk_",
                    "cookiePath": "",
                    "cookieSameSite": "Lax",
                    "disableBrowserFeatureDetection": false,
                    "disableCampaignParameters": false,
                    "domains": [],
                    "alwaysUseSendBeacon": false,
                    "disableAlwaysUseSendBeacon": false,
                    "userId": "",
                    "customDimensions": [],
                    "registerAsDefaultTracker": true,
                    "bundleTracker": true,
                    "jsEndpoint": "matomo.js",
                    "jsEndpointCustom": "custom.js",
                    "trackingEndpoint": "matomo.php",
                    "trackingEndpointCustom": "custom.php",
                    "appendToTrackingUrl": "",
                    "forceRequestMethod": false,
                    "requestMethod": "GET",
                    "requestContentType": "application\/x-www-form-urlencoded; charset=UTF-8",
                    "customRequestProcessing": "",
                    "customData": [],
                    "setDownloadExtensions": "",
                    "addDownloadExtensions": "",
                    "removeDownloadExtensions": "",
                    "setIgnoreClasses": "",
                    "setReferrerUrl": "",
                    "setApiUrl": "",
                    "setPageViewId": "",
                    "setExcludedReferrers": "",
                    "setDownloadClasses": "",
                    "setLinkClasses": "",
                    "setCampaignNameKey": "",
                    "setCampaignKeywordKey": "",
                    "setConsentGiven": false,
                    "rememberConsentGiven": false,
                    "rememberConsentGivenForHours": "",
                    "forgetConsentGiven": false,
                    "discardHashTag": false,
                    "setExcludedQueryParams": "",
                    "setConversionAttributionFirstReferrer": false,
                    "setDoNotTrack": false,
                    "setLinkTrackingTimer": "",
                    "killFrame": false,
                    "setCountPreRendered": false,
                    "setRequestQueueInterval": ""
                },
                "Variable": "MatomoConfigurationVariable"
            }, {
                "name": "DataLayer",
                "type": "DataLayer",
                "lookUpTable": [],
                "defaultValue": "",
                "parameters": {
                    "dataLayerName": "vtAction"
                },
                "Variable": "DataLayerVariable"
            }, {
                "name": "DataLayer",
                "type": "DataLayer",
                "lookUpTable": [],
                "defaultValue": "",
                "parameters": {
                    "dataLayerName": "vtCategory"
                },
                "Variable": "DataLayerVariable"
            }, {
                "name": "DataLayer",
                "type": "DataLayer",
                "lookUpTable": [],
                "defaultValue": "",
                "parameters": {
                    "dataLayerName": "vtLabel"
                },
                "Variable": "DataLayerVariable"
            }, {
                "name": "DataLayer",
                "type": "DataLayer",
                "lookUpTable": [],
                "defaultValue": "",
                "parameters": {
                    "dataLayerName": "vtEvent"
                },
                "Variable": "DataLayerVariable"
            }, {
                "name": "DataLayer",
                "type": "DataLayer",
                "lookUpTable": [],
                "defaultValue": "",
                "parameters": {
                    "dataLayerName": "vtSocial"
                },
                "Variable": "DataLayerVariable"
            }, {
                "name": "DataLayer",
                "type": "DataLayer",
                "lookUpTable": [],
                "defaultValue": "0",
                "parameters": {
                    "dataLayerName": "custom_dl_analytics_pref"
                },
                "Variable": "DataLayerVariable"
            }, {
                "name": "DataLayer",
                "type": "DataLayer",
                "lookUpTable": [],
                "defaultValue": "0",
                "parameters": {
                    "dataLayerName": "custom_dl_funtional_pref"
                },
                "Variable": "DataLayerVariable"
            }, {
                "name": "DataLayer",
                "type": "DataLayer",
                "lookUpTable": [],
                "defaultValue": "0",
                "parameters": {
                    "dataLayerName": "custom_dl_video_pref"
                },
                "Variable": "DataLayerVariable"
            }, {
                "name": "DataLayer",
                "type": "DataLayer",
                "lookUpTable": [],
                "defaultValue": "0",
                "parameters": {
                    "dataLayerName": "custom_dl_sns_pref"
                },
                "Variable": "DataLayerVariable"
            }]
        }, Templates);
    }
    )()
}
)();
//=======
(function() {
    'use strict';
    var n;
    function aa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    var p = typeof Object.defineProperties == "function" ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    ;
    function da(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("Cannot find global object");
    }
    var q = da(this);
    function r(a, b) {
        if (b)
            a: {
                var c = q;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var f = a[d];
                    if (!(f in c))
                        break a;
                    c = c[f]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && b != null && p(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    }
    r("Symbol", function(a) {
        function b(e) {
            if (this instanceof b)
                throw new TypeError("Symbol is not a constructor");
            return new c(d + (e || "") + "_" + f++,e)
        }
        function c(e, h) {
            this.g = e;
            p(this, "description", {
                configurable: !0,
                writable: !0,
                value: h
            })
        }
        if (a)
            return a;
        c.prototype.toString = function() {
            return this.g
        }
        ;
        var d = "jscomp_symbol_" + (Math.random() * 1E9 >>> 0) + "_"
          , f = 0;
        return b
    });
    r("Symbol.iterator", function(a) {
        if (a)
            return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = q[b[c]];
            typeof d === "function" && typeof d.prototype[a] != "function" && p(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ea(aa(this))
                }
            })
        }
        return a
    });
    function ea(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }
    var fa = typeof Object.create == "function" ? Object.create : function(a) {
        function b() {}
        b.prototype = a;
        return new b
    }
    , t;
    if (typeof Object.setPrototypeOf == "function")
        t = Object.setPrototypeOf;
    else {
        var v;
        a: {
            var ha = {
                a: !0
            }
              , ia = {};
            try {
                ia.__proto__ = ha;
                v = ia.a;
                break a
            } catch (a) {}
            v = !1
        }
        t = v ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
                throw new TypeError(a + " is not extensible");
            return a
        }
        : null
    }
    var ja = t;
    function x(a) {
        var b = typeof Symbol != "undefined" && Symbol.iterator && a[Symbol.iterator];
        if (b)
            return b.call(a);
        if (typeof a.length == "number")
            return {
                next: aa(a)
            };
        throw Error(String(a) + " is not an iterable or ArrayLike");
    }
    function y() {
        this.j = !1;
        this.h = null;
        this.m = void 0;
        this.g = 1;
        this.v = this.l = 0;
        this.i = null
    }
    function z(a) {
        if (a.j)
            throw new TypeError("Generator is already running");
        a.j = !0
    }
    y.prototype.o = function(a) {
        this.m = a
    }
    ;
    function B(a, b) {
        a.i = {
            N: b,
            O: !0
        };
        a.g = a.l || a.v
    }
    y.prototype.return = function(a) {
        this.i = {
            return: a
        };
        this.g = this.v
    }
    ;
    function C(a, b, c) {
        a.g = c;
        return {
            value: b
        }
    }
    function ka(a) {
        this.g = new y;
        this.h = a
    }
    function la(a, b) {
        z(a.g);
        var c = a.g.h;
        if (c)
            return D(a, "return"in c ? c["return"] : function(d) {
                return {
                    value: d,
                    done: !0
                }
            }
            , b, a.g.return);
        a.g.return(b);
        return E(a)
    }
    function D(a, b, c, d) {
        try {
            var f = b.call(a.g.h, c);
            if (!(f instanceof Object))
                throw new TypeError("Iterator result " + f + " is not an object");
            if (!f.done)
                return a.g.j = !1,
                f;
            var e = f.value
        } catch (h) {
            return a.g.h = null,
            B(a.g, h),
            E(a)
        }
        a.g.h = null;
        d.call(a.g, e);
        return E(a)
    }
    function E(a) {
        for (; a.g.g; )
            try {
                var b = a.h(a.g);
                if (b)
                    return a.g.j = !1,
                    {
                        value: b.value,
                        done: !1
                    }
            } catch (c) {
                a.g.m = void 0,
                B(a.g, c)
            }
        a.g.j = !1;
        if (a.g.i) {
            b = a.g.i;
            a.g.i = null;
            if (b.O)
                throw b.N;
            return {
                value: b.return,
                done: !0
            }
        }
        return {
            value: void 0,
            done: !0
        }
    }
    function ma(a) {
        this.next = function(b) {
            z(a.g);
            a.g.h ? b = D(a, a.g.h.next, b, a.g.o) : (a.g.o(b),
            b = E(a));
            return b
        }
        ;
        this.throw = function(b) {
            z(a.g);
            a.g.h ? b = D(a, a.g.h["throw"], b, a.g.o) : (B(a.g, b),
            b = E(a));
            return b
        }
        ;
        this.return = function(b) {
            return la(a, b)
        }
        ;
        this[Symbol.iterator] = function() {
            return this
        }
    }
    function na(a) {
        function b(d) {
            return a.next(d)
        }
        function c(d) {
            return a.throw(d)
        }
        return new Promise(function(d, f) {
            function e(h) {
                h.done ? d(h.value) : Promise.resolve(h.value).then(b, c).then(e, f)
            }
            e(a.next())
        }
        )
    }
    function oa(a) {
        return na(new ma(new ka(a)))
    }
    r("Promise", function(a) {
        function b(h) {
            this.h = 0;
            this.i = void 0;
            this.g = [];
            this.o = !1;
            var g = this.j();
            try {
                h(g.resolve, g.reject)
            } catch (k) {
                g.reject(k)
            }
        }
        function c() {
            this.g = null
        }
        function d(h) {
            return h instanceof b ? h : new b(function(g) {
                g(h)
            }
            )
        }
        if (a)
            return a;
        c.prototype.h = function(h) {
            if (this.g == null) {
                this.g = [];
                var g = this;
                this.i(function() {
                    g.l()
                })
            }
            this.g.push(h)
        }
        ;
        var f = q.setTimeout;
        c.prototype.i = function(h) {
            f(h, 0)
        }
        ;
        c.prototype.l = function() {
            for (; this.g && this.g.length; ) {
                var h = this.g;
                this.g = [];
                for (var g = 0; g < h.length; ++g) {
                    var k = h[g];
                    h[g] = null;
                    try {
                        k()
                    } catch (l) {
                        this.j(l)
                    }
                }
            }
            this.g = null
        }
        ;
        c.prototype.j = function(h) {
            this.i(function() {
                throw h;
            })
        }
        ;
        b.prototype.j = function() {
            function h(l) {
                return function(m) {
                    k || (k = !0,
                    l.call(g, m))
                }
            }
            var g = this
              , k = !1;
            return {
                resolve: h(this.I),
                reject: h(this.l)
            }
        }
        ;
        b.prototype.I = function(h) {
            if (h === this)
                this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (h instanceof b)
                this.K(h);
            else {
                a: switch (typeof h) {
                case "object":
                    var g = h != null;
                    break a;
                case "function":
                    g = !0;
                    break a;
                default:
                    g = !1
                }
                g ? this.H(h) : this.m(h)
            }
        }
        ;
        b.prototype.H = function(h) {
            var g = void 0;
            try {
                g = h.then
            } catch (k) {
                this.l(k);
                return
            }
            typeof g == "function" ? this.L(g, h) : this.m(h)
        }
        ;
        b.prototype.l = function(h) {
            this.v(2, h)
        }
        ;
        b.prototype.m = function(h) {
            this.v(1, h)
        }
        ;
        b.prototype.v = function(h, g) {
            if (this.h != 0)
                throw Error("Cannot settle(" + h + ", " + g + "): Promise already settled in state" + this.h);
            this.h = h;
            this.i = g;
            this.h === 2 && this.J();
            this.R()
        }
        ;
        b.prototype.J = function() {
            var h = this;
            f(function() {
                if (h.S()) {
                    var g = q.console;
                    typeof g !== "undefined" && g.error(h.i)
                }
            }, 1)
        }
        ;
        b.prototype.S = function() {
            if (this.o)
                return !1;
            var h = q.CustomEvent
              , g = q.Event
              , k = q.dispatchEvent;
            if (typeof k === "undefined")
                return !0;
            typeof h === "function" ? h = new h("unhandledrejection",{
                cancelable: !0
            }) : typeof g === "function" ? h = new g("unhandledrejection",{
                cancelable: !0
            }) : (h = q.document.createEvent("CustomEvent"),
            h.initCustomEvent("unhandledrejection", !1, !0, h));
            h.promise = this;
            h.reason = this.i;
            return k(h)
        }
        ;
        b.prototype.R = function() {
            if (this.g != null) {
                for (var h = 0; h < this.g.length; ++h)
                    e.h(this.g[h]);
                this.g = null
            }
        }
        ;
        var e = new c;
        b.prototype.K = function(h) {
            var g = this.j();
            h.A(g.resolve, g.reject)
        }
        ;
        b.prototype.L = function(h, g) {
            var k = this.j();
            try {
                h.call(g, k.resolve, k.reject)
            } catch (l) {
                k.reject(l)
            }
        }
        ;
        b.prototype.then = function(h, g) {
            function k(w, A) {
                return typeof w == "function" ? function(ba) {
                    try {
                        l(w(ba))
                    } catch (ca) {
                        m(ca)
                    }
                }
                : A
            }
            var l, m, u = new b(function(w, A) {
                l = w;
                m = A
            }
            );
            this.A(k(h, l), k(g, m));
            return u
        }
        ;
        b.prototype.catch = function(h) {
            return this.then(void 0, h)
        }
        ;
        b.prototype.A = function(h, g) {
            function k() {
                switch (l.h) {
                case 1:
                    h(l.i);
                    break;
                case 2:
                    g(l.i);
                    break;
                default:
                    throw Error("Unexpected state: " + l.h);
                }
            }
            var l = this;
            this.g == null ? e.h(k) : this.g.push(k);
            this.o = !0
        }
        ;
        b.resolve = d;
        b.reject = function(h) {
            return new b(function(g, k) {
                k(h)
            }
            )
        }
        ;
        b.race = function(h) {
            return new b(function(g, k) {
                for (var l = x(h), m = l.next(); !m.done; m = l.next())
                    d(m.value).A(g, k)
            }
            )
        }
        ;
        b.all = function(h) {
            var g = x(h)
              , k = g.next();
            return k.done ? d([]) : new b(function(l, m) {
                function u(ba) {
                    return function(ca) {
                        w[ba] = ca;
                        A--;
                        A == 0 && l(w)
                    }
                }
                var w = []
                  , A = 0;
                do
                    w.push(void 0),
                    A++,
                    d(k.value).A(u(w.length - 1), m),
                    k = g.next();
                while (!k.done)
            }
            )
        }
        ;
        return b
    });
    function F(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    var pa = typeof Object.assign == "function" ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var f in d)
                    F(d, f) && (a[f] = d[f])
        }
        return a
    }
    ;
    r("Object.assign", function(a) {
        return a || pa
    });
    r("Symbol.dispose", function(a) {
        return a ? a : Symbol("Symbol.dispose")
    });
    r("WeakMap", function(a) {
        function b(k) {
            this.g = (g += Math.random() + 1).toString();
            if (k) {
                k = x(k);
                for (var l; !(l = k.next()).done; )
                    l = l.value,
                    this.set(l[0], l[1])
            }
        }
        function c() {}
        function d(k) {
            var l = typeof k;
            return l === "object" && k !== null || l === "function"
        }
        function f(k) {
            if (!F(k, h)) {
                var l = new c;
                p(k, h, {
                    value: l
                })
            }
        }
        function e(k) {
            var l = Object[k];
            l && (Object[k] = function(m) {
                if (m instanceof c)
                    return m;
                Object.isExtensible(m) && f(m);
                return l(m)
            }
            )
        }
        if (function() {
            if (!a || !Object.seal)
                return !1;
            try {
                var k = Object.seal({})
                  , l = Object.seal({})
                  , m = new a([[k, 2], [l, 3]]);
                if (m.get(k) != 2 || m.get(l) != 3)
                    return !1;
                m.delete(k);
                m.set(l, 4);
                return !m.has(k) && m.get(l) == 4
            } catch (u) {
                return !1
            }
        }())
            return a;
        var h = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var g = 0;
        b.prototype.set = function(k, l) {
            if (!d(k))
                throw Error("Invalid WeakMap key");
            f(k);
            if (!F(k, h))
                throw Error("WeakMap key fail: " + k);
            k[h][this.g] = l;
            return this
        }
        ;
        b.prototype.get = function(k) {
            return d(k) && F(k, h) ? k[h][this.g] : void 0
        }
        ;
        b.prototype.has = function(k) {
            return d(k) && F(k, h) && F(k[h], this.g)
        }
        ;
        b.prototype.delete = function(k) {
            return d(k) && F(k, h) && F(k[h], this.g) ? delete k[h][this.g] : !1
        }
        ;
        return b
    });
    r("Map", function(a) {
        function b() {
            var g = {};
            return g.previous = g.next = g.head = g
        }
        function c(g, k) {
            var l = g[1];
            return ea(function() {
                if (l) {
                    for (; l.head != g[1]; )
                        l = l.previous;
                    for (; l.next != l.head; )
                        return l = l.next,
                        {
                            done: !1,
                            value: k(l)
                        };
                    l = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }
        function d(g, k) {
            var l = k && typeof k;
            l == "object" || l == "function" ? e.has(k) ? l = e.get(k) : (l = "" + ++h,
            e.set(k, l)) : l = "p_" + k;
            var m = g[0][l];
            if (m && F(g[0], l))
                for (g = 0; g < m.length; g++) {
                    var u = m[g];
                    if (k !== k && u.key !== u.key || k === u.key)
                        return {
                            id: l,
                            list: m,
                            index: g,
                            entry: u
                        }
                }
            return {
                id: l,
                list: m,
                index: -1,
                entry: void 0
            }
        }
        function f(g) {
            this[0] = {};
            this[1] = b();
            this.size = 0;
            if (g) {
                g = x(g);
                for (var k; !(k = g.next()).done; )
                    k = k.value,
                    this.set(k[0], k[1])
            }
        }
        if (function() {
            if (!a || typeof a != "function" || !a.prototype.entries || typeof Object.seal != "function")
                return !1;
            try {
                var g = Object.seal({
                    x: 4
                })
                  , k = new a(x([[g, "s"]]));
                if (k.get(g) != "s" || k.size != 1 || k.get({
                    x: 4
                }) || k.set({
                    x: 4
                }, "t") != k || k.size != 2)
                    return !1;
                var l = k.entries()
                  , m = l.next();
                if (m.done || m.value[0] != g || m.value[1] != "s")
                    return !1;
                m = l.next();
                return m.done || m.value[0].x != 4 || m.value[1] != "t" || !l.next().done ? !1 : !0
            } catch (u) {
                return !1
            }
        }())
            return a;
        var e = new WeakMap;
        f.prototype.set = function(g, k) {
            g = g === 0 ? 0 : g;
            var l = d(this, g);
            l.list || (l.list = this[0][l.id] = []);
            l.entry ? l.entry.value = k : (l.entry = {
                next: this[1],
                previous: this[1].previous,
                head: this[1],
                key: g,
                value: k
            },
            l.list.push(l.entry),
            this[1].previous.next = l.entry,
            this[1].previous = l.entry,
            this.size++);
            return this
        }
        ;
        f.prototype.delete = function(g) {
            g = d(this, g);
            return g.entry && g.list ? (g.list.splice(g.index, 1),
            g.list.length || delete this[0][g.id],
            g.entry.previous.next = g.entry.next,
            g.entry.next.previous = g.entry.previous,
            g.entry.head = null,
            this.size--,
            !0) : !1
        }
        ;
        f.prototype.clear = function() {
            this[0] = {};
            this[1] = this[1].previous = b();
            this.size = 0
        }
        ;
        f.prototype.has = function(g) {
            return !!d(this, g).entry
        }
        ;
        f.prototype.get = function(g) {
            return (g = d(this, g).entry) && g.value
        }
        ;
        f.prototype.entries = function() {
            return c(this, function(g) {
                return [g.key, g.value]
            })
        }
        ;
        f.prototype.keys = function() {
            return c(this, function(g) {
                return g.key
            })
        }
        ;
        f.prototype.values = function() {
            return c(this, function(g) {
                return g.value
            })
        }
        ;
        f.prototype.forEach = function(g, k) {
            for (var l = this.entries(), m; !(m = l.next()).done; )
                m = m.value,
                g.call(k, m[1], m[0], this)
        }
        ;
        f.prototype[Symbol.iterator] = f.prototype.entries;
        var h = 0;
        return f
    });
    r("Set", function(a) {
        function b(c) {
            this.g = new Map;
            if (c) {
                c = x(c);
                for (var d; !(d = c.next()).done; )
                    this.add(d.value)
            }
            this.size = this.g.size
        }
        if (function() {
            if (!a || typeof a != "function" || !a.prototype.entries || typeof Object.seal != "function")
                return !1;
            try {
                var c = Object.seal({
                    x: 4
                })
                  , d = new a(x([c]));
                if (!d.has(c) || d.size != 1 || d.add(c) != d || d.size != 1 || d.add({
                    x: 4
                }) != d || d.size != 2)
                    return !1;
                var f = d.entries()
                  , e = f.next();
                if (e.done || e.value[0] != c || e.value[1] != c)
                    return !1;
                e = f.next();
                return e.done || e.value[0] == c || e.value[0].x != 4 || e.value[1] != e.value[0] ? !1 : f.next().done
            } catch (h) {
                return !1
            }
        }())
            return a;
        b.prototype.add = function(c) {
            c = c === 0 ? 0 : c;
            this.g.set(c, c);
            this.size = this.g.size;
            return this
        }
        ;
        b.prototype.delete = function(c) {
            c = this.g.delete(c);
            this.size = this.g.size;
            return c
        }
        ;
        b.prototype.clear = function() {
            this.g.clear();
            this.size = 0
        }
        ;
        b.prototype.has = function(c) {
            return this.g.has(c)
        }
        ;
        b.prototype.entries = function() {
            return this.g.entries()
        }
        ;
        b.prototype.values = function() {
            return this.g.values()
        }
        ;
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function(c, d) {
            var f = this;
            this.g.forEach(function(e) {
                return c.call(d, e, e, f)
            })
        }
        ;
        return b
    });
    r("Array.prototype.find", function(a) {
        return a ? a : function(b, c) {
            a: {
                var d = this;
                d instanceof String && (d = String(d));
                for (var f = d.length, e = 0; e < f; e++) {
                    var h = d[e];
                    if (b.call(c, h, e, d)) {
                        b = h;
                        break a
                    }
                }
                b = void 0
            }
            return b
        }
    });
    r("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = c != null ? c : function(g) {
                return g
            }
            ;
            var f = []
              , e = typeof Symbol != "undefined" && Symbol.iterator && b[Symbol.iterator];
            if (typeof e == "function") {
                b = e.call(b);
                for (var h = 0; !(e = b.next()).done; )
                    f.push(c.call(d, e.value, h++))
            } else
                for (e = b.length,
                h = 0; h < e; h++)
                    f.push(c.call(d, b[h], h));
            return f
        }
    });
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var G = this || self;
    function H(a) {
        var b = typeof a;
        return b == "object" && a != null || b == "function"
    }
    function qa(a) {
        return Object.prototype.hasOwnProperty.call(a, ra) && a[ra] || (a[ra] = ++sa)
    }
    var ra = "closure_uid_" + (Math.random() * 1E9 >>> 0)
      , sa = 0;
    function I(a, b) {
        a = a.split(".");
        for (var c = G, d; a.length && (d = a.shift()); )
            a.length || b === void 0 ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }
    function ta(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.G = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.X = function(d, f, e) {
            for (var h = Array(arguments.length - 2), g = 2; g < arguments.length; g++)
                h[g - 2] = arguments[g];
            return b.prototype[f].apply(d, h)
        }
    }
    ;var ua = Array.prototype.indexOf ? function(a, b) {
        return Array.prototype.indexOf.call(a, b, void 0)
    }
    : function(a, b) {
        if (typeof a === "string")
            return typeof b !== "string" || b.length != 1 ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , va = Array.prototype.forEach ? function(a, b, c) {
        Array.prototype.forEach.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, f = typeof a === "string" ? a.split("") : a, e = 0; e < d; e++)
            e in f && b.call(c, f[e], e, a)
    }
    ;
    function wa(a, b) {
        b = ua(a, b);
        b >= 0 && Array.prototype.splice.call(a, b, 1)
    }
    function xa(a) {
        return Array.prototype.concat.apply([], arguments)
    }
    function ya(a) {
        var b = a.length;
        if (b > 0) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
    ;function za(a, b) {
        this.i = a;
        this.j = b;
        this.h = 0;
        this.g = null
    }
    za.prototype.get = function() {
        if (this.h > 0) {
            this.h--;
            var a = this.g;
            this.g = a.next;
            a.next = null
        } else
            a = this.i();
        return a
    }
    ;
    function Aa(a) {
        G.setTimeout(function() {
            throw a;
        }, 0)
    }
    ;function Ba() {
        this.h = this.g = null
    }
    Ba.prototype.add = function(a, b) {
        var c = Ca.get();
        c.set(a, b);
        this.h ? this.h.next = c : this.g = c;
        this.h = c
    }
    ;
    Ba.prototype.remove = function() {
        var a = null;
        this.g && (a = this.g,
        this.g = this.g.next,
        this.g || (this.h = null),
        a.next = null);
        return a
    }
    ;
    var Ca = new za(function() {
        return new Da
    }
    ,function(a) {
        return a.reset()
    }
    );
    function Da() {
        this.next = this.scope = this.g = null
    }
    Da.prototype.set = function(a, b) {
        this.g = a;
        this.scope = b;
        this.next = null
    }
    ;
    Da.prototype.reset = function() {
        this.next = this.scope = this.g = null
    }
    ;
    var Ea, Fa = !1, Ga = new Ba;
    function Ha(a) {
        Ea || Ia();
        Fa || (Ea(),
        Fa = !0);
        Ga.add(a, void 0)
    }
    function Ia() {
        var a = Promise.resolve(void 0);
        Ea = function() {
            a.then(Ja)
        }
    }
    function Ja() {
        for (var a; a = Ga.remove(); ) {
            try {
                a.g.call(a.scope)
            } catch (c) {
                Aa(c)
            }
            var b = Ca;
            b.j(a);
            b.h < 100 && (b.h++,
            a.next = b.g,
            b.g = a)
        }
        Fa = !1
    }
    ;function J() {
        this.i = this.i;
        this.j = this.j
    }
    J.prototype.i = !1;
    J.prototype.dispose = function() {
        this.i || (this.i = !0,
        this.B())
    }
    ;
    J.prototype[Symbol.dispose] = function() {
        this.dispose()
    }
    ;
    J.prototype.addOnDisposeCallback = function(a, b) {
        this.i ? b !== void 0 ? a.call(b) : a() : (this.j || (this.j = []),
        b && (a = a.bind(b)),
        this.j.push(a))
    }
    ;
    J.prototype.B = function() {
        if (this.j)
            for (; this.j.length; )
                this.j.shift()()
    }
    ;
    function Ka(a) {
        var b = {}, c;
        for (c in a)
            b[c] = a[c];
        return b
    }
    ;var La = /&/g
      , Ma = /</g
      , Na = />/g
      , Oa = /"/g
      , Pa = /'/g
      , Qa = /\x00/g
      , Ra = /[\x00&<>"']/;
    /*

 Copyright Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
    function K(a) {
        this.g = a
    }
    K.prototype.toString = function() {
        return this.g
    }
    ;
    var Sa = new K("about:invalid#zClosurez");
    function Ta(a) {
        this.P = a
    }
    function L(a) {
        return new Ta(function(b) {
            return b.substr(0, a.length + 1).toLowerCase() === a + ":"
        }
        )
    }
    var Ua = [L("data"), L("http"), L("https"), L("mailto"), L("ftp"), new Ta(function(a) {
        return /^[^:]*([/?#]|$)/.test(a)
    }
    )]
      , Va = /^\s*(?!javascript:)(?:[\w+.-]+:|[^:/?#]*(?:[/?#]|$))/i;
    var Wa = {
        W: 0,
        U: 1,
        V: 2,
        0: "FORMATTED_HTML_CONTENT",
        1: "EMBEDDED_INTERNAL_CONTENT",
        2: "EMBEDDED_TRUSTED_EXTERNAL_CONTENT"
    };
    function M(a, b) {
        b = Error.call(this, a + " cannot be used with intent " + Wa[b]);
        this.message = b.message;
        "stack"in b && (this.stack = b.stack);
        this.type = a;
        this.name = "TypeCannotBeUsedWithIframeIntentError"
    }
    var N = Error;
    M.prototype = fa(N.prototype);
    M.prototype.constructor = M;
    if (ja)
        ja(M, N);
    else
        for (var O in N)
            if (O != "prototype")
                if (Object.defineProperties) {
                    var Xa = Object.getOwnPropertyDescriptor(N, O);
                    Xa && Object.defineProperty(M, O, Xa)
                } else
                    M[O] = N[O];
    M.G = N.prototype;
    function Ya(a) {
        Ra.test(a) && (a.indexOf("&") != -1 && (a = a.replace(La, "&amp;")),
        a.indexOf("<") != -1 && (a = a.replace(Ma, "&lt;")),
        a.indexOf(">") != -1 && (a = a.replace(Na, "&gt;")),
        a.indexOf('"') != -1 && (a = a.replace(Oa, "&quot;")),
        a.indexOf("'") != -1 && (a = a.replace(Pa, "&#39;")),
        a.indexOf("\x00") != -1 && (a = a.replace(Qa, "&#0;")));
        return a
    }
    ;var Za, P;
    a: {
        for (var $a = ["CLOSURE_FLAGS"], Q = G, ab = 0; ab < $a.length; ab++)
            if (Q = Q[$a[ab]],
            Q == null) {
                P = null;
                break a
            }
        P = Q
    }
    var bb = P && P[610401301];
    Za = bb != null ? bb : !1;
    function R() {
        var a = G.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
    var S, cb = G.navigator;
    S = cb ? cb.userAgentData || null : null;
    function db() {
        return Za ? !!S && S.brands.length > 0 : !1
    }
    function eb(a) {
        var b = {};
        a.forEach(function(c) {
            b[c[0]] = c[1]
        });
        return function(c) {
            return b[c.find(function(d) {
                return d in b
            })] || ""
        }
    }
    function fb() {
        for (var a = R(), b = RegExp("([A-Z][\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d; d = b.exec(a); )
            c.push([d[1], d[2], d[3] || void 0]);
        a = eb(c);
        if (db())
            a: {
                if (Za && S)
                    for (b = 0; b < S.brands.length; b++)
                        if ((c = S.brands[b].brand) && c.indexOf("Chromium") != -1) {
                            b = !0;
                            break a
                        }
                b = !1
            }
        else
            b = (R().indexOf("Chrome") != -1 || R().indexOf("CriOS") != -1) && (db() || R().indexOf("Edge") == -1) || R().indexOf("Silk") != -1;
        return b ? a(["Chrome", "CriOS", "HeadlessChrome"]) : ""
    }
    function gb() {
        if (db()) {
            var a = S.brands.find(function(b) {
                return b.brand === "Chromium"
            });
            if (!a || !a.version)
                return NaN;
            a = a.version.split(".")
        } else {
            a = fb();
            if (a === "")
                return NaN;
            a = a.split(".")
        }
        return a.length === 0 ? NaN : Number(a[0])
    }
    ;function hb(a, b) {
        var c = b.parentNode;
        c && c.replaceChild(a, b)
    }
    ;function T(a) {
        J.call(this);
        this.o = 1;
        this.l = [];
        this.m = 0;
        this.g = [];
        this.h = {};
        this.v = !!a
    }
    ta(T, J);
    n = T.prototype;
    n.subscribe = function(a, b, c) {
        var d = this.h[a];
        d || (d = this.h[a] = []);
        var f = this.o;
        this.g[f] = a;
        this.g[f + 1] = b;
        this.g[f + 2] = c;
        this.o = f + 3;
        d.push(f);
        return f
    }
    ;
    function ib(a, b, c) {
        var d = U;
        if (a = d.h[a]) {
            var f = d.g;
            (a = a.find(function(e) {
                return f[e + 1] == b && f[e + 2] == c
            })) && d.C(a)
        }
    }
    n.C = function(a) {
        var b = this.g[a];
        if (b) {
            var c = this.h[b];
            this.m != 0 ? (this.l.push(a),
            this.g[a + 1] = function() {}
            ) : (c && wa(c, a),
            delete this.g[a],
            delete this.g[a + 1],
            delete this.g[a + 2])
        }
        return !!b
    }
    ;
    n.F = function(a, b) {
        var c = this.h[a];
        if (c) {
            var d = Array(arguments.length - 1), f = arguments.length, e;
            for (e = 1; e < f; e++)
                d[e - 1] = arguments[e];
            if (this.v)
                for (e = 0; e < c.length; e++)
                    f = c[e],
                    jb(this.g[f + 1], this.g[f + 2], d);
            else {
                this.m++;
                try {
                    for (e = 0,
                    f = c.length; e < f && !this.i; e++) {
                        var h = c[e];
                        this.g[h + 1].apply(this.g[h + 2], d)
                    }
                } finally {
                    if (this.m--,
                    this.l.length > 0 && this.m == 0)
                        for (; c = this.l.pop(); )
                            this.C(c)
                }
            }
            return e != 0
        }
        return !1
    }
    ;
    function jb(a, b, c) {
        Ha(function() {
            a.apply(b, c)
        })
    }
    n.clear = function(a) {
        if (a) {
            var b = this.h[a];
            b && (b.forEach(this.C, this),
            delete this.h[a])
        } else
            this.g.length = 0,
            this.h = {}
    }
    ;
    n.B = function() {
        T.G.B.call(this);
        this.clear();
        this.l.length = 0
    }
    ;
    var kb = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
    function lb(a) {
        var b = a.match(kb);
        a = b[1];
        var c = b[2]
          , d = b[3];
        b = b[4];
        var f = "";
        a && (f += a + ":");
        d && (f += "//",
        c && (f += c + "@"),
        f += d,
        b && (f += ":" + b));
        return f
    }
    function mb(a, b, c) {
        if (Array.isArray(b))
            for (var d = 0; d < b.length; d++)
                mb(a, String(b[d]), c);
        else
            b != null && c.push(a + (b === "" ? "" : "=" + encodeURIComponent(String(b))))
    }
    var nb = /#|$/;
    var ob = ["https://www.google.com"];
    function pb() {
        var a = this;
        this.g = [];
        this.h = function() {
            Promise.all(a.g.map(function(b) {
                document.requestStorageAccessFor(b)
            })).then(function() {
                window.removeEventListener("click", a.h)
            })
        }
    }
    function qb() {
        return oa(function(a) {
            var b = a.return;
            var c = gb() >= 119;
            return b.call(a, c && !!navigator.permissions && !!navigator.permissions.query && "requestStorageAccessFor"in document)
        })
    }
    function rb() {
        var a = new pb
          , b = ["https://www.youtube.com"];
        b = b === void 0 ? ob : b;
        oa(function(c) {
            switch (c.g) {
            case 1:
                return C(c, qb(), 2);
            case 2:
                if (!c.m) {
                    c.g = 3;
                    break
                }
                return C(c, Promise.all(b.map(function(d) {
                    var f;
                    return oa(function(e) {
                        if (e.g == 1)
                            return e.l = 2,
                            C(e, navigator.permissions.query({
                                name: "top-level-storage-access",
                                requestedOrigin: d
                            }), 4);
                        e.g != 2 ? (f = e.m,
                        f.state === "prompt" && a.g.push(d),
                        e.g = 0,
                        e.l = 0) : (e.l = 0,
                        e.i = null,
                        e.g = 0)
                    })
                })), 4);
            case 4:
                a.g.length > 0 && window.addEventListener("click", a.h);
            case 3:
                return c.return()
            }
        })
    }
    ;var V = {}
      , sb = []
      , U = new T
      , tb = {};
    function ub() {
        for (var a = x(sb), b = a.next(); !b.done; b = a.next())
            b = b.value,
            b()
    }
    function vb(a, b) {
        return a.tagName.toLowerCase().substring(0, 3) === "yt:" ? a.getAttribute(b) : a.dataset ? a.dataset[b] : a.getAttribute("data-" + b)
    }
    function wb(a) {
        U.F.apply(U, arguments)
    }
    ;function xb(a) {
        return (a.search("cue") === 0 || a.search("load") === 0) && a !== "loadModule"
    }
    function yb(a) {
        return a.search("get") === 0 || a.search("is") === 0
    }
    ;var W = window;
    function X(a, b) {
        this.u = {};
        this.playerInfo = {};
        this.videoTitle = "";
        this.i = this.g = null;
        this.h = 0;
        this.m = !1;
        this.l = [];
        this.j = null;
        this.v = {};
        this.options = null;
        if (!a)
            throw Error("YouTube player element ID required.");
        this.id = qa(this);
        b = Object.assign({
            title: "video player",
            videoId: "",
            width: 640,
            height: 360
        }, b || {});
        var c = document;
        if (a = typeof a === "string" ? c.getElementById(a) : a) {
            W.yt_embedsEnableRsaforFromIframeApi && rb();
            c = a.tagName.toLowerCase() === "iframe";
            b.host || (b.host = c ? lb(a.src) : "https://www.youtube.com");
            this.options = b || {};
            b = [this.options, window.YTConfig || {}];
            for (var d = 0; d < b.length; d++)
                b[d].host && (b[d].host = b[d].host.toString().replace("http://", "https://"));
            c || (W.yt_embedsEnableAutoplayAndVisibilitySignals ? (b = document.createElement("iframe"),
            zb(this, b, a),
            this.i = a,
            hb(b, a),
            Ab(this, b, Bb(this, b)),
            a = b) : (b = document.createElement("iframe"),
            zb(this, b, a),
            Ab(this, b, Bb(this)),
            this.i = a,
            hb(b, a),
            a = b));
            this.g = a;
            this.g.id || (this.g.id = "widget" + qa(this.g));
            V[this.g.id] = this;
            if (window.postMessage) {
                this.j = new T;
                Cb(this);
                a = Y(this, "events");
                for (var f in a)
                    a.hasOwnProperty(f) && this.addEventListener(f, a[f]);
                for (var e in tb)
                    tb.hasOwnProperty(e) && Db(this, e)
            }
        }
    }
    n = X.prototype;
    n.setSize = function(a, b) {
        this.g.width = a.toString();
        this.g.height = b.toString();
        return this
    }
    ;
    n.getIframe = function() {
        return this.g
    }
    ;
    n.addEventListener = function(a, b) {
        var c = b;
        typeof b === "string" && (c = function() {
            window[b].apply(window, arguments)
        }
        );
        if (!c)
            return this;
        this.j.subscribe(a, c);
        Eb(this, a);
        return this
    }
    ;
    function Db(a, b) {
        b = b.split(".");
        if (b.length === 2) {
            var c = b[1];
            "player" === b[0] && Eb(a, c)
        }
    }
    n.destroy = function() {
        this.g && this.g.id && (V[this.g.id] = null);
        var a = this.j;
        a && typeof a.dispose == "function" && a.dispose();
        this.i ? hb(this.i, this.g) : (a = this.g) && a.parentNode && a.parentNode.removeChild(a);
        Z && (Z[this.id] = null);
        this.options = null;
        this.g && this.o && this.g.removeEventListener("load", this.o);
        this.i = this.g = null
    }
    ;
    function Fb(a, b, c) {
        c = c || [];
        c = Array.prototype.slice.call(c);
        b = {
            event: "command",
            func: b,
            args: c
        };
        a.m ? a.sendMessage(b) : a.l.push(b)
    }
    function zb(a, b, c) {
        c = c.attributes;
        for (var d = 0, f = c.length; d < f; d++) {
            var e = c[d].value;
            e != null && e !== "" && e !== "null" && b.setAttribute(c[d].name, e)
        }
        b.setAttribute("frameBorder", "0");
        b.setAttribute("allowfullscreen", "");
        b.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        b.setAttribute("referrerPolicy", "strict-origin-when-cross-origin");
        b.setAttribute("title", "YouTube " + Y(a, "title"));
        (c = Y(a, "width")) && b.setAttribute("width", c.toString());
        (a = Y(a, "height")) && b.setAttribute("height", a.toString())
    }
    function Ab(a, b, c) {
        a = "" + Y(a, "host") + Gb(a) + "?";
        var d = [], f;
        for (f in c)
            mb(f, c[f], d);
        c = a + d.join("&");
        if (W.yt_embedsEnableIframeSrcWithIntent) {
            var e = e === void 0 ? Ua : e;
            a: if (e = e === void 0 ? Ua : e,
            c instanceof K)
                e = c;
            else {
                for (f = 0; f < e.length; ++f)
                    if (a = e[f],
                    a instanceof Ta && a.P(c)) {
                        e = new K(c);
                        break a
                    }
                e = void 0
            }
            e = e || Sa;
            b.removeAttribute("srcdoc");
            c = "allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation".split(" ");
            b.setAttribute("sandbox", "");
            for (f = 0; f < c.length; f++)
                b.sandbox.supports && !b.sandbox.supports(c[f]) || b.sandbox.add(c[f]);
            if (e instanceof K)
                if (e instanceof K)
                    e = e.g;
                else
                    throw Error("");
            else
                e = Va.test(e) ? e : void 0;
            e !== void 0 && (b.src = e);
            b.sandbox.add("allow-presentation", "allow-top-navigation")
        } else
            b.src = c
    }
    n.D = function() {
        this.g && this.g.contentWindow ? this.sendMessage({
            event: "listening"
        }) : clearInterval(this.h)
    }
    ;
    function Cb(a) {
        Hb(a, a.id, String(Y(a, "host")));
        a.h = setInterval(a.D.bind(a), 250);
        a.g && (a.o = function() {
            clearInterval(a.h);
            a.h = setInterval(a.D.bind(a), 250)
        }
        ,
        a.g.addEventListener("load", a.o))
    }
    function Ib(a) {
        var b = a.getBoundingClientRect();
        a = Math.max(0, Math.min(b.bottom, window.innerHeight || document.documentElement.clientHeight) - Math.max(b.top, 0)) * Math.max(0, Math.min(b.right, window.innerWidth || document.documentElement.clientWidth) - Math.max(b.left, 0));
        a = (b = b.height * b.width) ? a / b : 0;
        return document.visibilityState === "hidden" || a < .5 ? 1 : a < .75 ? 2 : a < .85 ? 3 : a < .95 ? 4 : a < 1 ? 5 : 6
    }
    function Eb(a, b) {
        a.v[b] || (a.v[b] = !0,
        Fb(a, "addEventListener", [b]))
    }
    n.sendMessage = function(a) {
        a.id = this.id;
        a.channel = "widget";
        a = JSON.stringify(a);
        var b = lb(this.g.src || "").replace("http:", "https:");
        if (this.g.contentWindow)
            try {
                this.g.contentWindow.postMessage(a, b)
            } catch (c) {
                if (c.name && c.name === "SyntaxError")
                    c.message && c.message.indexOf("target origin ''") > 0 || console && console.warn && console.warn(c);
                else
                    throw c;
            }
        else
            console && console.warn && console.warn("The YouTube player is not attached to the DOM. API calls should be made after the onReady event. See more: https://developers.google.com/youtube/iframe_api_reference#Events")
    }
    ;
    function Gb(a) {
        if (W.yt_embedsEnableIframeApiVideoIdValidation) {
            if ((a = String(Y(a, "videoId"))) && (a.length !== 11 || !a.match(/^[a-zA-Z0-9\-_]+$/)))
                throw Error("Invalid video id");
            return "/embed/" + a
        }
        return "/embed/" + String(Y(a, "videoId"))
    }
    function Bb(a, b) {
        var c = Y(a, "playerVars");
        c ? c = Ka(c) : c = {};
        window !== window.top && document.referrer && (c.widget_referrer = document.referrer.substring(0, 256));
        var d = Y(a, "embedConfig");
        if (d) {
            if (H(d))
                try {
                    d = JSON.stringify(d)
                } catch (f) {
                    console.error("Invalid embed config JSON", f)
                }
            c.embed_config = d
        }
        c.enablejsapi = window.postMessage ? 1 : 0;
        window.location.host && (c.origin = window.location.protocol + "//" + window.location.host);
        c.widgetid = a.id;
        window.location.href && va(["debugjs", "debugcss"], function(f) {
            var e = window.location.href;
            var h = e.search(nb);
            b: {
                var g = 0;
                for (var k = f.length; (g = e.indexOf(f, g)) >= 0 && g < h; ) {
                    var l = e.charCodeAt(g - 1);
                    if (l == 38 || l == 63)
                        if (l = e.charCodeAt(g + k),
                        !l || l == 61 || l == 38 || l == 35)
                            break b;
                    g += k + 1
                }
                g = -1
            }
            if (g < 0)
                e = null;
            else {
                k = e.indexOf("&", g);
                if (k < 0 || k > h)
                    k = h;
                g += f.length + 1;
                e = decodeURIComponent(e.slice(g, k !== -1 ? k : 0).replace(/\+/g, " "))
            }
            e !== null && (c[f] = e)
        });
        W.yt_embedsEnableIframeApiSendFullEmbedUrl && (window.location.href && (c.forigin = window.location.href),
        a = window.location.ancestorOrigins,
        c.aoriginsup = a === void 0 ? 0 : 1,
        a && a.length > 0 && (c.aorigins = Array.from(a).join(",")),
        window.document.referrer && (c.gporigin = window.document.referrer));
        W.yt_embedsEnableAutoplayAndVisibilitySignals && b && (c.vf = Ib(b));
        return c
    }
    function Jb(a, b) {
        if (H(b)) {
            for (var c in b)
                b.hasOwnProperty(c) && (a.playerInfo[c] = b[c]);
            a.playerInfo.hasOwnProperty("videoData") && (b = a.playerInfo.videoData,
            b.hasOwnProperty("title") && b.title ? (b = b.title,
            b !== a.videoTitle && (a.videoTitle = b,
            a.g.setAttribute("title", b))) : (a.videoTitle = "",
            a.g.setAttribute("title", "YouTube " + Y(a, "title"))))
        }
    }
    function Kb(a, b) {
        b = x(b);
        for (var c = b.next(), d = {}; !c.done; d = {
            s: void 0
        },
        c = b.next())
            d.s = c.value,
            a[d.s] || (d.s === "getCurrentTime" ? a[d.s] = function() {
                var f = this.playerInfo.currentTime;
                if (this.playerInfo.playerState === 1) {
                    var e = (Date.now() / 1E3 - this.playerInfo.currentTimeLastUpdated_) * this.playerInfo.playbackRate;
                    e > 0 && (f += Math.min(e, 1))
                }
                return f
            }
            : xb(d.s) ? a[d.s] = function(f) {
                return function() {
                    this.playerInfo = {};
                    this.u = {};
                    Fb(this, f.s, arguments);
                    return this
                }
            }(d) : yb(d.s) ? a[d.s] = function(f) {
                return function() {
                    var e = f.s
                      , h = 0;
                    e.search("get") === 0 ? h = 3 : e.search("is") === 0 && (h = 2);
                    return this.playerInfo[e.charAt(h).toLowerCase() + e.substring(h + 1)]
                }
            }(d) : a[d.s] = function(f) {
                return function() {
                    Fb(this, f.s, arguments);
                    return this
                }
            }(d))
    }
    n.getVideoEmbedCode = function() {
        var a = "" + Y(this, "host") + Gb(this)
          , b = Number(Y(this, "width"))
          , c = Number(Y(this, "height"));
        if (isNaN(b) || isNaN(c))
            throw Error("Invalid width or height property");
        b = Math.floor(b);
        c = Math.floor(c);
        var d = this.videoTitle;
        a = Ya(a);
        d = Ya(d != null ? d : "YouTube video player");
        return '<iframe width="' + b + '" height="' + c + '" src="' + a + '" title="' + (d + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
    }
    ;
    n.getOptions = function(a) {
        return this.u.namespaces ? a ? this.u[a] ? this.u[a].options || [] : [] : this.u.namespaces || [] : []
    }
    ;
    n.getOption = function(a, b) {
        if (this.u.namespaces && a && b && this.u[a])
            return this.u[a][b]
    }
    ;
    function Y(a, b) {
        a = [a.options, window.YTConfig || {}];
        for (var c = 0; c < a.length; c++) {
            var d = a[c][b];
            if (d !== void 0)
                return d
        }
        return null
    }
    var Z = null
      , Lb = null;
    function Mb(a) {
        if (a.tagName.toLowerCase() !== "iframe") {
            var b = vb(a, "videoid");
            b && (b = {
                videoId: b,
                width: vb(a, "width"),
                height: vb(a, "height")
            },
            new X(a,b))
        }
    }
    function Hb(a, b, c) {
        Z || (Z = {},
        Lb = new Set,
        Nb.addEventListener("message", function(d) {
            a: if (Lb.has(d.origin)) {
                try {
                    var f = JSON.parse(d.data)
                } catch (g) {
                    break a
                }
                var e = Z[f.id];
                if (e && d.origin === e.M)
                    switch (d = e.T,
                    d.m = !0,
                    d.m && (va(d.l, d.sendMessage, d),
                    d.l.length = 0),
                    e = f.event,
                    f = f.info,
                    e) {
                    case "apiInfoDelivery":
                        if (H(f))
                            for (var h in f)
                                f.hasOwnProperty(h) && (d.u[h] = f[h]);
                        break;
                    case "infoDelivery":
                        Jb(d, f);
                        break;
                    case "initialDelivery":
                        H(f) && (clearInterval(d.h),
                        d.playerInfo = {},
                        d.u = {},
                        Kb(d, f.apiInterface),
                        Jb(d, f));
                        break;
                    default:
                        d.j.i || (h = {
                            target: d,
                            data: f
                        },
                        d.j.F(e, h),
                        wb("player." + e, h))
                    }
            }
        }));
        Z[b] = {
            T: a,
            M: c
        };
        Lb.add(c)
    }
    var Nb = window;
    I("YT.PlayerState.UNSTARTED", -1);
    I("YT.PlayerState.ENDED", 0);
    I("YT.PlayerState.PLAYING", 1);
    I("YT.PlayerState.PAUSED", 2);
    I("YT.PlayerState.BUFFERING", 3);
    I("YT.PlayerState.CUED", 5);
    I("YT.get", function(a) {
        return V[a]
    });
    I("YT.scan", ub);
    I("YT.subscribe", function(a, b, c) {
        U.subscribe(a, b, c);
        tb[a] = !0;
        for (var d in V)
            V.hasOwnProperty(d) && Db(V[d], a)
    });
    I("YT.unsubscribe", function(a, b, c) {
        ib(a, b, c)
    });
    I("YT.Player", X);
    X.prototype.destroy = X.prototype.destroy;
    X.prototype.setSize = X.prototype.setSize;
    X.prototype.getIframe = X.prototype.getIframe;
    X.prototype.addEventListener = X.prototype.addEventListener;
    X.prototype.getVideoEmbedCode = X.prototype.getVideoEmbedCode;
    X.prototype.getOptions = X.prototype.getOptions;
    X.prototype.getOption = X.prototype.getOption;
    sb.push(function(a) {
        var b = a;
        b || (b = document);
        a = ya(b.getElementsByTagName("yt:player"));
        b = ya((b || document).querySelectorAll(".yt-player"));
        va(xa(a, b), Mb)
    });
    typeof YTConfig !== "undefined" && YTConfig.parsetags && YTConfig.parsetags !== "onload" || ub();
    var Ob = G.onYTReady;
    Ob && Ob();
    var Pb = G.onYouTubeIframeAPIReady;
    Pb && Pb();
    var Qb = G.onYouTubePlayerAPIReady;
    Qb && Qb();
}
).call(this);
//==========
