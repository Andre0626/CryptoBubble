!function () {
    const e = document.createElement("link").relList;
    if (!(e && e.supports && e.supports("modulepreload"))) {
        for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
            t(e);
        new MutationObserver((e => {
            for (const n of e)
                if ("childList" === n.type)
                    for (const e of n.addedNodes)
                        "LINK" === e.tagName && "modulepreload" === e.rel && t(e)
        }
        )).observe(document, {
            childList: !0,
            subtree: !0
        })
    }
    function t(e) {
        if (e.ep)
            return;
        e.ep = !0;
        const t = function (e) {
            const t = {};
            return e.integrity && (t.integrity = e.integrity),
                e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
                "use-credentials" === e.crossOrigin ? t.credentials = "include" : "anonymous" === e.crossOrigin ? t.credentials = "omit" : t.credentials = "same-origin",
                t
        }(e);
        fetch(e.href, t)
    }
}();
const e = {
    context: void 0,
    registry: void 0
}
    , t = (e, t) => e === t
    , n = Symbol("solid-proxy")
    , r = Symbol("solid-track")
    , o = {
        equals: t
    };
let i = P;
const l = 1
    , s = 2
    , a = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var c = null;
let u = null
    , d = null
    , h = null
    , p = null
    , g = 0;
function f(e, t) {
    const n = d
        , r = c
        , o = 0 === e.length
        , i = o ? a : {
            owned: null,
            cleanups: null,
            context: null,
            owner: void 0 === t ? r : t
        }
        , l = o ? e : () => e((() => w((() => E(i)))));
    c = i,
        d = null;
    try {
        return B(l, !0)
    } finally {
        d = n,
            c = r
    }
}
function m(e, t) {
    const n = {
        value: e,
        observers: null,
        observerSlots: null,
        comparator: (t = t ? Object.assign({}, o, t) : o).equals || void 0
    };
    return [L.bind(n), e => ("function" == typeof e && (e = e(n.value)),
        $(n, e))]
}
function b(e, t, n) {
    M(A(e, t, !1, l))
}
function v(e, t, n) {
    i = z;
    const r = A(e, t, !1, l);
    n && n.render || (r.user = !0),
        p ? p.push(r) : M(r)
}
function y(e, t, n) {
    n = n ? Object.assign({}, o, n) : o;
    const r = A(e, t, !0, 0);
    return r.observers = null,
        r.observerSlots = null,
        r.comparator = n.equals || void 0,
        M(r),
        L.bind(r)
}
function w(e) {
    if (null === d)
        return e();
    const t = d;
    d = null;
    try {
        return e()
    } finally {
        d = t
    }
}
function _(e) {
    v((() => w(e)))
}
function C(e) {
    return null === c || (null === c.cleanups ? c.cleanups = [e] : c.cleanups.push(e)),
        e
}
function k() {
    return d
}
function x(e) {
    const t = y(e)
        , n = y((() => O(t())));
    return n.toArray = () => {
        const e = n();
        return Array.isArray(e) ? e : null != e ? [e] : []
    }
        ,
        n
}
function L() {
    if (this.sources && this.state)
        if (this.state === l)
            M(this);
        else {
            const e = h;
            h = null,
                B((() => T(this)), !1),
                h = e
        }
    if (d) {
        const e = this.observers ? this.observers.length : 0;
        d.sources ? (d.sources.push(this),
            d.sourceSlots.push(e)) : (d.sources = [this],
                d.sourceSlots = [e]),
            this.observers ? (this.observers.push(d),
                this.observerSlots.push(d.sources.length - 1)) : (this.observers = [d],
                    this.observerSlots = [d.sources.length - 1])
    }
    return this.value
}
function $(e, t, n) {
    let r = e.value;
    return e.comparator && e.comparator(r, t) || (e.value = t,
        e.observers && e.observers.length && B((() => {
            for (let t = 0; t < e.observers.length; t += 1) {
                const n = e.observers[t]
                    , r = u && u.running;
                r && u.disposed.has(n),
                    (r ? n.tState : n.state) || (n.pure ? h.push(n) : p.push(n),
                        n.observers && N(n)),
                    r || (n.state = l)
            }
            if (h.length > 1e6)
                throw h = [],
                new Error
        }
        ), !1)),
        t
}
function M(e) {
    if (!e.fn)
        return;
    E(e);
    const t = c
        , n = d
        , r = g;
    d = c = e,
        function (e, t, n) {
            let r;
            try {
                r = e.fn(t)
            } catch (o) {
                return e.pure && (e.state = l,
                    e.owned && e.owned.forEach(E),
                    e.owned = null),
                    e.updatedAt = n + 1,
                    D(o)
            }
            (!e.updatedAt || e.updatedAt <= n) && (null != e.updatedAt && "observers" in e ? $(e, r) : e.value = r,
                e.updatedAt = n)
        }(e, e.value, r),
        d = n,
        c = t
}
function A(e, t, n, r = l, o) {
    const i = {
        fn: e,
        state: r,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: t,
        owner: c,
        context: null,
        pure: n
    };
    return null === c || c !== a && (c.owned ? c.owned.push(i) : c.owned = [i]),
        i
}
function S(e) {
    if (0 === e.state)
        return;
    if (e.state === s)
        return T(e);
    if (e.suspense && w(e.suspense.inFallback))
        return e.suspense.effects.push(e);
    const t = [e];
    for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < g);)
        e.state && t.push(e);
    for (let n = t.length - 1; n >= 0; n--)
        if ((e = t[n]).state === l)
            M(e);
        else if (e.state === s) {
            const n = h;
            h = null,
                B((() => T(e, t[0])), !1),
                h = n
        }
}
function B(e, t) {
    if (h)
        return e();
    let n = !1;
    t || (h = []),
        p ? n = !0 : p = [],
        g++;
    try {
        const t = e();
        return function (e) {
            h && (P(h),
                h = null);
            if (e)
                return;
            const t = p;
            p = null,
                t.length && B((() => i(t)), !1)
        }(n),
            t
    } catch (r) {
        n || (p = null),
            h = null,
            D(r)
    }
}
function P(e) {
    for (let t = 0; t < e.length; t++)
        S(e[t])
}
function z(e) {
    let t, n = 0;
    for (t = 0; t < e.length; t++) {
        const r = e[t];
        r.user ? e[n++] = r : S(r)
    }
    for (t = 0; t < n; t++)
        S(e[t])
}
function T(e, t) {
    e.state = 0;
    for (let n = 0; n < e.sources.length; n += 1) {
        const r = e.sources[n];
        if (r.sources) {
            const e = r.state;
            e === l ? r !== t && (!r.updatedAt || r.updatedAt < g) && S(r) : e === s && T(r, t)
        }
    }
}
function N(e) {
    for (let t = 0; t < e.observers.length; t += 1) {
        const n = e.observers[t];
        n.state || (n.state = s,
            n.pure ? h.push(n) : p.push(n),
            n.observers && N(n))
    }
}
function E(e) {
    let t;
    if (e.sources)
        for (; e.sources.length;) {
            const t = e.sources.pop()
                , n = e.sourceSlots.pop()
                , r = t.observers;
            if (r && r.length) {
                const e = r.pop()
                    , o = t.observerSlots.pop();
                n < r.length && (e.sourceSlots[o] = n,
                    r[n] = e,
                    t.observerSlots[n] = o)
            }
        }
    if (e.owned) {
        for (t = e.owned.length - 1; t >= 0; t--)
            E(e.owned[t]);
        e.owned = null
    }
    if (e.cleanups) {
        for (t = e.cleanups.length - 1; t >= 0; t--)
            e.cleanups[t]();
        e.cleanups = null
    }
    e.state = 0,
        e.context = null
}
function D(e) {
    throw e
}
function O(e) {
    if ("function" == typeof e && !e.length)
        return O(e());
    if (Array.isArray(e)) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
            const r = O(e[n]);
            Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
        }
        return t
    }
    return e
}
const R = Symbol("fallback");
function j(e) {
    for (let t = 0; t < e.length; t++)
        e[t]()
}
function F(e, t) {
    return w((() => e(t || {})))
}
const I = e => `Stale read from <${e}>.`;
function U(e) {
    const t = "fallback" in e && {
        fallback: () => e.fallback
    };
    return y(function (e, t, n = {}) {
        let o = []
            , i = []
            , l = []
            , s = 0
            , a = t.length > 1 ? [] : null;
        return C((() => j(l))),
            () => {
                let c, u, d = e() || [];
                return d[r],
                    w((() => {
                        let e, t, r, p, g, m, b, v, y, w = d.length;
                        if (0 === w)
                            0 !== s && (j(l),
                                l = [],
                                o = [],
                                i = [],
                                s = 0,
                                a && (a = [])),
                                n.fallback && (o = [R],
                                    i[0] = f((e => (l[0] = e,
                                        n.fallback()))),
                                    s = 1);
                        else if (0 === s) {
                            for (i = new Array(w),
                                u = 0; u < w; u++)
                                o[u] = d[u],
                                    i[u] = f(h);
                            s = w
                        } else {
                            for (r = new Array(w),
                                p = new Array(w),
                                a && (g = new Array(w)),
                                m = 0,
                                b = Math.min(s, w); m < b && o[m] === d[m]; m++)
                                ;
                            for (b = s - 1,
                                v = w - 1; b >= m && v >= m && o[b] === d[v]; b--,
                                v--)
                                r[v] = i[b],
                                    p[v] = l[b],
                                    a && (g[v] = a[b]);
                            for (e = new Map,
                                t = new Array(v + 1),
                                u = v; u >= m; u--)
                                y = d[u],
                                    c = e.get(y),
                                    t[u] = void 0 === c ? -1 : c,
                                    e.set(y, u);
                            for (c = m; c <= b; c++)
                                y = o[c],
                                    u = e.get(y),
                                    void 0 !== u && -1 !== u ? (r[u] = i[c],
                                        p[u] = l[c],
                                        a && (g[u] = a[c]),
                                        u = t[u],
                                        e.set(y, u)) : l[c]();
                            for (u = m; u < w; u++)
                                u in r ? (i[u] = r[u],
                                    l[u] = p[u],
                                    a && (a[u] = g[u],
                                        a[u](u))) : i[u] = f(h);
                            i = i.slice(0, s = w),
                                o = d.slice(0)
                        }
                        return i
                    }
                    ));
                function h(e) {
                    if (l[u] = e,
                        a) {
                        const [e, n] = m(u);
                        return a[u] = n,
                            t(d[u], e)
                    }
                    return t(d[u])
                }
            }
    }((() => e.each), e.children, t || void 0))
}
function V(e) {
    const t = e.keyed
        , n = y((() => e.when), void 0, {
            equals: (e, n) => t ? e === n : !e == !n
        });
    return y((() => {
        const r = n();
        if (r) {
            const o = e.children;
            return "function" == typeof o && o.length > 0 ? w((() => o(t ? r : () => {
                if (!w(n))
                    throw I("Show");
                return e.when
            }
            ))) : o
        }
        return e.fallback
    }
    ), void 0, void 0)
}
function H(e) {
    let t = !1;
    const n = x((() => e.children))
        , r = y((() => {
            let e = n();
            Array.isArray(e) || (e = [e]);
            for (let n = 0; n < e.length; n++) {
                const r = e[n].when;
                if (r)
                    return t = !!e[n].keyed,
                        [n, r, e[n]]
            }
            return [-1]
        }
        ), void 0, {
            equals: (e, n) => e[0] === n[0] && (t ? e[1] === n[1] : !e[1] == !n[1]) && e[2] === n[2]
        });
    return y((() => {
        const [n, o, i] = r();
        if (n < 0)
            return e.fallback;
        const l = i.children;
        return "function" == typeof l && l.length > 0 ? w((() => l(t ? o : () => {
            if (w(r)[0] !== n)
                throw I("Match");
            return i.when
        }
        ))) : l
    }
    ), void 0, void 0)
}
function X(e) {
    return e
}
const G = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"])
    , W = new Set(["innerHTML", "textContent", "innerText", "children"])
    , Y = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    })
    , q = Object.assign(Object.create(null), {
        class: "className",
        formnovalidate: {
            $: "formNoValidate",
            BUTTON: 1,
            INPUT: 1
        },
        ismap: {
            $: "isMap",
            IMG: 1
        },
        nomodule: {
            $: "noModule",
            SCRIPT: 1
        },
        playsinline: {
            $: "playsInline",
            VIDEO: 1
        },
        readonly: {
            $: "readOnly",
            INPUT: 1,
            TEXTAREA: 1
        }
    });
const Z = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"])
    , K = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };
const J = "_$DX_DELEGATE";
function Q(e, t, n) {
    let r;
    const o = () => {
        const t = document.createElement("template");
        return t.innerHTML = e,
            n ? t.content.firstChild.firstChild : t.content.firstChild
    }
        , i = t ? () => (r || (r = o())).cloneNode(!0) : () => w((() => document.importNode(r || (r = o()), !0)));
    return i.cloneNode = i,
        i
}
function ee(e, t = window.document) {
    const n = t[J] || (t[J] = new Set);
    for (let r = 0, o = e.length; r < o; r++) {
        const o = e[r];
        n.has(o) || (n.add(o),
            t.addEventListener(o, ue))
    }
}
function te(e, t, n) {
    null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
}
function ne(e, t) {
    null == t ? e.removeAttribute("class") : e.className = t
}
function re(e, t, n, r) {
    if (r)
        Array.isArray(n) ? (e[`$$ ${t}`] = n[0],
            e[`$$ ${t}Data`] = n[1]) : e[`$$ ${t}`] = n;
    else if (Array.isArray(n)) {
        const r = n[0];
        e.addEventListener(t, n[0] = t => r.call(e, n[1], t))
    } else
        e.addEventListener(t, n)
}
function oe(e, t, n) {
    if (!t)
        return n ? te(e, "style") : t;
    const r = e.style;
    if ("string" == typeof t)
        return r.cssText = t;
    let o, i;
    for (i in "string" == typeof n && (r.cssText = n = void 0),
        n || (n = {}),
        t || (t = {}),
        n)
        null == t[i] && r.removeProperty(i),
            delete n[i];
    for (i in t)
        o = t[i],
            o !== n[i] && (r.setProperty(i, o),
                n[i] = o);
    return n
}
function ie(e, t = {}, n, r) {
    const o = {};
    return r || b((() => o.children = de(e, t.children, o.children))),
        b((() => t.ref && t.ref(e))),
        b((() => function (e, t, n, r, o = {}, i = !1) {
            t || (t = {});
            for (const l in o)
                if (!(l in t)) {
                    if ("children" === l)
                        continue;
                    o[l] = ce(e, l, null, o[l], n, i)
                }
            for (const l in t) {
                if ("children" === l) {
                    r || de(e, t.children);
                    continue
                }
                const s = t[l];
                o[l] = ce(e, l, s, o[l], n, i)
            }
        }(e, t, n, !0, o, !0))),
        o
}
function le(e, t, n) {
    return w((() => e(t, n)))
}
function se(e, t, n, r) {
    if (void 0 === n || r || (r = []),
        "function" != typeof t)
        return de(e, t, r, n);
    b((r => de(e, t(), r, n)), r)
}
function ae(e, t, n) {
    const r = t.trim().split(/\s+/);
    for (let o = 0, i = r.length; o < i; o++)
        e.classList.toggle(r[o], n)
}
function ce(e, t, n, r, o, i) {
    let l, s, a, c, u;
    if ("style" === t)
        return oe(e, n, r);
    if ("classList" === t)
        return function (e, t, n = {}) {
            const r = Object.keys(t || {})
                , o = Object.keys(n);
            let i, l;
            for (i = 0,
                l = o.length; i < l; i++) {
                const r = o[i];
                r && "undefined" !== r && !t[r] && (ae(e, r, !1),
                    delete n[r])
            }
            for (i = 0,
                l = r.length; i < l; i++) {
                const o = r[i]
                    , l = !!t[o];
                o && "undefined" !== o && n[o] !== l && l && (ae(e, o, !0),
                    n[o] = l)
            }
            return n
        }(e, n, r);
    if (n === r)
        return r;
    if ("ref" === t)
        i || n(e);
    else if ("on:" === t.slice(0, 3)) {
        const o = t.slice(3);
        r && e.removeEventListener(o, r),
            n && e.addEventListener(o, n)
    } else if ("oncapture:" === t.slice(0, 10)) {
        const o = t.slice(10);
        r && e.removeEventListener(o, r, !0),
            n && e.addEventListener(o, n, !0)
    } else if ("on" === t.slice(0, 2)) {
        const o = t.slice(2).toLowerCase()
            , i = Z.has(o);
        if (!i && r) {
            const t = Array.isArray(r) ? r[0] : r;
            e.removeEventListener(o, t)
        }
        (i || n) && (re(e, o, n, i),
            i && ee([o]))
    } else if ("attr:" === t.slice(0, 5))
        te(e, t.slice(5), n);
    else if ((u = "prop:" === t.slice(0, 5)) || (a = W.has(t)) || !o && ((c = function (e, t) {
        const n = q[e];
        return "object" == typeof n ? n[t] ? n.$ : void 0 : n
    }(t, e.tagName)) || (s = G.has(t))) || (l = e.nodeName.includes("-")))
        u && (t = t.slice(5),
            s = !0),
            "class" === t || "className" === t ? ne(e, n) : !l || s || a ? e[c || t] = n : e[(d = t,
                d.toLowerCase().replace(/-([a-z])/g, ((e, t) => t.toUpperCase())))] = n;
    else {
        const r = o && t.indexOf(":") > -1 && K[t.split(":")[0]];
        r ? function (e, t, n, r) {
            null == r ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r)
        }(e, r, t, n) : te(e, Y[t] || t, n)
    }
    var d;
    return n
}
function ue(e) {
    const t = `$$ ${e.type}`;
    let n = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== n && Object.defineProperty(e, "target", {
        configurable: !0,
        value: n
    }),
        Object.defineProperty(e, "currentTarget", {
            configurable: !0,
            get: () => n || document
        }); n;) {
        const r = n[t];
        if (r && !n.disabled) {
            const o = n[`${t}Data`];
            if (void 0 !== o ? r.call(n, o, e) : r.call(n, e),
                e.cancelBubble)
                return
        }
        n = n._$host || n.parentNode || n.host
    }
}
function de(e, t, n, r, o) {
    for (; "function" == typeof n;)
        n = n();
    if (t === n)
        return n;
    const i = typeof t
        , l = void 0 !== r;
    if (e = l && n[0] && n[0].parentNode || e,
        "string" === i || "number" === i)
        if ("number" === i && (t = t.toString()),
            l) {
            let o = n[0];
            o && 3 === o.nodeType ? o.data = t : o = document.createTextNode(t),
                n = ge(e, n, r, o)
        } else
            n = "" !== n && "string" == typeof n ? e.firstChild.data = t : e.textContent = t;
    else if (null == t || "boolean" === i)
        n = ge(e, n, r);
    else {
        if ("function" === i)
            return b((() => {
                let o = t();
                for (; "function" == typeof o;)
                    o = o();
                n = de(e, o, n, r)
            }
            )),
                () => n;
        if (Array.isArray(t)) {
            const i = []
                , s = n && Array.isArray(n);
            if (he(i, t, n, o))
                return b((() => n = de(e, i, n, r, !0))),
                    () => n;
            if (0 === i.length) {
                if (n = ge(e, n, r),
                    l)
                    return n
            } else
                s ? 0 === n.length ? pe(e, i, r) : function (e, t, n) {
                    let r = n.length
                        , o = t.length
                        , i = r
                        , l = 0
                        , s = 0
                        , a = t[o - 1].nextSibling
                        , c = null;
                    for (; l < o || s < i;)
                        if (t[l] !== n[s]) {
                            for (; t[o - 1] === n[i - 1];)
                                o--,
                                    i--;
                            if (o === l) {
                                const t = i < r ? s ? n[s - 1].nextSibling : n[i - s] : a;
                                for (; s < i;)
                                    e.insertBefore(n[s++], t)
                            } else if (i === s)
                                for (; l < o;)
                                    c && c.has(t[l]) || t[l].remove(),
                                        l++;
                            else if (t[l] === n[i - 1] && n[s] === t[o - 1]) {
                                const r = t[--o].nextSibling;
                                e.insertBefore(n[s++], t[l++].nextSibling),
                                    e.insertBefore(n[--i], r),
                                    t[o] = n[i]
                            } else {
                                if (!c) {
                                    c = new Map;
                                    let e = s;
                                    for (; e < i;)
                                        c.set(n[e], e++)
                                }
                                const r = c.get(t[l]);
                                if (null != r)
                                    if (s < r && r < i) {
                                        let a, u = l, d = 1;
                                        for (; ++u < o && u < i && null != (a = c.get(t[u])) && a === r + d;)
                                            d++;
                                        if (d > r - s) {
                                            const o = t[l];
                                            for (; s < r;)
                                                e.insertBefore(n[s++], o)
                                        } else
                                            e.replaceChild(n[s++], t[l++])
                                    } else
                                        l++;
                                else
                                    t[l++].remove()
                            }
                        } else
                            l++,
                                s++
                }(e, n, i) : (n && ge(e),
                    pe(e, i));
            n = i
        } else if (t.nodeType) {
            if (Array.isArray(n)) {
                if (l)
                    return n = ge(e, n, r, t);
                ge(e, n, null, t)
            } else
                null != n && "" !== n && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t);
            n = t
        } else
            console.warn("Unrecognized value. Skipped inserting", t)
    }
    return n
}
function he(e, t, n, r) {
    let o = !1;
    for (let i = 0, l = t.length; i < l; i++) {
        let l, s = t[i], a = n && n[i];
        if (null == s || !0 === s || !1 === s)
            ;
        else if ("object" == (l = typeof s) && s.nodeType)
            e.push(s);
        else if (Array.isArray(s))
            o = he(e, s, a) || o;
        else if ("function" === l)
            if (r) {
                for (; "function" == typeof s;)
                    s = s();
                o = he(e, Array.isArray(s) ? s : [s], Array.isArray(a) ? a : [a]) || o
            } else
                e.push(s),
                    o = !0;
        else {
            const t = String(s);
            a && 3 === a.nodeType && a.data === t ? e.push(a) : e.push(document.createTextNode(t))
        }
    }
    return o
}
function pe(e, t, n = null) {
    for (let r = 0, o = t.length; r < o; r++)
        e.insertBefore(t[r], n)
}
function ge(e, t, n, r) {
    if (void 0 === n)
        return e.textContent = "";
    const o = r || document.createTextNode("");
    if (t.length) {
        let r = !1;
        for (let i = t.length - 1; i >= 0; i--) {
            const l = t[i];
            if (o !== l) {
                const t = l.parentNode === e;
                r || i ? t && l.remove() : t ? e.replaceChild(o, l) : e.insertBefore(o, n)
            } else
                r = !0
        }
    } else
        e.insertBefore(o, n);
    return [o]
}
const fe = "http://www.w3.org/2000/svg";
function me(t) {
    const { useShadow: n } = t
        , r = document.createTextNode("")
        , o = c;
    let i;
    return v((() => {
        i || (i = function (e, t) {
            const n = c
                , r = d;
            c = e,
                d = null;
            try {
                return B(t, !0)
            } catch (o) {
                D(o)
            } finally {
                c = n,
                    d = r
            }
        }(o, (() => t.children)));
        const e = t.mount || document.body;
        if (e instanceof HTMLHeadElement) {
            const [t, n] = m(!1)
                , r = () => n(!0);
            f((n => se(e, (() => t() ? n() : i), null))),
                C(r)
        } else {
            const o = function (e, t = !1) {
                return t ? document.createElementNS(fe, e) : document.createElement(e)
            }(t.isSVG ? "g" : "div", t.isSVG)
                , l = n && o.attachShadow ? o.attachShadow({
                    mode: "open"
                }) : o;
            Object.defineProperty(o, "_$host", {
                get: () => r.parentNode,
                configurable: !0
            }),
                se(l, i),
                e.appendChild(o),
                t.ref && t.ref(o),
                C((() => e.removeChild(o)))
        }
    }
    ), void 0, {
        render: !!!e.context
    }),
        r
}
const be = Symbol("store-raw")
    , ve = Symbol("store-node");
