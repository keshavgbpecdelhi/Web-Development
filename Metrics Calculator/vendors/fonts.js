window.FontAwesomeKitConfig = { "asyncLoading": { "enabled": true }, "autoA11y": { "enabled": true }, "baseUrl": "https://ka-f.fontawesome.com", "detectConflictsUntil": null, "iconUploads": {}, "license": "free", "method": "css", "minify": { "enabled": true }, "token": "a076d05399", "v4FontFaceShim": { "enabled": false }, "v4shim": { "enabled": false }, "version": "5.15.1" };
! function(t) { "function" == typeof define && define.amd ? define(t) : t() }((function() { "use strict";

    function t(e) { return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) { return typeof t } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t })(e) }

    function e(t, e, n) { return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t }

    function n(t, e) { var n = Object.keys(t); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(t);
            e && (o = o.filter((function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable }))), n.push.apply(n, o) } return n }

    function o(t) { for (var o = 1; o < arguments.length; o++) { var r = null != arguments[o] ? arguments[o] : {};
            o % 2 ? n(Object(r), !0).forEach((function(n) { e(t, n, r[n]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach((function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e)) })) } return t }

    function r(t, e) { return function(t) { if (Array.isArray(t)) return t }(t) || function(t, e) { if (!(Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t))) return; var n = [],
                o = !0,
                r = !1,
                i = void 0; try { for (var c, a = t[Symbol.iterator](); !(o = (c = a.next()).done) && (n.push(c.value), !e || n.length !== e); o = !0); } catch (t) { r = !0, i = t } finally { try { o || null == a.return || a.return() } finally { if (r) throw i } } return n }(t, e) || function() { throw new TypeError("Invalid attempt to destructure non-iterable instance") }() }

    function i(t, e) { var n = e && e.addOn || "",
            o = e && e.baseFilename || t.license + n,
            r = e && e.minify ? ".min" : "",
            i = e && e.fileSuffix || t.method,
            c = e && e.subdir || t.method; return t.baseUrl + "/releases/" + ("latest" === t.version ? "latest" : "v".concat(t.version)) + "/" + c + "/" + o + r + "." + i }

    function c(t, e) { var n = e || ["fa"],
            o = "." + Array.prototype.join.call(n, ",."),
            r = t.querySelectorAll(o);
        Array.prototype.forEach.call(r, (function(e) { var n = e.getAttribute("title");
            e.setAttribute("aria-hidden", "true"); var o = !e.nextElementSibling || !e.nextElementSibling.classList.contains("sr-only"); if (n && o) { var r = t.createElement("span");
                r.innerHTML = n, r.classList.add("sr-only"), e.parentNode.insertBefore(r, e.nextSibling) } })) } var a, u = function() {},
        f = "undefined" != typeof global && void 0 !== global.process && "function" == typeof global.process.emit,
        s = "undefined" == typeof setImmediate ? setTimeout : setImmediate,
        d = [];

    function l() { for (var t = 0; t < d.length; t++) d[t][0](d[t][1]);
        d = [], a = !1 }

    function h(t, e) { d.push([t, e]), a || (a = !0, s(l, 0)) }

    function m(t) { var e = t.owner,
            n = e._state,
            o = e._data,
            r = t[n],
            i = t.then; if ("function" == typeof r) { n = "fulfilled"; try { o = r(o) } catch (t) { b(i, t) } }
        p(i, o) || ("fulfilled" === n && v(i, o), "rejected" === n && b(i, o)) }

    function p(e, n) { var o; try { if (e === n) throw new TypeError("A promises callback cannot return that same promise."); if (n && ("function" == typeof n || "object" === t(n))) { var r = n.then; if ("function" == typeof r) return r.call(n, (function(t) { o || (o = !0, n === t ? y(e, t) : v(e, t)) }), (function(t) { o || (o = !0, b(e, t)) })), !0 } } catch (t) { return o || b(e, t), !0 } return !1 }

    function v(t, e) { t !== e && p(t, e) || y(t, e) }

    function y(t, e) { "pending" === t._state && (t._state = "settled", t._data = e, h(w, t)) }

    function b(t, e) { "pending" === t._state && (t._state = "settled", t._data = e, h(A, t)) }

    function g(t) { t._then = t._then.forEach(m) }

    function w(t) { t._state = "fulfilled", g(t) }

    function A(t) { t._state = "rejected", g(t), !t._handled && f && global.process.emit("unhandledRejection", t._data, t) }

    function O(t) { global.process.emit("rejectionHandled", t) }

    function j(t) { if ("function" != typeof t) throw new TypeError("Promise resolver " + t + " is not a function"); if (this instanceof j == !1) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        this._then = [],
            function(t, e) {
                function n(t) { b(e, t) } try { t((function(t) { v(e, t) }), n) } catch (t) { n(t) } }(t, this) }
    j.prototype = { constructor: j, _state: "pending", _then: null, _data: void 0, _handled: !1, then: function(t, e) { var n = { owner: this, then: new this.constructor(u), fulfilled: t, rejected: e }; return !e && !t || this._handled || (this._handled = !0, "rejected" === this._state && f && h(O, this)), "fulfilled" === this._state || "rejected" === this._state ? h(m, n) : this._then.push(n), n.then }, catch: function(t) { return this.then(null, t) } }, j.all = function(t) { if (!Array.isArray(t)) throw new TypeError("You must pass an array to Promise.all()."); return new j((function(e, n) { var o = [],
                r = 0;

            function i(t) { return r++,
                    function(n) { o[t] = n, --r || e(o) } } for (var c, a = 0; a < t.length; a++)(c = t[a]) && "function" == typeof c.then ? c.then(i(a), n) : o[a] = c;
            r || e(o) })) }, j.race = function(t) { if (!Array.isArray(t)) throw new TypeError("You must pass an array to Promise.race()."); return new j((function(e, n) { for (var o, r = 0; r < t.length; r++)(o = t[r]) && "function" == typeof o.then ? o.then(e, n) : e(o) })) }, j.resolve = function(e) { return e && "object" === t(e) && e.constructor === j ? e : new j((function(t) { t(e) })) }, j.reject = function(t) { return new j((function(e, n) { n(t) })) }; var S = "function" == typeof Promise ? Promise : j;

    function E(t, n) { var o = n.fetch,
            r = n.XMLHttpRequest,
            i = n.token; return new S((function(n, c) { if ("function" == typeof o) o(t, { mode: "cors", cache: "default", headers: new Headers(e({}, "fa-kit-token", i)) }).then((function(t) { if (t.ok) return t.text(); throw new Error("") })).then((function(t) { n(t) })).catch(c);
            else if ("function" == typeof r) { var a = new r;
                a.addEventListener("loadend", (function() { this.responseText ? n(this.responseText) : c(new Error("")) }));
                ["abort", "error", "timeout"].map((function(t) { a.addEventListener(t, (function() { c(new Error("")) })) })), a.open("GET", t), a.setRequestHeader("fa-kit-token", i), a.send() } else { c(new Error("")) } })) }

    function _(t, e) { var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {},
            r = e.document || r,
            a = c.bind(c, r, ["fa", "fab", "fas", "far", "fal", "fad", "fak"]);
        t.autoA11y.enabled && n(a); var u = [{ id: "fa-main", addOn: void 0 }];
        t.v4shim.enabled && u.push({ id: "fa-v4-shims", addOn: "-v4-shims" }), t.v4FontFaceShim.enabled && u.push({ id: "fa-v4-font-face", addOn: "-v4-font-face" }); var f = u.map((function(n) { return new S((function(r, c) { E(i(t, { addOn: n.addOn, minify: t.minify.enabled }), e).then((function(i) { r(P(i, o({}, e, { baseUrl: t.baseUrl, version: t.version, id: n.id }))) })).catch(c) })) })); return S.all(f) }

    function P(t, e) { var n = document.createElement("style"),
            o = document.createTextNode(function(t, e, n) { var o = t; return [
                    [/(url\("?)\.\.\/\.\.\/\.\./g, function(t, n) { return "".concat(n).concat(e) }],
                    [/(url\("?)\.\.\/webfonts/g, function(t, o) { return "".concat(o).concat(e, "/releases/v").concat(n, "/webfonts") }],
                    [/(url\("?)https:\/\/kit-free([^.])*\.fontawesome\.com/g, function(t, n) { return "".concat(n).concat(e) }]
                ].forEach((function(t) { var e = r(t, 2),
                        n = e[0],
                        i = e[1];
                    o = o.replace(n, i) })), o }(t, e.baseUrl, e.version)); return n.appendChild(o), n.media = "all", e.id && n.setAttribute("id", e.id), e && e.detectingConflicts && e.detectionIgnoreAttr && n.setAttributeNode(document.createAttribute(e.detectionIgnoreAttr)), n }

    function F(t, e) { e.autoA11y = t.autoA11y.enabled, "pro" === t.license && (e.autoFetchSvg = !0, e.fetchSvgFrom = t.baseUrl + "/releases/" + ("latest" === t.version ? "latest" : "v".concat(t.version)) + "/svgs", e.fetchUploadedSvgFrom = t.uploadsUrl); var n = []; return t.v4shim.enabled && n.push(new S((function(n, r) { E(i(t, { addOn: "-v4-shims", minify: t.minify.enabled }), e).then((function(t) { n(T(t, o({}, e, { id: "fa-v4-shims" }))) })).catch(r) }))), n.push(new S((function(n, r) { E(i(t, { minify: t.minify.enabled }), e).then((function(t) { var r = T(t, o({}, e, { id: "fa-main" }));
                n(function(t, e) { var n = e && void 0 !== e.autoFetchSvg ? e.autoFetchSvg : void 0,
                        o = e && void 0 !== e.autoA11y ? e.autoA11y : void 0;
                    void 0 !== o && t.setAttribute("data-auto-a11y", o ? "true" : "false");
                    n && (t.setAttributeNode(document.createAttribute("data-auto-fetch-svg")), t.setAttribute("data-fetch-svg-from", e.fetchSvgFrom), t.setAttribute("data-fetch-uploaded-svg-from", e.fetchUploadedSvgFrom)); return t }(r, e)) })).catch(r) }))), S.all(n) }

    function T(t, e) { var n = document.createElement("SCRIPT"),
            o = document.createTextNode(t); return n.appendChild(o), n.referrerPolicy = "strict-origin", e.id && n.setAttribute("id", e.id), e && e.detectingConflicts && e.detectionIgnoreAttr && n.setAttributeNode(document.createAttribute(e.detectionIgnoreAttr)), n }

    function C(t) { var e, n = [],
            o = document,
            r = o.documentElement.doScroll,
            i = (r ? /^loaded|^c/ : /^loaded|^i|^c/).test(o.readyState);
        i || o.addEventListener("DOMContentLoaded", e = function() { for (o.removeEventListener("DOMContentLoaded", e), i = 1; e = n.shift();) e() }), i ? setTimeout(t, 0) : n.push(t) }

    function L(t) { "undefined" != typeof MutationObserver && new MutationObserver(t).observe(document, { childList: !0, subtree: !0 }) } try { if (window.FontAwesomeKitConfig) { var k = window.FontAwesomeKitConfig,
                x = { detectingConflicts: k.detectConflictsUntil && new Date <= new Date(k.detectConflictsUntil), detectionIgnoreAttr: "data-fa-detection-ignore", fetch: window.fetch, token: k.token, XMLHttpRequest: window.XMLHttpRequest, document: document },
                I = document.currentScript,
                U = I ? I.parentElement : document.head;
            (function() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; return "js" === t.method ? F(t, e) : "css" === t.method ? _(t, e, (function(t) { C(t), L(t) })) : void 0 })(k, x).then((function(t) { t.map((function(t) { U.insertBefore(t, I ? I.nextSibling : null) })), x.detectingConflicts && I && C((function() { I.setAttributeNode(document.createAttribute(x.detectionIgnoreAttr)); var t = function(t, e) { var n = document.createElement("script"); return e && e.detectionIgnoreAttr && n.setAttributeNode(document.createAttribute(e.detectionIgnoreAttr)), n.src = i(t, { baseFilename: "conflict-detection", fileSuffix: "js", subdir: "js", minify: t.minify.enabled }), n }(k, x);
                    document.body.appendChild(t) })) })).catch((function(t) { console.error("".concat("Font Awesome Kit:", " ").concat(t)) })) } } catch (t) { console.error("".concat("Font Awesome Kit:", " ").concat(t)) } }));