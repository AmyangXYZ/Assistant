/* eslint-disable */
// This is ammo.js, a port of Bullet Physics to JavaScript. zlib licensed.

// modified for use in webpack

export default function (Ammo) {
  Ammo = Ammo || {}

  let b
  b || (b = typeof Ammo !== 'undefined' ? Ammo : {})
  let aa
  b.ready = new Promise(function (a) {
    aa = a
  })
  let ba = {},
    ca
  for (ca in b) b.hasOwnProperty(ca) && (ba[ca] = b[ca])
  let da = !1,
    ea = !1,
    fa = !1,
    ha = !1
  da = 'object' === typeof window
  ea = 'function' === typeof importScripts
  fa =
    'object' === typeof process &&
    'object' === typeof process.versions &&
    'string' === typeof process.versions.node
  ha = !da && !fa && !ea
  let ia = '',
    ja,
    ka,
    la,
    ma
  if (fa)
    (ia = ea ? require('path').dirname(ia) + '/' : __dirname + '/'),
      (ja = function (a, c) {
        la || (la = require('fs'))
        ma || (ma = require('path'))
        a = ma.normalize(a)
        return la.readFileSync(a, c ? null : 'utf8')
      }),
      (ka = function (a) {
        a = ja(a, !0)
        a.buffer || (a = new Uint8Array(a))
        assert(a.buffer)
        return a
      }),
      1 < process.argv.length && process.argv[1].replace(/\\/g, '/'),
      process.argv.slice(2),
      process.on('uncaughtException', function (a) {
        throw a
      }),
      process.on('unhandledRejection', na),
      (b.inspect = function () {
        return '[Emscripten Module object]'
      })
  else if (ha)
    'undefined' != typeof read &&
      (ja = function (a) {
        return read(a)
      }),
      (ka = function (a) {
        if ('function' === typeof readbuffer) return new Uint8Array(readbuffer(a))
        a = read(a, 'binary')
        assert('object' === typeof a)
        return a
      }),
      'undefined' !== typeof print &&
        ('undefined' === typeof console && (console = {}),
        (console.log = print),
        (console.warn = console.error = 'undefined' !== typeof printErr ? printErr : print))
  else if (da || ea)
    ea ? (ia = self.location.href) : document.currentScript && (ia = document.currentScript.src),
      (ia = 0 !== ia.indexOf('blob:') ? ia.substr(0, ia.lastIndexOf('/') + 1) : ''),
      (ja = function (a) {
        const c = new XMLHttpRequest()
        c.open('GET', a, !1)
        c.send(null)
        return c.responseText
      }),
      ea &&
        (ka = function (a) {
          const c = new XMLHttpRequest()
          c.open('GET', a, !1)
          c.responseType = 'arraybuffer'
          c.send(null)
          return new Uint8Array(c.response)
        })
  const oa = b.print || console.log.bind(console),
    pa = b.printErr || console.warn.bind(console)
  for (ca in ba) ba.hasOwnProperty(ca) && (b[ca] = ba[ca])
  ba = null
  let qa = [],
    ra,
    sa
  b.wasmBinary && (sa = b.wasmBinary)
  let noExitRuntime
  b.noExitRuntime && (noExitRuntime = b.noExitRuntime)
  'object' !== typeof WebAssembly && pa('no native wasm support detected')
  let ta,
    ua = new WebAssembly.Table({ initial: 930, element: 'anyfunc' }),
    wa = !1
  function assert(a, c) {
    a || na('Assertion failed: ' + c)
  }
  let xa = 'undefined' !== typeof TextDecoder ? new TextDecoder('utf8') : void 0,
    ya,
    za,
    Aa,
    Ba,
    Ca,
    Da,
    Ea = b.INITIAL_MEMORY || 67108864
  if (
    (ta = b.wasmMemory
      ? b.wasmMemory
      : new WebAssembly.Memory({ initial: Ea / 65536, maximum: Ea / 65536 }))
  )
    ya = ta.buffer
  Ea = ya.byteLength
  const Fa = ya
  ya = Fa
  b.HEAP8 = za = new Int8Array(Fa)
  b.HEAP16 = new Int16Array(Fa)
  b.HEAP32 = Ba = new Int32Array(Fa)
  b.HEAPU8 = Aa = new Uint8Array(Fa)
  b.HEAPU16 = new Uint16Array(Fa)
  b.HEAPU32 = new Uint32Array(Fa)
  b.HEAPF32 = Ca = new Float32Array(Fa)
  b.HEAPF64 = Da = new Float64Array(Fa)
  Ba[7852] = 5274448
  function Ga(a) {
    for (; 0 < a.length; ) {
      const c = a.shift()
      if ('function' == typeof c) c(b)
      else {
        const d = c.cz
        'number' === typeof d
          ? void 0 === c.Iy
            ? b.dynCall_v(d)
            : b.dynCall_vi(d, c.Iy)
          : d(void 0 === c.Iy ? null : c.Iy)
      }
    }
  }
  let Ha = [],
    Ia = [],
    Ja = [],
    Ka = [],
    La = !1
  function Ma() {
    const a = b.preRun.shift()
    Ha.unshift(a)
  }
  let Na = 0,
    Oa = null,
    Pa = null
  b.preloadedImages = {}
  b.preloadedAudios = {}
  function na(a) {
    if (b.onAbort) b.onAbort(a)
    a += ''
    oa(a)
    pa(a)
    wa = !0
    throw new WebAssembly.RuntimeError(
      'abort(' + a + '). Build with -s ASSERTIONS=1 for more info.'
    )
  }
  function Qa(a) {
    const c = Ra
    return String.prototype.startsWith ? c.startsWith(a) : 0 === c.indexOf(a)
  }
  function Sa() {
    return Qa('data:application/octet-stream;base64,')
  }
  var Ra = 'ammo.wasm.wasm'
  if (!Sa()) {
    const Ta = Ra
    Ra = b.locateFile ? b.locateFile(Ta, ia) : ia + Ta
  }
  function Ua() {
    try {
      if (sa) return new Uint8Array(sa)
      if (ka) return ka(Ra)
      throw 'both async and sync fetching of the wasm failed'
    } catch (a) {
      na(a)
    }
  }
  function Va() {
    return sa || (!da && !ea) || 'function' !== typeof fetch || Qa('file://')
      ? new Promise(function (a) {
          a(Ua())
        })
      : fetch('./ammo.wasm.wasm', { credentials: 'same-origin' })
          .then(function (a) {
            if (!a.ok) throw "failed to load wasm binary file at '" + Ra + "'"
            return a.arrayBuffer()
          })
          .catch(function () {
            return Ua()
          })
  }
  const Wa = {
    1376: function (a, c, d, e) {
      a = b.getCache(b.DebugDrawer)[a]
      if (!a.hasOwnProperty('drawLine'))
        throw 'a JSImplementation must implement all functions, you forgot DebugDrawer::drawLine.'
      a.drawLine(c, d, e)
    },
    1601: function (a, c, d, e, g, n) {
      a = b.getCache(b.DebugDrawer)[a]
      if (!a.hasOwnProperty('drawContactPoint'))
        throw 'a JSImplementation must implement all functions, you forgot DebugDrawer::drawContactPoint.'
      a.drawContactPoint(c, d, e, g, n)
    },
    1858: function (a, c) {
      a = b.getCache(b.DebugDrawer)[a]
      if (!a.hasOwnProperty('reportErrorWarning'))
        throw 'a JSImplementation must implement all functions, you forgot DebugDrawer::reportErrorWarning.'
      a.reportErrorWarning(c)
    },
    2105: function (a, c, d) {
      a = b.getCache(b.DebugDrawer)[a]
      if (!a.hasOwnProperty('draw3dText'))
        throw 'a JSImplementation must implement all functions, you forgot DebugDrawer::draw3dText.'
      a.draw3dText(c, d)
    },
    2332: function (a, c) {
      a = b.getCache(b.DebugDrawer)[a]
      if (!a.hasOwnProperty('setDebugMode'))
        throw 'a JSImplementation must implement all functions, you forgot DebugDrawer::setDebugMode.'
      a.setDebugMode(c)
    },
    2561: function (a) {
      a = b.getCache(b.DebugDrawer)[a]
      if (!a.hasOwnProperty('getDebugMode'))
        throw 'a JSImplementation must implement all functions, you forgot DebugDrawer::getDebugMode.'
      return a.getDebugMode()
    },
    3288: function (a, c, d, e, g, n, D, R) {
      a = b.getCache(b.ConcreteContactResultCallback)[a]
      if (!a.hasOwnProperty('addSingleResult'))
        throw 'a JSImplementation must implement all functions, you forgot ConcreteContactResultCallback::addSingleResult.'
      return a.addSingleResult(c, d, e, g, n, D, R)
    }
  }
  Ia.push({
    cz: function () {
      Xa()
    }
  })
  const Ya = []
  function Za(a, c) {
    Ya.length = 0
    let d
    for (c >>= 2; (d = Aa[a++]); ) Ya.push(105 > d ? Da[++c >> 1] : Ba[c]), ++c
    return Ya
  }
  const $a = {
    f: function () {
      na()
    },
    c: function (a, c, d) {
      c = Za(c, d)
      return Wa[a].apply(null, c)
    },
    a: function (a, c, d) {
      c = Za(c, d)
      return Wa[a].apply(null, c)
    },
    d: function (a, c, d) {
      Aa.copyWithin(a, c, c + d)
    },
    e: function () {
      na('OOM')
    },
    b: function (a) {
      const c = Date.now()
      Ba[a >> 2] = (c / 1e3) | 0
      Ba[(a + 4) >> 2] = ((c % 1e3) * 1e3) | 0
      return 0
    },
    memory: ta,
    table: ua
  }
  ;(function () {
    function a(g) {
      b.asm = g.exports
      Na--
      b.monitorRunDependencies && b.monitorRunDependencies(Na)
      0 == Na &&
        (null !== Oa && (clearInterval(Oa), (Oa = null)), Pa && ((g = Pa), (Pa = null), g()))
    }
    function c(g) {
      a(g.instance)
    }
    function d(g) {
      return Va()
        .then(function (n) {
          return WebAssembly.instantiate(n, e)
        })
        .then(g, function (n) {
          pa('failed to asynchronously prepare wasm: ' + n)
          na(n)
        })
    }
    var e = { a: $a }
    Na++
    b.monitorRunDependencies && b.monitorRunDependencies(Na)
    if (b.instantiateWasm)
      try {
        return b.instantiateWasm(e, a)
      } catch (g) {
        return pa('Module.instantiateWasm callback failed with error: ' + g), !1
      }
    ;(function () {
      if ('function' !== typeof WebAssembly.instantiateStreaming) return d(c)
      fetch(new URL('ammo.wasm.wasm', import.meta.url), { credentials: 'same-origin' }).then(
        function (g) {
          return WebAssembly.instantiateStreaming(g, e).then(c, function (n) {
            pa('wasm streaming compile failed: ' + n)
            pa('falling back to ArrayBuffer instantiation')
            return d(c)
          })
        }
      )
    })()
    return {}
  })()
  var Xa = (b.___wasm_call_ctors = function () {
    return (Xa = b.___wasm_call_ctors = b.asm.g).apply(null, arguments)
  })
  b.___em_js__array_bounds_check_error = function () {
    return (b.___em_js__array_bounds_check_error = b.asm.h).apply(null, arguments)
  }
  var ab = (b._emscripten_bind_btCollisionShape_setLocalScaling_1 = function () {
      return (ab = b._emscripten_bind_btCollisionShape_setLocalScaling_1 = b.asm.i).apply(
        null,
        arguments
      )
    }),
    bb = (b._emscripten_bind_btCollisionShape_getLocalScaling_0 = function () {
      return (bb = b._emscripten_bind_btCollisionShape_getLocalScaling_0 = b.asm.j).apply(
        null,
        arguments
      )
    }),
    cb = (b._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = function () {
      return (cb = b._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = b.asm.k).apply(
        null,
        arguments
      )
    }),
    db = (b._emscripten_bind_btCollisionShape_setMargin_1 = function () {
      return (db = b._emscripten_bind_btCollisionShape_setMargin_1 = b.asm.l).apply(null, arguments)
    }),
    eb = (b._emscripten_bind_btCollisionShape_getMargin_0 = function () {
      return (eb = b._emscripten_bind_btCollisionShape_getMargin_0 = b.asm.m).apply(null, arguments)
    }),
    fb = (b._emscripten_bind_btCollisionShape___destroy___0 = function () {
      return (fb = b._emscripten_bind_btCollisionShape___destroy___0 = b.asm.n).apply(
        null,
        arguments
      )
    }),
    gb = (b._emscripten_bind_btCollisionWorld_getDispatcher_0 = function () {
      return (gb = b._emscripten_bind_btCollisionWorld_getDispatcher_0 = b.asm.o).apply(
        null,
        arguments
      )
    }),
    hb = (b._emscripten_bind_btCollisionWorld_rayTest_3 = function () {
      return (hb = b._emscripten_bind_btCollisionWorld_rayTest_3 = b.asm.p).apply(null, arguments)
    }),
    ib = (b._emscripten_bind_btCollisionWorld_getPairCache_0 = function () {
      return (ib = b._emscripten_bind_btCollisionWorld_getPairCache_0 = b.asm.q).apply(
        null,
        arguments
      )
    }),
    jb = (b._emscripten_bind_btCollisionWorld_getDispatchInfo_0 = function () {
      return (jb = b._emscripten_bind_btCollisionWorld_getDispatchInfo_0 = b.asm.r).apply(
        null,
        arguments
      )
    }),
    kb = (b._emscripten_bind_btCollisionWorld_addCollisionObject_1 = function () {
      return (kb = b._emscripten_bind_btCollisionWorld_addCollisionObject_1 = b.asm.s).apply(
        null,
        arguments
      )
    }),
    lb = (b._emscripten_bind_btCollisionWorld_addCollisionObject_2 = function () {
      return (lb = b._emscripten_bind_btCollisionWorld_addCollisionObject_2 = b.asm.t).apply(
        null,
        arguments
      )
    }),
    mb = (b._emscripten_bind_btCollisionWorld_addCollisionObject_3 = function () {
      return (mb = b._emscripten_bind_btCollisionWorld_addCollisionObject_3 = b.asm.u).apply(
        null,
        arguments
      )
    }),
    nb = (b._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = function () {
      return (nb = b._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = b.asm.v).apply(
        null,
        arguments
      )
    }),
    ob = (b._emscripten_bind_btCollisionWorld_getBroadphase_0 = function () {
      return (ob = b._emscripten_bind_btCollisionWorld_getBroadphase_0 = b.asm.w).apply(
        null,
        arguments
      )
    }),
    pb = (b._emscripten_bind_btCollisionWorld_convexSweepTest_5 = function () {
      return (pb = b._emscripten_bind_btCollisionWorld_convexSweepTest_5 = b.asm.x).apply(
        null,
        arguments
      )
    }),
    qb = (b._emscripten_bind_btCollisionWorld_contactPairTest_3 = function () {
      return (qb = b._emscripten_bind_btCollisionWorld_contactPairTest_3 = b.asm.y).apply(
        null,
        arguments
      )
    }),
    rb = (b._emscripten_bind_btCollisionWorld_contactTest_2 = function () {
      return (rb = b._emscripten_bind_btCollisionWorld_contactTest_2 = b.asm.z).apply(
        null,
        arguments
      )
    }),
    sb = (b._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = function () {
      return (sb = b._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = b.asm.A).apply(
        null,
        arguments
      )
    }),
    tb = (b._emscripten_bind_btCollisionWorld_setDebugDrawer_1 = function () {
      return (tb = b._emscripten_bind_btCollisionWorld_setDebugDrawer_1 = b.asm.B).apply(
        null,
        arguments
      )
    }),
    ub = (b._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = function () {
      return (ub = b._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = b.asm.C).apply(
        null,
        arguments
      )
    }),
    vb = (b._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = function () {
      return (vb = b._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = b.asm.D).apply(
        null,
        arguments
      )
    }),
    wb = (b._emscripten_bind_btCollisionWorld_debugDrawObject_3 = function () {
      return (wb = b._emscripten_bind_btCollisionWorld_debugDrawObject_3 = b.asm.E).apply(
        null,
        arguments
      )
    }),
    xb = (b._emscripten_bind_btCollisionWorld___destroy___0 = function () {
      return (xb = b._emscripten_bind_btCollisionWorld___destroy___0 = b.asm.F).apply(
        null,
        arguments
      )
    }),
    yb = (b._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 = function () {
      return (yb = b._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 = b.asm.G).apply(
        null,
        arguments
      )
    }),
    zb = (b._emscripten_bind_btCollisionObject_getCollisionShape_0 = function () {
      return (zb = b._emscripten_bind_btCollisionObject_getCollisionShape_0 = b.asm.H).apply(
        null,
        arguments
      )
    }),
    Ab = (b._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 = function () {
      return (Ab = b._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 =
        b.asm.I).apply(null, arguments)
    }),
    Bb = (b._emscripten_bind_btCollisionObject_setActivationState_1 = function () {
      return (Bb = b._emscripten_bind_btCollisionObject_setActivationState_1 = b.asm.J).apply(
        null,
        arguments
      )
    }),
    Cb = (b._emscripten_bind_btCollisionObject_forceActivationState_1 = function () {
      return (Cb = b._emscripten_bind_btCollisionObject_forceActivationState_1 = b.asm.K).apply(
        null,
        arguments
      )
    }),
    Db = (b._emscripten_bind_btCollisionObject_activate_0 = function () {
      return (Db = b._emscripten_bind_btCollisionObject_activate_0 = b.asm.L).apply(null, arguments)
    }),
    Eb = (b._emscripten_bind_btCollisionObject_activate_1 = function () {
      return (Eb = b._emscripten_bind_btCollisionObject_activate_1 = b.asm.M).apply(null, arguments)
    }),
    Fb = (b._emscripten_bind_btCollisionObject_isActive_0 = function () {
      return (Fb = b._emscripten_bind_btCollisionObject_isActive_0 = b.asm.N).apply(null, arguments)
    }),
    Gb = (b._emscripten_bind_btCollisionObject_isKinematicObject_0 = function () {
      return (Gb = b._emscripten_bind_btCollisionObject_isKinematicObject_0 = b.asm.O).apply(
        null,
        arguments
      )
    }),
    Hb = (b._emscripten_bind_btCollisionObject_isStaticObject_0 = function () {
      return (Hb = b._emscripten_bind_btCollisionObject_isStaticObject_0 = b.asm.P).apply(
        null,
        arguments
      )
    }),
    Ib = (b._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 = function () {
      return (Ib = b._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 =
        b.asm.Q).apply(null, arguments)
    }),
    Jb = (b._emscripten_bind_btCollisionObject_getRestitution_0 = function () {
      return (Jb = b._emscripten_bind_btCollisionObject_getRestitution_0 = b.asm.R).apply(
        null,
        arguments
      )
    }),
    Kb = (b._emscripten_bind_btCollisionObject_getFriction_0 = function () {
      return (Kb = b._emscripten_bind_btCollisionObject_getFriction_0 = b.asm.S).apply(
        null,
        arguments
      )
    }),
    Lb = (b._emscripten_bind_btCollisionObject_getRollingFriction_0 = function () {
      return (Lb = b._emscripten_bind_btCollisionObject_getRollingFriction_0 = b.asm.T).apply(
        null,
        arguments
      )
    }),
    Mb = (b._emscripten_bind_btCollisionObject_setRestitution_1 = function () {
      return (Mb = b._emscripten_bind_btCollisionObject_setRestitution_1 = b.asm.U).apply(
        null,
        arguments
      )
    }),
    Nb = (b._emscripten_bind_btCollisionObject_setFriction_1 = function () {
      return (Nb = b._emscripten_bind_btCollisionObject_setFriction_1 = b.asm.V).apply(
        null,
        arguments
      )
    }),
    Ob = (b._emscripten_bind_btCollisionObject_setRollingFriction_1 = function () {
      return (Ob = b._emscripten_bind_btCollisionObject_setRollingFriction_1 = b.asm.W).apply(
        null,
        arguments
      )
    }),
    Pb = (b._emscripten_bind_btCollisionObject_getWorldTransform_0 = function () {
      return (Pb = b._emscripten_bind_btCollisionObject_getWorldTransform_0 = b.asm.X).apply(
        null,
        arguments
      )
    }),
    Qb = (b._emscripten_bind_btCollisionObject_getCollisionFlags_0 = function () {
      return (Qb = b._emscripten_bind_btCollisionObject_getCollisionFlags_0 = b.asm.Y).apply(
        null,
        arguments
      )
    }),
    Rb = (b._emscripten_bind_btCollisionObject_setCollisionFlags_1 = function () {
      return (Rb = b._emscripten_bind_btCollisionObject_setCollisionFlags_1 = b.asm.Z).apply(
        null,
        arguments
      )
    }),
    Sb = (b._emscripten_bind_btCollisionObject_setWorldTransform_1 = function () {
      return (Sb = b._emscripten_bind_btCollisionObject_setWorldTransform_1 = b.asm._).apply(
        null,
        arguments
      )
    }),
    Ub = (b._emscripten_bind_btCollisionObject_setCollisionShape_1 = function () {
      return (Ub = b._emscripten_bind_btCollisionObject_setCollisionShape_1 = b.asm.$).apply(
        null,
        arguments
      )
    }),
    Vb = (b._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 = function () {
      return (Vb = b._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 = b.asm.aa).apply(
        null,
        arguments
      )
    }),
    Wb = (b._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = function () {
      return (Wb = b._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = b.asm.ba).apply(
        null,
        arguments
      )
    }),
    Xb = (b._emscripten_bind_btCollisionObject_getUserIndex_0 = function () {
      return (Xb = b._emscripten_bind_btCollisionObject_getUserIndex_0 = b.asm.ca).apply(
        null,
        arguments
      )
    }),
    Yb = (b._emscripten_bind_btCollisionObject_setUserIndex_1 = function () {
      return (Yb = b._emscripten_bind_btCollisionObject_setUserIndex_1 = b.asm.da).apply(
        null,
        arguments
      )
    }),
    Zb = (b._emscripten_bind_btCollisionObject_getUserPointer_0 = function () {
      return (Zb = b._emscripten_bind_btCollisionObject_getUserPointer_0 = b.asm.ea).apply(
        null,
        arguments
      )
    }),
    $b = (b._emscripten_bind_btCollisionObject_setUserPointer_1 = function () {
      return ($b = b._emscripten_bind_btCollisionObject_setUserPointer_1 = b.asm.fa).apply(
        null,
        arguments
      )
    }),
    ac = (b._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 = function () {
      return (ac = b._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 = b.asm.ga).apply(
        null,
        arguments
      )
    }),
    bc = (b._emscripten_bind_btCollisionObject___destroy___0 = function () {
      return (bc = b._emscripten_bind_btCollisionObject___destroy___0 = b.asm.ha).apply(
        null,
        arguments
      )
    }),
    cc = (b._emscripten_bind_btConcaveShape_setLocalScaling_1 = function () {
      return (cc = b._emscripten_bind_btConcaveShape_setLocalScaling_1 = b.asm.ia).apply(
        null,
        arguments
      )
    }),
    dc = (b._emscripten_bind_btConcaveShape_getLocalScaling_0 = function () {
      return (dc = b._emscripten_bind_btConcaveShape_getLocalScaling_0 = b.asm.ja).apply(
        null,
        arguments
      )
    }),
    ec = (b._emscripten_bind_btConcaveShape_calculateLocalInertia_2 = function () {
      return (ec = b._emscripten_bind_btConcaveShape_calculateLocalInertia_2 = b.asm.ka).apply(
        null,
        arguments
      )
    }),
    fc = (b._emscripten_bind_btConcaveShape___destroy___0 = function () {
      return (fc = b._emscripten_bind_btConcaveShape___destroy___0 = b.asm.la).apply(
        null,
        arguments
      )
    }),
    hc = (b._emscripten_bind_btTypedConstraint_enableFeedback_1 = function () {
      return (hc = b._emscripten_bind_btTypedConstraint_enableFeedback_1 = b.asm.ma).apply(
        null,
        arguments
      )
    }),
    ic = (b._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 = function () {
      return (ic = b._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 =
        b.asm.na).apply(null, arguments)
    }),
    jc = (b._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 = function () {
      return (jc = b._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 =
        b.asm.oa).apply(null, arguments)
    }),
    kc = (b._emscripten_bind_btTypedConstraint_getParam_2 = function () {
      return (kc = b._emscripten_bind_btTypedConstraint_getParam_2 = b.asm.pa).apply(
        null,
        arguments
      )
    }),
    lc = (b._emscripten_bind_btTypedConstraint_setParam_3 = function () {
      return (lc = b._emscripten_bind_btTypedConstraint_setParam_3 = b.asm.qa).apply(
        null,
        arguments
      )
    }),
    mc = (b._emscripten_bind_btTypedConstraint___destroy___0 = function () {
      return (mc = b._emscripten_bind_btTypedConstraint___destroy___0 = b.asm.ra).apply(
        null,
        arguments
      )
    }),
    nc = (b._emscripten_bind_btDynamicsWorld_addAction_1 = function () {
      return (nc = b._emscripten_bind_btDynamicsWorld_addAction_1 = b.asm.sa).apply(null, arguments)
    }),
    oc = (b._emscripten_bind_btDynamicsWorld_removeAction_1 = function () {
      return (oc = b._emscripten_bind_btDynamicsWorld_removeAction_1 = b.asm.ta).apply(
        null,
        arguments
      )
    }),
    pc = (b._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = function () {
      return (pc = b._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = b.asm.ua).apply(
        null,
        arguments
      )
    }),
    qc = (b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_1 = function () {
      return (qc = b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_1 = b.asm.va).apply(
        null,
        arguments
      )
    }),
    rc = (b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_2 = function () {
      return (rc = b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_2 = b.asm.wa).apply(
        null,
        arguments
      )
    }),
    sc = (b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_3 = function () {
      return (sc = b._emscripten_bind_btDynamicsWorld_setInternalTickCallback_3 = b.asm.xa).apply(
        null,
        arguments
      )
    }),
    tc = (b._emscripten_bind_btDynamicsWorld_getDispatcher_0 = function () {
      return (tc = b._emscripten_bind_btDynamicsWorld_getDispatcher_0 = b.asm.ya).apply(
        null,
        arguments
      )
    }),
    uc = (b._emscripten_bind_btDynamicsWorld_rayTest_3 = function () {
      return (uc = b._emscripten_bind_btDynamicsWorld_rayTest_3 = b.asm.za).apply(null, arguments)
    }),
    vc = (b._emscripten_bind_btDynamicsWorld_getPairCache_0 = function () {
      return (vc = b._emscripten_bind_btDynamicsWorld_getPairCache_0 = b.asm.Aa).apply(
        null,
        arguments
      )
    }),
    wc = (b._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = function () {
      return (wc = b._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = b.asm.Ba).apply(
        null,
        arguments
      )
    }),
    xc = (b._emscripten_bind_btDynamicsWorld_addCollisionObject_1 = function () {
      return (xc = b._emscripten_bind_btDynamicsWorld_addCollisionObject_1 = b.asm.Ca).apply(
        null,
        arguments
      )
    }),
    yc = (b._emscripten_bind_btDynamicsWorld_addCollisionObject_2 = function () {
      return (yc = b._emscripten_bind_btDynamicsWorld_addCollisionObject_2 = b.asm.Da).apply(
        null,
        arguments
      )
    }),
    zc = (b._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = function () {
      return (zc = b._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = b.asm.Ea).apply(
        null,
        arguments
      )
    }),
    Ac = (b._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 = function () {
      return (Ac = b._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 = b.asm.Fa).apply(
        null,
        arguments
      )
    }),
    Bc = (b._emscripten_bind_btDynamicsWorld_getBroadphase_0 = function () {
      return (Bc = b._emscripten_bind_btDynamicsWorld_getBroadphase_0 = b.asm.Ga).apply(
        null,
        arguments
      )
    }),
    Cc = (b._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = function () {
      return (Cc = b._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = b.asm.Ha).apply(
        null,
        arguments
      )
    }),
    Dc = (b._emscripten_bind_btDynamicsWorld_contactPairTest_3 = function () {
      return (Dc = b._emscripten_bind_btDynamicsWorld_contactPairTest_3 = b.asm.Ia).apply(
        null,
        arguments
      )
    }),
    Ec = (b._emscripten_bind_btDynamicsWorld_contactTest_2 = function () {
      return (Ec = b._emscripten_bind_btDynamicsWorld_contactTest_2 = b.asm.Ja).apply(
        null,
        arguments
      )
    }),
    Fc = (b._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = function () {
      return (Fc = b._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = b.asm.Ka).apply(
        null,
        arguments
      )
    }),
    Gc = (b._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 = function () {
      return (Gc = b._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 = b.asm.La).apply(
        null,
        arguments
      )
    }),
    Hc = (b._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = function () {
      return (Hc = b._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = b.asm.Ma).apply(
        null,
        arguments
      )
    }),
    Ic = (b._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = function () {
      return (Ic = b._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = b.asm.Na).apply(
        null,
        arguments
      )
    }),
    Jc = (b._emscripten_bind_btDynamicsWorld_debugDrawObject_3 = function () {
      return (Jc = b._emscripten_bind_btDynamicsWorld_debugDrawObject_3 = b.asm.Oa).apply(
        null,
        arguments
      )
    }),
    Kc = (b._emscripten_bind_btDynamicsWorld___destroy___0 = function () {
      return (Kc = b._emscripten_bind_btDynamicsWorld___destroy___0 = b.asm.Pa).apply(
        null,
        arguments
      )
    }),
    Lc = (b._emscripten_bind_btIDebugDraw_drawLine_3 = function () {
      return (Lc = b._emscripten_bind_btIDebugDraw_drawLine_3 = b.asm.Qa).apply(null, arguments)
    }),
    Mc = (b._emscripten_bind_btIDebugDraw_drawContactPoint_5 = function () {
      return (Mc = b._emscripten_bind_btIDebugDraw_drawContactPoint_5 = b.asm.Ra).apply(
        null,
        arguments
      )
    }),
    Nc = (b._emscripten_bind_btIDebugDraw_reportErrorWarning_1 = function () {
      return (Nc = b._emscripten_bind_btIDebugDraw_reportErrorWarning_1 = b.asm.Sa).apply(
        null,
        arguments
      )
    }),
    Oc = (b._emscripten_bind_btIDebugDraw_draw3dText_2 = function () {
      return (Oc = b._emscripten_bind_btIDebugDraw_draw3dText_2 = b.asm.Ta).apply(null, arguments)
    }),
    Pc = (b._emscripten_bind_btIDebugDraw_setDebugMode_1 = function () {
      return (Pc = b._emscripten_bind_btIDebugDraw_setDebugMode_1 = b.asm.Ua).apply(null, arguments)
    }),
    Qc = (b._emscripten_bind_btIDebugDraw_getDebugMode_0 = function () {
      return (Qc = b._emscripten_bind_btIDebugDraw_getDebugMode_0 = b.asm.Va).apply(null, arguments)
    }),
    Rc = (b._emscripten_bind_btIDebugDraw___destroy___0 = function () {
      return (Rc = b._emscripten_bind_btIDebugDraw___destroy___0 = b.asm.Wa).apply(null, arguments)
    }),
    Sc = (b._emscripten_bind_btVector3_btVector3_0 = function () {
      return (Sc = b._emscripten_bind_btVector3_btVector3_0 = b.asm.Xa).apply(null, arguments)
    }),
    Tc = (b._emscripten_bind_btVector3_btVector3_3 = function () {
      return (Tc = b._emscripten_bind_btVector3_btVector3_3 = b.asm.Ya).apply(null, arguments)
    }),
    Uc = (b._emscripten_bind_btVector3_length_0 = function () {
      return (Uc = b._emscripten_bind_btVector3_length_0 = b.asm.Za).apply(null, arguments)
    }),
    Vc = (b._emscripten_bind_btVector3_x_0 = function () {
      return (Vc = b._emscripten_bind_btVector3_x_0 = b.asm._a).apply(null, arguments)
    }),
    Wc = (b._emscripten_bind_btVector3_y_0 = function () {
      return (Wc = b._emscripten_bind_btVector3_y_0 = b.asm.$a).apply(null, arguments)
    }),
    Xc = (b._emscripten_bind_btVector3_z_0 = function () {
      return (Xc = b._emscripten_bind_btVector3_z_0 = b.asm.ab).apply(null, arguments)
    }),
    Yc = (b._emscripten_bind_btVector3_setX_1 = function () {
      return (Yc = b._emscripten_bind_btVector3_setX_1 = b.asm.bb).apply(null, arguments)
    }),
    Zc = (b._emscripten_bind_btVector3_setY_1 = function () {
      return (Zc = b._emscripten_bind_btVector3_setY_1 = b.asm.cb).apply(null, arguments)
    }),
    $c = (b._emscripten_bind_btVector3_setZ_1 = function () {
      return ($c = b._emscripten_bind_btVector3_setZ_1 = b.asm.db).apply(null, arguments)
    }),
    ad = (b._emscripten_bind_btVector3_setValue_3 = function () {
      return (ad = b._emscripten_bind_btVector3_setValue_3 = b.asm.eb).apply(null, arguments)
    }),
    bd = (b._emscripten_bind_btVector3_normalize_0 = function () {
      return (bd = b._emscripten_bind_btVector3_normalize_0 = b.asm.fb).apply(null, arguments)
    }),
    cd = (b._emscripten_bind_btVector3_rotate_2 = function () {
      return (cd = b._emscripten_bind_btVector3_rotate_2 = b.asm.gb).apply(null, arguments)
    }),
    dd = (b._emscripten_bind_btVector3_dot_1 = function () {
      return (dd = b._emscripten_bind_btVector3_dot_1 = b.asm.hb).apply(null, arguments)
    }),
    ed = (b._emscripten_bind_btVector3_op_mul_1 = function () {
      return (ed = b._emscripten_bind_btVector3_op_mul_1 = b.asm.ib).apply(null, arguments)
    }),
    fd = (b._emscripten_bind_btVector3_op_add_1 = function () {
      return (fd = b._emscripten_bind_btVector3_op_add_1 = b.asm.jb).apply(null, arguments)
    }),
    gd = (b._emscripten_bind_btVector3_op_sub_1 = function () {
      return (gd = b._emscripten_bind_btVector3_op_sub_1 = b.asm.kb).apply(null, arguments)
    }),
    hd = (b._emscripten_bind_btVector3___destroy___0 = function () {
      return (hd = b._emscripten_bind_btVector3___destroy___0 = b.asm.lb).apply(null, arguments)
    }),
    id = (b._emscripten_bind_btQuadWord_x_0 = function () {
      return (id = b._emscripten_bind_btQuadWord_x_0 = b.asm.mb).apply(null, arguments)
    }),
    jd = (b._emscripten_bind_btQuadWord_y_0 = function () {
      return (jd = b._emscripten_bind_btQuadWord_y_0 = b.asm.nb).apply(null, arguments)
    }),
    kd = (b._emscripten_bind_btQuadWord_z_0 = function () {
      return (kd = b._emscripten_bind_btQuadWord_z_0 = b.asm.ob).apply(null, arguments)
    }),
    ld = (b._emscripten_bind_btQuadWord_w_0 = function () {
      return (ld = b._emscripten_bind_btQuadWord_w_0 = b.asm.pb).apply(null, arguments)
    }),
    md = (b._emscripten_bind_btQuadWord_setX_1 = function () {
      return (md = b._emscripten_bind_btQuadWord_setX_1 = b.asm.qb).apply(null, arguments)
    }),
    nd = (b._emscripten_bind_btQuadWord_setY_1 = function () {
      return (nd = b._emscripten_bind_btQuadWord_setY_1 = b.asm.rb).apply(null, arguments)
    }),
    od = (b._emscripten_bind_btQuadWord_setZ_1 = function () {
      return (od = b._emscripten_bind_btQuadWord_setZ_1 = b.asm.sb).apply(null, arguments)
    }),
    pd = (b._emscripten_bind_btQuadWord_setW_1 = function () {
      return (pd = b._emscripten_bind_btQuadWord_setW_1 = b.asm.tb).apply(null, arguments)
    }),
    qd = (b._emscripten_bind_btQuadWord___destroy___0 = function () {
      return (qd = b._emscripten_bind_btQuadWord___destroy___0 = b.asm.ub).apply(null, arguments)
    }),
    rd = (b._emscripten_bind_btMotionState_getWorldTransform_1 = function () {
      return (rd = b._emscripten_bind_btMotionState_getWorldTransform_1 = b.asm.vb).apply(
        null,
        arguments
      )
    }),
    sd = (b._emscripten_bind_btMotionState_setWorldTransform_1 = function () {
      return (sd = b._emscripten_bind_btMotionState_setWorldTransform_1 = b.asm.wb).apply(
        null,
        arguments
      )
    }),
    td = (b._emscripten_bind_btMotionState___destroy___0 = function () {
      return (td = b._emscripten_bind_btMotionState___destroy___0 = b.asm.xb).apply(null, arguments)
    }),
    ud = (b._emscripten_bind_RayResultCallback_hasHit_0 = function () {
      return (ud = b._emscripten_bind_RayResultCallback_hasHit_0 = b.asm.yb).apply(null, arguments)
    }),
    vd = (b._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 = function () {
      return (vd = b._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 =
        b.asm.zb).apply(null, arguments)
    }),
    wd = (b._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 = function () {
      return (wd = b._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 =
        b.asm.Ab).apply(null, arguments)
    }),
    xd = (b._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 = function () {
      return (xd = b._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 =
        b.asm.Bb).apply(null, arguments)
    }),
    yd = (b._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 = function () {
      return (yd = b._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 =
        b.asm.Cb).apply(null, arguments)
    }),
    zd = (b._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 = function () {
      return (zd = b._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 =
        b.asm.Db).apply(null, arguments)
    }),
    Ad = (b._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 = function () {
      return (Ad = b._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 =
        b.asm.Eb).apply(null, arguments)
    }),
    Bd = (b._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = function () {
      return (Bd = b._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = b.asm.Fb).apply(
        null,
        arguments
      )
    }),
    Cd = (b._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = function () {
      return (Cd = b._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = b.asm.Gb).apply(
        null,
        arguments
      )
    }),
    Dd = (b._emscripten_bind_RayResultCallback___destroy___0 = function () {
      return (Dd = b._emscripten_bind_RayResultCallback___destroy___0 = b.asm.Hb).apply(
        null,
        arguments
      )
    }),
    Ed = (b._emscripten_bind_ContactResultCallback_addSingleResult_7 = function () {
      return (Ed = b._emscripten_bind_ContactResultCallback_addSingleResult_7 = b.asm.Ib).apply(
        null,
        arguments
      )
    }),
    Fd = (b._emscripten_bind_ContactResultCallback___destroy___0 = function () {
      return (Fd = b._emscripten_bind_ContactResultCallback___destroy___0 = b.asm.Jb).apply(
        null,
        arguments
      )
    }),
    Gd = (b._emscripten_bind_ConvexResultCallback_hasHit_0 = function () {
      return (Gd = b._emscripten_bind_ConvexResultCallback_hasHit_0 = b.asm.Kb).apply(
        null,
        arguments
      )
    }),
    Hd = (b._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 = function () {
      return (Hd = b._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 =
        b.asm.Lb).apply(null, arguments)
    }),
    Id = (b._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 = function () {
      return (Id = b._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 =
        b.asm.Mb).apply(null, arguments)
    }),
    Jd = (b._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 = function () {
      return (Jd = b._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 =
        b.asm.Nb).apply(null, arguments)
    }),
    Kd = (b._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 = function () {
      return (Kd = b._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 =
        b.asm.Ob).apply(null, arguments)
    }),
    Ld = (b._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 = function () {
      return (Ld = b._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 =
        b.asm.Pb).apply(null, arguments)
    }),
    Md = (b._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 = function () {
      return (Md = b._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 =
        b.asm.Qb).apply(null, arguments)
    }),
    Nd = (b._emscripten_bind_ConvexResultCallback___destroy___0 = function () {
      return (Nd = b._emscripten_bind_ConvexResultCallback___destroy___0 = b.asm.Rb).apply(
        null,
        arguments
      )
    }),
    Od = (b._emscripten_bind_btConvexShape_setLocalScaling_1 = function () {
      return (Od = b._emscripten_bind_btConvexShape_setLocalScaling_1 = b.asm.Sb).apply(
        null,
        arguments
      )
    }),
    Pd = (b._emscripten_bind_btConvexShape_getLocalScaling_0 = function () {
      return (Pd = b._emscripten_bind_btConvexShape_getLocalScaling_0 = b.asm.Tb).apply(
        null,
        arguments
      )
    }),
    Qd = (b._emscripten_bind_btConvexShape_calculateLocalInertia_2 = function () {
      return (Qd = b._emscripten_bind_btConvexShape_calculateLocalInertia_2 = b.asm.Ub).apply(
        null,
        arguments
      )
    }),
    Rd = (b._emscripten_bind_btConvexShape_setMargin_1 = function () {
      return (Rd = b._emscripten_bind_btConvexShape_setMargin_1 = b.asm.Vb).apply(null, arguments)
    }),
    Sd = (b._emscripten_bind_btConvexShape_getMargin_0 = function () {
      return (Sd = b._emscripten_bind_btConvexShape_getMargin_0 = b.asm.Wb).apply(null, arguments)
    }),
    Td = (b._emscripten_bind_btConvexShape___destroy___0 = function () {
      return (Td = b._emscripten_bind_btConvexShape___destroy___0 = b.asm.Xb).apply(null, arguments)
    }),
    Ud = (b._emscripten_bind_btCapsuleShape_btCapsuleShape_2 = function () {
      return (Ud = b._emscripten_bind_btCapsuleShape_btCapsuleShape_2 = b.asm.Yb).apply(
        null,
        arguments
      )
    }),
    Vd = (b._emscripten_bind_btCapsuleShape_setMargin_1 = function () {
      return (Vd = b._emscripten_bind_btCapsuleShape_setMargin_1 = b.asm.Zb).apply(null, arguments)
    }),
    Wd = (b._emscripten_bind_btCapsuleShape_getMargin_0 = function () {
      return (Wd = b._emscripten_bind_btCapsuleShape_getMargin_0 = b.asm._b).apply(null, arguments)
    }),
    Xd = (b._emscripten_bind_btCapsuleShape_getUpAxis_0 = function () {
      return (Xd = b._emscripten_bind_btCapsuleShape_getUpAxis_0 = b.asm.$b).apply(null, arguments)
    }),
    Yd = (b._emscripten_bind_btCapsuleShape_getRadius_0 = function () {
      return (Yd = b._emscripten_bind_btCapsuleShape_getRadius_0 = b.asm.ac).apply(null, arguments)
    }),
    Zd = (b._emscripten_bind_btCapsuleShape_getHalfHeight_0 = function () {
      return (Zd = b._emscripten_bind_btCapsuleShape_getHalfHeight_0 = b.asm.bc).apply(
        null,
        arguments
      )
    }),
    $d = (b._emscripten_bind_btCapsuleShape_setLocalScaling_1 = function () {
      return ($d = b._emscripten_bind_btCapsuleShape_setLocalScaling_1 = b.asm.cc).apply(
        null,
        arguments
      )
    }),
    ae = (b._emscripten_bind_btCapsuleShape_getLocalScaling_0 = function () {
      return (ae = b._emscripten_bind_btCapsuleShape_getLocalScaling_0 = b.asm.dc).apply(
        null,
        arguments
      )
    }),
    be = (b._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 = function () {
      return (be = b._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 = b.asm.ec).apply(
        null,
        arguments
      )
    }),
    ce = (b._emscripten_bind_btCapsuleShape___destroy___0 = function () {
      return (ce = b._emscripten_bind_btCapsuleShape___destroy___0 = b.asm.fc).apply(
        null,
        arguments
      )
    }),
    de = (b._emscripten_bind_btCylinderShape_btCylinderShape_1 = function () {
      return (de = b._emscripten_bind_btCylinderShape_btCylinderShape_1 = b.asm.gc).apply(
        null,
        arguments
      )
    }),
    ee = (b._emscripten_bind_btCylinderShape_setMargin_1 = function () {
      return (ee = b._emscripten_bind_btCylinderShape_setMargin_1 = b.asm.hc).apply(null, arguments)
    }),
    fe = (b._emscripten_bind_btCylinderShape_getMargin_0 = function () {
      return (fe = b._emscripten_bind_btCylinderShape_getMargin_0 = b.asm.ic).apply(null, arguments)
    }),
    ge = (b._emscripten_bind_btCylinderShape_setLocalScaling_1 = function () {
      return (ge = b._emscripten_bind_btCylinderShape_setLocalScaling_1 = b.asm.jc).apply(
        null,
        arguments
      )
    }),
    he = (b._emscripten_bind_btCylinderShape_getLocalScaling_0 = function () {
      return (he = b._emscripten_bind_btCylinderShape_getLocalScaling_0 = b.asm.kc).apply(
        null,
        arguments
      )
    }),
    ie = (b._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = function () {
      return (ie = b._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = b.asm.lc).apply(
        null,
        arguments
      )
    }),
    je = (b._emscripten_bind_btCylinderShape___destroy___0 = function () {
      return (je = b._emscripten_bind_btCylinderShape___destroy___0 = b.asm.mc).apply(
        null,
        arguments
      )
    }),
    ke = (b._emscripten_bind_btConeShape_btConeShape_2 = function () {
      return (ke = b._emscripten_bind_btConeShape_btConeShape_2 = b.asm.nc).apply(null, arguments)
    }),
    le = (b._emscripten_bind_btConeShape_setLocalScaling_1 = function () {
      return (le = b._emscripten_bind_btConeShape_setLocalScaling_1 = b.asm.oc).apply(
        null,
        arguments
      )
    }),
    me = (b._emscripten_bind_btConeShape_getLocalScaling_0 = function () {
      return (me = b._emscripten_bind_btConeShape_getLocalScaling_0 = b.asm.pc).apply(
        null,
        arguments
      )
    }),
    ne = (b._emscripten_bind_btConeShape_calculateLocalInertia_2 = function () {
      return (ne = b._emscripten_bind_btConeShape_calculateLocalInertia_2 = b.asm.qc).apply(
        null,
        arguments
      )
    }),
    oe = (b._emscripten_bind_btConeShape___destroy___0 = function () {
      return (oe = b._emscripten_bind_btConeShape___destroy___0 = b.asm.rc).apply(null, arguments)
    }),
    pe = (b._emscripten_bind_btStridingMeshInterface_setScaling_1 = function () {
      return (pe = b._emscripten_bind_btStridingMeshInterface_setScaling_1 = b.asm.sc).apply(
        null,
        arguments
      )
    }),
    qe = (b._emscripten_bind_btStridingMeshInterface___destroy___0 = function () {
      return (qe = b._emscripten_bind_btStridingMeshInterface___destroy___0 = b.asm.tc).apply(
        null,
        arguments
      )
    }),
    re = (b._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = function () {
      return (re = b._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = b.asm.uc).apply(
        null,
        arguments
      )
    }),
    se = (b._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = function () {
      return (se = b._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = b.asm.vc).apply(
        null,
        arguments
      )
    }),
    te = (b._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = function () {
      return (te = b._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = b.asm.wc).apply(
        null,
        arguments
      )
    }),
    ue = (b._emscripten_bind_btTriangleMeshShape___destroy___0 = function () {
      return (ue = b._emscripten_bind_btTriangleMeshShape___destroy___0 = b.asm.xc).apply(
        null,
        arguments
      )
    }),
    ve = (b._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 =
      function () {
        return (ve =
          b._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 =
            b.asm.yc).apply(null, arguments)
      }),
    we = (b._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 =
      function () {
        return (we =
          b._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 =
            b.asm.zc).apply(null, arguments)
      }),
    xe = (b._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 = function () {
      return (xe = b._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 =
        b.asm.Ac).apply(null, arguments)
    }),
    ye = (b._emscripten_bind_btDispatcher_getNumManifolds_0 = function () {
      return (ye = b._emscripten_bind_btDispatcher_getNumManifolds_0 = b.asm.Bc).apply(
        null,
        arguments
      )
    }),
    ze = (b._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 = function () {
      return (ze = b._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 = b.asm.Cc).apply(
        null,
        arguments
      )
    }),
    Ae = (b._emscripten_bind_btDispatcher___destroy___0 = function () {
      return (Ae = b._emscripten_bind_btDispatcher___destroy___0 = b.asm.Dc).apply(null, arguments)
    }),
    Be = (b._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 = function () {
      return (Be = b._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 =
        b.asm.Ec).apply(null, arguments)
    }),
    Ce = (b._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 = function () {
      return (Ce = b._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 =
        b.asm.Fc).apply(null, arguments)
    }),
    De = (b._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 = function () {
      return (De = b._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 =
        b.asm.Gc).apply(null, arguments)
    }),
    Ee = (b._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 = function () {
      return (Ee = b._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 =
        b.asm.Hc).apply(null, arguments)
    }),
    Fe = (b._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 = function () {
      return (Fe = b._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 =
        b.asm.Ic).apply(null, arguments)
    }),
    Ge = (b._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 = function () {
      return (Ge = b._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 =
        b.asm.Jc).apply(null, arguments)
    }),
    He = (b._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = function () {
      return (He = b._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = b.asm.Kc).apply(
        null,
        arguments
      )
    }),
    Ie = (b._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 = function () {
      return (Ie = b._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 = b.asm.Lc).apply(
        null,
        arguments
      )
    }),
    Je = (b._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 = function () {
      return (Je = b._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 =
        b.asm.Mc).apply(null, arguments)
    }),
    Ke = (b._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 = function () {
      return (Ke = b._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 =
        b.asm.Nc).apply(null, arguments)
    }),
    Le = (b._emscripten_bind_btGeneric6DofConstraint_getParam_2 = function () {
      return (Le = b._emscripten_bind_btGeneric6DofConstraint_getParam_2 = b.asm.Oc).apply(
        null,
        arguments
      )
    }),
    Me = (b._emscripten_bind_btGeneric6DofConstraint_setParam_3 = function () {
      return (Me = b._emscripten_bind_btGeneric6DofConstraint_setParam_3 = b.asm.Pc).apply(
        null,
        arguments
      )
    }),
    Ne = (b._emscripten_bind_btGeneric6DofConstraint___destroy___0 = function () {
      return (Ne = b._emscripten_bind_btGeneric6DofConstraint___destroy___0 = b.asm.Qc).apply(
        null,
        arguments
      )
    }),
    Oe = (b._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 = function () {
      return (Oe = b._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 =
        b.asm.Rc).apply(null, arguments)
    }),
    Pe = (b._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = function () {
      return (Pe = b._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = b.asm.Sc).apply(
        null,
        arguments
      )
    }),
    Qe = (b._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 = function () {
      return (Qe = b._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 = b.asm.Tc).apply(
        null,
        arguments
      )
    }),
    Re = (b._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 = function () {
      return (Re = b._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 = b.asm.Uc).apply(
        null,
        arguments
      )
    }),
    Se = (b._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = function () {
      return (Se = b._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = b.asm.Vc).apply(
        null,
        arguments
      )
    }),
    Te = (b._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = function () {
      return (Te = b._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = b.asm.Wc).apply(
        null,
        arguments
      )
    }),
    Ue = (b._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 = function () {
      return (Ue = b._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 = b.asm.Xc).apply(
        null,
        arguments
      )
    }),
    Ve = (b._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = function () {
      return (Ve = b._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = b.asm.Yc).apply(
        null,
        arguments
      )
    }),
    We = (b._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = function () {
      return (We = b._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = b.asm.Zc).apply(
        null,
        arguments
      )
    }),
    Xe = (b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 = function () {
      return (Xe = b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 = b.asm._c).apply(
        null,
        arguments
      )
    }),
    Ye = (b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = function () {
      return (Ye = b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = b.asm.$c).apply(
        null,
        arguments
      )
    }),
    Ze = (b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = function () {
      return (Ze = b._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = b.asm.ad).apply(
        null,
        arguments
      )
    }),
    $e = (b._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 = function () {
      return ($e = b._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 =
        b.asm.bd).apply(null, arguments)
    }),
    af = (b._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 = function () {
      return (af = b._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 =
        b.asm.cd).apply(null, arguments)
    }),
    bf = (b._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 = function () {
      return (bf = b._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 =
        b.asm.dd).apply(null, arguments)
    }),
    cf = (b._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 = function () {
      return (cf = b._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 = b.asm.ed).apply(
        null,
        arguments
      )
    }),
    df = (b._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = function () {
      return (df = b._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = b.asm.fd).apply(
        null,
        arguments
      )
    }),
    ef = (b._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = function () {
      return (ef = b._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = b.asm.gd).apply(
        null,
        arguments
      )
    }),
    ff = (b._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = function () {
      return (ff = b._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = b.asm.hd).apply(
        null,
        arguments
      )
    }),
    gf = (b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 = function () {
      return (gf = b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 =
        b.asm.id).apply(null, arguments)
    }),
    hf = (b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 = function () {
      return (hf = b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 =
        b.asm.jd).apply(null, arguments)
    }),
    jf = (b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 = function () {
      return (jf = b._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 =
        b.asm.kd).apply(null, arguments)
    }),
    kf = (b._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 = function () {
      return (kf = b._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 =
        b.asm.ld).apply(null, arguments)
    }),
    lf = (b._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 = function () {
      return (lf = b._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 = b.asm.md).apply(
        null,
        arguments
      )
    }),
    mf = (b._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = function () {
      return (mf = b._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = b.asm.nd).apply(
        null,
        arguments
      )
    }),
    nf = (b._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 = function () {
      return (nf = b._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 = b.asm.od).apply(
        null,
        arguments
      )
    }),
    of = (b._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 = function () {
      return (of = b._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 = b.asm.pd).apply(
        null,
        arguments
      )
    }),
    pf = (b._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = function () {
      return (pf = b._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = b.asm.qd).apply(
        null,
        arguments
      )
    }),
    qf = (b._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = function () {
      return (qf = b._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = b.asm.rd).apply(
        null,
        arguments
      )
    }),
    rf = (b._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 = function () {
      return (rf = b._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 = b.asm.sd).apply(
        null,
        arguments
      )
    }),
    sf = (b._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = function () {
      return (sf = b._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = b.asm.td).apply(
        null,
        arguments
      )
    }),
    tf = (b._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = function () {
      return (tf = b._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = b.asm.ud).apply(
        null,
        arguments
      )
    }),
    uf = (b._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 = function () {
      return (uf = b._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 = b.asm.vd).apply(
        null,
        arguments
      )
    }),
    vf = (b._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 = function () {
      return (vf = b._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 = b.asm.wd).apply(
        null,
        arguments
      )
    }),
    wf = (b._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = function () {
      return (wf = b._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = b.asm.xd).apply(
        null,
        arguments
      )
    }),
    xf = (b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_1 = function () {
      return (xf = b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_1 =
        b.asm.yd).apply(null, arguments)
    }),
    yf = (b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_2 = function () {
      return (yf = b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_2 =
        b.asm.zd).apply(null, arguments)
    }),
    zf = (b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_3 = function () {
      return (zf = b._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_3 =
        b.asm.Ad).apply(null, arguments)
    }),
    Af = (b._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = function () {
      return (Af = b._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = b.asm.Bd).apply(
        null,
        arguments
      )
    }),
    Bf = (b._emscripten_bind_btVehicleRaycaster_castRay_3 = function () {
      return (Bf = b._emscripten_bind_btVehicleRaycaster_castRay_3 = b.asm.Cd).apply(
        null,
        arguments
      )
    }),
    Cf = (b._emscripten_bind_btVehicleRaycaster___destroy___0 = function () {
      return (Cf = b._emscripten_bind_btVehicleRaycaster___destroy___0 = b.asm.Dd).apply(
        null,
        arguments
      )
    }),
    Df = (b._emscripten_bind_btActionInterface_updateAction_2 = function () {
      return (Df = b._emscripten_bind_btActionInterface_updateAction_2 = b.asm.Ed).apply(
        null,
        arguments
      )
    }),
    Ef = (b._emscripten_bind_btActionInterface___destroy___0 = function () {
      return (Ef = b._emscripten_bind_btActionInterface___destroy___0 = b.asm.Fd).apply(
        null,
        arguments
      )
    }),
    Ff = (b._emscripten_bind_btGhostObject_btGhostObject_0 = function () {
      return (Ff = b._emscripten_bind_btGhostObject_btGhostObject_0 = b.asm.Gd).apply(
        null,
        arguments
      )
    }),
    Gf = (b._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = function () {
      return (Gf = b._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = b.asm.Hd).apply(
        null,
        arguments
      )
    }),
    Hf = (b._emscripten_bind_btGhostObject_getOverlappingObject_1 = function () {
      return (Hf = b._emscripten_bind_btGhostObject_getOverlappingObject_1 = b.asm.Id).apply(
        null,
        arguments
      )
    }),
    If = (b._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = function () {
      return (If = b._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = b.asm.Jd).apply(
        null,
        arguments
      )
    }),
    Jf = (b._emscripten_bind_btGhostObject_getCollisionShape_0 = function () {
      return (Jf = b._emscripten_bind_btGhostObject_getCollisionShape_0 = b.asm.Kd).apply(
        null,
        arguments
      )
    }),
    Kf = (b._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 = function () {
      return (Kf = b._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 =
        b.asm.Ld).apply(null, arguments)
    }),
    Lf = (b._emscripten_bind_btGhostObject_setActivationState_1 = function () {
      return (Lf = b._emscripten_bind_btGhostObject_setActivationState_1 = b.asm.Md).apply(
        null,
        arguments
      )
    }),
    Mf = (b._emscripten_bind_btGhostObject_forceActivationState_1 = function () {
      return (Mf = b._emscripten_bind_btGhostObject_forceActivationState_1 = b.asm.Nd).apply(
        null,
        arguments
      )
    }),
    Nf = (b._emscripten_bind_btGhostObject_activate_0 = function () {
      return (Nf = b._emscripten_bind_btGhostObject_activate_0 = b.asm.Od).apply(null, arguments)
    }),
    Of = (b._emscripten_bind_btGhostObject_activate_1 = function () {
      return (Of = b._emscripten_bind_btGhostObject_activate_1 = b.asm.Pd).apply(null, arguments)
    }),
    Pf = (b._emscripten_bind_btGhostObject_isActive_0 = function () {
      return (Pf = b._emscripten_bind_btGhostObject_isActive_0 = b.asm.Qd).apply(null, arguments)
    }),
    Qf = (b._emscripten_bind_btGhostObject_isKinematicObject_0 = function () {
      return (Qf = b._emscripten_bind_btGhostObject_isKinematicObject_0 = b.asm.Rd).apply(
        null,
        arguments
      )
    }),
    Rf = (b._emscripten_bind_btGhostObject_isStaticObject_0 = function () {
      return (Rf = b._emscripten_bind_btGhostObject_isStaticObject_0 = b.asm.Sd).apply(
        null,
        arguments
      )
    }),
    Sf = (b._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 = function () {
      return (Sf = b._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 = b.asm.Td).apply(
        null,
        arguments
      )
    }),
    Tf = (b._emscripten_bind_btGhostObject_getRestitution_0 = function () {
      return (Tf = b._emscripten_bind_btGhostObject_getRestitution_0 = b.asm.Ud).apply(
        null,
        arguments
      )
    }),
    Uf = (b._emscripten_bind_btGhostObject_getFriction_0 = function () {
      return (Uf = b._emscripten_bind_btGhostObject_getFriction_0 = b.asm.Vd).apply(null, arguments)
    }),
    Vf = (b._emscripten_bind_btGhostObject_getRollingFriction_0 = function () {
      return (Vf = b._emscripten_bind_btGhostObject_getRollingFriction_0 = b.asm.Wd).apply(
        null,
        arguments
      )
    }),
    Wf = (b._emscripten_bind_btGhostObject_setRestitution_1 = function () {
      return (Wf = b._emscripten_bind_btGhostObject_setRestitution_1 = b.asm.Xd).apply(
        null,
        arguments
      )
    }),
    Xf = (b._emscripten_bind_btGhostObject_setFriction_1 = function () {
      return (Xf = b._emscripten_bind_btGhostObject_setFriction_1 = b.asm.Yd).apply(null, arguments)
    }),
    Yf = (b._emscripten_bind_btGhostObject_setRollingFriction_1 = function () {
      return (Yf = b._emscripten_bind_btGhostObject_setRollingFriction_1 = b.asm.Zd).apply(
        null,
        arguments
      )
    }),
    Zf = (b._emscripten_bind_btGhostObject_getWorldTransform_0 = function () {
      return (Zf = b._emscripten_bind_btGhostObject_getWorldTransform_0 = b.asm._d).apply(
        null,
        arguments
      )
    }),
    $f = (b._emscripten_bind_btGhostObject_getCollisionFlags_0 = function () {
      return ($f = b._emscripten_bind_btGhostObject_getCollisionFlags_0 = b.asm.$d).apply(
        null,
        arguments
      )
    }),
    ag = (b._emscripten_bind_btGhostObject_setCollisionFlags_1 = function () {
      return (ag = b._emscripten_bind_btGhostObject_setCollisionFlags_1 = b.asm.ae).apply(
        null,
        arguments
      )
    }),
    bg = (b._emscripten_bind_btGhostObject_setWorldTransform_1 = function () {
      return (bg = b._emscripten_bind_btGhostObject_setWorldTransform_1 = b.asm.be).apply(
        null,
        arguments
      )
    }),
    cg = (b._emscripten_bind_btGhostObject_setCollisionShape_1 = function () {
      return (cg = b._emscripten_bind_btGhostObject_setCollisionShape_1 = b.asm.ce).apply(
        null,
        arguments
      )
    }),
    dg = (b._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = function () {
      return (dg = b._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = b.asm.de).apply(
        null,
        arguments
      )
    }),
    eg = (b._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = function () {
      return (eg = b._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = b.asm.ee).apply(
        null,
        arguments
      )
    }),
    fg = (b._emscripten_bind_btGhostObject_getUserIndex_0 = function () {
      return (fg = b._emscripten_bind_btGhostObject_getUserIndex_0 = b.asm.fe).apply(
        null,
        arguments
      )
    }),
    gg = (b._emscripten_bind_btGhostObject_setUserIndex_1 = function () {
      return (gg = b._emscripten_bind_btGhostObject_setUserIndex_1 = b.asm.ge).apply(
        null,
        arguments
      )
    }),
    hg = (b._emscripten_bind_btGhostObject_getUserPointer_0 = function () {
      return (hg = b._emscripten_bind_btGhostObject_getUserPointer_0 = b.asm.he).apply(
        null,
        arguments
      )
    }),
    ig = (b._emscripten_bind_btGhostObject_setUserPointer_1 = function () {
      return (ig = b._emscripten_bind_btGhostObject_setUserPointer_1 = b.asm.ie).apply(
        null,
        arguments
      )
    }),
    jg = (b._emscripten_bind_btGhostObject_getBroadphaseHandle_0 = function () {
      return (jg = b._emscripten_bind_btGhostObject_getBroadphaseHandle_0 = b.asm.je).apply(
        null,
        arguments
      )
    }),
    kg = (b._emscripten_bind_btGhostObject___destroy___0 = function () {
      return (kg = b._emscripten_bind_btGhostObject___destroy___0 = b.asm.ke).apply(null, arguments)
    }),
    lg = (b._emscripten_bind_btSoftBodySolver___destroy___0 = function () {
      return (lg = b._emscripten_bind_btSoftBodySolver___destroy___0 = b.asm.le).apply(
        null,
        arguments
      )
    }),
    mg = (b._emscripten_bind_VoidPtr___destroy___0 = function () {
      return (mg = b._emscripten_bind_VoidPtr___destroy___0 = b.asm.me).apply(null, arguments)
    }),
    ng = (b._emscripten_bind_DebugDrawer_DebugDrawer_0 = function () {
      return (ng = b._emscripten_bind_DebugDrawer_DebugDrawer_0 = b.asm.ne).apply(null, arguments)
    }),
    og = (b._emscripten_bind_DebugDrawer_drawLine_3 = function () {
      return (og = b._emscripten_bind_DebugDrawer_drawLine_3 = b.asm.oe).apply(null, arguments)
    }),
    pg = (b._emscripten_bind_DebugDrawer_drawContactPoint_5 = function () {
      return (pg = b._emscripten_bind_DebugDrawer_drawContactPoint_5 = b.asm.pe).apply(
        null,
        arguments
      )
    }),
    qg = (b._emscripten_bind_DebugDrawer_reportErrorWarning_1 = function () {
      return (qg = b._emscripten_bind_DebugDrawer_reportErrorWarning_1 = b.asm.qe).apply(
        null,
        arguments
      )
    }),
    rg = (b._emscripten_bind_DebugDrawer_draw3dText_2 = function () {
      return (rg = b._emscripten_bind_DebugDrawer_draw3dText_2 = b.asm.re).apply(null, arguments)
    }),
    sg = (b._emscripten_bind_DebugDrawer_setDebugMode_1 = function () {
      return (sg = b._emscripten_bind_DebugDrawer_setDebugMode_1 = b.asm.se).apply(null, arguments)
    }),
    tg = (b._emscripten_bind_DebugDrawer_getDebugMode_0 = function () {
      return (tg = b._emscripten_bind_DebugDrawer_getDebugMode_0 = b.asm.te).apply(null, arguments)
    }),
    ug = (b._emscripten_bind_DebugDrawer___destroy___0 = function () {
      return (ug = b._emscripten_bind_DebugDrawer___destroy___0 = b.asm.ue).apply(null, arguments)
    }),
    vg = (b._emscripten_bind_btVector4_btVector4_0 = function () {
      return (vg = b._emscripten_bind_btVector4_btVector4_0 = b.asm.ve).apply(null, arguments)
    }),
    wg = (b._emscripten_bind_btVector4_btVector4_4 = function () {
      return (wg = b._emscripten_bind_btVector4_btVector4_4 = b.asm.we).apply(null, arguments)
    }),
    xg = (b._emscripten_bind_btVector4_w_0 = function () {
      return (xg = b._emscripten_bind_btVector4_w_0 = b.asm.xe).apply(null, arguments)
    }),
    yg = (b._emscripten_bind_btVector4_setValue_4 = function () {
      return (yg = b._emscripten_bind_btVector4_setValue_4 = b.asm.ye).apply(null, arguments)
    }),
    zg = (b._emscripten_bind_btVector4_length_0 = function () {
      return (zg = b._emscripten_bind_btVector4_length_0 = b.asm.ze).apply(null, arguments)
    }),
    Ag = (b._emscripten_bind_btVector4_x_0 = function () {
      return (Ag = b._emscripten_bind_btVector4_x_0 = b.asm.Ae).apply(null, arguments)
    }),
    Bg = (b._emscripten_bind_btVector4_y_0 = function () {
      return (Bg = b._emscripten_bind_btVector4_y_0 = b.asm.Be).apply(null, arguments)
    }),
    Cg = (b._emscripten_bind_btVector4_z_0 = function () {
      return (Cg = b._emscripten_bind_btVector4_z_0 = b.asm.Ce).apply(null, arguments)
    }),
    Dg = (b._emscripten_bind_btVector4_setX_1 = function () {
      return (Dg = b._emscripten_bind_btVector4_setX_1 = b.asm.De).apply(null, arguments)
    }),
    Eg = (b._emscripten_bind_btVector4_setY_1 = function () {
      return (Eg = b._emscripten_bind_btVector4_setY_1 = b.asm.Ee).apply(null, arguments)
    }),
    Fg = (b._emscripten_bind_btVector4_setZ_1 = function () {
      return (Fg = b._emscripten_bind_btVector4_setZ_1 = b.asm.Fe).apply(null, arguments)
    }),
    Gg = (b._emscripten_bind_btVector4_normalize_0 = function () {
      return (Gg = b._emscripten_bind_btVector4_normalize_0 = b.asm.Ge).apply(null, arguments)
    }),
    Hg = (b._emscripten_bind_btVector4_rotate_2 = function () {
      return (Hg = b._emscripten_bind_btVector4_rotate_2 = b.asm.He).apply(null, arguments)
    }),
    Ig = (b._emscripten_bind_btVector4_dot_1 = function () {
      return (Ig = b._emscripten_bind_btVector4_dot_1 = b.asm.Ie).apply(null, arguments)
    }),
    Jg = (b._emscripten_bind_btVector4_op_mul_1 = function () {
      return (Jg = b._emscripten_bind_btVector4_op_mul_1 = b.asm.Je).apply(null, arguments)
    }),
    Kg = (b._emscripten_bind_btVector4_op_add_1 = function () {
      return (Kg = b._emscripten_bind_btVector4_op_add_1 = b.asm.Ke).apply(null, arguments)
    }),
    Lg = (b._emscripten_bind_btVector4_op_sub_1 = function () {
      return (Lg = b._emscripten_bind_btVector4_op_sub_1 = b.asm.Le).apply(null, arguments)
    }),
    Mg = (b._emscripten_bind_btVector4___destroy___0 = function () {
      return (Mg = b._emscripten_bind_btVector4___destroy___0 = b.asm.Me).apply(null, arguments)
    }),
    Ng = (b._emscripten_bind_btQuaternion_btQuaternion_4 = function () {
      return (Ng = b._emscripten_bind_btQuaternion_btQuaternion_4 = b.asm.Ne).apply(null, arguments)
    }),
    Og = (b._emscripten_bind_btQuaternion_setValue_4 = function () {
      return (Og = b._emscripten_bind_btQuaternion_setValue_4 = b.asm.Oe).apply(null, arguments)
    }),
    Pg = (b._emscripten_bind_btQuaternion_setEulerZYX_3 = function () {
      return (Pg = b._emscripten_bind_btQuaternion_setEulerZYX_3 = b.asm.Pe).apply(null, arguments)
    }),
    Qg = (b._emscripten_bind_btQuaternion_setRotation_2 = function () {
      return (Qg = b._emscripten_bind_btQuaternion_setRotation_2 = b.asm.Qe).apply(null, arguments)
    }),
    Rg = (b._emscripten_bind_btQuaternion_normalize_0 = function () {
      return (Rg = b._emscripten_bind_btQuaternion_normalize_0 = b.asm.Re).apply(null, arguments)
    }),
    Sg = (b._emscripten_bind_btQuaternion_length2_0 = function () {
      return (Sg = b._emscripten_bind_btQuaternion_length2_0 = b.asm.Se).apply(null, arguments)
    }),
    Tg = (b._emscripten_bind_btQuaternion_length_0 = function () {
      return (Tg = b._emscripten_bind_btQuaternion_length_0 = b.asm.Te).apply(null, arguments)
    }),
    Ug = (b._emscripten_bind_btQuaternion_dot_1 = function () {
      return (Ug = b._emscripten_bind_btQuaternion_dot_1 = b.asm.Ue).apply(null, arguments)
    }),
    Vg = (b._emscripten_bind_btQuaternion_normalized_0 = function () {
      return (Vg = b._emscripten_bind_btQuaternion_normalized_0 = b.asm.Ve).apply(null, arguments)
    }),
    Wg = (b._emscripten_bind_btQuaternion_getAxis_0 = function () {
      return (Wg = b._emscripten_bind_btQuaternion_getAxis_0 = b.asm.We).apply(null, arguments)
    }),
    Xg = (b._emscripten_bind_btQuaternion_inverse_0 = function () {
      return (Xg = b._emscripten_bind_btQuaternion_inverse_0 = b.asm.Xe).apply(null, arguments)
    }),
    Yg = (b._emscripten_bind_btQuaternion_getAngle_0 = function () {
      return (Yg = b._emscripten_bind_btQuaternion_getAngle_0 = b.asm.Ye).apply(null, arguments)
    }),
    Zg = (b._emscripten_bind_btQuaternion_getAngleShortestPath_0 = function () {
      return (Zg = b._emscripten_bind_btQuaternion_getAngleShortestPath_0 = b.asm.Ze).apply(
        null,
        arguments
      )
    }),
    $g = (b._emscripten_bind_btQuaternion_angle_1 = function () {
      return ($g = b._emscripten_bind_btQuaternion_angle_1 = b.asm._e).apply(null, arguments)
    }),
    ah = (b._emscripten_bind_btQuaternion_angleShortestPath_1 = function () {
      return (ah = b._emscripten_bind_btQuaternion_angleShortestPath_1 = b.asm.$e).apply(
        null,
        arguments
      )
    }),
    bh = (b._emscripten_bind_btQuaternion_op_add_1 = function () {
      return (bh = b._emscripten_bind_btQuaternion_op_add_1 = b.asm.af).apply(null, arguments)
    }),
    ch = (b._emscripten_bind_btQuaternion_op_sub_1 = function () {
      return (ch = b._emscripten_bind_btQuaternion_op_sub_1 = b.asm.bf).apply(null, arguments)
    }),
    dh = (b._emscripten_bind_btQuaternion_op_mul_1 = function () {
      return (dh = b._emscripten_bind_btQuaternion_op_mul_1 = b.asm.cf).apply(null, arguments)
    }),
    eh = (b._emscripten_bind_btQuaternion_op_mulq_1 = function () {
      return (eh = b._emscripten_bind_btQuaternion_op_mulq_1 = b.asm.df).apply(null, arguments)
    }),
    fh = (b._emscripten_bind_btQuaternion_op_div_1 = function () {
      return (fh = b._emscripten_bind_btQuaternion_op_div_1 = b.asm.ef).apply(null, arguments)
    }),
    gh = (b._emscripten_bind_btQuaternion_x_0 = function () {
      return (gh = b._emscripten_bind_btQuaternion_x_0 = b.asm.ff).apply(null, arguments)
    }),
    hh = (b._emscripten_bind_btQuaternion_y_0 = function () {
      return (hh = b._emscripten_bind_btQuaternion_y_0 = b.asm.gf).apply(null, arguments)
    }),
    ih = (b._emscripten_bind_btQuaternion_z_0 = function () {
      return (ih = b._emscripten_bind_btQuaternion_z_0 = b.asm.hf).apply(null, arguments)
    }),
    jh = (b._emscripten_bind_btQuaternion_w_0 = function () {
      return (jh = b._emscripten_bind_btQuaternion_w_0 = b.asm.jf).apply(null, arguments)
    }),
    kh = (b._emscripten_bind_btQuaternion_setX_1 = function () {
      return (kh = b._emscripten_bind_btQuaternion_setX_1 = b.asm.kf).apply(null, arguments)
    }),
    lh = (b._emscripten_bind_btQuaternion_setY_1 = function () {
      return (lh = b._emscripten_bind_btQuaternion_setY_1 = b.asm.lf).apply(null, arguments)
    }),
    mh = (b._emscripten_bind_btQuaternion_setZ_1 = function () {
      return (mh = b._emscripten_bind_btQuaternion_setZ_1 = b.asm.mf).apply(null, arguments)
    }),
    nh = (b._emscripten_bind_btQuaternion_setW_1 = function () {
      return (nh = b._emscripten_bind_btQuaternion_setW_1 = b.asm.nf).apply(null, arguments)
    }),
    oh = (b._emscripten_bind_btQuaternion___destroy___0 = function () {
      return (oh = b._emscripten_bind_btQuaternion___destroy___0 = b.asm.of).apply(null, arguments)
    }),
    ph = (b._emscripten_bind_btMatrix3x3_setEulerZYX_3 = function () {
      return (ph = b._emscripten_bind_btMatrix3x3_setEulerZYX_3 = b.asm.pf).apply(null, arguments)
    }),
    qh = (b._emscripten_bind_btMatrix3x3_getRotation_1 = function () {
      return (qh = b._emscripten_bind_btMatrix3x3_getRotation_1 = b.asm.qf).apply(null, arguments)
    }),
    rh = (b._emscripten_bind_btMatrix3x3_getRow_1 = function () {
      return (rh = b._emscripten_bind_btMatrix3x3_getRow_1 = b.asm.rf).apply(null, arguments)
    }),
    sh = (b._emscripten_bind_btMatrix3x3___destroy___0 = function () {
      return (sh = b._emscripten_bind_btMatrix3x3___destroy___0 = b.asm.sf).apply(null, arguments)
    }),
    th = (b._emscripten_bind_btTransform_btTransform_0 = function () {
      return (th = b._emscripten_bind_btTransform_btTransform_0 = b.asm.tf).apply(null, arguments)
    }),
    uh = (b._emscripten_bind_btTransform_btTransform_2 = function () {
      return (uh = b._emscripten_bind_btTransform_btTransform_2 = b.asm.uf).apply(null, arguments)
    }),
    vh = (b._emscripten_bind_btTransform_setIdentity_0 = function () {
      return (vh = b._emscripten_bind_btTransform_setIdentity_0 = b.asm.vf).apply(null, arguments)
    }),
    wh = (b._emscripten_bind_btTransform_setOrigin_1 = function () {
      return (wh = b._emscripten_bind_btTransform_setOrigin_1 = b.asm.wf).apply(null, arguments)
    }),
    xh = (b._emscripten_bind_btTransform_setRotation_1 = function () {
      return (xh = b._emscripten_bind_btTransform_setRotation_1 = b.asm.xf).apply(null, arguments)
    }),
    yh = (b._emscripten_bind_btTransform_getOrigin_0 = function () {
      return (yh = b._emscripten_bind_btTransform_getOrigin_0 = b.asm.yf).apply(null, arguments)
    }),
    zh = (b._emscripten_bind_btTransform_getRotation_0 = function () {
      return (zh = b._emscripten_bind_btTransform_getRotation_0 = b.asm.zf).apply(null, arguments)
    }),
    Ah = (b._emscripten_bind_btTransform_getBasis_0 = function () {
      return (Ah = b._emscripten_bind_btTransform_getBasis_0 = b.asm.Af).apply(null, arguments)
    }),
    Bh = (b._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = function () {
      return (Bh = b._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = b.asm.Bf).apply(
        null,
        arguments
      )
    }),
    Ch = (b._emscripten_bind_btTransform_inverse_0 = function () {
      return (Ch = b._emscripten_bind_btTransform_inverse_0 = b.asm.Cf).apply(null, arguments)
    }),
    Dh = (b._emscripten_bind_btTransform_op_mul_1 = function () {
      return (Dh = b._emscripten_bind_btTransform_op_mul_1 = b.asm.Df).apply(null, arguments)
    }),
    Eh = (b._emscripten_bind_btTransform___destroy___0 = function () {
      return (Eh = b._emscripten_bind_btTransform___destroy___0 = b.asm.Ef).apply(null, arguments)
    }),
    Fh = (b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 = function () {
      return (Fh = b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 = b.asm.Ff).apply(
        null,
        arguments
      )
    }),
    Gh = (b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = function () {
      return (Gh = b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = b.asm.Gf).apply(
        null,
        arguments
      )
    }),
    Hh = (b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = function () {
      return (Hh = b._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = b.asm.Hf).apply(
        null,
        arguments
      )
    }),
    Ih = (b._emscripten_bind_btDefaultMotionState_getWorldTransform_1 = function () {
      return (Ih = b._emscripten_bind_btDefaultMotionState_getWorldTransform_1 = b.asm.If).apply(
        null,
        arguments
      )
    }),
    Jh = (b._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = function () {
      return (Jh = b._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = b.asm.Jf).apply(
        null,
        arguments
      )
    }),
    Kh = (b._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 = function () {
      return (Kh = b._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 =
        b.asm.Kf).apply(null, arguments)
    }),
    Lh = (b._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 = function () {
      return (Lh = b._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 =
        b.asm.Lf).apply(null, arguments)
    }),
    Mh = (b._emscripten_bind_btDefaultMotionState___destroy___0 = function () {
      return (Mh = b._emscripten_bind_btDefaultMotionState___destroy___0 = b.asm.Mf).apply(
        null,
        arguments
      )
    }),
    Nh = (b._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 = function () {
      return (Nh = b._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 =
        b.asm.Nf).apply(null, arguments)
    }),
    Oh = (b._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 = function () {
      return (Oh = b._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 =
        b.asm.Of).apply(null, arguments)
    }),
    Ph = (b._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 = function () {
      return (Ph = b._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 =
        b.asm.Pf).apply(null, arguments)
    }),
    Qh = (b._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 = function () {
      return (Qh = b._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 =
        b.asm.Qf).apply(null, arguments)
    }),
    Rh = (b._emscripten_bind_ClosestRayResultCallback_hasHit_0 = function () {
      return (Rh = b._emscripten_bind_ClosestRayResultCallback_hasHit_0 = b.asm.Rf).apply(
        null,
        arguments
      )
    }),
    Sh = (b._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 = function () {
      return (Sh = b._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 =
        b.asm.Sf).apply(null, arguments)
    }),
    Th = (b._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 = function () {
      return (Th = b._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 =
        b.asm.Tf).apply(null, arguments)
    }),
    Uh = (b._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 = function () {
      return (Uh = b._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 = b.asm.Uf).apply(
        null,
        arguments
      )
    }),
    Vh = (b._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 = function () {
      return (Vh = b._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 = b.asm.Vf).apply(
        null,
        arguments
      )
    }),
    Wh = (b._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 = function () {
      return (Wh = b._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 =
        b.asm.Wf).apply(null, arguments)
    }),
    Xh = (b._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 = function () {
      return (Xh = b._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 =
        b.asm.Xf).apply(null, arguments)
    }),
    Yh = (b._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 = function () {
      return (Yh = b._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 =
        b.asm.Yf).apply(null, arguments)
    }),
    Zh = (b._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 = function () {
      return (Zh = b._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 =
        b.asm.Zf).apply(null, arguments)
    }),
    $h = (b._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 = function () {
      return ($h = b._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 =
        b.asm._f).apply(null, arguments)
    }),
    ai = (b._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 = function () {
      return (ai = b._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 =
        b.asm.$f).apply(null, arguments)
    }),
    bi = (b._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 = function () {
      return (bi = b._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 =
        b.asm.ag).apply(null, arguments)
    }),
    ci = (b._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 = function () {
      return (ci = b._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 =
        b.asm.bg).apply(null, arguments)
    }),
    di = (b._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 = function () {
      return (di = b._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 =
        b.asm.cg).apply(null, arguments)
    }),
    ei = (b._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 = function () {
      return (ei = b._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 =
        b.asm.dg).apply(null, arguments)
    }),
    fi = (b._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 = function () {
      return (fi = b._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 =
        b.asm.eg).apply(null, arguments)
    }),
    gi = (b._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 = function () {
      return (gi = b._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 =
        b.asm.fg).apply(null, arguments)
    }),
    hi = (b._emscripten_bind_ClosestRayResultCallback___destroy___0 = function () {
      return (hi = b._emscripten_bind_ClosestRayResultCallback___destroy___0 = b.asm.gg).apply(
        null,
        arguments
      )
    }),
    ii = (b._emscripten_bind_btConstCollisionObjectArray_size_0 = function () {
      return (ii = b._emscripten_bind_btConstCollisionObjectArray_size_0 = b.asm.hg).apply(
        null,
        arguments
      )
    }),
    ji = (b._emscripten_bind_btConstCollisionObjectArray_at_1 = function () {
      return (ji = b._emscripten_bind_btConstCollisionObjectArray_at_1 = b.asm.ig).apply(
        null,
        arguments
      )
    }),
    ki = (b._emscripten_bind_btConstCollisionObjectArray___destroy___0 = function () {
      return (ki = b._emscripten_bind_btConstCollisionObjectArray___destroy___0 = b.asm.jg).apply(
        null,
        arguments
      )
    }),
    li = (b._emscripten_bind_btScalarArray_size_0 = function () {
      return (li = b._emscripten_bind_btScalarArray_size_0 = b.asm.kg).apply(null, arguments)
    }),
    mi = (b._emscripten_bind_btScalarArray_at_1 = function () {
      return (mi = b._emscripten_bind_btScalarArray_at_1 = b.asm.lg).apply(null, arguments)
    }),
    ni = (b._emscripten_bind_btScalarArray___destroy___0 = function () {
      return (ni = b._emscripten_bind_btScalarArray___destroy___0 = b.asm.mg).apply(null, arguments)
    }),
    oi = (b._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 = function () {
      return (oi = b._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 =
        b.asm.ng).apply(null, arguments)
    }),
    pi = (b._emscripten_bind_AllHitsRayResultCallback_hasHit_0 = function () {
      return (pi = b._emscripten_bind_AllHitsRayResultCallback_hasHit_0 = b.asm.og).apply(
        null,
        arguments
      )
    }),
    qi = (b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 = function () {
      return (qi = b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 =
        b.asm.pg).apply(null, arguments)
    }),
    ri = (b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 = function () {
      return (ri = b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 =
        b.asm.qg).apply(null, arguments)
    }),
    si = (b._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 = function () {
      return (si = b._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 =
        b.asm.rg).apply(null, arguments)
    }),
    ti = (b._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 = function () {
      return (ti = b._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 =
        b.asm.sg).apply(null, arguments)
    }),
    ui = (b._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 = function () {
      return (ui = b._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 = b.asm.tg).apply(
        null,
        arguments
      )
    }),
    vi = (b._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 = function () {
      return (vi = b._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 = b.asm.ug).apply(
        null,
        arguments
      )
    }),
    wi = (b._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 = function () {
      return (wi = b._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 =
        b.asm.vg).apply(null, arguments)
    }),
    xi = (b._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 = function () {
      return (xi = b._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 =
        b.asm.wg).apply(null, arguments)
    }),
    yi = (b._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 = function () {
      return (yi = b._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 =
        b.asm.xg).apply(null, arguments)
    }),
    zi = (b._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 = function () {
      return (zi = b._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 =
        b.asm.yg).apply(null, arguments)
    }),
    Ai = (b._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 = function () {
      return (Ai = b._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 =
        b.asm.zg).apply(null, arguments)
    }),
    Bi = (b._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 = function () {
      return (Bi = b._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 =
        b.asm.Ag).apply(null, arguments)
    }),
    Ci = (b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 = function () {
      return (Ci = b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 =
        b.asm.Bg).apply(null, arguments)
    }),
    Di = (b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 = function () {
      return (Di = b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 =
        b.asm.Cg).apply(null, arguments)
    }),
    Ei = (b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 = function () {
      return (Ei = b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 =
        b.asm.Dg).apply(null, arguments)
    }),
    Fi = (b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 = function () {
      return (Fi = b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 =
        b.asm.Eg).apply(null, arguments)
    }),
    Gi = (b._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 = function () {
      return (Gi = b._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 =
        b.asm.Fg).apply(null, arguments)
    }),
    Hi = (b._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 = function () {
      return (Hi = b._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 =
        b.asm.Gg).apply(null, arguments)
    }),
    Ii = (b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 = function () {
      return (Ii = b._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 =
        b.asm.Hg).apply(null, arguments)
    }),
    Ji = (b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 = function () {
      return (Ji = b._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 =
        b.asm.Ig).apply(null, arguments)
    }),
    Ki = (b._emscripten_bind_AllHitsRayResultCallback___destroy___0 = function () {
      return (Ki = b._emscripten_bind_AllHitsRayResultCallback___destroy___0 = b.asm.Jg).apply(
        null,
        arguments
      )
    }),
    Li = (b._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = function () {
      return (Li = b._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = b.asm.Kg).apply(
        null,
        arguments
      )
    }),
    Mi = (b._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 = function () {
      return (Mi = b._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 = b.asm.Lg).apply(
        null,
        arguments
      )
    }),
    Ni = (b._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 = function () {
      return (Ni = b._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 = b.asm.Mg).apply(
        null,
        arguments
      )
    }),
    Oi = (b._emscripten_bind_btManifoldPoint_getDistance_0 = function () {
      return (Oi = b._emscripten_bind_btManifoldPoint_getDistance_0 = b.asm.Ng).apply(
        null,
        arguments
      )
    }),
    Pi = (b._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = function () {
      return (Pi = b._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = b.asm.Og).apply(
        null,
        arguments
      )
    }),
    Qi = (b._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = function () {
      return (Qi = b._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = b.asm.Pg).apply(
        null,
        arguments
      )
    }),
    Ri = (b._emscripten_bind_btManifoldPoint_get_m_localPointB_0 = function () {
      return (Ri = b._emscripten_bind_btManifoldPoint_get_m_localPointB_0 = b.asm.Qg).apply(
        null,
        arguments
      )
    }),
    Si = (b._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = function () {
      return (Si = b._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = b.asm.Rg).apply(
        null,
        arguments
      )
    }),
    Ti = (b._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = function () {
      return (Ti = b._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = b.asm.Sg).apply(
        null,
        arguments
      )
    }),
    Ui = (b._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 = function () {
      return (Ui = b._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 = b.asm.Tg).apply(
        null,
        arguments
      )
    }),
    Vi = (b._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 = function () {
      return (Vi = b._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 = b.asm.Ug).apply(
        null,
        arguments
      )
    }),
    Wi = (b._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = function () {
      return (Wi = b._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = b.asm.Vg).apply(
        null,
        arguments
      )
    }),
    Xi = (b._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = function () {
      return (Xi = b._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = b.asm.Wg).apply(
        null,
        arguments
      )
    }),
    Yi = (b._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 = function () {
      return (Yi = b._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 = b.asm.Xg).apply(
        null,
        arguments
      )
    }),
    Zi = (b._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = function () {
      return (Zi = b._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = b.asm.Yg).apply(
        null,
        arguments
      )
    }),
    $i = (b._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = function () {
      return ($i = b._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = b.asm.Zg).apply(
        null,
        arguments
      )
    }),
    aj = (b._emscripten_bind_btManifoldPoint___destroy___0 = function () {
      return (aj = b._emscripten_bind_btManifoldPoint___destroy___0 = b.asm._g).apply(
        null,
        arguments
      )
    }),
    bj = (b._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 =
      function () {
        return (bj =
          b._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 =
            b.asm.$g).apply(null, arguments)
      }),
    cj = (b._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 = function () {
      return (cj = b._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 =
        b.asm.ah).apply(null, arguments)
    }),
    dj = (b._emscripten_bind_ConcreteContactResultCallback___destroy___0 = function () {
      return (dj = b._emscripten_bind_ConcreteContactResultCallback___destroy___0 = b.asm.bh).apply(
        null,
        arguments
      )
    }),
    ej = (b._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = function () {
      return (ej = b._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = b.asm.ch).apply(
        null,
        arguments
      )
    }),
    fj = (b._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = function () {
      return (fj = b._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = b.asm.dh).apply(
        null,
        arguments
      )
    }),
    gj = (b._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = function () {
      return (gj = b._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = b.asm.eh).apply(
        null,
        arguments
      )
    }),
    hj = (b._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = function () {
      return (hj = b._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = b.asm.fh).apply(
        null,
        arguments
      )
    }),
    ij = (b._emscripten_bind_LocalShapeInfo___destroy___0 = function () {
      return (ij = b._emscripten_bind_LocalShapeInfo___destroy___0 = b.asm.gh).apply(
        null,
        arguments
      )
    }),
    jj = (b._emscripten_bind_LocalConvexResult_LocalConvexResult_5 = function () {
      return (jj = b._emscripten_bind_LocalConvexResult_LocalConvexResult_5 = b.asm.hh).apply(
        null,
        arguments
      )
    }),
    kj = (b._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 = function () {
      return (kj = b._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 =
        b.asm.ih).apply(null, arguments)
    }),
    lj = (b._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 = function () {
      return (lj = b._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 =
        b.asm.jh).apply(null, arguments)
    }),
    mj = (b._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 = function () {
      return (mj = b._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 = b.asm.kh).apply(
        null,
        arguments
      )
    }),
    nj = (b._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = function () {
      return (nj = b._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = b.asm.lh).apply(
        null,
        arguments
      )
    }),
    oj = (b._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = function () {
      return (oj = b._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = b.asm.mh).apply(
        null,
        arguments
      )
    }),
    pj = (b._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 = function () {
      return (pj = b._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 = b.asm.nh).apply(
        null,
        arguments
      )
    }),
    qj = (b._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 = function () {
      return (qj = b._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 = b.asm.oh).apply(
        null,
        arguments
      )
    }),
    rj = (b._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = function () {
      return (rj = b._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = b.asm.ph).apply(
        null,
        arguments
      )
    }),
    sj = (b._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 = function () {
      return (sj = b._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 = b.asm.qh).apply(
        null,
        arguments
      )
    }),
    tj = (b._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = function () {
      return (tj = b._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = b.asm.rh).apply(
        null,
        arguments
      )
    }),
    uj = (b._emscripten_bind_LocalConvexResult___destroy___0 = function () {
      return (uj = b._emscripten_bind_LocalConvexResult___destroy___0 = b.asm.sh).apply(
        null,
        arguments
      )
    }),
    vj = (b._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 =
      function () {
        return (vj = b._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 =
          b.asm.th).apply(null, arguments)
      }),
    wj = (b._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = function () {
      return (wj = b._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = b.asm.uh).apply(
        null,
        arguments
      )
    }),
    xj = (b._emscripten_bind_ClosestConvexResultCallback_get_m_hitCollisionObject_0 = function () {
      return (xj = b._emscripten_bind_ClosestConvexResultCallback_get_m_hitCollisionObject_0 =
        b.asm.vh).apply(null, arguments)
    }),
    yj = (b._emscripten_bind_ClosestConvexResultCallback_set_m_hitCollisionObject_1 = function () {
      return (yj = b._emscripten_bind_ClosestConvexResultCallback_set_m_hitCollisionObject_1 =
        b.asm.wh).apply(null, arguments)
    }),
    zj = (b._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 = function () {
      return (zj = b._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 =
        b.asm.xh).apply(null, arguments)
    }),
    Aj = (b._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 = function () {
      return (Aj = b._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 =
        b.asm.yh).apply(null, arguments)
    }),
    Bj = (b._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 = function () {
      return (Bj = b._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 =
        b.asm.zh).apply(null, arguments)
    }),
    Cj = (b._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 = function () {
      return (Cj = b._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 =
        b.asm.Ah).apply(null, arguments)
    }),
    Dj = (b._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 = function () {
      return (Dj = b._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 =
        b.asm.Bh).apply(null, arguments)
    }),
    Ej = (b._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 = function () {
      return (Ej = b._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 =
        b.asm.Ch).apply(null, arguments)
    }),
    Fj = (b._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 = function () {
      return (Fj = b._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 =
        b.asm.Dh).apply(null, arguments)
    }),
    Gj = (b._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 = function () {
      return (Gj = b._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 =
        b.asm.Eh).apply(null, arguments)
    }),
    Hj = (b._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 =
      function () {
        return (Hj = b._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 =
          b.asm.Fh).apply(null, arguments)
      }),
    Ij = (b._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 =
      function () {
        return (Ij = b._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 =
          b.asm.Gh).apply(null, arguments)
      }),
    Jj = (b._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 = function () {
      return (Jj = b._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 =
        b.asm.Hh).apply(null, arguments)
    }),
    Kj = (b._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 = function () {
      return (Kj = b._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 =
        b.asm.Ih).apply(null, arguments)
    }),
    Lj = (b._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 = function () {
      return (Lj = b._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 =
        b.asm.Jh).apply(null, arguments)
    }),
    Mj = (b._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 = function () {
      return (Mj = b._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 =
        b.asm.Kh).apply(null, arguments)
    }),
    Nj = (b._emscripten_bind_ClosestConvexResultCallback___destroy___0 = function () {
      return (Nj = b._emscripten_bind_ClosestConvexResultCallback___destroy___0 = b.asm.Lh).apply(
        null,
        arguments
      )
    }),
    Oj = (b._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 = function () {
      return (Oj = b._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 =
        b.asm.Mh).apply(null, arguments)
    }),
    Pj = (b._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 = function () {
      return (Pj = b._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 =
        b.asm.Nh).apply(null, arguments)
    }),
    Qj = (b._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 = function () {
      return (Qj = b._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 = b.asm.Oh).apply(
        null,
        arguments
      )
    }),
    Rj = (b._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = function () {
      return (Rj = b._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = b.asm.Ph).apply(
        null,
        arguments
      )
    }),
    Sj = (b._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 = function () {
      return (Sj = b._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 =
        b.asm.Qh).apply(null, arguments)
    }),
    Tj = (b._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 = function () {
      return (Tj = b._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 = b.asm.Rh).apply(
        null,
        arguments
      )
    }),
    Uj = (b._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = function () {
      return (Uj = b._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = b.asm.Sh).apply(
        null,
        arguments
      )
    }),
    Vj = (b._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = function () {
      return (Vj = b._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = b.asm.Th).apply(
        null,
        arguments
      )
    }),
    Wj = (b._emscripten_bind_btBoxShape_btBoxShape_1 = function () {
      return (Wj = b._emscripten_bind_btBoxShape_btBoxShape_1 = b.asm.Uh).apply(null, arguments)
    }),
    Xj = (b._emscripten_bind_btBoxShape_setMargin_1 = function () {
      return (Xj = b._emscripten_bind_btBoxShape_setMargin_1 = b.asm.Vh).apply(null, arguments)
    }),
    Yj = (b._emscripten_bind_btBoxShape_getMargin_0 = function () {
      return (Yj = b._emscripten_bind_btBoxShape_getMargin_0 = b.asm.Wh).apply(null, arguments)
    }),
    Zj = (b._emscripten_bind_btBoxShape_setLocalScaling_1 = function () {
      return (Zj = b._emscripten_bind_btBoxShape_setLocalScaling_1 = b.asm.Xh).apply(
        null,
        arguments
      )
    }),
    ak = (b._emscripten_bind_btBoxShape_getLocalScaling_0 = function () {
      return (ak = b._emscripten_bind_btBoxShape_getLocalScaling_0 = b.asm.Yh).apply(
        null,
        arguments
      )
    }),
    bk = (b._emscripten_bind_btBoxShape_calculateLocalInertia_2 = function () {
      return (bk = b._emscripten_bind_btBoxShape_calculateLocalInertia_2 = b.asm.Zh).apply(
        null,
        arguments
      )
    }),
    ck = (b._emscripten_bind_btBoxShape___destroy___0 = function () {
      return (ck = b._emscripten_bind_btBoxShape___destroy___0 = b.asm._h).apply(null, arguments)
    }),
    dk = (b._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 = function () {
      return (dk = b._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 = b.asm.$h).apply(
        null,
        arguments
      )
    }),
    ek = (b._emscripten_bind_btCapsuleShapeX_setMargin_1 = function () {
      return (ek = b._emscripten_bind_btCapsuleShapeX_setMargin_1 = b.asm.ai).apply(null, arguments)
    }),
    fk = (b._emscripten_bind_btCapsuleShapeX_getMargin_0 = function () {
      return (fk = b._emscripten_bind_btCapsuleShapeX_getMargin_0 = b.asm.bi).apply(null, arguments)
    }),
    gk = (b._emscripten_bind_btCapsuleShapeX_getUpAxis_0 = function () {
      return (gk = b._emscripten_bind_btCapsuleShapeX_getUpAxis_0 = b.asm.ci).apply(null, arguments)
    }),
    hk = (b._emscripten_bind_btCapsuleShapeX_getRadius_0 = function () {
      return (hk = b._emscripten_bind_btCapsuleShapeX_getRadius_0 = b.asm.di).apply(null, arguments)
    }),
    ik = (b._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = function () {
      return (ik = b._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = b.asm.ei).apply(
        null,
        arguments
      )
    }),
    jk = (b._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = function () {
      return (jk = b._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = b.asm.fi).apply(
        null,
        arguments
      )
    }),
    kk = (b._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 = function () {
      return (kk = b._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 = b.asm.gi).apply(
        null,
        arguments
      )
    }),
    lk = (b._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 = function () {
      return (lk = b._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 = b.asm.hi).apply(
        null,
        arguments
      )
    }),
    mk = (b._emscripten_bind_btCapsuleShapeX___destroy___0 = function () {
      return (mk = b._emscripten_bind_btCapsuleShapeX___destroy___0 = b.asm.ii).apply(
        null,
        arguments
      )
    }),
    nk = (b._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 = function () {
      return (nk = b._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 = b.asm.ji).apply(
        null,
        arguments
      )
    }),
    ok = (b._emscripten_bind_btCapsuleShapeZ_setMargin_1 = function () {
      return (ok = b._emscripten_bind_btCapsuleShapeZ_setMargin_1 = b.asm.ki).apply(null, arguments)
    }),
    pk = (b._emscripten_bind_btCapsuleShapeZ_getMargin_0 = function () {
      return (pk = b._emscripten_bind_btCapsuleShapeZ_getMargin_0 = b.asm.li).apply(null, arguments)
    }),
    qk = (b._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 = function () {
      return (qk = b._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 = b.asm.mi).apply(null, arguments)
    }),
    rk = (b._emscripten_bind_btCapsuleShapeZ_getRadius_0 = function () {
      return (rk = b._emscripten_bind_btCapsuleShapeZ_getRadius_0 = b.asm.ni).apply(null, arguments)
    }),
    sk = (b._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = function () {
      return (sk = b._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = b.asm.oi).apply(
        null,
        arguments
      )
    }),
    tk = (b._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = function () {
      return (tk = b._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = b.asm.pi).apply(
        null,
        arguments
      )
    }),
    uk = (b._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 = function () {
      return (uk = b._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 = b.asm.qi).apply(
        null,
        arguments
      )
    }),
    vk = (b._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 = function () {
      return (vk = b._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 = b.asm.ri).apply(
        null,
        arguments
      )
    }),
    wk = (b._emscripten_bind_btCapsuleShapeZ___destroy___0 = function () {
      return (wk = b._emscripten_bind_btCapsuleShapeZ___destroy___0 = b.asm.si).apply(
        null,
        arguments
      )
    }),
    xk = (b._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = function () {
      return (xk = b._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = b.asm.ti).apply(
        null,
        arguments
      )
    }),
    yk = (b._emscripten_bind_btCylinderShapeX_setMargin_1 = function () {
      return (yk = b._emscripten_bind_btCylinderShapeX_setMargin_1 = b.asm.ui).apply(
        null,
        arguments
      )
    }),
    zk = (b._emscripten_bind_btCylinderShapeX_getMargin_0 = function () {
      return (zk = b._emscripten_bind_btCylinderShapeX_getMargin_0 = b.asm.vi).apply(
        null,
        arguments
      )
    }),
    Ak = (b._emscripten_bind_btCylinderShapeX_setLocalScaling_1 = function () {
      return (Ak = b._emscripten_bind_btCylinderShapeX_setLocalScaling_1 = b.asm.wi).apply(
        null,
        arguments
      )
    }),
    Bk = (b._emscripten_bind_btCylinderShapeX_getLocalScaling_0 = function () {
      return (Bk = b._emscripten_bind_btCylinderShapeX_getLocalScaling_0 = b.asm.xi).apply(
        null,
        arguments
      )
    }),
    Ck = (b._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = function () {
      return (Ck = b._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = b.asm.yi).apply(
        null,
        arguments
      )
    }),
    Dk = (b._emscripten_bind_btCylinderShapeX___destroy___0 = function () {
      return (Dk = b._emscripten_bind_btCylinderShapeX___destroy___0 = b.asm.zi).apply(
        null,
        arguments
      )
    }),
    Ek = (b._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 = function () {
      return (Ek = b._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 = b.asm.Ai).apply(
        null,
        arguments
      )
    }),
    Fk = (b._emscripten_bind_btCylinderShapeZ_setMargin_1 = function () {
      return (Fk = b._emscripten_bind_btCylinderShapeZ_setMargin_1 = b.asm.Bi).apply(
        null,
        arguments
      )
    }),
    Gk = (b._emscripten_bind_btCylinderShapeZ_getMargin_0 = function () {
      return (Gk = b._emscripten_bind_btCylinderShapeZ_getMargin_0 = b.asm.Ci).apply(
        null,
        arguments
      )
    }),
    Hk = (b._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 = function () {
      return (Hk = b._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 = b.asm.Di).apply(
        null,
        arguments
      )
    }),
    Ik = (b._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 = function () {
      return (Ik = b._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 = b.asm.Ei).apply(
        null,
        arguments
      )
    }),
    Jk = (b._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = function () {
      return (Jk = b._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = b.asm.Fi).apply(
        null,
        arguments
      )
    }),
    Kk = (b._emscripten_bind_btCylinderShapeZ___destroy___0 = function () {
      return (Kk = b._emscripten_bind_btCylinderShapeZ___destroy___0 = b.asm.Gi).apply(
        null,
        arguments
      )
    }),
    Lk = (b._emscripten_bind_btSphereShape_btSphereShape_1 = function () {
      return (Lk = b._emscripten_bind_btSphereShape_btSphereShape_1 = b.asm.Hi).apply(
        null,
        arguments
      )
    }),
    Mk = (b._emscripten_bind_btSphereShape_setMargin_1 = function () {
      return (Mk = b._emscripten_bind_btSphereShape_setMargin_1 = b.asm.Ii).apply(null, arguments)
    }),
    Nk = (b._emscripten_bind_btSphereShape_getMargin_0 = function () {
      return (Nk = b._emscripten_bind_btSphereShape_getMargin_0 = b.asm.Ji).apply(null, arguments)
    }),
    Ok = (b._emscripten_bind_btSphereShape_setLocalScaling_1 = function () {
      return (Ok = b._emscripten_bind_btSphereShape_setLocalScaling_1 = b.asm.Ki).apply(
        null,
        arguments
      )
    }),
    Pk = (b._emscripten_bind_btSphereShape_getLocalScaling_0 = function () {
      return (Pk = b._emscripten_bind_btSphereShape_getLocalScaling_0 = b.asm.Li).apply(
        null,
        arguments
      )
    }),
    Qk = (b._emscripten_bind_btSphereShape_calculateLocalInertia_2 = function () {
      return (Qk = b._emscripten_bind_btSphereShape_calculateLocalInertia_2 = b.asm.Mi).apply(
        null,
        arguments
      )
    }),
    Rk = (b._emscripten_bind_btSphereShape___destroy___0 = function () {
      return (Rk = b._emscripten_bind_btSphereShape___destroy___0 = b.asm.Ni).apply(null, arguments)
    }),
    Sk = (b._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 = function () {
      return (Sk = b._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 = b.asm.Oi).apply(
        null,
        arguments
      )
    }),
    Tk = (b._emscripten_bind_btMultiSphereShape_setLocalScaling_1 = function () {
      return (Tk = b._emscripten_bind_btMultiSphereShape_setLocalScaling_1 = b.asm.Pi).apply(
        null,
        arguments
      )
    }),
    Uk = (b._emscripten_bind_btMultiSphereShape_getLocalScaling_0 = function () {
      return (Uk = b._emscripten_bind_btMultiSphereShape_getLocalScaling_0 = b.asm.Qi).apply(
        null,
        arguments
      )
    }),
    Vk = (b._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 = function () {
      return (Vk = b._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 = b.asm.Ri).apply(
        null,
        arguments
      )
    }),
    Wk = (b._emscripten_bind_btMultiSphereShape___destroy___0 = function () {
      return (Wk = b._emscripten_bind_btMultiSphereShape___destroy___0 = b.asm.Si).apply(
        null,
        arguments
      )
    }),
    Xk = (b._emscripten_bind_btConeShapeX_btConeShapeX_2 = function () {
      return (Xk = b._emscripten_bind_btConeShapeX_btConeShapeX_2 = b.asm.Ti).apply(null, arguments)
    }),
    Yk = (b._emscripten_bind_btConeShapeX_setLocalScaling_1 = function () {
      return (Yk = b._emscripten_bind_btConeShapeX_setLocalScaling_1 = b.asm.Ui).apply(
        null,
        arguments
      )
    }),
    Zk = (b._emscripten_bind_btConeShapeX_getLocalScaling_0 = function () {
      return (Zk = b._emscripten_bind_btConeShapeX_getLocalScaling_0 = b.asm.Vi).apply(
        null,
        arguments
      )
    }),
    $k = (b._emscripten_bind_btConeShapeX_calculateLocalInertia_2 = function () {
      return ($k = b._emscripten_bind_btConeShapeX_calculateLocalInertia_2 = b.asm.Wi).apply(
        null,
        arguments
      )
    }),
    al = (b._emscripten_bind_btConeShapeX___destroy___0 = function () {
      return (al = b._emscripten_bind_btConeShapeX___destroy___0 = b.asm.Xi).apply(null, arguments)
    }),
    bl = (b._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = function () {
      return (bl = b._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = b.asm.Yi).apply(null, arguments)
    }),
    cl = (b._emscripten_bind_btConeShapeZ_setLocalScaling_1 = function () {
      return (cl = b._emscripten_bind_btConeShapeZ_setLocalScaling_1 = b.asm.Zi).apply(
        null,
        arguments
      )
    }),
    dl = (b._emscripten_bind_btConeShapeZ_getLocalScaling_0 = function () {
      return (dl = b._emscripten_bind_btConeShapeZ_getLocalScaling_0 = b.asm._i).apply(
        null,
        arguments
      )
    }),
    el = (b._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = function () {
      return (el = b._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = b.asm.$i).apply(
        null,
        arguments
      )
    }),
    fl = (b._emscripten_bind_btConeShapeZ___destroy___0 = function () {
      return (fl = b._emscripten_bind_btConeShapeZ___destroy___0 = b.asm.aj).apply(null, arguments)
    }),
    gl = (b._emscripten_bind_btIntArray_size_0 = function () {
      return (gl = b._emscripten_bind_btIntArray_size_0 = b.asm.bj).apply(null, arguments)
    }),
    hl = (b._emscripten_bind_btIntArray_at_1 = function () {
      return (hl = b._emscripten_bind_btIntArray_at_1 = b.asm.cj).apply(null, arguments)
    }),
    il = (b._emscripten_bind_btIntArray___destroy___0 = function () {
      return (il = b._emscripten_bind_btIntArray___destroy___0 = b.asm.dj).apply(null, arguments)
    }),
    jl = (b._emscripten_bind_btFace_get_m_indices_0 = function () {
      return (jl = b._emscripten_bind_btFace_get_m_indices_0 = b.asm.ej).apply(null, arguments)
    }),
    kl = (b._emscripten_bind_btFace_set_m_indices_1 = function () {
      return (kl = b._emscripten_bind_btFace_set_m_indices_1 = b.asm.fj).apply(null, arguments)
    }),
    ll = (b._emscripten_bind_btFace_get_m_plane_1 = function () {
      return (ll = b._emscripten_bind_btFace_get_m_plane_1 = b.asm.gj).apply(null, arguments)
    }),
    ml = (b._emscripten_bind_btFace_set_m_plane_2 = function () {
      return (ml = b._emscripten_bind_btFace_set_m_plane_2 = b.asm.hj).apply(null, arguments)
    }),
    nl = (b._emscripten_bind_btFace___destroy___0 = function () {
      return (nl = b._emscripten_bind_btFace___destroy___0 = b.asm.ij).apply(null, arguments)
    }),
    ol = (b._emscripten_bind_btVector3Array_size_0 = function () {
      return (ol = b._emscripten_bind_btVector3Array_size_0 = b.asm.jj).apply(null, arguments)
    }),
    pl = (b._emscripten_bind_btVector3Array_at_1 = function () {
      return (pl = b._emscripten_bind_btVector3Array_at_1 = b.asm.kj).apply(null, arguments)
    }),
    ql = (b._emscripten_bind_btVector3Array___destroy___0 = function () {
      return (ql = b._emscripten_bind_btVector3Array___destroy___0 = b.asm.lj).apply(
        null,
        arguments
      )
    }),
    rl = (b._emscripten_bind_btFaceArray_size_0 = function () {
      return (rl = b._emscripten_bind_btFaceArray_size_0 = b.asm.mj).apply(null, arguments)
    }),
    sl = (b._emscripten_bind_btFaceArray_at_1 = function () {
      return (sl = b._emscripten_bind_btFaceArray_at_1 = b.asm.nj).apply(null, arguments)
    }),
    tl = (b._emscripten_bind_btFaceArray___destroy___0 = function () {
      return (tl = b._emscripten_bind_btFaceArray___destroy___0 = b.asm.oj).apply(null, arguments)
    }),
    ul = (b._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = function () {
      return (ul = b._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = b.asm.pj).apply(
        null,
        arguments
      )
    }),
    vl = (b._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 = function () {
      return (vl = b._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 = b.asm.qj).apply(
        null,
        arguments
      )
    }),
    wl = (b._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = function () {
      return (wl = b._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = b.asm.rj).apply(
        null,
        arguments
      )
    }),
    xl = (b._emscripten_bind_btConvexPolyhedron_set_m_faces_1 = function () {
      return (xl = b._emscripten_bind_btConvexPolyhedron_set_m_faces_1 = b.asm.sj).apply(
        null,
        arguments
      )
    }),
    yl = (b._emscripten_bind_btConvexPolyhedron___destroy___0 = function () {
      return (yl = b._emscripten_bind_btConvexPolyhedron___destroy___0 = b.asm.tj).apply(
        null,
        arguments
      )
    }),
    zl = (b._emscripten_bind_btConvexHullShape_btConvexHullShape_0 = function () {
      return (zl = b._emscripten_bind_btConvexHullShape_btConvexHullShape_0 = b.asm.uj).apply(
        null,
        arguments
      )
    }),
    Al = (b._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = function () {
      return (Al = b._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = b.asm.vj).apply(
        null,
        arguments
      )
    }),
    Bl = (b._emscripten_bind_btConvexHullShape_btConvexHullShape_2 = function () {
      return (Bl = b._emscripten_bind_btConvexHullShape_btConvexHullShape_2 = b.asm.wj).apply(
        null,
        arguments
      )
    }),
    Cl = (b._emscripten_bind_btConvexHullShape_addPoint_1 = function () {
      return (Cl = b._emscripten_bind_btConvexHullShape_addPoint_1 = b.asm.xj).apply(
        null,
        arguments
      )
    }),
    Dl = (b._emscripten_bind_btConvexHullShape_addPoint_2 = function () {
      return (Dl = b._emscripten_bind_btConvexHullShape_addPoint_2 = b.asm.yj).apply(
        null,
        arguments
      )
    }),
    El = (b._emscripten_bind_btConvexHullShape_setMargin_1 = function () {
      return (El = b._emscripten_bind_btConvexHullShape_setMargin_1 = b.asm.zj).apply(
        null,
        arguments
      )
    }),
    Fl = (b._emscripten_bind_btConvexHullShape_getMargin_0 = function () {
      return (Fl = b._emscripten_bind_btConvexHullShape_getMargin_0 = b.asm.Aj).apply(
        null,
        arguments
      )
    }),
    Gl = (b._emscripten_bind_btConvexHullShape_getNumVertices_0 = function () {
      return (Gl = b._emscripten_bind_btConvexHullShape_getNumVertices_0 = b.asm.Bj).apply(
        null,
        arguments
      )
    }),
    Hl = (b._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 = function () {
      return (Hl = b._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 =
        b.asm.Cj).apply(null, arguments)
    }),
    Il = (b._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = function () {
      return (Il = b._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = b.asm.Dj).apply(
        null,
        arguments
      )
    }),
    Jl = (b._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = function () {
      return (Jl = b._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = b.asm.Ej).apply(
        null,
        arguments
      )
    }),
    Kl = (b._emscripten_bind_btConvexHullShape_setLocalScaling_1 = function () {
      return (Kl = b._emscripten_bind_btConvexHullShape_setLocalScaling_1 = b.asm.Fj).apply(
        null,
        arguments
      )
    }),
    Ll = (b._emscripten_bind_btConvexHullShape_getLocalScaling_0 = function () {
      return (Ll = b._emscripten_bind_btConvexHullShape_getLocalScaling_0 = b.asm.Gj).apply(
        null,
        arguments
      )
    }),
    Ml = (b._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = function () {
      return (Ml = b._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = b.asm.Hj).apply(
        null,
        arguments
      )
    }),
    Nl = (b._emscripten_bind_btConvexHullShape___destroy___0 = function () {
      return (Nl = b._emscripten_bind_btConvexHullShape___destroy___0 = b.asm.Ij).apply(
        null,
        arguments
      )
    }),
    Ol = (b._emscripten_bind_btShapeHull_btShapeHull_1 = function () {
      return (Ol = b._emscripten_bind_btShapeHull_btShapeHull_1 = b.asm.Jj).apply(null, arguments)
    }),
    Pl = (b._emscripten_bind_btShapeHull_buildHull_1 = function () {
      return (Pl = b._emscripten_bind_btShapeHull_buildHull_1 = b.asm.Kj).apply(null, arguments)
    }),
    Ql = (b._emscripten_bind_btShapeHull_numVertices_0 = function () {
      return (Ql = b._emscripten_bind_btShapeHull_numVertices_0 = b.asm.Lj).apply(null, arguments)
    }),
    Rl = (b._emscripten_bind_btShapeHull_getVertexPointer_0 = function () {
      return (Rl = b._emscripten_bind_btShapeHull_getVertexPointer_0 = b.asm.Mj).apply(
        null,
        arguments
      )
    }),
    Sl = (b._emscripten_bind_btShapeHull___destroy___0 = function () {
      return (Sl = b._emscripten_bind_btShapeHull___destroy___0 = b.asm.Nj).apply(null, arguments)
    }),
    Tl = (b._emscripten_bind_btCompoundShape_btCompoundShape_0 = function () {
      return (Tl = b._emscripten_bind_btCompoundShape_btCompoundShape_0 = b.asm.Oj).apply(
        null,
        arguments
      )
    }),
    Ul = (b._emscripten_bind_btCompoundShape_btCompoundShape_1 = function () {
      return (Ul = b._emscripten_bind_btCompoundShape_btCompoundShape_1 = b.asm.Pj).apply(
        null,
        arguments
      )
    }),
    Vl = (b._emscripten_bind_btCompoundShape_addChildShape_2 = function () {
      return (Vl = b._emscripten_bind_btCompoundShape_addChildShape_2 = b.asm.Qj).apply(
        null,
        arguments
      )
    }),
    Wl = (b._emscripten_bind_btCompoundShape_removeChildShape_1 = function () {
      return (Wl = b._emscripten_bind_btCompoundShape_removeChildShape_1 = b.asm.Rj).apply(
        null,
        arguments
      )
    }),
    Xl = (b._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 = function () {
      return (Xl = b._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 = b.asm.Sj).apply(
        null,
        arguments
      )
    }),
    Yl = (b._emscripten_bind_btCompoundShape_getNumChildShapes_0 = function () {
      return (Yl = b._emscripten_bind_btCompoundShape_getNumChildShapes_0 = b.asm.Tj).apply(
        null,
        arguments
      )
    }),
    Zl = (b._emscripten_bind_btCompoundShape_getChildShape_1 = function () {
      return (Zl = b._emscripten_bind_btCompoundShape_getChildShape_1 = b.asm.Uj).apply(
        null,
        arguments
      )
    }),
    $l = (b._emscripten_bind_btCompoundShape_updateChildTransform_2 = function () {
      return ($l = b._emscripten_bind_btCompoundShape_updateChildTransform_2 = b.asm.Vj).apply(
        null,
        arguments
      )
    }),
    am = (b._emscripten_bind_btCompoundShape_updateChildTransform_3 = function () {
      return (am = b._emscripten_bind_btCompoundShape_updateChildTransform_3 = b.asm.Wj).apply(
        null,
        arguments
      )
    }),
    bm = (b._emscripten_bind_btCompoundShape_setMargin_1 = function () {
      return (bm = b._emscripten_bind_btCompoundShape_setMargin_1 = b.asm.Xj).apply(null, arguments)
    }),
    cm = (b._emscripten_bind_btCompoundShape_getMargin_0 = function () {
      return (cm = b._emscripten_bind_btCompoundShape_getMargin_0 = b.asm.Yj).apply(null, arguments)
    }),
    dm = (b._emscripten_bind_btCompoundShape_setLocalScaling_1 = function () {
      return (dm = b._emscripten_bind_btCompoundShape_setLocalScaling_1 = b.asm.Zj).apply(
        null,
        arguments
      )
    }),
    em = (b._emscripten_bind_btCompoundShape_getLocalScaling_0 = function () {
      return (em = b._emscripten_bind_btCompoundShape_getLocalScaling_0 = b.asm._j).apply(
        null,
        arguments
      )
    }),
    fm = (b._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = function () {
      return (fm = b._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = b.asm.$j).apply(
        null,
        arguments
      )
    }),
    gm = (b._emscripten_bind_btCompoundShape___destroy___0 = function () {
      return (gm = b._emscripten_bind_btCompoundShape___destroy___0 = b.asm.ak).apply(
        null,
        arguments
      )
    }),
    hm = (b._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 = function () {
      return (hm = b._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 = b.asm.bk).apply(
        null,
        arguments
      )
    }),
    im = (b._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 = function () {
      return (im = b._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 = b.asm.ck).apply(
        null,
        arguments
      )
    }),
    jm = (b._emscripten_bind_btIndexedMesh___destroy___0 = function () {
      return (jm = b._emscripten_bind_btIndexedMesh___destroy___0 = b.asm.dk).apply(null, arguments)
    }),
    km = (b._emscripten_bind_btIndexedMeshArray_size_0 = function () {
      return (km = b._emscripten_bind_btIndexedMeshArray_size_0 = b.asm.ek).apply(null, arguments)
    }),
    lm = (b._emscripten_bind_btIndexedMeshArray_at_1 = function () {
      return (lm = b._emscripten_bind_btIndexedMeshArray_at_1 = b.asm.fk).apply(null, arguments)
    }),
    mm = (b._emscripten_bind_btIndexedMeshArray___destroy___0 = function () {
      return (mm = b._emscripten_bind_btIndexedMeshArray___destroy___0 = b.asm.gk).apply(
        null,
        arguments
      )
    }),
    nm = (b._emscripten_bind_btTriangleMesh_btTriangleMesh_0 = function () {
      return (nm = b._emscripten_bind_btTriangleMesh_btTriangleMesh_0 = b.asm.hk).apply(
        null,
        arguments
      )
    }),
    om = (b._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = function () {
      return (om = b._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = b.asm.ik).apply(
        null,
        arguments
      )
    }),
    pm = (b._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = function () {
      return (pm = b._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = b.asm.jk).apply(
        null,
        arguments
      )
    }),
    qm = (b._emscripten_bind_btTriangleMesh_addTriangle_3 = function () {
      return (qm = b._emscripten_bind_btTriangleMesh_addTriangle_3 = b.asm.kk).apply(
        null,
        arguments
      )
    }),
    rm = (b._emscripten_bind_btTriangleMesh_addTriangle_4 = function () {
      return (rm = b._emscripten_bind_btTriangleMesh_addTriangle_4 = b.asm.lk).apply(
        null,
        arguments
      )
    }),
    sm = (b._emscripten_bind_btTriangleMesh_findOrAddVertex_2 = function () {
      return (sm = b._emscripten_bind_btTriangleMesh_findOrAddVertex_2 = b.asm.mk).apply(
        null,
        arguments
      )
    }),
    tm = (b._emscripten_bind_btTriangleMesh_addIndex_1 = function () {
      return (tm = b._emscripten_bind_btTriangleMesh_addIndex_1 = b.asm.nk).apply(null, arguments)
    }),
    um = (b._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 = function () {
      return (um = b._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 = b.asm.ok).apply(
        null,
        arguments
      )
    }),
    wm = (b._emscripten_bind_btTriangleMesh_setScaling_1 = function () {
      return (wm = b._emscripten_bind_btTriangleMesh_setScaling_1 = b.asm.pk).apply(null, arguments)
    }),
    xm = (b._emscripten_bind_btTriangleMesh___destroy___0 = function () {
      return (xm = b._emscripten_bind_btTriangleMesh___destroy___0 = b.asm.qk).apply(
        null,
        arguments
      )
    }),
    ym = (b._emscripten_bind_btEmptyShape_btEmptyShape_0 = function () {
      return (ym = b._emscripten_bind_btEmptyShape_btEmptyShape_0 = b.asm.rk).apply(null, arguments)
    }),
    zm = (b._emscripten_bind_btEmptyShape_setLocalScaling_1 = function () {
      return (zm = b._emscripten_bind_btEmptyShape_setLocalScaling_1 = b.asm.sk).apply(
        null,
        arguments
      )
    }),
    Am = (b._emscripten_bind_btEmptyShape_getLocalScaling_0 = function () {
      return (Am = b._emscripten_bind_btEmptyShape_getLocalScaling_0 = b.asm.tk).apply(
        null,
        arguments
      )
    }),
    Bm = (b._emscripten_bind_btEmptyShape_calculateLocalInertia_2 = function () {
      return (Bm = b._emscripten_bind_btEmptyShape_calculateLocalInertia_2 = b.asm.uk).apply(
        null,
        arguments
      )
    }),
    Cm = (b._emscripten_bind_btEmptyShape___destroy___0 = function () {
      return (Cm = b._emscripten_bind_btEmptyShape___destroy___0 = b.asm.vk).apply(null, arguments)
    }),
    Dm = (b._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = function () {
      return (Dm = b._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = b.asm.wk).apply(
        null,
        arguments
      )
    }),
    Em = (b._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 = function () {
      return (Em = b._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 = b.asm.xk).apply(
        null,
        arguments
      )
    }),
    Fm = (b._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = function () {
      return (Fm = b._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = b.asm.yk).apply(
        null,
        arguments
      )
    }),
    Gm = (b._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 = function () {
      return (Gm = b._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 = b.asm.zk).apply(
        null,
        arguments
      )
    }),
    Hm = (b._emscripten_bind_btStaticPlaneShape___destroy___0 = function () {
      return (Hm = b._emscripten_bind_btStaticPlaneShape___destroy___0 = b.asm.Ak).apply(
        null,
        arguments
      )
    }),
    Im = (b._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 = function () {
      return (Im = b._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 =
        b.asm.Bk).apply(null, arguments)
    }),
    Jm = (b._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 = function () {
      return (Jm = b._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 =
        b.asm.Ck).apply(null, arguments)
    }),
    Km = (b._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 = function () {
      return (Km = b._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 = b.asm.Dk).apply(
        null,
        arguments
      )
    }),
    Lm = (b._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = function () {
      return (Lm = b._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = b.asm.Ek).apply(
        null,
        arguments
      )
    }),
    Mm = (b._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 = function () {
      return (Mm = b._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 =
        b.asm.Fk).apply(null, arguments)
    }),
    Nm = (b._emscripten_bind_btBvhTriangleMeshShape___destroy___0 = function () {
      return (Nm = b._emscripten_bind_btBvhTriangleMeshShape___destroy___0 = b.asm.Gk).apply(
        null,
        arguments
      )
    }),
    Om = (b._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 = function () {
      return (Om = b._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 =
        b.asm.Hk).apply(null, arguments)
    }),
    Pm = (b._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = function () {
      return (Pm = b._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = b.asm.Ik).apply(
        null,
        arguments
      )
    }),
    Qm = (b._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 = function () {
      return (Qm = b._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 = b.asm.Jk).apply(
        null,
        arguments
      )
    }),
    Rm = (b._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = function () {
      return (Rm = b._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = b.asm.Kk).apply(
        null,
        arguments
      )
    }),
    Sm = (b._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = function () {
      return (Sm = b._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = b.asm.Lk).apply(
        null,
        arguments
      )
    }),
    Tm = (b._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 = function () {
      return (Tm = b._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 =
        b.asm.Mk).apply(null, arguments)
    }),
    Um = (b._emscripten_bind_btHeightfieldTerrainShape___destroy___0 = function () {
      return (Um = b._emscripten_bind_btHeightfieldTerrainShape___destroy___0 = b.asm.Nk).apply(
        null,
        arguments
      )
    }),
    Vm =
      (b._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 =
        function () {
          return (Vm =
            b._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 =
              b.asm.Ok).apply(null, arguments)
        }),
    Wm = (b._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 = function () {
      return (Wm = b._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 =
        b.asm.Pk).apply(null, arguments)
    }),
    Xm = (b._emscripten_bind_btPersistentManifold_btPersistentManifold_0 = function () {
      return (Xm = b._emscripten_bind_btPersistentManifold_btPersistentManifold_0 = b.asm.Qk).apply(
        null,
        arguments
      )
    }),
    Ym = (b._emscripten_bind_btPersistentManifold_getBody0_0 = function () {
      return (Ym = b._emscripten_bind_btPersistentManifold_getBody0_0 = b.asm.Rk).apply(
        null,
        arguments
      )
    }),
    Zm = (b._emscripten_bind_btPersistentManifold_getBody1_0 = function () {
      return (Zm = b._emscripten_bind_btPersistentManifold_getBody1_0 = b.asm.Sk).apply(
        null,
        arguments
      )
    }),
    $m = (b._emscripten_bind_btPersistentManifold_getNumContacts_0 = function () {
      return ($m = b._emscripten_bind_btPersistentManifold_getNumContacts_0 = b.asm.Tk).apply(
        null,
        arguments
      )
    }),
    an = (b._emscripten_bind_btPersistentManifold_getContactPoint_1 = function () {
      return (an = b._emscripten_bind_btPersistentManifold_getContactPoint_1 = b.asm.Uk).apply(
        null,
        arguments
      )
    }),
    bn = (b._emscripten_bind_btPersistentManifold___destroy___0 = function () {
      return (bn = b._emscripten_bind_btPersistentManifold___destroy___0 = b.asm.Vk).apply(
        null,
        arguments
      )
    }),
    cn = (b._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 = function () {
      return (cn = b._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 =
        b.asm.Wk).apply(null, arguments)
    }),
    dn = (b._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 = function () {
      return (dn = b._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 = b.asm.Xk).apply(
        null,
        arguments
      )
    }),
    en = (b._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 = function () {
      return (en = b._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 =
        b.asm.Yk).apply(null, arguments)
    }),
    fn = (b._emscripten_bind_btCollisionDispatcher___destroy___0 = function () {
      return (fn = b._emscripten_bind_btCollisionDispatcher___destroy___0 = b.asm.Zk).apply(
        null,
        arguments
      )
    }),
    gn = (b._emscripten_bind_btOverlappingPairCallback___destroy___0 = function () {
      return (gn = b._emscripten_bind_btOverlappingPairCallback___destroy___0 = b.asm._k).apply(
        null,
        arguments
      )
    }),
    hn = (b._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 = function () {
      return (hn = b._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 =
        b.asm.$k).apply(null, arguments)
    }),
    jn = (b._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 = function () {
      return (jn = b._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 =
        b.asm.al).apply(null, arguments)
    }),
    kn = (b._emscripten_bind_btOverlappingPairCache___destroy___0 = function () {
      return (kn = b._emscripten_bind_btOverlappingPairCache___destroy___0 = b.asm.bl).apply(
        null,
        arguments
      )
    }),
    ln = (b._emscripten_bind_btAxisSweep3_btAxisSweep3_2 = function () {
      return (ln = b._emscripten_bind_btAxisSweep3_btAxisSweep3_2 = b.asm.cl).apply(null, arguments)
    }),
    mn = (b._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = function () {
      return (mn = b._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = b.asm.dl).apply(null, arguments)
    }),
    nn = (b._emscripten_bind_btAxisSweep3_btAxisSweep3_4 = function () {
      return (nn = b._emscripten_bind_btAxisSweep3_btAxisSweep3_4 = b.asm.el).apply(null, arguments)
    }),
    on = (b._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = function () {
      return (on = b._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = b.asm.fl).apply(null, arguments)
    }),
    pn = (b._emscripten_bind_btAxisSweep3___destroy___0 = function () {
      return (pn = b._emscripten_bind_btAxisSweep3___destroy___0 = b.asm.gl).apply(null, arguments)
    }),
    qn = (b._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 = function () {
      return (qn = b._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 =
        b.asm.hl).apply(null, arguments)
    }),
    rn = (b._emscripten_bind_btBroadphaseInterface___destroy___0 = function () {
      return (rn = b._emscripten_bind_btBroadphaseInterface___destroy___0 = b.asm.il).apply(
        null,
        arguments
      )
    }),
    sn = (b._emscripten_bind_btCollisionConfiguration___destroy___0 = function () {
      return (sn = b._emscripten_bind_btCollisionConfiguration___destroy___0 = b.asm.jl).apply(
        null,
        arguments
      )
    }),
    tn = (b._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 = function () {
      return (tn = b._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 = b.asm.kl).apply(
        null,
        arguments
      )
    }),
    un = (b._emscripten_bind_btDbvtBroadphase___destroy___0 = function () {
      return (un = b._emscripten_bind_btDbvtBroadphase___destroy___0 = b.asm.ll).apply(
        null,
        arguments
      )
    }),
    vn = (b._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 = function () {
      return (vn = b._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 =
        b.asm.ml).apply(null, arguments)
    }),
    wn = (b._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 = function () {
      return (wn = b._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 =
        b.asm.nl).apply(null, arguments)
    }),
    xn = (b._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 = function () {
      return (xn = b._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 =
        b.asm.ol).apply(null, arguments)
    }),
    yn = (b._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 = function () {
      return (yn = b._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 =
        b.asm.pl).apply(null, arguments)
    }),
    zn = (b._emscripten_bind_btBroadphaseProxy___destroy___0 = function () {
      return (zn = b._emscripten_bind_btBroadphaseProxy___destroy___0 = b.asm.ql).apply(
        null,
        arguments
      )
    }),
    An = (b._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 =
      function () {
        return (An = b._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 =
          b.asm.rl).apply(null, arguments)
      }),
    Bn = (b._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 =
      function () {
        return (Bn = b._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 =
          b.asm.sl).apply(null, arguments)
      }),
    Cn = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 = function () {
      return (Cn = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 =
        b.asm.tl).apply(null, arguments)
    }),
    Dn = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 = function () {
      return (Dn = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 =
        b.asm.ul).apply(null, arguments)
    }),
    En = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 = function () {
      return (En = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 =
        b.asm.vl).apply(null, arguments)
    }),
    Fn = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 = function () {
      return (Fn = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 =
        b.asm.wl).apply(null, arguments)
    }),
    Gn = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 = function () {
      return (Gn = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 =
        b.asm.xl).apply(null, arguments)
    }),
    Hn = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 = function () {
      return (Hn = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 =
        b.asm.yl).apply(null, arguments)
    }),
    In = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 = function () {
      return (In = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 =
        b.asm.zl).apply(null, arguments)
    }),
    Jn = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 = function () {
      return (Jn = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 =
        b.asm.Al).apply(null, arguments)
    }),
    Kn = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 = function () {
      return (Kn = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 =
        b.asm.Bl).apply(null, arguments)
    }),
    Ln = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 = function () {
      return (Ln = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 =
        b.asm.Cl).apply(null, arguments)
    }),
    Mn = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 =
      function () {
        return (Mn =
          b._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 =
            b.asm.Dl).apply(null, arguments)
      }),
    Nn = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 =
      function () {
        return (Nn =
          b._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 =
            b.asm.El).apply(null, arguments)
      }),
    On = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 =
      function () {
        return (On =
          b._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 =
            b.asm.Fl).apply(null, arguments)
      }),
    Pn = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 =
      function () {
        return (Pn =
          b._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 =
            b.asm.Gl).apply(null, arguments)
      }),
    Qn = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 = function () {
      return (Qn = b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 =
        b.asm.Hl).apply(null, arguments)
    }),
    Rn = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 = function () {
      return (Rn = b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 =
        b.asm.Il).apply(null, arguments)
    }),
    Sn = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 =
      function () {
        return (Sn =
          b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 =
            b.asm.Jl).apply(null, arguments)
      }),
    Tn = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 =
      function () {
        return (Tn =
          b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 =
            b.asm.Kl).apply(null, arguments)
      }),
    Un =
      (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 =
        function () {
          return (Un =
            b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 =
              b.asm.Ll).apply(null, arguments)
        }),
    Vn =
      (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 =
        function () {
          return (Vn =
            b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 =
              b.asm.Ml).apply(null, arguments)
        }),
    Wn =
      (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 =
        function () {
          return (Wn =
            b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 =
              b.asm.Nl).apply(null, arguments)
        }),
    Xn =
      (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 =
        function () {
          return (Xn =
            b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 =
              b.asm.Ol).apply(null, arguments)
        }),
    Yn = (b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 =
      function () {
        return (Yn =
          b._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 =
            b.asm.Pl).apply(null, arguments)
      }),
    Zn = (b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 =
      function () {
        return (Zn =
          b._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 =
            b.asm.Ql).apply(null, arguments)
      }),
    $n = (b._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = function () {
      return ($n = b._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = b.asm.Rl).apply(
        null,
        arguments
      )
    }),
    ao = (b._emscripten_bind_btRigidBody_btRigidBody_1 = function () {
      return (ao = b._emscripten_bind_btRigidBody_btRigidBody_1 = b.asm.Sl).apply(null, arguments)
    }),
    bo = (b._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = function () {
      return (bo = b._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = b.asm.Tl).apply(
        null,
        arguments
      )
    }),
    co = (b._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = function () {
      return (co = b._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = b.asm.Ul).apply(
        null,
        arguments
      )
    }),
    eo = (b._emscripten_bind_btRigidBody_setSleepingThresholds_2 = function () {
      return (eo = b._emscripten_bind_btRigidBody_setSleepingThresholds_2 = b.asm.Vl).apply(
        null,
        arguments
      )
    }),
    fo = (b._emscripten_bind_btRigidBody_getLinearDamping_0 = function () {
      return (fo = b._emscripten_bind_btRigidBody_getLinearDamping_0 = b.asm.Wl).apply(
        null,
        arguments
      )
    }),
    go = (b._emscripten_bind_btRigidBody_getAngularDamping_0 = function () {
      return (go = b._emscripten_bind_btRigidBody_getAngularDamping_0 = b.asm.Xl).apply(
        null,
        arguments
      )
    }),
    ho = (b._emscripten_bind_btRigidBody_setDamping_2 = function () {
      return (ho = b._emscripten_bind_btRigidBody_setDamping_2 = b.asm.Yl).apply(null, arguments)
    }),
    io = (b._emscripten_bind_btRigidBody_setMassProps_2 = function () {
      return (io = b._emscripten_bind_btRigidBody_setMassProps_2 = b.asm.Zl).apply(null, arguments)
    }),
    jo = (b._emscripten_bind_btRigidBody_getLinearFactor_0 = function () {
      return (jo = b._emscripten_bind_btRigidBody_getLinearFactor_0 = b.asm._l).apply(
        null,
        arguments
      )
    }),
    ko = (b._emscripten_bind_btRigidBody_setLinearFactor_1 = function () {
      return (ko = b._emscripten_bind_btRigidBody_setLinearFactor_1 = b.asm.$l).apply(
        null,
        arguments
      )
    }),
    lo = (b._emscripten_bind_btRigidBody_applyTorque_1 = function () {
      return (lo = b._emscripten_bind_btRigidBody_applyTorque_1 = b.asm.am).apply(null, arguments)
    }),
    mo = (b._emscripten_bind_btRigidBody_applyLocalTorque_1 = function () {
      return (mo = b._emscripten_bind_btRigidBody_applyLocalTorque_1 = b.asm.bm).apply(
        null,
        arguments
      )
    }),
    no = (b._emscripten_bind_btRigidBody_applyForce_2 = function () {
      return (no = b._emscripten_bind_btRigidBody_applyForce_2 = b.asm.cm).apply(null, arguments)
    }),
    oo = (b._emscripten_bind_btRigidBody_applyCentralForce_1 = function () {
      return (oo = b._emscripten_bind_btRigidBody_applyCentralForce_1 = b.asm.dm).apply(
        null,
        arguments
      )
    }),
    po = (b._emscripten_bind_btRigidBody_applyCentralLocalForce_1 = function () {
      return (po = b._emscripten_bind_btRigidBody_applyCentralLocalForce_1 = b.asm.em).apply(
        null,
        arguments
      )
    }),
    qo = (b._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = function () {
      return (qo = b._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = b.asm.fm).apply(
        null,
        arguments
      )
    }),
    ro = (b._emscripten_bind_btRigidBody_applyImpulse_2 = function () {
      return (ro = b._emscripten_bind_btRigidBody_applyImpulse_2 = b.asm.gm).apply(null, arguments)
    }),
    so = (b._emscripten_bind_btRigidBody_applyCentralImpulse_1 = function () {
      return (so = b._emscripten_bind_btRigidBody_applyCentralImpulse_1 = b.asm.hm).apply(
        null,
        arguments
      )
    }),
    to = (b._emscripten_bind_btRigidBody_updateInertiaTensor_0 = function () {
      return (to = b._emscripten_bind_btRigidBody_updateInertiaTensor_0 = b.asm.im).apply(
        null,
        arguments
      )
    }),
    uo = (b._emscripten_bind_btRigidBody_getLinearVelocity_0 = function () {
      return (uo = b._emscripten_bind_btRigidBody_getLinearVelocity_0 = b.asm.jm).apply(
        null,
        arguments
      )
    }),
    vo = (b._emscripten_bind_btRigidBody_getAngularVelocity_0 = function () {
      return (vo = b._emscripten_bind_btRigidBody_getAngularVelocity_0 = b.asm.km).apply(
        null,
        arguments
      )
    }),
    wo = (b._emscripten_bind_btRigidBody_setLinearVelocity_1 = function () {
      return (wo = b._emscripten_bind_btRigidBody_setLinearVelocity_1 = b.asm.lm).apply(
        null,
        arguments
      )
    }),
    xo = (b._emscripten_bind_btRigidBody_setAngularVelocity_1 = function () {
      return (xo = b._emscripten_bind_btRigidBody_setAngularVelocity_1 = b.asm.mm).apply(
        null,
        arguments
      )
    }),
    yo = (b._emscripten_bind_btRigidBody_getMotionState_0 = function () {
      return (yo = b._emscripten_bind_btRigidBody_getMotionState_0 = b.asm.nm).apply(
        null,
        arguments
      )
    }),
    zo = (b._emscripten_bind_btRigidBody_setMotionState_1 = function () {
      return (zo = b._emscripten_bind_btRigidBody_setMotionState_1 = b.asm.om).apply(
        null,
        arguments
      )
    }),
    Ao = (b._emscripten_bind_btRigidBody_getAngularFactor_0 = function () {
      return (Ao = b._emscripten_bind_btRigidBody_getAngularFactor_0 = b.asm.pm).apply(
        null,
        arguments
      )
    }),
    Bo = (b._emscripten_bind_btRigidBody_setAngularFactor_1 = function () {
      return (Bo = b._emscripten_bind_btRigidBody_setAngularFactor_1 = b.asm.qm).apply(
        null,
        arguments
      )
    }),
    Co = (b._emscripten_bind_btRigidBody_upcast_1 = function () {
      return (Co = b._emscripten_bind_btRigidBody_upcast_1 = b.asm.rm).apply(null, arguments)
    }),
    Do = (b._emscripten_bind_btRigidBody_getAabb_2 = function () {
      return (Do = b._emscripten_bind_btRigidBody_getAabb_2 = b.asm.sm).apply(null, arguments)
    }),
    Eo = (b._emscripten_bind_btRigidBody_applyGravity_0 = function () {
      return (Eo = b._emscripten_bind_btRigidBody_applyGravity_0 = b.asm.tm).apply(null, arguments)
    }),
    Fo = (b._emscripten_bind_btRigidBody_getGravity_0 = function () {
      return (Fo = b._emscripten_bind_btRigidBody_getGravity_0 = b.asm.um).apply(null, arguments)
    }),
    Go = (b._emscripten_bind_btRigidBody_setGravity_1 = function () {
      return (Go = b._emscripten_bind_btRigidBody_setGravity_1 = b.asm.vm).apply(null, arguments)
    }),
    Ho = (b._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = function () {
      return (Ho = b._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = b.asm.wm).apply(
        null,
        arguments
      )
    }),
    Io = (b._emscripten_bind_btRigidBody_clearForces_0 = function () {
      return (Io = b._emscripten_bind_btRigidBody_clearForces_0 = b.asm.xm).apply(null, arguments)
    }),
    Jo = (b._emscripten_bind_btRigidBody_setAnisotropicFriction_2 = function () {
      return (Jo = b._emscripten_bind_btRigidBody_setAnisotropicFriction_2 = b.asm.ym).apply(
        null,
        arguments
      )
    }),
    Ko = (b._emscripten_bind_btRigidBody_getCollisionShape_0 = function () {
      return (Ko = b._emscripten_bind_btRigidBody_getCollisionShape_0 = b.asm.zm).apply(
        null,
        arguments
      )
    }),
    Lo = (b._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 = function () {
      return (Lo = b._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 = b.asm.Am).apply(
        null,
        arguments
      )
    }),
    Mo = (b._emscripten_bind_btRigidBody_setActivationState_1 = function () {
      return (Mo = b._emscripten_bind_btRigidBody_setActivationState_1 = b.asm.Bm).apply(
        null,
        arguments
      )
    }),
    No = (b._emscripten_bind_btRigidBody_forceActivationState_1 = function () {
      return (No = b._emscripten_bind_btRigidBody_forceActivationState_1 = b.asm.Cm).apply(
        null,
        arguments
      )
    }),
    Oo = (b._emscripten_bind_btRigidBody_activate_0 = function () {
      return (Oo = b._emscripten_bind_btRigidBody_activate_0 = b.asm.Dm).apply(null, arguments)
    }),
    Po = (b._emscripten_bind_btRigidBody_activate_1 = function () {
      return (Po = b._emscripten_bind_btRigidBody_activate_1 = b.asm.Em).apply(null, arguments)
    }),
    Qo = (b._emscripten_bind_btRigidBody_isActive_0 = function () {
      return (Qo = b._emscripten_bind_btRigidBody_isActive_0 = b.asm.Fm).apply(null, arguments)
    }),
    Ro = (b._emscripten_bind_btRigidBody_isKinematicObject_0 = function () {
      return (Ro = b._emscripten_bind_btRigidBody_isKinematicObject_0 = b.asm.Gm).apply(
        null,
        arguments
      )
    }),
    So = (b._emscripten_bind_btRigidBody_isStaticObject_0 = function () {
      return (So = b._emscripten_bind_btRigidBody_isStaticObject_0 = b.asm.Hm).apply(
        null,
        arguments
      )
    }),
    To = (b._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 = function () {
      return (To = b._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 = b.asm.Im).apply(
        null,
        arguments
      )
    }),
    Uo = (b._emscripten_bind_btRigidBody_getRestitution_0 = function () {
      return (Uo = b._emscripten_bind_btRigidBody_getRestitution_0 = b.asm.Jm).apply(
        null,
        arguments
      )
    }),
    Vo = (b._emscripten_bind_btRigidBody_getFriction_0 = function () {
      return (Vo = b._emscripten_bind_btRigidBody_getFriction_0 = b.asm.Km).apply(null, arguments)
    }),
    Wo = (b._emscripten_bind_btRigidBody_getRollingFriction_0 = function () {
      return (Wo = b._emscripten_bind_btRigidBody_getRollingFriction_0 = b.asm.Lm).apply(
        null,
        arguments
      )
    }),
    Xo = (b._emscripten_bind_btRigidBody_setRestitution_1 = function () {
      return (Xo = b._emscripten_bind_btRigidBody_setRestitution_1 = b.asm.Mm).apply(
        null,
        arguments
      )
    }),
    Yo = (b._emscripten_bind_btRigidBody_setFriction_1 = function () {
      return (Yo = b._emscripten_bind_btRigidBody_setFriction_1 = b.asm.Nm).apply(null, arguments)
    }),
    Zo = (b._emscripten_bind_btRigidBody_setRollingFriction_1 = function () {
      return (Zo = b._emscripten_bind_btRigidBody_setRollingFriction_1 = b.asm.Om).apply(
        null,
        arguments
      )
    }),
    $o = (b._emscripten_bind_btRigidBody_getWorldTransform_0 = function () {
      return ($o = b._emscripten_bind_btRigidBody_getWorldTransform_0 = b.asm.Pm).apply(
        null,
        arguments
      )
    }),
    ap = (b._emscripten_bind_btRigidBody_getCollisionFlags_0 = function () {
      return (ap = b._emscripten_bind_btRigidBody_getCollisionFlags_0 = b.asm.Qm).apply(
        null,
        arguments
      )
    }),
    bp = (b._emscripten_bind_btRigidBody_setCollisionFlags_1 = function () {
      return (bp = b._emscripten_bind_btRigidBody_setCollisionFlags_1 = b.asm.Rm).apply(
        null,
        arguments
      )
    }),
    cp = (b._emscripten_bind_btRigidBody_setWorldTransform_1 = function () {
      return (cp = b._emscripten_bind_btRigidBody_setWorldTransform_1 = b.asm.Sm).apply(
        null,
        arguments
      )
    }),
    dp = (b._emscripten_bind_btRigidBody_setCollisionShape_1 = function () {
      return (dp = b._emscripten_bind_btRigidBody_setCollisionShape_1 = b.asm.Tm).apply(
        null,
        arguments
      )
    }),
    ep = (b._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = function () {
      return (ep = b._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = b.asm.Um).apply(
        null,
        arguments
      )
    }),
    fp = (b._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = function () {
      return (fp = b._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = b.asm.Vm).apply(
        null,
        arguments
      )
    }),
    gp = (b._emscripten_bind_btRigidBody_getUserIndex_0 = function () {
      return (gp = b._emscripten_bind_btRigidBody_getUserIndex_0 = b.asm.Wm).apply(null, arguments)
    }),
    hp = (b._emscripten_bind_btRigidBody_setUserIndex_1 = function () {
      return (hp = b._emscripten_bind_btRigidBody_setUserIndex_1 = b.asm.Xm).apply(null, arguments)
    }),
    ip = (b._emscripten_bind_btRigidBody_getUserPointer_0 = function () {
      return (ip = b._emscripten_bind_btRigidBody_getUserPointer_0 = b.asm.Ym).apply(
        null,
        arguments
      )
    }),
    jp = (b._emscripten_bind_btRigidBody_setUserPointer_1 = function () {
      return (jp = b._emscripten_bind_btRigidBody_setUserPointer_1 = b.asm.Zm).apply(
        null,
        arguments
      )
    }),
    kp = (b._emscripten_bind_btRigidBody_getBroadphaseHandle_0 = function () {
      return (kp = b._emscripten_bind_btRigidBody_getBroadphaseHandle_0 = b.asm._m).apply(
        null,
        arguments
      )
    }),
    lp = (b._emscripten_bind_btRigidBody___destroy___0 = function () {
      return (lp = b._emscripten_bind_btRigidBody___destroy___0 = b.asm.$m).apply(null, arguments)
    }),
    mp = (b._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = function () {
      return (mp = b._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = b.asm.an).apply(
        null,
        arguments
      )
    }),
    np = (b._emscripten_bind_btConstraintSetting_get_m_tau_0 = function () {
      return (np = b._emscripten_bind_btConstraintSetting_get_m_tau_0 = b.asm.bn).apply(
        null,
        arguments
      )
    }),
    op = (b._emscripten_bind_btConstraintSetting_set_m_tau_1 = function () {
      return (op = b._emscripten_bind_btConstraintSetting_set_m_tau_1 = b.asm.cn).apply(
        null,
        arguments
      )
    }),
    pp = (b._emscripten_bind_btConstraintSetting_get_m_damping_0 = function () {
      return (pp = b._emscripten_bind_btConstraintSetting_get_m_damping_0 = b.asm.dn).apply(
        null,
        arguments
      )
    }),
    qp = (b._emscripten_bind_btConstraintSetting_set_m_damping_1 = function () {
      return (qp = b._emscripten_bind_btConstraintSetting_set_m_damping_1 = b.asm.en).apply(
        null,
        arguments
      )
    }),
    rp = (b._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = function () {
      return (rp = b._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = b.asm.fn).apply(
        null,
        arguments
      )
    }),
    sp = (b._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = function () {
      return (sp = b._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = b.asm.gn).apply(
        null,
        arguments
      )
    }),
    tp = (b._emscripten_bind_btConstraintSetting___destroy___0 = function () {
      return (tp = b._emscripten_bind_btConstraintSetting___destroy___0 = b.asm.hn).apply(
        null,
        arguments
      )
    }),
    up = (b._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 = function () {
      return (up = b._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 =
        b.asm.jn).apply(null, arguments)
    }),
    vp = (b._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 = function () {
      return (vp = b._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 =
        b.asm.kn).apply(null, arguments)
    }),
    wp = (b._emscripten_bind_btPoint2PointConstraint_setPivotA_1 = function () {
      return (wp = b._emscripten_bind_btPoint2PointConstraint_setPivotA_1 = b.asm.ln).apply(
        null,
        arguments
      )
    }),
    xp = (b._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = function () {
      return (xp = b._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = b.asm.mn).apply(
        null,
        arguments
      )
    }),
    yp = (b._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = function () {
      return (yp = b._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = b.asm.nn).apply(
        null,
        arguments
      )
    }),
    zp = (b._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 = function () {
      return (zp = b._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 = b.asm.on).apply(
        null,
        arguments
      )
    }),
    Ap = (b._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = function () {
      return (Ap = b._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = b.asm.pn).apply(
        null,
        arguments
      )
    }),
    Bp = (b._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 = function () {
      return (Bp = b._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 =
        b.asm.qn).apply(null, arguments)
    }),
    Cp = (b._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 = function () {
      return (Cp = b._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 =
        b.asm.rn).apply(null, arguments)
    }),
    Dp = (b._emscripten_bind_btPoint2PointConstraint_getParam_2 = function () {
      return (Dp = b._emscripten_bind_btPoint2PointConstraint_getParam_2 = b.asm.sn).apply(
        null,
        arguments
      )
    }),
    Ep = (b._emscripten_bind_btPoint2PointConstraint_setParam_3 = function () {
      return (Ep = b._emscripten_bind_btPoint2PointConstraint_setParam_3 = b.asm.tn).apply(
        null,
        arguments
      )
    }),
    Fp = (b._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 = function () {
      return (Fp = b._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 = b.asm.un).apply(
        null,
        arguments
      )
    }),
    Gp = (b._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = function () {
      return (Gp = b._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = b.asm.vn).apply(
        null,
        arguments
      )
    }),
    Hp = (b._emscripten_bind_btPoint2PointConstraint___destroy___0 = function () {
      return (Hp = b._emscripten_bind_btPoint2PointConstraint___destroy___0 = b.asm.wn).apply(
        null,
        arguments
      )
    }),
    Ip = (b._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 =
      function () {
        return (Ip =
          b._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 =
            b.asm.xn).apply(null, arguments)
      }),
    Jp = (b._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 =
      function () {
        return (Jp =
          b._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 =
            b.asm.yn).apply(null, arguments)
      }),
    Kp = (b._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 = function () {
      return (Kp = b._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 =
        b.asm.zn).apply(null, arguments)
    }),
    Lp = (b._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 = function () {
      return (Lp = b._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 =
        b.asm.An).apply(null, arguments)
    }),
    Mp = (b._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = function () {
      return (Mp = b._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = b.asm.Bn).apply(
        null,
        arguments
      )
    }),
    Np = (b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 = function () {
      return (Np = b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 =
        b.asm.Cn).apply(null, arguments)
    }),
    Op = (b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 = function () {
      return (Op = b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 =
        b.asm.Dn).apply(null, arguments)
    }),
    Pp = (b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 = function () {
      return (Pp = b._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 =
        b.asm.En).apply(null, arguments)
    }),
    Qp = (b._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 = function () {
      return (Qp = b._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 =
        b.asm.Fn).apply(null, arguments)
    }),
    Rp = (b._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 = function () {
      return (Rp = b._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 =
        b.asm.Gn).apply(null, arguments)
    }),
    Sp = (b._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 = function () {
      return (Sp = b._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 =
        b.asm.Hn).apply(null, arguments)
    }),
    Tp = (b._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 = function () {
      return (Tp = b._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 =
        b.asm.In).apply(null, arguments)
    }),
    Up = (b._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 = function () {
      return (Up = b._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 =
        b.asm.Jn).apply(null, arguments)
    }),
    Vp = (b._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 = function () {
      return (Vp = b._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 =
        b.asm.Kn).apply(null, arguments)
    }),
    Wp = (b._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 =
      function () {
        return (Wp =
          b._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 =
            b.asm.Ln).apply(null, arguments)
      }),
    Xp = (b._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 =
      function () {
        return (Xp =
          b._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 =
            b.asm.Mn).apply(null, arguments)
      }),
    Yp = (b._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 = function () {
      return (Yp = b._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 = b.asm.Nn).apply(
        null,
        arguments
      )
    }),
    Zp = (b._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = function () {
      return (Zp = b._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = b.asm.On).apply(
        null,
        arguments
      )
    }),
    $p = (b._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = function () {
      return ($p = b._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = b.asm.Pn).apply(
        null,
        arguments
      )
    }),
    aq =
      (b._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 =
        function () {
          return (aq =
            b._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 =
              b.asm.Qn).apply(null, arguments)
        }),
    bq = (b._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 = function () {
      return (bq = b._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 =
        b.asm.Rn).apply(null, arguments)
    }),
    cq = (b._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 = function () {
      return (cq = b._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 =
        b.asm.Sn).apply(null, arguments)
    }),
    dq = (b._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 = function () {
      return (dq = b._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 =
        b.asm.Tn).apply(null, arguments)
    }),
    eq = (b._emscripten_bind_btConeTwistConstraint_setLimit_2 = function () {
      return (eq = b._emscripten_bind_btConeTwistConstraint_setLimit_2 = b.asm.Un).apply(
        null,
        arguments
      )
    }),
    fq = (b._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = function () {
      return (fq = b._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = b.asm.Vn).apply(
        null,
        arguments
      )
    }),
    gq = (b._emscripten_bind_btConeTwistConstraint_setDamping_1 = function () {
      return (gq = b._emscripten_bind_btConeTwistConstraint_setDamping_1 = b.asm.Wn).apply(
        null,
        arguments
      )
    }),
    hq = (b._emscripten_bind_btConeTwistConstraint_enableMotor_1 = function () {
      return (hq = b._emscripten_bind_btConeTwistConstraint_enableMotor_1 = b.asm.Xn).apply(
        null,
        arguments
      )
    }),
    iq = (b._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 = function () {
      return (iq = b._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 = b.asm.Yn).apply(
        null,
        arguments
      )
    }),
    jq = (b._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 = function () {
      return (jq = b._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 =
        b.asm.Zn).apply(null, arguments)
    }),
    kq = (b._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = function () {
      return (kq = b._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = b.asm._n).apply(
        null,
        arguments
      )
    }),
    lq = (b._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 = function () {
      return (lq = b._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 =
        b.asm.$n).apply(null, arguments)
    }),
    mq = (b._emscripten_bind_btConeTwistConstraint_enableFeedback_1 = function () {
      return (mq = b._emscripten_bind_btConeTwistConstraint_enableFeedback_1 = b.asm.ao).apply(
        null,
        arguments
      )
    }),
    nq = (b._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 = function () {
      return (nq = b._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 =
        b.asm.bo).apply(null, arguments)
    }),
    oq = (b._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 = function () {
      return (oq = b._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 =
        b.asm.co).apply(null, arguments)
    }),
    pq = (b._emscripten_bind_btConeTwistConstraint_getParam_2 = function () {
      return (pq = b._emscripten_bind_btConeTwistConstraint_getParam_2 = b.asm.eo).apply(
        null,
        arguments
      )
    }),
    qq = (b._emscripten_bind_btConeTwistConstraint_setParam_3 = function () {
      return (qq = b._emscripten_bind_btConeTwistConstraint_setParam_3 = b.asm.fo).apply(
        null,
        arguments
      )
    }),
    rq = (b._emscripten_bind_btConeTwistConstraint___destroy___0 = function () {
      return (rq = b._emscripten_bind_btConeTwistConstraint___destroy___0 = b.asm.go).apply(
        null,
        arguments
      )
    }),
    sq = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_2 = function () {
      return (sq = b._emscripten_bind_btHingeConstraint_btHingeConstraint_2 = b.asm.ho).apply(
        null,
        arguments
      )
    }),
    tq = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_3 = function () {
      return (tq = b._emscripten_bind_btHingeConstraint_btHingeConstraint_3 = b.asm.io).apply(
        null,
        arguments
      )
    }),
    uq = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = function () {
      return (uq = b._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = b.asm.jo).apply(
        null,
        arguments
      )
    }),
    vq = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = function () {
      return (vq = b._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = b.asm.ko).apply(
        null,
        arguments
      )
    }),
    wq = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = function () {
      return (wq = b._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = b.asm.lo).apply(
        null,
        arguments
      )
    }),
    xq = (b._emscripten_bind_btHingeConstraint_btHingeConstraint_7 = function () {
      return (xq = b._emscripten_bind_btHingeConstraint_btHingeConstraint_7 = b.asm.mo).apply(
        null,
        arguments
      )
    }),
    yq = (b._emscripten_bind_btHingeConstraint_setLimit_4 = function () {
      return (yq = b._emscripten_bind_btHingeConstraint_setLimit_4 = b.asm.no).apply(
        null,
        arguments
      )
    }),
    zq = (b._emscripten_bind_btHingeConstraint_setLimit_5 = function () {
      return (zq = b._emscripten_bind_btHingeConstraint_setLimit_5 = b.asm.oo).apply(
        null,
        arguments
      )
    }),
    Aq = (b._emscripten_bind_btHingeConstraint_enableAngularMotor_3 = function () {
      return (Aq = b._emscripten_bind_btHingeConstraint_enableAngularMotor_3 = b.asm.po).apply(
        null,
        arguments
      )
    }),
    Bq = (b._emscripten_bind_btHingeConstraint_setAngularOnly_1 = function () {
      return (Bq = b._emscripten_bind_btHingeConstraint_setAngularOnly_1 = b.asm.qo).apply(
        null,
        arguments
      )
    }),
    Cq = (b._emscripten_bind_btHingeConstraint_enableMotor_1 = function () {
      return (Cq = b._emscripten_bind_btHingeConstraint_enableMotor_1 = b.asm.ro).apply(
        null,
        arguments
      )
    }),
    Dq = (b._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 = function () {
      return (Dq = b._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 = b.asm.so).apply(
        null,
        arguments
      )
    }),
    Eq = (b._emscripten_bind_btHingeConstraint_setMotorTarget_2 = function () {
      return (Eq = b._emscripten_bind_btHingeConstraint_setMotorTarget_2 = b.asm.to).apply(
        null,
        arguments
      )
    }),
    Fq = (b._emscripten_bind_btHingeConstraint_enableFeedback_1 = function () {
      return (Fq = b._emscripten_bind_btHingeConstraint_enableFeedback_1 = b.asm.uo).apply(
        null,
        arguments
      )
    }),
    Gq = (b._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 = function () {
      return (Gq = b._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 =
        b.asm.vo).apply(null, arguments)
    }),
    Hq = (b._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 = function () {
      return (Hq = b._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 =
        b.asm.wo).apply(null, arguments)
    }),
    Iq = (b._emscripten_bind_btHingeConstraint_getParam_2 = function () {
      return (Iq = b._emscripten_bind_btHingeConstraint_getParam_2 = b.asm.xo).apply(
        null,
        arguments
      )
    }),
    Jq = (b._emscripten_bind_btHingeConstraint_setParam_3 = function () {
      return (Jq = b._emscripten_bind_btHingeConstraint_setParam_3 = b.asm.yo).apply(
        null,
        arguments
      )
    }),
    Kq = (b._emscripten_bind_btHingeConstraint___destroy___0 = function () {
      return (Kq = b._emscripten_bind_btHingeConstraint___destroy___0 = b.asm.zo).apply(
        null,
        arguments
      )
    }),
    Lq = (b._emscripten_bind_btSliderConstraint_btSliderConstraint_3 = function () {
      return (Lq = b._emscripten_bind_btSliderConstraint_btSliderConstraint_3 = b.asm.Ao).apply(
        null,
        arguments
      )
    }),
    Mq = (b._emscripten_bind_btSliderConstraint_btSliderConstraint_5 = function () {
      return (Mq = b._emscripten_bind_btSliderConstraint_btSliderConstraint_5 = b.asm.Bo).apply(
        null,
        arguments
      )
    }),
    Nq = (b._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = function () {
      return (Nq = b._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = b.asm.Co).apply(
        null,
        arguments
      )
    }),
    Oq = (b._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 = function () {
      return (Oq = b._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 = b.asm.Do).apply(
        null,
        arguments
      )
    }),
    Pq = (b._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = function () {
      return (Pq = b._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = b.asm.Eo).apply(
        null,
        arguments
      )
    }),
    Qq = (b._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = function () {
      return (Qq = b._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = b.asm.Fo).apply(
        null,
        arguments
      )
    }),
    Rq = (b._emscripten_bind_btSliderConstraint_enableFeedback_1 = function () {
      return (Rq = b._emscripten_bind_btSliderConstraint_enableFeedback_1 = b.asm.Go).apply(
        null,
        arguments
      )
    }),
    Sq = (b._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 = function () {
      return (Sq = b._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 =
        b.asm.Ho).apply(null, arguments)
    }),
    Tq = (b._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 = function () {
      return (Tq = b._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 =
        b.asm.Io).apply(null, arguments)
    }),
    Uq = (b._emscripten_bind_btSliderConstraint_getParam_2 = function () {
      return (Uq = b._emscripten_bind_btSliderConstraint_getParam_2 = b.asm.Jo).apply(
        null,
        arguments
      )
    }),
    Vq = (b._emscripten_bind_btSliderConstraint_setParam_3 = function () {
      return (Vq = b._emscripten_bind_btSliderConstraint_setParam_3 = b.asm.Ko).apply(
        null,
        arguments
      )
    }),
    Wq = (b._emscripten_bind_btSliderConstraint___destroy___0 = function () {
      return (Wq = b._emscripten_bind_btSliderConstraint___destroy___0 = b.asm.Lo).apply(
        null,
        arguments
      )
    }),
    Xq = (b._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = function () {
      return (Xq = b._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = b.asm.Mo).apply(
        null,
        arguments
      )
    }),
    Yq = (b._emscripten_bind_btFixedConstraint_enableFeedback_1 = function () {
      return (Yq = b._emscripten_bind_btFixedConstraint_enableFeedback_1 = b.asm.No).apply(
        null,
        arguments
      )
    }),
    Zq = (b._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 = function () {
      return (Zq = b._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 =
        b.asm.Oo).apply(null, arguments)
    }),
    $q = (b._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 = function () {
      return ($q = b._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 =
        b.asm.Po).apply(null, arguments)
    }),
    ar = (b._emscripten_bind_btFixedConstraint_getParam_2 = function () {
      return (ar = b._emscripten_bind_btFixedConstraint_getParam_2 = b.asm.Qo).apply(
        null,
        arguments
      )
    }),
    br = (b._emscripten_bind_btFixedConstraint_setParam_3 = function () {
      return (br = b._emscripten_bind_btFixedConstraint_setParam_3 = b.asm.Ro).apply(
        null,
        arguments
      )
    }),
    cr = (b._emscripten_bind_btFixedConstraint___destroy___0 = function () {
      return (cr = b._emscripten_bind_btFixedConstraint___destroy___0 = b.asm.So).apply(
        null,
        arguments
      )
    }),
    dr = (b._emscripten_bind_btConstraintSolver___destroy___0 = function () {
      return (dr = b._emscripten_bind_btConstraintSolver___destroy___0 = b.asm.To).apply(
        null,
        arguments
      )
    }),
    er = (b._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = function () {
      return (er = b._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = b.asm.Uo).apply(
        null,
        arguments
      )
    }),
    fr = (b._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 = function () {
      return (fr = b._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 = b.asm.Vo).apply(
        null,
        arguments
      )
    }),
    gr = (b._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = function () {
      return (gr = b._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = b.asm.Wo).apply(
        null,
        arguments
      )
    }),
    hr = (b._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = function () {
      return (hr = b._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = b.asm.Xo).apply(
        null,
        arguments
      )
    }),
    ir = (b._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = function () {
      return (ir = b._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = b.asm.Yo).apply(
        null,
        arguments
      )
    }),
    jr = (b._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = function () {
      return (jr = b._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = b.asm.Zo).apply(
        null,
        arguments
      )
    }),
    kr = (b._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = function () {
      return (kr = b._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = b.asm._o).apply(
        null,
        arguments
      )
    }),
    lr = (b._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = function () {
      return (lr = b._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = b.asm.$o).apply(
        null,
        arguments
      )
    }),
    mr = (b._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = function () {
      return (mr = b._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = b.asm.ap).apply(
        null,
        arguments
      )
    }),
    nr = (b._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = function () {
      return (nr = b._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = b.asm.bp).apply(
        null,
        arguments
      )
    }),
    or = (b._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = function () {
      return (or = b._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = b.asm.cp).apply(
        null,
        arguments
      )
    }),
    pr = (b._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = function () {
      return (pr = b._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = b.asm.dp).apply(
        null,
        arguments
      )
    }),
    qr = (b._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = function () {
      return (qr = b._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = b.asm.ep).apply(
        null,
        arguments
      )
    }),
    rr = (b._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = function () {
      return (rr = b._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = b.asm.fp).apply(
        null,
        arguments
      )
    }),
    sr = (b._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = function () {
      return (sr = b._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = b.asm.gp).apply(
        null,
        arguments
      )
    }),
    tr = (b._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = function () {
      return (tr = b._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = b.asm.hp).apply(
        null,
        arguments
      )
    }),
    ur = (b._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 = function () {
      return (ur = b._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 =
        b.asm.ip).apply(null, arguments)
    }),
    vr = (b._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 = function () {
      return (vr = b._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 =
        b.asm.jp).apply(null, arguments)
    }),
    wr = (b._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 =
      function () {
        return (wr = b._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 =
          b.asm.kp).apply(null, arguments)
      }),
    xr = (b._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 =
      function () {
        return (xr = b._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 =
          b.asm.lp).apply(null, arguments)
      }),
    yr = (b._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 =
      function () {
        return (yr =
          b._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 =
            b.asm.mp).apply(null, arguments)
      }),
    zr = (b._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 =
      function () {
        return (zr =
          b._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 =
            b.asm.np).apply(null, arguments)
      }),
    Ar = (b._emscripten_bind_btDispatcherInfo___destroy___0 = function () {
      return (Ar = b._emscripten_bind_btDispatcherInfo___destroy___0 = b.asm.op).apply(
        null,
        arguments
      )
    }),
    Br = (b._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = function () {
      return (Br = b._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = b.asm.pp).apply(
        null,
        arguments
      )
    }),
    Cr = (b._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 = function () {
      return (Cr = b._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 = b.asm.qp).apply(
        null,
        arguments
      )
    }),
    Dr = (b._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 =
      function () {
        return (Dr =
          b._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 =
            b.asm.rp).apply(null, arguments)
      }),
    Er = (b._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 =
      function () {
        return (Er =
          b._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 =
            b.asm.sp).apply(null, arguments)
      }),
    Fr = (b._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 = function () {
      return (Fr = b._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 = b.asm.tp).apply(
        null,
        arguments
      )
    }),
    Gr = (b._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = function () {
      return (Gr = b._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = b.asm.up).apply(
        null,
        arguments
      )
    }),
    Hr = (b._emscripten_bind_btContactSolverInfo___destroy___0 = function () {
      return (Hr = b._emscripten_bind_btContactSolverInfo___destroy___0 = b.asm.vp).apply(
        null,
        arguments
      )
    }),
    Ir = (b._emscripten_bind_btVehicleTuning_btVehicleTuning_0 = function () {
      return (Ir = b._emscripten_bind_btVehicleTuning_btVehicleTuning_0 = b.asm.wp).apply(
        null,
        arguments
      )
    }),
    Jr = (b._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 = function () {
      return (Jr = b._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 = b.asm.xp).apply(
        null,
        arguments
      )
    }),
    Kr = (b._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 = function () {
      return (Kr = b._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 = b.asm.yp).apply(
        null,
        arguments
      )
    }),
    Lr = (b._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 = function () {
      return (Lr = b._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 =
        b.asm.zp).apply(null, arguments)
    }),
    Mr = (b._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 = function () {
      return (Mr = b._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 =
        b.asm.Ap).apply(null, arguments)
    }),
    Nr = (b._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 = function () {
      return (Nr = b._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 = b.asm.Bp).apply(
        null,
        arguments
      )
    }),
    Or = (b._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 = function () {
      return (Or = b._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 = b.asm.Cp).apply(
        null,
        arguments
      )
    }),
    Pr = (b._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 = function () {
      return (Pr = b._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 =
        b.asm.Dp).apply(null, arguments)
    }),
    Qr = (b._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 = function () {
      return (Qr = b._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 =
        b.asm.Ep).apply(null, arguments)
    }),
    Rr = (b._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 = function () {
      return (Rr = b._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 = b.asm.Fp).apply(
        null,
        arguments
      )
    }),
    Sr = (b._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 = function () {
      return (Sr = b._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 = b.asm.Gp).apply(
        null,
        arguments
      )
    }),
    Tr = (b._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 = function () {
      return (Tr = b._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 = b.asm.Hp).apply(
        null,
        arguments
      )
    }),
    Ur = (b._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 = function () {
      return (Ur = b._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 = b.asm.Ip).apply(
        null,
        arguments
      )
    }),
    Vr = (b._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 = function () {
      return (Vr = b._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 =
        b.asm.Jp).apply(null, arguments)
    }),
    Wr = (b._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 = function () {
      return (Wr = b._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 =
        b.asm.Kp).apply(null, arguments)
    }),
    Xr = (b._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 = function () {
      return (Xr = b._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 =
        b.asm.Lp).apply(null, arguments)
    }),
    Yr = (b._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 = function () {
      return (Yr = b._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 =
        b.asm.Mp).apply(null, arguments)
    }),
    Zr = (b._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 = function () {
      return (Zr = b._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 =
        b.asm.Np).apply(null, arguments)
    }),
    $r = (b._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 = function () {
      return ($r = b._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 =
        b.asm.Op).apply(null, arguments)
    }),
    as = (b._emscripten_bind_btVehicleRaycasterResult___destroy___0 = function () {
      return (as = b._emscripten_bind_btVehicleRaycasterResult___destroy___0 = b.asm.Pp).apply(
        null,
        arguments
      )
    }),
    bs = (b._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 = function () {
      return (bs = b._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 =
        b.asm.Qp).apply(null, arguments)
    }),
    cs = (b._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 = function () {
      return (cs = b._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 = b.asm.Rp).apply(
        null,
        arguments
      )
    }),
    ds = (b._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 = function () {
      return (ds = b._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 = b.asm.Sp).apply(
        null,
        arguments
      )
    }),
    es = (b._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 = function () {
      return (es = b._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 = b.asm.Tp).apply(
        null,
        arguments
      )
    }),
    gs = (b._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 = function () {
      return (gs = b._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 = b.asm.Up).apply(
        null,
        arguments
      )
    }),
    hs = (b._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 = function () {
      return (hs = b._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 = b.asm.Vp).apply(
        null,
        arguments
      )
    }),
    is = (b._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 = function () {
      return (is = b._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 = b.asm.Wp).apply(
        null,
        arguments
      )
    }),
    js = (b._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 = function () {
      return (js = b._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 = b.asm.Xp).apply(
        null,
        arguments
      )
    }),
    ks = (b._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 = function () {
      return (ks = b._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 = b.asm.Yp).apply(
        null,
        arguments
      )
    }),
    ls = (b._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 = function () {
      return (ls = b._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 = b.asm.Zp).apply(
        null,
        arguments
      )
    }),
    ms = (b._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 = function () {
      return (ms = b._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 = b.asm._p).apply(
        null,
        arguments
      )
    }),
    ns = (b._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 = function () {
      return (ns = b._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 = b.asm.$p).apply(
        null,
        arguments
      )
    }),
    ps = (b._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 = function () {
      return (ps = b._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 = b.asm.aq).apply(
        null,
        arguments
      )
    }),
    qs = (b._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 = function () {
      return (qs = b._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 = b.asm.bq).apply(
        null,
        arguments
      )
    }),
    rs = (b._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 = function () {
      return (rs = b._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 = b.asm.cq).apply(
        null,
        arguments
      )
    }),
    ss = (b._emscripten_bind_RaycastInfo_get_m_isInContact_0 = function () {
      return (ss = b._emscripten_bind_RaycastInfo_get_m_isInContact_0 = b.asm.dq).apply(
        null,
        arguments
      )
    }),
    ts = (b._emscripten_bind_RaycastInfo_set_m_isInContact_1 = function () {
      return (ts = b._emscripten_bind_RaycastInfo_set_m_isInContact_1 = b.asm.eq).apply(
        null,
        arguments
      )
    }),
    us = (b._emscripten_bind_RaycastInfo_get_m_groundObject_0 = function () {
      return (us = b._emscripten_bind_RaycastInfo_get_m_groundObject_0 = b.asm.fq).apply(
        null,
        arguments
      )
    }),
    vs = (b._emscripten_bind_RaycastInfo_set_m_groundObject_1 = function () {
      return (vs = b._emscripten_bind_RaycastInfo_set_m_groundObject_1 = b.asm.gq).apply(
        null,
        arguments
      )
    }),
    xs = (b._emscripten_bind_RaycastInfo___destroy___0 = function () {
      return (xs = b._emscripten_bind_RaycastInfo___destroy___0 = b.asm.hq).apply(null, arguments)
    }),
    ys = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 = function () {
      return (ys = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 =
        b.asm.iq).apply(null, arguments)
    }),
    zs = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 = function () {
      return (zs = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 =
        b.asm.jq).apply(null, arguments)
    }),
    As = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 = function () {
      return (As = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 =
        b.asm.kq).apply(null, arguments)
    }),
    Bs = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 = function () {
      return (Bs = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 =
        b.asm.lq).apply(null, arguments)
    }),
    Cs = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 = function () {
      return (Cs = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 =
        b.asm.mq).apply(null, arguments)
    }),
    Ds = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 = function () {
      return (Ds = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 =
        b.asm.nq).apply(null, arguments)
    }),
    Es = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 =
      function () {
        return (Es = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 =
          b.asm.oq).apply(null, arguments)
      }),
    Fs = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 =
      function () {
        return (Fs = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 =
          b.asm.pq).apply(null, arguments)
      }),
    Gs = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 =
      function () {
        return (Gs = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 =
          b.asm.qq).apply(null, arguments)
      }),
    Hs = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 =
      function () {
        return (Hs = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 =
          b.asm.rq).apply(null, arguments)
      }),
    Is = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 = function () {
      return (Is = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 =
        b.asm.sq).apply(null, arguments)
    }),
    Js = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 = function () {
      return (Js = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 =
        b.asm.tq).apply(null, arguments)
    }),
    Ks = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 = function () {
      return (Ks = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 =
        b.asm.uq).apply(null, arguments)
    }),
    Ls = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 = function () {
      return (Ls = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 =
        b.asm.vq).apply(null, arguments)
    }),
    Ms = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 =
      function () {
        return (Ms =
          b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 =
            b.asm.wq).apply(null, arguments)
      }),
    Ns = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 =
      function () {
        return (Ns =
          b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 =
            b.asm.xq).apply(null, arguments)
      }),
    Os = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 =
      function () {
        return (Os =
          b._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 =
            b.asm.yq).apply(null, arguments)
      }),
    Ps = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 =
      function () {
        return (Ps =
          b._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 =
            b.asm.zq).apply(null, arguments)
      }),
    Qs = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 = function () {
      return (Qs = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 =
        b.asm.Aq).apply(null, arguments)
    }),
    Rs = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 = function () {
      return (Rs = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 =
        b.asm.Bq).apply(null, arguments)
    }),
    Ss = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 = function () {
      return (Ss = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 =
        b.asm.Cq).apply(null, arguments)
    }),
    Ts = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 = function () {
      return (Ts = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 =
        b.asm.Dq).apply(null, arguments)
    }),
    Us = (b._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 = function () {
      return (Us = b._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 =
        b.asm.Eq).apply(null, arguments)
    }),
    Vs = (b._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 = function () {
      return (Vs = b._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 =
        b.asm.Fq).apply(null, arguments)
    }),
    Ws = (b._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 = function () {
      return (Ws = b._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 = b.asm.Gq).apply(
        null,
        arguments
      )
    }),
    Xs = (b._emscripten_bind_btWheelInfo_btWheelInfo_1 = function () {
      return (Xs = b._emscripten_bind_btWheelInfo_btWheelInfo_1 = b.asm.Hq).apply(null, arguments)
    }),
    Ys = (b._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 = function () {
      return (Ys = b._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 = b.asm.Iq).apply(
        null,
        arguments
      )
    }),
    Zs = (b._emscripten_bind_btWheelInfo_updateWheel_2 = function () {
      return (Zs = b._emscripten_bind_btWheelInfo_updateWheel_2 = b.asm.Jq).apply(null, arguments)
    }),
    $s = (b._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 = function () {
      return ($s = b._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 = b.asm.Kq).apply(
        null,
        arguments
      )
    }),
    at = (b._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 = function () {
      return (at = b._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 = b.asm.Lq).apply(
        null,
        arguments
      )
    }),
    bt = (b._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 = function () {
      return (bt = b._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 = b.asm.Mq).apply(
        null,
        arguments
      )
    }),
    ct = (b._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 = function () {
      return (ct = b._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 = b.asm.Nq).apply(
        null,
        arguments
      )
    }),
    dt = (b._emscripten_bind_btWheelInfo_get_m_engineForce_0 = function () {
      return (dt = b._emscripten_bind_btWheelInfo_get_m_engineForce_0 = b.asm.Oq).apply(
        null,
        arguments
      )
    }),
    et = (b._emscripten_bind_btWheelInfo_set_m_engineForce_1 = function () {
      return (et = b._emscripten_bind_btWheelInfo_set_m_engineForce_1 = b.asm.Pq).apply(
        null,
        arguments
      )
    }),
    ft = (b._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 = function () {
      return (ft = b._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 = b.asm.Qq).apply(
        null,
        arguments
      )
    }),
    gt = (b._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 = function () {
      return (gt = b._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 = b.asm.Rq).apply(
        null,
        arguments
      )
    }),
    ht = (b._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 = function () {
      return (ht = b._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 = b.asm.Sq).apply(
        null,
        arguments
      )
    }),
    it = (b._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 = function () {
      return (it = b._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 = b.asm.Tq).apply(
        null,
        arguments
      )
    }),
    jt = (b._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 = function () {
      return (jt = b._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 = b.asm.Uq).apply(
        null,
        arguments
      )
    }),
    kt = (b._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 = function () {
      return (kt = b._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 = b.asm.Vq).apply(
        null,
        arguments
      )
    }),
    lt = (b._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 = function () {
      return (lt = b._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 =
        b.asm.Wq).apply(null, arguments)
    }),
    mt = (b._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 = function () {
      return (mt = b._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 =
        b.asm.Xq).apply(null, arguments)
    }),
    nt = (b._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 = function () {
      return (nt = b._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 = b.asm.Yq).apply(
        null,
        arguments
      )
    }),
    ot = (b._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 = function () {
      return (ot = b._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 = b.asm.Zq).apply(
        null,
        arguments
      )
    }),
    pt = (b._emscripten_bind_btWheelInfo_get_m_steering_0 = function () {
      return (pt = b._emscripten_bind_btWheelInfo_get_m_steering_0 = b.asm._q).apply(
        null,
        arguments
      )
    }),
    qt = (b._emscripten_bind_btWheelInfo_set_m_steering_1 = function () {
      return (qt = b._emscripten_bind_btWheelInfo_set_m_steering_1 = b.asm.$q).apply(
        null,
        arguments
      )
    }),
    rt = (b._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 = function () {
      return (rt = b._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 = b.asm.ar).apply(
        null,
        arguments
      )
    }),
    st = (b._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 = function () {
      return (st = b._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 = b.asm.br).apply(
        null,
        arguments
      )
    }),
    tt = (b._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 = function () {
      return (tt = b._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 = b.asm.cr).apply(
        null,
        arguments
      )
    }),
    ut = (b._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 = function () {
      return (ut = b._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 = b.asm.dr).apply(
        null,
        arguments
      )
    }),
    vt = (b._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 = function () {
      return (vt = b._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 = b.asm.er).apply(
        null,
        arguments
      )
    }),
    wt = (b._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 = function () {
      return (wt = b._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 = b.asm.fr).apply(
        null,
        arguments
      )
    }),
    xt = (b._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 = function () {
      return (xt = b._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 = b.asm.gr).apply(
        null,
        arguments
      )
    }),
    yt = (b._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 = function () {
      return (yt = b._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 = b.asm.hr).apply(
        null,
        arguments
      )
    }),
    zt = (b._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 = function () {
      return (zt = b._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 = b.asm.ir).apply(
        null,
        arguments
      )
    }),
    At = (b._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 = function () {
      return (At = b._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 = b.asm.jr).apply(
        null,
        arguments
      )
    }),
    Bt = (b._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 = function () {
      return (Bt = b._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 =
        b.asm.kr).apply(null, arguments)
    }),
    Ct = (b._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 = function () {
      return (Ct = b._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 =
        b.asm.lr).apply(null, arguments)
    }),
    Dt = (b._emscripten_bind_btWheelInfo_get_m_worldTransform_0 = function () {
      return (Dt = b._emscripten_bind_btWheelInfo_get_m_worldTransform_0 = b.asm.mr).apply(
        null,
        arguments
      )
    }),
    Et = (b._emscripten_bind_btWheelInfo_set_m_worldTransform_1 = function () {
      return (Et = b._emscripten_bind_btWheelInfo_set_m_worldTransform_1 = b.asm.nr).apply(
        null,
        arguments
      )
    }),
    Ft = (b._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 = function () {
      return (Ft = b._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 = b.asm.or).apply(
        null,
        arguments
      )
    }),
    Gt = (b._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 = function () {
      return (Gt = b._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 = b.asm.pr).apply(
        null,
        arguments
      )
    }),
    Ht = (b._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 = function () {
      return (Ht = b._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 = b.asm.qr).apply(
        null,
        arguments
      )
    }),
    It = (b._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 = function () {
      return (It = b._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 = b.asm.rr).apply(
        null,
        arguments
      )
    }),
    Jt = (b._emscripten_bind_btWheelInfo_get_m_rotation_0 = function () {
      return (Jt = b._emscripten_bind_btWheelInfo_get_m_rotation_0 = b.asm.sr).apply(
        null,
        arguments
      )
    }),
    Kt = (b._emscripten_bind_btWheelInfo_set_m_rotation_1 = function () {
      return (Kt = b._emscripten_bind_btWheelInfo_set_m_rotation_1 = b.asm.tr).apply(
        null,
        arguments
      )
    }),
    Lt = (b._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 = function () {
      return (Lt = b._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 = b.asm.ur).apply(
        null,
        arguments
      )
    }),
    Mt = (b._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 = function () {
      return (Mt = b._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 = b.asm.vr).apply(
        null,
        arguments
      )
    }),
    Nt = (b._emscripten_bind_btWheelInfo_get_m_brake_0 = function () {
      return (Nt = b._emscripten_bind_btWheelInfo_get_m_brake_0 = b.asm.wr).apply(null, arguments)
    }),
    Ot = (b._emscripten_bind_btWheelInfo_set_m_brake_1 = function () {
      return (Ot = b._emscripten_bind_btWheelInfo_set_m_brake_1 = b.asm.xr).apply(null, arguments)
    }),
    Pt = (b._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 = function () {
      return (Pt = b._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 =
        b.asm.yr).apply(null, arguments)
    }),
    Qt = (b._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 = function () {
      return (Qt = b._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 =
        b.asm.zr).apply(null, arguments)
    }),
    Rt = (b._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 = function () {
      return (Rt = b._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 =
        b.asm.Ar).apply(null, arguments)
    }),
    St = (b._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 = function () {
      return (St = b._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 =
        b.asm.Br).apply(null, arguments)
    }),
    Tt = (b._emscripten_bind_btWheelInfo_get_m_skidInfo_0 = function () {
      return (Tt = b._emscripten_bind_btWheelInfo_get_m_skidInfo_0 = b.asm.Cr).apply(
        null,
        arguments
      )
    }),
    Ut = (b._emscripten_bind_btWheelInfo_set_m_skidInfo_1 = function () {
      return (Ut = b._emscripten_bind_btWheelInfo_set_m_skidInfo_1 = b.asm.Dr).apply(
        null,
        arguments
      )
    }),
    Vt = (b._emscripten_bind_btWheelInfo___destroy___0 = function () {
      return (Vt = b._emscripten_bind_btWheelInfo___destroy___0 = b.asm.Er).apply(null, arguments)
    }),
    Wt = (b._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 =
      function () {
        return (Wt =
          b._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 =
            b.asm.Fr).apply(null, arguments)
      }),
    Xt = (b._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 =
      function () {
        return (Xt =
          b._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 =
            b.asm.Gr).apply(null, arguments)
      }),
    Yt = (b._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = function () {
      return (Yt = b._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = b.asm.Hr).apply(
        null,
        arguments
      )
    }),
    Zt = (b._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 = function () {
      return (Zt = b._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 =
        b.asm.Ir).apply(null, arguments)
    }),
    $t = (b._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 =
      function () {
        return ($t =
          b._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 =
            b.asm.Jr).apply(null, arguments)
      }),
    au = (b._emscripten_bind_btKinematicCharacterController_warp_1 = function () {
      return (au = b._emscripten_bind_btKinematicCharacterController_warp_1 = b.asm.Kr).apply(
        null,
        arguments
      )
    }),
    bu = (b._emscripten_bind_btKinematicCharacterController_preStep_1 = function () {
      return (bu = b._emscripten_bind_btKinematicCharacterController_preStep_1 = b.asm.Lr).apply(
        null,
        arguments
      )
    }),
    cu = (b._emscripten_bind_btKinematicCharacterController_playerStep_2 = function () {
      return (cu = b._emscripten_bind_btKinematicCharacterController_playerStep_2 = b.asm.Mr).apply(
        null,
        arguments
      )
    }),
    du = (b._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 = function () {
      return (du = b._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 =
        b.asm.Nr).apply(null, arguments)
    }),
    eu = (b._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 = function () {
      return (eu = b._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 =
        b.asm.Or).apply(null, arguments)
    }),
    fu = (b._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 = function () {
      return (fu = b._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 =
        b.asm.Pr).apply(null, arguments)
    }),
    gu = (b._emscripten_bind_btKinematicCharacterController_canJump_0 = function () {
      return (gu = b._emscripten_bind_btKinematicCharacterController_canJump_0 = b.asm.Qr).apply(
        null,
        arguments
      )
    }),
    hu = (b._emscripten_bind_btKinematicCharacterController_jump_0 = function () {
      return (hu = b._emscripten_bind_btKinematicCharacterController_jump_0 = b.asm.Rr).apply(
        null,
        arguments
      )
    }),
    iu = (b._emscripten_bind_btKinematicCharacterController_setGravity_1 = function () {
      return (iu = b._emscripten_bind_btKinematicCharacterController_setGravity_1 = b.asm.Sr).apply(
        null,
        arguments
      )
    }),
    ju = (b._emscripten_bind_btKinematicCharacterController_getGravity_0 = function () {
      return (ju = b._emscripten_bind_btKinematicCharacterController_getGravity_0 = b.asm.Tr).apply(
        null,
        arguments
      )
    }),
    ku = (b._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 = function () {
      return (ku = b._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 =
        b.asm.Ur).apply(null, arguments)
    }),
    lu = (b._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 = function () {
      return (lu = b._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 =
        b.asm.Vr).apply(null, arguments)
    }),
    mu = (b._emscripten_bind_btKinematicCharacterController_getGhostObject_0 = function () {
      return (mu = b._emscripten_bind_btKinematicCharacterController_getGhostObject_0 =
        b.asm.Wr).apply(null, arguments)
    }),
    nu = (b._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 = function () {
      return (nu = b._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 =
        b.asm.Xr).apply(null, arguments)
    }),
    ou = (b._emscripten_bind_btKinematicCharacterController_onGround_0 = function () {
      return (ou = b._emscripten_bind_btKinematicCharacterController_onGround_0 = b.asm.Yr).apply(
        null,
        arguments
      )
    }),
    pu = (b._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 = function () {
      return (pu = b._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 =
        b.asm.Zr).apply(null, arguments)
    }),
    qu = (b._emscripten_bind_btKinematicCharacterController_updateAction_2 = function () {
      return (qu = b._emscripten_bind_btKinematicCharacterController_updateAction_2 =
        b.asm._r).apply(null, arguments)
    }),
    ru = (b._emscripten_bind_btKinematicCharacterController___destroy___0 = function () {
      return (ru = b._emscripten_bind_btKinematicCharacterController___destroy___0 =
        b.asm.$r).apply(null, arguments)
    }),
    su = (b._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 = function () {
      return (su = b._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 = b.asm.as).apply(
        null,
        arguments
      )
    }),
    tu = (b._emscripten_bind_btRaycastVehicle_applyEngineForce_2 = function () {
      return (tu = b._emscripten_bind_btRaycastVehicle_applyEngineForce_2 = b.asm.bs).apply(
        null,
        arguments
      )
    }),
    uu = (b._emscripten_bind_btRaycastVehicle_setSteeringValue_2 = function () {
      return (uu = b._emscripten_bind_btRaycastVehicle_setSteeringValue_2 = b.asm.cs).apply(
        null,
        arguments
      )
    }),
    vu = (b._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 = function () {
      return (vu = b._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 = b.asm.ds).apply(
        null,
        arguments
      )
    }),
    wu = (b._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 = function () {
      return (wu = b._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 = b.asm.es).apply(
        null,
        arguments
      )
    }),
    xu = (b._emscripten_bind_btRaycastVehicle_addWheel_7 = function () {
      return (xu = b._emscripten_bind_btRaycastVehicle_addWheel_7 = b.asm.fs).apply(null, arguments)
    }),
    yu = (b._emscripten_bind_btRaycastVehicle_getNumWheels_0 = function () {
      return (yu = b._emscripten_bind_btRaycastVehicle_getNumWheels_0 = b.asm.gs).apply(
        null,
        arguments
      )
    }),
    zu = (b._emscripten_bind_btRaycastVehicle_getRigidBody_0 = function () {
      return (zu = b._emscripten_bind_btRaycastVehicle_getRigidBody_0 = b.asm.hs).apply(
        null,
        arguments
      )
    }),
    Au = (b._emscripten_bind_btRaycastVehicle_getWheelInfo_1 = function () {
      return (Au = b._emscripten_bind_btRaycastVehicle_getWheelInfo_1 = b.asm.is).apply(
        null,
        arguments
      )
    }),
    Bu = (b._emscripten_bind_btRaycastVehicle_setBrake_2 = function () {
      return (Bu = b._emscripten_bind_btRaycastVehicle_setBrake_2 = b.asm.js).apply(null, arguments)
    }),
    Cu = (b._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 = function () {
      return (Cu = b._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 = b.asm.ks).apply(
        null,
        arguments
      )
    }),
    Du = (b._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 = function () {
      return (Du = b._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 = b.asm.ls).apply(
        null,
        arguments
      )
    }),
    Eu = (b._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 = function () {
      return (Eu = b._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 = b.asm.ms).apply(
        null,
        arguments
      )
    }),
    Fu = (b._emscripten_bind_btRaycastVehicle_rayCast_1 = function () {
      return (Fu = b._emscripten_bind_btRaycastVehicle_rayCast_1 = b.asm.ns).apply(null, arguments)
    }),
    Gu = (b._emscripten_bind_btRaycastVehicle_updateVehicle_1 = function () {
      return (Gu = b._emscripten_bind_btRaycastVehicle_updateVehicle_1 = b.asm.os).apply(
        null,
        arguments
      )
    }),
    Hu = (b._emscripten_bind_btRaycastVehicle_resetSuspension_0 = function () {
      return (Hu = b._emscripten_bind_btRaycastVehicle_resetSuspension_0 = b.asm.ps).apply(
        null,
        arguments
      )
    }),
    Iu = (b._emscripten_bind_btRaycastVehicle_getSteeringValue_1 = function () {
      return (Iu = b._emscripten_bind_btRaycastVehicle_getSteeringValue_1 = b.asm.qs).apply(
        null,
        arguments
      )
    }),
    Ju = (b._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 = function () {
      return (Ju = b._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 = b.asm.rs).apply(
        null,
        arguments
      )
    }),
    Ku = (b._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 = function () {
      return (Ku = b._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 = b.asm.ss).apply(
        null,
        arguments
      )
    }),
    Lu = (b._emscripten_bind_btRaycastVehicle_setPitchControl_1 = function () {
      return (Lu = b._emscripten_bind_btRaycastVehicle_setPitchControl_1 = b.asm.ts).apply(
        null,
        arguments
      )
    }),
    Mu = (b._emscripten_bind_btRaycastVehicle_updateSuspension_1 = function () {
      return (Mu = b._emscripten_bind_btRaycastVehicle_updateSuspension_1 = b.asm.us).apply(
        null,
        arguments
      )
    }),
    Nu = (b._emscripten_bind_btRaycastVehicle_updateFriction_1 = function () {
      return (Nu = b._emscripten_bind_btRaycastVehicle_updateFriction_1 = b.asm.vs).apply(
        null,
        arguments
      )
    }),
    Ou = (b._emscripten_bind_btRaycastVehicle_getRightAxis_0 = function () {
      return (Ou = b._emscripten_bind_btRaycastVehicle_getRightAxis_0 = b.asm.ws).apply(
        null,
        arguments
      )
    }),
    Pu = (b._emscripten_bind_btRaycastVehicle_getUpAxis_0 = function () {
      return (Pu = b._emscripten_bind_btRaycastVehicle_getUpAxis_0 = b.asm.xs).apply(
        null,
        arguments
      )
    }),
    Qu = (b._emscripten_bind_btRaycastVehicle_getForwardAxis_0 = function () {
      return (Qu = b._emscripten_bind_btRaycastVehicle_getForwardAxis_0 = b.asm.ys).apply(
        null,
        arguments
      )
    }),
    Ru = (b._emscripten_bind_btRaycastVehicle_getForwardVector_0 = function () {
      return (Ru = b._emscripten_bind_btRaycastVehicle_getForwardVector_0 = b.asm.zs).apply(
        null,
        arguments
      )
    }),
    Su = (b._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 = function () {
      return (Su = b._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 = b.asm.As).apply(
        null,
        arguments
      )
    }),
    Tu = (b._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 = function () {
      return (Tu = b._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 = b.asm.Bs).apply(
        null,
        arguments
      )
    }),
    Uu = (b._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 = function () {
      return (Uu = b._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 = b.asm.Cs).apply(
        null,
        arguments
      )
    }),
    Vu = (b._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 = function () {
      return (Vu = b._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 = b.asm.Ds).apply(
        null,
        arguments
      )
    }),
    Wu = (b._emscripten_bind_btRaycastVehicle_updateAction_2 = function () {
      return (Wu = b._emscripten_bind_btRaycastVehicle_updateAction_2 = b.asm.Es).apply(
        null,
        arguments
      )
    }),
    Xu = (b._emscripten_bind_btRaycastVehicle___destroy___0 = function () {
      return (Xu = b._emscripten_bind_btRaycastVehicle___destroy___0 = b.asm.Fs).apply(
        null,
        arguments
      )
    }),
    Yu = (b._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 = function () {
      return (Yu = b._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 =
        b.asm.Gs).apply(null, arguments)
    }),
    Zu = (b._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 = function () {
      return (Zu = b._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 =
        b.asm.Hs).apply(null, arguments)
    }),
    $u = (b._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 = function () {
      return ($u = b._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 =
        b.asm.Is).apply(null, arguments)
    }),
    av = (b._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 =
      function () {
        return (av = b._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 =
          b.asm.Js).apply(null, arguments)
      }),
    bv = (b._emscripten_bind_btPairCachingGhostObject_setActivationState_1 = function () {
      return (bv = b._emscripten_bind_btPairCachingGhostObject_setActivationState_1 =
        b.asm.Ks).apply(null, arguments)
    }),
    cv = (b._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 = function () {
      return (cv = b._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 =
        b.asm.Ls).apply(null, arguments)
    }),
    dv = (b._emscripten_bind_btPairCachingGhostObject_activate_0 = function () {
      return (dv = b._emscripten_bind_btPairCachingGhostObject_activate_0 = b.asm.Ms).apply(
        null,
        arguments
      )
    }),
    ev = (b._emscripten_bind_btPairCachingGhostObject_activate_1 = function () {
      return (ev = b._emscripten_bind_btPairCachingGhostObject_activate_1 = b.asm.Ns).apply(
        null,
        arguments
      )
    }),
    fv = (b._emscripten_bind_btPairCachingGhostObject_isActive_0 = function () {
      return (fv = b._emscripten_bind_btPairCachingGhostObject_isActive_0 = b.asm.Os).apply(
        null,
        arguments
      )
    }),
    gv = (b._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 = function () {
      return (gv = b._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 =
        b.asm.Ps).apply(null, arguments)
    }),
    hv = (b._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 = function () {
      return (hv = b._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 = b.asm.Qs).apply(
        null,
        arguments
      )
    }),
    iv = (b._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 = function () {
      return (iv = b._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 =
        b.asm.Rs).apply(null, arguments)
    }),
    jv = (b._emscripten_bind_btPairCachingGhostObject_getRestitution_0 = function () {
      return (jv = b._emscripten_bind_btPairCachingGhostObject_getRestitution_0 = b.asm.Ss).apply(
        null,
        arguments
      )
    }),
    kv = (b._emscripten_bind_btPairCachingGhostObject_getFriction_0 = function () {
      return (kv = b._emscripten_bind_btPairCachingGhostObject_getFriction_0 = b.asm.Ts).apply(
        null,
        arguments
      )
    }),
    lv = (b._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 = function () {
      return (lv = b._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 =
        b.asm.Us).apply(null, arguments)
    }),
    mv = (b._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = function () {
      return (mv = b._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = b.asm.Vs).apply(
        null,
        arguments
      )
    }),
    nv = (b._emscripten_bind_btPairCachingGhostObject_setFriction_1 = function () {
      return (nv = b._emscripten_bind_btPairCachingGhostObject_setFriction_1 = b.asm.Ws).apply(
        null,
        arguments
      )
    }),
    ov = (b._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 = function () {
      return (ov = b._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 =
        b.asm.Xs).apply(null, arguments)
    }),
    pv = (b._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 = function () {
      return (pv = b._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 =
        b.asm.Ys).apply(null, arguments)
    }),
    qv = (b._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 = function () {
      return (qv = b._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 =
        b.asm.Zs).apply(null, arguments)
    }),
    rv = (b._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 = function () {
      return (rv = b._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 =
        b.asm._s).apply(null, arguments)
    }),
    sv = (b._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 = function () {
      return (sv = b._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 =
        b.asm.$s).apply(null, arguments)
    }),
    tv = (b._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 = function () {
      return (tv = b._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 =
        b.asm.at).apply(null, arguments)
    }),
    uv = (b._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 = function () {
      return (uv = b._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 =
        b.asm.bt).apply(null, arguments)
    }),
    vv = (b._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 = function () {
      return (vv = b._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 =
        b.asm.ct).apply(null, arguments)
    }),
    wv = (b._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = function () {
      return (wv = b._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = b.asm.dt).apply(
        null,
        arguments
      )
    }),
    xv = (b._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = function () {
      return (xv = b._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = b.asm.et).apply(
        null,
        arguments
      )
    }),
    yv = (b._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 = function () {
      return (yv = b._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 = b.asm.ft).apply(
        null,
        arguments
      )
    }),
    zv = (b._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 = function () {
      return (zv = b._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 = b.asm.gt).apply(
        null,
        arguments
      )
    }),
    Av = (b._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 = function () {
      return (Av = b._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 =
        b.asm.ht).apply(null, arguments)
    }),
    Bv = (b._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 = function () {
      return (Bv = b._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 =
        b.asm.it).apply(null, arguments)
    }),
    Cv = (b._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 = function () {
      return (Cv = b._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 =
        b.asm.jt).apply(null, arguments)
    }),
    Dv = (b._emscripten_bind_btPairCachingGhostObject___destroy___0 = function () {
      return (Dv = b._emscripten_bind_btPairCachingGhostObject___destroy___0 = b.asm.kt).apply(
        null,
        arguments
      )
    }),
    Ev = (b._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 = function () {
      return (Ev = b._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 = b.asm.lt).apply(
        null,
        arguments
      )
    }),
    Fv = (b._emscripten_bind_btGhostPairCallback___destroy___0 = function () {
      return (Fv = b._emscripten_bind_btGhostPairCallback___destroy___0 = b.asm.mt).apply(
        null,
        arguments
      )
    }),
    Gv = (b._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 = function () {
      return (Gv = b._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 = b.asm.nt).apply(
        null,
        arguments
      )
    }),
    Hv = (b._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 = function () {
      return (Hv = b._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 = b.asm.ot).apply(
        null,
        arguments
      )
    }),
    Iv = (b._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 = function () {
      return (Iv = b._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 = b.asm.pt).apply(
        null,
        arguments
      )
    }),
    Jv = (b._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 = function () {
      return (Jv = b._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 = b.asm.qt).apply(
        null,
        arguments
      )
    }),
    Kv = (b._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 = function () {
      return (Kv = b._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 = b.asm.rt).apply(
        null,
        arguments
      )
    }),
    Lv = (b._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 = function () {
      return (Lv = b._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 = b.asm.st).apply(
        null,
        arguments
      )
    }),
    Mv = (b._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 = function () {
      return (Mv = b._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 = b.asm.tt).apply(
        null,
        arguments
      )
    }),
    Nv = (b._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 = function () {
      return (Nv = b._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 = b.asm.ut).apply(
        null,
        arguments
      )
    }),
    Ov = (b._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 = function () {
      return (Ov = b._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 = b.asm.vt).apply(
        null,
        arguments
      )
    }),
    Pv = (b._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 = function () {
      return (Pv = b._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 = b.asm.wt).apply(
        null,
        arguments
      )
    }),
    Qv = (b._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 = function () {
      return (Qv = b._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 = b.asm.xt).apply(
        null,
        arguments
      )
    }),
    Rv = (b._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 = function () {
      return (Rv = b._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 = b.asm.yt).apply(
        null,
        arguments
      )
    }),
    Sv = (b._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 = function () {
      return (Sv = b._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 = b.asm.zt).apply(
        null,
        arguments
      )
    }),
    Tv = (b._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 = function () {
      return (Tv = b._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 = b.asm.At).apply(
        null,
        arguments
      )
    }),
    Uv = (b._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 = function () {
      return (Uv = b._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 = b.asm.Bt).apply(
        null,
        arguments
      )
    }),
    Vv = (b._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 = function () {
      return (Vv = b._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 = b.asm.Ct).apply(
        null,
        arguments
      )
    }),
    Wv = (b._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 = function () {
      return (Wv = b._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 = b.asm.Dt).apply(
        null,
        arguments
      )
    }),
    Xv = (b._emscripten_bind_btSoftBodyWorldInfo___destroy___0 = function () {
      return (Xv = b._emscripten_bind_btSoftBodyWorldInfo___destroy___0 = b.asm.Et).apply(
        null,
        arguments
      )
    }),
    Yv = (b._emscripten_bind_Face_get_m_n_1 = function () {
      return (Yv = b._emscripten_bind_Face_get_m_n_1 = b.asm.Ft).apply(null, arguments)
    }),
    Zv = (b._emscripten_bind_Face_set_m_n_2 = function () {
      return (Zv = b._emscripten_bind_Face_set_m_n_2 = b.asm.Gt).apply(null, arguments)
    }),
    $v = (b._emscripten_bind_Face_get_m_normal_0 = function () {
      return ($v = b._emscripten_bind_Face_get_m_normal_0 = b.asm.Ht).apply(null, arguments)
    }),
    aw = (b._emscripten_bind_Face_set_m_normal_1 = function () {
      return (aw = b._emscripten_bind_Face_set_m_normal_1 = b.asm.It).apply(null, arguments)
    }),
    bw = (b._emscripten_bind_Face_get_m_ra_0 = function () {
      return (bw = b._emscripten_bind_Face_get_m_ra_0 = b.asm.Jt).apply(null, arguments)
    }),
    cw = (b._emscripten_bind_Face_set_m_ra_1 = function () {
      return (cw = b._emscripten_bind_Face_set_m_ra_1 = b.asm.Kt).apply(null, arguments)
    }),
    dw = (b._emscripten_bind_Face___destroy___0 = function () {
      return (dw = b._emscripten_bind_Face___destroy___0 = b.asm.Lt).apply(null, arguments)
    }),
    ew = (b._emscripten_bind_tFaceArray_size_0 = function () {
      return (ew = b._emscripten_bind_tFaceArray_size_0 = b.asm.Mt).apply(null, arguments)
    }),
    fw = (b._emscripten_bind_tFaceArray_at_1 = function () {
      return (fw = b._emscripten_bind_tFaceArray_at_1 = b.asm.Nt).apply(null, arguments)
    }),
    gw = (b._emscripten_bind_tFaceArray___destroy___0 = function () {
      return (gw = b._emscripten_bind_tFaceArray___destroy___0 = b.asm.Ot).apply(null, arguments)
    }),
    hw = (b._emscripten_bind_Node_get_m_x_0 = function () {
      return (hw = b._emscripten_bind_Node_get_m_x_0 = b.asm.Pt).apply(null, arguments)
    }),
    iw = (b._emscripten_bind_Node_set_m_x_1 = function () {
      return (iw = b._emscripten_bind_Node_set_m_x_1 = b.asm.Qt).apply(null, arguments)
    }),
    jw = (b._emscripten_bind_Node_get_m_q_0 = function () {
      return (jw = b._emscripten_bind_Node_get_m_q_0 = b.asm.Rt).apply(null, arguments)
    }),
    kw = (b._emscripten_bind_Node_set_m_q_1 = function () {
      return (kw = b._emscripten_bind_Node_set_m_q_1 = b.asm.St).apply(null, arguments)
    }),
    lw = (b._emscripten_bind_Node_get_m_v_0 = function () {
      return (lw = b._emscripten_bind_Node_get_m_v_0 = b.asm.Tt).apply(null, arguments)
    }),
    mw = (b._emscripten_bind_Node_set_m_v_1 = function () {
      return (mw = b._emscripten_bind_Node_set_m_v_1 = b.asm.Ut).apply(null, arguments)
    }),
    nw = (b._emscripten_bind_Node_get_m_f_0 = function () {
      return (nw = b._emscripten_bind_Node_get_m_f_0 = b.asm.Vt).apply(null, arguments)
    }),
    ow = (b._emscripten_bind_Node_set_m_f_1 = function () {
      return (ow = b._emscripten_bind_Node_set_m_f_1 = b.asm.Wt).apply(null, arguments)
    }),
    pw = (b._emscripten_bind_Node_get_m_n_0 = function () {
      return (pw = b._emscripten_bind_Node_get_m_n_0 = b.asm.Xt).apply(null, arguments)
    }),
    qw = (b._emscripten_bind_Node_set_m_n_1 = function () {
      return (qw = b._emscripten_bind_Node_set_m_n_1 = b.asm.Yt).apply(null, arguments)
    }),
    rw = (b._emscripten_bind_Node_get_m_im_0 = function () {
      return (rw = b._emscripten_bind_Node_get_m_im_0 = b.asm.Zt).apply(null, arguments)
    }),
    sw = (b._emscripten_bind_Node_set_m_im_1 = function () {
      return (sw = b._emscripten_bind_Node_set_m_im_1 = b.asm._t).apply(null, arguments)
    }),
    tw = (b._emscripten_bind_Node_get_m_area_0 = function () {
      return (tw = b._emscripten_bind_Node_get_m_area_0 = b.asm.$t).apply(null, arguments)
    }),
    uw = (b._emscripten_bind_Node_set_m_area_1 = function () {
      return (uw = b._emscripten_bind_Node_set_m_area_1 = b.asm.au).apply(null, arguments)
    }),
    vw = (b._emscripten_bind_Node___destroy___0 = function () {
      return (vw = b._emscripten_bind_Node___destroy___0 = b.asm.bu).apply(null, arguments)
    }),
    ww = (b._emscripten_bind_tNodeArray_size_0 = function () {
      return (ww = b._emscripten_bind_tNodeArray_size_0 = b.asm.cu).apply(null, arguments)
    }),
    xw = (b._emscripten_bind_tNodeArray_at_1 = function () {
      return (xw = b._emscripten_bind_tNodeArray_at_1 = b.asm.du).apply(null, arguments)
    }),
    yw = (b._emscripten_bind_tNodeArray___destroy___0 = function () {
      return (yw = b._emscripten_bind_tNodeArray___destroy___0 = b.asm.eu).apply(null, arguments)
    }),
    zw = (b._emscripten_bind_Material_get_m_kLST_0 = function () {
      return (zw = b._emscripten_bind_Material_get_m_kLST_0 = b.asm.fu).apply(null, arguments)
    }),
    Aw = (b._emscripten_bind_Material_set_m_kLST_1 = function () {
      return (Aw = b._emscripten_bind_Material_set_m_kLST_1 = b.asm.gu).apply(null, arguments)
    }),
    Bw = (b._emscripten_bind_Material_get_m_kAST_0 = function () {
      return (Bw = b._emscripten_bind_Material_get_m_kAST_0 = b.asm.hu).apply(null, arguments)
    }),
    Cw = (b._emscripten_bind_Material_set_m_kAST_1 = function () {
      return (Cw = b._emscripten_bind_Material_set_m_kAST_1 = b.asm.iu).apply(null, arguments)
    }),
    Dw = (b._emscripten_bind_Material_get_m_kVST_0 = function () {
      return (Dw = b._emscripten_bind_Material_get_m_kVST_0 = b.asm.ju).apply(null, arguments)
    }),
    Ew = (b._emscripten_bind_Material_set_m_kVST_1 = function () {
      return (Ew = b._emscripten_bind_Material_set_m_kVST_1 = b.asm.ku).apply(null, arguments)
    }),
    Fw = (b._emscripten_bind_Material_get_m_flags_0 = function () {
      return (Fw = b._emscripten_bind_Material_get_m_flags_0 = b.asm.lu).apply(null, arguments)
    }),
    Gw = (b._emscripten_bind_Material_set_m_flags_1 = function () {
      return (Gw = b._emscripten_bind_Material_set_m_flags_1 = b.asm.mu).apply(null, arguments)
    }),
    Hw = (b._emscripten_bind_Material___destroy___0 = function () {
      return (Hw = b._emscripten_bind_Material___destroy___0 = b.asm.nu).apply(null, arguments)
    }),
    Iw = (b._emscripten_bind_tMaterialArray_size_0 = function () {
      return (Iw = b._emscripten_bind_tMaterialArray_size_0 = b.asm.ou).apply(null, arguments)
    }),
    Jw = (b._emscripten_bind_tMaterialArray_at_1 = function () {
      return (Jw = b._emscripten_bind_tMaterialArray_at_1 = b.asm.pu).apply(null, arguments)
    }),
    Kw = (b._emscripten_bind_tMaterialArray___destroy___0 = function () {
      return (Kw = b._emscripten_bind_tMaterialArray___destroy___0 = b.asm.qu).apply(
        null,
        arguments
      )
    }),
    Lw = (b._emscripten_bind_Anchor_get_m_node_0 = function () {
      return (Lw = b._emscripten_bind_Anchor_get_m_node_0 = b.asm.ru).apply(null, arguments)
    }),
    Mw = (b._emscripten_bind_Anchor_set_m_node_1 = function () {
      return (Mw = b._emscripten_bind_Anchor_set_m_node_1 = b.asm.su).apply(null, arguments)
    }),
    Nw = (b._emscripten_bind_Anchor_get_m_local_0 = function () {
      return (Nw = b._emscripten_bind_Anchor_get_m_local_0 = b.asm.tu).apply(null, arguments)
    }),
    Ow = (b._emscripten_bind_Anchor_set_m_local_1 = function () {
      return (Ow = b._emscripten_bind_Anchor_set_m_local_1 = b.asm.uu).apply(null, arguments)
    }),
    Pw = (b._emscripten_bind_Anchor_get_m_body_0 = function () {
      return (Pw = b._emscripten_bind_Anchor_get_m_body_0 = b.asm.vu).apply(null, arguments)
    }),
    Qw = (b._emscripten_bind_Anchor_set_m_body_1 = function () {
      return (Qw = b._emscripten_bind_Anchor_set_m_body_1 = b.asm.wu).apply(null, arguments)
    }),
    Rw = (b._emscripten_bind_Anchor_get_m_influence_0 = function () {
      return (Rw = b._emscripten_bind_Anchor_get_m_influence_0 = b.asm.xu).apply(null, arguments)
    }),
    Sw = (b._emscripten_bind_Anchor_set_m_influence_1 = function () {
      return (Sw = b._emscripten_bind_Anchor_set_m_influence_1 = b.asm.yu).apply(null, arguments)
    }),
    Tw = (b._emscripten_bind_Anchor_get_m_c0_0 = function () {
      return (Tw = b._emscripten_bind_Anchor_get_m_c0_0 = b.asm.zu).apply(null, arguments)
    }),
    Uw = (b._emscripten_bind_Anchor_set_m_c0_1 = function () {
      return (Uw = b._emscripten_bind_Anchor_set_m_c0_1 = b.asm.Au).apply(null, arguments)
    }),
    Vw = (b._emscripten_bind_Anchor_get_m_c1_0 = function () {
      return (Vw = b._emscripten_bind_Anchor_get_m_c1_0 = b.asm.Bu).apply(null, arguments)
    }),
    Ww = (b._emscripten_bind_Anchor_set_m_c1_1 = function () {
      return (Ww = b._emscripten_bind_Anchor_set_m_c1_1 = b.asm.Cu).apply(null, arguments)
    }),
    Xw = (b._emscripten_bind_Anchor_get_m_c2_0 = function () {
      return (Xw = b._emscripten_bind_Anchor_get_m_c2_0 = b.asm.Du).apply(null, arguments)
    }),
    Yw = (b._emscripten_bind_Anchor_set_m_c2_1 = function () {
      return (Yw = b._emscripten_bind_Anchor_set_m_c2_1 = b.asm.Eu).apply(null, arguments)
    }),
    Zw = (b._emscripten_bind_Anchor___destroy___0 = function () {
      return (Zw = b._emscripten_bind_Anchor___destroy___0 = b.asm.Fu).apply(null, arguments)
    }),
    $w = (b._emscripten_bind_tAnchorArray_size_0 = function () {
      return ($w = b._emscripten_bind_tAnchorArray_size_0 = b.asm.Gu).apply(null, arguments)
    }),
    ax = (b._emscripten_bind_tAnchorArray_at_1 = function () {
      return (ax = b._emscripten_bind_tAnchorArray_at_1 = b.asm.Hu).apply(null, arguments)
    }),
    bx = (b._emscripten_bind_tAnchorArray_clear_0 = function () {
      return (bx = b._emscripten_bind_tAnchorArray_clear_0 = b.asm.Iu).apply(null, arguments)
    }),
    cx = (b._emscripten_bind_tAnchorArray_push_back_1 = function () {
      return (cx = b._emscripten_bind_tAnchorArray_push_back_1 = b.asm.Ju).apply(null, arguments)
    }),
    dx = (b._emscripten_bind_tAnchorArray_pop_back_0 = function () {
      return (dx = b._emscripten_bind_tAnchorArray_pop_back_0 = b.asm.Ku).apply(null, arguments)
    }),
    ex = (b._emscripten_bind_tAnchorArray___destroy___0 = function () {
      return (ex = b._emscripten_bind_tAnchorArray___destroy___0 = b.asm.Lu).apply(null, arguments)
    }),
    fx = (b._emscripten_bind_Config_get_kVCF_0 = function () {
      return (fx = b._emscripten_bind_Config_get_kVCF_0 = b.asm.Mu).apply(null, arguments)
    }),
    gx = (b._emscripten_bind_Config_set_kVCF_1 = function () {
      return (gx = b._emscripten_bind_Config_set_kVCF_1 = b.asm.Nu).apply(null, arguments)
    }),
    hx = (b._emscripten_bind_Config_get_kDP_0 = function () {
      return (hx = b._emscripten_bind_Config_get_kDP_0 = b.asm.Ou).apply(null, arguments)
    }),
    ix = (b._emscripten_bind_Config_set_kDP_1 = function () {
      return (ix = b._emscripten_bind_Config_set_kDP_1 = b.asm.Pu).apply(null, arguments)
    }),
    jx = (b._emscripten_bind_Config_get_kDG_0 = function () {
      return (jx = b._emscripten_bind_Config_get_kDG_0 = b.asm.Qu).apply(null, arguments)
    }),
    kx = (b._emscripten_bind_Config_set_kDG_1 = function () {
      return (kx = b._emscripten_bind_Config_set_kDG_1 = b.asm.Ru).apply(null, arguments)
    }),
    lx = (b._emscripten_bind_Config_get_kLF_0 = function () {
      return (lx = b._emscripten_bind_Config_get_kLF_0 = b.asm.Su).apply(null, arguments)
    }),
    mx = (b._emscripten_bind_Config_set_kLF_1 = function () {
      return (mx = b._emscripten_bind_Config_set_kLF_1 = b.asm.Tu).apply(null, arguments)
    }),
    nx = (b._emscripten_bind_Config_get_kPR_0 = function () {
      return (nx = b._emscripten_bind_Config_get_kPR_0 = b.asm.Uu).apply(null, arguments)
    }),
    ox = (b._emscripten_bind_Config_set_kPR_1 = function () {
      return (ox = b._emscripten_bind_Config_set_kPR_1 = b.asm.Vu).apply(null, arguments)
    }),
    px = (b._emscripten_bind_Config_get_kVC_0 = function () {
      return (px = b._emscripten_bind_Config_get_kVC_0 = b.asm.Wu).apply(null, arguments)
    }),
    qx = (b._emscripten_bind_Config_set_kVC_1 = function () {
      return (qx = b._emscripten_bind_Config_set_kVC_1 = b.asm.Xu).apply(null, arguments)
    }),
    rx = (b._emscripten_bind_Config_get_kDF_0 = function () {
      return (rx = b._emscripten_bind_Config_get_kDF_0 = b.asm.Yu).apply(null, arguments)
    }),
    sx = (b._emscripten_bind_Config_set_kDF_1 = function () {
      return (sx = b._emscripten_bind_Config_set_kDF_1 = b.asm.Zu).apply(null, arguments)
    }),
    tx = (b._emscripten_bind_Config_get_kMT_0 = function () {
      return (tx = b._emscripten_bind_Config_get_kMT_0 = b.asm._u).apply(null, arguments)
    }),
    ux = (b._emscripten_bind_Config_set_kMT_1 = function () {
      return (ux = b._emscripten_bind_Config_set_kMT_1 = b.asm.$u).apply(null, arguments)
    }),
    vx = (b._emscripten_bind_Config_get_kCHR_0 = function () {
      return (vx = b._emscripten_bind_Config_get_kCHR_0 = b.asm.av).apply(null, arguments)
    }),
    wx = (b._emscripten_bind_Config_set_kCHR_1 = function () {
      return (wx = b._emscripten_bind_Config_set_kCHR_1 = b.asm.bv).apply(null, arguments)
    }),
    xx = (b._emscripten_bind_Config_get_kKHR_0 = function () {
      return (xx = b._emscripten_bind_Config_get_kKHR_0 = b.asm.cv).apply(null, arguments)
    }),
    yx = (b._emscripten_bind_Config_set_kKHR_1 = function () {
      return (yx = b._emscripten_bind_Config_set_kKHR_1 = b.asm.dv).apply(null, arguments)
    }),
    zx = (b._emscripten_bind_Config_get_kSHR_0 = function () {
      return (zx = b._emscripten_bind_Config_get_kSHR_0 = b.asm.ev).apply(null, arguments)
    }),
    Ax = (b._emscripten_bind_Config_set_kSHR_1 = function () {
      return (Ax = b._emscripten_bind_Config_set_kSHR_1 = b.asm.fv).apply(null, arguments)
    }),
    Bx = (b._emscripten_bind_Config_get_kAHR_0 = function () {
      return (Bx = b._emscripten_bind_Config_get_kAHR_0 = b.asm.gv).apply(null, arguments)
    }),
    Cx = (b._emscripten_bind_Config_set_kAHR_1 = function () {
      return (Cx = b._emscripten_bind_Config_set_kAHR_1 = b.asm.hv).apply(null, arguments)
    }),
    Dx = (b._emscripten_bind_Config_get_kSRHR_CL_0 = function () {
      return (Dx = b._emscripten_bind_Config_get_kSRHR_CL_0 = b.asm.iv).apply(null, arguments)
    }),
    Ex = (b._emscripten_bind_Config_set_kSRHR_CL_1 = function () {
      return (Ex = b._emscripten_bind_Config_set_kSRHR_CL_1 = b.asm.jv).apply(null, arguments)
    }),
    Fx = (b._emscripten_bind_Config_get_kSKHR_CL_0 = function () {
      return (Fx = b._emscripten_bind_Config_get_kSKHR_CL_0 = b.asm.kv).apply(null, arguments)
    }),
    Gx = (b._emscripten_bind_Config_set_kSKHR_CL_1 = function () {
      return (Gx = b._emscripten_bind_Config_set_kSKHR_CL_1 = b.asm.lv).apply(null, arguments)
    }),
    Hx = (b._emscripten_bind_Config_get_kSSHR_CL_0 = function () {
      return (Hx = b._emscripten_bind_Config_get_kSSHR_CL_0 = b.asm.mv).apply(null, arguments)
    }),
    Ix = (b._emscripten_bind_Config_set_kSSHR_CL_1 = function () {
      return (Ix = b._emscripten_bind_Config_set_kSSHR_CL_1 = b.asm.nv).apply(null, arguments)
    }),
    Jx = (b._emscripten_bind_Config_get_kSR_SPLT_CL_0 = function () {
      return (Jx = b._emscripten_bind_Config_get_kSR_SPLT_CL_0 = b.asm.ov).apply(null, arguments)
    }),
    Kx = (b._emscripten_bind_Config_set_kSR_SPLT_CL_1 = function () {
      return (Kx = b._emscripten_bind_Config_set_kSR_SPLT_CL_1 = b.asm.pv).apply(null, arguments)
    }),
    Lx = (b._emscripten_bind_Config_get_kSK_SPLT_CL_0 = function () {
      return (Lx = b._emscripten_bind_Config_get_kSK_SPLT_CL_0 = b.asm.qv).apply(null, arguments)
    }),
    Mx = (b._emscripten_bind_Config_set_kSK_SPLT_CL_1 = function () {
      return (Mx = b._emscripten_bind_Config_set_kSK_SPLT_CL_1 = b.asm.rv).apply(null, arguments)
    }),
    Nx = (b._emscripten_bind_Config_get_kSS_SPLT_CL_0 = function () {
      return (Nx = b._emscripten_bind_Config_get_kSS_SPLT_CL_0 = b.asm.sv).apply(null, arguments)
    }),
    Ox = (b._emscripten_bind_Config_set_kSS_SPLT_CL_1 = function () {
      return (Ox = b._emscripten_bind_Config_set_kSS_SPLT_CL_1 = b.asm.tv).apply(null, arguments)
    }),
    Px = (b._emscripten_bind_Config_get_maxvolume_0 = function () {
      return (Px = b._emscripten_bind_Config_get_maxvolume_0 = b.asm.uv).apply(null, arguments)
    }),
    Qx = (b._emscripten_bind_Config_set_maxvolume_1 = function () {
      return (Qx = b._emscripten_bind_Config_set_maxvolume_1 = b.asm.vv).apply(null, arguments)
    }),
    Rx = (b._emscripten_bind_Config_get_timescale_0 = function () {
      return (Rx = b._emscripten_bind_Config_get_timescale_0 = b.asm.wv).apply(null, arguments)
    }),
    Sx = (b._emscripten_bind_Config_set_timescale_1 = function () {
      return (Sx = b._emscripten_bind_Config_set_timescale_1 = b.asm.xv).apply(null, arguments)
    }),
    Tx = (b._emscripten_bind_Config_get_viterations_0 = function () {
      return (Tx = b._emscripten_bind_Config_get_viterations_0 = b.asm.yv).apply(null, arguments)
    }),
    Ux = (b._emscripten_bind_Config_set_viterations_1 = function () {
      return (Ux = b._emscripten_bind_Config_set_viterations_1 = b.asm.zv).apply(null, arguments)
    }),
    Vx = (b._emscripten_bind_Config_get_piterations_0 = function () {
      return (Vx = b._emscripten_bind_Config_get_piterations_0 = b.asm.Av).apply(null, arguments)
    }),
    Wx = (b._emscripten_bind_Config_set_piterations_1 = function () {
      return (Wx = b._emscripten_bind_Config_set_piterations_1 = b.asm.Bv).apply(null, arguments)
    }),
    Xx = (b._emscripten_bind_Config_get_diterations_0 = function () {
      return (Xx = b._emscripten_bind_Config_get_diterations_0 = b.asm.Cv).apply(null, arguments)
    }),
    Yx = (b._emscripten_bind_Config_set_diterations_1 = function () {
      return (Yx = b._emscripten_bind_Config_set_diterations_1 = b.asm.Dv).apply(null, arguments)
    }),
    Zx = (b._emscripten_bind_Config_get_citerations_0 = function () {
      return (Zx = b._emscripten_bind_Config_get_citerations_0 = b.asm.Ev).apply(null, arguments)
    }),
    $x = (b._emscripten_bind_Config_set_citerations_1 = function () {
      return ($x = b._emscripten_bind_Config_set_citerations_1 = b.asm.Fv).apply(null, arguments)
    }),
    ay = (b._emscripten_bind_Config_get_collisions_0 = function () {
      return (ay = b._emscripten_bind_Config_get_collisions_0 = b.asm.Gv).apply(null, arguments)
    }),
    by = (b._emscripten_bind_Config_set_collisions_1 = function () {
      return (by = b._emscripten_bind_Config_set_collisions_1 = b.asm.Hv).apply(null, arguments)
    }),
    cy = (b._emscripten_bind_Config___destroy___0 = function () {
      return (cy = b._emscripten_bind_Config___destroy___0 = b.asm.Iv).apply(null, arguments)
    }),
    dy = (b._emscripten_bind_btSoftBody_btSoftBody_4 = function () {
      return (dy = b._emscripten_bind_btSoftBody_btSoftBody_4 = b.asm.Jv).apply(null, arguments)
    }),
    ey = (b._emscripten_bind_btSoftBody_checkLink_2 = function () {
      return (ey = b._emscripten_bind_btSoftBody_checkLink_2 = b.asm.Kv).apply(null, arguments)
    }),
    fy = (b._emscripten_bind_btSoftBody_checkFace_3 = function () {
      return (fy = b._emscripten_bind_btSoftBody_checkFace_3 = b.asm.Lv).apply(null, arguments)
    }),
    gy = (b._emscripten_bind_btSoftBody_appendMaterial_0 = function () {
      return (gy = b._emscripten_bind_btSoftBody_appendMaterial_0 = b.asm.Mv).apply(null, arguments)
    }),
    hy = (b._emscripten_bind_btSoftBody_appendNode_2 = function () {
      return (hy = b._emscripten_bind_btSoftBody_appendNode_2 = b.asm.Nv).apply(null, arguments)
    }),
    iy = (b._emscripten_bind_btSoftBody_appendLink_4 = function () {
      return (iy = b._emscripten_bind_btSoftBody_appendLink_4 = b.asm.Ov).apply(null, arguments)
    }),
    jy = (b._emscripten_bind_btSoftBody_appendFace_4 = function () {
      return (jy = b._emscripten_bind_btSoftBody_appendFace_4 = b.asm.Pv).apply(null, arguments)
    }),
    ky = (b._emscripten_bind_btSoftBody_appendTetra_5 = function () {
      return (ky = b._emscripten_bind_btSoftBody_appendTetra_5 = b.asm.Qv).apply(null, arguments)
    }),
    ly = (b._emscripten_bind_btSoftBody_appendAnchor_4 = function () {
      return (ly = b._emscripten_bind_btSoftBody_appendAnchor_4 = b.asm.Rv).apply(null, arguments)
    }),
    my = (b._emscripten_bind_btSoftBody_addForce_1 = function () {
      return (my = b._emscripten_bind_btSoftBody_addForce_1 = b.asm.Sv).apply(null, arguments)
    }),
    ny = (b._emscripten_bind_btSoftBody_addForce_2 = function () {
      return (ny = b._emscripten_bind_btSoftBody_addForce_2 = b.asm.Tv).apply(null, arguments)
    }),
    oy = (b._emscripten_bind_btSoftBody_addAeroForceToNode_2 = function () {
      return (oy = b._emscripten_bind_btSoftBody_addAeroForceToNode_2 = b.asm.Uv).apply(
        null,
        arguments
      )
    }),
    py = (b._emscripten_bind_btSoftBody_getTotalMass_0 = function () {
      return (py = b._emscripten_bind_btSoftBody_getTotalMass_0 = b.asm.Vv).apply(null, arguments)
    }),
    qy = (b._emscripten_bind_btSoftBody_setTotalMass_2 = function () {
      return (qy = b._emscripten_bind_btSoftBody_setTotalMass_2 = b.asm.Wv).apply(null, arguments)
    }),
    ry = (b._emscripten_bind_btSoftBody_setMass_2 = function () {
      return (ry = b._emscripten_bind_btSoftBody_setMass_2 = b.asm.Xv).apply(null, arguments)
    }),
    sy = (b._emscripten_bind_btSoftBody_transform_1 = function () {
      return (sy = b._emscripten_bind_btSoftBody_transform_1 = b.asm.Yv).apply(null, arguments)
    }),
    ty = (b._emscripten_bind_btSoftBody_translate_1 = function () {
      return (ty = b._emscripten_bind_btSoftBody_translate_1 = b.asm.Zv).apply(null, arguments)
    }),
    uy = (b._emscripten_bind_btSoftBody_rotate_1 = function () {
      return (uy = b._emscripten_bind_btSoftBody_rotate_1 = b.asm._v).apply(null, arguments)
    }),
    vy = (b._emscripten_bind_btSoftBody_scale_1 = function () {
      return (vy = b._emscripten_bind_btSoftBody_scale_1 = b.asm.$v).apply(null, arguments)
    }),
    wy = (b._emscripten_bind_btSoftBody_generateClusters_1 = function () {
      return (wy = b._emscripten_bind_btSoftBody_generateClusters_1 = b.asm.aw).apply(
        null,
        arguments
      )
    }),
    xy = (b._emscripten_bind_btSoftBody_generateClusters_2 = function () {
      return (xy = b._emscripten_bind_btSoftBody_generateClusters_2 = b.asm.bw).apply(
        null,
        arguments
      )
    }),
    yy = (b._emscripten_bind_btSoftBody_generateBendingConstraints_2 = function () {
      return (yy = b._emscripten_bind_btSoftBody_generateBendingConstraints_2 = b.asm.cw).apply(
        null,
        arguments
      )
    }),
    zy = (b._emscripten_bind_btSoftBody_upcast_1 = function () {
      return (zy = b._emscripten_bind_btSoftBody_upcast_1 = b.asm.dw).apply(null, arguments)
    }),
    Ay = (b._emscripten_bind_btSoftBody_getRestLengthScale_0 = function () {
      return (Ay = b._emscripten_bind_btSoftBody_getRestLengthScale_0 = b.asm.ew).apply(
        null,
        arguments
      )
    }),
    By = (b._emscripten_bind_btSoftBody_setRestLengthScale_1 = function () {
      return (By = b._emscripten_bind_btSoftBody_setRestLengthScale_1 = b.asm.fw).apply(
        null,
        arguments
      )
    }),
    Cy = (b._emscripten_bind_btSoftBody_setAnisotropicFriction_2 = function () {
      return (Cy = b._emscripten_bind_btSoftBody_setAnisotropicFriction_2 = b.asm.gw).apply(
        null,
        arguments
      )
    }),
    Dy = (b._emscripten_bind_btSoftBody_getCollisionShape_0 = function () {
      return (Dy = b._emscripten_bind_btSoftBody_getCollisionShape_0 = b.asm.hw).apply(
        null,
        arguments
      )
    }),
    Ey = (b._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 = function () {
      return (Ey = b._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 = b.asm.iw).apply(
        null,
        arguments
      )
    }),
    Fy = (b._emscripten_bind_btSoftBody_setActivationState_1 = function () {
      return (Fy = b._emscripten_bind_btSoftBody_setActivationState_1 = b.asm.jw).apply(
        null,
        arguments
      )
    }),
    Gy = (b._emscripten_bind_btSoftBody_forceActivationState_1 = function () {
      return (Gy = b._emscripten_bind_btSoftBody_forceActivationState_1 = b.asm.kw).apply(
        null,
        arguments
      )
    }),
    Hy = (b._emscripten_bind_btSoftBody_activate_0 = function () {
      return (Hy = b._emscripten_bind_btSoftBody_activate_0 = b.asm.lw).apply(null, arguments)
    }),
    Iy = (b._emscripten_bind_btSoftBody_activate_1 = function () {
      return (Iy = b._emscripten_bind_btSoftBody_activate_1 = b.asm.mw).apply(null, arguments)
    }),
    Jy = (b._emscripten_bind_btSoftBody_isActive_0 = function () {
      return (Jy = b._emscripten_bind_btSoftBody_isActive_0 = b.asm.nw).apply(null, arguments)
    }),
    Ky = (b._emscripten_bind_btSoftBody_isKinematicObject_0 = function () {
      return (Ky = b._emscripten_bind_btSoftBody_isKinematicObject_0 = b.asm.ow).apply(
        null,
        arguments
      )
    }),
    Ly = (b._emscripten_bind_btSoftBody_isStaticObject_0 = function () {
      return (Ly = b._emscripten_bind_btSoftBody_isStaticObject_0 = b.asm.pw).apply(null, arguments)
    }),
    My = (b._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 = function () {
      return (My = b._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 = b.asm.qw).apply(
        null,
        arguments
      )
    }),
    Ny = (b._emscripten_bind_btSoftBody_getRestitution_0 = function () {
      return (Ny = b._emscripten_bind_btSoftBody_getRestitution_0 = b.asm.rw).apply(null, arguments)
    }),
    Oy = (b._emscripten_bind_btSoftBody_getFriction_0 = function () {
      return (Oy = b._emscripten_bind_btSoftBody_getFriction_0 = b.asm.sw).apply(null, arguments)
    }),
    Py = (b._emscripten_bind_btSoftBody_getRollingFriction_0 = function () {
      return (Py = b._emscripten_bind_btSoftBody_getRollingFriction_0 = b.asm.tw).apply(
        null,
        arguments
      )
    }),
    Qy = (b._emscripten_bind_btSoftBody_setRestitution_1 = function () {
      return (Qy = b._emscripten_bind_btSoftBody_setRestitution_1 = b.asm.uw).apply(null, arguments)
    }),
    Ry = (b._emscripten_bind_btSoftBody_setFriction_1 = function () {
      return (Ry = b._emscripten_bind_btSoftBody_setFriction_1 = b.asm.vw).apply(null, arguments)
    }),
    Sy = (b._emscripten_bind_btSoftBody_setRollingFriction_1 = function () {
      return (Sy = b._emscripten_bind_btSoftBody_setRollingFriction_1 = b.asm.ww).apply(
        null,
        arguments
      )
    }),
    Ty = (b._emscripten_bind_btSoftBody_getWorldTransform_0 = function () {
      return (Ty = b._emscripten_bind_btSoftBody_getWorldTransform_0 = b.asm.xw).apply(
        null,
        arguments
      )
    }),
    Uy = (b._emscripten_bind_btSoftBody_getCollisionFlags_0 = function () {
      return (Uy = b._emscripten_bind_btSoftBody_getCollisionFlags_0 = b.asm.yw).apply(
        null,
        arguments
      )
    }),
    Vy = (b._emscripten_bind_btSoftBody_setCollisionFlags_1 = function () {
      return (Vy = b._emscripten_bind_btSoftBody_setCollisionFlags_1 = b.asm.zw).apply(
        null,
        arguments
      )
    }),
    Wy = (b._emscripten_bind_btSoftBody_setWorldTransform_1 = function () {
      return (Wy = b._emscripten_bind_btSoftBody_setWorldTransform_1 = b.asm.Aw).apply(
        null,
        arguments
      )
    }),
    Xy = (b._emscripten_bind_btSoftBody_setCollisionShape_1 = function () {
      return (Xy = b._emscripten_bind_btSoftBody_setCollisionShape_1 = b.asm.Bw).apply(
        null,
        arguments
      )
    }),
    Yy = (b._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 = function () {
      return (Yy = b._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 = b.asm.Cw).apply(
        null,
        arguments
      )
    }),
    Zy = (b._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 = function () {
      return (Zy = b._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 = b.asm.Dw).apply(
        null,
        arguments
      )
    }),
    $y = (b._emscripten_bind_btSoftBody_getUserIndex_0 = function () {
      return ($y = b._emscripten_bind_btSoftBody_getUserIndex_0 = b.asm.Ew).apply(null, arguments)
    }),
    az = (b._emscripten_bind_btSoftBody_setUserIndex_1 = function () {
      return (az = b._emscripten_bind_btSoftBody_setUserIndex_1 = b.asm.Fw).apply(null, arguments)
    }),
    bz = (b._emscripten_bind_btSoftBody_getUserPointer_0 = function () {
      return (bz = b._emscripten_bind_btSoftBody_getUserPointer_0 = b.asm.Gw).apply(null, arguments)
    }),
    cz = (b._emscripten_bind_btSoftBody_setUserPointer_1 = function () {
      return (cz = b._emscripten_bind_btSoftBody_setUserPointer_1 = b.asm.Hw).apply(null, arguments)
    }),
    dz = (b._emscripten_bind_btSoftBody_getBroadphaseHandle_0 = function () {
      return (dz = b._emscripten_bind_btSoftBody_getBroadphaseHandle_0 = b.asm.Iw).apply(
        null,
        arguments
      )
    }),
    ez = (b._emscripten_bind_btSoftBody_get_m_cfg_0 = function () {
      return (ez = b._emscripten_bind_btSoftBody_get_m_cfg_0 = b.asm.Jw).apply(null, arguments)
    }),
    fz = (b._emscripten_bind_btSoftBody_set_m_cfg_1 = function () {
      return (fz = b._emscripten_bind_btSoftBody_set_m_cfg_1 = b.asm.Kw).apply(null, arguments)
    }),
    gz = (b._emscripten_bind_btSoftBody_get_m_nodes_0 = function () {
      return (gz = b._emscripten_bind_btSoftBody_get_m_nodes_0 = b.asm.Lw).apply(null, arguments)
    }),
    hz = (b._emscripten_bind_btSoftBody_set_m_nodes_1 = function () {
      return (hz = b._emscripten_bind_btSoftBody_set_m_nodes_1 = b.asm.Mw).apply(null, arguments)
    }),
    iz = (b._emscripten_bind_btSoftBody_get_m_faces_0 = function () {
      return (iz = b._emscripten_bind_btSoftBody_get_m_faces_0 = b.asm.Nw).apply(null, arguments)
    }),
    jz = (b._emscripten_bind_btSoftBody_set_m_faces_1 = function () {
      return (jz = b._emscripten_bind_btSoftBody_set_m_faces_1 = b.asm.Ow).apply(null, arguments)
    }),
    kz = (b._emscripten_bind_btSoftBody_get_m_materials_0 = function () {
      return (kz = b._emscripten_bind_btSoftBody_get_m_materials_0 = b.asm.Pw).apply(
        null,
        arguments
      )
    }),
    lz = (b._emscripten_bind_btSoftBody_set_m_materials_1 = function () {
      return (lz = b._emscripten_bind_btSoftBody_set_m_materials_1 = b.asm.Qw).apply(
        null,
        arguments
      )
    }),
    mz = (b._emscripten_bind_btSoftBody_get_m_anchors_0 = function () {
      return (mz = b._emscripten_bind_btSoftBody_get_m_anchors_0 = b.asm.Rw).apply(null, arguments)
    }),
    nz = (b._emscripten_bind_btSoftBody_set_m_anchors_1 = function () {
      return (nz = b._emscripten_bind_btSoftBody_set_m_anchors_1 = b.asm.Sw).apply(null, arguments)
    }),
    oz = (b._emscripten_bind_btSoftBody___destroy___0 = function () {
      return (oz = b._emscripten_bind_btSoftBody___destroy___0 = b.asm.Tw).apply(null, arguments)
    }),
    pz =
      (b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 =
        function () {
          return (pz =
            b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 =
              b.asm.Uw).apply(null, arguments)
        }),
    qz =
      (b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 =
        function () {
          return (qz =
            b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 =
              b.asm.Vw).apply(null, arguments)
        }),
    rz = (b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 = function () {
      return (rz = b._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 =
        b.asm.Ww).apply(null, arguments)
    }),
    sz = (b._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 = function () {
      return (sz = b._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 =
        b.asm.Xw).apply(null, arguments)
    }),
    tz = (b._emscripten_bind_btDefaultSoftBodySolver___destroy___0 = function () {
      return (tz = b._emscripten_bind_btDefaultSoftBodySolver___destroy___0 = b.asm.Yw).apply(
        null,
        arguments
      )
    }),
    uz = (b._emscripten_bind_btSoftBodyArray_size_0 = function () {
      return (uz = b._emscripten_bind_btSoftBodyArray_size_0 = b.asm.Zw).apply(null, arguments)
    }),
    vz = (b._emscripten_bind_btSoftBodyArray_at_1 = function () {
      return (vz = b._emscripten_bind_btSoftBodyArray_at_1 = b.asm._w).apply(null, arguments)
    }),
    wz = (b._emscripten_bind_btSoftBodyArray___destroy___0 = function () {
      return (wz = b._emscripten_bind_btSoftBodyArray___destroy___0 = b.asm.$w).apply(
        null,
        arguments
      )
    }),
    xz = (b._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 = function () {
      return (xz = b._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 =
        b.asm.ax).apply(null, arguments)
    }),
    yz = (b._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 = function () {
      return (yz = b._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 = b.asm.bx).apply(
        null,
        arguments
      )
    }),
    zz = (b._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 = function () {
      return (zz = b._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 = b.asm.cx).apply(
        null,
        arguments
      )
    }),
    Az = (b._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 = function () {
      return (Az = b._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 =
        b.asm.dx).apply(null, arguments)
    }),
    Bz = (b._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 = function () {
      return (Bz = b._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 = b.asm.ex).apply(
        null,
        arguments
      )
    }),
    Cz = (b._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 = function () {
      return (Cz = b._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 = b.asm.fx).apply(
        null,
        arguments
      )
    }),
    Dz = (b._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 = function () {
      return (Dz = b._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 = b.asm.gx).apply(
        null,
        arguments
      )
    }),
    Ez = (b._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 = function () {
      return (Ez = b._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 = b.asm.hx).apply(
        null,
        arguments
      )
    }),
    Fz = (b._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 = function () {
      return (Fz = b._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 = b.asm.ix).apply(
        null,
        arguments
      )
    }),
    Gz = (b._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 = function () {
      return (Gz = b._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 = b.asm.jx).apply(
        null,
        arguments
      )
    }),
    Hz = (b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 = function () {
      return (Hz = b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 =
        b.asm.kx).apply(null, arguments)
    }),
    Iz = (b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 = function () {
      return (Iz = b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 =
        b.asm.lx).apply(null, arguments)
    }),
    Jz = (b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 = function () {
      return (Jz = b._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 =
        b.asm.mx).apply(null, arguments)
    }),
    Kz = (b._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 = function () {
      return (Kz = b._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 = b.asm.nx).apply(
        null,
        arguments
      )
    }),
    Lz = (b._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 = function () {
      return (Lz = b._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 = b.asm.ox).apply(
        null,
        arguments
      )
    }),
    Mz = (b._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 = function () {
      return (Mz = b._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 = b.asm.px).apply(
        null,
        arguments
      )
    }),
    Nz = (b._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 = function () {
      return (Nz = b._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 = b.asm.qx).apply(
        null,
        arguments
      )
    }),
    Oz = (b._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 = function () {
      return (Oz = b._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 = b.asm.rx).apply(
        null,
        arguments
      )
    }),
    Pz = (b._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 = function () {
      return (Pz = b._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 = b.asm.sx).apply(
        null,
        arguments
      )
    }),
    Qz = (b._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 = function () {
      return (Qz = b._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 = b.asm.tx).apply(
        null,
        arguments
      )
    }),
    Rz = (b._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 = function () {
      return (Rz = b._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 = b.asm.ux).apply(
        null,
        arguments
      )
    }),
    Sz = (b._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 = function () {
      return (Sz = b._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 = b.asm.vx).apply(
        null,
        arguments
      )
    }),
    Tz = (b._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 = function () {
      return (Tz = b._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 = b.asm.wx).apply(
        null,
        arguments
      )
    }),
    Uz = (b._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 = function () {
      return (Uz = b._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 = b.asm.xx).apply(
        null,
        arguments
      )
    }),
    Vz = (b._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 = function () {
      return (Vz = b._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 = b.asm.yx).apply(
        null,
        arguments
      )
    }),
    Wz = (b._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 = function () {
      return (Wz = b._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 = b.asm.zx).apply(
        null,
        arguments
      )
    }),
    Xz = (b._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 = function () {
      return (Xz = b._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 = b.asm.Ax).apply(
        null,
        arguments
      )
    }),
    Yz = (b._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 = function () {
      return (Yz = b._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 = b.asm.Bx).apply(
        null,
        arguments
      )
    }),
    Zz = (b._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 = function () {
      return (Zz = b._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 = b.asm.Cx).apply(
        null,
        arguments
      )
    }),
    $z = (b._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 = function () {
      return ($z = b._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 = b.asm.Dx).apply(
        null,
        arguments
      )
    }),
    aA = (b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 = function () {
      return (aA = b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 = b.asm.Ex).apply(
        null,
        arguments
      )
    }),
    bA = (b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 = function () {
      return (bA = b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 = b.asm.Fx).apply(
        null,
        arguments
      )
    }),
    cA = (b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 = function () {
      return (cA = b._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 = b.asm.Gx).apply(
        null,
        arguments
      )
    }),
    dA = (b._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 = function () {
      return (dA = b._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 =
        b.asm.Hx).apply(null, arguments)
    }),
    eA = (b._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 = function () {
      return (eA = b._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 =
        b.asm.Ix).apply(null, arguments)
    }),
    fA = (b._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 = function () {
      return (fA = b._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 =
        b.asm.Jx).apply(null, arguments)
    }),
    gA = (b._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 = function () {
      return (gA = b._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 = b.asm.Kx).apply(
        null,
        arguments
      )
    }),
    hA = (b._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 = function () {
      return (hA = b._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 = b.asm.Lx).apply(
        null,
        arguments
      )
    }),
    iA = (b._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 = function () {
      return (iA = b._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 = b.asm.Mx).apply(
        null,
        arguments
      )
    }),
    jA = (b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_1 = function () {
      return (jA = b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_1 =
        b.asm.Nx).apply(null, arguments)
    }),
    kA = (b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_2 = function () {
      return (kA = b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_2 =
        b.asm.Ox).apply(null, arguments)
    }),
    lA = (b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_3 = function () {
      return (lA = b._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_3 =
        b.asm.Px).apply(null, arguments)
    }),
    mA = (b._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 = function () {
      return (mA = b._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 = b.asm.Qx).apply(
        null,
        arguments
      )
    }),
    nA = (b._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 = function () {
      return (nA = b._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 = b.asm.Rx).apply(
        null,
        arguments
      )
    }),
    oA = (b._emscripten_bind_btSoftBodyHelpers_CreateRope_5 = function () {
      return (oA = b._emscripten_bind_btSoftBodyHelpers_CreateRope_5 = b.asm.Sx).apply(
        null,
        arguments
      )
    }),
    pA = (b._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 = function () {
      return (pA = b._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 = b.asm.Tx).apply(
        null,
        arguments
      )
    }),
    qA = (b._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 = function () {
      return (qA = b._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 = b.asm.Ux).apply(
        null,
        arguments
      )
    }),
    rA = (b._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 = function () {
      return (rA = b._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 = b.asm.Vx).apply(
        null,
        arguments
      )
    }),
    sA = (b._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 = function () {
      return (sA = b._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 = b.asm.Wx).apply(
        null,
        arguments
      )
    }),
    tA = (b._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 = function () {
      return (tA = b._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 = b.asm.Xx).apply(
        null,
        arguments
      )
    }),
    uA = (b._emscripten_bind_btSoftBodyHelpers___destroy___0 = function () {
      return (uA = b._emscripten_bind_btSoftBodyHelpers___destroy___0 = b.asm.Yx).apply(
        null,
        arguments
      )
    }),
    vA = (b._emscripten_enum_PHY_ScalarType_PHY_FLOAT = function () {
      return (vA = b._emscripten_enum_PHY_ScalarType_PHY_FLOAT = b.asm.Zx).apply(null, arguments)
    }),
    wA = (b._emscripten_enum_PHY_ScalarType_PHY_DOUBLE = function () {
      return (wA = b._emscripten_enum_PHY_ScalarType_PHY_DOUBLE = b.asm._x).apply(null, arguments)
    }),
    xA = (b._emscripten_enum_PHY_ScalarType_PHY_INTEGER = function () {
      return (xA = b._emscripten_enum_PHY_ScalarType_PHY_INTEGER = b.asm.$x).apply(null, arguments)
    }),
    yA = (b._emscripten_enum_PHY_ScalarType_PHY_SHORT = function () {
      return (yA = b._emscripten_enum_PHY_ScalarType_PHY_SHORT = b.asm.ay).apply(null, arguments)
    }),
    zA = (b._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = function () {
      return (zA = b._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = b.asm.by).apply(
        null,
        arguments
      )
    }),
    AA = (b._emscripten_enum_PHY_ScalarType_PHY_UCHAR = function () {
      return (AA = b._emscripten_enum_PHY_ScalarType_PHY_UCHAR = b.asm.cy).apply(null, arguments)
    }),
    BA = (b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = function () {
      return (BA = b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = b.asm.dy).apply(
        null,
        arguments
      )
    }),
    CA = (b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = function () {
      return (CA = b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = b.asm.ey).apply(
        null,
        arguments
      )
    }),
    DA = (b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM = function () {
      return (DA = b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM = b.asm.fy).apply(
        null,
        arguments
      )
    }),
    EA = (b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM = function () {
      return (EA = b._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM = b.asm.gy).apply(
        null,
        arguments
      )
    })
  b._malloc = function () {
    return (b._malloc = b.asm.hy).apply(null, arguments)
  }
  b._free = function () {
    return (b._free = b.asm.iy).apply(null, arguments)
  }
  b.dynCall_vi = function () {
    return (b.dynCall_vi = b.asm.jy).apply(null, arguments)
  }
  b.dynCall_v = function () {
    return (b.dynCall_v = b.asm.ky).apply(null, arguments)
  }
  b.UTF8ToString = function (a, c) {
    if (a) {
      let d = a + c
      for (c = a; Aa[c] && !(c >= d); ) ++c
      if (16 < c - a && Aa.subarray && xa) a = xa.decode(Aa.subarray(a, c))
      else {
        for (d = ''; a < c; ) {
          let e = Aa[a++]
          if (e & 128) {
            const g = Aa[a++] & 63
            if (192 == (e & 224)) d += String.fromCharCode(((e & 31) << 6) | g)
            else {
              const n = Aa[a++] & 63
              e =
                224 == (e & 240)
                  ? ((e & 15) << 12) | (g << 6) | n
                  : ((e & 7) << 18) | (g << 12) | (n << 6) | (Aa[a++] & 63)
              65536 > e
                ? (d += String.fromCharCode(e))
                : ((e -= 65536), (d += String.fromCharCode(55296 | (e >> 10), 56320 | (e & 1023))))
            }
          } else d += String.fromCharCode(e)
        }
        a = d
      }
    } else a = ''
    return a
  }
  b.addFunction = function (a, c) {
    if (!ra) {
      ra = new WeakMap()
      for (var d = 0; d < ua.length; d++) {
        var e = ua.get(d)
        e && ra.set(e, d)
      }
    }
    if (ra.has(a)) a = ra.get(a)
    else {
      if (qa.length) d = qa.pop()
      else {
        d = ua.length
        try {
          ua.grow(1)
        } catch (R) {
          if (!(R instanceof RangeError)) throw R
          throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.'
        }
      }
      try {
        ua.set(d, a)
      } catch (R) {
        if (!(R instanceof TypeError)) throw R
        if ('function' === typeof WebAssembly.Function) {
          var g = { i: 'i32', j: 'i64', f: 'f32', d: 'f64' },
            n = { parameters: [], results: 'v' == c[0] ? [] : [g[c[0]]] }
          for (e = 1; e < c.length; ++e) n.parameters.push(g[c[e]])
          c = new WebAssembly.Function(n, a)
        } else {
          g = [1, 0, 1, 96]
          n = c.slice(0, 1)
          c = c.slice(1)
          const D = { i: 127, j: 126, f: 125, d: 124 }
          g.push(c.length)
          for (e = 0; e < c.length; ++e) g.push(D[c[e]])
          'v' == n ? g.push(0) : (g = g.concat([1, D[n]]))
          g[1] = g.length - 2
          c = new Uint8Array(
            [0, 97, 115, 109, 1, 0, 0, 0].concat(
              g,
              [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0]
            )
          )
          c = new WebAssembly.Module(c)
          c = new WebAssembly.Instance(c, { e: { f: a } }).exports.f
        }
        ua.set(d, c)
      }
      ra.set(a, d)
      a = d
    }
    return a
  }
  let FA
  Pa = function GA() {
    FA || HA()
    FA || (Pa = GA)
  }
  function HA() {
    function a() {
      if (!FA && ((FA = !0), (b.calledRun = !0), !wa)) {
        La = !0
        Ga(Ia)
        Ga(Ja)
        aa(b)
        if (b.onRuntimeInitialized) b.onRuntimeInitialized()
        if (b.postRun)
          for ('function' == typeof b.postRun && (b.postRun = [b.postRun]); b.postRun.length; ) {
            const c = b.postRun.shift()
            Ka.unshift(c)
          }
        Ga(Ka)
      }
    }
    if (!(0 < Na)) {
      if (b.preRun)
        for ('function' == typeof b.preRun && (b.preRun = [b.preRun]); b.preRun.length; ) Ma()
      Ga(Ha)
      0 < Na ||
        (b.setStatus
          ? (b.setStatus('Running...'),
            setTimeout(function () {
              setTimeout(function () {
                b.setStatus('')
              }, 1)
              a()
            }, 1))
          : a())
    }
  }
  b.run = HA
  if (b.preInit)
    for ('function' == typeof b.preInit && (b.preInit = [b.preInit]); 0 < b.preInit.length; )
      b.preInit.pop()()
  noExitRuntime = !0
  HA()
  function f() {}
  f.prototype = Object.create(f.prototype)
  f.prototype.constructor = f
  f.prototype.my = f
  f.ny = {}
  b.WrapperObject = f
  function h(a) {
    return (a || f).ny
  }
  b.getCache = h
  function k(a, c) {
    let d = h(c),
      e = d[a]
    if (e) return e
    e = Object.create((c || f).prototype)
    e.ly = a
    return (d[a] = e)
  }
  b.wrapPointer = k
  b.castObject = function (a, c) {
    return k(a.ly, c)
  }
  b.NULL = k(0)
  b.destroy = function (a) {
    if (!a.__destroy__) throw 'Error: Cannot destroy object. (Did you create it yourself?)'
    a.__destroy__()
    delete h(a.my)[a.ly]
  }
  b.compare = function (a, c) {
    return a.ly === c.ly
  }
  b.getPointer = function (a) {
    return a.ly
  }
  b.getClass = function (a) {
    return a.my
  }
  let IA = 0,
    JA = 0,
    KA = 0,
    LA = [],
    MA = 0
  function NA() {
    if (MA) {
      for (let a = 0; a < LA.length; a++) b._free(LA[a])
      LA.length = 0
      b._free(IA)
      IA = 0
      JA += MA
      MA = 0
    }
    IA || ((JA += 128), (IA = b._malloc(JA)), assert(IA))
    KA = 0
  }
  function OA(a, c) {
    assert(IA)
    a = a.length * c.BYTES_PER_ELEMENT
    a = (a + 7) & -8
    KA + a >= JA
      ? (assert(0 < a), (MA += a), (c = b._malloc(a)), LA.push(c))
      : ((c = IA + KA), (KA += a))
    return c
  }
  function PA(a, c, d) {
    d >>>= 0
    switch (c.BYTES_PER_ELEMENT) {
      case 2:
        d >>>= 1
        break
      case 4:
        d >>>= 2
        break
      case 8:
        d >>>= 3
    }
    for (let e = 0; e < a.length; e++) c[d + e] = a[e]
  }
  function QA(a) {
    if ('string' === typeof a) {
      for (var c = 0, d = 0; d < a.length; ++d) {
        var e = a.charCodeAt(d)
        55296 <= e && 57343 >= e && (e = (65536 + ((e & 1023) << 10)) | (a.charCodeAt(++d) & 1023))
        127 >= e ? ++c : (c = 2047 >= e ? c + 2 : 65535 >= e ? c + 3 : c + 4)
      }
      c = Array(c + 1)
      e = c.length
      d = 0
      if (0 < e) {
        e = d + e - 1
        for (let g = 0; g < a.length; ++g) {
          let n = a.charCodeAt(g)
          if (55296 <= n && 57343 >= n) {
            const D = a.charCodeAt(++g)
            n = (65536 + ((n & 1023) << 10)) | (D & 1023)
          }
          if (127 >= n) {
            if (d >= e) break
            c[d++] = n
          } else {
            if (2047 >= n) {
              if (d + 1 >= e) break
              c[d++] = 192 | (n >> 6)
            } else {
              if (65535 >= n) {
                if (d + 2 >= e) break
                c[d++] = 224 | (n >> 12)
              } else {
                if (d + 3 >= e) break
                c[d++] = 240 | (n >> 18)
                c[d++] = 128 | ((n >> 12) & 63)
              }
              c[d++] = 128 | ((n >> 6) & 63)
            }
            c[d++] = 128 | (n & 63)
          }
        }
        c[d] = 0
      }
      a = OA(c, za)
      PA(c, za, a)
    }
    return a
  }
  function RA(a) {
    if ('object' === typeof a) {
      const c = OA(a, Ca)
      PA(a, Ca, c)
      return c
    }
    return a
  }
  function l() {
    throw 'cannot construct a btCollisionShape, no constructor in IDL'
  }
  l.prototype = Object.create(f.prototype)
  l.prototype.constructor = l
  l.prototype.my = l
  l.ny = {}
  b.btCollisionShape = l
  l.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ab(c, a)
  }
  l.prototype.getLocalScaling = function () {
    return k(bb(this.ly), m)
  }
  l.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    cb(d, a, c)
  }
  l.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    db(c, a)
  }
  l.prototype.getMargin = function () {
    return eb(this.ly)
  }
  l.prototype.__destroy__ = function () {
    fb(this.ly)
  }
  function SA() {
    throw 'cannot construct a btCollisionWorld, no constructor in IDL'
  }
  SA.prototype = Object.create(f.prototype)
  SA.prototype.constructor = SA
  SA.prototype.my = SA
  SA.ny = {}
  b.btCollisionWorld = SA
  SA.prototype.getDispatcher = function () {
    return k(gb(this.ly), TA)
  }
  SA.prototype.rayTest = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    hb(e, a, c, d)
  }
  SA.prototype.getPairCache = function () {
    return k(ib(this.ly), UA)
  }
  SA.prototype.getDispatchInfo = function () {
    return k(jb(this.ly), p)
  }
  SA.prototype.addCollisionObject = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    void 0 === c ? kb(e, a) : void 0 === d ? lb(e, a, c) : mb(e, a, c, d)
  }
  SA.prototype.removeCollisionObject = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    nb(c, a)
  }
  SA.prototype.getBroadphase = function () {
    return k(ob(this.ly), VA)
  }
  SA.prototype.convexSweepTest = function (a, c, d, e, g) {
    const n = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    pb(n, a, c, d, e, g)
  }
  SA.prototype.contactPairTest = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    qb(e, a, c, d)
  }
  SA.prototype.contactTest = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    rb(d, a, c)
  }
  SA.prototype.updateSingleAabb = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    sb(c, a)
  }
  SA.prototype.setDebugDrawer = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    tb(c, a)
  }
  SA.prototype.getDebugDrawer = function () {
    return k(ub(this.ly), WA)
  }
  SA.prototype.debugDrawWorld = function () {
    vb(this.ly)
  }
  SA.prototype.debugDrawObject = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    wb(e, a, c, d)
  }
  SA.prototype.__destroy__ = function () {
    xb(this.ly)
  }
  function q() {
    throw 'cannot construct a btCollisionObject, no constructor in IDL'
  }
  q.prototype = Object.create(f.prototype)
  q.prototype.constructor = q
  q.prototype.my = q
  q.ny = {}
  b.btCollisionObject = q
  q.prototype.setAnisotropicFriction = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    yb(d, a, c)
  }
  q.prototype.getCollisionShape = function () {
    return k(zb(this.ly), l)
  }
  q.prototype.setContactProcessingThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ab(c, a)
  }
  q.prototype.setActivationState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Bb(c, a)
  }
  q.prototype.forceActivationState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Cb(c, a)
  }
  q.prototype.activate = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    void 0 === a ? Db(c) : Eb(c, a)
  }
  q.prototype.isActive = function () {
    return !!Fb(this.ly)
  }
  q.prototype.isKinematicObject = function () {
    return !!Gb(this.ly)
  }
  q.prototype.isStaticObject = function () {
    return !!Hb(this.ly)
  }
  q.prototype.isStaticOrKinematicObject = function () {
    return !!Ib(this.ly)
  }
  q.prototype.getRestitution = function () {
    return Jb(this.ly)
  }
  q.prototype.getFriction = function () {
    return Kb(this.ly)
  }
  q.prototype.getRollingFriction = function () {
    return Lb(this.ly)
  }
  q.prototype.setRestitution = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mb(c, a)
  }
  q.prototype.setFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Nb(c, a)
  }
  q.prototype.setRollingFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ob(c, a)
  }
  q.prototype.getWorldTransform = function () {
    return k(Pb(this.ly), r)
  }
  q.prototype.getCollisionFlags = function () {
    return Qb(this.ly)
  }
  q.prototype.setCollisionFlags = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Rb(c, a)
  }
  q.prototype.setWorldTransform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Sb(c, a)
  }
  q.prototype.setCollisionShape = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ub(c, a)
  }
  q.prototype.setCcdMotionThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Vb(c, a)
  }
  q.prototype.setCcdSweptSphereRadius = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Wb(c, a)
  }
  q.prototype.getUserIndex = function () {
    return Xb(this.ly)
  }
  q.prototype.setUserIndex = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yb(c, a)
  }
  q.prototype.getUserPointer = function () {
    return k(Zb(this.ly), XA)
  }
  q.prototype.setUserPointer = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    $b(c, a)
  }
  q.prototype.getBroadphaseHandle = function () {
    return k(ac(this.ly), t)
  }
  q.prototype.__destroy__ = function () {
    bc(this.ly)
  }
  function YA() {
    throw 'cannot construct a btConcaveShape, no constructor in IDL'
  }
  YA.prototype = Object.create(l.prototype)
  YA.prototype.constructor = YA
  YA.prototype.my = YA
  YA.ny = {}
  b.btConcaveShape = YA
  YA.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    cc(c, a)
  }
  YA.prototype.getLocalScaling = function () {
    return k(dc(this.ly), m)
  }
  YA.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    ec(d, a, c)
  }
  YA.prototype.__destroy__ = function () {
    fc(this.ly)
  }
  function ZA() {
    throw 'cannot construct a btTypedConstraint, no constructor in IDL'
  }
  ZA.prototype = Object.create(f.prototype)
  ZA.prototype.constructor = ZA
  ZA.prototype.my = ZA
  ZA.ny = {}
  b.btTypedConstraint = ZA
  ZA.prototype.enableFeedback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    hc(c, a)
  }
  ZA.prototype.getBreakingImpulseThreshold = function () {
    return ic(this.ly)
  }
  ZA.prototype.setBreakingImpulseThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    jc(c, a)
  }
  ZA.prototype.getParam = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return kc(d, a, c)
  }
  ZA.prototype.setParam = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    lc(e, a, c, d)
  }
  ZA.prototype.__destroy__ = function () {
    mc(this.ly)
  }
  function $A() {
    throw 'cannot construct a btDynamicsWorld, no constructor in IDL'
  }
  $A.prototype = Object.create(SA.prototype)
  $A.prototype.constructor = $A
  $A.prototype.my = $A
  $A.ny = {}
  b.btDynamicsWorld = $A
  $A.prototype.addAction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    nc(c, a)
  }
  $A.prototype.removeAction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    oc(c, a)
  }
  $A.prototype.getSolverInfo = function () {
    return k(pc(this.ly), u)
  }
  $A.prototype.setInternalTickCallback = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    void 0 === c ? qc(e, a) : void 0 === d ? rc(e, a, c) : sc(e, a, c, d)
  }
  $A.prototype.getDispatcher = function () {
    return k(tc(this.ly), TA)
  }
  $A.prototype.rayTest = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    uc(e, a, c, d)
  }
  $A.prototype.getPairCache = function () {
    return k(vc(this.ly), UA)
  }
  $A.prototype.getDispatchInfo = function () {
    return k(wc(this.ly), p)
  }
  $A.prototype.addCollisionObject = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    void 0 === c ? xc(e, a) : void 0 === d ? yc(e, a, c) : zc(e, a, c, d)
  }
  $A.prototype.removeCollisionObject = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ac(c, a)
  }
  $A.prototype.getBroadphase = function () {
    return k(Bc(this.ly), VA)
  }
  $A.prototype.convexSweepTest = function (a, c, d, e, g) {
    const n = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    Cc(n, a, c, d, e, g)
  }
  $A.prototype.contactPairTest = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Dc(e, a, c, d)
  }
  $A.prototype.contactTest = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Ec(d, a, c)
  }
  $A.prototype.updateSingleAabb = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Fc(c, a)
  }
  $A.prototype.setDebugDrawer = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Gc(c, a)
  }
  $A.prototype.getDebugDrawer = function () {
    return k(Hc(this.ly), WA)
  }
  $A.prototype.debugDrawWorld = function () {
    Ic(this.ly)
  }
  $A.prototype.debugDrawObject = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Jc(e, a, c, d)
  }
  $A.prototype.__destroy__ = function () {
    Kc(this.ly)
  }
  function WA() {
    throw 'cannot construct a btIDebugDraw, no constructor in IDL'
  }
  WA.prototype = Object.create(f.prototype)
  WA.prototype.constructor = WA
  WA.prototype.my = WA
  WA.ny = {}
  b.btIDebugDraw = WA
  WA.prototype.drawLine = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Lc(e, a, c, d)
  }
  WA.prototype.drawContactPoint = function (a, c, d, e, g) {
    const n = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    Mc(n, a, c, d, e, g)
  }
  WA.prototype.reportErrorWarning = function (a) {
    const c = this.ly
    NA()
    a = a && 'object' === typeof a ? a.ly : QA(a)
    Nc(c, a)
  }
  WA.prototype.draw3dText = function (a, c) {
    const d = this.ly
    NA()
    a && 'object' === typeof a && (a = a.ly)
    c = c && 'object' === typeof c ? c.ly : QA(c)
    Oc(d, a, c)
  }
  WA.prototype.setDebugMode = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Pc(c, a)
  }
  WA.prototype.getDebugMode = function () {
    return Qc(this.ly)
  }
  WA.prototype.__destroy__ = function () {
    Rc(this.ly)
  }
  function m(a, c, d) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    this.ly =
      void 0 === a
        ? Sc()
        : void 0 === c
          ? _emscripten_bind_btVector3_btVector3_1(a)
          : void 0 === d
            ? _emscripten_bind_btVector3_btVector3_2(a, c)
            : Tc(a, c, d)
    h(m)[this.ly] = this
  }
  m.prototype = Object.create(f.prototype)
  m.prototype.constructor = m
  m.prototype.my = m
  m.ny = {}
  b.btVector3 = m
  m.prototype.length = m.prototype.length = function () {
    return Uc(this.ly)
  }
  m.prototype.x = m.prototype.x = function () {
    return Vc(this.ly)
  }
  m.prototype.y = m.prototype.y = function () {
    return Wc(this.ly)
  }
  m.prototype.z = m.prototype.z = function () {
    return Xc(this.ly)
  }
  m.prototype.setX = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yc(c, a)
  }
  m.prototype.setY = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Zc(c, a)
  }
  m.prototype.setZ = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    $c(c, a)
  }
  m.prototype.setValue = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    ad(e, a, c, d)
  }
  m.prototype.normalize = m.prototype.normalize = function () {
    bd(this.ly)
  }
  m.prototype.rotate = m.prototype.rotate = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return k(cd(d, a, c), m)
  }
  m.prototype.dot = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return dd(c, a)
  }
  m.prototype.op_mul = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(ed(c, a), m)
  }
  m.prototype.op_add = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(fd(c, a), m)
  }
  m.prototype.op_sub = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(gd(c, a), m)
  }
  m.prototype.__destroy__ = function () {
    hd(this.ly)
  }
  function aB() {
    throw 'cannot construct a btQuadWord, no constructor in IDL'
  }
  aB.prototype = Object.create(f.prototype)
  aB.prototype.constructor = aB
  aB.prototype.my = aB
  aB.ny = {}
  b.btQuadWord = aB
  aB.prototype.x = aB.prototype.x = function () {
    return id(this.ly)
  }
  aB.prototype.y = aB.prototype.y = function () {
    return jd(this.ly)
  }
  aB.prototype.z = aB.prototype.z = function () {
    return kd(this.ly)
  }
  aB.prototype.w = function () {
    return ld(this.ly)
  }
  aB.prototype.setX = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    md(c, a)
  }
  aB.prototype.setY = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    nd(c, a)
  }
  aB.prototype.setZ = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    od(c, a)
  }
  aB.prototype.setW = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    pd(c, a)
  }
  aB.prototype.__destroy__ = function () {
    qd(this.ly)
  }
  function bB() {
    throw 'cannot construct a btMotionState, no constructor in IDL'
  }
  bB.prototype = Object.create(f.prototype)
  bB.prototype.constructor = bB
  bB.prototype.my = bB
  bB.ny = {}
  b.btMotionState = bB
  bB.prototype.getWorldTransform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    rd(c, a)
  }
  bB.prototype.setWorldTransform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    sd(c, a)
  }
  bB.prototype.__destroy__ = function () {
    td(this.ly)
  }
  function v() {
    throw 'cannot construct a RayResultCallback, no constructor in IDL'
  }
  v.prototype = Object.create(f.prototype)
  v.prototype.constructor = v
  v.prototype.my = v
  v.ny = {}
  b.RayResultCallback = v
  v.prototype.hasHit = function () {
    return !!ud(this.ly)
  }
  v.prototype.get_m_collisionFilterGroup = v.prototype.oy = function () {
    return vd(this.ly)
  }
  v.prototype.set_m_collisionFilterGroup = v.prototype.qy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    wd(c, a)
  }
  Object.defineProperty(v.prototype, 'm_collisionFilterGroup', {
    get: v.prototype.oy,
    set: v.prototype.qy
  })
  v.prototype.get_m_collisionFilterMask = v.prototype.py = function () {
    return xd(this.ly)
  }
  v.prototype.set_m_collisionFilterMask = v.prototype.ry = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    yd(c, a)
  }
  Object.defineProperty(v.prototype, 'm_collisionFilterMask', {
    get: v.prototype.py,
    set: v.prototype.ry
  })
  v.prototype.get_m_closestHitFraction = v.prototype.sy = function () {
    return zd(this.ly)
  }
  v.prototype.set_m_closestHitFraction = v.prototype.ty = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ad(c, a)
  }
  Object.defineProperty(v.prototype, 'm_closestHitFraction', {
    get: v.prototype.sy,
    set: v.prototype.ty
  })
  v.prototype.get_m_collisionObject = v.prototype.uy = function () {
    return k(Bd(this.ly), q)
  }
  v.prototype.set_m_collisionObject = v.prototype.By = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Cd(c, a)
  }
  Object.defineProperty(v.prototype, 'm_collisionObject', {
    get: v.prototype.uy,
    set: v.prototype.By
  })
  v.prototype.__destroy__ = function () {
    Dd(this.ly)
  }
  function cB() {
    throw 'cannot construct a ContactResultCallback, no constructor in IDL'
  }
  cB.prototype = Object.create(f.prototype)
  cB.prototype.constructor = cB
  cB.prototype.my = cB
  cB.ny = {}
  b.ContactResultCallback = cB
  cB.prototype.addSingleResult = function (a, c, d, e, g, n, D) {
    const R = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    n && 'object' === typeof n && (n = n.ly)
    D && 'object' === typeof D && (D = D.ly)
    return Ed(R, a, c, d, e, g, n, D)
  }
  cB.prototype.__destroy__ = function () {
    Fd(this.ly)
  }
  function w() {
    throw 'cannot construct a ConvexResultCallback, no constructor in IDL'
  }
  w.prototype = Object.create(f.prototype)
  w.prototype.constructor = w
  w.prototype.my = w
  w.ny = {}
  b.ConvexResultCallback = w
  w.prototype.hasHit = function () {
    return !!Gd(this.ly)
  }
  w.prototype.get_m_collisionFilterGroup = w.prototype.oy = function () {
    return Hd(this.ly)
  }
  w.prototype.set_m_collisionFilterGroup = w.prototype.qy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Id(c, a)
  }
  Object.defineProperty(w.prototype, 'm_collisionFilterGroup', {
    get: w.prototype.oy,
    set: w.prototype.qy
  })
  w.prototype.get_m_collisionFilterMask = w.prototype.py = function () {
    return Jd(this.ly)
  }
  w.prototype.set_m_collisionFilterMask = w.prototype.ry = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Kd(c, a)
  }
  Object.defineProperty(w.prototype, 'm_collisionFilterMask', {
    get: w.prototype.py,
    set: w.prototype.ry
  })
  w.prototype.get_m_closestHitFraction = w.prototype.sy = function () {
    return Ld(this.ly)
  }
  w.prototype.set_m_closestHitFraction = w.prototype.ty = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Md(c, a)
  }
  Object.defineProperty(w.prototype, 'm_closestHitFraction', {
    get: w.prototype.sy,
    set: w.prototype.ty
  })
  w.prototype.__destroy__ = function () {
    Nd(this.ly)
  }
  function dB() {
    throw 'cannot construct a btConvexShape, no constructor in IDL'
  }
  dB.prototype = Object.create(l.prototype)
  dB.prototype.constructor = dB
  dB.prototype.my = dB
  dB.ny = {}
  b.btConvexShape = dB
  dB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Od(c, a)
  }
  dB.prototype.getLocalScaling = function () {
    return k(Pd(this.ly), m)
  }
  dB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Qd(d, a, c)
  }
  dB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Rd(c, a)
  }
  dB.prototype.getMargin = function () {
    return Sd(this.ly)
  }
  dB.prototype.__destroy__ = function () {
    Td(this.ly)
  }
  function eB(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = Ud(a, c)
    h(eB)[this.ly] = this
  }
  eB.prototype = Object.create(l.prototype)
  eB.prototype.constructor = eB
  eB.prototype.my = eB
  eB.ny = {}
  b.btCapsuleShape = eB
  eB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Vd(c, a)
  }
  eB.prototype.getMargin = function () {
    return Wd(this.ly)
  }
  eB.prototype.getUpAxis = function () {
    return Xd(this.ly)
  }
  eB.prototype.getRadius = function () {
    return Yd(this.ly)
  }
  eB.prototype.getHalfHeight = function () {
    return Zd(this.ly)
  }
  eB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    $d(c, a)
  }
  eB.prototype.getLocalScaling = function () {
    return k(ae(this.ly), m)
  }
  eB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    be(d, a, c)
  }
  eB.prototype.__destroy__ = function () {
    ce(this.ly)
  }
  function fB(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = de(a)
    h(fB)[this.ly] = this
  }
  fB.prototype = Object.create(l.prototype)
  fB.prototype.constructor = fB
  fB.prototype.my = fB
  fB.ny = {}
  b.btCylinderShape = fB
  fB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ee(c, a)
  }
  fB.prototype.getMargin = function () {
    return fe(this.ly)
  }
  fB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ge(c, a)
  }
  fB.prototype.getLocalScaling = function () {
    return k(he(this.ly), m)
  }
  fB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    ie(d, a, c)
  }
  fB.prototype.__destroy__ = function () {
    je(this.ly)
  }
  function gB(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = ke(a, c)
    h(gB)[this.ly] = this
  }
  gB.prototype = Object.create(l.prototype)
  gB.prototype.constructor = gB
  gB.prototype.my = gB
  gB.ny = {}
  b.btConeShape = gB
  gB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    le(c, a)
  }
  gB.prototype.getLocalScaling = function () {
    return k(me(this.ly), m)
  }
  gB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    ne(d, a, c)
  }
  gB.prototype.__destroy__ = function () {
    oe(this.ly)
  }
  function hB() {
    throw 'cannot construct a btStridingMeshInterface, no constructor in IDL'
  }
  hB.prototype = Object.create(f.prototype)
  hB.prototype.constructor = hB
  hB.prototype.my = hB
  hB.ny = {}
  b.btStridingMeshInterface = hB
  hB.prototype.setScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    pe(c, a)
  }
  hB.prototype.__destroy__ = function () {
    qe(this.ly)
  }
  function iB() {
    throw 'cannot construct a btTriangleMeshShape, no constructor in IDL'
  }
  iB.prototype = Object.create(YA.prototype)
  iB.prototype.constructor = iB
  iB.prototype.my = iB
  iB.ny = {}
  b.btTriangleMeshShape = iB
  iB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    re(c, a)
  }
  iB.prototype.getLocalScaling = function () {
    return k(se(this.ly), m)
  }
  iB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    te(d, a, c)
  }
  iB.prototype.__destroy__ = function () {
    ue(this.ly)
  }
  function jB(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = void 0 === a ? ve() : we(a)
    h(jB)[this.ly] = this
  }
  jB.prototype = Object.create(f.prototype)
  jB.prototype.constructor = jB
  jB.prototype.my = jB
  jB.ny = {}
  b.btDefaultCollisionConfiguration = jB
  jB.prototype.__destroy__ = function () {
    xe(this.ly)
  }
  function TA() {
    throw 'cannot construct a btDispatcher, no constructor in IDL'
  }
  TA.prototype = Object.create(f.prototype)
  TA.prototype.constructor = TA
  TA.prototype.my = TA
  TA.ny = {}
  b.btDispatcher = TA
  TA.prototype.getNumManifolds = function () {
    return ye(this.ly)
  }
  TA.prototype.getManifoldByIndexInternal = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(ze(c, a), kB)
  }
  TA.prototype.__destroy__ = function () {
    Ae(this.ly)
  }
  function lB(a, c, d, e, g) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    this.ly =
      void 0 === e
        ? Be(a, c, d)
        : void 0 === g
          ? _emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_4(a, c, d, e)
          : Ce(a, c, d, e, g)
    h(lB)[this.ly] = this
  }
  lB.prototype = Object.create(ZA.prototype)
  lB.prototype.constructor = lB
  lB.prototype.my = lB
  lB.ny = {}
  b.btGeneric6DofConstraint = lB
  lB.prototype.setLinearLowerLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    De(c, a)
  }
  lB.prototype.setLinearUpperLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ee(c, a)
  }
  lB.prototype.setAngularLowerLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Fe(c, a)
  }
  lB.prototype.setAngularUpperLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ge(c, a)
  }
  lB.prototype.getFrameOffsetA = function () {
    return k(He(this.ly), r)
  }
  lB.prototype.enableFeedback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ie(c, a)
  }
  lB.prototype.getBreakingImpulseThreshold = function () {
    return Je(this.ly)
  }
  lB.prototype.setBreakingImpulseThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ke(c, a)
  }
  lB.prototype.getParam = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return Le(d, a, c)
  }
  lB.prototype.setParam = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Me(e, a, c, d)
  }
  lB.prototype.__destroy__ = function () {
    Ne(this.ly)
  }
  function x(a, c, d, e) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    this.ly = Oe(a, c, d, e)
    h(x)[this.ly] = this
  }
  x.prototype = Object.create($A.prototype)
  x.prototype.constructor = x
  x.prototype.my = x
  x.ny = {}
  b.btDiscreteDynamicsWorld = x
  x.prototype.setGravity = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Pe(c, a)
  }
  x.prototype.getGravity = function () {
    return k(Qe(this.ly), m)
  }
  x.prototype.addRigidBody = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    void 0 === c
      ? Re(e, a)
      : void 0 === d
        ? _emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_2(e, a, c)
        : Se(e, a, c, d)
  }
  x.prototype.removeRigidBody = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Te(c, a)
  }
  x.prototype.addConstraint = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    void 0 === c ? Ue(d, a) : Ve(d, a, c)
  }
  x.prototype.removeConstraint = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    We(c, a)
  }
  x.prototype.stepSimulation = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    return void 0 === c ? Xe(e, a) : void 0 === d ? Ye(e, a, c) : Ze(e, a, c, d)
  }
  x.prototype.setContactAddedCallback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    $e(c, a)
  }
  x.prototype.setContactProcessedCallback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    af(c, a)
  }
  x.prototype.setContactDestroyedCallback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    bf(c, a)
  }
  x.prototype.getDispatcher = function () {
    return k(cf(this.ly), TA)
  }
  x.prototype.rayTest = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    df(e, a, c, d)
  }
  x.prototype.getPairCache = function () {
    return k(ef(this.ly), UA)
  }
  x.prototype.getDispatchInfo = function () {
    return k(ff(this.ly), p)
  }
  x.prototype.addCollisionObject = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    void 0 === c ? gf(e, a) : void 0 === d ? hf(e, a, c) : jf(e, a, c, d)
  }
  x.prototype.removeCollisionObject = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    kf(c, a)
  }
  x.prototype.getBroadphase = function () {
    return k(lf(this.ly), VA)
  }
  x.prototype.convexSweepTest = function (a, c, d, e, g) {
    const n = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    mf(n, a, c, d, e, g)
  }
  x.prototype.contactPairTest = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    nf(e, a, c, d)
  }
  x.prototype.contactTest = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    of(d, a, c)
  }
  x.prototype.updateSingleAabb = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    pf(c, a)
  }
  x.prototype.setDebugDrawer = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    qf(c, a)
  }
  x.prototype.getDebugDrawer = function () {
    return k(rf(this.ly), WA)
  }
  x.prototype.debugDrawWorld = function () {
    sf(this.ly)
  }
  x.prototype.debugDrawObject = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    tf(e, a, c, d)
  }
  x.prototype.addAction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    uf(c, a)
  }
  x.prototype.removeAction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    vf(c, a)
  }
  x.prototype.getSolverInfo = function () {
    return k(wf(this.ly), u)
  }
  x.prototype.setInternalTickCallback = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    void 0 === c ? xf(e, a) : void 0 === d ? yf(e, a, c) : zf(e, a, c, d)
  }
  x.prototype.__destroy__ = function () {
    Af(this.ly)
  }
  function mB() {
    throw 'cannot construct a btVehicleRaycaster, no constructor in IDL'
  }
  mB.prototype = Object.create(f.prototype)
  mB.prototype.constructor = mB
  mB.prototype.my = mB
  mB.ny = {}
  b.btVehicleRaycaster = mB
  mB.prototype.castRay = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Bf(e, a, c, d)
  }
  mB.prototype.__destroy__ = function () {
    Cf(this.ly)
  }
  function nB() {
    throw 'cannot construct a btActionInterface, no constructor in IDL'
  }
  nB.prototype = Object.create(f.prototype)
  nB.prototype.constructor = nB
  nB.prototype.my = nB
  nB.ny = {}
  b.btActionInterface = nB
  nB.prototype.updateAction = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Df(d, a, c)
  }
  nB.prototype.__destroy__ = function () {
    Ef(this.ly)
  }
  function y() {
    this.ly = Ff()
    h(y)[this.ly] = this
  }
  y.prototype = Object.create(q.prototype)
  y.prototype.constructor = y
  y.prototype.my = y
  y.ny = {}
  b.btGhostObject = y
  y.prototype.getNumOverlappingObjects = function () {
    return Gf(this.ly)
  }
  y.prototype.getOverlappingObject = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Hf(c, a), q)
  }
  y.prototype.setAnisotropicFriction = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    If(d, a, c)
  }
  y.prototype.getCollisionShape = function () {
    return k(Jf(this.ly), l)
  }
  y.prototype.setContactProcessingThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Kf(c, a)
  }
  y.prototype.setActivationState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Lf(c, a)
  }
  y.prototype.forceActivationState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mf(c, a)
  }
  y.prototype.activate = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    void 0 === a ? Nf(c) : Of(c, a)
  }
  y.prototype.isActive = function () {
    return !!Pf(this.ly)
  }
  y.prototype.isKinematicObject = function () {
    return !!Qf(this.ly)
  }
  y.prototype.isStaticObject = function () {
    return !!Rf(this.ly)
  }
  y.prototype.isStaticOrKinematicObject = function () {
    return !!Sf(this.ly)
  }
  y.prototype.getRestitution = function () {
    return Tf(this.ly)
  }
  y.prototype.getFriction = function () {
    return Uf(this.ly)
  }
  y.prototype.getRollingFriction = function () {
    return Vf(this.ly)
  }
  y.prototype.setRestitution = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Wf(c, a)
  }
  y.prototype.setFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Xf(c, a)
  }
  y.prototype.setRollingFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yf(c, a)
  }
  y.prototype.getWorldTransform = function () {
    return k(Zf(this.ly), r)
  }
  y.prototype.getCollisionFlags = function () {
    return $f(this.ly)
  }
  y.prototype.setCollisionFlags = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ag(c, a)
  }
  y.prototype.setWorldTransform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    bg(c, a)
  }
  y.prototype.setCollisionShape = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    cg(c, a)
  }
  y.prototype.setCcdMotionThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    dg(c, a)
  }
  y.prototype.setCcdSweptSphereRadius = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    eg(c, a)
  }
  y.prototype.getUserIndex = function () {
    return fg(this.ly)
  }
  y.prototype.setUserIndex = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    gg(c, a)
  }
  y.prototype.getUserPointer = function () {
    return k(hg(this.ly), XA)
  }
  y.prototype.setUserPointer = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ig(c, a)
  }
  y.prototype.getBroadphaseHandle = function () {
    return k(jg(this.ly), t)
  }
  y.prototype.__destroy__ = function () {
    kg(this.ly)
  }
  function oB() {
    throw 'cannot construct a btSoftBodySolver, no constructor in IDL'
  }
  oB.prototype = Object.create(f.prototype)
  oB.prototype.constructor = oB
  oB.prototype.my = oB
  oB.ny = {}
  b.btSoftBodySolver = oB
  oB.prototype.__destroy__ = function () {
    lg(this.ly)
  }
  function XA() {
    throw 'cannot construct a VoidPtr, no constructor in IDL'
  }
  XA.prototype = Object.create(f.prototype)
  XA.prototype.constructor = XA
  XA.prototype.my = XA
  XA.ny = {}
  b.VoidPtr = XA
  XA.prototype.__destroy__ = function () {
    mg(this.ly)
  }
  function pB() {
    this.ly = ng()
    h(pB)[this.ly] = this
  }
  pB.prototype = Object.create(WA.prototype)
  pB.prototype.constructor = pB
  pB.prototype.my = pB
  pB.ny = {}
  b.DebugDrawer = pB
  pB.prototype.drawLine = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    og(e, a, c, d)
  }
  pB.prototype.drawContactPoint = function (a, c, d, e, g) {
    const n = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    pg(n, a, c, d, e, g)
  }
  pB.prototype.reportErrorWarning = function (a) {
    const c = this.ly
    NA()
    a = a && 'object' === typeof a ? a.ly : QA(a)
    qg(c, a)
  }
  pB.prototype.draw3dText = function (a, c) {
    const d = this.ly
    NA()
    a && 'object' === typeof a && (a = a.ly)
    c = c && 'object' === typeof c ? c.ly : QA(c)
    rg(d, a, c)
  }
  pB.prototype.setDebugMode = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    sg(c, a)
  }
  pB.prototype.getDebugMode = function () {
    return tg(this.ly)
  }
  pB.prototype.__destroy__ = function () {
    ug(this.ly)
  }
  function z(a, c, d, e) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    this.ly =
      void 0 === a
        ? vg()
        : void 0 === c
          ? _emscripten_bind_btVector4_btVector4_1(a)
          : void 0 === d
            ? _emscripten_bind_btVector4_btVector4_2(a, c)
            : void 0 === e
              ? _emscripten_bind_btVector4_btVector4_3(a, c, d)
              : wg(a, c, d, e)
    h(z)[this.ly] = this
  }
  z.prototype = Object.create(m.prototype)
  z.prototype.constructor = z
  z.prototype.my = z
  z.ny = {}
  b.btVector4 = z
  z.prototype.w = function () {
    return xg(this.ly)
  }
  z.prototype.setValue = function (a, c, d, e) {
    const g = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    yg(g, a, c, d, e)
  }
  z.prototype.length = z.prototype.length = function () {
    return zg(this.ly)
  }
  z.prototype.x = z.prototype.x = function () {
    return Ag(this.ly)
  }
  z.prototype.y = z.prototype.y = function () {
    return Bg(this.ly)
  }
  z.prototype.z = z.prototype.z = function () {
    return Cg(this.ly)
  }
  z.prototype.setX = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Dg(c, a)
  }
  z.prototype.setY = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Eg(c, a)
  }
  z.prototype.setZ = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Fg(c, a)
  }
  z.prototype.normalize = z.prototype.normalize = function () {
    Gg(this.ly)
  }
  z.prototype.rotate = z.prototype.rotate = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return k(Hg(d, a, c), m)
  }
  z.prototype.dot = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return Ig(c, a)
  }
  z.prototype.op_mul = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Jg(c, a), m)
  }
  z.prototype.op_add = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Kg(c, a), m)
  }
  z.prototype.op_sub = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Lg(c, a), m)
  }
  z.prototype.__destroy__ = function () {
    Mg(this.ly)
  }
  function A(a, c, d, e) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    this.ly = Ng(a, c, d, e)
    h(A)[this.ly] = this
  }
  A.prototype = Object.create(aB.prototype)
  A.prototype.constructor = A
  A.prototype.my = A
  A.ny = {}
  b.btQuaternion = A
  A.prototype.setValue = function (a, c, d, e) {
    const g = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    Og(g, a, c, d, e)
  }
  A.prototype.setEulerZYX = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Pg(e, a, c, d)
  }
  A.prototype.setRotation = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Qg(d, a, c)
  }
  A.prototype.normalize = A.prototype.normalize = function () {
    Rg(this.ly)
  }
  A.prototype.length2 = function () {
    return Sg(this.ly)
  }
  A.prototype.length = A.prototype.length = function () {
    return Tg(this.ly)
  }
  A.prototype.dot = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return Ug(c, a)
  }
  A.prototype.normalized = function () {
    return k(Vg(this.ly), A)
  }
  A.prototype.getAxis = function () {
    return k(Wg(this.ly), m)
  }
  A.prototype.inverse = A.prototype.inverse = function () {
    return k(Xg(this.ly), A)
  }
  A.prototype.getAngle = function () {
    return Yg(this.ly)
  }
  A.prototype.getAngleShortestPath = function () {
    return Zg(this.ly)
  }
  A.prototype.angle = A.prototype.angle = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return $g(c, a)
  }
  A.prototype.angleShortestPath = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return ah(c, a)
  }
  A.prototype.op_add = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(bh(c, a), A)
  }
  A.prototype.op_sub = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(ch(c, a), A)
  }
  A.prototype.op_mul = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(dh(c, a), A)
  }
  A.prototype.op_mulq = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(eh(c, a), A)
  }
  A.prototype.op_div = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(fh(c, a), A)
  }
  A.prototype.x = A.prototype.x = function () {
    return gh(this.ly)
  }
  A.prototype.y = A.prototype.y = function () {
    return hh(this.ly)
  }
  A.prototype.z = A.prototype.z = function () {
    return ih(this.ly)
  }
  A.prototype.w = function () {
    return jh(this.ly)
  }
  A.prototype.setX = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    kh(c, a)
  }
  A.prototype.setY = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    lh(c, a)
  }
  A.prototype.setZ = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    mh(c, a)
  }
  A.prototype.setW = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    nh(c, a)
  }
  A.prototype.__destroy__ = function () {
    oh(this.ly)
  }
  function qB() {
    throw 'cannot construct a btMatrix3x3, no constructor in IDL'
  }
  qB.prototype = Object.create(f.prototype)
  qB.prototype.constructor = qB
  qB.prototype.my = qB
  qB.ny = {}
  b.btMatrix3x3 = qB
  qB.prototype.setEulerZYX = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    ph(e, a, c, d)
  }
  qB.prototype.getRotation = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    qh(c, a)
  }
  qB.prototype.getRow = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(rh(c, a), m)
  }
  qB.prototype.__destroy__ = function () {
    sh(this.ly)
  }
  function r(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly =
      void 0 === a ? th() : void 0 === c ? _emscripten_bind_btTransform_btTransform_1(a) : uh(a, c)
    h(r)[this.ly] = this
  }
  r.prototype = Object.create(f.prototype)
  r.prototype.constructor = r
  r.prototype.my = r
  r.ny = {}
  b.btTransform = r
  r.prototype.setIdentity = function () {
    vh(this.ly)
  }
  r.prototype.setOrigin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    wh(c, a)
  }
  r.prototype.setRotation = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    xh(c, a)
  }
  r.prototype.getOrigin = function () {
    return k(yh(this.ly), m)
  }
  r.prototype.getRotation = function () {
    return k(zh(this.ly), A)
  }
  r.prototype.getBasis = function () {
    return k(Ah(this.ly), qB)
  }
  r.prototype.setFromOpenGLMatrix = function (a) {
    const c = this.ly
    NA()
    'object' == typeof a && (a = RA(a))
    Bh(c, a)
  }
  r.prototype.inverse = r.prototype.inverse = function () {
    return k(Ch(this.ly), r)
  }
  r.prototype.op_mul = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Dh(c, a), r)
  }
  r.prototype.__destroy__ = function () {
    Eh(this.ly)
  }
  function rB(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = void 0 === a ? Fh() : void 0 === c ? Gh(a) : Hh(a, c)
    h(rB)[this.ly] = this
  }
  rB.prototype = Object.create(bB.prototype)
  rB.prototype.constructor = rB
  rB.prototype.my = rB
  rB.ny = {}
  b.btDefaultMotionState = rB
  rB.prototype.getWorldTransform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ih(c, a)
  }
  rB.prototype.setWorldTransform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Jh(c, a)
  }
  rB.prototype.get_m_graphicsWorldTrans = rB.prototype.kA = function () {
    return k(Kh(this.ly), r)
  }
  rB.prototype.set_m_graphicsWorldTrans = rB.prototype.QC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Lh(c, a)
  }
  Object.defineProperty(rB.prototype, 'm_graphicsWorldTrans', {
    get: rB.prototype.kA,
    set: rB.prototype.QC
  })
  rB.prototype.__destroy__ = function () {
    Mh(this.ly)
  }
  function sB() {
    throw 'cannot construct a btCollisionObjectWrapper, no constructor in IDL'
  }
  sB.prototype = Object.create(f.prototype)
  sB.prototype.constructor = sB
  sB.prototype.my = sB
  sB.ny = {}
  b.btCollisionObjectWrapper = sB
  sB.prototype.getWorldTransform = function () {
    return k(Nh(this.ly), r)
  }
  sB.prototype.getCollisionObject = function () {
    return k(Oh(this.ly), q)
  }
  sB.prototype.getCollisionShape = function () {
    return k(Ph(this.ly), l)
  }
  function B(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = Qh(a, c)
    h(B)[this.ly] = this
  }
  B.prototype = Object.create(v.prototype)
  B.prototype.constructor = B
  B.prototype.my = B
  B.ny = {}
  b.ClosestRayResultCallback = B
  B.prototype.hasHit = function () {
    return !!Rh(this.ly)
  }
  B.prototype.get_m_rayFromWorld = B.prototype.Ny = function () {
    return k(Sh(this.ly), m)
  }
  B.prototype.set_m_rayFromWorld = B.prototype.Xy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Th(c, a)
  }
  Object.defineProperty(B.prototype, 'm_rayFromWorld', { get: B.prototype.Ny, set: B.prototype.Xy })
  B.prototype.get_m_rayToWorld = B.prototype.Oy = function () {
    return k(Uh(this.ly), m)
  }
  B.prototype.set_m_rayToWorld = B.prototype.Yy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Vh(c, a)
  }
  Object.defineProperty(B.prototype, 'm_rayToWorld', { get: B.prototype.Oy, set: B.prototype.Yy })
  B.prototype.get_m_hitNormalWorld = B.prototype.wy = function () {
    return k(Wh(this.ly), m)
  }
  B.prototype.set_m_hitNormalWorld = B.prototype.Dy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Xh(c, a)
  }
  Object.defineProperty(B.prototype, 'm_hitNormalWorld', {
    get: B.prototype.wy,
    set: B.prototype.Dy
  })
  B.prototype.get_m_hitPointWorld = B.prototype.xy = function () {
    return k(Yh(this.ly), m)
  }
  B.prototype.set_m_hitPointWorld = B.prototype.Ey = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Zh(c, a)
  }
  Object.defineProperty(B.prototype, 'm_hitPointWorld', {
    get: B.prototype.xy,
    set: B.prototype.Ey
  })
  B.prototype.get_m_collisionFilterGroup = B.prototype.oy = function () {
    return $h(this.ly)
  }
  B.prototype.set_m_collisionFilterGroup = B.prototype.qy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ai(c, a)
  }
  Object.defineProperty(B.prototype, 'm_collisionFilterGroup', {
    get: B.prototype.oy,
    set: B.prototype.qy
  })
  B.prototype.get_m_collisionFilterMask = B.prototype.py = function () {
    return bi(this.ly)
  }
  B.prototype.set_m_collisionFilterMask = B.prototype.ry = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ci(c, a)
  }
  Object.defineProperty(B.prototype, 'm_collisionFilterMask', {
    get: B.prototype.py,
    set: B.prototype.ry
  })
  B.prototype.get_m_closestHitFraction = B.prototype.sy = function () {
    return di(this.ly)
  }
  B.prototype.set_m_closestHitFraction = B.prototype.ty = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ei(c, a)
  }
  Object.defineProperty(B.prototype, 'm_closestHitFraction', {
    get: B.prototype.sy,
    set: B.prototype.ty
  })
  B.prototype.get_m_collisionObject = B.prototype.uy = function () {
    return k(fi(this.ly), q)
  }
  B.prototype.set_m_collisionObject = B.prototype.By = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    gi(c, a)
  }
  Object.defineProperty(B.prototype, 'm_collisionObject', {
    get: B.prototype.uy,
    set: B.prototype.By
  })
  B.prototype.__destroy__ = function () {
    hi(this.ly)
  }
  function tB() {
    throw 'cannot construct a btConstCollisionObjectArray, no constructor in IDL'
  }
  tB.prototype = Object.create(f.prototype)
  tB.prototype.constructor = tB
  tB.prototype.my = tB
  tB.ny = {}
  b.btConstCollisionObjectArray = tB
  tB.prototype.size = tB.prototype.size = function () {
    return ii(this.ly)
  }
  tB.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(ji(c, a), q)
  }
  tB.prototype.__destroy__ = function () {
    ki(this.ly)
  }
  function uB() {
    throw 'cannot construct a btScalarArray, no constructor in IDL'
  }
  uB.prototype = Object.create(f.prototype)
  uB.prototype.constructor = uB
  uB.prototype.my = uB
  uB.ny = {}
  b.btScalarArray = uB
  uB.prototype.size = uB.prototype.size = function () {
    return li(this.ly)
  }
  uB.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return mi(c, a)
  }
  uB.prototype.__destroy__ = function () {
    ni(this.ly)
  }
  function C(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = oi(a, c)
    h(C)[this.ly] = this
  }
  C.prototype = Object.create(v.prototype)
  C.prototype.constructor = C
  C.prototype.my = C
  C.ny = {}
  b.AllHitsRayResultCallback = C
  C.prototype.hasHit = function () {
    return !!pi(this.ly)
  }
  C.prototype.get_m_collisionObjects = C.prototype.Uz = function () {
    return k(qi(this.ly), tB)
  }
  C.prototype.set_m_collisionObjects = C.prototype.zC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ri(c, a)
  }
  Object.defineProperty(C.prototype, 'm_collisionObjects', {
    get: C.prototype.Uz,
    set: C.prototype.zC
  })
  C.prototype.get_m_rayFromWorld = C.prototype.Ny = function () {
    return k(si(this.ly), m)
  }
  C.prototype.set_m_rayFromWorld = C.prototype.Xy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ti(c, a)
  }
  Object.defineProperty(C.prototype, 'm_rayFromWorld', { get: C.prototype.Ny, set: C.prototype.Xy })
  C.prototype.get_m_rayToWorld = C.prototype.Oy = function () {
    return k(ui(this.ly), m)
  }
  C.prototype.set_m_rayToWorld = C.prototype.Yy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    vi(c, a)
  }
  Object.defineProperty(C.prototype, 'm_rayToWorld', { get: C.prototype.Oy, set: C.prototype.Yy })
  C.prototype.get_m_hitNormalWorld = C.prototype.wy = function () {
    return k(wi(this.ly), vB)
  }
  C.prototype.set_m_hitNormalWorld = C.prototype.Dy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    xi(c, a)
  }
  Object.defineProperty(C.prototype, 'm_hitNormalWorld', {
    get: C.prototype.wy,
    set: C.prototype.Dy
  })
  C.prototype.get_m_hitPointWorld = C.prototype.xy = function () {
    return k(yi(this.ly), vB)
  }
  C.prototype.set_m_hitPointWorld = C.prototype.Ey = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    zi(c, a)
  }
  Object.defineProperty(C.prototype, 'm_hitPointWorld', {
    get: C.prototype.xy,
    set: C.prototype.Ey
  })
  C.prototype.get_m_hitFractions = C.prototype.pA = function () {
    return k(Ai(this.ly), uB)
  }
  C.prototype.set_m_hitFractions = C.prototype.VC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Bi(c, a)
  }
  Object.defineProperty(C.prototype, 'm_hitFractions', { get: C.prototype.pA, set: C.prototype.VC })
  C.prototype.get_m_collisionFilterGroup = C.prototype.oy = function () {
    return Ci(this.ly)
  }
  C.prototype.set_m_collisionFilterGroup = C.prototype.qy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Di(c, a)
  }
  Object.defineProperty(C.prototype, 'm_collisionFilterGroup', {
    get: C.prototype.oy,
    set: C.prototype.qy
  })
  C.prototype.get_m_collisionFilterMask = C.prototype.py = function () {
    return Ei(this.ly)
  }
  C.prototype.set_m_collisionFilterMask = C.prototype.ry = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Fi(c, a)
  }
  Object.defineProperty(C.prototype, 'm_collisionFilterMask', {
    get: C.prototype.py,
    set: C.prototype.ry
  })
  C.prototype.get_m_closestHitFraction = C.prototype.sy = function () {
    return Gi(this.ly)
  }
  C.prototype.set_m_closestHitFraction = C.prototype.ty = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Hi(c, a)
  }
  Object.defineProperty(C.prototype, 'm_closestHitFraction', {
    get: C.prototype.sy,
    set: C.prototype.ty
  })
  C.prototype.get_m_collisionObject = C.prototype.uy = function () {
    return k(Ii(this.ly), q)
  }
  C.prototype.set_m_collisionObject = C.prototype.By = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ji(c, a)
  }
  Object.defineProperty(C.prototype, 'm_collisionObject', {
    get: C.prototype.uy,
    set: C.prototype.By
  })
  C.prototype.__destroy__ = function () {
    Ki(this.ly)
  }
  function E() {
    throw 'cannot construct a btManifoldPoint, no constructor in IDL'
  }
  E.prototype = Object.create(f.prototype)
  E.prototype.constructor = E
  E.prototype.my = E
  E.ny = {}
  b.btManifoldPoint = E
  E.prototype.getPositionWorldOnA = function () {
    return k(Li(this.ly), m)
  }
  E.prototype.getPositionWorldOnB = function () {
    return k(Mi(this.ly), m)
  }
  E.prototype.getAppliedImpulse = function () {
    return Ni(this.ly)
  }
  E.prototype.getDistance = function () {
    return Oi(this.ly)
  }
  E.prototype.get_m_localPointA = E.prototype.FA = function () {
    return k(Pi(this.ly), m)
  }
  E.prototype.set_m_localPointA = E.prototype.kD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Qi(c, a)
  }
  Object.defineProperty(E.prototype, 'm_localPointA', { get: E.prototype.FA, set: E.prototype.kD })
  E.prototype.get_m_localPointB = E.prototype.GA = function () {
    return k(Ri(this.ly), m)
  }
  E.prototype.set_m_localPointB = E.prototype.lD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Si(c, a)
  }
  Object.defineProperty(E.prototype, 'm_localPointB', { get: E.prototype.GA, set: E.prototype.lD })
  E.prototype.get_m_positionWorldOnB = E.prototype.SA = function () {
    return k(Ti(this.ly), m)
  }
  E.prototype.set_m_positionWorldOnB = E.prototype.xD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ui(c, a)
  }
  Object.defineProperty(E.prototype, 'm_positionWorldOnB', {
    get: E.prototype.SA,
    set: E.prototype.xD
  })
  E.prototype.get_m_positionWorldOnA = E.prototype.RA = function () {
    return k(Vi(this.ly), m)
  }
  E.prototype.set_m_positionWorldOnA = E.prototype.wD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Wi(c, a)
  }
  Object.defineProperty(E.prototype, 'm_positionWorldOnA', {
    get: E.prototype.RA,
    set: E.prototype.wD
  })
  E.prototype.get_m_normalWorldOnB = E.prototype.NA = function () {
    return k(Xi(this.ly), m)
  }
  E.prototype.set_m_normalWorldOnB = E.prototype.sD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yi(c, a)
  }
  Object.defineProperty(E.prototype, 'm_normalWorldOnB', {
    get: E.prototype.NA,
    set: E.prototype.sD
  })
  E.prototype.get_m_userPersistentData = E.prototype.tB = function () {
    return Zi(this.ly)
  }
  E.prototype.set_m_userPersistentData = E.prototype.ZD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    $i(c, a)
  }
  Object.defineProperty(E.prototype, 'm_userPersistentData', {
    get: E.prototype.tB,
    set: E.prototype.ZD
  })
  E.prototype.__destroy__ = function () {
    aj(this.ly)
  }
  function wB() {
    this.ly = bj()
    h(wB)[this.ly] = this
  }
  wB.prototype = Object.create(cB.prototype)
  wB.prototype.constructor = wB
  wB.prototype.my = wB
  wB.ny = {}
  b.ConcreteContactResultCallback = wB
  wB.prototype.addSingleResult = function (a, c, d, e, g, n, D) {
    const R = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    n && 'object' === typeof n && (n = n.ly)
    D && 'object' === typeof D && (D = D.ly)
    return cj(R, a, c, d, e, g, n, D)
  }
  wB.prototype.__destroy__ = function () {
    dj(this.ly)
  }
  function xB() {
    throw 'cannot construct a LocalShapeInfo, no constructor in IDL'
  }
  xB.prototype = Object.create(f.prototype)
  xB.prototype.constructor = xB
  xB.prototype.my = xB
  xB.ny = {}
  b.LocalShapeInfo = xB
  xB.prototype.get_m_shapePart = xB.prototype.aB = function () {
    return ej(this.ly)
  }
  xB.prototype.set_m_shapePart = xB.prototype.GD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    fj(c, a)
  }
  Object.defineProperty(xB.prototype, 'm_shapePart', { get: xB.prototype.aB, set: xB.prototype.GD })
  xB.prototype.get_m_triangleIndex = xB.prototype.pB = function () {
    return gj(this.ly)
  }
  xB.prototype.set_m_triangleIndex = xB.prototype.VD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    hj(c, a)
  }
  Object.defineProperty(xB.prototype, 'm_triangleIndex', {
    get: xB.prototype.pB,
    set: xB.prototype.VD
  })
  xB.prototype.__destroy__ = function () {
    ij(this.ly)
  }
  function F(a, c, d, e, g) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    this.ly = jj(a, c, d, e, g)
    h(F)[this.ly] = this
  }
  F.prototype = Object.create(f.prototype)
  F.prototype.constructor = F
  F.prototype.my = F
  F.ny = {}
  b.LocalConvexResult = F
  F.prototype.get_m_hitCollisionObject = F.prototype.Ly = function () {
    return k(kj(this.ly), q)
  }
  F.prototype.set_m_hitCollisionObject = F.prototype.Vy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    lj(c, a)
  }
  Object.defineProperty(F.prototype, 'm_hitCollisionObject', {
    get: F.prototype.Ly,
    set: F.prototype.Vy
  })
  F.prototype.get_m_localShapeInfo = F.prototype.HA = function () {
    return k(mj(this.ly), xB)
  }
  F.prototype.set_m_localShapeInfo = F.prototype.mD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    nj(c, a)
  }
  Object.defineProperty(F.prototype, 'm_localShapeInfo', {
    get: F.prototype.HA,
    set: F.prototype.mD
  })
  F.prototype.get_m_hitNormalLocal = F.prototype.rA = function () {
    return k(oj(this.ly), m)
  }
  F.prototype.set_m_hitNormalLocal = F.prototype.XC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    pj(c, a)
  }
  Object.defineProperty(F.prototype, 'm_hitNormalLocal', {
    get: F.prototype.rA,
    set: F.prototype.XC
  })
  F.prototype.get_m_hitPointLocal = F.prototype.tA = function () {
    return k(qj(this.ly), m)
  }
  F.prototype.set_m_hitPointLocal = F.prototype.ZC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    rj(c, a)
  }
  Object.defineProperty(F.prototype, 'm_hitPointLocal', {
    get: F.prototype.tA,
    set: F.prototype.ZC
  })
  F.prototype.get_m_hitFraction = F.prototype.oA = function () {
    return sj(this.ly)
  }
  F.prototype.set_m_hitFraction = F.prototype.UC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    tj(c, a)
  }
  Object.defineProperty(F.prototype, 'm_hitFraction', { get: F.prototype.oA, set: F.prototype.UC })
  F.prototype.__destroy__ = function () {
    uj(this.ly)
  }
  function G(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = vj(a, c)
    h(G)[this.ly] = this
  }
  G.prototype = Object.create(w.prototype)
  G.prototype.constructor = G
  G.prototype.my = G
  G.ny = {}
  b.ClosestConvexResultCallback = G
  G.prototype.hasHit = function () {
    return !!wj(this.ly)
  }
  G.prototype.get_m_hitCollisionObject = G.prototype.Ly = function () {
    return k(xj(this.ly), q)
  }
  G.prototype.set_m_hitCollisionObject = G.prototype.Vy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    yj(c, a)
  }
  Object.defineProperty(G.prototype, 'm_hitCollisionObject', {
    get: G.prototype.Ly,
    set: G.prototype.Vy
  })
  G.prototype.get_m_convexFromWorld = G.prototype.Yz = function () {
    return k(zj(this.ly), m)
  }
  G.prototype.set_m_convexFromWorld = G.prototype.DC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Aj(c, a)
  }
  Object.defineProperty(G.prototype, 'm_convexFromWorld', {
    get: G.prototype.Yz,
    set: G.prototype.DC
  })
  G.prototype.get_m_convexToWorld = G.prototype.Zz = function () {
    return k(Bj(this.ly), m)
  }
  G.prototype.set_m_convexToWorld = G.prototype.EC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Cj(c, a)
  }
  Object.defineProperty(G.prototype, 'm_convexToWorld', {
    get: G.prototype.Zz,
    set: G.prototype.EC
  })
  G.prototype.get_m_hitNormalWorld = G.prototype.wy = function () {
    return k(Dj(this.ly), m)
  }
  G.prototype.set_m_hitNormalWorld = G.prototype.Dy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ej(c, a)
  }
  Object.defineProperty(G.prototype, 'm_hitNormalWorld', {
    get: G.prototype.wy,
    set: G.prototype.Dy
  })
  G.prototype.get_m_hitPointWorld = G.prototype.xy = function () {
    return k(Fj(this.ly), m)
  }
  G.prototype.set_m_hitPointWorld = G.prototype.Ey = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Gj(c, a)
  }
  Object.defineProperty(G.prototype, 'm_hitPointWorld', {
    get: G.prototype.xy,
    set: G.prototype.Ey
  })
  G.prototype.get_m_collisionFilterGroup = G.prototype.oy = function () {
    return Hj(this.ly)
  }
  G.prototype.set_m_collisionFilterGroup = G.prototype.qy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ij(c, a)
  }
  Object.defineProperty(G.prototype, 'm_collisionFilterGroup', {
    get: G.prototype.oy,
    set: G.prototype.qy
  })
  G.prototype.get_m_collisionFilterMask = G.prototype.py = function () {
    return Jj(this.ly)
  }
  G.prototype.set_m_collisionFilterMask = G.prototype.ry = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Kj(c, a)
  }
  Object.defineProperty(G.prototype, 'm_collisionFilterMask', {
    get: G.prototype.py,
    set: G.prototype.ry
  })
  G.prototype.get_m_closestHitFraction = G.prototype.sy = function () {
    return Lj(this.ly)
  }
  G.prototype.set_m_closestHitFraction = G.prototype.ty = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mj(c, a)
  }
  Object.defineProperty(G.prototype, 'm_closestHitFraction', {
    get: G.prototype.sy,
    set: G.prototype.ty
  })
  G.prototype.__destroy__ = function () {
    Nj(this.ly)
  }
  function yB(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = void 0 === c ? Oj(a) : Pj(a, c)
    h(yB)[this.ly] = this
  }
  yB.prototype = Object.create(dB.prototype)
  yB.prototype.constructor = yB
  yB.prototype.my = yB
  yB.ny = {}
  b.btConvexTriangleMeshShape = yB
  yB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Qj(c, a)
  }
  yB.prototype.getLocalScaling = function () {
    return k(Rj(this.ly), m)
  }
  yB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Sj(d, a, c)
  }
  yB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Tj(c, a)
  }
  yB.prototype.getMargin = function () {
    return Uj(this.ly)
  }
  yB.prototype.__destroy__ = function () {
    Vj(this.ly)
  }
  function zB(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = Wj(a)
    h(zB)[this.ly] = this
  }
  zB.prototype = Object.create(l.prototype)
  zB.prototype.constructor = zB
  zB.prototype.my = zB
  zB.ny = {}
  b.btBoxShape = zB
  zB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Xj(c, a)
  }
  zB.prototype.getMargin = function () {
    return Yj(this.ly)
  }
  zB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Zj(c, a)
  }
  zB.prototype.getLocalScaling = function () {
    return k(ak(this.ly), m)
  }
  zB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    bk(d, a, c)
  }
  zB.prototype.__destroy__ = function () {
    ck(this.ly)
  }
  function AB(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = dk(a, c)
    h(AB)[this.ly] = this
  }
  AB.prototype = Object.create(eB.prototype)
  AB.prototype.constructor = AB
  AB.prototype.my = AB
  AB.ny = {}
  b.btCapsuleShapeX = AB
  AB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ek(c, a)
  }
  AB.prototype.getMargin = function () {
    return fk(this.ly)
  }
  AB.prototype.getUpAxis = function () {
    return gk(this.ly)
  }
  AB.prototype.getRadius = function () {
    return hk(this.ly)
  }
  AB.prototype.getHalfHeight = function () {
    return ik(this.ly)
  }
  AB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    jk(c, a)
  }
  AB.prototype.getLocalScaling = function () {
    return k(kk(this.ly), m)
  }
  AB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    lk(d, a, c)
  }
  AB.prototype.__destroy__ = function () {
    mk(this.ly)
  }
  function BB(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = nk(a, c)
    h(BB)[this.ly] = this
  }
  BB.prototype = Object.create(eB.prototype)
  BB.prototype.constructor = BB
  BB.prototype.my = BB
  BB.ny = {}
  b.btCapsuleShapeZ = BB
  BB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ok(c, a)
  }
  BB.prototype.getMargin = function () {
    return pk(this.ly)
  }
  BB.prototype.getUpAxis = function () {
    return qk(this.ly)
  }
  BB.prototype.getRadius = function () {
    return rk(this.ly)
  }
  BB.prototype.getHalfHeight = function () {
    return sk(this.ly)
  }
  BB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    tk(c, a)
  }
  BB.prototype.getLocalScaling = function () {
    return k(uk(this.ly), m)
  }
  BB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    vk(d, a, c)
  }
  BB.prototype.__destroy__ = function () {
    wk(this.ly)
  }
  function CB(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = xk(a)
    h(CB)[this.ly] = this
  }
  CB.prototype = Object.create(fB.prototype)
  CB.prototype.constructor = CB
  CB.prototype.my = CB
  CB.ny = {}
  b.btCylinderShapeX = CB
  CB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    yk(c, a)
  }
  CB.prototype.getMargin = function () {
    return zk(this.ly)
  }
  CB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ak(c, a)
  }
  CB.prototype.getLocalScaling = function () {
    return k(Bk(this.ly), m)
  }
  CB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Ck(d, a, c)
  }
  CB.prototype.__destroy__ = function () {
    Dk(this.ly)
  }
  function DB(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = Ek(a)
    h(DB)[this.ly] = this
  }
  DB.prototype = Object.create(fB.prototype)
  DB.prototype.constructor = DB
  DB.prototype.my = DB
  DB.ny = {}
  b.btCylinderShapeZ = DB
  DB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Fk(c, a)
  }
  DB.prototype.getMargin = function () {
    return Gk(this.ly)
  }
  DB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Hk(c, a)
  }
  DB.prototype.getLocalScaling = function () {
    return k(Ik(this.ly), m)
  }
  DB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Jk(d, a, c)
  }
  DB.prototype.__destroy__ = function () {
    Kk(this.ly)
  }
  function EB(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = Lk(a)
    h(EB)[this.ly] = this
  }
  EB.prototype = Object.create(l.prototype)
  EB.prototype.constructor = EB
  EB.prototype.my = EB
  EB.ny = {}
  b.btSphereShape = EB
  EB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mk(c, a)
  }
  EB.prototype.getMargin = function () {
    return Nk(this.ly)
  }
  EB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ok(c, a)
  }
  EB.prototype.getLocalScaling = function () {
    return k(Pk(this.ly), m)
  }
  EB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Qk(d, a, c)
  }
  EB.prototype.__destroy__ = function () {
    Rk(this.ly)
  }
  function FB(a, c, d) {
    NA()
    a && 'object' === typeof a && (a = a.ly)
    'object' == typeof c && (c = RA(c))
    d && 'object' === typeof d && (d = d.ly)
    this.ly = Sk(a, c, d)
    h(FB)[this.ly] = this
  }
  FB.prototype = Object.create(l.prototype)
  FB.prototype.constructor = FB
  FB.prototype.my = FB
  FB.ny = {}
  b.btMultiSphereShape = FB
  FB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Tk(c, a)
  }
  FB.prototype.getLocalScaling = function () {
    return k(Uk(this.ly), m)
  }
  FB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Vk(d, a, c)
  }
  FB.prototype.__destroy__ = function () {
    Wk(this.ly)
  }
  function GB(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = Xk(a, c)
    h(GB)[this.ly] = this
  }
  GB.prototype = Object.create(gB.prototype)
  GB.prototype.constructor = GB
  GB.prototype.my = GB
  GB.ny = {}
  b.btConeShapeX = GB
  GB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yk(c, a)
  }
  GB.prototype.getLocalScaling = function () {
    return k(Zk(this.ly), m)
  }
  GB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    $k(d, a, c)
  }
  GB.prototype.__destroy__ = function () {
    al(this.ly)
  }
  function HB(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = bl(a, c)
    h(HB)[this.ly] = this
  }
  HB.prototype = Object.create(gB.prototype)
  HB.prototype.constructor = HB
  HB.prototype.my = HB
  HB.ny = {}
  b.btConeShapeZ = HB
  HB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    cl(c, a)
  }
  HB.prototype.getLocalScaling = function () {
    return k(dl(this.ly), m)
  }
  HB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    el(d, a, c)
  }
  HB.prototype.__destroy__ = function () {
    fl(this.ly)
  }
  function IB() {
    throw 'cannot construct a btIntArray, no constructor in IDL'
  }
  IB.prototype = Object.create(f.prototype)
  IB.prototype.constructor = IB
  IB.prototype.my = IB
  IB.ny = {}
  b.btIntArray = IB
  IB.prototype.size = IB.prototype.size = function () {
    return gl(this.ly)
  }
  IB.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return hl(c, a)
  }
  IB.prototype.__destroy__ = function () {
    il(this.ly)
  }
  function JB() {
    throw 'cannot construct a btFace, no constructor in IDL'
  }
  JB.prototype = Object.create(f.prototype)
  JB.prototype.constructor = JB
  JB.prototype.my = JB
  JB.ny = {}
  b.btFace = JB
  JB.prototype.get_m_indices = JB.prototype.wA = function () {
    return k(jl(this.ly), IB)
  }
  JB.prototype.set_m_indices = JB.prototype.bD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    kl(c, a)
  }
  Object.defineProperty(JB.prototype, 'm_indices', { get: JB.prototype.wA, set: JB.prototype.bD })
  JB.prototype.get_m_plane = JB.prototype.QA = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return ll(c, a)
  }
  JB.prototype.set_m_plane = JB.prototype.vD = function (a, c) {
    const d = this.ly
    NA()
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    ml(d, a, c)
  }
  Object.defineProperty(JB.prototype, 'm_plane', { get: JB.prototype.QA, set: JB.prototype.vD })
  JB.prototype.__destroy__ = function () {
    nl(this.ly)
  }
  function vB() {
    throw 'cannot construct a btVector3Array, no constructor in IDL'
  }
  vB.prototype = Object.create(f.prototype)
  vB.prototype.constructor = vB
  vB.prototype.my = vB
  vB.ny = {}
  b.btVector3Array = vB
  vB.prototype.size = vB.prototype.size = function () {
    return ol(this.ly)
  }
  vB.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(pl(c, a), m)
  }
  vB.prototype.__destroy__ = function () {
    ql(this.ly)
  }
  function KB() {
    throw 'cannot construct a btFaceArray, no constructor in IDL'
  }
  KB.prototype = Object.create(f.prototype)
  KB.prototype.constructor = KB
  KB.prototype.my = KB
  KB.ny = {}
  b.btFaceArray = KB
  KB.prototype.size = KB.prototype.size = function () {
    return rl(this.ly)
  }
  KB.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(sl(c, a), JB)
  }
  KB.prototype.__destroy__ = function () {
    tl(this.ly)
  }
  function LB() {
    throw 'cannot construct a btConvexPolyhedron, no constructor in IDL'
  }
  LB.prototype = Object.create(f.prototype)
  LB.prototype.constructor = LB
  LB.prototype.my = LB
  LB.ny = {}
  b.btConvexPolyhedron = LB
  LB.prototype.get_m_vertices = LB.prototype.vB = function () {
    return k(ul(this.ly), vB)
  }
  LB.prototype.set_m_vertices = LB.prototype.aE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    vl(c, a)
  }
  Object.defineProperty(LB.prototype, 'm_vertices', { get: LB.prototype.vB, set: LB.prototype.aE })
  LB.prototype.get_m_faces = LB.prototype.Ky = function () {
    return k(wl(this.ly), KB)
  }
  LB.prototype.set_m_faces = LB.prototype.Uy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    xl(c, a)
  }
  Object.defineProperty(LB.prototype, 'm_faces', { get: LB.prototype.Ky, set: LB.prototype.Uy })
  LB.prototype.__destroy__ = function () {
    yl(this.ly)
  }
  function MB(a, c) {
    NA()
    'object' == typeof a && (a = RA(a))
    c && 'object' === typeof c && (c = c.ly)
    this.ly = void 0 === a ? zl() : void 0 === c ? Al(a) : Bl(a, c)
    h(MB)[this.ly] = this
  }
  MB.prototype = Object.create(l.prototype)
  MB.prototype.constructor = MB
  MB.prototype.my = MB
  MB.ny = {}
  b.btConvexHullShape = MB
  MB.prototype.addPoint = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    void 0 === c ? Cl(d, a) : Dl(d, a, c)
  }
  MB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    El(c, a)
  }
  MB.prototype.getMargin = function () {
    return Fl(this.ly)
  }
  MB.prototype.getNumVertices = function () {
    return Gl(this.ly)
  }
  MB.prototype.initializePolyhedralFeatures = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return !!Hl(c, a)
  }
  MB.prototype.recalcLocalAabb = function () {
    Il(this.ly)
  }
  MB.prototype.getConvexPolyhedron = function () {
    return k(Jl(this.ly), LB)
  }
  MB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Kl(c, a)
  }
  MB.prototype.getLocalScaling = function () {
    return k(Ll(this.ly), m)
  }
  MB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Ml(d, a, c)
  }
  MB.prototype.__destroy__ = function () {
    Nl(this.ly)
  }
  function NB(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = Ol(a)
    h(NB)[this.ly] = this
  }
  NB.prototype = Object.create(f.prototype)
  NB.prototype.constructor = NB
  NB.prototype.my = NB
  NB.ny = {}
  b.btShapeHull = NB
  NB.prototype.buildHull = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return !!Pl(c, a)
  }
  NB.prototype.numVertices = function () {
    return Ql(this.ly)
  }
  NB.prototype.getVertexPointer = function () {
    return k(Rl(this.ly), m)
  }
  NB.prototype.__destroy__ = function () {
    Sl(this.ly)
  }
  function OB(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = void 0 === a ? Tl() : Ul(a)
    h(OB)[this.ly] = this
  }
  OB.prototype = Object.create(l.prototype)
  OB.prototype.constructor = OB
  OB.prototype.my = OB
  OB.ny = {}
  b.btCompoundShape = OB
  OB.prototype.addChildShape = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Vl(d, a, c)
  }
  OB.prototype.removeChildShape = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Wl(c, a)
  }
  OB.prototype.removeChildShapeByIndex = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Xl(c, a)
  }
  OB.prototype.getNumChildShapes = function () {
    return Yl(this.ly)
  }
  OB.prototype.getChildShape = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Zl(c, a), l)
  }
  OB.prototype.updateChildTransform = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    void 0 === d ? $l(e, a, c) : am(e, a, c, d)
  }
  OB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    bm(c, a)
  }
  OB.prototype.getMargin = function () {
    return cm(this.ly)
  }
  OB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    dm(c, a)
  }
  OB.prototype.getLocalScaling = function () {
    return k(em(this.ly), m)
  }
  OB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    fm(d, a, c)
  }
  OB.prototype.__destroy__ = function () {
    gm(this.ly)
  }
  function PB() {
    throw 'cannot construct a btIndexedMesh, no constructor in IDL'
  }
  PB.prototype = Object.create(f.prototype)
  PB.prototype.constructor = PB
  PB.prototype.my = PB
  PB.ny = {}
  b.btIndexedMesh = PB
  PB.prototype.get_m_numTriangles = PB.prototype.PA = function () {
    return hm(this.ly)
  }
  PB.prototype.set_m_numTriangles = PB.prototype.uD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    im(c, a)
  }
  Object.defineProperty(PB.prototype, 'm_numTriangles', {
    get: PB.prototype.PA,
    set: PB.prototype.uD
  })
  PB.prototype.__destroy__ = function () {
    jm(this.ly)
  }
  function QB() {
    throw 'cannot construct a btIndexedMeshArray, no constructor in IDL'
  }
  QB.prototype = Object.create(f.prototype)
  QB.prototype.constructor = QB
  QB.prototype.my = QB
  QB.ny = {}
  b.btIndexedMeshArray = QB
  QB.prototype.size = QB.prototype.size = function () {
    return km(this.ly)
  }
  QB.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(lm(c, a), PB)
  }
  QB.prototype.__destroy__ = function () {
    mm(this.ly)
  }
  function RB(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = void 0 === a ? nm() : void 0 === c ? om(a) : pm(a, c)
    h(RB)[this.ly] = this
  }
  RB.prototype = Object.create(hB.prototype)
  RB.prototype.constructor = RB
  RB.prototype.my = RB
  RB.ny = {}
  b.btTriangleMesh = RB
  RB.prototype.addTriangle = function (a, c, d, e) {
    const g = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    void 0 === e ? qm(g, a, c, d) : rm(g, a, c, d, e)
  }
  RB.prototype.findOrAddVertex = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return sm(d, a, c)
  }
  RB.prototype.addIndex = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    tm(c, a)
  }
  RB.prototype.getIndexedMeshArray = function () {
    return k(um(this.ly), QB)
  }
  RB.prototype.setScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    wm(c, a)
  }
  RB.prototype.__destroy__ = function () {
    xm(this.ly)
  }
  function SB() {
    this.ly = ym()
    h(SB)[this.ly] = this
  }
  SB.prototype = Object.create(YA.prototype)
  SB.prototype.constructor = SB
  SB.prototype.my = SB
  SB.ny = {}
  b.btEmptyShape = SB
  SB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    zm(c, a)
  }
  SB.prototype.getLocalScaling = function () {
    return k(Am(this.ly), m)
  }
  SB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Bm(d, a, c)
  }
  SB.prototype.__destroy__ = function () {
    Cm(this.ly)
  }
  function TB(a, c) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    this.ly = Dm(a, c)
    h(TB)[this.ly] = this
  }
  TB.prototype = Object.create(YA.prototype)
  TB.prototype.constructor = TB
  TB.prototype.my = TB
  TB.ny = {}
  b.btStaticPlaneShape = TB
  TB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Em(c, a)
  }
  TB.prototype.getLocalScaling = function () {
    return k(Fm(this.ly), m)
  }
  TB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Gm(d, a, c)
  }
  TB.prototype.__destroy__ = function () {
    Hm(this.ly)
  }
  function UB(a, c, d) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    this.ly = void 0 === d ? Im(a, c) : Jm(a, c, d)
    h(UB)[this.ly] = this
  }
  UB.prototype = Object.create(iB.prototype)
  UB.prototype.constructor = UB
  UB.prototype.my = UB
  UB.ny = {}
  b.btBvhTriangleMeshShape = UB
  UB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Km(c, a)
  }
  UB.prototype.getLocalScaling = function () {
    return k(Lm(this.ly), m)
  }
  UB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Mm(d, a, c)
  }
  UB.prototype.__destroy__ = function () {
    Nm(this.ly)
  }
  function VB(a, c, d, e, g, n, D, R, va) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    n && 'object' === typeof n && (n = n.ly)
    D && 'object' === typeof D && (D = D.ly)
    R && 'object' === typeof R && (R = R.ly)
    va && 'object' === typeof va && (va = va.ly)
    this.ly = Om(a, c, d, e, g, n, D, R, va)
    h(VB)[this.ly] = this
  }
  VB.prototype = Object.create(YA.prototype)
  VB.prototype.constructor = VB
  VB.prototype.my = VB
  VB.ny = {}
  b.btHeightfieldTerrainShape = VB
  VB.prototype.setMargin = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Pm(c, a)
  }
  VB.prototype.getMargin = function () {
    return Qm(this.ly)
  }
  VB.prototype.setLocalScaling = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Rm(c, a)
  }
  VB.prototype.getLocalScaling = function () {
    return k(Sm(this.ly), m)
  }
  VB.prototype.calculateLocalInertia = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Tm(d, a, c)
  }
  VB.prototype.__destroy__ = function () {
    Um(this.ly)
  }
  function WB() {
    this.ly = Vm()
    h(WB)[this.ly] = this
  }
  WB.prototype = Object.create(f.prototype)
  WB.prototype.constructor = WB
  WB.prototype.my = WB
  WB.ny = {}
  b.btDefaultCollisionConstructionInfo = WB
  WB.prototype.__destroy__ = function () {
    Wm(this.ly)
  }
  function kB() {
    this.ly = Xm()
    h(kB)[this.ly] = this
  }
  kB.prototype = Object.create(f.prototype)
  kB.prototype.constructor = kB
  kB.prototype.my = kB
  kB.ny = {}
  b.btPersistentManifold = kB
  kB.prototype.getBody0 = function () {
    return k(Ym(this.ly), q)
  }
  kB.prototype.getBody1 = function () {
    return k(Zm(this.ly), q)
  }
  kB.prototype.getNumContacts = function () {
    return $m(this.ly)
  }
  kB.prototype.getContactPoint = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(an(c, a), E)
  }
  kB.prototype.__destroy__ = function () {
    bn(this.ly)
  }
  function XB(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = cn(a)
    h(XB)[this.ly] = this
  }
  XB.prototype = Object.create(TA.prototype)
  XB.prototype.constructor = XB
  XB.prototype.my = XB
  XB.ny = {}
  b.btCollisionDispatcher = XB
  XB.prototype.getNumManifolds = function () {
    return dn(this.ly)
  }
  XB.prototype.getManifoldByIndexInternal = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(en(c, a), kB)
  }
  XB.prototype.__destroy__ = function () {
    fn(this.ly)
  }
  function YB() {
    throw 'cannot construct a btOverlappingPairCallback, no constructor in IDL'
  }
  YB.prototype = Object.create(f.prototype)
  YB.prototype.constructor = YB
  YB.prototype.my = YB
  YB.ny = {}
  b.btOverlappingPairCallback = YB
  YB.prototype.__destroy__ = function () {
    gn(this.ly)
  }
  function UA() {
    throw 'cannot construct a btOverlappingPairCache, no constructor in IDL'
  }
  UA.prototype = Object.create(f.prototype)
  UA.prototype.constructor = UA
  UA.prototype.my = UA
  UA.ny = {}
  b.btOverlappingPairCache = UA
  UA.prototype.setInternalGhostPairCallback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    hn(c, a)
  }
  UA.prototype.getNumOverlappingPairs = function () {
    return jn(this.ly)
  }
  UA.prototype.__destroy__ = function () {
    kn(this.ly)
  }
  function ZB(a, c, d, e, g) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    this.ly =
      void 0 === d
        ? ln(a, c)
        : void 0 === e
          ? mn(a, c, d)
          : void 0 === g
            ? nn(a, c, d, e)
            : on(a, c, d, e, g)
    h(ZB)[this.ly] = this
  }
  ZB.prototype = Object.create(f.prototype)
  ZB.prototype.constructor = ZB
  ZB.prototype.my = ZB
  ZB.ny = {}
  b.btAxisSweep3 = ZB
  ZB.prototype.__destroy__ = function () {
    pn(this.ly)
  }
  function VA() {
    throw 'cannot construct a btBroadphaseInterface, no constructor in IDL'
  }
  VA.prototype = Object.create(f.prototype)
  VA.prototype.constructor = VA
  VA.prototype.my = VA
  VA.ny = {}
  b.btBroadphaseInterface = VA
  VA.prototype.getOverlappingPairCache = function () {
    return k(qn(this.ly), UA)
  }
  VA.prototype.__destroy__ = function () {
    rn(this.ly)
  }
  function $B() {
    throw 'cannot construct a btCollisionConfiguration, no constructor in IDL'
  }
  $B.prototype = Object.create(f.prototype)
  $B.prototype.constructor = $B
  $B.prototype.my = $B
  $B.ny = {}
  b.btCollisionConfiguration = $B
  $B.prototype.__destroy__ = function () {
    sn(this.ly)
  }
  function aC() {
    this.ly = tn()
    h(aC)[this.ly] = this
  }
  aC.prototype = Object.create(f.prototype)
  aC.prototype.constructor = aC
  aC.prototype.my = aC
  aC.ny = {}
  b.btDbvtBroadphase = aC
  aC.prototype.__destroy__ = function () {
    un(this.ly)
  }
  function t() {
    throw 'cannot construct a btBroadphaseProxy, no constructor in IDL'
  }
  t.prototype = Object.create(f.prototype)
  t.prototype.constructor = t
  t.prototype.my = t
  t.ny = {}
  b.btBroadphaseProxy = t
  t.prototype.get_m_collisionFilterGroup = t.prototype.oy = function () {
    return vn(this.ly)
  }
  t.prototype.set_m_collisionFilterGroup = t.prototype.qy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    wn(c, a)
  }
  Object.defineProperty(t.prototype, 'm_collisionFilterGroup', {
    get: t.prototype.oy,
    set: t.prototype.qy
  })
  t.prototype.get_m_collisionFilterMask = t.prototype.py = function () {
    return xn(this.ly)
  }
  t.prototype.set_m_collisionFilterMask = t.prototype.ry = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    yn(c, a)
  }
  Object.defineProperty(t.prototype, 'm_collisionFilterMask', {
    get: t.prototype.py,
    set: t.prototype.ry
  })
  t.prototype.__destroy__ = function () {
    zn(this.ly)
  }
  function H(a, c, d, e) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    this.ly = void 0 === e ? An(a, c, d) : Bn(a, c, d, e)
    h(H)[this.ly] = this
  }
  H.prototype = Object.create(f.prototype)
  H.prototype.constructor = H
  H.prototype.my = H
  H.ny = {}
  b.btRigidBodyConstructionInfo = H
  H.prototype.get_m_linearDamping = H.prototype.CA = function () {
    return Cn(this.ly)
  }
  H.prototype.set_m_linearDamping = H.prototype.hD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Dn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_linearDamping', {
    get: H.prototype.CA,
    set: H.prototype.hD
  })
  H.prototype.get_m_angularDamping = H.prototype.Hz = function () {
    return En(this.ly)
  }
  H.prototype.set_m_angularDamping = H.prototype.mC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Fn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_angularDamping', {
    get: H.prototype.Hz,
    set: H.prototype.mC
  })
  H.prototype.get_m_friction = H.prototype.jA = function () {
    return Gn(this.ly)
  }
  H.prototype.set_m_friction = H.prototype.PC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Hn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_friction', { get: H.prototype.jA, set: H.prototype.PC })
  H.prototype.get_m_rollingFriction = H.prototype.YA = function () {
    return In(this.ly)
  }
  H.prototype.set_m_rollingFriction = H.prototype.DD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Jn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_rollingFriction', {
    get: H.prototype.YA,
    set: H.prototype.DD
  })
  H.prototype.get_m_restitution = H.prototype.WA = function () {
    return Kn(this.ly)
  }
  H.prototype.set_m_restitution = H.prototype.BD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ln(c, a)
  }
  Object.defineProperty(H.prototype, 'm_restitution', { get: H.prototype.WA, set: H.prototype.BD })
  H.prototype.get_m_linearSleepingThreshold = H.prototype.DA = function () {
    return Mn(this.ly)
  }
  H.prototype.set_m_linearSleepingThreshold = H.prototype.iD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Nn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_linearSleepingThreshold', {
    get: H.prototype.DA,
    set: H.prototype.iD
  })
  H.prototype.get_m_angularSleepingThreshold = H.prototype.Iz = function () {
    return On(this.ly)
  }
  H.prototype.set_m_angularSleepingThreshold = H.prototype.nC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Pn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_angularSleepingThreshold', {
    get: H.prototype.Iz,
    set: H.prototype.nC
  })
  H.prototype.get_m_additionalDamping = H.prototype.Cz = function () {
    return !!Qn(this.ly)
  }
  H.prototype.set_m_additionalDamping = H.prototype.hC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Rn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_additionalDamping', {
    get: H.prototype.Cz,
    set: H.prototype.hC
  })
  H.prototype.get_m_additionalDampingFactor = H.prototype.Dz = function () {
    return Sn(this.ly)
  }
  H.prototype.set_m_additionalDampingFactor = H.prototype.iC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Tn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_additionalDampingFactor', {
    get: H.prototype.Dz,
    set: H.prototype.iC
  })
  H.prototype.get_m_additionalLinearDampingThresholdSqr = H.prototype.Ez = function () {
    return Un(this.ly)
  }
  H.prototype.set_m_additionalLinearDampingThresholdSqr = H.prototype.jC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Vn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_additionalLinearDampingThresholdSqr', {
    get: H.prototype.Ez,
    set: H.prototype.jC
  })
  H.prototype.get_m_additionalAngularDampingThresholdSqr = H.prototype.Bz = function () {
    return Wn(this.ly)
  }
  H.prototype.set_m_additionalAngularDampingThresholdSqr = H.prototype.gC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Xn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_additionalAngularDampingThresholdSqr', {
    get: H.prototype.Bz,
    set: H.prototype.gC
  })
  H.prototype.get_m_additionalAngularDampingFactor = H.prototype.Az = function () {
    return Yn(this.ly)
  }
  H.prototype.set_m_additionalAngularDampingFactor = H.prototype.fC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Zn(c, a)
  }
  Object.defineProperty(H.prototype, 'm_additionalAngularDampingFactor', {
    get: H.prototype.Az,
    set: H.prototype.fC
  })
  H.prototype.__destroy__ = function () {
    $n(this.ly)
  }
  function I(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = ao(a)
    h(I)[this.ly] = this
  }
  I.prototype = Object.create(q.prototype)
  I.prototype.constructor = I
  I.prototype.my = I
  I.ny = {}
  b.btRigidBody = I
  I.prototype.getCenterOfMassTransform = function () {
    return k(bo(this.ly), r)
  }
  I.prototype.setCenterOfMassTransform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    co(c, a)
  }
  I.prototype.setSleepingThresholds = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    eo(d, a, c)
  }
  I.prototype.getLinearDamping = function () {
    return fo(this.ly)
  }
  I.prototype.getAngularDamping = function () {
    return go(this.ly)
  }
  I.prototype.setDamping = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    ho(d, a, c)
  }
  I.prototype.setMassProps = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    io(d, a, c)
  }
  I.prototype.getLinearFactor = function () {
    return k(jo(this.ly), m)
  }
  I.prototype.setLinearFactor = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ko(c, a)
  }
  I.prototype.applyTorque = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    lo(c, a)
  }
  I.prototype.applyLocalTorque = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    mo(c, a)
  }
  I.prototype.applyForce = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    no(d, a, c)
  }
  I.prototype.applyCentralForce = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    oo(c, a)
  }
  I.prototype.applyCentralLocalForce = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    po(c, a)
  }
  I.prototype.applyTorqueImpulse = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    qo(c, a)
  }
  I.prototype.applyImpulse = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    ro(d, a, c)
  }
  I.prototype.applyCentralImpulse = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    so(c, a)
  }
  I.prototype.updateInertiaTensor = function () {
    to(this.ly)
  }
  I.prototype.getLinearVelocity = function () {
    return k(uo(this.ly), m)
  }
  I.prototype.getAngularVelocity = function () {
    return k(vo(this.ly), m)
  }
  I.prototype.setLinearVelocity = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    wo(c, a)
  }
  I.prototype.setAngularVelocity = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    xo(c, a)
  }
  I.prototype.getMotionState = function () {
    return k(yo(this.ly), bB)
  }
  I.prototype.setMotionState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    zo(c, a)
  }
  I.prototype.getAngularFactor = function () {
    return k(Ao(this.ly), m)
  }
  I.prototype.setAngularFactor = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Bo(c, a)
  }
  I.prototype.upcast = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Co(c, a), I)
  }
  I.prototype.getAabb = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Do(d, a, c)
  }
  I.prototype.applyGravity = function () {
    Eo(this.ly)
  }
  I.prototype.getGravity = function () {
    return k(Fo(this.ly), m)
  }
  I.prototype.setGravity = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Go(c, a)
  }
  I.prototype.getBroadphaseProxy = function () {
    return k(Ho(this.ly), t)
  }
  I.prototype.clearForces = function () {
    Io(this.ly)
  }
  I.prototype.setAnisotropicFriction = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Jo(d, a, c)
  }
  I.prototype.getCollisionShape = function () {
    return k(Ko(this.ly), l)
  }
  I.prototype.setContactProcessingThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Lo(c, a)
  }
  I.prototype.setActivationState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mo(c, a)
  }
  I.prototype.forceActivationState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    No(c, a)
  }
  I.prototype.activate = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    void 0 === a ? Oo(c) : Po(c, a)
  }
  I.prototype.isActive = function () {
    return !!Qo(this.ly)
  }
  I.prototype.isKinematicObject = function () {
    return !!Ro(this.ly)
  }
  I.prototype.isStaticObject = function () {
    return !!So(this.ly)
  }
  I.prototype.isStaticOrKinematicObject = function () {
    return !!To(this.ly)
  }
  I.prototype.getRestitution = function () {
    return Uo(this.ly)
  }
  I.prototype.getFriction = function () {
    return Vo(this.ly)
  }
  I.prototype.getRollingFriction = function () {
    return Wo(this.ly)
  }
  I.prototype.setRestitution = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Xo(c, a)
  }
  I.prototype.setFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yo(c, a)
  }
  I.prototype.setRollingFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Zo(c, a)
  }
  I.prototype.getWorldTransform = function () {
    return k($o(this.ly), r)
  }
  I.prototype.getCollisionFlags = function () {
    return ap(this.ly)
  }
  I.prototype.setCollisionFlags = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    bp(c, a)
  }
  I.prototype.setWorldTransform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    cp(c, a)
  }
  I.prototype.setCollisionShape = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    dp(c, a)
  }
  I.prototype.setCcdMotionThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ep(c, a)
  }
  I.prototype.setCcdSweptSphereRadius = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    fp(c, a)
  }
  I.prototype.getUserIndex = function () {
    return gp(this.ly)
  }
  I.prototype.setUserIndex = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    hp(c, a)
  }
  I.prototype.getUserPointer = function () {
    return k(ip(this.ly), XA)
  }
  I.prototype.setUserPointer = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    jp(c, a)
  }
  I.prototype.getBroadphaseHandle = function () {
    return k(kp(this.ly), t)
  }
  I.prototype.__destroy__ = function () {
    lp(this.ly)
  }
  function J() {
    this.ly = mp()
    h(J)[this.ly] = this
  }
  J.prototype = Object.create(f.prototype)
  J.prototype.constructor = J
  J.prototype.my = J
  J.ny = {}
  b.btConstraintSetting = J
  J.prototype.get_m_tau = J.prototype.mB = function () {
    return np(this.ly)
  }
  J.prototype.set_m_tau = J.prototype.SD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    op(c, a)
  }
  Object.defineProperty(J.prototype, 'm_tau', { get: J.prototype.mB, set: J.prototype.SD })
  J.prototype.get_m_damping = J.prototype.$z = function () {
    return pp(this.ly)
  }
  J.prototype.set_m_damping = J.prototype.FC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    qp(c, a)
  }
  Object.defineProperty(J.prototype, 'm_damping', { get: J.prototype.$z, set: J.prototype.FC })
  J.prototype.get_m_impulseClamp = J.prototype.vA = function () {
    return rp(this.ly)
  }
  J.prototype.set_m_impulseClamp = J.prototype.aD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    sp(c, a)
  }
  Object.defineProperty(J.prototype, 'm_impulseClamp', { get: J.prototype.vA, set: J.prototype.aD })
  J.prototype.__destroy__ = function () {
    tp(this.ly)
  }
  function bC(a, c, d, e) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    this.ly =
      void 0 === d
        ? up(a, c)
        : void 0 === e
          ? _emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_3(a, c, d)
          : vp(a, c, d, e)
    h(bC)[this.ly] = this
  }
  bC.prototype = Object.create(ZA.prototype)
  bC.prototype.constructor = bC
  bC.prototype.my = bC
  bC.ny = {}
  b.btPoint2PointConstraint = bC
  bC.prototype.setPivotA = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    wp(c, a)
  }
  bC.prototype.setPivotB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    xp(c, a)
  }
  bC.prototype.getPivotInA = function () {
    return k(yp(this.ly), m)
  }
  bC.prototype.getPivotInB = function () {
    return k(zp(this.ly), m)
  }
  bC.prototype.enableFeedback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ap(c, a)
  }
  bC.prototype.getBreakingImpulseThreshold = function () {
    return Bp(this.ly)
  }
  bC.prototype.setBreakingImpulseThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Cp(c, a)
  }
  bC.prototype.getParam = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return Dp(d, a, c)
  }
  bC.prototype.setParam = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Ep(e, a, c, d)
  }
  bC.prototype.get_m_setting = bC.prototype.$A = function () {
    return k(Fp(this.ly), J)
  }
  bC.prototype.set_m_setting = bC.prototype.FD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Gp(c, a)
  }
  Object.defineProperty(bC.prototype, 'm_setting', { get: bC.prototype.$A, set: bC.prototype.FD })
  bC.prototype.__destroy__ = function () {
    Hp(this.ly)
  }
  function cC(a, c, d, e, g) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    this.ly =
      void 0 === e
        ? Ip(a, c, d)
        : void 0 === g
          ? _emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_4(
              a,
              c,
              d,
              e
            )
          : Jp(a, c, d, e, g)
    h(cC)[this.ly] = this
  }
  cC.prototype = Object.create(lB.prototype)
  cC.prototype.constructor = cC
  cC.prototype.my = cC
  cC.ny = {}
  b.btGeneric6DofSpringConstraint = cC
  cC.prototype.enableSpring = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Kp(d, a, c)
  }
  cC.prototype.setStiffness = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Lp(d, a, c)
  }
  cC.prototype.setDamping = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Mp(d, a, c)
  }
  cC.prototype.setEquilibriumPoint = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    void 0 === a ? Np(d) : void 0 === c ? Op(d, a) : Pp(d, a, c)
  }
  cC.prototype.setLinearLowerLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Qp(c, a)
  }
  cC.prototype.setLinearUpperLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Rp(c, a)
  }
  cC.prototype.setAngularLowerLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Sp(c, a)
  }
  cC.prototype.setAngularUpperLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Tp(c, a)
  }
  cC.prototype.getFrameOffsetA = function () {
    return k(Up(this.ly), r)
  }
  cC.prototype.enableFeedback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Vp(c, a)
  }
  cC.prototype.getBreakingImpulseThreshold = function () {
    return Wp(this.ly)
  }
  cC.prototype.setBreakingImpulseThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Xp(c, a)
  }
  cC.prototype.getParam = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return Yp(d, a, c)
  }
  cC.prototype.setParam = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Zp(e, a, c, d)
  }
  cC.prototype.__destroy__ = function () {
    $p(this.ly)
  }
  function dC() {
    this.ly = aq()
    h(dC)[this.ly] = this
  }
  dC.prototype = Object.create(f.prototype)
  dC.prototype.constructor = dC
  dC.prototype.my = dC
  dC.ny = {}
  b.btSequentialImpulseConstraintSolver = dC
  dC.prototype.__destroy__ = function () {
    bq(this.ly)
  }
  function eC(a, c, d, e) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    this.ly =
      void 0 === d
        ? cq(a, c)
        : void 0 === e
          ? _emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_3(a, c, d)
          : dq(a, c, d, e)
    h(eC)[this.ly] = this
  }
  eC.prototype = Object.create(ZA.prototype)
  eC.prototype.constructor = eC
  eC.prototype.my = eC
  eC.ny = {}
  b.btConeTwistConstraint = eC
  eC.prototype.setLimit = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    eq(d, a, c)
  }
  eC.prototype.setAngularOnly = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    fq(c, a)
  }
  eC.prototype.setDamping = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    gq(c, a)
  }
  eC.prototype.enableMotor = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    hq(c, a)
  }
  eC.prototype.setMaxMotorImpulse = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    iq(c, a)
  }
  eC.prototype.setMaxMotorImpulseNormalized = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    jq(c, a)
  }
  eC.prototype.setMotorTarget = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    kq(c, a)
  }
  eC.prototype.setMotorTargetInConstraintSpace = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    lq(c, a)
  }
  eC.prototype.enableFeedback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    mq(c, a)
  }
  eC.prototype.getBreakingImpulseThreshold = function () {
    return nq(this.ly)
  }
  eC.prototype.setBreakingImpulseThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    oq(c, a)
  }
  eC.prototype.getParam = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return pq(d, a, c)
  }
  eC.prototype.setParam = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    qq(e, a, c, d)
  }
  eC.prototype.__destroy__ = function () {
    rq(this.ly)
  }
  function fC(a, c, d, e, g, n, D) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    n && 'object' === typeof n && (n = n.ly)
    D && 'object' === typeof D && (D = D.ly)
    this.ly =
      void 0 === d
        ? sq(a, c)
        : void 0 === e
          ? tq(a, c, d)
          : void 0 === g
            ? uq(a, c, d, e)
            : void 0 === n
              ? vq(a, c, d, e, g)
              : void 0 === D
                ? wq(a, c, d, e, g, n)
                : xq(a, c, d, e, g, n, D)
    h(fC)[this.ly] = this
  }
  fC.prototype = Object.create(ZA.prototype)
  fC.prototype.constructor = fC
  fC.prototype.my = fC
  fC.ny = {}
  b.btHingeConstraint = fC
  fC.prototype.setLimit = function (a, c, d, e, g) {
    const n = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    void 0 === g ? yq(n, a, c, d, e) : zq(n, a, c, d, e, g)
  }
  fC.prototype.enableAngularMotor = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Aq(e, a, c, d)
  }
  fC.prototype.setAngularOnly = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Bq(c, a)
  }
  fC.prototype.enableMotor = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Cq(c, a)
  }
  fC.prototype.setMaxMotorImpulse = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Dq(c, a)
  }
  fC.prototype.setMotorTarget = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Eq(d, a, c)
  }
  fC.prototype.enableFeedback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Fq(c, a)
  }
  fC.prototype.getBreakingImpulseThreshold = function () {
    return Gq(this.ly)
  }
  fC.prototype.setBreakingImpulseThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Hq(c, a)
  }
  fC.prototype.getParam = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return Iq(d, a, c)
  }
  fC.prototype.setParam = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Jq(e, a, c, d)
  }
  fC.prototype.__destroy__ = function () {
    Kq(this.ly)
  }
  function gC(a, c, d, e, g) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    this.ly =
      void 0 === e
        ? Lq(a, c, d)
        : void 0 === g
          ? _emscripten_bind_btSliderConstraint_btSliderConstraint_4(a, c, d, e)
          : Mq(a, c, d, e, g)
    h(gC)[this.ly] = this
  }
  gC.prototype = Object.create(ZA.prototype)
  gC.prototype.constructor = gC
  gC.prototype.my = gC
  gC.ny = {}
  b.btSliderConstraint = gC
  gC.prototype.setLowerLinLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Nq(c, a)
  }
  gC.prototype.setUpperLinLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Oq(c, a)
  }
  gC.prototype.setLowerAngLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Pq(c, a)
  }
  gC.prototype.setUpperAngLimit = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Qq(c, a)
  }
  gC.prototype.enableFeedback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Rq(c, a)
  }
  gC.prototype.getBreakingImpulseThreshold = function () {
    return Sq(this.ly)
  }
  gC.prototype.setBreakingImpulseThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Tq(c, a)
  }
  gC.prototype.getParam = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return Uq(d, a, c)
  }
  gC.prototype.setParam = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Vq(e, a, c, d)
  }
  gC.prototype.__destroy__ = function () {
    Wq(this.ly)
  }
  function hC(a, c, d, e) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    this.ly = Xq(a, c, d, e)
    h(hC)[this.ly] = this
  }
  hC.prototype = Object.create(ZA.prototype)
  hC.prototype.constructor = hC
  hC.prototype.my = hC
  hC.ny = {}
  b.btFixedConstraint = hC
  hC.prototype.enableFeedback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yq(c, a)
  }
  hC.prototype.getBreakingImpulseThreshold = function () {
    return Zq(this.ly)
  }
  hC.prototype.setBreakingImpulseThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    $q(c, a)
  }
  hC.prototype.getParam = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return ar(d, a, c)
  }
  hC.prototype.setParam = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    br(e, a, c, d)
  }
  hC.prototype.__destroy__ = function () {
    cr(this.ly)
  }
  function iC() {
    throw 'cannot construct a btConstraintSolver, no constructor in IDL'
  }
  iC.prototype = Object.create(f.prototype)
  iC.prototype.constructor = iC
  iC.prototype.my = iC
  iC.ny = {}
  b.btConstraintSolver = iC
  iC.prototype.__destroy__ = function () {
    dr(this.ly)
  }
  function p() {
    throw 'cannot construct a btDispatcherInfo, no constructor in IDL'
  }
  p.prototype = Object.create(f.prototype)
  p.prototype.constructor = p
  p.prototype.my = p
  p.ny = {}
  b.btDispatcherInfo = p
  p.prototype.get_m_timeStep = p.prototype.oB = function () {
    return er(this.ly)
  }
  p.prototype.set_m_timeStep = p.prototype.UD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    fr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_timeStep', { get: p.prototype.oB, set: p.prototype.UD })
  p.prototype.get_m_stepCount = p.prototype.fB = function () {
    return gr(this.ly)
  }
  p.prototype.set_m_stepCount = p.prototype.LD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    hr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_stepCount', { get: p.prototype.fB, set: p.prototype.LD })
  p.prototype.get_m_dispatchFunc = p.prototype.bA = function () {
    return ir(this.ly)
  }
  p.prototype.set_m_dispatchFunc = p.prototype.HC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    jr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_dispatchFunc', { get: p.prototype.bA, set: p.prototype.HC })
  p.prototype.get_m_timeOfImpact = p.prototype.nB = function () {
    return kr(this.ly)
  }
  p.prototype.set_m_timeOfImpact = p.prototype.TD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    lr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_timeOfImpact', { get: p.prototype.nB, set: p.prototype.TD })
  p.prototype.get_m_useContinuous = p.prototype.qB = function () {
    return !!mr(this.ly)
  }
  p.prototype.set_m_useContinuous = p.prototype.WD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    nr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_useContinuous', {
    get: p.prototype.qB,
    set: p.prototype.WD
  })
  p.prototype.get_m_enableSatConvex = p.prototype.fA = function () {
    return !!or(this.ly)
  }
  p.prototype.set_m_enableSatConvex = p.prototype.LC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    pr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_enableSatConvex', {
    get: p.prototype.fA,
    set: p.prototype.LC
  })
  p.prototype.get_m_enableSPU = p.prototype.eA = function () {
    return !!qr(this.ly)
  }
  p.prototype.set_m_enableSPU = p.prototype.KC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    rr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_enableSPU', { get: p.prototype.eA, set: p.prototype.KC })
  p.prototype.get_m_useEpa = p.prototype.sB = function () {
    return !!sr(this.ly)
  }
  p.prototype.set_m_useEpa = p.prototype.YD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    tr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_useEpa', { get: p.prototype.sB, set: p.prototype.YD })
  p.prototype.get_m_allowedCcdPenetration = p.prototype.Fz = function () {
    return ur(this.ly)
  }
  p.prototype.set_m_allowedCcdPenetration = p.prototype.kC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    vr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_allowedCcdPenetration', {
    get: p.prototype.Fz,
    set: p.prototype.kC
  })
  p.prototype.get_m_useConvexConservativeDistanceUtil = p.prototype.rB = function () {
    return !!wr(this.ly)
  }
  p.prototype.set_m_useConvexConservativeDistanceUtil = p.prototype.XD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    xr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_useConvexConservativeDistanceUtil', {
    get: p.prototype.rB,
    set: p.prototype.XD
  })
  p.prototype.get_m_convexConservativeDistanceThreshold = p.prototype.Xz = function () {
    return yr(this.ly)
  }
  p.prototype.set_m_convexConservativeDistanceThreshold = p.prototype.CC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    zr(c, a)
  }
  Object.defineProperty(p.prototype, 'm_convexConservativeDistanceThreshold', {
    get: p.prototype.Xz,
    set: p.prototype.CC
  })
  p.prototype.__destroy__ = function () {
    Ar(this.ly)
  }
  function u() {
    throw 'cannot construct a btContactSolverInfo, no constructor in IDL'
  }
  u.prototype = Object.create(f.prototype)
  u.prototype.constructor = u
  u.prototype.my = u
  u.ny = {}
  b.btContactSolverInfo = u
  u.prototype.get_m_splitImpulse = u.prototype.cB = function () {
    return !!Br(this.ly)
  }
  u.prototype.set_m_splitImpulse = u.prototype.ID = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Cr(c, a)
  }
  Object.defineProperty(u.prototype, 'm_splitImpulse', { get: u.prototype.cB, set: u.prototype.ID })
  u.prototype.get_m_splitImpulsePenetrationThreshold = u.prototype.dB = function () {
    return Dr(this.ly)
  }
  u.prototype.set_m_splitImpulsePenetrationThreshold = u.prototype.JD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Er(c, a)
  }
  Object.defineProperty(u.prototype, 'm_splitImpulsePenetrationThreshold', {
    get: u.prototype.dB,
    set: u.prototype.JD
  })
  u.prototype.get_m_numIterations = u.prototype.OA = function () {
    return Fr(this.ly)
  }
  u.prototype.set_m_numIterations = u.prototype.tD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Gr(c, a)
  }
  Object.defineProperty(u.prototype, 'm_numIterations', {
    get: u.prototype.OA,
    set: u.prototype.tD
  })
  u.prototype.__destroy__ = function () {
    Hr(this.ly)
  }
  function K() {
    this.ly = Ir()
    h(K)[this.ly] = this
  }
  K.prototype = Object.create(f.prototype)
  K.prototype.constructor = K
  K.prototype.my = K
  K.ny = {}
  b.btVehicleTuning = K
  K.prototype.get_m_suspensionStiffness = K.prototype.Ay = function () {
    return Jr(this.ly)
  }
  K.prototype.set_m_suspensionStiffness = K.prototype.Hy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Kr(c, a)
  }
  Object.defineProperty(K.prototype, 'm_suspensionStiffness', {
    get: K.prototype.Ay,
    set: K.prototype.Hy
  })
  K.prototype.get_m_suspensionCompression = K.prototype.gB = function () {
    return Lr(this.ly)
  }
  K.prototype.set_m_suspensionCompression = K.prototype.MD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mr(c, a)
  }
  Object.defineProperty(K.prototype, 'm_suspensionCompression', {
    get: K.prototype.gB,
    set: K.prototype.MD
  })
  K.prototype.get_m_suspensionDamping = K.prototype.hB = function () {
    return Nr(this.ly)
  }
  K.prototype.set_m_suspensionDamping = K.prototype.ND = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Or(c, a)
  }
  Object.defineProperty(K.prototype, 'm_suspensionDamping', {
    get: K.prototype.hB,
    set: K.prototype.ND
  })
  K.prototype.get_m_maxSuspensionTravelCm = K.prototype.zy = function () {
    return Pr(this.ly)
  }
  K.prototype.set_m_maxSuspensionTravelCm = K.prototype.Gy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Qr(c, a)
  }
  Object.defineProperty(K.prototype, 'm_maxSuspensionTravelCm', {
    get: K.prototype.zy,
    set: K.prototype.Gy
  })
  K.prototype.get_m_frictionSlip = K.prototype.vy = function () {
    return Rr(this.ly)
  }
  K.prototype.set_m_frictionSlip = K.prototype.Cy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Sr(c, a)
  }
  Object.defineProperty(K.prototype, 'm_frictionSlip', { get: K.prototype.vy, set: K.prototype.Cy })
  K.prototype.get_m_maxSuspensionForce = K.prototype.yy = function () {
    return Tr(this.ly)
  }
  K.prototype.set_m_maxSuspensionForce = K.prototype.Fy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ur(c, a)
  }
  Object.defineProperty(K.prototype, 'm_maxSuspensionForce', {
    get: K.prototype.yy,
    set: K.prototype.Fy
  })
  function L() {
    throw 'cannot construct a btVehicleRaycasterResult, no constructor in IDL'
  }
  L.prototype = Object.create(f.prototype)
  L.prototype.constructor = L
  L.prototype.my = L
  L.ny = {}
  b.btVehicleRaycasterResult = L
  L.prototype.get_m_hitPointInWorld = L.prototype.sA = function () {
    return k(Vr(this.ly), m)
  }
  L.prototype.set_m_hitPointInWorld = L.prototype.YC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Wr(c, a)
  }
  Object.defineProperty(L.prototype, 'm_hitPointInWorld', {
    get: L.prototype.sA,
    set: L.prototype.YC
  })
  L.prototype.get_m_hitNormalInWorld = L.prototype.qA = function () {
    return k(Xr(this.ly), m)
  }
  L.prototype.set_m_hitNormalInWorld = L.prototype.WC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yr(c, a)
  }
  Object.defineProperty(L.prototype, 'm_hitNormalInWorld', {
    get: L.prototype.qA,
    set: L.prototype.WC
  })
  L.prototype.get_m_distFraction = L.prototype.dA = function () {
    return Zr(this.ly)
  }
  L.prototype.set_m_distFraction = L.prototype.JC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    $r(c, a)
  }
  Object.defineProperty(L.prototype, 'm_distFraction', { get: L.prototype.dA, set: L.prototype.JC })
  L.prototype.__destroy__ = function () {
    as(this.ly)
  }
  function jC(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = bs(a)
    h(jC)[this.ly] = this
  }
  jC.prototype = Object.create(mB.prototype)
  jC.prototype.constructor = jC
  jC.prototype.my = jC
  jC.ny = {}
  b.btDefaultVehicleRaycaster = jC
  jC.prototype.castRay = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    cs(e, a, c, d)
  }
  jC.prototype.__destroy__ = function () {
    ds(this.ly)
  }
  function M() {
    throw 'cannot construct a RaycastInfo, no constructor in IDL'
  }
  M.prototype = Object.create(f.prototype)
  M.prototype.constructor = M
  M.prototype.my = M
  M.ny = {}
  b.RaycastInfo = M
  M.prototype.get_m_contactNormalWS = M.prototype.Vz = function () {
    return k(es(this.ly), m)
  }
  M.prototype.set_m_contactNormalWS = M.prototype.AC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    gs(c, a)
  }
  Object.defineProperty(M.prototype, 'm_contactNormalWS', {
    get: M.prototype.Vz,
    set: M.prototype.AC
  })
  M.prototype.get_m_contactPointWS = M.prototype.Wz = function () {
    return k(hs(this.ly), m)
  }
  M.prototype.set_m_contactPointWS = M.prototype.BC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    is(c, a)
  }
  Object.defineProperty(M.prototype, 'm_contactPointWS', {
    get: M.prototype.Wz,
    set: M.prototype.BC
  })
  M.prototype.get_m_suspensionLength = M.prototype.iB = function () {
    return js(this.ly)
  }
  M.prototype.set_m_suspensionLength = M.prototype.OD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ks(c, a)
  }
  Object.defineProperty(M.prototype, 'm_suspensionLength', {
    get: M.prototype.iB,
    set: M.prototype.OD
  })
  M.prototype.get_m_hardPointWS = M.prototype.nA = function () {
    return k(ls(this.ly), m)
  }
  M.prototype.set_m_hardPointWS = M.prototype.TC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ms(c, a)
  }
  Object.defineProperty(M.prototype, 'm_hardPointWS', { get: M.prototype.nA, set: M.prototype.TC })
  M.prototype.get_m_wheelDirectionWS = M.prototype.xB = function () {
    return k(ns(this.ly), m)
  }
  M.prototype.set_m_wheelDirectionWS = M.prototype.cE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ps(c, a)
  }
  Object.defineProperty(M.prototype, 'm_wheelDirectionWS', {
    get: M.prototype.xB,
    set: M.prototype.cE
  })
  M.prototype.get_m_wheelAxleWS = M.prototype.wB = function () {
    return k(qs(this.ly), m)
  }
  M.prototype.set_m_wheelAxleWS = M.prototype.bE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    rs(c, a)
  }
  Object.defineProperty(M.prototype, 'm_wheelAxleWS', { get: M.prototype.wB, set: M.prototype.bE })
  M.prototype.get_m_isInContact = M.prototype.yA = function () {
    return !!ss(this.ly)
  }
  M.prototype.set_m_isInContact = M.prototype.dD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ts(c, a)
  }
  Object.defineProperty(M.prototype, 'm_isInContact', { get: M.prototype.yA, set: M.prototype.dD })
  M.prototype.get_m_groundObject = M.prototype.mA = function () {
    return us(this.ly)
  }
  M.prototype.set_m_groundObject = M.prototype.SC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    vs(c, a)
  }
  Object.defineProperty(M.prototype, 'm_groundObject', { get: M.prototype.mA, set: M.prototype.SC })
  M.prototype.__destroy__ = function () {
    xs(this.ly)
  }
  function N() {
    throw 'cannot construct a btWheelInfoConstructionInfo, no constructor in IDL'
  }
  N.prototype = Object.create(f.prototype)
  N.prototype.constructor = N
  N.prototype.my = N
  N.ny = {}
  b.btWheelInfoConstructionInfo = N
  N.prototype.get_m_chassisConnectionCS = N.prototype.Rz = function () {
    return k(ys(this.ly), m)
  }
  N.prototype.set_m_chassisConnectionCS = N.prototype.wC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    zs(c, a)
  }
  Object.defineProperty(N.prototype, 'm_chassisConnectionCS', {
    get: N.prototype.Rz,
    set: N.prototype.wC
  })
  N.prototype.get_m_wheelDirectionCS = N.prototype.Qy = function () {
    return k(As(this.ly), m)
  }
  N.prototype.set_m_wheelDirectionCS = N.prototype.$y = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Bs(c, a)
  }
  Object.defineProperty(N.prototype, 'm_wheelDirectionCS', {
    get: N.prototype.Qy,
    set: N.prototype.$y
  })
  N.prototype.get_m_wheelAxleCS = N.prototype.Py = function () {
    return k(Cs(this.ly), m)
  }
  N.prototype.set_m_wheelAxleCS = N.prototype.Zy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ds(c, a)
  }
  Object.defineProperty(N.prototype, 'm_wheelAxleCS', { get: N.prototype.Py, set: N.prototype.Zy })
  N.prototype.get_m_suspensionRestLength = N.prototype.kB = function () {
    return Es(this.ly)
  }
  N.prototype.set_m_suspensionRestLength = N.prototype.QD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Fs(c, a)
  }
  Object.defineProperty(N.prototype, 'm_suspensionRestLength', {
    get: N.prototype.kB,
    set: N.prototype.QD
  })
  N.prototype.get_m_maxSuspensionTravelCm = N.prototype.zy = function () {
    return Gs(this.ly)
  }
  N.prototype.set_m_maxSuspensionTravelCm = N.prototype.Gy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Hs(c, a)
  }
  Object.defineProperty(N.prototype, 'm_maxSuspensionTravelCm', {
    get: N.prototype.zy,
    set: N.prototype.Gy
  })
  N.prototype.get_m_wheelRadius = N.prototype.yB = function () {
    return Is(this.ly)
  }
  N.prototype.set_m_wheelRadius = N.prototype.dE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Js(c, a)
  }
  Object.defineProperty(N.prototype, 'm_wheelRadius', { get: N.prototype.yB, set: N.prototype.dE })
  N.prototype.get_m_suspensionStiffness = N.prototype.Ay = function () {
    return Ks(this.ly)
  }
  N.prototype.set_m_suspensionStiffness = N.prototype.Hy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ls(c, a)
  }
  Object.defineProperty(N.prototype, 'm_suspensionStiffness', {
    get: N.prototype.Ay,
    set: N.prototype.Hy
  })
  N.prototype.get_m_wheelsDampingCompression = N.prototype.Ry = function () {
    return Ms(this.ly)
  }
  N.prototype.set_m_wheelsDampingCompression = N.prototype.az = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ns(c, a)
  }
  Object.defineProperty(N.prototype, 'm_wheelsDampingCompression', {
    get: N.prototype.Ry,
    set: N.prototype.az
  })
  N.prototype.get_m_wheelsDampingRelaxation = N.prototype.Sy = function () {
    return Os(this.ly)
  }
  N.prototype.set_m_wheelsDampingRelaxation = N.prototype.bz = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ps(c, a)
  }
  Object.defineProperty(N.prototype, 'm_wheelsDampingRelaxation', {
    get: N.prototype.Sy,
    set: N.prototype.bz
  })
  N.prototype.get_m_frictionSlip = N.prototype.vy = function () {
    return Qs(this.ly)
  }
  N.prototype.set_m_frictionSlip = N.prototype.Cy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Rs(c, a)
  }
  Object.defineProperty(N.prototype, 'm_frictionSlip', { get: N.prototype.vy, set: N.prototype.Cy })
  N.prototype.get_m_maxSuspensionForce = N.prototype.yy = function () {
    return Ss(this.ly)
  }
  N.prototype.set_m_maxSuspensionForce = N.prototype.Fy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ts(c, a)
  }
  Object.defineProperty(N.prototype, 'm_maxSuspensionForce', {
    get: N.prototype.yy,
    set: N.prototype.Fy
  })
  N.prototype.get_m_bIsFrontWheel = N.prototype.Jy = function () {
    return !!Us(this.ly)
  }
  N.prototype.set_m_bIsFrontWheel = N.prototype.Ty = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Vs(c, a)
  }
  Object.defineProperty(N.prototype, 'm_bIsFrontWheel', {
    get: N.prototype.Jy,
    set: N.prototype.Ty
  })
  N.prototype.__destroy__ = function () {
    Ws(this.ly)
  }
  function O(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = Xs(a)
    h(O)[this.ly] = this
  }
  O.prototype = Object.create(f.prototype)
  O.prototype.constructor = O
  O.prototype.my = O
  O.ny = {}
  b.btWheelInfo = O
  O.prototype.getSuspensionRestLength = function () {
    return Ys(this.ly)
  }
  O.prototype.updateWheel = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Zs(d, a, c)
  }
  O.prototype.get_m_suspensionStiffness = O.prototype.Ay = function () {
    return $s(this.ly)
  }
  O.prototype.set_m_suspensionStiffness = O.prototype.Hy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    at(c, a)
  }
  Object.defineProperty(O.prototype, 'm_suspensionStiffness', {
    get: O.prototype.Ay,
    set: O.prototype.Hy
  })
  O.prototype.get_m_frictionSlip = O.prototype.vy = function () {
    return bt(this.ly)
  }
  O.prototype.set_m_frictionSlip = O.prototype.Cy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ct(c, a)
  }
  Object.defineProperty(O.prototype, 'm_frictionSlip', { get: O.prototype.vy, set: O.prototype.Cy })
  O.prototype.get_m_engineForce = O.prototype.gA = function () {
    return dt(this.ly)
  }
  O.prototype.set_m_engineForce = O.prototype.MC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    et(c, a)
  }
  Object.defineProperty(O.prototype, 'm_engineForce', { get: O.prototype.gA, set: O.prototype.MC })
  O.prototype.get_m_rollInfluence = O.prototype.XA = function () {
    return ft(this.ly)
  }
  O.prototype.set_m_rollInfluence = O.prototype.CD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    gt(c, a)
  }
  Object.defineProperty(O.prototype, 'm_rollInfluence', {
    get: O.prototype.XA,
    set: O.prototype.CD
  })
  O.prototype.get_m_suspensionRestLength1 = O.prototype.lB = function () {
    return ht(this.ly)
  }
  O.prototype.set_m_suspensionRestLength1 = O.prototype.RD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    it(c, a)
  }
  Object.defineProperty(O.prototype, 'm_suspensionRestLength1', {
    get: O.prototype.lB,
    set: O.prototype.RD
  })
  O.prototype.get_m_wheelsRadius = O.prototype.zB = function () {
    return jt(this.ly)
  }
  O.prototype.set_m_wheelsRadius = O.prototype.eE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    kt(c, a)
  }
  Object.defineProperty(O.prototype, 'm_wheelsRadius', { get: O.prototype.zB, set: O.prototype.eE })
  O.prototype.get_m_wheelsDampingCompression = O.prototype.Ry = function () {
    return lt(this.ly)
  }
  O.prototype.set_m_wheelsDampingCompression = O.prototype.az = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    mt(c, a)
  }
  Object.defineProperty(O.prototype, 'm_wheelsDampingCompression', {
    get: O.prototype.Ry,
    set: O.prototype.az
  })
  O.prototype.get_m_wheelsDampingRelaxation = O.prototype.Sy = function () {
    return nt(this.ly)
  }
  O.prototype.set_m_wheelsDampingRelaxation = O.prototype.bz = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ot(c, a)
  }
  Object.defineProperty(O.prototype, 'm_wheelsDampingRelaxation', {
    get: O.prototype.Sy,
    set: O.prototype.bz
  })
  O.prototype.get_m_steering = O.prototype.eB = function () {
    return pt(this.ly)
  }
  O.prototype.set_m_steering = O.prototype.KD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    qt(c, a)
  }
  Object.defineProperty(O.prototype, 'm_steering', { get: O.prototype.eB, set: O.prototype.KD })
  O.prototype.get_m_maxSuspensionForce = O.prototype.yy = function () {
    return rt(this.ly)
  }
  O.prototype.set_m_maxSuspensionForce = O.prototype.Fy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    st(c, a)
  }
  Object.defineProperty(O.prototype, 'm_maxSuspensionForce', {
    get: O.prototype.yy,
    set: O.prototype.Fy
  })
  O.prototype.get_m_maxSuspensionTravelCm = O.prototype.zy = function () {
    return tt(this.ly)
  }
  O.prototype.set_m_maxSuspensionTravelCm = O.prototype.Gy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ut(c, a)
  }
  Object.defineProperty(O.prototype, 'm_maxSuspensionTravelCm', {
    get: O.prototype.zy,
    set: O.prototype.Gy
  })
  O.prototype.get_m_wheelsSuspensionForce = O.prototype.AB = function () {
    return vt(this.ly)
  }
  O.prototype.set_m_wheelsSuspensionForce = O.prototype.fE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    wt(c, a)
  }
  Object.defineProperty(O.prototype, 'm_wheelsSuspensionForce', {
    get: O.prototype.AB,
    set: O.prototype.fE
  })
  O.prototype.get_m_bIsFrontWheel = O.prototype.Jy = function () {
    return !!xt(this.ly)
  }
  O.prototype.set_m_bIsFrontWheel = O.prototype.Ty = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    yt(c, a)
  }
  Object.defineProperty(O.prototype, 'm_bIsFrontWheel', {
    get: O.prototype.Jy,
    set: O.prototype.Ty
  })
  O.prototype.get_m_raycastInfo = O.prototype.VA = function () {
    return k(zt(this.ly), M)
  }
  O.prototype.set_m_raycastInfo = O.prototype.AD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    At(c, a)
  }
  Object.defineProperty(O.prototype, 'm_raycastInfo', { get: O.prototype.VA, set: O.prototype.AD })
  O.prototype.get_m_chassisConnectionPointCS = O.prototype.Sz = function () {
    return k(Bt(this.ly), m)
  }
  O.prototype.set_m_chassisConnectionPointCS = O.prototype.xC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ct(c, a)
  }
  Object.defineProperty(O.prototype, 'm_chassisConnectionPointCS', {
    get: O.prototype.Sz,
    set: O.prototype.xC
  })
  O.prototype.get_m_worldTransform = O.prototype.BB = function () {
    return k(Dt(this.ly), r)
  }
  O.prototype.set_m_worldTransform = O.prototype.gE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Et(c, a)
  }
  Object.defineProperty(O.prototype, 'm_worldTransform', {
    get: O.prototype.BB,
    set: O.prototype.gE
  })
  O.prototype.get_m_wheelDirectionCS = O.prototype.Qy = function () {
    return k(Ft(this.ly), m)
  }
  O.prototype.set_m_wheelDirectionCS = O.prototype.$y = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Gt(c, a)
  }
  Object.defineProperty(O.prototype, 'm_wheelDirectionCS', {
    get: O.prototype.Qy,
    set: O.prototype.$y
  })
  O.prototype.get_m_wheelAxleCS = O.prototype.Py = function () {
    return k(Ht(this.ly), m)
  }
  O.prototype.set_m_wheelAxleCS = O.prototype.Zy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    It(c, a)
  }
  Object.defineProperty(O.prototype, 'm_wheelAxleCS', { get: O.prototype.Py, set: O.prototype.Zy })
  O.prototype.get_m_rotation = O.prototype.ZA = function () {
    return Jt(this.ly)
  }
  O.prototype.set_m_rotation = O.prototype.ED = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Kt(c, a)
  }
  Object.defineProperty(O.prototype, 'm_rotation', { get: O.prototype.ZA, set: O.prototype.ED })
  O.prototype.get_m_deltaRotation = O.prototype.aA = function () {
    return Lt(this.ly)
  }
  O.prototype.set_m_deltaRotation = O.prototype.GC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mt(c, a)
  }
  Object.defineProperty(O.prototype, 'm_deltaRotation', {
    get: O.prototype.aA,
    set: O.prototype.GC
  })
  O.prototype.get_m_brake = O.prototype.Lz = function () {
    return Nt(this.ly)
  }
  O.prototype.set_m_brake = O.prototype.qC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ot(c, a)
  }
  Object.defineProperty(O.prototype, 'm_brake', { get: O.prototype.Lz, set: O.prototype.qC })
  O.prototype.get_m_clippedInvContactDotSuspension = O.prototype.Tz = function () {
    return Pt(this.ly)
  }
  O.prototype.set_m_clippedInvContactDotSuspension = O.prototype.yC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Qt(c, a)
  }
  Object.defineProperty(O.prototype, 'm_clippedInvContactDotSuspension', {
    get: O.prototype.Tz,
    set: O.prototype.yC
  })
  O.prototype.get_m_suspensionRelativeVelocity = O.prototype.jB = function () {
    return Rt(this.ly)
  }
  O.prototype.set_m_suspensionRelativeVelocity = O.prototype.PD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    St(c, a)
  }
  Object.defineProperty(O.prototype, 'm_suspensionRelativeVelocity', {
    get: O.prototype.jB,
    set: O.prototype.PD
  })
  O.prototype.get_m_skidInfo = O.prototype.bB = function () {
    return Tt(this.ly)
  }
  O.prototype.set_m_skidInfo = O.prototype.HD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ut(c, a)
  }
  Object.defineProperty(O.prototype, 'm_skidInfo', { get: O.prototype.bB, set: O.prototype.HD })
  O.prototype.__destroy__ = function () {
    Vt(this.ly)
  }
  function P(a, c, d, e) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    this.ly = void 0 === e ? Wt(a, c, d) : Xt(a, c, d, e)
    h(P)[this.ly] = this
  }
  P.prototype = Object.create(nB.prototype)
  P.prototype.constructor = P
  P.prototype.my = P
  P.ny = {}
  b.btKinematicCharacterController = P
  P.prototype.setUpAxis = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yt(c, a)
  }
  P.prototype.setWalkDirection = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Zt(c, a)
  }
  P.prototype.setVelocityForTimeInterval = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    $t(d, a, c)
  }
  P.prototype.warp = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    au(c, a)
  }
  P.prototype.preStep = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    bu(c, a)
  }
  P.prototype.playerStep = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    cu(d, a, c)
  }
  P.prototype.setFallSpeed = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    du(c, a)
  }
  P.prototype.setJumpSpeed = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    eu(c, a)
  }
  P.prototype.setMaxJumpHeight = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    fu(c, a)
  }
  P.prototype.canJump = function () {
    return !!gu(this.ly)
  }
  P.prototype.jump = function () {
    hu(this.ly)
  }
  P.prototype.setGravity = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    iu(c, a)
  }
  P.prototype.getGravity = function () {
    return ju(this.ly)
  }
  P.prototype.setMaxSlope = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ku(c, a)
  }
  P.prototype.getMaxSlope = function () {
    return lu(this.ly)
  }
  P.prototype.getGhostObject = function () {
    return k(mu(this.ly), Q)
  }
  P.prototype.setUseGhostSweepTest = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    nu(c, a)
  }
  P.prototype.onGround = function () {
    return !!ou(this.ly)
  }
  P.prototype.setUpInterpolate = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    pu(c, a)
  }
  P.prototype.updateAction = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    qu(d, a, c)
  }
  P.prototype.__destroy__ = function () {
    ru(this.ly)
  }
  function S(a, c, d) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    this.ly = su(a, c, d)
    h(S)[this.ly] = this
  }
  S.prototype = Object.create(nB.prototype)
  S.prototype.constructor = S
  S.prototype.my = S
  S.ny = {}
  b.btRaycastVehicle = S
  S.prototype.applyEngineForce = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    tu(d, a, c)
  }
  S.prototype.setSteeringValue = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    uu(d, a, c)
  }
  S.prototype.getWheelTransformWS = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(vu(c, a), r)
  }
  S.prototype.updateWheelTransform = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    wu(d, a, c)
  }
  S.prototype.addWheel = function (a, c, d, e, g, n, D) {
    const R = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    n && 'object' === typeof n && (n = n.ly)
    D && 'object' === typeof D && (D = D.ly)
    return k(xu(R, a, c, d, e, g, n, D), O)
  }
  S.prototype.getNumWheels = function () {
    return yu(this.ly)
  }
  S.prototype.getRigidBody = function () {
    return k(zu(this.ly), I)
  }
  S.prototype.getWheelInfo = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Au(c, a), O)
  }
  S.prototype.setBrake = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Bu(d, a, c)
  }
  S.prototype.setCoordinateSystem = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Cu(e, a, c, d)
  }
  S.prototype.getCurrentSpeedKmHour = function () {
    return Du(this.ly)
  }
  S.prototype.getChassisWorldTransform = function () {
    return k(Eu(this.ly), r)
  }
  S.prototype.rayCast = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return Fu(c, a)
  }
  S.prototype.updateVehicle = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Gu(c, a)
  }
  S.prototype.resetSuspension = function () {
    Hu(this.ly)
  }
  S.prototype.getSteeringValue = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return Iu(c, a)
  }
  S.prototype.updateWheelTransformsWS = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    void 0 === c ? Ju(d, a) : Ku(d, a, c)
  }
  S.prototype.setPitchControl = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Lu(c, a)
  }
  S.prototype.updateSuspension = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mu(c, a)
  }
  S.prototype.updateFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Nu(c, a)
  }
  S.prototype.getRightAxis = function () {
    return Ou(this.ly)
  }
  S.prototype.getUpAxis = function () {
    return Pu(this.ly)
  }
  S.prototype.getForwardAxis = function () {
    return Qu(this.ly)
  }
  S.prototype.getForwardVector = function () {
    return k(Ru(this.ly), m)
  }
  S.prototype.getUserConstraintType = function () {
    return Su(this.ly)
  }
  S.prototype.setUserConstraintType = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Tu(c, a)
  }
  S.prototype.setUserConstraintId = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Uu(c, a)
  }
  S.prototype.getUserConstraintId = function () {
    return Vu(this.ly)
  }
  S.prototype.updateAction = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Wu(d, a, c)
  }
  S.prototype.__destroy__ = function () {
    Xu(this.ly)
  }
  function Q() {
    this.ly = Yu()
    h(Q)[this.ly] = this
  }
  Q.prototype = Object.create(y.prototype)
  Q.prototype.constructor = Q
  Q.prototype.my = Q
  Q.ny = {}
  b.btPairCachingGhostObject = Q
  Q.prototype.setAnisotropicFriction = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Zu(d, a, c)
  }
  Q.prototype.getCollisionShape = function () {
    return k($u(this.ly), l)
  }
  Q.prototype.setContactProcessingThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    av(c, a)
  }
  Q.prototype.setActivationState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    bv(c, a)
  }
  Q.prototype.forceActivationState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    cv(c, a)
  }
  Q.prototype.activate = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    void 0 === a ? dv(c) : ev(c, a)
  }
  Q.prototype.isActive = function () {
    return !!fv(this.ly)
  }
  Q.prototype.isKinematicObject = function () {
    return !!gv(this.ly)
  }
  Q.prototype.isStaticObject = function () {
    return !!hv(this.ly)
  }
  Q.prototype.isStaticOrKinematicObject = function () {
    return !!iv(this.ly)
  }
  Q.prototype.getRestitution = function () {
    return jv(this.ly)
  }
  Q.prototype.getFriction = function () {
    return kv(this.ly)
  }
  Q.prototype.getRollingFriction = function () {
    return lv(this.ly)
  }
  Q.prototype.setRestitution = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    mv(c, a)
  }
  Q.prototype.setFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    nv(c, a)
  }
  Q.prototype.setRollingFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ov(c, a)
  }
  Q.prototype.getWorldTransform = function () {
    return k(pv(this.ly), r)
  }
  Q.prototype.getCollisionFlags = function () {
    return qv(this.ly)
  }
  Q.prototype.setCollisionFlags = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    rv(c, a)
  }
  Q.prototype.setWorldTransform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    sv(c, a)
  }
  Q.prototype.setCollisionShape = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    tv(c, a)
  }
  Q.prototype.setCcdMotionThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    uv(c, a)
  }
  Q.prototype.setCcdSweptSphereRadius = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    vv(c, a)
  }
  Q.prototype.getUserIndex = function () {
    return wv(this.ly)
  }
  Q.prototype.setUserIndex = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    xv(c, a)
  }
  Q.prototype.getUserPointer = function () {
    return k(yv(this.ly), XA)
  }
  Q.prototype.setUserPointer = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    zv(c, a)
  }
  Q.prototype.getBroadphaseHandle = function () {
    return k(Av(this.ly), t)
  }
  Q.prototype.getNumOverlappingObjects = function () {
    return Bv(this.ly)
  }
  Q.prototype.getOverlappingObject = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Cv(c, a), q)
  }
  Q.prototype.__destroy__ = function () {
    Dv(this.ly)
  }
  function kC() {
    this.ly = Ev()
    h(kC)[this.ly] = this
  }
  kC.prototype = Object.create(f.prototype)
  kC.prototype.constructor = kC
  kC.prototype.my = kC
  kC.ny = {}
  b.btGhostPairCallback = kC
  kC.prototype.__destroy__ = function () {
    Fv(this.ly)
  }
  function T() {
    this.ly = Gv()
    h(T)[this.ly] = this
  }
  T.prototype = Object.create(f.prototype)
  T.prototype.constructor = T
  T.prototype.my = T
  T.ny = {}
  b.btSoftBodyWorldInfo = T
  T.prototype.get_air_density = T.prototype.dz = function () {
    return Hv(this.ly)
  }
  T.prototype.set_air_density = T.prototype.KB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Iv(c, a)
  }
  Object.defineProperty(T.prototype, 'air_density', { get: T.prototype.dz, set: T.prototype.KB })
  T.prototype.get_water_density = T.prototype.HB = function () {
    return Jv(this.ly)
  }
  T.prototype.set_water_density = T.prototype.mE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Kv(c, a)
  }
  Object.defineProperty(T.prototype, 'water_density', { get: T.prototype.HB, set: T.prototype.mE })
  T.prototype.get_water_offset = T.prototype.JB = function () {
    return Lv(this.ly)
  }
  T.prototype.set_water_offset = T.prototype.oE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mv(c, a)
  }
  Object.defineProperty(T.prototype, 'water_offset', { get: T.prototype.JB, set: T.prototype.oE })
  T.prototype.get_m_maxDisplacement = T.prototype.JA = function () {
    return Nv(this.ly)
  }
  T.prototype.set_m_maxDisplacement = T.prototype.oD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ov(c, a)
  }
  Object.defineProperty(T.prototype, 'm_maxDisplacement', {
    get: T.prototype.JA,
    set: T.prototype.oD
  })
  T.prototype.get_water_normal = T.prototype.IB = function () {
    return k(Pv(this.ly), m)
  }
  T.prototype.set_water_normal = T.prototype.nE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Qv(c, a)
  }
  Object.defineProperty(T.prototype, 'water_normal', { get: T.prototype.IB, set: T.prototype.nE })
  T.prototype.get_m_broadphase = T.prototype.Mz = function () {
    return k(Rv(this.ly), VA)
  }
  T.prototype.set_m_broadphase = T.prototype.rC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Sv(c, a)
  }
  Object.defineProperty(T.prototype, 'm_broadphase', { get: T.prototype.Mz, set: T.prototype.rC })
  T.prototype.get_m_dispatcher = T.prototype.cA = function () {
    return k(Tv(this.ly), TA)
  }
  T.prototype.set_m_dispatcher = T.prototype.IC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Uv(c, a)
  }
  Object.defineProperty(T.prototype, 'm_dispatcher', { get: T.prototype.cA, set: T.prototype.IC })
  T.prototype.get_m_gravity = T.prototype.lA = function () {
    return k(Vv(this.ly), m)
  }
  T.prototype.set_m_gravity = T.prototype.RC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Wv(c, a)
  }
  Object.defineProperty(T.prototype, 'm_gravity', { get: T.prototype.lA, set: T.prototype.RC })
  T.prototype.__destroy__ = function () {
    Xv(this.ly)
  }
  function U() {
    throw 'cannot construct a Face, no constructor in IDL'
  }
  U.prototype = Object.create(f.prototype)
  U.prototype.constructor = U
  U.prototype.my = U
  U.ny = {}
  b.Face = U
  U.prototype.get_m_n = U.prototype.My = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Yv(c, a), Node)
  }
  U.prototype.set_m_n = U.prototype.Wy = function (a, c) {
    const d = this.ly
    NA()
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Zv(d, a, c)
  }
  Object.defineProperty(U.prototype, 'm_n', { get: U.prototype.My, set: U.prototype.Wy })
  U.prototype.get_m_normal = U.prototype.MA = function () {
    return k($v(this.ly), m)
  }
  U.prototype.set_m_normal = U.prototype.rD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    aw(c, a)
  }
  Object.defineProperty(U.prototype, 'm_normal', { get: U.prototype.MA, set: U.prototype.rD })
  U.prototype.get_m_ra = U.prototype.UA = function () {
    return bw(this.ly)
  }
  U.prototype.set_m_ra = U.prototype.zD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    cw(c, a)
  }
  Object.defineProperty(U.prototype, 'm_ra', { get: U.prototype.UA, set: U.prototype.zD })
  U.prototype.__destroy__ = function () {
    dw(this.ly)
  }
  function lC() {
    throw 'cannot construct a tFaceArray, no constructor in IDL'
  }
  lC.prototype = Object.create(f.prototype)
  lC.prototype.constructor = lC
  lC.prototype.my = lC
  lC.ny = {}
  b.tFaceArray = lC
  lC.prototype.size = lC.prototype.size = function () {
    return ew(this.ly)
  }
  lC.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(fw(c, a), U)
  }
  lC.prototype.__destroy__ = function () {
    gw(this.ly)
  }
  function Node() {
    throw 'cannot construct a Node, no constructor in IDL'
  }
  Node.prototype = Object.create(f.prototype)
  Node.prototype.constructor = Node
  Node.prototype.my = Node
  Node.ny = {}
  b.Node = Node
  Node.prototype.get_m_x = Node.prototype.CB = function () {
    return k(hw(this.ly), m)
  }
  Node.prototype.set_m_x = Node.prototype.hE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    iw(c, a)
  }
  Object.defineProperty(Node.prototype, 'm_x', { get: Node.prototype.CB, set: Node.prototype.hE })
  Node.prototype.get_m_q = Node.prototype.TA = function () {
    return k(jw(this.ly), m)
  }
  Node.prototype.set_m_q = Node.prototype.yD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    kw(c, a)
  }
  Object.defineProperty(Node.prototype, 'm_q', { get: Node.prototype.TA, set: Node.prototype.yD })
  Node.prototype.get_m_v = Node.prototype.uB = function () {
    return k(lw(this.ly), m)
  }
  Node.prototype.set_m_v = Node.prototype.$D = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    mw(c, a)
  }
  Object.defineProperty(Node.prototype, 'm_v', { get: Node.prototype.uB, set: Node.prototype.$D })
  Node.prototype.get_m_f = Node.prototype.hA = function () {
    return k(nw(this.ly), m)
  }
  Node.prototype.set_m_f = Node.prototype.NC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ow(c, a)
  }
  Object.defineProperty(Node.prototype, 'm_f', { get: Node.prototype.hA, set: Node.prototype.NC })
  Node.prototype.get_m_n = Node.prototype.My = function () {
    return k(pw(this.ly), m)
  }
  Node.prototype.set_m_n = Node.prototype.Wy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    qw(c, a)
  }
  Object.defineProperty(Node.prototype, 'm_n', { get: Node.prototype.My, set: Node.prototype.Wy })
  Node.prototype.get_m_im = Node.prototype.uA = function () {
    return rw(this.ly)
  }
  Node.prototype.set_m_im = Node.prototype.$C = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    sw(c, a)
  }
  Object.defineProperty(Node.prototype, 'm_im', { get: Node.prototype.uA, set: Node.prototype.$C })
  Node.prototype.get_m_area = Node.prototype.Jz = function () {
    return tw(this.ly)
  }
  Node.prototype.set_m_area = Node.prototype.oC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    uw(c, a)
  }
  Object.defineProperty(Node.prototype, 'm_area', {
    get: Node.prototype.Jz,
    set: Node.prototype.oC
  })
  Node.prototype.__destroy__ = function () {
    vw(this.ly)
  }
  function mC() {
    throw 'cannot construct a tNodeArray, no constructor in IDL'
  }
  mC.prototype = Object.create(f.prototype)
  mC.prototype.constructor = mC
  mC.prototype.my = mC
  mC.ny = {}
  b.tNodeArray = mC
  mC.prototype.size = mC.prototype.size = function () {
    return ww(this.ly)
  }
  mC.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(xw(c, a), Node)
  }
  mC.prototype.__destroy__ = function () {
    yw(this.ly)
  }
  function V() {
    throw 'cannot construct a Material, no constructor in IDL'
  }
  V.prototype = Object.create(f.prototype)
  V.prototype.constructor = V
  V.prototype.my = V
  V.ny = {}
  b.Material = V
  V.prototype.get_m_kLST = V.prototype.AA = function () {
    return zw(this.ly)
  }
  V.prototype.set_m_kLST = V.prototype.fD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Aw(c, a)
  }
  Object.defineProperty(V.prototype, 'm_kLST', { get: V.prototype.AA, set: V.prototype.fD })
  V.prototype.get_m_kAST = V.prototype.zA = function () {
    return Bw(this.ly)
  }
  V.prototype.set_m_kAST = V.prototype.eD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Cw(c, a)
  }
  Object.defineProperty(V.prototype, 'm_kAST', { get: V.prototype.zA, set: V.prototype.eD })
  V.prototype.get_m_kVST = V.prototype.BA = function () {
    return Dw(this.ly)
  }
  V.prototype.set_m_kVST = V.prototype.gD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ew(c, a)
  }
  Object.defineProperty(V.prototype, 'm_kVST', { get: V.prototype.BA, set: V.prototype.gD })
  V.prototype.get_m_flags = V.prototype.iA = function () {
    return Fw(this.ly)
  }
  V.prototype.set_m_flags = V.prototype.OC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Gw(c, a)
  }
  Object.defineProperty(V.prototype, 'm_flags', { get: V.prototype.iA, set: V.prototype.OC })
  V.prototype.__destroy__ = function () {
    Hw(this.ly)
  }
  function nC() {
    throw 'cannot construct a tMaterialArray, no constructor in IDL'
  }
  nC.prototype = Object.create(f.prototype)
  nC.prototype.constructor = nC
  nC.prototype.my = nC
  nC.ny = {}
  b.tMaterialArray = nC
  nC.prototype.size = nC.prototype.size = function () {
    return Iw(this.ly)
  }
  nC.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(Jw(c, a), V)
  }
  nC.prototype.__destroy__ = function () {
    Kw(this.ly)
  }
  function W() {
    throw 'cannot construct a Anchor, no constructor in IDL'
  }
  W.prototype = Object.create(f.prototype)
  W.prototype.constructor = W
  W.prototype.my = W
  W.ny = {}
  b.Anchor = W
  W.prototype.get_m_node = W.prototype.KA = function () {
    return k(Lw(this.ly), Node)
  }
  W.prototype.set_m_node = W.prototype.pD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mw(c, a)
  }
  Object.defineProperty(W.prototype, 'm_node', { get: W.prototype.KA, set: W.prototype.pD })
  W.prototype.get_m_local = W.prototype.EA = function () {
    return k(Nw(this.ly), m)
  }
  W.prototype.set_m_local = W.prototype.jD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ow(c, a)
  }
  Object.defineProperty(W.prototype, 'm_local', { get: W.prototype.EA, set: W.prototype.jD })
  W.prototype.get_m_body = W.prototype.Kz = function () {
    return k(Pw(this.ly), I)
  }
  W.prototype.set_m_body = W.prototype.pC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Qw(c, a)
  }
  Object.defineProperty(W.prototype, 'm_body', { get: W.prototype.Kz, set: W.prototype.pC })
  W.prototype.get_m_influence = W.prototype.xA = function () {
    return Rw(this.ly)
  }
  W.prototype.set_m_influence = W.prototype.cD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Sw(c, a)
  }
  Object.defineProperty(W.prototype, 'm_influence', { get: W.prototype.xA, set: W.prototype.cD })
  W.prototype.get_m_c0 = W.prototype.Nz = function () {
    return k(Tw(this.ly), qB)
  }
  W.prototype.set_m_c0 = W.prototype.sC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Uw(c, a)
  }
  Object.defineProperty(W.prototype, 'm_c0', { get: W.prototype.Nz, set: W.prototype.sC })
  W.prototype.get_m_c1 = W.prototype.Oz = function () {
    return k(Vw(this.ly), m)
  }
  W.prototype.set_m_c1 = W.prototype.tC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ww(c, a)
  }
  Object.defineProperty(W.prototype, 'm_c1', { get: W.prototype.Oz, set: W.prototype.tC })
  W.prototype.get_m_c2 = W.prototype.Pz = function () {
    return Xw(this.ly)
  }
  W.prototype.set_m_c2 = W.prototype.uC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yw(c, a)
  }
  Object.defineProperty(W.prototype, 'm_c2', { get: W.prototype.Pz, set: W.prototype.uC })
  W.prototype.__destroy__ = function () {
    Zw(this.ly)
  }
  function oC() {
    throw 'cannot construct a tAnchorArray, no constructor in IDL'
  }
  oC.prototype = Object.create(f.prototype)
  oC.prototype.constructor = oC
  oC.prototype.my = oC
  oC.ny = {}
  b.tAnchorArray = oC
  oC.prototype.size = oC.prototype.size = function () {
    return $w(this.ly)
  }
  oC.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(ax(c, a), W)
  }
  oC.prototype.clear = oC.prototype.clear = function () {
    bx(this.ly)
  }
  oC.prototype.push_back = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    cx(c, a)
  }
  oC.prototype.pop_back = function () {
    dx(this.ly)
  }
  oC.prototype.__destroy__ = function () {
    ex(this.ly)
  }
  function X() {
    throw 'cannot construct a Config, no constructor in IDL'
  }
  X.prototype = Object.create(f.prototype)
  X.prototype.constructor = X
  X.prototype.my = X
  X.ny = {}
  b.Config = X
  X.prototype.get_kVCF = X.prototype.zz = function () {
    return fx(this.ly)
  }
  X.prototype.set_kVCF = X.prototype.eC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    gx(c, a)
  }
  Object.defineProperty(X.prototype, 'kVCF', { get: X.prototype.zz, set: X.prototype.eC })
  X.prototype.get_kDP = X.prototype.lz = function () {
    return hx(this.ly)
  }
  X.prototype.set_kDP = X.prototype.SB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ix(c, a)
  }
  Object.defineProperty(X.prototype, 'kDP', { get: X.prototype.lz, set: X.prototype.SB })
  X.prototype.get_kDG = X.prototype.kz = function () {
    return jx(this.ly)
  }
  X.prototype.set_kDG = X.prototype.RB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    kx(c, a)
  }
  Object.defineProperty(X.prototype, 'kDG', { get: X.prototype.kz, set: X.prototype.RB })
  X.prototype.get_kLF = X.prototype.nz = function () {
    return lx(this.ly)
  }
  X.prototype.set_kLF = X.prototype.UB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    mx(c, a)
  }
  Object.defineProperty(X.prototype, 'kLF', { get: X.prototype.nz, set: X.prototype.UB })
  X.prototype.get_kPR = X.prototype.pz = function () {
    return nx(this.ly)
  }
  X.prototype.set_kPR = X.prototype.WB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ox(c, a)
  }
  Object.defineProperty(X.prototype, 'kPR', { get: X.prototype.pz, set: X.prototype.WB })
  X.prototype.get_kVC = X.prototype.yz = function () {
    return px(this.ly)
  }
  X.prototype.set_kVC = X.prototype.dC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    qx(c, a)
  }
  Object.defineProperty(X.prototype, 'kVC', { get: X.prototype.yz, set: X.prototype.dC })
  X.prototype.get_kDF = X.prototype.jz = function () {
    return rx(this.ly)
  }
  X.prototype.set_kDF = X.prototype.QB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    sx(c, a)
  }
  Object.defineProperty(X.prototype, 'kDF', { get: X.prototype.jz, set: X.prototype.QB })
  X.prototype.get_kMT = X.prototype.oz = function () {
    return tx(this.ly)
  }
  X.prototype.set_kMT = X.prototype.VB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ux(c, a)
  }
  Object.defineProperty(X.prototype, 'kMT', { get: X.prototype.oz, set: X.prototype.VB })
  X.prototype.get_kCHR = X.prototype.iz = function () {
    return vx(this.ly)
  }
  X.prototype.set_kCHR = X.prototype.PB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    wx(c, a)
  }
  Object.defineProperty(X.prototype, 'kCHR', { get: X.prototype.iz, set: X.prototype.PB })
  X.prototype.get_kKHR = X.prototype.mz = function () {
    return xx(this.ly)
  }
  X.prototype.set_kKHR = X.prototype.TB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    yx(c, a)
  }
  Object.defineProperty(X.prototype, 'kKHR', { get: X.prototype.mz, set: X.prototype.TB })
  X.prototype.get_kSHR = X.prototype.qz = function () {
    return zx(this.ly)
  }
  X.prototype.set_kSHR = X.prototype.XB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ax(c, a)
  }
  Object.defineProperty(X.prototype, 'kSHR', { get: X.prototype.qz, set: X.prototype.XB })
  X.prototype.get_kAHR = X.prototype.hz = function () {
    return Bx(this.ly)
  }
  X.prototype.set_kAHR = X.prototype.OB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Cx(c, a)
  }
  Object.defineProperty(X.prototype, 'kAHR', { get: X.prototype.hz, set: X.prototype.OB })
  X.prototype.get_kSRHR_CL = X.prototype.uz = function () {
    return Dx(this.ly)
  }
  X.prototype.set_kSRHR_CL = X.prototype.$B = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ex(c, a)
  }
  Object.defineProperty(X.prototype, 'kSRHR_CL', { get: X.prototype.uz, set: X.prototype.$B })
  X.prototype.get_kSKHR_CL = X.prototype.rz = function () {
    return Fx(this.ly)
  }
  X.prototype.set_kSKHR_CL = X.prototype.YB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Gx(c, a)
  }
  Object.defineProperty(X.prototype, 'kSKHR_CL', { get: X.prototype.rz, set: X.prototype.YB })
  X.prototype.get_kSSHR_CL = X.prototype.wz = function () {
    return Hx(this.ly)
  }
  X.prototype.set_kSSHR_CL = X.prototype.bC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ix(c, a)
  }
  Object.defineProperty(X.prototype, 'kSSHR_CL', { get: X.prototype.wz, set: X.prototype.bC })
  X.prototype.get_kSR_SPLT_CL = X.prototype.vz = function () {
    return Jx(this.ly)
  }
  X.prototype.set_kSR_SPLT_CL = X.prototype.aC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Kx(c, a)
  }
  Object.defineProperty(X.prototype, 'kSR_SPLT_CL', { get: X.prototype.vz, set: X.prototype.aC })
  X.prototype.get_kSK_SPLT_CL = X.prototype.sz = function () {
    return Lx(this.ly)
  }
  X.prototype.set_kSK_SPLT_CL = X.prototype.ZB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Mx(c, a)
  }
  Object.defineProperty(X.prototype, 'kSK_SPLT_CL', { get: X.prototype.sz, set: X.prototype.ZB })
  X.prototype.get_kSS_SPLT_CL = X.prototype.xz = function () {
    return Nx(this.ly)
  }
  X.prototype.set_kSS_SPLT_CL = X.prototype.cC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ox(c, a)
  }
  Object.defineProperty(X.prototype, 'kSS_SPLT_CL', { get: X.prototype.xz, set: X.prototype.cC })
  X.prototype.get_maxvolume = X.prototype.DB = function () {
    return Px(this.ly)
  }
  X.prototype.set_maxvolume = X.prototype.iE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Qx(c, a)
  }
  Object.defineProperty(X.prototype, 'maxvolume', { get: X.prototype.DB, set: X.prototype.iE })
  X.prototype.get_timescale = X.prototype.FB = function () {
    return Rx(this.ly)
  }
  X.prototype.set_timescale = X.prototype.kE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Sx(c, a)
  }
  Object.defineProperty(X.prototype, 'timescale', { get: X.prototype.FB, set: X.prototype.kE })
  X.prototype.get_viterations = X.prototype.GB = function () {
    return Tx(this.ly)
  }
  X.prototype.set_viterations = X.prototype.lE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ux(c, a)
  }
  Object.defineProperty(X.prototype, 'viterations', { get: X.prototype.GB, set: X.prototype.lE })
  X.prototype.get_piterations = X.prototype.EB = function () {
    return Vx(this.ly)
  }
  X.prototype.set_piterations = X.prototype.jE = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Wx(c, a)
  }
  Object.defineProperty(X.prototype, 'piterations', { get: X.prototype.EB, set: X.prototype.jE })
  X.prototype.get_diterations = X.prototype.gz = function () {
    return Xx(this.ly)
  }
  X.prototype.set_diterations = X.prototype.NB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yx(c, a)
  }
  Object.defineProperty(X.prototype, 'diterations', { get: X.prototype.gz, set: X.prototype.NB })
  X.prototype.get_citerations = X.prototype.ez = function () {
    return Zx(this.ly)
  }
  X.prototype.set_citerations = X.prototype.LB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    $x(c, a)
  }
  Object.defineProperty(X.prototype, 'citerations', { get: X.prototype.ez, set: X.prototype.LB })
  X.prototype.get_collisions = X.prototype.fz = function () {
    return ay(this.ly)
  }
  X.prototype.set_collisions = X.prototype.MB = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    by(c, a)
  }
  Object.defineProperty(X.prototype, 'collisions', { get: X.prototype.fz, set: X.prototype.MB })
  X.prototype.__destroy__ = function () {
    cy(this.ly)
  }
  function Y(a, c, d, e) {
    NA()
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    'object' == typeof e && (e = RA(e))
    this.ly = dy(a, c, d, e)
    h(Y)[this.ly] = this
  }
  Y.prototype = Object.create(q.prototype)
  Y.prototype.constructor = Y
  Y.prototype.my = Y
  Y.ny = {}
  b.btSoftBody = Y
  Y.prototype.checkLink = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return !!ey(d, a, c)
  }
  Y.prototype.checkFace = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    return !!fy(e, a, c, d)
  }
  Y.prototype.appendMaterial = function () {
    return k(gy(this.ly), V)
  }
  Y.prototype.appendNode = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    hy(d, a, c)
  }
  Y.prototype.appendLink = function (a, c, d, e) {
    const g = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    iy(g, a, c, d, e)
  }
  Y.prototype.appendFace = function (a, c, d, e) {
    const g = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    jy(g, a, c, d, e)
  }
  Y.prototype.appendTetra = function (a, c, d, e, g) {
    const n = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    ky(n, a, c, d, e, g)
  }
  Y.prototype.appendAnchor = function (a, c, d, e) {
    const g = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    ly(g, a, c, d, e)
  }
  Y.prototype.addForce = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    void 0 === c ? my(d, a) : ny(d, a, c)
  }
  Y.prototype.addAeroForceToNode = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    oy(d, a, c)
  }
  Y.prototype.getTotalMass = function () {
    return py(this.ly)
  }
  Y.prototype.setTotalMass = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    qy(d, a, c)
  }
  Y.prototype.setMass = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    ry(d, a, c)
  }
  Y.prototype.transform = Y.prototype.transform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    sy(c, a)
  }
  Y.prototype.translate = Y.prototype.translate = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    ty(c, a)
  }
  Y.prototype.rotate = Y.prototype.rotate = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    uy(c, a)
  }
  Y.prototype.scale = Y.prototype.scale = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    vy(c, a)
  }
  Y.prototype.generateClusters = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return void 0 === c ? wy(d, a) : xy(d, a, c)
  }
  Y.prototype.generateBendingConstraints = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    return yy(d, a, c)
  }
  Y.prototype.upcast = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(zy(c, a), Y)
  }
  Y.prototype.getRestLengthScale = function () {
    return Ay(this.ly)
  }
  Y.prototype.setRestLengthScale = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    By(c, a)
  }
  Y.prototype.setAnisotropicFriction = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Cy(d, a, c)
  }
  Y.prototype.getCollisionShape = function () {
    return k(Dy(this.ly), l)
  }
  Y.prototype.setContactProcessingThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ey(c, a)
  }
  Y.prototype.setActivationState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Fy(c, a)
  }
  Y.prototype.forceActivationState = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Gy(c, a)
  }
  Y.prototype.activate = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    void 0 === a ? Hy(c) : Iy(c, a)
  }
  Y.prototype.isActive = function () {
    return !!Jy(this.ly)
  }
  Y.prototype.isKinematicObject = function () {
    return !!Ky(this.ly)
  }
  Y.prototype.isStaticObject = function () {
    return !!Ly(this.ly)
  }
  Y.prototype.isStaticOrKinematicObject = function () {
    return !!My(this.ly)
  }
  Y.prototype.getRestitution = function () {
    return Ny(this.ly)
  }
  Y.prototype.getFriction = function () {
    return Oy(this.ly)
  }
  Y.prototype.getRollingFriction = function () {
    return Py(this.ly)
  }
  Y.prototype.setRestitution = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Qy(c, a)
  }
  Y.prototype.setFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Ry(c, a)
  }
  Y.prototype.setRollingFriction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Sy(c, a)
  }
  Y.prototype.getWorldTransform = function () {
    return k(Ty(this.ly), r)
  }
  Y.prototype.getCollisionFlags = function () {
    return Uy(this.ly)
  }
  Y.prototype.setCollisionFlags = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Vy(c, a)
  }
  Y.prototype.setWorldTransform = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Wy(c, a)
  }
  Y.prototype.setCollisionShape = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Xy(c, a)
  }
  Y.prototype.setCcdMotionThreshold = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Yy(c, a)
  }
  Y.prototype.setCcdSweptSphereRadius = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Zy(c, a)
  }
  Y.prototype.getUserIndex = function () {
    return $y(this.ly)
  }
  Y.prototype.setUserIndex = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    az(c, a)
  }
  Y.prototype.getUserPointer = function () {
    return k(bz(this.ly), XA)
  }
  Y.prototype.setUserPointer = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    cz(c, a)
  }
  Y.prototype.getBroadphaseHandle = function () {
    return k(dz(this.ly), t)
  }
  Y.prototype.get_m_cfg = Y.prototype.Qz = function () {
    return k(ez(this.ly), X)
  }
  Y.prototype.set_m_cfg = Y.prototype.vC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    fz(c, a)
  }
  Object.defineProperty(Y.prototype, 'm_cfg', { get: Y.prototype.Qz, set: Y.prototype.vC })
  Y.prototype.get_m_nodes = Y.prototype.LA = function () {
    return k(gz(this.ly), mC)
  }
  Y.prototype.set_m_nodes = Y.prototype.qD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    hz(c, a)
  }
  Object.defineProperty(Y.prototype, 'm_nodes', { get: Y.prototype.LA, set: Y.prototype.qD })
  Y.prototype.get_m_faces = Y.prototype.Ky = function () {
    return k(iz(this.ly), lC)
  }
  Y.prototype.set_m_faces = Y.prototype.Uy = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    jz(c, a)
  }
  Object.defineProperty(Y.prototype, 'm_faces', { get: Y.prototype.Ky, set: Y.prototype.Uy })
  Y.prototype.get_m_materials = Y.prototype.IA = function () {
    return k(kz(this.ly), nC)
  }
  Y.prototype.set_m_materials = Y.prototype.nD = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    lz(c, a)
  }
  Object.defineProperty(Y.prototype, 'm_materials', { get: Y.prototype.IA, set: Y.prototype.nD })
  Y.prototype.get_m_anchors = Y.prototype.Gz = function () {
    return k(mz(this.ly), oC)
  }
  Y.prototype.set_m_anchors = Y.prototype.lC = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    nz(c, a)
  }
  Object.defineProperty(Y.prototype, 'm_anchors', { get: Y.prototype.Gz, set: Y.prototype.lC })
  Y.prototype.__destroy__ = function () {
    oz(this.ly)
  }
  function pC(a) {
    a && 'object' === typeof a && (a = a.ly)
    this.ly = void 0 === a ? pz() : qz(a)
    h(pC)[this.ly] = this
  }
  pC.prototype = Object.create(jB.prototype)
  pC.prototype.constructor = pC
  pC.prototype.my = pC
  pC.ny = {}
  b.btSoftBodyRigidBodyCollisionConfiguration = pC
  pC.prototype.__destroy__ = function () {
    rz(this.ly)
  }
  function qC() {
    this.ly = sz()
    h(qC)[this.ly] = this
  }
  qC.prototype = Object.create(oB.prototype)
  qC.prototype.constructor = qC
  qC.prototype.my = qC
  qC.ny = {}
  b.btDefaultSoftBodySolver = qC
  qC.prototype.__destroy__ = function () {
    tz(this.ly)
  }
  function rC() {
    throw 'cannot construct a btSoftBodyArray, no constructor in IDL'
  }
  rC.prototype = Object.create(f.prototype)
  rC.prototype.constructor = rC
  rC.prototype.my = rC
  rC.ny = {}
  b.btSoftBodyArray = rC
  rC.prototype.size = rC.prototype.size = function () {
    return uz(this.ly)
  }
  rC.prototype.at = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    return k(vz(c, a), Y)
  }
  rC.prototype.__destroy__ = function () {
    wz(this.ly)
  }
  function Z(a, c, d, e, g) {
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    this.ly = xz(a, c, d, e, g)
    h(Z)[this.ly] = this
  }
  Z.prototype = Object.create(x.prototype)
  Z.prototype.constructor = Z
  Z.prototype.my = Z
  Z.ny = {}
  b.btSoftRigidDynamicsWorld = Z
  Z.prototype.addSoftBody = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    yz(e, a, c, d)
  }
  Z.prototype.removeSoftBody = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    zz(c, a)
  }
  Z.prototype.removeCollisionObject = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Az(c, a)
  }
  Z.prototype.getWorldInfo = function () {
    return k(Bz(this.ly), T)
  }
  Z.prototype.getSoftBodyArray = function () {
    return k(Cz(this.ly), rC)
  }
  Z.prototype.getDispatcher = function () {
    return k(Dz(this.ly), TA)
  }
  Z.prototype.rayTest = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Ez(e, a, c, d)
  }
  Z.prototype.getPairCache = function () {
    return k(Fz(this.ly), UA)
  }
  Z.prototype.getDispatchInfo = function () {
    return k(Gz(this.ly), p)
  }
  Z.prototype.addCollisionObject = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    void 0 === c ? Hz(e, a) : void 0 === d ? Iz(e, a, c) : Jz(e, a, c, d)
  }
  Z.prototype.getBroadphase = function () {
    return k(Kz(this.ly), VA)
  }
  Z.prototype.convexSweepTest = function (a, c, d, e, g) {
    const n = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    Lz(n, a, c, d, e, g)
  }
  Z.prototype.contactPairTest = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Mz(e, a, c, d)
  }
  Z.prototype.contactTest = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    Nz(d, a, c)
  }
  Z.prototype.updateSingleAabb = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Oz(c, a)
  }
  Z.prototype.setDebugDrawer = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Pz(c, a)
  }
  Z.prototype.getDebugDrawer = function () {
    return k(Qz(this.ly), WA)
  }
  Z.prototype.debugDrawWorld = function () {
    Rz(this.ly)
  }
  Z.prototype.debugDrawObject = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    Sz(e, a, c, d)
  }
  Z.prototype.setGravity = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Tz(c, a)
  }
  Z.prototype.getGravity = function () {
    return k(Uz(this.ly), m)
  }
  Z.prototype.addRigidBody = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    void 0 === c
      ? Vz(e, a)
      : void 0 === d
        ? _emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_2(e, a, c)
        : Wz(e, a, c, d)
  }
  Z.prototype.removeRigidBody = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    Xz(c, a)
  }
  Z.prototype.addConstraint = function (a, c) {
    const d = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    void 0 === c ? Yz(d, a) : Zz(d, a, c)
  }
  Z.prototype.removeConstraint = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    $z(c, a)
  }
  Z.prototype.stepSimulation = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    return void 0 === c ? aA(e, a) : void 0 === d ? bA(e, a, c) : cA(e, a, c, d)
  }
  Z.prototype.setContactAddedCallback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    dA(c, a)
  }
  Z.prototype.setContactProcessedCallback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    eA(c, a)
  }
  Z.prototype.setContactDestroyedCallback = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    fA(c, a)
  }
  Z.prototype.addAction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    gA(c, a)
  }
  Z.prototype.removeAction = function (a) {
    const c = this.ly
    a && 'object' === typeof a && (a = a.ly)
    hA(c, a)
  }
  Z.prototype.getSolverInfo = function () {
    return k(iA(this.ly), u)
  }
  Z.prototype.setInternalTickCallback = function (a, c, d) {
    const e = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    void 0 === c ? jA(e, a) : void 0 === d ? kA(e, a, c) : lA(e, a, c, d)
  }
  Z.prototype.__destroy__ = function () {
    mA(this.ly)
  }
  function sC() {
    this.ly = nA()
    h(sC)[this.ly] = this
  }
  sC.prototype = Object.create(f.prototype)
  sC.prototype.constructor = sC
  sC.prototype.my = sC
  sC.ny = {}
  b.btSoftBodyHelpers = sC
  sC.prototype.CreateRope = function (a, c, d, e, g) {
    const n = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    return k(oA(n, a, c, d, e, g), Y)
  }
  sC.prototype.CreatePatch = function (a, c, d, e, g, n, D, R, va) {
    const Tb = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    n && 'object' === typeof n && (n = n.ly)
    D && 'object' === typeof D && (D = D.ly)
    R && 'object' === typeof R && (R = R.ly)
    va && 'object' === typeof va && (va = va.ly)
    return k(pA(Tb, a, c, d, e, g, n, D, R, va), Y)
  }
  sC.prototype.CreatePatchUV = function (a, c, d, e, g, n, D, R, va, Tb) {
    const tC = this.ly
    NA()
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    n && 'object' === typeof n && (n = n.ly)
    D && 'object' === typeof D && (D = D.ly)
    R && 'object' === typeof R && (R = R.ly)
    va && 'object' === typeof va && (va = va.ly)
    'object' == typeof Tb && (Tb = RA(Tb))
    return k(qA(tC, a, c, d, e, g, n, D, R, va, Tb), Y)
  }
  sC.prototype.CreateEllipsoid = function (a, c, d, e) {
    const g = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    return k(rA(g, a, c, d, e), Y)
  }
  sC.prototype.CreateFromTriMesh = function (a, c, d, e, g) {
    const n = this.ly
    NA()
    a && 'object' === typeof a && (a = a.ly)
    'object' == typeof c && (c = RA(c))
    if ('object' == typeof d && 'object' === typeof d) {
      const D = OA(d, Ba)
      PA(d, Ba, D)
      d = D
    }
    e && 'object' === typeof e && (e = e.ly)
    g && 'object' === typeof g && (g = g.ly)
    return k(sA(n, a, c, d, e, g), Y)
  }
  sC.prototype.CreateFromConvexHull = function (a, c, d, e) {
    const g = this.ly
    a && 'object' === typeof a && (a = a.ly)
    c && 'object' === typeof c && (c = c.ly)
    d && 'object' === typeof d && (d = d.ly)
    e && 'object' === typeof e && (e = e.ly)
    return k(tA(g, a, c, d, e), Y)
  }
  sC.prototype.__destroy__ = function () {
    uA(this.ly)
  }
  ;(function () {
    function a() {
      b.PHY_FLOAT = vA()
      b.PHY_DOUBLE = wA()
      b.PHY_INTEGER = xA()
      b.PHY_SHORT = yA()
      b.PHY_FIXEDPOINT88 = zA()
      b.PHY_UCHAR = AA()
      b.BT_CONSTRAINT_ERP = BA()
      b.BT_CONSTRAINT_STOP_ERP = CA()
      b.BT_CONSTRAINT_CFM = DA()
      b.BT_CONSTRAINT_STOP_CFM = EA()
    }
    La ? a() : Ja.unshift(a)
  })()
  b.CONTACT_ADDED_CALLBACK_SIGNATURE = 'iiiiiiii'
  b.CONTACT_DESTROYED_CALLBACK_SIGNATURE = 'ii'
  b.CONTACT_PROCESSED_CALLBACK_SIGNATURE = 'iiii'
  b.INTERNAL_TICK_CALLBACK_SIGNATURE = 'vif'

  return Ammo.ready
}