function ye(e) {
    let t = e[n];
    if (!t && (Object.defineProperty(e, n, {
        value: t = new Proxy(e, $e)
    }),
        !Array.isArray(e))) {
        const n = Object.keys(e)
            , r = Object.getOwnPropertyDescriptors(e);
        for (let o = 0, i = n.length; o < i; o++) {
            const i = n[o];
            r[i].get && Object.defineProperty(e, i, {
                enumerable: r[i].enumerable,
                get: r[i].get.bind(t)
            })
        }
    }
    return t
}
function we(e) {
    let t;
    return null != e && "object" == typeof e && (e[n] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e))
}
function _e(e, t = new Set) {
    let n, r, o, i;
    if (n = null != e && e[be])
        return n;
    if (!we(e) || t.has(e))
        return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
        for (let n = 0, i = e.length; n < i; n++)
            o = e[n],
                (r = _e(o, t)) !== o && (e[n] = r)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
        const n = Object.keys(e)
            , l = Object.getOwnPropertyDescriptors(e);
        for (let s = 0, a = n.length; s < a; s++)
            i = n[s],
                l[i].get || (o = e[i],
                    (r = _e(o, t)) !== o && (e[i] = r))
    }
    return e
}
function Ce(e) {
    let t = e[ve];
    return t || Object.defineProperty(e, ve, {
        value: t = Object.create(null)
    }),
        t
}
function ke(e, t, n) {
    return e[t] || (e[t] = Le(n))
}
function xe(e) {
    if (k()) {
        const t = Ce(e);
        (t._ || (t._ = Le()))()
    }
}
function Le(e) {
    const [t, n] = m(e, {
        equals: !1,
        internal: !0
    });
    return t.$ = n,
        t
}
const $e = {
    get(e, t, o) {
        if (t === be)
            return e;
        if (t === n)
            return o;
        if (t === r)
            return xe(e),
                o;
        const i = Ce(e)
            , l = i[t];
        let s = l ? l() : e[t];
        if (t === ve || "__proto__" === t)
            return s;
        if (!l) {
            const n = Object.getOwnPropertyDescriptor(e, t);
            !k() || "function" == typeof s && !e.hasOwnProperty(t) || n && n.get || (s = ke(i, t, s)())
        }
        return we(s) ? ye(s) : s
    },
    has(e, t) {
        return t === be || t === n || t === r || t === ve || "__proto__" === t || (this.get(e, t, e),
            t in e)
    },
    set: () => !0,
    deleteProperty: () => !0,
    ownKeys: function (e) {
        return xe(e),
            Reflect.ownKeys(e)
    },
    getOwnPropertyDescriptor: function (e, t) {
        const r = Reflect.getOwnPropertyDescriptor(e, t);
        return r && !r.get && r.configurable && t !== n && t !== ve ? (delete r.value,
            delete r.writable,
            r.get = () => e[n][t],
            r) : r
    }
};
function Me(e, t, n, r = !1) {
    if (!r && e[t] === n)
        return;
    const o = e[t]
        , i = e.length;
    void 0 === n ? delete e[t] : e[t] = n;
    let l, s = Ce(e);
    if ((l = ke(s, t, o)) && l.$((() => n)),
        Array.isArray(e) && e.length !== i) {
        for (let t = e.length; t < i; t++)
            (l = s[t]) && l.$();
        (l = ke(s, "length", i)) && l.$(e.length)
    }
    (l = s._) && l.$()
}
function Ae(e, t) {
    const n = Object.keys(t);
    for (let r = 0; r < n.length; r += 1) {
        const o = n[r];
        Me(e, o, t[o])
    }
}
function Se(e, t, n = []) {
    let r, o = e;
    if (t.length > 1) {
        r = t.shift();
        const i = typeof r
            , l = Array.isArray(e);
        if (Array.isArray(r)) {
            for (let o = 0; o < r.length; o++)
                Se(e, [r[o]].concat(t), n);
            return
        }
        if (l && "function" === i) {
            for (let o = 0; o < e.length; o++)
                r(e[o], o) && Se(e, [o].concat(t), n);
            return
        }
        if (l && "object" === i) {
            const { from: o = 0, to: i = e.length - 1, by: l = 1 } = r;
            for (let r = o; r <= i; r += l)
                Se(e, [r].concat(t), n);
            return
        }
        if (t.length > 1)
            return void Se(e[r], t, [r].concat(n));
        o = e[r],
            n = [r].concat(n)
    }
    let i = t[0];
    "function" == typeof i && (i = i(o, n),
        i === o) || void 0 === r && null == i || (i = _e(i),
            void 0 === r || we(o) && we(i) && !Array.isArray(i) ? Ae(o, i) : Me(e, r, i))
}
function Be(...[e, t]) {
    const n = _e(e || {})
        , r = Array.isArray(n);
    return [ye(n), function (...e) {
        B((() => {
            r && 1 === e.length ? function (e, t) {
                if ("function" == typeof t && (t = t(e)),
                    t = _e(t),
                    Array.isArray(t)) {
                    if (e === t)
                        return;
                    let n = 0
                        , r = t.length;
                    for (; n < r; n++) {
                        const r = t[n];
                        e[n] !== r && Me(e, n, r)
                    }
                    Me(e, "length", r)
                } else
                    Ae(e, t)
            }(n, e[0]) : Se(n, e)
        }
        ), !1)
    }
    ]
}
const Pe = Symbol("store-root");
function ze(e, t, n, r, o) {
    const i = t[n];
    if (e === i)
        return;
    if (n !== Pe && (!we(e) || !we(i) || o && e[o] !== i[o]))
        return void Me(t, n, e);
    if (Array.isArray(e)) {
        if (e.length && i.length && (!r || o && e[0] && null != e[0][o])) {
            let t, n, l, s, a, c, u, d;
            for (l = 0,
                s = Math.min(i.length, e.length); l < s && (i[l] === e[l] || o && i[l] && e[l] && i[l][o] === e[l][o]); l++)
                ze(e[l], i, l, r, o);
            const h = new Array(e.length)
                , p = new Map;
            for (s = i.length - 1,
                a = e.length - 1; s >= l && a >= l && (i[s] === e[a] || o && i[l] && e[l] && i[s][o] === e[a][o]); s--,
                a--)
                h[a] = i[s];
            if (l > a || l > s) {
                for (n = l; n <= a; n++)
                    Me(i, n, e[n]);
                for (; n < e.length; n++)
                    Me(i, n, h[n]),
                        ze(e[n], i, n, r, o);
                return void (i.length > e.length && Me(i, "length", e.length))
            }
            for (u = new Array(a + 1),
                n = a; n >= l; n--)
                c = e[n],
                    d = o && c ? c[o] : c,
                    t = p.get(d),
                    u[n] = void 0 === t ? -1 : t,
                    p.set(d, n);
            for (t = l; t <= s; t++)
                c = i[t],
                    d = o && c ? c[o] : c,
                    n = p.get(d),
                    void 0 !== n && -1 !== n && (h[n] = i[t],
                        n = u[n],
                        p.set(d, n));
            for (n = l; n < e.length; n++)
                n in h ? (Me(i, n, h[n]),
                    ze(e[n], i, n, r, o)) : Me(i, n, e[n])
        } else
            for (let t = 0, n = e.length; t < n; t++)
                ze(e[t], i, t, r, o);
        return void (i.length > e.length && Me(i, "length", e.length))
    }
    const l = Object.keys(e);
    for (let a = 0, c = l.length; a < c; a++)
        ze(e[l[a]], i, l[a], r, o);
    const s = Object.keys(i);
    for (let a = 0, c = s.length; a < c; a++)
        void 0 === e[s[a]] && Me(i, s[a], void 0)
}
function Te(e, t = {}) {
    const { merge: n, key: r = "id" } = t
        , o = _e(e);
    return e => {
        if (!we(e) || !we(o))
            return o;
        const t = ze(o, {
            [Pe]: e
        }, Pe, n, r);
        return void 0 === t ? e : t
    }
}
function Ne(e, t) {
    return fetch("/backend/" + e, t)
}
class Ee {
    constructor() {
        this.abortController = null
    }
    abort() {
        this.abortController && (this.abortController.abort(),
            this.abortController = null)
    }
    get(e) {
        this.abort();
        try {
            this.abortController = new AbortController
        } catch (t) { }
        return new Promise((async (t, n) => {
            var r;
            try {
                const n = await Ne(e, {
                    signal: null == (r = this.abortController) ? void 0 : r.signal
                });
                t(await n.json())
            } catch (o) {
                "AbortError" !== (null == o ? void 0 : o.name) && n(o)
            }
        }
        ))
    }
}
let De = Date.now();
function Oe() {
    return "" + De++
}
function Re(e, t) {
    return {
        id: Oe(),
        name: "",
        color: "performance",
        content: "performance",
        size: t,
        period: e
    }
}
function je(e) {
    return {
        type: "slice",
        from: e - 99,
        to: e
    }
}
class Fe {
}
Fe.appName = "Crypto Bubbles",
    Fe.usernameTwitter = "CryptoBubbles",
    Fe.usernameInstagram = "cryptobubbles",
    Fe.usernameTelegram = "CryptoBubbles",
    Fe.emailAddress = "contact@cryptobubbles.net",
    Fe.imageLogo = "/images/logo64.png",
    Fe.urlGooglePlay = "https://play.google.com/store/apps/details?id=net.cryptobubbles",
    Fe.urlAppStore = "https://apps.apple.com/app/id1599892658",
    Fe.bubbleCanvasPadding = Math.round(2 * window.devicePixelRatio),
    Fe.bubbleBorderWidth = Math.round(2 * window.devicePixelRatio),
    Fe.bubbleExtraHitbox = Math.round(4 * window.devicePixelRatio),
    Fe.defaultFilter = je(100);
