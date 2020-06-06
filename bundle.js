!(function (t) { //the following large block of code is from Webpack when I used it to pre-process parts of the website
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var o = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          n.d(
            r,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 0));
})([ //main function for the mouseover actions
  function (t, e) {
    $([
      "./assets/iso-apartments.png", //the images used for the mouseovers
      "./assets/iso-hospital.png",
      "./assets/iso-powerplant.png",
      "./assets/iso-school.png",
      "./assets/iso-supermarket.png",
    ]).each(function () {
      $("<img/>")[0].src = this;
    }),
      jQuery(document).ready(function () {
        $(".title-apartments").mouseout(function () {
          $("#map").attr("src", "./assets/iso-original.png"); //show original by default
        }),
          $(".title-apartments").mouseover(function () {
            $("#map").attr("src", "./assets/iso-apartments.png"); //show colored version on mouseover
          }),
          $(".title-hospital").mouseout(function () {
            $("#map").attr("src", "./assets/iso-original.png"); //show original by default
          }),
          $(".title-hospital").mouseover(function () {
            $("#map").attr("src", "./assets/iso-hospital.png"); //show colored version on mouseover
          }),
          $(".title-powerplant").mouseout(function () {
            $("#map").attr("src", "./assets/iso-original.png"); //show original by default
          }),
          $(".title-powerplant").mouseover(function () {
            $("#map").attr("src", "./assets/iso-powerplant.png"); //show colored version on mouseover
          }),
          $(".title-school").mouseout(function () {
            $("#map").attr("src", "./assets/iso-original.png"); //show original by default
          }),
          $(".title-school").mouseover(function () {
            $("#map").attr("src", "./assets/iso-school.png"); //show colored version on mouseover
          }),
          $(".title-supermarket").mouseout(function () {
            $("#map").attr("src", "./assets/iso-original.png"); //show original by default
          }),
          $(".title-supermarket").mouseover(function () {
            $("#map").attr("src", "./assets/iso-supermarket.png"); //show colored version on mouseover
          });
      });
  },
]);
