/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = globalThis, pe = Nt.ShadowRoot && (Nt.ShadyCSS === void 0 || Nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ge = Symbol(), Te = /* @__PURE__ */ new WeakMap();
let cn = class {
  constructor(e, n, r) {
    if (this._$cssResult$ = !0, r !== ge)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (pe && e === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (e = Te.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Te.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ir = (t) => new cn(typeof t == "string" ? t : t + "", void 0, ge), sr = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((r, i, s) => r + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[s + 1], t[0]);
  return new cn(n, t, ge);
}, or = (t, e) => {
  if (pe)
    t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else
    for (const n of e) {
      const r = document.createElement("style"), i = Nt.litNonce;
      i !== void 0 && r.setAttribute("nonce", i), r.textContent = n.cssText, t.appendChild(r);
    }
}, Pe = pe ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const r of e.cssRules)
    n += r.cssText;
  return ir(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ar, defineProperty: ur, getOwnPropertyDescriptor: lr, getOwnPropertyNames: cr, getOwnPropertySymbols: hr, getPrototypeOf: fr } = Object, I = globalThis, Re = I.trustedTypes, dr = Re ? Re.emptyScript : "", Kt = I.reactiveElementPolyfillSupport, ut = (t, e) => t, Rt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? dr : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, _e = (t, e) => !ar(t, e), He = { attribute: !0, type: String, converter: Rt, reflect: !1, hasChanged: _e };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), I.litPropertyMetadata ?? (I.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Z = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = He) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.elementProperties.set(e, n), !n.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, n);
      i !== void 0 && ur(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, r) {
    const { get: i, set: s } = lr(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(o) {
      const a = i == null ? void 0 : i.call(this);
      s.call(this, o), this.requestUpdate(e, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? He;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ut("elementProperties")))
      return;
    const e = fr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ut("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ut("properties"))) {
      const n = this.properties, r = [...cr(n), ...hr(n)];
      for (const i of r)
        this.createProperty(i, n[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0)
        for (const [r, i] of n)
          this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, r] of this.elementProperties) {
      const i = this._$Eu(n, r);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r)
        n.unshift(Pe(i));
    } else
      e !== void 0 && n.push(Pe(e));
    return n;
  }
  static _$Eu(e, n) {
    const r = n.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((n) => n(this));
  }
  addController(e) {
    var n;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((n = e.hostConnected) == null || n.call(e));
  }
  removeController(e) {
    var n;
    (n = this._$EO) == null || n.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const r of n.keys())
      this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return or(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((n) => {
      var r;
      return (r = n.hostConnected) == null ? void 0 : r.call(n);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var r;
      return (r = n.hostDisconnected) == null ? void 0 : r.call(n);
    });
  }
  attributeChangedCallback(e, n, r) {
    this._$AK(e, r);
  }
  _$EC(e, n) {
    var s;
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((s = r.converter) == null ? void 0 : s.toAttribute) !== void 0 ? r.converter : Rt).toAttribute(n, r.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var s;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = r.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? o.converter : Rt;
      this._$Em = i, this[i] = a.fromAttribute(n, o.type), this._$Em = null;
    }
  }
  requestUpdate(e, n, r) {
    if (e !== void 0) {
      if (r ?? (r = this.constructor.getPropertyOptions(e)), !(r.hasChanged ?? _e)(this[e], n))
        return;
      this.P(e, n, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, n, r) {
    this._$AL.has(e) || this._$AL.set(e, n), r.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, o] of this._$Ep)
          this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [s, o] of i)
          o.wrapped !== !0 || this._$AL.has(s) || this[s] === void 0 || this.P(s, this[s], o);
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (r = this._$EO) == null || r.forEach((i) => {
        var s;
        return (s = i.hostUpdate) == null ? void 0 : s.call(i);
      }), this.update(n)) : this._$EU();
    } catch (i) {
      throw e = !1, this._$EU(), i;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var n;
    (n = this._$EO) == null || n.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((n) => this._$EC(n, this[n]))), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Z.elementStyles = [], Z.shadowRootOptions = { mode: "open" }, Z[ut("elementProperties")] = /* @__PURE__ */ new Map(), Z[ut("finalized")] = /* @__PURE__ */ new Map(), Kt == null || Kt({ ReactiveElement: Z }), (I.reactiveElementVersions ?? (I.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = globalThis, Ht = lt.trustedTypes, Oe = Ht ? Ht.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, hn = "$lit$", U = `lit$${(Math.random() + "").slice(9)}$`, fn = "?" + U, pr = `<${fn}>`, V = document, ht = () => V.createComment(""), ft = (t) => t === null || typeof t != "object" && typeof t != "function", dn = Array.isArray, gr = (t) => dn(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Zt = `[ 	
\f\r]`, rt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ue = /-->/g, Ie = />/g, z = RegExp(`>|${Zt}(?:([^\\s"'>=/]+)(${Zt}*=${Zt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), De = /'/g, Le = /"/g, pn = /^(?:script|style|textarea|title)$/i, gn = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), _r = gn(1), mr = gn(2), Y = Symbol.for("lit-noChange"), y = Symbol.for("lit-nothing"), ze = /* @__PURE__ */ new WeakMap(), F = V.createTreeWalker(V, 129);
function _n(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Oe !== void 0 ? Oe.createHTML(e) : e;
}
const yr = (t, e) => {
  const n = t.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : "", o = rt;
  for (let a = 0; a < n; a++) {
    const u = t[a];
    let l, h, c = -1, f = 0;
    for (; f < u.length && (o.lastIndex = f, h = o.exec(u), h !== null); )
      f = o.lastIndex, o === rt ? h[1] === "!--" ? o = Ue : h[1] !== void 0 ? o = Ie : h[2] !== void 0 ? (pn.test(h[2]) && (i = RegExp("</" + h[2], "g")), o = z) : h[3] !== void 0 && (o = z) : o === z ? h[0] === ">" ? (o = i ?? rt, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? z : h[3] === '"' ? Le : De) : o === Le || o === De ? o = z : o === Ue || o === Ie ? o = rt : (o = z, i = void 0);
    const d = o === z && t[a + 1].startsWith("/>") ? " " : "";
    s += o === rt ? u + pr : c >= 0 ? (r.push(l), u.slice(0, c) + hn + u.slice(c) + U + d) : u + U + (c === -2 ? a : d);
  }
  return [_n(t, s + (t[n] || "<?>") + (e === 2 ? "</svg>" : "")), r];
};
class dt {
  constructor({ strings: e, _$litType$: n }, r) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const a = e.length - 1, u = this.parts, [l, h] = yr(e, n);
    if (this.el = dt.createElement(l, r), F.currentNode = this.el.content, n === 2) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = F.nextNode()) !== null && u.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const c of i.getAttributeNames())
            if (c.endsWith(hn)) {
              const f = h[o++], d = i.getAttribute(c).split(U), p = /([.?@])?(.*)/.exec(f);
              u.push({ type: 1, index: s, name: p[2], strings: d, ctor: p[1] === "." ? wr : p[1] === "?" ? $r : p[1] === "@" ? xr : Vt }), i.removeAttribute(c);
            } else
              c.startsWith(U) && (u.push({ type: 6, index: s }), i.removeAttribute(c));
        if (pn.test(i.tagName)) {
          const c = i.textContent.split(U), f = c.length - 1;
          if (f > 0) {
            i.textContent = Ht ? Ht.emptyScript : "";
            for (let d = 0; d < f; d++)
              i.append(c[d], ht()), F.nextNode(), u.push({ type: 2, index: ++s });
            i.append(c[f], ht());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === fn)
          u.push({ type: 2, index: s });
        else {
          let c = -1;
          for (; (c = i.data.indexOf(U, c + 1)) !== -1; )
            u.push({ type: 7, index: s }), c += U.length - 1;
        }
      s++;
    }
  }
  static createElement(e, n) {
    const r = V.createElement("template");
    return r.innerHTML = e, r;
  }
}
function j(t, e, n = t, r) {
  var o, a;
  if (e === Y)
    return e;
  let i = r !== void 0 ? (o = n._$Co) == null ? void 0 : o[r] : n._$Cl;
  const s = ft(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), s === void 0 ? i = void 0 : (i = new s(t), i._$AT(t, n, r)), r !== void 0 ? (n._$Co ?? (n._$Co = []))[r] = i : n._$Cl = i), i !== void 0 && (e = j(t, i._$AS(t, e.values), i, r)), e;
}
class vr {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? V).importNode(n, !0);
    F.currentNode = i;
    let s = F.nextNode(), o = 0, a = 0, u = r[0];
    for (; u !== void 0; ) {
      if (o === u.index) {
        let l;
        u.type === 2 ? l = new mt(s, s.nextSibling, this, e) : u.type === 1 ? l = new u.ctor(s, u.name, u.strings, this, e) : u.type === 6 && (l = new Ar(s, this, e)), this._$AV.push(l), u = r[++a];
      }
      o !== (u == null ? void 0 : u.index) && (s = F.nextNode(), o++);
    }
    return F.currentNode = V, i;
  }
  p(e) {
    let n = 0;
    for (const r of this._$AV)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, n), n += r.strings.length - 2) : r._$AI(e[n])), n++;
  }
}
class mt {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, n, r, i) {
    this.type = 2, this._$AH = y, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = j(this, e, n), ft(e) ? e === y || e == null || e === "" ? (this._$AH !== y && this._$AR(), this._$AH = y) : e !== this._$AH && e !== Y && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : gr(e) ? this.k(e) : this._(e);
  }
  S(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.S(e));
  }
  _(e) {
    this._$AH !== y && ft(this._$AH) ? this._$AA.nextSibling.data = e : this.T(V.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: n, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = dt.createElement(_n(r.h, r.h[0]), this.options)), r);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i)
      this._$AH.p(n);
    else {
      const o = new vr(i, this), a = o.u(this.options);
      o.p(n), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let n = ze.get(e.strings);
    return n === void 0 && ze.set(e.strings, n = new dt(e)), n;
  }
  k(e) {
    dn(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, i = 0;
    for (const s of e)
      i === n.length ? n.push(r = new mt(this.S(ht()), this.S(ht()), this, this.options)) : r = n[i], r._$AI(s), i++;
    i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, n); e && e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this._$Cv = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class Vt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, r, i, s) {
    this.type = 1, this._$AH = y, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = y;
  }
  _$AI(e, n = this, r, i) {
    const s = this.strings;
    let o = !1;
    if (s === void 0)
      e = j(this, e, n, 0), o = !ft(e) || e !== this._$AH && e !== Y, o && (this._$AH = e);
    else {
      const a = e;
      let u, l;
      for (e = s[0], u = 0; u < s.length - 1; u++)
        l = j(this, a[r + u], n, u), l === Y && (l = this._$AH[u]), o || (o = !ft(l) || l !== this._$AH[u]), l === y ? e = y : e !== y && (e += (l ?? "") + s[u + 1]), this._$AH[u] = l;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class wr extends Vt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === y ? void 0 : e;
  }
}
class $r extends Vt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== y);
  }
}
class xr extends Vt {
  constructor(e, n, r, i, s) {
    super(e, n, r, i, s), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = j(this, e, n, 0) ?? y) === Y)
      return;
    const r = this._$AH, i = e === y && r !== y || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== y && (r === y || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ar {
  constructor(e, n, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    j(this, e);
  }
}
const Jt = lt.litHtmlPolyfillSupport;
Jt == null || Jt(dt, mt), (lt.litHtmlVersions ?? (lt.litHtmlVersions = [])).push("3.1.2");
const br = (t, e, n) => {
  const r = (n == null ? void 0 : n.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = (n == null ? void 0 : n.renderBefore) ?? null;
    r._$litPart$ = i = new mt(e.insertBefore(ht(), s), s, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ct extends Z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var n;
    const e = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = e.firstChild), e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = br(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return Y;
  }
}
var ln;
ct._$litElement$ = !0, ct.finalized = !0, (ln = globalThis.litElementHydrateSupport) == null || ln.call(globalThis, { LitElement: ct });
const Qt = globalThis.litElementPolyfillSupport;
Qt == null || Qt({ LitElement: ct });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Er = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Sr = { attribute: !0, type: String, converter: Rt, reflect: !1, hasChanged: _e }, Mr = (t = Sr, e, n) => {
  const { kind: r, metadata: i } = n;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), s.set(n.name, t), r === "accessor") {
    const { name: o } = n;
    return { set(a) {
      const u = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, u, t);
    }, init(a) {
      return a !== void 0 && this.P(o, void 0, t), a;
    } };
  }
  if (r === "setter") {
    const { name: o } = n;
    return function(a) {
      const u = this[o];
      e.call(this, a), this.requestUpdate(o, u, t);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function me(t) {
  return (e, n) => typeof n == "object" ? Mr(t, e, n) : ((r, i, s) => {
    const o = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, o ? { ...r, wrapped: !0 } : r), o ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function mn(t) {
  return me({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nr = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Cr = (t) => (...e) => ({ _$litDirective$: t, values: e });
class kr {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, n, r) {
    this._$Ct = e, this._$AM = n, this._$Ci = r;
  }
  _$AS(e, n) {
    return this.update(e, n);
  }
  update(e, n) {
    return this.render(...n);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ee extends kr {
  constructor(e) {
    if (super(e), this.it = y, e.type !== Nr.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === y || e == null)
      return this._t = void 0, this.it = e;
    if (e === Y)
      return e;
    if (typeof e != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it)
      return this._t;
    this.it = e;
    const n = [e];
    return n.raw = n, this._t = { _$litType$: this.constructor.resultType, strings: n, values: [] };
  }
}
ee.directiveName = "unsafeHTML", ee.resultType = 1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ne extends ee {
}
ne.directiveName = "unsafeSVG", ne.resultType = 2;
const Tr = Cr(ne);
function Ct(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Pr(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function yn(t) {
  let e, n, r;
  t.length !== 2 ? (e = Ct, n = (a, u) => Ct(t(a), u), r = (a, u) => t(a) - u) : (e = t === Ct || t === Pr ? t : Rr, n = t, r = t);
  function i(a, u, l = 0, h = a.length) {
    if (l < h) {
      if (e(u, u) !== 0)
        return h;
      do {
        const c = l + h >>> 1;
        n(a[c], u) < 0 ? l = c + 1 : h = c;
      } while (l < h);
    }
    return l;
  }
  function s(a, u, l = 0, h = a.length) {
    if (l < h) {
      if (e(u, u) !== 0)
        return h;
      do {
        const c = l + h >>> 1;
        n(a[c], u) <= 0 ? l = c + 1 : h = c;
      } while (l < h);
    }
    return l;
  }
  function o(a, u, l = 0, h = a.length) {
    const c = i(a, u, l, h - 1);
    return c > l && r(a[c - 1], u) > -r(a[c], u) ? c - 1 : c;
  }
  return { left: i, center: o, right: s };
}
function Rr() {
  return 0;
}
function Hr(t) {
  return t === null ? NaN : +t;
}
const Or = yn(Ct), Ur = Or.right;
yn(Hr).center;
const Ir = Math.sqrt(50), Dr = Math.sqrt(10), Lr = Math.sqrt(2);
function Ot(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), s = r / Math.pow(10, i), o = s >= Ir ? 10 : s >= Dr ? 5 : s >= Lr ? 2 : 1;
  let a, u, l;
  return i < 0 ? (l = Math.pow(10, -i) / o, a = Math.round(t * l), u = Math.round(e * l), a / l < t && ++a, u / l > e && --u, l = -l) : (l = Math.pow(10, i) * o, a = Math.round(t / l), u = Math.round(e / l), a * l < t && ++a, u * l > e && --u), u < a && 0.5 <= n && n < 2 ? Ot(t, e, n * 2) : [a, u, l];
}
function zr(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0))
    return [];
  if (t === e)
    return [t];
  const r = e < t, [i, s, o] = r ? Ot(e, t, n) : Ot(t, e, n);
  if (!(s >= i))
    return [];
  const a = s - i + 1, u = new Array(a);
  if (r)
    if (o < 0)
      for (let l = 0; l < a; ++l)
        u[l] = (s - l) / -o;
    else
      for (let l = 0; l < a; ++l)
        u[l] = (s - l) * o;
  else if (o < 0)
    for (let l = 0; l < a; ++l)
      u[l] = (i + l) / -o;
  else
    for (let l = 0; l < a; ++l)
      u[l] = (i + l) * o;
  return u;
}
function re(t, e, n) {
  return e = +e, t = +t, n = +n, Ot(t, e, n)[2];
}
function qr(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? re(e, t, n) : re(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
var Fr = { value: () => {
} };
function vn() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new kt(n);
}
function kt(t) {
  this._ = t;
}
function Br(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
kt.prototype = vn.prototype = {
  constructor: kt,
  on: function(t, e) {
    var n = this._, r = Br(t + "", n), i, s = -1, o = r.length;
    if (arguments.length < 2) {
      for (; ++s < o; )
        if ((i = (t = r[s]).type) && (i = Xr(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++s < o; )
      if (i = (t = r[s]).type)
        n[i] = qe(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = qe(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new kt(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, s; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (s = this._[t], r = 0, i = s.length; r < i; ++r)
      s[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, s = r.length; i < s; ++i)
      r[i].value.apply(e, n);
  }
};
function Xr(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function qe(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Fr, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var ie = "http://www.w3.org/1999/xhtml";
const Fe = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ie,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Yt(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Fe.hasOwnProperty(e) ? { space: Fe[e], local: t } : t;
}
function Vr(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === ie && e.documentElement.namespaceURI === ie ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Yr(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function ye(t) {
  var e = Yt(t);
  return (e.local ? Yr : Vr)(e);
}
function Wr() {
}
function ve(t) {
  return t == null ? Wr : function() {
    return this.querySelector(t);
  };
}
function Gr(t) {
  typeof t != "function" && (t = ve(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = new Array(o), u, l, h = 0; h < o; ++h)
      (u = s[h]) && (l = t.call(u, u.__data__, h, s)) && ("__data__" in u && (l.__data__ = u.__data__), a[h] = l);
  return new S(r, this._parents);
}
function Kr(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Zr() {
  return [];
}
function wn(t) {
  return t == null ? Zr : function() {
    return this.querySelectorAll(t);
  };
}
function Jr(t) {
  return function() {
    return Kr(t.apply(this, arguments));
  };
}
function Qr(t) {
  typeof t == "function" ? t = Jr(t) : t = wn(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var o = e[s], a = o.length, u, l = 0; l < a; ++l)
      (u = o[l]) && (r.push(t.call(u, u.__data__, l, o)), i.push(u));
  return new S(r, i);
}
function $n(t) {
  return function() {
    return this.matches(t);
  };
}
function xn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var jr = Array.prototype.find;
function ti(t) {
  return function() {
    return jr.call(this.children, t);
  };
}
function ei() {
  return this.firstElementChild;
}
function ni(t) {
  return this.select(t == null ? ei : ti(typeof t == "function" ? t : xn(t)));
}
var ri = Array.prototype.filter;
function ii() {
  return Array.from(this.children);
}
function si(t) {
  return function() {
    return ri.call(this.children, t);
  };
}
function oi(t) {
  return this.selectAll(t == null ? ii : si(typeof t == "function" ? t : xn(t)));
}
function ai(t) {
  typeof t != "function" && (t = $n(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], u, l = 0; l < o; ++l)
      (u = s[l]) && t.call(u, u.__data__, l, s) && a.push(u);
  return new S(r, this._parents);
}
function An(t) {
  return new Array(t.length);
}
function ui() {
  return new S(this._enter || this._groups.map(An), this._parents);
}
function Ut(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Ut.prototype = {
  constructor: Ut,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function li(t) {
  return function() {
    return t;
  };
}
function ci(t, e, n, r, i, s) {
  for (var o = 0, a, u = e.length, l = s.length; o < l; ++o)
    (a = e[o]) ? (a.__data__ = s[o], r[o] = a) : n[o] = new Ut(t, s[o]);
  for (; o < u; ++o)
    (a = e[o]) && (i[o] = a);
}
function hi(t, e, n, r, i, s, o) {
  var a, u, l = /* @__PURE__ */ new Map(), h = e.length, c = s.length, f = new Array(h), d;
  for (a = 0; a < h; ++a)
    (u = e[a]) && (f[a] = d = o.call(u, u.__data__, a, e) + "", l.has(d) ? i[a] = u : l.set(d, u));
  for (a = 0; a < c; ++a)
    d = o.call(t, s[a], a, s) + "", (u = l.get(d)) ? (r[a] = u, u.__data__ = s[a], l.delete(d)) : n[a] = new Ut(t, s[a]);
  for (a = 0; a < h; ++a)
    (u = e[a]) && l.get(f[a]) === u && (i[a] = u);
}
function fi(t) {
  return t.__data__;
}
function di(t, e) {
  if (!arguments.length)
    return Array.from(this, fi);
  var n = e ? hi : ci, r = this._parents, i = this._groups;
  typeof t != "function" && (t = li(t));
  for (var s = i.length, o = new Array(s), a = new Array(s), u = new Array(s), l = 0; l < s; ++l) {
    var h = r[l], c = i[l], f = c.length, d = pi(t.call(h, h && h.__data__, l, r)), p = d.length, _ = a[l] = new Array(p), m = o[l] = new Array(p), A = u[l] = new Array(f);
    n(h, c, _, m, A, d, e);
    for (var x = 0, v = 0, E, w; x < p; ++x)
      if (E = _[x]) {
        for (x >= v && (v = x + 1); !(w = m[v]) && ++v < p; )
          ;
        E._next = w || null;
      }
  }
  return o = new S(o, r), o._enter = a, o._exit = u, o;
}
function pi(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function gi() {
  return new S(this._exit || this._groups.map(An), this._parents);
}
function _i(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function mi(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, o = Math.min(i, s), a = new Array(i), u = 0; u < o; ++u)
    for (var l = n[u], h = r[u], c = l.length, f = a[u] = new Array(c), d, p = 0; p < c; ++p)
      (d = l[p] || h[p]) && (f[p] = d);
  for (; u < i; ++u)
    a[u] = n[u];
  return new S(a, this._parents);
}
function yi() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], o; --i >= 0; )
      (o = r[i]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function vi(t) {
  t || (t = wi);
  function e(c, f) {
    return c && f ? t(c.__data__, f.__data__) : !c - !f;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var o = n[s], a = o.length, u = i[s] = new Array(a), l, h = 0; h < a; ++h)
      (l = o[h]) && (u[h] = l);
    u.sort(e);
  }
  return new S(i, this._parents).order();
}
function wi(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function $i() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function xi() {
  return Array.from(this);
}
function Ai() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var o = r[i];
      if (o)
        return o;
    }
  return null;
}
function bi() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function Ei() {
  return !this.node();
}
function Si(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, o = i.length, a; s < o; ++s)
      (a = i[s]) && t.call(a, a.__data__, s, i);
  return this;
}
function Mi(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ni(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ci(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ki(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ti(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Pi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Ri(t, e) {
  var n = Yt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ni : Mi : typeof e == "function" ? n.local ? Pi : Ti : n.local ? ki : Ci)(n, e));
}
function bn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Hi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Oi(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Ui(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Ii(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Hi : typeof e == "function" ? Ui : Oi)(t, e, n ?? "")) : tt(this.node(), t);
}
function tt(t, e) {
  return t.style.getPropertyValue(e) || bn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Di(t) {
  return function() {
    delete this[t];
  };
}
function Li(t, e) {
  return function() {
    this[t] = e;
  };
}
function zi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function qi(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Di : typeof e == "function" ? zi : Li)(t, e)) : this.node()[t];
}
function En(t) {
  return t.trim().split(/^|\s+/);
}
function we(t) {
  return t.classList || new Sn(t);
}
function Sn(t) {
  this._node = t, this._names = En(t.getAttribute("class") || "");
}
Sn.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Mn(t, e) {
  for (var n = we(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function Nn(t, e) {
  for (var n = we(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function Fi(t) {
  return function() {
    Mn(this, t);
  };
}
function Bi(t) {
  return function() {
    Nn(this, t);
  };
}
function Xi(t, e) {
  return function() {
    (e.apply(this, arguments) ? Mn : Nn)(this, t);
  };
}
function Vi(t, e) {
  var n = En(t + "");
  if (arguments.length < 2) {
    for (var r = we(this.node()), i = -1, s = n.length; ++i < s; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Xi : e ? Fi : Bi)(n, e));
}
function Yi() {
  this.textContent = "";
}
function Wi(t) {
  return function() {
    this.textContent = t;
  };
}
function Gi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ki(t) {
  return arguments.length ? this.each(t == null ? Yi : (typeof t == "function" ? Gi : Wi)(t)) : this.node().textContent;
}
function Zi() {
  this.innerHTML = "";
}
function Ji(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Qi(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function ji(t) {
  return arguments.length ? this.each(t == null ? Zi : (typeof t == "function" ? Qi : Ji)(t)) : this.node().innerHTML;
}
function ts() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function es() {
  return this.each(ts);
}
function ns() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function rs() {
  return this.each(ns);
}
function is(t) {
  var e = typeof t == "function" ? t : ye(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function ss() {
  return null;
}
function os(t, e) {
  var n = typeof t == "function" ? t : ye(t), r = e == null ? ss : typeof e == "function" ? e : ve(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function as() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function us() {
  return this.each(as);
}
function ls() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function cs() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function hs(t) {
  return this.select(t ? cs : ls);
}
function fs(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ds(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ps(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function gs(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function _s(t, e, n) {
  return function() {
    var r = this.__on, i, s = ds(e);
    if (r) {
      for (var o = 0, a = r.length; o < a; ++o)
        if ((i = r[o]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, s, n), i = { type: t.type, name: t.name, value: e, listener: s, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function ms(t, e, n) {
  var r = ps(t + ""), i, s = r.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var u = 0, l = a.length, h; u < l; ++u)
        for (i = 0, h = a[u]; i < s; ++i)
          if ((o = r[i]).type === h.type && o.name === h.name)
            return h.value;
    }
    return;
  }
  for (a = e ? _s : gs, i = 0; i < s; ++i)
    this.each(a(r[i], e, n));
  return this;
}
function Cn(t, e, n) {
  var r = bn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function ys(t, e) {
  return function() {
    return Cn(this, t, e);
  };
}
function vs(t, e) {
  return function() {
    return Cn(this, t, e.apply(this, arguments));
  };
}
function ws(t, e) {
  return this.each((typeof e == "function" ? vs : ys)(t, e));
}
function* $s() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, o; i < s; ++i)
      (o = r[i]) && (yield o);
}
var kn = [null];
function S(t, e) {
  this._groups = t, this._parents = e;
}
function yt() {
  return new S([[document.documentElement]], kn);
}
function xs() {
  return this;
}
S.prototype = yt.prototype = {
  constructor: S,
  select: Gr,
  selectAll: Qr,
  selectChild: ni,
  selectChildren: oi,
  filter: ai,
  data: di,
  enter: ui,
  exit: gi,
  join: _i,
  merge: mi,
  selection: xs,
  order: yi,
  sort: vi,
  call: $i,
  nodes: xi,
  node: Ai,
  size: bi,
  empty: Ei,
  each: Si,
  attr: Ri,
  style: Ii,
  property: qi,
  classed: Vi,
  text: Ki,
  html: ji,
  raise: es,
  lower: rs,
  append: is,
  insert: os,
  remove: us,
  clone: hs,
  datum: fs,
  on: ms,
  dispatch: ws,
  [Symbol.iterator]: $s
};
function As(t) {
  return typeof t == "string" ? new S([[document.querySelector(t)]], [document.documentElement]) : new S([[t]], kn);
}
function bs(t) {
  return As(ye(t).call(document.documentElement));
}
function $e(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Tn(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function vt() {
}
var pt = 0.7, It = 1 / pt, Q = "\\s*([+-]?\\d+)\\s*", gt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", T = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Es = /^#([0-9a-f]{3,8})$/, Ss = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`), Ms = new RegExp(`^rgb\\(${T},${T},${T}\\)$`), Ns = new RegExp(`^rgba\\(${Q},${Q},${Q},${gt}\\)$`), Cs = new RegExp(`^rgba\\(${T},${T},${T},${gt}\\)$`), ks = new RegExp(`^hsl\\(${gt},${T},${T}\\)$`), Ts = new RegExp(`^hsla\\(${gt},${T},${T},${gt}\\)$`), Be = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
$e(vt, W, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Xe,
  // Deprecated! Use color.formatHex.
  formatHex: Xe,
  formatHex8: Ps,
  formatHsl: Rs,
  formatRgb: Ve,
  toString: Ve
});
function Xe() {
  return this.rgb().formatHex();
}
function Ps() {
  return this.rgb().formatHex8();
}
function Rs() {
  return Pn(this).formatHsl();
}
function Ve() {
  return this.rgb().formatRgb();
}
function W(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Es.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Ye(e) : n === 3 ? new b(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? bt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? bt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ss.exec(t)) ? new b(e[1], e[2], e[3], 1) : (e = Ms.exec(t)) ? new b(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Ns.exec(t)) ? bt(e[1], e[2], e[3], e[4]) : (e = Cs.exec(t)) ? bt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = ks.exec(t)) ? Ke(e[1], e[2] / 100, e[3] / 100, 1) : (e = Ts.exec(t)) ? Ke(e[1], e[2] / 100, e[3] / 100, e[4]) : Be.hasOwnProperty(t) ? Ye(Be[t]) : t === "transparent" ? new b(NaN, NaN, NaN, 0) : null;
}
function Ye(t) {
  return new b(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function bt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new b(t, e, n, r);
}
function Hs(t) {
  return t instanceof vt || (t = W(t)), t ? (t = t.rgb(), new b(t.r, t.g, t.b, t.opacity)) : new b();
}
function se(t, e, n, r) {
  return arguments.length === 1 ? Hs(t) : new b(t, e, n, r ?? 1);
}
function b(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
$e(b, se, Tn(vt, {
  brighter(t) {
    return t = t == null ? It : Math.pow(It, t), new b(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? pt : Math.pow(pt, t), new b(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new b(X(this.r), X(this.g), X(this.b), Dt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: We,
  // Deprecated! Use color.formatHex.
  formatHex: We,
  formatHex8: Os,
  formatRgb: Ge,
  toString: Ge
}));
function We() {
  return `#${B(this.r)}${B(this.g)}${B(this.b)}`;
}
function Os() {
  return `#${B(this.r)}${B(this.g)}${B(this.b)}${B((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ge() {
  const t = Dt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${X(this.r)}, ${X(this.g)}, ${X(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Dt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function X(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function B(t) {
  return t = X(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Ke(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new C(t, e, n, r);
}
function Pn(t) {
  if (t instanceof C)
    return new C(t.h, t.s, t.l, t.opacity);
  if (t instanceof vt || (t = W(t)), !t)
    return new C();
  if (t instanceof C)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), o = NaN, a = s - i, u = (s + i) / 2;
  return a ? (e === s ? o = (n - r) / a + (n < r) * 6 : n === s ? o = (r - e) / a + 2 : o = (e - n) / a + 4, a /= u < 0.5 ? s + i : 2 - s - i, o *= 60) : a = u > 0 && u < 1 ? 0 : o, new C(o, a, u, t.opacity);
}
function Us(t, e, n, r) {
  return arguments.length === 1 ? Pn(t) : new C(t, e, n, r ?? 1);
}
function C(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
$e(C, Us, Tn(vt, {
  brighter(t) {
    return t = t == null ? It : Math.pow(It, t), new C(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? pt : Math.pow(pt, t), new C(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new b(
      jt(t >= 240 ? t - 240 : t + 120, i, r),
      jt(t, i, r),
      jt(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new C(Ze(this.h), Et(this.s), Et(this.l), Dt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Dt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Ze(this.h)}, ${Et(this.s) * 100}%, ${Et(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Ze(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Et(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function jt(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const xe = (t) => () => t;
function Is(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Ds(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Ls(t) {
  return (t = +t) == 1 ? Rn : function(e, n) {
    return n - e ? Ds(e, n, t) : xe(isNaN(e) ? n : e);
  };
}
function Rn(t, e) {
  var n = e - t;
  return n ? Is(t, n) : xe(isNaN(t) ? e : t);
}
const Lt = function t(e) {
  var n = Ls(e);
  function r(i, s) {
    var o = n((i = se(i)).r, (s = se(s)).r), a = n(i.g, s.g), u = n(i.b, s.b), l = Rn(i.opacity, s.opacity);
    return function(h) {
      return i.r = o(h), i.g = a(h), i.b = u(h), i.opacity = l(h), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function zs(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i)
      r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function qs(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Fs(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), o;
  for (o = 0; o < r; ++o)
    i[o] = Ae(t[o], e[o]);
  for (; o < n; ++o)
    s[o] = e[o];
  return function(a) {
    for (o = 0; o < r; ++o)
      s[o] = i[o](a);
    return s;
  };
}
function Bs(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function N(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Xs(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Ae(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n)
      r[i] = n[i](s);
    return r;
  };
}
var oe = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, te = new RegExp(oe.source, "g");
function Vs(t) {
  return function() {
    return t;
  };
}
function Ys(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Hn(t, e) {
  var n = oe.lastIndex = te.lastIndex = 0, r, i, s, o = -1, a = [], u = [];
  for (t = t + "", e = e + ""; (r = oe.exec(t)) && (i = te.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), a[o] ? a[o] += s : a[++o] = s), (r = r[0]) === (i = i[0]) ? a[o] ? a[o] += i : a[++o] = i : (a[++o] = null, u.push({ i: o, x: N(r, i) })), n = te.lastIndex;
  return n < e.length && (s = e.slice(n), a[o] ? a[o] += s : a[++o] = s), a.length < 2 ? u[0] ? Ys(u[0].x) : Vs(e) : (e = u.length, function(l) {
    for (var h = 0, c; h < e; ++h)
      a[(c = u[h]).i] = c.x(l);
    return a.join("");
  });
}
function Ae(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? xe(e) : (n === "number" ? N : n === "string" ? (r = W(e)) ? (e = r, Lt) : Hn : e instanceof W ? Lt : e instanceof Date ? Bs : qs(e) ? zs : Array.isArray(e) ? Fs : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Xs : N)(t, e);
}
function Ws(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var Je = 180 / Math.PI, ae = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function On(t, e, n, r, i, s) {
  var o, a, u;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (u = t * n + e * r) && (n -= t * u, r -= e * u), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, u /= a), t * r < e * n && (t = -t, e = -e, u = -u, o = -o), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * Je,
    skewX: Math.atan(u) * Je,
    scaleX: o,
    scaleY: a
  };
}
var St;
function Gs(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? ae : On(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Ks(t) {
  return t == null || (St || (St = document.createElementNS("http://www.w3.org/2000/svg", "g")), St.setAttribute("transform", t), !(t = St.transform.baseVal.consolidate())) ? ae : (t = t.matrix, On(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Un(t, e, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function s(l, h, c, f, d, p) {
    if (l !== c || h !== f) {
      var _ = d.push("translate(", null, e, null, n);
      p.push({ i: _ - 4, x: N(l, c) }, { i: _ - 2, x: N(h, f) });
    } else
      (c || f) && d.push("translate(" + c + e + f + n);
  }
  function o(l, h, c, f) {
    l !== h ? (l - h > 180 ? h += 360 : h - l > 180 && (l += 360), f.push({ i: c.push(i(c) + "rotate(", null, r) - 2, x: N(l, h) })) : h && c.push(i(c) + "rotate(" + h + r);
  }
  function a(l, h, c, f) {
    l !== h ? f.push({ i: c.push(i(c) + "skewX(", null, r) - 2, x: N(l, h) }) : h && c.push(i(c) + "skewX(" + h + r);
  }
  function u(l, h, c, f, d, p) {
    if (l !== c || h !== f) {
      var _ = d.push(i(d) + "scale(", null, ",", null, ")");
      p.push({ i: _ - 4, x: N(l, c) }, { i: _ - 2, x: N(h, f) });
    } else
      (c !== 1 || f !== 1) && d.push(i(d) + "scale(" + c + "," + f + ")");
  }
  return function(l, h) {
    var c = [], f = [];
    return l = t(l), h = t(h), s(l.translateX, l.translateY, h.translateX, h.translateY, c, f), o(l.rotate, h.rotate, c, f), a(l.skewX, h.skewX, c, f), u(l.scaleX, l.scaleY, h.scaleX, h.scaleY, c, f), l = h = null, function(d) {
      for (var p = -1, _ = f.length, m; ++p < _; )
        c[(m = f[p]).i] = m.x(d);
      return c.join("");
    };
  };
}
var Zs = Un(Gs, "px, ", "px)", "deg)"), Js = Un(Ks, ", ", ")", ")"), et = 0, st = 0, it = 0, In = 1e3, zt, ot, qt = 0, G = 0, Wt = 0, _t = typeof performance == "object" && performance.now ? performance : Date, Dn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function be() {
  return G || (Dn(Qs), G = _t.now() + Wt);
}
function Qs() {
  G = 0;
}
function Ft() {
  this._call = this._time = this._next = null;
}
Ft.prototype = Ln.prototype = {
  constructor: Ft,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? be() : +n) + (e == null ? 0 : +e), !this._next && ot !== this && (ot ? ot._next = this : zt = this, ot = this), this._call = t, this._time = n, ue();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ue());
  }
};
function Ln(t, e, n) {
  var r = new Ft();
  return r.restart(t, e, n), r;
}
function js() {
  be(), ++et;
  for (var t = zt, e; t; )
    (e = G - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --et;
}
function Qe() {
  G = (qt = _t.now()) + Wt, et = st = 0;
  try {
    js();
  } finally {
    et = 0, eo(), G = 0;
  }
}
function to() {
  var t = _t.now(), e = t - qt;
  e > In && (Wt -= e, qt = t);
}
function eo() {
  for (var t, e = zt, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : zt = n);
  ot = t, ue(r);
}
function ue(t) {
  if (!et) {
    st && (st = clearTimeout(st));
    var e = t - G;
    e > 24 ? (t < 1 / 0 && (st = setTimeout(Qe, t - _t.now() - Wt)), it && (it = clearInterval(it))) : (it || (qt = _t.now(), it = setInterval(to, In)), et = 1, Dn(Qe));
  }
}
function je(t, e, n) {
  var r = new Ft();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var no = vn("start", "end", "cancel", "interrupt"), ro = [], zn = 0, tn = 1, le = 2, Tt = 3, en = 4, ce = 5, Pt = 6;
function Gt(t, e, n, r, i, s) {
  var o = t.__transition;
  if (!o)
    t.__transition = {};
  else if (n in o)
    return;
  io(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: no,
    tween: ro,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: zn
  });
}
function Ee(t, e) {
  var n = k(t, e);
  if (n.state > zn)
    throw new Error("too late; already scheduled");
  return n;
}
function P(t, e) {
  var n = k(t, e);
  if (n.state > Tt)
    throw new Error("too late; already running");
  return n;
}
function k(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function io(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Ln(s, 0, n.time);
  function s(l) {
    n.state = tn, n.timer.restart(o, n.delay, n.time), n.delay <= l && o(l - n.delay);
  }
  function o(l) {
    var h, c, f, d;
    if (n.state !== tn)
      return u();
    for (h in r)
      if (d = r[h], d.name === n.name) {
        if (d.state === Tt)
          return je(o);
        d.state === en ? (d.state = Pt, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[h]) : +h < e && (d.state = Pt, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[h]);
      }
    if (je(function() {
      n.state === Tt && (n.state = en, n.timer.restart(a, n.delay, n.time), a(l));
    }), n.state = le, n.on.call("start", t, t.__data__, n.index, n.group), n.state === le) {
      for (n.state = Tt, i = new Array(f = n.tween.length), h = 0, c = -1; h < f; ++h)
        (d = n.tween[h].value.call(t, t.__data__, n.index, n.group)) && (i[++c] = d);
      i.length = c + 1;
    }
  }
  function a(l) {
    for (var h = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(u), n.state = ce, 1), c = -1, f = i.length; ++c < f; )
      i[c].call(t, h);
    n.state === ce && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Pt, n.timer.stop(), delete r[e];
    for (var l in r)
      return;
    delete t.__transition;
  }
}
function so(t, e) {
  var n = t.__transition, r, i, s = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((r = n[o]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > le && r.state < ce, r.state = Pt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[o];
    }
    s && delete t.__transition;
  }
}
function oo(t) {
  return this.each(function() {
    so(this, t);
  });
}
function ao(t, e) {
  var n, r;
  return function() {
    var i = P(this, t), s = i.tween;
    if (s !== n) {
      r = n = s;
      for (var o = 0, a = r.length; o < a; ++o)
        if (r[o].name === e) {
          r = r.slice(), r.splice(o, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function uo(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var s = P(this, t), o = s.tween;
    if (o !== r) {
      i = (r = o).slice();
      for (var a = { name: e, value: n }, u = 0, l = i.length; u < l; ++u)
        if (i[u].name === e) {
          i[u] = a;
          break;
        }
      u === l && i.push(a);
    }
    s.tween = i;
  };
}
function lo(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = k(this.node(), n).tween, i = 0, s = r.length, o; i < s; ++i)
      if ((o = r[i]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? ao : uo)(n, t, e));
}
function Se(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = P(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return k(i, r).value[e];
  };
}
function qn(t, e) {
  var n;
  return (typeof e == "number" ? N : e instanceof W ? Lt : (n = W(e)) ? (e = n, Lt) : Hn)(t, e);
}
function co(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ho(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function fo(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttribute(t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function po(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function go(t, e, n) {
  var r, i, s;
  return function() {
    var o, a = n(this), u;
    return a == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), u = a + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, a)));
  };
}
function _o(t, e, n) {
  var r, i, s;
  return function() {
    var o, a = n(this), u;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), u = a + "", o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, a)));
  };
}
function mo(t, e) {
  var n = Yt(t), r = n === "transform" ? Js : qn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? _o : go)(n, r, Se(this, "attr." + t, e)) : e == null ? (n.local ? ho : co)(n) : (n.local ? po : fo)(n, r, e));
}
function yo(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function vo(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function wo(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && vo(t, s)), n;
  }
  return i._value = e, i;
}
function $o(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && yo(t, s)), n;
  }
  return i._value = e, i;
}
function xo(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = Yt(t);
  return this.tween(n, (r.local ? wo : $o)(r, e));
}
function Ao(t, e) {
  return function() {
    Ee(this, t).delay = +e.apply(this, arguments);
  };
}
function bo(t, e) {
  return e = +e, function() {
    Ee(this, t).delay = e;
  };
}
function Eo(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ao : bo)(e, t)) : k(this.node(), e).delay;
}
function So(t, e) {
  return function() {
    P(this, t).duration = +e.apply(this, arguments);
  };
}
function Mo(t, e) {
  return e = +e, function() {
    P(this, t).duration = e;
  };
}
function No(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? So : Mo)(e, t)) : k(this.node(), e).duration;
}
function Co(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    P(this, t).ease = e;
  };
}
function ko(t) {
  var e = this._id;
  return arguments.length ? this.each(Co(e, t)) : k(this.node(), e).ease;
}
function To(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    P(this, t).ease = n;
  };
}
function Po(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(To(this._id, t));
}
function Ro(t) {
  typeof t != "function" && (t = $n(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], o = s.length, a = r[i] = [], u, l = 0; l < o; ++l)
      (u = s[l]) && t.call(u, u.__data__, l, s) && a.push(u);
  return new O(r, this._parents, this._name, this._id);
}
function Ho(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), o = new Array(r), a = 0; a < s; ++a)
    for (var u = e[a], l = n[a], h = u.length, c = o[a] = new Array(h), f, d = 0; d < h; ++d)
      (f = u[d] || l[d]) && (c[d] = f);
  for (; a < r; ++a)
    o[a] = e[a];
  return new O(o, this._parents, this._name, this._id);
}
function Oo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Uo(t, e, n) {
  var r, i, s = Oo(e) ? Ee : P;
  return function() {
    var o = s(this, t), a = o.on;
    a !== r && (i = (r = a).copy()).on(e, n), o.on = i;
  };
}
function Io(t, e) {
  var n = this._id;
  return arguments.length < 2 ? k(this.node(), n).on.on(t) : this.each(Uo(n, t, e));
}
function Do(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function Lo() {
  return this.on("end.remove", Do(this._id));
}
function zo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = ve(t));
  for (var r = this._groups, i = r.length, s = new Array(i), o = 0; o < i; ++o)
    for (var a = r[o], u = a.length, l = s[o] = new Array(u), h, c, f = 0; f < u; ++f)
      (h = a[f]) && (c = t.call(h, h.__data__, f, a)) && ("__data__" in h && (c.__data__ = h.__data__), l[f] = c, Gt(l[f], e, n, f, l, k(h, n)));
  return new O(s, this._parents, e, n);
}
function qo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = wn(t));
  for (var r = this._groups, i = r.length, s = [], o = [], a = 0; a < i; ++a)
    for (var u = r[a], l = u.length, h, c = 0; c < l; ++c)
      if (h = u[c]) {
        for (var f = t.call(h, h.__data__, c, u), d, p = k(h, n), _ = 0, m = f.length; _ < m; ++_)
          (d = f[_]) && Gt(d, e, n, _, f, p);
        s.push(f), o.push(h);
      }
  return new O(s, o, e, n);
}
var Fo = yt.prototype.constructor;
function Bo() {
  return new Fo(this._groups, this._parents);
}
function Xo(t, e) {
  var n, r, i;
  return function() {
    var s = tt(this, t), o = (this.style.removeProperty(t), tt(this, t));
    return s === o ? null : s === n && o === r ? i : i = e(n = s, r = o);
  };
}
function Fn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Vo(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var o = tt(this, t);
    return o === i ? null : o === r ? s : s = e(r = o, n);
  };
}
function Yo(t, e, n) {
  var r, i, s;
  return function() {
    var o = tt(this, t), a = n(this), u = a + "";
    return a == null && (u = a = (this.style.removeProperty(t), tt(this, t))), o === u ? null : o === r && u === i ? s : (i = u, s = e(r = o, a));
  };
}
function Wo(t, e) {
  var n, r, i, s = "style." + e, o = "end." + s, a;
  return function() {
    var u = P(this, t), l = u.on, h = u.value[s] == null ? a || (a = Fn(e)) : void 0;
    (l !== n || i !== h) && (r = (n = l).copy()).on(o, i = h), u.on = r;
  };
}
function Go(t, e, n) {
  var r = (t += "") == "transform" ? Zs : qn;
  return e == null ? this.styleTween(t, Xo(t, r)).on("end.style." + t, Fn(t)) : typeof e == "function" ? this.styleTween(t, Yo(t, r, Se(this, "style." + t, e))).each(Wo(this._id, t)) : this.styleTween(t, Vo(t, r, e), n).on("end.style." + t, null);
}
function Ko(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Zo(t, e, n) {
  var r, i;
  function s() {
    var o = e.apply(this, arguments);
    return o !== i && (r = (i = o) && Ko(t, o, n)), r;
  }
  return s._value = e, s;
}
function Jo(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, Zo(t, e, n ?? ""));
}
function Qo(t) {
  return function() {
    this.textContent = t;
  };
}
function jo(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function ta(t) {
  return this.tween("text", typeof t == "function" ? jo(Se(this, "text", t)) : Qo(t == null ? "" : t + ""));
}
function ea(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function na(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && ea(i)), e;
  }
  return r._value = t, r;
}
function ra(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, na(t));
}
function ia() {
  for (var t = this._name, e = this._id, n = Bn(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], a = o.length, u, l = 0; l < a; ++l)
      if (u = o[l]) {
        var h = k(u, e);
        Gt(u, t, n, l, o, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new O(r, this._parents, t, n);
}
function sa() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, o) {
    var a = { value: o }, u = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var l = P(this, r), h = l.on;
      h !== t && (e = (t = h).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(u)), l.on = e;
    }), i === 0 && s();
  });
}
var oa = 0;
function O(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Bn() {
  return ++oa;
}
var H = yt.prototype;
O.prototype = {
  constructor: O,
  select: zo,
  selectAll: qo,
  selectChild: H.selectChild,
  selectChildren: H.selectChildren,
  filter: Ro,
  merge: Ho,
  selection: Bo,
  transition: ia,
  call: H.call,
  nodes: H.nodes,
  node: H.node,
  size: H.size,
  empty: H.empty,
  each: H.each,
  on: Io,
  attr: mo,
  attrTween: xo,
  style: Go,
  styleTween: Jo,
  text: ta,
  textTween: ra,
  remove: Lo,
  tween: lo,
  delay: Eo,
  duration: No,
  ease: ko,
  easeVarying: Po,
  end: sa,
  [Symbol.iterator]: H[Symbol.iterator]
};
function aa(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ua = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: aa
};
function la(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function ca(t) {
  var e, n;
  t instanceof O ? (e = t._id, t = t._name) : (e = Bn(), (n = ua).time = be(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var o = r[s], a = o.length, u, l = 0; l < a; ++l)
      (u = o[l]) && Gt(u, t, e, l, o, n || la(u, e));
  return new O(r, this._parents, t, e);
}
yt.prototype.interrupt = oo;
yt.prototype.transition = ca;
const he = Math.PI, fe = 2 * he, q = 1e-6, ha = fe - q;
function Xn(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function fa(t) {
  let e = Math.floor(t);
  if (!(e >= 0))
    throw new Error(`invalid digits: ${t}`);
  if (e > 15)
    return Xn;
  const n = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let i = 1, s = r.length; i < s; ++i)
      this._ += Math.round(arguments[i] * n) / n + r[i];
  };
}
class da {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Xn : fa(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, r, i) {
    this._append`Q${+e},${+n},${this._x1 = +r},${this._y1 = +i}`;
  }
  bezierCurveTo(e, n, r, i, s, o) {
    this._append`C${+e},${+n},${+r},${+i},${this._x1 = +s},${this._y1 = +o}`;
  }
  arcTo(e, n, r, i, s) {
    if (e = +e, n = +n, r = +r, i = +i, s = +s, s < 0)
      throw new Error(`negative radius: ${s}`);
    let o = this._x1, a = this._y1, u = r - e, l = i - n, h = o - e, c = a - n, f = h * h + c * c;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (f > q)
      if (!(Math.abs(c * u - l * h) > q) || !s)
        this._append`L${this._x1 = e},${this._y1 = n}`;
      else {
        let d = r - o, p = i - a, _ = u * u + l * l, m = d * d + p * p, A = Math.sqrt(_), x = Math.sqrt(f), v = s * Math.tan((he - Math.acos((_ + f - m) / (2 * A * x))) / 2), E = v / x, w = v / A;
        Math.abs(E - 1) > q && this._append`L${e + E * h},${n + E * c}`, this._append`A${s},${s},0,0,${+(c * d > h * p)},${this._x1 = e + w * u},${this._y1 = n + w * l}`;
      }
  }
  arc(e, n, r, i, s, o) {
    if (e = +e, n = +n, r = +r, o = !!o, r < 0)
      throw new Error(`negative radius: ${r}`);
    let a = r * Math.cos(i), u = r * Math.sin(i), l = e + a, h = n + u, c = 1 ^ o, f = o ? i - s : s - i;
    this._x1 === null ? this._append`M${l},${h}` : (Math.abs(this._x1 - l) > q || Math.abs(this._y1 - h) > q) && this._append`L${l},${h}`, r && (f < 0 && (f = f % fe + fe), f > ha ? this._append`A${r},${r},0,1,${c},${e - a},${n - u}A${r},${r},0,1,${c},${this._x1 = l},${this._y1 = h}` : f > q && this._append`A${r},${r},0,${+(f >= he)},${c},${this._x1 = e + r * Math.cos(s)},${this._y1 = n + r * Math.sin(s)}`);
  }
  rect(e, n, r, i) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${r = +r}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function pa(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Bt(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0)
    return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function nt(t) {
  return t = Bt(Math.abs(t)), t ? t[1] : NaN;
}
function ga(t, e) {
  return function(n, r) {
    for (var i = n.length, s = [], o = 0, a = t[0], u = 0; i > 0 && a > 0 && (u + a + 1 > r && (a = Math.max(1, r - u)), s.push(n.substring(i -= a, i + a)), !((u += a + 1) > r)); )
      a = t[o = (o + 1) % t.length];
    return s.reverse().join(e);
  };
}
function _a(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var ma = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Xt(t) {
  if (!(e = ma.exec(t)))
    throw new Error("invalid format: " + t);
  var e;
  return new Me({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
Xt.prototype = Me.prototype;
function Me(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Me.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function ya(t) {
  t:
    for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
      switch (t[n]) {
        case ".":
          r = i = n;
          break;
        case "0":
          r === 0 && (r = n), i = n;
          break;
        default:
          if (!+t[n])
            break t;
          r > 0 && (r = 0);
          break;
      }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var Vn;
function va(t, e) {
  var n = Bt(t, e);
  if (!n)
    return t + "";
  var r = n[0], i = n[1], s = i - (Vn = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
  return s === o ? r : s > o ? r + new Array(s - o + 1).join("0") : s > 0 ? r.slice(0, s) + "." + r.slice(s) : "0." + new Array(1 - s).join("0") + Bt(t, Math.max(0, e + s - 1))[0];
}
function nn(t, e) {
  var n = Bt(t, e);
  if (!n)
    return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const rn = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: pa,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => nn(t * 100, e),
  r: nn,
  s: va,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function sn(t) {
  return t;
}
var on = Array.prototype.map, an = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function wa(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? sn : ga(on.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", s = t.numerals === void 0 ? sn : _a(on.call(t.numerals, String)), o = t.percent === void 0 ? "%" : t.percent + "", a = t.minus === void 0 ? "−" : t.minus + "", u = t.nan === void 0 ? "NaN" : t.nan + "";
  function l(c) {
    c = Xt(c);
    var f = c.fill, d = c.align, p = c.sign, _ = c.symbol, m = c.zero, A = c.width, x = c.comma, v = c.precision, E = c.trim, w = c.type;
    w === "n" ? (x = !0, w = "g") : rn[w] || (v === void 0 && (v = 12), E = !0, w = "g"), (m || f === "0" && d === "=") && (m = !0, f = "0", d = "=");
    var er = _ === "$" ? n : _ === "#" && /[boxX]/.test(w) ? "0" + w.toLowerCase() : "", nr = _ === "$" ? r : /[%p]/.test(w) ? o : "", Ne = rn[w], rr = /[defgprs%]/.test(w);
    v = v === void 0 ? 6 : /[gprs]/.test(w) ? Math.max(1, Math.min(21, v)) : Math.max(0, Math.min(20, v));
    function Ce(g) {
      var L = er, M = nr, K, ke, $t;
      if (w === "c")
        M = Ne(g) + M, g = "";
      else {
        g = +g;
        var xt = g < 0 || 1 / g < 0;
        if (g = isNaN(g) ? u : Ne(Math.abs(g), v), E && (g = ya(g)), xt && +g == 0 && p !== "+" && (xt = !1), L = (xt ? p === "(" ? p : a : p === "-" || p === "(" ? "" : p) + L, M = (w === "s" ? an[8 + Vn / 3] : "") + M + (xt && p === "(" ? ")" : ""), rr) {
          for (K = -1, ke = g.length; ++K < ke; )
            if ($t = g.charCodeAt(K), 48 > $t || $t > 57) {
              M = ($t === 46 ? i + g.slice(K + 1) : g.slice(K)) + M, g = g.slice(0, K);
              break;
            }
        }
      }
      x && !m && (g = e(g, 1 / 0));
      var At = L.length + g.length + M.length, R = At < A ? new Array(A - At + 1).join(f) : "";
      switch (x && m && (g = e(R + g, R.length ? A - M.length : 1 / 0), R = ""), d) {
        case "<":
          g = L + g + M + R;
          break;
        case "=":
          g = L + R + g + M;
          break;
        case "^":
          g = R.slice(0, At = R.length >> 1) + L + g + M + R.slice(At);
          break;
        default:
          g = R + L + g + M;
          break;
      }
      return s(g);
    }
    return Ce.toString = function() {
      return c + "";
    }, Ce;
  }
  function h(c, f) {
    var d = l((c = Xt(c), c.type = "f", c)), p = Math.max(-8, Math.min(8, Math.floor(nt(f) / 3))) * 3, _ = Math.pow(10, -p), m = an[8 + p / 3];
    return function(A) {
      return d(_ * A) + m;
    };
  }
  return {
    format: l,
    formatPrefix: h
  };
}
var Mt, Yn, Wn;
$a({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function $a(t) {
  return Mt = wa(t), Yn = Mt.format, Wn = Mt.formatPrefix, Mt;
}
function xa(t) {
  return Math.max(0, -nt(Math.abs(t)));
}
function Aa(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(nt(e) / 3))) * 3 - nt(Math.abs(t)));
}
function ba(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, nt(e) - nt(t)) + 1;
}
function Ea(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
function Sa(t) {
  return function() {
    return t;
  };
}
function Ma(t) {
  return +t;
}
var un = [0, 1];
function J(t) {
  return t;
}
function de(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Sa(isNaN(e) ? NaN : 0.5);
}
function Na(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function Ca(t, e, n) {
  var r = t[0], i = t[1], s = e[0], o = e[1];
  return i < r ? (r = de(i, r), s = n(o, s)) : (r = de(r, i), s = n(s, o)), function(a) {
    return s(r(a));
  };
}
function ka(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), s = new Array(r), o = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++o < r; )
    i[o] = de(t[o], t[o + 1]), s[o] = n(e[o], e[o + 1]);
  return function(a) {
    var u = Ur(t, a, 1, r) - 1;
    return s[u](i[u](a));
  };
}
function Ta(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Pa() {
  var t = un, e = un, n = Ae, r, i, s, o = J, a, u, l;
  function h() {
    var f = Math.min(t.length, e.length);
    return o !== J && (o = Na(t[0], t[f - 1])), a = f > 2 ? ka : Ca, u = l = null, c;
  }
  function c(f) {
    return f == null || isNaN(f = +f) ? s : (u || (u = a(t.map(r), e, n)))(r(o(f)));
  }
  return c.invert = function(f) {
    return o(i((l || (l = a(e, t.map(r), N)))(f)));
  }, c.domain = function(f) {
    return arguments.length ? (t = Array.from(f, Ma), h()) : t.slice();
  }, c.range = function(f) {
    return arguments.length ? (e = Array.from(f), h()) : e.slice();
  }, c.rangeRound = function(f) {
    return e = Array.from(f), n = Ws, h();
  }, c.clamp = function(f) {
    return arguments.length ? (o = f ? !0 : J, h()) : o !== J;
  }, c.interpolate = function(f) {
    return arguments.length ? (n = f, h()) : n;
  }, c.unknown = function(f) {
    return arguments.length ? (s = f, c) : s;
  }, function(f, d) {
    return r = f, i = d, h();
  };
}
function Ra() {
  return Pa()(J, J);
}
function Ha(t, e, n, r) {
  var i = qr(t, e, n), s;
  switch (r = Xt(r ?? ",f"), r.type) {
    case "s": {
      var o = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(s = Aa(i, o)) && (r.precision = s), Wn(r, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(s = ba(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = s - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(s = xa(i)) && (r.precision = s - (r.type === "%") * 2);
      break;
    }
  }
  return Yn(r);
}
function Oa(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return zr(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return Ha(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, s = r.length - 1, o = r[i], a = r[s], u, l, h = 10;
    for (a < o && (l = o, o = a, a = l, l = i, i = s, s = l); h-- > 0; ) {
      if (l = re(o, a, n), l === u)
        return r[i] = o, r[s] = a, e(r);
      if (l > 0)
        o = Math.floor(o / l) * l, a = Math.ceil(a / l) * l;
      else if (l < 0)
        o = Math.ceil(o * l) / l, a = Math.floor(a * l) / l;
      else
        break;
      u = l;
    }
    return t;
  }, t;
}
function Gn() {
  var t = Ra();
  return t.copy = function() {
    return Ta(t, Gn());
  }, Ea.apply(t, arguments), Oa(t);
}
function $(t) {
  return function() {
    return t;
  };
}
function Kn(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length)
      return e;
    if (n == null)
      e = null;
    else {
      const r = Math.floor(n);
      if (!(r >= 0))
        throw new RangeError(`invalid digits: ${n}`);
      e = r;
    }
    return t;
  }, () => new da(e);
}
function Zn(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Jn(t) {
  this._context = t;
}
Jn.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t, e) {
    switch (t = +t, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(t, e);
        break;
    }
  }
};
function Qn(t) {
  return new Jn(t);
}
function jn(t) {
  return t[0];
}
function tr(t) {
  return t[1];
}
function Ua(t, e) {
  var n = $(!0), r = null, i = Qn, s = null, o = Kn(a);
  t = typeof t == "function" ? t : t === void 0 ? jn : $(t), e = typeof e == "function" ? e : e === void 0 ? tr : $(e);
  function a(u) {
    var l, h = (u = Zn(u)).length, c, f = !1, d;
    for (r == null && (s = i(d = o())), l = 0; l <= h; ++l)
      !(l < h && n(c = u[l], l, u)) === f && ((f = !f) ? s.lineStart() : s.lineEnd()), f && s.point(+t(c, l, u), +e(c, l, u));
    if (d)
      return s = null, d + "" || null;
  }
  return a.x = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : $(+u), a) : t;
  }, a.y = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : $(+u), a) : e;
  }, a.defined = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : $(!!u), a) : n;
  }, a.curve = function(u) {
    return arguments.length ? (i = u, r != null && (s = i(r)), a) : i;
  }, a.context = function(u) {
    return arguments.length ? (u == null ? r = s = null : s = i(r = u), a) : r;
  }, a;
}
function Ia(t, e, n) {
  var r = null, i = $(!0), s = null, o = Qn, a = null, u = Kn(l);
  t = typeof t == "function" ? t : t === void 0 ? jn : $(+t), e = typeof e == "function" ? e : $(e === void 0 ? 0 : +e), n = typeof n == "function" ? n : n === void 0 ? tr : $(+n);
  function l(c) {
    var f, d, p, _ = (c = Zn(c)).length, m, A = !1, x, v = new Array(_), E = new Array(_);
    for (s == null && (a = o(x = u())), f = 0; f <= _; ++f) {
      if (!(f < _ && i(m = c[f], f, c)) === A)
        if (A = !A)
          d = f, a.areaStart(), a.lineStart();
        else {
          for (a.lineEnd(), a.lineStart(), p = f - 1; p >= d; --p)
            a.point(v[p], E[p]);
          a.lineEnd(), a.areaEnd();
        }
      A && (v[f] = +t(m, f, c), E[f] = +e(m, f, c), a.point(r ? +r(m, f, c) : v[f], n ? +n(m, f, c) : E[f]));
    }
    if (x)
      return a = null, x + "" || null;
  }
  function h() {
    return Ua().defined(i).curve(o).context(s);
  }
  return l.x = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : $(+c), r = null, l) : t;
  }, l.x0 = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : $(+c), l) : t;
  }, l.x1 = function(c) {
    return arguments.length ? (r = c == null ? null : typeof c == "function" ? c : $(+c), l) : r;
  }, l.y = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : $(+c), n = null, l) : e;
  }, l.y0 = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : $(+c), l) : e;
  }, l.y1 = function(c) {
    return arguments.length ? (n = c == null ? null : typeof c == "function" ? c : $(+c), l) : n;
  }, l.lineX0 = l.lineY0 = function() {
    return h().x(t).y(e);
  }, l.lineY1 = function() {
    return h().x(t).y(n);
  }, l.lineX1 = function() {
    return h().x(r).y(e);
  }, l.defined = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : $(!!c), l) : i;
  }, l.curve = function(c) {
    return arguments.length ? (o = c, s != null && (a = o(s)), l) : o;
  }, l.context = function(c) {
    return arguments.length ? (c == null ? s = a = null : a = o(s = c), l) : s;
  }, l;
}
function at(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
at.prototype = {
  constructor: at,
  scale: function(t) {
    return t === 1 ? this : new at(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new at(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
at.prototype;
var Da = Object.defineProperty, La = Object.getOwnPropertyDescriptor, wt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? La(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (r ? o(e, n, i) : o(i)) || i);
  return r && i && Da(e, n, i), i;
};
let D = class extends ct {
  constructor() {
    super(...arguments), this.width = 0, this.height = 50, this.data = [], this.points = [], this.getArea = () => {
      const t = this.width, e = this.height, n = Ia().x((s) => s[0]).y0(e).y1((s) => s[1]), r = bs("svg").attr("width", this.width).attr("height", e).attr("viewBox", [0, 0, t, e]).attr("style", "max-width: 100%; height: auto;"), i = this.data.map(({ x: s, value: o }) => [s, o]);
      return r.append("path").attr("fill", "steelblue").attr("d", n(i)), r.html();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    const { width: t } = this.getBoundingClientRect();
    this.width = t, this.fetchData();
  }
  updated(t) {
    t.has("start") && this.fetchData();
  }
  async fetchData() {
    const t = this.start, e = this.length;
    if (!t || !e)
      return;
    const n = `http://localhost:3000/data?start=${t}&length=${e}`, i = await (await fetch(n)).json(), { data: s } = i;
    this.data = za({ data: s, width: this.width, height: this.height }), this.reportRegionData(i);
  }
  reportRegionData(t) {
    const e = new CustomEvent("dataloaded", {
      detail: t
    });
    this.dispatchEvent(e);
  }
  render() {
    if (!this.width)
      return;
    const t = mr`${Tr(this.getArea())}`;
    return _r`
      <svg viewBox="0 0 ${this.width} 50">
        ${t}
      </svg>
    `;
  }
};
D.styles = sr`
    :host {
      display: block;
      height: 50px;
    }
  `;
wt([
  me({
    type: Number
  })
], D.prototype, "start", 2);
wt([
  me({
    type: Number
  })
], D.prototype, "length", 2);
wt([
  mn()
], D.prototype, "data", 2);
wt([
  mn()
], D.prototype, "points", 2);
D = wt([
  Er("ens-regulation")
], D);
const za = (t) => {
  var o, a;
  const { data: e, width: n, height: r } = t, i = Gn().domain([0, 255]).range([0, r]), s = [];
  if (e.length > n) {
    const u = Math.floor(e.length / n), l = {
      x: n,
      value: i((o = e.at(-1)) == null ? void 0 : o.value)
    };
    for (let h = 0; h < n - 1; h++)
      if (h % u === 0) {
        let c = 0;
        for (let d = h - u + 1; d <= h; d++) {
          const p = (a = e[d]) == null ? void 0 : a.value;
          p && (c += i(p));
        }
        const f = Math.round(c / u);
        s.push({ x: h, value: f });
      }
    s.push(l);
  } else
    e.length < n;
  return s;
}, Ba = D;
export {
  Ba as default
};