const Ie = {
    id: "en",
    flag: "🇺🇸",
    name: "English",
    loading: "Content is loading...",
    currencyName: "Name",
    settings: "Settings",
    currency: "Currency",
    language: "Language",
    colors: "Colors",
    red_green: "Red + Green",
    yellow_blue: "Yellow + Blue",
    rank: "Rank",
    marketcap: "Market Cap",
    volume: "24h Volume",
    price: "Price",
    dominance: "Dominance",
    performance: "Performance",
    neutral: "Neutral",
    period_hour: "Hour",
    period_day: "Day",
    period_week: "Week",
    period_month: "Month",
    period_year: "Year",
    favorites: "Favorites",
    add_favorite: "Add to favorites",
    remove_favorite: "Remove from favorites",
    search_crypto: "Search cryptocurrency",
    bubble_size: "Bubble size",
    bubble_content: "Bubble content",
    bubble_color: "Bubble color",
    period: "Period",
    description: "Interactive bubble chart for the TOP 1000 cryptocurrencies",
    support_my_work: "Support my work",
    window_close: "Close window",
    window_toggleExpand: "Toggle expansion",
    configuration_add: "Add chart",
    configuration_edit: "Edit chart",
    copy: "Copy",
    not_found: "Not found in the TOP 1000",
    scroll_toast: "Search + List",
    links: "Links",
    exchanges: "Exchanges",
    pages: "Pages",
    empty_list: 'List "(name)" is empty',
    delete: "Delete",
    lists: "Lists",
    show: "Show",
    hide: "Hide",
    watchlist_add: "Add Watchlist",
    add_to_list: "Add to List",
    blocklist: "Blocklist",
    watchlist: "Watchlist",
    watchlists: "Watchlists",
    cancel: "Cancel",
    confirm: "Confirm",
    trade: "Trade",
    info_tooltip: "View (currency) on (service)",
    trade_tooltip: "Trade (currency) on (exchange)",
    show_more: "Show More"
}
    , Ue = Q('<svg viewBox="0 0 2500 2500"><path fill="#fdd430" d="M764.48,1050.52,1250,565l485.75,485.73,282.5-282.5L1250,0,482,768l282.49,282.5M0,1250,282.51,967.45,565,1249.94,282.49,1532.45Zm764.48,199.51L1250,1935l485.74-485.72,282.65,282.35-.14.15L1250,2500,482,1732l-.4-.4,282.91-282.12M1935,1250.12l282.51-282.51L2500,1250.1,2217.5,1532.61Z"></path><path fill="#fdd430" d="M1536.52,1249.85h.12L1250,963.19,1038.13,1175h0l-24.34,24.35-50.2,50.21-.4.39.4.41L1250,1536.81l286.66-286.66.14-.16-.26-.14">')
    , Ve = Q('<svg viewBox="0 0 24 24"><path fill="#24ae8f" d="m7.9 12 7.1 6.5 4.5-4.1a2 1.9 0 1 1 2.9 2.6l-5.9 5.4a2.1 1.9 0 0 1-2.9 0l-8.5-7.8v4.7a2 1.9 0 1 1-4.1 0v-15a2 1.9 0 1 1 4.1 0v4.7l8.5-7.8a2.1 1.9 0 0 1 2.9 0l5.9 5.4a2 1.9 0 1 1-2.9 2.6l-4.5-4.1zm7.1-1.9a2 1.9 0 1 0 2 1.9 2 1.9 0 0 0-2-1.9z">')
    , He = Q('<svg viewBox="8 8 84 84"><path fill="#F7A600" d="m69.17248,54.28325l0,-22.3572l4.4939,0l0,22.3572l-4.4939,0z"></path><path fill="white" d="m16.79825,60.92435l-9.63407,0l0,-22.35719l9.24666,0c4.49394,0 7.11244,2.44919 7.11244,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.1679,2.0404 3.1679,5.0249c0,4.1749 -2.9407,6.4359 -7.04723,6.4359zm-0.74311,-18.4628l-4.39706,0l0,5.1497l4.39706,0c1.90714,0 2.97424,-1.0364 2.97424,-2.5757c0,-1.5376 -1.0671,-2.574 -2.97424,-2.574zm0.29055,9.0749l-4.68761,0l0,5.4952l4.68761,0c2.03739,0 3.00589,-1.2553 3.00589,-2.7638c0,-1.5068 -0.9703,-2.7314 -3.00589,-2.7314z"></path><path fill="white" d="m37.55238,51.75535l0,9.169l-4.4622,0l0,-9.169l-6.9187,-13.18819l4.8813,0l4.3002,9.01159l4.2351,-9.01159l4.8813,0l-6.917,13.18819z"></path><path fill="white" d="m57.20988,60.92435l-9.6341,0l0,-22.35719l9.2467,0c4.4939,0 7.1124,2.44919 7.1124,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.168,2.0404 3.168,5.0249c0,4.1749 -2.9408,6.4359 -7.0473,6.4359zm-0.7431,-18.4628l-4.3971,0l0,5.1497l4.3971,0c1.9071,0 2.9742,-1.0364 2.9742,-2.5757c0,-1.5376 -1.0671,-2.574 -2.9742,-2.574zm0.2905,9.0749l-4.6876,0l0,5.4952l4.6876,0c2.0374,0 3.0059,-1.2553 3.0059,-2.7638c0,-1.5068 -0.9685,-2.7314 -3.0059,-2.7314z"></path><path fill="white" d="m88.15018,42.46155l0,18.4645l-4.4939,0l0,-18.4645l-6.0136,0l0,-3.89439l16.5211,0l0,3.89439l-6.0136,0z">')
    , Xe = Q('<svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" fill="#000"></rect><rect x="6" y="6" width="4" height="4" fill="#fff"></rect><rect x="14" y="6" width="4" height="4" fill="#fff"></rect><rect x="10" y="10" width="4" height="4" fill="#fff"></rect><rect x="6" y="14" width="4" height="4" fill="#fff"></rect><rect x="14" y="14" width="4" height="4" fill="#fff">')
    , Ge = Q('<svg viewBox="0 0 2500 2500"><path d="M2459.7,1566.6l-540.6-937.7c-118.5-195.5-407.5-197.5-521.9,8.3l-567.6,975.2 c-106,178.8,25,403.3,237.1,403.3H2204C2418.1,2015.7,2578.2,1784.9,2459.7,1566.6z" fill="#3156AA"></path><path d="M1680,1639.4l-33.3-58.2c-31.2-54.1-99.8-170.5-99.8-170.5l-457.4-794.3C971,439.7,690.3,425.1,571.8,647.6 L39.5,1568.7c-110.2,193.4,20.8,444.9,259.9,447h1131.1h482.4h286.9C1906.7,2017.8,1813.1,1866,1680,1639.4L1680,1639.4z" fill="#1972E2"></path><linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="703" y1="1211" x2="1935" y2="727.2267" gradientTransform="matrix(1 0 0 -1 0 2497.8899)"><stop offset="0" style="stop-color:#264CA2;stop-opacity:0"></stop><stop offset="1" style="stop-color:#234588"></stop></linearGradient><path d="M1680.1,1639.4l-33.3-58.2c-31.2-54.1-99.8-170.5-99.8-170.5l-295.3-519.8l-424.2,723.6 c-106,178.8,25,403.4,237,403.4h363.9h482.4h289C1904.6,2015.7,1813.1,1866,1680.1,1639.4L1680.1,1639.4z" fill="url(#gradient)">')
    , We = Q('<svg viewBox="0 0 229 229"><path fill="#2354e6" d="M114.475154,177.475321 C79.7034538,177.475321 51.5151256,149.282841 51.5151256,114.500713 C51.5151256,79.7209602 79.7034538,51.5237291 114.475154,51.5237291 L114.475154,-0.000950201555 C51.2515057,-0.000950201555 -1.68750626e-14,51.2624237 -1.68750626e-14,114.500713 C-1.68750626e-14,177.736626 51.2515057,229 114.475154,229 C177.696428,229 228.950308,177.736626 228.950308,114.500713 L177.435183,114.500713 C177.435183,149.282841 149.246855,177.475321 114.475154,177.475321"></path><polygon fill="#17E6A1" points="114.474679 114.499287 177.434708 114.499287 177.434708 51.5246793 114.474679 51.5246793">')
    , Ye = Q('<svg viewBox="62 62 900 900"><path d="M512.147 692C412.697 692 332.146 611.45 332.146 512C332.146 412.55 412.697 332 512.147 332C601.247 332 675.197 396.95 689.447 482H870.797C855.497 297.2 700.846 152 512.147 152C313.396 152 152.146 313.25 152.146 512C152.146 710.75 313.396 872 512.147 872C700.846 872 855.497 726.8 870.797 542H689.297C675.047 627.05 601.247 692 512.147 692Z" fill="#fff">')
    , qe = class {
    }
    ;
let Ze = qe;
function Ke(e) {
    const t = {};
    for (const n of e)
        t[n] = !0;
    return t
}
function Je(e) {
    const t = [];
    for (const n in e)
        e[n] && t.push(n);
    return t
}

function nt() {
    return {
        id: Oe(),
        name: "",
        record: {}
    }
}
const rt = tt.load()
    , ot = (it = rt) && it.configurations2 && it.configurations2.length > 0 ? it.configurations2 : [Re("hour", "performance"), Re("day", "performance"), Re("week", "performance"), Re("month", "performance"), Re("year", "performance"), Re("day", "marketcap")];
var it;
const lt = function (e) {
    return Ze.baseCurrencies.find((t => t.id === (null == e ? void 0 : e.baseCurrency))) || Ze.baseCurrencyUSD
}(rt)
    , [st, at] = m(lt)
    , [ct, ut] = m(function (e) {
        return e && e.currencyFilter && e.currencyFilter.type ? e.currencyFilter : Fe.defaultFilter
    }(rt))
    , [dt, ht] = m(function (e) {
        const t = Ze.translations.find((t => t.id === (null == e ? void 0 : e.translation)));
        if (t)
            return t;
        if (navigator.language) {
            const e = navigator.language.toLowerCase();
            for (const t of Ze.translations)
                if (e.startsWith(t.id.toLowerCase()))
                    return t
        }
        return Ie
    }(rt))
    , [pt, gt] = m(function (e) {
        return e && e.colors ? e.colors : "red-green"
    }(rt))
    , [ft, mt] = Be(ot)
    , [bt, vt] = m(function (e, t) {
        if (e && e.configurationId2)
            return e.configurationId2;
        {
            let e = t.findIndex((e => "day" === e.period && "performance" === e.size));
            return -1 === e && (e = 0),
                t[e].id
        }
    }(rt, ot))
    , [yt, wt] = Be(function (e) {
        return (null == e ? void 0 : e.favoritesCMC) ? Ke(e.favoritesCMC) : {}
    }(rt))
    , [_t, Ct] = Be(function (e) {
        return (null == e ? void 0 : e.listBlock) ? Ke(e.listBlock) : {}
    }(rt))
    , [kt, xt] = Be(function (e) {
        return (null == e ? void 0 : e.listsWatch) ? e.listsWatch.map((e => ({
            id: e.id,
            name: e.name,
            record: Ke(e.items)
        }))) : [nt()]
    }(rt))
    , [Lt, $t] = m(function (e) {
        return !(!e || "boolean" != typeof e.hideStables) && e.hideStables
    }(rt))
    , [Mt, At] = Be([])
    , [St, Bt] = m("bubbles")
    , [Pt, zt] = m(null)
    , [Tt, Nt] = m("loading")
    , [Et, Dt] = m(null)
    , [Ot, Rt] = m(lt)
    , jt = new Ee;
function Ft() {
    const e = Ot()
        , t = `data/bubbles1000.${e.id}.json`;
    jt.get(t).then((t => {
        for (const e of t)
            e.image = "/backend/" + e.image,
                e.nameUpper = e.name.toUpperCase();
        at(e),
            At(Te(t)),
            Nt("loaded")
    }
    )).catch((() => {
        Nt("loading-failed"),
            Rt((() => st()))
    }
    ))
}
function It(e, t) {
    Ne(e, {
        method: "POST",
        body: t
    })
}
class Ut {
    constructor() {
        this.listeners = []
    }
    register(e) {
        this.listeners.push(e)
    }
    unregister(e) {
        this.listeners = this.listeners.filter((t => t !== e))
    }
    fire(e) {
        for (const t of this.listeners)
            t(e)
    }
}
const Vt = "abcdefghjiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
class Ht {
    static create(e) {
        const t = navigator.userAgent.toLowerCase()
            , n = -1 !== t.indexOf("android")
            , r = -1 !== t.indexOf("iphone") || -1 !== t.indexOf("ipad");
        this.env = e,
            this.isWeb = "web" === e || "pwa" === e,
            this.isMobile = n || r || "android" === e || "ios" === e,
            this.isDesktop = !this.isMobile,
            this.isMissingAndroidApp = "web" === e && n,
            this.isMissingIosApp = "web" === e && r,
            this.generateId(),
            this.addListeners(),
            this.postAccess(e)
    }
    static generateId() {
        for (let e = 0; e < 6; e++)
            this.id += Vt[Math.floor(62 * Math.random())]
    }
    static addListeners() {
        window.onCryptoBubblesBack = () => this.closeWindow(),
            window.addEventListener("error", (e => this.handleError(e))),
            window.addEventListener("keydown", (e => {
                "Escape" === e.key && this.closeWindow()
            }
            ))
    }
    static postAccess(e) {
        const t = new FormData;
        t.append("session", this.id),
            t.append("isMobile", this.isMobile ? "1" : "0"),
            t.append("translation", dt().id),
            t.append("basecurrency", st().id),
            document.referrer && t.append("referer", document.referrer);
        const n = [e, "2023-6-5-16-15"];
        t.append("env", n.join("-")),
            It("access.php", t)
    }
    static closeWindow() {
        return !this.closeListener || (this.closeListener(),
            this.closeListener = null,
            !1)
    }
    static handleError(e) {
        if (this.errorsLeft > 0) {
            const { filename: t, lineno: n, colno: r, message: o } = e;
            this.errorsLeft--,
                this.logAction("ERROR", `${t}:${n}:${r} ${o}`)
        }
    }
    static logAction(e, t = null) {
        const n = new FormData;
        n.append("session", this.id),
            n.append("type", e),
            null !== t && n.append("extra", t),
            It("action.php", n)
    }
    static registerCloseListener(e) {
        this.closeListener && this.closeListener !== e && this.closeListener(),
            this.closeListener = e
    }
    static unregisterCloseListener(e) {
        this.closeListener === e && (this.closeListener = null)
    }
    static updateData() {
        Ft(),
            this.eventUpdateData.fire()
    }
}
Ht.eventUpdateData = new Ut,
    Ht.errorsLeft = 3,
    Ht.id = "",
    Ht.closeListener = null;
const Xt = Q('<svg viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z">')
    , Gt = e => (() => {
        const t = Xt();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , Wt = Q('<a target="_blank" rel="noopener">');
function Yt(e) {
    return (() => {
        const t = Wt();
        return t.$$click = () => Ht.logAction("CLICK_LINK", e.name),
            se(t, (() => e.children)),
            b((n => {
                const r = e.href
                    , o = e.title
                    , i = e.class;
                return r !== n._v$ && te(t, "href", n._v$ = r),
                    o !== n._v$2 && te(t, "title", n._v$2 = o),
                    i !== n._v$3 && ne(t, n._v$3 = i),
                    n
            }
            ), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            t
    }
    )()
}
ee(["click"]);
const qt = Q("<span>Download App");
function Zt() {
    return F(Yt, {
        class: "banner",
        get href() {
            return Fe.urlGooglePlay
        },
        title: "Download App",
        name: "GooglePlay_Banner",
        get children() {
            return [qt(), F(Gt, {
                class: "banner-icon"
            })]
        }
    })
}
const Kt = Q('<svg viewBox="4 4 42 42"><path d="M 14 3.9902344 C 8.4886661 3.9902344 4 8.4789008 4 13.990234 L 4 35.990234 C 4 41.501568 8.4886661 45.990234 14 45.990234 L 36 45.990234 C 41.511334 45.990234 46 41.501568 46 35.990234 L 46 13.990234 C 46 8.4789008 41.511334 3.9902344 36 3.9902344 L 14 3.9902344 z M 14 5.9902344 L 36 5.9902344 C 40.430666 5.9902344 44 9.5595687 44 13.990234 L 44 35.990234 C 44 40.4209 40.430666 43.990234 36 43.990234 L 14 43.990234 C 9.5693339 43.990234 6 40.4209 6 35.990234 L 6 13.990234 C 6 9.5595687 9.5693339 5.9902344 14 5.9902344 z M 22.572266 11.892578 C 22.187855 11.867986 21.790969 11.952859 21.433594 12.162109 C 20.480594 12.721109 20.161703 13.947391 20.720703 14.900391 L 22.53125 17.990234 L 16.666016 28 L 12 28 C 10.896 28 10 28.896 10 30 C 10 31.104 10.896 32 12 32 L 27.412109 32 C 27.569109 31.237 27.473203 30.409531 27.033203 29.644531 L 27.029297 29.640625 C 26.642297 28.966625 26.105469 28.416 25.480469 28 L 21.302734 28 L 28.978516 14.898438 C 29.536516 13.945438 29.216672 12.720109 28.263672 12.162109 C 27.309672 11.604109 26.085344 11.923953 25.527344 12.876953 L 24.849609 14.033203 L 24.171875 12.876953 C 23.8225 12.281328 23.212949 11.933564 22.572266 11.892578 z M 28.310547 19.941406 L 27.484375 21.314453 C 26.572375 22.830453 26.542953 24.706859 27.376953 26.255859 L 33.673828 37.001953 C 34.045828 37.637953 34.713391 37.990234 35.400391 37.990234 C 35.743391 37.990234 36.092156 37.902797 36.410156 37.716797 C 37.363156 37.158797 37.682047 35.933469 37.123047 34.980469 L 35.376953 32 L 38 32 C 39.104 32 40 31.104 40 30 C 40 28.896 39.104 28 38 28 L 33.033203 28 L 28.310547 19.941406 z M 14.625 34.003906 C 14.068 33.987906 13.526719 34.074328 13.011719 34.236328 L 12.566406 34.994141 C 12.007406 35.946141 12.32825 37.172469 13.28125 37.730469 C 13.59925 37.917469 13.946063 38.005859 14.289062 38.005859 C 14.976062 38.005859 15.644578 37.650625 16.017578 37.015625 L 17.09375 35.179688 C 16.50875 34.496688 15.653859 34.033906 14.630859 34.003906 L 14.625 34.003906 z">')
    , Jt = e => (() => {
        const t = Kt();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , Qt = Q("<span>Download App");
function en() {
    return F(Yt, {
        class: "banner",
        get href() {
            return Fe.urlAppStore
        },
        title: "Download App",
        name: "AppStore_Banner",
        get children() {
            return [Qt(), F(Jt, {
                class: "banner-icon"
            })]
        }
    })
}
function tn() {
    return F(H, {
        get children() {
            return [F(X, {
                get when() {
                    return Ht.isMissingAndroidApp
                },
                get children() {
                    return F(Zt, {})
                }
            }), F(X, {
                get when() {
                    return Ht.isMissingIosApp
                },
                get children() {
                    return F(en, {})
                }
            })]
        }
    })
}
function nn(...e) {
    return e.filter((e => Boolean(e))).join(" ")
}
const rn = Q("<button>");
function on(e) {
    return (() => {
        const t = rn();
        return re(t, "click", e.onClick, !0),
            se(t, (() => e.children)),
            b((n => {
                const r = nn("icon-button", e.small && "small", e.active && "active", e.class)
                    , o = e.title;
                return r !== n._v$ && ne(t, n._v$ = r),
                    o !== n._v$2 && te(t, "title", n._v$2 = o),
                    n
            }
            ), {
                _v$: void 0,
                _v$2: void 0
            }),
            t
    }
    )()
}
ee(["click"]);
const ln = Q('<div class="data-updater">');
function sn() {
    let e;
    const t = () => {
        window.clearTimeout(e),
            e = window.setTimeout((() => requestAnimationFrame(t)), 7e4),
            Ht.updateData()
    }
        ;
    return (() => {
        const e = ln();
        return e.addEventListener("animationiteration", t),
            e
    }
    )()
}
const an = Q('<svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z">')
    , cn = e => (() => {
        const t = an();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , un = Q('<ul class="menu">');
function dn(e) {
    return (() => {
        const t = un();
        return se(t, (() => e.children)),
            t
    }
    )()
}
const hn = Q('<li class="menu-item"><span>');
function pn(e) {
    return (() => {
        const t = hn()
            , n = t.firstChild;
        return re(t, "click", e.onClick, !0),
            se(t, (() => e.left), n),
            se(n, (() => e.text)),
            se(t, (() => e.right), null),
            t
    }
    )()
}
ee(["click"]);
const gn = Q('<svg width="24" height="12" viewBox="0 6 24 12"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z">')
    , fn = e => (() => {
        const t = gn();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , mn = Q('<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z">')
    , bn = e => (() => {
        const t = mn();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , vn = Q('<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z">')
    , yn = e => (() => {
        const t = vn();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , wn = Q('<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z">')
    , _n = e => (() => {
        const t = wn();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , Cn = Q('<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z">')
    , kn = e => (() => {
        const t = Cn();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , xn = Q("<div>");
function Ln(e) {
    const [t, n] = m(!1);
    let r;
    function o() {
        e.onClose()
    }
    window.setTimeout((() => n(!0)), 20),
        document.addEventListener("click", o),
        C((() => {
            document.removeEventListener("click", o)
        }
        ));
    const i = y((() => {
        const t = e.anchor.getBoundingClientRect()
            , n = t.x + t.width / 2
            , r = t.y + t.height / 2
            , o = n > window.innerWidth / 2
            , i = r > window.innerHeight / 2
            , l = o ? i ? [1, 0, -1, -1] : [1, 1, -1, 0] : i ? [0, 0, 0, -1] : [0, 1, 0, 0];
        return {
            left: Math.round(t.left + t.width * l[0]),
            top: Math.round(t.top + t.height * l[1]),
            transformX: `${Math.round(100 * l[2])}%`,
            transformY: `${Math.round(100 * l[3])}%`,
            sideY: i
        }
    }
    ))
        , l = y((() => {
            const n = i()
                , r = [`translate(${n.transformX},${n.transformY})`, `scaleY(${t() ? 1 : .6})`]
                , o = [`left:${n.left}px`, `top:${n.top}px`, `transform:${r.join(" ")}`, "opacity:" + (t() ? 1 : 0), "transform-origin:0 " + (n.sideY ? "100%" : "0%")];
            return e.width && o.push(`width:${e.width}px`),
                o.join(";")
        }
        ));
    return F(me, {
        get children() {
            const t = xn();
            return "function" == typeof r ? le(r, t) : r = t,
                se(t, (() => e.children)),
                b((n => {
                    const r = nn("popup", e.anchor && "open")
                        , o = l();
                    return r !== n._v$ && ne(t, n._v$ = r),
                        n._v$2 = oe(t, o, n._v$2),
                        n
                }
                ), {
                    _v$: void 0,
                    _v$2: void 0
                }),
                t
        }
    })
}
function $n(e) {
    const t = () => e.options[e.index];
    return F(V, {
        get when() {
            return t()
        },
        get children() {
            return F(on, {
                class: "select-navigator",
                get title() {
                    return t().label
                },
                onClick: () => e.onChange(t().value),
                get children() {
                    return e.children
                }
            })
        }
    })
}
const Mn = Q("<button>");
function An(e) {
    return (() => {
        const t = Mn();
        return re(t, "click", e.onClick, !0),
            se(t, (() => e.children)),
            b((n => {
                const r = nn("solid-button", e.active && "active", e.class)
                    , o = e.title;
                return r !== n._v$ && ne(t, n._v$ = r),
                    o !== n._v$2 && te(t, "title", n._v$2 = o),
                    n
            }
            ), {
                _v$: void 0,
                _v$2: void 0
            }),
            t
    }
    )()
}
ee(["click"]);
const Sn = Q('<fieldset class="select-options"><legend class="select-options-label">');
function Bn(e) {
    return (() => {
        const t = Sn();
        return se(t.firstChild, (() => e.label)),
            se(t, F(U, {
                get each() {
                    return e.children
                },
                children: t => F(An, {
                    get active() {
                        return t.value === e.value
                    },
                    class: "select-option",
                    onClick: () => e.onChange(t.value),
                    get children() {
                        return [F(V, {
                            keyed: !0,
                            get when() {
                                return t.iconComponent
                            },
                            children: e => F(e, {})
                        }), y((() => t.label))]
                    }
                })
            }), null),
            t
    }
    )()
}
const Pn = Q('<div class="select-popup">');
function zn(e) {
    const [t, n] = m(null);
    function r(t) {
        e.onChange(t)
    }
    const o = y((() => JSON.stringify(e.value)))
        , i = y((() => {
            const t = [];
            for (const n of e.children)
                for (const e of n.options)
                    t.push(e);
            return t
        }
        ))
        , l = y((() => {
            let t = 0;
            for (const n of e.children)
                for (const e of n.options) {
                    if (JSON.stringify(e.value) === o())
                        return {
                            index: t,
                            option: e
                        };
                    t++
                }
            return {
                index: 0,
                option: e.children[0].options[0]
            }
        }
        ))
        , s = () => e.children.length > 1 || e.children[0].options.length > 5;
    return [F(V, {
        get when() {
            return e.withNavigator
        },
        get children() {
            return F($n, {
                get index() {
                    return l().index - 1
                },
                get options() {
                    return i()
                },
                onChange: r,
                get children() {
                    return F(bn, {})
                }
            })
        }
    }), F(An, {
        get class() {
            return nn("select-button", t() && "open")
        },
        onClick: e => n(e.currentTarget),
        get children() {
            return [F(V, {
                keyed: !0,
                get when() {
                    return l().option.iconComponent
                },
                children: e => F(e, {})
            }), y((() => l().option.label)), F(fn, {
                class: "select-button-arrow"
            })]
        }
    }), F(V, {
        get when() {
            return e.withNavigator
        },
        get children() {
            return F($n, {
                get index() {
                    return l().index + 1
                },
                get options() {
                    return i()
                },
                onChange: r,
                get children() {
                    return F(yn, {})
                }
            })
        }
    }), F(V, {
        keyed: !0,
        get when() {
            return t()
        },
        children: t => F(Ln, {
            anchor: t,
            get width() {
                return s() ? 600 : void 0
            },
            onClose: () => n(null),
            get children() {
                return F(V, {
                    get when() {
                        return s()
                    },
                    get fallback() {
                        return F(dn, {
                            get children() {
                                return F(U, {
                                    get each() {
                                        return e.children[0].options
                                    },
                                    children: e => F(pn, {
                                        get left() {
                                            return F(V, {
                                                get when() {
                                                    return JSON.stringify(e.value) === o()
                                                },
                                                get fallback() {
                                                    return F(kn, {})
                                                },
                                                get children() {
                                                    return F(_n, {
                                                        class: "color-primary"
                                                    })
                                                }
                                            })
                                        },
                                        get text() {
                                            return e.label
                                        },
                                        onClick: () => r(e.value)
                                    })
                                })
                            }
                        })
                    },
                    get children() {
                        const t = Pn();
                        return se(t, F(U, {
                            get each() {
                                return e.children
                            },
                            children: e => F(Bn, {
                                get label() {
                                    return e.label
                                },
                                get value() {
                                    return o()
                                },
                                onChange: e => r(JSON.parse(e)),
                                get children() {
                                    return e.options.map((e => ({
                                        ...e,
                                        value: JSON.stringify(e.value)
                                    })))
                                }
                            })
                        })),
                            t
                    }
                })
            }
        })
    })]
}
const Tn = Q('<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z">')
    , Nn = e => (() => {
        const t = Tn();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , En = Q('<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">')
    , Dn = e => (() => {
        const t = En();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , On = Q('<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z">')
    , Rn = e => (() => {
        const t = On();
        return ie(t, e, !0, !0),
            t
    }
    )();
function jn(e) {
    return `${dt().watchlist} ${e + 1}`
}
function Fn(e, t) {
    return e.name.trim().length > 0 ? e.name : jn(t)
}
function In() {
    return [{
        name: dt().favorites,
        filter: {
            type: "list",
            list: ["favorite"]
        },
        record: yt,
        iconComponent: Dn,
        toggleCurrency: e => wt(e.id, (e => !e))
    }, ...kt.map(((e, t) => ({
        name: Fn(e, t),
        filter: {
            type: "list",
            list: ["watch", e.id]
        },
        record: e.record,
        iconComponent: Rn,
        toggleCurrency: e => xt(t, "record", e.id, (e => !e))
    }))), {
        name: dt().blocklist,
        filter: {
            type: "list",
            list: ["block"]
        },
        record: _t,
        iconComponent: Nn,
        toggleCurrency: e => Ct(e.id, (e => !e))
    }]
}
function Un(e) {
    return F(zn, {
        get value() {
            return ct()
        },
        onChange: ut,
        get withNavigator() {
            return e.withNavigator
        },
        get children() {
            return [{
                label: dt().pages,
                options: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1e3].map((e => ({
                    label: `TOP ${e}`,
                    value: je(e)
                })))
            }, {
                label: dt().lists,
                options: In().map((e => ({
                    label: e.name,
                    value: e.filter,
                    iconComponent: e.iconComponent
                })))
            }, {
                label: dt().exchanges,
                options: Ze.exchanges.map((e => ({
                    label: e.name,
                    value: {
                        type: "exchange",
                        exchange: e.id
                    },
                    iconComponent: e.iconComponent
                })))
            }]
        }
    })
}
const Vn = Q('<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">')
    , Hn = e => (() => {
        const t = Vn();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , Xn = Q('<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z">')
    , Gn = e => (() => {
        const t = Xn();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , Wn = Q('<div class="window-content">')
    , Yn = Q("<section><header>");
function qn(e) {
    const [t, n] = m(!0);
    var r, o;
    return r = e.onClose,
        o = () => !0,
        v((() => {
            o() && (Ht.registerCloseListener(r),
                C((() => Ht.unregisterCloseListener(r))))
        }
        )),
        (() => {
            const r = Yn()
                , o = r.firstChild;
            return se(o, F(on, {
                get class() {
                    return nn("expand-button", t() && "expanded")
                },
                onClick: () => n(!t()),
                get title() {
                    return dt().window_toggleExpand
                },
                get children() {
                    return F(Gn, {})
                }
            }), null),
                se(o, (() => e.header), null),
                se(o, F(on, {
                    get onClick() {
                        return e.onClose
                    },
                    get title() {
                        return dt().window_close
                    },
                    get children() {
                        return F(Hn, {})
                    }
                }), null),
                se(r, F(V, {
                    get when() {
                        return t()
                    },
                    get children() {
                        const t = Wn();
                        return se(t, (() => e.children)),
                            t
                    }
                }), null),
                b((() => ne(r, nn("window", e.class)))),
                r
        }
        )()
}
const Zn = Q('<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z">')
    , Kn = e => (() => {
        const t = Zn();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , Jn = Q("<button>");
function Qn(e) {
    const [t, n] = m(null);
    return [(() => {
        const r = Jn();
        return r.$$click = e => n(e.currentTarget),
            se(r, (() => e.content)),
            b((n => {
                const o = nn(e.solid ? "solid-button" : "icon-button", "button-menu", t() && "open", e.class)
                    , i = e.title;
                return o !== n._v$ && ne(r, n._v$ = o),
                    i !== n._v$2 && te(r, "title", n._v$2 = i),
                    n
            }
            ), {
                _v$: void 0,
                _v$2: void 0
            }),
            r
    }
    )(), F(V, {
        keyed: !0,
        get when() {
            return t()
        },
        children: t => F(Ln, {
            anchor: t,
            onClose: () => n(null),
            get children() {
                return F(dn, {
                    get children() {
                        return e.children
                    }
                })
            }
        })
    })]
}
function er(e) {
    return F(Qn, {
        get title() {
            return dt().delete
        },
        get content() {
            return F(Kn, {})
        },
        get children() {
            return [F(pn, {
                get left() {
                    return F(Kn, {})
                },
                get text() {
                    return dt().confirm
                },
                onClick: () => e.onDelete()
            }), F(pn, {
                get left() {
                    return F(Hn, {})
                },
                get text() {
                    return dt().cancel
                }
            })]
        }
    })
}
ee(["click"]);
const tr = Q('<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z">')
    , nr = e => (() => {
        const t = tr();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , rr = Q('<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">')
    , or = e => (() => {
        const t = rr();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , ir = Q('<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z">')
    , lr = e => (() => {
        const t = ir();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , sr = Q('<div><input size="1">');
function ar(e) {
    const [t, n] = m(!1);
    let r;
    function o() {
        document.execCommand("copy") && n(!0)
    }
    function i() {
        if (r) {
            const { value: t } = r;
            if (t) {
                r.select();
                try {
                    navigator.clipboard.writeText(t).then((() => n(!0))).catch(o)
                } catch (e) {
                    o()
                }
            }
        }
    }
    function l(t) {
        e.onInput && e.onInput(t)
    }
    function s() {
        r && (e.readonly ? r.select() : r.focus())
    }
    return (() => {
        const n = sr()
            , o = n.firstChild;
        n.$$click = s,
            se(n, F(V, {
                keyed: !0,
                get when() {
                    return e.iconComponent
                },
                children: e => F(e, {
                    class: "input-icon"
                })
            }), o),
            o.$$input = e => l(e.currentTarget.value);
        return "function" == typeof r ? le(r, o) : r = o,
            se(n, F(H, {
                get children() {
                    return [F(X, {
                        get when() {
                            return "clear" === e.action
                        },
                        get children() {
                            return F(on, {
                                get title() {
                                    return dt().delete
                                },
                                class: "input-action",
                                get active() {
                                    return t()
                                },
                                onClick: () => l(""),
                                get children() {
                                    return F(Hn, {})
                                }
                            })
                        }
                    }), F(X, {
                        get when() {
                            return "copy" === e.action
                        },
                        get children() {
                            return F(on, {
                                get title() {
                                    return dt().copy
                                },
                                class: "input-action",
                                get active() {
                                    return t()
                                },
                                onClick: i,
                                get children() {
                                    return F(lr, {})
                                }
                            })
                        }
                    })]
                }
            }), null),
            b((t => {
                const r = nn("input", 0 === e.value.length && "input-empty", e.class)
                    , i = e.type
                    , l = e.placeholder;
                return r !== t._v$ && ne(n, t._v$ = r),
                    i !== t._v$2 && te(o, "type", t._v$2 = i),
                    l !== t._v$3 && te(o, "placeholder", t._v$3 = l),
                    t
            }
            ), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            b((() => o.value = e.value)),
            n
    }
    )()
}
ee(["click", "input"]);
const cr = Ke(["BTC", "ETH"]);
function ur() {
    return F(zn, {
        get value() {
            return Ot()
        },
        onChange: Rt,
        get children() {
            return [{
                label: "Fiat",
                options: Ze.baseCurrencies.filter((e => !cr[e.code])).map((e => ({
                    value: e,
                    label: `${e.symbol} ${e.code}`
                })))
            }, {
                label: "Crypto",
                options: Ze.baseCurrencies.filter((e => cr[e.code])).map((e => ({
                    value: e,
                    label: `${e.symbol} ${e.code}`
                })))
            }]
        }
    })
}
function dr() {
    return F(zn, {
        get value() {
            return pt()
        },
        onChange: gt,
        get children() {
            return [{
                label: "",
                options: [{
                    value: "red-green",
                    label: dt().red_green
                }, {
                    value: "yellow-blue",
                    label: dt().yellow_blue
                }]
            }]
        }
    })
}
function hr() {
    return F(zn, {
        get value() {
            return dt()
        },
        onChange: ht,
        get children() {
            return [{
                label: "",
                options: Ze.translations.map((e => ({
                    value: e,
                    label: `${e.flag} ${e.name}`
                })))
            }]
        }
    })
}
const pr = Q('<ul class="settings-page"><li><span></span></li><li><span></span></li><li><span></span></li><li><span>Stablecoins</span></li><li class="watchlists"><span>')
    , gr = Q('<div class="watchlist">');
function fr() {
    return (() => {
        const e = pr()
            , t = e.firstChild
            , n = t.firstChild
            , r = t.nextSibling
            , o = r.firstChild
            , i = r.nextSibling
            , l = i.firstChild
            , s = i.nextSibling;
        s.firstChild;
        const a = s.nextSibling
            , c = a.firstChild;
        return se(n, (() => dt().currency)),
            se(t, F(ur, {}), null),
            se(o, (() => dt().language)),
            se(r, F(hr, {}), null),
            se(l, (() => dt().colors)),
            se(i, F(dr, {}), null),
            se(s, F(zn, {
                get value() {
                    return Lt()
                },
                onChange: $t,
                get children() {
                    return [{
                        label: "",
                        options: [{
                            value: !1,
                            label: dt().show
                        }, {
                            value: !0,
                            label: dt().hide
                        }]
                    }]
                }
            }), null),
            se(c, (() => dt().watchlists)),
            se(a, F(on, {
                class: "button-add",
                get title() {
                    return dt().watchlist_add
                },
                onClick: () => xt((e => [...e, nt()])),
                get children() {
                    return F(nr, {})
                }
            }), null),
            se(e, F(U, {
                each: kt,
                children: (e, t) => (() => {
                    const n = gr();
                    return se(n, F(ar, {
                        get value() {
                            return e.name
                        },
                        action: "clear",
                        iconComponent: or,
                        get placeholder() {
                            return jn(t())
                        },
                        onInput: e => xt(t(), "name", e)
                    }), null),
                        se(n, F(er, {
                            onDelete: () => function (e) {
                                xt((t => t.filter((t => t.id !== e.id)))),
                                    ut((t => "list" === t.type && "watch" === t.list[0] && t.list[1] === e.id ? Fe.defaultFilter : t))
                            }(e)
                        }), null),
                        n
                }
                )()
            }), null),
            e
    }
    )()
}
const mr = Q('<span class="settings-window-title">');
function br(e) {
    return F(qn, {
        class: "settings-window",
        get onClose() {
            return e.onClose
        },
        get header() {
            return [F(cn, {}), (() => {
                const e = mr();
                return se(e, (() => dt().settings)),
                    e
            }
            )()]
        },
        get children() {
            return F(fr, {})
        }
    })
}
const vr = Q("<div>");
function yr(e) {
    const [t, n] = m("")
        , [r, o] = m(null);
    v((() => {
        e.value ? (window.setTimeout((() => n("in")), 20),
            o((() => e.value))) : (n("out"),
                window.setTimeout((() => o(null)), 400))
    }
    ));
    const i = y((() => e.value || r()));
    return F(V, {
        get when() {
            return i()
        },
        get children() {
            return F(me, {
                get children() {
                    const n = vr();
                    return se(n, F(e.component, {
                        get value() {
                            return i()
                        },
                        get onClose() {
                            return e.onClose
                        }
                    })),
                        b((() => ne(n, nn("window-host", t())))),
                        n
                }
            })
        }
    })
}
const wr = Q('<div class="grow">')
    , _r = Q('<header class="header"><img class="logo"><h1>');
function Cr() {
    const [e, t] = m(!1);
    return (() => {
        const n = _r()
            , r = n.firstChild;
        return se(r.nextSibling, (() => Fe.appName)),
            se(n, F(V, {
                get when() {
                    return Ht.isDesktop
                },
                get children() {
                    return [wr(), F(Un, {
                        withNavigator: !0
                    }), F(on, {
                        get active() {
                            return e()
                        },
                        class: "button-settings",
                        onClick: () => t((e => !e)),
                        get title() {
                            return dt().settings
                        },
                        get children() {
                            return F(cn, {})
                        }
                    }), F(yr, {
                        get value() {
                            return e()
                        },
                        component: br,
                        onClose: () => t(!1)
                    })]
                }
            }), null),
            se(n, F(sn, {}), null),
            b((e => {
                const t = Fe.imageLogo
                    , n = Fe.appName
                    , o = `Logo of ${Fe.appName}`;
                return t !== e._v$ && te(r, "src", e._v$ = t),
                    n !== e._v$2 && te(r, "alt", e._v$2 = n),
                    o !== e._v$3 && te(r, "title", e._v$3 = o),
                    e
            }
            ), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            n
    }
    )()
}
const kr = Q('<svg viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z">')
    , xr = e => (() => {
        const t = kr();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , Lr = Q('<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z">')
    , $r = e => (() => {
        const t = Lr();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , Mr = Q('<svg viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z">')
    , Ar = e => (() => {
        const t = Mr();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , Sr = Q('<div class="support-crypto"><div class="support-crypto-options">')
    , Br = Q("<p>Version ")
    , Pr = [{
        name: "BTC",
        address: "bc1q8pep7zf7txjcjrslse7crqlgr0f36fwuxnzad0"
    }, {
        name: "ETH",
        address: "0x1e365DA3123718E703ffA316775e7f982EB1EfF3"
    }, {
        name: "BSC",
        address: "0x1e365DA3123718E703ffA316775e7f982EB1EfF3"
    }, {
        name: "SOL",
        address: "7bWCETt2r6bM7CitSahqiujAM9UR2o14QMyw3xB4QDox"
    }, {
        name: "XRP",
        address: "rpeeapKyDQE9JhRPkRZA3WtzmiYCxZ3jCL"
    }, {
        name: "LTC",
        address: "LX7Bzbn2aEEt64DZZzW653tkSvYBQ7cs6q"
    }, {
        name: "XLM",
        address: "GALMTBOTY4FQ4GBZW5X4XH3673SWEAYB3CPMEVGTX67NNXNV6DV77BWN"
    }, {
        name: "XMR",
        address: "4ARo28zbpru9PqFqd1XGSyPipH83PG38eKj9uSinwPgKMfAYKehgR5SFyrQDEN9A7VdBcUQMPnfcZARm5yNWfxXdGNeZfj6"
    }];
function zr() {
    const [e, t] = m(null);
    return (() => {
        const n = Sr();
        return se(n.firstChild, F(U, {
            each: Pr,
            children: n => F(An, {
                get active() {
                    return e() === n
                },
                onClick: () => t((e => e === n ? null : n)),
                get children() {
                    return n.name
                }
            })
        })),
            se(n, F(V, {
                keyed: !0,
                get when() {
                    return e()
                },
                get fallback() {
                    return (() => {
                        const e = Br();
                        return e.firstChild,
                            se(e, "2023-6-5-16-15", null),
                            e
                    }
                    )()
                },
                children: e => F(ar, {
                    readonly: !0,
                    action: "copy",
                    get value() {
                        return e.address
                    }
                })
            }), null),
            n
    }
    )()
}
const Tr = Q('<svg viewBox="0 0 512 512"><path d="m484.689 98.231-69.417 327.37c-5.237 23.105-18.895 28.854-38.304 17.972L271.2 365.631l-51.034 49.086c-5.647 5.647-10.372 10.372-21.256 10.372l7.598-107.722L402.539 140.23c8.523-7.598-1.848-11.809-13.247-4.21L146.95 288.614 42.619 255.96c-22.694-7.086-23.104-22.695 4.723-33.579L455.423 65.166c18.893-7.085 35.427 4.209 29.266 33.065z">')
    , Nr = e => (() => {
        const t = Tr();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , Er = Q("<span>");
function Dr() {
    return F(Qn, {
        solid: !0,
        get content() {
            return ["Register on", F(U, {
                get each() {
                    return Ze.exchanges
                },
                children: e => F(V, {
                    get when() {
                        return e.referralUrl
                    },
                    get children() {
                        return F(e.iconComponent, {})
                    }
                })
            })]
        },
        get children() {
            return F(U, {
                get each() {
                    return Ze.exchanges
                },
                children: e => F(V, {
                    keyed: !0,
                    get when() {
                        return e.referralUrl
                    },
                    children: t => F(Yt, {
                        class: "menu-item",
                        href: t,
                        get title() {
                            return `Register on ${e.name}`
                        },
                        get name() {
                            return `${e.name}_Register`
                        },
                        get children() {
                            return [F(e.iconComponent, {}), (() => {
                                const t = Er();
                                return se(t, (() => e.name)),
                                    t
                            }
                            )(), F(yn, {
                                class: "color-secondary"
                            })]
                        }
                    })
                })
            })
        }
    })
}
const Or = Q('<footer><section><p class="footer-header"><img class="footer-logo" width="32" height="32"><span></span></p><h2></h2><p>Crypto Bubbles is available as website at cryptobubbles.net, Android App on the Play Store and iOS App on the App Store.</p><p>No financial advice. Do your own research!</p><p>Ulrich Stark, 92637 Weiden, Germany<br></p><nav></nav></section><section class="support-my-work"><h2>');
function Rr() {
    return (() => {
        const e = Or()
            , t = e.firstChild
            , n = t.firstChild
            , r = n.firstChild
            , o = r.nextSibling
            , i = n.nextSibling
            , l = i.nextSibling.nextSibling.nextSibling;
        l.firstChild.nextSibling;
        const s = l.nextSibling
            , a = t.nextSibling
            , c = a.firstChild;
        return se(o, (() => Fe.appName)),
            se(i, (() => dt().description)),
            se(l, (() => Fe.emailAddress), null),
            se(s, F(V, {
                get when() {
                    return Ht.isWeb
                },
                get children() {
                    return [F(Yt, {
                        class: "icon-button",
                        get href() {
                            return Fe.urlGooglePlay
                        },
                        title: "Crypto Bubbles on Google Play",
                        name: "GooglePlay",
                        get children() {
                            return F(Gt, {})
                        }
                    }), F(Yt, {
                        class: "icon-button",
                        get href() {
                            return Fe.urlAppStore
                        },
                        title: "Crypto Bubbles on App Store",
                        name: "AppStore",
                        get children() {
                            return F(Jt, {})
                        }
                    })]
                }
            }), null),
            se(s, F(Yt, {
                class: "icon-button",
                get href() {
                    return `mailto:${Fe.emailAddress}`
                },
                get title() {
                    return `Send E-Mail to ${Fe.emailAddress}`
                },
                name: "Mail",
                get children() {
                    return F($r, {})
                }
            }), null),
            se(s, F(Yt, {
                class: "icon-button",
                get href() {
                    return `https://instagram.com/${Fe.usernameInstagram}`
                },
                get title() {
                    return `@${Fe.usernameInstagram} on Instagram`
                },
                name: "Instagram",
                get children() {
                    return F(xr, {})
                }
            }), null),
            se(s, F(Yt, {
                class: "icon-button",
                get href() {
                    return `https://t.me/${Fe.usernameTelegram}`
                },
                get title() {
                    return `@${Fe.usernameTelegram} on Telegram`
                },
                name: "Telegram",
                get children() {
                    return F(Nr, {})
                }
            }), null),
            se(s, F(Yt, {
                class: "icon-button",
                get href() {
                    return `https://twitter.com/${Fe.usernameTwitter}`
                },
                get title() {
                    return `@${Fe.usernameTwitter} on Twitter`
                },
                name: "Twitter",
                get children() {
                    return F(Ar, {})
                }
            }), null),
            se(c, (() => dt().support_my_work)),
            se(a, F(Yt, {
                class: "solid-button",
                get href() {
                    return `https://twitter.com/intent/follow?screen_name=${Fe.usernameTwitter}`
                },
                name: "Twitter_Follow",
                get children() {
                    return [F(Ar, {}), " Follow on Twitter"]
                }
            }), null),
            se(a, F(V, {
                get when() {
                    return "ios" === Ht.env
                },
                get children() {
                    return F(Yt, {
                        class: "solid-button",
                        get href() {
                            return Fe.urlAppStore
                        },
                        name: "AppStore_Rate",
                        get children() {
                            return [F(Jt, {}), " Rate App on App Store"]
                        }
                    })
                }
            }), null),
            se(a, F(V, {
                get when() {
                    return "android" === Ht.env
                },
                get children() {
                    return F(Yt, {
                        class: "solid-button",
                        get href() {
                            return Fe.urlGooglePlay
                        },
                        name: "GooglePlay_Rate",
                        get children() {
                            return [F(Gt, {}), " Rate App on Google Play"]
                        }
                    })
                }
            }), null),
            se(a, F(Dr, {}), null),
            se(a, F(zr, {}), null),
            b((e => {
                const t = Fe.imageLogo
                    , n = Fe.appName
                    , o = `Logo of ${Fe.appName}`;
                return t !== e._v$ && te(r, "src", e._v$ = t),
                    n !== e._v$2 && te(r, "alt", e._v$2 = n),
                    o !== e._v$3 && te(r, "title", e._v$3 = o),
                    e
            }
            ), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            e
    }
    )()
}
function jr(e) {
    zt((t => t === e ? null : e))
}
function Fr(e, t) {
    e < 0 && (e = 0);
    let n = 0 === e ? 2 : 3 - Math.ceil(Math.log10(e));
    n < 0 && (n = 0),
        n > 10 && (n = 10),
        1 === n && (n = 2),
        e > 1e6 && (n = 2),
        Number.isFinite(n) || (n = 0);
    const r = {
        style: "currency",
        currency: t.code,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: n,
        maximumFractionDigits: n
    };
    e > 1e6 && (r.notation = "compact");
    try {
        return e.toLocaleString(void 0, r)
    } catch (o) {
        return r.currencyDisplay = "symbol",
            e.toLocaleString(void 0, r)
    }
}
function Ir(e, t, n) {
    if (0 !== e)
        return e > 0 ? "yellow-blue" === t ? n ? "#16d" : "#4af" : n ? "#282" : "#3f3" : "yellow-blue" === t ? n ? "#d91" : "#fb1" : n ? "#b44" : "#f66"
}
function Ur(e, t, n, r) {
    if (null === e)
        return {
            text: "-"
        };
    e *= .01;
    const o = Math.abs(e);
    o < 5e-4 && (e = .001 * Math.sign(e));
    const i = {
        style: "percent",
        signDisplay: n || 0 === e ? "never" : "always",
        maximumFractionDigits: o >= 1 ? 0 : 1
    };
    return {
        text: e.toLocaleString(void 0, i).replace(/\u00a0/, ""),
        color: Ir(e, t, r)
    }
}
function Vr(e, t) {
    return !0 === t[e.id]
}
function Hr(e) {
    return Vr(e, _t)
}
function Xr(e) {
    return Vr(e, yt)
}
const Gr = Q('<svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z">')
    , Wr = e => (() => {
        const t = Gr();
        return ie(t, e, !0, !0),
            t
    }
    )();
function Yr(e) {
    return F(Qn, {
        class: "button-lists",
        get title() {
            return dt().add_to_list
        },
        get content() {
            return [F(nr, {}), F(U, {
                get each() {
                    return (() => {
                        const t = [];
                        Hr(e.currency) && t.push(Nn),
                            Xr(e.currency) && t.push(Dn);
                        for (const n of kt)
                            if (Vr(e.currency, n.record)) {
                                t.push(Rn);
                                break
                            }
                        return t
                    }
                    )()
                },
                children: e => F(e, {
                    class: "color-secondary"
                })
            })]
        },
        get children() {
            return F(U, {
                get each() {
                    return In()
                },
                children: t => F(pn, {
                    get text() {
                        return t.name
                    },
                    get left() {
                        return F(t.iconComponent, {})
                    },
                    get right() {
                        return F(V, {
                            get when() {
                                return Vr(e.currency, t.record)
                            },
                            get fallback() {
                                return F(nr, {
                                    class: "color-secondary"
                                })
                            },
                            get children() {
                                return F(Wr, {
                                    class: "color-primary"
                                })
                            }
                        })
                    },
                    onClick: n => {
                        t.toggleCurrency(e.currency),
                            n.stopImmediatePropagation()
                    }
                })
            })
        }
    })
}
const qr = Q('<svg viewBox="-7 -7 55 55"><rect x="-7" y="-7" width="55" height="55" fill="#3861fb" rx="12"></rect><path d="m35.124 24.5c-0.715 0.452-1.557 0.508-2.197 0.147-0.813-0.459-1.26-1.534-1.26-3.029v-4.473c0-2.16-0.854-3.697-2.282-4.112-2.42-0.705-4.24 2.256-4.924 3.368l-4.268 6.92v-8.458c-0.048-1.946-0.68-3.11-1.88-3.461-0.794-0.232-1.982-0.139-3.136 1.627l-9.562 15.354c-1.2801-2.4302-1.9475-5.1363-1.944-7.883 0-9.249 7.412-16.773 16.522-16.773s16.521 7.524 16.521 16.773c0 0.016 4e-3 0.03 5e-3 0.045 0 0.016-3e-3 0.03-2e-3 0.046 0.086 1.791-0.494 3.216-1.593 3.91zm5.261-3.999v-0.047l-1e-3 -0.046c-0.051-11.264-9.088-20.408-20.192-20.408-11.133 0-20.192 9.196-20.192 20.5 0 11.303 9.059 20.5 20.193 20.5 5.109 0 9.985-1.942 13.728-5.467 0.744-0.7 0.788-1.879 0.098-2.633-0.68394-0.7542-1.854-0.79931-2.594-0.1-3.0339 2.873-7.0536 4.4738-11.232 4.473-4.878 0-9.267-2.159-12.294-5.583l8.623-13.846v6.383c0 3.066 1.189 4.057 2.186 4.347 0.998 0.29 2.523 0.092 4.124-2.508l4.743-7.689c0.152-0.248 0.292-0.462 0.42-0.647v3.888c0 2.866 1.148 5.158 3.149 6.287 1.804 1.018 4.072 0.926 5.92-0.24 2.24-1.415 3.447-4.022 3.321-7.164z" fill="#fff">')
    , Zr = e => (() => {
        const t = qr();
        return t.firstChild,
            ie(t, e, !0, !0),
            t
    }
    )();
function Kr(e) {
    return F(Yt, {
        get href() {
            return function (e) {
                let t = `currencies/${e}`;
                const n = function (e) {
                    switch (e.id) {
                        case "pt":
                            return "pt-br";
                        case "cn":
                            return "zh";
                        case "fa":
                            return "en";
                        default:
                            return e.id
                    }
                }(dt());
                return "en" !== n && (t = `${n}/${t}`),
                    `https://coinmarketcap.com/${t}`
            }(e.currency.slug)
        },
        get title() {
            return dt().info_tooltip.replace("(currency)", e.currency.name).replace("(service)", "CoinMarketCap")
        },
        name: "CMC",
        class: "icon-button",
        get children() {
            return F(Zr, {})
        }
    })
}
const Jr = Q('<svg viewBox="0 0 276 276"><path fill="#8dc63f" d="M276,137.39A138,138,0,1,1,137.39,0h0A138,138,0,0,1,276,137.39Z"></path><path fill="#f9e988" d="M265.65,137.44a127.63,127.63,0,1,1-128.21-127h0A127.65,127.65,0,0,1,265.65,137.44Z"></path><path fill="#8dc63f" d="M202.74,92.39c-9.26-2.68-18.86-6.48-28.58-10.32-.56-2.44-2.72-5.48-7.09-9.19-6.35-5.51-18.28-5.37-28.59-2.93-11.38-2.68-22.62-3.63-33.41-1C16.82,93.26,66.86,152.57,34.46,212.19c4.61,9.78,54.3,66.84,126.2,51.53,0,0-24.59-59.09,30.9-87.45C236.57,153.18,269.09,110.46,202.74,92.39Z"></path><path fill="white" d="M144.6,106.58a24.68,24.68,0,1,1-24.69-24.67h0a24.68,24.68,0,0,1,24.68,24.66Z"></path><path fill="#222" d="M137.28,106.8a17.36,17.36,0,1,1-17.36-17.36h0A17.36,17.36,0,0,1,137.28,106.8Z"></path><path fill="#8dc63f" d="M233.63,142.08c-20,14.09-42.74,24.78-75,24.78-15.1,0-18.16-16-28.14-8.18-5.15,4.06-23.31,13.14-37.72,12.45S55,162,48.49,131.23C45.91,162,44.59,184.65,33,210.62c23,36.83,77.84,65.24,127.62,53C155.31,226.27,188,189.69,206.34,171c7-7.09,20.3-18.66,27.29-28.91Z">')
    , Qr = e => (() => {
        const t = Jr();
        return ie(t, e, !0, !0),
            t
    }
    )();
function eo(e) {
    return F(V, {
        keyed: !0,
        get when() {
            return e.currency.cg_id
        },
        children: t => F(Yt, {
            href: `https://www.coingecko.com/coins/${t}`,
            get title() {
                return dt().info_tooltip.replace("(currency)", e.currency.name).replace("(service)", "CoinGecko")
            },
            name: "CoinGecko",
            class: "icon-button",
            get children() {
                return F(Qr, {})
            }
        })
    })
}
const to = Q('<div style="width:1.2em">')
    , no = Q("<span>");
function ro(e) {
    function t(t) {
        return dt().trade_tooltip.replace("(currency)", e.currency.name).replace("(exchange)", t)
    }
    const n = y((() => {
        const t = [];
        let n = 0;
        for (const r of Ze.exchanges) {
            const o = e.currency.symbols[r.id];
            t.push({
                exchange: r,
                symbol: o
            }),
                o && n++
        }
        return {
            items: t,
            count: n
        }
    }
    ));
    return F(V, {
        get when() {
            return n().count > 0
        },
        get children() {
            return F(Qn, {
                solid: !0,
                get title() {
                    return t(n().items.filter((e => e.symbol)).map((e => e.exchange.name)).join(", "))
                },
                get content() {
                    return [y((() => dt().trade)), F(U, {
                        get each() {
                            return n().items
                        },
                        children: t => F(V, {
                            get when() {
                                return t.symbol
                            },
                            get fallback() {
                                return F(V, {
                                    get when() {
                                        return e.insertUnlistedDummys
                                    },
                                    get children() {
                                        return to()
                                    }
                                })
                            },
                            get children() {
                                return F(t.exchange.iconComponent, {})
                            }
                        })
                    })]
                },
                get children() {
                    return F(U, {
                        get each() {
                            return n().items
                        },
                        children: e => F(V, {
                            keyed: !0,
                            get when() {
                                return e.symbol
                            },
                            children: n => F(Yt, {
                                class: "menu-item",
                                get href() {
                                    return e.exchange.getSpotTradeUrl(n)
                                },
                                get title() {
                                    return t(e.exchange.name)
                                },
                                get name() {
                                    return `${e.exchange.name}_Trade`
                                },
                                get children() {
                                    return [F(e.exchange.iconComponent, {}), (() => {
                                        const t = no();
                                        return se(t, (() => e.exchange.name)),
                                            t
                                    }
                                    )(), F(yn, {
                                        class: "color-secondary"
                                    })]
                                }
                            })
                        })
                    })
                }
            })
        }
    })
}
const oo = Q('<div class="currency-links">');
function io(e) {
    return (() => {
        const t = oo();
        return se(t, F(Kr, {
            get currency() {
                return e.currency
            }
        }), null),
            se(t, F(eo, {
                get currency() {
                    return e.currency
                }
            }), null),
            se(t, F(ro, {
                get currency() {
                    return e.currency
                },
                get insertUnlistedDummys() {
                    return e.tabular
                }
            }), null),
            t
    }
    )()
}
class lo {
    constructor(e, t) {
        this.duration = t,
            this.startValue = 0,
            this.endValue = e,
            this.startTime = null
    }
    get() {
        if (null === this.startTime)
            return this.endValue;
        {
            const e = Date.now() - this.startTime;
            if (e >= this.duration)
                return this.startTime = null,
                    this.endValue;
            const t = e / this.duration;
            return function (e, t, n) {
                return e + (t - e) * n
            }(this.startValue, this.endValue, t)
        }
    }
    set(e, t = !1) {
        t ? this.startTime = null : (this.startValue = this.get(),
            this.startTime = Date.now()),
            this.endValue = e
    }
    isDone() {
        return null === this.startTime || Date.now() >= this.startTime + this.duration && (this.startTime = null,
            !0)
    }
}
const so = Q('<strong class="number">');
function ao(e) {
    const [t, n] = m(e.children)
        , [r, o] = m(e.children)
        , [i, l] = m("")
        , s = new lo(e.children, 500);
    let a = null;
    const c = () => {
        s.isDone() ? (o(t()),
            l(""),
            a = null) : (o(s.get()),
                a = requestAnimationFrame(c))
    }
        ;
    v((() => {
        const r = t()
            , o = e.children;
        if (r !== o) {
            n(o),
                s.set(o);
            const t = o - r
                , i = Ir(e.reverseColor ? -t : t, pt());
            l(i ? `color: ${i}` : ""),
                a = requestAnimationFrame(c)
        }
    }
    )),
        C((() => {
            null !== a && (cancelAnimationFrame(a),
                a = null)
        }
        ));
    const u = () => "currency" === e.format ? Fr(r(), st()) : Math.round(r());
    return (() => {
        const e = so();
        return se(e, u),
            b((t => oe(e, i(), t))),
            e
    }
    )()
}
const co = Q('<svg width="24" height="12" viewBox="0 6 24 12"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z">')
    , uo = e => (() => {
        const t = co();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , ho = Q('<span class="currency-rank-change">')
    , po = Q('<span class="currency-rank">');
function go(e) {
    const t = () => e.currency.rankDiffs[e.period]
        , n = () => Ir(t(), pt());
    return (() => {
        const r = po();
        return se(r, F(V, {
            get when() {
                return t() < 0
            },
            get children() {
                const e = ho();
                return se(e, (() => Math.abs(t())), null),
                    se(e, F(fn, {}), null),
                    b((() => null != n() ? e.style.setProperty("color", n()) : e.style.removeProperty("color"))),
                    e
            }
        }), null),
            se(r, F(V, {
                get when() {
                    return t() > 0
                },
                get children() {
                    const e = ho();
                    return se(e, F(uo, {}), null),
                        se(e, t, null),
                        b((() => null != n() ? e.style.setProperty("color", n()) : e.style.removeProperty("color"))),
                        e
                }
            }), null),
            se(r, F(V, {
                get when() {
                    return e.animate
                },
                get fallback() {
                    return e.currency.rank
                },
                get children() {
                    return F(ao, {
                        format: "integer",
                        reverseColor: !0,
                        get children() {
                            return e.currency.rank
                        }
                    })
                }
            }), null),
            r
    }
    )()
}
const fo = Q('<div class="currency-header"><img><span>');
function mo(e) {
    return (() => {
        const t = fo()
            , n = t.firstChild;
        return se(n.nextSibling, (() => e.currency.name)),
            b((t => {
                const r = e.currency.image
                    , o = e.currency.name
                    , i = `Logo of ${e.currency.name}`;
                return r !== t._v$ && te(n, "src", t._v$ = r),
                    o !== t._v$2 && te(n, "alt", t._v$2 = o),
                    i !== t._v$3 && te(n, "title", t._v$3 = i),
                    t
            }
            ), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0
            }),
            t
    }
    )()
}
const bo = Q('<td class="center">')
    , vo = Q('<tr><td class="right"></td><td><div class="name-cell"></div></td><td class="right"></td><td class="right"></td><td class="right volume"></td><td>');
function yo(e) {
    function t(e) {
        const { text: t, color: n } = Ur(e, pt(), !1, !0);
        return (() => {
            const e = bo();
            return null != n ? e.style.setProperty("background-color", n) : e.style.removeProperty("background-color"),
                se(e, t),
                e
        }
        )()
    }
    return (() => {
        const n = vo()
            , r = n.firstChild
            , o = r.nextSibling
            , i = o.firstChild
            , l = o.nextSibling
            , s = l.nextSibling
            , a = s.nextSibling
            , c = a.nextSibling;
        return se(r, F(go, {
            get currency() {
                return e.currency
            },
            period: "day"
        })),
            se(i, F(Yr, {
                get currency() {
                    return e.currency
                }
            }), null),
            se(i, F(An, {
                onClick: () => jr(e.currency.id),
                get children() {
                    return F(mo, {
                        get currency() {
                            return e.currency
                        }
                    })
                }
            }), null),
            se(l, (() => Fr(e.currency.price, st()))),
            se(s, (() => Fr(e.currency.marketcap, st()))),
            se(a, (() => Fr(e.currency.volume, st()))),
            se(n, (() => t(e.currency.performance.hour)), c),
            se(n, (() => t(e.currency.performance.day)), c),
            se(n, (() => t(e.currency.performance.week)), c),
            se(n, (() => t(e.currency.performance.month)), c),
            se(n, (() => t(e.currency.performance.year)), c),
            se(c, F(io, {
                get currency() {
                    return e.currency
                },
                tabular: !0
            })),
            n
    }
    )()
}
const wo = Q('<svg viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z">')
    , _o = e => (() => {
        const t = wo();
        return ie(t, e, !0, !0),
            t
    }
    )();
const Co = Q('<div class="scroll-container"><table><thead><tr><th></th></tr></thead><tbody>')
    , ko = Q("<th><div><span>")
    , xo = [{
        label: () => "#",
        sortComparator: (e, t) => t.rank - e.rank
    }, {
        label: () => dt().currencyName,
        sortComparator: (e, t) => t.name.localeCompare(e.name)
    }, {
        label: () => dt().price,
        sortComparator: (e, t) => t.price - e.price
    }, {
        label: () => dt().marketcap,
        sortComparator: (e, t) => t.marketcap - e.marketcap
    }, {
        label: () => dt().volume,
        sortComparator: (e, t) => t.volume - e.volume
    }, {
        label: () => dt().period_hour,
        sortComparator: (e, t) => {
            var n, r;
            return (null != (n = t.performance.hour) ? n : 0) - (null != (r = e.performance.hour) ? r : 0)
        }
    }, {
        label: () => dt().period_day,
        sortComparator: (e, t) => {
            var n, r;
            return (null != (n = t.performance.day) ? n : 0) - (null != (r = e.performance.day) ? r : 0)
        }
    }, {
        label: () => dt().period_week,
        sortComparator: (e, t) => {
            var n, r;
            return (null != (n = t.performance.week) ? n : 0) - (null != (r = e.performance.week) ? r : 0)
        }
    }, {
        label: () => dt().period_month,
        sortComparator: (e, t) => {
            var n, r;
            return (null != (n = t.performance.month) ? n : 0) - (null != (r = e.performance.month) ? r : 0)
        }
    }, {
        label: () => dt().period_year,
        sortComparator: (e, t) => {
            var n, r;
            return (null != (n = t.performance.year) ? n : 0) - (null != (r = e.performance.year) ? r : 0)
        }
    }];
function Lo(e) {
    const [n, r] = m("");
    let o, i;
    const s = function (e, n = t, r) {
        const o = new Map
            , i = A((t => {
                const r = e();
                for (const [e, i] of o.entries())
                    if (n(e, r) !== n(e, t))
                        for (const t of i.values())
                            t.state = l,
                                t.pure ? h.push(t) : p.push(t);
                return r
            }
            ), void 0, !0, l);
        return M(i),
            e => {
                const t = d;
                if (t) {
                    let n;
                    (n = o.get(e)) ? n.add(t) : o.set(e, n = new Set([t])),
                        C((() => {
                            n.delete(t),
                                !n.size && o.delete(e)
                        }
                        ))
                }
                return n(e, i.value)
            }
    }((() => {
        var e;
        return null == (e = Et()) ? void 0 : e.column
    }
    ));
    function a() {
        if (!o) {
            const e = document.querySelector("header");
            e && (o = e.offsetHeight - 2)
        }
        if (i && o) {
            const e = -1 * i.getBoundingClientRect().top
                , t = Math.max(0, Math.round(e + o));
            r(`transform:translateY(${t}px)`)
        }
    }
    return window.addEventListener("scroll", a),
        C((() => window.removeEventListener("scroll", a))),
        (() => {
            const t = Co()
                , r = t.firstChild
                , o = r.firstChild
                , l = o.firstChild
                , a = l.firstChild
                , c = o.nextSibling;
            return "function" == typeof i ? le(i, r) : i = r,
                se(l, F(U, {
                    each: xo,
                    children: e => (() => {
                        const t = ko()
                            , n = t.firstChild
                            , r = n.firstChild;
                        return t.$$click = () => function (e) {
                            Dt((t => t && t.column === e ? "asc" === t.direction ? null : {
                                ...t,
                                direction: "asc"
                            } : {
                                column: e,
                                direction: "desc"
                            }))
                        }(e),
                            se(n, F(_o, {}), r),
                            se(r, (() => e.label())),
                            b((() => {
                                return ne(t, nn("sortable", s(e) && `sorted-${null == (n = Et()) ? void 0 : n.direction}`));
                                var n
                            }
                            )),
                            t
                    }
                    )()
                }), a),
                se(a, (() => dt().links)),
                se(c, F(U, {
                    get each() {
                        return e.rows
                    },
                    children: e => F(yo, {
                        currency: e
                    })
                })),
                b((e => oe(o, n(), e))),
                t
        }
        )()
}
function $o(e) {
    switch (e.type) {
        case "list":
            const t = function (e) {
                switch (e.list[0]) {
                    case "block":
                        return _t;
                    case "watch":
                        {
                            const t = e.list[1]
                                , n = kt.find((e => e.id === t));
                            if (n)
                                return n.record
                        }
                }
                return yt
            }(e);
            return e => t[e.id];
        case "slice":
            return t => t.rank >= e.from && t.rank <= e.to;
        case "exchange":
            return t => null !== t.symbols[e.exchange];
        default:
            return e => e.rank > 0 && e.rank <= 100
    }
}
ee(["click"]);
const Mo = f((() => y((() => {
    const e = ct()
        , t = $o(e);
    let n = t;
    return "list" !== e.type && (n = Lt() ? e => !e.stable && !Hr(e) && t(e) : e => !Hr(e) && t(e)),
        Mt.filter(n)
}
))))
    , Ao = f((() => y((() => {
        const e = bt();
        return ft.find((t => t.id === e)) || ft[0]
    }
    ))))
    , So = f((() => y((() => {
        const e = Pt();
        return e && Mt.find((t => t.id === e)) || null
    }
    ))));
function Bo() {
    return dt().empty_list.replace("(name)", function () {
        const e = ct();
        if ("list" === e.type) {
            const { list: t } = e;
            switch (t[0]) {
                case "block":
                    return dt().blocklist;
                case "watch":
                    const e = t[1]
                        , n = kt.findIndex((t => t.id === e));
                    if (-1 !== n)
                        return Fn(kt[n], n)
            }
        }
        return dt().favorites
    }())
}
const Po = Q('<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">')
    , zo = e => (() => {
        const t = Po();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , To = Q('<div class="search-container">')
    , No = Q('<div class="center-container">')
    , Eo = Q('<div class="center-container"><p>')
    , Do = 50
    , Oo = 50
    , Ro = 10;
function jo() {
    const [e, t] = m("")
        , [n, r] = m(Do)
        , o = () => e().trim().toUpperCase();
    v(function (e, t, n) {
        const r = Array.isArray(e);
        let o, i = n && n.defer;
        return n => {
            let l;
            if (r) {
                l = Array(e.length);
                for (let t = 0; t < e.length; t++)
                    l[t] = e[t]()
            } else
                l = e();
            if (i)
                return void (i = !1);
            const s = w((() => t(l, o, n)));
            return o = l,
                s
        }
    }(ct, (() => {
        r(Do)
    }
    )));
    const i = y((() => {
        const e = o()
            , t = Et();
        let r = n()
            , i = Mo();
        if (e && (r = Ro,
            i = Mt.filter((t => t.nameUpper.includes(e) || t.symbol.includes(e)))),
            t) {
            const { sortComparator: e } = t.column;
            i = [...i].sort("asc" === t.direction ? (t, n) => e(n, t) : e)
        }
        return i.slice(0, r)
    }
    ));
    return F(V, {
        get when() {
            return "loaded" === Tt()
        },
        get children() {
            return [(() => {
                const n = To();
                return se(n, F(ar, {
                    get value() {
                        return e()
                    },
                    action: "clear",
                    iconComponent: zo,
                    get placeholder() {
                        return dt().search_crypto
                    },
                    onInput: t
                })),
                    n
            }
            )(), F(V, {
                get when() {
                    return i().length > 0
                },
                get fallback() {
                    return (() => {
                        const e = Eo();
                        return se(e.firstChild, (() => {
                            const e = y((() => 0 === o().length));
                            return () => e() ? Bo() : dt().not_found
                        }
                        )()),
                            e
                    }
                    )()
                },
                get children() {
                    return [F(Lo, {
                        get rows() {
                            return i()
                        }
                    }), F(V, {
                        get when() {
                            return y((() => Mo().length > n()))() && 0 === o().length
                        },
                        get children() {
                            const e = No();
                            return se(e, F(An, {
                                onClick: () => r((e => e + Oo)),
                                get children() {
                                    return [F(_o, {}), y((() => dt().show_more))]
                                }
                            })),
                                e
                        }
                    })]
                }
            })]
        }
    })
}
function Fo(e, t, n) {
    return e < t ? t : e > n ? n : e
}
const Io = {
    red: 127,
    green: 127,
    blue: 127
};
function Uo(e, t, n, r, o) {
    switch (t) {
        case "neutral":
            return Io;
        case "performance":
            {
                const t = e.performance[n];
                if (null === t)
                    return Io;
                const i = 0 === o ? 1 : Math.abs(t) / o
                    , l = Math.min(1, Math.max(.2, i))
                    , s = Math.floor(127 * (1 - l))
                    , a = Math.floor(155 + 100 * l);
                return t > 0 ? "yellow-blue" === r ? {
                    red: s,
                    green: s + 70,
                    blue: a
                } : {
                    red: s,
                    green: a,
                    blue: s
                } : "yellow-blue" === r ? {
                    red: a,
                    green: a,
                    blue: s
                } : {
                    red: a,
                    green: s,
                    blue: s
                }
            }
    }
}
function Vo(e, t, n, r) {
    switch (t) {
        case "name":
            return e.name;
        case "price":
            return Fr(e.price, r);
        case "marketcap":
            return Fr(e.marketcap, r);
        case "volume":
            return Fr(e.volume, r);
        case "performance":
            return Ur(e.performance[n], "red-green").text;
        case "rank":
            return e.rank.toString();
        case "dominance":
            return `${(100 * e.dominance).toFixed(2)}%`
    }
}
function Ho(e) {
    return Math.pow(e, .8)
}
function Xo(e, t, n) {
    switch (t) {
        case "marketcap":
            return Ho(e.marketcap);
        case "volume":
            return Ho(e.volume);
        case "performance":
            {
                const t = Math.abs(e.performance[n] || 0);
                return Ho(Math.min(1e3, t))
            }
    }
}
function Go() {
    return 2 * Math.random() - 1
}
class Wo {
    static get(e) {
        let t = this.images[e];
        if (!t) {
            const n = document.createElement("img");
            let r = !1;
            n.addEventListener("load", (() => {
                r = !0
            }
            )),
                n.src = e,
                t = () => r ? n : null,
                this.images[e] = t
        }
        return t
    }
}
Wo.images = {};
class Yo {
    constructor(e) {
        this.size = null,
            this.imageBitmap = null,
            this.canvas = document.createElement("canvas"),
            this.context = this.canvas.getContext("2d"),
            this.padding = e
    }
    begin(e) {
        const t = e + 2 * this.padding;
        this.size !== t ? (this.size = t,
            this.canvas.width = t,
            this.canvas.height = t) : this.context.clearRect(0, 0, t, t)
    }
    end() {
        this.imageBitmap = null;
        try {
            createImageBitmap(this.canvas).then((e => this.imageBitmap = e)).catch((() => { }
            ))
        } catch (e) { }
    }
    createRadialGradient(e, t, n, r, o, i) {
        return this.context.createRadialGradient(e + this.padding, t + this.padding, n, r + this.padding, o + this.padding, i)
    }
    circle(e, t, n) {
        this.context.beginPath(),
            this.context.arc(e + this.padding, t + this.padding, n, 0, 2 * Math.PI),
            this.context.closePath()
    }
    stroke(e, t) {
        this.context.lineWidth = t,
            this.context.strokeStyle = e,
            this.context.stroke()
    }
    fill(e) {
        this.context.fillStyle = e,
            this.context.fill()
    }
    fillText(e, t, n, r) {
        this.context.font = `${Math.ceil(r)}px Arial`,
            this.context.fillText(e, t + this.padding, n + this.padding)
    }
    drawImage(e, t, n, r, o) {
        this.context.drawImage(e, t + this.padding, n + this.padding, r, o)
    }
    getImage() {
        return this.imageBitmap || this.canvas
    }
}
class qo {
    constructor(e) {
        this.lastFingerprint = "",
            this.radiusTween = new lo(0, 1e3),
            this.color = "",
            this.transitionRadius = null,
            this.posX = 0,
            this.posY = 0,
            this.speedX = 0,
            this.speedY = 0,
            this.size = 0,
            this.radius = 0,
            this.content = "",
            this.visible = !1,
            this.latestPush = 0,
            this.renderFavoriteBorder = !0,
            this.currency = e,
            this.canvas = new Yo(Fe.bubbleCanvasPadding),
            this.lazyImage = Wo.get(e.image)
    }
    applyForce(e, t) {
        this.speedX += e,
            this.speedY += t
    }
    setRadius(e, t) {
        e = Number.isFinite(e) ? e : 0,
            this.radiusTween.set(e, t),
            t || (this.transitionRadius = Math.max(e, this.radius))
    }
    setColor(e) {
        const { red: t, green: n, blue: r } = e;
        this.color = `${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}`
    }
    setContent(e) {
        this.content = e
    }
    update() {
        this.radius = this.radiusTween.get(),
            this.visible = this.radius > 0
    }
    rerender(e) {
        const t = this.lazyImage()
            , n = Math.round(e)
            , r = this.renderFavoriteBorder && Xr(this.currency)
            , o = `${this.color} ${n} ${this.content} ${Boolean(t)} ${r}`;
        if (o !== this.lastFingerprint) {
            this.lastFingerprint = o;
            const e = 2 * n;
            this.canvas.begin(e);
            const i = this.canvas.createRadialGradient(n, n, 0, n, n, n);
            if (i.addColorStop(0, `rgba(${this.color}, 0.05)`),
                i.addColorStop(.8, `rgba(${this.color}, 0.1)`),
                i.addColorStop(.9, `rgba(${this.color}, 0.4)`),
                i.addColorStop(1, `rgb(${this.color})`),
                this.canvas.circle(n, n, n),
                this.canvas.fill(i),
                r) {
                const e = "red-green" === pt() ? "yellow" : "#f4a";
                this.canvas.circle(n, n, n),
                    this.canvas.stroke(e, Fe.bubbleBorderWidth)
            }
            const l = n > 30
                , s = n * (l ? .55 : 1.2)
                , a = s * (t ? t.width / t.height : 1)
                , c = .5 * (e - a)
                , u = (e - s) * (l ? .14 : .5);
            if (t)
                this.canvas.drawImage(t, c, u, a, s);
            else {
                const e = .5 * s;
                this.canvas.circle(c + e, u + e, e),
                    this.canvas.fill("#bbb")
            }
            if (l) {
                this.canvas.context.textAlign = "center",
                    this.canvas.context.fillStyle = "white";
                const e = n * (this.currency.symbol.length < 5 ? .55 : .35);
                this.canvas.fillText(this.currency.symbol, n, 1.25 * n, e);
                const t = n * (this.content.length > 8 ? .24 : .3);
                this.canvas.fillText(this.content, n, 1.65 * n, t)
            }
            this.canvas.end()
        }
    }
    render(e) {
        const t = this.radius + Fe.bubbleCanvasPadding
            , n = this.posX - t
            , r = this.posY - t;
        if (null !== this.transitionRadius) {
            this.rerender(this.transitionRadius);
            const o = 2 * t;
            e.drawImage(this.canvas.getImage(), n, r, o, o),
                this.radiusTween.isDone() && (this.transitionRadius = null)
        } else
            this.rerender(this.radius),
                e.drawImage(this.canvas.getImage(), n, r)
    }
}
class Zo {
    constructor(e) {
        this.frameHandle = null,
            this.lastTime = null,
            this.elementWidth = 0,
            this.elementHeight = 0,
            this.nextContainerFill = 0,
            this.width = 0,
            this.height = 0,
            this.eventResize = new Ut,
            this.eventFrame = new Ut,
            this.canvas = e,
            this.container = e.parentElement,
            this.context = e.getContext("2d"),
            this.frame = this.frame.bind(this),
            this.fillContainer = this.fillContainer.bind(this)
    }
    start() {
        window.addEventListener("resize", this.fillContainer),
            this.fillContainer(),
            this.requestFrame()
    }
    stop() {
        window.removeEventListener("resize", this.fillContainer),
            null !== this.frameHandle && cancelAnimationFrame(this.frameHandle)
    }
    frame(e) {
        this.frameHandle = null;
        let t = 0;
        null !== this.lastTime && (t = Math.min(.001 * (e - this.lastTime), .1)),
            this.lastTime = e,
            this.nextContainerFill < Date.now() && this.fillContainer(),
            this.eventFrame.fire(t)
    }
    fillContainer() {
        this.nextContainerFill = Date.now() + 1e3;
        const e = this.container.clientWidth - 1
            , t = this.container.clientHeight - 1
            , n = Math.floor(e * window.devicePixelRatio)
            , r = Math.floor(t * window.devicePixelRatio);
        this.elementWidth === e && this.elementHeight === t || (this.canvas.style.width = `${e}px`,
            this.canvas.style.height = `${t}px`,
            this.elementWidth = e,
            this.elementHeight = t),
            this.width === n && this.height === r || (this.canvas.width = n,
                this.canvas.height = r,
                this.width = n,
                this.height = r,
                this.eventResize.fire())
    }
    clear() {
        const { context: e, width: t, height: n } = this;
        e.clearRect(0, 0, t, n)
    }
    requestFrame() {
        null === this.frameHandle && (this.frameHandle = requestAnimationFrame(this.frame))
    }
}
class Ko extends Zo {
    constructor(e, t) {
        super(e),
            this.needsRecalculation = !1,
            this.recalculationCount = 0,
            this.latestPush = 0,
            this.bubbles = [],
            this.bubblesDict = {},
            this.pointerX = -1,
            this.pointerY = -1,
            this.hoveredBubble = null,
            this.draggedBubble = null,
            this.possibleSelectedBubble = null,
            this.timePointerDown = 0,
            this.timeLastWakeUp = Date.now(),
            this.selectedCurrencyId = null,
            this.renderFavoriteBorder = !0,
            this.eventSelect = new Ut,
            this.eventResize.register((() => {
                this.needsRecalculation = !0,
                    this.requestFrame()
            }
            )),
            this.eventFrame.register((e => {
                this.needsRecalculation && this.recalculcate(),
                    this.update(e),
                    this.render();
                const t = Date.now() - this.timeLastWakeUp
                    , n = Fo(Math.round(t / 150 - 20), 0, 80);
                n > 0 ? window.setTimeout((() => this.requestFrame()), n) : this.requestFrame()
            }
            )),
            this.properties = t,
            e.addEventListener("pointerdown", (e => this.handlePointerDown(e)), {
                passive: !1
            }),
            e.addEventListener("pointermove", (e => this.handlePointerMove(e))),
            e.addEventListener("touchmove", (e => this.handleTouchMove(e)), {
                passive: !1
            }),
            e.addEventListener("pointerup", (e => this.handlePointerUp(e))),
            e.addEventListener("pointercancel", (() => this.handlePointerCancel()))
    }
    updatePointerPosition(e) {
        this.pointerX = e.offsetX * window.devicePixelRatio,
            this.pointerY = e.offsetY * window.devicePixelRatio
    }
    wakeUp() {
        this.timeLastWakeUp = Date.now()
    }
    getFocusedBubble() {
        for (let e = this.bubbles.length - 1; e >= 0; e--) {
            const t = this.bubbles[e];
            if (t.visible) {
                const e = t.posX - this.pointerX
                    , n = t.posY - this.pointerY
                    , r = e * e + n * n
                    , o = t.radius + Fe.bubbleExtraHitbox;
                if (o * o >= r)
                    return t
            }
        }
        return null
    }
    handlePointerDown(e) {
        e.isPrimary && (this.timePointerDown = Date.now(),
            this.canvas.setPointerCapture(e.pointerId),
            "mouse" === e.pointerType ? this.draggedBubble = this.hoveredBubble : (this.updatePointerPosition(e),
                this.draggedBubble = this.getFocusedBubble()),
            this.draggedBubble ? this.possibleSelectedBubble = this.draggedBubble : this.launchExplosion(),
            e.preventDefault())
    }
    handlePointerMove(e) {
        if (!e.isPrimary)
            return;
        this.updatePointerPosition(e);
        const t = this.getFocusedBubble();
        if ("mouse" === e.pointerType) {
            this.hoveredBubble = t;
            const e = this.draggedBubble || this.hoveredBubble;
            this.canvas.style.cursor = e ? "pointer" : "auto"
        }
        this.possibleSelectedBubble !== t && (this.possibleSelectedBubble = null)
    }
    handleTouchMove(e) {
        this.draggedBubble && e.preventDefault()
    }
    handlePointerUp(e) {
        if (e.isPrimary) {
            if (this.possibleSelectedBubble) {
                if (Date.now() - this.timePointerDown < 1e3) {
                    const { currency: e } = this.possibleSelectedBubble;
                    this.possibleSelectedBubble = null,
                        this.eventSelect.fire(e.id)
                }
            }
            this.draggedBubble = null
        }
    }
    handlePointerCancel() {
        this.hoveredBubble = null,
            this.draggedBubble = null
    }
    launchExplosion() {
        for (const e of this.bubbles) {
            const t = e.posX - this.pointerX
                , n = e.posY - this.pointerY
                , r = Math.max(1, Math.sqrt(t * t + n * n))
                , o = 5e3 / r / r;
            e.applyForce(t * o, n * o)
        }
        this.wakeUp()
    }
    update(e) {
        const t = Math.pow(.5, e)
            , n = .001 * Math.min(this.width, this.height);
        for (const r of this.bubbles)
            r.update();
        for (let r = 0; r < this.bubbles.length; r++) {
            const e = this.bubbles[r];
            if (e.visible) {
                for (let t = r + 1; t < this.bubbles.length; t++) {
                    const n = this.bubbles[t];
                    if (!n.visible)
                        continue;
                    const r = e.posX - n.posX
                        , o = e.posY - n.posY
                        , i = Math.max(1, Math.sqrt(r * r + o * o))
                        , l = e.radius + n.radius;
                    if (i < l) {
                        const t = 6 / i
                            , s = r * t
                            , a = o * t
                            , c = 1 - e.radius / l
                            , u = n.radius / l - 1;
                        e.applyForce(s * c, a * c),
                            n.applyForce(s * u, a * u)
                    }
                }
                e.applyForce(Go() * n, Go() * n)
            }
        }
        if (this.draggedBubble) {
            const e = this.pointerX - this.draggedBubble.posX
                , t = this.pointerY - this.draggedBubble.posY
                , n = 5 / Math.max(1, Math.sqrt(e * e + t * t));
            this.draggedBubble.applyForce(e * n, t * n),
                this.wakeUp()
        }
        for (const r of this.bubbles)
            r.speedX *= t,
                r.speedY *= t,
                r.posX += r.speedX * e,
                r.posY += r.speedY * e,
                r.posX < r.radius && (r.posX = r.radius,
                    r.speedX *= -.7),
                r.posY < r.radius && (r.posY = r.radius,
                    r.speedY *= -.7),
                r.posX > this.width - r.radius && (r.posX = this.width - r.radius,
                    r.speedX *= -.7),
                r.posY > this.height - r.radius && (r.posY = this.height - r.radius,
                    r.speedY *= -.7)
    }
    renderBubbleBorder(e, t, n = 1) {
        this.context.beginPath(),
            this.context.arc(e.posX, e.posY, e.radius, 0, 2 * Math.PI),
            this.context.closePath(),
            this.context.lineWidth = Fe.bubbleBorderWidth * n,
            this.context.strokeStyle = t,
            this.context.stroke()
    }
    render() {
        this.clear();
        let e = null;
        for (const t of this.bubbles)
            if (t.renderFavoriteBorder = this.renderFavoriteBorder,
                t.visible) {
                if (t.currency.id === this.selectedCurrencyId) {
                    e = t;
                    continue
                }
                if (this.draggedBubble === t)
                    continue;
                t.render(this.context)
            }
        if (this.draggedBubble ? this.draggedBubble !== e && (this.draggedBubble.render(this.context),
            this.renderBubbleBorder(this.draggedBubble, "white")) : this.hoveredBubble && this.renderBubbleBorder(this.hoveredBubble, "white"),
            e) {
            e.render(this.context);
            const t = .5 * Math.sin(.008 * Date.now()) + .5
                , n = t + 2
                , r = `rgb(${Math.floor(255 * t)}, ${Math.floor(160 * t) + 95}, 255)`;
            this.renderBubbleBorder(e, r, n)
        }
    }
    recalculcate() {
        if (this.needsRecalculation = !1,
            0 === this.bubbles.length)
            return;
        const { size: e, color: t, colors: n, period: r, content: o, baseCurrency: i } = this.properties
            , l = 0 === this.recalculationCount;
        let s = 0
            , a = 0;
        for (const d of this.bubbles) {
            const t = d.latestPush === this.latestPush;
            if (d.size = t ? Xo(d.currency, e, r) : 0,
                d.size > 0) {
                s += d.size;
                const e = d.currency.performance[r];
                e && e > a && (a = e)
            }
        }
        a = Math.min(20, a);
        const c = this.width * this.height
            , u = 0 === s ? 0 : c / s * .6;
        for (const d of this.bubbles) {
            const e = Math.sqrt(d.size * u / Math.PI);
            d.setRadius(e, l),
                d.setColor(Uo(d.currency, t, r, n, a)),
                d.setContent(Vo(d.currency, o, r, i)),
                d.posX = Fo(d.posX, e, this.width - e),
                d.posY = Fo(d.posY, e, this.height - e)
        }
        this.recalculationCount++,
            this.wakeUp()
    }
    setProperties(e) {
        this.properties = e,
            this.needsRecalculation = !0
    }
    pushCurrencies(e) {
        this.latestPush++;
        for (const t of e) {
            const { id: e } = t;
            let n = this.bubblesDict[e];
            n ? n.currency = t : (n = new qo(t),
                n.posX = Math.random() * this.width,
                n.posY = Math.random() * this.height,
                this.bubbles.push(n),
                this.bubblesDict[e] = n),
                n.latestPush = this.latestPush
        }
        this.recalculcate()
    }
}
const Jo = Q('<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z">')
    , Qo = e => (() => {
        const t = Jo();
        return ie(t, e, !0, !0),
            t
    }
    )()
    , ei = Q('<div class="loading"><img class="logo" width="64" height="64"><span>')
    , ti = Q('<div class="loading"><span>No internet connection');
function ni() {
    function e() {
        Nt("loading"),
            Ft()
    }
    return F(H, {
        get children() {
            return [F(X, {
                get when() {
                    return "loading" === Tt()
                },
                get children() {
                    const e = ei()
                        , t = e.firstChild;
                    return se(t.nextSibling, (() => dt().loading)),
                        b((e => {
                            const n = Fe.imageLogo
                                , r = Fe.appName
                                , o = `Logo of ${Fe.appName}`;
                            return n !== e._v$ && te(t, "src", e._v$ = n),
                                r !== e._v$2 && te(t, "alt", e._v$2 = r),
                                o !== e._v$3 && te(t, "title", e._v$3 = o),
                                e
                        }
                        ), {
                            _v$: void 0,
                            _v$2: void 0,
                            _v$3: void 0
                        }),
                        e
                }
            }), F(X, {
                get when() {
                    return "loading-failed" === Tt()
                },
                get children() {
                    const t = ti()
                        , n = t.firstChild;
                    return t.$$click = e,
                        se(t, F(Qo, {}), n),
                        t
                }
            })]
        }
    })
}
ee(["click"]);
const ri = Q('<div class="bubble-chart"><canvas></canvas><p>');
function oi() {
    let e, t, n;
    const r = y((() => ({
        size: Ao().size,
        color: Ao().color,
        content: Ao().content,
        period: Ao().period,
        baseCurrency: st(),
        colors: pt()
    })))
        , o = () => {
            if (e) {
                const t = Ht.isDesktop ? 0 : 55
                    , n = Math.max(document.documentElement.clientHeight, window.innerHeight)
                    , r = Math.floor(n - e.offsetTop - t);
                e.style.height = `${r}px`
            }
        }
        , i = () => {
            n && n.wakeUp()
        }
        ;
    _((() => {
        if (window.addEventListener("focus", i),
            window.addEventListener("resize", o),
            o(),
            "ios" === Ht.env)
            for (let e = 0; e <= 1200; e += 400)
                window.setTimeout(o, e);
        t && (n = new Ko(t, r()),
            n.eventSelect.register((e => jr(e))),
            n.start())
    }
    )),
        C((() => {
            window.removeEventListener("focus", i),
                window.removeEventListener("resize", o),
                n && n.stop()
        }
        )),
        v((() => {
            n && n.pushCurrencies(Mo())
        }
        )),
        v((() => {
            n && n.setProperties(r())
        }
        )),
        v((() => {
            n && (n.selectedCurrencyId = Pt())
        }
        )),
        v((() => {
            n && (n.renderFavoriteBorder = !function () {
                const e = ct();
                return "list" === e.type && "favorite" === e.list[0]
            }())
        }
        ));
    return (() => {
        const n = ri()
            , r = n.firstChild
            , o = r.nextSibling;
        "function" == typeof e ? le(e, n) : e = n;
        return "function" == typeof t ? le(t, r) : t = r,
            se(o, Bo),
            se(n, F(ni, {}), null),
            b((() => ne(o, nn("toast", "list" === ct().type && "loaded" === Tt() && 0 === Mo().length && "open")))),
            n
    }
    )()
}
function ii(e, t) {
    switch (e) {
        case "hour":
            return t.period_hour;
        case "day":
            return t.period_day;
        case "month":
            return t.period_month;
        case "year":
            return t.period_year;
        case "min15":
            return "15 min";
        case "min5":
            return "5 min";
        case "min1":
            return "1 min";
        default:
            return t.period_week
    }
}
function li(e, t) {
    const n = function (e, t) {
        switch (e.size) {
            case "marketcap":
                return t.marketcap;
            case "volume":
                return t.volume;
            default:
                return ii(e.period, t)
        }
    }(e, t)
        , r = function (e, t) {
            switch (e.content) {
                case "dominance":
                    return t.dominance;
                case "marketcap":
                    return t.marketcap;
                case "volume":
                    return t.volume;
                case "name":
                    return t.currencyName;
                case "price":
                    return t.price;
                case "rank":
                    return t.rank;
                default:
                    return ii(e.period, t)
            }
        }(e, t);
    return n === r ? n : `${n} + ${r}`
}
function si(e) {
    const t = () => ft.length >= 2
        , n = t => {
            const n = ft.findIndex((t => t.id === e.value.id));
            -1 !== n && t(n)
        }
        , r = () => {
            t() && n((t => {
                const n = e.value
                    , r = ft[Math.max(t - 1, 0)];
                e.onClose(),
                    vt(r.id),
                    mt((e => e.filter((e => e.id !== n.id))))
            }
            ))
        }
        , o = e => {
            n((t => mt(t, "name", e)))
        }
        , i = e => {
            n((t => mt(t, "size", e)))
        }
        , l = e => {
            n((t => mt(t, "content", e)))
        }
        , s = e => {
            n((t => mt(t, "color", e)))
        }
        , a = e => {
            n((t => mt(t, "period", e)))
        }
        ;
    return F(qn, {
        class: "configuration-window",
        get onClose() {
            return e.onClose
        },
        get header() {
            return [F(ar, {
                get value() {
                    return e.value.name
                },
                action: "clear",
                iconComponent: or,
                get placeholder() {
                    return li(e.value, dt())
                },
                onInput: o
            }), F(V, {
                get when() {
                    return t()
                },
                get children() {
                    return F(er, {
                        onDelete: r
                    })
                }
            })]
        },
        get children() {
            return [F(Bn, {
                get label() {
                    return dt().period
                },
                get value() {
                    return e.value.period
                },
                onChange: a,
                get children() {
                    return Ze.periods.map((e => ({
                        value: e,
                        label: ii(e, dt())
                    })))
                }
            }), F(Bn, {
                get label() {
                    return dt().bubble_size
                },
                get value() {
                    return e.value.size
                },
                onChange: i,
                get children() {
                    return [{
                        value: "performance",
                        label: dt().performance
                    }, {
                        value: "marketcap",
                        label: dt().marketcap
                    }, {
                        value: "volume",
                        label: dt().volume
                    }]
                }
            }), F(Bn, {
                get label() {
                    return dt().bubble_content
                },
                get value() {
                    return e.value.content
                },
                onChange: l,
                get children() {
                    return [{
                        value: "performance",
                        label: dt().performance
                    }, {
                        value: "marketcap",
                        label: dt().marketcap
                    }, {
                        value: "volume",
                        label: dt().volume
                    }, {
                        value: "price",
                        label: dt().price
                    }, {
                        value: "rank",
                        label: dt().rank
                    }, {
                        value: "name",
                        label: dt().currencyName
                    }, {
                        value: "dominance",
                        label: dt().dominance
                    }]
                }
            }), F(Bn, {
                get label() {
                    return dt().bubble_color
                },
                get value() {
                    return e.value.color
                },
                onChange: s,
                get children() {
                    return [{
                        value: "performance",
                        label: dt().performance
                    }, {
                        value: "neutral",
                        label: dt().neutral
                    }]
                }
            })]
        }
    })
}
const ai = Q("<button>");
function ci(e) {
    let t;
    const n = y((() => {
        const { color: t, period: n, size: r } = e.configuration;
        let o = 0
            , i = 0;
        if ("performance" === t)
            for (const e of Mo()) {
                const t = e.performance[n]
                    , l = Xo(e, r, n);
                if (l > 0) {
                    const e = Math.sqrt(l);
                    o += Math.sign(t || 0) * e,
                        i += e
                }
            }
        return o = i > 0 ? o / i : 0,
            Ir(o, pt())
    }
    ))
        , r = y((() => Ao().id === e.configuration.id));
    return v((() => {
        r() && t && e.onScrollTo(t)
    }
    )),
        (() => {
            const o = ai();
            o.addEventListener("drop", (t => {
                if (t.preventDefault(),
                    t.currentTarget.classList.remove("drop"),
                    t.dataTransfer) {
                    !function (e, t) {
                        const n = ft.find((t => t.id === e))
                            , r = ft.find((e => e.id === t));
                        n && r && mt(ft.map((o => o.id === e ? r : o.id === t ? n : o)))
                    }(t.dataTransfer.getData("text/plain"), e.configuration.id)
                }
            }
            )),
                o.addEventListener("dragleave", (e => e.currentTarget.classList.remove("drop"))),
                o.addEventListener("dragenter", (e => e.currentTarget.classList.add("drop"))),
                o.addEventListener("dragover", (e => e.preventDefault())),
                o.addEventListener("dragend", (e => e.currentTarget.classList.remove("drag"))),
                o.addEventListener("dragstart", (t => {
                    t.dataTransfer && (t.dataTransfer.setData("text/plain", e.configuration.id),
                        t.currentTarget.classList.add("drag"))
                }
                )),
                o.$$click = () => e.onClick(e.configuration);
            return "function" == typeof t ? le(t, o) : t = o,
                te(o, "draggable", !0),
                se(o, (() => {
                    return t = e.configuration,
                        n = dt(),
                        t.name && t.name.trim().length > 0 ? t.name : li(t, n);
                    var t, n
                }
                )),
                b((e => {
                    const t = nn("tab", r() && "selected")
                        , i = n();
                    return t !== e._v$ && ne(o, e._v$ = t),
                        i !== e._v$2 && (null != (e._v$2 = i) ? o.style.setProperty("border-color", i) : o.style.removeProperty("border-color")),
                        e
                }
                ), {
                    _v$: void 0,
                    _v$2: void 0
                }),
                o
        }
        )()
}
ee(["click"]);
const ui = Q('<div class="bubble-chart-header"><div class="configuration-tabs scroll-container">');
function di() {
    let e;
    const [t, n] = m(!1)
        , r = e => {
            bt() === e.id ? n(!t()) : vt(e.id)
        }
        , o = t => {
            e && function (e, t, n) {
                const r = {
                    left: t,
                    top: n,
                    behavior: "smooth"
                };
                try {
                    e.scrollTo(r)
                } catch (o) {
                    try {
                        e.scrollTo(t, n)
                    } catch (i) {
                        try {
                            e.scroll(r)
                        } catch (l) {
                            try {
                                e.scroll(t, n)
                            } catch (s) { }
                        }
                    }
                }
            }(e, t.offsetLeft - 64, 0)
        }
        , i = () => {
            const e = Re("day", "performance");
            mt((t => [...t, e])),
                vt(e.id),
                n(!0)
        }
        ;
    return (() => {
        const l = ui()
            , s = l.firstChild;
        return "function" == typeof e ? le(e, s) : e = s,
            se(s, F(U, {
                each: ft,
                children: e => F(ci, {
                    configuration: e,
                    onClick: r,
                    onScrollTo: o
                })
            })),
            se(l, F(on, {
                small: !0,
                get active() {
                    return t()
                },
                onClick: () => n(!t()),
                get title() {
                    return dt().configuration_edit
                },
                get children() {
                    return F(or, {})
                }
            }), null),
            se(l, F(on, {
                small: !0,
                onClick: i,
                get title() {
                    return dt().configuration_add
                },
                get children() {
                    return F(nr, {})
                }
            }), null),
            se(l, F(yr, {
                get value() {
                    return y((() => !!t()))() ? Ao() : null
                },
                component: si,
                onClose: () => n(!1)
            }), null),
            l
    }
    )()
}
function hi() {
    return [F(di, {}), F(oi, {})]
}
function pi(e) {
    const [t, n] = m(function (e) {
        try {
            const t = localStorage.getItem(e);
            return Boolean(t)
        } catch (t) { }
        return !1
    }(e));
    return [t, () => {
        n(!0),
            function (e) {
                try {
                    localStorage.setItem(e, "1")
                } catch (t) { }
            }(e)
    }
    ]
}
function gi() {
    try {
        window.scrollBy({
            top: 400,
            behavior: "smooth"
        })
    } catch (e) {
        window.scrollBy(0, 400)
    }
}
const fi = Q("<p><span>");
function mi() {
    const [e, t] = pi("1631714779047")
        , [n, r] = m(!0);
    if (e())
        return null;
    const o = window.setTimeout((() => r(!1)), 1e4)
        , i = () => {
            t(),
                r(!0),
                window.clearTimeout(o),
                window.removeEventListener("scroll", i)
        }
        ;
    return window.addEventListener("scroll", i),
        C(i),
        (() => {
            const e = fi()
                , t = e.firstChild;
            return re(e, "click", gi, !0),
                se(e, F(_o, {}), t),
                se(t, (() => dt().scroll_toast)),
                se(e, F(_o, {}), null),
                b((() => ne(e, nn("toast", "scroll-toast", n() && "closed")))),
                e
        }
        )()
}
ee(["click"]);
const bi = Q("<main>")
    , vi = Q('<div class="nav-filler">');
function yi() {
    return F(H, {
        get children() {
            return [F(X, {
                get when() {
                    return Ht.isDesktop
                },
                get children() {
                    return [(() => {
                        const e = bi();
                        return se(e, F(hi, {}), null),
                            se(e, F(jo, {}), null),
                            se(e, F(mi, {}), null),
                            e
                    }
                    )(), F(Rr, {})]
                }
            }), F(X, {
                get when() {
                    return "bubbles" === St()
                },
                get children() {
                    const e = bi();
                    return se(e, F(hi, {})),
                        e
                }
            }), F(X, {
                get when() {
                    return "list" === St()
                },
                get children() {
                    return [(() => {
                        const e = bi();
                        return se(e, F(jo, {})),
                            e
                    }
                    )(), vi()]
                }
            }), F(X, {
                get when() {
                    return "settings" === St()
                },
                get children() {
                    return [(() => {
                        const e = bi();
                        return se(e, F(fr, {})),
                            e
                    }
                    )(), F(Rr, {}), vi()]
                }
            })]
        }
    })
}
class wi extends Zo {
    constructor(e) {
        super(e),
            this.quotes = null,
            this.baseCurrency = null,
            this.period = null,
            this.colors = "red-green",
            this.pointerX = null,
            this.eventFrame.register((() => this.render())),
            this.eventResize.register((() => this.render())),
            this.canvas.addEventListener("pointermove", (e => this.handlePointerUpdate(e))),
            this.canvas.addEventListener("pointerdown", (e => this.handlePointerUpdate(e))),
            this.canvas.addEventListener("pointerout", (e => this.handlePointerOut(e)))
    }
    handlePointerUpdate(e) {
        if (e.isPrimary) {
            const t = Math.round(e.offsetX * window.devicePixelRatio);
            t !== this.pointerX && (this.pointerX = t,
                this.render())
        }
    }
    handlePointerOut(e) {
        e.isPrimary && null !== this.pointerX && (this.pointerX = null,
            this.render())
    }
    drawPointOnChart(e, t, n, r) {
        const { context: o, width: i, height: l } = this
            , { x: s, y: a } = t
            , c = window.devicePixelRatio
            , u = .5 * i
            , d = .5 * l
            , h = Fr(e, n);
        o.beginPath(),
            o.arc(s, a, 5 * c, 0, 2 * Math.PI),
            o.fillStyle = r,
            o.fill(),
            o.textAlign = s < u ? "left" : "right",
            o.fillText(h, s + (s < u ? 8 : -8) * c, a + (a < d ? -10 : 10) * c)
    }
    render() {
        const { quotes: e, baseCurrency: t, period: n, context: r, width: o, height: i, pointerX: l } = this
            , s = window.devicePixelRatio;
        if (this.clear(),
            null === t || null === n || null === e || 0 === e.length)
            return;
        const a = o / (e.length - 1);
        let c = e[0].p
            , u = e[0].p;
        for (const C of e)
            C.p > u && (u = C.p),
                C.p < c && (c = C.p);
        const d = u - c;
        let h = 0
            , p = {
                x: 0,
                y: 0
            }
            , g = {
                x: 0,
                y: 0
            }
            , f = null
            , m = null;
        r.beginPath();
        for (const C of e) {
            const e = C.p
                , t = (.8 - .7 * ((e - c) / d)) * i;
            e === c && (p.x = h,
                p.y = t),
                e === u && (g.x = h,
                    g.y = t),
                l && !f && l < h + a / 2 && (f = {
                    x: h,
                    y: t
                },
                    m = C),
                0 === h ? r.moveTo(h, t + 1) : r.lineTo(h, t + 1),
                h += a
        }
        r.lineWidth = 2 * s,
            r.strokeStyle = "white",
            r.lineJoin = "round",
            r.stroke(),
            r.lineTo(h, i),
            r.lineTo(0, i),
            r.closePath();
        const b = r.createLinearGradient(0, 0, 0, i);
        b.addColorStop(0, "rgba(0, 100, 255, 1)"),
            b.addColorStop(1, "rgba(0, 100, 255, 0)"),
            r.fillStyle = b,
            r.fill();
        const v = Math.round(20 * s);
        r.font = `${v}px Arial`,
            r.textBaseline = "middle";
        const y = Ir(1, this.colors) || "#3f3"
            , w = Ir(-1, this.colors) || "#f55";
        if (this.drawPointOnChart(c, p, t, w),
            this.drawPointOnChart(u, g, t, y),
            f && m) {
            const { p: e, t: l } = m
                , a = Fr(e, t);
            let c = 0;
            try {
                c = r.measureText(a).width
            } catch (_) { }
            c = c || 150;
            const u = 6 * s
                , d = 4 * s
                , h = c + 2 * u
                , p = v + 2 * d
                , g = Fo(f.x - h / 2, 0, o - h)
                , b = 0;
            r.strokeStyle = "#666",
                r.beginPath(),
                r.moveTo(f.x, 0),
                r.lineTo(f.x, i),
                r.closePath(),
                r.stroke(),
                r.fillStyle = "white",
                r.beginPath(),
                r.arc(f.x, f.y, 5 * s, 0, 2 * Math.PI),
                r.closePath(),
                r.fill(),
                r.fillStyle = "#666",
                r.fillRect(g, b, h, p),
                r.textAlign = "left",
                r.textBaseline = "top",
                r.fillStyle = "white",
                r.fillText(a, g + u, b + d);
            const y = new Date(1e3 * l);
            y.setSeconds(0),
                "week" !== n && "month" !== n || y.setMinutes(0);
            let w = y.toLocaleString();
            if ("year" === n)
                w = y.toLocaleDateString();
            else
                try {
                    w = y.toLocaleString(void 0, {
                        dateStyle: "medium",
                        timeStyle: "short"
                    })
                } catch (_) { }
            r.textAlign = "right",
                r.textBaseline = "bottom",
                r.fillStyle = "#ccc",
                r.fillText(w, o - 6 * s, i - 6 * s)
        }
    }
}
const _i = Q("<div><canvas></canvas><img><p>");
function Ci(e) {
    let t, n;
    const r = new Ee
        , [o, i] = m(null)
        , l = () => {
            const t = `data/charts/${e.period}/${e.currency.id}/${st().id.toUpperCase()}.json`;
            r.get(t).then(i)
        }
        ;
    return _((() => {
        t && (n = new wi(t),
            n.start()),
            Ht.eventUpdateData.register(l)
    }
    )),
        C((() => {
            n && n.stop(),
                Ht.eventUpdateData.unregister(l),
                r.abort()
        }
        )),
        v((() => {
            i(null),
                l()
        }
        )),
        v((() => {
            n && (n.quotes = o(),
                n.colors = pt(),
                n.baseCurrency = st(),
                n.period = e.period,
                n.requestFrame())
        }
        )),
        (() => {
            const n = _i()
                , r = n.firstChild
                , i = r.nextSibling
                , l = i.nextSibling;
            return "function" == typeof t ? le(t, r) : t = r,
                se(l, (() => ii(e.period, dt()))),
                b((t => {
                    const r = nn("price-chart", o() && "loaded")
                        , l = e.currency.image
                        , s = e.currency.name;
                    return r !== t._v$ && ne(n, t._v$ = r),
                        l !== t._v$2 && te(i, "src", t._v$2 = l),
                        s !== t._v$3 && te(i, "alt", t._v$3 = s),
                        t
                }
                ), {
                    _v$: void 0,
                    _v$2: void 0,
                    _v$3: void 0
                }),
                n
        }
        )()
}
const ki = Q('<p class="bubble-window-price"><span>');
function xi(e) {
    const [t, n] = m("1")
        , r = () => {
            let n = function (e, t) {
                try {
                    const t = Number.parseFloat(e);
                    if (Number.isFinite(t) && !Number.isNaN(t))
                        return t
                } catch (n) { }
                return t
            }(t(), 1);
            return n < 0 && (n = 1),
                e.currency.price * n
        }
        ;
    return (() => {
        const o = ki()
            , i = o.firstChild;
        return se(o, F(ar, {
            get value() {
                return t()
            },
            iconComponent: or,
            placeholder: "1",
            type: "number",
            onInput: n
        }), i),
            se(i, (() => `${e.currency.symbol} =`)),
            se(o, F(ao, {
                format: "currency",
                get children() {
                    return r()
                }
            }), null),
            o
    }
    )()
}
const Li = Q('<div class="bubble-window-details"><p><span></span></p><p><span></span></p><p><span>')
    , $i = Q('<div class="bubble-window-performance">')
    , Mi = Q('<div class="grow">')
    , Ai = Q("<p><span></span><span>")
    , Si = ["hour", "day", "week", "month", "year"];
function Bi(e) {
    const [t, n] = m("week");
    return v((() => {
        const e = Ao().period;
        n("min1" === e || "min5" === e || "min15" === e ? "hour" : e)
    }
    )),
        F(qn, {
            class: "bubble-window",
            get onClose() {
                return e.onClose
            },
            get header() {
                return [F(mo, {
                    get currency() {
                        return e.value
                    }
                }), F(Yr, {
                    get currency() {
                        return e.value
                    }
                }), Mi()]
            },
            get children() {
                return [F(io, {
                    get currency() {
                        return e.value
                    }
                }), F(V, {
                    keyed: !0,
                    get when() {
                        return e.value.id
                    },
                    get children() {
                        return F(xi, {
                            get currency() {
                                return e.value
                            }
                        })
                    }
                }), (() => {
                    const n = Li()
                        , r = n.firstChild
                        , o = r.firstChild
                        , i = r.nextSibling
                        , l = i.firstChild
                        , s = i.nextSibling
                        , a = s.firstChild;
                    return se(o, (() => dt().rank)),
                        se(r, F(V, {
                            keyed: !0,
                            get when() {
                                return e.value.id
                            },
                            get children() {
                                return F(go, {
                                    animate: !0,
                                    get currency() {
                                        return e.value
                                    },
                                    get period() {
                                        return t()
                                    }
                                })
                            }
                        }), null),
                        se(l, (() => dt().marketcap)),
                        se(i, F(V, {
                            keyed: !0,
                            get when() {
                                return e.value.id
                            },
                            get children() {
                                return F(ao, {
                                    format: "currency",
                                    get children() {
                                        return e.value.marketcap
                                    }
                                })
                            }
                        }), null),
                        se(a, (() => dt().volume)),
                        se(s, F(V, {
                            keyed: !0,
                            get when() {
                                return e.value.id
                            },
                            get children() {
                                return F(ao, {
                                    format: "currency",
                                    get children() {
                                        return e.value.volume
                                    }
                                })
                            }
                        }), null),
                        n
                }
                )(), F(Ci, {
                    get period() {
                        return t()
                    },
                    get currency() {
                        return e.value
                    }
                }), (() => {
                    const r = $i();
                    return se(r, F(U, {
                        each: Si,
                        children: r => {
                            const o = y((() => Ur(e.value.performance[r], pt(), !0)));
                            return (() => {
                                const e = Ai()
                                    , i = e.firstChild
                                    , l = i.nextSibling;
                                return e.$$click = () => n(r),
                                    se(i, (() => ii(r, dt()))),
                                    se(l, (() => o().text)),
                                    b((n => {
                                        const i = nn(r === t() && "selected")
                                            , s = (() => {
                                                const { color: e } = o();
                                                return e ? `color: ${e}` : ""
                                            }
                                            )();
                                        return i !== n._v$ && ne(e, n._v$ = i),
                                            n._v$2 = oe(l, s, n._v$2),
                                            n
                                    }
                                    ), {
                                        _v$: void 0,
                                        _v$2: void 0
                                    }),
                                    e
                            }
                            )()
                        }
                    })),
                        r
                }
                )()]
            }
        })
}
ee(["click"]);
const Pi = Q('<svg viewBox="0 0 24 24"><circle cx="7.2" cy="14.4" r="3.2"></circle><circle cx="14.8" cy="18" r="2"></circle><circle cx="15.2" cy="8.8" r="4.8">')
    , zi = Q('<svg viewBox="2 2 20 20"><path d="M7,9H2V7h5V9z M7,12H2v2h5V12z M20.59,19l-3.83-3.83C15.96,15.69,15.02,16,14,16c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 c0,1.02-0.31,1.96-0.83,2.75L22,17.59L20.59,19z M17,11c0-1.65-1.35-3-3-3s-3,1.35-3,3s1.35,3,3,3S17,12.65,17,11z M2,19h10v-2H2 V19z">')
    , Ti = Q('<div class="navigation"><div></div><div class="navigation-pages">')
    , Ni = [{
        page: "bubbles",
        iconComponent: e => (() => {
            const t = Pi();
            return ie(t, e, !0, !0),
                t
        }
        )()
    }, {
        page: "list",
        iconComponent: e => (() => {
            const t = zi();
            return ie(t, e, !0, !0),
                t
        }
        )()
    }, {
        page: "settings",
        iconComponent: cn
    }];
function Ei() {
    return (() => {
        const e = Ti()
            , t = e.firstChild
            , n = t.nextSibling;
        return se(t, F(Un, {})),
            se(n, F(U, {
                each: Ni,
                children: e => F(An, {
                    get active() {
                        return St() === e.page
                    },
                    onClick: () => {
                        return t = e.page,
                            void (St() !== t && (Bt(t),
                                window.scroll(0, 0)));
                        var t
                    }
                    ,
                    get children() {
                        return F(e.iconComponent, {})
                    }
                })
            })),
            e
    }
    )()
}
function Di() {
    return v((() => tt.save())),
        v((() => Ft())),
        [F(tn, {}), F(Cr, {}), F(yi, {}), F(V, {
            get when() {
                return Ht.isMobile
            },
            get children() {
                return F(Ei, {})
            }
        }), F(yr, {
            get value() {
                return So()
            },
            component: Bi,
            onClose: () => zt(null)
        })]
}
const Oi = window.matchMedia("(display-mode: standalone)").matches
    , Ri = document.getElementById("app")
    , ji = Oi ? "pwa" : Ri.className;
Ht.create(ji),
    window.addEventListener("load", (() => {
        !function (e, t, n, r = {}) {
            let o;
            f((r => {
                o = r,
                    t === document ? e() : se(t, e(), t.firstChild ? null : void 0, n)
            }
            ), r.owner)
        }((() => F(Di, {})), Ri),
            Ht.isWeb && "serviceWorker" in navigator && navigator.serviceWorker.register("./sw.js")
    }
    ));
